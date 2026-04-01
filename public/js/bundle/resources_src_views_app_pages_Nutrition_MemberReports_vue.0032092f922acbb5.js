"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["resources_src_views_app_pages_Nutrition_MemberReports_vue"],{

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/Nutrition/MemberReports.vue?vue&type=script&lang=js":
/*!***********************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/Nutrition/MemberReports.vue?vue&type=script&lang=js ***!
  \***********************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
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

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  name: 'MemberReports',
  data: function data() {
    return {
      memberName: 'Loading...',
      // Default name
      memberId: null,
      notes: '',
      loading: false,
      error: null,
      sortField: 'date',
      sortDirection: 'desc',
      editingCell: null,
      // Format: 'rowId-columnKey'
      savingCell: null,
      originalCellValue: null,
      saveTimeout: null,
      showColumnDropdown: false,
      showTextModal: false,
      textModalTitle: '',
      textModalContent: '',
      columns: [
      // Important columns - visible by default
      {
        key: 'date',
        label: 'DATE',
        visible: true,
        editable: false
      }, {
        key: 'weight',
        label: 'Weight (lbs)',
        visible: true,
        editable: false
      }, {
        key: 'bodyFat',
        label: 'Body Fat',
        visible: true,
        editable: false
      }, {
        key: 'calories',
        label: 'Calories',
        visible: true,
        editable: false
      }, {
        key: 'protein',
        label: 'Protein',
        visible: true,
        editable: false
      }, {
        key: 'carb',
        label: 'Carbs',
        visible: true,
        editable: false
      }, {
        key: 'fat',
        label: 'Fat',
        visible: true,
        editable: false
      },
      // Optional columns - hidden by default, user can enable if needed
      {
        key: 'waterIntake',
        label: 'Water Intake',
        visible: false,
        editable: false
      }, {
        key: 'hunger',
        label: 'Hunger',
        visible: false,
        editable: false
      }, {
        key: 'strength',
        label: 'Strength',
        visible: false,
        editable: false
      }, {
        key: 'energy',
        label: 'Energy',
        visible: false,
        editable: false
      }, {
        key: 'centerChest',
        label: 'Center Chest',
        visible: false,
        editable: false
      }, {
        key: 'arms',
        label: 'Arms',
        visible: false,
        editable: false
      }, {
        key: 'waist',
        label: 'Waist',
        visible: false,
        editable: false
      }, {
        key: 'upperThigh',
        label: 'Upper Thigh',
        visible: false,
        editable: false
      }, {
        key: 'hips',
        label: 'Hips',
        visible: false,
        editable: false
      }, {
        key: 'mealDeviations',
        label: 'Meal Deviations',
        visible: false,
        editable: false,
        viewable: true
      }, {
        key: 'activities',
        label: 'Activities',
        visible: false,
        editable: false,
        viewable: true
      }, {
        key: 'feel',
        label: 'Feel',
        visible: false,
        editable: false,
        viewable: true
      }, {
        key: 'cardio',
        label: 'Cardio',
        visible: false,
        editable: false,
        viewable: true
      }, {
        key: 'plan',
        label: 'Plan',
        visible: false,
        editable: false
      }],
      assessments: []
    };
  },
  mounted: function mounted() {
    this.initializeMember();
    // Close dropdown when clicking outside
    document.addEventListener('click', this.handleClickOutside);
  },
  beforeDestroy: function beforeDestroy() {
    document.removeEventListener('click', this.handleClickOutside);
  },
  watch: {
    '$route.params.memberId': {
      handler: function handler(newMemberId) {
        if (newMemberId) {
          this.memberId = newMemberId;
          this.fetchMemberData();
        }
      },
      immediate: true
    }
  },
  computed: {
    visibleColumns: function visibleColumns() {
      return this.columns.filter(function (column) {
        return column.visible;
      });
    },
    sortedAssessments: function sortedAssessments() {
      var _this = this;
      return _toConsumableArray(this.assessments).sort(function (a, b) {
        var aVal = a[_this.sortField];
        var bVal = b[_this.sortField];
        if (aVal === null || aVal === '') aVal = '';
        if (bVal === null || bVal === '') bVal = '';
        if (_this.sortField === 'date') {
          aVal = new Date(aVal);
          bVal = new Date(bVal);
        }
        if (_this.sortDirection === 'asc') {
          return aVal > bVal ? 1 : -1;
        } else {
          return aVal < bVal ? 1 : -1;
        }
      });
    }
  },
  methods: {
    updateNotes: function updateNotes() {
      var _this2 = this;
      return _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
        var response, _error$response, errorMessage;
        return _regeneratorRuntime().wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              if (_this2.memberId) {
                _context.next = 3;
                break;
              }
              alert('Member ID is missing');
              return _context.abrupt("return");
            case 3:
              _context.prev = 3;
              _context.next = 6;
              return axios.put("/assigned-meals-members/member/".concat(_this2.memberId, "/notes"), {
                notes: _this2.notes
              });
            case 6:
              response = _context.sent;
              if (!response.data.success) {
                _context.next = 11;
                break;
              }
              _this2.showSuccessMessage('Notes updated successfully!');
              _context.next = 12;
              break;
            case 11:
              throw new Error(response.data.message || 'Failed to update notes');
            case 12:
              _context.next = 19;
              break;
            case 14:
              _context.prev = 14;
              _context.t0 = _context["catch"](3);
              console.error('Error updating notes:', _context.t0);
              errorMessage = ((_error$response = _context.t0.response) === null || _error$response === void 0 || (_error$response = _error$response.data) === null || _error$response === void 0 ? void 0 : _error$response.message) || _context.t0.message || 'Failed to update notes';
              alert('Error updating notes: ' + errorMessage);
            case 19:
            case "end":
              return _context.stop();
          }
        }, _callee, null, [[3, 14]]);
      }))();
    },
    toggleColumn: function toggleColumn(columnKey) {
      // Column visibility is already handled by v-model
      // Force reactivity update
      this.$forceUpdate();
    },
    toggleColumnDropdown: function toggleColumnDropdown() {
      this.showColumnDropdown = !this.showColumnDropdown;
    },
    handleClickOutside: function handleClickOutside(event) {
      var dropdown = this.$el.querySelector('.dropdown');
      if (dropdown && !dropdown.contains(event.target)) {
        this.showColumnDropdown = false;
      }
    },
    showFullText: function showFullText(title, content) {
      this.textModalTitle = title;
      this.textModalContent = content || 'No content available';
      this.showTextModal = true;
    },
    closeTextModal: function closeTextModal() {
      this.showTextModal = false;
      this.textModalTitle = '';
      this.textModalContent = '';
    },
    truncateText: function truncateText(text, maxLength) {
      if (!text) return 'N/A';
      if (text.length <= maxLength) return text;
      return text.substring(0, maxLength) + '...';
    },
    sortBy: function sortBy(field) {
      if (this.sortField === field) {
        this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
      } else {
        this.sortField = field;
        this.sortDirection = 'asc';
      }
    },
    formatDate: function formatDate(dateString) {
      return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
      });
    },
    goBack: function goBack() {
      this.$router.go(-1);
    },
    navigateToComparePhotos: function navigateToComparePhotos() {
      this.$router.push({
        name: 'ComparePhotos'
      })["catch"](function (err) {
        console.log('Navigation completed');
      });
    },
    initializeMember: function initializeMember() {
      // Get member ID from route params
      this.memberId = this.$route.params.memberId;
      if (this.memberId) {
        this.fetchMemberData();
      }
    },
    fetchMemberData: function fetchMemberData() {
      var _this3 = this;
      return _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee2() {
        var response, _response$data$member, rawAssessments, assessmentsByDate, notesResponse, _error$response2;
        return _regeneratorRuntime().wrap(function _callee2$(_context2) {
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
              if (_this3.memberId) {
                _context2.next = 2;
                break;
              }
              return _context2.abrupt("return");
            case 2:
              _this3.loading = true;
              _this3.error = null;
              _context2.prev = 4;
              _context2.next = 7;
              return axios.get("/assigned-meals-members/member/".concat(_this3.memberId, "/assessments"));
            case 7:
              response = _context2.sent;
              if (!response.data.success) {
                _context2.next = 27;
                break;
              }
              // Normalize and ensure data types are correct
              rawAssessments = response.data.data || []; // Group assessments by date to prevent duplicates
              // If multiple assessments exist for the same date, keep the most recent one (by ID or updated_at)
              assessmentsByDate = new Map();
              rawAssessments.forEach(function (assessment) {
                var normalizedAssessment = {
                  id: assessment.id,
                  date: assessment.date,
                  weight: assessment.weight !== null && assessment.weight !== undefined ? parseFloat(assessment.weight) : null,
                  bodyFat: assessment.bodyFat !== null && assessment.bodyFat !== undefined ? parseFloat(assessment.bodyFat) : null,
                  waterIntake: assessment.waterIntake !== null && assessment.waterIntake !== undefined ? parseFloat(assessment.waterIntake) : null,
                  hunger: assessment.hunger !== null && assessment.hunger !== undefined ? parseInt(assessment.hunger) : null,
                  strength: assessment.strength !== null && assessment.strength !== undefined ? parseInt(assessment.strength) : null,
                  energy: assessment.energy !== null && assessment.energy !== undefined ? parseInt(assessment.energy) : null,
                  centerChest: assessment.centerChest !== null && assessment.centerChest !== undefined ? parseFloat(assessment.centerChest) : null,
                  arms: assessment.arms !== null && assessment.arms !== undefined ? parseFloat(assessment.arms) : null,
                  waist: assessment.waist !== null && assessment.waist !== undefined ? parseFloat(assessment.waist) : null,
                  upperThigh: assessment.upperThigh !== null && assessment.upperThigh !== undefined ? parseFloat(assessment.upperThigh) : null,
                  hips: assessment.hips !== null && assessment.hips !== undefined ? parseFloat(assessment.hips) : null,
                  mealDeviations: assessment.mealDeviations || null,
                  activities: assessment.activities || null,
                  feel: assessment.feel || null,
                  cardio: assessment.cardio || null,
                  plan: assessment.plan || null,
                  calories: assessment.calories !== null && assessment.calories !== undefined ? parseInt(assessment.calories) : null,
                  protein: assessment.protein !== null && assessment.protein !== undefined ? parseFloat(assessment.protein) : null,
                  carb: assessment.carb !== null && assessment.carb !== undefined ? parseFloat(assessment.carb) : null,
                  fat: assessment.fat !== null && assessment.fat !== undefined ? parseFloat(assessment.fat) : null,
                  updated_at: assessment.updated_at || null
                };
                var dateKey = normalizedAssessment.date;
                if (!assessmentsByDate.has(dateKey)) {
                  // First assessment for this date - add it
                  assessmentsByDate.set(dateKey, normalizedAssessment);
                } else {
                  // Multiple assessments for the same date - keep the most recent one
                  var existingAssessment = assessmentsByDate.get(dateKey);

                  // Compare by updated_at if available, otherwise by ID (higher ID = more recent)
                  var isNewer = normalizedAssessment.updated_at && existingAssessment.updated_at ? new Date(normalizedAssessment.updated_at) > new Date(existingAssessment.updated_at) : normalizedAssessment.id > existingAssessment.id;
                  if (isNewer) {
                    // Update with newer assessment data
                    assessmentsByDate.set(dateKey, normalizedAssessment);
                  } else {
                    // Merge non-null values from newer assessment into existing one
                    // This ensures we don't lose data when updating
                    Object.keys(normalizedAssessment).forEach(function (key) {
                      if (normalizedAssessment[key] !== null && normalizedAssessment[key] !== undefined && normalizedAssessment[key] !== '') {
                        if (existingAssessment[key] === null || existingAssessment[key] === undefined || existingAssessment[key] === '') {
                          existingAssessment[key] = normalizedAssessment[key];
                        }
                      }
                    });
                  }
                }
              });

              // Convert Map to array and sort by date descending
              _this3.assessments = Array.from(assessmentsByDate.values()).sort(function (a, b) {
                var dateA = new Date(a.date);
                var dateB = new Date(b.date);
                return dateB - dateA; // Most recent first
              });
              _this3.memberName = ((_response$data$member = response.data.member) === null || _response$data$member === void 0 ? void 0 : _response$data$member.name) || 'Unknown Member';

              // Fetch member notes if available
              _context2.prev = 14;
              _context2.next = 17;
              return axios.get("/assigned-meals-members/member/".concat(_this3.memberId, "/notes"));
            case 17:
              notesResponse = _context2.sent;
              if (notesResponse.data.success && notesResponse.data.data) {
                // Handle both empty string and null notes
                _this3.notes = notesResponse.data.data.notes || '';
              }
              _context2.next = 25;
              break;
            case 21:
              _context2.prev = 21;
              _context2.t0 = _context2["catch"](14);
              console.warn('Could not fetch notes:', _context2.t0);
              // Set empty string on error to ensure notes field is initialized
              _this3.notes = '';
            case 25:
              _context2.next = 28;
              break;
            case 27:
              _this3.error = response.data.message || 'Failed to fetch assessments';
            case 28:
              _context2.next = 35;
              break;
            case 30:
              _context2.prev = 30;
              _context2.t1 = _context2["catch"](4);
              console.error('Error fetching member data:', _context2.t1);
              _this3.error = ((_error$response2 = _context2.t1.response) === null || _error$response2 === void 0 || (_error$response2 = _error$response2.data) === null || _error$response2 === void 0 ? void 0 : _error$response2.message) || _context2.t1.message || 'Failed to fetch member assessments';
              _this3.memberName = 'Error Loading Member';
            case 35:
              _context2.prev = 35;
              _this3.loading = false;
              return _context2.finish(35);
            case 38:
            case "end":
              return _context2.stop();
          }
        }, _callee2, null, [[4, 30, 35, 38], [14, 21]]);
      }))();
    },
    isEditingCell: function isEditingCell(rowId, columnKey) {
      return this.editingCell === "".concat(rowId, "-").concat(columnKey);
    },
    isSavingCell: function isSavingCell(rowId, columnKey) {
      return this.savingCell === "".concat(rowId, "-").concat(columnKey);
    },
    startEditCell: function startEditCell(assessment, column) {
      var _this4 = this;
      if (!column.editable || !assessment.id) return;
      var cellKey = "".concat(assessment.id, "-").concat(column.key);
      this.editingCell = cellKey;
      this.originalCellValue = assessment[column.key];

      // Focus the input after it's rendered
      this.$nextTick(function () {
        var inputs = _this4.$refs.cellInput;
        if (inputs && inputs.length > 0) {
          var input = Array.isArray(inputs) ? inputs[inputs.length - 1] : inputs;
          if (input && input.focus) {
            input.focus();
            input.select();
          }
        }
      });
    },
    cancelEditCell: function cancelEditCell(assessment, columnKey) {
      if (this.originalCellValue !== null) {
        assessment[columnKey] = this.originalCellValue;
      }
      this.editingCell = null;
      this.originalCellValue = null;
    },
    saveCell: function saveCell(assessment, columnKey) {
      var _this5 = this;
      return _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee3() {
        var newValue, numericFields, parsed, originalValue, _parsed, valuesEqual, cellKey, updateData, response, updatedData, _error$response3, errorMessage;
        return _regeneratorRuntime().wrap(function _callee3$(_context3) {
          while (1) switch (_context3.prev = _context3.next) {
            case 0:
              if (assessment.id) {
                _context3.next = 3;
                break;
              }
              console.error('Cannot save: Assessment ID is missing');
              return _context3.abrupt("return");
            case 3:
              if (columnKey) {
                _context3.next = 6;
                break;
              }
              console.error('Cannot save: Column key is missing');
              return _context3.abrupt("return");
            case 6:
              // Get the current value and normalize it
              newValue = assessment[columnKey]; // Convert empty string to null for consistency
              if (newValue === '' || newValue === undefined) {
                newValue = null;
              }

              // Convert numeric strings to numbers for numeric fields
              numericFields = ['weight', 'bodyFat', 'waterIntake', 'hunger', 'strength', 'energy', 'calories', 'protein', 'carb', 'fat', 'centerChest', 'arms', 'waist', 'upperThigh', 'hips'];
              if (numericFields.includes(columnKey) && newValue !== null && newValue !== '') {
                parsed = columnKey === 'hunger' || columnKey === 'strength' || columnKey === 'energy' || columnKey === 'calories' ? parseInt(newValue) : parseFloat(newValue);
                if (!isNaN(parsed)) {
                  newValue = parsed;
                } else {
                  newValue = null;
                }
              }

              // Check if value actually changed (normalize original value too)
              originalValue = _this5.originalCellValue;
              if (originalValue === '' || originalValue === undefined) {
                originalValue = null;
              }
              if (numericFields.includes(columnKey) && originalValue !== null && originalValue !== '') {
                _parsed = columnKey === 'hunger' || columnKey === 'strength' || columnKey === 'energy' || columnKey === 'calories' ? parseInt(originalValue) : parseFloat(originalValue);
                if (!isNaN(_parsed)) {
                  originalValue = _parsed;
                } else {
                  originalValue = null;
                }
              }

              // Compare values (handle null and number comparisons)
              valuesEqual = newValue === null && originalValue === null || newValue === originalValue || newValue !== null && originalValue !== null && parseFloat(newValue) === parseFloat(originalValue);
              if (!valuesEqual) {
                _context3.next = 18;
                break;
              }
              _this5.editingCell = null;
              _this5.originalCellValue = null;
              return _context3.abrupt("return");
            case 18:
              cellKey = "".concat(assessment.id, "-").concat(columnKey);
              _this5.savingCell = cellKey;

              // Clear any existing timeout
              if (_this5.saveTimeout) {
                clearTimeout(_this5.saveTimeout);
              }
              _context3.prev = 21;
              // Prepare update data with only the changed field
              updateData = {}; // Use the frontend field name - the controller handles the mapping
              // Send null explicitly if value is null (to allow clearing fields)
              updateData[columnKey] = newValue;
              _context3.next = 26;
              return axios.put("/assigned-meals-members/".concat(assessment.id), updateData);
            case 26:
              response = _context3.sent;
              if (!response.data.success) {
                _context3.next = 34;
                break;
              }
              // Update local data with response to ensure consistency
              updatedData = response.data.data; // Map backend response back to frontend format
              // Backend returns: body, water, carbs, fat_macros
              // Frontend expects: bodyFat, waterIntake, carb, fat
              if (updatedData) {
                // Update all fields from backend response to ensure consistency
                // Normalize data types to match frontend expectations
                if (updatedData.body !== undefined) {
                  assessment.bodyFat = updatedData.body !== null ? parseFloat(updatedData.body) : null;
                }
                if (updatedData.water !== undefined) {
                  assessment.waterIntake = updatedData.water !== null ? parseFloat(updatedData.water) : null;
                }
                if (updatedData.carbs !== undefined) {
                  assessment.carb = updatedData.carbs !== null ? parseFloat(updatedData.carbs) : null;
                }
                if (updatedData.fat_macros !== undefined) {
                  assessment.fat = updatedData.fat_macros !== null ? parseFloat(updatedData.fat_macros) : null;
                }
                if (updatedData.weight !== undefined) {
                  assessment.weight = updatedData.weight !== null ? parseFloat(updatedData.weight) : null;
                }
                if (updatedData.hunger !== undefined) {
                  assessment.hunger = updatedData.hunger !== null ? parseInt(updatedData.hunger) : null;
                }
                if (updatedData.strength !== undefined) {
                  assessment.strength = updatedData.strength !== null ? parseInt(updatedData.strength) : null;
                }
                if (updatedData.energy !== undefined) {
                  assessment.energy = updatedData.energy !== null ? parseInt(updatedData.energy) : null;
                }
                if (updatedData.cardio !== undefined) {
                  assessment.cardio = updatedData.cardio;
                }
                if (updatedData.plan !== undefined) {
                  assessment.plan = updatedData.plan;
                }
                if (updatedData.calories !== undefined) {
                  assessment.calories = updatedData.calories !== null ? parseInt(updatedData.calories) : null;
                }
                if (updatedData.protein !== undefined) {
                  assessment.protein = updatedData.protein !== null ? parseFloat(updatedData.protein) : null;
                }
                if (updatedData.centerChest !== undefined) {
                  assessment.centerChest = updatedData.centerChest !== null ? parseFloat(updatedData.centerChest) : null;
                }
                if (updatedData.arms !== undefined) {
                  assessment.arms = updatedData.arms !== null ? parseFloat(updatedData.arms) : null;
                }
                if (updatedData.waist !== undefined) {
                  assessment.waist = updatedData.waist !== null ? parseFloat(updatedData.waist) : null;
                }
                if (updatedData.upperThigh !== undefined) {
                  assessment.upperThigh = updatedData.upperThigh !== null ? parseFloat(updatedData.upperThigh) : null;
                }
                if (updatedData.hips !== undefined) {
                  assessment.hips = updatedData.hips !== null ? parseFloat(updatedData.hips) : null;
                }
                if (updatedData.mealDeviations !== undefined) {
                  assessment.mealDeviations = updatedData.mealDeviations;
                }
                if (updatedData.activities !== undefined) {
                  assessment.activities = updatedData.activities;
                }
                if (updatedData.feel !== undefined) {
                  assessment.feel = updatedData.feel;
                }
              } else {
                // Fallback: use the normalized value we just set
                assessment[columnKey] = newValue;
              }
              _this5.editingCell = null;
              _this5.originalCellValue = null;
              _context3.next = 35;
              break;
            case 34:
              throw new Error(response.data.message || 'Failed to update cell');
            case 35:
              _context3.next = 43;
              break;
            case 37:
              _context3.prev = 37;
              _context3.t0 = _context3["catch"](21);
              console.error('Error saving cell:', _context3.t0);

              // Restore original value on error
              assessment[columnKey] = _this5.originalCellValue;
              errorMessage = ((_error$response3 = _context3.t0.response) === null || _error$response3 === void 0 || (_error$response3 = _error$response3.data) === null || _error$response3 === void 0 ? void 0 : _error$response3.message) || _context3.t0.message || 'Failed to save';
              alert("Error saving ".concat(columnKey, ": ").concat(errorMessage));
            case 43:
              _context3.prev = 43;
              _this5.savingCell = null;
              return _context3.finish(43);
            case 46:
            case "end":
              return _context3.stop();
          }
        }, _callee3, null, [[21, 37, 43, 46]]);
      }))();
    },
    formatCellValue: function formatCellValue(value, columnKey) {
      if (value === null || value === undefined || value === '') {
        return 'N/A';
      }

      // Format numeric values appropriately
      if (columnKey === 'weight' || columnKey === 'bodyFat' || columnKey === 'centerChest' || columnKey === 'arms' || columnKey === 'waist' || columnKey === 'upperThigh' || columnKey === 'hips') {
        return parseFloat(value).toFixed(1);
      }
      if (columnKey === 'waterIntake' || columnKey === 'calories' || columnKey === 'protein' || columnKey === 'carb' || columnKey === 'fat' || columnKey === 'hunger' || columnKey === 'strength' || columnKey === 'energy') {
        return value;
      }
      return value;
    },
    showSuccessMessage: function showSuccessMessage(message) {
      // Create a temporary success message element
      var successDiv = document.createElement("div");
      successDiv.className = "success-message";
      successDiv.textContent = message;
      successDiv.style.cssText = "\n                position: fixed;\n                top: 20px;\n                right: 20px;\n                background: #28a745;\n                color: white;\n                padding: 1rem 1.5rem;\n                border-radius: 8px;\n                box-shadow: 0 4px 12px rgba(0,0,0,0.15);\n                z-index: 10000;\n                font-weight: 600;\n                animation: slideInRight 0.3s ease;\n            ";
      document.body.appendChild(successDiv);

      // Remove after 3 seconds
      setTimeout(function () {
        if (successDiv.parentNode) {
          successDiv.parentNode.removeChild(successDiv);
        }
      }, 3000);
    },
    exportCurrentView: function exportCurrentView() {
      var _this6 = this;
      // Export only the currently visible columns
      var visibleData = this.sortedAssessments.map(function (assessment) {
        var row = {};
        _this6.visibleColumns.forEach(function (column) {
          if (column.key === 'date') {
            row[column.label] = _this6.formatDate(assessment[column.key]);
          } else {
            row[column.label] = assessment[column.key] !== null && assessment[column.key] !== '' ? assessment[column.key] : 'N/A';
          }
        });
        return row;
      });
      this.downloadCSV(visibleData, "".concat(this.memberName, "_Current_View_").concat(this.getCurrentDateString(), ".csv"));
    },
    exportAllColumns: function exportAllColumns() {
      var _this7 = this;
      // Export all columns regardless of visibility
      var allData = this.sortedAssessments.map(function (assessment) {
        var row = {};
        _this7.columns.forEach(function (column) {
          if (column.key === 'date') {
            row[column.label] = _this7.formatDate(assessment[column.key]);
          } else {
            row[column.label] = assessment[column.key] !== null && assessment[column.key] !== '' ? assessment[column.key] : 'N/A';
          }
        });
        return row;
      });
      this.downloadCSV(allData, "".concat(this.memberName, "_All_Columns_").concat(this.getCurrentDateString(), ".csv"));
    },
    downloadCSV: function downloadCSV(data, filename) {
      if (!data || data.length === 0) {
        alert('No data to export');
        return;
      }

      // Get headers from the first row
      var headers = Object.keys(data[0]);

      // Create CSV content
      var csvContent = [headers.join(',')].concat(_toConsumableArray(data.map(function (row) {
        return headers.map(function (header) {
          var value = row[header];
          // Escape commas and quotes in values
          if (typeof value === 'string' && (value.includes(',') || value.includes('"') || value.includes('\n'))) {
            return "\"".concat(value.replace(/"/g, '""'), "\"");
          }
          return value;
        }).join(',');
      }))).join('\n');

      // Create and download file
      var blob = new Blob([csvContent], {
        type: 'text/csv;charset=utf-8;'
      });
      var link = document.createElement('a');
      if (link.download !== undefined) {
        var url = URL.createObjectURL(blob);
        link.setAttribute('href', url);
        link.setAttribute('download', filename);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
      } else {
        // Fallback for older browsers
        alert('CSV export not supported in this browser');
      }
    },
    getCurrentDateString: function getCurrentDateString() {
      var now = new Date();
      return now.toISOString().split('T')[0]; // YYYY-MM-DD format
    }
  }
});

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js??clonedRuleSet-12.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12.use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-12.use[3]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/Nutrition/MemberReports.vue?vue&type=style&index=0&id=477715fe&lang=scss&scoped=true":
/*!**************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??clonedRuleSet-12.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12.use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-12.use[3]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/Nutrition/MemberReports.vue?vue&type=style&index=0&id=477715fe&lang=scss&scoped=true ***!
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
___CSS_LOADER_EXPORT___.push([module.id, "@charset \"UTF-8\";\n.filter-btn .btn[data-v-477715fe],\n.filter-btn .btn-secondary[data-v-477715fe],\n.filter-btn .btn-outline-secondary[data-v-477715fe],\n.filter-btn button.btn[data-v-477715fe],\n.filter-btn button.btn-secondary[data-v-477715fe] {\n  color: #000 !important;\n  background-color: transparent !important;\n  border-color: #6c757d !important;\n}\n.filter-btn .btn[data-v-477715fe]:hover,\n.filter-btn .btn-secondary[data-v-477715fe]:hover,\n.filter-btn .btn-outline-secondary[data-v-477715fe]:hover,\n.filter-btn button.btn[data-v-477715fe]:hover,\n.filter-btn button.btn-secondary[data-v-477715fe]:hover {\n  color: #dc3545 !important;\n  background-color: transparent !important;\n  border-color: #dc3545 !important;\n  box-shadow: none !important;\n}\n.filter-btn .btn[data-v-477715fe]:focus,\n.filter-btn .btn-secondary[data-v-477715fe]:focus,\n.filter-btn .btn-outline-secondary[data-v-477715fe]:focus,\n.filter-btn button.btn[data-v-477715fe]:focus,\n.filter-btn button.btn-secondary[data-v-477715fe]:focus {\n  color: #dc3545 !important;\n  background-color: transparent !important;\n  border-color: #dc3545 !important;\n  box-shadow: none !important;\n}\n.filter-btn .btn[data-v-477715fe]:active,\n.filter-btn .btn-secondary[data-v-477715fe]:active,\n.filter-btn .btn-outline-secondary[data-v-477715fe]:active,\n.filter-btn button.btn[data-v-477715fe]:active,\n.filter-btn button.btn-secondary[data-v-477715fe]:active {\n  color: #dc3545 !important;\n  background-color: transparent !important;\n  border-color: #dc3545 !important;\n}\n.btn-secondary[data-v-477715fe]:not(:disabled):not(.disabled):active:focus {\n  box-shadow: none !important;\n}\n\n/* ===========================================\n   COMMON BREADCRUMB NAVIGATION STYLES\n   =========================================== */\n.breadcrumb-nav-row[data-v-477715fe] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  margin-bottom: 0.5rem;\n  gap: 0.5rem;\n}\n.breadcrumb-section[data-v-477715fe] {\n  flex: 1;\n}\n.breadcrumb-section .breadcrumb-nav .breadcrumb-container[data-v-477715fe] {\n  display: flex;\n  align-items: center;\n  gap: 1rem;\n}\n.breadcrumb-section .breadcrumb-nav .breadcrumb-container .back-button[data-v-477715fe] {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  width: 40px;\n  height: 40px;\n  background: rgba(255, 255, 255, 0.1);\n  border: 1px solid rgba(255, 255, 255, 0.2);\n  border-radius: 8px;\n  color: #ffffff;\n  cursor: pointer;\n  transition: all 0.3s ease;\n}\n.breadcrumb-section .breadcrumb-nav .breadcrumb-container .back-button[data-v-477715fe]:hover {\n  background: rgba(255, 255, 255, 0.15);\n  border-color: rgba(255, 255, 255, 0.3);\n  transform: translateY(-1px);\n  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);\n  color: #dc3545;\n}\n.breadcrumb-section .breadcrumb-nav .breadcrumb-container .back-button i[data-v-477715fe] {\n  font-size: 1.1em;\n}\n.breadcrumb-section .breadcrumb-nav .breadcrumb-container .breadcrumb[data-v-477715fe] {\n  display: flex;\n  align-items: center;\n  gap: 0.5rem;\n  margin: 0;\n  padding: 0;\n  background: none;\n  border-radius: 0;\n}\n.breadcrumb-section .breadcrumb-nav .breadcrumb-container .breadcrumb .breadcrumb-item[data-v-477715fe] {\n  display: flex;\n  align-items: center;\n  gap: 0.5rem;\n  font-size: 0.875rem;\n  color: #ffffff;\n}\n.breadcrumb-section .breadcrumb-nav .breadcrumb-container .breadcrumb .breadcrumb-item.active[data-v-477715fe] {\n  color: #252525;\n  font-weight: 600;\n}\n.breadcrumb-section .breadcrumb-nav .breadcrumb-container .breadcrumb .breadcrumb-item.active i[data-v-477715fe] {\n  color: #dc3545;\n}\n.breadcrumb-section .breadcrumb-nav .breadcrumb-container .breadcrumb .breadcrumb-item a[data-v-477715fe] {\n  display: flex;\n  align-items: center;\n  gap: 0.5rem;\n  color: #6a6a6a;\n  text-decoration: none;\n  transition: color 0.3s ease;\n}\n.breadcrumb-section .breadcrumb-nav .breadcrumb-container .breadcrumb .breadcrumb-item a[data-v-477715fe]:hover {\n  color: #dc3545;\n}\n.breadcrumb-section .breadcrumb-nav .breadcrumb-container .breadcrumb .breadcrumb-item a:hover i[data-v-477715fe] {\n  color: #dc3545;\n}\n.breadcrumb-section .breadcrumb-nav .breadcrumb-container .breadcrumb .breadcrumb-item a i[data-v-477715fe] {\n  font-size: 0.9em;\n  transition: color 0.3s ease;\n}\n.breadcrumb-section .breadcrumb-nav .breadcrumb-container .breadcrumb .breadcrumb-item[data-v-477715fe]:not(:last-child)::after {\n  content: \"›\";\n  margin-left: 0.5rem;\n  color: #6a6a6a;\n  font-size: 1.2em;\n}\n.action-section[data-v-477715fe] {\n  display: flex;\n  align-items: center;\n}\n.action-section .action-btn[data-v-477715fe] {\n  display: flex;\n  align-items: center;\n  gap: 0.5rem;\n  padding: 0.5rem 1rem;\n  border-radius: 8px;\n  font-size: 0.875rem;\n  font-weight: 500;\n  transition: all 0.3s ease;\n}\n.action-section .action-btn[data-v-477715fe]:hover:not(:disabled) {\n  transform: translateY(-1px);\n  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);\n}\n.action-section .action-btn[data-v-477715fe]:disabled {\n  opacity: 0.6;\n  cursor: not-allowed;\n}\n.action-section .action-btn i[data-v-477715fe] {\n  font-size: 0.9em;\n}\n@media (max-width: 768px) {\n.breadcrumb-nav-row[data-v-477715fe] {\n    flex-direction: column;\n    align-items: flex-start;\n    gap: 0.5rem;\n}\n.breadcrumb-section[data-v-477715fe] {\n    width: 100%;\n}\n.breadcrumb-section .breadcrumb-container[data-v-477715fe] {\n    flex-direction: column;\n    align-items: flex-start;\n    gap: 0.5rem;\n}\n.breadcrumb-section .breadcrumb-container .breadcrumb[data-v-477715fe] {\n    flex-wrap: wrap;\n}\n.breadcrumb-section .breadcrumb-container .breadcrumb .breadcrumb-item[data-v-477715fe] {\n    font-size: 0.8rem;\n}\n.breadcrumb-section .breadcrumb-container .breadcrumb .breadcrumb-item a[data-v-477715fe] {\n    font-size: 0.8rem;\n}\n.action-section[data-v-477715fe] {\n    width: 100%;\n    justify-content: flex-end;\n}\n.action-section .action-btn[data-v-477715fe] {\n    font-size: 0.8rem;\n    padding: 0.4rem 0.8rem;\n}\n}\n/* ===========================================\n   RESPONSIVE UTILITY CLASSES (ALL DEVICES)\n   =========================================== */\n.show-xs-only[data-v-477715fe],\n.show-sm-only[data-v-477715fe],\n.show-md-only[data-v-477715fe],\n.show-lg-only[data-v-477715fe],\n.show-xl-only[data-v-477715fe] {\n  display: none !important;\n}\n@media (max-width: 575px) {\n.hide-xs[data-v-477715fe] {\n    display: none !important;\n}\n.show-xs-only[data-v-477715fe] {\n    display: initial !important;\n}\n}\n@media (min-width: 576px) and (max-width: 767px) {\n.hide-sm[data-v-477715fe] {\n    display: none !important;\n}\n.show-sm-only[data-v-477715fe] {\n    display: initial !important;\n}\n}\n@media (min-width: 768px) and (max-width: 991px) {\n.hide-md[data-v-477715fe] {\n    display: none !important;\n}\n.show-md-only[data-v-477715fe] {\n    display: initial !important;\n}\n}\n@media (min-width: 992px) and (max-width: 1199px) {\n.hide-lg[data-v-477715fe] {\n    display: none !important;\n}\n.show-lg-only[data-v-477715fe] {\n    display: initial !important;\n}\n}\n@media (min-width: 1200px) {\n.hide-xl[data-v-477715fe] {\n    display: none !important;\n}\n.show-xl-only[data-v-477715fe] {\n    display: initial !important;\n}\n}\n@media (max-width: 576px) {\n.hide-sm-down[data-v-477715fe] {\n    display: none !important;\n}\n}\n@media (max-width: 768px) {\n.hide-md-down[data-v-477715fe] {\n    display: none !important;\n}\n}\n@media (max-width: 992px) {\n.hide-lg-down[data-v-477715fe] {\n    display: none !important;\n}\n}\n@media (min-width: 576px) {\n.hide-sm-up[data-v-477715fe] {\n    display: none !important;\n}\n}\n@media (min-width: 768px) {\n.hide-md-up[data-v-477715fe] {\n    display: none !important;\n}\n}\n@media (min-width: 992px) {\n.hide-lg-up[data-v-477715fe] {\n    display: none !important;\n}\n}\n@media (max-width: 575px) {\n.d-xs-none[data-v-477715fe] {\n    display: none !important;\n}\n.d-xs-block[data-v-477715fe] {\n    display: block !important;\n}\n.d-xs-flex[data-v-477715fe] {\n    display: flex !important;\n}\n}\n@media (min-width: 576px) and (max-width: 767px) {\n.d-sm-none[data-v-477715fe] {\n    display: none !important;\n}\n.d-sm-block[data-v-477715fe] {\n    display: block !important;\n}\n.d-sm-flex[data-v-477715fe] {\n    display: flex !important;\n}\n}\n@media (min-width: 768px) and (max-width: 991px) {\n.d-md-none[data-v-477715fe] {\n    display: none !important;\n}\n.d-md-block[data-v-477715fe] {\n    display: block !important;\n}\n.d-md-flex[data-v-477715fe] {\n    display: flex !important;\n}\n}\n@media (min-width: 992px) and (max-width: 1199px) {\n.d-lg-none[data-v-477715fe] {\n    display: none !important;\n}\n.d-lg-block[data-v-477715fe] {\n    display: block !important;\n}\n.d-lg-flex[data-v-477715fe] {\n    display: flex !important;\n}\n}\n@media (min-width: 1200px) {\n.d-xl-none[data-v-477715fe] {\n    display: none !important;\n}\n.d-xl-block[data-v-477715fe] {\n    display: block !important;\n}\n.d-xl-flex[data-v-477715fe] {\n    display: flex !important;\n}\n}\n@media (min-width: 576px) {\n.custom-modal-xl[data-v-477715fe] {\n    max-width: 1500px !important;\n}\n}\n.self-assessments-page[data-v-477715fe] {\n  padding: 20px;\n  min-height: 100vh;\n}\n.page-title[data-v-477715fe] {\n  color: #252525;\n  font-size: 1.5rem;\n  font-weight: 600;\n  margin: 0;\n}\n.btn-teal[data-v-477715fe] {\n  background-color: #dc3545;\n  border-color: #dc3545;\n  color: white;\n  font-weight: 600;\n  padding: 7px 16px;\n  border-radius: 20px;\n  font-size: 0.875rem;\n  transition: all 0.2s ease;\n  display: inline-flex;\n  align-items: center;\n  box-shadow: 0 2px 4px rgba(220, 53, 69, 0.2);\n}\n.btn-teal[data-v-477715fe]:hover {\n  background-color: #c82333;\n  border-color: #bd2130;\n  color: white;\n  box-shadow: 0 3px 8px rgba(220, 53, 69, 0.3);\n  transform: translateY(-1px);\n}\n.btn-teal[data-v-477715fe]:active {\n  transform: translateY(0);\n  box-shadow: 0 1px 3px rgba(220, 53, 69, 0.3);\n}\n.btn-teal i[data-v-477715fe] {\n  margin-right: 0;\n  font-size: 0.875rem;\n}\n.btn-teal[data-v-477715fe]:hover {\n  background-color: #dc3545;\n  border-color: #dc3545;\n  color: white;\n}\n.btn-teal[data-v-477715fe]:focus {\n  box-shadow: 0 0 0 0.2rem rgba(220, 53, 69, 0.25);\n}\n.notes-section[data-v-477715fe] {\n  background: white;\n  padding: 1rem 1.25rem;\n  border-radius: 6px;\n  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);\n  border: 1px solid #e9ecef;\n}\n.notes-container[data-v-477715fe] {\n  display: flex;\n  flex-direction: column;\n  gap: 0.5rem;\n}\n.notes-label[data-v-477715fe] {\n  font-size: 0.875rem;\n  font-weight: 600;\n  color: #495057;\n  margin: 0;\n}\n.notes-input-wrapper[data-v-477715fe] {\n  display: flex;\n  gap: 0.75rem;\n  align-items: flex-start;\n}\n.notes-textarea[data-v-477715fe] {\n  flex: 1;\n  border: 1px solid #dee2e6;\n  border-radius: 4px;\n  resize: vertical;\n  font-family: inherit;\n  font-size: 0.875rem;\n  padding: 0.5rem 0.75rem;\n  line-height: 1.5;\n  min-height: 60px;\n  max-height: 120px;\n}\n.notes-textarea[data-v-477715fe]:focus {\n  outline: none;\n  border-color: #dc3545;\n  box-shadow: 0 0 0 2px rgba(220, 53, 69, 0.1);\n}\n.notes-textarea[data-v-477715fe]::-moz-placeholder {\n  color: #adb5bd;\n  font-style: italic;\n}\n.notes-textarea[data-v-477715fe]::placeholder {\n  color: #adb5bd;\n  font-style: italic;\n}\n.btn-update-notes[data-v-477715fe] {\n  align-self: flex-end;\n  white-space: nowrap;\n}\n.table-section[data-v-477715fe] {\n  background: white;\n  border-radius: 8px;\n  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);\n}\n.assessment-table[data-v-477715fe] {\n  margin-bottom: 0;\n}\n.assessment-table thead th[data-v-477715fe] {\n  font-family: \"Inter\", \"Segoe UI\", \"Roboto\", \"Helvetica Neue\", Arial, sans-serif;\n  color: #252525;\n  border: none;\n  font-weight: 600;\n  padding: 1rem 0.75rem;\n  vertical-align: middle;\n  font-size: 0.9rem;\n  text-align: left;\n  border-bottom: 2px solid #dee2e6;\n  border-radius: 5px;\n}\n.assessment-table tbody td[data-v-477715fe] {\n  padding: 12px 8px;\n  vertical-align: middle;\n  border-top: 1px solid #dee2e6;\n}\n.assessment-table tbody tr[data-v-477715fe]:nth-of-type(odd) {\n  background-color: #f8f9fa;\n}\n.assessment-table tbody tr[data-v-477715fe]:hover {\n  background-color: #e9ecef;\n}\n.sortable[data-v-477715fe] {\n  cursor: pointer;\n  -webkit-user-select: none;\n     -moz-user-select: none;\n          user-select: none;\n}\n.sortable[data-v-477715fe]:hover {\n  background-color: rgba(255, 255, 255, 0.1);\n}\n.date-cell[data-v-477715fe] {\n  font-weight: 500;\n  padding: 0.25rem 0.5rem;\n  font-size: 0.8rem;\n}\n.date-link[data-v-477715fe] {\n  color: #ff4040;\n  text-decoration: none;\n  font-weight: 500;\n  transition: all 0.2s ease;\n  border-radius: 3px;\n  padding: 2px 4px;\n  display: inline-block;\n}\n.date-link[data-v-477715fe]:hover {\n  color: #e63939;\n  text-decoration: underline;\n  background-color: rgba(255, 64, 64, 0.1);\n  transform: translateY(-1px);\n}\n.date-link[data-v-477715fe]:focus {\n  outline: 2px solid rgba(255, 64, 64, 0.3);\n  outline-offset: 1px;\n}\n.action-buttons .btn[data-v-477715fe] {\n  margin-right: 8px;\n}\n.action-buttons .btn[data-v-477715fe]:last-child {\n  margin-right: 0;\n}\n.viewable-cell[data-v-477715fe] {\n  cursor: default;\n}\n.viewable-text-cell[data-v-477715fe] {\n  cursor: pointer;\n  color: #ff4040;\n  text-decoration: none;\n  transition: all 0.2s ease;\n  display: inline-block;\n  padding: 4px 8px;\n  border-radius: 4px;\n}\n.viewable-text-cell[data-v-477715fe]:hover {\n  background-color: rgba(255, 64, 64, 0.1);\n  text-decoration: underline;\n}\n.cell-input[data-v-477715fe] {\n  border: 2px solid #ff4040;\n  border-radius: 4px;\n  padding: 4px 8px;\n  font-size: 0.9rem;\n}\n.cell-input[data-v-477715fe]:focus {\n  outline: none;\n  border-color: #ff4040;\n  box-shadow: 0 0 0 3px rgba(255, 64, 64, 0.1);\n}\n.saving-indicator[data-v-477715fe] {\n  color: #ff4040;\n  font-size: 0.8rem;\n  margin-left: 4px;\n}\n.table-controls[data-v-477715fe],\n.table-controls-right[data-v-477715fe] {\n  display: flex;\n  align-items: center;\n}\n.table-controls .dropdown-menu[data-v-477715fe],\n.table-controls-right .dropdown-menu[data-v-477715fe] {\n  min-width: 280px;\n  max-width: 320px;\n  max-height: 450px;\n  overflow-y: auto;\n  border: 1px solid #dee2e6;\n  border-radius: 8px;\n  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.12), 0 2px 4px rgba(0, 0, 0, 0.08);\n  padding: 0;\n  margin-top: 0.5rem;\n  background: #ffffff;\n}\n.table-controls-right .dropdown-menu-right[data-v-477715fe] {\n  right: 0;\n  left: auto;\n}\n.dropdown.show .dropdown-menu[data-v-477715fe] {\n  display: block;\n}\n.dropdown-item-text[data-v-477715fe] {\n  padding: 1.25rem 1.5rem;\n  background: #ffffff;\n}\n.dropdown-item-text h6[data-v-477715fe] {\n  margin: 0 0 1.25rem 0;\n  padding: 0 0 0.875rem 0;\n  border-bottom: 2px solid #e9ecef;\n  font-size: 0.875rem;\n  font-weight: 700;\n  color: #212529;\n  letter-spacing: 0.3px;\n  text-transform: uppercase;\n}\n.form-check[data-v-477715fe] {\n  margin-bottom: 0.875rem;\n  padding: 0.5rem 0;\n  display: flex;\n  align-items: center;\n  transition: background-color 0.15s ease;\n  border-radius: 4px;\n  padding-left: 0.5rem;\n  margin-left: -0.5rem;\n  margin-right: -0.5rem;\n}\n.form-check[data-v-477715fe]:hover {\n  background-color: #f8f9fa;\n}\n.form-check[data-v-477715fe]:last-child {\n  margin-bottom: 0;\n}\n.form-check-input[data-v-477715fe] {\n  width: 18px;\n  height: 18px;\n  margin-right: 0.875rem;\n  margin-top: 0;\n  cursor: pointer;\n  border: 2px solid #adb5bd;\n  border-radius: 3px;\n  transition: all 0.2s ease;\n  flex-shrink: 0;\n}\n.form-check-input[data-v-477715fe]:checked {\n  background-color: #dc3545;\n  border-color: #dc3545;\n  background-image: url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20'%3e%3cpath fill='none' stroke='%23fff' stroke-linecap='round' stroke-linejoin='round' stroke-width='3' d='M6 10l3 3l6-6'/%3e%3c/svg%3e\");\n  background-size: 100% 100%;\n  background-position: center;\n  background-repeat: no-repeat;\n}\n.form-check-input[data-v-477715fe]:focus {\n  border-color: #dc3545;\n  outline: none;\n  box-shadow: 0 0 0 3px rgba(220, 53, 69, 0.15);\n}\n.form-check-label[data-v-477715fe] {\n  cursor: pointer;\n  -webkit-user-select: none;\n     -moz-user-select: none;\n          user-select: none;\n  font-size: 0.9rem;\n  color: #495057;\n  font-weight: 500;\n  line-height: 1.5;\n  flex: 1;\n  margin: 0;\n}\n.form-check-label[data-v-477715fe]:hover {\n  color: #212529;\n}\n\n/* Custom scrollbar for dropdown */\n.table-controls .dropdown-menu[data-v-477715fe]::-webkit-scrollbar,\n.table-controls-right .dropdown-menu[data-v-477715fe]::-webkit-scrollbar {\n  width: 6px;\n}\n.table-controls .dropdown-menu[data-v-477715fe]::-webkit-scrollbar-track,\n.table-controls-right .dropdown-menu[data-v-477715fe]::-webkit-scrollbar-track {\n  background: #f8f9fa;\n  border-radius: 3px;\n}\n.table-controls .dropdown-menu[data-v-477715fe]::-webkit-scrollbar-thumb,\n.table-controls-right .dropdown-menu[data-v-477715fe]::-webkit-scrollbar-thumb {\n  background: #ced4da;\n  border-radius: 3px;\n}\n.table-controls .dropdown-menu[data-v-477715fe]::-webkit-scrollbar-thumb:hover,\n.table-controls-right .dropdown-menu[data-v-477715fe]::-webkit-scrollbar-thumb:hover {\n  background: #adb5bd;\n}\n@media (max-width: 768px) {\n.page-header .d-flex[data-v-477715fe] {\n    flex-direction: column;\n    align-items: flex-start !important;\n}\n.action-buttons[data-v-477715fe] {\n    margin-top: 15px;\n    width: 100%;\n}\n.action-buttons .btn[data-v-477715fe] {\n    margin-right: 8px;\n    margin-bottom: 8px;\n    padding: 5px 12px;\n    font-size: 0.8rem;\n}\n.page-title[data-v-477715fe] {\n    font-size: 2rem;\n}\n.notes-input-wrapper[data-v-477715fe] {\n    flex-direction: column;\n}\n.btn-update-notes[data-v-477715fe] {\n    align-self: flex-end;\n    width: auto;\n}\n}\n.text-viewer-modal-overlay[data-v-477715fe] {\n  position: fixed;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  background-color: rgba(0, 0, 0, 0.5);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  z-index: 10000;\n  padding: 20px;\n}\n.text-viewer-modal[data-v-477715fe] {\n  background: white;\n  border-radius: 8px;\n  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);\n  max-width: 600px;\n  width: 100%;\n  max-height: 80vh;\n  display: flex;\n  flex-direction: column;\n}\n.text-viewer-modal-header[data-v-477715fe] {\n  padding: 1.25rem;\n  border-bottom: 1px solid #dee2e6;\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n}\n.text-viewer-modal-header h5[data-v-477715fe] {\n  color: #252525;\n  font-weight: 600;\n}\n.close-btn[data-v-477715fe] {\n  background: none;\n  border: none;\n  font-size: 1.25rem;\n  color: #6c757d;\n  cursor: pointer;\n  padding: 0;\n  width: 30px;\n  height: 30px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  border-radius: 4px;\n  transition: all 0.2s ease;\n}\n.close-btn[data-v-477715fe]:hover {\n  background-color: #f8f9fa;\n  color: #dc3545;\n}\n.text-viewer-modal-body[data-v-477715fe] {\n  padding: 1.25rem;\n  overflow-y: auto;\n  flex: 1;\n}\n.text-viewer-modal-body p[data-v-477715fe] {\n  color: #252525;\n  line-height: 1.6;\n  white-space: pre-wrap;\n  word-wrap: break-word;\n}\n@media (max-width: 576px) {\n.self-assessments-page[data-v-477715fe] {\n    padding: 10px;\n}\n.action-buttons .btn[data-v-477715fe] {\n    font-size: 0.8rem;\n    padding: 5px 10px;\n    border-radius: 18px;\n}\n.text-viewer-modal[data-v-477715fe] {\n    max-width: 95%;\n    margin: 10px;\n}\n}", ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-12.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12.use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-12.use[3]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/Nutrition/MemberReports.vue?vue&type=style&index=0&id=477715fe&lang=scss&scoped=true":
/*!******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-12.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12.use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-12.use[3]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/Nutrition/MemberReports.vue?vue&type=style&index=0&id=477715fe&lang=scss&scoped=true ***!
  \******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../../../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_clonedRuleSet_12_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_12_use_2_node_modules_sass_loader_dist_cjs_js_clonedRuleSet_12_use_3_node_modules_vue_loader_lib_index_js_vue_loader_options_MemberReports_vue_vue_type_style_index_0_id_477715fe_lang_scss_scoped_true__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !!../../../../../../node_modules/css-loader/dist/cjs.js??clonedRuleSet-12.use[1]!../../../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12.use[2]!../../../../../../node_modules/sass-loader/dist/cjs.js??clonedRuleSet-12.use[3]!../../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./MemberReports.vue?vue&type=style&index=0&id=477715fe&lang=scss&scoped=true */ "./node_modules/css-loader/dist/cjs.js??clonedRuleSet-12.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12.use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-12.use[3]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/Nutrition/MemberReports.vue?vue&type=style&index=0&id=477715fe&lang=scss&scoped=true");

            

var options = {};

options.insert = "head";
options.singleton = false;

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_clonedRuleSet_12_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_12_use_2_node_modules_sass_loader_dist_cjs_js_clonedRuleSet_12_use_3_node_modules_vue_loader_lib_index_js_vue_loader_options_MemberReports_vue_vue_type_style_index_0_id_477715fe_lang_scss_scoped_true__WEBPACK_IMPORTED_MODULE_1__["default"], options);



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_clonedRuleSet_12_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_12_use_2_node_modules_sass_loader_dist_cjs_js_clonedRuleSet_12_use_3_node_modules_vue_loader_lib_index_js_vue_loader_options_MemberReports_vue_vue_type_style_index_0_id_477715fe_lang_scss_scoped_true__WEBPACK_IMPORTED_MODULE_1__["default"].locals || {});

/***/ }),

/***/ "./resources/src/views/app/pages/Nutrition/MemberReports.vue":
/*!*******************************************************************!*\
  !*** ./resources/src/views/app/pages/Nutrition/MemberReports.vue ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _MemberReports_vue_vue_type_template_id_477715fe_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./MemberReports.vue?vue&type=template&id=477715fe&scoped=true */ "./resources/src/views/app/pages/Nutrition/MemberReports.vue?vue&type=template&id=477715fe&scoped=true");
/* harmony import */ var _MemberReports_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./MemberReports.vue?vue&type=script&lang=js */ "./resources/src/views/app/pages/Nutrition/MemberReports.vue?vue&type=script&lang=js");
/* harmony import */ var _MemberReports_vue_vue_type_style_index_0_id_477715fe_lang_scss_scoped_true__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./MemberReports.vue?vue&type=style&index=0&id=477715fe&lang=scss&scoped=true */ "./resources/src/views/app/pages/Nutrition/MemberReports.vue?vue&type=style&index=0&id=477715fe&lang=scss&scoped=true");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");



;


/* normalize component */

var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _MemberReports_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__["default"],
  _MemberReports_vue_vue_type_template_id_477715fe_scoped_true__WEBPACK_IMPORTED_MODULE_0__.render,
  _MemberReports_vue_vue_type_template_id_477715fe_scoped_true__WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  "477715fe",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/src/views/app/pages/Nutrition/MemberReports.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./resources/src/views/app/pages/Nutrition/MemberReports.vue?vue&type=script&lang=js":
/*!*******************************************************************************************!*\
  !*** ./resources/src/views/app/pages/Nutrition/MemberReports.vue?vue&type=script&lang=js ***!
  \*******************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_MemberReports_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./MemberReports.vue?vue&type=script&lang=js */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/Nutrition/MemberReports.vue?vue&type=script&lang=js");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_MemberReports_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/src/views/app/pages/Nutrition/MemberReports.vue?vue&type=style&index=0&id=477715fe&lang=scss&scoped=true":
/*!****************************************************************************************************************************!*\
  !*** ./resources/src/views/app/pages/Nutrition/MemberReports.vue?vue&type=style&index=0&id=477715fe&lang=scss&scoped=true ***!
  \****************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_dist_cjs_js_node_modules_css_loader_dist_cjs_js_clonedRuleSet_12_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_12_use_2_node_modules_sass_loader_dist_cjs_js_clonedRuleSet_12_use_3_node_modules_vue_loader_lib_index_js_vue_loader_options_MemberReports_vue_vue_type_style_index_0_id_477715fe_lang_scss_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/style-loader/dist/cjs.js!../../../../../../node_modules/css-loader/dist/cjs.js??clonedRuleSet-12.use[1]!../../../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12.use[2]!../../../../../../node_modules/sass-loader/dist/cjs.js??clonedRuleSet-12.use[3]!../../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./MemberReports.vue?vue&type=style&index=0&id=477715fe&lang=scss&scoped=true */ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-12.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12.use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-12.use[3]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/Nutrition/MemberReports.vue?vue&type=style&index=0&id=477715fe&lang=scss&scoped=true");


/***/ }),

/***/ "./resources/src/views/app/pages/Nutrition/MemberReports.vue?vue&type=template&id=477715fe&scoped=true":
/*!*************************************************************************************************************!*\
  !*** ./resources/src/views/app/pages/Nutrition/MemberReports.vue?vue&type=template&id=477715fe&scoped=true ***!
  \*************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_MemberReports_vue_vue_type_template_id_477715fe_scoped_true__WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   staticRenderFns: () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_MemberReports_vue_vue_type_template_id_477715fe_scoped_true__WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_MemberReports_vue_vue_type_template_id_477715fe_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./MemberReports.vue?vue&type=template&id=477715fe&scoped=true */ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/Nutrition/MemberReports.vue?vue&type=template&id=477715fe&scoped=true");


/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/Nutrition/MemberReports.vue?vue&type=template&id=477715fe&scoped=true":
/*!****************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/Nutrition/MemberReports.vue?vue&type=template&id=477715fe&scoped=true ***!
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
  return _c("div", { staticClass: "self-assessments-page" }, [
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
                      _c("router-link", { attrs: { to: "/app/nutrition" } }, [
                        _c("i", { staticClass: "fas fa-apple-alt" }),
                        _vm._v(
                          "\n                                Nutrition Hub\n                            "
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
    _c("div", { staticClass: "page-header mb-4" }, [
      _c(
        "div",
        { staticClass: "d-flex justify-content-between align-items-center" },
        [
          _c("h1", { staticClass: "page-title" }, [
            _vm._v(_vm._s(_vm.memberName) + " - Self-Assessments"),
          ]),
          _vm._v(" "),
          _c("div", { staticClass: "action-buttons" }, [
            _c(
              "button",
              {
                staticClass: "btn btn-teal mr-2",
                on: { click: _vm.navigateToComparePhotos },
              },
              [
                _c("i", { staticClass: "fas fa-images mr-1" }),
                _vm._v(
                  "\n                    Compare Photos\n                "
                ),
              ]
            ),
            _vm._v(" "),
            _c(
              "button",
              {
                staticClass: "btn btn-teal mr-2",
                on: { click: _vm.exportCurrentView },
              },
              [
                _c("i", { staticClass: "fas fa-download mr-1" }),
                _vm._v(
                  "\n                    Export Current View\n                "
                ),
              ]
            ),
            _vm._v(" "),
            _c(
              "button",
              {
                staticClass: "btn btn-teal",
                on: { click: _vm.exportAllColumns },
              },
              [
                _c("i", { staticClass: "fas fa-table mr-1" }),
                _vm._v(
                  "\n                    Export All Columns\n                "
                ),
              ]
            ),
          ]),
        ]
      ),
    ]),
    _vm._v(" "),
    _c("div", { staticClass: "notes-section mb-4" }, [
      _c("div", { staticClass: "notes-container" }, [
        _c("label", { staticClass: "notes-label" }, [_vm._v("Notes")]),
        _vm._v(" "),
        _c("div", { staticClass: "notes-input-wrapper" }, [
          _c("textarea", {
            directives: [
              {
                name: "model",
                rawName: "v-model",
                value: _vm.notes,
                expression: "notes",
              },
            ],
            staticClass: "notes-textarea",
            attrs: { rows: "2", placeholder: "Add your notes here..." },
            domProps: { value: _vm.notes },
            on: {
              input: function ($event) {
                if ($event.target.composing) {
                  return
                }
                _vm.notes = $event.target.value
              },
            },
          }),
          _vm._v(" "),
          _c(
            "button",
            {
              staticClass: "btn btn-teal btn-update-notes",
              on: { click: _vm.updateNotes },
            },
            [
              _c("i", { staticClass: "fas fa-save mr-1" }),
              _vm._v("\n                    Update\n                "),
            ]
          ),
        ]),
      ]),
    ]),
    _vm._v(" "),
    _c("div", { staticClass: "table-section" }, [
      _c(
        "div",
        {
          staticClass: "d-flex justify-content-between align-items-center mb-3",
        },
        [
          _c("div", { staticClass: "table-controls" }),
          _vm._v(" "),
          _c("div", { staticClass: "table-controls-right" }, [
            _c(
              "div",
              {
                staticClass: "dropdown",
                class: { show: _vm.showColumnDropdown },
              },
              [
                _c(
                  "button",
                  {
                    staticClass: "btn btn-teal dropdown-toggle",
                    attrs: {
                      type: "button",
                      id: "columnToggle",
                      "aria-haspopup": "true",
                      "aria-expanded": _vm.showColumnDropdown,
                    },
                    on: {
                      click: function ($event) {
                        $event.stopPropagation()
                        return _vm.toggleColumnDropdown.apply(null, arguments)
                      },
                    },
                  },
                  [
                    _c("i", { staticClass: "fas fa-columns" }),
                    _vm._v(" "),
                    _c("span", { staticClass: "ml-2" }, [
                      _vm._v("Show/Hide Columns"),
                    ]),
                  ]
                ),
                _vm._v(" "),
                _c(
                  "div",
                  {
                    staticClass: "dropdown-menu dropdown-menu-right",
                    class: { show: _vm.showColumnDropdown },
                    attrs: { "aria-labelledby": "columnToggle" },
                    on: {
                      click: function ($event) {
                        $event.stopPropagation()
                      },
                    },
                  },
                  [
                    _c(
                      "div",
                      { staticClass: "dropdown-item-text" },
                      [
                        _c("h6", { staticClass: "mb-2 font-weight-bold" }, [
                          _vm._v("Show/Hide Columns"),
                        ]),
                        _vm._v(" "),
                        _vm._l(_vm.columns, function (column) {
                          return _c(
                            "div",
                            { key: column.key, staticClass: "form-check" },
                            [
                              _c("input", {
                                directives: [
                                  {
                                    name: "model",
                                    rawName: "v-model",
                                    value: column.visible,
                                    expression: "column.visible",
                                  },
                                ],
                                staticClass: "form-check-input",
                                attrs: { type: "checkbox", id: column.key },
                                domProps: {
                                  checked: Array.isArray(column.visible)
                                    ? _vm._i(column.visible, null) > -1
                                    : column.visible,
                                },
                                on: {
                                  change: [
                                    function ($event) {
                                      var $$a = column.visible,
                                        $$el = $event.target,
                                        $$c = $$el.checked ? true : false
                                      if (Array.isArray($$a)) {
                                        var $$v = null,
                                          $$i = _vm._i($$a, $$v)
                                        if ($$el.checked) {
                                          $$i < 0 &&
                                            _vm.$set(
                                              column,
                                              "visible",
                                              $$a.concat([$$v])
                                            )
                                        } else {
                                          $$i > -1 &&
                                            _vm.$set(
                                              column,
                                              "visible",
                                              $$a
                                                .slice(0, $$i)
                                                .concat($$a.slice($$i + 1))
                                            )
                                        }
                                      } else {
                                        _vm.$set(column, "visible", $$c)
                                      }
                                    },
                                    function ($event) {
                                      return _vm.toggleColumn(column.key)
                                    },
                                  ],
                                },
                              }),
                              _vm._v(" "),
                              _c(
                                "label",
                                {
                                  staticClass: "form-check-label",
                                  attrs: { for: column.key },
                                },
                                [
                                  _vm._v(
                                    "\n                                    " +
                                      _vm._s(column.label) +
                                      "\n                                "
                                  ),
                                ]
                              ),
                            ]
                          )
                        }),
                      ],
                      2
                    ),
                  ]
                ),
              ]
            ),
          ]),
        ]
      ),
      _vm._v(" "),
      _vm.loading
        ? _c("div", { staticClass: "text-center p-4" }, [
            _vm._m(1),
            _vm._v(" "),
            _c("p", { staticClass: "mt-2" }, [_vm._v("Loading assessments")]),
          ])
        : _vm.error
        ? _c(
            "div",
            { staticClass: "alert alert-danger m-3", attrs: { role: "alert" } },
            [
              _c("strong", [_vm._v("Error:")]),
              _vm._v(" " + _vm._s(_vm.error) + "\n            "),
              _c(
                "button",
                {
                  staticClass: "btn btn-sm btn-outline-danger ml-2",
                  on: { click: _vm.fetchMemberData },
                },
                [_vm._v("Retry")]
              ),
            ]
          )
        : !_vm.loading && _vm.assessments.length === 0
        ? _c("div", { staticClass: "text-center p-4" }, [
            _c("p", { staticClass: "text-muted" }, [
              _vm._v("No assessments found for this member."),
            ]),
          ])
        : _c("div", { staticClass: "table-responsive" }, [
            _c(
              "table",
              { staticClass: "table table-striped assessment-table" },
              [
                _c("thead", { staticClass: "thead-dark" }, [
                  _c(
                    "tr",
                    _vm._l(_vm.visibleColumns, function (column) {
                      return _c(
                        "th",
                        {
                          key: column.key,
                          staticClass: "sortable",
                          class: {
                            "sort-asc":
                              _vm.sortField === column.key &&
                              _vm.sortDirection === "asc",
                            "sort-desc":
                              _vm.sortField === column.key &&
                              _vm.sortDirection === "desc",
                          },
                          on: {
                            click: function ($event) {
                              return _vm.sortBy(column.key)
                            },
                          },
                        },
                        [
                          _vm._v(
                            "\n                            " +
                              _vm._s(column.label) +
                              "\n                            "
                          ),
                          _vm.sortField !== column.key
                            ? _c("i", { staticClass: "fas fa-sort ml-1" })
                            : _vm._e(),
                          _vm._v(" "),
                          _vm.sortField === column.key &&
                          _vm.sortDirection === "asc"
                            ? _c("i", { staticClass: "fas fa-sort-up ml-1" })
                            : _vm._e(),
                          _vm._v(" "),
                          _vm.sortField === column.key &&
                          _vm.sortDirection === "desc"
                            ? _c("i", { staticClass: "fas fa-sort-down ml-1" })
                            : _vm._e(),
                        ]
                      )
                    }),
                    0
                  ),
                ]),
                _vm._v(" "),
                _c(
                  "tbody",
                  _vm._l(_vm.sortedAssessments, function (assessment, index) {
                    return _c(
                      "tr",
                      { key: assessment.id || index },
                      _vm._l(_vm.visibleColumns, function (column) {
                        return _c(
                          "td",
                          {
                            key: column.key,
                            class: {
                              "viewable-cell":
                                column.viewable && assessment[column.key],
                            },
                          },
                          [
                            column.key === "date"
                              ? _c(
                                  "span",
                                  { staticClass: "date-cell" },
                                  [
                                    _c(
                                      "router-link",
                                      {
                                        staticClass: "date-link",
                                        attrs: {
                                          to: {
                                            name: "ComparePhotos",
                                            params: {
                                              date: assessment[column.key],
                                            },
                                          },
                                          title:
                                            "View photos for " +
                                            _vm.formatDate(
                                              assessment[column.key]
                                            ),
                                        },
                                        on: {
                                          click: function ($event) {
                                            $event.stopPropagation()
                                          },
                                        },
                                      },
                                      [
                                        _vm._v(
                                          "\n                                    " +
                                            _vm._s(
                                              _vm.formatDate(
                                                assessment[column.key]
                                              )
                                            ) +
                                            "\n                                "
                                        ),
                                      ]
                                    ),
                                  ],
                                  1
                                )
                              : column.viewable &&
                                assessment[column.key] !== null &&
                                assessment[column.key] !== "" &&
                                assessment[column.key] !== undefined
                              ? _c(
                                  "span",
                                  {
                                    staticClass: "viewable-text-cell",
                                    attrs: { title: "Click to view full text" },
                                    on: {
                                      click: function ($event) {
                                        $event.stopPropagation()
                                        return _vm.showFullText(
                                          column.label,
                                          assessment[column.key]
                                        )
                                      },
                                    },
                                  },
                                  [
                                    _vm._v(
                                      "\n                                " +
                                        _vm._s(
                                          _vm.truncateText(
                                            assessment[column.key],
                                            50
                                          )
                                        ) +
                                        "\n                                "
                                    ),
                                    _c("i", {
                                      staticClass: "fas fa-eye ml-1 text-muted",
                                      staticStyle: { "font-size": "0.75rem" },
                                    }),
                                  ]
                                )
                              : assessment[column.key] !== null &&
                                assessment[column.key] !== "" &&
                                assessment[column.key] !== undefined
                              ? _c("span", { staticClass: "cell-value" }, [
                                  _vm._v(
                                    "\n                                " +
                                      _vm._s(
                                        _vm.formatCellValue(
                                          assessment[column.key],
                                          column.key
                                        )
                                      ) +
                                      "\n                            "
                                  ),
                                ])
                              : _c("span", { staticClass: "text-muted" }, [
                                  _vm._v(
                                    "\n                                N/A\n                            "
                                  ),
                                ]),
                          ]
                        )
                      }),
                      0
                    )
                  }),
                  0
                ),
              ]
            ),
          ]),
    ]),
    _vm._v(" "),
    _vm.showTextModal
      ? _c(
          "div",
          {
            staticClass: "text-viewer-modal-overlay",
            on: { click: _vm.closeTextModal },
          },
          [
            _c(
              "div",
              {
                staticClass: "text-viewer-modal",
                on: {
                  click: function ($event) {
                    $event.stopPropagation()
                  },
                },
              },
              [
                _c("div", { staticClass: "text-viewer-modal-header" }, [
                  _c("h5", { staticClass: "mb-0" }, [
                    _vm._v(_vm._s(_vm.textModalTitle)),
                  ]),
                  _vm._v(" "),
                  _c(
                    "button",
                    {
                      staticClass: "close-btn",
                      attrs: { type: "button", "aria-label": "Close" },
                      on: { click: _vm.closeTextModal },
                    },
                    [_c("i", { staticClass: "fas fa-times" })]
                  ),
                ]),
                _vm._v(" "),
                _c("div", { staticClass: "text-viewer-modal-body" }, [
                  _c("p", { staticClass: "mb-0" }, [
                    _vm._v(_vm._s(_vm.textModalContent)),
                  ]),
                ]),
              ]
            ),
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
        _c("i", { staticClass: "fas fa-chart-pie" }),
        _vm._v(
          "\n                            Self-Assessments\n                        "
        ),
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
      [_c("span", { staticClass: "sr-only" }, [_vm._v("Loading")])]
    )
  },
]
render._withStripped = true



/***/ })

}]);