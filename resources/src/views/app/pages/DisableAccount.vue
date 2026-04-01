<template>
  <div class="auth-layout-wrap">
    <div class="auth-content">
      <div class="card o-hidden">
        <div class="row">
          <div class="col-md-12">
            <div class="p-4">
              <div class="auth-logo text-center mb-30">
                <img :src="'/images/logo.png'" alt="Logo">
              </div>
              <h1 class="mb-3 text-18">Disable Account</h1>
              <p class="text-muted mb-3 text-12">
                Request to disable your account. Enter your email and password below. You will receive a confirmation email; click the link in that email to complete the process.
              </p>
              <validation-observer ref="disableFormRef">
                <b-form @submit.prevent="onSubmit">
                  <validation-provider
                    name="Email"
                    rules="required|email"
                    v-slot="validationContext"
                  >
                    <b-form-group label="Email address" class="text-12">
                      <b-form-input
                        id="disable-email"
                        v-model="form.email"
                        type="email"
                        placeholder="Enter your email"
                        class="form-control-rounded"
                        :state="getValidationState(validationContext)"
                        aria-describedby="disable-email-feedback"
                      />
                      <b-form-invalid-feedback id="disable-email-feedback">
                        {{ validationContext.errors[0] }}
                      </b-form-invalid-feedback>
                    </b-form-group>
                  </validation-provider>

                  <validation-provider
                    name="Password"
                    rules="required"
                    v-slot="validationContext"
                  >
                    <b-form-group label="Password" class="text-12">
                      <b-form-input
                        id="disable-password"
                        v-model="form.password"
                        type="password"
                        placeholder="Enter your password"
                        class="form-control-rounded"
                        :state="getValidationState(validationContext)"
                        aria-describedby="disable-password-feedback"
                      />
                      <b-form-invalid-feedback id="disable-password-feedback">
                        {{ validationContext.errors[0] }}
                      </b-form-invalid-feedback>
                    </b-form-group>
                  </validation-provider>

                  <b-alert v-if="successMessage" show variant="success" class="mt-3">
                    {{ successMessage }}
                  </b-alert>
                  <b-alert v-if="errorMessage" show variant="danger" class="mt-3">
                    {{ errorMessage }}
                  </b-alert>

                  <b-button
                    type="submit"
                    variant="danger"
                    class="btn-block btn-rounded mt-3"
                    :disabled="loading"
                  >
                    <span v-if="loading" class="spinner-border spinner-border-sm mr-1" role="status" aria-hidden="true"></span>
                    Send confirmation email
                  </b-button>
                </b-form>
              </validation-observer>
              <div class="mt-3 text-center">
                <a href="/login" class="text-muted">
                  <u>Sign in</u>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NProgress from 'nprogress';

export default {
  name: 'DisableAccount',
  metaInfo: {
    title: 'Disable Account'
  },
  data() {
    return {
      form: {
        email: '',
        password: ''
      },
      loading: false,
      successMessage: '',
      errorMessage: ''
    };
  },
  methods: {
    getValidationState({ dirty, validated, valid }) {
      return dirty || validated ? valid : null;
    },
    onSubmit() {
      this.successMessage = '';
      this.errorMessage = '';
      this.$refs.disableFormRef.validate().then(success => {
        if (!success) {
          return;
        }
        this.requestDisable();
      });
    },
    async requestDisable() {
      NProgress.start();
      this.loading = true;
      try {
        const { data } = await axios.post('/account/disable-request', {
          email: this.form.email,
          password: this.form.password
        });
        if (data.status) {
          this.successMessage = data.message || 'A confirmation email has been sent. Please check your inbox and click the link to confirm disabling your account.';
          this.form.password = '';
        } else {
          this.errorMessage = data.message || 'Something went wrong. Please try again.';
        }
      } catch (err) {
        this.errorMessage = err.response?.data?.message || 'Failed to send confirmation email. Please try again later.';
      } finally {
        NProgress.done();
        this.loading = false;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
