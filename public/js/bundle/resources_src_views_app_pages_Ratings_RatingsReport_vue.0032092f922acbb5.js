"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["resources_src_views_app_pages_Ratings_RatingsReport_vue"],{

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/Ratings/RatingsReport.vue?vue&type=script&lang=js":
/*!*********************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/Ratings/RatingsReport.vue?vue&type=script&lang=js ***!
  \*********************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! axios */ "./node_modules/axios/index.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_0__);
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
  name: 'RatingsReport',
  data: function data() {
    return {
      loading: false,
      error: null,
      coachRatings: [],
      selectedPeriod: 'all',
      sortBy: 'rating',
      staff: []
    };
  },
  computed: {
    overallAverage: function overallAverage() {
      if (this.coachRatings.length === 0) return 0;
      var sum = this.coachRatings.reduce(function (acc, coach) {
        return acc + coach.rating * coach.ratedSessions;
      }, 0);
      var totalRated = this.coachRatings.reduce(function (acc, coach) {
        return acc + coach.ratedSessions;
      }, 0);
      return totalRated > 0 ? sum / totalRated : 0;
    },
    totalSessions: function totalSessions() {
      return this.coachRatings.reduce(function (acc, coach) {
        return acc + coach.ratedSessions;
      }, 0);
    },
    // Total number of individual ratings across all coaches
    totalRatedSessions: function totalRatedSessions() {
      return this.coachRatings.reduce(function (acc, coach) {
        return acc + coach.ratedSessions;
      }, 0);
    },
    topRatedCoach: function topRatedCoach() {
      if (this.coachRatings.length === 0) return null;
      return this.coachRatings.reduce(function (top, coach) {
        return coach.rating > top.rating ? coach : top;
      });
    },
    sortedRatings: function sortedRatings() {
      var sorted = _toConsumableArray(this.coachRatings);
      switch (this.sortBy) {
        case 'rating':
          return sorted.sort(function (a, b) {
            return b.rating - a.rating;
          });
        case 'rating-low':
          return sorted.sort(function (a, b) {
            return a.rating - b.rating;
          });
        case 'name':
          return sorted.sort(function (a, b) {
            return a.name.localeCompare(b.name);
          });
        case 'sessions':
          return sorted.sort(function (a, b) {
            return b.totalSessions - a.totalSessions;
          });
        default:
          return sorted;
      }
    }
  },
  methods: {
    loadStaff: function loadStaff() {
      var _this = this;
      return _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
        var response;
        return _regeneratorRuntime().wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              _context.next = 3;
              return axios__WEBPACK_IMPORTED_MODULE_0___default().get('/appointments/staff');
            case 3:
              response = _context.sent;
              if (response.data.success) {
                _this.staff = response.data.data || [];
              }
              _context.next = 10;
              break;
            case 7:
              _context.prev = 7;
              _context.t0 = _context["catch"](0);
              console.warn('Error loading staff:', _context.t0);
            case 10:
            case "end":
              return _context.stop();
          }
        }, _callee, null, [[0, 7]]);
      }))();
    },
    loadRatingsData: function loadRatingsData() {
      var _this2 = this;
      return _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee2() {
        var response, appointments, now, startDate, quarter, filteredAppointments, coachMap, _err$response;
        return _regeneratorRuntime().wrap(function _callee2$(_context2) {
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
              _this2.loading = true;
              _this2.error = null;
              _context2.prev = 2;
              _context2.next = 5;
              return axios__WEBPACK_IMPORTED_MODULE_0___default().get('/appointments');
            case 5:
              response = _context2.sent;
              if (response.data.success) {
                _context2.next = 8;
                break;
              }
              throw new Error('Failed to fetch appointments');
            case 8:
              appointments = response.data.data || []; // Calculate date range based on selected period
              now = new Date();
              startDate = null;
              _context2.t0 = _this2.selectedPeriod;
              _context2.next = _context2.t0 === 'today' ? 14 : _context2.t0 === 'week' ? 16 : _context2.t0 === 'month' ? 19 : _context2.t0 === 'quarter' ? 21 : _context2.t0 === 'year' ? 24 : 26;
              break;
            case 14:
              startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
              return _context2.abrupt("break", 27);
            case 16:
              startDate = new Date(now);
              startDate.setDate(now.getDate() - 7);
              return _context2.abrupt("break", 27);
            case 19:
              startDate = new Date(now.getFullYear(), now.getMonth(), 1);
              return _context2.abrupt("break", 27);
            case 21:
              quarter = Math.floor(now.getMonth() / 3);
              startDate = new Date(now.getFullYear(), quarter * 3, 1);
              return _context2.abrupt("break", 27);
            case 24:
              startDate = new Date(now.getFullYear(), 0, 1);
              return _context2.abrupt("break", 27);
            case 26:
              startDate = null;
            case 27:
              // Filter appointments by period
              filteredAppointments = appointments;
              if (startDate) {
                filteredAppointments = appointments.filter(function (apt) {
                  var aptDate = new Date(apt.date || apt.start);
                  return aptDate >= startDate;
                });
              }

              // Group by coach and calculate ratings
              coachMap = new Map();
              filteredAppointments.forEach(function (apt) {
                var coachId = apt.staff_id || apt.coach_id;
                if (!coachId) return;
                if (!coachMap.has(coachId)) {
                  coachMap.set(coachId, {
                    id: coachId,
                    name: _this2.getCoachName(apt),
                    ratings: [],
                    totalSessions: 0,
                    ratedSessions: 0
                  });
                }
                var coach = coachMap.get(coachId);
                coach.totalSessions++;
                if (apt.rating && apt.rating > 0) {
                  coach.ratings.push(parseFloat(apt.rating));
                  coach.ratedSessions++;
                }
              });

              // Calculate average ratings
              _this2.coachRatings = Array.from(coachMap.values()).map(function (coach) {
                var avgRating = coach.ratings.length > 0 ? coach.ratings.reduce(function (sum, r) {
                  return sum + r;
                }, 0) / coach.ratings.length : 0;
                return {
                  id: coach.id,
                  name: coach.name,
                  rating: avgRating,
                  totalSessions: coach.totalSessions,
                  ratedSessions: coach.ratedSessions
                };
              });

              // Sort by rating by default
              _this2.sortRatings();
              _context2.next = 39;
              break;
            case 35:
              _context2.prev = 35;
              _context2.t1 = _context2["catch"](2);
              console.error('Error loading ratings:', _context2.t1);
              _this2.error = ((_err$response = _context2.t1.response) === null || _err$response === void 0 || (_err$response = _err$response.data) === null || _err$response === void 0 ? void 0 : _err$response.message) || 'Failed to load ratings data';
            case 39:
              _context2.prev = 39;
              _this2.loading = false;
              return _context2.finish(39);
            case 42:
            case "end":
              return _context2.stop();
          }
        }, _callee2, null, [[2, 35, 39, 42]]);
      }))();
    },
    getCoachName: function getCoachName(appointment) {
      var _appointment$appointm;
      // Try to get coach name from appointment data
      if ((_appointment$appointm = appointment.appointment_data) !== null && _appointment$appointm !== void 0 && _appointment$appointm.coach) {
        var coach = appointment.appointment_data.coach;
        var name = "".concat(coach.first_name || '', " ").concat(coach.last_name || '').trim();
        return name || 'Unknown Coach';
      }
      // Fallback: try to get from staff list if available
      if (this.staff && this.staff.length > 0) {
        var staffId = appointment.staff_id || appointment.coach_id;
        var staffMember = this.staff.find(function (s) {
          return s.id == staffId;
        });
        if (staffMember) {
          return staffMember.name;
        }
      }
      return 'Unknown Coach';
    },
    sortRatings: function sortRatings() {
      // Sorting is handled by computed property
      this.$forceUpdate();
    },
    getRankClass: function getRankClass(index) {
      if (index === 0) return 'rank-gold';
      if (index === 1) return 'rank-silver';
      if (index === 2) return 'rank-bronze';
      return 'rank-default';
    },
    getStatusClass: function getStatusClass(rating) {
      if (rating >= 4.5) return 'status-excellent';
      if (rating >= 4.0) return 'status-good';
      if (rating >= 3.0) return 'status-fair';
      return 'status-poor';
    },
    getStatusText: function getStatusText(rating) {
      if (rating >= 4.5) return 'Excellent';
      if (rating >= 4.0) return 'Good';
      if (rating >= 3.0) return 'Fair';
      if (rating > 0) return 'Needs Improvement';
      return 'No Ratings';
    },
    goBack: function goBack() {
      if (window.history.length > 1) {
        this.$router.go(-1);
      } else {
        this.$router.push({
          name: 'dashboard'
        });
      }
    }
  },
  mounted: function mounted() {
    var _this3 = this;
    return _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee3() {
      return _regeneratorRuntime().wrap(function _callee3$(_context3) {
        while (1) switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return _this3.loadStaff();
          case 2:
            _context3.next = 4;
            return _this3.loadRatingsData();
          case 4:
          case "end":
            return _context3.stop();
        }
      }, _callee3);
    }))();
  }
});

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js??clonedRuleSet-12.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12.use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-12.use[3]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/Ratings/RatingsReport.vue?vue&type=style&index=0&id=70522e24&lang=scss&scoped=true":
/*!************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??clonedRuleSet-12.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12.use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-12.use[3]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/Ratings/RatingsReport.vue?vue&type=style&index=0&id=70522e24&lang=scss&scoped=true ***!
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
___CSS_LOADER_EXPORT___.push([module.id, "@charset \"UTF-8\";\n.filter-btn .btn[data-v-70522e24],\n.filter-btn .btn-secondary[data-v-70522e24],\n.filter-btn .btn-outline-secondary[data-v-70522e24],\n.filter-btn button.btn[data-v-70522e24],\n.filter-btn button.btn-secondary[data-v-70522e24] {\n  color: #000 !important;\n  background-color: transparent !important;\n  border-color: #6c757d !important;\n}\n.filter-btn .btn[data-v-70522e24]:hover,\n.filter-btn .btn-secondary[data-v-70522e24]:hover,\n.filter-btn .btn-outline-secondary[data-v-70522e24]:hover,\n.filter-btn button.btn[data-v-70522e24]:hover,\n.filter-btn button.btn-secondary[data-v-70522e24]:hover {\n  color: #dc3545 !important;\n  background-color: transparent !important;\n  border-color: #dc3545 !important;\n  box-shadow: none !important;\n}\n.filter-btn .btn[data-v-70522e24]:focus,\n.filter-btn .btn-secondary[data-v-70522e24]:focus,\n.filter-btn .btn-outline-secondary[data-v-70522e24]:focus,\n.filter-btn button.btn[data-v-70522e24]:focus,\n.filter-btn button.btn-secondary[data-v-70522e24]:focus {\n  color: #dc3545 !important;\n  background-color: transparent !important;\n  border-color: #dc3545 !important;\n  box-shadow: none !important;\n}\n.filter-btn .btn[data-v-70522e24]:active,\n.filter-btn .btn-secondary[data-v-70522e24]:active,\n.filter-btn .btn-outline-secondary[data-v-70522e24]:active,\n.filter-btn button.btn[data-v-70522e24]:active,\n.filter-btn button.btn-secondary[data-v-70522e24]:active {\n  color: #dc3545 !important;\n  background-color: transparent !important;\n  border-color: #dc3545 !important;\n}\n.btn-secondary[data-v-70522e24]:not(:disabled):not(.disabled):active:focus {\n  box-shadow: none !important;\n}\n\n/* ===========================================\n   COMMON BREADCRUMB NAVIGATION STYLES\n   =========================================== */\n.breadcrumb-nav-row[data-v-70522e24] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  margin-bottom: 0.5rem;\n  gap: 0.5rem;\n}\n.breadcrumb-section[data-v-70522e24] {\n  flex: 1;\n}\n.breadcrumb-section .breadcrumb-nav .breadcrumb-container[data-v-70522e24] {\n  display: flex;\n  align-items: center;\n  gap: 1rem;\n}\n.breadcrumb-section .breadcrumb-nav .breadcrumb-container .back-button[data-v-70522e24] {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  width: 40px;\n  height: 40px;\n  background: rgba(255, 255, 255, 0.1);\n  border: 1px solid rgba(255, 255, 255, 0.2);\n  border-radius: 8px;\n  color: #ffffff;\n  cursor: pointer;\n  transition: all 0.3s ease;\n}\n.breadcrumb-section .breadcrumb-nav .breadcrumb-container .back-button[data-v-70522e24]:hover {\n  background: rgba(255, 255, 255, 0.15);\n  border-color: rgba(255, 255, 255, 0.3);\n  transform: translateY(-1px);\n  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);\n  color: #dc3545;\n}\n.breadcrumb-section .breadcrumb-nav .breadcrumb-container .back-button i[data-v-70522e24] {\n  font-size: 1.1em;\n}\n.breadcrumb-section .breadcrumb-nav .breadcrumb-container .breadcrumb[data-v-70522e24] {\n  display: flex;\n  align-items: center;\n  gap: 0.5rem;\n  margin: 0;\n  padding: 0;\n  background: none;\n  border-radius: 0;\n}\n.breadcrumb-section .breadcrumb-nav .breadcrumb-container .breadcrumb .breadcrumb-item[data-v-70522e24] {\n  display: flex;\n  align-items: center;\n  gap: 0.5rem;\n  font-size: 0.875rem;\n  color: #ffffff;\n}\n.breadcrumb-section .breadcrumb-nav .breadcrumb-container .breadcrumb .breadcrumb-item.active[data-v-70522e24] {\n  color: #252525;\n  font-weight: 600;\n}\n.breadcrumb-section .breadcrumb-nav .breadcrumb-container .breadcrumb .breadcrumb-item.active i[data-v-70522e24] {\n  color: #dc3545;\n}\n.breadcrumb-section .breadcrumb-nav .breadcrumb-container .breadcrumb .breadcrumb-item a[data-v-70522e24] {\n  display: flex;\n  align-items: center;\n  gap: 0.5rem;\n  color: #6a6a6a;\n  text-decoration: none;\n  transition: color 0.3s ease;\n}\n.breadcrumb-section .breadcrumb-nav .breadcrumb-container .breadcrumb .breadcrumb-item a[data-v-70522e24]:hover {\n  color: #dc3545;\n}\n.breadcrumb-section .breadcrumb-nav .breadcrumb-container .breadcrumb .breadcrumb-item a:hover i[data-v-70522e24] {\n  color: #dc3545;\n}\n.breadcrumb-section .breadcrumb-nav .breadcrumb-container .breadcrumb .breadcrumb-item a i[data-v-70522e24] {\n  font-size: 0.9em;\n  transition: color 0.3s ease;\n}\n.breadcrumb-section .breadcrumb-nav .breadcrumb-container .breadcrumb .breadcrumb-item[data-v-70522e24]:not(:last-child)::after {\n  content: \"›\";\n  margin-left: 0.5rem;\n  color: #6a6a6a;\n  font-size: 1.2em;\n}\n.action-section[data-v-70522e24] {\n  display: flex;\n  align-items: center;\n}\n.action-section .action-btn[data-v-70522e24] {\n  display: flex;\n  align-items: center;\n  gap: 0.5rem;\n  padding: 0.5rem 1rem;\n  border-radius: 8px;\n  font-size: 0.875rem;\n  font-weight: 500;\n  transition: all 0.3s ease;\n}\n.action-section .action-btn[data-v-70522e24]:hover:not(:disabled) {\n  transform: translateY(-1px);\n  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);\n}\n.action-section .action-btn[data-v-70522e24]:disabled {\n  opacity: 0.6;\n  cursor: not-allowed;\n}\n.action-section .action-btn i[data-v-70522e24] {\n  font-size: 0.9em;\n}\n@media (max-width: 768px) {\n.breadcrumb-nav-row[data-v-70522e24] {\n    flex-direction: column;\n    align-items: flex-start;\n    gap: 0.5rem;\n}\n.breadcrumb-section[data-v-70522e24] {\n    width: 100%;\n}\n.breadcrumb-section .breadcrumb-container[data-v-70522e24] {\n    flex-direction: column;\n    align-items: flex-start;\n    gap: 0.5rem;\n}\n.breadcrumb-section .breadcrumb-container .breadcrumb[data-v-70522e24] {\n    flex-wrap: wrap;\n}\n.breadcrumb-section .breadcrumb-container .breadcrumb .breadcrumb-item[data-v-70522e24] {\n    font-size: 0.8rem;\n}\n.breadcrumb-section .breadcrumb-container .breadcrumb .breadcrumb-item a[data-v-70522e24] {\n    font-size: 0.8rem;\n}\n.action-section[data-v-70522e24] {\n    width: 100%;\n    justify-content: flex-end;\n}\n.action-section .action-btn[data-v-70522e24] {\n    font-size: 0.8rem;\n    padding: 0.4rem 0.8rem;\n}\n}\n/* ===========================================\n   RESPONSIVE UTILITY CLASSES (ALL DEVICES)\n   =========================================== */\n.show-xs-only[data-v-70522e24],\n.show-sm-only[data-v-70522e24],\n.show-md-only[data-v-70522e24],\n.show-lg-only[data-v-70522e24],\n.show-xl-only[data-v-70522e24] {\n  display: none !important;\n}\n@media (max-width: 575px) {\n.hide-xs[data-v-70522e24] {\n    display: none !important;\n}\n.show-xs-only[data-v-70522e24] {\n    display: initial !important;\n}\n}\n@media (min-width: 576px) and (max-width: 767px) {\n.hide-sm[data-v-70522e24] {\n    display: none !important;\n}\n.show-sm-only[data-v-70522e24] {\n    display: initial !important;\n}\n}\n@media (min-width: 768px) and (max-width: 991px) {\n.hide-md[data-v-70522e24] {\n    display: none !important;\n}\n.show-md-only[data-v-70522e24] {\n    display: initial !important;\n}\n}\n@media (min-width: 992px) and (max-width: 1199px) {\n.hide-lg[data-v-70522e24] {\n    display: none !important;\n}\n.show-lg-only[data-v-70522e24] {\n    display: initial !important;\n}\n}\n@media (min-width: 1200px) {\n.hide-xl[data-v-70522e24] {\n    display: none !important;\n}\n.show-xl-only[data-v-70522e24] {\n    display: initial !important;\n}\n}\n@media (max-width: 576px) {\n.hide-sm-down[data-v-70522e24] {\n    display: none !important;\n}\n}\n@media (max-width: 768px) {\n.hide-md-down[data-v-70522e24] {\n    display: none !important;\n}\n}\n@media (max-width: 992px) {\n.hide-lg-down[data-v-70522e24] {\n    display: none !important;\n}\n}\n@media (min-width: 576px) {\n.hide-sm-up[data-v-70522e24] {\n    display: none !important;\n}\n}\n@media (min-width: 768px) {\n.hide-md-up[data-v-70522e24] {\n    display: none !important;\n}\n}\n@media (min-width: 992px) {\n.hide-lg-up[data-v-70522e24] {\n    display: none !important;\n}\n}\n@media (max-width: 575px) {\n.d-xs-none[data-v-70522e24] {\n    display: none !important;\n}\n.d-xs-block[data-v-70522e24] {\n    display: block !important;\n}\n.d-xs-flex[data-v-70522e24] {\n    display: flex !important;\n}\n}\n@media (min-width: 576px) and (max-width: 767px) {\n.d-sm-none[data-v-70522e24] {\n    display: none !important;\n}\n.d-sm-block[data-v-70522e24] {\n    display: block !important;\n}\n.d-sm-flex[data-v-70522e24] {\n    display: flex !important;\n}\n}\n@media (min-width: 768px) and (max-width: 991px) {\n.d-md-none[data-v-70522e24] {\n    display: none !important;\n}\n.d-md-block[data-v-70522e24] {\n    display: block !important;\n}\n.d-md-flex[data-v-70522e24] {\n    display: flex !important;\n}\n}\n@media (min-width: 992px) and (max-width: 1199px) {\n.d-lg-none[data-v-70522e24] {\n    display: none !important;\n}\n.d-lg-block[data-v-70522e24] {\n    display: block !important;\n}\n.d-lg-flex[data-v-70522e24] {\n    display: flex !important;\n}\n}\n@media (min-width: 1200px) {\n.d-xl-none[data-v-70522e24] {\n    display: none !important;\n}\n.d-xl-block[data-v-70522e24] {\n    display: block !important;\n}\n.d-xl-flex[data-v-70522e24] {\n    display: flex !important;\n}\n}\n@media (min-width: 576px) {\n.custom-modal-xl[data-v-70522e24] {\n    max-width: 1500px !important;\n}\n}\n.ratings-report-container[data-v-70522e24] {\n  padding: 1.5rem;\n}\n.breadcrumb-nav-row[data-v-70522e24] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  margin-bottom: 1.5rem;\n  padding: 1rem 0;\n  gap: 1rem;\n}\n.breadcrumb-section[data-v-70522e24] {\n  flex: 1;\n}\n.breadcrumb-section .breadcrumb-container[data-v-70522e24] {\n  display: flex;\n  align-items: center;\n  gap: 1rem;\n}\n.breadcrumb-section .breadcrumb-container .back-button[data-v-70522e24] {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  width: 40px;\n  height: 40px;\n  background: rgba(255, 255, 255, 0.1);\n  border: 1px solid rgba(255, 255, 255, 0.2);\n  border-radius: 8px;\n  color: #252525;\n  cursor: pointer;\n  transition: all 0.3s ease;\n}\n.breadcrumb-section .breadcrumb-container .back-button[data-v-70522e24]:hover {\n  background: rgba(255, 255, 255, 0.15);\n  border-color: rgba(255, 255, 255, 0.3);\n  transform: translateY(-1px);\n  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);\n  color: #dc3545;\n}\n.refresh-section .refresh-btn[data-v-70522e24] {\n  display: flex;\n  align-items: center;\n  gap: 0.5rem;\n  padding: 0.5rem 1rem;\n  border-radius: 8px;\n}\n.report-header[data-v-70522e24] {\n  margin-bottom: 2rem;\n}\n.report-header .header-content[data-v-70522e24] {\n  display: flex;\n  align-items: center;\n  gap: 1rem;\n}\n.report-header .header-content .header-icon[data-v-70522e24] {\n  width: 60px;\n  height: 60px;\n  border-radius: 12px;\n  background: linear-gradient(135deg, #FBBF24, #F59E0B);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  color: white;\n  font-size: 1.5rem;\n}\n.report-header .header-content .header-text .report-title[data-v-70522e24] {\n  margin: 0;\n  font-size: 1.75rem;\n  font-weight: 700;\n  color: #252525;\n}\n.report-header .header-content .header-text .report-subtitle[data-v-70522e24] {\n  margin: 0.25rem 0 0 0;\n  color: #6a6a6a;\n  font-size: 0.9rem;\n}\n.filters-section[data-v-70522e24] {\n  display: flex;\n  gap: 1.5rem;\n  margin-bottom: 2rem;\n  padding: 1rem;\n  background: #ffffff;\n  border-radius: 8px;\n  border: 1px solid #e0e0e0;\n}\n.filters-section .filter-group[data-v-70522e24] {\n  display: flex;\n  align-items: center;\n  gap: 0.75rem;\n}\n.filters-section .filter-group label[data-v-70522e24] {\n  font-weight: 600;\n  color: #252525;\n  margin: 0;\n}\n.filters-section .filter-group select[data-v-70522e24] {\n  padding: 0.5rem 1rem;\n  border: 1px solid #ccc;\n  border-radius: 6px;\n  background: #ffffff;\n  color: #252525;\n  cursor: pointer;\n}\n.loading-container[data-v-70522e24],\n.error-container[data-v-70522e24] {\n  text-align: center;\n  padding: 3rem;\n}\n.loading-container .spinner[data-v-70522e24],\n.error-container .spinner[data-v-70522e24] {\n  margin: 0 auto 1rem;\n}\n.loading-container p[data-v-70522e24],\n.error-container p[data-v-70522e24] {\n  color: #6a6a6a;\n  margin-bottom: 1rem;\n}\n.summary-card[data-v-70522e24] {\n  background: #ffffff;\n  border-radius: 12px;\n  padding: 1.5rem;\n  display: flex;\n  align-items: center;\n  gap: 1rem;\n  border: 1px solid #e0e0e0;\n  transition: transform 0.3s ease, box-shadow 0.3s ease;\n}\n.summary-card[data-v-70522e24]:hover {\n  transform: translateY(-2px);\n  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);\n}\n.summary-card .card-icon[data-v-70522e24] {\n  width: 50px;\n  height: 50px;\n  border-radius: 10px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-size: 1.5rem;\n  color: white;\n}\n.summary-card.average-rating .card-icon[data-v-70522e24] {\n  background: linear-gradient(135deg, #FBBF24, #F59E0B);\n}\n.summary-card.total-coaches .card-icon[data-v-70522e24] {\n  background: linear-gradient(135deg, #3B82F6, #2563EB);\n}\n.summary-card.total-sessions .card-icon[data-v-70522e24] {\n  background: linear-gradient(135deg, #10B981, #059669);\n}\n.summary-card.top-rated .card-icon[data-v-70522e24] {\n  background: linear-gradient(135deg, #8B5CF6, #7C3AED);\n}\n.summary-card .card-content[data-v-70522e24] {\n  flex: 1;\n}\n.summary-card .card-content .card-value[data-v-70522e24] {\n  margin: 0;\n  font-size: 2rem;\n  font-weight: 700;\n  color: #252525;\n}\n.summary-card .card-content .card-label[data-v-70522e24] {\n  margin: 0.25rem 0 0 0;\n  font-size: 0.875rem;\n  color: #6a6a6a;\n}\n.summary-card .card-content .card-subtext[data-v-70522e24] {\n  margin: 0.15rem 0 0 0;\n  font-size: 0.8rem;\n  color: #6a6a6a;\n}\n.ratings-table-card[data-v-70522e24] {\n  background: #ffffff;\n  border-radius: 12px;\n  border: 1px solid #e0e0e0;\n  overflow: hidden;\n}\n.ratings-table-card .table-header[data-v-70522e24] {\n  padding: 1.25rem 1.5rem;\n  border-bottom: 1px solid #e0e0e0;\n  background: #eaeaea;\n}\n.ratings-table-card .table-header .table-title[data-v-70522e24] {\n  margin: 0;\n  font-size: 1.1rem;\n  font-weight: 600;\n  color: #252525;\n  display: flex;\n  align-items: center;\n  gap: 0.5rem;\n}\n.ratings-table-card .table-responsive[data-v-70522e24] {\n  overflow-x: auto;\n}\n.ratings-table-card .ratings-table[data-v-70522e24] {\n  margin: 0;\n}\n.ratings-table-card .ratings-table thead[data-v-70522e24] {\n  background: #eaeaea;\n}\n.ratings-table-card .ratings-table thead th[data-v-70522e24] {\n  padding: 1rem;\n  font-weight: 600;\n  color: #252525;\n  border-bottom: 2px solid #e0e0e0;\n  white-space: nowrap;\n}\n.ratings-table-card .ratings-table tbody tr[data-v-70522e24] {\n  transition: background-color 0.2s ease;\n}\n.ratings-table-card .ratings-table tbody tr[data-v-70522e24]:hover {\n  background: #eaeaea;\n}\n.ratings-table-card .ratings-table tbody tr.no-data-row td[data-v-70522e24] {\n  padding: 3rem;\n  text-align: center;\n  color: #6a6a6a;\n}\n.ratings-table-card .ratings-table tbody td[data-v-70522e24] {\n  padding: 1rem;\n  vertical-align: middle;\n  border-bottom: 1px solid #e0e0e0;\n}\n.ratings-table-card .rank-cell[data-v-70522e24] {\n  text-align: center;\n}\n.ratings-table-card .rank-cell .rank-badge[data-v-70522e24] {\n  display: inline-block;\n  width: 32px;\n  height: 32px;\n  border-radius: 50%;\n  line-height: 32px;\n  font-weight: 700;\n  font-size: 0.875rem;\n}\n.ratings-table-card .rank-cell .rank-badge.rank-gold[data-v-70522e24] {\n  background: linear-gradient(135deg, #FBBF24, #F59E0B);\n  color: white;\n}\n.ratings-table-card .rank-cell .rank-badge.rank-silver[data-v-70522e24] {\n  background: linear-gradient(135deg, #9CA3AF, #6B7280);\n  color: white;\n}\n.ratings-table-card .rank-cell .rank-badge.rank-bronze[data-v-70522e24] {\n  background: linear-gradient(135deg, #D97706, #B45309);\n  color: white;\n}\n.ratings-table-card .rank-cell .rank-badge.rank-default[data-v-70522e24] {\n  background: #eaeaea;\n  color: #252525;\n}\n.ratings-table-card .coach-name-cell .coach-info[data-v-70522e24] {\n  display: flex;\n  align-items: center;\n  gap: 0.75rem;\n}\n.ratings-table-card .coach-name-cell .coach-info i[data-v-70522e24] {\n  font-size: 1.5rem;\n  color: #dc3545;\n}\n.ratings-table-card .coach-name-cell .coach-info span[data-v-70522e24] {\n  font-weight: 600;\n  color: #252525;\n}\n.ratings-table-card .rating-cell .rating-display[data-v-70522e24] {\n  display: flex;\n  align-items: center;\n  gap: 0.75rem;\n}\n.ratings-table-card .rating-cell .rating-display .stars[data-v-70522e24] {\n  display: flex;\n  gap: 0.25rem;\n}\n.ratings-table-card .rating-cell .rating-display .stars .fa-star[data-v-70522e24] {\n  font-size: 0.875rem;\n}\n.ratings-table-card .rating-cell .rating-display .stars .fa-star.filled[data-v-70522e24] {\n  color: #FBBF24;\n}\n.ratings-table-card .rating-cell .rating-display .stars .fa-star.empty[data-v-70522e24] {\n  color: #E5E7EB;\n}\n.ratings-table-card .rating-cell .rating-display .rating-value[data-v-70522e24] {\n  font-weight: 700;\n  font-size: 1.1rem;\n  color: #252525;\n}\n.ratings-table-card .sessions-cell[data-v-70522e24],\n.ratings-table-card .rated-sessions-cell[data-v-70522e24] {\n  text-align: center;\n}\n.ratings-table-card .sessions-cell .badge[data-v-70522e24],\n.ratings-table-card .rated-sessions-cell .badge[data-v-70522e24] {\n  padding: 0.375rem 0.75rem;\n  border-radius: 6px;\n  font-weight: 600;\n  font-size: 0.875rem;\n}\n.ratings-table-card .sessions-cell .badge.badge-info[data-v-70522e24],\n.ratings-table-card .rated-sessions-cell .badge.badge-info[data-v-70522e24] {\n  background: #DBEAFE;\n  color: #1E40AF;\n}\n.ratings-table-card .sessions-cell .badge.badge-success[data-v-70522e24],\n.ratings-table-card .rated-sessions-cell .badge.badge-success[data-v-70522e24] {\n  background: #D1FAE5;\n  color: #065F46;\n}\n.ratings-table-card .distribution-cell .rating-distribution[data-v-70522e24] {\n  display: flex;\n  align-items: center;\n  gap: 0.75rem;\n}\n.ratings-table-card .distribution-cell .rating-distribution .dist-bar[data-v-70522e24] {\n  flex: 1;\n  height: 8px;\n  background: #eaeaea;\n  border-radius: 4px;\n  overflow: hidden;\n}\n.ratings-table-card .distribution-cell .rating-distribution .dist-bar .dist-fill[data-v-70522e24] {\n  height: 100%;\n  background: linear-gradient(90deg, #10B981, #059669);\n  transition: width 0.3s ease;\n}\n.ratings-table-card .distribution-cell .rating-distribution .dist-text[data-v-70522e24] {\n  font-size: 0.875rem;\n  font-weight: 600;\n  color: #6a6a6a;\n  min-width: 40px;\n  text-align: right;\n}\n.ratings-table-card .status-cell .status-badge[data-v-70522e24] {\n  padding: 0.375rem 0.75rem;\n  border-radius: 6px;\n  font-weight: 600;\n  font-size: 0.875rem;\n}\n.ratings-table-card .status-cell .status-badge.status-excellent[data-v-70522e24] {\n  background: #D1FAE5;\n  color: #065F46;\n}\n.ratings-table-card .status-cell .status-badge.status-good[data-v-70522e24] {\n  background: #DBEAFE;\n  color: #1E40AF;\n}\n.ratings-table-card .status-cell .status-badge.status-fair[data-v-70522e24] {\n  background: #FEF3C7;\n  color: #92400E;\n}\n.ratings-table-card .status-cell .status-badge.status-poor[data-v-70522e24] {\n  background: #FEE2E2;\n  color: #991B1B;\n}\n@media (max-width: 768px) {\n.filters-section[data-v-70522e24] {\n    flex-direction: column;\n    gap: 1rem;\n}\n.ratings-table[data-v-70522e24] {\n    font-size: 0.875rem;\n}\n.ratings-table th[data-v-70522e24], .ratings-table td[data-v-70522e24] {\n    padding: 0.75rem 0.5rem;\n}\n}", ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-12.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12.use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-12.use[3]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/Ratings/RatingsReport.vue?vue&type=style&index=0&id=70522e24&lang=scss&scoped=true":
/*!****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-12.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12.use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-12.use[3]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/Ratings/RatingsReport.vue?vue&type=style&index=0&id=70522e24&lang=scss&scoped=true ***!
  \****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../../../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_clonedRuleSet_12_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_12_use_2_node_modules_sass_loader_dist_cjs_js_clonedRuleSet_12_use_3_node_modules_vue_loader_lib_index_js_vue_loader_options_RatingsReport_vue_vue_type_style_index_0_id_70522e24_lang_scss_scoped_true__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !!../../../../../../node_modules/css-loader/dist/cjs.js??clonedRuleSet-12.use[1]!../../../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12.use[2]!../../../../../../node_modules/sass-loader/dist/cjs.js??clonedRuleSet-12.use[3]!../../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./RatingsReport.vue?vue&type=style&index=0&id=70522e24&lang=scss&scoped=true */ "./node_modules/css-loader/dist/cjs.js??clonedRuleSet-12.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12.use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-12.use[3]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/Ratings/RatingsReport.vue?vue&type=style&index=0&id=70522e24&lang=scss&scoped=true");

            

var options = {};

options.insert = "head";
options.singleton = false;

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_clonedRuleSet_12_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_12_use_2_node_modules_sass_loader_dist_cjs_js_clonedRuleSet_12_use_3_node_modules_vue_loader_lib_index_js_vue_loader_options_RatingsReport_vue_vue_type_style_index_0_id_70522e24_lang_scss_scoped_true__WEBPACK_IMPORTED_MODULE_1__["default"], options);



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_clonedRuleSet_12_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_12_use_2_node_modules_sass_loader_dist_cjs_js_clonedRuleSet_12_use_3_node_modules_vue_loader_lib_index_js_vue_loader_options_RatingsReport_vue_vue_type_style_index_0_id_70522e24_lang_scss_scoped_true__WEBPACK_IMPORTED_MODULE_1__["default"].locals || {});

/***/ }),

/***/ "./resources/src/views/app/pages/Ratings/RatingsReport.vue":
/*!*****************************************************************!*\
  !*** ./resources/src/views/app/pages/Ratings/RatingsReport.vue ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _RatingsReport_vue_vue_type_template_id_70522e24_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./RatingsReport.vue?vue&type=template&id=70522e24&scoped=true */ "./resources/src/views/app/pages/Ratings/RatingsReport.vue?vue&type=template&id=70522e24&scoped=true");
/* harmony import */ var _RatingsReport_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./RatingsReport.vue?vue&type=script&lang=js */ "./resources/src/views/app/pages/Ratings/RatingsReport.vue?vue&type=script&lang=js");
/* harmony import */ var _RatingsReport_vue_vue_type_style_index_0_id_70522e24_lang_scss_scoped_true__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./RatingsReport.vue?vue&type=style&index=0&id=70522e24&lang=scss&scoped=true */ "./resources/src/views/app/pages/Ratings/RatingsReport.vue?vue&type=style&index=0&id=70522e24&lang=scss&scoped=true");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");



;


/* normalize component */

var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _RatingsReport_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__["default"],
  _RatingsReport_vue_vue_type_template_id_70522e24_scoped_true__WEBPACK_IMPORTED_MODULE_0__.render,
  _RatingsReport_vue_vue_type_template_id_70522e24_scoped_true__WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  "70522e24",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/src/views/app/pages/Ratings/RatingsReport.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./resources/src/views/app/pages/Ratings/RatingsReport.vue?vue&type=script&lang=js":
/*!*****************************************************************************************!*\
  !*** ./resources/src/views/app/pages/Ratings/RatingsReport.vue?vue&type=script&lang=js ***!
  \*****************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_RatingsReport_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./RatingsReport.vue?vue&type=script&lang=js */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/Ratings/RatingsReport.vue?vue&type=script&lang=js");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_RatingsReport_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/src/views/app/pages/Ratings/RatingsReport.vue?vue&type=style&index=0&id=70522e24&lang=scss&scoped=true":
/*!**************************************************************************************************************************!*\
  !*** ./resources/src/views/app/pages/Ratings/RatingsReport.vue?vue&type=style&index=0&id=70522e24&lang=scss&scoped=true ***!
  \**************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_dist_cjs_js_node_modules_css_loader_dist_cjs_js_clonedRuleSet_12_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_12_use_2_node_modules_sass_loader_dist_cjs_js_clonedRuleSet_12_use_3_node_modules_vue_loader_lib_index_js_vue_loader_options_RatingsReport_vue_vue_type_style_index_0_id_70522e24_lang_scss_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/style-loader/dist/cjs.js!../../../../../../node_modules/css-loader/dist/cjs.js??clonedRuleSet-12.use[1]!../../../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12.use[2]!../../../../../../node_modules/sass-loader/dist/cjs.js??clonedRuleSet-12.use[3]!../../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./RatingsReport.vue?vue&type=style&index=0&id=70522e24&lang=scss&scoped=true */ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-12.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12.use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-12.use[3]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/Ratings/RatingsReport.vue?vue&type=style&index=0&id=70522e24&lang=scss&scoped=true");


/***/ }),

/***/ "./resources/src/views/app/pages/Ratings/RatingsReport.vue?vue&type=template&id=70522e24&scoped=true":
/*!***********************************************************************************************************!*\
  !*** ./resources/src/views/app/pages/Ratings/RatingsReport.vue?vue&type=template&id=70522e24&scoped=true ***!
  \***********************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_RatingsReport_vue_vue_type_template_id_70522e24_scoped_true__WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   staticRenderFns: () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_RatingsReport_vue_vue_type_template_id_70522e24_scoped_true__WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_RatingsReport_vue_vue_type_template_id_70522e24_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./RatingsReport.vue?vue&type=template&id=70522e24&scoped=true */ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/Ratings/RatingsReport.vue?vue&type=template&id=70522e24&scoped=true");


/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/Ratings/RatingsReport.vue?vue&type=template&id=70522e24&scoped=true":
/*!**************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/Ratings/RatingsReport.vue?vue&type=template&id=70522e24&scoped=true ***!
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
  return _c("div", { staticClass: "ratings-report-container" }, [
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
            on: { click: _vm.loadRatingsData },
          },
          [
            _c("i", {
              staticClass: "fas fa-sync-alt me-2",
              class: { "fa-spin": _vm.loading },
            }),
            _vm._v(
              "\n        " +
                _vm._s(_vm.loading ? "Loading..." : "Refresh") +
                "\n      "
            ),
          ]
        ),
      ]),
    ]),
    _vm._v(" "),
    _vm._m(1),
    _vm._v(" "),
    _c("div", { staticClass: "filters-section" }, [
      _c("div", { staticClass: "filter-group" }, [
        _c("label", [_vm._v("Period:")]),
        _vm._v(" "),
        _c(
          "select",
          {
            directives: [
              {
                name: "model",
                rawName: "v-model",
                value: _vm.selectedPeriod,
                expression: "selectedPeriod",
              },
            ],
            staticClass: "period-select",
            on: {
              change: [
                function ($event) {
                  var $$selectedVal = Array.prototype.filter
                    .call($event.target.options, function (o) {
                      return o.selected
                    })
                    .map(function (o) {
                      var val = "_value" in o ? o._value : o.value
                      return val
                    })
                  _vm.selectedPeriod = $event.target.multiple
                    ? $$selectedVal
                    : $$selectedVal[0]
                },
                _vm.loadRatingsData,
              ],
            },
          },
          [
            _c("option", { attrs: { value: "all" } }, [_vm._v("All Time")]),
            _vm._v(" "),
            _c("option", { attrs: { value: "today" } }, [_vm._v("Today")]),
            _vm._v(" "),
            _c("option", { attrs: { value: "week" } }, [_vm._v("This Week")]),
            _vm._v(" "),
            _c("option", { attrs: { value: "month" } }, [_vm._v("This Month")]),
            _vm._v(" "),
            _c("option", { attrs: { value: "quarter" } }, [
              _vm._v("This Quarter"),
            ]),
            _vm._v(" "),
            _c("option", { attrs: { value: "year" } }, [_vm._v("This Year")]),
          ]
        ),
      ]),
      _vm._v(" "),
      _c("div", { staticClass: "filter-group" }, [
        _c("label", [_vm._v("Sort By:")]),
        _vm._v(" "),
        _c(
          "select",
          {
            directives: [
              {
                name: "model",
                rawName: "v-model",
                value: _vm.sortBy,
                expression: "sortBy",
              },
            ],
            staticClass: "sort-select",
            on: {
              change: [
                function ($event) {
                  var $$selectedVal = Array.prototype.filter
                    .call($event.target.options, function (o) {
                      return o.selected
                    })
                    .map(function (o) {
                      var val = "_value" in o ? o._value : o.value
                      return val
                    })
                  _vm.sortBy = $event.target.multiple
                    ? $$selectedVal
                    : $$selectedVal[0]
                },
                _vm.sortRatings,
              ],
            },
          },
          [
            _c("option", { attrs: { value: "rating" } }, [
              _vm._v("Rating (High to Low)"),
            ]),
            _vm._v(" "),
            _c("option", { attrs: { value: "rating-low" } }, [
              _vm._v("Rating (Low to High)"),
            ]),
            _vm._v(" "),
            _c("option", { attrs: { value: "name" } }, [_vm._v("Coach Name")]),
            _vm._v(" "),
            _c("option", { attrs: { value: "sessions" } }, [
              _vm._v("Total Sessions"),
            ]),
          ]
        ),
      ]),
    ]),
    _vm._v(" "),
    _vm.loading && !_vm.coachRatings.length
      ? _c("div", { staticClass: "loading-container" }, [
          _c("div", { staticClass: "spinner spinner-primary" }),
          _vm._v(" "),
          _c("p", [_vm._v("Loading ratings data...")]),
        ])
      : _vm._e(),
    _vm._v(" "),
    _vm.error
      ? _c("div", { staticClass: "error-container" }, [
          _c("i", { staticClass: "fas fa-exclamation-triangle" }),
          _vm._v(" "),
          _c("p", [_vm._v(_vm._s(_vm.error))]),
          _vm._v(" "),
          _c(
            "button",
            {
              staticClass: "btn btn-primary",
              on: { click: _vm.loadRatingsData },
            },
            [_vm._v("Retry")]
          ),
        ])
      : _vm._e(),
    _vm._v(" "),
    !_vm.loading || _vm.coachRatings.length
      ? _c("div", { staticClass: "ratings-content" }, [
          _c("div", { staticClass: "row mb-4" }, [
            _c("div", { staticClass: "col-lg-3 col-md-6 col-12 mb-3" }, [
              _c("div", { staticClass: "summary-card average-rating" }, [
                _vm._m(2),
                _vm._v(" "),
                _c("div", { staticClass: "card-content" }, [
                  _c("h3", { staticClass: "card-value" }, [
                    _vm._v(
                      "\n              " +
                        _vm._s(
                          _vm.overallAverage > 0
                            ? _vm.overallAverage.toFixed(1)
                            : "N/A"
                        ) +
                        "\n            "
                    ),
                  ]),
                  _vm._v(" "),
                  _c("p", { staticClass: "card-label" }, [
                    _vm._v(
                      "\n              Overall Average Rating\n            "
                    ),
                  ]),
                  _vm._v(" "),
                  _vm.totalRatedSessions > 0
                    ? _c("p", { staticClass: "card-subtext" }, [
                        _vm._v(
                          "\n              Based on " +
                            _vm._s(_vm.totalRatedSessions) +
                            " ratings\n            "
                        ),
                      ])
                    : _c("p", { staticClass: "card-subtext" }, [
                        _vm._v(
                          "\n              Based on 0 ratings\n            "
                        ),
                      ]),
                ]),
              ]),
            ]),
            _vm._v(" "),
            _c("div", { staticClass: "col-lg-3 col-md-6 col-12 mb-3" }, [
              _c("div", { staticClass: "summary-card total-coaches" }, [
                _vm._m(3),
                _vm._v(" "),
                _c("div", { staticClass: "card-content" }, [
                  _c("h3", { staticClass: "card-value" }, [
                    _vm._v(_vm._s(_vm.coachRatings.length)),
                  ]),
                  _vm._v(" "),
                  _c("p", { staticClass: "card-label" }, [
                    _vm._v("Total Coaches"),
                  ]),
                ]),
              ]),
            ]),
            _vm._v(" "),
            _c("div", { staticClass: "col-lg-3 col-md-6 col-12 mb-3" }, [
              _c("div", { staticClass: "summary-card total-sessions" }, [
                _vm._m(4),
                _vm._v(" "),
                _c("div", { staticClass: "card-content" }, [
                  _c("h3", { staticClass: "card-value" }, [
                    _vm._v(_vm._s(_vm.totalSessions)),
                  ]),
                  _vm._v(" "),
                  _c("p", { staticClass: "card-label" }, [
                    _vm._v("Total Rated Sessions"),
                  ]),
                ]),
              ]),
            ]),
            _vm._v(" "),
            _c("div", { staticClass: "col-lg-3 col-md-6 col-12 mb-3" }, [
              _c("div", { staticClass: "summary-card top-rated" }, [
                _vm._m(5),
                _vm._v(" "),
                _c("div", { staticClass: "card-content" }, [
                  _c("h3", { staticClass: "card-value" }, [
                    _vm._v(
                      _vm._s(
                        _vm.topRatedCoach
                          ? _vm.topRatedCoach.rating.toFixed(1)
                          : "N/A"
                      )
                    ),
                  ]),
                  _vm._v(" "),
                  _c("p", { staticClass: "card-label" }, [
                    _vm._v("Top Rated Coach"),
                  ]),
                ]),
              ]),
            ]),
          ]),
          _vm._v(" "),
          _c("div", { staticClass: "ratings-table-card" }, [
            _vm._m(6),
            _vm._v(" "),
            _c("div", { staticClass: "table-responsive" }, [
              _c("table", { staticClass: "table ratings-table" }, [
                _vm._m(7),
                _vm._v(" "),
                _c(
                  "tbody",
                  [
                    _vm._l(_vm.sortedRatings, function (coach, index) {
                      return _c(
                        "tr",
                        { key: coach.id, staticClass: "coach-row" },
                        [
                          _c("td", { staticClass: "rank-cell" }, [
                            _c(
                              "span",
                              {
                                staticClass: "rank-badge",
                                class: _vm.getRankClass(index),
                              },
                              [
                                _vm._v(
                                  "\n                  " +
                                    _vm._s(index + 1) +
                                    "\n                "
                                ),
                              ]
                            ),
                          ]),
                          _vm._v(" "),
                          _c("td", { staticClass: "coach-name-cell" }, [
                            _c("div", { staticClass: "coach-info" }, [
                              _c("i", { staticClass: "fas fa-user-circle" }),
                              _vm._v(" "),
                              _c("span", [_vm._v(_vm._s(coach.name))]),
                            ]),
                          ]),
                          _vm._v(" "),
                          _c("td", { staticClass: "rating-cell" }, [
                            _c("div", { staticClass: "rating-display" }, [
                              _c(
                                "div",
                                { staticClass: "stars" },
                                _vm._l(5, function (n) {
                                  return _c("i", {
                                    key: n,
                                    staticClass: "fas fa-star",
                                    class: {
                                      filled: n <= Math.round(coach.rating),
                                      empty: n > Math.round(coach.rating),
                                    },
                                  })
                                }),
                                0
                              ),
                              _vm._v(" "),
                              coach.ratedSessions > 0
                                ? _c("span", { staticClass: "rating-value" }, [
                                    _vm._v(
                                      "\n                    " +
                                        _vm._s(coach.rating.toFixed(1)) +
                                        " (based on " +
                                        _vm._s(coach.ratedSessions) +
                                        " ratings)\n                  "
                                    ),
                                  ])
                                : _c("span", { staticClass: "rating-value" }, [
                                    _vm._v(
                                      "\n                    N/A (0 ratings)\n                  "
                                    ),
                                  ]),
                            ]),
                          ]),
                          _vm._v(" "),
                          _c("td", { staticClass: "sessions-cell" }, [
                            _c("span", { staticClass: "badge badge-info" }, [
                              _vm._v(_vm._s(coach.totalSessions)),
                            ]),
                          ]),
                          _vm._v(" "),
                          _c("td", { staticClass: "rated-sessions-cell" }, [
                            _c("span", { staticClass: "badge badge-success" }, [
                              _vm._v(_vm._s(coach.ratedSessions)),
                            ]),
                          ]),
                          _vm._v(" "),
                          _c("td", { staticClass: "distribution-cell" }, [
                            _c("div", { staticClass: "rating-distribution" }, [
                              _c("div", { staticClass: "dist-bar" }, [
                                _c("div", {
                                  staticClass: "dist-fill",
                                  style: {
                                    width:
                                      (coach.ratedSessions /
                                        coach.totalSessions) *
                                        100 +
                                      "%",
                                  },
                                }),
                              ]),
                              _vm._v(" "),
                              _c("span", { staticClass: "dist-text" }, [
                                _vm._v(
                                  _vm._s(
                                    (
                                      (coach.ratedSessions /
                                        coach.totalSessions) *
                                      100
                                    ).toFixed(0)
                                  ) + "%"
                                ),
                              ]),
                            ]),
                          ]),
                          _vm._v(" "),
                          _c("td", { staticClass: "status-cell" }, [
                            _c(
                              "span",
                              {
                                staticClass: "status-badge",
                                class: _vm.getStatusClass(coach.rating),
                              },
                              [
                                _vm._v(
                                  "\n                  " +
                                    _vm._s(_vm.getStatusText(coach.rating)) +
                                    "\n                "
                                ),
                              ]
                            ),
                          ]),
                        ]
                      )
                    }),
                    _vm._v(" "),
                    _vm.coachRatings.length === 0
                      ? _c("tr", { staticClass: "no-data-row" }, [_vm._m(8)])
                      : _vm._e(),
                  ],
                  2
                ),
              ]),
            ]),
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
        _c("i", { staticClass: "fas fa-star" }),
        _vm._v("\n              Ratings Report\n            "),
      ]
    )
  },
  function () {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "report-header" }, [
      _c("div", { staticClass: "header-content" }, [
        _c("div", { staticClass: "header-icon" }, [
          _c("i", { staticClass: "fas fa-star" }),
        ]),
        _vm._v(" "),
        _c("div", { staticClass: "header-text" }, [
          _c("h2", { staticClass: "report-title" }, [
            _vm._v("Coach Ratings Report"),
          ]),
          _vm._v(" "),
          _c("p", { staticClass: "report-subtitle" }, [
            _vm._v(
              "\n          View average ratings and performance metrics for all coaches\n        "
            ),
          ]),
        ]),
      ]),
    ])
  },
  function () {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "card-icon" }, [
      _c("i", { staticClass: "fas fa-star" }),
    ])
  },
  function () {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "card-icon" }, [
      _c("i", { staticClass: "fas fa-users" }),
    ])
  },
  function () {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "card-icon" }, [
      _c("i", { staticClass: "fas fa-calendar-check" }),
    ])
  },
  function () {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "card-icon" }, [
      _c("i", { staticClass: "fas fa-trophy" }),
    ])
  },
  function () {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "table-header" }, [
      _c("h5", { staticClass: "table-title" }, [
        _c("i", { staticClass: "fas fa-list" }),
        _vm._v("\n          Coach Ratings Breakdown\n        "),
      ]),
    ])
  },
  function () {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("thead", [
      _c("tr", [
        _c("th", [_vm._v("Rank")]),
        _vm._v(" "),
        _c("th", [_vm._v("Coach Name")]),
        _vm._v(" "),
        _c("th", [_vm._v("Average Rating")]),
        _vm._v(" "),
        _c("th", [_vm._v("Total Sessions")]),
        _vm._v(" "),
        _c("th", [_vm._v("Rated Sessions")]),
        _vm._v(" "),
        _c("th", [_vm._v("Rating Distribution")]),
        _vm._v(" "),
        _c("th", [_vm._v("Status")]),
      ]),
    ])
  },
  function () {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("td", { staticClass: "text-center", attrs: { colspan: "7" } }, [
      _c("i", { staticClass: "fas fa-info-circle" }),
      _vm._v(" "),
      _c("p", [_vm._v("No ratings data available for the selected period.")]),
    ])
  },
]
render._withStripped = true



/***/ })

}]);