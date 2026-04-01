<template>
  <div class="onboarding-page">
    <div class="page-title">
      <h1>Complete Your Gym Registration</h1>
      <p class="text-muted mb-0">
        Add your gym details below. Your password was already set via the email link.
      </p>
    </div>
    <div class="card">
      <div class="card-body p-4">
        <validation-observer ref="form_onboarding">
          <form @submit.prevent="submitOnboarding">
            <div class="form-fields">
              <div class="form-group">
                <label class="field-label">Gym / Business name</label>
                <input
                  type="text"
                  class="form-control form-control-rounded"
                  v-model="form.gym_name"
                  placeholder="Your gym or business name"
                />
              </div>
              <div class="form-group">
                <label class="field-label">Address</label>
                <input
                  type="text"
                  class="form-control form-control-rounded"
                  v-model="form.address"
                  placeholder="Street address"
                />
              </div>
              <div class="form-row">
                <div class="form-group col-md-6">
                  <label class="field-label">City</label>
                  <input
                    type="text"
                    class="form-control form-control-rounded"
                    v-model="form.city"
                    placeholder="City"
                  />
                </div>
                <div class="form-group col-md-6">
                  <label class="field-label">ZIP code</label>
                  <input
                    type="text"
                    class="form-control form-control-rounded"
                    v-model="form.zip_code"
                    placeholder="ZIP code"
                  />
                </div>
              </div>
              <div class="form-group">
                <label class="field-label">Country</label>
                <select class="form-control form-control-rounded" v-model="form.country">
                  <option value="">Select country</option>
                  <option value="us">United States</option>
                  <option value="ca">Canada</option>
                  <option value="uk">United Kingdom</option>
                  <option value="au">Australia</option>
                </select>
              </div>
              <div class="form-group">
                <label class="field-label">Business type</label>
                <select class="form-control form-control-rounded" v-model="form.business_type">
                  <option value="">Select type</option>
                  <option value="fitness-center">Fitness Center</option>
                  <option value="personal-trainer">Personal Trainer</option>
                  <option value="gym">Gym</option>
                  <option value="yoga-pilates-studio">Yoga or Pilates Studio</option>
                  <option value="crossfit-box">CrossFit Box</option>
                  <option value="bootcamp">Bootcamp</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div class="form-group">
                <label class="field-label">Description</label>
                <textarea
                  class="form-control form-control-rounded"
                  rows="3"
                  v-model="form.description"
                  placeholder="Brief description of your business"
                ></textarea>
              </div>
              <div class="form-group">
                <label class="field-label">Gym phone</label>
                <input
                  type="text"
                  class="form-control form-control-rounded"
                  v-model="form.phone"
                  placeholder="Gym contact number"
                />
              </div>
              <div class="form-group">
                <label class="field-label">Your phone (owner)</label>
                <input
                  type="text"
                  class="form-control form-control-rounded"
                  v-model="form.owner_phone"
                  placeholder="Your contact number"
                />
              </div>
            </div>
            <div class="form-actions mt-4">
              <button type="submit" class="btn btn-primary btn-rounded" :disabled="submitting">
                <span v-if="submitting" class="spinner-border spinner-border-sm mr-2" role="status"></span>
                Complete Registration
              </button>
            </div>
          </form>
        </validation-observer>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "Onboarding",
  metaInfo: {
    title: "Complete Registration",
  },
  data() {
    return {
      form: {
        gym_name: "",
        address: "",
        city: "",
        zip_code: "",
        country: "",
        business_type: "",
        description: "",
        phone: "",
        owner_phone: "",
      },
      submitting: false,
    };
  },
  computed: {
    ...mapGetters(["currentUser"]),
  },
  methods: {
    ...mapActions(["refreshUserPermissions"]),
    async submitOnboarding() {
      this.submitting = true;
      try {
        const { data } = await axios.post("user/onboarding", {
          gym_name: this.form.gym_name || undefined,
          address: this.form.address || undefined,
          city: this.form.city || undefined,
          zip_code: this.form.zip_code || undefined,
          country: this.form.country || undefined,
          business_type: this.form.business_type || undefined,
          description: this.form.description || undefined,
          phone: this.form.phone || undefined,
          owner_phone: this.form.owner_phone || undefined,
        });
        if (data.success) {
          this.makeToast("success", data.message || "Registration complete. Welcome!", "Success");
          await this.refreshUserPermissions();
          this.$router.replace({ path: "/app/dashboard" });
        } else {
          this.makeToast("danger", data.message || "Failed to complete registration.", "Error");
        }
      } catch (error) {
        let msg = error.response?.data?.message || error.message || "Failed to complete registration.";
        if (error.response?.data?.errors) {
          const first = Object.values(error.response.data.errors).flat()[0];
          if (first) msg = first;
        }
        this.makeToast("danger", msg, "Error");
      } finally {
        this.submitting = false;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.onboarding-page {
  max-width: 560px;
  margin: 0 auto;
}
.page-title {
  margin-bottom: 1.5rem;
}
.field-label {
  font-weight: 600;
  margin-bottom: 0.25rem;
  display: block;
}
</style>
