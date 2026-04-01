<template>
    <div class="mobile-apps-page">
        <!-- Breadcrumb and Navigation Row -->
        <div class="breadcrumb-nav-row">
            <div class="breadcrumb-section">
                <nav class="breadcrumb-nav" aria-label="breadcrumb">
                    <div class="breadcrumb-container d-flex align-items-center">
                        <button 
                            @click.stop="goBack" 
                            class="back-button"
                            type="button"
                            title="Go back"
                            style="color: #dc3545;"
                        >
                            <i class="fas fa-arrow-left"></i>
                        </button>
                        <ol class="breadcrumb mb-0">
                            <li class="breadcrumb-item">
                                <router-link to="/app/dashboard">
                                    <i class="fas fa-home"></i>
                                    Dashboard
                                </router-link>
                            </li>
                            <li class="breadcrumb-item active" aria-current="page">
                                <i class="fas fa-mobile-alt"></i>
                                Mobile Apps
                            </li>
                        </ol>
                    </div>
                </nav>
            </div>
        </div>

        <!-- Page Header -->
        <div class="mobile-apps-header mb-3">
            <h1 class="page-title mb-0">{{ $t("Mobile Apps") }}</h1>
        </div>

        <!-- Mobile Apps Cards -->
        <div class="mobile-apps-container">
            <div class="row">
                <div 
                    v-for="app in mobileApps" 
                    :key="app.id"
                    class="col-lg-5 col-md-6 col-12 mb-3"
                >
                    <div class="mobile-app-card">
                        <!-- Phone Image -->
                        <div class="app-phone-image">
                            <img 
                                :src="app.phoneImage" 
                                :alt="app.title"
                                class="img-fluid"
                            />
                        </div>

                        <!-- App Icon -->
                        <div class="app-icon-container">
                            <div class="app-icon" :style="{ backgroundColor: app.iconBgColor }">
                                <i :class="app.icon"></i>
                            </div>
                        </div>

                        <!-- App Title -->
                        <h3 class="app-title">{{ app.title }}</h3>

                        <!-- App Description -->
                        <p class="app-description">{{ app.description }}</p>

                        <!-- Download Buttons -->
                        <div class="app-download-buttons">
                            <a 
                                :href="app.googlePlayLink" 
                                target="_blank"
                                class="download-btn google-play-btn"
                                @click.prevent="handleDownloadClick('google-play', app.id)"
                            >
                                <div class="btn-content">
                                    <span class="store-text">GET IT ON</span>
                                    <span class="store-name">Google Play</span>
                                </div>
                            </a>
                            <a 
                                :href="app.appStoreLink" 
                                target="_blank"
                                class="download-btn app-store-btn"
                                @click.prevent="handleDownloadClick('app-store', app.id)"
                            >
                                <div class="btn-content">
                                    <span class="store-text">Download on the</span>
                                    <span class="store-name">App Store</span>
                                </div>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "MobileApps",
    data() {
        return {
            mobileApps: [
                {
                    id: 1,
                    title: "Coach App",
                    description: "Coach your clients anywhere - even when they can't come to you in person - and keep track of their progress on the go. For you as a coach, it is free to use. Download it now and start coaching your clients today!",
                    phoneImage: "/images/mobile_app/coach_app.jpeg",
                    icon: "fas fa-stopwatch",
                    iconBgColor: "#FF6B35",
                    googlePlayLink: "#",
                    appStoreLink: "#"
                },
                {
                    id: 2,
                    title: "Fitness App",
                    description: "Take your workout anywhere and track progress on the go. Set your goal and track everything in the app. Stay in touch with your club or organisation and get motivated to move.",
                    phoneImage: "/images/mobile_app/member_app.jpeg",
                    icon: "fas fa-dumbbell",
                    iconBgColor: "#FF6B35",
                    googlePlayLink: "#",
                    appStoreLink: "#"
                }
            ]
        };
    },
    methods: {
        goBack() {
            this.$router.go(-1);
        },
        handleDownloadClick(store, appId) {
            // Placeholder for future link handling
            console.log(`Clicked ${store} for app ${appId}`);
            // Links will be added later as mentioned by user
        }
    }
};
</script>

<style lang="scss" scoped>
@import "../../../../assets/styles/sass/_variables.scss";

.mobile-apps-page {
    padding: $padding-sm $padding-md;
    min-height: 100vh;
    background-color: #f8f9fa;

    .breadcrumb-nav-row {
        margin-bottom: $padding-sm;

        .breadcrumb-section {
            .breadcrumb-nav {
                .breadcrumb-container {
                    .back-button {
                        background: none;
                        border: none;
                        padding: $padding-xs;
                        margin-right: $padding-sm;
                        cursor: pointer;
                        font-size: $font-size-lg;
                        transition: opacity 0.2s;

                        &:hover {
                            opacity: 0.7;
                        }
                    }

                    .breadcrumb {
                        background: transparent;
                        padding: 0;

                        .breadcrumb-item {
                            a {
                                color: #6c757d;
                                text-decoration: none;

                                &:hover {
                                    color: #495057;
                                }
                            }

                            &.active {
                                color: #495057;
                            }
                        }
                    }
                }
            }
        }
    }

    .mobile-apps-header {
        .page-title {
            font-size: $font-size-xl;
            font-weight: $font-weight-bold;
            color: #212529;
        }
    }

    .mobile-apps-container {
        .mobile-app-card {
            background: #ffffff;
            border-radius: 12px;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
            padding: $padding-sm;
            text-align: center;
            transition: transform 0.3s ease, box-shadow 0.3s ease;
            height: 100%;
            display: flex;
            flex-direction: column;

            &:hover {
                transform: translateY(-4px);
                box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
            }

            .app-phone-image {
                margin-bottom: $padding-xs;
                overflow: visible;
                border-radius: 8px;
                display: flex;
                align-items: center;
                justify-content: center;
                max-height: 400px;
                min-height: 300px;

                img {
                    width: 100%;
                    height: auto;
                    object-fit: contain;
                    max-width: 100%;
                    max-height: 400px;
                    display: block;
                }
            }

            .app-icon-container {
                margin-bottom: $padding-xs;

                .app-icon {
                    width: 50px;
                    height: 50px;
                    border-radius: 12px;
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                    margin: 0 auto;
                    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);

                    i {
                        font-size: $font-size-lg;
                        color: #ffffff;
                    }
                }
            }

            .app-title {
                font-size: $font-size-md;
                font-weight: $font-weight-bold;
                color: #212529;
                margin-bottom: $padding-xxs;
            }

            .app-description {
                font-size: $font-size-sm;
                color: #6c757d;
                line-height: $line-height-sm;
                margin-bottom: $padding-sm;
                flex-grow: 1;
            }

            .app-download-buttons {
                display: flex;
                gap: $padding-xs;
                justify-content: center;
                flex-wrap: wrap;

                .download-btn {
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                    padding: $padding-xs $padding-sm;
                    background-color: #000000;
                    color: #ffffff;
                    text-decoration: none;
                    border-radius: 6px;
                    font-size: $font-size-xs;
                    font-weight: $font-weight-medium;
                    transition: background-color 0.3s ease, transform 0.2s ease;
                    min-width: 140px;
                    cursor: pointer;
                    border: none;

                    &:hover {
                        background-color: #333333;
                        transform: scale(1.02);
                        color: #ffffff;
                        text-decoration: none;
                    }

                    &:active {
                        transform: scale(0.98);
                    }

                    .btn-content {
                        display: flex;
                        flex-direction: column;
                        align-items: flex-start;
                        line-height: 1.2;
                    }

                    .store-text {
                        font-size: 0.6rem;
                        font-weight: $font-weight-normal;
                        line-height: 1.2;
                        margin-bottom: 2px;
                        text-transform: uppercase;
                        letter-spacing: 0.5px;
                    }

                    .store-name {
                        font-size: $font-size-sm;
                        font-weight: $font-weight-semibold;
                        line-height: 1.2;
                    }

                    &.google-play-btn {
                        .btn-content {
                            align-items: flex-start;
                        }
                    }

                    &.app-store-btn {
                        .btn-content {
                            align-items: flex-start;
                        }
                    }
                }
            }
        }
    }
}

// Responsive adjustments
@media (max-width: 768px) {
    .mobile-apps-page {
        padding: $padding-sm;

        .mobile-apps-container {
            .mobile-app-card {
                padding: $padding-md;

                .app-download-buttons {
                    flex-direction: column;

                    .download-btn {
                        width: 100%;
                    }
                }
            }
        }
    }
}
</style>

