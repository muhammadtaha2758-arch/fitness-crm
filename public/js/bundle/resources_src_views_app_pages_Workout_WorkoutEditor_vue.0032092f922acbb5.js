"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["resources_src_views_app_pages_Workout_WorkoutEditor_vue"],{

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/Workout/WorkoutEditor.vue?vue&type=script&lang=js":
/*!*********************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/Workout/WorkoutEditor.vue?vue&type=script&lang=js ***!
  \*********************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! axios */ "./node_modules/axios/index.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_0__);
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
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
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//



/**
 * WorkoutEditor Component
 * 
 * Usage with user filtering:
 * 
 * 1. Pass userId as prop:
 *    <WorkoutEditor :userId="currentUser.id" />
 * 
 * 2. Or let it auto-detect from store/localStorage:
 *    <WorkoutEditor />
 * 
 * The component will automatically:
 * - Filter saved workout plans by user ID
 * - Include user ID when saving new plans
 * - Show user-specific information in the UI
 * - Handle user authentication automatically
 */
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  name: "WorkoutEditor",
  props: {
    editWorkoutData: {
      type: Object,
      "default": null
    },
    userId: {
      type: [Number, String],
      "default": null
    }
  },
  data: function data() {
    return {
      // Navigation tracking
      showBreadcrumb: false,
      memberId: null,
      memberName: 'Member',
      cameFromMemberDetails: false,
      // Search and filter properties
      exerciseSearch: "",
      selectedCategory: "",
      selectedMuscle: "",
      // Workout information
      workoutName: "",
      workoutDescription: "",
      enablePresetWeights: false,
      // Track if preset weights are enabled for this workout

      // Filter options for exercise library
      categoryOptions: [{
        value: "",
        text: "All Categories"
      }, {
        value: "strength",
        text: "Strength"
      }, {
        value: "cardio",
        text: "Cardio"
      }, {
        value: "core",
        text: "Core"
      }, {
        value: "flexibility",
        text: "Flexibility"
      }, {
        value: "balance",
        text: "Balance"
      }, {
        value: "mobility",
        text: "Mobility"
      }, {
        value: "recovery",
        text: "Recovery"
      }, {
        value: "yoga",
        text: "Yoga"
      }, {
        value: "pilates",
        text: "Pilates"
      }, {
        value: "stretching",
        text: "Stretching"
      }, {
        value: "upper-body",
        text: "Upper Body"
      }, {
        value: "lower-body",
        text: "Lower Body"
      }, {
        value: "full-body",
        text: "Full Body"
      }, {
        value: "other",
        text: "Other"
      }],
      muscleOptions: [{
        value: "",
        text: "All Muscles"
      }, {
        value: "chest",
        text: "Chest"
      }, {
        value: "back",
        text: "Back"
      }, {
        value: "legs",
        text: "Legs"
      }, {
        value: "arms",
        text: "Arms"
      }, {
        value: "shoulders",
        text: "Shoulders"
      }, {
        value: "abs",
        text: "Abs"
      }, {
        value: "full-body",
        text: "Full Body"
      }, {
        value: "other",
        text: "Other"
      }],
      // Exercise library data (will be loaded from API)
      exercises: [],
      loadingExercises: false,
      // Workout builder data
      workoutSections: [],
      selectedDay: null,
      editingPlanKey: null,
      // Track which plan is being edited using stable composite key
      editingPlanIds: [],
      // Track which plan IDs are in edit mode

      // Training plan data
      trainingPlan: {
        name: "Training Plan",
        description: "A comprehensive training schedule",
        days: []
      },
      dayOptions: [{
        value: "Monday",
        text: "Monday"
      }, {
        value: "Tuesday",
        text: "Tuesday"
      }, {
        value: "Wednesday",
        text: "Wednesday"
      }, {
        value: "Thursday",
        text: "Thursday"
      }, {
        value: "Friday",
        text: "Friday"
      }, {
        value: "Saturday",
        text: "Saturday"
      }, {
        value: "Sunday",
        text: "Sunday"
      }],
      // Workout activity plans data
      workoutActivityPlans: [],
      loadingPlans: false,
      // For workout select box
      allWorkouts: [],
      workoutSelectOptions: [],
      selectedWorkoutId: null,
      currentEditingIndex: null,
      // Add this to track which day is being edited

      // Thumbnail management (paginated so we don't load 2000+ at once)
      showThumbnailGrid: false,
      allThumbnails: [],
      loadingThumbnails: false,
      loadingMoreThumbnails: false,
      thumbnailCurrentPage: 1,
      thumbnailLastPage: 1,
      thumbnailTotal: 0,
      thumbnailPerPage: 48,
      failedThumbnailKeys: {},
      // Track failed loads to show placeholder and stop blinking
      selectedThumbnails: [],
      // Array of selected exercise objects
      showScrollToTop: false,
      // Control scroll to top button visibility

      // Video playing state (lazy: video loads only when user clicks Play)
      playingVideos: {},
      // Track which exercises are currently playing { exerciseId: true/false }
      showVideoModal: false,
      currentVideo: null,
      // { url, name, exercise } – set when modal opens
      videoSrcToPlay: null,
      // Set only when user clicks Play so video loads on demand

      // Filter properties for thumbnails
      thumbnailSearch: "",
      filterBodyPart: "",
      filterMuscleGroup: "",
      filterExerciseType: "",
      filterLevel: "",
      filterExerciseList: "",
      filterEquipment: "",
      filterPrimaryJoint: "",
      filterMotion: "",
      // Filter options – only targeted muscles that exist in DB: Chest, Triceps, Shoulders, Full Body
      bodyPartOptions: [{
        value: "",
        text: "All Body Parts"
      }, {
        value: "Chest",
        text: "Chest"
      }, {
        value: "Triceps",
        text: "Triceps"
      }, {
        value: "Shoulders",
        text: "Shoulders"
      }, {
        value: "Full Body",
        text: "Full Body"
      }],
      muscleGroupOptions: [{
        value: "",
        text: "All Muscle Groups"
      }, {
        value: "Chest",
        text: "Chest"
      }, {
        value: "Triceps",
        text: "Triceps"
      }, {
        value: "Shoulders",
        text: "Shoulders"
      }, {
        value: "Full Body",
        text: "Full Body"
      }],
      // Exercise Types = video_catalog.category (only DB values)
      exerciseTypeOptions: [{
        value: "",
        text: "All Exercise Types"
      }, {
        value: "Chest",
        text: "Chest"
      }, {
        value: "Calisthenics-Cardio-Functional",
        text: "Calisthenics-Cardio-Functional"
      }, {
        value: "Back",
        text: "Back"
      }, {
        value: "Abdominals",
        text: "Abdominals"
      }, {
        value: "Biceps",
        text: "Biceps"
      }, {
        value: "Triceps",
        text: "Triceps"
      }],
      levelOptions: [{
        value: "",
        text: "All Levels"
      }, {
        value: "beginner",
        text: "Beginner"
      }, {
        value: "intermediate",
        text: "Intermediate"
      }, {
        value: "advanced",
        text: "Advanced"
      }],
      equipmentOptions: [{
        value: "",
        text: "All Equipment"
      }, {
        value: "dumbbell",
        text: "Dumbbell"
      }, {
        value: "barbell",
        text: "Barbell"
      }, {
        value: "cable",
        text: "Cable"
      }, {
        value: "bodyweight",
        text: "Bodyweight"
      }, {
        value: "resistance-band",
        text: "Resistance Band"
      }],
      primaryJointOptions: [{
        value: "",
        text: "All Joints"
      }, {
        value: "shoulder",
        text: "Shoulder"
      }, {
        value: "elbow",
        text: "Elbow"
      }, {
        value: "hip",
        text: "Hip"
      }, {
        value: "knee",
        text: "Knee"
      }],
      motionOptions: [{
        value: "",
        text: "All Motions"
      }, {
        value: "push",
        text: "Push"
      }, {
        value: "pull",
        text: "Pull"
      }, {
        value: "squat",
        text: "Squat"
      }, {
        value: "lunge",
        text: "Lunge"
      }]
    };
  },
  computed: {
    posterStyle: function posterStyle() {
      if (!this.currentVideo) return {};
      var thumb = this.currentVideo.thumbnail_url || this.currentVideo.exercise && this.currentVideo.exercise.thumbnail_url;
      if (!thumb) return {};
      return {
        backgroundImage: "url(".concat(this.resolveAssetUrl(thumb), ")")
      };
    },
    // Filter exercises based on search and category/muscle selection
    filteredExercises: function filteredExercises() {
      var _this = this;
      return this.exercises.filter(function (exercise) {
        var matchesSearch = exercise.name.toLowerCase().includes(_this.exerciseSearch.toLowerCase());
        var matchesCategory = !_this.selectedCategory || exercise.category === _this.selectedCategory;
        var matchesMuscle = !_this.selectedMuscle || exercise.muscle === _this.selectedMuscle;
        return matchesSearch && matchesCategory && matchesMuscle;
      });
    },
    // Filter thumbnails: server-side via video-catalog-thumbnails API (params: search, category, equipment, level, targeted_muscle).
    // Display the current result set; no client-side filter needed.
    filteredThumbnails: function filteredThumbnails() {
      return this.allThumbnails || [];
    },
    // Calculate total number of exercises in workout
    totalExercises: function totalExercises() {
      if (!this.workoutSections || this.workoutSections.length === 0) {
        return 0;
      }
      return this.workoutSections.reduce(function (total, section) {
        return total + (section.exercises ? section.exercises.length : 0);
      }, 0);
    },
    // Calculate estimated workout duration
    totalDuration: function totalDuration() {
      var exerciseTime = this.totalExercises * 2; // 2 minutes per exercise
      var restTime = this.workoutSections.reduce(function (total, section) {
        return total + (section.exercises ? section.exercises.reduce(function (sectionTotal, exercise) {
          return sectionTotal + (exercise.rest || 0);
        }, 0) : 0);
      }, 0) / 60; // Convert seconds to minutes

      return Math.round(exerciseTime + restTime);
    },
    // Calculate estimated calories burned
    estimatedCalories: function estimatedCalories() {
      return this.totalDuration * 10; // Rough estimate: 10 calories per minute
    },
    // Check if user filtering is active
    isUserFiltered: function isUserFiltered() {
      return this.getCurrentUserId() !== null;
    },
    // Get filtered plans count for current user
    userPlansCount: function userPlansCount() {
      var currentUserId = this.getCurrentUserId();
      if (!currentUserId) return this.workoutActivityPlans.length;
      return this.workoutActivityPlans.filter(function (plan) {
        return plan.user_id == currentUserId;
      }).length;
    },
    // Get current user ID for display
    currentUserId: function currentUserId() {
      return this.getCurrentUserId();
    },
    availableDayOptions: function availableDayOptions() {
      var _this2 = this;
      // Get all selected days except the current one being edited
      var existingDays = this.trainingPlan.days.map(function (d, index) {
        return {
          name: d.name,
          index: index
        };
      }).filter(function (d) {
        return d.name && d.index !== _this2.currentEditingIndex;
      }).map(function (d) {
        return d.name;
      });
      return this.dayOptions.filter(function (day) {
        return !existingDays.includes(day.value);
      });
    },
    // Convert existing plans for selected day to workout sections (view-only)
    viewOnlyWorkoutSections: function viewOnlyWorkoutSections() {
      var _this3 = this;
      if (!this.selectedDay) return [];
      var existingPlans = this.getExistingPlansForDay(this.selectedDay);
      if (existingPlans.length === 0) return [];

      // Filter out plans that are currently being edited
      var plansToShow = existingPlans.filter(function (plan) {
        return !_this3.editingPlanIds.includes(plan.id);
      });
      return plansToShow.map(function (plan) {
        // Determine setsConfiguration
        var setsConfig;
        if (plan.sets_configuration && Array.isArray(plan.sets_configuration) && plan.sets_configuration.length > 0) {
          setsConfig = plan.sets_configuration.filter(function (set) {
            return set.reps > 0;
          }).map(function (set) {
            return {
              reps: set.reps,
              rest: set.rest || 30,
              weight: set.weight || 0
            };
          });
        } else if (plan.sets && plan.reps && plan.rest_seconds) {
          setsConfig = [];
          for (var i = 0; i < plan.sets; i++) {
            setsConfig.push({
              reps: plan.reps,
              rest: plan.rest_seconds,
              weight: 0
            });
          }
        } else {
          setsConfig = [{
            reps: 10,
            rest: 30,
            weight: 0
          }, {
            reps: 10,
            rest: 30,
            weight: 0
          }, {
            reps: 10,
            rest: 30,
            weight: 0
          }];
        }

        // Ensure at least 3 sets
        while (setsConfig.length < 3) {
          setsConfig.push({
            reps: 10,
            rest: 30,
            weight: 0
          });
        }

        // Create exercise object
        var isThumbnailExercise = !plan.exercise_id && plan.thumbnail_url;
        var exercise;
        if (isThumbnailExercise) {
          var _plan$exercise_data, _plan$exercise_data2, _plan$exercise_data3;
          exercise = {
            id: null,
            name: plan.exercise_name || ((_plan$exercise_data = plan.exercise_data) === null || _plan$exercise_data === void 0 ? void 0 : _plan$exercise_data.exercise_name),
            thumbnail_url: plan.thumbnail_url || ((_plan$exercise_data2 = plan.exercise_data) === null || _plan$exercise_data2 === void 0 ? void 0 : _plan$exercise_data2.thumbnail),
            filename: plan.thumbnail_filename || ((_plan$exercise_data3 = plan.exercise_data) === null || _plan$exercise_data3 === void 0 ? void 0 : _plan$exercise_data3.thumbnail_filename),
            day: plan.day
          };
        } else if (plan.exercise_data) {
          exercise = {
            id: plan.exercise_id,
            name: plan.exercise_data.exercise_name,
            category: plan.exercise_data.category,
            muscle: plan.exercise_data.muscles_targeted || 'Full Body',
            difficulty: plan.exercise_data.level,
            image: plan.exercise_data.thumbnail || '/images/99078543gym logo.png',
            description: plan.exercise_data.description,
            instructions: plan.exercise_data.instructions,
            equipment: plan.exercise_data.equipment,
            duration: plan.exercise_data.duration,
            calories: plan.exercise_data.calories_burned,
            videoLink: plan.exercise_data.video_link,
            tags: plan.exercise_data.tags,
            restPeriod: plan.exercise_data.rest_period,
            thumbnail_url: plan.exercise_data.thumbnail,
            day: plan.day
          };
        } else {
          exercise = {
            id: plan.exercise_id,
            name: plan.exercise_name,
            day: plan.day
          };
        }
        return {
          id: plan.id,
          // Store plan ID for reference
          name: plan.exercise_name || 'Main Section',
          exercises: [exercise],
          exerciseType: plan.exercise_type || 'repetition',
          setsConfiguration: setsConfig,
          intensityType: plan.intensity_type || 'max',
          intensityValue: plan.intensity_value || 0,
          notes: plan.notes || '',
          isViewOnly: !_this3.editingPlanIds.includes(plan.id),
          // Mark as view-only if not in edit mode
          planData: plan // Store full plan data for reference
        };
      });
    },
    // Combine view-only sections with editable sections
    allWorkoutSections: function allWorkoutSections() {
      // Combine view-only sections (excluding those being edited) with editable sections
      var allSections = _toConsumableArray(this.viewOnlyWorkoutSections);

      // Add editable sections
      if (this.workoutSections.length > 0) {
        allSections.push.apply(allSections, _toConsumableArray(this.workoutSections));
      }
      return allSections;
    }
  },
  methods: {
    // Helper method to create a default set object
    createDefaultSet: function createDefaultSet() {
      var reps = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 10;
      var rest = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 30;
      var set = {
        reps: reps,
        rest: rest
      };
      if (this.enablePresetWeights) {
        set.weight = 0;
      }
      return set;
    },
    // Load exercises from API
    loadActivities: function loadActivities() {
      var _this4 = this;
      return _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
        var response;
        return _regeneratorRuntime().wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              _this4.loadingExercises = true;
              _context.prev = 1;
              _context.next = 4;
              return axios__WEBPACK_IMPORTED_MODULE_0___default().get('workout_exercises');
            case 4:
              response = _context.sent;
              if (!(response.data && response.data.exercises)) {
                _context.next = 9;
                break;
              }
              // Transform API data to match expected format
              _this4.exercises = response.data.exercises.map(function (exercise) {
                return {
                  id: exercise.id,
                  name: exercise.exercise_name || 'Unnamed Exercise',
                  category: exercise.category || 'Other',
                  muscle: exercise.muscles_targeted || "Full Body",
                  difficulty: exercise.level || 'Beginner',
                  image: exercise.thumbnail ? '/' + exercise.thumbnail : '/images/99078543gym logo.png',
                  duration: exercise.duration ? "".concat(exercise.duration, " min") : "30 sec",
                  description: exercise.description || '',
                  instructions: exercise.instructions || '',
                  equipment: exercise.equipment || 'None',
                  calories: exercise.calories_burned || 0,
                  videoLink: exercise.video_link || '',
                  tags: exercise.tags || [],
                  restPeriod: exercise.rest_period || 60,
                  // Additional API fields
                  visibleFor: exercise.visible_for,
                  primaryMuscleGroups: exercise.primary_muscle_groups || [],
                  secondaryMuscleGroups: exercise.secondary_muscle_groups || [],
                  primaryJoint: exercise.primary_joint || '',
                  type: exercise.type || 'exercise',
                  usesWeights: exercise.uses_weights || false,
                  intensity: exercise.intensity || 'medium',
                  setsConfiguration: exercise.sets_configuration || {
                    sets: 3,
                    reps: 10
                  },
                  restPeriodSeconds: exercise.rest_period_seconds || 60,
                  qrLink: exercise.qr_link || '',
                  manufacturer: exercise.manufacturer || ''
                };
              });
              _context.next = 10;
              break;
            case 9:
              throw new Error('Invalid response format from API');
            case 10:
              _context.next = 15;
              break;
            case 12:
              _context.prev = 12;
              _context.t0 = _context["catch"](1);
              // Don't log authentication errors that are being handled by the interceptor
              // (they will redirect to login)
              if (!_context.t0.isHandled && !_context.t0.isAuthError) {
                console.error('Error loading activities:', _context.t0);
                _this4.$bvToast.toast("Failed to load exercises. Please refresh the page.", {
                  title: "Error",
                  variant: "danger",
                  solid: true
                });
              }
              // Keep using empty array if API fails
            case 15:
              _context.prev = 15;
              _this4.loadingExercises = false;
              return _context.finish(15);
            case 18:
            case "end":
              return _context.stop();
          }
        }, _callee, null, [[1, 12, 15, 18]]);
      }))();
    },
    addExerciseToWorkout: function addExerciseToWorkout(exercise) {
      var _this5 = this;
      // Validate exercise data
      if (!exercise || !exercise.id || !exercise.name) {
        this.$bvToast.toast("Invalid exercise data. Please try again.", {
          title: "Error",
          variant: "danger",
          solid: true
        });
        return;
      }

      // Check if a day is selected
      if (!this.selectedDay) {
        this.$bvToast.toast("Please select a day from the training plan first!", {
          title: "No Day Selected",
          variant: "warning",
          solid: true
        });
        return;
      }

      // Clear editing plan key when manually adding exercises (starting new plan)
      if (this.editingPlanKey && this.workoutSections.length === 0) {
        this.editingPlanKey = null;
      }

      // Check if exercise already exists in current day
      var existingExercise = this.workoutSections.some(function (section) {
        return section.exercises && section.exercises.some(function (ex) {
          return ex.id === exercise.id && ex.day === _this5.selectedDay;
        });
      });
      if (existingExercise) {
        this.$bvToast.toast("".concat(exercise.name, " is already added to ").concat(this.selectedDay, "'s workout!"), {
          title: "Exercise Already Added",
          variant: "warning",
          solid: true
        });
        return;
      }

      // Create a section if none exists
      if (this.workoutSections.length === 0) {
        this.addSection();
      }

      // Add to the first section
      var targetSection = this.workoutSections[0];

      // Create exercise object with API data and default workout settings
      var workoutExercise = {
        id: exercise.id,
        name: exercise.name,
        category: exercise.category || 'Other',
        muscle: exercise.muscle || 'Full Body',
        difficulty: exercise.difficulty || 'Beginner',
        image: exercise.image || '/images/99078543gym logo.png',
        description: exercise.description || '',
        instructions: exercise.instructions || '',
        equipment: exercise.equipment || 'None',
        duration: exercise.duration || '30 sec',
        calories: exercise.calories || 0,
        videoLink: exercise.videoLink || '',
        tags: exercise.tags || [],
        restPeriod: exercise.restPeriod || 60,
        // Workout-specific settings with validation
        sets: Math.max(1, exercise.setsConfiguration ? exercise.setsConfiguration.sets || 3 : 3),
        reps: Math.max(1, exercise.setsConfiguration ? exercise.setsConfiguration.reps || 10 : 10),
        rest: Math.max(0, exercise.restPeriodSeconds || exercise.restPeriod || 60),
        // Day association
        day: this.selectedDay
      };
      targetSection.exercises.push(workoutExercise);

      // Ensure section has at least 3 sets in setsConfiguration
      if (!targetSection.setsConfiguration || targetSection.setsConfiguration.length < 3) {
        var defaultSets = [this.createDefaultSet(10, 30), this.createDefaultSet(10, 30), this.createDefaultSet(10, 30)];
        // If setsConfiguration exists but has less than 3, pad it
        if (targetSection.setsConfiguration && targetSection.setsConfiguration.length > 0) {
          while (targetSection.setsConfiguration.length < 3) {
            targetSection.setsConfiguration.push(this.createDefaultSet(10, 30));
          }
        } else {
          targetSection.setsConfiguration = defaultSets;
        }
      }

      // Show success message (optional - can be removed if too many toasts)
      // this.$bvToast.toast(`${exercise.name} added to ${this.selectedDay}'s workout!`, {
      //     title: "Exercise Added",
      //     variant: "success",
      //     solid: true
      // });
    },
    addSection: function addSection() {
      this.workoutSections.push({
        name: "Section ".concat(this.workoutSections.length + 1),
        exercises: [],
        exerciseType: 'repetition',
        // Shared exercise type
        setsConfiguration: [this.createDefaultSet(10, 30), this.createDefaultSet(10, 30), this.createDefaultSet(10, 30)],
        intensityType: 'max',
        // Shared intensity type
        intensityValue: 0,
        notes: '' // Shared notes
      });
    },
    removeSection: function removeSection(sectionIndex) {
      this.workoutSections.splice(sectionIndex, 1);

      // If this was the last section, show a message (optional)
      // if (this.workoutSections.length === 0) {
      //     this.$bvToast.toast("All sections removed. Add exercises from the library to create new sections.", {
      //         title: "Sections Cleared",
      //         variant: "info",
      //         solid: true
      //     });
      // }
    },
    // Resolve thumbnail/video URL so it loads from current origin (fixes thumbnails not displaying when API returns relative path)
    resolveAssetUrl: function resolveAssetUrl(url) {
      if (!url || typeof url !== 'string') return '';
      var u = url.trim();
      if (u.startsWith('http://') || u.startsWith('https://')) return u;
      var path = u.startsWith('/') ? u : '/' + u;
      return window.location.origin + path;
    },
    // Normalize thumbnail filename to image extension (.jpg), never video extension (.mp4)
    // Thumbnails are images, not videos - this ensures we always send the correct image filename
    normalizeThumbnailFilename: function normalizeThumbnailFilename(filename) {
      if (!filename || typeof filename !== 'string') return filename || '';
      var ext = filename.split('.').pop().toLowerCase();
      // If it's a video extension, convert to .jpg
      if (['mp4', 'webm', 'mov', 'avi', 'mkv'].includes(ext)) {
        var basename = filename.substring(0, filename.lastIndexOf('.'));
        return basename + '.jpg';
      }
      return filename;
    },
    // Placeholder when thumbnail fails (data URL so no extra request; stops blinking)
    thumbnailPlaceholderDataUrl: function thumbnailPlaceholderDataUrl() {
      return 'data:image/svg+xml,' + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="200" height="120" viewBox="0 0 200 120"><rect fill="#e9ecef" width="200" height="120"/><text x="50%" y="50%" fill="#6c757d" font-size="12" font-family="sans-serif" text-anchor="middle" dy=".3em">No image</text></svg>');
    },
    getThumbnailSrc: function getThumbnailSrc(thumbnail) {
      var key = thumbnail.id != null ? String(thumbnail.id) : thumbnail.filename || thumbnail.name || '';
      if (this.failedThumbnailKeys[key]) return this.thumbnailPlaceholderDataUrl();
      return this.resolveAssetUrl(thumbnail.thumbnail_url);
    },
    onThumbnailImgError: function onThumbnailImgError(event, thumbnail) {
      var key = thumbnail.id != null ? String(thumbnail.id) : thumbnail.filename || thumbnail.name || '';
      if (!this.failedThumbnailKeys[key]) {
        this.$set(this.failedThumbnailKeys, key, true);
      }
    },
    // Build request params for video-catalog-thumbnails API (matches video_catalog columns).
    getVideoCatalogFilterParams: function getVideoCatalogFilterParams() {
      var search = (this.thumbnailSearch || '').trim();
      var category = (this.filterExerciseType || '').trim();
      var equipment = (this.filterEquipment || '').trim();
      var level = (this.filterLevel || '').trim();
      var targetedMuscle = [this.filterBodyPart, this.filterMuscleGroup].filter(Boolean).map(function (v) {
        return (v || '').trim();
      }).filter(Boolean);
      return _objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread({}, search ? {
        search: search
      } : {}), category ? {
        category: category
      } : {}), equipment ? {
        equipment: equipment
      } : {}), level ? {
        level: level
      } : {}), targetedMuscle.length ? {
        targeted_muscle: targetedMuscle
      } : {});
    },
    // Load first page of thumbnails only (paginated – avoids 2000+ requests and hanging UI)
    loadAllThumbnails: function loadAllThumbnails() {
      var _this6 = this;
      return _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee2() {
        var catalogResponse, _catalogResponse$data, _catalogResponse$data2, _catalogResponse$data3, response, _response;
        return _regeneratorRuntime().wrap(function _callee2$(_context2) {
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
              _this6.loadingThumbnails = true;
              _this6.allThumbnails = [];
              _this6.failedThumbnailKeys = {};
              _this6.thumbnailCurrentPage = 1;
              _this6.thumbnailLastPage = 1;
              _this6.thumbnailTotal = 0;
              _context2.prev = 6;
              _context2.next = 9;
              return axios__WEBPACK_IMPORTED_MODULE_0___default().get('workout_exercises/video-catalog-thumbnails', {
                params: _objectSpread({
                  page: 1,
                  per_page: _this6.thumbnailPerPage
                }, _this6.getVideoCatalogFilterParams())
              });
            case 9:
              catalogResponse = _context2.sent;
              if (!(catalogResponse.data && catalogResponse.data.success && Array.isArray(catalogResponse.data.thumbnails))) {
                _context2.next = 18;
                break;
              }
              _this6.allThumbnails = catalogResponse.data.thumbnails.map(function (t) {
                return _this6.normalizeThumbnailItem(t);
              });
              _this6.thumbnailTotal = (_catalogResponse$data = catalogResponse.data.total) !== null && _catalogResponse$data !== void 0 ? _catalogResponse$data : _this6.allThumbnails.length;
              _this6.thumbnailCurrentPage = (_catalogResponse$data2 = catalogResponse.data.current_page) !== null && _catalogResponse$data2 !== void 0 ? _catalogResponse$data2 : 1;
              _this6.thumbnailLastPage = (_catalogResponse$data3 = catalogResponse.data.last_page) !== null && _catalogResponse$data3 !== void 0 ? _catalogResponse$data3 : 1;
              _this6.showThumbnailGrid = true;
              _context2.next = 22;
              break;
            case 18:
              _context2.next = 20;
              return axios__WEBPACK_IMPORTED_MODULE_0___default().get('workout_exercises/all-thumbnails');
            case 20:
              response = _context2.sent;
              if (response.data && response.data.success) {
                _this6.allThumbnails = (response.data.thumbnails || []).map(function (t) {
                  return _objectSpread(_objectSpread({}, t), {}, {
                    id: null
                  });
                });
                _this6.thumbnailTotal = _this6.allThumbnails.length;
                _this6.thumbnailLastPage = 1;
                _this6.showThumbnailGrid = true;
              } else {
                _this6.$bvToast.toast('Failed to load thumbnails', {
                  title: 'Error',
                  variant: 'danger',
                  solid: true
                });
              }
            case 22:
              _context2.next = 37;
              break;
            case 24:
              _context2.prev = 24;
              _context2.t0 = _context2["catch"](6);
              _context2.prev = 26;
              _context2.next = 29;
              return axios__WEBPACK_IMPORTED_MODULE_0___default().get('workout_exercises/all-thumbnails');
            case 29:
              _response = _context2.sent;
              if (_response.data && _response.data.success) {
                _this6.allThumbnails = (_response.data.thumbnails || []).map(function (t) {
                  return _objectSpread(_objectSpread({}, t), {}, {
                    id: null
                  });
                });
                _this6.thumbnailTotal = _this6.allThumbnails.length;
                _this6.thumbnailLastPage = 1;
                _this6.showThumbnailGrid = true;
              } else {
                _this6.$bvToast.toast('Failed to load thumbnails', {
                  title: 'Error',
                  variant: 'danger',
                  solid: true
                });
              }
              _context2.next = 37;
              break;
            case 33:
              _context2.prev = 33;
              _context2.t1 = _context2["catch"](26);
              console.error('Failed to load thumbnails:', _context2.t1);
              _this6.$bvToast.toast('Failed to load thumbnails', {
                title: 'Error',
                variant: 'danger',
                solid: true
              });
            case 37:
              _context2.prev = 37;
              _this6.loadingThumbnails = false;
              return _context2.finish(37);
            case 40:
            case "end":
              return _context2.stop();
          }
        }, _callee2, null, [[6, 24, 37, 40], [26, 33]]);
      }))();
    },
    normalizeThumbnailItem: function normalizeThumbnailItem(t) {
      // Extract filename from thumbnail_url (should be .jpg) or fallback to name + .jpg
      var filename = t.thumbnail_url && t.thumbnail_url.split('/').pop() ? t.thumbnail_url.split('/').pop() : t.name + '.jpg';
      // Decode URL-encoded filename and normalize to ensure it's .jpg, not .mp4
      try {
        filename = decodeURIComponent(filename);
      } catch (e) {
        // If decoding fails, use as-is
      }
      filename = this.normalizeThumbnailFilename(filename);
      return {
        id: t.id,
        name: t.name,
        filename: filename,
        thumbnail_url: t.thumbnail_url,
        video_url: t.video_url,
        modified: t.modified,
        // Preserve metadata fields
        category: t.category || null,
        equipment: t.equipment || null,
        level: t.level || null,
        targeted_muscle: t.targeted_muscle || null
      };
    },
    loadMoreThumbnails: function loadMoreThumbnails() {
      var _this7 = this;
      return _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee3() {
        var nextPage, res, _res$data$current_pag, _res$data$last_page, more;
        return _regeneratorRuntime().wrap(function _callee3$(_context3) {
          while (1) switch (_context3.prev = _context3.next) {
            case 0:
              if (!(_this7.loadingMoreThumbnails || _this7.thumbnailCurrentPage >= _this7.thumbnailLastPage)) {
                _context3.next = 2;
                break;
              }
              return _context3.abrupt("return");
            case 2:
              _this7.loadingMoreThumbnails = true;
              _context3.prev = 3;
              nextPage = _this7.thumbnailCurrentPage + 1;
              _context3.next = 7;
              return axios__WEBPACK_IMPORTED_MODULE_0___default().get('workout_exercises/video-catalog-thumbnails', {
                params: _objectSpread({
                  page: nextPage,
                  per_page: _this7.thumbnailPerPage
                }, _this7.getVideoCatalogFilterParams())
              });
            case 7:
              res = _context3.sent;
              if (res.data && res.data.success && Array.isArray(res.data.thumbnails)) {
                more = res.data.thumbnails.map(function (t) {
                  return _this7.normalizeThumbnailItem(t);
                });
                _this7.allThumbnails = _this7.allThumbnails.concat(more);
                _this7.thumbnailCurrentPage = (_res$data$current_pag = res.data.current_page) !== null && _res$data$current_pag !== void 0 ? _res$data$current_pag : nextPage;
                _this7.thumbnailLastPage = (_res$data$last_page = res.data.last_page) !== null && _res$data$last_page !== void 0 ? _res$data$last_page : _this7.thumbnailLastPage;
              }
              _context3.next = 15;
              break;
            case 11:
              _context3.prev = 11;
              _context3.t0 = _context3["catch"](3);
              console.error('Load more thumbnails failed:', _context3.t0);
              _this7.$bvToast.toast('Failed to load more thumbnails', {
                title: 'Error',
                variant: 'danger',
                solid: true
              });
            case 15:
              _context3.prev = 15;
              _this7.loadingMoreThumbnails = false;
              return _context3.finish(15);
            case 18:
            case "end":
              return _context3.stop();
          }
        }, _callee3, null, [[3, 11, 15, 18]]);
      }))();
    },
    // Toggle thumbnail selection
    toggleThumbnailSelection: function toggleThumbnailSelection(thumbnail) {
      var index = this.selectedThumbnails.findIndex(function (t) {
        return t.filename === thumbnail.filename;
      });
      if (index > -1) {
        // Remove from selected
        this.selectedThumbnails.splice(index, 1);
        // Remove from workout builder too
        this.removeExerciseByThumbnail(thumbnail.filename);
      } else {
        // Add to selected
        this.selectThumbnail(thumbnail);
      }
    },
    // Select a thumbnail (id = video_catalog id when from video-catalog-thumbnails → correct video on play)
    selectThumbnail: function selectThumbnail(thumbnail) {
      var exists = this.selectedThumbnails.find(function (t) {
        return t.id != null && t.id === thumbnail.id || t.filename === thumbnail.filename;
      });
      if (!exists) {
        var exercise = {
          id: thumbnail.id != null ? thumbnail.id : null,
          name: thumbnail.name,
          thumbnail_url: thumbnail.thumbnail_url,
          filename: thumbnail.filename,
          video_url: thumbnail.video_url || null,
          selected: true,
          // Include metadata fields
          category: thumbnail.category || null,
          equipment: thumbnail.equipment || null,
          level: thumbnail.level || null,
          targeted_muscle: thumbnail.targeted_muscle || null
        };
        this.selectedThumbnails.push(exercise);

        // Also add to workout builder if a day is selected
        if (this.selectedDay) {
          this.addExerciseFromThumbnail(exercise);
        } else {
          this.$bvToast.toast('Please select a day from the training plan first!', {
            title: 'No Day Selected',
            variant: 'warning',
            solid: true
          });
        }
      }
    },
    // Add exercise from thumbnail to workout builder
    addExerciseFromThumbnail: function addExerciseFromThumbnail(exercise) {
      var _this8 = this;
      if (!this.selectedDay) {
        this.$bvToast.toast('Please select a day first!', {
          title: 'No Day Selected',
          variant: 'warning',
          solid: true
        });
        return;
      }

      // Check if exercise already exists in current day
      var existingExercise = this.workoutSections.some(function (section) {
        return section.exercises && section.exercises.some(function (ex) {
          return ex.filename === exercise.filename && ex.day === _this8.selectedDay;
        });
      });
      if (existingExercise) {
        this.$bvToast.toast("".concat(exercise.name, " is already added to ").concat(this.selectedDay, "'s workout!"), {
          title: 'Exercise Already Added',
          variant: 'warning',
          solid: true
        });
        return;
      }

      // Clear editing plan key when manually adding exercises (starting new plan)
      if (this.editingPlanKey && this.workoutSections.length === 0) {
        this.editingPlanKey = null;
      }
      if (this.workoutSections.length === 0) {
        this.addSection();
      }
      var workoutExercise = {
        id: exercise.id,
        name: exercise.name,
        thumbnail_url: exercise.thumbnail_url,
        filename: exercise.filename,
        video_url: exercise.video_url || null,
        day: this.selectedDay
      };
      this.workoutSections[0].exercises.push(workoutExercise);
    },
    // Remove exercise by thumbnail filename
    removeExerciseByThumbnail: function removeExerciseByThumbnail(filename) {
      var _this9 = this;
      this.workoutSections.forEach(function (section) {
        if (section.exercises) {
          section.exercises.forEach(function (ex) {
            if (ex.filename === filename && _this9.playingVideos[ex.id]) {
              _this9.stopVideo(ex.id);
            }
          });
          section.exercises = section.exercises.filter(function (ex) {
            return ex.filename !== filename;
          });
        }
      });
    },
    // Handle video modal error
    handleVideoModalError: function handleVideoModalError(event) {
      console.error('Video error:', event);
      var exerciseName = this.currentVideo ? this.currentVideo.name : 'Unknown';
      this.$bvToast.toast("Failed to load video for ".concat(exerciseName, ". Please check if the video file exists."), {
        title: 'Video Error',
        variant: 'warning',
        solid: true
      });
      this.closeVideoModal();
    },
    // Close thumbnail grid
    closeThumbnailGrid: function closeThumbnailGrid() {
      this.showThumbnailGrid = false;
      this.showScrollToTop = false;
    },
    // Scroll to top of thumbnail grid
    scrollToTop: function scrollToTop() {
      if (this.$refs.thumbnailGrid) {
        this.$refs.thumbnailGrid.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      }
    },
    // Handle scroll event on thumbnail grid
    handleThumbnailGridScroll: function handleThumbnailGridScroll() {
      if (this.$refs.thumbnailGrid) {
        var scrollTop = this.$refs.thumbnailGrid.scrollTop;
        // Show button when scrolled down more than 200px
        this.showScrollToTop = scrollTop > 200;
      }
    },
    // Play exercise video in modal
    playExerciseVideo: function playExerciseVideo(exercise) {
      var _this10 = this;
      return _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee4() {
        var videoUrl;
        return _regeneratorRuntime().wrap(function _callee4$(_context4) {
          while (1) switch (_context4.prev = _context4.next) {
            case 0:
              _context4.next = 2;
              return _this10.getVideoUrl(exercise);
            case 2:
              videoUrl = _context4.sent;
              if (videoUrl) {
                _context4.next = 6;
                break;
              }
              _this10.$bvToast.toast("Video not found for ".concat(exercise.name), {
                title: 'Video Error',
                variant: 'warning',
                solid: true
              });
              return _context4.abrupt("return");
            case 6:
              // Set current video and show modal (video src set only when user clicks Play)
              _this10.videoSrcToPlay = null;
              _this10.currentVideo = {
                url: _this10.resolveAssetUrl(videoUrl),
                name: exercise.name,
                exercise: exercise,
                thumbnail_url: exercise.thumbnail_url ? _this10.resolveAssetUrl(exercise.thumbnail_url) : null
              };
              _this10.showVideoModal = true;
            case 9:
            case "end":
              return _context4.stop();
          }
        }, _callee4);
      }))();
    },
    // Load and play video only when user clicks Play (lazy load)
    startVideoPlayback: function startVideoPlayback() {
      var _this11 = this;
      if (!this.currentVideo || !this.currentVideo.url) return;
      this.videoSrcToPlay = this.currentVideo.url;
      this.$nextTick(function () {
        var el = _this11.$refs.exerciseVideoPlayer;
        if (el) {
          el.play()["catch"](function (err) {
            return console.warn('Video play failed:', err);
          });
        }
      });
    },
    onVideoLoadedData: function onVideoLoadedData() {
      var el = this.$refs.exerciseVideoPlayer;
      if (el && this.videoSrcToPlay && el.paused) {
        el.play()["catch"](function () {});
      }
    },
    // Reject malformed video URLs (e.g. stored "http://localhost/APP_URL=http://localhost:8080/...")
    isInvalidVideoUrl: function isInvalidVideoUrl(url) {
      if (!url || typeof url !== 'string') return true;
      return /APP_URL\s*=/i.test(url.trim());
    },
    // Get video URL for exercise. Prefer resolving by name so we get the correct path (e.g. Back_compressed/...) from catalog; stored video_url may be relative and point to wrong host.
    getVideoUrl: function getVideoUrl(exercise) {
      var _this12 = this;
      return _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee5() {
        var nameToResolve, res, u, baseName, response, matchingVideo;
        return _regeneratorRuntime().wrap(function _callee5$(_context5) {
          while (1) switch (_context5.prev = _context5.next) {
            case 0:
              nameToResolve = exercise.name || exercise.filename && exercise.filename.replace(/\.(jpg|jpeg|png|mp4)$/i, ''); // Resolve from video_catalog by name first (correct path + absolute URL from API; fixes "45 degree hyperextension arms to chest" etc.)
              if (!nameToResolve) {
                _context5.next = 13;
                break;
              }
              _context5.prev = 2;
              _context5.next = 5;
              return axios__WEBPACK_IMPORTED_MODULE_0___default().get('workout_exercises/video-url-by-name', {
                params: {
                  name: nameToResolve
                }
              });
            case 5:
              res = _context5.sent;
              if (!(res.data && res.data.success && res.data.video_url && !_this12.isInvalidVideoUrl(res.data.video_url))) {
                _context5.next = 8;
                break;
              }
              return _context5.abrupt("return", res.data.video_url);
            case 8:
              _context5.next = 13;
              break;
            case 10:
              _context5.prev = 10;
              _context5.t0 = _context5["catch"](2);
              console.warn('video-url-by-name failed:', _context5.t0);
            case 13:
              if (!(exercise.video_url && !_this12.isInvalidVideoUrl(exercise.video_url))) {
                _context5.next = 19;
                break;
              }
              u = String(exercise.video_url).trim();
              if (!(u.startsWith('http://') || u.startsWith('https://'))) {
                _context5.next = 17;
                break;
              }
              return _context5.abrupt("return", exercise.video_url);
            case 17:
              if (!u.startsWith('/api/workout_exercises/video/')) {
                _context5.next = 19;
                break;
              }
              return _context5.abrupt("return", u.startsWith('/') ? window.location.origin + u : u);
            case 19:
              baseName = exercise.filename ? exercise.filename.replace(/\.(jpg|jpeg|png)$/i, '') : nameToResolve;
              if (baseName) {
                _context5.next = 22;
                break;
              }
              return _context5.abrupt("return", null);
            case 22:
              _context5.prev = 22;
              _context5.next = 25;
              return axios__WEBPACK_IMPORTED_MODULE_0___default().get('workout_exercises/available-videos');
            case 25:
              response = _context5.sent;
              if (!(response.data && response.data.success && response.data.videos)) {
                _context5.next = 30;
                break;
              }
              matchingVideo = response.data.videos.find(function (video) {
                var videoName = video.name.toLowerCase();
                var exerciseName = baseName.toLowerCase();
                return videoName === exerciseName || videoName.includes(exerciseName) || exerciseName.includes(videoName);
              });
              if (!(matchingVideo && matchingVideo.url && !_this12.isInvalidVideoUrl(matchingVideo.url))) {
                _context5.next = 30;
                break;
              }
              return _context5.abrupt("return", matchingVideo.url);
            case 30:
              _context5.next = 35;
              break;
            case 32:
              _context5.prev = 32;
              _context5.t1 = _context5["catch"](22);
              console.error('Error fetching available videos:', _context5.t1);
            case 35:
              return _context5.abrupt("return", null);
            case 36:
            case "end":
              return _context5.stop();
          }
        }, _callee5, null, [[2, 10], [22, 32]]);
      }))();
    },
    // Close video modal
    closeVideoModal: function closeVideoModal() {
      this.showVideoModal = false;
      this.currentVideo = null;
      this.videoSrcToPlay = null;
    },
    // Stop video
    stopVideo: function stopVideo(exerciseId) {
      this.$set(this.playingVideos, exerciseId, false);
    },
    removeExercise: function removeExercise(sectionIndex, exerciseIndex) {
      var exercise = this.workoutSections[sectionIndex].exercises[exerciseIndex];
      // Stop video if playing
      if (exercise && this.playingVideos[exercise.id]) {
        this.stopVideo(exercise.id);
      }
      this.workoutSections[sectionIndex].exercises.splice(exerciseIndex, 1);

      // If this was the last exercise in the section, remove the section too
      if (this.workoutSections[sectionIndex].exercises.length === 0) {
        this.removeSection(sectionIndex);
      }
    },
    // Save workout activity plan to database
    saveWorkoutActivityPlan: function saveWorkoutActivityPlan() {
      var _this13 = this;
      return _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee6() {
        var exercisesForDay, _workoutActivityPlanD, workoutId, firstSection, firstExercise, workoutActivityPlanData, activityPlanResponse, _error$response, errors, errorMessages;
        return _regeneratorRuntime().wrap(function _callee6$(_context6) {
          while (1) switch (_context6.prev = _context6.next) {
            case 0:
              if (_this13.selectedDay) {
                _context6.next = 3;
                break;
              }
              _this13.$bvToast.toast("Please select a day first!", {
                title: "No Day Selected",
                variant: "warning",
                solid: true
              });
              return _context6.abrupt("return");
            case 3:
              if (!(!_this13.workoutSections || _this13.workoutSections.length === 0)) {
                _context6.next = 6;
                break;
              }
              _this13.$bvToast.toast("No exercises to save!", {
                title: "No Exercises",
                variant: "warning",
                solid: true
              });
              return _context6.abrupt("return");
            case 6:
              // Validate that exercises exist for the selected day
              exercisesForDay = _this13.workoutSections.reduce(function (total, section) {
                return total + (section.exercises ? section.exercises.filter(function (ex) {
                  return ex.day === _this13.selectedDay;
                }).length : 0);
              }, 0);
              if (!(exercisesForDay === 0)) {
                _context6.next = 10;
                break;
              }
              _this13.$bvToast.toast("No exercises found for ".concat(_this13.selectedDay, "!"), {
                title: "No Exercises for Day",
                variant: "warning",
                solid: true
              });
              return _context6.abrupt("return");
            case 10:
              _context6.prev = 10;
              // Prepare activity plan data with validation
              // Get workout_id from editWorkoutData or from the first exercise's plan (if editing)
              workoutId = null;
              if (_this13.editWorkoutData && _this13.editWorkoutData.id) {
                workoutId = _this13.editWorkoutData.id;
              } else if (_this13.workoutSections.length > 0) {
                // Try to get workout_id from the plan if we're editing
                firstSection = _this13.workoutSections[0];
                if (firstSection && firstSection.exercises && firstSection.exercises.length > 0) {
                  firstExercise = firstSection.exercises[0];
                  if (firstExercise.workout_id) {
                    workoutId = firstExercise.workout_id;
                  }
                }
              }
              workoutActivityPlanData = {
                day: _this13.selectedDay,
                workout_name: _this13.workoutName || "".concat(_this13.selectedDay, " Workout"),
                workout_id: workoutId,
                // Use workout_id if available (for updates)
                description: _this13.workoutDescription || "Workout plan for ".concat(_this13.selectedDay),
                user_id: _this13.getCurrentUserId(),
                // Include user ID for filtering
                exercises: []
              }; // Flatten all exercises from all sections with validation
              _this13.workoutSections.forEach(function (section) {
                if (section.exercises && Array.isArray(section.exercises)) {
                  // Get setsConfiguration from section (shared across exercises in section)
                  // Filter out sets with reps=0 (marked for deletion)
                  // Ensure weight is included if enablePresetWeights is true
                  var setsConfig = (section.setsConfiguration || [_this13.createDefaultSet(10, 30), _this13.createDefaultSet(10, 30), _this13.createDefaultSet(10, 30)]).filter(function (set) {
                    return set.reps > 0;
                  });

                  // Ensure all sets have weight field if enablePresetWeights is true
                  if (_this13.enablePresetWeights) {
                    setsConfig = setsConfig.map(function (set) {
                      return {
                        reps: set.reps,
                        rest: set.rest || 30,
                        weight: set.weight !== undefined ? set.weight : 0
                      };
                    });
                  }
                  section.exercises.forEach(function (exercise) {
                    if (exercise && exercise.day === _this13.selectedDay) {
                      var _setsConfig$, _setsConfig$2;
                      // Check if this is a thumbnail-based exercise (has filename but no valid exercise_id)
                      var isThumbnailExercise = exercise.filename && (!exercise.id || !Number.isInteger(exercise.id));

                      // Build exercise data object
                      var exerciseData = {
                        exercise_name: exercise.name || 'Unnamed Exercise',
                        sets: setsConfig.length,
                        reps: ((_setsConfig$ = setsConfig[0]) === null || _setsConfig$ === void 0 ? void 0 : _setsConfig$.reps) || 10,
                        // Keep for backward compatibility
                        rest_period: ((_setsConfig$2 = setsConfig[0]) === null || _setsConfig$2 === void 0 ? void 0 : _setsConfig$2.rest) || 30,
                        // Keep for backward compatibility
                        sets_configuration: setsConfig // Save full array
                      };

                      // Set exercise_id - null for thumbnail exercises, integer for regular exercises
                      if (isThumbnailExercise) {
                        exerciseData.exercise_id = null; // Explicitly set to null for thumbnail exercises
                      } else if (exercise.id) {
                        exerciseData.exercise_id = parseInt(exercise.id);
                      }

                      // Add plan_id only if we're editing (not creating new)
                      if (_this13.editingPlanKey) {
                        exerciseData.plan_id = _this13.editingPlanKey;
                      }

                      // Add thumbnail and video fields for thumbnail-based exercises (video_url ensures correct video plays)
                      if (isThumbnailExercise) {
                        exerciseData.thumbnail_url = exercise.thumbnail_url || '';
                        // Normalize thumbnail filename to image extension (.jpg), never video (.mp4)
                        exerciseData.thumbnail_filename = _this13.normalizeThumbnailFilename(exercise.filename || '');
                        exerciseData.video_url = exercise.video_url || null;
                      } else {
                        exerciseData.thumbnail_url = null;
                        exerciseData.thumbnail_filename = null;
                        exerciseData.video_url = null;
                      }
                      workoutActivityPlanData.exercises.push(exerciseData);
                    }
                  });
                }
              });

              // Final validation - ensure we have exercises to save
              if (!(workoutActivityPlanData.exercises.length === 0)) {
                _context6.next = 18;
                break;
              }
              _this13.$bvToast.toast("No valid exercises found to save!", {
                title: "Validation Error",
                variant: "danger",
                solid: true
              });
              return _context6.abrupt("return");
            case 18:
              console.log('Saving plan. editingPlanKey:', _this13.editingPlanKey);
              console.log('Workout data being sent:', {
                workout_id: workoutActivityPlanData.workout_id,
                workout_name: workoutActivityPlanData.workout_name,
                day: workoutActivityPlanData.day,
                exercises_count: workoutActivityPlanData.exercises.length,
                first_exercise_plan_id: ((_workoutActivityPlanD = workoutActivityPlanData.exercises[0]) === null || _workoutActivityPlanD === void 0 ? void 0 : _workoutActivityPlanD.plan_id) || 'none'
              });
              console.log('First exercise data:', workoutActivityPlanData.exercises[0]);
              console.log('Full workout data:', JSON.stringify(workoutActivityPlanData, null, 2));
              if (!_this13.editingPlanKey) {
                _context6.next = 29;
                break;
              }
              // Update existing plan - backend will check for plan_id and update if exists
              console.log('Updating existing plan with plan_id:', _this13.editingPlanKey);
              _context6.next = 26;
              return axios__WEBPACK_IMPORTED_MODULE_0___default().post('workout_activity_plan', workoutActivityPlanData);
            case 26:
              activityPlanResponse = _context6.sent;
              _context6.next = 33;
              break;
            case 29:
              // Create new plan
              console.log('Creating new plan (no editingPlanKey set)');
              _context6.next = 32;
              return axios__WEBPACK_IMPORTED_MODULE_0___default().post('workout_activity_plan', workoutActivityPlanData);
            case 32:
              activityPlanResponse = _context6.sent;
            case 33:
              if (!activityPlanResponse.data.success) {
                _context6.next = 44;
                break;
              }
              _this13.$bvToast.toast("Activity plan ".concat(_this13.editingPlanKey ? 'updated' : 'saved', " successfully for ").concat(_this13.selectedDay, "!"), {
                title: "Success",
                variant: "success",
                solid: true
              });

              // Clear the workout sections after successful save
              _this13.workoutSections = [];
              _this13.selectedDay = null;
              _this13.editingPlanKey = null; // Clear editing key

              // Refresh the saved plans list
              _context6.next = 40;
              return _this13.loadWorkoutActivityPlans();
            case 40:
              // Emit event to parent component
              _this13.$emit('workout-activity-plan-saved', {
                activity_plan: activityPlanResponse.data.data
              });

              // Navigate back to member details if we came from there
              if (_this13.cameFromMemberDetails && _this13.memberId) {
                // Small delay to show success message
                setTimeout(function () {
                  _this13.goBackToMember();
                }, 500);
              }
              _context6.next = 45;
              break;
            case 44:
              throw new Error(activityPlanResponse.data.message || 'Failed to save activity plan');
            case 45:
              _context6.next = 52;
              break;
            case 47:
              _context6.prev = 47;
              _context6.t0 = _context6["catch"](10);
              console.error('Error saving activity plan:', _context6.t0);
              console.error('Error response:', (_error$response = _context6.t0.response) === null || _error$response === void 0 ? void 0 : _error$response.data);

              // Handle specific error types
              if (_context6.t0.response && _context6.t0.response.status === 403) {
                _this13.$bvToast.toast("You don't have permission to save activity plans. Please contact your administrator.", {
                  title: "Authorization Error",
                  variant: "danger",
                  solid: true
                });
              } else if (_context6.t0.response && _context6.t0.response.status === 422) {
                // Validation error - show detailed errors
                errors = _context6.t0.response.data.errors || {};
                errorMessages = Object.keys(errors).map(function (key) {
                  var messages = Array.isArray(errors[key]) ? errors[key] : [errors[key]];
                  return "".concat(key, ": ").concat(messages.join(', '));
                }).join('\n');
                console.error('Validation errors:', errors);
                console.error('Full error response:', _context6.t0.response.data);
                _this13.$bvToast.toast("Validation failed: ".concat(errorMessages), {
                  title: "Validation Error",
                  variant: "danger",
                  solid: true,
                  toaster: 'b-toaster-top-center',
                  autoHideDelay: 10000
                });
              } else if (_context6.t0.response && _context6.t0.response.data && _context6.t0.response.data.message) {
                _this13.$bvToast.toast(_context6.t0.response.data.message, {
                  title: "Error",
                  variant: "danger",
                  solid: true
                });
              } else if (_context6.t0.message) {
                _this13.$bvToast.toast(_context6.t0.message, {
                  title: "Error",
                  variant: "danger",
                  solid: true
                });
              } else {
                _this13.$bvToast.toast("Failed to save activity plan", {
                  title: "Error",
                  variant: "danger",
                  solid: true
                });
              }
            case 52:
            case "end":
              return _context6.stop();
          }
        }, _callee6, null, [[10, 47]]);
      }))();
    },
    loadWorkoutData: function loadWorkoutData() {
      var _this14 = this;
      return _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee7() {
        var workoutData, response, workoutId, _response2, _workoutId, currentUserId, plansUrl, plansResponse, plans;
        return _regeneratorRuntime().wrap(function _callee7$(_context7) {
          while (1) switch (_context7.prev = _context7.next) {
            case 0:
              if (!_this14.editWorkoutData) {
                _context7.next = 44;
                break;
              }
              workoutData = _this14.editWorkoutData; // If only id is provided, fetch the full workout data
              if (!(_this14.editWorkoutData.id && !_this14.editWorkoutData.exercise_name)) {
                _context7.next = 14;
                break;
              }
              _context7.prev = 3;
              _context7.next = 6;
              return axios__WEBPACK_IMPORTED_MODULE_0___default().get("workout/".concat(_this14.editWorkoutData.id));
            case 6:
              response = _context7.sent;
              if (response.data.success) {
                workoutData = response.data.exercise;
              }
              _context7.next = 14;
              break;
            case 10:
              _context7.prev = 10;
              _context7.t0 = _context7["catch"](3);
              console.error('Error fetching workout data:', _context7.t0);
              return _context7.abrupt("return");
            case 14:
              // Load workout name and description
              _this14.workoutName = workoutData.exercise_name || '';
              _this14.workoutDescription = workoutData.description || '';
              // Load preset weights setting
              _this14.enablePresetWeights = workoutData.enable_preset_weights || false;

              // Load sections if available
              if (workoutData.sections && workoutData.sections.length > 0) {
                _this14.workoutSections = workoutData.sections;
              } else {
                _this14.workoutSections = [];
              }

              // Load training plan if available
              if (workoutData.trainingPlan) {
                _this14.trainingPlan = workoutData.trainingPlan;
              }

              // Load existing workout days
              _context7.prev = 19;
              workoutId = workoutData.exercise_id || workoutData.id;
              _context7.next = 23;
              return axios__WEBPACK_IMPORTED_MODULE_0___default().get("workout_days/".concat(workoutId));
            case 23:
              _response2 = _context7.sent;
              if (_response2.data.success && _response2.data.data.length > 0) {
                // Convert workout days to training plan format
                _this14.trainingPlan.days = _response2.data.data.map(function (workoutDay) {
                  return {
                    name: workoutDay.day,
                    workout: '',
                    notes: ''
                  };
                });

                // If there are days, select the first one by default
                if (_this14.trainingPlan.days.length > 0) {
                  _this14.selectedDay = _this14.trainingPlan.days[0].name;
                }
              }
              _context7.next = 30;
              break;
            case 27:
              _context7.prev = 27;
              _context7.t1 = _context7["catch"](19);
              console.error('Error loading workout days:', _context7.t1);
              // If no workout days found, that's fine - it's a new workout
            case 30:
              _context7.prev = 30;
              _workoutId = workoutData.exercise_id || workoutData.id;
              currentUserId = _this14.getCurrentUserId();
              plansUrl = 'workout_activity_plan';
              if (currentUserId) {
                plansUrl += "?user_id=".concat(currentUserId);
              }
              _context7.next = 37;
              return axios__WEBPACK_IMPORTED_MODULE_0___default().get(plansUrl);
            case 37:
              plansResponse = _context7.sent;
              if (plansResponse.data.success) {
                // Filter plans for this specific workout and user
                plans = plansResponse.data.data;
                if (currentUserId) {
                  plans = plans.filter(function (plan) {
                    return plan.user_id == currentUserId;
                  });
                }
                _this14.workoutActivityPlans = plans.filter(function (plan) {
                  return plan.workout_id === _workoutId;
                });
              }
              _context7.next = 44;
              break;
            case 41:
              _context7.prev = 41;
              _context7.t2 = _context7["catch"](30);
              console.error('Error loading workout activity plans:', _context7.t2);
            case 44:
            case "end":
              return _context7.stop();
          }
        }, _callee7, null, [[3, 10], [19, 27], [30, 41]]);
      }))();
    },
    // Cancel editing and return to workout list
    cancelEdit: function cancelEdit() {
      this.enablePresetWeights = false;
      this.$emit('workout-saved', null);

      // Navigate back to member details if we came from there
      if (this.cameFromMemberDetails && this.memberId) {
        this.goBackToMember();
      }
    },
    goBackToMember: function goBackToMember() {
      // Get memberId from query params if not already set (in case component was reloaded)
      var memberId = this.memberId || this.$route.query.memberId;
      if (memberId) {
        // Ensure memberId is a string (Vue Router params should be strings)
        var memberIdStr = String(memberId);
        this.$router.push({
          name: 'MemberDetails',
          params: {
            id: memberIdStr
          }
        })["catch"](function (err) {
          console.error('Navigation failed:', err);
          // Fallback: try using direct path
          var targetPath = "/app/Members/MemberDetails/".concat(memberIdStr);
          window.location.href = targetPath;
        });
      } else {
        // If no memberId, go back in history
        this.$router.go(-1);
      }
    },
    // Add a new day to the training plan
    addDay: function addDay() {
      // Check if all days are already added
      var existingDays = this.trainingPlan.days.map(function (d) {
        return d.name;
      }).filter(Boolean);
      var availableDays = this.dayOptions.filter(function (day) {
        return !existingDays.includes(day.value);
      });
      if (availableDays.length === 0) {
        this.$bvToast.toast("All days have already been added to the training plan!", {
          title: "No More Days",
          variant: "warning",
          solid: true
        });
        return;
      }

      // Take the first available day (e.g., Monday or the next free)
      var firstAvailable = availableDays[0];

      // Prefill the new day with this name
      this.trainingPlan.days.push({
        name: firstAvailable.value,
        workout: "",
        notes: "",
        isNew: true
      });

      // Also select this day in the UI so related data loads for it
      this.selectDay(firstAvailable.value);
    },
    selectDay: function selectDay(dayName) {
      if (dayName) {
        this.selectedDay = dayName;
        this.editingPlanKey = null; // Clear editing key when selecting a new day
        this.editingPlanIds = []; // Clear editing plan IDs
        this.workoutSections = []; // Clear editable sections
        this.loadWorkoutActivityPlans();
      }
    },
    clearSelectedDay: function clearSelectedDay() {
      this.selectedDay = null;
    },
    onDayNameChange: function onDayNameChange(dayIndex, newName) {
      var oldName = this.trainingPlan.days[dayIndex].name;
      if (this.selectedDay === oldName) {
        this.selectedDay = newName;

        // Update exercises that were associated with the old day name
        this.workoutSections.forEach(function (section) {
          if (section.exercises) {
            section.exercises.forEach(function (exercise) {
              if (exercise.day === oldName) {
                exercise.day = newName;
              }
            });
          }
        });
      }
    },
    // Get the number of exercises for a specific day
    getDayExerciseCount: function getDayExerciseCount(dayName) {
      if (!this.workoutSections || this.workoutSections.length === 0) {
        return 0;
      }
      return this.workoutSections.reduce(function (total, section) {
        return total + (section.exercises ? section.exercises.filter(function (ex) {
          return ex.day === dayName;
        }).length : 0);
      }, 0);
    },
    // Remove a day from the training plan
    removeDay: function removeDay(dayIndex) {
      var dayToRemove = this.trainingPlan.days[dayIndex].name;

      // If this day was selected, clear selection
      if (this.selectedDay === dayToRemove) {
        this.selectedDay = null;
      }

      // Remove exercises for this day
      this.workoutSections.forEach(function (section) {
        if (section.exercises) {
          section.exercises = section.exercises.filter(function (ex) {
            return ex.day !== dayToRemove;
          });
        }
      });

      // Remove empty sections
      this.workoutSections = this.workoutSections.filter(function (section) {
        return section.exercises && section.exercises.length > 0;
      });
      this.trainingPlan.days.splice(dayIndex, 1);

      // Optional toast for day removal
      // this.$bvToast.toast(`Removed ${dayToRemove} and its exercises`, {
      //     title: "Day Removed",
      //     variant: "warning",
      //     solid: true
      // });
    },
    // Duplicate the current training plan
    duplicatePlan: function duplicatePlan() {
      var duplicatedPlan = JSON.parse(JSON.stringify(this.trainingPlan));
      duplicatedPlan.name = "".concat(this.trainingPlan.name, " (Copy)");
      // Optional toast for plan duplication
      // this.$bvToast.toast("Training plan duplicated!", {
      //     title: "Success",
      //     variant: "success",
      //     solid: true
      // });
    },
    // Handle image loading errors by setting a default image
    handleImageError: function handleImageError(event) {
      var img = event.target;
      // If the replacement also fails, fall back to a tiny inline image and stop retrying
      if (img.dataset.fallbackTried === '1') {
        img.onerror = null; // stop the loop permanently
        img.src = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw=='; // 1x1 transparent gif
        return;
      }
      // Try project placeholder once
      img.dataset.fallbackTried = '1';
      img.src = '/images/no-image.png';
    },
    // Format category name for display (e.g., "upper-body" -> "Upper Body")
    formatCategory: function formatCategory(category) {
      if (!category) return 'Other';
      return category.split('-').map(function (word) {
        return word.charAt(0).toUpperCase() + word.slice(1);
      }).join(' ');
    },
    // Format muscle group name for display (e.g., "full-body" -> "Full Body")
    formatMuscle: function formatMuscle(muscle) {
      if (!muscle) return 'Full Body';
      return muscle.split('-').map(function (word) {
        return word.charAt(0).toUpperCase() + word.slice(1);
      }).join(' ');
    },
    // Check if exercise has metadata
    hasMetadata: function hasMetadata(exercise) {
      return !!(exercise.category || exercise.equipment || exercise.level || exercise.targeted_muscle);
    },
    // Methods for workout activity plans
    loadWorkoutActivityPlans: function loadWorkoutActivityPlans() {
      var _this15 = this;
      return _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee8() {
        var currentUserId, apiUrl, response, plans;
        return _regeneratorRuntime().wrap(function _callee8$(_context8) {
          while (1) switch (_context8.prev = _context8.next) {
            case 0:
              if (_this15.editWorkoutData) {
                _context8.next = 2;
                break;
              }
              return _context8.abrupt("return");
            case 2:
              _this15.loadingPlans = true;
              _context8.prev = 3;
              // Get current user ID (for potential future use, but not filtering client-side)
              currentUserId = _this15.getCurrentUserId(); // Build API URL - backend handles gym_id filtering automatically
              apiUrl = 'workout_activity_plan/' + _this15.editWorkoutData.id;
              if (currentUserId) {
                // Pass user_id as query param if needed for backend filtering
                apiUrl += "?user_id=".concat(currentUserId);
              }
              _context8.next = 9;
              return axios__WEBPACK_IMPORTED_MODULE_0___default().get(apiUrl);
            case 9:
              response = _context8.sent;
              if (!response.data.success) {
                _context8.next = 16;
                break;
              }
              // Use all plans returned by API (backend already filters by gym_id)
              // Note: API response doesn't include user_id field, so don't filter client-side
              plans = response.data.data || []; // Ensure plans is an array
              if (!Array.isArray(plans)) {
                plans = [];
              }
              _this15.workoutActivityPlans = plans;

              // Optional success toasts for loading plans
              // if (this.selectedDay) {
              //     const dayPlans = this.workoutActivityPlans.filter(plan => plan.day === this.selectedDay);
              //     this.$bvToast.toast(`Loaded ${dayPlans.length} workout plans for ${this.selectedDay}`, {
              //         title: "Success",
              //         variant: "success",
              //         solid: true
              //     });
              // } else {
              //     this.$bvToast.toast(`Loaded ${this.workoutActivityPlans.length} total workout plans`, {
              //         title: "Success",
              //         variant: "success",
              //         solid: true
              //     });
              // }
              _context8.next = 17;
              break;
            case 16:
              throw new Error(response.data.message || 'Failed to load workout plans');
            case 17:
              _context8.next = 23;
              break;
            case 19:
              _context8.prev = 19;
              _context8.t0 = _context8["catch"](3);
              console.error('Error loading workout activity plans:', _context8.t0);

              // Handle specific error types
              if (_context8.t0.response && _context8.t0.response.status === 403) {
                _this15.$bvToast.toast("You don't have permission to view workout plans. Please contact your administrator.", {
                  title: "Authorization Error",
                  variant: "danger",
                  solid: true
                });
              } else if (_context8.t0.response && _context8.t0.response.data && _context8.t0.response.data.message) {
                _this15.$bvToast.toast(_context8.t0.response.data.message, {
                  title: "Error",
                  variant: "danger",
                  solid: true
                });
              } else {
                _this15.$bvToast.toast("Failed to load workout plans", {
                  title: "Error",
                  variant: "danger",
                  solid: true
                });
              }
            case 23:
              _context8.prev = 23;
              _this15.loadingPlans = false;
              return _context8.finish(23);
            case 26:
            case "end":
              return _context8.stop();
          }
        }, _callee8, null, [[3, 19, 23, 26]]);
      }))();
    },
    // Generate a stable composite key for a plan (doesn't change with auto-increment ID)
    generatePlanKey: function generatePlanKey(plan) {
      // First, try to use plan_id if it exists (preferred method)
      if (plan.plan_id) {
        return plan.plan_id;
      }

      // Fallback: Generate a stable key for plans without plan_id (backward compatibility)
      var workoutId = plan.workout_id || (this.editWorkoutData ? this.editWorkoutData.id : null);
      var day = plan.day;
      var exerciseId = plan.exercise_id;
      var thumbnailFilename = plan.thumbnail_filename;

      // Create stable key: workout_id:day:exercise_id or workout_id:day:thumbnail_filename
      if (exerciseId) {
        return "plan_".concat(workoutId, "_").concat(day, "_exercise_").concat(exerciseId);
      } else if (thumbnailFilename) {
        return "plan_".concat(workoutId, "_").concat(day, "_thumbnail_").concat(thumbnailFilename);
      } else {
        // Fallback: use exercise_name if available
        var exerciseName = plan.exercise_name || 'unknown';
        return "plan_".concat(workoutId, "_").concat(day, "_name_").concat(exerciseName);
      }
    },
    loadPlanToEditor: function loadPlanToEditor(plan) {
      var _this16 = this;
      return _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee9() {
        var workoutResponse, isThumbnailExercise, setsConfig, i, exercise, _plan$exercise_data4, _plan$exercise_data5, _plan$exercise_data6, _setsConfig$3, _setsConfig$4, _setsConfig$5, _setsConfig$6;
        return _regeneratorRuntime().wrap(function _callee9$(_context9) {
          while (1) switch (_context9.prev = _context9.next) {
            case 0:
              _context9.prev = 0;
              // Debug: Log the plan data to verify sets_configuration is received
              console.log('Loading plan to editor:', plan);
              console.log('sets_configuration from API:', plan.sets_configuration);
              console.log('sets_configuration type:', _typeof(plan.sets_configuration));
              console.log('sets_configuration is array:', Array.isArray(plan.sets_configuration));
              if (plan.sets_configuration && Array.isArray(plan.sets_configuration)) {
                console.log('sets_configuration length:', plan.sets_configuration.length);
                console.log('sets_configuration content:', JSON.stringify(plan.sets_configuration));
              }

              // Set the editing plan key using stable composite identifier
              _this16.editingPlanKey = _this16.generatePlanKey(plan);
              console.log('Setting editingPlanKey to:', _this16.editingPlanKey, 'from plan:', plan);

              // Set editWorkoutData if workout_id is available in the plan
              console.log('Plan workout_id:', plan.workout_id, 'Current editWorkoutData:', _this16.editWorkoutData);
              if (!(plan.workout_id && !_this16.editWorkoutData)) {
                _context9.next = 22;
                break;
              }
              _this16.editWorkoutData = {
                id: plan.workout_id
              };
              console.log('Set editWorkoutData to:', _this16.editWorkoutData);
              // Load workout data to get enable_preset_weights
              _context9.prev = 12;
              _context9.next = 15;
              return axios__WEBPACK_IMPORTED_MODULE_0___default().get("workout/".concat(plan.workout_id));
            case 15:
              workoutResponse = _context9.sent;
              if (workoutResponse.data.success && workoutResponse.data.exercise) {
                _this16.enablePresetWeights = workoutResponse.data.exercise.enable_preset_weights || false;
              }
              _context9.next = 22;
              break;
            case 19:
              _context9.prev = 19;
              _context9.t0 = _context9["catch"](12);
              console.error('Error loading workout data for preset weights:', _context9.t0);
            case 22:
              // Set the selected day
              _this16.selectedDay = plan.day;

              // Set workout name and description
              _this16.workoutName = plan.exercise_name || 'Unnamed Workout';
              _this16.workoutDescription = plan.description || '';

              // Clear existing sections
              _this16.workoutSections = [];

              // Create a new section with the exercise
              if (plan.exercise_data) {
                // Check if this is a thumbnail-based exercise
                isThumbnailExercise = !plan.exercise_id && plan.thumbnail_url; // Determine setsConfiguration with proper fallbacks
                if (plan.sets_configuration && Array.isArray(plan.sets_configuration) && plan.sets_configuration.length > 0) {
                  // Use saved sets_configuration, but filter out sets with reps=0
                  setsConfig = plan.sets_configuration.filter(function (set) {
                    return set.reps > 0;
                  }).map(function (set) {
                    // Ensure weight is included if enablePresetWeights is true
                    var setObj = {
                      reps: set.reps,
                      rest: set.rest || 30
                    };
                    if (_this16.enablePresetWeights) {
                      setObj.weight = set.weight || 0;
                    }
                    return setObj;
                  });
                  console.log('Filtered setsConfig (after removing reps=0):', setsConfig);
                  console.log('Filtered setsConfig length:', setsConfig.length);
                } else if (plan.sets && plan.reps && plan.rest_seconds) {
                  // Fallback: create array from single values (create new objects for each element)
                  setsConfig = [];
                  for (i = 0; i < plan.sets; i++) {
                    setsConfig.push(_this16.createDefaultSet(plan.reps, plan.rest_seconds));
                  }
                } else {
                  // Final fallback: default 3 sets
                  setsConfig = [_this16.createDefaultSet(10, 30), _this16.createDefaultSet(10, 30), _this16.createDefaultSet(10, 30)];
                }

                // Ensure at least 3 sets
                while (setsConfig.length < 3) {
                  setsConfig.push(_this16.createDefaultSet(10, 30));
                }
                console.log('Final setsConfig before assigning to section:', setsConfig);
                console.log('Final setsConfig length:', setsConfig.length);
                if (isThumbnailExercise) {
                  // Thumbnail-based or video_catalog exercise (video_link from backend → correct play)
                  exercise = {
                    id: plan.exercise_id || null,
                    name: plan.exercise_name || ((_plan$exercise_data4 = plan.exercise_data) === null || _plan$exercise_data4 === void 0 ? void 0 : _plan$exercise_data4.exercise_name),
                    thumbnail_url: plan.thumbnail_url || ((_plan$exercise_data5 = plan.exercise_data) === null || _plan$exercise_data5 === void 0 ? void 0 : _plan$exercise_data5.thumbnail),
                    filename: plan.thumbnail_filename || ((_plan$exercise_data6 = plan.exercise_data) === null || _plan$exercise_data6 === void 0 ? void 0 : _plan$exercise_data6.thumbnail_filename),
                    video_url: plan.video_link || plan.video_url || null,
                    exerciseType: 'repetition',
                    intensityType: 'max',
                    intensityValue: 0,
                    notes: plan.notes || '',
                    // Workout-specific settings (backward compatibility)
                    sets: plan.sets || setsConfig.length,
                    reps: plan.reps || ((_setsConfig$3 = setsConfig[0]) === null || _setsConfig$3 === void 0 ? void 0 : _setsConfig$3.reps) || 10,
                    rest: plan.rest_seconds || ((_setsConfig$4 = setsConfig[0]) === null || _setsConfig$4 === void 0 ? void 0 : _setsConfig$4.rest) || 30,
                    // Day association
                    day: plan.day
                  };
                } else {
                  // Regular exercise from workout_activities table
                  exercise = {
                    id: plan.exercise_id,
                    name: plan.exercise_data.exercise_name,
                    category: plan.exercise_data.category,
                    muscle: plan.exercise_data.muscles_targeted || 'Full Body',
                    difficulty: plan.exercise_data.level,
                    image: plan.exercise_data.thumbnail || '/images/99078543gym logo.png',
                    description: plan.exercise_data.description,
                    instructions: plan.exercise_data.instructions,
                    equipment: plan.exercise_data.equipment,
                    duration: plan.exercise_data.duration,
                    calories: plan.exercise_data.calories_burned,
                    videoLink: plan.exercise_data.video_link,
                    tags: plan.exercise_data.tags,
                    restPeriod: plan.exercise_data.rest_period,
                    exerciseType: 'repetition',
                    intensityType: 'max',
                    intensityValue: 0,
                    notes: plan.notes || '',
                    // Workout-specific settings (backward compatibility)
                    sets: plan.sets || setsConfig.length,
                    reps: plan.reps || ((_setsConfig$5 = setsConfig[0]) === null || _setsConfig$5 === void 0 ? void 0 : _setsConfig$5.reps) || 10,
                    rest: plan.rest_seconds || ((_setsConfig$6 = setsConfig[0]) === null || _setsConfig$6 === void 0 ? void 0 : _setsConfig$6.rest) || 30,
                    // Day association
                    day: plan.day
                  };
                }

                // Add to a new section with setsConfiguration
                console.log('Creating section with setsConfiguration:', setsConfig);
                console.log('Section setsConfiguration length:', setsConfig.length);
                _this16.workoutSections.push({
                  name: 'Main Section',
                  exercises: [exercise],
                  exerciseType: 'repetition',
                  setsConfiguration: setsConfig,
                  intensityType: 'max',
                  intensityValue: 0,
                  notes: plan.notes || ''
                });
              }

              // Optional toast for plan loading
              // this.$bvToast.toast(`Loaded workout plan for ${plan.day}`, {
              //     title: "Plan Loaded",
              //     variant: "success",
              //     solid: true
              // });
              _context9.next = 33;
              break;
            case 29:
              _context9.prev = 29;
              _context9.t1 = _context9["catch"](0);
              console.error('Error loading plan to editor:', _context9.t1);
              _this16.$bvToast.toast("Failed to load plan to editor", {
                title: "Error",
                variant: "danger",
                solid: true
              });
            case 33:
            case "end":
              return _context9.stop();
          }
        }, _callee9, null, [[0, 29], [12, 19]]);
      }))();
    },
    deleteWorkoutPlan: function deleteWorkoutPlan(planId) {
      var _this17 = this;
      return _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee10() {
        var response;
        return _regeneratorRuntime().wrap(function _callee10$(_context10) {
          while (1) switch (_context10.prev = _context10.next) {
            case 0:
              _context10.prev = 0;
              _context10.next = 3;
              return axios__WEBPACK_IMPORTED_MODULE_0___default()["delete"]("workout_activity_plan/".concat(planId));
            case 3:
              response = _context10.sent;
              if (!response.data.success) {
                _context10.next = 8;
                break;
              }
              // Remove from local array
              _this17.workoutActivityPlans = _this17.workoutActivityPlans.filter(function (plan) {
                return plan.id !== planId;
              });

              // Optional toast for successful deletion
              // this.$bvToast.toast("Workout plan deleted successfully", {
              //     title: "Success",
              //     variant: "success",
              //     solid: true
              // });
              _context10.next = 9;
              break;
            case 8:
              throw new Error(response.data.message || 'Failed to delete workout plan');
            case 9:
              _context10.next = 15;
              break;
            case 11:
              _context10.prev = 11;
              _context10.t0 = _context10["catch"](0);
              console.error('Error deleting workout plan:', _context10.t0);

              // Handle specific error types
              if (_context10.t0.response && _context10.t0.response.status === 403) {
                _this17.$bvToast.toast("You don't have permission to delete workout plans. Please contact your administrator.", {
                  title: "Authorization Error",
                  variant: "danger",
                  solid: true
                });
              } else if (_context10.t0.response && _context10.t0.response.data && _context10.t0.response.data.message) {
                _this17.$bvToast.toast(_context10.t0.response.data.message, {
                  title: "Error",
                  variant: "danger",
                  solid: true
                });
              } else {
                _this17.$bvToast.toast("Failed to delete workout plan", {
                  title: "Error",
                  variant: "danger",
                  solid: true
                });
              }
            case 15:
            case "end":
              return _context10.stop();
          }
        }, _callee10, null, [[0, 11]]);
      }))();
    },
    formatDate: function formatDate(dateString) {
      if (!dateString) return 'Unknown date';
      var date = new Date(dateString);
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
    },
    getExistingPlansForDay: function getExistingPlansForDay(dayName) {
      return this.workoutActivityPlans.filter(function (plan) {
        return plan.day === dayName;
      });
    },
    loadExistingPlanToEditor: function loadExistingPlanToEditor(plan) {
      // Add plan ID to editing list
      if (!this.editingPlanIds.includes(plan.id)) {
        this.editingPlanIds.push(plan.id);
      }
      // Load the plan into editable sections
      this.loadPlanToEditor(plan);
    },
    // Add a set to section
    addSetToSection: function addSetToSection(section) {
      if (!section.setsConfiguration) {
        this.$set(section, 'setsConfiguration', []);
      }
      section.setsConfiguration.push(this.createDefaultSet(0, 30));
    },
    // Delete a set from section
    deleteSetFromSection: function deleteSetFromSection(section) {
      if (!section.setsConfiguration || section.setsConfiguration.length === 0) {
        return;
      }
      // Don't allow deleting if already at minimum of 3 sets
      if (section.setsConfiguration.length <= 3) {
        return;
      }
      // Remove the last set
      section.setsConfiguration.pop();
    },
    // Delete a set by index (for per-row delete buttons)
    deleteSetByIndex: function deleteSetByIndex(section, setIndex) {
      if (!section.setsConfiguration || !section.setsConfiguration[setIndex]) {
        return;
      }

      // If we have more than 3 sets, delete directly
      if (section.setsConfiguration.length > 3) {
        section.setsConfiguration.splice(setIndex, 1);
      } else {
        // If at 3 sets or below, set reps to 0 (will be filtered out on load)
        section.setsConfiguration[setIndex].reps = 0;
      }
    },
    // Add a set to exercise (backward compatibility)
    addSet: function addSet(exercise) {
      if (!exercise.setsConfiguration) {
        this.$set(exercise, 'setsConfiguration', []);
      }
      exercise.setsConfiguration.push({
        reps: 0,
        rest: 30
      });
      // Update sets count for backward compatibility
      exercise.sets = exercise.setsConfiguration.length;
    },
    // Delete a set from exercise (backward compatibility)
    deleteSet: function deleteSet(exercise) {
      if (!exercise.setsConfiguration || exercise.setsConfiguration.length === 0) {
        return;
      }
      // Remove the last set
      exercise.setsConfiguration.pop();
      // Update sets count for backward compatibility
      exercise.sets = exercise.setsConfiguration.length;
    },
    // Validate exercise input values
    validateExerciseInput: function validateExerciseInput(exercise, field) {
      if (!exercise || !field) return;
      var value = exercise[field];

      // Ensure value is a number
      if (isNaN(value) || value === null || value === undefined) {
        exercise[field] = field === 'rest' ? 0 : 1;
        return;
      }

      // Apply min/max constraints
      switch (field) {
        case 'sets':
          exercise.sets = Math.max(1, Math.min(50, Math.floor(value)));
          break;
        case 'reps':
          exercise.reps = Math.max(1, Math.min(100, Math.floor(value)));
          break;
        case 'rest':
          exercise.rest = Math.max(0, Math.min(600, Math.floor(value)));
          break;
      }
    },
    // Get current user ID from various sources
    getCurrentUserId: function getCurrentUserId() {
      // First check if userId prop is provided
      if (this.userId) {
        return this.userId;
      }

      // Try to get from Vuex store
      if (this.$store && this.$store.state.auth && this.$store.state.auth.user) {
        return this.$store.state.auth.user.id;
      }

      // Try to get from localStorage
      var userData = localStorage.getItem('user');
      if (userData) {
        try {
          var user = JSON.parse(userData);
          return user.id;
        } catch (e) {
          console.error('Error parsing user data from localStorage:', e);
        }
      }

      // Try to get from sessionStorage
      var sessionUserData = sessionStorage.getItem('user');
      if (sessionUserData) {
        try {
          var _user = JSON.parse(sessionUserData);
          return _user.id;
        } catch (e) {
          console.error('Error parsing user data from sessionStorage:', e);
        }
      }
      return null;
    },
    loadAllWorkouts: function loadAllWorkouts() {
      var _this18 = this;
      return _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee11() {
        var response;
        return _regeneratorRuntime().wrap(function _callee11$(_context11) {
          while (1) switch (_context11.prev = _context11.next) {
            case 0:
              _context11.prev = 0;
              _context11.next = 3;
              return axios__WEBPACK_IMPORTED_MODULE_0___default().get('workout');
            case 3:
              response = _context11.sent;
              if (response.data && response.data.exercises) {
                _this18.allWorkouts = response.data.exercises;
                _this18.workoutSelectOptions = [{
                  value: null,
                  text: 'Choose a workout...'
                }].concat(_toConsumableArray(_this18.allWorkouts.map(function (w) {
                  return {
                    value: w.id || w.exercise_id,
                    text: w.exercise_name || w.name || 'Unnamed Workout'
                  };
                })));
              }
              _context11.next = 10;
              break;
            case 7:
              _context11.prev = 7;
              _context11.t0 = _context11["catch"](0);
              _this18.$bvToast.toast('Failed to load workouts for selection.', {
                title: 'Error',
                variant: 'danger',
                solid: true
              });
            case 10:
            case "end":
              return _context11.stop();
          }
        }, _callee11, null, [[0, 7]]);
      }))();
    },
    onSelectWorkout: function onSelectWorkout() {
      var _this19 = this;
      return _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee12() {
        var selected;
        return _regeneratorRuntime().wrap(function _callee12$(_context12) {
          while (1) switch (_context12.prev = _context12.next) {
            case 0:
              if (_this19.selectedWorkoutId) {
                _context12.next = 2;
                break;
              }
              return _context12.abrupt("return");
            case 2:
              // Find the selected workout object
              selected = _this19.allWorkouts.find(function (w) {
                return (w.id || w.exercise_id) == _this19.selectedWorkoutId;
              });
              if (selected) {
                // Emit to parent or set editWorkoutData directly if local
                _this19.$emit('edit-workout', selected);
                // If you want to set it locally:
                // this.editWorkoutData = selected;
              }
            case 4:
            case "end":
              return _context12.stop();
          }
        }, _callee12);
      }))();
    },
    getDaySelectOptions: function getDaySelectOptions(index) {
      var currentName = this.trainingPlan.days[index].name;
      // Start with placeholder
      var options = [{
        value: '',
        text: 'No day selected'
      }];
      // Get all selected days except the current one
      var selectedByOthers = this.trainingPlan.days.map(function (d, i) {
        return i !== index ? d.name : null;
      }).filter(Boolean);
      // Add all available days except those selected by others
      var available = this.dayOptions.filter(function (day) {
        return !selectedByOthers.includes(day.value);
      });
      options = options.concat(available);
      // If current value is not in options, add it (for edit case)
      if (currentName && !options.some(function (opt) {
        return opt.value === currentName;
      })) {
        options.push({
          value: currentName,
          text: currentName
        });
      }
      return options;
    }
  },
  // Component lifecycle
  mounted: function mounted() {
    try {
      // Check if we came from MemberDetails
      if (this.$route.query.from === 'memberDetails') {
        this.cameFromMemberDetails = true;
        this.showBreadcrumb = true;
        this.memberId = this.$route.query.memberId || null;
        this.memberName = this.$route.query.memberName || 'Member';
      }

      // Check for workoutId in query params
      if (this.$route.query.workoutId && !this.editWorkoutData) {
        var workoutId = this.$route.query.workoutId;
        this.editWorkoutData = {
          id: parseInt(workoutId)
        };
      }

      // Load exercises from API
      this.loadActivities();
      // Load workout data if editing
      this.loadWorkoutData();
      // Load saved workout activity plans
      this.loadWorkoutActivityPlans();
      this.loadAllWorkouts();
    } catch (error) {
      console.error('Error in component mounted:', error);
      this.$bvToast.toast("Failed to initialize workout editor. Please refresh the page.", {
        title: "Initialization Error",
        variant: "danger",
        solid: true
      });
    }
  },
  // Watch for changes in props and data
  watch: {
    editWorkoutData: {
      handler: function handler(newData) {
        if (newData) {
          this.loadWorkoutData();
          // Load workout activity plans when workout data changes
          this.loadWorkoutActivityPlans();
        } else {
          // Reset preset weights when no workout is selected
          this.enablePresetWeights = false;
          // Clear workout activity plans when no workout is selected
          this.workoutActivityPlans = [];
        }
      },
      immediate: true
    },
    showThumbnailGrid: function showThumbnailGrid(newVal) {
      var _this20 = this;
      if (newVal) {
        // Reset scroll position and button visibility when grid opens
        this.$nextTick(function () {
          if (_this20.$refs.thumbnailGrid) {
            _this20.$refs.thumbnailGrid.scrollTop = 0;
            _this20.showScrollToTop = false;
          }
        });
      } else {
        // Hide button when grid closes
        this.showScrollToTop = false;
      }
    },
    // Refetch thumbnails when filters change (server-side filtering by video_catalog columns)
    filterBodyPart: function filterBodyPart() {
      if (this.showThumbnailGrid) this.loadAllThumbnails();
    },
    filterMuscleGroup: function filterMuscleGroup() {
      if (this.showThumbnailGrid) this.loadAllThumbnails();
    },
    filterExerciseType: function filterExerciseType() {
      if (this.showThumbnailGrid) this.loadAllThumbnails();
    },
    filterLevel: function filterLevel() {
      if (this.showThumbnailGrid) this.loadAllThumbnails();
    },
    filterEquipment: function filterEquipment() {
      if (this.showThumbnailGrid) this.loadAllThumbnails();
    },
    thumbnailSearch: {
      handler: function handler() {
        var _this21 = this;
        if (!this.showThumbnailGrid) return;
        if (this._searchDebounce) clearTimeout(this._searchDebounce);
        this._searchDebounce = setTimeout(function () {
          return _this21.loadAllThumbnails();
        }, 400);
      }
    }
  }
});

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js??clonedRuleSet-12.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12.use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-12.use[3]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/Workout/WorkoutEditor.vue?vue&type=style&index=0&id=38aa54aa&lang=scss&scoped=true":
/*!************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??clonedRuleSet-12.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12.use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-12.use[3]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/Workout/WorkoutEditor.vue?vue&type=style&index=0&id=38aa54aa&lang=scss&scoped=true ***!
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
___CSS_LOADER_EXPORT___.push([module.id, "@charset \"UTF-8\";\n.filter-btn .btn[data-v-38aa54aa],\n.filter-btn .btn-secondary[data-v-38aa54aa],\n.filter-btn .btn-outline-secondary[data-v-38aa54aa],\n.filter-btn button.btn[data-v-38aa54aa],\n.filter-btn button.btn-secondary[data-v-38aa54aa] {\n  color: #000 !important;\n  background-color: transparent !important;\n  border-color: #6c757d !important;\n}\n.filter-btn .btn[data-v-38aa54aa]:hover,\n.filter-btn .btn-secondary[data-v-38aa54aa]:hover,\n.filter-btn .btn-outline-secondary[data-v-38aa54aa]:hover,\n.filter-btn button.btn[data-v-38aa54aa]:hover,\n.filter-btn button.btn-secondary[data-v-38aa54aa]:hover {\n  color: #dc3545 !important;\n  background-color: transparent !important;\n  border-color: #dc3545 !important;\n  box-shadow: none !important;\n}\n.filter-btn .btn[data-v-38aa54aa]:focus,\n.filter-btn .btn-secondary[data-v-38aa54aa]:focus,\n.filter-btn .btn-outline-secondary[data-v-38aa54aa]:focus,\n.filter-btn button.btn[data-v-38aa54aa]:focus,\n.filter-btn button.btn-secondary[data-v-38aa54aa]:focus {\n  color: #dc3545 !important;\n  background-color: transparent !important;\n  border-color: #dc3545 !important;\n  box-shadow: none !important;\n}\n.filter-btn .btn[data-v-38aa54aa]:active,\n.filter-btn .btn-secondary[data-v-38aa54aa]:active,\n.filter-btn .btn-outline-secondary[data-v-38aa54aa]:active,\n.filter-btn button.btn[data-v-38aa54aa]:active,\n.filter-btn button.btn-secondary[data-v-38aa54aa]:active {\n  color: #dc3545 !important;\n  background-color: transparent !important;\n  border-color: #dc3545 !important;\n}\n.btn-secondary[data-v-38aa54aa]:not(:disabled):not(.disabled):active:focus {\n  box-shadow: none !important;\n}\n\n/* ===========================================\n   COMMON BREADCRUMB NAVIGATION STYLES\n   =========================================== */\n.breadcrumb-nav-row[data-v-38aa54aa] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  margin-bottom: 0.5rem;\n  gap: 0.5rem;\n}\n.breadcrumb-section[data-v-38aa54aa] {\n  flex: 1;\n}\n.breadcrumb-section .breadcrumb-nav .breadcrumb-container[data-v-38aa54aa] {\n  display: flex;\n  align-items: center;\n  gap: 1rem;\n}\n.breadcrumb-section .breadcrumb-nav .breadcrumb-container .back-button[data-v-38aa54aa] {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  width: 40px;\n  height: 40px;\n  background: rgba(255, 255, 255, 0.1);\n  border: 1px solid rgba(255, 255, 255, 0.2);\n  border-radius: 8px;\n  color: #ffffff;\n  cursor: pointer;\n  transition: all 0.3s ease;\n}\n.breadcrumb-section .breadcrumb-nav .breadcrumb-container .back-button[data-v-38aa54aa]:hover {\n  background: rgba(255, 255, 255, 0.15);\n  border-color: rgba(255, 255, 255, 0.3);\n  transform: translateY(-1px);\n  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);\n  color: #dc3545;\n}\n.breadcrumb-section .breadcrumb-nav .breadcrumb-container .back-button i[data-v-38aa54aa] {\n  font-size: 1.1em;\n}\n.breadcrumb-section .breadcrumb-nav .breadcrumb-container .breadcrumb[data-v-38aa54aa] {\n  display: flex;\n  align-items: center;\n  gap: 0.5rem;\n  margin: 0;\n  padding: 0;\n  background: none;\n  border-radius: 0;\n}\n.breadcrumb-section .breadcrumb-nav .breadcrumb-container .breadcrumb .breadcrumb-item[data-v-38aa54aa] {\n  display: flex;\n  align-items: center;\n  gap: 0.5rem;\n  font-size: 0.875rem;\n  color: #ffffff;\n}\n.breadcrumb-section .breadcrumb-nav .breadcrumb-container .breadcrumb .breadcrumb-item.active[data-v-38aa54aa] {\n  color: #252525;\n  font-weight: 600;\n}\n.breadcrumb-section .breadcrumb-nav .breadcrumb-container .breadcrumb .breadcrumb-item.active i[data-v-38aa54aa] {\n  color: #dc3545;\n}\n.breadcrumb-section .breadcrumb-nav .breadcrumb-container .breadcrumb .breadcrumb-item a[data-v-38aa54aa] {\n  display: flex;\n  align-items: center;\n  gap: 0.5rem;\n  color: #6a6a6a;\n  text-decoration: none;\n  transition: color 0.3s ease;\n}\n.breadcrumb-section .breadcrumb-nav .breadcrumb-container .breadcrumb .breadcrumb-item a[data-v-38aa54aa]:hover {\n  color: #dc3545;\n}\n.breadcrumb-section .breadcrumb-nav .breadcrumb-container .breadcrumb .breadcrumb-item a:hover i[data-v-38aa54aa] {\n  color: #dc3545;\n}\n.breadcrumb-section .breadcrumb-nav .breadcrumb-container .breadcrumb .breadcrumb-item a i[data-v-38aa54aa] {\n  font-size: 0.9em;\n  transition: color 0.3s ease;\n}\n.breadcrumb-section .breadcrumb-nav .breadcrumb-container .breadcrumb .breadcrumb-item[data-v-38aa54aa]:not(:last-child)::after {\n  content: \"›\";\n  margin-left: 0.5rem;\n  color: #6a6a6a;\n  font-size: 1.2em;\n}\n.action-section[data-v-38aa54aa] {\n  display: flex;\n  align-items: center;\n}\n.action-section .action-btn[data-v-38aa54aa] {\n  display: flex;\n  align-items: center;\n  gap: 0.5rem;\n  padding: 0.5rem 1rem;\n  border-radius: 8px;\n  font-size: 0.875rem;\n  font-weight: 500;\n  transition: all 0.3s ease;\n}\n.action-section .action-btn[data-v-38aa54aa]:hover:not(:disabled) {\n  transform: translateY(-1px);\n  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);\n}\n.action-section .action-btn[data-v-38aa54aa]:disabled {\n  opacity: 0.6;\n  cursor: not-allowed;\n}\n.action-section .action-btn i[data-v-38aa54aa] {\n  font-size: 0.9em;\n}\n@media (max-width: 768px) {\n.breadcrumb-nav-row[data-v-38aa54aa] {\n    flex-direction: column;\n    align-items: flex-start;\n    gap: 0.5rem;\n}\n.breadcrumb-section[data-v-38aa54aa] {\n    width: 100%;\n}\n.breadcrumb-section .breadcrumb-container[data-v-38aa54aa] {\n    flex-direction: column;\n    align-items: flex-start;\n    gap: 0.5rem;\n}\n.breadcrumb-section .breadcrumb-container .breadcrumb[data-v-38aa54aa] {\n    flex-wrap: wrap;\n}\n.breadcrumb-section .breadcrumb-container .breadcrumb .breadcrumb-item[data-v-38aa54aa] {\n    font-size: 0.8rem;\n}\n.breadcrumb-section .breadcrumb-container .breadcrumb .breadcrumb-item a[data-v-38aa54aa] {\n    font-size: 0.8rem;\n}\n.action-section[data-v-38aa54aa] {\n    width: 100%;\n    justify-content: flex-end;\n}\n.action-section .action-btn[data-v-38aa54aa] {\n    font-size: 0.8rem;\n    padding: 0.4rem 0.8rem;\n}\n}\n/* ===========================================\n   RESPONSIVE UTILITY CLASSES (ALL DEVICES)\n   =========================================== */\n.show-xs-only[data-v-38aa54aa],\n.show-sm-only[data-v-38aa54aa],\n.show-md-only[data-v-38aa54aa],\n.show-lg-only[data-v-38aa54aa],\n.show-xl-only[data-v-38aa54aa] {\n  display: none !important;\n}\n@media (max-width: 575px) {\n.hide-xs[data-v-38aa54aa] {\n    display: none !important;\n}\n.show-xs-only[data-v-38aa54aa] {\n    display: initial !important;\n}\n}\n@media (min-width: 576px) and (max-width: 767px) {\n.hide-sm[data-v-38aa54aa] {\n    display: none !important;\n}\n.show-sm-only[data-v-38aa54aa] {\n    display: initial !important;\n}\n}\n@media (min-width: 768px) and (max-width: 991px) {\n.hide-md[data-v-38aa54aa] {\n    display: none !important;\n}\n.show-md-only[data-v-38aa54aa] {\n    display: initial !important;\n}\n}\n@media (min-width: 992px) and (max-width: 1199px) {\n.hide-lg[data-v-38aa54aa] {\n    display: none !important;\n}\n.show-lg-only[data-v-38aa54aa] {\n    display: initial !important;\n}\n}\n@media (min-width: 1200px) {\n.hide-xl[data-v-38aa54aa] {\n    display: none !important;\n}\n.show-xl-only[data-v-38aa54aa] {\n    display: initial !important;\n}\n}\n@media (max-width: 576px) {\n.hide-sm-down[data-v-38aa54aa] {\n    display: none !important;\n}\n}\n@media (max-width: 768px) {\n.hide-md-down[data-v-38aa54aa] {\n    display: none !important;\n}\n}\n@media (max-width: 992px) {\n.hide-lg-down[data-v-38aa54aa] {\n    display: none !important;\n}\n}\n@media (min-width: 576px) {\n.hide-sm-up[data-v-38aa54aa] {\n    display: none !important;\n}\n}\n@media (min-width: 768px) {\n.hide-md-up[data-v-38aa54aa] {\n    display: none !important;\n}\n}\n@media (min-width: 992px) {\n.hide-lg-up[data-v-38aa54aa] {\n    display: none !important;\n}\n}\n@media (max-width: 575px) {\n.d-xs-none[data-v-38aa54aa] {\n    display: none !important;\n}\n.d-xs-block[data-v-38aa54aa] {\n    display: block !important;\n}\n.d-xs-flex[data-v-38aa54aa] {\n    display: flex !important;\n}\n}\n@media (min-width: 576px) and (max-width: 767px) {\n.d-sm-none[data-v-38aa54aa] {\n    display: none !important;\n}\n.d-sm-block[data-v-38aa54aa] {\n    display: block !important;\n}\n.d-sm-flex[data-v-38aa54aa] {\n    display: flex !important;\n}\n}\n@media (min-width: 768px) and (max-width: 991px) {\n.d-md-none[data-v-38aa54aa] {\n    display: none !important;\n}\n.d-md-block[data-v-38aa54aa] {\n    display: block !important;\n}\n.d-md-flex[data-v-38aa54aa] {\n    display: flex !important;\n}\n}\n@media (min-width: 992px) and (max-width: 1199px) {\n.d-lg-none[data-v-38aa54aa] {\n    display: none !important;\n}\n.d-lg-block[data-v-38aa54aa] {\n    display: block !important;\n}\n.d-lg-flex[data-v-38aa54aa] {\n    display: flex !important;\n}\n}\n@media (min-width: 1200px) {\n.d-xl-none[data-v-38aa54aa] {\n    display: none !important;\n}\n.d-xl-block[data-v-38aa54aa] {\n    display: block !important;\n}\n.d-xl-flex[data-v-38aa54aa] {\n    display: flex !important;\n}\n}\n@media (min-width: 576px) {\n.custom-modal-xl[data-v-38aa54aa] {\n    max-width: 1500px !important;\n}\n}\n[data-v-38aa54aa] .btn-danger {\n  background-color: #f1e8e9 !important;\n  border-color: #f1e8e9 !important;\n  color: #dc3545 !important;\n  padding: 5px 8px;\n  font-size: 0.75rem;\n  border-radius: 4px;\n}\n[data-v-38aa54aa] .btn-danger i {\n  font-size: 0.75rem;\n}\n[data-v-38aa54aa] .btn-danger:hover:not(:disabled) {\n  background-color: #f1e8e9 !important;\n  border-color: #f1e8e9 !important;\n  color: #dc3545 !important;\n}\n[data-v-38aa54aa] .btn-danger:focus {\n  background-color: #f1e8e9 !important;\n  border-color: #f1e8e9 !important;\n  color: #dc3545 !important;\n  box-shadow: 0 0 0 0.2rem rgba(248, 215, 218, 0.5) !important;\n}\n[data-v-38aa54aa] .btn-danger:active {\n  background-color: #f1e8e9 !important;\n  border-color: #f1e8e9 !important;\n  color: #dc3545 !important;\n}\n.edit-plan-btn[data-v-38aa54aa] {\n  padding: 5px 8px;\n  font-size: 0.75rem;\n  border-radius: 4px;\n}\n.edit-plan-btn i[data-v-38aa54aa] {\n  font-size: 0.75rem;\n  margin-right: 5px;\n}\n.add-exercise-btn[data-v-38aa54aa] {\n  border: none !important;\n  background: transparent !important;\n  padding: 0;\n  text-decoration: none !important;\n}\n.add-exercise-btn[data-v-38aa54aa]:hover, .add-exercise-btn[data-v-38aa54aa]:focus, .add-exercise-btn[data-v-38aa54aa]:active {\n  border: none !important;\n  background: transparent !important;\n  box-shadow: none !important;\n  outline: none !important;\n  text-decoration: none !important;\n}\n.add-exercise-btn i[data-v-38aa54aa] {\n  color: #ff4040;\n}\n\n/* Main container styles */\n.workout-editor-page[data-v-38aa54aa] {\n  padding: 1rem;\n  color: #252525;\n  min-height: 100vh;\n  background: #f8f9fa;\n}\n.page-header[data-v-38aa54aa] {\n  display: flex;\n  justify-content: space-between;\n  align-items: flex-start;\n}\n@media (max-width: 768px) {\n.page-header[data-v-38aa54aa] {\n    flex-direction: column;\n    gap: 1rem;\n}\n}\n.page-header .header-content[data-v-38aa54aa] {\n  flex: 1;\n}\n.page-header .header-content .page-title[data-v-38aa54aa] {\n  font-size: 1.75rem;\n  font-weight: 700;\n  color: #252525;\n  margin: 0 0 0.5rem 0;\n}\n.page-header .header-content .page-subtitle[data-v-38aa54aa] {\n  font-size: 1rem;\n  color: #6c757d;\n  margin: 0;\n}\n.page-header .header-actions[data-v-38aa54aa] {\n  display: flex;\n  gap: 0.3rem;\n  align-items: center;\n}\n.page-header .header-actions .btn-modern[data-v-38aa54aa] {\n  background: linear-gradient(135deg, #dc3545, #e52e2e);\n  border: none;\n  border-radius: 6px;\n  padding: 0.4rem 0.7rem;\n  font-weight: 600;\n  font-size: 0.875rem;\n  color: #ffffff;\n  transition: all 0.3s ease;\n}\n.page-header .header-actions .btn-modern[data-v-38aa54aa]:hover {\n  transform: translateY(-1px);\n  box-shadow: 0 4px 12px rgba(220, 53, 69, 0.3);\n}\n.page-header .header-actions .btn-outline-modern[data-v-38aa54aa] {\n  border: 2px solid #e9ecef;\n  border-radius: 6px;\n  padding: 0.4rem 0.7rem;\n  font-weight: 600;\n  font-size: 0.875rem;\n  color: #6c757d;\n  background: #ffffff;\n  transition: all 0.3s ease;\n}\n.page-header .header-actions .btn-outline-modern[data-v-38aa54aa]:hover {\n  border-color: #dc3545;\n  color: #dc3545;\n}\n.page-header .header-actions .save-workout-btn[data-v-38aa54aa] {\n  background: linear-gradient(135deg, #28a745, #20c997);\n  border: none;\n  border-radius: 6px;\n  padding: 0.4rem 0.7rem;\n  font-weight: 600;\n  font-size: 0.875rem;\n  color: #ffffff;\n  transition: all 0.3s ease;\n}\n.page-header .header-actions .save-workout-btn[data-v-38aa54aa]:hover:not(:disabled) {\n  transform: translateY(-1px);\n  box-shadow: 0 4px 12px rgba(40, 167, 69, 0.3);\n}\n.page-header .header-actions .save-workout-btn[data-v-38aa54aa]:disabled {\n  opacity: 0.6;\n  cursor: not-allowed;\n}\n.page-header .header-actions .action-icons[data-v-38aa54aa] {\n  display: flex;\n  gap: 0.5rem;\n  margin-left: 1rem;\n  padding-left: 1rem;\n  border-left: 2px solid #e9ecef;\n}\n.page-header .header-actions .action-icons .icon-btn[data-v-38aa54aa] {\n  width: 40px;\n  height: 40px;\n  border-radius: 8px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  padding: 0;\n  transition: all 0.3s ease;\n  border: 2px solid;\n}\n.page-header .header-actions .action-icons .icon-btn[data-v-38aa54aa]:hover {\n  transform: translateY(-2px);\n  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.15);\n}\n.page-header .header-actions .action-icons .icon-btn.btn-outline-info[data-v-38aa54aa] {\n  border-color: #17a2b8;\n  color: #17a2b8;\n}\n.page-header .header-actions .action-icons .icon-btn.btn-outline-info[data-v-38aa54aa]:hover {\n  background: #17a2b8;\n  color: white;\n}\n.page-header .header-actions .action-icons .icon-btn.btn-outline-success[data-v-38aa54aa] {\n  border-color: #28a745;\n  color: #28a745;\n}\n.page-header .header-actions .action-icons .icon-btn.btn-outline-success[data-v-38aa54aa]:hover {\n  background: #28a745;\n  color: white;\n}\n.page-header .header-actions .action-icons .icon-btn.btn-outline-warning[data-v-38aa54aa] {\n  border-color: #ffc107;\n  color: #ffc107;\n}\n.page-header .header-actions .action-icons .icon-btn.btn-outline-warning[data-v-38aa54aa]:hover {\n  background: #ffc107;\n  color: white;\n}\n.page-header .header-actions .action-icons .icon-btn i[data-v-38aa54aa] {\n  font-size: 1rem;\n}\n.editor-layout[data-v-38aa54aa] {\n  display: grid;\n  grid-template-columns: 1fr 1fr 1fr;\n  gap: 1rem;\n  height: calc(96vh - 160px);\n}\n@media (max-width: 1200px) {\n.editor-layout[data-v-38aa54aa] {\n    grid-template-columns: 1fr 1fr;\n    height: auto;\n}\n}\n@media (max-width: 992px) {\n.editor-layout[data-v-38aa54aa] {\n    grid-template-columns: 1fr;\n    height: auto;\n}\n}\n.editor-column[data-v-38aa54aa] {\n  background: #ffffff;\n  border-radius: 5px;\n  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);\n  display: flex;\n  flex-direction: column;\n  overflow: hidden;\n}\n.editor-column .column-header[data-v-38aa54aa] {\n  padding: 8px;\n  border-bottom: 1px solid #e0e0e0;\n  background: linear-gradient(45deg, #dededc 25%, #e3e3e1 25%, #e3e3e1 50%, #dededc 50%, #dededc 75%, #e3e3e1 75%);\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  gap: 0.5rem;\n}\n.editor-column .column-header h3[data-v-38aa54aa] {\n  font-size: 1rem;\n  font-weight: 600;\n  color: #252525;\n  margin: 0;\n  display: flex;\n  align-items: center;\n  flex-wrap: nowrap;\n  flex: 1;\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n.editor-column .column-header h3 i[data-v-38aa54aa] {\n  color: #dc3545;\n  font-size: 0.9rem;\n  margin-right: 0.4rem;\n}\n.editor-column .column-header h3 .header-subtitle[data-v-38aa54aa] {\n  font-size: 0.75rem;\n  font-weight: 400;\n  color: #6c757d;\n  margin-left: 0.3rem;\n  white-space: nowrap;\n}\n.editor-column .column-header .add-day-btn[data-v-38aa54aa] {\n  flex-shrink: 0;\n  padding: 0.25rem 0.5rem;\n  font-size: 0.75rem;\n}\n.editor-column .column-header p[data-v-38aa54aa] {\n  font-size: 0.875rem;\n  color: #6c757d;\n  margin: 0;\n}\n.exercise-library .search-section[data-v-38aa54aa] {\n  padding: 1rem 1.5rem;\n  border-bottom: 1px solid #e9ecef;\n}\n.exercise-library .search-section .search-input[data-v-38aa54aa] {\n  border-radius: 8px;\n  border: 2px solid #e9ecef;\n}\n.exercise-library .search-section .search-input[data-v-38aa54aa]:focus {\n  border-color: #dc3545;\n  box-shadow: 0 0 0 0.2rem rgba(220, 53, 69, 0.15);\n}\n.exercise-library .filter-section[data-v-38aa54aa] {\n  padding: 1rem 1.5rem;\n  border-bottom: 1px solid #e9ecef;\n}\n.exercise-library .filter-section .filter-select[data-v-38aa54aa] {\n  border-radius: 8px;\n  border: 2px solid #e9ecef;\n}\n.exercise-library .filter-section .filter-select[data-v-38aa54aa]:focus {\n  border-color: #dc3545;\n  box-shadow: 0 0 0 0.2rem rgba(220, 53, 69, 0.15);\n}\n.exercise-library .exercise-list[data-v-38aa54aa] {\n  flex: 1;\n  overflow-y: auto;\n  padding: 1rem 1.5rem;\n}\n.exercise-library .exercise-list .loading-exercises[data-v-38aa54aa],\n.exercise-library .exercise-list .empty-exercises[data-v-38aa54aa] {\n  padding: 2rem;\n  text-align: center;\n}\n.exercise-library .exercise-list .loading-exercises .loading-state .loading-icon[data-v-38aa54aa],\n.exercise-library .exercise-list .loading-exercises .loading-state .empty-icon[data-v-38aa54aa],\n.exercise-library .exercise-list .loading-exercises .empty-state .loading-icon[data-v-38aa54aa],\n.exercise-library .exercise-list .loading-exercises .empty-state .empty-icon[data-v-38aa54aa],\n.exercise-library .exercise-list .empty-exercises .loading-state .loading-icon[data-v-38aa54aa],\n.exercise-library .exercise-list .empty-exercises .loading-state .empty-icon[data-v-38aa54aa],\n.exercise-library .exercise-list .empty-exercises .empty-state .loading-icon[data-v-38aa54aa],\n.exercise-library .exercise-list .empty-exercises .empty-state .empty-icon[data-v-38aa54aa] {\n  font-size: 3rem;\n  color: #dee2e6;\n  margin-bottom: 1rem;\n}\n.exercise-library .exercise-list .loading-exercises .loading-state .loading-icon[data-v-38aa54aa],\n.exercise-library .exercise-list .loading-exercises .empty-state .loading-icon[data-v-38aa54aa],\n.exercise-library .exercise-list .empty-exercises .loading-state .loading-icon[data-v-38aa54aa],\n.exercise-library .exercise-list .empty-exercises .empty-state .loading-icon[data-v-38aa54aa] {\n  color: #dc3545;\n}\n.exercise-library .exercise-list .loading-exercises .loading-state h5[data-v-38aa54aa],\n.exercise-library .exercise-list .loading-exercises .empty-state h5[data-v-38aa54aa],\n.exercise-library .exercise-list .empty-exercises .loading-state h5[data-v-38aa54aa],\n.exercise-library .exercise-list .empty-exercises .empty-state h5[data-v-38aa54aa] {\n  color: #6c757d;\n  margin-bottom: 0.5rem;\n  font-weight: 600;\n}\n.exercise-library .exercise-list .loading-exercises .loading-state p[data-v-38aa54aa],\n.exercise-library .exercise-list .loading-exercises .empty-state p[data-v-38aa54aa],\n.exercise-library .exercise-list .empty-exercises .loading-state p[data-v-38aa54aa],\n.exercise-library .exercise-list .empty-exercises .empty-state p[data-v-38aa54aa] {\n  color: #6c757d;\n  font-size: 0.9rem;\n  margin: 0;\n}\n.exercise-library .exercise-list .exercise-item[data-v-38aa54aa] {\n  display: flex;\n  justify-content: space-between;\n  align-items: flex-start;\n  padding: 1rem;\n  border: 1px solid #e9ecef;\n  border-radius: 8px;\n  margin-bottom: 0.75rem;\n  cursor: pointer;\n  transition: all 0.3s ease;\n  min-height: 120px;\n}\n.exercise-library .exercise-list .exercise-item[data-v-38aa54aa]:hover {\n  border-color: #dc3545;\n  box-shadow: 0 4px 15px rgba(220, 53, 69, 0.1);\n  transform: translateY(-2px);\n}\n.exercise-library .exercise-list .exercise-item .exercise-thumbnail[data-v-38aa54aa] {\n  margin-right: 1rem;\n  flex-shrink: 0;\n}\n.exercise-library .exercise-list .exercise-item .exercise-thumbnail .exercise-image[data-v-38aa54aa] {\n  width: 60px;\n  height: 60px;\n  -o-object-fit: cover;\n     object-fit: cover;\n  border-radius: 8px;\n  border: 2px solid #e9ecef;\n  transition: all 0.3s ease;\n}\n.exercise-library .exercise-list .exercise-item .exercise-thumbnail .exercise-image[data-v-38aa54aa]:hover {\n  border-color: #dc3545;\n  transform: scale(1.05);\n}\n.exercise-library .exercise-list .exercise-item .exercise-info[data-v-38aa54aa] {\n  flex: 1;\n}\n.exercise-library .exercise-list .exercise-item .exercise-info h5[data-v-38aa54aa] {\n  font-size: 1rem;\n  font-weight: 600;\n  color: #252525;\n  margin: 0 0 0.5rem 0;\n}\n.exercise-library .exercise-list .exercise-item .exercise-info .exercise-meta[data-v-38aa54aa] {\n  display: flex;\n  gap: 0.5rem;\n  flex-wrap: wrap;\n  margin-bottom: 0.5rem;\n}\n.exercise-library .exercise-list .exercise-item .exercise-info .exercise-meta span[data-v-38aa54aa] {\n  font-size: 0.75rem;\n  padding: 0.25rem 0.5rem;\n  border-radius: 12px;\n  font-weight: 500;\n}\n.exercise-library .exercise-list .exercise-item .exercise-info .exercise-meta span.category[data-v-38aa54aa] {\n  background: #e3f2fd;\n  color: #1976d2;\n}\n.exercise-library .exercise-list .exercise-item .exercise-info .exercise-meta span.muscle[data-v-38aa54aa] {\n  background: #f3e5f5;\n  color: #7b1fa2;\n}\n.exercise-library .exercise-list .exercise-item .exercise-info .exercise-meta span.difficulty.beginner[data-v-38aa54aa] {\n  background: #e8f5e8;\n  color: #2e7d32;\n}\n.exercise-library .exercise-list .exercise-item .exercise-info .exercise-meta span.difficulty.intermediate[data-v-38aa54aa] {\n  background: #fff3e0;\n  color: #ef6c00;\n}\n.exercise-library .exercise-list .exercise-item .exercise-info .exercise-meta span.difficulty.advanced[data-v-38aa54aa] {\n  background: #ffebee;\n  color: #c62828;\n}\n.exercise-library .exercise-list .exercise-item .exercise-info .exercise-details[data-v-38aa54aa] {\n  display: flex;\n  gap: 1rem;\n  margin-bottom: 0.5rem;\n  flex-wrap: wrap;\n}\n.exercise-library .exercise-list .exercise-item .exercise-info .exercise-details .detail-item[data-v-38aa54aa] {\n  display: flex;\n  align-items: center;\n  gap: 0.25rem;\n  font-size: 0.75rem;\n  color: #6c757d;\n}\n.exercise-library .exercise-list .exercise-item .exercise-info .exercise-details .detail-item i[data-v-38aa54aa] {\n  font-size: 0.7rem;\n  color: #dc3545;\n}\n.exercise-library .exercise-list .exercise-item .exercise-info .exercise-details .detail-item span[data-v-38aa54aa] {\n  font-weight: 500;\n}\n.exercise-library .exercise-list .exercise-item .exercise-info .exercise-description p[data-v-38aa54aa] {\n  font-size: 0.8rem;\n  color: #6c757d;\n  margin: 0;\n  line-height: 1.4;\n  display: -webkit-box;\n  -webkit-line-clamp: 2;\n  line-clamp: 2;\n  -webkit-box-orient: vertical;\n  overflow: hidden;\n}\n.exercise-library .exercise-list .exercise-item .exercise-actions .btn-outline-primary[data-v-38aa54aa] {\n  border-radius: 6px;\n  padding: 0.5rem;\n}\n.workout-builder .workout-info[data-v-38aa54aa] {\n  padding: 1.5rem;\n  border-bottom: 1px solid #e9ecef;\n}\n.workout-builder .workout-info .workout-name-input[data-v-38aa54aa],\n.workout-builder .workout-info .workout-description-input[data-v-38aa54aa] {\n  border-radius: 8px;\n  border: 2px solid #e9ecef;\n}\n.workout-builder .workout-info .workout-name-input[data-v-38aa54aa]:focus,\n.workout-builder .workout-info .workout-description-input[data-v-38aa54aa]:focus {\n  border-color: #dc3545;\n  box-shadow: 0 0 0 0.2rem rgba(220, 53, 69, 0.15);\n}\n.workout-builder .workout-actions[data-v-38aa54aa] {\n  padding: 1.5rem;\n  border-bottom: 1px solid #e9ecef;\n  text-align: center;\n}\n.workout-builder .workout-actions .save-workout-btn[data-v-38aa54aa] {\n  background: linear-gradient(135deg, #28a745, #20c997);\n  border: none;\n  border-radius: 8px;\n  padding: 0.75rem 1.5rem;\n  font-weight: 600;\n  color: #ffffff;\n  transition: all 0.3s ease;\n  margin-bottom: 0.5rem;\n}\n.workout-builder .workout-actions .save-workout-btn[data-v-38aa54aa]:hover:not(:disabled) {\n  transform: translateY(-2px);\n  box-shadow: 0 8px 25px rgba(40, 167, 69, 0.3);\n}\n.workout-builder .workout-actions .save-workout-btn[data-v-38aa54aa]:disabled {\n  opacity: 0.6;\n  cursor: not-allowed;\n}\n.workout-builder .workout-actions .save-info[data-v-38aa54aa] {\n  margin-top: 0.5rem;\n}\n.workout-builder .empty-sections[data-v-38aa54aa] {\n  padding: 2rem;\n  text-align: center;\n}\n.workout-builder .empty-sections .empty-state .empty-icon[data-v-38aa54aa] {\n  font-size: 3rem;\n  color: #dee2e6;\n  margin-bottom: 1rem;\n}\n.workout-builder .empty-sections .empty-state h5[data-v-38aa54aa] {\n  color: #6c757d;\n  margin-bottom: 0.5rem;\n  font-weight: 600;\n}\n.workout-builder .empty-sections .empty-state p[data-v-38aa54aa] {\n  color: #6c757d;\n  font-size: 0.9rem;\n  margin: 0;\n}\n.workout-builder .workout-sections[data-v-38aa54aa] {\n  flex: 1;\n  overflow-y: auto;\n  padding: 5px;\n}\n.workout-builder .workout-sections .section-header h4[data-v-38aa54aa] {\n  font-size: 1.1rem;\n  font-weight: 600;\n  color: #252525;\n  margin: 0;\n}\n.workout-builder .workout-sections .existing-plans-section[data-v-38aa54aa] {\n  margin-bottom: 5px;\n  padding: 5px;\n  background: #f8f9fa;\n  border: 1px solid #e9ecef;\n  border-radius: 5px;\n}\n.workout-builder .workout-sections .existing-plans-section .existing-plans-header[data-v-38aa54aa] {\n  margin-bottom: 5px;\n}\n.workout-builder .workout-sections .existing-plans-section .existing-plans-header h5[data-v-38aa54aa] {\n  font-size: 1rem;\n  font-weight: 600;\n  color: #252525;\n  margin: 0 0 0.25rem 0;\n  display: flex;\n  align-items: center;\n}\n.workout-builder .workout-sections .existing-plans-section .existing-plans-header h5 i[data-v-38aa54aa] {\n  color: #dc3545;\n}\n.workout-builder .workout-sections .existing-plans-section .existing-plans-header small[data-v-38aa54aa] {\n  font-size: 0.8rem;\n}\n.workout-builder .workout-sections .existing-plans-section .existing-plans-list .existing-plan-item[data-v-38aa54aa] {\n  background: #ffffff;\n  border: 1px solid #e9ecef;\n  border-radius: 6px;\n  margin-bottom: 5px;\n  overflow: hidden;\n  transition: all 0.3s ease;\n}\n.workout-builder .workout-sections .existing-plans-section .existing-plans-list .existing-plan-item[data-v-38aa54aa]:hover {\n  border-color: #dc3545;\n  box-shadow: 0 2px 8px rgba(220, 53, 69, 0.1);\n}\n.workout-builder .workout-sections .existing-plans-section .existing-plans-list .existing-plan-item[data-v-38aa54aa]:last-child {\n  margin-bottom: 0;\n}\n.workout-builder .workout-sections .existing-plans-section .existing-plans-list .existing-plan-item .plan-info .plan-header[data-v-38aa54aa] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  padding: 5px;\n  background: #f8f9fa;\n  border-bottom: 1px solid #e9ecef;\n}\n.workout-builder .workout-sections .existing-plans-section .existing-plans-list .existing-plan-item .plan-info .plan-header h6[data-v-38aa54aa] {\n  font-size: 0.9rem;\n  font-weight: 600;\n  color: #252525;\n  margin: 0;\n}\n.workout-builder .workout-sections .existing-plans-section .existing-plans-list .existing-plan-item .plan-info .plan-header .plan-actions[data-v-38aa54aa] {\n  display: flex;\n  gap: 0.5rem;\n}\n.workout-builder .workout-sections .existing-plans-section .existing-plans-list .existing-plan-item .plan-info .plan-header .plan-actions .btn-outline-info[data-v-38aa54aa],\n.workout-builder .workout-sections .existing-plans-section .existing-plans-list .existing-plan-item .plan-info .plan-header .plan-actions .btn-outline-danger[data-v-38aa54aa] {\n  border-radius: 4px;\n  padding: 0.25rem 0.5rem;\n  font-size: 0.75rem;\n  transition: all 0.3s ease;\n}\n.workout-builder .workout-sections .existing-plans-section .existing-plans-list .existing-plan-item .plan-info .plan-header .plan-actions .btn-outline-info[data-v-38aa54aa]:hover,\n.workout-builder .workout-sections .existing-plans-section .existing-plans-list .existing-plan-item .plan-info .plan-header .plan-actions .btn-outline-danger[data-v-38aa54aa]:hover {\n  transform: scale(1.1);\n}\n.workout-builder .workout-sections .existing-plans-section .existing-plans-list .existing-plan-item .plan-info .plan-details[data-v-38aa54aa] {\n  padding: 5px;\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n}\n.workout-builder .workout-sections .existing-plans-section .existing-plans-list .existing-plan-item .plan-info .plan-details .exercise-stats[data-v-38aa54aa] {\n  display: flex;\n  gap: 5px;\n  flex-wrap: wrap;\n}\n.workout-builder .workout-sections .existing-plans-section .existing-plans-list .existing-plan-item .plan-info .plan-details .exercise-stats .stat[data-v-38aa54aa] {\n  display: flex;\n  align-items: center;\n  gap: 0.25rem;\n  font-size: 0.75rem;\n  color: #6c757d;\n  font-weight: 500;\n}\n.workout-builder .workout-sections .existing-plans-section .existing-plans-list .existing-plan-item .plan-info .plan-details .exercise-stats .stat i[data-v-38aa54aa] {\n  color: #dc3545;\n  font-size: 0.7rem;\n}\n.workout-builder .workout-sections .existing-plans-section .existing-plans-list .existing-plan-item .plan-info .plan-details .exercise-category[data-v-38aa54aa] {\n  display: flex;\n  gap: 0.5rem;\n}\n.workout-builder .workout-sections .existing-plans-section .existing-plans-list .existing-plan-item .plan-info .plan-details .exercise-category .category-badge[data-v-38aa54aa] {\n  background: #e3f2fd;\n  color: #1976d2;\n  padding: 0.25rem 0.5rem;\n  border-radius: 5px;\n  font-size: 0.7rem;\n  font-weight: 600;\n}\n.workout-builder .workout-sections .existing-plans-section .existing-plans-list .existing-plan-item .plan-info .plan-details .exercise-category .level-badge[data-v-38aa54aa] {\n  background: #fff3e0;\n  color: #ef6c00;\n  padding: 0.25rem 0.5rem;\n  border-radius: 12px;\n  font-size: 0.7rem;\n  font-weight: 600;\n}\n.workout-builder .workout-sections .workout-section[data-v-38aa54aa] {\n  border: 1px solid #e9ecef;\n  border-radius: 8px;\n  margin-bottom: 1rem;\n  overflow: hidden;\n}\n.workout-builder .workout-sections .workout-section.view-only .section-name-input[data-v-38aa54aa]:disabled,\n.workout-builder .workout-sections .workout-section.view-only .set-input[data-v-38aa54aa]:disabled,\n.workout-builder .workout-sections .workout-section.view-only .intensity-input[data-v-38aa54aa]:disabled,\n.workout-builder .workout-sections .workout-section.view-only .notes-textarea[data-v-38aa54aa]:disabled {\n  background-color: #f8f9fa;\n  cursor: not-allowed;\n  opacity: 0.7;\n}\n.workout-builder .workout-sections .workout-section.view-only[data-v-38aa54aa]  .exercise-type-radio:disabled,\n.workout-builder .workout-sections .workout-section.view-only[data-v-38aa54aa]  .intensity-radio:disabled {\n  opacity: 0.7;\n  pointer-events: none;\n}\n.workout-builder .workout-sections .workout-section .section-header[data-v-38aa54aa] {\n  padding: 0.5rem;\n  background: #dededc;\n  border-bottom: 1px solid #e9ecef;\n  margin: 0;\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n}\n.workout-builder .workout-sections .workout-section .section-header .section-name-input[data-v-38aa54aa] {\n  border: none;\n  background: transparent;\n  font-weight: 600;\n  color: #252525;\n  flex: 1;\n  margin-right: 0.5rem;\n}\n.workout-builder .workout-sections .workout-section .section-header .section-name-input[data-v-38aa54aa]:focus {\n  box-shadow: none;\n  background: #ffffff;\n}\n.workout-builder .workout-sections .workout-section .section-header .section-actions[data-v-38aa54aa] {\n  display: flex;\n  gap: 0.5rem;\n  align-items: center;\n}\n.workout-builder .workout-sections .workout-section .exercises-in-section[data-v-38aa54aa] {\n  padding: 1rem;\n}\n.workout-builder .workout-sections .workout-section .exercises-in-section .exercises-thumbnails-list[data-v-38aa54aa] {\n  display: flex;\n  flex-direction: column;\n  gap: 1rem;\n  margin-bottom: 1.5rem;\n}\n.workout-builder .workout-sections .workout-section .exercises-in-section .exercises-thumbnails-list .exercise-thumbnail-item[data-v-38aa54aa] {\n  background: white;\n  border: 1px solid #e9ecef;\n  border-radius: 8px;\n  padding: 1rem;\n  display: flex;\n  flex-direction: column;\n  gap: 0.75rem;\n}\n.workout-builder .workout-sections .workout-section .exercises-in-section .exercises-thumbnails-list .exercise-thumbnail-item .exercise-preview[data-v-38aa54aa] {\n  width: 100%;\n  height: 200px;\n  margin-bottom: 0;\n}\n.workout-builder .workout-sections .workout-section .exercises-in-section .exercises-thumbnails-list .exercise-thumbnail-item .exercise-title-bar[data-v-38aa54aa] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n}\n.workout-builder .workout-sections .workout-section .exercises-in-section .exercises-thumbnails-list .exercise-thumbnail-item .exercise-title-bar .exercise-title[data-v-38aa54aa] {\n  font-size: 1rem;\n  font-weight: 600;\n  color: #252525;\n  margin: 0;\n  flex: 1;\n}\n.workout-builder .workout-sections .workout-section .exercises-in-section .exercises-thumbnails-list .exercise-thumbnail-item .exercise-title-bar .exercise-delete-btn[data-v-38aa54aa] {\n  padding: 0.25rem 0.5rem;\n}\n.training-plan .training-plan-content[data-v-38aa54aa] {\n  overflow-y: auto;\n  padding-left: 0.5rem;\n  padding-right: 0.5rem;\n  padding-top: 0.75rem;\n}\n.training-plan .training-plan-content .plan-overview .plan-header[data-v-38aa54aa] {\n  text-align: center;\n  margin-bottom: 1rem;\n}\n.training-plan .training-plan-content .plan-overview .plan-header h4[data-v-38aa54aa] {\n  font-size: 1rem;\n  font-weight: 600;\n  margin: 0 0 0.25rem 0;\n  color: #252525;\n}\n.training-plan .training-plan-content .plan-overview .plan-header p[data-v-38aa54aa] {\n  margin: 0;\n  color: #6c757d;\n  font-size: 0.875rem;\n}\n.training-plan .training-plan-content .plan-overview .plan-stats[data-v-38aa54aa] {\n  display: flex;\n  justify-content: space-around;\n  margin-bottom: 1rem;\n}\n.training-plan .training-plan-content .plan-overview .plan-stats .stat-item[data-v-38aa54aa] {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  text-align: center;\n}\n.training-plan .training-plan-content .plan-overview .plan-stats .stat-item i[data-v-38aa54aa] {\n  font-size: 1.25rem;\n  color: #dc3545;\n}\n.training-plan .training-plan-content .plan-overview .weekly-schedule .schedule-header[data-v-38aa54aa] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  margin-bottom: 0.75rem;\n}\n.training-plan .training-plan-content .plan-overview .weekly-schedule .schedule-header h5[data-v-38aa54aa] {\n  font-size: 1rem;\n  font-weight: 600;\n  color: #252525;\n  margin: 0;\n}\n.training-plan .training-plan-content .plan-overview .weekly-schedule .schedule-header .add-day-btn[data-v-38aa54aa] {\n  padding: 0.25rem 0.5rem;\n}\n.training-plan .training-plan-content .plan-overview .weekly-schedule .days-overview .day-overview[data-v-38aa54aa] {\n  margin-bottom: 0.75rem;\n}\n.training-plan .training-plan-content .plan-overview .weekly-schedule .days-overview .day-overview .day-header[data-v-38aa54aa] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  margin-bottom: 0.5rem;\n}\n.training-plan .training-plan-content .plan-overview .weekly-schedule .days-overview .day-overview .day-header .day-select[data-v-38aa54aa] {\n  flex: 1;\n  margin-right: 0.5rem;\n}\n.training-plan .training-plan-content .plan-overview .weekly-schedule .days-overview .day-overview .day-header .day-select[data-v-38aa54aa]:focus {\n  border-color: #dc3545;\n  box-shadow: 0 0 0 0.2rem rgba(220, 53, 69, 0.15);\n}\n.training-plan .training-plan-content .plan-overview .weekly-schedule .days-overview .day-overview .day-header .delete-day-btn[data-v-38aa54aa] {\n  padding: 0.25rem 0.5rem;\n  border-color: none;\n}\n.training-plan .training-plan-content .plan-overview .weekly-schedule .days-overview .day-overview .day-info[data-v-38aa54aa] {\n  margin-top: 0.5rem;\n}\n.training-plan .training-plan-content .plan-overview .weekly-schedule .days-overview .day-overview .day-info .day-exercise-count[data-v-38aa54aa] {\n  margin-top: 0.25rem;\n}\n.training-plan .training-plan-content .plan-overview .weekly-schedule .days-overview .day-overview .day-info .day-exercise-count small[data-v-38aa54aa] {\n  font-weight: 600;\n}\n.training-plan .training-plan-content .plan-overview .weekly-schedule .schedule-summary[data-v-38aa54aa] {\n  margin-top: 1rem;\n}\n.training-plan .training-plan-content .plan-overview .weekly-schedule .schedule-summary .summary-header[data-v-38aa54aa] {\n  margin-bottom: 0.5rem;\n}\n.training-plan .training-plan-content .plan-overview .weekly-schedule .schedule-summary .summary-header h6[data-v-38aa54aa] {\n  font-size: 0.9rem;\n  font-weight: 600;\n  color: #252525;\n  margin: 0;\n}\n.training-plan .training-plan-content .plan-overview .weekly-schedule .schedule-summary .selected-days[data-v-38aa54aa] {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 0.5rem;\n}\n.training-plan .training-plan-content .plan-overview .weekly-schedule .schedule-summary .selected-days .day-badge[data-v-38aa54aa] {\n  background: #dc3545;\n  color: #ffffff;\n  padding: 0.25rem 0.75rem;\n  border-radius: 15px;\n  font-size: 0.8rem;\n  font-weight: 600;\n}\n.training-plan .training-plan-content .plan-overview .weekly-schedule .schedule-header[data-v-38aa54aa] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  margin-bottom: 0.75rem;\n}\n.training-plan .training-plan-content .plan-overview .weekly-schedule .schedule-header h5[data-v-38aa54aa] {\n  font-size: 1rem;\n  font-weight: 600;\n  color: #252525;\n  margin: 0;\n}\n.training-plan .training-plan-content .plan-overview .weekly-schedule .schedule-header .add-day-btn[data-v-38aa54aa] {\n  padding: 0.25rem 0.5rem;\n}\n.training-plan .training-plan-content .plan-overview .weekly-schedule .selected-day-display[data-v-38aa54aa] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  margin-bottom: 0.75rem;\n}\n.training-plan .training-plan-content .plan-overview .weekly-schedule .selected-day-display .selected-day-info h6[data-v-38aa54aa] {\n  font-size: 0.9rem;\n  font-weight: 600;\n  color: #252525;\n  margin: 0 0 0.25rem 0;\n}\n.training-plan .training-plan-content .plan-overview .weekly-schedule .selected-day-display .selected-day-info p[data-v-38aa54aa] {\n  margin: 0;\n  font-size: 0.875rem;\n}\n.training-plan .training-plan-content .plan-overview .weekly-schedule .days-overview .day-overview[data-v-38aa54aa] {\n  margin-bottom: 0.5rem;\n  cursor: pointer;\n}\n.training-plan .training-plan-content .plan-overview .weekly-schedule .days-overview .day-overview .day-header[data-v-38aa54aa] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  margin-bottom: 0.5rem;\n}\n.training-plan .training-plan-content .plan-overview .weekly-schedule .days-overview .day-overview .day-header .day-name[data-v-38aa54aa] {\n  font-weight: 600;\n  color: #252525;\n  font-size: 0.9rem;\n}\n.training-plan .training-plan-content .plan-overview .weekly-schedule .days-overview .day-overview .day-header .delete-day-btn[data-v-38aa54aa] {\n  padding: 0.25rem 0.5rem;\n}\n.training-plan .training-plan-content .plan-overview .weekly-schedule .days-overview .day-overview .day-content .workout-assignment[data-v-38aa54aa] {\n  margin-bottom: 0.5rem;\n}\n.training-plan .training-plan-content .plan-overview .weekly-schedule .days-overview .day-overview .day-content .workout-assignment .workout-select[data-v-38aa54aa] {\n  font-size: 0.875rem;\n}\n.training-plan .training-plan-content .plan-overview .weekly-schedule .days-overview .day-overview .day-content .workout-assignment .workout-select[data-v-38aa54aa]:focus {\n  border-color: #dc3545;\n  box-shadow: 0 0 0 0.2rem rgba(220, 53, 69, 0.15);\n}\n.training-plan .training-plan-content .plan-overview .weekly-schedule .days-overview .day-overview .day-content .notes-assignment .day-notes-input[data-v-38aa54aa] {\n  font-size: 0.875rem;\n}\n.training-plan .training-plan-content .plan-overview .weekly-schedule .days-overview .day-overview .day-content .notes-assignment .day-notes-input[data-v-38aa54aa]:focus {\n  border-color: #dc3545;\n  box-shadow: 0 0 0 0.2rem rgba(220, 53, 69, 0.15);\n}\n.training-plan .training-plan-content .plan-actions[data-v-38aa54aa] {\n  display: flex;\n  gap: 0.5rem;\n  margin-top: 0.75rem;\n}\n.training-plan .training-plan-content .plan-actions .btn-modern[data-v-38aa54aa] {\n  background: linear-gradient(135deg, #dc3545, #e52e2e);\n  border: none;\n  border-radius: 6px;\n  padding: 0.4rem 0.7rem;\n  font-weight: 600;\n  font-size: 0.875rem;\n  color: #ffffff;\n  transition: all 0.3s ease;\n}\n.training-plan .training-plan-content .plan-actions .btn-modern[data-v-38aa54aa]:hover {\n  transform: translateY(-1px);\n  box-shadow: 0 4px 12px rgba(220, 53, 69, 0.3);\n}\n.training-plan .training-plan-content .plan-actions .btn-outline-modern[data-v-38aa54aa] {\n  border: 2px solid #e9ecef;\n  border-radius: 6px;\n  padding: 0.4rem 0.7rem;\n  font-weight: 600;\n  font-size: 0.875rem;\n  color: #6c757d;\n  background: #ffffff;\n  transition: all 0.3s ease;\n}\n.training-plan .training-plan-content .plan-actions .btn-outline-modern[data-v-38aa54aa]:hover {\n  border-color: #dc3545;\n  color: #dc3545;\n}\n@media (max-width: 1200px) {\n.editor-layout[data-v-38aa54aa] {\n    grid-template-columns: 1fr 1fr;\n    gap: 1rem;\n}\n}\n@media (max-width: 992px) {\n.editor-layout[data-v-38aa54aa] {\n    grid-template-columns: 1fr;\n    gap: 1rem;\n}\n.editor-column[data-v-38aa54aa] {\n    height: auto;\n    min-height: 400px;\n}\n}\n@media (max-width: 768px) {\n.workout-editor-page[data-v-38aa54aa] {\n    padding: 0.5rem;\n}\n.page-header[data-v-38aa54aa] {\n    padding: 1rem;\n}\n.editor-column .column-header[data-v-38aa54aa] {\n    padding: 1rem;\n}\n}\n.saved-plans-section[data-v-38aa54aa] {\n  border-top: 1px solid #e9ecef;\n  padding-top: 1.5rem;\n  margin-top: 1.5rem;\n}\n.saved-plans-section .user-filter-info[data-v-38aa54aa] {\n  padding: 0.5rem 0;\n  margin-bottom: 1rem;\n  border-bottom: 1px solid #e9ecef;\n}\n.saved-plans-section .user-filter-info small[data-v-38aa54aa] {\n  font-size: 0.8rem;\n  color: #6c757d;\n}\n.saved-plans-section .user-filter-info small i[data-v-38aa54aa] {\n  color: #dc3545;\n}\n.saved-plans-section .section-header[data-v-38aa54aa] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  margin-bottom: 1rem;\n}\n.saved-plans-section .section-header h4[data-v-38aa54aa] {\n  font-size: 1.1rem;\n  font-weight: 600;\n  color: #252525;\n  margin: 0;\n  display: flex;\n  align-items: center;\n}\n.saved-plans-section .section-header h4 i[data-v-38aa54aa] {\n  color: #dc3545;\n}\n.saved-plans-section .saved-plans-list .loading-plans[data-v-38aa54aa] {\n  padding: 2rem;\n  text-align: center;\n}\n.saved-plans-section .saved-plans-list .loading-plans .loading-state .loading-icon[data-v-38aa54aa] {\n  font-size: 2rem;\n  color: #dc3545;\n  margin-bottom: 1rem;\n}\n.saved-plans-section .saved-plans-list .loading-plans .loading-state p[data-v-38aa54aa] {\n  color: #6c757d;\n  margin: 0;\n}\n.saved-plans-section .saved-plans-list .empty-plans[data-v-38aa54aa] {\n  padding: 2rem;\n  text-align: center;\n}\n.saved-plans-section .saved-plans-list .empty-plans .empty-state .empty-icon[data-v-38aa54aa] {\n  font-size: 3rem;\n  color: #dee2e6;\n  margin-bottom: 1rem;\n}\n.saved-plans-section .saved-plans-list .empty-plans .empty-state h5[data-v-38aa54aa] {\n  color: #6c757d;\n  margin-bottom: 0.5rem;\n  font-weight: 600;\n}\n.saved-plans-section .saved-plans-list .empty-plans .empty-state p[data-v-38aa54aa] {\n  color: #6c757d;\n  font-size: 0.9rem;\n  margin: 0;\n}\n.saved-plans-section .saved-plans-list .plans-container .saved-plan-card[data-v-38aa54aa] {\n  border: 1px solid #e9ecef;\n  border-radius: 8px;\n  margin-bottom: 1rem;\n  background: #ffffff;\n  overflow: hidden;\n  transition: all 0.3s ease;\n}\n.saved-plans-section .saved-plans-list .plans-container .saved-plan-card[data-v-38aa54aa]:hover {\n  border-color: #dc3545;\n  box-shadow: 0 4px 15px rgba(220, 53, 69, 0.1);\n}\n.saved-plans-section .saved-plans-list .plans-container .saved-plan-card .plan-header[data-v-38aa54aa] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  padding: 1rem;\n  background: #f8f9fa;\n  border-bottom: 1px solid #e9ecef;\n}\n.saved-plans-section .saved-plans-list .plans-container .saved-plan-card .plan-header .plan-info[data-v-38aa54aa] {\n  flex: 1;\n}\n.saved-plans-section .saved-plans-list .plans-container .saved-plan-card .plan-header .plan-info .plan-name[data-v-38aa54aa] {\n  font-size: 1rem;\n  font-weight: 600;\n  color: #252525;\n  margin: 0 0 0.5rem 0;\n}\n.saved-plans-section .saved-plans-list .plans-container .saved-plan-card .plan-header .plan-info .plan-meta[data-v-38aa54aa] {\n  display: flex;\n  gap: 0.5rem;\n  flex-wrap: wrap;\n}\n.saved-plans-section .saved-plans-list .plans-container .saved-plan-card .plan-header .plan-info .plan-meta .day-badge[data-v-38aa54aa] {\n  background: #dc3545;\n  color: #ffffff;\n  padding: 0.25rem 0.75rem;\n  border-radius: 15px;\n  font-size: 0.75rem;\n  font-weight: 600;\n}\n.saved-plans-section .saved-plans-list .plans-container .saved-plan-card .plan-header .plan-info .plan-meta .date-badge[data-v-38aa54aa] {\n  background: #e9ecef;\n  color: #6c757d;\n  padding: 0.25rem 0.75rem;\n  border-radius: 15px;\n  font-size: 0.75rem;\n  font-weight: 500;\n}\n.saved-plans-section .saved-plans-list .plans-container .saved-plan-card .plan-header .plan-actions[data-v-38aa54aa] {\n  display: flex;\n  gap: 0.5rem;\n}\n.saved-plans-section .saved-plans-list .plans-container .saved-plan-card .plan-header .plan-actions .btn-outline-primary[data-v-38aa54aa],\n.saved-plans-section .saved-plans-list .plans-container .saved-plan-card .plan-header .plan-actions .btn-outline-danger[data-v-38aa54aa] {\n  border-radius: 6px;\n  padding: 0.5rem;\n  transition: all 0.3s ease;\n}\n.saved-plans-section .saved-plans-list .plans-container .saved-plan-card .plan-header .plan-actions .btn-outline-primary[data-v-38aa54aa]:hover,\n.saved-plans-section .saved-plans-list .plans-container .saved-plan-card .plan-header .plan-actions .btn-outline-danger[data-v-38aa54aa]:hover {\n  transform: scale(1.1);\n}\n.saved-plans-section .saved-plans-list .plans-container .saved-plan-card .plan-details[data-v-38aa54aa] {\n  padding: 1rem;\n}\n.saved-plans-section .saved-plans-list .plans-container .saved-plan-card .plan-details .exercise-summary .exercise-item[data-v-38aa54aa] {\n  display: flex;\n  justify-content: space-between;\n  align-items: flex-start;\n}\n.saved-plans-section .saved-plans-list .plans-container .saved-plan-card .plan-details .exercise-summary .exercise-item .exercise-info[data-v-38aa54aa] {\n  flex: 1;\n}\n.saved-plans-section .saved-plans-list .plans-container .saved-plan-card .plan-details .exercise-summary .exercise-item .exercise-info h6[data-v-38aa54aa] {\n  font-size: 0.9rem;\n  font-weight: 600;\n  color: #252525;\n  margin: 0 0 0.5rem 0;\n}\n.saved-plans-section .saved-plans-list .plans-container .saved-plan-card .plan-details .exercise-summary .exercise-item .exercise-info .exercise-stats[data-v-38aa54aa] {\n  display: flex;\n  gap: 1rem;\n  flex-wrap: wrap;\n}\n.saved-plans-section .saved-plans-list .plans-container .saved-plan-card .plan-details .exercise-summary .exercise-item .exercise-info .exercise-stats .stat[data-v-38aa54aa] {\n  display: flex;\n  align-items: center;\n  gap: 0.25rem;\n  font-size: 0.75rem;\n  color: #6c757d;\n  font-weight: 500;\n}\n.saved-plans-section .saved-plans-list .plans-container .saved-plan-card .plan-details .exercise-summary .exercise-item .exercise-info .exercise-stats .stat i[data-v-38aa54aa] {\n  color: #dc3545;\n  font-size: 0.7rem;\n}\n.saved-plans-section .saved-plans-list .plans-container .saved-plan-card .plan-details .exercise-summary .exercise-item .exercise-category[data-v-38aa54aa] {\n  display: flex;\n  flex-direction: column;\n  gap: 0.25rem;\n  align-items: flex-end;\n}\n.saved-plans-section .saved-plans-list .plans-container .saved-plan-card .plan-details .exercise-summary .exercise-item .exercise-category .category-badge[data-v-38aa54aa] {\n  background: #e3f2fd;\n  color: #1976d2;\n  padding: 0.25rem 0.5rem;\n  border-radius: 12px;\n  font-size: 0.7rem;\n  font-weight: 600;\n}\n.saved-plans-section .saved-plans-list .plans-container .saved-plan-card .plan-details .exercise-summary .exercise-item .exercise-category .level-badge[data-v-38aa54aa] {\n  background: #fff3e0;\n  color: #ef6c00;\n  padding: 0.25rem 0.5rem;\n  border-radius: 12px;\n  font-size: 0.7rem;\n  font-weight: 600;\n}\n.section-disabled[data-v-38aa54aa] {\n  opacity: 0.5;\n  pointer-events: none;\n  position: relative;\n}\n.workout-select-row[data-v-38aa54aa] {\n  margin-top: 1rem;\n  max-width: 350px;\n}\n.day-select-small[data-v-38aa54aa] {\n  min-width: 90px;\n  max-width: 120px;\n  font-size: 0.85rem;\n  padding: 0.1rem 0.5rem;\n  height: 28px;\n  display: inline-block;\n  vertical-align: middle;\n}\n.thumbnail-grid-section[data-v-38aa54aa] {\n  background: #f8f9fa;\n  border-radius: 0px;\n  display: flex;\n  flex-direction: column;\n  max-height: 100vh;\n  overflow: hidden;\n}\n.thumbnail-grid-section .thumbnail-grid-header[data-v-38aa54aa] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n}\n.thumbnail-grid-section .thumbnail-grid-header h4[data-v-38aa54aa] {\n  font-size: 1rem;\n  font-weight: 600;\n  color: #252525;\n  margin: 0;\n}\n.thumbnail-grid-section .thumbnail-grid-header .close-thumbnail-btn[data-v-38aa54aa] {\n  padding: 0.25rem 0.5rem;\n  color: #6c757d;\n}\n.thumbnail-grid-section .thumbnail-grid-header .close-thumbnail-btn[data-v-38aa54aa]:hover {\n  color: #dc3545;\n}\n.thumbnail-grid-section .filter-container[data-v-38aa54aa] {\n  background: white;\n  padding: 5px;\n  margin-bottom: 5px;\n  position: relative;\n  flex-shrink: 0;\n}\n.thumbnail-grid-section .filter-container .filter-note[data-v-38aa54aa] {\n  display: block;\n  margin-top: 0.5rem;\n  font-size: 0.875rem;\n}\n.thumbnail-grid-section .filter-container[data-v-38aa54aa]::after {\n  content: \"\";\n  position: absolute;\n  bottom: -10px;\n  left: 50%;\n  transform: translateX(-50%);\n  width: 0;\n  height: 0;\n  border-left: 10px solid transparent;\n  border-right: 10px solid transparent;\n  border-top: 10px solid white;\n}\n.thumbnail-grid-section .filter-container .filter-row[data-v-38aa54aa] {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 4px;\n  margin-bottom: 5px;\n}\n.thumbnail-grid-section .filter-container .filter-row[data-v-38aa54aa]:last-child {\n  margin-bottom: 0;\n}\n.thumbnail-grid-section .filter-container .filter-row .filter-input[data-v-38aa54aa] {\n  flex: 1 1 230px;\n  min-width: 230px;\n  border-radius: 4px;\n  border: 1px solid #e0e0e0;\n  background: #f5f5f5;\n  min-height: 30px;\n  padding: 0.375rem 0.75rem;\n  font-size: 0.8rem;\n}\n.thumbnail-grid-section .filter-container .filter-row .filter-input[data-v-38aa54aa]:focus {\n  border-color: #dc3545;\n  box-shadow: 0 0 0 0.2rem rgba(220, 53, 69, 0.15);\n  background: white;\n}\n.thumbnail-grid-section .filter-container .filter-row .filter-select[data-v-38aa54aa] {\n  flex: 1 1 115px;\n  min-width: 115px;\n  border-radius: 4px;\n  border: 1px solid #e0e0e0;\n  background: #f5f5f5;\n  min-height: 30px;\n  font-size: 0.68rem;\n}\n.thumbnail-grid-section .filter-container .filter-row .filter-select[data-v-38aa54aa]  select {\n  padding: 0.375rem 2rem 0.375rem 0.75rem;\n  width: 100%;\n  background: transparent;\n  border: none;\n  font-size: 0.875rem;\n  appearance: none;\n  -webkit-appearance: none;\n  -moz-appearance: none;\n  cursor: pointer;\n}\n.thumbnail-grid-section .filter-container .filter-row .filter-select[data-v-38aa54aa]  option {\n  padding: 0.5rem;\n}\n.thumbnail-grid-section .filter-container .filter-row .filter-select[data-v-38aa54aa]:focus {\n  border-color: #dc3545;\n  box-shadow: 0 0 0 0.2rem rgba(220, 53, 69, 0.15);\n  background: white;\n}\n.thumbnail-grid-section .filter-container .filter-row .filter-select[data-v-38aa54aa]:focus  select {\n  background: transparent;\n}\n@media (max-width: 992px) {\n.thumbnail-grid-section .filter-container .filter-row .filter-input[data-v-38aa54aa],\n  .thumbnail-grid-section .filter-container .filter-row .filter-select[data-v-38aa54aa] {\n    flex: 1 1 calc(33.333% - 8px);\n    min-width: 0;\n}\n.thumbnail-grid-section .filter-container .filter-note[data-v-38aa54aa] {\n    font-size: 0.75rem;\n    margin-top: 5px;\n}\n}\n.thumbnail-grid-section .thumbnail-grid-wrapper[data-v-38aa54aa] {\n  position: relative;\n  flex: 1;\n  min-height: 0;\n  display: flex;\n  flex-direction: column;\n}\n.thumbnail-grid-section .load-more-thumbnails[data-v-38aa54aa] {\n  padding: 0px;\n  text-align: center;\n  border-top: 1px solid rgba(0, 0, 0, 0.1);\n  background: #f8f9fa;\n}\n.thumbnail-grid-section .load-more-thumbnails .btn[data-v-38aa54aa] {\n  padding: 5px 8px;\n  font-size: 0.75rem;\n  border-radius: 4px;\n}\n.thumbnail-grid-section .thumbnail-grid[data-v-38aa54aa] {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n  gap: 5px;\n  padding: 5px;\n  max-height: 100vh;\n  overflow-y: auto;\n  overflow-x: hidden;\n  flex: 1;\n  min-height: 0;\n  width: 100%;\n  box-sizing: border-box;\n}\n.thumbnail-grid-section .thumbnail-grid[data-v-38aa54aa]::-webkit-scrollbar {\n  width: 8px;\n}\n.thumbnail-grid-section .thumbnail-grid[data-v-38aa54aa]::-webkit-scrollbar-track {\n  background: #f1f1f1;\n  border-radius: 4px;\n}\n.thumbnail-grid-section .thumbnail-grid[data-v-38aa54aa]::-webkit-scrollbar-thumb {\n  background: #888;\n  border-radius: 4px;\n}\n.thumbnail-grid-section .thumbnail-grid[data-v-38aa54aa]::-webkit-scrollbar-thumb:hover {\n  background: #555;\n}\n.thumbnail-grid-section .thumbnail-grid .thumbnail-item[data-v-38aa54aa] {\n  position: relative;\n  cursor: pointer;\n  border-radius: 4px;\n  width: 100%;\n  height: 0;\n  padding-bottom: 70%;\n  background: #f8f9fa;\n  box-sizing: border-box;\n}\n.thumbnail-grid-section .thumbnail-grid .thumbnail-item[data-v-38aa54aa]:hover {\n  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);\n}\n.thumbnail-grid-section .thumbnail-grid .thumbnail-item.selected[data-v-38aa54aa] {\n  border-color: #28a745;\n  box-shadow: 0 4px 15px rgba(40, 167, 69, 0.3);\n}\n.thumbnail-grid-section .thumbnail-grid .thumbnail-item img[data-v-38aa54aa] {\n  position: absolute;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n  -o-object-fit: cover;\n     object-fit: cover;\n  display: block;\n}\n.thumbnail-grid-section .thumbnail-grid .thumbnail-item .thumbnail-overlay[data-v-38aa54aa] {\n  position: absolute;\n  bottom: 0;\n  left: 0;\n  right: 0;\n  background: linear-gradient(to top, rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.4), transparent);\n  padding: 2px;\n  z-index: 1;\n}\n.thumbnail-grid-section .thumbnail-grid .thumbnail-item .thumbnail-overlay .thumbnail-name[data-v-38aa54aa] {\n  color: white;\n  font-size: 0.6rem;\n  font-weight: 500;\n  display: block;\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  line-height: 1;\n}\n.thumbnail-grid-section .scroll-to-top-btn[data-v-38aa54aa] {\n  position: absolute;\n  bottom: 1rem;\n  right: 1rem;\n  width: 40px;\n  height: 40px;\n  border-radius: 50%;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);\n  z-index: 10;\n  transition: all 0.3s ease;\n}\n.thumbnail-grid-section .scroll-to-top-btn[data-v-38aa54aa]:hover {\n  transform: translateY(-2px);\n  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.2);\n}\n.thumbnail-grid-section .scroll-to-top-btn i[data-v-38aa54aa] {\n  font-size: 0.875rem;\n}\n.thumbnail-grid-section .loading-thumbnails[data-v-38aa54aa] {\n  text-align: center;\n  padding: 1.5rem;\n  color: #6c757d;\n  flex-shrink: 0;\n}\n.thumbnail-grid-section .loading-thumbnails i[data-v-38aa54aa] {\n  margin-right: 0.5rem;\n}\n@media (max-width: 768px) {\n.thumbnail-grid-section[data-v-38aa54aa] {\n    max-height: calc(100vh - 150px);\n}\n.thumbnail-grid-section .thumbnail-grid[data-v-38aa54aa] {\n    grid-template-columns: repeat(2, 1fr);\n    max-height: calc(100vh - 280px);\n    padding: 0.75rem;\n    padding-bottom: 4rem;\n    gap: 0.75rem;\n}\n.thumbnail-grid-section .thumbnail-grid .thumbnail-item .thumbnail-overlay[data-v-38aa54aa] {\n    padding: 0.625rem 0.5rem;\n}\n.thumbnail-grid-section .thumbnail-grid .thumbnail-item .thumbnail-overlay .thumbnail-name[data-v-38aa54aa] {\n    font-size: 0.7rem;\n}\n.thumbnail-grid-section .filter-container[data-v-38aa54aa] {\n    padding: 0.75rem;\n}\n.thumbnail-grid-section .scroll-to-top-btn[data-v-38aa54aa] {\n    width: 36px;\n    height: 36px;\n    bottom: 0.75rem;\n    right: 0.75rem;\n}\n}\n@media (max-width: 480px) {\n.thumbnail-grid-section[data-v-38aa54aa] {\n    padding: 0.75rem;\n    max-height: calc(100vh - 120px);\n}\n.thumbnail-grid-section .thumbnail-grid[data-v-38aa54aa] {\n    grid-template-columns: repeat(2, 1fr);\n    max-height: calc(100vh - 250px);\n    padding: 0.5rem;\n    padding-bottom: 5rem;\n    gap: 0.5rem;\n}\n.thumbnail-grid-section .thumbnail-grid .thumbnail-item[data-v-38aa54aa] {\n    border-radius: 6px;\n}\n.thumbnail-grid-section .thumbnail-grid .thumbnail-item .thumbnail-overlay[data-v-38aa54aa] {\n    padding: 0.5rem;\n}\n.thumbnail-grid-section .thumbnail-grid .thumbnail-item .thumbnail-overlay .thumbnail-name[data-v-38aa54aa] {\n    font-size: 0.65rem;\n}\n.thumbnail-grid-section .scroll-to-top-btn[data-v-38aa54aa] {\n    width: 32px;\n    height: 32px;\n    bottom: 0.5rem;\n    right: 0.5rem;\n}\n}\n.selected-exercises-list[data-v-38aa54aa] {\n  padding: 5px;\n  max-height: calc(100vh - 300px);\n  overflow-y: auto;\n}\n.selected-exercises-list .selected-exercise-item[data-v-38aa54aa] {\n  display: flex;\n  align-items: flex-start;\n  gap: 1rem;\n  padding: 0.75rem;\n  background: white;\n  border-radius: 8px;\n  margin-bottom: 0.5rem;\n  border: 1px solid #e9ecef;\n  transition: all 0.2s;\n}\n.selected-exercises-list .selected-exercise-item[data-v-38aa54aa]:hover {\n  border-color: #dc3545;\n  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);\n}\n.selected-exercises-list .selected-exercise-item .exercise-thumbnail-small[data-v-38aa54aa] {\n  width: 50px;\n  height: 50px;\n  -o-object-fit: contain;\n     object-fit: contain;\n  border-radius: 4px;\n  flex-shrink: 0;\n}\n.selected-exercises-list .selected-exercise-item .exercise-content[data-v-38aa54aa] {\n  flex: 1;\n  display: flex;\n  flex-direction: column;\n  gap: 0.5rem;\n  min-width: 0;\n}\n.selected-exercises-list .selected-exercise-item .exercise-name[data-v-38aa54aa] {\n  font-weight: 500;\n  color: #252525;\n  font-size: 0.875rem;\n}\n.selected-exercises-list .selected-exercise-item .exercise-metadata[data-v-38aa54aa] {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 0.5rem;\n  margin-top: 0.25rem;\n}\n.selected-exercises-list .selected-exercise-item .metadata-item[data-v-38aa54aa] {\n  display: inline-flex;\n  align-items: center;\n  gap: 0.25rem;\n  padding: 0.25rem 0.5rem;\n  border-radius: 4px;\n  font-size: 0.6875rem;\n  font-weight: 500;\n  white-space: nowrap;\n}\n.selected-exercises-list .selected-exercise-item .metadata-item i[data-v-38aa54aa] {\n  font-size: 0.7rem;\n}\n.selected-exercises-list .selected-exercise-item .metadata-item span[data-v-38aa54aa] {\n  max-width: 80px;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n.selected-exercises-list .selected-exercise-item .metadata-category[data-v-38aa54aa] {\n  background-color: rgba(0, 123, 255, 0.1);\n  color: #007bff;\n}\n.selected-exercises-list .selected-exercise-item .metadata-category i[data-v-38aa54aa] {\n  color: #007bff;\n}\n.selected-exercises-list .selected-exercise-item .metadata-equipment[data-v-38aa54aa] {\n  background-color: rgba(255, 193, 7, 0.1);\n  color: #ffc107;\n}\n.selected-exercises-list .selected-exercise-item .metadata-equipment i[data-v-38aa54aa] {\n  color: #ffc107;\n}\n.selected-exercises-list .selected-exercise-item .metadata-level[data-v-38aa54aa] {\n  background-color: rgba(40, 167, 69, 0.1);\n  color: #28a745;\n}\n.selected-exercises-list .selected-exercise-item .metadata-level i[data-v-38aa54aa] {\n  color: #28a745;\n}\n.selected-exercises-list .selected-exercise-item .metadata-muscle[data-v-38aa54aa] {\n  background-color: rgba(220, 53, 69, 0.1);\n  color: #dc3545;\n}\n.selected-exercises-list .selected-exercise-item .metadata-muscle i[data-v-38aa54aa] {\n  color: #dc3545;\n}\n.selected-exercises-list .selected-exercise-item .exercise-checkbox[data-v-38aa54aa] {\n  margin: 0;\n  flex-shrink: 0;\n}\n.selected-exercises-list .empty-selected-exercises[data-v-38aa54aa] {\n  text-align: center;\n  padding: 2rem;\n  color: #6c757d;\n}\n.selected-exercises-list .empty-selected-exercises p[data-v-38aa54aa] {\n  margin: 0;\n}\n.exercise-preview[data-v-38aa54aa] {\n  position: relative;\n  width: 100%;\n  height: 200px;\n  margin-bottom: 1rem;\n  border-radius: 8px;\n  overflow: hidden;\n  background: #f8f9fa;\n}\n.exercise-preview img[data-v-38aa54aa] {\n  width: 100%;\n  height: 100%;\n  -o-object-fit: contain;\n     object-fit: contain;\n}\n.exercise-preview .play-button-overlay[data-v-38aa54aa] {\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  transform: translate(-50%, -50%);\n  width: 60px;\n  height: 60px;\n  background: rgba(0, 0, 0, 0.6);\n  border-radius: 50%;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  cursor: pointer;\n  transition: all 0.2s;\n  z-index: 10;\n}\n.exercise-preview .play-button-overlay[data-v-38aa54aa]:hover {\n  background: rgba(0, 0, 0, 0.8);\n  transform: translate(-50%, -50%) scale(1.1);\n}\n.exercise-preview .play-button-overlay i[data-v-38aa54aa] {\n  color: white;\n  font-size: 1.5rem;\n  margin-left: 4px;\n}\n.exercises-in-section .exercise-details[data-v-38aa54aa] {\n  padding: 1rem;\n  background: white;\n  border-radius: 8px;\n  border: 1px solid #e9ecef;\n  margin-top: 1rem;\n}\n.exercises-in-section .exercise-details .exercise-type-selection[data-v-38aa54aa] {\n  margin-bottom: 1.5rem;\n}\n.exercises-in-section .exercise-details .exercise-type-selection .exercise-type-radio[data-v-38aa54aa] {\n  display: flex;\n  gap: 1.5rem;\n}\n.exercises-in-section .exercise-details .exercise-type-selection .exercise-type-radio[data-v-38aa54aa]  .custom-control {\n  margin-bottom: 0;\n}\n.exercises-in-section .exercise-details .exercise-type-selection .exercise-type-radio[data-v-38aa54aa]  .custom-control .custom-control-label {\n  font-size: 0.875rem;\n  color: #495057;\n  cursor: pointer;\n}\n.exercises-in-section .exercise-details .exercise-type-selection .exercise-type-radio[data-v-38aa54aa]  .custom-control .custom-control-label::before {\n  border-color: #ced4da;\n}\n.exercises-in-section .exercise-details .exercise-type-selection .exercise-type-radio[data-v-38aa54aa]  .custom-control .custom-control-input:checked ~ .custom-control-label::before {\n  background-color: #dc3545;\n  border-color: #dc3545;\n}\n.exercises-in-section .exercise-details .sets-configuration[data-v-38aa54aa] {\n  margin-bottom: 1.5rem;\n}\n.exercises-in-section .exercise-details .sets-configuration .sets-table[data-v-38aa54aa] {\n  width: 100%;\n  border-collapse: collapse;\n  margin-bottom: 0.75rem;\n  background: white;\n  border-radius: 4px;\n  overflow: hidden;\n}\n.exercises-in-section .exercise-details .sets-configuration .sets-table thead[data-v-38aa54aa] {\n  background: #f8f9fa;\n}\n.exercises-in-section .exercise-details .sets-configuration .sets-table thead th[data-v-38aa54aa] {\n  padding: 0.75rem;\n  text-align: left;\n  font-size: 0.875rem;\n  font-weight: 600;\n  color: #495057;\n  border-bottom: 2px solid #dee2e6;\n}\n.exercises-in-section .exercise-details .sets-configuration .sets-table tbody tr[data-v-38aa54aa] {\n  border-bottom: 1px solid #e9ecef;\n}\n.exercises-in-section .exercise-details .sets-configuration .sets-table tbody tr[data-v-38aa54aa]:last-child {\n  border-bottom: none;\n}\n.exercises-in-section .exercise-details .sets-configuration .sets-table tbody tr td[data-v-38aa54aa] {\n  padding: 0.5rem 0.75rem;\n}\n.exercises-in-section .exercise-details .sets-configuration .sets-table tbody tr td .set-input[data-v-38aa54aa] {\n  width: 100%;\n  border: 1px solid #ced4da;\n  border-radius: 4px;\n  padding: 0.375rem 0.5rem;\n  font-size: 0.875rem;\n}\n.exercises-in-section .exercise-details .sets-configuration .sets-table tbody tr td .set-input[data-v-38aa54aa]:focus {\n  border-color: #dc3545;\n  box-shadow: 0 0 0 0.2rem rgba(220, 53, 69, 0.15);\n}\n.exercises-in-section .exercise-details .sets-configuration .sets-actions[data-v-38aa54aa] {\n  display: flex;\n  gap: 1rem;\n  align-items: center;\n}\n.exercises-in-section .exercise-details .sets-configuration .sets-actions .add-set-btn[data-v-38aa54aa],\n.exercises-in-section .exercise-details .sets-configuration .sets-actions .delete-set-btn[data-v-38aa54aa] {\n  padding: 0;\n  font-size: 0.875rem;\n  color: #495057;\n  text-decoration: none;\n  border: none;\n  background: none;\n}\n.exercises-in-section .exercise-details .sets-configuration .sets-actions .add-set-btn[data-v-38aa54aa]:hover,\n.exercises-in-section .exercise-details .sets-configuration .sets-actions .delete-set-btn[data-v-38aa54aa]:hover {\n  color: #dc3545;\n  text-decoration: none;\n}\n.exercises-in-section .exercise-details .sets-configuration .sets-actions .add-set-btn i[data-v-38aa54aa],\n.exercises-in-section .exercise-details .sets-configuration .sets-actions .delete-set-btn i[data-v-38aa54aa] {\n  margin-right: 0.25rem;\n  font-size: 0.875rem;\n}\n.exercises-in-section .exercise-details .sets-configuration .sets-actions .add-set-btn[data-v-38aa54aa] {\n  color: #dc3545;\n}\n.exercises-in-section .exercise-details .sets-configuration .sets-actions .add-set-btn i[data-v-38aa54aa] {\n  color: #dc3545;\n}\n.exercises-in-section .exercise-details .sets-configuration .sets-actions .delete-set-btn i[data-v-38aa54aa] {\n  color: #6c757d;\n}\n.exercises-in-section .exercise-details .intensity-section[data-v-38aa54aa] {\n  margin-bottom: 1.5rem;\n}\n.exercises-in-section .exercise-details .intensity-section .intensity-radio[data-v-38aa54aa] {\n  display: flex;\n  flex-direction: column;\n  gap: 0.75rem;\n}\n.exercises-in-section .exercise-details .intensity-section .intensity-radio[data-v-38aa54aa]  .custom-control {\n  margin-bottom: 0;\n}\n.exercises-in-section .exercise-details .intensity-section .intensity-radio[data-v-38aa54aa]  .custom-control .custom-control-label {\n  font-size: 0.875rem;\n  color: #495057;\n  cursor: pointer;\n  display: flex;\n  align-items: center;\n}\n.exercises-in-section .exercise-details .intensity-section .intensity-radio[data-v-38aa54aa]  .custom-control .custom-control-label::before {\n  border-color: #ced4da;\n}\n.exercises-in-section .exercise-details .intensity-section .intensity-radio[data-v-38aa54aa]  .custom-control .custom-control-input:checked ~ .custom-control-label::before {\n  background-color: #dc3545;\n  border-color: #dc3545;\n}\n.exercises-in-section .exercise-details .intensity-section .intensity-radio .intensity-input-wrapper[data-v-38aa54aa] {\n  display: flex;\n  align-items: center;\n  gap: 0.5rem;\n  margin-left: 0.5rem;\n}\n.exercises-in-section .exercise-details .intensity-section .intensity-radio .intensity-input-wrapper .intensity-input[data-v-38aa54aa] {\n  width: 60px;\n  border: 1px solid #ced4da;\n  border-radius: 4px;\n  padding: 0.25rem 0.5rem;\n  font-size: 0.875rem;\n}\n.exercises-in-section .exercise-details .intensity-section .intensity-radio .intensity-input-wrapper .intensity-input[data-v-38aa54aa]:focus {\n  border-color: #dc3545;\n  box-shadow: 0 0 0 0.2rem rgba(220, 53, 69, 0.15);\n}\n.exercises-in-section .exercise-details .intensity-section .intensity-radio .intensity-input-wrapper .intensity-label[data-v-38aa54aa] {\n  font-size: 0.875rem;\n  color: #495057;\n}\n.exercises-in-section .exercise-details .notes-section .notes-label[data-v-38aa54aa] {\n  display: block;\n  font-size: 0.875rem;\n  font-weight: 600;\n  color: #495057;\n  margin-bottom: 0.5rem;\n}\n.exercises-in-section .exercise-details .notes-section .notes-textarea[data-v-38aa54aa] {\n  width: 100%;\n  border: 1px solid #ced4da;\n  border-radius: 4px;\n  padding: 0.75rem;\n  font-size: 0.875rem;\n  resize: vertical;\n  min-height: 100px;\n}\n.exercises-in-section .exercise-details .notes-section .notes-textarea[data-v-38aa54aa]:focus {\n  border-color: #dc3545;\n  box-shadow: 0 0 0 0.2rem rgba(220, 53, 69, 0.15);\n  outline: none;\n}\n.exercises-in-section .exercise-details .notes-section .notes-textarea[data-v-38aa54aa]::-moz-placeholder {\n  color: #adb5bd;\n}\n.exercises-in-section .exercise-details .notes-section .notes-textarea[data-v-38aa54aa]::placeholder {\n  color: #adb5bd;\n}\n[data-v-38aa54aa] .video-player-modal .modal-dialog {\n  max-width: 500px;\n  margin: 1.75rem auto;\n}\n[data-v-38aa54aa] .video-player-modal .modal-content {\n  background: transparent;\n  border: none;\n  box-shadow: none;\n}\n[data-v-38aa54aa] .video-player-modal .modal-body {\n  padding: 0;\n  background: transparent;\n}\n.video-modal-content[data-v-38aa54aa] {\n  position: relative;\n  width: 100%;\n  background: #000;\n  border-radius: 8px;\n  overflow: hidden;\n}\n.video-modal-content .close-video-btn[data-v-38aa54aa] {\n  position: absolute;\n  top: 10px;\n  right: 10px;\n  width: 35px;\n  height: 35px;\n  background: rgba(255, 255, 255, 0.9);\n  border: none;\n  border-radius: 50%;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  cursor: pointer;\n  z-index: 1000;\n  transition: all 0.2s;\n}\n.video-modal-content .close-video-btn[data-v-38aa54aa]:hover {\n  background: rgb(255, 255, 255);\n  transform: scale(1.1);\n}\n.video-modal-content .close-video-btn i[data-v-38aa54aa] {\n  color: #333;\n  font-size: 1.2rem;\n}\n.video-modal-content .exercise-video-modal[data-v-38aa54aa] {\n  width: 100%;\n  height: auto;\n  display: block;\n  background: #000;\n}\n.video-modal-content .exercise-video-modal[data-v-38aa54aa]::-webkit-media-controls {\n  display: none !important;\n}\n.video-modal-content .exercise-video-modal[data-v-38aa54aa]::-webkit-media-controls-enclosure {\n  display: none !important;\n}\n.video-modal-content .video-modal-placeholder[data-v-38aa54aa] {\n  position: relative;\n  min-height: 280px;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  cursor: pointer;\n  background: #111;\n}\n.video-modal-content .video-modal-poster[data-v-38aa54aa] {\n  position: absolute;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  background-size: cover;\n  background-position: center;\n  opacity: 0.6;\n}\n.video-modal-content .video-modal-play-btn[data-v-38aa54aa] {\n  position: relative;\n  z-index: 2;\n  width: 72px;\n  height: 72px;\n  border-radius: 50%;\n  border: none;\n  background: rgba(255, 255, 255, 0.9);\n  color: #333;\n  font-size: 1.75rem;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  padding-left: 6px;\n  cursor: pointer;\n  transition: transform 0.2s, background 0.2s;\n}\n.video-modal-content .video-modal-play-btn[data-v-38aa54aa]:hover {\n  background: #fff;\n  transform: scale(1.1);\n}\n.video-modal-content .video-modal-exercise-name[data-v-38aa54aa] {\n  position: relative;\n  z-index: 2;\n  margin-top: 1rem;\n  color: #fff;\n  font-size: 1rem;\n  text-align: center;\n  padding: 0 1rem;\n}", ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-12.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12.use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-12.use[3]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/Workout/WorkoutEditor.vue?vue&type=style&index=0&id=38aa54aa&lang=scss&scoped=true":
/*!****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-12.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12.use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-12.use[3]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/Workout/WorkoutEditor.vue?vue&type=style&index=0&id=38aa54aa&lang=scss&scoped=true ***!
  \****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../../../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_clonedRuleSet_12_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_12_use_2_node_modules_sass_loader_dist_cjs_js_clonedRuleSet_12_use_3_node_modules_vue_loader_lib_index_js_vue_loader_options_WorkoutEditor_vue_vue_type_style_index_0_id_38aa54aa_lang_scss_scoped_true__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !!../../../../../../node_modules/css-loader/dist/cjs.js??clonedRuleSet-12.use[1]!../../../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12.use[2]!../../../../../../node_modules/sass-loader/dist/cjs.js??clonedRuleSet-12.use[3]!../../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./WorkoutEditor.vue?vue&type=style&index=0&id=38aa54aa&lang=scss&scoped=true */ "./node_modules/css-loader/dist/cjs.js??clonedRuleSet-12.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12.use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-12.use[3]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/Workout/WorkoutEditor.vue?vue&type=style&index=0&id=38aa54aa&lang=scss&scoped=true");

            

var options = {};

options.insert = "head";
options.singleton = false;

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_clonedRuleSet_12_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_12_use_2_node_modules_sass_loader_dist_cjs_js_clonedRuleSet_12_use_3_node_modules_vue_loader_lib_index_js_vue_loader_options_WorkoutEditor_vue_vue_type_style_index_0_id_38aa54aa_lang_scss_scoped_true__WEBPACK_IMPORTED_MODULE_1__["default"], options);



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_clonedRuleSet_12_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_12_use_2_node_modules_sass_loader_dist_cjs_js_clonedRuleSet_12_use_3_node_modules_vue_loader_lib_index_js_vue_loader_options_WorkoutEditor_vue_vue_type_style_index_0_id_38aa54aa_lang_scss_scoped_true__WEBPACK_IMPORTED_MODULE_1__["default"].locals || {});

/***/ }),

/***/ "./resources/src/views/app/pages/Workout/WorkoutEditor.vue":
/*!*****************************************************************!*\
  !*** ./resources/src/views/app/pages/Workout/WorkoutEditor.vue ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _WorkoutEditor_vue_vue_type_template_id_38aa54aa_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./WorkoutEditor.vue?vue&type=template&id=38aa54aa&scoped=true */ "./resources/src/views/app/pages/Workout/WorkoutEditor.vue?vue&type=template&id=38aa54aa&scoped=true");
/* harmony import */ var _WorkoutEditor_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./WorkoutEditor.vue?vue&type=script&lang=js */ "./resources/src/views/app/pages/Workout/WorkoutEditor.vue?vue&type=script&lang=js");
/* harmony import */ var _WorkoutEditor_vue_vue_type_style_index_0_id_38aa54aa_lang_scss_scoped_true__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./WorkoutEditor.vue?vue&type=style&index=0&id=38aa54aa&lang=scss&scoped=true */ "./resources/src/views/app/pages/Workout/WorkoutEditor.vue?vue&type=style&index=0&id=38aa54aa&lang=scss&scoped=true");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");



;


/* normalize component */

var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _WorkoutEditor_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__["default"],
  _WorkoutEditor_vue_vue_type_template_id_38aa54aa_scoped_true__WEBPACK_IMPORTED_MODULE_0__.render,
  _WorkoutEditor_vue_vue_type_template_id_38aa54aa_scoped_true__WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  "38aa54aa",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/src/views/app/pages/Workout/WorkoutEditor.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./resources/src/views/app/pages/Workout/WorkoutEditor.vue?vue&type=script&lang=js":
/*!*****************************************************************************************!*\
  !*** ./resources/src/views/app/pages/Workout/WorkoutEditor.vue?vue&type=script&lang=js ***!
  \*****************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_WorkoutEditor_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./WorkoutEditor.vue?vue&type=script&lang=js */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/Workout/WorkoutEditor.vue?vue&type=script&lang=js");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_WorkoutEditor_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/src/views/app/pages/Workout/WorkoutEditor.vue?vue&type=style&index=0&id=38aa54aa&lang=scss&scoped=true":
/*!**************************************************************************************************************************!*\
  !*** ./resources/src/views/app/pages/Workout/WorkoutEditor.vue?vue&type=style&index=0&id=38aa54aa&lang=scss&scoped=true ***!
  \**************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_dist_cjs_js_node_modules_css_loader_dist_cjs_js_clonedRuleSet_12_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_12_use_2_node_modules_sass_loader_dist_cjs_js_clonedRuleSet_12_use_3_node_modules_vue_loader_lib_index_js_vue_loader_options_WorkoutEditor_vue_vue_type_style_index_0_id_38aa54aa_lang_scss_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/style-loader/dist/cjs.js!../../../../../../node_modules/css-loader/dist/cjs.js??clonedRuleSet-12.use[1]!../../../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12.use[2]!../../../../../../node_modules/sass-loader/dist/cjs.js??clonedRuleSet-12.use[3]!../../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./WorkoutEditor.vue?vue&type=style&index=0&id=38aa54aa&lang=scss&scoped=true */ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-12.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12.use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-12.use[3]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/Workout/WorkoutEditor.vue?vue&type=style&index=0&id=38aa54aa&lang=scss&scoped=true");


/***/ }),

/***/ "./resources/src/views/app/pages/Workout/WorkoutEditor.vue?vue&type=template&id=38aa54aa&scoped=true":
/*!***********************************************************************************************************!*\
  !*** ./resources/src/views/app/pages/Workout/WorkoutEditor.vue?vue&type=template&id=38aa54aa&scoped=true ***!
  \***********************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_WorkoutEditor_vue_vue_type_template_id_38aa54aa_scoped_true__WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   staticRenderFns: () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_WorkoutEditor_vue_vue_type_template_id_38aa54aa_scoped_true__WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_WorkoutEditor_vue_vue_type_template_id_38aa54aa_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./WorkoutEditor.vue?vue&type=template&id=38aa54aa&scoped=true */ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/Workout/WorkoutEditor.vue?vue&type=template&id=38aa54aa&scoped=true");


/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/Workout/WorkoutEditor.vue?vue&type=template&id=38aa54aa&scoped=true":
/*!**************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/Workout/WorkoutEditor.vue?vue&type=template&id=38aa54aa&scoped=true ***!
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
    [
      _vm.showBreadcrumb
        ? _c("div", { staticClass: "breadcrumb-nav-row mb-3" }, [
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
                          attrs: {
                            type: "button",
                            title: "Go back to member details",
                          },
                          on: {
                            click: function ($event) {
                              $event.stopPropagation()
                              return _vm.goBackToMember.apply(null, arguments)
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
                        _c(
                          "li",
                          { staticClass: "breadcrumb-item" },
                          [
                            _c(
                              "router-link",
                              { attrs: { to: "/app/members/viewallmembers" } },
                              [
                                _c("i", { staticClass: "fas fa-users" }),
                                _vm._v(
                                  "\n                                Members\n                            "
                                ),
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
                            _c(
                              "router-link",
                              {
                                attrs: {
                                  to:
                                    "/app/Members/MemberDetails/" +
                                    _vm.memberId,
                                },
                              },
                              [
                                _c("i", { staticClass: "fas fa-user" }),
                                _vm._v(
                                  "\n                                " +
                                    _vm._s(_vm.memberName) +
                                    "\n                            "
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
          ])
        : _vm._e(),
      _vm._v(" "),
      _c("div", { staticClass: "page-header" }, [
        _c("div", { staticClass: "header-content" }, [
          _c("h1", { staticClass: "page-title" }, [
            _vm._v("\n                Workout Editor\n            "),
          ]),
          _vm._v(" "),
          !_vm.editWorkoutData
            ? _c(
                "div",
                { staticClass: "workout-select-row" },
                [
                  _c(
                    "b-form-group",
                    {
                      attrs: {
                        label: "Select a workout to edit:",
                        "label-for": "workout-select",
                      },
                    },
                    [
                      _c("b-form-select", {
                        attrs: {
                          id: "workout-select",
                          options: _vm.workoutSelectOptions,
                          placeholder: "Choose a workout...",
                        },
                        on: { change: _vm.onSelectWorkout },
                        model: {
                          value: _vm.selectedWorkoutId,
                          callback: function ($$v) {
                            _vm.selectedWorkoutId = $$v
                          },
                          expression: "selectedWorkoutId",
                        },
                      }),
                    ],
                    1
                  ),
                ],
                1
              )
            : _vm._e(),
        ]),
        _vm._v(" "),
        _c(
          "div",
          { staticClass: "header-actions" },
          [
            _c(
              "b-button",
              {
                staticClass: "save-workout-btn",
                attrs: {
                  variant: "success",
                  size: "sm",
                  disabled:
                    !_vm.selectedDay || _vm.workoutSections.length === 0,
                },
                on: { click: _vm.saveWorkoutActivityPlan },
              },
              [
                _c("i", { staticClass: "fas fa-save mr-2" }),
                _vm._v("\n                Save Workout\n            "),
              ]
            ),
            _vm._v(" "),
            _vm.editWorkoutData
              ? _c(
                  "b-button",
                  {
                    staticClass: "btn-outline-modern ml-2",
                    attrs: { variant: "outline-secondary" },
                    on: { click: _vm.cancelEdit },
                  },
                  [
                    _c("i", { staticClass: "fas fa-times mr-2" }),
                    _vm._v("\n                Cancel Edit\n            "),
                  ]
                )
              : _vm._e(),
          ],
          1
        ),
      ]),
      _vm._v(" "),
      _c("div", { staticClass: "editor-layout" }, [
        _c(
          "div",
          {
            staticClass: "editor-column training-plan",
            class: { "section-disabled": !_vm.editWorkoutData },
          },
          [
            _c(
              "div",
              { staticClass: "column-header" },
              [
                _vm._m(1),
                _vm._v(" "),
                _c(
                  "b-button",
                  {
                    staticClass: "add-day-btn",
                    attrs: { variant: "outline-primary", size: "sm" },
                    on: { click: _vm.addDay },
                  },
                  [_c("i", { staticClass: "fas fa-plus" })]
                ),
              ],
              1
            ),
            _vm._v(" "),
            _vm.showThumbnailGrid
              ? _c("div", { staticClass: "thumbnail-grid-section" }, [
                  _c(
                    "div",
                    { staticClass: "thumbnail-grid-header" },
                    [
                      _c("h4", [_vm._v("Search results")]),
                      _vm._v(" "),
                      _c(
                        "b-button",
                        {
                          staticClass: "close-thumbnail-btn",
                          attrs: { variant: "link", size: "sm" },
                          on: { click: _vm.closeThumbnailGrid },
                        },
                        [_c("i", { staticClass: "fas fa-times" })]
                      ),
                    ],
                    1
                  ),
                  _vm._v(" "),
                  _c("div", { staticClass: "filter-container" }, [
                    _c(
                      "div",
                      { staticClass: "filter-row" },
                      [
                        _c("b-form-input", {
                          staticClass: "filter-input",
                          attrs: { placeholder: "Search activities" },
                          model: {
                            value: _vm.thumbnailSearch,
                            callback: function ($$v) {
                              _vm.thumbnailSearch = $$v
                            },
                            expression: "thumbnailSearch",
                          },
                        }),
                        _vm._v(" "),
                        _c("b-form-select", {
                          staticClass: "filter-select",
                          attrs: { options: _vm.bodyPartOptions },
                          model: {
                            value: _vm.filterBodyPart,
                            callback: function ($$v) {
                              _vm.filterBodyPart = $$v
                            },
                            expression: "filterBodyPart",
                          },
                        }),
                        _vm._v(" "),
                        _c("b-form-select", {
                          staticClass: "filter-select",
                          attrs: { options: _vm.muscleGroupOptions },
                          model: {
                            value: _vm.filterMuscleGroup,
                            callback: function ($$v) {
                              _vm.filterMuscleGroup = $$v
                            },
                            expression: "filterMuscleGroup",
                          },
                        }),
                      ],
                      1
                    ),
                    _vm._v(" "),
                    _c(
                      "div",
                      { staticClass: "filter-row" },
                      [
                        _c("b-form-select", {
                          staticClass: "filter-select",
                          attrs: { options: _vm.exerciseTypeOptions },
                          model: {
                            value: _vm.filterExerciseType,
                            callback: function ($$v) {
                              _vm.filterExerciseType = $$v
                            },
                            expression: "filterExerciseType",
                          },
                        }),
                        _vm._v(" "),
                        _c("b-form-select", {
                          staticClass: "filter-select",
                          attrs: { options: _vm.levelOptions },
                          model: {
                            value: _vm.filterLevel,
                            callback: function ($$v) {
                              _vm.filterLevel = $$v
                            },
                            expression: "filterLevel",
                          },
                        }),
                        _vm._v(" "),
                        _c("b-form-select", {
                          staticClass: "filter-select",
                          attrs: { options: _vm.equipmentOptions },
                          model: {
                            value: _vm.filterEquipment,
                            callback: function ($$v) {
                              _vm.filterEquipment = $$v
                            },
                            expression: "filterEquipment",
                          },
                        }),
                      ],
                      1
                    ),
                  ]),
                  _vm._v(" "),
                  _vm.loadingThumbnails
                    ? _c("div", { staticClass: "loading-thumbnails" }, [
                        _c("i", { staticClass: "fas fa-spinner fa-spin" }),
                        _vm._v(" Loading thumbnails...\n                "),
                      ])
                    : _c(
                        "div",
                        { staticClass: "thumbnail-grid-wrapper" },
                        [
                          _c(
                            "div",
                            {
                              ref: "thumbnailGrid",
                              staticClass: "thumbnail-grid",
                              on: { scroll: _vm.handleThumbnailGridScroll },
                            },
                            _vm._l(
                              _vm.filteredThumbnails,
                              function (thumbnail, thumbIndex) {
                                return _c(
                                  "div",
                                  {
                                    key:
                                      (thumbnail.id != null
                                        ? "id-" + thumbnail.id
                                        : "fn-" + thumbIndex) +
                                      "-" +
                                      (thumbnail.filename || ""),
                                    staticClass: "thumbnail-item",
                                    class: {
                                      selected: _vm.selectedThumbnails.find(
                                        function (t) {
                                          return (
                                            t.filename === thumbnail.filename
                                          )
                                        }
                                      ),
                                    },
                                    on: {
                                      click: function ($event) {
                                        return _vm.toggleThumbnailSelection(
                                          thumbnail
                                        )
                                      },
                                    },
                                  },
                                  [
                                    _c("img", {
                                      attrs: {
                                        src: _vm.getThumbnailSrc(thumbnail),
                                        alt: thumbnail.name,
                                        loading: "lazy",
                                      },
                                      on: {
                                        error: function ($event) {
                                          return _vm.onThumbnailImgError(
                                            $event,
                                            thumbnail
                                          )
                                        },
                                      },
                                    }),
                                    _vm._v(" "),
                                    _c(
                                      "div",
                                      { staticClass: "thumbnail-overlay" },
                                      [
                                        _c(
                                          "span",
                                          { staticClass: "thumbnail-name" },
                                          [_vm._v(_vm._s(thumbnail.name))]
                                        ),
                                      ]
                                    ),
                                  ]
                                )
                              }
                            ),
                            0
                          ),
                          _vm._v(" "),
                          _vm.thumbnailCurrentPage < _vm.thumbnailLastPage &&
                          !_vm.loadingThumbnails
                            ? _c(
                                "div",
                                { staticClass: "load-more-thumbnails" },
                                [
                                  _c(
                                    "div",
                                    {
                                      staticClass:
                                        "d-flex align-items-center justify-content-between w-100",
                                    },
                                    [
                                      _c(
                                        "b-button",
                                        {
                                          attrs: {
                                            variant: "outline-primary",
                                            size: "sm",
                                            disabled: _vm.loadingMoreThumbnails,
                                          },
                                          on: { click: _vm.loadMoreThumbnails },
                                        },
                                        [
                                          _vm.loadingMoreThumbnails
                                            ? _c("i", {
                                                staticClass:
                                                  "fas fa-spinner fa-spin mr-1",
                                              })
                                            : _vm._e(),
                                          _vm._v(
                                            "\n                                " +
                                              _vm._s(
                                                _vm.loadingMoreThumbnails
                                                  ? "Loading..."
                                                  : "Load more"
                                              ) +
                                              "\n                            "
                                          ),
                                        ]
                                      ),
                                      _vm._v(" "),
                                      _c(
                                        "small",
                                        { staticClass: "text-muted ml-2" },
                                        [
                                          _vm._v(
                                            _vm._s(_vm.allThumbnails.length) +
                                              " of " +
                                              _vm._s(_vm.thumbnailTotal) +
                                              " loaded"
                                          ),
                                        ]
                                      ),
                                    ],
                                    1
                                  ),
                                ]
                              )
                            : _vm.thumbnailTotal > 0
                            ? _c(
                                "div",
                                { staticClass: "load-more-thumbnails" },
                                [
                                  _c("small", { staticClass: "text-muted" }, [
                                    _vm._v(
                                      _vm._s(_vm.thumbnailTotal) +
                                        " activities loaded"
                                    ),
                                  ]),
                                  _vm._v(" "),
                                  _vm._m(2),
                                ]
                              )
                            : _vm._e(),
                          _vm._v(" "),
                          _vm.showScrollToTop
                            ? _c(
                                "b-button",
                                {
                                  staticClass: "scroll-to-top-btn",
                                  attrs: {
                                    variant: "primary",
                                    size: "sm",
                                    title: "Scroll to top",
                                  },
                                  on: { click: _vm.scrollToTop },
                                },
                                [_c("i", { staticClass: "fas fa-arrow-up" })]
                              )
                            : _vm._e(),
                        ],
                        1
                      ),
                ])
              : _c("div", { staticClass: "training-plan-content" }, [
                  _c("div", { staticClass: "plan-overview" }, [
                    _c("div", { staticClass: "weekly-schedule" }, [
                      _vm.selectedDay
                        ? _c(
                            "div",
                            {
                              staticClass: "selected-day-display",
                              staticStyle: { display: "none" },
                            },
                            [
                              _c("div", { staticClass: "selected-day-info" }, [
                                _c("h6", [
                                  _c("i", {
                                    staticClass: "fas fa-calendar-day mr-2",
                                  }),
                                  _vm._v(
                                    "Selected Day: " + _vm._s(_vm.selectedDay)
                                  ),
                                ]),
                                _vm._v(" "),
                                _c("p", { staticClass: "text-muted" }, [
                                  _vm._v(
                                    "Exercises will be added to this day's workout"
                                  ),
                                ]),
                              ]),
                              _vm._v(" "),
                              _c(
                                "b-button",
                                {
                                  attrs: {
                                    variant: "outline-secondary",
                                    size: "sm",
                                  },
                                  on: { click: _vm.clearSelectedDay },
                                },
                                [
                                  _c("i", { staticClass: "fas fa-times" }),
                                  _vm._v(
                                    " Clear\n                            "
                                  ),
                                ]
                              ),
                            ],
                            1
                          )
                        : _vm._e(),
                      _vm._v(" "),
                      _c(
                        "div",
                        { staticClass: "days-overview" },
                        _vm._l(_vm.trainingPlan.days, function (day, index) {
                          return _c(
                            "div",
                            {
                              key: index,
                              staticClass: "day-overview",
                              class: { selected: _vm.selectedDay === day.name },
                              on: {
                                click: function ($event) {
                                  return _vm.selectDay(day.name)
                                },
                              },
                            },
                            [
                              _c(
                                "div",
                                {
                                  staticClass: "day-header",
                                  staticStyle: {
                                    display: "flex",
                                    "align-items": "center",
                                    "justify-content": "space-between",
                                  },
                                },
                                [
                                  day.isNew
                                    ? [
                                        _c("b-form-select", {
                                          staticClass: "day-select",
                                          staticStyle: {
                                            flex: "1",
                                            "min-width": "0",
                                            "margin-right": "12px",
                                          },
                                          attrs: {
                                            options:
                                              _vm.getDaySelectOptions(index),
                                            placeholder: "Select day...",
                                            size: "md",
                                          },
                                          on: {
                                            change: function ($event) {
                                              return _vm.onDayNameChange(
                                                index,
                                                $event
                                              )
                                            },
                                            focus: function ($event) {
                                              _vm.currentEditingIndex = index
                                            },
                                            blur: function ($event) {
                                              _vm.currentEditingIndex = null
                                            },
                                          },
                                          model: {
                                            value: day.name,
                                            callback: function ($$v) {
                                              _vm.$set(day, "name", $$v)
                                            },
                                            expression: "day.name",
                                          },
                                        }),
                                      ]
                                    : [
                                        _c(
                                          "span",
                                          { staticClass: "day-name" },
                                          [
                                            _vm._v(
                                              _vm._s(
                                                day.name || "No day selected"
                                              )
                                            ),
                                          ]
                                        ),
                                      ],
                                  _vm._v(" "),
                                  _c(
                                    "b-button",
                                    {
                                      staticClass: "delete-day-btn ml-2",
                                      attrs: { variant: "danger", size: "sm" },
                                      on: {
                                        click: function ($event) {
                                          $event.stopPropagation()
                                          return _vm.removeDay(index)
                                        },
                                      },
                                    },
                                    [_c("i", { staticClass: "fas fa-trash" })]
                                  ),
                                ],
                                2
                              ),
                              _vm._v(" "),
                              day.name
                                ? _c("div", { staticClass: "day-info" }, [
                                    _c("small", { staticClass: "text-muted" }, [
                                      _vm._v("Selected: " + _vm._s(day.name)),
                                    ]),
                                    _vm._v(" "),
                                    _vm.getDayExerciseCount(day.name) > 0
                                      ? _c(
                                          "div",
                                          { staticClass: "day-exercise-count" },
                                          [
                                            _c(
                                              "small",
                                              { staticClass: "text-primary" },
                                              [
                                                _vm._v(
                                                  _vm._s(
                                                    _vm.getDayExerciseCount(
                                                      day.name
                                                    )
                                                  ) + " exercises"
                                                ),
                                              ]
                                            ),
                                          ]
                                        )
                                      : _vm._e(),
                                  ])
                                : _c("div", { staticClass: "day-info" }, [
                                    _c("small", { staticClass: "text-muted" }, [
                                      _vm._v("No day selected"),
                                    ]),
                                  ]),
                            ]
                          )
                        }),
                        0
                      ),
                      _vm._v(" "),
                      _vm.trainingPlan.days.length > 0
                        ? _c("div", { staticClass: "schedule-summary" }, [
                            _vm._m(3),
                            _vm._v(" "),
                            _c(
                              "div",
                              { staticClass: "selected-days" },
                              _vm._l(
                                _vm.trainingPlan.days.filter(function (d) {
                                  return d.name
                                }),
                                function (day) {
                                  return _c(
                                    "span",
                                    { key: day.name, staticClass: "day-badge" },
                                    [
                                      _vm._v(
                                        "\n                                    " +
                                          _vm._s(day.name) +
                                          "\n                                "
                                      ),
                                    ]
                                  )
                                }
                              ),
                              0
                            ),
                          ])
                        : _vm._e(),
                    ]),
                  ]),
                ]),
          ]
        ),
        _vm._v(" "),
        _c(
          "div",
          {
            staticClass: "editor-column exercise-library",
            class: { "section-disabled": !_vm.editWorkoutData },
          },
          [
            _c(
              "div",
              {
                staticClass: "column-header",
                staticStyle: {
                  display: "flex",
                  "align-items": "center",
                  "justify-content": "space-between",
                },
              },
              [
                _vm._m(4),
                _vm._v(" "),
                _c(
                  "b-button",
                  {
                    staticClass: "ml-2 add-exercise-btn",
                    staticStyle: {
                      "border-radius": "50%",
                      width: "34px",
                      height: "34px",
                      display: "flex",
                      "align-items": "center",
                      "justify-content": "center",
                      border: "none",
                      padding: "0",
                    },
                    attrs: {
                      variant: "link",
                      size: "sm",
                      title: "Add Exercise",
                    },
                    on: { click: _vm.loadAllThumbnails },
                  },
                  [
                    _c("i", {
                      staticClass: "fas fa-plus",
                      staticStyle: { color: "#ff4040" },
                    }),
                  ]
                ),
              ],
              1
            ),
            _vm._v(" "),
            _c(
              "div",
              { staticClass: "selected-exercises-list" },
              [
                _vm._l(_vm.selectedThumbnails, function (exercise) {
                  return _c(
                    "div",
                    {
                      key: exercise.filename,
                      staticClass: "selected-exercise-item",
                    },
                    [
                      _c("img", {
                        staticClass: "exercise-thumbnail-small",
                        attrs: {
                          src: _vm.resolveAssetUrl(exercise.thumbnail_url),
                          alt: exercise.name,
                        },
                      }),
                      _vm._v(" "),
                      _c("div", { staticClass: "exercise-content" }, [
                        _c("span", { staticClass: "exercise-name" }, [
                          _vm._v(_vm._s(exercise.name)),
                        ]),
                        _vm._v(" "),
                        _vm.hasMetadata(exercise)
                          ? _c("div", { staticClass: "exercise-metadata" }, [
                              exercise.category
                                ? _c(
                                    "span",
                                    {
                                      staticClass:
                                        "metadata-item metadata-category",
                                      attrs: {
                                        title: _vm.formatCategory(
                                          exercise.category
                                        ),
                                      },
                                    },
                                    [
                                      _c("i", { staticClass: "fas fa-tag" }),
                                      _vm._v(" "),
                                      _c("span", [
                                        _vm._v(
                                          _vm._s(
                                            _vm.formatCategory(
                                              exercise.category
                                            )
                                          )
                                        ),
                                      ]),
                                    ]
                                  )
                                : _vm._e(),
                              _vm._v(" "),
                              exercise.equipment
                                ? _c(
                                    "span",
                                    {
                                      staticClass:
                                        "metadata-item metadata-equipment",
                                      attrs: { title: exercise.equipment },
                                    },
                                    [
                                      _c("i", {
                                        staticClass: "fas fa-dumbbell",
                                      }),
                                      _vm._v(" "),
                                      _c("span", [
                                        _vm._v(_vm._s(exercise.equipment)),
                                      ]),
                                    ]
                                  )
                                : _vm._e(),
                              _vm._v(" "),
                              exercise.level
                                ? _c(
                                    "span",
                                    {
                                      staticClass:
                                        "metadata-item metadata-level",
                                      attrs: { title: exercise.level },
                                    },
                                    [
                                      _c("i", { staticClass: "fas fa-signal" }),
                                      _vm._v(" "),
                                      _c("span", [
                                        _vm._v(_vm._s(exercise.level)),
                                      ]),
                                    ]
                                  )
                                : _vm._e(),
                              _vm._v(" "),
                              exercise.targeted_muscle
                                ? _c(
                                    "span",
                                    {
                                      staticClass:
                                        "metadata-item metadata-muscle",
                                      attrs: {
                                        title: exercise.targeted_muscle,
                                      },
                                    },
                                    [
                                      _c("i", { staticClass: "fas fa-fire" }),
                                      _vm._v(" "),
                                      _c("span", [
                                        _vm._v(
                                          _vm._s(
                                            _vm.formatMuscle(
                                              exercise.targeted_muscle
                                            )
                                          )
                                        ),
                                      ]),
                                    ]
                                  )
                                : _vm._e(),
                            ])
                          : _vm._e(),
                      ]),
                      _vm._v(" "),
                      _c("b-form-checkbox", {
                        staticClass: "exercise-checkbox",
                        on: {
                          change: function ($event) {
                            return _vm.toggleThumbnailSelection(exercise)
                          },
                        },
                        model: {
                          value: exercise.selected,
                          callback: function ($$v) {
                            _vm.$set(exercise, "selected", $$v)
                          },
                          expression: "exercise.selected",
                        },
                      }),
                    ],
                    1
                  )
                }),
                _vm._v(" "),
                _vm.selectedThumbnails.length === 0
                  ? _c("div", { staticClass: "empty-selected-exercises" }, [
                      _c("p", [
                        _vm._v(
                          "No exercises selected. Click the + icon to browse exercises."
                        ),
                      ]),
                    ])
                  : _vm._e(),
              ],
              2
            ),
          ]
        ),
        _vm._v(" "),
        _c(
          "div",
          {
            staticClass: "editor-column workout-builder",
            class: { "section-disabled": !_vm.editWorkoutData },
          },
          [
            _vm._m(5),
            _vm._v(" "),
            _c("div", { staticClass: "workout-sections" }, [
              _vm._m(6),
              _vm._v(" "),
              _c(
                "div",
                { staticClass: "sections-list" },
                [
                  _vm.allWorkoutSections.length === 0
                    ? _c("div", { staticClass: "empty-sections" }, [
                        _c("div", { staticClass: "empty-state" }, [
                          _c("i", {
                            staticClass: "fas fa-dumbbell empty-icon",
                          }),
                          _vm._v(" "),
                          _c("h5", [_vm._v("No workout sections yet")]),
                          _vm._v(" "),
                          !_vm.selectedDay
                            ? _c("p", [
                                _vm._v(
                                  "Select a day to view existing workout plans"
                                ),
                              ])
                            : _c("p", [
                                _vm._v(
                                  "No workout plans found for " +
                                    _vm._s(_vm.selectedDay)
                                ),
                              ]),
                        ]),
                      ])
                    : _vm._e(),
                  _vm._v(" "),
                  _vm._l(
                    _vm.allWorkoutSections,
                    function (section, sectionIndex) {
                      return _c(
                        "div",
                        {
                          key: section.id || sectionIndex,
                          staticClass: "workout-section",
                          class: { "view-only": section.isViewOnly },
                        },
                        [
                          _c(
                            "div",
                            { staticClass: "section-header" },
                            [
                              _c("b-form-input", {
                                staticClass: "section-name-input",
                                attrs: {
                                  placeholder: "Section name...",
                                  disabled: section.isViewOnly,
                                },
                                model: {
                                  value: section.name,
                                  callback: function ($$v) {
                                    _vm.$set(section, "name", $$v)
                                  },
                                  expression: "section.name",
                                },
                              }),
                              _vm._v(" "),
                              _c(
                                "div",
                                { staticClass: "section-actions" },
                                [
                                  section.isViewOnly && section.planData
                                    ? _c(
                                        "b-button",
                                        {
                                          staticClass: "edit-plan-btn",
                                          attrs: {
                                            variant: "info",
                                            size: "sm",
                                          },
                                          on: {
                                            click: function ($event) {
                                              return _vm.loadExistingPlanToEditor(
                                                section.planData
                                              )
                                            },
                                          },
                                        },
                                        [
                                          _c("i", {
                                            staticClass: "fas fa-edit",
                                          }),
                                          _vm._v(
                                            " Edit\n                                "
                                          ),
                                        ]
                                      )
                                    : _vm._e(),
                                  _vm._v(" "),
                                  section.planData
                                    ? _c(
                                        "b-button",
                                        {
                                          attrs: {
                                            variant: "danger",
                                            size: "sm",
                                          },
                                          on: {
                                            click: function ($event) {
                                              return _vm.deleteWorkoutPlan(
                                                section.planData.id
                                              )
                                            },
                                          },
                                        },
                                        [
                                          _c("i", {
                                            staticClass: "fas fa-trash",
                                          }),
                                        ]
                                      )
                                    : _vm._e(),
                                  _vm._v(" "),
                                  !section.isViewOnly
                                    ? _c(
                                        "b-button",
                                        {
                                          attrs: {
                                            variant: "danger",
                                            size: "sm",
                                          },
                                          on: {
                                            click: function ($event) {
                                              return _vm.removeSection(
                                                sectionIndex
                                              )
                                            },
                                          },
                                        },
                                        [
                                          _c("i", {
                                            staticClass: "fas fa-times",
                                          }),
                                        ]
                                      )
                                    : _vm._e(),
                                ],
                                1
                              ),
                            ],
                            1
                          ),
                          _vm._v(" "),
                          _c("div", { staticClass: "exercises-in-section" }, [
                            _c(
                              "div",
                              { staticClass: "exercises-thumbnails-list" },
                              _vm._l(
                                section.exercises,
                                function (exercise, exerciseIndex) {
                                  return _c(
                                    "div",
                                    {
                                      key: exerciseIndex,
                                      staticClass: "exercise-thumbnail-item",
                                    },
                                    [
                                      exercise.thumbnail_url || exercise.image
                                        ? _c(
                                            "div",
                                            { staticClass: "exercise-preview" },
                                            [
                                              _c("img", {
                                                attrs: {
                                                  src: _vm.resolveAssetUrl(
                                                    exercise.thumbnail_url ||
                                                      exercise.image
                                                  ),
                                                  alt: exercise.name,
                                                },
                                              }),
                                              _vm._v(" "),
                                              _c(
                                                "div",
                                                {
                                                  staticClass:
                                                    "play-button-overlay",
                                                  on: {
                                                    click: function ($event) {
                                                      return _vm.playExerciseVideo(
                                                        exercise
                                                      )
                                                    },
                                                  },
                                                },
                                                [
                                                  _c("i", {
                                                    staticClass: "fas fa-play",
                                                  }),
                                                ]
                                              ),
                                            ]
                                          )
                                        : _vm._e(),
                                      _vm._v(" "),
                                      _c(
                                        "div",
                                        { staticClass: "exercise-title-bar" },
                                        [
                                          _c(
                                            "h6",
                                            { staticClass: "exercise-title" },
                                            [_vm._v(_vm._s(exercise.name))]
                                          ),
                                          _vm._v(" "),
                                          !section.isViewOnly
                                            ? _c(
                                                "b-button",
                                                {
                                                  staticClass:
                                                    "exercise-delete-btn",
                                                  attrs: {
                                                    variant: "danger",
                                                    size: "sm",
                                                  },
                                                  on: {
                                                    click: function ($event) {
                                                      return _vm.removeExercise(
                                                        sectionIndex,
                                                        exerciseIndex
                                                      )
                                                    },
                                                  },
                                                },
                                                [
                                                  _c("i", {
                                                    staticClass: "fas fa-trash",
                                                  }),
                                                ]
                                              )
                                            : _vm._e(),
                                        ],
                                        1
                                      ),
                                    ]
                                  )
                                }
                              ),
                              0
                            ),
                            _vm._v(" "),
                            section.exercises && section.exercises.length > 0
                              ? _c("div", { staticClass: "exercise-details" }, [
                                  _c(
                                    "div",
                                    { staticClass: "exercise-type-selection" },
                                    [
                                      _c(
                                        "b-form-radio-group",
                                        {
                                          staticClass: "exercise-type-radio",
                                          attrs: {
                                            disabled: section.isViewOnly,
                                          },
                                          model: {
                                            value: section.exerciseType,
                                            callback: function ($$v) {
                                              _vm.$set(
                                                section,
                                                "exerciseType",
                                                $$v
                                              )
                                            },
                                            expression: "section.exerciseType",
                                          },
                                        },
                                        [
                                          _c(
                                            "b-form-radio",
                                            { attrs: { value: "repetition" } },
                                            [_vm._v("Repetition-based")]
                                          ),
                                          _vm._v(" "),
                                          _c(
                                            "b-form-radio",
                                            { attrs: { value: "time" } },
                                            [_vm._v("Time-based")]
                                          ),
                                        ],
                                        1
                                      ),
                                    ],
                                    1
                                  ),
                                  _vm._v(" "),
                                  _c(
                                    "div",
                                    { staticClass: "sets-configuration" },
                                    [
                                      _c(
                                        "table",
                                        { staticClass: "sets-table" },
                                        [
                                          _c("thead", [
                                            _c("tr", [
                                              _c("th", [_vm._v("Reps (x)")]),
                                              _vm._v(" "),
                                              _c("th", [_vm._v("Rest (s)")]),
                                              _vm._v(" "),
                                              _vm.enablePresetWeights
                                                ? _c("th", [
                                                    _vm._v("Weight (kg/lbs)"),
                                                  ])
                                                : _vm._e(),
                                              _vm._v(" "),
                                              section.setsConfiguration &&
                                              section.setsConfiguration.length >
                                                3 &&
                                              !section.isViewOnly
                                                ? _c("th", [_vm._v("Action")])
                                                : _vm._e(),
                                            ]),
                                          ]),
                                          _vm._v(" "),
                                          _c(
                                            "tbody",
                                            _vm._l(
                                              section.setsConfiguration,
                                              function (set, setIndex) {
                                                return _c(
                                                  "tr",
                                                  { key: setIndex },
                                                  [
                                                    _c(
                                                      "td",
                                                      [
                                                        _c("b-form-input", {
                                                          staticClass:
                                                            "set-input",
                                                          attrs: {
                                                            type: "number",
                                                            min: "0",
                                                            placeholder: "0",
                                                            disabled:
                                                              section.isViewOnly,
                                                          },
                                                          model: {
                                                            value: set.reps,
                                                            callback: function (
                                                              $$v
                                                            ) {
                                                              _vm.$set(
                                                                set,
                                                                "reps",
                                                                _vm._n($$v)
                                                              )
                                                            },
                                                            expression:
                                                              "set.reps",
                                                          },
                                                        }),
                                                      ],
                                                      1
                                                    ),
                                                    _vm._v(" "),
                                                    _c(
                                                      "td",
                                                      [
                                                        _c("b-form-input", {
                                                          staticClass:
                                                            "set-input",
                                                          attrs: {
                                                            type: "number",
                                                            min: "0",
                                                            placeholder: "0",
                                                            disabled:
                                                              section.isViewOnly,
                                                          },
                                                          model: {
                                                            value: set.rest,
                                                            callback: function (
                                                              $$v
                                                            ) {
                                                              _vm.$set(
                                                                set,
                                                                "rest",
                                                                _vm._n($$v)
                                                              )
                                                            },
                                                            expression:
                                                              "set.rest",
                                                          },
                                                        }),
                                                      ],
                                                      1
                                                    ),
                                                    _vm._v(" "),
                                                    _vm.enablePresetWeights
                                                      ? _c(
                                                          "td",
                                                          [
                                                            _c("b-form-input", {
                                                              staticClass:
                                                                "set-input",
                                                              attrs: {
                                                                type: "number",
                                                                min: "0",
                                                                step: "0.5",
                                                                placeholder:
                                                                  "0",
                                                                disabled:
                                                                  section.isViewOnly,
                                                              },
                                                              model: {
                                                                value:
                                                                  set.weight,
                                                                callback:
                                                                  function (
                                                                    $$v
                                                                  ) {
                                                                    _vm.$set(
                                                                      set,
                                                                      "weight",
                                                                      _vm._n(
                                                                        $$v
                                                                      )
                                                                    )
                                                                  },
                                                                expression:
                                                                  "set.weight",
                                                              },
                                                            }),
                                                          ],
                                                          1
                                                        )
                                                      : _vm._e(),
                                                    _vm._v(" "),
                                                    section.setsConfiguration &&
                                                    section.setsConfiguration
                                                      .length > 3 &&
                                                    !section.isViewOnly
                                                      ? _c(
                                                          "td",
                                                          [
                                                            _c(
                                                              "b-button",
                                                              {
                                                                staticClass:
                                                                  "delete-set-row-btn",
                                                                attrs: {
                                                                  variant:
                                                                    "danger",
                                                                  size: "sm",
                                                                  title:
                                                                    "Delete this set",
                                                                },
                                                                on: {
                                                                  click:
                                                                    function (
                                                                      $event
                                                                    ) {
                                                                      return _vm.deleteSetByIndex(
                                                                        section,
                                                                        setIndex
                                                                      )
                                                                    },
                                                                },
                                                              },
                                                              [
                                                                _c("i", {
                                                                  staticClass:
                                                                    "fas fa-trash",
                                                                }),
                                                              ]
                                                            ),
                                                          ],
                                                          1
                                                        )
                                                      : _vm._e(),
                                                  ]
                                                )
                                              }
                                            ),
                                            0
                                          ),
                                        ]
                                      ),
                                      _vm._v(" "),
                                      !section.isViewOnly
                                        ? _c(
                                            "div",
                                            { staticClass: "sets-actions" },
                                            [
                                              _c(
                                                "b-button",
                                                {
                                                  staticClass: "add-set-btn",
                                                  attrs: { variant: "link" },
                                                  on: {
                                                    click: function ($event) {
                                                      return _vm.addSetToSection(
                                                        section
                                                      )
                                                    },
                                                  },
                                                },
                                                [
                                                  _c("i", {
                                                    staticClass: "fas fa-plus",
                                                  }),
                                                  _vm._v(
                                                    " Add a set\n                                        "
                                                  ),
                                                ]
                                              ),
                                              _vm._v(" "),
                                              section.setsConfiguration &&
                                              section.setsConfiguration.length >
                                                3
                                                ? _c(
                                                    "b-button",
                                                    {
                                                      staticClass:
                                                        "delete-set-btn",
                                                      attrs: {
                                                        variant: "link",
                                                      },
                                                      on: {
                                                        click: function (
                                                          $event
                                                        ) {
                                                          return _vm.deleteSetFromSection(
                                                            section
                                                          )
                                                        },
                                                      },
                                                    },
                                                    [
                                                      _c("i", {
                                                        staticClass:
                                                          "fas fa-minus",
                                                      }),
                                                      _vm._v(
                                                        " Delete last set\n                                        "
                                                      ),
                                                    ]
                                                  )
                                                : _vm._e(),
                                            ],
                                            1
                                          )
                                        : _vm._e(),
                                      _vm._v(" "),
                                      section.setsConfiguration &&
                                      section.setsConfiguration.length > 3 &&
                                      !section.isViewOnly
                                        ? _c(
                                            "div",
                                            { staticClass: "sets-info-text" },
                                            [_vm._m(7, true)]
                                          )
                                        : _vm._e(),
                                    ]
                                  ),
                                  _vm._v(" "),
                                  _c(
                                    "div",
                                    { staticClass: "intensity-section" },
                                    [
                                      _c(
                                        "b-form-radio-group",
                                        {
                                          staticClass: "intensity-radio",
                                          attrs: {
                                            disabled: section.isViewOnly,
                                          },
                                          model: {
                                            value: section.intensityType,
                                            callback: function ($$v) {
                                              _vm.$set(
                                                section,
                                                "intensityType",
                                                $$v
                                              )
                                            },
                                            expression: "section.intensityType",
                                          },
                                        },
                                        [
                                          _c(
                                            "b-form-radio",
                                            { attrs: { value: "max" } },
                                            [_vm._v("Max Intensity")]
                                          ),
                                          _vm._v(" "),
                                          _c(
                                            "b-form-radio",
                                            { attrs: { value: "percentage" } },
                                            [
                                              _c(
                                                "span",
                                                {
                                                  staticClass:
                                                    "intensity-input-wrapper",
                                                },
                                                [
                                                  _c("b-form-input", {
                                                    staticClass:
                                                      "intensity-input",
                                                    attrs: {
                                                      type: "number",
                                                      min: "0",
                                                      max: "100",
                                                      placeholder: "0",
                                                      disabled:
                                                        section.isViewOnly,
                                                    },
                                                    model: {
                                                      value:
                                                        section.intensityValue,
                                                      callback: function ($$v) {
                                                        _vm.$set(
                                                          section,
                                                          "intensityValue",
                                                          _vm._n($$v)
                                                        )
                                                      },
                                                      expression:
                                                        "section.intensityValue",
                                                    },
                                                  }),
                                                  _vm._v(" "),
                                                  _c(
                                                    "span",
                                                    {
                                                      staticClass:
                                                        "intensity-label",
                                                    },
                                                    [_vm._v("%1RM")]
                                                  ),
                                                ],
                                                1
                                              ),
                                            ]
                                          ),
                                        ],
                                        1
                                      ),
                                    ],
                                    1
                                  ),
                                  _vm._v(" "),
                                  _c(
                                    "div",
                                    { staticClass: "notes-section" },
                                    [
                                      _c(
                                        "label",
                                        { staticClass: "notes-label" },
                                        [_vm._v("Notes")]
                                      ),
                                      _vm._v(" "),
                                      _c("b-form-textarea", {
                                        staticClass: "notes-textarea",
                                        attrs: {
                                          placeholder: "Write a note",
                                          rows: "4",
                                          disabled: section.isViewOnly,
                                        },
                                        model: {
                                          value: section.notes,
                                          callback: function ($$v) {
                                            _vm.$set(section, "notes", $$v)
                                          },
                                          expression: "section.notes",
                                        },
                                      }),
                                    ],
                                    1
                                  ),
                                ])
                              : _vm._e(),
                          ]),
                        ]
                      )
                    }
                  ),
                ],
                2
              ),
            ]),
            _vm._v(" "),
             false
              ? 0
              : _vm._e(),
          ]
        ),
      ]),
      _vm._v(" "),
      _c(
        "b-modal",
        {
          staticClass: "video-player-modal",
          attrs: {
            "hide-header": "",
            "hide-footer": "",
            centered: "",
            size: "md",
            "no-close-on-backdrop": "",
          },
          on: { hide: _vm.closeVideoModal },
          model: {
            value: _vm.showVideoModal,
            callback: function ($$v) {
              _vm.showVideoModal = $$v
            },
            expression: "showVideoModal",
          },
        },
        [
          _c(
            "div",
            { staticClass: "video-modal-content" },
            [
              _c(
                "button",
                {
                  staticClass: "close-video-btn",
                  on: { click: _vm.closeVideoModal },
                },
                [_c("i", { staticClass: "fas fa-times" })]
              ),
              _vm._v(" "),
              _vm.currentVideo
                ? [
                    !_vm.videoSrcToPlay
                      ? _c(
                          "div",
                          {
                            staticClass: "video-modal-placeholder",
                            on: { click: _vm.startVideoPlayback },
                          },
                          [
                            _c("div", {
                              staticClass: "video-modal-poster",
                              style: _vm.posterStyle,
                            }),
                            _vm._v(" "),
                            _c(
                              "button",
                              {
                                staticClass: "video-modal-play-btn",
                                attrs: { "aria-label": "Play video" },
                              },
                              [_c("i", { staticClass: "fas fa-play" })]
                            ),
                            _vm._v(" "),
                            _c(
                              "span",
                              { staticClass: "video-modal-exercise-name" },
                              [_vm._v(_vm._s(_vm.currentVideo.name))]
                            ),
                          ]
                        )
                      : _vm._e(),
                    _vm._v(" "),
                    _c("video", {
                      directives: [
                        {
                          name: "show",
                          rawName: "v-show",
                          value: _vm.videoSrcToPlay,
                          expression: "videoSrcToPlay",
                        },
                      ],
                      key: _vm.videoSrcToPlay,
                      ref: "exerciseVideoPlayer",
                      staticClass: "exercise-video-modal",
                      attrs: { src: _vm.videoSrcToPlay, loop: "", muted: "" },
                      domProps: { muted: true },
                      on: {
                        error: _vm.handleVideoModalError,
                        loadeddata: _vm.onVideoLoadedData,
                      },
                    }),
                  ]
                : _vm._e(),
            ],
            2
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
        _c("i", { staticClass: "fas fa-dumbbell" }),
        _vm._v(
          "\n                            Workout Editor\n                        "
        ),
      ]
    )
  },
  function () {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("h3", [
      _c("i", { staticClass: "fas fa-calendar-alt mr-2" }),
      _vm._v("Training Plan "),
      _c("span", { staticClass: "header-subtitle" }, [
        _vm._v("- Create weekly training schedules"),
      ]),
    ])
  },
  function () {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("small", { staticClass: "d-block mt-1 text-muted" }, [
      _vm._v("If thumbnails are missing, run: "),
      _c("code", [_vm._v("php artisan videos:generate-thumbnails")]),
    ])
  },
  function () {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "summary-header" }, [
      _c("h6", [_vm._v("Selected Days:")]),
    ])
  },
  function () {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("h3", { staticStyle: { margin: "0" } }, [
      _c("i", { staticClass: "fas fa-dumbbell mr-2" }),
      _vm._v("\n                    Exercises \n                    "),
      _c("span", { staticClass: "header-subtitle" }, [
        _vm._v("- Browse and select exercises for your workout"),
      ]),
    ])
  },
  function () {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "column-header" }, [
      _c("h3", [
        _c("i", { staticClass: "fas fa-edit mr-2" }),
        _vm._v("Workout Builder "),
        _c("span", { staticClass: "header-subtitle" }, [
          _vm._v("- Drag and drop exercises to build your routine"),
        ]),
      ]),
    ])
  },
  function () {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "section-header" }, [
      _c("h4", [_vm._v("Workout Sections")]),
    ])
  },
  function () {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("small", { staticClass: "text-muted" }, [
      _c("i", { staticClass: "fas fa-info-circle" }),
      _vm._v(
        "\n                                            To delete a set below 3, set the Reps(x) to 0. The set will disappear next time you load the exercise.\n                                        "
      ),
    ])
  },
  function () {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "loading-state" }, [
      _c("i", { staticClass: "fas fa-spinner fa-spin loading-icon" }),
      _vm._v(" "),
      _c("p", [_vm._v("Loading saved workout plans...")]),
    ])
  },
  function () {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "empty-state" }, [
      _c("i", { staticClass: "fas fa-calendar-times empty-icon" }),
      _vm._v(" "),
      _c("h5", [_vm._v("No saved workout plans")]),
      _vm._v(" "),
      _c("p", [_vm._v("Save a workout plan to see it here")]),
    ])
  },
]
render._withStripped = true



/***/ })

}]);