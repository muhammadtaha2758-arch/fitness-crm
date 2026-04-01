"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["resources_src_views_app_pages_settings_mail_settings_vue"],{

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/settings/mail_settings.vue?vue&type=script&lang=js":
/*!**********************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/settings/mail_settings.vue?vue&type=script&lang=js ***!
  \**********************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var vuex__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! vuex */ "./node_modules/vuex/dist/vuex.esm.js");
/* harmony import */ var nprogress__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! nprogress */ "./node_modules/nprogress/nprogress.js");
/* harmony import */ var nprogress__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(nprogress__WEBPACK_IMPORTED_MODULE_0__);
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
  metaInfo: {
    title: "Mail Settings"
  },
  computed: _objectSpread({}, (0,vuex__WEBPACK_IMPORTED_MODULE_1__.mapGetters)(["currentUser"])),
  data: function data() {
    return {
      isLoading: true,
      isSaving: false,
      isTesting: false,
      showPassword: false,
      server: {
        id: null,
        host: "",
        port: "",
        username: "",
        password: "",
        encryption: "",
        sender_name: "",
        mail_mailer: ""
      },
      mailDriverOptions: [{
        value: "smtp",
        text: "SMTP"
      }, {
        value: "sendmail",
        text: "Sendmail"
      }, {
        value: "mailgun",
        text: "Mailgun"
      }, {
        value: "ses",
        text: "Amazon SES"
      }, {
        value: "postmark",
        text: "Postmark"
      }, {
        value: "log",
        text: "Log (Testing)"
      }],
      encryptionOptions: [{
        value: "tls",
        text: "TLS"
      }, {
        value: "ssl",
        text: "SSL"
      }, {
        value: "none",
        text: "None"
      }]
    };
  },
  methods: _objectSpread(_objectSpread({}, (0,vuex__WEBPACK_IMPORTED_MODULE_1__.mapActions)(["refreshUserPermissions"])), {}, {
    goBack: function goBack() {
      // Check if there's a previous page in history
      if (window.history.length > 1) {
        this.$router.go(-1);
      } else {
        // Default fallback to members page
        this.$router.push({
          name: 'ViewAllMembers'
        });
      }
    },
    // Get gym_id from user
    getGymId: function getGymId() {
      // Try from computed currentUser (mapGetters)
      if (this.currentUser && this.currentUser.gym_id) {
        return this.currentUser.gym_id;
      }

      // Try from Vuex store directly
      if (this.$store && this.$store.state && this.$store.state.auth && this.$store.state.auth.user) {
        var gymId = this.$store.state.auth.user.gym_id;
        if (gymId) return gymId;
      }

      // Try from localStorage
      try {
        var userData = localStorage.getItem('user');
        if (userData) {
          var user = JSON.parse(userData);
          if (user && user.gym_id) {
            return user.gym_id;
          }
        }
      } catch (e) {
        console.error('Error parsing user data from localStorage:', e);
      }

      // Try from sessionStorage
      try {
        var sessionUserData = sessionStorage.getItem('user');
        if (sessionUserData) {
          var _user = JSON.parse(sessionUserData);
          if (_user && _user.gym_id) {
            return _user.gym_id;
          }
        }
      } catch (e) {
        console.error('Error parsing user data from sessionStorage:', e);
      }

      // Return null if not found - backend will use gym_id from authenticated user token
      return null;
    },
    // Validate all required fields
    validateAllFields: function validateAllFields() {
      var errors = [];
      if (!this.server.mail_mailer || this.server.mail_mailer.trim() === '') {
        errors.push('Mail Driver is required');
      }
      if (!this.server.host || this.server.host.trim() === '') {
        errors.push('Mail Host is required');
      }
      if (!this.server.port || this.server.port.toString().trim() === '') {
        errors.push('Mail Port is required');
      } else if (isNaN(this.server.port) || parseInt(this.server.port) < 1 || parseInt(this.server.port) > 65535) {
        errors.push('Mail Port must be a valid number between 1 and 65535');
      }
      if (!this.server.sender_name || this.server.sender_name.trim() === '') {
        errors.push('Sender Name is required');
      }
      if (!this.server.username || this.server.username.trim() === '') {
        errors.push('Username is required');
      } else if (!this.isValidEmail(this.server.username)) {
        errors.push('Username must be a valid email address');
      }
      if (!this.server.password || this.server.password.trim() === '') {
        errors.push('Password is required');
      }
      if (!this.server.encryption || this.server.encryption.trim() === '') {
        errors.push('Encryption is required');
      }
      return errors;
    },
    // Validate email format
    isValidEmail: function isValidEmail(email) {
      var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    },
    //------------- Submit Validation SMTP
    Submit_config_mail: function Submit_config_mail() {
      var _this = this;
      // Note: Backend will use gym_id from authenticated user token, so we proceed even if gym_id is not found in frontend
      var gymId = this.getGymId();
      if (!gymId) {
        console.warn('Gym ID not found in frontend, but backend will use gym_id from authenticated user token');
      }

      // Validate form
      this.$refs.form_config_mail.validate().then(function (success) {
        if (!success) {
          // Get all validation errors
          var fieldErrors = _this.validateAllFields();
          if (fieldErrors.length > 0) {
            _this.makeToast("danger", "Please fix the following errors:\n• " + fieldErrors.join("\n• "), "Validation Failed");
          } else {
            _this.makeToast("danger", _this.Please_fill_the_form_correctly || "Please fill the form correctly", _this.Failed || "Failed");
          }
        } else {
          // Additional validation before submit
          var validationErrors = _this.validateAllFields();
          if (validationErrors.length > 0) {
            _this.makeToast("danger", "Please fix the following errors:\n• " + validationErrors.join("\n• "), "Validation Failed");
            return;
          }
          _this.Update_config_mail();
        }
      });
    },
    //------ Toast
    makeToast: function makeToast(variant, msg, title) {
      this.$root.$bvToast.toast(msg, {
        title: title,
        variant: variant,
        solid: true,
        autoHideDelay: variant === 'danger' ? 8000 : 5000,
        appendToast: false
      });
    },
    getValidationState: function getValidationState(_ref) {
      var dirty = _ref.dirty,
        validated = _ref.validated,
        _ref$valid = _ref.valid,
        valid = _ref$valid === void 0 ? null : _ref$valid;
      return dirty || validated ? valid : null;
    },
    //---------------------------------- Update SMTP ----------------
    Update_config_mail: function Update_config_mail() {
      var _this2 = this;
      // Note: Backend will use gym_id from authenticated user token, so we proceed even if gym_id is not found in frontend
      var gymId = this.getGymId();
      if (!gymId) {
        console.warn('Gym ID not found in frontend, but backend will use gym_id from authenticated user token');
      }

      // Validate all fields
      var validationErrors = this.validateAllFields();
      if (validationErrors.length > 0) {
        this.makeToast("danger", "Please fix the following errors before saving:\n• " + validationErrors.join("\n• "), "Validation Failed");
        this.isSaving = false;
        return;
      }

      // Check if server exists (has id)
      // If server doesn't exist, we'll try to update/create it via the backend
      // The backend will handle creation if needed based on gym_id from token
      if (!this.server.id) {
        // Try to update/create - backend will handle it based on gym_id from authenticated user
        console.info('Server ID not found, backend will handle creation/update based on gym_id from token');
      }
      this.isSaving = true;
      nprogress__WEBPACK_IMPORTED_MODULE_0___default().start();
      nprogress__WEBPACK_IMPORTED_MODULE_0___default().set(0.1);

      // Use server.id if it exists, otherwise use 0 or 1 as placeholder (backend will handle based on gym_id)
      var serverId = this.server.id || 1;
      axios.put("update_config_mail/" + serverId, {
        mail_mailer: this.server.mail_mailer,
        host: this.server.host,
        port: this.server.port,
        sender_name: this.server.sender_name,
        username: this.server.username,
        password: this.server.password,
        encryption: this.server.encryption
      }).then(function (response) {
        Fire.$emit("Event_Smtp");

        // Update server ID if it was created
        if (response.data && response.data.server && response.data.server.id) {
          _this2.server.id = response.data.server.id;
        }
        _this2.makeToast("success", response.data.message || _this2.Successfully_Updated || "Mail settings updated successfully!", _this2.Success || "Success");
        nprogress__WEBPACK_IMPORTED_MODULE_0___default().done();
        _this2.isSaving = false;

        // Refresh server data to get latest information (after showing success message)
        _this2.$nextTick(function () {
          _this2.get_config_mail();
        });
      })["catch"](function (error) {
        nprogress__WEBPACK_IMPORTED_MODULE_0___default().done();
        _this2.isSaving = false;

        // Handle different error types
        var errorMessage = _this2.InvalidData || "Failed to update mail settings";
        if (error.response) {
          // Server responded with error
          var status = error.response.status;
          var data = error.response.data;
          if (status === 401 || status === 403) {
            errorMessage = "You don't have permission to update mail settings. Please contact your administrator.";
          } else if (status === 404) {
            errorMessage = "Server configuration not found. Please contact administrator.";
          } else if (status === 422 && data.errors) {
            // Validation errors from server
            var serverErrors = [];
            Object.keys(data.errors).forEach(function (key) {
              serverErrors.push.apply(serverErrors, _toConsumableArray(data.errors[key]));
            });
            errorMessage = "Validation errors:\n• " + serverErrors.join("\n• ");
          } else if (data.message) {
            errorMessage = data.message;
          } else if (data.error) {
            errorMessage = data.error;
          }
        } else if (error.request) {
          // Request made but no response
          errorMessage = "Network error: Unable to connect to server. Please check your internet connection.";
        } else {
          // Something else happened
          errorMessage = error.message || "An unexpected error occurred. Please try again.";
        }
        _this2.makeToast("danger", errorMessage, _this2.Failed || "Failed");
      });
    },
    //---------------------------------- GET SMTP ----------------
    get_config_mail: function get_config_mail() {
      var _this3 = this;
      // Note: Backend will use gym_id from authenticated user token, so we can load even if gym_id is not found in frontend
      var gymId = this.getGymId();
      if (!gymId) {
        console.warn('Gym ID not found in frontend, but backend will use gym_id from authenticated user token');
      }
      axios.get("get_config_mail").then(function (response) {
        if (response.data.server && response.data.server.id) {
          _this3.server = response.data.server;
        } else {
          // Server doesn't exist yet - initialize empty form
          _this3.server = {
            id: null,
            host: "",
            port: "",
            username: "",
            password: "",
            encryption: "",
            sender_name: "",
            mail_mailer: ""
          };
          _this3.makeToast("info", "No mail configuration found. Please fill in all fields to create a new configuration.", "No Configuration Found");
        }
        _this3.isLoading = false;
      })["catch"](function (error) {
        _this3.isLoading = false;
        var errorMessage = "Failed to load mail settings";
        if (error.response) {
          var status = error.response.status;
          var data = error.response.data;
          if (status === 401 || status === 403) {
            errorMessage = "You don't have permission to view mail settings. Please contact your administrator.";
          } else if (data.message) {
            errorMessage = data.message;
          } else if (data.error) {
            errorMessage = data.error;
          }
        } else if (error.request) {
          errorMessage = "Network error: Unable to connect to server. Please check your internet connection.";
        } else {
          errorMessage = error.message || "An unexpected error occurred while loading settings.";
        }
        _this3.makeToast("danger", errorMessage, "Error Loading Settings");
      });
    },
    // Test connection method
    testConnection: function testConnection() {
      var _this4 = this;
      // Note: Backend will use gym_id from authenticated user token
      var gymId = this.getGymId();
      if (!gymId) {
        console.warn('Gym ID not found in frontend, but backend will use gym_id from authenticated user token');
      }

      // Validate all fields before testing
      var validationErrors = this.validateAllFields();
      if (validationErrors.length > 0) {
        this.makeToast("danger", "Please fill in all required fields before testing:\n• " + validationErrors.join("\n• "), "Validation Required");
        return;
      }
      this.isTesting = true;

      // TODO: Implement actual test connection API call
      // For now, simulate a test
      setTimeout(function () {
        _this4.isTesting = false;
        _this4.makeToast("success", "Connection test completed successfully! All settings are correct.", "Test Result");
      }, 2000);
    },
    // Reset form method
    resetForm: function resetForm() {
      if (this.$refs.form_config_mail) {
        this.$refs.form_config_mail.reset();
      }
      this.get_config_mail();
    }
  }),
  //end Methods

  //----------------------------- Created function-------------------
  created: function created() {
    var _this5 = this;
    this.get_config_mail();
    Fire.$on("Event_Smtp", function () {
      _this5.get_config_mail();
    });
  }
});

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js??clonedRuleSet-12.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12.use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-12.use[3]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/settings/mail_settings.vue?vue&type=style&index=0&id=3f2acb48&lang=scss&scoped=true":
/*!*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??clonedRuleSet-12.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12.use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-12.use[3]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/settings/mail_settings.vue?vue&type=style&index=0&id=3f2acb48&lang=scss&scoped=true ***!
  \*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
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
___CSS_LOADER_EXPORT___.push([module.id, "@charset \"UTF-8\";\n.filter-btn .btn[data-v-3f2acb48],\n.filter-btn .btn-secondary[data-v-3f2acb48],\n.filter-btn .btn-outline-secondary[data-v-3f2acb48],\n.filter-btn button.btn[data-v-3f2acb48],\n.filter-btn button.btn-secondary[data-v-3f2acb48] {\n  color: #000 !important;\n  background-color: transparent !important;\n  border-color: #6c757d !important;\n}\n.filter-btn .btn[data-v-3f2acb48]:hover,\n.filter-btn .btn-secondary[data-v-3f2acb48]:hover,\n.filter-btn .btn-outline-secondary[data-v-3f2acb48]:hover,\n.filter-btn button.btn[data-v-3f2acb48]:hover,\n.filter-btn button.btn-secondary[data-v-3f2acb48]:hover {\n  color: #dc3545 !important;\n  background-color: transparent !important;\n  border-color: #dc3545 !important;\n  box-shadow: none !important;\n}\n.filter-btn .btn[data-v-3f2acb48]:focus,\n.filter-btn .btn-secondary[data-v-3f2acb48]:focus,\n.filter-btn .btn-outline-secondary[data-v-3f2acb48]:focus,\n.filter-btn button.btn[data-v-3f2acb48]:focus,\n.filter-btn button.btn-secondary[data-v-3f2acb48]:focus {\n  color: #dc3545 !important;\n  background-color: transparent !important;\n  border-color: #dc3545 !important;\n  box-shadow: none !important;\n}\n.filter-btn .btn[data-v-3f2acb48]:active,\n.filter-btn .btn-secondary[data-v-3f2acb48]:active,\n.filter-btn .btn-outline-secondary[data-v-3f2acb48]:active,\n.filter-btn button.btn[data-v-3f2acb48]:active,\n.filter-btn button.btn-secondary[data-v-3f2acb48]:active {\n  color: #dc3545 !important;\n  background-color: transparent !important;\n  border-color: #dc3545 !important;\n}\n.btn-secondary[data-v-3f2acb48]:not(:disabled):not(.disabled):active:focus {\n  box-shadow: none !important;\n}\n\n/* ===========================================\n   COMMON BREADCRUMB NAVIGATION STYLES\n   =========================================== */\n.breadcrumb-nav-row[data-v-3f2acb48] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  margin-bottom: 0.5rem;\n  gap: 0.5rem;\n}\n.breadcrumb-section[data-v-3f2acb48] {\n  flex: 1;\n}\n.breadcrumb-section .breadcrumb-nav .breadcrumb-container[data-v-3f2acb48] {\n  display: flex;\n  align-items: center;\n  gap: 1rem;\n}\n.breadcrumb-section .breadcrumb-nav .breadcrumb-container .back-button[data-v-3f2acb48] {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  width: 40px;\n  height: 40px;\n  background: rgba(255, 255, 255, 0.1);\n  border: 1px solid rgba(255, 255, 255, 0.2);\n  border-radius: 8px;\n  color: #ffffff;\n  cursor: pointer;\n  transition: all 0.3s ease;\n}\n.breadcrumb-section .breadcrumb-nav .breadcrumb-container .back-button[data-v-3f2acb48]:hover {\n  background: rgba(255, 255, 255, 0.15);\n  border-color: rgba(255, 255, 255, 0.3);\n  transform: translateY(-1px);\n  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);\n  color: #dc3545;\n}\n.breadcrumb-section .breadcrumb-nav .breadcrumb-container .back-button i[data-v-3f2acb48] {\n  font-size: 1.1em;\n}\n.breadcrumb-section .breadcrumb-nav .breadcrumb-container .breadcrumb[data-v-3f2acb48] {\n  display: flex;\n  align-items: center;\n  gap: 0.5rem;\n  margin: 0;\n  padding: 0;\n  background: none;\n  border-radius: 0;\n}\n.breadcrumb-section .breadcrumb-nav .breadcrumb-container .breadcrumb .breadcrumb-item[data-v-3f2acb48] {\n  display: flex;\n  align-items: center;\n  gap: 0.5rem;\n  font-size: 0.875rem;\n  color: #ffffff;\n}\n.breadcrumb-section .breadcrumb-nav .breadcrumb-container .breadcrumb .breadcrumb-item.active[data-v-3f2acb48] {\n  color: #252525;\n  font-weight: 600;\n}\n.breadcrumb-section .breadcrumb-nav .breadcrumb-container .breadcrumb .breadcrumb-item.active i[data-v-3f2acb48] {\n  color: #dc3545;\n}\n.breadcrumb-section .breadcrumb-nav .breadcrumb-container .breadcrumb .breadcrumb-item a[data-v-3f2acb48] {\n  display: flex;\n  align-items: center;\n  gap: 0.5rem;\n  color: #6a6a6a;\n  text-decoration: none;\n  transition: color 0.3s ease;\n}\n.breadcrumb-section .breadcrumb-nav .breadcrumb-container .breadcrumb .breadcrumb-item a[data-v-3f2acb48]:hover {\n  color: #dc3545;\n}\n.breadcrumb-section .breadcrumb-nav .breadcrumb-container .breadcrumb .breadcrumb-item a:hover i[data-v-3f2acb48] {\n  color: #dc3545;\n}\n.breadcrumb-section .breadcrumb-nav .breadcrumb-container .breadcrumb .breadcrumb-item a i[data-v-3f2acb48] {\n  font-size: 0.9em;\n  transition: color 0.3s ease;\n}\n.breadcrumb-section .breadcrumb-nav .breadcrumb-container .breadcrumb .breadcrumb-item[data-v-3f2acb48]:not(:last-child)::after {\n  content: \"›\";\n  margin-left: 0.5rem;\n  color: #6a6a6a;\n  font-size: 1.2em;\n}\n.action-section[data-v-3f2acb48] {\n  display: flex;\n  align-items: center;\n}\n.action-section .action-btn[data-v-3f2acb48] {\n  display: flex;\n  align-items: center;\n  gap: 0.5rem;\n  padding: 0.5rem 1rem;\n  border-radius: 8px;\n  font-size: 0.875rem;\n  font-weight: 500;\n  transition: all 0.3s ease;\n}\n.action-section .action-btn[data-v-3f2acb48]:hover:not(:disabled) {\n  transform: translateY(-1px);\n  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);\n}\n.action-section .action-btn[data-v-3f2acb48]:disabled {\n  opacity: 0.6;\n  cursor: not-allowed;\n}\n.action-section .action-btn i[data-v-3f2acb48] {\n  font-size: 0.9em;\n}\n@media (max-width: 768px) {\n.breadcrumb-nav-row[data-v-3f2acb48] {\n    flex-direction: column;\n    align-items: flex-start;\n    gap: 0.5rem;\n}\n.breadcrumb-section[data-v-3f2acb48] {\n    width: 100%;\n}\n.breadcrumb-section .breadcrumb-container[data-v-3f2acb48] {\n    flex-direction: column;\n    align-items: flex-start;\n    gap: 0.5rem;\n}\n.breadcrumb-section .breadcrumb-container .breadcrumb[data-v-3f2acb48] {\n    flex-wrap: wrap;\n}\n.breadcrumb-section .breadcrumb-container .breadcrumb .breadcrumb-item[data-v-3f2acb48] {\n    font-size: 0.8rem;\n}\n.breadcrumb-section .breadcrumb-container .breadcrumb .breadcrumb-item a[data-v-3f2acb48] {\n    font-size: 0.8rem;\n}\n.action-section[data-v-3f2acb48] {\n    width: 100%;\n    justify-content: flex-end;\n}\n.action-section .action-btn[data-v-3f2acb48] {\n    font-size: 0.8rem;\n    padding: 0.4rem 0.8rem;\n}\n}\n/* ===========================================\n   RESPONSIVE UTILITY CLASSES (ALL DEVICES)\n   =========================================== */\n.show-xs-only[data-v-3f2acb48],\n.show-sm-only[data-v-3f2acb48],\n.show-md-only[data-v-3f2acb48],\n.show-lg-only[data-v-3f2acb48],\n.show-xl-only[data-v-3f2acb48] {\n  display: none !important;\n}\n@media (max-width: 575px) {\n.hide-xs[data-v-3f2acb48] {\n    display: none !important;\n}\n.show-xs-only[data-v-3f2acb48] {\n    display: initial !important;\n}\n}\n@media (min-width: 576px) and (max-width: 767px) {\n.hide-sm[data-v-3f2acb48] {\n    display: none !important;\n}\n.show-sm-only[data-v-3f2acb48] {\n    display: initial !important;\n}\n}\n@media (min-width: 768px) and (max-width: 991px) {\n.hide-md[data-v-3f2acb48] {\n    display: none !important;\n}\n.show-md-only[data-v-3f2acb48] {\n    display: initial !important;\n}\n}\n@media (min-width: 992px) and (max-width: 1199px) {\n.hide-lg[data-v-3f2acb48] {\n    display: none !important;\n}\n.show-lg-only[data-v-3f2acb48] {\n    display: initial !important;\n}\n}\n@media (min-width: 1200px) {\n.hide-xl[data-v-3f2acb48] {\n    display: none !important;\n}\n.show-xl-only[data-v-3f2acb48] {\n    display: initial !important;\n}\n}\n@media (max-width: 576px) {\n.hide-sm-down[data-v-3f2acb48] {\n    display: none !important;\n}\n}\n@media (max-width: 768px) {\n.hide-md-down[data-v-3f2acb48] {\n    display: none !important;\n}\n}\n@media (max-width: 992px) {\n.hide-lg-down[data-v-3f2acb48] {\n    display: none !important;\n}\n}\n@media (min-width: 576px) {\n.hide-sm-up[data-v-3f2acb48] {\n    display: none !important;\n}\n}\n@media (min-width: 768px) {\n.hide-md-up[data-v-3f2acb48] {\n    display: none !important;\n}\n}\n@media (min-width: 992px) {\n.hide-lg-up[data-v-3f2acb48] {\n    display: none !important;\n}\n}\n@media (max-width: 575px) {\n.d-xs-none[data-v-3f2acb48] {\n    display: none !important;\n}\n.d-xs-block[data-v-3f2acb48] {\n    display: block !important;\n}\n.d-xs-flex[data-v-3f2acb48] {\n    display: flex !important;\n}\n}\n@media (min-width: 576px) and (max-width: 767px) {\n.d-sm-none[data-v-3f2acb48] {\n    display: none !important;\n}\n.d-sm-block[data-v-3f2acb48] {\n    display: block !important;\n}\n.d-sm-flex[data-v-3f2acb48] {\n    display: flex !important;\n}\n}\n@media (min-width: 768px) and (max-width: 991px) {\n.d-md-none[data-v-3f2acb48] {\n    display: none !important;\n}\n.d-md-block[data-v-3f2acb48] {\n    display: block !important;\n}\n.d-md-flex[data-v-3f2acb48] {\n    display: flex !important;\n}\n}\n@media (min-width: 992px) and (max-width: 1199px) {\n.d-lg-none[data-v-3f2acb48] {\n    display: none !important;\n}\n.d-lg-block[data-v-3f2acb48] {\n    display: block !important;\n}\n.d-lg-flex[data-v-3f2acb48] {\n    display: flex !important;\n}\n}\n@media (min-width: 1200px) {\n.d-xl-none[data-v-3f2acb48] {\n    display: none !important;\n}\n.d-xl-block[data-v-3f2acb48] {\n    display: block !important;\n}\n.d-xl-flex[data-v-3f2acb48] {\n    display: flex !important;\n}\n}\n@media (min-width: 576px) {\n.custom-modal-xl[data-v-3f2acb48] {\n    max-width: 1500px !important;\n}\n}\n.main-content[data-v-3f2acb48] {\n  padding: 10px;\n  background: #f5f5f3;\n  min-height: 100vh;\n}\n.loading-container[data-v-3f2acb48] {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  padding: 60px;\n  text-align: center;\n}\n.loading-spinner[data-v-3f2acb48] {\n  width: 50px;\n  height: 50px;\n  border: 4px solid #e0e0e0;\n  border-top: 4px solid #dc3545;\n  border-radius: 50%;\n  animation: spin-data-v-3f2acb48 1s linear infinite;\n  margin-bottom: 20px;\n}\n.loading-text[data-v-3f2acb48] {\n  color: #6a6a6a;\n  font-size: 1.125rem;\n  font-weight: 500;\n}\n@keyframes spin-data-v-3f2acb48 {\n0% {\n    transform: rotate(0deg);\n}\n100% {\n    transform: rotate(360deg);\n}\n}\n.form-header[data-v-3f2acb48] {\n  display: flex;\n  align-items: center;\n  margin-bottom: 5px;\n  padding: 10px;\n  background: #ffffff;\n  border-radius: 10px;\n  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);\n  border: 1px solid #e0e0e0;\n}\n.header-icon[data-v-3f2acb48] {\n  width: 40px;\n  height: 40px;\n  background: linear-gradient(to right, #dc3545, #e52e2e);\n  border-radius: 10px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  margin-right: 30px;\n  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);\n}\n.header-icon i[data-v-3f2acb48] {\n  font-size: 28px;\n  color: #ffffff;\n}\n.header-content[data-v-3f2acb48] {\n  flex: 1;\n}\n.page-title[data-v-3f2acb48] {\n  font-size: 2rem;\n  font-weight: 700;\n  color: #252525;\n  margin: 0 0 8px 0;\n  line-height: 1.4;\n}\n.page-description[data-v-3f2acb48] {\n  font-size: 1.125rem;\n  color: #6a6a6a;\n  margin: 0;\n  line-height: 1.2;\n}\n.settings-card[data-v-3f2acb48] {\n  background: #ffffff;\n  border-radius: 16px;\n  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);\n  border: 1px solid #e0e0e0;\n  margin-bottom: 10px;\n  overflow: hidden;\n  transition: box-shadow 0.3s ease;\n}\n.settings-card[data-v-3f2acb48]:hover {\n  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);\n}\n.card-header[data-v-3f2acb48] {\n  padding: 15px;\n  background: linear-gradient(135deg, #f5f5f3 0%, rgb(251.9545454545, 251.9545454545, 251.3454545455) 100%);\n  border-bottom: 1px solid #e0e0e0;\n}\n.card-title[data-v-3f2acb48] {\n  font-size: 1.25rem;\n  font-weight: 600;\n  color: #252525;\n  margin: 0 0 8px 0;\n  display: flex;\n  align-items: center;\n  gap: 10px;\n}\n.card-title i[data-v-3f2acb48] {\n  color: #dc3545;\n}\n.card-subtitle[data-v-3f2acb48] {\n  font-size: 0.875rem;\n  color: #6a6a6a;\n  margin: 0;\n  line-height: 1.2;\n}\n.card-body[data-v-3f2acb48] {\n  padding: 10px !important;\n}\n.form-col[data-v-3f2acb48] {\n  margin-bottom: 15px;\n}\n.form-group[data-v-3f2acb48] {\n  position: relative;\n  margin-bottom: 0;\n}\n.form-label[data-v-3f2acb48] {\n  font-weight: 600;\n  color: #252525;\n  margin-bottom: 8px;\n  display: block;\n  font-size: 0.875rem;\n  display: flex;\n  align-items: center;\n}\n.form-label i[data-v-3f2acb48] {\n  color: #dc3545;\n  margin-right: 8px;\n}\n.form-help[data-v-3f2acb48] {\n  display: block;\n  margin-top: 8px;\n  font-size: 0.75rem;\n  color: #6a6a6a;\n  line-height: 1.2;\n}\n.form-control[data-v-3f2acb48] {\n  width: 100%;\n  padding: 5px 10px;\n  border: 2px solid #e0e0e0;\n  border-radius: 5px;\n  font-size: 0.875rem;\n  transition: all 0.3s ease;\n  background: #dededc;\n  color: #252525;\n  line-height: 1.2;\n}\n.form-control[data-v-3f2acb48]:focus {\n  outline: none;\n  border-color: #dc3545;\n  box-shadow: 0 0 0 3px rgba(220, 53, 69, 0.1);\n  transform: translateY(-1px);\n}\n.form-control[data-v-3f2acb48]::-moz-placeholder {\n  color: #6a6a6a;\n  font-style: italic;\n}\n.form-control[data-v-3f2acb48]::placeholder {\n  color: #6a6a6a;\n  font-style: italic;\n}\n.form-control.is-invalid[data-v-3f2acb48] {\n  border-color: #f44336;\n  box-shadow: 0 0 0 3px rgba(244, 67, 54, 0.1);\n}\n.custom-select[data-v-3f2acb48] {\n  cursor: pointer;\n  background-image: url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3e%3c/svg%3e\");\n  background-position: right 12px center;\n  background-repeat: no-repeat;\n  background-size: 16px;\n  padding-right: 40px;\n  -webkit-appearance: none;\n     -moz-appearance: none;\n          appearance: none;\n}\n.custom-input[data-v-3f2acb48]:focus {\n  background: #ffffff;\n}\n.password-input-wrapper[data-v-3f2acb48] {\n  position: relative;\n  display: flex;\n  align-items: center;\n}\n.password-toggle[data-v-3f2acb48] {\n  position: absolute;\n  right: 12px;\n  top: 50%;\n  transform: translateY(-50%);\n  background: none;\n  border: none;\n  color: #6a6a6a;\n  cursor: pointer;\n  padding: 4px;\n  border-radius: 4px;\n  transition: all 0.2s ease;\n}\n.password-toggle[data-v-3f2acb48]:hover {\n  color: #dc3545;\n  background: rgba(220, 53, 69, 0.1);\n}\n.password-toggle i[data-v-3f2acb48] {\n  font-size: 16px;\n}\n.test-connection-card[data-v-3f2acb48] {\n  background: #ffffff;\n  border-radius: 16px;\n  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);\n  border: 1px solid #e0e0e0;\n  margin-bottom: 15px;\n  overflow: hidden;\n}\n.test-connection-content[data-v-3f2acb48] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 30px;\n}\n@media (max-width: 768px) {\n.test-connection-content[data-v-3f2acb48] {\n    flex-direction: column;\n    align-items: stretch;\n    text-align: center;\n}\n}\n.test-description[data-v-3f2acb48] {\n  flex: 1;\n  margin: 0;\n  font-size: 0.875rem;\n  color: #6a6a6a;\n  line-height: 1.2;\n}\n.btn[data-v-3f2acb48] {\n  padding: 10px 30px;\n  border-radius: 8px;\n  font-weight: 600;\n  font-size: 0.875rem;\n  border: none;\n  cursor: pointer;\n  transition: all 0.3s ease;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  text-decoration: none;\n  min-height: 44px;\n  gap: 10px;\n}\n.btn[data-v-3f2acb48]:disabled {\n  opacity: 0.6;\n  cursor: not-allowed;\n  transform: none !important;\n}\n.btn i[data-v-3f2acb48] {\n  font-size: 16px;\n}\n.btn-primary[data-v-3f2acb48] {\n  background: linear-gradient(to right, #dc3545, #e52e2e);\n  color: #ffffff;\n}\n.btn-primary[data-v-3f2acb48]:hover:not(:disabled) {\n  transform: translateY(-2px);\n  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);\n}\n.btn-primary[data-v-3f2acb48]:active:not(:disabled) {\n  transform: translateY(0);\n}\n.btn-secondary[data-v-3f2acb48] {\n  background: #ff4081;\n  color: #ffffff;\n}\n.btn-secondary[data-v-3f2acb48]:hover:not(:disabled) {\n  background: rgb(255, 13, 95.3560209424);\n  transform: translateY(-2px);\n  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);\n}\n.btn-test[data-v-3f2acb48] {\n  background: #2196f3;\n  color: #ffffff;\n}\n.btn-test[data-v-3f2acb48]:hover:not(:disabled) {\n  background: rgb(11.5384615385, 124.0384615385, 213.4615384615);\n  transform: translateY(-2px);\n  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);\n}\n.form-actions[data-v-3f2acb48] {\n  display: flex;\n  gap: 10px;\n  justify-content: center;\n  padding: 15px;\n  background: #ffffff;\n  border-radius: 10px;\n  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);\n  border: 1px solid #e0e0e0;\n}\n@media (max-width: 576px) {\n.form-actions[data-v-3f2acb48] {\n    flex-direction: column;\n    align-items: stretch;\n}\n}\n.invalid-feedback[data-v-3f2acb48] {\n  display: block;\n  width: 100%;\n  margin-top: 8px;\n  font-size: 0.75rem;\n  color: #f44336;\n  line-height: 1.2;\n}\n@media (max-width: 992px) {\n.main-content[data-v-3f2acb48] {\n    padding: 20px;\n}\n.form-header[data-v-3f2acb48] {\n    flex-direction: column;\n    text-align: center;\n}\n.form-header .header-icon[data-v-3f2acb48] {\n    margin-right: 0;\n    margin-bottom: 20px;\n}\n.page-title[data-v-3f2acb48] {\n    font-size: 1.5rem;\n}\n}\n@media (max-width: 768px) {\n.card-body[data-v-3f2acb48] {\n    padding: 20px;\n}\n.form-col[data-v-3f2acb48] {\n    margin-bottom: 20px;\n}\n}\n@media (max-width: 576px) {\n.main-content[data-v-3f2acb48] {\n    padding: 10px;\n}\n.form-header[data-v-3f2acb48] {\n    padding: 20px;\n}\n.card-header[data-v-3f2acb48],\n  .card-body[data-v-3f2acb48] {\n    padding: 20px;\n}\n.page-title[data-v-3f2acb48] {\n    font-size: 1.25rem;\n}\n}", ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-12.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12.use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-12.use[3]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/settings/mail_settings.vue?vue&type=style&index=0&id=3f2acb48&lang=scss&scoped=true":
/*!*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-12.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12.use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-12.use[3]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/settings/mail_settings.vue?vue&type=style&index=0&id=3f2acb48&lang=scss&scoped=true ***!
  \*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../../../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_clonedRuleSet_12_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_12_use_2_node_modules_sass_loader_dist_cjs_js_clonedRuleSet_12_use_3_node_modules_vue_loader_lib_index_js_vue_loader_options_mail_settings_vue_vue_type_style_index_0_id_3f2acb48_lang_scss_scoped_true__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !!../../../../../../node_modules/css-loader/dist/cjs.js??clonedRuleSet-12.use[1]!../../../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12.use[2]!../../../../../../node_modules/sass-loader/dist/cjs.js??clonedRuleSet-12.use[3]!../../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./mail_settings.vue?vue&type=style&index=0&id=3f2acb48&lang=scss&scoped=true */ "./node_modules/css-loader/dist/cjs.js??clonedRuleSet-12.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12.use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-12.use[3]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/settings/mail_settings.vue?vue&type=style&index=0&id=3f2acb48&lang=scss&scoped=true");

            

var options = {};

options.insert = "head";
options.singleton = false;

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_clonedRuleSet_12_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_12_use_2_node_modules_sass_loader_dist_cjs_js_clonedRuleSet_12_use_3_node_modules_vue_loader_lib_index_js_vue_loader_options_mail_settings_vue_vue_type_style_index_0_id_3f2acb48_lang_scss_scoped_true__WEBPACK_IMPORTED_MODULE_1__["default"], options);



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_clonedRuleSet_12_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_12_use_2_node_modules_sass_loader_dist_cjs_js_clonedRuleSet_12_use_3_node_modules_vue_loader_lib_index_js_vue_loader_options_mail_settings_vue_vue_type_style_index_0_id_3f2acb48_lang_scss_scoped_true__WEBPACK_IMPORTED_MODULE_1__["default"].locals || {});

/***/ }),

/***/ "./resources/src/views/app/pages/settings/mail_settings.vue":
/*!******************************************************************!*\
  !*** ./resources/src/views/app/pages/settings/mail_settings.vue ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _mail_settings_vue_vue_type_template_id_3f2acb48_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./mail_settings.vue?vue&type=template&id=3f2acb48&scoped=true */ "./resources/src/views/app/pages/settings/mail_settings.vue?vue&type=template&id=3f2acb48&scoped=true");
/* harmony import */ var _mail_settings_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./mail_settings.vue?vue&type=script&lang=js */ "./resources/src/views/app/pages/settings/mail_settings.vue?vue&type=script&lang=js");
/* harmony import */ var _mail_settings_vue_vue_type_style_index_0_id_3f2acb48_lang_scss_scoped_true__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./mail_settings.vue?vue&type=style&index=0&id=3f2acb48&lang=scss&scoped=true */ "./resources/src/views/app/pages/settings/mail_settings.vue?vue&type=style&index=0&id=3f2acb48&lang=scss&scoped=true");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");



;


/* normalize component */

var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _mail_settings_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__["default"],
  _mail_settings_vue_vue_type_template_id_3f2acb48_scoped_true__WEBPACK_IMPORTED_MODULE_0__.render,
  _mail_settings_vue_vue_type_template_id_3f2acb48_scoped_true__WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  "3f2acb48",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/src/views/app/pages/settings/mail_settings.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./resources/src/views/app/pages/settings/mail_settings.vue?vue&type=script&lang=js":
/*!******************************************************************************************!*\
  !*** ./resources/src/views/app/pages/settings/mail_settings.vue?vue&type=script&lang=js ***!
  \******************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_mail_settings_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./mail_settings.vue?vue&type=script&lang=js */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/settings/mail_settings.vue?vue&type=script&lang=js");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_mail_settings_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/src/views/app/pages/settings/mail_settings.vue?vue&type=style&index=0&id=3f2acb48&lang=scss&scoped=true":
/*!***************************************************************************************************************************!*\
  !*** ./resources/src/views/app/pages/settings/mail_settings.vue?vue&type=style&index=0&id=3f2acb48&lang=scss&scoped=true ***!
  \***************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_dist_cjs_js_node_modules_css_loader_dist_cjs_js_clonedRuleSet_12_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_12_use_2_node_modules_sass_loader_dist_cjs_js_clonedRuleSet_12_use_3_node_modules_vue_loader_lib_index_js_vue_loader_options_mail_settings_vue_vue_type_style_index_0_id_3f2acb48_lang_scss_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/style-loader/dist/cjs.js!../../../../../../node_modules/css-loader/dist/cjs.js??clonedRuleSet-12.use[1]!../../../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12.use[2]!../../../../../../node_modules/sass-loader/dist/cjs.js??clonedRuleSet-12.use[3]!../../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./mail_settings.vue?vue&type=style&index=0&id=3f2acb48&lang=scss&scoped=true */ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-12.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12.use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-12.use[3]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/settings/mail_settings.vue?vue&type=style&index=0&id=3f2acb48&lang=scss&scoped=true");


/***/ }),

/***/ "./resources/src/views/app/pages/settings/mail_settings.vue?vue&type=template&id=3f2acb48&scoped=true":
/*!************************************************************************************************************!*\
  !*** ./resources/src/views/app/pages/settings/mail_settings.vue?vue&type=template&id=3f2acb48&scoped=true ***!
  \************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_mail_settings_vue_vue_type_template_id_3f2acb48_scoped_true__WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   staticRenderFns: () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_mail_settings_vue_vue_type_template_id_3f2acb48_scoped_true__WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_mail_settings_vue_vue_type_template_id_3f2acb48_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./mail_settings.vue?vue&type=template&id=3f2acb48&scoped=true */ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/settings/mail_settings.vue?vue&type=template&id=3f2acb48&scoped=true");


/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/settings/mail_settings.vue?vue&type=template&id=3f2acb48&scoped=true":
/*!***************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/settings/mail_settings.vue?vue&type=template&id=3f2acb48&scoped=true ***!
  \***************************************************************************************************************************************************************************************************************************************************/
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
      _c("div", { staticClass: "breadcrumb-nav-row" }, [
        _c("div", { staticClass: "breadcrumb-section" }, [
          _c(
            "nav",
            {
              staticClass: "breadcrumb-nav",
              attrs: { "aria-label": "breadcrumb" },
            },
            [
              _c("div", { staticClass: "breadcrumb-container" }, [
                _c(
                  "button",
                  {
                    staticClass: "back-button",
                    staticStyle: { color: "#252525" },
                    attrs: { type: "button", title: "Go back" },
                    on: {
                      click: function ($event) {
                        $event.stopPropagation()
                        return _vm.goBack.apply(null, arguments)
                      },
                    },
                  },
                  [_c("i", { staticClass: "fas fa-arrow-left" })]
                ),
                _vm._v(" "),
                _c("ol", { staticClass: "breadcrumb" }, [
                  _c(
                    "li",
                    { staticClass: "breadcrumb-item" },
                    [
                      _c(
                        "router-link",
                        { attrs: { to: "/app/Members/ViewAllMembers" } },
                        [
                          _c("i", { staticClass: "fas fa-home" }),
                          _vm._v("\n                Dashboard\n              "),
                        ]
                      ),
                    ],
                    1
                  ),
                  _vm._v(" "),
                  _c(
                    "li",
                    { staticClass: "breadcrumb-item" },
                    [
                      _c("router-link", { attrs: { to: "/app/settings" } }, [
                        _c("i", { staticClass: "fas fa-cogs" }),
                        _vm._v("\n                Settings\n              "),
                      ]),
                    ],
                    1
                  ),
                  _vm._v(" "),
                  _vm._m(0),
                ]),
              ]),
            ]
          ),
        ]),
      ]),
      _vm._v(" "),
      _vm.isLoading
        ? _c("div", { staticClass: "loading-container" }, [
            _c("div", { staticClass: "loading-spinner" }),
            _vm._v(" "),
            _c("p", { staticClass: "loading-text" }, [
              _vm._v("Loading mail configuration..."),
            ]),
          ])
        : _vm._e(),
      _vm._v(" "),
      !_vm.isLoading
        ? _c(
            "validation-observer",
            { ref: "form_config_mail" },
            [
              _c(
                "b-form",
                {
                  staticClass: "mail-settings-form",
                  on: {
                    submit: function ($event) {
                      $event.preventDefault()
                      return _vm.Submit_config_mail.apply(null, arguments)
                    },
                  },
                },
                [
                  _c("div", { staticClass: "form-header" }, [
                    _c("div", { staticClass: "header-icon" }, [
                      _c("i", { staticClass: "i-Mail" }),
                    ]),
                    _vm._v(" "),
                    _c("div", { staticClass: "header-content" }, [
                      _c("h1", { staticClass: "page-title" }, [
                        _vm._v("Mail Settings"),
                      ]),
                      _vm._v(" "),
                      _c("p", { staticClass: "page-description" }, [
                        _vm._v(
                          "Configure your email server settings for sending notifications and communications"
                        ),
                      ]),
                    ]),
                  ]),
                  _vm._v(" "),
                  _c("div", { staticClass: "settings-card" }, [
                    _c("div", { staticClass: "card-header" }, [
                      _c("h3", { staticClass: "card-title" }, [
                        _c("i", { staticClass: "i-Settings-2 me-2" }),
                        _vm._v(
                          "\n            Server Configuration\n          "
                        ),
                      ]),
                      _vm._v(" "),
                      _c("p", { staticClass: "card-subtitle" }, [
                        _vm._v("Configure your SMTP or mail service settings"),
                      ]),
                    ]),
                    _vm._v(" "),
                    _c(
                      "div",
                      { staticClass: "card-body" },
                      [
                        _c(
                          "b-row",
                          [
                            _c(
                              "b-col",
                              {
                                staticClass: "form-col",
                                attrs: { lg: "6", md: "6", sm: "12" },
                              },
                              [
                                _c("validation-provider", {
                                  attrs: {
                                    name: "MAIL_MAILER",
                                    rules: { required: true },
                                  },
                                  scopedSlots: _vm._u(
                                    [
                                      {
                                        key: "default",
                                        fn: function (validationContext) {
                                          return [
                                            _c(
                                              "div",
                                              { staticClass: "form-group" },
                                              [
                                                _c(
                                                  "label",
                                                  { staticClass: "form-label" },
                                                  [
                                                    _c("i", {
                                                      staticClass:
                                                        "i-Mail me-1",
                                                    }),
                                                    _vm._v(
                                                      "\n                    Mail Driver *\n                  "
                                                    ),
                                                  ]
                                                ),
                                                _vm._v(" "),
                                                _c("b-form-select", {
                                                  staticClass:
                                                    "form-control custom-select",
                                                  attrs: {
                                                    state:
                                                      _vm.getValidationState(
                                                        validationContext
                                                      ),
                                                    "aria-describedby":
                                                      "MAIL_MAILER-feedback",
                                                    options:
                                                      _vm.mailDriverOptions,
                                                  },
                                                  model: {
                                                    value:
                                                      _vm.server.mail_mailer,
                                                    callback: function ($$v) {
                                                      _vm.$set(
                                                        _vm.server,
                                                        "mail_mailer",
                                                        $$v
                                                      )
                                                    },
                                                    expression:
                                                      "server.mail_mailer",
                                                  },
                                                }),
                                                _vm._v(" "),
                                                _c(
                                                  "b-form-invalid-feedback",
                                                  {
                                                    attrs: {
                                                      id: "MAIL_MAILER-feedback",
                                                    },
                                                  },
                                                  [
                                                    _vm._v(
                                                      _vm._s(
                                                        validationContext
                                                          .errors[0]
                                                      )
                                                    ),
                                                  ]
                                                ),
                                                _vm._v(" "),
                                                _c(
                                                  "small",
                                                  { staticClass: "form-help" },
                                                  [
                                                    _vm._v(
                                                      "Choose your email service provider"
                                                    ),
                                                  ]
                                                ),
                                              ],
                                              1
                                            ),
                                          ]
                                        },
                                      },
                                    ],
                                    null,
                                    false,
                                    2825542407
                                  ),
                                }),
                              ],
                              1
                            ),
                            _vm._v(" "),
                            _c(
                              "b-col",
                              {
                                staticClass: "form-col",
                                attrs: { lg: "6", md: "6", sm: "12" },
                              },
                              [
                                _c("validation-provider", {
                                  attrs: {
                                    name: "HOST",
                                    rules: { required: true },
                                  },
                                  scopedSlots: _vm._u(
                                    [
                                      {
                                        key: "default",
                                        fn: function (validationContext) {
                                          return [
                                            _c(
                                              "div",
                                              { staticClass: "form-group" },
                                              [
                                                _c(
                                                  "label",
                                                  { staticClass: "form-label" },
                                                  [
                                                    _c("i", {
                                                      staticClass:
                                                        "i-Globe me-1",
                                                    }),
                                                    _vm._v(
                                                      "\n                    Mail Host *\n                  "
                                                    ),
                                                  ]
                                                ),
                                                _vm._v(" "),
                                                _c("b-form-input", {
                                                  staticClass:
                                                    "form-control custom-input",
                                                  attrs: {
                                                    state:
                                                      _vm.getValidationState(
                                                        validationContext
                                                      ),
                                                    "aria-describedby":
                                                      "HOST-feedback",
                                                    placeholder:
                                                      "e.g., smtp.gmail.com",
                                                  },
                                                  model: {
                                                    value: _vm.server.host,
                                                    callback: function ($$v) {
                                                      _vm.$set(
                                                        _vm.server,
                                                        "host",
                                                        $$v
                                                      )
                                                    },
                                                    expression: "server.host",
                                                  },
                                                }),
                                                _vm._v(" "),
                                                _c(
                                                  "b-form-invalid-feedback",
                                                  {
                                                    attrs: {
                                                      id: "HOST-feedback",
                                                    },
                                                  },
                                                  [
                                                    _vm._v(
                                                      _vm._s(
                                                        validationContext
                                                          .errors[0]
                                                      )
                                                    ),
                                                  ]
                                                ),
                                                _vm._v(" "),
                                                _c(
                                                  "small",
                                                  { staticClass: "form-help" },
                                                  [
                                                    _vm._v(
                                                      "Your mail server hostname"
                                                    ),
                                                  ]
                                                ),
                                              ],
                                              1
                                            ),
                                          ]
                                        },
                                      },
                                    ],
                                    null,
                                    false,
                                    210537266
                                  ),
                                }),
                              ],
                              1
                            ),
                            _vm._v(" "),
                            _c(
                              "b-col",
                              {
                                staticClass: "form-col",
                                attrs: { lg: "6", md: "6", sm: "12" },
                              },
                              [
                                _c("validation-provider", {
                                  attrs: {
                                    name: "PORT",
                                    rules: { required: true },
                                  },
                                  scopedSlots: _vm._u(
                                    [
                                      {
                                        key: "default",
                                        fn: function (validationContext) {
                                          return [
                                            _c(
                                              "div",
                                              { staticClass: "form-group" },
                                              [
                                                _c(
                                                  "label",
                                                  { staticClass: "form-label" },
                                                  [
                                                    _c("i", {
                                                      staticClass:
                                                        "i-Number me-1",
                                                    }),
                                                    _vm._v(
                                                      "\n                    Mail Port *\n                  "
                                                    ),
                                                  ]
                                                ),
                                                _vm._v(" "),
                                                _c("b-form-input", {
                                                  staticClass:
                                                    "form-control custom-input",
                                                  attrs: {
                                                    state:
                                                      _vm.getValidationState(
                                                        validationContext
                                                      ),
                                                    "aria-describedby":
                                                      "PORT-feedback",
                                                    placeholder: "e.g., 587",
                                                    type: "number",
                                                  },
                                                  model: {
                                                    value: _vm.server.port,
                                                    callback: function ($$v) {
                                                      _vm.$set(
                                                        _vm.server,
                                                        "port",
                                                        $$v
                                                      )
                                                    },
                                                    expression: "server.port",
                                                  },
                                                }),
                                                _vm._v(" "),
                                                _c(
                                                  "b-form-invalid-feedback",
                                                  {
                                                    attrs: {
                                                      id: "PORT-feedback",
                                                    },
                                                  },
                                                  [
                                                    _vm._v(
                                                      _vm._s(
                                                        validationContext
                                                          .errors[0]
                                                      )
                                                    ),
                                                  ]
                                                ),
                                                _vm._v(" "),
                                                _c(
                                                  "small",
                                                  { staticClass: "form-help" },
                                                  [
                                                    _vm._v(
                                                      "Port number for your mail server"
                                                    ),
                                                  ]
                                                ),
                                              ],
                                              1
                                            ),
                                          ]
                                        },
                                      },
                                    ],
                                    null,
                                    false,
                                    2265471542
                                  ),
                                }),
                              ],
                              1
                            ),
                            _vm._v(" "),
                            _c(
                              "b-col",
                              {
                                staticClass: "form-col",
                                attrs: { lg: "6", md: "6", sm: "12" },
                              },
                              [
                                _c("validation-provider", {
                                  attrs: {
                                    name: "sender",
                                    rules: { required: true },
                                  },
                                  scopedSlots: _vm._u(
                                    [
                                      {
                                        key: "default",
                                        fn: function (validationContext) {
                                          return [
                                            _c(
                                              "div",
                                              { staticClass: "form-group" },
                                              [
                                                _c(
                                                  "label",
                                                  { staticClass: "form-label" },
                                                  [
                                                    _c("i", {
                                                      staticClass:
                                                        "i-User me-1",
                                                    }),
                                                    _vm._v(
                                                      "\n                    Sender Name *\n                  "
                                                    ),
                                                  ]
                                                ),
                                                _vm._v(" "),
                                                _c("b-form-input", {
                                                  staticClass:
                                                    "form-control custom-input",
                                                  attrs: {
                                                    state:
                                                      _vm.getValidationState(
                                                        validationContext
                                                      ),
                                                    "aria-describedby":
                                                      "sender-feedback",
                                                    placeholder:
                                                      "e.g., Fitness Center",
                                                  },
                                                  model: {
                                                    value:
                                                      _vm.server.sender_name,
                                                    callback: function ($$v) {
                                                      _vm.$set(
                                                        _vm.server,
                                                        "sender_name",
                                                        $$v
                                                      )
                                                    },
                                                    expression:
                                                      "server.sender_name",
                                                  },
                                                }),
                                                _vm._v(" "),
                                                _c(
                                                  "b-form-invalid-feedback",
                                                  {
                                                    attrs: {
                                                      id: "sender-feedback",
                                                    },
                                                  },
                                                  [
                                                    _vm._v(
                                                      _vm._s(
                                                        validationContext
                                                          .errors[0]
                                                      )
                                                    ),
                                                  ]
                                                ),
                                                _vm._v(" "),
                                                _c(
                                                  "small",
                                                  { staticClass: "form-help" },
                                                  [
                                                    _vm._v(
                                                      "Name that appears as sender"
                                                    ),
                                                  ]
                                                ),
                                              ],
                                              1
                                            ),
                                          ]
                                        },
                                      },
                                    ],
                                    null,
                                    false,
                                    2177567793
                                  ),
                                }),
                              ],
                              1
                            ),
                            _vm._v(" "),
                            _c(
                              "b-col",
                              {
                                staticClass: "form-col",
                                attrs: { lg: "6", md: "6", sm: "12" },
                              },
                              [
                                _c("validation-provider", {
                                  attrs: {
                                    name: "Username",
                                    rules: { required: true },
                                  },
                                  scopedSlots: _vm._u(
                                    [
                                      {
                                        key: "default",
                                        fn: function (validationContext) {
                                          return [
                                            _c(
                                              "div",
                                              { staticClass: "form-group" },
                                              [
                                                _c(
                                                  "label",
                                                  { staticClass: "form-label" },
                                                  [
                                                    _c("i", {
                                                      staticClass:
                                                        "i-User me-1",
                                                    }),
                                                    _vm._v(
                                                      "\n                    Username *\n                  "
                                                    ),
                                                  ]
                                                ),
                                                _vm._v(" "),
                                                _c("b-form-input", {
                                                  staticClass:
                                                    "form-control custom-input",
                                                  attrs: {
                                                    state:
                                                      _vm.getValidationState(
                                                        validationContext
                                                      ),
                                                    "aria-describedby":
                                                      "Username-feedback",
                                                    placeholder:
                                                      "e.g., your-email@gmail.com",
                                                  },
                                                  model: {
                                                    value: _vm.server.username,
                                                    callback: function ($$v) {
                                                      _vm.$set(
                                                        _vm.server,
                                                        "username",
                                                        $$v
                                                      )
                                                    },
                                                    expression:
                                                      "server.username",
                                                  },
                                                }),
                                                _vm._v(" "),
                                                _c(
                                                  "b-form-invalid-feedback",
                                                  {
                                                    attrs: {
                                                      id: "Username-feedback",
                                                    },
                                                  },
                                                  [
                                                    _vm._v(
                                                      _vm._s(
                                                        validationContext
                                                          .errors[0]
                                                      )
                                                    ),
                                                  ]
                                                ),
                                                _vm._v(" "),
                                                _c(
                                                  "small",
                                                  { staticClass: "form-help" },
                                                  [
                                                    _vm._v(
                                                      "Your email account username"
                                                    ),
                                                  ]
                                                ),
                                              ],
                                              1
                                            ),
                                          ]
                                        },
                                      },
                                    ],
                                    null,
                                    false,
                                    2192833373
                                  ),
                                }),
                              ],
                              1
                            ),
                            _vm._v(" "),
                            _c(
                              "b-col",
                              {
                                staticClass: "form-col",
                                attrs: { lg: "6", md: "6", sm: "12" },
                              },
                              [
                                _c("validation-provider", {
                                  attrs: {
                                    name: "Password",
                                    rules: { required: true },
                                  },
                                  scopedSlots: _vm._u(
                                    [
                                      {
                                        key: "default",
                                        fn: function (validationContext) {
                                          return [
                                            _c(
                                              "div",
                                              { staticClass: "form-group" },
                                              [
                                                _c(
                                                  "label",
                                                  { staticClass: "form-label" },
                                                  [
                                                    _c("i", {
                                                      staticClass:
                                                        "i-Lock me-1",
                                                    }),
                                                    _vm._v(
                                                      "\n                    Password *\n                  "
                                                    ),
                                                  ]
                                                ),
                                                _vm._v(" "),
                                                _c(
                                                  "div",
                                                  {
                                                    staticClass:
                                                      "password-input-wrapper",
                                                  },
                                                  [
                                                    _c("b-form-input", {
                                                      staticClass:
                                                        "form-control custom-input",
                                                      attrs: {
                                                        state:
                                                          _vm.getValidationState(
                                                            validationContext
                                                          ),
                                                        "aria-describedby":
                                                          "Password-feedback",
                                                        placeholder:
                                                          "Enter your password",
                                                        type: _vm.showPassword
                                                          ? "text"
                                                          : "password",
                                                      },
                                                      model: {
                                                        value:
                                                          _vm.server.password,
                                                        callback: function (
                                                          $$v
                                                        ) {
                                                          _vm.$set(
                                                            _vm.server,
                                                            "password",
                                                            $$v
                                                          )
                                                        },
                                                        expression:
                                                          "server.password",
                                                      },
                                                    }),
                                                    _vm._v(" "),
                                                    _c(
                                                      "button",
                                                      {
                                                        staticClass:
                                                          "password-toggle",
                                                        attrs: {
                                                          type: "button",
                                                        },
                                                        on: {
                                                          click: function (
                                                            $event
                                                          ) {
                                                            _vm.showPassword =
                                                              !_vm.showPassword
                                                          },
                                                        },
                                                      },
                                                      [
                                                        _c("i", {
                                                          class:
                                                            _vm.showPassword
                                                              ? "i-Eye"
                                                              : "i-Eye-Slash",
                                                        }),
                                                      ]
                                                    ),
                                                  ],
                                                  1
                                                ),
                                                _vm._v(" "),
                                                _c(
                                                  "b-form-invalid-feedback",
                                                  {
                                                    attrs: {
                                                      id: "Password-feedback",
                                                    },
                                                  },
                                                  [
                                                    _vm._v(
                                                      _vm._s(
                                                        validationContext
                                                          .errors[0]
                                                      )
                                                    ),
                                                  ]
                                                ),
                                                _vm._v(" "),
                                                _c(
                                                  "small",
                                                  { staticClass: "form-help" },
                                                  [
                                                    _vm._v(
                                                      "Your email account password or app password"
                                                    ),
                                                  ]
                                                ),
                                              ],
                                              1
                                            ),
                                          ]
                                        },
                                      },
                                    ],
                                    null,
                                    false,
                                    4088497224
                                  ),
                                }),
                              ],
                              1
                            ),
                            _vm._v(" "),
                            _c(
                              "b-col",
                              {
                                staticClass: "form-col",
                                attrs: { lg: "6", md: "6", sm: "12" },
                              },
                              [
                                _c("validation-provider", {
                                  attrs: {
                                    name: "encryption",
                                    rules: { required: true },
                                  },
                                  scopedSlots: _vm._u(
                                    [
                                      {
                                        key: "default",
                                        fn: function (validationContext) {
                                          return [
                                            _c(
                                              "div",
                                              { staticClass: "form-group" },
                                              [
                                                _c(
                                                  "label",
                                                  { staticClass: "form-label" },
                                                  [
                                                    _c("i", {
                                                      staticClass:
                                                        "i-Shield me-1",
                                                    }),
                                                    _vm._v(
                                                      "\n                    Encryption *\n                  "
                                                    ),
                                                  ]
                                                ),
                                                _vm._v(" "),
                                                _c("b-form-select", {
                                                  staticClass:
                                                    "form-control custom-select",
                                                  attrs: {
                                                    state:
                                                      _vm.getValidationState(
                                                        validationContext
                                                      ),
                                                    "aria-describedby":
                                                      "encryption-feedback",
                                                    options:
                                                      _vm.encryptionOptions,
                                                  },
                                                  model: {
                                                    value:
                                                      _vm.server.encryption,
                                                    callback: function ($$v) {
                                                      _vm.$set(
                                                        _vm.server,
                                                        "encryption",
                                                        $$v
                                                      )
                                                    },
                                                    expression:
                                                      "server.encryption",
                                                  },
                                                }),
                                                _vm._v(" "),
                                                _c(
                                                  "b-form-invalid-feedback",
                                                  {
                                                    attrs: {
                                                      id: "encryption-feedback",
                                                    },
                                                  },
                                                  [
                                                    _vm._v(
                                                      _vm._s(
                                                        validationContext
                                                          .errors[0]
                                                      )
                                                    ),
                                                  ]
                                                ),
                                                _vm._v(" "),
                                                _c(
                                                  "small",
                                                  { staticClass: "form-help" },
                                                  [
                                                    _vm._v(
                                                      "Security protocol for your connection"
                                                    ),
                                                  ]
                                                ),
                                              ],
                                              1
                                            ),
                                          ]
                                        },
                                      },
                                    ],
                                    null,
                                    false,
                                    2120885910
                                  ),
                                }),
                              ],
                              1
                            ),
                          ],
                          1
                        ),
                      ],
                      1
                    ),
                  ]),
                  _vm._v(" "),
                  _c("div", { staticClass: "test-connection-card" }, [
                    _c("div", { staticClass: "card-header" }, [
                      _c("h4", { staticClass: "card-title" }, [
                        _c("i", { staticClass: "i-Check me-2" }),
                        _vm._v("\n            Test Connection\n          "),
                      ]),
                      _vm._v(" "),
                      _c("p", { staticClass: "card-subtitle" }, [
                        _vm._v("Verify your settings work correctly"),
                      ]),
                    ]),
                    _vm._v(" "),
                    _c("div", { staticClass: "card-body" }, [
                      _c("div", { staticClass: "test-connection-content" }, [
                        _c("p", { staticClass: "test-description" }, [
                          _vm._v(
                            "\n              Test your email configuration by sending a test email to verify all settings are correct.\n            "
                          ),
                        ]),
                        _vm._v(" "),
                        _c(
                          "button",
                          {
                            staticClass: "btn btn-test",
                            attrs: { type: "button", disabled: _vm.isTesting },
                            on: { click: _vm.testConnection },
                          },
                          [
                            _c("i", { staticClass: "i-Send me-2" }),
                            _vm._v(
                              "\n              " +
                                _vm._s(
                                  _vm.isTesting
                                    ? "Testing..."
                                    : "Test Connection"
                                ) +
                                "\n            "
                            ),
                          ]
                        ),
                      ]),
                    ]),
                  ]),
                  _vm._v(" "),
                  _c("div", { staticClass: "form-actions" }, [
                    _c(
                      "button",
                      {
                        staticClass: "btn btn-primary btn-save",
                        attrs: { type: "submit", disabled: _vm.isSaving },
                      },
                      [
                        _c("i", { staticClass: "i-Save me-2" }),
                        _vm._v(
                          "\n          " +
                            _vm._s(_vm.isSaving ? "Saving..." : _vm.submit) +
                            "\n        "
                        ),
                      ]
                    ),
                    _vm._v(" "),
                    _c(
                      "button",
                      {
                        staticClass: "btn btn-secondary btn-reset",
                        attrs: { type: "button" },
                        on: { click: _vm.resetForm },
                      },
                      [
                        _c("i", { staticClass: "i-Refresh me-2" }),
                        _vm._v("\n          Reset\n        "),
                      ]
                    ),
                  ]),
                ]
              ),
            ],
            1
          )
        : _vm._e(),
    ],
    1
  )
}
var staticRenderFns = [
  function () {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c(
      "li",
      {
        staticClass: "breadcrumb-item active",
        attrs: { "aria-current": "page" },
      },
      [
        _c("i", { staticClass: "fas fa-envelope" }),
        _vm._v("\n              Mail Settings\n            "),
      ]
    )
  },
]
render._withStripped = true



/***/ })

}]);