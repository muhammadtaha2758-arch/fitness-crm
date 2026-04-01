"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["resources_src_views_app_pages_Schedule_Schedule_vue"],{

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/Schedule/Schedule.vue?vue&type=script&lang=js":
/*!*****************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/Schedule/Schedule.vue?vue&type=script&lang=js ***!
  \*****************************************************************************************************************************************************************************************************************/
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
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
  name: 'Schedule',
  metaInfo: {
    title: 'Schedule'
  },
  data: function data() {
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
      timeSlots: ['12 am', '1 am', '2 am', '3 am', '4 am', '5 am', '6 am', '7 am', '8 am', '9 am', '10 am', '11 am', '12 pm', '1 pm', '2 pm', '3 pm', '4 pm', '5 pm', '6 pm', '7 pm', '8 pm', '9 pm', '10 pm', '11 pm'],
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
        youtube_url_female: ''
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
        enableOnlineBooking: false
      },
      schedules: [],
      locations: [],
      hours: Array.from({
        length: 12
      }, function (_, i) {
        return i + 1;
      }),
      minutes: Array.from({
        length: 60
      }, function (_, i) {
        return i;
      }),
      editCreditType: false
    };
  },
  computed: {
    formattedDate: function formattedDate() {
      var day = this.currentDate.getDate();
      var weekday = this.currentDate.toLocaleDateString('en-US', {
        weekday: 'long'
      });
      var month = this.currentDate.toLocaleDateString('en-US', {
        month: 'long'
      });
      var year = this.currentDate.getFullYear();
      return "".concat(day, " ").concat(weekday, " ").concat(month, " ").concat(year);
    },
    formattedDateShort: function formattedDateShort() {
      var month = String(this.currentDate.getMonth() + 1).padStart(2, '0');
      var day = String(this.currentDate.getDate()).padStart(2, '0');
      var year = this.currentDate.getFullYear();
      return "".concat(month, "/").concat(day, "/").concat(year);
    },
    filteredMembers: function filteredMembers() {
      if (!this.searchTerm || this.searchTerm.trim() === '') {
        return this.members.slice(0, 10); // Show first 10 members when no search term
      }
      var searchLower = this.searchTerm.toLowerCase().trim();
      return this.members.filter(function (member) {
        if (!member || !member.name) return false;
        return member.name.toLowerCase().includes(searchLower);
      });
    },
    filteredEvents: function filteredEvents() {
      var _this = this;
      return this.scheduleEvents.filter(function (event) {
        var matchActivity = !_this.selectedActivity || event.title.toLowerCase().includes(_this.selectedActivity.toLowerCase());

        // Check if member matches - either direct assignment or in bookings
        // If no member is selected, show all events (including those with members)
        // If a member is selected, only show events for that member
        // Events with members should always be visible when no member filter is applied
        var matchMember = !_this.selectedMemberId || event.memberId && event.memberId == _this.selectedMemberId || event.memberIds && event.memberIds.includes(parseInt(_this.selectedMemberId));
        return matchActivity && matchMember;
      });
    },
    selectedMemberName: function selectedMemberName() {
      var _this2 = this;
      if (!this.selectedMemberId) return null;
      var member = this.members.find(function (m) {
        return m.id == _this2.selectedMemberId;
      });
      return member ? member.name : null;
    },
    hasNoEventsForSelectedMember: function hasNoEventsForSelectedMember() {
      return this.selectedMemberId && this.filteredEvents.length === 0;
    },
    isMemberView: function isMemberView() {
      return this.coachView === 'Member view';
    },
    weekDates: function weekDates() {
      if (!this.isMemberView) return [];

      // Get the start of the week (Monday)
      var startOfWeek = new Date(this.currentDate);
      var day = startOfWeek.getDay();
      var diff = startOfWeek.getDate() - day + (day === 0 ? -6 : 1); // Adjust when day is Sunday
      startOfWeek.setDate(diff);
      startOfWeek.setHours(0, 0, 0, 0);

      // Generate 7 days starting from Monday
      var dates = [];
      for (var i = 0; i < 7; i++) {
        var date = new Date(startOfWeek);
        date.setDate(startOfWeek.getDate() + i);
        dates.push(date);
      }
      return dates;
    },
    weekNumber: function weekNumber() {
      if (!this.isMemberView) return null;
      var date = new Date(this.currentDate);
      var startDate = new Date(date.getFullYear(), 0, 1);
      var days = Math.floor((date - startDate) / (24 * 60 * 60 * 1000));
      return Math.ceil((days + startDate.getDay() + 1) / 7);
    },
    formattedWeekTitle: function formattedWeekTitle() {
      if (this.isMemberView) {
        return "".concat(this.activeTab, " Week ").concat(this.weekNumber);
      }
      if (this.viewMode === 'By Coach') {
        return "".concat(this.activeTab, " ").concat(this.formattedDate);
      }
      return "".concat(this.activeTab, " ").concat(this.formattedDate);
    },
    coachColumns: function coachColumns() {
      // Return all coaches plus "Without coach" column
      var coachList = this.coaches.map(function (coach) {
        return {
          id: coach.id,
          name: coach.name
        };
      });

      // Add "Without coach" column at the end
      coachList.push({
        id: null,
        name: 'Without coach'
      });
      return coachList;
    },
    viewDates: function viewDates() {
      // Calculate dates to display based on viewMode (only for Coach view)
      if (this.isMemberView) {
        return this.weekDates; // Member view always shows week
      }
      var dates = [];
      var startDate = new Date(this.currentDate);
      startDate.setHours(0, 0, 0, 0);
      var daysToShow = 1;
      if (this.viewMode === '3 days') {
        daysToShow = 3;
        // Start from current date
      } else if (this.viewMode === '1 week') {
        daysToShow = 7;
        // Get the start of the week (Monday)
        var day = startDate.getDay();
        var diff = startDate.getDate() - day + (day === 0 ? -6 : 1);
        startDate.setDate(diff);
      } else if (this.viewMode === '1 month') {
        // Get first day of month
        startDate.setDate(1);
        // Get number of days in month
        var year = startDate.getFullYear();
        var month = startDate.getMonth();
        daysToShow = new Date(year, month + 1, 0).getDate();
      }
      for (var i = 0; i < daysToShow; i++) {
        var date = new Date(startDate);
        date.setDate(startDate.getDate() + i);
        dates.push(date);
      }
      return dates;
    }
  },
  watch: {
    coachView: function coachView() {
      // Reload schedule when view changes
      this.loadSchedule();
    },
    viewMode: function viewMode() {
      var _this3 = this;
      // Reload schedule when view mode changes
      this.loadSchedule();
      // Re-setup scroll sync after view mode changes
      this.$nextTick(function () {
        _this3.setupScrollSync();
      });
    }
  },
  methods: {
    goBack: function goBack() {
      this.$router.go(-1);
    },
    // Video tutorial method
    openVideoTutorialModal: function openVideoTutorialModal() {
      this.isVideoLoading = true;
      this.videoError = null;
      this.showVideoTutorialModal = true;
      // Reset video loading state after modal is shown
      this.$nextTick(function () {
        // Video element will trigger load events
      });
    },
    closeVideoTutorialModal: function closeVideoTutorialModal() {
      this.showVideoTutorialModal = false;
      this.isVideoLoading = false;
      this.videoError = null;
    },
    onVideoLoadStart: function onVideoLoadStart() {
      // Video started loading
      this.isVideoLoading = true;
    },
    onVideoCanPlay: function onVideoCanPlay() {
      // Video can start playing
      this.isVideoLoading = false;
      this.videoError = null;
    },
    onVideoLoaded: function onVideoLoaded() {
      // Video metadata and data loaded
      this.isVideoLoading = false;
      this.videoError = null;
    },
    handleVideoError: function handleVideoError(event) {
      this.isVideoLoading = false;
      this.videoError = 'Failed to load video. Please check if the file exists at: ' + this.videoTutorialUrl;
    },
    setActiveTab: function setActiveTab(tab) {
      this.activeTab = tab;
      // Reload schedule when tab changes
      this.loadSchedule();
    },
    goToPreviousDate: function goToPreviousDate() {
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
    goToNextDate: function goToNextDate() {
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
    handleSlotClick: function handleSlotClick(index) {
      this.selectedSlotIndex = index;
      var selectedTime = this.timeSlots[index];
      var _selectedTime$split = selectedTime.split(' '),
        _selectedTime$split2 = _slicedToArray(_selectedTime$split, 2),
        time = _selectedTime$split2[0],
        period = _selectedTime$split2[1];
      var _time$split = time.split(':'),
        _time$split2 = _slicedToArray(_time$split, 1),
        hours = _time$split2[0];
      var hour24 = parseInt(hours);
      if (period === 'pm' && hour24 !== 12) hour24 += 12;
      if (period === 'am' && hour24 === 12) hour24 = 0;
      var hour12 = hour24 > 12 ? hour24 - 12 : hour24 === 0 ? 12 : hour24;
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
        endHour: hour24 + 1 > 12 ? hour24 + 1 - 12 === 0 ? 12 : hour24 + 1 - 12 : hour24 + 1 === 12 ? 12 : hour24 + 1,
        endMinute: 0,
        endPeriod: hour24 + 1 >= 12 ? 'PM' : 'AM',
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
        enableOnlineBooking: false
      };
      this.isEditing = false;
      this.showCreateModal = true;
      this.lockBodyScroll();
    },
    openEventModal: function openEventModal(event) {
      if (!event) {
        return;
      }
      this.selectedEvent = _objectSpread({}, event); // Create a copy to ensure reactivity
      // Initialize member IDs for the modal
      this.eventModalMemberIds = event.memberIds ? _toConsumableArray(event.memberIds) : event.memberId ? [event.memberId] : [];
      this.lockBodyScroll();
    },
    assignMembersToEvent: function assignMembersToEvent() {
      var _this4 = this;
      return _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
        var response, _error$response;
        return _regeneratorRuntime().wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              if (!(!_this4.selectedEvent || !_this4.selectedEvent.id)) {
                _context.next = 2;
                break;
              }
              return _context.abrupt("return");
            case 2:
              _this4.assigningMembers = true;
              _context.prev = 3;
              _context.next = 6;
              return axios__WEBPACK_IMPORTED_MODULE_0___default().put("/schedule/events/".concat(_this4.selectedEvent.id), {
                member_ids: _this4.eventModalMemberIds || [],
                // Keep all other event data unchanged
                title: _this4.selectedEvent.title,
                date: _this4.selectedEvent.date,
                start_time: _this4.selectedEvent.start_time,
                end_time: _this4.selectedEvent.end_time,
                coach_id: _this4.selectedEvent.coachId || _this4.selectedEvent.coach_id,
                activity_id: _this4.selectedEvent.activityId || _this4.selectedEvent.activity_id,
                tab: _this4.selectedEvent.tab || _this4.activeTab
              });
            case 6:
              response = _context.sent;
              if (!response.data.success) {
                _context.next = 14;
                break;
              }
              _context.next = 10;
              return _this4.loadSchedule();
            case 10:
              // Update the selected event with new member data
              _this4.selectedEvent.memberIds = _toConsumableArray(_this4.eventModalMemberIds);
              _this4.$swal({
                title: 'Success!',
                text: 'Members assigned successfully',
                icon: 'success',
                confirmButtonText: 'OK'
              });
              _context.next = 15;
              break;
            case 14:
              _this4.$swal({
                title: 'Error!',
                text: response.data.message || 'Failed to assign members',
                icon: 'error',
                confirmButtonText: 'OK'
              });
            case 15:
              _context.next = 20;
              break;
            case 17:
              _context.prev = 17;
              _context.t0 = _context["catch"](3);
              _this4.$swal({
                title: 'Error!',
                text: ((_error$response = _context.t0.response) === null || _error$response === void 0 || (_error$response = _error$response.data) === null || _error$response === void 0 ? void 0 : _error$response.message) || 'Failed to assign members',
                icon: 'error',
                confirmButtonText: 'OK'
              });
            case 20:
              _context.prev = 20;
              _this4.assigningMembers = false;
              return _context.finish(20);
            case 23:
            case "end":
              return _context.stop();
          }
        }, _callee, null, [[3, 17, 20, 23]]);
      }))();
    },
    closeEventModal: function closeEventModal() {
      this.selectedEvent = null;
      this.unlockBodyScroll();
    },
    editEvent: function editEvent(event) {
      this.selectedEvent = null;

      // Parse start time from 24-hour format (HH:MM) to 12-hour format
      var parseTime = function parseTime(time24) {
        if (!time24) return {
          hour: 2,
          minute: 0,
          period: 'PM'
        };

        // Handle different time formats
        var timeStr = time24;
        if (typeof time24 === 'string') {
          // Remove seconds if present (HH:MM:SS -> HH:MM)
          timeStr = timeStr.split(':').slice(0, 2).join(':');
        }
        var _timeStr$split = timeStr.split(':'),
          _timeStr$split2 = _slicedToArray(_timeStr$split, 2),
          hours = _timeStr$split2[0],
          _timeStr$split2$ = _timeStr$split2[1],
          minutes = _timeStr$split2$ === void 0 ? '00' : _timeStr$split2$;
        var hour24 = parseInt(hours);
        var minute = parseInt(minutes) || 0;
        var period = 'AM';
        var hour12 = hour24;
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
        return {
          hour: hour12,
          minute: minute,
          period: period
        };
      };
      var startTime = parseTime(event.time || event.start_time);
      var endTime = parseTime(event.endTime || event.end_time);
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
        enableOnlineBooking: event.enableOnlineBooking || event.enable_online_booking || false
      };
      this.isEditing = true;
      this.showCreateModal = true;
      this.lockBodyScroll();
    },
    deleteEvent: function deleteEvent(event) {
      var _this5 = this;
      return _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee2() {
        var result, response, _error$response2;
        return _regeneratorRuntime().wrap(function _callee2$(_context2) {
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
              // Close the event modal first to avoid z-index conflicts with SweetAlert
              _this5.closeEventModal();

              // Small delay to ensure modal is closed before showing SweetAlert
              _context2.next = 3;
              return _this5.$nextTick();
            case 3:
              _context2.next = 5;
              return _this5.$swal({
                title: 'Are you sure?',
                text: 'This action cannot be undone!',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Yes, delete it!',
                cancelButtonText: 'Cancel'
              });
            case 5:
              result = _context2.sent;
              if (!result.isConfirmed) {
                _context2.next = 23;
                break;
              }
              _context2.prev = 7;
              _context2.next = 10;
              return axios__WEBPACK_IMPORTED_MODULE_0___default()["delete"]("/schedule/events/".concat(event.id));
            case 10:
              response = _context2.sent;
              if (!response.data.success) {
                _context2.next = 17;
                break;
              }
              _context2.next = 14;
              return _this5.loadSchedule();
            case 14:
              _this5.$swal({
                title: 'Deleted!',
                text: response.data.message || 'Event has been deleted',
                icon: 'success',
                confirmButtonText: 'OK'
              });
              _context2.next = 18;
              break;
            case 17:
              _this5.$swal({
                title: 'Error!',
                text: response.data.message || 'Failed to delete event',
                icon: 'error',
                confirmButtonText: 'OK'
              });
            case 18:
              _context2.next = 23;
              break;
            case 20:
              _context2.prev = 20;
              _context2.t0 = _context2["catch"](7);
              _this5.$swal({
                title: 'Error!',
                text: ((_error$response2 = _context2.t0.response) === null || _error$response2 === void 0 || (_error$response2 = _error$response2.data) === null || _error$response2 === void 0 ? void 0 : _error$response2.message) || 'Failed to delete event',
                icon: 'error',
                confirmButtonText: 'OK'
              });
            case 23:
            case "end":
              return _context2.stop();
          }
        }, _callee2, null, [[7, 20]]);
      }))();
    },
    closeCreateModal: function closeCreateModal() {
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
        enableOnlineBooking: false
      };
      this.unlockBodyScroll();
    },
    lockBodyScroll: function lockBodyScroll() {
      document.body.style.overflow = 'hidden';
      document.body.style.paddingRight = '0px';
    },
    unlockBodyScroll: function unlockBodyScroll() {
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
    },
    getTabForSchedule: function getTabForSchedule(scheduleId) {
      // Map schedule ID to tab name
      var scheduleTabMap = {
        1: 'GROUP TRAINING',
        2: 'Private Gym',
        3: 'Recovery Center Services'
      };
      return scheduleTabMap[scheduleId] || this.activeTab;
    },
    saveEvent: function saveEvent() {
      var _this6 = this;
      return _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee3() {
        var startTime, endTime, eventTab, eventData, response, targetTab, _error$response3;
        return _regeneratorRuntime().wrap(function _callee3$(_context3) {
          while (1) switch (_context3.prev = _context3.next) {
            case 0:
              if (_this6.eventForm.scheduleId) {
                _context3.next = 3;
                break;
              }
              _this6.$swal({
                title: 'Validation Error',
                text: 'Please select a schedule',
                icon: 'warning',
                confirmButtonText: 'OK'
              });
              return _context3.abrupt("return");
            case 3:
              if (_this6.eventForm.activityId) {
                _context3.next = 6;
                break;
              }
              _this6.$swal({
                title: 'Validation Error',
                text: 'Please select an activity',
                icon: 'warning',
                confirmButtonText: 'OK'
              });
              return _context3.abrupt("return");
            case 6:
              if (!(!_this6.eventForm.maxParticipants || _this6.eventForm.maxParticipants <= 0)) {
                _context3.next = 9;
                break;
              }
              _this6.$swal({
                title: 'Validation Error',
                text: 'Please enter max participants (must be greater than 0)',
                icon: 'warning',
                confirmButtonText: 'OK'
              });
              return _context3.abrupt("return");
            case 9:
              _this6.saving = true;
              _context3.prev = 10;
              // Convert time from hour/minute/period format for all tabs
              startTime = _this6.convertTimeTo24Hour("".concat(_this6.eventForm.startHour, ":").concat(String(_this6.eventForm.startMinute).padStart(2, '0'), " ").concat(_this6.eventForm.startPeriod));
              endTime = _this6.convertTimeTo24Hour("".concat(_this6.eventForm.endHour, ":").concat(String(_this6.eventForm.endMinute).padStart(2, '0'), " ").concat(_this6.eventForm.endPeriod)); // Determine the tab based on selected schedule
              eventTab = _this6.activeTab;
              if (_this6.eventForm.scheduleId) {
                eventTab = _this6.getTabForSchedule(_this6.eventForm.scheduleId);
              }
              eventData = {
                title: _this6.eventForm.title || _this6.getActivityName(_this6.eventForm.activityId),
                date: _this6.eventForm.date || _this6.formatDate(_this6.currentDate),
                start_time: startTime,
                end_time: endTime,
                coach_id: _this6.eventForm.coachId || null,
                member_ids: _this6.eventForm.memberIds || [],
                activity_id: _this6.eventForm.activityId || null,
                description: _this6.eventForm.description,
                tab: eventTab,
                // My Schedule specific fields
                schedule_id: _this6.eventForm.scheduleId || null,
                max_participants: _this6.eventForm.maxParticipants || null,
                recurrency: _this6.eventForm.recurrency || null,
                location_id: _this6.eventForm.locationId || null,
                note_to_employees: _this6.eventForm.noteToEmployees || null,
                bookable_in_advance: _this6.eventForm.bookableInAdvance || 1,
                bookable_unit: _this6.eventForm.bookableUnit || 'weeks',
                credit_type: _this6.eventForm.creditType || 'No credits',
                cancel_if_no_participants: _this6.eventForm.cancelIfNoParticipants || 'always',
                free_cancellation_period: _this6.eventForm.freeCancellationPeriod || 'always',
                link: _this6.eventForm.link || null,
                link_text: _this6.eventForm.linkText || null,
                show_link_before_booking: _this6.eventForm.showLinkBeforeBooking || false,
                enable_online_booking: _this6.eventForm.enableOnlineBooking || false
              };
              if (!(_this6.isEditing && _this6.eventForm.id)) {
                _context3.next = 22;
                break;
              }
              _context3.next = 19;
              return axios__WEBPACK_IMPORTED_MODULE_0___default().put("/schedule/events/".concat(_this6.eventForm.id), eventData);
            case 19:
              response = _context3.sent;
              _context3.next = 25;
              break;
            case 22:
              _context3.next = 24;
              return axios__WEBPACK_IMPORTED_MODULE_0___default().post('/schedule/events', eventData);
            case 24:
              response = _context3.sent;
            case 25:
              if (!response.data.success) {
                _context3.next = 32;
                break;
              }
              // If a schedule was selected, switch to the corresponding tab before loading
              if (_this6.eventForm.scheduleId && !_this6.isEditing) {
                targetTab = _this6.getTabForSchedule(_this6.eventForm.scheduleId);
                if (targetTab !== _this6.activeTab) {
                  _this6.activeTab = targetTab;
                }
              }

              // Load schedule with the correct tab
              _context3.next = 29;
              return _this6.loadSchedule();
            case 29:
              _this6.closeCreateModal();
              _this6.unlockBodyScroll();
              _this6.$swal({
                title: 'Success!',
                text: "Event ".concat(_this6.isEditing ? 'updated' : 'created', " successfully"),
                icon: 'success',
                confirmButtonText: 'OK'
              });
            case 32:
              _context3.next = 37;
              break;
            case 34:
              _context3.prev = 34;
              _context3.t0 = _context3["catch"](10);
              _this6.$swal({
                title: 'Error!',
                text: ((_error$response3 = _context3.t0.response) === null || _error$response3 === void 0 || (_error$response3 = _error$response3.data) === null || _error$response3 === void 0 ? void 0 : _error$response3.message) || 'Failed to save event',
                icon: 'error',
                confirmButtonText: 'OK'
              });
            case 37:
              _context3.prev = 37;
              _this6.saving = false;
              return _context3.finish(37);
            case 40:
            case "end":
              return _context3.stop();
          }
        }, _callee3, null, [[10, 34, 37, 40]]);
      }))();
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
    getEventTime: function getEventTime(topValue) {
      var index = Math.round(topValue / 64);
      return this.timeSlots[index] || 'Unknown Time';
    },
    formatDate: function formatDate(date) {
      var year = date.getFullYear();
      var month = String(date.getMonth() + 1).padStart(2, '0');
      var day = String(date.getDate()).padStart(2, '0');
      return "".concat(year, "-").concat(month, "-").concat(day);
    },
    convertTimeTo24Hour: function convertTimeTo24Hour(timeStr) {
      var _timeStr$split3 = timeStr.split(' '),
        _timeStr$split4 = _slicedToArray(_timeStr$split3, 2),
        time = _timeStr$split4[0],
        period = _timeStr$split4[1];
      var _time$split3 = time.split(':'),
        _time$split4 = _slicedToArray(_time$split3, 2),
        hours = _time$split4[0],
        _time$split4$ = _time$split4[1],
        minutes = _time$split4$ === void 0 ? '00' : _time$split4$;
      var hour24 = parseInt(hours);
      if (period === 'pm' && hour24 !== 12) hour24 += 12;
      if (period === 'am' && hour24 === 12) hour24 = 0;
      return "".concat(String(hour24).padStart(2, '0'), ":").concat(minutes);
    },
    loadSchedule: function loadSchedule() {
      var _this7 = this;
      return _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee4() {
        var params, startDate, endDate, dates, response;
        return _regeneratorRuntime().wrap(function _callee4$(_context4) {
          while (1) switch (_context4.prev = _context4.next) {
            case 0:
              _context4.prev = 0;
              params = {
                tab: _this7.activeTab
              }; // Add member filter if selected
              // Note: When no member is selected, all events (including those with members) should be returned
              if (_this7.selectedMemberId) {
                params.member_id = _this7.selectedMemberId;
              }
              if (_this7.isMemberView) {
                // Load week's events
                startDate = _this7.weekDates[0];
                endDate = _this7.weekDates[6];
                params.start_date = _this7.formatDate(startDate);
                params.end_date = _this7.formatDate(endDate);
              } else {
                // Load events based on viewMode
                // For "By Coach" view, load all events for the current date
                // This ensures events with members assigned to coaches are included
                if (_this7.viewMode === '1 day' || _this7.viewMode === 'By Coach') {
                  params.date = _this7.formatDate(_this7.currentDate);
                } else {
                  // For multi-day views, load date range
                  dates = _this7.viewDates;
                  if (dates.length > 0) {
                    params.start_date = _this7.formatDate(dates[0]);
                    params.end_date = _this7.formatDate(dates[dates.length - 1]);
                  }
                }
              }
              _context4.next = 6;
              return axios__WEBPACK_IMPORTED_MODULE_0___default().get('/schedule/events', {
                params: params
              });
            case 6:
              response = _context4.sent;
              if (response.data && response.data.success && response.data.data) {
                _this7.scheduleEvents = response.data.data.map(function (event) {
                  var timeIndex = _this7.timeSlots.findIndex(function (slot) {
                    var eventTime = event.start_time || event.time;
                    return _this7.compareTime(slot, eventTime);
                  });
                  var duration = _this7.calculateDuration(event.start_time, event.end_time);

                  // Parse event date
                  var eventDate = event.date ? new Date(event.date) : event.start_time ? new Date("".concat(event.date || _this7.formatDate(_this7.currentDate), " ").concat(event.start_time)) : _this7.currentDate;
                  return {
                    id: event.id,
                    title: event.title || "".concat(event.activity_name || 'Event', " - ").concat(event.start_time),
                    subtitle: event.activity_name || 'Training',
                    time: event.start_time,
                    start_time: event.start_time,
                    endTime: event.end_time,
                    end_time: event.end_time,
                    date: event.date || _this7.formatDate(eventDate),
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
                _this7.scheduleEvents = [];
              }
              _context4.next = 13;
              break;
            case 10:
              _context4.prev = 10;
              _context4.t0 = _context4["catch"](0);
              _this7.scheduleEvents = [];
            case 13:
            case "end":
              return _context4.stop();
          }
        }, _callee4, null, [[0, 10]]);
      }))();
    },
    compareTime: function compareTime(slotTime, eventTime) {
      if (!slotTime || !eventTime) return false;

      // Convert slot time (e.g., "12 am", "1 pm") to 24-hour format
      var _slotTime$split = slotTime.split(' '),
        _slotTime$split2 = _slicedToArray(_slotTime$split, 2),
        slotTimeStr = _slotTime$split2[0],
        slotPeriod = _slotTime$split2[1];
      var _slotTimeStr$split = slotTimeStr.split(':'),
        _slotTimeStr$split2 = _slicedToArray(_slotTimeStr$split, 1),
        slotHours = _slotTimeStr$split2[0];
      var slotHour24 = parseInt(slotHours);
      if (slotPeriod === 'pm' && slotHour24 !== 12) slotHour24 += 12;
      if (slotPeriod === 'am' && slotHour24 === 12) slotHour24 = 0;

      // Convert event time (e.g., "00:00", "13:30") to hour
      var eventHour24;
      if (eventTime.includes(':')) {
        var _eventTime$split = eventTime.split(':'),
          _eventTime$split2 = _slicedToArray(_eventTime$split, 1),
          eventHours = _eventTime$split2[0];
        eventHour24 = parseInt(eventHours);
      } else {
        // Try to parse if it's in 12-hour format
        var _eventTime$split3 = eventTime.split(' '),
          _eventTime$split4 = _slicedToArray(_eventTime$split3, 2),
          eventTimeStr = _eventTime$split4[0],
          eventPeriod = _eventTime$split4[1];
        var _eventTimeStr$split = eventTimeStr.split(':'),
          _eventTimeStr$split2 = _slicedToArray(_eventTimeStr$split, 1),
          _eventHours = _eventTimeStr$split2[0];
        eventHour24 = parseInt(_eventHours);
        if (eventPeriod === 'pm' && eventHour24 !== 12) eventHour24 += 12;
        if (eventPeriod === 'am' && eventHour24 === 12) eventHour24 = 0;
      }

      // Match if event starts at this time slot (within the same hour)
      return slotHour24 === eventHour24;
    },
    calculateDuration: function calculateDuration(startTime, endTime) {
      if (!startTime || !endTime) return 1;

      // Convert times to minutes for accurate calculation
      var timeToMinutes = function timeToMinutes(timeStr) {
        if (!timeStr) return 0;

        // Handle 24-hour format (HH:MM)
        if (timeStr.includes(':')) {
          var _timeStr$split5 = timeStr.split(':'),
            _timeStr$split6 = _slicedToArray(_timeStr$split5, 2),
            _hours = _timeStr$split6[0],
            _timeStr$split6$ = _timeStr$split6[1],
            _minutes = _timeStr$split6$ === void 0 ? '00' : _timeStr$split6$;
          return parseInt(_hours) * 60 + parseInt(_minutes);
        }

        // Handle 12-hour format (e.g., "1 pm", "12 am")
        var _timeStr$split7 = timeStr.split(' '),
          _timeStr$split8 = _slicedToArray(_timeStr$split7, 2),
          timePart = _timeStr$split8[0],
          period = _timeStr$split8[1];
        var _timePart$split = timePart.split(':'),
          _timePart$split2 = _slicedToArray(_timePart$split, 1),
          hours = _timePart$split2[0];
        var hour24 = parseInt(hours);
        if (period === 'pm' && hour24 !== 12) hour24 += 12;
        if (period === 'am' && hour24 === 12) hour24 = 0;
        var minutes = timePart.includes(':') ? parseInt(timePart.split(':')[1]) : 0;
        return hour24 * 60 + minutes;
      };
      var startMinutes = timeToMinutes(startTime);
      var endMinutes = timeToMinutes(endTime);
      if (endMinutes <= startMinutes) {
        // If end time is before or equal to start, assume 1 hour duration
        return 1;
      }
      var durationMinutes = endMinutes - startMinutes;
      var durationHours = Math.max(1, Math.ceil(durationMinutes / 60));
      return durationHours;
    },
    loadCoaches: function loadCoaches() {
      var _this8 = this;
      return _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee5() {
        var response;
        return _regeneratorRuntime().wrap(function _callee5$(_context5) {
          while (1) switch (_context5.prev = _context5.next) {
            case 0:
              _context5.prev = 0;
              _context5.next = 3;
              return axios__WEBPACK_IMPORTED_MODULE_0___default().get('/coaches', {
                params: {
                  limit: 1000
                } // Get all coaches
              });
            case 3:
              response = _context5.sent;
              if (response.data && response.data.clients) {
                _this8.coaches = response.data.clients.map(function (coach) {
                  return {
                    id: coach.id,
                    name: coach.name || "".concat(coach.first_name || '', " ").concat(coach.last_name || '').trim()
                  };
                });
              } else {
                _this8.coaches = [];
              }
              _context5.next = 10;
              break;
            case 7:
              _context5.prev = 7;
              _context5.t0 = _context5["catch"](0);
              _this8.coaches = [];
            case 10:
            case "end":
              return _context5.stop();
          }
        }, _callee5, null, [[0, 7]]);
      }))();
    },
    loadMembers: function loadMembers() {
      var _this9 = this;
      return _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee6() {
        var response;
        return _regeneratorRuntime().wrap(function _callee6$(_context6) {
          while (1) switch (_context6.prev = _context6.next) {
            case 0:
              _context6.prev = 0;
              _context6.next = 3;
              return axios__WEBPACK_IMPORTED_MODULE_0___default().get('/get_members_without_paginate');
            case 3:
              response = _context6.sent;
              // The endpoint returns an array directly, not wrapped in an object
              if (response.data && Array.isArray(response.data)) {
                _this9.members = response.data.map(function (member) {
                  var name = member.name || member.membername || "".concat(member.firstname || '', " ").concat(member.lastname || '').trim();
                  return {
                    id: member.id,
                    name: name || "Member #".concat(member.id) // Fallback to ID if no name
                  };
                }).filter(function (member) {
                  return member.id;
                }); // Filter out members without ID
              } else if (response.data && response.data.clients && Array.isArray(response.data.clients)) {
                // Fallback: handle if response is wrapped in clients key
                _this9.members = response.data.clients.map(function (member) {
                  var name = member.name || member.membername || "".concat(member.firstname || '', " ").concat(member.lastname || '').trim();
                  return {
                    id: member.id,
                    name: name || "Member #".concat(member.id)
                  };
                }).filter(function (member) {
                  return member.id;
                });
              } else {
                _this9.members = [];
              }
              _context6.next = 10;
              break;
            case 7:
              _context6.prev = 7;
              _context6.t0 = _context6["catch"](0);
              _this9.members = [];
            case 10:
            case "end":
              return _context6.stop();
          }
        }, _callee6, null, [[0, 7]]);
      }))();
    },
    loadSchedules: function loadSchedules() {
      var _this10 = this;
      return _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee7() {
        return _regeneratorRuntime().wrap(function _callee7$(_context7) {
          while (1) switch (_context7.prev = _context7.next) {
            case 0:
              // Static schedule options
              _this10.schedules = [{
                id: 1,
                name: 'Group Training'
              }, {
                id: 2,
                name: 'Private Gym'
              }, {
                id: 3,
                name: 'Recovery Center Services'
              }];
            case 1:
            case "end":
              return _context7.stop();
          }
        }, _callee7);
      }))();
    },
    loadLocations: function loadLocations() {
      var _this11 = this;
      return _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee8() {
        return _regeneratorRuntime().wrap(function _callee8$(_context8) {
          while (1) switch (_context8.prev = _context8.next) {
            case 0:
              // Static location options
              _this11.locations = [{
                id: 1,
                name: 'Gym'
              }, {
                id: 2,
                name: 'Virtual'
              }];
            case 1:
            case "end":
              return _context8.stop();
          }
        }, _callee8);
      }))();
    },
    loadActivities: function loadActivities() {
      var _this12 = this;
      return _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee9() {
        var response, items;
        return _regeneratorRuntime().wrap(function _callee9$(_context9) {
          while (1) switch (_context9.prev = _context9.next) {
            case 0:
              _context9.prev = 0;
              _context9.next = 3;
              return axios__WEBPACK_IMPORTED_MODULE_0___default().get('/schedule/activities');
            case 3:
              response = _context9.sent;
              if (response.data && response.data.success) {
                items = response.data.data || [];
                _this12.activities = items.map(function (a) {
                  return {
                    id: a.id,
                    name: a.name || 'Unnamed Activity'
                  };
                }).filter(function (a) {
                  return a.id && a.name;
                });
                _this12.activityOptions = _this12.activities.map(function (a) {
                  return a.name;
                });
              } else {
                _this12.activities = [];
                _this12.activityOptions = [];
              }
              _context9.next = 11;
              break;
            case 7:
              _context9.prev = 7;
              _context9.t0 = _context9["catch"](0);
              _this12.activities = [];
              _this12.activityOptions = [];
            case 11:
            case "end":
              return _context9.stop();
          }
        }, _callee9, null, [[0, 7]]);
      }))();
    },
    openActivityModal: function openActivityModal() {
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
        youtube_url_female: ''
      };
      this.showActivityModal = true;
    },
    onActivityModalHide: function onActivityModalHide() {
      // Restore create/edit event modal if it was open before creating an activity.
      if (this.reopenCreateModalAfterActivity) {
        this.showCreateModal = true;
        this.lockBodyScroll();
      }
      this.reopenCreateModalAfterActivity = false;
    },
    saveActivity: function saveActivity() {
      var _this13 = this;
      return _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee10() {
        var payload, res, created, _e$response;
        return _regeneratorRuntime().wrap(function _callee10$(_context10) {
          while (1) switch (_context10.prev = _context10.next) {
            case 0:
              if (!(!_this13.activityForm.name || _this13.activityForm.name.trim() === '')) {
                _context10.next = 3;
                break;
              }
              _this13.$swal({
                title: 'Validation',
                text: 'Name is required',
                icon: 'warning',
                confirmButtonText: 'OK'
              });
              return _context10.abrupt("return");
            case 3:
              _this13.activitySaving = true;
              _context10.prev = 4;
              payload = _objectSpread({}, _this13.activityForm);
              _context10.next = 8;
              return axios__WEBPACK_IMPORTED_MODULE_0___default().post('/schedule/activities', payload);
            case 8:
              res = _context10.sent;
              if (res.data && res.data.success) {
                created = res.data.data;
                _this13.activities.push({
                  id: created.id,
                  name: created.name
                });
                _this13.activityOptions = _this13.activities.map(function (a) {
                  return a.name;
                });
                _this13.eventForm.activityId = created.id;
                _this13.showActivityModal = false;
                // onActivityModalHide() will restore the create modal (if it was open).

                _this13.$swal({
                  title: 'Success!',
                  text: 'Activity created',
                  icon: 'success',
                  confirmButtonText: 'OK'
                });
              } else {
                _this13.$swal({
                  title: 'Error!',
                  text: res.data.message || 'Failed to create activity',
                  icon: 'error',
                  confirmButtonText: 'OK'
                });
              }
              _context10.next = 15;
              break;
            case 12:
              _context10.prev = 12;
              _context10.t0 = _context10["catch"](4);
              _this13.$swal({
                title: 'Error!',
                text: ((_e$response = _context10.t0.response) === null || _e$response === void 0 || (_e$response = _e$response.data) === null || _e$response === void 0 ? void 0 : _e$response.message) || 'Failed to create activity',
                icon: 'error',
                confirmButtonText: 'OK'
              });
            case 15:
              _context10.prev = 15;
              _this13.activitySaving = false;
              return _context10.finish(15);
            case 18:
            case "end":
              return _context10.stop();
          }
        }, _callee10, null, [[4, 12, 15, 18]]);
      }))();
    },
    getActivityName: function getActivityName(activityId) {
      var activity = this.activities.find(function (a) {
        return a.id == activityId;
      });
      return activity ? activity.name : '';
    },
    getEventsForDate: function getEventsForDate(date) {
      var _this14 = this;
      var dateStr = this.formatDate(date);
      return this.filteredEvents.filter(function (event) {
        var eventDate = event.date || _this14.formatDate(new Date(event.start_time));
        return eventDate === dateStr;
      });
    },
    getEventsForCell: function getEventsForCell(date, time) {
      var _this15 = this;
      var dateStr = this.formatDate(date);
      var _time$split5 = time.split(' '),
        _time$split6 = _slicedToArray(_time$split5, 2),
        timeStr = _time$split6[0],
        period = _time$split6[1];
      var _timeStr$split9 = timeStr.split(':'),
        _timeStr$split10 = _slicedToArray(_timeStr$split9, 1),
        hours = _timeStr$split10[0];
      var hour24 = parseInt(hours);
      if (period === 'pm' && hour24 !== 12) hour24 += 12;
      if (period === 'am' && hour24 === 12) hour24 = 0;
      return this.filteredEvents.filter(function (event) {
        var eventDate = event.date || _this15.formatDate(new Date(event.start_time));
        if (eventDate !== dateStr) return false;
        var eventTime = event.start_time || event.time;
        if (!eventTime) return false;
        var _eventTime$split5 = eventTime.split(':'),
          _eventTime$split6 = _slicedToArray(_eventTime$split5, 1),
          eventHours = _eventTime$split6[0];
        var eventHour24 = parseInt(eventHours);

        // Event should only appear in the exact time slot where it starts
        // Match the exact hour to prevent duplicate displays
        return eventHour24 === hour24;
      });
    },
    getEventsForCoachAndTime: function getEventsForCoachAndTime(coach, time) {
      var _this16 = this;
      var dateStr = this.formatDate(this.currentDate);
      var _time$split7 = time.split(' '),
        _time$split8 = _slicedToArray(_time$split7, 2),
        timeStr = _time$split8[0],
        period = _time$split8[1];
      var _timeStr$split11 = timeStr.split(':'),
        _timeStr$split12 = _slicedToArray(_timeStr$split11, 1),
        hours = _timeStr$split12[0];
      var hour24 = parseInt(hours);
      if (period === 'pm' && hour24 !== 12) hour24 += 12;
      if (period === 'am' && hour24 === 12) hour24 = 0;
      return this.filteredEvents.filter(function (event) {
        // Filter by date
        var eventDate = event.date || _this16.formatDate(new Date(event.start_time));
        if (eventDate !== dateStr) return false;

        // Filter by coach
        if (coach.id === null) {
          // "Without coach" column - events with no coach
          if (event.coachId || event.coach_id) return false;
        } else {
          // Specific coach column - events must match this coach
          // Also include events that have members assigned to this coach's schedule
          var eventCoachId = event.coachId || event.coach_id;
          if (!eventCoachId || eventCoachId != coach.id) return false;
        }

        // Filter by time slot
        var eventTime = event.start_time || event.time;
        if (!eventTime) return false;
        var _eventTime$split7 = eventTime.split(':'),
          _eventTime$split8 = _slicedToArray(_eventTime$split7, 1),
          eventHours = _eventTime$split8[0];
        var eventHour24 = parseInt(eventHours);

        // Event should only appear in the exact time slot where it starts
        // Match the exact hour to prevent duplicate displays
        return eventHour24 === hour24;
      });
    },
    handleCoachCellClick: function handleCoachCellClick(timeIndex, coach) {
      var selectedTime = this.timeSlots[timeIndex];
      var _selectedTime$split3 = selectedTime.split(' '),
        _selectedTime$split4 = _slicedToArray(_selectedTime$split3, 2),
        time = _selectedTime$split4[0],
        period = _selectedTime$split4[1];
      var _time$split9 = time.split(':'),
        _time$split10 = _slicedToArray(_time$split9, 1),
        hours = _time$split10[0];
      var hour24 = parseInt(hours);
      if (period === 'pm' && hour24 !== 12) hour24 += 12;
      if (period === 'am' && hour24 === 12) hour24 = 0;
      var hour12 = hour24 > 12 ? hour24 - 12 : hour24 === 0 ? 12 : hour24;
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
        endHour: hour12 === 12 ? 1 : hour12 + 1,
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
        enableOnlineBooking: false
      };
      this.isEditing = false;
      this.showCreateModal = true;
      this.lockBodyScroll();
    },
    handleMultiDayCellClick: function handleMultiDayCellClick(timeIndex, dayIndex, date) {
      var selectedTime = this.timeSlots[timeIndex];
      var _selectedTime$split5 = selectedTime.split(' '),
        _selectedTime$split6 = _slicedToArray(_selectedTime$split5, 2),
        time = _selectedTime$split6[0],
        period = _selectedTime$split6[1];
      var _time$split11 = time.split(':'),
        _time$split12 = _slicedToArray(_time$split11, 1),
        hours = _time$split12[0];
      var hour24 = parseInt(hours);
      if (period === 'pm' && hour24 !== 12) hour24 += 12;
      if (period === 'am' && hour24 === 12) hour24 = 0;
      var hour12 = hour24 > 12 ? hour24 - 12 : hour24 === 0 ? 12 : hour24;
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
        endHour: hour24 + 1 > 12 ? hour24 + 1 - 12 === 0 ? 12 : hour24 + 1 - 12 : hour24 + 1 === 12 ? 12 : hour24 + 1,
        endMinute: 0,
        endPeriod: hour24 + 1 >= 12 ? 'PM' : 'AM',
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
        enableOnlineBooking: false
      };
      this.isEditing = false;
      this.showCreateModal = true;
      this.lockBodyScroll();
    },
    handleWeeklyCellClick: function handleWeeklyCellClick(timeIndex, dayIndex, date) {
      var selectedTime = this.timeSlots[timeIndex];
      var _selectedTime$split7 = selectedTime.split(' '),
        _selectedTime$split8 = _slicedToArray(_selectedTime$split7, 2),
        time = _selectedTime$split8[0],
        period = _selectedTime$split8[1];
      var _time$split13 = time.split(':'),
        _time$split14 = _slicedToArray(_time$split13, 1),
        hours = _time$split14[0];
      var hour24 = parseInt(hours);
      if (period === 'pm' && hour24 !== 12) hour24 += 12;
      if (period === 'am' && hour24 === 12) hour24 = 0;
      var hour12 = hour24 > 12 ? hour24 - 12 : hour24 === 0 ? 12 : hour24;
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
        endHour: hour24 + 1 > 12 ? hour24 + 1 - 12 === 0 ? 12 : hour24 + 1 - 12 : hour24 + 1 === 12 ? 12 : hour24 + 1,
        endMinute: 0,
        endPeriod: hour24 + 1 >= 12 ? 'PM' : 'AM',
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
        enableOnlineBooking: false
      };
      this.isEditing = false;
      this.showCreateModal = true;
      this.lockBodyScroll();
    },
    formatEventTime: function formatEventTime(time24) {
      if (!time24) return '';
      var _time24$split = time24.split(':'),
        _time24$split2 = _slicedToArray(_time24$split, 2),
        hours = _time24$split2[0],
        _time24$split2$ = _time24$split2[1],
        minutes = _time24$split2$ === void 0 ? '00' : _time24$split2$;
      var hour24 = parseInt(hours);
      var period = hour24 >= 12 ? 'pm' : 'am';
      var hour12 = hour24 > 12 ? hour24 - 12 : hour24 === 0 ? 12 : hour24;
      return "".concat(hour12, ":").concat(String(minutes).padStart(2, '0'), " ").concat(period);
    },
    formatEventDate: function formatEventDate(dateStr) {
      if (!dateStr) return '';
      var date = new Date(dateStr);
      var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
      var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
      var dayName = days[date.getDay()];
      var day = date.getDate();
      var month = months[date.getMonth()];
      return "".concat(String(day).padStart(2, '0'), " ").concat(dayName, " ").concat(month);
    },
    getCreditText: function getCreditText(event) {
      if (event.creditType && event.creditType !== 'No credits') {
        var scheduleName = event.schedule_id === 1 ? 'Group Classes' : event.schedule_id === 2 ? 'Private Gym' : event.schedule_id === 3 ? 'Recovery Center' : 'Classes';
        return "1 ".concat(scheduleName, " Credits");
      }
      return 'No credits';
    },
    selectMember: function selectMember(member) {
      this.selectedMemberId = member.id;
      this.searchTerm = member.name;
      this.showMemberDropdown = false;
      this.loadSchedule();
    },
    clearMemberFilter: function clearMemberFilter() {
      this.selectedMemberId = null;
      this.searchTerm = '';
      this.showMemberDropdown = false;
      this.loadSchedule();
    },
    getMemberName: function getMemberName(memberId) {
      var member = this.members.find(function (m) {
        return m.id == memberId;
      });
      return member ? member.name : "Member #".concat(memberId);
    },
    handleSearchBlur: function handleSearchBlur() {
      var _this17 = this;
      // Delay hiding dropdown to allow click events to fire
      setTimeout(function () {
        _this17.showMemberDropdown = false;
      }, 200);
    },
    setupScrollSync: function setupScrollSync() {
      var _this18 = this;
      this.$nextTick(function () {
        var isScrolling = false;

        // Sync scroll for single day view
        if (_this18.$refs.timeColumn && _this18.$refs.scheduleContent) {
          var timeCol = _this18.$refs.timeColumn;
          var scheduleCont = _this18.$refs.scheduleContent;
          scheduleCont.addEventListener('scroll', function () {
            if (!isScrolling) {
              isScrolling = true;
              timeCol.scrollTop = scheduleCont.scrollTop;
              setTimeout(function () {
                isScrolling = false;
              }, 10);
            }
          });
          timeCol.addEventListener('scroll', function () {
            if (!isScrolling) {
              isScrolling = true;
              scheduleCont.scrollTop = timeCol.scrollTop;
              setTimeout(function () {
                isScrolling = false;
              }, 10);
            }
          });
        }

        // Sync scroll for multi-day view
        if (_this18.$refs.timeColumn && _this18.$refs.multiDayContent) {
          var _timeCol = _this18.$refs.timeColumn;
          var multiDay = _this18.$refs.multiDayContent;
          multiDay.addEventListener('scroll', function () {
            if (!isScrolling) {
              isScrolling = true;
              _timeCol.scrollTop = multiDay.scrollTop;
              setTimeout(function () {
                isScrolling = false;
              }, 10);
            }
          });
          _timeCol.addEventListener('scroll', function () {
            if (!isScrolling) {
              isScrolling = true;
              multiDay.scrollTop = _timeCol.scrollTop;
              setTimeout(function () {
                isScrolling = false;
              }, 10);
            }
          });
        }

        // Sync scroll for member view (weekly)
        if (_this18.$refs.timeColumnMember && _this18.$refs.weeklyContent) {
          var timeColMem = _this18.$refs.timeColumnMember;
          var weekly = _this18.$refs.weeklyContent;
          weekly.addEventListener('scroll', function () {
            if (!isScrolling) {
              isScrolling = true;
              timeColMem.scrollTop = weekly.scrollTop;
              setTimeout(function () {
                isScrolling = false;
              }, 10);
            }
          });
          timeColMem.addEventListener('scroll', function () {
            if (!isScrolling) {
              isScrolling = true;
              weekly.scrollTop = timeColMem.scrollTop;
              setTimeout(function () {
                isScrolling = false;
              }, 10);
            }
          });
        }
      });
    }
  },
  mounted: function mounted() {
    var _this19 = this;
    return _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee11() {
      return _regeneratorRuntime().wrap(function _callee11$(_context11) {
        while (1) switch (_context11.prev = _context11.next) {
          case 0:
            _context11.next = 2;
            return Promise.all([_this19.loadCoaches(), _this19.loadMembers(), _this19.loadActivities(), _this19.loadSchedules(), _this19.loadLocations()]);
          case 2:
            _context11.next = 4;
            return _this19.loadSchedule();
          case 4:
            _this19.setupScrollSync();
          case 5:
          case "end":
            return _context11.stop();
        }
      }, _callee11);
    }))();
  },
  beforeDestroy: function beforeDestroy() {
    // Ensure body scroll is unlocked when component is destroyed
    this.unlockBodyScroll();
  }
});

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js??clonedRuleSet-12.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12.use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-12.use[3]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/Schedule/Schedule.vue?vue&type=style&index=0&id=06c2befc&lang=scss&scoped=true":
/*!********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??clonedRuleSet-12.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12.use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-12.use[3]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/Schedule/Schedule.vue?vue&type=style&index=0&id=06c2befc&lang=scss&scoped=true ***!
  \********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
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
___CSS_LOADER_EXPORT___.push([module.id, "@charset \"UTF-8\";\n.filter-btn .btn[data-v-06c2befc],\n.filter-btn .btn-secondary[data-v-06c2befc],\n.filter-btn .btn-outline-secondary[data-v-06c2befc],\n.filter-btn button.btn[data-v-06c2befc],\n.filter-btn button.btn-secondary[data-v-06c2befc] {\n  color: #000 !important;\n  background-color: transparent !important;\n  border-color: #6c757d !important;\n}\n.filter-btn .btn[data-v-06c2befc]:hover,\n.filter-btn .btn-secondary[data-v-06c2befc]:hover,\n.filter-btn .btn-outline-secondary[data-v-06c2befc]:hover,\n.filter-btn button.btn[data-v-06c2befc]:hover,\n.filter-btn button.btn-secondary[data-v-06c2befc]:hover {\n  color: #dc3545 !important;\n  background-color: transparent !important;\n  border-color: #dc3545 !important;\n  box-shadow: none !important;\n}\n.filter-btn .btn[data-v-06c2befc]:focus,\n.filter-btn .btn-secondary[data-v-06c2befc]:focus,\n.filter-btn .btn-outline-secondary[data-v-06c2befc]:focus,\n.filter-btn button.btn[data-v-06c2befc]:focus,\n.filter-btn button.btn-secondary[data-v-06c2befc]:focus {\n  color: #dc3545 !important;\n  background-color: transparent !important;\n  border-color: #dc3545 !important;\n  box-shadow: none !important;\n}\n.filter-btn .btn[data-v-06c2befc]:active,\n.filter-btn .btn-secondary[data-v-06c2befc]:active,\n.filter-btn .btn-outline-secondary[data-v-06c2befc]:active,\n.filter-btn button.btn[data-v-06c2befc]:active,\n.filter-btn button.btn-secondary[data-v-06c2befc]:active {\n  color: #dc3545 !important;\n  background-color: transparent !important;\n  border-color: #dc3545 !important;\n}\n.btn-secondary[data-v-06c2befc]:not(:disabled):not(.disabled):active:focus {\n  box-shadow: none !important;\n}\n\n/* ===========================================\n   COMMON BREADCRUMB NAVIGATION STYLES\n   =========================================== */\n.breadcrumb-nav-row[data-v-06c2befc] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  margin-bottom: 0.5rem;\n  gap: 0.5rem;\n}\n.breadcrumb-section[data-v-06c2befc] {\n  flex: 1;\n}\n.breadcrumb-section .breadcrumb-nav .breadcrumb-container[data-v-06c2befc] {\n  display: flex;\n  align-items: center;\n  gap: 1rem;\n}\n.breadcrumb-section .breadcrumb-nav .breadcrumb-container .back-button[data-v-06c2befc] {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  width: 40px;\n  height: 40px;\n  background: rgba(255, 255, 255, 0.1);\n  border: 1px solid rgba(255, 255, 255, 0.2);\n  border-radius: 8px;\n  color: #ffffff;\n  cursor: pointer;\n  transition: all 0.3s ease;\n}\n.breadcrumb-section .breadcrumb-nav .breadcrumb-container .back-button[data-v-06c2befc]:hover {\n  background: rgba(255, 255, 255, 0.15);\n  border-color: rgba(255, 255, 255, 0.3);\n  transform: translateY(-1px);\n  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);\n  color: #dc3545;\n}\n.breadcrumb-section .breadcrumb-nav .breadcrumb-container .back-button i[data-v-06c2befc] {\n  font-size: 1.1em;\n}\n.breadcrumb-section .breadcrumb-nav .breadcrumb-container .breadcrumb[data-v-06c2befc] {\n  display: flex;\n  align-items: center;\n  gap: 0.5rem;\n  margin: 0;\n  padding: 0;\n  background: none;\n  border-radius: 0;\n}\n.breadcrumb-section .breadcrumb-nav .breadcrumb-container .breadcrumb .breadcrumb-item[data-v-06c2befc] {\n  display: flex;\n  align-items: center;\n  gap: 0.5rem;\n  font-size: 0.875rem;\n  color: #ffffff;\n}\n.breadcrumb-section .breadcrumb-nav .breadcrumb-container .breadcrumb .breadcrumb-item.active[data-v-06c2befc] {\n  color: #252525;\n  font-weight: 600;\n}\n.breadcrumb-section .breadcrumb-nav .breadcrumb-container .breadcrumb .breadcrumb-item.active i[data-v-06c2befc] {\n  color: #dc3545;\n}\n.breadcrumb-section .breadcrumb-nav .breadcrumb-container .breadcrumb .breadcrumb-item a[data-v-06c2befc] {\n  display: flex;\n  align-items: center;\n  gap: 0.5rem;\n  color: #6a6a6a;\n  text-decoration: none;\n  transition: color 0.3s ease;\n}\n.breadcrumb-section .breadcrumb-nav .breadcrumb-container .breadcrumb .breadcrumb-item a[data-v-06c2befc]:hover {\n  color: #dc3545;\n}\n.breadcrumb-section .breadcrumb-nav .breadcrumb-container .breadcrumb .breadcrumb-item a:hover i[data-v-06c2befc] {\n  color: #dc3545;\n}\n.breadcrumb-section .breadcrumb-nav .breadcrumb-container .breadcrumb .breadcrumb-item a i[data-v-06c2befc] {\n  font-size: 0.9em;\n  transition: color 0.3s ease;\n}\n.breadcrumb-section .breadcrumb-nav .breadcrumb-container .breadcrumb .breadcrumb-item[data-v-06c2befc]:not(:last-child)::after {\n  content: \"›\";\n  margin-left: 0.5rem;\n  color: #6a6a6a;\n  font-size: 1.2em;\n}\n.action-section[data-v-06c2befc] {\n  display: flex;\n  align-items: center;\n}\n.action-section .action-btn[data-v-06c2befc] {\n  display: flex;\n  align-items: center;\n  gap: 0.5rem;\n  padding: 0.5rem 1rem;\n  border-radius: 8px;\n  font-size: 0.875rem;\n  font-weight: 500;\n  transition: all 0.3s ease;\n}\n.action-section .action-btn[data-v-06c2befc]:hover:not(:disabled) {\n  transform: translateY(-1px);\n  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);\n}\n.action-section .action-btn[data-v-06c2befc]:disabled {\n  opacity: 0.6;\n  cursor: not-allowed;\n}\n.action-section .action-btn i[data-v-06c2befc] {\n  font-size: 0.9em;\n}\n@media (max-width: 768px) {\n.breadcrumb-nav-row[data-v-06c2befc] {\n    flex-direction: column;\n    align-items: flex-start;\n    gap: 0.5rem;\n}\n.breadcrumb-section[data-v-06c2befc] {\n    width: 100%;\n}\n.breadcrumb-section .breadcrumb-container[data-v-06c2befc] {\n    flex-direction: column;\n    align-items: flex-start;\n    gap: 0.5rem;\n}\n.breadcrumb-section .breadcrumb-container .breadcrumb[data-v-06c2befc] {\n    flex-wrap: wrap;\n}\n.breadcrumb-section .breadcrumb-container .breadcrumb .breadcrumb-item[data-v-06c2befc] {\n    font-size: 0.8rem;\n}\n.breadcrumb-section .breadcrumb-container .breadcrumb .breadcrumb-item a[data-v-06c2befc] {\n    font-size: 0.8rem;\n}\n.action-section[data-v-06c2befc] {\n    width: 100%;\n    justify-content: flex-end;\n}\n.action-section .action-btn[data-v-06c2befc] {\n    font-size: 0.8rem;\n    padding: 0.4rem 0.8rem;\n}\n}\n/* ===========================================\n   RESPONSIVE UTILITY CLASSES (ALL DEVICES)\n   =========================================== */\n.show-xs-only[data-v-06c2befc],\n.show-sm-only[data-v-06c2befc],\n.show-md-only[data-v-06c2befc],\n.show-lg-only[data-v-06c2befc],\n.show-xl-only[data-v-06c2befc] {\n  display: none !important;\n}\n@media (max-width: 575px) {\n.hide-xs[data-v-06c2befc] {\n    display: none !important;\n}\n.show-xs-only[data-v-06c2befc] {\n    display: initial !important;\n}\n}\n@media (min-width: 576px) and (max-width: 767px) {\n.hide-sm[data-v-06c2befc] {\n    display: none !important;\n}\n.show-sm-only[data-v-06c2befc] {\n    display: initial !important;\n}\n}\n@media (min-width: 768px) and (max-width: 991px) {\n.hide-md[data-v-06c2befc] {\n    display: none !important;\n}\n.show-md-only[data-v-06c2befc] {\n    display: initial !important;\n}\n}\n@media (min-width: 992px) and (max-width: 1199px) {\n.hide-lg[data-v-06c2befc] {\n    display: none !important;\n}\n.show-lg-only[data-v-06c2befc] {\n    display: initial !important;\n}\n}\n@media (min-width: 1200px) {\n.hide-xl[data-v-06c2befc] {\n    display: none !important;\n}\n.show-xl-only[data-v-06c2befc] {\n    display: initial !important;\n}\n}\n@media (max-width: 576px) {\n.hide-sm-down[data-v-06c2befc] {\n    display: none !important;\n}\n}\n@media (max-width: 768px) {\n.hide-md-down[data-v-06c2befc] {\n    display: none !important;\n}\n}\n@media (max-width: 992px) {\n.hide-lg-down[data-v-06c2befc] {\n    display: none !important;\n}\n}\n@media (min-width: 576px) {\n.hide-sm-up[data-v-06c2befc] {\n    display: none !important;\n}\n}\n@media (min-width: 768px) {\n.hide-md-up[data-v-06c2befc] {\n    display: none !important;\n}\n}\n@media (min-width: 992px) {\n.hide-lg-up[data-v-06c2befc] {\n    display: none !important;\n}\n}\n@media (max-width: 575px) {\n.d-xs-none[data-v-06c2befc] {\n    display: none !important;\n}\n.d-xs-block[data-v-06c2befc] {\n    display: block !important;\n}\n.d-xs-flex[data-v-06c2befc] {\n    display: flex !important;\n}\n}\n@media (min-width: 576px) and (max-width: 767px) {\n.d-sm-none[data-v-06c2befc] {\n    display: none !important;\n}\n.d-sm-block[data-v-06c2befc] {\n    display: block !important;\n}\n.d-sm-flex[data-v-06c2befc] {\n    display: flex !important;\n}\n}\n@media (min-width: 768px) and (max-width: 991px) {\n.d-md-none[data-v-06c2befc] {\n    display: none !important;\n}\n.d-md-block[data-v-06c2befc] {\n    display: block !important;\n}\n.d-md-flex[data-v-06c2befc] {\n    display: flex !important;\n}\n}\n@media (min-width: 992px) and (max-width: 1199px) {\n.d-lg-none[data-v-06c2befc] {\n    display: none !important;\n}\n.d-lg-block[data-v-06c2befc] {\n    display: block !important;\n}\n.d-lg-flex[data-v-06c2befc] {\n    display: flex !important;\n}\n}\n@media (min-width: 1200px) {\n.d-xl-none[data-v-06c2befc] {\n    display: none !important;\n}\n.d-xl-block[data-v-06c2befc] {\n    display: block !important;\n}\n.d-xl-flex[data-v-06c2befc] {\n    display: flex !important;\n}\n}\n@media (min-width: 576px) {\n.custom-modal-xl[data-v-06c2befc] {\n    max-width: 1500px !important;\n}\n}\n.container-fluid[data-v-06c2befc] {\n  padding: 20px;\n  position: relative;\n  z-index: 1;\n}\n\n/* ===========================================\n   BREADCRUMB NAVIGATION STYLES\n   =========================================== */\n.breadcrumb-nav-row[data-v-06c2befc] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  margin-bottom: 1.5rem;\n  padding: 1rem 0;\n  gap: 1rem;\n}\n.breadcrumb-section[data-v-06c2befc] {\n  flex: 1;\n}\n.breadcrumb-section .breadcrumb-nav .breadcrumb-container[data-v-06c2befc] {\n  display: flex;\n  align-items: center;\n  gap: 1rem;\n}\n.breadcrumb-section .breadcrumb-nav .breadcrumb-container .back-button[data-v-06c2befc] {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  width: 40px;\n  height: 40px;\n  background: rgba(255, 255, 255, 0.1);\n  border: 1px solid rgba(255, 255, 255, 0.2);\n  border-radius: 8px;\n  color: #252525;\n  cursor: pointer;\n  transition: all 0.3s ease;\n}\n.breadcrumb-section .breadcrumb-nav .breadcrumb-container .back-button[data-v-06c2befc]:hover {\n  background: rgba(255, 255, 255, 0.15);\n  border-color: rgba(255, 255, 255, 0.3);\n  transform: translateY(-1px);\n  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);\n  color: #dc3545;\n}\n.breadcrumb-section .breadcrumb-nav .breadcrumb-container .back-button i[data-v-06c2befc] {\n  font-size: 1.1em;\n}\n.breadcrumb-section .breadcrumb-nav .breadcrumb-container .breadcrumb[data-v-06c2befc] {\n  display: flex;\n  align-items: center;\n  gap: 0.5rem;\n  margin: 0;\n  padding: 0;\n  background: none;\n  border-radius: 0;\n}\n.breadcrumb-section .breadcrumb-nav .breadcrumb-container .breadcrumb .breadcrumb-item[data-v-06c2befc] {\n  display: flex;\n  align-items: center;\n  gap: 0.5rem;\n  font-size: 0.875rem;\n  color: #6a6a6a;\n}\n.breadcrumb-section .breadcrumb-nav .breadcrumb-container .breadcrumb .breadcrumb-item.active[data-v-06c2befc] {\n  color: #252525;\n  font-weight: 600;\n}\n.breadcrumb-section .breadcrumb-nav .breadcrumb-container .breadcrumb .breadcrumb-item.active i[data-v-06c2befc] {\n  color: #dc3545;\n}\n.breadcrumb-section .breadcrumb-nav .breadcrumb-container .breadcrumb .breadcrumb-item a[data-v-06c2befc] {\n  display: flex;\n  align-items: center;\n  gap: 0.5rem;\n  color: #6a6a6a;\n  text-decoration: none;\n  transition: color 0.3s ease;\n}\n.breadcrumb-section .breadcrumb-nav .breadcrumb-container .breadcrumb .breadcrumb-item a[data-v-06c2befc]:hover {\n  color: #dc3545;\n}\n.breadcrumb-section .breadcrumb-nav .breadcrumb-container .breadcrumb .breadcrumb-item a:hover i[data-v-06c2befc] {\n  color: #dc3545;\n}\n.breadcrumb-section .breadcrumb-nav .breadcrumb-container .breadcrumb .breadcrumb-item a i[data-v-06c2befc] {\n  font-size: 0.9em;\n  transition: color 0.3s ease;\n}\n.breadcrumb-section .breadcrumb-nav .breadcrumb-container .breadcrumb .breadcrumb-item[data-v-06c2befc]:not(:last-child)::after {\n  content: \"›\";\n  margin-left: 0.5rem;\n  color: #6a6a6a;\n  font-size: 1.2em;\n}\n.help-section[data-v-06c2befc] {\n  display: flex;\n  align-items: center;\n}\n.help-section .help-btn[data-v-06c2befc] {\n  background: white;\n  color: #252525;\n  border: 1px solid #dcdcdc;\n  padding: 8px 15px;\n  border-radius: 5px;\n  cursor: pointer;\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  transition: all 0.3s ease;\n  font-size: 14px;\n  font-weight: 500;\n}\n.help-section .help-btn[data-v-06c2befc]:hover {\n  transform: scale(1.05);\n  background: #f8f9fa;\n  border-color: #dc3545;\n  color: #dc3545;\n}\n.help-section .help-btn i[data-v-06c2befc] {\n  font-size: 16px;\n}\n.tabs-controls-row[data-v-06c2befc] {\n  margin-bottom: 1rem;\n}\n.tabs-wrapper[data-v-06c2befc] {\n  gap: 20px;\n}\n.tabs[data-v-06c2befc] {\n  display: flex;\n  gap: 0.5rem;\n  align-items: center;\n}\n.tab[data-v-06c2befc] {\n  padding: 0.5rem 1rem;\n  border-radius: 20px;\n  font-size: 0.875rem;\n  font-weight: 500;\n  border: none;\n  cursor: pointer;\n  transition: all 0.2s;\n  background: transparent;\n  color: #6a6a6a;\n  text-decoration: none;\n}\n.tab.active[data-v-06c2befc] {\n  background: #000;\n  color: #ffffff;\n}\n.tab[data-v-06c2befc]:not(.active) {\n  background: transparent;\n  color: #252525;\n}\n.tab[data-v-06c2befc]:not(.active):hover {\n  color: #252525;\n}\n.default-toggle[data-v-06c2befc] {\n  display: flex;\n  align-items: center;\n}\n.default-toggle .toggle-label[data-v-06c2befc] {\n  display: flex;\n  align-items: center;\n  margin: 0;\n  cursor: pointer;\n}\n.default-toggle .toggle-input[data-v-06c2befc] {\n  margin-right: 0.5rem;\n}\n.default-toggle .toggle-text[data-v-06c2befc] {\n  font-size: 0.875rem;\n  color: #252525;\n}\n.default-toggle .info-icon[data-v-06c2befc] {\n  color: #6a6a6a;\n  font-size: 0.875rem;\n  cursor: help;\n}\n.tab-content[data-v-06c2befc] {\n  padding: 30px;\n  text-align: center;\n  color: #6a6a6a;\n}\n.tab-content h3[data-v-06c2befc] {\n  font-size: 1.25rem;\n  font-weight: 500;\n  margin-bottom: 10px;\n}\n.controls[data-v-06c2befc] {\n  background: #ffffff;\n  border-bottom: 1px solid #cccccc;\n  padding: 20px 30px;\n}\n.controls-row[data-v-06c2befc] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  flex-wrap: wrap;\n  gap: 10px;\n}\n.controls-left[data-v-06c2befc],\n.controls-right[data-v-06c2befc] {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n}\n.dropdown[data-v-06c2befc] {\n  position: relative;\n}\n.dropdown .form-control[data-v-06c2befc] {\n  padding: 0.5rem 0.75rem;\n  border: 1px solid #cccccc;\n  border-radius: 8px;\n  font-size: 0.875rem;\n  background: #ffffff;\n  cursor: pointer;\n  min-width: 120px;\n}\n.search-container[data-v-06c2befc] {\n  position: relative;\n}\n.search-container .search-input[data-v-06c2befc] {\n  padding: 0.5rem 0.75rem 0.5rem 2.5rem;\n  border: 1px solid #cccccc;\n  border-radius: 8px;\n  font-size: 0.875rem;\n  width: 200px;\n  outline: none;\n  color: #000;\n}\n.search-container .search-input[data-v-06c2befc]:focus {\n  border-color: #dc3545;\n}\n.search-container .search-icon[data-v-06c2befc] {\n  position: absolute;\n  left: 0.75rem;\n  top: 50%;\n  transform: translateY(-50%);\n  color: #6a6a6a;\n  font-size: 0.875rem;\n  pointer-events: none;\n}\n.search-container .clear-icon[data-v-06c2befc] {\n  position: absolute;\n  right: 0.75rem;\n  top: 50%;\n  transform: translateY(-50%);\n  color: #6a6a6a;\n  font-size: 0.875rem;\n  cursor: pointer;\n  z-index: 10;\n}\n.search-container .clear-icon[data-v-06c2befc]:hover {\n  color: #252525;\n}\n.search-container .member-dropdown[data-v-06c2befc] {\n  position: absolute;\n  top: 100%;\n  left: 0;\n  right: 0;\n  background: #ffffff;\n  border: 1px solid #cccccc;\n  border-radius: 8px;\n  box-shadow: 0 10px 15px rgba(0, 0, 0, 0.2);\n  max-height: 300px;\n  overflow-y: auto;\n  z-index: 1000;\n  margin-top: 4px;\n}\n.search-container .member-dropdown .member-dropdown-item[data-v-06c2befc] {\n  padding: 0.75rem 1rem;\n  cursor: pointer;\n  font-size: 0.875rem;\n  color: #252525;\n  transition: background-color 0.2s;\n  border-bottom: 1px solid #cccccc;\n}\n.search-container .member-dropdown .member-dropdown-item[data-v-06c2befc]:last-child {\n  border-bottom: none;\n}\n.search-container .member-dropdown .member-dropdown-item[data-v-06c2befc]:hover {\n  background-color: #f9fafb;\n}\n.search-container .member-dropdown .member-dropdown-item.no-results[data-v-06c2befc] {\n  color: #6a6a6a;\n  cursor: default;\n  font-style: italic;\n}\n.search-container .member-dropdown .member-dropdown-item.no-results[data-v-06c2befc]:hover {\n  background-color: transparent;\n}\n.calendar-header[data-v-06c2befc] {\n  background: #ffffff;\n  border-bottom: 1px solid #cccccc;\n  padding: 20px 30px;\n}\n.calendar-nav[data-v-06c2befc] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n}\n.calendar-nav-link[data-v-06c2befc] {\n  color: #007bff;\n  text-decoration: none;\n  font-size: 0.875rem;\n  cursor: pointer;\n  transition: color 0.2s;\n}\n.calendar-nav-link[data-v-06c2befc]:hover {\n  color: #0056b3;\n  text-decoration: none;\n}\n.calendar-title[data-v-06c2befc] {\n  font-size: 1.25rem;\n  font-weight: 600;\n  color: #252525;\n  margin: 0;\n  display: flex;\n  align-items: center;\n  gap: 10px;\n  align-items: center;\n  gap: 8px;\n}\n.calendar-title .member-filter-badge[data-v-06c2befc] {\n  display: inline-flex;\n  align-items: center;\n  gap: 8px;\n  padding: 8px 10px;\n  background: #dc3545;\n  color: #ffffff;\n  border-radius: 4px;\n  font-size: 0.875rem;\n  font-weight: 400;\n  margin-left: 10px;\n}\n.calendar-title .member-filter-badge i[data-v-06c2befc] {\n  font-size: 0.9em;\n}\n.calendar-title .calendar-icon[data-v-06c2befc] {\n  color: #dc3545;\n  font-size: 1rem;\n}\n.schedule-grid[data-v-06c2befc] {\n  background: #ffffff;\n  display: flex;\n  border: 1px solid #cccccc;\n  border-top: none;\n  min-height: 600px;\n  max-height: calc(100vh - 400px);\n  overflow: hidden;\n  position: relative;\n  align-items: flex-start;\n}\n.time-column[data-v-06c2befc] {\n  width: 80px;\n  border-right: 1px solid #cccccc;\n  flex-shrink: 0;\n  background: #ffffff;\n  display: flex;\n  flex-direction: column;\n  max-height: calc(100vh - 400px);\n  height: calc(100vh - 400px);\n  overflow-y: auto !important;\n  overflow-x: hidden;\n  scrollbar-width: thin;\n  position: relative;\n}\n.time-column[data-v-06c2befc]::-webkit-scrollbar {\n  width: 6px;\n}\n.time-column[data-v-06c2befc]::-webkit-scrollbar-thumb {\n  background: #ccc;\n  border-radius: 3px;\n}\n.time-column[data-v-06c2befc]::-webkit-scrollbar-track {\n  background: transparent;\n}\n.time-header[data-v-06c2befc] {\n  height: 60px;\n  min-height: 60px;\n  border-bottom: 1px solid #cccccc;\n  background: #f9fafb;\n  flex-shrink: 0;\n  position: sticky;\n  top: 0;\n  z-index: 21;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n.time-slot[data-v-06c2befc] {\n  height: 64px;\n  min-height: 64px;\n  max-height: 64px;\n  border-bottom: 1px solid #cccccc;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-size: 0.875rem;\n  color: #252525;\n  padding: 0 8px;\n  background: #ffffff;\n  flex-shrink: 0;\n  font-weight: 500;\n  box-sizing: border-box;\n}\n.schedule-content[data-v-06c2befc] {\n  flex: 1;\n  position: relative;\n  overflow-x: auto;\n  overflow-y: auto;\n  max-height: calc(100vh - 400px);\n  scrollbar-width: thin;\n}\n.schedule-content[data-v-06c2befc]::-webkit-scrollbar {\n  width: 8px;\n}\n.schedule-header[data-v-06c2befc] {\n  height: 60px;\n  border-bottom: 1px solid #cccccc;\n  background: #f9fafb;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-size: 0.875rem;\n  font-weight: 500;\n  color: #252525;\n  position: sticky;\n  top: 0;\n  z-index: 10;\n}\n.schedule-slots[data-v-06c2befc] {\n  position: relative;\n  min-height: 1536px;\n  z-index: 1;\n}\n.schedule-slot[data-v-06c2befc] {\n  height: 64px;\n  border-bottom: 1px solid #cccccc;\n}\n.schedule-slot.clickable[data-v-06c2befc] {\n  cursor: pointer;\n}\n.schedule-slot.clickable[data-v-06c2befc]:hover {\n  background: rgba(220, 53, 69, 0.05);\n}\n.event[data-v-06c2befc] {\n  position: absolute;\n  left: 4px;\n  right: 4px;\n  background: #31bff5;\n  color: #ffffff;\n  padding: 0.5rem;\n  border-radius: 4px;\n  cursor: pointer;\n  transition: all 0.2s;\n  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);\n  z-index: 100;\n  pointer-events: auto;\n}\n.event-title[data-v-06c2befc] {\n  color: #ffffff;\n  font-size: 0.875rem;\n  font-weight: 600;\n  margin-bottom: 0.25rem;\n}\n.event-subtitle[data-v-06c2befc],\n.event-capacity[data-v-06c2befc],\n.event-time[data-v-06c2befc] {\n  color: rgba(255, 255, 255, 0.9);\n  font-size: 0.75rem;\n  margin-top: 0.25rem;\n}\n.event-location[data-v-06c2befc] {\n  color: rgba(255, 255, 255, 0.9);\n  font-size: 0.75rem;\n  margin-top: 0.25rem;\n}\n.no-events-message[data-v-06c2befc],\n.no-events-message-multi-day[data-v-06c2befc],\n.no-events-message-weekly[data-v-06c2befc] {\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  transform: translate(-50%, -50%);\n  text-align: center;\n  padding: 30px;\n  background: rgba(255, 255, 255, 0.95);\n  border: 1px solid #cccccc;\n  border-radius: 8px;\n  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);\n  z-index: 50;\n  min-width: 300px;\n}\n.no-events-message p[data-v-06c2befc],\n.no-events-message-multi-day p[data-v-06c2befc],\n.no-events-message-weekly p[data-v-06c2befc] {\n  margin: 0;\n  font-size: 1rem;\n  color: #252525;\n}\n.no-events-message p strong[data-v-06c2befc],\n.no-events-message-multi-day p strong[data-v-06c2befc],\n.no-events-message-weekly p strong[data-v-06c2befc] {\n  color: #252525;\n  font-weight: 600;\n}\n.no-events-message-multi-day[data-v-06c2befc] {\n  position: relative;\n  grid-column: 1/-1;\n  transform: none;\n  margin: 30px auto;\n  width: -moz-fit-content;\n  width: fit-content;\n}\n.no-events-message-weekly[data-v-06c2befc] {\n  position: relative;\n  grid-column: 1/-1;\n  transform: none;\n  margin: 30px auto;\n  width: -moz-fit-content;\n  width: fit-content;\n}\n.weekly-grid .weekly-content[data-v-06c2befc] {\n  flex: 1;\n  display: flex;\n  flex-direction: column;\n  overflow-x: auto;\n  overflow-y: auto;\n  max-height: calc(100vh - 400px);\n}\n.weekly-grid .weekly-header[data-v-06c2befc] {\n  display: grid;\n  grid-template-columns: repeat(7, 1fr);\n  border-bottom: 1px solid #cccccc;\n  background: #f9fafb;\n  position: sticky;\n  top: 0;\n  z-index: 10;\n}\n.weekly-grid .day-header[data-v-06c2befc] {\n  padding: 10px 8px;\n  text-align: center;\n  border-right: 1px solid #cccccc;\n}\n.weekly-grid .day-header[data-v-06c2befc]:last-child {\n  border-right: none;\n}\n.weekly-grid .day-name[data-v-06c2befc] {\n  font-size: 0.75rem;\n  font-weight: 500;\n  color: #6a6a6a;\n  margin-bottom: 0.25rem;\n}\n.weekly-grid .day-date[data-v-06c2befc] {\n  font-size: 0.875rem;\n  font-weight: 600;\n  color: #252525;\n}\n.weekly-grid .weekly-slots[data-v-06c2befc] {\n  display: flex;\n  flex-direction: column;\n  min-height: 1536px;\n}\n.weekly-grid .weekly-row[data-v-06c2befc] {\n  display: grid;\n  grid-template-columns: repeat(7, 1fr);\n  border-bottom: 1px solid #cccccc;\n  min-height: 64px;\n}\n.weekly-grid .weekly-cell[data-v-06c2befc] {\n  position: relative;\n  border-right: 1px solid #cccccc;\n  min-height: 64px;\n  padding: 2px;\n}\n.weekly-grid .weekly-cell[data-v-06c2befc]:last-child {\n  border-right: none;\n}\n.weekly-grid .weekly-cell.clickable[data-v-06c2befc] {\n  cursor: pointer;\n}\n.weekly-grid .weekly-cell.clickable[data-v-06c2befc]:hover {\n  background: rgba(220, 53, 69, 0.05);\n}\n.weekly-grid .weekly-event[data-v-06c2befc] {\n  position: relative;\n  background: #31bff5;\n  color: #ffffff;\n  padding: 0.5rem;\n  border-radius: 4px;\n  margin-bottom: 2px;\n  cursor: pointer;\n  transition: all 0.2s;\n  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);\n  z-index: 100;\n  pointer-events: auto;\n}\n.weekly-grid .weekly-event[data-v-06c2befc]:hover {\n  background: #e52e2e;\n  transform: translateY(-1px);\n  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);\n}\n.weekly-grid .event-time[data-v-06c2befc] {\n  color: rgba(255, 255, 255, 0.9);\n  font-size: 0.75rem;\n  margin-top: 0.25rem;\n}\n.weekly-grid .event-instructor[data-v-06c2befc] {\n  color: rgba(255, 255, 255, 0.9);\n  font-size: 0.75rem;\n  margin-top: 0.25rem;\n}\n.weekly-grid .event-location[data-v-06c2befc] {\n  color: rgba(255, 255, 255, 0.9);\n  font-size: 0.75rem;\n  margin-top: 0.25rem;\n}\n.multi-day-grid .multi-day-content[data-v-06c2befc] {\n  flex: 1;\n  display: flex;\n  flex-direction: column;\n  overflow-x: auto;\n  overflow-y: auto;\n  max-height: calc(100vh - 400px);\n}\n.multi-day-grid .multi-day-header[data-v-06c2befc] {\n  display: grid;\n  grid-template-columns: repeat(var(--days-count, 7), 1fr);\n  border-bottom: 1px solid #cccccc;\n  background: #f9fafb;\n  position: sticky;\n  top: 0;\n  z-index: 10;\n}\n.multi-day-grid .multi-day-header .day-header[data-v-06c2befc] {\n  padding: 10px 8px;\n  text-align: center;\n  border-right: 1px solid #cccccc;\n}\n.multi-day-grid .multi-day-header .day-header[data-v-06c2befc]:last-child {\n  border-right: none;\n}\n.multi-day-grid .multi-day-header .day-name[data-v-06c2befc] {\n  font-size: 0.75rem;\n  font-weight: 500;\n  color: #6a6a6a;\n  margin-bottom: 0.25rem;\n}\n.multi-day-grid .multi-day-header .day-date[data-v-06c2befc] {\n  font-size: 0.875rem;\n  font-weight: 600;\n  color: #252525;\n}\n.multi-day-grid .multi-day-slots[data-v-06c2befc] {\n  display: flex;\n  flex-direction: column;\n  min-height: 1536px;\n}\n.multi-day-grid .multi-day-row[data-v-06c2befc] {\n  display: grid;\n  grid-template-columns: repeat(var(--days-count, 7), 1fr);\n  border-bottom: 1px solid #cccccc;\n  min-height: 64px;\n}\n.multi-day-grid .multi-day-cell[data-v-06c2befc] {\n  position: relative;\n  border-right: 1px solid #cccccc;\n  min-height: 64px;\n  padding: 2px;\n}\n.multi-day-grid .multi-day-cell[data-v-06c2befc]:last-child {\n  border-right: none;\n}\n.multi-day-grid .multi-day-cell.clickable[data-v-06c2befc] {\n  cursor: pointer;\n}\n.multi-day-grid .multi-day-cell.clickable[data-v-06c2befc]:hover {\n  background: rgba(220, 53, 69, 0.05);\n}\n.multi-day-grid .multi-day-event[data-v-06c2befc] {\n  position: relative;\n  background: #dc3545;\n  color: #ffffff;\n  padding: 0.5rem;\n  border-radius: 4px;\n  margin-bottom: 2px;\n  cursor: pointer;\n  transition: all 0.2s;\n  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);\n  z-index: 100;\n  pointer-events: auto;\n}\n.multi-day-grid .multi-day-event[data-v-06c2befc]:hover {\n  background: #e52e2e;\n  transform: translateY(-1px);\n  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);\n}\n.coach-content[data-v-06c2befc] {\n  flex: 1;\n  display: flex;\n  flex-direction: column;\n  overflow-x: auto;\n  overflow-y: auto;\n  max-height: calc(100vh - 400px);\n}\n.coach-header[data-v-06c2befc] {\n  display: grid;\n  grid-template-columns: repeat(var(--coaches-count, 5), 1fr);\n  border-bottom: 1px solid #cccccc;\n  background: #f9fafb;\n  position: sticky;\n  top: 0;\n  z-index: 10;\n}\n.coach-header .coach-header-item[data-v-06c2befc] {\n  padding: 10px 8px;\n  text-align: center;\n  border-right: 1px solid #cccccc;\n  font-size: 0.875rem;\n  font-weight: 600;\n  color: #252525;\n}\n.coach-header .coach-header-item[data-v-06c2befc]:last-child {\n  border-right: none;\n}\n.coach-slots[data-v-06c2befc] {\n  display: flex;\n  flex-direction: column;\n  min-height: 1536px;\n}\n.coach-row[data-v-06c2befc] {\n  display: grid;\n  grid-template-columns: repeat(var(--coaches-count, 5), 1fr);\n  border-bottom: 1px solid #cccccc;\n  min-height: 64px;\n}\n.coach-cell[data-v-06c2befc] {\n  position: relative;\n  border-right: 1px solid #cccccc;\n  min-height: 64px;\n  padding: 2px;\n}\n.coach-cell[data-v-06c2befc]:last-child {\n  border-right: none;\n}\n.coach-cell.clickable[data-v-06c2befc] {\n  cursor: pointer;\n}\n.coach-cell.clickable[data-v-06c2befc]:hover {\n  background: rgba(220, 53, 69, 0.05);\n}\n.coach-event[data-v-06c2befc] {\n  position: relative;\n  background: #31bff5;\n  color: #ffffff;\n  padding: 0.5rem;\n  border-radius: 4px;\n  margin-bottom: 2px;\n  cursor: pointer;\n  transition: all 0.2s;\n  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);\n  z-index: 100;\n  pointer-events: auto;\n}\n.coach-event[data-v-06c2befc]:hover {\n  background: rgb(11.25, 171, 231.75);\n  transform: translateY(-1px);\n  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);\n}\n.event-member-name[data-v-06c2befc] {\n  font-size: 0.75rem;\n  color: rgba(255, 255, 255, 0.9);\n  margin-top: 0.125rem;\n}\n.no-events-message-coach[data-v-06c2befc] {\n  position: relative;\n  grid-column: 1/-1;\n  transform: none;\n  margin: 30px auto;\n  width: -moz-fit-content;\n  width: fit-content;\n  text-align: center;\n  padding: 30px;\n  background: rgba(255, 255, 255, 0.95);\n  border: 1px solid #cccccc;\n  border-radius: 8px;\n  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);\n  z-index: 50;\n}\n.no-events-message-coach p[data-v-06c2befc] {\n  margin: 0;\n  font-size: 1rem;\n  color: #252525;\n}\n.no-events-message-coach p strong[data-v-06c2befc] {\n  color: #252525;\n  font-weight: 600;\n}\n.modal-backdrop.event-details-modal[data-v-06c2befc] {\n  position: fixed;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  background-color: rgba(0, 0, 0, 0.5);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  z-index: 1050;\n  opacity: 1 !important;\n  padding: 20px;\n  overflow-y: auto;\n}\n.modal-backdrop[data-v-06c2befc] {\n  position: fixed;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  background-color: rgba(0, 0, 0, 0.5);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  z-index: 1050;\n  opacity: 1 !important;\n}\n.modal-box[data-v-06c2befc] {\n  background-color: #ffffff;\n  padding: 2rem;\n  border-radius: 10px;\n  width: 100%;\n  max-width: 500px;\n  box-shadow: 0 10px 15px rgba(0, 0, 0, 0.2);\n  transition: transform 0.3s ease, box-shadow 0.3s ease;\n  opacity: 1 !important;\n  position: relative;\n  z-index: 1051;\n}\n.event-details-modal .modal-box[data-v-06c2befc] {\n  max-width: 500px;\n  background-color: #ffffff;\n  padding: 30px;\n}\n.event-details-box[data-v-06c2befc] {\n  max-width: 600px !important;\n  width: auto;\n  padding: 0 !important;\n  display: flex;\n  flex-direction: column;\n  max-height: 85vh;\n  overflow: hidden;\n}\n.event-modal-header[data-v-06c2befc] {\n  padding: 20px 30px;\n  border-bottom: 1px solid #e5e7eb;\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  background: #ffffff;\n  flex-shrink: 0;\n}\n.event-modal-title[data-v-06c2befc] {\n  font-size: 1.25rem;\n  font-weight: 600;\n  color: #252525;\n  margin: 0;\n  line-height: 1.4;\n}\n.event-modal-close[data-v-06c2befc] {\n  background: none;\n  border: none;\n  font-size: 1.5rem;\n  color: #6b7280;\n  cursor: pointer;\n  padding: 0;\n  width: 28px;\n  height: 28px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  transition: all 0.2s;\n  border-radius: 4px;\n}\n.event-modal-close[data-v-06c2befc]:hover {\n  color: #252525;\n  background: #f3f4f6;\n}\n.event-modal-content-wrapper[data-v-06c2befc] {\n  padding: 30px;\n  overflow-y: auto;\n  flex: 1;\n}\n.event-details-grid[data-v-06c2befc] {\n  display: flex;\n  flex-direction: column;\n  gap: 10px;\n}\n.event-detail-row[data-v-06c2befc] {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 20px;\n}\n.event-detail-col[data-v-06c2befc] {\n  display: flex;\n  align-items: flex-start;\n  gap: 10px;\n  padding: 10px;\n  border-radius: 6px;\n  transition: background 0.15s;\n}\n.event-detail-col[data-v-06c2befc]:hover {\n  background: #f9fafb;\n}\n.event-detail-icon[data-v-06c2befc] {\n  font-size: 1rem;\n  color: #6b7280;\n  width: 18px;\n  flex-shrink: 0;\n  margin-top: 2px;\n  text-align: center;\n}\n.event-detail-info[data-v-06c2befc] {\n  display: flex;\n  flex-direction: column;\n  gap: 2px;\n  flex: 1;\n  min-width: 0;\n}\n.event-detail-label[data-v-06c2befc] {\n  font-size: 11px;\n  color: #9ca3af;\n  font-weight: 500;\n  text-transform: uppercase;\n  letter-spacing: 0.3px;\n  line-height: 1.2;\n}\n.event-detail-value[data-v-06c2befc] {\n  font-size: 0.875rem;\n  color: #252525;\n  font-weight: 400;\n  line-height: 1.4;\n  word-break: break-word;\n}\n.event-detail-value.coach-name[data-v-06c2befc] {\n  color: #dc3545;\n  font-weight: 500;\n}\n.event-modal-actions[data-v-06c2befc] {\n  padding: 20px 30px;\n  border-top: 1px solid #e5e7eb;\n  display: flex;\n  justify-content: flex-end;\n  gap: 10px;\n  background: #f9fafb;\n  flex-shrink: 0;\n}\n.event-modal-actions .btn[data-v-06c2befc] {\n  display: inline-flex;\n  align-items: center;\n  gap: 6px;\n  padding: 6px 12px;\n  font-size: 0.875rem;\n  font-weight: 500;\n  border-radius: 4px;\n  border: 1px solid transparent;\n  cursor: pointer;\n  transition: all 0.15s;\n}\n.event-modal-actions .btn i[data-v-06c2befc] {\n  font-size: 12px;\n}\n.event-modal-actions .btn.btn-primary[data-v-06c2befc] {\n  background: #dc3545;\n  color: #ffffff;\n  border-color: #dc3545;\n}\n.event-modal-actions .btn.btn-primary[data-v-06c2befc]:hover {\n  background: rgb(210.9493670886, 36.5506329114, 53.2594936709);\n  border-color: rgb(210.9493670886, 36.5506329114, 53.2594936709);\n}\n.event-modal-actions .btn.btn-danger[data-v-06c2befc] {\n  background: #ef4444;\n  color: #ffffff;\n  border-color: #ef4444;\n}\n.event-modal-actions .btn.btn-danger[data-v-06c2befc]:hover {\n  background: #dc2626;\n  border-color: #dc2626;\n}\n.event-member-assignment[data-v-06c2befc] {\n  margin-top: 30px;\n  padding-top: 30px;\n  border-top: 1px solid #e5e7eb;\n}\n.assignment-header[data-v-06c2befc] {\n  margin-bottom: 20px;\n}\n.assignment-title[data-v-06c2befc] {\n  font-size: 1rem;\n  font-weight: 600;\n  color: #252525;\n  margin: 0;\n  display: flex;\n  align-items: center;\n  gap: 10px;\n}\n.assignment-title i[data-v-06c2befc] {\n  color: #dc3545;\n  font-size: 0.875rem;\n}\n.assignment-content .form-group[data-v-06c2befc] {\n  margin-bottom: 20px;\n}\n.assignment-content .form-label[data-v-06c2befc] {\n  font-size: 0.875rem;\n  font-weight: 500;\n  color: #252525;\n  margin-bottom: 8px;\n  display: block;\n}\n.assignment-content .form-control-sm[data-v-06c2befc] {\n  font-size: 0.875rem;\n  padding: 8px 10px;\n}\n.assignment-content .selected-members .badge[data-v-06c2befc] {\n  font-size: 11px;\n  padding: 2px 6px;\n  margin-right: 4px;\n}\n.assignment-content .form-text[data-v-06c2befc] {\n  font-size: 11px;\n  color: #6b7280;\n  margin-top: 4px;\n}\n.input-with-icon[data-v-06c2befc] {\n  position: relative;\n}\n.input-with-icon .input-icon[data-v-06c2befc] {\n  position: absolute;\n  right: 10px;\n  top: 50%;\n  transform: translateY(-50%);\n  color: #9ca3af;\n  font-size: 0.875rem;\n  pointer-events: none;\n}\n.input-with-icon select[data-v-06c2befc] {\n  padding-right: 35px;\n}\n.modal-header[data-v-06c2befc] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  padding: 30px 30px 20px 30px;\n  border-bottom: 1px solid #cccccc;\n  flex-shrink: 0;\n  background: #ffffff !important;\n  border-radius: 16px 16px 0 0;\n  position: relative;\n  z-index: 2;\n}\n.modal-title[data-v-06c2befc] {\n  font-size: 1.5rem;\n  font-weight: 700;\n  color: #252525;\n  margin: 0;\n}\n.modal-close[data-v-06c2befc] {\n  background: none;\n  border: none;\n  font-size: 2rem;\n  color: #6a6a6a;\n  cursor: pointer;\n  line-height: 1;\n  padding: 0;\n  width: 30px;\n  height: 30px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n.modal-close[data-v-06c2befc]:hover {\n  color: #252525;\n}\n.modal-body[data-v-06c2befc] {\n  margin-bottom: 20px;\n}\n.modal-body p[data-v-06c2befc] {\n  margin-bottom: 10px;\n  font-size: 0.875rem;\n  color: #252525;\n}\n.modal-body p strong[data-v-06c2befc] {\n  font-weight: 600;\n  color: #252525;\n}\n.modal-footer[data-v-06c2befc] {\n  display: flex;\n  justify-content: flex-end;\n  gap: 10px;\n  padding-top: 10px;\n  border-top: 1px solid #cccccc;\n}\n.modal-box[data-v-06c2befc] {\n  background-color: #ffffff;\n  padding: 2rem;\n  border-radius: 10px;\n  width: 100%;\n  max-width: 700px;\n  box-shadow: 0 10px 15px rgba(0, 0, 0, 0.2);\n  transition: transform 0.3s ease, box-shadow 0.3s ease;\n  opacity: 1 !important;\n  display: flex;\n  flex-direction: column;\n  max-height: 90vh;\n  overflow-y: auto;\n}\n.modal-box.comprehensive-modal[data-v-06c2befc] {\n  max-width: 800px;\n}\n.modal-content-wrapper[data-v-06c2befc] {\n  padding: 30px;\n  overflow-y: auto;\n  flex: 1;\n  min-height: 0;\n  background: #ffffff !important;\n  position: relative;\n  z-index: 1;\n}\n.modal-box h3[data-v-06c2befc],\n.modal-title[data-v-06c2befc] {\n  font-size: 1.5rem;\n  margin-bottom: 0;\n  color: #000000 !important;\n  font-weight: 700;\n}\n.form-group[data-v-06c2befc] {\n  margin-bottom: 20px;\n}\n.form-group label[data-v-06c2befc] {\n  display: block;\n  font-size: 0.875rem;\n  font-weight: 500;\n  color: #333333 !important;\n  margin-bottom: 8px;\n}\n.form-group .form-control[data-v-06c2befc] {\n  width: 100%;\n  padding: 5px;\n  border: 1px solid #ddd !important;\n  border-radius: 8px;\n  font-size: 0.875rem;\n  transition: border-color 0.3s ease;\n  background: #ffffff !important;\n  color: #333333 !important;\n}\n.form-group .form-control[data-v-06c2befc]:focus {\n  outline: none;\n  border-color: #dc3545 !important;\n  box-shadow: 0 0 0 3px rgba(220, 53, 69, 0.1);\n  background: #ffffff !important;\n}\n.form-group .form-control[data-v-06c2befc]:disabled {\n  background: #f5f5f5 !important;\n  color: #666666 !important;\n}\n.form-group textarea.form-control[data-v-06c2befc] {\n  resize: vertical;\n  background: #ffffff !important;\n  color: #333333 !important;\n}\n.modal-actions[data-v-06c2befc] {\n  display: flex;\n  justify-content: flex-end;\n  gap: 10px;\n  margin-top: 30px;\n  padding-top: 20px;\n  border-top: 1px solid #cccccc;\n  flex-shrink: 0;\n}\n.modal-actions .btn[data-v-06c2befc] {\n  min-width: 100px;\n  padding: 10px 20px;\n  border-radius: 8px;\n  font-size: 0.875rem;\n  font-weight: 500;\n  cursor: pointer;\n  transition: all 0.3s ease;\n  border: none;\n}\n.modal-actions .btn.btn-primary[data-v-06c2befc] {\n  background: #dc3545;\n  color: #ffffff;\n}\n.modal-actions .btn.btn-primary[data-v-06c2befc]:hover:not(:disabled) {\n  background: #e52e2e;\n}\n.modal-actions .btn.btn-secondary[data-v-06c2befc] {\n  background: #ffffff;\n  color: #252525;\n  border: 1px solid #cccccc;\n}\n.modal-actions .btn.btn-secondary[data-v-06c2befc]:hover:not(:disabled) {\n  background: #f9fafb;\n}\n.modal-actions .btn[data-v-06c2befc]:disabled {\n  opacity: 0.6;\n  cursor: not-allowed;\n}\n.comprehensive-form[data-v-06c2befc] {\n  background: #ffffff !important;\n}\n.comprehensive-form .form-group[data-v-06c2befc] {\n  margin-bottom: 20px;\n}\n.comprehensive-form label[data-v-06c2befc] {\n  display: block;\n  font-size: 0.875rem;\n  font-weight: 500;\n  color: #333333 !important;\n  margin-bottom: 8px;\n}\n.time-input-group[data-v-06c2befc] {\n  display: flex;\n  gap: 8px;\n  align-items: center;\n}\n.time-input-group .time-select[data-v-06c2befc] {\n  flex: 1;\n  min-width: 80px;\n}\n.input-with-icon[data-v-06c2befc] {\n  position: relative;\n}\n.input-with-icon .input-icon[data-v-06c2befc] {\n  position: absolute;\n  right: 12px;\n  top: 50%;\n  transform: translateY(-50%);\n  color: #6a6a6a;\n  font-size: 0.875rem;\n  pointer-events: none;\n}\n.input-group-combined[data-v-06c2befc] {\n  display: flex;\n  gap: 8px;\n}\n.input-group-combined input[data-v-06c2befc] {\n  flex: 1;\n  min-width: 80px;\n}\n.input-group-combined select[data-v-06c2befc] {\n  flex: 1;\n  min-width: 120px;\n}\n.input-with-actions[data-v-06c2befc] {\n  position: relative;\n  display: flex;\n  align-items: center;\n  gap: 8px;\n}\n.input-with-actions .form-control[data-v-06c2befc] {\n  flex: 1;\n}\n.input-with-actions .action-icon[data-v-06c2befc],\n.input-with-actions .info-icon[data-v-06c2befc] {\n  color: #6a6a6a;\n  font-size: 0.875rem;\n  cursor: pointer;\n}\n.input-with-actions .action-icon[data-v-06c2befc]:hover,\n.input-with-actions .info-icon[data-v-06c2befc]:hover {\n  color: #dc3545;\n}\n.input-with-info[data-v-06c2befc] {\n  position: relative;\n  display: flex;\n  align-items: center;\n  gap: 8px;\n}\n.input-with-info .form-control[data-v-06c2befc] {\n  flex: 1;\n}\n.input-with-info .info-icon[data-v-06c2befc] {\n  color: #6a6a6a;\n  font-size: 0.875rem;\n  cursor: help;\n  flex-shrink: 0;\n}\n.toggle-label-inline[data-v-06c2befc] {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n  cursor: pointer;\n}\n.toggle-label-inline span[data-v-06c2befc] {\n  flex: 1;\n}\n.toggle-label-inline .info-icon[data-v-06c2befc] {\n  color: #6a6a6a;\n  font-size: 0.875rem;\n  cursor: help;\n}\n.switch[data-v-06c2befc] {\n  position: relative;\n  display: inline-block;\n  width: 50px;\n  height: 24px;\n}\n.switch input[data-v-06c2befc] {\n  opacity: 0;\n  width: 0;\n  height: 0;\n}\n.switch .slider[data-v-06c2befc] {\n  position: absolute;\n  cursor: pointer;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  background-color: #ccc;\n  transition: 0.4s;\n  border-radius: 24px;\n}\n.switch .slider[data-v-06c2befc]:before {\n  position: absolute;\n  content: \"\";\n  height: 18px;\n  width: 18px;\n  left: 3px;\n  bottom: 3px;\n  background-color: white;\n  transition: 0.4s;\n  border-radius: 50%;\n}\n.switch input:checked + .slider[data-v-06c2befc] {\n  background-color: #dc3545;\n}\n.switch input:checked + .slider[data-v-06c2befc]:before {\n  transform: translateX(26px);\n}\n.checkbox-label[data-v-06c2befc] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  cursor: pointer;\n}\n.checkbox-label .checkbox-input[data-v-06c2befc] {\n  width: 18px;\n  height: 18px;\n  cursor: pointer;\n}\n.checkbox-label span[data-v-06c2befc] {\n  font-size: 0.875rem;\n  color: #252525;\n}\n@keyframes fadeIn-data-v-06c2befc {\nfrom {\n    opacity: 0;\n}\nto {\n    opacity: 1;\n}\n}\n@keyframes slideUp-data-v-06c2befc {\nfrom {\n    opacity: 0;\n    transform: translateY(20px);\n}\nto {\n    opacity: 1;\n    transform: translateY(0);\n}\n}\n@keyframes fadeInScale-data-v-06c2befc {\nfrom {\n    opacity: 0;\n    transform: scale(0.95);\n}\nto {\n    opacity: 1;\n    transform: scale(1);\n}\n}\n@media (max-width: 768px) {\n.breadcrumb-nav-row[data-v-06c2befc] {\n    flex-direction: column;\n    align-items: flex-start;\n    gap: 1rem;\n}\n.breadcrumb-section[data-v-06c2befc] {\n    width: 100%;\n}\n.breadcrumb-section .breadcrumb-container[data-v-06c2befc] {\n    flex-direction: column;\n    align-items: flex-start;\n    gap: 0.5rem;\n}\n.breadcrumb-section .breadcrumb-container .breadcrumb[data-v-06c2befc] {\n    flex-wrap: wrap;\n}\n.breadcrumb-section .breadcrumb-container .breadcrumb .breadcrumb-item[data-v-06c2befc] {\n    font-size: 0.8rem;\n}\n.breadcrumb-section .breadcrumb-container .breadcrumb .breadcrumb-item a[data-v-06c2befc] {\n    font-size: 0.8rem;\n}\n.help-section[data-v-06c2befc] {\n    width: 100%;\n    justify-content: flex-end;\n}\n.help-section .help-btn[data-v-06c2befc] {\n    font-size: 0.8rem;\n    padding: 0.4rem 0.8rem;\n}\n.tabs-wrapper[data-v-06c2befc] {\n    width: 100%;\n    flex-direction: column;\n    align-items: flex-start;\n}\n.controls-row[data-v-06c2befc] {\n    flex-direction: column;\n    align-items: stretch;\n}\n.controls-left[data-v-06c2befc],\n  .controls-right[data-v-06c2befc] {\n    width: 100%;\n    flex-wrap: wrap;\n}\n.search-container .search-input[data-v-06c2befc] {\n    width: 100%;\n}\n}\n.comprehensive-form[data-v-06c2befc] {\n  background: #ffffff !important;\n}\n.comprehensive-form .form-group[data-v-06c2befc] {\n  margin-bottom: 20px;\n}\n.comprehensive-form label[data-v-06c2befc] {\n  display: block;\n  font-size: 0.875rem;\n  font-weight: 500;\n  color: #333333 !important;\n  margin-bottom: 8px;\n}\n.time-input-group[data-v-06c2befc] {\n  display: flex;\n  gap: 8px;\n  align-items: center;\n}\n.time-input-group .time-select[data-v-06c2befc] {\n  flex: 1;\n  min-width: 80px;\n}\n.input-with-icon[data-v-06c2befc] {\n  position: relative;\n}\n.input-with-icon .input-icon[data-v-06c2befc] {\n  position: absolute;\n  right: 12px;\n  top: 50%;\n  transform: translateY(-50%);\n  color: #6a6a6a;\n  font-size: 0.875rem;\n  pointer-events: none;\n}\n.input-with-icon .form-control[data-v-06c2befc] {\n  padding-right: 40px;\n}\n.input-group-combined[data-v-06c2befc] {\n  display: flex;\n  gap: 8px;\n}\n.input-group-combined input[data-v-06c2befc] {\n  flex: 1;\n  min-width: 80px;\n}\n.input-group-combined select[data-v-06c2befc] {\n  flex: 1;\n  min-width: 120px;\n}\n.input-with-actions[data-v-06c2befc] {\n  position: relative;\n  display: flex;\n  align-items: center;\n  gap: 8px;\n}\n.input-with-actions .form-control[data-v-06c2befc] {\n  flex: 1;\n}\n.input-with-actions .action-icon[data-v-06c2befc],\n.input-with-actions .info-icon[data-v-06c2befc] {\n  color: #6a6a6a;\n  font-size: 0.875rem;\n  cursor: pointer;\n  flex-shrink: 0;\n}\n.input-with-actions .action-icon[data-v-06c2befc]:hover,\n.input-with-actions .info-icon[data-v-06c2befc]:hover {\n  color: #dc3545;\n}\n.input-with-info[data-v-06c2befc] {\n  position: relative;\n  display: flex;\n  align-items: center;\n  gap: 8px;\n}\n.input-with-info .form-control[data-v-06c2befc] {\n  flex: 1;\n}\n.input-with-info .info-icon[data-v-06c2befc] {\n  color: #6a6a6a;\n  font-size: 0.875rem;\n  cursor: help;\n  flex-shrink: 0;\n}\n.toggle-label-inline[data-v-06c2befc] {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n  cursor: pointer;\n  margin-bottom: 0;\n}\n.toggle-label-inline span[data-v-06c2befc] {\n  flex: 1;\n}\n.toggle-label-inline .info-icon[data-v-06c2befc] {\n  color: #6a6a6a;\n  font-size: 0.875rem;\n  cursor: help;\n  flex-shrink: 0;\n}\n.switch[data-v-06c2befc] {\n  position: relative;\n  display: inline-block;\n  width: 50px;\n  height: 24px;\n  flex-shrink: 0;\n}\n.switch input[data-v-06c2befc] {\n  opacity: 0;\n  width: 0;\n  height: 0;\n}\n.switch .slider[data-v-06c2befc] {\n  position: absolute;\n  cursor: pointer;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  background-color: #ccc;\n  transition: 0.4s;\n  border-radius: 24px;\n}\n.switch .slider[data-v-06c2befc]:before {\n  position: absolute;\n  content: \"\";\n  height: 18px;\n  width: 18px;\n  left: 3px;\n  bottom: 3px;\n  background-color: white;\n  transition: 0.4s;\n  border-radius: 50%;\n}\n.switch input:checked + .slider[data-v-06c2befc] {\n  background-color: #dc3545;\n}\n.switch input:checked + .slider[data-v-06c2befc]:before {\n  transform: translateX(26px);\n}\n.checkbox-label[data-v-06c2befc] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  cursor: pointer;\n  margin-bottom: 0;\n}\n.checkbox-label .checkbox-input[data-v-06c2befc] {\n  width: 18px;\n  height: 18px;\n  cursor: pointer;\n  flex-shrink: 0;\n}\n.checkbox-label span[data-v-06c2befc] {\n  font-size: 0.875rem;\n  color: #252525;\n}\n\n/* Video Tutorial Modal Styles */\n.video-tutorial-modal .modal-content[data-v-06c2befc] {\n  border: none;\n  border-radius: 16px;\n  box-shadow: 0 10px 15px rgba(0, 0, 0, 0.2);\n}\n.video-tutorial-modal .modal-header[data-v-06c2befc] {\n  background: #f5f5f3;\n  color: #252525;\n  border-bottom: none;\n  padding: 1.5rem 2rem;\n}\n.video-tutorial-modal .modal-header .modal-title[data-v-06c2befc] {\n  font-family: \"Inter\", Arial, sans-serif;\n  font-size: 1.5rem;\n  font-weight: 600;\n  margin: 0;\n}\n.video-tutorial-modal .modal-body[data-v-06c2befc] {\n  padding: 2rem;\n  background: #f5f5f3;\n  color: #252525;\n}\n.video-tutorial-modal .video-container[data-v-06c2befc] {\n  position: relative;\n}\n.video-tutorial-modal .video-container .video-loading-overlay[data-v-06c2befc] {\n  position: absolute;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  background: rgba(245, 245, 243, 0.9);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  z-index: 10;\n  border-radius: 8px;\n}\n.video-tutorial-modal .video-container video[data-v-06c2befc] {\n  border-radius: 8px;\n  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);\n  background: #000;\n  display: block;\n}", ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js??clonedRuleSet-12.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12.use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-12.use[3]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/Schedule/Schedule.vue?vue&type=style&index=1&id=06c2befc&lang=scss":
/*!********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??clonedRuleSet-12.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12.use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-12.use[3]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/Schedule/Schedule.vue?vue&type=style&index=1&id=06c2befc&lang=scss ***!
  \********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
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
___CSS_LOADER_EXPORT___.push([module.id, "/* Ensure the Schedule Activity modal always appears above custom in-component modals */\n#schedule-activity-modal {\n  z-index: 20050 !important;\n}\n\n/* BootstrapVue backdrop id convention: {id}___BV_modal_backdrop_ */\n#schedule-activity-modal___BV_modal_backdrop_ {\n  z-index: 20040 !important;\n}\n\n/* Ensure Bootstrap Vue toasts appear above modals */\n:deep(.b-toast) {\n  z-index: 1100 !important;\n}\n:deep(.b-toast-slot) {\n  z-index: 1100 !important;\n}", ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-12.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12.use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-12.use[3]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/Schedule/Schedule.vue?vue&type=style&index=0&id=06c2befc&lang=scss&scoped=true":
/*!************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-12.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12.use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-12.use[3]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/Schedule/Schedule.vue?vue&type=style&index=0&id=06c2befc&lang=scss&scoped=true ***!
  \************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../../../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_clonedRuleSet_12_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_12_use_2_node_modules_sass_loader_dist_cjs_js_clonedRuleSet_12_use_3_node_modules_vue_loader_lib_index_js_vue_loader_options_Schedule_vue_vue_type_style_index_0_id_06c2befc_lang_scss_scoped_true__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !!../../../../../../node_modules/css-loader/dist/cjs.js??clonedRuleSet-12.use[1]!../../../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12.use[2]!../../../../../../node_modules/sass-loader/dist/cjs.js??clonedRuleSet-12.use[3]!../../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Schedule.vue?vue&type=style&index=0&id=06c2befc&lang=scss&scoped=true */ "./node_modules/css-loader/dist/cjs.js??clonedRuleSet-12.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12.use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-12.use[3]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/Schedule/Schedule.vue?vue&type=style&index=0&id=06c2befc&lang=scss&scoped=true");

            

var options = {};

options.insert = "head";
options.singleton = false;

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_clonedRuleSet_12_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_12_use_2_node_modules_sass_loader_dist_cjs_js_clonedRuleSet_12_use_3_node_modules_vue_loader_lib_index_js_vue_loader_options_Schedule_vue_vue_type_style_index_0_id_06c2befc_lang_scss_scoped_true__WEBPACK_IMPORTED_MODULE_1__["default"], options);



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_clonedRuleSet_12_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_12_use_2_node_modules_sass_loader_dist_cjs_js_clonedRuleSet_12_use_3_node_modules_vue_loader_lib_index_js_vue_loader_options_Schedule_vue_vue_type_style_index_0_id_06c2befc_lang_scss_scoped_true__WEBPACK_IMPORTED_MODULE_1__["default"].locals || {});

/***/ }),

/***/ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-12.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12.use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-12.use[3]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/Schedule/Schedule.vue?vue&type=style&index=1&id=06c2befc&lang=scss":
/*!************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-12.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12.use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-12.use[3]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/Schedule/Schedule.vue?vue&type=style&index=1&id=06c2befc&lang=scss ***!
  \************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../../../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_clonedRuleSet_12_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_12_use_2_node_modules_sass_loader_dist_cjs_js_clonedRuleSet_12_use_3_node_modules_vue_loader_lib_index_js_vue_loader_options_Schedule_vue_vue_type_style_index_1_id_06c2befc_lang_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !!../../../../../../node_modules/css-loader/dist/cjs.js??clonedRuleSet-12.use[1]!../../../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12.use[2]!../../../../../../node_modules/sass-loader/dist/cjs.js??clonedRuleSet-12.use[3]!../../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Schedule.vue?vue&type=style&index=1&id=06c2befc&lang=scss */ "./node_modules/css-loader/dist/cjs.js??clonedRuleSet-12.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12.use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-12.use[3]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/Schedule/Schedule.vue?vue&type=style&index=1&id=06c2befc&lang=scss");

            

var options = {};

options.insert = "head";
options.singleton = false;

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_clonedRuleSet_12_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_12_use_2_node_modules_sass_loader_dist_cjs_js_clonedRuleSet_12_use_3_node_modules_vue_loader_lib_index_js_vue_loader_options_Schedule_vue_vue_type_style_index_1_id_06c2befc_lang_scss__WEBPACK_IMPORTED_MODULE_1__["default"], options);



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_clonedRuleSet_12_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_12_use_2_node_modules_sass_loader_dist_cjs_js_clonedRuleSet_12_use_3_node_modules_vue_loader_lib_index_js_vue_loader_options_Schedule_vue_vue_type_style_index_1_id_06c2befc_lang_scss__WEBPACK_IMPORTED_MODULE_1__["default"].locals || {});

/***/ }),

/***/ "./resources/src/views/app/pages/Schedule/Schedule.vue":
/*!*************************************************************!*\
  !*** ./resources/src/views/app/pages/Schedule/Schedule.vue ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Schedule_vue_vue_type_template_id_06c2befc_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Schedule.vue?vue&type=template&id=06c2befc&scoped=true */ "./resources/src/views/app/pages/Schedule/Schedule.vue?vue&type=template&id=06c2befc&scoped=true");
/* harmony import */ var _Schedule_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Schedule.vue?vue&type=script&lang=js */ "./resources/src/views/app/pages/Schedule/Schedule.vue?vue&type=script&lang=js");
/* harmony import */ var _Schedule_vue_vue_type_style_index_0_id_06c2befc_lang_scss_scoped_true__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Schedule.vue?vue&type=style&index=0&id=06c2befc&lang=scss&scoped=true */ "./resources/src/views/app/pages/Schedule/Schedule.vue?vue&type=style&index=0&id=06c2befc&lang=scss&scoped=true");
/* harmony import */ var _Schedule_vue_vue_type_style_index_1_id_06c2befc_lang_scss__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Schedule.vue?vue&type=style&index=1&id=06c2befc&lang=scss */ "./resources/src/views/app/pages/Schedule/Schedule.vue?vue&type=style&index=1&id=06c2befc&lang=scss");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");



;



/* normalize component */

var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_4__["default"])(
  _Schedule_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__["default"],
  _Schedule_vue_vue_type_template_id_06c2befc_scoped_true__WEBPACK_IMPORTED_MODULE_0__.render,
  _Schedule_vue_vue_type_template_id_06c2befc_scoped_true__WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  "06c2befc",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/src/views/app/pages/Schedule/Schedule.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./resources/src/views/app/pages/Schedule/Schedule.vue?vue&type=script&lang=js":
/*!*************************************************************************************!*\
  !*** ./resources/src/views/app/pages/Schedule/Schedule.vue?vue&type=script&lang=js ***!
  \*************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Schedule_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Schedule.vue?vue&type=script&lang=js */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/Schedule/Schedule.vue?vue&type=script&lang=js");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Schedule_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/src/views/app/pages/Schedule/Schedule.vue?vue&type=style&index=0&id=06c2befc&lang=scss&scoped=true":
/*!**********************************************************************************************************************!*\
  !*** ./resources/src/views/app/pages/Schedule/Schedule.vue?vue&type=style&index=0&id=06c2befc&lang=scss&scoped=true ***!
  \**********************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_dist_cjs_js_node_modules_css_loader_dist_cjs_js_clonedRuleSet_12_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_12_use_2_node_modules_sass_loader_dist_cjs_js_clonedRuleSet_12_use_3_node_modules_vue_loader_lib_index_js_vue_loader_options_Schedule_vue_vue_type_style_index_0_id_06c2befc_lang_scss_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/style-loader/dist/cjs.js!../../../../../../node_modules/css-loader/dist/cjs.js??clonedRuleSet-12.use[1]!../../../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12.use[2]!../../../../../../node_modules/sass-loader/dist/cjs.js??clonedRuleSet-12.use[3]!../../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Schedule.vue?vue&type=style&index=0&id=06c2befc&lang=scss&scoped=true */ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-12.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12.use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-12.use[3]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/Schedule/Schedule.vue?vue&type=style&index=0&id=06c2befc&lang=scss&scoped=true");


/***/ }),

/***/ "./resources/src/views/app/pages/Schedule/Schedule.vue?vue&type=style&index=1&id=06c2befc&lang=scss":
/*!**********************************************************************************************************!*\
  !*** ./resources/src/views/app/pages/Schedule/Schedule.vue?vue&type=style&index=1&id=06c2befc&lang=scss ***!
  \**********************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_dist_cjs_js_node_modules_css_loader_dist_cjs_js_clonedRuleSet_12_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_12_use_2_node_modules_sass_loader_dist_cjs_js_clonedRuleSet_12_use_3_node_modules_vue_loader_lib_index_js_vue_loader_options_Schedule_vue_vue_type_style_index_1_id_06c2befc_lang_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/style-loader/dist/cjs.js!../../../../../../node_modules/css-loader/dist/cjs.js??clonedRuleSet-12.use[1]!../../../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12.use[2]!../../../../../../node_modules/sass-loader/dist/cjs.js??clonedRuleSet-12.use[3]!../../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Schedule.vue?vue&type=style&index=1&id=06c2befc&lang=scss */ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-12.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12.use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-12.use[3]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/Schedule/Schedule.vue?vue&type=style&index=1&id=06c2befc&lang=scss");


/***/ }),

/***/ "./resources/src/views/app/pages/Schedule/Schedule.vue?vue&type=template&id=06c2befc&scoped=true":
/*!*******************************************************************************************************!*\
  !*** ./resources/src/views/app/pages/Schedule/Schedule.vue?vue&type=template&id=06c2befc&scoped=true ***!
  \*******************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Schedule_vue_vue_type_template_id_06c2befc_scoped_true__WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   staticRenderFns: () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Schedule_vue_vue_type_template_id_06c2befc_scoped_true__WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Schedule_vue_vue_type_template_id_06c2befc_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Schedule.vue?vue&type=template&id=06c2befc&scoped=true */ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/Schedule/Schedule.vue?vue&type=template&id=06c2befc&scoped=true");


/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/Schedule/Schedule.vue?vue&type=template&id=06c2befc&scoped=true":
/*!**********************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/Schedule/Schedule.vue?vue&type=template&id=06c2befc&scoped=true ***!
  \**********************************************************************************************************************************************************************************************************************************************/
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
    [
      _c("div", { staticClass: "container-fluid" }, [
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
                    staticClass:
                      "breadcrumb-container d-flex align-items-center",
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
                          _c(
                            "router-link",
                            { attrs: { to: "/app/dashboard" } },
                            [
                              _c("i", { staticClass: "fas fa-home" }),
                              _vm._v(
                                "\n                                Dashboard\n                            "
                              ),
                            ]
                          ),
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
          _c("div", { staticClass: "help-section" }, [
            _c(
              "button",
              {
                staticClass: "help-btn",
                attrs: { title: "Help" },
                on: { click: _vm.openVideoTutorialModal },
              },
              [
                _c("i", { staticClass: "fas fa-video" }),
                _vm._v(" "),
                _c("span", [_vm._v("Help")]),
              ]
            ),
          ]),
        ]),
        _vm._v(" "),
        _c("div", { staticClass: "tabs-controls-row" }, [
          _c("div", { staticClass: "tabs-wrapper d-flex align-items-center" }, [
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
                  [
                    _vm._v(
                      "\n                    " +
                        _vm._s(tab) +
                        "\n                "
                    ),
                  ]
                )
              }),
              0
            ),
            _vm._v(" "),
            _c("div", { staticClass: "default-toggle ml-3" }, [
              _c("label", { staticClass: "toggle-label" }, [
                _c("input", {
                  directives: [
                    {
                      name: "model",
                      rawName: "v-model",
                      value: _vm.setAsDefault,
                      expression: "setAsDefault",
                    },
                  ],
                  staticClass: "toggle-input",
                  attrs: { type: "checkbox" },
                  domProps: {
                    checked: Array.isArray(_vm.setAsDefault)
                      ? _vm._i(_vm.setAsDefault, null) > -1
                      : _vm.setAsDefault,
                  },
                  on: {
                    change: function ($event) {
                      var $$a = _vm.setAsDefault,
                        $$el = $event.target,
                        $$c = $$el.checked ? true : false
                      if (Array.isArray($$a)) {
                        var $$v = null,
                          $$i = _vm._i($$a, $$v)
                        if ($$el.checked) {
                          $$i < 0 && (_vm.setAsDefault = $$a.concat([$$v]))
                        } else {
                          $$i > -1 &&
                            (_vm.setAsDefault = $$a
                              .slice(0, $$i)
                              .concat($$a.slice($$i + 1)))
                        }
                      } else {
                        _vm.setAsDefault = $$c
                      }
                    },
                  },
                }),
                _vm._v(" "),
                _c("span", { staticClass: "toggle-text" }, [
                  _vm._v("Set as default?"),
                ]),
              ]),
              _vm._v(" "),
              _c("i", {
                staticClass: "fas fa-info-circle info-icon ml-2",
                attrs: { title: "Set this view as your default schedule view" },
              }),
            ]),
          ]),
        ]),
        _vm._v(" "),
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
                        value: _vm.coachView,
                        expression: "coachView",
                      },
                    ],
                    staticClass: "form-control",
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
                        _vm.coachView = $event.target.multiple
                          ? $$selectedVal
                          : $$selectedVal[0]
                      },
                    },
                  },
                  [
                    _c("option", [_vm._v("Coach view")]),
                    _vm._v(" "),
                    _c("option", [_vm._v("Member view")]),
                  ]
                ),
              ]),
              _vm._v(" "),
              !_vm.isMemberView
                ? _c("div", { staticClass: "dropdown" }, [
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
                        staticClass: "form-control",
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
                        _c("option", [_vm._v("By Coach")]),
                      ]
                    ),
                  ])
                : _vm._e(),
              _vm._v(" "),
              !_vm.isMemberView
                ? _c("div", { staticClass: "dropdown" }, [
                    _c(
                      "select",
                      {
                        directives: [
                          {
                            name: "model",
                            rawName: "v-model",
                            value: _vm.detailLevel,
                            expression: "detailLevel",
                          },
                        ],
                        staticClass: "form-control",
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
                            _vm.detailLevel = $event.target.multiple
                              ? $$selectedVal
                              : $$selectedVal[0]
                          },
                        },
                      },
                      [
                        _c("option", [_vm._v("Medium")]),
                        _vm._v(" "),
                        _c("option", [_vm._v("Low")]),
                        _vm._v(" "),
                        _c("option", [_vm._v("High")]),
                      ]
                    ),
                  ])
                : _vm._e(),
            ]),
            _vm._v(" "),
            _c("div", { staticClass: "controls-right" }, [
              _c(
                "div",
                {
                  staticClass: "search-container",
                  on: {
                    click: function ($event) {
                      $event.stopPropagation()
                    },
                  },
                },
                [
                  _c("input", {
                    directives: [
                      {
                        name: "model",
                        rawName: "v-model",
                        value: _vm.searchTerm,
                        expression: "searchTerm",
                      },
                    ],
                    staticClass: "search-input",
                    attrs: { type: "text", placeholder: "Search members" },
                    domProps: { value: _vm.searchTerm },
                    on: {
                      focus: function ($event) {
                        _vm.showMemberDropdown = true
                      },
                      input: [
                        function ($event) {
                          if ($event.target.composing) {
                            return
                          }
                          _vm.searchTerm = $event.target.value
                        },
                        function ($event) {
                          _vm.showMemberDropdown = true
                        },
                      ],
                      blur: _vm.handleSearchBlur,
                    },
                  }),
                  _vm._v(" "),
                  _c("i", { staticClass: "fas fa-search search-icon" }),
                  _vm._v(" "),
                  _vm.selectedMemberId
                    ? _c("i", {
                        staticClass: "fas fa-times clear-icon",
                        attrs: { title: "Clear member filter" },
                        on: { click: _vm.clearMemberFilter },
                      })
                    : _vm._e(),
                  _vm._v(" "),
                  _vm.showMemberDropdown && _vm.filteredMembers.length > 0
                    ? _c(
                        "div",
                        { staticClass: "member-dropdown" },
                        _vm._l(_vm.filteredMembers, function (member) {
                          return _c(
                            "div",
                            {
                              key: member.id,
                              staticClass: "member-dropdown-item",
                              on: {
                                mousedown: function ($event) {
                                  $event.preventDefault()
                                  return _vm.selectMember(member)
                                },
                              },
                            },
                            [
                              _vm._v(
                                "\n                            " +
                                  _vm._s(member.name || "Unnamed Member") +
                                  "\n                        "
                              ),
                            ]
                          )
                        }),
                        0
                      )
                    : _vm._e(),
                  _vm._v(" "),
                  _vm.showMemberDropdown &&
                  _vm.searchTerm &&
                  _vm.searchTerm.trim() !== "" &&
                  _vm.filteredMembers.length === 0
                    ? _c("div", { staticClass: "member-dropdown" }, [
                        _c(
                          "div",
                          { staticClass: "member-dropdown-item no-results" },
                          [_vm._v("No members found")]
                        ),
                      ])
                    : _vm._e(),
                  _vm._v(" "),
                  _vm.showMemberDropdown &&
                  (!_vm.searchTerm || _vm.searchTerm.trim() === "") &&
                  _vm.members.length === 0
                    ? _c("div", { staticClass: "member-dropdown" }, [
                        _c(
                          "div",
                          { staticClass: "member-dropdown-item no-results" },
                          [_vm._v("No members available")]
                        ),
                      ])
                    : _vm._e(),
                ]
              ),
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
                    staticClass: "form-control",
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
                      _vm._v("Activity"),
                    ]),
                    _vm._v(" "),
                    _vm._l(_vm.activityOptions, function (activity) {
                      return _c(
                        "option",
                        { key: activity, domProps: { value: activity } },
                        [
                          _vm._v(
                            "\n                            " +
                              _vm._s(activity) +
                              "\n                        "
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
              "a",
              {
                staticClass: "calendar-nav-link",
                attrs: { href: "#" },
                on: {
                  click: function ($event) {
                    $event.preventDefault()
                    return _vm.goToPreviousDate.apply(null, arguments)
                  },
                },
              },
              [_vm._v("\n                < previous\n            ")]
            ),
            _vm._v(" "),
            _c("h2", { staticClass: "calendar-title" }, [
              _c("i", { staticClass: "fas fa-calendar-alt calendar-icon" }),
              _vm._v(
                "\n                " +
                  _vm._s(_vm.formattedWeekTitle) +
                  "\n                "
              ),
              _vm.selectedMemberName
                ? _c("span", { staticClass: "member-filter-badge" }, [
                    _c("i", { staticClass: "fas fa-user" }),
                    _vm._v(
                      " " +
                        _vm._s(_vm.selectedMemberName) +
                        "\n                "
                    ),
                  ])
                : _vm._e(),
            ]),
            _vm._v(" "),
            _c(
              "a",
              {
                staticClass: "calendar-nav-link",
                attrs: { href: "#" },
                on: {
                  click: function ($event) {
                    $event.preventDefault()
                    return _vm.goToNextDate.apply(null, arguments)
                  },
                },
              },
              [_vm._v("\n                next >\n            ")]
            ),
          ]),
        ]),
        _vm._v(" "),
        !_vm.isMemberView
          ? _c(
              "div",
              {
                staticClass: "schedule-grid",
                class: {
                  "multi-day-grid":
                    _vm.viewMode !== "1 day" && _vm.viewMode !== "By Coach",
                  "coach-grid": _vm.viewMode === "By Coach",
                },
              },
              [
                _c(
                  "div",
                  { ref: "timeColumn", staticClass: "time-column" },
                  [
                    _c("div", { staticClass: "time-header" }),
                    _vm._v(" "),
                    _vm._l(_vm.timeSlots, function (time) {
                      return _c(
                        "div",
                        { key: time, staticClass: "time-slot" },
                        [
                          _vm._v(
                            "\n                " +
                              _vm._s(time) +
                              "\n            "
                          ),
                        ]
                      )
                    }),
                  ],
                  2
                ),
                _vm._v(" "),
                _vm.viewMode === "1 day"
                  ? [
                      _c(
                        "div",
                        {
                          ref: "scheduleContent",
                          staticClass: "schedule-content",
                        },
                        [
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
                              _vm._l(
                                _vm.getEventsForDate(_vm.currentDate),
                                function (event) {
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
                                          $event.preventDefault()
                                          return _vm.openEventModal(event)
                                        },
                                        mousedown: function ($event) {
                                          $event.stopPropagation()
                                        },
                                      },
                                    },
                                    [
                                      _c(
                                        "div",
                                        { staticClass: "event-title" },
                                        [_vm._v(_vm._s(event.title))]
                                      ),
                                      _vm._v(" "),
                                      _vm.detailLevel !== "Low"
                                        ? _c(
                                            "div",
                                            { staticClass: "event-subtitle" },
                                            [_vm._v(_vm._s(event.subtitle))]
                                          )
                                        : _vm._e(),
                                      _vm._v(" "),
                                      _vm.detailLevel === "High"
                                        ? _c(
                                            "div",
                                            { staticClass: "event-time" },
                                            [
                                              _vm._v(
                                                _vm._s(
                                                  _vm.formatEventTime(
                                                    event.start_time
                                                  )
                                                ) +
                                                  " - " +
                                                  _vm._s(
                                                    _vm.formatEventTime(
                                                      event.end_time
                                                    )
                                                  )
                                              ),
                                            ]
                                          )
                                        : _vm._e(),
                                      _vm._v(" "),
                                      _vm.detailLevel !== "Low"
                                        ? _c(
                                            "div",
                                            { staticClass: "event-capacity" },
                                            [_vm._v(_vm._s(event.capacity))]
                                          )
                                        : _vm._e(),
                                    ]
                                  )
                                }
                              ),
                              _vm._v(" "),
                              _vm.hasNoEventsForSelectedMember
                                ? _c(
                                    "div",
                                    { staticClass: "no-events-message" },
                                    [
                                      _c("p", [
                                        _vm._v("No events found for "),
                                        _c("strong", [
                                          _vm._v(
                                            _vm._s(_vm.selectedMemberName)
                                          ),
                                        ]),
                                      ]),
                                    ]
                                  )
                                : _vm._e(),
                            ],
                            2
                          ),
                        ]
                      ),
                    ]
                  : _vm.viewMode === "By Coach"
                  ? [
                      _c(
                        "div",
                        {
                          ref: "coachContent",
                          staticClass: "coach-content",
                          style: { "--coaches-count": _vm.coachColumns.length },
                        },
                        [
                          _c(
                            "div",
                            { staticClass: "coach-header" },
                            _vm._l(_vm.coachColumns, function (coach) {
                              return _c(
                                "div",
                                {
                                  key: coach.id || "without-coach",
                                  staticClass: "coach-header-item",
                                },
                                [
                                  _vm._v(
                                    "\n                        " +
                                      _vm._s(coach.name) +
                                      "\n                    "
                                  ),
                                ]
                              )
                            }),
                            0
                          ),
                          _vm._v(" "),
                          _c(
                            "div",
                            { staticClass: "coach-slots" },
                            [
                              _vm._l(_vm.timeSlots, function (time, timeIndex) {
                                return _c(
                                  "div",
                                  { key: timeIndex, staticClass: "coach-row" },
                                  _vm._l(
                                    _vm.coachColumns,
                                    function (coach, coachIndex) {
                                      return _c(
                                        "div",
                                        {
                                          key: coachIndex,
                                          staticClass: "coach-cell clickable",
                                          on: {
                                            click: function ($event) {
                                              return _vm.handleCoachCellClick(
                                                timeIndex,
                                                coach
                                              )
                                            },
                                          },
                                        },
                                        _vm._l(
                                          _vm.getEventsForCoachAndTime(
                                            coach,
                                            time
                                          ),
                                          function (event) {
                                            return _c(
                                              "div",
                                              {
                                                key: event.id,
                                                staticClass:
                                                  "event coach-event",
                                                on: {
                                                  click: function ($event) {
                                                    $event.stopPropagation()
                                                    $event.preventDefault()
                                                    return _vm.openEventModal(
                                                      event
                                                    )
                                                  },
                                                  mousedown: function ($event) {
                                                    $event.stopPropagation()
                                                  },
                                                },
                                              },
                                              [
                                                _c(
                                                  "div",
                                                  {
                                                    staticClass: "event-title",
                                                  },
                                                  [_vm._v(_vm._s(event.title))]
                                                ),
                                                _vm._v(" "),
                                                _c(
                                                  "div",
                                                  { staticClass: "event-time" },
                                                  [
                                                    _vm._v(
                                                      _vm._s(
                                                        _vm.formatEventTime(
                                                          event.start_time
                                                        )
                                                      ) +
                                                        " - " +
                                                        _vm._s(
                                                          _vm.formatEventTime(
                                                            event.end_time
                                                          )
                                                        )
                                                    ),
                                                  ]
                                                ),
                                                _vm._v(" "),
                                                event.memberNames &&
                                                event.memberNames.length > 0
                                                  ? _c(
                                                      "div",
                                                      {
                                                        staticClass:
                                                          "event-members",
                                                      },
                                                      _vm._l(
                                                        event.memberNames,
                                                        function (
                                                          memberName,
                                                          idx
                                                        ) {
                                                          return _c(
                                                            "div",
                                                            {
                                                              key: idx,
                                                              staticClass:
                                                                "event-member-name",
                                                            },
                                                            [
                                                              _vm._v(
                                                                _vm._s(
                                                                  memberName
                                                                )
                                                              ),
                                                            ]
                                                          )
                                                        }
                                                      ),
                                                      0
                                                    )
                                                  : _vm._e(),
                                              ]
                                            )
                                          }
                                        ),
                                        0
                                      )
                                    }
                                  ),
                                  0
                                )
                              }),
                              _vm._v(" "),
                              _vm.hasNoEventsForSelectedMember
                                ? _c(
                                    "div",
                                    { staticClass: "no-events-message-coach" },
                                    [
                                      _c("p", [
                                        _vm._v("No events found for "),
                                        _c("strong", [
                                          _vm._v(
                                            _vm._s(_vm.selectedMemberName)
                                          ),
                                        ]),
                                      ]),
                                    ]
                                  )
                                : _vm._e(),
                            ],
                            2
                          ),
                        ]
                      ),
                    ]
                  : [
                      _c(
                        "div",
                        {
                          ref: "multiDayContent",
                          staticClass: "multi-day-content",
                          style: { "--days-count": _vm.viewDates.length },
                        },
                        [
                          _c(
                            "div",
                            { staticClass: "multi-day-header" },
                            _vm._l(_vm.viewDates, function (date) {
                              return _c(
                                "div",
                                {
                                  key: date.getTime(),
                                  staticClass: "day-header",
                                },
                                [
                                  _c("div", { staticClass: "day-name" }, [
                                    _vm._v(
                                      _vm._s(
                                        date.toLocaleDateString("en-US", {
                                          weekday: "short",
                                        })
                                      )
                                    ),
                                  ]),
                                  _vm._v(" "),
                                  _c("div", { staticClass: "day-date" }, [
                                    _vm._v(
                                      _vm._s(date.getDate()) +
                                        " " +
                                        _vm._s(
                                          date.toLocaleDateString("en-US", {
                                            month: "short",
                                          })
                                        )
                                    ),
                                  ]),
                                ]
                              )
                            }),
                            0
                          ),
                          _vm._v(" "),
                          _c(
                            "div",
                            { staticClass: "multi-day-slots" },
                            [
                              _vm._l(_vm.timeSlots, function (time, timeIndex) {
                                return _c(
                                  "div",
                                  {
                                    key: timeIndex,
                                    staticClass: "multi-day-row",
                                  },
                                  _vm._l(
                                    _vm.viewDates,
                                    function (date, dayIndex) {
                                      return _c(
                                        "div",
                                        {
                                          key: dayIndex,
                                          staticClass:
                                            "multi-day-cell clickable",
                                          on: {
                                            click: function ($event) {
                                              return _vm.handleMultiDayCellClick(
                                                timeIndex,
                                                dayIndex,
                                                date
                                              )
                                            },
                                          },
                                        },
                                        _vm._l(
                                          _vm.getEventsForCell(date, time),
                                          function (event) {
                                            return _c(
                                              "div",
                                              {
                                                key: event.id,
                                                staticClass:
                                                  "event multi-day-event",
                                                on: {
                                                  click: function ($event) {
                                                    $event.stopPropagation()
                                                    $event.preventDefault()
                                                    return _vm.openEventModal(
                                                      event
                                                    )
                                                  },
                                                  mousedown: function ($event) {
                                                    $event.stopPropagation()
                                                  },
                                                },
                                              },
                                              [
                                                _c(
                                                  "div",
                                                  {
                                                    staticClass: "event-title",
                                                  },
                                                  [_vm._v(_vm._s(event.title))]
                                                ),
                                                _vm._v(" "),
                                                _vm.detailLevel !== "Low"
                                                  ? _c(
                                                      "div",
                                                      {
                                                        staticClass:
                                                          "event-time",
                                                      },
                                                      [
                                                        _vm._v(
                                                          _vm._s(
                                                            _vm.formatEventTime(
                                                              event.start_time
                                                            )
                                                          ) +
                                                            " - " +
                                                            _vm._s(
                                                              _vm.formatEventTime(
                                                                event.end_time
                                                              )
                                                            )
                                                        ),
                                                      ]
                                                    )
                                                  : _vm._e(),
                                                _vm._v(" "),
                                                _vm.detailLevel === "High"
                                                  ? _c(
                                                      "div",
                                                      {
                                                        staticClass:
                                                          "event-instructor",
                                                      },
                                                      [
                                                        _vm._v(
                                                          _vm._s(
                                                            event.instructor
                                                          )
                                                        ),
                                                      ]
                                                    )
                                                  : _vm._e(),
                                                _vm._v(" "),
                                                _vm.detailLevel !== "Low"
                                                  ? _c(
                                                      "div",
                                                      {
                                                        staticClass:
                                                          "event-capacity",
                                                      },
                                                      [
                                                        _vm._v(
                                                          _vm._s(event.capacity)
                                                        ),
                                                      ]
                                                    )
                                                  : _vm._e(),
                                                _vm._v(" "),
                                                _vm.detailLevel === "High" &&
                                                event.location
                                                  ? _c(
                                                      "div",
                                                      {
                                                        staticClass:
                                                          "event-location",
                                                      },
                                                      [
                                                        _vm._v(
                                                          _vm._s(event.location)
                                                        ),
                                                      ]
                                                    )
                                                  : _vm._e(),
                                              ]
                                            )
                                          }
                                        ),
                                        0
                                      )
                                    }
                                  ),
                                  0
                                )
                              }),
                              _vm._v(" "),
                              _vm.hasNoEventsForSelectedMember
                                ? _c(
                                    "div",
                                    {
                                      staticClass:
                                        "no-events-message-multi-day",
                                    },
                                    [
                                      _c("p", [
                                        _vm._v("No events found for "),
                                        _c("strong", [
                                          _vm._v(
                                            _vm._s(_vm.selectedMemberName)
                                          ),
                                        ]),
                                      ]),
                                    ]
                                  )
                                : _vm._e(),
                            ],
                            2
                          ),
                        ]
                      ),
                    ],
              ],
              2
            )
          : _c("div", { staticClass: "schedule-grid weekly-grid" }, [
              _c(
                "div",
                { ref: "timeColumnMember", staticClass: "time-column" },
                [
                  _c("div", { staticClass: "time-header" }),
                  _vm._v(" "),
                  _vm._l(_vm.timeSlots, function (time) {
                    return _c("div", { key: time, staticClass: "time-slot" }, [
                      _vm._v(
                        "\n                " + _vm._s(time) + "\n            "
                      ),
                    ])
                  }),
                ],
                2
              ),
              _vm._v(" "),
              _c(
                "div",
                { ref: "weeklyContent", staticClass: "weekly-content" },
                [
                  _c(
                    "div",
                    { staticClass: "weekly-header" },
                    _vm._l(_vm.weekDates, function (date) {
                      return _c(
                        "div",
                        { key: date.getTime(), staticClass: "day-header" },
                        [
                          _c("div", { staticClass: "day-name" }, [
                            _vm._v(
                              _vm._s(
                                date.toLocaleDateString("en-US", {
                                  weekday: "long",
                                })
                              )
                            ),
                          ]),
                          _vm._v(" "),
                          _c("div", { staticClass: "day-date" }, [
                            _vm._v(
                              _vm._s(date.getDate()) +
                                " " +
                                _vm._s(
                                  date.toLocaleDateString("en-US", {
                                    month: "short",
                                  })
                                )
                            ),
                          ]),
                        ]
                      )
                    }),
                    0
                  ),
                  _vm._v(" "),
                  _c(
                    "div",
                    { staticClass: "weekly-slots" },
                    [
                      _vm._l(_vm.timeSlots, function (time, timeIndex) {
                        return _c(
                          "div",
                          { key: timeIndex, staticClass: "weekly-row" },
                          _vm._l(_vm.weekDates, function (date, dayIndex) {
                            return _c(
                              "div",
                              {
                                key: dayIndex,
                                staticClass: "weekly-cell clickable",
                                on: {
                                  click: function ($event) {
                                    return _vm.handleWeeklyCellClick(
                                      timeIndex,
                                      dayIndex,
                                      date
                                    )
                                  },
                                },
                              },
                              _vm._l(
                                _vm.getEventsForCell(date, time),
                                function (event) {
                                  return _c(
                                    "div",
                                    {
                                      key: event.id,
                                      staticClass: "event weekly-event",
                                      on: {
                                        click: function ($event) {
                                          $event.stopPropagation()
                                          $event.preventDefault()
                                          return _vm.openEventModal(event)
                                        },
                                        mousedown: function ($event) {
                                          $event.stopPropagation()
                                        },
                                      },
                                    },
                                    [
                                      _c(
                                        "div",
                                        { staticClass: "event-title" },
                                        [_vm._v(_vm._s(event.title))]
                                      ),
                                      _vm._v(" "),
                                      _vm.detailLevel !== "Low"
                                        ? _c(
                                            "div",
                                            { staticClass: "event-time" },
                                            [
                                              _vm._v(
                                                _vm._s(
                                                  _vm.formatEventTime(
                                                    event.start_time
                                                  )
                                                ) +
                                                  " - " +
                                                  _vm._s(
                                                    _vm.formatEventTime(
                                                      event.end_time
                                                    )
                                                  )
                                              ),
                                            ]
                                          )
                                        : _vm._e(),
                                      _vm._v(" "),
                                      _vm.detailLevel === "High"
                                        ? _c(
                                            "div",
                                            { staticClass: "event-instructor" },
                                            [_vm._v(_vm._s(event.instructor))]
                                          )
                                        : _vm._e(),
                                      _vm._v(" "),
                                      _vm.detailLevel !== "Low"
                                        ? _c(
                                            "div",
                                            { staticClass: "event-capacity" },
                                            [_vm._v(_vm._s(event.capacity))]
                                          )
                                        : _vm._e(),
                                      _vm._v(" "),
                                      _vm.detailLevel === "High" &&
                                      event.location
                                        ? _c(
                                            "div",
                                            { staticClass: "event-location" },
                                            [_vm._v(_vm._s(event.location))]
                                          )
                                        : _vm._e(),
                                    ]
                                  )
                                }
                              ),
                              0
                            )
                          }),
                          0
                        )
                      }),
                      _vm._v(" "),
                      _vm.hasNoEventsForSelectedMember
                        ? _c(
                            "div",
                            { staticClass: "no-events-message-weekly" },
                            [
                              _c("p", [
                                _vm._v("No events found for "),
                                _c("strong", [
                                  _vm._v(_vm._s(_vm.selectedMemberName)),
                                ]),
                              ]),
                            ]
                          )
                        : _vm._e(),
                    ],
                    2
                  ),
                ]
              ),
            ]),
      ]),
      _vm._v(" "),
      _vm.selectedEvent
        ? _c(
            "div",
            {
              ref: "eventModal",
              staticClass: "modal-backdrop event-details-modal",
              on: {
                click: function ($event) {
                  if ($event.target !== $event.currentTarget) {
                    return null
                  }
                  return _vm.closeEventModal.apply(null, arguments)
                },
              },
            },
            [
              _c("div", { staticClass: "modal-box event-details-box" }, [
                _c("div", { staticClass: "event-modal-header" }, [
                  _c("h2", { staticClass: "event-modal-title" }, [
                    _vm._v(_vm._s(_vm.selectedEvent.title || "Event Details")),
                  ]),
                  _vm._v(" "),
                  _c(
                    "button",
                    {
                      staticClass: "event-modal-close",
                      on: { click: _vm.closeEventModal },
                    },
                    [_vm._v("×")]
                  ),
                ]),
                _vm._v(" "),
                _c("div", { staticClass: "event-modal-content-wrapper" }, [
                  _c("div", { staticClass: "event-details-grid" }, [
                    _c("div", { staticClass: "event-detail-row" }, [
                      _c("div", { staticClass: "event-detail-col" }, [
                        _c("i", {
                          staticClass: "fas fa-calendar-alt event-detail-icon",
                        }),
                        _vm._v(" "),
                        _c("div", { staticClass: "event-detail-info" }, [
                          _c("span", { staticClass: "event-detail-label" }, [
                            _vm._v("Date"),
                          ]),
                          _vm._v(" "),
                          _c("span", { staticClass: "event-detail-value" }, [
                            _vm._v(
                              _vm._s(
                                _vm.formatEventDate(_vm.selectedEvent.date)
                              )
                            ),
                          ]),
                        ]),
                      ]),
                      _vm._v(" "),
                      _c("div", { staticClass: "event-detail-col" }, [
                        _c("i", {
                          staticClass: "fas fa-clock event-detail-icon",
                        }),
                        _vm._v(" "),
                        _c("div", { staticClass: "event-detail-info" }, [
                          _c("span", { staticClass: "event-detail-label" }, [
                            _vm._v("Time"),
                          ]),
                          _vm._v(" "),
                          _c("span", { staticClass: "event-detail-value" }, [
                            _vm._v(
                              _vm._s(
                                _vm.formatEventTime(
                                  _vm.selectedEvent.start_time
                                )
                              ) +
                                " - " +
                                _vm._s(
                                  _vm.formatEventTime(
                                    _vm.selectedEvent.end_time
                                  )
                                )
                            ),
                          ]),
                        ]),
                      ]),
                    ]),
                    _vm._v(" "),
                    _c("div", { staticClass: "event-detail-row" }, [
                      _c("div", { staticClass: "event-detail-col" }, [
                        _c("i", {
                          staticClass: "fas fa-users event-detail-icon",
                        }),
                        _vm._v(" "),
                        _c("div", { staticClass: "event-detail-info" }, [
                          _c("span", { staticClass: "event-detail-label" }, [
                            _vm._v("Participants"),
                          ]),
                          _vm._v(" "),
                          _c("span", { staticClass: "event-detail-value" }, [
                            _vm._v(
                              _vm._s(_vm.selectedEvent.capacity || "0 / 10")
                            ),
                          ]),
                        ]),
                      ]),
                      _vm._v(" "),
                      _c("div", { staticClass: "event-detail-col" }, [
                        _c("i", {
                          staticClass: "fas fa-user-tie event-detail-icon",
                        }),
                        _vm._v(" "),
                        _c("div", { staticClass: "event-detail-info" }, [
                          _c("span", { staticClass: "event-detail-label" }, [
                            _vm._v("Coach"),
                          ]),
                          _vm._v(" "),
                          _c(
                            "span",
                            { staticClass: "event-detail-value coach-name" },
                            [
                              _vm._v(
                                _vm._s(_vm.selectedEvent.instructor || "N/A")
                              ),
                            ]
                          ),
                        ]),
                      ]),
                    ]),
                    _vm._v(" "),
                    _c("div", { staticClass: "event-detail-row" }, [
                      _c("div", { staticClass: "event-detail-col" }, [
                        _c("i", {
                          staticClass:
                            "fas fa-map-marker-alt event-detail-icon",
                        }),
                        _vm._v(" "),
                        _c("div", { staticClass: "event-detail-info" }, [
                          _c("span", { staticClass: "event-detail-label" }, [
                            _vm._v("Location"),
                          ]),
                          _vm._v(" "),
                          _c("span", { staticClass: "event-detail-value" }, [
                            _vm._v(_vm._s(_vm.selectedEvent.location || "Gym")),
                          ]),
                        ]),
                      ]),
                      _vm._v(" "),
                      _c("div", { staticClass: "event-detail-col" }, [
                        _c("i", {
                          staticClass: "fas fa-ticket-alt event-detail-icon",
                        }),
                        _vm._v(" "),
                        _c("div", { staticClass: "event-detail-info" }, [
                          _c("span", { staticClass: "event-detail-label" }, [
                            _vm._v("Credits"),
                          ]),
                          _vm._v(" "),
                          _c("span", { staticClass: "event-detail-value" }, [
                            _vm._v(
                              _vm._s(_vm.getCreditText(_vm.selectedEvent))
                            ),
                          ]),
                        ]),
                      ]),
                    ]),
                  ]),
                  _vm._v(" "),
                  _c("div", { staticClass: "event-member-assignment" }, [
                    _vm._m(1),
                    _vm._v(" "),
                    _c("div", { staticClass: "assignment-content" }, [
                      _c("div", { staticClass: "form-group mb-3" }, [
                        _c("label", { staticClass: "form-label" }, [
                          _vm._v("Select Members"),
                        ]),
                        _vm._v(" "),
                        _c("div", { staticClass: "input-with-icon" }, [
                          _c(
                            "select",
                            {
                              directives: [
                                {
                                  name: "model",
                                  rawName: "v-model",
                                  value: _vm.eventModalMemberIds,
                                  expression: "eventModalMemberIds",
                                },
                              ],
                              staticClass: "form-control form-control-sm",
                              staticStyle: { "min-height": "100px" },
                              attrs: { multiple: "", size: "5" },
                              on: {
                                change: function ($event) {
                                  var $$selectedVal = Array.prototype.filter
                                    .call($event.target.options, function (o) {
                                      return o.selected
                                    })
                                    .map(function (o) {
                                      var val =
                                        "_value" in o ? o._value : o.value
                                      return val
                                    })
                                  _vm.eventModalMemberIds = $event.target
                                    .multiple
                                    ? $$selectedVal
                                    : $$selectedVal[0]
                                },
                              },
                            },
                            _vm._l(_vm.members, function (member) {
                              return _c(
                                "option",
                                {
                                  key: member.id,
                                  domProps: { value: member.id },
                                },
                                [
                                  _vm._v(
                                    "\n                                        " +
                                      _vm._s(member.name) +
                                      "\n                                    "
                                  ),
                                ]
                              )
                            }),
                            0
                          ),
                          _vm._v(" "),
                          _c("i", { staticClass: "fas fa-users input-icon" }),
                        ]),
                        _vm._v(" "),
                        _vm.eventModalMemberIds &&
                        _vm.eventModalMemberIds.length > 0
                          ? _c(
                              "div",
                              { staticClass: "selected-members mt-2" },
                              [
                                _c(
                                  "small",
                                  { staticClass: "text-muted" },
                                  [
                                    _c("strong", [
                                      _vm._v(
                                        "Selected (" +
                                          _vm._s(
                                            _vm.eventModalMemberIds.length
                                          ) +
                                          "):"
                                      ),
                                    ]),
                                    _vm._v(" "),
                                    _vm._l(
                                      _vm.eventModalMemberIds,
                                      function (memberId, index) {
                                        return _c(
                                          "span",
                                          {
                                            key: memberId,
                                            staticClass:
                                              "badge badge-primary mr-1",
                                          },
                                          [
                                            _vm._v(
                                              "\n                                        " +
                                                _vm._s(
                                                  _vm.getMemberName(memberId)
                                                ) +
                                                "\n                                        "
                                            ),
                                            index <
                                            _vm.eventModalMemberIds.length - 1
                                              ? _c("span", [_vm._v(",")])
                                              : _vm._e(),
                                          ]
                                        )
                                      }
                                    ),
                                  ],
                                  2
                                ),
                              ]
                            )
                          : _vm._e(),
                        _vm._v(" "),
                        _c("small", { staticClass: "form-text text-muted" }, [
                          _vm._v(
                            "\n                                Hold Ctrl/Cmd to select multiple members.\n                            "
                          ),
                        ]),
                      ]),
                      _vm._v(" "),
                      _c(
                        "button",
                        {
                          staticClass: "btn btn-sm btn-primary",
                          attrs: { disabled: _vm.assigningMembers },
                          on: { click: _vm.assignMembersToEvent },
                        },
                        [
                          _c("i", { staticClass: "fas fa-save" }),
                          _vm._v(
                            "\n                            " +
                              _vm._s(
                                _vm.assigningMembers
                                  ? "Assigning..."
                                  : "Assign Members"
                              ) +
                              "\n                        "
                          ),
                        ]
                      ),
                    ]),
                  ]),
                ]),
                _vm._v(" "),
                _c("div", { staticClass: "event-modal-actions" }, [
                  _c(
                    "button",
                    {
                      staticClass: "btn btn-sm btn-primary",
                      on: {
                        click: function ($event) {
                          return _vm.editEvent(_vm.selectedEvent)
                        },
                      },
                    },
                    [
                      _c("i", { staticClass: "fas fa-pencil-alt" }),
                      _vm._v("\n                    Edit\n                "),
                    ]
                  ),
                  _vm._v(" "),
                  _c(
                    "button",
                    {
                      staticClass: "btn btn-sm btn-danger",
                      on: {
                        click: function ($event) {
                          return _vm.deleteEvent(_vm.selectedEvent)
                        },
                      },
                    },
                    [
                      _c("i", { staticClass: "fas fa-trash" }),
                      _vm._v("\n                    Delete\n                "),
                    ]
                  ),
                ]),
              ]),
            ]
          )
        : _vm._e(),
      _vm._v(" "),
      _vm.showCreateModal
        ? _c(
            "div",
            {
              staticClass: "modal-backdrop",
              on: {
                click: function ($event) {
                  if ($event.target !== $event.currentTarget) {
                    return null
                  }
                  return _vm.closeCreateModal.apply(null, arguments)
                },
              },
            },
            [
              _c("div", { staticClass: "modal-box comprehensive-modal" }, [
                _c("div", { staticClass: "modal-header" }, [
                  _c("h3", { staticClass: "modal-title" }, [
                    _vm._v(_vm._s(_vm.isEditing ? "Edit event" : "New event")),
                  ]),
                  _vm._v(" "),
                  _c(
                    "button",
                    {
                      staticClass: "modal-close",
                      attrs: { type: "button" },
                      on: { click: _vm.closeCreateModal },
                    },
                    [_vm._v("×")]
                  ),
                ]),
                _vm._v(" "),
                _c("div", { staticClass: "modal-content-wrapper" }, [
                  _c(
                    "form",
                    {
                      staticClass: "comprehensive-form",
                      on: {
                        submit: function ($event) {
                          $event.preventDefault()
                          return _vm.saveEvent.apply(null, arguments)
                        },
                      },
                    },
                    [
                      _c("div", { staticClass: "form-group" }, [
                        _vm._m(2),
                        _vm._v(" "),
                        _c(
                          "select",
                          {
                            directives: [
                              {
                                name: "model",
                                rawName: "v-model",
                                value: _vm.eventForm.scheduleId,
                                expression: "eventForm.scheduleId",
                              },
                            ],
                            staticClass: "form-control",
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
                                  _vm.eventForm,
                                  "scheduleId",
                                  $event.target.multiple
                                    ? $$selectedVal
                                    : $$selectedVal[0]
                                )
                              },
                            },
                          },
                          [
                            _c("option", { attrs: { value: "" } }, [
                              _vm._v("Choose..."),
                            ]),
                            _vm._v(" "),
                            _vm._l(_vm.schedules, function (schedule) {
                              return _c(
                                "option",
                                {
                                  key: schedule.id,
                                  domProps: { value: schedule.id },
                                },
                                [
                                  _vm._v(
                                    "\n                                " +
                                      _vm._s(schedule.name) +
                                      "\n                            "
                                  ),
                                ]
                              )
                            }),
                          ],
                          2
                        ),
                      ]),
                      _vm._v(" "),
                      _c("div", { staticClass: "form-group" }, [
                        _c("label", [_vm._v("Date")]),
                        _vm._v(" "),
                        _c("input", {
                          staticClass: "form-control",
                          attrs: { type: "text", disabled: "" },
                          domProps: { value: _vm.formattedDateShort },
                        }),
                      ]),
                      _vm._v(" "),
                      _c("div", { staticClass: "form-group" }, [
                        _vm._m(3),
                        _vm._v(" "),
                        _c("div", { staticClass: "d-flex" }, [
                          _c(
                            "select",
                            {
                              directives: [
                                {
                                  name: "model",
                                  rawName: "v-model",
                                  value: _vm.eventForm.activityId,
                                  expression: "eventForm.activityId",
                                },
                              ],
                              staticClass: "form-control",
                              attrs: { required: "" },
                              on: {
                                change: function ($event) {
                                  var $$selectedVal = Array.prototype.filter
                                    .call($event.target.options, function (o) {
                                      return o.selected
                                    })
                                    .map(function (o) {
                                      var val =
                                        "_value" in o ? o._value : o.value
                                      return val
                                    })
                                  _vm.$set(
                                    _vm.eventForm,
                                    "activityId",
                                    $event.target.multiple
                                      ? $$selectedVal
                                      : $$selectedVal[0]
                                  )
                                },
                              },
                            },
                            [
                              _c("option", { attrs: { value: "" } }, [
                                _vm._v("Choose..."),
                              ]),
                              _vm._v(" "),
                              _vm._l(_vm.activities, function (activity) {
                                return _c(
                                  "option",
                                  {
                                    key: activity.id,
                                    domProps: { value: activity.id },
                                  },
                                  [
                                    _vm._v(
                                      "\n                                    " +
                                        _vm._s(activity.name) +
                                        "\n                                "
                                    ),
                                  ]
                                )
                              }),
                            ],
                            2
                          ),
                          _vm._v(" "),
                          _c(
                            "button",
                            {
                              staticClass: "btn btn-outline-primary ml-2",
                              attrs: { type: "button" },
                              on: { click: _vm.openActivityModal },
                            },
                            [
                              _vm._v(
                                "\n                                + New\n                            "
                              ),
                            ]
                          ),
                        ]),
                        _vm._v(" "),
                        _vm.activities.length === 0
                          ? _c(
                              "small",
                              { staticClass: "form-text text-muted" },
                              [
                                _vm._v(
                                  "\n                            No activities yet. Click "
                                ),
                                _c("strong", [_vm._v("+ New")]),
                                _vm._v(
                                  " to create one.\n                        "
                                ),
                              ]
                            )
                          : _vm._e(),
                      ]),
                      _vm._v(" "),
                      _c("div", { staticClass: "form-group" }, [
                        _c("label", [_vm._v("Start time")]),
                        _vm._v(" "),
                        _c("div", { staticClass: "time-input-group" }, [
                          _c(
                            "select",
                            {
                              directives: [
                                {
                                  name: "model",
                                  rawName: "v-model",
                                  value: _vm.eventForm.startHour,
                                  expression: "eventForm.startHour",
                                },
                              ],
                              staticClass: "form-control time-select",
                              on: {
                                change: function ($event) {
                                  var $$selectedVal = Array.prototype.filter
                                    .call($event.target.options, function (o) {
                                      return o.selected
                                    })
                                    .map(function (o) {
                                      var val =
                                        "_value" in o ? o._value : o.value
                                      return val
                                    })
                                  _vm.$set(
                                    _vm.eventForm,
                                    "startHour",
                                    $event.target.multiple
                                      ? $$selectedVal
                                      : $$selectedVal[0]
                                  )
                                },
                              },
                            },
                            _vm._l(_vm.hours, function (h) {
                              return _c(
                                "option",
                                { key: h, domProps: { value: h } },
                                [_vm._v(_vm._s(String(h).padStart(2, "0")))]
                              )
                            }),
                            0
                          ),
                          _vm._v(" "),
                          _c(
                            "select",
                            {
                              directives: [
                                {
                                  name: "model",
                                  rawName: "v-model",
                                  value: _vm.eventForm.startMinute,
                                  expression: "eventForm.startMinute",
                                },
                              ],
                              staticClass: "form-control time-select",
                              on: {
                                change: function ($event) {
                                  var $$selectedVal = Array.prototype.filter
                                    .call($event.target.options, function (o) {
                                      return o.selected
                                    })
                                    .map(function (o) {
                                      var val =
                                        "_value" in o ? o._value : o.value
                                      return val
                                    })
                                  _vm.$set(
                                    _vm.eventForm,
                                    "startMinute",
                                    $event.target.multiple
                                      ? $$selectedVal
                                      : $$selectedVal[0]
                                  )
                                },
                              },
                            },
                            _vm._l(_vm.minutes, function (m) {
                              return _c(
                                "option",
                                { key: m, domProps: { value: m } },
                                [_vm._v(_vm._s(String(m).padStart(2, "0")))]
                              )
                            }),
                            0
                          ),
                          _vm._v(" "),
                          _c(
                            "select",
                            {
                              directives: [
                                {
                                  name: "model",
                                  rawName: "v-model",
                                  value: _vm.eventForm.startPeriod,
                                  expression: "eventForm.startPeriod",
                                },
                              ],
                              staticClass: "form-control time-select",
                              on: {
                                change: function ($event) {
                                  var $$selectedVal = Array.prototype.filter
                                    .call($event.target.options, function (o) {
                                      return o.selected
                                    })
                                    .map(function (o) {
                                      var val =
                                        "_value" in o ? o._value : o.value
                                      return val
                                    })
                                  _vm.$set(
                                    _vm.eventForm,
                                    "startPeriod",
                                    $event.target.multiple
                                      ? $$selectedVal
                                      : $$selectedVal[0]
                                  )
                                },
                              },
                            },
                            [
                              _c("option", { attrs: { value: "AM" } }, [
                                _vm._v("AM"),
                              ]),
                              _vm._v(" "),
                              _c("option", { attrs: { value: "PM" } }, [
                                _vm._v("PM"),
                              ]),
                            ]
                          ),
                        ]),
                      ]),
                      _vm._v(" "),
                      _c("div", { staticClass: "form-group" }, [
                        _vm._m(4),
                        _vm._v(" "),
                        _c("input", {
                          directives: [
                            {
                              name: "model",
                              rawName: "v-model",
                              value: _vm.eventForm.maxParticipants,
                              expression: "eventForm.maxParticipants",
                            },
                          ],
                          staticClass: "form-control",
                          attrs: { type: "number", min: "1", required: "" },
                          domProps: { value: _vm.eventForm.maxParticipants },
                          on: {
                            input: function ($event) {
                              if ($event.target.composing) {
                                return
                              }
                              _vm.$set(
                                _vm.eventForm,
                                "maxParticipants",
                                $event.target.value
                              )
                            },
                          },
                        }),
                      ]),
                      _vm._v(" "),
                      _c("div", { staticClass: "form-group" }, [
                        _c("label", [_vm._v("End time")]),
                        _vm._v(" "),
                        _c("div", { staticClass: "time-input-group" }, [
                          _c(
                            "select",
                            {
                              directives: [
                                {
                                  name: "model",
                                  rawName: "v-model",
                                  value: _vm.eventForm.endHour,
                                  expression: "eventForm.endHour",
                                },
                              ],
                              staticClass: "form-control time-select",
                              on: {
                                change: function ($event) {
                                  var $$selectedVal = Array.prototype.filter
                                    .call($event.target.options, function (o) {
                                      return o.selected
                                    })
                                    .map(function (o) {
                                      var val =
                                        "_value" in o ? o._value : o.value
                                      return val
                                    })
                                  _vm.$set(
                                    _vm.eventForm,
                                    "endHour",
                                    $event.target.multiple
                                      ? $$selectedVal
                                      : $$selectedVal[0]
                                  )
                                },
                              },
                            },
                            _vm._l(_vm.hours, function (h) {
                              return _c(
                                "option",
                                { key: h, domProps: { value: h } },
                                [_vm._v(_vm._s(String(h).padStart(2, "0")))]
                              )
                            }),
                            0
                          ),
                          _vm._v(" "),
                          _c(
                            "select",
                            {
                              directives: [
                                {
                                  name: "model",
                                  rawName: "v-model",
                                  value: _vm.eventForm.endMinute,
                                  expression: "eventForm.endMinute",
                                },
                              ],
                              staticClass: "form-control time-select",
                              on: {
                                change: function ($event) {
                                  var $$selectedVal = Array.prototype.filter
                                    .call($event.target.options, function (o) {
                                      return o.selected
                                    })
                                    .map(function (o) {
                                      var val =
                                        "_value" in o ? o._value : o.value
                                      return val
                                    })
                                  _vm.$set(
                                    _vm.eventForm,
                                    "endMinute",
                                    $event.target.multiple
                                      ? $$selectedVal
                                      : $$selectedVal[0]
                                  )
                                },
                              },
                            },
                            _vm._l(_vm.minutes, function (m) {
                              return _c(
                                "option",
                                { key: m, domProps: { value: m } },
                                [_vm._v(_vm._s(String(m).padStart(2, "0")))]
                              )
                            }),
                            0
                          ),
                          _vm._v(" "),
                          _c(
                            "select",
                            {
                              directives: [
                                {
                                  name: "model",
                                  rawName: "v-model",
                                  value: _vm.eventForm.endPeriod,
                                  expression: "eventForm.endPeriod",
                                },
                              ],
                              staticClass: "form-control time-select",
                              on: {
                                change: function ($event) {
                                  var $$selectedVal = Array.prototype.filter
                                    .call($event.target.options, function (o) {
                                      return o.selected
                                    })
                                    .map(function (o) {
                                      var val =
                                        "_value" in o ? o._value : o.value
                                      return val
                                    })
                                  _vm.$set(
                                    _vm.eventForm,
                                    "endPeriod",
                                    $event.target.multiple
                                      ? $$selectedVal
                                      : $$selectedVal[0]
                                  )
                                },
                              },
                            },
                            [
                              _c("option", { attrs: { value: "AM" } }, [
                                _vm._v("AM"),
                              ]),
                              _vm._v(" "),
                              _c("option", { attrs: { value: "PM" } }, [
                                _vm._v("PM"),
                              ]),
                            ]
                          ),
                        ]),
                      ]),
                      _vm._v(" "),
                      _c("div", { staticClass: "form-group" }, [
                        _c("label", [_vm._v("Instructor")]),
                        _vm._v(" "),
                        _c("div", { staticClass: "input-with-icon" }, [
                          _c(
                            "select",
                            {
                              directives: [
                                {
                                  name: "model",
                                  rawName: "v-model",
                                  value: _vm.eventForm.coachId,
                                  expression: "eventForm.coachId",
                                },
                              ],
                              staticClass: "form-control",
                              on: {
                                change: function ($event) {
                                  var $$selectedVal = Array.prototype.filter
                                    .call($event.target.options, function (o) {
                                      return o.selected
                                    })
                                    .map(function (o) {
                                      var val =
                                        "_value" in o ? o._value : o.value
                                      return val
                                    })
                                  _vm.$set(
                                    _vm.eventForm,
                                    "coachId",
                                    $event.target.multiple
                                      ? $$selectedVal
                                      : $$selectedVal[0]
                                  )
                                },
                              },
                            },
                            [
                              _c("option", { attrs: { value: "" } }, [
                                _vm._v("None"),
                              ]),
                              _vm._v(" "),
                              _vm._l(_vm.coaches, function (coach) {
                                return _c(
                                  "option",
                                  {
                                    key: coach.id,
                                    domProps: { value: coach.id },
                                  },
                                  [
                                    _vm._v(
                                      "\n                                    " +
                                        _vm._s(coach.name) +
                                        "\n                                "
                                    ),
                                  ]
                                )
                              }),
                            ],
                            2
                          ),
                          _vm._v(" "),
                          _c("i", { staticClass: "fas fa-user input-icon" }),
                        ]),
                      ]),
                      _vm._v(" "),
                      _c("div", { staticClass: "form-group" }, [
                        _c("label", [_vm._v("Members")]),
                        _vm._v(" "),
                        _c("div", { staticClass: "input-with-icon" }, [
                          _c(
                            "select",
                            {
                              directives: [
                                {
                                  name: "model",
                                  rawName: "v-model",
                                  value: _vm.eventForm.memberIds,
                                  expression: "eventForm.memberIds",
                                },
                              ],
                              staticClass: "form-control",
                              staticStyle: { "min-height": "120px" },
                              attrs: { multiple: "", size: "5" },
                              on: {
                                change: function ($event) {
                                  var $$selectedVal = Array.prototype.filter
                                    .call($event.target.options, function (o) {
                                      return o.selected
                                    })
                                    .map(function (o) {
                                      var val =
                                        "_value" in o ? o._value : o.value
                                      return val
                                    })
                                  _vm.$set(
                                    _vm.eventForm,
                                    "memberIds",
                                    $event.target.multiple
                                      ? $$selectedVal
                                      : $$selectedVal[0]
                                  )
                                },
                              },
                            },
                            _vm._l(_vm.members, function (member) {
                              return _c(
                                "option",
                                {
                                  key: member.id,
                                  domProps: { value: member.id },
                                },
                                [
                                  _vm._v(
                                    "\n                                    " +
                                      _vm._s(member.name) +
                                      "\n                                "
                                  ),
                                ]
                              )
                            }),
                            0
                          ),
                          _vm._v(" "),
                          _c("i", { staticClass: "fas fa-users input-icon" }),
                        ]),
                        _vm._v(" "),
                        _vm.eventForm.memberIds &&
                        _vm.eventForm.memberIds.length > 0
                          ? _c(
                              "div",
                              { staticClass: "selected-members mt-2" },
                              [
                                _c(
                                  "small",
                                  { staticClass: "text-muted" },
                                  [
                                    _c("strong", [
                                      _vm._v(
                                        "Selected (" +
                                          _vm._s(
                                            _vm.eventForm.memberIds.length
                                          ) +
                                          "):"
                                      ),
                                    ]),
                                    _vm._v(" "),
                                    _vm._l(
                                      _vm.eventForm.memberIds,
                                      function (memberId, index) {
                                        return _c(
                                          "span",
                                          {
                                            key: memberId,
                                            staticClass:
                                              "badge badge-primary mr-1",
                                          },
                                          [
                                            _vm._v(
                                              "\n                                    " +
                                                _vm._s(
                                                  _vm.getMemberName(memberId)
                                                ) +
                                                "\n                                    "
                                            ),
                                            index <
                                            _vm.eventForm.memberIds.length - 1
                                              ? _c("span", [_vm._v(",")])
                                              : _vm._e(),
                                          ]
                                        )
                                      }
                                    ),
                                  ],
                                  2
                                ),
                              ]
                            )
                          : _vm._e(),
                        _vm._v(" "),
                        _vm._m(5),
                      ]),
                      _vm._v(" "),
                      _c("div", { staticClass: "form-group" }, [
                        _c("label", [_vm._v("Recurrency")]),
                        _vm._v(" "),
                        _c(
                          "select",
                          {
                            directives: [
                              {
                                name: "model",
                                rawName: "v-model",
                                value: _vm.eventForm.recurrency,
                                expression: "eventForm.recurrency",
                              },
                            ],
                            staticClass: "form-control",
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
                                  _vm.eventForm,
                                  "recurrency",
                                  $event.target.multiple
                                    ? $$selectedVal
                                    : $$selectedVal[0]
                                )
                              },
                            },
                          },
                          [
                            _c("option", { attrs: { value: "" } }, [
                              _vm._v("None"),
                            ]),
                            _vm._v(" "),
                            _c("option", { attrs: { value: "daily" } }, [
                              _vm._v("Daily"),
                            ]),
                            _vm._v(" "),
                            _c("option", { attrs: { value: "weekly" } }, [
                              _vm._v("Weekly"),
                            ]),
                            _vm._v(" "),
                            _c("option", { attrs: { value: "monthly" } }, [
                              _vm._v("Monthly"),
                            ]),
                          ]
                        ),
                      ]),
                      _vm._v(" "),
                      _c("div", { staticClass: "form-group" }, [
                        _c("label", [_vm._v("Location")]),
                        _vm._v(" "),
                        _c(
                          "select",
                          {
                            directives: [
                              {
                                name: "model",
                                rawName: "v-model",
                                value: _vm.eventForm.locationId,
                                expression: "eventForm.locationId",
                              },
                            ],
                            staticClass: "form-control",
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
                                  _vm.eventForm,
                                  "locationId",
                                  $event.target.multiple
                                    ? $$selectedVal
                                    : $$selectedVal[0]
                                )
                              },
                            },
                          },
                          [
                            _c("option", { attrs: { value: "" } }, [
                              _vm._v("Choose a location"),
                            ]),
                            _vm._v(" "),
                            _vm._l(_vm.locations, function (location) {
                              return _c(
                                "option",
                                {
                                  key: location.id,
                                  domProps: { value: location.id },
                                },
                                [
                                  _vm._v(
                                    "\n                                " +
                                      _vm._s(location.name) +
                                      "\n                            "
                                  ),
                                ]
                              )
                            }),
                          ],
                          2
                        ),
                      ]),
                      _vm._v(" "),
                      _c("div", { staticClass: "form-group" }, [
                        _c("label", [_vm._v("Description")]),
                        _vm._v(" "),
                        _c("textarea", {
                          directives: [
                            {
                              name: "model",
                              rawName: "v-model",
                              value: _vm.eventForm.description,
                              expression: "eventForm.description",
                            },
                          ],
                          staticClass: "form-control",
                          attrs: {
                            rows: "4",
                            placeholder: "Enter event description",
                          },
                          domProps: { value: _vm.eventForm.description },
                          on: {
                            input: function ($event) {
                              if ($event.target.composing) {
                                return
                              }
                              _vm.$set(
                                _vm.eventForm,
                                "description",
                                $event.target.value
                              )
                            },
                          },
                        }),
                      ]),
                      _vm._v(" "),
                      _c("div", { staticClass: "form-group" }, [
                        _c("label", [_vm._v("Note to employees")]),
                        _vm._v(" "),
                        _c("textarea", {
                          directives: [
                            {
                              name: "model",
                              rawName: "v-model",
                              value: _vm.eventForm.noteToEmployees,
                              expression: "eventForm.noteToEmployees",
                            },
                          ],
                          staticClass: "form-control",
                          attrs: {
                            rows: "4",
                            placeholder: "Internal notes for staff",
                          },
                          domProps: { value: _vm.eventForm.noteToEmployees },
                          on: {
                            input: function ($event) {
                              if ($event.target.composing) {
                                return
                              }
                              _vm.$set(
                                _vm.eventForm,
                                "noteToEmployees",
                                $event.target.value
                              )
                            },
                          },
                        }),
                      ]),
                      _vm._v(" "),
                      _c("div", { staticClass: "form-group" }, [
                        _c("label", [_vm._v("Bookable in advance")]),
                        _vm._v(" "),
                        _c("div", { staticClass: "input-group-combined" }, [
                          _c("input", {
                            directives: [
                              {
                                name: "model",
                                rawName: "v-model",
                                value: _vm.eventForm.bookableInAdvance,
                                expression: "eventForm.bookableInAdvance",
                              },
                            ],
                            staticClass: "form-control",
                            attrs: { type: "number", min: "1", value: "1" },
                            domProps: {
                              value: _vm.eventForm.bookableInAdvance,
                            },
                            on: {
                              input: function ($event) {
                                if ($event.target.composing) {
                                  return
                                }
                                _vm.$set(
                                  _vm.eventForm,
                                  "bookableInAdvance",
                                  $event.target.value
                                )
                              },
                            },
                          }),
                          _vm._v(" "),
                          _c(
                            "select",
                            {
                              directives: [
                                {
                                  name: "model",
                                  rawName: "v-model",
                                  value: _vm.eventForm.bookableUnit,
                                  expression: "eventForm.bookableUnit",
                                },
                              ],
                              staticClass: "form-control",
                              on: {
                                change: function ($event) {
                                  var $$selectedVal = Array.prototype.filter
                                    .call($event.target.options, function (o) {
                                      return o.selected
                                    })
                                    .map(function (o) {
                                      var val =
                                        "_value" in o ? o._value : o.value
                                      return val
                                    })
                                  _vm.$set(
                                    _vm.eventForm,
                                    "bookableUnit",
                                    $event.target.multiple
                                      ? $$selectedVal
                                      : $$selectedVal[0]
                                  )
                                },
                              },
                            },
                            [
                              _c("option", { attrs: { value: "weeks" } }, [
                                _vm._v("Weeks"),
                              ]),
                              _vm._v(" "),
                              _c("option", { attrs: { value: "days" } }, [
                                _vm._v("Days"),
                              ]),
                              _vm._v(" "),
                              _c("option", { attrs: { value: "months" } }, [
                                _vm._v("Months"),
                              ]),
                            ]
                          ),
                        ]),
                      ]),
                      _vm._v(" "),
                      _c("div", { staticClass: "form-group" }, [
                        _c("label", [_vm._v("Credit type")]),
                        _vm._v(" "),
                        _c("div", { staticClass: "input-with-actions" }, [
                          _c("input", {
                            directives: [
                              {
                                name: "model",
                                rawName: "v-model",
                                value: _vm.eventForm.creditType,
                                expression: "eventForm.creditType",
                              },
                            ],
                            staticClass: "form-control",
                            attrs: {
                              type: "text",
                              value: "No credits",
                              readonly: "",
                            },
                            domProps: { value: _vm.eventForm.creditType },
                            on: {
                              input: function ($event) {
                                if ($event.target.composing) {
                                  return
                                }
                                _vm.$set(
                                  _vm.eventForm,
                                  "creditType",
                                  $event.target.value
                                )
                              },
                            },
                          }),
                          _vm._v(" "),
                          _c("i", {
                            staticClass: "fas fa-pencil-alt action-icon",
                            on: {
                              click: function ($event) {
                                _vm.editCreditType = true
                              },
                            },
                          }),
                          _vm._v(" "),
                          _c("i", {
                            staticClass: "fas fa-info-circle info-icon",
                          }),
                        ]),
                      ]),
                      _vm._v(" "),
                      _c("div", { staticClass: "form-group" }, [
                        _c("label", [
                          _vm._v("Cancel activity if no participants"),
                        ]),
                        _vm._v(" "),
                        _c("div", { staticClass: "input-with-info" }, [
                          _c(
                            "select",
                            {
                              directives: [
                                {
                                  name: "model",
                                  rawName: "v-model",
                                  value: _vm.eventForm.cancelIfNoParticipants,
                                  expression:
                                    "eventForm.cancelIfNoParticipants",
                                },
                              ],
                              staticClass: "form-control",
                              on: {
                                change: function ($event) {
                                  var $$selectedVal = Array.prototype.filter
                                    .call($event.target.options, function (o) {
                                      return o.selected
                                    })
                                    .map(function (o) {
                                      var val =
                                        "_value" in o ? o._value : o.value
                                      return val
                                    })
                                  _vm.$set(
                                    _vm.eventForm,
                                    "cancelIfNoParticipants",
                                    $event.target.multiple
                                      ? $$selectedVal
                                      : $$selectedVal[0]
                                  )
                                },
                              },
                            },
                            [
                              _c("option", { attrs: { value: "always" } }, [
                                _vm._v("Always before the event starts"),
                              ]),
                              _vm._v(" "),
                              _c("option", { attrs: { value: "never" } }, [
                                _vm._v("Never"),
                              ]),
                              _vm._v(" "),
                              _c("option", { attrs: { value: "1hour" } }, [
                                _vm._v("1 hour before"),
                              ]),
                              _vm._v(" "),
                              _c("option", { attrs: { value: "2hours" } }, [
                                _vm._v("2 hours before"),
                              ]),
                            ]
                          ),
                          _vm._v(" "),
                          _c("i", {
                            staticClass: "fas fa-info-circle info-icon",
                          }),
                        ]),
                      ]),
                      _vm._v(" "),
                      _c("div", { staticClass: "form-group" }, [
                        _c("label", [_vm._v("Free cancellation period")]),
                        _vm._v(" "),
                        _c("div", { staticClass: "input-with-info" }, [
                          _c(
                            "select",
                            {
                              directives: [
                                {
                                  name: "model",
                                  rawName: "v-model",
                                  value: _vm.eventForm.freeCancellationPeriod,
                                  expression:
                                    "eventForm.freeCancellationPeriod",
                                },
                              ],
                              staticClass: "form-control",
                              on: {
                                change: function ($event) {
                                  var $$selectedVal = Array.prototype.filter
                                    .call($event.target.options, function (o) {
                                      return o.selected
                                    })
                                    .map(function (o) {
                                      var val =
                                        "_value" in o ? o._value : o.value
                                      return val
                                    })
                                  _vm.$set(
                                    _vm.eventForm,
                                    "freeCancellationPeriod",
                                    $event.target.multiple
                                      ? $$selectedVal
                                      : $$selectedVal[0]
                                  )
                                },
                              },
                            },
                            [
                              _c("option", { attrs: { value: "always" } }, [
                                _vm._v("Always before the event starts"),
                              ]),
                              _vm._v(" "),
                              _c("option", { attrs: { value: "1hour" } }, [
                                _vm._v("1 hour before"),
                              ]),
                              _vm._v(" "),
                              _c("option", { attrs: { value: "2hours" } }, [
                                _vm._v("2 hours before"),
                              ]),
                              _vm._v(" "),
                              _c("option", { attrs: { value: "1day" } }, [
                                _vm._v("1 day before"),
                              ]),
                            ]
                          ),
                          _vm._v(" "),
                          _c("i", {
                            staticClass: "fas fa-info-circle info-icon",
                          }),
                        ]),
                      ]),
                      _vm._v(" "),
                      _c("div", { staticClass: "form-group" }, [
                        _c("label", [_vm._v("Link")]),
                        _vm._v(" "),
                        _c("div", { staticClass: "input-with-info" }, [
                          _c("input", {
                            directives: [
                              {
                                name: "model",
                                rawName: "v-model",
                                value: _vm.eventForm.link,
                                expression: "eventForm.link",
                              },
                            ],
                            staticClass: "form-control",
                            attrs: { type: "url", placeholder: "https://..." },
                            domProps: { value: _vm.eventForm.link },
                            on: {
                              input: function ($event) {
                                if ($event.target.composing) {
                                  return
                                }
                                _vm.$set(
                                  _vm.eventForm,
                                  "link",
                                  $event.target.value
                                )
                              },
                            },
                          }),
                          _vm._v(" "),
                          _c("i", {
                            staticClass: "fas fa-info-circle info-icon",
                          }),
                        ]),
                      ]),
                      _vm._v(" "),
                      _c("div", { staticClass: "form-group" }, [
                        _c("label", [_vm._v("Text")]),
                        _vm._v(" "),
                        _c("div", { staticClass: "input-with-info" }, [
                          _c("input", {
                            directives: [
                              {
                                name: "model",
                                rawName: "v-model",
                                value: _vm.eventForm.linkText,
                                expression: "eventForm.linkText",
                              },
                            ],
                            staticClass: "form-control",
                            attrs: { type: "text", placeholder: "Link text" },
                            domProps: { value: _vm.eventForm.linkText },
                            on: {
                              input: function ($event) {
                                if ($event.target.composing) {
                                  return
                                }
                                _vm.$set(
                                  _vm.eventForm,
                                  "linkText",
                                  $event.target.value
                                )
                              },
                            },
                          }),
                          _vm._v(" "),
                          _c("i", {
                            staticClass: "fas fa-info-circle info-icon",
                          }),
                        ]),
                      ]),
                      _vm._v(" "),
                      _c("div", { staticClass: "form-group" }, [
                        _c("label", { staticClass: "toggle-label-inline" }, [
                          _c("span", [_vm._v("Show link before booking")]),
                          _vm._v(" "),
                          _c("label", { staticClass: "switch" }, [
                            _c("input", {
                              directives: [
                                {
                                  name: "model",
                                  rawName: "v-model",
                                  value: _vm.eventForm.showLinkBeforeBooking,
                                  expression: "eventForm.showLinkBeforeBooking",
                                },
                              ],
                              attrs: { type: "checkbox" },
                              domProps: {
                                checked: Array.isArray(
                                  _vm.eventForm.showLinkBeforeBooking
                                )
                                  ? _vm._i(
                                      _vm.eventForm.showLinkBeforeBooking,
                                      null
                                    ) > -1
                                  : _vm.eventForm.showLinkBeforeBooking,
                              },
                              on: {
                                change: function ($event) {
                                  var $$a = _vm.eventForm.showLinkBeforeBooking,
                                    $$el = $event.target,
                                    $$c = $$el.checked ? true : false
                                  if (Array.isArray($$a)) {
                                    var $$v = null,
                                      $$i = _vm._i($$a, $$v)
                                    if ($$el.checked) {
                                      $$i < 0 &&
                                        _vm.$set(
                                          _vm.eventForm,
                                          "showLinkBeforeBooking",
                                          $$a.concat([$$v])
                                        )
                                    } else {
                                      $$i > -1 &&
                                        _vm.$set(
                                          _vm.eventForm,
                                          "showLinkBeforeBooking",
                                          $$a
                                            .slice(0, $$i)
                                            .concat($$a.slice($$i + 1))
                                        )
                                    }
                                  } else {
                                    _vm.$set(
                                      _vm.eventForm,
                                      "showLinkBeforeBooking",
                                      $$c
                                    )
                                  }
                                },
                              },
                            }),
                            _vm._v(" "),
                            _c("span", { staticClass: "slider" }),
                          ]),
                          _vm._v(" "),
                          _c("i", {
                            staticClass: "fas fa-info-circle info-icon",
                          }),
                        ]),
                      ]),
                      _vm._v(" "),
                      _c("div", { staticClass: "form-group" }, [
                        _c("label", { staticClass: "checkbox-label" }, [
                          _c("input", {
                            directives: [
                              {
                                name: "model",
                                rawName: "v-model",
                                value: _vm.eventForm.enableOnlineBooking,
                                expression: "eventForm.enableOnlineBooking",
                              },
                            ],
                            staticClass: "checkbox-input",
                            attrs: { type: "checkbox" },
                            domProps: {
                              checked: Array.isArray(
                                _vm.eventForm.enableOnlineBooking
                              )
                                ? _vm._i(
                                    _vm.eventForm.enableOnlineBooking,
                                    null
                                  ) > -1
                                : _vm.eventForm.enableOnlineBooking,
                            },
                            on: {
                              change: function ($event) {
                                var $$a = _vm.eventForm.enableOnlineBooking,
                                  $$el = $event.target,
                                  $$c = $$el.checked ? true : false
                                if (Array.isArray($$a)) {
                                  var $$v = null,
                                    $$i = _vm._i($$a, $$v)
                                  if ($$el.checked) {
                                    $$i < 0 &&
                                      _vm.$set(
                                        _vm.eventForm,
                                        "enableOnlineBooking",
                                        $$a.concat([$$v])
                                      )
                                  } else {
                                    $$i > -1 &&
                                      _vm.$set(
                                        _vm.eventForm,
                                        "enableOnlineBooking",
                                        $$a
                                          .slice(0, $$i)
                                          .concat($$a.slice($$i + 1))
                                      )
                                  }
                                } else {
                                  _vm.$set(
                                    _vm.eventForm,
                                    "enableOnlineBooking",
                                    $$c
                                  )
                                }
                              },
                            },
                          }),
                          _vm._v(" "),
                          _c("span", [_vm._v("Enable online booking")]),
                        ]),
                      ]),
                      _vm._v(" "),
                      _c("div", { staticClass: "modal-actions" }, [
                        _c(
                          "button",
                          {
                            staticClass: "btn btn-secondary",
                            attrs: { type: "button", disabled: _vm.saving },
                            on: { click: _vm.closeCreateModal },
                          },
                          [
                            _vm._v(
                              "\n                            Cancel\n                        "
                            ),
                          ]
                        ),
                        _vm._v(" "),
                        _c(
                          "button",
                          {
                            staticClass: "btn btn-primary",
                            attrs: { type: "submit", disabled: _vm.saving },
                          },
                          [
                            _vm.saving
                              ? _c("span", [
                                  _c("i", {
                                    staticClass: "fas fa-spinner fa-spin",
                                  }),
                                  _vm._v(
                                    "\n                                " +
                                      _vm._s(
                                        _vm.isEditing
                                          ? "Updating..."
                                          : "Saving..."
                                      ) +
                                      "\n                            "
                                  ),
                                ])
                              : _c("span", [
                                  _vm._v(
                                    _vm._s(_vm.isEditing ? "Update" : "Save")
                                  ),
                                ]),
                          ]
                        ),
                      ]),
                    ]
                  ),
                ]),
              ]),
            ]
          )
        : _vm._e(),
      _vm._v(" "),
      _c(
        "b-modal",
        {
          attrs: {
            id: "schedule-activity-modal",
            title: "Basic Activity Information",
            centered: "",
            "hide-footer": "",
          },
          on: { hide: _vm.onActivityModalHide },
          model: {
            value: _vm.showActivityModal,
            callback: function ($$v) {
              _vm.showActivityModal = $$v
            },
            expression: "showActivityModal",
          },
        },
        [
          _c("div", { staticClass: "form-group" }, [
            _c("label", [
              _vm._v("Name "),
              _c("span", { staticClass: "text-danger" }, [_vm._v("*")]),
            ]),
            _vm._v(" "),
            _c("input", {
              directives: [
                {
                  name: "model",
                  rawName: "v-model",
                  value: _vm.activityForm.name,
                  expression: "activityForm.name",
                },
              ],
              staticClass: "form-control",
              attrs: { type: "text", placeholder: "e.g. Jogging" },
              domProps: { value: _vm.activityForm.name },
              on: {
                input: function ($event) {
                  if ($event.target.composing) {
                    return
                  }
                  _vm.$set(_vm.activityForm, "name", $event.target.value)
                },
              },
            }),
          ]),
          _vm._v(" "),
          _c("div", { staticClass: "form-group" }, [
            _c("label", [_vm._v("Visible for")]),
            _vm._v(" "),
            _c(
              "select",
              {
                directives: [
                  {
                    name: "model",
                    rawName: "v-model",
                    value: _vm.activityForm.visible_for,
                    expression: "activityForm.visible_for",
                  },
                ],
                staticClass: "form-control",
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
                      _vm.activityForm,
                      "visible_for",
                      $event.target.multiple ? $$selectedVal : $$selectedVal[0]
                    )
                  },
                },
              },
              [
                _c("option", { attrs: { value: "only_myself" } }, [
                  _vm._v("Only myself"),
                ]),
                _vm._v(" "),
                _c("option", { attrs: { value: "gym" } }, [_vm._v("Gym")]),
                _vm._v(" "),
                _c("option", { attrs: { value: "everyone" } }, [
                  _vm._v("Everyone"),
                ]),
              ]
            ),
          ]),
          _vm._v(" "),
          _c("div", { staticClass: "form-group" }, [
            _c("label", [_vm._v("Category")]),
            _vm._v(" "),
            _c("input", {
              directives: [
                {
                  name: "model",
                  rawName: "v-model",
                  value: _vm.activityForm.category,
                  expression: "activityForm.category",
                },
              ],
              staticClass: "form-control",
              attrs: { type: "text", placeholder: "e.g. Cardio" },
              domProps: { value: _vm.activityForm.category },
              on: {
                input: function ($event) {
                  if ($event.target.composing) {
                    return
                  }
                  _vm.$set(_vm.activityForm, "category", $event.target.value)
                },
              },
            }),
          ]),
          _vm._v(" "),
          _c("div", { staticClass: "form-group" }, [
            _c("label", [_vm._v("Type")]),
            _vm._v(" "),
            _c("div", { staticClass: "d-flex" }, [
              _c("div", { staticClass: "custom-control custom-radio mr-3" }, [
                _c("input", {
                  directives: [
                    {
                      name: "model",
                      rawName: "v-model",
                      value: _vm.activityForm.type,
                      expression: "activityForm.type",
                    },
                  ],
                  staticClass: "custom-control-input",
                  attrs: {
                    type: "radio",
                    id: "actTypeDuration",
                    value: "duration",
                  },
                  domProps: {
                    checked: _vm._q(_vm.activityForm.type, "duration"),
                  },
                  on: {
                    change: function ($event) {
                      return _vm.$set(_vm.activityForm, "type", "duration")
                    },
                  },
                }),
                _vm._v(" "),
                _c(
                  "label",
                  {
                    staticClass: "custom-control-label",
                    attrs: { for: "actTypeDuration" },
                  },
                  [_vm._v("Duration based")]
                ),
              ]),
              _vm._v(" "),
              _c("div", { staticClass: "custom-control custom-radio" }, [
                _c("input", {
                  directives: [
                    {
                      name: "model",
                      rawName: "v-model",
                      value: _vm.activityForm.type,
                      expression: "activityForm.type",
                    },
                  ],
                  staticClass: "custom-control-input",
                  attrs: { type: "radio", id: "actTypeSet", value: "set" },
                  domProps: { checked: _vm._q(_vm.activityForm.type, "set") },
                  on: {
                    change: function ($event) {
                      return _vm.$set(_vm.activityForm, "type", "set")
                    },
                  },
                }),
                _vm._v(" "),
                _c(
                  "label",
                  {
                    staticClass: "custom-control-label",
                    attrs: { for: "actTypeSet" },
                  },
                  [_vm._v("Set based")]
                ),
              ]),
            ]),
          ]),
          _vm._v(" "),
          _c("div", { staticClass: "form-group" }, [
            _c("label", { staticClass: "d-flex align-items-center mb-0" }, [
              _c("input", {
                directives: [
                  {
                    name: "model",
                    rawName: "v-model",
                    value: _vm.activityForm.can_be_added_in_schedule,
                    expression: "activityForm.can_be_added_in_schedule",
                  },
                ],
                staticClass: "mr-2",
                attrs: { type: "checkbox" },
                domProps: {
                  checked: Array.isArray(
                    _vm.activityForm.can_be_added_in_schedule
                  )
                    ? _vm._i(_vm.activityForm.can_be_added_in_schedule, null) >
                      -1
                    : _vm.activityForm.can_be_added_in_schedule,
                },
                on: {
                  change: function ($event) {
                    var $$a = _vm.activityForm.can_be_added_in_schedule,
                      $$el = $event.target,
                      $$c = $$el.checked ? true : false
                    if (Array.isArray($$a)) {
                      var $$v = null,
                        $$i = _vm._i($$a, $$v)
                      if ($$el.checked) {
                        $$i < 0 &&
                          _vm.$set(
                            _vm.activityForm,
                            "can_be_added_in_schedule",
                            $$a.concat([$$v])
                          )
                      } else {
                        $$i > -1 &&
                          _vm.$set(
                            _vm.activityForm,
                            "can_be_added_in_schedule",
                            $$a.slice(0, $$i).concat($$a.slice($$i + 1))
                          )
                      }
                    } else {
                      _vm.$set(
                        _vm.activityForm,
                        "can_be_added_in_schedule",
                        $$c
                      )
                    }
                  },
                },
              }),
              _vm._v(
                "\n                Can be added in schedule\n            "
              ),
            ]),
          ]),
          _vm._v(" "),
          _c("div", { staticClass: "form-row" }, [
            _c("div", { staticClass: "form-group col-md-6" }, [
              _c("label", [_vm._v("Color")]),
              _vm._v(" "),
              _c("input", {
                directives: [
                  {
                    name: "model",
                    rawName: "v-model",
                    value: _vm.activityForm.color,
                    expression: "activityForm.color",
                  },
                ],
                staticClass: "form-control",
                attrs: { type: "color" },
                domProps: { value: _vm.activityForm.color },
                on: {
                  input: function ($event) {
                    if ($event.target.composing) {
                      return
                    }
                    _vm.$set(_vm.activityForm, "color", $event.target.value)
                  },
                },
              }),
            ]),
            _vm._v(" "),
            _c("div", { staticClass: "form-group col-md-6" }, [
              _c("label", [_vm._v("MET")]),
              _vm._v(" "),
              _c("input", {
                directives: [
                  {
                    name: "model",
                    rawName: "v-model.number",
                    value: _vm.activityForm.met,
                    expression: "activityForm.met",
                    modifiers: { number: true },
                  },
                ],
                staticClass: "form-control",
                attrs: { type: "number", step: "0.1", placeholder: "e.g. 7.0" },
                domProps: { value: _vm.activityForm.met },
                on: {
                  input: function ($event) {
                    if ($event.target.composing) {
                      return
                    }
                    _vm.$set(
                      _vm.activityForm,
                      "met",
                      _vm._n($event.target.value)
                    )
                  },
                  blur: function ($event) {
                    return _vm.$forceUpdate()
                  },
                },
              }),
            ]),
          ]),
          _vm._v(" "),
          _c("div", { staticClass: "form-row" }, [
            _c("div", { staticClass: "form-group col-md-6" }, [
              _c("label", [_vm._v("Default duration (minutes)")]),
              _vm._v(" "),
              _c("input", {
                directives: [
                  {
                    name: "model",
                    rawName: "v-model.number",
                    value: _vm.activityForm.default_duration_minutes,
                    expression: "activityForm.default_duration_minutes",
                    modifiers: { number: true },
                  },
                ],
                staticClass: "form-control",
                attrs: { type: "number", min: "1" },
                domProps: { value: _vm.activityForm.default_duration_minutes },
                on: {
                  input: function ($event) {
                    if ($event.target.composing) {
                      return
                    }
                    _vm.$set(
                      _vm.activityForm,
                      "default_duration_minutes",
                      _vm._n($event.target.value)
                    )
                  },
                  blur: function ($event) {
                    return _vm.$forceUpdate()
                  },
                },
              }),
            ]),
            _vm._v(" "),
            _c("div", { staticClass: "form-group col-md-6" }, [
              _c("label", [_vm._v("Difficulty")]),
              _vm._v(" "),
              _c(
                "select",
                {
                  directives: [
                    {
                      name: "model",
                      rawName: "v-model",
                      value: _vm.activityForm.difficulty,
                      expression: "activityForm.difficulty",
                    },
                  ],
                  staticClass: "form-control",
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
                        _vm.activityForm,
                        "difficulty",
                        $event.target.multiple
                          ? $$selectedVal
                          : $$selectedVal[0]
                      )
                    },
                  },
                },
                [
                  _c("option", { attrs: { value: "" } }, [_vm._v("--")]),
                  _vm._v(" "),
                  _c("option", { attrs: { value: "novice" } }, [
                    _vm._v("Novice"),
                  ]),
                  _vm._v(" "),
                  _c("option", { attrs: { value: "intermediate" } }, [
                    _vm._v("Intermediate"),
                  ]),
                  _vm._v(" "),
                  _c("option", { attrs: { value: "advanced" } }, [
                    _vm._v("Advanced"),
                  ]),
                ]
              ),
            ]),
          ]),
          _vm._v(" "),
          _c("div", { staticClass: "form-group" }, [
            _c("label", [_vm._v("Tags (comma separated)")]),
            _vm._v(" "),
            _c("input", {
              directives: [
                {
                  name: "model",
                  rawName: "v-model",
                  value: _vm.activityForm.tags,
                  expression: "activityForm.tags",
                },
              ],
              staticClass: "form-control",
              attrs: { type: "text", placeholder: "e.g. cardio, running" },
              domProps: { value: _vm.activityForm.tags },
              on: {
                input: function ($event) {
                  if ($event.target.composing) {
                    return
                  }
                  _vm.$set(_vm.activityForm, "tags", $event.target.value)
                },
              },
            }),
          ]),
          _vm._v(" "),
          _c("div", { staticClass: "form-group" }, [
            _c("label", [_vm._v("Instructions")]),
            _vm._v(" "),
            _c("textarea", {
              directives: [
                {
                  name: "model",
                  rawName: "v-model",
                  value: _vm.activityForm.instructions,
                  expression: "activityForm.instructions",
                },
              ],
              staticClass: "form-control",
              attrs: { rows: "3" },
              domProps: { value: _vm.activityForm.instructions },
              on: {
                input: function ($event) {
                  if ($event.target.composing) {
                    return
                  }
                  _vm.$set(
                    _vm.activityForm,
                    "instructions",
                    $event.target.value
                  )
                },
              },
            }),
          ]),
          _vm._v(" "),
          _c("div", { staticClass: "form-row" }, [
            _c("div", { staticClass: "form-group col-md-6" }, [
              _c("label", [_vm._v("YouTube link (Male)")]),
              _vm._v(" "),
              _c("input", {
                directives: [
                  {
                    name: "model",
                    rawName: "v-model",
                    value: _vm.activityForm.youtube_url_male,
                    expression: "activityForm.youtube_url_male",
                  },
                ],
                staticClass: "form-control",
                attrs: { type: "url", placeholder: "https://..." },
                domProps: { value: _vm.activityForm.youtube_url_male },
                on: {
                  input: function ($event) {
                    if ($event.target.composing) {
                      return
                    }
                    _vm.$set(
                      _vm.activityForm,
                      "youtube_url_male",
                      $event.target.value
                    )
                  },
                },
              }),
            ]),
            _vm._v(" "),
            _c("div", { staticClass: "form-group col-md-6" }, [
              _c("label", [_vm._v("YouTube link (Female)")]),
              _vm._v(" "),
              _c("input", {
                directives: [
                  {
                    name: "model",
                    rawName: "v-model",
                    value: _vm.activityForm.youtube_url_female,
                    expression: "activityForm.youtube_url_female",
                  },
                ],
                staticClass: "form-control",
                attrs: { type: "url", placeholder: "https://..." },
                domProps: { value: _vm.activityForm.youtube_url_female },
                on: {
                  input: function ($event) {
                    if ($event.target.composing) {
                      return
                    }
                    _vm.$set(
                      _vm.activityForm,
                      "youtube_url_female",
                      $event.target.value
                    )
                  },
                },
              }),
            ]),
          ]),
          _vm._v(" "),
          _c("div", { staticClass: "d-flex justify-content-end" }, [
            _c(
              "button",
              {
                staticClass: "btn btn-secondary mr-2",
                attrs: { type: "button", disabled: _vm.activitySaving },
                on: {
                  click: function ($event) {
                    _vm.showActivityModal = false
                  },
                },
              },
              [_vm._v("\n                Cancel\n            ")]
            ),
            _vm._v(" "),
            _c(
              "button",
              {
                staticClass: "btn btn-primary",
                attrs: { type: "button", disabled: _vm.activitySaving },
                on: { click: _vm.saveActivity },
              },
              [
                _vm._v(
                  "\n                " +
                    _vm._s(_vm.activitySaving ? "Saving..." : "Save activity") +
                    "\n            "
                ),
              ]
            ),
          ]),
        ]
      ),
      _vm._v(" "),
      _c(
        "b-modal",
        {
          staticClass: "video-tutorial-modal",
          attrs: {
            title: "Schedule Tutorial",
            size: "lg",
            centered: "",
            "hide-footer": "",
          },
          on: { hide: _vm.closeVideoTutorialModal },
          model: {
            value: _vm.showVideoTutorialModal,
            callback: function ($$v) {
              _vm.showVideoTutorialModal = $$v
            },
            expression: "showVideoTutorialModal",
          },
        },
        [
          _c("div", { staticClass: "video-container" }, [
            _vm.videoError
              ? _c("div", { staticClass: "text-center py-4" }, [
                  _c("i", {
                    staticClass: "fas fa-exclamation-triangle text-warning",
                    staticStyle: { "font-size": "2rem" },
                  }),
                  _vm._v(" "),
                  _c("p", { staticClass: "mt-2" }, [
                    _vm._v(_vm._s(_vm.videoError)),
                  ]),
                ])
              : _c("div", { staticClass: "position-relative" }, [
                  _vm.isVideoLoading
                    ? _c("div", { staticClass: "video-loading-overlay" }, [
                        _c("div", { staticClass: "text-center py-4" }, [
                          _c(
                            "div",
                            {
                              staticClass: "spinner-border text-primary",
                              attrs: { role: "status" },
                            },
                            [
                              _c("span", { staticClass: "sr-only" }, [
                                _vm._v("Loading..."),
                              ]),
                            ]
                          ),
                          _vm._v(" "),
                          _c("p", { staticClass: "mt-2" }, [
                            _vm._v("Loading video..."),
                          ]),
                        ]),
                      ])
                    : _vm._e(),
                  _vm._v(" "),
                  _c(
                    "video",
                    {
                      staticClass: "w-100 rounded",
                      staticStyle: { "max-height": "500px" },
                      attrs: { src: _vm.videoTutorialUrl, controls: "" },
                      on: {
                        loadstart: _vm.onVideoLoadStart,
                        canplay: _vm.onVideoCanPlay,
                        error: _vm.handleVideoError,
                        loadeddata: _vm.onVideoLoaded,
                        loadedmetadata: _vm.onVideoLoaded,
                      },
                    },
                    [
                      _vm._v(
                        "\n                    Your browser does not support the video tag.\n                "
                      ),
                    ]
                  ),
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
    return _c(
      "li",
      {
        staticClass: "breadcrumb-item active",
        attrs: { "aria-current": "page" },
      },
      [
        _c("i", { staticClass: "fas fa-calendar-alt" }),
        _vm._v(
          "\n                            Schedules\n                        "
        ),
      ]
    )
  },
  function () {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "assignment-header" }, [
      _c("h4", { staticClass: "assignment-title" }, [
        _c("i", { staticClass: "fas fa-user-plus" }),
        _vm._v(
          "\n                            Assign Members\n                        "
        ),
      ]),
    ])
  },
  function () {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("label", [
      _vm._v("Schedule "),
      _c("span", { staticClass: "text-danger" }, [_vm._v("*")]),
    ])
  },
  function () {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("label", [
      _vm._v("Activity "),
      _c("span", { staticClass: "text-danger" }, [_vm._v("*")]),
    ])
  },
  function () {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("label", [
      _vm._v("Max participants "),
      _c("span", { staticClass: "text-danger" }, [_vm._v("*")]),
    ])
  },
  function () {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("small", { staticClass: "form-text text-muted" }, [
      _c("strong", [_vm._v("Hold Ctrl/Cmd to select multiple members.")]),
      _vm._v(
        ' Leave empty to create a group class that members can book via mobile app (enable "Online booking" below). \n                            '
      ),
      _c("strong", [_vm._v("Select members")]),
      _vm._v(
        " to directly assign them to this time slot.\n                        "
      ),
    ])
  },
]
render._withStripped = true



/***/ })

}]);