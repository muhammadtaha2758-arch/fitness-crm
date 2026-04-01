<template>
  <div class="main-content">
    <!-- Breadcrumb and Navigation Row -->
    <div class="breadcrumb-nav-row">
      <!-- Breadcrumb Navigation -->
      <div class="breadcrumb-section">
        <nav class="breadcrumb-nav" aria-label="breadcrumb">
          <div class="breadcrumb-container">
            <button 
              @click.stop="goBack" 
              class="back-button"
              type="button"
              title="Go back"
              style="color: #252525;"
            >
              <i class="fas fa-arrow-left"></i>
            </button>
            <ol class="breadcrumb">
              <li class="breadcrumb-item">
                <router-link to="/app/Members/ViewAllMembers">
                  <i class="fas fa-home"></i>
                  Dashboard
                </router-link>
              </li>
              <li class="breadcrumb-item">
                <router-link to="/app/settings">
                  <i class="fas fa-cogs"></i>
                  Settings
                </router-link>
              </li>
              <li class="breadcrumb-item active" aria-current="page">
                <i class="fas fa-credit-card"></i>
                Payment Gateway
              </li>
            </ol>
          </div>
        </nav>
      </div>
    </div>
    
    <div v-if="isLoading" class="loading_page spinner spinner-primary mr-3"></div>

    <!-- Payment Gateway -->
    <validation-observer ref="form_payment" v-if="!isLoading">
      <b-form @submit.prevent="Submit_Payment">
        <b-row class="mt-5">
          <b-col lg="12" md="12" sm="12">
            <b-card no-body :header="Payment_Gateway">
              <b-card-body>
                <b-row class="p-4">
                  <!-- Active Gateway Selection -->
                  <b-col lg="12" md="12" sm="12" class="mb-4">
                    <h5 class="mb-3 text-primary">
                      <i class="fas fa-cog me-2"></i>
                      Select Active Payment Gateway
                    </h5>
                    <p class="text-muted mb-3">
                      Only one payment gateway can be active at a time for your gym.
                    </p>
                    <b-form-group label="Active Payment Gateway">
                      <b-form-select
                        v-model="gateway.active_payment_gateway"
                        :options="[
                          { value: 'none', text: 'No Payment Gateway' },
                          { value: 'stripe', text: 'Stripe Payment Gateway' },
                          { value: 'paysafecard', text: 'PaysafeCard Payment Gateway' }
                        ]"
                        @change="onGatewayChange"
                      ></b-form-select>
                    </b-form-group>
                  </b-col>

                  <!-- Stripe Configuration -->
                  <b-col lg="12" md="12" sm="12" v-if="gateway.active_payment_gateway === 'stripe'">
                    <div class="border rounded p-4 bg-light">
                      <h5 class="mb-3 text-primary">
                        <i class="fas fa-credit-card me-2"></i>
                        Stripe Payment Gateway Configuration
                      </h5>
                      
                      <!-- Stripe Key -->
                      <b-col lg="6" md="6" sm="12" class="mb-3">
                        <b-form-group label="STRIPE_KEY">
                          <b-form-input
                            type="password"
                            v-model="gateway.stripe_key"
                            placeholder="Enter Stripe Public Key"
                          ></b-form-input>
                        </b-form-group>
                      </b-col>

                      <!-- Stripe Secret -->
                      <b-col lg="6" md="6" sm="12" class="mb-3">
                        <b-form-group label="STRIPE_SECRET">
                          <b-form-input
                            type="password"
                            v-model="gateway.stripe_secret"
                            placeholder="Enter Stripe Secret Key"
                          ></b-form-input>
                        </b-form-group>
                      </b-col>
                    </div>
                  </b-col>

                  <!-- PaysafeCard Configuration -->
                  <b-col lg="12" md="12" sm="12" v-if="gateway.active_payment_gateway === 'paysafecard'">
                    <div class="border rounded p-4 bg-light">
                      <h5 class="mb-3 text-success">
                        <i class="fas fa-credit-card me-2"></i>
                        PaysafeCard Payment Gateway Configuration
                      </h5>
                      
                      <!-- PaysafeCard Account Number -->
                      <b-col lg="6" md="6" sm="12" class="mb-3">
                        <b-form-group label="PAYSAFECARD_ACCOUNT_NUMBER">
                          <b-form-input
                            type="password"
                            v-model="gateway.paysafecard_account_number"
                            placeholder="Enter PaysafeCard Account Number"
                          ></b-form-input>
                        </b-form-group>
                      </b-col>

                      <!-- PaysafeCard API Key -->
                      <b-col lg="6" md="6" sm="12" class="mb-3">
                        <b-form-group label="PAYSAFECARD_API_KEY">
                          <b-form-input
                            type="password"
                            v-model="gateway.paysafecard_api_key"
                            placeholder="Enter PaysafeCard API Key"
                          ></b-form-input>
                        </b-form-group>
                      </b-col>

                      <!-- PaysafeCard Environment -->
                      <b-col lg="6" md="6" sm="12" class="mb-3">
                        <b-form-group label="PAYSAFECARD_ENVIRONMENT">
                          <b-form-select
                            v-model="gateway.paysafecard_environment"
                            :options="[
                              { value: 'TEST', text: 'Test Environment' },
                              { value: 'PRODUCTION', text: 'Production Environment' }
                            ]"
                          ></b-form-select>
                        </b-form-group>
                      </b-col>
                    </div>
                  </b-col>

                  <!-- No Gateway Selected -->
                  <b-col lg="12" md="12" sm="12" v-if="gateway.active_payment_gateway === 'none'">
                    <div class="border rounded p-4 bg-light text-center">
                      <i class="fas fa-info-circle text-muted fa-2x mb-3"></i>
                      <h5 class="text-muted">No Payment Gateway Selected</h5>
                      <p class="text-muted">
                        Please select a payment gateway above to configure payment processing for your gym.
                      </p>
                    </div>
                  </b-col>

                  <b-col md="12" class="mt-4">
                    <b-form-group>
                      <b-button variant="primary" type="submit" :disabled="gateway.active_payment_gateway === 'none'">
                        <i class="i-Yes me-2 font-weight-bold"></i> 
                        submit
                      </b-button>
                    </b-form-group>
                  </b-col>
                </b-row>
              </b-card-body>
            </b-card>
          </b-col>
        </b-row>
      </b-form>
    </validation-observer>

  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import NProgress from "nprogress";

export default {
  metaInfo: {
    title: "Payment Gateway"
  },
  data() {
    return {
      isLoading: true,
      gateway:{
        active_payment_gateway: 'none',
        stripe_key:"",
        stripe_secret:"",
        paysafecard_account_number: "",
        paysafecard_api_key: "",
        paysafecard_environment: "TEST",
      },
    
    };
  },

  methods: {
    ...mapActions(["refreshUserPermissions"]),

    goBack() {
      // Check if there's a previous page in history
      if (window.history.length > 1) {
        this.$router.go(-1);
      } else {
        // Default fallback to members page
        this.$router.push({ name: 'ViewAllMembers' });
      }
    },

     //------------- Submit Validation Payment
    Submit_Payment() {
      this.$refs.form_payment.validate().then(success => {
        if (!success) {
          this.makeToast(
            "danger",
            this.Please_fill_the_form_correctly,
            this.Failed
          );
        } else {
            this.Update_Payment();
        }
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

    // Handle gateway change
    onGatewayChange() {
      // Clear all configurations when switching gateways
      this.gateway.stripe_key = '';
      this.gateway.stripe_secret = '';
      this.gateway.paysafecard_account_number = '';
      this.gateway.paysafecard_api_key = '';
      this.gateway.paysafecard_environment = 'TEST';
    },

    //---------------------------------- Update Payment Gateway ----------------
    Update_Payment() {
      NProgress.start();
      NProgress.set(0.1);
      axios
        .post("payment_gateway",{
          active_payment_gateway: this.gateway.active_payment_gateway,
          stripe_key: this.gateway.stripe_key,
          stripe_secret: this.gateway.stripe_secret,
          paysafecard_account_number: this.gateway.paysafecard_account_number,
          paysafecard_api_key: this.gateway.paysafecard_api_key,
          paysafecard_environment: this.gateway.paysafecard_environment,
        })
        .then(response => {
          Fire.$emit("Event_payment");
          this.makeToast(
            "success",
            this.Successfully_Updated,
            this.Success
          );
          NProgress.done();
        })
        .catch(error => {
          NProgress.done();
          this.makeToast("danger", this.InvalidData, this.Failed);
        });
    },

     //---------------------------------- GET Payment_Gateway ----------------
    Get_Payment_Gateway() {
      axios
        .get("get_payment_gateway")
        .then(response => {
          this.gateway = response.data.gateway;
          this.isLoading = false;
        })
        .catch(error => {
          this.isLoading = false;
        });
    },

   
  }, //end Methods

  //----------------------------- Created function-------------------

  created: function() {
    this.Get_Payment_Gateway();

    Fire.$on("Event_payment", () => {
      this.Get_Payment_Gateway();
    });


  }
};
</script>

<style lang="scss" scoped>
@import "../../../../assets/styles/sass/_variables.scss";

.main-content {
  padding: 20px;
}
</style>