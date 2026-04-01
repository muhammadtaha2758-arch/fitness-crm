<template>
  <div class="container-fluid">
    <!-- Navigation -->
    <div class="nav-header d-flex justify-content-between">
      <div class="nav-title">
        <h1 class="title">Schedules</h1>
      </div>

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
    </div>

    <!-- Tab Content for non-GROUP TRAINING tabs -->
    <div v-if="activeTab !== 'GROUP TRAINING'" class="tab-content">
      <h3>{{ getTabContent(activeTab).title }}</h3>
      <p>{{ getTabContent(activeTab).description }}</p>
    </div>

    <!-- GROUP TRAINING Content -->
    <div v-if="activeTab === 'GROUP TRAINING'">
      <!-- Controls -->
      <div class="controls">
        <div class="controls-row">
          <div class="controls-left">
            <div class="dropdown">
              <select v-model="viewOptions">
  <option disabled>Options</option>
  <option>Export</option>
  <option>New Event</option>
</select>

            </div>

            <div class="dropdown">
              <select v-model="staffView">
                <option>Staff view</option>
                <option>Member view</option>
              </select>
            </div>

            <div class="dropdown">
              <select v-model="viewMode">
                <option>1 day</option>
                <option>3 days</option>
                <option>1 week</option>
                <option>1 month</option>
              </select>
            </div>
          </div>

          <div class="controls-right">
<div class="dropdown">
  <select v-model="selectedMember" class="btn" id="memberSelect" name="memberSelect">
    <option value="">All Members</option>
    <option
      v-for="member in filteredMembers"
      :key="member.name"
      :value="member.name"
    >
      {{ member.name }}
    </option>
  </select>
</div>


            <div class="dropdown">
              <select v-model="selectedActivity" class="btn">
                <option value="">All Activities</option>
                <option v-for="activity in activityOptions" :key="activity" :value="activity">
                  {{ activity }}
                </option>
              </select>
            </div>

            <div class="dropdown">
              <select v-model="selectedCoach" class="btn">
                <option value="">All Coaches</option>
                <option v-for="coach in coachOptions" :key="coach" :value="coach">
                  {{ coach }}
                </option>
              </select>
            </div>

          </div>
        </div>
      </div>

      <!-- Calendar Header -->
      <div class="calendar-header">
        <div class="calendar-nav">
          <button class="calendar-nav-btn" @click="goToPreviousDate">
            <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m15 19-7-7 7-7"></path>
            </svg>
            Previous
          </button>

          <h2 class="calendar-title">
            GROUP TRAINING {{ formattedDate }}
          </h2>

          <button class="calendar-nav-btn" @click="goToNextDate">
            Next
            <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m9 5 7 7-7 7"></path>
            </svg>
          </button>
        </div>
      </div>

      <!-- Schedule Grid -->
      <div class="schedule-grid">
        <div class="time-column">
          <div class="time-header"></div>
          <div v-for="time in timeSlots" :key="time" class="time-slot">
            {{ time }}
          </div>
        </div>

        <div class="schedule-content">
          <div class="schedule-header">{{ formattedDate }}</div>

          <div class="schedule-slots">
            <div
              v-for="(slot, index) in timeSlots"
              :key="index"
              class="schedule-slot clickable"
              @click="handleSlotClick(index)"
            ></div>

            <div
              v-for="event in filteredEvents"
              :key="event.id"
              class="event"
              :style="{ top: event.top + 'px', height: event.height + 'px' }"
              @click.stop="openModal(event)"
            >
              <div class="event-title">{{ event.title }}</div>
              <div class="event-subtitle">{{ event.subtitle }}</div>
              <div class="event-capacity">{{ event.capacity }}</div>
            </div>
          </div>
        </div>
      </div>
      


      <!-- Event Modal -->
      <div v-if="selectedModal" class="modal-overlay" @click.self="closeModal">
        <div class="modal">
          <div class="modal-header">
            <h2 class="modal-title">{{ selectedModal.title }}</h2>
            <button @click="closeModal" class="modal-close">X</button>
          </div>
          <div>
            <p><strong>Instructor:</strong> {{ selectedModal.instructor }}</p>
<p><strong>Client:</strong> {{ selectedModal.client }}</p>
<p><strong>Time:</strong> {{ getEventTime(selectedModal.top) }}</p>

          </div>
        </div>
      </div>
      
      <!--Create Events-->

<div v-if="showCreateModal" class="modal-backdrop">
  <div class="modal-box">
    <h3 class="fw-bold">Create New Event</h3>
    <form @submit.prevent="createEvent">
      <!-- Date -->
      <div>
        <label>Date:</label>
        <input type="text" :value="formattedDate" disabled />
      </div>

      <!-- Time -->
      <div>
        <label>Time:</label>
        <input type="text" :value="timeSlots[selectedSlotIndex]" disabled />
      </div>

      <!-- Staff -->
      <div>
        <label>Staff:</label>
        <select v-model="newEvent.instructor" required>
          <option value="" disabled>Select Staff</option>
          <option v-for="coach in coachOptions" :key="coach" :value="coach">{{ coach }}</option>
        </select>
      </div>

      <!-- Client -->
      <div>
        <label>Client:</label>
        <select v-model="newEvent.client" required>
          <option value="" disabled>Select Client</option>
          <option v-for="member in members" :key="member.name" :value="member.name">{{ member.name }}</option>
        </select>
      </div>

      <!-- Workout Type -->
      <div>
        <label>Workout Type:</label>
        <input type="text" v-model="newEvent.title" placeholder="e.g., Cardio" required />
      </div>

      <!-- Buttons -->
      <div class="modal-actions">
        <button type="submit">Create</button>
        <button type="button" @click="showCreateModal = false">Cancel</button>
      </div>
    </form>
  </div>
</div>

    </div>
  </div>
</template>

<script>
export default {
  name: 'FitnessScheduler',
  data() {
    return {
      activeTab: 'GROUP TRAINING',
      selectedModal: null,
      showCreateModal: false,
      selectedSlotIndex: null,
      newEvent: {
  title: '',
  instructor: '',
  client: '',
  location: '',
  description: ''
},
      viewOptions: 'Options',
      viewMode: '1 day',
      staffView: 'Staff view',
      searchTerm: '',
      currentDate: new Date(),
      tabs: ['My schedule', 'GROUP TRAINING', 'Private Gym', 'Recovery Center Services', 'All'],
      timeSlots: [
        '12 am', '1 am', '2 am', '3 am', '4 am', '5 am', '6 am', '7 am', '8 am',
        '9 am', '10 am', '11 am', '12 pm', '1 pm', '2 pm', '3 pm', '4 pm','5 pm','6 pm','7 pm','8 pm','9 pm','10 pm','11 pm'
      ],
      selectedActivity: '',
      selectedCoach: '',
      activityOptions: ['Boxing', 'Cardio', 'Yoga', 'Strength'], 
      coachOptions: ['Charles Thornton', 'Khendal Capers'],
      selectedMember: '',
      members: [
  { name: 'John Doe' },
  { name: 'Jane Smith' },
  { name: 'Charles Thornton' },
  { name: 'Khendal Capers' }
],
clients: [
  { id: 1, name: 'John Doe' },
  { id: 2, name: 'Jane Smith' }
],

      events: [
        {
          id: 1,
          title: 'Boxing am - 06:00 am',
          subtitle: 'Full Body',
          time: '7 am',
          duration: '1 hour',
          capacity: '1/10',
          instructor: 'Khendal Capers',
          location: 'Studio A',
          description: 'High-intensity boxing workout focusing on cardio and strength training.',
          top: 6 * 64,
          height: 128
        },
        {
          id: 2,
          title: 'Cardio pm - 05:00 pm',
          subtitle: 'Full Body',
          time: '4 pm',
          duration: '45 minutes',
          capacity: '0/10',
          instructor: 'Charles Thornton',
          location: 'Studio B',
          description: 'Cardiovascular training session to improve endurance and burn calories.',
          top: 15 * 64,
          height: 96
        }
      ]
    };
  },
  methods: {
    setActiveTab(tab) {
      this.activeTab = tab;
    },
    openModal(event) {
  console.log('Modal opened', event);
  this.selectedModal = event;
},
    closeModal() {
      this.selectedModal = null;
    },
    handleSlotClick(index) {
      this.selectedSlotIndex = index;
      this.showCreateModal = true;
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
    goToPreviousDate() {
      this.currentDate.setDate(this.currentDate.getDate() - 1);
      this.currentDate = new Date(this.currentDate);
    },
    goToNextDate() {
      this.currentDate.setDate(this.currentDate.getDate() + 1);
      this.currentDate = new Date(this.currentDate);
    },
    createEvent() {
      if (!this.newEvent.title || !this.newEvent.instructor || this.selectedSlotIndex === null) return;

      const top = this.selectedSlotIndex * 64;
      const newEvent = {
  id: Date.now(),
  title: this.newEvent.title,
  instructor: this.newEvent.instructor,
  client: this.newEvent.client,
  location: this.newEvent.location,
  description: this.newEvent.description,
  capacity: '0/10',
  top,
  height: 96
};

      this.events.push(newEvent);
      this.showCreateModal = false;
      this.newEvent = { title: '', instructor: '' };
      this.selectedSlotIndex = null;
    },
    getEventTime(topValue) {
  const index = Math.round(topValue / 64);
  return this.timeSlots[index] || 'Unknown Time';
}

  },
  computed: {
    formattedDate() {
      const options = { day: 'numeric', weekday: 'long', month: 'long', year: 'numeric' };
      return this.currentDate.toLocaleDateString('en-US', options);
    },
    filteredEvents() {
      return this.events.filter(event => {
        const matchActivity = this.selectedActivity ? event.title.toLowerCase().includes(this.selectedActivity.toLowerCase()) : true;
        const matchCoach = this.selectedCoach ? event.instructor === this.selectedCoach : true;
        return matchActivity && matchCoach;
      });
    },
      filteredMembers() {
    // Optional filtering using searchTerm (not required if listing all)
    if (!this.searchTerm) return this.members;
    return this.members.filter(member =>
      member.name.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }
  }
};
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
.schedule-slot.clickable {
  cursor: pointer;
}
body {
  position: relative;
  background-color: #f9fafb;
}

.container {
  min-height: 100vh;
}

.nav-header {
  background: white;
  border-bottom: 1px solid #e5e7eb;
  padding: 1rem 1.5rem;
}

.nav-title {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
}

.title {
  font-size: 1.5rem;
  font-weight: bold;
  color: #111827;
}


.tabs {
  display: flex;
  gap: 0.25rem;
}

.tab {
  padding: 0.5rem 1rem;
  border-radius: 0.375rem;
  font-size: 0.875rem;
  font-weight: 500;
  border: none;
  cursor: pointer;
  transition: all 0.2s;
}

.tab.active {
  background: #000;
  color: white;
}

.tab:not(.active) {
  color: #6b7280;
  background: transparent;
}

.tab:not(.active):hover {
  color: #111827;
  background: #f3f4f6;
}

.controls {
  background: white;
  border-bottom: 1px solid #e5e7eb;
  padding: 1rem 1.5rem;
}

.controls-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.controls-left, .controls-right {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.dropdown, .input-container {
  position: relative;
}

.dropdown select, .btn {
  padding: 0.5rem 0.75rem;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
  font-size: 0.875rem;
  background: white;
  cursor: pointer;
  transition: background-color 0.2s;
}

.dropdown select:hover, .btn:hover {
  background: #f9fafb;
}

.dropdown select {
  appearance: none;
  padding-right: 2rem;
}

.dropdown::after {
  content: '';
  position: absolute;
  right: 0.5rem;
  top: 50%;
  transform: translateY(-50%);
  width: 0;
  height: 0;
  border-left: 4px solid transparent;
  border-right: 4px solid transparent;
  border-top: 4px solid #6b7280;
  pointer-events: none;
}

.search-input {
  padding: 0.5rem 0.75rem 0.5rem 2.5rem;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
  font-size: 0.875rem;
  width: 16rem;
  outline: none;
}

.search-input:focus {
  border-color: #ff4040;
}

.search-icon {
  position: absolute;
  left: 0.75rem;
  top: 50%;
  transform: translateY(-50%);
  width: 1rem;
  height: 1rem;
  color: #9ca3af;
}

.calendar-header {
  background: white;
  border-bottom: 1px solid #e5e7eb;
  padding: 1rem 1.5rem;
}

.calendar-nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.calendar-nav-btn {
  display: flex;
  align-items: center;
  gap: 1rem;
  background: none;
  border: none;
  cursor: pointer;
  color: #ff4040;
  font-size: 0.875rem;
}

.calendar-nav-btn:hover {
  background: #f3f4f6;
  border-radius: 0.25rem;
  padding: 0.25rem;
}

.calendar-title {
  font-size: 1.125rem;
  font-weight: 600;
  color: #111827;
}

.schedule-grid {
  background: white;
  display: flex;
  flex: 1;
}

.time-column {
  width: 5rem;
  border-right: 1px solid #e5e7eb;
}

.time-header {
  height: 3rem;
  border-bottom: 1px solid #e5e7eb;
  background: #f9fafb;
}

.time-slot {
  height: 4rem;
  border-bottom: 1px solid #e5e7eb;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.875rem;
  color: #6b7280;
}

.schedule-content {
  flex: 1;
  position: relative;
}

.schedule-header {
  height: 3rem;
  border-bottom: 1px solid #e5e7eb;
  background: #f9fafb;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.875rem;
  font-weight: 500;
  color: #111827;
}

.schedule-slots {
  position: relative;
}

.schedule-slot {
  height: 4rem;
  border-bottom: 1px solid #e5e7eb;
}

.event {
  position: absolute;
  left: 0;
  right: 0;
  background: #ff4040;
  color: white;
  padding: 0.5rem;
  border-radius: 0.375rem;
}

.event:hover {
  background: #e52e2e;
}

.event-title {
  color: white;
  font-size: 0.875rem;
  font-weight: 500;
}

.event-subtitle, .event-capacity {
  color: #dbeafe;
  font-size: 0.75rem;
}

.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
  padding: 1rem;
  overflow-y: auto;
}

.modal {
  margin: auto;
  background: #ffffff;
  padding: 2rem;
  border-radius: 1rem;
  max-width: 480px;
  width: 100%;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
  animation: fadeInScale 0.3s ease-in-out;
  overflow-y: auto;
  max-height: 40vh;
  display: block !important;
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

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #e5e7eb;
  padding-bottom: 0.75rem;
  margin-bottom: 1.5rem;
}

.modal-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: #1f2937;
}

.modal-close {
  background: none;
  border: none;
  font-size: 1.25rem;
  color: #9ca3af;
  cursor: pointer;
  transition: color 0.2s ease-in-out;
}

.modal-close:hover {
  color: #111827;
}

.modal-body p {
  margin-bottom: 0.75rem;
  font-size: 0.95rem;
  color: #374151;
}

.modal-body strong {
  font-weight: 600;
  color: #111827;
}

/* Optional: Responsive mobile adjustment */
@media (max-width: 500px) {
  .modal {
    padding: 1.25rem;
  }

  .modal-title {
    font-size: 1.1rem;
  }
}


.btn-primary {
  flex: 1;
  background: #ff4040;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 0.375rem;
  border: none;
  cursor: pointer;
  transition: background-color 0.2s;
}

.btn-primary:hover {
  background: #e52e2e;
}

.btn-secondary {
  flex: 1;
  border: 1px solid #d1d5db;
  color: #374151;
  padding: 0.5rem 1rem;
  border-radius: 0.375rem;
  background: white;
  cursor: pointer;
  transition: background-color 0.2s;
}

.btn-secondary:hover {
  background: #f9fafb;
}

.tab-content {
  padding: 1.5rem;
  text-align: center;
  color: #6b7280;
}

.tab-content h3 {
  font-size: 1.125rem;
  font-weight: 500;
  margin-bottom: 0.5rem;
}
.modal-backdrop {
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  opacity: 1 !important;
}

.modal-box {
  background-color: #ffffff;
  padding: 2rem;
  border-radius: 1rem;
  max-width: 500px;
  width: 100%;
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.2);
  opacity: 1 !important;
}

.modal-box h3 {
  font-size: 1.25rem;
  margin-bottom: 1rem;
  color: #111827;
}

.modal-box form div {
  margin-bottom: 1rem;
}

.modal-box label {
  display: block;
  margin-bottom: 0.25rem;
  font-weight: 500;
  color: #374151;
}

.modal-box input,
.modal-box select,
.modal-box textarea {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
  font-size: 0.875rem;
}

.modal-actions {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 1.5rem;
}

.modal-actions button {
  padding: 0.5rem 1rem;
  border-radius: 0.375rem;
  font-size: 0.875rem;
  cursor: pointer;
}

.modal-actions button[type="submit"] {
  background-color: #ff4040;
  color: white;
  border: none;
}

.modal-actions button[type="submit"]:hover {
  background-color: #e52e2e;
}

.modal-actions button[type="button"] {
  background: white;
  border: 1px solid #d1d5db;
  color: #374151;
}

.modal-actions button[type="button"]:hover {
  background: #f3f4f6;
}
</style>