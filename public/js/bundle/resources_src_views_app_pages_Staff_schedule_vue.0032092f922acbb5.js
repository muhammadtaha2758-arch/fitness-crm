"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["resources_src_views_app_pages_Staff_schedule_vue"],{

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/Staff/schedule.vue?vue&type=script&lang=js":
/*!**************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/Staff/schedule.vue?vue&type=script&lang=js ***!
  \**************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  name: 'FitnessScheduler',
  data: function data() {
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
      timeSlots: ['12 am', '1 am', '2 am', '3 am', '4 am', '5 am', '6 am', '7 am', '8 am', '9 am', '10 am', '11 am', '12 pm', '1 pm', '2 pm', '3 pm', '4 pm', '5 pm', '6 pm', '7 pm', '8 pm', '9 pm', '10 pm', '11 pm'],
      selectedActivity: '',
      selectedCoach: '',
      activityOptions: ['Boxing', 'Cardio', 'Yoga', 'Strength'],
      coachOptions: ['Charles Thornton', 'Khendal Capers'],
      selectedMember: '',
      members: [{
        name: 'John Doe'
      }, {
        name: 'Jane Smith'
      }, {
        name: 'Charles Thornton'
      }, {
        name: 'Khendal Capers'
      }],
      clients: [{
        id: 1,
        name: 'John Doe'
      }, {
        id: 2,
        name: 'Jane Smith'
      }],
      events: [{
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
      }, {
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
      }]
    };
  },
  methods: {
    setActiveTab: function setActiveTab(tab) {
      this.activeTab = tab;
    },
    openModal: function openModal(event) {
      console.log('Modal opened', event);
      this.selectedModal = event;
    },
    closeModal: function closeModal() {
      this.selectedModal = null;
    },
    handleSlotClick: function handleSlotClick(index) {
      this.selectedSlotIndex = index;
      this.showCreateModal = true;
    },
    getTabContent: function getTabContent(tab) {
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
          return {
            title: '',
            description: ''
          };
      }
    },
    goToPreviousDate: function goToPreviousDate() {
      this.currentDate.setDate(this.currentDate.getDate() - 1);
      this.currentDate = new Date(this.currentDate);
    },
    goToNextDate: function goToNextDate() {
      this.currentDate.setDate(this.currentDate.getDate() + 1);
      this.currentDate = new Date(this.currentDate);
    },
    createEvent: function createEvent() {
      if (!this.newEvent.title || !this.newEvent.instructor || this.selectedSlotIndex === null) return;
      var top = this.selectedSlotIndex * 64;
      var newEvent = {
        id: Date.now(),
        title: this.newEvent.title,
        instructor: this.newEvent.instructor,
        client: this.newEvent.client,
        location: this.newEvent.location,
        description: this.newEvent.description,
        capacity: '0/10',
        top: top,
        height: 96
      };
      this.events.push(newEvent);
      this.showCreateModal = false;
      this.newEvent = {
        title: '',
        instructor: ''
      };
      this.selectedSlotIndex = null;
    },
    getEventTime: function getEventTime(topValue) {
      var index = Math.round(topValue / 64);
      return this.timeSlots[index] || 'Unknown Time';
    }
  },
  computed: {
    formattedDate: function formattedDate() {
      var options = {
        day: 'numeric',
        weekday: 'long',
        month: 'long',
        year: 'numeric'
      };
      return this.currentDate.toLocaleDateString('en-US', options);
    },
    filteredEvents: function filteredEvents() {
      var _this = this;
      return this.events.filter(function (event) {
        var matchActivity = _this.selectedActivity ? event.title.toLowerCase().includes(_this.selectedActivity.toLowerCase()) : true;
        var matchCoach = _this.selectedCoach ? event.instructor === _this.selectedCoach : true;
        return matchActivity && matchCoach;
      });
    },
    filteredMembers: function filteredMembers() {
      var _this2 = this;
      // Optional filtering using searchTerm (not required if listing all)
      if (!this.searchTerm) return this.members;
      return this.members.filter(function (member) {
        return member.name.toLowerCase().includes(_this2.searchTerm.toLowerCase());
      });
    }
  }
});

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/Staff/schedule.vue?vue&type=style&index=0&id=d809ffba&scoped=true&lang=css":
/*!**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/Staff/schedule.vue?vue&type=style&index=0&id=d809ffba&scoped=true&lang=css ***!
  \**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__);
// Imports

var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default()(function(i){return i[1]});
// Module
___CSS_LOADER_EXPORT___.push([module.id, "\n*[data-v-d809ffba] {\r\n  margin: 0;\r\n  padding: 0;\r\n  box-sizing: border-box;\n}\n.schedule-slot.clickable[data-v-d809ffba] {\r\n  cursor: pointer;\n}\nbody[data-v-d809ffba] {\r\n  position: relative;\r\n  background-color: #f9fafb;\n}\n.container[data-v-d809ffba] {\r\n  min-height: 100vh;\n}\n.nav-header[data-v-d809ffba] {\r\n  background: white;\r\n  border-bottom: 1px solid #e5e7eb;\r\n  padding: 1rem 1.5rem;\n}\n.nav-title[data-v-d809ffba] {\r\n  display: flex;\r\n  align-items: center;\r\n  justify-content: space-between;\r\n  margin-bottom: 1rem;\n}\n.title[data-v-d809ffba] {\r\n  font-size: 1.5rem;\r\n  font-weight: bold;\r\n  color: #111827;\n}\n.tabs[data-v-d809ffba] {\r\n  display: flex;\r\n  gap: 0.25rem;\n}\n.tab[data-v-d809ffba] {\r\n  padding: 0.5rem 1rem;\r\n  border-radius: 0.375rem;\r\n  font-size: 0.875rem;\r\n  font-weight: 500;\r\n  border: none;\r\n  cursor: pointer;\r\n  transition: all 0.2s;\n}\n.tab.active[data-v-d809ffba] {\r\n  background: #000;\r\n  color: white;\n}\n.tab[data-v-d809ffba]:not(.active) {\r\n  color: #6b7280;\r\n  background: transparent;\n}\n.tab[data-v-d809ffba]:not(.active):hover {\r\n  color: #111827;\r\n  background: #f3f4f6;\n}\n.controls[data-v-d809ffba] {\r\n  background: white;\r\n  border-bottom: 1px solid #e5e7eb;\r\n  padding: 1rem 1.5rem;\n}\n.controls-row[data-v-d809ffba] {\r\n  display: flex;\r\n  align-items: center;\r\n  justify-content: space-between;\n}\n.controls-left[data-v-d809ffba], .controls-right[data-v-d809ffba] {\r\n  display: flex;\r\n  align-items: center;\r\n  gap: 1rem;\n}\n.dropdown[data-v-d809ffba], .input-container[data-v-d809ffba] {\r\n  position: relative;\n}\n.dropdown select[data-v-d809ffba], .btn[data-v-d809ffba] {\r\n  padding: 0.5rem 0.75rem;\r\n  border: 1px solid #d1d5db;\r\n  border-radius: 0.375rem;\r\n  font-size: 0.875rem;\r\n  background: white;\r\n  cursor: pointer;\r\n  transition: background-color 0.2s;\n}\n.dropdown select[data-v-d809ffba]:hover, .btn[data-v-d809ffba]:hover {\r\n  background: #f9fafb;\n}\n.dropdown select[data-v-d809ffba] {\r\n  -webkit-appearance: none;\r\n     -moz-appearance: none;\r\n          appearance: none;\r\n  padding-right: 2rem;\n}\n.dropdown[data-v-d809ffba]::after {\r\n  content: '';\r\n  position: absolute;\r\n  right: 0.5rem;\r\n  top: 50%;\r\n  transform: translateY(-50%);\r\n  width: 0;\r\n  height: 0;\r\n  border-left: 4px solid transparent;\r\n  border-right: 4px solid transparent;\r\n  border-top: 4px solid #6b7280;\r\n  pointer-events: none;\n}\n.search-input[data-v-d809ffba] {\r\n  padding: 0.5rem 0.75rem 0.5rem 2.5rem;\r\n  border: 1px solid #d1d5db;\r\n  border-radius: 0.375rem;\r\n  font-size: 0.875rem;\r\n  width: 16rem;\r\n  outline: none;\n}\n.search-input[data-v-d809ffba]:focus {\r\n  border-color: #ff4040;\n}\n.search-icon[data-v-d809ffba] {\r\n  position: absolute;\r\n  left: 0.75rem;\r\n  top: 50%;\r\n  transform: translateY(-50%);\r\n  width: 1rem;\r\n  height: 1rem;\r\n  color: #9ca3af;\n}\n.calendar-header[data-v-d809ffba] {\r\n  background: white;\r\n  border-bottom: 1px solid #e5e7eb;\r\n  padding: 1rem 1.5rem;\n}\n.calendar-nav[data-v-d809ffba] {\r\n  display: flex;\r\n  align-items: center;\r\n  justify-content: space-between;\n}\n.calendar-nav-btn[data-v-d809ffba] {\r\n  display: flex;\r\n  align-items: center;\r\n  gap: 1rem;\r\n  background: none;\r\n  border: none;\r\n  cursor: pointer;\r\n  color: #ff4040;\r\n  font-size: 0.875rem;\n}\n.calendar-nav-btn[data-v-d809ffba]:hover {\r\n  background: #f3f4f6;\r\n  border-radius: 0.25rem;\r\n  padding: 0.25rem;\n}\n.calendar-title[data-v-d809ffba] {\r\n  font-size: 1.125rem;\r\n  font-weight: 600;\r\n  color: #111827;\n}\n.schedule-grid[data-v-d809ffba] {\r\n  background: white;\r\n  display: flex;\r\n  flex: 1;\n}\n.time-column[data-v-d809ffba] {\r\n  width: 5rem;\r\n  border-right: 1px solid #e5e7eb;\n}\n.time-header[data-v-d809ffba] {\r\n  height: 3rem;\r\n  border-bottom: 1px solid #e5e7eb;\r\n  background: #f9fafb;\n}\n.time-slot[data-v-d809ffba] {\r\n  height: 4rem;\r\n  border-bottom: 1px solid #e5e7eb;\r\n  display: flex;\r\n  align-items: center;\r\n  justify-content: center;\r\n  font-size: 0.875rem;\r\n  color: #6b7280;\n}\n.schedule-content[data-v-d809ffba] {\r\n  flex: 1;\r\n  position: relative;\n}\n.schedule-header[data-v-d809ffba] {\r\n  height: 3rem;\r\n  border-bottom: 1px solid #e5e7eb;\r\n  background: #f9fafb;\r\n  display: flex;\r\n  align-items: center;\r\n  justify-content: center;\r\n  font-size: 0.875rem;\r\n  font-weight: 500;\r\n  color: #111827;\n}\n.schedule-slots[data-v-d809ffba] {\r\n  position: relative;\n}\n.schedule-slot[data-v-d809ffba] {\r\n  height: 4rem;\r\n  border-bottom: 1px solid #e5e7eb;\n}\n.event[data-v-d809ffba] {\r\n  position: absolute;\r\n  left: 0;\r\n  right: 0;\r\n  background: #ff4040;\r\n  color: white;\r\n  padding: 0.5rem;\r\n  border-radius: 0.375rem;\n}\n.event[data-v-d809ffba]:hover {\r\n  background: #e52e2e;\n}\n.event-title[data-v-d809ffba] {\r\n  color: white;\r\n  font-size: 0.875rem;\r\n  font-weight: 500;\n}\n.event-subtitle[data-v-d809ffba], .event-capacity[data-v-d809ffba] {\r\n  color: #dbeafe;\r\n  font-size: 0.75rem;\n}\n.modal-overlay[data-v-d809ffba] {\r\n  position: fixed;\r\n  inset: 0;\r\n  background: rgba(0, 0, 0, 0.6);\r\n  display: flex;\r\n  justify-content: center;\r\n  align-items: center;\r\n  z-index: 9999;\r\n  padding: 1rem;\r\n  overflow-y: auto;\n}\n.modal[data-v-d809ffba] {\r\n  margin: auto;\r\n  background: #ffffff;\r\n  padding: 2rem;\r\n  border-radius: 1rem;\r\n  max-width: 480px;\r\n  width: 100%;\r\n  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);\r\n  animation: fadeInScale-data-v-d809ffba 0.3s ease-in-out;\r\n  overflow-y: auto;\r\n  max-height: 40vh;\r\n  display: block !important;\n}\n@keyframes fadeInScale-data-v-d809ffba {\nfrom {\r\n    opacity: 0;\r\n    transform: scale(0.95);\n}\nto {\r\n    opacity: 1;\r\n    transform: scale(1);\n}\n}\n.modal-header[data-v-d809ffba] {\r\n  display: flex;\r\n  justify-content: space-between;\r\n  align-items: center;\r\n  border-bottom: 1px solid #e5e7eb;\r\n  padding-bottom: 0.75rem;\r\n  margin-bottom: 1.5rem;\n}\n.modal-title[data-v-d809ffba] {\r\n  font-size: 1.25rem;\r\n  font-weight: 600;\r\n  color: #1f2937;\n}\n.modal-close[data-v-d809ffba] {\r\n  background: none;\r\n  border: none;\r\n  font-size: 1.25rem;\r\n  color: #9ca3af;\r\n  cursor: pointer;\r\n  transition: color 0.2s ease-in-out;\n}\n.modal-close[data-v-d809ffba]:hover {\r\n  color: #111827;\n}\n.modal-body p[data-v-d809ffba] {\r\n  margin-bottom: 0.75rem;\r\n  font-size: 0.95rem;\r\n  color: #374151;\n}\n.modal-body strong[data-v-d809ffba] {\r\n  font-weight: 600;\r\n  color: #111827;\n}\r\n\r\n/* Optional: Responsive mobile adjustment */\n@media (max-width: 500px) {\n.modal[data-v-d809ffba] {\r\n    padding: 1.25rem;\n}\n.modal-title[data-v-d809ffba] {\r\n    font-size: 1.1rem;\n}\n}\n.btn-primary[data-v-d809ffba] {\r\n  flex: 1;\r\n  background: #ff4040;\r\n  color: white;\r\n  padding: 0.5rem 1rem;\r\n  border-radius: 0.375rem;\r\n  border: none;\r\n  cursor: pointer;\r\n  transition: background-color 0.2s;\n}\n.btn-primary[data-v-d809ffba]:hover {\r\n  background: #e52e2e;\n}\n.btn-secondary[data-v-d809ffba] {\r\n  flex: 1;\r\n  border: 1px solid #d1d5db;\r\n  color: #374151;\r\n  padding: 0.5rem 1rem;\r\n  border-radius: 0.375rem;\r\n  background: white;\r\n  cursor: pointer;\r\n  transition: background-color 0.2s;\n}\n.btn-secondary[data-v-d809ffba]:hover {\r\n  background: #f9fafb;\n}\n.tab-content[data-v-d809ffba] {\r\n  padding: 1.5rem;\r\n  text-align: center;\r\n  color: #6b7280;\n}\n.tab-content h3[data-v-d809ffba] {\r\n  font-size: 1.125rem;\r\n  font-weight: 500;\r\n  margin-bottom: 0.5rem;\n}\n.modal-backdrop[data-v-d809ffba] {\r\n  position: fixed;\r\n  inset: 0;\r\n  background-color: rgba(0, 0, 0, 0.5);\r\n  display: flex;\r\n  align-items: center;\r\n  justify-content: center;\r\n  z-index: 9999;\r\n  opacity: 1 !important;\n}\n.modal-box[data-v-d809ffba] {\r\n  background-color: #ffffff;\r\n  padding: 2rem;\r\n  border-radius: 1rem;\r\n  max-width: 500px;\r\n  width: 100%;\r\n  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.2);\r\n  opacity: 1 !important;\n}\n.modal-box h3[data-v-d809ffba] {\r\n  font-size: 1.25rem;\r\n  margin-bottom: 1rem;\r\n  color: #111827;\n}\n.modal-box form div[data-v-d809ffba] {\r\n  margin-bottom: 1rem;\n}\n.modal-box label[data-v-d809ffba] {\r\n  display: block;\r\n  margin-bottom: 0.25rem;\r\n  font-weight: 500;\r\n  color: #374151;\n}\n.modal-box input[data-v-d809ffba],\r\n.modal-box select[data-v-d809ffba],\r\n.modal-box textarea[data-v-d809ffba] {\r\n  width: 100%;\r\n  padding: 0.5rem;\r\n  border: 1px solid #d1d5db;\r\n  border-radius: 0.375rem;\r\n  font-size: 0.875rem;\n}\n.modal-actions[data-v-d809ffba] {\r\n  display: flex;\r\n  justify-content: flex-end;\r\n  gap: 1rem;\r\n  margin-top: 1.5rem;\n}\n.modal-actions button[data-v-d809ffba] {\r\n  padding: 0.5rem 1rem;\r\n  border-radius: 0.375rem;\r\n  font-size: 0.875rem;\r\n  cursor: pointer;\n}\n.modal-actions button[type=\"submit\"][data-v-d809ffba] {\r\n  background-color: #ff4040;\r\n  color: white;\r\n  border: none;\n}\n.modal-actions button[type=\"submit\"][data-v-d809ffba]:hover {\r\n  background-color: #e52e2e;\n}\n.modal-actions button[type=\"button\"][data-v-d809ffba] {\r\n  background: white;\r\n  border: 1px solid #d1d5db;\r\n  color: #374151;\n}\n.modal-actions button[type=\"button\"][data-v-d809ffba]:hover {\r\n  background: #f3f4f6;\n}\r\n", ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/Staff/schedule.vue?vue&type=style&index=0&id=d809ffba&scoped=true&lang=css":
/*!**************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/Staff/schedule.vue?vue&type=style&index=0&id=d809ffba&scoped=true&lang=css ***!
  \**************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../../../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_clonedRuleSet_9_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_9_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_schedule_vue_vue_type_style_index_0_id_d809ffba_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !!../../../../../../node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!../../../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!../../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./schedule.vue?vue&type=style&index=0&id=d809ffba&scoped=true&lang=css */ "./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/Staff/schedule.vue?vue&type=style&index=0&id=d809ffba&scoped=true&lang=css");

            

var options = {};

options.insert = "head";
options.singleton = false;

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_clonedRuleSet_9_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_9_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_schedule_vue_vue_type_style_index_0_id_d809ffba_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_1__["default"], options);



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_clonedRuleSet_9_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_9_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_schedule_vue_vue_type_style_index_0_id_d809ffba_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_1__["default"].locals || {});

/***/ }),

/***/ "./resources/src/views/app/pages/Staff/schedule.vue":
/*!**********************************************************!*\
  !*** ./resources/src/views/app/pages/Staff/schedule.vue ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _schedule_vue_vue_type_template_id_d809ffba_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./schedule.vue?vue&type=template&id=d809ffba&scoped=true */ "./resources/src/views/app/pages/Staff/schedule.vue?vue&type=template&id=d809ffba&scoped=true");
/* harmony import */ var _schedule_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./schedule.vue?vue&type=script&lang=js */ "./resources/src/views/app/pages/Staff/schedule.vue?vue&type=script&lang=js");
/* harmony import */ var _schedule_vue_vue_type_style_index_0_id_d809ffba_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./schedule.vue?vue&type=style&index=0&id=d809ffba&scoped=true&lang=css */ "./resources/src/views/app/pages/Staff/schedule.vue?vue&type=style&index=0&id=d809ffba&scoped=true&lang=css");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");



;


/* normalize component */

var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _schedule_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__["default"],
  _schedule_vue_vue_type_template_id_d809ffba_scoped_true__WEBPACK_IMPORTED_MODULE_0__.render,
  _schedule_vue_vue_type_template_id_d809ffba_scoped_true__WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  "d809ffba",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/src/views/app/pages/Staff/schedule.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./resources/src/views/app/pages/Staff/schedule.vue?vue&type=script&lang=js":
/*!**********************************************************************************!*\
  !*** ./resources/src/views/app/pages/Staff/schedule.vue?vue&type=script&lang=js ***!
  \**********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_schedule_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./schedule.vue?vue&type=script&lang=js */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/Staff/schedule.vue?vue&type=script&lang=js");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_schedule_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/src/views/app/pages/Staff/schedule.vue?vue&type=style&index=0&id=d809ffba&scoped=true&lang=css":
/*!******************************************************************************************************************!*\
  !*** ./resources/src/views/app/pages/Staff/schedule.vue?vue&type=style&index=0&id=d809ffba&scoped=true&lang=css ***!
  \******************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_dist_cjs_js_node_modules_css_loader_dist_cjs_js_clonedRuleSet_9_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_9_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_schedule_vue_vue_type_style_index_0_id_d809ffba_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/style-loader/dist/cjs.js!../../../../../../node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!../../../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!../../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./schedule.vue?vue&type=style&index=0&id=d809ffba&scoped=true&lang=css */ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/Staff/schedule.vue?vue&type=style&index=0&id=d809ffba&scoped=true&lang=css");


/***/ }),

/***/ "./resources/src/views/app/pages/Staff/schedule.vue?vue&type=template&id=d809ffba&scoped=true":
/*!****************************************************************************************************!*\
  !*** ./resources/src/views/app/pages/Staff/schedule.vue?vue&type=template&id=d809ffba&scoped=true ***!
  \****************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_schedule_vue_vue_type_template_id_d809ffba_scoped_true__WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   staticRenderFns: () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_schedule_vue_vue_type_template_id_d809ffba_scoped_true__WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_schedule_vue_vue_type_template_id_d809ffba_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./schedule.vue?vue&type=template&id=d809ffba&scoped=true */ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/Staff/schedule.vue?vue&type=template&id=d809ffba&scoped=true");


/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/Staff/schedule.vue?vue&type=template&id=d809ffba&scoped=true":
/*!*******************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/Staff/schedule.vue?vue&type=template&id=d809ffba&scoped=true ***!
  \*******************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* binding */ render),
/* harmony export */   staticRenderFns: () => (/* binding */ staticRenderFns)
/* harmony export */ });
var render = function () {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", { staticClass: "container-fluid" }, [
    _c("div", { staticClass: "nav-header d-flex justify-content-between" }, [
      _vm._m(0),
      _vm._v(" "),
      _c(
        "div",
        { staticClass: "tabs" },
        _vm._l(_vm.tabs, function (tab) {
          return _c(
            "button",
            {
              key: tab,
              class: ["tab", { active: _vm.activeTab === tab }],
              on: {
                click: function ($event) {
                  return _vm.setActiveTab(tab)
                },
              },
            },
            [_vm._v("\n          " + _vm._s(tab) + "\n        ")]
          )
        }),
        0
      ),
    ]),
    _vm._v(" "),
    _vm.activeTab !== "GROUP TRAINING"
      ? _c("div", { staticClass: "tab-content" }, [
          _c("h3", [_vm._v(_vm._s(_vm.getTabContent(_vm.activeTab).title))]),
          _vm._v(" "),
          _c("p", [
            _vm._v(_vm._s(_vm.getTabContent(_vm.activeTab).description)),
          ]),
        ])
      : _vm._e(),
    _vm._v(" "),
    _vm.activeTab === "GROUP TRAINING"
      ? _c("div", [
          _c("div", { staticClass: "controls" }, [
            _c("div", { staticClass: "controls-row" }, [
              _c("div", { staticClass: "controls-left" }, [
                _c("div", { staticClass: "dropdown" }, [
                  _c(
                    "select",
                    {
                      directives: [
                        {
                          name: "model",
                          rawName: "v-model",
                          value: _vm.viewOptions,
                          expression: "viewOptions",
                        },
                      ],
                      on: {
                        change: function ($event) {
                          var $$selectedVal = Array.prototype.filter
                            .call($event.target.options, function (o) {
                              return o.selected
                            })
                            .map(function (o) {
                              var val = "_value" in o ? o._value : o.value
                              return val
                            })
                          _vm.viewOptions = $event.target.multiple
                            ? $$selectedVal
                            : $$selectedVal[0]
                        },
                      },
                    },
                    [
                      _c("option", { attrs: { disabled: "" } }, [
                        _vm._v("Options"),
                      ]),
                      _vm._v(" "),
                      _c("option", [_vm._v("Export")]),
                      _vm._v(" "),
                      _c("option", [_vm._v("New Event")]),
                    ]
                  ),
                ]),
                _vm._v(" "),
                _c("div", { staticClass: "dropdown" }, [
                  _c(
                    "select",
                    {
                      directives: [
                        {
                          name: "model",
                          rawName: "v-model",
                          value: _vm.staffView,
                          expression: "staffView",
                        },
                      ],
                      on: {
                        change: function ($event) {
                          var $$selectedVal = Array.prototype.filter
                            .call($event.target.options, function (o) {
                              return o.selected
                            })
                            .map(function (o) {
                              var val = "_value" in o ? o._value : o.value
                              return val
                            })
                          _vm.staffView = $event.target.multiple
                            ? $$selectedVal
                            : $$selectedVal[0]
                        },
                      },
                    },
                    [
                      _c("option", [_vm._v("Staff view")]),
                      _vm._v(" "),
                      _c("option", [_vm._v("Member view")]),
                    ]
                  ),
                ]),
                _vm._v(" "),
                _c("div", { staticClass: "dropdown" }, [
                  _c(
                    "select",
                    {
                      directives: [
                        {
                          name: "model",
                          rawName: "v-model",
                          value: _vm.viewMode,
                          expression: "viewMode",
                        },
                      ],
                      on: {
                        change: function ($event) {
                          var $$selectedVal = Array.prototype.filter
                            .call($event.target.options, function (o) {
                              return o.selected
                            })
                            .map(function (o) {
                              var val = "_value" in o ? o._value : o.value
                              return val
                            })
                          _vm.viewMode = $event.target.multiple
                            ? $$selectedVal
                            : $$selectedVal[0]
                        },
                      },
                    },
                    [
                      _c("option", [_vm._v("1 day")]),
                      _vm._v(" "),
                      _c("option", [_vm._v("3 days")]),
                      _vm._v(" "),
                      _c("option", [_vm._v("1 week")]),
                      _vm._v(" "),
                      _c("option", [_vm._v("1 month")]),
                    ]
                  ),
                ]),
              ]),
              _vm._v(" "),
              _c("div", { staticClass: "controls-right" }, [
                _c("div", { staticClass: "dropdown" }, [
                  _c(
                    "select",
                    {
                      directives: [
                        {
                          name: "model",
                          rawName: "v-model",
                          value: _vm.selectedMember,
                          expression: "selectedMember",
                        },
                      ],
                      staticClass: "btn",
                      attrs: { id: "memberSelect", name: "memberSelect" },
                      on: {
                        change: function ($event) {
                          var $$selectedVal = Array.prototype.filter
                            .call($event.target.options, function (o) {
                              return o.selected
                            })
                            .map(function (o) {
                              var val = "_value" in o ? o._value : o.value
                              return val
                            })
                          _vm.selectedMember = $event.target.multiple
                            ? $$selectedVal
                            : $$selectedVal[0]
                        },
                      },
                    },
                    [
                      _c("option", { attrs: { value: "" } }, [
                        _vm._v("All Members"),
                      ]),
                      _vm._v(" "),
                      _vm._l(_vm.filteredMembers, function (member) {
                        return _c(
                          "option",
                          {
                            key: member.name,
                            domProps: { value: member.name },
                          },
                          [_vm._v("\n      " + _vm._s(member.name) + "\n    ")]
                        )
                      }),
                    ],
                    2
                  ),
                ]),
                _vm._v(" "),
                _c("div", { staticClass: "dropdown" }, [
                  _c(
                    "select",
                    {
                      directives: [
                        {
                          name: "model",
                          rawName: "v-model",
                          value: _vm.selectedActivity,
                          expression: "selectedActivity",
                        },
                      ],
                      staticClass: "btn",
                      on: {
                        change: function ($event) {
                          var $$selectedVal = Array.prototype.filter
                            .call($event.target.options, function (o) {
                              return o.selected
                            })
                            .map(function (o) {
                              var val = "_value" in o ? o._value : o.value
                              return val
                            })
                          _vm.selectedActivity = $event.target.multiple
                            ? $$selectedVal
                            : $$selectedVal[0]
                        },
                      },
                    },
                    [
                      _c("option", { attrs: { value: "" } }, [
                        _vm._v("All Activities"),
                      ]),
                      _vm._v(" "),
                      _vm._l(_vm.activityOptions, function (activity) {
                        return _c(
                          "option",
                          { key: activity, domProps: { value: activity } },
                          [
                            _vm._v(
                              "\n                  " +
                                _vm._s(activity) +
                                "\n                "
                            ),
                          ]
                        )
                      }),
                    ],
                    2
                  ),
                ]),
                _vm._v(" "),
                _c("div", { staticClass: "dropdown" }, [
                  _c(
                    "select",
                    {
                      directives: [
                        {
                          name: "model",
                          rawName: "v-model",
                          value: _vm.selectedCoach,
                          expression: "selectedCoach",
                        },
                      ],
                      staticClass: "btn",
                      on: {
                        change: function ($event) {
                          var $$selectedVal = Array.prototype.filter
                            .call($event.target.options, function (o) {
                              return o.selected
                            })
                            .map(function (o) {
                              var val = "_value" in o ? o._value : o.value
                              return val
                            })
                          _vm.selectedCoach = $event.target.multiple
                            ? $$selectedVal
                            : $$selectedVal[0]
                        },
                      },
                    },
                    [
                      _c("option", { attrs: { value: "" } }, [
                        _vm._v("All Coaches"),
                      ]),
                      _vm._v(" "),
                      _vm._l(_vm.coachOptions, function (coach) {
                        return _c(
                          "option",
                          { key: coach, domProps: { value: coach } },
                          [
                            _vm._v(
                              "\n                  " +
                                _vm._s(coach) +
                                "\n                "
                            ),
                          ]
                        )
                      }),
                    ],
                    2
                  ),
                ]),
              ]),
            ]),
          ]),
          _vm._v(" "),
          _c("div", { staticClass: "calendar-header" }, [
            _c("div", { staticClass: "calendar-nav" }, [
              _c(
                "button",
                {
                  staticClass: "calendar-nav-btn",
                  on: { click: _vm.goToPreviousDate },
                },
                [
                  _c(
                    "svg",
                    {
                      attrs: {
                        width: "20",
                        height: "20",
                        fill: "none",
                        stroke: "currentColor",
                        viewBox: "0 0 24 24",
                      },
                    },
                    [
                      _c("path", {
                        attrs: {
                          "stroke-linecap": "round",
                          "stroke-linejoin": "round",
                          "stroke-width": "2",
                          d: "m15 19-7-7 7-7",
                        },
                      }),
                    ]
                  ),
                  _vm._v("\n            Previous\n          "),
                ]
              ),
              _vm._v(" "),
              _c("h2", { staticClass: "calendar-title" }, [
                _vm._v(
                  "\n            GROUP TRAINING " +
                    _vm._s(_vm.formattedDate) +
                    "\n          "
                ),
              ]),
              _vm._v(" "),
              _c(
                "button",
                {
                  staticClass: "calendar-nav-btn",
                  on: { click: _vm.goToNextDate },
                },
                [
                  _vm._v("\n            Next\n            "),
                  _c(
                    "svg",
                    {
                      attrs: {
                        width: "20",
                        height: "20",
                        fill: "none",
                        stroke: "currentColor",
                        viewBox: "0 0 24 24",
                      },
                    },
                    [
                      _c("path", {
                        attrs: {
                          "stroke-linecap": "round",
                          "stroke-linejoin": "round",
                          "stroke-width": "2",
                          d: "m9 5 7 7-7 7",
                        },
                      }),
                    ]
                  ),
                ]
              ),
            ]),
          ]),
          _vm._v(" "),
          _c("div", { staticClass: "schedule-grid" }, [
            _c(
              "div",
              { staticClass: "time-column" },
              [
                _c("div", { staticClass: "time-header" }),
                _vm._v(" "),
                _vm._l(_vm.timeSlots, function (time) {
                  return _c("div", { key: time, staticClass: "time-slot" }, [
                    _vm._v("\n            " + _vm._s(time) + "\n          "),
                  ])
                }),
              ],
              2
            ),
            _vm._v(" "),
            _c("div", { staticClass: "schedule-content" }, [
              _c("div", { staticClass: "schedule-header" }, [
                _vm._v(_vm._s(_vm.formattedDate)),
              ]),
              _vm._v(" "),
              _c(
                "div",
                { staticClass: "schedule-slots" },
                [
                  _vm._l(_vm.timeSlots, function (slot, index) {
                    return _c("div", {
                      key: index,
                      staticClass: "schedule-slot clickable",
                      on: {
                        click: function ($event) {
                          return _vm.handleSlotClick(index)
                        },
                      },
                    })
                  }),
                  _vm._v(" "),
                  _vm._l(_vm.filteredEvents, function (event) {
                    return _c(
                      "div",
                      {
                        key: event.id,
                        staticClass: "event",
                        style: {
                          top: event.top + "px",
                          height: event.height + "px",
                        },
                        on: {
                          click: function ($event) {
                            $event.stopPropagation()
                            return _vm.openModal(event)
                          },
                        },
                      },
                      [
                        _c("div", { staticClass: "event-title" }, [
                          _vm._v(_vm._s(event.title)),
                        ]),
                        _vm._v(" "),
                        _c("div", { staticClass: "event-subtitle" }, [
                          _vm._v(_vm._s(event.subtitle)),
                        ]),
                        _vm._v(" "),
                        _c("div", { staticClass: "event-capacity" }, [
                          _vm._v(_vm._s(event.capacity)),
                        ]),
                      ]
                    )
                  }),
                ],
                2
              ),
            ]),
          ]),
          _vm._v(" "),
          _vm.selectedModal
            ? _c(
                "div",
                {
                  staticClass: "modal-overlay",
                  on: {
                    click: function ($event) {
                      if ($event.target !== $event.currentTarget) {
                        return null
                      }
                      return _vm.closeModal.apply(null, arguments)
                    },
                  },
                },
                [
                  _c("div", { staticClass: "modal" }, [
                    _c("div", { staticClass: "modal-header" }, [
                      _c("h2", { staticClass: "modal-title" }, [
                        _vm._v(_vm._s(_vm.selectedModal.title)),
                      ]),
                      _vm._v(" "),
                      _c(
                        "button",
                        {
                          staticClass: "modal-close",
                          on: { click: _vm.closeModal },
                        },
                        [_vm._v("X")]
                      ),
                    ]),
                    _vm._v(" "),
                    _c("div", [
                      _c("p", [
                        _c("strong", [_vm._v("Instructor:")]),
                        _vm._v(" " + _vm._s(_vm.selectedModal.instructor)),
                      ]),
                      _vm._v(" "),
                      _c("p", [
                        _c("strong", [_vm._v("Client:")]),
                        _vm._v(" " + _vm._s(_vm.selectedModal.client)),
                      ]),
                      _vm._v(" "),
                      _c("p", [
                        _c("strong", [_vm._v("Time:")]),
                        _vm._v(
                          " " + _vm._s(_vm.getEventTime(_vm.selectedModal.top))
                        ),
                      ]),
                    ]),
                  ]),
                ]
              )
            : _vm._e(),
          _vm._v(" "),
          _vm.showCreateModal
            ? _c("div", { staticClass: "modal-backdrop" }, [
                _c("div", { staticClass: "modal-box" }, [
                  _c("h3", { staticClass: "fw-bold" }, [
                    _vm._v("Create New Event"),
                  ]),
                  _vm._v(" "),
                  _c(
                    "form",
                    {
                      on: {
                        submit: function ($event) {
                          $event.preventDefault()
                          return _vm.createEvent.apply(null, arguments)
                        },
                      },
                    },
                    [
                      _c("div", [
                        _c("label", [_vm._v("Date:")]),
                        _vm._v(" "),
                        _c("input", {
                          attrs: { type: "text", disabled: "" },
                          domProps: { value: _vm.formattedDate },
                        }),
                      ]),
                      _vm._v(" "),
                      _c("div", [
                        _c("label", [_vm._v("Time:")]),
                        _vm._v(" "),
                        _c("input", {
                          attrs: { type: "text", disabled: "" },
                          domProps: {
                            value: _vm.timeSlots[_vm.selectedSlotIndex],
                          },
                        }),
                      ]),
                      _vm._v(" "),
                      _c("div", [
                        _c("label", [_vm._v("Staff:")]),
                        _vm._v(" "),
                        _c(
                          "select",
                          {
                            directives: [
                              {
                                name: "model",
                                rawName: "v-model",
                                value: _vm.newEvent.instructor,
                                expression: "newEvent.instructor",
                              },
                            ],
                            attrs: { required: "" },
                            on: {
                              change: function ($event) {
                                var $$selectedVal = Array.prototype.filter
                                  .call($event.target.options, function (o) {
                                    return o.selected
                                  })
                                  .map(function (o) {
                                    var val = "_value" in o ? o._value : o.value
                                    return val
                                  })
                                _vm.$set(
                                  _vm.newEvent,
                                  "instructor",
                                  $event.target.multiple
                                    ? $$selectedVal
                                    : $$selectedVal[0]
                                )
                              },
                            },
                          },
                          [
                            _c(
                              "option",
                              { attrs: { value: "", disabled: "" } },
                              [_vm._v("Select Staff")]
                            ),
                            _vm._v(" "),
                            _vm._l(_vm.coachOptions, function (coach) {
                              return _c(
                                "option",
                                { key: coach, domProps: { value: coach } },
                                [_vm._v(_vm._s(coach))]
                              )
                            }),
                          ],
                          2
                        ),
                      ]),
                      _vm._v(" "),
                      _c("div", [
                        _c("label", [_vm._v("Client:")]),
                        _vm._v(" "),
                        _c(
                          "select",
                          {
                            directives: [
                              {
                                name: "model",
                                rawName: "v-model",
                                value: _vm.newEvent.client,
                                expression: "newEvent.client",
                              },
                            ],
                            attrs: { required: "" },
                            on: {
                              change: function ($event) {
                                var $$selectedVal = Array.prototype.filter
                                  .call($event.target.options, function (o) {
                                    return o.selected
                                  })
                                  .map(function (o) {
                                    var val = "_value" in o ? o._value : o.value
                                    return val
                                  })
                                _vm.$set(
                                  _vm.newEvent,
                                  "client",
                                  $event.target.multiple
                                    ? $$selectedVal
                                    : $$selectedVal[0]
                                )
                              },
                            },
                          },
                          [
                            _c(
                              "option",
                              { attrs: { value: "", disabled: "" } },
                              [_vm._v("Select Client")]
                            ),
                            _vm._v(" "),
                            _vm._l(_vm.members, function (member) {
                              return _c(
                                "option",
                                {
                                  key: member.name,
                                  domProps: { value: member.name },
                                },
                                [_vm._v(_vm._s(member.name))]
                              )
                            }),
                          ],
                          2
                        ),
                      ]),
                      _vm._v(" "),
                      _c("div", [
                        _c("label", [_vm._v("Workout Type:")]),
                        _vm._v(" "),
                        _c("input", {
                          directives: [
                            {
                              name: "model",
                              rawName: "v-model",
                              value: _vm.newEvent.title,
                              expression: "newEvent.title",
                            },
                          ],
                          attrs: {
                            type: "text",
                            placeholder: "e.g., Cardio",
                            required: "",
                          },
                          domProps: { value: _vm.newEvent.title },
                          on: {
                            input: function ($event) {
                              if ($event.target.composing) {
                                return
                              }
                              _vm.$set(
                                _vm.newEvent,
                                "title",
                                $event.target.value
                              )
                            },
                          },
                        }),
                      ]),
                      _vm._v(" "),
                      _c("div", { staticClass: "modal-actions" }, [
                        _c("button", { attrs: { type: "submit" } }, [
                          _vm._v("Create"),
                        ]),
                        _vm._v(" "),
                        _c(
                          "button",
                          {
                            attrs: { type: "button" },
                            on: {
                              click: function ($event) {
                                _vm.showCreateModal = false
                              },
                            },
                          },
                          [_vm._v("Cancel")]
                        ),
                      ]),
                    ]
                  ),
                ]),
              ])
            : _vm._e(),
        ])
      : _vm._e(),
  ])
}
var staticRenderFns = [
  function () {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "nav-title" }, [
      _c("h1", { staticClass: "title" }, [_vm._v("Schedules")]),
    ])
  },
]
render._withStripped = true



/***/ })

}]);