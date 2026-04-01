<template>
  <div class="main-content">
    <breadcumb :page="Create_Permission" :folder="Settings"/>

    <validation-observer ref="Create_Permission">
      <b-form @submit.prevent="Submit_Permission">
        <b-row>
          <b-col lg="12" md="12" sm="12">
            <b-card>
              <b-row>
                <!-- Role Name -->
                <b-col md="6">
                  <validation-provider
                    name="Role name"
                    :rules="{ required: true}"
                    v-slot="validationContext"
                  >
                    <b-form-group :label="RoleName + ' ' + '*'">
                      <b-form-input
                        :placeholder="Enter_Role_Name"
                        :state="getValidationState(validationContext)"
                        aria-describedby="Role-feedback"
                        v-model="role.name"
                      ></b-form-input>
                      <b-form-invalid-feedback id="Role-feedback">{{ validationContext.errors[0] }}</b-form-invalid-feedback>
                    </b-form-group>
                  </validation-provider>
                </b-col>

                <!-- Role Description -->
                <b-col md="6">
                  <b-form-group :label="RoleDescription">
                    <b-form-input
                      :placeholder="Enter_Role_Description"
                      v-model="role.description"
                    ></b-form-input>
                  </b-form-group>
                </b-col>
              </b-row>

              <b-row class="mt-4 role-permission">
                <!--dashboard -->
                <b-col md="4">
                  <b-card no-body class="ul-card__border-radius">
                    <b-card-header header-tag="header" class="p-1" role="tab">
                      <b-button
                        class="card-title mb-0"
                        block
                        href="#"
                        v-b-toggle.panel-dashboard
                        variant="transparent"
                      >dashboard</b-button>
                    </b-card-header>
                    <b-collapse
                      id="panel-dashboard "
                      :visible="true"
                      accordion="my-dashboard"
                      role="tabpanel"
                    >
                      <b-card-body>
                        <b-card-text>
                          <b-row>
                            <!--dashboard -->
                            <b-col md="6">
                              <label class="checkbox checkbox-outline-primary">
                                <input
                                  type="checkbox"
                                  checked
                                  v-model="permissions"
                                  value="dashboard"
                                >
                                <span>dashboard <i v-b-tooltip.hover.bottom title="if unchecked only welcome message will be displayed in dashboard" class="text-info text-15 font-weight-bold i-Speach-BubbleAsking"></i></span>
                                <span class="checkmark"></span>
                              </label>
                            </b-col>
                          </b-row>
                        </b-card-text>
                      </b-card-body>
                    </b-collapse>
                  </b-card>
                </b-col>

                <!--Users -->
                <b-col md="4">
                  <b-card no-body class="ul-card__border-radius">
                    <b-card-header header-tag="header" class="p-1" role="tab">
                      <b-button
                        class="card-title mb-0"
                        block
                        href="#"
                        v-b-toggle.panel-Members
                        variant="transparent"
                      >Members</b-button>
                    </b-card-header>
                    <b-collapse
                      id="panel-Members "
                      :visible="true"
                      accordion="my-accordion1"
                      role="tabpanel"
                    >
                      <b-card-body>
                        <b-card-text>
                          <b-row>
                            <!--Users View -->
                            <b-col md="6">
                              <label class="checkbox checkbox-outline-primary">
                                <input
                                  type="checkbox"
                                  checked
                                  v-model="permissions"
                                  value="users_view"
                                >
                                <span>View</span>
                                <span class="checkmark"></span>
                              </label>
                            </b-col>
                            <!--Users ADD -->
                            <b-col md="6">
                              <label class="checkbox checkbox-outline-primary">
                                <input
                                  type="checkbox"
                                  checked
                                  v-model="permissions"
                                  value="users_add"
                                >
                                <span>Add</span>
                                <span class="checkmark"></span>
                              </label>
                            </b-col>
                            <!--Users Edit -->
                            <b-col md="6">
                              <label class="checkbox checkbox-outline-primary">
                                <input
                                  type="checkbox"
                                  checked
                                  v-model="permissions"
                                  value="users_edit"
                                >
                                <span>Edit</span>
                                <span class="checkmark"></span>
                              </label>
                            </b-col>
                            <!--Users Delete -->
                            <b-col md="6">
                              <label class="checkbox checkbox-outline-primary">
                                <input
                                  type="checkbox"
                                  checked
                                  v-model="permissions"
                                  value="users_delete"
                                >
                                <span>Del</span>
                                <span class="checkmark"></span>
                              </label>
                            </b-col>
                            <!--Users record view -->
                            <b-col md="12">
                              <label class="checkbox checkbox-outline-primary">
                                <input
                                  type="checkbox"
                                  checked
                                  v-model="permissions"
                                  value="record_view"
                                >
                                <span>ShowAll</span>
                                <span class="checkmark"></span>
                              </label>
                            </b-col>
                          </b-row>
                        </b-card-text>
                      </b-card-body>
                    </b-collapse>
                  </b-card>
                </b-col>

                  <!-- Add new member -->
                <b-col md="4">
                  <b-card no-body class="ul-card__border-radius">
                    <b-card-header header-tag="header" class="p-1" role="tab">
                      <b-button
                        class="card-title mb-0"
                        block
                        href="#"
                        v-b-toggle.panel-AddMembers
                        variant="transparent"
                      >Add Members</b-button>
                    </b-card-header>
                    <b-collapse
                      id="panel-AddMembers "
                      :visible="true"
                      accordion="my-accordion13"
                      role="tabpanel"
                    >
                      <b-card-body>
                        <b-card-text>
                          <b-row>
                            <!--Add Member View -->
                            <b-col md="6">
                              <label class="checkbox checkbox-outline-primary">
                                <input
                                  type="checkbox"
                                  checked
                                  v-model="permissions"
                                  value="addmember_view"
                                >
                                <span>View</span>
                                <span class="checkmark"></span>
                              </label>
                            </b-col>
                            <!--Add Member ADD -->
                            <b-col md="6">
                              <label class="checkbox checkbox-outline-primary">
                                <input
                                  type="checkbox"
                                  checked
                                  v-model="permissions"
                                  value="addmember_add"
                                >
                                <span>Add</span>
                                <span class="checkmark"></span>
                              </label>
                            </b-col>
                            <!--Add Member Edit -->
                            <b-col md="6">
                              <label class="checkbox checkbox-outline-primary">
                                <input
                                  type="checkbox"
                                  checked
                                  v-model="permissions"
                                  value="addmember_edit"
                                >
                                <span>Edit</span>
                                <span class="checkmark"></span>
                              </label>
                            </b-col>
                            <!--Add Member Delete -->
                            <b-col md="6">
                              <label class="checkbox checkbox-outline-primary">
                                <input
                                  type="checkbox"
                                  checked
                                  v-model="permissions"
                                  value="addmember_delete"
                                >
                                <span>Del</span>
                                <span class="checkmark"></span>
                              </label>
                            </b-col>
                          </b-row>
                        </b-card-text>
                      </b-card-body>
                    </b-collapse>
                  </b-card>
                </b-col>

                  <!-- Member Details -->
                <b-col md="4">
                  <b-card no-body class="ul-card__border-radius">
                    <b-card-header header-tag="header" class="p-1" role="tab">
                      <b-button
                        class="card-title mb-0"
                        block
                        href="#"
                        v-b-toggle.panel-MembersDetails
                        variant="transparent"
                      >Members Details</b-button>
                    </b-card-header>
                    <b-collapse
                      id="panel-MembersDetails "
                      :visible="true"
                      accordion="my-accordion12"
                      role="tabpanel"
                    >
                      <b-card-body>
                        <b-card-text>
                          <b-row>
                            <!--Members Details View -->
                            <b-col md="6">
                              <label class="checkbox checkbox-outline-primary">
                                <input
                                  type="checkbox"
                                  checked
                                  v-model="permissions"
                                  value="memberdetails_view"
                                >
                                <span>View</span>
                                <span class="checkmark"></span>
                              </label>
                            </b-col>
                            <!--Members Details ADD -->
                            <b-col md="6">
                              <label class="checkbox checkbox-outline-primary">
                                <input
                                  type="checkbox"
                                  checked
                                  v-model="permissions"
                                  value="memberdetails_add"
                                >
                                <span>Add</span>
                                <span class="checkmark"></span>
                              </label>
                            </b-col>
                            <!--Members Details Edit -->
                            <b-col md="6">
                              <label class="checkbox checkbox-outline-primary">
                                <input
                                  type="checkbox"
                                  checked
                                  v-model="permissions"
                                  value="memberdetails_edit"
                                >
                                <span>Edit</span>
                                <span class="checkmark"></span>
                              </label>
                            </b-col>
                            <!--Members Details Delete -->
                            <b-col md="6">
                              <label class="checkbox checkbox-outline-primary">
                                <input
                                  type="checkbox"
                                  checked
                                  v-model="permissions"
                                  value="memberdetails_delete"
                                >
                                <span>Del</span>
                                <span class="checkmark"></span>
                              </label>
                            </b-col>
                          </b-row>
                        </b-card-text>
                      </b-card-body>
                    </b-collapse>
                  </b-card>
                </b-col>

                  <!-- Member Tags & Group -->
                <b-col md="4">
                  <b-card no-body class="ul-card__border-radius">
                    <b-card-header header-tag="header" class="p-1" role="tab">
                      <b-button
                        class="card-title mb-0"
                        block
                        href="#"
                        v-b-toggle.panel-MembersGroup
                        variant="transparent"
                      >Members Tags & Group</b-button>
                    </b-card-header>
                    <b-collapse
                      id="panel-MembersGroup "
                      :visible="true"
                      accordion="my-accordion15"
                      role="tabpanel"
                    >
                      <b-card-body>
                        <b-card-text>
                          <b-row>
                            <!--Members Tags & Group View -->
                            <b-col md="6">
                              <label class="checkbox checkbox-outline-primary">
                                <input
                                  type="checkbox"
                                  checked
                                  v-model="permissions"
                                  value="membergroup_view"
                                >
                                <span>View</span>
                                <span class="checkmark"></span>
                              </label>
                            </b-col>
                            <!--Members Tags & Group ADD -->
                            <b-col md="6">
                              <label class="checkbox checkbox-outline-primary">
                                <input
                                  type="checkbox"
                                  checked
                                  v-model="permissions"
                                  value="membergroup_add"
                                >
                                <span>Add</span>
                                <span class="checkmark"></span>
                              </label>
                            </b-col>
                            <!--Members Tags & Group Edit -->
                            <b-col md="6">
                              <label class="checkbox checkbox-outline-primary">
                                <input
                                  type="checkbox"
                                  checked
                                  v-model="permissions"
                                  value="membergroup_edit"
                                >
                                <span>Edit</span>
                                <span class="checkmark"></span>
                              </label>
                            </b-col>
                            <!--Members Tags & Group Delete -->
                            <b-col md="6">
                              <label class="checkbox checkbox-outline-primary">
                                <input
                                  type="checkbox"
                                  checked
                                  v-model="permissions"
                                  value="membergroup_delete"
                                >
                                <span>Del</span>
                                <span class="checkmark"></span>
                              </label>
                            </b-col>
                          </b-row>
                        </b-card-text>
                      </b-card-body>
                    </b-collapse>
                  </b-card>
                </b-col>

                  <!-- Progress Tracker -->
                <b-col md="4">
                  <b-card no-body class="ul-card__border-radius">
                    <b-card-header header-tag="header" class="p-1" role="tab">
                      <b-button
                        class="card-title mb-0"
                        block
                        href="#"
                        v-b-toggle.panel-Progress
                        variant="transparent"
                      >Progress Tracker</b-button>
                    </b-card-header>
                    <b-collapse
                      id="panel-Progress "
                      :visible="true"
                      accordion="my-accordion16"
                      role="tabpanel"
                    >
                      <b-card-body>
                        <b-card-text>
                          <b-row>
                            <!--Progress Tracker View -->
                            <b-col md="6">
                              <label class="checkbox checkbox-outline-primary">
                                <input
                                  type="checkbox"
                                  checked
                                  v-model="permissions"
                                  value="progress_view"
                                >
                                <span>View</span>
                                <span class="checkmark"></span>
                              </label>
                            </b-col>
                            <!--Progress Tracker ADD -->
                            <b-col md="6">
                              <label class="checkbox checkbox-outline-primary">
                                <input
                                  type="checkbox"
                                  checked
                                  v-model="permissions"
                                  value="progress_add"
                                >
                                <span>Add</span>
                                <span class="checkmark"></span>
                              </label>
                            </b-col>
                            <!--Progress Tracker Edit -->
                            <b-col md="6">
                              <label class="checkbox checkbox-outline-primary">
                                <input
                                  type="checkbox"
                                  checked
                                  v-model="permissions"
                                  value="progress_edit"
                                >
                                <span>Edit</span>
                                <span class="checkmark"></span>
                              </label>
                            </b-col>
                            <!--Progress Tracker Delete -->
                            <b-col md="6">
                              <label class="checkbox checkbox-outline-primary">
                                <input
                                  type="checkbox"
                                  checked
                                  v-model="permissions"
                                  value="progress_delete"
                                >
                                <span>Del</span>
                                <span class="checkmark"></span>
                              </label>
                            </b-col>
                          </b-row>
                        </b-card-text>
                      </b-card-body>
                    </b-collapse>
                  </b-card>
                </b-col>

                  <!-- Subscription -->
                <b-col md="4">
                  <b-card no-body class="ul-card__border-radius">
                    <b-card-header header-tag="header" class="p-1" role="tab">
                      <b-button
                        class="card-title mb-0"
                        block
                        href="#"
                        v-b-toggle.panel-subscription
                        variant="transparent"
                      >Subscription</b-button>
                    </b-card-header>
                    <b-collapse
                      id="panel-subscription "
                      :visible="true"
                      accordion="my-accordion14"
                      role="tabpanel"
                    >
                      <b-card-body>
                        <b-card-text>
                          <b-row>
                            <!--Subscription View -->
                            <b-col md="6">
                              <label class="checkbox checkbox-outline-primary">
                                <input
                                  type="checkbox"
                                  checked
                                  v-model="permissions"
                                  value="subscription_view"
                                >
                                <span>View</span>
                                <span class="checkmark"></span>
                              </label>
                            </b-col>
                            <!--Subscription ADD -->
                            <b-col md="6">
                              <label class="checkbox checkbox-outline-primary">
                                <input
                                  type="checkbox"
                                  checked
                                  v-model="permissions"
                                  value="subscription_add"
                                >
                                <span>Add</span>
                                <span class="checkmark"></span>
                              </label>
                            </b-col>
                            <!--Subscription Edit -->
                            <b-col md="6">
                              <label class="checkbox checkbox-outline-primary">
                                <input
                                  type="checkbox"
                                  checked
                                  v-model="permissions"
                                  value="subscription_edit"
                                >
                                <span>Edit</span>
                                <span class="checkmark"></span>
                              </label>
                            </b-col>
                            <!--Subscription Delete -->
                            <b-col md="6">
                              <label class="checkbox checkbox-outline-primary">
                                <input
                                  type="checkbox"
                                  checked
                                  v-model="permissions"
                                  value="subscription_delete"
                                >
                                <span>Del</span>
                                <span class="checkmark"></span>
                              </label>
                            </b-col>
                          </b-row>
                        </b-card-text>
                      </b-card-body>
                    </b-collapse>
                  </b-card>
                </b-col>

                <!--  Permissions -->
                <b-col md="4">
                  <b-card no-body class="ul-card__border-radius">
                    <b-card-header header-tag="header" class="p-1" role="tab">
                      <b-button
                        class="card-title mb-0"
                        block
                        href="#"
                        v-b-toggle.panel-Permissions
                        variant="transparent"
                      >Trainers</b-button>
                    </b-card-header>
                    <b-collapse
                      id="panel-Permissions "
                      :visible="true"
                      accordion="my-accordion2"
                      role="tabpanel"
                    >
                      <b-card-body>
                        <b-card-text>
                          <b-row>
                            <!--Permissions View -->
                            <b-col md="6">
                              <label class="checkbox checkbox-outline-primary">
                                <input
                                  type="checkbox"
                                  checked
                                  v-model="permissions"
                                  value="permissions_view"
                                >
                                <span>View</span>
                                <span class="checkmark"></span>
                              </label>
                            </b-col>
                            <!--Permissions ADD -->
                            <b-col md="6">
                              <label class="checkbox checkbox-outline-primary">
                                <input
                                  type="checkbox"
                                  checked
                                  v-model="permissions"
                                  value="permissions_add"
                                >
                                <span>Add</span>
                                <span class="checkmark"></span>
                              </label>
                            </b-col>
                            <!--Permissions Edit -->
                            <b-col md="6">
                              <label class="checkbox checkbox-outline-primary">
                                <input
                                  type="checkbox"
                                  checked
                                  v-model="permissions"
                                  value="permissions_edit"
                                >
                                <span>Edit</span>
                                <span class="checkmark"></span>
                              </label>
                            </b-col>
                            <!--Permissions Delete -->
                            <b-col md="6">
                              <label class="checkbox checkbox-outline-primary">
                                <input
                                  type="checkbox"
                                  checked
                                  v-model="permissions"
                                  value="permissions_delete"
                                >
                                <span>Del</span>
                                <span class="checkmark"></span>
                              </label>
                            </b-col>

                           <!--Users record view -->
                            <b-col md="12">
                              <label class="checkbox checkbox-outline-primary">
                                <input
                                  type="checkbox"
                                  checked
                                  v-model="permissions"
                                  value="record_view"
                                >
                                <span>ShowAll</span>
                                <span class="checkmark"></span>
                              </label>
                            </b-col>
                          </b-row>
                        </b-card-text>
                      </b-card-body>
                    </b-collapse>
                  </b-card>
                </b-col>

                <!--Add Trainer-->
                <b-col md="4">
                  <b-card no-body class="ul-card__border-radius">
                    <b-card-header header-tag="header" class="p-1" role="tab">
                      <b-button
                        class="card-title mb-0"
                        block
                        href="#"
                        v-b-toggle.panel-addTrainer
                        variant="transparent"
                      >Add Trainer</b-button>
                    </b-card-header>
                    <b-collapse
                      id="panel-addTrainer "
                      :visible="true"
                      accordion="my-accordion17"
                      role="tabpanel"
                    >
                      <b-card-body>
                        <b-card-text>
                          <b-row>
                            <!--Add Trainer View -->
                            <b-col md="6">
                              <label class="checkbox checkbox-outline-primary">
                                <input
                                  type="checkbox"
                                  checked
                                  v-model="permissions"
                                  value="addTrainer_view"
                                >
                                <span>View</span>
                                <span class="checkmark"></span>
                              </label>
                            </b-col>
                            <!--Add Trainer ADD -->
                            <b-col md="6">
                              <label class="checkbox checkbox-outline-primary">
                                <input
                                  type="checkbox"
                                  checked
                                  v-model="permissions"
                                  value="addTrainer_add"
                                >
                                <span>Add</span>
                                <span class="checkmark"></span>
                              </label>
                            </b-col>
                            <!--Add Trainer Edit -->
                            <b-col md="6">
                              <label class="checkbox checkbox-outline-primary">
                                <input
                                  type="checkbox"
                                  checked
                                  v-model="permissions"
                                  value="addTrainer_edit"
                                >
                                <span>Edit</span>
                                <span class="checkmark"></span>
                              </label>
                            </b-col>
                            <!--Add Trainer Delete -->
                            <b-col md="6">
                              <label class="checkbox checkbox-outline-primary">
                                <input
                                  type="checkbox"
                                  checked
                                  v-model="permissions"
                                  value="addTrainer_delete"
                                >
                                <span>Del</span>
                                <span class="checkmark"></span>
                              </label>
                            </b-col>
                          </b-row>
                        </b-card-text>
                      </b-card-body>
                    </b-collapse>
                  </b-card>
                </b-col>

                <!--Trainer Details-->
                <b-col md="4">
                  <b-card no-body class="ul-card__border-radius">
                    <b-card-header header-tag="header" class="p-1" role="tab">
                      <b-button
                        class="card-title mb-0"
                        block
                        href="#"
                                                    v-b-toggle.panel-CoachDetails
                        variant="transparent"
                                              >Coach Details</b-button>
                    </b-card-header>
                    <b-collapse
                                              id="panel-CoachDetails "
                      :visible="true"
                      accordion="my-accordion18"
                      role="tabpanel"
                    >
                      <b-card-body>
                        <b-card-text>
                          <b-row>
                            <!--Trainer Details View -->
                            <b-col md="6">
                              <label class="checkbox checkbox-outline-primary">
                                <input
                                  type="checkbox"
                                  checked
                                  v-model="permissions"
                                  value="CoachDetails_view"
                                >
                                <span>View</span>
                                <span class="checkmark"></span>
                              </label>
                            </b-col>
                            <!--Trainer Details ADD -->
                            <b-col md="6">
                              <label class="checkbox checkbox-outline-primary">
                                <input
                                  type="checkbox"
                                  checked
                                  v-model="permissions"
                                  value="CoachDetails_add"
                                >
                                <span>Add</span>
                                <span class="checkmark"></span>
                              </label>
                            </b-col>
                            <!--Trainer Details Edit -->
                            <b-col md="6">
                              <label class="checkbox checkbox-outline-primary">
                                <input
                                  type="checkbox"
                                  checked
                                  v-model="permissions"
                                  value="CoachDetails_edit"
                                >
                                <span>Edit</span>
                                <span class="checkmark"></span>
                              </label>
                            </b-col>
                            <!--Trainer Details Delete -->
                            <b-col md="6">
                              <label class="checkbox checkbox-outline-primary">
                                <input
                                  type="checkbox"
                                  checked
                                  v-model="permissions"
                                  value="CoachDetails_delete"
                                >
                                <span>Del</span>
                                <span class="checkmark"></span>
                              </label>
                            </b-col>
                          </b-row>
                        </b-card-text>
                      </b-card-body>
                    </b-collapse>
                  </b-card>
                </b-col>

                <!--Schedule-->
                <b-col md="4">
                  <b-card no-body class="ul-card__border-radius">
                    <b-card-header header-tag="header" class="p-1" role="tab">
                      <b-button
                        class="card-title mb-0"
                        block
                        href="#"
                        v-b-toggle.panel-schedule
                        variant="transparent"
                      >Schedule</b-button>
                    </b-card-header>
                    <b-collapse
                      id="panel-schedule "
                      :visible="true"
                      accordion="my-accordion19"
                      role="tabpanel"
                    >
                      <b-card-body>
                        <b-card-text>
                          <b-row>
                            <!--Schedule View -->
                            <b-col md="6">
                              <label class="checkbox checkbox-outline-primary">
                                <input
                                  type="checkbox"
                                  checked
                                  v-model="permissions"
                                  value="schedule_view"
                                >
                                <span>View</span>
                                <span class="checkmark"></span>
                              </label>
                            </b-col>
                            <!--Schedule ADD -->
                            <b-col md="6">
                              <label class="checkbox checkbox-outline-primary">
                                <input
                                  type="checkbox"
                                  checked
                                  v-model="permissions"
                                  value="schedule_add"
                                >
                                <span>Add</span>
                                <span class="checkmark"></span>
                              </label>
                            </b-col>
                            <!--Schedule Edit -->
                            <b-col md="6">
                              <label class="checkbox checkbox-outline-primary">
                                <input
                                  type="checkbox"
                                  checked
                                  v-model="permissions"
                                  value="schedule_edit"
                                >
                                <span>Edit</span>
                                <span class="checkmark"></span>
                              </label>
                            </b-col>
                            <!--Schedule Delete -->
                            <b-col md="6">
                              <label class="checkbox checkbox-outline-primary">
                                <input
                                  type="checkbox"
                                  checked
                                  v-model="permissions"
                                  value="schedule_delete"
                                >
                                <span>Del</span>
                                <span class="checkmark"></span>
                              </label>
                            </b-col>
                          </b-row>
                        </b-card-text>
                      </b-card-body>
                    </b-collapse>
                  </b-card>
                </b-col>

                <!--Assign Members-->
                <b-col md="4">
                  <b-card no-body class="ul-card__border-radius">
                    <b-card-header header-tag="header" class="p-1" role="tab">
                      <b-button
                        class="card-title mb-0"
                        block
                        href="#"
                        v-b-toggle.panel-assign
                        variant="transparent"
                      >Assign Members</b-button>
                    </b-card-header>
                    <b-collapse
                      id="panel-assign "
                      :visible="true"
                      accordion="my-accordion100"
                      role="tabpanel"
                    >
                      <b-card-body>
                        <b-card-text>
                          <b-row>
                            <!--Assign Members View -->
                            <b-col md="6">
                              <label class="checkbox checkbox-outline-primary">
                                <input
                                  type="checkbox"
                                  checked
                                  v-model="permissions"
                                  value="assign_view"
                                >
                                <span>View</span>
                                <span class="checkmark"></span>
                              </label>
                            </b-col>
                            <!--Assgin Members ADD -->
                            <b-col md="6">
                              <label class="checkbox checkbox-outline-primary">
                                <input
                                  type="checkbox"
                                  checked
                                  v-model="permissions"
                                  value="assign_add"
                                >
                                <span>Add</span>
                                <span class="checkmark"></span>
                              </label>
                            </b-col>
                            <!--Assign Members Edit -->
                            <b-col md="6">
                              <label class="checkbox checkbox-outline-primary">
                                <input
                                  type="checkbox"
                                  checked
                                  v-model="permissions"
                                  value="assign_edit"
                                >
                                <span>Edit</span>
                                <span class="checkmark"></span>
                              </label>
                            </b-col>
                            <!--Assign Members Delete -->
                            <b-col md="6">
                              <label class="checkbox checkbox-outline-primary">
                                <input
                                  type="checkbox"
                                  checked
                                  v-model="permissions"
                                  value="assign_delete"
                                >
                                <span>Del</span>
                                <span class="checkmark"></span>
                              </label>
                            </b-col>
                          </b-row>
                        </b-card-text>
                      </b-card-body>
                    </b-collapse>
                  </b-card>
                </b-col>

                <!--Trainer Performance-->
                <b-col md="4">
                  <b-card no-body class="ul-card__border-radius">
                    <b-card-header header-tag="header" class="p-1" role="tab">
                      <b-button
                        class="card-title mb-0"
                        block
                        href="#"
                        v-b-toggle.panel-performance
                        variant="transparent"
                      >Trainer Performance & Reports</b-button>
                    </b-card-header>
                    <b-collapse
                      id="panel-performance "
                      :visible="true"
                      accordion="my-accordion20"
                      role="tabpanel"
                    >
                      <b-card-body>
                        <b-card-text>
                          <b-row>
                            <!--Trainer Performance View -->
                            <b-col md="6">
                              <label class="checkbox checkbox-outline-primary">
                                <input
                                  type="checkbox"
                                  checked
                                  v-model="permissions"
                                  value="performance_view"
                                >
                                <span>View</span>
                                <span class="checkmark"></span>
                              </label>
                            </b-col>
                            <!--Trainer Performance ADD -->
                            <b-col md="6">
                              <label class="checkbox checkbox-outline-primary">
                                <input
                                  type="checkbox"
                                  checked
                                  v-model="permissions"
                                  value="performance_add"
                                >
                                <span>Add</span>
                                <span class="checkmark"></span>
                              </label>
                            </b-col>
                            <!--Trainer Performance Edit -->
                            <b-col md="6">
                              <label class="checkbox checkbox-outline-primary">
                                <input
                                  type="checkbox"
                                  checked
                                  v-model="permissions"
                                  value="performance_edit"
                                >
                                <span>Edit</span>
                                <span class="checkmark"></span>
                              </label>
                            </b-col>
                            <!--Trainer Performance Delete -->
                            <b-col md="6">
                              <label class="checkbox checkbox-outline-primary">
                                <input
                                  type="checkbox"
                                  checked
                                  v-model="permissions"
                                  value="performance_delete"
                                >
                                <span>Del</span>
                                <span class="checkmark"></span>
                              </label>
                            </b-col>
                          </b-row>
                        </b-card-text>
                      </b-card-body>
                    </b-collapse>
                  </b-card>
                </b-col>

                <!--Trainer Availability-->
                <b-col md="4">
                  <b-card no-body class="ul-card__border-radius">
                    <b-card-header header-tag="header" class="p-1" role="tab">
                      <b-button
                        class="card-title mb-0"
                        block
                        href="#"
                        v-b-toggle.panel-availability
                        variant="transparent"
                      >Trainer Availability & Schedule</b-button>
                    </b-card-header>
                    <b-collapse
                      id="panel-availability "
                      :visible="true"
                      accordion="my-accordion21"
                      role="tabpanel"
                    >
                      <b-card-body>
                        <b-card-text>
                          <b-row>
                            <!--Trainer Availability View -->
                            <b-col md="6">
                              <label class="checkbox checkbox-outline-primary">
                                <input
                                  type="checkbox"
                                  checked
                                  v-model="permissions"
                                  value="availability_view"
                                >
                                <span>View</span>
                                <span class="checkmark"></span>
                              </label>
                            </b-col>
                            <!--Trainer Availability ADD -->
                            <b-col md="6">
                              <label class="checkbox checkbox-outline-primary">
                                <input
                                  type="checkbox"
                                  checked
                                  v-model="permissions"
                                  value="availability_add"
                                >
                                <span>Add</span>
                                <span class="checkmark"></span>
                              </label>
                            </b-col>
                            <!--Trainer Availability Edit -->
                            <b-col md="6">
                              <label class="checkbox checkbox-outline-primary">
                                <input
                                  type="checkbox"
                                  checked
                                  v-model="permissions"
                                  value="availability_edit"
                                >
                                <span>Edit</span>
                                <span class="checkmark"></span>
                              </label>
                            </b-col>
                            <!--Trainer Availability Delete -->
                            <b-col md="6">
                              <label class="checkbox checkbox-outline-primary">
                                <input
                                  type="checkbox"
                                  checked
                                  v-model="permissions"
                                  value="availability_delete"
                                >
                                <span>Del</span>
                                <span class="checkmark"></span>
                              </label>
                            </b-col>
                          </b-row>
                        </b-card-text>
                      </b-card-body>
                    </b-collapse>
                  </b-card>
                </b-col>

                <!--  Appointment -->
                <b-col md="4">
                  <b-card no-body class="ul-card__border-radius">
                    <b-card-header header-tag="header" class="p-1" role="tab">
                      <b-button
                        class="card-title mb-0"
                        block
                        href="#"
                        v-b-toggle.panel-Appointment
                        variant="transparent"
                      >Appointment</b-button>
                    </b-card-header>
                    <b-collapse
                      id="panel-Appointment"
                      :visible="true"
                      accordion="my-accordion3"
                      role="tabpanel"
                    >
                      <b-card-body>
                        <b-card-text>
                          <b-row>
                            <!--Appointment View -->
                            <b-col md="6">
                              <label class="checkbox checkbox-outline-primary">
                                <input
                                  type="checkbox"
                                  checked
                                  v-model="permissions"
                                  value="Appointment_view"
                                >
                                <span>View</span>
                                <span class="checkmark"></span>
                              </label>
                            </b-col>
                            <!--Appointment ADD -->
                            <b-col md="6">
                              <label class="checkbox checkbox-outline-primary">
                                <input
                                  type="checkbox"
                                  checked
                                  v-model="permissions"
                                  value="Appointment_add"
                                >
                                <span>Add</span>
                                <span class="checkmark"></span>
                              </label>
                            </b-col>
                            <!--Appointment Edit -->
                            <b-col md="6">
                              <label class="checkbox checkbox-outline-primary">
                                <input
                                  type="checkbox"
                                  checked
                                  v-model="permissions"
                                  value="Appointment_edit"
                                >
                                <span>Edit</span>
                                <span class="checkmark"></span>
                              </label>
                            </b-col>
                            <!--Appointment Delete -->
                            <b-col md="6">
                              <label class="checkbox checkbox-outline-primary">
                                <input
                                  type="checkbox"
                                  checked
                                  v-model="permissions"
                                  value="Appointment_delete"
                                >
                                <span>Del</span>
                                <span class="checkmark"></span>
                              </label>
                            </b-col>
                          </b-row>
                        </b-card-text>
                      </b-card-body>
                    </b-collapse>
                  </b-card>
                </b-col>

                <!--  Challenges -->
                <b-col md="4">
                  <b-card no-body class="ul-card__border-radius">
                    <b-card-header header-tag="header" class="p-1" role="tab">
                      <b-button
                        class="card-title mb-0"
                        block
                        href="#"
                        v-b-toggle.panel-Challenges
                        variant="transparent"
                      >Challenges</b-button>
                    </b-card-header>
                    <b-collapse
                      id="panel-Challenges"
                      :visible="true"
                      accordion="my-accordion4"
                      role="tabpanel"
                    >
                      <b-card-body>
                        <b-card-text>
                          <b-row>
                            <!--Challenges View -->
                            <b-col md="6">
                              <label class="checkbox checkbox-outline-primary">
                                <input
                                  type="checkbox"
                                  checked
                                  v-model="permissions"
                                  value="Challenges_view"
                                >
                                <span>View</span>
                                <span class="checkmark"></span>
                              </label>
                            </b-col>
                            <!--Challenges ADD -->
                            <b-col md="6">
                              <label class="checkbox checkbox-outline-primary">
                                <input
                                  type="checkbox"
                                  checked
                                  v-model="permissions"
                                  value="Challenges_add"
                                >
                                <span>Add</span>
                                <span class="checkmark"></span>
                              </label>
                            </b-col>
                            <!--Challenges Edit -->
                            <b-col md="6">
                              <label class="checkbox checkbox-outline-primary">
                                <input
                                  type="checkbox"
                                  checked
                                  v-model="permissions"
                                  value="Challenges_edit"
                                >
                                <span>Edit</span>
                                <span class="checkmark"></span>
                              </label>
                            </b-col>
                            <!--Challenges Delete -->
                            <b-col md="6">
                              <label class="checkbox checkbox-outline-primary">
                                <input
                                  type="checkbox"
                                  checked
                                  v-model="permissions"
                                  value="Challenges_delete"
                                >
                                <span>Del</span>
                                <span class="checkmark"></span>
                              </label>
                            </b-col>
                          </b-row>
                        </b-card-text>
                      </b-card-body>
                    </b-collapse>
                  </b-card>
                </b-col>

                <!-- Create Challenges -->
                <b-col md="4">
                  <b-card no-body class="ul-card__border-radius">
                    <b-card-header header-tag="header" class="p-1" role="tab">
                      <b-button
                        class="card-title mb-0"
                        block
                        href="#"
                        v-b-toggle.panel-createChallenges
                        variant="transparent"
                      >Create Challenges</b-button>
                    </b-card-header>
                    <b-collapse
                      id="panel-createChallenges"
                      :visible="true"
                      accordion="my-accordion22"
                      role="tabpanel"
                    >
                      <b-card-body>
                        <b-card-text>
                          <b-row>
                            <!-- Create Challenges View -->
                            <b-col md="6">
                              <label class="checkbox checkbox-outline-primary">
                                <input
                                  type="checkbox"
                                  checked
                                  v-model="permissions"
                                  value="createChallenges_view"
                                >
                                <span>View</span>
                                <span class="checkmark"></span>
                              </label>
                            </b-col>
                            <!--Create Challenges ADD -->
                            <b-col md="6">
                              <label class="checkbox checkbox-outline-primary">
                                <input
                                  type="checkbox"
                                  checked
                                  v-model="permissions"
                                  value="createChallenges_add"
                                >
                                <span>Add</span>
                                <span class="checkmark"></span>
                              </label>
                            </b-col>
                            <!--Create Challenges Edit -->
                            <b-col md="6">
                              <label class="checkbox checkbox-outline-primary">
                                <input
                                  type="checkbox"
                                  checked
                                  v-model="permissions"
                                  value="createChallenges_edit"
                                >
                                <span>Edit</span>
                                <span class="checkmark"></span>
                              </label>
                            </b-col>
                            <!--Create Challenges Delete -->
                            <b-col md="6">
                              <label class="checkbox checkbox-outline-primary">
                                <input
                                  type="checkbox"
                                  checked
                                  v-model="permissions"
                                  value="createChallenges_delete"
                                >
                                <span>Del</span>
                                <span class="checkmark"></span>
                              </label>
                            </b-col>
                          </b-row>
                        </b-card-text>
                      </b-card-body>
                    </b-collapse>
                  </b-card>
                </b-col>

                <!-- Manage Challenges -->
                <b-col md="4">
                  <b-card no-body class="ul-card__border-radius">
                    <b-card-header header-tag="header" class="p-1" role="tab">
                      <b-button
                        class="card-title mb-0"
                        block
                        href="#"
                        v-b-toggle.panel-manageChallenges
                        variant="transparent"
                      >Manage Challenges</b-button>
                    </b-card-header>
                    <b-collapse
                      id="panel-manageChallenges"
                      :visible="true"
                      accordion="my-accordion23"
                      role="tabpanel"
                    >
                      <b-card-body>
                        <b-card-text>
                          <b-row>
                            <!-- Manage Challenges View -->
                            <b-col md="6">
                              <label class="checkbox checkbox-outline-primary">
                                <input
                                  type="checkbox"
                                  checked
                                  v-model="permissions"
                                  value="manageChallenges_view"
                                >
                                <span>View</span>
                                <span class="checkmark"></span>
                              </label>
                            </b-col>
                            <!--Manage Challenges ADD -->
                            <b-col md="6">
                              <label class="checkbox checkbox-outline-primary">
                                <input
                                  type="checkbox"
                                  checked
                                  v-model="permissions"
                                  value="manageChallenges_add"
                                >
                                <span>Add</span>
                                <span class="checkmark"></span>
                              </label>
                            </b-col>
                            <!--Manage Challenges Edit -->
                            <b-col md="6">
                              <label class="checkbox checkbox-outline-primary">
                                <input
                                  type="checkbox"
                                  checked
                                  v-model="permissions"
                                  value="manageChallenges_edit"
                                >
                                <span>Edit</span>
                                <span class="checkmark"></span>
                              </label>
                            </b-col>
                            <!--Manage Challenges Delete -->
                            <b-col md="6">
                              <label class="checkbox checkbox-outline-primary">
                                <input
                                  type="checkbox"
                                  checked
                                  v-model="permissions"
                                  value="manageChallenges_delete"
                                >
                                <span>Del</span>
                                <span class="checkmark"></span>
                              </label>
                            </b-col>
                          </b-row>
                        </b-card-text>
                      </b-card-body>
                    </b-collapse>
                  </b-card>
                </b-col>

                <!-- Challenges Participants -->
                <b-col md="4">
                  <b-card no-body class="ul-card__border-radius">
                    <b-card-header header-tag="header" class="p-1" role="tab">
                      <b-button
                        class="card-title mb-0"
                        block
                        href="#"
                        v-b-toggle.panel-challengeParticipants
                        variant="transparent"
                      >Challenges Participants List</b-button>
                    </b-card-header>
                    <b-collapse
                      id="panel-challengesParticipants"
                      :visible="true"
                      accordion="my-accordion24"
                      role="tabpanel"
                    >
                      <b-card-body>
                        <b-card-text>
                          <b-row>
                            <!-- Challenges Participants View -->
                            <b-col md="6">
                              <label class="checkbox checkbox-outline-primary">
                                <input
                                  type="checkbox"
                                  checked
                                  v-model="permissions"
                                  value="challengesParticipants_view"
                                >
                                <span>View</span>
                                <span class="checkmark"></span>
                              </label>
                            </b-col>
                            <!--Challenges Participants ADD -->
                            <b-col md="6">
                              <label class="checkbox checkbox-outline-primary">
                                <input
                                  type="checkbox"
                                  checked
                                  v-model="permissions"
                                  value="challengesParticipants_add"
                                >
                                <span>Add</span>
                                <span class="checkmark"></span>
                              </label>
                            </b-col>
                            <!--Challenges Participants Edit -->
                            <b-col md="6">
                              <label class="checkbox checkbox-outline-primary">
                                <input
                                  type="checkbox"
                                  checked
                                  v-model="permissions"
                                  value="challengesParticipants_edit"
                                >
                                <span>Edit</span>
                                <span class="checkmark"></span>
                              </label>
                            </b-col>
                            <!--Challenges Participants Delete -->
                            <b-col md="6">
                              <label class="checkbox checkbox-outline-primary">
                                <input
                                  type="checkbox"
                                  checked
                                  v-model="permissions"
                                  value="challengesParticipants_delete"
                                >
                                <span>Del</span>
                                <span class="checkmark"></span>
                              </label>
                            </b-col>
                          </b-row>
                        </b-card-text>
                      </b-card-body>
                    </b-collapse>
                  </b-card>
                </b-col>

                <!-- Challenges Reports -->
                <b-col md="4">
                  <b-card no-body class="ul-card__border-radius">
                    <b-card-header header-tag="header" class="p-1" role="tab">
                      <b-button
                        class="card-title mb-0"
                        block
                        href="#"
                        v-b-toggle.panel-challengeReports
                        variant="transparent"
                      >Challenges Analytics & Reports</b-button>
                    </b-card-header>
                    <b-collapse
                      id="panel-challengesReports"
                      :visible="true"
                      accordion="my-accordion25"
                      role="tabpanel"
                    >
                      <b-card-body>
                        <b-card-text>
                          <b-row>
                            <!-- Challenges Reports View -->
                            <b-col md="6">
                              <label class="checkbox checkbox-outline-primary">
                                <input
                                  type="checkbox"
                                  checked
                                  v-model="permissions"
                                  value="challengesReports_view"
                                >
                                <span>View</span>
                                <span class="checkmark"></span>
                              </label>
                            </b-col>
                            <!--Challenges Reports ADD -->
                            <b-col md="6">
                              <label class="checkbox checkbox-outline-primary">
                                <input
                                  type="checkbox"
                                  checked
                                  v-model="permissions"
                                  value="challengesReports_add"
                                >
                                <span>Add</span>
                                <span class="checkmark"></span>
                              </label>
                            </b-col>
                            <!--Challenges Reports Edit -->
                            <b-col md="6">
                              <label class="checkbox checkbox-outline-primary">
                                <input
                                  type="checkbox"
                                  checked
                                  v-model="permissions"
                                  value="challengesReports_edit"
                                >
                                <span>Edit</span>
                                <span class="checkmark"></span>
                              </label>
                            </b-col>
                            <!--Challenges Reports Delete -->
                            <b-col md="6">
                              <label class="checkbox checkbox-outline-primary">
                                <input
                                  type="checkbox"
                                  checked
                                  v-model="permissions"
                                  value="challengesReports_delete"
                                >
                                <span>Del</span>
                                <span class="checkmark"></span>
                              </label>
                            </b-col>
                          </b-row>
                        </b-card-text>
                      </b-card-body>
                    </b-collapse>
                  </b-card>
                </b-col>

                <!--  Workout -->
                <b-col md="4">
                  <b-card no-body class="ul-card__border-radius">
                    <b-card-header header-tag="header" class="p-1" role="tab">
                      <b-button
                        class="card-title mb-0"
                        block
                        href="#"
                        v-b-toggle.panel-Workout
                        variant="transparent"
                      >Workouts</b-button>
                    </b-card-header>
                    <b-collapse
                      id="panel-Workout"
                      :visible="true"
                      accordion="my-accordion5"
                      role="tabpanel"
                    >
                      <b-card-body>
                        <b-card-text>
                          <b-row>
                            <!--Workout View -->
                            <b-col md="6">
                              <label class="checkbox checkbox-outline-primary">
                                <input
                                  type="checkbox"
                                  checked
                                  v-model="permissions"
                                  value="Workout_view"
                                >
                                <span>View</span>
                                <span class="checkmark"></span>
                              </label>
                            </b-col>
                            <!--Workout ADD -->
                            <b-col md="6">
                              <label class="checkbox checkbox-outline-primary">
                                <input
                                  type="checkbox"
                                  checked
                                  v-model="permissions"
                                  value="Workout_add"
                                >
                                <span>Add</span>
                                <span class="checkmark"></span>
                              </label>
                            </b-col>
                            <!--Workout Edit -->
                            <b-col md="6">
                              <label class="checkbox checkbox-outline-primary">
                                <input
                                  type="checkbox"
                                  checked
                                  v-model="permissions"
                                  value="Workout_edit"
                                >
                                <span>Edit</span>
                                <span class="checkmark"></span>
                              </label>
                            </b-col>
                            <!--Workout Delete -->
                            <b-col md="6">
                              <label class="checkbox checkbox-outline-primary">
                                <input
                                  type="checkbox"
                                  checked
                                  v-model="permissions"
                                  value="Workout_delete"
                                >
                                <span>Del</span>
                                <span class="checkmark"></span>
                              </label>
                            </b-col>
                          </b-row>
                        </b-card-text>
                      </b-card-body>
                    </b-collapse>
                  </b-card>
                </b-col>

                <!--  Workout Plan  -->
                <b-col md="4">
                  <b-card no-body class="ul-card__border-radius">
                    <b-card-header header-tag="header" class="p-1" role="tab">
                      <b-button
                        class="card-title mb-0"
                        block
                        href="#"
                        v-b-toggle.panel-workoutPlan
                        variant="transparent"
                      >Workout Plan & Library</b-button>
                    </b-card-header>
                    <b-collapse
                      id="panel-workoutPlan"
                      :visible="true"
                      accordion="my-accordion26"
                      role="tabpanel"
                    >
                      <b-card-body>
                        <b-card-text>
                          <b-row>
                            <!--Workout Plan View -->
                            <b-col md="6">
                              <label class="checkbox checkbox-outline-primary">
                                <input
                                  type="checkbox"
                                  checked
                                  v-model="permissions"
                                  value="workoutPlan_view"
                                >
                                <span>View</span>
                                <span class="checkmark"></span>
                              </label>
                            </b-col>
                            <!--Workout Plan ADD -->
                            <b-col md="6">
                              <label class="checkbox checkbox-outline-primary">
                                <input
                                  type="checkbox"
                                  checked
                                  v-model="permissions"
                                  value="workoutPlan_add"
                                >
                                <span>Add</span>
                                <span class="checkmark"></span>
                              </label>
                            </b-col>
                            <!--Workout Plan Edit -->
                            <b-col md="6">
                              <label class="checkbox checkbox-outline-primary">
                                <input
                                  type="checkbox"
                                  checked
                                  v-model="permissions"
                                  value="workoutPlan_edit"
                                >
                                <span>Edit</span>
                                <span class="checkmark"></span>
                              </label>
                            </b-col>
                            <!--Workout Plan Delete -->
                            <b-col md="6">
                              <label class="checkbox checkbox-outline-primary">
                                <input
                                  type="checkbox"
                                  checked
                                  v-model="permissions"
                                  value="workoutPlan_delete"
                                >
                                <span>Del</span>
                                <span class="checkmark"></span>
                              </label>
                            </b-col>
                          </b-row>
                        </b-card-text>
                      </b-card-body>
                    </b-collapse>
                  </b-card>
                </b-col>

                <!-- Assing Workout -->
                <b-col md="4">
                  <b-card no-body class="ul-card__border-radius">
                    <b-card-header header-tag="header" class="p-1" role="tab">
                      <b-button
                        class="card-title mb-0"
                        block
                        href="#"
                        v-b-toggle.panel-assignWorkout
                        variant="transparent"
                      >Assign Workout</b-button>
                    </b-card-header>
                    <b-collapse
                      id="panel-assignWorkout"
                      :visible="true"
                      accordion="my-accordion27"
                      role="tabpanel"
                    >
                      <b-card-body>
                        <b-card-text>
                          <b-row>
                            <!--ASsign Workout View -->
                            <b-col md="6">
                              <label class="checkbox checkbox-outline-primary">
                                <input
                                  type="checkbox"
                                  checked
                                  v-model="permissions"
                                  value="assignWorkout_view"
                                >
                                <span>View</span>
                                <span class="checkmark"></span>
                              </label>
                            </b-col>
                            <!--Assign Workout ADD -->
                            <b-col md="6">
                              <label class="checkbox checkbox-outline-primary">
                                <input
                                  type="checkbox"
                                  checked
                                  v-model="permissions"
                                  value="assignWorkout_add"
                                >
                                <span>Add</span>
                                <span class="checkmark"></span>
                              </label>
                            </b-col>
                            <!--Assign Workout Edit -->
                            <b-col md="6">
                              <label class="checkbox checkbox-outline-primary">
                                <input
                                  type="checkbox"
                                  checked
                                  v-model="permissions"
                                  value="assignWorkout_edit"
                                >
                                <span>Edit</span>
                                <span class="checkmark"></span>
                              </label>
                            </b-col>
                            <!--Assign Workout Delete -->
                            <b-col md="6">
                              <label class="checkbox checkbox-outline-primary">
                                <input
                                  type="checkbox"
                                  checked
                                  v-model="permissions"
                                  value="assignWorkout_delete"
                                >
                                <span>Del</span>
                                <span class="checkmark"></span>
                              </label>
                            </b-col>
                          </b-row>
                        </b-card-text>
                      </b-card-body>
                    </b-collapse>
                  </b-card>
                </b-col>

                <!-- Track Workout -->
                <b-col md="4">
                  <b-card no-body class="ul-card__border-radius">
                    <b-card-header header-tag="header" class="p-1" role="tab">
                      <b-button
                        class="card-title mb-0"
                        block
                        href="#"
                        v-b-toggle.panel-trackWorkout
                        variant="transparent"
                      >Track Workout</b-button>
                    </b-card-header>
                    <b-collapse
                      id="panel-trackWorkout"
                      :visible="true"
                      accordion="my-accordion28"
                      role="tabpanel"
                    >
                      <b-card-body>
                        <b-card-text>
                          <b-row>
                            <!--Track Workout View -->
                            <b-col md="6">
                              <label class="checkbox checkbox-outline-primary">
                                <input
                                  type="checkbox"
                                  checked
                                  v-model="permissions"
                                  value="trackWorkout_view"
                                >
                                <span>View</span>
                                <span class="checkmark"></span>
                              </label>
                            </b-col>
                            <!--Track Workout ADD -->
                            <b-col md="6">
                              <label class="checkbox checkbox-outline-primary">
                                <input
                                  type="checkbox"
                                  checked
                                  v-model="permissions"
                                  value="trackWorkout_add"
                                >
                                <span>Add</span>
                                <span class="checkmark"></span>
                              </label>
                            </b-col>
                            <!--Track Workout Edit -->
                            <b-col md="6">
                              <label class="checkbox checkbox-outline-primary">
                                <input
                                  type="checkbox"
                                  checked
                                  v-model="permissions"
                                  value="trackWorkout_edit"
                                >
                                <span>Edit</span>
                                <span class="checkmark"></span>
                              </label>
                            </b-col>
                            <!--Track Workout Delete -->
                            <b-col md="6">
                              <label class="checkbox checkbox-outline-primary">
                                <input
                                  type="checkbox"
                                  checked
                                  v-model="permissions"
                                  value="trackWorkout_delete"
                                >
                                <span>Del</span>
                                <span class="checkmark"></span>
                              </label>
                            </b-col>
                          </b-row>
                        </b-card-text>
                      </b-card-body>
                    </b-collapse>
                  </b-card>
                </b-col>

                <!--  Nutrition -->
                <b-col md="4">
                  <b-card no-body class="ul-card__border-radius">
                    <b-card-header header-tag="header" class="p-1" role="tab">
                      <b-button
                        class="card-title mb-0"
                        block
                        href="#"
                        v-b-toggle.panel-Nutrition
                        variant="transparent"
                      >Nutritions</b-button>
                    </b-card-header>
                    <b-collapse
                      id="panel-Nutrition"
                      :visible="true"
                      accordion="my-accordion6"
                      role="tabpanel"
                    >
                      <b-card-body>
                        <b-card-text>
                          <b-row>
                            <!--Nutrition View -->
                            <b-col md="6">
                              <label class="checkbox checkbox-outline-primary">
                                <input
                                  type="checkbox"
                                  checked
                                  v-model="permissions"
                                  value="Nutrition_view"
                                >
                                <span>View</span>
                                <span class="checkmark"></span>
                              </label>
                            </b-col>
                            <!--Nutrition ADD -->
                            <b-col md="6">
                              <label class="checkbox checkbox-outline-primary">
                                <input
                                  type="checkbox"
                                  checked
                                  v-model="permissions"
                                  value="Nutrition_add"
                                >
                                <span>Add</span>
                                <span class="checkmark"></span>
                              </label>
                            </b-col>
                            <!--Nutrition Edit -->
                            <b-col md="6">
                              <label class="checkbox checkbox-outline-primary">
                                <input
                                  type="checkbox"
                                  checked
                                  v-model="permissions"
                                  value="Nutrition_edit"
                                >
                                <span>Edit</span>
                                <span class="checkmark"></span>
                              </label>
                            </b-col>
                            <!--Nutrition Delete -->
                            <b-col md="6">
                              <label class="checkbox checkbox-outline-primary">
                                <input
                                  type="checkbox"
                                  checked
                                  v-model="permissions"
                                  value="Nutrition_delete"
                                >
                                <span>Del</span>
                                <span class="checkmark"></span>
                              </label>
                            </b-col>
                          </b-row>
                        </b-card-text>
                      </b-card-body>
                    </b-collapse>
                  </b-card>
                </b-col>

                <!--  Member Meal -->
                <b-col md="4">
                  <b-card no-body class="ul-card__border-radius">
                    <b-card-header header-tag="header" class="p-1" role="tab">
                      <b-button
                        class="card-title mb-0"
                        block
                        href="#"
                        v-b-toggle.panel-memberMeal
                        variant="transparent"
                      >Member Meal Logs</b-button>
                    </b-card-header>
                    <b-collapse
                      id="panel-memberMeal"
                      :visible="true"
                      accordion="my-accordion29"
                      role="tabpanel"
                    >
                      <b-card-body>
                        <b-card-text>
                          <b-row>
                            <!--Member Meal View -->
                            <b-col md="6">
                              <label class="checkbox checkbox-outline-primary">
                                <input
                                  type="checkbox"
                                  checked
                                  v-model="permissions"
                                  value="memberMeal_view"
                                >
                                <span>View</span>
                                <span class="checkmark"></span>
                              </label>
                            </b-col>
                            <!--Member Meal ADD -->
                            <b-col md="6">
                              <label class="checkbox checkbox-outline-primary">
                                <input
                                  type="checkbox"
                                  checked
                                  v-model="permissions"
                                  value="memberMeal_add"
                                >
                                <span>Add</span>
                                <span class="checkmark"></span>
                              </label>
                            </b-col>
                            <!--Member Meal Edit -->
                            <b-col md="6">
                              <label class="checkbox checkbox-outline-primary">
                                <input
                                  type="checkbox"
                                  checked
                                  v-model="permissions"
                                  value="memberMeal_edit"
                                >
                                <span>Edit</span>
                                <span class="checkmark"></span>
                              </label>
                            </b-col>
                            <!--Member Meal Delete -->
                            <b-col md="6">
                              <label class="checkbox checkbox-outline-primary">
                                <input
                                  type="checkbox"
                                  checked
                                  v-model="permissions"
                                  value="memberMeal_delete"
                                >
                                <span>Del</span>
                                <span class="checkmark"></span>
                              </label>
                            </b-col>
                          </b-row>
                        </b-card-text>
                      </b-card-body>
                    </b-collapse>
                  </b-card>
                </b-col>

                <!--  Create Meal -->
                <b-col md="4">
                  <b-card no-body class="ul-card__border-radius">
                    <b-card-header header-tag="header" class="p-1" role="tab">
                      <b-button
                        class="card-title mb-0"
                        block
                        href="#"
                        v-b-toggle.panel-createMeal
                        variant="transparent"
                      >Create Meal</b-button>
                    </b-card-header>
                    <b-collapse
                      id="panel-createMeal"
                      :visible="true"
                      accordion="my-accordion30"
                      role="tabpanel"
                    >
                      <b-card-body>
                        <b-card-text>
                          <b-row>
                            <!--Create Meal View -->
                            <b-col md="6">
                              <label class="checkbox checkbox-outline-primary">
                                <input
                                  type="checkbox"
                                  checked
                                  v-model="permissions"
                                  value="createMeal_view"
                                >
                                <span>View</span>
                                <span class="checkmark"></span>
                              </label>
                            </b-col>
                            <!--Create Meal ADD -->
                            <b-col md="6">
                              <label class="checkbox checkbox-outline-primary">
                                <input
                                  type="checkbox"
                                  checked
                                  v-model="permissions"
                                  value="createMeal_add"
                                >
                                <span>Add</span>
                                <span class="checkmark"></span>
                              </label>
                            </b-col>
                            <!--Create Meal Edit -->
                            <b-col md="6">
                              <label class="checkbox checkbox-outline-primary">
                                <input
                                  type="checkbox"
                                  checked
                                  v-model="permissions"
                                  value="createMeal_edit"
                                >
                                <span>Edit</span>
                                <span class="checkmark"></span>
                              </label>
                            </b-col>
                            <!--Create Meal Delete -->
                            <b-col md="6">
                              <label class="checkbox checkbox-outline-primary">
                                <input
                                  type="checkbox"
                                  checked
                                  v-model="permissions"
                                  value="createMeal_delete"
                                >
                                <span>Del</span>
                                <span class="checkmark"></span>
                              </label>
                            </b-col>
                          </b-row>
                        </b-card-text>
                      </b-card-body>
                    </b-collapse>
                  </b-card>
                </b-col>

                <!--  Daily Intakes -->
                <b-col md="4">
                  <b-card no-body class="ul-card__border-radius">
                    <b-card-header header-tag="header" class="p-1" role="tab">
                      <b-button
                        class="card-title mb-0"
                        block
                        href="#"
                        v-b-toggle.panel-intake
                        variant="transparent"
                      >Daily Intakes (RDI)</b-button>
                    </b-card-header>
                    <b-collapse
                      id="panel-intake"
                      :visible="true"
                      accordion="my-accordion31"
                      role="tabpanel"
                    >
                      <b-card-body>
                        <b-card-text>
                          <b-row>
                            <!--Daily Intake View -->
                            <b-col md="6">
                              <label class="checkbox checkbox-outline-primary">
                                <input
                                  type="checkbox"
                                  checked
                                  v-model="permissions"
                                  value="intake_view"
                                >
                                <span>View</span>
                                <span class="checkmark"></span>
                              </label>
                            </b-col>
                            <!--Daily Intake ADD -->
                            <b-col md="6">
                              <label class="checkbox checkbox-outline-primary">
                                <input
                                  type="checkbox"
                                  checked
                                  v-model="permissions"
                                  value="intake_add"
                                >
                                <span>Add</span>
                                <span class="checkmark"></span>
                              </label>
                            </b-col>
                            <!--Daily Intake Edit -->
                            <b-col md="6">
                              <label class="checkbox checkbox-outline-primary">
                                <input
                                  type="checkbox"
                                  checked
                                  v-model="permissions"
                                  value="intake_edit"
                                >
                                <span>Edit</span>
                                <span class="checkmark"></span>
                              </label>
                            </b-col>
                            <!--Daily Intake Delete -->
                            <b-col md="6">
                              <label class="checkbox checkbox-outline-primary">
                                <input
                                  type="checkbox"
                                  checked
                                  v-model="permissions"
                                  value="intake_delete"
                                >
                                <span>Del</span>
                                <span class="checkmark"></span>
                              </label>
                            </b-col>
                          </b-row>
                        </b-card-text>
                      </b-card-body>
                    </b-collapse>
                  </b-card>
                </b-col>

                <!-- Communication -->
                <b-col md="4">
                  <b-card no-body class="ul-card__border-radius">
                    <b-card-header header-tag="header" class="p-1" role="tab">
                      <b-button
                        class="card-title mb-0"
                        block
                        href="#"
                        v-b-toggle.panel-Communication
                        variant="transparent"
                      >Communication</b-button>
                    </b-card-header>
                    <b-collapse
                      id="panel-Communication"
                      :visible="true"
                      accordion="my-accordion7"
                      role="tabpanel"
                    >
                      <b-card-body>
                        <b-card-text>
                          <b-row>
                            <!--Communication View -->
                            <b-col md="6">
                              <label class="checkbox checkbox-outline-primary">
                                <input
                                  type="checkbox"
                                  checked
                                  v-model="permissions"
                                  value="Communication_view"
                                >
                                <span>View</span>
                                <span class="checkmark"></span>
                              </label>
                            </b-col>
                            <!--Communication ADD -->
                            <b-col md="6">
                              <label class="checkbox checkbox-outline-primary">
                                <input
                                  type="checkbox"
                                  checked
                                  v-model="permissions"
                                  value="Communication_add"
                                >
                                <span>Add</span>
                                <span class="checkmark"></span>
                              </label>
                            </b-col>
                            <!--Communication Edit -->
                            <b-col md="6">
                              <label class="checkbox checkbox-outline-primary">
                                <input
                                  type="checkbox"
                                  checked
                                  v-model="permissions"
                                  value="Communication_edit"
                                >
                                <span>Edit</span>
                                <span class="checkmark"></span>
                              </label>
                            </b-col>
                            <!--Communication Delete -->
                            <b-col md="6">
                              <label class="checkbox checkbox-outline-primary">
                                <input
                                  type="checkbox"
                                  checked
                                  v-model="permissions"
                                  value="Communication_delete"
                                >
                                <span>Del</span>
                                <span class="checkmark"></span>
                              </label>
                            </b-col>

                          </b-row>
                        </b-card-text>
                      </b-card-body>
                    </b-collapse>
                  </b-card>
                </b-col>
                
                <!-- Email -->
                <b-col md="4">
                  <b-card no-body class="ul-card__border-radius">
                    <b-card-header header-tag="header" class="p-1" role="tab">
                      <b-button
                        class="card-title mb-0"
                        block
                        href="#"
                        v-b-toggle.panel-email
                        variant="transparent"
                      >Email/SMS/App Push</b-button>
                    </b-card-header>
                    <b-collapse
                      id="panel-email"
                      :visible="true"
                      accordion="my-accordion32"
                      role="tabpanel"
                    >
                      <b-card-body>
                        <b-card-text>
                          <b-row>
                            <!--Email View -->
                            <b-col md="6">
                              <label class="checkbox checkbox-outline-primary">
                                <input
                                  type="checkbox"
                                  checked
                                  v-model="permissions"
                                  value="email_view"
                                >
                                <span>View</span>
                                <span class="checkmark"></span>
                              </label>
                            </b-col>
                            <!--Email ADD -->
                            <b-col md="6">
                              <label class="checkbox checkbox-outline-primary">
                                <input
                                  type="checkbox"
                                  checked
                                  v-model="permissions"
                                  value="email_add"
                                >
                                <span>Add</span>
                                <span class="checkmark"></span>
                              </label>
                            </b-col>
                            <!--Email Edit -->
                            <b-col md="6">
                              <label class="checkbox checkbox-outline-primary">
                                <input
                                  type="checkbox"
                                  checked
                                  v-model="permissions"
                                  value="email_edit"
                                >
                                <span>Edit</span>
                                <span class="checkmark"></span>
                              </label>
                            </b-col>
                            <!--Email Delete -->
                            <b-col md="6">
                              <label class="checkbox checkbox-outline-primary">
                                <input
                                  type="checkbox"
                                  checked
                                  v-model="permissions"
                                  value="email_delete"
                                >
                                <span>Del</span>
                                <span class="checkmark"></span>
                              </label>
                            </b-col>

                          </b-row>
                        </b-card-text>
                      </b-card-body>
                    </b-collapse>
                  </b-card>
                </b-col>

                <!-- Automated Msg -->
                <b-col md="4">
                  <b-card no-body class="ul-card__border-radius">
                    <b-card-header header-tag="header" class="p-1" role="tab">
                      <b-button
                        class="card-title mb-0"
                        block
                        href="#"
                        v-b-toggle.panel-automated
                        variant="transparent"
                      >Automated Messages</b-button>
                    </b-card-header>
                    <b-collapse
                      id="panel-automated"
                      :visible="true"
                      accordion="my-accordion33"
                      role="tabpanel"
                    >
                      <b-card-body>
                        <b-card-text>
                          <b-row>
                            <!--Automated msg View -->
                            <b-col md="6">
                              <label class="checkbox checkbox-outline-primary">
                                <input
                                  type="checkbox"
                                  checked
                                  v-model="permissions"
                                  value="automated_view"
                                >
                                <span>View</span>
                                <span class="checkmark"></span>
                              </label>
                            </b-col>
                            <!--Automated Msg ADD -->
                            <b-col md="6">
                              <label class="checkbox checkbox-outline-primary">
                                <input
                                  type="checkbox"
                                  checked
                                  v-model="permissions"
                                  value="automated_add"
                                >
                                <span>Add</span>
                                <span class="checkmark"></span>
                              </label>
                            </b-col>
                            <!--Automated msg Edit -->
                            <b-col md="6">
                              <label class="checkbox checkbox-outline-primary">
                                <input
                                  type="checkbox"
                                  checked
                                  v-model="permissions"
                                  value="automated_edit"
                                >
                                <span>Edit</span>
                                <span class="checkmark"></span>
                              </label>
                            </b-col>
                            <!--Automated msg Delete -->
                            <b-col md="6">
                              <label class="checkbox checkbox-outline-primary">
                                <input
                                  type="checkbox"
                                  checked
                                  v-model="permissions"
                                  value="automated_delete"
                                >
                                <span>Del</span>
                                <span class="checkmark"></span>
                              </label>
                            </b-col>

                          </b-row>
                        </b-card-text>
                      </b-card-body>
                    </b-collapse>
                  </b-card>
                </b-col>

                <!-- Whatsapp Msg -->
                <b-col md="4">
                  <b-card no-body class="ul-card__border-radius">
                    <b-card-header header-tag="header" class="p-1" role="tab">
                      <b-button
                        class="card-title mb-0"
                        block
                        href="#"
                        v-b-toggle.panel-whatsapp
                        variant="transparent"
                      >Whatsapp/ In-app Chat Integration</b-button>
                    </b-card-header>
                    <b-collapse
                      id="panel-whatsapp"
                      :visible="true"
                      accordion="my-accordion34"
                      role="tabpanel"
                    >
                      <b-card-body>
                        <b-card-text>
                          <b-row>
                            <!--Whatsapp msg View -->
                            <b-col md="6">
                              <label class="checkbox checkbox-outline-primary">
                                <input
                                  type="checkbox"
                                  checked
                                  v-model="permissions"
                                  value="whatsapp_view"
                                >
                                <span>View</span>
                                <span class="checkmark"></span>
                              </label>
                            </b-col>
                            <!--Whatsapp Msg ADD -->
                            <b-col md="6">
                              <label class="checkbox checkbox-outline-primary">
                                <input
                                  type="checkbox"
                                  checked
                                  v-model="permissions"
                                  value="whatsapp_add"
                                >
                                <span>Add</span>
                                <span class="checkmark"></span>
                              </label>
                            </b-col>
                            <!--Whatsapp msg Edit -->
                            <b-col md="6">
                              <label class="checkbox checkbox-outline-primary">
                                <input
                                  type="checkbox"
                                  checked
                                  v-model="permissions"
                                  value="whatsapp_edit"
                                >
                                <span>Edit</span>
                                <span class="checkmark"></span>
                              </label>
                            </b-col>
                            <!--Whatsapp msg Delete -->
                            <b-col md="6">
                              <label class="checkbox checkbox-outline-primary">
                                <input
                                  type="checkbox"
                                  checked
                                  v-model="permissions"
                                  value="whatsapp_delete"
                                >
                                <span>Del</span>
                                <span class="checkmark"></span>
                              </label>
                            </b-col>

                          </b-row>
                        </b-card-text>
                      </b-card-body>
                    </b-collapse>
                  </b-card>
                </b-col>

                <!-- Notifications -->
                <b-col md="4">
                  <b-card no-body class="ul-card__border-radius">
                    <b-card-header header-tag="header" class="p-1" role="tab">
                      <b-button
                        class="card-title mb-0"
                        block
                        href="#"
                        v-b-toggle.panel-notifications
                        variant="transparent"
                      >Notifications Manager</b-button>
                    </b-card-header>
                    <b-collapse
                      id="panel-notifications"
                      :visible="true"
                      accordion="my-accordion35"
                      role="tabpanel"
                    >
                      <b-card-body>
                        <b-card-text>
                          <b-row>
                            <!--Notifications View -->
                            <b-col md="6">
                              <label class="checkbox checkbox-outline-primary">
                                <input
                                  type="checkbox"
                                  checked
                                  v-model="permissions"
                                  value="notifications_view"
                                >
                                <span>View</span>
                                <span class="checkmark"></span>
                              </label>
                            </b-col>
                            <!--Notifications ADD -->
                            <b-col md="6">
                              <label class="checkbox checkbox-outline-primary">
                                <input
                                  type="checkbox"
                                  checked
                                  v-model="permissions"
                                  value="notiifications_add"
                                >
                                <span>Add</span>
                                <span class="checkmark"></span>
                              </label>
                            </b-col>
                            <!--Notifications Edit -->
                            <b-col md="6">
                              <label class="checkbox checkbox-outline-primary">
                                <input
                                  type="checkbox"
                                  checked
                                  v-model="permissions"
                                  value="notifications_edit"
                                >
                                <span>Edit</span>
                                <span class="checkmark"></span>
                              </label>
                            </b-col>
                            <!--Notifications Delete -->
                            <b-col md="6">
                              <label class="checkbox checkbox-outline-primary">
                                <input
                                  type="checkbox"
                                  checked
                                  v-model="permissions"
                                  value="notifications_delete"
                                >
                                <span>Del</span>
                                <span class="checkmark"></span>
                              </label>
                            </b-col>

                          </b-row>
                        </b-card-text>
                      </b-card-body>
                    </b-collapse>
                  </b-card>
                </b-col>

                <!-- Payments -->
                <b-col md="4">
                  <b-card no-body class="ul-card__border-radius">
                    <b-card-header header-tag="header" class="p-1" role="tab">
                      <b-button
                        class="card-title mb-0"
                        block
                        href="#"
                        v-b-toggle.panel-Payments
                        variant="transparent"
                      >Payments</b-button>
                    </b-card-header>
                    <b-collapse
                      id="panel-Payments"
                      :visible="true"
                      accordion="my-accordion8"
                      role="tabpanel"
                    >
                      <b-card-body>
                        <b-card-text>
                          <b-row>
                            <!--Payments View -->
                            <b-col md="6">
                              <label class="checkbox checkbox-outline-primary">
                                <input
                                  type="checkbox"
                                  checked
                                  v-model="permissions"
                                  value="Payments_view"
                                >
                                <span>View</span>
                                <span class="checkmark"></span>
                              </label>
                            </b-col>
                            <!--Payments ADD -->
                            <b-col md="6">
                              <label class="checkbox checkbox-outline-primary">
                                <input
                                  type="checkbox"
                                  checked
                                  v-model="permissions"
                                  value="Payments_add"
                                >
                                <span>Add</span>
                                <span class="checkmark"></span>
                              </label>
                            </b-col>
                            <!--Payments Edit -->
                            <b-col md="6">
                              <label class="checkbox checkbox-outline-primary">
                                <input
                                  type="checkbox"
                                  checked
                                  v-model="permissions"
                                  value="Payments_edit"
                                >
                                <span>Edit</span>
                                <span class="checkmark"></span>
                              </label>
                            </b-col>
                            <!--Payments Delete -->
                            <b-col md="6">
                              <label class="checkbox checkbox-outline-primary">
                                <input
                                  type="checkbox"
                                  checked
                                  v-model="permissions"
                                  value="Payments_delete"
                                >
                                <span>Del</span>
                                <span class="checkmark"></span>
                              </label>
                            </b-col>

                        


                          </b-row>
                        </b-card-text>
                      </b-card-body>
                    </b-collapse>
                  </b-card>
                </b-col>

                <!-- Payments History-->
                <b-col md="4">
                  <b-card no-body class="ul-card__border-radius">
                    <b-card-header header-tag="header" class="p-1" role="tab">
                      <b-button
                        class="card-title mb-0"
                        block
                        href="#"
                        v-b-toggle.panel-history
                        variant="transparent"
                      >Payments History</b-button>
                    </b-card-header>
                    <b-collapse
                      id="panel-history"
                      :visible="true"
                      accordion="my-accordion36"
                      role="tabpanel"
                    >
                      <b-card-body>
                        <b-card-text>
                          <b-row>
                            <!--Payments History View -->
                            <b-col md="6">
                              <label class="checkbox checkbox-outline-primary">
                                <input
                                  type="checkbox"
                                  checked
                                  v-model="permissions"
                                  value="history_view"
                                >
                                <span>View</span>
                                <span class="checkmark"></span>
                              </label>
                            </b-col>
                            <!--Payments History ADD -->
                            <b-col md="6">
                              <label class="checkbox checkbox-outline-primary">
                                <input
                                  type="checkbox"
                                  checked
                                  v-model="permissions"
                                  value="history_add"
                                >
                                <span>Add</span>
                                <span class="checkmark"></span>
                              </label>
                            </b-col>
                            <!--Payments History Edit -->
                            <b-col md="6">
                              <label class="checkbox checkbox-outline-primary">
                                <input
                                  type="checkbox"
                                  checked
                                  v-model="permissions"
                                  value="history_edit"
                                >
                                <span>Edit</span>
                                <span class="checkmark"></span>
                              </label>
                            </b-col>
                            <!--Payments History Delete -->
                            <b-col md="6">
                              <label class="checkbox checkbox-outline-primary">
                                <input
                                  type="checkbox"
                                  checked
                                  v-model="permissions"
                                  value="history_delete"
                                >
                                <span>Del</span>
                                <span class="checkmark"></span>
                              </label>
                            </b-col>

                        


                          </b-row>
                        </b-card-text>
                      </b-card-body>
                    </b-collapse>
                  </b-card>
                </b-col>

                <!-- Invoices-->
                <b-col md="4">
                  <b-card no-body class="ul-card__border-radius">
                    <b-card-header header-tag="header" class="p-1" role="tab">
                      <b-button
                        class="card-title mb-0"
                        block
                        href="#"
                        v-b-toggle.panel-invoices
                        variant="transparent"
                      >Invoices & Receipts</b-button>
                    </b-card-header>
                    <b-collapse
                      id="panel-invoices"
                      :visible="true"
                      accordion="my-accordion37"
                      role="tabpanel"
                    >
                      <b-card-body>
                        <b-card-text>
                          <b-row>
                            <!--Invoices View -->
                            <b-col md="6">
                              <label class="checkbox checkbox-outline-primary">
                                <input
                                  type="checkbox"
                                  checked
                                  v-model="permissions"
                                  value="invoices_view"
                                >
                                <span>View</span>
                                <span class="checkmark"></span>
                              </label>
                            </b-col>
                            <!--Invoices ADD -->
                            <b-col md="6">
                              <label class="checkbox checkbox-outline-primary">
                                <input
                                  type="checkbox"
                                  checked
                                  v-model="permissions"
                                  value="invoices_add"
                                >
                                <span>Add</span>
                                <span class="checkmark"></span>
                              </label>
                            </b-col>
                            <!--Invoices Edit -->
                            <b-col md="6">
                              <label class="checkbox checkbox-outline-primary">
                                <input
                                  type="checkbox"
                                  checked
                                  v-model="permissions"
                                  value="invoices_edit"
                                >
                                <span>Edit</span>
                                <span class="checkmark"></span>
                              </label>
                            </b-col>
                            <!--Invoices Delete -->
                            <b-col md="6">
                              <label class="checkbox checkbox-outline-primary">
                                <input
                                  type="checkbox"
                                  checked
                                  v-model="permissions"
                                  value="invoices_delete"
                                >
                                <span>Del</span>
                                <span class="checkmark"></span>
                              </label>
                            </b-col>

                        


                          </b-row>
                        </b-card-text>
                      </b-card-body>
                    </b-collapse>
                  </b-card>
                </b-col>

                <!-- Member Plan-->
                <b-col md="4">
                  <b-card no-body class="ul-card__border-radius">
                    <b-card-header header-tag="header" class="p-1" role="tab">
                      <b-button
                        class="card-title mb-0"
                        block
                        href="#"
                        v-b-toggle.panel-memberPlan
                        variant="transparent"
                      >Member Plan & Configurations</b-button>
                    </b-card-header>
                    <b-collapse
                      id="panel-memberPlan"
                      :visible="true"
                      accordion="my-accordion38"
                      role="tabpanel"
                    >
                      <b-card-body>
                        <b-card-text>
                          <b-row>
                            <!--Member Plan View -->
                            <b-col md="6">
                              <label class="checkbox checkbox-outline-primary">
                                <input
                                  type="checkbox"
                                  checked
                                  v-model="permissions"
                                  value="memberPlan_view"
                                >
                                <span>View</span>
                                <span class="checkmark"></span>
                              </label>
                            </b-col>
                            <!--Member Plan ADD -->
                            <b-col md="6">
                              <label class="checkbox checkbox-outline-primary">
                                <input
                                  type="checkbox"
                                  checked
                                  v-model="permissions"
                                  value="memberPlan_add"
                                >
                                <span>Add</span>
                                <span class="checkmark"></span>
                              </label>
                            </b-col>
                            <!--Member Plan Edit -->
                            <b-col md="6">
                              <label class="checkbox checkbox-outline-primary">
                                <input
                                  type="checkbox"
                                  checked
                                  v-model="permissions"
                                  value="memberPlan_edit"
                                >
                                <span>Edit</span>
                                <span class="checkmark"></span>
                              </label>
                            </b-col>
                            <!--Member Plan Delete -->
                            <b-col md="6">
                              <label class="checkbox checkbox-outline-primary">
                                <input
                                  type="checkbox"
                                  checked
                                  v-model="permissions"
                                  value="memberPlan_delete"
                                >
                                <span>Del</span>
                                <span class="checkmark"></span>
                              </label>
                            </b-col>

                        


                          </b-row>
                        </b-card-text>
                      </b-card-body>
                    </b-collapse>
                  </b-card>
                </b-col>

               
                <!-- Analytics -->
                <b-col md="4">
                  <b-card no-body class="ul-card__border-radius">
                    <b-card-header header-tag="header" class="p-1" role="tab">
                      <b-button
                        class="card-title mb-0"
                        block
                        href="#"
                        v-b-toggle.panel-Analytics
                        variant="transparent"
                      >Analytics</b-button>
                    </b-card-header>
                    <b-collapse
                      id="panel-Analytics"
                      :visible="true"
                      accordion="my-accordion9"
                      role="tabpanel"
                    >
                      <b-card-body>
                        <b-card-text>
                          <b-row>
                            <!--Analytics View -->
                            <b-col md="6">
                              <label class="checkbox checkbox-outline-primary">
                                <input
                                  type="checkbox"
                                  checked
                                  v-model="permissions"
                                  value="Analytics_view"
                                >
                                <span>View</span>
                                <span class="checkmark"></span>
                              </label>
                            </b-col>
                            <!--Analytics ADD -->
                            <b-col md="6">
                              <label class="checkbox checkbox-outline-primary">
                                <input
                                  type="checkbox"
                                  checked
                                  v-model="permissions"
                                  value="Analytics_add"
                                >
                                <span>Add</span>
                                <span class="checkmark"></span>
                              </label>
                            </b-col>
                            <!--Analytics Edit -->
                            <b-col md="6">
                              <label class="checkbox checkbox-outline-primary">
                                <input
                                  type="checkbox"
                                  checked
                                  v-model="permissions"
                                  value="Analytics_edit"
                                >
                                <span>Edit</span>
                                <span class="checkmark"></span>
                              </label>
                            </b-col>
                            <!--Analytics Delete -->
                            <b-col md="6">
                              <label class="checkbox checkbox-outline-primary">
                                <input
                                  type="checkbox"
                                  checked
                                  v-model="permissions"
                                  value="Analytics_delete"
                                >
                                <span>Del</span>
                                <span class="checkmark"></span>
                              </label>
                            </b-col>

                           

                          </b-row>
                        </b-card-text>
                      </b-card-body>
                    </b-collapse>
                  </b-card>
                </b-col>
               
                <!-- Member Progress & Reports -->
                <b-col md="4">
                  <b-card no-body class="ul-card__border-radius">
                    <b-card-header header-tag="header" class="p-1" role="tab">
                      <b-button
                        class="card-title mb-0"
                        block
                        href="#"
                        v-b-toggle.panel-memberReports
                        variant="transparent"
                      >Member Progress & Reports</b-button>
                    </b-card-header>
                    <b-collapse
                      id="panel-memberReports"
                      :visible="true"
                      accordion="my-accordion39"
                      role="tabpanel"
                    >
                      <b-card-body>
                        <b-card-text>
                          <b-row>
                            <!--Member Reports View -->
                            <b-col md="6">
                              <label class="checkbox checkbox-outline-primary">
                                <input
                                  type="checkbox"
                                  checked
                                  v-model="permissions"
                                  value="memberReports_view"
                                >
                                <span>View</span>
                                <span class="checkmark"></span>
                              </label>
                            </b-col>
                            <!--Member Reports ADD -->
                            <b-col md="6">
                              <label class="checkbox checkbox-outline-primary">
                                <input
                                  type="checkbox"
                                  checked
                                  v-model="permissions"
                                  value="memberReports_add"
                                >
                                <span>Add</span>
                                <span class="checkmark"></span>
                              </label>
                            </b-col>
                            <!--Member Reports Edit -->
                            <b-col md="6">
                              <label class="checkbox checkbox-outline-primary">
                                <input
                                  type="checkbox"
                                  checked
                                  v-model="permissions"
                                  value="memberReports_edit"
                                >
                                <span>Edit</span>
                                <span class="checkmark"></span>
                              </label>
                            </b-col>
                            <!--Member Reports Delete -->
                            <b-col md="6">
                              <label class="checkbox checkbox-outline-primary">
                                <input
                                  type="checkbox"
                                  checked
                                  v-model="permissions"
                                  value="memberReports_delete"
                                >
                                <span>Del</span>
                                <span class="checkmark"></span>
                              </label>
                            </b-col>

                           

                          </b-row>
                        </b-card-text>
                      </b-card-body>
                    </b-collapse>
                  </b-card>
                </b-col>
               
                <!-- Attendance -->
                <b-col md="4">
                  <b-card no-body class="ul-card__border-radius">
                    <b-card-header header-tag="header" class="p-1" role="tab">
                      <b-button
                        class="card-title mb-0"
                        block
                        href="#"
                        v-b-toggle.panel-attendance
                        variant="transparent"
                      >Attendance & Workout Logs</b-button>
                    </b-card-header>
                    <b-collapse
                      id="panel-attendance"
                      :visible="true"
                      accordion="my-accordion40"
                      role="tabpanel"
                    >
                      <b-card-body>
                        <b-card-text>
                          <b-row>
                            <!--Attendance View -->
                            <b-col md="6">
                              <label class="checkbox checkbox-outline-primary">
                                <input
                                  type="checkbox"
                                  checked
                                  v-model="permissions"
                                  value="attendance_view"
                                >
                                <span>View</span>
                                <span class="checkmark"></span>
                              </label>
                            </b-col>
                            <!--Attendance ADD -->
                            <b-col md="6">
                              <label class="checkbox checkbox-outline-primary">
                                <input
                                  type="checkbox"
                                  checked
                                  v-model="permissions"
                                  value="attendance_add"
                                >
                                <span>Add</span>
                                <span class="checkmark"></span>
                              </label>
                            </b-col>
                            <!--Attendance Edit -->
                            <b-col md="6">
                              <label class="checkbox checkbox-outline-primary">
                                <input
                                  type="checkbox"
                                  checked
                                  v-model="permissions"
                                  value="attendance_edit"
                                >
                                <span>Edit</span>
                                <span class="checkmark"></span>
                              </label>
                            </b-col>
                            <!--Attendance Delete -->
                            <b-col md="6">
                              <label class="checkbox checkbox-outline-primary">
                                <input
                                  type="checkbox"
                                  checked
                                  v-model="permissions"
                                  value="attendance_delete"
                                >
                                <span>Del</span>
                                <span class="checkmark"></span>
                              </label>
                            </b-col>

                           

                          </b-row>
                        </b-card-text>
                      </b-card-body>
                    </b-collapse>
                  </b-card>
                </b-col>
               
                <!-- Nutrition Reports -->
                <b-col md="4">
                  <b-card no-body class="ul-card__border-radius">
                    <b-card-header header-tag="header" class="p-1" role="tab">
                      <b-button
                        class="card-title mb-0"
                        block
                        href="#"
                        v-b-toggle.panel-nutritionReports
                        variant="transparent"
                      >Nutrition & Compliance Reports</b-button>
                    </b-card-header>
                    <b-collapse
                      id="panel-nutritionReports"
                      :visible="true"
                      accordion="my-accordion41"
                      role="tabpanel"
                    >
                      <b-card-body>
                        <b-card-text>
                          <b-row>
                            <!--nutritionReports View -->
                            <b-col md="6">
                              <label class="checkbox checkbox-outline-primary">
                                <input
                                  type="checkbox"
                                  checked
                                  v-model="permissions"
                                  value="nutritionReports_view"
                                >
                                <span>View</span>
                                <span class="checkmark"></span>
                              </label>
                            </b-col>
                            <!--nutritionReports ADD -->
                            <b-col md="6">
                              <label class="checkbox checkbox-outline-primary">
                                <input
                                  type="checkbox"
                                  checked
                                  v-model="permissions"
                                  value="nutritionReports_add"
                                >
                                <span>Add</span>
                                <span class="checkmark"></span>
                              </label>
                            </b-col>
                            <!--nutritionReports Edit -->
                            <b-col md="6">
                              <label class="checkbox checkbox-outline-primary">
                                <input
                                  type="checkbox"
                                  checked
                                  v-model="permissions"
                                  value="nutritionReports_edit"
                                >
                                <span>Edit</span>
                                <span class="checkmark"></span>
                              </label>
                            </b-col>
                            <!--nutritionReports Delete -->
                            <b-col md="6">
                              <label class="checkbox checkbox-outline-primary">
                                <input
                                  type="checkbox"
                                  checked
                                  v-model="permissions"
                                  value="nutritionReports_delete"
                                >
                                <span>Del</span>
                                <span class="checkmark"></span>
                              </label>
                            </b-col>

                           

                          </b-row>
                        </b-card-text>
                      </b-card-body>
                    </b-collapse>
                  </b-card>
                </b-col>
               
                <!-- Revenue -->
                <b-col md="4">
                  <b-card no-body class="ul-card__border-radius">
                    <b-card-header header-tag="header" class="p-1" role="tab">
                      <b-button
                        class="card-title mb-0"
                        block
                        href="#"
                        v-b-toggle.panel-revenue
                        variant="transparent"
                      >Revenue & Subscription Reports</b-button>
                    </b-card-header>
                    <b-collapse
                      id="panel-revenue"
                      :visible="true"
                      accordion="my-accordion42"
                      role="tabpanel"
                    >
                      <b-card-body>
                        <b-card-text>
                          <b-row>
                            <!--revenue View -->
                            <b-col md="6">
                              <label class="checkbox checkbox-outline-primary">
                                <input
                                  type="checkbox"
                                  checked
                                  v-model="permissions"
                                  value="revenue_view"
                                >
                                <span>View</span>
                                <span class="checkmark"></span>
                              </label>
                            </b-col>
                            <!--revenue ADD -->
                            <b-col md="6">
                              <label class="checkbox checkbox-outline-primary">
                                <input
                                  type="checkbox"
                                  checked
                                  v-model="permissions"
                                  value="revenue_add"
                                >
                                <span>Add</span>
                                <span class="checkmark"></span>
                              </label>
                            </b-col>
                            <!--revenue Edit -->
                            <b-col md="6">
                              <label class="checkbox checkbox-outline-primary">
                                <input
                                  type="checkbox"
                                  checked
                                  v-model="permissions"
                                  value="revenue_edit"
                                >
                                <span>Edit</span>
                                <span class="checkmark"></span>
                              </label>
                            </b-col>
                            <!--revenue Delete -->
                            <b-col md="6">
                              <label class="checkbox checkbox-outline-primary">
                                <input
                                  type="checkbox"
                                  checked
                                  v-model="permissions"
                                  value="revenue_delete"
                                >
                                <span>Del</span>
                                <span class="checkmark"></span>
                              </label>
                            </b-col>

                           

                          </b-row>
                        </b-card-text>
                      </b-card-body>
                    </b-collapse>
                  </b-card>
                </b-col>
               
                <!-- Trainer Performance -->
                <b-col md="4">
                  <b-card no-body class="ul-card__border-radius">
                    <b-card-header header-tag="header" class="p-1" role="tab">
                      <b-button
                        class="card-title mb-0"
                        block
                        href="#"
                        v-b-toggle.panel-trainerPerformance
                        variant="transparent"
                      >Trainer Performance</b-button>
                    </b-card-header>
                    <b-collapse
                      id="panel-trainerPerformance"
                      :visible="true"
                      accordion="my-accordion43"
                      role="tabpanel"
                    >
                      <b-card-body>
                        <b-card-text>
                          <b-row>
                            <!--trainerPerformance View -->
                            <b-col md="6">
                              <label class="checkbox checkbox-outline-primary">
                                <input
                                  type="checkbox"
                                  checked
                                  v-model="permissions"
                                  value="trainerPerformance_view"
                                >
                                <span>View</span>
                                <span class="checkmark"></span>
                              </label>
                            </b-col>
                            <!--trainerPerformance ADD -->
                            <b-col md="6">
                              <label class="checkbox checkbox-outline-primary">
                                <input
                                  type="checkbox"
                                  checked
                                  v-model="permissions"
                                  value="trainerPerformance_add"
                                >
                                <span>Add</span>
                                <span class="checkmark"></span>
                              </label>
                            </b-col>
                            <!--trainerPerformance Edit -->
                            <b-col md="6">
                              <label class="checkbox checkbox-outline-primary">
                                <input
                                  type="checkbox"
                                  checked
                                  v-model="permissions"
                                  value="trainerPerformance_edit"
                                >
                                <span>Edit</span>
                                <span class="checkmark"></span>
                              </label>
                            </b-col>
                            <!--trainerPerformance Delete -->
                            <b-col md="6">
                              <label class="checkbox checkbox-outline-primary">
                                <input
                                  type="checkbox"
                                  checked
                                  v-model="permissions"
                                  value="trainerPerformance_delete"
                                >
                                <span>Del</span>
                                <span class="checkmark"></span>
                              </label>
                            </b-col>

                           

                          </b-row>
                        </b-card-text>
                      </b-card-body>
                    </b-collapse>
                  </b-card>
                </b-col>
               
                <!-- Challenge Stats -->
                <b-col md="4">
                  <b-card no-body class="ul-card__border-radius">
                    <b-card-header header-tag="header" class="p-1" role="tab">
                      <b-button
                        class="card-title mb-0"
                        block
                        href="#"
                        v-b-toggle.panel-challengeStats
                        variant="transparent"
                      >Challenge Completion Stats</b-button>
                    </b-card-header>
                    <b-collapse
                      id="panel-challengeStats"
                      :visible="true"
                      accordion="my-accordion44"
                      role="tabpanel"
                    >
                      <b-card-body>
                        <b-card-text>
                          <b-row>
                            <!--challengeStats View -->
                            <b-col md="6">
                              <label class="checkbox checkbox-outline-primary">
                                <input
                                  type="checkbox"
                                  checked
                                  v-model="permissions"
                                  value="challengeStats_view"
                                >
                                <span>View</span>
                                <span class="checkmark"></span>
                              </label>
                            </b-col>
                            <!--challengeStats ADD -->
                            <b-col md="6">
                              <label class="checkbox checkbox-outline-primary">
                                <input
                                  type="checkbox"
                                  checked
                                  v-model="permissions"
                                  value="challengeStats_add"
                                >
                                <span>Add</span>
                                <span class="checkmark"></span>
                              </label>
                            </b-col>
                            <!--challengeStats Edit -->
                            <b-col md="6">
                              <label class="checkbox checkbox-outline-primary">
                                <input
                                  type="checkbox"
                                  checked
                                  v-model="permissions"
                                  value="challengeStats_edit"
                                >
                                <span>Edit</span>
                                <span class="checkmark"></span>
                              </label>
                            </b-col>
                            <!--challengeStats Delete -->
                            <b-col md="6">
                              <label class="checkbox checkbox-outline-primary">
                                <input
                                  type="checkbox"
                                  checked
                                  v-model="permissions"
                                  value="challengeStats_delete"
                                >
                                <span>Del</span>
                                <span class="checkmark"></span>
                              </label>
                            </b-col>

                           

                          </b-row>
                        </b-card-text>
                      </b-card-body>
                    </b-collapse>
                  </b-card>
                </b-col>

                <!-- Resources -->
                <b-col md="4">
                  <b-card no-body class="ul-card__border-radius">
                    <b-card-header header-tag="header" class="p-1" role="tab">
                      <b-button
                        class="card-title mb-0"
                        block
                        href="#"
                        v-b-toggle.panel-Resources
                        variant="transparent"
                      >Resources</b-button>
                    </b-card-header>
                    <b-collapse
                      id="panel-Resources"
                      :visible="true"
                      accordion="my-accordion10"
                      role="tabpanel"
                    >
                      <b-card-body>
                        <b-card-text>
                          <b-row>
                            <!--Resources View -->
                            <b-col md="6">
                              <label class="checkbox checkbox-outline-primary">
                                <input
                                  type="checkbox"
                                  checked
                                  v-model="permissions"
                                  value="Resources_view"
                                >
                                <span>View</span>
                                <span class="checkmark"></span>
                              </label>
                            </b-col>
                            <!--Resources ADD -->
                            <b-col md="6">
                              <label class="checkbox checkbox-outline-primary">
                                <input
                                  type="checkbox"
                                  checked
                                  v-model="permissions"
                                  value="Resources_add"
                                >
                                <span>Add</span>
                                <span class="checkmark"></span>
                              </label>
                            </b-col>
                            <!--Resources Edit -->
                            <b-col md="6">
                              <label class="checkbox checkbox-outline-primary">
                                <input
                                  type="checkbox"
                                  checked
                                  v-model="permissions"
                                  value="Resources_edit"
                                >
                                <span>Edit</span>
                                <span class="checkmark"></span>
                              </label>
                            </b-col>
                            <!--Resources Delete -->
                            <b-col md="6">
                              <label class="checkbox checkbox-outline-primary">
                                <input
                                  type="checkbox"
                                  checked
                                  v-model="permissions"
                                  value="Resources_delete"
                                >
                                <span>Del</span>
                                <span class="checkmark"></span>
                              </label>
                            </b-col>
                          </b-row>
                        </b-card-text>
                      </b-card-body>
                    </b-collapse>
                  </b-card>
                </b-col>

                <!-- Settings -->
                <b-col md="4">
                  <b-card no-body class="ul-card__border-radius">
                    <b-card-header header-tag="header" class="p-1" role="tab">
                      <b-button
                        class="card-title mb-0"
                        block
                        href="#"
                        v-b-toggle.panel-Settings
                        variant="transparent"
                      >Settings</b-button>
                    </b-card-header>
                    <b-collapse
                      id="panel-Settings"
                      :visible="true"
                      accordion="my-accordion11"
                      role="tabpanel"
                    >
                      <b-card-body>
                        <b-card-text>
                          <b-row>
                            <!--Settings View -->
                            <b-col md="6">
                              <label class="checkbox checkbox-outline-primary">
                                <input
                                  type="checkbox"
                                  checked
                                  v-model="permissions"
                                  value="Settings_view"
                                >
                                <span>View</span>
                                <span class="checkmark"></span>
                              </label>
                            </b-col>
                            <!--Settings ADD -->
                            <b-col md="6">
                              <label class="checkbox checkbox-outline-primary">
                                <input
                                  type="checkbox"
                                  checked
                                  v-model="permissions"
                                  value="Settings_add"
                                >
                                <span>Add</span>
                                <span class="checkmark"></span>
                              </label>
                            </b-col>
                            <!--Settings Edit -->
                            <b-col md="6">
                              <label class="checkbox checkbox-outline-primary">
                                <input
                                  type="checkbox"
                                  checked
                                  v-model="permissions"
                                  value="Settings_edit"
                                >
                                <span>Edit</span>
                                <span class="checkmark"></span>
                              </label>
                            </b-col>
                            <!--Settings Delete -->
                            <b-col md="6">
                              <label class="checkbox checkbox-outline-primary">
                                <input
                                  type="checkbox"
                                  checked
                                  v-model="permissions"
                                  value="Settings_delete"
                                >
                                <span>Del</span>
                                <span class="checkmark"></span>
                              </label>
                            </b-col>
                          </b-row>
                        </b-card-text>
                      </b-card-body>
                    </b-collapse>
                  </b-card>
                </b-col>

                <!-- User Role Management -->
                <b-col md="4">
                  <b-card no-body class="ul-card__border-radius">
                    <b-card-header header-tag="header" class="p-1" role="tab">
                      <b-button
                        class="card-title mb-0"
                        block
                        href="#"
                        v-b-toggle.panel-userRole
                        variant="transparent"
                      >User Role & Management</b-button>
                    </b-card-header>
                    <b-collapse
                      id="panel-userRole"
                      :visible="true"
                      accordion="my-accordion45"
                      role="tabpanel"
                    >
                      <b-card-body>
                        <b-card-text>
                          <b-row>
                            <!--userRole View -->
                            <b-col md="6">
                              <label class="checkbox checkbox-outline-primary">
                                <input
                                  type="checkbox"
                                  checked
                                  v-model="permissions"
                                  value="userRole_view"
                                >
                                <span>View</span>
                                <span class="checkmark"></span>
                              </label>
                            </b-col>
                            <!--userRole ADD -->
                            <b-col md="6">
                              <label class="checkbox checkbox-outline-primary">
                                <input
                                  type="checkbox"
                                  checked
                                  v-model="permissions"
                                  value="userRole_add"
                                >
                                <span>Add</span>
                                <span class="checkmark"></span>
                              </label>
                            </b-col>
                            <!--userRole Edit -->
                            <b-col md="6">
                              <label class="checkbox checkbox-outline-primary">
                                <input
                                  type="checkbox"
                                  checked
                                  v-model="permissions"
                                  value="userRole_edit"
                                >
                                <span>Edit</span>
                                <span class="checkmark"></span>
                              </label>
                            </b-col>
                            <!--userRole Delete -->
                            <b-col md="6">
                              <label class="checkbox checkbox-outline-primary">
                                <input
                                  type="checkbox"
                                  checked
                                  v-model="permissions"
                                  value="userRole_delete"
                                >
                                <span>Del</span>
                                <span class="checkmark"></span>
                              </label>
                            </b-col>
                          </b-row>
                        </b-card-text>
                      </b-card-body>
                    </b-collapse>
                  </b-card>
                </b-col>

                <!-- CRM Configuration -->
                <b-col md="4">
                  <b-card no-body class="ul-card__border-radius">
                    <b-card-header header-tag="header" class="p-1" role="tab">
                      <b-button
                        class="card-title mb-0"
                        block
                        href="#"
                        v-b-toggle.panel-crm
                        variant="transparent"
                      >CRM Configuration</b-button>
                    </b-card-header>
                    <b-collapse
                      id="panel-crm"
                      :visible="true"
                      accordion="my-accordion46"
                      role="tabpanel"
                    >
                      <b-card-body>
                        <b-card-text>
                          <b-row>
                            <!--crm View -->
                            <b-col md="6">
                              <label class="checkbox checkbox-outline-primary">
                                <input
                                  type="checkbox"
                                  checked
                                  v-model="permissions"
                                  value="crm_view"
                                >
                                <span>View</span>
                                <span class="checkmark"></span>
                              </label>
                            </b-col>
                            <!--crm ADD -->
                            <b-col md="6">
                              <label class="checkbox checkbox-outline-primary">
                                <input
                                  type="checkbox"
                                  checked
                                  v-model="permissions"
                                  value="crm_add"
                                >
                                <span>Add</span>
                                <span class="checkmark"></span>
                              </label>
                            </b-col>
                            <!--crm Edit -->
                            <b-col md="6">
                              <label class="checkbox checkbox-outline-primary">
                                <input
                                  type="checkbox"
                                  checked
                                  v-model="permissions"
                                  value="crm_edit"
                                >
                                <span>Edit</span>
                                <span class="checkmark"></span>
                              </label>
                            </b-col>
                            <!--crm Delete -->
                            <b-col md="6">
                              <label class="checkbox checkbox-outline-primary">
                                <input
                                  type="checkbox"
                                  checked
                                  v-model="permissions"
                                  value="crm_delete"
                                >
                                <span>Del</span>
                                <span class="checkmark"></span>
                              </label>
                            </b-col>
                          </b-row>
                        </b-card-text>
                      </b-card-body>
                    </b-collapse>
                  </b-card>
                </b-col>

                <!-- API Integration -->
                <b-col md="4">
                  <b-card no-body class="ul-card__border-radius">
                    <b-card-header header-tag="header" class="p-1" role="tab">
                      <b-button
                        class="card-title mb-0"
                        block
                        href="#"
                        v-b-toggle.panel-api
                        variant="transparent"
                      >API Integration</b-button>
                    </b-card-header>
                    <b-collapse
                      id="panel-api"
                      :visible="true"
                      accordion="my-accordion47"
                      role="tabpanel"
                    >
                      <b-card-body>
                        <b-card-text>
                          <b-row>
                            <!--api View -->
                            <b-col md="6">
                              <label class="checkbox checkbox-outline-primary">
                                <input
                                  type="checkbox"
                                  checked
                                  v-model="permissions"
                                  value="api_view"
                                >
                                <span>View</span>
                                <span class="checkmark"></span>
                              </label>
                            </b-col>
                            <!--api ADD -->
                            <b-col md="6">
                              <label class="checkbox checkbox-outline-primary">
                                <input
                                  type="checkbox"
                                  checked
                                  v-model="permissions"
                                  value="api_add"
                                >
                                <span>Add</span>
                                <span class="checkmark"></span>
                              </label>
                            </b-col>
                            <!--api Edit -->
                            <b-col md="6">
                              <label class="checkbox checkbox-outline-primary">
                                <input
                                  type="checkbox"
                                  checked
                                  v-model="permissions"
                                  value="api_edit"
                                >
                                <span>Edit</span>
                                <span class="checkmark"></span>
                              </label>
                            </b-col>
                            <!--api Delete -->
                            <b-col md="6">
                              <label class="checkbox checkbox-outline-primary">
                                <input
                                  type="checkbox"
                                  checked
                                  v-model="permissions"
                                  value="api_delete"
                                >
                                <span>Del</span>
                                <span class="checkmark"></span>
                              </label>
                            </b-col>
                          </b-row>
                        </b-card-text>
                      </b-card-body>
                    </b-collapse>
                  </b-card>
                </b-col>

                <!-- Data Backup -->
                <b-col md="4">
                  <b-card no-body class="ul-card__border-radius">
                    <b-card-header header-tag="header" class="p-1" role="tab">
                      <b-button
                        class="card-title mb-0"
                        block
                        href="#"
                        v-b-toggle.panel-dataBackup
                        variant="transparent"
                      >Data Backup / Export</b-button>
                    </b-card-header>
                    <b-collapse
                      id="panel-dataBackup"
                      :visible="true"
                      accordion="my-accordion48"
                      role="tabpanel"
                    >
                      <b-card-body>
                        <b-card-text>
                          <b-row>
                            <!--dataBackup View -->
                            <b-col md="6">
                              <label class="checkbox checkbox-outline-primary">
                                <input
                                  type="checkbox"
                                  checked
                                  v-model="permissions"
                                  value="dataBackup_view"
                                >
                                <span>View</span>
                                <span class="checkmark"></span>
                              </label>
                            </b-col>
                            <!--dataBackup ADD -->
                            <b-col md="6">
                              <label class="checkbox checkbox-outline-primary">
                                <input
                                  type="checkbox"
                                  checked
                                  v-model="permissions"
                                  value="dataBackup_add"
                                >
                                <span>Add</span>
                                <span class="checkmark"></span>
                              </label>
                            </b-col>
                            <!--dataBackup Edit -->
                            <b-col md="6">
                              <label class="checkbox checkbox-outline-primary">
                                <input
                                  type="checkbox"
                                  checked
                                  v-model="permissions"
                                  value="dataBackup_edit"
                                >
                                <span>Edit</span>
                                <span class="checkmark"></span>
                              </label>
                            </b-col>
                            <!--dataBackup Delete -->
                            <b-col md="6">
                              <label class="checkbox checkbox-outline-primary">
                                <input
                                  type="checkbox"
                                  checked
                                  v-model="permissions"
                                  value="dataBackup_delete"
                                >
                                <span>Del</span>
                                <span class="checkmark"></span>
                              </label>
                            </b-col>
                          </b-row>
                        </b-card-text>
                      </b-card-body>
                    </b-collapse>
                  </b-card>
                </b-col>

                <!-- Notification Preferences -->
                <b-col md="4">
                  <b-card no-body class="ul-card__border-radius">
                    <b-card-header header-tag="header" class="p-1" role="tab">
                      <b-button
                        class="card-title mb-0"
                        block
                        href="#"
                        v-b-toggle.panel-notificationPreferences
                        variant="transparent"
                      >Notification Preferences</b-button>
                    </b-card-header>
                    <b-collapse
                      id="panel-notificationPreferences"
                      :visible="true"
                      accordion="my-accordion49"
                      role="tabpanel"
                    >
                      <b-card-body>
                        <b-card-text>
                          <b-row>
                            <!--notificationPreferences View -->
                            <b-col md="6">
                              <label class="checkbox checkbox-outline-primary">
                                <input
                                  type="checkbox"
                                  checked
                                  v-model="permissions"
                                  value="notificationPreferences_view"
                                >
                                <span>View</span>
                                <span class="checkmark"></span>
                              </label>
                            </b-col>
                            <!--notificationPreferences ADD -->
                            <b-col md="6">
                              <label class="checkbox checkbox-outline-primary">
                                <input
                                  type="checkbox"
                                  checked
                                  v-model="permissions"
                                  value="notificationPreferences_add"
                                >
                                <span>Add</span>
                                <span class="checkmark"></span>
                              </label>
                            </b-col>
                            <!--notificationPreferences Edit -->
                            <b-col md="6">
                              <label class="checkbox checkbox-outline-primary">
                                <input
                                  type="checkbox"
                                  checked
                                  v-model="permissions"
                                  value="notificationPreferences_edit"
                                >
                                <span>Edit</span>
                                <span class="checkmark"></span>
                              </label>
                            </b-col>
                            <!--notificationPreferences Delete -->
                            <b-col md="6">
                              <label class="checkbox checkbox-outline-primary">
                                <input
                                  type="checkbox"
                                  checked
                                  v-model="permissions"
                                  value="notificationPreferences_delete"
                                >
                                <span>Del</span>
                                <span class="checkmark"></span>
                              </label>
                            </b-col>
                          </b-row>
                        </b-card-text>
                      </b-card-body>
                    </b-collapse>
                  </b-card>
                </b-col>

                <!-- Feedback -->
                <b-col md="4">
                  <b-card no-body class="ul-card__border-radius">
                    <b-card-header header-tag="header" class="p-1" role="tab">
                      <b-button
                        class="card-title mb-0"
                        block
                        href="#"
                        v-b-toggle.panel-Feedback
                        variant="transparent"
                      >Feedback & Issue Tracker</b-button>
                    </b-card-header>
                    <b-collapse
                      id="panel-Feedback"
                      :visible="true"
                      accordion="my-accordion50"
                      role="tabpanel"
                    >
                      <b-card-body>
                        <b-card-text>
                          <b-row>
                            <!--Feedback View -->
                            <b-col md="6">
                              <label class="checkbox checkbox-outline-primary">
                                <input
                                  type="checkbox"
                                  checked
                                  v-model="permissions"
                                  value="Feedback_view"
                                >
                                <span>View</span>
                                <span class="checkmark"></span>
                              </label>
                            </b-col>
                            <!--Feedback ADD -->
                            <b-col md="6">
                              <label class="checkbox checkbox-outline-primary">
                                <input
                                  type="checkbox"
                                  checked
                                  v-model="permissions"
                                  value="Feedback_add"
                                >
                                <span>Add</span>
                                <span class="checkmark"></span>
                              </label>
                            </b-col>
                            <!--Feedback Edit -->
                            <b-col md="6">
                              <label class="checkbox checkbox-outline-primary">
                                <input
                                  type="checkbox"
                                  checked
                                  v-model="permissions"
                                  value="Feedback_edit"
                                >
                                <span>Edit</span>
                                <span class="checkmark"></span>
                              </label>
                            </b-col>
                            <!--Feedback Delete -->
                            <b-col md="6">
                              <label class="checkbox checkbox-outline-primary">
                                <input
                                  type="checkbox"
                                  checked
                                  v-model="permissions"
                                  value="Feedback_delete"
                                >
                                <span>Del</span>
                                <span class="checkmark"></span>
                              </label>
                            </b-col>
                          </b-row>
                        </b-card-text>
                      </b-card-body>
                    </b-collapse>
                  </b-card>
                </b-col>

                <!-- Sidebar Navigation -->
                <b-col md="4">
                  <b-card no-body class="ul-card__border-radius">
                    <b-card-header header-tag="header" class="p-1" role="tab">
                      <b-button
                        class="card-title mb-0"
                        block
                        href="#"
                        v-b-toggle.panel-SidebarNavigation
                        variant="transparent"
                      >Sidebar Navigation</b-button>
                    </b-card-header>
                    <b-collapse
                      id="panel-SidebarNavigation"
                      :visible="true"
                      accordion="my-accordion-sidebar"
                      role="tabpanel"
                    >
                      <b-card-body>
                        <b-card-text>
                          <b-row>
                            <!-- Members View -->
                            <b-col md="6">
                              <label class="checkbox checkbox-outline-primary">
                                <input
                                  type="checkbox"
                                  checked
                                  v-model="permissions"
                                  value="members_view"
                                >
                                <span>Members</span>
                                <span class="checkmark"></span>
                              </label>
                            </b-col>
                            <!-- Staff View -->
                            <b-col md="6">
                              <label class="checkbox checkbox-outline-primary">
                                <input
                                  type="checkbox"
                                  checked
                                  v-model="permissions"
                                  value="staff_view"
                                >
                                <span>Coaches</span>
                                <span class="checkmark"></span>
                              </label>
                            </b-col>
                            <!-- Appointments View -->
                            <b-col md="6">
                              <label class="checkbox checkbox-outline-primary">
                                <input
                                  type="checkbox"
                                  checked
                                  v-model="permissions"
                                  value="appointments_view"
                                >
                                <span>Appointments</span>
                                <span class="checkmark"></span>
                              </label>
                            </b-col>
                            <!-- Challenges View -->
                            <b-col md="6">
                              <label class="checkbox checkbox-outline-primary">
                                <input
                                  type="checkbox"
                                  checked
                                  v-model="permissions"
                                  value="challenges_view"
                                >
                                <span>Challenges</span>
                                <span class="checkmark"></span>
                              </label>
                            </b-col>
                            <!-- Workout View -->
                            <b-col md="6">
                              <label class="checkbox checkbox-outline-primary">
                                <input
                                  type="checkbox"
                                  checked
                                  v-model="permissions"
                                  value="workout_view"
                                >
                                <span>Workouts</span>
                                <span class="checkmark"></span>
                              </label>
                            </b-col>
                            <!-- Nutrition View -->
                            <b-col md="6">
                              <label class="checkbox checkbox-outline-primary">
                                <input
                                  type="checkbox"
                                  checked
                                  v-model="permissions"
                                  value="nutrition_view"
                                >
                                <span>Nutrition</span>
                                <span class="checkmark"></span>
                              </label>
                            </b-col>
                            <!-- Community View -->
                            <b-col md="6">
                              <label class="checkbox checkbox-outline-primary">
                                <input
                                  type="checkbox"
                                  checked
                                  v-model="permissions"
                                  value="community_view"
                                >
                                <span>Community</span>
                                <span class="checkmark"></span>
                              </label>
                            </b-col>
                            <!-- Questionnaires View -->
                            <b-col md="6">
                              <label class="checkbox checkbox-outline-primary">
                                <input
                                  type="checkbox"
                                  checked
                                  v-model="permissions"
                                  value="questionnaires_view"
                                >
                                <span>Questionnaires</span>
                                <span class="checkmark"></span>
                              </label>
                            </b-col>
                            <!-- Financial View -->
                            <b-col md="6">
                              <label class="checkbox checkbox-outline-primary">
                                <input
                                  type="checkbox"
                                  checked
                                  v-model="permissions"
                                  value="financial_view"
                                >
                                <span>Financial</span>
                                <span class="checkmark"></span>
                              </label>
                            </b-col>
                            <!-- Check-in View -->
                            <b-col md="6">
                              <label class="checkbox checkbox-outline-primary">
                                <input
                                  type="checkbox"
                                  checked
                                  v-model="permissions"
                                  value="checkin_view"
                                >
                                <span>Check-in</span>
                                <span class="checkmark"></span>
                              </label>
                            </b-col>
                            <!-- Support View -->
                            <b-col md="6">
                              <label class="checkbox checkbox-outline-primary">
                                <input
                                  type="checkbox"
                                  checked
                                  v-model="permissions"
                                  value="support_view"
                                >
                                <span>Support</span>
                                <span class="checkmark"></span>
                              </label>
                            </b-col>
                            <!-- Payments View -->
                            <b-col md="6">
                              <label class="checkbox checkbox-outline-primary">
                                <input
                                  type="checkbox"
                                  checked
                                  v-model="permissions"
                                  value="payments_view"
                                >
                                <span>Payments</span>
                                <span class="checkmark"></span>
                              </label>
                            </b-col>
                            <!-- Payments History -->
                            <b-col md="6">
                              <label class="checkbox checkbox-outline-primary">
                                <input
                                  type="checkbox"
                                  checked
                                  v-model="permissions"
                                  value="payments_history"
                                >
                                <span>Payment History</span>
                                <span class="checkmark"></span>
                              </label>
                            </b-col>
                            <!-- Payments Invoices -->
                            <b-col md="6">
                              <label class="checkbox checkbox-outline-primary">
                                <input
                                  type="checkbox"
                                  checked
                                  v-model="permissions"
                                  value="payments_invoices"
                                >
                                <span>Invoices</span>
                                <span class="checkmark"></span>
                              </label>
                            </b-col>
                            <!-- Payments Plans -->
                            <b-col md="6">
                              <label class="checkbox checkbox-outline-primary">
                                <input
                                  type="checkbox"
                                  checked
                                  v-model="permissions"
                                  value="payments_plans"
                                >
                                <span>Membership Plans</span>
                                <span class="checkmark"></span>
                              </label>
                            </b-col>
                            <!-- User Role View -->
                            <b-col md="6">
                              <label class="checkbox checkbox-outline-primary">
                                <input
                                  type="checkbox"
                                  checked
                                  v-model="permissions"
                                  value="user_role_view"
                                >
                                <span>User Roles</span>
                                <span class="checkmark"></span>
                              </label>
                            </b-col>
                            <!-- Backup View -->
                            <b-col md="6">
                              <label class="checkbox checkbox-outline-primary">
                                <input
                                  type="checkbox"
                                  checked
                                  v-model="permissions"
                                  value="backup_view"
                                >
                                <span>Data Backup</span>
                                <span class="checkmark"></span>
                              </label>
                            </b-col>
                            <!-- Notification View -->
                            <b-col md="6">
                              <label class="checkbox checkbox-outline-primary">
                                <input
                                  type="checkbox"
                                  checked
                                  v-model="permissions"
                                  value="notification_view"
                                >
                                <span>Notifications</span>
                                <span class="checkmark"></span>
                              </label>
                            </b-col>
                            <!-- Payment Gateway View -->
                            <b-col md="6">
                              <label class="checkbox checkbox-outline-primary">
                                <input
                                  type="checkbox"
                                  checked
                                  v-model="permissions"
                                  value="payment_gateway_view"
                                >
                                <span>Payment Gateway</span>
                                <span class="checkmark"></span>
                              </label>
                            </b-col>
                            <!-- Mail Settings View -->
                            <b-col md="6">
                              <label class="checkbox checkbox-outline-primary">
                                <input
                                  type="checkbox"
                                  checked
                                  v-model="permissions"
                                  value="mail_settings_view"
                                >
                                <span>Mail Settings</span>
                                <span class="checkmark"></span>
                              </label>
                            </b-col>
                            <!-- Email Templates View -->
                            <b-col md="6">
                              <label class="checkbox checkbox-outline-primary">
                                <input
                                  type="checkbox"
                                  checked
                                  v-model="permissions"
                                  value="email_templates_view"
                                >
                                <span>Email Templates</span>
                                <span class="checkmark"></span>
                              </label>
                            </b-col>
                            <!-- Subscription Plans View -->
                            <b-col md="6">
                              <label class="checkbox checkbox-outline-primary">
                                <input
                                  type="checkbox"
                                  checked
                                  v-model="permissions"
                                  value="subscription_plans_view"
                                >
                                <span>Subscription Plans</span>
                                <span class="checkmark"></span>
                              </label>
                            </b-col>
                          </b-row>
                        </b-card-text>
                      </b-card-body>
                    </b-collapse>
                  </b-card>
                </b-col>
              </b-row>

                
              <!-- End row -->
              
               <b-col md="12">
  <div class="d-flex justify-content-center flex-column align-items-center">
    <button type="submit" class="submit-btn" :disabled="SubmitProcessing">
  <i class="i-Yes me-2 font-weight-bold"></i> submit
</button>



    <div v-once class="typo__p" v-if="SubmitProcessing">
      <div class="spinner sm spinner-primary mt-3"></div>
    </div>
  </div>
</b-col>


            </b-card>
          </b-col>
        </b-row>
      </b-form>
    </validation-observer>
  </div>
</template>

<script>
import NProgress from "nprogress";

export default {
  metaInfo: {
    title: "Create Permissions"
  },
  data() {
    return {
      SubmitProcessing:false,
      isLoading: true,
      permissions: [],
      role: {
        name: "",
        description: ""
      }
    };
  },

  methods: {
    //------------- Submit Validation Create Permissions
    Submit_Permission() {
      this.$refs.Create_Permission.validate().then(success => {
        if (!success) {
          this.makeToast(
            "danger",
            this.Please_fill_the_form_correctly,
            this.Failed
          );
        } else {
          this.Create_Permission();
        }
      });
    },

    //---Validate State Fields
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
   

    //------------------------ Create Permissions -------------------\\
    Create_Permission() {
      this.SubmitProcessing = true;
      NProgress.start();
      NProgress.set(0.1);
      axios
        .post("roles", {
          role: this.role,
          permissions: this.permissions
        })
        .then(response => {
          this.SubmitProcessing = false;
          NProgress.done();
          this.makeToast(
            "success",
            this.Create.TitleRole,
            this.Success
          );

          this.$router.push({
            name: "groupPermission"
          });
        })
        .catch(error => {
          this.SubmitProcessing = false;
          NProgress.done();
          this.makeToast("danger", this.InvalidData, this.Failed);
        });
    }
  }, //end Methods

  created: function() {
  }
};
</script>

<style lang="scss">
@import "../../../../../assets/styles/sass/_variables.scss";

.breadcrumb h1, .breadcrumb ul li a{
  color: #252525;
}
.role-permission{
  color: #252525;
}
.card-title{
  color: #252525;
}
.card-title:hover{
  color: #ff4040;
}
.submit-btn{
  background: $primary;
  color: $color-text;
  border: none;
  padding: 15px 40px;
  border-radius: 50px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 10px 30px rgba(79, 112, 92, 0.3);
  display: inline-flex;
  align-items: center;
  gap: 10px;
}
</style>