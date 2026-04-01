<template>
    <b-modal
        :visible="visible"
        size="xl"
        :title="video ? video.name : 'Video Player'"
        centered
        hide-footer
        class="video-player-modal"
        @hide="$emit('close')"
    >
        <div v-if="video" class="video-player-container">
            <div v-if="isLoading && !video.url" class="text-center py-4">
                <div class="spinner-border text-primary" role="status">
                    <span class="sr-only">Loading...</span>
                </div>
                <p class="mt-2">Loading video...</p>
            </div>
            
            <!-- Always render video element when we have a URL -->
            <video
                v-if="video.url"
                :key="video.url"
                :src="video.url"
                controls
                class="w-100 rounded"
                style="max-height: 500px"
                @loadstart="onVideoLoadStart"
                @canplay="onVideoCanPlay"
                @error="handleVideoError"
                @loadeddata="onVideoLoaded"
            ></video>
            
            <div v-if="error" class="text-center py-4">
                <i class="fas fa-exclamation-triangle text-warning" style="font-size: 2rem"></i>
                <p class="mt-2">{{ error }}</p>
            </div>
            
            <div v-if="!video.url" class="text-center py-4">
                <p class="text-warning">No video URL available</p>
            </div>
            <div class="mt-3">
                <h6>{{ video.name }}</h6>
                <small class="text-muted">{{ formatFileSize(video.size) }}</small>
            </div>
        </div>
    </b-modal>
</template>

<script>
export default {
    name: 'VideoPlayerModal',
    props: {
        visible: {
            type: Boolean,
            default: false
        },
        video: {
            type: Object,
            default: null
        }
    },
    data() {
        return {
            isLoading: true,
            error: null
        };
    },
    watch: {
        visible(newVal) {
            if (newVal && this.video) {
                this.isLoading = true;
                this.error = null;
            }
        },
        video() {
            if (this.video) {
                this.isLoading = true;
                this.error = null;
            }
        }
    },
    mounted() {
        if (this.video && this.visible) {
            this.$nextTick(() => {
                this.forceVideoLoad();
            });
        }
    },
    watch: {
        video: {
            handler(newVideo) {
                if (newVideo) {
                    // Reset loading state when video changes
                    this.isLoading = true;
                    this.error = null;
                }
            },
            immediate: true
        },
        visible: {
            handler(isVisible) {
                if (isVisible && this.video) {
                    this.isLoading = true;
                    this.error = null;
                    // Force video element to load
                    this.$nextTick(() => {
                        this.forceVideoLoad();
                    });
                }
            }
        }
    },
    methods: {
        forceVideoLoad() {
            const videoElement = this.$el.querySelector('video');
            if (videoElement) {
                videoElement.src = this.video.url;
                videoElement.load();
            }
        },
        onVideoLoadStart() {
            this.isLoading = true;
            this.error = null;
        },
        onVideoCanPlay() {
            this.isLoading = false;
            this.error = null;
        },
        handleVideoError(event) {
            this.isLoading = false;
            this.error = 'Failed to load video. Please check the file path and try again.';
        },
        onVideoLoaded() {
            this.isLoading = false;
            this.error = null;
        },
        formatFileSize(bytes) {
            if (bytes === 0) return '0 Bytes';
            const k = 1024;
            const sizes = ['Bytes', 'KB', 'MB', 'GB'];
            const i = Math.floor(Math.log(bytes) / Math.log(k));
            return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
        }
    }
};
</script>

<style lang="scss" scoped>
.video-player-modal {
    .modal-content {
        border: none;
        border-radius: 16px;
        box-shadow: 0 10px 15px rgba(0, 0, 0, 0.2);
    }

    .modal-header {
        background: #f5f5f3;
        color: #252525;
        border-bottom: none;
        padding: 1.5rem 2rem;

        .modal-title {
            font-family: "Inter", Arial, sans-serif;
            font-size: 1.5rem;
            font-weight: 600;
            margin: 0;
        }
    }

    .modal-body {
        padding: 2rem;
        background: #f5f5f3;
        color: #252525;
    }

    .video-player-container {
        video {
            border-radius: 8px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
    }
}
</style>
