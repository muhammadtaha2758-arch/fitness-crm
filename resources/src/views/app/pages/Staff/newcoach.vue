<template>
    <div class="member-form-container">
        <div class="container">
            <div class="form-card">
                <!-- Header Section -->
                <div class="form-header">
          <nav class="breadcrumb-nav" aria-label="breadcrumb">
            <div class="breadcrumb-container">
              <button 
                @click.stop="goBack" 
                class="back-button"
                type="button"
                title="Go back"
              >
                <i class="fas fa-arrow-left"></i>
              </button>
              <ol class="breadcrumb" style="background: transparent; padding: 0; margin: 0;">
                <li class="breadcrumb-item">
                  <router-link to="/app/Staff/coachlist">Coaches</router-link>
                </li>
                <li class="breadcrumb-item active" aria-current="page">
                  Add coach
                </li>
              </ol>
            </div>
          </nav>
          <div class="header-content">
                    <div class="header-icon">
                        <i class="fas fa-user-plus"></i>
                    </div>
                    <h2 class="form-title">Add New Coach</h2>
                    <p class="form-subtitle">Add a new coach to your staff</p>
          </div>
                </div>

                <form @submit.prevent="submitForm" class="member-form">
          <div class="client-data-layout">
            <!-- Left Side - Profile Picture Section -->
            <div class="profile-section">
              <div class="profile-picture-container">
                <div class="profile-picture" @click="$refs.fileInput.click()">
                  <div v-if="!photoUrl" class="profile-placeholder">
                                            <i class="fas fa-user"></i>
                                        </div>
                  <div v-else class="profile-image">
                    <img :src="photoUrl" alt="Profile Preview" class="preview-image">
                                    </div>
                                        </div>
                <button type="button" class="change-button" @click="$refs.fileInput.click()">
                  Add Photo
                </button>
                <button 
                  type="button" 
                  class="webcam-button"
                  @click="openWebcam"
                >
                  Webcam snapshot
                </button>
                <input 
                  ref="fileInput"
                  type="file" 
                  @change="previewPhoto" 
                  accept="image/*"
                  class="file-input"
                >
                                    </div>
                                        </div>

            <!-- Right Side - Form Fields -->
            <div class="form-fields-section">
              <h3 class="section-title">Coach data</h3>
              
              <div class="form-fields">
                <!-- Own Coach ID -->
                <div class="form-group">
                  <label class="form-label">
                    Own coach ID
                    <span class="tooltip-wrapper" @click.stop="showOwnEmployeeIdInfo = !showOwnEmployeeIdInfo">
                      <i class="fas fa-info-circle info-icon"></i>
                      <span class="tooltip-content" :class="{ 'is-visible': showOwnEmployeeIdInfo }">
                        Use if you have a custom ID you assign. Appears on exports and labels.
                      </span>
                    </span>
                  </label>
                  <input type="text" v-model="member.ownEmployeeId" class="form-control" placeholder="Own coach ID" :class="{ 'has-value': member.ownEmployeeId }">
                </div>

                <!-- Custom Export Field -->
                <div class="form-group">
                  <label class="form-label">
                    Custom export field
                    <span class="tooltip-wrapper" @click.stop="showCustomExportFieldInfo = !showCustomExportFieldInfo">
                      <i class="fas fa-info-circle info-icon"></i>
                      <span class="tooltip-content" :class="{ 'is-visible': showCustomExportFieldInfo }">
                        This field is for custom export data. Appears on exports and labels.
                      </span>
                    </span>
                  </label>
                  <input type="text" v-model="member.customExportField" class="form-control" placeholder="Custom export field" :class="{ 'has-value': member.customExportField }">
                </div>

                <div class="form-group">
                  <label class="form-label">First name <span class="required-asterisk">*</span></label>
                    <input 
                        type="text" 
                        v-model="member.firstName" 
                        class="form-control" 
                        :class="{ 
                            'has-value': member.firstName,
                            'is-invalid': fieldErrors.firstName,
                        }"
                        placeholder="Enter first name" 
                        required
                        @blur="validateField('firstName')"
                        @input="fieldErrors.firstName && validateField('firstName')"
                    />
                    <div v-if="fieldErrors.firstName" class="field-error">
                        {{ fieldErrors.firstName }}
                    </div>
                </div>

                <div class="form-group">
                  <label class="form-label">Last name <span class="required-asterisk">*</span></label>
                    <input 
                        type="text" 
                        v-model="member.lastName" 
                        class="form-control" 
                        :class="{ 
                            'has-value': member.lastName,
                            'is-invalid': fieldErrors.lastName,
                        }"
                        placeholder="Enter last name" 
                        required
                        @blur="validateField('lastName')"
                        @input="fieldErrors.lastName && validateField('lastName')"
                    />
                    <div v-if="fieldErrors.lastName" class="field-error">
                        {{ fieldErrors.lastName }}
                    </div>
                </div>

                <div class="form-group">
                  <label class="form-label">Sex <span class="required-asterisk">*</span></label>
                    <select 
                        v-model="member.gender" 
                        class="form-control"
                        :class="{ 'is-invalid': fieldErrors.gender }"
                        required
                        @change="validateField('gender')"
                        @blur="validateField('gender')"
                    >
                      <option disabled value="">Select Sex</option>
                      <option>Male</option>
                      <option>Female</option>
                      <option>Other</option>
                    </select>
                    <div v-if="fieldErrors.gender" class="field-error">
                        {{ fieldErrors.gender }}
                    </div>
                </div>

                <!-- Updated Birthday to match AddNewMember format -->
                <div class="form-group">
                  <label class="form-label">Birthday <span class="required-asterisk">*</span></label>
                  <div class="birthday-inputs-wrapper">
                    <div class="birthday-inputs">
                      <select 
                          v-model="member.birthdayDay" 
                          class="form-control birthday-select"
                          :class="{
                              'is-invalid': fieldErrors.birthdayDay || fieldErrors.birthdayMonth || fieldErrors.birthdayYear,
                          }"
                          required
                          @change="validateField('birthdayDay')"
                          @blur="validateField('birthdayDay')"
                      >
                        <option value="">Day</option>
                        <option v-for="day in 31" :key="day" :value="day">{{ day }}</option>
                      </select>
                      <select 
                          v-model="member.birthdayMonth" 
                          class="form-control birthday-select"
                          :class="{
                              'is-invalid': fieldErrors.birthdayDay || fieldErrors.birthdayMonth || fieldErrors.birthdayYear,
                          }"
                          required
                          @change="validateField('birthdayMonth')"
                          @blur="validateField('birthdayMonth')"
                      >
                        <option value="">Month</option>
                        <option v-for="(month, index) in months" :key="index" :value="index + 1">{{ month }}</option>
                      </select>
                      <select 
                          v-model="member.birthdayYear" 
                          class="form-control birthday-select"
                          :class="{
                              'is-invalid': fieldErrors.birthdayDay || fieldErrors.birthdayMonth || fieldErrors.birthdayYear,
                          }"
                          required
                          @change="validateField('birthdayYear')"
                          @blur="validateField('birthdayYear')"
                      >
                        <option value="">Year</option>
                        <option v-for="year in availableYears" :key="year" :value="year">{{ year }}</option>
                      </select>
                    </div>
                    <div v-if="fieldErrors.birthdayDay || fieldErrors.birthdayMonth || fieldErrors.birthdayYear" class="field-error">
                        {{ fieldErrors.birthdayDay || fieldErrors.birthdayMonth || fieldErrors.birthdayYear }}
                    </div>
                  </div>
                </div>

                <!-- Coach Since -->
                <div class="form-group">
                  <label class="form-label">Coach since</label>
                  <input type="date" v-model="member.coachSince" class="form-control" :class="{ 'has-value': member.coachSince }">
                </div>

                <!-- Subscription Reason -->
                <!-- <div class="form-group">
                  <label class="form-label">
                    Subscription reason
                    <span class="tooltip-wrapper">
                      <i class="fas fa-info-circle info-icon"></i>
                      <span class="tooltip-content">Reason for subscription</span>
                    </span>
                  </label>
                  <select v-model="member.subscriptionReason" class="form-control">
                    <option value="Unknown">Unknown</option>
                    <option value="Fitness">Fitness</option>
                    <option value="Weight Loss">Weight Loss</option>
                    <option value="Muscle Building">Muscle Building</option>
                    <option value="General Health">General Health</option>
                  </select>
                </div> -->

                <!-- Language -->
                <div class="form-group">
                  <label class="form-label">
                    Language
                    <span class="tooltip-wrapper">
                      <i class="fas fa-info-circle info-icon"></i>
                      <span class="tooltip-content">Preferred language for communication</span>
                    </span>
                  </label>
                  <select v-model="member.language" class="form-control" :class="{ 'has-value': member.language }">
                    <option value="English">English</option>
                    <option value="Spanish">Spanish</option>
                    <option value="French">French</option>
                    <option value="German">German</option>
                    <option value="Italian">Italian</option>
                    <option value="Portuguese">Portuguese</option>
                    <option value="Chinese">Chinese</option>
                    <option value="Japanese">Japanese</option>
                    <option value="Korean">Korean</option>
                    <option value="Arabic">Arabic</option>
                    <option value="Hindi">Hindi</option>
                    <option value="Russian">Russian</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <!-- Privileges -->
                <div class="form-group">
                  <label class="form-label">Privileges</label>
                  <div class="privileges-checkboxes">
                    <label class="custom-checkbox" v-for="privilege in availablePrivileges" :key="privilege.value">
                      <input type="checkbox" :value="privilege.value" v-model="member.privileges" />
                      <span class="checkmark"></span>
                      <span class="checkbox-label">{{ privilege.label }}</span>
                      <span class="tooltip-wrapper">
                        <i class="fas fa-info-circle info-icon-small"></i>
                        <span class="tooltip-content">{{ privilege.description || 'No description available' }}</span>
                      </span>
                    </label>
                  </div>
                </div>

                <div class="form-group">
                  <label class="form-label">
                    Email address <span class="required-asterisk">*</span>
                    <span class="tooltip-wrapper">
                      <i class="fas fa-info-circle info-icon"></i>
                      <span class="tooltip-content">Email address for coach login and communication</span>
                    </span>
                  </label>
                  <input 
                      type="email" 
                      v-model="member.email" 
                      class="form-control" 
                      :class="{ 
                          'has-value': member.email,
                          'is-invalid': fieldErrors.email,
                      }"
                      placeholder="Email Address" 
                      required
                      @blur="validateField('email')"
                      @input="fieldErrors.email && validateField('email')"
                  />
                  <div v-if="fieldErrors.email" class="field-error">
                      {{ fieldErrors.email }}
                  </div>
                </div>

                <div class="form-group">
                  <label class="form-label">Landline number</label>
                    <input 
                        type="tel" 
                        v-model="member.landline_phone" 
                        class="form-control" 
                        :class="{ 
                            'has-value': member.landline_phone,
                            'is-invalid': fieldErrors.landline_phone,
                        }"
                        placeholder="Landline Number"
                        @blur="member.landline_phone && validateField('landline_phone')"
                        @input="fieldErrors.landline_phone && validateField('landline_phone')"
                    />
                    <div v-if="fieldErrors.landline_phone" class="field-error">
                        {{ fieldErrors.landline_phone }}
                    </div>
                </div>

                <div class="form-group">
                  <label class="form-label">Mobile phone <span class="required-asterisk">*</span></label>
                  <input 
                      type="tel" 
                      v-model="member.mobile_phone" 
                      class="form-control" 
                      :class="{ 
                          'has-value': member.mobile_phone,
                          'is-invalid': fieldErrors.mobile_phone,
                      }"
                      placeholder="Mobile Phone Number"
                      @blur="validateField('mobile_phone')"
                      @input="fieldErrors.mobile_phone && validateField('mobile_phone')"
                  />
                  <div v-if="fieldErrors.mobile_phone" class="field-error">
                      {{ fieldErrors.mobile_phone }}
                  </div>
                </div>

                <!-- Coach Type field removed - column no longer exists in database -->
                <!-- <div class="form-group">
                  <label class="form-label">
                    Coach Type <span class="required-asterisk">*</span>
                    <i class="fas fa-info-circle info-icon"></i>
                  </label>
                  <select v-model="member.coachType" class="form-control" required>
                    <option disabled value="">Select Coach Type</option>
                    <option>Personal Coach</option>
                    <option>Group Coach</option>
                    <option>Yoga Coach</option>
                    <option>Pilates Coach</option>
                    <option>Nutritionist</option>
                    <option>Other</option>
                  </select>
                </div> -->

                <!-- <div class="form-group">
                  <label class="form-label">Years of Experience <span class="required-asterisk">*</span></label>
                  <input type="number" v-model="member.yearsOfExperience" class="form-control" min="0" max="50" placeholder="e.g., 5" required :class="{ 'has-value': member.yearsOfExperience }">
                                    </div>

                <div class="form-group">
                  <label class="form-label">Status <span class="required-asterisk">*</span></label>
                                        <select v-model="member.status" class="form-control" required>
                                            <option disabled value="">Select Status</option>
                                            <option>Active</option>
                                            <option>Inactive</option>
                                            <option>On Leave</option>
                                            <option>Suspended</option>
                                            <option>Terminated</option>
                                        </select>
                                        </div> -->

                <!-- Physical Information -->
                <!-- <div class="form-group">
                  <label class="form-label">Height (cm)</label>
                  <input v-model="member.height" type="number" class="form-control" placeholder="Height in cm" :class="{ 'has-value': member.height }">
                                    </div> -->

                <!-- <div class="form-group">
                  <label class="form-label">Weight (kg)</label>
                  <input v-model="member.weight" type="number" class="form-control" placeholder="Weight in kg" :class="{ 'has-value': member.weight }">
                                </div> -->

                <!-- <div class="form-group">
                  <label class="form-label">Chest (inches)</label>
                  <input v-model="member.chest" type="number" class="form-control" placeholder="Chest measurement" :class="{ 'has-value': member.chest }">
                            </div> -->

                <!-- <div class="form-group">
                  <label class="form-label">Blood Group</label>
                  <select v-model="member.bloodGroup" class="form-control">
                    <option disabled value="">Select Blood Group</option>
                    <option>A+</option>
                    <option>A-</option>
                    <option>B+</option>
                    <option>B-</option>
                    <option>AB+</option>
                    <option>AB-</option>
                    <option>O+</option>
                    <option>O-</option>
                  </select>
                            </div> -->

                <!-- <div class="form-group">
                  <label class="form-label">Medical Conditions</label>
                  <textarea v-model="member.medical" class="form-control" rows="3" placeholder="Any medical conditions or allergies..." :class="{ 'has-value': member.medical }"></textarea>
                        </div> -->
                </div>

                <!-- Address data section -->
                <h5 class="section-title">Address data</h5>
                <div class="form-fields">
                <div class="form-group">
                  <label class="form-label">Address <span class="required-asterisk">*</span></label>
                  <input 
                      v-model="member.address" 
                      type="text" 
                      placeholder="Address" 
                      class="form-control" 
                      :class="{ 
                          'has-value': member.address,
                          'is-invalid': fieldErrors.address,
                      }"
                      required
                      @blur="validateField('address')"
                      @input="fieldErrors.address && validateField('address')"
                  />
                  <div v-if="fieldErrors.address" class="field-error">
                      {{ fieldErrors.address }}
                  </div>
                </div>

                <div class="form-group">
                  <label class="form-label">City <span class="required-asterisk">*</span></label>
                  <input 
                      v-model="member.city" 
                      type="text" 
                      placeholder="City" 
                      class="form-control" 
                      :class="{ 
                          'has-value': member.city,
                          'is-invalid': fieldErrors.city,
                      }"
                      required
                      @blur="validateField('city')"
                      @input="fieldErrors.city && validateField('city')"
                  />
                  <div v-if="fieldErrors.city" class="field-error">
                      {{ fieldErrors.city }}
                  </div>
                </div>

                <div class="form-group">
                  <label class="form-label">State <span class="required-asterisk">*</span></label>
                  <input 
                      v-model="member.state" 
                      type="text" 
                      placeholder="State" 
                      class="form-control" 
                      :class="{ 
                          'has-value': member.state,
                          'is-invalid': fieldErrors.state,
                      }"
                      required
                      @blur="validateField('state')"
                      @input="fieldErrors.state && validateField('state')"
                  />
                  <div v-if="fieldErrors.state" class="field-error">
                      {{ fieldErrors.state }}
                  </div>
                </div>

                <div class="form-group">
                  <label class="form-label">ZIP Code <span class="required-asterisk">*</span></label>
                  <input 
                      v-model="member.zip" 
                      type="text" 
                      placeholder="ZIP Code" 
                      class="form-control" 
                      :class="{ 
                          'has-value': member.zip,
                          'is-invalid': fieldErrors.zip,
                      }"
                      required
                      @blur="validateField('zip')"
                      @input="fieldErrors.zip && validateField('zip')"
                  />
                  <div v-if="fieldErrors.zip" class="field-error">
                      {{ fieldErrors.zip }}
                  </div>
                </div>

                <!-- Country -->
                <div class="form-group">
                  <label class="form-label">Country</label>
                  <select v-model="member.country" class="form-control" :class="{ 'has-value': member.country }">
                    <option value="">Select Country</option>
                    <option value="Afghanistan">Afghanistan</option>
                    <option value="Albania">Albania</option>
                    <option value="Algeria">Algeria</option>
                    <option value="Argentina">Argentina</option>
                    <option value="Australia">Australia</option>
                    <option value="Austria">Austria</option>
                    <option value="Bangladesh">Bangladesh</option>
                    <option value="Belgium">Belgium</option>
                    <option value="Brazil">Brazil</option>
                    <option value="Bulgaria">Bulgaria</option>
                    <option value="Canada">Canada</option>
                    <option value="Chile">Chile</option>
                    <option value="China">China</option>
                    <option value="Colombia">Colombia</option>
                    <option value="Croatia">Croatia</option>
                    <option value="Czech Republic">Czech Republic</option>
                    <option value="Denmark">Denmark</option>
                    <option value="Egypt">Egypt</option>
                    <option value="Finland">Finland</option>
                    <option value="France">France</option>
                    <option value="Germany">Germany</option>
                    <option value="Greece">Greece</option>
                    <option value="Hong Kong">Hong Kong</option>
                    <option value="Hungary">Hungary</option>
                    <option value="Iceland">Iceland</option>
                    <option value="India">India</option>
                    <option value="Indonesia">Indonesia</option>
                    <option value="Iran">Iran</option>
                    <option value="Ireland">Ireland</option>
                    <option value="Israel">Israel</option>
                    <option value="Italy">Italy</option>
                    <option value="Japan">Japan</option>
                    <option value="Kenya">Kenya</option>
                    <option value="Malaysia">Malaysia</option>
                    <option value="Mexico">Mexico</option>
                    <option value="Netherlands">Netherlands</option>
                    <option value="New Zealand">New Zealand</option>
                    <option value="Nigeria">Nigeria</option>
                    <option value="Norway">Norway</option>
                    <option value="Pakistan">Pakistan</option>
                    <option value="Philippines">Philippines</option>
                    <option value="Poland">Poland</option>
                    <option value="Portugal">Portugal</option>
                    <option value="Romania">Romania</option>
                    <option value="Russia">Russia</option>
                    <option value="Saudi Arabia">Saudi Arabia</option>
                    <option value="Singapore">Singapore</option>
                    <option value="South Africa">South Africa</option>
                    <option value="South Korea">South Korea</option>
                    <option value="Spain">Spain</option>
                    <option value="Sweden">Sweden</option>
                    <option value="Switzerland">Switzerland</option>
                    <option value="Taiwan">Taiwan</option>
                    <option value="Thailand">Thailand</option>
                    <option value="Turkey">Turkey</option>
                    <option value="Ukraine">Ukraine</option>
                    <option value="United Arab Emirates">United Arab Emirates</option>
                    <option value="United Kingdom">United Kingdom</option>
                    <option value="United States">United States</option>
                    <option value="Venezuela">Venezuela</option>
                    <option value="Vietnam">Vietnam</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                </div>

                <!-- Emergency Contact -->
                <!-- <h5 class="section-title">Emergency Contact</h5>
                <div class="form-fields">
                <div class="form-group">
                  <label class="form-label">Emergency Contact Name</label>
                  <input v-model="member.emergencyName" type="text" class="form-control" placeholder="Emergency contact name" :class="{ 'has-value': member.emergencyName }">
                            </div>

                <div class="form-group">
                  <label class="form-label">Emergency Contact Phone</label>
                  <input v-model="member.emergencyPhone" type="tel" class="form-control" placeholder="Emergency contact phone" :class="{ 'has-value': member.emergencyPhone }">
                        </div>

                <div class="form-group">
                  <label class="form-label">Emergency Contact Relation</label>
                  <input v-model="member.emergencyRelation" type="text" class="form-control" placeholder="Relationship to emergency contact" :class="{ 'has-value': member.emergencyRelation }">
                                        </div>
                </div> -->

                <!-- Additional Information -->
                <!-- <h5 class="section-title">Additional Information</h5>
                <div class="form-fields">
                <div class="form-group">
                  <label class="form-label">Referred By</label>
                  <input v-model="member.referredBy" type="text" class="form-control" placeholder="Who referred this coach" :class="{ 'has-value': member.referredBy }">
                                    </div>

                <div class="form-group">
                  <label class="form-label">Locker Number</label>
                  <input v-model="member.lockerNumber" type="text" class="form-control" placeholder="Locker number" :class="{ 'has-value': member.lockerNumber }">
                    </div> -->

                <!-- Coach Experience -->
                <!-- <div class="form-group">
                  <label class="form-label">Coach Experience</label>
                  <input type="text" v-model="member.coachExperience" class="form-control" placeholder="Previous coaching experience" :class="{ 'has-value': member.coachExperience }">
                                            </div>

                <div class="form-group">
                  <label class="form-label">Certifications</label>
                  <input type="text" v-model="member.coachCertifications" class="form-control" placeholder="Professional certifications" :class="{ 'has-value': member.coachCertifications }">
                                        </div>

                <div class="form-group">
                  <label class="form-label">Specializations</label>
                                    <select v-model="member.specializations" class="form-control" multiple>
                                        <option>Weight Training</option>
                                        <option>Cardio Fitness</option>
                                        <option>Yoga & Flexibility</option>
                                        <option>Pilates</option>
                                        <option>CrossFit</option>
                                        <option>Functional Training</option>
                                        <option>Sports Conditioning</option>
                                        <option>Rehabilitation</option>
                                        <option>Nutrition Coaching</option>
                                        <option>Senior Fitness</option>
                                        <option>Prenatal/Postnatal</option>
                                        <option>Bodybuilding</option>
                                        <option>HIIT Training</option>
                                        <option>Strength Training</option>
                                        <option>Endurance Training</option>
                                    </select>
                                            </div>

                <div class="form-group">
                  <label class="form-label">Bio / About Coach</label>
                  <textarea v-model="member.bio" class="form-control" rows="4" placeholder="Tell us about the coach's experience, specialties, and background..." :class="{ 'has-value': member.bio }"></textarea>
                                        </div>

                <div class="form-group">
                  <label class="form-label">Social Media</label>
                  <input v-model="member.socialMedia" type="text" class="form-control" placeholder="Social media profiles" :class="{ 'has-value': member.socialMedia }">
                                </div>

                <div class="form-group">
                  <label class="form-label">Notes</label>
                  <textarea v-model="member.notes" class="form-control" rows="3" placeholder="Additional notes about the coach" :class="{ 'has-value': member.notes }"></textarea>
                            </div>
                </div> -->

                <!-- Availability Information -->
                <!-- <h5 class="section-title">Availability</h5>
                <div class="form-fields">
                <div class="form-group">
                  <label class="form-label">Weekly Availability</label>
                  <input v-model="member.weeklyAvailability" type="text" class="form-control" placeholder="e.g., Monday-Friday 9AM-6PM" :class="{ 'has-value': member.weeklyAvailability }">
                        </div>

                <div class="form-group">
                  <label class="form-label">Session Duration (minutes)</label>
                  <input v-model="member.sessionDuration" type="number" class="form-control" placeholder="e.g., 60" :class="{ 'has-value': member.sessionDuration }">
                    </div>

                <div class="form-group">
                  <label class="form-label">Max Clients Per Day</label>
                  <input v-model="member.maxClientsPerDay" type="number" class="form-control" placeholder="e.g., 8" :class="{ 'has-value': member.maxClientsPerDay }">
                                    </div>
                </div> -->

                <!-- Payment Information -->
                <!-- <h5 class="section-title">Payment Information</h5>
                <div class="form-fields">
                <div class="form-group">
                  <label class="form-label">Payment Type</label>
                  <select v-model="member.plan" class="form-control">
                    <option :value="null">Select Payment Type</option>
                    <option>Per Session</option>
                    <option>Monthly</option>
                    <option>Commission Based</option>
                  </select>
                                        </div>

                <div class="form-group">
                  <label class="form-label">Rate / Salary ($)</label>
                  <input type="number" class="form-control" v-model="member.amount" placeholder="Rate or salary amount" :class="{ 'has-value': member.amount }">
                                    </div>

                <div class="form-group">
                  <label class="form-label">Commission %</label>
                  <input type="number" class="form-control" v-model="member.payAmount" placeholder="Commission percentage" :class="{ 'has-value': member.payAmount }">
                                </div>

                <div class="form-group">
                  <label class="form-label">Payment Start Date</label>
                  <input v-model="member.paymentStartDate" type="date" class="form-control" :class="{ 'has-value': member.paymentStartDate }">
                                </div>
                </div> -->

                <!-- Bank Details section -->
                <h5 class="section-title">Bank Details</h5>
                <div class="form-fields">
                <div class="form-group">
                  <label class="form-label">
                    Bank account number
                    <span class="tooltip-wrapper">
                      <i class="fas fa-info-circle info-icon"></i>
                      <span class="tooltip-content">Enter your bank account number</span>
                    </span>
                  </label>
                  <input v-model="member.bankAccountNumber" type="text" class="form-control" placeholder="Bank account number" :class="{ 'has-value': member.bankAccountNumber }">
                </div>
                
                <div class="form-group">
                  <label class="form-label">
                    Routing number
                    <span class="tooltip-wrapper">
                      <i class="fas fa-info-circle info-icon"></i>
                      <span class="tooltip-content">Bank's unique code to identify the bank</span>
                    </span>
                  </label>
                  <input 
                      v-model="member.routingNumber" 
                      type="text" 
                      class="form-control" 
                      placeholder="Routing number" 
                      :class="{ 
                          'has-value': member.routingNumber,
                          'is-invalid': fieldErrors.routingNumber,
                      }"
                      @blur="validateField('routingNumber')"
                      @input="fieldErrors.routingNumber && validateField('routingNumber')"
                  >
                  <div v-if="fieldErrors.routingNumber" class="field-error">
                      {{ fieldErrors.routingNumber }}
                  </div>
                </div>
                
                <div class="form-group">
                  <label class="form-label">Bank account type</label>
                  <select v-model="member.bankAccountType" class="form-control" :class="{ 'has-value': member.bankAccountType }">
                    <option value="">Select Account Type</option>
                    <option value="Checking">Checking</option>
                    <option value="Savings">Savings</option>
                    <option value="Business">Business</option>
                    <option value="Corporate">Corporate</option>
                    <option value="Current">Current</option>
                    <option value="Deposit">Deposit</option>
                    <option value="Loan">Loan</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                
                <div class="form-group">
                  <label class="form-label">Bank account holder name</label>
                  <input v-model="member.bankAccountName" type="text" class="form-control" placeholder="Bank account holder name" :class="{ 'has-value': member.bankAccountName }">
                </div>
                
                <div class="form-group">
                  <label class="form-label">Bank name</label>
                  <input v-model="member.bankName" type="text" class="form-control" placeholder="Bank name" :class="{ 'has-value': member.bankName }">
                </div>
                </div>

                <!-- Send Invitation -->
                <div class="form-group compact">
                  <label class="custom-checkbox invitation-checkbox">
                    <input type="radio" v-model="member.sendInvitation" :value="true" />
                    <span class="checkmark"></span>
                    <span class="checkbox-label">
                      <span>Send invitation</span>
                      <span class="tooltip-wrapper">
                        <i class="fas fa-info-circle info-icon"></i>
                        <span class="tooltip-content">
                          Send a welcome email invitation to the new coach
                        </span>
                      </span>
                    </span>
                  </label>
                  <label class="custom-checkbox invitation-checkbox">
                    <input type="radio" v-model="member.sendInvitation" :value="false" />
                    <span class="checkmark"></span>
                    <span class="checkbox-label">Don't send invitation</span>
                  </label>
                </div>
            </div>
          </div>

          <!-- Webcam Modal -->
              <div v-if="showWebcam" class="webcam-modal-overlay">
                <div class="webcam-modal">
                  <div class="webcam-header">
                    <span>Webcam</span>
                    <button type="button" class="close-btn" @click="closeWebcam" style="background: none; border: none; font-size: 1.5rem;">&times;</button>
                  </div>
                  <div class="webcam-video-container">
                    <video ref="webcamVideo" autoplay playsinline width="320" height="240" style="border-radius: 8px; background: #222;"></video>
                  </div>
                  <div class="webcam-actions" style="margin-top: 12px; display: flex; gap: 10px;">
                    <button type="button" class="btn btn-primary" @click="takeSnapshot">
                      <i class="fas fa-camera"></i> Capture
                    </button>
                    <button type="button" class="btn btn-secondary" @click="closeWebcam">
                      Cancel
                    </button>
            </div>
                        </div>
                    </div>

                    <!-- Submit Button -->
                    <div class="submit-section">
                        <button class="submit-btn" type="submit" :disabled="isLoading">
                            <i class="fas fa-check-circle"></i>
                           <span>{{ isLoading ? 'Adding...' : 'Add' }}</span>
                        </button>
                    </div>
                </form>
            </div>
        </div>
        
        <!-- Loading Overlay -->
        <div v-if="isLoading" class="loading-overlay">
            <div class="loading_wrap">
                <div class="loader_logo">
                    <img src="/images/logo.png" class="" alt="logo" />
                </div>
                <div class="loading"></div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
            name: "CreateCoachForm",
    data() {
        return {
            member: {
                ownEmployeeId: "",
                customExportField: "",
                firstName: "",
                lastName: "",
                mobile_phone: "",
                landline_phone: "",
                email: "",
                password: "",
                dob: "",
                birthdayDay: "",
                birthdayMonth: "",
                birthdayYear: "",
                address: "",
                gender: "",
                coachType: "",
                coachSince: "",
                subscriptionReason: "Unknown",
                language: "English",
                privileges: [],
                country: "United States",
                coachExperience: "",
                coachCertifications: "",
                height: "",
                weight: "",
                chest: "",
                bloodGroup: "",
                medical: "",
                emergencyName: "",
                emergencyPhone: "",
                emergencyRelation: "",
                address1: "",
                address2: "",
                city: "",
                state: "",
                zip: "",
                referredBy: "",
                lockerNumber: "",
                isTrial: false,
                trialStart: "",
                trialEnd: "",
                plan: null,
                paymentMethod: null,
                amount: "",
                payAmount: "",
                paymentStartDate: "",
                bankAccountName: "",
                bankAccountNumber: "",
                routingNumber: "",
                bankAccountType: "Checking",
                bankName: "",
                paymentNotes: "",
                bio: "",
                socialMedia: "",
                notes: "",
                weeklyAvailability: "",
                sessionDuration: "",
                maxClientsPerDay: "",
                specializations: [],
                yearsOfExperience: "",
                status: "",
                sendInvitation: true,
            },
            photoUrl: null,
            showWebcam: false,
            showOwnEmployeeIdInfo: false,
            showCustomExportFieldInfo: false,
            isLoading: false,
            // Field validation errors
            fieldErrors: {},
            validationAttempted: false,
            months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
            availableYears: [],
            availablePrivileges: [
                { value: 'club_manager', label: 'Club Manager', description: 'Full access to manage club operations and settings' },
                { value: 'assistant_manager', label: 'Assistant Manager', description: 'Assist with club management tasks and operations' },
                { value: 'coach', label: 'Coach', description: 'Access to coaching features and member training programs' },
                // { value: 'marketing_manager', label: 'Marketing Manager', description: 'Manage marketing campaigns and promotional activities' },
                // { value: 'financial', label: 'Financial', description: 'Access to financial reports and payment processing' },
                // { value: 'sales', label: 'Sales', description: 'Access to sales features and member enrollment' },
                // { value: 'standard_employee', label: 'Standard Employee', description: 'Basic employee access with standard permissions' },
                { value: 'scheduling', label: 'Scheduling', description: 'Manage schedules, appointments, and class bookings' },
                // { value: 'credit_manager', label: 'Credit Manager', description: 'Manage member credits and credit-related operations' },
                { value: 'community_manager', label: 'Community Manager', description: 'Manage community features and member interactions' },
                // { value: 'data_request_permission', label: 'Data request permission', description: 'Permission to request and export member data' },
                // { value: 'pos_employee', label: 'POS Employee', description: 'Access to point of sale system for transactions' },
                // { value: 'default_permissions', label: 'Default permissions', description: 'Standard default permissions for employees' },
            ],
        };
    },
    mounted() {
        // Generate available years (last 100 years)
        const currentYear = new Date().getFullYear();
        for (let i = currentYear; i >= currentYear - 100; i--) {
            this.availableYears.push(i);
        }
    },
    computed: {
        // Convert birthday parts to date format for submission
        computedDob() {
            if (this.member.birthdayYear && this.member.birthdayMonth && this.member.birthdayDay) {
                const year = this.member.birthdayYear;
                const month = String(this.member.birthdayMonth).padStart(2, '0');
                const day = String(this.member.birthdayDay).padStart(2, '0');
                return `${year}-${month}-${day}`;
            }
            return this.member.dob || null;
        }
    },
    watch: {
        "member.isTrial"(newVal) {
            if (newVal) {
                // Trial mode ON — clear payment info
                this.member.plan = null;
                this.member.paymentMethod = null;
                this.member.amount = "";
                this.member.payAmount = "";
                this.member.paymentStartDate = "";
                this.member.bankAccountName = "";
                this.member.bankAccountNumber = "";
                this.member.paymentNotes = "";
            } else {
                // Trial mode OFF — clear trial info
                this.member.trialStart = "";
                this.member.trialEnd = "";
            }
        },
    },
    methods: {
        previewPhoto(event) {
            const file = event.target.files[0];
            if (file) {
                // Check file size (2MB limit)
                const maxSize = 2 * 1024 * 1024; // 2MB in bytes
                if (file.size > maxSize) {
                    alert('File size must be less than 2MB. Please select a smaller image.');
                    event.target.value = ''; // Clear the file input
                    this.photoUrl = null;
                    return;
                }
                
                // Check file type
                const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'];
                if (!allowedTypes.includes(file.type)) {
                    alert('Please select a valid image file (JPG, PNG, or GIF).');
                    event.target.value = ''; // Clear the file input
                    this.photoUrl = null;
                    return;
                }
                
                this.photoUrl = URL.createObjectURL(file);
            }
        },
        submitForm() {
            // Mark that validation has been attempted
            this.validationAttempted = true;
            
            // Clear previous errors
            this.fieldErrors = {};
            
            // Validate all fields
            if (!this.validateForm()) {
                // Scroll to first error field
                this.scrollToFirstError();
                return;
            }
            
            // All validations passed, proceed with API call
            this.createCoach();
        },
        
        validateForm() {
            let isValid = true;
            this.fieldErrors = {};
            
            // Trim all string fields for validation
            const firstName = (this.member.firstName || '').trim();
            const lastName = (this.member.lastName || '').trim();
            const email = (this.member.email || '').trim();
            const mobilePhone = (this.member.mobile_phone || '').trim();
            const address = (this.member.address || '').trim();
            const city = (this.member.city || '').trim();
            const state = (this.member.state || '').trim();
            const zip = (this.member.zip || '').trim();
            
            // Validate First Name
            if (!firstName) {
                this.fieldErrors.firstName = "First name is required";
                isValid = false;
            } else if (firstName.length < 2) {
                this.fieldErrors.firstName = "First name must be at least 2 characters long";
                isValid = false;
            } else if (firstName.length > 50) {
                this.fieldErrors.firstName = "First name must not exceed 50 characters";
                isValid = false;
            }
            
            // Validate Last Name
            if (!lastName) {
                this.fieldErrors.lastName = "Last name is required";
                isValid = false;
            } else if (lastName.length < 2) {
                this.fieldErrors.lastName = "Last name must be at least 2 characters long";
                isValid = false;
            } else if (lastName.length > 50) {
                this.fieldErrors.lastName = "Last name must not exceed 50 characters";
                isValid = false;
            }
            
            // Validate Email
            if (!email) {
                this.fieldErrors.email = "Email address is required";
                isValid = false;
            } else {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(email)) {
                    this.fieldErrors.email = "Please enter a valid email address";
                    isValid = false;
                } else if (email.length > 255) {
                    this.fieldErrors.email = "Email address must not exceed 255 characters";
                    isValid = false;
                }
            }
            
            // Validate Mobile Phone
            if (!mobilePhone) {
                this.fieldErrors.mobile_phone = "Mobile phone number is required";
                isValid = false;
            } else {
                const cleanPhone = mobilePhone.replace(/[\s\-\(\)\.]/g, '');
                if (cleanPhone.length < 10) {
                    this.fieldErrors.mobile_phone = "Mobile phone number must contain at least 10 digits";
                    isValid = false;
                } else if (!/^[\d\+\-\(\)\.\s]+$/.test(mobilePhone)) {
                    this.fieldErrors.mobile_phone = "Mobile phone number contains invalid characters";
                    isValid = false;
                }
            }
            
            // Validate Gender
            if (!this.member.gender) {
                this.fieldErrors.gender = "Please select a gender";
                isValid = false;
            }
            
            // Validate Birthday
            if (!this.member.birthdayDay || this.member.birthdayDay === "") {
                this.fieldErrors.birthdayDay = "Birthday day is required";
                isValid = false;
            }
            if (!this.member.birthdayMonth || this.member.birthdayMonth === "") {
                this.fieldErrors.birthdayMonth = "Birthday month is required";
                isValid = false;
            }
            if (!this.member.birthdayYear || this.member.birthdayYear === "") {
                this.fieldErrors.birthdayYear = "Birthday year is required";
                isValid = false;
            }
            
            // Validate birthday date is valid
            if (this.member.birthdayYear && this.member.birthdayMonth && this.member.birthdayDay) {
                const year = parseInt(this.member.birthdayYear);
                const month = parseInt(this.member.birthdayMonth);
                const day = parseInt(this.member.birthdayDay);
                const date = new Date(year, month - 1, day);
                
                if (date.getDate() !== day || date.getMonth() !== month - 1 || date.getFullYear() !== year) {
                    this.fieldErrors.birthdayDay = "Invalid date. Please check day, month, and year";
                    isValid = false;
                } else {
                    const today = new Date();
                    today.setHours(0, 0, 0, 0);
                    if (date > today) {
                        this.fieldErrors.birthdayDay = "Birthday cannot be in the future";
                        isValid = false;
                    }
                    let age = today.getFullYear() - year;
                    const birthdayThisYear = new Date(today.getFullYear(), month - 1, day);
                    if (birthdayThisYear > today) {
                        age--;
                    }
                    if (age > 120) {
                        this.fieldErrors.birthdayYear = "Please enter a valid birthday. Age cannot exceed 120 years";
                        isValid = false;
                    }
                }
            }
            
            // Validate Address
            if (!address) {
                this.fieldErrors.address = "Address is required";
                isValid = false;
            } else if (address.length < 5) {
                this.fieldErrors.address = "Address must be at least 5 characters long";
                isValid = false;
            } else if (address.length > 255) {
                this.fieldErrors.address = "Address must not exceed 255 characters";
                isValid = false;
            }
            
            // Validate City
            if (!city) {
                this.fieldErrors.city = "City is required";
                isValid = false;
            } else if (city.length < 2) {
                this.fieldErrors.city = "City name must be at least 2 characters long";
                isValid = false;
            } else if (city.length > 100) {
                this.fieldErrors.city = "City name must not exceed 100 characters";
                isValid = false;
            }
            
            // Validate State
            if (!state) {
                this.fieldErrors.state = "State is required";
                isValid = false;
            } else if (state.length < 2) {
                this.fieldErrors.state = "State name must be at least 2 characters long";
                isValid = false;
            } else if (state.length > 100) {
                this.fieldErrors.state = "State name must not exceed 100 characters";
                isValid = false;
            }
            
            // Validate ZIP Code
            if (!zip) {
                this.fieldErrors.zip = "ZIP code is required";
                isValid = false;
            } else if (zip.length < 3) {
                this.fieldErrors.zip = "ZIP code must be at least 3 characters long";
                isValid = false;
            } else if (zip.length > 20) {
                this.fieldErrors.zip = "ZIP code must not exceed 20 characters";
                isValid = false;
            }
            
            // Validate Landline Phone (if provided)
            if (this.member.landline_phone) {
                const cleanLandline = this.member.landline_phone.replace(/[\s\-\(\)\.]/g, '');
                if (cleanLandline.length < 10) {
                    this.fieldErrors.landline_phone = "Landline phone number must contain at least 10 digits";
                    isValid = false;
                } else if (!/^[\d\+\-\(\)\.\s]+$/.test(this.member.landline_phone)) {
                    this.fieldErrors.landline_phone = "Landline phone number contains invalid characters";
                    isValid = false;
                }
            }
            
            // Validate Coach Since date (if provided)
            if (this.member.coachSince) {
                const today = new Date();
                const todayStr = today.getFullYear() + '-' + 
                    String(today.getMonth() + 1).padStart(2, '0') + '-' + 
                    String(today.getDate()).padStart(2, '0');
                
                if (this.member.coachSince > todayStr) {
                    this.fieldErrors.coachSince = "Coach since date cannot be in the future";
                    isValid = false;
                }
            }
            
            // Validate Bank Account Number (if provided)
            if (this.member.bankAccountNumber) {
                const cleanAccountNumber = this.member.bankAccountNumber.replace(/\s/g, '');
                if (cleanAccountNumber.length < 4) {
                    this.fieldErrors.bankAccountNumber = "Bank account number must be at least 4 characters long";
                    isValid = false;
                } else if (!/^[\d\s\-]+$/.test(this.member.bankAccountNumber)) {
                    this.fieldErrors.bankAccountNumber = "Bank account number contains invalid characters";
                    isValid = false;
                }
            }
            
            // Validate Routing Number (if provided)
            if (this.member.routingNumber) {
                // Check invalid characters first
                if (!/^[\d\s\-]+$/.test(this.member.routingNumber)) {
                    this.fieldErrors.routingNumber = "Routing number contains invalid characters";
                    isValid = false;
                } else {
                    // Then check for exactly 9 digits
                    const cleanRoutingNumber = this.member.routingNumber.replace(/[\s\-]/g, '');
                    if (cleanRoutingNumber.length !== 9) {
                        this.fieldErrors.routingNumber = "Routing number must be exactly 9 digits";
                        isValid = false;
                    }
                }
            }
            
            // Validate Bank Account Name (if provided)
            if (this.member.bankAccountName) {
                if (this.member.bankAccountName.trim().length < 2) {
                    this.fieldErrors.bankAccountName = "Bank account holder name must be at least 2 characters long";
                    isValid = false;
                }
            }
            
            // Validate Bank Name (if provided)
            if (this.member.bankName) {
                if (this.member.bankName.trim().length < 2) {
                    this.fieldErrors.bankName = "Bank name must be at least 2 characters long";
                    isValid = false;
                }
            }
            
            // Show error message if validation failed
            if (!isValid) {
                const errorCount = Object.keys(this.fieldErrors).length;
                this.$root.$bvToast.toast(
                    `Please correct ${errorCount} ${errorCount === 1 ? 'error' : 'errors'} in the form before submitting.`,
                    {
                        title: 'Validation Failed',
                        variant: 'warning',
                        solid: true,
                        autoHideDelay: 5000,
                        toaster: 'b-toaster-top-right',
                        appendToast: true
                    }
                );
            }
            
            return isValid;
        },
        validateField(fieldName) {
            // Clear error for this field
            if (this.fieldErrors[fieldName]) {
                delete this.fieldErrors[fieldName];
            }
            
            // Validate individual field
            switch (fieldName) {
                case 'firstName':
                    const firstName = (this.member.firstName || '').trim();
                    if (!firstName) {
                        this.fieldErrors.firstName = "First name is required";
                        return false;
                    } else if (firstName.length < 2) {
                        this.fieldErrors.firstName = "First name must be at least 2 characters long";
                        return false;
                    } else if (firstName.length > 50) {
                        this.fieldErrors.firstName = "First name must not exceed 50 characters";
                        return false;
                    }
                    break;
                case 'lastName':
                    const lastName = (this.member.lastName || '').trim();
                    if (!lastName) {
                        this.fieldErrors.lastName = "Last name is required";
                        return false;
                    } else if (lastName.length < 2) {
                        this.fieldErrors.lastName = "Last name must be at least 2 characters long";
                        return false;
                    } else if (lastName.length > 50) {
                        this.fieldErrors.lastName = "Last name must not exceed 50 characters";
                        return false;
                    }
                    break;
                case 'gender':
                    if (!this.member.gender) {
                        this.fieldErrors.gender = "Please select a gender";
                        return false;
                    }
                    break;
                case 'email':
                    const email = (this.member.email || '').trim();
                    if (!email) {
                        this.fieldErrors.email = "Email address is required";
                        return false;
                    } else {
                        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                        if (!emailRegex.test(email)) {
                            this.fieldErrors.email = "Please enter a valid email address";
                            return false;
                        } else if (email.length > 255) {
                            this.fieldErrors.email = "Email address must not exceed 255 characters";
                            return false;
                        }
                    }
                    break;
                case 'mobile_phone':
                    const mobilePhone = (this.member.mobile_phone || '').trim();
                    if (!mobilePhone) {
                        this.fieldErrors.mobile_phone = "Mobile phone number is required";
                        return false;
                    } else {
                        const cleanPhone = mobilePhone.replace(/[\s\-\(\)\.]/g, '');
                        if (cleanPhone.length < 10) {
                            this.fieldErrors.mobile_phone = "Mobile phone number must contain at least 10 digits";
                            return false;
                        } else if (!/^[\d\+\-\(\)\.\s]+$/.test(mobilePhone)) {
                            this.fieldErrors.mobile_phone = "Mobile phone number contains invalid characters";
                            return false;
                        }
                    }
                    break;
                case 'address':
                    const address = (this.member.address || '').trim();
                    if (!address) {
                        this.fieldErrors.address = "Address is required";
                        return false;
                    } else if (address.length < 5) {
                        this.fieldErrors.address = "Address must be at least 5 characters long";
                        return false;
                    } else if (address.length > 255) {
                        this.fieldErrors.address = "Address must not exceed 255 characters";
                        return false;
                    }
                    break;
                case 'city':
                    const city = (this.member.city || '').trim();
                    if (!city) {
                        this.fieldErrors.city = "City is required";
                        return false;
                    } else if (city.length < 2) {
                        this.fieldErrors.city = "City name must be at least 2 characters long";
                        return false;
                    } else if (city.length > 100) {
                        this.fieldErrors.city = "City name must not exceed 100 characters";
                        return false;
                    }
                    break;
                case 'state':
                    const state = (this.member.state || '').trim();
                    if (!state) {
                        this.fieldErrors.state = "State is required";
                        return false;
                    } else if (state.length < 2) {
                        this.fieldErrors.state = "State name must be at least 2 characters long";
                        return false;
                    } else if (state.length > 100) {
                        this.fieldErrors.state = "State name must not exceed 100 characters";
                        return false;
                    }
                    break;
                case 'zip':
                    const zip = (this.member.zip || '').trim();
                    if (!zip) {
                        this.fieldErrors.zip = "ZIP code is required";
                        return false;
                    } else if (zip.length < 3) {
                        this.fieldErrors.zip = "ZIP code must be at least 3 characters long";
                        return false;
                    } else if (zip.length > 20) {
                        this.fieldErrors.zip = "ZIP code must not exceed 20 characters";
                        return false;
                    }
                    break;
                case 'landline_phone':
                    if (this.member.landline_phone) {
                        const cleanLandline = this.member.landline_phone.replace(/[\s\-\(\)\.]/g, '');
                        if (cleanLandline.length < 10) {
                            this.fieldErrors.landline_phone = "Landline phone number must contain at least 10 digits";
                            return false;
                        } else if (!/^[\d\+\-\(\)\.\s]+$/.test(this.member.landline_phone)) {
                            this.fieldErrors.landline_phone = "Landline phone number contains invalid characters";
                            return false;
                        }
                    }
                    break;
                case 'birthdayDay':
                case 'birthdayMonth':
                case 'birthdayYear':
                    if (!this.member.birthdayDay || this.member.birthdayDay === "") {
                        this.fieldErrors.birthdayDay = "Birthday day is required";
                        return false;
                    }
                    if (!this.member.birthdayMonth || this.member.birthdayMonth === "") {
                        this.fieldErrors.birthdayMonth = "Birthday month is required";
                        return false;
                    }
                    if (!this.member.birthdayYear || this.member.birthdayYear === "") {
                        this.fieldErrors.birthdayYear = "Birthday year is required";
                        return false;
                    }
                    if (this.member.birthdayYear && this.member.birthdayMonth && this.member.birthdayDay) {
                        const year = parseInt(this.member.birthdayYear);
                        const month = parseInt(this.member.birthdayMonth);
                        const day = parseInt(this.member.birthdayDay);
                        const date = new Date(year, month - 1, day);
                        
                        if (date.getDate() !== day || date.getMonth() !== month - 1 || date.getFullYear() !== year) {
                            this.fieldErrors.birthdayDay = "Invalid date. Please check day, month, and year";
                            return false;
                        }
                        const today = new Date();
                        today.setHours(0, 0, 0, 0);
                        if (date > today) {
                            this.fieldErrors.birthdayDay = "Birthday cannot be in the future";
                            return false;
                        }
                        const birthdayThisYear = new Date(today.getFullYear(), month - 1, day);
                        let age = today.getFullYear() - year;
                        if (birthdayThisYear > today) {
                            age--;
                        }
                        if (age > 120) {
                            this.fieldErrors.birthdayYear = "Please enter a valid birthday. Age cannot exceed 120 years";
                            return false;
                        }
                    }
                    break;
                case 'routingNumber':
                    if (this.member.routingNumber) {
                        // Check invalid characters first
                        if (!/^[\d\s\-]+$/.test(this.member.routingNumber)) {
                            this.fieldErrors.routingNumber = "Routing number contains invalid characters";
                            return false;
                        } else {
                            // Then check for exactly 9 digits
                            const cleanRoutingNumber = this.member.routingNumber.replace(/[\s\-]/g, '');
                            if (cleanRoutingNumber.length !== 9) {
                                this.fieldErrors.routingNumber = "Routing number must be exactly 9 digits";
                                return false;
                            }
                        }
                    }
                    break;
            }
            return true;
        },
        scrollToFirstError() {
            this.$nextTick(() => {
                const firstErrorField = document.querySelector('.field-error, .form-control.is-invalid');
                if (firstErrorField) {
                    firstErrorField.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    const input = firstErrorField.querySelector('input, select, textarea') || firstErrorField;
                    if (input && input.focus) {
                        input.focus();
                    }
                }
            });
        },
        createCoach() {
            // Show loading indicator
            this.isLoading = true;
            
            // Clean and prepare the data before sending
            const cleanedData = this.cleanFormData();
            
            // Map frontend field names to backend field names
            // Only include fields that exist in the database
            const coachData = {
                first_name: cleanedData.firstName,
                last_name: cleanedData.lastName,
                mobile_phone: cleanedData.mobile_phone,
                landline_phone: cleanedData.landline_phone,
                email: cleanedData.email,
                dob: cleanedData.dob || null,
                gender: cleanedData.gender || null,
                address: cleanedData.address,
                city: cleanedData.city,
                state: cleanedData.state,
                zip: cleanedData.zip,
                country: cleanedData.country || 'United States',
                own_employee_id: cleanedData.ownEmployeeId || null,
                custom_export_field: cleanedData.customExportField || null,
                coach_since: cleanedData.coachSince || null,
                subscription_reason: cleanedData.subscriptionReason || 'Unknown',
                language: cleanedData.language || 'English',
                privileges: cleanedData.privileges || [],
                bank_account_name: cleanedData.bankAccountName || null,
                bank_account_number: cleanedData.bankAccountNumber || null,
                routing_number: cleanedData.routingNumber || null,
                bank_account_type: cleanedData.bankAccountType || 'Checking',
                bank_name: cleanedData.bankName || null,
                send_invitation: cleanedData.sendInvitation !== undefined ? cleanedData.sendInvitation : true,
            };

            // Debug: Log the data being sent
            console.log('Coach data being sent:', coachData);

            // Handle file upload if profile picture is selected
            const formData = new FormData();
            
            // Add all the coach data
            Object.keys(coachData).forEach(key => {
                const value = coachData[key];
                
                // Skip null, undefined, and empty string values
                if (value === null || value === undefined || value === '') {
                    return;
                }
                
                if (key === 'specializations' && Array.isArray(value)) {
                    // Send each specialization as a separate array item
                    value.forEach(spec => {
                        formData.append('specializations[]', spec);
                    });
                } else if (key === 'privileges' && Array.isArray(value)) {
                    // Send each privilege as a separate array item (Laravel expects array format)
                    value.forEach(privilege => {
                        formData.append('privileges[]', privilege);
                    });
                } else if (key === 'is_trial' || key === 'send_invitation') {
                    // Convert boolean to proper format
                    formData.append(key, value ? '1' : '0');
                } else if (Array.isArray(value)) {
                    formData.append(key, JSON.stringify(value));
                } else {
                    formData.append(key, value);
                }
            });

            // Add profile picture if selected
            const fileInput = document.querySelector('input[type="file"]');
            if (fileInput && fileInput.files[0]) {
                // Check file size (assuming max 2MB)
                const maxSize = 2 * 1024 * 1024; // 2MB in bytes
                if (fileInput.files[0].size > maxSize) {
                    alert('Profile picture file size must be less than 2MB');
                    return;
                }
                formData.append('profile_picture', fileInput.files[0]);
            }

            // Debug: Log the form data
            console.log('Submitting coach data:', coachData);
            
            // Use relative path since axios baseURL is already set to '/api/'
            axios
                .post("coaches", formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'Accept': 'application/json',
                    }
                })
                .then((response) => {
                    // Hide loading indicator
                    this.isLoading = false;
                    
                    console.log('Success response:', response.data);
                    this.$root.$bvToast.toast('Coach created successfully!', {
                        title: 'Success',
                        variant: 'success',
                        solid: true,
                        autoHideDelay: 3000
                    });

                    // Show email status toasts
                    if (response.data.email_status) {
                        const emailStatus = response.data.email_status;
                        
                        // Password setup email status
                        if (emailStatus.password_setup_email_sent) {
                            this.$root.$bvToast.toast(`Password setup email sent to ${this.member.email}`, {
                                title: 'Email Sent',
                                variant: 'success',
                                solid: true,
                                autoHideDelay: 4000
                            });
                        } else if (emailStatus.password_setup_email_error) {
                            this.$root.$bvToast.toast(`Failed to send password setup email: ${emailStatus.password_setup_email_error}`, {
                                title: 'Email Error',
                                variant: 'warning',
                                solid: true,
                                autoHideDelay: 5000
                            });
                        }
                        
                        // Confirmation email status
                        if (emailStatus.confirmation_email_sent) {
                            this.$root.$bvToast.toast('Confirmation email sent to admin', {
                                title: 'Confirmation Sent',
                                variant: 'success',
                                solid: true,
                                autoHideDelay: 4000
                            });
                        } else if (emailStatus.confirmation_email_error) {
                            this.$root.$bvToast.toast(`Failed to send confirmation email: ${emailStatus.confirmation_email_error}`, {
                                title: 'Email Error',
                                variant: 'warning',
                                solid: true,
                                autoHideDelay: 5000
                            });
                        }
                    }
                    
                    setTimeout(() => {
                        this.$router.push("/app/Staff/coachlist");
                    }, 2000);
                })
                .catch((error) => {
                    // Hide loading indicator
                    this.isLoading = false;
                    
                    console.error("Error creating coach:", error);
                    console.error("Error response:", error.response);
                    
                    if (error.response && error.response.data) {
                        if (error.response.data.errors) {
                            // Handle validation errors
                            const errors = error.response.data.errors;
                            let errorMessage = 'Please fix the following errors:\n';
                            Object.keys(errors).forEach(field => {
                                errorMessage += `${field}: ${errors[field][0]}\n`;
                            });
                            this.$root.$bvToast.toast(errorMessage, {
                                title: 'Validation Error',
                                variant: 'danger',
                                solid: true,
                                autoHideDelay: 5000
                            });
                        } else if (error.response.data.message) {
                            this.$root.$bvToast.toast(`Error: ${error.response.data.message}`, {
                                title: 'Error',
                                variant: 'danger',
                                solid: true,
                                autoHideDelay: 5000
                            });
                        } else {
                            this.$root.$bvToast.toast('An error occurred while creating the coach. Please try again.', {
                                title: 'Error',
                                variant: 'danger',
                                solid: true,
                                autoHideDelay: 5000
                            });
                        }
                    } else {
                        this.$root.$bvToast.toast('Network error. Please check your connection and try again.', {
                            title: 'Network Error',
                            variant: 'danger',
                            solid: true,
                            autoHideDelay: 5000
                        });
                    }
                });
        },
        
        cleanFormData() {
            // Clean and validate form data before submission
            const cleaned = {};
            
            // Required fields - ensure they are not empty
            cleaned.firstName = this.member.firstName.trim();
            cleaned.lastName = this.member.lastName.trim();
            cleaned.mobile_phone = this.member.mobile_phone.trim();
            cleaned.landline_phone = this.member.landline_phone?.trim() || null;
            cleaned.email = this.member.email.trim().toLowerCase();
            cleaned.address = this.member.address.trim();
            cleaned.city = this.member.city.trim();
            cleaned.state = this.member.state.trim();
            cleaned.zip = this.member.zip.trim();
            
            // Optional fields - clean if they have values
            // Use computed DOB if birthday fields are filled, otherwise use dob field
            cleaned.dob = this.computedDob || this.member.dob || null;
            cleaned.gender = this.member.gender || null;
            cleaned.yearsOfExperience = this.member.yearsOfExperience || null;
            cleaned.status = this.member.status || null;
            cleaned.coachExperience = this.member.coachExperience?.trim() || null;
            cleaned.coachCertifications = this.member.coachCertifications?.trim() || null;
            cleaned.specializations = this.member.specializations || [];
            cleaned.height = this.member.height || null;
            cleaned.weight = this.member.weight || null;
            cleaned.chest = this.member.chest || null;
            cleaned.bloodGroup = this.member.bloodGroup || null;
            cleaned.medical = this.member.medical?.trim() || null;
            cleaned.emergencyName = this.member.emergencyName?.trim() || null;
            cleaned.emergencyPhone = this.member.emergencyPhone?.trim() || null;
            cleaned.emergencyRelation = this.member.emergencyRelation?.trim() || null;
            cleaned.referredBy = this.member.referredBy?.trim() || null;
            cleaned.lockerNumber = this.member.lockerNumber?.trim() || null;
            cleaned.bio = this.member.bio?.trim() || null;
            cleaned.socialMedia = this.member.socialMedia?.trim() || null;
            cleaned.notes = this.member.notes?.trim() || null;
            cleaned.weeklyAvailability = this.member.weeklyAvailability?.trim() || null;
            cleaned.sessionDuration = this.member.sessionDuration?.trim() || null;
            cleaned.maxClientsPerDay = this.member.maxClientsPerDay || null;
            cleaned.isTrial = this.member.isTrial || false;
            cleaned.trialStart = this.member.trialStart || null;
            cleaned.trialEnd = this.member.trialEnd || null;
            cleaned.plan = this.member.plan || null;
            cleaned.paymentMethod = this.member.paymentMethod || null;
            cleaned.amount = this.member.amount || null;
            cleaned.payAmount = this.member.payAmount || null;
            cleaned.paymentStartDate = this.member.paymentStartDate || null;
            cleaned.bankAccountName = this.member.bankAccountName?.trim() || null;
            cleaned.bankAccountNumber = this.member.bankAccountNumber?.trim() || null;
            cleaned.paymentNotes = this.member.paymentNotes?.trim() || null;
            
            // New fields
            cleaned.ownEmployeeId = this.member.ownEmployeeId?.trim() || null;
            cleaned.customExportField = this.member.customExportField?.trim() || null;
            cleaned.coachSince = this.member.coachSince || null;
            cleaned.subscriptionReason = this.member.subscriptionReason || 'Unknown';
            cleaned.language = this.member.language || 'English';
            cleaned.privileges = this.member.privileges || [];
            cleaned.country = this.member.country || 'United States';
            cleaned.routingNumber = this.member.routingNumber?.trim() || null;
            cleaned.bankAccountType = this.member.bankAccountType || 'Checking';
            cleaned.bankName = this.member.bankName?.trim() || null;
            cleaned.sendInvitation = this.member.sendInvitation !== undefined ? this.member.sendInvitation : true;
            
            return cleaned;
        },
        
        goBack() {
            // Check if there's a previous page in browser history
            if (window.history.length > 1) {
                this.$router.go(-1);
            } else {
                // Fallback to coaches list if no history
                this.$router.push('/app/Staff/coachlist');
            }
        },
        
        async openWebcam() {
            this.showWebcam = true;
            await this.$nextTick();
            try {
                const stream = await navigator.mediaDevices.getUserMedia({ video: true });
                this.$refs.webcamVideo.srcObject = stream;
            } catch (error) {
                console.error('Error accessing webcam:', error);
                alert('Could not access webcam. Please check your permissions.');
                this.showWebcam = false;
            }
        },
        
        closeWebcam() {
            this.showWebcam = false;
            if (this.$refs.webcamVideo && this.$refs.webcamVideo.srcObject) {
                const tracks = this.$refs.webcamVideo.srcObject.getTracks();
                tracks.forEach(track => track.stop());
            }
        },
        
        takeSnapshot() {
            const video = this.$refs.webcamVideo;
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            
            ctx.drawImage(video, 0, 0);
            
            const dataURL = canvas.toDataURL('image/jpeg', 0.7);
            this.photoUrl = dataURL;
            
            this.closeWebcam();
        },

        getMaxDate() {
            // Set maximum date to today (prevent future dates)
            const today = new Date();
            return today.toISOString().split('T')[0];
        }
    },
};
</script>

<style lang="scss">
@import "../../../../assets/styles/sass/_variables.scss";

// Back button styles
.back-button {
  background: none !important;
  border: none !important;
  color: #6c757d !important;
  font-size: 18px !important;
  cursor: pointer !important;
  padding: 8px !important;
  border-radius: 6px !important;
  transition: all 0.2s ease !important;
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  min-width: 36px !important;
  min-height: 36px !important;
  position: relative !important;
  z-index: 10 !important;
  pointer-events: auto !important;
  
  &:hover {
    color: red !important;
    transform: translateX(-2px);
  }
  
  &:active {
    transform: translateX(-1px);
  }
  
  i {
    font-size: 16px;
  }
}

.breadcrumb-nav {
  margin-bottom: 5px;
}

.breadcrumb-container {
  display: flex;
  align-items: center;
  gap: 15px;
}

.member-form-container {
    min-height: 100vh;
    background: linear-gradient(135deg, $color-background 0%, #e8e8e6 100%);
}

// Constrain inner content and add fluid padding without relying on global .container
.member-form-container .container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 10px 15px;
}

.form-card {
    background: $color-white;
    border-radius: 20px;
    box-shadow: 0 20px 60px rgba(79, 112, 92, 0.15);
    overflow: hidden;
  margin: 10px 0;
}

.form-header {
    background: $color-background-sidebar;
    color: white;
    text-align: center;
    position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  padding: 8px;
}

.form-header::before {
  content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grain" width="100" height="100" patternUnits="userSpaceOnUse"><circle cx="25" cy="25" r="1" fill="white" opacity="0.1"/><circle cx="75" cy="75" r="1" fill="white" opacity="0.1"/><circle cx="50" cy="10" r="0.5" fill="white" opacity="0.1"/><circle cx="10" cy="60" r="0.5" fill="white" opacity="0.1"/><circle cx="90" cy="40" r="0.5" fill="white" opacity="0.1"/></pattern></defs><rect width="100" height="100" fill="url(%23grain)"/></svg>');
    opacity: 0.3;
}

.header-content {
  display: flex;
  align-items: center;
  gap: 10px;
  flex: 1;
  justify-content: center;
}

.header-icon {
  width: 45px;
  height: 45px;
    background: rgba(255, 255, 255, 0.2);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
  font-size: 15px;
  flex-shrink: 0;
}

.form-title {
  font-size: 1.1rem;
    font-weight: 700;
  color: #ffffff;
  margin: 0;
}

.form-subtitle {
  font-size: 0.8rem;
    opacity: 0.9;
    margin: 0;
}

.member-form {
  padding: 15px;
}

.client-data-layout {
  display: flex;
  gap: 35px;
  align-items: flex-start;
}

.profile-section {
  flex: 0 0 290px;
  display: flex;
  justify-content: center;
  max-width: 100%;
}

.profile-picture-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
}

.profile-picture {
  width: 200px;
  height: 200px;
  border-radius: 50%;
  background: #f5f5f5;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border: 3px solid #e0e0e0;
  transition: all 0.3s ease;
  overflow: hidden;
}

.profile-picture:hover {
  border-color: #ff4040;
  transform: scale(1.02);
}

.profile-placeholder {
  color: #999;
  font-size: 60px;
}

.profile-image {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.preview-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 50%;
}

.change-button {
  background: #ff4040;
  color: white;
  border: none;
  padding: 8px 20px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  transition: all 0.3s ease;
}

.change-button:hover {
  background: #e63939;
  transform: translateY(-1px);
}

.webcam-button {
  background: white;
  color: #333;
  border: 1px solid #ddd;
  padding: 8px 20px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  transition: all 0.3s ease;
}

.webcam-button:hover {
  background: #f8f9fa;
  border-color: #ff4040;
}

.form-fields-section {
  flex: 1;
  background: white;
  padding: 15px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  min-width: 0; // prevent overflow on narrow viewports
}

.section-title {
  font-size: 24px;
    font-weight: 600;
  color: #333;
  border-bottom: 2px solid #f0f0f0;
  margin-top: 20px;
  margin-bottom: 15px;
  padding-bottom: 10px;
}

h5.section-title {
  font-size: 18px;
  margin-top: 25px;
  margin-bottom: 15px;
}

.form-fields {
  display: flex;
  flex-direction: column;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
  min-width: 0; // allow inputs to shrink within grid
}

.form-label {
  font-weight: 500;
  color: #333;
  font-size: 14px;
  display: flex;
  align-items: center;
  gap: 5px;
}

.info-icon {
  color: #ff4040;
  font-size: 12px;
  cursor: pointer;
}

.form-control {
    width: 100%;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
    transition: all 0.3s ease;
  background: #f8f9fa;
  color: #333;
  padding: 5px 8px;
  box-sizing: border-box;
}

.form-control:focus {
    outline: none;
  border-color: #ff4040;
  background: white;
  box-shadow: 0 0 0 2px rgba(255, 64, 64, 0.25);
}

.form-control:disabled {
  background: #e9ecef;
  color: #6c757d;
  cursor: not-allowed;
}

/* Birthday date input styling */
input[type="date"] {
  position: relative;
}

input[type="date"]::-webkit-calendar-picker-indicator {
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
  color: #6c757d;
  font-size: 16px;
}

input[type="date"]:focus::-webkit-calendar-picker-indicator {
  color: #ff4040;
}

.form-control::placeholder {
  color: #6c757d !important;
  opacity: 1 !important;
  font-size: 12px;
}

.form-control:focus::placeholder {
  color: #6c757d !important;
  opacity: 0.7 !important;
}

.form-control.has-value::placeholder {
  color: #6c757d !important;
  opacity: 0.7 !important;
}

/* Input icons - add left padding and background icons for all fields */
.member-form .form-control {
  padding-left: 36px;
  background-repeat: no-repeat;
  background-position: 10px 50%;
  background-size: 16px 16px;
}

/* Text-like inputs (default user icon) */
.member-form input[type="text"].form-control {
  background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="%236c757d" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>');
}

/* Email */
.member-form input[type="email"].form-control {
  background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="%236c757d" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16v16H4z"/><path d="M22 6l-10 7L2 6"/></svg>');
}

/* Telephone */
.member-form input[type="tel"].form-control {
  background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="%236c757d" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.09 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.12.81.3 1.6.54 2.36a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.72-1.11a2 2 0 0 1 2.11-.45c.76.24 1.55.42 2.36.54A2 2 0 0 1 22 16.92z"/></svg>');
}

/* Number */
.member-form input[type="number"].form-control {
  background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="%236c757d" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 3v18"/><path d="M19 3v18"/><path d="M5 7h14"/><path d="M5 17h14"/></svg>');
}

/* Date */
.member-form input[type="date"].form-control {
  background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="%236c757d" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>');
}

/* Select */
.member-form select.form-control {
  background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="%236c757d" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg>');
}

/* Multi-select (Specializations) - show tags icon and pin to top-left */
.member-form select[multiple].form-control {
  background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="%236c757d" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.59 13.41L11 3H4v7l9.59 9.59a2 2 0 0 0 2.82 0l4.18-4.18a2 2 0 0 0 0-2.82z"/><path d="M7 7h.01"/></svg>');
  background-position: 10px 10px;
  background-attachment: local;
}

/* Textarea */
.member-form textarea.form-control {
  background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="%236c757d" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>');
}

/* Ensure placeholders are visible in all browsers */
.form-control::-webkit-input-placeholder {
  color: #6c757d !important;
  opacity: 1 !important;
}

.form-control::-moz-placeholder {
  color: #6c757d !important;
  opacity: 1 !important;
}

.form-control:-ms-input-placeholder {
  color: #6c757d !important;
  opacity: 1 !important;
}

.form-control:-moz-placeholder {
  color: #6c757d !important;
  opacity: 1 !important;
}

/* Additional styling to ensure placeholders are visible */
input[type="text"]::placeholder,
input[type="email"]::placeholder,
input[type="tel"]::placeholder,
input[type="date"]::placeholder,
textarea::placeholder {
  color: #6c757d !important;
  opacity: 1 !important;
  font-size: 12px !important;
}

/* Force placeholder visibility */
.form-control:not(:focus):not(.has-value)::placeholder {
  color: #6c757d !important;
  opacity: 1 !important;
  visibility: visible !important;
}

.file-input {
    display: none;
}

.submit-section {
    text-align: center;
  margin-top: 10px;
  padding-top: 10px;
  border-top: 1px solid $color-divider;
}

.submit-btn {
  background: #ff4040;
  color: white;
    border: none;
  padding: 10px 25px;
  border-radius: 25px;
  font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
  box-shadow: 0 8px 20px rgba(255, 64, 64, 0.3);
    display: inline-flex;
    align-items: center;
  gap: 8px;
}

.submit-btn:hover {
    transform: translateY(-2px);
  background: #e63939;
  box-shadow: 0 15px 40px rgba(255, 64, 64, 0.4);
}

.submit-btn:active {
    transform: translateY(0);
}

/* Required field asterisk styling */
.required-asterisk {
  color: #dc3545;
  font-weight: bold;
  margin-left: 2px;
}

/* Responsive Design */
@media (max-width: 768px) {
    .member-form {
    padding: 15px;
    }

    .form-header {
    padding: 15px;
    flex-direction: column;
    gap: 10px;
    }
  
  .header-content {
    flex-direction: column;
    gap: 10px;
  }

    .form-title {
    font-size: 1.2rem;
  }
  
  .form-subtitle {
    font-size: 0.8rem;
    }

    .header-icon {
    width: 50px;
    height: 50px;
    font-size: 18px;
    }

  .client-data-layout {
    flex-direction: column;
    gap: 15px;
    align-items: stretch; // ensure children take full width in column layout
  }
  
  .profile-section {
    flex: none;
    align-items: center;
    width: 100%;
  }
  
  .profile-picture {
    width: 150px;
    height: 150px;
  }
  
  .form-fields-section {
    padding: 10px;
    width: 100%;
  }
}

/* Webcam Modal Styles */
.webcam-modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.webcam-modal {
  background: white;
  border-radius: 12px;
        padding: 20px;
  max-width: 400px;
  width: 90%;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
}

.webcam-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
  font-size: 18px;
  font-weight: 600;
  color: #333;
}

.close-btn {
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: #666;
  padding: 0;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: all 0.2s ease;
}

.close-btn:hover {
  background: #f0f0f0;
  color: #333;
}

.webcam-video-container {
  display: flex;
  justify-content: center;
  margin-bottom: 15px;
}

.webcam-actions {
  display: flex;
  gap: 10px;
  justify-content: center;
}

.btn {
  padding: 8px 16px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 6px;
}

.btn-primary {
  background: #ff4040;
  color: white;
}

.btn-primary:hover {
  background: #e63939;
  transform: translateY(-1px);
}

.btn-secondary {
  background: #6c757d;
  color: white;
}

.btn-secondary:hover {
  background: #5a6268;
  transform: translateY(-1px);
}

/* Multiple select styling */
select[multiple] {
  min-height: 100px;
  padding: 8px;
}

select[multiple] option {
  padding: 4px 8px;
  margin: 2px 0;
}

select[multiple] option:checked {
  background: #ff4040;
  color: white;
}

/* Textarea styling */
textarea.form-control {
  resize: vertical;
  min-height: 80px;
}

/* Birthday inputs */
.birthday-inputs {
  display: flex;
  gap: 10px;
  
  .birthday-select {
    flex: 1;
  }
}

/* Tooltip styles */
.tooltip-wrapper {
  position: relative;
  display: inline-block;
  margin-left: 5px;
  cursor: help;
  
  .tooltip-content {
    position: absolute;
    bottom: 100%;
    left: 50%;
    transform: translateX(-50%);
    background: #333;
    color: white;
    padding: 8px 12px;
    border-radius: 4px;
    font-size: 12px;
    white-space: nowrap;
    opacity: 0;
    visibility: hidden;
    transition: opacity 0.3s, visibility 0.3s;
    margin-bottom: 5px;
    z-index: 1000;
    min-width: 200px;
    white-space: normal;
    text-align: left;
    
    &.is-visible {
      opacity: 1;
      visibility: visible;
    }
    
    &::after {
      content: '';
      position: absolute;
      top: 100%;
      left: 50%;
      transform: translateX(-50%);
      border: 5px solid transparent;
      border-top-color: #333;
    }
  }
  
  // Show tooltip on hover
  &:hover .tooltip-content {
    opacity: 1;
    visibility: visible;
  }
}

/* Privileges checkboxes */
.privileges-checkboxes {
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 10px;
  background: #f8f9fa;
  border-radius: 4px;
  
  .custom-checkbox {
    display: flex;
    align-items: center;
    gap: 8px;
    cursor: pointer;
    
    input[type="checkbox"] {
      width: 18px;
      height: 18px;
      cursor: pointer;
    }
    
    .checkbox-label {
      flex: 1;
      font-size: 14px;
    }
    
    .info-icon-small {
      color: #6c757d;
      font-size: 12px;
      cursor: help;
    }
  }
}

/* Custom checkbox and radio styles */
.custom-checkbox {
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  
  input[type="checkbox"],
  input[type="radio"] {
    width: 18px;
    height: 18px;
    cursor: pointer;
  }
  
  .checkmark {
    display: none;
  }
  
  .checkbox-label {
    font-size: 14px;
    display: flex;
    align-items: center;
    gap: 5px;
  }
}

.invitation-checkbox {
  margin-bottom: 10px;
  padding: 8px;
  border-radius: 4px;
  transition: background 0.2s;
  
  &:hover {
    background: #f8f9fa;
  }
}

.form-group.compact {
  margin-bottom: 10px;
}

/* Loading Overlay Styles */
.loading-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(255, 255, 255, 0.9);
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
  
  .loading_wrap {
    position: relative;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: transparent;
  }
  
  .loader_logo {
    position: absolute;
    height: 80px;
    width: 80px;
    left: calc(50% - 40px);
    top: calc(50% - 80px);
    z-index: 10000;
    
    img {
      height: 100%;
      width: 100%;
      object-fit: contain;
    }
  }
  
  .loading {
    border: 3px solid rgba(102, 51, 153, 0.45);
    position: absolute;
    left: calc(50% - 27.5px);
    top: calc(50% + 20px);
    width: 55px;
    height: 55px;
    border-radius: 50%;
    border-top-color: #ff4040;
    animation: loader 1s ease-in-out infinite;
    -webkit-animation: loader 1s ease-in-out infinite;
  }
}

@keyframes loader {
  to {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}

@-webkit-keyframes loader {
  to {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}

/* Disable submit button when loading */
.submit-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  pointer-events: none;
}

/* Field Error Styling */
.field-error {
  color: #dc3545;
  font-size: 12px;
  margin-top: 4px;
  display: flex;
  align-items: center;
  gap: 4px;
  font-weight: 500;
  animation: fadeIn 0.3s ease;
}

.field-error::before {
  content: "⚠";
  font-size: 14px;
  margin-right: 2px;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-5px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Invalid Input Styling */
.form-control.is-invalid {
  border-color: #dc3545 !important;
  background-color: #fff5f5 !important;
  padding-right: 35px;
}

.form-control.is-invalid:focus {
  border-color: #dc3545 !important;
  box-shadow: 0 0 0 2px rgba(220, 53, 69, 0.25) !important;
  background-color: #fff !important;
}

/* Birthday Inputs Wrapper */
.birthday-inputs-wrapper {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.birthday-inputs {
  display: flex;
  gap: 10px;
}

.birthday-select.is-invalid {
  border-color: #dc3545 !important;
  background-color: #fff5f5 !important;
}

/* Ensure error messages don't break layout */
.form-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

/* Error message positioning */
.form-group .field-error {
  order: 2;
}

/* Select error styling */
select.form-control.is-invalid {
  background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23dc3545' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6,9 12,15 18,9'%3e%3c/polyline%3e%3c/svg%3e"),
                      url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23dc3545' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3ccircle cx='12' cy='12' r='10'/%3e%3cline x1='12' y1='8' x2='12' y2='12'/%3e%3cline x1='12' y1='16' x2='12.01' y2='16'/%3e%3c/svg%3e");
  background-position: right 12px center, right 35px center;
  background-size: 16px, 14px;
  padding-right: 55px;
}

/* Responsive error messages */
@media (max-width: 768px) {
  .field-error {
    font-size: 11px;
    margin-top: 3px;
  }
  
  .birthday-inputs-wrapper {
    width: 100%;
  }
  
  .birthday-inputs {
    width: 100%;
    gap: 6px;
  }
}
</style>
