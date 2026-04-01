<template>
    <div class="auth-layout-wrap login-background">
        <b-toaster name="b-toaster-top-right" />
        <div class="auth-content">
            <div class="card o-hidden">
                <div class="row">
                    <div class="col-md-12">
                        <div class="p-4">
                            <div class="auth-logo text-center">
                                <img :src="'/images/logo.png'" />
                            </div>
                            <h1 style="text-align: center" class="text-25">
                                Login
                            </h1>
                            <p class="text-muted text-center">
                                Welcome to Thor Strength Fitness
                            </p>
                            <validation-observer ref="submit_login">
                                <b-form @submit.prevent="Submit_Login">
                                    <validation-provider
                                        name="Email Address"
                                        :rules="{ required: true, email: true }"
                                        v-slot="validationContext"
                                    >
                                        <b-form-group
                                            label="Email Address"
                                            class="text-12"
                                        >
                                            <b-form-input
                                                :state="
                                                    getValidationState(
                                                        validationContext
                                                    )
                                                "
                                                aria-describedby="Email-feedback"
                                                class="form-control-rounded"
                                                type="email"
                                                v-model="email"
                                            ></b-form-input>
                                            <b-form-invalid-feedback
                                                id="Email-feedback"
                                                >{{
                                                    validationContext.errors[0]
                                                }}</b-form-invalid-feedback
                                            >
                                        </b-form-group>
                                    </validation-provider>

                                    <validation-provider
                                        name="Password"
                                        :rules="{ required: true }"
                                        v-slot="validationContext"
                                    >
                                        <b-form-group
                                            label="Password"
                                            class="text-12"
                                        >
                                            <div class="password-input-wrapper">
                                                <b-form-input
                                                    style="color: #252525"
                                                    :state="
                                                        getValidationState(
                                                            validationContext
                                                        )
                                                    "
                                                    aria-describedby="Password-feedback"
                                                    class="form-control-rounded"
                                                    :type="showPassword ? 'text' : 'password'"
                                                    v-model="password"
                                                ></b-form-input>
                                                <button
                                                    type="button"
                                                    class="password-toggle-btn"
                                                    @click="togglePasswordVisibility"
                                                    tabindex="-1"
                                                >
                                                    <i
                                                        :class="
                                                            showPassword
                                                                ? 'fas fa-eye-slash'
                                                                : 'fas fa-eye'
                                                        "
                                                    ></i>
                                                </button>
                                            </div>
                                            <b-form-invalid-feedback
                                                id="Password-feedback"
                                                >{{
                                                    validationContext.errors[0]
                                                }}</b-form-invalid-feedback
                                            >
                                        </b-form-group>
                                    </validation-provider>

                                    <b-button
                                        style="color: #ffffff !important"
                                        type="submit"
                                        tag="button"
                                        class="btn-rounded btn-block mt-2"
                                        variant="primary mt-2"
                                        :disabled="loading"
                                        >SignIn</b-button
                                    >
                                    <div v-once class="typo__p" v-if="loading">
                                        <div
                                            class="spinner sm spinner-primary mt-3"
                                        ></div>
                                    </div>
                                </b-form>
                            </validation-observer>

                            <div class="mt-3 text-center">
                                <a class="hover-button"
                                    style="color: #252525"
                                    href="/password/reset"
                                >
                                    <u>Forgot_Password</u>
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
import { mapGetters, mapActions } from "vuex";
import NProgress from "nprogress";

export default {
    metaInfo: {
        title: "SignIn",
    },
    data() {
        return {
            email: "",
            password: "",
            userId: "",
            loading: false,
            showPassword: false,
        };
    },
    computed: {
        ...mapGetters(["isAuthenticated", "error"]),
    },

    methods: {
        //------------- Submit Form login
        Submit_Login() {
            this.$refs.submit_login.validate().then((success) => {
                if (!success) {
                    this.makeToast(
                        "danger",
                        this.$t("Please_fill_the_form_correctly") || "Please fill in all fields correctly.",
                        this.$t("Failed") || "Failed"
                    );
                } else {
                    this.Login();
                }
            });
        },

        getValidationState({ dirty, validated, valid = null }) {
            return dirty || validated ? valid : null;
        },

        Login() {
            let self = this;
            // Start the progress bar.
            NProgress.start();
            NProgress.set(0.1);
            self.loading = true;
            axios
                .post(
                    "/login",
                    {
                        email: self.email,
                        password: self.password,
                    },
                    {
                        baseURL: "",
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json',
                        },
                    }
                )
                .then((response) => {
                    this.makeToast(
                        "success",
                        this.$t("Login_Successful") || "You have signed in successfully.",
                        this.$t("Success") || "Success"
                    );

                    window.location = "/";

                    NProgress.done();
                    this.loading = false;
                })
                .catch((error) => {
                    NProgress.done();
                    this.loading = false;

                    const failedTitle = this.$t("Failed") || "Failed";
                    let errorMessage = this.$t("Incorrect_Login") || "Invalid email or password.";
                    let errorTitle = failedTitle;
                    const normalizeAuthError = (message) => {
                        const fallback = this.$t("Incorrect_Login") || "Invalid email or password.";
                        if (!message || typeof message !== "string") {
                            return fallback;
                        }

                        const normalized = message.trim().toLowerCase();
                        if (
                            normalized === "auth.failed" ||
                            normalized === "validation failed" ||
                            normalized === "invalid credentials" ||
                            normalized === "incorrect login"
                        ) {
                            return fallback;
                        }

                        return message;
                    };

                    // Handle different error response structures
                    if (error.response) {
                        const status = error.response.status;
                        const data = error.response.data || {};

                        if (status === 403) {
                            // Access denied - show specific message about using mobile app
                            errorMessage = data.message ||
                                "Access denied. This login is for administrators only. Members and coaches should use the mobile app. Please download the app to access your account.";
                            errorTitle = "Access Denied";
                        } else if (status === 429) {
                            // Too many login attempts
                            const firstError = data.errors && typeof data.errors === "object"
                                ? Object.values(data.errors)[0]
                                : null;
                            errorMessage = (Array.isArray(firstError) && firstError[0]) || data.message ||
                                "Too many login attempts. Please try again in a few minutes.";
                            errorTitle = "Too Many Attempts";
                        } else if (status === 422 && data.errors && typeof data.errors === "object") {
                            // Validation (e.g. wrong credentials): prefer specific error over generic "Validation failed"
                            const firstError = Object.values(data.errors)[0];
                            if (Array.isArray(firstError) && firstError.length > 0) {
                                errorMessage = normalizeAuthError(firstError[0]);
                            } else if (typeof firstError === "string") {
                                errorMessage = normalizeAuthError(firstError);
                            } else {
                                errorMessage = normalizeAuthError(data.message || errorMessage);
                            }
                        } else if (data.message) {
                            errorMessage = normalizeAuthError(data.message);
                        } else if (data.errors && typeof data.errors === "object") {
                            const firstError = Object.values(data.errors)[0];
                            if (Array.isArray(firstError) && firstError.length > 0) {
                                errorMessage = normalizeAuthError(firstError[0]);
                            } else if (typeof firstError === "string") {
                                errorMessage = normalizeAuthError(firstError);
                            }
                        }
                    } else if (error.message) {
                        errorMessage = normalizeAuthError(error.message);
                    }

                    // Fallback for generic login failure
                    if (!errorMessage || errorMessage.trim() === "") {
                        errorMessage = "Unable to login. Please check your email and password and try again.";
                    }
                    // If server sent generic "Validation failed", show a clear login message
                    if (
                        errorMessage.trim().toLowerCase() === "validation failed" ||
                        errorMessage.trim().toLowerCase() === "auth.failed"
                    ) {
                        errorMessage = this.$t("Incorrect_Login") || "Invalid email or password. Please try again.";
                    }

                    this.makeToast("danger", errorMessage, errorTitle);

                    console.error("Login error:", {
                        status: error.response?.status,
                        data: error.response?.data,
                        message: errorMessage,
                    });
                });
        },

        //------ Toast (longer duration for errors so message is readable)
        makeToast(variant, msg, title) {
            const isError = variant === "danger" || variant === "error";
            this.$root.$bvToast.toast(msg, {
                title: title || (isError ? (this.$t("Failed") || "Failed") : this.$t("Success") || "Success"),
                variant: variant,
                solid: true,
                toaster: "b-toaster-top-right",
                autoHideDelay: isError ? 6000 : 3000,
            });
        },

        //------ Toggle Password Visibility
        togglePasswordVisibility() {
            this.showPassword = !this.showPassword;
        },
    },
};
</script>

<style>
.login-background {
    background: url("/images/fitness-login-background.jpg") no-repeat center
        center fixed;
    background-size: cover;
    min-height: 100vh;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}

.auth-layout-wrap {
    background-color: transparent !important;
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
}

.card.o-hidden {
    background-color: #ffffff;
    color: #333;
    border-radius: 12px;
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
}

.btn-primary {
    background-color: #ff4040 !important;
    border-color: #ff4040 !important;
    color: #fff !important;
}

.btn-primary:hover {
    background-color: #ff4040 !important;
    border-color: #ff4040 !important;
}

.form-control-rounded {
    color: #252525 !important;
    border-radius: 20px;
    border: 1px solid #ccc;
}

.form-control-rounded:focus {
    border-color: #ff4040;
    box-shadow: 0 0 0 0.2rem rgba(255, 64, 64, 0.25);
}

a.text-muted {
    color: #252525 !important;
}

a.text-muted:hover {
    color: #ff4040 !important;
}

  .hover-button:hover {
    color: #ff4040 !important;
  }

.password-input-wrapper {
    position: relative !important;
    width: 100%;
    display: block;
}

.password-input-wrapper .form-control-rounded,
.password-input-wrapper input.form-control-rounded,
.password-input-wrapper .form-control {
    padding-right: 50px !important;
    width: 100% !important;
}

.password-toggle-btn {
    position: absolute !important;
    right: 15px !important;
    top: 50% !important;
    transform: translateY(-50%) !important;
    background: transparent !important;
    border: none !important;
    color: #252525 !important;
    cursor: pointer;
    padding: 8px !important;
    z-index: 1000 !important;
    outline: none !important;
    display: flex !important;
    align-items: center;
    justify-content: center;
    width: auto;
    min-width: 36px;
    height: 36px;
    margin: 0 !important;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    transition: all 0.2s ease;
    line-height: 1;
    visibility: visible !important;
    opacity: 1 !important;
}

.password-toggle-btn:hover {
    color: #ff4040 !important;
    background-color: rgba(255, 64, 64, 0.1) !important;
}

.password-toggle-btn i {
    font-size: 18px;
    line-height: 1;
    display: inline-block !important;
    pointer-events: none;
    visibility: visible !important;
    opacity: 1 !important;
}

.password-toggle-btn:hover i {
    color: #ff4040 !important;
}

.password-toggle-btn:focus {
    outline: none !important;
    border: none !important;
}

.password-toggle-btn:active {
    outline: none !important;
    box-shadow: none !important;
    border: none !important;
    background: transparent !important;
    transform: translateY(-50%) scale(0.95);
}
</style>