"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["resources_src_views_app_pages_Support_Support_vue"],{

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/Support/Support.vue?vue&type=script&lang=js":
/*!***************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/Support/Support.vue?vue&type=script&lang=js ***!
  \***************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
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
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
  name: "Support",
  data: function data() {
    return {
      // Loading states
      isLoading: true,
      isSaving: false,
      // Data
      tickets: [],
      statistics: {},
      selectedTicket: null,
      // Pagination
      pagination: {
        current_page: 1,
        last_page: 1,
        per_page: 15,
        total: 0
      },
      // Filters
      filters: {
        search: '',
        status: '',
        priority: '',
        per_page: 15
      },
      // Form data
      form: {
        id: null,
        name: '',
        email: '',
        subject: '',
        message: '',
        status: 'pending',
        priority: 'medium'
      },
      // Modal states
      isEditing: false,
      // Search debounce
      searchTimeout: null
    };
  },
  computed: {
    visiblePages: function visiblePages() {
      var current = this.pagination.current_page;
      var last = this.pagination.last_page;
      var pages = [];
      var start = Math.max(1, current - 2);
      var end = Math.min(last, current + 2);
      for (var i = start; i <= end; i++) {
        pages.push(i);
      }
      return pages;
    }
  },
  mounted: function mounted() {
    this.loadData();
    this.loadStatistics();
  },
  methods: {
    loadData: function loadData() {
      var _this = this;
      return _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
        var params, response, ticketsData;
        return _regeneratorRuntime().wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              _this.isLoading = true;
              params = {
                page: _this.pagination.current_page,
                per_page: _this.filters.per_page
              }; // Only add non-empty filters
              if (_this.filters.search && _this.filters.search.trim() !== '') {
                params.search = _this.filters.search;
              }
              if (_this.filters.status && _this.filters.status !== '') {
                params.status = _this.filters.status;
              }
              if (_this.filters.priority && _this.filters.priority !== '') {
                params.priority = _this.filters.priority;
              }
              _context.next = 8;
              return axios.get('support', {
                params: params
              });
            case 8:
              response = _context.sent;
              if (response.data && response.data.success) {
                // Handle different response structures
                ticketsData = [];
                if (response.data.data && response.data.data.data) {
                  // Laravel pagination structure: { success: true, data: { data: [...] } }
                  ticketsData = response.data.data.data;
                } else if (response.data.data && Array.isArray(response.data.data)) {
                  // Direct array structure: { success: true, data: [...] }
                  ticketsData = response.data.data;
                } else if (Array.isArray(response.data)) {
                  // Direct response array
                  ticketsData = response.data;
                }
                _this.tickets = ticketsData;

                // Set pagination if available
                if (response.data.data && response.data.data.current_page) {
                  _this.pagination = {
                    current_page: response.data.data.current_page || 1,
                    last_page: response.data.data.last_page || 1,
                    per_page: response.data.data.per_page || 15,
                    total: response.data.data.total || ticketsData.length
                  };
                } else {
                  _this.pagination = {
                    current_page: 1,
                    last_page: 1,
                    per_page: 15,
                    total: ticketsData.length
                  };
                }
              } else {
                console.error('API response not successful:', response.data);
                _this.tickets = [];
              }
              _context.next = 18;
              break;
            case 12:
              _context.prev = 12;
              _context.t0 = _context["catch"](0);
              console.error('Error loading tickets:', _context.t0);
              console.error('Error details:', _context.t0.response);
              _this.showError('Failed to load support tickets: ' + (_context.t0.message || 'Unknown error'));
              _this.tickets = [];
            case 18:
              _context.prev = 18;
              _this.isLoading = false;
              return _context.finish(18);
            case 21:
            case "end":
              return _context.stop();
          }
        }, _callee, null, [[0, 12, 18, 21]]);
      }))();
    },
    loadStatistics: function loadStatistics() {
      var _this2 = this;
      return _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee2() {
        var response;
        return _regeneratorRuntime().wrap(function _callee2$(_context2) {
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
              _context2.prev = 0;
              _context2.next = 3;
              return axios.get('support/statistics');
            case 3:
              response = _context2.sent;
              if (response.data.success) {
                _this2.statistics = response.data.data;
              }
              _context2.next = 10;
              break;
            case 7:
              _context2.prev = 7;
              _context2.t0 = _context2["catch"](0);
              console.error('Error loading statistics:', _context2.t0);
            case 10:
            case "end":
              return _context2.stop();
          }
        }, _callee2, null, [[0, 7]]);
      }))();
    },
    goBack: function goBack() {
      // Go back to previous page in browser history
      if (window.history.length > 1) {
        this.$router.go(-1);
      } else {
        // Fallback to dashboard if no history
        this.$router.push('/app/Members/ViewAllMembers');
      }
    },
    applyFilters: function applyFilters() {
      this.pagination.current_page = 1;
      this.loadData();
    },
    debouncedSearch: function debouncedSearch() {
      var _this3 = this;
      clearTimeout(this.searchTimeout);
      this.searchTimeout = setTimeout(function () {
        _this3.applyFilters();
      }, 500);
    },
    clearFilters: function clearFilters() {
      this.filters = {
        search: '',
        status: '',
        priority: '',
        per_page: 15
      };
      this.applyFilters();
    },
    changePage: function changePage(page) {
      if (page >= 1 && page <= this.pagination.last_page) {
        this.pagination.current_page = page;
        this.loadData();
      }
    },
    openCreateModal: function openCreateModal() {
      this.isEditing = false;
      this.form = {
        id: null,
        name: '',
        email: '',
        subject: '',
        message: '',
        status: 'pending',
        priority: 'medium'
      };
      this.showModal('ticketModal');
    },
    viewTicket: function viewTicket(ticket) {
      this.selectedTicket = ticket;
      this.showModal('viewModal');
    },
    editTicket: function editTicket(ticket) {
      this.isEditing = true;
      this.form = _objectSpread({}, ticket);
      this.hideModal('viewModal');
      this.showModal('ticketModal');
    },
    saveTicket: function saveTicket() {
      var _this4 = this;
      return _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee3() {
        var url, method, response;
        return _regeneratorRuntime().wrap(function _callee3$(_context3) {
          while (1) switch (_context3.prev = _context3.next) {
            case 0:
              _context3.prev = 0;
              _this4.isSaving = true;
              url = _this4.isEditing ? "support/".concat(_this4.form.id) : 'support';
              method = _this4.isEditing ? 'put' : 'post';
              _context3.next = 6;
              return axios[method](url, _this4.form);
            case 6:
              response = _context3.sent;
              if (!response.data.success) {
                _context3.next = 16;
                break;
              }
              console.log('Ticket saved successfully:', response.data); // Debug log
              _this4.showSuccess(_this4.isEditing ? 'Ticket updated successfully' : 'Ticket created successfully');
              _this4.hideModal('ticketModal');

              // Reset form
              _this4.form = {
                id: null,
                name: '',
                email: '',
                subject: '',
                message: '',
                status: 'pending',
                priority: 'medium'
              };
              _this4.isEditing = false;

              // Refresh data
              _context3.next = 15;
              return _this4.loadData();
            case 15:
              // Force a small delay to ensure data is loaded
              setTimeout(function () {
                console.log('Final tickets count:', _this4.tickets.length);
                if (_this4.tickets.length === 0) {
                  console.log('No tickets found, forcing reload...');
                  _this4.loadData();
                }
              }, 500);
            case 16:
              _context3.next = 22;
              break;
            case 18:
              _context3.prev = 18;
              _context3.t0 = _context3["catch"](0);
              console.error('Error saving ticket:', _context3.t0);
              _this4.showError('Failed to save ticket');
            case 22:
              _context3.prev = 22;
              _this4.isSaving = false;
              return _context3.finish(22);
            case 25:
            case "end":
              return _context3.stop();
          }
        }, _callee3, null, [[0, 18, 22, 25]]);
      }))();
    },
    deleteTicket: function deleteTicket(ticket) {
      var _this5 = this;
      return _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee4() {
        return _regeneratorRuntime().wrap(function _callee4$(_context4) {
          while (1) switch (_context4.prev = _context4.next) {
            case 0:
              _this5.selectedTicket = ticket;
              _this5.showModal('deleteModal');
            case 2:
            case "end":
              return _context4.stop();
          }
        }, _callee4);
      }))();
    },
    confirmDelete: function confirmDelete() {
      var _this6 = this;
      return _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee5() {
        var response;
        return _regeneratorRuntime().wrap(function _callee5$(_context5) {
          while (1) switch (_context5.prev = _context5.next) {
            case 0:
              if (_this6.selectedTicket) {
                _context5.next = 2;
                break;
              }
              return _context5.abrupt("return");
            case 2:
              _context5.prev = 2;
              _context5.next = 5;
              return axios["delete"]("support/".concat(_this6.selectedTicket.id));
            case 5:
              response = _context5.sent;
              if (response.data.success) {
                _this6.showSuccess('Ticket deleted successfully');
                _this6.hideModal('deleteModal');
                _this6.loadData();
              }
              _context5.next = 13;
              break;
            case 9:
              _context5.prev = 9;
              _context5.t0 = _context5["catch"](2);
              console.error('Error deleting ticket:', _context5.t0);
              _this6.showError('Failed to delete ticket');
            case 13:
            case "end":
              return _context5.stop();
          }
        }, _callee5, null, [[2, 9]]);
      }))();
    },
    showModal: function showModal(modalId) {
      // Wait for DOM to be ready
      this.$nextTick(function () {
        var modalElement = document.getElementById(modalId);
        if (modalElement) {
          modalElement.style.display = 'block';
          modalElement.classList.add('show');
          document.body.classList.add('modal-open');

          // Add backdrop
          var backdrop = document.createElement('div');
          backdrop.className = 'modal-backdrop fade show';
          backdrop.id = 'modal-backdrop';
          backdrop.style.backgroundColor = 'rgba(0, 0, 0, 0.5)'; // Dark semi-transparent overlay
          document.body.appendChild(backdrop);
        }
      });
    },
    hideModal: function hideModal(modalId) {
      var modalElement = document.getElementById(modalId);
      if (modalElement) {
        modalElement.style.display = 'none';
        modalElement.classList.remove('show');
        document.body.classList.remove('modal-open');

        // Remove backdrop
        var backdrop = document.getElementById('modal-backdrop');
        if (backdrop) {
          backdrop.remove();
        }
      }
    },
    handleBackdropClick: function handleBackdropClick(modalId, event) {
      // Only close if clicking on the backdrop (not the modal content)
      if (event.target.id === modalId) {
        this.hideModal(modalId);
      }
    },
    getStatusTextClass: function getStatusTextClass(status) {
      var classes = {
        'pending': 'text-warning',
        'in_progress': 'text-info',
        'resolved': 'text-success',
        'closed': 'text-secondary'
      };
      return classes[status] || 'text-muted';
    },
    getPriorityTextClass: function getPriorityTextClass(priority) {
      var classes = {
        'low': 'text-success',
        'medium': 'text-warning',
        'high': 'text-danger'
      };
      return classes[priority] || 'text-muted';
    },
    formatStatus: function formatStatus(status) {
      return status.replace('_', ' ').replace(/\b\w/g, function (l) {
        return l.toUpperCase();
      });
    },
    formatPriority: function formatPriority(priority) {
      return priority.charAt(0).toUpperCase() + priority.slice(1);
    },
    formatDate: function formatDate(dateString) {
      return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    },
    showSuccess: function showSuccess(message) {
      try {
        if (this.$root && this.$root.$bvToast) {
          this.$root.$bvToast.toast(message, {
            title: "Success",
            variant: "success",
            solid: true
          });
        } else {
          // Fallback to console log if toast is not available
          console.log("Success:", message);
          alert("Success: " + message);
        }
      } catch (error) {
        console.log("Success:", message);
        alert("Success: " + message);
      }
    },
    showError: function showError(message) {
      try {
        if (this.$root && this.$root.$bvToast) {
          this.$root.$bvToast.toast(message, {
            title: "Error",
            variant: "danger",
            solid: true
          });
        } else {
          // Fallback to console log if toast is not available
          console.error("Error:", message);
          alert("Error: " + message);
        }
      } catch (error) {
        console.error("Error:", message);
        alert("Error: " + message);
      }
    }
  }
});

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js??clonedRuleSet-12.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12.use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-12.use[3]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/Support/Support.vue?vue&type=style&index=0&id=dfe6acfc&lang=scss&scoped=true":
/*!******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??clonedRuleSet-12.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12.use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-12.use[3]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/Support/Support.vue?vue&type=style&index=0&id=dfe6acfc&lang=scss&scoped=true ***!
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
___CSS_LOADER_EXPORT___.push([module.id, "@charset \"UTF-8\";\n.filter-btn .btn[data-v-dfe6acfc],\n.filter-btn .btn-secondary[data-v-dfe6acfc],\n.filter-btn .btn-outline-secondary[data-v-dfe6acfc],\n.filter-btn button.btn[data-v-dfe6acfc],\n.filter-btn button.btn-secondary[data-v-dfe6acfc] {\n  color: #000 !important;\n  background-color: transparent !important;\n  border-color: #6c757d !important;\n}\n.filter-btn .btn[data-v-dfe6acfc]:hover,\n.filter-btn .btn-secondary[data-v-dfe6acfc]:hover,\n.filter-btn .btn-outline-secondary[data-v-dfe6acfc]:hover,\n.filter-btn button.btn[data-v-dfe6acfc]:hover,\n.filter-btn button.btn-secondary[data-v-dfe6acfc]:hover {\n  color: #dc3545 !important;\n  background-color: transparent !important;\n  border-color: #dc3545 !important;\n  box-shadow: none !important;\n}\n.filter-btn .btn[data-v-dfe6acfc]:focus,\n.filter-btn .btn-secondary[data-v-dfe6acfc]:focus,\n.filter-btn .btn-outline-secondary[data-v-dfe6acfc]:focus,\n.filter-btn button.btn[data-v-dfe6acfc]:focus,\n.filter-btn button.btn-secondary[data-v-dfe6acfc]:focus {\n  color: #dc3545 !important;\n  background-color: transparent !important;\n  border-color: #dc3545 !important;\n  box-shadow: none !important;\n}\n.filter-btn .btn[data-v-dfe6acfc]:active,\n.filter-btn .btn-secondary[data-v-dfe6acfc]:active,\n.filter-btn .btn-outline-secondary[data-v-dfe6acfc]:active,\n.filter-btn button.btn[data-v-dfe6acfc]:active,\n.filter-btn button.btn-secondary[data-v-dfe6acfc]:active {\n  color: #dc3545 !important;\n  background-color: transparent !important;\n  border-color: #dc3545 !important;\n}\n.btn-secondary[data-v-dfe6acfc]:not(:disabled):not(.disabled):active:focus {\n  box-shadow: none !important;\n}\n\n/* ===========================================\n   COMMON BREADCRUMB NAVIGATION STYLES\n   =========================================== */\n.breadcrumb-nav-row[data-v-dfe6acfc] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  margin-bottom: 0.5rem;\n  gap: 0.5rem;\n}\n.breadcrumb-section[data-v-dfe6acfc] {\n  flex: 1;\n}\n.breadcrumb-section .breadcrumb-nav .breadcrumb-container[data-v-dfe6acfc] {\n  display: flex;\n  align-items: center;\n  gap: 1rem;\n}\n.breadcrumb-section .breadcrumb-nav .breadcrumb-container .back-button[data-v-dfe6acfc] {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  width: 40px;\n  height: 40px;\n  background: rgba(255, 255, 255, 0.1);\n  border: 1px solid rgba(255, 255, 255, 0.2);\n  border-radius: 8px;\n  color: #ffffff;\n  cursor: pointer;\n  transition: all 0.3s ease;\n}\n.breadcrumb-section .breadcrumb-nav .breadcrumb-container .back-button[data-v-dfe6acfc]:hover {\n  background: rgba(255, 255, 255, 0.15);\n  border-color: rgba(255, 255, 255, 0.3);\n  transform: translateY(-1px);\n  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);\n  color: #dc3545;\n}\n.breadcrumb-section .breadcrumb-nav .breadcrumb-container .back-button i[data-v-dfe6acfc] {\n  font-size: 1.1em;\n}\n.breadcrumb-section .breadcrumb-nav .breadcrumb-container .breadcrumb[data-v-dfe6acfc] {\n  display: flex;\n  align-items: center;\n  gap: 0.5rem;\n  margin: 0;\n  padding: 0;\n  background: none;\n  border-radius: 0;\n}\n.breadcrumb-section .breadcrumb-nav .breadcrumb-container .breadcrumb .breadcrumb-item[data-v-dfe6acfc] {\n  display: flex;\n  align-items: center;\n  gap: 0.5rem;\n  font-size: 0.875rem;\n  color: #ffffff;\n}\n.breadcrumb-section .breadcrumb-nav .breadcrumb-container .breadcrumb .breadcrumb-item.active[data-v-dfe6acfc] {\n  color: #252525;\n  font-weight: 600;\n}\n.breadcrumb-section .breadcrumb-nav .breadcrumb-container .breadcrumb .breadcrumb-item.active i[data-v-dfe6acfc] {\n  color: #dc3545;\n}\n.breadcrumb-section .breadcrumb-nav .breadcrumb-container .breadcrumb .breadcrumb-item a[data-v-dfe6acfc] {\n  display: flex;\n  align-items: center;\n  gap: 0.5rem;\n  color: #6a6a6a;\n  text-decoration: none;\n  transition: color 0.3s ease;\n}\n.breadcrumb-section .breadcrumb-nav .breadcrumb-container .breadcrumb .breadcrumb-item a[data-v-dfe6acfc]:hover {\n  color: #dc3545;\n}\n.breadcrumb-section .breadcrumb-nav .breadcrumb-container .breadcrumb .breadcrumb-item a:hover i[data-v-dfe6acfc] {\n  color: #dc3545;\n}\n.breadcrumb-section .breadcrumb-nav .breadcrumb-container .breadcrumb .breadcrumb-item a i[data-v-dfe6acfc] {\n  font-size: 0.9em;\n  transition: color 0.3s ease;\n}\n.breadcrumb-section .breadcrumb-nav .breadcrumb-container .breadcrumb .breadcrumb-item[data-v-dfe6acfc]:not(:last-child)::after {\n  content: \"›\";\n  margin-left: 0.5rem;\n  color: #6a6a6a;\n  font-size: 1.2em;\n}\n.action-section[data-v-dfe6acfc] {\n  display: flex;\n  align-items: center;\n}\n.action-section .action-btn[data-v-dfe6acfc] {\n  display: flex;\n  align-items: center;\n  gap: 0.5rem;\n  padding: 0.5rem 1rem;\n  border-radius: 8px;\n  font-size: 0.875rem;\n  font-weight: 500;\n  transition: all 0.3s ease;\n}\n.action-section .action-btn[data-v-dfe6acfc]:hover:not(:disabled) {\n  transform: translateY(-1px);\n  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);\n}\n.action-section .action-btn[data-v-dfe6acfc]:disabled {\n  opacity: 0.6;\n  cursor: not-allowed;\n}\n.action-section .action-btn i[data-v-dfe6acfc] {\n  font-size: 0.9em;\n}\n@media (max-width: 768px) {\n.breadcrumb-nav-row[data-v-dfe6acfc] {\n    flex-direction: column;\n    align-items: flex-start;\n    gap: 0.5rem;\n}\n.breadcrumb-section[data-v-dfe6acfc] {\n    width: 100%;\n}\n.breadcrumb-section .breadcrumb-container[data-v-dfe6acfc] {\n    flex-direction: column;\n    align-items: flex-start;\n    gap: 0.5rem;\n}\n.breadcrumb-section .breadcrumb-container .breadcrumb[data-v-dfe6acfc] {\n    flex-wrap: wrap;\n}\n.breadcrumb-section .breadcrumb-container .breadcrumb .breadcrumb-item[data-v-dfe6acfc] {\n    font-size: 0.8rem;\n}\n.breadcrumb-section .breadcrumb-container .breadcrumb .breadcrumb-item a[data-v-dfe6acfc] {\n    font-size: 0.8rem;\n}\n.action-section[data-v-dfe6acfc] {\n    width: 100%;\n    justify-content: flex-end;\n}\n.action-section .action-btn[data-v-dfe6acfc] {\n    font-size: 0.8rem;\n    padding: 0.4rem 0.8rem;\n}\n}\n/* ===========================================\n   RESPONSIVE UTILITY CLASSES (ALL DEVICES)\n   =========================================== */\n.show-xs-only[data-v-dfe6acfc],\n.show-sm-only[data-v-dfe6acfc],\n.show-md-only[data-v-dfe6acfc],\n.show-lg-only[data-v-dfe6acfc],\n.show-xl-only[data-v-dfe6acfc] {\n  display: none !important;\n}\n@media (max-width: 575px) {\n.hide-xs[data-v-dfe6acfc] {\n    display: none !important;\n}\n.show-xs-only[data-v-dfe6acfc] {\n    display: initial !important;\n}\n}\n@media (min-width: 576px) and (max-width: 767px) {\n.hide-sm[data-v-dfe6acfc] {\n    display: none !important;\n}\n.show-sm-only[data-v-dfe6acfc] {\n    display: initial !important;\n}\n}\n@media (min-width: 768px) and (max-width: 991px) {\n.hide-md[data-v-dfe6acfc] {\n    display: none !important;\n}\n.show-md-only[data-v-dfe6acfc] {\n    display: initial !important;\n}\n}\n@media (min-width: 992px) and (max-width: 1199px) {\n.hide-lg[data-v-dfe6acfc] {\n    display: none !important;\n}\n.show-lg-only[data-v-dfe6acfc] {\n    display: initial !important;\n}\n}\n@media (min-width: 1200px) {\n.hide-xl[data-v-dfe6acfc] {\n    display: none !important;\n}\n.show-xl-only[data-v-dfe6acfc] {\n    display: initial !important;\n}\n}\n@media (max-width: 576px) {\n.hide-sm-down[data-v-dfe6acfc] {\n    display: none !important;\n}\n}\n@media (max-width: 768px) {\n.hide-md-down[data-v-dfe6acfc] {\n    display: none !important;\n}\n}\n@media (max-width: 992px) {\n.hide-lg-down[data-v-dfe6acfc] {\n    display: none !important;\n}\n}\n@media (min-width: 576px) {\n.hide-sm-up[data-v-dfe6acfc] {\n    display: none !important;\n}\n}\n@media (min-width: 768px) {\n.hide-md-up[data-v-dfe6acfc] {\n    display: none !important;\n}\n}\n@media (min-width: 992px) {\n.hide-lg-up[data-v-dfe6acfc] {\n    display: none !important;\n}\n}\n@media (max-width: 575px) {\n.d-xs-none[data-v-dfe6acfc] {\n    display: none !important;\n}\n.d-xs-block[data-v-dfe6acfc] {\n    display: block !important;\n}\n.d-xs-flex[data-v-dfe6acfc] {\n    display: flex !important;\n}\n}\n@media (min-width: 576px) and (max-width: 767px) {\n.d-sm-none[data-v-dfe6acfc] {\n    display: none !important;\n}\n.d-sm-block[data-v-dfe6acfc] {\n    display: block !important;\n}\n.d-sm-flex[data-v-dfe6acfc] {\n    display: flex !important;\n}\n}\n@media (min-width: 768px) and (max-width: 991px) {\n.d-md-none[data-v-dfe6acfc] {\n    display: none !important;\n}\n.d-md-block[data-v-dfe6acfc] {\n    display: block !important;\n}\n.d-md-flex[data-v-dfe6acfc] {\n    display: flex !important;\n}\n}\n@media (min-width: 992px) and (max-width: 1199px) {\n.d-lg-none[data-v-dfe6acfc] {\n    display: none !important;\n}\n.d-lg-block[data-v-dfe6acfc] {\n    display: block !important;\n}\n.d-lg-flex[data-v-dfe6acfc] {\n    display: flex !important;\n}\n}\n@media (min-width: 1200px) {\n.d-xl-none[data-v-dfe6acfc] {\n    display: none !important;\n}\n.d-xl-block[data-v-dfe6acfc] {\n    display: block !important;\n}\n.d-xl-flex[data-v-dfe6acfc] {\n    display: flex !important;\n}\n}\n@media (min-width: 576px) {\n.custom-modal-xl[data-v-dfe6acfc] {\n    max-width: 1500px !important;\n}\n}\n.support-page-wrapper[data-v-dfe6acfc] {\n  min-height: 100vh;\n  background-color: #f5f5f3;\n  padding: 20px;\n}\n[data-v-dfe6acfc]:deep(.modal-backdrop) {\n  background-color: rgba(0, 0, 0, 0.5) !important;\n  opacity: 1 !important;\n}\n[data-v-dfe6acfc]:deep(.modal) {\n  z-index: 1050;\n}\n[data-v-dfe6acfc]:deep(.modal-dialog) {\n  margin: 1.75rem auto;\n  max-width: 500px;\n}\n[data-v-dfe6acfc]:deep(.modal-content) {\n  border: none;\n  border-radius: 8px;\n  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);\n}\n[data-v-dfe6acfc]:deep(.modal-header) {\n  background-color: #f8f9fa;\n  border-bottom: 1px solid #dee2e6;\n  border-radius: 8px 8px 0 0;\n}\n[data-v-dfe6acfc]:deep(.modal-body) {\n  padding: 1.5rem;\n}\n[data-v-dfe6acfc]:deep(.modal-footer) {\n  background-color: #f8f9fa;\n  border-top: 1px solid #dee2e6;\n  border-radius: 0 0 8px 8px;\n}\n.loading-container[data-v-dfe6acfc] {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  min-height: 400px;\n}\n.loading-container .loading-spinner[data-v-dfe6acfc] {\n  text-align: center;\n}\n.loading-container .loading-spinner .spinner-border[data-v-dfe6acfc] {\n  width: 3rem;\n  height: 3rem;\n  color: #dc3545;\n}\n.loading-container .loading-spinner .loading-text[data-v-dfe6acfc] {\n  margin-top: 20px;\n  color: #6a6a6a;\n  font-size: 18px;\n}\n.page-header[data-v-dfe6acfc] {\n  margin-bottom: 30px;\n}\n.page-header .breadcrumb-nav-row[data-v-dfe6acfc] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  margin-bottom: 20px;\n}\n.breadcrumb-section[data-v-dfe6acfc] {\n  display: flex;\n  align-items: center;\n  flex: 0 0 auto;\n}\n.breadcrumb-nav[data-v-dfe6acfc] {\n  margin-bottom: 0;\n}\n.breadcrumb-container[data-v-dfe6acfc] {\n  gap: 15px;\n}\n.breadcrumb[data-v-dfe6acfc] {\n  background: transparent;\n  padding: 0;\n  margin: 0;\n  list-style: none;\n  display: flex;\n  flex-wrap: wrap;\n  align-items: center;\n}\n.breadcrumb-item[data-v-dfe6acfc] {\n  display: flex;\n  align-items: center;\n}\n.breadcrumb-item + .breadcrumb-item[data-v-dfe6acfc]::before {\n  content: \"/\";\n  padding: 0 8px;\n  color: #6c757d;\n}\n.breadcrumb-item a[data-v-dfe6acfc] {\n  color: #dc3545;\n  text-decoration: none;\n  display: flex;\n  align-items: center;\n  gap: 6px;\n  transition: color 0.3s ease;\n}\n.breadcrumb-item a[data-v-dfe6acfc]:hover {\n  color: rgb(189.2151898734, 32.7848101266, 47.7721518987);\n  text-decoration: none;\n}\n.breadcrumb-item a i[data-v-dfe6acfc] {\n  font-size: 0.875rem;\n}\n.breadcrumb-item.active[data-v-dfe6acfc] {\n  color: #6c757d;\n  font-weight: 500;\n}\n.breadcrumb-item.active i[data-v-dfe6acfc] {\n  color: #dc3545;\n  margin-right: 6px;\n}\n.back-button[data-v-dfe6acfc] {\n  background: rgba(255, 255, 255, 0.2);\n  color: white;\n  border: 2px solid rgba(255, 255, 255, 0.4);\n  border-radius: 50%;\n  font-size: 1rem;\n  transition: all 0.3s ease;\n  -webkit-backdrop-filter: blur(10px);\n          backdrop-filter: blur(10px);\n  width: 35px;\n  height: 35px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  cursor: pointer;\n  margin-right: 10px;\n}\n.back-button[data-v-dfe6acfc]:hover {\n  background: rgba(255, 255, 255, 0.3);\n  transform: translateY(-2px);\n}\n.page-title-section[data-v-dfe6acfc] {\n  margin-top: 20px;\n}\n.page-title-section .page-title[data-v-dfe6acfc] {\n  font-size: 32px;\n  font-weight: 700;\n  color: #252525;\n  margin-bottom: 8px;\n}\n.page-title-section .page-title i[data-v-dfe6acfc] {\n  color: #dc3545;\n}\n.page-title-section .page-subtitle[data-v-dfe6acfc] {\n  color: #6a6a6a;\n  font-size: 18px;\n  margin-bottom: 0;\n}\n.page-title-section .page-subtitle .debug-info[data-v-dfe6acfc] {\n  color: #dc3545;\n  font-weight: 600;\n  font-size: 14px;\n}\n.statistics-section .stat-card-simple[data-v-dfe6acfc] {\n  background: #ffffff;\n  border-radius: 8px;\n  padding: 20px;\n  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);\n  border: 1px solid #e0e0e0;\n  text-align: center;\n}\n.statistics-section .stat-card-simple .stat-number[data-v-dfe6acfc] {\n  display: block;\n  font-size: 28px;\n  font-weight: 700;\n  color: #dc3545;\n  margin-bottom: 5px;\n}\n.statistics-section .stat-card-simple .stat-label[data-v-dfe6acfc] {\n  display: block;\n  font-size: 14px;\n  color: #6c757d;\n  font-weight: 500;\n  margin: 0;\n}\n.statistics-section .stat-card[data-v-dfe6acfc] {\n  background: #ffffff;\n  border-radius: 8px;\n  padding: 20px;\n  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);\n  border: 1px solid #e0e0e0;\n  transition: none;\n}\n.statistics-section .stat-card .stat-icon[data-v-dfe6acfc] {\n  width: 50px;\n  height: 50px;\n  border-radius: 50%;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  margin-bottom: 10px;\n}\n.statistics-section .stat-card .stat-icon i[data-v-dfe6acfc] {\n  font-size: 20px;\n  color: #ffffff;\n}\n.statistics-section .stat-card .stat-icon.warning[data-v-dfe6acfc] {\n  background: #ff9800;\n}\n.statistics-section .stat-card .stat-icon.info[data-v-dfe6acfc] {\n  background: #2196f3;\n}\n.statistics-section .stat-card .stat-icon.success[data-v-dfe6acfc] {\n  background: #4caf50;\n}\n.statistics-section .stat-card .stat-icon[data-v-dfe6acfc]:not(.warning):not(.info):not(.success) {\n  background: #dc3545;\n}\n.statistics-section .stat-card .stat-content .stat-number[data-v-dfe6acfc] {\n  font-size: 24px;\n  font-weight: 700;\n  color: #252525;\n  margin-bottom: 8px;\n}\n.statistics-section .stat-card .stat-content .stat-label[data-v-dfe6acfc] {\n  color: #6a6a6a;\n  font-size: 14px;\n  margin-bottom: 0;\n}\n.filters-section .card[data-v-dfe6acfc] {\n  border: 1px solid #e0e0e0;\n  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);\n}\n.filters-section .card .search-box[data-v-dfe6acfc] {\n  position: relative;\n}\n.filters-section .card .search-box .search-icon[data-v-dfe6acfc] {\n  position: absolute;\n  left: 12px;\n  top: 50%;\n  transform: translateY(-50%);\n  color: #6a6a6a;\n  z-index: 2;\n}\n.filters-section .card .search-box .search-input[data-v-dfe6acfc] {\n  padding-left: 40px;\n  border: 1px solid #cccccc;\n  border-radius: 4px;\n}\n.filters-section .card .search-box .search-input[data-v-dfe6acfc]:focus {\n  border-color: #dc3545;\n  box-shadow: 0 0 0 0.2rem rgba(220, 53, 69, 0.25);\n}\n.filters-section .card .form-select[data-v-dfe6acfc] {\n  border: 1px solid #cccccc;\n  border-radius: 4px;\n}\n.filters-section .card .form-select[data-v-dfe6acfc]:focus {\n  border-color: #dc3545;\n  box-shadow: 0 0 0 0.2rem rgba(220, 53, 69, 0.25);\n}\n.tickets-section .card[data-v-dfe6acfc] {\n  border: 1px solid #e0e0e0;\n  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);\n}\n.tickets-section .card .card-header[data-v-dfe6acfc] {\n  background: #ffffff;\n  border-bottom: 1px solid #e0e0e0;\n}\n.tickets-section .card .card-header .card-title[data-v-dfe6acfc] {\n  color: #252525;\n  font-weight: 600;\n}\n.tickets-section .card .card-header .card-title i[data-v-dfe6acfc] {\n  color: #dc3545;\n}\n.tickets-section .card .table-header[data-v-dfe6acfc] {\n  background: #eaeaea;\n}\n.tickets-section .card .table-header th[data-v-dfe6acfc] {\n  border-bottom: 1px solid #e0e0e0;\n  font-weight: 600;\n  color: #252525;\n  padding: 10px 20px;\n}\n.tickets-section .card .ticket-row[data-v-dfe6acfc] {\n  transition: background-color 0.2s ease;\n}\n.tickets-section .card .ticket-row[data-v-dfe6acfc]:hover {\n  background-color: #eaeaea;\n}\n.tickets-section .card .ticket-row td[data-v-dfe6acfc] {\n  padding: 10px 20px;\n  vertical-align: middle;\n  border-bottom: 1px solid #e0e0e0;\n}\n.tickets-section .card .ticket-number[data-v-dfe6acfc] {\n  font-family: \"Courier New\", monospace;\n  font-weight: 600;\n  color: #dc3545;\n}\n.tickets-section .card .user-name[data-v-dfe6acfc] {\n  font-weight: 500;\n  color: #252525;\n}\n.tickets-section .card .user-email[data-v-dfe6acfc] {\n  color: #6a6a6a;\n  font-size: 14px;\n}\n.tickets-section .card .subject-text[data-v-dfe6acfc] {\n  max-width: 200px;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n  color: #010101;\n}\n.tickets-section .card .text-warning[data-v-dfe6acfc] {\n  font-weight: 600;\n  color: #ffc107 !important;\n}\n.tickets-section .card .text-info[data-v-dfe6acfc] {\n  font-weight: 600;\n  color: #17a2b8 !important;\n}\n.tickets-section .card .text-success[data-v-dfe6acfc] {\n  font-weight: 600;\n  color: #28a745 !important;\n}\n.tickets-section .card .text-danger[data-v-dfe6acfc] {\n  font-weight: 600;\n  color: #dc3545 !important;\n}\n.tickets-section .card .text-secondary[data-v-dfe6acfc] {\n  font-weight: 600;\n  color: #6c757d !important;\n}\n.tickets-section .card .text-muted[data-v-dfe6acfc] {\n  font-weight: 500;\n  color: #6c757d !important;\n}\n.tickets-section .card .date-text[data-v-dfe6acfc] {\n  color: #6a6a6a;\n  font-size: 14px;\n}\n.tickets-section .card .action-buttons[data-v-dfe6acfc] {\n  display: flex;\n  gap: 8px;\n}\n.tickets-section .card .action-buttons .btn[data-v-dfe6acfc] {\n  padding: 8px;\n  width: 32px;\n  height: 32px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n.tickets-section .card .action-buttons .btn i[data-v-dfe6acfc] {\n  font-size: 11px;\n}\n.tickets-section .card .empty-state[data-v-dfe6acfc] {\n  padding: 40px;\n}\n.tickets-section .card .empty-state i[data-v-dfe6acfc] {\n  opacity: 0.5;\n}\n.tickets-section .card .empty-state h5[data-v-dfe6acfc] {\n  margin-bottom: 10px;\n}\n.pagination-section .pagination .page-link[data-v-dfe6acfc] {\n  color: #dc3545;\n  border-color: #cccccc;\n}\n.pagination-section .pagination .page-link[data-v-dfe6acfc]:hover {\n  color: #ffffff;\n  background-color: #dc3545;\n  border-color: #dc3545;\n}\n.pagination-section .pagination .page-item.active .page-link[data-v-dfe6acfc] {\n  background-color: #dc3545;\n  border-color: #dc3545;\n}\n.pagination-section .pagination .page-item.disabled .page-link[data-v-dfe6acfc] {\n  color: #6a6a6a;\n  background-color: #f5f5f3;\n  border-color: #cccccc;\n}\n.modal .modal-content[data-v-dfe6acfc] {\n  border: none;\n  border-radius: 8px;\n  box-shadow: 0 10px 15px rgba(0, 0, 0, 0.2);\n}\n.modal .modal-header[data-v-dfe6acfc] {\n  border-bottom: 1px solid #e0e0e0;\n  background: #eaeaea;\n}\n.modal .modal-header .modal-title[data-v-dfe6acfc] {\n  color: #252525;\n  font-weight: 600;\n}\n.modal .modal-body .form-label[data-v-dfe6acfc] {\n  font-weight: 500;\n  color: #252525;\n  margin-bottom: 8px;\n}\n.modal .modal-body .form-control[data-v-dfe6acfc], .modal .modal-body .form-select[data-v-dfe6acfc] {\n  border: 1px solid #cccccc;\n  border-radius: 4px;\n}\n.modal .modal-body .form-control[data-v-dfe6acfc]:focus, .modal .modal-body .form-select[data-v-dfe6acfc]:focus {\n  border-color: #dc3545;\n  box-shadow: 0 0 0 0.2rem rgba(220, 53, 69, 0.25);\n}\n.modal .modal-body .message-content[data-v-dfe6acfc] {\n  background: #eaeaea;\n  padding: 10px;\n  border-radius: 4px;\n  border: 1px solid #e0e0e0;\n  white-space: pre-wrap;\n  font-size: 14px;\n  line-height: 1.4;\n}\n.modal .modal-footer[data-v-dfe6acfc] {\n  border-top: 1px solid #e0e0e0;\n  background: #eaeaea;\n}\n.badge[data-v-dfe6acfc] {\n  font-size: 11px;\n  font-weight: 500;\n  padding: 8px 10px;\n  border-radius: 4px;\n}\n@media (max-width: 768px) {\n.support-page-wrapper[data-v-dfe6acfc] {\n    padding: 10px;\n}\n.statistics-section .stat-card[data-v-dfe6acfc] {\n    margin-bottom: 10px;\n}\n.filters-section .row > div[data-v-dfe6acfc] {\n    margin-bottom: 10px;\n}\n.tickets-section .table-responsive[data-v-dfe6acfc] {\n    font-size: 14px;\n}\n.tickets-section .action-buttons[data-v-dfe6acfc] {\n    flex-direction: column;\n    gap: 8px;\n}\n}", ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-12.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12.use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-12.use[3]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/Support/Support.vue?vue&type=style&index=0&id=dfe6acfc&lang=scss&scoped=true":
/*!**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-12.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12.use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-12.use[3]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/Support/Support.vue?vue&type=style&index=0&id=dfe6acfc&lang=scss&scoped=true ***!
  \**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../../../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_clonedRuleSet_12_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_12_use_2_node_modules_sass_loader_dist_cjs_js_clonedRuleSet_12_use_3_node_modules_vue_loader_lib_index_js_vue_loader_options_Support_vue_vue_type_style_index_0_id_dfe6acfc_lang_scss_scoped_true__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !!../../../../../../node_modules/css-loader/dist/cjs.js??clonedRuleSet-12.use[1]!../../../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12.use[2]!../../../../../../node_modules/sass-loader/dist/cjs.js??clonedRuleSet-12.use[3]!../../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Support.vue?vue&type=style&index=0&id=dfe6acfc&lang=scss&scoped=true */ "./node_modules/css-loader/dist/cjs.js??clonedRuleSet-12.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12.use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-12.use[3]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/Support/Support.vue?vue&type=style&index=0&id=dfe6acfc&lang=scss&scoped=true");

            

var options = {};

options.insert = "head";
options.singleton = false;

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_clonedRuleSet_12_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_12_use_2_node_modules_sass_loader_dist_cjs_js_clonedRuleSet_12_use_3_node_modules_vue_loader_lib_index_js_vue_loader_options_Support_vue_vue_type_style_index_0_id_dfe6acfc_lang_scss_scoped_true__WEBPACK_IMPORTED_MODULE_1__["default"], options);



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_clonedRuleSet_12_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_12_use_2_node_modules_sass_loader_dist_cjs_js_clonedRuleSet_12_use_3_node_modules_vue_loader_lib_index_js_vue_loader_options_Support_vue_vue_type_style_index_0_id_dfe6acfc_lang_scss_scoped_true__WEBPACK_IMPORTED_MODULE_1__["default"].locals || {});

/***/ }),

/***/ "./resources/src/views/app/pages/Support/Support.vue":
/*!***********************************************************!*\
  !*** ./resources/src/views/app/pages/Support/Support.vue ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Support_vue_vue_type_template_id_dfe6acfc_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Support.vue?vue&type=template&id=dfe6acfc&scoped=true */ "./resources/src/views/app/pages/Support/Support.vue?vue&type=template&id=dfe6acfc&scoped=true");
/* harmony import */ var _Support_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Support.vue?vue&type=script&lang=js */ "./resources/src/views/app/pages/Support/Support.vue?vue&type=script&lang=js");
/* harmony import */ var _Support_vue_vue_type_style_index_0_id_dfe6acfc_lang_scss_scoped_true__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Support.vue?vue&type=style&index=0&id=dfe6acfc&lang=scss&scoped=true */ "./resources/src/views/app/pages/Support/Support.vue?vue&type=style&index=0&id=dfe6acfc&lang=scss&scoped=true");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");



;


/* normalize component */

var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _Support_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__["default"],
  _Support_vue_vue_type_template_id_dfe6acfc_scoped_true__WEBPACK_IMPORTED_MODULE_0__.render,
  _Support_vue_vue_type_template_id_dfe6acfc_scoped_true__WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  "dfe6acfc",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/src/views/app/pages/Support/Support.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./resources/src/views/app/pages/Support/Support.vue?vue&type=script&lang=js":
/*!***********************************************************************************!*\
  !*** ./resources/src/views/app/pages/Support/Support.vue?vue&type=script&lang=js ***!
  \***********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Support_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Support.vue?vue&type=script&lang=js */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/Support/Support.vue?vue&type=script&lang=js");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Support_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/src/views/app/pages/Support/Support.vue?vue&type=style&index=0&id=dfe6acfc&lang=scss&scoped=true":
/*!********************************************************************************************************************!*\
  !*** ./resources/src/views/app/pages/Support/Support.vue?vue&type=style&index=0&id=dfe6acfc&lang=scss&scoped=true ***!
  \********************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_dist_cjs_js_node_modules_css_loader_dist_cjs_js_clonedRuleSet_12_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_12_use_2_node_modules_sass_loader_dist_cjs_js_clonedRuleSet_12_use_3_node_modules_vue_loader_lib_index_js_vue_loader_options_Support_vue_vue_type_style_index_0_id_dfe6acfc_lang_scss_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/style-loader/dist/cjs.js!../../../../../../node_modules/css-loader/dist/cjs.js??clonedRuleSet-12.use[1]!../../../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12.use[2]!../../../../../../node_modules/sass-loader/dist/cjs.js??clonedRuleSet-12.use[3]!../../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Support.vue?vue&type=style&index=0&id=dfe6acfc&lang=scss&scoped=true */ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-12.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12.use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-12.use[3]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/Support/Support.vue?vue&type=style&index=0&id=dfe6acfc&lang=scss&scoped=true");


/***/ }),

/***/ "./resources/src/views/app/pages/Support/Support.vue?vue&type=template&id=dfe6acfc&scoped=true":
/*!*****************************************************************************************************!*\
  !*** ./resources/src/views/app/pages/Support/Support.vue?vue&type=template&id=dfe6acfc&scoped=true ***!
  \*****************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Support_vue_vue_type_template_id_dfe6acfc_scoped_true__WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   staticRenderFns: () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Support_vue_vue_type_template_id_dfe6acfc_scoped_true__WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Support_vue_vue_type_template_id_dfe6acfc_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Support.vue?vue&type=template&id=dfe6acfc&scoped=true */ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/Support/Support.vue?vue&type=template&id=dfe6acfc&scoped=true");


/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/Support/Support.vue?vue&type=template&id=dfe6acfc&scoped=true":
/*!********************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/Support/Support.vue?vue&type=template&id=dfe6acfc&scoped=true ***!
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
  return _c("div", { staticClass: "support-page-wrapper" }, [
    _vm.isLoading
      ? _c("div", { staticClass: "loading-container" }, [_vm._m(0)])
      : _c("div", { staticClass: "main-content" }, [
          _c("div", { staticClass: "page-header" }, [
            _c(
              "div",
              {
                staticClass:
                  "breadcrumb-nav-row d-flex justify-content-between align-items-center mb-3",
              },
              [
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
                              staticClass: "back-button me-2 me-sm-3",
                              staticStyle: { color: "#dc3545" },
                              attrs: { type: "button", title: "Go back" },
                              on: { click: _vm.goBack },
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
                                      "\n                                        Dashboard\n                                    "
                                    ),
                                  ]
                                ),
                              ],
                              1
                            ),
                            _vm._v(" "),
                            _vm._m(1),
                          ]),
                        ]
                      ),
                    ]
                  ),
                ]),
                _vm._v(" "),
                _c("div", { staticClass: "action-section" }, [
                  _c(
                    "button",
                    {
                      staticClass: "btn btn-primary action-btn",
                      on: { click: _vm.openCreateModal },
                    },
                    [
                      _c("i", { staticClass: "fas fa-plus" }),
                      _vm._v(
                        "\n                        New Ticket\n                    "
                      ),
                    ]
                  ),
                ]),
              ]
            ),
            _vm._v(" "),
            _vm._m(2),
          ]),
          _vm._v(" "),
          _c("div", { staticClass: "statistics-section mb-4" }, [
            _c("div", { staticClass: "row" }, [
              _c("div", { staticClass: "col-md-3 col-sm-6 mb-3" }, [
                _c("div", { staticClass: "stat-card-simple" }, [
                  _c("span", { staticClass: "stat-number" }, [
                    _vm._v(_vm._s(_vm.statistics.total || 0)),
                  ]),
                  _vm._v(" "),
                  _c("span", { staticClass: "stat-label" }, [
                    _vm._v("Total Tickets"),
                  ]),
                ]),
              ]),
              _vm._v(" "),
              _c("div", { staticClass: "col-md-3 col-sm-6 mb-3" }, [
                _c("div", { staticClass: "stat-card-simple" }, [
                  _c("span", { staticClass: "stat-number" }, [
                    _vm._v(_vm._s(_vm.statistics.pending || 0)),
                  ]),
                  _vm._v(" "),
                  _c("span", { staticClass: "stat-label" }, [
                    _vm._v("Pending"),
                  ]),
                ]),
              ]),
              _vm._v(" "),
              _c("div", { staticClass: "col-md-3 col-sm-6 mb-3" }, [
                _c("div", { staticClass: "stat-card-simple" }, [
                  _c("span", { staticClass: "stat-number" }, [
                    _vm._v(_vm._s(_vm.statistics.in_progress || 0)),
                  ]),
                  _vm._v(" "),
                  _c("span", { staticClass: "stat-label" }, [
                    _vm._v("In Progress"),
                  ]),
                ]),
              ]),
              _vm._v(" "),
              _c("div", { staticClass: "col-md-3 col-sm-6 mb-3" }, [
                _c("div", { staticClass: "stat-card-simple" }, [
                  _c("span", { staticClass: "stat-number" }, [
                    _vm._v(_vm._s(_vm.statistics.resolved || 0)),
                  ]),
                  _vm._v(" "),
                  _c("span", { staticClass: "stat-label" }, [
                    _vm._v("Resolved"),
                  ]),
                ]),
              ]),
            ]),
          ]),
          _vm._v(" "),
          _c("div", { staticClass: "filters-section mb-4" }, [
            _c("div", { staticClass: "card" }, [
              _c("div", { staticClass: "card-body" }, [
                _c("div", { staticClass: "row align-items-center" }, [
                  _c("div", { staticClass: "col-md-4 mb-3 mb-md-0" }, [
                    _c("div", { staticClass: "search-box" }, [
                      _c("i", { staticClass: "fas fa-search search-icon" }),
                      _vm._v(" "),
                      _c("input", {
                        directives: [
                          {
                            name: "model",
                            rawName: "v-model",
                            value: _vm.filters.search,
                            expression: "filters.search",
                          },
                        ],
                        staticClass: "form-control search-input",
                        attrs: {
                          type: "text",
                          placeholder: "Search tickets...",
                        },
                        domProps: { value: _vm.filters.search },
                        on: {
                          input: [
                            function ($event) {
                              if ($event.target.composing) {
                                return
                              }
                              _vm.$set(
                                _vm.filters,
                                "search",
                                $event.target.value
                              )
                            },
                            _vm.debouncedSearch,
                          ],
                        },
                      }),
                    ]),
                  ]),
                  _vm._v(" "),
                  _c("div", { staticClass: "col-md-2 mb-3 mb-md-0" }, [
                    _c(
                      "select",
                      {
                        directives: [
                          {
                            name: "model",
                            rawName: "v-model",
                            value: _vm.filters.status,
                            expression: "filters.status",
                          },
                        ],
                        staticClass: "form-select",
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
                              _vm.$set(
                                _vm.filters,
                                "status",
                                $event.target.multiple
                                  ? $$selectedVal
                                  : $$selectedVal[0]
                              )
                            },
                            _vm.applyFilters,
                          ],
                        },
                      },
                      [
                        _c("option", { attrs: { value: "" } }, [
                          _vm._v("All Status"),
                        ]),
                        _vm._v(" "),
                        _c("option", { attrs: { value: "pending" } }, [
                          _vm._v("Pending"),
                        ]),
                        _vm._v(" "),
                        _c("option", { attrs: { value: "in_progress" } }, [
                          _vm._v("In Progress"),
                        ]),
                        _vm._v(" "),
                        _c("option", { attrs: { value: "resolved" } }, [
                          _vm._v("Resolved"),
                        ]),
                        _vm._v(" "),
                        _c("option", { attrs: { value: "closed" } }, [
                          _vm._v("Closed"),
                        ]),
                      ]
                    ),
                  ]),
                  _vm._v(" "),
                  _c("div", { staticClass: "col-md-2 mb-3 mb-md-0" }, [
                    _c(
                      "select",
                      {
                        directives: [
                          {
                            name: "model",
                            rawName: "v-model",
                            value: _vm.filters.priority,
                            expression: "filters.priority",
                          },
                        ],
                        staticClass: "form-select",
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
                              _vm.$set(
                                _vm.filters,
                                "priority",
                                $event.target.multiple
                                  ? $$selectedVal
                                  : $$selectedVal[0]
                              )
                            },
                            _vm.applyFilters,
                          ],
                        },
                      },
                      [
                        _c("option", { attrs: { value: "" } }, [
                          _vm._v("All Priority"),
                        ]),
                        _vm._v(" "),
                        _c("option", { attrs: { value: "low" } }, [
                          _vm._v("Low"),
                        ]),
                        _vm._v(" "),
                        _c("option", { attrs: { value: "medium" } }, [
                          _vm._v("Medium"),
                        ]),
                        _vm._v(" "),
                        _c("option", { attrs: { value: "high" } }, [
                          _vm._v("High"),
                        ]),
                      ]
                    ),
                  ]),
                  _vm._v(" "),
                  _c("div", { staticClass: "col-md-2 mb-3 mb-md-0" }, [
                    _c(
                      "select",
                      {
                        directives: [
                          {
                            name: "model",
                            rawName: "v-model",
                            value: _vm.filters.per_page,
                            expression: "filters.per_page",
                          },
                        ],
                        staticClass: "form-select",
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
                              _vm.$set(
                                _vm.filters,
                                "per_page",
                                $event.target.multiple
                                  ? $$selectedVal
                                  : $$selectedVal[0]
                              )
                            },
                            _vm.applyFilters,
                          ],
                        },
                      },
                      [
                        _c("option", { attrs: { value: "15" } }, [
                          _vm._v("15 per page"),
                        ]),
                        _vm._v(" "),
                        _c("option", { attrs: { value: "25" } }, [
                          _vm._v("25 per page"),
                        ]),
                        _vm._v(" "),
                        _c("option", { attrs: { value: "50" } }, [
                          _vm._v("50 per page"),
                        ]),
                      ]
                    ),
                  ]),
                  _vm._v(" "),
                  _c("div", { staticClass: "col-md-2" }, [
                    _c(
                      "button",
                      {
                        staticClass: "btn btn-outline-secondary w-100",
                        on: { click: _vm.clearFilters },
                      },
                      [
                        _c("i", { staticClass: "fas fa-times" }),
                        _vm._v(
                          "\n                                Clear\n                            "
                        ),
                      ]
                    ),
                  ]),
                ]),
              ]),
            ]),
          ]),
          _vm._v(" "),
          _c("div", { staticClass: "tickets-section" }, [
            _c("div", { staticClass: "card" }, [
              _vm._m(3),
              _vm._v(" "),
              _c("div", { staticClass: "card-body p-0" }, [
                _c("div", { staticClass: "table-responsive" }, [
                  _c("table", { staticClass: "table mb-0" }, [
                    _vm._m(4),
                    _vm._v(" "),
                    _c(
                      "tbody",
                      [
                        _vm.tickets.length === 0 && !_vm.isLoading
                          ? _c("tr", [_vm._m(5)])
                          : _vm._e(),
                        _vm._v(" "),
                        _vm._l(_vm.tickets, function (ticket) {
                          return _c(
                            "tr",
                            { key: ticket.id, staticClass: "ticket-row" },
                            [
                              _c("td", [
                                _c("span", { staticClass: "ticket-number" }, [
                                  _vm._v(_vm._s(ticket.ticket_number || "N/A")),
                                ]),
                              ]),
                              _vm._v(" "),
                              _c("td", [
                                _c("div", { staticClass: "user-info" }, [
                                  _c("span", { staticClass: "user-name" }, [
                                    _vm._v(_vm._s(ticket.name)),
                                  ]),
                                ]),
                              ]),
                              _vm._v(" "),
                              _c("td", [
                                _c("span", { staticClass: "user-email" }, [
                                  _vm._v(_vm._s(ticket.email)),
                                ]),
                              ]),
                              _vm._v(" "),
                              _c("td", [
                                _c(
                                  "div",
                                  {
                                    staticClass: "subject-text",
                                    attrs: { title: ticket.subject },
                                  },
                                  [
                                    _vm._v(
                                      "\n                                            " +
                                        _vm._s(ticket.subject) +
                                        "\n                                        "
                                    ),
                                  ]
                                ),
                              ]),
                              _vm._v(" "),
                              _c("td", [
                                _c(
                                  "span",
                                  {
                                    class: _vm.getStatusTextClass(
                                      ticket.status
                                    ),
                                  },
                                  [
                                    _vm._v(
                                      "\n                                            " +
                                        _vm._s(
                                          _vm.formatStatus(ticket.status)
                                        ) +
                                        "\n                                        "
                                    ),
                                  ]
                                ),
                              ]),
                              _vm._v(" "),
                              _c("td", [
                                _c(
                                  "span",
                                  {
                                    class: _vm.getPriorityTextClass(
                                      ticket.priority
                                    ),
                                  },
                                  [
                                    _vm._v(
                                      "\n                                            " +
                                        _vm._s(
                                          _vm.formatPriority(ticket.priority)
                                        ) +
                                        "\n                                        "
                                    ),
                                  ]
                                ),
                              ]),
                              _vm._v(" "),
                              _c("td", [
                                _c("span", { staticClass: "date-text" }, [
                                  _vm._v(
                                    _vm._s(_vm.formatDate(ticket.created_at))
                                  ),
                                ]),
                              ]),
                              _vm._v(" "),
                              _c("td", [
                                _c("div", { staticClass: "action-buttons" }, [
                                  _c(
                                    "button",
                                    {
                                      staticClass:
                                        "btn btn-sm btn-outline-primary",
                                      attrs: { title: "View Details" },
                                      on: {
                                        click: function ($event) {
                                          return _vm.viewTicket(ticket)
                                        },
                                      },
                                    },
                                    [_c("i", { staticClass: "fas fa-eye" })]
                                  ),
                                  _vm._v(" "),
                                  _c(
                                    "button",
                                    {
                                      staticClass:
                                        "btn btn-sm btn-outline-warning",
                                      attrs: { title: "Edit Ticket" },
                                      on: {
                                        click: function ($event) {
                                          return _vm.editTicket(ticket)
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
                                      attrs: { title: "Delete Ticket" },
                                      on: {
                                        click: function ($event) {
                                          return _vm.deleteTicket(ticket)
                                        },
                                      },
                                    },
                                    [_c("i", { staticClass: "fas fa-trash" })]
                                  ),
                                ]),
                              ]),
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
          ]),
          _vm._v(" "),
          _vm.pagination.total > _vm.pagination.per_page
            ? _c("div", { staticClass: "pagination-section mt-4" }, [
                _c(
                  "nav",
                  { attrs: { "aria-label": "Support tickets pagination" } },
                  [
                    _c(
                      "ul",
                      { staticClass: "pagination justify-content-center" },
                      [
                        _c(
                          "li",
                          {
                            staticClass: "page-item",
                            class: {
                              disabled: _vm.pagination.current_page === 1,
                            },
                          },
                          [
                            _c(
                              "button",
                              {
                                staticClass: "page-link",
                                attrs: {
                                  disabled: _vm.pagination.current_page === 1,
                                },
                                on: {
                                  click: function ($event) {
                                    return _vm.changePage(
                                      _vm.pagination.current_page - 1
                                    )
                                  },
                                },
                              },
                              [_c("i", { staticClass: "fas fa-chevron-left" })]
                            ),
                          ]
                        ),
                        _vm._v(" "),
                        _vm._l(_vm.visiblePages, function (page) {
                          return _c(
                            "li",
                            {
                              key: page,
                              staticClass: "page-item",
                              class: {
                                active: page === _vm.pagination.current_page,
                              },
                            },
                            [
                              _c(
                                "button",
                                {
                                  staticClass: "page-link",
                                  on: {
                                    click: function ($event) {
                                      return _vm.changePage(page)
                                    },
                                  },
                                },
                                [
                                  _vm._v(
                                    "\n                            " +
                                      _vm._s(page) +
                                      "\n                        "
                                  ),
                                ]
                              ),
                            ]
                          )
                        }),
                        _vm._v(" "),
                        _c(
                          "li",
                          {
                            staticClass: "page-item",
                            class: {
                              disabled:
                                _vm.pagination.current_page ===
                                _vm.pagination.last_page,
                            },
                          },
                          [
                            _c(
                              "button",
                              {
                                staticClass: "page-link",
                                attrs: {
                                  disabled:
                                    _vm.pagination.current_page ===
                                    _vm.pagination.last_page,
                                },
                                on: {
                                  click: function ($event) {
                                    return _vm.changePage(
                                      _vm.pagination.current_page + 1
                                    )
                                  },
                                },
                              },
                              [_c("i", { staticClass: "fas fa-chevron-right" })]
                            ),
                          ]
                        ),
                      ],
                      2
                    ),
                  ]
                ),
              ])
            : _vm._e(),
        ]),
    _vm._v(" "),
    _c(
      "div",
      {
        staticClass: "modal fade",
        attrs: {
          id: "ticketModal",
          tabindex: "-1",
          "aria-labelledby": "ticketModalLabel",
          "aria-hidden": "true",
        },
        on: {
          click: function ($event) {
            return _vm.handleBackdropClick("ticketModal", $event)
          },
        },
      },
      [
        _c("div", { staticClass: "modal-dialog modal-lg" }, [
          _c("div", { staticClass: "modal-content" }, [
            _c("div", { staticClass: "modal-header" }, [
              _c(
                "h5",
                {
                  staticClass: "modal-title",
                  attrs: { id: "ticketModalLabel" },
                },
                [
                  _vm._v(
                    "\n                        " +
                      _vm._s(
                        _vm.isEditing ? "Edit Ticket" : "Create New Ticket"
                      ) +
                      "\n                    "
                  ),
                ]
              ),
              _vm._v(" "),
              _c("button", {
                staticClass: "btn-close",
                attrs: { type: "button", "aria-label": "Close" },
                on: {
                  click: function ($event) {
                    return _vm.hideModal("ticketModal")
                  },
                },
              }),
            ]),
            _vm._v(" "),
            _c("div", { staticClass: "modal-body" }, [
              _c(
                "form",
                {
                  on: {
                    submit: function ($event) {
                      $event.preventDefault()
                      return _vm.saveTicket.apply(null, arguments)
                    },
                  },
                },
                [
                  _c("div", { staticClass: "row" }, [
                    _c("div", { staticClass: "col-md-6 mb-3" }, [
                      _c(
                        "label",
                        { staticClass: "form-label", attrs: { for: "name" } },
                        [_vm._v("Name *")]
                      ),
                      _vm._v(" "),
                      _c("input", {
                        directives: [
                          {
                            name: "model",
                            rawName: "v-model",
                            value: _vm.form.name,
                            expression: "form.name",
                          },
                        ],
                        staticClass: "form-control",
                        attrs: { type: "text", id: "name", required: "" },
                        domProps: { value: _vm.form.name },
                        on: {
                          input: function ($event) {
                            if ($event.target.composing) {
                              return
                            }
                            _vm.$set(_vm.form, "name", $event.target.value)
                          },
                        },
                      }),
                    ]),
                    _vm._v(" "),
                    _c("div", { staticClass: "col-md-6 mb-3" }, [
                      _c(
                        "label",
                        { staticClass: "form-label", attrs: { for: "email" } },
                        [_vm._v("Email *")]
                      ),
                      _vm._v(" "),
                      _c("input", {
                        directives: [
                          {
                            name: "model",
                            rawName: "v-model",
                            value: _vm.form.email,
                            expression: "form.email",
                          },
                        ],
                        staticClass: "form-control",
                        attrs: { type: "email", id: "email", required: "" },
                        domProps: { value: _vm.form.email },
                        on: {
                          input: function ($event) {
                            if ($event.target.composing) {
                              return
                            }
                            _vm.$set(_vm.form, "email", $event.target.value)
                          },
                        },
                      }),
                    ]),
                  ]),
                  _vm._v(" "),
                  _c("div", { staticClass: "mb-3" }, [
                    _c(
                      "label",
                      { staticClass: "form-label", attrs: { for: "subject" } },
                      [_vm._v("Subject *")]
                    ),
                    _vm._v(" "),
                    _c("input", {
                      directives: [
                        {
                          name: "model",
                          rawName: "v-model",
                          value: _vm.form.subject,
                          expression: "form.subject",
                        },
                      ],
                      staticClass: "form-control",
                      attrs: { type: "text", id: "subject", required: "" },
                      domProps: { value: _vm.form.subject },
                      on: {
                        input: function ($event) {
                          if ($event.target.composing) {
                            return
                          }
                          _vm.$set(_vm.form, "subject", $event.target.value)
                        },
                      },
                    }),
                  ]),
                  _vm._v(" "),
                  _c("div", { staticClass: "row" }, [
                    _c("div", { staticClass: "col-md-6 mb-3" }, [
                      _c(
                        "label",
                        {
                          staticClass: "form-label",
                          attrs: { for: "priority" },
                        },
                        [_vm._v("Priority")]
                      ),
                      _vm._v(" "),
                      _c(
                        "select",
                        {
                          directives: [
                            {
                              name: "model",
                              rawName: "v-model",
                              value: _vm.form.priority,
                              expression: "form.priority",
                            },
                          ],
                          staticClass: "form-select",
                          attrs: { id: "priority" },
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
                                _vm.form,
                                "priority",
                                $event.target.multiple
                                  ? $$selectedVal
                                  : $$selectedVal[0]
                              )
                            },
                          },
                        },
                        [
                          _c("option", { attrs: { value: "low" } }, [
                            _vm._v("Low"),
                          ]),
                          _vm._v(" "),
                          _c("option", { attrs: { value: "medium" } }, [
                            _vm._v("Medium"),
                          ]),
                          _vm._v(" "),
                          _c("option", { attrs: { value: "high" } }, [
                            _vm._v("High"),
                          ]),
                        ]
                      ),
                    ]),
                    _vm._v(" "),
                    _vm.isEditing
                      ? _c("div", { staticClass: "col-md-6 mb-3" }, [
                          _c(
                            "label",
                            {
                              staticClass: "form-label",
                              attrs: { for: "status" },
                            },
                            [_vm._v("Status")]
                          ),
                          _vm._v(" "),
                          _c(
                            "select",
                            {
                              directives: [
                                {
                                  name: "model",
                                  rawName: "v-model",
                                  value: _vm.form.status,
                                  expression: "form.status",
                                },
                              ],
                              staticClass: "form-select",
                              attrs: { id: "status" },
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
                                    _vm.form,
                                    "status",
                                    $event.target.multiple
                                      ? $$selectedVal
                                      : $$selectedVal[0]
                                  )
                                },
                              },
                            },
                            [
                              _c("option", { attrs: { value: "pending" } }, [
                                _vm._v("Pending"),
                              ]),
                              _vm._v(" "),
                              _c(
                                "option",
                                { attrs: { value: "in_progress" } },
                                [_vm._v("In Progress")]
                              ),
                              _vm._v(" "),
                              _c("option", { attrs: { value: "resolved" } }, [
                                _vm._v("Resolved"),
                              ]),
                              _vm._v(" "),
                              _c("option", { attrs: { value: "closed" } }, [
                                _vm._v("Closed"),
                              ]),
                            ]
                          ),
                        ])
                      : _vm._e(),
                  ]),
                  _vm._v(" "),
                  _c("div", { staticClass: "mb-3" }, [
                    _c(
                      "label",
                      { staticClass: "form-label", attrs: { for: "message" } },
                      [_vm._v("Message *")]
                    ),
                    _vm._v(" "),
                    _c("textarea", {
                      directives: [
                        {
                          name: "model",
                          rawName: "v-model",
                          value: _vm.form.message,
                          expression: "form.message",
                        },
                      ],
                      staticClass: "form-control",
                      attrs: { id: "message", rows: "5", required: "" },
                      domProps: { value: _vm.form.message },
                      on: {
                        input: function ($event) {
                          if ($event.target.composing) {
                            return
                          }
                          _vm.$set(_vm.form, "message", $event.target.value)
                        },
                      },
                    }),
                  ]),
                ]
              ),
            ]),
            _vm._v(" "),
            _c("div", { staticClass: "modal-footer" }, [
              _c(
                "button",
                {
                  staticClass: "btn btn-secondary",
                  attrs: { type: "button" },
                  on: {
                    click: function ($event) {
                      return _vm.hideModal("ticketModal")
                    },
                  },
                },
                [
                  _vm._v(
                    "\n                        Cancel\n                    "
                  ),
                ]
              ),
              _vm._v(" "),
              _c(
                "button",
                {
                  staticClass: "btn btn-primary",
                  attrs: { type: "button", disabled: _vm.isSaving },
                  on: { click: _vm.saveTicket },
                },
                [
                  _vm.isSaving
                    ? _c("i", { staticClass: "fas fa-spinner fa-spin" })
                    : _vm._e(),
                  _vm._v(
                    "\n                        " +
                      _vm._s(
                        _vm.isSaving
                          ? "Saving..."
                          : _vm.isEditing
                          ? "Update"
                          : "Create"
                      ) +
                      "\n                    "
                  ),
                ]
              ),
            ]),
          ]),
        ]),
      ]
    ),
    _vm._v(" "),
    _c(
      "div",
      {
        staticClass: "modal fade",
        attrs: {
          id: "viewModal",
          tabindex: "-1",
          "aria-labelledby": "viewModalLabel",
          "aria-hidden": "true",
        },
        on: {
          click: function ($event) {
            return _vm.handleBackdropClick("viewModal", $event)
          },
        },
      },
      [
        _c("div", { staticClass: "modal-dialog modal-lg" }, [
          _c("div", { staticClass: "modal-content" }, [
            _c("div", { staticClass: "modal-header" }, [
              _c(
                "h5",
                { staticClass: "modal-title", attrs: { id: "viewModalLabel" } },
                [
                  _vm._v(
                    "\n                        Ticket Details - " +
                      _vm._s(
                        _vm.selectedTicket && _vm.selectedTicket.ticket_number
                      ) +
                      "\n                    "
                  ),
                ]
              ),
              _vm._v(" "),
              _c("button", {
                staticClass: "btn-close",
                attrs: { type: "button", "aria-label": "Close" },
                on: {
                  click: function ($event) {
                    return _vm.hideModal("viewModal")
                  },
                },
              }),
            ]),
            _vm._v(" "),
            _c("div", { staticClass: "modal-body" }, [
              _vm.selectedTicket
                ? _c("div", [
                    _c("div", { staticClass: "row mb-3" }, [
                      _c("div", { staticClass: "col-md-6" }, [
                        _c("strong", [_vm._v("Name:")]),
                        _vm._v(
                          " " +
                            _vm._s(_vm.selectedTicket.name) +
                            "\n                            "
                        ),
                      ]),
                      _vm._v(" "),
                      _c("div", { staticClass: "col-md-6" }, [
                        _c("strong", [_vm._v("Email:")]),
                        _vm._v(
                          " " +
                            _vm._s(_vm.selectedTicket.email) +
                            "\n                            "
                        ),
                      ]),
                    ]),
                    _vm._v(" "),
                    _c("div", { staticClass: "row mb-3" }, [
                      _c("div", { staticClass: "col-md-6" }, [
                        _c("strong", [_vm._v("Status:")]),
                        _vm._v(" "),
                        _c(
                          "span",
                          {
                            staticClass: "ms-2",
                            class: _vm.getStatusTextClass(
                              _vm.selectedTicket.status
                            ),
                          },
                          [
                            _vm._v(
                              "\n                                    " +
                                _vm._s(
                                  _vm.formatStatus(_vm.selectedTicket.status)
                                ) +
                                "\n                                "
                            ),
                          ]
                        ),
                      ]),
                      _vm._v(" "),
                      _c("div", { staticClass: "col-md-6" }, [
                        _c("strong", [_vm._v("Priority:")]),
                        _vm._v(" "),
                        _c(
                          "span",
                          {
                            staticClass: "ms-2",
                            class: _vm.getPriorityTextClass(
                              _vm.selectedTicket.priority
                            ),
                          },
                          [
                            _vm._v(
                              "\n                                    " +
                                _vm._s(
                                  _vm.formatPriority(
                                    _vm.selectedTicket.priority
                                  )
                                ) +
                                "\n                                "
                            ),
                          ]
                        ),
                      ]),
                    ]),
                    _vm._v(" "),
                    _c("div", { staticClass: "mb-3" }, [
                      _c("strong", [_vm._v("Subject:")]),
                      _vm._v(" "),
                      _c("p", { staticClass: "mt-1" }, [
                        _vm._v(_vm._s(_vm.selectedTicket.subject)),
                      ]),
                    ]),
                    _vm._v(" "),
                    _c("div", { staticClass: "mb-3" }, [
                      _c("strong", [_vm._v("Message:")]),
                      _vm._v(" "),
                      _c("div", { staticClass: "message-content mt-2" }, [
                        _vm._v(
                          "\n                                " +
                            _vm._s(_vm.selectedTicket.message) +
                            "\n                            "
                        ),
                      ]),
                    ]),
                    _vm._v(" "),
                    _c("div", { staticClass: "row" }, [
                      _c("div", { staticClass: "col-md-6" }, [
                        _c("strong", [_vm._v("Created:")]),
                        _vm._v(
                          " " +
                            _vm._s(
                              _vm.formatDate(_vm.selectedTicket.created_at)
                            ) +
                            "\n                            "
                        ),
                      ]),
                      _vm._v(" "),
                      _c("div", { staticClass: "col-md-6" }, [
                        _c("strong", [_vm._v("Updated:")]),
                        _vm._v(
                          " " +
                            _vm._s(
                              _vm.formatDate(_vm.selectedTicket.updated_at)
                            ) +
                            "\n                            "
                        ),
                      ]),
                    ]),
                  ])
                : _vm._e(),
            ]),
            _vm._v(" "),
            _c("div", { staticClass: "modal-footer" }, [
              _c(
                "button",
                {
                  staticClass: "btn btn-secondary",
                  attrs: { type: "button" },
                  on: {
                    click: function ($event) {
                      return _vm.hideModal("viewModal")
                    },
                  },
                },
                [
                  _vm._v(
                    "\n                        Close\n                    "
                  ),
                ]
              ),
              _vm._v(" "),
              _c(
                "button",
                {
                  staticClass: "btn btn-primary",
                  attrs: { type: "button" },
                  on: {
                    click: function ($event) {
                      return _vm.editTicket(_vm.selectedTicket)
                    },
                  },
                },
                [
                  _vm._v(
                    "\n                        Edit Ticket\n                    "
                  ),
                ]
              ),
            ]),
          ]),
        ]),
      ]
    ),
    _vm._v(" "),
    _c(
      "div",
      {
        staticClass: "modal fade",
        attrs: {
          id: "deleteModal",
          tabindex: "-1",
          "aria-labelledby": "deleteModalLabel",
          "aria-hidden": "true",
        },
        on: {
          click: function ($event) {
            return _vm.handleBackdropClick("deleteModal", $event)
          },
        },
      },
      [
        _c("div", { staticClass: "modal-dialog" }, [
          _c("div", { staticClass: "modal-content" }, [
            _c("div", { staticClass: "modal-header" }, [
              _vm._m(6),
              _vm._v(" "),
              _c("button", {
                staticClass: "btn-close",
                attrs: { type: "button", "aria-label": "Close" },
                on: {
                  click: function ($event) {
                    return _vm.hideModal("deleteModal")
                  },
                },
              }),
            ]),
            _vm._v(" "),
            _c("div", { staticClass: "modal-body" }, [
              _vm.selectedTicket
                ? _c("div", [
                    _c("p", { staticClass: "mb-3" }, [
                      _vm._v("Are you sure you want to delete this ticket?"),
                    ]),
                    _vm._v(" "),
                    _c("div", { staticClass: "alert alert-warning" }, [
                      _c("strong", [_vm._v("Ticket:")]),
                      _vm._v(" " + _vm._s(_vm.selectedTicket.subject)),
                      _c("br"),
                      _vm._v(" "),
                      _c("strong", [_vm._v("From:")]),
                      _vm._v(
                        " " +
                          _vm._s(_vm.selectedTicket.name) +
                          " (" +
                          _vm._s(_vm.selectedTicket.email) +
                          ")"
                      ),
                      _c("br"),
                      _vm._v(" "),
                      _c("strong", [_vm._v("Status:")]),
                      _vm._v(
                        " " +
                          _vm._s(_vm.formatStatus(_vm.selectedTicket.status))
                      ),
                      _c("br"),
                      _vm._v(" "),
                      _c("strong", [_vm._v("Priority:")]),
                      _vm._v(
                        " " +
                          _vm._s(
                            _vm.formatPriority(_vm.selectedTicket.priority)
                          ) +
                          "\n                        "
                      ),
                    ]),
                    _vm._v(" "),
                    _c("p", { staticClass: "text-muted small" }, [
                      _vm._v("This action cannot be undone."),
                    ]),
                  ])
                : _vm._e(),
            ]),
            _vm._v(" "),
            _c("div", { staticClass: "modal-footer" }, [
              _c(
                "button",
                {
                  staticClass: "btn btn-secondary",
                  attrs: { type: "button" },
                  on: {
                    click: function ($event) {
                      return _vm.hideModal("deleteModal")
                    },
                  },
                },
                [
                  _vm._v(
                    "\n                        Cancel\n                    "
                  ),
                ]
              ),
              _vm._v(" "),
              _c(
                "button",
                {
                  staticClass: "btn btn-danger",
                  attrs: { type: "button" },
                  on: { click: _vm.confirmDelete },
                },
                [
                  _c("i", { staticClass: "fas fa-trash me-1" }),
                  _vm._v(
                    "\n                        Delete Ticket\n                    "
                  ),
                ]
              ),
            ]),
          ]),
        ]),
      ]
    ),
  ])
}
var staticRenderFns = [
  function () {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "loading-spinner" }, [
      _c(
        "div",
        {
          staticClass: "spinner-border text-primary",
          attrs: { role: "status" },
        },
        [_c("span", { staticClass: "sr-only" }, [_vm._v("Loading...")])]
      ),
      _vm._v(" "),
      _c("p", { staticClass: "loading-text" }, [
        _vm._v("Loading support tickets..."),
      ]),
    ])
  },
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
        _c("i", { staticClass: "fas fa-life-ring" }),
        _vm._v(
          "\n                                    Support\n                                "
        ),
      ]
    )
  },
  function () {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "page-title-section" }, [
      _c("h1", { staticClass: "page-title" }, [
        _c("i", { staticClass: "fas fa-life-ring me-2" }),
        _vm._v("\n                    Support Tickets\n                "),
      ]),
      _vm._v(" "),
      _c("p", { staticClass: "page-subtitle" }, [
        _vm._v("Manage and track support requests"),
      ]),
    ])
  },
  function () {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "card-header" }, [
      _c("h5", { staticClass: "card-title mb-0" }, [
        _c("i", { staticClass: "fas fa-list me-2" }),
        _vm._v(
          "\n                        Support Tickets\n                    "
        ),
      ]),
    ])
  },
  function () {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("thead", { staticClass: "table-header" }, [
      _c("tr", [
        _c("th", [_vm._v("Ticket #")]),
        _vm._v(" "),
        _c("th", [_vm._v("Name")]),
        _vm._v(" "),
        _c("th", [_vm._v("Email")]),
        _vm._v(" "),
        _c("th", [_vm._v("Subject")]),
        _vm._v(" "),
        _c("th", [_vm._v("Status")]),
        _vm._v(" "),
        _c("th", [_vm._v("Priority")]),
        _vm._v(" "),
        _c("th", [_vm._v("Created")]),
        _vm._v(" "),
        _c("th", [_vm._v("Actions")]),
      ]),
    ])
  },
  function () {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c(
      "td",
      { staticClass: "text-center py-4", attrs: { colspan: "8" } },
      [
        _c("div", { staticClass: "empty-state" }, [
          _c("i", { staticClass: "fas fa-inbox fa-3x text-muted mb-3" }),
          _vm._v(" "),
          _c("h5", { staticClass: "text-muted" }, [_vm._v("No tickets found")]),
          _vm._v(" "),
          _c("p", { staticClass: "text-muted" }, [
            _vm._v("No support tickets match your current filters."),
          ]),
        ]),
      ]
    )
  },
  function () {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c(
      "h5",
      { staticClass: "modal-title", attrs: { id: "deleteModalLabel" } },
      [
        _c("i", {
          staticClass: "fas fa-exclamation-triangle text-warning me-2",
        }),
        _vm._v(
          "\n                        Confirm Delete\n                    "
        ),
      ]
    )
  },
]
render._withStripped = true



/***/ })

}]);