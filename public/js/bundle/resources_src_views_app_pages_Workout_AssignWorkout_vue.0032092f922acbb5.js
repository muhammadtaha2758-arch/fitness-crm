"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["resources_src_views_app_pages_Workout_AssignWorkout_vue"],{

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/Workout/AssignWorkout.vue?vue&type=script&lang=js":
/*!*********************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/Workout/AssignWorkout.vue?vue&type=script&lang=js ***!
  \*********************************************************************************************************************************************************************************************************************/
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
  data: function data() {
    return {
      isLoading: false,
      selectAll: false,
      selectedAssignment: null,
      form: {
        member: null,
        assignment: null,
        startDate: null,
        endDate: null,
        frequency: "",
        difficulty: "",
        priority: "",
        notes: ""
      },
      assignedWorkouts: [{
        memberName: "John Doe",
        memberEmail: "john@example.com",
        memberAvatar: "/images/avatar/no_avatar.png",
        workoutName: "Full Body HIIT (Workout)",
        workoutCategory: "HIIT",
        startDate: "2024-01-15",
        endDate: "2024-02-15",
        frequency: "weekly",
        difficulty: "intermediate",
        priority: "high",
        notes: "Focus on form and consistency",
        status: "Active",
        progress: 75,
        selected: false
      }, {
        memberName: "Jane Smith",
        memberEmail: "jane@example.com",
        memberAvatar: "/images/avatar/no_avatar.png",
        workoutName: "30-Day Fat Burn Plan (Plan)",
        workoutCategory: "Weight Loss",
        startDate: "2024-01-10",
        endDate: "2024-02-10",
        frequency: "daily",
        difficulty: "beginner",
        priority: "medium",
        notes: "Great progress so far!",
        status: "Active",
        progress: 90,
        selected: false
      }, {
        memberName: "Mike Johnson",
        memberEmail: "mike@example.com",
        memberAvatar: "/images/avatar/no_avatar.png",
        workoutName: "Upper Body Strength (Workout)",
        workoutCategory: "Strength",
        startDate: "2024-01-05",
        endDate: null,
        frequency: "biweekly",
        difficulty: "advanced",
        priority: "low",
        notes: "Increase weight gradually",
        status: "Completed",
        progress: 100,
        selected: false
      }, {
        memberName: "Sarah Wilson",
        memberEmail: "sarah@example.com",
        memberAvatar: "/images/avatar/no_avatar.png",
        workoutName: "Cardio Blast (Workout)",
        workoutCategory: "Cardio",
        startDate: "2024-01-20",
        endDate: "2024-01-25",
        frequency: "weekly",
        difficulty: "intermediate",
        priority: "high",
        notes: "Paused due to injury",
        status: "Paused",
        progress: 25,
        selected: false
      }],
      memberOptions: [{
        value: "1",
        label: "John Doe",
        email: "john@example.com",
        avatar: "/images/avatar/no_avatar.png"
      }, {
        value: "2",
        label: "Jane Smith",
        email: "jane@example.com",
        avatar: "/images/avatar/no_avatar.png"
      }, {
        value: "3",
        label: "Mike Johnson",
        email: "mike@example.com",
        avatar: "/images/avatar/no_avatar.png"
      }, {
        value: "4",
        label: "Sarah Wilson",
        email: "sarah@example.com",
        avatar: "/images/avatar/no_avatar.png"
      }, {
        value: "5",
        label: "David Brown",
        email: "david@example.com",
        avatar: "/images/avatar/no_avatar.png"
      }],
      workoutOptions: [{
        value: "w1",
        label: "Full Body HIIT (Workout)",
        category: "HIIT"
      }, {
        value: "w2",
        label: "Upper Body Strength (Workout)",
        category: "Strength"
      }, {
        value: "w3",
        label: "Cardio Blast (Workout)",
        category: "Cardio"
      }, {
        value: "p1",
        label: "30-Day Fat Burn Plan (Plan)",
        category: "Weight Loss"
      }, {
        value: "p2",
        label: "Muscle Building Program (Plan)",
        category: "Strength"
      }, {
        value: "p3",
        label: "Beginner Fitness Plan (Plan)",
        category: "General"
      }],
      // Statistics data
      totalMembers: 125,
      totalWorkouts: 45,
      activeAssignments: 89,
      completionRate: 78
    };
  },
  computed: {
    isFormValid: function isFormValid() {
      return this.form.member && this.form.assignment && this.form.startDate;
    },
    isBulkFormValid: function isBulkFormValid() {
      return this.form.assignment && this.form.startDate;
    }
  },
  methods: {
    assignWorkout: function assignWorkout() {
      var _this = this;
      if (this.isFormValid) {
        var member = this.memberOptions.find(function (m) {
          return m.value === _this.form.member;
        });
        var workout = this.workoutOptions.find(function (w) {
          return w.value === _this.form.assignment;
        });
        var newAssignment = {
          memberName: member.label,
          memberEmail: member.email,
          memberAvatar: member.avatar,
          workoutName: workout.label,
          workoutCategory: workout.category,
          startDate: this.form.startDate,
          endDate: this.form.endDate,
          frequency: this.form.frequency,
          difficulty: this.form.difficulty,
          priority: this.form.priority,
          notes: this.form.notes,
          status: "Active",
          progress: 0,
          selected: false
        };
        this.assignedWorkouts.push(newAssignment);
        this.resetForm();
        this.$bvToast.toast("Workout assigned successfully!", {
          title: "Success",
          variant: "success",
          solid: true
        });
      }
    },
    resetForm: function resetForm() {
      this.form = {
        member: null,
        assignment: null,
        startDate: null,
        endDate: null,
        frequency: "",
        difficulty: "",
        priority: "",
        notes: ""
      };
    },
    removeAssignment: function removeAssignment(index) {
      var _this2 = this;
      this.$bvModal.msgBoxConfirm("Are you sure you want to remove this assignment?", {
        title: "Confirm Removal",
        size: "sm",
        buttonSize: "sm",
        okVariant: "danger",
        okTitle: "Remove",
        cancelTitle: "Cancel",
        footerClass: "p-2",
        hideHeaderClose: false,
        centered: true
      }).then(function (value) {
        if (value) {
          _this2.assignedWorkouts.splice(index, 1);
          _this2.$bvToast.toast("Assignment removed successfully!", {
            title: "Success",
            variant: "success",
            solid: true
          });
        }
      });
    },
    editAssignment: function editAssignment(index) {
      var assignment = this.assignedWorkouts[index];
      var member = this.memberOptions.find(function (m) {
        return m.label === assignment.memberName;
      });
      var workout = this.workoutOptions.find(function (w) {
        return w.label === assignment.workoutName;
      });
      this.form = {
        member: member ? member.value : null,
        assignment: workout ? workout.value : null,
        startDate: assignment.startDate,
        endDate: assignment.endDate,
        frequency: assignment.frequency,
        difficulty: assignment.difficulty,
        priority: assignment.priority,
        notes: assignment.notes
      };
      this.assignedWorkouts.splice(index, 1);
    },
    viewProgress: function viewProgress(index) {
      this.selectedAssignment = this.assignedWorkouts[index];
      this.$bvModal.show("progress-modal");
    },
    toggleSelectAll: function toggleSelectAll() {
      var _this3 = this;
      this.assignedWorkouts.forEach(function (assignment) {
        assignment.selected = _this3.selectAll;
      });
    },
    formatDate: function formatDate(date) {
      if (!date) return "-";
      return new Date(date).toLocaleDateString();
    },
    getStatusBadgeClass: function getStatusBadgeClass(status) {
      var classes = {
        Active: "status-active",
        Completed: "status-completed",
        Paused: "status-paused",
        Expired: "status-expired"
      };
      return classes[status] || "status-default";
    },
    getSelectedAssignmentValue: function getSelectedAssignmentValue(property) {
      return this.selectedAssignment && this.selectedAssignment[property] ? this.selectedAssignment[property] : "";
    },
    assignToAllMembers: function assignToAllMembers() {
      var _this4 = this;
      if (this.isBulkFormValid) {
        var workout = this.workoutOptions.find(function (w) {
          return w.value === _this4.form.assignment;
        });

        // Show confirmation modal
        this.$bvModal.msgBoxConfirm("Are you sure you want to assign \"".concat(workout.label, "\" to all ").concat(this.memberOptions.length, " members?"), {
          title: "Confirm Bulk Assignment",
          size: "md",
          buttonSize: "sm",
          okVariant: "success",
          okTitle: "Assign to All",
          cancelTitle: "Cancel",
          footerClass: "p-2",
          hideHeaderClose: false,
          centered: true
        }).then(function (confirmed) {
          if (confirmed) {
            _this4.performBulkAssignment(workout);
          }
        });
      }
    },
    performBulkAssignment: function performBulkAssignment(workout) {
      var _this5 = this;
      var assignmentsCreated = 0;
      this.memberOptions.forEach(function (member) {
        // Check if assignment already exists for this member and workout
        var existingAssignment = _this5.assignedWorkouts.find(function (assignment) {
          return assignment.memberName === member.label && assignment.workoutName === workout.label;
        });
        if (!existingAssignment) {
          var newAssignment = {
            memberName: member.label,
            memberEmail: member.email,
            memberAvatar: member.avatar,
            workoutName: workout.label,
            workoutCategory: workout.category,
            startDate: _this5.form.startDate,
            endDate: _this5.form.endDate,
            frequency: _this5.form.frequency,
            difficulty: _this5.form.difficulty,
            priority: _this5.form.priority,
            notes: _this5.form.notes,
            status: "Active",
            progress: 0,
            selected: false
          };
          _this5.assignedWorkouts.push(newAssignment);
          assignmentsCreated++;
        }
      });

      // Show success message
      if (assignmentsCreated > 0) {
        this.$bvToast.toast("Successfully assigned \"".concat(workout.label, "\" to ").concat(assignmentsCreated, " members!"), {
          title: "Bulk Assignment Complete",
          variant: "success",
          solid: true
        });
      } else {
        this.$bvToast.toast("All members already have this workout assigned.", {
          title: "No New Assignments",
          variant: "info",
          solid: true
        });
      }

      // Reset form after successful assignment
      this.resetForm();
    }
  }
});

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js??clonedRuleSet-12.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12.use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-12.use[3]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/Workout/AssignWorkout.vue?vue&type=style&index=0&id=e9f7a822&lang=scss&scoped=true":
/*!************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??clonedRuleSet-12.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12.use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-12.use[3]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/Workout/AssignWorkout.vue?vue&type=style&index=0&id=e9f7a822&lang=scss&scoped=true ***!
  \************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
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
___CSS_LOADER_EXPORT___.push([module.id, "@charset \"UTF-8\";\n.filter-btn .btn[data-v-e9f7a822],\n.filter-btn .btn-secondary[data-v-e9f7a822],\n.filter-btn .btn-outline-secondary[data-v-e9f7a822],\n.filter-btn button.btn[data-v-e9f7a822],\n.filter-btn button.btn-secondary[data-v-e9f7a822] {\n  color: #000 !important;\n  background-color: transparent !important;\n  border-color: #6c757d !important;\n}\n.filter-btn .btn[data-v-e9f7a822]:hover,\n.filter-btn .btn-secondary[data-v-e9f7a822]:hover,\n.filter-btn .btn-outline-secondary[data-v-e9f7a822]:hover,\n.filter-btn button.btn[data-v-e9f7a822]:hover,\n.filter-btn button.btn-secondary[data-v-e9f7a822]:hover {\n  color: #dc3545 !important;\n  background-color: transparent !important;\n  border-color: #dc3545 !important;\n  box-shadow: none !important;\n}\n.filter-btn .btn[data-v-e9f7a822]:focus,\n.filter-btn .btn-secondary[data-v-e9f7a822]:focus,\n.filter-btn .btn-outline-secondary[data-v-e9f7a822]:focus,\n.filter-btn button.btn[data-v-e9f7a822]:focus,\n.filter-btn button.btn-secondary[data-v-e9f7a822]:focus {\n  color: #dc3545 !important;\n  background-color: transparent !important;\n  border-color: #dc3545 !important;\n  box-shadow: none !important;\n}\n.filter-btn .btn[data-v-e9f7a822]:active,\n.filter-btn .btn-secondary[data-v-e9f7a822]:active,\n.filter-btn .btn-outline-secondary[data-v-e9f7a822]:active,\n.filter-btn button.btn[data-v-e9f7a822]:active,\n.filter-btn button.btn-secondary[data-v-e9f7a822]:active {\n  color: #dc3545 !important;\n  background-color: transparent !important;\n  border-color: #dc3545 !important;\n}\n.btn-secondary[data-v-e9f7a822]:not(:disabled):not(.disabled):active:focus {\n  box-shadow: none !important;\n}\n\n/* ===========================================\n   COMMON BREADCRUMB NAVIGATION STYLES\n   =========================================== */\n.breadcrumb-nav-row[data-v-e9f7a822] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  margin-bottom: 0.5rem;\n  gap: 0.5rem;\n}\n.breadcrumb-section[data-v-e9f7a822] {\n  flex: 1;\n}\n.breadcrumb-section .breadcrumb-nav .breadcrumb-container[data-v-e9f7a822] {\n  display: flex;\n  align-items: center;\n  gap: 1rem;\n}\n.breadcrumb-section .breadcrumb-nav .breadcrumb-container .back-button[data-v-e9f7a822] {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  width: 40px;\n  height: 40px;\n  background: rgba(255, 255, 255, 0.1);\n  border: 1px solid rgba(255, 255, 255, 0.2);\n  border-radius: 8px;\n  color: #ffffff;\n  cursor: pointer;\n  transition: all 0.3s ease;\n}\n.breadcrumb-section .breadcrumb-nav .breadcrumb-container .back-button[data-v-e9f7a822]:hover {\n  background: rgba(255, 255, 255, 0.15);\n  border-color: rgba(255, 255, 255, 0.3);\n  transform: translateY(-1px);\n  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);\n  color: #dc3545;\n}\n.breadcrumb-section .breadcrumb-nav .breadcrumb-container .back-button i[data-v-e9f7a822] {\n  font-size: 1.1em;\n}\n.breadcrumb-section .breadcrumb-nav .breadcrumb-container .breadcrumb[data-v-e9f7a822] {\n  display: flex;\n  align-items: center;\n  gap: 0.5rem;\n  margin: 0;\n  padding: 0;\n  background: none;\n  border-radius: 0;\n}\n.breadcrumb-section .breadcrumb-nav .breadcrumb-container .breadcrumb .breadcrumb-item[data-v-e9f7a822] {\n  display: flex;\n  align-items: center;\n  gap: 0.5rem;\n  font-size: 0.875rem;\n  color: #ffffff;\n}\n.breadcrumb-section .breadcrumb-nav .breadcrumb-container .breadcrumb .breadcrumb-item.active[data-v-e9f7a822] {\n  color: #252525;\n  font-weight: 600;\n}\n.breadcrumb-section .breadcrumb-nav .breadcrumb-container .breadcrumb .breadcrumb-item.active i[data-v-e9f7a822] {\n  color: #dc3545;\n}\n.breadcrumb-section .breadcrumb-nav .breadcrumb-container .breadcrumb .breadcrumb-item a[data-v-e9f7a822] {\n  display: flex;\n  align-items: center;\n  gap: 0.5rem;\n  color: #6a6a6a;\n  text-decoration: none;\n  transition: color 0.3s ease;\n}\n.breadcrumb-section .breadcrumb-nav .breadcrumb-container .breadcrumb .breadcrumb-item a[data-v-e9f7a822]:hover {\n  color: #dc3545;\n}\n.breadcrumb-section .breadcrumb-nav .breadcrumb-container .breadcrumb .breadcrumb-item a:hover i[data-v-e9f7a822] {\n  color: #dc3545;\n}\n.breadcrumb-section .breadcrumb-nav .breadcrumb-container .breadcrumb .breadcrumb-item a i[data-v-e9f7a822] {\n  font-size: 0.9em;\n  transition: color 0.3s ease;\n}\n.breadcrumb-section .breadcrumb-nav .breadcrumb-container .breadcrumb .breadcrumb-item[data-v-e9f7a822]:not(:last-child)::after {\n  content: \"›\";\n  margin-left: 0.5rem;\n  color: #6a6a6a;\n  font-size: 1.2em;\n}\n.action-section[data-v-e9f7a822] {\n  display: flex;\n  align-items: center;\n}\n.action-section .action-btn[data-v-e9f7a822] {\n  display: flex;\n  align-items: center;\n  gap: 0.5rem;\n  padding: 0.5rem 1rem;\n  border-radius: 8px;\n  font-size: 0.875rem;\n  font-weight: 500;\n  transition: all 0.3s ease;\n}\n.action-section .action-btn[data-v-e9f7a822]:hover:not(:disabled) {\n  transform: translateY(-1px);\n  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);\n}\n.action-section .action-btn[data-v-e9f7a822]:disabled {\n  opacity: 0.6;\n  cursor: not-allowed;\n}\n.action-section .action-btn i[data-v-e9f7a822] {\n  font-size: 0.9em;\n}\n@media (max-width: 768px) {\n.breadcrumb-nav-row[data-v-e9f7a822] {\n    flex-direction: column;\n    align-items: flex-start;\n    gap: 0.5rem;\n}\n.breadcrumb-section[data-v-e9f7a822] {\n    width: 100%;\n}\n.breadcrumb-section .breadcrumb-container[data-v-e9f7a822] {\n    flex-direction: column;\n    align-items: flex-start;\n    gap: 0.5rem;\n}\n.breadcrumb-section .breadcrumb-container .breadcrumb[data-v-e9f7a822] {\n    flex-wrap: wrap;\n}\n.breadcrumb-section .breadcrumb-container .breadcrumb .breadcrumb-item[data-v-e9f7a822] {\n    font-size: 0.8rem;\n}\n.breadcrumb-section .breadcrumb-container .breadcrumb .breadcrumb-item a[data-v-e9f7a822] {\n    font-size: 0.8rem;\n}\n.action-section[data-v-e9f7a822] {\n    width: 100%;\n    justify-content: flex-end;\n}\n.action-section .action-btn[data-v-e9f7a822] {\n    font-size: 0.8rem;\n    padding: 0.4rem 0.8rem;\n}\n}\n/* ===========================================\n   RESPONSIVE UTILITY CLASSES (ALL DEVICES)\n   =========================================== */\n.show-xs-only[data-v-e9f7a822],\n.show-sm-only[data-v-e9f7a822],\n.show-md-only[data-v-e9f7a822],\n.show-lg-only[data-v-e9f7a822],\n.show-xl-only[data-v-e9f7a822] {\n  display: none !important;\n}\n@media (max-width: 575px) {\n.hide-xs[data-v-e9f7a822] {\n    display: none !important;\n}\n.show-xs-only[data-v-e9f7a822] {\n    display: initial !important;\n}\n}\n@media (min-width: 576px) and (max-width: 767px) {\n.hide-sm[data-v-e9f7a822] {\n    display: none !important;\n}\n.show-sm-only[data-v-e9f7a822] {\n    display: initial !important;\n}\n}\n@media (min-width: 768px) and (max-width: 991px) {\n.hide-md[data-v-e9f7a822] {\n    display: none !important;\n}\n.show-md-only[data-v-e9f7a822] {\n    display: initial !important;\n}\n}\n@media (min-width: 992px) and (max-width: 1199px) {\n.hide-lg[data-v-e9f7a822] {\n    display: none !important;\n}\n.show-lg-only[data-v-e9f7a822] {\n    display: initial !important;\n}\n}\n@media (min-width: 1200px) {\n.hide-xl[data-v-e9f7a822] {\n    display: none !important;\n}\n.show-xl-only[data-v-e9f7a822] {\n    display: initial !important;\n}\n}\n@media (max-width: 576px) {\n.hide-sm-down[data-v-e9f7a822] {\n    display: none !important;\n}\n}\n@media (max-width: 768px) {\n.hide-md-down[data-v-e9f7a822] {\n    display: none !important;\n}\n}\n@media (max-width: 992px) {\n.hide-lg-down[data-v-e9f7a822] {\n    display: none !important;\n}\n}\n@media (min-width: 576px) {\n.hide-sm-up[data-v-e9f7a822] {\n    display: none !important;\n}\n}\n@media (min-width: 768px) {\n.hide-md-up[data-v-e9f7a822] {\n    display: none !important;\n}\n}\n@media (min-width: 992px) {\n.hide-lg-up[data-v-e9f7a822] {\n    display: none !important;\n}\n}\n@media (max-width: 575px) {\n.d-xs-none[data-v-e9f7a822] {\n    display: none !important;\n}\n.d-xs-block[data-v-e9f7a822] {\n    display: block !important;\n}\n.d-xs-flex[data-v-e9f7a822] {\n    display: flex !important;\n}\n}\n@media (min-width: 576px) and (max-width: 767px) {\n.d-sm-none[data-v-e9f7a822] {\n    display: none !important;\n}\n.d-sm-block[data-v-e9f7a822] {\n    display: block !important;\n}\n.d-sm-flex[data-v-e9f7a822] {\n    display: flex !important;\n}\n}\n@media (min-width: 768px) and (max-width: 991px) {\n.d-md-none[data-v-e9f7a822] {\n    display: none !important;\n}\n.d-md-block[data-v-e9f7a822] {\n    display: block !important;\n}\n.d-md-flex[data-v-e9f7a822] {\n    display: flex !important;\n}\n}\n@media (min-width: 992px) and (max-width: 1199px) {\n.d-lg-none[data-v-e9f7a822] {\n    display: none !important;\n}\n.d-lg-block[data-v-e9f7a822] {\n    display: block !important;\n}\n.d-lg-flex[data-v-e9f7a822] {\n    display: flex !important;\n}\n}\n@media (min-width: 1200px) {\n.d-xl-none[data-v-e9f7a822] {\n    display: none !important;\n}\n.d-xl-block[data-v-e9f7a822] {\n    display: block !important;\n}\n.d-xl-flex[data-v-e9f7a822] {\n    display: flex !important;\n}\n}\n@media (min-width: 576px) {\n.custom-modal-xl[data-v-e9f7a822] {\n    max-width: 1500px !important;\n}\n}\n.main-content[data-v-e9f7a822] {\n  padding: 2rem;\n  background: #f5f5f3;\n  min-height: 100vh;\n  position: relative;\n}\n.main-content[data-v-e9f7a822]::before {\n  content: \"\";\n  position: fixed;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  background: radial-gradient(circle at 20% 80%, rgba(255, 64, 64, 0.1) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(40, 167, 69, 0.1) 0%, transparent 50%), radial-gradient(circle at 40% 40%, rgba(23, 162, 184, 0.05) 0%, transparent 50%);\n  pointer-events: none;\n  z-index: -1;\n}\n.stats-container .stat-card[data-v-e9f7a822] {\n  background: rgba(255, 255, 255, 0.95);\n  -webkit-backdrop-filter: blur(10px);\n          backdrop-filter: blur(10px);\n  border-radius: 20px;\n  padding: 2rem;\n  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1), 0 2px 8px rgba(0, 0, 0, 0.05);\n  border: 1px solid rgba(255, 255, 255, 0.2);\n  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);\n  height: 120px;\n  display: flex;\n  align-items: center;\n  position: relative;\n  overflow: hidden;\n}\n.stats-container .stat-card[data-v-e9f7a822]::before {\n  content: \"\";\n  position: absolute;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  background: linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, transparent 100%);\n  opacity: 0;\n  transition: opacity 0.3s ease;\n}\n.stats-container .stat-card[data-v-e9f7a822]:hover {\n  transform: translateY(-4px) scale(1.02);\n  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15), 0 8px 16px rgba(0, 0, 0, 0.1);\n}\n.stats-container .stat-card[data-v-e9f7a822]:hover::before {\n  opacity: 1;\n}\n.stats-container .stat-card:hover .stat-icon[data-v-e9f7a822] {\n  transform: scale(1.1) rotate(5deg);\n}\n.stats-container .stat-card .stat-icon[data-v-e9f7a822] {\n  width: 60px;\n  height: 60px;\n  border-radius: 16px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  margin-right: 1.5rem;\n  transition: all 0.3s ease;\n  position: relative;\n}\n.stats-container .stat-card .stat-icon[data-v-e9f7a822]::after {\n  content: \"\";\n  position: absolute;\n  top: -2px;\n  left: -2px;\n  right: -2px;\n  bottom: -2px;\n  border-radius: 18px;\n  background: linear-gradient(45deg, transparent, rgba(255, 255, 255, 0.3), transparent);\n  opacity: 0;\n  transition: opacity 0.3s ease;\n}\n.stats-container .stat-card .stat-icon[data-v-e9f7a822]:hover::after {\n  opacity: 1;\n}\n.stats-container .stat-card .stat-icon i[data-v-e9f7a822] {\n  font-size: 1.8rem;\n  color: white;\n  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2));\n}\n.stats-container .stat-card .stat-content h3[data-v-e9f7a822] {\n  font-size: 1.8rem;\n  font-weight: 700;\n  margin: 0;\n  color: #000000;\n  background: linear-gradient(135deg, #000000, #666);\n  -webkit-background-clip: text;\n  -webkit-text-fill-color: transparent;\n  background-clip: text;\n}\n.stats-container .stat-card .stat-content p[data-v-e9f7a822] {\n  margin: 0;\n  color: #252525;\n  font-weight: 500;\n  font-size: 0.85rem;\n  text-transform: uppercase;\n  letter-spacing: 0.5px;\n}\n.stats-container .stat-card.stat-card-primary .stat-icon[data-v-e9f7a822] {\n  box-shadow: 0 8px 20px rgba(255, 64, 64, 0.3);\n}\n.stats-container .stat-card.stat-card-success .stat-icon[data-v-e9f7a822] {\n  box-shadow: 0 8px 20px rgba(40, 167, 69, 0.3);\n}\n.stats-container .stat-card.stat-card-warning .stat-icon[data-v-e9f7a822] {\n  box-shadow: 0 8px 20px rgba(255, 193, 7, 0.3);\n}\n.stats-container .stat-card.stat-card-info .stat-icon[data-v-e9f7a822] {\n  box-shadow: 0 8px 20px rgba(23, 162, 184, 0.3);\n}\n.assignment-form-container .form-card[data-v-e9f7a822] {\n  background: rgba(255, 255, 255, 0.95);\n  -webkit-backdrop-filter: blur(15px);\n          backdrop-filter: blur(15px);\n  border-radius: 24px;\n  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1), 0 8px 16px rgba(0, 0, 0, 0.05);\n  border: 1px solid rgba(255, 255, 255, 0.3);\n  overflow: hidden;\n  position: relative;\n}\n.assignment-form-container .form-card[data-v-e9f7a822]::before {\n  content: \"\";\n  position: absolute;\n  top: 0;\n  left: 0;\n  right: 0;\n  height: 4px;\n}\n.assignment-form-container .form-header[data-v-e9f7a822] {\n  background: #f5f5f3;\n  color: #000000;\n  padding: 1rem 2rem;\n  text-align: center;\n  position: relative;\n  overflow: hidden;\n}\n.assignment-form-container .form-header[data-v-e9f7a822]::before {\n  content: \"\";\n  position: absolute;\n  top: -50%;\n  left: -50%;\n  width: 200%;\n  height: 200%;\n  background: radial-gradient(circle, rgba(255, 255, 255, 0.1) 0%, transparent 70%);\n  animation: float-data-v-e9f7a822 6s ease-in-out infinite;\n}\n.assignment-form-container .form-header .header-icon[data-v-e9f7a822] {\n  width: 100px;\n  height: 100px;\n  background: rgba(255, 255, 255, 0.15);\n  border-radius: 50%;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  margin: 0 auto 1.5rem;\n  position: relative;\n  -webkit-backdrop-filter: blur(10px);\n          backdrop-filter: blur(10px);\n  border: 2px solid rgba(255, 255, 255, 0.2);\n  transition: all 0.3s ease;\n}\n.assignment-form-container .form-header .header-icon[data-v-e9f7a822]:hover {\n  transform: scale(1.05) rotate(5deg);\n  background: rgba(255, 255, 255, 0.25);\n}\n.assignment-form-container .form-header .header-icon i[data-v-e9f7a822] {\n  font-size: 2.5rem;\n  color: white;\n  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2));\n}\n.assignment-form-container .form-header .form-title[data-v-e9f7a822] {\n  font-size: 2.2rem;\n  font-weight: 700;\n  margin-bottom: 0.75rem;\n  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);\n  position: relative;\n}\n.assignment-form-container .form-header .form-subtitle[data-v-e9f7a822] {\n  font-size: 1rem;\n  opacity: 0.95;\n  margin: 0;\n  font-weight: 400;\n  position: relative;\n}\n.assignment-form-container .assignment-form[data-v-e9f7a822] {\n  padding: 3rem;\n}\n.assignment-form-container .form-section[data-v-e9f7a822] {\n  margin-bottom: 3rem;\n  position: relative;\n}\n.assignment-form-container .form-section[data-v-e9f7a822]::before {\n  content: \"\";\n  position: absolute;\n  top: -1rem;\n  left: -1rem;\n  right: -1rem;\n  bottom: -1rem;\n  background: linear-gradient(135deg, rgba(255, 64, 64, 0.02) 0%, rgba(255, 255, 255, 0.02) 100%);\n  border-radius: 16px;\n  opacity: 0;\n  transition: opacity 0.3s ease;\n}\n.assignment-form-container .form-section[data-v-e9f7a822]:hover::before {\n  opacity: 1;\n}\n.assignment-form-container .form-section .section-header[data-v-e9f7a822] {\n  display: flex;\n  align-items: center;\n  margin-bottom: 2rem;\n  position: relative;\n}\n.assignment-form-container .form-section .section-header .section-icon[data-v-e9f7a822] {\n  width: 50px;\n  height: 50px;\n  border-radius: 14px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  margin-right: 1.5rem;\n  position: relative;\n  box-shadow: 0 8px 20px rgba(255, 64, 64, 0.2);\n  transition: all 0.3s ease;\n}\n.assignment-form-container .form-section .section-header .section-icon[data-v-e9f7a822]::after {\n  content: \"\";\n  position: absolute;\n  top: -2px;\n  left: -2px;\n  right: -2px;\n  bottom: -2px;\n  border-radius: 16px;\n  background: linear-gradient(45deg, transparent, rgba(255, 255, 255, 0.3), transparent);\n  opacity: 0;\n  transition: opacity 0.3s ease;\n}\n.assignment-form-container .form-section .section-header .section-icon[data-v-e9f7a822]:hover {\n  transform: scale(1.1) rotate(5deg);\n}\n.assignment-form-container .form-section .section-header .section-icon[data-v-e9f7a822]:hover::after {\n  opacity: 1;\n}\n.assignment-form-container .form-section .section-header .section-icon i[data-v-e9f7a822] {\n  color: white;\n  font-size: 1.4rem;\n  filter: drop-shadow(0 1px 2px rgba(0, 0, 0, 0.2));\n}\n.assignment-form-container .form-section .section-header .section-title[data-v-e9f7a822] {\n  font-size: 1.2rem;\n  font-weight: 600;\n  color: #000000;\n  margin: 0;\n  background: linear-gradient(135deg, #000000, #666);\n  -webkit-background-clip: text;\n  -webkit-text-fill-color: transparent;\n  background-clip: text;\n}\n.assignment-form-container .form-group[data-v-e9f7a822] {\n  position: relative;\n}\n.assignment-form-container .form-label[data-v-e9f7a822] {\n  font-weight: 600;\n  color: #000000;\n  margin-bottom: 0.5rem;\n  display: block;\n  font-size: 0.9rem;\n  text-transform: uppercase;\n  letter-spacing: 0.5px;\n  position: relative;\n}\n.assignment-form-container .form-label[data-v-e9f7a822]::after {\n  content: \"\";\n  position: absolute;\n  bottom: -2px;\n  left: 0;\n  width: 25px;\n  height: 2px;\n  border-radius: 1px;\n}\n.assignment-form-container .form-control[data-v-e9f7a822] {\n  width: 100%;\n  border: 2px solid #dcdcdc;\n  border-radius: 8px;\n  font-size: 0.9rem;\n  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);\n  background: #dededc;\n  color: #000000;\n  padding: 0.75rem 1rem 0.75rem 2.5rem;\n  box-sizing: border-box;\n  position: relative;\n  min-height: 45px;\n}\n.assignment-form-container .form-control[data-v-e9f7a822]:focus {\n  outline: none;\n  border-color: #dc3545;\n  box-shadow: 0 0 0 3px rgba(255, 64, 64, 0.1), 0 4px 12px rgba(0, 0, 0, 0.1);\n  transform: translateY(-1px);\n  background: white;\n}\n.assignment-form-container .form-control.has-value[data-v-e9f7a822] {\n  border-color: #dc3545;\n  background: white;\n  box-shadow: 0 2px 8px rgba(255, 64, 64, 0.1);\n}\n.assignment-form-container .form-control[data-v-e9f7a822]::-moz-placeholder {\n  color: #999;\n  font-weight: 400;\n}\n.assignment-form-container .form-control[data-v-e9f7a822]::placeholder {\n  color: #999;\n  font-weight: 400;\n}\n.assignment-form-container .v-select .vs__dropdown-toggle[data-v-e9f7a822] {\n  border: 2px solid #dcdcdc;\n  border-radius: 8px;\n  background: #dededc;\n  padding: 0.75rem 1rem 0.75rem 2.5rem;\n  min-height: 45px;\n}\n.assignment-form-container .v-select .vs__dropdown-toggle[data-v-e9f7a822]:focus-within {\n  border-color: #dc3545;\n  box-shadow: 0 0 0 3px rgba(255, 64, 64, 0.1), 0 4px 12px rgba(0, 0, 0, 0.1);\n  transform: translateY(-1px);\n  background: white;\n}\n.assignment-form-container .v-select .vs__selected-options[data-v-e9f7a822] {\n  padding: 0;\n}\n.assignment-form-container .v-select .vs__actions[data-v-e9f7a822] {\n  padding: 0;\n}\n.assignment-form-container .v-select .vs__search[data-v-e9f7a822] {\n  margin: 0;\n  padding: 0;\n  font-size: 0.9rem;\n  color: #000000;\n}\n.assignment-form-container .v-select .vs__search[data-v-e9f7a822]::-moz-placeholder {\n  color: #999;\n  font-weight: 400;\n}\n.assignment-form-container .v-select .vs__search[data-v-e9f7a822]::placeholder {\n  color: #999;\n  font-weight: 400;\n}\n.assignment-form-container .v-select .vs__dropdown-menu[data-v-e9f7a822] {\n  border: 2px solid #dc3545;\n  border-radius: 8px;\n  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);\n  background: white;\n}\n.assignment-form-container .v-select .vs__dropdown-option[data-v-e9f7a822] {\n  padding: 0.75rem 1rem;\n  font-size: 0.9rem;\n  color: #000000;\n}\n.assignment-form-container .v-select .vs__dropdown-option--highlight[data-v-e9f7a822] {\n  background: rgba(255, 64, 64, 0.1);\n  color: #dc3545;\n}\n.assignment-form-container .input-icon[data-v-e9f7a822] {\n  position: absolute;\n  left: 10px;\n  top: 50%;\n  transform: translateY(-50%);\n  color: #dc3545;\n  font-size: 1rem;\n  pointer-events: none;\n  transition: all 0.3s ease;\n  z-index: 2;\n}\n.assignment-form-container .textarea-icon[data-v-e9f7a822] {\n  top: 25px;\n  transform: none;\n}\n.assignment-form-container .form-control:focus + .input-icon[data-v-e9f7a822] {\n  color: #dc3545;\n  transform: translateY(-50%) scale(1.05);\n}\n.assignment-form-container .submit-section[data-v-e9f7a822] {\n  text-align: center;\n  margin-top: 3rem;\n  padding-top: 3rem;\n  border-top: 2px solid #dcdcdc;\n  position: relative;\n}\n.assignment-form-container .submit-section[data-v-e9f7a822]::before {\n  content: \"\";\n  position: absolute;\n  top: -1px;\n  left: 50%;\n  transform: translateX(-50%);\n  width: 100px;\n  height: 2px;\n  border-radius: 1px;\n}\n.assignment-form-container .submit-section .submit-buttons[data-v-e9f7a822] {\n  display: flex;\n  gap: 1rem;\n  justify-content: center;\n  align-items: center;\n  flex-wrap: wrap;\n}\n.assignment-form-container .submit-btn[data-v-e9f7a822] {\n  color: white;\n  border: none;\n  padding: 1rem 2.5rem;\n  border-radius: 50px;\n  font-size: 1rem;\n  font-weight: 600;\n  cursor: pointer;\n  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);\n  box-shadow: 0 8px 25px rgba(255, 64, 64, 0.3), 0 4px 12px rgba(0, 0, 0, 0.1);\n  display: inline-flex;\n  align-items: center;\n  gap: 0.5rem;\n  position: relative;\n  overflow: hidden;\n}\n.assignment-form-container .submit-btn[data-v-e9f7a822]::before {\n  content: \"\";\n  position: absolute;\n  top: 0;\n  left: -100%;\n  width: 100%;\n  height: 100%;\n  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);\n  transition: left 0.5s ease;\n}\n.assignment-form-container .submit-btn[data-v-e9f7a822]:hover:not(:disabled) {\n  transform: translateY(-3px) scale(1.05);\n  box-shadow: 0 20px 40px rgba(255, 64, 64, 0.4), 0 8px 16px rgba(0, 0, 0, 0.15);\n}\n.assignment-form-container .submit-btn[data-v-e9f7a822]:hover:not(:disabled)::before {\n  left: 100%;\n}\n.assignment-form-container .submit-btn[data-v-e9f7a822]:active:not(:disabled) {\n  transform: translateY(-1px) scale(1.02);\n}\n.assignment-form-container .submit-btn[data-v-e9f7a822]:disabled {\n  opacity: 0.6;\n  cursor: not-allowed;\n  transform: none;\n}\n.assignment-form-container .submit-btn i[data-v-e9f7a822] {\n  font-size: 1rem;\n  filter: drop-shadow(0 1px 2px rgba(0, 0, 0, 0.2));\n}\n.assignment-form-container .submit-btn.submit-btn-all[data-v-e9f7a822] {\n  background: linear-gradient(135deg, #28a745, #20c997);\n  box-shadow: 0 8px 25px rgba(40, 167, 69, 0.3), 0 4px 12px rgba(0, 0, 0, 0.1);\n}\n.assignment-form-container .submit-btn.submit-btn-all[data-v-e9f7a822]:hover:not(:disabled) {\n  box-shadow: 0 20px 40px rgba(40, 167, 69, 0.4), 0 8px 16px rgba(0, 0, 0, 0.15);\n}\n.assignments-container .assignments-card[data-v-e9f7a822] {\n  background: rgba(255, 255, 255, 0.95);\n  -webkit-backdrop-filter: blur(15px);\n          backdrop-filter: blur(15px);\n  border-radius: 24px;\n  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1), 0 8px 16px rgba(0, 0, 0, 0.05);\n  border: 1px solid rgba(255, 255, 255, 0.3);\n  overflow: hidden;\n  position: relative;\n}\n.assignments-container .assignments-card[data-v-e9f7a822]::before {\n  content: \"\";\n  position: absolute;\n  top: 0;\n  left: 0;\n  right: 0;\n  height: 4px;\n}\n.assignments-container .assignments-header[data-v-e9f7a822] {\n  background: linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(248, 249, 250, 0.9) 100%);\n  -webkit-backdrop-filter: blur(10px);\n          backdrop-filter: blur(10px);\n  padding: 2rem;\n  border-bottom: 1px solid rgba(255, 255, 255, 0.2);\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  position: relative;\n}\n.assignments-container .assignments-header[data-v-e9f7a822]::before {\n  content: \"\";\n  position: absolute;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  background: linear-gradient(135deg, rgba(255, 64, 64, 0.05) 0%, transparent 100%);\n  pointer-events: none;\n}\n.assignments-container .assignments-header h4[data-v-e9f7a822] {\n  font-size: 1.4rem;\n  font-weight: 700;\n  color: #000000;\n  margin: 0;\n  background: linear-gradient(135deg, #000000, #666);\n  -webkit-background-clip: text;\n  -webkit-text-fill-color: transparent;\n  background-clip: text;\n  position: relative;\n}\n.assignments-container .assignments-header .header-actions[data-v-e9f7a822] {\n  display: flex;\n  align-items: center;\n  gap: 1.5rem;\n  position: relative;\n}\n.assignments-container .assignments-header .header-actions .btn-filter[data-v-e9f7a822],\n.assignments-container .assignments-header .header-actions .btn-export[data-v-e9f7a822] {\n  border-radius: 12px;\n  font-weight: 700;\n  padding: 0.75rem 1.5rem;\n  transition: all 0.3s ease;\n  border: 2px solid transparent;\n}\n.assignments-container .assignments-header .header-actions .btn-filter[data-v-e9f7a822]:hover,\n.assignments-container .assignments-header .header-actions .btn-export[data-v-e9f7a822]:hover {\n  transform: translateY(-2px);\n  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);\n}\n.assignments-container .assignments-header .header-actions .btn-filter i[data-v-e9f7a822],\n.assignments-container .assignments-header .header-actions .btn-export i[data-v-e9f7a822] {\n  margin-right: 0.5rem;\n  font-size: 1.1rem;\n}\n.assignments-container .assignments-header .header-actions .btn-filter[data-v-e9f7a822] {\n  background: linear-gradient(135deg, #17a2b8, #6f42c1);\n  color: white;\n  border-color: #17a2b8;\n}\n.assignments-container .assignments-header .header-actions .btn-export[data-v-e9f7a822] {\n  background: linear-gradient(135deg, #28a745, #20c997);\n  color: white;\n  border-color: #28a745;\n}\n.assignments-container .assignments-header .header-actions .assignment-count[data-v-e9f7a822] {\n  color: #252525;\n  font-weight: 500;\n  font-size: 0.85rem;\n  background: rgba(255, 64, 64, 0.1);\n  padding: 0.4rem 0.8rem;\n  border-radius: 15px;\n  border: 1px solid rgba(255, 64, 64, 0.2);\n}\n.assignments-container .assignments-table[data-v-e9f7a822] {\n  margin: 0;\n}\n.assignments-container .assignments-table thead[data-v-e9f7a822] {\n  background: linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(248, 249, 250, 0.9) 100%);\n  -webkit-backdrop-filter: blur(10px);\n          backdrop-filter: blur(10px);\n}\n.assignments-container .assignments-table thead th[data-v-e9f7a822] {\n  border: none;\n  padding: 1rem;\n  font-weight: 600;\n  color: #000000;\n  font-size: 0.8rem;\n  text-transform: uppercase;\n  letter-spacing: 0.5px;\n  position: relative;\n}\n.assignments-container .assignments-table thead th[data-v-e9f7a822]::after {\n  content: \"\";\n  position: absolute;\n  bottom: 0;\n  left: 1rem;\n  right: 1rem;\n  height: 2px;\n  border-radius: 1px;\n}\n.assignments-container .assignments-table tbody tr[data-v-e9f7a822] {\n  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);\n  position: relative;\n}\n.assignments-container .assignments-table tbody tr[data-v-e9f7a822]::before {\n  content: \"\";\n  position: absolute;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  background: linear-gradient(135deg, rgba(255, 64, 64, 0.02) 0%, transparent 100%);\n  opacity: 0;\n  transition: opacity 0.3s ease;\n}\n.assignments-container .assignments-table tbody tr[data-v-e9f7a822]:hover {\n  transform: translateY(-2px);\n  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);\n}\n.assignments-container .assignments-table tbody tr[data-v-e9f7a822]:hover::before {\n  opacity: 1;\n}\n.assignments-container .assignments-table tbody tr[data-v-e9f7a822]:nth-child(even) {\n  background: rgba(255, 255, 255, 0.3);\n}\n.assignments-container .assignments-table tbody tr td[data-v-e9f7a822] {\n  border: none;\n  padding: 1rem;\n  vertical-align: middle;\n  position: relative;\n}\n.assignments-container .member-info[data-v-e9f7a822] {\n  display: flex;\n  align-items: center;\n  gap: 0.75rem;\n}\n.assignments-container .member-info .member-avatar[data-v-e9f7a822] {\n  width: 40px;\n  height: 40px;\n  border-radius: 50%;\n  overflow: hidden;\n}\n.assignments-container .member-info .member-avatar img[data-v-e9f7a822] {\n  width: 100%;\n  height: 100%;\n  -o-object-fit: cover;\n     object-fit: cover;\n}\n.assignments-container .member-info .member-details .member-name[data-v-e9f7a822] {\n  font-weight: 600;\n  color: #000000;\n  font-size: 0.9rem;\n}\n.assignments-container .member-info .member-details .member-email[data-v-e9f7a822] {\n  color: #252525;\n  font-size: 0.8rem;\n}\n.assignments-container .workout-info .workout-name[data-v-e9f7a822] {\n  font-weight: 600;\n  color: #000000;\n  font-size: 0.9rem;\n}\n.assignments-container .workout-info .workout-category[data-v-e9f7a822] {\n  color: #252525;\n  font-size: 0.8rem;\n}\n.assignments-container .date-badge[data-v-e9f7a822] {\n  background: rgba(220, 53, 69, 0.1);\n  color: #dc3545;\n  padding: 0.25rem 0.5rem;\n  border-radius: 6px;\n  font-size: 0.8rem;\n  font-weight: 500;\n}\n.assignments-container .no-date[data-v-e9f7a822] {\n  color: #252525;\n  font-style: italic;\n}\n.assignments-container .status-badge[data-v-e9f7a822] {\n  padding: 0.25rem 0.75rem;\n  border-radius: 20px;\n  font-size: 0.8rem;\n  font-weight: 600;\n  text-transform: uppercase;\n  letter-spacing: 0.5px;\n}\n.assignments-container .status-badge.status-active[data-v-e9f7a822] {\n  background: rgba(40, 167, 69, 0.1);\n  color: #28a745;\n}\n.assignments-container .status-badge.status-completed[data-v-e9f7a822] {\n  background: rgba(23, 162, 184, 0.1);\n  color: #17a2b8;\n}\n.assignments-container .status-badge.status-paused[data-v-e9f7a822] {\n  background: rgba(255, 193, 7, 0.1);\n  color: #ffc107;\n}\n.assignments-container .status-badge.status-expired[data-v-e9f7a822] {\n  background: rgba(220, 53, 69, 0.1);\n  color: #dc3545;\n}\n.assignments-container .progress-container[data-v-e9f7a822] {\n  display: flex;\n  align-items: center;\n  gap: 0.5rem;\n}\n.assignments-container .progress-container .progress-bar[data-v-e9f7a822] {\n  flex: 1;\n  height: 8px;\n  background: #e9ecef;\n  border-radius: 4px;\n  overflow: hidden;\n}\n.assignments-container .progress-container .progress-bar .progress-fill[data-v-e9f7a822] {\n  height: 100%;\n  background: linear-gradient(90deg, #dc3545, #6b8c7a);\n  border-radius: 4px;\n  transition: width 0.3s ease;\n}\n.assignments-container .progress-container .progress-text[data-v-e9f7a822] {\n  font-size: 0.8rem;\n  font-weight: 600;\n  color: #000000;\n  min-width: 35px;\n}\n.assignments-container .action-buttons[data-v-e9f7a822] {\n  display: flex;\n  gap: 0.25rem;\n}\n.assignments-container .action-buttons .action-btn[data-v-e9f7a822] {\n  width: 32px;\n  height: 32px;\n  padding: 0;\n  border-radius: 6px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n.assignments-container .action-buttons .action-btn i[data-v-e9f7a822] {\n  font-size: 0.8rem;\n}\n.assignments-container .empty-state[data-v-e9f7a822] {\n  text-align: center;\n  padding: 4rem 2rem;\n  position: relative;\n}\n.assignments-container .empty-state[data-v-e9f7a822]::before {\n  content: \"\";\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  transform: translate(-50%, -50%);\n  width: 200px;\n  height: 200px;\n  background: radial-gradient(circle, rgba(255, 64, 64, 0.05) 0%, transparent 70%);\n  border-radius: 50%;\n  animation: pulse-data-v-e9f7a822 2s ease-in-out infinite;\n}\n.assignments-container .empty-state i[data-v-e9f7a822] {\n  font-size: 4rem;\n  color: #dc3545;\n  margin-bottom: 1.5rem;\n  filter: drop-shadow(0 4px 8px rgba(255, 64, 64, 0.2));\n  animation: float-data-v-e9f7a822 3s ease-in-out infinite;\n}\n.assignments-container .empty-state h4[data-v-e9f7a822] {\n  color: #000000;\n  font-weight: 600;\n  margin-bottom: 0.75rem;\n  font-size: 1.2rem;\n  background: linear-gradient(135deg, #000000, #666);\n  -webkit-background-clip: text;\n  -webkit-text-fill-color: transparent;\n  background-clip: text;\n}\n.assignments-container .empty-state p[data-v-e9f7a822] {\n  color: #252525;\n  margin-bottom: 0;\n  font-size: 0.95rem;\n  font-weight: 500;\n}\n@keyframes float-data-v-e9f7a822 {\n0%, 100% {\n    transform: translateY(0px);\n}\n50% {\n    transform: translateY(-10px);\n}\n}\n@keyframes pulse-data-v-e9f7a822 {\n0%, 100% {\n    opacity: 0.5;\n    transform: translate(-50%, -50%) scale(1);\n}\n50% {\n    opacity: 0.8;\n    transform: translate(-50%, -50%) scale(1.1);\n}\n}\n@media (max-width: 768px) {\n.main-content[data-v-e9f7a822] {\n    padding: 1rem;\n}\n.stats-container .stat-card[data-v-e9f7a822] {\n    height: 80px;\n    padding: 1rem;\n}\n.stats-container .stat-card .stat-icon[data-v-e9f7a822] {\n    width: 40px;\n    height: 40px;\n    margin-right: 0.75rem;\n}\n.stats-container .stat-card .stat-icon i[data-v-e9f7a822] {\n    font-size: 1.2rem;\n}\n.stats-container .stat-card .stat-content h3[data-v-e9f7a822] {\n    font-size: 1.5rem;\n}\n.assignment-form-container .form-header[data-v-e9f7a822] {\n    padding: 1.5rem 1rem;\n}\n.assignment-form-container .form-header .form-title[data-v-e9f7a822] {\n    font-size: 2rem;\n}\n.submit-section .submit-buttons[data-v-e9f7a822] {\n    flex-direction: column;\n    gap: 0.75rem;\n}\n.submit-section .submit-buttons .submit-btn[data-v-e9f7a822] {\n    width: 100%;\n    max-width: 300px;\n}\n.assignments-container .assignments-header[data-v-e9f7a822] {\n    flex-direction: column;\n    gap: 1rem;\n    align-items: flex-start;\n}\n.assignments-container .assignments-header .header-actions[data-v-e9f7a822] {\n    width: 100%;\n    justify-content: space-between;\n}\n.assignments-table[data-v-e9f7a822] {\n    font-size: 0.8rem;\n}\n.assignments-table .member-info .member-avatar[data-v-e9f7a822] {\n    width: 30px;\n    height: 30px;\n}\n.assignments-table .action-buttons .action-btn[data-v-e9f7a822] {\n    width: 28px;\n    height: 28px;\n}\n}\n.progress-modal-content .member-progress-header[data-v-e9f7a822] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  margin-bottom: 2.5rem;\n  padding-bottom: 1.5rem;\n  border-bottom: 2px solid rgba(255, 64, 64, 0.1);\n  position: relative;\n}\n.progress-modal-content .member-progress-header[data-v-e9f7a822]::after {\n  content: \"\";\n  position: absolute;\n  bottom: -2px;\n  left: 0;\n  width: 100px;\n  height: 2px;\n  border-radius: 1px;\n}\n.progress-modal-content .member-progress-header .member-info-large[data-v-e9f7a822] {\n  display: flex;\n  align-items: center;\n  gap: 1.5rem;\n}\n.progress-modal-content .member-progress-header .member-info-large .member-avatar-large[data-v-e9f7a822] {\n  width: 80px;\n  height: 80px;\n  border-radius: 50%;\n  -o-object-fit: cover;\n     object-fit: cover;\n  border: 4px solid white;\n  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15), 0 4px 12px rgba(255, 64, 64, 0.2);\n  transition: all 0.3s ease;\n}\n.progress-modal-content .member-progress-header .member-info-large .member-avatar-large[data-v-e9f7a822]:hover {\n  transform: scale(1.05);\n  box-shadow: 0 12px 35px rgba(0, 0, 0, 0.2), 0 6px 16px rgba(255, 64, 64, 0.3);\n}\n.progress-modal-content .member-progress-header .member-info-large .member-details-large h5[data-v-e9f7a822] {\n  margin: 0 0 0.5rem 0;\n  color: #000000;\n  font-weight: 600;\n  font-size: 1.1rem;\n  background: linear-gradient(135deg, #000000, #666);\n  -webkit-background-clip: text;\n  -webkit-text-fill-color: transparent;\n  background-clip: text;\n}\n.progress-modal-content .member-progress-header .member-info-large .member-details-large p[data-v-e9f7a822] {\n  margin: 0;\n  color: #252525;\n  font-size: 0.9rem;\n  font-weight: 500;\n}\n.progress-modal-content .member-progress-header .workout-info-large[data-v-e9f7a822] {\n  text-align: right;\n}\n.progress-modal-content .member-progress-header .workout-info-large h6[data-v-e9f7a822] {\n  margin: 0 0 0.5rem 0;\n  color: #000000;\n  font-weight: 600;\n  font-size: 1rem;\n}\n.progress-modal-content .member-progress-header .workout-info-large .workout-category-badge[data-v-e9f7a822] {\n  color: white;\n  padding: 0.4rem 0.8rem;\n  border-radius: 20px;\n  font-size: 0.8rem;\n  font-weight: 500;\n  box-shadow: 0 3px 8px rgba(255, 64, 64, 0.3);\n  display: inline-block;\n}\n.progress-modal-content .progress-stats[data-v-e9f7a822] {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n  gap: 1rem;\n  margin-bottom: 2rem;\n}\n.progress-modal-content .progress-stats .stat-item[data-v-e9f7a822] {\n  text-align: center;\n  padding: 1rem;\n  background: rgba(220, 53, 69, 0.05);\n  border-radius: 12px;\n  border: 1px solid rgba(220, 53, 69, 0.1);\n}\n.progress-modal-content .progress-stats .stat-item .stat-value[data-v-e9f7a822] {\n  font-size: 1.5rem;\n  font-weight: 700;\n  color: #dc3545;\n  margin-bottom: 0.25rem;\n}\n.progress-modal-content .progress-stats .stat-item .stat-label[data-v-e9f7a822] {\n  font-size: 0.8rem;\n  color: #252525;\n  font-weight: 500;\n  text-transform: uppercase;\n  letter-spacing: 0.5px;\n}\n.progress-modal-content .progress-chart h6[data-v-e9f7a822] {\n  color: #000000;\n  font-weight: 600;\n  margin-bottom: 1rem;\n}\n.progress-modal-content .progress-chart .timeline[data-v-e9f7a822] {\n  position: relative;\n}\n.progress-modal-content .progress-chart .timeline[data-v-e9f7a822]::before {\n  content: \"\";\n  position: absolute;\n  left: 20px;\n  top: 0;\n  bottom: 0;\n  width: 2px;\n  background: #cccccc;\n}\n.progress-modal-content .progress-chart .timeline .timeline-item[data-v-e9f7a822] {\n  position: relative;\n  padding-left: 60px;\n  margin-bottom: 1.5rem;\n}\n.progress-modal-content .progress-chart .timeline .timeline-item .timeline-marker[data-v-e9f7a822] {\n  position: absolute;\n  left: 11px;\n  top: 0;\n  width: 20px;\n  height: 20px;\n  border-radius: 50%;\n  background: white;\n  border: 3px solid #cccccc;\n  transition: all 0.3s ease;\n}\n.progress-modal-content .progress-chart .timeline .timeline-item .timeline-content h6[data-v-e9f7a822] {\n  margin: 0 0 0.25rem 0;\n  color: #000000;\n  font-weight: 600;\n  font-size: 0.9rem;\n}\n.progress-modal-content .progress-chart .timeline .timeline-item .timeline-content p[data-v-e9f7a822] {\n  margin: 0;\n  color: #252525;\n  font-size: 0.8rem;\n}\n.progress-modal-content .progress-chart .timeline .timeline-item.completed .timeline-marker[data-v-e9f7a822] {\n  background: #dc3545;\n  border-color: #dc3545;\n  box-shadow: 0 0 0 3px rgba(220, 53, 69, 0.2);\n}\n.progress-modal-content .progress-chart .timeline .timeline-item.completed .timeline-content h6[data-v-e9f7a822] {\n  color: #dc3545;\n}\n.modal-content[data-v-e9f7a822] {\n  border: none;\n  border-radius: 16px;\n  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);\n}\n.modal-content .modal-header[data-v-e9f7a822] {\n  border-bottom: 1px solid #cccccc;\n  padding: 1.5rem;\n}\n.modal-content .modal-header .modal-title[data-v-e9f7a822] {\n  color: #000000;\n  font-weight: 700;\n  font-size: 1.25rem;\n}\n.modal-content .modal-body[data-v-e9f7a822] {\n  padding: 1.5rem;\n}", ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-12.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12.use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-12.use[3]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/Workout/AssignWorkout.vue?vue&type=style&index=0&id=e9f7a822&lang=scss&scoped=true":
/*!****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-12.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12.use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-12.use[3]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/Workout/AssignWorkout.vue?vue&type=style&index=0&id=e9f7a822&lang=scss&scoped=true ***!
  \****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../../../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_clonedRuleSet_12_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_12_use_2_node_modules_sass_loader_dist_cjs_js_clonedRuleSet_12_use_3_node_modules_vue_loader_lib_index_js_vue_loader_options_AssignWorkout_vue_vue_type_style_index_0_id_e9f7a822_lang_scss_scoped_true__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !!../../../../../../node_modules/css-loader/dist/cjs.js??clonedRuleSet-12.use[1]!../../../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12.use[2]!../../../../../../node_modules/sass-loader/dist/cjs.js??clonedRuleSet-12.use[3]!../../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./AssignWorkout.vue?vue&type=style&index=0&id=e9f7a822&lang=scss&scoped=true */ "./node_modules/css-loader/dist/cjs.js??clonedRuleSet-12.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12.use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-12.use[3]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/Workout/AssignWorkout.vue?vue&type=style&index=0&id=e9f7a822&lang=scss&scoped=true");

            

var options = {};

options.insert = "head";
options.singleton = false;

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_clonedRuleSet_12_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_12_use_2_node_modules_sass_loader_dist_cjs_js_clonedRuleSet_12_use_3_node_modules_vue_loader_lib_index_js_vue_loader_options_AssignWorkout_vue_vue_type_style_index_0_id_e9f7a822_lang_scss_scoped_true__WEBPACK_IMPORTED_MODULE_1__["default"], options);



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_clonedRuleSet_12_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_12_use_2_node_modules_sass_loader_dist_cjs_js_clonedRuleSet_12_use_3_node_modules_vue_loader_lib_index_js_vue_loader_options_AssignWorkout_vue_vue_type_style_index_0_id_e9f7a822_lang_scss_scoped_true__WEBPACK_IMPORTED_MODULE_1__["default"].locals || {});

/***/ }),

/***/ "./resources/src/views/app/pages/Workout/AssignWorkout.vue":
/*!*****************************************************************!*\
  !*** ./resources/src/views/app/pages/Workout/AssignWorkout.vue ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _AssignWorkout_vue_vue_type_template_id_e9f7a822_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./AssignWorkout.vue?vue&type=template&id=e9f7a822&scoped=true */ "./resources/src/views/app/pages/Workout/AssignWorkout.vue?vue&type=template&id=e9f7a822&scoped=true");
/* harmony import */ var _AssignWorkout_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./AssignWorkout.vue?vue&type=script&lang=js */ "./resources/src/views/app/pages/Workout/AssignWorkout.vue?vue&type=script&lang=js");
/* harmony import */ var _AssignWorkout_vue_vue_type_style_index_0_id_e9f7a822_lang_scss_scoped_true__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./AssignWorkout.vue?vue&type=style&index=0&id=e9f7a822&lang=scss&scoped=true */ "./resources/src/views/app/pages/Workout/AssignWorkout.vue?vue&type=style&index=0&id=e9f7a822&lang=scss&scoped=true");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");



;


/* normalize component */

var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _AssignWorkout_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__["default"],
  _AssignWorkout_vue_vue_type_template_id_e9f7a822_scoped_true__WEBPACK_IMPORTED_MODULE_0__.render,
  _AssignWorkout_vue_vue_type_template_id_e9f7a822_scoped_true__WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  "e9f7a822",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/src/views/app/pages/Workout/AssignWorkout.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./resources/src/views/app/pages/Workout/AssignWorkout.vue?vue&type=script&lang=js":
/*!*****************************************************************************************!*\
  !*** ./resources/src/views/app/pages/Workout/AssignWorkout.vue?vue&type=script&lang=js ***!
  \*****************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_AssignWorkout_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./AssignWorkout.vue?vue&type=script&lang=js */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/Workout/AssignWorkout.vue?vue&type=script&lang=js");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_AssignWorkout_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/src/views/app/pages/Workout/AssignWorkout.vue?vue&type=style&index=0&id=e9f7a822&lang=scss&scoped=true":
/*!**************************************************************************************************************************!*\
  !*** ./resources/src/views/app/pages/Workout/AssignWorkout.vue?vue&type=style&index=0&id=e9f7a822&lang=scss&scoped=true ***!
  \**************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_dist_cjs_js_node_modules_css_loader_dist_cjs_js_clonedRuleSet_12_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_12_use_2_node_modules_sass_loader_dist_cjs_js_clonedRuleSet_12_use_3_node_modules_vue_loader_lib_index_js_vue_loader_options_AssignWorkout_vue_vue_type_style_index_0_id_e9f7a822_lang_scss_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/style-loader/dist/cjs.js!../../../../../../node_modules/css-loader/dist/cjs.js??clonedRuleSet-12.use[1]!../../../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12.use[2]!../../../../../../node_modules/sass-loader/dist/cjs.js??clonedRuleSet-12.use[3]!../../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./AssignWorkout.vue?vue&type=style&index=0&id=e9f7a822&lang=scss&scoped=true */ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-12.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12.use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-12.use[3]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/Workout/AssignWorkout.vue?vue&type=style&index=0&id=e9f7a822&lang=scss&scoped=true");


/***/ }),

/***/ "./resources/src/views/app/pages/Workout/AssignWorkout.vue?vue&type=template&id=e9f7a822&scoped=true":
/*!***********************************************************************************************************!*\
  !*** ./resources/src/views/app/pages/Workout/AssignWorkout.vue?vue&type=template&id=e9f7a822&scoped=true ***!
  \***********************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_AssignWorkout_vue_vue_type_template_id_e9f7a822_scoped_true__WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   staticRenderFns: () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_AssignWorkout_vue_vue_type_template_id_e9f7a822_scoped_true__WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_AssignWorkout_vue_vue_type_template_id_e9f7a822_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./AssignWorkout.vue?vue&type=template&id=e9f7a822&scoped=true */ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/Workout/AssignWorkout.vue?vue&type=template&id=e9f7a822&scoped=true");


/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/Workout/AssignWorkout.vue?vue&type=template&id=e9f7a822&scoped=true":
/*!**************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/Workout/AssignWorkout.vue?vue&type=template&id=e9f7a822&scoped=true ***!
  \**************************************************************************************************************************************************************************************************************************************************/
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
  return _c(
    "div",
    { staticClass: "main-content" },
    [
      _c(
        "div",
        { staticClass: "page-header" },
        [
          _vm._m(0),
          _vm._v(" "),
          _c("breadcumb", {
            attrs: { page: "Assign Workouts", folder: "Workout" },
          }),
        ],
        1
      ),
      _vm._v(" "),
      _vm._m(1),
      _vm._v(" "),
      _vm.isLoading
        ? _c("div", {
            staticClass: "loading_page spinner spinner-primary mr-3",
          })
        : _c("div", [
            _c("div", { staticClass: "stats-container mb-4" }, [
              _c("div", { staticClass: "row" }, [
                _c("div", { staticClass: "col-lg-3 col-md-6 mb-3" }, [
                  _c("div", { staticClass: "stat-card stat-card-primary" }, [
                    _vm._m(2),
                    _vm._v(" "),
                    _c("div", { staticClass: "stat-content" }, [
                      _c("h3", [_vm._v(_vm._s(_vm.totalMembers))]),
                      _vm._v(" "),
                      _c("p", [_vm._v("Total Members")]),
                    ]),
                  ]),
                ]),
                _vm._v(" "),
                _c("div", { staticClass: "col-lg-3 col-md-6 mb-3" }, [
                  _c("div", { staticClass: "stat-card stat-card-success" }, [
                    _vm._m(3),
                    _vm._v(" "),
                    _c("div", { staticClass: "stat-content" }, [
                      _c("h3", [_vm._v(_vm._s(_vm.totalWorkouts))]),
                      _vm._v(" "),
                      _c("p", [_vm._v("Available Workouts")]),
                    ]),
                  ]),
                ]),
                _vm._v(" "),
                _c("div", { staticClass: "col-lg-3 col-md-6 mb-3" }, [
                  _c("div", { staticClass: "stat-card stat-card-warning" }, [
                    _vm._m(4),
                    _vm._v(" "),
                    _c("div", { staticClass: "stat-content" }, [
                      _c("h3", [_vm._v(_vm._s(_vm.activeAssignments))]),
                      _vm._v(" "),
                      _c("p", [_vm._v("Active Assignments")]),
                    ]),
                  ]),
                ]),
                _vm._v(" "),
                _c("div", { staticClass: "col-lg-3 col-md-6 mb-3" }, [
                  _c("div", { staticClass: "stat-card stat-card-info" }, [
                    _vm._m(5),
                    _vm._v(" "),
                    _c("div", { staticClass: "stat-content" }, [
                      _c("h3", [_vm._v(_vm._s(_vm.completionRate) + "%")]),
                      _vm._v(" "),
                      _c("p", [_vm._v("Completion Rate")]),
                    ]),
                  ]),
                ]),
              ]),
            ]),
            _vm._v(" "),
            _c("div", { staticClass: "assignment-form-container mb-4" }, [
              _c("div", { staticClass: "form-card" }, [
                _vm._m(6),
                _vm._v(" "),
                _c(
                  "form",
                  {
                    staticClass: "assignment-form",
                    on: {
                      submit: function ($event) {
                        $event.preventDefault()
                        return _vm.assignWorkout.apply(null, arguments)
                      },
                    },
                  },
                  [
                    _c("div", { staticClass: "form-section" }, [
                      _vm._m(7),
                      _vm._v(" "),
                      _c("div", { staticClass: "section-content" }, [
                        _c("div", { staticClass: "row g-4" }, [
                          _c("div", { staticClass: "col-md-6" }, [
                            _c(
                              "div",
                              { staticClass: "form-group" },
                              [
                                _c("label", { staticClass: "form-label" }, [
                                  _vm._v("Select Member"),
                                ]),
                                _vm._v(" "),
                                _c("v-select", {
                                  staticClass: "form-control",
                                  class: {
                                    "has-value": _vm.form.member,
                                  },
                                  attrs: {
                                    options: _vm.memberOptions,
                                    placeholder: "Choose a member...",
                                    reduce: function (label) {
                                      return label.value
                                    },
                                  },
                                  model: {
                                    value: _vm.form.member,
                                    callback: function ($$v) {
                                      _vm.$set(_vm.form, "member", $$v)
                                    },
                                    expression: "form.member",
                                  },
                                }),
                                _vm._v(" "),
                                _vm._m(8),
                              ],
                              1
                            ),
                          ]),
                          _vm._v(" "),
                          _c("div", { staticClass: "col-md-6" }, [
                            _c(
                              "div",
                              { staticClass: "form-group" },
                              [
                                _c("label", { staticClass: "form-label" }, [
                                  _vm._v("Workout or Plan"),
                                ]),
                                _vm._v(" "),
                                _c("v-select", {
                                  staticClass: "form-control",
                                  class: {
                                    "has-value": _vm.form.assignment,
                                  },
                                  attrs: {
                                    options: _vm.workoutOptions,
                                    placeholder: "Choose workout or plan...",
                                    reduce: function (label) {
                                      return label.value
                                    },
                                  },
                                  model: {
                                    value: _vm.form.assignment,
                                    callback: function ($$v) {
                                      _vm.$set(_vm.form, "assignment", $$v)
                                    },
                                    expression: "form.assignment",
                                  },
                                }),
                                _vm._v(" "),
                                _vm._m(9),
                              ],
                              1
                            ),
                          ]),
                        ]),
                      ]),
                    ]),
                    _vm._v(" "),
                    _c("div", { staticClass: "form-section" }, [
                      _vm._m(10),
                      _vm._v(" "),
                      _c("div", { staticClass: "section-content" }, [
                        _c("div", { staticClass: "row g-4" }, [
                          _c("div", { staticClass: "col-md-4" }, [
                            _c(
                              "div",
                              { staticClass: "form-group" },
                              [
                                _c("label", { staticClass: "form-label" }, [
                                  _vm._v("Start Date:"),
                                ]),
                                _vm._v(" "),
                                _c("b-form-datepicker", {
                                  staticClass: "form-control",
                                  class: {
                                    "has-value": _vm.form.startDate,
                                  },
                                  attrs: { placeholder: "Select start date" },
                                  model: {
                                    value: _vm.form.startDate,
                                    callback: function ($$v) {
                                      _vm.$set(_vm.form, "startDate", $$v)
                                    },
                                    expression: "form.startDate",
                                  },
                                }),
                                _vm._v(" "),
                                _vm._m(11),
                              ],
                              1
                            ),
                          ]),
                          _vm._v(" "),
                          _c("div", { staticClass: "col-md-4" }, [
                            _c(
                              "div",
                              { staticClass: "form-group" },
                              [
                                _c("label", { staticClass: "form-label" }, [
                                  _vm._v("End Date (Optional)"),
                                ]),
                                _vm._v(" "),
                                _c("b-form-datepicker", {
                                  staticClass: "form-control",
                                  class: {
                                    "has-value": _vm.form.endDate,
                                  },
                                  attrs: { placeholder: "Select end date" },
                                  model: {
                                    value: _vm.form.endDate,
                                    callback: function ($$v) {
                                      _vm.$set(_vm.form, "endDate", $$v)
                                    },
                                    expression: "form.endDate",
                                  },
                                }),
                                _vm._v(" "),
                                _vm._m(12),
                              ],
                              1
                            ),
                          ]),
                          _vm._v(" "),
                          _c("div", { staticClass: "col-md-4" }, [
                            _c("div", { staticClass: "form-group" }, [
                              _c("label", { staticClass: "form-label" }, [
                                _vm._v("Frequency"),
                              ]),
                              _vm._v(" "),
                              _c(
                                "select",
                                {
                                  directives: [
                                    {
                                      name: "model",
                                      rawName: "v-model",
                                      value: _vm.form.frequency,
                                      expression: "form.frequency",
                                    },
                                  ],
                                  staticClass: "form-control",
                                  class: {
                                    "has-value": _vm.form.frequency,
                                  },
                                  on: {
                                    change: function ($event) {
                                      var $$selectedVal = Array.prototype.filter
                                        .call(
                                          $event.target.options,
                                          function (o) {
                                            return o.selected
                                          }
                                        )
                                        .map(function (o) {
                                          var val =
                                            "_value" in o ? o._value : o.value
                                          return val
                                        })
                                      _vm.$set(
                                        _vm.form,
                                        "frequency",
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
                                    { attrs: { disabled: "", value: "" } },
                                    [
                                      _vm._v(
                                        "\n                                                Select Frequency\n                                            "
                                      ),
                                    ]
                                  ),
                                  _vm._v(" "),
                                  _c("option", { attrs: { value: "daily" } }, [
                                    _vm._v(
                                      "\n                                                Daily\n                                            "
                                    ),
                                  ]),
                                  _vm._v(" "),
                                  _c("option", { attrs: { value: "weekly" } }, [
                                    _vm._v(
                                      "\n                                                Weekly\n                                            "
                                    ),
                                  ]),
                                  _vm._v(" "),
                                  _c(
                                    "option",
                                    { attrs: { value: "biweekly" } },
                                    [
                                      _vm._v(
                                        "\n                                                Bi-weekly\n                                            "
                                      ),
                                    ]
                                  ),
                                  _vm._v(" "),
                                  _c(
                                    "option",
                                    { attrs: { value: "monthly" } },
                                    [
                                      _vm._v(
                                        "\n                                                Monthly\n                                            "
                                      ),
                                    ]
                                  ),
                                  _vm._v(" "),
                                  _c("option", { attrs: { value: "custom" } }, [
                                    _vm._v(
                                      "\n                                                Custom\n                                            "
                                    ),
                                  ]),
                                ]
                              ),
                              _vm._v(" "),
                              _vm._m(13),
                            ]),
                          ]),
                        ]),
                      ]),
                    ]),
                    _vm._v(" "),
                    _c("div", { staticClass: "form-section" }, [
                      _vm._m(14),
                      _vm._v(" "),
                      _c("div", { staticClass: "section-content" }, [
                        _c("div", { staticClass: "row g-4" }, [
                          _c("div", { staticClass: "col-md-6" }, [
                            _c("div", { staticClass: "form-group" }, [
                              _c("label", { staticClass: "form-label" }, [
                                _vm._v("Difficulty Level"),
                              ]),
                              _vm._v(" "),
                              _c(
                                "select",
                                {
                                  directives: [
                                    {
                                      name: "model",
                                      rawName: "v-model",
                                      value: _vm.form.difficulty,
                                      expression: "form.difficulty",
                                    },
                                  ],
                                  staticClass: "form-control",
                                  class: {
                                    "has-value": _vm.form.difficulty,
                                  },
                                  on: {
                                    change: function ($event) {
                                      var $$selectedVal = Array.prototype.filter
                                        .call(
                                          $event.target.options,
                                          function (o) {
                                            return o.selected
                                          }
                                        )
                                        .map(function (o) {
                                          var val =
                                            "_value" in o ? o._value : o.value
                                          return val
                                        })
                                      _vm.$set(
                                        _vm.form,
                                        "difficulty",
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
                                    { attrs: { disabled: "", value: "" } },
                                    [
                                      _vm._v(
                                        "\n                                                Select Difficulty\n                                            "
                                      ),
                                    ]
                                  ),
                                  _vm._v(" "),
                                  _c(
                                    "option",
                                    { attrs: { value: "beginner" } },
                                    [
                                      _vm._v(
                                        "\n                                                Beginner\n                                            "
                                      ),
                                    ]
                                  ),
                                  _vm._v(" "),
                                  _c(
                                    "option",
                                    { attrs: { value: "intermediate" } },
                                    [
                                      _vm._v(
                                        "\n                                                Intermediate\n                                            "
                                      ),
                                    ]
                                  ),
                                  _vm._v(" "),
                                  _c(
                                    "option",
                                    { attrs: { value: "advanced" } },
                                    [
                                      _vm._v(
                                        "\n                                                Advanced\n                                            "
                                      ),
                                    ]
                                  ),
                                ]
                              ),
                              _vm._v(" "),
                              _vm._m(15),
                            ]),
                          ]),
                          _vm._v(" "),
                          _c("div", { staticClass: "col-md-6" }, [
                            _c("div", { staticClass: "form-group" }, [
                              _c("label", { staticClass: "form-label" }, [
                                _vm._v("Priority"),
                              ]),
                              _vm._v(" "),
                              _c(
                                "select",
                                {
                                  directives: [
                                    {
                                      name: "model",
                                      rawName: "v-model",
                                      value: _vm.form.priority,
                                      expression: "form.priority",
                                    },
                                  ],
                                  staticClass: "form-control",
                                  class: {
                                    "has-value": _vm.form.priority,
                                  },
                                  on: {
                                    change: function ($event) {
                                      var $$selectedVal = Array.prototype.filter
                                        .call(
                                          $event.target.options,
                                          function (o) {
                                            return o.selected
                                          }
                                        )
                                        .map(function (o) {
                                          var val =
                                            "_value" in o ? o._value : o.value
                                          return val
                                        })
                                      _vm.$set(
                                        _vm.form,
                                        "priority",
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
                                    { attrs: { disabled: "", value: "" } },
                                    [
                                      _vm._v(
                                        "\n                                                Select Priority\n                                            "
                                      ),
                                    ]
                                  ),
                                  _vm._v(" "),
                                  _c("option", { attrs: { value: "low" } }, [
                                    _vm._v("Low"),
                                  ]),
                                  _vm._v(" "),
                                  _c("option", { attrs: { value: "medium" } }, [
                                    _vm._v(
                                      "\n                                                Medium\n                                            "
                                    ),
                                  ]),
                                  _vm._v(" "),
                                  _c("option", { attrs: { value: "high" } }, [
                                    _vm._v(
                                      "\n                                                High\n                                            "
                                    ),
                                  ]),
                                  _vm._v(" "),
                                  _c("option", { attrs: { value: "urgent" } }, [
                                    _vm._v(
                                      "\n                                                Urgent\n                                            "
                                    ),
                                  ]),
                                ]
                              ),
                              _vm._v(" "),
                              _vm._m(16),
                            ]),
                          ]),
                        ]),
                        _vm._v(" "),
                        _c("div", { staticClass: "form-group mt-3" }, [
                          _c("label", { staticClass: "form-label" }, [
                            _vm._v("Notes (Optional)"),
                          ]),
                          _vm._v(" "),
                          _c("textarea", {
                            directives: [
                              {
                                name: "model",
                                rawName: "v-model",
                                value: _vm.form.notes,
                                expression: "form.notes",
                              },
                            ],
                            staticClass: "form-control",
                            class: { "has-value": _vm.form.notes },
                            attrs: {
                              rows: "3",
                              placeholder:
                                "Add any special instructions or notes for this assignment...",
                            },
                            domProps: { value: _vm.form.notes },
                            on: {
                              input: function ($event) {
                                if ($event.target.composing) {
                                  return
                                }
                                _vm.$set(_vm.form, "notes", $event.target.value)
                              },
                            },
                          }),
                          _vm._v(" "),
                          _vm._m(17),
                        ]),
                      ]),
                    ]),
                    _vm._v(" "),
                    _c("div", { staticClass: "submit-section" }, [
                      _c(
                        "div",
                        { staticClass: "submit-buttons" },
                        [
                          _c(
                            "b-button",
                            {
                              staticClass: "submit-btn",
                              attrs: {
                                type: "submit",
                                variant: "primary",
                                disabled: !_vm.isFormValid,
                              },
                            },
                            [
                              _c("i", { staticClass: "fas fa-plus" }),
                              _vm._v(
                                "\n                                Assign Workout\n                            "
                              ),
                            ]
                          ),
                          _vm._v(" "),
                          _c(
                            "b-button",
                            {
                              staticClass: "submit-btn submit-btn-all",
                              attrs: {
                                variant: "success",
                                disabled: !_vm.isBulkFormValid,
                              },
                              on: { click: _vm.assignToAllMembers },
                            },
                            [
                              _c("i", { staticClass: "fas fa-users" }),
                              _vm._v(
                                "\n                                Assign to All Members\n                            "
                              ),
                            ]
                          ),
                        ],
                        1
                      ),
                    ]),
                  ]
                ),
              ]),
            ]),
            _vm._v(" "),
            _c("div", { staticClass: "assignments-container" }, [
              _c("div", { staticClass: "assignments-card" }, [
                _c("div", { staticClass: "assignments-header" }, [
                  _c("h4", [_vm._v("Current Assignments")]),
                  _vm._v(" "),
                  _c(
                    "div",
                    { staticClass: "header-actions" },
                    [
                      _c(
                        "b-button",
                        {
                          staticClass: "btn-filter",
                          attrs: { variant: "outline-info", size: "sm" },
                        },
                        [
                          _c("i", { staticClass: "fas fa-filter" }),
                          _vm._v(
                            "\n                            Filter\n                        "
                          ),
                        ]
                      ),
                      _vm._v(" "),
                      _c(
                        "b-button",
                        {
                          staticClass: "btn-export",
                          attrs: { variant: "outline-success", size: "sm" },
                        },
                        [
                          _c("i", { staticClass: "fas fa-file-export" }),
                          _vm._v(
                            "\n                            Export\n                        "
                          ),
                        ]
                      ),
                      _vm._v(" "),
                      _c("span", { staticClass: "assignment-count" }, [
                        _vm._v(
                          _vm._s(_vm.assignedWorkouts.length) + " assignments"
                        ),
                      ]),
                    ],
                    1
                  ),
                ]),
                _vm._v(" "),
                _c("div", { staticClass: "table-responsive" }, [
                  _c(
                    "table",
                    { staticClass: "table table-hover assignments-table" },
                    [
                      _c("thead", [
                        _c("tr", [
                          _c(
                            "th",
                            [
                              _c("b-form-checkbox", {
                                on: { change: _vm.toggleSelectAll },
                                model: {
                                  value: _vm.selectAll,
                                  callback: function ($$v) {
                                    _vm.selectAll = $$v
                                  },
                                  expression: "selectAll",
                                },
                              }),
                            ],
                            1
                          ),
                          _vm._v(" "),
                          _c("th", [_vm._v("Member")]),
                          _vm._v(" "),
                          _c("th", [_vm._v("Workout/Plan")]),
                          _vm._v(" "),
                          _c("th", [_vm._v("Start Date")]),
                          _vm._v(" "),
                          _c("th", [_vm._v("End Date")]),
                          _vm._v(" "),
                          _c("th", [_vm._v("Status")]),
                          _vm._v(" "),
                          _c("th", [_vm._v("Progress")]),
                          _vm._v(" "),
                          _c("th", [_vm._v("Actions")]),
                        ]),
                      ]),
                      _vm._v(" "),
                      _c(
                        "tbody",
                        _vm._l(
                          _vm.assignedWorkouts,
                          function (assignment, index) {
                            return _c(
                              "tr",
                              { key: index, staticClass: "assignment-row" },
                              [
                                _c(
                                  "td",
                                  [
                                    _c("b-form-checkbox", {
                                      model: {
                                        value: assignment.selected,
                                        callback: function ($$v) {
                                          _vm.$set(assignment, "selected", $$v)
                                        },
                                        expression: "assignment.selected",
                                      },
                                    }),
                                  ],
                                  1
                                ),
                                _vm._v(" "),
                                _c("td", [
                                  _c("div", { staticClass: "member-info" }, [
                                    _c(
                                      "div",
                                      { staticClass: "member-avatar" },
                                      [
                                        _c("img", {
                                          attrs: {
                                            src:
                                              assignment.memberAvatar ||
                                              "/images/avatar/no_avatar.png",
                                            alt: assignment.memberName,
                                          },
                                        }),
                                      ]
                                    ),
                                    _vm._v(" "),
                                    _c(
                                      "div",
                                      { staticClass: "member-details" },
                                      [
                                        _c(
                                          "div",
                                          { staticClass: "member-name" },
                                          [
                                            _vm._v(
                                              "\n                                                " +
                                                _vm._s(assignment.memberName) +
                                                "\n                                            "
                                            ),
                                          ]
                                        ),
                                        _vm._v(" "),
                                        _c(
                                          "div",
                                          { staticClass: "member-email" },
                                          [
                                            _vm._v(
                                              "\n                                                " +
                                                _vm._s(assignment.memberEmail) +
                                                "\n                                            "
                                            ),
                                          ]
                                        ),
                                      ]
                                    ),
                                  ]),
                                ]),
                                _vm._v(" "),
                                _c("td", [
                                  _c("div", { staticClass: "workout-info" }, [
                                    _c("div", { staticClass: "workout-name" }, [
                                      _vm._v(
                                        "\n                                            " +
                                          _vm._s(assignment.workoutName) +
                                          "\n                                        "
                                      ),
                                    ]),
                                    _vm._v(" "),
                                    _c(
                                      "div",
                                      { staticClass: "workout-category" },
                                      [
                                        _vm._v(
                                          "\n                                            " +
                                            _vm._s(assignment.workoutCategory) +
                                            "\n                                        "
                                        ),
                                      ]
                                    ),
                                  ]),
                                ]),
                                _vm._v(" "),
                                _c("td", [
                                  _c("span", { staticClass: "date-badge" }, [
                                    _vm._v(
                                      _vm._s(
                                        _vm.formatDate(assignment.startDate)
                                      )
                                    ),
                                  ]),
                                ]),
                                _vm._v(" "),
                                _c("td", [
                                  assignment.endDate
                                    ? _c(
                                        "span",
                                        { staticClass: "date-badge" },
                                        [
                                          _vm._v(
                                            _vm._s(
                                              _vm.formatDate(assignment.endDate)
                                            )
                                          ),
                                        ]
                                      )
                                    : _c("span", { staticClass: "no-date" }, [
                                        _vm._v("-"),
                                      ]),
                                ]),
                                _vm._v(" "),
                                _c("td", [
                                  _c(
                                    "span",
                                    {
                                      staticClass: "status-badge",
                                      class: _vm.getStatusBadgeClass(
                                        assignment.status
                                      ),
                                    },
                                    [
                                      _vm._v(
                                        "\n                                        " +
                                          _vm._s(assignment.status) +
                                          "\n                                    "
                                      ),
                                    ]
                                  ),
                                ]),
                                _vm._v(" "),
                                _c("td", [
                                  _c(
                                    "div",
                                    { staticClass: "progress-container" },
                                    [
                                      _c(
                                        "div",
                                        { staticClass: "progress-bar" },
                                        [
                                          _c("div", {
                                            staticClass: "progress-fill",
                                            style: {
                                              width: assignment.progress + "%",
                                            },
                                          }),
                                        ]
                                      ),
                                      _vm._v(" "),
                                      _c(
                                        "span",
                                        { staticClass: "progress-text" },
                                        [
                                          _vm._v(
                                            _vm._s(assignment.progress) + "%"
                                          ),
                                        ]
                                      ),
                                    ]
                                  ),
                                ]),
                                _vm._v(" "),
                                _c("td", [
                                  _c(
                                    "div",
                                    { staticClass: "action-buttons" },
                                    [
                                      _c(
                                        "b-button",
                                        {
                                          staticClass: "action-btn",
                                          attrs: {
                                            size: "sm",
                                            variant: "outline-primary",
                                          },
                                          on: {
                                            click: function ($event) {
                                              return _vm.editAssignment(index)
                                            },
                                          },
                                        },
                                        [
                                          _c("i", {
                                            staticClass: "fas fa-edit",
                                          }),
                                        ]
                                      ),
                                      _vm._v(" "),
                                      _c(
                                        "b-button",
                                        {
                                          staticClass: "action-btn",
                                          attrs: {
                                            size: "sm",
                                            variant: "outline-success",
                                          },
                                          on: {
                                            click: function ($event) {
                                              return _vm.viewProgress(index)
                                            },
                                          },
                                        },
                                        [
                                          _c("i", {
                                            staticClass: "fas fa-chart-bar",
                                          }),
                                        ]
                                      ),
                                      _vm._v(" "),
                                      _c(
                                        "b-button",
                                        {
                                          staticClass: "action-btn",
                                          attrs: {
                                            size: "sm",
                                            variant: "outline-danger",
                                          },
                                          on: {
                                            click: function ($event) {
                                              return _vm.removeAssignment(index)
                                            },
                                          },
                                        },
                                        [
                                          _c("i", {
                                            staticClass: "fas fa-trash",
                                          }),
                                        ]
                                      ),
                                    ],
                                    1
                                  ),
                                ]),
                              ]
                            )
                          }
                        ),
                        0
                      ),
                    ]
                  ),
                ]),
                _vm._v(" "),
                _vm.assignedWorkouts.length === 0
                  ? _c("div", { staticClass: "empty-state" }, [
                      _c("i", { staticClass: "fas fa-clipboard-list" }),
                      _vm._v(" "),
                      _c("h4", [_vm._v("No Assignments Yet")]),
                      _vm._v(" "),
                      _c("p", [
                        _vm._v(
                          "\n                        Start by assigning workouts to your members using\n                        the form above.\n                    "
                        ),
                      ]),
                    ])
                  : _vm._e(),
              ]),
            ]),
          ]),
      _vm._v(" "),
      _c(
        "b-modal",
        {
          attrs: {
            id: "progress-modal",
            title: "Workout Progress",
            size: "lg",
            centered: "",
          },
        },
        [
          _c("div", { staticClass: "progress-modal-content" }, [
            _c("div", { staticClass: "member-progress-header" }, [
              _c("div", { staticClass: "member-info-large" }, [
                _c("img", {
                  staticClass: "member-avatar-large",
                  attrs: {
                    src:
                      _vm.getSelectedAssignmentValue("memberAvatar") ||
                      "/images/avatar/no_avatar.png",
                    alt: _vm.getSelectedAssignmentValue("memberName"),
                  },
                }),
                _vm._v(" "),
                _c("div", { staticClass: "member-details-large" }, [
                  _c("h5", [
                    _vm._v(
                      "\n                            " +
                        _vm._s(_vm.getSelectedAssignmentValue("memberName")) +
                        "\n                        "
                    ),
                  ]),
                  _vm._v(" "),
                  _c("p", [
                    _vm._v(
                      "\n                            " +
                        _vm._s(_vm.getSelectedAssignmentValue("memberEmail")) +
                        "\n                        "
                    ),
                  ]),
                ]),
              ]),
              _vm._v(" "),
              _c("div", { staticClass: "workout-info-large" }, [
                _c("h6", [
                  _vm._v(_vm._s(_vm.getSelectedAssignmentValue("workoutName"))),
                ]),
                _vm._v(" "),
                _c("span", { staticClass: "workout-category-badge" }, [
                  _vm._v(
                    _vm._s(_vm.getSelectedAssignmentValue("workoutCategory"))
                  ),
                ]),
              ]),
            ]),
            _vm._v(" "),
            _c("div", { staticClass: "progress-stats" }, [
              _c("div", { staticClass: "stat-item" }, [
                _c("div", { staticClass: "stat-value" }, [
                  _vm._v(
                    "\n                        " +
                      _vm._s(_vm.getSelectedAssignmentValue("progress")) +
                      "%\n                    "
                  ),
                ]),
                _vm._v(" "),
                _c("div", { staticClass: "stat-label" }, [
                  _vm._v("Completion"),
                ]),
              ]),
              _vm._v(" "),
              _c("div", { staticClass: "stat-item" }, [
                _c("div", { staticClass: "stat-value" }, [
                  _vm._v(
                    "\n                        " +
                      _vm._s(_vm.getSelectedAssignmentValue("status")) +
                      "\n                    "
                  ),
                ]),
                _vm._v(" "),
                _c("div", { staticClass: "stat-label" }, [_vm._v("Status")]),
              ]),
              _vm._v(" "),
              _c("div", { staticClass: "stat-item" }, [
                _c("div", { staticClass: "stat-value" }, [
                  _vm._v(
                    "\n                        " +
                      _vm._s(
                        _vm.formatDate(
                          _vm.getSelectedAssignmentValue("startDate")
                        )
                      ) +
                      "\n                    "
                  ),
                ]),
                _vm._v(" "),
                _c("div", { staticClass: "stat-label" }, [
                  _vm._v("Start Date"),
                ]),
              ]),
            ]),
            _vm._v(" "),
            _c("div", { staticClass: "progress-chart" }, [
              _c("h6", [_vm._v("Progress Timeline")]),
              _vm._v(" "),
              _c("div", { staticClass: "timeline" }, [
                _c("div", { staticClass: "timeline-item completed" }, [
                  _c("div", { staticClass: "timeline-marker" }),
                  _vm._v(" "),
                  _c("div", { staticClass: "timeline-content" }, [
                    _c("h6", [_vm._v("Workout Started")]),
                    _vm._v(" "),
                    _c("p", [
                      _vm._v(
                        "\n                                " +
                          _vm._s(
                            _vm.formatDate(
                              _vm.getSelectedAssignmentValue("startDate")
                            )
                          ) +
                          "\n                            "
                      ),
                    ]),
                  ]),
                ]),
                _vm._v(" "),
                _c(
                  "div",
                  {
                    staticClass: "timeline-item",
                    class: {
                      completed:
                        _vm.getSelectedAssignmentValue("progress") >= 25,
                    },
                  },
                  [
                    _c("div", { staticClass: "timeline-marker" }),
                    _vm._v(" "),
                    _c("div", { staticClass: "timeline-content" }, [
                      _c("h6", [_vm._v("25% Complete")]),
                      _vm._v(" "),
                      _c("p", [_vm._v("First milestone reached")]),
                    ]),
                  ]
                ),
                _vm._v(" "),
                _c(
                  "div",
                  {
                    staticClass: "timeline-item",
                    class: {
                      completed:
                        _vm.getSelectedAssignmentValue("progress") >= 50,
                    },
                  },
                  [
                    _c("div", { staticClass: "timeline-marker" }),
                    _vm._v(" "),
                    _c("div", { staticClass: "timeline-content" }, [
                      _c("h6", [_vm._v("50% Complete")]),
                      _vm._v(" "),
                      _c("p", [_vm._v("Halfway there!")]),
                    ]),
                  ]
                ),
                _vm._v(" "),
                _c(
                  "div",
                  {
                    staticClass: "timeline-item",
                    class: {
                      completed:
                        _vm.getSelectedAssignmentValue("progress") >= 75,
                    },
                  },
                  [
                    _c("div", { staticClass: "timeline-marker" }),
                    _vm._v(" "),
                    _c("div", { staticClass: "timeline-content" }, [
                      _c("h6", [_vm._v("75% Complete")]),
                      _vm._v(" "),
                      _c("p", [_vm._v("Almost finished")]),
                    ]),
                  ]
                ),
                _vm._v(" "),
                _c(
                  "div",
                  {
                    staticClass: "timeline-item",
                    class: {
                      completed:
                        _vm.getSelectedAssignmentValue("progress") >= 100,
                    },
                  },
                  [
                    _c("div", { staticClass: "timeline-marker" }),
                    _vm._v(" "),
                    _c("div", { staticClass: "timeline-content" }, [
                      _c("h6", [_vm._v("100% Complete")]),
                      _vm._v(" "),
                      _c("p", [_vm._v("Workout finished!")]),
                    ]),
                  ]
                ),
              ]),
            ]),
          ]),
        ]
      ),
    ],
    1
  )
}
var staticRenderFns = [
  function () {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("h1", { staticClass: "page-title" }, [
      _c("i", { staticClass: "fas fa-dumbbell me-2" }),
      _vm._v("\n            Assign Workouts\n        "),
    ])
  },
  function () {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "page-description" }, [
      _c("p", [
        _vm._v(
          "\n            Assign personalized workout plans to your members and track\n            their progress effectively.\n        "
        ),
      ]),
    ])
  },
  function () {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "stat-icon" }, [
      _c("i", { staticClass: "fas fa-users" }),
    ])
  },
  function () {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "stat-icon" }, [
      _c("i", { staticClass: "fas fa-dumbbell" }),
    ])
  },
  function () {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "stat-icon" }, [
      _c("i", { staticClass: "fas fa-calendar-check" }),
    ])
  },
  function () {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "stat-icon" }, [
      _c("i", { staticClass: "fas fa-chart-line" }),
    ])
  },
  function () {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "form-header" }, [
      _c("div", { staticClass: "header-icon" }, [
        _c("i", { staticClass: "fas fa-user-plus" }),
      ]),
      _vm._v(" "),
      _c("h2", { staticClass: "form-title" }, [
        _vm._v("Assign Workouts to Members"),
      ]),
      _vm._v(" "),
      _c("p", { staticClass: "form-subtitle" }, [
        _vm._v(
          "\n                        Create personalized workout assignments for your\n                        members\n                    "
        ),
      ]),
    ])
  },
  function () {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "section-header" }, [
      _c("div", { staticClass: "section-icon" }, [
        _c("i", { staticClass: "fas fa-users" }),
      ]),
      _vm._v(" "),
      _c("h5", { staticClass: "section-title" }, [
        _vm._v(
          "\n                                Member & Workout Selection\n                            "
        ),
      ]),
    ])
  },
  function () {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "input-icon" }, [
      _c("i", { staticClass: "fas fa-user" }),
    ])
  },
  function () {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "input-icon" }, [
      _c("i", { staticClass: "fas fa-dumbbell" }),
    ])
  },
  function () {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "section-header" }, [
      _c("div", { staticClass: "section-icon" }, [
        _c("i", { staticClass: "fas fa-calendar-alt" }),
      ]),
      _vm._v(" "),
      _c("h5", { staticClass: "section-title" }, [_vm._v("Schedule Settings")]),
    ])
  },
  function () {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "input-icon" }, [
      _c("i", { staticClass: "fas fa-calendar" }),
    ])
  },
  function () {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "input-icon" }, [
      _c("i", { staticClass: "fas fa-calendar-times" }),
    ])
  },
  function () {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "input-icon" }, [
      _c("i", { staticClass: "fas fa-clock" }),
    ])
  },
  function () {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "section-header" }, [
      _c("div", { staticClass: "section-icon" }, [
        _c("i", { staticClass: "fas fa-cog" }),
      ]),
      _vm._v(" "),
      _c("h5", { staticClass: "section-title" }, [
        _vm._v(
          "\n                                Additional Settings\n                            "
        ),
      ]),
    ])
  },
  function () {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "input-icon" }, [
      _c("i", { staticClass: "fas fa-chart-line" }),
    ])
  },
  function () {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "input-icon" }, [
      _c("i", { staticClass: "fas fa-exclamation-triangle" }),
    ])
  },
  function () {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "input-icon textarea-icon" }, [
      _c("i", { staticClass: "fas fa-sticky-note" }),
    ])
  },
]
render._withStripped = true



/***/ })

}]);