<template>
    <div>
        <div class="container-fluid">
        <!-- Breadcrumb and Navigation Row -->
        <div class="breadcrumb-nav-row">
            <!-- Breadcrumb Navigation -->
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
                                <i class="fas fa-calendar-alt"></i>
                                Schedules
                            </li>
                        </ol>
                    </div>
                </nav>
            </div>

            <!-- Help Button Section -->
            <div class="help-section">
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

        <!-- Tabs and Controls Row -->
        <div class="tabs-controls-row">
            <div class="tabs-wrapper d-flex align-items-center">
                <div class="tabs">
                    <button 
                        v-for="tab in tabs" 
                        :key="tab"
                        @click="setActiveTab(tab)"
                        :class="['tab', { active: activeTab === tab }]"
                    >
                        {{ tab }}
                    </button>
                </div>
                <div class="default-toggle ml-3">
                    <label class="toggle-label">
                        <input 
                            type="checkbox" 
                            v-model="setAsDefault"
                            class="toggle-input"
                        />
                        <span class="toggle-text">Set as default?</span>
                    </label>
                    <i class="fas fa-info-circle info-icon ml-2" title="Set this view as your default schedule view"></i>
                </div>
            </div>
        </div>

        <!-- Controls -->
        <div class="controls">
            <div class="controls-row">
                <div class="controls-left">
                    <div class="dropdown">
                        <select v-model="coachView" class="form-control">
                            <option>Coach view</option>
                            <option>Member view</option>
                        </select>
                    </div>

                    <div v-if="!isMemberView" class="dropdown">
                        <select v-model="viewMode" class="form-control">
                            <option>1 day</option>
                            <option>3 days</option>
                            <option>1 week</option>
                            <option>By Coach</option>
                        </select>
                    </div>

                    <div v-if="!isMemberView" class="dropdown">
                        <select v-model="detailLevel" class="form-control">
                            <option>Medium</option>
                            <option>Low</option>
                            <option>High</option>
                        </select>
                    </div>
                </div>

                <div class="controls-right">
                    <div class="search-container" @click.stop>
                        <input 
                            type="text" 
                            v-model="searchTerm"
                            placeholder="Search members"
                            class="search-input"
                            @focus="showMemberDropdown = true"
                            @input="showMemberDropdown = true"
                            @blur="handleSearchBlur"
                        />
                        <i class="fas fa-search search-icon"></i>
                        <i 
                            v-if="selectedMemberId" 
                            class="fas fa-times clear-icon" 
                            @click="clearMemberFilter"
                            title="Clear member filter"
                        ></i>
                        
                        <!-- Member Dropdown -->
                        <div v-if="showMemberDropdown && filteredMembers.length > 0" class="member-dropdown">
                            <div 
                                v-for="member in filteredMembers" 
                                :key="member.id"
                                class="member-dropdown-item"
                                @mousedown.prevent="selectMember(member)"
                            >
                                {{ member.name || 'Unnamed Member' }}
                            </div>
                        </div>
                        <div v-if="showMemberDropdown && searchTerm && searchTerm.trim() !== '' && filteredMembers.length === 0" class="member-dropdown">
                            <div class="member-dropdown-item no-results">No members found</div>
                        </div>
                        <div v-if="showMemberDropdown && (!searchTerm || searchTerm.trim() === '') && members.length === 0" class="member-dropdown">
                            <div class="member-dropdown-item no-results">No members available</div>
                        </div>
                    </div>

                    <div class="dropdown">
                        <select v-model="selectedActivity" class="form-control">
                            <option value="">Activity</option>
                            <option 
                                v-for="activity in activityOptions" 
                                :key="activity" 
                                :value="activity"
                            >
                                {{ activity }}
                            </option>
                        </select>
                    </div>
                </div>
            </div>
        </div>

        <!-- Calendar Header -->
        <div class="calendar-header">
            <div class="calendar-nav">
                <a href="#" class="calendar-nav-link" @click.prevent="goToPreviousDate">
                    &lt; previous
                </a>

                <h2 class="calendar-title">
                    <i class="fas fa-calendar-alt calendar-icon"></i>
                    {{ formattedWeekTitle }}
                    <span v-if="selectedMemberName" class="member-filter-badge">
                        <i class="fas fa-user"></i> {{ selectedMemberName }}
                    </span>
                </h2>

                <a href="#" class="calendar-nav-link" @click.prevent="goToNextDate">
                    next &gt;
                </a>
            </div>
        </div>

        <!-- Schedule Grid -->
        <!-- Coach View: Based on viewMode (1 day, 3 days, 1 week, By Coach) -->
        <div v-if="!isMemberView" class="schedule-grid" :class="{ 'multi-day-grid': viewMode !== '1 day' && viewMode !== 'By Coach', 'coach-grid': viewMode === 'By Coach' }">
            <div ref="timeColumn" class="time-column">
                <div class="time-header"></div>
                <div v-for="time in timeSlots" :key="time" class="time-slot">
                    {{ time }}
                </div>
            </div>

            <!-- Single Day View -->
            <template v-if="viewMode === '1 day'">
                <div ref="scheduleContent" class="schedule-content">
                    <div class="schedule-header">{{ formattedDate }}</div>

                    <div class="schedule-slots">
                        <div
                            v-for="(slot, index) in timeSlots"
                            :key="index"
                            class="schedule-slot clickable"
                            @click="handleSlotClick(index)"
                        ></div>

                        <div
                            v-for="event in getEventsForDate(currentDate)"
                            :key="event.id"
                            class="event"
                            :style="{ top: event.top + 'px', height: event.height + 'px' }"
                            @click.stop.prevent="openEventModal(event)"
                            @mousedown.stop
                        >
                            <div class="event-title">{{ event.title }}</div>
                            <div v-if="detailLevel !== 'Low'" class="event-subtitle">{{ event.subtitle }}</div>
                            <div v-if="detailLevel === 'High'" class="event-time">{{ formatEventTime(event.start_time) }} - {{ formatEventTime(event.end_time) }}</div>
                            <div v-if="detailLevel !== 'Low'" class="event-capacity">{{ event.capacity }}</div>
                        </div>
                        
                        <!-- No Events Message for Selected Member -->
                        <div v-if="hasNoEventsForSelectedMember" class="no-events-message">
                            <p>No events found for <strong>{{ selectedMemberName }}</strong></p>
                        </div>
                    </div>
                </div>
            </template>

            <!-- By Coach View -->
            <template v-else-if="viewMode === 'By Coach'">
                <div ref="coachContent" class="coach-content" :style="{ '--coaches-count': coachColumns.length }">
                    <!-- Coaches Header -->
                    <div class="coach-header">
                        <div 
                            v-for="coach in coachColumns" 
                            :key="coach.id || 'without-coach'" 
                            class="coach-header-item"
                        >
                            {{ coach.name }}
                        </div>
                    </div>

                    <!-- Coach Grid Slots -->
                    <div class="coach-slots">
                        <div 
                            v-for="(time, timeIndex) in timeSlots" 
                            :key="timeIndex" 
                            class="coach-row"
                        >
                            <div 
                                v-for="(coach, coachIndex) in coachColumns" 
                                :key="coachIndex" 
                                class="coach-cell clickable"
                                @click="handleCoachCellClick(timeIndex, coach)"
                            >
                                <div
                                    v-for="event in getEventsForCoachAndTime(coach, time)"
                                    :key="event.id"
                                    class="event coach-event"
                                    @click.stop.prevent="openEventModal(event)"
                                    @mousedown.stop
                                >
                                    <div class="event-title">{{ event.title }}</div>
                                    <div class="event-time">{{ formatEventTime(event.start_time) }} - {{ formatEventTime(event.end_time) }}</div>
                                    <div v-if="event.memberNames && event.memberNames.length > 0" class="event-members">
                                        <div v-for="(memberName, idx) in event.memberNames" :key="idx" class="event-member-name">{{ memberName }}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <!-- No Events Message for Selected Member -->
                        <div v-if="hasNoEventsForSelectedMember" class="no-events-message-coach">
                            <p>No events found for <strong>{{ selectedMemberName }}</strong></p>
                        </div>
                    </div>
                </div>
            </template>

            <!-- Multi-Day View (3 days, 1 week, 1 month) -->
            <template v-else>
                <div ref="multiDayContent" class="multi-day-content" :style="{ '--days-count': viewDates.length }">
                    <!-- Days Header -->
                    <div class="multi-day-header">
                        <div 
                            v-for="date in viewDates" 
                            :key="date.getTime()" 
                            class="day-header"
                        >
                            <div class="day-name">{{ date.toLocaleDateString('en-US', { weekday: 'short' }) }}</div>
                            <div class="day-date">{{ date.getDate() }} {{ date.toLocaleDateString('en-US', { month: 'short' }) }}</div>
                        </div>
                    </div>

                    <!-- Multi-Day Grid Slots -->
                    <div class="multi-day-slots">
                        <div 
                            v-for="(time, timeIndex) in timeSlots" 
                            :key="timeIndex" 
                            class="multi-day-row"
                        >
                            <div 
                                v-for="(date, dayIndex) in viewDates" 
                                :key="dayIndex" 
                                class="multi-day-cell clickable"
                                @click="handleMultiDayCellClick(timeIndex, dayIndex, date)"
                            >
                                <div
                                    v-for="event in getEventsForCell(date, time)"
                                    :key="event.id"
                                    class="event multi-day-event"
                                    @click.stop.prevent="openEventModal(event)"
                                    @mousedown.stop
                                >
                                    <div class="event-title">{{ event.title }}</div>
                                    <div v-if="detailLevel !== 'Low'" class="event-time">{{ formatEventTime(event.start_time) }} - {{ formatEventTime(event.end_time) }}</div>
                                    <div v-if="detailLevel === 'High'" class="event-instructor">{{ event.instructor }}</div>
                                    <div v-if="detailLevel !== 'Low'" class="event-capacity">{{ event.capacity }}</div>
                                    <div v-if="detailLevel === 'High' && event.location" class="event-location">{{ event.location }}</div>
                                </div>
                            </div>
                        </div>
                        
                        <!-- No Events Message for Selected Member -->
                        <div v-if="hasNoEventsForSelectedMember" class="no-events-message-multi-day">
                            <p>No events found for <strong>{{ selectedMemberName }}</strong></p>
                        </div>
                    </div>
                </div>
            </template>
        </div>

        <!-- Member View: Weekly Grid -->
        <div v-else class="schedule-grid weekly-grid">
            <div ref="timeColumnMember" class="time-column">
                <div class="time-header"></div>
                <div v-for="time in timeSlots" :key="time" class="time-slot">
                    {{ time }}
                </div>
            </div>

            <div ref="weeklyContent" class="weekly-content">
                <!-- Days Header -->
                <div class="weekly-header">
                    <div 
                        v-for="date in weekDates" 
                        :key="date.getTime()" 
                        class="day-header"
                    >
                        <div class="day-name">{{ date.toLocaleDateString('en-US', { weekday: 'long' }) }}</div>
                        <div class="day-date">{{ date.getDate() }} {{ date.toLocaleDateString('en-US', { month: 'short' }) }}</div>
                    </div>
                </div>

                <!-- Weekly Grid Slots -->
                <div class="weekly-slots">
                    <div 
                        v-for="(time, timeIndex) in timeSlots" 
                        :key="timeIndex" 
                        class="weekly-row"
                    >
                        <div 
                            v-for="(date, dayIndex) in weekDates" 
                            :key="dayIndex" 
                            class="weekly-cell clickable"
                            @click="handleWeeklyCellClick(timeIndex, dayIndex, date)"
                        >
                            <div
                                v-for="event in getEventsForCell(date, time)"
                                :key="event.id"
                                class="event weekly-event"
                                @click.stop.prevent="openEventModal(event)"
                                @mousedown.stop
                            >
                                <div class="event-title">{{ event.title }}</div>
                                <div v-if="detailLevel !== 'Low'" class="event-time">{{ formatEventTime(event.start_time) }} - {{ formatEventTime(event.end_time) }}</div>
                                <div v-if="detailLevel === 'High'" class="event-instructor">{{ event.instructor }}</div>
                                <div v-if="detailLevel !== 'Low'" class="event-capacity">{{ event.capacity }}</div>
                                <div v-if="detailLevel === 'High' && event.location" class="event-location">{{ event.location }}</div>
                            </div>
                        </div>
                    </div>
                    
                    <!-- No Events Message for Selected Member -->
                    <div v-if="hasNoEventsForSelectedMember" class="no-events-message-weekly">
                        <p>No events found for <strong>{{ selectedMemberName }}</strong></p>
                    </div>
                </div>
            </div>
        </div>
        </div>

        <!-- Event Details Modal - Outside container to avoid parent constraints -->
        <div v-if="selectedEvent" ref="eventModal" class="modal-backdrop event-details-modal" @click.self="closeEventModal">
            <div class="modal-box event-details-box">
                <div class="event-modal-header">
                    <h2 class="event-modal-title">{{ selectedEvent.title || 'Event Details' }}</h2>
                    <button @click="closeEventModal" class="event-modal-close">×</button>
                </div>
                
                <!-- Event Information Content -->
                <div class="event-modal-content-wrapper">
                    <div class="event-details-grid">
                        <div class="event-detail-row">
                            <div class="event-detail-col">
                                <i class="fas fa-calendar-alt event-detail-icon"></i>
                                <div class="event-detail-info">
                                    <span class="event-detail-label">Date</span>
                                    <span class="event-detail-value">{{ formatEventDate(selectedEvent.date) }}</span>
                                </div>
                            </div>
                            <div class="event-detail-col">
                                <i class="fas fa-clock event-detail-icon"></i>
                                <div class="event-detail-info">
                                    <span class="event-detail-label">Time</span>
                                    <span class="event-detail-value">{{ formatEventTime(selectedEvent.start_time) }} - {{ formatEventTime(selectedEvent.end_time) }}</span>
                                </div>
                            </div>
                        </div>
                        
                        <div class="event-detail-row">
                            <div class="event-detail-col">
                                <i class="fas fa-users event-detail-icon"></i>
                                <div class="event-detail-info">
                                    <span class="event-detail-label">Participants</span>
                                    <span class="event-detail-value">{{ selectedEvent.capacity || '0 / 10' }}</span>
                                </div>
                            </div>
                            <div class="event-detail-col">
                                <i class="fas fa-user-tie event-detail-icon"></i>
                                <div class="event-detail-info">
                                    <span class="event-detail-label">Coach</span>
                                    <span class="event-detail-value coach-name">{{ selectedEvent.instructor || 'N/A' }}</span>
                                </div>
                            </div>
                        </div>
                        
                        <div class="event-detail-row">
                            <div class="event-detail-col">
                                <i class="fas fa-map-marker-alt event-detail-icon"></i>
                                <div class="event-detail-info">
                                    <span class="event-detail-label">Location</span>
                                    <span class="event-detail-value">{{ selectedEvent.location || 'Gym' }}</span>
                                </div>
                            </div>
                            <div class="event-detail-col">
                                <i class="fas fa-ticket-alt event-detail-icon"></i>
                                <div class="event-detail-info">
                                    <span class="event-detail-label">Credits</span>
                                    <span class="event-detail-value">{{ getCreditText(selectedEvent) }}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Member Assignment Section -->
                    <div class="event-member-assignment">
                        <div class="assignment-header">
                            <h4 class="assignment-title">
                                <i class="fas fa-user-plus"></i>
                                Assign Members
                            </h4>
                        </div>
                        <div class="assignment-content">
                            <div class="form-group mb-3">
                                <label class="form-label">Select Members</label>
                                <div class="input-with-icon">
                                    <select 
                                        v-model="eventModalMemberIds" 
                                        class="form-control form-control-sm" 
                                        multiple
                                        size="5"
                                        style="min-height: 100px;"
                                    >
                                        <option 
                                            v-for="member in members" 
                                            :key="member.id" 
                                            :value="member.id"
                                        >
                                            {{ member.name }}
                                        </option>
                                    </select>
                                    <i class="fas fa-users input-icon"></i>
                                </div>
                                <div v-if="eventModalMemberIds && eventModalMemberIds.length > 0" class="selected-members mt-2">
                                    <small class="text-muted">
                                        <strong>Selected ({{ eventModalMemberIds.length }}):</strong>
                                        <span v-for="(memberId, index) in eventModalMemberIds" :key="memberId" class="badge badge-primary mr-1">
                                            {{ getMemberName(memberId) }}
                                            <span v-if="index < eventModalMemberIds.length - 1">,</span>
                                        </span>
                                    </small>
                                </div>
                                <small class="form-text text-muted">
                                    Hold Ctrl/Cmd to select multiple members.
                                </small>
                            </div>
                            <button 
                                @click="assignMembersToEvent" 
                                class="btn btn-sm btn-primary"
                                :disabled="assigningMembers"
                            >
                                <i class="fas fa-save"></i>
                                {{ assigningMembers ? 'Assigning...' : 'Assign Members' }}
                            </button>
                        </div>
                    </div>
                </div>

                <!-- Action Buttons -->
                <div class="event-modal-actions">
                    <button @click="editEvent(selectedEvent)" class="btn btn-sm btn-primary">
                        <i class="fas fa-pencil-alt"></i>
                        Edit
                    </button>
                    <button @click="deleteEvent(selectedEvent)" class="btn btn-sm btn-danger">
                        <i class="fas fa-trash"></i>
                        Delete
                    </button>
                </div>
            </div>
        </div>

        <!-- Create/Edit Event Modal -->
        <div v-if="showCreateModal" class="modal-backdrop" @click.self="closeCreateModal">
            <div class="modal-box comprehensive-modal">
                <div class="modal-header">
                    <h3 class="modal-title">{{ isEditing ? 'Edit event' : 'New event' }}</h3>
                    <button @click="closeCreateModal" class="modal-close" type="button">×</button>
                </div>
                <div class="modal-content-wrapper">
                    <form @submit.prevent="saveEvent" class="comprehensive-form">
                        <!-- Schedule Dropdown -->
                        <div class="form-group">
                            <label>Schedule <span class="text-danger">*</span></label>
                            <select v-model="eventForm.scheduleId" class="form-control" required>
                                <option value="">Choose...</option>
                                <option 
                                    v-for="schedule in schedules" 
                                    :key="schedule.id" 
                                    :value="schedule.id"
                                >
                                    {{ schedule.name }}
                                </option>
                            </select>
                        </div>

                        <!-- Date -->
                        <div class="form-group">
                            <label>Date</label>
                            <input 
                                type="text" 
                                :value="formattedDateShort" 
                                disabled 
                                class="form-control"
                            />
                        </div>

                        <!-- Activity -->
                        <div class="form-group">
                            <label>Activity <span class="text-danger">*</span></label>
                            <div class="d-flex">
                                <select v-model="eventForm.activityId" class="form-control" required>
                                    <option value="">Choose...</option>
                                    <option 
                                        v-for="activity in activities" 
                                        :key="activity.id" 
                                        :value="activity.id"
                                    >
                                        {{ activity.name }}
                                    </option>
                                </select>
                                <button type="button" class="btn btn-outline-primary ml-2" @click="openActivityModal">
                                    + New
                                </button>
                            </div>
                            <small v-if="activities.length === 0" class="form-text text-muted">
                                No activities yet. Click <strong>+ New</strong> to create one.
                            </small>
                        </div>

                        <!-- Start Time -->
                        <div class="form-group">
                            <label>Start time</label>
                            <div class="time-input-group">
                                <select v-model="eventForm.startHour" class="form-control time-select">
                                    <option v-for="h in hours" :key="h" :value="h">{{ String(h).padStart(2, '0') }}</option>
                                </select>
                                <select v-model="eventForm.startMinute" class="form-control time-select">
                                    <option v-for="m in minutes" :key="m" :value="m">{{ String(m).padStart(2, '0') }}</option>
                                </select>
                                <select v-model="eventForm.startPeriod" class="form-control time-select">
                                    <option value="AM">AM</option>
                                    <option value="PM">PM</option>
                                </select>
                            </div>
                        </div>

                        <!-- Max Participants -->
                        <div class="form-group">
                            <label>Max participants <span class="text-danger">*</span></label>
                            <input 
                                type="number" 
                                v-model="eventForm.maxParticipants" 
                                class="form-control"
                                min="1"
                                required
                            />
                        </div>

                        <!-- End Time -->
                        <div class="form-group">
                            <label>End time</label>
                            <div class="time-input-group">
                                <select v-model="eventForm.endHour" class="form-control time-select">
                                    <option v-for="h in hours" :key="h" :value="h">{{ String(h).padStart(2, '0') }}</option>
                                </select>
                                <select v-model="eventForm.endMinute" class="form-control time-select">
                                    <option v-for="m in minutes" :key="m" :value="m">{{ String(m).padStart(2, '0') }}</option>
                                </select>
                                <select v-model="eventForm.endPeriod" class="form-control time-select">
                                    <option value="AM">AM</option>
                                    <option value="PM">PM</option>
                                </select>
                            </div>
                        </div>

                        <!-- Instructor -->
                        <div class="form-group">
                            <label>Instructor</label>
                            <div class="input-with-icon">
                                <select v-model="eventForm.coachId" class="form-control">
                                    <option value="">None</option>
                                    <option 
                                        v-for="coach in coaches" 
                                        :key="coach.id" 
                                        :value="coach.id"
                                    >
                                        {{ coach.name }}
                                    </option>
                                </select>
                                <i class="fas fa-user input-icon"></i>
                            </div>
                        </div>

                        <!-- Members (Multiple Selection) -->
                        <div class="form-group">
                            <label>Members</label>
                            <div class="input-with-icon">
                                <select 
                                    v-model="eventForm.memberIds" 
                                    class="form-control" 
                                    multiple
                                    size="5"
                                    style="min-height: 120px;"
                                >
                                    <option 
                                        v-for="member in members" 
                                        :key="member.id" 
                                        :value="member.id"
                                    >
                                        {{ member.name }}
                                    </option>
                                </select>
                                <i class="fas fa-users input-icon"></i>
                            </div>
                            <div v-if="eventForm.memberIds && eventForm.memberIds.length > 0" class="selected-members mt-2">
                                <small class="text-muted">
                                    <strong>Selected ({{ eventForm.memberIds.length }}):</strong>
                                    <span v-for="(memberId, index) in eventForm.memberIds" :key="memberId" class="badge badge-primary mr-1">
                                        {{ getMemberName(memberId) }}
                                        <span v-if="index < eventForm.memberIds.length - 1">,</span>
                                    </span>
                                </small>
                            </div>
                            <small class="form-text text-muted">
                                <strong>Hold Ctrl/Cmd to select multiple members.</strong> Leave empty to create a group class that members can book via mobile app (enable "Online booking" below). 
                                <strong>Select members</strong> to directly assign them to this time slot.
                            </small>
                        </div>

                        <!-- Recurrency -->
                        <div class="form-group">
                            <label>Recurrency</label>
                            <select v-model="eventForm.recurrency" class="form-control">
                                <option value="">None</option>
                                <option value="daily">Daily</option>
                                <option value="weekly">Weekly</option>
                                <option value="monthly">Monthly</option>
                            </select>
                        </div>

                        <!-- Location -->
                        <div class="form-group">
                            <label>Location</label>
                            <select v-model="eventForm.locationId" class="form-control">
                                <option value="">Choose a location</option>
                                <option 
                                    v-for="location in locations" 
                                    :key="location.id" 
                                    :value="location.id"
                                >
                                    {{ location.name }}
                                </option>
                            </select>
                        </div>

                        <!-- Description -->
                        <div class="form-group">
                            <label>Description</label>
                            <textarea 
                                v-model="eventForm.description" 
                                class="form-control"
                                rows="4"
                                placeholder="Enter event description"
                            ></textarea>
                        </div>

                        <!-- Note to employees -->
                        <div class="form-group">
                            <label>Note to employees</label>
                            <textarea 
                                v-model="eventForm.noteToEmployees" 
                                class="form-control"
                                rows="4"
                                placeholder="Internal notes for staff"
                            ></textarea>
                        </div>

                        <!-- Bookable in advance -->
                        <div class="form-group">
                            <label>Bookable in advance</label>
                            <div class="input-group-combined">
                                <input 
                                    type="number" 
                                    v-model="eventForm.bookableInAdvance" 
                                    class="form-control"
                                    min="1"
                                    value="1"
                                />
                                <select v-model="eventForm.bookableUnit" class="form-control">
                                    <option value="weeks">Weeks</option>
                                    <option value="days">Days</option>
                                    <option value="months">Months</option>
                                </select>
                            </div>
                        </div>

                        <!-- Credit type -->
                        <div class="form-group">
                            <label>Credit type</label>
                            <div class="input-with-actions">
                                <input 
                                    type="text" 
                                    v-model="eventForm.creditType" 
                                    class="form-control"
                                    value="No credits"
                                    readonly
                                />
                                <i class="fas fa-pencil-alt action-icon" @click="editCreditType = true"></i>
                                <i class="fas fa-info-circle info-icon"></i>
                            </div>
                        </div>

                        <!-- Cancel activity if no participants -->
                        <div class="form-group">
                            <label>Cancel activity if no participants</label>
                            <div class="input-with-info">
                                <select v-model="eventForm.cancelIfNoParticipants" class="form-control">
                                    <option value="always">Always before the event starts</option>
                                    <option value="never">Never</option>
                                    <option value="1hour">1 hour before</option>
                                    <option value="2hours">2 hours before</option>
                                </select>
                                <i class="fas fa-info-circle info-icon"></i>
                            </div>
                        </div>

                        <!-- Free cancellation period -->
                        <div class="form-group">
                            <label>Free cancellation period</label>
                            <div class="input-with-info">
                                <select v-model="eventForm.freeCancellationPeriod" class="form-control">
                                    <option value="always">Always before the event starts</option>
                                    <option value="1hour">1 hour before</option>
                                    <option value="2hours">2 hours before</option>
                                    <option value="1day">1 day before</option>
                                </select>
                                <i class="fas fa-info-circle info-icon"></i>
                            </div>
                        </div>

                        <!-- Link -->
                        <div class="form-group">
                            <label>Link</label>
                            <div class="input-with-info">
                                <input 
                                    type="url" 
                                    v-model="eventForm.link" 
                                    class="form-control"
                                    placeholder="https://..."
                                />
                                <i class="fas fa-info-circle info-icon"></i>
                            </div>
                        </div>

                        <!-- Text -->
                        <div class="form-group">
                            <label>Text</label>
                            <div class="input-with-info">
                                <input 
                                    type="text" 
                                    v-model="eventForm.linkText" 
                                    class="form-control"
                                    placeholder="Link text"
                                />
                                <i class="fas fa-info-circle info-icon"></i>
                            </div>
                        </div>

                        <!-- Show link before booking -->
                        <div class="form-group">
                            <label class="toggle-label-inline">
                                <span>Show link before booking</span>
                                <label class="switch">
                                    <input type="checkbox" v-model="eventForm.showLinkBeforeBooking">
                                    <span class="slider"></span>
                                </label>
                                <i class="fas fa-info-circle info-icon"></i>
                            </label>
                        </div>

                        <!-- Enable online booking -->
                        <div class="form-group">
                            <label class="checkbox-label">
                                <input 
                                    type="checkbox" 
                                    v-model="eventForm.enableOnlineBooking"
                                    class="checkbox-input"
                                />
                                <span>Enable online booking</span>
                            </label>
                        </div>

                        <div class="modal-actions">
                            <button type="button" @click="closeCreateModal" class="btn btn-secondary" :disabled="saving">
                                Cancel
                            </button>
                            <button type="submit" class="btn btn-primary" :disabled="saving">
                                <span v-if="saving">
                                    <i class="fas fa-spinner fa-spin"></i>
                                    {{ isEditing ? 'Updating...' : 'Saving...' }}
                                </span>
                                <span v-else>{{ isEditing ? 'Update' : 'Save' }}</span>
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>

        <!-- Video Tutorial Modal -->
        <!-- Basic Activity Information Modal (kept OUTSIDE Create/Edit Event modal to avoid stacking/unmount issues) -->
        <b-modal
            id="schedule-activity-modal"
            v-model="showActivityModal"
            title="Basic Activity Information"
            centered
            hide-footer
            @hide="onActivityModalHide"
        >
            <div class="form-group">
                <label>Name <span class="text-danger">*</span></label>
                <input v-model="activityForm.name" type="text" class="form-control" placeholder="e.g. Jogging" />
            </div>

            <div class="form-group">
                <label>Visible for</label>
                <select v-model="activityForm.visible_for" class="form-control">
                    <option value="only_myself">Only myself</option>
                    <option value="gym">Gym</option>
                    <option value="everyone">Everyone</option>
                </select>
            </div>

            <div class="form-group">
                <label>Category</label>
                <input v-model="activityForm.category" type="text" class="form-control" placeholder="e.g. Cardio" />
            </div>

            <div class="form-group">
                <label>Type</label>
                <div class="d-flex">
                    <div class="custom-control custom-radio mr-3">
                        <input
                            class="custom-control-input"
                            type="radio"
                            id="actTypeDuration"
                            value="duration"
                            v-model="activityForm.type"
                        />
                        <label class="custom-control-label" for="actTypeDuration">Duration based</label>
                    </div>
                    <div class="custom-control custom-radio">
                        <input
                            class="custom-control-input"
                            type="radio"
                            id="actTypeSet"
                            value="set"
                            v-model="activityForm.type"
                        />
                        <label class="custom-control-label" for="actTypeSet">Set based</label>
                    </div>
                </div>
            </div>

            <div class="form-group">
                <label class="d-flex align-items-center mb-0">
                    <input type="checkbox" class="mr-2" v-model="activityForm.can_be_added_in_schedule" />
                    Can be added in schedule
                </label>
            </div>

            <div class="form-row">
                <div class="form-group col-md-6">
                    <label>Color</label>
                    <input v-model="activityForm.color" type="color" class="form-control" />
                </div>
                <div class="form-group col-md-6">
                    <label>MET</label>
                    <input v-model.number="activityForm.met" type="number" step="0.1" class="form-control" placeholder="e.g. 7.0" />
                </div>
            </div>

            <div class="form-row">
                <div class="form-group col-md-6">
                    <label>Default duration (minutes)</label>
                    <input v-model.number="activityForm.default_duration_minutes" type="number" min="1" class="form-control" />
                </div>
                <div class="form-group col-md-6">
                    <label>Difficulty</label>
                    <select v-model="activityForm.difficulty" class="form-control">
                        <option value="">--</option>
                        <option value="novice">Novice</option>
                        <option value="intermediate">Intermediate</option>
                        <option value="advanced">Advanced</option>
                    </select>
                </div>
            </div>

            <div class="form-group">
                <label>Tags (comma separated)</label>
                <input v-model="activityForm.tags" type="text" class="form-control" placeholder="e.g. cardio, running" />
            </div>

            <div class="form-group">
                <label>Instructions</label>
                <textarea v-model="activityForm.instructions" class="form-control" rows="3"></textarea>
            </div>

            <div class="form-row">
                <div class="form-group col-md-6">
                    <label>YouTube link (Male)</label>
                    <input v-model="activityForm.youtube_url_male" type="url" class="form-control" placeholder="https://..." />
                </div>
                <div class="form-group col-md-6">
                    <label>YouTube link (Female)</label>
                    <input v-model="activityForm.youtube_url_female" type="url" class="form-control" placeholder="https://..." />
                </div>
            </div>

            <div class="d-flex justify-content-end">
                <button type="button" class="btn btn-secondary mr-2" @click="showActivityModal = false" :disabled="activitySaving">
                    Cancel
                </button>
                <button type="button" class="btn btn-primary" @click="saveActivity" :disabled="activitySaving">
                    {{ activitySaving ? 'Saving...' : 'Save activity' }}
                </button>
            </div>
        </b-modal>

        <b-modal
            v-model="showVideoTutorialModal"
            title="Schedule Tutorial"
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
import axios from 'axios';

export default {
    name: 'Schedule',
    metaInfo: {
        title: 'Schedule',
    },
    data() {
        return {
            activeTab: 'GROUP TRAINING',
            setAsDefault: false,
            selectedEvent: null,
            eventModalMemberIds: [],
            assigningMembers: false,
            showCreateModal: false,
            isEditing: false,
            saving: false,
            selectedSlotIndex: null,
            viewMode: '1 day',
            coachView: 'Coach view',
            detailLevel: 'Medium',
            searchTerm: '',
            selectedMemberId: null,
            showMemberDropdown: false,
            currentDate: new Date(),
            tabs: ['My schedule', 'GROUP TRAINING', 'Private Gym', 'Recovery Center Services', 'All'],
            // Video Tutorial Modal
            showVideoTutorialModal: false,
            isVideoLoading: false,
            videoError: null,
            videoTutorialUrl: '/tutorial_videos/schedule.mp4',
            timeSlots: [
                '12 am', '1 am', '2 am', '3 am', '4 am', '5 am', '6 am', '7 am', '8 am',
                '9 am', '10 am', '11 am', '12 pm', '1 pm', '2 pm', '3 pm', '4 pm', '5 pm',
                '6 pm', '7 pm', '8 pm', '9 pm', '10 pm', '11 pm'
            ],
            selectedActivity: '',
            coaches: [],
            members: [],
            activities: [],
            activityOptions: [],
            scheduleEvents: [],
            // Schedule Activities Modal
            showActivityModal: false,
            activitySaving: false,
            reopenCreateModalAfterActivity: false,
            activityForm: {
                name: '',
                visible_for: 'gym',
                category: '',
                type: 'duration',
                can_be_added_in_schedule: true,
                color: '#161413',
                met: null,
                default_duration_minutes: null,
                difficulty: 'novice',
                tags: '',
                instructions: '',
                youtube_url_male: '',
                youtube_url_female: '',
            },
            eventForm: {
                id: null,
                title: '',
                date: '',
                startTime: '',
                endTime: '',
                coachId: '',
                memberIds: [],
                activityId: '',
                description: '',
                // My Schedule specific fields
                scheduleId: '',
                startHour: 2,
                startMinute: 45,
                startPeriod: 'PM',
                endHour: 3,
                endMinute: 45,
                endPeriod: 'PM',
                maxParticipants: '',
                recurrency: '',
                locationId: '',
                noteToEmployees: '',
                bookableInAdvance: 1,
                bookableUnit: 'weeks',
                creditType: 'No credits',
                cancelIfNoParticipants: 'always',
                freeCancellationPeriod: 'always',
                link: '',
                linkText: '',
                showLinkBeforeBooking: false,
                enableOnlineBooking: false,
            },
            schedules: [],
            locations: [],
            hours: Array.from({ length: 12 }, (_, i) => i + 1),
            minutes: Array.from({ length: 60 }, (_, i) => i),
            editCreditType: false,
        };
    },
    computed: {
        formattedDate() {
            const day = this.currentDate.getDate();
            const weekday = this.currentDate.toLocaleDateString('en-US', { weekday: 'long' });
            const month = this.currentDate.toLocaleDateString('en-US', { month: 'long' });
            const year = this.currentDate.getFullYear();
            return `${day} ${weekday} ${month} ${year}`;
        },
        formattedDateShort() {
            const month = String(this.currentDate.getMonth() + 1).padStart(2, '0');
            const day = String(this.currentDate.getDate()).padStart(2, '0');
            const year = this.currentDate.getFullYear();
            return `${month}/${day}/${year}`;
        },
        filteredMembers() {
            if (!this.searchTerm || this.searchTerm.trim() === '') {
                return this.members.slice(0, 10); // Show first 10 members when no search term
            }
            const searchLower = this.searchTerm.toLowerCase().trim();
            return this.members.filter(member => {
                if (!member || !member.name) return false;
                return member.name.toLowerCase().includes(searchLower);
            });
        },
        filteredEvents() {
            return this.scheduleEvents.filter(event => {
                const matchActivity = !this.selectedActivity || 
                    event.title.toLowerCase().includes(this.selectedActivity.toLowerCase());
                
                // Check if member matches - either direct assignment or in bookings
                // If no member is selected, show all events (including those with members)
                // If a member is selected, only show events for that member
                // Events with members should always be visible when no member filter is applied
                const matchMember = !this.selectedMemberId || 
                    (event.memberId && event.memberId == this.selectedMemberId) ||
                    (event.memberIds && event.memberIds.includes(parseInt(this.selectedMemberId)));
                
                return matchActivity && matchMember;
            });
        },
        selectedMemberName() {
            if (!this.selectedMemberId) return null;
            const member = this.members.find(m => m.id == this.selectedMemberId);
            return member ? member.name : null;
        },
        hasNoEventsForSelectedMember() {
            return this.selectedMemberId && this.filteredEvents.length === 0;
        },
        isMemberView() {
            return this.coachView === 'Member view';
        },
        weekDates() {
            if (!this.isMemberView) return [];
            
            // Get the start of the week (Monday)
            const startOfWeek = new Date(this.currentDate);
            const day = startOfWeek.getDay();
            const diff = startOfWeek.getDate() - day + (day === 0 ? -6 : 1); // Adjust when day is Sunday
            startOfWeek.setDate(diff);
            startOfWeek.setHours(0, 0, 0, 0);
            
            // Generate 7 days starting from Monday
            const dates = [];
            for (let i = 0; i < 7; i++) {
                const date = new Date(startOfWeek);
                date.setDate(startOfWeek.getDate() + i);
                dates.push(date);
            }
            return dates;
        },
        weekNumber() {
            if (!this.isMemberView) return null;
            const date = new Date(this.currentDate);
            const startDate = new Date(date.getFullYear(), 0, 1);
            const days = Math.floor((date - startDate) / (24 * 60 * 60 * 1000));
            return Math.ceil((days + startDate.getDay() + 1) / 7);
        },
        formattedWeekTitle() {
            if (this.isMemberView) {
                return `${this.activeTab} Week ${this.weekNumber}`;
            }
            if (this.viewMode === 'By Coach') {
                return `${this.activeTab} ${this.formattedDate}`;
            }
            return `${this.activeTab} ${this.formattedDate}`;
        },
        coachColumns() {
            // Return all coaches plus "Without coach" column
            const coachList = this.coaches.map(coach => ({
                id: coach.id,
                name: coach.name
            }));
            
            // Add "Without coach" column at the end
            coachList.push({
                id: null,
                name: 'Without coach'
            });
            
            return coachList;
        },
        viewDates() {
            // Calculate dates to display based on viewMode (only for Coach view)
            if (this.isMemberView) {
                return this.weekDates; // Member view always shows week
            }
            
            const dates = [];
            const startDate = new Date(this.currentDate);
            startDate.setHours(0, 0, 0, 0);
            
            let daysToShow = 1;
            if (this.viewMode === '3 days') {
                daysToShow = 3;
                // Start from current date
            } else if (this.viewMode === '1 week') {
                daysToShow = 7;
                // Get the start of the week (Monday)
                const day = startDate.getDay();
                const diff = startDate.getDate() - day + (day === 0 ? -6 : 1);
                startDate.setDate(diff);
            } else if (this.viewMode === '1 month') {
                // Get first day of month
                startDate.setDate(1);
                // Get number of days in month
                const year = startDate.getFullYear();
                const month = startDate.getMonth();
                daysToShow = new Date(year, month + 1, 0).getDate();
            }
            
            for (let i = 0; i < daysToShow; i++) {
                const date = new Date(startDate);
                date.setDate(startDate.getDate() + i);
                dates.push(date);
            }
            
            return dates;
        },
    },
    watch: {
        coachView() {
            // Reload schedule when view changes
            this.loadSchedule();
        },
        viewMode() {
            // Reload schedule when view mode changes
            this.loadSchedule();
            // Re-setup scroll sync after view mode changes
            this.$nextTick(() => {
                this.setupScrollSync();
            });
        },
    },
    methods: {
        goBack() {
            this.$router.go(-1);
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

        setActiveTab(tab) {
            this.activeTab = tab;
            // Reload schedule when tab changes
            this.loadSchedule();
        },
        goToPreviousDate() {
            if (this.isMemberView) {
                // Go to previous week
                this.currentDate.setDate(this.currentDate.getDate() - 7);
            } else {
                // Go to previous period based on viewMode
                if (this.viewMode === '1 day' || this.viewMode === 'By Coach') {
                    this.currentDate.setDate(this.currentDate.getDate() - 1);
                } else if (this.viewMode === '3 days') {
                    this.currentDate.setDate(this.currentDate.getDate() - 3);
                } else if (this.viewMode === '1 week') {
                    this.currentDate.setDate(this.currentDate.getDate() - 7);
                } else if (this.viewMode === '1 month') {
                    this.currentDate.setMonth(this.currentDate.getMonth() - 1);
                }
            }
            this.currentDate = new Date(this.currentDate);
            this.loadSchedule();
        },
        goToNextDate() {
            if (this.isMemberView) {
                // Go to next week
                this.currentDate.setDate(this.currentDate.getDate() + 7);
            } else {
                // Go to next period based on viewMode
                if (this.viewMode === '1 day' || this.viewMode === 'By Coach') {
                    this.currentDate.setDate(this.currentDate.getDate() + 1);
                } else if (this.viewMode === '3 days') {
                    this.currentDate.setDate(this.currentDate.getDate() + 3);
                } else if (this.viewMode === '1 week') {
                    this.currentDate.setDate(this.currentDate.getDate() + 7);
                } else if (this.viewMode === '1 month') {
                    this.currentDate.setMonth(this.currentDate.getMonth() + 1);
                }
            }
            this.currentDate = new Date(this.currentDate);
            this.loadSchedule();
        },
        handleSlotClick(index) {
            this.selectedSlotIndex = index;
            const selectedTime = this.timeSlots[index];
            const [time, period] = selectedTime.split(' ');
            const [hours] = time.split(':');
            let hour24 = parseInt(hours);
            if (period === 'pm' && hour24 !== 12) hour24 += 12;
            if (period === 'am' && hour24 === 12) hour24 = 0;
            const hour12 = hour24 > 12 ? hour24 - 12 : (hour24 === 0 ? 12 : hour24);
            
            this.eventForm = {
                id: null,
                title: '',
                date: this.formatDate(this.currentDate),
                startTime: selectedTime,
                endTime: this.timeSlots[Math.min(index + 1, this.timeSlots.length - 1)],
                coachId: '',
                memberId: '',
                activityId: '',
                description: '',
                // My Schedule specific fields
                scheduleId: '',
                startHour: hour12,
                startMinute: 0,
                startPeriod: period.toUpperCase(),
                endHour: (hour24 + 1) > 12 ? ((hour24 + 1) - 12 === 0 ? 12 : (hour24 + 1) - 12) : (hour24 + 1 === 12 ? 12 : hour24 + 1),
                endMinute: 0,
                endPeriod: (hour24 + 1) >= 12 ? 'PM' : 'AM',
                maxParticipants: '',
                recurrency: '',
                locationId: '',
                noteToEmployees: '',
                bookableInAdvance: 1,
                bookableUnit: 'weeks',
                creditType: 'No credits',
                cancelIfNoParticipants: 'always',
                freeCancellationPeriod: 'always',
                link: '',
                linkText: '',
                showLinkBeforeBooking: false,
                enableOnlineBooking: false,
            };
            this.isEditing = false;
            this.showCreateModal = true;
            this.lockBodyScroll();
        },
        openEventModal(event) {
            if (!event) {
                return;
            }
            this.selectedEvent = { ...event }; // Create a copy to ensure reactivity
            // Initialize member IDs for the modal
            this.eventModalMemberIds = event.memberIds ? [...event.memberIds] : (event.memberId ? [event.memberId] : []);
            this.lockBodyScroll();
        },
        async assignMembersToEvent() {
            if (!this.selectedEvent || !this.selectedEvent.id) {
                return;
            }

            this.assigningMembers = true;
            try {
                const response = await axios.put(
                    `/schedule/events/${this.selectedEvent.id}`,
                    {
                        member_ids: this.eventModalMemberIds || [],
                        // Keep all other event data unchanged
                        title: this.selectedEvent.title,
                        date: this.selectedEvent.date,
                        start_time: this.selectedEvent.start_time,
                        end_time: this.selectedEvent.end_time,
                        coach_id: this.selectedEvent.coachId || this.selectedEvent.coach_id,
                        activity_id: this.selectedEvent.activityId || this.selectedEvent.activity_id,
                        tab: this.selectedEvent.tab || this.activeTab,
                    }
                );

                if (response.data.success) {
                    await this.loadSchedule();
                    // Update the selected event with new member data
                    this.selectedEvent.memberIds = [...this.eventModalMemberIds];
                    this.$swal({
                        title: 'Success!',
                        text: 'Members assigned successfully',
                        icon: 'success',
                        confirmButtonText: 'OK',
                    });
                } else {
                    this.$swal({
                        title: 'Error!',
                        text: response.data.message || 'Failed to assign members',
                        icon: 'error',
                        confirmButtonText: 'OK',
                    });
                }
            } catch (error) {
                this.$swal({
                    title: 'Error!',
                    text: error.response?.data?.message || 'Failed to assign members',
                    icon: 'error',
                    confirmButtonText: 'OK',
                });
            } finally {
                this.assigningMembers = false;
            }
        },
        closeEventModal() {
            this.selectedEvent = null;
            this.unlockBodyScroll();
        },
        editEvent(event) {
            this.selectedEvent = null;
            
            // Parse start time from 24-hour format (HH:MM) to 12-hour format
            const parseTime = (time24) => {
                if (!time24) return { hour: 2, minute: 0, period: 'PM' };
                
                // Handle different time formats
                let timeStr = time24;
                if (typeof time24 === 'string') {
                    // Remove seconds if present (HH:MM:SS -> HH:MM)
                    timeStr = timeStr.split(':').slice(0, 2).join(':');
                }
                
                const [hours, minutes = '00'] = timeStr.split(':');
                let hour24 = parseInt(hours);
                const minute = parseInt(minutes) || 0;
                
                let period = 'AM';
                let hour12 = hour24;
                
                if (hour24 === 0) {
                    hour12 = 12;
                    period = 'AM';
                } else if (hour24 === 12) {
                    hour12 = 12;
                    period = 'PM';
                } else if (hour24 > 12) {
                    hour12 = hour24 - 12;
                    period = 'PM';
                } else {
                    hour12 = hour24;
                    period = 'AM';
                }
                
                return { hour: hour12, minute, period };
            };
            
            const startTime = parseTime(event.time || event.start_time);
            const endTime = parseTime(event.endTime || event.end_time);
            
            this.eventForm = {
                id: event.id,
                title: event.title || '',
                date: this.formatDate(this.currentDate),
                startTime: event.time || event.start_time || '',
                endTime: event.endTime || event.end_time || '',
                coachId: event.coachId || '',
                memberIds: event.memberIds || (event.memberId ? [event.memberId] : []),
                activityId: event.activityId || '',
                description: event.description || '',
                scheduleId: event.scheduleId || event.schedule_id || '',
                startHour: startTime.hour,
                startMinute: startTime.minute,
                startPeriod: startTime.period,
                endHour: endTime.hour,
                endMinute: endTime.minute,
                endPeriod: endTime.period,
                maxParticipants: event.maxParticipants || event.max_participants || '',
                recurrency: event.recurrency || '',
                locationId: event.locationId || event.location_id || '',
                noteToEmployees: event.noteToEmployees || event.note_to_employees || '',
                bookableInAdvance: event.bookableInAdvance || event.bookable_in_advance || 1,
                bookableUnit: event.bookableUnit || event.bookable_unit || 'weeks',
                creditType: event.creditType || event.credit_type || 'No credits',
                cancelIfNoParticipants: event.cancelIfNoParticipants || event.cancel_if_no_participants || 'always',
                freeCancellationPeriod: event.freeCancellationPeriod || event.free_cancellation_period || 'always',
                link: event.link || '',
                linkText: event.linkText || event.link_text || '',
                showLinkBeforeBooking: event.showLinkBeforeBooking || event.show_link_before_booking || false,
                enableOnlineBooking: event.enableOnlineBooking || event.enable_online_booking || false,
            };
            this.isEditing = true;
            this.showCreateModal = true;
            this.lockBodyScroll();
        },
        async deleteEvent(event) {
            // Close the event modal first to avoid z-index conflicts with SweetAlert
            this.closeEventModal();
            
            // Small delay to ensure modal is closed before showing SweetAlert
            await this.$nextTick();
            
            const result = await this.$swal({
                title: 'Are you sure?',
                text: 'This action cannot be undone!',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Yes, delete it!',
                cancelButtonText: 'Cancel',
            });

            if (result.isConfirmed) {
                try {
                    const response = await axios.delete(`/schedule/events/${event.id}`);
                    
                    if (response.data.success) {
                        await this.loadSchedule();
                        this.$swal({
                            title: 'Deleted!',
                            text: response.data.message || 'Event has been deleted',
                            icon: 'success',
                            confirmButtonText: 'OK',
                        });
                    } else {
                        this.$swal({
                            title: 'Error!',
                            text: response.data.message || 'Failed to delete event',
                            icon: 'error',
                            confirmButtonText: 'OK',
                        });
                    }
                } catch (error) {
                    this.$swal({
                        title: 'Error!',
                        text: error.response?.data?.message || 'Failed to delete event',
                        icon: 'error',
                        confirmButtonText: 'OK',
                    });
                }
            }
        },
        closeCreateModal() {
            this.showCreateModal = false;
            this.isEditing = false;
            this.selectedSlotIndex = null;
            this.eventForm = {
                id: null,
                title: '',
                date: '',
                startTime: '',
                endTime: '',
                coachId: '',
                memberIds: [],
                activityId: '',
                description: '',
                scheduleId: '',
                startHour: 2,
                startMinute: 45,
                startPeriod: 'PM',
                endHour: 3,
                endMinute: 45,
                endPeriod: 'PM',
                maxParticipants: '',
                recurrency: '',
                locationId: '',
                noteToEmployees: '',
                bookableInAdvance: 1,
                bookableUnit: 'weeks',
                creditType: 'No credits',
                cancelIfNoParticipants: 'always',
                freeCancellationPeriod: 'always',
                link: '',
                linkText: '',
                showLinkBeforeBooking: false,
                enableOnlineBooking: false,
            };
            this.unlockBodyScroll();
        },
        lockBodyScroll() {
            document.body.style.overflow = 'hidden';
            document.body.style.paddingRight = '0px';
        },
        unlockBodyScroll() {
            document.body.style.overflow = '';
            document.body.style.paddingRight = '';
        },
        getTabForSchedule(scheduleId) {
            // Map schedule ID to tab name
            const scheduleTabMap = {
                1: 'GROUP TRAINING',
                2: 'Private Gym',
                3: 'Recovery Center Services',
            };
            return scheduleTabMap[scheduleId] || this.activeTab;
        },
        async saveEvent() {
            // Validation - Schedule is required
            if (!this.eventForm.scheduleId) {
                this.$swal({
                    title: 'Validation Error',
                    text: 'Please select a schedule',
                    icon: 'warning',
                    confirmButtonText: 'OK',
                });
                return;
            }

            // Validation - Activity is required for all tabs
            if (!this.eventForm.activityId) {
                this.$swal({
                    title: 'Validation Error',
                    text: 'Please select an activity',
                    icon: 'warning',
                    confirmButtonText: 'OK',
                });
                return;
            }

            // Validation - Max participants is required
            if (!this.eventForm.maxParticipants || this.eventForm.maxParticipants <= 0) {
                this.$swal({
                    title: 'Validation Error',
                    text: 'Please enter max participants (must be greater than 0)',
                    icon: 'warning',
                    confirmButtonText: 'OK',
                });
                return;
            }

            this.saving = true;
            try {
                // Convert time from hour/minute/period format for all tabs
                let startTime = this.convertTimeTo24Hour(
                    `${this.eventForm.startHour}:${String(this.eventForm.startMinute).padStart(2, '0')} ${this.eventForm.startPeriod}`
                );
                let endTime = this.convertTimeTo24Hour(
                    `${this.eventForm.endHour}:${String(this.eventForm.endMinute).padStart(2, '0')} ${this.eventForm.endPeriod}`
                );

                // Determine the tab based on selected schedule
                let eventTab = this.activeTab;
                if (this.eventForm.scheduleId) {
                    eventTab = this.getTabForSchedule(this.eventForm.scheduleId);
                }

                const eventData = {
                    title: this.eventForm.title || this.getActivityName(this.eventForm.activityId),
                    date: this.eventForm.date || this.formatDate(this.currentDate),
                    start_time: startTime,
                    end_time: endTime,
                    coach_id: this.eventForm.coachId || null,
                    member_ids: this.eventForm.memberIds || [],
                    activity_id: this.eventForm.activityId || null,
                    description: this.eventForm.description,
                    tab: eventTab,
                    // My Schedule specific fields
                    schedule_id: this.eventForm.scheduleId || null,
                    max_participants: this.eventForm.maxParticipants || null,
                    recurrency: this.eventForm.recurrency || null,
                    location_id: this.eventForm.locationId || null,
                    note_to_employees: this.eventForm.noteToEmployees || null,
                    bookable_in_advance: this.eventForm.bookableInAdvance || 1,
                    bookable_unit: this.eventForm.bookableUnit || 'weeks',
                    credit_type: this.eventForm.creditType || 'No credits',
                    cancel_if_no_participants: this.eventForm.cancelIfNoParticipants || 'always',
                    free_cancellation_period: this.eventForm.freeCancellationPeriod || 'always',
                    link: this.eventForm.link || null,
                    link_text: this.eventForm.linkText || null,
                    show_link_before_booking: this.eventForm.showLinkBeforeBooking || false,
                    enable_online_booking: this.eventForm.enableOnlineBooking || false,
                };

                let response;
                if (this.isEditing && this.eventForm.id) {
                    response = await axios.put(
                        `/schedule/events/${this.eventForm.id}`,
                        eventData
                    );
                } else {
                    response = await axios.post('/schedule/events', eventData);
                }

                if (response.data.success) {
                    // If a schedule was selected, switch to the corresponding tab before loading
                    if (this.eventForm.scheduleId && !this.isEditing) {
                        const targetTab = this.getTabForSchedule(this.eventForm.scheduleId);
                        if (targetTab !== this.activeTab) {
                            this.activeTab = targetTab;
                        }
                    }
                    
                    // Load schedule with the correct tab
                    await this.loadSchedule();
                    this.closeCreateModal();
                    this.unlockBodyScroll();
                    this.$swal({
                        title: 'Success!',
                        text: `Event ${this.isEditing ? 'updated' : 'created'} successfully`,
                        icon: 'success',
                        confirmButtonText: 'OK',
                    });
                }
            } catch (error) {
                this.$swal({
                    title: 'Error!',
                    text: error.response?.data?.message || 'Failed to save event',
                    icon: 'error',
                    confirmButtonText: 'OK',
                });
            } finally {
                this.saving = false;
            }
        },
        getTabContent(tab) {
            switch (tab) {
                case 'My schedule':
                    return {
                        title: 'Your Personal Schedule',
                        description: 'Your booked classes and personal training sessions will appear here.'
                    };
                case 'Private Gym':
                    return {
                        title: 'Private Gym Sessions',
                        description: 'Book exclusive gym access and personal training sessions.'
                    };
                case 'Recovery Center Services':
                    return {
                        title: 'Recovery Services',
                        description: 'Massage therapy, physiotherapy, and recovery treatments available.'
                    };
                case 'All':
                    return {
                        title: 'All Services',
                        description: 'Complete view of all available fitness and wellness services.'
                    };
                default:
                    return { title: '', description: '' };
            }
        },
        getEventTime(topValue) {
            const index = Math.round(topValue / 64);
            return this.timeSlots[index] || 'Unknown Time';
        },
        formatDate(date) {
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const day = String(date.getDate()).padStart(2, '0');
            return `${year}-${month}-${day}`;
        },
        convertTimeTo24Hour(timeStr) {
            const [time, period] = timeStr.split(' ');
            const [hours, minutes = '00'] = time.split(':');
            let hour24 = parseInt(hours);
            if (period === 'pm' && hour24 !== 12) hour24 += 12;
            if (period === 'am' && hour24 === 12) hour24 = 0;
            return `${String(hour24).padStart(2, '0')}:${minutes}`;
        },
        async loadSchedule() {
            try {
                let params = {
                    tab: this.activeTab
                };
                
                // Add member filter if selected
                // Note: When no member is selected, all events (including those with members) should be returned
                if (this.selectedMemberId) {
                    params.member_id = this.selectedMemberId;
                }
                
                if (this.isMemberView) {
                    // Load week's events
                    const startDate = this.weekDates[0];
                    const endDate = this.weekDates[6];
                    params.start_date = this.formatDate(startDate);
                    params.end_date = this.formatDate(endDate);
                } else {
                    // Load events based on viewMode
                    // For "By Coach" view, load all events for the current date
                    // This ensures events with members assigned to coaches are included
                    if (this.viewMode === '1 day' || this.viewMode === 'By Coach') {
                        params.date = this.formatDate(this.currentDate);
                    } else {
                        // For multi-day views, load date range
                        const dates = this.viewDates;
                        if (dates.length > 0) {
                            params.start_date = this.formatDate(dates[0]);
                            params.end_date = this.formatDate(dates[dates.length - 1]);
                        }
                    }
                }
                
                const response = await axios.get('/schedule/events', { params });
                if (response.data && response.data.success && response.data.data) {
                    this.scheduleEvents = response.data.data.map(event => {
                        const timeIndex = this.timeSlots.findIndex(slot => {
                            const eventTime = event.start_time || event.time;
                            return this.compareTime(slot, eventTime);
                        });
                        const duration = this.calculateDuration(event.start_time, event.end_time);
                        
                        // Parse event date
                        const eventDate = event.date ? new Date(event.date) : (event.start_time ? new Date(`${event.date || this.formatDate(this.currentDate)} ${event.start_time}`) : this.currentDate);
                        
                        return {
                            id: event.id,
                            title: event.title || `${event.activity_name || 'Event'} - ${event.start_time}`,
                            subtitle: event.activity_name || 'Training',
                            time: event.start_time,
                            start_time: event.start_time,
                            endTime: event.end_time,
                            end_time: event.end_time,
                            date: event.date || this.formatDate(eventDate),
                            duration: duration,
                            capacity: event.capacity || '0/10',
                            instructor: event.coach_name || 'Unknown',
                            client: event.member_name || null,
                            clients: event.member_names || (event.member_name ? [event.member_name] : []),
                            location: event.location || 'Studio',
                            description: event.description || '',
                            coachId: event.coach_id,
                            coach_id: event.coach_id,
                            memberId: event.member_id,
                            member_id: event.member_id,
                            memberIds: event.member_ids || (event.member_id ? [event.member_id] : []),
                            memberNames: event.member_names || (event.member_name ? [event.member_name] : []),
                            activityId: event.activity_id,
                            activity_id: event.activity_id,
                            scheduleId: event.schedule_id,
                            schedule_id: event.schedule_id,
                            maxParticipants: event.max_participants,
                            max_participants: event.max_participants,
                            recurrency: event.recurrency,
                            locationId: event.location_id,
                            location_id: event.location_id,
                            noteToEmployees: event.note_to_employees,
                            note_to_employees: event.note_to_employees,
                            bookableInAdvance: event.bookable_in_advance,
                            bookable_in_advance: event.bookable_in_advance,
                            bookableUnit: event.bookable_unit,
                            bookable_unit: event.bookable_unit,
                            creditType: event.credit_type,
                            credit_type: event.credit_type,
                            cancelIfNoParticipants: event.cancel_if_no_participants,
                            cancel_if_no_participants: event.cancel_if_no_participants,
                            freeCancellationPeriod: event.free_cancellation_period,
                            free_cancellation_period: event.free_cancellation_period,
                            link: event.link,
                            linkText: event.link_text,
                            link_text: event.link_text,
                            showLinkBeforeBooking: event.show_link_before_booking,
                            show_link_before_booking: event.show_link_before_booking,
                            enableOnlineBooking: event.enable_online_booking,
                            enable_online_booking: event.enable_online_booking,
                            top: timeIndex >= 0 ? timeIndex * 64 : 0,
                            height: Math.max(duration * 64, 96)
                        };
                    });
                } else {
                    this.scheduleEvents = [];
                }
            } catch (error) {
                this.scheduleEvents = [];
            }
        },
        compareTime(slotTime, eventTime) {
            if (!slotTime || !eventTime) return false;
            
            // Convert slot time (e.g., "12 am", "1 pm") to 24-hour format
            const [slotTimeStr, slotPeriod] = slotTime.split(' ');
            const [slotHours] = slotTimeStr.split(':');
            let slotHour24 = parseInt(slotHours);
            if (slotPeriod === 'pm' && slotHour24 !== 12) slotHour24 += 12;
            if (slotPeriod === 'am' && slotHour24 === 12) slotHour24 = 0;
            
            // Convert event time (e.g., "00:00", "13:30") to hour
            let eventHour24;
            if (eventTime.includes(':')) {
                const [eventHours] = eventTime.split(':');
                eventHour24 = parseInt(eventHours);
            } else {
                // Try to parse if it's in 12-hour format
                const [eventTimeStr, eventPeriod] = eventTime.split(' ');
                const [eventHours] = eventTimeStr.split(':');
                eventHour24 = parseInt(eventHours);
                if (eventPeriod === 'pm' && eventHour24 !== 12) eventHour24 += 12;
                if (eventPeriod === 'am' && eventHour24 === 12) eventHour24 = 0;
            }
            
            // Match if event starts at this time slot (within the same hour)
            return slotHour24 === eventHour24;
        },
        calculateDuration(startTime, endTime) {
            if (!startTime || !endTime) return 1;
            
            // Convert times to minutes for accurate calculation
            const timeToMinutes = (timeStr) => {
                if (!timeStr) return 0;
                
                // Handle 24-hour format (HH:MM)
                if (timeStr.includes(':')) {
                    const [hours, minutes = '00'] = timeStr.split(':');
                    return parseInt(hours) * 60 + parseInt(minutes);
                }
                
                // Handle 12-hour format (e.g., "1 pm", "12 am")
                const [timePart, period] = timeStr.split(' ');
                const [hours] = timePart.split(':');
                let hour24 = parseInt(hours);
                if (period === 'pm' && hour24 !== 12) hour24 += 12;
                if (period === 'am' && hour24 === 12) hour24 = 0;
                const minutes = timePart.includes(':') ? parseInt(timePart.split(':')[1]) : 0;
                return hour24 * 60 + minutes;
            };
            
            const startMinutes = timeToMinutes(startTime);
            const endMinutes = timeToMinutes(endTime);
            
            if (endMinutes <= startMinutes) {
                // If end time is before or equal to start, assume 1 hour duration
                return 1;
            }
            
            const durationMinutes = endMinutes - startMinutes;
            const durationHours = Math.max(1, Math.ceil(durationMinutes / 60));
            
            return durationHours;
        },
        async loadCoaches() {
            try {
                const response = await axios.get('/coaches', {
                    params: { limit: 1000 } // Get all coaches
                });
                if (response.data && response.data.clients) {
                    this.coaches = response.data.clients.map(coach => ({
                        id: coach.id,
                        name: coach.name || `${coach.first_name || ''} ${coach.last_name || ''}`.trim()
                    }));
                } else {
                    this.coaches = [];
                }
            } catch (error) {
                this.coaches = [];
            }
        },
        async loadMembers() {
            try {
                const response = await axios.get('/get_members_without_paginate');
                // The endpoint returns an array directly, not wrapped in an object
                if (response.data && Array.isArray(response.data)) {
                    this.members = response.data
                        .map(member => {
                            const name = member.name || member.membername || `${member.firstname || ''} ${member.lastname || ''}`.trim();
                            return {
                                id: member.id,
                                name: name || `Member #${member.id}` // Fallback to ID if no name
                            };
                        })
                        .filter(member => member.id); // Filter out members without ID
                } else if (response.data && response.data.clients && Array.isArray(response.data.clients)) {
                    // Fallback: handle if response is wrapped in clients key
                    this.members = response.data.clients
                        .map(member => {
                            const name = member.name || member.membername || `${member.firstname || ''} ${member.lastname || ''}`.trim();
                            return {
                                id: member.id,
                                name: name || `Member #${member.id}`
                            };
                        })
                        .filter(member => member.id);
                } else {
                    this.members = [];
                }
            } catch (error) {
                this.members = [];
            }
        },
        async loadSchedules() {
            // Static schedule options
            this.schedules = [
                { id: 1, name: 'Group Training' },
                { id: 2, name: 'Private Gym' },
                { id: 3, name: 'Recovery Center Services' },
            ];
        },
        async loadLocations() {
            // Static location options
            this.locations = [
                { id: 1, name: 'Gym' },
                { id: 2, name: 'Virtual' },
            ];
        },
        async loadActivities() {
            try {
                const response = await axios.get('/schedule/activities');
                if (response.data && response.data.success) {
                    const items = response.data.data || [];
                    this.activities = items.map(a => ({
                        id: a.id,
                        name: a.name || 'Unnamed Activity',
                    })).filter(a => a.id && a.name);
                    this.activityOptions = this.activities.map(a => a.name);
                } else {
                    this.activities = [];
                    this.activityOptions = [];
                }
            } catch (error) {
                this.activities = [];
                this.activityOptions = [];
            }
        },
        openActivityModal() {
            // Hide the create/edit event modal to avoid stacked modal overlays.
            // Keep the form data intact by NOT calling closeCreateModal().
            this.reopenCreateModalAfterActivity = !!this.showCreateModal;
            if (this.showCreateModal) {
                this.showCreateModal = false;
                this.unlockBodyScroll();
            }

            this.activityForm = {
                name: '',
                visible_for: 'gym',
                category: '',
                type: 'duration',
                can_be_added_in_schedule: true,
                color: '#161413',
                met: null,
                default_duration_minutes: null,
                difficulty: 'novice',
                tags: '',
                instructions: '',
                youtube_url_male: '',
                youtube_url_female: '',
            };
            this.showActivityModal = true;
        },
        onActivityModalHide() {
            // Restore create/edit event modal if it was open before creating an activity.
            if (this.reopenCreateModalAfterActivity) {
                this.showCreateModal = true;
                this.lockBodyScroll();
            }
            this.reopenCreateModalAfterActivity = false;
        },
        async saveActivity() {
            if (!this.activityForm.name || this.activityForm.name.trim() === '') {
                this.$swal({
                    title: 'Validation',
                    text: 'Name is required',
                    icon: 'warning',
                    confirmButtonText: 'OK',
                });
                return;
            }

            this.activitySaving = true;
            try {
                const payload = { ...this.activityForm };
                const res = await axios.post('/schedule/activities', payload);

                if (res.data && res.data.success) {
                    const created = res.data.data;
                    this.activities.push({ id: created.id, name: created.name });
                    this.activityOptions = this.activities.map(a => a.name);
                    this.eventForm.activityId = created.id;
                    this.showActivityModal = false;
                    // onActivityModalHide() will restore the create modal (if it was open).

                    this.$swal({
                        title: 'Success!',
                        text: 'Activity created',
                        icon: 'success',
                        confirmButtonText: 'OK',
                    });
                } else {
                    this.$swal({
                        title: 'Error!',
                        text: res.data.message || 'Failed to create activity',
                        icon: 'error',
                        confirmButtonText: 'OK',
                    });
                }
            } catch (e) {
                this.$swal({
                    title: 'Error!',
                    text: e.response?.data?.message || 'Failed to create activity',
                    icon: 'error',
                    confirmButtonText: 'OK',
                });
            } finally {
                this.activitySaving = false;
            }
        },
        getActivityName(activityId) {
            const activity = this.activities.find(a => a.id == activityId);
            return activity ? activity.name : '';
        },
        getEventsForDate(date) {
            const dateStr = this.formatDate(date);
            return this.filteredEvents.filter(event => {
                const eventDate = event.date || this.formatDate(new Date(event.start_time));
                return eventDate === dateStr;
            });
        },
        getEventsForCell(date, time) {
            const dateStr = this.formatDate(date);
            const [timeStr, period] = time.split(' ');
            const [hours] = timeStr.split(':');
            let hour24 = parseInt(hours);
            if (period === 'pm' && hour24 !== 12) hour24 += 12;
            if (period === 'am' && hour24 === 12) hour24 = 0;
            
            return this.filteredEvents.filter(event => {
                const eventDate = event.date || this.formatDate(new Date(event.start_time));
                if (eventDate !== dateStr) return false;
                
                const eventTime = event.start_time || event.time;
                if (!eventTime) return false;
                
                const [eventHours] = eventTime.split(':');
                const eventHour24 = parseInt(eventHours);
                
                // Event should only appear in the exact time slot where it starts
                // Match the exact hour to prevent duplicate displays
                return eventHour24 === hour24;
            });
        },
        getEventsForCoachAndTime(coach, time) {
            const dateStr = this.formatDate(this.currentDate);
            const [timeStr, period] = time.split(' ');
            const [hours] = timeStr.split(':');
            let hour24 = parseInt(hours);
            if (period === 'pm' && hour24 !== 12) hour24 += 12;
            if (period === 'am' && hour24 === 12) hour24 = 0;
            
            return this.filteredEvents.filter(event => {
                // Filter by date
                const eventDate = event.date || this.formatDate(new Date(event.start_time));
                if (eventDate !== dateStr) return false;
                
                // Filter by coach
                if (coach.id === null) {
                    // "Without coach" column - events with no coach
                    if (event.coachId || event.coach_id) return false;
                } else {
                    // Specific coach column - events must match this coach
                    // Also include events that have members assigned to this coach's schedule
                    const eventCoachId = event.coachId || event.coach_id;
                    if (!eventCoachId || eventCoachId != coach.id) return false;
                }
                
                // Filter by time slot
                const eventTime = event.start_time || event.time;
                if (!eventTime) return false;
                
                const [eventHours] = eventTime.split(':');
                const eventHour24 = parseInt(eventHours);
                
                // Event should only appear in the exact time slot where it starts
                // Match the exact hour to prevent duplicate displays
                return eventHour24 === hour24;
            });
        },
        handleCoachCellClick(timeIndex, coach) {
            const selectedTime = this.timeSlots[timeIndex];
            const [time, period] = selectedTime.split(' ');
            const [hours] = time.split(':');
            let hour24 = parseInt(hours);
            if (period === 'pm' && hour24 !== 12) hour24 += 12;
            if (period === 'am' && hour24 === 12) hour24 = 0;
            const hour12 = hour24 > 12 ? hour24 - 12 : (hour24 === 0 ? 12 : hour24);
            
            this.eventForm = {
                id: null,
                title: '',
                date: this.formatDate(this.currentDate),
                startTime: selectedTime,
                endTime: this.timeSlots[Math.min(timeIndex + 1, this.timeSlots.length - 1)],
                coachId: coach.id || '',
                memberIds: [],
                activityId: '',
                description: '',
                scheduleId: '',
                startHour: hour12,
                startMinute: 0,
                startPeriod: period.toUpperCase(),
                endHour: hour12 === 12 ? 1 : (hour12 + 1),
                endMinute: 0,
                endPeriod: period.toUpperCase(),
                maxParticipants: '',
                recurrency: '',
                locationId: '',
                noteToEmployees: '',
                bookableInAdvance: 1,
                bookableUnit: 'weeks',
                creditType: 'No credits',
                cancelIfNoParticipants: 'always',
                freeCancellationPeriod: 'always',
                link: '',
                linkText: '',
                showLinkBeforeBooking: false,
                enableOnlineBooking: false,
            };
            this.isEditing = false;
            this.showCreateModal = true;
            this.lockBodyScroll();
        },
        handleMultiDayCellClick(timeIndex, dayIndex, date) {
            const selectedTime = this.timeSlots[timeIndex];
            const [time, period] = selectedTime.split(' ');
            const [hours] = time.split(':');
            let hour24 = parseInt(hours);
            if (period === 'pm' && hour24 !== 12) hour24 += 12;
            if (period === 'am' && hour24 === 12) hour24 = 0;
            const hour12 = hour24 > 12 ? hour24 - 12 : (hour24 === 0 ? 12 : hour24);
            
            this.currentDate = new Date(date);
            this.eventForm = {
                id: null,
                title: '',
                date: this.formatDate(date),
                startTime: selectedTime,
                endTime: this.timeSlots[Math.min(timeIndex + 1, this.timeSlots.length - 1)],
                coachId: '',
                memberIds: [],
                activityId: '',
                description: '',
                scheduleId: '',
                startHour: hour12,
                startMinute: 0,
                startPeriod: period.toUpperCase(),
                endHour: (hour24 + 1) > 12 ? ((hour24 + 1) - 12 === 0 ? 12 : (hour24 + 1) - 12) : (hour24 + 1 === 12 ? 12 : hour24 + 1),
                endMinute: 0,
                endPeriod: (hour24 + 1) >= 12 ? 'PM' : 'AM',
                maxParticipants: '',
                recurrency: '',
                locationId: '',
                noteToEmployees: '',
                bookableInAdvance: 1,
                bookableUnit: 'weeks',
                creditType: 'No credits',
                cancelIfNoParticipants: 'always',
                freeCancellationPeriod: 'always',
                link: '',
                linkText: '',
                showLinkBeforeBooking: false,
                enableOnlineBooking: false,
            };
            this.isEditing = false;
            this.showCreateModal = true;
            this.lockBodyScroll();
        },
        handleWeeklyCellClick(timeIndex, dayIndex, date) {
            const selectedTime = this.timeSlots[timeIndex];
            const [time, period] = selectedTime.split(' ');
            const [hours] = time.split(':');
            let hour24 = parseInt(hours);
            if (period === 'pm' && hour24 !== 12) hour24 += 12;
            if (period === 'am' && hour24 === 12) hour24 = 0;
            const hour12 = hour24 > 12 ? hour24 - 12 : (hour24 === 0 ? 12 : hour24);
            
            this.currentDate = new Date(date);
            this.eventForm = {
                id: null,
                title: '',
                date: this.formatDate(date),
                startTime: selectedTime,
                endTime: this.timeSlots[Math.min(timeIndex + 1, this.timeSlots.length - 1)],
                coachId: '',
                memberIds: [],
                activityId: '',
                description: '',
                scheduleId: '',
                startHour: hour12,
                startMinute: 0,
                startPeriod: period.toUpperCase(),
                endHour: (hour24 + 1) > 12 ? ((hour24 + 1) - 12 === 0 ? 12 : (hour24 + 1) - 12) : (hour24 + 1 === 12 ? 12 : hour24 + 1),
                endMinute: 0,
                endPeriod: (hour24 + 1) >= 12 ? 'PM' : 'AM',
                maxParticipants: '',
                recurrency: '',
                locationId: '',
                noteToEmployees: '',
                bookableInAdvance: 1,
                bookableUnit: 'weeks',
                creditType: 'No credits',
                cancelIfNoParticipants: 'always',
                freeCancellationPeriod: 'always',
                link: '',
                linkText: '',
                showLinkBeforeBooking: false,
                enableOnlineBooking: false,
            };
            this.isEditing = false;
            this.showCreateModal = true;
            this.lockBodyScroll();
        },
        formatEventTime(time24) {
            if (!time24) return '';
            const [hours, minutes = '00'] = time24.split(':');
            let hour24 = parseInt(hours);
            const period = hour24 >= 12 ? 'pm' : 'am';
            const hour12 = hour24 > 12 ? hour24 - 12 : (hour24 === 0 ? 12 : hour24);
            return `${hour12}:${String(minutes).padStart(2, '0')} ${period}`;
        },
        formatEventDate(dateStr) {
            if (!dateStr) return '';
            const date = new Date(dateStr);
            const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
            const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
            const dayName = days[date.getDay()];
            const day = date.getDate();
            const month = months[date.getMonth()];
            return `${String(day).padStart(2, '0')} ${dayName} ${month}`;
        },
        getCreditText(event) {
            if (event.creditType && event.creditType !== 'No credits') {
                const scheduleName = event.schedule_id === 1 ? 'Group Classes' : 
                                    event.schedule_id === 2 ? 'Private Gym' : 
                                    event.schedule_id === 3 ? 'Recovery Center' : 'Classes';
                return `1 ${scheduleName} Credits`;
            }
            return 'No credits';
        },
        selectMember(member) {
            this.selectedMemberId = member.id;
            this.searchTerm = member.name;
            this.showMemberDropdown = false;
            this.loadSchedule();
        },
        clearMemberFilter() {
            this.selectedMemberId = null;
            this.searchTerm = '';
            this.showMemberDropdown = false;
            this.loadSchedule();
        },
        getMemberName(memberId) {
            const member = this.members.find(m => m.id == memberId);
            return member ? member.name : `Member #${memberId}`;
        },
        handleSearchBlur() {
            // Delay hiding dropdown to allow click events to fire
            setTimeout(() => {
                this.showMemberDropdown = false;
            }, 200);
        },
        setupScrollSync() {
            this.$nextTick(() => {
                let isScrolling = false;
                
                // Sync scroll for single day view
                if (this.$refs.timeColumn && this.$refs.scheduleContent) {
                    const timeCol = this.$refs.timeColumn;
                    const scheduleCont = this.$refs.scheduleContent;
                    
                    scheduleCont.addEventListener('scroll', () => {
                        if (!isScrolling) {
                            isScrolling = true;
                            timeCol.scrollTop = scheduleCont.scrollTop;
                            setTimeout(() => { isScrolling = false; }, 10);
                        }
                    });
                    
                    timeCol.addEventListener('scroll', () => {
                        if (!isScrolling) {
                            isScrolling = true;
                            scheduleCont.scrollTop = timeCol.scrollTop;
                            setTimeout(() => { isScrolling = false; }, 10);
                        }
                    });
                }
                
                // Sync scroll for multi-day view
                if (this.$refs.timeColumn && this.$refs.multiDayContent) {
                    const timeCol = this.$refs.timeColumn;
                    const multiDay = this.$refs.multiDayContent;
                    
                    multiDay.addEventListener('scroll', () => {
                        if (!isScrolling) {
                            isScrolling = true;
                            timeCol.scrollTop = multiDay.scrollTop;
                            setTimeout(() => { isScrolling = false; }, 10);
                        }
                    });
                    
                    timeCol.addEventListener('scroll', () => {
                        if (!isScrolling) {
                            isScrolling = true;
                            multiDay.scrollTop = timeCol.scrollTop;
                            setTimeout(() => { isScrolling = false; }, 10);
                        }
                    });
                }
                
                // Sync scroll for member view (weekly)
                if (this.$refs.timeColumnMember && this.$refs.weeklyContent) {
                    const timeColMem = this.$refs.timeColumnMember;
                    const weekly = this.$refs.weeklyContent;
                    
                    weekly.addEventListener('scroll', () => {
                        if (!isScrolling) {
                            isScrolling = true;
                            timeColMem.scrollTop = weekly.scrollTop;
                            setTimeout(() => { isScrolling = false; }, 10);
                        }
                    });
                    
                    timeColMem.addEventListener('scroll', () => {
                        if (!isScrolling) {
                            isScrolling = true;
                            weekly.scrollTop = timeColMem.scrollTop;
                            setTimeout(() => { isScrolling = false; }, 10);
                        }
                    });
                }
            });
        },
    },
    async mounted() {
        await Promise.all([
            this.loadCoaches(),
            this.loadMembers(),
            this.loadActivities(),
            this.loadSchedules(),
            this.loadLocations()
        ]);
        await this.loadSchedule();
        this.setupScrollSync();
    },
    beforeDestroy() {
        // Ensure body scroll is unlocked when component is destroyed
        this.unlockBodyScroll();
    },
};
</script>

<style lang="scss" scoped>
@use "sass:color";
@import "../../../../assets/styles/sass/_variables.scss";

.container-fluid {
    padding: $padding-md;
    position: relative;
    z-index: 1;
}

/* ===========================================
   BREADCRUMB NAVIGATION STYLES
   =========================================== */

// Breadcrumb and Navigation Row
.breadcrumb-nav-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1.5rem;
    padding: 1rem 0;
    gap: 1rem;
}

// Breadcrumb Navigation Styles
.breadcrumb-section {
    flex: 1;
    
    .breadcrumb-nav {
        .breadcrumb-container {
            display: flex;
            align-items: center;
            gap: 1rem;
            
            .back-button {
                display: flex;
                align-items: center;
                justify-content: center;
                width: 40px;
                height: 40px;
                background: rgba(255, 255, 255, 0.1);
                border: 1px solid rgba(255, 255, 255, 0.2);
                border-radius: 8px;
                color: $color-text-dark;
                cursor: pointer;
                transition: all 0.3s ease;
                
                &:hover {
                    background: rgba(255, 255, 255, 0.15);
                    border-color: rgba(255, 255, 255, 0.3);
                    transform: translateY(-1px);
                    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
                    color: $primary;
                }
                
                i {
                    font-size: 1.1em;
                }
            }
            
            .breadcrumb {
                display: flex;
                align-items: center;
                gap: 0.5rem;
                margin: 0;
                padding: 0;
                background: none;
                border-radius: 0;
                
                .breadcrumb-item {
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                    font-size: $font-size-sm;
                    color: $color-muted;
                    
                    &.active {
                        color: $color-text-dark;
                        font-weight: 600;
                        
                        i {
                            color: $primary;
                        }
                    }
                    
                    a {
                        display: flex;
                        align-items: center;
                        gap: 0.5rem;
                        color: $color-muted;
                        text-decoration: none;
                        transition: color 0.3s ease;
                        
                        &:hover {
                            color: $primary;
                            
                            i {
                                color: $primary;
                            }
                        }
                        
                        i {
                            font-size: 0.9em;
                            transition: color 0.3s ease;
                        }
                    }
                    
                    &:not(:last-child)::after {
                        content: "›";
                        margin-left: 0.5rem;
                        color: $color-muted;
                        font-size: 1.2em;
                    }
                }
            }
        }
    }
}

// Help Section Styles
.help-section {
    display: flex;
    align-items: center;
    
    .help-btn {
        background: white;
        color: #252525;
        border: 1px solid #dcdcdc;
        padding: 8px 15px;
        border-radius: 5px;
        cursor: pointer;
        display: flex;
        align-items: center;
        gap: 8px;
        transition: all 0.3s ease;
        font-size: 14px;
        font-weight: 500;

        &:hover {
            transform: scale(1.05);
            background: #f8f9fa;
            border-color: #dc3545;
            color: #dc3545;
        }

        i {
            font-size: 16px;
        }
    }
}

// Tabs and Controls Row
.tabs-controls-row {
    margin-bottom: 1rem;
}

.tabs-wrapper {
    gap: $margin-md;
}

.tabs {
    display: flex;
    gap: 0.5rem;
    align-items: center;
}

.tab {
    padding: 0.5rem 1rem;
    border-radius: 20px;
    font-size: $font-size-sm;
    font-weight: $font-weight-medium;
    border: none;
    cursor: pointer;
    transition: all 0.2s;
    background: transparent;
    color: $color-muted;
    text-decoration: none;
}

.tab.active {
    background: #000;
    color: $color-white;
}

.tab:not(.active) {
    background: transparent;
    color: $color-text-dark;
    
    &:hover {
        color: $color-heading;
    }
}

.default-toggle {
    display: flex;
    align-items: center;
    
    .toggle-label {
        display: flex;
        align-items: center;
        margin: 0;
        cursor: pointer;
    }
    
    .toggle-input {
        margin-right: 0.5rem;
    }
    
    .toggle-text {
        font-size: $font-size-sm;
        color: $color-text-dark;
    }
    
    .info-icon {
        color: $color-muted;
        font-size: $font-size-sm;
        cursor: help;
    }
}

.tab-content {
    padding: $padding-lg;
    text-align: center;
    color: $color-muted;
    
    h3 {
        font-size: $font-size-lg;
        font-weight: $font-weight-medium;
        margin-bottom: $margin-sm;
    }
}

.controls {
    background: $color-white;
    border-bottom: 1px solid $color-border;
    padding: $padding-md $padding-lg;
}

.controls-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: $margin-sm;
}

.controls-left,
.controls-right {
    display: flex;
    align-items: center;
    gap: $margin-sm;
}

.dropdown {
    position: relative;
    
    .form-control {
        padding: 0.5rem 0.75rem;
        border: 1px solid $color-border;
        border-radius: $border-radius-md;
        font-size: $font-size-sm;
        background: $color-white;
        cursor: pointer;
        min-width: 120px;
    }
}

.search-container {
    position: relative;
    
    .search-input {
        padding: 0.5rem 0.75rem 0.5rem 2.5rem;
        border: 1px solid $color-border;
        border-radius: $border-radius-md;
        font-size: $font-size-sm;
        width: 200px;
        outline: none;
        color: #000;
        
        &:focus {
            border-color: $primary;
        }
    }
    
    .search-icon {
        position: absolute;
        left: 0.75rem;
        top: 50%;
        transform: translateY(-50%);
        color: $color-muted;
        font-size: $font-size-sm;
        pointer-events: none;
    }

    .clear-icon {
        position: absolute;
        right: 0.75rem;
        top: 50%;
        transform: translateY(-50%);
        color: $color-muted;
        font-size: $font-size-sm;
        cursor: pointer;
        z-index: 10;
        
        &:hover {
            color: $color-heading;
        }
    }

    .member-dropdown {
        position: absolute;
        top: 100%;
        left: 0;
        right: 0;
        background: $color-white;
        border: 1px solid $color-border;
        border-radius: $border-radius-md;
        box-shadow: $box-shadow-lg;
        max-height: 300px;
        overflow-y: auto;
        z-index: 1000;
        margin-top: 4px;

        .member-dropdown-item {
            padding: 0.75rem 1rem;
            cursor: pointer;
            font-size: $font-size-sm;
            color: $color-text-dark;
            transition: background-color 0.2s;
            border-bottom: 1px solid $color-border;

            &:last-child {
                border-bottom: none;
            }

            &:hover {
                background-color: #f9fafb;
            }

            &.no-results {
                color: $color-muted;
                cursor: default;
                font-style: italic;

                &:hover {
                    background-color: transparent;
                }
            }
        }
    }
}

.calendar-header {
    background: $color-white;
    border-bottom: 1px solid $color-border;
    padding: $padding-md $padding-lg;
}

.calendar-nav {
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.calendar-nav-link {
    color: #007bff;
    text-decoration: none;
    font-size: $font-size-sm;
    cursor: pointer;
    transition: color 0.2s;
    
    &:hover {
        color: #0056b3;
        text-decoration: none;
    }
}

.calendar-title {
    font-size: $font-size-lg;
    font-weight: $font-weight-semibold;
    color: $color-heading;
    margin: 0;
    display: flex;
    align-items: center;
    gap: $margin-sm;
    
    .member-filter-badge {
        display: inline-flex;
        align-items: center;
        gap: $margin-xs;
        padding: $padding-xs $padding-sm;
        background: $primary;
        color: $color-white;
        border-radius: $border-radius-sm;
        font-size: $font-size-sm;
        font-weight: $font-weight-normal;
        margin-left: $margin-sm;
        
        i {
            font-size: 0.9em;
        }
    }
    align-items: center;
    gap: $margin-xs;
    
    .calendar-icon {
        color: $primary;
        font-size: $font-size-base;
    }
}

.schedule-grid {
    background: $color-white;
    display: flex;
    border: 1px solid $color-border;
    border-top: none;
    min-height: 600px;
    max-height: calc(100vh - 400px);
    overflow: hidden; // Prevent double scrollbars
    position: relative;
    align-items: flex-start; // Align items to top
}

.time-column {
    width: 80px;
    border-right: 1px solid $color-border;
    flex-shrink: 0;
    background: $color-white;
    display: flex;
    flex-direction: column;
    max-height: calc(100vh - 400px);
    height: calc(100vh - 400px);
    overflow-y: auto !important; // Make time column scrollable
    overflow-x: hidden;
    scrollbar-width: thin;
    position: relative;
    
    &::-webkit-scrollbar {
        width: 6px;
    }
    
    &::-webkit-scrollbar-thumb {
        background: #ccc;
        border-radius: 3px;
    }
    
    &::-webkit-scrollbar-track {
        background: transparent;
    }
}

.time-header {
    height: 60px;
    min-height: 60px;
    border-bottom: 1px solid $color-border;
    background: #f9fafb;
    flex-shrink: 0;
    position: sticky;
    top: 0;
    z-index: 21;
    display: flex;
    align-items: center;
    justify-content: center;
}

.time-slot {
    height: 64px;
    min-height: 64px;
    max-height: 64px;
    border-bottom: 1px solid $color-border;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: $font-size-sm;
    color: $color-text-dark;
    padding: 0 $padding-xs;
    background: $color-white;
    flex-shrink: 0;
    font-weight: $font-weight-medium;
    box-sizing: border-box;
}

.schedule-content {
    flex: 1;
    position: relative;
    overflow-x: auto;
    overflow-y: auto; // Add vertical scrolling to schedule-content
    max-height: calc(100vh - 400px); // Match parent max-height
    scrollbar-width: thin;
    
    // Sync scroll with time column if needed
    &::-webkit-scrollbar {
        width: 8px;
    }
}

.schedule-header {
    height: 60px;
    border-bottom: 1px solid $color-border;
    background: #f9fafb;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: $font-size-sm;
    font-weight: $font-weight-medium;
    color: $color-heading;
    position: sticky;
    top: 0;
    z-index: 10;
}

.schedule-slots {
    position: relative;
    min-height: 1536px; // 24 hours * 64px
    z-index: 1;
}

.schedule-slot {
    height: 64px;
    border-bottom: 1px solid $color-border;
    
    &.clickable {
        cursor: pointer;
        
        &:hover {
            background: rgba($primary, 0.05);
        }
    }
}

.event {
    position: absolute;
    left: 4px;
    right: 4px;
    background: #31bff5;
    color: $color-white;
    padding: 0.5rem;
    border-radius: $border-radius-sm;
    cursor: pointer;
    transition: all 0.2s;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    z-index: 100;
    pointer-events: auto;
    

}

.event-title {
    color: $color-white;
    font-size: $font-size-sm;
    font-weight: $font-weight-semibold;
    margin-bottom: 0.25rem;
}

.event-subtitle,
.event-capacity,
.event-time {
    color: rgba($color-white, 0.9);
    font-size: $font-size-xs;
    margin-top: 0.25rem;
}

.event-location {
    color: rgba($color-white, 0.9);
    font-size: $font-size-xs;
    margin-top: 0.25rem;
}

// No Events Message Styles
.no-events-message,
.no-events-message-multi-day,
.no-events-message-weekly {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
    padding: $padding-lg;
    background: rgba($color-white, 0.95);
    border: 1px solid $color-border;
    border-radius: $border-radius-md;
    box-shadow: $box-shadow-md;
    z-index: 50;
    min-width: 300px;
    
    p {
        margin: 0;
        font-size: $font-size-base;
        color: $color-text-dark;
        
        strong {
            color: $color-heading;
            font-weight: $font-weight-semibold;
        }
    }
}

.no-events-message-multi-day {
    position: relative;
    grid-column: 1 / -1; // Span all columns
    transform: none;
    margin: $margin-lg auto;
    width: fit-content;
}

.no-events-message-weekly {
    position: relative;
    grid-column: 1 / -1; // Span all columns
    transform: none;
    margin: $margin-lg auto;
    width: fit-content;
}

// Weekly Grid Styles (Member View)
.weekly-grid {
    .weekly-content {
        flex: 1;
        display: flex;
        flex-direction: column;
        overflow-x: auto;
        overflow-y: auto; // Add vertical scrolling
        max-height: calc(100vh - 400px); // Match parent max-height
    }

    .weekly-header {
        display: grid;
        grid-template-columns: repeat(7, 1fr);
        border-bottom: 1px solid $color-border;
        background: #f9fafb;
        position: sticky;
        top: 0;
        z-index: 10;
    }

    .day-header {
        padding: $padding-sm $padding-xs;
        text-align: center;
        border-right: 1px solid $color-border;
        
        &:last-child {
            border-right: none;
        }
    }

    .day-name {
        font-size: $font-size-xs;
        font-weight: $font-weight-medium;
        color: $color-muted;
        margin-bottom: 0.25rem;
    }

    .day-date {
        font-size: $font-size-sm;
        font-weight: $font-weight-semibold;
        color: $color-heading;
    }

    .weekly-slots {
        display: flex;
        flex-direction: column;
        min-height: 1536px; // 24 hours * 64px
    }

    .weekly-row {
        display: grid;
        grid-template-columns: repeat(7, 1fr);
        border-bottom: 1px solid $color-border;
        min-height: 64px;
    }

    .weekly-cell {
        position: relative;
        border-right: 1px solid $color-border;
        min-height: 64px;
        padding: 2px;
        
        &:last-child {
            border-right: none;
        }
        
        &.clickable {
            cursor: pointer;
            
            &:hover {
                background: rgba($primary, 0.05);
            }
        }
    }

    .weekly-event {
        position: relative;
        background: #31bff5;
        color: $color-white;
        padding: 0.5rem;
        border-radius: $border-radius-sm;
        margin-bottom: 2px;
        cursor: pointer;
        transition: all 0.2s;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        z-index: 100;
        pointer-events: auto;
        
        &:hover {
            background: $color-button-hover;
            transform: translateY(-1px);
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
        }
    }

    .event-time {
        color: rgba($color-white, 0.9);
        font-size: $font-size-xs;
        margin-top: 0.25rem;
    }

    .event-instructor {
        color: rgba($color-white, 0.9);
        font-size: $font-size-xs;
        margin-top: 0.25rem;
    }

    .event-location {
        color: rgba($color-white, 0.9);
        font-size: $font-size-xs;
        margin-top: 0.25rem;
    }
}

// Multi-Day Grid Styles (Coach View - 3 days, 1 week, By Coach)
.multi-day-grid {
    .multi-day-content {
        flex: 1;
        display: flex;
        flex-direction: column;
        overflow-x: auto;
        overflow-y: auto; // Add vertical scrolling
        max-height: calc(100vh - 400px); // Match parent max-height
    }

    .multi-day-header {
        display: grid;
        grid-template-columns: repeat(var(--days-count, 7), 1fr);
        border-bottom: 1px solid $color-border;
        background: #f9fafb;
        position: sticky;
        top: 0;
        z-index: 10;

        .day-header {
            padding: $padding-sm $padding-xs;
            text-align: center;
            border-right: 1px solid $color-border;
            
            &:last-child {
                border-right: none;
            }
        }

        .day-name {
            font-size: $font-size-xs;
            font-weight: $font-weight-medium;
            color: $color-muted;
            margin-bottom: 0.25rem;
        }

        .day-date {
            font-size: $font-size-sm;
            font-weight: $font-weight-semibold;
            color: $color-heading;
        }
    }

    .multi-day-slots {
        display: flex;
        flex-direction: column;
        min-height: 1536px; // 24 hours * 64px
    }

    .multi-day-row {
        display: grid;
        grid-template-columns: repeat(var(--days-count, 7), 1fr);
        border-bottom: 1px solid $color-border;
        min-height: 64px;
    }

    .multi-day-cell {
        position: relative;
        border-right: 1px solid $color-border;
        min-height: 64px;
        padding: 2px;
        
        &:last-child {
            border-right: none;
        }
        
        &.clickable {
            cursor: pointer;
            
            &:hover {
                background: rgba($primary, 0.05);
            }
        }
    }

    .multi-day-event {
        position: relative;
        background: $primary;
        color: $color-white;
        padding: 0.5rem;
        border-radius: $border-radius-sm;
        margin-bottom: 2px;
        cursor: pointer;
        transition: all 0.2s;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        z-index: 100;
        pointer-events: auto;
        
        &:hover {
            background: $color-button-hover;
            transform: translateY(-1px);
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
        }
    }
}

// By Coach Grid Styles
.coach-content {
    flex: 1;
    display: flex;
    flex-direction: column;
    overflow-x: auto;
    overflow-y: auto;
    max-height: calc(100vh - 400px);
}

.coach-header {
    display: grid;
    grid-template-columns: repeat(var(--coaches-count, 5), 1fr);
    border-bottom: 1px solid $color-border;
    background: #f9fafb;
    position: sticky;
    top: 0;
    z-index: 10;

    .coach-header-item {
        padding: $padding-sm $padding-xs;
        text-align: center;
        border-right: 1px solid $color-border;
        font-size: $font-size-sm;
        font-weight: $font-weight-semibold;
        color: $color-heading;
        
        &:last-child {
            border-right: none;
        }
    }
}

.coach-slots {
    display: flex;
    flex-direction: column;
    min-height: 1536px; // 24 hours * 64px
}

.coach-row {
    display: grid;
    grid-template-columns: repeat(var(--coaches-count, 5), 1fr);
    border-bottom: 1px solid $color-border;
    min-height: 64px;
}

.coach-cell {
    position: relative;
    border-right: 1px solid $color-border;
    min-height: 64px;
    padding: 2px;
    
    &:last-child {
        border-right: none;
    }
    
    &.clickable {
        cursor: pointer;
        
        &:hover {
            background: rgba($primary, 0.05);
        }
    }
}

.coach-event {
    position: relative;
    background: #31bff5;
    color: $color-white;
    padding: 0.5rem;
    border-radius: $border-radius-sm;
    margin-bottom: 2px;
    cursor: pointer;
    transition: all 0.2s;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    z-index: 100;
    pointer-events: auto;
    
    &:hover {
        background: color.adjust(#31bff5, $lightness: -10%);
        transform: translateY(-1px);
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
    }
}

.event-member-name {
    font-size: $font-size-xs;
    color: rgba($color-white, 0.9);
    margin-top: 0.125rem;
}

.no-events-message-coach {
    position: relative;
    grid-column: 1 / -1;
    transform: none;
    margin: $margin-lg auto;
    width: fit-content;
    text-align: center;
    padding: $padding-lg;
    background: rgba($color-white, 0.95);
    border: 1px solid $color-border;
    border-radius: $border-radius-md;
    box-shadow: $box-shadow-md;
    z-index: 50;
    
    p {
        margin: 0;
        font-size: $font-size-base;
        color: $color-text-dark;
        
        strong {
            color: $color-heading;
            font-weight: $font-weight-semibold;
        }
    }
}

.modal-backdrop.event-details-modal {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: $color-overlay;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1050; // Standard Bootstrap modal z-index
    opacity: 1 !important;
    padding: $padding-md;
    overflow-y: auto;
}

.modal-backdrop {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: $color-overlay;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1050; // Standard Bootstrap modal z-index
    opacity: 1 !important;
}

.modal-box {
    background-color: $color-card-bg;
    padding: 2rem;
    border-radius: 10px;
    width: 100%;
    max-width: 500px;
    box-shadow: $shadow-lg;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    opacity: 1 !important;
    position: relative;
    z-index: 1051; // Slightly above backdrop
}

.event-details-modal .modal-box {
    max-width: 500px;
    background-color: $color-white;
    padding: $padding-lg;
}

.event-details-box {
    max-width: 600px !important;
    width: auto;
    padding: 0 !important;
    display: flex;
    flex-direction: column;
    max-height: 85vh;
    overflow: hidden;
}

.event-modal-header {
    padding: $padding-md $padding-lg;
    border-bottom: 1px solid #e5e7eb;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: $color-white;
    flex-shrink: 0;
}

.event-modal-title {
    font-size: $font-size-lg;
    font-weight: $font-weight-semibold;
    color: $color-heading;
    margin: 0;
    line-height: 1.4;
}

.event-modal-close {
    background: none;
    border: none;
    font-size: 1.5rem;
    color: #6b7280;
    cursor: pointer;
    padding: 0;
    width: 28px;
    height: 28px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.2s;
    border-radius: 4px;
    
    &:hover {
        color: $color-heading;
        background: #f3f4f6;
    }
}

.event-modal-content-wrapper {
    padding: $padding-lg;
    overflow-y: auto;
    flex: 1;
}

.event-details-grid {
    display: flex;
    flex-direction: column;
    gap: $margin-sm;
}

.event-detail-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: $margin-md;
}

.event-detail-col {
    display: flex;
    align-items: flex-start;
    gap: $margin-sm;
    padding: $padding-sm;
    border-radius: 6px;
    transition: background 0.15s;
    
    &:hover {
        background: #f9fafb;
    }
}

.event-detail-icon {
    font-size: $font-size-base;
    color: #6b7280;
    width: 18px;
    flex-shrink: 0;
    margin-top: 2px;
    text-align: center;
}

.event-detail-info {
    display: flex;
    flex-direction: column;
    gap: 2px;
    flex: 1;
    min-width: 0;
}

.event-detail-label {
    font-size: 11px;
    color: #9ca3af;
    font-weight: $font-weight-medium;
    text-transform: uppercase;
    letter-spacing: 0.3px;
    line-height: 1.2;
}

.event-detail-value {
    font-size: $font-size-sm;
    color: $color-heading;
    font-weight: $font-weight-normal;
    line-height: 1.4;
    word-break: break-word;
    
    &.coach-name {
        color: $primary;
        font-weight: $font-weight-medium;
    }
}

.event-modal-actions {
    padding: $padding-md $padding-lg;
    border-top: 1px solid #e5e7eb;
    display: flex;
    justify-content: flex-end;
    gap: $margin-sm;
    background: #f9fafb;
    flex-shrink: 0;
}

.event-modal-actions .btn {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 6px 12px;
    font-size: $font-size-sm;
    font-weight: $font-weight-medium;
    border-radius: 4px;
    border: 1px solid transparent;
    cursor: pointer;
    transition: all 0.15s;
    
    i {
        font-size: 12px;
    }
    
    &.btn-primary {
        background: $primary;
        color: $color-white;
        border-color: $primary;
        
        &:hover {
            background: color.adjust($primary, $lightness: -5%);
            border-color: color.adjust($primary, $lightness: -5%);
        }
    }
    
    &.btn-danger {
        background: #ef4444;
        color: $color-white;
        border-color: #ef4444;
        
        &:hover {
            background: #dc2626;
            border-color: #dc2626;
        }
    }
}

.event-member-assignment {
    margin-top: $margin-lg;
    padding-top: $margin-lg;
    border-top: 1px solid #e5e7eb;
}

.assignment-header {
    margin-bottom: $margin-md;
}

.assignment-title {
    font-size: $font-size-base;
    font-weight: $font-weight-semibold;
    color: $color-heading;
    margin: 0;
    display: flex;
    align-items: center;
    gap: $margin-sm;
    
    i {
        color: $primary;
        font-size: $font-size-sm;
    }
}

.assignment-content {
    .form-group {
        margin-bottom: $margin-md;
    }
    
    .form-label {
        font-size: $font-size-sm;
        font-weight: $font-weight-medium;
        color: $color-heading;
        margin-bottom: $margin-xs;
        display: block;
    }
    
    .form-control-sm {
        font-size: $font-size-sm;
        padding: $padding-xs $padding-sm;
    }
    
    .selected-members {
        .badge {
            font-size: 11px;
            padding: 2px 6px;
            margin-right: 4px;
        }
    }
    
    .form-text {
        font-size: 11px;
        color: #6b7280;
        margin-top: 4px;
    }
}

.input-with-icon {
    position: relative;
    
    .input-icon {
        position: absolute;
        right: 10px;
        top: 50%;
        transform: translateY(-50%);
        color: #9ca3af;
        font-size: $font-size-sm;
        pointer-events: none;
    }
    
    select {
        padding-right: 35px;
    }
}


.modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: $padding-lg $padding-lg $padding-md $padding-lg;
    border-bottom: 1px solid $color-border;
    flex-shrink: 0;
    background: #ffffff !important;
    border-radius: $border-radius-lg $border-radius-lg 0 0;
    position: relative;
    z-index: 2;
}

.modal-title {
    font-size: $font-size-xl;
    font-weight: $font-weight-bold;
    color: $color-heading;
    margin: 0;
}

.modal-close {
    background: none;
    border: none;
    font-size: $font-size-xxl;
    color: $color-muted;
    cursor: pointer;
    line-height: 1;
    padding: 0;
    width: 30px;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    
    &:hover {
        color: $color-heading;
    }
}

.modal-body {
    margin-bottom: $margin-md;
    
    p {
        margin-bottom: $margin-sm;
        font-size: $font-size-sm;
        color: $color-text-dark;
        
        strong {
            font-weight: $font-weight-semibold;
            color: $color-heading;
        }
    }
}

.modal-footer {
    display: flex;
    justify-content: flex-end;
    gap: $margin-sm;
    padding-top: $margin-sm;
    border-top: 1px solid $color-border;
}

.modal-box {
    background-color: $color-card-bg;
    padding: 2rem;
    border-radius: 10px;
    width: 100%;
    max-width: 700px;
    box-shadow: $shadow-lg;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    opacity: 1 !important;
    display: flex;
    flex-direction: column;
    max-height: 90vh;
    overflow-y: auto;
    
    &.comprehensive-modal {
        max-width: 800px;
    }
}

.modal-content-wrapper {
    padding: $padding-lg;
    overflow-y: auto;
    flex: 1;
    min-height: 0;
    background: #ffffff !important;
    position: relative;
    z-index: 1;
}

.modal-box h3,
.modal-title {
    font-size: $font-size-xl;
    margin-bottom: 0;
    color: #000000 !important;
    font-weight: $font-weight-bold;
}

.form-group {
    margin-bottom: $margin-md;
    
    label {
        display: block;
        font-size: $font-size-sm;
        font-weight: $font-weight-medium;
        color: #333333 !important;
        margin-bottom: $margin-xs;
    }
    
    .form-control {
        width: 100%;
        padding: 5px;
        border: 1px solid #ddd !important;
        border-radius: $border-radius-md;
        font-size: $font-size-sm;
        transition: border-color 0.3s ease;
        background: #ffffff !important;
        color: #333333 !important;
        
        &:focus {
            outline: none;
            border-color: $primary !important;
            box-shadow: 0 0 0 3px rgba($primary, 0.1);
            background: #ffffff !important;
        }
        
        &:disabled {
            background: #f5f5f5 !important;
            color: #666666 !important;
        }
    }
    
    textarea.form-control {
        resize: vertical;
        background: #ffffff !important;
        color: #333333 !important;
    }
}

.modal-actions {
    display: flex;
    justify-content: flex-end;
    gap: $margin-sm;
    margin-top: $margin-lg;
    padding-top: $margin-md;
    border-top: 1px solid $color-border;
    flex-shrink: 0;
    
    .btn {
        min-width: 100px;
        padding: $padding-sm $padding-md;
        border-radius: $border-radius-md;
        font-size: $font-size-sm;
        font-weight: $font-weight-medium;
        cursor: pointer;
        transition: all 0.3s ease;
        border: none;
        
        &.btn-primary {
            background: $primary;
            color: $color-white;
            
            &:hover:not(:disabled) {
                background: $color-button-hover;
            }
        }
        
        &.btn-secondary {
            background: $color-white;
            color: $color-heading;
            border: 1px solid $color-border;
            
            &:hover:not(:disabled) {
                background: #f9fafb;
            }
        }
        
        &:disabled {
            opacity: 0.6;
            cursor: not-allowed;
        }
    }
}

// Comprehensive form styles
.comprehensive-form {
    background: #ffffff !important;
    
    .form-group {
        margin-bottom: $margin-md;
    }
    
    label {
        display: block;
        font-size: $font-size-sm;
        font-weight: $font-weight-medium;
        color: #333333 !important;
        margin-bottom: $margin-xs;
    }
}

.time-input-group {
    display: flex;
    gap: $margin-xs;
    align-items: center;
    
    .time-select {
        flex: 1;
        min-width: 80px;
    }
}

.input-with-icon {
    position: relative;
    
    .input-icon {
        position: absolute;
        right: 12px;
        top: 50%;
        transform: translateY(-50%);
        color: $color-muted;
        font-size: $font-size-sm;
        pointer-events: none;
    }
}

.input-group-combined {
    display: flex;
    gap: $margin-xs;
    
    input {
        flex: 1;
        min-width: 80px;
    }
    
    select {
        flex: 1;
        min-width: 120px;
    }
}

.input-with-actions {
    position: relative;
    display: flex;
    align-items: center;
    gap: $margin-xs;
    
    .form-control {
        flex: 1;
    }
    
    .action-icon,
    .info-icon {
        color: $color-muted;
        font-size: $font-size-sm;
        cursor: pointer;
        
        &:hover {
            color: $primary;
        }
    }
}

.input-with-info {
    position: relative;
    display: flex;
    align-items: center;
    gap: $margin-xs;
    
    .form-control {
        flex: 1;
    }
    
    .info-icon {
        color: $color-muted;
        font-size: $font-size-sm;
        cursor: help;
        flex-shrink: 0;
    }
}

.toggle-label-inline {
    display: flex;
    align-items: center;
    gap: $margin-sm;
    cursor: pointer;
    
    span {
        flex: 1;
    }
    
    .info-icon {
        color: $color-muted;
        font-size: $font-size-sm;
        cursor: help;
    }
}

.switch {
    position: relative;
    display: inline-block;
    width: 50px;
    height: 24px;
    
    input {
        opacity: 0;
        width: 0;
        height: 0;
    }
    
    .slider {
        position: absolute;
        cursor: pointer;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: #ccc;
        transition: 0.4s;
        border-radius: 24px;
        
        &:before {
            position: absolute;
            content: "";
            height: 18px;
            width: 18px;
            left: 3px;
            bottom: 3px;
            background-color: white;
            transition: 0.4s;
            border-radius: 50%;
        }
    }
    
    input:checked + .slider {
        background-color: $primary;
    }
    
    input:checked + .slider:before {
        transform: translateX(26px);
    }
}

.checkbox-label {
    display: flex;
    align-items: center;
    gap: $margin-xs;
    cursor: pointer;
    
    .checkbox-input {
        width: 18px;
        height: 18px;
        cursor: pointer;
    }
    
    span {
        font-size: $font-size-sm;
        color: $color-heading;
    }
}

@keyframes fadeIn {
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
}

@keyframes slideUp {
    from {
        opacity: 0;
        transform: translateY(20px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

@keyframes fadeInScale {
    from {
        opacity: 0;
        transform: scale(0.95);
    }
    to {
        opacity: 1;
        transform: scale(1);
    }
}

// Responsive Design
@media (max-width: $breakpoint-md) {
    .breadcrumb-nav-row {
        flex-direction: column;
        align-items: flex-start;
        gap: 1rem;
    }
    
    .breadcrumb-section {
        width: 100%;
        
        .breadcrumb-container {
            flex-direction: column;
            align-items: flex-start;
            gap: 0.5rem;
            
            .breadcrumb {
                flex-wrap: wrap;
                
                .breadcrumb-item {
                    font-size: 0.8rem;
                    
                    a {
                        font-size: 0.8rem;
                    }
                }
            }
        }
    }
    
    .help-section {
        width: 100%;
        justify-content: flex-end;
        
        .help-btn {
            font-size: 0.8rem;
            padding: 0.4rem 0.8rem;
        }
    }
    
    .tabs-wrapper {
        width: 100%;
        flex-direction: column;
        align-items: flex-start;
    }
    
    .controls-row {
        flex-direction: column;
        align-items: stretch;
    }
    
    .controls-left,
    .controls-right {
        width: 100%;
        flex-wrap: wrap;
    }
    
    .search-container .search-input {
        width: 100%;
    }
}

// Comprehensive form styles
.comprehensive-form {
    background: #ffffff !important;
    
    .form-group {
        margin-bottom: $margin-md;
    }
    
    label {
        display: block;
        font-size: $font-size-sm;
        font-weight: $font-weight-medium;
        color: #333333 !important;
        margin-bottom: $margin-xs;
    }
}

.time-input-group {
    display: flex;
    gap: $margin-xs;
    align-items: center;
    
    .time-select {
        flex: 1;
        min-width: 80px;
    }
}

.input-with-icon {
    position: relative;
    
    .input-icon {
        position: absolute;
        right: 12px;
        top: 50%;
        transform: translateY(-50%);
        color: $color-muted;
        font-size: $font-size-sm;
        pointer-events: none;
    }
    
    .form-control {
        padding-right: 40px;
    }
}

.input-group-combined {
    display: flex;
    gap: $margin-xs;
    
    input {
        flex: 1;
        min-width: 80px;
    }
    
    select {
        flex: 1;
        min-width: 120px;
    }
}

.input-with-actions {
    position: relative;
    display: flex;
    align-items: center;
    gap: $margin-xs;
    
    .form-control {
        flex: 1;
    }
    
    .action-icon,
    .info-icon {
        color: $color-muted;
        font-size: $font-size-sm;
        cursor: pointer;
        flex-shrink: 0;
        
        &:hover {
            color: $primary;
        }
    }
}

.input-with-info {
    position: relative;
    display: flex;
    align-items: center;
    gap: $margin-xs;
    
    .form-control {
        flex: 1;
    }
    
    .info-icon {
        color: $color-muted;
        font-size: $font-size-sm;
        cursor: help;
        flex-shrink: 0;
    }
}

.toggle-label-inline {
    display: flex;
    align-items: center;
    gap: $margin-sm;
    cursor: pointer;
    margin-bottom: 0;
    
    span {
        flex: 1;
    }
    
    .info-icon {
        color: $color-muted;
        font-size: $font-size-sm;
        cursor: help;
        flex-shrink: 0;
    }
}

.switch {
    position: relative;
    display: inline-block;
    width: 50px;
    height: 24px;
    flex-shrink: 0;
    
    input {
        opacity: 0;
        width: 0;
        height: 0;
    }
    
    .slider {
        position: absolute;
        cursor: pointer;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: #ccc;
        transition: 0.4s;
        border-radius: 24px;
        
        &:before {
            position: absolute;
            content: "";
            height: 18px;
            width: 18px;
            left: 3px;
            bottom: 3px;
            background-color: white;
            transition: 0.4s;
            border-radius: 50%;
        }
    }
    
    input:checked + .slider {
        background-color: $primary;
    }
    
    input:checked + .slider:before {
        transform: translateX(26px);
    }
}

.checkbox-label {
    display: flex;
    align-items: center;
    gap: $margin-xs;
    cursor: pointer;
    margin-bottom: 0;
    
    .checkbox-input {
        width: 18px;
        height: 18px;
        cursor: pointer;
        flex-shrink: 0;
    }
    
    span {
        font-size: $font-size-sm;
        color: $color-heading;
    }
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
</style>

<style lang="scss">
/* Ensure the Schedule Activity modal always appears above custom in-component modals */
#schedule-activity-modal {
  z-index: 20050 !important;
}

/* BootstrapVue backdrop id convention: {id}___BV_modal_backdrop_ */
#schedule-activity-modal___BV_modal_backdrop_ {
  z-index: 20040 !important;
}

/* Ensure Bootstrap Vue toasts appear above modals */
:deep(.b-toast) {
  z-index: 1100 !important;
}

:deep(.b-toast-slot) {
  z-index: 1100 !important;
}
</style>
