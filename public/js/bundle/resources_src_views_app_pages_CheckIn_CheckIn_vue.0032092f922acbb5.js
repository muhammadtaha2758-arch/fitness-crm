"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["resources_src_views_app_pages_CheckIn_CheckIn_vue"],{

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/CheckIn/CheckIn.vue?vue&type=script&lang=js":
/*!***************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/CheckIn/CheckIn.vue?vue&type=script&lang=js ***!
  \***************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! axios */ "./node_modules/axios/index.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_0__);
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
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


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  name: "CheckIn",
  data: function data() {
    return {
      loading: false,
      checkInMode: "visitor",
      visitorName: "",
      visitorMessage: "",
      checkIns: [],
      currentVisitors: {
        active_visitors: 0,
        total_today: 0
      },
      selectedDate: "today",
      visitorFilter: "all",
      searchVisitorName: "",
      customDate: "",
      today: new Date(),
      searchDebounceTimer: null,
      memberSearchQuery: "",
      memberSearchResults: [],
      memberSearchLoading: false,
      memberSearchDebounce: null,
      selectedMember: null
    };
  },
  computed: {
    isMemberMode: function isMemberMode() {
      return this.checkInMode === "member";
    },
    canSubmitCheckIn: function canSubmitCheckIn() {
      return this.isMemberMode ? !!this.selectedMember : this.visitorName.trim().length > 0;
    },
    showMemberSuggestions: function showMemberSuggestions() {
      return this.isMemberMode && !this.selectedMember && this.memberSearchQuery.trim().length >= 2 && (this.memberSearchResults.length > 0 || this.memberSearchLoading);
    }
  },
  mounted: function mounted() {
    this.loadCheckIns();
    this.loadCurrentVisitorsCount();
  },
  beforeDestroy: function beforeDestroy() {
    if (this.searchDebounceTimer) {
      clearTimeout(this.searchDebounceTimer);
    }
    if (this.memberSearchDebounce) {
      clearTimeout(this.memberSearchDebounce);
    }
  },
  methods: {
    handleCheckIn: function handleCheckIn() {
      if (this.isMemberMode) {
        this.checkInMember();
      } else {
        this.checkInVisitor();
      }
    },
    setCheckInMode: function setCheckInMode(mode) {
      if (this.checkInMode === mode) {
        return;
      }
      this.checkInMode = mode;
      this.visitorMessage = "";
      if (mode === "visitor") {
        this.clearSelectedMember();
      } else {
        this.visitorName = "";
      }
    },
    goBack: function goBack() {
      this.$router.go(-1);
    },
    // Toast notification helper
    makeToast: function makeToast(variant, msg, title) {
      this.$root.$bvToast.toast(msg, {
        title: title || (variant === "success" ? "Success" : variant === "error" ? "Error" : "Info"),
        variant: variant === "error" ? "danger" : variant,
        solid: true,
        toaster: "b-toaster-top-right",
        autoHideDelay: 3000
      });
    },
    // -------------------------------------------------------------------
    // CHECK-IN VISITOR (FULLY FIXED)
    // -------------------------------------------------------------------
    checkInVisitor: function checkInVisitor() {
      var _this = this;
      return _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
        var payload, _yield$axios$post, data, _error$response, response, validationMsg, msg;
        return _regeneratorRuntime().wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              if (_this.visitorName.trim()) {
                _context.next = 3;
                break;
              }
              _this.makeToast("error", "Please enter a valid visitor name");
              return _context.abrupt("return");
            case 3:
              _this.loading = true;
              _context.prev = 4;
              payload = {
                visitor_name: _this.visitorName.trim(),
                check_in_type: "manual"
              }; // Only include message if it has a value
              if (_this.visitorMessage && _this.visitorMessage.trim()) {
                payload.message = _this.visitorMessage.trim();
              }
              _context.next = 9;
              return axios__WEBPACK_IMPORTED_MODULE_0___default().post("check-ins", payload);
            case 9:
              _yield$axios$post = _context.sent;
              data = _yield$axios$post.data;
              if (!(data !== null && data !== void 0 && data.success)) {
                _context.next = 24;
                break;
              }
              _this.makeToast("success", "Visitor checked in successfully");
              if (data !== null && data !== void 0 && data.data) {
                _this.checkIns.unshift(data.data);
              }
              _this.currentVisitors.active_visitors++;
              _this.currentVisitors.total_today++;
              _this.visitorName = "";
              _this.visitorMessage = "";
              _context.next = 20;
              return _this.loadCheckIns();
            case 20:
              _context.next = 22;
              return _this.loadCurrentVisitorsCount();
            case 22:
              _context.next = 25;
              break;
            case 24:
              _this.makeToast("error", (data === null || data === void 0 ? void 0 : data.message) || "Unexpected server response.");
            case 25:
              _context.next = 36;
              break;
            case 27:
              _context.prev = 27;
              _context.t0 = _context["catch"](4);
              response = (_context.t0 === null || _context.t0 === void 0 || (_error$response = _context.t0.response) === null || _error$response === void 0 ? void 0 : _error$response.data) || {}; // Laravel validation errors
              if (!(response.errors && _typeof(response.errors) === "object")) {
                _context.next = 34;
                break;
              }
              validationMsg = Object.values(response.errors).flat().join(", ");
              _this.makeToast("error", validationMsg);
              return _context.abrupt("return");
            case 34:
              // General Laravel error message
              msg = response.message || "Error checking in visitor. Please try again.";
              _this.makeToast("error", msg);
            case 36:
              _context.prev = 36;
              _this.loading = false;
              return _context.finish(36);
            case 39:
            case "end":
              return _context.stop();
          }
        }, _callee, null, [[4, 27, 36, 39]]);
      }))();
    },
    checkInMember: function checkInMember() {
      var _this2 = this;
      return _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee2() {
        var payload, _yield$axios$post2, data, _error$response2, response, msg;
        return _regeneratorRuntime().wrap(function _callee2$(_context2) {
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
              if (_this2.selectedMember) {
                _context2.next = 3;
                break;
              }
              _this2.makeToast("error", "Please select a member to check in");
              return _context2.abrupt("return");
            case 3:
              _this2.loading = true;
              _context2.prev = 4;
              payload = {
                member_id: _this2.selectedMember.id,
                member_name: _this2.selectedMember.name,
                check_in_type: "manual"
              }; // Only include message if it has a value
              if (_this2.visitorMessage && _this2.visitorMessage.trim()) {
                payload.message = _this2.visitorMessage.trim();
              }
              _context2.next = 9;
              return axios__WEBPACK_IMPORTED_MODULE_0___default().post("check-ins", payload);
            case 9:
              _yield$axios$post2 = _context2.sent;
              data = _yield$axios$post2.data;
              if (!(data !== null && data !== void 0 && data.success)) {
                _context2.next = 25;
                break;
              }
              _this2.makeToast("success", "Member checked in successfully");
              if (data !== null && data !== void 0 && data.data) {
                _this2.checkIns.unshift(data.data);
              }
              _this2.currentVisitors.active_visitors++;
              _this2.currentVisitors.total_today++;
              _this2.clearSelectedMember();
              _this2.memberSearchQuery = "";
              _this2.visitorMessage = "";
              _context2.next = 21;
              return _this2.loadCheckIns();
            case 21:
              _context2.next = 23;
              return _this2.loadCurrentVisitorsCount();
            case 23:
              _context2.next = 26;
              break;
            case 25:
              _this2.makeToast("error", (data === null || data === void 0 ? void 0 : data.message) || "Unexpected server response.");
            case 26:
              _context2.next = 33;
              break;
            case 28:
              _context2.prev = 28;
              _context2.t0 = _context2["catch"](4);
              response = (_context2.t0 === null || _context2.t0 === void 0 || (_error$response2 = _context2.t0.response) === null || _error$response2 === void 0 ? void 0 : _error$response2.data) || {};
              msg = response.message || "Error checking in member. Please try again.";
              _this2.makeToast("error", msg);
            case 33:
              _context2.prev = 33;
              _this2.loading = false;
              return _context2.finish(33);
            case 36:
            case "end":
              return _context2.stop();
          }
        }, _callee2, null, [[4, 28, 33, 36]]);
      }))();
    },
    // -------------------------------------------------------------------
    // CHECK-OUT
    // -------------------------------------------------------------------
    checkOut: function checkOut(id) {
      var _this3 = this;
      return _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee3() {
        var _yield$axios$put, data;
        return _regeneratorRuntime().wrap(function _callee3$(_context3) {
          while (1) switch (_context3.prev = _context3.next) {
            case 0:
              _context3.prev = 0;
              _context3.next = 3;
              return axios__WEBPACK_IMPORTED_MODULE_0___default().put("check-ins/".concat(id));
            case 3:
              _yield$axios$put = _context3.sent;
              data = _yield$axios$put.data;
              if (!(data !== null && data !== void 0 && data.success)) {
                _context3.next = 13;
                break;
              }
              _this3.makeToast("success", "Visitor checked out successfully");
              _context3.next = 9;
              return _this3.loadCheckIns();
            case 9:
              _context3.next = 11;
              return _this3.loadCurrentVisitorsCount();
            case 11:
              _context3.next = 14;
              break;
            case 13:
              _this3.makeToast("error", (data === null || data === void 0 ? void 0 : data.message) || "Check-out failed");
            case 14:
              _context3.next = 19;
              break;
            case 16:
              _context3.prev = 16;
              _context3.t0 = _context3["catch"](0);
              _this3.makeToast("error", "Error checking out visitor");
            case 19:
            case "end":
              return _context3.stop();
          }
        }, _callee3, null, [[0, 16]]);
      }))();
    },
    // -------------------------------------------------------------------
    // DELETE VISITOR
    // -------------------------------------------------------------------
    deleteCheckIn: function deleteCheckIn(id) {
      var _this4 = this;
      return _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee4() {
        var _yield$axios$delete, data;
        return _regeneratorRuntime().wrap(function _callee4$(_context4) {
          while (1) switch (_context4.prev = _context4.next) {
            case 0:
              if (confirm("Are you sure you want to delete this entry?")) {
                _context4.next = 2;
                break;
              }
              return _context4.abrupt("return");
            case 2:
              _context4.prev = 2;
              _context4.next = 5;
              return axios__WEBPACK_IMPORTED_MODULE_0___default()["delete"]("check-ins/".concat(id));
            case 5:
              _yield$axios$delete = _context4.sent;
              data = _yield$axios$delete.data;
              if (!(data !== null && data !== void 0 && data.success)) {
                _context4.next = 14;
                break;
              }
              _this4.makeToast("success", "Deleted successfully");
              _this4.checkIns = _this4.checkIns.filter(function (item) {
                return item.id !== id;
              });
              _context4.next = 12;
              return _this4.loadCurrentVisitorsCount();
            case 12:
              _context4.next = 15;
              break;
            case 14:
              _this4.makeToast("error", (data === null || data === void 0 ? void 0 : data.message) || "Delete failed");
            case 15:
              _context4.next = 20;
              break;
            case 17:
              _context4.prev = 17;
              _context4.t0 = _context4["catch"](2);
              _this4.makeToast("error", "Error deleting check-in");
            case 20:
            case "end":
              return _context4.stop();
          }
        }, _callee4, null, [[2, 17]]);
      }))();
    },
    // -------------------------------------------------------------------
    // LOAD ALL CHECK-INS
    // -------------------------------------------------------------------
    loadCheckIns: function loadCheckIns() {
      var _this5 = this;
      return _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee5() {
        var params, yesterday, weekStart, monthStart, _yield$axios$get, data;
        return _regeneratorRuntime().wrap(function _callee5$(_context5) {
          while (1) switch (_context5.prev = _context5.next) {
            case 0:
              _this5.loading = true;
              _context5.prev = 1;
              params = {}; // Handle date filtering
              if (_this5.selectedDate === "custom" && _this5.customDate) {
                params.date = _this5.customDate;
              } else if (_this5.selectedDate === "today") {
                params.date = new Date().toISOString().split('T')[0];
              } else if (_this5.selectedDate === "yesterday") {
                yesterday = new Date();
                yesterday.setDate(yesterday.getDate() - 1);
                params.date = yesterday.toISOString().split('T')[0];
              } else if (_this5.selectedDate === "week") {
                // For week, we'll let the backend handle it or send start of week
                weekStart = new Date();
                weekStart.setDate(weekStart.getDate() - weekStart.getDay());
                params.date = weekStart.toISOString().split('T')[0];
              } else if (_this5.selectedDate === "month") {
                // For month, send first day of month
                monthStart = new Date();
                monthStart.setDate(1);
                params.date = monthStart.toISOString().split('T')[0];
              }

              // Map status filter to visitor_type (controller expects visitor_type)
              if (_this5.visitorFilter === "active") {
                params.visitor_type = "active";
              }

              // Add search parameter
              if (_this5.searchVisitorName) {
                params.search = _this5.searchVisitorName;
              }
              _context5.next = 8;
              return axios__WEBPACK_IMPORTED_MODULE_0___default().get("check-ins", {
                params: params
              });
            case 8:
              _yield$axios$get = _context5.sent;
              data = _yield$axios$get.data;
              if (data !== null && data !== void 0 && data.success) {
                _this5.checkIns = data.data || [];
              }
              _context5.next = 16;
              break;
            case 13:
              _context5.prev = 13;
              _context5.t0 = _context5["catch"](1);
              _this5.makeToast("error", "Unable to load visitors");
            case 16:
              _context5.prev = 16;
              _this5.loading = false;
              return _context5.finish(16);
            case 19:
            case "end":
              return _context5.stop();
          }
        }, _callee5, null, [[1, 13, 16, 19]]);
      }))();
    },
    // -------------------------------------------------------------------
    // SUMMARY
    // -------------------------------------------------------------------
    loadCurrentVisitorsCount: function loadCurrentVisitorsCount() {
      var _this6 = this;
      return _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee6() {
        var _yield$axios$get2, data;
        return _regeneratorRuntime().wrap(function _callee6$(_context6) {
          while (1) switch (_context6.prev = _context6.next) {
            case 0:
              _context6.prev = 0;
              _context6.next = 3;
              return axios__WEBPACK_IMPORTED_MODULE_0___default().get("check-ins/summary");
            case 3:
              _yield$axios$get2 = _context6.sent;
              data = _yield$axios$get2.data;
              if (data !== null && data !== void 0 && data.success) {
                _this6.currentVisitors = data.data;
              }
              _context6.next = 11;
              break;
            case 8:
              _context6.prev = 8;
              _context6.t0 = _context6["catch"](0);
              console.warn("Summary load error:", _context6.t0);
            case 11:
            case "end":
              return _context6.stop();
          }
        }, _callee6, null, [[0, 8]]);
      }))();
    },
    // -------------------------------------------------------------------
    // SEARCH DEBOUNCE
    // -------------------------------------------------------------------
    onSearchInput: function onSearchInput() {
      var _this7 = this;
      clearTimeout(this.searchDebounceTimer);
      this.searchDebounceTimer = setTimeout(function () {
        _this7.loadCheckIns();
      }, 400);
    },
    onMemberSearchInput: function onMemberSearchInput() {
      var _this8 = this;
      this.selectedMember = null;
      if (this.memberSearchDebounce) {
        clearTimeout(this.memberSearchDebounce);
      }
      var query = this.memberSearchQuery.trim();
      if (!query || query.length < 2) {
        this.memberSearchResults = [];
        return;
      }
      this.memberSearchDebounce = setTimeout(function () {
        _this8.fetchMemberSuggestions();
      }, 300);
    },
    fetchMemberSuggestions: function fetchMemberSuggestions() {
      var _this9 = this;
      return _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee7() {
        var query, params, _yield$axios$get3, data, clients;
        return _regeneratorRuntime().wrap(function _callee7$(_context7) {
          while (1) switch (_context7.prev = _context7.next) {
            case 0:
              query = _this9.memberSearchQuery.trim();
              if (!(query.length < 2)) {
                _context7.next = 4;
                break;
              }
              _this9.memberSearchResults = [];
              return _context7.abrupt("return");
            case 4:
              _this9.memberSearchLoading = true;
              _context7.prev = 5;
              params = {
                page: 1,
                limit: 6,
                name: query
              };
              _context7.next = 9;
              return axios__WEBPACK_IMPORTED_MODULE_0___default().get("members", {
                params: params
              });
            case 9:
              _yield$axios$get3 = _context7.sent;
              data = _yield$axios$get3.data;
              clients = (data === null || data === void 0 ? void 0 : data.clients) || [];
              _this9.memberSearchResults = clients.map(function (client) {
                return {
                  id: client.id,
                  name: client.membername || [client.firstname, client.lastname].filter(Boolean).join(" ") || "Member #".concat(client.id),
                  email: client.email,
                  membername: client.membername
                };
              });
              _context7.next = 19;
              break;
            case 15:
              _context7.prev = 15;
              _context7.t0 = _context7["catch"](5);
              console.error("Member search failed", _context7.t0);
              _this9.memberSearchResults = [];
            case 19:
              _context7.prev = 19;
              _this9.memberSearchLoading = false;
              return _context7.finish(19);
            case 22:
            case "end":
              return _context7.stop();
          }
        }, _callee7, null, [[5, 15, 19, 22]]);
      }))();
    },
    selectMember: function selectMember(member) {
      this.selectedMember = member;
      this.memberSearchResults = [];
      this.memberSearchQuery = member.name;
    },
    clearSelectedMember: function clearSelectedMember() {
      this.selectedMember = null;
      this.memberSearchQuery = "";
      this.memberSearchResults = [];
    },
    exportData: function exportData() {
      window.open("check-ins/export", "_blank");
    },
    formatDate: function formatDate(date) {
      return new Date(date).toLocaleDateString();
    },
    formatDateTime: function formatDateTime(datetime) {
      return new Date(datetime).toLocaleString();
    }
  }
});

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js??clonedRuleSet-12.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12.use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-12.use[3]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/CheckIn/CheckIn.vue?vue&type=style&index=0&id=2dfa067e&lang=scss&scoped=true":
/*!******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??clonedRuleSet-12.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12.use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-12.use[3]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/CheckIn/CheckIn.vue?vue&type=style&index=0&id=2dfa067e&lang=scss&scoped=true ***!
  \******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
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
___CSS_LOADER_EXPORT___.push([module.id, "@charset \"UTF-8\";\n.filter-btn .btn[data-v-2dfa067e],\n.filter-btn .btn-secondary[data-v-2dfa067e],\n.filter-btn .btn-outline-secondary[data-v-2dfa067e],\n.filter-btn button.btn[data-v-2dfa067e],\n.filter-btn button.btn-secondary[data-v-2dfa067e] {\n  color: #000 !important;\n  background-color: transparent !important;\n  border-color: #6c757d !important;\n}\n.filter-btn .btn[data-v-2dfa067e]:hover,\n.filter-btn .btn-secondary[data-v-2dfa067e]:hover,\n.filter-btn .btn-outline-secondary[data-v-2dfa067e]:hover,\n.filter-btn button.btn[data-v-2dfa067e]:hover,\n.filter-btn button.btn-secondary[data-v-2dfa067e]:hover {\n  color: #dc3545 !important;\n  background-color: transparent !important;\n  border-color: #dc3545 !important;\n  box-shadow: none !important;\n}\n.filter-btn .btn[data-v-2dfa067e]:focus,\n.filter-btn .btn-secondary[data-v-2dfa067e]:focus,\n.filter-btn .btn-outline-secondary[data-v-2dfa067e]:focus,\n.filter-btn button.btn[data-v-2dfa067e]:focus,\n.filter-btn button.btn-secondary[data-v-2dfa067e]:focus {\n  color: #dc3545 !important;\n  background-color: transparent !important;\n  border-color: #dc3545 !important;\n  box-shadow: none !important;\n}\n.filter-btn .btn[data-v-2dfa067e]:active,\n.filter-btn .btn-secondary[data-v-2dfa067e]:active,\n.filter-btn .btn-outline-secondary[data-v-2dfa067e]:active,\n.filter-btn button.btn[data-v-2dfa067e]:active,\n.filter-btn button.btn-secondary[data-v-2dfa067e]:active {\n  color: #dc3545 !important;\n  background-color: transparent !important;\n  border-color: #dc3545 !important;\n}\n.btn-secondary[data-v-2dfa067e]:not(:disabled):not(.disabled):active:focus {\n  box-shadow: none !important;\n}\n\n/* ===========================================\n   COMMON BREADCRUMB NAVIGATION STYLES\n   =========================================== */\n.breadcrumb-nav-row[data-v-2dfa067e] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  margin-bottom: 0.5rem;\n  gap: 0.5rem;\n}\n.breadcrumb-section[data-v-2dfa067e] {\n  flex: 1;\n}\n.breadcrumb-section .breadcrumb-nav .breadcrumb-container[data-v-2dfa067e] {\n  display: flex;\n  align-items: center;\n  gap: 1rem;\n}\n.breadcrumb-section .breadcrumb-nav .breadcrumb-container .back-button[data-v-2dfa067e] {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  width: 40px;\n  height: 40px;\n  background: rgba(255, 255, 255, 0.1);\n  border: 1px solid rgba(255, 255, 255, 0.2);\n  border-radius: 8px;\n  color: #ffffff;\n  cursor: pointer;\n  transition: all 0.3s ease;\n}\n.breadcrumb-section .breadcrumb-nav .breadcrumb-container .back-button[data-v-2dfa067e]:hover {\n  background: rgba(255, 255, 255, 0.15);\n  border-color: rgba(255, 255, 255, 0.3);\n  transform: translateY(-1px);\n  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);\n  color: #dc3545;\n}\n.breadcrumb-section .breadcrumb-nav .breadcrumb-container .back-button i[data-v-2dfa067e] {\n  font-size: 1.1em;\n}\n.breadcrumb-section .breadcrumb-nav .breadcrumb-container .breadcrumb[data-v-2dfa067e] {\n  display: flex;\n  align-items: center;\n  gap: 0.5rem;\n  margin: 0;\n  padding: 0;\n  background: none;\n  border-radius: 0;\n}\n.breadcrumb-section .breadcrumb-nav .breadcrumb-container .breadcrumb .breadcrumb-item[data-v-2dfa067e] {\n  display: flex;\n  align-items: center;\n  gap: 0.5rem;\n  font-size: 0.875rem;\n  color: #ffffff;\n}\n.breadcrumb-section .breadcrumb-nav .breadcrumb-container .breadcrumb .breadcrumb-item.active[data-v-2dfa067e] {\n  color: #252525;\n  font-weight: 600;\n}\n.breadcrumb-section .breadcrumb-nav .breadcrumb-container .breadcrumb .breadcrumb-item.active i[data-v-2dfa067e] {\n  color: #dc3545;\n}\n.breadcrumb-section .breadcrumb-nav .breadcrumb-container .breadcrumb .breadcrumb-item a[data-v-2dfa067e] {\n  display: flex;\n  align-items: center;\n  gap: 0.5rem;\n  color: #6a6a6a;\n  text-decoration: none;\n  transition: color 0.3s ease;\n}\n.breadcrumb-section .breadcrumb-nav .breadcrumb-container .breadcrumb .breadcrumb-item a[data-v-2dfa067e]:hover {\n  color: #dc3545;\n}\n.breadcrumb-section .breadcrumb-nav .breadcrumb-container .breadcrumb .breadcrumb-item a:hover i[data-v-2dfa067e] {\n  color: #dc3545;\n}\n.breadcrumb-section .breadcrumb-nav .breadcrumb-container .breadcrumb .breadcrumb-item a i[data-v-2dfa067e] {\n  font-size: 0.9em;\n  transition: color 0.3s ease;\n}\n.breadcrumb-section .breadcrumb-nav .breadcrumb-container .breadcrumb .breadcrumb-item[data-v-2dfa067e]:not(:last-child)::after {\n  content: \"›\";\n  margin-left: 0.5rem;\n  color: #6a6a6a;\n  font-size: 1.2em;\n}\n.action-section[data-v-2dfa067e] {\n  display: flex;\n  align-items: center;\n}\n.action-section .action-btn[data-v-2dfa067e] {\n  display: flex;\n  align-items: center;\n  gap: 0.5rem;\n  padding: 0.5rem 1rem;\n  border-radius: 8px;\n  font-size: 0.875rem;\n  font-weight: 500;\n  transition: all 0.3s ease;\n}\n.action-section .action-btn[data-v-2dfa067e]:hover:not(:disabled) {\n  transform: translateY(-1px);\n  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);\n}\n.action-section .action-btn[data-v-2dfa067e]:disabled {\n  opacity: 0.6;\n  cursor: not-allowed;\n}\n.action-section .action-btn i[data-v-2dfa067e] {\n  font-size: 0.9em;\n}\n@media (max-width: 768px) {\n.breadcrumb-nav-row[data-v-2dfa067e] {\n    flex-direction: column;\n    align-items: flex-start;\n    gap: 0.5rem;\n}\n.breadcrumb-section[data-v-2dfa067e] {\n    width: 100%;\n}\n.breadcrumb-section .breadcrumb-container[data-v-2dfa067e] {\n    flex-direction: column;\n    align-items: flex-start;\n    gap: 0.5rem;\n}\n.breadcrumb-section .breadcrumb-container .breadcrumb[data-v-2dfa067e] {\n    flex-wrap: wrap;\n}\n.breadcrumb-section .breadcrumb-container .breadcrumb .breadcrumb-item[data-v-2dfa067e] {\n    font-size: 0.8rem;\n}\n.breadcrumb-section .breadcrumb-container .breadcrumb .breadcrumb-item a[data-v-2dfa067e] {\n    font-size: 0.8rem;\n}\n.action-section[data-v-2dfa067e] {\n    width: 100%;\n    justify-content: flex-end;\n}\n.action-section .action-btn[data-v-2dfa067e] {\n    font-size: 0.8rem;\n    padding: 0.4rem 0.8rem;\n}\n}\n/* ===========================================\n   RESPONSIVE UTILITY CLASSES (ALL DEVICES)\n   =========================================== */\n.show-xs-only[data-v-2dfa067e],\n.show-sm-only[data-v-2dfa067e],\n.show-md-only[data-v-2dfa067e],\n.show-lg-only[data-v-2dfa067e],\n.show-xl-only[data-v-2dfa067e] {\n  display: none !important;\n}\n@media (max-width: 575px) {\n.hide-xs[data-v-2dfa067e] {\n    display: none !important;\n}\n.show-xs-only[data-v-2dfa067e] {\n    display: initial !important;\n}\n}\n@media (min-width: 576px) and (max-width: 767px) {\n.hide-sm[data-v-2dfa067e] {\n    display: none !important;\n}\n.show-sm-only[data-v-2dfa067e] {\n    display: initial !important;\n}\n}\n@media (min-width: 768px) and (max-width: 991px) {\n.hide-md[data-v-2dfa067e] {\n    display: none !important;\n}\n.show-md-only[data-v-2dfa067e] {\n    display: initial !important;\n}\n}\n@media (min-width: 992px) and (max-width: 1199px) {\n.hide-lg[data-v-2dfa067e] {\n    display: none !important;\n}\n.show-lg-only[data-v-2dfa067e] {\n    display: initial !important;\n}\n}\n@media (min-width: 1200px) {\n.hide-xl[data-v-2dfa067e] {\n    display: none !important;\n}\n.show-xl-only[data-v-2dfa067e] {\n    display: initial !important;\n}\n}\n@media (max-width: 576px) {\n.hide-sm-down[data-v-2dfa067e] {\n    display: none !important;\n}\n}\n@media (max-width: 768px) {\n.hide-md-down[data-v-2dfa067e] {\n    display: none !important;\n}\n}\n@media (max-width: 992px) {\n.hide-lg-down[data-v-2dfa067e] {\n    display: none !important;\n}\n}\n@media (min-width: 576px) {\n.hide-sm-up[data-v-2dfa067e] {\n    display: none !important;\n}\n}\n@media (min-width: 768px) {\n.hide-md-up[data-v-2dfa067e] {\n    display: none !important;\n}\n}\n@media (min-width: 992px) {\n.hide-lg-up[data-v-2dfa067e] {\n    display: none !important;\n}\n}\n@media (max-width: 575px) {\n.d-xs-none[data-v-2dfa067e] {\n    display: none !important;\n}\n.d-xs-block[data-v-2dfa067e] {\n    display: block !important;\n}\n.d-xs-flex[data-v-2dfa067e] {\n    display: flex !important;\n}\n}\n@media (min-width: 576px) and (max-width: 767px) {\n.d-sm-none[data-v-2dfa067e] {\n    display: none !important;\n}\n.d-sm-block[data-v-2dfa067e] {\n    display: block !important;\n}\n.d-sm-flex[data-v-2dfa067e] {\n    display: flex !important;\n}\n}\n@media (min-width: 768px) and (max-width: 991px) {\n.d-md-none[data-v-2dfa067e] {\n    display: none !important;\n}\n.d-md-block[data-v-2dfa067e] {\n    display: block !important;\n}\n.d-md-flex[data-v-2dfa067e] {\n    display: flex !important;\n}\n}\n@media (min-width: 992px) and (max-width: 1199px) {\n.d-lg-none[data-v-2dfa067e] {\n    display: none !important;\n}\n.d-lg-block[data-v-2dfa067e] {\n    display: block !important;\n}\n.d-lg-flex[data-v-2dfa067e] {\n    display: flex !important;\n}\n}\n@media (min-width: 1200px) {\n.d-xl-none[data-v-2dfa067e] {\n    display: none !important;\n}\n.d-xl-block[data-v-2dfa067e] {\n    display: block !important;\n}\n.d-xl-flex[data-v-2dfa067e] {\n    display: flex !important;\n}\n}\n@media (min-width: 576px) {\n.custom-modal-xl[data-v-2dfa067e] {\n    max-width: 1500px !important;\n}\n}\n.checkin-page[data-v-2dfa067e] {\n  padding: 20px;\n}\n.breadcrumb-nav-row[data-v-2dfa067e] {\n  margin-bottom: 20px;\n  gap: 20px;\n}\n.breadcrumb-section[data-v-2dfa067e] {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n}\n.breadcrumb .breadcrumb-item[data-v-2dfa067e]:not(:last-child)::after {\n  margin: 0 10px;\n  color: #6a6a6a;\n}\n.back-btn[data-v-2dfa067e] {\n  border-radius: 8px;\n  padding: 0.5rem 0.75rem;\n  border: 1px solid #cccccc;\n  background: #ffffff;\n  color: #252525;\n  transition: all 0.2s ease;\n}\n.back-btn[data-v-2dfa067e]:hover {\n  background: #eaeaea;\n  border-color: #dc3545;\n  color: #dc3545;\n}\n.back-btn[data-v-2dfa067e]:focus {\n  box-shadow: 0 0 0 0.2rem rgba(220, 53, 69, 0.25);\n}\n.back-btn i[data-v-2dfa067e] {\n  font-size: 0.875rem;\n}\n.visitors-card[data-v-2dfa067e] {\n  background: linear-gradient(135deg, #e8f5e9 0%, #c8e6c9 100%);\n  border: none;\n  border-radius: 16px;\n  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);\n}\n.visitors-card .visitors-icon[data-v-2dfa067e] {\n  width: 50px;\n  height: 50px;\n  background: #4caf50;\n  border-radius: 50%;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  margin-right: 20px;\n}\n.visitors-card .visitors-icon i[data-v-2dfa067e] {\n  color: #ffffff;\n  font-size: 1.2rem;\n}\n.visitors-card .visitors-title[data-v-2dfa067e] {\n  color: #252525;\n  font-weight: 500;\n  margin-bottom: 8px;\n}\n.visitors-card .visitors-count .count-number[data-v-2dfa067e] {\n  font-size: 2rem;\n  font-weight: 700;\n  color: #4caf50;\n}\n.visitors-card .visitors-count .count-divider[data-v-2dfa067e] {\n  font-size: 1.5rem;\n  color: #6a6a6a;\n  margin: 0 8px;\n}\n.visitors-card .visitors-count .count-total[data-v-2dfa067e] {\n  font-size: 1.2rem;\n  color: #6a6a6a;\n}\n.search-input[data-v-2dfa067e] {\n  padding-left: 2.5rem;\n  border-radius: 8px;\n  border: 1px solid #cccccc;\n}\n.search-input[data-v-2dfa067e]:focus {\n  border-color: #dc3545;\n  box-shadow: 0 0 0 0.2rem rgba(220, 53, 69, 0.25);\n}\n.search-icon[data-v-2dfa067e] {\n  position: absolute;\n  left: 0.75rem;\n  top: 50%;\n  transform: translateY(-50%);\n  color: #6a6a6a;\n  z-index: 10;\n}\n.checkin-btn[data-v-2dfa067e] {\n  border-radius: 8px;\n  font-weight: 500;\n  padding: 0.75rem 1rem;\n}\n.checkin-mode-toggle .btn[data-v-2dfa067e] {\n  min-width: 180px;\n  font-weight: 500;\n}\n.selected-member-pill[data-v-2dfa067e] {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n  padding: 0.5rem 0.75rem;\n  border: 1px dashed #dc3545;\n  border-radius: 8px;\n  background-color: rgba(220, 53, 69, 0.05);\n}\n.search-suggestions[data-v-2dfa067e] {\n  position: absolute;\n  top: calc(100% + 6px);\n  left: 0;\n  width: 100%;\n  max-height: 220px;\n  overflow-y: auto;\n  background: #ffffff;\n  border: 1px solid #cccccc;\n  border-radius: 8px;\n  box-shadow: 0 10px 15px rgba(0, 0, 0, 0.2);\n  z-index: 20;\n}\n.suggestion-item[data-v-2dfa067e] {\n  width: 100%;\n  text-align: left;\n  border: none;\n  background: transparent;\n  padding: 0.5rem 0.75rem;\n  border-bottom: 1px solid #e0e0e0;\n  transition: background 0.2s ease;\n}\n.suggestion-item[data-v-2dfa067e]:last-child {\n  border-bottom: none;\n}\n.suggestion-item[data-v-2dfa067e]:hover {\n  background: #f5f5f3;\n}\n.member-avatar[data-v-2dfa067e] {\n  width: 32px;\n  height: 32px;\n  background: #eaeaea;\n  border-radius: 50%;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  margin-right: 10px;\n}\n.member-avatar i[data-v-2dfa067e] {\n  color: #6a6a6a;\n  font-size: 0.875rem;\n}\n.member-name[data-v-2dfa067e] {\n  font-size: 0.875rem;\n  color: #252525;\n  font-weight: 600;\n  margin-bottom: 0;\n}\n.checkin-time[data-v-2dfa067e], .checkout-time[data-v-2dfa067e] {\n  font-family: \"Inter\", \"Segoe UI\", \"Roboto\", \"Helvetica Neue\", Arial, sans-serif;\n  font-size: 0.875rem;\n  color: #252525;\n  font-weight: 400;\n}\n.message-content[data-v-2dfa067e] {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n.message-content .status-dot[data-v-2dfa067e] {\n  width: 8px;\n  height: 8px;\n  background: #4caf50;\n  border-radius: 50%;\n  margin-right: 8px;\n}\n.checkins-table-card .card-body[data-v-2dfa067e] {\n  padding: 0 !important;\n}\n.checkins-table[data-v-2dfa067e] {\n  width: 100%;\n  border-collapse: collapse;\n  font-size: 0.875rem;\n  margin-bottom: 0;\n}\n.checkins-table th[data-v-2dfa067e] {\n  background: #f8f9fa;\n  color: #252525;\n  font-weight: 600;\n  padding: 1rem 0.75rem;\n  text-align: left;\n  border-bottom: 2px solid #dee2e6;\n  white-space: nowrap;\n}\n.checkins-table .table-header[data-v-2dfa067e] {\n  background: #f8f9fa;\n  color: #252525;\n  font-weight: 600;\n  padding: 12px 5px;\n  text-align: center;\n  border-bottom: 2px solid #dee2e6;\n  white-space: nowrap;\n  position: sticky;\n  top: 0;\n  z-index: 10;\n  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);\n}\n.checkins-table .table-header[data-v-2dfa067e]:first-child {\n  text-align: left;\n}\n.checkins-table td[data-v-2dfa067e] {\n  padding: 0.75rem;\n  border-bottom: 1px solid #dee2e6;\n  vertical-align: top;\n}\n.checkins-table .table-row[data-v-2dfa067e] {\n  transition: background-color 0.2s ease;\n  cursor: pointer;\n}\n.checkins-table .table-row[data-v-2dfa067e]:nth-child(even) {\n  background-color: #f8f9fa;\n}\n.checkins-table .table-row[data-v-2dfa067e]:hover {\n  background-color: #eaeaea;\n  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);\n}\n.checkins-table .table-cell[data-v-2dfa067e] {\n  padding: 0px;\n  vertical-align: middle;\n  color: #252525;\n  font-family: \"Inter\", \"Segoe UI\", \"Roboto\", \"Helvetica Neue\", Arial, sans-serif;\n  font-size: 0.875rem;\n  font-weight: 400;\n  border: none;\n  text-align: center;\n}\n.checkins-table .table-cell[data-v-2dfa067e]:first-child {\n  text-align: left;\n}\n.checkins-table .btn-group .btn[data-v-2dfa067e] {\n  margin-right: 8px;\n}\n.checkins-table .btn-group .btn[data-v-2dfa067e]:last-child {\n  margin-right: 0;\n}\n.loading-container[data-v-2dfa067e] {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  padding: 4rem 2rem;\n  min-height: 300px;\n}\n.modern-spinner[data-v-2dfa067e] {\n  position: relative;\n  width: 60px;\n  height: 60px;\n  margin-bottom: 1.5rem;\n}\n.spinner-ring[data-v-2dfa067e] {\n  position: absolute;\n  width: 100%;\n  height: 100%;\n  border: 4px solid transparent;\n  border-top-color: #dc3545;\n  border-radius: 50%;\n  animation: spin-data-v-2dfa067e 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;\n}\n.spinner-ring[data-v-2dfa067e]:nth-child(1) {\n  animation-delay: -0.45s;\n  border-top-color: #dc3545;\n  opacity: 1;\n}\n.spinner-ring[data-v-2dfa067e]:nth-child(2) {\n  animation-delay: -0.3s;\n  border-top-color: rgb(231.2974683544, 118.2025316456, 129.0379746835);\n  opacity: 0.8;\n  width: 80%;\n  height: 80%;\n  top: 10%;\n  left: 10%;\n}\n.spinner-ring[data-v-2dfa067e]:nth-child(3) {\n  animation-delay: -0.15s;\n  border-top-color: rgb(242.5949367089, 183.4050632911, 189.0759493671);\n  opacity: 0.6;\n  width: 60%;\n  height: 60%;\n  top: 20%;\n  left: 20%;\n}\n@keyframes spin-data-v-2dfa067e {\n0% {\n    transform: rotate(0deg);\n}\n100% {\n    transform: rotate(360deg);\n}\n}\n.loading-text[data-v-2dfa067e] {\n  color: #6a6a6a;\n  font-size: 0.875rem;\n  font-weight: 500;\n  margin: 0;\n  animation: pulse-data-v-2dfa067e 1.5s ease-in-out infinite;\n}\n@keyframes pulse-data-v-2dfa067e {\n0%, 100% {\n    opacity: 0.6;\n}\n50% {\n    opacity: 1;\n}\n}\n@media (max-width: 768px) {\n.checkin-page[data-v-2dfa067e] {\n    padding: 10px;\n}\n.visitors-card .visitors-count .count-number[data-v-2dfa067e] {\n    font-size: 1.5rem;\n}\n.table-responsive[data-v-2dfa067e] {\n    font-size: 0.875rem;\n}\n}\n@media (max-width: 576px) {\n.breadcrumb-nav-row[data-v-2dfa067e] {\n    flex-direction: column;\n    align-items: flex-start;\n}\n.breadcrumb-section[data-v-2dfa067e] {\n    flex-direction: column;\n    align-items: flex-start;\n    width: 100%;\n}\n.breadcrumb-section .back-btn[data-v-2dfa067e] {\n    margin-bottom: 10px;\n    margin-right: 0;\n}\n.action-section[data-v-2dfa067e] {\n    width: 100%;\n    margin-top: 10px;\n}\n.visitors-card .d-flex[data-v-2dfa067e] {\n    flex-direction: column;\n    text-align: center;\n}\n.visitors-card .d-flex .visitors-icon[data-v-2dfa067e] {\n    margin-right: 0;\n    margin-bottom: 10px;\n}\n}", ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-12.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12.use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-12.use[3]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/CheckIn/CheckIn.vue?vue&type=style&index=0&id=2dfa067e&lang=scss&scoped=true":
/*!**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-12.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12.use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-12.use[3]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/CheckIn/CheckIn.vue?vue&type=style&index=0&id=2dfa067e&lang=scss&scoped=true ***!
  \**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../../../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_clonedRuleSet_12_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_12_use_2_node_modules_sass_loader_dist_cjs_js_clonedRuleSet_12_use_3_node_modules_vue_loader_lib_index_js_vue_loader_options_CheckIn_vue_vue_type_style_index_0_id_2dfa067e_lang_scss_scoped_true__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !!../../../../../../node_modules/css-loader/dist/cjs.js??clonedRuleSet-12.use[1]!../../../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12.use[2]!../../../../../../node_modules/sass-loader/dist/cjs.js??clonedRuleSet-12.use[3]!../../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./CheckIn.vue?vue&type=style&index=0&id=2dfa067e&lang=scss&scoped=true */ "./node_modules/css-loader/dist/cjs.js??clonedRuleSet-12.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12.use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-12.use[3]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/CheckIn/CheckIn.vue?vue&type=style&index=0&id=2dfa067e&lang=scss&scoped=true");

            

var options = {};

options.insert = "head";
options.singleton = false;

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_clonedRuleSet_12_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_12_use_2_node_modules_sass_loader_dist_cjs_js_clonedRuleSet_12_use_3_node_modules_vue_loader_lib_index_js_vue_loader_options_CheckIn_vue_vue_type_style_index_0_id_2dfa067e_lang_scss_scoped_true__WEBPACK_IMPORTED_MODULE_1__["default"], options);



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_clonedRuleSet_12_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_12_use_2_node_modules_sass_loader_dist_cjs_js_clonedRuleSet_12_use_3_node_modules_vue_loader_lib_index_js_vue_loader_options_CheckIn_vue_vue_type_style_index_0_id_2dfa067e_lang_scss_scoped_true__WEBPACK_IMPORTED_MODULE_1__["default"].locals || {});

/***/ }),

/***/ "./resources/src/views/app/pages/CheckIn/CheckIn.vue":
/*!***********************************************************!*\
  !*** ./resources/src/views/app/pages/CheckIn/CheckIn.vue ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _CheckIn_vue_vue_type_template_id_2dfa067e_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./CheckIn.vue?vue&type=template&id=2dfa067e&scoped=true */ "./resources/src/views/app/pages/CheckIn/CheckIn.vue?vue&type=template&id=2dfa067e&scoped=true");
/* harmony import */ var _CheckIn_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./CheckIn.vue?vue&type=script&lang=js */ "./resources/src/views/app/pages/CheckIn/CheckIn.vue?vue&type=script&lang=js");
/* harmony import */ var _CheckIn_vue_vue_type_style_index_0_id_2dfa067e_lang_scss_scoped_true__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./CheckIn.vue?vue&type=style&index=0&id=2dfa067e&lang=scss&scoped=true */ "./resources/src/views/app/pages/CheckIn/CheckIn.vue?vue&type=style&index=0&id=2dfa067e&lang=scss&scoped=true");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");



;


/* normalize component */

var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _CheckIn_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__["default"],
  _CheckIn_vue_vue_type_template_id_2dfa067e_scoped_true__WEBPACK_IMPORTED_MODULE_0__.render,
  _CheckIn_vue_vue_type_template_id_2dfa067e_scoped_true__WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  "2dfa067e",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/src/views/app/pages/CheckIn/CheckIn.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./resources/src/views/app/pages/CheckIn/CheckIn.vue?vue&type=script&lang=js":
/*!***********************************************************************************!*\
  !*** ./resources/src/views/app/pages/CheckIn/CheckIn.vue?vue&type=script&lang=js ***!
  \***********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_CheckIn_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./CheckIn.vue?vue&type=script&lang=js */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/CheckIn/CheckIn.vue?vue&type=script&lang=js");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_CheckIn_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/src/views/app/pages/CheckIn/CheckIn.vue?vue&type=style&index=0&id=2dfa067e&lang=scss&scoped=true":
/*!********************************************************************************************************************!*\
  !*** ./resources/src/views/app/pages/CheckIn/CheckIn.vue?vue&type=style&index=0&id=2dfa067e&lang=scss&scoped=true ***!
  \********************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_dist_cjs_js_node_modules_css_loader_dist_cjs_js_clonedRuleSet_12_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_12_use_2_node_modules_sass_loader_dist_cjs_js_clonedRuleSet_12_use_3_node_modules_vue_loader_lib_index_js_vue_loader_options_CheckIn_vue_vue_type_style_index_0_id_2dfa067e_lang_scss_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/style-loader/dist/cjs.js!../../../../../../node_modules/css-loader/dist/cjs.js??clonedRuleSet-12.use[1]!../../../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12.use[2]!../../../../../../node_modules/sass-loader/dist/cjs.js??clonedRuleSet-12.use[3]!../../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./CheckIn.vue?vue&type=style&index=0&id=2dfa067e&lang=scss&scoped=true */ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-12.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12.use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-12.use[3]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/CheckIn/CheckIn.vue?vue&type=style&index=0&id=2dfa067e&lang=scss&scoped=true");


/***/ }),

/***/ "./resources/src/views/app/pages/CheckIn/CheckIn.vue?vue&type=template&id=2dfa067e&scoped=true":
/*!*****************************************************************************************************!*\
  !*** ./resources/src/views/app/pages/CheckIn/CheckIn.vue?vue&type=template&id=2dfa067e&scoped=true ***!
  \*****************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_CheckIn_vue_vue_type_template_id_2dfa067e_scoped_true__WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   staticRenderFns: () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_CheckIn_vue_vue_type_template_id_2dfa067e_scoped_true__WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_CheckIn_vue_vue_type_template_id_2dfa067e_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./CheckIn.vue?vue&type=template&id=2dfa067e&scoped=true */ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/CheckIn/CheckIn.vue?vue&type=template&id=2dfa067e&scoped=true");


/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/CheckIn/CheckIn.vue?vue&type=template&id=2dfa067e&scoped=true":
/*!********************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/CheckIn/CheckIn.vue?vue&type=template&id=2dfa067e&scoped=true ***!
  \********************************************************************************************************************************************************************************************************************************************/
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
  return _c("div", { staticClass: "checkin-page" }, [
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
            ]),
          ]
        ),
      ]),
      _vm._v(" "),
      _c("div", { staticClass: "action-section ms-3" }, [
        _c(
          "button",
          {
            staticClass: "action-btn btn btn-outline-secondary filter-btn",
            attrs: { disabled: _vm.loading },
            on: { click: _vm.exportData },
          },
          [
            _c("i", { staticClass: "fas fa-download" }),
            _vm._v("\n                Export\n            "),
          ]
        ),
      ]),
    ]),
    _vm._v(" "),
    _c("div", { staticClass: "row mb-4" }, [
      _c("div", { staticClass: "col-md-12" }, [
        _c("div", { staticClass: "card visitors-card" }, [
          _c("div", { staticClass: "card-body" }, [
            _c("div", { staticClass: "row align-items-center" }, [
              _c("div", { staticClass: "col-md-3" }, [
                _c("div", { staticClass: "d-flex align-items-center" }, [
                  _vm._m(1),
                  _vm._v(" "),
                  _c("div", { staticClass: "visitors-content" }, [
                    _c("h6", { staticClass: "visitors-title" }, [
                      _vm._v("Visitors right now"),
                    ]),
                    _vm._v(" "),
                    _c("div", { staticClass: "visitors-count" }, [
                      _c("span", { staticClass: "count-number" }, [
                        _vm._v(_vm._s(_vm.currentVisitors.active_visitors)),
                      ]),
                      _vm._v(" "),
                      _c("span", { staticClass: "count-divider" }, [
                        _vm._v("/"),
                      ]),
                      _vm._v(" "),
                      _c("span", { staticClass: "count-total" }, [
                        _vm._v(_vm._s(_vm.currentVisitors.total_today)),
                      ]),
                    ]),
                  ]),
                ]),
              ]),
              _vm._v(" "),
              _c("div", { staticClass: "col-md-9" }, [
                _c("div", { staticClass: "row" }, [
                  _c("div", { staticClass: "col-md-3" }, [
                    _c("label", { staticClass: "form-label small" }, [
                      _vm._v("Date Filter"),
                    ]),
                    _vm._v(" "),
                    _c(
                      "select",
                      {
                        directives: [
                          {
                            name: "model",
                            rawName: "v-model",
                            value: _vm.selectedDate,
                            expression: "selectedDate",
                          },
                        ],
                        staticClass: "form-select form-select-sm",
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
                              _vm.selectedDate = $event.target.multiple
                                ? $$selectedVal
                                : $$selectedVal[0]
                            },
                            _vm.loadCheckIns,
                          ],
                        },
                      },
                      [
                        _c("option", { attrs: { value: "today" } }, [
                          _vm._v(
                            "Today (" + _vm._s(_vm.formatDate(_vm.today)) + ")"
                          ),
                        ]),
                        _vm._v(" "),
                        _c("option", { attrs: { value: "yesterday" } }, [
                          _vm._v("Yesterday"),
                        ]),
                        _vm._v(" "),
                        _c("option", { attrs: { value: "week" } }, [
                          _vm._v("This Week"),
                        ]),
                        _vm._v(" "),
                        _c("option", { attrs: { value: "month" } }, [
                          _vm._v("This Month"),
                        ]),
                        _vm._v(" "),
                        _c("option", { attrs: { value: "custom" } }, [
                          _vm._v("Custom Date"),
                        ]),
                      ]
                    ),
                  ]),
                  _vm._v(" "),
                  _vm.selectedDate === "custom"
                    ? _c("div", { staticClass: "col-md-3" }, [
                        _c("label", { staticClass: "form-label small" }, [
                          _vm._v("Select Date"),
                        ]),
                        _vm._v(" "),
                        _c("input", {
                          directives: [
                            {
                              name: "model",
                              rawName: "v-model",
                              value: _vm.customDate,
                              expression: "customDate",
                            },
                          ],
                          staticClass: "form-control form-control-sm",
                          attrs: { type: "date" },
                          domProps: { value: _vm.customDate },
                          on: {
                            change: _vm.loadCheckIns,
                            input: function ($event) {
                              if ($event.target.composing) {
                                return
                              }
                              _vm.customDate = $event.target.value
                            },
                          },
                        }),
                      ])
                    : _vm._e(),
                  _vm._v(" "),
                  _c("div", { staticClass: "col-md-3" }, [
                    _c("label", { staticClass: "form-label small" }, [
                      _vm._v("Status Filter"),
                    ]),
                    _vm._v(" "),
                    _c(
                      "select",
                      {
                        directives: [
                          {
                            name: "model",
                            rawName: "v-model",
                            value: _vm.visitorFilter,
                            expression: "visitorFilter",
                          },
                        ],
                        staticClass: "form-select form-select-sm",
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
                              _vm.visitorFilter = $event.target.multiple
                                ? $$selectedVal
                                : $$selectedVal[0]
                            },
                            _vm.loadCheckIns,
                          ],
                        },
                      },
                      [
                        _c("option", { attrs: { value: "all" } }, [
                          _vm._v("All visitors"),
                        ]),
                        _vm._v(" "),
                        _c("option", { attrs: { value: "active" } }, [
                          _vm._v("Active visitors"),
                        ]),
                      ]
                    ),
                  ]),
                  _vm._v(" "),
                  _c("div", { staticClass: "col-md-3" }, [
                    _c("label", { staticClass: "form-label small" }, [
                      _vm._v("Search Visitor"),
                    ]),
                    _vm._v(" "),
                    _c("input", {
                      directives: [
                        {
                          name: "model",
                          rawName: "v-model",
                          value: _vm.searchVisitorName,
                          expression: "searchVisitorName",
                        },
                      ],
                      staticClass: "form-control form-control-sm",
                      attrs: { type: "text", placeholder: "Search by name..." },
                      domProps: { value: _vm.searchVisitorName },
                      on: {
                        input: [
                          function ($event) {
                            if ($event.target.composing) {
                              return
                            }
                            _vm.searchVisitorName = $event.target.value
                          },
                          _vm.onSearchInput,
                        ],
                      },
                    }),
                  ]),
                ]),
              ]),
            ]),
          ]),
        ]),
      ]),
    ]),
    _vm._v(" "),
    _c("div", { staticClass: "row mb-4" }, [
      _c("div", { staticClass: "col-12" }, [
        _c("div", { staticClass: "card" }, [
          _c("div", { staticClass: "card-body" }, [
            _c("div", { staticClass: "row g-3 align-items-end" }, [
              _c("div", { staticClass: "col-12" }, [
                _c(
                  "div",
                  {
                    staticClass: "btn-group checkin-mode-toggle",
                    attrs: { role: "group" },
                  },
                  [
                    _c(
                      "button",
                      {
                        staticClass: "btn",
                        class:
                          _vm.checkInMode === "member"
                            ? "btn-primary"
                            : "btn-outline-primary",
                        attrs: { type: "button" },
                        on: {
                          click: function ($event) {
                            return _vm.setCheckInMode("member")
                          },
                        },
                      },
                      [
                        _c("i", { staticClass: "fas fa-users me-2" }),
                        _vm._v(
                          "\n                                    Existing Member\n                                "
                        ),
                      ]
                    ),
                    _vm._v(" "),
                    _c(
                      "button",
                      {
                        staticClass: "btn",
                        class:
                          _vm.checkInMode === "visitor"
                            ? "btn-primary"
                            : "btn-outline-primary",
                        attrs: { type: "button" },
                        on: {
                          click: function ($event) {
                            return _vm.setCheckInMode("visitor")
                          },
                        },
                      },
                      [
                        _c("i", { staticClass: "fas fa-user-plus me-2" }),
                        _vm._v(
                          "\n                                    New Visitor\n                                "
                        ),
                      ]
                    ),
                  ]
                ),
              ]),
              _vm._v(" "),
              _vm.isMemberMode
                ? _c("div", { staticClass: "col-md-6" }, [
                    _c("label", { staticClass: "form-label" }, [
                      _vm._v("Search Member"),
                    ]),
                    _vm._v(" "),
                    _c("div", { staticClass: "position-relative" }, [
                      _c("input", {
                        directives: [
                          {
                            name: "model",
                            rawName: "v-model",
                            value: _vm.memberSearchQuery,
                            expression: "memberSearchQuery",
                          },
                        ],
                        staticClass: "form-control search-input",
                        attrs: {
                          type: "text",
                          placeholder: "Type name, email, or ID...",
                          disabled: _vm.memberSearchLoading,
                        },
                        domProps: { value: _vm.memberSearchQuery },
                        on: {
                          input: [
                            function ($event) {
                              if ($event.target.composing) {
                                return
                              }
                              _vm.memberSearchQuery = $event.target.value
                            },
                            _vm.onMemberSearchInput,
                          ],
                        },
                      }),
                      _vm._v(" "),
                      _c("i", { staticClass: "fas fa-search search-icon" }),
                      _vm._v(" "),
                      _vm.showMemberSuggestions
                        ? _c(
                            "div",
                            { staticClass: "search-suggestions" },
                            [
                              _vm._l(
                                _vm.memberSearchResults,
                                function (member) {
                                  return _c(
                                    "button",
                                    {
                                      key: member.id,
                                      staticClass: "suggestion-item",
                                      attrs: { type: "button" },
                                      on: {
                                        click: function ($event) {
                                          return _vm.selectMember(member)
                                        },
                                      },
                                    },
                                    [
                                      _c(
                                        "div",
                                        { staticClass: "fw-semibold" },
                                        [
                                          _vm._v(
                                            "\n                                            " +
                                              _vm._s(member.name) +
                                              "\n                                        "
                                          ),
                                        ]
                                      ),
                                      _vm._v(" "),
                                      _c(
                                        "small",
                                        { staticClass: "text-muted d-block" },
                                        [
                                          _vm._v(
                                            "\n                                            " +
                                              _vm._s(
                                                member.email ||
                                                  "No email on file"
                                              ) +
                                              "\n                                        "
                                          ),
                                        ]
                                      ),
                                    ]
                                  )
                                }
                              ),
                              _vm._v(" "),
                              !_vm.memberSearchResults.length &&
                              !_vm.memberSearchLoading
                                ? _c(
                                    "div",
                                    {
                                      staticClass: "px-3 py-2 text-muted small",
                                    },
                                    [
                                      _vm._v(
                                        "\n                                        No members found\n                                    "
                                      ),
                                    ]
                                  )
                                : _vm._e(),
                              _vm._v(" "),
                              _vm.memberSearchLoading
                                ? _c(
                                    "div",
                                    {
                                      staticClass: "px-3 py-2 text-muted small",
                                    },
                                    [
                                      _vm._v(
                                        "\n                                        Searching...\n                                    "
                                      ),
                                    ]
                                  )
                                : _vm._e(),
                            ],
                            2
                          )
                        : _vm._e(),
                    ]),
                    _vm._v(" "),
                    _vm.selectedMember
                      ? _c(
                          "div",
                          { staticClass: "selected-member-pill mt-2" },
                          [
                            _c("div", [
                              _c("strong", [
                                _vm._v(_vm._s(_vm.selectedMember.name)),
                              ]),
                              _vm._v(" "),
                              _c(
                                "small",
                                { staticClass: "d-block text-muted" },
                                [
                                  _vm._v(
                                    "\n                                        " +
                                      _vm._s(
                                        _vm.selectedMember.email ||
                                          _vm.selectedMember.membername ||
                                          "No email"
                                      ) +
                                      "\n                                    "
                                  ),
                                ]
                              ),
                            ]),
                            _vm._v(" "),
                            _c(
                              "button",
                              {
                                staticClass:
                                  "btn btn-link text-danger p-0 ms-auto",
                                attrs: { type: "button" },
                                on: { click: _vm.clearSelectedMember },
                              },
                              [_c("i", { staticClass: "fas fa-times" })]
                            ),
                          ]
                        )
                      : _vm._e(),
                  ])
                : _c("div", { staticClass: "col-md-6" }, [
                    _c("label", { staticClass: "form-label" }, [
                      _vm._v("Visitor Name"),
                    ]),
                    _vm._v(" "),
                    _c("div", { staticClass: "position-relative" }, [
                      _c("input", {
                        directives: [
                          {
                            name: "model",
                            rawName: "v-model",
                            value: _vm.visitorName,
                            expression: "visitorName",
                          },
                        ],
                        staticClass: "form-control search-input",
                        attrs: {
                          type: "text",
                          placeholder: "Enter visitor name...",
                        },
                        domProps: { value: _vm.visitorName },
                        on: {
                          keyup: function ($event) {
                            if (
                              !$event.type.indexOf("key") &&
                              _vm._k(
                                $event.keyCode,
                                "enter",
                                13,
                                $event.key,
                                "Enter"
                              )
                            ) {
                              return null
                            }
                            return _vm.handleCheckIn.apply(null, arguments)
                          },
                          input: function ($event) {
                            if ($event.target.composing) {
                              return
                            }
                            _vm.visitorName = $event.target.value
                          },
                        },
                      }),
                      _vm._v(" "),
                      _c("i", { staticClass: "fas fa-user-plus search-icon" }),
                    ]),
                  ]),
              _vm._v(" "),
              _c("div", { staticClass: "col-md-3" }, [
                _c("label", { staticClass: "form-label" }, [
                  _vm._v("Message (Optional)"),
                ]),
                _vm._v(" "),
                _c("input", {
                  directives: [
                    {
                      name: "model",
                      rawName: "v-model",
                      value: _vm.visitorMessage,
                      expression: "visitorMessage",
                    },
                  ],
                  staticClass: "form-control",
                  attrs: { type: "text", placeholder: "Optional note..." },
                  domProps: { value: _vm.visitorMessage },
                  on: {
                    keyup: function ($event) {
                      if (
                        !$event.type.indexOf("key") &&
                        _vm._k($event.keyCode, "enter", 13, $event.key, "Enter")
                      ) {
                        return null
                      }
                      return _vm.handleCheckIn.apply(null, arguments)
                    },
                    input: function ($event) {
                      if ($event.target.composing) {
                        return
                      }
                      _vm.visitorMessage = $event.target.value
                    },
                  },
                }),
              ]),
              _vm._v(" "),
              _c("div", { staticClass: "col-md-3" }, [
                _c("label", { staticClass: "form-label" }, [_vm._v(" ")]),
                _vm._v(" "),
                _c(
                  "button",
                  {
                    staticClass: "btn btn-primary checkin-btn w-100",
                    attrs: { disabled: _vm.loading || !_vm.canSubmitCheckIn },
                    on: { click: _vm.handleCheckIn },
                  },
                  [
                    _c("i", { staticClass: "fas fa-sign-in-alt me-2" }),
                    _vm._v(
                      "\n                                " +
                        _vm._s(
                          _vm.isMemberMode
                            ? "Check-in Member"
                            : "Check-in Visitor"
                        ) +
                        "\n                            "
                    ),
                  ]
                ),
              ]),
            ]),
          ]),
        ]),
      ]),
    ]),
    _vm._v(" "),
    _c("div", { staticClass: "row" }, [
      _c("div", { staticClass: "col-12" }, [
        _c("div", { staticClass: "card checkins-table-card" }, [
          _c("div", { staticClass: "card-header" }, [
            _c("h5", { staticClass: "card-title mb-0" }, [
              _vm._v(
                "\n                        Check-ins (" +
                  _vm._s(_vm.checkIns.length) +
                  ")\n                    "
              ),
            ]),
          ]),
          _vm._v(" "),
          _c("div", { staticClass: "card-body p-0" }, [
            _vm.loading
              ? _c("div", { staticClass: "loading-container" }, [
                  _vm._m(2),
                  _vm._v(" "),
                  _c("p", { staticClass: "loading-text" }, [
                    _vm._v("Loading visitors..."),
                  ]),
                ])
              : _vm.checkIns.length === 0
              ? _c("div", { staticClass: "text-center p-4" }, [
                  _c("i", {
                    staticClass: "fas fa-users fa-3x text-muted mb-3",
                  }),
                  _vm._v(" "),
                  _c("p", { staticClass: "text-muted" }, [
                    _vm._v("No visitors found"),
                  ]),
                ])
              : _c("div", { staticClass: "table-responsive" }, [
                  _c(
                    "table",
                    { staticClass: "table table-hover checkins-table" },
                    [
                      _vm._m(3),
                      _vm._v(" "),
                      _c(
                        "tbody",
                        _vm._l(_vm.checkIns, function (checkIn) {
                          return _c(
                            "tr",
                            { key: checkIn.id, staticClass: "table-row" },
                            [
                              _c(
                                "td",
                                { staticClass: "table-cell text-left" },
                                [
                                  _c(
                                    "div",
                                    {
                                      staticClass: "d-flex align-items-center",
                                    },
                                    [
                                      _vm._m(4, true),
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
                                                "\n                                                    " +
                                                  _vm._s(
                                                    checkIn.member_name ||
                                                      checkIn.visitor_name ||
                                                      (checkIn.member &&
                                                        checkIn.member
                                                          .membername) ||
                                                      "N/A"
                                                  ) +
                                                  "\n                                                "
                                              ),
                                            ]
                                          ),
                                        ]
                                      ),
                                    ]
                                  ),
                                ]
                              ),
                              _vm._v(" "),
                              _c(
                                "td",
                                { staticClass: "table-cell text-center" },
                                [
                                  _c("span", { staticClass: "checkin-time" }, [
                                    _vm._v(
                                      "\n                                            " +
                                        _vm._s(
                                          _vm.formatDateTime(
                                            checkIn.check_in_time
                                          )
                                        ) +
                                        "\n                                        "
                                    ),
                                  ]),
                                ]
                              ),
                              _vm._v(" "),
                              _c(
                                "td",
                                { staticClass: "table-cell text-center" },
                                [
                                  checkIn.check_out_time
                                    ? _c(
                                        "span",
                                        { staticClass: "checkout-time" },
                                        [
                                          _vm._v(
                                            "\n                                            " +
                                              _vm._s(
                                                _vm.formatDateTime(
                                                  checkIn.check_out_time
                                                )
                                              ) +
                                              "\n                                        "
                                          ),
                                        ]
                                      )
                                    : _c(
                                        "span",
                                        { staticClass: "text-success" },
                                        [
                                          _c("i", {
                                            staticClass: "fas fa-circle me-1",
                                          }),
                                          _vm._v(
                                            "\n                                            Active\n                                        "
                                          ),
                                        ]
                                      ),
                                ]
                              ),
                              _vm._v(" "),
                              _c(
                                "td",
                                { staticClass: "table-cell text-center" },
                                [
                                  _c(
                                    "div",
                                    { staticClass: "message-content" },
                                    [
                                      _c("span", { staticClass: "status-dot" }),
                                      _vm._v(
                                        "\n                                            " +
                                          _vm._s(checkIn.message || "N/A") +
                                          "\n                                        "
                                      ),
                                    ]
                                  ),
                                ]
                              ),
                              _vm._v(" "),
                              _c(
                                "td",
                                { staticClass: "table-cell text-center" },
                                [
                                  _c(
                                    "div",
                                    {
                                      staticClass: "btn-group",
                                      attrs: { role: "group" },
                                    },
                                    [
                                      !checkIn.check_out_time
                                        ? _c(
                                            "button",
                                            {
                                              staticClass:
                                                "btn btn-sm btn-outline-success",
                                              attrs: { title: "Check out" },
                                              on: {
                                                click: function ($event) {
                                                  $event.stopPropagation()
                                                  return _vm.checkOut(
                                                    checkIn.id
                                                  )
                                                },
                                              },
                                            },
                                            [
                                              _c("i", {
                                                staticClass:
                                                  "fas fa-sign-out-alt",
                                              }),
                                            ]
                                          )
                                        : _vm._e(),
                                      _vm._v(" "),
                                      _c(
                                        "button",
                                        {
                                          staticClass:
                                            "btn btn-sm btn-outline-danger",
                                          attrs: { title: "Delete" },
                                          on: {
                                            click: function ($event) {
                                              $event.stopPropagation()
                                              return _vm.deleteCheckIn(
                                                checkIn.id
                                              )
                                            },
                                          },
                                        },
                                        [
                                          _c("i", {
                                            staticClass: "fas fa-trash",
                                          }),
                                        ]
                                      ),
                                    ]
                                  ),
                                ]
                              ),
                            ]
                          )
                        }),
                        0
                      ),
                    ]
                  ),
                ]),
          ]),
        ]),
      ]),
    ]),
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
        _c("i", { staticClass: "fas fa-sign-in-alt" }),
        _vm._v(
          "\n                            Check-in\n                        "
        ),
      ]
    )
  },
  function () {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "visitors-icon" }, [
      _c("i", { staticClass: "fas fa-wifi" }),
    ])
  },
  function () {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "modern-spinner" }, [
      _c("div", { staticClass: "spinner-ring" }),
      _vm._v(" "),
      _c("div", { staticClass: "spinner-ring" }),
      _vm._v(" "),
      _c("div", { staticClass: "spinner-ring" }),
    ])
  },
  function () {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("thead", [
      _c("tr", [
        _c("th", { staticClass: "table-header text-left" }, [_vm._v("Name")]),
        _vm._v(" "),
        _c("th", { staticClass: "table-header text-center" }, [
          _vm._v("Check-in Time"),
        ]),
        _vm._v(" "),
        _c("th", { staticClass: "table-header text-center" }, [
          _vm._v("Check-out Time"),
        ]),
        _vm._v(" "),
        _c("th", { staticClass: "table-header text-center" }, [
          _vm._v("Message"),
        ]),
        _vm._v(" "),
        _c("th", { staticClass: "table-header text-center" }, [
          _vm._v("Actions"),
        ]),
      ]),
    ])
  },
  function () {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "member-avatar" }, [
      _c("i", { staticClass: "fas fa-user" }),
    ])
  },
]
render._withStripped = true



/***/ })

}]);