"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["resources_src_views_app_pages_Workout_ActivityList_vue"],{

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/components/ActivityModal.vue?vue&type=script&lang=js":
/*!********************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/components/ActivityModal.vue?vue&type=script&lang=js ***!
  \********************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! axios */ "./node_modules/axios/index.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _VideoPlayerModal_vue__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./VideoPlayerModal.vue */ "./resources/src/components/VideoPlayerModal.vue");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
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
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_defineProperty(_defineProperty(_defineProperty(_defineProperty({
  components: {
    VideoPlayerModal: _VideoPlayerModal_vue__WEBPACK_IMPORTED_MODULE_1__["default"]
  },
  props: {
    visible: Boolean,
    initialWorkout: {
      type: Object,
      "default": null
    }
  },
  data: function data() {
    return {
      currentStep: 0,
      steps: [{
        label: "Basic Info & Details"
      }, {
        label: "Exercise Setup & Advanced"
      }],
      form: {
        name: "",
        // Changed from exercise_name to match template
        category: null,
        duration: null,
        level: "Beginner",
        calories: null,
        // Changed from calories_burned to match template
        description: "",
        instructions: "",
        equipment: "",
        muscles_targeted: "",
        difficulty: 1,
        // Added default value
        rest_period: null,
        tags: "",
        video_link: "",
        // Additional fields used in template
        visibleFor: null,
        primaryMuscleGroups: [],
        secondaryMuscleGroups: [],
        primaryJoint: null,
        type: null,
        usesWeights: false,
        intensity: null,
        sets: [{
          reps: 0,
          pause: 0
        }, {
          reps: 0,
          pause: 0
        }, {
          reps: 0,
          pause: 0
        }],
        restPeriod: null,
        // Added for template
        qrLink: "",
        manufacturer: null
      },
      categories: [{
        value: "full-body",
        text: "Full Body "
      }, {
        value: "upper-body",
        text: "Upper Body"
      }, {
        value: "lower-body",
        text: "Lower Body"
      }, {
        value: "core",
        text: "Core"
      }, {
        value: "flexibility",
        text: "Flexibility"
      }, {
        value: "cardio",
        text: "Cardio"
      }, {
        value: "strength",
        text: "Strength"
      }, {
        value: "yoga",
        text: "Yoga"
      }],
      levels: [{
        value: "Beginner",
        text: "Beginner"
      }, {
        value: "Intermediate",
        text: "Intermediate"
      }, {
        value: "Advanced",
        text: "Advanced"
      }],
      // Additional options for template
      visibleForOptions: [{
        value: null,
        text: "Select visibility"
      }, {
        value: "all",
        text: "All Members"
      }, {
        value: "premium",
        text: "Premium Members"
      }, {
        value: "trainers",
        text: "Trainers Only"
      }],
      muscleGroupOptions: [{
        value: "chest",
        text: "Chest"
      }, {
        value: "back",
        text: "Back"
      }, {
        value: "shoulders",
        text: "Shoulders"
      }, {
        value: "biceps",
        text: "Biceps"
      }, {
        value: "triceps",
        text: "Triceps"
      }, {
        value: "forearms",
        text: "Forearms"
      }, {
        value: "abs",
        text: "Abs"
      }, {
        value: "obliques",
        text: "Obliques"
      }, {
        value: "quads",
        text: "Quadriceps"
      }, {
        value: "hamstrings",
        text: "Hamstrings"
      }, {
        value: "calves",
        text: "Calves"
      }, {
        value: "glutes",
        text: "Glutes"
      }],
      jointOptions: [{
        value: "shoulder",
        text: "Shoulder"
      }, {
        value: "elbow",
        text: "Elbow"
      }, {
        value: "wrist",
        text: "Wrist"
      }, {
        value: "hip",
        text: "Hip"
      }, {
        value: "knee",
        text: "Knee"
      }, {
        value: "ankle",
        text: "Ankle"
      }, {
        value: "spine",
        text: "Spine"
      }],
      typeOptions: [{
        value: null,
        text: "Select exercise type"
      }, {
        value: "Set based",
        text: "Set based"
      }, {
        value: "Repetition-based",
        text: "Repetition-based"
      }, {
        value: "Time-based",
        text: "Time-based"
      }, {
        value: "Distance-based",
        text: "Distance-based"
      }],
      manufacturerOptions: [{
        value: null,
        text: "Select manufacturer"
      }, {
        value: "generic",
        text: "Generic"
      }, {
        value: "nike",
        text: "Nike"
      }, {
        value: "adidas",
        text: "Adidas"
      }, {
        value: "reebok",
        text: "Reebok"
      }, {
        value: "under_armour",
        text: "Under Armour"
      }],
      thumbnailUrl: null,
      videoUrl: null,
      loading: false,
      // Video selection properties
      videoSelectionMode: 'uploaded',
      // 'uploaded' or 'custom'
      availableVideos: [],
      selectedVideo: null,
      loadingVideos: false,
      availableVideoFilters: {},
      selectedVideoFilters: {},
      generatedThumbnailBlob: null,
      // Video player modal properties
      showVideoPlayer: false,
      selectedVideoForPlayback: null,
      // Enhanced filtering
      videoSearchQuery: ''
    };
  },
  computed: {
    difficultyLabel: function difficultyLabel() {
      var difficulty = this.form.difficulty || 1;
      if (difficulty <= 2) return "Very Easy";
      if (difficulty <= 4) return "Easy";
      if (difficulty <= 6) return "Moderate";
      if (difficulty <= 8) return "Hard";
      return "Very Hard";
    }
  }
}, "computed", {
  modalTitle: function modalTitle() {
    return this.initialWorkout && this.initialWorkout.exercise_id ? "Edit Activity: ".concat(this.initialWorkout.exercise_name || this.initialWorkout.name || 'Untitled') : 'Create New Activity';
  },
  filteredVideoFilters: function filteredVideoFilters() {
    var _this = this;
    // Only show Category, Body part, and Level filters
    var allowedFilters = ['Category', 'Body part', 'Level'];
    var filtered = {};
    Object.keys(this.availableVideoFilters).forEach(function (key) {
      if (allowedFilters.includes(key)) {
        filtered[key] = _this.availableVideoFilters[key];
      }
    });
    return filtered;
  },
  enhancedVideoFilters: function enhancedVideoFilters() {
    // Enhanced filters with more options
    var filters = {};

    // Add category filters based on video paths
    var categories = new Set();
    var bodyParts = new Set();
    var levels = new Set();
    this.availableVideos.forEach(function (video) {
      // Extract category from path
      var pathParts = video.path.split('/');
      if (pathParts.length > 1) {
        categories.add(pathParts[0]);
      }
      if (pathParts.length > 2) {
        bodyParts.add(pathParts[1]);
      }

      // Add existing meta filters
      if (video.meta) {
        if (video.meta.Category) categories.add(video.meta.Category);
        if (video.meta['Body part']) bodyParts.add(video.meta['Body part']);
        if (video.meta.Level) levels.add(video.meta.Level);
      }
    });
    if (categories.size > 0) {
      filters['Category'] = Array.from(categories).sort();
    }
    if (bodyParts.size > 0) {
      filters['Body Part'] = Array.from(bodyParts).sort();
    }
    if (levels.size > 0) {
      filters['Level'] = Array.from(levels).sort();
    }

    // Add file size filter
    filters['File Size'] = ['Small (< 10MB)', 'Medium (10-50MB)', 'Large (> 50MB)'];
    return filters;
  },
  filteredAvailableVideos: function filteredAvailableVideos() {
    try {
      // Apply selectedVideoFilters to availableVideos meta
      var videos = Array.isArray(this.availableVideos) ? this.availableVideos : [];
      var filters = this.selectedVideoFilters || {};
      var searchQuery = this.videoSearchQuery || '';

      // Apply search filter first
      var filtered = videos;
      if (searchQuery.trim()) {
        var query = searchQuery.toLowerCase();
        filtered = videos.filter(function (video) {
          return video.name.toLowerCase().includes(query) || video.filename.toLowerCase().includes(query) || video.meta && Object.values(video.meta).some(function (value) {
            return value.toString().toLowerCase().includes(query);
          });
        });
      }

      // Apply category filters
      var activeFilters = Object.keys(filters).filter(function (k) {
        return filters[k];
      });
      if (activeFilters.length > 0) {
        filtered = filtered.filter(function (video) {
          return activeFilters.every(function (filterKey) {
            var filterValue = filters[filterKey];
            if (!filterValue) return true;

            // Handle different filter types
            if (filterKey === 'Category') {
              var pathParts = video.path.split('/');
              return pathParts[0] === filterValue || video.meta && video.meta.Category === filterValue;
            }
            if (filterKey === 'Body Part') {
              var _pathParts = video.path.split('/');
              return _pathParts[1] === filterValue || video.meta && video.meta['Body part'] === filterValue;
            }
            if (filterKey === 'Level') {
              return video.meta && video.meta.Level === filterValue;
            }
            if (filterKey === 'File Size') {
              var sizeMB = video.size / (1024 * 1024);
              if (filterValue === 'Small (< 10MB)') return sizeMB < 10;
              if (filterValue === 'Medium (10-50MB)') return sizeMB >= 10 && sizeMB <= 50;
              if (filterValue === 'Large (> 50MB)') return sizeMB > 50;
            }

            // Default meta matching
            var meta = video.meta || {};
            var have = (meta[filterKey] || '').toString();
            return have === filterValue;
          });
        });
      }
      return filtered;
    } catch (error) {
      console.error('Error filtering videos:', error);
      return [];
    }
  }
}), "watch", {
  initialWorkout: {
    immediate: true,
    handler: function handler(newVal) {
      if (newVal) {
        this.form = _objectSpread(_objectSpread({}, this.form), {}, {
          name: newVal.exercise_name || newVal.name || "",
          category: newVal.category,
          duration: newVal.duration,
          level: newVal.level || "Beginner",
          calories: newVal.calories_burned || newVal.calories,
          description: newVal.description,
          instructions: newVal.instructions,
          equipment: newVal.equipment,
          muscles_targeted: newVal.muscles_targeted || newVal.muscleGroups || "",
          difficulty: newVal.difficulty || 1,
          rest_period: newVal.rest_period || newVal.restPeriod,
          tags: newVal.tags,
          video_link: newVal.video_link || newVal.videoLink || "",
          // Map new fields
          visibleFor: newVal.visible_for,
          primaryMuscleGroups: newVal.primary_muscle_groups || [],
          secondaryMuscleGroups: newVal.secondary_muscle_groups || [],
          primaryJoint: newVal.primary_joint,
          type: newVal.type,
          usesWeights: newVal.uses_weights || false,
          intensity: newVal.intensity,
          sets: newVal.sets || newVal.sets_configuration || [{
            reps: 0,
            pause: 0
          }, {
            reps: 0,
            pause: 0
          }, {
            reps: 0,
            pause: 0
          }],
          restPeriod: newVal.rest_period_seconds,
          qrLink: newVal.qr_link,
          manufacturer: newVal.manufacturer
        });
        // Handle thumbnail path correctly - if it's already a full path, use it; otherwise add leading slash
        if (newVal.thumbnail) {
          this.thumbnailUrl = newVal.thumbnail.startsWith('/') ? newVal.thumbnail : '/' + newVal.thumbnail;
        } else {
          this.thumbnailUrl = '';
        }
        this.videoUrl = newVal.video || null;
      } else {
        this.resetForm();
        this.thumbnailUrl = '';
      }
    }
  },
  visible: function visible(val) {
    if (!val) {
      this.resetForm();
    } else {
      // Ensure videos load when modal becomes visible
      if (!this.loadingVideos && (!this.availableVideos || !Array.isArray(this.availableVideos) || this.availableVideos.length === 0)) {
        this.loadAvailableVideos();
      }
    }
  }
}), "methods", {
  // Step navigation methods
  nextStep: function nextStep() {
    if (this.currentStep < this.steps.length - 1) {
      this.currentStep++;
    }
  },
  previousStep: function previousStep() {
    if (this.currentStep > 0) {
      this.currentStep--;
    }
  },
  goToStep: function goToStep(stepIndex) {
    if (stepIndex >= 0 && stepIndex < this.steps.length) {
      this.currentStep = stepIndex;
    }
  },
  applyVideoFilters: function applyVideoFilters() {
    // Trigger recompute; v-model already updates selectedVideoFilters
  },
  clearVideoFilters: function clearVideoFilters() {
    this.selectedVideoFilters = {};
    this.videoSearchQuery = '';
  },
  updateDifficultyLabel: function updateDifficultyLabel() {
    // This method is called by the difficulty slider input event
    // The computed property difficultyLabel will automatically update
  },
  previewVideo: function previewVideo(event) {
    var file = event.target.files[0];
    if (file) {
      this.videoUrl = URL.createObjectURL(file);
    }
  },
  removeVideo: function removeVideo() {
    this.videoUrl = null;
    if (this.$refs.videoInput) {
      this.$refs.videoInput.value = null;
    }
  },
  previewThumbnail: function previewThumbnail(event) {
    var file = event.target.files[0];
    if (file) {
      this.thumbnailUrl = URL.createObjectURL(file);
    }
  },
  removeThumbnail: function removeThumbnail() {
    this.thumbnailUrl = null;
    if (this.$refs.thumbnailInput) {
      this.$refs.thumbnailInput.value = null;
    }
  },
  // Video selection methods
  loadAvailableVideos: function loadAvailableVideos() {
    var _this2 = this;
    return _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
      var response;
      return _regeneratorRuntime().wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _this2.loadingVideos = true;
            console.log('Loading available videos...');
            _context.next = 5;
            return axios__WEBPACK_IMPORTED_MODULE_0___default().get('workout_exercises/available-videos');
          case 5:
            response = _context.sent;
            console.log('API response:', response.data);
            if (response.data.success) {
              _this2.availableVideos = response.data.videos || [];
              _this2.availableVideoFilters = response.data.filters || {};
              console.log('Loaded videos:', _this2.availableVideos);
              console.log('Loaded filters:', _this2.availableVideoFilters);
            } else {
              console.log('API returned success: false');
              _this2.availableVideos = [];
              _this2.availableVideoFilters = {};
            }
            _context.next = 16;
            break;
          case 10:
            _context.prev = 10;
            _context.t0 = _context["catch"](0);
            console.error('Error loading videos:', _context.t0);
            _this2.$bvToast.toast('Failed to load videos', {
              title: 'Error',
              variant: 'danger',
              solid: true
            });
            _this2.availableVideos = [];
            _this2.availableVideoFilters = {};
          case 16:
            _context.prev = 16;
            _this2.loadingVideos = false;
            return _context.finish(16);
          case 19:
          case "end":
            return _context.stop();
        }
      }, _callee, null, [[0, 10, 16, 19]]);
    }))();
  },
  // Debug method to force computed property evaluation
  debugFilteredVideos: function debugFilteredVideos() {
    console.log('Manually calling filteredAvailableVideos...');
    var result = this.filteredAvailableVideos;
    console.log('Manual call result:', result);
    return result;
  },
  selectVideo: function selectVideo(video) {
    var _this3 = this;
    return _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee2() {
      var url, dataUrl;
      return _regeneratorRuntime().wrap(function _callee2$(_context2) {
        while (1) switch (_context2.prev = _context2.next) {
          case 0:
            _this3.selectedVideo = video;
            _this3.form.video_link = video.url;
            _this3.videoSelectionMode = 'uploaded';

            // If thumbnail exists, use it; otherwise generate one from video
            if (!video.thumbnail_url) {
              _context2.next = 7;
              break;
            }
            _this3.thumbnailUrl = video.thumbnail_url;
            _context2.next = 17;
            break;
          case 7:
            _context2.prev = 7;
            url = video.url;
            _context2.next = 11;
            return _this3.generateVideoThumbnail(url);
          case 11:
            dataUrl = _context2.sent;
            if (dataUrl) {
              _this3.thumbnailUrl = dataUrl;
              // Convert dataURL to Blob for upload on submit
              _this3.generatedThumbnailBlob = _this3.dataURLtoBlob(dataUrl);
            }
            _context2.next = 17;
            break;
          case 15:
            _context2.prev = 15;
            _context2.t0 = _context2["catch"](7);
          case 17:
          case "end":
            return _context2.stop();
        }
      }, _callee2, null, [[7, 15]]);
    }))();
  },
  playVideo: function playVideo(video) {
    // Open video in a modal for playback
    this.selectedVideoForPlayback = video;
    this.showVideoPlayer = true;
  },
  closeVideoPlayer: function closeVideoPlayer() {
    this.showVideoPlayer = false;
    this.selectedVideoForPlayback = null;
  },
  formatFileSize: function formatFileSize(bytes) {
    if (bytes === 0) return '0 Bytes';
    var k = 1024;
    var sizes = ['Bytes', 'KB', 'MB', 'GB'];
    var i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  },
  onVideoLoaded: function onVideoLoaded(event) {
    // Video metadata loaded successfully
  },
  generateVideoThumbnail: function generateVideoThumbnail(srcUrl) {
    return _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee3() {
      return _regeneratorRuntime().wrap(function _callee3$(_context3) {
        while (1) switch (_context3.prev = _context3.next) {
          case 0:
            return _context3.abrupt("return", new Promise(function (resolve) {
              var video = document.createElement('video');
              video.src = srcUrl;
              video.crossOrigin = 'anonymous';
              video.muted = true;
              var onCapture = function onCapture() {
                var canvas = document.createElement('canvas');
                canvas.width = video.videoWidth;
                canvas.height = video.videoHeight;
                var ctx = canvas.getContext('2d');
                ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
                var dataUrl = canvas.toDataURL('image/jpeg', 0.75);
                cleanup();
                resolve(dataUrl);
              };
              var onLoaded = function onLoaded() {
                // seek a bit forward to ensure frame is available
                try {
                  video.currentTime = Math.min(0.1, (video.duration || 1) * 0.01);
                } catch (e) {
                  // fallback to capture immediately
                  onCapture();
                }
              };
              var onSeeked = function onSeeked() {
                return onCapture();
              };
              var onError = function onError() {
                cleanup();
                resolve(null);
              };
              var cleanup = function cleanup() {
                video.removeEventListener('loadeddata', onLoaded);
                video.removeEventListener('seeked', onSeeked);
                video.removeEventListener('error', onError);
              };
              video.addEventListener('loadeddata', onLoaded, {
                once: true
              });
              video.addEventListener('seeked', onSeeked, {
                once: true
              });
              video.addEventListener('error', onError, {
                once: true
              });
            }));
          case 1:
          case "end":
            return _context3.stop();
        }
      }, _callee3);
    }))();
  },
  dataURLtoBlob: function dataURLtoBlob(dataUrl) {
    var arr = dataUrl.split(',');
    var mime = arr[0].match(/:(.*?);/)[1];
    var bstr = atob(arr[1]);
    var n = bstr.length;
    var u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], {
      type: mime
    });
  },
  handleSubmit: function handleSubmit() {
    var _this4 = this;
    return _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee4() {
      var formData, _this4$selectedVideo, thumbnailPath, isUpdate, url, response, message, _error$response, _isUpdate, errorMessage;
      return _regeneratorRuntime().wrap(function _callee4$(_context4) {
        while (1) switch (_context4.prev = _context4.next) {
          case 0:
            _context4.prev = 0;
            _this4.loading = true;

            // Create FormData for file upload
            formData = new FormData(); // Add text fields
            formData.append('exercise_name', _this4.form.name);
            formData.append('category', _this4.form.category);
            formData.append('duration', _this4.form.duration);
            formData.append('level', _this4.form.level);
            formData.append('description', _this4.form.description);
            formData.append('equipment', _this4.form.equipment || '');
            formData.append('muscles_targeted', _this4.form.muscles_targeted || '');
            formData.append('video_link', _this4.form.video_link || '');
            formData.append('calories_burned', _this4.form.calories || 0);
            formData.append('instructions', _this4.form.instructions || '');
            formData.append('difficulty', _this4.form.difficulty || 1);
            formData.append('rest_period', _this4.form.rest_period || 30);
            formData.append('tags', _this4.form.tags || '');
            formData.append('visible_for', _this4.form.visibleFor || 'all');
            // Handle arrays properly for FormData
            if (_this4.form.primaryMuscleGroups && _this4.form.primaryMuscleGroups.length > 0) {
              _this4.form.primaryMuscleGroups.forEach(function (muscle, index) {
                formData.append("primary_muscle_groups[".concat(index, "]"), muscle);
              });
            }
            if (_this4.form.secondaryMuscleGroups && _this4.form.secondaryMuscleGroups.length > 0) {
              _this4.form.secondaryMuscleGroups.forEach(function (muscle, index) {
                formData.append("secondary_muscle_groups[".concat(index, "]"), muscle);
              });
            }
            formData.append('primary_joint', _this4.form.primaryJoint || '');
            formData.append('type', _this4.form.type || '');
            formData.append('uses_weights', _this4.form.usesWeights || false);
            formData.append('intensity', _this4.form.intensity || 5);
            formData.append('sets', JSON.stringify(_this4.form.sets || []));
            formData.append('rest_period_seconds', _this4.form.restPeriod || 30);
            formData.append('qr_link', _this4.form.qrLink || '');
            formData.append('manufacturer', _this4.form.manufacturer || '');

            // Handle thumbnail - either new file, generated from selected video, or existing path
            if (_this4.$refs.thumbnailInput && _this4.$refs.thumbnailInput.files[0]) {
              // New file selected
              formData.append('thumbnail', _this4.$refs.thumbnailInput.files[0]);
            } else if (_this4.generatedThumbnailBlob) {
              formData.append('thumbnail', _this4.generatedThumbnailBlob, (((_this4$selectedVideo = _this4.selectedVideo) === null || _this4$selectedVideo === void 0 ? void 0 : _this4$selectedVideo.name) || 'video') + '.jpg');
            } else if (_this4.thumbnailUrl && !_this4.thumbnailUrl.startsWith('blob:')) {
              // Existing thumbnail - send the path (remove leading slash if present)
              thumbnailPath = _this4.thumbnailUrl.startsWith('/') ? _this4.thumbnailUrl.substring(1) : _this4.thumbnailUrl;
              formData.append('thumbnail_path', thumbnailPath);
            }

            // Determine if this is a create or update operation
            isUpdate = _this4.initialWorkout && _this4.initialWorkout.exercise_id;
            url = isUpdate ? "workout_exercises/".concat(_this4.initialWorkout.exercise_id) : 'workout_exercises';
            if (!isUpdate) {
              _context4.next = 37;
              break;
            }
            // For updates, use POST with _method=PUT (Laravel convention)
            formData.append('_method', 'PUT');
            _context4.next = 34;
            return axios__WEBPACK_IMPORTED_MODULE_0___default().post(url, formData, {
              headers: {
                'Content-Type': 'multipart/form-data'
              }
            });
          case 34:
            response = _context4.sent;
            _context4.next = 40;
            break;
          case 37:
            _context4.next = 39;
            return axios__WEBPACK_IMPORTED_MODULE_0___default().post(url, formData, {
              headers: {
                'Content-Type': 'multipart/form-data'
              }
            });
          case 39:
            response = _context4.sent;
          case 40:
            if (response.data.success) {
              // Show success message
              message = isUpdate ? 'Workout updated successfully!' : 'Workout created successfully!';
              _this4.$swal({
                icon: 'success',
                title: 'Success!',
                text: message,
                timer: 2000,
                showConfirmButton: false
              });

              // Emit the created workout data
              _this4.$emit("submit", response.data);

              // Close modal
              _this4.$emit("close");

              // Reset form
              _this4.resetForm();
            }
            _context4.next = 49;
            break;
          case 43:
            _context4.prev = 43;
            _context4.t0 = _context4["catch"](0);
            console.error('Error creating workout:', _context4.t0);

            // Show error message
            _isUpdate = _this4.initialWorkout && _this4.initialWorkout.exercise_id;
            errorMessage = _isUpdate ? 'Failed to update workout. Please try again.' : 'Failed to create workout. Please try again.';
            _this4.$swal({
              icon: 'error',
              title: 'Error!',
              text: ((_error$response = _context4.t0.response) === null || _error$response === void 0 || (_error$response = _error$response.data) === null || _error$response === void 0 ? void 0 : _error$response.message) || errorMessage
            });
          case 49:
            _context4.prev = 49;
            _this4.loading = false;
            return _context4.finish(49);
          case 52:
          case "end":
            return _context4.stop();
        }
      }, _callee4, null, [[0, 43, 49, 52]]);
    }))();
  },
  addWorkout: function addWorkout(newWorkout) {
    this.$emit("add-workout", newWorkout);
  },
  resetForm: function resetForm() {
    this.form = {
      name: "",
      category: null,
      duration: null,
      level: "Beginner",
      calories: null,
      description: "",
      instructions: "",
      equipment: "",
      muscles_targeted: "",
      difficulty: 1,
      rest_period: null,
      tags: "",
      video_link: "",
      visibleFor: null,
      primaryMuscleGroups: [],
      secondaryMuscleGroups: [],
      primaryJoint: null,
      type: null,
      usesWeights: false,
      intensity: null,
      sets: [{
        reps: 0,
        pause: 0
      }, {
        reps: 0,
        pause: 0
      }, {
        reps: 0,
        pause: 0
      }],
      restPeriod: null,
      qrLink: "",
      manufacturer: null
    };
    this.thumbnailUrl = '';
    this.videoUrl = null;
    this.currentStep = 0;
    this.videoSelectionMode = 'uploaded';
    this.selectedVideo = null;
    this.availableVideoFilters = {};
    this.selectedVideoFilters = {};
    this.generatedThumbnailBlob = null;
    this.showVideoPlayer = false;
    this.selectedVideoForPlayback = null;
    this.videoSearchQuery = '';
    if (this.$refs.thumbnailInput) this.$refs.thumbnailInput.value = null;
    if (this.$refs.videoInput) this.$refs.videoInput.value = null;
  }
}), "mounted", function mounted() {
  var _this5 = this;
  // Load available videos when component is mounted
  this.loadAvailableVideos();

  // Debug: Force computed property evaluation after a delay
  setTimeout(function () {
    console.log('=== DEBUG: Forcing computed property evaluation ===');
    _this5.debugFilteredVideos();
  }, 2000);
}));

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/components/VideoPlayerModal.vue?vue&type=script&lang=js":
/*!***********************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/components/VideoPlayerModal.vue?vue&type=script&lang=js ***!
  \***********************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
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

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_defineProperty(_defineProperty({
  name: 'VideoPlayerModal',
  props: {
    visible: {
      type: Boolean,
      "default": false
    },
    video: {
      type: Object,
      "default": null
    }
  },
  data: function data() {
    return {
      isLoading: true,
      error: null
    };
  },
  watch: {
    visible: function visible(newVal) {
      if (newVal && this.video) {
        this.isLoading = true;
        this.error = null;
      }
    },
    video: function video() {
      if (this.video) {
        this.isLoading = true;
        this.error = null;
      }
    }
  },
  mounted: function mounted() {
    var _this = this;
    if (this.video && this.visible) {
      this.$nextTick(function () {
        _this.forceVideoLoad();
      });
    }
  }
}, "watch", {
  video: {
    handler: function handler(newVideo) {
      if (newVideo) {
        // Reset loading state when video changes
        this.isLoading = true;
        this.error = null;
      }
    },
    immediate: true
  },
  visible: {
    handler: function handler(isVisible) {
      var _this2 = this;
      if (isVisible && this.video) {
        this.isLoading = true;
        this.error = null;
        // Force video element to load
        this.$nextTick(function () {
          _this2.forceVideoLoad();
        });
      }
    }
  }
}), "methods", {
  forceVideoLoad: function forceVideoLoad() {
    var videoElement = this.$el.querySelector('video');
    if (videoElement) {
      videoElement.src = this.video.url;
      videoElement.load();
    }
  },
  onVideoLoadStart: function onVideoLoadStart() {
    this.isLoading = true;
    this.error = null;
  },
  onVideoCanPlay: function onVideoCanPlay() {
    this.isLoading = false;
    this.error = null;
  },
  handleVideoError: function handleVideoError(event) {
    this.isLoading = false;
    this.error = 'Failed to load video. Please check the file path and try again.';
  },
  onVideoLoaded: function onVideoLoaded() {
    this.isLoading = false;
    this.error = null;
  },
  formatFileSize: function formatFileSize(bytes) {
    if (bytes === 0) return '0 Bytes';
    var k = 1024;
    var sizes = ['Bytes', 'KB', 'MB', 'GB'];
    var i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }
}));

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/components/WorkoutModal.vue?vue&type=script&lang=js":
/*!*******************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/components/WorkoutModal.vue?vue&type=script&lang=js ***!
  \*******************************************************************************************************************************************************************************************************/
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
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
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
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
  props: {
    visible: Boolean,
    initialWorkout: {
      type: Object,
      "default": null
    },
    selectedActivities: {
      type: Array,
      "default": function _default() {
        return [];
      }
    }
  },
  data: function data() {
    return {
      form: {
        exercise_name: "New Workout",
        category: "full-body",
        duration: 15,
        level: "Beginner",
        calories_burned: 100,
        description: "A comprehensive workout designed to maximize your fitness potential. This routine targets multiple muscle groups and energy systems to help you achieve your fitness goals efficiently.",
        instructions: "1. Warm up for 5 minutes with light cardio\n2. Perform each exercise with proper form\n3. Rest 30-60 seconds between sets\n4. Complete all sets before moving to the next exercise\n5. Cool down with stretching after completing the workout",
        equipment: [],
        muscles_targeted: [],
        difficulty: 5,
        rest_period: null,
        tags: "",
        video_link: "",
        type: "Set based",
        goal: "Lose Weight",
        sets: [{
          reps: 0,
          pause: 0
        }, {
          reps: 0,
          pause: 0
        }, {
          reps: 0,
          pause: 0
        }],
        // Settings fields
        days_per_week: "3 days/week",
        repeat: "1x",
        rest_seconds: null,
        default_reps: [null, null, null, null, null, null, null, null, null],
        enable_preset_weights: false
      },
      categories: [{
        value: "full-body",
        text: "Full Body"
      }, {
        value: "upper-body",
        text: "Upper Body"
      }, {
        value: "lower-body",
        text: "Lower Body"
      }, {
        value: "core",
        text: "Core"
      }, {
        value: "flexibility",
        text: "Flexibility"
      }, {
        value: "cardio",
        text: "Cardio"
      }, {
        value: "strength",
        text: "Strength"
      }, {
        value: "yoga",
        text: "Yoga"
      },
      // Mobile app categories
      {
        value: "General",
        text: "General"
      }, {
        value: "HIIT",
        text: "HIIT"
      }, {
        value: "Mobility",
        text: "Mobility"
      }],
      levels: [{
        value: "Beginner",
        text: "Beginner"
      }, {
        value: "Intermediate",
        text: "Intermediate"
      }, {
        value: "Advanced",
        text: "Advanced"
      }],
      typeOptions: [{
        value: "Set based",
        text: "Set based"
      }, {
        value: "Repetition-based",
        text: "Repetition-based"
      }, {
        value: "Time-based",
        text: "Time-based"
      }, {
        value: "Distance-based",
        text: "Distance-based"
      }],
      goalOptions: [{
        value: "Lose Weight",
        text: "Lose Weight"
      }, {
        value: "Build Muscle",
        text: "Build Muscle"
      }, {
        value: "Get Fit",
        text: "Get Fit"
      }, {
        value: "Increase Strength",
        text: "Increase Strength"
      }, {
        value: "Improve Endurance",
        text: "Improve Endurance"
      }, {
        value: "Tone Body",
        text: "Tone Body"
      }, {
        value: "Flexibility",
        text: "Flexibility"
      }, {
        value: "General Fitness",
        text: "General Fitness"
      }],
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
      daysPerWeekOptions: [{
        value: "1 day/week",
        text: "1 day/week"
      }, {
        value: "2 days/week",
        text: "2 days/week"
      }, {
        value: "3 days/week",
        text: "3 days/week"
      }, {
        value: "4 days/week",
        text: "4 days/week"
      }, {
        value: "5 days/week",
        text: "5 days/week"
      }, {
        value: "6 days/week",
        text: "6 days/week"
      }, {
        value: "7 days/week",
        text: "7 days/week"
      }],
      repeatOptions: [{
        value: "1x",
        text: "1x"
      }, {
        value: "2x",
        text: "2x"
      }, {
        value: "3x",
        text: "3x"
      }, {
        value: "4x",
        text: "4x"
      }, {
        value: "5x",
        text: "5x"
      }, {
        value: "6x",
        text: "6x"
      }, {
        value: "7x",
        text: "7x"
      }, {
        value: "8x",
        text: "8x"
      }, {
        value: "9x",
        text: "9x"
      }, {
        value: "10x",
        text: "10x"
      }, {
        value: "11x",
        text: "11x"
      }, {
        value: "12x",
        text: "12x"
      }, {
        value: "13x",
        text: "13x"
      }, {
        value: "14x",
        text: "14x"
      }, {
        value: "15x",
        text: "15x"
      }, {
        value: "16x",
        text: "16x"
      }, {
        value: "17x",
        text: "17x"
      }, {
        value: "18x",
        text: "18x"
      }, {
        value: "19x",
        text: "19x"
      }, {
        value: "20x",
        text: "20x"
      }],
      equipmentOptions: [{
        value: "Dumbbells",
        text: "Dumbbells"
      }, {
        value: "Resistance Bands",
        text: "Resistance Bands"
      }, {
        value: "Yoga Mat",
        text: "Yoga Mat"
      }, {
        value: "Barbell",
        text: "Barbell"
      }, {
        value: "Kettlebell",
        text: "Kettlebell"
      }, {
        value: "Pull-up Bar",
        text: "Pull-up Bar"
      }, {
        value: "Medicine Ball",
        text: "Medicine Ball"
      }, {
        value: "TRX Suspension Trainer",
        text: "TRX Suspension Trainer"
      }, {
        value: "Foam Roller",
        text: "Foam Roller"
      }, {
        value: "Exercise Ball",
        text: "Exercise Ball"
      }, {
        value: "Jump Rope",
        text: "Jump Rope"
      }, {
        value: "Bench",
        text: "Bench"
      }, {
        value: "Cable Machine",
        text: "Cable Machine"
      }, {
        value: "Smith Machine",
        text: "Smith Machine"
      }, {
        value: "Leg Press Machine",
        text: "Leg Press Machine"
      }, {
        value: "Lat Pulldown Machine",
        text: "Lat Pulldown Machine"
      }, {
        value: "Chest Press Machine",
        text: "Chest Press Machine"
      }, {
        value: "Treadmill",
        text: "Treadmill"
      }, {
        value: "Elliptical",
        text: "Elliptical"
      }, {
        value: "Stationary Bike",
        text: "Stationary Bike"
      }, {
        value: "Rowing Machine",
        text: "Rowing Machine"
      }, {
        value: "Stair Climber",
        text: "Stair Climber"
      }, {
        value: "Battle Ropes",
        text: "Battle Ropes"
      }, {
        value: "Sandbag",
        text: "Sandbag"
      }, {
        value: "Weighted Vest",
        text: "Weighted Vest"
      }, {
        value: "Ankle Weights",
        text: "Ankle Weights"
      }, {
        value: "Resistance Tubes",
        text: "Resistance Tubes"
      }, {
        value: "Pilates Ring",
        text: "Pilates Ring"
      }, {
        value: "Yoga Blocks",
        text: "Yoga Blocks"
      }, {
        value: "Yoga Strap",
        text: "Yoga Strap"
      }, {
        value: "Bosu Ball",
        text: "Bosu Ball"
      }, {
        value: "Stability Ball",
        text: "Stability Ball"
      }, {
        value: "Ab Wheel",
        text: "Ab Wheel"
      }, {
        value: "Push-up Bars",
        text: "Push-up Bars"
      }, {
        value: "Dip Bars",
        text: "Dip Bars"
      }, {
        value: "Plyometric Box",
        text: "Plyometric Box"
      }, {
        value: "Agility Ladder",
        text: "Agility Ladder"
      }, {
        value: "Cone Markers",
        text: "Cone Markers"
      }, {
        value: "None (Bodyweight)",
        text: "None (Bodyweight)"
      }],
      muscleGroupsOptions: [{
        value: "Biceps",
        text: "Biceps"
      }, {
        value: "Triceps",
        text: "Triceps"
      }, {
        value: "Shoulders",
        text: "Shoulders"
      }, {
        value: "Chest",
        text: "Chest"
      }, {
        value: "Back",
        text: "Back"
      }, {
        value: "Lats",
        text: "Lats"
      }, {
        value: "Core",
        text: "Core"
      }, {
        value: "Abs",
        text: "Abs"
      }, {
        value: "Obliques",
        text: "Obliques"
      }, {
        value: "Glutes",
        text: "Glutes"
      }, {
        value: "Quadriceps",
        text: "Quadriceps"
      }, {
        value: "Hamstrings",
        text: "Hamstrings"
      }, {
        value: "Calves",
        text: "Calves"
      }, {
        value: "Forearms",
        text: "Forearms"
      }, {
        value: "Traps",
        text: "Traps"
      }, {
        value: "Deltoids",
        text: "Deltoids"
      }, {
        value: "Pectorals",
        text: "Pectorals"
      }, {
        value: "Rhomboids",
        text: "Rhomboids"
      }, {
        value: "Lower Back",
        text: "Lower Back"
      }, {
        value: "Upper Back",
        text: "Upper Back"
      }, {
        value: "Full Body",
        text: "Full Body"
      }, {
        value: "Legs",
        text: "Legs"
      }, {
        value: "Arms",
        text: "Arms"
      }, {
        value: "Cardiovascular",
        text: "Cardiovascular"
      }],
      selectedDay: null,
      thumbnailUrl: null,
      videoUrl: null,
      loading: false,
      validationErrors: {},
      defaultWorkoutImages: ['/images/workout_default/workout-1.jpg', '/images/workout_default/workout-2.jpg', '/images/workout_default/workout-3.jpg', '/images/workout_default/workout-4.jpg', '/images/workout_default/workout-5.jpg', '/images/workout_default/workout-6.jpg', '/images/workout_default/workout-7.jpg', '/images/workout_default/workout-8.jpg', '/images/workout_default/workout-9.jpg', '/images/workout_default/workout-10.jpg', '/images/workout_default/workout-11.jpg', '/images/workout_default/workout-12.jpg', '/images/workout_default/workout-13.jpg', '/images/workout_default/workout-14.jpg', '/images/workout_default/workout-15.jpg', '/images/workout_default/schedule-1.jpg', '/images/workout_default/schedule-2.jpg', '/images/workout_default/Sets.png', '/images/workout_default/startpagegirl.png', '/images/workout_default/weeklychallenge.png'],
      currentDefaultImageIndex: 0
    };
  },
  watch: {
    initialWorkout: {
      immediate: true,
      handler: function handler(newVal) {
        if (newVal) {
          var _this$categories$, _this$typeOptions$, _this$goalOptions$;
          // If category exists but is not in the categories list, add it dynamically
          if (newVal.category && newVal.category.trim() !== '') {
            var categoryExists = this.categories.some(function (cat) {
              return cat.value === newVal.category;
            });
            if (!categoryExists) {
              // Add the category to the list so it can be displayed in the dropdown
              this.categories.push({
                value: newVal.category,
                text: newVal.category
              });
            }
          }
          this.form = _objectSpread(_objectSpread({}, this.form), {}, {
            exercise_name: newVal.exercise_name || newVal.name || "",
            category: newVal.category || ((_this$categories$ = this.categories[0]) === null || _this$categories$ === void 0 ? void 0 : _this$categories$.value) || "full-body",
            duration: newVal.duration,
            level: newVal.level || "Beginner",
            calories_burned: newVal.calories_burned,
            description: newVal.description,
            instructions: newVal.instructions,
            equipment: this.getEquipmentValue(newVal.equipment),
            muscles_targeted: this.getMuscleGroupValue(newVal.muscles_targeted || newVal.muscleGroups),
            difficulty: newVal.difficulty,
            rest_period: newVal.rest_period || newVal.restPeriod,
            tags: newVal.tags,
            video_link: newVal.video_link || newVal.videoLink || "",
            type: newVal.type || ((_this$typeOptions$ = this.typeOptions[0]) === null || _this$typeOptions$ === void 0 ? void 0 : _this$typeOptions$.value) || "Set based",
            goal: newVal.goal || ((_this$goalOptions$ = this.goalOptions[0]) === null || _this$goalOptions$ === void 0 ? void 0 : _this$goalOptions$.value) || "Lose Weight",
            sets: newVal.sets_configuration || [{
              reps: 0,
              pause: 0
            }, {
              reps: 0,
              pause: 0
            }, {
              reps: 0,
              pause: 0
            }],
            // Load settings fields
            days_per_week: newVal.days_per_week || "3 days/week",
            repeat: newVal.repeat || "1x",
            rest_seconds: newVal.rest_seconds || null,
            default_reps: function () {
              // Initialize with 9 null values
              var defaultArray = [null, null, null, null, null, null, null, null, null];
              if (!newVal.default_reps) {
                return defaultArray;
              }
              var repsArray = null;

              // If it's a string (JSON), parse it
              if (typeof newVal.default_reps === 'string') {
                try {
                  repsArray = JSON.parse(newVal.default_reps);
                } catch (e) {
                  return defaultArray;
                }
              } else if (Array.isArray(newVal.default_reps)) {
                // If it's already an array, use it
                repsArray = newVal.default_reps;
              } else {
                return defaultArray;
              }

              // Ensure we have an array and normalize values
              if (!Array.isArray(repsArray)) {
                return defaultArray;
              }

              // Process the array: convert to numbers, handle empty strings, and pad to 9 elements
              var processedArray = repsArray.map(function (rep) {
                // Convert empty string or null to null
                if (rep === '' || rep === null || rep === undefined) {
                  return null;
                }
                // Convert to number if it's a valid number string
                var num = Number(rep);
                return isNaN(num) ? null : num;
              });

              // Pad array to exactly 9 elements
              while (processedArray.length < 9) {
                processedArray.push(null);
              }

              // Trim to 9 elements if longer
              return processedArray.slice(0, 9);
            }(),
            enable_preset_weights: function () {
              var value = newVal.enable_preset_weights;
              // Handle all possible formats: boolean true, integer 1, string '1', or truthy values
              var result = value === true || value === 1 || value === '1' || value === 'true';
              return result;
            }()
          });
          // Set thumbnail URL - always load from initialWorkout when it changes
          // Only preserve blob URLs (user's new selection) if they exist
          var hasUserSelection = this.thumbnailUrl && this.thumbnailUrl.startsWith('blob:');
          if (!hasUserSelection) {
            // No user selection, load from initialWorkout
            if (newVal.thumbnail && newVal.thumbnail.trim() !== '') {
              // Ensure thumbnail path starts with / for proper display
              var thumbPath = newVal.thumbnail.trim();
              if (!thumbPath.startsWith('/') && !thumbPath.startsWith('http://') && !thumbPath.startsWith('https://')) {
                thumbPath = '/' + thumbPath;
              }
              // Set thumbnail URL - even if it's the default image path
              this.thumbnailUrl = thumbPath;

              // Check if it's a default workout image and set the index
              var defaultIndex = this.defaultWorkoutImages.findIndex(function (img) {
                var imgName = img.split('/').pop();
                return thumbPath.includes(imgName);
              });
              if (defaultIndex !== -1) {
                this.currentDefaultImageIndex = defaultIndex;
              }
            } else {
              // No thumbnail in database, set to null (will show default via computed property)
              this.thumbnailUrl = null;
              this.currentDefaultImageIndex = 0;
            }
          }
          // If thumbnailUrl is a blob URL, keep it (user's selection)
          this.videoUrl = newVal.video || null;
          // Clear validation errors when loading workout data
          this.validationErrors = {};
        } else {
          this.resetForm();
        }
      }
    },
    visible: function visible(val) {
      var _this = this;
      if (val) {
        // When modal opens, load thumbnail from initialWorkout if available
        // Only preserve blob URLs (user's new selection) if they exist
        var hasUserSelection = this.thumbnailUrl && this.thumbnailUrl.startsWith('blob:');
        if (!hasUserSelection) {
          // Load from initialWorkout or set to null
          if (this.initialWorkout && this.initialWorkout.thumbnail && this.initialWorkout.thumbnail.trim() !== '') {
            var thumbPath = this.initialWorkout.thumbnail.trim();
            if (!thumbPath.startsWith('/') && !thumbPath.startsWith('http://') && !thumbPath.startsWith('https://')) {
              thumbPath = '/' + thumbPath;
            }
            // Set thumbnail URL - even if it's the default image path
            // Use Vue.set to ensure reactivity
            this.$set(this, 'thumbnailUrl', thumbPath);

            // Check if it's a default workout image and set the index
            var defaultIndex = this.defaultWorkoutImages.findIndex(function (img) {
              var imgName = img.split('/').pop();
              return thumbPath.includes(imgName);
            });
            if (defaultIndex !== -1) {
              this.currentDefaultImageIndex = defaultIndex;
            }
          } else {
            // No thumbnail in database, set to null (will show default via computed property)
            this.$set(this, 'thumbnailUrl', null);
            this.currentDefaultImageIndex = 0;
          }
        }
        // Force update in next tick to ensure image displays
        this.$nextTick(function () {
          _this.$forceUpdate();
        });
      } else {
        this.resetForm();
        this.selectedDay = null;
        // Clear validation errors when modal closes
        this.validationErrors = {};
      }
    }
  },
  computed: {
    displayThumbnail: function displayThumbnail() {
      // Always return a valid image path
      // Priority: blob URL (user selection) > thumbnailUrl > initialWorkout.thumbnail > default image from navigation

      // First check if user selected a new image (blob URL)
      if (this.thumbnailUrl && typeof this.thumbnailUrl === 'string' && this.thumbnailUrl.startsWith('blob:')) {
        return this.thumbnailUrl;
      }

      // Then check if thumbnailUrl is set (from database or initialWorkout)
      if (this.thumbnailUrl && typeof this.thumbnailUrl === 'string' && this.thumbnailUrl.trim() !== '') {
        var trimmed = this.thumbnailUrl.trim();
        // Ensure path starts with / if it's a relative path
        if (!trimmed.startsWith('/') && !trimmed.startsWith('http://') && !trimmed.startsWith('https://')) {
          return '/' + trimmed;
        }
        return trimmed;
      }

      // Fallback to initialWorkout thumbnail if available
      if (this.initialWorkout && this.initialWorkout.thumbnail && this.initialWorkout.thumbnail.trim() !== '') {
        var thumbPath = this.initialWorkout.thumbnail.trim();
        if (!thumbPath.startsWith('/') && !thumbPath.startsWith('http://') && !thumbPath.startsWith('https://')) {
          thumbPath = '/' + thumbPath;
        }
        return thumbPath;
      }

      // Return current default image from navigation
      if (this.defaultWorkoutImages && this.defaultWorkoutImages.length > 0) {
        return this.defaultWorkoutImages[this.currentDefaultImageIndex] || this.defaultWorkoutImages[0];
      }

      // Always return default image as last resort
      return '/images/closeup.webp';
    },
    hasCustomThumbnail: function hasCustomThumbnail() {
      // Check if a custom thumbnail has been selected (blob URL or file input has a file)
      return !!(this.thumbnailUrl && this.thumbnailUrl.startsWith('blob:')) || this.$refs.thumbnailInput && this.$refs.thumbnailInput.files && this.$refs.thumbnailInput.files.length > 0;
    }
  },
  methods: {
    previewVideo: function previewVideo(event) {
      var file = event.target.files[0];
      if (file) {
        this.videoUrl = URL.createObjectURL(file);
      }
    },
    removeVideo: function removeVideo() {
      this.videoUrl = null;
      if (this.$refs.videoInput) {
        this.$refs.videoInput.value = null;
      }
    },
    previewThumbnail: function previewThumbnail(event) {
      var file = event.target.files[0];
      if (file) {
        // Create object URL for immediate preview
        this.thumbnailUrl = URL.createObjectURL(file);
        // Reset default image index when user selects custom image
        this.currentDefaultImageIndex = 0;
      } else {
        // If no file selected, keep existing thumbnail or set to null
        if (!this.initialWorkout || !this.initialWorkout.thumbnail) {
          this.thumbnailUrl = null;
        }
      }
    },
    removeThumbnail: function removeThumbnail() {
      this.thumbnailUrl = null;
      if (this.$refs.thumbnailInput) {
        this.$refs.thumbnailInput.value = null;
      }
    },
    validateForm: function validateForm() {
      var _this2 = this;
      // Clear previous validation errors
      this.validationErrors = {};
      var isValid = true;
      var errors = {};

      // Required field validations
      if (!this.form.exercise_name || this.form.exercise_name.trim() === '') {
        errors.exercise_name = ['Name is required'];
        isValid = false;
      }
      if (!this.form.category || this.form.category === null) {
        errors.category = ['Category is required'];
        isValid = false;
      }
      if (!this.form.duration || this.form.duration === null || this.form.duration === '') {
        errors.duration = ['Duration is required'];
        isValid = false;
      }
      if (!this.form.level || this.form.level === null || this.form.level === '') {
        errors.level = ['Level is required'];
        isValid = false;
      }

      // Check if calories_burned is provided (allow 0 as valid value)
      if (this.form.calories_burned === null || this.form.calories_burned === undefined || this.form.calories_burned === '') {
        errors.calories_burned = ['Calories Burned is required'];
        isValid = false;
      } else {
        // Validate calories_burned is a valid non-negative number (allow 0)
        var calories = Number(this.form.calories_burned);
        if (isNaN(calories) || calories < 0) {
          errors.calories_burned = ['Calories Burned must be a valid number (0 or greater)'];
          isValid = false;
        }
      }

      // Validate duration is a valid positive number
      if (this.form.duration) {
        var duration = Number(this.form.duration);
        if (isNaN(duration) || duration <= 0) {
          errors.duration = ['Duration must be a valid positive number'];
          isValid = false;
        }
      }

      // Set validation errors
      if (!isValid) {
        this.validationErrors = errors;

        // Scroll to first error field
        this.$nextTick(function () {
          try {
            if (!_this2._isDestroyed && _this2.$el && _this2.$el.nodeType === 1 && typeof _this2.$el.querySelector === 'function') {
              var firstErrorField = Object.keys(errors)[0];
              var errorElement = _this2.$el.querySelector(".is-invalid");
              if (errorElement) {
                errorElement.scrollIntoView({
                  behavior: 'smooth',
                  block: 'center'
                });
                errorElement.focus();
              }
            }
          } catch (error) {
            // Silently fail if element is not available
          }
        });

        // Show error message
        this.$swal({
          icon: 'error',
          title: 'Validation Error',
          html: "\n                        <div style=\"text-align: left;\">\n                            <p style=\"margin-bottom: 10px;\"><strong>Please fix the following errors:</strong></p>\n                            <ul style=\"margin-left: 20px;\">\n                                ".concat(Object.entries(errors).map(function (_ref) {
            var _ref2 = _slicedToArray(_ref, 2),
              field = _ref2[0],
              messages = _ref2[1];
            var fieldLabel = _this2.getFieldLabel(field);
            return "<li>".concat(fieldLabel, ": ").concat(messages[0], "</li>");
          }).join(''), "\n                            </ul>\n                        </div>\n                    "),
          confirmButtonText: 'OK',
          confirmButtonColor: '#ff4040'
        });
      }
      return isValid;
    },
    handleSubmit: function handleSubmit() {
      var _this3 = this;
      return _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
        var _isEdit, workoutId, formData, parsed, processedReps, presetWeightsValue, defaultImagePath, _this3$initialWorkout, originalThumbnail, currentDefaultImage, isDefaultImage, response, responseWorkoutId, successMessage, workoutData, _error$response, errorMessages, _i, _Object$entries, _Object$entries$_i, field, messages, fieldLabel, _error$response2;
        return _regeneratorRuntime().wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              if (_this3.validateForm()) {
                _context.next = 2;
                break;
              }
              return _context.abrupt("return");
            case 2:
              _context.prev = 2;
              _this3.loading = true;

              // Check if this is an edit (has initialWorkout with id) or create (new workout)
              _isEdit = _this3.initialWorkout && _this3.initialWorkout.id;
              workoutId = _isEdit ? _this3.initialWorkout.id : null; // Create FormData for file upload
              formData = new FormData(); // Add text fields - ensure required fields are not null/undefined
              formData.append('exercise_name', _this3.form.exercise_name || '');
              formData.append('category', _this3.form.category || '');
              formData.append('duration', _this3.form.duration || '');
              formData.append('level', _this3.form.level || '');
              formData.append('description', _this3.form.description || '');
              // Send equipment value as JSON array
              formData.append('equipment', Array.isArray(_this3.form.equipment) && _this3.form.equipment.length > 0 ? JSON.stringify(_this3.form.equipment) : '[]');
              // Send muscles_targeted value as JSON array
              formData.append('muscles_targeted', Array.isArray(_this3.form.muscles_targeted) && _this3.form.muscles_targeted.length > 0 ? JSON.stringify(_this3.form.muscles_targeted) : '[]');
              formData.append('video_link', _this3.form.video_link || '');
              // Handle calories_burned - ensure it's a valid integer (allow 0)
              if (_this3.form.calories_burned !== null && _this3.form.calories_burned !== undefined && _this3.form.calories_burned !== '') {
                parsed = parseInt(_this3.form.calories_burned);
                if (!isNaN(parsed) && parsed >= 0) {
                  formData.append('calories_burned', parsed.toString());
                } else {
                  formData.append('calories_burned', '0');
                }
              } else {
                // If validation passed but value is missing, default to 0 (backend requires a value)
                formData.append('calories_burned', '0');
              }
              formData.append('instructions', _this3.form.instructions || '');
              formData.append('difficulty', _this3.form.difficulty || 1);
              formData.append('rest_period', _this3.form.rest_period || 30);
              formData.append('tags', _this3.form.tags || '');
              formData.append('type', _this3.form.type || '');
              formData.append('goal', _this3.form.goal || 'Lose Weight');
              formData.append('sets', JSON.stringify(_this3.form.sets || []));

              // Add settings fields
              formData.append('days_per_week', _this3.form.days_per_week || '');
              formData.append('repeat', _this3.form.repeat || '');
              // Only append rest_seconds if it has a value (not null or empty)
              if (_this3.form.rest_seconds !== null && _this3.form.rest_seconds !== '') {
                formData.append('rest_seconds', parseInt(_this3.form.rest_seconds) || 0);
              }
              // Process default_reps: convert empty strings to null and ensure proper format
              processedReps = _this3.form.default_reps.map(function (rep) {
                // Convert empty string, null, or undefined to null
                if (rep === '' || rep === null || rep === undefined) {
                  return null;
                }
                // Convert to number if it's a valid number
                var num = Number(rep);
                return isNaN(num) ? null : num;
              });
              formData.append('default_reps', JSON.stringify(processedReps));
              presetWeightsValue = _this3.form.enable_preset_weights ? 1 : 0;
              formData.append('enable_preset_weights', presetWeightsValue);

              // Add thumbnail file if selected
              if (_this3.$refs.thumbnailInput && _this3.$refs.thumbnailInput.files[0]) {
                // New file selected - upload it (works for both create and update)
                formData.append('thumbnail', _this3.$refs.thumbnailInput.files[0]);
              } else {
                // No file selected - determine what to send
                if (!_isEdit) {
                  // Creating new workout - use selected default image or fallback
                  defaultImagePath = _this3.defaultWorkoutImages[_this3.currentDefaultImageIndex] || '/images/closeup.webp';
                  formData.append('thumbnail', defaultImagePath);
                } else {
                  // Updating existing workout
                  originalThumbnail = ((_this3$initialWorkout = _this3.initialWorkout) === null || _this3$initialWorkout === void 0 ? void 0 : _this3$initialWorkout.thumbnail) || '';
                  currentDefaultImage = _this3.defaultWorkoutImages[_this3.currentDefaultImageIndex] || '/images/closeup.webp'; // If thumbnailUrl is set to a default image path (not blob) and it's different from original
                  if (_this3.thumbnailUrl && !_this3.thumbnailUrl.startsWith('blob:') && _this3.thumbnailUrl !== originalThumbnail) {
                    // Check if it's a default image path
                    isDefaultImage = _this3.defaultWorkoutImages.some(function (img) {
                      var imgName = img.split('/').pop();
                      return _this3.thumbnailUrl.includes(imgName);
                    });
                    if (isDefaultImage) {
                      // User selected a different default image - send it
                      formData.append('thumbnail', _this3.thumbnailUrl);
                    } else if (_this3.thumbnailUrl === currentDefaultImage && currentDefaultImage !== originalThumbnail) {
                      // User navigated to a different default image - send it
                      formData.append('thumbnail', currentDefaultImage);
                    }
                    // Otherwise, don't send thumbnail field - backend will keep existing thumbnail
                  }
                  // If thumbnailUrl is null, empty, or same as original, don't send - backend keeps existing
                }
              }

              // Make API call - use POST with _method=PUT for update (Laravel FormData workaround), POST for create
              if (!(_isEdit && workoutId)) {
                _context.next = 38;
                break;
              }
              // Update existing workout - use POST with _method=PUT for FormData compatibility
              formData.append('_method', 'PUT');
              _context.next = 35;
              return axios__WEBPACK_IMPORTED_MODULE_0___default().post("workout/".concat(workoutId), formData, {
                headers: {
                  'Content-Type': 'multipart/form-data'
                }
              });
            case 35:
              response = _context.sent;
              _context.next = 41;
              break;
            case 38:
              _context.next = 40;
              return axios__WEBPACK_IMPORTED_MODULE_0___default().post('workout', formData, {
                headers: {
                  'Content-Type': 'multipart/form-data'
                }
              });
            case 40:
              response = _context.sent;
            case 41:
              if (!response.data.success) {
                _context.next = 58;
                break;
              }
              responseWorkoutId = response.data.id || workoutId; // If selected activities and day are provided, save activities to the day
              if (!(_this3.selectedActivities && _this3.selectedActivities.length > 0 && _this3.selectedDay)) {
                _context.next = 52;
                break;
              }
              _context.prev = 44;
              _context.next = 47;
              return _this3.saveActivitiesToDay(responseWorkoutId, _this3.selectedDay, _this3.selectedActivities);
            case 47:
              _context.next = 52;
              break;
            case 49:
              _context.prev = 49;
              _context.t0 = _context["catch"](44);
              // Still show success but warn about activities
              _this3.$swal({
                icon: 'warning',
                title: _isEdit ? 'Workout Updated' : 'Workout Created',
                text: "Workout ".concat(_isEdit ? 'updated' : 'created', " but failed to assign activities to day. You can assign them manually in Plan Builder."),
                timer: 3000
              });
            case 52:
              // Show success message
              successMessage = _this3.selectedDay ? "Workout ".concat(_isEdit ? 'updated' : 'created', " successfully! Activities assigned to ").concat(_this3.selectedDay, ".") : "Workout ".concat(_isEdit ? 'updated' : 'created', " successfully!");
              _this3.$swal({
                icon: 'success',
                title: 'Success!',
                text: successMessage,
                timer: 2000,
                showConfirmButton: false
              });

              // Emit the workout data with selected day info
              // If response includes exercise data (from update), merge it at top level
              workoutData = response.data.exercise ? _objectSpread(_objectSpread({}, response.data.exercise), response.data) : _objectSpread({}, response.data);
              _this3.$emit("submit", _objectSpread(_objectSpread({}, workoutData), {}, {
                id: responseWorkoutId,
                selectedDay: _this3.selectedDay,
                selectedActivities: _this3.selectedActivities,
                isUpdate: _isEdit
              }));

              // Close modal
              _this3.$emit("close");

              // Reset form
              _this3.resetForm();
            case 58:
              _context.next = 63;
              break;
            case 60:
              _context.prev = 60;
              _context.t1 = _context["catch"](2);
              // Handle validation errors from backend (should rarely happen now with frontend validation)
              if ((_error$response = _context.t1.response) !== null && _error$response !== void 0 && (_error$response = _error$response.data) !== null && _error$response !== void 0 && _error$response.errors) {
                // Store validation errors for display
                _this3.validationErrors = _context.t1.response.data.errors;

                // Build error message with field names
                errorMessages = [];
                for (_i = 0, _Object$entries = Object.entries(_this3.validationErrors); _i < _Object$entries.length; _i++) {
                  _Object$entries$_i = _slicedToArray(_Object$entries[_i], 2), field = _Object$entries$_i[0], messages = _Object$entries$_i[1];
                  if (Array.isArray(messages) && messages.length > 0) {
                    fieldLabel = _this3.getFieldLabel(field);
                    errorMessages.push("".concat(fieldLabel, ": ").concat(messages[0]));
                  }
                }

                // Scroll to first error field
                _this3.$nextTick(function () {
                  try {
                    if (!_this3._isDestroyed && _this3.$el && _this3.$el.nodeType === 1 && typeof _this3.$el.querySelector === 'function') {
                      var firstErrorField = Object.keys(_this3.validationErrors)[0];
                      var errorElement = _this3.$el.querySelector(".is-invalid");
                      if (errorElement) {
                        errorElement.scrollIntoView({
                          behavior: 'smooth',
                          block: 'center'
                        });
                        errorElement.focus();
                      }
                    }
                  } catch (error) {
                    // Silently fail if element is not available
                  }
                });

                // Show error message with validation details
                _this3.$swal({
                  icon: 'error',
                  title: 'Validation Error',
                  html: "\n                            <div style=\"text-align: left;\">\n                                <p style=\"margin-bottom: 10px;\"><strong>Please fix the following errors:</strong></p>\n                                <ul style=\"margin-left: 20px;\">\n                                    ".concat(errorMessages.map(function (msg) {
                    return "<li>".concat(msg, "</li>");
                  }).join(''), "\n                                </ul>\n                            </div>\n                        "),
                  confirmButtonText: 'OK',
                  confirmButtonColor: '#ff4040'
                });
              } else {
                // Show generic error message for network or server errors
                _this3.$swal({
                  icon: 'error',
                  title: 'Error!',
                  text: ((_error$response2 = _context.t1.response) === null || _error$response2 === void 0 || (_error$response2 = _error$response2.data) === null || _error$response2 === void 0 ? void 0 : _error$response2.message) || "Failed to ".concat(isEdit ? 'update' : 'create', " workout. Please try again."),
                  confirmButtonText: 'OK',
                  confirmButtonColor: '#ff4040'
                });
              }
            case 63:
              _context.prev = 63;
              _this3.loading = false;
              return _context.finish(63);
            case 66:
            case "end":
              return _context.stop();
          }
        }, _callee, null, [[2, 60, 63, 66], [44, 49]]);
      }))();
    },
    getFieldLabel: function getFieldLabel(fieldName) {
      var fieldLabels = {
        'exercise_name': 'Name',
        'category': 'Category',
        'duration': 'Duration',
        'level': 'Level',
        'description': 'Description',
        'equipment': 'Equipment',
        'muscles_targeted': 'Target Muscle Groups',
        'calories_burned': 'Calories Burned',
        'instructions': 'Instructions',
        'difficulty': 'Difficulty',
        'rest_period': 'Rest Period',
        'tags': 'Tags',
        'video_link': 'Video Link',
        'days_per_week': 'Days per week',
        'repeat': 'Repeat',
        'rest_seconds': 'Rest (s)',
        'default_reps': 'Reps (x)',
        'enable_preset_weights': 'Enable preset weights'
      };
      return fieldLabels[fieldName] || fieldName.replace(/_/g, ' ').replace(/\b\w/g, function (l) {
        return l.toUpperCase();
      });
    },
    getEquipmentValue: function getEquipmentValue(equipmentValue) {
      // If no value, return empty array
      if (!equipmentValue) {
        return [];
      }

      // If it's already an array, validate and return it
      if (Array.isArray(equipmentValue)) {
        return equipmentValue.filter(function (val) {
          return val !== null && val !== undefined && val !== '';
        });
      }

      // If it's a JSON string, parse it
      if (typeof equipmentValue === 'string') {
        var trimmed = equipmentValue.trim();

        // Try to parse as JSON first
        if (trimmed.startsWith('[') || trimmed.startsWith('{')) {
          try {
            var parsed = JSON.parse(trimmed);
            if (Array.isArray(parsed)) {
              return parsed.filter(function (val) {
                return val !== null && val !== undefined && val !== '';
              });
            }
          } catch (e) {
            // Not valid JSON, continue to handle as comma-separated
          }
        }

        // Handle comma-separated string
        if (trimmed.includes(',')) {
          return trimmed.split(',').map(function (val) {
            return val.trim();
          }).filter(function (val) {
            return val !== '';
          });
        }

        // Single value string
        if (trimmed !== '') {
          return [trimmed];
        }
      }
      return [];
    },
    getMuscleGroupValue: function getMuscleGroupValue(muscleGroupValue) {
      // If no value, return empty array
      if (!muscleGroupValue) {
        return [];
      }

      // If it's already an array, validate and return it
      if (Array.isArray(muscleGroupValue)) {
        return muscleGroupValue.filter(function (val) {
          return val !== null && val !== undefined && val !== '';
        });
      }

      // If it's a JSON string, parse it
      if (typeof muscleGroupValue === 'string') {
        var trimmed = muscleGroupValue.trim();

        // Try to parse as JSON first
        if (trimmed.startsWith('[') || trimmed.startsWith('{')) {
          try {
            var parsed = JSON.parse(trimmed);
            if (Array.isArray(parsed)) {
              return parsed.filter(function (val) {
                return val !== null && val !== undefined && val !== '';
              });
            }
          } catch (e) {
            // Not valid JSON, continue to handle as comma-separated
          }
        }

        // Handle comma-separated string
        if (trimmed.includes(',')) {
          return trimmed.split(',').map(function (val) {
            return val.trim();
          }).filter(function (val) {
            return val !== '';
          });
        }

        // Single value string
        if (trimmed !== '') {
          return [trimmed];
        }
      }
      return [];
    },
    addWorkout: function addWorkout(newWorkout) {
      this.$emit("add-workout", newWorkout);
    },
    saveActivitiesToDay: function saveActivitiesToDay(workoutId, day, activities) {
      var _this4 = this;
      return _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee2() {
        var exercises, activityPlanData, response;
        return _regeneratorRuntime().wrap(function _callee2$(_context2) {
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
              // Prepare exercises data for WorkoutActivityPlan
              exercises = activities.map(function (activity) {
                return {
                  exercise_id: activity.id || activity.exercise_id,
                  exercise_name: activity.name || activity.exercise_name,
                  sets: activity.sets || 3,
                  reps: activity.reps || 12,
                  rest_period: activity.restPeriod || activity.rest_period_seconds || 60
                };
              });
              activityPlanData = {
                workout_id: workoutId,
                day: day,
                workout_name: _this4.form.exercise_name,
                description: _this4.form.description || '',
                exercises: exercises
              }; // Save activities to the selected day using WorkoutActivityPlan API
              _context2.next = 4;
              return axios__WEBPACK_IMPORTED_MODULE_0___default().post('workout_activity_plan', activityPlanData);
            case 4:
              response = _context2.sent;
              if (response.data.success) {
                _context2.next = 7;
                break;
              }
              throw new Error(response.data.message || 'Failed to save activities to day');
            case 7:
              return _context2.abrupt("return", response.data);
            case 8:
            case "end":
              return _context2.stop();
          }
        }, _callee2);
      }))();
    },
    resetForm: function resetForm() {
      var _this5 = this;
      this.form = {
        exercise_name: "New Workout",
        category: "full-body",
        duration: 15,
        level: "Beginner",
        calories_burned: 100,
        description: "A comprehensive workout designed to maximize your fitness potential. This routine targets multiple muscle groups and energy systems to help you achieve your fitness goals efficiently.",
        instructions: "1. Warm up for 5 minutes with light cardio\n2. Perform each exercise with proper form\n3. Rest 30-60 seconds between sets\n4. Complete all sets before moving to the next exercise\n5. Cool down with stretching after completing the workout",
        equipment: [],
        muscles_targeted: [],
        difficulty: 5,
        rest_period: null,
        tags: "",
        video_link: "",
        type: "Set based",
        goal: "Lose Weight",
        sets: [{
          reps: 0,
          pause: 0
        }, {
          reps: 0,
          pause: 0
        }, {
          reps: 0,
          pause: 0
        }],
        // Reset settings fields
        days_per_week: "3 days/week",
        repeat: "1x",
        rest_seconds: null,
        default_reps: [null, null, null, null, null, null, null, null, null],
        enable_preset_weights: false
      };
      this.selectedDay = null;
      this.thumbnailUrl = null;
      this.videoUrl = null;
      this.currentDefaultImageIndex = 0;
      this.validationErrors = {}; // Clear validation errors
      if (this.$refs.thumbnailInput) this.$refs.thumbnailInput.value = null;
      if (this.$refs.videoInput) this.$refs.videoInput.value = null;

      // Clear any HTML5 validation states
      this.$nextTick(function () {
        try {
          if (!_this5._isDestroyed && _this5.$el && _this5.$el.nodeType === 1 && typeof _this5.$el.querySelector === 'function') {
            var form = _this5.$el.querySelector('form');
            if (form) {
              form.classList.remove('was-validated');
            }
          }
        } catch (error) {
          // Silently fail if element is not available
        }
      });
    },
    handleImageError: function handleImageError(event) {
      event.target.src = '/images/Kettlebell-swing.webp';
    },
    handleThumbnailError: function handleThumbnailError(event) {
      // If thumbnail fails to load, try alternative paths
      var currentSrc = event.target.src;
      var defaultPath = '/images/closeup.webp';

      // If not already trying to load default image, try it
      if (!currentSrc.includes('/images/closeup.webp')) {
        // Try to load default image
        event.target.src = defaultPath;
      } else {
        // Already tried default, try alternative default images
        var alternatives = ['/images/closeup.webp'
        // '/images/default-workout.webp',
        // '/images/default-workout.jpg'
        ];

        // Try next alternative if available
        var currentIndex = alternatives.findIndex(function (alt) {
          return currentSrc.includes(alt);
        });
        if (currentIndex < alternatives.length - 1) {
          event.target.src = alternatives[currentIndex + 1];
        }
      }
    },
    onThumbnailLoad: function onThumbnailLoad(event) {
      // Image loaded successfully - ensure it's visible
      event.target.style.display = 'block';
      event.target.style.opacity = '1';
    },
    previousDefaultImage: function previousDefaultImage() {
      if (this.defaultWorkoutImages.length === 0) return;
      this.currentDefaultImageIndex = (this.currentDefaultImageIndex - 1 + this.defaultWorkoutImages.length) % this.defaultWorkoutImages.length;
      // Set thumbnailUrl to the selected default image
      this.thumbnailUrl = this.defaultWorkoutImages[this.currentDefaultImageIndex];
      // Clear file input if it has a file
      if (this.$refs.thumbnailInput) {
        this.$refs.thumbnailInput.value = null;
      }
    },
    nextDefaultImage: function nextDefaultImage() {
      if (this.defaultWorkoutImages.length === 0) return;
      this.currentDefaultImageIndex = (this.currentDefaultImageIndex + 1) % this.defaultWorkoutImages.length;
      // Set thumbnailUrl to the selected default image
      this.thumbnailUrl = this.defaultWorkoutImages[this.currentDefaultImageIndex];
      // Clear file input if it has a file
      if (this.$refs.thumbnailInput) {
        this.$refs.thumbnailInput.value = null;
      }
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/Workout/ActivityList.vue?vue&type=script&lang=js":
/*!********************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/Workout/ActivityList.vue?vue&type=script&lang=js ***!
  \********************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _components_ActivityModal_vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../components/ActivityModal.vue */ "./resources/src/components/ActivityModal.vue");
/* harmony import */ var _components_WorkoutModal_vue__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../components/WorkoutModal.vue */ "./resources/src/components/WorkoutModal.vue");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! axios */ "./node_modules/axios/index.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_2__);
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
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



 // Added axios import

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  components: {
    ActivityModal: _components_ActivityModal_vue__WEBPACK_IMPORTED_MODULE_0__["default"],
    WorkoutModal: _components_WorkoutModal_vue__WEBPACK_IMPORTED_MODULE_1__["default"]
  },
  data: function data() {
    return {
      selectedActivities: [],
      selectedForDelete: [],
      filters: {
        category: "",
        muscle: "",
        difficulty: ""
      },
      viewMode: "grid",
      // 'grid' or 'list'
      currentPage: 1,
      itemsPerPage: 24,
      showActivityModal: false,
      showWorkoutModal: false,
      showSelectedModal: false,
      selectedActivity: null,
      dummyActivities: [{
        id: 1,
        name: "Push Ups",
        category: "Strength",
        muscle: "Chest",
        difficulty: "Beginner",
        duration: "30 sec"
      }, {
        id: 2,
        name: "Jumping Jacks",
        category: "Cardio",
        muscle: "Full Body",
        difficulty: "Beginner",
        duration: "60 sec"
      }, {
        id: 3,
        name: "Plank",
        category: "Core",
        muscle: "Abs",
        difficulty: "Intermediate",
        duration: "45 sec"
      }, {
        id: 4,
        name: "Squats",
        category: "Strength",
        muscle: "Legs",
        difficulty: "Beginner",
        duration: "45 sec"
      }, {
        id: 5,
        name: "Burpees",
        category: "Cardio",
        muscle: "Full Body",
        difficulty: "Advanced",
        duration: "60 sec"
      }, {
        id: 6,
        name: "Lunges",
        category: "Strength",
        muscle: "Legs",
        difficulty: "Intermediate",
        duration: "40 sec"
      }, {
        id: 7,
        name: "Sit Ups",
        category: "Core",
        muscle: "Abs",
        difficulty: "Beginner",
        duration: "30 sec"
      }, {
        id: 8,
        name: "Mountain Climbers",
        category: "Cardio",
        muscle: "Core",
        difficulty: "Intermediate",
        duration: "45 sec"
      }, {
        id: 9,
        name: "Bench Press",
        category: "Strength",
        muscle: "Chest",
        difficulty: "Advanced",
        duration: "60 sec"
      }, {
        id: 10,
        name: "Deadlift",
        category: "Strength",
        muscle: "Back",
        difficulty: "Advanced",
        duration: "90 sec"
      }, {
        id: 11,
        name: "Bicycle Crunches",
        category: "Core",
        muscle: "Abs",
        difficulty: "Intermediate",
        duration: "30 sec"
      }, {
        id: 12,
        name: "High Knees",
        category: "Cardio",
        muscle: "Full Body",
        difficulty: "Beginner",
        duration: "60 sec"
      }, {
        id: 13,
        name: "Tricep Dips",
        category: "Strength",
        muscle: "Arms",
        difficulty: "Intermediate",
        duration: "45 sec"
      }, {
        id: 14,
        name: "Russian Twists",
        category: "Core",
        muscle: "Abs",
        difficulty: "Intermediate",
        duration: "30 sec"
      }, {
        id: 15,
        name: "Jump Rope",
        category: "Cardio",
        muscle: "Full Body",
        difficulty: "Beginner",
        duration: "60 sec"
      }, {
        id: 16,
        name: "Leg Raises",
        category: "Core",
        muscle: "Abs",
        difficulty: "Intermediate",
        duration: "30 sec"
      }, {
        id: 17,
        name: "Shoulder Press",
        category: "Strength",
        muscle: "Shoulders",
        difficulty: "Intermediate",
        duration: "45 sec"
      }, {
        id: 18,
        name: "Bicep Curls",
        category: "Strength",
        muscle: "Arms",
        difficulty: "Beginner",
        duration: "30 sec"
      }, {
        id: 19,
        name: "Box Jumps",
        category: "Cardio",
        muscle: "Legs",
        difficulty: "Advanced",
        duration: "60 sec"
      }, {
        id: 20,
        name: "Plank Jacks",
        category: "Core",
        muscle: "Full Body",
        difficulty: "Intermediate",
        duration: "45 sec"
      }, {
        id: 21,
        name: "Kettlebell Swings",
        category: "Strength",
        muscle: "Full Body",
        difficulty: "Advanced",
        duration: "60 sec"
      }, {
        id: 22,
        name: "Wall Sit",
        category: "Strength",
        muscle: "Legs",
        difficulty: "Intermediate",
        duration: "30 sec"
      }, {
        id: 23,
        name: "Flutter Kicks",
        category: "Core",
        muscle: "Abs",
        difficulty: "Beginner",
        duration: "30 sec"
      }, {
        id: 24,
        name: "Side Lunges",
        category: "Strength",
        muscle: "Legs",
        difficulty: "Intermediate",
        duration: "45 sec"
      }, {
        id: 25,
        name: "Treadmill Sprints",
        category: "Cardio",
        muscle: "Full Body",
        difficulty: "Advanced",
        duration: "30 sec"
      }, {
        id: 26,
        name: "Hip Thrusts",
        category: "Strength",
        muscle: "Glutes",
        difficulty: "Intermediate",
        duration: "45 sec"
      }, {
        id: 27,
        name: "Plank Shoulder Taps",
        category: "Core",
        muscle: "Abs",
        difficulty: "Beginner",
        duration: "30 sec"
      }, {
        id: 28,
        name: "Battle Ropes",
        category: "Cardio",
        muscle: "Full Body",
        difficulty: "Advanced",
        duration: "60 sec"
      }, {
        id: 29,
        name: "Goblet Squats",
        category: "Strength",
        muscle: "Legs",
        difficulty: "Intermediate",
        duration: "45 sec"
      }, {
        id: 30,
        name: "Medicine Ball Slams",
        category: "Cardio",
        muscle: "Full Body",
        difficulty: "Advanced",
        duration: "60 sec"
      }, {
        id: 31,
        name: "Pull Ups",
        category: "Strength",
        muscle: "Back",
        difficulty: "Advanced",
        duration: "45 sec"
      }, {
        id: 32,
        name: "Diamond Push Ups",
        category: "Strength",
        muscle: "Arms",
        difficulty: "Advanced",
        duration: "45 sec"
      }, {
        id: 33,
        name: "Jump Squats",
        category: "Cardio",
        muscle: "Legs",
        difficulty: "Intermediate",
        duration: "60 sec"
      }, {
        id: 34,
        name: "Side Plank",
        category: "Core",
        muscle: "Abs",
        difficulty: "Intermediate",
        duration: "45 sec"
      }, {
        id: 35,
        name: "Inchworm Walk",
        category: "Strength",
        muscle: "Full Body",
        difficulty: "Intermediate",
        duration: "60 sec"
      }, {
        id: 36,
        name: "Bear Crawl",
        category: "Cardio",
        muscle: "Full Body",
        difficulty: "Intermediate",
        duration: "45 sec"
      }, {
        id: 37,
        name: "Reverse Crunches",
        category: "Core",
        muscle: "Abs",
        difficulty: "Beginner",
        duration: "30 sec"
      }, {
        id: 38,
        name: "Wall Balls",
        category: "Strength",
        muscle: "Full Body",
        difficulty: "Intermediate",
        duration: "60 sec"
      }, {
        id: 39,
        name: "Burpee Pull Ups",
        category: "Cardio",
        muscle: "Full Body",
        difficulty: "Advanced",
        duration: "60 sec"
      }, {
        id: 40,
        name: "Pike Push Ups",
        category: "Strength",
        muscle: "Shoulders",
        difficulty: "Advanced",
        duration: "45 sec"
      }, {
        id: 41,
        name: "Single Leg Deadlift",
        category: "Strength",
        muscle: "Legs",
        difficulty: "Intermediate",
        duration: "45 sec"
      }, {
        id: 42,
        name: "Plank to Downward Dog",
        category: "Core",
        muscle: "Full Body",
        difficulty: "Intermediate",
        duration: "45 sec"
      }, {
        id: 43,
        name: "Jump Rope Double Unders",
        category: "Cardio",
        muscle: "Full Body",
        difficulty: "Advanced",
        duration: "60 sec"
      }, {
        id: 44,
        name: "Renegade Rows",
        category: "Strength",
        muscle: "Back",
        difficulty: "Advanced",
        duration: "60 sec"
      }, {
        id: 45,
        name: "Mountain Climber Burpees",
        category: "Cardio",
        muscle: "Full Body",
        difficulty: "Advanced",
        duration: "60 sec"
      }, {
        id: 46,
        name: "Hollow Hold",
        category: "Core",
        muscle: "Abs",
        difficulty: "Intermediate",
        duration: "45 sec"
      }, {
        id: 47,
        name: "Pistol Squats",
        category: "Strength",
        muscle: "Legs",
        difficulty: "Advanced",
        duration: "60 sec"
      }, {
        id: 48,
        name: "Handstand Push Ups",
        category: "Strength",
        muscle: "Shoulders",
        difficulty: "Advanced",
        duration: "60 sec"
      }, {
        id: 49,
        name: "L-Sit Hold",
        category: "Core",
        muscle: "Abs",
        difficulty: "Advanced",
        duration: "45 sec"
      }, {
        id: 50,
        name: "Muscle Ups",
        category: "Strength",
        muscle: "Full Body",
        difficulty: "Advanced",
        duration: "60 sec"
      }, {
        id: 51,
        name: "Turkish Get Up",
        category: "Strength",
        muscle: "Full Body",
        difficulty: "Advanced",
        duration: "90 sec"
      }, {
        id: 52,
        name: "Windshield Wipers",
        category: "Core",
        muscle: "Abs",
        difficulty: "Advanced",
        duration: "45 sec"
      }, {
        id: 53,
        name: "Dragon Flags",
        category: "Core",
        muscle: "Abs",
        difficulty: "Advanced",
        duration: "60 sec"
      }, {
        id: 54,
        name: "Planche Hold",
        category: "Strength",
        muscle: "Arms",
        difficulty: "Advanced",
        duration: "45 sec"
      }, {
        id: 55,
        name: "Front Lever",
        category: "Strength",
        muscle: "Back",
        difficulty: "Advanced",
        duration: "60 sec"
      }, {
        id: 56,
        name: "Back Lever",
        category: "Strength",
        muscle: "Back",
        difficulty: "Advanced",
        duration: "60 sec"
      }, {
        id: 57,
        name: "Human Flag",
        category: "Strength",
        muscle: "Full Body",
        difficulty: "Advanced",
        duration: "45 sec"
      }, {
        id: 58,
        name: "One Arm Pull Up",
        category: "Strength",
        muscle: "Back",
        difficulty: "Advanced",
        duration: "60 sec"
      }, {
        id: 59,
        name: "One Arm Push Up",
        category: "Strength",
        muscle: "Chest",
        difficulty: "Advanced",
        duration: "60 sec"
      }, {
        id: 60,
        name: "One Arm Handstand",
        category: "Strength",
        muscle: "Shoulders",
        difficulty: "Advanced",
        duration: "60 sec"
      }, {
        id: 61,
        name: "Ring Muscle Up",
        category: "Strength",
        muscle: "Full Body",
        difficulty: "Advanced",
        duration: "90 sec"
      }, {
        id: 62,
        name: "Ring Dips",
        category: "Strength",
        muscle: "Arms",
        difficulty: "Advanced",
        duration: "45 sec"
      }, {
        id: 63,
        name: "Ring Rows",
        category: "Strength",
        muscle: "Back",
        difficulty: "Intermediate",
        duration: "45 sec"
      }, {
        id: 64,
        name: "Ring Push Ups",
        category: "Strength",
        muscle: "Chest",
        difficulty: "Intermediate",
        duration: "45 sec"
      }, {
        id: 65,
        name: "Ring Support Hold",
        category: "Strength",
        muscle: "Arms",
        difficulty: "Intermediate",
        duration: "45 sec"
      }, {
        id: 66,
        name: "Ring L-Sit",
        category: "Core",
        muscle: "Abs",
        difficulty: "Advanced",
        duration: "45 sec"
      }, {
        id: 67,
        name: "Ring Tuck Front Lever",
        category: "Strength",
        muscle: "Back",
        difficulty: "Advanced",
        duration: "60 sec"
      }, {
        id: 68,
        name: "Ring Tuck Back Lever",
        category: "Strength",
        muscle: "Back",
        difficulty: "Advanced",
        duration: "60 sec"
      }, {
        id: 69,
        name: "Ring Skin the Cat",
        category: "Strength",
        muscle: "Back",
        difficulty: "Advanced",
        duration: "60 sec"
      }, {
        id: 70,
        name: "Ring Inverted Hang",
        category: "Strength",
        muscle: "Back",
        difficulty: "Advanced",
        duration: "45 sec"
      }, {
        id: 71,
        name: "Ring Pull Ups",
        category: "Strength",
        muscle: "Back",
        difficulty: "Intermediate",
        duration: "45 sec"
      }, {
        id: 72,
        name: "Ring Chin Ups",
        category: "Strength",
        muscle: "Back",
        difficulty: "Intermediate",
        duration: "45 sec"
      }, {
        id: 73,
        name: "Ring Australian Pull Ups",
        category: "Strength",
        muscle: "Back",
        difficulty: "Beginner",
        duration: "45 sec"
      }, {
        id: 74,
        name: "Ring Pike Push Ups",
        category: "Strength",
        muscle: "Shoulders",
        difficulty: "Intermediate",
        duration: "45 sec"
      }, {
        id: 75,
        name: "Ring Tricep Extensions",
        category: "Strength",
        muscle: "Arms",
        difficulty: "Intermediate",
        duration: "45 sec"
      }, {
        id: 76,
        name: "Ring Bicep Curls",
        category: "Strength",
        muscle: "Arms",
        difficulty: "Intermediate",
        duration: "45 sec"
      }, {
        id: 77,
        name: "Ring Face Pulls",
        category: "Strength",
        muscle: "Shoulders",
        difficulty: "Intermediate",
        duration: "45 sec"
      }, {
        id: 78,
        name: "Ring Y-Raises",
        category: "Strength",
        muscle: "Shoulders",
        difficulty: "Intermediate",
        duration: "45 sec"
      }, {
        id: 79,
        name: "Ring T-Raises",
        category: "Strength",
        muscle: "Shoulders",
        difficulty: "Intermediate",
        duration: "45 sec"
      }, {
        id: 80,
        name: "Ring W-Raises",
        category: "Strength",
        muscle: "Shoulders",
        difficulty: "Intermediate",
        duration: "45 sec"
      }, {
        id: 81,
        name: "Ring L-Raises",
        category: "Strength",
        muscle: "Shoulders",
        difficulty: "Intermediate",
        duration: "45 sec"
      }, {
        id: 82,
        name: "Ring I-Raises",
        category: "Strength",
        muscle: "Shoulders",
        difficulty: "Intermediate",
        duration: "45 sec"
      }, {
        id: 83,
        name: "Ring Hanging Knee Raises",
        category: "Core",
        muscle: "Abs",
        difficulty: "Intermediate",
        duration: "45 sec"
      }, {
        id: 84,
        name: "Ring Hanging Leg Raises",
        category: "Core",
        muscle: "Abs",
        difficulty: "Advanced",
        duration: "45 sec"
      }, {
        id: 85,
        name: "Ring Hanging Windshield Wipers",
        category: "Core",
        muscle: "Abs",
        difficulty: "Advanced",
        duration: "60 sec"
      }, {
        id: 86,
        name: "Ring Hanging Pike",
        category: "Core",
        muscle: "Abs",
        difficulty: "Advanced",
        duration: "45 sec"
      }, {
        id: 87,
        name: "Ring Hanging Tuck",
        category: "Core",
        muscle: "Abs",
        difficulty: "Intermediate",
        duration: "45 sec"
      }, {
        id: 88,
        name: "Ring Hanging Straddle",
        category: "Core",
        muscle: "Abs",
        difficulty: "Advanced",
        duration: "45 sec"
      }, {
        id: 89,
        name: "Ring Hanging Full",
        category: "Core",
        muscle: "Abs",
        difficulty: "Advanced",
        duration: "60 sec"
      }, {
        id: 90,
        name: "Ring Hanging Dragon Flag",
        category: "Core",
        muscle: "Abs",
        difficulty: "Advanced",
        duration: "60 sec"
      }, {
        id: 91,
        name: "Ring Hanging L-Sit",
        category: "Core",
        muscle: "Abs",
        difficulty: "Advanced",
        duration: "45 sec"
      }, {
        id: 92,
        name: "Ring Hanging V-Sit",
        category: "Core",
        muscle: "Abs",
        difficulty: "Advanced",
        duration: "45 sec"
      }, {
        id: 93,
        name: "Ring Hanging Manna",
        category: "Core",
        muscle: "Abs",
        difficulty: "Advanced",
        duration: "60 sec"
      }, {
        id: 94,
        name: "Ring Hanging Planche",
        category: "Strength",
        muscle: "Arms",
        difficulty: "Advanced",
        duration: "60 sec"
      }, {
        id: 95,
        name: "Ring Hanging Front Lever",
        category: "Strength",
        muscle: "Back",
        difficulty: "Advanced",
        duration: "60 sec"
      }, {
        id: 96,
        name: "Ring Hanging Back Lever",
        category: "Strength",
        muscle: "Back",
        difficulty: "Advanced",
        duration: "60 sec"
      }, {
        id: 97,
        name: "Ring Hanging Iron Cross",
        category: "Strength",
        muscle: "Full Body",
        difficulty: "Advanced",
        duration: "60 sec"
      }, {
        id: 98,
        name: "Ring Hanging Maltese",
        category: "Strength",
        muscle: "Full Body",
        difficulty: "Advanced",
        duration: "60 sec"
      }, {
        id: 99,
        name: "Ring Hanging Victorian",
        category: "Strength",
        muscle: "Full Body",
        difficulty: "Advanced",
        duration: "60 sec"
      }, {
        id: 100,
        name: "Ring Hanging Inverted Cross",
        category: "Strength",
        muscle: "Full Body",
        difficulty: "Advanced",
        duration: "60 sec"
      }]
    };
  },
  computed: {
    filteredActivities: function filteredActivities() {
      var _this = this;
      var activities = Array.isArray(this.dummyActivities) ? this.dummyActivities : [];
      return activities.filter(function (activity) {
        return (!_this.filters.category || activity.category === _this.filters.category) && (!_this.filters.muscle || activity.muscle === _this.filters.muscle) && (!_this.filters.difficulty || activity.difficulty === _this.filters.difficulty);
      });
    },
    paginatedActivities: function paginatedActivities() {
      var start = (this.currentPage - 1) * this.itemsPerPage;
      var end = start + this.itemsPerPage;
      return this.filteredActivities.slice(start, end);
    },
    totalPages: function totalPages() {
      return Math.ceil(this.filteredActivities.length / this.itemsPerPage);
    },
    startIndex: function startIndex() {
      return (this.currentPage - 1) * this.itemsPerPage;
    },
    endIndex: function endIndex() {
      return Math.min(this.currentPage * this.itemsPerPage, this.filteredActivities.length);
    },
    categoryOptions: function categoryOptions() {
      return [{
        value: "",
        text: "Choose Category"
      }, {
        value: "Strength",
        text: "Strength"
      }, {
        value: "Cardio",
        text: "Cardio"
      }, {
        value: "Core",
        text: "Core"
      }];
    },
    muscleOptions: function muscleOptions() {
      return [{
        value: "",
        text: "Choose Muscle Group"
      }, {
        value: "Chest",
        text: "Chest"
      }, {
        value: "Legs",
        text: "Legs"
      }, {
        value: "Abs",
        text: "Abs"
      }, {
        value: "Back",
        text: "Back"
      }, {
        value: "Full Body",
        text: "Full Body"
      }, {
        value: "Core",
        text: "Core"
      }, {
        value: "Shoulders",
        text: "Shoulders"
      }, {
        value: "Arms",
        text: "Arms"
      }];
    },
    difficultyOptions: function difficultyOptions() {
      return [{
        value: "",
        text: "Choose Difficulty"
      }, {
        value: "Beginner",
        text: "Beginner"
      }, {
        value: "Intermediate",
        text: "Intermediate"
      }, {
        value: "Advanced",
        text: "Advanced"
      }];
    },
    selectedActivitiesList: function selectedActivitiesList() {
      var _this2 = this;
      var activities = Array.isArray(this.dummyActivities) ? this.dummyActivities : [];
      return activities.filter(function (activity) {
        return _this2.selectedActivities.includes(activity.id);
      });
    },
    selectedActivitiesForWorkout: function selectedActivitiesForWorkout() {
      var _this3 = this;
      // Return full activity objects for selected activities
      var activities = Array.isArray(this.dummyActivities) ? this.dummyActivities : [];
      return activities.filter(function (activity) {
        return _this3.selectedActivities.includes(activity.id);
      });
    }
  },
  methods: {
    toggleSelection: function toggleSelection(item) {
      var exists = this.selectedActivities.includes(item.id);
      if (exists) {
        this.selectedActivities = this.selectedActivities.filter(function (id) {
          return id !== item.id;
        });
      } else {
        this.selectedActivities.push(item.id);
      }
      // Show modal after toggling selection
      if (this.selectedActivities.length > 0) {
        this.showSelectedModal = true;
      } else {
        this.showSelectedModal = false;
      }
    },
    removeActivity: function removeActivity(activityId) {
      this.selectedActivities = this.selectedActivities.filter(function (id) {
        return id !== activityId;
      });
      // Close modal if no activities selected
      if (this.selectedActivities.length === 0) {
        this.showSelectedModal = false;
      }
    },
    getBadgeColor: function getBadgeColor(difficulty) {
      switch (difficulty) {
        case "Beginner":
          return "success";
        case "Intermediate":
          return "warning";
        case "Advanced":
          return "danger";
        default:
          return "secondary";
      }
    },
    clearFilters: function clearFilters() {
      this.filters = {
        category: null,
        muscle: null,
        difficulty: null
      };
      this.currentPage = 1; // Reset pagination
    },
    clearSelection: function clearSelection() {
      this.selectedActivities = [];
      this.showSelectedModal = false;
    },
    viewActivity: function viewActivity(activity) {
      console.log("Viewing activity:", activity);
    },
    setViewMode: function setViewMode(mode) {
      this.viewMode = mode;
    },
    onPageChange: function onPageChange(page) {
      this.currentPage = page;
    },
    openCreateActivityModal: function openCreateActivityModal() {
      this.selectedActivity = null;
      this.showActivityModal = true;
    },
    openCreateWorkoutModal: function openCreateWorkoutModal() {
      if (this.selectedActivities.length === 0) {
        this.$bvToast.toast('Please select at least one activity first', {
          title: 'No Activities Selected',
          variant: 'warning',
          solid: true
        });
        return;
      }
      // Close the selected activities modal
      this.showSelectedModal = false;
      // Open the workout modal
      this.showWorkoutModal = true;
    },
    closeWorkoutModal: function closeWorkoutModal() {
      this.showWorkoutModal = false;
    },
    handleWorkoutSubmit: function handleWorkoutSubmit(workoutData) {
      var _this4 = this;
      return _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
        return _regeneratorRuntime().wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              _this4.closeWorkoutModal();

              // Refresh the activities list from the API
              _context.next = 4;
              return _this4.loadActivities();
            case 4:
              // Emit event to parent component (WorkoutLibrary) to refresh workouts
              _this4.$emit('workout-created', workoutData);

              // Show success message
              _this4.$bvToast.toast('Workout created successfully!', {
                title: 'Success',
                variant: 'success',
                solid: true,
                autoHideDelay: 1000
              });

              // Optionally clear selection after creating workout
              // this.selectedActivities = [];
              _context.next = 12;
              break;
            case 8:
              _context.prev = 8;
              _context.t0 = _context["catch"](0);
              console.error('Error handling workout submit:', _context.t0);

              // Show error message
              _this4.$bvToast.toast('Failed to create workout. Please try again.', {
                title: 'Error',
                variant: 'danger',
                solid: true,
                autoHideDelay: 1000
              });
            case 12:
            case "end":
              return _context.stop();
          }
        }, _callee, null, [[0, 8]]);
      }))();
    },
    openViewActivityModal: function openViewActivityModal(activity) {
      var _this5 = this;
      return _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee2() {
        var response;
        return _regeneratorRuntime().wrap(function _callee2$(_context2) {
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
              _context2.prev = 0;
              _context2.next = 3;
              return axios__WEBPACK_IMPORTED_MODULE_2___default().get("workout_exercises/".concat(activity.id));
            case 3:
              response = _context2.sent;
              if (response.data.success) {
                _this5.selectedActivity = response.data.exercise;
                _this5.showActivityModal = true;
              } else {
                // Fallback to the activity data we already have
                _this5.selectedActivity = _objectSpread({}, activity);
                _this5.showActivityModal = true;
              }
              _context2.next = 12;
              break;
            case 7:
              _context2.prev = 7;
              _context2.t0 = _context2["catch"](0);
              console.error('Error fetching activity details:', _context2.t0);
              // Fallback to the activity data we already have
              _this5.selectedActivity = _objectSpread({}, activity);
              _this5.showActivityModal = true;
            case 12:
            case "end":
              return _context2.stop();
          }
        }, _callee2, null, [[0, 7]]);
      }))();
    },
    closeActivityModal: function closeActivityModal() {
      this.selectedActivity = null;
      this.showActivityModal = false;
    },
    handleActivitySubmit: function handleActivitySubmit(activityData) {
      var _this6 = this;
      return _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee3() {
        var message, _message;
        return _regeneratorRuntime().wrap(function _callee3$(_context3) {
          while (1) switch (_context3.prev = _context3.next) {
            case 0:
              _context3.prev = 0;
              _this6.closeActivityModal();

              // Refresh the activities list from the API
              _context3.next = 4;
              return _this6.loadActivities();
            case 4:
              // Show success message based on whether it's a create or update
              message = _this6.selectedActivity ? 'Activity updated successfully!' : 'Activity created successfully!';
              _this6.$bvToast.toast(message, {
                title: 'Success',
                variant: 'success',
                solid: true,
                autoHideDelay: 1000
              });
              _context3.next = 13;
              break;
            case 8:
              _context3.prev = 8;
              _context3.t0 = _context3["catch"](0);
              console.error('Error handling activity submit:', _context3.t0);

              // Show error message
              _message = _this6.selectedActivity ? 'Failed to update activity. Please try again.' : 'Failed to create activity. Please try again.';
              _this6.$bvToast.toast(_message, {
                title: 'Error',
                variant: 'danger',
                solid: true,
                autoHideDelay: 1000
              });
            case 13:
            case "end":
              return _context3.stop();
          }
        }, _callee3, null, [[0, 8]]);
      }))();
    },
    confirmDeleteActivity: function confirmDeleteActivity(activity) {
      var _this7 = this;
      return _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee4() {
        var result;
        return _regeneratorRuntime().wrap(function _callee4$(_context4) {
          while (1) switch (_context4.prev = _context4.next) {
            case 0:
              _context4.next = 2;
              return _this7.$swal({
                title: 'Are you sure?',
                text: "Do you want to delete \"".concat(activity.name, "\"? This action cannot be undone."),
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#dc3545',
                cancelButtonColor: '#6c757d',
                confirmButtonText: 'Yes, delete it!',
                cancelButtonText: 'Cancel',
                reverseButtons: true
              });
            case 2:
              result = _context4.sent;
              if (!result.isConfirmed) {
                _context4.next = 6;
                break;
              }
              _context4.next = 6;
              return _this7.deleteActivity(activity);
            case 6:
            case "end":
              return _context4.stop();
          }
        }, _callee4);
      }))();
    },
    deleteActivity: function deleteActivity(activity) {
      var _this8 = this;
      return _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee5() {
        var loadingToast, response, _error$response;
        return _regeneratorRuntime().wrap(function _callee5$(_context5) {
          while (1) switch (_context5.prev = _context5.next) {
            case 0:
              _context5.prev = 0;
              // Show loading toast
              loadingToast = _this8.$bvToast.toast('Deleting activity...', {
                title: 'Please wait',
                variant: 'info',
                solid: true,
                autoHideDelay: 0,
                noCloseButton: false
              }); // Call delete API
              _context5.next = 4;
              return axios__WEBPACK_IMPORTED_MODULE_2___default()["delete"]("workout_exercises/".concat(activity.id));
            case 4:
              response = _context5.sent;
              // Close loading toast
              _this8.$bvToast.hide(loadingToast);
              if (!response.data.success) {
                _context5.next = 13;
                break;
              }
              // Remove from selected activities if it was selected
              _this8.selectedActivities = _this8.selectedActivities.filter(function (id) {
                return id !== activity.id;
              });

              // Refresh the activities list
              _context5.next = 10;
              return _this8.loadActivities();
            case 10:
              // Show success message
              _this8.$swal({
                icon: 'success',
                title: 'Deleted!',
                text: "\"".concat(activity.name, "\" has been deleted successfully."),
                timer: 2000,
                showConfirmButton: false
              });
              _context5.next = 14;
              break;
            case 13:
              throw new Error('Delete operation failed');
            case 14:
              _context5.next = 20;
              break;
            case 16:
              _context5.prev = 16;
              _context5.t0 = _context5["catch"](0);
              console.error('Error deleting activity:', _context5.t0);

              // Show error message
              _this8.$swal({
                icon: 'error',
                title: 'Error!',
                text: ((_error$response = _context5.t0.response) === null || _error$response === void 0 || (_error$response = _error$response.data) === null || _error$response === void 0 ? void 0 : _error$response.message) || "Failed to delete \"".concat(activity.name, "\". Please try again.")
              });
            case 20:
            case "end":
              return _context5.stop();
          }
        }, _callee5, null, [[0, 16]]);
      }))();
    },
    toggleDeleteSelection: function toggleDeleteSelection(activity) {
      var index = this.selectedForDelete.indexOf(activity.id);
      if (index > -1) {
        this.selectedForDelete.splice(index, 1);
      } else {
        this.selectedForDelete.push(activity.id);
      }
    },
    confirmBulkDelete: function confirmBulkDelete() {
      var _this9 = this;
      return _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee6() {
        var count, activityText, result;
        return _regeneratorRuntime().wrap(function _callee6$(_context6) {
          while (1) switch (_context6.prev = _context6.next) {
            case 0:
              if (!(_this9.selectedForDelete.length === 0)) {
                _context6.next = 2;
                break;
              }
              return _context6.abrupt("return");
            case 2:
              count = _this9.selectedForDelete.length;
              activityText = count === 1 ? 'activity' : 'activities'; // Show confirmation dialog using SweetAlert2
              _context6.next = 6;
              return _this9.$swal({
                title: 'Are you sure?',
                text: "Do you want to delete ".concat(count, " ").concat(activityText, "? This action cannot be undone."),
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#dc3545',
                cancelButtonColor: '#6c757d',
                confirmButtonText: "Yes, delete ".concat(count, " ").concat(activityText, "!"),
                cancelButtonText: 'Cancel',
                reverseButtons: true
              });
            case 6:
              result = _context6.sent;
              if (!result.isConfirmed) {
                _context6.next = 10;
                break;
              }
              _context6.next = 10;
              return _this9.bulkDeleteActivities();
            case 10:
            case "end":
              return _context6.stop();
          }
        }, _callee6);
      }))();
    },
    bulkDeleteActivities: function bulkDeleteActivities() {
      var _this10 = this;
      return _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee7() {
        var count, loadingToast, response, deletedCount, activityText, _error$response2, _count, _activityText;
        return _regeneratorRuntime().wrap(function _callee7$(_context7) {
          while (1) switch (_context7.prev = _context7.next) {
            case 0:
              if (!(_this10.selectedForDelete.length === 0)) {
                _context7.next = 2;
                break;
              }
              return _context7.abrupt("return");
            case 2:
              _context7.prev = 2;
              count = _this10.selectedForDelete.length; // Show loading toast
              loadingToast = _this10.$bvToast.toast("Deleting ".concat(count, " activities..."), {
                title: 'Please wait',
                variant: 'info',
                solid: true,
                autoHideDelay: 0,
                noCloseButton: false
              }); // Call bulk delete API
              _context7.next = 7;
              return axios__WEBPACK_IMPORTED_MODULE_2___default().post('workout_exercises/delete/by_selection', {
                selectedIds: _this10.selectedForDelete
              });
            case 7:
              response = _context7.sent;
              // Close loading toast
              _this10.$bvToast.hide(loadingToast);
              if (!response.data.success) {
                _context7.next = 19;
                break;
              }
              // Remove from selected activities if they were selected
              _this10.selectedActivities = _this10.selectedActivities.filter(function (id) {
                return !_this10.selectedForDelete.includes(id);
              });

              // Clear delete selection
              deletedCount = _this10.selectedForDelete.length;
              _this10.selectedForDelete = [];

              // Refresh the activities list
              _context7.next = 15;
              return _this10.loadActivities();
            case 15:
              // Show success message
              activityText = deletedCount === 1 ? 'activity' : 'activities';
              _this10.$swal({
                icon: 'success',
                title: 'Deleted!',
                text: "".concat(deletedCount, " ").concat(activityText, " have been deleted successfully."),
                timer: 2000,
                showConfirmButton: false
              });
              _context7.next = 20;
              break;
            case 19:
              throw new Error('Bulk delete operation failed');
            case 20:
              _context7.next = 28;
              break;
            case 22:
              _context7.prev = 22;
              _context7.t0 = _context7["catch"](2);
              console.error('Error deleting activities:', _context7.t0);

              // Show error message
              _count = _this10.selectedForDelete.length;
              _activityText = _count === 1 ? 'activity' : 'activities';
              _this10.$swal({
                icon: 'error',
                title: 'Error!',
                text: ((_error$response2 = _context7.t0.response) === null || _error$response2 === void 0 || (_error$response2 = _error$response2.data) === null || _error$response2 === void 0 ? void 0 : _error$response2.message) || "Failed to delete ".concat(_count, " ").concat(_activityText, ". Please try again.")
              });
            case 28:
            case "end":
              return _context7.stop();
          }
        }, _callee7, null, [[2, 22]]);
      }))();
    },
    loadActivities: function loadActivities() {
      var _this11 = this;
      return _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee8() {
        var response;
        return _regeneratorRuntime().wrap(function _callee8$(_context8) {
          while (1) switch (_context8.prev = _context8.next) {
            case 0:
              _context8.prev = 0;
              _context8.next = 3;
              return axios__WEBPACK_IMPORTED_MODULE_2___default().get('workout_exercises');
            case 3:
              response = _context8.sent;
              if (response.data.exercises && Array.isArray(response.data.exercises)) {
                // Transform the API data to match the expected format
                _this11.dummyActivities = response.data.exercises.map(function (exercise) {
                  return {
                    id: exercise.exercise_id,
                    // Use exercise_id instead of id
                    name: exercise.exercise_name,
                    category: exercise.category,
                    muscle: exercise.muscles_targeted || "Full Body",
                    difficulty: exercise.level,
                    duration: exercise.duration ? "".concat(exercise.duration, " min") : "30 sec",
                    description: exercise.description,
                    instructions: exercise.instructions,
                    equipment: exercise.equipment,
                    calories: exercise.calories_burned,
                    thumbnail: exercise.thumbnail ? '/' + exercise.thumbnail : '/images/Kettlebell-swing.webp',
                    videoLink: exercise.video_link,
                    tags: exercise.tags,
                    restPeriod: exercise.rest_period,
                    // New fields
                    visibleFor: exercise.visible_for,
                    primaryMuscleGroups: exercise.primary_muscle_groups,
                    secondaryMuscleGroups: exercise.secondary_muscle_groups,
                    primaryJoint: exercise.primary_joint,
                    type: exercise.type,
                    usesWeights: exercise.uses_weights,
                    intensity: exercise.intensity,
                    setsConfiguration: exercise.sets_configuration,
                    restPeriodSeconds: exercise.rest_period_seconds,
                    qrLink: exercise.qr_link,
                    manufacturer: exercise.manufacturer
                  };
                });
              }
              _context8.next = 10;
              break;
            case 7:
              _context8.prev = 7;
              _context8.t0 = _context8["catch"](0);
              // Don't log authentication errors that are being handled by the interceptor
              // (they will redirect to login)
              if (!_context8.t0.isHandled && !_context8.t0.isAuthError) {
                console.error('Error loading activities:', _context8.t0);
              }
              // Keep using dummy data if API fails
            case 10:
            case "end":
              return _context8.stop();
          }
        }, _callee8, null, [[0, 7]]);
      }))();
    },
    handleImageError: function handleImageError(event) {
      event.target.src = '/images/Kettlebell-swing.webp';
    }
  },
  mounted: function mounted() {
    // Load activities when component is mounted
    this.loadActivities();
  },
  watch: {
    filters: {
      handler: function handler() {
        // Reset to first page when filters change
        this.currentPage = 1;
      },
      deep: true
    }
  }
});

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js??clonedRuleSet-12.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12.use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-12.use[3]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/components/ActivityModal.vue?vue&type=style&index=0&id=1669f108&lang=scss&scoped=true":
/*!***********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??clonedRuleSet-12.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12.use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-12.use[3]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/components/ActivityModal.vue?vue&type=style&index=0&id=1669f108&lang=scss&scoped=true ***!
  \***********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__);
// Imports

var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default()(function(i){return i[1]});
// Module
___CSS_LOADER_EXPORT___.push([module.id, ".activity-modal .modal-content[data-v-1669f108] {\n  border: none;\n  border-radius: 16px;\n  box-shadow: 0 10px 15px rgba(0, 0, 0, 0.2);\n  background: #ffffff;\n  overflow: hidden;\n  color: #252525 !important;\n}\n.activity-modal .modal-header[data-v-1669f108] {\n  background: #f5f5f3;\n  color: #252525;\n  border-bottom: none;\n  padding: 1.5rem 2rem;\n}\n.activity-modal .modal-header .modal-title[data-v-1669f108] {\n  font-family: \"Inter\", Arial, sans-serif;\n  font-size: 1.5rem;\n  font-weight: 600;\n  margin: 0;\n}\n.activity-modal .modal-header .close[data-v-1669f108] {\n  color: #ffffff;\n  opacity: 0.8;\n  transition: opacity 0.2s ease;\n}\n.activity-modal .modal-header .close[data-v-1669f108]:hover {\n  opacity: 1;\n}\n.activity-modal .modal-body[data-v-1669f108] {\n  padding: 2rem;\n  background: #f5f5f3;\n  color: #252525;\n}\n.activity-modal .modal-dialog[data-v-1669f108] {\n  transform: scale(0.8);\n  transition: transform 0.3s ease;\n}\n.activity-modal.show .modal-dialog[data-v-1669f108] {\n  transform: scale(1);\n}\n.activity-modal .modal-body[data-v-1669f108]::-webkit-scrollbar {\n  width: 6px;\n}\n.activity-modal .modal-body[data-v-1669f108]::-webkit-scrollbar-track {\n  background: #f5f5f3;\n  border-radius: 3px;\n}\n.activity-modal .modal-body[data-v-1669f108]::-webkit-scrollbar-thumb {\n  background: #ff4040;\n  border-radius: 3px;\n}\n.activity-modal .modal-body[data-v-1669f108]::-webkit-scrollbar-thumb:hover {\n  background: #e52e2e;\n}\n.progress-indicator[data-v-1669f108] {\n  margin-bottom: 2rem;\n  padding: 1rem;\n  background: #ffffff;\n  border-radius: 12px;\n  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);\n}\n.progress-indicator .progress-steps[data-v-1669f108] {\n  display: flex;\n  align-items: center;\n  position: relative;\n  gap: 100px;\n  justify-content: center;\n}\n.progress-indicator .progress-steps[data-v-1669f108]::before {\n  content: \"\";\n  position: absolute;\n  top: 20px;\n  left: 0;\n  right: 0;\n  height: 2px;\n  background: #e0e0e0;\n  z-index: 1;\n}\n.progress-indicator .progress-steps .step[data-v-1669f108] {\n  position: relative;\n  z-index: 2;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  cursor: pointer;\n  transition: all 0.3s ease;\n}\n.progress-indicator .progress-steps .step .step-number[data-v-1669f108] {\n  width: 40px;\n  height: 40px;\n  border-radius: 50%;\n  background: #f5f5f3;\n  border: 2px solid #e0e0e0;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-weight: 600;\n  color: #6a6a6a;\n  margin-bottom: 0.5rem;\n  transition: all 0.3s ease;\n}\n.progress-indicator .progress-steps .step .step-label[data-v-1669f108] {\n  font-size: 0.75rem;\n  color: #6a6a6a;\n  text-align: center;\n  font-weight: 500;\n  transition: color 0.3s ease;\n}\n.progress-indicator .progress-steps .step.active .step-number[data-v-1669f108] {\n  background: #ff4040;\n  border-color: #ff4040;\n  color: #ffffff;\n}\n.progress-indicator .progress-steps .step.active .step-label[data-v-1669f108] {\n  color: #ff4040;\n  font-weight: 600;\n}\n.progress-indicator .progress-steps .step.completed .step-number[data-v-1669f108] {\n  background: #4caf50;\n  border-color: #4caf50;\n  color: #ffffff;\n}\n.progress-indicator .progress-steps .step.completed .step-label[data-v-1669f108] {\n  color: #4caf50;\n}\n.progress-indicator .progress-steps .step[data-v-1669f108]:hover {\n  transform: translateY(-2px);\n}\n.step-navigation[data-v-1669f108] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  margin-bottom: 1.5rem;\n  padding: 1rem;\n  background: #ffffff;\n  border-radius: 8px;\n  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);\n}\n.step-navigation .step-counter[data-v-1669f108] {\n  font-weight: 600;\n  color: #252525;\n  font-size: 0.875rem;\n}\n.step-navigation .btn[data-v-1669f108] {\n  padding: 0.5rem 1rem;\n  font-size: 0.875rem;\n  font-weight: 500;\n  border-radius: 6px;\n  transition: all 0.3s ease;\n}\n.step-navigation .btn[data-v-1669f108]:disabled {\n  opacity: 0.5;\n  cursor: not-allowed;\n}\n.step-content[data-v-1669f108] {\n  animation: fadeIn-data-v-1669f108 0.3s ease;\n}\n@keyframes fadeIn-data-v-1669f108 {\nfrom {\n    opacity: 0;\n    transform: translateY(10px);\n}\nto {\n    opacity: 1;\n    transform: translateY(0);\n}\n}\n.activity-form .form-section[data-v-1669f108] {\n  background: #ffffff;\n  border-radius: 12px;\n  padding: 1.5rem;\n  margin-bottom: 1.5rem;\n  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);\n  border: 1px solid #e0e0e0;\n  color: #252525;\n  transition: box-shadow 0.3s ease;\n}\n.activity-form .form-section[data-v-1669f108]:hover {\n  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);\n}\n.activity-form .form-section .section-title[data-v-1669f108] {\n  font-family: \"Inter\", Arial, sans-serif;\n  font-size: 1.25rem;\n  font-weight: 600;\n  color: #252525;\n  margin-bottom: 1.25rem;\n  padding-bottom: 0.75rem;\n  border-bottom: 2px solid #dcdcdc;\n  position: relative;\n}\n.activity-form .form-section .section-title[data-v-1669f108]::after {\n  content: \"\";\n  position: absolute;\n  bottom: -2px;\n  left: 0;\n  width: 60px;\n  height: 2px;\n  background: linear-gradient(to right, #ff4040, #e52e2e);\n  border-radius: 1px;\n}\n.activity-form .form-section .subsection-title[data-v-1669f108] {\n  font-family: \"Inter\", Arial, sans-serif;\n  font-size: 1rem;\n  font-weight: 600;\n  color: #252525;\n  margin: 1.5rem 0 1rem 0;\n  padding-bottom: 0.5rem;\n  border-bottom: 1px solid #e0e0e0;\n}\n.activity-form .form-section .section-divider[data-v-1669f108] {\n  border: none;\n  height: 1px;\n  background: #e0e0e0;\n  margin: 2rem 0;\n}\n.activity-form .form-group-modern[data-v-1669f108] {\n  margin-bottom: 1.25rem;\n}\n.activity-form .form-group-modern label[data-v-1669f108] {\n  font-family: \"Inter\", Arial, sans-serif;\n  font-size: 0.875rem;\n  font-weight: 600;\n  color: #252525;\n  margin-bottom: 0.5rem;\n  display: block;\n}\n.activity-form .form-group-modern .required-asterisk[data-v-1669f108] {\n  color: #f44336;\n  font-weight: 700;\n  margin-left: 2px;\n}\n.activity-form .form-input-modern[data-v-1669f108],\n.activity-form .form-select-modern[data-v-1669f108],\n.activity-form .form-textarea-modern[data-v-1669f108] {\n  border: 2px solid #e0e0e0;\n  border-radius: 8px;\n  font-size: 0.813rem;\n  font-family: \"Inter\", Arial, sans-serif;\n  transition: all 0.3s ease;\n  box-shadow: none;\n  color: #252525;\n}\n.activity-form .form-input-modern[data-v-1669f108]:focus,\n.activity-form .form-select-modern[data-v-1669f108]:focus,\n.activity-form .form-textarea-modern[data-v-1669f108]:focus {\n  border-color: #ff4040;\n  box-shadow: 0 0 0 3px rgba(255, 64, 64, 0.1);\n  outline: none;\n}\n.activity-form .form-input-modern[data-v-1669f108]::-moz-placeholder, .activity-form .form-select-modern[data-v-1669f108]::-moz-placeholder, .activity-form .form-textarea-modern[data-v-1669f108]::-moz-placeholder {\n  color: #999999;\n}\n.activity-form .form-input-modern[data-v-1669f108]::placeholder,\n.activity-form .form-select-modern[data-v-1669f108]::placeholder,\n.activity-form .form-textarea-modern[data-v-1669f108]::placeholder {\n  color: #999999;\n}\n.activity-form .form-textarea-modern[data-v-1669f108] {\n  resize: vertical;\n  min-height: 70px;\n}\n.activity-form .upload-hint[data-v-1669f108] {\n  background: #e3f2fd;\n  border: 1px solid #2196f3;\n  border-radius: 6px;\n  padding: 0.75rem;\n  margin-bottom: 0.75rem;\n  font-size: 0.875rem;\n  color: rgb(11.5384615385, 124.0384615385, 213.4615384615);\n}\n.activity-form .upload-hint i[data-v-1669f108] {\n  margin-right: 0.5rem;\n  color: #2196f3;\n}\n.activity-form .difficulty-slider .form-range[data-v-1669f108] {\n  width: 100%;\n  height: 6px;\n  border-radius: 3px;\n  background: #e0e0e0;\n  outline: none;\n  -webkit-appearance: none;\n  -moz-appearance: none;\n       appearance: none;\n}\n.activity-form .difficulty-slider .form-range[data-v-1669f108]::-webkit-slider-thumb {\n  -webkit-appearance: none;\n  appearance: none;\n  width: 20px;\n  height: 20px;\n  border-radius: 50%;\n  background: #ff4040;\n  cursor: pointer;\n  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);\n}\n.activity-form .difficulty-slider .form-range[data-v-1669f108]::-moz-range-thumb {\n  width: 20px;\n  height: 20px;\n  border-radius: 50%;\n  background: #ff4040;\n  cursor: pointer;\n  border: none;\n  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);\n}\n.activity-form .difficulty-slider .difficulty-label[data-v-1669f108] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  margin-top: 0.5rem;\n}\n.activity-form .difficulty-slider .difficulty-label .difficulty-value[data-v-1669f108] {\n  font-weight: 600;\n  color: #ff4040;\n}\n.activity-form .difficulty-slider .difficulty-label .difficulty-number[data-v-1669f108] {\n  color: #6a6a6a;\n  font-size: 0.875rem;\n}\n.activity-form .completion-summary[data-v-1669f108] {\n  background: #e8f5e9;\n  border: 1px solid #4caf50;\n  border-radius: 8px;\n  padding: 1rem;\n  margin-top: 1rem;\n  text-align: center;\n}\n.activity-form .completion-summary h5[data-v-1669f108] {\n  color: #4caf50;\n  margin-bottom: 0.5rem;\n  font-weight: 600;\n}\n.activity-form .completion-summary h5 i[data-v-1669f108] {\n  margin-right: 0.5rem;\n}\n.activity-form .completion-summary p[data-v-1669f108] {\n  color: rgb(60.5577689243, 139.4422310757, 63.7450199203);\n  margin: 0;\n  font-size: 0.875rem;\n}\n.activity-form .form-checkbox-modern .custom-control-label[data-v-1669f108] {\n  font-size: 0.875rem;\n  color: #252525;\n  cursor: pointer;\n}\n.activity-form .form-checkbox-modern .custom-control-input:checked ~ .custom-control-label[data-v-1669f108]::before {\n  background-color: #ff4040;\n  border-color: #ff4040;\n}\n.activity-form .sets-configuration[data-v-1669f108] {\n  margin-top: 1.5rem;\n  padding: 1rem;\n  background: #f5f5f3;\n  border-radius: 8px;\n  border: 1px solid #e0e0e0;\n}\n.activity-form .sets-configuration .sets-title[data-v-1669f108] {\n  font-size: 1rem;\n  font-weight: 600;\n  color: #252525;\n  margin-bottom: 1rem;\n}\n.activity-form .sets-configuration .sets-table .sets-header[data-v-1669f108] {\n  display: grid;\n  grid-template-columns: 60px 1fr 1fr;\n  gap: 1rem;\n  padding: 0.5rem 0;\n  border-bottom: 2px solid #dcdcdc;\n  font-weight: 600;\n  color: #252525;\n  font-size: 0.875rem;\n}\n.activity-form .sets-configuration .sets-table .set-row[data-v-1669f108] {\n  display: grid;\n  grid-template-columns: 60px 1fr 1fr;\n  gap: 1rem;\n  padding: 0.75rem 0;\n  border-bottom: 1px solid #e0e0e0;\n  align-items: center;\n}\n.activity-form .sets-configuration .sets-table .set-row[data-v-1669f108]:last-child {\n  border-bottom: none;\n}\n.activity-form .sets-configuration .sets-table .set-row .set-number[data-v-1669f108] {\n  font-weight: 600;\n  color: #ff4040;\n  text-align: center;\n}\n.activity-form .sets-configuration .sets-table .set-row .reps-column[data-v-1669f108],\n.activity-form .sets-configuration .sets-table .set-row .pause-column[data-v-1669f108] {\n  display: flex;\n  align-items: center;\n  gap: 0.5rem;\n}\n.activity-form .sets-configuration .sets-table .set-row .reps-column .set-input[data-v-1669f108],\n.activity-form .sets-configuration .sets-table .set-row .pause-column .set-input[data-v-1669f108] {\n  flex: 1;\n  max-width: 80px;\n}\n.activity-form .sets-configuration .sets-table .set-row .reps-column .unit[data-v-1669f108],\n.activity-form .sets-configuration .sets-table .set-row .pause-column .unit[data-v-1669f108] {\n  font-size: 0.875rem;\n  color: #6a6a6a;\n  font-weight: 500;\n}\n.activity-form .file-upload-wrapper[data-v-1669f108], .activity-form .thumbnail-box[data-v-1669f108] {\n  position: relative;\n  border: 2px dashed #cccccc;\n  border-radius: 12px;\n  padding: 2rem;\n  text-align: center;\n  background: #f5f5f3;\n  transition: all 0.3s ease;\n  cursor: pointer;\n}\n.activity-form .file-upload-wrapper[data-v-1669f108]:hover, .activity-form .thumbnail-box[data-v-1669f108]:hover {\n  border-color: #ff4040;\n  background: rgba(255, 64, 64, 0.02);\n}\n.activity-form .file-upload-wrapper .file-input-modern[data-v-1669f108], .activity-form .thumbnail-box .file-input-modern[data-v-1669f108] {\n  position: absolute;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n  opacity: 0;\n  cursor: pointer;\n  z-index: 2;\n}\n.activity-form .file-upload-wrapper .file-upload-overlay[data-v-1669f108], .activity-form .thumbnail-box .file-upload-overlay[data-v-1669f108] {\n  position: relative;\n  z-index: 1;\n  color: #6a6a6a;\n}\n.activity-form .file-upload-wrapper .file-upload-overlay i[data-v-1669f108], .activity-form .thumbnail-box .file-upload-overlay i[data-v-1669f108] {\n  font-size: 2rem;\n  margin-bottom: 0.5rem;\n  display: block;\n  color: #ff4040;\n}\n.activity-form .file-upload-wrapper .file-upload-overlay span[data-v-1669f108], .activity-form .thumbnail-box .file-upload-overlay span[data-v-1669f108] {\n  font-size: 0.875rem;\n  font-weight: 500;\n}\n.activity-form .thumbnail-box[data-v-1669f108] {\n  height: 370px;\n  padding: 0;\n}\n.activity-form .file-upload-overlay[data-v-1669f108] {\n  position: absolute;\n  top: 0;\n  bottom: 0;\n  right: 0;\n  left: 0;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  color: #6a6a6a;\n  font-size: 1rem;\n  pointer-events: none;\n  z-index: 1;\n}\n.activity-form .thumbnail-overlay-preview[data-v-1669f108] {\n  position: relative;\n  height: 100%;\n  width: 100%;\n  z-index: 2;\n}\n.activity-form .thumbnail-image[data-v-1669f108] {\n  -o-object-fit: cover;\n     object-fit: cover;\n  height: 100%;\n  width: 100%;\n  border-radius: 12px;\n}\n.activity-form .thumbnail-actions[data-v-1669f108] {\n  position: absolute;\n  top: 8px;\n  right: 8px;\n  display: flex;\n  gap: 5px;\n  z-index: 3;\n}\n.activity-form .thumbnail-actions .btn[data-v-1669f108] {\n  padding: 0.3rem 0.5rem;\n}\n.activity-form .video-preview[data-v-1669f108] {\n  margin-top: 1rem;\n  border-radius: 8px;\n  overflow: hidden;\n  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);\n}\n.activity-form .video-preview .video-player[data-v-1669f108] {\n  width: 100%;\n  max-height: 300px;\n  -o-object-fit: cover;\n     object-fit: cover;\n  border-radius: 8px;\n}\n.activity-form .video-tabs[data-v-1669f108] {\n  margin-bottom: 1rem;\n  border-bottom: 2px solid #e0e0e0;\n}\n.activity-form .video-tabs .nav-link[data-v-1669f108] {\n  border: none;\n  border-radius: 8px 8px 0 0;\n  color: #6a6a6a;\n  font-weight: 500;\n  padding: 0.75rem 1rem;\n  transition: all 0.3s ease;\n}\n.activity-form .video-tabs .nav-link[data-v-1669f108]:hover {\n  color: #ff4040;\n  background: rgba(255, 64, 64, 0.05);\n}\n.activity-form .video-tabs .nav-link.active[data-v-1669f108] {\n  color: #ff4040;\n  background: rgba(255, 64, 64, 0.1);\n  border-bottom: 2px solid #ff4040;\n}\n.activity-form .video-tabs .nav-link i[data-v-1669f108] {\n  margin-right: 0.5rem;\n}\n.activity-form .video-selection-content[data-v-1669f108] {\n  min-height: 200px;\n  padding: 1rem;\n  background: #f5f5f3;\n  border-radius: 8px;\n  border: 1px solid #e0e0e0;\n}\n.activity-form .video-grid[data-v-1669f108] {\n  display: grid;\n  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));\n  gap: 1rem;\n  max-height: 300px;\n  overflow-y: auto;\n  padding: 0.5rem;\n}\n.activity-form .video-grid[data-v-1669f108]::-webkit-scrollbar {\n  width: 6px;\n}\n.activity-form .video-grid[data-v-1669f108]::-webkit-scrollbar-track {\n  background: #f5f5f3;\n  border-radius: 3px;\n}\n.activity-form .video-grid[data-v-1669f108]::-webkit-scrollbar-thumb {\n  background: #ff4040;\n  border-radius: 3px;\n}\n.activity-form .video-grid[data-v-1669f108]::-webkit-scrollbar-thumb:hover {\n  background: #e52e2e;\n}\n.activity-form .video-item[data-v-1669f108] {\n  position: relative;\n  background: #ffffff;\n  border-radius: 8px;\n  overflow: hidden;\n  cursor: pointer;\n  transition: all 0.3s ease;\n  border: 2px solid transparent;\n}\n.activity-form .video-item[data-v-1669f108]:hover {\n  transform: translateY(-2px);\n  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);\n  border-color: rgba(255, 64, 64, 0.3);\n}\n.activity-form .video-item.selected[data-v-1669f108] {\n  border-color: #ff4040;\n  box-shadow: 0 0 0 3px rgba(255, 64, 64, 0.1);\n}\n.activity-form .video-item .video-preview[data-v-1669f108] {\n  position: relative;\n  height: 100px;\n  margin: 0;\n  cursor: pointer;\n}\n.activity-form .video-item .video-preview .thumbnail-container[data-v-1669f108] {\n  position: relative;\n  height: 100%;\n  width: 100%;\n}\n.activity-form .video-item .video-preview .video-thumbnail[data-v-1669f108] {\n  width: 100%;\n  height: 100%;\n  -o-object-fit: cover;\n     object-fit: cover;\n  background: #f5f5f3;\n  border-radius: 8px;\n}\n.activity-form .video-item .video-preview .no-thumbnail[data-v-1669f108] {\n  width: 100%;\n  height: 100%;\n  background: #f5f5f3;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  color: #6a6a6a;\n  border-radius: 8px;\n  position: relative;\n}\n.activity-form .video-item .video-preview .no-thumbnail i[data-v-1669f108] {\n  font-size: 1.5rem;\n  margin-bottom: 0.25rem;\n}\n.activity-form .video-item .video-preview .no-thumbnail span[data-v-1669f108] {\n  font-size: 0.75rem;\n}\n.activity-form .video-item .video-preview .play-overlay[data-v-1669f108] {\n  position: absolute;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  background: rgba(0, 0, 0, 0.5);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  opacity: 0;\n  transition: opacity 0.3s ease;\n  border-radius: 8px;\n}\n.activity-form .video-item .video-preview .play-overlay i[data-v-1669f108] {\n  color: #ffffff;\n  font-size: 1.5rem;\n  background: rgba(0, 0, 0, 0.7);\n  border-radius: 50%;\n  width: 40px;\n  height: 40px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  transition: transform 0.3s ease;\n}\n.activity-form .video-item .video-preview:hover .play-overlay[data-v-1669f108] {\n  opacity: 1;\n}\n.activity-form .video-item .video-preview:hover .play-overlay i[data-v-1669f108] {\n  transform: scale(1.1);\n}\n.activity-form .video-item .video-info[data-v-1669f108] {\n  padding: 0.5rem;\n}\n.activity-form .video-item .video-info .video-name[data-v-1669f108] {\n  font-size: 0.875rem;\n  font-weight: 600;\n  color: #252525;\n  margin: 0 0 0.25rem 0;\n  line-height: 1.2;\n  display: -webkit-box;\n  -webkit-line-clamp: 2;\n  line-clamp: 2;\n  -webkit-box-orient: vertical;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n.activity-form .video-item .video-info .video-size[data-v-1669f108] {\n  color: #6a6a6a;\n  font-size: 0.75rem;\n}\n.activity-form .video-item .selected-indicator[data-v-1669f108] {\n  position: absolute;\n  top: 0.5rem;\n  right: 0.5rem;\n  background: #ff4040;\n  color: #ffffff;\n  border-radius: 50%;\n  width: 24px;\n  height: 24px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-size: 0.75rem;\n  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);\n}\n.activity-form .form-actions[data-v-1669f108] {\n  background: #ffffff;\n  border-radius: 12px;\n  padding: 1.5rem;\n  margin-top: 2rem;\n  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);\n  border: 1px solid #e0e0e0;\n}\n.activity-form .form-actions .action-buttons[data-v-1669f108] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n}\n.activity-form .form-actions .action-buttons .primary-actions[data-v-1669f108] {\n  display: flex;\n  gap: 1rem;\n}\n.activity-form .form-actions .action-buttons .btn[data-v-1669f108] {\n  padding: 0.75rem 1.5rem;\n  font-size: 0.813rem;\n  font-weight: 600;\n  border-radius: 8px;\n  transition: all 0.3s ease;\n  display: flex;\n  align-items: center;\n  gap: 0.5rem;\n}\n.activity-form .form-actions .action-buttons .btn[data-v-1669f108]:hover {\n  transform: translateY(-2px);\n  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);\n}\n.activity-form .form-actions .action-buttons .btn[data-v-1669f108]:active {\n  transform: translateY(0);\n}\n.activity-form .form-actions .action-buttons .btn.btn-outline-secondary[data-v-1669f108] {\n  border: 2px solid #cccccc;\n  color: #6a6a6a;\n}\n.activity-form .form-actions .action-buttons .btn.btn-outline-secondary[data-v-1669f108]:hover {\n  border-color: #ff4040;\n  color: #ffffff;\n}\n.activity-form .form-actions .action-buttons .btn.btn-primary[data-v-1669f108] {\n  background: linear-gradient(to right, #ff4040, #e52e2e);\n  border: none;\n  color: #ffffff;\n}\n.activity-form .form-actions .action-buttons .btn.btn-success[data-v-1669f108] {\n  background: linear-gradient(to right, #ff4040, #e52e2e);\n  border: none;\n  color: #ffffff;\n}\n@media (max-width: 768px) {\n.progress-indicator .progress-steps[data-v-1669f108] {\n    flex-wrap: wrap;\n    gap: 1rem;\n}\n.progress-indicator .progress-steps .step[data-v-1669f108] {\n    flex: 1;\n    min-width: 80px;\n}\n.progress-indicator .progress-steps .step .step-label[data-v-1669f108] {\n    font-size: 0.7rem;\n}\n.step-navigation[data-v-1669f108] {\n    flex-direction: column;\n    gap: 1rem;\n}\n.step-navigation .btn[data-v-1669f108] {\n    width: 100%;\n}\n.activity-form .form-section[data-v-1669f108] {\n    padding: 1rem;\n    margin-bottom: 1rem;\n}\n.activity-form .form-actions[data-v-1669f108] {\n    padding: 1rem;\n}\n.activity-form .form-actions .action-buttons[data-v-1669f108] {\n    flex-direction: column;\n    gap: 1rem;\n}\n.activity-form .form-actions .action-buttons .primary-actions[data-v-1669f108] {\n    width: 100%;\n}\n.activity-form .form-actions .action-buttons .primary-actions .btn[data-v-1669f108] {\n    flex: 1;\n}\n.activity-form .sets-configuration .sets-table .sets-header[data-v-1669f108],\n  .activity-form .sets-configuration .sets-table .set-row[data-v-1669f108] {\n    grid-template-columns: 50px 1fr 1fr;\n    gap: 0.5rem;\n}\n.activity-form .sets-configuration .sets-table .reps-column .set-input[data-v-1669f108],\n  .activity-form .sets-configuration .sets-table .pause-column .set-input[data-v-1669f108] {\n    max-width: 60px;\n}\n.activity-modal .modal-body[data-v-1669f108] {\n    padding: 1rem;\n}\n}", ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js??clonedRuleSet-12.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12.use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-12.use[3]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/components/VideoPlayerModal.vue?vue&type=style&index=0&id=7f19add2&lang=scss&scoped=true":
/*!**************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??clonedRuleSet-12.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12.use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-12.use[3]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/components/VideoPlayerModal.vue?vue&type=style&index=0&id=7f19add2&lang=scss&scoped=true ***!
  \**************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__);
// Imports

var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default()(function(i){return i[1]});
// Module
___CSS_LOADER_EXPORT___.push([module.id, ".video-player-modal .modal-content[data-v-7f19add2] {\n  border: none;\n  border-radius: 16px;\n  box-shadow: 0 10px 15px rgba(0, 0, 0, 0.2);\n}\n.video-player-modal .modal-header[data-v-7f19add2] {\n  background: #f5f5f3;\n  color: #252525;\n  border-bottom: none;\n  padding: 1.5rem 2rem;\n}\n.video-player-modal .modal-header .modal-title[data-v-7f19add2] {\n  font-family: \"Inter\", Arial, sans-serif;\n  font-size: 1.5rem;\n  font-weight: 600;\n  margin: 0;\n}\n.video-player-modal .modal-body[data-v-7f19add2] {\n  padding: 2rem;\n  background: #f5f5f3;\n  color: #252525;\n}\n.video-player-modal .video-player-container video[data-v-7f19add2] {\n  border-radius: 8px;\n  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);\n}", ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js??clonedRuleSet-12.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12.use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-12.use[3]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/components/WorkoutModal.vue?vue&type=style&index=0&id=2ea20454&lang=scss&scoped=true":
/*!**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??clonedRuleSet-12.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12.use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-12.use[3]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/components/WorkoutModal.vue?vue&type=style&index=0&id=2ea20454&lang=scss&scoped=true ***!
  \**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__);
// Imports

var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default()(function(i){return i[1]});
// Module
___CSS_LOADER_EXPORT___.push([module.id, ".workout-modal .modal-content[data-v-2ea20454] {\n  border: none;\n  border-radius: 16px;\n  box-shadow: 0 10px 15px rgba(0, 0, 0, 0.2);\n  background: #ffffff;\n  overflow: hidden;\n  color: #252525 !important;\n}\n.workout-modal .modal-header[data-v-2ea20454] {\n  background: linear-gradient(to right, #ff4040, #e52e2e);\n  color: #ffffff;\n  border-bottom: none;\n  padding: 1.5rem 2rem;\n}\n.workout-modal .modal-header .modal-title[data-v-2ea20454] {\n  font-family: \"Inter\", Arial, sans-serif;\n  font-size: 1.5rem;\n  font-weight: 600;\n  margin: 0;\n}\n.workout-modal .modal-header .close[data-v-2ea20454] {\n  color: #ffffff;\n  opacity: 0.8;\n  transition: opacity 0.2s ease;\n}\n.workout-modal .modal-header .close[data-v-2ea20454]:hover {\n  opacity: 1;\n}\n.workout-modal .modal-body[data-v-2ea20454] {\n  padding: 2rem;\n  background: #f5f5f3;\n  color: #252525;\n}\n.workout-modal .modal-dialog[data-v-2ea20454] {\n  transform: scale(0.8);\n  transition: transform 0.3s ease;\n}\n.workout-modal.show .modal-dialog[data-v-2ea20454] {\n  transform: scale(1);\n}\n.workout-modal .modal-body[data-v-2ea20454]::-webkit-scrollbar {\n  width: 6px;\n}\n.workout-modal .modal-body[data-v-2ea20454]::-webkit-scrollbar-track {\n  background: #f5f5f3;\n  border-radius: 3px;\n}\n.workout-modal .modal-body[data-v-2ea20454]::-webkit-scrollbar-thumb {\n  background: #ff4040;\n  border-radius: 3px;\n}\n.workout-modal .modal-body[data-v-2ea20454]::-webkit-scrollbar-thumb:hover {\n  background: #e52e2e;\n}\n.workout-form .form-section[data-v-2ea20454] {\n  background: #ffffff;\n  border-radius: 12px;\n  padding: 1.5rem;\n  margin-bottom: 1.5rem;\n  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);\n  border: 1px solid #e0e0e0;\n  color: #252525;\n  transition: box-shadow 0.3s ease;\n}\n.workout-form .form-section[data-v-2ea20454]:hover {\n  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);\n}\n.workout-form .form-section .section-title[data-v-2ea20454] {\n  font-family: \"Inter\", Arial, sans-serif;\n  font-size: 1.25rem;\n  font-weight: 600;\n  color: #252525;\n  margin-bottom: 1.25rem;\n  padding-bottom: 0.75rem;\n  border-bottom: 2px solid #dcdcdc;\n  position: relative;\n}\n.workout-form .form-section .section-title[data-v-2ea20454]::after {\n  content: \"\";\n  position: absolute;\n  bottom: -2px;\n  left: 0;\n  width: 60px;\n  height: 2px;\n  background: linear-gradient(to right, #ff4040, #e52e2e);\n  border-radius: 1px;\n}\n.workout-form .form-group-modern[data-v-2ea20454] {\n  margin-bottom: 1.25rem;\n}\n.workout-form .form-group-modern label[data-v-2ea20454] {\n  font-family: \"Inter\", Arial, sans-serif;\n  font-size: 0.875rem;\n  font-weight: 600;\n  color: #252525;\n  margin-bottom: 0.5rem;\n  display: block;\n}\n.workout-form .form-group-modern label .text-danger[data-v-2ea20454] {\n  color: #f44336 !important;\n  font-weight: bold;\n  margin-left: 2px;\n}\n.workout-form .form-input-modern[data-v-2ea20454],\n.workout-form .form-select-modern[data-v-2ea20454],\n.workout-form .form-textarea-modern[data-v-2ea20454] {\n  border: 2px solid #e0e0e0;\n  border-radius: 8px;\n  font-size: 0.813rem;\n  font-family: \"Inter\", Arial, sans-serif;\n  transition: all 0.3s ease;\n  box-shadow: none;\n  color: #252525;\n}\n.workout-form .form-input-modern[data-v-2ea20454]:focus,\n.workout-form .form-select-modern[data-v-2ea20454]:focus,\n.workout-form .form-textarea-modern[data-v-2ea20454]:focus {\n  border-color: #ff4040;\n  box-shadow: 0 0 0 3px rgba(255, 64, 64, 0.1);\n  outline: none;\n}\n.workout-form .form-input-modern[data-v-2ea20454]::-moz-placeholder, .workout-form .form-select-modern[data-v-2ea20454]::-moz-placeholder, .workout-form .form-textarea-modern[data-v-2ea20454]::-moz-placeholder {\n  color: #999999;\n}\n.workout-form .form-input-modern[data-v-2ea20454]::placeholder,\n.workout-form .form-select-modern[data-v-2ea20454]::placeholder,\n.workout-form .form-textarea-modern[data-v-2ea20454]::placeholder {\n  color: #999999;\n}\n.workout-form .form-input-modern.is-invalid[data-v-2ea20454],\n.workout-form .form-select-modern.is-invalid[data-v-2ea20454],\n.workout-form .form-textarea-modern.is-invalid[data-v-2ea20454] {\n  border-color: #f44336;\n  box-shadow: 0 0 0 3px rgba(244, 67, 54, 0.1);\n}\n.workout-form .form-input-modern.is-invalid[data-v-2ea20454]:focus,\n.workout-form .form-select-modern.is-invalid[data-v-2ea20454]:focus,\n.workout-form .form-textarea-modern.is-invalid[data-v-2ea20454]:focus {\n  border-color: #f44336;\n  box-shadow: 0 0 0 3px rgba(244, 67, 54, 0.2);\n}\n.workout-form .invalid-feedback[data-v-2ea20454] {\n  display: block;\n  width: 100%;\n  margin-top: 0.25rem;\n  font-size: 0.75rem;\n  color: #f44336;\n  font-weight: 500;\n}\n.workout-form .form-textarea-modern[data-v-2ea20454] {\n  resize: vertical;\n  min-height: 70px;\n}\n.workout-form .file-upload-wrapper[data-v-2ea20454], .workout-form .thumbnail-box[data-v-2ea20454] {\n  position: relative;\n  border: 2px dashed #cccccc;\n  border-radius: 12px;\n  padding: 2rem;\n  text-align: center;\n  background: #f5f5f3;\n  transition: all 0.3s ease;\n  cursor: pointer;\n}\n.workout-form .file-upload-wrapper[data-v-2ea20454]:hover, .workout-form .thumbnail-box[data-v-2ea20454]:hover {\n  border-color: #ff4040;\n  background: rgba(255, 64, 64, 0.02);\n}\n.workout-form .file-upload-wrapper .file-input-modern[data-v-2ea20454], .workout-form .thumbnail-box .file-input-modern[data-v-2ea20454] {\n  position: absolute;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n  opacity: 0;\n  cursor: pointer;\n  z-index: 2;\n}\n.workout-form .file-upload-wrapper .file-upload-overlay[data-v-2ea20454], .workout-form .thumbnail-box .file-upload-overlay[data-v-2ea20454] {\n  position: relative;\n  z-index: 1;\n  color: #6a6a6a;\n}\n.workout-form .file-upload-wrapper .file-upload-overlay i[data-v-2ea20454], .workout-form .thumbnail-box .file-upload-overlay i[data-v-2ea20454] {\n  font-size: 2rem;\n  margin-bottom: 0.5rem;\n  display: block;\n  color: #ff4040;\n}\n.workout-form .file-upload-wrapper .file-upload-overlay span[data-v-2ea20454], .workout-form .thumbnail-box .file-upload-overlay span[data-v-2ea20454] {\n  font-size: 0.875rem;\n  font-weight: 500;\n}\n.workout-form .thumbnail-box[data-v-2ea20454] {\n  height: 150px;\n  padding: 0;\n}\n.workout-form .file-upload-overlay[data-v-2ea20454] {\n  position: absolute;\n  top: 0;\n  bottom: 0;\n  right: 0;\n  left: 0;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  color: #6a6a6a;\n  font-size: 1rem;\n  pointer-events: none;\n  z-index: 1;\n}\n.workout-form .thumbnail-overlay-preview[data-v-2ea20454] {\n  position: relative;\n  height: 100%;\n  width: 100%;\n  z-index: 2;\n}\n.workout-form .thumbnail-image[data-v-2ea20454] {\n  -o-object-fit: contain;\n     object-fit: contain;\n  -o-object-position: center;\n     object-position: center;\n  height: 100%;\n  width: 100%;\n  min-height: 150px;\n  border-radius: 12px;\n  background: #f5f5f3;\n  display: block;\n}\n.workout-form .thumbnail-actions[data-v-2ea20454] {\n  position: absolute;\n  top: 8px;\n  right: 8px;\n  display: flex;\n  gap: 5px;\n  z-index: 3;\n}\n.workout-form .thumbnail-actions .btn[data-v-2ea20454] {\n  padding: 0.3rem 0.5rem;\n}\n.workout-form .thumbnail-overlay-hint[data-v-2ea20454] {\n  position: absolute;\n  bottom: 8px;\n  left: 50%;\n  transform: translateX(-50%);\n  background: rgba(0, 0, 0, 0.7);\n  color: white;\n  padding: 0.4rem 0.8rem;\n  border-radius: 6px;\n  font-size: 0.75rem;\n  display: flex;\n  align-items: center;\n  gap: 0.4rem;\n  pointer-events: auto;\n  cursor: pointer;\n  z-index: 3;\n  transition: background 0.2s ease;\n}\n.workout-form .thumbnail-overlay-hint[data-v-2ea20454]:hover {\n  background: rgba(0, 0, 0, 0.85);\n}\n.workout-form .thumbnail-overlay-hint i[data-v-2ea20454] {\n  font-size: 0.8rem;\n}\n.workout-form .thumbnail-navigation[data-v-2ea20454] {\n  position: absolute;\n  top: 50%;\n  left: 0;\n  right: 0;\n  transform: translateY(-50%);\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  padding: 0 0.5rem;\n  pointer-events: none;\n  z-index: 4;\n}\n.workout-form .thumbnail-navigation .btn-navigation[data-v-2ea20454] {\n  pointer-events: auto;\n  background: rgba(255, 255, 255, 0.9);\n  border: 2px solid rgba(255, 64, 64, 0.8);\n  color: #ff4040;\n  width: 36px;\n  height: 36px;\n  border-radius: 50%;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  padding: 0;\n  transition: all 0.2s ease;\n  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);\n}\n.workout-form .thumbnail-navigation .btn-navigation[data-v-2ea20454]:hover {\n  background: #ffffff;\n  border-color: #ff4040;\n  transform: scale(1.1);\n  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);\n}\n.workout-form .thumbnail-navigation .btn-navigation[data-v-2ea20454]:active {\n  transform: scale(0.95);\n}\n.workout-form .thumbnail-navigation .btn-navigation i[data-v-2ea20454] {\n  font-size: 0.875rem;\n  font-weight: bold;\n}\n.workout-form .thumbnail-navigation .btn-navigation-left[data-v-2ea20454] {\n  margin-right: auto;\n}\n.workout-form .thumbnail-navigation .btn-navigation-right[data-v-2ea20454] {\n  margin-left: auto;\n}\n.workout-form .video-preview[data-v-2ea20454] {\n  margin-top: 1rem;\n  border-radius: 8px;\n  overflow: hidden;\n  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);\n}\n.workout-form .video-preview .video-player[data-v-2ea20454] {\n  width: 100%;\n  max-height: 300px;\n  -o-object-fit: cover;\n     object-fit: cover;\n  border-radius: 8px;\n}\n.workout-form .reps-inputs-row[data-v-2ea20454] {\n  display: grid;\n  grid-template-columns: repeat(9, 1fr);\n  gap: 0.75rem;\n}\n.workout-form .reps-inputs-row .reps-input[data-v-2ea20454] {\n  min-width: 0;\n}\n.workout-form .preset-weights-wrapper[data-v-2ea20454] {\n  display: flex !important;\n  align-items: center !important;\n  gap: 0.75rem;\n  flex-wrap: nowrap;\n  margin-left: 40px !important;\n  padding: 0 !important;\n  width: 100%;\n}\n.workout-form .preset-weights-wrapper .preset-weights-toggle[data-v-2ea20454] {\n  margin: 0 !important;\n  padding: 0 !important;\n  flex-shrink: 0;\n  display: inline-flex !important;\n  align-items: center !important;\n  position: relative;\n}\n.workout-form .preset-weights-wrapper .preset-weights-toggle.custom-control[data-v-2ea20454] {\n  padding-left: 0 !important;\n  min-height: auto !important;\n  height: auto !important;\n  display: inline-flex !important;\n}\n.workout-form .preset-weights-wrapper .preset-weights-toggle.custom-switch[data-v-2ea20454] {\n  padding-left: 0 !important;\n  margin-bottom: 0 !important;\n  min-height: auto !important;\n  height: auto !important;\n}\n.workout-form .preset-weights-wrapper .preset-weights-toggle.custom-switch .custom-control-input[data-v-2ea20454] {\n  margin: 0 !important;\n  position: absolute;\n  z-index: -1;\n  opacity: 0;\n}\n.workout-form .preset-weights-wrapper .preset-weights-toggle.custom-switch .custom-control-label[data-v-2ea20454] {\n  padding-left: 2.25rem !important;\n  padding-top: 0 !important;\n  padding-bottom: 0 !important;\n  padding-right: 0 !important;\n  margin-bottom: 0 !important;\n  margin-top: 0 !important;\n  margin-left: 0 !important;\n  margin-right: 0 !important;\n  display: flex;\n  align-items: center;\n  line-height: 1.5 !important;\n  cursor: pointer;\n  position: relative;\n  min-height: auto !important;\n  vertical-align: middle;\n}\n.workout-form .preset-weights-wrapper .preset-weights-toggle.custom-switch .custom-control-label[data-v-2ea20454]::before {\n  left: 0 !important;\n  top: 0.125rem !important;\n  height: 1.25rem !important;\n  width: 2rem !important;\n  border-radius: 0.625rem !important;\n  margin: 0 !important;\n  padding: 0 !important;\n  position: absolute !important;\n}\n.workout-form .preset-weights-wrapper .preset-weights-toggle.custom-switch .custom-control-label[data-v-2ea20454]::after {\n  left: 0.25rem !important;\n  top: 0.375rem !important;\n  width: 0.875rem !important;\n  height: 0.875rem !important;\n  border-radius: 50% !important;\n  margin: 0 !important;\n  margin-top: 0 !important;\n  margin-bottom: 0 !important;\n  margin-left: 0 !important;\n  margin-right: 0 !important;\n  padding: 0 !important;\n  position: absolute !important;\n  transform: translateX(0) translateY(0) !important;\n  box-sizing: border-box !important;\n  content: \"\" !important;\n  pointer-events: none !important;\n}\n.workout-form .preset-weights-wrapper .preset-weights-toggle .preset-weights-label[data-v-2ea20454] {\n  font-family: \"Inter\", Arial, sans-serif;\n  font-size: 0.875rem;\n  font-weight: 600;\n  color: #252525;\n  margin-left: 0.5rem !important;\n  margin-right: 0 !important;\n  margin-top: 0 !important;\n  margin-bottom: 0 !important;\n  padding: 0 !important;\n  white-space: nowrap;\n  line-height: 1.5 !important;\n  cursor: pointer;\n  -webkit-user-select: none;\n     -moz-user-select: none;\n          user-select: none;\n  display: inline-block;\n  vertical-align: middle;\n  position: relative;\n}\n.workout-form .preset-weights-wrapper .preset-weights-info-icon[data-v-2ea20454] {\n  flex-shrink: 0;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  cursor: pointer;\n  font-size: 0.9rem;\n  line-height: 1;\n  width: 1.25rem;\n  height: 1.25rem;\n  transition: transform 0.2s ease;\n  margin: 0 !important;\n  padding: 0 !important;\n}\n.workout-form .preset-weights-wrapper .preset-weights-info-icon[data-v-2ea20454]:hover {\n  transform: scale(1.1);\n}\n.workout-form .info-icon-red[data-v-2ea20454] {\n  color: #ff4040 !important;\n}\n.workout-form .selected-activities-section .selected-activities-info .selected-activities-list[data-v-2ea20454] {\n  max-height: 300px;\n  overflow-y: auto;\n  padding: 0.5rem 0;\n}\n.workout-form .selected-activities-section .selected-activities-info .selected-activities-list .selected-activity-item[data-v-2ea20454] {\n  display: flex;\n  align-items: center;\n  gap: 1rem;\n  padding: 0.75rem;\n  margin-bottom: 0.75rem;\n  background: #f5f5f3;\n  border-radius: 8px;\n  border: 1px solid #e0e0e0;\n  transition: all 0.3s ease;\n}\n.workout-form .selected-activities-section .selected-activities-info .selected-activities-list .selected-activity-item[data-v-2ea20454]:hover {\n  background: rgba(255, 64, 64, 0.02);\n  border-color: rgba(255, 64, 64, 0.2);\n}\n.workout-form .selected-activities-section .selected-activities-info .selected-activities-list .selected-activity-item .activity-item-thumbnail[data-v-2ea20454] {\n  flex-shrink: 0;\n  width: 60px;\n  height: 60px;\n  border-radius: 8px;\n  overflow: hidden;\n  background: #f8f9fa;\n}\n.workout-form .selected-activities-section .selected-activities-info .selected-activities-list .selected-activity-item .activity-item-thumbnail img[data-v-2ea20454] {\n  width: 100%;\n  height: 100%;\n  -o-object-fit: contain;\n     object-fit: contain;\n  -o-object-position: center;\n     object-position: center;\n}\n.workout-form .selected-activities-section .selected-activities-info .selected-activities-list .selected-activity-item .activity-item-info[data-v-2ea20454] {\n  flex: 1;\n  min-width: 0;\n}\n.workout-form .selected-activities-section .selected-activities-info .selected-activities-list .selected-activity-item .activity-item-info .activity-item-name[data-v-2ea20454] {\n  font-size: 0.875rem;\n  font-weight: 600;\n  color: #252525;\n  margin: 0 0 0.5rem 0;\n  line-height: 1.3;\n}\n.workout-form .selected-activities-section .selected-activities-info .selected-activities-list .selected-activity-item .activity-item-info .activity-item-meta[data-v-2ea20454] {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 0.5rem;\n}\n.workout-form .selected-activities-section .selected-activities-info .selected-activities-list .selected-activity-item .activity-item-info .activity-item-meta .meta-badge[data-v-2ea20454] {\n  font-size: 0.75rem;\n  padding: 0.25rem 0.5rem;\n  background: #ffffff;\n  border-radius: 6px;\n  color: #6a6a6a;\n  font-weight: 500;\n  border: 1px solid #e0e0e0;\n}\n.workout-form .form-actions[data-v-2ea20454] {\n  text-align: right;\n}\n.workout-form .form-actions .submit-btn[data-v-2ea20454] {\n  background: linear-gradient(to right, #ff4040, #e52e2e);\n  border: none;\n  border-radius: 8px;\n  padding: 0.75rem 2rem;\n  font-size: 0.813rem;\n  font-weight: 600;\n  color: #ffffff;\n  transition: all 0.3s ease;\n  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);\n}\n.workout-form .form-actions .submit-btn[data-v-2ea20454]:hover {\n  transform: translateY(-2px);\n  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);\n}\n.workout-form .form-actions .submit-btn[data-v-2ea20454]:active {\n  transform: translateY(0);\n}\n.workout-form .form-actions .submit-btn i[data-v-2ea20454] {\n  margin-right: 0.5rem;\n}\n@media (max-width: 768px) {\n.workout-form .form-section[data-v-2ea20454] {\n    padding: 1rem;\n    margin-bottom: 1rem;\n}\n.workout-form .form-actions[data-v-2ea20454] {\n    padding: 1rem;\n    text-align: center;\n}\n.workout-form .form-actions .submit-btn[data-v-2ea20454] {\n    width: 100%;\n}\n.workout-form .reps-inputs-row[data-v-2ea20454] {\n    grid-template-columns: repeat(3, 1fr);\n}\n.workout-modal .modal-body[data-v-2ea20454] {\n    padding: 1rem;\n}\n}", ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js??clonedRuleSet-12.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12.use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-12.use[3]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/Workout/ActivityList.vue?vue&type=style&index=0&id=18e7219c&lang=scss&scoped=true":
/*!***********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??clonedRuleSet-12.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12.use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-12.use[3]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/Workout/ActivityList.vue?vue&type=style&index=0&id=18e7219c&lang=scss&scoped=true ***!
  \***********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
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
___CSS_LOADER_EXPORT___.push([module.id, "@charset \"UTF-8\";\n.filter-btn .btn[data-v-18e7219c],\n.filter-btn .btn-secondary[data-v-18e7219c],\n.filter-btn .btn-outline-secondary[data-v-18e7219c],\n.filter-btn button.btn[data-v-18e7219c],\n.filter-btn button.btn-secondary[data-v-18e7219c] {\n  color: #000 !important;\n  background-color: transparent !important;\n  border-color: #6c757d !important;\n}\n.filter-btn .btn[data-v-18e7219c]:hover,\n.filter-btn .btn-secondary[data-v-18e7219c]:hover,\n.filter-btn .btn-outline-secondary[data-v-18e7219c]:hover,\n.filter-btn button.btn[data-v-18e7219c]:hover,\n.filter-btn button.btn-secondary[data-v-18e7219c]:hover {\n  color: #dc3545 !important;\n  background-color: transparent !important;\n  border-color: #dc3545 !important;\n  box-shadow: none !important;\n}\n.filter-btn .btn[data-v-18e7219c]:focus,\n.filter-btn .btn-secondary[data-v-18e7219c]:focus,\n.filter-btn .btn-outline-secondary[data-v-18e7219c]:focus,\n.filter-btn button.btn[data-v-18e7219c]:focus,\n.filter-btn button.btn-secondary[data-v-18e7219c]:focus {\n  color: #dc3545 !important;\n  background-color: transparent !important;\n  border-color: #dc3545 !important;\n  box-shadow: none !important;\n}\n.filter-btn .btn[data-v-18e7219c]:active,\n.filter-btn .btn-secondary[data-v-18e7219c]:active,\n.filter-btn .btn-outline-secondary[data-v-18e7219c]:active,\n.filter-btn button.btn[data-v-18e7219c]:active,\n.filter-btn button.btn-secondary[data-v-18e7219c]:active {\n  color: #dc3545 !important;\n  background-color: transparent !important;\n  border-color: #dc3545 !important;\n}\n.btn-secondary[data-v-18e7219c]:not(:disabled):not(.disabled):active:focus {\n  box-shadow: none !important;\n}\n\n/* ===========================================\n   COMMON BREADCRUMB NAVIGATION STYLES\n   =========================================== */\n.breadcrumb-nav-row[data-v-18e7219c] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  margin-bottom: 0.5rem;\n  gap: 0.5rem;\n}\n.breadcrumb-section[data-v-18e7219c] {\n  flex: 1;\n}\n.breadcrumb-section .breadcrumb-nav .breadcrumb-container[data-v-18e7219c] {\n  display: flex;\n  align-items: center;\n  gap: 1rem;\n}\n.breadcrumb-section .breadcrumb-nav .breadcrumb-container .back-button[data-v-18e7219c] {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  width: 40px;\n  height: 40px;\n  background: rgba(255, 255, 255, 0.1);\n  border: 1px solid rgba(255, 255, 255, 0.2);\n  border-radius: 8px;\n  color: #ffffff;\n  cursor: pointer;\n  transition: all 0.3s ease;\n}\n.breadcrumb-section .breadcrumb-nav .breadcrumb-container .back-button[data-v-18e7219c]:hover {\n  background: rgba(255, 255, 255, 0.15);\n  border-color: rgba(255, 255, 255, 0.3);\n  transform: translateY(-1px);\n  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);\n  color: #dc3545;\n}\n.breadcrumb-section .breadcrumb-nav .breadcrumb-container .back-button i[data-v-18e7219c] {\n  font-size: 1.1em;\n}\n.breadcrumb-section .breadcrumb-nav .breadcrumb-container .breadcrumb[data-v-18e7219c] {\n  display: flex;\n  align-items: center;\n  gap: 0.5rem;\n  margin: 0;\n  padding: 0;\n  background: none;\n  border-radius: 0;\n}\n.breadcrumb-section .breadcrumb-nav .breadcrumb-container .breadcrumb .breadcrumb-item[data-v-18e7219c] {\n  display: flex;\n  align-items: center;\n  gap: 0.5rem;\n  font-size: 0.875rem;\n  color: #ffffff;\n}\n.breadcrumb-section .breadcrumb-nav .breadcrumb-container .breadcrumb .breadcrumb-item.active[data-v-18e7219c] {\n  color: #252525;\n  font-weight: 600;\n}\n.breadcrumb-section .breadcrumb-nav .breadcrumb-container .breadcrumb .breadcrumb-item.active i[data-v-18e7219c] {\n  color: #dc3545;\n}\n.breadcrumb-section .breadcrumb-nav .breadcrumb-container .breadcrumb .breadcrumb-item a[data-v-18e7219c] {\n  display: flex;\n  align-items: center;\n  gap: 0.5rem;\n  color: #6a6a6a;\n  text-decoration: none;\n  transition: color 0.3s ease;\n}\n.breadcrumb-section .breadcrumb-nav .breadcrumb-container .breadcrumb .breadcrumb-item a[data-v-18e7219c]:hover {\n  color: #dc3545;\n}\n.breadcrumb-section .breadcrumb-nav .breadcrumb-container .breadcrumb .breadcrumb-item a:hover i[data-v-18e7219c] {\n  color: #dc3545;\n}\n.breadcrumb-section .breadcrumb-nav .breadcrumb-container .breadcrumb .breadcrumb-item a i[data-v-18e7219c] {\n  font-size: 0.9em;\n  transition: color 0.3s ease;\n}\n.breadcrumb-section .breadcrumb-nav .breadcrumb-container .breadcrumb .breadcrumb-item[data-v-18e7219c]:not(:last-child)::after {\n  content: \"›\";\n  margin-left: 0.5rem;\n  color: #6a6a6a;\n  font-size: 1.2em;\n}\n.action-section[data-v-18e7219c] {\n  display: flex;\n  align-items: center;\n}\n.action-section .action-btn[data-v-18e7219c] {\n  display: flex;\n  align-items: center;\n  gap: 0.5rem;\n  padding: 0.5rem 1rem;\n  border-radius: 8px;\n  font-size: 0.875rem;\n  font-weight: 500;\n  transition: all 0.3s ease;\n}\n.action-section .action-btn[data-v-18e7219c]:hover:not(:disabled) {\n  transform: translateY(-1px);\n  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);\n}\n.action-section .action-btn[data-v-18e7219c]:disabled {\n  opacity: 0.6;\n  cursor: not-allowed;\n}\n.action-section .action-btn i[data-v-18e7219c] {\n  font-size: 0.9em;\n}\n@media (max-width: 768px) {\n.breadcrumb-nav-row[data-v-18e7219c] {\n    flex-direction: column;\n    align-items: flex-start;\n    gap: 0.5rem;\n}\n.breadcrumb-section[data-v-18e7219c] {\n    width: 100%;\n}\n.breadcrumb-section .breadcrumb-container[data-v-18e7219c] {\n    flex-direction: column;\n    align-items: flex-start;\n    gap: 0.5rem;\n}\n.breadcrumb-section .breadcrumb-container .breadcrumb[data-v-18e7219c] {\n    flex-wrap: wrap;\n}\n.breadcrumb-section .breadcrumb-container .breadcrumb .breadcrumb-item[data-v-18e7219c] {\n    font-size: 0.8rem;\n}\n.breadcrumb-section .breadcrumb-container .breadcrumb .breadcrumb-item a[data-v-18e7219c] {\n    font-size: 0.8rem;\n}\n.action-section[data-v-18e7219c] {\n    width: 100%;\n    justify-content: flex-end;\n}\n.action-section .action-btn[data-v-18e7219c] {\n    font-size: 0.8rem;\n    padding: 0.4rem 0.8rem;\n}\n}\n/* ===========================================\n   RESPONSIVE UTILITY CLASSES (ALL DEVICES)\n   =========================================== */\n.show-xs-only[data-v-18e7219c],\n.show-sm-only[data-v-18e7219c],\n.show-md-only[data-v-18e7219c],\n.show-lg-only[data-v-18e7219c],\n.show-xl-only[data-v-18e7219c] {\n  display: none !important;\n}\n@media (max-width: 575px) {\n.hide-xs[data-v-18e7219c] {\n    display: none !important;\n}\n.show-xs-only[data-v-18e7219c] {\n    display: initial !important;\n}\n}\n@media (min-width: 576px) and (max-width: 767px) {\n.hide-sm[data-v-18e7219c] {\n    display: none !important;\n}\n.show-sm-only[data-v-18e7219c] {\n    display: initial !important;\n}\n}\n@media (min-width: 768px) and (max-width: 991px) {\n.hide-md[data-v-18e7219c] {\n    display: none !important;\n}\n.show-md-only[data-v-18e7219c] {\n    display: initial !important;\n}\n}\n@media (min-width: 992px) and (max-width: 1199px) {\n.hide-lg[data-v-18e7219c] {\n    display: none !important;\n}\n.show-lg-only[data-v-18e7219c] {\n    display: initial !important;\n}\n}\n@media (min-width: 1200px) {\n.hide-xl[data-v-18e7219c] {\n    display: none !important;\n}\n.show-xl-only[data-v-18e7219c] {\n    display: initial !important;\n}\n}\n@media (max-width: 576px) {\n.hide-sm-down[data-v-18e7219c] {\n    display: none !important;\n}\n}\n@media (max-width: 768px) {\n.hide-md-down[data-v-18e7219c] {\n    display: none !important;\n}\n}\n@media (max-width: 992px) {\n.hide-lg-down[data-v-18e7219c] {\n    display: none !important;\n}\n}\n@media (min-width: 576px) {\n.hide-sm-up[data-v-18e7219c] {\n    display: none !important;\n}\n}\n@media (min-width: 768px) {\n.hide-md-up[data-v-18e7219c] {\n    display: none !important;\n}\n}\n@media (min-width: 992px) {\n.hide-lg-up[data-v-18e7219c] {\n    display: none !important;\n}\n}\n@media (max-width: 575px) {\n.d-xs-none[data-v-18e7219c] {\n    display: none !important;\n}\n.d-xs-block[data-v-18e7219c] {\n    display: block !important;\n}\n.d-xs-flex[data-v-18e7219c] {\n    display: flex !important;\n}\n}\n@media (min-width: 576px) and (max-width: 767px) {\n.d-sm-none[data-v-18e7219c] {\n    display: none !important;\n}\n.d-sm-block[data-v-18e7219c] {\n    display: block !important;\n}\n.d-sm-flex[data-v-18e7219c] {\n    display: flex !important;\n}\n}\n@media (min-width: 768px) and (max-width: 991px) {\n.d-md-none[data-v-18e7219c] {\n    display: none !important;\n}\n.d-md-block[data-v-18e7219c] {\n    display: block !important;\n}\n.d-md-flex[data-v-18e7219c] {\n    display: flex !important;\n}\n}\n@media (min-width: 992px) and (max-width: 1199px) {\n.d-lg-none[data-v-18e7219c] {\n    display: none !important;\n}\n.d-lg-block[data-v-18e7219c] {\n    display: block !important;\n}\n.d-lg-flex[data-v-18e7219c] {\n    display: flex !important;\n}\n}\n@media (min-width: 1200px) {\n.d-xl-none[data-v-18e7219c] {\n    display: none !important;\n}\n.d-xl-block[data-v-18e7219c] {\n    display: block !important;\n}\n.d-xl-flex[data-v-18e7219c] {\n    display: flex !important;\n}\n}\n@media (min-width: 576px) {\n.custom-modal-xl[data-v-18e7219c] {\n    max-width: 1500px !important;\n}\n}\n.activity-list-page[data-v-18e7219c] {\n  padding: 1rem;\n  color: #252525;\n}\n@media (max-width: 768px) {\n.activity-list-page[data-v-18e7219c] {\n    padding: 1rem;\n}\n}\n.page-header[data-v-18e7219c] {\n  display: flex;\n  border-radius: 10px;\n}\n@media (max-width: 768px) {\n.page-header[data-v-18e7219c] {\n    flex-direction: column;\n    gap: 1rem;\n    padding: 1.5rem;\n}\n}\n.page-header .header-content[data-v-18e7219c] {\n  flex: 1;\n  display: flex;\n}\n.page-header .header-content .page-title[data-v-18e7219c] {\n  font-family: \"Inter\", \"Segoe UI\", \"Roboto\", \"Helvetica Neue\", Arial, sans-serif;\n  font-size: 1.5rem;\n  font-weight: 700;\n  color: #252525;\n  background: linear-gradient(135deg, #252525, #f5f5f3);\n  -webkit-background-clip: text;\n          background-clip: text;\n}\n.page-header .header-content .page-subtitle[data-v-18e7219c] {\n  font-size: 1.125rem;\n  color: #6c757d;\n  margin: 0;\n  font-weight: 400;\n  line-height: 1.6;\n}\n.page-header .header-actions .btn-modern[data-v-18e7219c] {\n  background: linear-gradient(135deg, #dc3545, #e52e2e);\n  border-radius: 12px;\n  font-size: 0.875rem;\n  transition: all 0.3s ease;\n  color: #ffffff;\n}\n.page-header .header-actions .btn-modern[data-v-18e7219c]:hover {\n  transform: translateY(-3px);\n  box-shadow: 0 12px 35px rgba(220, 53, 69, 0.4);\n  color: #ffffff;\n}\n.page-header .header-actions .btn-modern[data-v-18e7219c]:active {\n  transform: translateY(-1px);\n}\n.page-header .header-actions .btn-modern.btn-delete-selected[data-v-18e7219c] {\n  background: linear-gradient(135deg, #dc3545, #c82333);\n  box-shadow: 0 8px 25px rgba(220, 53, 69, 0.3);\n}\n.page-header .header-actions .btn-modern.btn-delete-selected[data-v-18e7219c]:hover:not(:disabled) {\n  transform: translateY(-3px);\n  box-shadow: 0 12px 35px rgba(220, 53, 69, 0.4);\n  background: linear-gradient(135deg, #c82333, #bd2130);\n}\n.page-header .header-actions .btn-modern.btn-delete-selected[data-v-18e7219c]:disabled {\n  opacity: 0.5;\n  cursor: not-allowed;\n  transform: none;\n  box-shadow: none;\n}\n.filters-card-compact[data-v-18e7219c] {\n  padding: 5px;\n  transition: all 0.3s ease;\n}\n.filters-card-compact[data-v-18e7219c]:hover {\n  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);\n  border-color: #dc3545;\n}\n.filters-card-compact .filters-header-compact[data-v-18e7219c] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  margin-bottom: 10px;\n  padding-bottom: 5px;\n  border-bottom: 1px solid #e0e0e0;\n}\n.filters-card-compact .filters-header-compact .filters-title-section[data-v-18e7219c] {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n}\n.filters-card-compact .filters-header-compact .filters-title-section .filters-title-compact[data-v-18e7219c] {\n  font-size: 1.25rem;\n  font-weight: 600;\n  color: #252525;\n  margin: 0;\n  display: flex;\n  align-items: center;\n  gap: 8px;\n}\n.filters-card-compact .filters-header-compact .filters-title-section .filters-title-compact i[data-v-18e7219c] {\n  color: #dc3545;\n  font-size: 0.875rem;\n}\n.filters-card-compact .filters-header-compact .filters-title-section .results-count-compact[data-v-18e7219c] {\n  font-size: 0.875rem;\n  color: #6a6a6a;\n  background: #f8f9fa;\n  padding: 8px 10px;\n  border-radius: 4px;\n  font-weight: 500;\n}\n.filters-card-compact .filters-header-compact .filters-actions-compact .btn-clear-compact[data-v-18e7219c] {\n  background: transparent;\n  border: 1px solid #e0e0e0;\n  color: #6a6a6a;\n  border-radius: 4px;\n  padding: 8px 10px;\n  font-size: 0.875rem;\n  font-weight: 500;\n  transition: all 0.2s ease;\n}\n.filters-card-compact .filters-header-compact .filters-actions-compact .btn-clear-compact[data-v-18e7219c]:hover {\n  background: #dc3545;\n  border-color: #dc3545;\n  color: #ffffff;\n  transform: translateY(-1px);\n}\n.filters-card-compact .filters-header-compact .filters-actions-compact .btn-clear-compact i[data-v-18e7219c] {\n  margin-right: 8px;\n}\n.filters-card-compact .filters-content-compact[data-v-18e7219c] {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n  gap: 20px;\n  align-items: end;\n}\n.filters-card-compact .filters-content-compact .filter-group-compact[data-v-18e7219c] {\n  display: flex;\n  flex-direction: column;\n  gap: 8px;\n}\n.filters-card-compact .filters-content-compact .filter-group-compact .filter-label-compact[data-v-18e7219c] {\n  font-size: 0.875rem;\n  font-weight: 500;\n  color: #252525;\n  margin: 0;\n  display: flex;\n  align-items: center;\n  gap: 4px;\n}\n.filters-card-compact .filters-content-compact .filter-group-compact .filter-label-compact i[data-v-18e7219c] {\n  font-size: 10px;\n  color: #dc3545;\n  opacity: 0.7;\n}\n.filters-card-compact .filters-content-compact .filter-group-compact .select-compact[data-v-18e7219c] {\n  border: 1px solid #e0e0e0;\n  border-radius: 4px;\n  font-size: 0.875rem;\n  background: #ffffff;\n  transition: all 0.2s ease;\n}\n.filters-card-compact .filters-content-compact .filter-group-compact .select-compact[data-v-18e7219c]:focus {\n  border-color: #dc3545;\n  box-shadow: 0 0 0 2px rgba(220, 53, 69, 0.1);\n  outline: none;\n}\n.filters-card-compact .filters-content-compact .filter-group-compact .select-compact[data-v-18e7219c]:hover {\n  border-color: #dc3545;\n}\n@media (max-width: 768px) {\n.filters-card-compact .filters-header-compact[data-v-18e7219c] {\n    flex-direction: column;\n    gap: 10px;\n    align-items: flex-start;\n}\n.filters-card-compact .filters-header-compact .filters-title-section[data-v-18e7219c] {\n    flex-direction: column;\n    align-items: flex-start;\n    gap: 8px;\n}\n.filters-card-compact .filters-content-compact[data-v-18e7219c] {\n    grid-template-columns: 1fr;\n    gap: 10px;\n}\n}\n.filters-card[data-v-18e7219c] {\n  background: #ffffff;\n  border: none;\n  border-radius: 10px;\n  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.08);\n  overflow: hidden;\n  transition: all 0.3s ease;\n}\n.filters-card[data-v-18e7219c]:hover {\n  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.12);\n  transform: translateY(-2px);\n}\n.filters-card .filters-header[data-v-18e7219c] {\n  background: linear-gradient(135deg, #dc3545, #e52e2e);\n  padding: 1rem;\n  margin: -1rem -1rem 2rem -1rem;\n  position: relative;\n  overflow: hidden;\n}\n.filters-card .filters-header[data-v-18e7219c]::before {\n  content: \"\";\n  position: absolute;\n  top: -50%;\n  right: -50%;\n  width: 200%;\n  height: 200%;\n  background: radial-gradient(circle, #dc3545 0%, transparent 50%);\n  animation: float-data-v-18e7219c 6s ease-in-out infinite;\n}\n.filters-card .filters-header .filters-title[data-v-18e7219c] {\n  color: #ffffff;\n  font-size: 1.125rem;\n  font-weight: 600;\n  margin: 0;\n  display: flex;\n  align-items: center;\n  position: relative;\n  z-index: 1;\n}\n.filters-card .filters-header .filters-title i[data-v-18e7219c] {\n  font-size: 0.875rem;\n  opacity: 0.9;\n  margin-right: 0.75rem;\n}\n.filters-card .filters-row[data-v-18e7219c] {\n  margin-bottom: 5px;\n  padding: 5px;\n}\n@media (max-width: 768px) {\n.filters-card .filters-row .filter-col[data-v-18e7219c] {\n    margin-bottom: 1.5rem;\n}\n}\n.filters-card .form-group-modern[data-v-18e7219c] {\n  margin-bottom: 0;\n}\n.filters-card .form-group-modern label[data-v-18e7219c] {\n  font-weight: 600;\n  color: #252525;\n  font-size: 0.875rem;\n  margin-bottom: 0.75rem;\n  text-transform: uppercase;\n  letter-spacing: 0.5px;\n}\n.filters-card .form-group-modern .select-modern[data-v-18e7219c] {\n  border: 2px solid #e9ecef;\n  border-radius: 12px;\n  font-size: 0.875rem;\n  transition: all 0.3s ease;\n  color: #252525;\n}\n.filters-card .form-group-modern .select-modern[data-v-18e7219c]:focus {\n  border-color: #dc3545;\n  box-shadow: 0 0 0 0.2rem rgba(220, 53, 69, 0.15);\n  background: #ffffff;\n}\n.filters-card .form-group-modern .select-modern[data-v-18e7219c]:hover {\n  border-color: #dc3545;\n  background: #ffffff;\n}\n.filters-card .form-group-modern .select-modern option[value=\"\"][data-v-18e7219c] {\n  color: #999 !important;\n}\n.filters-card .filters-actions[data-v-18e7219c] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n}\n.filters-card .filters-actions .btn-outline-modern[data-v-18e7219c] {\n  border: 2px solid #dee2e6;\n  border-radius: 12px;\n  padding: 0.25rem 0.5rem;\n  font-weight: 550;\n  font-size: 0.75rem;\n  color: #6c757d;\n  transition: all 0.3s ease;\n  background: #ffffff;\n}\n.filters-card .filters-actions .btn-outline-modern[data-v-18e7219c]:hover {\n  border-color: #dc3545;\n  color: #dc3545;\n  background: rgba(220, 53, 69, 0.05);\n  transform: translateY(-1px);\n}\n.filters-card .filters-actions .results-count[data-v-18e7219c] {\n  font-size: 0.875rem;\n  color: #6c757d;\n  font-weight: 600;\n  background: #ffffff;\n  padding: 0.5rem 1rem;\n  border-radius: 20px;\n  border: 1px solid #e9ecef;\n}\n.activities-container .activities-header[data-v-18e7219c] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  margin-bottom: 1rem;\n  padding: 0.5rem 1rem;\n  background: #ffffff;\n  border-radius: 12px;\n  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.06);\n}\n@media (max-width: 768px) {\n.activities-container .activities-header[data-v-18e7219c] {\n    flex-direction: column;\n    gap: 1rem;\n    align-items: flex-start;\n    padding: 1rem;\n}\n}\n.activities-container .activities-header .activities-title[data-v-18e7219c] {\n  font-size: 1.25rem;\n  font-weight: 600;\n  color: #252525;\n  margin: 0;\n  display: flex;\n  align-items: center;\n}\n.activities-container .activities-header .activities-title i[data-v-18e7219c] {\n  color: #dc3545;\n  margin-right: 0.75rem;\n  font-size: 1.2em;\n}\n.activities-container .activities-header .view-toggle .btn-outline-modern[data-v-18e7219c] {\n  border: 2px solid #e9ecef;\n  border-radius: 10px;\n  padding: 0.5rem;\n  color: #6c757d;\n  transition: all 0.3s ease;\n  background: #ffffff;\n}\n.activities-container .activities-header .view-toggle .btn-outline-modern[data-v-18e7219c]:hover, .activities-container .activities-header .view-toggle .btn-outline-modern.active[data-v-18e7219c] {\n  border-color: #dc3545;\n  color: #dc3545;\n  background: rgba(220, 53, 69, 0.05);\n  transform: translateY(-1px);\n}\n.activities-container .activities-header .view-toggle .btn-outline-modern i[data-v-18e7219c] {\n  font-size: 0.875rem;\n}\n.activities-grid[data-v-18e7219c] {\n  display: grid;\n  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));\n  gap: 1rem;\n  padding: 0.5rem;\n}\n@media (min-width: 1200px) {\n.activities-grid[data-v-18e7219c] {\n    grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));\n    gap: 1.25rem;\n}\n}\n@media (max-width: 768px) {\n.activities-grid[data-v-18e7219c] {\n    grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));\n    gap: 0.75rem;\n}\n}\n@media (max-width: 576px) {\n.activities-grid[data-v-18e7219c] {\n    grid-template-columns: 1fr;\n    gap: 0.75rem;\n}\n}\n.activities-grid.list-view[data-v-18e7219c] {\n  grid-template-columns: repeat(2, 1fr);\n  gap: 1rem;\n}\n@media (max-width: 992px) {\n.activities-grid.list-view[data-v-18e7219c] {\n    grid-template-columns: 1fr;\n    gap: 0.75rem;\n}\n}\n.activities-grid.list-view .activity-card[data-v-18e7219c] {\n  display: flex;\n  align-items: center;\n  gap: 1rem;\n  padding: 0.75rem;\n  min-height: 80px;\n}\n.activities-grid.list-view .activity-card .delete-checkbox-wrapper[data-v-18e7219c] {\n  position: absolute;\n  top: 0.25rem;\n  right: 0.25rem;\n  z-index: 10;\n  transition: all 0.3s ease;\n}\n.activities-grid.list-view .activity-card .delete-checkbox-wrapper .delete-checkbox[data-v-18e7219c] {\n  margin: 0;\n  cursor: pointer;\n}\n.activities-grid.list-view .activity-card .delete-checkbox-wrapper .delete-checkbox[data-v-18e7219c]  .custom-control-input:checked ~ .custom-control-label::before {\n  background-color: #dc3545;\n  border-color: #dc3545;\n}\n.activities-grid.list-view .activity-card .delete-checkbox-wrapper .delete-checkbox[data-v-18e7219c]  .custom-control-input:focus ~ .custom-control-label::before {\n  box-shadow: 0 0 0 0.2rem rgba(220, 53, 69, 0.25);\n}\n.activities-grid.list-view .activity-card.selected-for-delete[data-v-18e7219c] {\n  border-color: #dc3545;\n  background: linear-gradient(135deg, rgba(220, 53, 69, 0.05), rgba(220, 53, 69, 0.02));\n  box-shadow: 0 8px 32px rgba(220, 53, 69, 0.15);\n}\n.activities-grid.list-view .activity-card.selected-for-delete[data-v-18e7219c]::after {\n  content: \"\";\n  position: absolute;\n  top: 0;\n  left: 0;\n  right: 0;\n  height: 3px;\n  background: linear-gradient(135deg, #dc3545, #c82333);\n  transform: scaleX(1);\n}\n.activities-grid.list-view .activity-card .activity-thumbnail[data-v-18e7219c] {\n  flex-shrink: 0;\n  width: 80px;\n  height: 60px;\n  margin-bottom: 0;\n  border-radius: 8px;\n}\n.activities-grid.list-view .activity-card .activity-thumbnail .thumbnail-image[data-v-18e7219c] {\n  border-radius: 8px;\n}\n.activities-grid.list-view .activity-card .activity-thumbnail .difficulty-badge-overlay[data-v-18e7219c] {\n  font-size: 0.5rem;\n  padding: 0.1rem 0.25rem;\n  bottom: 3px;\n  left: 3px;\n}\n.activities-grid.list-view .activity-card .difficulty-badge-list[data-v-18e7219c] {\n  font-size: 0.65rem !important;\n  font-weight: 600;\n  padding: 0.2rem 0.4rem;\n  border-radius: 8px;\n  text-transform: uppercase;\n  letter-spacing: 0.3px;\n}\n.activities-grid.list-view .activity-card .activity-card-body[data-v-18e7219c] {\n  flex: 1;\n  margin: 0;\n  min-width: 0;\n}\n.activities-grid.list-view .activity-card .activity-card-body .activity-name[data-v-18e7219c] {\n  margin: 0 0 0.25rem 0;\n  font-size: 0.875rem;\n  font-weight: 600;\n  line-height: 1.2;\n  display: -webkit-box;\n  -webkit-line-clamp: 2;\n  line-clamp: 2;\n  -webkit-box-orient: vertical;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n.activities-grid.list-view .activity-card .activity-card-body .activity-meta[data-v-18e7219c] {\n  flex-direction: column;\n  gap: 0.25rem;\n}\n.activities-grid.list-view .activity-card .activity-card-body .activity-meta .meta-item[data-v-18e7219c] {\n  font-size: 0.75rem;\n  color: #6c757d;\n}\n.activities-grid.list-view .activity-card .activity-card-body .activity-meta .meta-item .meta-icon[data-v-18e7219c] {\n  width: 12px;\n  margin-right: 0.4rem;\n  color: #dc3545;\n  font-size: 0.75rem;\n}\n.activities-grid.list-view .activity-card .activity-card-footer[data-v-18e7219c] {\n  flex-shrink: 0;\n  margin: 0;\n  padding: 0;\n  border: none;\n  width: auto;\n}\n.activities-grid.list-view .activity-card .activity-card-footer .activity-card-actions[data-v-18e7219c] {\n  display: flex;\n  gap: 0.5rem;\n  align-items: center;\n}\n.activities-grid.list-view .activity-card .activity-card-footer .btn-outline-modern[data-v-18e7219c] {\n  border: 1px solid #e9ecef;\n  border-radius: 8px;\n  padding: 0.4rem 0.8rem;\n  font-weight: 600;\n  font-size: 0.75rem;\n  color: #ffffff;\n  transition: all 0.3s ease;\n  background: linear-gradient(135deg, #dc3545, #e52e2e);\n  width: 100%;\n}\n.activities-grid.list-view .activity-card .activity-card-footer .btn-outline-modern[data-v-18e7219c]:hover {\n  transform: translateY(-2px);\n  box-shadow: 0 8px 25px rgba(220, 53, 69, 0.3);\n  color: #ffffff;\n  border-color: #dc3545;\n}\n.activities-grid.list-view .activity-card .activity-card-footer .btn-outline-modern.view-details-btn[data-v-18e7219c] {\n  width: auto;\n  min-width: 28px;\n  height: 28px;\n  padding: 0.3rem;\n  border-radius: 50%;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-size: 0.65rem;\n}\n.activities-grid.list-view .activity-card .activity-card-footer .btn-outline-modern.view-details-btn i[data-v-18e7219c] {\n  margin: 0;\n}\n.activities-grid.list-view .activity-card .activity-card-footer .btn-outline-modern.view-details-btn[data-v-18e7219c]:hover {\n  transform: translateY(-2px) scale(1.05);\n  box-shadow: 0 8px 25px rgba(220, 53, 69, 0.3);\n}\n.activities-grid.list-view .activity-card .activity-card-footer .btn-outline-modern.delete-btn[data-v-18e7219c] {\n  background: linear-gradient(135deg, #dc3545, #c82333);\n  border-color: #dc3545;\n  width: auto;\n  min-width: 28px;\n  height: 28px;\n  padding: 0.3rem;\n  border-radius: 50%;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-size: 0.65rem;\n}\n.activities-grid.list-view .activity-card .activity-card-footer .btn-outline-modern.delete-btn i[data-v-18e7219c] {\n  margin: 0;\n}\n.activities-grid.list-view .activity-card .activity-card-footer .btn-outline-modern.delete-btn[data-v-18e7219c]:hover {\n  transform: translateY(-2px) scale(1.05);\n  box-shadow: 0 8px 25px rgba(220, 53, 69, 0.4);\n  background: linear-gradient(135deg, #c82333, #bd2130);\n}\n.activities-grid .activity-thumbnail[data-v-18e7219c] {\n  position: relative;\n  height: 160px;\n  border-radius: 10px;\n  overflow: hidden;\n  margin-bottom: 0.75rem;\n  background: linear-gradient(135deg, #f8f9fa, #e9ecef);\n}\n@media (min-width: 1200px) {\n.activities-grid .activity-thumbnail[data-v-18e7219c] {\n    height: 180px;\n}\n}\n.activities-grid .activity-thumbnail .thumbnail-image[data-v-18e7219c] {\n  width: 100%;\n  height: 100%;\n  -o-object-fit: cover;\n     object-fit: cover;\n  transition: transform 0.3s ease;\n}\n.activities-grid .activity-thumbnail .thumbnail-overlay[data-v-18e7219c] {\n  position: absolute;\n  bottom: 8px;\n  left: 2px;\n  z-index: 2;\n}\n.activities-grid .activity-thumbnail .difficulty-badge-overlay-grid[data-v-18e7219c] {\n  font-size: 0.65rem !important;\n  font-weight: 600;\n  padding: 0.2rem 0.4rem;\n  border-radius: 8px;\n  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.25);\n  color: #ffffff;\n  border: 1px solid rgba(255, 255, 255, 0.9);\n  text-transform: uppercase;\n  letter-spacing: 0.3px;\n  -webkit-backdrop-filter: blur(4px);\n          backdrop-filter: blur(4px);\n}\n.activities-grid .activity-thumbnail .difficulty-badge-overlay[data-v-18e7219c] {\n  font-size: 0.65rem !important;\n  font-weight: 600;\n  padding: 0.2rem 0.4rem;\n  border-radius: 8px;\n  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.25);\n  color: #ffffff;\n  border: 1px solid rgba(255, 255, 255, 0.9);\n  -webkit-backdrop-filter: blur(4px);\n          backdrop-filter: blur(4px);\n}\n.activities-grid .activity-card[data-v-18e7219c] {\n  background: #ffffff;\n  border-radius: 12px;\n  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.06);\n  transition: all 0.3s ease;\n  cursor: pointer;\n  position: relative;\n  overflow: hidden;\n  padding: 1rem;\n  border: 1px solid rgba(0, 0, 0, 0.04);\n}\n.activities-grid .activity-card .delete-checkbox-wrapper[data-v-18e7219c] {\n  position: absolute;\n  top: 0.5rem;\n  right: 0.5rem;\n  z-index: 10;\n  transition: all 0.3s ease;\n}\n.activities-grid .activity-card .delete-checkbox-wrapper .delete-checkbox[data-v-18e7219c] {\n  margin: 0;\n  cursor: pointer;\n}\n.activities-grid .activity-card .delete-checkbox-wrapper .delete-checkbox[data-v-18e7219c]  .custom-control-input:checked ~ .custom-control-label::before {\n  background-color: #dc3545;\n  border-color: #dc3545;\n}\n.activities-grid .activity-card .delete-checkbox-wrapper .delete-checkbox[data-v-18e7219c]  .custom-control-input:focus ~ .custom-control-label::before {\n  box-shadow: 0 0 0 0.2rem rgba(220, 53, 69, 0.25);\n}\n.activities-grid .activity-card[data-v-18e7219c]::before {\n  content: \"\";\n  position: absolute;\n  top: 0;\n  left: 0;\n  right: 0;\n  height: 3px;\n  background: linear-gradient(135deg, #dc3545, #e52e2e);\n  transform: scaleX(0);\n  transition: transform 0.3s ease;\n}\n.activities-grid .activity-card[data-v-18e7219c]:hover {\n  transform: translateY(-4px);\n  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.12);\n  border-color: rgba(220, 53, 69, 0.15);\n}\n.activities-grid .activity-card[data-v-18e7219c]:hover::before {\n  transform: scaleX(1);\n}\n.activities-grid .activity-card:hover .activity-thumbnail .thumbnail-image[data-v-18e7219c] {\n  transform: scale(1.05);\n}\n.activities-grid .activity-card.selected[data-v-18e7219c] {\n  border-color: #dc3545;\n  background: linear-gradient(135deg, rgba(220, 53, 69, 0.02), rgba(220, 53, 69, 0.005));\n  box-shadow: 0 8px 32px rgba(220, 53, 69, 0.12);\n}\n.activities-grid .activity-card.selected[data-v-18e7219c]::before {\n  transform: scaleX(1);\n}\n.activities-grid .activity-card.selected-for-delete[data-v-18e7219c] {\n  border-color: #dc3545;\n  background: linear-gradient(135deg, rgba(220, 53, 69, 0.05), rgba(220, 53, 69, 0.02));\n  box-shadow: 0 8px 32px rgba(220, 53, 69, 0.15);\n}\n.activities-grid .activity-card.selected-for-delete[data-v-18e7219c]::after {\n  content: \"\";\n  position: absolute;\n  top: 0;\n  left: 0;\n  right: 0;\n  height: 3px;\n  background: linear-gradient(135deg, #dc3545, #c82333);\n  transform: scaleX(1);\n}\n.activities-grid .activity-card .activity-card-body .activity-name[data-v-18e7219c] {\n  font-size: 1.125rem;\n  font-weight: 600;\n  color: #252525;\n  margin: 0 0 0.75rem 0;\n  line-height: 1.3;\n  display: -webkit-box;\n  -webkit-line-clamp: 2;\n  line-clamp: 2;\n  -webkit-box-orient: vertical;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n.activities-grid .activity-card .activity-card-body .activity-meta[data-v-18e7219c] {\n  display: flex;\n  flex-direction: column;\n  gap: 0.5rem;\n}\n.activities-grid .activity-card .activity-card-body .activity-meta .meta-item[data-v-18e7219c] {\n  display: flex;\n  align-items: center;\n  font-size: 0.75rem;\n  color: #6c757d;\n  font-weight: 500;\n}\n.activities-grid .activity-card .activity-card-body .activity-meta .meta-item .meta-icon[data-v-18e7219c] {\n  width: 14px;\n  margin-right: 0.5rem;\n  color: #dc3545;\n  font-size: 0.75rem;\n}\n.activities-grid .activity-card .activity-card-footer[data-v-18e7219c] {\n  margin-top: 1rem;\n  padding-top: 0.75rem;\n  border-top: 1px solid #f0f0f0;\n}\n.activities-grid .activity-card .activity-card-footer .activity-card-actions[data-v-18e7219c] {\n  display: flex;\n  gap: 0.5rem;\n  justify-content: flex-end;\n  align-items: center;\n}\n.activities-grid .activity-card .activity-card-footer .btn-outline-modern[data-v-18e7219c] {\n  border: 1px solid #e9ecef;\n  border-radius: 8px;\n  padding: 0.5rem 1rem;\n  font-weight: 600;\n  font-size: 0.75rem;\n  color: #ffffff;\n  transition: all 0.3s ease;\n  background: linear-gradient(135deg, #dc3545, #e52e2e);\n  width: 100%;\n}\n.activities-grid .activity-card .activity-card-footer .btn-outline-modern[data-v-18e7219c]:hover {\n  transform: translateY(-2px);\n  box-shadow: 0 8px 25px rgba(220, 53, 69, 0.3);\n  color: #ffffff;\n  border-color: #dc3545;\n}\n.activities-grid .activity-card .activity-card-footer .btn-outline-modern.btn-sm[data-v-18e7219c] {\n  padding: 0.4rem 0.8rem;\n  font-size: 0.75rem;\n}\n.activities-grid .activity-card .activity-card-footer .btn-outline-modern.view-details-btn[data-v-18e7219c] {\n  width: auto;\n  min-width: 36px;\n  height: 36px;\n  padding: 0.5rem;\n  border-radius: 50%;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-size: 0.8rem;\n}\n.activities-grid .activity-card .activity-card-footer .btn-outline-modern.view-details-btn i[data-v-18e7219c] {\n  margin: 0;\n}\n.activities-grid .activity-card .activity-card-footer .btn-outline-modern.view-details-btn[data-v-18e7219c]:hover {\n  transform: translateY(-2px) scale(1.05);\n  box-shadow: 0 8px 25px rgba(220, 53, 69, 0.3);\n}\n.activities-grid .activity-card .activity-card-footer .btn-outline-modern.delete-btn[data-v-18e7219c] {\n  background: linear-gradient(135deg, #dc3545, #c82333);\n  border-color: #dc3545;\n  width: auto;\n  min-width: 36px;\n  height: 36px;\n  padding: 0.5rem;\n  border-radius: 50%;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-size: 0.8rem;\n}\n.activities-grid .activity-card .activity-card-footer .btn-outline-modern.delete-btn i[data-v-18e7219c] {\n  margin: 0;\n}\n.activities-grid .activity-card .activity-card-footer .btn-outline-modern.delete-btn[data-v-18e7219c]:hover {\n  transform: translateY(-2px) scale(1.05);\n  box-shadow: 0 8px 25px rgba(220, 53, 69, 0.4);\n  background: linear-gradient(135deg, #c82333, #bd2130);\n}\n.pagination-container[data-v-18e7219c] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  margin-top: 2rem;\n  padding: 0 1rem;\n}\n@media (max-width: 768px) {\n.pagination-container[data-v-18e7219c] {\n    flex-direction: column;\n    gap: 1rem;\n    align-items: stretch;\n}\n}\n.pagination-container .pagination-modern .page-item .page-link[data-v-18e7219c] {\n  border: 2px solid #e9ecef;\n  border-radius: 12px;\n  padding: 0.75rem 1rem;\n  font-weight: 600;\n  font-size: 0.875rem;\n  color: #6c757d;\n  transition: all 0.3s ease;\n  background: #ffffff;\n}\n.pagination-container .pagination-modern .page-item .page-link[data-v-18e7219c]:hover {\n  border-color: #dc3545;\n  color: #dc3545;\n  background: rgba(220, 53, 69, 0.05);\n  transform: translateY(-1px);\n}\n.pagination-container .pagination-modern .page-item .page-link.active[data-v-18e7219c] {\n  border-color: #dc3545;\n  background: #dc3545;\n  color: #ffffff;\n  font-weight: 700;\n}\n.pagination-container .pagination-info[data-v-18e7219c] {\n  font-size: 0.875rem;\n  color: #6c757d;\n  font-weight: 500;\n  background: #ffffff;\n  padding: 0.5rem 1rem;\n  border-radius: 20px;\n  border: 1px solid #e9ecef;\n  text-align: center;\n}\n@media (max-width: 768px) {\n.pagination-container .pagination-info[data-v-18e7219c] {\n    order: -1;\n}\n}\n.empty-state[data-v-18e7219c] {\n  text-align: center;\n  padding: 4rem 2rem;\n  background: #ffffff;\n  border-radius: 20px;\n  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.08);\n  border: 1px solid rgba(255, 255, 255, 0.2);\n}\n.empty-state .empty-icon[data-v-18e7219c] {\n  font-size: 4rem;\n  color: #6c757d;\n  margin-bottom: 2rem;\n  opacity: 0.5;\n}\n.empty-state h3[data-v-18e7219c] {\n  font-size: 1.5rem;\n  color: #252525;\n  margin-bottom: 0.75rem;\n}\n.empty-state p[data-v-18e7219c] {\n  color: #6c757d;\n  font-size: 1.125rem;\n  margin-bottom: 2rem;\n  line-height: 1.6;\n}\n.empty-state .btn-modern[data-v-18e7219c] {\n  background: linear-gradient(135deg, #dc3545, #e52e2e);\n  border: none;\n  border-radius: 12px;\n  padding: 0.75rem 1rem;\n  font-weight: 600;\n  font-size: 0.875rem;\n  transition: all 0.3s ease;\n  box-shadow: 0 8px 25px rgba(220, 53, 69, 0.3);\n  color: #ffffff;\n}\n.empty-state .btn-modern[data-v-18e7219c]:hover {\n  transform: translateY(-3px);\n  box-shadow: 0 12px 35px rgba(220, 53, 69, 0.4);\n  color: #ffffff;\n}\n.selected-summary[data-v-18e7219c] {\n  position: fixed;\n  bottom: 1rem;\n  left: 50%;\n  transform: translateX(-50%);\n  background: #ffffff;\n  border-radius: 12px;\n  padding: 1rem;\n  box-shadow: 0 16px 48px rgba(0, 0, 0, 0.15);\n  border: 2px solid #dc3545;\n  z-index: 1200;\n  min-width: 450px;\n  -webkit-backdrop-filter: blur(10px);\n          backdrop-filter: blur(10px);\n}\n@media (max-width: 768px) {\n.selected-summary[data-v-18e7219c] {\n    left: 1rem;\n    right: 1rem;\n    transform: none;\n    min-width: auto;\n}\n}\n.selected-summary .summary-content[data-v-18e7219c] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n}\n@media (max-width: 768px) {\n.selected-summary .summary-content[data-v-18e7219c] {\n    flex-direction: column;\n    gap: 1rem;\n    align-items: stretch;\n}\n}\n.selected-summary .summary-content .selected-count[data-v-18e7219c] {\n  font-weight: 700;\n  color: #252525;\n  font-size: 1.125rem;\n  display: flex;\n  align-items: center;\n  margin-right: 10px;\n}\n.selected-summary .summary-content .selected-count i[data-v-18e7219c] {\n  color: #4caf50;\n  margin-right: 0.75rem;\n  font-size: 1.2em;\n}\n.selected-summary .summary-content .summary-actions[data-v-18e7219c] {\n  display: flex;\n  gap: 0.5rem;\n}\n@media (max-width: 768px) {\n.selected-summary .summary-content .summary-actions[data-v-18e7219c] {\n    justify-content: center;\n}\n}\n.selected-summary .summary-content .summary-actions .btn-outline-modern[data-v-18e7219c] {\n  border: 2px solid #e9ecef;\n  border-radius: 12px;\n  font-weight: 700;\n  font-size: 0.875rem;\n  color: #6c757d;\n  transition: all 0.3s ease;\n  background: #ffffff;\n}\n.selected-summary .summary-content .summary-actions .btn-outline-modern[data-v-18e7219c]:hover {\n  border-color: #dc3545;\n  color: #dc3545;\n  background: rgba(220, 53, 69, 0.05);\n  transform: translateY(-1px);\n}\n.selected-summary .summary-content .summary-actions .btn-modern[data-v-18e7219c] {\n  background: linear-gradient(135deg, #dc3545, #e52e2e);\n  border: none;\n  border-radius: 12px;\n  font-weight: 700;\n  font-size: 0.875rem;\n  transition: all 0.3s ease;\n  box-shadow: 0 8px 25px rgba(220, 53, 69, 0.3);\n  color: #ffffff;\n}\n.selected-summary .summary-content .summary-actions .btn-modern[data-v-18e7219c]:hover {\n  transform: translateY(-2px);\n  box-shadow: 0 12px 35px rgba(220, 53, 69, 0.4);\n  color: #ffffff;\n}\n.btn-modern[data-v-18e7219c] {\n  background: linear-gradient(135deg, #dc3545, #e52e2e);\n  border: none;\n  border-radius: 12px;\n  padding: 0.75rem 1rem;\n  font-weight: 600;\n  font-size: 0.875rem;\n  transition: all 0.3s ease;\n  box-shadow: 0 8px 25px rgba(220, 53, 69, 0.3);\n  color: #ffffff;\n}\n.btn-modern[data-v-18e7219c]:hover {\n  transform: translateY(-3px);\n  box-shadow: 0 12px 35px rgba(220, 53, 69, 0.4);\n  color: #ffffff;\n}\n.btn-modern[data-v-18e7219c]:active {\n  transform: translateY(-1px);\n}\n.btn-modern.btn-create-workout[data-v-18e7219c] {\n  background: linear-gradient(135deg, #4caf50, rgb(60.5577689243, 139.4422310757, 63.7450199203));\n  box-shadow: 0 8px 25px rgba(76, 175, 80, 0.3);\n}\n.btn-modern.btn-create-workout[data-v-18e7219c]:hover:not(:disabled) {\n  box-shadow: 0 12px 35px rgba(76, 175, 80, 0.4);\n}\n.btn-modern.btn-create-workout[data-v-18e7219c]:disabled {\n  opacity: 0.5;\n  cursor: not-allowed;\n  transform: none;\n  box-shadow: none;\n}\n.btn-outline-modern[data-v-18e7219c] {\n  border: 2px solid #e9ecef;\n  border-radius: 12px;\n  padding: 0.75rem 1.5rem;\n  font-weight: 600;\n  font-size: 0.875rem;\n  color: #6c757d;\n  transition: all 0.3s ease;\n  background: #ffffff;\n}\n.btn-outline-modern[data-v-18e7219c]:hover {\n  border-color: #dc3545;\n  color: #dc3545;\n  background: rgba(220, 53, 69, 0.05);\n  transform: translateY(-1px);\n}\n@keyframes float-data-v-18e7219c {\n0%, 100% {\n    transform: translateY(0px) rotate(0deg);\n}\n50% {\n    transform: translateY(-20px) rotate(180deg);\n}\n}\n@media (max-width: 992px) {\n.activities-grid[data-v-18e7219c] {\n    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));\n    gap: 1rem;\n}\n}\n@media (max-width: 768px) {\n.activities-grid[data-v-18e7219c] {\n    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));\n    gap: 0.75rem;\n}\n}\n@media (max-width: 576px) {\n.activity-list-page[data-v-18e7219c] {\n    padding: 0.5rem;\n}\n.page-header .page-title[data-v-18e7219c] {\n    font-size: 1.25rem;\n}\n.filters-card .filters-header[data-v-18e7219c] {\n    padding: 1rem;\n}\n.activity-card[data-v-18e7219c] {\n    padding: 0.75rem;\n}\n.activities-grid[data-v-18e7219c] {\n    grid-template-columns: 1fr;\n    gap: 0.5rem;\n    padding: 0.25rem;\n}\n}\n.activities-grid:not(.list-view) .activity-card:hover .activity-thumbnail .thumbnail-image[data-v-18e7219c] {\n  transform: scale(1.08);\n}\n.activities-grid:not(.list-view) .activity-card .activity-card-body .activity-name[data-v-18e7219c] {\n  min-height: 2.5rem;\n  display: -webkit-box;\n  -webkit-line-clamp: 2;\n  line-clamp: 2;\n  -webkit-box-orient: vertical;\n  overflow: hidden;\n}\n.activities-grid:not(.list-view) .activity-card .activity-card-body .activity-meta[data-v-18e7219c] {\n  min-height: 3rem;\n}\n.activities-grid:not(.list-view) .activity-card .activity-card-footer .btn-outline-modern[data-v-18e7219c] {\n  font-size: 0.7rem;\n  padding: 0.4rem 0.8rem;\n}\n.activities-grid:not(.list-view) .activity-card .activity-card-footer .view-details-btn[data-v-18e7219c] {\n  width: auto;\n  min-width: 36px;\n  height: 36px;\n  padding: 0.5rem;\n  border-radius: 50%;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-size: 0.8rem;\n}\n.activities-grid:not(.list-view) .activity-card .activity-card-footer .view-details-btn i[data-v-18e7219c] {\n  margin: 0;\n}\n.activities-grid:not(.list-view) .activity-card .activity-card-footer .view-details-btn[data-v-18e7219c]:hover {\n  transform: translateY(-2px) scale(1.05);\n  box-shadow: 0 8px 25px rgba(220, 53, 69, 0.3);\n}\nbutton.btn[data-v-18e7219c],\n.b-button[data-v-18e7219c],\n.b-btn[data-v-18e7219c] {\n  font-size: 0.875rem !important;\n  border-radius: 12px !important;\n}\n@media (max-width: 576px) {\n.btn-modern[data-v-18e7219c],\n  .btn-outline-modern[data-v-18e7219c] {\n    font-size: 0.75rem;\n    padding: 0.5rem 1rem;\n}\n}\n.selected-activities-list[data-v-18e7219c] {\n  max-height: 400px;\n  overflow-y: auto;\n  padding: 0.5rem 0;\n}\n.selected-activities-list .selected-activity-item[data-v-18e7219c] {\n  margin-bottom: 1rem;\n  padding-bottom: 1rem;\n  border-bottom: 1px solid #e9ecef;\n}\n.selected-activities-list .selected-activity-item[data-v-18e7219c]:last-child {\n  margin-bottom: 0;\n  padding-bottom: 0;\n  border-bottom: none;\n}\n.selected-activities-list .selected-activity-item .activity-item-content[data-v-18e7219c] {\n  display: flex;\n  align-items: center;\n  gap: 1rem;\n}\n.selected-activities-list .selected-activity-item .activity-item-content .activity-item-thumbnail[data-v-18e7219c] {\n  flex-shrink: 0;\n  width: 60px;\n  height: 60px;\n  border-radius: 8px;\n  overflow: hidden;\n  background: #f8f9fa;\n}\n.selected-activities-list .selected-activity-item .activity-item-content .activity-item-thumbnail img[data-v-18e7219c] {\n  width: 100%;\n  height: 100%;\n  -o-object-fit: cover;\n     object-fit: cover;\n}\n.selected-activities-list .selected-activity-item .activity-item-content .activity-item-info[data-v-18e7219c] {\n  flex: 1;\n  min-width: 0;\n}\n.selected-activities-list .selected-activity-item .activity-item-content .activity-item-info .activity-item-name[data-v-18e7219c] {\n  font-size: 0.875rem;\n  font-weight: 600;\n  color: #252525;\n  margin: 0 0 0.5rem 0;\n  line-height: 1.3;\n}\n.selected-activities-list .selected-activity-item .activity-item-content .activity-item-info .activity-item-meta[data-v-18e7219c] {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 0.5rem;\n}\n.selected-activities-list .selected-activity-item .activity-item-content .activity-item-info .activity-item-meta .meta-badge[data-v-18e7219c] {\n  font-size: 0.75rem;\n  padding: 0.25rem 0.5rem;\n  background: #f8f9fa;\n  border-radius: 6px;\n  color: #6c757d;\n  font-weight: 500;\n  border: 1px solid #e9ecef;\n}\n.selected-activities-list .selected-activity-item .activity-item-content .remove-btn[data-v-18e7219c] {\n  flex-shrink: 0;\n  width: 32px;\n  height: 32px;\n  padding: 0;\n  border-radius: 50%;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  border-color: #dc3545;\n  color: #dc3545;\n}\n.selected-activities-list .selected-activity-item .activity-item-content .remove-btn[data-v-18e7219c]:hover {\n  background: #dc3545;\n  color: #ffffff;\n  transform: scale(1.1);\n}\n.selected-activities-list .selected-activity-item .activity-item-content .remove-btn i[data-v-18e7219c] {\n  font-size: 0.75rem;\n}\n.modal-actions .btn-outline-modern[data-v-18e7219c] {\n  border: 2px solid #e9ecef;\n  border-radius: 8px;\n  padding: 0.75rem 1rem;\n  font-weight: 600;\n  font-size: 0.875rem;\n  color: #6c757d;\n  transition: all 0.3s ease;\n  background: #ffffff;\n}\n.modal-actions .btn-outline-modern[data-v-18e7219c]:hover {\n  border-color: #dc3545;\n  color: #dc3545;\n  background: rgba(220, 53, 69, 0.05);\n  transform: translateY(-1px);\n}\n.modal-actions .btn-create-workout-modal[data-v-18e7219c] {\n  background: linear-gradient(135deg, #4caf50, rgb(60.5577689243, 139.4422310757, 63.7450199203));\n  box-shadow: 0 8px 25px rgba(76, 175, 80, 0.3);\n  border: none;\n  color: #ffffff;\n}\n.modal-actions .btn-create-workout-modal[data-v-18e7219c]:hover {\n  transform: translateY(-2px);\n  box-shadow: 0 12px 35px rgba(76, 175, 80, 0.4);\n}\n[data-v-18e7219c] .modal-content {\n  border-radius: 12px;\n  border: none;\n  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15);\n}\n[data-v-18e7219c] .modal-content .modal-header {\n  border-bottom: 1px solid #e9ecef;\n  padding: 1.25rem 1.5rem;\n}\n[data-v-18e7219c] .modal-content .modal-header .modal-title {\n  font-size: 1.25rem;\n  font-weight: 700;\n  color: #252525;\n}\n[data-v-18e7219c] .modal-content .modal-body {\n  padding: 1.5rem;\n  color: #252525;\n}", ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-12.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12.use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-12.use[3]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/components/ActivityModal.vue?vue&type=style&index=0&id=1669f108&lang=scss&scoped=true":
/*!***************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-12.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12.use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-12.use[3]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/components/ActivityModal.vue?vue&type=style&index=0&id=1669f108&lang=scss&scoped=true ***!
  \***************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_clonedRuleSet_12_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_12_use_2_node_modules_sass_loader_dist_cjs_js_clonedRuleSet_12_use_3_node_modules_vue_loader_lib_index_js_vue_loader_options_ActivityModal_vue_vue_type_style_index_0_id_1669f108_lang_scss_scoped_true__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !!../../../node_modules/css-loader/dist/cjs.js??clonedRuleSet-12.use[1]!../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12.use[2]!../../../node_modules/sass-loader/dist/cjs.js??clonedRuleSet-12.use[3]!../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./ActivityModal.vue?vue&type=style&index=0&id=1669f108&lang=scss&scoped=true */ "./node_modules/css-loader/dist/cjs.js??clonedRuleSet-12.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12.use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-12.use[3]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/components/ActivityModal.vue?vue&type=style&index=0&id=1669f108&lang=scss&scoped=true");

            

var options = {};

options.insert = "head";
options.singleton = false;

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_clonedRuleSet_12_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_12_use_2_node_modules_sass_loader_dist_cjs_js_clonedRuleSet_12_use_3_node_modules_vue_loader_lib_index_js_vue_loader_options_ActivityModal_vue_vue_type_style_index_0_id_1669f108_lang_scss_scoped_true__WEBPACK_IMPORTED_MODULE_1__["default"], options);



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_clonedRuleSet_12_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_12_use_2_node_modules_sass_loader_dist_cjs_js_clonedRuleSet_12_use_3_node_modules_vue_loader_lib_index_js_vue_loader_options_ActivityModal_vue_vue_type_style_index_0_id_1669f108_lang_scss_scoped_true__WEBPACK_IMPORTED_MODULE_1__["default"].locals || {});

/***/ }),

/***/ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-12.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12.use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-12.use[3]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/components/VideoPlayerModal.vue?vue&type=style&index=0&id=7f19add2&lang=scss&scoped=true":
/*!******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-12.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12.use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-12.use[3]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/components/VideoPlayerModal.vue?vue&type=style&index=0&id=7f19add2&lang=scss&scoped=true ***!
  \******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_clonedRuleSet_12_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_12_use_2_node_modules_sass_loader_dist_cjs_js_clonedRuleSet_12_use_3_node_modules_vue_loader_lib_index_js_vue_loader_options_VideoPlayerModal_vue_vue_type_style_index_0_id_7f19add2_lang_scss_scoped_true__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !!../../../node_modules/css-loader/dist/cjs.js??clonedRuleSet-12.use[1]!../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12.use[2]!../../../node_modules/sass-loader/dist/cjs.js??clonedRuleSet-12.use[3]!../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./VideoPlayerModal.vue?vue&type=style&index=0&id=7f19add2&lang=scss&scoped=true */ "./node_modules/css-loader/dist/cjs.js??clonedRuleSet-12.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12.use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-12.use[3]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/components/VideoPlayerModal.vue?vue&type=style&index=0&id=7f19add2&lang=scss&scoped=true");

            

var options = {};

options.insert = "head";
options.singleton = false;

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_clonedRuleSet_12_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_12_use_2_node_modules_sass_loader_dist_cjs_js_clonedRuleSet_12_use_3_node_modules_vue_loader_lib_index_js_vue_loader_options_VideoPlayerModal_vue_vue_type_style_index_0_id_7f19add2_lang_scss_scoped_true__WEBPACK_IMPORTED_MODULE_1__["default"], options);



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_clonedRuleSet_12_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_12_use_2_node_modules_sass_loader_dist_cjs_js_clonedRuleSet_12_use_3_node_modules_vue_loader_lib_index_js_vue_loader_options_VideoPlayerModal_vue_vue_type_style_index_0_id_7f19add2_lang_scss_scoped_true__WEBPACK_IMPORTED_MODULE_1__["default"].locals || {});

/***/ }),

/***/ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-12.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12.use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-12.use[3]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/components/WorkoutModal.vue?vue&type=style&index=0&id=2ea20454&lang=scss&scoped=true":
/*!**************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-12.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12.use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-12.use[3]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/components/WorkoutModal.vue?vue&type=style&index=0&id=2ea20454&lang=scss&scoped=true ***!
  \**************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_clonedRuleSet_12_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_12_use_2_node_modules_sass_loader_dist_cjs_js_clonedRuleSet_12_use_3_node_modules_vue_loader_lib_index_js_vue_loader_options_WorkoutModal_vue_vue_type_style_index_0_id_2ea20454_lang_scss_scoped_true__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !!../../../node_modules/css-loader/dist/cjs.js??clonedRuleSet-12.use[1]!../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12.use[2]!../../../node_modules/sass-loader/dist/cjs.js??clonedRuleSet-12.use[3]!../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./WorkoutModal.vue?vue&type=style&index=0&id=2ea20454&lang=scss&scoped=true */ "./node_modules/css-loader/dist/cjs.js??clonedRuleSet-12.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12.use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-12.use[3]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/components/WorkoutModal.vue?vue&type=style&index=0&id=2ea20454&lang=scss&scoped=true");

            

var options = {};

options.insert = "head";
options.singleton = false;

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_clonedRuleSet_12_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_12_use_2_node_modules_sass_loader_dist_cjs_js_clonedRuleSet_12_use_3_node_modules_vue_loader_lib_index_js_vue_loader_options_WorkoutModal_vue_vue_type_style_index_0_id_2ea20454_lang_scss_scoped_true__WEBPACK_IMPORTED_MODULE_1__["default"], options);



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_clonedRuleSet_12_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_12_use_2_node_modules_sass_loader_dist_cjs_js_clonedRuleSet_12_use_3_node_modules_vue_loader_lib_index_js_vue_loader_options_WorkoutModal_vue_vue_type_style_index_0_id_2ea20454_lang_scss_scoped_true__WEBPACK_IMPORTED_MODULE_1__["default"].locals || {});

/***/ }),

/***/ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-12.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12.use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-12.use[3]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/Workout/ActivityList.vue?vue&type=style&index=0&id=18e7219c&lang=scss&scoped=true":
/*!***************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-12.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12.use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-12.use[3]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/Workout/ActivityList.vue?vue&type=style&index=0&id=18e7219c&lang=scss&scoped=true ***!
  \***************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../../../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_clonedRuleSet_12_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_12_use_2_node_modules_sass_loader_dist_cjs_js_clonedRuleSet_12_use_3_node_modules_vue_loader_lib_index_js_vue_loader_options_ActivityList_vue_vue_type_style_index_0_id_18e7219c_lang_scss_scoped_true__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !!../../../../../../node_modules/css-loader/dist/cjs.js??clonedRuleSet-12.use[1]!../../../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12.use[2]!../../../../../../node_modules/sass-loader/dist/cjs.js??clonedRuleSet-12.use[3]!../../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./ActivityList.vue?vue&type=style&index=0&id=18e7219c&lang=scss&scoped=true */ "./node_modules/css-loader/dist/cjs.js??clonedRuleSet-12.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12.use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-12.use[3]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/Workout/ActivityList.vue?vue&type=style&index=0&id=18e7219c&lang=scss&scoped=true");

            

var options = {};

options.insert = "head";
options.singleton = false;

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_clonedRuleSet_12_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_12_use_2_node_modules_sass_loader_dist_cjs_js_clonedRuleSet_12_use_3_node_modules_vue_loader_lib_index_js_vue_loader_options_ActivityList_vue_vue_type_style_index_0_id_18e7219c_lang_scss_scoped_true__WEBPACK_IMPORTED_MODULE_1__["default"], options);



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_clonedRuleSet_12_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_12_use_2_node_modules_sass_loader_dist_cjs_js_clonedRuleSet_12_use_3_node_modules_vue_loader_lib_index_js_vue_loader_options_ActivityList_vue_vue_type_style_index_0_id_18e7219c_lang_scss_scoped_true__WEBPACK_IMPORTED_MODULE_1__["default"].locals || {});

/***/ }),

/***/ "./resources/src/components/ActivityModal.vue":
/*!****************************************************!*\
  !*** ./resources/src/components/ActivityModal.vue ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _ActivityModal_vue_vue_type_template_id_1669f108_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ActivityModal.vue?vue&type=template&id=1669f108&scoped=true */ "./resources/src/components/ActivityModal.vue?vue&type=template&id=1669f108&scoped=true");
/* harmony import */ var _ActivityModal_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ActivityModal.vue?vue&type=script&lang=js */ "./resources/src/components/ActivityModal.vue?vue&type=script&lang=js");
/* harmony import */ var _ActivityModal_vue_vue_type_style_index_0_id_1669f108_lang_scss_scoped_true__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ActivityModal.vue?vue&type=style&index=0&id=1669f108&lang=scss&scoped=true */ "./resources/src/components/ActivityModal.vue?vue&type=style&index=0&id=1669f108&lang=scss&scoped=true");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");



;


/* normalize component */

var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _ActivityModal_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__["default"],
  _ActivityModal_vue_vue_type_template_id_1669f108_scoped_true__WEBPACK_IMPORTED_MODULE_0__.render,
  _ActivityModal_vue_vue_type_template_id_1669f108_scoped_true__WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  "1669f108",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/src/components/ActivityModal.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./resources/src/components/VideoPlayerModal.vue":
/*!*******************************************************!*\
  !*** ./resources/src/components/VideoPlayerModal.vue ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _VideoPlayerModal_vue_vue_type_template_id_7f19add2_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./VideoPlayerModal.vue?vue&type=template&id=7f19add2&scoped=true */ "./resources/src/components/VideoPlayerModal.vue?vue&type=template&id=7f19add2&scoped=true");
/* harmony import */ var _VideoPlayerModal_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./VideoPlayerModal.vue?vue&type=script&lang=js */ "./resources/src/components/VideoPlayerModal.vue?vue&type=script&lang=js");
/* harmony import */ var _VideoPlayerModal_vue_vue_type_style_index_0_id_7f19add2_lang_scss_scoped_true__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./VideoPlayerModal.vue?vue&type=style&index=0&id=7f19add2&lang=scss&scoped=true */ "./resources/src/components/VideoPlayerModal.vue?vue&type=style&index=0&id=7f19add2&lang=scss&scoped=true");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");



;


/* normalize component */

var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _VideoPlayerModal_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__["default"],
  _VideoPlayerModal_vue_vue_type_template_id_7f19add2_scoped_true__WEBPACK_IMPORTED_MODULE_0__.render,
  _VideoPlayerModal_vue_vue_type_template_id_7f19add2_scoped_true__WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  "7f19add2",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/src/components/VideoPlayerModal.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./resources/src/components/WorkoutModal.vue":
/*!***************************************************!*\
  !*** ./resources/src/components/WorkoutModal.vue ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _WorkoutModal_vue_vue_type_template_id_2ea20454_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./WorkoutModal.vue?vue&type=template&id=2ea20454&scoped=true */ "./resources/src/components/WorkoutModal.vue?vue&type=template&id=2ea20454&scoped=true");
/* harmony import */ var _WorkoutModal_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./WorkoutModal.vue?vue&type=script&lang=js */ "./resources/src/components/WorkoutModal.vue?vue&type=script&lang=js");
/* harmony import */ var _WorkoutModal_vue_vue_type_style_index_0_id_2ea20454_lang_scss_scoped_true__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./WorkoutModal.vue?vue&type=style&index=0&id=2ea20454&lang=scss&scoped=true */ "./resources/src/components/WorkoutModal.vue?vue&type=style&index=0&id=2ea20454&lang=scss&scoped=true");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");



;


/* normalize component */

var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _WorkoutModal_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__["default"],
  _WorkoutModal_vue_vue_type_template_id_2ea20454_scoped_true__WEBPACK_IMPORTED_MODULE_0__.render,
  _WorkoutModal_vue_vue_type_template_id_2ea20454_scoped_true__WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  "2ea20454",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/src/components/WorkoutModal.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./resources/src/views/app/pages/Workout/ActivityList.vue":
/*!****************************************************************!*\
  !*** ./resources/src/views/app/pages/Workout/ActivityList.vue ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _ActivityList_vue_vue_type_template_id_18e7219c_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ActivityList.vue?vue&type=template&id=18e7219c&scoped=true */ "./resources/src/views/app/pages/Workout/ActivityList.vue?vue&type=template&id=18e7219c&scoped=true");
/* harmony import */ var _ActivityList_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ActivityList.vue?vue&type=script&lang=js */ "./resources/src/views/app/pages/Workout/ActivityList.vue?vue&type=script&lang=js");
/* harmony import */ var _ActivityList_vue_vue_type_style_index_0_id_18e7219c_lang_scss_scoped_true__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ActivityList.vue?vue&type=style&index=0&id=18e7219c&lang=scss&scoped=true */ "./resources/src/views/app/pages/Workout/ActivityList.vue?vue&type=style&index=0&id=18e7219c&lang=scss&scoped=true");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");



;


/* normalize component */

var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _ActivityList_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__["default"],
  _ActivityList_vue_vue_type_template_id_18e7219c_scoped_true__WEBPACK_IMPORTED_MODULE_0__.render,
  _ActivityList_vue_vue_type_template_id_18e7219c_scoped_true__WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  "18e7219c",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/src/views/app/pages/Workout/ActivityList.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./resources/src/components/ActivityModal.vue?vue&type=script&lang=js":
/*!****************************************************************************!*\
  !*** ./resources/src/components/ActivityModal.vue?vue&type=script&lang=js ***!
  \****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ActivityModal_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./ActivityModal.vue?vue&type=script&lang=js */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/components/ActivityModal.vue?vue&type=script&lang=js");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ActivityModal_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/src/components/VideoPlayerModal.vue?vue&type=script&lang=js":
/*!*******************************************************************************!*\
  !*** ./resources/src/components/VideoPlayerModal.vue?vue&type=script&lang=js ***!
  \*******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_VideoPlayerModal_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./VideoPlayerModal.vue?vue&type=script&lang=js */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/components/VideoPlayerModal.vue?vue&type=script&lang=js");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_VideoPlayerModal_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/src/components/WorkoutModal.vue?vue&type=script&lang=js":
/*!***************************************************************************!*\
  !*** ./resources/src/components/WorkoutModal.vue?vue&type=script&lang=js ***!
  \***************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_WorkoutModal_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./WorkoutModal.vue?vue&type=script&lang=js */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/components/WorkoutModal.vue?vue&type=script&lang=js");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_WorkoutModal_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/src/views/app/pages/Workout/ActivityList.vue?vue&type=script&lang=js":
/*!****************************************************************************************!*\
  !*** ./resources/src/views/app/pages/Workout/ActivityList.vue?vue&type=script&lang=js ***!
  \****************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ActivityList_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./ActivityList.vue?vue&type=script&lang=js */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/Workout/ActivityList.vue?vue&type=script&lang=js");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ActivityList_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/src/components/ActivityModal.vue?vue&type=style&index=0&id=1669f108&lang=scss&scoped=true":
/*!*************************************************************************************************************!*\
  !*** ./resources/src/components/ActivityModal.vue?vue&type=style&index=0&id=1669f108&lang=scss&scoped=true ***!
  \*************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_dist_cjs_js_node_modules_css_loader_dist_cjs_js_clonedRuleSet_12_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_12_use_2_node_modules_sass_loader_dist_cjs_js_clonedRuleSet_12_use_3_node_modules_vue_loader_lib_index_js_vue_loader_options_ActivityModal_vue_vue_type_style_index_0_id_1669f108_lang_scss_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/style-loader/dist/cjs.js!../../../node_modules/css-loader/dist/cjs.js??clonedRuleSet-12.use[1]!../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12.use[2]!../../../node_modules/sass-loader/dist/cjs.js??clonedRuleSet-12.use[3]!../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./ActivityModal.vue?vue&type=style&index=0&id=1669f108&lang=scss&scoped=true */ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-12.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12.use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-12.use[3]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/components/ActivityModal.vue?vue&type=style&index=0&id=1669f108&lang=scss&scoped=true");


/***/ }),

/***/ "./resources/src/components/VideoPlayerModal.vue?vue&type=style&index=0&id=7f19add2&lang=scss&scoped=true":
/*!****************************************************************************************************************!*\
  !*** ./resources/src/components/VideoPlayerModal.vue?vue&type=style&index=0&id=7f19add2&lang=scss&scoped=true ***!
  \****************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_dist_cjs_js_node_modules_css_loader_dist_cjs_js_clonedRuleSet_12_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_12_use_2_node_modules_sass_loader_dist_cjs_js_clonedRuleSet_12_use_3_node_modules_vue_loader_lib_index_js_vue_loader_options_VideoPlayerModal_vue_vue_type_style_index_0_id_7f19add2_lang_scss_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/style-loader/dist/cjs.js!../../../node_modules/css-loader/dist/cjs.js??clonedRuleSet-12.use[1]!../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12.use[2]!../../../node_modules/sass-loader/dist/cjs.js??clonedRuleSet-12.use[3]!../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./VideoPlayerModal.vue?vue&type=style&index=0&id=7f19add2&lang=scss&scoped=true */ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-12.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12.use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-12.use[3]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/components/VideoPlayerModal.vue?vue&type=style&index=0&id=7f19add2&lang=scss&scoped=true");


/***/ }),

/***/ "./resources/src/components/WorkoutModal.vue?vue&type=style&index=0&id=2ea20454&lang=scss&scoped=true":
/*!************************************************************************************************************!*\
  !*** ./resources/src/components/WorkoutModal.vue?vue&type=style&index=0&id=2ea20454&lang=scss&scoped=true ***!
  \************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_dist_cjs_js_node_modules_css_loader_dist_cjs_js_clonedRuleSet_12_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_12_use_2_node_modules_sass_loader_dist_cjs_js_clonedRuleSet_12_use_3_node_modules_vue_loader_lib_index_js_vue_loader_options_WorkoutModal_vue_vue_type_style_index_0_id_2ea20454_lang_scss_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/style-loader/dist/cjs.js!../../../node_modules/css-loader/dist/cjs.js??clonedRuleSet-12.use[1]!../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12.use[2]!../../../node_modules/sass-loader/dist/cjs.js??clonedRuleSet-12.use[3]!../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./WorkoutModal.vue?vue&type=style&index=0&id=2ea20454&lang=scss&scoped=true */ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-12.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12.use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-12.use[3]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/components/WorkoutModal.vue?vue&type=style&index=0&id=2ea20454&lang=scss&scoped=true");


/***/ }),

/***/ "./resources/src/views/app/pages/Workout/ActivityList.vue?vue&type=style&index=0&id=18e7219c&lang=scss&scoped=true":
/*!*************************************************************************************************************************!*\
  !*** ./resources/src/views/app/pages/Workout/ActivityList.vue?vue&type=style&index=0&id=18e7219c&lang=scss&scoped=true ***!
  \*************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_dist_cjs_js_node_modules_css_loader_dist_cjs_js_clonedRuleSet_12_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_12_use_2_node_modules_sass_loader_dist_cjs_js_clonedRuleSet_12_use_3_node_modules_vue_loader_lib_index_js_vue_loader_options_ActivityList_vue_vue_type_style_index_0_id_18e7219c_lang_scss_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/style-loader/dist/cjs.js!../../../../../../node_modules/css-loader/dist/cjs.js??clonedRuleSet-12.use[1]!../../../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12.use[2]!../../../../../../node_modules/sass-loader/dist/cjs.js??clonedRuleSet-12.use[3]!../../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./ActivityList.vue?vue&type=style&index=0&id=18e7219c&lang=scss&scoped=true */ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-12.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12.use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-12.use[3]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/Workout/ActivityList.vue?vue&type=style&index=0&id=18e7219c&lang=scss&scoped=true");


/***/ }),

/***/ "./resources/src/components/ActivityModal.vue?vue&type=template&id=1669f108&scoped=true":
/*!**********************************************************************************************!*\
  !*** ./resources/src/components/ActivityModal.vue?vue&type=template&id=1669f108&scoped=true ***!
  \**********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_ActivityModal_vue_vue_type_template_id_1669f108_scoped_true__WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   staticRenderFns: () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_ActivityModal_vue_vue_type_template_id_1669f108_scoped_true__WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_ActivityModal_vue_vue_type_template_id_1669f108_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./ActivityModal.vue?vue&type=template&id=1669f108&scoped=true */ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/components/ActivityModal.vue?vue&type=template&id=1669f108&scoped=true");


/***/ }),

/***/ "./resources/src/components/VideoPlayerModal.vue?vue&type=template&id=7f19add2&scoped=true":
/*!*************************************************************************************************!*\
  !*** ./resources/src/components/VideoPlayerModal.vue?vue&type=template&id=7f19add2&scoped=true ***!
  \*************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_VideoPlayerModal_vue_vue_type_template_id_7f19add2_scoped_true__WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   staticRenderFns: () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_VideoPlayerModal_vue_vue_type_template_id_7f19add2_scoped_true__WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_VideoPlayerModal_vue_vue_type_template_id_7f19add2_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./VideoPlayerModal.vue?vue&type=template&id=7f19add2&scoped=true */ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/components/VideoPlayerModal.vue?vue&type=template&id=7f19add2&scoped=true");


/***/ }),

/***/ "./resources/src/components/WorkoutModal.vue?vue&type=template&id=2ea20454&scoped=true":
/*!*********************************************************************************************!*\
  !*** ./resources/src/components/WorkoutModal.vue?vue&type=template&id=2ea20454&scoped=true ***!
  \*********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_WorkoutModal_vue_vue_type_template_id_2ea20454_scoped_true__WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   staticRenderFns: () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_WorkoutModal_vue_vue_type_template_id_2ea20454_scoped_true__WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_WorkoutModal_vue_vue_type_template_id_2ea20454_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./WorkoutModal.vue?vue&type=template&id=2ea20454&scoped=true */ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/components/WorkoutModal.vue?vue&type=template&id=2ea20454&scoped=true");


/***/ }),

/***/ "./resources/src/views/app/pages/Workout/ActivityList.vue?vue&type=template&id=18e7219c&scoped=true":
/*!**********************************************************************************************************!*\
  !*** ./resources/src/views/app/pages/Workout/ActivityList.vue?vue&type=template&id=18e7219c&scoped=true ***!
  \**********************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_ActivityList_vue_vue_type_template_id_18e7219c_scoped_true__WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   staticRenderFns: () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_ActivityList_vue_vue_type_template_id_18e7219c_scoped_true__WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_ActivityList_vue_vue_type_template_id_18e7219c_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./ActivityList.vue?vue&type=template&id=18e7219c&scoped=true */ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/Workout/ActivityList.vue?vue&type=template&id=18e7219c&scoped=true");


/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/components/ActivityModal.vue?vue&type=template&id=1669f108&scoped=true":
/*!*************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/components/ActivityModal.vue?vue&type=template&id=1669f108&scoped=true ***!
  \*************************************************************************************************************************************************************************************************************************************/
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
    "b-modal",
    {
      staticClass: "activity-modal",
      attrs: {
        id: "activity-modal",
        size: "lg",
        title: _vm.modalTitle,
        visible: _vm.visible,
        "hide-footer": "",
        centered: "",
        scrollable: "",
        "no-close-on-backdrop": "",
        "no-close-on-esc": "",
      },
      on: {
        hide: function ($event) {
          return _vm.$emit("close")
        },
        close: function ($event) {
          _vm.showActivityModal = false
        },
        submit: _vm.addActivity,
      },
    },
    [
      _c("div", { staticClass: "progress-indicator" }, [
        _c(
          "div",
          { staticClass: "progress-steps" },
          _vm._l(_vm.steps, function (step, index) {
            return _c(
              "div",
              {
                key: index,
                class: [
                  "step",
                  {
                    active: _vm.currentStep >= index,
                    completed: _vm.currentStep > index,
                  },
                ],
                on: {
                  click: function ($event) {
                    return _vm.goToStep(index)
                  },
                },
              },
              [
                _c("div", { staticClass: "step-number" }, [
                  _vm._v(_vm._s(index + 1)),
                ]),
                _vm._v(" "),
                _c("div", { staticClass: "step-label" }, [
                  _vm._v(_vm._s(step.label)),
                ]),
              ]
            )
          }),
          0
        ),
      ]),
      _vm._v(" "),
      _c(
        "form",
        {
          staticClass: "activity-form",
          on: {
            submit: function ($event) {
              $event.preventDefault()
              return _vm.handleSubmit.apply(null, arguments)
            },
          },
        },
        [
          _vm.steps.length > 1
            ? _c("div", { staticClass: "step-navigation" }, [
                _c(
                  "button",
                  {
                    staticClass: "btn btn-outline-secondary",
                    attrs: { type: "button", disabled: _vm.currentStep === 0 },
                    on: { click: _vm.previousStep },
                  },
                  [
                    _c("i", { staticClass: "fas fa-chevron-left" }),
                    _vm._v(" Previous\n            "),
                  ]
                ),
                _vm._v(" "),
                _c("span", { staticClass: "step-counter" }, [
                  _vm._v(
                    _vm._s(_vm.currentStep + 1) +
                      " of " +
                      _vm._s(_vm.steps.length)
                  ),
                ]),
                _vm._v(" "),
                _c(
                  "button",
                  {
                    staticClass: "btn btn-primary",
                    attrs: {
                      type: "button",
                      disabled: _vm.currentStep === _vm.steps.length - 1,
                    },
                    on: { click: _vm.nextStep },
                  },
                  [
                    _vm._v("\n                Next "),
                    _c("i", { staticClass: "fas fa-chevron-right" }),
                  ]
                ),
              ])
            : _vm._e(),
          _vm._v(" "),
          _c(
            "div",
            {
              directives: [
                {
                  name: "show",
                  rawName: "v-show",
                  value: _vm.currentStep === 0,
                  expression: "currentStep === 0",
                },
              ],
              staticClass: "form-section step-content",
            },
            [
              _c("h4", { staticClass: "section-title" }, [
                _vm._v("Basic Information"),
              ]),
              _vm._v(" "),
              _c(
                "b-row",
                [
                  _c(
                    "b-col",
                    { attrs: { md: "6" } },
                    [
                      _c(
                        "b-form-group",
                        { staticClass: "form-group-modern" },
                        [
                          _c("template", { slot: "label" }, [
                            _vm._v(
                              "\n                            Activity Name "
                            ),
                            _c("span", { staticClass: "required-asterisk" }, [
                              _vm._v("*"),
                            ]),
                          ]),
                          _vm._v(" "),
                          _c("b-form-input", {
                            staticClass: "form-input-modern",
                            attrs: {
                              required: "",
                              placeholder: "Enter title (e.g., Full Body Burn)",
                            },
                            model: {
                              value: _vm.form.name,
                              callback: function ($$v) {
                                _vm.$set(_vm.form, "name", $$v)
                              },
                              expression: "form.name",
                            },
                          }),
                        ],
                        2
                      ),
                    ],
                    1
                  ),
                  _vm._v(" "),
                  _c(
                    "b-col",
                    { attrs: { md: "6" } },
                    [
                      _c(
                        "b-form-group",
                        { staticClass: "form-group-modern" },
                        [
                          _c("template", { slot: "label" }, [
                            _vm._v("\n                            Category "),
                            _c("span", { staticClass: "required-asterisk" }, [
                              _vm._v("*"),
                            ]),
                          ]),
                          _vm._v(" "),
                          _c("b-form-select", {
                            staticClass: "form-select-modern",
                            attrs: {
                              options: [
                                { value: null, text: "Choose category" },
                              ].concat(_vm.categories),
                              required: "",
                            },
                            model: {
                              value: _vm.form.category,
                              callback: function ($$v) {
                                _vm.$set(_vm.form, "category", $$v)
                              },
                              expression: "form.category",
                            },
                          }),
                        ],
                        2
                      ),
                    ],
                    1
                  ),
                ],
                1
              ),
              _vm._v(" "),
              _c(
                "b-row",
                [
                  _c(
                    "b-col",
                    { attrs: { md: "6" } },
                    [
                      _c(
                        "b-form-group",
                        { staticClass: "form-group-modern" },
                        [
                          _c("template", { slot: "label" }, [
                            _vm._v(
                              "\n                            Duration (minutes) "
                            ),
                            _c("span", { staticClass: "required-asterisk" }, [
                              _vm._v("*"),
                            ]),
                          ]),
                          _vm._v(" "),
                          _c("b-form-input", {
                            staticClass: "form-input-modern",
                            attrs: {
                              type: "number",
                              required: "",
                              placeholder: "e.g., 30",
                            },
                            model: {
                              value: _vm.form.duration,
                              callback: function ($$v) {
                                _vm.$set(_vm.form, "duration", $$v)
                              },
                              expression: "form.duration",
                            },
                          }),
                        ],
                        2
                      ),
                    ],
                    1
                  ),
                  _vm._v(" "),
                  _c(
                    "b-col",
                    { attrs: { md: "6" } },
                    [
                      _c(
                        "b-form-group",
                        { staticClass: "form-group-modern" },
                        [
                          _c("template", { slot: "label" }, [
                            _vm._v("\n                            Level "),
                            _c("span", { staticClass: "required-asterisk" }, [
                              _vm._v("*"),
                            ]),
                          ]),
                          _vm._v(" "),
                          _c("b-form-select", {
                            staticClass: "form-select-modern",
                            attrs: {
                              options: _vm.levels,
                              required: "",
                              placeholder: "Select level",
                            },
                            model: {
                              value: _vm.form.level,
                              callback: function ($$v) {
                                _vm.$set(_vm.form, "level", $$v)
                              },
                              expression: "form.level",
                            },
                          }),
                        ],
                        2
                      ),
                    ],
                    1
                  ),
                  _vm._v(" "),
                  _c(
                    "b-col",
                    { staticStyle: { display: "none" }, attrs: { md: "0" } },
                    [
                      _c(
                        "b-form-group",
                        {
                          staticClass: "form-group-modern",
                          attrs: { label: "Calories Burned" },
                        },
                        [
                          _c("b-form-input", {
                            staticClass: "form-input-modern",
                            attrs: { type: "number", placeholder: "e.g., 200" },
                            model: {
                              value: _vm.form.calories,
                              callback: function ($$v) {
                                _vm.$set(_vm.form, "calories", $$v)
                              },
                              expression: "form.calories",
                            },
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
              _vm._v(" "),
              _c(
                "b-row",
                [
                  _c(
                    "b-col",
                    { attrs: { md: "6" } },
                    [
                      _c(
                        "b-form-group",
                        {
                          staticClass: "form-group-modern",
                          attrs: { label: "Difficulty Level" },
                        },
                        [
                          _c("div", { staticClass: "difficulty-slider" }, [
                            _c("input", {
                              directives: [
                                {
                                  name: "model",
                                  rawName: "v-model",
                                  value: _vm.form.difficulty,
                                  expression: "form.difficulty",
                                },
                              ],
                              staticClass: "form-range",
                              attrs: { type: "range", min: "1", max: "10" },
                              domProps: { value: _vm.form.difficulty },
                              on: {
                                input: _vm.updateDifficultyLabel,
                                __r: function ($event) {
                                  return _vm.$set(
                                    _vm.form,
                                    "difficulty",
                                    $event.target.value
                                  )
                                },
                              },
                            }),
                            _vm._v(" "),
                            _c("div", { staticClass: "difficulty-label" }, [
                              _c("span", { staticClass: "difficulty-value" }, [
                                _vm._v(_vm._s(_vm.difficultyLabel)),
                              ]),
                              _vm._v(" "),
                              _c("span", { staticClass: "difficulty-number" }, [
                                _vm._v(
                                  "(" +
                                    _vm._s(_vm.form.difficulty || 1) +
                                    "/10)"
                                ),
                              ]),
                            ]),
                          ]),
                        ]
                      ),
                    ],
                    1
                  ),
                  _vm._v(" "),
                  _c(
                    "b-col",
                    { attrs: { md: "6" } },
                    [
                      _c(
                        "b-form-group",
                        {
                          staticClass: "form-group-modern",
                          attrs: { label: "Visible for" },
                        },
                        [
                          _c("b-form-select", {
                            staticClass: "form-select-modern",
                            attrs: { options: _vm.visibleForOptions },
                            model: {
                              value: _vm.form.visibleFor,
                              callback: function ($$v) {
                                _vm.$set(_vm.form, "visibleFor", $$v)
                              },
                              expression: "form.visibleFor",
                            },
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
              _vm._v(" "),
              _c("hr", { staticClass: "section-divider" }),
              _vm._v(" "),
              _c("h4", { staticClass: "section-title" }, [
                _vm._v("Activity Details & Media"),
              ]),
              _vm._v(" "),
              _c(
                "b-form-group",
                { staticClass: "form-group-modern" },
                [
                  _c("template", { slot: "label" }, [
                    _vm._v("\n                    Description "),
                    _c("span", { staticClass: "required-asterisk" }, [
                      _vm._v("*"),
                    ]),
                  ]),
                  _vm._v(" "),
                  _c("b-form-textarea", {
                    staticClass: "form-textarea-modern",
                    attrs: {
                      rows: "3",
                      placeholder:
                        "Briefly describe the workout focus and goals",
                      required: "",
                    },
                    model: {
                      value: _vm.form.description,
                      callback: function ($$v) {
                        _vm.$set(_vm.form, "description", $$v)
                      },
                      expression: "form.description",
                    },
                  }),
                ],
                2
              ),
              _vm._v(" "),
              _c(
                "b-form-group",
                {
                  staticClass: "form-group-modern",
                  attrs: { label: "Instructions" },
                },
                [
                  _c("b-form-textarea", {
                    staticClass: "form-textarea-modern",
                    attrs: {
                      rows: "4",
                      placeholder:
                        "Step-by-step guide on how to perform this workout",
                    },
                    model: {
                      value: _vm.form.instructions,
                      callback: function ($$v) {
                        _vm.$set(_vm.form, "instructions", $$v)
                      },
                      expression: "form.instructions",
                    },
                  }),
                ],
                1
              ),
              _vm._v(" "),
              _c(
                "b-row",
                [
                  _c(
                    "b-col",
                    { attrs: { md: "6" } },
                    [
                      _c(
                        "b-form-group",
                        {
                          staticClass: "form-group-modern",
                          attrs: { label: "Equipment Needed" },
                        },
                        [
                          _c("b-form-input", {
                            staticClass: "form-input-modern",
                            attrs: {
                              placeholder:
                                "e.g., Dumbbells, Resistance Bands, Yoga Mat",
                            },
                            model: {
                              value: _vm.form.equipment,
                              callback: function ($$v) {
                                _vm.$set(_vm.form, "equipment", $$v)
                              },
                              expression: "form.equipment",
                            },
                          }),
                        ],
                        1
                      ),
                    ],
                    1
                  ),
                  _vm._v(" "),
                  _c(
                    "b-col",
                    { attrs: { md: "6" } },
                    [
                      _c(
                        "b-form-group",
                        {
                          staticClass: "form-group-modern",
                          attrs: { label: "Tags (comma separated)" },
                        },
                        [
                          _c("b-form-input", {
                            staticClass: "form-input-modern",
                            attrs: {
                              placeholder:
                                "e.g., fat burn, full body, strength",
                            },
                            model: {
                              value: _vm.form.tags,
                              callback: function ($$v) {
                                _vm.$set(_vm.form, "tags", $$v)
                              },
                              expression: "form.tags",
                            },
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
              _vm._v(" "),
              _c("hr", { staticClass: "section-divider" }),
              _vm._v(" "),
              _c("h5", { staticClass: "subsection-title" }, [
                _vm._v("Media & Visuals"),
              ]),
              _vm._v(" "),
              _c(
                "b-form-group",
                {
                  staticClass: "form-group-modern",
                  attrs: { label: "Activity Thumbnail" },
                },
                [
                  _c("div", { staticClass: "upload-hint" }, [
                    _c("i", { staticClass: "fas fa-info-circle" }),
                    _vm._v(
                      "\n                    Add a clear image that represents this activity (recommended: 800x600px)\n                "
                    ),
                  ]),
                  _vm._v(" "),
                  _c(
                    "div",
                    {
                      staticClass:
                        "file-upload-wrapper position-relative thumbnail-box",
                    },
                    [
                      _c("input", {
                        ref: "thumbnailInput",
                        staticClass: "file-input-modern",
                        attrs: { type: "file", accept: "image/*" },
                        on: { change: _vm.previewThumbnail },
                      }),
                      _vm._v(" "),
                      !_vm.thumbnailUrl
                        ? _c(
                            "div",
                            {
                              staticClass: "file-upload-overlay",
                              on: {
                                click: function ($event) {
                                  return _vm.$refs.thumbnailInput.click()
                                },
                              },
                            },
                            [
                              _c("i", { staticClass: "fas fa-image" }),
                              _vm._v(" "),
                              _c("span", [
                                _vm._v("Click to upload or drag image here"),
                              ]),
                              _vm._v(" "),
                              _c("small", [_vm._v("JPG, PNG, GIF up to 5MB")]),
                            ]
                          )
                        : _vm._e(),
                      _vm._v(" "),
                      _vm.thumbnailUrl
                        ? _c(
                            "div",
                            { staticClass: "thumbnail-overlay-preview" },
                            [
                              _c("img", {
                                staticClass: "thumbnail-image",
                                attrs: {
                                  src: _vm.thumbnailUrl,
                                  alt: "Thumbnail Preview",
                                },
                              }),
                              _vm._v(" "),
                              _c("div", { staticClass: "thumbnail-actions" }, [
                                _c(
                                  "button",
                                  {
                                    staticClass:
                                      "btn btn-sm btn-outline-light me-2",
                                    attrs: { type: "button" },
                                    on: {
                                      click: function ($event) {
                                        return _vm.$refs.thumbnailInput.click()
                                      },
                                    },
                                  },
                                  [_c("i", { staticClass: "fas fa-edit" })]
                                ),
                                _vm._v(" "),
                                _c(
                                  "button",
                                  {
                                    staticClass:
                                      "btn btn-sm btn-outline-danger",
                                    attrs: { type: "button" },
                                    on: { click: _vm.removeThumbnail },
                                  },
                                  [_c("i", { staticClass: "fas fa-trash-alt" })]
                                ),
                              ]),
                            ]
                          )
                        : _vm._e(),
                    ]
                  ),
                ]
              ),
              _vm._v(" "),
              _c(
                "b-form-group",
                {
                  staticClass: "form-group-modern",
                  attrs: { label: "Video Tutorial" },
                },
                [
                  _c("div", { staticClass: "upload-hint" }, [
                    _c("i", { staticClass: "fas fa-info-circle" }),
                    _vm._v(
                      "\n                    Select from available videos or add a custom link\n                "
                    ),
                  ]),
                  _vm._v(" "),
                  _c(
                    "b-nav",
                    { staticClass: "video-tabs", attrs: { tabs: "" } },
                    [
                      _c(
                        "b-nav-item",
                        {
                          attrs: {
                            active: _vm.videoSelectionMode === "uploaded",
                          },
                          on: {
                            click: function ($event) {
                              _vm.videoSelectionMode = "uploaded"
                            },
                          },
                        },
                        [
                          _c("i", { staticClass: "fas fa-video" }),
                          _vm._v(" Library\n                    "),
                        ]
                      ),
                      _vm._v(" "),
                      _c(
                        "b-nav-item",
                        {
                          attrs: {
                            active: _vm.videoSelectionMode === "custom",
                          },
                          on: {
                            click: function ($event) {
                              _vm.videoSelectionMode = "custom"
                            },
                          },
                        },
                        [
                          _c("i", { staticClass: "fas fa-link" }),
                          _vm._v(" Link\n                    "),
                        ]
                      ),
                    ],
                    1
                  ),
                  _vm._v(" "),
                  _vm.videoSelectionMode === "uploaded"
                    ? _c("div", { staticClass: "video-selection-content" }, [
                        Object.keys(_vm.enhancedVideoFilters).length
                          ? _c("div", { staticClass: "video-filters mb-3" }, [
                              _c(
                                "div",
                                { staticClass: "row" },
                                [
                                  _vm._l(
                                    _vm.enhancedVideoFilters,
                                    function (options, header) {
                                      return _c(
                                        "div",
                                        {
                                          key: header,
                                          staticClass: "col-md-3 mb-2",
                                        },
                                        [
                                          _c(
                                            "label",
                                            { staticClass: "form-label" },
                                            [_vm._v(_vm._s(header))]
                                          ),
                                          _vm._v(" "),
                                          _c(
                                            "b-form-select",
                                            {
                                              staticClass: "form-select-modern",
                                              attrs: {
                                                options: [
                                                  {
                                                    value: "",
                                                    text: "All " + header,
                                                  },
                                                ],
                                              },
                                              on: {
                                                change: _vm.applyVideoFilters,
                                              },
                                              model: {
                                                value:
                                                  _vm.selectedVideoFilters[
                                                    header
                                                  ],
                                                callback: function ($$v) {
                                                  _vm.$set(
                                                    _vm.selectedVideoFilters,
                                                    header,
                                                    $$v
                                                  )
                                                },
                                                expression:
                                                  "selectedVideoFilters[header]",
                                              },
                                            },
                                            _vm._l(options, function (option) {
                                              return _c(
                                                "option",
                                                {
                                                  key: option,
                                                  domProps: { value: option },
                                                },
                                                [
                                                  _vm._v(
                                                    "\n                                        " +
                                                      _vm._s(option) +
                                                      "\n                                    "
                                                  ),
                                                ]
                                              )
                                            }),
                                            0
                                          ),
                                        ],
                                        1
                                      )
                                    }
                                  ),
                                  _vm._v(" "),
                                  _c(
                                    "div",
                                    { staticClass: "col-md-3 mb-2" },
                                    [
                                      _c(
                                        "label",
                                        { staticClass: "form-label" },
                                        [_vm._v("Search")]
                                      ),
                                      _vm._v(" "),
                                      _c("b-form-input", {
                                        staticClass: "form-input-modern",
                                        attrs: {
                                          placeholder: "Search videos...",
                                        },
                                        on: { input: _vm.applyVideoFilters },
                                        model: {
                                          value: _vm.videoSearchQuery,
                                          callback: function ($$v) {
                                            _vm.videoSearchQuery = $$v
                                          },
                                          expression: "videoSearchQuery",
                                        },
                                      }),
                                    ],
                                    1
                                  ),
                                ],
                                2
                              ),
                              _vm._v(" "),
                              _c("div", { staticClass: "row mt-2" }, [
                                _c("div", { staticClass: "col-12" }, [
                                  _c(
                                    "button",
                                    {
                                      staticClass:
                                        "btn btn-sm btn-outline-secondary",
                                      attrs: { type: "button" },
                                      on: { click: _vm.clearVideoFilters },
                                    },
                                    [
                                      _c("i", { staticClass: "fas fa-times" }),
                                      _vm._v(
                                        " Clear Filters\n                                "
                                      ),
                                    ]
                                  ),
                                  _vm._v(" "),
                                  _c(
                                    "span",
                                    { staticClass: "ml-2 text-muted" },
                                    [
                                      _vm._v(
                                        "\n                                    Showing " +
                                          _vm._s(
                                            _vm.filteredAvailableVideos.length
                                          ) +
                                          " of " +
                                          _vm._s(_vm.availableVideos.length) +
                                          " videos\n                                "
                                      ),
                                    ]
                                  ),
                                ]),
                              ]),
                            ])
                          : _vm._e(),
                        _vm._v(" "),
                        _vm.loadingVideos
                          ? _c("div", { staticClass: "text-center py-3" }, [
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
                              _c("p", { staticClass: "mt-2 mb-0" }, [
                                _vm._v("Loading videos..."),
                              ]),
                            ])
                          : _vm.filteredAvailableVideos &&
                            _vm.filteredAvailableVideos.length > 0
                          ? _c(
                              "div",
                              { staticClass: "video-grid" },
                              _vm._l(
                                _vm.filteredAvailableVideos,
                                function (video) {
                                  return _c(
                                    "div",
                                    {
                                      key: video.filename,
                                      staticClass: "video-item",
                                      class: {
                                        selected:
                                          _vm.selectedVideo &&
                                          _vm.selectedVideo.filename ===
                                            video.filename,
                                      },
                                      on: {
                                        click: function ($event) {
                                          return _vm.selectVideo(video)
                                        },
                                      },
                                    },
                                    [
                                      _c(
                                        "div",
                                        { staticClass: "video-preview" },
                                        [
                                          video.thumbnail_url
                                            ? _c(
                                                "div",
                                                {
                                                  staticClass:
                                                    "thumbnail-container",
                                                },
                                                [
                                                  _c("img", {
                                                    staticClass:
                                                      "video-thumbnail",
                                                    attrs: {
                                                      src: video.thumbnail_url,
                                                      alt: video.name,
                                                    },
                                                    on: {
                                                      click: function ($event) {
                                                        return _vm.playVideo(
                                                          video
                                                        )
                                                      },
                                                    },
                                                  }),
                                                  _vm._v(" "),
                                                  _c(
                                                    "div",
                                                    {
                                                      staticClass:
                                                        "play-overlay",
                                                      on: {
                                                        click: function (
                                                          $event
                                                        ) {
                                                          return _vm.playVideo(
                                                            video
                                                          )
                                                        },
                                                      },
                                                    },
                                                    [
                                                      _c("i", {
                                                        staticClass:
                                                          "fas fa-play",
                                                      }),
                                                    ]
                                                  ),
                                                ]
                                              )
                                            : _c(
                                                "div",
                                                {
                                                  staticClass: "no-thumbnail",
                                                  on: {
                                                    click: function ($event) {
                                                      return _vm.playVideo(
                                                        video
                                                      )
                                                    },
                                                  },
                                                },
                                                [
                                                  _c("i", {
                                                    staticClass: "fas fa-video",
                                                  }),
                                                  _vm._v(" "),
                                                  _c("span", [
                                                    _vm._v("No thumbnail"),
                                                  ]),
                                                  _vm._v(" "),
                                                  _c(
                                                    "div",
                                                    {
                                                      staticClass:
                                                        "play-overlay",
                                                    },
                                                    [
                                                      _c("i", {
                                                        staticClass:
                                                          "fas fa-play",
                                                      }),
                                                    ]
                                                  ),
                                                ]
                                              ),
                                        ]
                                      ),
                                      _vm._v(" "),
                                      _c("div", { staticClass: "video-info" }, [
                                        _c(
                                          "h6",
                                          { staticClass: "video-name" },
                                          [_vm._v(_vm._s(video.name))]
                                        ),
                                        _vm._v(" "),
                                        _c(
                                          "small",
                                          { staticClass: "video-size" },
                                          [
                                            _vm._v(
                                              _vm._s(
                                                _vm.formatFileSize(video.size)
                                              )
                                            ),
                                          ]
                                        ),
                                      ]),
                                      _vm._v(" "),
                                      _vm.selectedVideo &&
                                      _vm.selectedVideo.filename ===
                                        video.filename
                                        ? _c(
                                            "div",
                                            {
                                              staticClass: "selected-indicator",
                                            },
                                            [
                                              _c("i", {
                                                staticClass:
                                                  "fas fa-check-circle",
                                              }),
                                            ]
                                          )
                                        : _vm._e(),
                                    ]
                                  )
                                }
                              ),
                              0
                            )
                          : _vm.availableVideos &&
                            _vm.availableVideos.length > 0
                          ? _c(
                              "div",
                              { staticClass: "video-grid" },
                              [
                                _c(
                                  "div",
                                  { staticClass: "alert alert-info mb-3" },
                                  [
                                    _c("strong", [_vm._v("DEBUG:")]),
                                    _vm._v(
                                      " Showing " +
                                        _vm._s(_vm.availableVideos.length) +
                                        " videos directly from availableVideos\n                            "
                                    ),
                                    _c("br"),
                                    _vm._v(
                                      "filteredAvailableVideos: " +
                                        _vm._s(
                                          _vm.filteredAvailableVideos
                                            ? _vm.filteredAvailableVideos.length
                                            : "undefined"
                                        ) +
                                        "\n                        "
                                    ),
                                  ]
                                ),
                                _vm._v(" "),
                                _vm._l(
                                  _vm.availableVideos.slice(0, 10),
                                  function (video) {
                                    return _c(
                                      "div",
                                      {
                                        key: video.filename || video.name,
                                        staticClass: "video-item",
                                        class: {
                                          selected:
                                            _vm.selectedVideo &&
                                            _vm.selectedVideo.filename ===
                                              video.filename,
                                        },
                                        on: {
                                          click: function ($event) {
                                            return _vm.selectVideo(video)
                                          },
                                        },
                                      },
                                      [
                                        _c(
                                          "div",
                                          { staticClass: "video-preview" },
                                          [
                                            video.thumbnail_url
                                              ? _c(
                                                  "div",
                                                  {
                                                    staticClass:
                                                      "thumbnail-container",
                                                  },
                                                  [
                                                    _c("img", {
                                                      staticClass:
                                                        "video-thumbnail",
                                                      attrs: {
                                                        src: video.thumbnail_url,
                                                        alt: video.name,
                                                      },
                                                      on: {
                                                        click: function (
                                                          $event
                                                        ) {
                                                          return _vm.playVideo(
                                                            video
                                                          )
                                                        },
                                                      },
                                                    }),
                                                    _vm._v(" "),
                                                    _c(
                                                      "div",
                                                      {
                                                        staticClass:
                                                          "play-overlay",
                                                        on: {
                                                          click: function (
                                                            $event
                                                          ) {
                                                            return _vm.playVideo(
                                                              video
                                                            )
                                                          },
                                                        },
                                                      },
                                                      [
                                                        _c("i", {
                                                          staticClass:
                                                            "fas fa-play",
                                                        }),
                                                      ]
                                                    ),
                                                  ]
                                                )
                                              : _c(
                                                  "div",
                                                  {
                                                    staticClass: "no-thumbnail",
                                                    on: {
                                                      click: function ($event) {
                                                        return _vm.playVideo(
                                                          video
                                                        )
                                                      },
                                                    },
                                                  },
                                                  [
                                                    _c("i", {
                                                      staticClass:
                                                        "fas fa-video",
                                                    }),
                                                    _vm._v(" "),
                                                    _c("span", [
                                                      _vm._v("No thumbnail"),
                                                    ]),
                                                    _vm._v(" "),
                                                    _c(
                                                      "div",
                                                      {
                                                        staticClass:
                                                          "play-overlay",
                                                      },
                                                      [
                                                        _c("i", {
                                                          staticClass:
                                                            "fas fa-play",
                                                        }),
                                                      ]
                                                    ),
                                                  ]
                                                ),
                                          ]
                                        ),
                                        _vm._v(" "),
                                        _c(
                                          "div",
                                          { staticClass: "video-info" },
                                          [
                                            _c(
                                              "h6",
                                              { staticClass: "video-name" },
                                              [
                                                _vm._v(
                                                  _vm._s(
                                                    video.name || video.filename
                                                  )
                                                ),
                                              ]
                                            ),
                                            _vm._v(" "),
                                            _c(
                                              "small",
                                              { staticClass: "video-size" },
                                              [
                                                _vm._v(
                                                  _vm._s(
                                                    _vm.formatFileSize(
                                                      video.size
                                                    )
                                                  )
                                                ),
                                              ]
                                            ),
                                          ]
                                        ),
                                        _vm._v(" "),
                                        _vm.selectedVideo &&
                                        _vm.selectedVideo.filename ===
                                          video.filename
                                          ? _c(
                                              "div",
                                              {
                                                staticClass:
                                                  "selected-indicator",
                                              },
                                              [
                                                _c("i", {
                                                  staticClass:
                                                    "fas fa-check-circle",
                                                }),
                                              ]
                                            )
                                          : _vm._e(),
                                      ]
                                    )
                                  }
                                ),
                              ],
                              2
                            )
                          : _c("div", { staticClass: "text-center py-4" }, [
                              _c("i", {
                                staticClass: "fas fa-video text-muted",
                                staticStyle: { "font-size": "2rem" },
                              }),
                              _vm._v(" "),
                              _c("p", { staticClass: "mt-2 mb-0" }, [
                                _vm._v("No videos available"),
                              ]),
                              _vm._v(" "),
                              _c("small", { staticClass: "text-muted" }, [
                                _vm._v(
                                  "\n                            Total videos: " +
                                    _vm._s(_vm.availableVideos.length) +
                                    ", \n                            Filtered: " +
                                    _vm._s(
                                      _vm.filteredAvailableVideos
                                        ? _vm.filteredAvailableVideos.length
                                        : 0
                                    ) +
                                    "\n                        "
                                ),
                              ]),
                            ]),
                      ])
                    : _vm._e(),
                  _vm._v(" "),
                  _vm.videoSelectionMode === "custom"
                    ? _c(
                        "div",
                        { staticClass: "video-selection-content" },
                        [
                          _c("b-form-input", {
                            staticClass: "form-input-modern",
                            attrs: {
                              placeholder: "https://youtube.com/watch?v=...",
                            },
                            model: {
                              value: _vm.form.video_link,
                              callback: function ($$v) {
                                _vm.$set(_vm.form, "video_link", $$v)
                              },
                              expression: "form.video_link",
                            },
                          }),
                          _vm._v(" "),
                          _c("small", { staticClass: "form-text text-muted" }, [
                            _vm._v(
                              "\n                        Enter a YouTube, Vimeo, or other video URL\n                    "
                            ),
                          ]),
                        ],
                        1
                      )
                    : _vm._e(),
                ],
                1
              ),
            ],
            1
          ),
          _vm._v(" "),
          _c(
            "div",
            {
              directives: [
                {
                  name: "show",
                  rawName: "v-show",
                  value: _vm.currentStep === 1,
                  expression: "currentStep === 1",
                },
              ],
              staticClass: "form-section step-content",
            },
            [
              _c("h4", { staticClass: "section-title" }, [
                _vm._v("Exercise Setup"),
              ]),
              _vm._v(" "),
              _c(
                "b-row",
                [
                  _c(
                    "b-col",
                    { attrs: { md: "6" } },
                    [
                      _c(
                        "b-form-group",
                        {
                          staticClass: "form-group-modern",
                          attrs: { label: "Primary Muscle Group(s)" },
                        },
                        [
                          _c("b-form-select", {
                            staticClass: "form-select-modern",
                            attrs: {
                              options: _vm.muscleGroupOptions,
                              multiple: "",
                              placeholder: "Select primary muscle groups",
                            },
                            model: {
                              value: _vm.form.primaryMuscleGroups,
                              callback: function ($$v) {
                                _vm.$set(_vm.form, "primaryMuscleGroups", $$v)
                              },
                              expression: "form.primaryMuscleGroups",
                            },
                          }),
                        ],
                        1
                      ),
                    ],
                    1
                  ),
                  _vm._v(" "),
                  _c(
                    "b-col",
                    { attrs: { md: "6" } },
                    [
                      _c(
                        "b-form-group",
                        {
                          staticClass: "form-group-modern",
                          attrs: { label: "Secondary Muscle Group(s)" },
                        },
                        [
                          _c("b-form-select", {
                            staticClass: "form-select-modern",
                            attrs: {
                              options: _vm.muscleGroupOptions,
                              multiple: "",
                              placeholder: "Select secondary muscle groups",
                            },
                            model: {
                              value: _vm.form.secondaryMuscleGroups,
                              callback: function ($$v) {
                                _vm.$set(_vm.form, "secondaryMuscleGroups", $$v)
                              },
                              expression: "form.secondaryMuscleGroups",
                            },
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
              _vm._v(" "),
              _c(
                "b-row",
                [
                  _c(
                    "b-col",
                    { attrs: { md: "6" } },
                    [
                      _c(
                        "b-form-group",
                        {
                          staticClass: "form-group-modern",
                          attrs: { label: "Primary Joint" },
                        },
                        [
                          _c("b-form-select", {
                            staticClass: "form-select-modern",
                            attrs: {
                              options: [
                                { value: null, text: "Select primary joint" },
                              ].concat(_vm.jointOptions),
                            },
                            model: {
                              value: _vm.form.primaryJoint,
                              callback: function ($$v) {
                                _vm.$set(_vm.form, "primaryJoint", $$v)
                              },
                              expression: "form.primaryJoint",
                            },
                          }),
                        ],
                        1
                      ),
                    ],
                    1
                  ),
                  _vm._v(" "),
                  _c(
                    "b-col",
                    { attrs: { md: "6" } },
                    [
                      _c(
                        "b-form-group",
                        {
                          staticClass: "form-group-modern",
                          attrs: { label: "Exercise Type" },
                        },
                        [
                          _c("b-form-select", {
                            staticClass: "form-select-modern",
                            attrs: { options: _vm.typeOptions },
                            model: {
                              value: _vm.form.type,
                              callback: function ($$v) {
                                _vm.$set(_vm.form, "type", $$v)
                              },
                              expression: "form.type",
                            },
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
              _vm._v(" "),
              _c(
                "b-row",
                [
                  _c(
                    "b-col",
                    { attrs: { md: "6" } },
                    [
                      _c(
                        "b-form-group",
                        {
                          staticClass: "form-group-modern",
                          attrs: { label: "Uses Weights" },
                        },
                        [
                          _c(
                            "b-form-checkbox",
                            {
                              staticClass: "form-checkbox-modern",
                              model: {
                                value: _vm.form.usesWeights,
                                callback: function ($$v) {
                                  _vm.$set(_vm.form, "usesWeights", $$v)
                                },
                                expression: "form.usesWeights",
                              },
                            },
                            [
                              _vm._v(
                                "\n                            This exercise uses weights or resistance\n                        "
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
                    "b-col",
                    { attrs: { md: "6" } },
                    [
                      _c(
                        "b-form-group",
                        {
                          staticClass: "form-group-modern",
                          attrs: { label: "Intensity (%1RM)" },
                        },
                        [
                          _c("b-form-input", {
                            staticClass: "form-input-modern",
                            attrs: {
                              type: "number",
                              min: "0",
                              max: "100",
                              placeholder: "75",
                            },
                            model: {
                              value: _vm.form.intensity,
                              callback: function ($$v) {
                                _vm.$set(_vm.form, "intensity", $$v)
                              },
                              expression: "form.intensity",
                            },
                          }),
                          _vm._v(" "),
                          _c("small", { staticClass: "form-text text-muted" }, [
                            _vm._v("Percentage of 1 Rep Maximum"),
                          ]),
                        ],
                        1
                      ),
                    ],
                    1
                  ),
                ],
                1
              ),
              _vm._v(" "),
              _vm.form.type === "Set based" ||
              _vm.form.type === "Repetition-based"
                ? _c("div", { staticClass: "sets-configuration" }, [
                    _c("h5", { staticClass: "sets-title" }, [
                      _c("i", { staticClass: "fas fa-dumbbell" }),
                      _vm._v(
                        "\n                    Sets Configuration\n                "
                      ),
                    ]),
                    _vm._v(" "),
                    _c(
                      "div",
                      { staticClass: "sets-table" },
                      [
                        _c("div", { staticClass: "sets-header" }, [
                          _c("div", { staticClass: "set-number" }, [
                            _vm._v("Set"),
                          ]),
                          _vm._v(" "),
                          _c("div", { staticClass: "reps-column" }, [
                            _vm._v("Reps (x)"),
                          ]),
                          _vm._v(" "),
                          _c("div", { staticClass: "pause-column" }, [
                            _vm._v("Pause (s)"),
                          ]),
                        ]),
                        _vm._v(" "),
                        _vm._l(_vm.form.sets, function (set, index) {
                          return _c(
                            "div",
                            { key: index, staticClass: "set-row" },
                            [
                              _c("div", { staticClass: "set-number" }, [
                                _vm._v(_vm._s(index + 1)),
                              ]),
                              _vm._v(" "),
                              _c(
                                "div",
                                { staticClass: "reps-column" },
                                [
                                  _c("b-form-input", {
                                    staticClass: "form-input-modern set-input",
                                    attrs: {
                                      type: "number",
                                      min: "0",
                                      placeholder: "0",
                                    },
                                    model: {
                                      value: set.reps,
                                      callback: function ($$v) {
                                        _vm.$set(set, "reps", $$v)
                                      },
                                      expression: "set.reps",
                                    },
                                  }),
                                  _vm._v(" "),
                                  _c("span", { staticClass: "unit" }, [
                                    _vm._v("x"),
                                  ]),
                                ],
                                1
                              ),
                              _vm._v(" "),
                              _c(
                                "div",
                                { staticClass: "pause-column" },
                                [
                                  _c("b-form-input", {
                                    staticClass: "form-input-modern set-input",
                                    attrs: {
                                      type: "number",
                                      min: "0",
                                      placeholder: "0",
                                    },
                                    model: {
                                      value: set.pause,
                                      callback: function ($$v) {
                                        _vm.$set(set, "pause", $$v)
                                      },
                                      expression: "set.pause",
                                    },
                                  }),
                                  _vm._v(" "),
                                  _c("span", { staticClass: "unit" }, [
                                    _vm._v("s"),
                                  ]),
                                ],
                                1
                              ),
                            ]
                          )
                        }),
                      ],
                      2
                    ),
                  ])
                : _vm._e(),
              _vm._v(" "),
              _c("hr", { staticClass: "section-divider" }),
              _vm._v(" "),
              _c("h4", { staticClass: "section-title" }, [
                _vm._v("Advanced Settings"),
              ]),
              _vm._v(" "),
              _c(
                "b-row",
                [
                  _c(
                    "b-col",
                    { attrs: { md: "6" } },
                    [
                      _c(
                        "b-form-group",
                        {
                          staticClass: "form-group-modern",
                          attrs: { label: "Rest Period" },
                        },
                        [
                          _c("b-form-input", {
                            staticClass: "form-input-modern",
                            attrs: { type: "number", placeholder: "30" },
                            model: {
                              value: _vm.form.restPeriod,
                              callback: function ($$v) {
                                _vm.$set(_vm.form, "restPeriod", $$v)
                              },
                              expression: "form.restPeriod",
                            },
                          }),
                          _vm._v(" "),
                          _c("small", { staticClass: "form-text text-muted" }, [
                            _vm._v("Seconds between sets"),
                          ]),
                        ],
                        1
                      ),
                    ],
                    1
                  ),
                  _vm._v(" "),
                  _c(
                    "b-col",
                    { attrs: { md: "6" } },
                    [
                      _c(
                        "b-form-group",
                        {
                          staticClass: "form-group-modern",
                          attrs: { label: "QR Link" },
                        },
                        [
                          _c("b-form-input", {
                            staticClass: "form-input-modern",
                            attrs: { placeholder: "Enter QR code link" },
                            model: {
                              value: _vm.form.qrLink,
                              callback: function ($$v) {
                                _vm.$set(_vm.form, "qrLink", $$v)
                              },
                              expression: "form.qrLink",
                            },
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
              _vm._v(" "),
              _c(
                "b-row",
                [
                  _c(
                    "b-col",
                    { attrs: { md: "6" } },
                    [
                      _c(
                        "b-form-group",
                        {
                          staticClass: "form-group-modern",
                          attrs: { label: "Manufacturer" },
                        },
                        [
                          _c("b-form-select", {
                            staticClass: "form-select-modern",
                            attrs: { options: _vm.manufacturerOptions },
                            model: {
                              value: _vm.form.manufacturer,
                              callback: function ($$v) {
                                _vm.$set(_vm.form, "manufacturer", $$v)
                              },
                              expression: "form.manufacturer",
                            },
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
              _vm._v(" "),
              _c("div", { staticClass: "completion-summary" }, [
                _c("h5", [
                  _c("i", { staticClass: "fas fa-check-circle text-success" }),
                  _vm._v(" Almost Done!"),
                ]),
                _vm._v(" "),
                _c("p", [
                  _vm._v(
                    'Review your activity details and click "' +
                      _vm._s(
                        _vm.initialWorkout && _vm.initialWorkout.exercise_id
                          ? "Update Activity"
                          : "Create Activity"
                      ) +
                      '" to finish.'
                  ),
                ]),
              ]),
            ],
            1
          ),
          _vm._v(" "),
          _c("div", { staticClass: "form-actions" }, [
            _c("div", { staticClass: "action-buttons" }, [
              _c(
                "button",
                {
                  staticClass: "btn btn-outline-secondary",
                  attrs: { type: "button" },
                  on: {
                    click: function ($event) {
                      return _vm.$emit("close")
                    },
                  },
                },
                [
                  _c("i", { staticClass: "fas fa-times" }),
                  _vm._v(" Cancel\n                "),
                ]
              ),
              _vm._v(" "),
              _c("div", { staticClass: "primary-actions" }, [
                _vm.currentStep < _vm.steps.length - 1
                  ? _c(
                      "button",
                      {
                        staticClass: "btn btn-primary",
                        attrs: { type: "button" },
                        on: {
                          click: function ($event) {
                            $event.preventDefault()
                            return _vm.nextStep.apply(null, arguments)
                          },
                        },
                      },
                      [
                        _vm._v("\n                        Continue "),
                        _c("i", { staticClass: "fas fa-arrow-right" }),
                      ]
                    )
                  : _vm._e(),
                _vm._v(" "),
                _vm.currentStep === _vm.steps.length - 1
                  ? _c(
                      "button",
                      {
                        staticClass: "btn btn-success submit-btn",
                        attrs: { type: "submit", disabled: _vm.loading },
                      },
                      [
                        !_vm.loading
                          ? _c("i", { staticClass: "fas fa-check-circle" })
                          : _c("i", { staticClass: "fas fa-spinner fa-spin" }),
                        _vm._v(
                          "\n                                                     " +
                            _vm._s(
                              _vm.loading
                                ? _vm.initialWorkout &&
                                  _vm.initialWorkout.exercise_id
                                  ? "Updating..."
                                  : "Creating..."
                                : _vm.initialWorkout &&
                                  _vm.initialWorkout.exercise_id
                                ? "Update Activity"
                                : "Create Activity"
                            ) +
                            "\n                    "
                        ),
                      ]
                    )
                  : _vm._e(),
              ]),
            ]),
          ]),
        ]
      ),
      _vm._v(" "),
      _c("VideoPlayerModal", {
        attrs: {
          visible: _vm.showVideoPlayer,
          video: _vm.selectedVideoForPlayback,
        },
        on: { close: _vm.closeVideoPlayer },
      }),
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/components/VideoPlayerModal.vue?vue&type=template&id=7f19add2&scoped=true":
/*!****************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/components/VideoPlayerModal.vue?vue&type=template&id=7f19add2&scoped=true ***!
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
    "b-modal",
    {
      staticClass: "video-player-modal",
      attrs: {
        visible: _vm.visible,
        size: "xl",
        title: _vm.video ? _vm.video.name : "Video Player",
        centered: "",
        "hide-footer": "",
      },
      on: {
        hide: function ($event) {
          return _vm.$emit("close")
        },
      },
    },
    [
      _vm.video
        ? _c("div", { staticClass: "video-player-container" }, [
            _vm.isLoading && !_vm.video.url
              ? _c("div", { staticClass: "text-center py-4" }, [
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
                ])
              : _vm._e(),
            _vm._v(" "),
            _vm.video.url
              ? _c("video", {
                  key: _vm.video.url,
                  staticClass: "w-100 rounded",
                  staticStyle: { "max-height": "500px" },
                  attrs: { src: _vm.video.url, controls: "" },
                  on: {
                    loadstart: _vm.onVideoLoadStart,
                    canplay: _vm.onVideoCanPlay,
                    error: _vm.handleVideoError,
                    loadeddata: _vm.onVideoLoaded,
                  },
                })
              : _vm._e(),
            _vm._v(" "),
            _vm.error
              ? _c("div", { staticClass: "text-center py-4" }, [
                  _c("i", {
                    staticClass: "fas fa-exclamation-triangle text-warning",
                    staticStyle: { "font-size": "2rem" },
                  }),
                  _vm._v(" "),
                  _c("p", { staticClass: "mt-2" }, [_vm._v(_vm._s(_vm.error))]),
                ])
              : _vm._e(),
            _vm._v(" "),
            !_vm.video.url
              ? _c("div", { staticClass: "text-center py-4" }, [
                  _c("p", { staticClass: "text-warning" }, [
                    _vm._v("No video URL available"),
                  ]),
                ])
              : _vm._e(),
            _vm._v(" "),
            _c("div", { staticClass: "mt-3" }, [
              _c("h6", [_vm._v(_vm._s(_vm.video.name))]),
              _vm._v(" "),
              _c("small", { staticClass: "text-muted" }, [
                _vm._v(_vm._s(_vm.formatFileSize(_vm.video.size))),
              ]),
            ]),
          ])
        : _vm._e(),
    ]
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/components/WorkoutModal.vue?vue&type=template&id=2ea20454&scoped=true":
/*!************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/components/WorkoutModal.vue?vue&type=template&id=2ea20454&scoped=true ***!
  \************************************************************************************************************************************************************************************************************************************/
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
    "b-modal",
    {
      staticClass: "workout-modal",
      attrs: {
        id: "workout-modal",
        size: "lg",
        title: "Workout Information",
        visible: _vm.visible,
        "hide-footer": "",
        "no-close-on-backdrop": "",
        "no-close-on-esc": "",
      },
      on: {
        hide: function ($event) {
          return _vm.$emit("close")
        },
        submit: _vm.addWorkout,
      },
    },
    [
      _c(
        "form",
        {
          staticClass: "workout-form",
          on: {
            submit: function ($event) {
              $event.preventDefault()
              return _vm.handleSubmit.apply(null, arguments)
            },
          },
        },
        [
          _c(
            "b-row",
            [
              _c(
                "b-col",
                { attrs: { md: "6" } },
                [
                  _c(
                    "b-form-group",
                    {
                      staticClass: "form-group-modern",
                      scopedSlots: _vm._u([
                        {
                          key: "label",
                          fn: function () {
                            return [
                              _vm._v("\n                            Name "),
                              _c("span", { staticClass: "text-danger" }, [
                                _vm._v("*"),
                              ]),
                            ]
                          },
                          proxy: true,
                        },
                      ]),
                    },
                    [
                      _vm._v(" "),
                      _c("b-form-input", {
                        staticClass: "form-input-modern",
                        class: {
                          "is-invalid": _vm.validationErrors.exercise_name,
                        },
                        attrs: {
                          required: "",
                          placeholder: "Enter title (e.g., Full Body Burn)",
                        },
                        model: {
                          value: _vm.form.exercise_name,
                          callback: function ($$v) {
                            _vm.$set(_vm.form, "exercise_name", $$v)
                          },
                          expression: "form.exercise_name",
                        },
                      }),
                      _vm._v(" "),
                      _vm.validationErrors.exercise_name
                        ? _c(
                            "div",
                            { staticClass: "invalid-feedback d-block" },
                            [
                              _vm._v(
                                "\n                            " +
                                  _vm._s(
                                    _vm.validationErrors.exercise_name[0]
                                  ) +
                                  "\n                        "
                              ),
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
              _c(
                "b-col",
                { attrs: { md: "6" } },
                [
                  _c(
                    "b-form-group",
                    {
                      staticClass: "form-group-modern",
                      scopedSlots: _vm._u([
                        {
                          key: "label",
                          fn: function () {
                            return [
                              _vm._v("\n                            Category "),
                              _c("span", { staticClass: "text-danger" }, [
                                _vm._v("*"),
                              ]),
                            ]
                          },
                          proxy: true,
                        },
                      ]),
                    },
                    [
                      _vm._v(" "),
                      _c("b-form-select", {
                        staticClass: "form-select-modern",
                        class: { "is-invalid": _vm.validationErrors.category },
                        attrs: { options: _vm.categories, required: "" },
                        model: {
                          value: _vm.form.category,
                          callback: function ($$v) {
                            _vm.$set(_vm.form, "category", $$v)
                          },
                          expression: "form.category",
                        },
                      }),
                      _vm._v(" "),
                      _vm.validationErrors.category
                        ? _c(
                            "div",
                            { staticClass: "invalid-feedback d-block" },
                            [
                              _vm._v(
                                "\n                            " +
                                  _vm._s(_vm.validationErrors.category[0]) +
                                  "\n                        "
                              ),
                            ]
                          )
                        : _vm._e(),
                    ],
                    1
                  ),
                ],
                1
              ),
            ],
            1
          ),
          _vm._v(" "),
          _c(
            "b-row",
            [
              _c(
                "b-col",
                { attrs: { md: "3" } },
                [
                  _c(
                    "b-form-group",
                    {
                      staticClass: "form-group-modern",
                      scopedSlots: _vm._u([
                        {
                          key: "label",
                          fn: function () {
                            return [
                              _vm._v(
                                "\n                            Duration (minutes) "
                              ),
                              _c("span", { staticClass: "text-danger" }, [
                                _vm._v("*"),
                              ]),
                            ]
                          },
                          proxy: true,
                        },
                      ]),
                    },
                    [
                      _vm._v(" "),
                      _c("b-form-input", {
                        staticClass: "form-input-modern",
                        class: { "is-invalid": _vm.validationErrors.duration },
                        attrs: {
                          type: "number",
                          required: "",
                          placeholder: "e.g., 30",
                        },
                        model: {
                          value: _vm.form.duration,
                          callback: function ($$v) {
                            _vm.$set(_vm.form, "duration", $$v)
                          },
                          expression: "form.duration",
                        },
                      }),
                      _vm._v(" "),
                      _vm.validationErrors.duration
                        ? _c(
                            "div",
                            { staticClass: "invalid-feedback d-block" },
                            [
                              _vm._v(
                                "\n                            " +
                                  _vm._s(_vm.validationErrors.duration[0]) +
                                  "\n                        "
                              ),
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
              _c(
                "b-col",
                { attrs: { md: "3" } },
                [
                  _c(
                    "b-form-group",
                    {
                      staticClass: "form-group-modern",
                      scopedSlots: _vm._u([
                        {
                          key: "label",
                          fn: function () {
                            return [
                              _vm._v("\n                            Level "),
                              _c("span", { staticClass: "text-danger" }, [
                                _vm._v("*"),
                              ]),
                            ]
                          },
                          proxy: true,
                        },
                      ]),
                    },
                    [
                      _vm._v(" "),
                      _c("b-form-select", {
                        staticClass: "form-select-modern",
                        class: { "is-invalid": _vm.validationErrors.level },
                        attrs: {
                          options: _vm.levels,
                          required: "",
                          placeholder: "Select level",
                        },
                        model: {
                          value: _vm.form.level,
                          callback: function ($$v) {
                            _vm.$set(_vm.form, "level", $$v)
                          },
                          expression: "form.level",
                        },
                      }),
                      _vm._v(" "),
                      _vm.validationErrors.level
                        ? _c(
                            "div",
                            { staticClass: "invalid-feedback d-block" },
                            [
                              _vm._v(
                                "\n                            " +
                                  _vm._s(_vm.validationErrors.level[0]) +
                                  "\n                        "
                              ),
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
              _c(
                "b-col",
                { attrs: { md: "3" } },
                [
                  _c(
                    "b-form-group",
                    {
                      staticClass: "form-group-modern",
                      scopedSlots: _vm._u([
                        {
                          key: "label",
                          fn: function () {
                            return [
                              _vm._v(
                                "\n                            Calories Burned "
                              ),
                              _c("span", { staticClass: "text-danger" }, [
                                _vm._v("*"),
                              ]),
                            ]
                          },
                          proxy: true,
                        },
                      ]),
                    },
                    [
                      _vm._v(" "),
                      _c("b-form-input", {
                        staticClass: "form-input-modern",
                        class: {
                          "is-invalid": _vm.validationErrors.calories_burned,
                        },
                        attrs: { type: "number", placeholder: "e.g., 200" },
                        model: {
                          value: _vm.form.calories_burned,
                          callback: function ($$v) {
                            _vm.$set(_vm.form, "calories_burned", $$v)
                          },
                          expression: "form.calories_burned",
                        },
                      }),
                      _vm._v(" "),
                      _vm.validationErrors.calories_burned
                        ? _c(
                            "div",
                            { staticClass: "invalid-feedback d-block" },
                            [
                              _vm._v(
                                "\n                            " +
                                  _vm._s(
                                    _vm.validationErrors.calories_burned[0]
                                  ) +
                                  "\n                        "
                              ),
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
              _c(
                "b-col",
                { attrs: { md: "3" } },
                [
                  _c(
                    "b-form-group",
                    {
                      staticClass: "form-group-modern",
                      attrs: { label: "Exercise Type" },
                    },
                    [
                      _c("b-form-select", {
                        staticClass: "form-select-modern",
                        attrs: { options: _vm.typeOptions },
                        model: {
                          value: _vm.form.type,
                          callback: function ($$v) {
                            _vm.$set(_vm.form, "type", $$v)
                          },
                          expression: "form.type",
                        },
                      }),
                    ],
                    1
                  ),
                ],
                1
              ),
              _vm._v(" "),
              _c(
                "b-col",
                { attrs: { md: "3" } },
                [
                  _c(
                    "b-form-group",
                    {
                      staticClass: "form-group-modern",
                      attrs: { label: "Goal" },
                    },
                    [
                      _c("b-form-select", {
                        staticClass: "form-select-modern",
                        attrs: { options: _vm.goalOptions },
                        model: {
                          value: _vm.form.goal,
                          callback: function ($$v) {
                            _vm.$set(_vm.form, "goal", $$v)
                          },
                          expression: "form.goal",
                        },
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
          _vm._v(" "),
          _vm.selectedActivities && _vm.selectedActivities.length > 0
            ? _c(
                "div",
                { staticClass: "form-section selected-activities-section" },
                [
                  _c("h4", { staticClass: "section-title" }, [
                    _c("i", { staticClass: "fas fa-dumbbell mr-2" }),
                    _vm._v(
                      "\n                Selected Activities (" +
                        _vm._s(_vm.selectedActivities.length) +
                        ")\n            "
                    ),
                  ]),
                  _vm._v(" "),
                  _c(
                    "div",
                    { staticClass: "selected-activities-info" },
                    [
                      _c("p", { staticClass: "text-muted mb-3" }, [
                        _c("i", { staticClass: "fas fa-info-circle mr-2" }),
                        _vm._v(
                          "\n                    These activities will be available in the Exercise Library when you use the Plan Builder.\n                "
                        ),
                      ]),
                      _vm._v(" "),
                      _c(
                        "b-form-group",
                        {
                          staticClass: "form-group-modern",
                          attrs: { label: "Assign Activities to Day" },
                        },
                        [
                          _c("template", { slot: "label" }, [
                            _vm._v(
                              "\n                        Assign Activities to Day "
                            ),
                            _c("span", { staticClass: "text-muted" }, [
                              _vm._v("(Optional)"),
                            ]),
                          ]),
                          _vm._v(" "),
                          _c(
                            "b-form-select",
                            {
                              staticClass: "form-select-modern",
                              attrs: { options: _vm.dayOptions },
                              model: {
                                value: _vm.selectedDay,
                                callback: function ($$v) {
                                  _vm.selectedDay = $$v
                                },
                                expression: "selectedDay",
                              },
                            },
                            [
                              _c("template", { slot: "first" }, [
                                _c("option", { domProps: { value: null } }, [
                                  _vm._v(
                                    "No day selected (activities will be in Exercise Library only)"
                                  ),
                                ]),
                              ]),
                            ],
                            2
                          ),
                          _vm._v(" "),
                          _c("small", { staticClass: "form-text text-muted" }, [
                            _c("i", { staticClass: "fas fa-info-circle mr-1" }),
                            _vm._v(
                              "\n                        If you select a day, all selected activities will be assigned to that day when you edit this workout in Plan Builder.\n                    "
                            ),
                          ]),
                        ],
                        2
                      ),
                      _vm._v(" "),
                      _c(
                        "div",
                        { staticClass: "selected-activities-list" },
                        _vm._l(
                          _vm.selectedActivities,
                          function (activity, index) {
                            return _c(
                              "div",
                              {
                                key: activity.id || index,
                                staticClass: "selected-activity-item",
                              },
                              [
                                _c(
                                  "div",
                                  { staticClass: "activity-item-thumbnail" },
                                  [
                                    _c("img", {
                                      attrs: {
                                        src:
                                          activity.thumbnail ||
                                          "/images/Kettlebell-swing.webp",
                                        alt: activity.name,
                                      },
                                      on: { error: _vm.handleImageError },
                                    }),
                                  ]
                                ),
                                _vm._v(" "),
                                _c(
                                  "div",
                                  { staticClass: "activity-item-info" },
                                  [
                                    _c(
                                      "h6",
                                      { staticClass: "activity-item-name" },
                                      [_vm._v(_vm._s(activity.name))]
                                    ),
                                    _vm._v(" "),
                                    _c(
                                      "div",
                                      { staticClass: "activity-item-meta" },
                                      [
                                        _c(
                                          "span",
                                          { staticClass: "meta-badge" },
                                          [_vm._v(_vm._s(activity.category))]
                                        ),
                                        _vm._v(" "),
                                        _c(
                                          "span",
                                          { staticClass: "meta-badge" },
                                          [
                                            _vm._v(
                                              _vm._s(
                                                activity.muscle || "Full Body"
                                              )
                                            ),
                                          ]
                                        ),
                                        _vm._v(" "),
                                        _c(
                                          "span",
                                          { staticClass: "meta-badge" },
                                          [
                                            _vm._v(
                                              _vm._s(
                                                activity.difficulty ||
                                                  activity.level
                                              )
                                            ),
                                          ]
                                        ),
                                      ]
                                    ),
                                  ]
                                ),
                              ]
                            )
                          }
                        ),
                        0
                      ),
                    ],
                    1
                  ),
                ]
              )
            : _vm._e(),
          _vm._v(" "),
          _c(
            "b-row",
            [
              _c(
                "b-col",
                { attrs: { md: "6" } },
                [
                  _c(
                    "b-form-group",
                    {
                      staticClass: "form-group-modern",
                      attrs: { label: "Description" },
                    },
                    [
                      _c("b-form-textarea", {
                        staticClass: "form-textarea-modern",
                        class: {
                          "is-invalid": _vm.validationErrors.description,
                        },
                        attrs: {
                          rows: "3",
                          placeholder:
                            "Briefly describe the workout focus and goals",
                        },
                        model: {
                          value: _vm.form.description,
                          callback: function ($$v) {
                            _vm.$set(_vm.form, "description", $$v)
                          },
                          expression: "form.description",
                        },
                      }),
                      _vm._v(" "),
                      _vm.validationErrors.description
                        ? _c(
                            "div",
                            { staticClass: "invalid-feedback d-block" },
                            [
                              _vm._v(
                                "\n                        " +
                                  _vm._s(_vm.validationErrors.description[0]) +
                                  "\n                    "
                              ),
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
              _c(
                "b-col",
                { attrs: { md: "6" } },
                [
                  _c(
                    "b-form-group",
                    {
                      staticClass: "form-group-modern",
                      attrs: { label: "Instructions" },
                    },
                    [
                      _c("b-form-textarea", {
                        staticClass: "form-textarea-modern",
                        attrs: {
                          rows: "3",
                          placeholder:
                            "Step-by-step guide on how to perform this workout",
                        },
                        model: {
                          value: _vm.form.instructions,
                          callback: function ($$v) {
                            _vm.$set(_vm.form, "instructions", $$v)
                          },
                          expression: "form.instructions",
                        },
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
          _vm._v(" "),
          _c(
            "b-row",
            [
              _c(
                "b-col",
                { attrs: { md: "6" } },
                [
                  _c(
                    "b-form-group",
                    {
                      staticClass: "form-group-modern",
                      attrs: { label: "Workout Image" },
                    },
                    [
                      _c(
                        "div",
                        {
                          staticClass:
                            "file-upload-wrapper position-relative thumbnail-box",
                        },
                        [
                          _c("input", {
                            ref: "thumbnailInput",
                            staticClass: "file-input-modern",
                            attrs: { type: "file", accept: "image/*" },
                            on: { change: _vm.previewThumbnail },
                          }),
                          _vm._v(" "),
                          _c(
                            "div",
                            {
                              staticClass: "thumbnail-overlay-preview",
                              staticStyle: { cursor: "pointer" },
                            },
                            [
                              _c("img", {
                                key: "thumbnail-" + _vm.displayThumbnail,
                                staticClass: "thumbnail-image",
                                staticStyle: {
                                  width: "100%",
                                  height: "100%",
                                  "object-fit": "contain",
                                  "object-position": "center",
                                  display: "block",
                                },
                                attrs: {
                                  src: _vm.displayThumbnail,
                                  alt: "Workout Thumbnail",
                                },
                                on: {
                                  error: _vm.handleThumbnailError,
                                  load: _vm.onThumbnailLoad,
                                },
                              }),
                              _vm._v(" "),
                              !_vm.hasCustomThumbnail &&
                              _vm.defaultWorkoutImages.length > 1
                                ? _c(
                                    "div",
                                    { staticClass: "thumbnail-navigation" },
                                    [
                                      _c(
                                        "button",
                                        {
                                          staticClass:
                                            "btn btn-sm btn-navigation btn-navigation-left",
                                          attrs: {
                                            type: "button",
                                            title: "Previous Image",
                                          },
                                          on: {
                                            click: function ($event) {
                                              $event.stopPropagation()
                                              return _vm.previousDefaultImage.apply(
                                                null,
                                                arguments
                                              )
                                            },
                                          },
                                        },
                                        [
                                          _c("i", {
                                            staticClass: "fas fa-chevron-left",
                                          }),
                                        ]
                                      ),
                                      _vm._v(" "),
                                      _c(
                                        "button",
                                        {
                                          staticClass:
                                            "btn btn-sm btn-navigation btn-navigation-right",
                                          attrs: {
                                            type: "button",
                                            title: "Next Image",
                                          },
                                          on: {
                                            click: function ($event) {
                                              $event.stopPropagation()
                                              return _vm.nextDefaultImage.apply(
                                                null,
                                                arguments
                                              )
                                            },
                                          },
                                        },
                                        [
                                          _c("i", {
                                            staticClass: "fas fa-chevron-right",
                                          }),
                                        ]
                                      ),
                                    ]
                                  )
                                : _vm._e(),
                              _vm._v(" "),
                              _c("div", { staticClass: "thumbnail-actions" }, [
                                _vm.hasCustomThumbnail
                                  ? _c(
                                      "button",
                                      {
                                        staticClass:
                                          "btn btn-sm btn-outline-danger",
                                        attrs: {
                                          type: "button",
                                          title: "Remove Custom Image",
                                        },
                                        on: {
                                          click: function ($event) {
                                            $event.stopPropagation()
                                            return _vm.removeThumbnail.apply(
                                              null,
                                              arguments
                                            )
                                          },
                                        },
                                      },
                                      [
                                        _c("i", {
                                          staticClass: "fas fa-trash-alt",
                                        }),
                                      ]
                                    )
                                  : _vm._e(),
                              ]),
                              _vm._v(" "),
                              !_vm.hasCustomThumbnail
                                ? _c(
                                    "div",
                                    {
                                      staticClass: "thumbnail-overlay-hint",
                                      on: {
                                        click: function ($event) {
                                          return _vm.$refs.thumbnailInput.click()
                                        },
                                      },
                                    },
                                    [
                                      _c("i", { staticClass: "fas fa-image" }),
                                      _vm._v(" "),
                                      _c("span", [
                                        _vm._v("Click to change image"),
                                      ]),
                                    ]
                                  )
                                : _vm._e(),
                            ]
                          ),
                        ]
                      ),
                    ]
                  ),
                ],
                1
              ),
              _vm._v(" "),
              _c(
                "b-col",
                { attrs: { md: "6" } },
                [
                  _c(
                    "b-form-group",
                    {
                      staticClass: "form-group-modern",
                      attrs: { label: "Difficulty (1-10)" },
                    },
                    [
                      _c("b-form-input", {
                        staticClass: "form-input-modern",
                        attrs: {
                          type: "number",
                          min: "1",
                          max: "10",
                          placeholder:
                            "Rate the workout difficulty from 1 (easy) to 10 (extreme)",
                        },
                        model: {
                          value: _vm.form.difficulty,
                          callback: function ($$v) {
                            _vm.$set(_vm.form, "difficulty", $$v)
                          },
                          expression: "form.difficulty",
                        },
                      }),
                    ],
                    1
                  ),
                  _vm._v(" "),
                  _c(
                    "b-form-group",
                    {
                      staticClass: "form-group-modern",
                      attrs: { label: "Tags (comma separated)" },
                    },
                    [
                      _c("b-form-input", {
                        staticClass: "form-input-modern",
                        attrs: {
                          placeholder: "e.g., fat burn, full body, strength",
                        },
                        model: {
                          value: _vm.form.tags,
                          callback: function ($$v) {
                            _vm.$set(_vm.form, "tags", $$v)
                          },
                          expression: "form.tags",
                        },
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
          _vm._v(" "),
          _c(
            "b-row",
            [
              _c(
                "b-col",
                {
                  staticClass: "mb-3 d-flex align-items-center",
                  attrs: { md: "12" },
                },
                [
                  _c("h5", { staticClass: "mb-0 mr-2" }, [_vm._v("Settings")]),
                  _vm._v(" "),
                  _c(
                    "b-tooltip",
                    {
                      attrs: {
                        target: "settings-info-icon",
                        triggers: "hover",
                        placement: "right",
                      },
                    },
                    [
                      _vm._v(
                        "\n                        Set a default rest time, number of sets and reps/time per activity, with a max of 10 sets. You can come back to this screen to change the default at any time, which won't affect activities that have already been added.\n                    "
                      ),
                    ]
                  ),
                  _vm._v(" "),
                  _c("i", {
                    staticClass: "ml-1 fas fa-info-circle info-icon-red",
                    staticStyle: { cursor: "pointer", "font-size": "1.1rem" },
                    attrs: { id: "settings-info-icon" },
                  }),
                ],
                1
              ),
              _vm._v(" "),
              _c(
                "b-col",
                { attrs: { md: "4" } },
                [
                  _c(
                    "b-form-group",
                    {
                      staticClass: "form-group-modern",
                      attrs: { label: "Days per week" },
                    },
                    [
                      _c("b-form-select", {
                        staticClass: "form-select-modern",
                        attrs: { options: _vm.daysPerWeekOptions },
                        model: {
                          value: _vm.form.days_per_week,
                          callback: function ($$v) {
                            _vm.$set(_vm.form, "days_per_week", $$v)
                          },
                          expression: "form.days_per_week",
                        },
                      }),
                    ],
                    1
                  ),
                ],
                1
              ),
              _vm._v(" "),
              _c(
                "b-col",
                { attrs: { md: "4" } },
                [
                  _c(
                    "b-form-group",
                    {
                      staticClass: "form-group-modern",
                      attrs: { label: "Repeat" },
                    },
                    [
                      _c("b-form-select", {
                        staticClass: "form-select-modern",
                        attrs: { options: _vm.repeatOptions },
                        model: {
                          value: _vm.form.repeat,
                          callback: function ($$v) {
                            _vm.$set(_vm.form, "repeat", $$v)
                          },
                          expression: "form.repeat",
                        },
                      }),
                    ],
                    1
                  ),
                ],
                1
              ),
              _vm._v(" "),
              _c(
                "b-col",
                { attrs: { md: "4" } },
                [
                  _c(
                    "b-form-group",
                    {
                      staticClass: "form-group-modern",
                      attrs: { label: "Rest (s)" },
                    },
                    [
                      _c("b-form-input", {
                        staticClass: "form-input-modern",
                        attrs: { type: "number", min: "0", placeholder: "0" },
                        model: {
                          value: _vm.form.rest_seconds,
                          callback: function ($$v) {
                            _vm.$set(_vm.form, "rest_seconds", $$v)
                          },
                          expression: "form.rest_seconds",
                        },
                      }),
                    ],
                    1
                  ),
                ],
                1
              ),
              _vm._v(" "),
              _c("b-col", { staticClass: "mt-3", attrs: { md: "12" } }, [
                _c(
                  "div",
                  { staticClass: "d-flex align-items-center mb-2" },
                  [
                    _c("h6", { staticClass: "mb-0 mr-2" }, [
                      _vm._v("Reps (x)"),
                    ]),
                    _vm._v(" "),
                    _c(
                      "b-tooltip",
                      {
                        attrs: {
                          target: "reps-info-icon",
                          triggers: "hover",
                          placement: "right",
                        },
                      },
                      [
                        _vm._v(
                          "\n                            For rep-based activities. To remove a set, either empty the field or put 0 as the number of reps.\n                        "
                        ),
                      ]
                    ),
                    _vm._v(" "),
                    _c("i", {
                      staticClass: "ml-1 fas fa-info-circle info-icon-red",
                      staticStyle: { cursor: "pointer", "font-size": "0.9rem" },
                      attrs: { id: "reps-info-icon" },
                    }),
                  ],
                  1
                ),
                _vm._v(" "),
                _c(
                  "div",
                  { staticClass: "reps-inputs-row" },
                  _vm._l(_vm.form.default_reps, function (rep, index) {
                    return _c("b-form-input", {
                      key: index,
                      staticClass: "form-input-modern reps-input",
                      attrs: {
                        type: "number",
                        min: "0",
                        placeholder: "Rep " + (index + 1),
                      },
                      model: {
                        value: _vm.form.default_reps[index],
                        callback: function ($$v) {
                          _vm.$set(_vm.form.default_reps, index, $$v)
                        },
                        expression: "form.default_reps[index]",
                      },
                    })
                  }),
                  1
                ),
              ]),
              _vm._v(" "),
              _c("b-col", { staticClass: "mt-3", attrs: { md: "12" } }, [
                _c(
                  "div",
                  { staticClass: "preset-weights-wrapper" },
                  [
                    _c(
                      "b-form-checkbox",
                      {
                        staticClass: "preset-weights-toggle",
                        attrs: { switch: "" },
                        model: {
                          value: _vm.form.enable_preset_weights,
                          callback: function ($$v) {
                            _vm.$set(_vm.form, "enable_preset_weights", $$v)
                          },
                          expression: "form.enable_preset_weights",
                        },
                      },
                      [
                        _c("span", { staticClass: "preset-weights-label" }, [
                          _vm._v("Enable adding preset weights"),
                        ]),
                      ]
                    ),
                    _vm._v(" "),
                    _c(
                      "b-tooltip",
                      {
                        attrs: {
                          target: "preset-weights-info-icon",
                          triggers: "hover",
                          placement: "right",
                        },
                      },
                      [
                        _vm._v(
                          "\n                            When enabled, you can add preset weight values for exercises\n                        "
                        ),
                      ]
                    ),
                    _vm._v(" "),
                    _c("i", {
                      staticClass:
                        "preset-weights-info-icon fas fa-info-circle info-icon-red",
                      attrs: { id: "preset-weights-info-icon" },
                    }),
                  ],
                  1
                ),
              ]),
              _vm._v(" "),
              _c(
                "b-col",
                { attrs: { md: "6" } },
                [
                  _c(
                    "b-form-group",
                    {
                      staticClass: "form-group-modern",
                      attrs: { label: "Equipments" },
                    },
                    [
                      _c("b-form-select", {
                        staticClass: "form-select-modern",
                        attrs: { options: _vm.equipmentOptions, multiple: "" },
                        model: {
                          value: _vm.form.equipment,
                          callback: function ($$v) {
                            _vm.$set(_vm.form, "equipment", $$v)
                          },
                          expression: "form.equipment",
                        },
                      }),
                      _vm._v(" "),
                      _c("small", { staticClass: "form-text text-muted" }, [
                        _c("i", { staticClass: "fas fa-info-circle mr-1" }),
                        _vm._v(
                          "\n                            Hold Ctrl (or Cmd on Mac) to select multiple items\n                        "
                        ),
                      ]),
                    ],
                    1
                  ),
                ],
                1
              ),
              _vm._v(" "),
              _c(
                "b-col",
                { attrs: { md: "6" } },
                [
                  _c(
                    "b-form-group",
                    {
                      staticClass: "form-group-modern",
                      attrs: { label: "Target Muscle Groups" },
                    },
                    [
                      _c("b-form-select", {
                        staticClass: "form-select-modern",
                        attrs: {
                          options: _vm.muscleGroupsOptions,
                          multiple: "",
                        },
                        model: {
                          value: _vm.form.muscles_targeted,
                          callback: function ($$v) {
                            _vm.$set(_vm.form, "muscles_targeted", $$v)
                          },
                          expression: "form.muscles_targeted",
                        },
                      }),
                      _vm._v(" "),
                      _c("small", { staticClass: "form-text text-muted" }, [
                        _c("i", { staticClass: "fas fa-info-circle mr-1" }),
                        _vm._v(
                          "\n                            Hold Ctrl (or Cmd on Mac) to select multiple items\n                        "
                        ),
                      ]),
                    ],
                    1
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
            { staticClass: "form-actions" },
            [
              _c(
                "b-button",
                {
                  staticClass: "submit-btn",
                  attrs: {
                    variant: "success",
                    type: "submit",
                    disabled: _vm.loading,
                  },
                },
                [
                  !_vm.loading
                    ? _c("i", { staticClass: "fas fa-check-circle" })
                    : _c("i", { staticClass: "fas fa-spinner fa-spin" }),
                  _vm._v(
                    "\n                " +
                      _vm._s(
                        _vm.loading
                          ? _vm.initialWorkout && _vm.initialWorkout.id
                            ? "Updating..."
                            : "Creating..."
                          : _vm.initialWorkout && _vm.initialWorkout.id
                          ? "Update and Continue"
                          : "Continue"
                      ) +
                      "\n            "
                  ),
                ]
              ),
            ],
            1
          ),
        ],
        1
      ),
    ]
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/Workout/ActivityList.vue?vue&type=template&id=18e7219c&scoped=true":
/*!*************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/Workout/ActivityList.vue?vue&type=template&id=18e7219c&scoped=true ***!
  \*************************************************************************************************************************************************************************************************************************************************/
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
    { staticClass: "activity-list-page" },
    [
      _c("div", { staticClass: "page-header" }, [
        _vm._m(0),
        _vm._v(" "),
        _c(
          "div",
          { staticClass: "header-actions" },
          [
            _vm.selectedForDelete.length > 0
              ? _c(
                  "b-button",
                  {
                    staticClass: "btn-modern btn-delete-selected mr-2",
                    attrs: {
                      variant: "danger",
                      disabled: _vm.selectedForDelete.length === 0,
                    },
                    on: { click: _vm.confirmBulkDelete },
                  },
                  [
                    _c("i", { staticClass: "fas fa-trash-alt mr-2" }),
                    _vm._v(
                      "\n                Delete Selected (" +
                        _vm._s(_vm.selectedForDelete.length) +
                        ")\n            "
                    ),
                  ]
                )
              : _vm._e(),
            _vm._v(" "),
            _c(
              "b-button",
              {
                staticClass: "btn-modern btn-create-workout mr-2",
                attrs: {
                  variant: "success",
                  disabled: _vm.selectedActivities.length === 0,
                },
                on: { click: _vm.openCreateWorkoutModal },
              },
              [
                _c("i", { staticClass: "fas fa-dumbbell mr-2" }),
                _vm._v(
                  "\n                Create Workout (" +
                    _vm._s(_vm.selectedActivities.length) +
                    ")\n            "
                ),
              ]
            ),
            _vm._v(" "),
            _c(
              "b-button",
              {
                staticClass: "btn-modern",
                attrs: { variant: "primary" },
                on: { click: _vm.openCreateActivityModal },
              },
              [
                _c("i", { staticClass: "fas fa-plus mr-2" }),
                _vm._v("\n                Create Activity\n            "),
              ]
            ),
          ],
          1
        ),
      ]),
      _vm._v(" "),
      _c("b-card", { staticClass: "filters-card-compact mb-3" }, [
        _c("div", { staticClass: "filters-header-compact" }, [
          _c("div", { staticClass: "filters-title-section" }, [
            _c("h4", { staticClass: "filters-title-compact" }, [
              _c("i", { staticClass: "fas fa-filter" }),
              _vm._v(
                "\n                    Filter Activities\n                "
              ),
            ]),
            _vm._v(" "),
            _c("span", { staticClass: "results-count-compact" }, [
              _vm._v(
                "\n                    " +
                  _vm._s(_vm.filteredActivities.length) +
                  " activities\n                "
              ),
            ]),
          ]),
          _vm._v(" "),
          _c(
            "div",
            { staticClass: "filters-actions-compact" },
            [
              _c(
                "b-button",
                {
                  staticClass: "btn-clear-compact",
                  attrs: { variant: "outline-secondary", size: "sm" },
                  on: { click: _vm.clearFilters },
                },
                [
                  _c("i", { staticClass: "fas fa-times" }),
                  _vm._v("\n                    Clear\n                "),
                ]
              ),
            ],
            1
          ),
        ]),
        _vm._v(" "),
        _c("div", { staticClass: "filters-content-compact" }, [
          _c(
            "div",
            { staticClass: "filter-group-compact" },
            [
              _c("label", { staticClass: "filter-label-compact" }, [
                _c("i", { staticClass: "fas fa-chevron-down" }),
                _vm._v("\n                    Category\n                "),
              ]),
              _vm._v(" "),
              _c("b-form-select", {
                staticClass: "select-compact",
                attrs: { options: _vm.categoryOptions, size: "sm" },
                model: {
                  value: _vm.filters.category,
                  callback: function ($$v) {
                    _vm.$set(_vm.filters, "category", $$v)
                  },
                  expression: "filters.category",
                },
              }),
            ],
            1
          ),
          _vm._v(" "),
          _c(
            "div",
            { staticClass: "filter-group-compact" },
            [
              _c("label", { staticClass: "filter-label-compact" }, [
                _c("i", { staticClass: "fas fa-chevron-down" }),
                _vm._v("\n                    Muscle Group\n                "),
              ]),
              _vm._v(" "),
              _c("b-form-select", {
                staticClass: "select-compact",
                attrs: { options: _vm.muscleOptions, size: "sm" },
                model: {
                  value: _vm.filters.muscle,
                  callback: function ($$v) {
                    _vm.$set(_vm.filters, "muscle", $$v)
                  },
                  expression: "filters.muscle",
                },
              }),
            ],
            1
          ),
          _vm._v(" "),
          _c(
            "div",
            { staticClass: "filter-group-compact" },
            [
              _c("label", { staticClass: "filter-label-compact" }, [
                _c("i", { staticClass: "fas fa-chevron-down" }),
                _vm._v("\n                    Difficulty\n                "),
              ]),
              _vm._v(" "),
              _c("b-form-select", {
                staticClass: "select-compact",
                attrs: { options: _vm.difficultyOptions, size: "sm" },
                model: {
                  value: _vm.filters.difficulty,
                  callback: function ($$v) {
                    _vm.$set(_vm.filters, "difficulty", $$v)
                  },
                  expression: "filters.difficulty",
                },
              }),
            ],
            1
          ),
        ]),
      ]),
      _vm._v(" "),
      _c("div", { staticClass: "activities-container" }, [
        _c("div", { staticClass: "activities-header" }, [
          _vm._m(1),
          _vm._v(" "),
          _c(
            "div",
            { staticClass: "view-toggle" },
            [
              _c(
                "b-button-group",
                { attrs: { size: "sm" } },
                [
                  _c(
                    "b-button",
                    {
                      staticClass: "btn-outline-modern",
                      class: { active: _vm.viewMode === "list" },
                      attrs: { variant: "outline-primary" },
                      on: {
                        click: function ($event) {
                          return _vm.setViewMode("list")
                        },
                      },
                    },
                    [_c("i", { staticClass: "fas fa-list" })]
                  ),
                  _vm._v(" "),
                  _c(
                    "b-button",
                    {
                      staticClass: "btn-outline-modern",
                      class: { active: _vm.viewMode === "grid" },
                      attrs: { variant: "outline-primary" },
                      on: {
                        click: function ($event) {
                          return _vm.setViewMode("grid")
                        },
                      },
                    },
                    [_c("i", { staticClass: "fas fa-th-large" })]
                  ),
                ],
                1
              ),
            ],
            1
          ),
        ]),
        _vm._v(" "),
        _c(
          "div",
          {
            staticClass: "activities-grid",
            class: { "list-view": _vm.viewMode === "list" },
          },
          _vm._l(_vm.paginatedActivities, function (activity) {
            return _c(
              "div",
              {
                key: activity.id,
                staticClass: "activity-card",
                class: {
                  selected: _vm.selectedActivities.includes(activity.id),
                  "selected-for-delete": _vm.selectedForDelete.includes(
                    activity.id
                  ),
                  "list-item": _vm.viewMode === "list",
                },
                on: {
                  click: function ($event) {
                    return _vm.toggleSelection(activity)
                  },
                },
              },
              [
                _c(
                  "div",
                  {
                    staticClass: "delete-checkbox-wrapper",
                    on: {
                      click: function ($event) {
                        $event.stopPropagation()
                      },
                    },
                  },
                  [
                    _c("b-form-checkbox", {
                      staticClass: "delete-checkbox",
                      attrs: {
                        checked: _vm.selectedForDelete.includes(activity.id),
                        title: _vm.selectedForDelete.includes(activity.id)
                          ? "Deselect for deletion"
                          : "Select for deletion",
                      },
                      on: {
                        change: function ($event) {
                          return _vm.toggleDeleteSelection(activity)
                        },
                      },
                    }),
                  ],
                  1
                ),
                _vm._v(" "),
                _c("div", { staticClass: "activity-thumbnail-wrapper" }, [
                  _c("div", { staticClass: "activity-thumbnail" }, [
                    _c("img", {
                      staticClass: "thumbnail-image",
                      attrs: {
                        src:
                          activity.thumbnail || "/images/Kettlebell-swing.webp",
                        alt: activity.name,
                      },
                      on: { error: _vm.handleImageError },
                    }),
                    _vm._v(" "),
                    _vm.viewMode === "grid"
                      ? _c(
                          "div",
                          { staticClass: "thumbnail-overlay" },
                          [
                            _c(
                              "b-badge",
                              {
                                staticClass: "difficulty-badge-overlay-grid",
                                attrs: {
                                  variant: _vm.getBadgeColor(
                                    activity.difficulty
                                  ),
                                },
                              },
                              [
                                _vm._v(
                                  "\n                                " +
                                    _vm._s(activity.difficulty) +
                                    "\n                            "
                                ),
                              ]
                            ),
                          ],
                          1
                        )
                      : _vm._e(),
                  ]),
                  _vm._v(" "),
                  _vm.viewMode === "list"
                    ? _c(
                        "div",
                        [
                          _c(
                            "b-badge",
                            {
                              staticClass: "difficulty-badge-list",
                              attrs: {
                                variant: _vm.getBadgeColor(activity.difficulty),
                              },
                            },
                            [
                              _vm._v(
                                "\n                            " +
                                  _vm._s(activity.difficulty) +
                                  "\n                        "
                              ),
                            ]
                          ),
                        ],
                        1
                      )
                    : _vm._e(),
                ]),
                _vm._v(" "),
                _c("div", { staticClass: "activity-card-body" }, [
                  _c("h4", { staticClass: "activity-name" }, [
                    _vm._v(_vm._s(activity.name)),
                  ]),
                  _vm._v(" "),
                  _c("div", { staticClass: "activity-meta" }, [
                    _c("div", { staticClass: "meta-item" }, [
                      _c("i", { staticClass: "fas fa-tag meta-icon" }),
                      _vm._v(" "),
                      _c("span", [_vm._v(_vm._s(activity.category))]),
                    ]),
                    _vm._v(" "),
                    _c("div", { staticClass: "meta-item" }, [
                      _c("i", { staticClass: "fas fa-dumbbell meta-icon" }),
                      _vm._v(" "),
                      _c("span", [_vm._v(_vm._s(activity.muscle))]),
                    ]),
                    _vm._v(" "),
                    _c("div", { staticClass: "meta-item" }, [
                      _c("i", { staticClass: "fas fa-clock meta-icon" }),
                      _vm._v(" "),
                      _c("span", [_vm._v(_vm._s(activity.duration))]),
                    ]),
                  ]),
                ]),
                _vm._v(" "),
                _c("div", { staticClass: "activity-card-footer" }, [
                  _c(
                    "div",
                    { staticClass: "activity-card-actions" },
                    [
                      _c(
                        "b-button",
                        {
                          staticClass:
                            "btn-outline-modern btn-sm view-details-btn",
                          attrs: {
                            variant: "outline-primary",
                            size: "sm",
                            title: "Edit " + activity.name,
                          },
                          on: {
                            click: function ($event) {
                              $event.stopPropagation()
                              return _vm.openViewActivityModal(activity)
                            },
                          },
                        },
                        [_c("i", { staticClass: "fas fa-edit" })]
                      ),
                      _vm._v(" "),
                      _c(
                        "b-button",
                        {
                          staticClass: "btn-outline-modern btn-sm delete-btn",
                          attrs: {
                            variant: "outline-danger",
                            size: "sm",
                            title: "Delete " + activity.name,
                          },
                          on: {
                            click: function ($event) {
                              $event.stopPropagation()
                              return _vm.confirmDeleteActivity(activity)
                            },
                          },
                        },
                        [_c("i", { staticClass: "fas fa-trash-alt" })]
                      ),
                    ],
                    1
                  ),
                ]),
              ]
            )
          }),
          0
        ),
        _vm._v(" "),
        _vm.totalPages > 1
          ? _c(
              "div",
              { staticClass: "pagination-container" },
              [
                _c("b-pagination", {
                  staticClass: "pagination-modern",
                  attrs: {
                    "total-rows": _vm.filteredActivities.length,
                    "per-page": _vm.itemsPerPage,
                    "page-options": [12, 24, 36, 48],
                    align: "center",
                  },
                  on: { change: _vm.onPageChange },
                  scopedSlots: _vm._u(
                    [
                      {
                        key: "first-text",
                        fn: function () {
                          return [
                            _c("i", {
                              staticClass: "fas fa-angle-double-left",
                            }),
                          ]
                        },
                        proxy: true,
                      },
                      {
                        key: "prev-text",
                        fn: function () {
                          return [_c("i", { staticClass: "fas fa-angle-left" })]
                        },
                        proxy: true,
                      },
                      {
                        key: "next-text",
                        fn: function () {
                          return [
                            _c("i", { staticClass: "fas fa-angle-right" }),
                          ]
                        },
                        proxy: true,
                      },
                      {
                        key: "last-text",
                        fn: function () {
                          return [
                            _c("i", {
                              staticClass: "fas fa-angle-double-right",
                            }),
                          ]
                        },
                        proxy: true,
                      },
                    ],
                    null,
                    false,
                    4168866383
                  ),
                  model: {
                    value: _vm.currentPage,
                    callback: function ($$v) {
                      _vm.currentPage = $$v
                    },
                    expression: "currentPage",
                  },
                }),
                _vm._v(" "),
                _c("div", { staticClass: "pagination-info" }, [
                  _c("span", { staticClass: "pagination-text" }, [
                    _vm._v(
                      "\n                    Showing " +
                        _vm._s(_vm.startIndex + 1) +
                        " to " +
                        _vm._s(_vm.endIndex) +
                        " of " +
                        _vm._s(_vm.filteredActivities.length) +
                        " activities\n                "
                    ),
                  ]),
                ]),
              ],
              1
            )
          : _vm._e(),
        _vm._v(" "),
        _vm.filteredActivities.length === 0
          ? _c(
              "div",
              { staticClass: "empty-state" },
              [
                _vm._m(2),
                _vm._v(" "),
                _c("h3", [_vm._v("No activities found")]),
                _vm._v(" "),
                _c("p", [
                  _vm._v("Try adjusting your filters to find more activities"),
                ]),
                _vm._v(" "),
                _c(
                  "b-button",
                  {
                    staticClass: "btn-modern",
                    attrs: { variant: "primary" },
                    on: { click: _vm.clearFilters },
                  },
                  [_vm._v("\n                Clear All Filters\n            ")]
                ),
              ],
              1
            )
          : _vm._e(),
      ]),
      _vm._v(" "),
      _c(
        "b-modal",
        {
          attrs: {
            size: "md",
            title: "Selected Activities",
            centered: "",
            "hide-footer": "",
          },
          model: {
            value: _vm.showSelectedModal,
            callback: function ($$v) {
              _vm.showSelectedModal = $$v
            },
            expression: "showSelectedModal",
          },
        },
        [
          _vm.selectedActivitiesList.length > 0
            ? _c("div", [
                _c(
                  "div",
                  { staticClass: "selected-activities-list" },
                  _vm._l(_vm.selectedActivitiesList, function (activity) {
                    return _c(
                      "div",
                      {
                        key: activity.id,
                        staticClass: "selected-activity-item",
                      },
                      [
                        _c(
                          "div",
                          { staticClass: "activity-item-content" },
                          [
                            _c(
                              "div",
                              { staticClass: "activity-item-thumbnail" },
                              [
                                _c("img", {
                                  attrs: {
                                    src:
                                      activity.thumbnail ||
                                      "/images/Kettlebell-swing.webp",
                                    alt: activity.name,
                                  },
                                  on: { error: _vm.handleImageError },
                                }),
                              ]
                            ),
                            _vm._v(" "),
                            _c("div", { staticClass: "activity-item-info" }, [
                              _c("h6", { staticClass: "activity-item-name" }, [
                                _vm._v(_vm._s(activity.name)),
                              ]),
                              _vm._v(" "),
                              _c("div", { staticClass: "activity-item-meta" }, [
                                _c("span", { staticClass: "meta-badge" }, [
                                  _vm._v(_vm._s(activity.category)),
                                ]),
                                _vm._v(" "),
                                _c("span", { staticClass: "meta-badge" }, [
                                  _vm._v(_vm._s(activity.muscle)),
                                ]),
                                _vm._v(" "),
                                _c("span", { staticClass: "meta-badge" }, [
                                  _vm._v(_vm._s(activity.difficulty)),
                                ]),
                              ]),
                            ]),
                            _vm._v(" "),
                            _c(
                              "b-button",
                              {
                                staticClass: "remove-btn",
                                attrs: {
                                  variant: "outline-danger",
                                  size: "sm",
                                },
                                on: {
                                  click: function ($event) {
                                    return _vm.removeActivity(activity.id)
                                  },
                                },
                              },
                              [_c("i", { staticClass: "fas fa-times" })]
                            ),
                          ],
                          1
                        ),
                      ]
                    )
                  }),
                  0
                ),
                _vm._v(" "),
                _c(
                  "div",
                  { staticClass: "modal-actions mt-3" },
                  [
                    _c(
                      "b-button",
                      {
                        staticClass:
                          "btn-modern btn-create-workout-modal w-100 mb-2",
                        attrs: { variant: "success" },
                        on: { click: _vm.openCreateWorkoutModal },
                      },
                      [
                        _c("i", { staticClass: "fas fa-dumbbell mr-2" }),
                        _vm._v(
                          "\n                    Create Workout from Selected (" +
                            _vm._s(_vm.selectedActivities.length) +
                            ")\n                "
                        ),
                      ]
                    ),
                    _vm._v(" "),
                    _c(
                      "b-button",
                      {
                        staticClass: "btn-outline-modern w-100",
                        attrs: { variant: "outline-secondary" },
                        on: { click: _vm.clearSelection },
                      },
                      [
                        _c("i", { staticClass: "fas fa-times mr-2" }),
                        _vm._v(
                          "\n                    Clear Selection\n                "
                        ),
                      ]
                    ),
                  ],
                  1
                ),
              ])
            : _c("div", { staticClass: "text-center py-4" }, [
                _c("i", {
                  staticClass: "fas fa-inbox text-muted",
                  staticStyle: { "font-size": "2rem" },
                }),
                _vm._v(" "),
                _c("p", { staticClass: "mt-2" }, [
                  _vm._v("No activities selected"),
                ]),
              ]),
        ]
      ),
      _vm._v(" "),
      _vm.showActivityModal
        ? _c("ActivityModal", {
            attrs: {
              visible: _vm.showActivityModal,
              initialWorkout: _vm.selectedActivity,
            },
            on: {
              close: _vm.closeActivityModal,
              submit: _vm.handleActivitySubmit,
            },
          })
        : _vm._e(),
      _vm._v(" "),
      _vm.showWorkoutModal
        ? _c("WorkoutModal", {
            attrs: {
              visible: _vm.showWorkoutModal,
              selectedActivities: _vm.selectedActivitiesForWorkout,
            },
            on: {
              close: _vm.closeWorkoutModal,
              submit: _vm.handleWorkoutSubmit,
            },
          })
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
    return _c("div", { staticClass: "header-content" }, [
      _c("h1", { staticClass: "page-title" }, [_vm._v("Activity Library")]),
      _vm._v(" "),
      _c("p", { staticClass: "page-subtitle" }, [
        _vm._v(
          "\n                Discover and select exercises for your workout routine\n            "
        ),
      ]),
    ])
  },
  function () {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("h3", { staticClass: "activities-title" }, [
      _c("i", { staticClass: "fas fa-dumbbell mr-2" }),
      _vm._v("\n                Available Activities\n            "),
    ])
  },
  function () {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "empty-icon" }, [
      _c("i", { staticClass: "fas fa-search" }),
    ])
  },
]
render._withStripped = true



/***/ })

}]);