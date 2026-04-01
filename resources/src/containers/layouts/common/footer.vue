<!-- <template>
    <div class="footer_wrap">
        <!-- Footer Start -->
        <div class="flex-grow-1"></div>
        <footer class="app-footer">
            <!-- Main Footer Content -->
            <div class="footer-main">
                <div class="container">
                    <div class="row">
                        <!-- Admin Portal Info -->
                        <div class="col-lg-4 col-md-6 mb-4">
                            <div class="footer-section">
                                <div class="footer-logo-section">
                                    <img
                                        class="footer-logo"
                                        :src="'/images/tf.png'"
                                        alt="Admin Portal Logo"
                                    />
                                    <h3 class="company-name">Thor Strength Fitness</h3>
                                </div>
                                <p class="company-description">
                                    Empowering individuals to achieve their fitness goals through personalized training, 
                                    expert guidance, and cutting-edge facilities. Your journey to a healthier lifestyle starts here.
                                </p>
                                <div class="admin-stats">
                                    <div class="stat-item">
                                        <i class="fas fa-users stat-icon"></i>
                                        <span class="stat-text">Active Members</span>
                                    </div>
                                    <div class="stat-item">
                                        <i class="fas fa-dumbbell stat-icon"></i>
                                        <span class="stat-text">Trainers</span>
                                    </div>
                                    <div class="stat-item">
                                        <i class="fas fa-calendar-check stat-icon"></i>
                                        <span class="stat-text">Classes Today</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Admin Navigation -->
                        <div class="col-lg-2 col-md-6 mb-4">
                            <div class="footer-section">
                                <h4 class="footer-title">Admin Panel</h4>
                                <ul class="footer-links">
                                    <li><a href="#" class="footer-link">Dashboard</a></li>
                                    <li><a href="#" class="footer-link">Members</a></li>
                                    <li><a href="#" class="footer-link">Trainers</a></li>
                                    <li><a href="#" class="footer-link">Challenges</a></li>
                                    <li><a href="#" class="footer-link">Reports</a></li>
                                </ul>
                            </div>
                        </div>

                        <!-- Management Tools -->
                        <div class="col-lg-2 col-md-6 mb-4">
                            <div class="footer-section">
                                <h4 class="footer-title">Management</h4>
                                <ul class="footer-links">
                                    <li><a href="#" class="footer-link">Billing</a></li>
                                    <li><a href="#" class="footer-link">Schedules</a></li>
                                    <li><a href="#" class="footer-link">Equipment</a></li>
                                    <li><a href="#" class="footer-link">Maintenance</a></li>
                                    <li><a href="#" class="footer-link">Settings</a></li>
                                </ul>
                            </div>
                        </div>

                        <!-- System Info -->
                        <div class="col-lg-4 col-md-6 mb-4">
                            <div class="footer-section">
                                <h4 class="footer-title">System Information</h4>
                                <div class="system-info">
                                    <div class="info-item">
                                        <i class="fas fa-server info-icon"></i>
                                        <div>
                                            <p class="info-label">Server Status</p>
                                            <p class="info-value">Online</p>
                                        </div>
                                    </div>
                                    <div class="info-item">
                                        <i class="fas fa-clock info-icon"></i>
                                        <div>
                                            <p class="info-label">Last Backup</p>
                                            <p class="info-value">2 hours ago</p>
                                        </div>
                                    </div>
                                    <div class="info-item">
                                        <i class="fas fa-shield-alt info-icon"></i>
                                        <div>
                                            <p class="info-label">Security</p>
                                            <p class="info-value">SSL Protected</p>
                                        </div>
                                    </div>
                                    <div class="info-item">
                                        <i class="fas fa-code-branch info-icon"></i>
                                        <div>
                                            <p class="info-label">Version</p>
                                            <p class="info-value">v2.1.0</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Footer Bottom -->
            <div class="footer-bottom">
                <div class="container">
                    <div class="footer-bottom-content">
                        <div class="copyright-section">
                            <p class="copyright-text">
                                &copy; {{ new Date().getFullYear() }} Fitness Management System. All rights reserved.
                            </p>
                        </div>
                        <div class="footer-bottom-links">
                            <a href="#" class="bottom-link">Admin Guide</a>
                            <a href="#" class="bottom-link">Support</a>
                            <a href="#" class="bottom-link">API Docs</a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
    data() {
        return {};
    },
    computed: {
        ...mapGetters(["currentUser"]),
    },

    methods: {},
};
</script>

<style lang="scss" scoped>
// Import variables
@import "../../../assets/styles/sass/_variables.scss";

.footer_wrap {
    .app-footer {
        background: #252525;
        color: $color-text;
        position: relative;
        overflow: hidden;

        // Animated background pattern
        &::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: 
                radial-gradient(circle at 20% 80%, rgba($color-button, 0.1) 0%, transparent 50%),
                radial-gradient(circle at 80% 20%, rgba($color-accent, 0.1) 0%, transparent 50%),
                radial-gradient(circle at 40% 40%, rgba($color-info, 0.1) 0%, transparent 50%);
            pointer-events: none;
        }

        // Main Footer Content
        .footer-main {
            padding: 1rem 0 0rem;
            position: relative;
            z-index: 1;

            .container {
                max-width: 1800px;
                margin: 0 auto;
                padding: 0 1rem;
            }

            .footer-section {
                .footer-logo-section {
                    display: flex;
                    align-items: center;
                    margin-bottom: 1.5rem;

                    .footer-logo {
                        width: 60px;
                        height: 60px;
                        border-radius: 12px;
                        box-shadow: 0 8px 25px rgba(0, 0, 0, 0.5);
                        margin-right: 1rem;
                        transition: all 0.3s ease;
                        // background: linear-gradient(135deg, $color-button, $color-button-hover);
                        padding: 8px;

                        &:hover {
                            transform: translateY(-5px) scale(1.05);
                            box-shadow: 0 15px 35px rgba(0, 0, 0, 0.4);
                        }
                    }

                    .company-name {
                        font-family: $font-family-base;
                        font-size: 1.5rem;
                        font-weight: 700;
                        background: linear-gradient(135deg, $color-button, $color-button-hover);
                        -webkit-background-clip: text;
                        -webkit-text-fill-color: transparent;
                        background-clip: text;
                        margin: 0;
                        letter-spacing: -0.5px;
                    }
                }

                .company-description {
                    font-size: 0.95rem;
                    line-height: 1.7;
                    color: rgba($color-text, 0.8);
                    margin-bottom: 2rem;
                    font-weight: 400;
                }

                .admin-stats {
                    display: flex;
                    gap: 1rem;
                    margin-top: 1.5rem;
                    flex-wrap: wrap;

                    .stat-item {
                        display: flex;
                        align-items: center;
                        gap: 0.5rem;
                        padding: 0.5rem 1rem;
                        background: rgba($color-button, 0.1);
                        border-radius: 8px;
                        border: 1px solid rgba($color-button, 0.2);

                        .stat-icon {
                            color: $color-button;
                            font-size: 1rem;
                        }

                        .stat-text {
                            font-size: 0.85rem;
                            color: $color-text;
                            font-weight: 500;
                        }
                    }
                }

                .footer-title {
                    font-family: $font-family-base;
                    font-size: 1.25rem;
                    font-weight: 600;
                    color: $color-text;
                    margin-bottom: 1.5rem;
                    position: relative;
                    padding-bottom: 0.75rem;

                    &::after {
                        content: '';
                        position: absolute;
                        bottom: 0;
                        left: 0;
                        width: 40px;
                        height: 3px;
                        background: linear-gradient(135deg, $color-button, $color-button-hover);
                        border-radius: 2px;
                    }
                }

                .footer-links {
                    list-style: none;
                    padding: 0;
                    margin: 0;

                    li {
                        margin-bottom: 0.75rem;

                        .footer-link {
                            color: rgba($color-text, 0.8);
                            text-decoration: none;
                            font-size: 0.95rem;
                            font-weight: 400;
                            transition: all 0.3s ease;
                            position: relative;
                            padding-left: 0;

                            &::before {
                                content: '→';
                                position: absolute;
                                left: -15px;
                                opacity: 0;
                                transition: all 0.3s ease;
                                color: $color-button;
                            }

                            &:hover {
                                color: $color-button;
                                padding-left: 15px;

                                &::before {
                                    opacity: 1;
                                }
                            }
                        }
                    }
                }

                .system-info {
                    .info-item {
                        display: flex;
                        align-items: flex-start;
                        margin-bottom: 1.25rem;

                        .info-icon {
                            width: 20px;
                            height: 20px;
                            background: linear-gradient(135deg, $color-button, $color-button-hover);
                            border-radius: 50%;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            font-size: 0.8rem;
                            margin-right: 1rem;
                            margin-top: 0.25rem;
                            flex-shrink: 0;
                            color: $color-white;
                        }

                        .info-label {
                            font-size: 0.8rem;
                            color: rgba($color-text, 0.6);
                            margin: 0 0 0.25rem 0;
                            font-weight: 500;
                            text-transform: uppercase;
                            letter-spacing: 0.5px;
                        }

                        .info-value {
                            font-size: 0.95rem;
                            color: rgba($color-text, 0.9);
                            margin: 0;
                            font-weight: 400;
                            line-height: 1.4;
                        }
                    }
                }
            }
        }

        // Footer Bottom
        .footer-bottom {
            background: rgba(0, 0, 0, 0.5);
            border-top: 1px solid rgba($color-text, 0.1);
            padding: 1.5rem 0;
            position: relative;
            z-index: 1;

            .footer-bottom-content {
                display: flex;
                justify-content: space-between;
                align-items: center;
                flex-wrap: wrap;
                gap: 1rem;

                .copyright-section {
                    .copyright-text {
                        font-size: 0.9rem;
                        color: rgba($color-text, 0.7);
                        margin: 0;
                        font-weight: 400;
                    }
                }

                .footer-bottom-links {
                    display: flex;
                    gap: 2rem;

                    .bottom-link {
                        color: rgba($color-text, 0.7);
                        text-decoration: none;
                        font-size: 0.85rem;
                        font-weight: 400;
                        transition: all 0.3s ease;
                        position: relative;

                        &::after {
                            content: '';
                            position: absolute;
                            bottom: -2px;
                            left: 0;
                            width: 0;
                            height: 1px;
                            background: linear-gradient(135deg, $color-button, $color-button-hover);
                            transition: width 0.3s ease;
                        }

                        &:hover {
                            color: $color-button;

                            &::after {
                                width: 100%;
                            }
                        }
                    }
                }
            }
        }

        // Responsive Design
        @media (max-width: 992px) {
            .footer-main {
                padding: 3rem 0 1.5rem;

                .footer-section {
                    .footer-logo-section {
                        .company-name {
                            font-size: 1.25rem;
                        }
                    }
                }
            }
        }

        @media (max-width: 768px) {
            .footer-main {
                padding: 2rem 0 1rem;

                .footer-section {
                    .footer-logo-section {
                        .footer-logo {
                            width: 50px;
                            height: 50px;
                        }

                        .company-name {
                            font-size: 1.1rem;
                        }
                    }

                    .footer-title {
                        font-size: 1.1rem;
                    }

                    .admin-stats {
                        .stat-item {
                            padding: 0.4rem 0.8rem;
                            
                            .stat-text {
                                font-size: 0.8rem;
                            }
                        }
                    }
                }
            }

            .footer-bottom {
                .footer-bottom-content {
                    flex-direction: column;
                    text-align: center;

                    .footer-bottom-links {
                        gap: 1rem;
                    }
                }
            }
        }

        @media (max-width: 576px) {
            .footer-main {
                .footer-section {
                    .company-description {
                        font-size: 0.9rem;
                    }

                    .footer-links {
                        li {
                            .footer-link {
                                font-size: 0.9rem;
                            }
                        }
                    }

                    .system-info {
                        .info-item {
                            .info-value {
                                font-size: 0.9rem;
                            }
                        }
                    }
                }
            }

            .footer-bottom {
                .footer-bottom-content {
                    .copyright-section {
                        .copyright-text {
                            font-size: 0.8rem;
                        }
                    }

                    .footer-bottom-links {
                        .bottom-link {
                            font-size: 0.8rem;
                        }
                    }
                }
            }
        }

        // Smooth animations
        .footer-section {
            animation: fadeInUp 0.6s ease-out;
        }

        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
    }
}
</style> -->