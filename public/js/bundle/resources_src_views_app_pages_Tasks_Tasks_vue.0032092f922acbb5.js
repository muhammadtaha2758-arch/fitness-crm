"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["resources_src_views_app_pages_Tasks_Tasks_vue"],{

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/Tasks/Tasks.vue?vue&type=script&lang=js":
/*!***********************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/Tasks/Tasks.vue?vue&type=script&lang=js ***!
  \***********************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! axios */ "./node_modules/axios/index.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_0__);
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
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
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
  name: 'Tasks',
  data: function data() {
    // Get current time and date for auto-fill
    var now = new Date();
    var currentHour = now.getHours();
    var currentMinute = now.getMinutes();
    // Format date as YYYY-MM-DD for input field
    var currentDate = now.toISOString().split('T')[0];
    return {
      loading: false,
      saving: false,
      tasks: [],
      showTaskModal: false,
      isEditing: false,
      editingTask: null,
      showDetails: false,
      filters: {
        dateFilter: 'history',
        // Default to history (all tasks)
        taskFilter: 'all',
        coachFilter: 'all',
        searchMember: ''
      },
      taskForm: {
        title: 'New Task',
        category: 'Personal',
        description: 'This is a general task description. Please update with specific details as needed.',
        concerns: '',
        member_id: null,
        coach_id: null,
        is_complete: false,
        due_date: currentDate,
        // Auto-fill with current date
        due_hour: currentHour,
        // Auto-fill with current hour
        due_minute: currentMinute,
        // Auto-fill with current minute
        duration: '60',
        // Default to 60 minutes
        task_type: 'member' // 'member' or 'coach'
      },
      memberSearchResults: [],
      allMembers: [],
      // Store all members for filtering
      coaches: [],
      coachSearchResults: [],
      // Store coach search results
      dateFilterOptions: [{
        value: 'today',
        text: 'Today'
      }, {
        value: 'week',
        text: 'This Week'
      }, {
        value: 'month',
        text: 'This Month'
      }, {
        value: 'history',
        text: 'History (All Tasks)'
      }],
      taskFilterOptions: [{
        value: 'all',
        text: 'All tasks'
      }, {
        value: 'pending',
        text: 'Pending'
      }, {
        value: 'completed',
        text: 'Completed'
      }, {
        value: 'in-progress',
        text: 'In Progress'
      }],
      coachFilterOptions: [{
        value: 'all',
        text: 'All Coaches'
      }],
      categoryOptions: [{
        value: 'Personal',
        text: 'Personal'
      }, {
        value: 'Training',
        text: 'Training'
      }, {
        value: 'Member Management',
        text: 'Member Management'
      }, {
        value: 'Administrative',
        text: 'Administrative'
      }, {
        value: 'Maintenance',
        text: 'Maintenance'
      }, {
        value: 'Professional Development',
        text: 'Professional Development'
      }, {
        value: 'Coaching',
        text: 'Coaching'
      }, {
        value: 'Follow-up',
        text: 'Follow-up'
      }, {
        value: 'Assessment',
        text: 'Assessment'
      }, {
        value: 'Nutrition',
        text: 'Nutrition'
      }, {
        value: 'Wellness',
        text: 'Wellness'
      }, {
        value: 'Billing',
        text: 'Billing'
      }, {
        value: 'Communication',
        text: 'Communication'
      }, {
        value: 'Other',
        text: 'Other'
      }],
      hourOptions: Array.from({
        length: 24
      }, function (_, i) {
        return {
          value: i,
          text: String(i).padStart(2, '0')
        };
      }),
      minuteOptions: Array.from({
        length: 60
      }, function (_, i) {
        return {
          value: i,
          text: String(i).padStart(2, '0')
        };
      }),
      durationOptions: [{
        value: null,
        text: 'Duration'
      }, {
        value: '2',
        text: '2 minutes'
      }, {
        value: '5',
        text: '5 minutes'
      }, {
        value: '10',
        text: '10 minutes'
      }, {
        value: '15',
        text: '15 minutes'
      }, {
        value: '20',
        text: '20 minutes'
      }, {
        value: '30',
        text: '30 minutes'
      }, {
        value: '45',
        text: '45 minutes'
      }, {
        value: '60',
        text: '1 hour'
      }, {
        value: '90',
        text: '1.5 hours'
      }, {
        value: '120',
        text: '2 hours'
      }, {
        value: '180',
        text: '3 hours'
      }, {
        value: '240',
        text: '4 hours'
      }, {
        value: '300',
        text: '5 hours'
      }, {
        value: '360',
        text: '6 hours'
      }, {
        value: '420',
        text: '7 hours'
      }, {
        value: '480',
        text: '8 hours'
      }],
      coachSelectOptions: [],
      validationErrors: {
        title: '',
        category: '',
        task_type: '',
        coach_id: '',
        member_id: ''
      }
    };
  },
  computed: {
    isAdmin: function isAdmin() {
      // Check if user is admin - adjust this based on your role/permission system
      try {
        var user = this.$store.getters.currentUser;
        var permissions = this.$store.getters.currentUserPermissions || [];
        // You can check for specific permission or role name
        // Adjust this condition based on your actual admin check
        // For now, show to all users - you can restrict this later
        return true; // Temporarily show to all - change to: permissions.includes('admin') || permissions.includes('administrator') || user?.role === 'admin' || user?.username === 'admin';
      } catch (error) {
        // If store is not available, show templates anyway
        return true;
      }
    },
    // Templates are tasks that are not assigned to anyone
    templates: function templates() {
      return this.tasks.filter(function (task) {
        // A task is a template if it has no assignment
        return !task.member_id && !task.coach_id && (!task.task_type || task.task_type === null);
      });
    },
    // Regular tasks are those assigned to members or coaches
    regularTasks: function regularTasks() {
      return this.tasks.filter(function (task) {
        // A task is regular if it has an assignment
        return task.member_id || task.coach_id || task.task_type && task.task_type !== null;
      });
    }
  },
  mounted: function mounted() {
    this.loadTasks();
    this.loadCoaches();
  },
  methods: {
    goBack: function goBack() {
      if (window.history.length > 1) {
        this.$router.go(-1);
      } else {
        this.$router.push({
          name: 'dashboard'
        });
      }
    },
    loadTasks: function loadTasks() {
      var _this = this;
      return _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
        var params, response;
        return _regeneratorRuntime().wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              _this.loading = true;
              _context.prev = 1;
              params = {
                date_filter: _this.filters.dateFilter,
                task_filter: _this.filters.taskFilter,
                coach_filter: _this.filters.coachFilter,
                search: _this.filters.searchMember
              };
              _context.next = 5;
              return axios__WEBPACK_IMPORTED_MODULE_0___default().get('tasks', {
                params: params
              });
            case 5:
              response = _context.sent;
              if (response.data.success) {
                _this.tasks = response.data.data || [];
              } else {
                _this.tasks = [];
              }
              _context.next = 13;
              break;
            case 9:
              _context.prev = 9;
              _context.t0 = _context["catch"](1);
              _this.$bvToast.toast('Error loading tasks', {
                title: 'Error',
                variant: 'danger',
                solid: true
              });
              _this.tasks = [];
            case 13:
              _context.prev = 13;
              _this.loading = false;
              return _context.finish(13);
            case 16:
            case "end":
              return _context.stop();
          }
        }, _callee, null, [[1, 9, 13, 16]]);
      }))();
    },
    loadCoaches: function loadCoaches() {
      var _this2 = this;
      return _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee2() {
        var _response$data, response, coachesData;
        return _regeneratorRuntime().wrap(function _callee2$(_context2) {
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
              _context2.prev = 0;
              _context2.next = 3;
              return axios__WEBPACK_IMPORTED_MODULE_0___default().get('coach', {
                params: {
                  limit: 1000
                }
              });
            case 3:
              response = _context2.sent;
              // API returns 'clients' array, not 'coaches'
              coachesData = ((_response$data = response.data) === null || _response$data === void 0 ? void 0 : _response$data.clients) || [];
              if (coachesData.length > 0) {
                _this2.coaches = coachesData;
                _this2.coachFilterOptions = [{
                  value: 'all',
                  text: 'All Coaches'
                }].concat(_toConsumableArray(_this2.coaches.map(function (coach) {
                  return {
                    value: coach.id,
                    text: coach.name || 'Coach'
                  };
                })));
                // Map coaches to select options format
                _this2.coachSelectOptions = _this2.coaches.map(function (coach) {
                  return {
                    value: coach.id,
                    text: coach.name || 'Coach'
                  };
                });
                // If task_type is 'coach', show all coaches in search results
                if (_this2.taskForm.task_type === 'coach') {
                  _this2.coachSearchResults = _this2.coaches;
                }
              } else {
                // If no coaches returned, reset options
                _this2.coaches = [];
                _this2.coachSelectOptions = [];
                _this2.coachSearchResults = [];
              }
              _context2.next = 13;
              break;
            case 8:
              _context2.prev = 8;
              _context2.t0 = _context2["catch"](0);
              // Reset on error
              _this2.coaches = [];
              _this2.coachSelectOptions = [];
              _this2.coachSearchResults = [];
            case 13:
            case "end":
              return _context2.stop();
          }
        }, _callee2, null, [[0, 8]]);
      }))();
    },
    handleConcernsInput: function handleConcernsInput(value) {
      if (this.taskForm.task_type === 'member') {
        this.filterMembers(value);
      } else if (this.taskForm.task_type === 'coach') {
        this.filterCoaches(value);
      }
    },
    handleConcernsFocus: function handleConcernsFocus() {
      // Load all members if not already loaded and task_type is member
      if (this.taskForm.task_type === 'member' && this.allMembers.length === 0) {
        this.loadAllMembers();
      } else if (this.taskForm.task_type === 'member' && this.allMembers.length > 0) {
        // Show all members when field is focused
        this.memberSearchResults = this.allMembers;
      } else if (this.taskForm.task_type === 'coach') {
        // Load coaches if not already loaded
        if (this.coaches.length === 0) {
          this.loadCoaches();
        } else {
          // Show all coaches when field is focused
          this.coachSearchResults = this.coaches;
        }
      }
    },
    loadAllMembers: function loadAllMembers() {
      var _this3 = this;
      return _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee3() {
        var response;
        return _regeneratorRuntime().wrap(function _callee3$(_context3) {
          while (1) switch (_context3.prev = _context3.next) {
            case 0:
              _context3.prev = 0;
              _context3.next = 3;
              return axios__WEBPACK_IMPORTED_MODULE_0___default().get('get_members_without_paginate');
            case 3:
              response = _context3.sent;
              // The API returns a direct array of members
              if (response.data && Array.isArray(response.data)) {
                _this3.allMembers = response.data;
                // Show all members initially
                _this3.memberSearchResults = _this3.allMembers;
              } else {
                _this3.allMembers = [];
                _this3.memberSearchResults = [];
              }
              _context3.next = 11;
              break;
            case 7:
              _context3.prev = 7;
              _context3.t0 = _context3["catch"](0);
              _this3.allMembers = [];
              _this3.memberSearchResults = [];
            case 11:
            case "end":
              return _context3.stop();
          }
        }, _callee3, null, [[0, 7]]);
      }))();
    },
    filterMembers: function filterMembers(query) {
      if (!this.allMembers || this.allMembers.length === 0) {
        // If allMembers not loaded, load them first
        this.loadAllMembers();
        return;
      }
      if (!query || query.trim() === '') {
        // Show all members if query is empty
        this.memberSearchResults = this.allMembers;
        return;
      }

      // Filter members by name (case-insensitive)
      var searchQuery = query.toLowerCase().trim();
      this.memberSearchResults = this.allMembers.filter(function (member) {
        var membername = (member.membername || '').toLowerCase();
        var firstname = (member.firstname || '').toLowerCase();
        var lastname = (member.lastname || '').toLowerCase();
        var fullName = "".concat(firstname, " ").concat(lastname).trim();
        return membername.includes(searchQuery) || firstname.includes(searchQuery) || lastname.includes(searchQuery) || fullName.includes(searchQuery);
      });
    },
    filterCoaches: function filterCoaches(query) {
      if (!this.coaches || this.coaches.length === 0) {
        // If coaches not loaded, load them first
        this.loadCoaches();
        return;
      }
      if (!query || query.trim() === '') {
        // Show all coaches if query is empty
        this.coachSearchResults = this.coaches;
        return;
      }

      // Filter coaches by name (case-insensitive)
      // API returns coaches with 'name' field already combined
      var searchQuery = query.toLowerCase().trim();
      this.coachSearchResults = this.coaches.filter(function (coach) {
        var name = (coach.name || '').toLowerCase();
        // Also check coach_id and code fields if they exist
        var coachId = (coach.coach_id || '').toLowerCase();
        var code = (coach.code || '').toLowerCase();
        return name.includes(searchQuery) || coachId.includes(searchQuery) || code.includes(searchQuery);
      });
    },
    handleTaskTypeChange: function handleTaskTypeChange() {
      this.taskForm.member_id = null;
      this.taskForm.coach_id = null;
      this.taskForm.concerns = '';
      this.memberSearchResults = [];
      this.coachSearchResults = [];
      // Load all members when task_type is set to 'member'
      if (this.taskForm.task_type === 'member') {
        this.loadAllMembers();
      } else if (this.taskForm.task_type === 'coach') {
        // Load coaches when task_type is set to 'coach'
        this.loadCoaches();
      } else {
        this.allMembers = [];
      }
      // Clear validation errors when task type changes
      this.clearValidationError('member_id');
      this.clearValidationError('coach_id');
      this.clearValidationError('task_type');
    },
    selectMember: function selectMember(member) {
      this.taskForm.member_id = member.id;
      this.taskForm.concerns = member.membername || "".concat(member.firstname, " ").concat(member.lastname);
      this.memberSearchResults = [];
      // Clear validation error when member is selected
      this.clearValidationError('member_id');
    },
    selectCoach: function selectCoach(coach) {
      this.taskForm.coach_id = coach.id;
      this.taskForm.concerns = coach.name || 'Coach';
      this.coachSearchResults = [];
      // Clear validation error when coach is selected
      this.clearValidationError('coach_id');
    },
    handleCoachSelectChange: function handleCoachSelectChange() {
      var _this4 = this;
      // When coach is selected from dropdown, update concerns field
      if (this.taskForm.coach_id) {
        var selectedCoach = this.coaches.find(function (c) {
          return c.id === _this4.taskForm.coach_id;
        });
        if (selectedCoach) {
          this.taskForm.concerns = selectedCoach.name || 'Coach';
        }
      } else {
        // If coach is cleared, clear concerns field
        this.taskForm.concerns = '';
      }
      this.clearValidationError('coach_id');
    },
    openNewTaskModal: function openNewTaskModal() {
      var _this5 = this;
      this.isEditing = false;
      this.editingTask = null;
      this.showDetails = false;
      // Reset form with default values including "New Task" title
      this.resetTaskForm();
      // Ensure title is set to "New Task" as default
      this.$nextTick(function () {
        if (!_this5.taskForm.title || _this5.taskForm.title.trim() === '') {
          _this5.taskForm.title = 'New Task';
        }
        // If task_type is 'coach', ensure coaches are loaded
        if (_this5.taskForm.task_type === 'coach' && _this5.coaches.length === 0) {
          _this5.loadCoaches();
        }
      });
      this.showTaskModal = true;
    },
    editTask: function editTask(task) {
      this.isEditing = true;
      this.editingTask = task;
      // If task is unassigned (template), start with showDetails false
      // If task is assigned, show all details
      var isTemplate = !task.member_id && !task.coach_id && (!task.task_type || task.task_type === null);
      this.showDetails = !isTemplate;

      // Parse time from task if available (due_time field)
      var dueHour = null;
      var dueMinute = null;
      if (task.due_time) {
        // If due_time is in HH:MM format
        var timeParts = task.due_time.split(':');
        if (timeParts.length === 2) {
          dueHour = parseInt(timeParts[0], 10);
          dueMinute = parseInt(timeParts[1], 10);
        }
      }
      // If no time in task, use current time as default
      if (dueHour === null || dueMinute === null) {
        var _now = new Date();
        dueHour = _now.getHours();
        dueMinute = _now.getMinutes();
      }

      // Get current date for auto-fill if due_date is empty
      var now = new Date();
      var currentDate = now.toISOString().split('T')[0];
      this.taskForm = {
        title: task.title || '',
        category: task.category || 'Personal',
        description: task.description || 'This is a general task description. Please update with specific details as needed.',
        concerns: task.member_name || task.coach_name || '',
        member_id: task.member_id || null,
        coach_id: task.coach_id || null,
        is_complete: task.status === 'completed',
        due_date: task.due_date || currentDate,
        // Auto-fill with current date if empty
        due_hour: dueHour,
        due_minute: dueMinute,
        duration: task.duration || '60',
        task_type: task.member_id ? 'member' : task.coach_id ? 'coach' : null,
        task_id: task.id
      };
      // Load all members if editing a member task or if it's a template (user might assign to member)
      if (this.taskForm.task_type === 'member' || isTemplate) {
        this.loadAllMembers();
      } else if (this.taskForm.task_type === 'coach') {
        // Load coaches if editing a coach task
        this.loadCoaches();
      }
      this.showTaskModal = true;
    },
    closeTaskModal: function closeTaskModal() {
      this.showTaskModal = false;
      this.isEditing = false;
      this.editingTask = null;
      this.showDetails = false;
      this.resetTaskForm();
    },
    resetTaskForm: function resetTaskForm() {
      // Get current time and date for auto-fill
      var now = new Date();
      var currentHour = now.getHours();
      var currentMinute = now.getMinutes();
      // Format date as YYYY-MM-DD for input field
      var currentDate = now.toISOString().split('T')[0];
      this.taskForm = {
        title: 'New Task',
        category: 'Personal',
        description: 'This is a general task description. Please update with specific details as needed.',
        concerns: '',
        member_id: null,
        coach_id: null,
        is_complete: false,
        due_date: currentDate,
        // Auto-fill with current date
        due_hour: currentHour,
        // Auto-fill with current hour
        due_minute: currentMinute,
        // Auto-fill with current minute
        duration: '60',
        // Default to 60 minutes
        task_type: 'member'
      };
      this.memberSearchResults = [];
      this.coachSearchResults = [];
      this.allMembers = [];
      this.clearValidationErrors();
    },
    clearValidationErrors: function clearValidationErrors() {
      this.validationErrors = {
        title: '',
        category: '',
        task_type: '',
        coach_id: '',
        member_id: ''
      };
    },
    clearValidationError: function clearValidationError(field) {
      if (this.validationErrors[field]) {
        this.validationErrors[field] = '';
      }
    },
    saveTask: function saveTask() {
      var _this6 = this;
      return _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee4() {
        var hasErrors, taskData, response, _error$response;
        return _regeneratorRuntime().wrap(function _callee4$(_context4) {
          while (1) switch (_context4.prev = _context4.next) {
            case 0:
              // Clear previous validation errors
              _this6.clearValidationErrors();

              // Frontend validation - only require title and category
              hasErrors = false; // Check required fields - only title and category are required
              if (!_this6.taskForm.title || _this6.taskForm.title.trim() === '') {
                _this6.validationErrors.title = 'Task title is required';
                hasErrors = true;
              }
              if (!_this6.taskForm.category) {
                _this6.validationErrors.category = 'Category is required';
                hasErrors = true;
              }

              // No other validations - member/coach selection is optional

              // If validation fails, stop and show field-level errors
              if (!hasErrors) {
                _context4.next = 8;
                break;
              }
              _this6.saving = false;
              // Scroll to first error field
              _this6.$nextTick(function () {
                var firstError = document.querySelector('.is-invalid');
                if (firstError) {
                  firstError.scrollIntoView({
                    behavior: 'smooth',
                    block: 'center'
                  });
                  firstError.focus();
                }
              });
              return _context4.abrupt("return");
            case 8:
              _this6.saving = true;
              _context4.prev = 9;
              // Build task data with only required fields
              taskData = {
                title: _this6.taskForm.title,
                category: _this6.taskForm.category,
                description: _this6.taskForm.description || '',
                status: _this6.taskForm.is_complete ? 'completed' : 'pending',
                due_date: _this6.taskForm.due_date || null
              }; // Only add task_type, member_id, or coach_id if showDetails is opened and they are set
              // Tasks can be saved without assignment (same as templates)
              if (_this6.showDetails && _this6.taskForm.task_type) {
                taskData.task_type = _this6.taskForm.task_type;

                // Only add IDs if they are actually selected
                if (_this6.taskForm.task_type === 'member' && _this6.taskForm.member_id) {
                  taskData.member_id = _this6.taskForm.member_id;
                } else if (_this6.taskForm.task_type === 'coach' && _this6.taskForm.coach_id) {
                  taskData.coach_id = _this6.taskForm.coach_id;
                }
              } else if (_this6.showDetails && !_this6.taskForm.task_type) {
                // If showDetails is open but no task_type selected, explicitly set to null
                // This allows converting assigned tasks back to unassigned
                taskData.task_type = null;
                taskData.member_id = null;
                taskData.coach_id = null;
              }
              // If showDetails is false or task_type is not set, don't send task_type, member_id, or coach_id
              // Task will be saved as unassigned (same as templates)
              if (!(_this6.isEditing && _this6.editingTask)) {
                _context4.next = 18;
                break;
              }
              _context4.next = 15;
              return axios__WEBPACK_IMPORTED_MODULE_0___default().put("tasks/".concat(_this6.editingTask.id), taskData);
            case 15:
              response = _context4.sent;
              _context4.next = 21;
              break;
            case 18:
              _context4.next = 20;
              return axios__WEBPACK_IMPORTED_MODULE_0___default().post('tasks', taskData);
            case 20:
              response = _context4.sent;
            case 21:
              if (!response.data.success) {
                _context4.next = 27;
                break;
              }
              _this6.$bvToast.toast(_this6.isEditing ? 'Task updated successfully' : 'Task created successfully', {
                title: 'Success',
                variant: 'success',
                solid: true
              });
              _this6.closeTaskModal();
              _this6.loadTasks();
              _context4.next = 28;
              break;
            case 27:
              throw new Error(response.data.message || 'Failed to save task');
            case 28:
              _context4.next = 33;
              break;
            case 30:
              _context4.prev = 30;
              _context4.t0 = _context4["catch"](9);
              _this6.$bvToast.toast(((_error$response = _context4.t0.response) === null || _error$response === void 0 || (_error$response = _error$response.data) === null || _error$response === void 0 ? void 0 : _error$response.message) || 'Error saving task', {
                title: 'Error',
                variant: 'danger',
                solid: true
              });
            case 33:
              _context4.prev = 33;
              _this6.saving = false;
              return _context4.finish(33);
            case 36:
            case "end":
              return _context4.stop();
          }
        }, _callee4, null, [[9, 30, 33, 36]]);
      }))();
    },
    toggleTaskStatus: function toggleTaskStatus(task) {
      var _this7 = this;
      return _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee5() {
        var newStatus, taskData, _error$response2, errorMessage;
        return _regeneratorRuntime().wrap(function _callee5$(_context5) {
          while (1) switch (_context5.prev = _context5.next) {
            case 0:
              _context5.prev = 0;
              newStatus = task.status === 'completed' ? 'pending' : 'completed';
              taskData = {
                status: newStatus
              }; // Only include task_type if it exists (for assigned tasks)
              if (task.task_type) {
                taskData.task_type = task.task_type;
              } else if (task.member_id) {
                taskData.task_type = 'member';
              } else if (task.coach_id) {
                taskData.task_type = 'coach';
              }
              _context5.next = 6;
              return axios__WEBPACK_IMPORTED_MODULE_0___default().put("tasks/".concat(task.id), taskData);
            case 6:
              _this7.loadTasks();
              _context5.next = 13;
              break;
            case 9:
              _context5.prev = 9;
              _context5.t0 = _context5["catch"](0);
              errorMessage = ((_error$response2 = _context5.t0.response) === null || _error$response2 === void 0 || (_error$response2 = _error$response2.data) === null || _error$response2 === void 0 ? void 0 : _error$response2.message) || 'Error updating task status';
              _this7.$bvToast.toast(errorMessage, {
                title: 'Error',
                variant: 'danger',
                solid: true
              });
            case 13:
            case "end":
              return _context5.stop();
          }
        }, _callee5, null, [[0, 9]]);
      }))();
    },
    deleteTask: function deleteTask(task) {
      var _this8 = this;
      return _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee6() {
        var result, deleteParams, _error$response3;
        return _regeneratorRuntime().wrap(function _callee6$(_context6) {
          while (1) switch (_context6.prev = _context6.next) {
            case 0:
              _context6.next = 2;
              return _this8.$swal({
                title: 'Are you sure?',
                text: "Do you want to delete \"".concat(task.title, "\"? This action cannot be undone."),
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#dc3545',
                cancelButtonColor: '#6c757d',
                confirmButtonText: 'Yes, delete it!',
                cancelButtonText: 'Cancel',
                reverseButtons: true
              });
            case 2:
              result = _context6.sent;
              if (result.isConfirmed) {
                _context6.next = 5;
                break;
              }
              return _context6.abrupt("return");
            case 5:
              _context6.prev = 5;
              // Send task_type if it exists, otherwise don't send it (backend handles null)
              deleteParams = {};
              if (task.task_type) {
                deleteParams.task_type = task.task_type;
              }
              _context6.next = 10;
              return axios__WEBPACK_IMPORTED_MODULE_0___default()["delete"]("tasks/".concat(task.id), {
                params: deleteParams
              });
            case 10:
              _this8.$bvToast.toast('Task deleted successfully', {
                title: 'Success',
                variant: 'success',
                solid: true
              });
              _this8.loadTasks();
              _context6.next = 17;
              break;
            case 14:
              _context6.prev = 14;
              _context6.t0 = _context6["catch"](5);
              _this8.$bvToast.toast(((_error$response3 = _context6.t0.response) === null || _error$response3 === void 0 || (_error$response3 = _error$response3.data) === null || _error$response3 === void 0 ? void 0 : _error$response3.message) || 'Error deleting task', {
                title: 'Error',
                variant: 'danger',
                solid: true
              });
            case 17:
            case "end":
              return _context6.stop();
          }
        }, _callee6, null, [[5, 14]]);
      }))();
    },
    formatDate: function formatDate(date) {
      if (!date) return '';
      var d = new Date(date);
      return d.toLocaleDateString();
    }
  }
});

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js??clonedRuleSet-12.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12.use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-12.use[3]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/Tasks/Tasks.vue?vue&type=style&index=0&id=29ace440&lang=scss&scoped=true":
/*!**************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??clonedRuleSet-12.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12.use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-12.use[3]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/Tasks/Tasks.vue?vue&type=style&index=0&id=29ace440&lang=scss&scoped=true ***!
  \**************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
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
___CSS_LOADER_EXPORT___.push([module.id, "@charset \"UTF-8\";\n.filter-btn .btn[data-v-29ace440],\n.filter-btn .btn-secondary[data-v-29ace440],\n.filter-btn .btn-outline-secondary[data-v-29ace440],\n.filter-btn button.btn[data-v-29ace440],\n.filter-btn button.btn-secondary[data-v-29ace440] {\n  color: #000 !important;\n  background-color: transparent !important;\n  border-color: #6c757d !important;\n}\n.filter-btn .btn[data-v-29ace440]:hover,\n.filter-btn .btn-secondary[data-v-29ace440]:hover,\n.filter-btn .btn-outline-secondary[data-v-29ace440]:hover,\n.filter-btn button.btn[data-v-29ace440]:hover,\n.filter-btn button.btn-secondary[data-v-29ace440]:hover {\n  color: #dc3545 !important;\n  background-color: transparent !important;\n  border-color: #dc3545 !important;\n  box-shadow: none !important;\n}\n.filter-btn .btn[data-v-29ace440]:focus,\n.filter-btn .btn-secondary[data-v-29ace440]:focus,\n.filter-btn .btn-outline-secondary[data-v-29ace440]:focus,\n.filter-btn button.btn[data-v-29ace440]:focus,\n.filter-btn button.btn-secondary[data-v-29ace440]:focus {\n  color: #dc3545 !important;\n  background-color: transparent !important;\n  border-color: #dc3545 !important;\n  box-shadow: none !important;\n}\n.filter-btn .btn[data-v-29ace440]:active,\n.filter-btn .btn-secondary[data-v-29ace440]:active,\n.filter-btn .btn-outline-secondary[data-v-29ace440]:active,\n.filter-btn button.btn[data-v-29ace440]:active,\n.filter-btn button.btn-secondary[data-v-29ace440]:active {\n  color: #dc3545 !important;\n  background-color: transparent !important;\n  border-color: #dc3545 !important;\n}\n.btn-secondary[data-v-29ace440]:not(:disabled):not(.disabled):active:focus {\n  box-shadow: none !important;\n}\n\n/* ===========================================\n   COMMON BREADCRUMB NAVIGATION STYLES\n   =========================================== */\n.breadcrumb-nav-row[data-v-29ace440] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  margin-bottom: 0.5rem;\n  gap: 0.5rem;\n}\n.breadcrumb-section[data-v-29ace440] {\n  flex: 1;\n}\n.breadcrumb-section .breadcrumb-nav .breadcrumb-container[data-v-29ace440] {\n  display: flex;\n  align-items: center;\n  gap: 1rem;\n}\n.breadcrumb-section .breadcrumb-nav .breadcrumb-container .back-button[data-v-29ace440] {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  width: 40px;\n  height: 40px;\n  background: rgba(255, 255, 255, 0.1);\n  border: 1px solid rgba(255, 255, 255, 0.2);\n  border-radius: 8px;\n  color: #ffffff;\n  cursor: pointer;\n  transition: all 0.3s ease;\n}\n.breadcrumb-section .breadcrumb-nav .breadcrumb-container .back-button[data-v-29ace440]:hover {\n  background: rgba(255, 255, 255, 0.15);\n  border-color: rgba(255, 255, 255, 0.3);\n  transform: translateY(-1px);\n  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);\n  color: #dc3545;\n}\n.breadcrumb-section .breadcrumb-nav .breadcrumb-container .back-button i[data-v-29ace440] {\n  font-size: 1.1em;\n}\n.breadcrumb-section .breadcrumb-nav .breadcrumb-container .breadcrumb[data-v-29ace440] {\n  display: flex;\n  align-items: center;\n  gap: 0.5rem;\n  margin: 0;\n  padding: 0;\n  background: none;\n  border-radius: 0;\n}\n.breadcrumb-section .breadcrumb-nav .breadcrumb-container .breadcrumb .breadcrumb-item[data-v-29ace440] {\n  display: flex;\n  align-items: center;\n  gap: 0.5rem;\n  font-size: 0.875rem;\n  color: #ffffff;\n}\n.breadcrumb-section .breadcrumb-nav .breadcrumb-container .breadcrumb .breadcrumb-item.active[data-v-29ace440] {\n  color: #252525;\n  font-weight: 600;\n}\n.breadcrumb-section .breadcrumb-nav .breadcrumb-container .breadcrumb .breadcrumb-item.active i[data-v-29ace440] {\n  color: #dc3545;\n}\n.breadcrumb-section .breadcrumb-nav .breadcrumb-container .breadcrumb .breadcrumb-item a[data-v-29ace440] {\n  display: flex;\n  align-items: center;\n  gap: 0.5rem;\n  color: #6a6a6a;\n  text-decoration: none;\n  transition: color 0.3s ease;\n}\n.breadcrumb-section .breadcrumb-nav .breadcrumb-container .breadcrumb .breadcrumb-item a[data-v-29ace440]:hover {\n  color: #dc3545;\n}\n.breadcrumb-section .breadcrumb-nav .breadcrumb-container .breadcrumb .breadcrumb-item a:hover i[data-v-29ace440] {\n  color: #dc3545;\n}\n.breadcrumb-section .breadcrumb-nav .breadcrumb-container .breadcrumb .breadcrumb-item a i[data-v-29ace440] {\n  font-size: 0.9em;\n  transition: color 0.3s ease;\n}\n.breadcrumb-section .breadcrumb-nav .breadcrumb-container .breadcrumb .breadcrumb-item[data-v-29ace440]:not(:last-child)::after {\n  content: \"›\";\n  margin-left: 0.5rem;\n  color: #6a6a6a;\n  font-size: 1.2em;\n}\n.action-section[data-v-29ace440] {\n  display: flex;\n  align-items: center;\n}\n.action-section .action-btn[data-v-29ace440] {\n  display: flex;\n  align-items: center;\n  gap: 0.5rem;\n  padding: 0.5rem 1rem;\n  border-radius: 8px;\n  font-size: 0.875rem;\n  font-weight: 500;\n  transition: all 0.3s ease;\n}\n.action-section .action-btn[data-v-29ace440]:hover:not(:disabled) {\n  transform: translateY(-1px);\n  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);\n}\n.action-section .action-btn[data-v-29ace440]:disabled {\n  opacity: 0.6;\n  cursor: not-allowed;\n}\n.action-section .action-btn i[data-v-29ace440] {\n  font-size: 0.9em;\n}\n@media (max-width: 768px) {\n.breadcrumb-nav-row[data-v-29ace440] {\n    flex-direction: column;\n    align-items: flex-start;\n    gap: 0.5rem;\n}\n.breadcrumb-section[data-v-29ace440] {\n    width: 100%;\n}\n.breadcrumb-section .breadcrumb-container[data-v-29ace440] {\n    flex-direction: column;\n    align-items: flex-start;\n    gap: 0.5rem;\n}\n.breadcrumb-section .breadcrumb-container .breadcrumb[data-v-29ace440] {\n    flex-wrap: wrap;\n}\n.breadcrumb-section .breadcrumb-container .breadcrumb .breadcrumb-item[data-v-29ace440] {\n    font-size: 0.8rem;\n}\n.breadcrumb-section .breadcrumb-container .breadcrumb .breadcrumb-item a[data-v-29ace440] {\n    font-size: 0.8rem;\n}\n.action-section[data-v-29ace440] {\n    width: 100%;\n    justify-content: flex-end;\n}\n.action-section .action-btn[data-v-29ace440] {\n    font-size: 0.8rem;\n    padding: 0.4rem 0.8rem;\n}\n}\n/* ===========================================\n   RESPONSIVE UTILITY CLASSES (ALL DEVICES)\n   =========================================== */\n.show-xs-only[data-v-29ace440],\n.show-sm-only[data-v-29ace440],\n.show-md-only[data-v-29ace440],\n.show-lg-only[data-v-29ace440],\n.show-xl-only[data-v-29ace440] {\n  display: none !important;\n}\n@media (max-width: 575px) {\n.hide-xs[data-v-29ace440] {\n    display: none !important;\n}\n.show-xs-only[data-v-29ace440] {\n    display: initial !important;\n}\n}\n@media (min-width: 576px) and (max-width: 767px) {\n.hide-sm[data-v-29ace440] {\n    display: none !important;\n}\n.show-sm-only[data-v-29ace440] {\n    display: initial !important;\n}\n}\n@media (min-width: 768px) and (max-width: 991px) {\n.hide-md[data-v-29ace440] {\n    display: none !important;\n}\n.show-md-only[data-v-29ace440] {\n    display: initial !important;\n}\n}\n@media (min-width: 992px) and (max-width: 1199px) {\n.hide-lg[data-v-29ace440] {\n    display: none !important;\n}\n.show-lg-only[data-v-29ace440] {\n    display: initial !important;\n}\n}\n@media (min-width: 1200px) {\n.hide-xl[data-v-29ace440] {\n    display: none !important;\n}\n.show-xl-only[data-v-29ace440] {\n    display: initial !important;\n}\n}\n@media (max-width: 576px) {\n.hide-sm-down[data-v-29ace440] {\n    display: none !important;\n}\n}\n@media (max-width: 768px) {\n.hide-md-down[data-v-29ace440] {\n    display: none !important;\n}\n}\n@media (max-width: 992px) {\n.hide-lg-down[data-v-29ace440] {\n    display: none !important;\n}\n}\n@media (min-width: 576px) {\n.hide-sm-up[data-v-29ace440] {\n    display: none !important;\n}\n}\n@media (min-width: 768px) {\n.hide-md-up[data-v-29ace440] {\n    display: none !important;\n}\n}\n@media (min-width: 992px) {\n.hide-lg-up[data-v-29ace440] {\n    display: none !important;\n}\n}\n@media (max-width: 575px) {\n.d-xs-none[data-v-29ace440] {\n    display: none !important;\n}\n.d-xs-block[data-v-29ace440] {\n    display: block !important;\n}\n.d-xs-flex[data-v-29ace440] {\n    display: flex !important;\n}\n}\n@media (min-width: 576px) and (max-width: 767px) {\n.d-sm-none[data-v-29ace440] {\n    display: none !important;\n}\n.d-sm-block[data-v-29ace440] {\n    display: block !important;\n}\n.d-sm-flex[data-v-29ace440] {\n    display: flex !important;\n}\n}\n@media (min-width: 768px) and (max-width: 991px) {\n.d-md-none[data-v-29ace440] {\n    display: none !important;\n}\n.d-md-block[data-v-29ace440] {\n    display: block !important;\n}\n.d-md-flex[data-v-29ace440] {\n    display: flex !important;\n}\n}\n@media (min-width: 992px) and (max-width: 1199px) {\n.d-lg-none[data-v-29ace440] {\n    display: none !important;\n}\n.d-lg-block[data-v-29ace440] {\n    display: block !important;\n}\n.d-lg-flex[data-v-29ace440] {\n    display: flex !important;\n}\n}\n@media (min-width: 1200px) {\n.d-xl-none[data-v-29ace440] {\n    display: none !important;\n}\n.d-xl-block[data-v-29ace440] {\n    display: block !important;\n}\n.d-xl-flex[data-v-29ace440] {\n    display: flex !important;\n}\n}\n@media (min-width: 576px) {\n.custom-modal-xl[data-v-29ace440] {\n    max-width: 1500px !important;\n}\n}\n.tasks-page[data-v-29ace440] {\n  padding: 1.5rem;\n}\n.breadcrumb-nav-row[data-v-29ace440] {\n  margin-bottom: 1.5rem;\n}\n.tasks-header .page-title[data-v-29ace440] {\n  font-size: 1.75rem;\n  font-weight: 700;\n  color: #000;\n}\n.tasks-header .new-task-btn[data-v-29ace440] {\n  background-color: #dc3545;\n  border: none;\n  border-radius: 8px;\n  padding: 0.5rem 1.5rem;\n  font-weight: 500;\n}\n.tasks-header .new-task-btn[data-v-29ace440]:hover {\n  background-color: #dc3545;\n}\n.filters-section .filter-select[data-v-29ace440],\n.filters-section .filter-input[data-v-29ace440] {\n  border-radius: 8px;\n  border: 1px solid #ddd;\n}\n.tasks-list .task-item[data-v-29ace440] {\n  background-color: #f5f5f5;\n  border-radius: 8px;\n  padding: 1rem;\n  margin-bottom: 0.75rem;\n  display: flex;\n  align-items: flex-start;\n  gap: 1rem;\n}\n.tasks-list .task-item.task-completed[data-v-29ace440] {\n  opacity: 0.6;\n}\n.tasks-list .task-item .task-checkbox[data-v-29ace440] {\n  margin-top: 0.25rem;\n}\n.tasks-list .task-item .task-content .task-title[data-v-29ace440] {\n  font-weight: 500;\n  margin-bottom: 0.25rem;\n}\n.tasks-list .task-item .task-content .task-title .member-name[data-v-29ace440],\n.tasks-list .task-item .task-content .task-title .coach-name[data-v-29ace440] {\n  color: #4A90E2;\n}\n.tasks-list .task-item .task-content .task-description[data-v-29ace440] {\n  color: #666;\n  font-size: 0.875rem;\n  margin-bottom: 0.5rem;\n}\n.tasks-list .task-item .task-content .task-meta[data-v-29ace440] {\n  display: flex;\n  gap: 1rem;\n  font-size: 0.875rem;\n  color: #999;\n}\n.tasks-list .task-item .task-content .task-meta .task-category[data-v-29ace440] {\n  font-weight: 500;\n}\n.tasks-list .task-item .task-actions[data-v-29ace440] {\n  display: flex;\n  gap: 0.5rem;\n}\n.task-modal .member-search-results[data-v-29ace440] {\n  max-height: 150px;\n  overflow-y: auto;\n  border: 1px solid #ddd;\n  border-radius: 4px;\n}\n.task-modal .member-search-results .member-result-item[data-v-29ace440] {\n  cursor: pointer;\n  transition: background-color 0.2s;\n}\n.task-modal .member-search-results .member-result-item[data-v-29ace440]:hover {\n  background-color: #f0f0f0;\n}\n.task-modal .modal-footer[data-v-29ace440] {\n  border-top: 1px solid #ddd;\n  padding-top: 1rem;\n  margin-top: 1rem;\n}\n.task-modal .invalid-feedback[data-v-29ace440] {\n  display: block;\n  width: 100%;\n  margin-top: 0.25rem;\n  font-size: 0.875rem;\n  color: #dc3545;\n}\n.task-modal .is-invalid[data-v-29ace440] {\n  border-color: #dc3545;\n}\n.task-modal .is-invalid[data-v-29ace440]:focus {\n  border-color: #dc3545;\n  box-shadow: 0 0 0 0.2rem rgba(220, 53, 69, 0.25);\n}\n.cursor-pointer[data-v-29ace440] {\n  cursor: pointer;\n}\n.task-modal .form-label-inline[data-v-29ace440] {\n  min-width: 140px !important;\n  font-weight: 500;\n  color: #333;\n  margin-right: 4rem !important;\n  padding-right: 2rem !important;\n}\n.task-modal .task-input-wrapper[data-v-29ace440] {\n  margin-left: 4rem !important;\n}\n.task-modal .info-icon-label[data-v-29ace440] {\n  font-size: 0.75rem;\n  cursor: help;\n  color: #6c757d;\n  opacity: 0.7;\n  transition: opacity 0.2s;\n  flex-shrink: 0;\n  line-height: 1;\n  margin-top: 2px;\n}\n.task-modal .info-icon-label[data-v-29ace440]:hover {\n  opacity: 1;\n  color: #495057;\n}\n.task-modal .show-details-btn[data-v-29ace440] {\n  border-radius: 20px !important;\n  padding: 0.5rem 1.5rem !important;\n  font-weight: 400;\n  border: 2px solid #ced4da !important;\n  background-color: #f8f9fa !important;\n  color: #495057 !important;\n  transition: all 0.2s;\n  text-align: left;\n  outline: none !important;\n  box-shadow: none !important;\n}\n.task-modal .show-details-btn[data-v-29ace440]:hover {\n  background-color: #e9ecef !important;\n  border-color: #adb5bd !important;\n  color: #495057 !important;\n}\n.task-modal .show-details-btn[data-v-29ace440]:focus {\n  box-shadow: none !important;\n  border: 2px solid #ced4da !important;\n  outline: none !important;\n}\n.task-modal .show-details-btn[data-v-29ace440]:active {\n  border: 2px solid #ced4da !important;\n  box-shadow: none !important;\n}\n.task-modal .modal-footer[data-v-29ace440] {\n  border-top: 1px solid #dee2e6;\n  padding-top: 1rem;\n  margin-top: 1rem;\n  display: flex;\n  justify-content: flex-end;\n}\n.task-modal .modal-save-btn[data-v-29ace440] {\n  background-color: #dc3545;\n  border-color: #dc3545;\n  color: #fff;\n  padding: 0.5rem 1.5rem;\n  border-radius: 4px;\n  font-weight: 500;\n}\n.task-modal .modal-save-btn[data-v-29ace440]:hover:not(:disabled) {\n  background-color: #c82333;\n  border-color: #bd2130;\n  color: #fff;\n}\n.task-modal .modal-save-btn[data-v-29ace440]:focus {\n  box-shadow: 0 0 0 0.2rem rgba(220, 53, 69, 0.25);\n}\n.task-modal .modal-save-btn[data-v-29ace440]:disabled {\n  opacity: 0.65;\n}", ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js??clonedRuleSet-12.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12.use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-12.use[3]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/Tasks/Tasks.vue?vue&type=style&index=1&id=29ace440&lang=scss":
/*!**************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??clonedRuleSet-12.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12.use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-12.use[3]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/Tasks/Tasks.vue?vue&type=style&index=1&id=29ace440&lang=scss ***!
  \**************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
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
___CSS_LOADER_EXPORT___.push([module.id, ".modal.task-modal .form-label-inline,\n.modal.task-modal .modal-body .form-label-inline,\n.task-modal .form-label-inline {\n  min-width: 140px !important;\n  font-weight: 500 !important;\n  color: #333 !important;\n  margin-right: 4rem !important;\n  padding-right: 2rem !important;\n  display: inline-block !important;\n}\n.modal.task-modal .task-input-wrapper,\n.modal.task-modal .modal-body .task-input-wrapper,\n.task-modal .task-input-wrapper {\n  margin-left: 4rem !important;\n  display: inline-block !important;\n  flex: 1 1 auto !important;\n}\nbody .modal.task-modal .form-label-inline,\nbody .modal.task-modal label.form-label-inline {\n  min-width: 140px !important;\n  margin-right: 4rem !important;\n  padding-right: 2rem !important;\n}\nbody .modal.task-modal .task-input-wrapper,\nbody .modal.task-modal div.task-input-wrapper {\n  margin-left: 4rem !important;\n}", ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-12.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12.use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-12.use[3]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/Tasks/Tasks.vue?vue&type=style&index=0&id=29ace440&lang=scss&scoped=true":
/*!******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-12.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12.use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-12.use[3]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/Tasks/Tasks.vue?vue&type=style&index=0&id=29ace440&lang=scss&scoped=true ***!
  \******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../../../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_clonedRuleSet_12_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_12_use_2_node_modules_sass_loader_dist_cjs_js_clonedRuleSet_12_use_3_node_modules_vue_loader_lib_index_js_vue_loader_options_Tasks_vue_vue_type_style_index_0_id_29ace440_lang_scss_scoped_true__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !!../../../../../../node_modules/css-loader/dist/cjs.js??clonedRuleSet-12.use[1]!../../../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12.use[2]!../../../../../../node_modules/sass-loader/dist/cjs.js??clonedRuleSet-12.use[3]!../../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Tasks.vue?vue&type=style&index=0&id=29ace440&lang=scss&scoped=true */ "./node_modules/css-loader/dist/cjs.js??clonedRuleSet-12.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12.use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-12.use[3]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/Tasks/Tasks.vue?vue&type=style&index=0&id=29ace440&lang=scss&scoped=true");

            

var options = {};

options.insert = "head";
options.singleton = false;

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_clonedRuleSet_12_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_12_use_2_node_modules_sass_loader_dist_cjs_js_clonedRuleSet_12_use_3_node_modules_vue_loader_lib_index_js_vue_loader_options_Tasks_vue_vue_type_style_index_0_id_29ace440_lang_scss_scoped_true__WEBPACK_IMPORTED_MODULE_1__["default"], options);



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_clonedRuleSet_12_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_12_use_2_node_modules_sass_loader_dist_cjs_js_clonedRuleSet_12_use_3_node_modules_vue_loader_lib_index_js_vue_loader_options_Tasks_vue_vue_type_style_index_0_id_29ace440_lang_scss_scoped_true__WEBPACK_IMPORTED_MODULE_1__["default"].locals || {});

/***/ }),

/***/ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-12.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12.use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-12.use[3]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/Tasks/Tasks.vue?vue&type=style&index=1&id=29ace440&lang=scss":
/*!******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-12.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12.use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-12.use[3]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/Tasks/Tasks.vue?vue&type=style&index=1&id=29ace440&lang=scss ***!
  \******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../../../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_clonedRuleSet_12_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_12_use_2_node_modules_sass_loader_dist_cjs_js_clonedRuleSet_12_use_3_node_modules_vue_loader_lib_index_js_vue_loader_options_Tasks_vue_vue_type_style_index_1_id_29ace440_lang_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !!../../../../../../node_modules/css-loader/dist/cjs.js??clonedRuleSet-12.use[1]!../../../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12.use[2]!../../../../../../node_modules/sass-loader/dist/cjs.js??clonedRuleSet-12.use[3]!../../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Tasks.vue?vue&type=style&index=1&id=29ace440&lang=scss */ "./node_modules/css-loader/dist/cjs.js??clonedRuleSet-12.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12.use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-12.use[3]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/Tasks/Tasks.vue?vue&type=style&index=1&id=29ace440&lang=scss");

            

var options = {};

options.insert = "head";
options.singleton = false;

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_clonedRuleSet_12_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_12_use_2_node_modules_sass_loader_dist_cjs_js_clonedRuleSet_12_use_3_node_modules_vue_loader_lib_index_js_vue_loader_options_Tasks_vue_vue_type_style_index_1_id_29ace440_lang_scss__WEBPACK_IMPORTED_MODULE_1__["default"], options);



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_clonedRuleSet_12_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_12_use_2_node_modules_sass_loader_dist_cjs_js_clonedRuleSet_12_use_3_node_modules_vue_loader_lib_index_js_vue_loader_options_Tasks_vue_vue_type_style_index_1_id_29ace440_lang_scss__WEBPACK_IMPORTED_MODULE_1__["default"].locals || {});

/***/ }),

/***/ "./resources/src/views/app/pages/Tasks/Tasks.vue":
/*!*******************************************************!*\
  !*** ./resources/src/views/app/pages/Tasks/Tasks.vue ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Tasks_vue_vue_type_template_id_29ace440_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Tasks.vue?vue&type=template&id=29ace440&scoped=true */ "./resources/src/views/app/pages/Tasks/Tasks.vue?vue&type=template&id=29ace440&scoped=true");
/* harmony import */ var _Tasks_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Tasks.vue?vue&type=script&lang=js */ "./resources/src/views/app/pages/Tasks/Tasks.vue?vue&type=script&lang=js");
/* harmony import */ var _Tasks_vue_vue_type_style_index_0_id_29ace440_lang_scss_scoped_true__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Tasks.vue?vue&type=style&index=0&id=29ace440&lang=scss&scoped=true */ "./resources/src/views/app/pages/Tasks/Tasks.vue?vue&type=style&index=0&id=29ace440&lang=scss&scoped=true");
/* harmony import */ var _Tasks_vue_vue_type_style_index_1_id_29ace440_lang_scss__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Tasks.vue?vue&type=style&index=1&id=29ace440&lang=scss */ "./resources/src/views/app/pages/Tasks/Tasks.vue?vue&type=style&index=1&id=29ace440&lang=scss");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");



;



/* normalize component */

var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_4__["default"])(
  _Tasks_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__["default"],
  _Tasks_vue_vue_type_template_id_29ace440_scoped_true__WEBPACK_IMPORTED_MODULE_0__.render,
  _Tasks_vue_vue_type_template_id_29ace440_scoped_true__WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  "29ace440",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/src/views/app/pages/Tasks/Tasks.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./resources/src/views/app/pages/Tasks/Tasks.vue?vue&type=script&lang=js":
/*!*******************************************************************************!*\
  !*** ./resources/src/views/app/pages/Tasks/Tasks.vue?vue&type=script&lang=js ***!
  \*******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Tasks_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Tasks.vue?vue&type=script&lang=js */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/Tasks/Tasks.vue?vue&type=script&lang=js");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Tasks_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/src/views/app/pages/Tasks/Tasks.vue?vue&type=style&index=0&id=29ace440&lang=scss&scoped=true":
/*!****************************************************************************************************************!*\
  !*** ./resources/src/views/app/pages/Tasks/Tasks.vue?vue&type=style&index=0&id=29ace440&lang=scss&scoped=true ***!
  \****************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_dist_cjs_js_node_modules_css_loader_dist_cjs_js_clonedRuleSet_12_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_12_use_2_node_modules_sass_loader_dist_cjs_js_clonedRuleSet_12_use_3_node_modules_vue_loader_lib_index_js_vue_loader_options_Tasks_vue_vue_type_style_index_0_id_29ace440_lang_scss_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/style-loader/dist/cjs.js!../../../../../../node_modules/css-loader/dist/cjs.js??clonedRuleSet-12.use[1]!../../../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12.use[2]!../../../../../../node_modules/sass-loader/dist/cjs.js??clonedRuleSet-12.use[3]!../../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Tasks.vue?vue&type=style&index=0&id=29ace440&lang=scss&scoped=true */ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-12.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12.use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-12.use[3]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/Tasks/Tasks.vue?vue&type=style&index=0&id=29ace440&lang=scss&scoped=true");


/***/ }),

/***/ "./resources/src/views/app/pages/Tasks/Tasks.vue?vue&type=style&index=1&id=29ace440&lang=scss":
/*!****************************************************************************************************!*\
  !*** ./resources/src/views/app/pages/Tasks/Tasks.vue?vue&type=style&index=1&id=29ace440&lang=scss ***!
  \****************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_dist_cjs_js_node_modules_css_loader_dist_cjs_js_clonedRuleSet_12_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_12_use_2_node_modules_sass_loader_dist_cjs_js_clonedRuleSet_12_use_3_node_modules_vue_loader_lib_index_js_vue_loader_options_Tasks_vue_vue_type_style_index_1_id_29ace440_lang_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/style-loader/dist/cjs.js!../../../../../../node_modules/css-loader/dist/cjs.js??clonedRuleSet-12.use[1]!../../../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12.use[2]!../../../../../../node_modules/sass-loader/dist/cjs.js??clonedRuleSet-12.use[3]!../../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Tasks.vue?vue&type=style&index=1&id=29ace440&lang=scss */ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-12.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12.use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-12.use[3]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/Tasks/Tasks.vue?vue&type=style&index=1&id=29ace440&lang=scss");


/***/ }),

/***/ "./resources/src/views/app/pages/Tasks/Tasks.vue?vue&type=template&id=29ace440&scoped=true":
/*!*************************************************************************************************!*\
  !*** ./resources/src/views/app/pages/Tasks/Tasks.vue?vue&type=template&id=29ace440&scoped=true ***!
  \*************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Tasks_vue_vue_type_template_id_29ace440_scoped_true__WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   staticRenderFns: () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Tasks_vue_vue_type_template_id_29ace440_scoped_true__WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Tasks_vue_vue_type_template_id_29ace440_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Tasks.vue?vue&type=template&id=29ace440&scoped=true */ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/Tasks/Tasks.vue?vue&type=template&id=29ace440&scoped=true");


/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/Tasks/Tasks.vue?vue&type=template&id=29ace440&scoped=true":
/*!****************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/Tasks/Tasks.vue?vue&type=template&id=29ace440&scoped=true ***!
  \****************************************************************************************************************************************************************************************************************************************/
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
    { staticClass: "tasks-page" },
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
              _c(
                "div",
                {
                  staticClass: "breadcrumb-container d-flex align-items-center",
                },
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
                          _vm._v(
                            "\n                                Dashboard\n                            "
                          ),
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
      ]),
      _vm._v(" "),
      _c(
        "div",
        {
          staticClass:
            "tasks-header d-flex justify-content-between align-items-center mb-4",
        },
        [
          _c("h1", { staticClass: "page-title mb-0" }, [_vm._v("Tasks")]),
          _vm._v(" "),
          _c(
            "button",
            {
              staticClass: "btn btn-primary new-task-btn",
              on: { click: _vm.openNewTaskModal },
            },
            [
              _c("i", { staticClass: "fas fa-plus me-2" }),
              _vm._v("\n            New task\n        "),
            ]
          ),
        ]
      ),
      _vm._v(" "),
      _c("div", { staticClass: "filters-section mb-4" }, [
        _c("div", { staticClass: "row" }, [
          _c(
            "div",
            { staticClass: "col-md-2 mb-3 mb-md-0" },
            [
              _c("b-form-select", {
                staticClass: "filter-select",
                attrs: { options: _vm.dateFilterOptions },
                on: { change: _vm.loadTasks },
                model: {
                  value: _vm.filters.dateFilter,
                  callback: function ($$v) {
                    _vm.$set(_vm.filters, "dateFilter", $$v)
                  },
                  expression: "filters.dateFilter",
                },
              }),
            ],
            1
          ),
          _vm._v(" "),
          _c(
            "div",
            { staticClass: "col-md-2 mb-3 mb-md-0" },
            [
              _c("b-form-select", {
                staticClass: "filter-select",
                attrs: { options: _vm.taskFilterOptions },
                on: { change: _vm.loadTasks },
                model: {
                  value: _vm.filters.taskFilter,
                  callback: function ($$v) {
                    _vm.$set(_vm.filters, "taskFilter", $$v)
                  },
                  expression: "filters.taskFilter",
                },
              }),
            ],
            1
          ),
          _vm._v(" "),
          _c(
            "div",
            { staticClass: "col-md-2 mb-3 mb-md-0" },
            [
              _c("b-form-select", {
                staticClass: "filter-select",
                attrs: { options: _vm.coachFilterOptions },
                on: { change: _vm.loadTasks },
                model: {
                  value: _vm.filters.coachFilter,
                  callback: function ($$v) {
                    _vm.$set(_vm.filters, "coachFilter", $$v)
                  },
                  expression: "filters.coachFilter",
                },
              }),
            ],
            1
          ),
          _vm._v(" "),
          _c(
            "div",
            { staticClass: "col-md-6" },
            [
              _c("b-form-input", {
                staticClass: "filter-input",
                attrs: { placeholder: "Search members" },
                on: { input: _vm.loadTasks },
                model: {
                  value: _vm.filters.searchMember,
                  callback: function ($$v) {
                    _vm.$set(_vm.filters, "searchMember", $$v)
                  },
                  expression: "filters.searchMember",
                },
              }),
            ],
            1
          ),
        ]),
      ]),
      _vm._v(" "),
      _vm.isAdmin && _vm.templates.length > 0
        ? _c("div", { staticClass: "mb-4" }, [
            _c(
              "div",
              { staticClass: "tasks-list" },
              _vm._l(_vm.templates, function (template) {
                return _c(
                  "div",
                  { key: template.id, staticClass: "task-item" },
                  [
                    _c("div", { staticClass: "task-content flex-grow-1" }, [
                      _c("div", { staticClass: "task-title" }, [
                        _vm._v(
                          "\n                        " +
                            _vm._s(template.title) +
                            "\n                    "
                        ),
                      ]),
                      _vm._v(" "),
                      template.description
                        ? _c("div", { staticClass: "task-description" }, [
                            _vm._v(
                              "\n                        " +
                                _vm._s(template.description) +
                                "\n                    "
                            ),
                          ])
                        : _vm._e(),
                      _vm._v(" "),
                      _c("div", { staticClass: "task-meta" }, [
                        _c("span", { staticClass: "task-category" }, [
                          _vm._v(_vm._s(template.category)),
                        ]),
                        _vm._v(" "),
                        template.due_date
                          ? _c("span", { staticClass: "task-due-date" }, [
                              _vm._v(
                                "\n                            Due: " +
                                  _vm._s(_vm.formatDate(template.due_date)) +
                                  "\n                        "
                              ),
                            ])
                          : _vm._e(),
                      ]),
                    ]),
                    _vm._v(" "),
                    _c("div", { staticClass: "task-actions" }, [
                      _c(
                        "button",
                        {
                          staticClass: "btn btn-sm btn-link",
                          attrs: { title: "Edit template" },
                          on: {
                            click: function ($event) {
                              return _vm.editTask(template)
                            },
                          },
                        },
                        [_c("i", { staticClass: "fas fa-edit" })]
                      ),
                      _vm._v(" "),
                      _c(
                        "button",
                        {
                          staticClass: "btn btn-sm btn-link text-danger",
                          attrs: { title: "Delete template" },
                          on: {
                            click: function ($event) {
                              return _vm.deleteTask(template)
                            },
                          },
                        },
                        [_c("i", { staticClass: "fas fa-trash" })]
                      ),
                    ]),
                  ]
                )
              }),
              0
            ),
          ])
        : _vm._e(),
      _vm._v(" "),
      _c("div", { staticClass: "tasks-list" }, [
        _vm.loading
          ? _c("div", { staticClass: "text-center py-5" }, [_vm._m(1)])
          : _vm.regularTasks.length === 0 && _vm.templates.length === 0
          ? _c("div", { staticClass: "text-center py-5" }, [
              _c("p", { staticClass: "text-muted" }, [
                _vm._v("No tasks found"),
              ]),
            ])
          : _c(
              "div",
              _vm._l(_vm.regularTasks, function (task) {
                return _c(
                  "div",
                  {
                    key: task.id,
                    staticClass: "task-item",
                    class: { "task-completed": task.status === "completed" },
                  },
                  [
                    _c(
                      "div",
                      { staticClass: "task-checkbox" },
                      [
                        _c("b-form-checkbox", {
                          attrs: { checked: task.status === "completed" },
                          on: {
                            change: function ($event) {
                              return _vm.toggleTaskStatus(task)
                            },
                          },
                        }),
                      ],
                      1
                    ),
                    _vm._v(" "),
                    _c("div", { staticClass: "task-content flex-grow-1" }, [
                      _c("div", { staticClass: "task-title" }, [
                        _vm._v(
                          "\n                        " +
                            _vm._s(task.title) +
                            "\n                        "
                        ),
                        task.member_name
                          ? _c("span", { staticClass: "member-name" }, [
                              _vm._v(
                                "\n                            - " +
                                  _vm._s(task.member_name) +
                                  "\n                        "
                              ),
                            ])
                          : _vm._e(),
                        _vm._v(" "),
                        task.coach_name
                          ? _c("span", { staticClass: "coach-name" }, [
                              _vm._v(
                                "\n                            - " +
                                  _vm._s(task.coach_name) +
                                  "\n                        "
                              ),
                            ])
                          : _vm._e(),
                      ]),
                      _vm._v(" "),
                      task.description
                        ? _c("div", { staticClass: "task-description" }, [
                            _vm._v(
                              "\n                        " +
                                _vm._s(task.description) +
                                "\n                    "
                            ),
                          ])
                        : _vm._e(),
                      _vm._v(" "),
                      _c("div", { staticClass: "task-meta" }, [
                        _c("span", { staticClass: "task-category" }, [
                          _vm._v(_vm._s(task.category)),
                        ]),
                        _vm._v(" "),
                        task.due_date
                          ? _c("span", { staticClass: "task-due-date" }, [
                              _vm._v(
                                "\n                            Due: " +
                                  _vm._s(_vm.formatDate(task.due_date)) +
                                  "\n                        "
                              ),
                            ])
                          : _vm._e(),
                      ]),
                    ]),
                    _vm._v(" "),
                    _c("div", { staticClass: "task-actions" }, [
                      _c(
                        "button",
                        {
                          staticClass: "btn btn-sm btn-link",
                          attrs: { title: "Edit task" },
                          on: {
                            click: function ($event) {
                              return _vm.editTask(task)
                            },
                          },
                        },
                        [_c("i", { staticClass: "fas fa-edit" })]
                      ),
                      _vm._v(" "),
                      _c(
                        "button",
                        {
                          staticClass: "btn btn-sm btn-link text-danger",
                          attrs: { title: "Delete task" },
                          on: {
                            click: function ($event) {
                              return _vm.deleteTask(task)
                            },
                          },
                        },
                        [_c("i", { staticClass: "fas fa-trash" })]
                      ),
                    ]),
                  ]
                )
              }),
              0
            ),
      ]),
      _vm._v(" "),
      _c(
        "b-modal",
        {
          staticClass: "task-modal",
          attrs: {
            title: _vm.isEditing ? "Edit Task" : "New task",
            size: "md",
            centered: "",
            "hide-footer": "",
          },
          on: { hide: _vm.closeTaskModal },
          model: {
            value: _vm.showTaskModal,
            callback: function ($$v) {
              _vm.showTaskModal = $$v
            },
            expression: "showTaskModal",
          },
        },
        [
          _c(
            "form",
            {
              on: {
                submit: function ($event) {
                  $event.preventDefault()
                  return _vm.saveTask.apply(null, arguments)
                },
              },
            },
            [
              _c("div", { staticClass: "form-group mb-3" }, [
                _c("div", { staticClass: "d-flex align-items-center" }, [
                  _c(
                    "label",
                    {
                      staticClass: "form-label-inline mb-0",
                      staticStyle: {
                        "min-width": "80px",
                        "margin-right": "1rem",
                        "padding-right": "1rem",
                      },
                    },
                    [
                      _vm._v(
                        "\n                        Task\n                    "
                      ),
                    ]
                  ),
                  _vm._v(" "),
                  _c(
                    "div",
                    {
                      staticClass: "flex-grow-1 task-input-wrapper",
                      staticStyle: { "margin-left": "4rem" },
                    },
                    [
                      _c("b-form-input", {
                        class: { "is-invalid": _vm.validationErrors.title },
                        attrs: {
                          placeholder: "Enter task title",
                          required: "",
                        },
                        on: {
                          input: function ($event) {
                            return _vm.clearValidationError("title")
                          },
                        },
                        model: {
                          value: _vm.taskForm.title,
                          callback: function ($$v) {
                            _vm.$set(_vm.taskForm, "title", $$v)
                          },
                          expression: "taskForm.title",
                        },
                      }),
                    ],
                    1
                  ),
                ]),
                _vm._v(" "),
                _vm.validationErrors.title
                  ? _c(
                      "div",
                      { staticClass: "invalid-feedback d-block mt-1" },
                      [
                        _vm._v(
                          "\n                    " +
                            _vm._s(_vm.validationErrors.title) +
                            "\n                "
                        ),
                      ]
                    )
                  : _vm._e(),
              ]),
              _vm._v(" "),
              _c("div", { staticClass: "form-group mb-3" }, [
                _c("div", { staticClass: "d-flex align-items-center" }, [
                  _c(
                    "label",
                    {
                      staticClass: "form-label-inline mb-0",
                      staticStyle: {
                        "min-width": "80px",
                        "margin-right": "1rem",
                        "padding-right": "1rem",
                      },
                    },
                    [
                      _vm._v(
                        "\n                        Category\n                    "
                      ),
                    ]
                  ),
                  _vm._v(" "),
                  _c(
                    "div",
                    {
                      staticClass: "flex-grow-1 task-input-wrapper",
                      staticStyle: { "margin-left": "1rem" },
                    },
                    [
                      _c("b-form-select", {
                        class: { "is-invalid": _vm.validationErrors.category },
                        attrs: { options: _vm.categoryOptions, required: "" },
                        on: {
                          change: function ($event) {
                            return _vm.clearValidationError("category")
                          },
                        },
                        model: {
                          value: _vm.taskForm.category,
                          callback: function ($$v) {
                            _vm.$set(_vm.taskForm, "category", $$v)
                          },
                          expression: "taskForm.category",
                        },
                      }),
                    ],
                    1
                  ),
                ]),
                _vm._v(" "),
                _vm.validationErrors.category
                  ? _c(
                      "div",
                      { staticClass: "invalid-feedback d-block mt-1" },
                      [
                        _vm._v(
                          "\n                    " +
                            _vm._s(_vm.validationErrors.category) +
                            "\n                "
                        ),
                      ]
                    )
                  : _vm._e(),
              ]),
              _vm._v(" "),
              !_vm.showDetails
                ? _c("div", { staticClass: "form-group mb-3" }, [
                    _c(
                      "button",
                      {
                        staticClass: "btn show-details-btn",
                        staticStyle: { border: "2px solid #ced4da !important" },
                        attrs: { type: "button" },
                        on: {
                          click: function ($event) {
                            _vm.showDetails = true
                          },
                        },
                      },
                      [
                        _vm._v(
                          "\n                    Show details\n                "
                        ),
                      ]
                    ),
                  ])
                : _vm._e(),
              _vm._v(" "),
              _vm.showDetails
                ? _c("div", [
                    _c("div", { staticClass: "alert alert-info mb-3 py-2" }, [
                      _c("small", [
                        _c("i", { staticClass: "fas fa-info-circle me-1" }),
                        _vm._v(
                          " Optional: Assign this task to a member or coach, or leave blank to save as a general task."
                        ),
                      ]),
                    ]),
                    _vm._v(" "),
                    _c("div", { staticClass: "form-group mb-3" }, [
                      _c("div", { staticClass: "d-flex align-items-center" }, [
                        _c(
                          "label",
                          {
                            staticClass: "form-label-inline mb-0",
                            staticStyle: {
                              "min-width": "80px",
                              "margin-right": "1rem",
                              "padding-right": "1rem",
                            },
                          },
                          [
                            _vm._v(
                              "\n                            Assign To\n                        "
                            ),
                          ]
                        ),
                        _vm._v(" "),
                        _c(
                          "div",
                          {
                            staticClass: "flex-grow-1 task-input-wrapper",
                            staticStyle: { "margin-left": "1rem" },
                          },
                          [
                            _c("b-form-select", {
                              class: {
                                "is-invalid": _vm.validationErrors.task_type,
                              },
                              attrs: {
                                options: [
                                  {
                                    value: null,
                                    text: "Not assigned (General Task)",
                                  },
                                  { value: "member", text: "Assign to Member" },
                                  { value: "coach", text: "Assign to Coach" },
                                ],
                              },
                              on: { change: _vm.handleTaskTypeChange },
                              model: {
                                value: _vm.taskForm.task_type,
                                callback: function ($$v) {
                                  _vm.$set(_vm.taskForm, "task_type", $$v)
                                },
                                expression: "taskForm.task_type",
                              },
                            }),
                          ],
                          1
                        ),
                      ]),
                      _vm._v(" "),
                      _vm.validationErrors.task_type
                        ? _c(
                            "div",
                            { staticClass: "invalid-feedback d-block mt-1" },
                            [
                              _vm._v(
                                "\n                    " +
                                  _vm._s(_vm.validationErrors.task_type) +
                                  "\n                "
                              ),
                            ]
                          )
                        : _vm._e(),
                    ]),
                    _vm._v(" "),
                    _vm.taskForm.task_type
                      ? _c("div", { staticClass: "form-group mb-3" }, [
                          _c(
                            "div",
                            { staticClass: "d-flex align-items-center" },
                            [
                              _c(
                                "label",
                                {
                                  staticClass: "form-label-inline mb-0",
                                  staticStyle: {
                                    "min-width": "80px",
                                    "margin-right": "1rem",
                                    "padding-right": "1rem",
                                  },
                                },
                                [
                                  _vm._v(
                                    "\n                            Concerns\n                        "
                                  ),
                                ]
                              ),
                              _vm._v(" "),
                              _c(
                                "div",
                                {
                                  staticClass: "flex-grow-1 task-input-wrapper",
                                  staticStyle: { "margin-left": "1rem" },
                                },
                                [
                                  _c("b-form-input", {
                                    class: {
                                      "is-invalid":
                                        _vm.validationErrors.member_id ||
                                        _vm.validationErrors.coach_id,
                                    },
                                    attrs: {
                                      placeholder:
                                        _vm.taskForm.task_type === "member"
                                          ? "Find a member"
                                          : "Find a coach",
                                    },
                                    on: {
                                      input: _vm.handleConcernsInput,
                                      focus: _vm.handleConcernsFocus,
                                    },
                                    model: {
                                      value: _vm.taskForm.concerns,
                                      callback: function ($$v) {
                                        _vm.$set(_vm.taskForm, "concerns", $$v)
                                      },
                                      expression: "taskForm.concerns",
                                    },
                                  }),
                                ],
                                1
                              ),
                            ]
                          ),
                          _vm._v(" "),
                          _vm.taskForm.task_type === "member" &&
                          _vm.memberSearchResults.length > 0
                            ? _c(
                                "div",
                                { staticClass: "member-search-results mt-2" },
                                _vm._l(
                                  _vm.memberSearchResults,
                                  function (member) {
                                    return _c(
                                      "div",
                                      {
                                        key: member.id,
                                        staticClass:
                                          "member-result-item p-2 border rounded mb-1 cursor-pointer",
                                        on: {
                                          click: function ($event) {
                                            return _vm.selectMember(member)
                                          },
                                        },
                                      },
                                      [
                                        _vm._v(
                                          "\n                        " +
                                            _vm._s(
                                              member.membername ||
                                                member.firstname +
                                                  " " +
                                                  member.lastname
                                            ) +
                                            "\n                    "
                                        ),
                                      ]
                                    )
                                  }
                                ),
                                0
                              )
                            : _vm._e(),
                          _vm._v(" "),
                          _vm.taskForm.task_type === "coach" &&
                          _vm.coachSearchResults.length > 0
                            ? _c(
                                "div",
                                { staticClass: "member-search-results mt-2" },
                                _vm._l(
                                  _vm.coachSearchResults,
                                  function (coach) {
                                    return _c(
                                      "div",
                                      {
                                        key: coach.id,
                                        staticClass:
                                          "member-result-item p-2 border rounded mb-1 cursor-pointer",
                                        on: {
                                          click: function ($event) {
                                            return _vm.selectCoach(coach)
                                          },
                                        },
                                      },
                                      [
                                        _vm._v(
                                          "\n                        " +
                                            _vm._s(coach.name || "Coach") +
                                            "\n                    "
                                        ),
                                      ]
                                    )
                                  }
                                ),
                                0
                              )
                            : _vm._e(),
                          _vm._v(" "),
                          _vm.validationErrors.member_id
                            ? _c(
                                "div",
                                {
                                  staticClass: "invalid-feedback d-block mt-1",
                                },
                                [
                                  _vm._v(
                                    "\n                    " +
                                      _vm._s(_vm.validationErrors.member_id) +
                                      "\n                "
                                  ),
                                ]
                              )
                            : _vm._e(),
                          _vm._v(" "),
                          _vm.validationErrors.coach_id
                            ? _c(
                                "div",
                                {
                                  staticClass: "invalid-feedback d-block mt-1",
                                },
                                [
                                  _vm._v(
                                    "\n                    " +
                                      _vm._s(_vm.validationErrors.coach_id) +
                                      "\n                "
                                  ),
                                ]
                              )
                            : _vm._e(),
                        ])
                      : _vm._e(),
                    _vm._v(" "),
                    _vm.taskForm.task_type === "coach"
                      ? _c("div", { staticClass: "form-group mb-3" }, [
                          _c(
                            "div",
                            { staticClass: "d-flex align-items-center" },
                            [
                              _c(
                                "label",
                                {
                                  staticClass: "form-label-inline mb-0",
                                  staticStyle: {
                                    "min-width": "80px",
                                    "margin-right": "1rem",
                                    "padding-right": "1rem",
                                  },
                                },
                                [
                                  _vm._v(
                                    "\n                            Coach\n                        "
                                  ),
                                ]
                              ),
                              _vm._v(" "),
                              _c(
                                "div",
                                {
                                  staticClass: "flex-grow-1 task-input-wrapper",
                                  staticStyle: { "margin-left": "1rem" },
                                },
                                [
                                  _c("b-form-select", {
                                    class: {
                                      "is-invalid":
                                        _vm.validationErrors.coach_id,
                                    },
                                    attrs: { options: _vm.coachSelectOptions },
                                    on: { change: _vm.handleCoachSelectChange },
                                    scopedSlots: _vm._u(
                                      [
                                        {
                                          key: "first",
                                          fn: function () {
                                            return [
                                              _c(
                                                "option",
                                                { domProps: { value: null } },
                                                [
                                                  _vm._v(
                                                    "Select Coach (Optional)"
                                                  ),
                                                ]
                                              ),
                                            ]
                                          },
                                          proxy: true,
                                        },
                                      ],
                                      null,
                                      false,
                                      3516637862
                                    ),
                                    model: {
                                      value: _vm.taskForm.coach_id,
                                      callback: function ($$v) {
                                        _vm.$set(_vm.taskForm, "coach_id", $$v)
                                      },
                                      expression: "taskForm.coach_id",
                                    },
                                  }),
                                ],
                                1
                              ),
                            ]
                          ),
                          _vm._v(" "),
                          _vm.validationErrors.coach_id
                            ? _c(
                                "div",
                                {
                                  staticClass: "invalid-feedback d-block mt-1",
                                },
                                [
                                  _vm._v(
                                    "\n                    " +
                                      _vm._s(_vm.validationErrors.coach_id) +
                                      "\n                "
                                  ),
                                ]
                              )
                            : _vm._e(),
                        ])
                      : _vm._e(),
                    _vm._v(" "),
                    _c("div", { staticClass: "form-group mb-3" }, [
                      _c("div", { staticClass: "d-flex align-items-center" }, [
                        _c(
                          "label",
                          {
                            staticClass: "form-label-inline mb-0",
                            staticStyle: {
                              "min-width": "80px",
                              "margin-right": "1rem",
                              "padding-right": "1rem",
                            },
                          },
                          [
                            _vm._v(
                              "\n                            Details\n                        "
                            ),
                          ]
                        ),
                        _vm._v(" "),
                        _c(
                          "div",
                          {
                            staticClass: "flex-grow-1 task-input-wrapper",
                            staticStyle: { "margin-left": "4rem" },
                          },
                          [
                            _c("b-form-textarea", {
                              attrs: { placeholder: "Description", rows: "3" },
                              model: {
                                value: _vm.taskForm.description,
                                callback: function ($$v) {
                                  _vm.$set(_vm.taskForm, "description", $$v)
                                },
                                expression: "taskForm.description",
                              },
                            }),
                          ],
                          1
                        ),
                      ]),
                    ]),
                    _vm._v(" "),
                    _c("div", { staticClass: "form-group mb-3" }, [
                      _c("div", { staticClass: "d-flex align-items-center" }, [
                        _c(
                          "label",
                          {
                            staticClass: "form-label-inline mb-0",
                            staticStyle: {
                              "min-width": "80px",
                              "margin-right": "1rem",
                              "padding-right": "1rem",
                            },
                          },
                          [
                            _vm._v(
                              "\n                            Due Date\n                        "
                            ),
                          ]
                        ),
                        _vm._v(" "),
                        _c(
                          "div",
                          {
                            staticClass: "flex-grow-1 task-input-wrapper",
                            staticStyle: { "margin-left": "1rem" },
                          },
                          [
                            _c("b-form-input", {
                              attrs: {
                                type: "date",
                                placeholder: "Select a date",
                              },
                              model: {
                                value: _vm.taskForm.due_date,
                                callback: function ($$v) {
                                  _vm.$set(_vm.taskForm, "due_date", $$v)
                                },
                                expression: "taskForm.due_date",
                              },
                            }),
                          ],
                          1
                        ),
                      ]),
                    ]),
                    _vm._v(" "),
                    _c("div", { staticClass: "form-group mb-3" }, [
                      _c("div", { staticClass: "d-flex align-items-center" }, [
                        _c(
                          "label",
                          {
                            staticClass: "form-label-inline mb-0",
                            staticStyle: {
                              "min-width": "80px",
                              "margin-right": "1rem",
                              "padding-right": "1rem",
                            },
                          },
                          [
                            _vm._v(
                              "\n                            Time\n                        "
                            ),
                          ]
                        ),
                        _vm._v(" "),
                        _c(
                          "div",
                          {
                            staticClass: "flex-grow-1 task-input-wrapper",
                            staticStyle: { "margin-left": "4rem" },
                          },
                          [
                            _c(
                              "div",
                              { staticClass: "d-flex align-items-center" },
                              [
                                _c("b-form-select", {
                                  staticClass: "me-2",
                                  staticStyle: { width: "80px" },
                                  attrs: { options: _vm.hourOptions },
                                  model: {
                                    value: _vm.taskForm.due_hour,
                                    callback: function ($$v) {
                                      _vm.$set(_vm.taskForm, "due_hour", $$v)
                                    },
                                    expression: "taskForm.due_hour",
                                  },
                                }),
                                _vm._v(" "),
                                _c("span", { staticClass: "me-2" }, [
                                  _vm._v(":"),
                                ]),
                                _vm._v(" "),
                                _c("b-form-select", {
                                  staticStyle: { width: "80px" },
                                  attrs: { options: _vm.minuteOptions },
                                  model: {
                                    value: _vm.taskForm.due_minute,
                                    callback: function ($$v) {
                                      _vm.$set(_vm.taskForm, "due_minute", $$v)
                                    },
                                    expression: "taskForm.due_minute",
                                  },
                                }),
                              ],
                              1
                            ),
                          ]
                        ),
                      ]),
                    ]),
                    _vm._v(" "),
                    _c("div", { staticClass: "form-group mb-3" }, [
                      _c("div", { staticClass: "d-flex align-items-center" }, [
                        _c(
                          "label",
                          {
                            staticClass: "form-label-inline mb-0",
                            staticStyle: {
                              "min-width": "80px",
                              "margin-right": "1rem",
                              "padding-right": "1rem",
                            },
                          },
                          [
                            _vm._v(
                              "\n                            Duration\n                        "
                            ),
                          ]
                        ),
                        _vm._v(" "),
                        _c(
                          "div",
                          {
                            staticClass: "flex-grow-1 task-input-wrapper",
                            staticStyle: { "margin-left": "1rem" },
                          },
                          [
                            _c("b-form-select", {
                              attrs: { options: _vm.durationOptions },
                              model: {
                                value: _vm.taskForm.duration,
                                callback: function ($$v) {
                                  _vm.$set(_vm.taskForm, "duration", $$v)
                                },
                                expression: "taskForm.duration",
                              },
                            }),
                          ],
                          1
                        ),
                      ]),
                    ]),
                    _vm._v(" "),
                    _c("div", { staticClass: "form-group mb-3" }, [
                      _c("div", { staticClass: "d-flex align-items-center" }, [
                        _c(
                          "label",
                          {
                            staticClass: "form-label-inline mb-0",
                            staticStyle: {
                              "min-width": "80px",
                              "margin-right": "1rem",
                              "padding-right": "1rem",
                            },
                          },
                          [
                            _vm._v(
                              "\n                            Task is complete\n                        "
                            ),
                          ]
                        ),
                        _vm._v(" "),
                        _c(
                          "div",
                          {
                            staticClass: "task-input-wrapper",
                            staticStyle: { "margin-left": "1rem" },
                          },
                          [
                            _c("b-form-checkbox", {
                              staticClass: "mb-0",
                              model: {
                                value: _vm.taskForm.is_complete,
                                callback: function ($$v) {
                                  _vm.$set(_vm.taskForm, "is_complete", $$v)
                                },
                                expression: "taskForm.is_complete",
                              },
                            }),
                          ],
                          1
                        ),
                      ]),
                    ]),
                  ])
                : _vm._e(),
              _vm._v(" "),
              _c("div", { staticClass: "modal-footer mt-4" }, [
                _c(
                  "button",
                  {
                    staticClass: "btn btn-danger modal-save-btn",
                    attrs: { type: "submit", disabled: _vm.saving },
                  },
                  [
                    _vm.saving
                      ? _c("span", [
                          _c("i", {
                            staticClass: "fas fa-spinner fa-spin me-2",
                          }),
                          _vm._v(
                            "\n                        Saving...\n                    "
                          ),
                        ])
                      : _c("span", [_vm._v("Save")]),
                  ]
                ),
              ]),
            ]
          ),
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
    return _c(
      "li",
      {
        staticClass: "breadcrumb-item active",
        attrs: { "aria-current": "page" },
      },
      [
        _c("i", { staticClass: "fas fa-tasks" }),
        _vm._v("\n                            Tasks\n                        "),
      ]
    )
  },
  function () {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c(
      "div",
      { staticClass: "spinner-border text-primary", attrs: { role: "status" } },
      [_c("span", { staticClass: "sr-only" }, [_vm._v("Loading...")])]
    )
  },
]
render._withStripped = true



/***/ })

}]);