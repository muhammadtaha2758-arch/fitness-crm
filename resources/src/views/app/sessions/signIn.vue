<template>
    <div class="login-page">
        <b-toaster name="b-toaster-top-right" />
        <div class="login-page__bg" aria-hidden="true" />
        <div class="container login-page__container py-4 py-md-5">
            <div
                class="login-page__shell card border-0 shadow-lg mx-auto overflow-hidden"
            >
                <div class="row no-gutters">
                    <div
                        class="col-lg-6 login-page__brand d-none d-lg-flex flex-column justify-content-center p-5 text-white"
                    >
                        <div class="login-page__brand-inner">
                            <p
                                class="login-page__eyebrow text-uppercase font-weight-semibold mb-2"
                            >
                                Thor Strength Fitness
                            </p>
                            <h2 class="login-page__headline font-weight-bold mb-3">
                                Train smarter. Manage easier.
                            </h2>
                            <p class="login-page__lead mb-0">
                                Access your gym dashboard to manage members,
                                schedules, workouts, and billing in one place.
                            </p>
                        </div>
                    </div>
                    <div class="col-lg-6 bg-white">
                        <div class="login-page__form-wrap p-4 p-md-5">
                            <div class="text-center mb-4">
                                <div
                                    class="login-page__logo-wrap d-inline-flex align-items-center justify-content-center mb-3"
                                >
                                    <img
                                        src="/images/logo.png"
                                        alt="Thor Strength Fitness"
                                        class="login-page__logo img-fluid"
                                    />
                                </div>
                                <h1 class="h3 font-weight-bold text-dark mb-1">
                                    {{
                                        $t("SignIn") ||
                                            $t("Login") ||
                                            "Sign in"
                                    }}
                                </h1>
                                <p class="text-muted small mb-0">
                                    Welcome to Thor Strength Fitness
                                </p>
                            </div>

                            <validation-observer ref="submit_login">
                                <b-form @submit.prevent="Submit_Login">
                                    <validation-provider
                                        name="Email Address"
                                        :rules="{ required: true, email: true }"
                                        v-slot="validationContext"
                                    >
                                        <b-form-group
                                            :label="
                                                $t('Email_Address') ||
                                                    'Email address'
                                            "
                                            label-class="small font-weight-semibold text-secondary mb-1"
                                            class="mb-3"
                                        >
                                            <b-form-input
                                                :state="
                                                    getValidationState(
                                                        validationContext
                                                    )
                                                "
                                                aria-describedby="Email-feedback"
                                                class="login-page__input"
                                                type="email"
                                                v-model="email"
                                                autocomplete="username"
                                                placeholder="you@example.com"
                                            />
                                            <b-form-invalid-feedback
                                                id="Email-feedback"
                                            >
                                                {{
                                                    validationContext.errors[0]
                                                }}
                                            </b-form-invalid-feedback>
                                        </b-form-group>
                                    </validation-provider>

                                    <validation-provider
                                        name="Password"
                                        :rules="{ required: true }"
                                        v-slot="validationContext"
                                    >
                                        <b-form-group
                                            :label="
                                                $t('password') ||
                                                    $t('Password') ||
                                                    'Password'
                                            "
                                            label-class="small font-weight-semibold text-secondary mb-1"
                                            class="mb-4"
                                        >
                                            <div class="login-page__password-wrap">
                                                <b-form-input
                                                    :state="
                                                        getValidationState(
                                                            validationContext
                                                        )
                                                    "
                                                    aria-describedby="Password-feedback"
                                                    class="login-page__input login-page__input--password"
                                                    :type="
                                                        showPassword
                                                            ? 'text'
                                                            : 'password'
                                                    "
                                                    v-model="password"
                                                    autocomplete="current-password"
                                                    placeholder="••••••••"
                                                />
                                                <button
                                                    type="button"
                                                    class="login-page__toggle btn btn-link p-0"
                                                    @click="
                                                        togglePasswordVisibility
                                                    "
                                                    :aria-pressed="showPassword"
                                                    :aria-label="
                                                        showPassword
                                                            ? 'Hide password'
                                                            : 'Show password'
                                                    "
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
                                            >
                                                {{
                                                    validationContext.errors[0]
                                                }}
                                            </b-form-invalid-feedback>
                                        </b-form-group>
                                    </validation-provider>

                                    <b-button
                                        type="submit"
                                        variant="primary"
                                        class="login-page__submit btn-lg btn-block font-weight-semibold"
                                        :disabled="loading"
                                    >
                                        {{
                                            $t("SignIn") ||
                                                $t("Login") ||
                                                "Sign in"
                                        }}
                                    </b-button>
                                    <div
                                        v-once
                                        class="text-center"
                                        v-if="loading"
                                    >
                                        <div
                                            class="spinner-border spinner-border-sm text-primary mt-3"
                                            role="status"
                                        >
                                            <span class="sr-only">
                                                {{ $t("Loading") || "Loading" }}
                                            </span>
                                        </div>
                                    </div>
                                </b-form>
                            </validation-observer>

                            <div class="mt-4 text-center">
                                <a
                                    class="login-page__forgot small font-weight-medium"
                                    href="/password/reset"
                                >
                                    {{ $t("Forgot_Password") || "Forgot password?" }}
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
import { mapGetters } from "vuex";
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
                        this.$t("Please_fill_the_form_correctly") ||
                            "Please fill in all fields correctly.",
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
                            Accept: "application/json",
                            "Content-Type": "application/json",
                        },
                    }
                )
                .then((response) => {
                    this.makeToast(
                        "success",
                        this.$t("Login_Successful") ||
                            "You have signed in successfully.",
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
                    let errorMessage =
                        this.$t("Incorrect_Login") ||
                        "Invalid email or password.";
                    let errorTitle = failedTitle;
                    const normalizeAuthError = (message) => {
                        const fallback =
                            this.$t("Incorrect_Login") ||
                            "Invalid email or password.";
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
                            errorMessage =
                                data.message ||
                                "Access denied. This login is for administrators only. Members and coaches should use the mobile app. Please download the app to access your account.";
                            errorTitle = "Access Denied";
                        } else if (status === 429) {
                            // Too many login attempts
                            const firstError =
                                data.errors && typeof data.errors === "object"
                                    ? Object.values(data.errors)[0]
                                    : null;
                            errorMessage =
                                (Array.isArray(firstError) && firstError[0]) ||
                                data.message ||
                                "Too many login attempts. Please try again in a few minutes.";
                            errorTitle = "Too Many Attempts";
                        } else if (
                            status === 422 &&
                            data.errors &&
                            typeof data.errors === "object"
                        ) {
                            // Validation (e.g. wrong credentials): prefer specific error over generic "Validation failed"
                            const firstError = Object.values(data.errors)[0];
                            if (
                                Array.isArray(firstError) &&
                                firstError.length > 0
                            ) {
                                errorMessage = normalizeAuthError(firstError[0]);
                            } else if (typeof firstError === "string") {
                                errorMessage = normalizeAuthError(firstError);
                            } else {
                                errorMessage = normalizeAuthError(
                                    data.message || errorMessage
                                );
                            }
                        } else if (data.message) {
                            errorMessage = normalizeAuthError(data.message);
                        } else if (
                            data.errors &&
                            typeof data.errors === "object"
                        ) {
                            const firstError = Object.values(data.errors)[0];
                            if (
                                Array.isArray(firstError) &&
                                firstError.length > 0
                            ) {
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
                        errorMessage =
                            "Unable to login. Please check your email and password and try again.";
                    }
                    // If server sent generic "Validation failed", show a clear login message
                    if (
                        errorMessage.trim().toLowerCase() ===
                            "validation failed" ||
                        errorMessage.trim().toLowerCase() === "auth.failed"
                    ) {
                        errorMessage =
                            this.$t("Incorrect_Login") ||
                            "Invalid email or password. Please try again.";
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
                title:
                    title ||
                    (isError
                        ? this.$t("Failed") || "Failed"
                        : this.$t("Success") || "Success"),
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

<style lang="scss" scoped>
@import "../../../assets/styles/sass/_variables.scss";

.login-page {
    position: relative;
    min-height: 100vh;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
}

.login-page__bg {
    position: fixed;
    inset: 0;
    z-index: 0;
    background: url("/images/fitness-login-background.jpg") no-repeat center
        center;
    background-size: cover;

    &::after {
        content: "";
        position: absolute;
        inset: 0;
        background: linear-gradient(
            135deg,
            rgba($heading-dark, 0.82) 0%,
            rgba($gray-900, 0.55) 50%,
            rgba($primary, 0.35) 100%
        );
    }
}

.login-page__container {
    position: relative;
    z-index: 1;
    max-width: 960px;
}

.login-page__shell {
    border-radius: $border-radius-lg;
}

.login-page__brand {
    background: linear-gradient(
        160deg,
        mix(black, $primary, 22%) 0%,
        $primary 45%,
        mix(black, $primary, 12%) 100%
    );
}

.login-page__eyebrow {
    letter-spacing: $letter-spacing-sm;
    opacity: 0.92;
    font-size: $font-size-xs;
}

.login-page__headline {
    font-size: $font-size-xxl;
    line-height: $line-height-lg;
}

.login-page__lead {
    font-size: $font-size-md;
    line-height: $line-height-lg;
    opacity: 0.95;
}

.login-page__logo-wrap {
    width: 4.5rem;
    height: 4.5rem;
    border-radius: $border-radius-md;
    background-color: $gray-100;
    border: $border-width-sm $border-style-solid $gray-200;
}

.login-page__logo {
    max-height: 2.75rem;
    width: auto;
}

.login-page__form-wrap ::v-deep .form-group {
    margin-bottom: 0;
}

.login-page__input {
    border-radius: $border-radius-md;
    border: $border-width-sm solid $gray-300;
    padding: $padding-sm $padding-md;
    min-height: 2.75rem;
    color: $heading;

    &:focus {
        border-color: $primary;
        box-shadow: 0 0 0 0.2rem rgba($primary, 0.2);
    }
}

.login-page__password-wrap {
    position: relative;
    width: 100%;
}

.login-page__input--password {
    padding-right: 2.75rem;
}

.login-page__toggle {
    position: absolute;
    right: $padding-xs;
    top: 50%;
    transform: translateY(-50%);
    color: $text-muted !important;
    text-decoration: none !important;
    line-height: 1;

    &:hover {
        color: $primary !important;
    }

    &:focus {
        box-shadow: none;
    }
}

.login-page__submit {
    border-radius: $border-radius-md;
    padding-top: $padding-sm;
    padding-bottom: $padding-sm;
}

.login-page__forgot {
    color: $heading;

    &:hover {
        color: $primary;
        text-decoration: none;
    }
}
</style>
