<template>
    <div class="social-profile-page">
        <div class="page-header">
            <div class="header-content">
                <div class="back-button" @click="goBack">
                    <i class="fas fa-arrow-left"></i>
                    <span>Back to Member Details</span>
                </div>
                <h1 class="page-title">Social Profile</h1>
            </div>
        </div>

        <div class="profile-content">
            <div class="member-info-card">
                <div class="member-avatar">
                    <img :src="profileImageUrl" 
                         :alt="memberData.first_name + ' ' + memberData.last_name" />
                </div>
                <div class="member-details">
                    <h2 class="member-name">{{ memberData.first_name }} {{ memberData.last_name }}</h2>
                    <p class="member-id">Member ID: {{ memberData.member_id }}</p>
                </div>
            </div>

            <div class="social-links-section">
                <div class="section-header">
                    <h3>Social Links</h3>
                    <p class="section-description">Connect with this member on social platforms</p>
                </div>

                <div v-if="socialLinks.length > 0" class="social-links-grid">
                    <div v-for="link in socialLinks" :key="link.id" class="social-link-card">
                        <div class="platform-icon">
                            <i :class="getPlatformIcon(link.platform)"></i>
                        </div>
                        <div class="link-info">
                            <h4 class="platform-name">{{ getPlatformName(link.platform) }}</h4>
                            <a :href="link.url" target="_blank" class="profile-url">{{ link.url }}</a>
                        </div>
                        <div class="link-actions">
                            <button @click="openLink(link.url)" class="btn-visit">
                                <i class="fas fa-external-link-alt"></i>
                                Visit
                            </button>
                        </div>
                    </div>
                </div>

                <div v-else class="no-social-links">
                    <div class="empty-state">
                        <i class="fas fa-share-alt"></i>
                        <h4>No Social Links Available</h4>
                        <p>This member hasn't added any social media profiles yet.</p>
                        <p class="coming-soon">Social profile management will be available soon!</p>
                    </div>
                </div>
            </div>

            <div class="coming-soon-section">
                <div class="info-card">
                    <i class="fas fa-info-circle"></i>
                    <h4>Coming Soon</h4>
                    <p>We're working on adding social profile management features. Soon you'll be able to:</p>
                    <ul>
                        <li>Add and manage social media links</li>
                        <li>Connect with members on various platforms</li>
                        <li>View social activity and engagement</li>
                        <li>Share content and updates</li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "SocialProfile",
    data() {
        return {
            memberData: {
                id: "",
                member_id: "",
                first_name: "",
                last_name: "",
                profile_image: "",
            },
            socialLinks: [], // Placeholder for social links
            isLoading: true,
        };
    },
    mounted() {
        this.loadMemberData();
    },
    computed: {
        /**
         * Get profile image URL with proper handling for different formats
         */
        profileImageUrl() {
            const profileImage = this.memberData.profile_image;
            
            // Return default image if no profile image
            if (!profileImage) {
                return '/images/Default_Profile_Picture.png';
            }

            // Check if it's a base64 data URL (legacy support)
            if (profileImage.startsWith('data:image/')) {
                return profileImage;
            }

            // If it's already a full path (starts with / or http)
            if (profileImage.startsWith('/') || profileImage.startsWith('http')) {
                return profileImage;
            }

            // If it's just a filename, assume it's in the avatar directory
            return '/images/avatar/' + profileImage;
        }
    },
    methods: {
        /**
         * Load member data from the route parameter
         */
        async loadMemberData() {
            try {
                const memberId = this.$route.params.id;
                if (!memberId) {
                    this.showError("Member ID not found");
                    this.goBack();
                    return;
                }

                // Fetch member data (placeholder - will be implemented when backend is ready)
                this.memberData = {
                    id: memberId,
                    member_id: "M" + memberId.padStart(4, '0'),
                    first_name: "John",
                    last_name: "Doe",
                    profile_image: "/images/Default_Profile_Picture.png",
                };

                // Load social links (placeholder)
                this.socialLinks = [];

                this.isLoading = false;
            } catch (error) {
                console.error("Error loading member data:", error);
                this.showError("Failed to load member data");
                this.goBack();
            }
        },

        /**
         * Navigate back to member details
         */
        goBack() {
            this.$router.push(`/app/Members/MemberDetails/${this.$route.params.id}`);
        },

        /**
         * Open social link in new tab
         */
        openLink(url) {
            window.open(url, '_blank');
        },

        /**
         * Get platform icon class
         */
        getPlatformIcon(platform) {
            const iconMap = {
                facebook: 'fab fa-facebook',
                twitter: 'fab fa-twitter',
                instagram: 'fab fa-instagram',
                linkedin: 'fab fa-linkedin',
                youtube: 'fab fa-youtube',
                tiktok: 'fab fa-tiktok',
                snapchat: 'fab fa-snapchat',
                default: 'fas fa-link'
            };
            return iconMap[platform] || iconMap.default;
        },

        /**
         * Get platform display name
         */
        getPlatformName(platform) {
            const nameMap = {
                facebook: 'Facebook',
                twitter: 'Twitter',
                instagram: 'Instagram',
                linkedin: 'LinkedIn',
                youtube: 'YouTube',
                tiktok: 'TikTok',
                snapchat: 'Snapchat',
                default: 'Social Platform'
            };
            return nameMap[platform] || nameMap.default;
        },

        /**
         * Show success message
         */
        showSuccess(message) {
            this.$toast.success(message);
        },

        /**
         * Show error message
         */
        showError(message) {
            this.$toast.error(message);
        },
    },
};
</script>

<style scoped>
.social-profile-page {
    padding: 20px;
    max-width: 1200px;
    margin: 0 auto;
}

.page-header {
    margin-bottom: 30px;
}

.header-content {
    display: flex;
    align-items: center;
    gap: 20px;
}

.back-button {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 10px 15px;
    background: #f8f9fa;
    border: 1px solid #e9ecef;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.3s ease;
}

.back-button:hover {
    background: #e9ecef;
    transform: translateX(-2px);
}

.page-title {
    font-size: 28px;
    font-weight: 600;
    color: #2c3e50;
    margin: 0;
}

.member-info-card {
    display: flex;
    align-items: center;
    gap: 20px;
    padding: 25px;
    background: white;
    border-radius: 12px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    margin-bottom: 30px;
}

.member-avatar img {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    object-fit: cover;
    border: 3px solid #e9ecef;
}

.member-name {
    font-size: 24px;
    font-weight: 600;
    color: #2c3e50;
    margin: 0 0 5px 0;
}

.member-id {
    color: #6c757d;
    margin: 0;
    font-size: 14px;
}

.social-links-section {
    background: white;
    border-radius: 12px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    padding: 25px;
    margin-bottom: 30px;
}

.section-header h3 {
    font-size: 20px;
    font-weight: 600;
    color: #2c3e50;
    margin: 0 0 5px 0;
}

.section-description {
    color: #6c757d;
    margin: 0 0 20px 0;
}

.social-links-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 20px;
}

.social-link-card {
    display: flex;
    align-items: center;
    gap: 15px;
    padding: 20px;
    border: 1px solid #e9ecef;
    border-radius: 8px;
    transition: all 0.3s ease;
}

.social-link-card:hover {
    border-color: #007bff;
    box-shadow: 0 2px 8px rgba(0, 123, 255, 0.1);
}

.platform-icon {
    width: 50px;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #f8f9fa;
    border-radius: 50%;
    font-size: 20px;
    color: #007bff;
}

.link-info {
    flex: 1;
}

.platform-name {
    font-size: 16px;
    font-weight: 600;
    color: #2c3e50;
    margin: 0 0 5px 0;
}

.profile-url {
    color: #007bff;
    text-decoration: none;
    font-size: 14px;
    word-break: break-all;
}

.profile-url:hover {
    text-decoration: underline;
}

.btn-visit {
    display: flex;
    align-items: center;
    gap: 5px;
    padding: 8px 12px;
    background: #007bff;
    color: white;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    font-size: 14px;
    transition: background 0.3s ease;
}

.btn-visit:hover {
    background: #0056b3;
}

.no-social-links {
    text-align: center;
    padding: 40px 20px;
}

.empty-state i {
    font-size: 48px;
    color: #6c757d;
    margin-bottom: 20px;
}

.empty-state h4 {
    font-size: 20px;
    color: #2c3e50;
    margin: 0 0 10px 0;
}

.empty-state p {
    color: #6c757d;
    margin: 0 0 10px 0;
}

.coming-soon {
    font-weight: 600;
    color: #007bff;
}

.coming-soon-section {
    background: white;
    border-radius: 12px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    padding: 25px;
}

.info-card {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
}

.info-card i {
    font-size: 32px;
    color: #007bff;
    margin-bottom: 15px;
}

.info-card h4 {
    font-size: 18px;
    color: #2c3e50;
    margin: 0 0 15px 0;
}

.info-card p {
    color: #6c757d;
    margin: 0 0 15px 0;
}

.info-card ul {
    text-align: left;
    color: #6c757d;
    margin: 0;
    padding-left: 20px;
}

.info-card li {
    margin-bottom: 5px;
}

@media (max-width: 768px) {
    .social-profile-page {
        padding: 15px;
    }
    
    .member-info-card {
        flex-direction: column;
        text-align: center;
    }
    
    .social-links-grid {
        grid-template-columns: 1fr;
    }
    
    .social-link-card {
        flex-direction: column;
        text-align: center;
    }
}
</style>
