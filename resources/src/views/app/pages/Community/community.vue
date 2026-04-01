<template>
    <div class="community-page">
        <!-- Top Navigation Bar -->
        <!-- <nav class="top-nav">
            <div class="nav-container">
                <div class="nav-tabs">
                    <button class="nav-tab active" @click="setActiveTab('start')">
                        <span>Start</span>
                    </button>
                    <button class="nav-tab" @click="setActiveTab('leaderboard')">
                        <span>Leaderboard</span>
                    </button>
                    <button class="nav-tab" @click="setActiveTab('challenges')">
                        <span>Challenges</span>
                    </button>
                    <button class="nav-tab" @click="setActiveTab('groups')">
                        <span>Groups</span>
                    </button>
                    <button class="nav-tab" @click="setActiveTab('members')">
                        <span>Members</span>
                    </button>
                    <button class="nav-tab" @click="setActiveTab('contact')">
                        <span>Contact</span>
                    </button>
                </div>
            </div>
        </nav> -->

        <!-- Group Header/Banner Section -->
        <div class="group-banner">
            <!-- Cover Photo Area -->
            <div 
                class="cover-photo" 
                ref="coverPhoto" 
                @click="toggleRepositionMode"
                @dragover.prevent="handleDragOver"
                @dragenter.prevent="handleDragEnter"
                @dragleave.prevent="handleDragLeave"
                @drop.prevent="handleCoverPhotoDrop"
                :class="{ 'drag-over': isDragOver }"
            >
                <button class="edit-cover-btn" @click.stop="editCoverPhoto" title="Edit cover photo">
                    <i class="fas fa-pencil-alt"></i>
                </button>
                
                <!-- Drag and Drop Overlay -->
                <div v-if="isDragOver" class="drag-overlay">
                    <div class="drag-message">
                        <i class="fas fa-cloud-upload-alt"></i>
                        <p>Drop your cover photo here</p>
                    </div>
                </div>
                
                <!-- Default message when no cover photo -->
                <div v-if="!hasCoverPhoto && !isDragOver" class="no-cover-message">
                    <i class="fas fa-image"></i>
                    <p>Drag & drop a cover photo here</p>
                    <small>or click to upload</small>
                </div>
                
                <!-- Repositioning Controls -->
                <div v-if="isRepositioning" class="reposition-backdrop" @click="cancelReposition">
                    <div class="reposition-controls" @click.stop>
                        <div class="reposition-header">
                            <h4>Reposition Cover Photo</h4>
                            <button class="close-reposition" @click="cancelReposition">
                                <i class="fas fa-times"></i>
                            </button>
                        </div>
                    
                    <div class="reposition-sliders">
                        <div class="slider-group">
                            <label>Vertical Position</label>
                            <input 
                                type="range" 
                                min="0" 
                                max="100" 
                                v-model="coverPosition.y"
                                @input="updateCoverPosition"
                                class="position-slider"
                            />
                            <span class="position-value">{{ coverPosition.y }}%</span>
                        </div>
                        
                        <div class="slider-group">
                            <label>Horizontal Position</label>
                            <input 
                                type="range" 
                                min="0" 
                                max="100" 
                                v-model="coverPosition.x"
                                @input="updateCoverPosition"
                                class="position-slider"
                            />
                            <span class="position-value">{{ coverPosition.x }}%</span>
                        </div>
                        
                        <div class="slider-group">
                            <label>Zoom Level</label>
                            <input 
                                type="range" 
                                min="100" 
                                max="200" 
                                v-model="coverPosition.scale"
                                @input="updateCoverPosition"
                                class="position-slider"
                            />
                            <span class="position-value">{{ coverPosition.scale }}%</span>
                        </div>
                    </div>
                    
                    <div class="reposition-actions">
                        <button class="btn btn-secondary" @click="resetCoverPosition">Reset</button>
                        <button class="btn btn-primary" @click="saveCoverPosition">Save Position</button>
                    </div>
                    </div>
                </div>
                
                <!-- Reposition Button -->
                <button 
                    v-if="hasCoverPhoto && !isRepositioning" 
                    class="reposition-btn" 
                    @click.stop="startRepositioning" 
                    title="Reposition cover photo"
                >
                    <i class="fas fa-arrows-alt"></i>
                </button>
            </div>
            
            <!-- Group Info Section -->
            <div class="group-info-section">
                <div class="group-info">
                    <div class="group-logo">
                        <div class="logo-square">
                            <span class="logo-text">TF</span>
                            <i class="fas fa-bolt logo-bolt"></i>
                        </div>
                    </div>
                    <div class="group-details">
                        <h1 class="group-name">Thorstrengthfitness</h1>
                        <p class="group-description">
                            Check this group for daily updates, promotions and deals to stay in the loop with Thorstrength Fitness!
                        </p>
                        <div class="group-actions">
                            <button class="create-poll-btn" @click="createPoll">
                                <i class="fas fa-list"></i>
                                Create poll
                            </button>
                            <button 
                                class="help-btn" 
                                @click="openVideoTutorialModal"
                                title="Help"
                            >
                                <i class="fas fa-video"></i>
                                <span>Help</span>
                            </button>
                        </div>
                    </div>
                </div>
                <!-- <button class="edit-group-btn" @click="editGroupInfo" title="Edit group information">
                    <i class="fas fa-pencil-alt"></i>
                </button> -->
            </div>
        </div>

        <!-- Main Content Area -->
        <div class="main-content">
            <div class="content-container">
                <!-- Left Column - Activity Feed -->
                <div class="left-column">
                    <!-- Post Input Field -->
                    <div class="post-input-card">
                        <div class="post-input">
                            <div class="user-avatar">
                                <i class="fas fa-user"></i>
                            </div>
                            <div class="post-input-container">
                                <textarea 
                                    ref="postTextarea"
                                    placeholder="Post a new message" 
                                    v-model="newPost"
                                    @keyup.enter.ctrl="createPost"
                                    @focus="expandTextarea"
                                    @input="autoResizeTextarea"
                                    class="post-input-field"
                                    :class="{ 'has-error': validationErrors.content }"
                                    rows="3"
                                    maxlength="5000"
                                ></textarea>
                                <div v-if="validationErrors.content" class="validation-error">
                                    {{ validationErrors.content }}
                                </div>
                                <div class="char-count" v-if="newPost">
                                    {{ newPost.length }}/5000 characters
                                </div>
                                <div class="post-input-actions">
                                    <input 
                                        type="file" 
                                        ref="imageInput"
                                        @change="handleImageSelect"
                                        accept="image/*"
                                        style="display: none"
                                    />
                                    <input 
                                        type="file" 
                                        ref="videoInput"
                                        @change="handleVideoSelect"
                                        accept="video/*"
                                        style="display: none"
                                    />
                                    <button class="action-btn" @click="$refs.imageInput.click()" title="Add Image">
                                        <i class="fas fa-image"></i>
                                    </button>
                                    <button class="action-btn" @click="$refs.videoInput.click()" title="Add Video">
                                        <i class="fas fa-video"></i>
                                    </button>
                                    <button 
                                        class="action-btn" 
                                        @click="createPost" 
                                        :disabled="(!newPost.trim() && !selectedImage && !selectedVideo) || creatingPost"
                                        :title="creatingPost ? 'Creating post...' : 'Post'"
                                    >
                                        <i v-if="creatingPost" class="fas fa-spinner fa-spin"></i>
                                        <i v-else class="fas fa-paper-plane"></i>
                                    </button>
                                </div>
                                <div v-if="selectedImage" class="selected-image-preview">
                                    <img :src="imagePreview" alt="Preview" />
                                    <button class="remove-image-btn" @click="removeImage">
                                        <i class="fas fa-times"></i>
                                    </button>
                                    <div v-if="validationErrors.image" class="validation-error-inline">
                                        {{ validationErrors.image }}
                                    </div>
                                </div>
                                <div v-if="selectedVideo" class="selected-video-preview">
                                    <video :src="videoPreview" controls style="max-width: 100%; max-height: 200px;"></video>
                                    <button class="remove-video-btn" @click="removeVideo">
                                        <i class="fas fa-times"></i>
                                    </button>
                                    <div v-if="validationErrors.video" class="validation-error-inline">
                                        {{ validationErrors.video }}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Posts Feed -->
                    <div class="posts-feed">
                        <div v-for="post in posts" :key="post.id" class="post-card">
                            <div class="post-header">
                                <div class="post-user-info">
                                    <div class="user-avatar">
                                        <i class="fas fa-user"></i>
                                    </div>
                                    <div class="user-details">
                                        <div class="user-name-row">
                                            <div class="user-name">{{ post.author }}</div>
                                            <div class="gym-coach-badge" v-if="post.isStaff">
                                                <i class="fas fa-shield-alt"></i>
                                                <span>GYM COACH</span>
                                            </div>
                                        </div>
                                        <div class="post-time">{{ post.timeAgo }}</div>
                                    </div>
                                </div>
                                <div class="post-actions" v-if="currentUser && (String(post.user_id) === String(currentUser.id) || (post.user && String(post.user.id) === String(currentUser.id)))">
                                    <button class="action-btn" @click="pinPost(post.id)" title="Pin">
                                        <i class="fas fa-thumbtack"></i>
                                    </button>
                                    <button class="action-btn" @click="editPost(post.id)" title="Edit">
                                        <i class="fas fa-edit"></i>
                                    </button>
                                    <button 
                                        class="action-btn" 
                                        @click="deletePost(post.id)" 
                                        :disabled="deletingPosts.has(post.id)"
                                        :title="deletingPosts.has(post.id) ? 'Deleting...' : 'Delete'"
                                    >
                                        <i v-if="deletingPosts.has(post.id)" class="fas fa-spinner fa-spin"></i>
                                        <i v-else class="fas fa-trash"></i>
                                    </button>
                                </div>
                            </div>
                            
                            <div class="post-content">
                                <p>{{ post.content }}</p>
                                <div v-if="post.image_url" class="post-image">
                                    <img :src="post.image_url" :alt="'Post image'" @click="openImageModal(post.image_url)" />
                                </div>
                                <div v-if="post.video_url" class="post-video">
                                    <video :src="post.video_url" controls style="width: 100%; max-width: 500px; max-height: 400px; border-radius: 8px;"></video>
                                </div>
                            </div>
                            
                            <div class="post-interactions">
                                <button class="interaction-btn" @click="toggleLike(post.id)">
                                    <i class="fas fa-heart" :class="{ liked: post.liked }"></i>
                                    <span>{{ post.likes }}</span>
                                </button>
                                <button class="interaction-btn" @click="toggleComments(post.id)">
                                    <i class="fas fa-comment"></i>
                                    <span>{{ post.comments_count || post.comments.length }}</span>
                                </button>
                            </div>

                            <!-- Always Visible Comment Input -->
                            <div v-if="canCommentOnPost(post.id)" class="post-comment-input">
                                <div class="comment-input">
                                    <div class="user-avatar">
                                        <i class="fas fa-user"></i>
                                    </div>
                                    <input 
                                        type="text" 
                                        :placeholder="`Write a comment or add an image...`"
                                        v-model="newComments[post.id]"
                                        @keyup.enter="addComment(post.id)"
                                        class="comment-input-field"
                                    />
                                    <input 
                                        type="file" 
                                        :ref="`commentImageInput_${post.id}`"
                                        @change="handleCommentImageSelect(post.id, $event)"
                                        accept="image/*"
                                        style="display: none"
                                    />
                                    <button 
                                        class="comment-image-btn" 
                                        @click="$refs[`commentImageInput_${post.id}`][0].click()" 
                                        title="Add Image"
                                    >
                                        <i class="fas fa-image"></i>
                                    </button>
                                    <button 
                                        class="comment-post-btn" 
                                        @click="addComment(post.id)"
                                        :disabled="(!newComments[post.id] || !newComments[post.id].trim()) && !commentImages[post.id]"
                                        :title="(!newComments[post.id] || !newComments[post.id].trim()) && !commentImages[post.id] ? 'Add text or image to post' : 'Post comment'"
                                    >
                                        <i class="fas fa-paper-plane"></i>
                                    </button>
                                </div>
                                <div v-if="commentImagePreviews[post.id]" class="comment-image-preview">
                                    <img :src="commentImagePreviews[post.id]" alt="Preview" />
                                    <button class="remove-comment-image-btn" @click="removeCommentImage(post.id)">
                                        <i class="fas fa-times"></i>
                                    </button>
                                </div>
                            </div>
                            <transition name="fade">
                                <div v-if="showCommentLimitMessage[post.id]" class="post-comment-input">
                                    <div class="comment-limit-message">
                                        <i class="fas fa-info-circle"></i>
                                        <span>You have reached the maximum limit of 3 comments per post</span>
                                    </div>
                                </div>
                            </transition>

                            <!-- Comments Section -->
                            <div v-if="post.showComments" class="comments-section">
                                <div v-for="comment in post.comments" :key="comment.id" class="comment">
                                    <div class="comment-user-avatar">
                                        <i class="fas fa-user"></i>
                                    </div>
                                    <div class="comment-content">
                                        <div class="comment-header">
                                            <div class="comment-author">{{ comment.author }}</div>
                                            <div class="comment-actions">
                                                <button 
                                                    class="comment-like-btn" 
                                                    @click="toggleCommentLike(comment.id, post.id)"
                                                    :disabled="likingComments.has(comment.id)"
                                                    :class="{ 'liked': comment.is_liked }"
                                                    title="Like comment"
                                                >
                                                    <i class="fas fa-heart"></i>
                                                    <span>{{ comment.likes_count || 0 }}</span>
                                                </button>
                                                <button 
                                                    v-if="canDeleteComment(comment, post)"
                                                    class="comment-delete-btn" 
                                                    @click="deleteComment(comment.id, post.id)"
                                                    :disabled="deletingComments.has(comment.id)"
                                                    title="Delete comment"
                                                >
                                                    <i v-if="deletingComments.has(comment.id)" class="fas fa-spinner fa-spin"></i>
                                                    <i v-else class="fas fa-trash"></i>
                                                </button>
                                            </div>
                                        </div>
                                        <div class="comment-text">{{ comment.text }}</div>
                                        <div v-if="comment.image_url" class="comment-image">
                                            <img :src="comment.image_url" :alt="'Comment image'" @click="openImageModal(comment.image_url)" />
                                        </div>
                                        <div class="comment-time">{{ comment.timeAgo }}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Right Column - Sidebar -->
                <div class="right-column">
                    <!-- Add Widget Button (Admin Only) -->
                    <div v-if="currentUser && currentUser.role_id === 1" class="add-widget-section">
                        <button class="add-widget-btn" @click="createWidget" title="Add Widget">
                            <i class="fas fa-plus"></i> Add Widget
                        </button>
                    </div>

                    <!-- Dynamic Widgets -->
                    <div v-for="widget in widgets" :key="widget.id" class="widget-container">
                        <!-- Advertisement Widget -->
                        <div v-if="widget.type === 'advertisement'" class="ad-card" @click="editWidget(widget)">
                            <div class="ad-image" :style="getWidgetImageStyle(widget)">
                                <div v-if="!getWidgetImageUrl(widget)" class="ad-placeholder">
                                    <i class="fas fa-image"></i>
                                </div>
                                <div class="ad-overlay">
                                    <p class="ad-text">{{ widget.link_text || widget.title || 'Click here to order yours today!' }}</p>
                                </div>
                                <div v-if="currentUser && (currentUser.role_id === 1)" class="widget-actions-overlay">
                                    <button class="widget-action-btn" @click.stop="editWidget(widget)" title="Edit">
                                        <i class="fas fa-edit"></i>
                                    </button>
                                    <button 
                                        class="widget-action-btn widget-delete-btn" 
                                        @click.stop="deleteWidget(widget.id)" 
                                        :disabled="deletingWidgets.has(widget.id)"
                                        :title="deletingWidgets.has(widget.id) ? 'Deleting...' : 'Delete'"
                                    >
                                        <i v-if="deletingWidgets.has(widget.id)" class="fas fa-spinner fa-spin"></i>
                                        <i v-else class="fas fa-trash"></i>
                                    </button>
                                </div>
                            </div>
                        </div>

                        <!-- Activity Widget -->
                        <div v-if="widget.type === 'activity'" class="activity-card" @click="editWidget(widget)">
                            <div class="widget-header">
                                <h3 class="card-title">{{ widget.title || 'Recent Activity' }}</h3>
                                <div v-if="currentUser && (currentUser.role_id === 1)" class="widget-header-actions">
                                    <button class="widget-edit-btn" @click.stop="editWidget(widget)" title="Edit">
                                        <i class="fas fa-edit"></i>
                                    </button>
                                    <button 
                                        class="widget-delete-btn-header" 
                                        @click.stop="deleteWidget(widget.id)" 
                                        :disabled="deletingWidgets.has(widget.id)"
                                        :title="deletingWidgets.has(widget.id) ? 'Deleting...' : 'Delete'"
                                    >
                                        <i v-if="deletingWidgets.has(widget.id)" class="fas fa-spinner fa-spin"></i>
                                        <i v-else class="fas fa-trash"></i>
                                    </button>
                                </div>
                            </div>
                            <div class="activity-item">
                                <div class="activity-user-avatar">
                                    <i class="fas fa-user"></i>
                                </div>
                                <div class="activity-content">
                                    <div class="activity-text" v-html="widget.content || 'No activity yet'"></div>
                                    <div v-if="getWidgetImageUrl(widget)" class="activity-image">
                                        <img :src="getWidgetImageUrl(widget)" :alt="widget.title || 'Activity image'" @click.stop="openImageModal(getWidgetImageUrl(widget))" />
                                    </div>
                                    <div v-if="widget.metadata && widget.metadata.time" class="activity-time">{{ widget.metadata.time }}</div>
                                    <div v-if="widget.metadata && widget.metadata.quote" class="activity-quote">
                                        "{{ widget.metadata.quote }}"
                                    </div>
                                    <div v-if="widget.metadata && widget.metadata.interactions" class="activity-interactions">
                                        <button class="activity-interaction-btn">
                                            <i class="fas fa-heart"></i>
                                            <span>{{ widget.metadata.interactions.likes || 0 }}</span>
                                        </button>
                                        <button class="activity-interaction-btn">
                                            <i class="fas fa-comment"></i>
                                            <span>{{ widget.metadata.interactions.comments || 0 }}</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Polls Feed -->
                    <div class="polls-feed">
                        <div v-for="poll in polls" :key="poll.id" class="poll-card">
                            <div class="poll-header">
                                <div class="poll-user-info">
                                    <div class="user-avatar">
                                        <i class="fas fa-user"></i>
                                    </div>
                                    <div class="user-details">
                                        <div class="user-name-row">
                                            <div class="user-name">{{ poll.author }}</div>
                                            <div class="gym-coach-badge" v-if="poll.isStaff">
                                                <i class="fas fa-shield-alt"></i>
                                                <span>GYM COACH</span>
                                            </div>
                                        </div>
                                        <div class="poll-time">{{ poll.timeAgo }}</div>
                                    </div>
                                </div>
                                <div class="poll-actions" v-if="currentUser && (String(poll.user_id) === String(currentUser.id) || (poll.user && String(poll.user.id) === String(currentUser.id)))">
                                    <button class="action-btn" @click="editPoll(poll.id)" title="Edit">
                                        <i class="fas fa-edit"></i>
                                    </button>
                                    <button 
                                        class="action-btn" 
                                        @click="deletePoll(poll.id)" 
                                        :disabled="deletingPolls.has(poll.id)"
                                        :title="deletingPolls.has(poll.id) ? 'Deleting...' : 'Delete'"
                                    >
                                        <i v-if="deletingPolls.has(poll.id)" class="fas fa-spinner fa-spin"></i>
                                        <i v-else class="fas fa-trash"></i>
                                    </button>
                                </div>
                            </div>
                            
                            <div class="poll-content">
                                <h3 class="poll-title">{{ poll.title }}</h3>
                                <div class="poll-options">
                                    <div v-for="option in poll.options" :key="option.id" class="poll-option">
                                        <button 
                                            class="poll-option-btn" 
                                            :class="{ 'voted': poll.hasVoted && poll.votedOptionId === option.id }"
                                            @click="voteOnPoll(poll.id, option.id)"
                                            :disabled="poll.hasVoted"
                                        >
                                            <span class="option-text">{{ option.text }}</span>
                                            <span class="option-stats">
                                                <span class="vote-count">{{ option.votes_count }}</span>
                                                <span class="vote-percentage">({{ option.percentage }}%)</span>
                                            </span>
                                        </button>
                                        <div v-if="poll.hasVoted" class="vote-bar">
                                            <div class="vote-progress" :style="{ width: option.percentage + '%' }"></div>
                                        </div>
                                    </div>
                                </div>
                                <div class="poll-footer">
                                    <span class="total-votes">{{ poll.totalVotes }} votes</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Quick Stats Card -->
                    <!-- <div class="stats-card">
                        <h3 class="card-title">Group Stats</h3>
                        <div class="stat-item">
                            <i class="fas fa-users"></i>
                            <span>1,234 Members</span>
                        </div>
                        <div class="stat-item">
                            <i class="fas fa-calendar"></i>
                            <span>Active since 2020</span>
                        </div>
                        <div class="stat-item">
                            <i class="fas fa-trophy"></i>
                            <span>15 Challenges</span>
                        </div>
                    </div> -->
                </div>
            </div>
        </div>

        <!-- Poll Creation Modal -->
        <div v-if="showPollModal" class="poll-modal-overlay" @click="closePollModal">
            <div class="poll-modal" @click.stop>
                <!-- Modal Header -->
                <div class="poll-modal-header">
                    <h3>Create Poll</h3>
                    <button class="poll-modal-close" @click="closePollModal">
                        <i class="fas fa-times"></i>
                    </button>
                </div>

                <!-- Modal Body -->
                <div class="poll-modal-body">
                    <!-- Poll Title -->
                    <div class="poll-form-group">
                        <label for="poll-title">Poll title</label>
                        <input 
                            type="text" 
                            id="poll-title"
                            v-model="pollData.title" 
                            placeholder="Enter poll title..."
                            class="poll-input"
                        />
                    </div>

                    <!-- Poll Options -->
                    <div class="poll-form-group">
                        <label for="poll-option-1">Option 1 (*)</label>
                        <input 
                            type="text" 
                            id="poll-option-1"
                            v-model="pollData.options[0]" 
                            placeholder="Enter option 1..."
                            class="poll-input"
                        />
                    </div>

                    <div class="poll-form-group">
                        <label for="poll-option-2">Option 2 (*)</label>
                        <input 
                            type="text" 
                            id="poll-option-2"
                            v-model="pollData.options[1]" 
                            placeholder="Enter option 2..."
                            class="poll-input"
                        />
                    </div>

                    <div class="poll-form-group">
                        <label for="poll-option-3">Option 3 (optional)</label>
                        <input 
                            type="text" 
                            id="poll-option-3"
                            v-model="pollData.options[2]" 
                            placeholder="Enter option 3..."
                            class="poll-input"
                        />
                    </div>

                    <div class="poll-form-group">
                        <label for="poll-option-4">Option 4 (optional)</label>
                        <input 
                            type="text" 
                            id="poll-option-4"
                            v-model="pollData.options[3]" 
                            placeholder="Enter option 4..."
                            class="poll-input"
                        />
                    </div>

                    <div class="poll-form-group">
                        <label for="poll-option-5">Option 5 (optional)</label>
                        <input 
                            type="text" 
                            id="poll-option-5"
                            v-model="pollData.options[4]" 
                            placeholder="Enter option 5..."
                            class="poll-input"
                        />
                    </div>
                </div>

                <!-- Modal Footer -->
                <div class="poll-modal-footer">
                    <button class="poll-submit-btn" @click="submitPoll">
                        Submit
                    </button>
                </div>
            </div>
        </div>

        <!-- Edit Post Modal -->
        <div v-if="showEditModal" class="edit-post-modal-overlay" @click="cancelEditPost">
            <div class="edit-post-modal" @click.stop>
                <!-- Modal Header -->
                <div class="edit-post-modal-header">
                    <h3>Edit Post</h3>
                    <button class="edit-post-modal-close" @click="cancelEditPost">
                        <i class="fas fa-times"></i>
                    </button>
                </div>

                <!-- Modal Body -->
                <div class="edit-post-modal-body">
                    <div class="edit-post-form-group">
                        <label for="edit-post-content">Post Content</label>
                        <textarea 
                            id="edit-post-content"
                            v-model="editPostContent" 
                            placeholder="Enter post content..."
                            class="edit-post-textarea"
                            rows="6"
                            maxlength="5000"
                        ></textarea>
                        <div class="char-count" v-if="editPostContent">
                            {{ editPostContent.length }}/5000 characters
                        </div>
                    </div>
                </div>

                <!-- Modal Footer -->
                <div class="edit-post-modal-footer">
                    <button class="edit-post-cancel-btn" @click="cancelEditPost">
                        Cancel
                    </button>
                    <button class="edit-post-save-btn" @click="saveEditPost">
                        Save Changes
                    </button>
                </div>
            </div>
        </div>

        <!-- Edit Poll Modal -->
        <div v-if="showEditPollModal" class="edit-poll-modal-overlay" @click="cancelEditPoll">
            <div class="edit-poll-modal" @click.stop>
                <!-- Modal Header -->
                <div class="edit-poll-modal-header">
                    <h3>Edit Poll</h3>
                    <button class="edit-poll-modal-close" @click="cancelEditPoll">
                        <i class="fas fa-times"></i>
                    </button>
                </div>

                <!-- Modal Body -->
                <div class="edit-poll-modal-body">
                    <!-- Poll Title -->
                    <div class="edit-poll-form-group">
                        <label for="edit-poll-title">Poll title</label>
                        <input 
                            type="text" 
                            id="edit-poll-title"
                            v-model="editPollData.title" 
                            placeholder="Enter poll title..."
                            class="edit-poll-input"
                        />
                    </div>

                    <!-- Poll Options -->
                    <div class="edit-poll-form-group">
                        <label for="edit-poll-option-1">Option 1 (*)</label>
                        <input 
                            type="text" 
                            id="edit-poll-option-1"
                            v-model="editPollData.options[0]" 
                            placeholder="Enter option 1..."
                            class="edit-poll-input"
                        />
                    </div>

                    <div class="edit-poll-form-group">
                        <label for="edit-poll-option-2">Option 2 (*)</label>
                        <input 
                            type="text" 
                            id="edit-poll-option-2"
                            v-model="editPollData.options[1]" 
                            placeholder="Enter option 2..."
                            class="edit-poll-input"
                        />
                    </div>

                    <div class="edit-poll-form-group">
                        <label for="edit-poll-option-3">Option 3 (optional)</label>
                        <input 
                            type="text" 
                            id="edit-poll-option-3"
                            v-model="editPollData.options[2]" 
                            placeholder="Enter option 3..."
                            class="edit-poll-input"
                        />
                    </div>

                    <div class="edit-poll-form-group">
                        <label for="edit-poll-option-4">Option 4 (optional)</label>
                        <input 
                            type="text" 
                            id="edit-poll-option-4"
                            v-model="editPollData.options[3]" 
                            placeholder="Enter option 4..."
                            class="edit-poll-input"
                        />
                    </div>

                    <div class="edit-poll-form-group">
                        <label for="edit-poll-option-5">Option 5 (optional)</label>
                        <input 
                            type="text" 
                            id="edit-poll-option-5"
                            v-model="editPollData.options[4]" 
                            placeholder="Enter option 5..."
                            class="edit-poll-input"
                        />
                    </div>
                </div>

                <!-- Modal Footer -->
                <div class="edit-poll-modal-footer">
                    <button class="edit-poll-cancel-btn" @click="cancelEditPoll">
                        Cancel
                    </button>
                    <button class="edit-poll-save-btn" @click="saveEditPoll">
                        Save Changes
                    </button>
                </div>
            </div>
        </div>

        <!-- Widget Edit Modal -->
        <div v-if="showWidgetModal" class="widget-modal-overlay" @click="closeWidgetModal">
            <div class="widget-modal" @click.stop>
                <!-- Modal Header -->
                <div class="widget-modal-header">
                    <h3>{{ editingWidget ? 'Edit Widget' : 'Create Widget' }}</h3>
                    <button class="widget-modal-close" @click="closeWidgetModal">
                        <i class="fas fa-times"></i>
                    </button>
                </div>

                <!-- Modal Body -->
                <div class="widget-modal-body">
                    <!-- Widget Type -->
                    <div class="widget-form-group">
                        <label for="widget-type">Widget Type *</label>
                        <select 
                            id="widget-type"
                            v-model="widgetForm.type" 
                            class="widget-input"
                            :disabled="!!editingWidget"
                        >
                            <option value="advertisement">Advertisement</option>
                            <option value="activity">Activity</option>
                        </select>
                        <div v-if="widgetValidationErrors.type" class="validation-error">
                            {{ widgetValidationErrors.type }}
                        </div>
                    </div>

                    <!-- Title -->
                    <div class="widget-form-group">
                        <label for="widget-title">Title</label>
                        <input 
                            type="text" 
                            id="widget-title"
                            v-model="widgetForm.title" 
                            placeholder="Enter widget title..."
                            class="widget-input"
                        />
                    </div>

                    <!-- Content (for activity widget) -->
                    <div v-if="widgetForm.type === 'activity'" class="widget-form-group">
                        <label for="widget-content">Content *</label>
                        <textarea 
                            id="widget-content"
                            v-model="widgetForm.content" 
                            placeholder="Enter activity content (HTML supported)..."
                            class="widget-textarea"
                            rows="4"
                        ></textarea>
                        <div v-if="widgetValidationErrors.content" class="validation-error">
                            {{ widgetValidationErrors.content }}
                        </div>
                    </div>

                    <!-- Image Upload -->
                    <div class="widget-form-group">
                        <label for="widget-image">Image</label>
                        <input 
                            type="file" 
                            id="widget-image"
                            ref="widgetImageInput"
                            @change="handleWidgetImageSelect"
                            accept="image/*"
                            class="widget-input"
                        />
                        <div v-if="widgetForm.imagePreview" class="widget-image-preview">
                            <img :src="widgetForm.imagePreview" alt="Preview" />
                            <button class="remove-image-btn" @click="removeWidgetImage">
                                <i class="fas fa-times"></i>
                            </button>
                        </div>
                        <div v-if="editingWidget && getWidgetImageUrl(editingWidget) && !widgetForm.imagePreview" class="widget-image-preview">
                            <img :src="getWidgetImageUrl(editingWidget)" alt="Current" />
                        </div>
                    </div>

                    <!-- Link URL (for advertisement widget) -->
                    <div v-if="widgetForm.type === 'advertisement'" class="widget-form-group">
                        <label for="widget-link-url">Link URL</label>
                        <input 
                            type="url" 
                            id="widget-link-url"
                            v-model="widgetForm.link_url" 
                            placeholder="https://example.com"
                            class="widget-input"
                        />
                    </div>

                    <!-- Link Text (for advertisement widget) -->
                    <div v-if="widgetForm.type === 'advertisement'" class="widget-form-group">
                        <label for="widget-link-text">Link Text</label>
                        <input 
                            type="text" 
                            id="widget-link-text"
                            v-model="widgetForm.link_text" 
                            placeholder="Click here to order yours today!"
                            class="widget-input"
                        />
                    </div>

                    <!-- Order -->
                    <div class="widget-form-group">
                        <label for="widget-order">Display Order</label>
                        <input 
                            type="number" 
                            id="widget-order"
                            v-model.number="widgetForm.order" 
                            min="0"
                            class="widget-input"
                        />
                    </div>

                    <!-- Active Status -->
                    <div class="widget-form-group">
                        <label class="widget-checkbox-label">
                            <input 
                                type="checkbox" 
                                v-model="widgetForm.is_active"
                            />
                            <span>Active (visible on page)</span>
                        </label>
                    </div>
                </div>

                <!-- Modal Footer -->
                <div class="widget-modal-footer">
                    <button class="widget-cancel-btn" @click="closeWidgetModal">
                        Cancel
                    </button>
                    <button class="widget-save-btn" @click="saveWidget">
                        {{ editingWidget ? 'Update' : 'Create' }}
                    </button>
                </div>
            </div>
        </div>

        <!-- Video Tutorial Modal -->
        <b-modal
            v-model="showVideoTutorialModal"
            title="Community Tutorial"
            size="lg"
            centered
            hide-footer
            class="video-tutorial-modal"
            @hide="closeVideoTutorialModal"
        >
            <div class="video-container">
                <div v-if="videoError" class="text-center py-4">
                    <i class="fas fa-exclamation-triangle text-warning" style="font-size: 2rem"></i>
                    <p class="mt-2">{{ videoError }}</p>
                </div>
                <div v-else class="position-relative">
                    <div v-if="isVideoLoading" class="video-loading-overlay">
                        <div class="text-center py-4">
                            <div class="spinner-border text-primary" role="status">
                                <span class="sr-only">Loading...</span>
                            </div>
                            <p class="mt-2">Loading video...</p>
                        </div>
                    </div>
                    <video
                        :src="videoTutorialUrl"
                        controls
                        class="w-100 rounded"
                        style="max-height: 500px"
                        @loadstart="onVideoLoadStart"
                        @canplay="onVideoCanPlay"
                        @error="handleVideoError"
                        @loadeddata="onVideoLoaded"
                        @loadedmetadata="onVideoLoaded"
                    >
                        Your browser does not support the video tag.
                    </video>
                </div>
            </div>
        </b-modal>
    </div>
</template>

<script>
import axios from "axios";
export default {
    name: "Community",
    data() {
        return {
            activeTab: 'start',
            newPost: '',
            newComments: {},
            commentImages: {}, // Store comment images per post
            commentImagePreviews: {}, // Store comment image previews per post
            selectedImage: null,
            imagePreview: null,
            selectedVideo: null,
            videoPreview: null,
            likingComments: new Set(), // Track comment likes in progress
            deletingComments: new Set(), // Track comment deletions in progress
            showCommentLimitMessage: {}, // Track which posts are showing limit message
            loading: false,
            currentUser: null,
            posts: [],
            // Cover photo repositioning
            hasCoverPhoto: false,
            currentCoverPhotoUrl: null,
            isRepositioning: false,
            isDragOver: false,
            coverPosition: {
                x: 50, // Horizontal position (0-100%)
                y: 50, // Vertical position (0-100%)
                scale: 100 // Zoom level (100-200%)
            },
            originalCoverPosition: {
                x: 50,
                y: 50,
                scale: 100
            },
            // Loading states for interactions
            likingPosts: new Set(),
            commentingPosts: new Set(),
            deletingPosts: new Set(),
            // Poll modal
            showPollModal: false,
            pollData: {
                title: '',
                options: ['', '', '', '', '']
            },
            // Polls data
            polls: [],
            // Edit post modal
            showEditModal: false,
            editingPost: null,
            editPostContent: '',
            // Edit poll modal
            showEditPollModal: false,
            editingPoll: null,
            editPollData: {
                title: '',
                options: ['', '', '', '', '']
            },
            // Loading states for polls
            deletingPolls: new Set(),
            // Video Tutorial Modal
            showVideoTutorialModal: false,
            isVideoLoading: false,
            videoError: null,
            videoTutorialUrl: '/tutorial_videos/community.mp4',
            // Validation errors
            validationErrors: {},
            // Loading state for post creation
            creatingPost: false,
            // Community widgets
            widgets: [],
            loadingWidgets: false,
            deletingWidgets: new Set(), // Track widget deletions in progress
            // Widget edit modal
            showWidgetModal: false,
            editingWidget: null,
            widgetForm: {
                type: 'advertisement',
                title: '',
                content: '',
                image: null,
                imagePreview: null,
                link_url: '',
                link_text: '',
                is_active: true,
                order: 0,
                metadata: {}
            },
            widgetValidationErrors: {}
        };
    },
    async mounted() {
        await this.loadCurrentUser();
        await this.loadPosts();
        await this.loadPolls();
        await this.loadGroupInfo();
        await this.loadWidgets();
        
        // Add global drag event listeners for better compatibility
        document.addEventListener('dragover', this.handleGlobalDragOver);
        document.addEventListener('drop', this.handleGlobalDrop);
    },
    beforeDestroy() {
        // Remove global drag event listeners
        document.removeEventListener('dragover', this.handleGlobalDragOver);
        document.removeEventListener('drop', this.handleGlobalDrop);
    },
    methods: {
        setActiveTab(tab) {
            this.activeTab = tab;
            // Update active nav tab
            document.querySelectorAll('.nav-tab').forEach(button => {
                button.classList.remove('active');
            });
            event.target.classList.add('active');
            
            // Handle tab content switching
            this.handleTabContent(tab);
        },

        handleTabContent(tab) {
            switch(tab) {
                case 'start':
                    // Show the main community feed (default)
                    break;
                case 'leaderboard':
                    // Navigate to leaderboard page
                    this.$router.push('/app/community/leaderboard');
                    break;
                case 'challenges':
                    this.showInfo('Challenges feature coming soon!');
                    break;
                case 'groups':
                    this.showInfo('Groups feature coming soon!');
                    break;
                case 'members':
                    this.showInfo('Members feature coming soon!');
                    break;
                case 'contact':
                    this.showInfo('Contact feature coming soon!');
                    break;
                default:
                    break;
            }
        },

        

        createPoll() {
            this.showPollModal = true;
        },

        editGroupInfo() {
            // Navigate to edit group information page
            this.$router.push('/app/community/edit-group');
        },

        editCoverPhoto() {
            // Open file selection dialog for cover photo
            const input = document.createElement('input');
            input.type = 'file';
            input.accept = 'image/*';
            input.onchange = async (event) => {
                const file = event.target.files && event.target.files[0];
                if (!file) {
                    return;
                }
                
                // Validate file size (5MB max)
                if (file.size > 5 * 1024 * 1024) {
                    this.showError('File size must be less than 5MB');
                    return;
                }
                
                try {
                    const formData = new FormData();
                    formData.append('cover_photo', file);

                    const response = await axios.post('community/cover-photo', formData, {
                        headers: { 'Content-Type': 'multipart/form-data' }
                    });

                    if (response.data.success) {
                        // Update the cover photo in the UI
                        this.updateCoverPhoto(response.data.data.image_url);
                        this.showSuccess('Cover photo updated successfully!');
                    } else {
                        this.showError(response.data.message || 'Failed to update cover photo');
                    }
                } catch (error) {
                    let errorMessage = 'Failed to update cover photo';
                    
                    if (error.response) {
                        // Handle validation errors
                        if (error.response.status === 422 && error.response.data.errors) {
                            const errors = error.response.data.errors;
                            const firstError = Object.values(errors)[0];
                            errorMessage = Array.isArray(firstError) ? firstError[0] : firstError;
                        } else {
                            errorMessage = error.response.data?.message || errorMessage;
                        }
                    }
                    
                    this.showError(errorMessage);
                }
            };
            input.click();
        },

        updateCoverPhoto(imageUrl) {
            // Clean the URL - remove escaped slashes if present (from JSON)
            let cleanedUrl = imageUrl;
            if (cleanedUrl) {
                cleanedUrl = cleanedUrl.replace(/\\\//g, '/');
                cleanedUrl = cleanedUrl.replace(/['"]/g, '');
            }
            
            // Update the cover photo display
            this.currentCoverPhotoUrl = cleanedUrl;
            this.hasCoverPhoto = true;
            // Use nextTick to ensure DOM is updated
            this.$nextTick(() => {
                this.applyCoverPhotoStyles();
            });
        },

        applyCoverPhotoStyles() {
            try {
                const coverPhotoElement = this.$refs.coverPhoto;
                if (coverPhotoElement && this.currentCoverPhotoUrl) {
                    // Clean the URL - remove escaped slashes if present (from JSON)
                    let imageUrl = this.currentCoverPhotoUrl.replace(/\\\//g, '/');
                    
                    // Remove any existing quotes
                    imageUrl = imageUrl.replace(/['"]/g, '');
                    
                    // Use double quotes in CSS URL to avoid issues with single quotes in URLs
                    coverPhotoElement.style.backgroundImage = `url("${imageUrl}")`;
                    coverPhotoElement.style.backgroundSize = `${this.coverPosition.scale}%`;
                    coverPhotoElement.style.backgroundPosition = `${this.coverPosition.x}% ${this.coverPosition.y}%`;
                    coverPhotoElement.style.backgroundRepeat = 'no-repeat';
                    coverPhotoElement.style.color = 'transparent';
                }
            } catch (error) {
                // Error applying cover photo styles
            }
        },

        // Repositioning methods
        startRepositioning() {
            this.isRepositioning = true;
            this.originalCoverPosition = { ...this.coverPosition };
        },

        cancelReposition() {
            this.isRepositioning = false;
            this.coverPosition = { ...this.originalCoverPosition };
            this.applyCoverPhotoStyles();
        },

        updateCoverPosition() {
            this.applyCoverPhotoStyles();
        },

        resetCoverPosition() {
            this.coverPosition = {
                x: 50,
                y: 50,
                scale: 100
            };
            this.applyCoverPhotoStyles();
        },

        saveCoverPosition() {
            this.isRepositioning = false;
            this.originalCoverPosition = { ...this.coverPosition };
            
            // Save position to backend
            this.saveCoverPositionToBackend();
            
            this.showSuccess('Cover photo position saved!');
        },

        async saveCoverPositionToBackend() {
            try {
                await axios.put('community/cover-position', {
                    x: this.coverPosition.x,
                    y: this.coverPosition.y,
                    scale: this.coverPosition.scale
                });
            } catch (error) {
                // Don't show error to user as this is optional
            }
        },

        toggleRepositionMode() {
            if (this.hasCoverPhoto && !this.isRepositioning) {
                this.startRepositioning();
            }
        },

        // Global drag event handlers
        handleGlobalDragOver(event) {
            event.preventDefault();
        },

        handleGlobalDrop(event) {
            event.preventDefault();
        },

        // Drag and Drop methods
        handleDragOver(event) {
            event.preventDefault();
            event.stopPropagation();
            event.dataTransfer.dropEffect = 'copy';
        },

        handleDragEnter(event) {
            event.preventDefault();
            event.stopPropagation();
            this.isDragOver = true;
        },

        handleDragLeave(event) {
            event.preventDefault();
            event.stopPropagation();
            // Only hide drag overlay if we're actually leaving the drop zone
            if (!event.currentTarget.contains(event.relatedTarget)) {
                this.isDragOver = false;
            }
        },

        handleCoverPhotoDrop(event) {
            event.preventDefault();
            event.stopPropagation();
            this.isDragOver = false;
            
            const files = event.dataTransfer.files;
            if (files && files.length > 0) {
                const file = files[0];
                if (file.type.startsWith('image/')) {
                    this.uploadCoverPhotoFile(file);
                } else {
                    this.showError('Please select a valid image file');
                }
            }
        },

        async uploadCoverPhotoFile(file) {
            // Validate file size (5MB max)
            if (file.size > 5 * 1024 * 1024) {
                this.showError('File size must be less than 5MB');
                return;
            }
            
            try {
                const formData = new FormData();
                formData.append('cover_photo', file);

                const response = await axios.post('community/cover-photo', formData, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                });

                if (response.data.success) {
                    // Update the cover photo in the UI
                    this.coverPosition = {
                        x: parseFloat(response.data.data.position_x),
                        y: parseFloat(response.data.data.position_y),
                        scale: parseFloat(response.data.data.scale)
                    };
                    this.originalCoverPosition = { ...this.coverPosition };
                    this.updateCoverPhoto(response.data.data.image_url);
                    this.showSuccess('Cover photo updated successfully!');
                } else {
                    this.showError(response.data.message || 'Failed to update cover photo');
                }
            } catch (error) {
                let errorMessage = 'Failed to update cover photo';
                
                if (error.response) {
                    // Handle validation errors
                    if (error.response.status === 422 && error.response.data.errors) {
                        const errors = error.response.data.errors;
                        const firstError = Object.values(errors)[0];
                        errorMessage = Array.isArray(firstError) ? firstError[0] : firstError;
                    } else {
                        errorMessage = error.response.data?.message || errorMessage;
                    }
                }
                
                this.showError(errorMessage);
            }
        },

        

        toggleComments(postId) {
            const post = this.posts.find(p => p.id === postId);
            if (post) {
                post.showComments = !post.showComments;
            }
        },


        

        showInfo(message) {
            this.$swal({
                icon: "info",
                title: "Information",
                text: message,
                timer: 3000,
                showConfirmButton: false,
            });
        },
        async loadCurrentUser() {
            try {
                const response = await axios.get('user');
                this.currentUser = response.data;
            } catch (error) {
                // Error loading current user
            }
        },

        async loadGroupInfo() {
            try {
                const response = await axios.get('community/group-info');
                if (response.data.success && response.data.data.cover_photo) {
                    const coverPhoto = response.data.data.cover_photo;
                    if (coverPhoto.image_url) {
                        this.currentCoverPhotoUrl = coverPhoto.image_url;
                        this.hasCoverPhoto = true;
                        this.coverPosition = {
                            x: parseFloat(coverPhoto.position_x) || 50,
                            y: parseFloat(coverPhoto.position_y) || 50,
                            scale: parseFloat(coverPhoto.scale) || 100
                        };
                        this.originalCoverPosition = { ...this.coverPosition };
                        // Use nextTick to ensure DOM is updated
                        this.$nextTick(() => {
                            this.applyCoverPhotoStyles();
                        });
                    }
                }
            } catch (error) {
                // Don't show error to user as cover photo is optional
                // Just log it for debugging
            }
        },

        async loadPosts() {
            this.loading = true;
            try {
                const response = await axios.get('posts');
                this.posts = response.data.data.data.map(post => ({
                    ...post,
                    user_id: post.user_id || post.user?.id, // Preserve user_id for ownership check
                    author: post.user ? (post.user.firstname + ' ' + post.user.lastname) : 'Unknown User',
                    isStaff: post.user ? (post.user.role_id === 1) : false, // Assuming role_id 1 is staff
                    liked: post.is_liked,
                    likes: post.likes_count,
                    image_url: post.image_url, // Ensure image_url is properly mapped
                    video_url: post.video_url, // Ensure video_url is properly mapped
                    comments: (post.comments || []).map(comment => ({
                        ...comment,
                        user_id: comment.user_id || comment.user?.id, // Preserve user_id for ownership check
                        author: comment.user ? (comment.user.firstname + ' ' + comment.user.lastname) : 'Unknown User',
                        text: comment.content,
                        timeAgo: comment.time_ago,
                        image_url: comment.image_url,
                        likes_count: comment.likes_count || 0,
                        is_liked: comment.is_liked || false
                    })),
                    showComments: false
                }));
            } catch (error) {
                this.showError('Failed to load posts');
            } finally {
                this.loading = false;
            }
        },

        async loadPolls() {
            try {
                const response = await axios.get('polls');
                this.polls = response.data.data.data.map(poll => ({
                    ...poll,
                    user_id: poll.user_id || poll.user?.id, // Preserve user_id for ownership check
                    author: poll.user ? (poll.user.firstname + ' ' + poll.user.lastname) : 'Unknown User',
                    isStaff: poll.user ? (poll.user.role_id === 1) : false, // Assuming role_id 1 is staff
                    hasVoted: poll.has_voted || false,
                    votedOptionId: poll.voted_option_id || poll.user_vote?.option_id || null, // Track which option was voted on
                    totalVotes: poll.total_votes || 0,
                    options: poll.options.map(option => ({
                        ...option,
                        percentage: option.vote_percentage || 0
                    }))
                }));
            } catch (error) {
                this.showError('Failed to load polls');
            }
        },

        async voteOnPoll(pollId, optionId) {
            try {
                const response = await axios.post(`polls/${pollId}/vote`, {
                    option_id: optionId
                });
                
                if (response.data.success) {
                    // Update the poll immediately with the voted option ID
                    const poll = this.polls.find(p => p.id === pollId);
                    if (poll) {
                        poll.hasVoted = true;
                        poll.votedOptionId = optionId;
                    }
                    
                    this.showSuccess('Vote recorded successfully!');
                    // Reload polls to show updated results
                    await this.loadPolls();
                } else {
                    this.showError(response.data.message || 'Failed to record vote');
                }
            } catch (error) {
                const errorMessage = error.response?.data?.message || 'Failed to record vote';
                this.showError(errorMessage);
            }
        },

        async createPost() {
            // Client-side validation
            this.validationErrors = {};
            
            // Check if at least one field is provided
            if (!this.newPost.trim() && !this.selectedImage && !this.selectedVideo) {
                this.validationErrors.content = 'Either content, image, or video must be provided.';
                this.showError('Please provide content, an image, or a video.');
                return;
            }

            // Validate content length
            if (this.newPost.trim() && this.newPost.length > 5000) {
                this.validationErrors.content = 'Post content cannot exceed 5000 characters.';
                this.showError('Post content cannot exceed 5000 characters.');
                return;
            }

            // Validate image
            if (this.selectedImage) {
                const maxImageSize = 50 * 1024 * 1024; // 50MB
                const allowedImageTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/gif', 'image/webp'];
                
                if (this.selectedImage.size > maxImageSize) {
                    this.validationErrors.image = 'Image size cannot exceed 50MB.';
                    this.showError('Image size cannot exceed 50MB. Please choose a smaller image.');
                    return;
                }
                
                if (!allowedImageTypes.includes(this.selectedImage.type)) {
                    this.validationErrors.image = 'Image must be one of the following types: jpeg, png, jpg, gif, or webp.';
                    this.showError('Invalid image format. Please choose a jpeg, png, jpg, gif, or webp file.');
                    return;
                }
            }

            // Validate video
            if (this.selectedVideo) {
                const maxVideoSize = 50 * 1024 * 1024; // 50MB
                const allowedVideoTypes = ['video/mp4', 'video/quicktime', 'video/x-msvideo', 'video/webm'];
                
                if (this.selectedVideo.size > maxVideoSize) {
                    this.validationErrors.video = 'Video size cannot exceed 50MB.';
                    this.showError('Video size cannot exceed 50MB. Please choose a smaller video file.');
                    return;
                }
                
                if (!allowedVideoTypes.includes(this.selectedVideo.type)) {
                    this.validationErrors.video = 'Video must be one of the following types: mp4, mov, avi, or webm.';
                    this.showError('Invalid video format. Please choose a mp4, mov, avi, or webm file.');
                    return;
                }
            }

            // Prevent double submission
            if (this.creatingPost) {
                return;
            }

            this.creatingPost = true;
            this.validationErrors = {};

            const formData = new FormData();
            // Only append content if it's not empty
            if (this.newPost.trim()) {
                formData.append('content', this.newPost);
            }
            if (this.selectedImage) {
                formData.append('image', this.selectedImage);
            }
            if (this.selectedVideo) {
                formData.append('video', this.selectedVideo);
            }

            try {
                const response = await axios.post('posts', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });

                const newPost = response.data.data;
                
                // Ensure image_url and video_url are properly set
                // If backend doesn't return them, construct from paths
                const imageUrl = newPost.image_url || (newPost.image_path ? `${window.location.origin}/images/community-uploads/posts/${newPost.image_path}` : null);
                const videoUrl = newPost.video_url || (newPost.video_path ? `${window.location.origin}/images/community-uploads/posts/${newPost.video_path}` : null);
                
                this.posts.unshift({
                    ...newPost,
                    user_id: newPost.user_id || newPost.user?.id, // Preserve user_id for ownership check
                    author: newPost.user ? (newPost.user.firstname + ' ' + newPost.user.lastname) : 'Unknown User',
                    isStaff: newPost.user ? (newPost.user.role_id === 1) : false,
                    liked: false,
                    likes: 0,
                    image_url: imageUrl, // Use computed URL
                    video_url: videoUrl, // Use computed URL
                    comments: [],
                    showComments: false,
                    timeAgo: 'Just now'
                });

                this.newPost = '';
                this.removeImage();
                this.removeVideo();
                this.validationErrors = {};
                this.showSuccess('Post created successfully!');
            } catch (error) {
                // Handle validation errors from backend
                if (error.response && error.response.status === 422) {
                    const errorData = error.response.data;
                    this.validationErrors = errorData.error_details || {};
                    
                    // Show all validation errors
                    const errorMessages = errorData.errors || [errorData.message];
                    if (errorMessages.length > 0) {
                        this.showError(errorMessages.join('\n'));
                    } else {
                        this.showError(errorData.message || 'Validation failed. Please check your input.');
                    }
                } else if (error.response && error.response.status === 401) {
                    this.showError('You are not authorized. Please log in again.');
                } else if (error.response && error.response.status === 500) {
                    this.showError(error.response.data?.message || 'Server error. Please try again later.');
                } else if (error.message === 'Network Error' || !error.response) {
                    this.showError('Network error. Please check your connection and try again.');
                } else {
                    const errorMessage = error.response?.data?.message || 'Failed to create post. Please try again.';
                    this.showError(errorMessage);
                }
            } finally {
                this.creatingPost = false;
            }
        },

        handleImageSelect(event) {
            const file = event.target.files[0];
            if (file) {
                // Clear previous validation errors
                this.validationErrors.image = null;
                
                // Validate file size (50MB max)
                const maxSize = 50 * 1024 * 1024; // 50MB in bytes
                if (file.size > maxSize) {
                    this.validationErrors.image = 'Image size cannot exceed 50MB.';
                    this.showError('Image size cannot exceed 50MB. Please choose a smaller image.');
                    if (this.$refs.imageInput) {
                        this.$refs.imageInput.value = '';
                    }
                    return;
                }

                // Validate file type
                const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/gif', 'image/webp'];
                if (!allowedTypes.includes(file.type)) {
                    this.validationErrors.image = 'Image must be one of the following types: jpeg, png, jpg, gif, or webp.';
                    this.showError('Invalid image format. Please choose a jpeg, png, jpg, gif, or webp file.');
                    if (this.$refs.imageInput) {
                        this.$refs.imageInput.value = '';
                    }
                    return;
                }

                this.selectedImage = file;
                const reader = new FileReader();
                reader.onload = (e) => {
                    this.imagePreview = e.target.result;
                };
                reader.readAsDataURL(file);
            }
        },

        removeImage() {
            this.selectedImage = null;
            this.imagePreview = null;
            this.validationErrors.image = null;
            if (this.$refs.imageInput) {
                this.$refs.imageInput.value = '';
            }
        },

        handleVideoSelect(event) {
            const file = event.target.files[0];
            if (file) {
                // Clear previous validation errors
                this.validationErrors.video = null;
                
                // Validate file size (50MB max)
                const maxSize = 50 * 1024 * 1024; // 50MB in bytes
                if (file.size > maxSize) {
                    this.validationErrors.video = 'Video size cannot exceed 50MB.';
                    this.showError('Video size cannot exceed 50MB. Please choose a smaller video file.');
                    if (this.$refs.videoInput) {
                        this.$refs.videoInput.value = '';
                    }
                    return;
                }

                // Validate file type
                const allowedTypes = ['video/mp4', 'video/quicktime', 'video/x-msvideo', 'video/webm'];
                if (!allowedTypes.includes(file.type)) {
                    this.validationErrors.video = 'Video must be one of the following types: mp4, mov, avi, or webm.';
                    this.showError('Invalid video format. Please choose a mp4, mov, avi, or webm file.');
                    if (this.$refs.videoInput) {
                        this.$refs.videoInput.value = '';
                    }
                    return;
                }

                this.selectedVideo = file;
                const reader = new FileReader();
                reader.onload = (e) => {
                    this.videoPreview = e.target.result;
                };
                reader.readAsDataURL(file);
            }
        },

        removeVideo() {
            this.selectedVideo = null;
            this.videoPreview = null;
            this.validationErrors.video = null;
            if (this.$refs.videoInput) {
                this.$refs.videoInput.value = '';
            }
        },

        expandTextarea() {
            this.$nextTick(() => {
                const textarea = this.$refs.postTextarea;
                if (textarea) {
                    textarea.classList.add('expanded');
                    this.autoResizeTextarea();
                }
            });
        },

        autoResizeTextarea() {
            this.$nextTick(() => {
                const textarea = this.$refs.postTextarea;
                if (textarea) {
                    // Reset height to auto to get the correct scrollHeight
                    textarea.style.height = 'auto';
                    // Set height based on content, with min and max constraints
                    const newHeight = Math.min(Math.max(textarea.scrollHeight, 60), 300);
                    textarea.style.height = newHeight + 'px';
                }
            });
        },

        async toggleLike(postId) {
            const post = this.posts.find(p => p.id === postId);
            if (!post || this.likingPosts.has(postId)) return;

            // Add to loading set
            this.likingPosts.add(postId);

            // Optimistic update for better UX
            const wasLiked = post.liked;
            const oldLikesCount = post.likes;
            
            post.liked = !post.liked;
            post.likes = post.liked ? post.likes + 1 : post.likes - 1;

            try {
                const response = await axios.post(`posts/${postId}/like`);
                
                // Update with actual server response
                post.liked = response.data.liked;
                post.likes = response.data.likes_count;
            } catch (error) {
                // Revert optimistic update on error
                post.liked = wasLiked;
                post.likes = oldLikesCount;
                
                const errorMessage = error.response?.data?.message || 'Failed to update like';
                this.showError(errorMessage);
            } finally {
                // Remove from loading set
                this.likingPosts.delete(postId);
            }
        },

        toggleComments(postId) {
            const post = this.posts.find(p => p.id === postId);
            if (post) {
                post.showComments = !post.showComments;
            }
        },

        async addComment(postId) {
            const post = this.posts.find(p => p.id === postId);
            const commentText = this.newComments[postId] || '';
            const commentImage = this.commentImages[postId];
            
            // Check if at least content or image is provided
            if (!commentText.trim() && !commentImage) {
                return;
            }

            // Check if user can still comment
            if (!this.canCommentOnPost(postId)) {
                // Show limit message for 3 seconds
                this.showCommentLimitMessageForPost(postId);
                return;
            }

            // Prevent double submission
            if (this.commentingPosts.has(postId)) {
                return;
            }

            this.commentingPosts.add(postId);

            try {
                const formData = new FormData();
                if (commentText.trim()) {
                    formData.append('content', commentText);
                }
                if (commentImage) {
                    formData.append('image', commentImage);
                }

                const response = await axios.post(`posts/${postId}/comment`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });

                const newComment = response.data.data;
                post.comments.push({
                    ...newComment,
                    user_id: newComment.user_id || newComment.user?.id, // Preserve user_id for ownership check
                    author: newComment.user ? (newComment.user.firstname + ' ' + newComment.user.lastname) : 'Unknown User',
                    text: newComment.content,
                    timeAgo: newComment.time_ago,
                    image_url: newComment.image_url,
                    likes_count: newComment.likes_count || 0,
                    is_liked: newComment.is_liked || false
                });

                // Update comment count
                post.comments_count = post.comments.length;
                this.newComments[postId] = '';
                this.removeCommentImage(postId);
            } catch (error) {
                const errorMessage = error.response?.data?.message || 'Failed to add comment';
                this.showError(errorMessage);
            } finally {
                this.commentingPosts.delete(postId);
            }
        },

        canCommentOnPost(postId) {
            if (!this.currentUser) return false;
            const post = this.posts.find(p => p.id === postId);
            if (!post) return false;
            
            const userId = this.currentUser.id;
            const userCommentCount = post.comments.filter(c => 
                String(c.user_id) === String(userId) || 
                (c.user && String(c.user.id) === String(userId))
            ).length;
            
            return userCommentCount < 3;
        },

        showCommentLimitMessageForPost(postId) {
            // Show the message
            this.$set(this.showCommentLimitMessage, postId, true);
            
            // Hide after 3 seconds
            setTimeout(() => {
                this.$delete(this.showCommentLimitMessage, postId);
            }, 3000);
        },

        handleCommentImageSelect(postId, event) {
            const file = event.target.files[0];
            if (file) {
                // Validate file size (5MB max)
                if (file.size > 5 * 1024 * 1024) {
                    this.showError('Image size cannot exceed 5MB');
                    return;
                }
                
                // Validate file type
                const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/gif', 'image/webp'];
                if (!allowedTypes.includes(file.type)) {
                    this.showError('Invalid image format. Please choose a jpeg, png, jpg, gif, or webp file.');
                    return;
                }
                
                this.$set(this.commentImages, postId, file);
                
                // Create preview
                const reader = new FileReader();
                reader.onload = (e) => {
                    this.$set(this.commentImagePreviews, postId, e.target.result);
                };
                reader.readAsDataURL(file);
            }
        },

        removeCommentImage(postId) {
            this.$delete(this.commentImages, postId);
            this.$delete(this.commentImagePreviews, postId);
            // Reset file input
            const input = this.$refs[`commentImageInput_${postId}`];
            if (input && input[0]) {
                input[0].value = '';
            }
        },

        async toggleCommentLike(commentId, postId) {
            const post = this.posts.find(p => p.id === postId);
            if (!post) return;
            
            const comment = post.comments.find(c => c.id === commentId);
            if (!comment || this.likingComments.has(commentId)) return;

            // Add to loading set
            this.likingComments.add(commentId);

            // Optimistic update
            const wasLiked = comment.is_liked;
            const oldLikesCount = comment.likes_count || 0;
            
            comment.is_liked = !comment.is_liked;
            comment.likes_count = comment.is_liked ? oldLikesCount + 1 : oldLikesCount - 1;

            try {
                const response = await axios.post(`posts/comments/${commentId}/like`);
                
                // Update with actual server response
                comment.is_liked = response.data.liked;
                comment.likes_count = response.data.likes_count;
            } catch (error) {
                // Revert optimistic update on error
                comment.is_liked = wasLiked;
                comment.likes_count = oldLikesCount;
                
                const errorMessage = error.response?.data?.message || 'Failed to update like';
                this.showError(errorMessage);
            } finally {
                // Remove from loading set
                this.likingComments.delete(commentId);
            }
        },

        canDeleteComment(comment, post) {
            if (!this.currentUser) return false;
            const userId = this.currentUser.id;
            const isAdmin = this.currentUser.role_id === 1;
            
            // User can delete if they own the comment or are admin
            const commentUserId = comment.user_id || (comment.user && comment.user.id);
            return String(commentUserId) === String(userId) || isAdmin;
        },

        async deleteComment(commentId, postId) {
            const post = this.posts.find(p => p.id === postId);
            if (!post) return;
            
            const comment = post.comments.find(c => c.id === commentId);
            if (!comment || this.deletingComments.has(commentId)) return;

            // Confirm deletion
            try {
                const result = await this.$swal({
                    title: 'Are you sure?',
                    text: 'You won\'t be able to revert this!',
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#d33',
                    cancelButtonColor: '#3085d6',
                    confirmButtonText: 'Yes, delete it!',
                    cancelButtonText: 'Cancel'
                });

                if (!result.isConfirmed) {
                    return;
                }

                // Add to deleting set
                this.deletingComments.add(commentId);

                try {
                    const response = await axios.delete(`posts/comments/${commentId}`);
                    
                    if (response.data && response.data.success) {
                        // Remove the comment from the list
                        const commentIndex = post.comments.findIndex(c => c.id === commentId);
                        if (commentIndex !== -1) {
                            post.comments.splice(commentIndex, 1);
                        }
                        
                        // Update comment count
                        post.comments_count = post.comments.length;
                        
                        this.showSuccess('Comment deleted successfully!');
                    } else {
                        this.showError(response.data?.message || 'Failed to delete comment');
                    }
                } catch (error) {
                    let errorMessage = 'Failed to delete comment';
                    if (error.response) {
                        if (error.response.status === 403) {
                            errorMessage = 'You are not authorized to delete this comment';
                        } else if (error.response.status === 404) {
                            errorMessage = 'Comment not found';
                        } else {
                            errorMessage = error.response.data?.message || errorMessage;
                        }
                    }
                    
                    this.showError(errorMessage);
                } finally {
                    // Remove from deleting set
                    this.deletingComments.delete(commentId);
                }
            } catch (error) {
                // User cancelled the confirmation dialog
                // Make sure to remove from deleting set even if cancelled
                this.deletingComments.delete(commentId);
            }
        },

        async pinPost(postId) {
            try {
                const response = await axios.post(`posts/${postId}/pin`);
                this.showSuccess(response.data.message);
                await this.loadPosts(); // Reload to update order
            } catch (error) {
                this.showError('Failed to pin post');
            }
        },

        editPost(postId) {
            const post = this.posts.find(p => p.id === postId);
            if (post) {
                this.editingPost = post;
                this.editPostContent = post.content;
                this.showEditModal = true;
            }
        },

        async saveEditPost() {
            // Client-side validation
            if (!this.editPostContent.trim()) {
                this.showError('Post content cannot be empty');
                return;
            }

            if (this.editPostContent.length > 5000) {
                this.showError('Post content cannot exceed 5000 characters.');
                return;
            }

            if (!this.editingPost) {
                return;
            }

            try {
                const formData = new FormData();
                formData.append('content', this.editPostContent);
                
                const response = await axios.put(`posts/${this.editingPost.id}`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });
                
                // Update the post in the list
                const post = this.posts.find(p => p.id === this.editingPost.id);
                if (post) {
                    post.content = this.editPostContent;
                }
                
                this.showSuccess('Post updated successfully!');
                this.closeEditModal();
            } catch (error) {
                // Handle validation errors from backend
                if (error.response && error.response.status === 422) {
                    const errorData = error.response.data;
                    const errorMessages = errorData.errors || [errorData.message];
                    if (errorMessages.length > 0) {
                        this.showError(errorMessages.join('\n'));
                    } else {
                        this.showError(errorData.message || 'Validation failed. Please check your input.');
                    }
                } else if (error.response && error.response.status === 401) {
                    this.showError('You are not authorized. Please log in again.');
                } else if (error.response && error.response.status === 403) {
                    this.showError('You are not authorized to update this post.');
                } else if (error.response && error.response.status === 404) {
                    this.showError('Post not found.');
                } else if (error.response && error.response.status === 500) {
                    this.showError(error.response.data?.message || 'Server error. Please try again later.');
                } else if (error.message === 'Network Error' || !error.response) {
                    this.showError('Network error. Please check your connection and try again.');
                } else {
                    const errorMessage = error.response?.data?.message || 'Failed to update post. Please try again.';
                    this.showError(errorMessage);
                }
            }
        },

        closeEditModal() {
            this.showEditModal = false;
            this.editingPost = null;
            this.editPostContent = '';
        },

        cancelEditPost() {
            this.closeEditModal();
        },

        async deletePost(postId) {
            // Prevent double-clicks
            if (this.deletingPosts.has(postId)) {
                return;
            }

            try {
                const result = await this.$swal({
                    title: 'Are you sure?',
                    text: 'You won\'t be able to revert this!',
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#d33',
                    cancelButtonColor: '#3085d6',
                    confirmButtonText: 'Yes, delete it!',
                    cancelButtonText: 'Cancel'
                });

                if (result.isConfirmed) {
                    // Add to deleting set
                    this.deletingPosts.add(postId);
                    
                    try {
                        // Convert postId to number if it's a string to ensure proper comparison
                        const numericPostId = typeof postId === 'string' ? parseInt(postId, 10) : postId;
                        
                        const response = await axios.delete(`posts/${numericPostId}`);
                        
                        if (response.data && response.data.success) {
                            // Remove the post from the list (handle both string and number IDs)
                            this.posts = this.posts.filter(p => {
                                const pId = typeof p.id === 'string' ? parseInt(p.id, 10) : p.id;
                                return pId !== numericPostId;
                            });
                            
                            this.showSuccess('Post deleted successfully!');
                        } else {
                            this.showError(response.data?.message || 'Failed to delete post');
                        }
                    } catch (error) {
                        let errorMessage = 'Failed to delete post';
                        if (error.response) {
                            if (error.response.status === 403) {
                                errorMessage = 'You are not authorized to delete this post';
                            } else if (error.response.status === 404) {
                                errorMessage = 'Post not found';
                            } else {
                                errorMessage = error.response.data?.message || 
                                             error.response.data?.error || 
                                             `Failed to delete post (${error.response.status})`;
                            }
                        } else if (error.message) {
                            errorMessage = error.message;
                        }
                        
                        this.showError(errorMessage);
                    } finally {
                        // Remove from deleting set
                        this.deletingPosts.delete(postId);
                    }
                }
            } catch (error) {
                // User cancelled the confirmation dialog or SweetAlert error
                // Make sure to remove from deleting set even if cancelled
                this.deletingPosts.delete(postId);
            }
        },

        openImageModal(imageUrl) {
            // You can implement a modal here or use a library like vue-sweetalert2
            window.open(imageUrl, '_blank');
        },

        showError(message) {
            this.$swal({
                icon: "error",
                title: "Error",
                text: message,
                timer: 3000,
                showConfirmButton: false,
            });
        },

        showSuccess(message) {
            this.$swal({
                icon: "success",
                title: "Success!",
                text: message,
                timer: 3000,
                showConfirmButton: false,
            });
        },

        // Poll modal methods
        closePollModal() {
            this.showPollModal = false;
            this.resetPollData();
        },

        // Video tutorial method
        openVideoTutorialModal() {
            this.isVideoLoading = true;
            this.videoError = null;
            this.showVideoTutorialModal = true;
            // Reset video loading state after modal is shown
            this.$nextTick(() => {
                // Video element will trigger load events
            });
        },

        closeVideoTutorialModal() {
            this.showVideoTutorialModal = false;
            this.isVideoLoading = false;
            this.videoError = null;
        },

        onVideoLoadStart() {
            // Video started loading
            this.isVideoLoading = true;
        },

        onVideoCanPlay() {
            // Video can start playing
            this.isVideoLoading = false;
            this.videoError = null;
        },

        onVideoLoaded() {
            // Video metadata and data loaded
            this.isVideoLoading = false;
            this.videoError = null;
        },

        handleVideoError(event) {
            this.isVideoLoading = false;
            this.videoError = 'Failed to load video. Please check if the file exists at: ' + this.videoTutorialUrl;
        },

        resetPollData() {
            this.pollData = {
                title: '',
                options: ['', '', '', '', '']
            };
        },

        async submitPoll() {
            // Validate required fields
            if (!this.pollData.title.trim()) {
                this.showError('Poll title is required');
                return;
            }

            const validOptions = this.pollData.options.filter(option => option.trim() !== '');
            if (validOptions.length < 2) {
                this.showError('At least 2 options are required');
                return;
            }

            try {
                const pollData = {
                    title: this.pollData.title.trim(),
                    options: validOptions.map(option => option.trim())
                };

                const response = await axios.post('polls', pollData);
                
                if (response.data.success) {
                    // Add the new poll to the list immediately
                    const newPoll = response.data.data;
                    this.polls.unshift({
                        ...newPoll,
                        user_id: newPoll.user_id || newPoll.user?.id,
                        author: newPoll.user ? (newPoll.user.firstname + ' ' + newPoll.user.lastname) : 'Unknown User',
                        isStaff: newPoll.user ? (newPoll.user.role_id === 1) : false,
                        hasVoted: false,
                        votedOptionId: null,
                        totalVotes: 0,
                        timeAgo: 'just now',
                        options: newPoll.options.map(option => ({
                            ...option,
                            percentage: 0
                        }))
                    });
                    
                    this.showSuccess('Poll created successfully!');
                    this.closePollModal();
                } else {
                    this.showError(response.data.message || 'Failed to create poll');
                }
            } catch (error) {
                const errorMessage = error.response?.data?.message || 'Failed to create poll';
                this.showError(errorMessage);
            }
        },

        editPoll(pollId) {
            const poll = this.polls.find(p => p.id === pollId);
            if (poll) {
                this.editingPoll = poll;
                this.editPollData = {
                    title: poll.title,
                    options: poll.options.map(opt => opt.text).concat(['', '', '', '']).slice(0, 5)
                };
                this.showEditPollModal = true;
            }
        },

        async saveEditPoll() {
            if (!this.editPollData.title.trim()) {
                this.showError('Poll title is required');
                return;
            }

            if (!this.editingPoll) {
                return;
            }

            const validOptions = this.editPollData.options.filter(option => option.trim() !== '');
            if (validOptions.length < 2) {
                this.showError('At least 2 options are required');
                return;
            }

            try {
                const pollData = {
                    title: this.editPollData.title.trim(),
                    options: validOptions.map(option => option.trim())
                };

                const response = await axios.put(`polls/${this.editingPoll.id}`, pollData);
                
                if (response.data.success) {
                    // Update the poll in the list
                    const pollIndex = this.polls.findIndex(p => p.id === this.editingPoll.id);
                    if (pollIndex !== -1) {
                        const updatedPoll = response.data.data;
                        this.polls.splice(pollIndex, 1, {
                            ...updatedPoll,
                            user_id: updatedPoll.user_id || updatedPoll.user?.id,
                            author: updatedPoll.user ? (updatedPoll.user.firstname + ' ' + updatedPoll.user.lastname) : 'Unknown User',
                            isStaff: updatedPoll.user ? (updatedPoll.user.role_id === 1) : false,
                            hasVoted: updatedPoll.has_voted || false,
                            votedOptionId: updatedPoll.voted_option_id || updatedPoll.user_vote?.option_id || null,
                            totalVotes: updatedPoll.total_votes || 0,
                            options: updatedPoll.options.map(option => ({
                                ...option,
                                percentage: option.vote_percentage || 0
                            }))
                        });
                    }
                    
                    this.showSuccess('Poll updated successfully!');
                    this.closeEditPollModal();
                } else {
                    this.showError(response.data.message || 'Failed to update poll');
                }
            } catch (error) {
                let errorMessage = 'Failed to update poll';
                if (error.response) {
                    if (error.response.status === 422 && error.response.data.errors) {
                        const errors = error.response.data.errors;
                        const firstError = Object.values(errors)[0];
                        errorMessage = Array.isArray(firstError) ? firstError[0] : firstError;
                    } else {
                        errorMessage = error.response.data?.message || errorMessage;
                    }
                }
                this.showError(errorMessage);
            }
        },

        closeEditPollModal() {
            this.showEditPollModal = false;
            this.editingPoll = null;
            this.resetEditPollData();
        },

        cancelEditPoll() {
            this.closeEditPollModal();
        },

        resetEditPollData() {
            this.editPollData = {
                title: '',
                options: ['', '', '', '', '']
            };
        },

        async deletePoll(pollId) {
            // Prevent double-clicks
            if (this.deletingPolls.has(pollId)) {
                return;
            }

            try {
                const result = await this.$swal({
                    title: 'Are you sure?',
                    text: 'You won\'t be able to revert this!',
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#d33',
                    cancelButtonColor: '#3085d6',
                    confirmButtonText: 'Yes, delete it!',
                    cancelButtonText: 'Cancel'
                });

                if (result.isConfirmed) {
                    // Add to deleting set
                    this.deletingPolls.add(pollId);
                    
                    try {
                        const response = await axios.delete(`polls/${pollId}`);
                        
                        if (response.data && response.data.success) {
                            // Remove the poll from the list
                            this.polls = this.polls.filter(p => {
                                const pId = typeof p.id === 'string' ? parseInt(p.id, 10) : p.id;
                                const numericPollId = typeof pollId === 'string' ? parseInt(pollId, 10) : pollId;
                                return pId !== numericPollId;
                            });
                            
                            this.showSuccess('Poll deleted successfully!');
                        } else {
                            this.showError(response.data?.message || 'Failed to delete poll');
                        }
                    } catch (error) {
                        let errorMessage = 'Failed to delete poll';
                        if (error.response) {
                            if (error.response.status === 403) {
                                errorMessage = 'You are not authorized to delete this poll';
                            } else if (error.response.status === 404) {
                                errorMessage = 'Poll not found';
                            } else {
                                errorMessage = error.response.data?.message || 
                                             error.response.data?.error || 
                                             `Failed to delete poll (${error.response.status})`;
                            }
                        } else if (error.message) {
                            errorMessage = error.message;
                        }
                        
                        this.showError(errorMessage);
                    } finally {
                        // Remove from deleting set
                        this.deletingPolls.delete(pollId);
                    }
                }
            } catch (error) {
                // User cancelled the confirmation dialog or SweetAlert error
                // Make sure to remove from deleting set even if cancelled
                this.deletingPolls.delete(pollId);
            }
        },

        // Widget methods
        getWidgetImageUrl(widget) {
            if (!widget) return null;
            if (widget.image_url) {
                return widget.image_url;
            }
            if (widget.image_path) {
                // If image_path starts with 'images/', it's already a full path
                if (widget.image_path.startsWith('images/')) {
                    return `${window.location.origin}/${widget.image_path}`;
                }
                // Otherwise, construct the path
                return `${window.location.origin}/images/community-uploads/widgets/${widget.image_path}`;
            }
            return null;
        },

        getWidgetImageStyle(widget) {
            const imageUrl = this.getWidgetImageUrl(widget);
            if (imageUrl) {
                return {
                    backgroundImage: `url(${imageUrl})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat'
                };
            }
            return {};
        },

        async loadWidgets() {
            this.loadingWidgets = true;
            try {
                const response = await axios.get('community-widgets');
                this.widgets = (response.data.data || []).map(widget => {
                    // Ensure image_url is properly set
                    let imageUrl = widget.image_url;
                    if (!imageUrl && widget.image_path) {
                        // If image_path starts with 'images/', it's already a full path
                        if (widget.image_path.startsWith('images/')) {
                            imageUrl = `${window.location.origin}/${widget.image_path}`;
                        } else {
                            // Otherwise, construct the path
                            imageUrl = `${window.location.origin}/images/community-uploads/widgets/${widget.image_path}`;
                        }
                    }
                    return {
                        ...widget,
                        image_url: imageUrl
                    };
                });
            } catch (error) {
                // Don't show error to user as widgets are optional
            } finally {
                this.loadingWidgets = false;
            }
        },

        editWidget(widget) {
            // Only allow editing for admins
            if (!this.currentUser || this.currentUser.role_id !== 1) {
                return;
            }

            this.editingWidget = widget;
            this.widgetForm = {
                type: widget.type,
                title: widget.title || '',
                content: widget.content || '',
                image: null,
                imagePreview: null,
                link_url: widget.link_url || '',
                link_text: widget.link_text || '',
                is_active: widget.is_active !== undefined ? widget.is_active : true,
                order: widget.order || 0,
                metadata: widget.metadata || {}
            };
            this.widgetValidationErrors = {};
            this.showWidgetModal = true;
        },

        createWidget() {
            if (!this.currentUser || this.currentUser.role_id !== 1) {
                this.showError('Only administrators can create widgets');
                return;
            }

            this.editingWidget = null;
            this.widgetForm = {
                type: 'advertisement',
                title: '',
                content: '',
                image: null,
                imagePreview: null,
                link_url: '',
                link_text: '',
                is_active: true,
                order: 0,
                metadata: {}
            };
            this.widgetValidationErrors = {};
            this.showWidgetModal = true;
        },

        closeWidgetModal() {
            this.showWidgetModal = false;
            this.editingWidget = null;
            this.widgetForm = {
                type: 'advertisement',
                title: '',
                content: '',
                image: null,
                imagePreview: null,
                link_url: '',
                link_text: '',
                is_active: true,
                order: 0,
                metadata: {}
            };
            this.widgetValidationErrors = {};
        },

        handleWidgetImageSelect(event) {
            const file = event.target.files[0];
            if (file) {
                // Validate file size (5MB max)
                const maxSize = 5 * 1024 * 1024;
                if (file.size > maxSize) {
                    this.showError('Image size cannot exceed 5MB');
                    if (this.$refs.widgetImageInput) {
                        this.$refs.widgetImageInput.value = '';
                    }
                    return;
                }

                // Validate file type
                const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/gif', 'image/webp'];
                if (!allowedTypes.includes(file.type)) {
                    this.showError('Invalid image format. Please choose a jpeg, png, jpg, gif, or webp file.');
                    if (this.$refs.widgetImageInput) {
                        this.$refs.widgetImageInput.value = '';
                    }
                    return;
                }

                this.widgetForm.image = file;
                const reader = new FileReader();
                reader.onload = (e) => {
                    this.widgetForm.imagePreview = e.target.result;
                };
                reader.readAsDataURL(file);
            }
        },

        removeWidgetImage() {
            this.widgetForm.image = null;
            this.widgetForm.imagePreview = null;
            if (this.$refs.widgetImageInput) {
                this.$refs.widgetImageInput.value = '';
            }
        },

        async saveWidget() {
            // Validation
            this.widgetValidationErrors = {};

            if (!this.widgetForm.type) {
                this.widgetValidationErrors.type = 'Widget type is required';
                this.showError('Widget type is required');
                return;
            }

            if (this.widgetForm.type === 'activity' && !this.widgetForm.content.trim()) {
                this.widgetValidationErrors.content = 'Content is required for activity widgets';
                this.showError('Content is required for activity widgets');
                return;
            }

            const formData = new FormData();
            formData.append('type', this.widgetForm.type);
            if (this.widgetForm.title) {
                formData.append('title', this.widgetForm.title);
            }
            if (this.widgetForm.content) {
                formData.append('content', this.widgetForm.content);
            }
            if (this.widgetForm.image) {
                formData.append('image', this.widgetForm.image);
            }
            if (this.widgetForm.link_url) {
                formData.append('link_url', this.widgetForm.link_url);
            }
            if (this.widgetForm.link_text) {
                formData.append('link_text', this.widgetForm.link_text);
            }
            formData.append('is_active', this.widgetForm.is_active ? 1 : 0);
            formData.append('order', this.widgetForm.order);

            try {
                let response;
                if (this.editingWidget) {
                    response = await axios.put(`community-widgets/${this.editingWidget.id}`, formData, {
                        headers: { 'Content-Type': 'multipart/form-data' }
                    });
                } else {
                    response = await axios.post('community-widgets', formData, {
                        headers: { 'Content-Type': 'multipart/form-data' }
                    });
                }

                if (response.data.success) {
                    this.showSuccess(this.editingWidget ? 'Widget updated successfully!' : 'Widget created successfully!');
                    await this.loadWidgets();
                    this.closeWidgetModal();
                } else {
                    this.showError(response.data.message || 'Failed to save widget');
                }
            } catch (error) {
                if (error.response && error.response.status === 422) {
                    const errorData = error.response.data;
                    this.widgetValidationErrors = errorData.error_details || {};
                    const errorMessages = errorData.errors || [errorData.message];
                    if (errorMessages.length > 0) {
                        this.showError(errorMessages.join('\n'));
                    }
                } else {
                    const errorMessage = error.response?.data?.message || 'Failed to save widget. Please try again.';
                    this.showError(errorMessage);
                }
            }
        },

        async deleteWidget(widgetId) {
            // Prevent double-clicks
            if (this.deletingWidgets.has(widgetId)) {
                return;
            }

            try {
                const result = await this.$swal({
                    title: 'Are you sure?',
                    text: 'You won\'t be able to revert this!',
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#d33',
                    cancelButtonColor: '#3085d6',
                    confirmButtonText: 'Yes, delete it!',
                    cancelButtonText: 'Cancel'
                });

                if (result.isConfirmed) {
                    // Add to deleting set
                    this.deletingWidgets.add(widgetId);
                    
                    try {
                        const response = await axios.delete(`community-widgets/${widgetId}`);
                        
                        if (response.data && response.data.success) {
                            // Remove the widget from the list
                            this.widgets = this.widgets.filter(w => {
                                const wId = typeof w.id === 'string' ? parseInt(w.id, 10) : w.id;
                                const numericWidgetId = typeof widgetId === 'string' ? parseInt(widgetId, 10) : widgetId;
                                return wId !== numericWidgetId;
                            });
                            
                            this.showSuccess('Widget deleted successfully!');
                        } else {
                            this.showError(response.data?.message || 'Failed to delete widget');
                        }
                    } catch (error) {
                        let errorMessage = 'Failed to delete widget';
                        if (error.response) {
                            if (error.response.status === 403) {
                                errorMessage = 'You are not authorized to delete this widget';
                            } else if (error.response.status === 404) {
                                errorMessage = 'Widget not found';
                            } else {
                                errorMessage = error.response.data?.message || 
                                             error.response.data?.error || 
                                             `Failed to delete widget (${error.response.status})`;
                            }
                        } else if (error.message) {
                            errorMessage = error.message;
                        }
                        
                        this.showError(errorMessage);
                    } finally {
                        // Remove from deleting set
                        this.deletingWidgets.delete(widgetId);
                    }
                }
            } catch (error) {
                // User cancelled the confirmation dialog or SweetAlert error
                // Make sure to remove from deleting set even if cancelled
                this.deletingWidgets.delete(widgetId);
            }
        }
    }
};
</script>

<style scoped>
.community-page {
    min-height: 100vh;
}

/* Top Navigation */
.top-nav {
    position: sticky;
}

.nav-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
}

.nav-tabs {
    display: flex;
}

.nav-tab {
    background: transparent;
    border: none;
    color: #686868;
    font-weight: 500;
    padding: 5px;
    cursor: pointer;
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    position: relative;
    font-size: 12px;
    min-width: 110px;
    justify-content: center;
}

.nav-tab:hover {
    color: #dc3545;
}

.nav-tab:hover::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 2px;
    background: #dc3545;
}

.nav-tab.active {
    color: #dc3545;
}

.nav-tab.active::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 2px;
    background: #dc3545;
}

.nav-tab i {
    font-size: 16px;
}

.nav-tab span {
    font-weight: 500;
}

/* Group Banner */
.group-banner {
    position: relative;
    background: white;
}

.cover-photo {
    height: 200px;
    background: #e9ecef;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #6c757d;
    font-size: 48px;
    transition: all 0.3s ease;
    cursor: pointer;
}

.cover-photo.drag-over {
    background: rgba(220, 53, 69, 0.1);
    border: 3px dashed #dc3545;
    transform: scale(1.02);
}

.drag-overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(220, 53, 69, 0.95);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 10;
    animation: dragOverlayFadeIn 0.2s ease-in-out;
}

@keyframes dragOverlayFadeIn {
    from {
        opacity: 0;
        transform: scale(0.9);
    }
    to {
        opacity: 1;
        transform: scale(1);
    }
}

.drag-message {
    text-align: center;
    color: white;
    animation: dragMessagePulse 1.5s ease-in-out infinite;
}

@keyframes dragMessagePulse {
    0%, 100% {
        transform: scale(1);
    }
    50% {
        transform: scale(1.05);
    }
}

.drag-message i {
    font-size: 48px;
    margin-bottom: 15px;
    display: block;
    animation: dragIconBounce 1s ease-in-out infinite;
}

@keyframes dragIconBounce {
    0%, 100% {
        transform: translateY(0);
    }
    50% {
        transform: translateY(-10px);
    }
}

.no-cover-message {
    text-align: center;
    color: #6c757d;
    pointer-events: none;
}

.no-cover-message i {
    font-size: 48px;
    margin-bottom: 15px;
    display: block;
    opacity: 0.7;
}

.no-cover-message p {
    font-size: 18px;
    font-weight: 500;
    margin: 0 0 5px 0;
}

.no-cover-message small {
    font-size: 14px;
    opacity: 0.8;
}

.drag-message p {
    font-size: 18px;
    font-weight: 600;
    margin: 0;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
}

.edit-cover-btn {
    position: absolute;
    top: 15px;
    right: 15px;
    border: 0px solid #dcdcdc;
    border-radius: 50%;
    width: 35px;
    height: 35px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.3s ease;
    color: #6c757d;
    font-size: 14px;
}

.edit-cover-btn:hover {

    transform: scale(1.1);
}

.group-info-section {
    position: relative;
    padding: 20px;
    max-width: 1200px;
    margin: 0 auto;
}

.group-info {
    display: flex;
    align-items: flex-end;
    gap: 20px;
    position: relative;
}

.edit-group-btn {
    position: absolute;
    top: 20px;
    right: 20px;
    background: white;
    border: 0px solid #dcdcdc;
    border-radius: 50%;
    width: 35px;
    height: 35px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.3s ease;
    color: #6c757d;
    font-size: 14px;
}

.edit-group-btn:hover {
    border-color: #dc3545;
    transform: scale(1.1);
}

.group-logo {
    flex-shrink: 0;
    position: relative;
    z-index: 2;
}

.logo-square {
    width: 80px;
    height: 80px;
    background: #dc3545;
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    box-shadow: 0 4px 12px rgba(255, 64, 64, 0.3);
    border: 4px solid white;
    margin-top: -40px;
}

.logo-text {
    color: white;
    font-size: 24px;
    font-weight: bold;
    margin-right: 5px;
}

.logo-bolt {
    color: white;
    font-size: 16px;
    position: absolute;
    top: 8px;
    right: 8px;
}

.group-details {
    flex: 1;
}

.group-actions {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-top: 10px;
}

.group-name {
    font-size: 32px;
    font-weight: bold;
    color: #252525;
    margin: 0 0 10px 0;
}

.group-description {
    color: #686868;
    font-size: 16px;
    margin: 0 0 15px 0;
    line-height: 1.5;
}

.create-poll-btn {
    background: white;
    color: #252525;
    border: 1px solid #dcdcdc;
    padding: 5px 10px;
    border-radius: 5px;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 5px;
    transition: all 0.3s ease;
}

.create-poll-btn:hover {
    transform: scale(1.1);
}

/* Main Content */
.main-content {
    padding: 20px 0;
}

.content-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
    display: grid;
    grid-template-columns: 2fr 1fr;
    gap: 30px;
}

/* Left Column */
.left-column {
    display: flex;
    flex-direction: column;
    gap: 20px;
}

.post-input-card {
    background: white;
    border-radius: 12px;
    padding: 20px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.post-input {
    display: flex;
    align-items: center;
    gap: 15px;
}

.user-avatar {
    width: 40px;
    height: 40px;
    background: #e9ecef;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #6c757d;
    flex-shrink: 0;
}

.post-input-container {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 10px;
}

.post-input-field {
    width: 100%;
    border: 1px solid #e9ecef;
    border-radius: 12px;
    padding: 12px 20px;
    font-size: 16px;
    outline: none;
    transition: border-color 0.3s ease;
    resize: vertical;
    min-height: 60px;
    font-family: inherit;
}

.post-input-field:focus {
    border-color: #dc3545;
}

.post-input-field.expanded {
    min-height: 100px;
    transition: min-height 0.3s ease;
}

.post-input-field.has-error {
    border-color: #dc3545;
    background-color: #fff5f5;
}

.validation-error {
    color: #dc3545;
    font-size: 12px;
    margin-top: 5px;
    padding: 5px 10px;
    background-color: #fff5f5;
    border-left: 3px solid #dc3545;
    border-radius: 4px;
}

.validation-error-inline {
    color: #dc3545;
    font-size: 12px;
    margin-top: 5px;
    padding: 5px 10px;
    background-color: rgba(220, 53, 69, 0.1);
    border-radius: 4px;
    position: absolute;
    bottom: 10px;
    left: 10px;
    right: 10px;
    z-index: 10;
}

.char-count {
    font-size: 12px;
    color: #6c757d;
    text-align: right;
    margin-top: 5px;
    padding-right: 5px;
}

.post-input-actions {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.post-input-actions .action-btn {
    background: #dc3545;
    color: white;
    border: none;
    border-radius: 8px;
    padding: 8px 12px;
    cursor: pointer;
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    gap: 5px;
}

.post-input-actions .action-btn:hover:not(:disabled) {
    background: #c82333;
    transform: translateY(-1px);
}

.post-input-actions .action-btn:disabled {
    background: #6c757d;
    cursor: not-allowed;
    transform: none;
}

.selected-image-preview {
    position: relative;
    margin-top: 10px;
}

.selected-image-preview img {
    width: 100%;
    max-width: 100px;
    max-height: 100px;
    object-fit: cover;
    border-radius: 8px;
    border: 1px solid #e9ecef;
}

.remove-image-btn {
    position: absolute;
    top: 5px;
    right: 5px;
    background: rgba(220, 53, 69, 0.8);
    color: white;
    border: none;
    border-radius: 50%;
    width: 25px;
    height: 25px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    font-size: 12px;
}

.remove-image-btn:hover {
    background: rgba(220, 53, 69, 1);
}

.selected-video-preview {
    position: relative;
    margin-top: 10px;
}

.selected-video-preview video {
    width: 100%;
    max-width: 100px;
    max-height: 100px;
    object-fit: cover;
    border-radius: 8px;
    border: 1px solid #e9ecef;
}

.remove-video-btn {
    position: absolute;
    top: 5px;
    right: 5px;
    background: rgba(220, 53, 69, 0.8);
    color: white;
    border: none;
    border-radius: 50%;
    width: 25px;
    height: 25px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    font-size: 12px;
}

.remove-video-btn:hover {
    background: rgba(220, 53, 69, 1);
}

.post-video {
    margin-top: 15px;
}

.post-video video {
    width: 100%;
    max-width: 500px;
    max-height: 400px;
    object-fit: cover;
    border-radius: 8px;
    cursor: pointer;
    transition: transform 0.3s ease;
}

.post-video video:hover {
    transform: scale(1.02);
}

/* Posts Feed */
.posts-feed {
    display: flex;
    flex-direction: column;
    gap: 20px;
}

.post-card {
    background: white;
    border-radius: 12px;
    padding: 20px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.post-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 15px;
}

.post-user-info {
    display: flex;
    align-items: center;
    gap: 12px;
}

.user-details {
    display: flex;
    flex-direction: column;
    gap: 4px;
}

.user-name-row {
    display: flex;
    flex-direction: row;
    align-items: center;
    flex-wrap: wrap;
    gap: 6px;
}

.user-name {
    font-weight: 600;
    color: #2c3e50;
    font-size: 16px;
}

.user-badge {
    background: #dc3545;
    color: white;
    font-size: 12px;
    padding: 2px 8px;
    border-radius: 12px;
    font-weight: 500;
}

.gym-coach-badge {
    display: flex;
    flex-direction: row;
    align-items: center;
    background: #1877F2;
    color: white;
    font-size: 9px;
    font-weight: 700;
    padding: 2px 6px;
    border-radius: 4px;
    letter-spacing: 0.5px;
    gap: 3px;
}

.gym-coach-badge i {
    font-size: 11px;
}

.post-time {
    color: #6c757d;
    font-size: 14px;
}

.post-actions {
    display: flex;
    gap: 8px;
}

.action-btn {
    background: none;
    border: none;
    color: #6c757d;
    cursor: pointer;
    padding: 5px;
    border-radius: 4px;
    transition: all 0.3s ease;
}

.action-btn:hover:not(:disabled) {
    background: #f8f9fa;
    color: #dc3545;
}

.action-btn:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    pointer-events: none;
}


.post-content {
    color: #2c3e50;
    font-size: 16px;
    line-height: 1.5;
    margin-bottom: 15px;
}

.post-content p {
    margin: 0 0 10px 0;
}

.post-image {
    margin-top: 15px;
}

.post-image img {
    width: 100%;
    max-width: 500px;
    max-height: 400px;
    object-fit: cover;
    border-radius: 8px;
    cursor: pointer;
    transition: transform 0.3s ease;
}

.post-image img:hover {
    transform: scale(1.02);
}

.post-interactions {
    display: flex;
    gap: 20px;
    padding-top: 15px;
    border-top: 1px solid #f8f9fa;
}

.interaction-btn {
    background: none;
    border: none;
    color: #6c757d;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 8px 12px;
    border-radius: 20px;
    transition: all 0.3s ease;
}

.interaction-btn:hover {
    background: #f8f9fa;
    color: #dc3545;
}

.interaction-btn .fa-heart.liked {
    color: #dc3545;
    animation: heartBeat 0.6s ease-in-out;
}

@keyframes heartBeat {
    0% { transform: scale(1); }
    25% { transform: scale(1.2); }
    50% { transform: scale(1); }
    75% { transform: scale(1.1); }
    100% { transform: scale(1); }
}

.interaction-btn .fa-comment {
    transition: all 0.3s ease;
}

.interaction-btn:hover .fa-comment {
    transform: scale(1.1);
    color: #dc3545;
}

.interaction-btn:active .fa-heart {
    transform: scale(0.9);
}

.interaction-btn:active .fa-comment {
    transform: scale(0.9);
}

/* Post Comment Input */
.post-comment-input {
    margin-top: 15px;
    padding-top: 15px;
    border-top: 1px solid #f8f9fa;
}

.post-comment-input .comment-input {
    display: flex;
    align-items: center;
    gap: 10px;
}

.post-comment-input .comment-input-field {
    flex: 1;
    border: 1px solid #e9ecef;
    border-radius: 20px;
    padding: 8px 15px;
    font-size: 14px;
    outline: none;
    transition: border-color 0.3s ease;
    background: #f8f9fa;
}

.post-comment-input .comment-input-field:focus {
    border-color: #dc3545;
    background: white;
}

.post-comment-input .comment-input-field::placeholder {
    color: #6c757d;
}

.comment-image-btn {
    background: none;
    border: none;
    color: #6c757d;
    cursor: pointer;
    padding: 8px;
    border-radius: 50%;
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    justify-content: center;
}

.comment-image-btn:hover {
    background: #f8f9fa;
    color: #dc3545;
}

.comment-post-btn {
    background: #dc3545;
    border: none;
    color: white;
    cursor: pointer;
    padding: 8px 12px;
    border-radius: 50%;
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    justify-content: center;
    min-width: 36px;
    height: 36px;
}

.comment-post-btn:hover:not(:disabled) {
    background: #c82333;
    transform: translateY(-1px);
    box-shadow: 0 2px 8px rgba(220, 53, 69, 0.3);
}

.comment-post-btn:disabled {
    background: #6c757d;
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
}

.comment-post-btn i {
    font-size: 14px;
}

.comment-image-preview {
    margin-top: 10px;
    position: relative;
    display: inline-block;
}

.comment-image-preview img {
    max-width: 100px;
    max-height: 100px;
    border-radius: 8px;
    object-fit: cover;
}

.remove-comment-image-btn {
    position: absolute;
    top: -8px;
    right: -8px;
    background: #dc3545;
    color: white;
    border: none;
    border-radius: 50%;
    width: 24px;
    height: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    font-size: 12px;
    transition: all 0.3s ease;
}

.remove-comment-image-btn:hover {
    background: #c82333;
    transform: scale(1.1);
}

.comment-limit-message {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 10px 15px;
    background: #fff3cd;
    border: 1px solid #ffc107;
    border-radius: 8px;
    color: #856404;
    font-size: 14px;
}

.comment-limit-message i {
    color: #ffc107;
}

.fade-enter-active, .fade-leave-active {
    transition: opacity 0.3s ease, transform 0.3s ease;
}

.fade-enter, .fade-leave-to {
    opacity: 0;
    transform: translateY(-10px);
}

/* Comments Section */
.comments-section {
    margin-top: 15px;
    padding-top: 15px;
    border-top: 1px solid #f8f9fa;
}

.comment {
    display: flex;
    gap: 12px;
    margin-bottom: 15px;
}

.comment-user-avatar {
    width: 32px;
    height: 32px;
    background: #e9ecef;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #6c757d;
    font-size: 14px;
    flex-shrink: 0;
}

.comment-content {
    flex: 1;
}

.comment-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 4px;
}

.comment-author {
    font-weight: 600;
    color: #2c3e50;
    font-size: 14px;
}

.comment-actions {
    display: flex;
    align-items: center;
    gap: 8px;
}

.comment-like-btn {
    background: none;
    border: none;
    color: #6c757d;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 4px;
    padding: 4px 8px;
    border-radius: 12px;
    transition: all 0.3s ease;
    font-size: 12px;
}

.comment-like-btn:hover:not(:disabled) {
    background: #f8f9fa;
    color: #dc3545;
}

.comment-like-btn.liked {
    color: #dc3545;
}

.comment-like-btn:disabled {
    opacity: 0.5;
    cursor: not-allowed;
}

.comment-like-btn i {
    font-size: 12px;
}

.comment-delete-btn {
    background: none;
    border: none;
    color: #6c757d;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 4px 8px;
    border-radius: 12px;
    transition: all 0.3s ease;
    font-size: 12px;
}

.comment-delete-btn:hover:not(:disabled) {
    background: #f8f9fa;
    color: #dc3545;
}

.comment-delete-btn:disabled {
    opacity: 0.5;
    cursor: not-allowed;
}

.comment-delete-btn i {
    font-size: 12px;
}

.comment-text {
    color: #2c3e50;
    font-size: 14px;
    line-height: 1.4;
    margin-bottom: 4px;
}

.comment-image {
    margin-top: 8px;
    margin-bottom: 4px;
}

.comment-image img {
    max-width: 100px;
    max-height: 100px;
    border-radius: 8px;
    object-fit: cover;
    cursor: pointer;
    transition: transform 0.3s ease;
}

.comment-image img:hover {
    transform: scale(1.02);
}

.comment-time {
    color: #6c757d;
    font-size: 12px;
}

.add-comment {
    margin-top: 10px;
}

.comment-input {
    display: flex;
    align-items: center;
    gap: 10px;
}

.comment-input-field {
    flex: 1;
    border: 1px solid #e9ecef;
    border-radius: 20px;
    padding: 8px 15px;
    font-size: 14px;
    outline: none;
    transition: border-color 0.3s ease;
}

.comment-input-field:focus {
    border-color: #dc3545;
}

.add-comment .comment-image-preview {
    margin-top: 10px;
}

/* Right Column */
.right-column {
    display: flex;
    flex-direction: column;
    gap: 20px;
}

.ad-card, .activity-card, .stats-card {
    background: white;
    border-radius: 12px;
    padding: 20px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.ad-image {
    position: relative;
    border-radius: 8px;
    overflow: hidden;
    height: 200px;
    background: #f8f9fa;
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 200px;
}

.ad-image[style*="background-image"] {
    background-size: cover !important;
    background-position: center !important;
    background-repeat: no-repeat !important;
}

.ad-placeholder {
    color: #6c757d;
    font-size: 48px;
    z-index: 1;
    position: relative;
    pointer-events: none;
}

.ad-overlay {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    background: linear-gradient(transparent, rgba(0, 0, 0, 0.7));
    color: white;
    padding: 20px;
}

.ad-text {
    margin: 0;
    font-weight: 500;
}

.card-title {
    font-size: 18px;
    font-weight: 600;
    color: #2c3e50;
    margin: 0 0 15px 0;
}

.activity-item {
    display: flex;
    gap: 12px;
}

.activity-user-avatar {
    width: 40px;
    height: 40px;
    background: #e9ecef;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #6c757d;
    flex-shrink: 0;
}

.activity-content {
    flex: 1;
}

.activity-text {
    color: #2c3e50;
    font-size: 14px;
    line-height: 1.4;
    margin-bottom: 8px;
}

.activity-image {
    margin-top: 10px;
    margin-bottom: 10px;
}

.activity-image img {
    width: 100%;
    max-width: 100%;
    max-height: 300px;
    object-fit: cover;
    border-radius: 8px;
    cursor: pointer;
    transition: transform 0.3s ease;
    border: 1px solid #e9ecef;
}

.activity-image img:hover {
    transform: scale(1.02);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.activity-time {
    color: #6c757d;
    font-size: 12px;
    margin-bottom: 10px;
}

.activity-quote {
    background: #f8f9fa;
    padding: 10px;
    border-radius: 8px;
    border-left: 3px solid #dc3545;
    color: #2c3e50;
    font-size: 14px;
    font-style: italic;
    margin-bottom: 10px;
}

.activity-interactions {
    display: flex;
    gap: 15px;
}

.activity-interaction-btn {
    background: none;
    border: none;
    color: #6c757d;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 5px;
    font-size: 12px;
    transition: color 0.3s ease;
}

.activity-interaction-btn:hover {
    color: #dc3545;
}

.stats-card .stat-item {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 8px 0;
    color: #2c3e50;
    font-size: 14px;
}

.stats-card .stat-item i {
    color: #dc3545;
    width: 20px;
}

/* Responsive Design */
@media (max-width: 768px) {
    .content-container {
        grid-template-columns: 1fr;
        gap: 20px;
    }
    
    .group-info {
        flex-direction: column;
        align-items: center;
        text-align: center;
    }
    
    .nav-tabs {
        overflow-x: auto;
        flex-wrap: nowrap;
        margin: 5px 0;
    }
    
    .nav-tab {
        min-width: 100px;
        flex-shrink: 0;
        padding: 10px 15px;
        font-size: 13px;
    }
    
    .nav-tab span {
        display: none;
    }
    
    .nav-tab i {
        font-size: 18px;
    }
}

@media (max-width: 480px) {
    .nav-tab {
        min-width: 60px;
        padding: 8px 10px;
    }
    
    .group-name {
        font-size: 24px;
    }
    
    .group-description {
        font-size: 14px;
    }
}

/* Cover Photo Repositioning Styles */
.reposition-btn {
    position: absolute;
    top: 15px;
    left: 15px;
    background: rgba(0, 0, 0, 0.7);
    color: white;
    border: none;
    border-radius: 50%;
    width: 35px;
    height: 35px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.3s ease;
    font-size: 14px;
}

.reposition-btn:hover {
    background: rgba(0, 0, 0, 0.9);
    transform: scale(1.1);
}

.reposition-backdrop {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.7);
    z-index: 999;
    display: flex;
    align-items: center;
    justify-content: center;
    backdrop-filter: blur(5px);
}

.reposition-controls {
    position: relative;
    background: rgba(0, 0, 0, 0.95);
    border-radius: 12px;
    padding: 30px;
    z-index: 1000;
    min-width: 400px;
    max-width: 90vw;
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
    backdrop-filter: blur(10px);
    animation: repositionModalSlideIn 0.3s ease-out;
}

@keyframes repositionModalSlideIn {
    from {
        opacity: 0;
        transform: scale(0.9) translateY(-20px);
    }
    to {
        opacity: 1;
        transform: scale(1) translateY(0);
    }
}

.reposition-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    margin-bottom: 25px;
    padding-bottom: 15px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.2);
}

.reposition-header h4 {
    color: white;
    margin: 0;
    font-size: 20px;
    font-weight: 600;
}

.close-reposition {
    background: rgba(255, 255, 255, 0.1);
    border: none;
    color: white;
    font-size: 18px;
    cursor: pointer;
    padding: 8px;
    border-radius: 50%;
    transition: all 0.3s ease;
    width: 36px;
    height: 36px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.close-reposition:hover {
    background: rgba(255, 255, 255, 0.2);
    transform: scale(1.1);
}

.reposition-sliders {
    width: 100%;
    margin-bottom: 25px;
}

.slider-group {
    margin-bottom: 20px;
}

.slider-group label {
    display: block;
    color: white;
    font-size: 14px;
    margin-bottom: 8px;
    font-weight: 500;
}

.position-slider {
    width: 100%;
    height: 8px;
    border-radius: 4px;
    background: rgba(255, 255, 255, 0.2);
    outline: none;
    -webkit-appearance: none;
    appearance: none;
    transition: all 0.3s ease;
}

.position-slider:hover {
    background: rgba(255, 255, 255, 0.3);
}

.position-slider::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 24px;
    height: 24px;
    border-radius: 50%;
    background: #dc3545;
    cursor: pointer;
    border: 3px solid white;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
    transition: all 0.3s ease;
}

.position-slider::-webkit-slider-thumb:hover {
    transform: scale(1.1);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.4);
}

.position-slider::-moz-range-thumb {
    width: 24px;
    height: 24px;
    border-radius: 50%;
    background: #dc3545;
    cursor: pointer;
    border: 3px solid white;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
}

.position-value {
    color: white;
    font-size: 14px;
    font-weight: 600;
    margin-left: 12px;
    background: rgba(255, 255, 255, 0.1);
    padding: 4px 8px;
    border-radius: 4px;
    min-width: 50px;
    text-align: center;
}

.reposition-actions {
    display: flex;
    gap: 15px;
    width: 100%;
    margin-top: 10px;
}

.reposition-actions .btn {
    flex: 1;
    padding: 12px 24px;
    border: none;
    border-radius: 8px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    font-size: 14px;
}

.reposition-actions .btn-secondary {
    background: rgba(255, 255, 255, 0.1);
    color: white;
    border: 1px solid rgba(255, 255, 255, 0.3);
}

.reposition-actions .btn-secondary:hover {
    background: rgba(255, 255, 255, 0.2);
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(255, 255, 255, 0.1);
}

.reposition-actions .btn-primary {
    background: #dc3545;
    color: white;
}

.reposition-actions .btn-primary:hover {
    background: #c82333;
    transform: translateY(-2px);
    box-shadow: 0 6px 16px rgba(220, 53, 69, 0.4);
}

/* Responsive adjustments for repositioning */
@media (max-width: 768px) {
    .reposition-controls {
        padding: 20px;
        min-width: 320px;
        margin: 20px;
    }
    
    .reposition-header h4 {
        font-size: 18px;
    }
    
    .reposition-sliders {
        margin-bottom: 20px;
    }
    
    .slider-group {
        margin-bottom: 18px;
    }
    
    .reposition-actions {
        gap: 12px;
    }
    
    .reposition-actions .btn {
        padding: 10px 20px;
        font-size: 13px;
    }
}

/* Poll Modal Styles */
.poll-modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
    backdrop-filter: blur(4px);
}

.poll-modal {
    background: white;
    border-radius: 12px;
    width: 90%;
    max-width: 500px;
    max-height: 90vh;
    overflow-y: auto;
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
    animation: pollModalSlideIn 0.3s ease-out;
}

@keyframes pollModalSlideIn {
    from {
        opacity: 0;
        transform: scale(0.9) translateY(-20px);
    }
    to {
        opacity: 1;
        transform: scale(1) translateY(0);
    }
}

.poll-modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px 24px;
    border-bottom: 1px solid #e9ecef;
}

.poll-modal-header h3 {
    margin: 0;
    font-size: 20px;
    font-weight: 600;
    color: #252525;
}

.poll-modal-close {
    background: none;
    border: none;
    font-size: 18px;
    color: #6c757d;
    cursor: pointer;
    padding: 8px;
    border-radius: 50%;
    transition: all 0.2s ease;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
}

.poll-modal-close:hover {
    background: #f8f9fa;
    color: #495057;
}

.poll-modal-body {
    padding: 24px;
}

.poll-form-group {
    margin-bottom: 20px;
}

.poll-form-group label {
    display: block;
    margin-bottom: 8px;
    font-weight: 500;
    color: #495057;
    font-size: 14px;
}

.poll-input {
    width: 100%;
    padding: 12px 16px;
    border: 1px solid #dcdcdc;
    border-radius: 8px;
    font-size: 14px;
    color: #495057;
    background: #f8f9fa;
    transition: all 0.2s ease;
    box-sizing: border-box;
}

.poll-input:focus {
    outline: none;
    border-color: #dc3545;
    background: white;
    box-shadow: 0 0 0 3px rgba(220, 53, 69, 0.1);
}

.poll-input::placeholder {
    color: #adb5bd;
}

.poll-modal-footer {
    padding: 20px 24px;
    border-top: 1px solid #e9ecef;
    display: flex;
    justify-content: flex-start;
}

.poll-submit-btn {
    background: #dc3545;
    color: white;
    border: none;
    padding: 12px 24px;
    border-radius: 8px;
    font-size: 14px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s ease;
}

.poll-submit-btn:hover {
    background: #c82333;
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(220, 53, 69, 0.3);
}

.poll-submit-btn:active {
    transform: translateY(0);
}

/* Responsive adjustments for poll modal */
@media (max-width: 768px) {
    .poll-modal {
        width: 95%;
        margin: 20px;
    }
    
    .poll-modal-header,
    .poll-modal-body,
    .poll-modal-footer {
        padding: 16px 20px;
    }
    
    .poll-modal-header h3 {
        font-size: 18px;
    }
    
    .poll-input {
        padding: 10px 14px;
        font-size: 16px; /* Prevents zoom on iOS */
    }
}

/* Polls Feed Styles */
.polls-feed {
    display: flex;
    flex-direction: column;
    gap: 20px;
}

.poll-card {
    background: white;
    border-radius: 12px;
    padding: 20px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    border: 1px solid #e9ecef;
    transition: all 0.3s ease;
}

.poll-card:hover {
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
    transform: translateY(-2px);
}

.poll-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 16px;
}

.poll-user-info {
    display: flex;
    align-items: center;
    gap: 12px;
}

.poll-content {
    margin-top: 16px;
}

.poll-title {
    font-size: 18px;
    font-weight: 600;
    color: #252525;
    margin: 0 0 20px 0;
    line-height: 1.4;
}

.poll-options {
    display: flex;
    flex-direction: column;
    gap: 12px;
    margin-bottom: 16px;
}

.poll-option {
    position: relative;
}

.poll-option-btn {
    width: 100%;
    background: #f8f9fa;
    border: 2px solid #e9ecef;
    border-radius: 8px;
    padding: 16px;
    text-align: left;
    cursor: pointer;
    transition: all 0.3s ease;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 16px;
    color: #495057;
}

.poll-option-btn:hover:not(:disabled) {
    background: #e9ecef;
    border-color: #dc3545;
    transform: translateY(-1px);
}

.poll-option-btn:disabled {
    cursor: not-allowed;
    opacity: 0.7;
}

.poll-option-btn.voted {
    background: #dc3545;
    color: white;
    border-color: #dc3545;
}

.option-text {
    font-weight: 500;
    flex: 1;
}

.option-stats {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 14px;
    opacity: 0.8;
}

.vote-count {
    font-weight: 600;
}

.vote-percentage {
    font-weight: 500;
}

.vote-bar {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: rgba(255, 255, 255, 0.3);
    border-radius: 0 0 8px 8px;
    overflow: hidden;
}

.vote-progress {
    height: 100%;
    background: rgba(255, 255, 255, 0.8);
    transition: width 0.5s ease;
    border-radius: 0 0 8px 8px;
}

.poll-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-top: 16px;
    border-top: 1px solid #e9ecef;
    font-size: 14px;
    color: #6c757d;
}

.total-votes {
    font-weight: 500;
}

/* Responsive adjustments for polls */
@media (max-width: 768px) {
    .poll-card {
        padding: 16px;
    }
    
    .poll-title {
        font-size: 16px;
    }
    
    .poll-option-btn {
        padding: 12px;
        font-size: 14px;
    }
    
    .option-stats {
        font-size: 12px;
    }
}

/* Poll Actions Styles */
.poll-actions {
    display: flex;
    gap: 8px;
    align-items: center;
}

.poll-actions .action-btn {
    background: transparent;
    border: none;
    color: #6c757d;
    cursor: pointer;
    padding: 6px 10px;
    border-radius: 6px;
    transition: all 0.2s ease;
    font-size: 14px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.poll-actions .action-btn:hover {
    background: #f8f9fa;
    color: #dc3545;
}

.poll-actions .action-btn:disabled {
    opacity: 0.6;
    cursor: not-allowed;
}

.poll-actions .action-btn i {
    font-size: 14px;
}

/* Edit Poll Modal Styles */
.edit-poll-modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1001;
    backdrop-filter: blur(4px);
}

.edit-poll-modal {
    background: white;
    border-radius: 12px;
    width: 90%;
    max-width: 500px;
    max-height: 90vh;
    overflow-y: auto;
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
    animation: editPollModalSlideIn 0.3s ease-out;
}

@keyframes editPollModalSlideIn {
    from {
        opacity: 0;
        transform: scale(0.9) translateY(-20px);
    }
    to {
        opacity: 1;
        transform: scale(1) translateY(0);
    }
}

.edit-poll-modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px 24px;
    border-bottom: 1px solid #e9ecef;
}

.edit-poll-modal-header h3 {
    margin: 0;
    font-size: 20px;
    font-weight: 600;
    color: #252525;
}

.edit-poll-modal-close {
    background: none;
    border: none;
    font-size: 20px;
    color: #6c757d;
    cursor: pointer;
    padding: 4px 8px;
    border-radius: 4px;
    transition: all 0.2s ease;
}

.edit-poll-modal-close:hover {
    background: #f8f9fa;
    color: #dc3545;
}

.edit-poll-modal-body {
    padding: 24px;
}

.edit-poll-form-group {
    margin-bottom: 20px;
}

.edit-poll-form-group label {
    display: block;
    margin-bottom: 8px;
    font-size: 14px;
    font-weight: 500;
    color: #495057;
}

.edit-poll-input {
    width: 100%;
    padding: 12px 16px;
    border: 2px solid #e9ecef;
    border-radius: 8px;
    font-size: 14px;
    color: #252525;
    background: #f8f9fa;
    transition: all 0.2s ease;
    box-sizing: border-box;
}

.edit-poll-input:focus {
    outline: none;
    border-color: #dc3545;
    background: white;
    box-shadow: 0 0 0 3px rgba(220, 53, 69, 0.1);
}

.edit-poll-input::placeholder {
    color: #adb5bd;
}

.edit-poll-modal-footer {
    padding: 20px 24px;
    border-top: 1px solid #e9ecef;
    display: flex;
    justify-content: flex-end;
    gap: 12px;
}

.edit-poll-cancel-btn {
    background: #f8f9fa;
    color: #6c757d;
    border: 2px solid #e9ecef;
    padding: 12px 24px;
    border-radius: 8px;
    font-size: 14px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s ease;
}

.edit-poll-cancel-btn:hover {
    background: #e9ecef;
    color: #495057;
}

.edit-poll-save-btn {
    background: #dc3545;
    color: white;
    border: none;
    padding: 12px 24px;
    border-radius: 8px;
    font-size: 14px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s ease;
}

.edit-poll-save-btn:hover {
    background: #c82333;
    transform: translateY(-1px);
    box-shadow: 0 4px 8px rgba(220, 53, 69, 0.3);
}

.edit-poll-save-btn:active {
    transform: translateY(0);
}

/* Widget Styles */
.widget-container {
    margin-bottom: 20px;
}

.widget-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 15px;
}

.widget-edit-btn {
    background: none;
    border: none;
    color: #6c757d;
    cursor: pointer;
    padding: 5px;
    border-radius: 4px;
    transition: all 0.3s ease;
}

.widget-edit-btn:hover {
    background: #f8f9fa;
    color: #dc3545;
}

.widget-actions-overlay {
    position: absolute;
    top: 10px;
    right: 10px;
    display: flex;
    gap: 8px;
    opacity: 0;
    transition: opacity 0.3s ease;
    z-index: 10;
}

.ad-card:hover .widget-actions-overlay {
    opacity: 1;
}

.widget-action-btn {
    background: rgba(0, 0, 0, 0.7);
    color: white;
    border: none;
    padding: 8px;
    border-radius: 4px;
    cursor: pointer;
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    font-size: 14px;
}

.widget-action-btn:hover:not(:disabled) {
    background: rgba(0, 0, 0, 0.9);
    transform: scale(1.1);
}

.widget-action-btn:disabled {
    opacity: 0.6;
    cursor: not-allowed;
}

.widget-delete-btn:hover:not(:disabled) {
    background: rgba(220, 53, 69, 0.9);
}

.widget-header-actions {
    display: flex;
    gap: 8px;
    align-items: center;
}

.widget-delete-btn-header {
    background: none;
    border: none;
    color: #6c757d;
    cursor: pointer;
    padding: 5px;
    border-radius: 4px;
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 28px;
    height: 28px;
}

.widget-delete-btn-header:hover:not(:disabled) {
    background: #fff5f5;
    color: #dc3545;
}

.widget-delete-btn-header:disabled {
    opacity: 0.5;
    cursor: not-allowed;
}

.add-widget-section {
    margin-bottom: 20px;
}

.add-widget-btn {
    width: 100%;
    background: #dc3545;
    color: white;
    border: none;
    padding: 12px;
    border-radius: 8px;
    cursor: pointer;
    font-size: 14px;
    font-weight: 500;
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
}

.add-widget-btn:hover {
    background: #c82333;
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(220, 53, 69, 0.3);
}

/* Widget Modal Styles */
.widget-modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1002;
    backdrop-filter: blur(4px);
}

.widget-modal {
    background: white;
    border-radius: 12px;
    width: 90%;
    max-width: 600px;
    max-height: 90vh;
    overflow-y: auto;
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
    animation: widgetModalSlideIn 0.3s ease-out;
}

@keyframes widgetModalSlideIn {
    from {
        opacity: 0;
        transform: scale(0.9) translateY(-20px);
    }
    to {
        opacity: 1;
        transform: scale(1) translateY(0);
    }
}

.widget-modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px 24px;
    border-bottom: 1px solid #e9ecef;
}

.widget-modal-header h3 {
    margin: 0;
    font-size: 20px;
    font-weight: 600;
    color: #252525;
}

.widget-modal-close {
    background: none;
    border: none;
    font-size: 18px;
    color: #6c757d;
    cursor: pointer;
    padding: 8px;
    border-radius: 50%;
    transition: all 0.2s ease;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
}

.widget-modal-close:hover {
    background: #f8f9fa;
    color: #495057;
}

.widget-modal-body {
    padding: 24px;
}

.widget-form-group {
    margin-bottom: 20px;
}

.widget-form-group label {
    display: block;
    margin-bottom: 8px;
    font-weight: 500;
    color: #495057;
    font-size: 14px;
}

.widget-input,
.widget-textarea {
    width: 100%;
    padding: 12px 16px;
    border: 1px solid #dcdcdc;
    border-radius: 8px;
    font-size: 14px;
    color: #495057;
    background: #f8f9fa;
    transition: all 0.2s ease;
    box-sizing: border-box;
    font-family: inherit;
}

.widget-textarea {
    resize: vertical;
    min-height: 100px;
}

.widget-input:focus,
.widget-textarea:focus {
    outline: none;
    border-color: #dc3545;
    background: white;
    box-shadow: 0 0 0 3px rgba(220, 53, 69, 0.1);
}

.widget-input::placeholder,
.widget-textarea::placeholder {
    color: #adb5bd;
}

.widget-checkbox-label {
    display: flex;
    align-items: center;
    gap: 8px;
    cursor: pointer;
}

.widget-checkbox-label input[type="checkbox"] {
    width: 18px;
    height: 18px;
    cursor: pointer;
}

.widget-image-preview {
    position: relative;
    margin-top: 10px;
    display: inline-block;
}

.widget-image-preview img {
    max-width: 200px;
    max-height: 200px;
    border-radius: 8px;
    border: 1px solid #e9ecef;
}

.widget-modal-footer {
    padding: 20px 24px;
    border-top: 1px solid #e9ecef;
    display: flex;
    justify-content: flex-end;
    gap: 12px;
}

.widget-cancel-btn {
    background: #f8f9fa;
    color: #6c757d;
    border: 2px solid #e9ecef;
    padding: 12px 24px;
    border-radius: 8px;
    font-size: 14px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s ease;
}

.widget-cancel-btn:hover {
    background: #e9ecef;
    color: #495057;
}

.widget-save-btn {
    background: #dc3545;
    color: white;
    border: none;
    padding: 12px 24px;
    border-radius: 8px;
    font-size: 14px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s ease;
}

.widget-save-btn:hover {
    background: #c82333;
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(220, 53, 69, 0.3);
}

.widget-save-btn:active {
    transform: translateY(0);
}

/* Make widgets clickable */
.ad-card {
    cursor: pointer;
    transition: transform 0.2s ease;
}

.ad-card:hover {
    transform: translateY(-2px);
}

.activity-card {
    cursor: pointer;
    transition: transform 0.2s ease;
}

.activity-card:hover {
    transform: translateY(-2px);
}

/* Video Tutorial Modal Styles */
.video-tutorial-modal {
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

    .video-container {
        position: relative;

        .video-loading-overlay {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(245, 245, 243, 0.9);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10;
            border-radius: 8px;
        }

        video {
            border-radius: 8px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            background: #000;
            display: block;
        }
    }
}

.help-btn {
    background: white;
    color: #252525;
    border: 1px solid #dcdcdc;
    padding: 5px 10px;
    border-radius: 5px;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 5px;
    transition: all 0.3s ease;
    font-size: 14px;
}

.help-btn:hover {
    transform: scale(1.1);
    background: #f8f9fa;
}
</style>
