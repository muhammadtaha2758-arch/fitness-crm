"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["resources_src_views_app_pages_Nutrition_ComparePhotos_vue"],{

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/Nutrition/ComparePhotos.vue?vue&type=script&lang=js":
/*!***********************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/Nutrition/ComparePhotos.vue?vue&type=script&lang=js ***!
  \***********************************************************************************************************************************************************************************************************************/
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


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  name: 'ComparePhotos',
  data: function data() {
    return {
      leftPhoto: null,
      rightPhoto: null,
      currentSide: null,
      showPhotosPanel: false,
      isLoadingPhotos: false,
      availablePhotos: [],
      selectionCount: 0,
      leftSelected: null,
      rightSelected: null,
      // Assessment data
      memberId: null,
      selectedDate: null,
      assessmentData: null,
      loadingAssessment: false,
      assessmentError: null,
      notes: '',
      isEditingNotes: false,
      savingNotes: false,
      originalNotes: ''
    };
  },
  computed: {
    groupedPanelPhotos: function groupedPanelPhotos() {
      var groups = {};
      (this.availablePhotos || []).forEach(function (p) {
        var ts = p.uploaded_at || p.created_at || null;
        var d = ts ? new Date(ts) : null;
        var key = d ? d.toISOString().slice(0, 10) : 'Unknown';
        if (!groups[key]) groups[key] = [];
        var withUrl = Object.assign({}, p, {
          url: p.url || (p.image_path ? "".concat(window.location.origin, "/").concat(p.image_path) : p.image_data ? "".concat(window.location.origin, "/").concat(p.image_data) : null)
        });
        groups[key].push(withUrl);
      });
      // Sort by date desc
      var sorted = {};
      Object.keys(groups).sort(function (a, b) {
        return a < b ? 1 : -1;
      }).forEach(function (k) {
        return sorted[k] = groups[k];
      });
      return sorted;
    },
    groupedPanelPhotosKeys: function groupedPanelPhotosKeys() {
      return Object.keys(this.groupedPanelPhotos || {});
    }
  },
  mounted: function mounted() {
    this.initializeComponent();
  },
  watch: {
    '$route.query': {
      handler: function handler(newQuery) {
        this.initializeComponent();
      },
      deep: true
    },
    leftSelected: {
      handler: function handler(newPhoto) {
        if (newPhoto) {
          this.updateDateFromPhoto(newPhoto, 'left');
        }
      }
    },
    rightSelected: {
      handler: function handler(newPhoto) {
        if (newPhoto) {
          this.updateDateFromPhoto(newPhoto, 'right');
        }
      }
    }
  },
  methods: {
    initializeComponent: function initializeComponent() {
      // Get memberId and date from route query params
      var query = this.$route.query || {};
      this.memberId = query.memberId || null;
      this.selectedDate = query.date || null;

      // If date is provided, fetch assessment data
      if (this.selectedDate && this.memberId) {
        this.fetchAssessmentData();
      } else if (this.memberId) {
        // Try to get date from selected photos
        var photoDate = this.leftSelected || this.rightSelected;
        if (photoDate) {
          var photoDateStr = this.getDateFromPhoto(photoDate);
          if (photoDateStr) {
            this.selectedDate = photoDateStr;
            this.fetchAssessmentData();
          }
        }
      }
    },
    updateDateFromPhoto: function updateDateFromPhoto(photo, side) {
      var photoDate = this.getDateFromPhoto(photo);
      if (photoDate && this.memberId) {
        this.selectedDate = photoDate;
        this.fetchAssessmentData();
        // Update route query without navigation
        this.$router.replace({
          query: _objectSpread(_objectSpread({}, this.$route.query), {}, {
            date: photoDate
          })
        })["catch"](function () {});
      }
    },
    getDateFromPhoto: function getDateFromPhoto(photo) {
      if (!photo) return null;
      var ts = photo.uploaded_at || photo.created_at || null;
      if (!ts) return null;
      var d = new Date(ts);
      if (isNaN(d.getTime())) return null;
      return d.toISOString().slice(0, 10); // YYYY-MM-DD format
    },
    fetchAssessmentData: function fetchAssessmentData() {
      var _this = this;
      return _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
        var response, assessments, assessment, _error$response;
        return _regeneratorRuntime().wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              if (!(!_this.memberId || !_this.selectedDate)) {
                _context.next = 3;
                break;
              }
              _this.assessmentData = null;
              return _context.abrupt("return");
            case 3:
              _this.loadingAssessment = true;
              _this.assessmentError = null;
              _context.prev = 5;
              _context.next = 8;
              return axios__WEBPACK_IMPORTED_MODULE_0___default().get("/assigned-meals-members/member/".concat(_this.memberId, "/assessments"), {
                params: {
                  date: _this.selectedDate
                }
              });
            case 8:
              response = _context.sent;
              if (response.data.success) {
                assessments = response.data.data || []; // Find assessment for the specific date
                assessment = assessments.find(function (a) {
                  return a.date === _this.selectedDate;
                }) || assessments[0];
                if (assessment) {
                  _this.assessmentData = {
                    id: assessment.id,
                    date: assessment.date,
                    weight: assessment.weight,
                    bodyFat: assessment.bodyFat,
                    waterIntake: assessment.waterIntake,
                    hunger: assessment.hunger,
                    strength: assessment.strength,
                    energy: assessment.energy,
                    centerChest: assessment.centerChest,
                    arms: assessment.arms,
                    waist: assessment.waist,
                    upperThigh: assessment.upperThigh,
                    hips: assessment.hips,
                    activities: assessment.activities,
                    cardio: assessment.cardio,
                    feel: assessment.feel,
                    mealDeviations: assessment.mealDeviations,
                    calories: assessment.calories,
                    protein: assessment.protein,
                    carb: assessment.carb,
                    fat: assessment.fat,
                    notes: assessment.notes
                  };
                  _this.notes = assessment.notes || '';
                  _this.originalNotes = _this.notes;
                } else {
                  _this.assessmentData = null;
                }
              } else {
                _this.assessmentError = response.data.message || 'Failed to fetch assessment data';
                _this.assessmentData = null;
              }
              _context.next = 17;
              break;
            case 12:
              _context.prev = 12;
              _context.t0 = _context["catch"](5);
              console.error('Error fetching assessment data:', _context.t0);
              _this.assessmentError = ((_error$response = _context.t0.response) === null || _error$response === void 0 || (_error$response = _error$response.data) === null || _error$response === void 0 ? void 0 : _error$response.message) || _context.t0.message || 'Failed to fetch assessment data';
              _this.assessmentData = null;
            case 17:
              _context.prev = 17;
              _this.loadingAssessment = false;
              return _context.finish(17);
            case 20:
            case "end":
              return _context.stop();
          }
        }, _callee, null, [[5, 12, 17, 20]]);
      }))();
    },
    formatValue: function formatValue(value) {
      var suffix = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
      if (value === null || value === undefined || value === '') {
        return 'N/A';
      }
      if (typeof value === 'number') {
        if (suffix === '%' || suffix === '/10') {
          return value + suffix;
        }
        if (suffix === 'lbs' || suffix === 'in' || suffix === 'g' || suffix === 'kcal') {
          return value + ' ' + suffix;
        }
        return value.toString();
      }
      return value.toString();
    },
    formatDateDisplay: function formatDateDisplay(dateString) {
      if (!dateString) return 'No date selected';
      var d = new Date(dateString);
      if (isNaN(d.getTime())) return dateString;
      return d.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    },
    startEditingNotes: function startEditingNotes() {
      this.isEditingNotes = true;
      this.originalNotes = this.notes;
    },
    cancelEditingNotes: function cancelEditingNotes() {
      this.notes = this.originalNotes;
      this.isEditingNotes = false;
    },
    saveNotes: function saveNotes() {
      var _this2 = this;
      return _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee2() {
        var response, _error$response2, errorMessage;
        return _regeneratorRuntime().wrap(function _callee2$(_context2) {
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
              if (!(!_this2.assessmentData || !_this2.assessmentData.id)) {
                _context2.next = 3;
                break;
              }
              alert('Cannot save notes: Assessment data is missing');
              return _context2.abrupt("return");
            case 3:
              _this2.savingNotes = true;
              _context2.prev = 4;
              _context2.next = 7;
              return axios__WEBPACK_IMPORTED_MODULE_0___default().put("/assigned-meals-members/".concat(_this2.assessmentData.id), {
                notes: _this2.notes || null
              });
            case 7:
              response = _context2.sent;
              if (!response.data.success) {
                _context2.next = 14;
                break;
              }
              _this2.originalNotes = _this2.notes;
              _this2.isEditingNotes = false;
              _this2.showSuccessMessage('Notes saved successfully!');
              _context2.next = 15;
              break;
            case 14:
              throw new Error(response.data.message || 'Failed to save notes');
            case 15:
              _context2.next = 22;
              break;
            case 17:
              _context2.prev = 17;
              _context2.t0 = _context2["catch"](4);
              console.error('Error saving notes:', _context2.t0);
              errorMessage = ((_error$response2 = _context2.t0.response) === null || _error$response2 === void 0 || (_error$response2 = _error$response2.data) === null || _error$response2 === void 0 ? void 0 : _error$response2.message) || _context2.t0.message || 'Failed to save notes';
              alert('Error saving notes: ' + errorMessage);
            case 22:
              _context2.prev = 22;
              _this2.savingNotes = false;
              return _context2.finish(22);
            case 25:
            case "end":
              return _context2.stop();
          }
        }, _callee2, null, [[4, 17, 22, 25]]);
      }))();
    },
    showSuccessMessage: function showSuccessMessage(message) {
      var successDiv = document.createElement("div");
      successDiv.className = "success-message";
      successDiv.textContent = message;
      successDiv.style.cssText = "\n                position: fixed;\n                top: 20px;\n                right: 20px;\n                background: #28a745;\n                color: white;\n                padding: 1rem 1.5rem;\n                border-radius: 8px;\n                box-shadow: 0 4px 12px rgba(0,0,0,0.15);\n                z-index: 10000;\n                font-weight: 600;\n                animation: slideInRight 0.3s ease;\n            ";
      document.body.appendChild(successDiv);
      setTimeout(function () {
        if (successDiv.parentNode) {
          successDiv.parentNode.removeChild(successDiv);
        }
      }, 3000);
    },
    goBack: function goBack() {
      this.$router.go(-1);
    },
    openPhotoPanel: function openPhotoPanel(side) {
      this.currentSide = side;
      this.showPhotosPanel = true;
      this.fetchAvailablePhotos();
    },
    closePhotoPanel: function closePhotoPanel() {
      this.showPhotosPanel = false;
    },
    fetchAvailablePhotos: function fetchAvailablePhotos() {
      var _this3 = this;
      return _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee3() {
        var params, _yield$axios$get, data, items;
        return _regeneratorRuntime().wrap(function _callee3$(_context3) {
          while (1) switch (_context3.prev = _context3.next) {
            case 0:
              _this3.isLoadingPhotos = true;
              _context3.prev = 1;
              params = {};
              if (_this3.$route && _this3.$route.query && _this3.$route.query.memberId) {
                params.memberId = _this3.$route.query.memberId;
              }
              _context3.next = 6;
              return axios__WEBPACK_IMPORTED_MODULE_0___default().get('/comparison-photos', {
                params: params
              });
            case 6:
              _yield$axios$get = _context3.sent;
              data = _yield$axios$get.data;
              if (data && data.success) {
                items = Array.isArray(data.data) ? data.data : []; // Ensure each has a url property
                _this3.availablePhotos = items.map(function (p) {
                  return _objectSpread(_objectSpread({}, p), {}, {
                    url: p.url || (p.image_path ? "".concat(window.location.origin, "/").concat(p.image_path) : p.image_data ? "".concat(window.location.origin, "/").concat(p.image_data) : null)
                  });
                });
              } else {
                _this3.availablePhotos = [];
              }
              _context3.next = 15;
              break;
            case 11:
              _context3.prev = 11;
              _context3.t0 = _context3["catch"](1);
              // eslint-disable-next-line no-console
              console.error('Failed to fetch available photos', _context3.t0);
              _this3.availablePhotos = [];
            case 15:
              _context3.prev = 15;
              _this3.isLoadingPhotos = false;
              return _context3.finish(15);
            case 18:
            case "end":
              return _context3.stop();
          }
        }, _callee3, null, [[1, 11, 15, 18]]);
      }))();
    },
    handlePanelPhotoClick: function handlePanelPhotoClick(photo) {
      if (this.currentSide === 'left') {
        this.leftPhoto = photo.url;
        this.leftSelected = photo;
      } else if (this.currentSide === 'right') {
        this.rightPhoto = photo.url;
        this.rightSelected = photo;
      }
      this.closePhotoPanel();
    },
    formatDate: function formatDate(value) {
      if (!value) return '';
      var d = new Date(value);
      if (isNaN(d.getTime())) return '';
      return d.toLocaleDateString();
    }
  }
});

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js??clonedRuleSet-12.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12.use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-12.use[3]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/Nutrition/ComparePhotos.vue?vue&type=style&index=0&id=3105befc&lang=scss&scoped=true":
/*!**************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??clonedRuleSet-12.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12.use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-12.use[3]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/Nutrition/ComparePhotos.vue?vue&type=style&index=0&id=3105befc&lang=scss&scoped=true ***!
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
___CSS_LOADER_EXPORT___.push([module.id, "@charset \"UTF-8\";\n.filter-btn .btn[data-v-3105befc],\n.filter-btn .btn-secondary[data-v-3105befc],\n.filter-btn .btn-outline-secondary[data-v-3105befc],\n.filter-btn button.btn[data-v-3105befc],\n.filter-btn button.btn-secondary[data-v-3105befc] {\n  color: #000 !important;\n  background-color: transparent !important;\n  border-color: #6c757d !important;\n}\n.filter-btn .btn[data-v-3105befc]:hover,\n.filter-btn .btn-secondary[data-v-3105befc]:hover,\n.filter-btn .btn-outline-secondary[data-v-3105befc]:hover,\n.filter-btn button.btn[data-v-3105befc]:hover,\n.filter-btn button.btn-secondary[data-v-3105befc]:hover {\n  color: #dc3545 !important;\n  background-color: transparent !important;\n  border-color: #dc3545 !important;\n  box-shadow: none !important;\n}\n.filter-btn .btn[data-v-3105befc]:focus,\n.filter-btn .btn-secondary[data-v-3105befc]:focus,\n.filter-btn .btn-outline-secondary[data-v-3105befc]:focus,\n.filter-btn button.btn[data-v-3105befc]:focus,\n.filter-btn button.btn-secondary[data-v-3105befc]:focus {\n  color: #dc3545 !important;\n  background-color: transparent !important;\n  border-color: #dc3545 !important;\n  box-shadow: none !important;\n}\n.filter-btn .btn[data-v-3105befc]:active,\n.filter-btn .btn-secondary[data-v-3105befc]:active,\n.filter-btn .btn-outline-secondary[data-v-3105befc]:active,\n.filter-btn button.btn[data-v-3105befc]:active,\n.filter-btn button.btn-secondary[data-v-3105befc]:active {\n  color: #dc3545 !important;\n  background-color: transparent !important;\n  border-color: #dc3545 !important;\n}\n.btn-secondary[data-v-3105befc]:not(:disabled):not(.disabled):active:focus {\n  box-shadow: none !important;\n}\n\n/* ===========================================\n   COMMON BREADCRUMB NAVIGATION STYLES\n   =========================================== */\n.breadcrumb-nav-row[data-v-3105befc] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  margin-bottom: 0.5rem;\n  gap: 0.5rem;\n}\n.breadcrumb-section[data-v-3105befc] {\n  flex: 1;\n}\n.breadcrumb-section .breadcrumb-nav .breadcrumb-container[data-v-3105befc] {\n  display: flex;\n  align-items: center;\n  gap: 1rem;\n}\n.breadcrumb-section .breadcrumb-nav .breadcrumb-container .back-button[data-v-3105befc] {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  width: 40px;\n  height: 40px;\n  background: rgba(255, 255, 255, 0.1);\n  border: 1px solid rgba(255, 255, 255, 0.2);\n  border-radius: 8px;\n  color: #ffffff;\n  cursor: pointer;\n  transition: all 0.3s ease;\n}\n.breadcrumb-section .breadcrumb-nav .breadcrumb-container .back-button[data-v-3105befc]:hover {\n  background: rgba(255, 255, 255, 0.15);\n  border-color: rgba(255, 255, 255, 0.3);\n  transform: translateY(-1px);\n  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);\n  color: #dc3545;\n}\n.breadcrumb-section .breadcrumb-nav .breadcrumb-container .back-button i[data-v-3105befc] {\n  font-size: 1.1em;\n}\n.breadcrumb-section .breadcrumb-nav .breadcrumb-container .breadcrumb[data-v-3105befc] {\n  display: flex;\n  align-items: center;\n  gap: 0.5rem;\n  margin: 0;\n  padding: 0;\n  background: none;\n  border-radius: 0;\n}\n.breadcrumb-section .breadcrumb-nav .breadcrumb-container .breadcrumb .breadcrumb-item[data-v-3105befc] {\n  display: flex;\n  align-items: center;\n  gap: 0.5rem;\n  font-size: 0.875rem;\n  color: #ffffff;\n}\n.breadcrumb-section .breadcrumb-nav .breadcrumb-container .breadcrumb .breadcrumb-item.active[data-v-3105befc] {\n  color: #252525;\n  font-weight: 600;\n}\n.breadcrumb-section .breadcrumb-nav .breadcrumb-container .breadcrumb .breadcrumb-item.active i[data-v-3105befc] {\n  color: #dc3545;\n}\n.breadcrumb-section .breadcrumb-nav .breadcrumb-container .breadcrumb .breadcrumb-item a[data-v-3105befc] {\n  display: flex;\n  align-items: center;\n  gap: 0.5rem;\n  color: #6a6a6a;\n  text-decoration: none;\n  transition: color 0.3s ease;\n}\n.breadcrumb-section .breadcrumb-nav .breadcrumb-container .breadcrumb .breadcrumb-item a[data-v-3105befc]:hover {\n  color: #dc3545;\n}\n.breadcrumb-section .breadcrumb-nav .breadcrumb-container .breadcrumb .breadcrumb-item a:hover i[data-v-3105befc] {\n  color: #dc3545;\n}\n.breadcrumb-section .breadcrumb-nav .breadcrumb-container .breadcrumb .breadcrumb-item a i[data-v-3105befc] {\n  font-size: 0.9em;\n  transition: color 0.3s ease;\n}\n.breadcrumb-section .breadcrumb-nav .breadcrumb-container .breadcrumb .breadcrumb-item[data-v-3105befc]:not(:last-child)::after {\n  content: \"›\";\n  margin-left: 0.5rem;\n  color: #6a6a6a;\n  font-size: 1.2em;\n}\n.action-section[data-v-3105befc] {\n  display: flex;\n  align-items: center;\n}\n.action-section .action-btn[data-v-3105befc] {\n  display: flex;\n  align-items: center;\n  gap: 0.5rem;\n  padding: 0.5rem 1rem;\n  border-radius: 8px;\n  font-size: 0.875rem;\n  font-weight: 500;\n  transition: all 0.3s ease;\n}\n.action-section .action-btn[data-v-3105befc]:hover:not(:disabled) {\n  transform: translateY(-1px);\n  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);\n}\n.action-section .action-btn[data-v-3105befc]:disabled {\n  opacity: 0.6;\n  cursor: not-allowed;\n}\n.action-section .action-btn i[data-v-3105befc] {\n  font-size: 0.9em;\n}\n@media (max-width: 768px) {\n.breadcrumb-nav-row[data-v-3105befc] {\n    flex-direction: column;\n    align-items: flex-start;\n    gap: 0.5rem;\n}\n.breadcrumb-section[data-v-3105befc] {\n    width: 100%;\n}\n.breadcrumb-section .breadcrumb-container[data-v-3105befc] {\n    flex-direction: column;\n    align-items: flex-start;\n    gap: 0.5rem;\n}\n.breadcrumb-section .breadcrumb-container .breadcrumb[data-v-3105befc] {\n    flex-wrap: wrap;\n}\n.breadcrumb-section .breadcrumb-container .breadcrumb .breadcrumb-item[data-v-3105befc] {\n    font-size: 0.8rem;\n}\n.breadcrumb-section .breadcrumb-container .breadcrumb .breadcrumb-item a[data-v-3105befc] {\n    font-size: 0.8rem;\n}\n.action-section[data-v-3105befc] {\n    width: 100%;\n    justify-content: flex-end;\n}\n.action-section .action-btn[data-v-3105befc] {\n    font-size: 0.8rem;\n    padding: 0.4rem 0.8rem;\n}\n}\n/* ===========================================\n   RESPONSIVE UTILITY CLASSES (ALL DEVICES)\n   =========================================== */\n.show-xs-only[data-v-3105befc],\n.show-sm-only[data-v-3105befc],\n.show-md-only[data-v-3105befc],\n.show-lg-only[data-v-3105befc],\n.show-xl-only[data-v-3105befc] {\n  display: none !important;\n}\n@media (max-width: 575px) {\n.hide-xs[data-v-3105befc] {\n    display: none !important;\n}\n.show-xs-only[data-v-3105befc] {\n    display: initial !important;\n}\n}\n@media (min-width: 576px) and (max-width: 767px) {\n.hide-sm[data-v-3105befc] {\n    display: none !important;\n}\n.show-sm-only[data-v-3105befc] {\n    display: initial !important;\n}\n}\n@media (min-width: 768px) and (max-width: 991px) {\n.hide-md[data-v-3105befc] {\n    display: none !important;\n}\n.show-md-only[data-v-3105befc] {\n    display: initial !important;\n}\n}\n@media (min-width: 992px) and (max-width: 1199px) {\n.hide-lg[data-v-3105befc] {\n    display: none !important;\n}\n.show-lg-only[data-v-3105befc] {\n    display: initial !important;\n}\n}\n@media (min-width: 1200px) {\n.hide-xl[data-v-3105befc] {\n    display: none !important;\n}\n.show-xl-only[data-v-3105befc] {\n    display: initial !important;\n}\n}\n@media (max-width: 576px) {\n.hide-sm-down[data-v-3105befc] {\n    display: none !important;\n}\n}\n@media (max-width: 768px) {\n.hide-md-down[data-v-3105befc] {\n    display: none !important;\n}\n}\n@media (max-width: 992px) {\n.hide-lg-down[data-v-3105befc] {\n    display: none !important;\n}\n}\n@media (min-width: 576px) {\n.hide-sm-up[data-v-3105befc] {\n    display: none !important;\n}\n}\n@media (min-width: 768px) {\n.hide-md-up[data-v-3105befc] {\n    display: none !important;\n}\n}\n@media (min-width: 992px) {\n.hide-lg-up[data-v-3105befc] {\n    display: none !important;\n}\n}\n@media (max-width: 575px) {\n.d-xs-none[data-v-3105befc] {\n    display: none !important;\n}\n.d-xs-block[data-v-3105befc] {\n    display: block !important;\n}\n.d-xs-flex[data-v-3105befc] {\n    display: flex !important;\n}\n}\n@media (min-width: 576px) and (max-width: 767px) {\n.d-sm-none[data-v-3105befc] {\n    display: none !important;\n}\n.d-sm-block[data-v-3105befc] {\n    display: block !important;\n}\n.d-sm-flex[data-v-3105befc] {\n    display: flex !important;\n}\n}\n@media (min-width: 768px) and (max-width: 991px) {\n.d-md-none[data-v-3105befc] {\n    display: none !important;\n}\n.d-md-block[data-v-3105befc] {\n    display: block !important;\n}\n.d-md-flex[data-v-3105befc] {\n    display: flex !important;\n}\n}\n@media (min-width: 992px) and (max-width: 1199px) {\n.d-lg-none[data-v-3105befc] {\n    display: none !important;\n}\n.d-lg-block[data-v-3105befc] {\n    display: block !important;\n}\n.d-lg-flex[data-v-3105befc] {\n    display: flex !important;\n}\n}\n@media (min-width: 1200px) {\n.d-xl-none[data-v-3105befc] {\n    display: none !important;\n}\n.d-xl-block[data-v-3105befc] {\n    display: block !important;\n}\n.d-xl-flex[data-v-3105befc] {\n    display: flex !important;\n}\n}\n@media (min-width: 576px) {\n.custom-modal-xl[data-v-3105befc] {\n    max-width: 1500px !important;\n}\n}\n.compare-photos-page[data-v-3105befc] {\n  padding: 20px;\n  min-height: 100vh;\n}\n.page-header .page-title[data-v-3105befc] {\n  color: #252525;\n  font-size: 2.5rem;\n  font-weight: 700;\n  margin: 0;\n}\n.btn-outline-primary[data-v-3105befc] {\n  color: #252525;\n  border-color: #252525;\n  background-color: transparent;\n  font-weight: 600;\n  padding: 8px 16px;\n  border-radius: 4px;\n  transition: all 0.3s ease;\n  text-transform: uppercase;\n  letter-spacing: 0.5px;\n}\n.btn-outline-primary[data-v-3105befc]:hover {\n  color: #ffffff;\n  background-color: #ff4040;\n  border-color: #ff4040;\n}\n.btn-outline-primary[data-v-3105befc]:focus {\n  box-shadow: 0 0 0 0.2rem rgba(255, 64, 64, 0.25);\n}\n.photo-comparison-container[data-v-3105befc] {\n  max-width: 1200px;\n  margin: 0 auto;\n}\n.photo-area[data-v-3105befc] {\n  text-align: center;\n}\n.photo-frame[data-v-3105befc] {\n  width: 100%;\n  height: 400px;\n  border: 2px solid #e0e0e0;\n  border-radius: 8px;\n  background-color: #ffffff;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  cursor: pointer;\n  transition: all 0.3s ease;\n  margin-bottom: 20px;\n  position: relative;\n  overflow: hidden;\n}\n.photo-frame[data-v-3105befc]:hover {\n  border-color: #ff4040;\n  box-shadow: 0 4px 12px rgba(255, 64, 64, 0.1);\n}\n.empty-photo[data-v-3105befc] {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  height: 100%;\n  color: #6c757d;\n}\n.selected-photo[data-v-3105befc] {\n  width: 100%;\n  height: 100%;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n.selected-photo img[data-v-3105befc] {\n  max-width: 100%;\n  max-height: 100%;\n  -o-object-fit: contain;\n     object-fit: contain;\n  border-radius: 6px;\n}\n.choose-photo-btn[data-v-3105befc] {\n  width: 200px;\n  margin: 0 auto;\n  display: block;\n}\n.selected-meta-top[data-v-3105befc] {\n  line-height: 1;\n}\n@media (max-width: 768px) {\n.compare-photos-page[data-v-3105befc] {\n    padding: 15px;\n}\n.page-title[data-v-3105befc] {\n    font-size: 2rem;\n}\n.photo-frame[data-v-3105befc] {\n    height: 300px;\n}\n.choose-photo-btn[data-v-3105befc] {\n    width: 100%;\n    max-width: 200px;\n}\n}\n@media (max-width: 576px) {\n.page-header .d-flex[data-v-3105befc] {\n    flex-direction: column;\n    align-items: flex-start !important;\n}\n.page-header .btn[data-v-3105befc] {\n    margin-top: 15px;\n    width: 100%;\n}\n.photo-frame[data-v-3105befc] {\n    height: 250px;\n}\n}\n/* Fitness Report Section Styles */\n.fitness-report-section[data-v-3105befc] {\n  margin-top: 2rem;\n  padding: 2rem;\n  background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%);\n  border-radius: 12px;\n  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);\n  border: 1px solid rgba(0, 0, 0, 0.05);\n}\n.report-container[data-v-3105befc] {\n  max-width: 900px;\n  margin: 0 auto;\n}\n.date-header[data-v-3105befc] {\n  margin-bottom: 2rem;\n  padding-bottom: 1rem;\n  border-bottom: 2px solid #ff4040;\n}\n.date-title[data-v-3105befc] {\n  color: #252525;\n  font-size: 1.5rem;\n  font-weight: 700;\n  margin: 0;\n  display: flex;\n  align-items: center;\n}\n.date-title i[data-v-3105befc] {\n  color: #ff4040;\n}\n.daily-metrics[data-v-3105befc] {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));\n  gap: 1rem;\n  margin-bottom: 2rem;\n}\n.metric-item[data-v-3105befc] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  padding: 1rem 1.25rem;\n  background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%);\n  border-radius: 8px;\n  border-left: 4px solid #ff4040;\n  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);\n  transition: all 0.3s ease;\n}\n.metric-item[data-v-3105befc]:hover {\n  transform: translateY(-2px);\n  box-shadow: 0 4px 12px rgba(255, 64, 64, 0.15);\n}\n.metric-item label[data-v-3105befc] {\n  font-weight: 600;\n  color: #495057;\n  margin: 0;\n  font-size: 0.9rem;\n  display: flex;\n  align-items: center;\n}\n.metric-item label i[data-v-3105befc] {\n  color: #ff4040;\n  margin-right: 0.5rem;\n}\n.metric-value[data-v-3105befc] {\n  font-weight: 700;\n  color: #252525;\n  font-size: 1.1rem;\n}\n.section-title[data-v-3105befc] {\n  color: #ff4040;\n  font-size: 1.35rem;\n  font-weight: 700;\n  margin-bottom: 1.25rem;\n  padding-bottom: 0.5rem;\n  border-bottom: 2px solid #ff4040;\n  display: flex;\n  align-items: center;\n}\n.section-title i[data-v-3105befc] {\n  margin-right: 0.5rem;\n}\n.measurements-section[data-v-3105befc] {\n  margin-bottom: 2rem;\n}\n.measurements-grid[data-v-3105befc] {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));\n  gap: 1rem;\n}\n.measurement-item[data-v-3105befc] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  padding: 0.875rem 1rem;\n  background: #f8f9fa;\n  border-radius: 8px;\n  border: 1px solid #e9ecef;\n  transition: all 0.3s ease;\n}\n.measurement-item[data-v-3105befc]:hover {\n  background: #ffffff;\n  border-color: #ff4040;\n  box-shadow: 0 2px 8px rgba(255, 64, 64, 0.1);\n}\n.measurement-item label[data-v-3105befc] {\n  font-weight: 600;\n  color: #495057;\n  margin: 0;\n  font-size: 0.9rem;\n}\n.measurement-value[data-v-3105befc] {\n  font-weight: 600;\n  color: #6c757d;\n  font-size: 1rem;\n}\n.self-assessment-section[data-v-3105befc] {\n  margin-bottom: 2rem;\n}\n.assessment-items[data-v-3105befc] {\n  display: flex;\n  flex-direction: column;\n  gap: 1rem;\n}\n.assessment-item[data-v-3105befc] {\n  padding: 1.25rem;\n  background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%);\n  border-radius: 8px;\n  border-left: 4px solid #ff4040;\n  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);\n  transition: all 0.3s ease;\n}\n.assessment-item[data-v-3105befc]:hover {\n  transform: translateX(4px);\n  box-shadow: 0 4px 12px rgba(255, 64, 64, 0.15);\n}\n.assessment-item label[data-v-3105befc] {\n  font-weight: 700;\n  color: #252525;\n  margin-bottom: 0.5rem;\n  display: block;\n  font-size: 0.95rem;\n  display: flex;\n  align-items: center;\n}\n.assessment-item label i[data-v-3105befc] {\n  color: #ff4040;\n  margin-right: 0.5rem;\n}\n.assessment-text[data-v-3105befc] {\n  color: #495057;\n  margin: 0;\n  line-height: 1.6;\n  font-size: 0.95rem;\n}\n.nutrition-section[data-v-3105befc] {\n  margin-bottom: 2rem;\n}\n.nutrition-grid[data-v-3105befc] {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));\n  gap: 1rem;\n}\n.nutrition-item[data-v-3105befc] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  padding: 0.875rem 1rem;\n  background: linear-gradient(135deg, #fff5f5 0%, #ffffff 100%);\n  border-radius: 8px;\n  border: 1px solid #ffe0e0;\n  transition: all 0.3s ease;\n}\n.nutrition-item[data-v-3105befc]:hover {\n  background: linear-gradient(135deg, #ffffff 0%, #fff5f5 100%);\n  border-color: #ff4040;\n  box-shadow: 0 2px 8px rgba(255, 64, 64, 0.15);\n}\n.nutrition-item label[data-v-3105befc] {\n  font-weight: 600;\n  color: #495057;\n  margin: 0;\n  font-size: 0.9rem;\n}\n.nutrition-value[data-v-3105befc] {\n  font-weight: 700;\n  color: #ff4040;\n  font-size: 1rem;\n}\n.notes-section[data-v-3105befc] {\n  margin-bottom: 2rem;\n}\n.notes-input-container[data-v-3105befc] {\n  position: relative;\n}\n.notes-textarea[data-v-3105befc] {\n  width: 100%;\n  padding: 1rem;\n  border: 2px solid #e9ecef;\n  border-radius: 8px;\n  font-size: 0.95rem;\n  line-height: 1.6;\n  resize: vertical;\n  min-height: 120px;\n  transition: all 0.3s ease;\n  font-family: inherit;\n  background: #ffffff;\n}\n.notes-textarea[data-v-3105befc]:focus {\n  outline: none;\n  border-color: #ff4040;\n  box-shadow: 0 0 0 3px rgba(255, 64, 64, 0.1);\n}\n.notes-textarea[data-v-3105befc]:disabled {\n  background: #f8f9fa;\n  cursor: not-allowed;\n  opacity: 0.7;\n}\n.notes-textarea[data-v-3105befc]::-moz-placeholder {\n  color: #adb5bd;\n  font-style: italic;\n}\n.notes-textarea[data-v-3105befc]::placeholder {\n  color: #adb5bd;\n  font-style: italic;\n}\n.edit-button-container[data-v-3105befc] {\n  display: flex;\n  justify-content: flex-end;\n  margin-top: 1.5rem;\n  gap: 1rem;\n}\n.edit-actions[data-v-3105befc] {\n  display: flex;\n  gap: 0.75rem;\n}\n.btn-edit[data-v-3105befc] {\n  background: linear-gradient(135deg, #ff4040 0%, #e63939 100%);\n  color: #ffffff;\n  border: none;\n  padding: 0.75rem 1.5rem;\n  border-radius: 8px;\n  font-weight: 700;\n  font-size: 0.875rem;\n  text-transform: uppercase;\n  letter-spacing: 0.5px;\n  transition: all 0.3s ease;\n  display: inline-flex;\n  align-items: center;\n  gap: 0.5rem;\n  box-shadow: 0 2px 8px rgba(255, 64, 64, 0.3);\n}\n.btn-edit[data-v-3105befc]:hover {\n  background: linear-gradient(135deg, #e63939 0%, #cc2e2e 100%);\n  transform: translateY(-2px);\n  box-shadow: 0 4px 12px rgba(255, 64, 64, 0.4);\n}\n.btn-edit[data-v-3105befc]:focus {\n  outline: none;\n  box-shadow: 0 0 0 3px rgba(255, 64, 64, 0.3);\n}\n.btn-edit[data-v-3105befc]:active {\n  transform: translateY(0);\n}\n.btn-save[data-v-3105befc] {\n  background: linear-gradient(135deg, #28a745 0%, #218838 100%);\n  color: #ffffff;\n  border: none;\n  padding: 0.75rem 1.5rem;\n  border-radius: 8px;\n  font-weight: 700;\n  font-size: 0.875rem;\n  text-transform: uppercase;\n  letter-spacing: 0.5px;\n  transition: all 0.3s ease;\n  display: inline-flex;\n  align-items: center;\n  gap: 0.5rem;\n  box-shadow: 0 2px 8px rgba(40, 167, 69, 0.3);\n}\n.btn-save[data-v-3105befc]:hover:not(:disabled) {\n  background: linear-gradient(135deg, #218838 0%, #1e7e34 100%);\n  transform: translateY(-2px);\n  box-shadow: 0 4px 12px rgba(40, 167, 69, 0.4);\n}\n.btn-save[data-v-3105befc]:disabled {\n  opacity: 0.6;\n  cursor: not-allowed;\n}\n.btn-cancel[data-v-3105befc] {\n  background: #6c757d;\n  color: #ffffff;\n  border: none;\n  padding: 0.75rem 1.5rem;\n  border-radius: 8px;\n  font-weight: 700;\n  font-size: 0.875rem;\n  text-transform: uppercase;\n  letter-spacing: 0.5px;\n  transition: all 0.3s ease;\n  display: inline-flex;\n  align-items: center;\n  gap: 0.5rem;\n}\n.btn-cancel[data-v-3105befc]:hover:not(:disabled) {\n  background: #5a6268;\n  transform: translateY(-2px);\n  box-shadow: 0 4px 12px rgba(108, 117, 125, 0.3);\n}\n.btn-cancel[data-v-3105befc]:disabled {\n  opacity: 0.6;\n  cursor: not-allowed;\n}\n.btn-edit i[data-v-3105befc],\n.btn-save i[data-v-3105befc],\n.btn-cancel i[data-v-3105befc] {\n  font-size: 1rem;\n}\n\n/* Right-side photos panel */\n.photos-panel-overlay[data-v-3105befc] {\n  position: fixed;\n  top: 0;\n  right: 0;\n  bottom: 0;\n  left: 0;\n  background-color: rgba(0, 0, 0, 0.25);\n  z-index: 1050;\n}\n.photos-panel[data-v-3105befc] {\n  position: absolute;\n  top: 0;\n  right: 0;\n  height: 100%;\n  width: 380px;\n  background: #fff;\n  box-shadow: -4px 0 16px rgba(0, 0, 0, 0.15);\n  display: flex;\n  flex-direction: column;\n}\n.panel-body[data-v-3105befc] {\n  overflow-y: auto;\n}\n.panel-thumb[data-v-3105befc] {\n  height: 140px;\n  -o-object-fit: cover;\n     object-fit: cover;\n}\n.selectable[data-v-3105befc] {\n  cursor: pointer;\n  transition: transform 0.1s ease-in-out;\n}\n.selectable[data-v-3105befc]:hover {\n  transform: translateY(-2px);\n}\n\n/* Responsive Design for Fitness Report */\n@media (max-width: 992px) {\n.fitness-report-section[data-v-3105befc] {\n    margin-top: 1.5rem;\n    padding: 1.5rem;\n}\n.daily-metrics[data-v-3105befc] {\n    grid-template-columns: 1fr;\n    gap: 0.875rem;\n}\n.measurements-grid[data-v-3105befc],\n  .nutrition-grid[data-v-3105befc] {\n    grid-template-columns: 1fr;\n}\n.section-title[data-v-3105befc] {\n    font-size: 1.2rem;\n}\n.date-title[data-v-3105befc] {\n    font-size: 1.25rem;\n}\n}\n@media (max-width: 768px) {\n.fitness-report-section[data-v-3105befc] {\n    padding: 1rem;\n    margin-top: 1rem;\n}\n.date-header[data-v-3105befc] {\n    margin-bottom: 1.5rem;\n}\n.date-title[data-v-3105befc] {\n    font-size: 1.1rem;\n}\n.metric-item[data-v-3105befc],\n  .measurement-item[data-v-3105befc],\n  .assessment-item[data-v-3105befc],\n  .nutrition-item[data-v-3105befc] {\n    padding: 0.75rem;\n}\n.edit-button-container[data-v-3105befc] {\n    flex-direction: column;\n}\n.edit-actions[data-v-3105befc] {\n    width: 100%;\n    flex-direction: column;\n}\n.btn-edit[data-v-3105befc],\n  .btn-save[data-v-3105befc],\n  .btn-cancel[data-v-3105befc] {\n    width: 100%;\n    justify-content: center;\n}\n}\n@media (max-width: 576px) {\n.fitness-report-section[data-v-3105befc] {\n    padding: 0.75rem;\n}\n.section-title[data-v-3105befc] {\n    font-size: 1.1rem;\n}\n.metric-item label[data-v-3105befc],\n  .measurement-item label[data-v-3105befc],\n  .nutrition-item label[data-v-3105befc] {\n    font-size: 0.85rem;\n}\n.metric-value[data-v-3105befc] {\n    font-size: 1rem;\n}\n}", ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-12.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12.use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-12.use[3]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/Nutrition/ComparePhotos.vue?vue&type=style&index=0&id=3105befc&lang=scss&scoped=true":
/*!******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-12.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12.use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-12.use[3]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/Nutrition/ComparePhotos.vue?vue&type=style&index=0&id=3105befc&lang=scss&scoped=true ***!
  \******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../../../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_clonedRuleSet_12_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_12_use_2_node_modules_sass_loader_dist_cjs_js_clonedRuleSet_12_use_3_node_modules_vue_loader_lib_index_js_vue_loader_options_ComparePhotos_vue_vue_type_style_index_0_id_3105befc_lang_scss_scoped_true__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !!../../../../../../node_modules/css-loader/dist/cjs.js??clonedRuleSet-12.use[1]!../../../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12.use[2]!../../../../../../node_modules/sass-loader/dist/cjs.js??clonedRuleSet-12.use[3]!../../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./ComparePhotos.vue?vue&type=style&index=0&id=3105befc&lang=scss&scoped=true */ "./node_modules/css-loader/dist/cjs.js??clonedRuleSet-12.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12.use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-12.use[3]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/Nutrition/ComparePhotos.vue?vue&type=style&index=0&id=3105befc&lang=scss&scoped=true");

            

var options = {};

options.insert = "head";
options.singleton = false;

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_clonedRuleSet_12_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_12_use_2_node_modules_sass_loader_dist_cjs_js_clonedRuleSet_12_use_3_node_modules_vue_loader_lib_index_js_vue_loader_options_ComparePhotos_vue_vue_type_style_index_0_id_3105befc_lang_scss_scoped_true__WEBPACK_IMPORTED_MODULE_1__["default"], options);



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_clonedRuleSet_12_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_12_use_2_node_modules_sass_loader_dist_cjs_js_clonedRuleSet_12_use_3_node_modules_vue_loader_lib_index_js_vue_loader_options_ComparePhotos_vue_vue_type_style_index_0_id_3105befc_lang_scss_scoped_true__WEBPACK_IMPORTED_MODULE_1__["default"].locals || {});

/***/ }),

/***/ "./resources/src/views/app/pages/Nutrition/ComparePhotos.vue":
/*!*******************************************************************!*\
  !*** ./resources/src/views/app/pages/Nutrition/ComparePhotos.vue ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _ComparePhotos_vue_vue_type_template_id_3105befc_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ComparePhotos.vue?vue&type=template&id=3105befc&scoped=true */ "./resources/src/views/app/pages/Nutrition/ComparePhotos.vue?vue&type=template&id=3105befc&scoped=true");
/* harmony import */ var _ComparePhotos_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ComparePhotos.vue?vue&type=script&lang=js */ "./resources/src/views/app/pages/Nutrition/ComparePhotos.vue?vue&type=script&lang=js");
/* harmony import */ var _ComparePhotos_vue_vue_type_style_index_0_id_3105befc_lang_scss_scoped_true__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ComparePhotos.vue?vue&type=style&index=0&id=3105befc&lang=scss&scoped=true */ "./resources/src/views/app/pages/Nutrition/ComparePhotos.vue?vue&type=style&index=0&id=3105befc&lang=scss&scoped=true");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");



;


/* normalize component */

var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _ComparePhotos_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__["default"],
  _ComparePhotos_vue_vue_type_template_id_3105befc_scoped_true__WEBPACK_IMPORTED_MODULE_0__.render,
  _ComparePhotos_vue_vue_type_template_id_3105befc_scoped_true__WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  "3105befc",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/src/views/app/pages/Nutrition/ComparePhotos.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./resources/src/views/app/pages/Nutrition/ComparePhotos.vue?vue&type=script&lang=js":
/*!*******************************************************************************************!*\
  !*** ./resources/src/views/app/pages/Nutrition/ComparePhotos.vue?vue&type=script&lang=js ***!
  \*******************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ComparePhotos_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./ComparePhotos.vue?vue&type=script&lang=js */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/Nutrition/ComparePhotos.vue?vue&type=script&lang=js");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ComparePhotos_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/src/views/app/pages/Nutrition/ComparePhotos.vue?vue&type=style&index=0&id=3105befc&lang=scss&scoped=true":
/*!****************************************************************************************************************************!*\
  !*** ./resources/src/views/app/pages/Nutrition/ComparePhotos.vue?vue&type=style&index=0&id=3105befc&lang=scss&scoped=true ***!
  \****************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_dist_cjs_js_node_modules_css_loader_dist_cjs_js_clonedRuleSet_12_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_12_use_2_node_modules_sass_loader_dist_cjs_js_clonedRuleSet_12_use_3_node_modules_vue_loader_lib_index_js_vue_loader_options_ComparePhotos_vue_vue_type_style_index_0_id_3105befc_lang_scss_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/style-loader/dist/cjs.js!../../../../../../node_modules/css-loader/dist/cjs.js??clonedRuleSet-12.use[1]!../../../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12.use[2]!../../../../../../node_modules/sass-loader/dist/cjs.js??clonedRuleSet-12.use[3]!../../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./ComparePhotos.vue?vue&type=style&index=0&id=3105befc&lang=scss&scoped=true */ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-12.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12.use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-12.use[3]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/Nutrition/ComparePhotos.vue?vue&type=style&index=0&id=3105befc&lang=scss&scoped=true");


/***/ }),

/***/ "./resources/src/views/app/pages/Nutrition/ComparePhotos.vue?vue&type=template&id=3105befc&scoped=true":
/*!*************************************************************************************************************!*\
  !*** ./resources/src/views/app/pages/Nutrition/ComparePhotos.vue?vue&type=template&id=3105befc&scoped=true ***!
  \*************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_ComparePhotos_vue_vue_type_template_id_3105befc_scoped_true__WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   staticRenderFns: () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_ComparePhotos_vue_vue_type_template_id_3105befc_scoped_true__WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_ComparePhotos_vue_vue_type_template_id_3105befc_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./ComparePhotos.vue?vue&type=template&id=3105befc&scoped=true */ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/Nutrition/ComparePhotos.vue?vue&type=template&id=3105befc&scoped=true");


/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/Nutrition/ComparePhotos.vue?vue&type=template&id=3105befc&scoped=true":
/*!****************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/Nutrition/ComparePhotos.vue?vue&type=template&id=3105befc&scoped=true ***!
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
  return _c("div", { staticClass: "compare-photos-page" }, [
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
                        _vm._v(
                          "\n                                Dashboard\n                            "
                        ),
                      ]),
                    ],
                    1
                  ),
                  _vm._v(" "),
                  _c(
                    "li",
                    { staticClass: "breadcrumb-item" },
                    [
                      _c("router-link", { attrs: { to: "/app/Nutrition" } }, [
                        _c("i", { staticClass: "fas fa-utensils" }),
                        _vm._v(
                          "\n                                Nutrition\n                            "
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
    _c("div", { staticClass: "photo-comparison-container" }, [
      _c("div", { staticClass: "row" }, [
        _c("div", { staticClass: "col-md-6 mb-4" }, [
          _c("div", { staticClass: "photo-area" }, [
            _vm.leftSelected
              ? _c(
                  "div",
                  {
                    staticClass:
                      "selected-meta-top text-muted small mb-1 text-center",
                  },
                  [
                    _vm._v(
                      "\n                        " +
                        _vm._s(
                          _vm.formatDate(
                            _vm.leftSelected.uploaded_at ||
                              _vm.leftSelected.created_at
                          )
                        ) +
                        "\n                    "
                    ),
                  ]
                )
              : _vm._e(),
            _vm._v(" "),
            _c(
              "div",
              {
                staticClass: "photo-frame",
                on: {
                  click: function ($event) {
                    return _vm.openPhotoPanel("left")
                  },
                },
              },
              [
                !_vm.leftPhoto
                  ? _c("div", { staticClass: "empty-photo" }, [
                      _c("i", {
                        staticClass: "fas fa-camera fa-3x text-muted",
                      }),
                      _vm._v(" "),
                      _c("p", { staticClass: "text-muted mt-3" }, [
                        _vm._v("No photo selected"),
                      ]),
                    ])
                  : _c("div", { staticClass: "selected-photo" }, [
                      _c("img", {
                        staticClass: "img-fluid",
                        attrs: { src: _vm.leftPhoto, alt: "Left Photo" },
                      }),
                    ]),
              ]
            ),
            _vm._v(" "),
            _c(
              "button",
              {
                staticClass: "btn btn-outline-primary choose-photo-btn",
                on: {
                  click: function ($event) {
                    return _vm.openPhotoPanel("left")
                  },
                },
              },
              [
                _vm._v(
                  "\n                        CHOOSE PHOTO\n                    "
                ),
              ]
            ),
          ]),
        ]),
        _vm._v(" "),
        _c("div", { staticClass: "col-md-6 mb-4" }, [
          _c("div", { staticClass: "photo-area" }, [
            _vm.rightSelected
              ? _c(
                  "div",
                  {
                    staticClass:
                      "selected-meta-top text-muted small mb-1 text-center",
                  },
                  [
                    _vm._v(
                      "\n                        " +
                        _vm._s(
                          _vm.formatDate(
                            _vm.rightSelected.uploaded_at ||
                              _vm.rightSelected.created_at
                          )
                        ) +
                        "\n                    "
                    ),
                  ]
                )
              : _vm._e(),
            _vm._v(" "),
            _c(
              "div",
              {
                staticClass: "photo-frame",
                on: {
                  click: function ($event) {
                    return _vm.openPhotoPanel("right")
                  },
                },
              },
              [
                !_vm.rightPhoto
                  ? _c("div", { staticClass: "empty-photo" }, [
                      _c("i", {
                        staticClass: "fas fa-camera fa-3x text-muted",
                      }),
                      _vm._v(" "),
                      _c("p", { staticClass: "text-muted mt-3" }, [
                        _vm._v("No photo selected"),
                      ]),
                    ])
                  : _c("div", { staticClass: "selected-photo" }, [
                      _c("img", {
                        staticClass: "img-fluid",
                        attrs: { src: _vm.rightPhoto, alt: "Right Photo" },
                      }),
                    ]),
              ]
            ),
            _vm._v(" "),
            _c(
              "button",
              {
                staticClass: "btn btn-outline-primary choose-photo-btn",
                on: {
                  click: function ($event) {
                    return _vm.openPhotoPanel("right")
                  },
                },
              },
              [
                _vm._v(
                  "\n                        CHOOSE PHOTO\n                    "
                ),
              ]
            ),
          ]),
        ]),
      ]),
    ]),
    _vm._v(" "),
    _vm.showPhotosPanel
      ? _c(
          "div",
          {
            staticClass: "photos-panel-overlay",
            on: {
              click: function ($event) {
                if ($event.target !== $event.currentTarget) {
                  return null
                }
                return _vm.closePhotoPanel.apply(null, arguments)
              },
            },
          },
          [
            _c("div", { staticClass: "photos-panel" }, [
              _c(
                "div",
                {
                  staticClass:
                    "d-flex align-items-center justify-content-between border-bottom px-3 py-2",
                },
                [
                  _c("h6", { staticClass: "mb-0 font-weight-bold" }, [
                    _vm._v("Select Photo"),
                  ]),
                  _vm._v(" "),
                  _c(
                    "button",
                    {
                      staticClass: "btn btn-sm btn-outline-secondary",
                      on: { click: _vm.closePhotoPanel },
                    },
                    [_vm._v("\n                    Close\n                ")]
                  ),
                ]
              ),
              _vm._v(" "),
              _c("div", { staticClass: "panel-body p-3" }, [
                _vm.isLoadingPhotos
                  ? _c("div", { staticClass: "text-center text-muted py-5" }, [
                      _c("i", { staticClass: "fas fa-spinner fa-spin mr-2" }),
                      _vm._v(" Loading photos...\n                "),
                    ])
                  : _c("div", [
                      _vm.groupedPanelPhotosKeys.length === 0
                        ? _c(
                            "div",
                            { staticClass: "text-center text-muted py-5" },
                            [
                              _c("i", {
                                staticClass: "far fa-images fa-2x mb-2",
                              }),
                              _vm._v(" "),
                              _c("div", [_vm._v("No photos found.")]),
                            ]
                          )
                        : _c(
                            "div",
                            _vm._l(
                              _vm.groupedPanelPhotosKeys,
                              function (dateKey) {
                                return _c(
                                  "div",
                                  { key: dateKey, staticClass: "mb-3" },
                                  [
                                    _c(
                                      "div",
                                      {
                                        staticClass:
                                          "d-flex align-items-center justify-content-between mb-2",
                                      },
                                      [
                                        _c(
                                          "span",
                                          { staticClass: "font-weight-bold" },
                                          [_vm._v(_vm._s(dateKey))]
                                        ),
                                        _vm._v(" "),
                                        _c(
                                          "small",
                                          { staticClass: "text-muted" },
                                          [
                                            _vm._v(
                                              _vm._s(
                                                _vm.groupedPanelPhotos[dateKey]
                                                  .length
                                              ) + " image(s)"
                                            ),
                                          ]
                                        ),
                                      ]
                                    ),
                                    _vm._v(" "),
                                    _c(
                                      "div",
                                      { staticClass: "row" },
                                      _vm._l(
                                        _vm.groupedPanelPhotos[dateKey],
                                        function (photo) {
                                          return _c(
                                            "div",
                                            {
                                              key: photo.id,
                                              staticClass: "col-6 mb-3",
                                              on: {
                                                click: function ($event) {
                                                  return _vm.handlePanelPhotoClick(
                                                    photo
                                                  )
                                                },
                                              },
                                            },
                                            [
                                              _c(
                                                "div",
                                                {
                                                  staticClass:
                                                    "card h-100 shadow-sm border-0 selectable",
                                                },
                                                [
                                                  _c("img", {
                                                    staticClass:
                                                      "card-img-top panel-thumb",
                                                    attrs: {
                                                      src: photo.url,
                                                      alt: photo.image_name,
                                                    },
                                                  }),
                                                  _vm._v(" "),
                                                  _c(
                                                    "div",
                                                    {
                                                      staticClass:
                                                        "card-body p-2",
                                                    },
                                                    [
                                                      _c(
                                                        "small",
                                                        {
                                                          staticClass:
                                                            "text-truncate d-block",
                                                          attrs: {
                                                            title:
                                                              photo.image_name,
                                                          },
                                                        },
                                                        [
                                                          _vm._v(
                                                            _vm._s(
                                                              photo.image_name
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
                                  ]
                                )
                              }
                            ),
                            0
                          ),
                    ]),
              ]),
            ]),
          ]
        )
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
        _c("i", { staticClass: "fas fa-images" }),
        _vm._v(
          "\n                            Compare Photos\n                        "
        ),
      ]
    )
  },
]
render._withStripped = true



/***/ })

}]);