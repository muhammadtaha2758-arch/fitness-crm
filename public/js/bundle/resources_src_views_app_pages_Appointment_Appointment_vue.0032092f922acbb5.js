"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["resources_src_views_app_pages_Appointment_Appointment_vue"],{

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/Appointment/Appointment.vue?vue&type=script&lang=js":
/*!***********************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/Appointment/Appointment.vue?vue&type=script&lang=js ***!
  \***********************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var vue_cal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue-cal */ "./node_modules/vue-cal/dist/vue-cal.es.js");
/* harmony import */ var vue_cal_dist_vuecal_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! vue-cal/dist/vuecal.css */ "./node_modules/vue-cal/dist/vuecal.css");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! axios */ "./node_modules/axios/index.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_2__);
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
  components: {
    VueCal: vue_cal__WEBPACK_IMPORTED_MODULE_0__["default"]
  },
  data: function data() {
    return {
      showModal: false,
      isEditing: false,
      appointmentDate: '',
      appointmentStartTime: '',
      appointmentEndTime: '',
      workoutType: '',
      selectedStaffName: '',
      selectedClientName: '',
      appointments: [],
      allStaffSelected: false,
      staff: [],
      clients: [],
      events: [],
      searchQuery: '',
      loading: false,
      saving: false,
      // Add saving state for form submission
      workouts: [{
        id: 1,
        label: 'Cardio'
      }, {
        id: 2,
        label: 'Strength'
      }, {
        id: 3,
        label: 'Yoga'
      }, {
        id: 4,
        label: 'HIIT'
      }, {
        id: 5,
        label: 'Pilates'
      }, {
        id: 6,
        label: 'Crossfit'
      }],
      selectedStaffId: '',
      selectedClientId: '',
      editingEventId: null,
      currentAppointmentRating: null,
      currentAppointmentStatus: ''
    };
  },
  methods: {
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
    handleCellClick: function handleCellClick(date) {
      var clickedDate = date !== null && date !== void 0 && date.start ? new Date(date.start) : new Date(date);
      if (isNaN(clickedDate)) {
        return;
      }

      // Fix timezone issue by using local date methods
      this.appointmentDate = clickedDate.getFullYear() + '-' + String(clickedDate.getMonth() + 1).padStart(2, '0') + '-' + String(clickedDate.getDate()).padStart(2, '0');
      var hour = clickedDate.getHours();
      this.appointmentStartTime = "".concat(hour.toString().padStart(2, '0'), ":00");
      this.appointmentEndTime = "".concat((hour + 1).toString().padStart(2, '0'), ":00");
      this.showModal = true;
    },
    handleEventClick: function handleEventClick(event) {
      this.isEditing = true;
      this.editingEventId = event.id; // Store the event ID for editing

      // Populate form fields from the event
      // Fix timezone issue by using local date methods
      var startDate = new Date(event.start);
      var endDate = new Date(event.end);
      this.appointmentDate = startDate.getFullYear() + '-' + String(startDate.getMonth() + 1).padStart(2, '0') + '-' + String(startDate.getDate()).padStart(2, '0');
      this.appointmentStartTime = String(startDate.getHours()).padStart(2, '0') + ':' + String(startDate.getMinutes()).padStart(2, '0');
      this.appointmentEndTime = String(endDate.getHours()).padStart(2, '0') + ':' + String(endDate.getMinutes()).padStart(2, '0');

      // Set the dropdown values using the IDs
      this.selectedClientId = event.client_id || '';
      this.selectedStaffId = event.staff_id || '';
      this.workoutType = event.workout_id || '';

      // Capture rating and status from event
      this.currentAppointmentRating = event.rating || null;
      this.currentAppointmentStatus = event.status || '';
      this.showModal = true;
    },
    addEventClickListeners: function addEventClickListeners() {
      // This method is no longer needed as we're using Vue-Cal's built-in event handling
    },
    saveAppointment: function saveAppointment() {
      var _this = this;
      return _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
        var staffId, clientId, workoutId, appointmentData, response, errorMessage, _error$response$data, _error$response$data2, validationErrors, errorList;
        return _regeneratorRuntime().wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              // Set saving state to prevent multiple submissions
              _this.saving = true;

              // Validate required fields
              if (!(!_this.appointmentDate || !_this.appointmentStartTime || !_this.appointmentEndTime || !_this.selectedStaffId || !_this.selectedClientId || !_this.workoutType)) {
                _context.next = 6;
                break;
              }
              _this.$bvToast.toast('Please fill in all required fields', {
                title: 'Validation Error',
                variant: 'warning',
                solid: true
              });
              _this.saving = false;
              return _context.abrupt("return");
            case 6:
              // Convert to integers and validate
              staffId = parseInt(_this.selectedStaffId, 10);
              clientId = parseInt(_this.selectedClientId, 10);
              workoutId = parseInt(_this.workoutType, 10); // Check if conversions resulted in valid numbers
              if (!(isNaN(staffId) || isNaN(clientId) || isNaN(workoutId))) {
                _context.next = 13;
                break;
              }
              _this.$bvToast.toast('Invalid selection. Please select valid options.', {
                title: 'Validation Error',
                variant: 'warning',
                solid: true
              });
              _this.saving = false;
              return _context.abrupt("return");
            case 13:
              appointmentData = {
                date: _this.appointmentDate,
                start_time: _this.appointmentStartTime,
                end_time: _this.appointmentEndTime,
                staff_id: staffId,
                client_id: clientId,
                workout_id: workoutId
              };
              if (!(_this.isEditing && _this.editingEventId)) {
                _context.next = 20;
                break;
              }
              _context.next = 17;
              return axios__WEBPACK_IMPORTED_MODULE_2___default().put("/appointments/".concat(_this.editingEventId), appointmentData);
            case 17:
              response = _context.sent;
              _context.next = 23;
              break;
            case 20:
              _context.next = 22;
              return axios__WEBPACK_IMPORTED_MODULE_2___default().post('/appointments', appointmentData);
            case 22:
              response = _context.sent;
            case 23:
              if (!response.data.success) {
                _context.next = 33;
                break;
              }
              _context.next = 26;
              return _this.loadAppointments();
            case 26:
              // Force calendar refresh by updating events
              if (_this.$refs.vuecal) {
                // VueCal doesn't have a refresh method, but we can force a re-render
                // by using Vue's reactivity system
                _this.$forceUpdate();
              }
              _this.$bvToast.toast("Appointment ".concat(_this.isEditing ? 'updated' : 'saved', " successfully!"), {
                title: 'Success',
                variant: 'success',
                solid: true
              });
              _this.closeModal();
              _this.isEditing = false;
              _this.editingEventId = null;
              _context.next = 34;
              break;
            case 33:
              _this.$bvToast.toast("Backend error: ".concat(response.data.message || 'Unknown error'), {
                title: 'Error',
                variant: 'danger',
                solid: true
              });
            case 34:
              _context.next = 41;
              break;
            case 36:
              _context.prev = 36;
              _context.t0 = _context["catch"](0);
              // Provide more specific error messages
              errorMessage = 'Unknown error occurred';
              if (_context.t0.response) {
                // Server responded with error status
                if (_context.t0.response.status === 422) {
                  // Validation error - show detailed validation errors
                  validationErrors = (_error$response$data = _context.t0.response.data) === null || _error$response$data === void 0 ? void 0 : _error$response$data.errors;
                  if (validationErrors) {
                    errorList = Object.keys(validationErrors).map(function (key) {
                      return validationErrors[key].join(', ');
                    }).join('; ');
                    errorMessage = "Validation error: ".concat(errorList);
                  } else if ((_error$response$data2 = _context.t0.response.data) !== null && _error$response$data2 !== void 0 && _error$response$data2.message) {
                    errorMessage = _context.t0.response.data.message;
                  } else {
                    errorMessage = 'Validation error: Please check your input';
                  }
                } else if (_context.t0.response.data && _context.t0.response.data.message) {
                  errorMessage = _context.t0.response.data.message;
                } else if (_context.t0.response.status === 500) {
                  errorMessage = 'Server error: Please try again later';
                } else {
                  errorMessage = "Server error (".concat(_context.t0.response.status, ")");
                }
              } else if (_context.t0.request) {
                // Request was made but no response received
                errorMessage = 'Network error: Please check your connection';
              } else {
                // Something else happened
                errorMessage = _context.t0.message || 'Unknown error occurred';
              }
              _this.$bvToast.toast("Failed to ".concat(_this.isEditing ? 'update' : 'save', " appointment: ").concat(errorMessage), {
                title: 'Error',
                variant: 'danger',
                solid: true,
                autoHideDelay: 5000
              });
            case 41:
              _context.prev = 41;
              // Always reset saving state
              _this.saving = false;
              return _context.finish(41);
            case 44:
            case "end":
              return _context.stop();
          }
        }, _callee, null, [[0, 36, 41, 44]]);
      }))();
    },
    loadClients: function loadClients() {
      var _this2 = this;
      return _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee2() {
        var response;
        return _regeneratorRuntime().wrap(function _callee2$(_context2) {
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
              _context2.prev = 0;
              _context2.next = 3;
              return axios__WEBPACK_IMPORTED_MODULE_2___default().get('/appointments/clients');
            case 3:
              response = _context2.sent;
              if (response.data.success) {
                _this2.clients = response.data.data;
              }
              _context2.next = 9;
              break;
            case 7:
              _context2.prev = 7;
              _context2.t0 = _context2["catch"](0);
            case 9:
            case "end":
              return _context2.stop();
          }
        }, _callee2, null, [[0, 7]]);
      }))();
    },
    loadStaff: function loadStaff() {
      var _this3 = this;
      return _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee3() {
        var response;
        return _regeneratorRuntime().wrap(function _callee3$(_context3) {
          while (1) switch (_context3.prev = _context3.next) {
            case 0:
              _context3.prev = 0;
              _context3.next = 3;
              return axios__WEBPACK_IMPORTED_MODULE_2___default().get('/appointments/staff');
            case 3:
              response = _context3.sent;
              if (response.data.success) {
                _this3.staff = response.data.data || [];

                // Log for debugging
                if (_this3.staff.length === 0) {
                  console.warn('No staff/coaches found. Check database and gym_id filter.');
                } else {
                  console.log("Loaded ".concat(_this3.staff.length, " staff/coaches"));
                }
              } else {
                _this3.$bvToast.toast(response.data.message || 'Failed to load staff', {
                  title: 'Error',
                  variant: 'warning',
                  solid: true
                });
              }
              _context3.next = 11;
              break;
            case 7:
              _context3.prev = 7;
              _context3.t0 = _context3["catch"](0);
              console.error('Error loading staff:', _context3.t0);
              _this3.$bvToast.toast('Failed to load coaches. Please try refreshing the page.', {
                title: 'Error',
                variant: 'danger',
                solid: true
              });
            case 11:
            case "end":
              return _context3.stop();
          }
        }, _callee3, null, [[0, 7]]);
      }))();
    },
    loadAppointments: function loadAppointments() {
      var _this4 = this;
      return _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee4() {
        var response;
        return _regeneratorRuntime().wrap(function _callee4$(_context4) {
          while (1) switch (_context4.prev = _context4.next) {
            case 0:
              _this4.loading = true;
              _context4.prev = 1;
              _context4.next = 4;
              return axios__WEBPACK_IMPORTED_MODULE_2___default().get('/appointments');
            case 4:
              response = _context4.sent;
              if (response.data.success) {
                // Clear existing events
                _this4.events = [];

                // Process each appointment
                response.data.data.forEach(function (appointment) {
                  // Handle different possible date field names
                  var startDate, endDate;
                  if (appointment.start && appointment.end) {
                    // If start/end fields exist
                    startDate = new Date(appointment.start);
                    endDate = new Date(appointment.end);
                  } else if (appointment.start_time && appointment.end_time) {
                    // If start_time/end_time fields exist
                    var dateStr = appointment.date || new Date().toISOString().split('T')[0];
                    startDate = new Date("".concat(dateStr, "T").concat(appointment.start_time));
                    endDate = new Date("".concat(dateStr, "T").concat(appointment.end_time));
                  } else if (appointment.date && appointment.start_time && appointment.end_time) {
                    // If separate date, start_time, end_time fields exist
                    startDate = new Date("".concat(appointment.date, "T").concat(appointment.start_time));
                    endDate = new Date("".concat(appointment.date, "T").concat(appointment.end_time));
                  } else {
                    return; // Skip this appointment
                  }

                  // Validate dates
                  if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
                    return; // Skip this appointment
                  }

                  // Find staff and client names
                  var staffObj = _this4.staff.find(function (s) {
                    return s.id == appointment.staff_id || s.id == appointment.coach_id;
                  });
                  var clientObj = _this4.clients.find(function (c) {
                    return c.id == appointment.client_id || c.id == appointment.member_id;
                  });

                  // Use title from backend (which includes rating if available), or build our own
                  var eventTitle = appointment.title || "".concat(clientObj ? clientObj.name : 'Unknown Client', " - ").concat(_this4.getWorkoutTypeLabel(appointment.workout_id));
                  var event = {
                    id: appointment.id,
                    start: startDate,
                    end: endDate,
                    title: eventTitle,
                    client_id: appointment.client_id || appointment.member_id,
                    staff_id: appointment.staff_id || appointment.coach_id,
                    workout_id: appointment.workout_id,
                    status: appointment.status || '',
                    rating: appointment.rating || null,
                    notes: appointment.notes || '',
                    appointment_data: appointment
                  };
                  _this4.events.push(event);
                });
              }
              _context4.next = 10;
              break;
            case 8:
              _context4.prev = 8;
              _context4.t0 = _context4["catch"](1);
            case 10:
              _context4.prev = 10;
              _this4.loading = false;
              return _context4.finish(10);
            case 13:
            case "end":
              return _context4.stop();
          }
        }, _callee4, null, [[1, 8, 10, 13]]);
      }))();
    },
    getWorkoutTypeLabel: function getWorkoutTypeLabel(workoutTypeId) {
      var workout = this.workouts.find(function (w) {
        return w.id == workoutTypeId;
      });
      return workout ? workout.label : 'Unknown';
    },
    closeModal: function closeModal() {
      this.showModal = false;
      this.isEditing = false;
      this.editingEventId = null;
      this.appointmentDate = '';
      this.appointmentStartTime = '';
      this.appointmentEndTime = '';
      this.selectedStaffId = '';
      this.selectedClientId = '';
      this.workoutType = '';
      this.currentAppointmentRating = null;
      this.currentAppointmentStatus = '';
    },
    // Add a manual refresh method
    refreshCalendar: function refreshCalendar() {
      var _this5 = this;
      return _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee5() {
        return _regeneratorRuntime().wrap(function _callee5$(_context5) {
          while (1) switch (_context5.prev = _context5.next) {
            case 0:
              _context5.next = 2;
              return _this5.loadAppointments();
            case 2:
              if (_this5.$refs.vuecal) {
                // VueCal doesn't have a refresh method, but we can force a re-render
                // by using Vue's reactivity system
                _this5.$forceUpdate();
              }
            case 3:
            case "end":
              return _context5.stop();
          }
        }, _callee5);
      }))();
    }
  },
  mounted: function mounted() {
    var _this6 = this;
    return _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee6() {
      return _regeneratorRuntime().wrap(function _callee6$(_context6) {
        while (1) switch (_context6.prev = _context6.next) {
          case 0:
            _context6.prev = 0;
            _context6.next = 3;
            return _this6.loadClients();
          case 3:
            _context6.next = 5;
            return _this6.loadStaff();
          case 5:
            _context6.next = 7;
            return _this6.loadAppointments();
          case 7:
            // Force calendar refresh after all data is loaded
            _this6.$nextTick(function () {
              if (_this6.$refs.vuecal) {
                // VueCal doesn't have a refresh method, but we can force a re-render
                // by using Vue's reactivity system
                _this6.$forceUpdate();
              }
            });
            _context6.next = 12;
            break;
          case 10:
            _context6.prev = 10;
            _context6.t0 = _context6["catch"](0);
          case 12:
          case "end":
            return _context6.stop();
        }
      }, _callee6, null, [[0, 10]]);
    }))();
  },
  // Add error boundary for better debugging
  errorCaptured: function errorCaptured(err, vm, info) {
    return false; // Prevent error from propagating
  },
  updated: function updated() {
    // Vue-Cal should handle event clicks automatically
  }
});

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js??clonedRuleSet-12.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12.use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-12.use[3]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/Appointment/Appointment.vue?vue&type=style&index=0&id=22db5e22&lang=scss&scoped=true":
/*!**************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??clonedRuleSet-12.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12.use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-12.use[3]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/Appointment/Appointment.vue?vue&type=style&index=0&id=22db5e22&lang=scss&scoped=true ***!
  \**************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
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
___CSS_LOADER_EXPORT___.push([module.id, "@charset \"UTF-8\";\n.filter-btn .btn[data-v-22db5e22],\n.filter-btn .btn-secondary[data-v-22db5e22],\n.filter-btn .btn-outline-secondary[data-v-22db5e22],\n.filter-btn button.btn[data-v-22db5e22],\n.filter-btn button.btn-secondary[data-v-22db5e22] {\n  color: #000 !important;\n  background-color: transparent !important;\n  border-color: #6c757d !important;\n}\n.filter-btn .btn[data-v-22db5e22]:hover,\n.filter-btn .btn-secondary[data-v-22db5e22]:hover,\n.filter-btn .btn-outline-secondary[data-v-22db5e22]:hover,\n.filter-btn button.btn[data-v-22db5e22]:hover,\n.filter-btn button.btn-secondary[data-v-22db5e22]:hover {\n  color: #dc3545 !important;\n  background-color: transparent !important;\n  border-color: #dc3545 !important;\n  box-shadow: none !important;\n}\n.filter-btn .btn[data-v-22db5e22]:focus,\n.filter-btn .btn-secondary[data-v-22db5e22]:focus,\n.filter-btn .btn-outline-secondary[data-v-22db5e22]:focus,\n.filter-btn button.btn[data-v-22db5e22]:focus,\n.filter-btn button.btn-secondary[data-v-22db5e22]:focus {\n  color: #dc3545 !important;\n  background-color: transparent !important;\n  border-color: #dc3545 !important;\n  box-shadow: none !important;\n}\n.filter-btn .btn[data-v-22db5e22]:active,\n.filter-btn .btn-secondary[data-v-22db5e22]:active,\n.filter-btn .btn-outline-secondary[data-v-22db5e22]:active,\n.filter-btn button.btn[data-v-22db5e22]:active,\n.filter-btn button.btn-secondary[data-v-22db5e22]:active {\n  color: #dc3545 !important;\n  background-color: transparent !important;\n  border-color: #dc3545 !important;\n}\n.btn-secondary[data-v-22db5e22]:not(:disabled):not(.disabled):active:focus {\n  box-shadow: none !important;\n}\n\n/* ===========================================\n   COMMON BREADCRUMB NAVIGATION STYLES\n   =========================================== */\n.breadcrumb-nav-row[data-v-22db5e22] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  margin-bottom: 0.5rem;\n  gap: 0.5rem;\n}\n.breadcrumb-section[data-v-22db5e22] {\n  flex: 1;\n}\n.breadcrumb-section .breadcrumb-nav .breadcrumb-container[data-v-22db5e22] {\n  display: flex;\n  align-items: center;\n  gap: 1rem;\n}\n.breadcrumb-section .breadcrumb-nav .breadcrumb-container .back-button[data-v-22db5e22] {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  width: 40px;\n  height: 40px;\n  background: rgba(255, 255, 255, 0.1);\n  border: 1px solid rgba(255, 255, 255, 0.2);\n  border-radius: 8px;\n  color: #ffffff;\n  cursor: pointer;\n  transition: all 0.3s ease;\n}\n.breadcrumb-section .breadcrumb-nav .breadcrumb-container .back-button[data-v-22db5e22]:hover {\n  background: rgba(255, 255, 255, 0.15);\n  border-color: rgba(255, 255, 255, 0.3);\n  transform: translateY(-1px);\n  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);\n  color: #dc3545;\n}\n.breadcrumb-section .breadcrumb-nav .breadcrumb-container .back-button i[data-v-22db5e22] {\n  font-size: 1.1em;\n}\n.breadcrumb-section .breadcrumb-nav .breadcrumb-container .breadcrumb[data-v-22db5e22] {\n  display: flex;\n  align-items: center;\n  gap: 0.5rem;\n  margin: 0;\n  padding: 0;\n  background: none;\n  border-radius: 0;\n}\n.breadcrumb-section .breadcrumb-nav .breadcrumb-container .breadcrumb .breadcrumb-item[data-v-22db5e22] {\n  display: flex;\n  align-items: center;\n  gap: 0.5rem;\n  font-size: 0.875rem;\n  color: #ffffff;\n}\n.breadcrumb-section .breadcrumb-nav .breadcrumb-container .breadcrumb .breadcrumb-item.active[data-v-22db5e22] {\n  color: #252525;\n  font-weight: 600;\n}\n.breadcrumb-section .breadcrumb-nav .breadcrumb-container .breadcrumb .breadcrumb-item.active i[data-v-22db5e22] {\n  color: #dc3545;\n}\n.breadcrumb-section .breadcrumb-nav .breadcrumb-container .breadcrumb .breadcrumb-item a[data-v-22db5e22] {\n  display: flex;\n  align-items: center;\n  gap: 0.5rem;\n  color: #6a6a6a;\n  text-decoration: none;\n  transition: color 0.3s ease;\n}\n.breadcrumb-section .breadcrumb-nav .breadcrumb-container .breadcrumb .breadcrumb-item a[data-v-22db5e22]:hover {\n  color: #dc3545;\n}\n.breadcrumb-section .breadcrumb-nav .breadcrumb-container .breadcrumb .breadcrumb-item a:hover i[data-v-22db5e22] {\n  color: #dc3545;\n}\n.breadcrumb-section .breadcrumb-nav .breadcrumb-container .breadcrumb .breadcrumb-item a i[data-v-22db5e22] {\n  font-size: 0.9em;\n  transition: color 0.3s ease;\n}\n.breadcrumb-section .breadcrumb-nav .breadcrumb-container .breadcrumb .breadcrumb-item[data-v-22db5e22]:not(:last-child)::after {\n  content: \"›\";\n  margin-left: 0.5rem;\n  color: #6a6a6a;\n  font-size: 1.2em;\n}\n.action-section[data-v-22db5e22] {\n  display: flex;\n  align-items: center;\n}\n.action-section .action-btn[data-v-22db5e22] {\n  display: flex;\n  align-items: center;\n  gap: 0.5rem;\n  padding: 0.5rem 1rem;\n  border-radius: 8px;\n  font-size: 0.875rem;\n  font-weight: 500;\n  transition: all 0.3s ease;\n}\n.action-section .action-btn[data-v-22db5e22]:hover:not(:disabled) {\n  transform: translateY(-1px);\n  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);\n}\n.action-section .action-btn[data-v-22db5e22]:disabled {\n  opacity: 0.6;\n  cursor: not-allowed;\n}\n.action-section .action-btn i[data-v-22db5e22] {\n  font-size: 0.9em;\n}\n@media (max-width: 768px) {\n.breadcrumb-nav-row[data-v-22db5e22] {\n    flex-direction: column;\n    align-items: flex-start;\n    gap: 0.5rem;\n}\n.breadcrumb-section[data-v-22db5e22] {\n    width: 100%;\n}\n.breadcrumb-section .breadcrumb-container[data-v-22db5e22] {\n    flex-direction: column;\n    align-items: flex-start;\n    gap: 0.5rem;\n}\n.breadcrumb-section .breadcrumb-container .breadcrumb[data-v-22db5e22] {\n    flex-wrap: wrap;\n}\n.breadcrumb-section .breadcrumb-container .breadcrumb .breadcrumb-item[data-v-22db5e22] {\n    font-size: 0.8rem;\n}\n.breadcrumb-section .breadcrumb-container .breadcrumb .breadcrumb-item a[data-v-22db5e22] {\n    font-size: 0.8rem;\n}\n.action-section[data-v-22db5e22] {\n    width: 100%;\n    justify-content: flex-end;\n}\n.action-section .action-btn[data-v-22db5e22] {\n    font-size: 0.8rem;\n    padding: 0.4rem 0.8rem;\n}\n}\n/* ===========================================\n   RESPONSIVE UTILITY CLASSES (ALL DEVICES)\n   =========================================== */\n.show-xs-only[data-v-22db5e22],\n.show-sm-only[data-v-22db5e22],\n.show-md-only[data-v-22db5e22],\n.show-lg-only[data-v-22db5e22],\n.show-xl-only[data-v-22db5e22] {\n  display: none !important;\n}\n@media (max-width: 575px) {\n.hide-xs[data-v-22db5e22] {\n    display: none !important;\n}\n.show-xs-only[data-v-22db5e22] {\n    display: initial !important;\n}\n}\n@media (min-width: 576px) and (max-width: 767px) {\n.hide-sm[data-v-22db5e22] {\n    display: none !important;\n}\n.show-sm-only[data-v-22db5e22] {\n    display: initial !important;\n}\n}\n@media (min-width: 768px) and (max-width: 991px) {\n.hide-md[data-v-22db5e22] {\n    display: none !important;\n}\n.show-md-only[data-v-22db5e22] {\n    display: initial !important;\n}\n}\n@media (min-width: 992px) and (max-width: 1199px) {\n.hide-lg[data-v-22db5e22] {\n    display: none !important;\n}\n.show-lg-only[data-v-22db5e22] {\n    display: initial !important;\n}\n}\n@media (min-width: 1200px) {\n.hide-xl[data-v-22db5e22] {\n    display: none !important;\n}\n.show-xl-only[data-v-22db5e22] {\n    display: initial !important;\n}\n}\n@media (max-width: 576px) {\n.hide-sm-down[data-v-22db5e22] {\n    display: none !important;\n}\n}\n@media (max-width: 768px) {\n.hide-md-down[data-v-22db5e22] {\n    display: none !important;\n}\n}\n@media (max-width: 992px) {\n.hide-lg-down[data-v-22db5e22] {\n    display: none !important;\n}\n}\n@media (min-width: 576px) {\n.hide-sm-up[data-v-22db5e22] {\n    display: none !important;\n}\n}\n@media (min-width: 768px) {\n.hide-md-up[data-v-22db5e22] {\n    display: none !important;\n}\n}\n@media (min-width: 992px) {\n.hide-lg-up[data-v-22db5e22] {\n    display: none !important;\n}\n}\n@media (max-width: 575px) {\n.d-xs-none[data-v-22db5e22] {\n    display: none !important;\n}\n.d-xs-block[data-v-22db5e22] {\n    display: block !important;\n}\n.d-xs-flex[data-v-22db5e22] {\n    display: flex !important;\n}\n}\n@media (min-width: 576px) and (max-width: 767px) {\n.d-sm-none[data-v-22db5e22] {\n    display: none !important;\n}\n.d-sm-block[data-v-22db5e22] {\n    display: block !important;\n}\n.d-sm-flex[data-v-22db5e22] {\n    display: flex !important;\n}\n}\n@media (min-width: 768px) and (max-width: 991px) {\n.d-md-none[data-v-22db5e22] {\n    display: none !important;\n}\n.d-md-block[data-v-22db5e22] {\n    display: block !important;\n}\n.d-md-flex[data-v-22db5e22] {\n    display: flex !important;\n}\n}\n@media (min-width: 992px) and (max-width: 1199px) {\n.d-lg-none[data-v-22db5e22] {\n    display: none !important;\n}\n.d-lg-block[data-v-22db5e22] {\n    display: block !important;\n}\n.d-lg-flex[data-v-22db5e22] {\n    display: flex !important;\n}\n}\n@media (min-width: 1200px) {\n.d-xl-none[data-v-22db5e22] {\n    display: none !important;\n}\n.d-xl-block[data-v-22db5e22] {\n    display: block !important;\n}\n.d-xl-flex[data-v-22db5e22] {\n    display: flex !important;\n}\n}\n@media (min-width: 576px) {\n.custom-modal-xl[data-v-22db5e22] {\n    max-width: 1500px !important;\n}\n}\n/* ===========================================\n   BREADCRUMB NAVIGATION STYLES\n   =========================================== */\n.breadcrumb-nav-row[data-v-22db5e22] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  margin-bottom: 1.5rem;\n  padding: 1rem 0;\n  gap: 1rem;\n}\n.breadcrumb-section[data-v-22db5e22] {\n  flex: 1;\n}\n.breadcrumb-section .breadcrumb-nav .breadcrumb-container[data-v-22db5e22] {\n  display: flex;\n  align-items: center;\n  gap: 1rem;\n}\n.breadcrumb-section .breadcrumb-nav .breadcrumb-container .back-button[data-v-22db5e22] {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  width: 40px;\n  height: 40px;\n  background: rgba(255, 255, 255, 0.1);\n  border: 1px solid rgba(255, 255, 255, 0.2);\n  border-radius: 8px;\n  color: #252525;\n  cursor: pointer;\n  transition: all 0.3s ease;\n}\n.breadcrumb-section .breadcrumb-nav .breadcrumb-container .back-button[data-v-22db5e22]:hover {\n  background: rgba(255, 255, 255, 0.15);\n  border-color: rgba(255, 255, 255, 0.3);\n  transform: translateY(-1px);\n  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);\n  color: #dc3545;\n}\n.breadcrumb-section .breadcrumb-nav .breadcrumb-container .back-button i[data-v-22db5e22] {\n  font-size: 1.1em;\n}\n.breadcrumb-section .breadcrumb-nav .breadcrumb-container .breadcrumb[data-v-22db5e22] {\n  display: flex;\n  align-items: center;\n  gap: 0.5rem;\n  margin: 0;\n  padding: 0;\n  background: none;\n  border-radius: 0;\n}\n.breadcrumb-section .breadcrumb-nav .breadcrumb-container .breadcrumb .breadcrumb-item[data-v-22db5e22] {\n  display: flex;\n  align-items: center;\n  gap: 0.5rem;\n  font-size: 0.875rem;\n  color: #6a6a6a;\n}\n.breadcrumb-section .breadcrumb-nav .breadcrumb-container .breadcrumb .breadcrumb-item.active[data-v-22db5e22] {\n  color: #252525;\n  font-weight: 600;\n}\n.breadcrumb-section .breadcrumb-nav .breadcrumb-container .breadcrumb .breadcrumb-item.active i[data-v-22db5e22] {\n  color: #dc3545;\n}\n.breadcrumb-section .breadcrumb-nav .breadcrumb-container .breadcrumb .breadcrumb-item a[data-v-22db5e22] {\n  display: flex;\n  align-items: center;\n  gap: 0.5rem;\n  color: #6a6a6a;\n  text-decoration: none;\n  transition: color 0.3s ease;\n}\n.breadcrumb-section .breadcrumb-nav .breadcrumb-container .breadcrumb .breadcrumb-item a[data-v-22db5e22]:hover {\n  color: #dc3545;\n}\n.breadcrumb-section .breadcrumb-nav .breadcrumb-container .breadcrumb .breadcrumb-item a:hover i[data-v-22db5e22] {\n  color: #dc3545;\n}\n.breadcrumb-section .breadcrumb-nav .breadcrumb-container .breadcrumb .breadcrumb-item a i[data-v-22db5e22] {\n  font-size: 0.9em;\n  transition: color 0.3s ease;\n}\n.breadcrumb-section .breadcrumb-nav .breadcrumb-container .breadcrumb .breadcrumb-item[data-v-22db5e22]:not(:last-child)::after {\n  content: \"›\";\n  margin-left: 0.5rem;\n  color: #6a6a6a;\n  font-size: 1.2em;\n}\n.refresh-section[data-v-22db5e22] {\n  display: flex;\n  align-items: center;\n}\n.refresh-section .refresh-btn[data-v-22db5e22] {\n  display: flex;\n  align-items: center;\n  gap: 0.5rem;\n  padding: 0.5rem 1rem;\n  border-radius: 8px;\n  font-size: 0.875rem;\n  font-weight: 500;\n  transition: all 0.3s ease;\n}\n.refresh-section .refresh-btn[data-v-22db5e22]:hover:not(:disabled) {\n  transform: translateY(-1px);\n  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);\n}\n.refresh-section .refresh-btn[data-v-22db5e22]:disabled {\n  opacity: 0.6;\n  cursor: not-allowed;\n}\n.refresh-section .refresh-btn i[data-v-22db5e22] {\n  font-size: 0.9em;\n}\n@media (max-width: 768px) {\n.breadcrumb-nav-row[data-v-22db5e22] {\n    flex-direction: column;\n    align-items: flex-start;\n    gap: 1rem;\n}\n.breadcrumb-section[data-v-22db5e22] {\n    width: 100%;\n}\n.breadcrumb-section .breadcrumb-container[data-v-22db5e22] {\n    flex-direction: column;\n    align-items: flex-start;\n    gap: 0.5rem;\n}\n.breadcrumb-section .breadcrumb-container .breadcrumb[data-v-22db5e22] {\n    flex-wrap: wrap;\n}\n.breadcrumb-section .breadcrumb-container .breadcrumb .breadcrumb-item[data-v-22db5e22] {\n    font-size: 0.8rem;\n}\n.breadcrumb-section .breadcrumb-container .breadcrumb .breadcrumb-item a[data-v-22db5e22] {\n    font-size: 0.8rem;\n}\n.refresh-section[data-v-22db5e22] {\n    width: 100%;\n    justify-content: flex-end;\n}\n.refresh-section .refresh-btn[data-v-22db5e22] {\n    font-size: 0.8rem;\n    padding: 0.4rem 0.8rem;\n}\n}\n/* Override main content font size */\n[data-v-22db5e22]:deep(.layout-sidebar-large .main-content-wrap) {\n  font-size: 0.8rem !important;\n}\n\n/* Target the appointment page specifically */\n.appointment-page[data-v-22db5e22] {\n  font-size: 0.8rem !important;\n}\n\n/* Target all content within the appointment page */\n.appointment-page *[data-v-22db5e22] {\n  font-size: 0.8rem !important;\n}\nh2[data-v-22db5e22] {\n  font-size: 1.25rem;\n  margin-bottom: 15px;\n  color: #252525;\n}\nlabel[data-v-22db5e22] {\n  padding-top: 10px !important;\n  color: #252525;\n  font-weight: 600;\n}\ninput[data-v-22db5e22] {\n  max-width: 440px;\n  border-radius: 20px;\n  border: 1px solid #ccc;\n  background-color: #ffffff;\n  color: #252525;\n}\nselect[data-v-22db5e22] {\n  max-width: 440px;\n  border-radius: 20px;\n  padding: 5px 10px;\n  border: 1px solid #ccc;\n  background-color: #ffffff;\n  color: #252525;\n}\n.modal-backdrop[data-v-22db5e22] {\n  position: fixed;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  background-color: rgba(0, 0, 0, 0.5);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  z-index: 1050;\n  opacity: 1 !important;\n}\n.modal-box[data-v-22db5e22] {\n  background-color: #ffffff;\n  padding: 2rem;\n  border-radius: 10px;\n  width: 100%;\n  max-width: 500px;\n  box-shadow: 0 10px 15px rgba(0, 0, 0, 0.2);\n  transition: transform 0.3s ease, box-shadow 0.3s ease;\n  opacity: 1 !important;\n  position: relative;\n  z-index: 1051;\n}\n.modal-box[data-v-22db5e22]:hover {\n  transform: scale(1.01);\n  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.15);\n}\n.modal-box h3[data-v-22db5e22] {\n  margin-bottom: 1rem;\n  text-align: center;\n  font-weight: 700;\n  color: #dc3545;\n}\n.modal-box input[data-v-22db5e22],\n.modal-box select[data-v-22db5e22] {\n  width: 100%;\n  padding: 0.5rem;\n  border: 1px solid #ccc;\n  border-radius: 6px;\n  transition: border-color 0.3s;\n  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);\n  background-color: #ffffff;\n  color: #252525;\n}\n.modal-box input[data-v-22db5e22]:focus,\n.modal-box select[data-v-22db5e22]:focus {\n  border-color: #dc3545;\n  outline: none;\n  box-shadow: 0 4px 10px rgba(220, 53, 69, 0.3);\n}\n.modal-actions[data-v-22db5e22] {\n  display: flex;\n  justify-content: space-between;\n  gap: 1rem;\n  margin-top: 20px;\n}\n.modal-actions button[data-v-22db5e22] {\n  flex: 1;\n  padding: 0.6rem;\n  border: none;\n  border-radius: 6px;\n  cursor: pointer;\n  transition: background-color 0.3s, transform 0.2s;\n}\n.modal-actions button[type=submit][data-v-22db5e22] {\n  background-color: #dc3545;\n  color: #ffffff;\n}\n.modal-actions button[type=submit][data-v-22db5e22]:hover {\n  background-color: #e52e2e;\n  transform: scale(1.03);\n}\n.modal-actions button[type=button][data-v-22db5e22] {\n  background-color: #6c757d;\n  color: #ffffff;\n}\n.modal-actions button[type=button][data-v-22db5e22]:hover {\n  background-color: rgb(84.3605150215, 91.3905579399, 97.6394849785);\n  transform: scale(1.03);\n}\n\n/* Rating Display Styles */\n.rating-display[data-v-22db5e22] {\n  padding: 0.75rem;\n  background-color: #ffffff;\n  border: 1px solid #ccc;\n  border-radius: 6px;\n  font-size: 1rem;\n  font-weight: 600;\n}\n.rating-display .rating-value[data-v-22db5e22] {\n  color: #F59E0B;\n  display: flex;\n  align-items: center;\n  gap: 0.5rem;\n}\n.rating-display .rating-value i[data-v-22db5e22] {\n  font-size: 1.2rem;\n}\n.rating-display .no-rating[data-v-22db5e22] {\n  color: #6a6a6a;\n  display: flex;\n  align-items: center;\n  gap: 0.5rem;\n}\n.rating-display .no-rating i[data-v-22db5e22] {\n  font-size: 1.2rem;\n}\n\n/* Header styling */\n.refresh-btn[data-v-22db5e22] {\n  background: linear-gradient(to right, #dc3545, #e52e2e);\n  border: none;\n  border-radius: 8px;\n  padding: 10px 20px;\n  font-weight: 500;\n  transition: all 0.3s ease;\n}\n.refresh-btn[data-v-22db5e22]:hover:not(:disabled) {\n  transform: translateY(-2px);\n  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);\n}\n.refresh-btn[data-v-22db5e22]:disabled {\n  opacity: 0.6;\n  cursor: not-allowed;\n}\n.refresh-btn i[data-v-22db5e22] {\n  margin-right: 8px;\n}\n\n/* Override main content font size */\n[data-v-22db5e22]:deep(.layout-sidebar-large .main-content-wrap) {\n  font-size: 0.8rem !important;\n}\n\n/* Target the appointment page specifically */\n.appointment-page[data-v-22db5e22] {\n  font-size: 0.8rem !important;\n}\n\n/* VueCal container styling */\n.vuecal[data-v-22db5e22] {\n  font-family: \"Inter\", \"Segoe UI\", \"Roboto\", \"Helvetica Neue\", Arial, sans-serif;\n  border-radius: 12px;\n  overflow: hidden;\n  box-shadow: 0 10px 15px rgba(0, 0, 0, 0.2);\n  background-color: #ffffff;\n  border: 1px solid #e0e0e0;\n  color: #252525;\n}\n\n/* Header bar */\n.vuecal__header[data-v-22db5e22] {\n  background-color: #dc3545;\n  color: #ffffff;\n  padding: 12px;\n  font-weight: bold;\n  font-size: 1.25rem;\n  border-bottom: 1px solid #e0e0e0;\n}\n\n/* Navigation buttons */\n.vuecal__arrow[data-v-22db5e22] {\n  color: #ffffff;\n  font-size: 1.5rem;\n  transition: transform 0.3s;\n}\n.vuecal__arrow[data-v-22db5e22]:hover {\n  transform: scale(1.1);\n}\n\n/* Days of the week */\n.vuecal__weekdays[data-v-22db5e22] {\n  background-color: #eaeaea;\n  color: #252525;\n  font-weight: 600;\n  border-bottom: 1px solid #e0e0e0;\n}\n\n/* Time labels */\n.vuecal__time-column[data-v-22db5e22] {\n  background-color: #f5f5f3;\n  color: #252525;\n  font-size: 0.875rem;\n}\n\n/* Cells */\n.vuecal__cell[data-v-22db5e22] {\n  transition: background-color 0.2s;\n}\n.vuecal__cell[data-v-22db5e22]:hover {\n  background-color: #eaeaea;\n  cursor: pointer;\n}\n\n/* Selected cell (when clicked) */\n.vuecal__cell--selected[data-v-22db5e22] {\n  background-color: #e3f2fd !important;\n  border-left: 3px solid #dc3545;\n}\n\n/* Events */\n.vuecal__event[data-v-22db5e22] {\n  background-color: #bfd7ff;\n  color: #ffffff;\n  padding: 4px 8px;\n  border-radius: 8px;\n  font-size: 0.875rem;\n  transition: transform 0.2s;\n  margin: 2px;\n  cursor: pointer;\n  -webkit-user-select: none;\n     -moz-user-select: none;\n          user-select: none;\n}\n.vuecal__event[data-v-22db5e22]:hover {\n  background-color: #e52e2e;\n  transform: scale(1.02);\n  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);\n}\n\n/* Scrollbars (optional for modern feel) */\n.vuecal__scroll-area[data-v-22db5e22]::-webkit-scrollbar {\n  width: 6px;\n}\n.vuecal__scroll-area[data-v-22db5e22]::-webkit-scrollbar-thumb {\n  background-color: #cccccc;\n  border-radius: 10px;\n}\n\n/* Hide year and month view tabs in vue-cal */\n.vuecal__view-btn[title=Year][data-v-22db5e22],\n.vuecal__view-btn[title=Month][data-v-22db5e22] {\n  display: none !important;\n}\n\n/* Event Options Modal Styles */\n.event-options-modal[data-v-22db5e22] {\n  max-width: 400px !important;\n}\n.event-options[data-v-22db5e22] {\n  display: flex;\n  flex-direction: column;\n  gap: 1rem;\n  margin: 1.5rem 0;\n}\n.option-btn[data-v-22db5e22] {\n  display: flex;\n  align-items: center;\n  gap: 0.75rem;\n  padding: 1rem;\n  border: none;\n  border-radius: 8px;\n  font-weight: 600;\n  font-size: 2rem;\n  cursor: pointer;\n  transition: all 0.3s ease;\n  text-align: left;\n}\n.option-btn i[data-v-22db5e22] {\n  font-size: 1.2rem;\n}\n.option-btn[data-v-22db5e22]:hover {\n  transform: translateY(-2px);\n  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);\n}\n.edit-btn[data-v-22db5e22] {\n  background: linear-gradient(135deg, #007bff, #0056b3);\n  color: white;\n}\n.edit-btn[data-v-22db5e22]:hover {\n  background: linear-gradient(135deg, #0056b3, #004085);\n}\n.add-btn[data-v-22db5e22] {\n  background: linear-gradient(135deg, #28a745, #1e7e34);\n  color: white;\n}\n.add-btn[data-v-22db5e22]:hover {\n  background: linear-gradient(135deg, #1e7e34, #155724);\n}\n.delete-btn[data-v-22db5e22] {\n  background: linear-gradient(135deg, #dc3545, #c82333);\n  color: white;\n}\n.delete-btn[data-v-22db5e22]:hover {\n  background: linear-gradient(135deg, #c82333, #a71e2a);\n}\n.cancel-btn[data-v-22db5e22] {\n  background: #6c757d;\n  color: white;\n  border: none;\n  padding: 0.5rem 1rem;\n  border-radius: 6px;\n  font-weight: 600;\n  cursor: pointer;\n  transition: all 0.3s ease;\n}\n.cancel-btn[data-v-22db5e22]:hover {\n  background: #5a6268;\n  transform: scale(1.05);\n}\n\n/* Ensure Bootstrap Vue toasts appear above modals */\n[data-v-22db5e22]:deep(.b-toast) {\n  z-index: 1100 !important;\n}\n[data-v-22db5e22]:deep(.b-toast-slot) {\n  z-index: 1100 !important;\n}", ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-cal/dist/vuecal.css":
/*!******************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-cal/dist/vuecal.css ***!
  \******************************************************************************************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__);
// Imports

var ___CSS_LOADER_EXPORT___ = _css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default()(function(i){return i[1]});
// Module
___CSS_LOADER_EXPORT___.push([module.id, ".vuecal__weekdays-headings{border-bottom:1px solid #ddd;margin-bottom:-1px}.vuecal--week-numbers .vuecal__weekdays-headings,.vuecal--view-with-time .vuecal__weekdays-headings{padding-left:3em}.vuecal--view-with-time.vuecal--twelve-hour .vuecal__weekdays-headings{font-size:.9em;padding-left:4em}.vuecal--overflow-x.vuecal--view-with-time .vuecal__weekdays-headings{padding-left:0}.vuecal__heading{width:100%;height:2.8em;font-weight:400;justify-content:center;text-align:center;align-items:center;position:relative;overflow:hidden}.vuecal__heading>.vuecal__flex{width:100%;height:100%;align-items:initial!important}.vuecal--sticky-split-labels .vuecal__heading{height:3.4em}.vuecal--month-view .vuecal__heading,.vuecal--week-view .vuecal__heading,.vuecal--day-view .vuecal__heading{width:14.2857%}.vuecal--hide-weekends.vuecal--month-view .vuecal__heading,.vuecal--hide-weekends.vuecal--week-view .vuecal__heading,.vuecal--hide-weekends.vuecal--day-view .vuecal__heading,.vuecal--years-view .vuecal__heading{width:20%}.vuecal--year-view .vuecal__heading{width:33.33%}.vuecal__heading .weekday-label{flex-shrink:0;display:flex;justify-content:center;align-items:center}.vuecal--small .vuecal__heading .small,.vuecal--xsmall .vuecal__heading .xsmall{display:block}.vuecal__heading .small,.vuecal__heading .xsmall,.vuecal--small .vuecal__heading .full,.vuecal--small .vuecal__heading .xsmall,.vuecal--xsmall .vuecal__heading .full,.vuecal--xsmall .vuecal__heading .small{display:none}.vuecal .vuecal__split-days-headers{align-items:center}@media screen and (max-width: 550px){.vuecal__heading{line-height:1.2}.vuecal__heading .small,.vuecal--small .vuecal__heading .small,.vuecal--xsmall .vuecal__heading .xsmall{display:block}.vuecal__heading .full,.vuecal__heading .xsmall,.vuecal--small .vuecal__heading .full,.vuecal--small .vuecal__heading .xsmall,.vuecal--xsmall .vuecal__heading .full,.vuecal--xsmall .vuecal__heading .small{display:none}.vuecal--overflow-x .vuecal__heading .full,.vuecal--small.vuecal--overflow-x .vuecal__heading .small,.vuecal--xsmall.vuecal--overflow-x .vuecal__heading .xsmall{display:block}.vuecal--overflow-x .vuecal__heading .small,.vuecal--overflow-x .vuecal__heading .xsmall,.vuecal--small.vuecal--overflow-x .vuecal__heading .full,.vuecal--small.vuecal--overflow-x .vuecal__heading .xsmall,.vuecal--xsmall.vuecal--overflow-x .vuecal__heading .full,.vuecal--xsmall.vuecal--overflow-x .vuecal__heading .small{display:none}}@media screen and (max-width: 450px){.vuecal__heading .xsmall,.vuecal--small .vuecal__heading .xsmall,.vuecal--xsmall .vuecal__heading .xsmall{display:block}.vuecal__heading .full,.vuecal__heading .small,.vuecal--small .vuecal__heading .full,.vuecal--small .vuecal__heading .small,.vuecal--xsmall .vuecal__heading .full,.vuecal--xsmall .vuecal__heading .small{display:none}.vuecal--small.vuecal--overflow-x .vuecal__heading .small,.vuecal--xsmall.vuecal--overflow-x .vuecal__heading .xsmall{display:block}.vuecal--small.vuecal--overflow-x .vuecal__heading .full,.vuecal--small.vuecal--overflow-x .vuecal__heading .xsmall,.vuecal--xsmall.vuecal--overflow-x .vuecal__heading .full,.vuecal--xsmall.vuecal--overflow-x .vuecal__heading .small{display:none}}.vuecal__header button{outline:none;font-family:inherit}.vuecal__menu{padding:0;margin:0;list-style-type:none;justify-content:center;background-color:#00000005}.vuecal__view-btn{background:none;border:none;padding:.3em 1em;height:2.2em;font-size:1.3em;border-bottom:0 solid currentColor;cursor:pointer;color:inherit;box-sizing:border-box;transition:.2s}.vuecal__view-btn--active{border-bottom-width:2px;background:rgba(255,255,255,.15)}.vuecal__title-bar{background-color:#0000001a;display:flex;align-items:center;text-align:center;justify-content:space-between;font-size:1.4em;line-height:1.3;min-height:2em}.vuecal--xsmall .vuecal__title-bar{font-size:1.3em}.vuecal__title{position:relative;justify-content:center}.vuecal__title button{cursor:pointer;background:none;border:none}.vuecal__title button.slide-fade--left-leave-active,.vuecal__title button.slide-fade--right-leave-active{width:100%}.vuecal__today-btn{position:relative;align-items:center;display:flex;font-size:.8em;background:none;border:none}.vuecal__today-btn span.default{font-size:.8em;padding:3px 6px;text-transform:uppercase;cursor:pointer}.vuecal__arrow{cursor:pointer;position:relative;z-index:1;background:none;border:none;white-space:nowrap}.vuecal__arrow--prev{margin-left:.6em}.vuecal__arrow--next{margin-right:.6em}.vuecal__arrow i.angle{display:inline-block;border:solid currentColor;border-width:0 2px 2px 0;padding:.25em;transform:rotate(-45deg)}.vuecal__arrow--prev i.angle{border-width:2px 0 0 2px}.vuecal__arrow--highlighted,.vuecal__today-btn--highlighted,.vuecal__view-btn--highlighted{position:relative;background-color:#0000000a}.vuecal__arrow--highlighted *,.vuecal__today-btn--highlighted *,.vuecal__view-btn--highlighted *{pointer-events:none}.vuecal__arrow--highlighted:before,.vuecal__arrow--highlighted:after,.vuecal__today-btn--highlighted:before,.vuecal__today-btn--highlighted:after,.vuecal__view-btn--highlighted:before,.vuecal__view-btn--highlighted:after{content:\"\";background-color:inherit;animation:sonar .8s infinite ease-out;position:absolute;top:50%;left:50%;pointer-events:none}.vuecal__arrow--highlighted:before,.vuecal__today-btn--highlighted:before,.vuecal__view-btn--highlighted:before{width:3em;height:3em;border-radius:3em;margin-top:-1.5em;margin-left:-1.5em}.vuecal__arrow--highlighted:after,.vuecal__today-btn--highlighted:after,.vuecal__view-btn--highlighted:after{animation-duration:1.5s;animation-delay:.1s;width:2.6em;height:2.6em;border-radius:2.6em;margin-top:-1.3em;margin-left:-1.3em}@keyframes sonar{0%,20%{opacity:1}to{transform:scale(2.5);opacity:0}}@media screen and (max-width: 450px){.vuecal__title{font-size:.9em}.vuecal__view-btn{padding-left:.6em;padding-right:.6em}}@media screen and (max-width: 350px){.vuecal__view-btn{font-size:1.1em}}.vuecal__event{color:#666;background-color:#f8f8f8cc;position:relative;box-sizing:border-box;left:0;width:100%;z-index:1;transition:box-shadow .3s,left .3s,width .3s;overflow:hidden}.vuecal--no-time .vuecal__event{min-height:8px}.vuecal:not(.vuecal--dragging-event) .vuecal__event:hover{z-index:2}.vuecal__cell .vuecal__event *{-webkit-user-select:text;-moz-user-select:text;user-select:text}.vuecal--view-with-time .vuecal__event:not(.vuecal__event--all-day){position:absolute}.vuecal--view-with-time .vuecal__bg .vuecal__event--all-day{position:absolute;top:0;bottom:0;z-index:0;opacity:.6;width:auto;right:0}.vuecal--view-with-time .vuecal__all-day .vuecal__event--all-day{position:relative;left:0}.vuecal__event--background{z-index:0}.vuecal__event--focus,.vuecal__event:focus{box-shadow:1px 1px 6px #0003;z-index:3;outline:none}.vuecal__event.vuecal__event--dragging{opacity:.7}.vuecal__event.vuecal__event--static{opacity:0;transition:opacity .1s}@-moz-document url-prefix(){.vuecal__event.vuecal__event--dragging{opacity:1}}.vuecal__event-resize-handle{position:absolute;bottom:0;left:0;right:0;height:1em;background-color:#ffffff4d;opacity:0;transform:translateY(110%);transition:.3s;cursor:ns-resize}.vuecal__event:hover .vuecal__event-resize-handle,.vuecal__event:focus .vuecal__event-resize-handle,.vuecal__event--focus .vuecal__event-resize-handle,.vuecal__event--resizing .vuecal__event-resize-handle{opacity:1;transform:translateY(0)}.vuecal__event--dragging .vuecal__event-resize-handle{display:none}.vuecal__event-delete{position:absolute;top:0;left:0;right:0;display:flex;flex-direction:column;align-items:center;justify-content:center;height:1.4em;line-height:1.4em;background-color:#dd3333d9;color:#fff;z-index:0;cursor:pointer;transform:translateY(-110%);transition:.3s}.vuecal__event .vuecal__event-delete{-webkit-user-select:none;-moz-user-select:none;user-select:none}.vuecal--full-height-delete .vuecal__event-delete{height:auto;bottom:0}.vuecal--full-height-delete .vuecal__event-delete:before{content:\"\";width:1.7em;height:1.8em;display:block;background-image:url('data:image/svg+xml;utf8,<svg width=\"512\" height=\"512\" viewBox=\"0 0 512 512\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M12 1.5a10.5 10.5 0 100 21 10.5 10.5 0 000-21zm5 14.1c.2 0 .2.2.2.2l-.1.3-1 1-.3.1h-.2L12 13.5l-3.5 3.6h-.3-.3l-1-1v-.4-.2l3.6-3.6-3.6-3.5A.4.4 0 017 8l1-1 .3-.2c.1 0 .2 0 .2.2l3.6 3.5L15.6 7l.2-.2c.1 0 .2 0 .3.2l1 1v.5L13.5 12z\" fill=\"%23fff\" opacity=\".9\"/></svg>')}.vuecal__event--deletable .vuecal__event-delete{transform:translateY(0);z-index:1}.vuecal__event--deletable.vuecal__event--dragging .vuecal__event-delete{opacity:0;transition:none}.vuecal--month-view .vuecal__event-title{font-size:.85em}.vuecal--short-events .vuecal__event-title{text-align:left;overflow:hidden;white-space:nowrap;text-overflow:ellipsis;padding:0 3px}.vuecal__event-title,.vuecal__event-content{-webkit-hyphens:auto;hyphens:auto}.vuecal__event-title--edit{border-bottom:1px solid transparent;text-align:center;transition:.3s;color:inherit;background-image:url('data:image/svg+xml;utf8,<svg viewBox=\"0 0 512 512\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M442 150l-39 39-80-80 39-39q6-6 15-6t15 6l50 50q6 6 6 15t-6 15zM64 368l236-236 80 80-236 236H64v-80z\" fill=\"%23000\" opacity=\".4\"/></svg>');background-repeat:no-repeat;background-position:120% .15em;background-size:.4em;outline:none;width:100%}.vuecal__event-title--edit:hover,.vuecal__event-title--edit:focus{border-color:#0006;background-position:99% .15em;background-size:1.2em}.vuecal__cell{position:relative;width:100%;display:flex;justify-content:center;align-items:center;text-align:center;transition:.15s ease-in-out background-color}.vuecal__cells.month-view .vuecal__cell,.vuecal__cells.week-view .vuecal__cell{width:14.2857%}.vuecal--hide-weekends .vuecal__cells.month-view .vuecal__cell,.vuecal--hide-weekends .vuecal__cells.week-view .vuecal__cell,.vuecal__cells.years-view .vuecal__cell{width:20%}.vuecal__cells.year-view .vuecal__cell{width:33.33%}.vuecal__cells.day-view .vuecal__cell{flex:1}.vuecal--overflow-x.vuecal--day-view .vuecal__cell{width:auto}.vuecal--click-to-navigate .vuecal__cell:not(.vuecal__cell--disabled){cursor:pointer}.vuecal--view-with-time .vuecal__cell,.vuecal--week-view.vuecal--no-time .vuecal__cell:not(.vuecal__cell--has-splits),.vuecal--day-view.vuecal--no-time .vuecal__cell:not(.vuecal__cell--has-splits){display:block}.vuecal__cell.vuecal__cell--has-splits{flex-direction:row;display:flex}.vuecal__cell:before{content:\"\";position:absolute;z-index:0;top:0;left:0;right:-1px;bottom:-1px;border:1px solid rgba(196,196,196,.25)}.vuecal--overflow-x.vuecal--day-view .vuecal__cell:before{bottom:0}.vuecal__cell--today,.vuecal__cell--current{background-color:#f0f0ff66;z-index:1}.vuecal__cell--selected{background-color:#ebfff566;z-index:2}.vuecal--day-view .vuecal__cell--selected{background:none}.vuecal__cell--out-of-scope{color:#00000040}.vuecal__cell--disabled{color:#00000040;cursor:not-allowed}.vuecal__cell--highlighted:not(.vuecal__cell--has-splits),.vuecal__cell-split.vuecal__cell-split--highlighted{background-color:#0000000a;transition-duration:5ms}.vuecal__cell-content{position:relative;width:100%;height:100%;outline:none}.vuecal--years-view .vuecal__cell-content,.vuecal--year-view .vuecal__cell-content,.vuecal--month-view .vuecal__cell-content{justify-content:center}.vuecal__cell .cell-time-labels{position:absolute;top:0;left:0;right:0;bottom:0;display:flex;flex-direction:column}.vuecal__cell .cell-time-label{flex-grow:1;font-size:.8em;opacity:.3;line-height:1.7}.vuecal__cell-split{display:flex;flex-grow:1;flex-direction:column;height:100%;position:relative;transition:.15s ease-in-out background-color}.vuecal__cell-events{width:100%}.vuecal__cell-events-count{position:absolute;left:50%;top:65%;transform:translate(-50%);min-width:12px;height:12px;line-height:12px;padding:0 3px;background:#999;color:#fff;border-radius:12px;font-size:10px;box-sizing:border-box}.vuecal__cell .vuecal__special-hours{position:absolute;left:0;right:0;box-sizing:border-box}.vuecal--overflow-x.vuecal--week-view .vuecal__cell,.vuecal__cell-split{overflow:hidden}.vuecal__no-event{padding-top:1em;color:#aaa;justify-self:flex-start;margin-bottom:auto}.vuecal__all-day .vuecal__no-event{display:none}.vuecal__now-line{position:absolute;left:0;width:100%;height:0;color:red;border-top:1px solid currentColor;opacity:.6;z-index:1}.vuecal__now-line:before{content:\"\";position:absolute;top:-6px;left:0;border:5px solid transparent;border-left-color:currentColor}.vuecal{height:100%;box-shadow:0 0 0 1px inset #00000014}.vuecal *{-webkit-user-select:none;-moz-user-select:none;user-select:none}.vuecal--has-touch *:not(.vuecal__event-title--edit){-webkit-touch-callout:none;-webkit-user-select:none;-moz-user-select:none;user-select:none}.vuecal .clickable{cursor:pointer}.vuecal--resizing-event,.vuecal--drag-creating-event{cursor:ns-resize}.vuecal--dragging-event{cursor:move;cursor:grabbing}.vuecal .dragging-helper{position:absolute;width:60px;height:40px;background:rgba(138,190,230,.8);border:1px solid #61a9e0;z-index:10}.vuecal--xsmall{font-size:.9em}.vuecal__flex{display:flex;flex-direction:row}.vuecal__flex[column]{flex-direction:column;flex:1 1 auto}.vuecal__flex[grow]{flex:1 1 auto;width:100%}.vuecal__flex[wrap]{flex-wrap:wrap}.vuecal__split-days-headers.slide-fade--right-leave-active{display:none}.vuecal--week-numbers.vuecal--month-view .vuecal__split-days-headers{margin-left:3em}.vuecal--day-view:not(.vuecal--overflow-x) .vuecal__split-days-headers{margin-left:3em;height:2.2em}.vuecal--day-view.vuecal--twelve-hour:not(.vuecal--overflow-x) .vuecal__split-days-headers{margin-left:4em}.vuecal__split-days-headers .day-split-header{display:flex;flex-grow:1;flex-basis:0;justify-content:center;align-items:center;height:100%}.vuecal__split-days-headers .vuecal--day-view.vuecal--overflow-x.vuecal--sticky-split-labels .day-split-header{height:1.5em}.vuecal__body{position:relative;overflow:hidden}.vuecal__all-day{min-height:1.7em;margin-bottom:-1px;flex-shrink:0}.vuecal__all-day-text{width:3em;box-sizing:border-box;color:#999;padding-right:2px;display:flex;flex-shrink:0;align-items:center;justify-content:flex-end;border-bottom:1px solid #ddd;-webkit-hyphens:auto;hyphens:auto}.vuecal__all-day-text span{font-size:.85em;text-align:right;line-height:1.1}.vuecal--twelve-hour .vuecal__all-day>span{width:4em}.vuecal__bg{overflow:auto;overflow-x:hidden;-webkit-overflow-scrolling:touch;min-height:60px;position:relative;width:100%}.vuecal--no-time .vuecal__bg{display:flex;flex:1 1 auto;overflow:auto}.vuecal__week-numbers{width:3em;flex-shrink:0!important}.vuecal__week-numbers .vuecal__week-number-cell{opacity:.4;font-size:.9em;align-items:center;justify-items:center;justify-content:center}.vuecal__scrollbar-check{position:absolute;top:0;left:0;right:0;bottom:0;overflow:scroll;visibility:hidden;z-index:-1}.vuecal__scrollbar-check div{height:120%}.vuecal__time-column{width:3em;height:100%;flex-shrink:0}.vuecal--twelve-hour .vuecal__time-column{width:4em;font-size:.9em}.vuecal--overflow-x.vuecal--week-view .vuecal__time-column{margin-top:2.8em;box-shadow:0 1px 1px #0000004d}.vuecal--overflow-x.vuecal--week-view.vuecal--sticky-split-labels .vuecal__time-column{margin-top:3.4em}.vuecal--overflow-x.vuecal--day-view.vuecal--sticky-split-labels .vuecal__time-column{margin-top:1.5em}.vuecal__time-column .vuecal__time-cell{color:#999;text-align:right;padding-right:2px;font-size:.9em}.vuecal__time-column .vuecal__time-cell-line:before{content:\"\";position:absolute;left:0;right:0;border-top:1px solid rgba(196,196,196,.3)}.vuecal__cells{margin:0 1px 1px 0}.vuecal--overflow-x.vuecal--day-view .vuecal__cells{margin:0}.vuecal--events-on-month-view.vuecal--short-events .vuecal__cells{width:99.9%}.vuecal--overflow-x.vuecal--day-view .vuecal__cells,.vuecal--overflow-x.vuecal--week-view .vuecal__cells{flex-wrap:nowrap;overflow:auto}.slide-fade--left-enter-active,.slide-fade--left-leave-active,.slide-fade--right-enter-active,.slide-fade--right-leave-active{transition:.25s ease-out}.slide-fade--left-enter,.slide-fade--right-leave-to{transform:translate(-15px);opacity:0}.slide-fade--left-leave-to,.slide-fade--right-enter{transform:translate(15px);opacity:0}.slide-fade--left-leave-active,.slide-fade--right-leave-active{position:absolute!important;height:100%}.vuecal__title-bar .slide-fade--left-leave-active,.vuecal__title-bar .slide-fade--right-leave-active{left:0;right:0;height:auto}.vuecal__heading .slide-fade--left-leave-active,.vuecal__heading .slide-fade--right-leave-active{display:flex;align-items:center}.vuecal--green-theme .vuecal__menu,.vuecal--green-theme .vuecal__cell-events-count{background-color:#42b983;color:#fff}.vuecal--green-theme .vuecal__title-bar{background-color:#e4f5ef}.vuecal--green-theme .vuecal__cell--today,.vuecal--green-theme .vuecal__cell--current{background-color:#f0f0ff66}.vuecal--green-theme:not(.vuecal--day-view) .vuecal__cell--selected{background-color:#ebfff566}.vuecal--green-theme .vuecal__cell--selected:before{border-color:#42b98380}.vuecal--green-theme .vuecal__cell--highlighted:not(.vuecal__cell--has-splits),.vuecal--green-theme .vuecal__cell-split--highlighted{background-color:#c3ffe180}.vuecal--green-theme .vuecal__arrow--highlighted,.vuecal--green-theme .vuecal__today-btn--highlighted,.vuecal--green-theme .vuecal__view-btn--highlighted{background-color:#88ecbf40}.vuecal--blue-theme .vuecal__menu,.vuecal--blue-theme .vuecal__cell-events-count{background-color:#42a3b9cc;color:#fff}.vuecal--blue-theme .vuecal__title-bar{background-color:#00a5bc4d}.vuecal--blue-theme .vuecal__cell--today,.vuecal--blue-theme .vuecal__cell--current{background-color:#f0f0ff66}.vuecal--blue-theme:not(.vuecal--day-view) .vuecal__cell--selected{background-color:#ebfdff66}.vuecal--blue-theme .vuecal__cell--selected:before{border-color:#73bfcc80}.vuecal--blue-theme .vuecal__cell--highlighted:not(.vuecal__cell--has-splits),.vuecal--blue-theme .vuecal__cell-split--highlighted{background-color:#00a5bc0f}.vuecal--blue-theme .vuecal__arrow--highlighted,.vuecal--blue-theme .vuecal__today-btn--highlighted,.vuecal--blue-theme .vuecal__view-btn--highlighted{background-color:#42a3b933}.vuecal--rounded-theme .vuecal__weekdays-headings{border:none}.vuecal--rounded-theme .vuecal__cell,.vuecal--rounded-theme .vuecal__cell:before{background:none;border:none}.vuecal--rounded-theme .vuecal__cell--out-of-scope{opacity:.4}.vuecal--rounded-theme .vuecal__cell-content{width:30px;height:30px;flex-grow:0;border:1px solid transparent;border-radius:30px;color:#333}.vuecal--rounded-theme.vuecal--day-view .vuecal__cell-content{width:auto;background:none}.vuecal--rounded-theme.vuecal--year-view .vuecal__cell{width:33.33%}.vuecal--rounded-theme.vuecal--year-view .vuecal__cell-content{width:85px}.vuecal--rounded-theme.vuecal--years-view .vuecal__cell-content{width:52px}.vuecal--rounded-theme .vuecal__cell{background-color:transparent!important}.vuecal--rounded-theme.vuecal--green-theme:not(.vuecal--day-view) .vuecal__cell-content{background-color:#f1faf7}.vuecal--rounded-theme.vuecal--green-theme:not(.vuecal--day-view) .vuecal__cell--today .vuecal__cell-content{background-color:#42b983;color:#fff}.vuecal--rounded-theme.vuecal--green-theme .vuecal--day-view .vuecal__cell--today:before{background-color:#42b9830d}.vuecal--rounded-theme.vuecal--green-theme:not(.vuecal--day-view) .vuecal__cell--selected .vuecal__cell-content{border-color:#42b983}.vuecal--rounded-theme.vuecal--green-theme .vuecal__cell--highlighted:not(.vuecal__cell--has-splits),.vuecal--rounded-theme.vuecal--green-theme .vuecal__cell-split--highlighted{background-color:#c3ffe180}.vuecal--rounded-theme.vuecal--blue-theme:not(.vuecal--day-view) .vuecal__cell-content{background-color:#64b6ff33}.vuecal--rounded-theme.vuecal--blue-theme:not(.vuecal--day-view) .vuecal__cell--today .vuecal__cell-content{background-color:#8fb7e4;color:#fff}.vuecal--rounded-theme.vuecal--blue-theme .vuecal--day-view .vuecal__cell--today:before{background-color:#8fb7e41a}.vuecal--rounded-theme.vuecal--blue-theme:not(.vuecal--day-view) .vuecal__cell--selected .vuecal__cell-content{border-color:#61a9e0}.vuecal--rounded-theme.vuecal--blue-theme .vuecal__cell--highlighted:not(.vuecal__cell--has-splits),.vuecal--rounded-theme.vuecal--blue-theme .vuecal__cell-split--highlighted{background-color:#00a5bc0f}.vuecal--date-picker .vuecal__title-bar{font-size:1.2em}.vuecal--date-picker .vuecal__heading{height:2.2em;font-weight:500;opacity:.4}.vuecal--date-picker .vuecal__weekdays-headings{border:none}.vuecal--date-picker .vuecal__body{margin-left:1px}.vuecal--date-picker .vuecal__cell,.vuecal--date-picker .vuecal__cell:before{background:none;border:none}.vuecal--date-picker .vuecal__cell-content{height:26px;flex-grow:0;border:1px solid transparent;border-radius:25px;transition:background-color .2s cubic-bezier(.39,.58,.57,1)}.vuecal--date-picker.vuecal--years-view .vuecal__cell-content{flex:0;padding:0 4px;height:24px}.vuecal--date-picker.vuecal--year-view .vuecal__cell-content{flex:0;padding:0 15px}.vuecal--date-picker.vuecal--month-view .vuecal__cell-content{width:26px}.vuecal--date-picker:not(.vuecal--day-view) .vuecal__cell-content:hover{background-color:#0000001a}.vuecal--date-picker:not(.vuecal--day-view) .vuecal__cell--selected .vuecal__cell-content{background-color:#42b982;color:#fff}.vuecal--date-picker:not(.vuecal--day-view) .vuecal__cell--current .vuecal__cell-content,.vuecal--date-picker:not(.vuecal--day-view) .vuecal__cell--today .vuecal__cell-content{border-color:#42b982}\n", ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-12.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12.use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-12.use[3]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/Appointment/Appointment.vue?vue&type=style&index=0&id=22db5e22&lang=scss&scoped=true":
/*!******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-12.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12.use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-12.use[3]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/Appointment/Appointment.vue?vue&type=style&index=0&id=22db5e22&lang=scss&scoped=true ***!
  \******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../../../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_clonedRuleSet_12_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_12_use_2_node_modules_sass_loader_dist_cjs_js_clonedRuleSet_12_use_3_node_modules_vue_loader_lib_index_js_vue_loader_options_Appointment_vue_vue_type_style_index_0_id_22db5e22_lang_scss_scoped_true__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !!../../../../../../node_modules/css-loader/dist/cjs.js??clonedRuleSet-12.use[1]!../../../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12.use[2]!../../../../../../node_modules/sass-loader/dist/cjs.js??clonedRuleSet-12.use[3]!../../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Appointment.vue?vue&type=style&index=0&id=22db5e22&lang=scss&scoped=true */ "./node_modules/css-loader/dist/cjs.js??clonedRuleSet-12.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12.use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-12.use[3]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/Appointment/Appointment.vue?vue&type=style&index=0&id=22db5e22&lang=scss&scoped=true");

            

var options = {};

options.insert = "head";
options.singleton = false;

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_clonedRuleSet_12_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_12_use_2_node_modules_sass_loader_dist_cjs_js_clonedRuleSet_12_use_3_node_modules_vue_loader_lib_index_js_vue_loader_options_Appointment_vue_vue_type_style_index_0_id_22db5e22_lang_scss_scoped_true__WEBPACK_IMPORTED_MODULE_1__["default"], options);



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_clonedRuleSet_12_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_12_use_2_node_modules_sass_loader_dist_cjs_js_clonedRuleSet_12_use_3_node_modules_vue_loader_lib_index_js_vue_loader_options_Appointment_vue_vue_type_style_index_0_id_22db5e22_lang_scss_scoped_true__WEBPACK_IMPORTED_MODULE_1__["default"].locals || {});

/***/ }),

/***/ "./node_modules/vue-cal/dist/vuecal.css":
/*!**********************************************!*\
  !*** ./node_modules/vue-cal/dist/vuecal.css ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _css_loader_dist_cjs_js_clonedRuleSet_9_use_1_postcss_loader_dist_cjs_js_clonedRuleSet_9_use_2_vuecal_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !!../../css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!../../postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./vuecal.css */ "./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-cal/dist/vuecal.css");

            

var options = {};

options.insert = "head";
options.singleton = false;

var update = _style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_css_loader_dist_cjs_js_clonedRuleSet_9_use_1_postcss_loader_dist_cjs_js_clonedRuleSet_9_use_2_vuecal_css__WEBPACK_IMPORTED_MODULE_1__["default"], options);



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_css_loader_dist_cjs_js_clonedRuleSet_9_use_1_postcss_loader_dist_cjs_js_clonedRuleSet_9_use_2_vuecal_css__WEBPACK_IMPORTED_MODULE_1__["default"].locals || {});

/***/ }),

/***/ "./node_modules/vue-cal/dist/vue-cal.es.js":
/*!*************************************************!*\
  !*** ./node_modules/vue-cal/dist/vue-cal.es.js ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ K)
/* harmony export */ });
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.esm.js");
var F = Object.defineProperty;
var B = (e, t, i) => t in e ? F(e, t, { enumerable: !0, configurable: !0, writable: !0, value: i }) : e[t] = i;
var f = (e, t, i) => (B(e, typeof t != "symbol" ? t + "" : t, i), i);

/**
  * vue-cal v3.11.0
  * (c) 2022 Antoni Andre <antoniandre.web@gmail.com>
  * @license MIT
  */
let T, V, A, y, S = {}, M = {};
class N {
  constructor(t) {
    f(this, "_vuecal", null);
    f(this, "selectCell", (t = !1, i, n) => {
      this._vuecal.$emit("cell-click", n ? { date: i, split: n } : i), this._vuecal.clickToNavigate || t ? this._vuecal.switchToNarrowerView() : this._vuecal.dblclickToNavigate && "ontouchstart" in window && (this._vuecal.domEvents.dblTapACell.taps++, setTimeout(() => this._vuecal.domEvents.dblTapACell.taps = 0, this._vuecal.domEvents.dblTapACell.timeout), this._vuecal.domEvents.dblTapACell.taps >= 2 && (this._vuecal.domEvents.dblTapACell.taps = 0, this._vuecal.switchToNarrowerView(), this._vuecal.$emit("cell-dblclick", n ? { date: i, split: n } : i)));
    });
    f(this, "keyPressEnterCell", (t, i) => {
      this._vuecal.$emit("cell-keypress-enter", i ? { date: t, split: i } : t), this._vuecal.switchToNarrowerView();
    });
    f(this, "getPosition", (t) => {
      const { left: i, top: n } = this._vuecal.$refs.cells.getBoundingClientRect(), { clientX: s, clientY: a } = "ontouchstart" in window && t.touches ? t.touches[0] : t;
      return { x: s - i, y: a - n };
    });
    f(this, "minutesAtCursor", (t) => {
      let i = 0, n = { x: 0, y: 0 };
      const { timeStep: s, timeCellHeight: a, timeFrom: r } = this._vuecal.$props;
      return typeof t == "number" ? i = t : typeof t == "object" && (n = this.getPosition(t), i = Math.round(n.y * s / parseInt(a) + r)), { minutes: Math.max(Math.min(i, 1440), 0), cursorCoords: n };
    });
    this._vuecal = t;
  }
}
let h, v, x;
class I {
  constructor(t, i) {
    f(this, "_vuecal", null);
    f(this, "eventDefaults", { _eid: null, start: "", startTimeMinutes: 0, end: "", endTimeMinutes: 0, title: "", content: "", background: !1, allDay: !1, segments: null, repeat: null, daysCount: 1, deletable: !0, deleting: !1, titleEditable: !0, resizable: !0, resizing: !1, draggable: !0, dragging: !1, draggingStatic: !1, focused: !1, class: "" });
    this._vuecal = t, h = i;
  }
  createAnEvent(t, i, n) {
    if (typeof t == "string" && (t = h.stringToDate(t)), !(t instanceof Date))
      return !1;
    const s = h.dateToMinutes(t), a = s + (i = 1 * i || 120), r = h.addMinutes(new Date(t), i);
    n.end && (typeof n.end == "string" && (n.end = h.stringToDate(n.end)), n.endTimeMinutes = h.dateToMinutes(n.end));
    const l = { ...this.eventDefaults, _eid: `${this._vuecal._uid}_${this._vuecal.eventIdIncrement++}`, start: t, startTimeMinutes: s, end: r, endTimeMinutes: a, segments: null, ...n };
    return typeof this._vuecal.onEventCreate != "function" || this._vuecal.onEventCreate(l, () => this.deleteAnEvent(l)) ? (l.startDateF !== l.endDateF && (l.daysCount = h.countDays(l.start, l.end)), this._vuecal.mutableEvents.push(l), this._vuecal.addEventsToView([l]), this._vuecal.emitWithEvent("event-create", l), this._vuecal.$emit("event-change", { event: this._vuecal.cleanupEvent(l), originalEvent: null }), l) : void 0;
  }
  addEventSegment(t) {
    t.segments || (vue__WEBPACK_IMPORTED_MODULE_0__["default"].set(t, "segments", {}), vue__WEBPACK_IMPORTED_MODULE_0__["default"].set(t.segments, h.formatDateLite(t.start), { start: t.start, startTimeMinutes: t.startTimeMinutes, endTimeMinutes: 1440, isFirstDay: !0, isLastDay: !1 }));
    const i = t.segments[h.formatDateLite(t.end)];
    i && (i.isLastDay = !1, i.endTimeMinutes = 1440);
    const n = h.addDays(t.end, 1), s = h.formatDateLite(n);
    return n.setHours(0, 0, 0, 0), vue__WEBPACK_IMPORTED_MODULE_0__["default"].set(t.segments, s, { start: n, startTimeMinutes: 0, endTimeMinutes: t.endTimeMinutes, isFirstDay: !1, isLastDay: !0 }), t.end = h.addMinutes(n, t.endTimeMinutes), t.daysCount = Object.keys(t.segments).length, s;
  }
  removeEventSegment(t) {
    let i = Object.keys(t.segments).length;
    if (i <= 1)
      return h.formatDateLite(t.end);
    vue__WEBPACK_IMPORTED_MODULE_0__["default"].delete(t.segments, h.formatDateLite(t.end)), i--;
    const n = h.subtractDays(t.end, 1), s = h.formatDateLite(n), a = t.segments[s];
    return i ? a && (a.isLastDay = !0, a.endTimeMinutes = t.endTimeMinutes) : t.segments = null, t.daysCount = i || 1, t.end = n, s;
  }
  createEventSegments(t, i, n) {
    const s = i.getTime(), a = n.getTime();
    let r, l, o, d = t.start.getTime(), u = t.end.getTime(), c = !1;
    for (t.end.getHours() || t.end.getMinutes() || (u -= 1e3), vue__WEBPACK_IMPORTED_MODULE_0__["default"].set(t, "segments", {}), t.repeat ? (r = s, l = Math.min(a, t.repeat.until ? h.stringToDate(t.repeat.until).getTime() : a)) : (r = Math.max(s, d), l = Math.min(a, u)); r <= l; ) {
      let m = !1;
      const D = h.addDays(new Date(r), 1).setHours(0, 0, 0, 0);
      let p, g, _, w;
      if (t.repeat) {
        const k = new Date(r), C = h.formatDateLite(k);
        (c || t.occurrences && t.occurrences[C]) && (c || (d = t.occurrences[C].start, o = new Date(d).setHours(0, 0, 0, 0), u = t.occurrences[C].end), c = !0, m = !0), p = r === o, g = C === h.formatDateLite(new Date(u)), _ = new Date(p ? d : r), w = h.formatDateLite(_), g && (c = !1);
      } else
        m = !0, p = r === d, g = l === u && D > l, _ = p ? t.start : new Date(r), w = h.formatDateLite(p ? t.start : _);
      m && vue__WEBPACK_IMPORTED_MODULE_0__["default"].set(t.segments, w, { start: _, startTimeMinutes: p ? t.startTimeMinutes : 0, endTimeMinutes: g ? t.endTimeMinutes : 1440, isFirstDay: p, isLastDay: g }), r = D;
    }
    return t;
  }
  deleteAnEvent(t) {
    this._vuecal.emitWithEvent("event-delete", t), this._vuecal.mutableEvents = this._vuecal.mutableEvents.filter((i) => i._eid !== t._eid), this._vuecal.view.events = this._vuecal.view.events.filter((i) => i._eid !== t._eid);
  }
  checkCellOverlappingEvents(t, i) {
    x = t.slice(0), v = {}, t.forEach((s) => {
      x.shift(), v[s._eid] || vue__WEBPACK_IMPORTED_MODULE_0__["default"].set(v, s._eid, { overlaps: [], start: s.start, position: 0 }), v[s._eid].position = 0, x.forEach((a) => {
        v[a._eid] || vue__WEBPACK_IMPORTED_MODULE_0__["default"].set(v, a._eid, { overlaps: [], start: a.start, position: 0 });
        const r = this.eventInRange(a, s.start, s.end), l = i.overlapsPerTimeStep ? h.datesInSameTimeStep(s.start, a.start, i.timeStep) : 1;
        if (s.background || s.allDay || a.background || a.allDay || !r || !l) {
          let o, d;
          (o = (v[s._eid] || { overlaps: [] }).overlaps.indexOf(a._eid)) > -1 && v[s._eid].overlaps.splice(o, 1), (d = (v[a._eid] || { overlaps: [] }).overlaps.indexOf(s._eid)) > -1 && v[a._eid].overlaps.splice(d, 1), v[a._eid].position--;
        } else
          v[s._eid].overlaps.push(a._eid), v[s._eid].overlaps = [...new Set(v[s._eid].overlaps)], v[a._eid].overlaps.push(s._eid), v[a._eid].overlaps = [...new Set(v[a._eid].overlaps)], v[a._eid].position++;
      });
    });
    let n = 0;
    for (const s in v) {
      const a = v[s], r = a.overlaps.map((l) => ({ id: l, start: v[l].start }));
      r.push({ id: s, start: a.start }), r.sort((l, o) => l.start < o.start ? -1 : l.start > o.start ? 1 : l.id > o.id ? -1 : 1), a.position = r.findIndex((l) => l.id === s), n = Math.max(this.getOverlapsStreak(a, v), n);
    }
    return [v, n];
  }
  getOverlapsStreak(t, i = {}) {
    let n = t.overlaps.length + 1, s = [];
    return t.overlaps.forEach((a) => {
      s.includes(a) || t.overlaps.filter((r) => r !== a).forEach((r) => {
        i[r].overlaps.includes(a) || s.push(r);
      });
    }), s = [...new Set(s)], n -= s.length, n;
  }
  eventInRange(t, i, n) {
    if (t.allDay || !this._vuecal.time) {
      const r = new Date(t.start).setHours(0, 0, 0, 0);
      return new Date(t.end).setHours(23, 59, 0, 0) >= new Date(i).setHours(0, 0, 0, 0) && r <= new Date(n).setHours(0, 0, 0, 0);
    }
    const s = t.start.getTime(), a = t.end.getTime();
    return s < n.getTime() && a > i.getTime();
  }
}
function E(e, t, i, n, s, a, r, l) {
  var o, d = typeof e == "function" ? e.options : e;
  if (t && (d.render = t, d.staticRenderFns = i, d._compiled = !0), n && (d.functional = !0), a && (d._scopeId = "data-v-" + a), r ? (o = function(m) {
    (m = m || this.$vnode && this.$vnode.ssrContext || this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) || typeof __VUE_SSR_CONTEXT__ > "u" || (m = __VUE_SSR_CONTEXT__), s && s.call(this, m), m && m._registeredComponents && m._registeredComponents.add(r);
  }, d._ssrRegister = o) : s && (o = l ? function() {
    s.call(this, (d.functional ? this.parent : this).$root.$options.shadowRoot);
  } : s), o)
    if (d.functional) {
      d._injectStyles = o;
      var u = d.render;
      d.render = function(m, D) {
        return o.call(D), u(m, D);
      };
    } else {
      var c = d.beforeCreate;
      d.beforeCreate = c ? [].concat(c, o) : [o];
    }
  return { exports: e, options: d };
}
const j = E({ inject: ["vuecal", "utils", "view"], props: { transitionDirection: { type: String, default: "right" }, weekDays: { type: Array, default: () => [] }, switchToNarrowerView: { type: Function, default: () => {
} } }, methods: { selectCell(e, t) {
  e.getTime() !== this.view.selectedDate.getTime() && (this.view.selectedDate = e), this.utils.cell.selectCell(!1, e, t);
}, cleanupHeading: (e) => ({ label: e.full, date: e.date, ...e.today ? { today: e.today } : {} }) }, computed: { headings() {
  if (!["month", "week"].includes(this.view.id))
    return [];
  let e = !1;
  return this.weekDays.map((t, i) => {
    const n = this.utils.date.addDays(this.view.startDate, this.vuecal.startWeekOnSunday ? i - 1 : i);
    return { hide: t.hide, full: t.label, small: t.short || t.label.substr(0, 3), xsmall: t.short || t.label.substr(0, 1), ...this.view.id === "week" ? { dayOfMonth: n.getDate(), date: n, today: !e && this.utils.date.isToday(n) && !e++ } : {} };
  });
}, cellWidth() {
  return 100 / (7 - this.weekDays.reduce((e, t) => e + t.hide, 0));
}, weekdayCellStyles() {
  return { ...this.vuecal.hideWeekdays.length ? { width: `${this.cellWidth}%` } : {} };
}, cellHeadingsClickable() {
  return this.view.id === "week" && (this.vuecal.clickToNavigate || this.vuecal.dblclickToNavigate);
} } }, function() {
  var e = this, t = e._self._c;
  return t("div", { staticClass: "vuecal__flex vuecal__weekdays-headings" }, [e._l(e.headings, function(i, n) {
    return [i.hide ? e._e() : t("div", { key: n, staticClass: "vuecal__flex vuecal__heading", class: { today: i.today, clickable: e.cellHeadingsClickable }, style: e.weekdayCellStyles, on: { click: function(s) {
      e.view.id === "week" && e.selectCell(i.date, s);
    }, dblclick: function(s) {
      e.view.id === "week" && e.vuecal.dblclickToNavigate && e.switchToNarrowerView();
    } } }, [t("transition", { attrs: { name: `slide-fade--${e.transitionDirection}`, appear: e.vuecal.transitions } }, [t("div", { key: !!e.vuecal.transitions && `${n}-${i.dayOfMonth}`, staticClass: "vuecal__flex", attrs: { column: "" } }, [t("div", { staticClass: "vuecal__flex weekday-label", attrs: { grow: "" } }, [e._t("weekday-heading", function() {
      return [t("span", { staticClass: "full" }, [e._v(e._s(i.full))]), t("span", { staticClass: "small" }, [e._v(e._s(i.small))]), t("span", { staticClass: "xsmall" }, [e._v(e._s(i.xsmall))]), i.dayOfMonth ? t("span", [e._v("\xA0" + e._s(i.dayOfMonth))]) : e._e()];
    }, { heading: e.cleanupHeading(i), view: e.view })], 2), e.vuecal.hasSplits && e.vuecal.stickySplitLabels ? t("div", { staticClass: "vuecal__flex vuecal__split-days-headers", attrs: { grow: "" } }, e._l(e.vuecal.daySplits, function(s, a) {
      return t("div", { key: a, staticClass: "day-split-header", class: s.class || !1 }, [e._t("split-label", function() {
        return [e._v(e._s(s.label))];
      }, { split: s, view: e.view })], 2);
    }), 0) : e._e()])])], 1)];
  })], 2);
}, [], !1, null, null, null, null).exports, P = E({ inject: ["vuecal", "previous", "next", "switchView", "updateSelectedDate", "modules", "view"], components: { WeekdaysHeadings: j }, props: { options: { type: Object, default: () => ({}) }, editEvents: { type: Object, required: !0 }, hasSplits: { type: [Boolean, Number], default: !1 }, daySplits: { type: Array, default: () => [] }, viewProps: { type: Object, default: () => ({}) }, weekDays: { type: Array, default: () => [] }, switchToNarrowerView: { type: Function, default: () => {
} } }, data: () => ({ highlightedControl: null }), methods: { goToToday() {
  this.updateSelectedDate(new Date(new Date().setHours(0, 0, 0, 0)));
}, switchToBroaderView() {
  this.transitionDirection = "left", this.broaderView && this.switchView(this.broaderView);
} }, computed: { transitionDirection: { get() {
  return this.vuecal.transitionDirection;
}, set(e) {
  this.vuecal.transitionDirection = e;
} }, broaderView() {
  const { enabledViews: e } = this.vuecal;
  return e[e.indexOf(this.view.id) - 1];
}, showDaySplits() {
  return this.view.id === "day" && this.hasSplits && this.options.stickySplitLabels && !this.options.minSplitWidth;
}, dnd() {
  return this.modules.dnd;
} } }, function() {
  var e = this, t = e._self._c;
  return t("div", { staticClass: "vuecal__header" }, [e.options.hideViewSelector ? e._e() : t("div", { staticClass: "vuecal__flex vuecal__menu", attrs: { role: "tablist", "aria-label": "Calendar views navigation" } }, [e._l(e.viewProps.views, function(i, n) {
    return [i.enabled ? t("button", { key: n, staticClass: "vuecal__view-btn", class: { "vuecal__view-btn--active": e.view.id === n, "vuecal__view-btn--highlighted": e.highlightedControl === n }, attrs: { type: "button", "aria-label": `${i.label} view` }, on: { dragenter: function(s) {
      e.editEvents.drag && e.dnd && e.dnd.viewSelectorDragEnter(s, n, e.$data);
    }, dragleave: function(s) {
      e.editEvents.drag && e.dnd && e.dnd.viewSelectorDragLeave(s, n, e.$data);
    }, click: function(s) {
      return e.switchView(n, null, !0);
    } } }, [e._v(e._s(i.label))]) : e._e()];
  })], 2), e.options.hideTitleBar ? e._e() : t("div", { staticClass: "vuecal__title-bar" }, [t("button", { staticClass: "vuecal__arrow vuecal__arrow--prev", class: { "vuecal__arrow--highlighted": e.highlightedControl === "previous" }, attrs: { type: "button", "aria-label": `Previous ${e.view.id}` }, on: { click: e.previous, dragenter: function(i) {
    e.editEvents.drag && e.dnd && e.dnd.viewSelectorDragEnter(i, "previous", e.$data);
  }, dragleave: function(i) {
    e.editEvents.drag && e.dnd && e.dnd.viewSelectorDragLeave(i, "previous", e.$data);
  } } }, [e._t("arrow-prev")], 2), t("div", { staticClass: "vuecal__flex vuecal__title", attrs: { grow: "" } }, [t("transition", { attrs: { name: e.options.transitions ? `slide-fade--${e.transitionDirection}` : "" } }, [t(e.broaderView ? "button" : "span", { key: `${e.view.id}${e.view.startDate.toString()}`, tag: "component", attrs: { type: !!e.broaderView && "button", "aria-label": !!e.broaderView && `Go to ${e.broaderView} view` }, on: { click: function(i) {
    e.broaderView && e.switchToBroaderView();
  } } }, [e._t("title")], 2)], 1)], 1), e.options.todayButton ? t("button", { staticClass: "vuecal__today-btn", class: { "vuecal__today-btn--highlighted": e.highlightedControl === "today" }, attrs: { type: "button", "aria-label": "Today" }, on: { click: e.goToToday, dragenter: function(i) {
    e.editEvents.drag && e.dnd && e.dnd.viewSelectorDragEnter(i, "today", e.$data);
  }, dragleave: function(i) {
    e.editEvents.drag && e.dnd && e.dnd.viewSelectorDragLeave(i, "today", e.$data);
  } } }, [e._t("today-button")], 2) : e._e(), t("button", { staticClass: "vuecal__arrow vuecal__arrow--next", class: { "vuecal__arrow--highlighted": e.highlightedControl === "next" }, attrs: { type: "button", "aria-label": `Next ${e.view.id}` }, on: { click: e.next, dragenter: function(i) {
    e.editEvents.drag && e.dnd && e.dnd.viewSelectorDragEnter(i, "next", e.$data);
  }, dragleave: function(i) {
    e.editEvents.drag && e.dnd && e.dnd.viewSelectorDragLeave(i, "next", e.$data);
  } } }, [e._t("arrow-next")], 2)]), e.viewProps.weekDaysInHeader ? t("weekdays-headings", { attrs: { "week-days": e.weekDays, "transition-direction": e.transitionDirection, "switch-to-narrower-view": e.switchToNarrowerView }, scopedSlots: e._u([e.$scopedSlots["weekday-heading"] ? { key: "weekday-heading", fn: function({ heading: i, view: n }) {
    return [e._t("weekday-heading", null, { heading: i, view: n })];
  } } : null, e.$scopedSlots["split-label"] ? { key: "split-label", fn: function({ split: i }) {
    return [e._t("split-label", null, { split: i, view: e.view })];
  } } : null], null, !0) }) : e._e(), t("transition", { attrs: { name: `slide-fade--${e.transitionDirection}` } }, [e.showDaySplits ? t("div", { staticClass: "vuecal__flex vuecal__split-days-headers" }, e._l(e.daySplits, function(i, n) {
    return t("div", { key: n, staticClass: "day-split-header", class: i.class || !1 }, [e._t("split-label", function() {
      return [e._v(e._s(i.label))];
    }, { split: i, view: e.view.id })], 2);
  }), 0) : e._e()])], 1);
}, [], !1, null, null, null, null).exports, Y = E({ inject: ["vuecal", "utils", "modules", "view", "domEvents"], components: { Event: E({ inject: ["vuecal", "utils", "modules", "view", "domEvents", "editEvents"], props: { cellFormattedDate: { type: String, default: "" }, event: { type: Object, default: () => ({}) }, cellEvents: { type: Array, default: () => [] }, overlaps: { type: Array, default: () => [] }, eventPosition: { type: Number, default: 0 }, overlapsStreak: { type: Number, default: 0 }, allDay: { type: Boolean, default: !1 } }, data: () => ({ touch: { dragThreshold: 30, startX: 0, startY: 0, dragged: !1 } }), methods: { onMouseDown(e, t = !1) {
  if ("ontouchstart" in window && !t)
    return !1;
  const { clickHoldAnEvent: i, focusAnEvent: n, resizeAnEvent: s, dragAnEvent: a } = this.domEvents;
  if (n._eid === this.event._eid && i._eid === this.event._eid)
    return !0;
  this.focusEvent(), i._eid = null, this.vuecal.editEvents.delete && this.event.deletable && (i.timeoutId = setTimeout(() => {
    s._eid || a._eid || (i._eid = this.event._eid, this.event.deleting = !0);
  }, i.timeout));
}, onMouseUp(e) {
  this.domEvents.focusAnEvent._eid !== this.event._eid || this.touch.dragged || (this.domEvents.focusAnEvent.mousedUp = !0), this.touch.dragged = !1;
}, onMouseEnter(e) {
  e.preventDefault(), this.vuecal.emitWithEvent("event-mouse-enter", this.event);
}, onMouseLeave(e) {
  e.preventDefault(), this.vuecal.emitWithEvent("event-mouse-leave", this.event);
}, onTouchMove(e) {
  if (typeof this.vuecal.onEventClick != "function")
    return;
  const { clientX: t, clientY: i } = e.touches[0], { startX: n, startY: s, dragThreshold: a } = this.touch;
  (Math.abs(t - n) > a || Math.abs(i - s) > a) && (this.touch.dragged = !0);
}, onTouchStart(e) {
  this.touch.startX = e.touches[0].clientX, this.touch.startY = e.touches[0].clientY, this.onMouseDown(e, !0);
}, onEnterKeypress(e) {
  if (typeof this.vuecal.onEventClick == "function")
    return this.vuecal.onEventClick(this.event, e);
}, onDblClick(e) {
  if (typeof this.vuecal.onEventDblclick == "function")
    return this.vuecal.onEventDblclick(this.event, e);
}, onDragStart(e) {
  this.dnd && this.dnd.eventDragStart(e, this.event);
}, onDragEnd() {
  this.dnd && this.dnd.eventDragEnd(this.event);
}, onResizeHandleMouseDown() {
  this.focusEvent(), this.domEvents.dragAnEvent._eid = null, this.domEvents.resizeAnEvent = Object.assign(this.domEvents.resizeAnEvent, { _eid: this.event._eid, start: (this.segment || this.event).start, split: this.event.split || null, segment: !!this.segment && this.utils.date.formatDateLite(this.segment.start), originalEnd: new Date((this.segment || this.event).end), originalEndTimeMinutes: this.event.endTimeMinutes }), this.event.resizing = !0;
}, deleteEvent(e = !1) {
  if ("ontouchstart" in window && !e)
    return !1;
  this.utils.event.deleteAnEvent(this.event);
}, touchDeleteEvent(e) {
  this.deleteEvent(!0);
}, cancelDeleteEvent() {
  this.event.deleting = !1;
}, focusEvent() {
  const { focusAnEvent: e } = this.domEvents, t = e._eid;
  if (t !== this.event._eid) {
    if (t) {
      const i = this.view.events.find((n) => n._eid === t);
      i && (i.focused = !1);
    }
    this.vuecal.cancelDelete(), this.vuecal.emitWithEvent("event-focus", this.event), e._eid = this.event._eid, this.event.focused = !0;
  }
} }, computed: { eventDimensions() {
  const { startTimeMinutes: e, endTimeMinutes: t } = this.segment || this.event;
  let i = e - this.vuecal.timeFrom;
  const n = Math.max(Math.round(i * this.vuecal.timeCellHeight / this.vuecal.timeStep), 0);
  i = Math.min(t, this.vuecal.timeTo) - this.vuecal.timeFrom;
  const s = Math.round(i * this.vuecal.timeCellHeight / this.vuecal.timeStep);
  return { top: n, height: Math.max(s - n, 5) };
}, eventStyles() {
  if (this.event.allDay || !this.vuecal.time || !this.event.endTimeMinutes || this.view.id === "month" || this.allDay)
    return {};
  let e = 100 / Math.min(this.overlaps.length + 1, this.overlapsStreak), t = 100 / (this.overlaps.length + 1) * this.eventPosition;
  this.vuecal.minEventWidth && e < this.vuecal.minEventWidth && (e = this.vuecal.minEventWidth, t = (100 - this.vuecal.minEventWidth) / this.overlaps.length * this.eventPosition);
  const { top: i, height: n } = this.eventDimensions;
  return { top: `${i}px`, height: `${n}px`, width: `${e}%`, left: this.event.left && `${this.event.left}px` || `${t}%` };
}, eventClasses() {
  const { isFirstDay: e, isLastDay: t } = this.segment || {};
  return { [this.event.class]: !!this.event.class, "vuecal__event--focus": this.event.focused, "vuecal__event--resizing": this.event.resizing, "vuecal__event--background": this.event.background, "vuecal__event--deletable": this.event.deleting, "vuecal__event--all-day": this.event.allDay, "vuecal__event--dragging": !this.event.draggingStatic && this.event.dragging, "vuecal__event--static": this.event.dragging && this.event.draggingStatic, "vuecal__event--multiple-days": !!this.segment, "event-start": this.segment && e && !t, "event-middle": this.segment && !e && !t, "event-end": this.segment && t && !e };
}, segment() {
  return this.event.segments && this.event.segments[this.cellFormattedDate] || null;
}, draggable() {
  const { draggable: e, background: t, daysCount: i } = this.event;
  return this.vuecal.editEvents.drag && e && !t && i === 1;
}, resizable() {
  const { editEvents: e, time: t } = this.vuecal;
  return e.resize && this.event.resizable && t && !this.allDay && (!this.segment || this.segment && this.segment.isLastDay) && this.view.id !== "month";
}, dnd() {
  return this.modules.dnd;
} } }, function() {
  var e = this, t = e._self._c;
  return t("div", { staticClass: "vuecal__event", class: e.eventClasses, style: e.eventStyles, attrs: { tabindex: "0", draggable: e.draggable }, on: { focus: e.focusEvent, keypress: function(i) {
    return !i.type.indexOf("key") && e._k(i.keyCode, "enter", 13, i.key, "Enter") ? null : (i.stopPropagation(), e.onEnterKeypress.apply(null, arguments));
  }, mouseenter: e.onMouseEnter, mouseleave: e.onMouseLeave, touchstart: function(i) {
    return i.stopPropagation(), e.onTouchStart.apply(null, arguments);
  }, mousedown: function(i) {
    e.onMouseDown(i);
  }, mouseup: e.onMouseUp, touchend: e.onMouseUp, touchmove: e.onTouchMove, dblclick: e.onDblClick, dragstart: function(i) {
    e.draggable && e.onDragStart(i);
  }, dragend: function(i) {
    e.draggable && e.onDragEnd();
  } } }, [e.vuecal.editEvents.delete && e.event.deletable ? t("div", { staticClass: "vuecal__event-delete", on: { click: function(i) {
    return i.stopPropagation(), e.deleteEvent.apply(null, arguments);
  }, touchstart: function(i) {
    return i.stopPropagation(), e.touchDeleteEvent.apply(null, arguments);
  } } }, [e._v(e._s(e.vuecal.texts.deleteEvent))]) : e._e(), e._t("event", null, { event: e.event, view: e.view.id }), e.resizable ? t("div", { staticClass: "vuecal__event-resize-handle", attrs: { contenteditable: "false" }, on: { mousedown: function(i) {
    return i.stopPropagation(), i.preventDefault(), e.onResizeHandleMouseDown.apply(null, arguments);
  }, touchstart: function(i) {
    return i.stopPropagation(), i.preventDefault(), e.onResizeHandleMouseDown.apply(null, arguments);
  } } }) : e._e()], 2);
}, [], !1, null, null, null, null).exports }, props: { options: { type: Object, default: () => ({}) }, editEvents: { type: Object, required: !0 }, data: { type: Object, required: !0 }, cellSplits: { type: Array, default: () => [] }, minTimestamp: { type: [Number, null], default: null }, maxTimestamp: { type: [Number, null], default: null }, cellWidth: { type: [Number, Boolean], default: !1 }, allDay: { type: Boolean, default: !1 } }, data: () => ({ cellOverlaps: {}, cellOverlapsStreak: 1, timeAtCursor: null, highlighted: !1, highlightedSplit: null }), methods: { getSplitAtCursor({ target: e }) {
  let t = e.classList.contains("vuecal__cell-split") ? e : this.vuecal.findAncestor(e, "vuecal__cell-split");
  return t && (t = t.attributes["data-split"].value, parseInt(t).toString() === t.toString() && (t = parseInt(t))), t || null;
}, splitClasses(e) {
  return { "vuecal__cell-split": !0, "vuecal__cell-split--highlighted": this.highlightedSplit === e.id, [e.class]: !!e.class };
}, checkCellOverlappingEvents() {
  this.options.time && this.eventsCount && !this.splitsCount && (this.eventsCount === 1 ? (this.cellOverlaps = [], this.cellOverlapsStreak = 1) : [this.cellOverlaps, this.cellOverlapsStreak] = this.utils.event.checkCellOverlappingEvents(this.events, this.options));
}, isDOMElementAnEvent(e) {
  return this.vuecal.isDOMElementAnEvent(e);
}, selectCell(e, t = !1) {
  const i = this.splitsCount ? this.getSplitAtCursor(e) : null;
  this.utils.cell.selectCell(t, this.timeAtCursor, i), this.timeAtCursor = null;
}, onCellkeyPressEnter(e) {
  this.isSelected || this.onCellFocus(e);
  const t = this.splitsCount ? this.getSplitAtCursor(e) : null;
  this.utils.cell.keyPressEnterCell(this.timeAtCursor, t), this.timeAtCursor = null;
}, onCellFocus(e) {
  if (!this.isSelected && !this.isDisabled) {
    this.isSelected = this.data.startDate;
    const t = this.splitsCount ? this.getSplitAtCursor(e) : null, i = this.timeAtCursor || this.data.startDate;
    this.vuecal.$emit("cell-focus", t ? { date: i, split: t } : i);
  }
}, onCellMouseDown(e, t = null, i = !1) {
  if ("ontouchstart" in window && !i)
    return !1;
  this.isSelected || this.onCellFocus(e);
  const { clickHoldACell: n, focusAnEvent: s } = this.domEvents;
  this.domEvents.cancelClickEventCreation = !1, n.eventCreated = !1, this.timeAtCursor = new Date(this.data.startDate);
  const { minutes: a, cursorCoords: { y: r } } = this.vuecal.minutesAtCursor(e);
  this.timeAtCursor.setMinutes(a);
  const l = this.isDOMElementAnEvent(e.target);
  !l && s._eid && ((this.view.events.find((o) => o._eid === s._eid) || {}).focused = !1), this.editEvents.create && !l && this.setUpEventCreation(e, r);
}, setUpEventCreation(e, t) {
  if (this.options.dragToCreateEvent && ["week", "day"].includes(this.view.id)) {
    const { dragCreateAnEvent: i } = this.domEvents;
    if (i.startCursorY = t, i.split = this.splitsCount ? this.getSplitAtCursor(e) : null, i.start = this.timeAtCursor, this.options.snapToTime) {
      let n = 60 * this.timeAtCursor.getHours() + this.timeAtCursor.getMinutes();
      const s = n + this.options.snapToTime / 2;
      n = s - s % this.options.snapToTime, i.start.setHours(0, n, 0, 0);
    }
  } else
    this.options.cellClickHold && ["month", "week", "day"].includes(this.view.id) && this.setUpCellHoldTimer(e);
}, setUpCellHoldTimer(e) {
  const { clickHoldACell: t } = this.domEvents;
  t.cellId = `${this.vuecal._uid}_${this.data.formattedDate}`, t.split = this.splitsCount ? this.getSplitAtCursor(e) : null, t.timeoutId = setTimeout(() => {
    if (t.cellId && !this.domEvents.cancelClickEventCreation) {
      const { _eid: i } = this.utils.event.createAnEvent(this.timeAtCursor, null, t.split ? { split: t.split } : {});
      t.eventCreated = i;
    }
  }, t.timeout);
}, onCellTouchStart(e, t = null) {
  this.onCellMouseDown(e, t, !0);
}, onCellClick(e) {
  this.isDOMElementAnEvent(e.target) || this.selectCell(e);
}, onCellDblClick(e) {
  const t = new Date(this.data.startDate);
  t.setMinutes(this.vuecal.minutesAtCursor(e).minutes);
  const i = this.splitsCount ? this.getSplitAtCursor(e) : null;
  this.vuecal.$emit("cell-dblclick", i ? { date: t, split: i } : t), this.options.dblclickToNavigate && this.vuecal.switchToNarrowerView();
}, onCellContextMenu(e) {
  e.stopPropagation(), e.preventDefault();
  const t = new Date(this.data.startDate), { cursorCoords: i, minutes: n } = this.vuecal.minutesAtCursor(e);
  t.setMinutes(n);
  const s = this.splitsCount ? this.getSplitAtCursor(e) : null;
  this.vuecal.$emit("cell-contextmenu", { date: t, ...i, ...s || {}, e });
} }, computed: { dnd() {
  return this.modules.dnd;
}, nowInMinutes() {
  return this.utils.date.dateToMinutes(this.vuecal.now);
}, isBeforeMinDate() {
  return this.minTimestamp !== null && this.minTimestamp > this.data.endDate.getTime();
}, isAfterMaxDate() {
  return this.maxTimestamp && this.maxTimestamp < this.data.startDate.getTime();
}, isDisabled() {
  const { disableDays: e } = this.options, { isYearsOrYearView: t } = this.vuecal;
  return !(!e.length || !e.includes(this.data.formattedDate) || t) || this.isBeforeMinDate || this.isAfterMaxDate;
}, isSelected: { get() {
  let e = !1;
  const { selectedDate: t } = this.view;
  return e = this.view.id === "years" ? t.getFullYear() === this.data.startDate.getFullYear() : this.view.id === "year" ? t.getFullYear() === this.data.startDate.getFullYear() && t.getMonth() === this.data.startDate.getMonth() : t.getTime() === this.data.startDate.getTime(), e;
}, set(e) {
  this.view.selectedDate = e, this.vuecal.$emit("update:selected-date", this.view.selectedDate);
} }, isWeekOrDayView() {
  return ["week", "day"].includes(this.view.id);
}, transitionDirection() {
  return this.vuecal.transitionDirection;
}, specialHours() {
  return this.data.specialHours.map((e) => {
    let { from: t, to: i } = e;
    return t = Math.max(t, this.options.timeFrom), i = Math.min(i, this.options.timeTo), { ...e, height: (i - t) * this.timeScale, top: (t - this.options.timeFrom) * this.timeScale };
  });
}, events() {
  const { startDate: e, endDate: t } = this.data;
  let i = [];
  if (!["years", "year"].includes(this.view.id) || this.options.eventsCountOnYearView) {
    if (i = this.view.events.slice(0), this.view.id === "month" && i.push(...this.view.outOfScopeEvents), i = i.filter((n) => this.utils.event.eventInRange(n, e, t)), this.options.showAllDayEvents && this.view.id !== "month" && (i = i.filter((n) => !!n.allDay === this.allDay)), this.options.time && this.isWeekOrDayView && !this.allDay) {
      const { timeFrom: n, timeTo: s } = this.options;
      i = i.filter((a) => {
        const r = a.daysCount > 1 && a.segments[this.data.formattedDate] || {}, l = a.daysCount === 1 && a.startTimeMinutes < s && a.endTimeMinutes > n, o = a.daysCount > 1 && r.startTimeMinutes < s && r.endTimeMinutes > n;
        return a.allDay || l || o || !1;
      });
    }
    !this.options.time || !this.isWeekOrDayView || this.options.showAllDayEvents && this.allDay || i.sort((n, s) => n.start < s.start ? -1 : 1), this.cellSplits.length || this.$nextTick(this.checkCellOverlappingEvents);
  }
  return i;
}, eventsCount() {
  return this.events.length;
}, splits() {
  return this.cellSplits.map((e, t) => {
    const i = this.events.filter((a) => a.split === e.id), [n, s] = this.utils.event.checkCellOverlappingEvents(i.filter((a) => !a.background && !a.allDay), this.options);
    return { ...e, overlaps: n, overlapsStreak: s, events: i };
  });
}, splitsCount() {
  return this.splits.length;
}, cellClasses() {
  return { [this.data.class]: !!this.data.class, "vuecal__cell--current": this.data.current, "vuecal__cell--today": this.data.today, "vuecal__cell--out-of-scope": this.data.outOfScope, "vuecal__cell--before-min": this.isDisabled && this.isBeforeMinDate, "vuecal__cell--after-max": this.isDisabled && this.isAfterMaxDate, "vuecal__cell--disabled": this.isDisabled, "vuecal__cell--selected": this.isSelected, "vuecal__cell--highlighted": this.highlighted, "vuecal__cell--has-splits": this.splitsCount, "vuecal__cell--has-events": this.eventsCount };
}, cellStyles() {
  return { ...this.cellWidth ? { width: `${this.cellWidth}%` } : {} };
}, timelineVisible() {
  const { time: e, timeTo: t } = this.options;
  return this.data.today && this.isWeekOrDayView && e && !this.allDay && this.nowInMinutes <= t;
}, todaysTimePosition() {
  if (!this.data.today || !this.options.time)
    return;
  const e = this.nowInMinutes - this.options.timeFrom;
  return Math.round(e * this.timeScale);
}, timeScale() {
  return this.options.timeCellHeight / this.options.timeStep;
} } }, function() {
  var e = this, t = e._self._c;
  return t("transition-group", { staticClass: "vuecal__cell", class: e.cellClasses, style: e.cellStyles, attrs: { name: `slide-fade--${e.transitionDirection}`, tag: "div", appear: e.options.transitions } }, [e._l(e.splitsCount ? e.splits : 1, function(i, n) {
    return t("div", { key: e.options.transitions ? `${e.view.id}-${e.data.content}-${n}` : n, staticClass: "vuecal__flex vuecal__cell-content", class: e.splitsCount && e.splitClasses(i), attrs: { "data-split": !!e.splitsCount && i.id, column: "", tabindex: "0", "aria-label": e.data.content }, on: { focus: function(s) {
      return e.onCellFocus(s);
    }, keypress: function(s) {
      return !s.type.indexOf("key") && e._k(s.keyCode, "enter", 13, s.key, "Enter") ? null : e.onCellkeyPressEnter(s);
    }, touchstart: function(s) {
      !e.isDisabled && e.onCellTouchStart(s, e.splitsCount ? i.id : null);
    }, mousedown: function(s) {
      !e.isDisabled && e.onCellMouseDown(s, e.splitsCount ? i.id : null);
    }, click: function(s) {
      !e.isDisabled && e.onCellClick(s);
    }, dblclick: function(s) {
      !e.isDisabled && e.onCellDblClick(s);
    }, contextmenu: function(s) {
      !e.isDisabled && e.options.cellContextmenu && e.onCellContextMenu(s);
    }, dragenter: function(s) {
      !e.isDisabled && e.editEvents.drag && e.dnd && e.dnd.cellDragEnter(s, e.$data, e.data.startDate);
    }, dragover: function(s) {
      !e.isDisabled && e.editEvents.drag && e.dnd && e.dnd.cellDragOver(s, e.$data, e.data.startDate, e.splitsCount ? i.id : null);
    }, dragleave: function(s) {
      !e.isDisabled && e.editEvents.drag && e.dnd && e.dnd.cellDragLeave(s, e.$data, e.data.startDate);
    }, drop: function(s) {
      !e.isDisabled && e.editEvents.drag && e.dnd && e.dnd.cellDragDrop(s, e.$data, e.data.startDate, e.splitsCount ? i.id : null);
    } } }, [e.options.showTimeInCells && e.options.time && e.isWeekOrDayView && !e.allDay ? t("div", { staticClass: "cell-time-labels" }, e._l(e.vuecal.timeCells, function(s, a) {
      return t("span", { key: a, staticClass: "cell-time-label" }, [e._v(e._s(s.label) + `
`)]);
    }), 0) : e._e(), e.isWeekOrDayView && !e.allDay && e.specialHours.length ? e._l(e.specialHours, function(s, a) {
      return t("div", { staticClass: "vuecal__special-hours", class: `vuecal__special-hours--day${s.day} ${s.class}`, style: `height: ${s.height}px;top: ${s.top}px` }, [s.label ? t("div", { staticClass: "special-hours-label", domProps: { innerHTML: e._s(s.label) } }) : e._e()]);
    }) : e._e(), e._t("cell-content", null, { events: e.events, selectCell: (s) => e.selectCell(s, !0), split: !!e.splitsCount && i }), e.eventsCount && (e.isWeekOrDayView || e.view.id === "month" && e.options.eventsOnMonthView) ? t("div", { staticClass: "vuecal__cell-events" }, e._l(e.splitsCount ? i.events : e.events, function(s, a) {
      return t("event", { key: a, attrs: { "cell-formatted-date": e.data.formattedDate, event: s, "all-day": e.allDay, "cell-events": e.splitsCount ? i.events : e.events, overlaps: ((e.splitsCount ? i.overlaps[s._eid] : e.cellOverlaps[s._eid]) || []).overlaps, "event-position": ((e.splitsCount ? i.overlaps[s._eid] : e.cellOverlaps[s._eid]) || []).position, "overlaps-streak": e.splitsCount ? i.overlapsStreak : e.cellOverlapsStreak }, scopedSlots: e._u([{ key: "event", fn: function({ event: r, view: l }) {
        return [e._t("event", null, { view: l, event: r })];
      } }], null, !0) });
    }), 1) : e._e()], 2);
  }), e.timelineVisible ? t("div", { key: e.options.transitions ? `${e.view.id}-now-line` : "now-line", staticClass: "vuecal__now-line", style: `top: ${e.todaysTimePosition}px`, attrs: { title: e.utils.date.formatTime(e.vuecal.now) } }) : e._e()], 2);
}, [], !1, null, null, null, null).exports, z = E({ inject: ["vuecal", "view", "editEvents"], components: { "vuecal-cell": Y }, props: { options: { type: Object, required: !0 }, cells: { type: Array, required: !0 }, label: { type: String, required: !0 }, daySplits: { type: Array, default: () => [] }, shortEvents: { type: Boolean, default: !0 }, height: { type: String, default: "" }, cellOrSplitMinWidth: { type: Number, default: null } }, computed: { hasCellOrSplitWidth() {
  return !!(this.options.minCellWidth || this.daySplits.length && this.options.minSplitWidth);
} } }, function() {
  var e = this, t = e._self._c;
  return t("div", { staticClass: "vuecal__flex vuecal__all-day", style: e.cellOrSplitMinWidth && { height: e.height } }, [e.cellOrSplitMinWidth ? e._e() : t("div", { staticClass: "vuecal__all-day-text", staticStyle: { width: "3em" } }, [t("span", [e._v(e._s(e.label))])]), t("div", { staticClass: "vuecal__flex vuecal__cells", class: `${e.view.id}-view`, style: e.cellOrSplitMinWidth ? `min-width: ${e.cellOrSplitMinWidth}px` : "", attrs: { grow: "" } }, e._l(e.cells, function(i, n) {
    return t("vuecal-cell", { key: n, attrs: { options: e.options, "edit-events": e.editEvents, data: i, "all-day": !0, "cell-width": e.options.hideWeekdays.length && (e.vuecal.isWeekView || e.vuecal.isMonthView) && e.vuecal.cellWidth, "min-timestamp": e.options.minTimestamp, "max-timestamp": e.options.maxTimestamp, "cell-splits": e.daySplits }, scopedSlots: e._u([{ key: "event", fn: function({ event: s, view: a }) {
      return [e._t("event", null, { view: a, event: s })];
    } }], null, !0) });
  }), 1)]);
}, [], !1, null, null, null, null).exports;
var U = function() {
  var e = this, t = e._self._c;
  return t("div", { ref: "vuecal", staticClass: "vuecal__flex vuecal", class: e.cssClasses, attrs: { column: "", lang: e.locale } }, [t("vuecal-header", { attrs: { options: e.$props, "edit-events": e.editEvents, "view-props": { views: e.views, weekDaysInHeader: e.weekDaysInHeader }, "week-days": e.weekDays, "has-splits": e.hasSplits, "day-splits": e.daySplits, "switch-to-narrower-view": e.switchToNarrowerView }, scopedSlots: e._u([{ key: "arrow-prev", fn: function() {
    return [e._t("arrow-prev", function() {
      return [e._v("\xA0"), t("i", { staticClass: "angle" }), e._v("\xA0")];
    })];
  }, proxy: !0 }, { key: "arrow-next", fn: function() {
    return [e._t("arrow-next", function() {
      return [e._v("\xA0"), t("i", { staticClass: "angle" }), e._v("\xA0")];
    })];
  }, proxy: !0 }, { key: "today-button", fn: function() {
    return [e._t("today-button", function() {
      return [t("span", { staticClass: "default" }, [e._v(e._s(e.texts.today))])];
    })];
  }, proxy: !0 }, { key: "title", fn: function() {
    return [e._t("title", function() {
      return [e._v(e._s(e.viewTitle))];
    }, { title: e.viewTitle, view: e.view })];
  }, proxy: !0 }, e.$scopedSlots["weekday-heading"] ? { key: "weekday-heading", fn: function({ heading: i, view: n }) {
    return [e._t("weekday-heading", null, { heading: i, view: n })];
  } } : null, e.$scopedSlots["split-label"] ? { key: "split-label", fn: function({ split: i }) {
    return [e._t("split-label", null, { split: i, view: e.view.id })];
  } } : null], null, !0) }), e.hideBody ? e._e() : t("div", { staticClass: "vuecal__flex vuecal__body", attrs: { grow: "" } }, [t("transition", { attrs: { name: `slide-fade--${e.transitionDirection}`, appear: e.transitions } }, [t("div", { key: !!e.transitions && e.view.id, staticClass: "vuecal__flex", staticStyle: { "min-width": "100%" }, attrs: { column: "" } }, [e.showAllDayEvents && e.hasTimeColumn && (!e.cellOrSplitMinWidth || e.isDayView && !e.minSplitWidth) ? t("all-day-bar", e._b({ scopedSlots: e._u([{ key: "event", fn: function({ event: i, view: n }) {
    return [e._t("event", function() {
      return [e.editEvents.title && i.titleEditable ? t("div", { staticClass: "vuecal__event-title vuecal__event-title--edit", attrs: { contenteditable: "" }, domProps: { innerHTML: e._s(i.title) }, on: { blur: function(s) {
        return e.onEventTitleBlur(s, i);
      } } }) : i.title ? t("div", { staticClass: "vuecal__event-title", domProps: { innerHTML: e._s(i.title) } }) : e._e(), !i.content || e.hasShortEvents || e.isShortMonthView ? e._e() : t("div", { staticClass: "vuecal__event-content", domProps: { innerHTML: e._s(i.content) } })];
    }, { view: n, event: i })];
  } }], null, !0) }, "all-day-bar", e.allDayBar, !1)) : e._e(), t("div", { staticClass: "vuecal__bg", class: { vuecal__flex: !e.hasTimeColumn }, attrs: { column: "" } }, [t("div", { staticClass: "vuecal__flex", attrs: { row: "", grow: "" } }, [e.hasTimeColumn ? t("div", { staticClass: "vuecal__time-column" }, [e.showAllDayEvents && e.cellOrSplitMinWidth && (!e.isDayView || e.minSplitWidth) ? t("div", { staticClass: "vuecal__all-day-text", style: { height: e.allDayBar.height } }, [t("span", [e._v(e._s(e.texts.allDay))])]) : e._e(), e._l(e.timeCells, function(i, n) {
    return t("div", { key: n, staticClass: "vuecal__time-cell", style: `height: ${e.timeCellHeight}px` }, [e._t("time-cell", function() {
      return [t("span", { staticClass: "vuecal__time-cell-line" }), t("span", { staticClass: "vuecal__time-cell-label" }, [e._v(e._s(i.label))])];
    }, { hours: i.hours, minutes: i.minutes })], 2);
  })], 2) : e._e(), e.showWeekNumbers && e.isMonthView ? t("div", { staticClass: "vuecal__flex vuecal__week-numbers", attrs: { column: "" } }, e._l(6, function(i) {
    return t("div", { key: i, staticClass: "vuecal__flex vuecal__week-number-cell", attrs: { grow: "" } }, [e._t("week-number-cell", function() {
      return [e._v(e._s(e.getWeekNumber(i - 1)))];
    }, { week: e.getWeekNumber(i - 1) })], 2);
  }), 0) : e._e(), t("div", { staticClass: "vuecal__flex vuecal__cells", class: `${e.view.id}-view`, attrs: { grow: "", wrap: !e.cellOrSplitMinWidth || !e.isWeekView, column: !!e.cellOrSplitMinWidth } }, [e.cellOrSplitMinWidth && e.isWeekView ? t("weekdays-headings", { style: e.cellOrSplitMinWidth ? `min-width: ${e.cellOrSplitMinWidth}px` : "", attrs: { "transition-direction": e.transitionDirection, "week-days": e.weekDays, "switch-to-narrower-view": e.switchToNarrowerView }, scopedSlots: e._u([e.$scopedSlots["weekday-heading"] ? { key: "weekday-heading", fn: function({ heading: i, view: n }) {
    return [e._t("weekday-heading", null, { heading: i, view: n })];
  } } : null, e.$scopedSlots["split-label"] ? { key: "split-label", fn: function({ split: i }) {
    return [e._t("split-label", null, { split: i, view: e.view.id })];
  } } : null], null, !0) }) : e.hasSplits && e.stickySplitLabels && e.minSplitWidth ? t("div", { staticClass: "vuecal__flex vuecal__split-days-headers", style: e.cellOrSplitMinWidth ? `min-width: ${e.cellOrSplitMinWidth}px` : "" }, e._l(e.daySplits, function(i, n) {
    return t("div", { key: n, staticClass: "day-split-header", class: i.class || !1 }, [e._t("split-label", function() {
      return [e._v(e._s(i.label))];
    }, { split: i, view: e.view.id })], 2);
  }), 0) : e._e(), e.showAllDayEvents && e.hasTimeColumn && (e.isWeekView && e.cellOrSplitMinWidth || e.isDayView && e.hasSplits && e.minSplitWidth) ? t("all-day-bar", e._b({ scopedSlots: e._u([{ key: "event", fn: function({ event: i, view: n }) {
    return [e._t("event", function() {
      return [e.editEvents.title && i.titleEditable ? t("div", { staticClass: "vuecal__event-title vuecal__event-title--edit", attrs: { contenteditable: "" }, domProps: { innerHTML: e._s(i.title) }, on: { blur: function(s) {
        return e.onEventTitleBlur(s, i);
      } } }) : i.title ? t("div", { staticClass: "vuecal__event-title", domProps: { innerHTML: e._s(i.title) } }) : e._e(), !i.content || e.hasShortEvents || e.isShortMonthView ? e._e() : t("div", { staticClass: "vuecal__event-content", domProps: { innerHTML: e._s(i.content) } })];
    }, { view: n, event: i })];
  } }], null, !0) }, "all-day-bar", e.allDayBar, !1)) : e._e(), t("div", { ref: "cells", staticClass: "vuecal__flex", style: e.cellOrSplitMinWidth ? `min-width: ${e.cellOrSplitMinWidth}px` : "", attrs: { grow: "", wrap: !e.cellOrSplitMinWidth || !e.isWeekView } }, e._l(e.viewCells, function(i, n) {
    return t("vuecal-cell", { key: n, attrs: { options: e.$props, "edit-events": e.editEvents, data: i, "cell-width": e.hideWeekdays.length && (e.isWeekView || e.isMonthView) && e.cellWidth, "min-timestamp": e.minTimestamp, "max-timestamp": e.maxTimestamp, "cell-splits": e.hasSplits && e.daySplits || [] }, scopedSlots: e._u([{ key: "cell-content", fn: function({ events: s, split: a, selectCell: r }) {
      return [e._t("cell-content", function() {
        return [a && !e.stickySplitLabels ? t("div", { staticClass: "split-label", domProps: { innerHTML: e._s(a.label) } }) : e._e(), i.content ? t("div", { staticClass: "vuecal__cell-date", domProps: { innerHTML: e._s(i.content) } }) : e._e(), (e.isMonthView && !e.eventsOnMonthView || e.isYearsOrYearView && e.eventsCountOnYearView) && s.length ? t("div", { staticClass: "vuecal__cell-events-count" }, [e._t("events-count", function() {
          return [e._v(e._s(s.length))];
        }, { view: e.view, events: s })], 2) : e._e(), !e.cellOrSplitHasEvents(s, a) && e.isWeekOrDayView ? t("div", { staticClass: "vuecal__no-event" }, [e._t("no-event", function() {
          return [e._v(e._s(e.texts.noEvent))];
        })], 2) : e._e()];
      }, { cell: i, view: e.view, goNarrower: r, events: s })];
    } }, { key: "event", fn: function({ event: s, view: a }) {
      return [e._t("event", function() {
        return [e.editEvents.title && s.titleEditable ? t("div", { staticClass: "vuecal__event-title vuecal__event-title--edit", attrs: { contenteditable: "" }, domProps: { innerHTML: e._s(s.title) }, on: { blur: function(r) {
          return e.onEventTitleBlur(r, s);
        } } }) : s.title ? t("div", { staticClass: "vuecal__event-title", domProps: { innerHTML: e._s(s.title) } }) : e._e(), !e.time || s.allDay || e.isMonthView && (s.allDay || e.showAllDayEvents === "short") || e.isShortMonthView ? e._e() : t("div", { staticClass: "vuecal__event-time" }, [e._v(e._s(e.utils.date.formatTime(s.start, e.TimeFormat))), s.endTimeMinutes ? t("span", [e._v("\xA0- " + e._s(e.utils.date.formatTime(s.end, e.TimeFormat, null, !0)))]) : e._e(), s.daysCount > 1 && (s.segments[i.formattedDate] || {}).isFirstDay ? t("small", { staticClass: "days-to-end" }, [e._v("\xA0+" + e._s(s.daysCount - 1) + e._s((e.texts.day[0] || "").toLowerCase()))]) : e._e()]), !s.content || e.isMonthView && s.allDay && e.showAllDayEvents === "short" || e.isShortMonthView ? e._e() : t("div", { staticClass: "vuecal__event-content", domProps: { innerHTML: e._s(s.content) } })];
      }, { view: a, event: s })];
    } }, { key: "no-event", fn: function() {
      return [e._t("no-event", function() {
        return [e._v(e._s(e.texts.noEvent))];
      })];
    }, proxy: !0 }], null, !0) });
  }), 1)], 1)])])], 1)]), e.ready ? e._e() : t("div", { staticClass: "vuecal__scrollbar-check" }, [t("div")])], 1)], 1);
}, R = [];
const O = { weekDays: Array(7).fill(""), weekDaysShort: [], months: Array(12).fill(""), years: "", year: "", month: "", week: "", day: "", today: "", noEvent: "", allDay: "", deleteEvent: "", createEvent: "", dateFormat: "dddd MMMM D, YYYY", am: "am", pm: "pm" }, $ = ["years", "year", "month", "week", "day"], H = new class {
  constructor(e, t = !1) {
    f(this, "texts", {});
    f(this, "dateToMinutes", (e) => 60 * e.getHours() + e.getMinutes());
    y = this, this._texts = e, t || !Date || Date.prototype.addDays || this._initDatePrototypes();
  }
  _initDatePrototypes() {
    Date.prototype.addDays = function(e) {
      return y.addDays(this, e);
    }, Date.prototype.subtractDays = function(e) {
      return y.subtractDays(this, e);
    }, Date.prototype.addHours = function(e) {
      return y.addHours(this, e);
    }, Date.prototype.subtractHours = function(e) {
      return y.subtractHours(this, e);
    }, Date.prototype.addMinutes = function(e) {
      return y.addMinutes(this, e);
    }, Date.prototype.subtractMinutes = function(e) {
      return y.subtractMinutes(this, e);
    }, Date.prototype.getWeek = function() {
      return y.getWeek(this);
    }, Date.prototype.isToday = function() {
      return y.isToday(this);
    }, Date.prototype.isLeapYear = function() {
      return y.isLeapYear(this);
    }, Date.prototype.format = function(e = "YYYY-MM-DD") {
      return y.formatDate(this, e);
    }, Date.prototype.formatTime = function(e = "HH:mm") {
      return y.formatTime(this, e);
    };
  }
  removePrototypes() {
    delete Date.prototype.addDays, delete Date.prototype.subtractDays, delete Date.prototype.addHours, delete Date.prototype.subtractHours, delete Date.prototype.addMinutes, delete Date.prototype.subtractMinutes, delete Date.prototype.getWeek, delete Date.prototype.isToday, delete Date.prototype.isLeapYear, delete Date.prototype.format, delete Date.prototype.formatTime;
  }
  updateTexts(e) {
    this._texts = e;
  }
  _todayFormatted() {
    return V !== new Date().getDate() && (T = new Date(), V = T.getDate(), A = `${T.getFullYear()}-${T.getMonth()}-${T.getDate()}`), A;
  }
  addDays(e, t) {
    const i = new Date(e.valueOf());
    return i.setDate(i.getDate() + t), i;
  }
  subtractDays(e, t) {
    const i = new Date(e.valueOf());
    return i.setDate(i.getDate() - t), i;
  }
  addHours(e, t) {
    const i = new Date(e.valueOf());
    return i.setHours(i.getHours() + t), i;
  }
  subtractHours(e, t) {
    const i = new Date(e.valueOf());
    return i.setHours(i.getHours() - t), i;
  }
  addMinutes(e, t) {
    const i = new Date(e.valueOf());
    return i.setMinutes(i.getMinutes() + t), i;
  }
  subtractMinutes(e, t) {
    const i = new Date(e.valueOf());
    return i.setMinutes(i.getMinutes() - t), i;
  }
  getWeek(e) {
    const t = new Date(Date.UTC(e.getFullYear(), e.getMonth(), e.getDate())), i = t.getUTCDay() || 7;
    t.setUTCDate(t.getUTCDate() + 4 - i);
    const n = new Date(Date.UTC(t.getUTCFullYear(), 0, 1));
    return Math.ceil(((t - n) / 864e5 + 1) / 7);
  }
  isToday(e) {
    return `${e.getFullYear()}-${e.getMonth()}-${e.getDate()}` === this._todayFormatted();
  }
  isLeapYear(e) {
    const t = e.getFullYear();
    return !(t % 400) || t % 100 && !(t % 4);
  }
  getPreviousFirstDayOfWeek(e = null, t) {
    const i = e && new Date(e.valueOf()) || new Date(), n = t ? 7 : 6;
    return i.setDate(i.getDate() - (i.getDay() + n) % 7), i;
  }
  stringToDate(e) {
    return e instanceof Date ? e : (e.length === 10 && (e += " 00:00"), new Date(e.replace(/-/g, "/")));
  }
  countDays(e, t) {
    typeof e == "string" && (e = e.replace(/-/g, "/")), typeof t == "string" && (t = t.replace(/-/g, "/")), e = new Date(e).setHours(0, 0, 0, 0), t = new Date(t).setHours(0, 0, 1, 0);
    const i = 60 * (new Date(t).getTimezoneOffset() - new Date(e).getTimezoneOffset()) * 1e3;
    return Math.ceil((t - e - i) / 864e5);
  }
  datesInSameTimeStep(e, t, i) {
    return Math.abs(e.getTime() - t.getTime()) <= 60 * i * 1e3;
  }
  formatDate(e, t = "YYYY-MM-DD", i = null) {
    if (i || (i = this._texts), t || (t = "YYYY-MM-DD"), t === "YYYY-MM-DD")
      return this.formatDateLite(e);
    S = {}, M = {};
    const n = { YYYY: () => this._hydrateDateObject(e, i).YYYY, YY: () => this._hydrateDateObject(e, i).YY(), M: () => this._hydrateDateObject(e, i).M, MM: () => this._hydrateDateObject(e, i).MM(), MMM: () => this._hydrateDateObject(e, i).MMM(), MMMM: () => this._hydrateDateObject(e, i).MMMM(), MMMMG: () => this._hydrateDateObject(e, i).MMMMG(), D: () => this._hydrateDateObject(e, i).D, DD: () => this._hydrateDateObject(e, i).DD(), S: () => this._hydrateDateObject(e, i).S(), d: () => this._hydrateDateObject(e, i).d, dd: () => this._hydrateDateObject(e, i).dd(), ddd: () => this._hydrateDateObject(e, i).ddd(), dddd: () => this._hydrateDateObject(e, i).dddd(), HH: () => this._hydrateTimeObject(e, i).HH, H: () => this._hydrateTimeObject(e, i).H, hh: () => this._hydrateTimeObject(e, i).hh, h: () => this._hydrateTimeObject(e, i).h, am: () => this._hydrateTimeObject(e, i).am, AM: () => this._hydrateTimeObject(e, i).AM, mm: () => this._hydrateTimeObject(e, i).mm, m: () => this._hydrateTimeObject(e, i).m };
    return t.replace(/(\{[a-zA-Z]+\}|[a-zA-Z]+)/g, (s, a) => {
      const r = n[a.replace(/\{|\}/g, "")];
      return r !== void 0 ? r() : a;
    });
  }
  formatDateLite(e) {
    const t = e.getMonth() + 1, i = e.getDate();
    return `${e.getFullYear()}-${t < 10 ? "0" : ""}${t}-${i < 10 ? "0" : ""}${i}`;
  }
  formatTime(e, t = "HH:mm", i = null, n = !1) {
    let s = !1;
    if (n) {
      const [l, o, d] = [e.getHours(), e.getMinutes(), e.getSeconds()];
      l + o + d === 141 && (s = !0);
    }
    if (e instanceof Date && t === "HH:mm")
      return s ? "24:00" : this.formatTimeLite(e);
    M = {}, i || (i = this._texts);
    const a = this._hydrateTimeObject(e, i), r = t.replace(/(\{[a-zA-Z]+\}|[a-zA-Z]+)/g, (l, o) => {
      const d = a[o.replace(/\{|\}/g, "")];
      return d !== void 0 ? d : o;
    });
    return s ? r.replace("23:59", "24:00") : r;
  }
  formatTimeLite(e) {
    const t = e.getHours(), i = e.getMinutes();
    return `${(t < 10 ? "0" : "") + t}:${(i < 10 ? "0" : "") + i}`;
  }
  _nth(e) {
    if (e > 3 && e < 21)
      return "th";
    switch (e % 10) {
      case 1:
        return "st";
      case 2:
        return "nd";
      case 3:
        return "rd";
      default:
        return "th";
    }
  }
  _hydrateDateObject(e, t) {
    if (S.D)
      return S;
    const i = e.getFullYear(), n = e.getMonth() + 1, s = e.getDate(), a = (e.getDay() - 1 + 7) % 7;
    return S = { YYYY: i, YY: () => i.toString().substring(2), M: n, MM: () => (n < 10 ? "0" : "") + n, MMM: () => t.months[n - 1].substring(0, 3), MMMM: () => t.months[n - 1], MMMMG: () => (t.monthsGenitive || t.months)[n - 1], D: s, DD: () => (s < 10 ? "0" : "") + s, S: () => this._nth(s), d: a + 1, dd: () => t.weekDays[a][0], ddd: () => t.weekDays[a].substr(0, 3), dddd: () => t.weekDays[a] }, S;
  }
  _hydrateTimeObject(e, t) {
    if (M.am)
      return M;
    let i, n;
    e instanceof Date ? (i = e.getHours(), n = e.getMinutes()) : (i = Math.floor(e / 60), n = Math.floor(e % 60));
    const s = i % 12 ? i % 12 : 12, a = (t || { am: "am", pm: "pm" })[i === 24 || i < 12 ? "am" : "pm"];
    return M = { H: i, h: s, HH: (i < 10 ? "0" : "") + i, hh: (s < 10 ? "0" : "") + s, am: a, AM: a.toUpperCase(), m: n, mm: (n < 10 ? "0" : "") + n }, M;
  }
}(O), X = { name: "vue-cal", components: { "vuecal-cell": Y, "vuecal-header": P, WeekdaysHeadings: j, AllDayBar: z }, provide() {
  return { vuecal: this, utils: this.utils, modules: this.modules, previous: this.previous, next: this.next, switchView: this.switchView, updateSelectedDate: this.updateSelectedDate, editEvents: this.editEvents, view: this.view, domEvents: this.domEvents };
}, props: { activeView: { type: String, default: "week" }, allDayBarHeight: { type: [String, Number], default: "25px" }, cellClickHold: { type: Boolean, default: !0 }, cellContextmenu: { type: Boolean, default: !1 }, clickToNavigate: { type: Boolean, default: !1 }, dblclickToNavigate: { type: Boolean, default: !0 }, disableDatePrototypes: { type: Boolean, default: !1 }, disableDays: { type: Array, default: () => [] }, disableViews: { type: Array, default: () => [] }, dragToCreateEvent: { type: Boolean, default: !0 }, dragToCreateThreshold: { type: Number, default: 15 }, editableEvents: { type: [Boolean, Object], default: !1 }, events: { type: Array, default: () => [] }, eventsCountOnYearView: { type: Boolean, default: !1 }, eventsOnMonthView: { type: [Boolean, String], default: !1 }, hideBody: { type: Boolean, default: !1 }, hideTitleBar: { type: Boolean, default: !1 }, hideViewSelector: { type: Boolean, default: !1 }, hideWeekdays: { type: Array, default: () => [] }, hideWeekends: { type: Boolean, default: !1 }, locale: { type: [String, Object], default: "en" }, maxDate: { type: [String, Date], default: "" }, minCellWidth: { type: Number, default: 0 }, minDate: { type: [String, Date], default: "" }, minEventWidth: { type: Number, default: 0 }, minSplitWidth: { type: Number, default: 0 }, onEventClick: { type: [Function, null], default: null }, onEventCreate: { type: [Function, null], default: null }, onEventDblclick: { type: [Function, null], default: null }, overlapsPerTimeStep: { type: Boolean, default: !1 }, resizeX: { type: Boolean, default: !1 }, selectedDate: { type: [String, Date], default: "" }, showAllDayEvents: { type: [Boolean, String], default: !1 }, showTimeInCells: { type: Boolean, default: !1 }, showWeekNumbers: { type: [Boolean, String], default: !1 }, snapToTime: { type: Number, default: 0 }, small: { type: Boolean, default: !1 }, specialHours: { type: Object, default: () => ({}) }, splitDays: { type: Array, default: () => [] }, startWeekOnSunday: { type: Boolean, default: !1 }, stickySplitLabels: { type: Boolean, default: !1 }, time: { type: Boolean, default: !0 }, timeCellHeight: { type: Number, default: 40 }, timeFormat: { type: String, default: "" }, timeFrom: { type: Number, default: 0 }, timeStep: { type: Number, default: 60 }, timeTo: { type: Number, default: 1440 }, todayButton: { type: Boolean, default: !1 }, transitions: { type: Boolean, default: !0 }, twelveHour: { type: Boolean, default: !1 }, watchRealTime: { type: Boolean, default: !1 }, xsmall: { type: Boolean, default: !1 } }, data() {
  return { ready: !1, texts: { ...O }, utils: { date: !!this.disableDatePrototypes && H.removePrototypes() || H, cell: null, event: null }, modules: { dnd: null }, view: { id: "", title: "", startDate: null, endDate: null, firstCellDate: null, lastCellDate: null, selectedDate: null, events: [] }, eventIdIncrement: 1, now: new Date(), timeTickerIds: [null, null], domEvents: { resizeAnEvent: { _eid: null, start: null, split: null, segment: null, originalEndTimeMinutes: 0, originalEnd: null, end: null, startCell: null, endCell: null }, dragAnEvent: { _eid: null }, dragCreateAnEvent: { startCursorY: null, start: null, split: null, event: null }, focusAnEvent: { _eid: null, mousedUp: !1 }, clickHoldAnEvent: { _eid: null, timeout: 1200, timeoutId: null }, dblTapACell: { taps: 0, timeout: 500 }, clickHoldACell: { cellId: null, split: null, timeout: 1200, timeoutId: null, eventCreated: !1 }, cancelClickEventCreation: !1 }, mutableEvents: [], transitionDirection: "right" };
}, methods: { async loadLocale(e) {
  if (typeof this.locale == "object")
    return this.texts = Object.assign({}, O, e), void this.utils.date.updateTexts(this.texts);
  if (this.locale === "en") {
    const t = await __webpack_require__.e(/*! import() */ "node_modules_vue-cal_dist_i18n_en_es_js").then(__webpack_require__.bind(__webpack_require__, /*! ./i18n/en.es.js */ "./node_modules/vue-cal/dist/i18n/en.es.js"));
    this.texts = Object.assign({}, O, t);
  } else
    ((t, i) => {
      const n = t[i];
      return n ? typeof n == "function" ? n() : Promise.resolve(n) : new Promise((s, a) => {
        (typeof queueMicrotask == "function" ? queueMicrotask : setTimeout)(a.bind(null, new Error("Unknown variable dynamic import: " + i)));
      });
    })(Object.assign({ "./i18n/ar.json": () => __webpack_require__.e(/*! import() */ "node_modules_vue-cal_dist_i18n_ar_es_js").then(__webpack_require__.bind(__webpack_require__, /*! ./i18n/ar.es.js */ "./node_modules/vue-cal/dist/i18n/ar.es.js")), "./i18n/bg.json": () => __webpack_require__.e(/*! import() */ "node_modules_vue-cal_dist_i18n_bg_es_js").then(__webpack_require__.bind(__webpack_require__, /*! ./i18n/bg.es.js */ "./node_modules/vue-cal/dist/i18n/bg.es.js")), "./i18n/bn.json": () => __webpack_require__.e(/*! import() */ "node_modules_vue-cal_dist_i18n_bn_es_js").then(__webpack_require__.bind(__webpack_require__, /*! ./i18n/bn.es.js */ "./node_modules/vue-cal/dist/i18n/bn.es.js")), "./i18n/bs.json": () => __webpack_require__.e(/*! import() */ "node_modules_vue-cal_dist_i18n_bs_es_js").then(__webpack_require__.bind(__webpack_require__, /*! ./i18n/bs.es.js */ "./node_modules/vue-cal/dist/i18n/bs.es.js")), "./i18n/ca.json": () => __webpack_require__.e(/*! import() */ "node_modules_vue-cal_dist_i18n_ca_es_js").then(__webpack_require__.bind(__webpack_require__, /*! ./i18n/ca.es.js */ "./node_modules/vue-cal/dist/i18n/ca.es.js")), "./i18n/cs.json": () => __webpack_require__.e(/*! import() */ "node_modules_vue-cal_dist_i18n_cs_es_js").then(__webpack_require__.bind(__webpack_require__, /*! ./i18n/cs.es.js */ "./node_modules/vue-cal/dist/i18n/cs.es.js")), "./i18n/da.json": () => __webpack_require__.e(/*! import() */ "node_modules_vue-cal_dist_i18n_da_es_js").then(__webpack_require__.bind(__webpack_require__, /*! ./i18n/da.es.js */ "./node_modules/vue-cal/dist/i18n/da.es.js")), "./i18n/de.json": () => __webpack_require__.e(/*! import() */ "node_modules_vue-cal_dist_i18n_de_es_js").then(__webpack_require__.bind(__webpack_require__, /*! ./i18n/de.es.js */ "./node_modules/vue-cal/dist/i18n/de.es.js")), "./i18n/el.json": () => __webpack_require__.e(/*! import() */ "node_modules_vue-cal_dist_i18n_el_es_js").then(__webpack_require__.bind(__webpack_require__, /*! ./i18n/el.es.js */ "./node_modules/vue-cal/dist/i18n/el.es.js")), "./i18n/en.json": () => __webpack_require__.e(/*! import() */ "node_modules_vue-cal_dist_i18n_en_es_js").then(__webpack_require__.bind(__webpack_require__, /*! ./i18n/en.es.js */ "./node_modules/vue-cal/dist/i18n/en.es.js")), "./i18n/es.json": () => __webpack_require__.e(/*! import() */ "node_modules_vue-cal_dist_i18n_es_es_js").then(__webpack_require__.bind(__webpack_require__, /*! ./i18n/es.es.js */ "./node_modules/vue-cal/dist/i18n/es.es.js")), "./i18n/fa.json": () => __webpack_require__.e(/*! import() */ "node_modules_vue-cal_dist_i18n_fa_es_js").then(__webpack_require__.bind(__webpack_require__, /*! ./i18n/fa.es.js */ "./node_modules/vue-cal/dist/i18n/fa.es.js")), "./i18n/fr.json": () => __webpack_require__.e(/*! import() */ "node_modules_vue-cal_dist_i18n_fr_es_js").then(__webpack_require__.bind(__webpack_require__, /*! ./i18n/fr.es.js */ "./node_modules/vue-cal/dist/i18n/fr.es.js")), "./i18n/he.json": () => __webpack_require__.e(/*! import() */ "node_modules_vue-cal_dist_i18n_he_es_js").then(__webpack_require__.bind(__webpack_require__, /*! ./i18n/he.es.js */ "./node_modules/vue-cal/dist/i18n/he.es.js")), "./i18n/hr.json": () => __webpack_require__.e(/*! import() */ "node_modules_vue-cal_dist_i18n_hr_es_js").then(__webpack_require__.bind(__webpack_require__, /*! ./i18n/hr.es.js */ "./node_modules/vue-cal/dist/i18n/hr.es.js")), "./i18n/hu.json": () => __webpack_require__.e(/*! import() */ "node_modules_vue-cal_dist_i18n_hu_es_js").then(__webpack_require__.bind(__webpack_require__, /*! ./i18n/hu.es.js */ "./node_modules/vue-cal/dist/i18n/hu.es.js")), "./i18n/id.json": () => __webpack_require__.e(/*! import() */ "node_modules_vue-cal_dist_i18n_id_es_js").then(__webpack_require__.bind(__webpack_require__, /*! ./i18n/id.es.js */ "./node_modules/vue-cal/dist/i18n/id.es.js")), "./i18n/is.json": () => __webpack_require__.e(/*! import() */ "node_modules_vue-cal_dist_i18n_is_es_js").then(__webpack_require__.bind(__webpack_require__, /*! ./i18n/is.es.js */ "./node_modules/vue-cal/dist/i18n/is.es.js")), "./i18n/it.json": () => __webpack_require__.e(/*! import() */ "node_modules_vue-cal_dist_i18n_it_es_js").then(__webpack_require__.bind(__webpack_require__, /*! ./i18n/it.es.js */ "./node_modules/vue-cal/dist/i18n/it.es.js")), "./i18n/ja.json": () => __webpack_require__.e(/*! import() */ "node_modules_vue-cal_dist_i18n_ja_es_js").then(__webpack_require__.bind(__webpack_require__, /*! ./i18n/ja.es.js */ "./node_modules/vue-cal/dist/i18n/ja.es.js")), "./i18n/ka.json": () => __webpack_require__.e(/*! import() */ "node_modules_vue-cal_dist_i18n_ka_es_js").then(__webpack_require__.bind(__webpack_require__, /*! ./i18n/ka.es.js */ "./node_modules/vue-cal/dist/i18n/ka.es.js")), "./i18n/ko.json": () => __webpack_require__.e(/*! import() */ "node_modules_vue-cal_dist_i18n_ko_es_js").then(__webpack_require__.bind(__webpack_require__, /*! ./i18n/ko.es.js */ "./node_modules/vue-cal/dist/i18n/ko.es.js")), "./i18n/lt.json": () => __webpack_require__.e(/*! import() */ "node_modules_vue-cal_dist_i18n_lt_es_js").then(__webpack_require__.bind(__webpack_require__, /*! ./i18n/lt.es.js */ "./node_modules/vue-cal/dist/i18n/lt.es.js")), "./i18n/mn.json": () => __webpack_require__.e(/*! import() */ "node_modules_vue-cal_dist_i18n_mn_es_js").then(__webpack_require__.bind(__webpack_require__, /*! ./i18n/mn.es.js */ "./node_modules/vue-cal/dist/i18n/mn.es.js")), "./i18n/nl.json": () => __webpack_require__.e(/*! import() */ "node_modules_vue-cal_dist_i18n_nl_es_js").then(__webpack_require__.bind(__webpack_require__, /*! ./i18n/nl.es.js */ "./node_modules/vue-cal/dist/i18n/nl.es.js")), "./i18n/no.json": () => __webpack_require__.e(/*! import() */ "node_modules_vue-cal_dist_i18n_no_es_js").then(__webpack_require__.bind(__webpack_require__, /*! ./i18n/no.es.js */ "./node_modules/vue-cal/dist/i18n/no.es.js")), "./i18n/pl.json": () => __webpack_require__.e(/*! import() */ "node_modules_vue-cal_dist_i18n_pl_es_js").then(__webpack_require__.bind(__webpack_require__, /*! ./i18n/pl.es.js */ "./node_modules/vue-cal/dist/i18n/pl.es.js")), "./i18n/pt-br.json": () => __webpack_require__.e(/*! import() */ "node_modules_vue-cal_dist_i18n_pt-br_es_js").then(__webpack_require__.bind(__webpack_require__, /*! ./i18n/pt-br.es.js */ "./node_modules/vue-cal/dist/i18n/pt-br.es.js")), "./i18n/ro.json": () => __webpack_require__.e(/*! import() */ "node_modules_vue-cal_dist_i18n_ro_es_js").then(__webpack_require__.bind(__webpack_require__, /*! ./i18n/ro.es.js */ "./node_modules/vue-cal/dist/i18n/ro.es.js")), "./i18n/ru.json": () => __webpack_require__.e(/*! import() */ "node_modules_vue-cal_dist_i18n_ru_es_js").then(__webpack_require__.bind(__webpack_require__, /*! ./i18n/ru.es.js */ "./node_modules/vue-cal/dist/i18n/ru.es.js")), "./i18n/sk.json": () => __webpack_require__.e(/*! import() */ "node_modules_vue-cal_dist_i18n_sk_es_js").then(__webpack_require__.bind(__webpack_require__, /*! ./i18n/sk.es.js */ "./node_modules/vue-cal/dist/i18n/sk.es.js")), "./i18n/sl.json": () => __webpack_require__.e(/*! import() */ "node_modules_vue-cal_dist_i18n_sl_es_js").then(__webpack_require__.bind(__webpack_require__, /*! ./i18n/sl.es.js */ "./node_modules/vue-cal/dist/i18n/sl.es.js")), "./i18n/sq.json": () => __webpack_require__.e(/*! import() */ "node_modules_vue-cal_dist_i18n_sq_es_js").then(__webpack_require__.bind(__webpack_require__, /*! ./i18n/sq.es.js */ "./node_modules/vue-cal/dist/i18n/sq.es.js")), "./i18n/sr.json": () => __webpack_require__.e(/*! import() */ "node_modules_vue-cal_dist_i18n_sr_es_js").then(__webpack_require__.bind(__webpack_require__, /*! ./i18n/sr.es.js */ "./node_modules/vue-cal/dist/i18n/sr.es.js")), "./i18n/sv.json": () => __webpack_require__.e(/*! import() */ "node_modules_vue-cal_dist_i18n_sv_es_js").then(__webpack_require__.bind(__webpack_require__, /*! ./i18n/sv.es.js */ "./node_modules/vue-cal/dist/i18n/sv.es.js")), "./i18n/tr.json": () => __webpack_require__.e(/*! import() */ "node_modules_vue-cal_dist_i18n_tr_es_js").then(__webpack_require__.bind(__webpack_require__, /*! ./i18n/tr.es.js */ "./node_modules/vue-cal/dist/i18n/tr.es.js")), "./i18n/uk.json": () => __webpack_require__.e(/*! import() */ "node_modules_vue-cal_dist_i18n_uk_es_js").then(__webpack_require__.bind(__webpack_require__, /*! ./i18n/uk.es.js */ "./node_modules/vue-cal/dist/i18n/uk.es.js")), "./i18n/vi.json": () => __webpack_require__.e(/*! import() */ "node_modules_vue-cal_dist_i18n_vi_es_js").then(__webpack_require__.bind(__webpack_require__, /*! ./i18n/vi.es.js */ "./node_modules/vue-cal/dist/i18n/vi.es.js")), "./i18n/zh-cn.json": () => __webpack_require__.e(/*! import() */ "node_modules_vue-cal_dist_i18n_zh-cn_es_js").then(__webpack_require__.bind(__webpack_require__, /*! ./i18n/zh-cn.es.js */ "./node_modules/vue-cal/dist/i18n/zh-cn.es.js")), "./i18n/zh-hk.json": () => __webpack_require__.e(/*! import() */ "node_modules_vue-cal_dist_i18n_zh-hk_es_js").then(__webpack_require__.bind(__webpack_require__, /*! ./i18n/zh-hk.es.js */ "./node_modules/vue-cal/dist/i18n/zh-hk.es.js")) }), `./i18n/${e}.json`).then((t) => {
      this.texts = Object.assign({}, O, t.default), this.utils.date.updateTexts(this.texts);
    });
}, loadDragAndDrop() {
  __webpack_require__.e(/*! import() */ "node_modules_vue-cal_dist_drag-and-drop_es_js").then(__webpack_require__.bind(__webpack_require__, /*! ./drag-and-drop.es.js */ "./node_modules/vue-cal/dist/drag-and-drop.es.js")).then((e) => {
    const { DragAndDrop: t } = e;
    this.modules.dnd = new t(this);
  }).catch(() => console.warn("Vue Cal: Missing drag & drop module."));
}, validateView(e) {
  return $.includes(e) || (console.error(`Vue Cal: invalid active-view parameter provided: "${e}".
A valid view must be one of: ${$.join(", ")}.`), e = "week"), this.enabledViews.includes(e) || (console.warn(`Vue Cal: the provided active-view "${e}" is disabled. Using the "${this.enabledViews[0]}" view instead.`), e = this.enabledViews[0]), e;
}, switchToNarrowerView(e = null) {
  this.transitionDirection = "right";
  const t = this.enabledViews[this.enabledViews.indexOf(this.view.id) + 1];
  t && this.switchView(t, e);
}, switchView(e, t = null, i = !1) {
  e = this.validateView(e);
  const n = this.utils.date, s = this.view.startDate && this.view.startDate.getTime();
  if (this.transitions && i) {
    if (this.view.id === e)
      return;
    const l = this.enabledViews;
    this.transitionDirection = l.indexOf(this.view.id) > l.indexOf(e) ? "left" : "right";
  }
  const a = this.view.id;
  switch (this.view.events = [], this.view.id = e, this.view.firstCellDate = null, this.view.lastCellDate = null, t || (t = this.view.selectedDate || this.view.startDate), e) {
    case "years":
      this.view.startDate = new Date(25 * Math.floor(t.getFullYear() / 25) || 2e3, 0, 1), this.view.endDate = new Date(this.view.startDate.getFullYear() + 25, 0, 1), this.view.endDate.setSeconds(-1);
      break;
    case "year":
      this.view.startDate = new Date(t.getFullYear(), 0, 1), this.view.endDate = new Date(t.getFullYear() + 1, 0, 1), this.view.endDate.setSeconds(-1);
      break;
    case "month": {
      this.view.startDate = new Date(t.getFullYear(), t.getMonth(), 1), this.view.endDate = new Date(t.getFullYear(), t.getMonth() + 1, 1), this.view.endDate.setSeconds(-1);
      let l = new Date(this.view.startDate);
      if (l.getDay() !== (this.startWeekOnSunday ? 0 : 1) && (l = n.getPreviousFirstDayOfWeek(l, this.startWeekOnSunday)), this.view.firstCellDate = l, this.view.lastCellDate = n.addDays(l, 41), this.view.lastCellDate.setHours(23, 59, 59, 0), this.hideWeekends) {
        if ([0, 6].includes(this.view.firstCellDate.getDay())) {
          const o = this.view.firstCellDate.getDay() !== 6 || this.startWeekOnSunday ? 1 : 2;
          this.view.firstCellDate = n.addDays(this.view.firstCellDate, o);
        }
        if ([0, 6].includes(this.view.startDate.getDay())) {
          const o = this.view.startDate.getDay() === 6 ? 2 : 1;
          this.view.startDate = n.addDays(this.view.startDate, o);
        }
        if ([0, 6].includes(this.view.lastCellDate.getDay())) {
          const o = this.view.lastCellDate.getDay() !== 0 || this.startWeekOnSunday ? 1 : 2;
          this.view.lastCellDate = n.subtractDays(this.view.lastCellDate, o);
        }
        if ([0, 6].includes(this.view.endDate.getDay())) {
          const o = this.view.endDate.getDay() === 0 ? 2 : 1;
          this.view.endDate = n.subtractDays(this.view.endDate, o);
        }
      }
      break;
    }
    case "week": {
      t = n.getPreviousFirstDayOfWeek(t, this.startWeekOnSunday);
      const l = this.hideWeekends ? 5 : 7;
      this.view.startDate = this.hideWeekends && this.startWeekOnSunday ? n.addDays(t, 1) : t, this.view.startDate.setHours(0, 0, 0, 0), this.view.endDate = n.addDays(t, l), this.view.endDate.setSeconds(-1);
      break;
    }
    case "day":
      this.view.startDate = t, this.view.startDate.setHours(0, 0, 0, 0), this.view.endDate = new Date(t), this.view.endDate.setHours(23, 59, 59, 0);
  }
  this.addEventsToView();
  const r = this.view.startDate && this.view.startDate.getTime();
  if ((a !== e || r !== s) && (this.$emit("update:activeView", e), this.ready)) {
    const l = this.view.startDate, o = { view: e, startDate: l, endDate: this.view.endDate, ...this.isMonthView ? { firstCellDate: this.view.firstCellDate, lastCellDate: this.view.lastCellDate, outOfScopeEvents: this.view.outOfScopeEvents.map(this.cleanupEvent) } : {}, events: this.view.events.map(this.cleanupEvent), ...this.isWeekView ? { week: n.getWeek(this.startWeekOnSunday ? n.addDays(l, 1) : l) } : {} };
    this.$emit("view-change", o);
  }
}, previous() {
  this.previousNext(!1);
}, next() {
  this.previousNext();
}, previousNext(e = !0) {
  const t = this.utils.date;
  this.transitionDirection = e ? "right" : "left";
  const i = e ? 1 : -1;
  let n = null;
  const { startDate: s, id: a } = this.view;
  switch (a) {
    case "years":
      n = new Date(s.getFullYear() + 25 * i, 0, 1);
      break;
    case "year":
      n = new Date(s.getFullYear() + 1 * i, 1, 1);
      break;
    case "month":
      n = new Date(s.getFullYear(), s.getMonth() + 1 * i, 1);
      break;
    case "week":
      n = t[e ? "addDays" : "subtractDays"](t.getPreviousFirstDayOfWeek(s, this.startWeekOnSunday), 7);
      break;
    case "day":
      n = t[e ? "addDays" : "subtractDays"](s, 1);
      const r = n.getDay(), l = this.startWeekOnSunday ? r : (r || 7) - 1;
      if (this.weekDays[l].hide) {
        const o = this.weekDays.map((u, c) => ({ ...u, i: c }));
        let d = 0;
        e ? ([...o.slice(l), ...o].find((u) => (d++, !u.hide)).i, d--) : [...o, ...o.slice(0, l)].reverse().find((u) => (d++, !u.hide)).i, n = t[e ? "addDays" : "subtractDays"](n, d);
      }
  }
  n && this.switchView(a, n);
}, addEventsToView(e = []) {
  const t = this.utils.event, { startDate: i, endDate: n, firstCellDate: s, lastCellDate: a } = this.view;
  if (e.length || (this.view.events = []), !(e = e.length ? e : [...this.mutableEvents]) || this.isYearsOrYearView && !this.eventsCountOnYearView)
    return;
  let r = e.filter((l) => t.eventInRange(l, i, n));
  this.isYearsOrYearView || this.isMonthView && !this.eventsOnMonthView || (r = r.map((l) => l.daysCount > 1 ? t.createEventSegments(l, s || i, a || n) : l)), this.view.events.push(...r), this.isMonthView && (this.view.outOfScopeEvents = [], e.forEach((l) => {
    (t.eventInRange(l, s, i) || t.eventInRange(l, n, a)) && (this.view.events.some((o) => o._eid === l._eid) || this.view.outOfScopeEvents.push(l));
  }));
}, findAncestor(e, t) {
  for (; (e = e.parentElement) && !e.classList.contains(t); )
    ;
  return e;
}, isDOMElementAnEvent(e) {
  return e.classList.contains("vuecal__event") || this.findAncestor(e, "vuecal__event");
}, onMouseMove(e) {
  const { resizeAnEvent: t, dragAnEvent: i, dragCreateAnEvent: n } = this.domEvents;
  (t._eid !== null || i._eid !== null || n.start) && (e.preventDefault(), t._eid ? this.eventResizing(e) : this.dragToCreateEvent && n.start && this.eventDragCreation(e));
}, onMouseUp(e) {
  const { focusAnEvent: t, resizeAnEvent: i, clickHoldAnEvent: n, clickHoldACell: s, dragCreateAnEvent: a } = this.domEvents, { _eid: r } = n, { _eid: l } = i;
  let o = !1;
  const { event: d, start: u } = a, c = this.isDOMElementAnEvent(e.target), m = t.mousedUp;
  if (t.mousedUp = !1, c && (this.domEvents.cancelClickEventCreation = !0), s.eventCreated)
    return;
  if (l) {
    const { originalEnd: p, originalEndTimeMinutes: g, endTimeMinutes: _ } = i, w = this.view.events.find((k) => k._eid === i._eid);
    if (o = _ && _ !== g, w && w.end.getTime() !== p.getTime()) {
      const k = this.mutableEvents.find((L) => L._eid === i._eid);
      k.endTimeMinutes = w.endTimeMinutes, k.end = w.end;
      const C = this.cleanupEvent(w), W = { ...this.cleanupEvent(w), end: p, endTimeMinutes: w.originalEndTimeMinutes };
      this.$emit("event-duration-change", { event: C, oldDate: i.originalEnd, originalEvent: W }), this.$emit("event-change", { event: C, originalEvent: W });
    }
    w && (w.resizing = !1), i._eid = null, i.start = null, i.split = null, i.segment = null, i.originalEndTimeMinutes = null, i.originalEnd = null, i.endTimeMinutes = null, i.startCell = null, i.endCell = null;
  } else
    u && (d && (this.emitWithEvent("event-drag-create", d), a.event.resizing = !1), a.start = null, a.split = null, a.event = null);
  c || l || this.unfocusEvent(), n.timeoutId && !r && (clearTimeout(n.timeoutId), n.timeoutId = null), s.timeoutId && (clearTimeout(s.timeoutId), s.timeoutId = null);
  const D = typeof this.onEventClick == "function";
  if (m && !o && !r && !d && D) {
    let p = this.view.events.find((g) => g._eid === t._eid);
    return !p && this.isMonthView && (p = this.view.outOfScopeEvents.find((g) => g._eid === t._eid)), p && this.onEventClick(p, e);
  }
}, onKeyUp(e) {
  e.keyCode === 27 && this.cancelDelete();
}, eventResizing(e) {
  const { resizeAnEvent: t } = this.domEvents, i = this.view.events.find((d) => d._eid === t._eid) || { segments: {} }, { minutes: n, cursorCoords: s } = this.minutesAtCursor(e), a = i.segments && i.segments[t.segment], { date: r, event: l } = this.utils, o = Math.max(n, this.timeFrom + 1, (a || i).startTimeMinutes + 1);
  if (i.endTimeMinutes = t.endTimeMinutes = o, this.snapToTime) {
    const d = i.endTimeMinutes + this.snapToTime / 2;
    i.endTimeMinutes = d - d % this.snapToTime;
  }
  if (a && (a.endTimeMinutes = i.endTimeMinutes), i.end.setHours(0, i.endTimeMinutes, i.endTimeMinutes === 1440 ? -1 : 0, 0), this.resizeX && this.isWeekView) {
    i.daysCount = r.countDays(i.start, i.end);
    const d = this.$refs.cells, u = d.offsetWidth / d.childElementCount, c = Math.floor(s.x / u);
    if (t.startCell === null && (t.startCell = c - (i.daysCount - 1)), t.endCell !== c) {
      t.endCell = c;
      const m = r.addDays(i.start, c - t.startCell), D = Math.max(r.countDays(i.start, m), 1);
      if (D !== i.daysCount) {
        let p = null;
        p = D > i.daysCount ? l.addEventSegment(i) : l.removeEventSegment(i), t.segment = p, i.endTimeMinutes += 1e-3;
      }
    }
  }
  this.$emit("event-resizing", { _eid: i._eid, end: i.end, endTimeMinutes: i.endTimeMinutes });
}, eventDragCreation(e) {
  const { dragCreateAnEvent: t } = this.domEvents, { start: i, startCursorY: n, split: s } = t, a = new Date(i), { minutes: r, cursorCoords: { y: l } } = this.minutesAtCursor(e);
  if (t.event || !(Math.abs(n - l) < this.dragToCreateThreshold))
    if (t.event) {
      if (a.setHours(0, r, r === 1440 ? -1 : 0, 0), this.snapToTime) {
        let u = 60 * a.getHours() + a.getMinutes();
        const c = u + this.snapToTime / 2;
        u = c - c % this.snapToTime, a.setHours(0, u, 0, 0);
      }
      const o = i < a, { event: d } = t;
      d.start = o ? i : a, d.end = o ? a : i, d.startTimeMinutes = 60 * d.start.getHours() + d.start.getMinutes(), d.endTimeMinutes = 60 * d.end.getHours() + d.end.getMinutes();
    } else {
      if (t.event = this.utils.event.createAnEvent(i, 1, { split: s }), !t.event)
        return t.start = null, t.split = null, void (t.event = null);
      t.event.resizing = !0;
    }
}, unfocusEvent() {
  const { focusAnEvent: e, clickHoldAnEvent: t } = this.domEvents, i = this.view.events.find((n) => n._eid === (e._eid || t._eid));
  e._eid = null, t._eid = null, i && (i.focused = !1, i.deleting = !1);
}, cancelDelete() {
  const { clickHoldAnEvent: e } = this.domEvents;
  if (e._eid) {
    const t = this.view.events.find((i) => i._eid === e._eid);
    t && (t.deleting = !1), e._eid = null, e.timeoutId = null;
  }
}, onEventTitleBlur(e, t) {
  if (t.title === e.target.innerHTML)
    return;
  const i = t.title;
  t.title = e.target.innerHTML;
  const n = this.cleanupEvent(t);
  this.$emit("event-title-change", { event: n, oldTitle: i }), this.$emit("event-change", { event: n, originalEvent: { ...n, title: i } });
}, updateMutableEvents() {
  const e = this.utils.date;
  this.mutableEvents = [], this.events.forEach((t) => {
    const i = typeof t.start == "string" ? e.stringToDate(t.start) : t.start, n = e.formatDateLite(i), s = e.dateToMinutes(i);
    let a = null;
    typeof t.end == "string" && t.end.includes("24:00") ? (a = new Date(t.end.replace(" 24:00", "")), a.setHours(23, 59, 59, 0)) : a = typeof t.end == "string" ? e.stringToDate(t.end) : t.end;
    let r = e.formatDateLite(a), l = e.dateToMinutes(a);
    l && l !== 1440 || (!this.time || typeof t.end == "string" && t.end.length === 10 ? a.setHours(23, 59, 59, 0) : a.setSeconds(a.getSeconds() - 1), r = e.formatDateLite(a), l = 1440);
    const o = n !== r;
    t = Object.assign({ ...this.utils.event.eventDefaults }, t, { _eid: `${this.uid}_${this.eventIdIncrement++}`, segments: o ? {} : null, start: i, startTimeMinutes: s, end: a, endTimeMinutes: l, daysCount: o ? e.countDays(i, a) : 1, class: t.class }), this.mutableEvents.push(t);
  });
}, minutesAtCursor(e) {
  return this.utils.cell.minutesAtCursor(e);
}, createEvent(e, t, i = {}) {
  return this.utils.event.createAnEvent(e, t, i);
}, cleanupEvent(e) {
  return e = { ...e }, ["segments", "deletable", "deleting", "titleEditable", "resizable", "resizing", "draggable", "dragging", "draggingStatic", "focused"].forEach((t) => {
    t in e && delete e[t];
  }), e.repeat || delete e.repeat, e;
}, emitWithEvent(e, t) {
  this.$emit(e, this.cleanupEvent(t));
}, updateSelectedDate(e) {
  if ((e = e && typeof e == "string" ? this.utils.date.stringToDate(e) : new Date(e)) && e instanceof Date) {
    const { selectedDate: t } = this.view;
    t && (this.transitionDirection = t.getTime() > e.getTime() ? "left" : "right"), e.setHours(0, 0, 0, 0), t && t.getTime() === e.getTime() || (this.view.selectedDate = e), this.switchView(this.view.id);
  }
  this.$emit("update:selected-date", this.view.selectedDate);
}, getWeekNumber(e) {
  const t = this.utils.date, i = this.firstCellDateWeekNumber + e, n = this.startWeekOnSunday ? 1 : 0;
  return i > 52 ? t.getWeek(t.addDays(this.view.firstCellDate, 7 * e + n)) : i;
}, timeTick() {
  this.now = new Date(), this.timeTickerIds[1] = setTimeout(this.timeTick, 6e4);
}, updateDateTexts() {
  this.utils.date.updateTexts(this.texts);
}, alignWithScrollbar() {
  if (document.getElementById("vuecal-align-with-scrollbar"))
    return;
  const e = this.$refs.vuecal.getElementsByClassName("vuecal__scrollbar-check")[0], t = e.offsetWidth - e.children[0].offsetWidth;
  if (t) {
    const i = document.createElement("style");
    i.id = "vuecal-align-with-scrollbar", i.type = "text/css", i.innerHTML = `.vuecal--view-with-time .vuecal__weekdays-headings,.vuecal--view-with-time .vuecal__all-day {padding-right: ${t}px}`, document.head.appendChild(i);
  }
}, cellOrSplitHasEvents: (e, t = null) => e.length && (!t && e.length || t && e.some((i) => i.split === t.id)) }, created() {
  this.utils.cell = new N(this), this.utils.event = new I(this, this.utils.date), this.loadLocale(this.locale), this.editEvents.drag && this.loadDragAndDrop(), this.updateMutableEvents(this.events), this.view.id = this.currentView, this.selectedDate ? this.updateSelectedDate(this.selectedDate) : (this.view.selectedDate = new Date(), this.switchView(this.currentView)), this.time && this.watchRealTime && (this.timeTickerIds[0] = setTimeout(this.timeTick, 1e3 * (60 - this.now.getSeconds())));
}, mounted() {
  const e = this.utils.date, t = "ontouchstart" in window, { resize: i, drag: n, create: s, delete: a, title: r } = this.editEvents, l = this.onEventClick && typeof this.onEventClick == "function";
  (i || n || s || a || r || l) && window.addEventListener(t ? "touchend" : "mouseup", this.onMouseUp), (i || n || s && this.dragToCreateEvent) && window.addEventListener(t ? "touchmove" : "mousemove", this.onMouseMove, { passive: !1 }), r && window.addEventListener("keyup", this.onKeyUp), t && (this.$refs.vuecal.oncontextmenu = function(u) {
    u.preventDefault(), u.stopPropagation();
  }), this.hideBody || this.alignWithScrollbar();
  const o = this.view.startDate, d = { view: this.view.id, startDate: o, endDate: this.view.endDate, ...this.isMonthView ? { firstCellDate: this.view.firstCellDate, lastCellDate: this.view.lastCellDate } : {}, events: this.view.events.map(this.cleanupEvent), ...this.isWeekView ? { week: e.getWeek(this.startWeekOnSunday ? e.addDays(o, 1) : o) } : {} };
  this.$emit("ready", d), this.ready = !0;
}, beforeDestroy() {
  const e = "ontouchstart" in window;
  window.removeEventListener(e ? "touchmove" : "mousemove", this.onMouseMove, { passive: !1 }), window.removeEventListener(e ? "touchend" : "mouseup", this.onMouseUp), window.removeEventListener("keyup", this.onKeyUp), this.timeTickerIds[0] && clearTimeout(this.timeTickerIds[0]), this.timeTickerIds[1] && clearTimeout(this.timeTickerIds[1]), this.timeTickerIds = [null, null];
}, computed: { editEvents() {
  return this.editableEvents && typeof this.editableEvents == "object" ? { title: !!this.editableEvents.title, drag: !!this.editableEvents.drag, resize: !!this.editableEvents.resize, create: !!this.editableEvents.create, delete: !!this.editableEvents.delete } : { title: !!this.editableEvents, drag: !!this.editableEvents, resize: !!this.editableEvents, create: !!this.editableEvents, delete: !!this.editableEvents };
}, views() {
  return { years: { label: this.texts.years, enabled: !this.disableViews.includes("years") }, year: { label: this.texts.year, enabled: !this.disableViews.includes("year") }, month: { label: this.texts.month, enabled: !this.disableViews.includes("month") }, week: { label: this.texts.week, enabled: !this.disableViews.includes("week") }, day: { label: this.texts.day, enabled: !this.disableViews.includes("day") } };
}, currentView() {
  return this.validateView(this.activeView);
}, enabledViews() {
  return Object.keys(this.views).filter((e) => this.views[e].enabled);
}, hasTimeColumn() {
  return this.time && this.isWeekOrDayView;
}, isShortMonthView() {
  return this.isMonthView && this.eventsOnMonthView === "short";
}, firstCellDateWeekNumber() {
  const e = this.utils.date, t = this.view.firstCellDate;
  return e.getWeek(this.startWeekOnSunday ? e.addDays(t, 1) : t);
}, timeCells() {
  const e = [];
  for (let t = this.timeFrom, i = this.timeTo; t < i; t += this.timeStep)
    e.push({ hours: Math.floor(t / 60), minutes: t % 60, label: this.utils.date.formatTime(t, this.TimeFormat), value: t });
  return e;
}, TimeFormat() {
  return this.timeFormat || (this.twelveHour ? "h:mm{am}" : "HH:mm");
}, daySplits() {
  return (this.splitDays.filter((e) => !e.hide) || []).map((e, t) => ({ ...e, id: e.id || t + 1 }));
}, hasSplits() {
  return this.daySplits.length && this.isWeekOrDayView;
}, hasShortEvents() {
  return this.showAllDayEvents === "short";
}, cellOrSplitMinWidth() {
  let e = null;
  return this.hasSplits && this.minSplitWidth ? e = this.visibleDaysCount * this.minSplitWidth * this.daySplits.length : this.minCellWidth && this.isWeekView && (e = this.visibleDaysCount * this.minCellWidth), e;
}, allDayBar() {
  let e = this.allDayBarHeight || null;
  return e && !isNaN(e) && (e += "px"), { cells: this.viewCells, options: this.$props, label: this.texts.allDay, shortEvents: this.hasShortEvents, daySplits: this.hasSplits && this.daySplits || [], cellOrSplitMinWidth: this.cellOrSplitMinWidth, height: e };
}, minTimestamp() {
  let e = null;
  return this.minDate && typeof this.minDate == "string" ? e = this.utils.date.stringToDate(this.minDate) : this.minDate && this.minDate instanceof Date && (e = this.minDate), e ? e.getTime() : null;
}, maxTimestamp() {
  let e = null;
  return this.maxDate && typeof this.maxDate == "string" ? e = this.utils.date.stringToDate(this.maxDate) : this.maxDate && this.minDate instanceof Date && (e = this.maxDate), e ? e.getTime() : null;
}, weekDays() {
  let { weekDays: e, weekDaysShort: t = [] } = this.texts;
  return e = e.slice(0).map((i, n) => ({ label: i, ...t.length ? { short: t[n] } : {}, hide: this.hideWeekends && n >= 5 || this.hideWeekdays.length && this.hideWeekdays.includes(n + 1) })), this.startWeekOnSunday && e.unshift(e.pop()), e;
}, weekDaysInHeader() {
  return this.isMonthView || this.isWeekView && !this.minCellWidth && !(this.hasSplits && this.minSplitWidth);
}, months() {
  return this.texts.months.map((e) => ({ label: e }));
}, specialDayHours() {
  return this.specialHours && Object.keys(this.specialHours).length ? Array(7).fill("").map((e, t) => {
    let i = this.specialHours[t + 1] || [];
    return Array.isArray(i) || (i = [i]), e = [], i.forEach(({ from: n, to: s, class: a, label: r }, l) => {
      e[l] = { day: t + 1, from: [null, void 0].includes(n) ? null : 1 * n, to: [null, void 0].includes(s) ? null : 1 * s, class: a || "", label: r || "" };
    }), e;
  }) : {};
}, viewTitle() {
  const e = this.utils.date;
  let t = "";
  const i = this.view.startDate, n = i.getFullYear(), s = i.getMonth();
  switch (this.view.id) {
    case "years":
      t = this.texts.years;
      break;
    case "year":
      t = n;
      break;
    case "month":
      t = `${this.months[s].label} ${n}`;
      break;
    case "week": {
      const a = this.view.endDate, r = i.getFullYear();
      let l = this.texts.months[i.getMonth()];
      this.xsmall && (l = l.substring(0, 3));
      let o = `${l} ${r}`;
      if (a.getMonth() !== i.getMonth()) {
        const d = a.getFullYear();
        let u = this.texts.months[a.getMonth()];
        this.xsmall && (u = u.substring(0, 3)), o = r === d ? `${l} - ${u} ${r}` : this.small ? `${l.substring(0, 3)} ${r} - ${u.substring(0, 3)} ${d}` : `${l} ${r} - ${u} ${d}`;
      }
      t = `${this.texts.week} ${e.getWeek(this.startWeekOnSunday ? e.addDays(i, 1) : i)} (${o})`;
      break;
    }
    case "day":
      t = this.utils.date.formatDate(i, this.texts.dateFormat, this.texts);
  }
  return t;
}, viewCells() {
  const e = this.utils.date;
  let t = [], i = null, n = !1;
  this.watchRealTime || (this.now = new Date());
  const s = this.now;
  switch (this.view.id) {
    case "years":
      i = this.view.startDate.getFullYear(), t = Array.apply(null, Array(25)).map((a, r) => {
        const l = new Date(i + r, 0, 1), o = new Date(i + r + 1, 0, 1);
        return o.setSeconds(-1), { startDate: l, formattedDate: e.formatDateLite(l), endDate: o, content: i + r, current: i + r === s.getFullYear() };
      });
      break;
    case "year":
      i = this.view.startDate.getFullYear(), t = Array.apply(null, Array(12)).map((a, r) => {
        const l = new Date(i, r, 1), o = new Date(i, r + 1, 1);
        return o.setSeconds(-1), { startDate: l, formattedDate: e.formatDateLite(l), endDate: o, content: this.xsmall ? this.months[r].label.substr(0, 3) : this.months[r].label, current: r === s.getMonth() && i === s.getFullYear() };
      });
      break;
    case "month": {
      const a = this.view.startDate.getMonth(), r = new Date(this.view.firstCellDate);
      n = !1, t = Array.apply(null, Array(42)).map((l, o) => {
        const d = e.addDays(r, o), u = new Date(d);
        u.setHours(23, 59, 59, 0);
        const c = !n && e.isToday(d) && !n++;
        return { startDate: d, formattedDate: e.formatDateLite(d), endDate: u, content: d.getDate(), today: c, outOfScope: d.getMonth() !== a, class: `vuecal__cell--day${d.getDay() || 7}` };
      }), (this.hideWeekends || this.hideWeekdays.length) && (t = t.filter((l) => {
        const o = l.startDate.getDay() || 7;
        return !(this.hideWeekends && o >= 6 || this.hideWeekdays.length && this.hideWeekdays.includes(o));
      }));
      break;
    }
    case "week": {
      n = !1;
      const a = this.view.startDate, r = this.weekDays;
      t = r.map((l, o) => {
        const d = e.addDays(a, this.startWeekOnSunday ? o - 1 : o), u = new Date(d);
        u.setHours(23, 59, 59, 0);
        const c = (d.getDay() || 7) - 1;
        return { startDate: d, formattedDate: e.formatDateLite(d), endDate: u, today: !n && e.isToday(d) && !n++, specialHours: this.specialDayHours[c] || [] };
      }).filter((l, o) => !r[o].hide);
      break;
    }
    case "day": {
      const a = this.view.startDate, r = new Date(this.view.startDate);
      r.setHours(23, 59, 59, 0);
      const l = (a.getDay() || 7) - 1;
      t = [{ startDate: a, formattedDate: e.formatDateLite(a), endDate: r, today: e.isToday(a), specialHours: this.specialDayHours[l] || [] }];
      break;
    }
  }
  return t;
}, visibleDaysCount() {
  return this.isDayView ? 1 : 7 - this.weekDays.reduce((e, t) => e + t.hide, 0);
}, cellWidth() {
  return 100 / this.visibleDaysCount;
}, cssClasses() {
  const { resizeAnEvent: e, dragAnEvent: t, dragCreateAnEvent: i } = this.domEvents;
  return { [`vuecal--${this.view.id}-view`]: !0, [`vuecal--${this.locale}`]: this.locale, "vuecal--no-time": !this.time, "vuecal--view-with-time": this.hasTimeColumn, "vuecal--week-numbers": this.showWeekNumbers && this.isMonthView, "vuecal--twelve-hour": this.twelveHour, "vuecal--click-to-navigate": this.clickToNavigate, "vuecal--hide-weekends": this.hideWeekends, "vuecal--split-days": this.hasSplits, "vuecal--sticky-split-labels": this.hasSplits && this.stickySplitLabels, "vuecal--overflow-x": this.minCellWidth && this.isWeekView || this.hasSplits && this.minSplitWidth, "vuecal--small": this.small, "vuecal--xsmall": this.xsmall, "vuecal--resizing-event": e._eid, "vuecal--drag-creating-event": i.event, "vuecal--dragging-event": t._eid, "vuecal--events-on-month-view": this.eventsOnMonthView, "vuecal--short-events": this.isMonthView && this.eventsOnMonthView === "short", "vuecal--has-touch": typeof window < "u" && "ontouchstart" in window };
}, isYearsOrYearView() {
  return ["years", "year"].includes(this.view.id);
}, isYearsView() {
  return this.view.id === "years";
}, isYearView() {
  return this.view.id === "year";
}, isMonthView() {
  return this.view.id === "month";
}, isWeekOrDayView() {
  return ["week", "day"].includes(this.view.id);
}, isWeekView() {
  return this.view.id === "week";
}, isDayView() {
  return this.view.id === "day";
} }, watch: { events: { handler(e, t) {
  this.updateMutableEvents(e), this.addEventsToView();
}, deep: !0 }, locale(e) {
  this.loadLocale(e);
}, selectedDate(e) {
  this.updateSelectedDate(e);
}, activeView(e) {
  this.switchView(e);
} } }, K = E(X, U, R, !1, null, null, null, null).exports;



/***/ }),

/***/ "./resources/src/views/app/pages/Appointment/Appointment.vue":
/*!*******************************************************************!*\
  !*** ./resources/src/views/app/pages/Appointment/Appointment.vue ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Appointment_vue_vue_type_template_id_22db5e22_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Appointment.vue?vue&type=template&id=22db5e22&scoped=true */ "./resources/src/views/app/pages/Appointment/Appointment.vue?vue&type=template&id=22db5e22&scoped=true");
/* harmony import */ var _Appointment_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Appointment.vue?vue&type=script&lang=js */ "./resources/src/views/app/pages/Appointment/Appointment.vue?vue&type=script&lang=js");
/* harmony import */ var _Appointment_vue_vue_type_style_index_0_id_22db5e22_lang_scss_scoped_true__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Appointment.vue?vue&type=style&index=0&id=22db5e22&lang=scss&scoped=true */ "./resources/src/views/app/pages/Appointment/Appointment.vue?vue&type=style&index=0&id=22db5e22&lang=scss&scoped=true");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");



;


/* normalize component */

var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _Appointment_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__["default"],
  _Appointment_vue_vue_type_template_id_22db5e22_scoped_true__WEBPACK_IMPORTED_MODULE_0__.render,
  _Appointment_vue_vue_type_template_id_22db5e22_scoped_true__WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  "22db5e22",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/src/views/app/pages/Appointment/Appointment.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./resources/src/views/app/pages/Appointment/Appointment.vue?vue&type=script&lang=js":
/*!*******************************************************************************************!*\
  !*** ./resources/src/views/app/pages/Appointment/Appointment.vue?vue&type=script&lang=js ***!
  \*******************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Appointment_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Appointment.vue?vue&type=script&lang=js */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/Appointment/Appointment.vue?vue&type=script&lang=js");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Appointment_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/src/views/app/pages/Appointment/Appointment.vue?vue&type=style&index=0&id=22db5e22&lang=scss&scoped=true":
/*!****************************************************************************************************************************!*\
  !*** ./resources/src/views/app/pages/Appointment/Appointment.vue?vue&type=style&index=0&id=22db5e22&lang=scss&scoped=true ***!
  \****************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_dist_cjs_js_node_modules_css_loader_dist_cjs_js_clonedRuleSet_12_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_12_use_2_node_modules_sass_loader_dist_cjs_js_clonedRuleSet_12_use_3_node_modules_vue_loader_lib_index_js_vue_loader_options_Appointment_vue_vue_type_style_index_0_id_22db5e22_lang_scss_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/style-loader/dist/cjs.js!../../../../../../node_modules/css-loader/dist/cjs.js??clonedRuleSet-12.use[1]!../../../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12.use[2]!../../../../../../node_modules/sass-loader/dist/cjs.js??clonedRuleSet-12.use[3]!../../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Appointment.vue?vue&type=style&index=0&id=22db5e22&lang=scss&scoped=true */ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-12.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12.use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-12.use[3]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/Appointment/Appointment.vue?vue&type=style&index=0&id=22db5e22&lang=scss&scoped=true");


/***/ }),

/***/ "./resources/src/views/app/pages/Appointment/Appointment.vue?vue&type=template&id=22db5e22&scoped=true":
/*!*************************************************************************************************************!*\
  !*** ./resources/src/views/app/pages/Appointment/Appointment.vue?vue&type=template&id=22db5e22&scoped=true ***!
  \*************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Appointment_vue_vue_type_template_id_22db5e22_scoped_true__WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   staticRenderFns: () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Appointment_vue_vue_type_template_id_22db5e22_scoped_true__WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Appointment_vue_vue_type_template_id_22db5e22_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Appointment.vue?vue&type=template&id=22db5e22&scoped=true */ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/Appointment/Appointment.vue?vue&type=template&id=22db5e22&scoped=true");


/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/Appointment/Appointment.vue?vue&type=template&id=22db5e22&scoped=true":
/*!****************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/Appointment/Appointment.vue?vue&type=template&id=22db5e22&scoped=true ***!
  \****************************************************************************************************************************************************************************************************************************************************/
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
  return _c("div", { staticClass: "appointment-page" }, [
    _c("div", { staticClass: "breadcrumb-nav-row" }, [
      _c("div", { staticClass: "breadcrumb-section" }, [
        _c(
          "nav",
          {
            staticClass: "breadcrumb-nav",
            attrs: { "aria-label": "breadcrumb" },
          },
          [
            _c(
              "div",
              { staticClass: "breadcrumb-container d-flex align-items-center" },
              [
                _c(
                  "button",
                  {
                    staticClass: "back-button",
                    staticStyle: { color: "#dc3545" },
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
                _c("ol", { staticClass: "breadcrumb mb-0" }, [
                  _c(
                    "li",
                    { staticClass: "breadcrumb-item" },
                    [
                      _c("router-link", { attrs: { to: "/app/dashboard" } }, [
                        _c("i", { staticClass: "fas fa-home" }),
                        _vm._v("\n                Dashboard\n              "),
                      ]),
                    ],
                    1
                  ),
                  _vm._v(" "),
                  _vm._m(0),
                ]),
              ]
            ),
          ]
        ),
      ]),
      _vm._v(" "),
      _c("div", { staticClass: "refresh-section" }, [
        _c(
          "button",
          {
            staticClass: "btn btn-primary refresh-btn",
            attrs: { disabled: _vm.loading },
            on: { click: _vm.refreshCalendar },
          },
          [
            _c("i", { staticClass: "fas fa-sync-alt me-2" }),
            _vm._v(
              "\n        " +
                _vm._s(_vm.loading ? "Loading..." : "Refresh Calendar") +
                "\n      "
            ),
          ]
        ),
      ]),
    ]),
    _vm._v(" "),
    _c("div", { staticClass: "container-fluid text-center" }, [
      _c(
        "div",
        { staticClass: "row justify-content-center" },
        [
          _c("vue-cal", {
            ref: "vuecal",
            staticStyle: { height: "700px" },
            attrs: {
              time: true,
              "default-view": "week",
              "available-views": ["week", "day"],
              events: _vm.events,
              "disable-views": ["years", "year", "month"],
              "allow-overlapping-events": true,
              "allow-multiple-events": true,
            },
            on: {
              "cell-click": _vm.handleCellClick,
              "event-click": _vm.handleEventClick,
              "event-dblclick": _vm.handleEventClick,
              "event-focus": _vm.handleEventClick,
            },
          }),
        ],
        1
      ),
    ]),
    _vm._v(" "),
    _vm.showModal
      ? _c("div", { staticClass: "modal-backdrop" }, [
          _c("div", { staticClass: "modal-box" }, [
            _c("h3", { staticClass: "fw-bold" }, [
              _vm._v(
                _vm._s(
                  _vm.isEditing ? "Edit Gym Appointment" : "Set Gym Appointment"
                )
              ),
            ]),
            _vm._v(" "),
            _c(
              "form",
              {
                on: {
                  submit: function ($event) {
                    $event.preventDefault()
                    return _vm.saveAppointment.apply(null, arguments)
                  },
                },
              },
              [
                _c("div", [
                  _c("label", [_vm._v("Date:")]),
                  _vm._v(" "),
                  _c("input", {
                    directives: [
                      {
                        name: "model",
                        rawName: "v-model",
                        value: _vm.appointmentDate,
                        expression: "appointmentDate",
                      },
                    ],
                    attrs: { type: "date", required: "" },
                    domProps: { value: _vm.appointmentDate },
                    on: {
                      input: function ($event) {
                        if ($event.target.composing) {
                          return
                        }
                        _vm.appointmentDate = $event.target.value
                      },
                    },
                  }),
                ]),
                _vm._v(" "),
                _c("div", [
                  _c("label", [_vm._v("Start Time:")]),
                  _vm._v(" "),
                  _c("input", {
                    directives: [
                      {
                        name: "model",
                        rawName: "v-model",
                        value: _vm.appointmentStartTime,
                        expression: "appointmentStartTime",
                      },
                    ],
                    attrs: { type: "time", required: "" },
                    domProps: { value: _vm.appointmentStartTime },
                    on: {
                      input: function ($event) {
                        if ($event.target.composing) {
                          return
                        }
                        _vm.appointmentStartTime = $event.target.value
                      },
                    },
                  }),
                ]),
                _vm._v(" "),
                _c("div", [
                  _c("label", [_vm._v("End Time:")]),
                  _vm._v(" "),
                  _c("input", {
                    directives: [
                      {
                        name: "model",
                        rawName: "v-model",
                        value: _vm.appointmentEndTime,
                        expression: "appointmentEndTime",
                      },
                    ],
                    attrs: { type: "time", required: "" },
                    domProps: { value: _vm.appointmentEndTime },
                    on: {
                      input: function ($event) {
                        if ($event.target.composing) {
                          return
                        }
                        _vm.appointmentEndTime = $event.target.value
                      },
                    },
                  }),
                ]),
                _vm._v(" "),
                _c("div", [
                  _c("label", [_vm._v("Coach:")]),
                  _vm._v(" "),
                  _c(
                    "select",
                    {
                      directives: [
                        {
                          name: "model",
                          rawName: "v-model",
                          value: _vm.selectedStaffId,
                          expression: "selectedStaffId",
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
                          _vm.selectedStaffId = $event.target.multiple
                            ? $$selectedVal
                            : $$selectedVal[0]
                        },
                      },
                    },
                    [
                      _c("option", { attrs: { value: "", disabled: "" } }, [
                        _vm._v("Select staff"),
                      ]),
                      _vm._v(" "),
                      _vm._l(_vm.staff, function (member) {
                        return _c(
                          "option",
                          { key: member.id, domProps: { value: member.id } },
                          [
                            _vm._v(
                              "\n              " +
                                _vm._s(member.name) +
                                "\n            "
                            ),
                          ]
                        )
                      }),
                    ],
                    2
                  ),
                ]),
                _vm._v(" "),
                _c("div", [
                  _c("label", [_vm._v("Member:")]),
                  _vm._v(" "),
                  _c(
                    "select",
                    {
                      directives: [
                        {
                          name: "model",
                          rawName: "v-model",
                          value: _vm.selectedClientId,
                          expression: "selectedClientId",
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
                          _vm.selectedClientId = $event.target.multiple
                            ? $$selectedVal
                            : $$selectedVal[0]
                        },
                      },
                    },
                    [
                      _c("option", { attrs: { value: "", disabled: "" } }, [
                        _vm._v("Select Client"),
                      ]),
                      _vm._v(" "),
                      _vm._l(_vm.clients, function (member) {
                        return _c(
                          "option",
                          { key: member.id, domProps: { value: member.id } },
                          [
                            _vm._v(
                              "\n              " +
                                _vm._s(member.name) +
                                "\n            "
                            ),
                          ]
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
                  _c(
                    "select",
                    {
                      directives: [
                        {
                          name: "model",
                          rawName: "v-model",
                          value: _vm.workoutType,
                          expression: "workoutType",
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
                          _vm.workoutType = $event.target.multiple
                            ? $$selectedVal
                            : $$selectedVal[0]
                        },
                      },
                    },
                    [
                      _c("option", { attrs: { value: "", disabled: "" } }, [
                        _vm._v("Select Workout Type"),
                      ]),
                      _vm._v(" "),
                      _vm._l(_vm.workouts, function (type) {
                        return _c(
                          "option",
                          { key: type.id, domProps: { value: type.id } },
                          [_vm._v(_vm._s(type.label))]
                        )
                      }),
                    ],
                    2
                  ),
                ]),
                _vm._v(" "),
                _vm.isEditing && _vm.currentAppointmentStatus === "completed"
                  ? _c("div", [
                      _c("label", [_vm._v("Rating:")]),
                      _vm._v(" "),
                      _c("div", { staticClass: "rating-display" }, [
                        _vm.currentAppointmentRating
                          ? _c("span", { staticClass: "rating-value" }, [
                              _c("i", {
                                staticClass: "fas fa-star",
                                staticStyle: { color: "#FBBF24" },
                              }),
                              _vm._v(
                                "\n              " +
                                  _vm._s(
                                    _vm.currentAppointmentRating.toFixed(1)
                                  ) +
                                  " / 5.0\n            "
                              ),
                            ])
                          : _c("span", { staticClass: "no-rating" }, [
                              _c("i", {
                                staticClass: "far fa-star",
                                staticStyle: { color: "#ccc" },
                              }),
                              _vm._v(
                                "\n              Not rated yet\n            "
                              ),
                            ]),
                      ]),
                    ])
                  : _vm._e(),
                _vm._v(" "),
                _c("div", { staticClass: "modal-actions" }, [
                  _c(
                    "button",
                    { attrs: { type: "submit", disabled: _vm.saving } },
                    [
                      _vm.saving
                        ? _c("span", [
                            _c("i", {
                              staticClass: "fas fa-spinner fa-spin me-2",
                            }),
                            _vm._v(
                              "\n              " +
                                _vm._s(
                                  _vm.isEditing ? "Updating..." : "Saving..."
                                ) +
                                "\n            "
                            ),
                          ])
                        : _c("span", [
                            _vm._v(_vm._s(_vm.isEditing ? "Update" : "Save")),
                          ]),
                    ]
                  ),
                  _vm._v(" "),
                  _c(
                    "button",
                    {
                      attrs: { type: "button", disabled: _vm.saving },
                      on: { click: _vm.closeModal },
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
        _c("i", { staticClass: "fas fa-calendar-check" }),
        _vm._v("\n              Appointments Calendar\n            "),
      ]
    )
  },
]
render._withStripped = true



/***/ })

}]);