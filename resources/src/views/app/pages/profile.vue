<template>
    <div class="member-form-container">
        <div class="container py-5">
            <div class="form-card">
                <!-- Header Section -->
                <div class="form-header"><div class="header-icon"><i class="fas fa-user-edit"></i></div><h2 class="form-title" style="color: #fff;">Profile</h2><p class="form-subtitle">Update Your Profile Information</p></div>

                <div
                    v-if="isLoading"
                    class="loading_page spinner spinner-primary mr-3"
                ></div>

                <div v-if="!isLoading">
                    <!-- Profile Picture Section -->
                    <div class="profile-picture-section">
                        <div class="profile-picture-content">
                            <div class="profile-picture-container">
                                <div class="current-avatar">
                                    <img
                                        :src="
                                            avatar
                                                ? '/images/avatar/' + avatar
                                                : '/images/avatar/no_avatar.png'
                                        "
                                        alt="Profile Picture"
                                        class="avatar-image"
                                        @error="
                                            $event.target.src =
                                                '/images/avatar/no_avatar.png'
                                        "
                                    />
                                    <div class="avatar-overlay">
                                        <span class="username">{{
                                            username
                                        }}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Personal Information Section -->
                    <validation-observer ref="Update_Profile">
                        <form
                            @submit.prevent="Submit_Update"
                            class="member-form"
                        >
                            <div class="form-section">
                                <div class="section-header">
                                    <div class="section-icon">
                                        <i class="fas fa-id-card"></i>
                                    </div>
                                    <h5 class="section-title">
                                        Personal Information
                                    </h5>
                                </div>
                                <div class="section-content">
                                    <div class="row g-4">
                                        <div class="col-md-6">
                                            <validation-provider
                                                name="Firstname"
                                                :rules="{
                                                    required: true,
                                                    min: 4,
                                                    max: 20,
                                                }"
                                                v-slot="validationContext"
                                            >
                                                <div class="form-group">
                                                    <label class="form-label"
                                                        >Firstname
                                                        *</label
                                                    >
                                                    <input
                                                        type="text"
                                                        :class="[
                                                            'form-control',
                                                            {
                                                                'is-invalid':
                                                                    validationContext
                                                                        .errors
                                                                        .length >
                                                                    0,
                                                            },
                                                        ]"
                                                        v-model="user.firstname"
                                                        required
                                                    />
                                                    <div class="input-icon">
                                                        <i
                                                            class="fas fa-user"
                                                        ></i>
                                                    </div>
                                                    <div
                                                        v-if="
                                                            validationContext
                                                                .errors.length >
                                                            0
                                                        "
                                                        class="invalid-feedback"
                                                    >
                                                        {{
                                                            validationContext
                                                                .errors[0]
                                                        }}
                                                    </div>
                                                </div>
                                            </validation-provider>
                                        </div>

                                        <div class="col-md-6">
                                            <validation-provider
                                                name="lastname"
                                                :rules="{
                                                    required: true,
                                                    min: 4,
                                                    max: 20,
                                                }"
                                                v-slot="validationContext"
                                            >
                                                <div class="form-group">
                                                    <label class="form-label"
                                                        >lastname
                                                        *</label
                                                    >
                                                    <input
                                                        type="text"
                                                        :class="[
                                                            'form-control',
                                                            {
                                                                'is-invalid':
                                                                    validationContext
                                                                        .errors
                                                                        .length >
                                                                    0,
                                                            },
                                                        ]"
                                                        v-model="user.lastname"
                                                        required
                                                    />
                                                    <div class="input-icon">
                                                        <i
                                                            class="fas fa-user"
                                                        ></i>
                                                    </div>
                                                    <div
                                                        v-if="
                                                            validationContext
                                                                .errors.length >
                                                            0
                                                        "
                                                        class="invalid-feedback"
                                                    >
                                                        {{
                                                            validationContext
                                                                .errors[0]
                                                        }}
                                                    </div>
                                                </div>
                                            </validation-provider>
                                        </div>
                                    </div>

                                    <div class="row g-4 mt-2">
                                        <div class="col-md-6">
                                            <validation-provider
                                                name="username"
                                                :rules="{
                                                    required: true,
                                                    min: 4,
                                                    max: 20,
                                                }"
                                                v-slot="validationContext"
                                            >
                                                <div class="form-group">
                                                    <label class="form-label"
                                                        >username
                                                        *</label
                                                    >
                                                    <input
                                                        type="text"
                                                        :class="[
                                                            'form-control',
                                                            {
                                                                'is-invalid':
                                                                    validationContext
                                                                        .errors
                                                                        .length >
                                                                    0,
                                                            },
                                                        ]"
                                                        v-model="user.username"
                                                        required
                                                    />
                                                    <div class="input-icon">
                                                        <i
                                                            class="fas fa-at"
                                                        ></i>
                                                    </div>
                                                    <div
                                                        v-if="
                                                            validationContext
                                                                .errors.length >
                                                            0
                                                        "
                                                        class="invalid-feedback"
                                                    >
                                                        {{
                                                            validationContext
                                                                .errors[0]
                                                        }}
                                                    </div>
                                                </div>
                                            </validation-provider>
                                        </div>

                                        <div class="col-md-6">
                                            <validation-provider
                                                name="Phone"
                                                :rules="{ required: true }"
                                                v-slot="validationContext"
                                            >
                                                <div class="form-group">
                                                    <label class="form-label"
                                                        >Phone
                                                        *</label
                                                    >
                                                    <input
                                                        type="tel"
                                                        :class="[
                                                            'form-control',
                                                            {
                                                                'is-invalid':
                                                                    validationContext
                                                                        .errors
                                                                        .length >
                                                                    0,
                                                            },
                                                        ]"
                                                        v-model="user.phone"
                                                        required
                                                    />
                                                    <div class="input-icon">
                                                        <i
                                                            class="fas fa-phone"
                                                        ></i>
                                                    </div>
                                                    <div
                                                        v-if="
                                                            validationContext
                                                                .errors.length >
                                                            0
                                                        "
                                                        class="invalid-feedback"
                                                    >
                                                        {{
                                                            validationContext
                                                                .errors[0]
                                                        }}
                                                    </div>
                                                </div>
                                            </validation-provider>
                                        </div>
                                    </div>

                                    <div class="form-group mt-3">
                                        <validation-provider
                                            name="Email"
                                            :rules="{ required: true }"
                                            v-slot="validationContext"
                                        >
                                            <label class="form-label"
                                                >Email *</label
                                            >
                                            <input
                                                type="email"
                                                :class="[
                                                    'form-control',
                                                    {
                                                        'is-invalid':
                                                            validationContext
                                                                .errors.length >
                                                            0,
                                                    },
                                                ]"
                                                v-model="user.email"
                                                required
                                            />
                                            <div class="input-icon">
                                                <i class="fas fa-envelope"></i>
                                            </div>
                                            <div
                                                v-if="
                                                    validationContext.errors
                                                        .length > 0
                                                "
                                                class="invalid-feedback"
                                            >
                                                {{
                                                    validationContext.errors[0]
                                                }}
                                            </div>
                                        </validation-provider>
                                    </div>
                                </div>
                            </div>

                            <!-- Security Section -->
                            <!-- <div class="form-section">
                                <div class="section-header">
                                    <div class="section-icon">
                                        <i class="fas fa-shield-alt"></i>
                                    </div>
                                    <h5 class="section-title">
                                        Security Settings
                                    </h5>
                                </div>
                                <div class="section-content">
                                    <div class="row g-4">
                                        <div class="col-md-6">
                                            <validation-provider
                                                name="New password"
                                                :rules="{ min: 6, max: 14 }"
                                                v-slot="validationContext"
                                            >
                                                <div class="form-group">
                                                    <label class="form-label">Newpassword</label>
                                                    <input
                                                        type="password"
                                                        :class="[
                                                            'form-control',
                                                            {
                                                                'is-invalid':
                                                                    validationContext
                                                                        .errors
                                                                        .length >
                                                                    0,
                                                            },
                                                        ]"
                                                        :placeholder="
                                                            LeaveBlank
                                                        "
                                                        v-model="
                                                            user.newPassword
                                                        "
                                                    />
                                                    <div class="input-icon">
                                                        <i
                                                            class="fas fa-lock"
                                                        ></i>
                                                    </div>
                                                    <div
                                                        v-if="
                                                            validationContext
                                                                .errors.length >
                                                            0
                                                        "
                                                        class="invalid-feedback"
                                                    >
                                                        {{
                                                            validationContext
                                                                .errors[0]
                                                        }}
                                                    </div>
                                                </div>
                                            </validation-provider>
                                        </div>

                                        <div class="col-md-6">
                                            <validation-provider
                                                name="Avatar"
                                                ref="Avatar"
                                                rules="mimes:image/*|size:200"
                                                v-slot="{ errors }"
                                            >
                                                <div class="form-group">
                                                    <label class="form-label">UserImage</label>
                                                    <div
                                                        class="file-upload-container"
                                                    >
                                                        <input
                                                            :class="[
                                                                'form-control',
                                                                {
                                                                    'is-invalid':
                                                                        errors.length >
                                                                        0,
                                                                },
                                                            ]"
                                                            @change="
                                                                onFileSelected
                                                            "
                                                            type="file"
                                                            accept="image/*"
                                                        />
                                                        <div class="input-icon">
                                                            <i
                                                                class="fas fa-upload"
                                                            ></i>
                                                        </div>
                                                        <div
                                                            v-if="
                                                                errors.length >
                                                                0
                                                            "
                                                            class="invalid-feedback"
                                                        >
                                                            {{ errors[0] }}
                                                        </div>
                                                    </div>
                                                </div>
                                            </validation-provider>
                                        </div>
                                    </div>
                                </div>
                            </div> -->

                            <!-- Update Section -->
                            <div class="update-section">
                                <button class="update-btn" type="submit">
                                    <i
                                        class="fas fa-check-circle update-icon"
                                    ></i>
                                    <span>update Profile</span>
                                    <!-- <span class="update-text">Update</span> -->
                                </button>
                            </div>
                        </form>
                    </validation-observer>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import NProgress from "nprogress";
import { mapGetters } from "vuex";
import axios from "axios";

export default {
    metaInfo: {
        title: "Profile",
    },
    data() {
        return {
            data: new FormData(),
            avatar: "",
            username: "",
            isLoading: true,
            user: {
                id: "",
                firstname: "",
                lastname: "",
                username: "",
                newPassword: null,
                email: "",
                phone: "",
                avatar: "",
            },
        };
    },

    computed: {
        ...mapGetters(["currentUser"]),
    },

    methods: {
        Submit_Update() {
            this.$refs.Update_Profile.validate().then((success) => {
                if (!success) {
                    this.makeToast(
                        "danger",
                        this.Please_fill_the_form_correctly,
                        this.Failed
                    );
                } else {
                    this.Update_Profile();
                }
            });
        },

        makeToast(variant, msg, title) {
            this.$root.$bvToast.toast(msg, {
                title: title,
                variant: variant,
                solid: true,
            });
        },

        Get_Profile_Info() {
            axios
                .get("Get_user_profile")
                .then((response) => {
                    this.user = response.data.user;
                    this.avatar = response.data.user.avatar || "no_avatar.png";
                    this.username = response.data.user.username;
                    this.isLoading = false;
                })
                .catch((error) => {
                    this.isLoading = false;
                    console.error("Get profile info error:", error);
                });
        },

        async onFileSelected(e) {
            const file = e.target.files[0];
            this.user.avatar = file instanceof File ? file : "";
        },

        Update_Profile() {
            if (!this.user.id) {
                this.makeToast("danger", "Invalid user ID", "Error");
                return;
            }

            NProgress.start();
            NProgress.set(0.1);

            this.data = new FormData();
            this.data.append("firstname", this.user.firstname);
            this.data.append("lastname", this.user.lastname);
            this.data.append("username", this.user.username);
            this.data.append("email", this.user.email);
            this.data.append("NewPassword", this.user.newPassword);
            this.data.append("phone", this.user.phone);

            if (this.user.avatar instanceof File) {
                this.data.append("avatar", this.user.avatar);
            }

            this.data.append("_method", "put");

            axios
                .put("update_user_profile/" + this.user.id, this.data, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                })
                .then((response) => {
                    this.makeToast(
                        "success",
                        this.TitleProfile,
                        this.Success
                    ); // ✅ Fixed key
                    NProgress.done();

                    if (response.data.avatar) {
                        this.avatar = response.data.avatar;
                    }

                    setTimeout(() => {
                        this.Get_Profile_Info();
                    }, 500);
                })
                .catch((error) => {
                    NProgress.done();
                    console.error("Update profile error:", error);
                    this.makeToast(
                        "danger",
                        "Failed to update profile",
                        "Error"
                    );
                });
        },
    },

    created() {
        this.Get_Profile_Info();
    },
};
</script>

<style lang="scss">
@use "sass:color";
@import "../../../assets/styles/sass/_variables.scss";

// Fallback variables in case import fails
$color-background: #f5f5f3 !default;
$color-white: #ffffff !default;
$color-background-sidebar: #252525 !default;
$color-divider: #dcdcdc !default;
$color-button: #ff4040 !default;
$color-subtitle: #252525 !default;
$color-input-bg: #dededc !default;
$color-muted: #6a6a6a !default;

.member-form-container {
    min-height: 100vh;
    background: linear-gradient(
        135deg,
        $color-background 0%,
        $color-background 100%
    );
    padding: 20px 0;
}

.form-card {
    background: $color-white;
    border-radius: 20px;
    box-shadow: 0 20px 60px rgba(79, 112, 92, 0.15);
    overflow: hidden;
    max-width: 1000px;
    margin: 0 auto;
}

.form-header {
    background: $color-background-sidebar;
    color: $color-white;
    text-align: center;
    padding: 30px 0px;
    position: relative;
}

.form-header::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grain" width="100" height="100" patternUnits="userSpaceOnUse"><circle cx="25" cy="25" r="1" fill="white" opacity="0.1"/><circle cx="75" cy="75" r="1" fill="white" opacity="0.1"/><circle cx="50" cy="10" r="0.5" fill="white" opacity="0.1"/><circle cx="10" cy="60" r="0.5" fill="white" opacity="0.1"/><circle cx="90" cy="40" r="0.5" fill="white" opacity="0.1"/></pattern></defs><rect width="100" height="100" fill="url(%23grain)"/></svg>');
    opacity: 0.3;
}

.header-icon {
    width: 85px;
    height: 80px;
    background: rgba($color-white, 0.2);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto 10px;
    font-size: 28px;
}

.form-title {
    font-size: 2rem;
    font-weight: 700;
}

.form-subtitle {
    font-size: 1.1rem;
    opacity: 0.9;
    margin: 0;
}

.member-form {
    padding: 30px;
}

.form-section {
    margin-bottom: 40px;
    background: $color-white;
    border-radius: 15px;
    padding: 25px;
    border: 1px solid #dcdcdc;
    transition: all 0.3s ease;
    animation: fadeInUp 0.6s ease forwards;
    opacity: 0;
    transform: translateY(20px);
}

.form-section:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 30px rgba(79, 112, 92, 0.1);
    border-color: $color-button;
}

.form-section:nth-child(1) {
    animation-delay: 0.1s;
}
.form-section:nth-child(2) {
    animation-delay: 0.2s;
}
.form-section:nth-child(3) {
    animation-delay: 0.3s;
}

.section-header {
    display: flex;
    align-items: center;
    margin-bottom: 25px;
    padding-bottom: 15px;
    border-bottom: 2px solid #dcdcdc;
}

.section-icon {
    width: 50px;
    height: 50px;
    background: $color-button;
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-size: 20px;
    margin-right: 15px;
    box-shadow: 0 4px 15px rgba(79, 112, 92, 0.3);
}

.section-title {
    font-size: 1.3rem;
    font-weight: 600;
    color: $color-subtitle;
    margin: 0;
}

.form-group {
    position: relative;
    margin-bottom: 20px;
}

.form-label {
    font-weight: 700;
    color: $color-subtitle;
    margin-bottom: 8px;
    display: block;
    font-size: 0.95rem;
}

.form-control {
    width: 100%;
    border: 1px solid $color-divider;
    border-radius: 8px;
    font-size: 13px;
    transition: all 0.3s ease;
    background: $color-input-bg;
    color: $color-subtitle;
}

.form-control:focus {
    outline: none;
    border-color: $color-button;
    box-shadow: 0 0 0 3px rgba(79, 112, 92, 0.1);
    transform: translateY(-1px);
}

.form-control::placeholder {
    color: $color-muted;
}

.form-control.is-invalid {
    border-color: #dc3545;
}

.invalid-feedback {
    display: block;
    width: 100%;
    margin-top: 0.25rem;
    font-size: 0.875rem;
    color: #dc3545;
}

.input-icon {
    position: absolute;
    right: 12px;
    top: 70%;
    transform: translateY(-50%);
    color: #252525;
    font-size: 15px;
    pointer-events: none;
}

.form-control:focus + .input-icon {
    color: $color-button;
}

.profile-picture-section {
    padding: 30px;
    text-align: center;
    background: $color-white;
    border-radius: 15px;
    margin-bottom: 30px;
    border: 1px solid $color-divider;
}

.profile-picture-content {
    display: flex;
    justify-content: center;
    align-items: center;
}

.profile-picture-container {
    text-align: center;
}

.current-avatar {
    position: relative;
    display: inline-block;
}

.avatar-image {
    width: 120px;
    height: 120px;
    border-radius: 50%;
    object-fit: scale-down;
    // border: 4px solid white;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
}

.avatar-overlay {
    position: absolute;
    bottom: -40px;
    left: 50%;
    transform: translateX(-50%);
    background: $color-button;
    padding: 5px 15px;
    border-radius: 20px;
    font-weight: 600;
    white-space: nowrap;
}

.file-upload-container {
    position: relative;
}

.update-section {
    text-align: center;
    margin-top: 40px;
    padding-top: 30px;
    border-top: 2px solid $color-divider;
}

.update-btn {
    background: linear-gradient(
        135deg,
        $color-button 0%,
        color.adjust($color-button, $lightness: -10%) 100%
    );
    color: $color-white;
    border: none;
    padding: 18px 50px;
    border-radius: 50px;
    font-size: 1.1rem;
    font-weight: 700;
    cursor: pointer;
    transition: all 0.3s ease;
    box-shadow: 0 8px 25px rgba(255, 64, 64, 0.3);
    display: inline-flex;
    align-items: center;
    gap: 12px;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    position: relative;
    overflow: hidden;
}

.update-btn::before {
    content: "";
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(
        90deg,
        transparent,
        rgba(255, 255, 255, 0.2),
        transparent
    );
    transition: left 0.5s;
}

.update-btn:hover {
    transform: translateY(-3px);
    box-shadow: 0 12px 35px rgba(255, 64, 64, 0.4);
    background: linear-gradient(
        135deg,
        color.adjust($color-button, $lightness: -5%) 0%,
        color.adjust($color-button, $lightness: -15%) 100%
    );
}

.update-btn:hover::before {
    left: 100%;
}

.update-btn:active {
    transform: translateY(-1px);
    box-shadow: 0 6px 20px rgba(255, 64, 64, 0.3);
}

.update-btn:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(255, 64, 64, 0.2),
        0 8px 25px rgba(255, 64, 64, 0.3);
}

.update-icon {
    font-size: 1.2rem;
    animation: pulse 2s infinite;
}

.update-text {
    font-weight: 700;
    text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
}

@keyframes pulse {
    0% {
        transform: scale(1);
    }
    50% {
        transform: scale(1.1);
    }
    100% {
        transform: scale(1);
    }
}

@keyframes fadeInUp {
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

/* Responsive Design */
@media (max-width: 768px) {
    .member-form {
        padding: 20px;
    }

    .form-header {
        padding: 30px 20px;
    }

    .form-title {
        font-size: 1.8rem;
    }

    .header-icon {
        width: 60px;
        height: 60px;
        font-size: 24px;
    }

    .section-icon {
        width: 40px;
        height: 40px;
        font-size: 16px;
    }

    .form-section {
        padding: 20px;
    }

    .avatar-image {
        width: 100px;
        height: 100px;
    }
}

/* Custom scrollbar */
.member-form-container::-webkit-scrollbar {
    width: 8px;
}

.member-form-container::-webkit-scrollbar-track {
    background: #f5f5f3;
}

.member-form-container::-webkit-scrollbar-thumb {
    background: $color-button;
    border-radius: 4px;
}

.member-form-container::-webkit-scrollbar-thumb:hover {
    background: $color-button;
}
</style>
