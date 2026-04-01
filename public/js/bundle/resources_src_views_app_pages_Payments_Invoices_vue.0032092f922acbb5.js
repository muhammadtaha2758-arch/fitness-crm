"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["resources_src_views_app_pages_Payments_Invoices_vue"],{

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/Payments/Invoices.vue?vue&type=script&lang=js":
/*!*****************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/Payments/Invoices.vue?vue&type=script&lang=js ***!
  \*****************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
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

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  name: "Invoices",
  data: function data() {
    return {
      invoices: [],
      filteredInvoices: [],
      loading: false,
      error: null,
      searchQuery: '',
      statusFilter: '',
      dateFilter: '',
      perPage: 25,
      currentPage: 1,
      sortKey: 'created_at',
      sortOrders: {
        invoice_number: 'desc',
        member_name: 'asc',
        plan_name: 'asc',
        amount: 'desc',
        status: 'asc',
        due_date: 'asc',
        created_at: 'desc'
      },
      showCreateInvoiceModal: false,
      isSubmitting: false,
      members: [],
      plans: [],
      invoiceForm: {
        date: this.getCurrentDate(),
        payment_method: null,
        invoice_text: 'Default invoice text',
        supplementary_text: '',
        bill_to: null,
        sold_by: '',
        member_id: null,
        subscription_plan_id: null,
        amount: 0
      }
    };
  },
  computed: {
    paginatedInvoices: function paginatedInvoices() {
      var start = (this.currentPage - 1) * this.perPage;
      var end = start + this.perPage;
      return this.filteredInvoices.slice(start, end);
    },
    totalPages: function totalPages() {
      return Math.ceil(this.filteredInvoices.length / this.perPage);
    },
    paginationStart: function paginationStart() {
      return (this.currentPage - 1) * this.perPage + 1;
    },
    paginationEnd: function paginationEnd() {
      var end = this.currentPage * this.perPage;
      return end > this.filteredInvoices.length ? this.filteredInvoices.length : end;
    },
    visiblePages: function visiblePages() {
      var pages = [];
      var maxVisible = 5;
      var start = Math.max(1, this.currentPage - Math.floor(maxVisible / 2));
      var end = Math.min(this.totalPages, start + maxVisible - 1);
      if (end - start + 1 < maxVisible) {
        start = Math.max(1, end - maxVisible + 1);
      }
      for (var i = start; i <= end; i++) {
        pages.push(i);
      }
      return pages;
    }
  },
  mounted: function mounted() {
    var _this = this;
    return _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
      return _regeneratorRuntime().wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return _this.loadInvoices();
          case 2:
            _context.next = 4;
            return _this.loadMembers();
          case 4:
            _context.next = 6;
            return _this.loadPlans();
          case 6:
            _this.loadAdminName();
          case 7:
          case "end":
            return _context.stop();
        }
      }, _callee);
    }))();
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
    loadInvoices: function loadInvoices() {
      var _this2 = this;
      return _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee2() {
        var response;
        return _regeneratorRuntime().wrap(function _callee2$(_context2) {
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
              _this2.loading = true;
              _this2.error = null;
              _context2.prev = 2;
              _context2.next = 5;
              return window.axios.get('invoices');
            case 5:
              response = _context2.sent;
              if (response.data.success) {
                _this2.invoices = response.data.data;
                _this2.filterInvoices();
              } else {
                _this2.error = response.data.message || 'Failed to load invoices';
              }
              _context2.next = 13;
              break;
            case 9:
              _context2.prev = 9;
              _context2.t0 = _context2["catch"](2);
              console.error('Error loading invoices:', _context2.t0);
              _this2.error = 'Failed to load invoices. Please try again.';
            case 13:
              _context2.prev = 13;
              _this2.loading = false;
              return _context2.finish(13);
            case 16:
            case "end":
              return _context2.stop();
          }
        }, _callee2, null, [[2, 9, 13, 16]]);
      }))();
    },
    filterInvoices: function filterInvoices() {
      var _this3 = this;
      var filtered = _toConsumableArray(this.invoices);

      // Search filter
      if (this.searchQuery) {
        var query = this.searchQuery.toLowerCase();
        filtered = filtered.filter(function (invoice) {
          var _invoice$member, _invoice$member2, _invoice$subscription;
          return invoice.invoice_number.toLowerCase().includes(query) || ((_invoice$member = invoice.member) === null || _invoice$member === void 0 ? void 0 : _invoice$member.membername) && invoice.member.membername.toLowerCase().includes(query) || ((_invoice$member2 = invoice.member) === null || _invoice$member2 === void 0 ? void 0 : _invoice$member2.email) && invoice.member.email.toLowerCase().includes(query) || ((_invoice$subscription = invoice.subscription_plan) === null || _invoice$subscription === void 0 ? void 0 : _invoice$subscription.name) && invoice.subscription_plan.name.toLowerCase().includes(query);
        });
      }

      // Status filter
      if (this.statusFilter) {
        filtered = filtered.filter(function (invoice) {
          return invoice.status === _this3.statusFilter;
        });
      }

      // Date filter
      if (this.dateFilter) {
        var now = new Date();
        var today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        switch (this.dateFilter) {
          case 'today':
            filtered = filtered.filter(function (invoice) {
              var invoiceDate = new Date(invoice.created_at);
              return invoiceDate >= today;
            });
            break;
          case 'week':
            var weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
            filtered = filtered.filter(function (invoice) {
              var invoiceDate = new Date(invoice.created_at);
              return invoiceDate >= weekAgo;
            });
            break;
          case 'month':
            var monthAgo = new Date(today.getFullYear(), today.getMonth() - 1, today.getDate());
            filtered = filtered.filter(function (invoice) {
              var invoiceDate = new Date(invoice.created_at);
              return invoiceDate >= monthAgo;
            });
            break;
          case 'overdue':
            filtered = filtered.filter(function (invoice) {
              var dueDate = new Date(invoice.due_date);
              return dueDate < today && invoice.status === 'pending';
            });
            break;
        }
      }

      // Sort the filtered results
      this.sortInvoices(filtered);
      this.filteredInvoices = filtered;
      this.currentPage = 1; // Reset to first page when filtering
    },
    sortInvoices: function sortInvoices(invoices) {
      var _this4 = this;
      invoices.sort(function (a, b) {
        var _a$member, _b$member, _a$subscription_plan, _b$subscription_plan;
        var aValue, bValue;
        switch (_this4.sortKey) {
          case 'invoice_number':
            aValue = a.invoice_number;
            bValue = b.invoice_number;
            break;
          case 'member_name':
            aValue = ((_a$member = a.member) === null || _a$member === void 0 ? void 0 : _a$member.membername) || '';
            bValue = ((_b$member = b.member) === null || _b$member === void 0 ? void 0 : _b$member.membername) || '';
            break;
          case 'plan_name':
            aValue = ((_a$subscription_plan = a.subscription_plan) === null || _a$subscription_plan === void 0 ? void 0 : _a$subscription_plan.name) || '';
            bValue = ((_b$subscription_plan = b.subscription_plan) === null || _b$subscription_plan === void 0 ? void 0 : _b$subscription_plan.name) || '';
            break;
          case 'amount':
            aValue = parseFloat(a.amount);
            bValue = parseFloat(b.amount);
            break;
          case 'status':
            aValue = a.status;
            bValue = b.status;
            break;
          case 'due_date':
            aValue = new Date(a.due_date);
            bValue = new Date(b.due_date);
            break;
          case 'created_at':
            aValue = new Date(a.created_at);
            bValue = new Date(b.created_at);
            break;
          default:
            aValue = a[_this4.sortKey];
            bValue = b[_this4.sortKey];
        }
        var order = _this4.sortOrders[_this4.sortKey];
        if (order === 'asc') {
          return aValue > bValue ? 1 : -1;
        } else {
          return aValue < bValue ? 1 : -1;
        }
      });
    },
    sortBy: function sortBy(key) {
      if (this.sortKey === key) {
        this.sortOrders[key] = this.sortOrders[key] === 'asc' ? 'desc' : 'asc';
      } else {
        this.sortKey = key;
        this.sortOrders[key] = 'asc';
      }
      this.filterInvoices();
    },
    changePage: function changePage(page) {
      if (page >= 1 && page <= this.totalPages) {
        this.currentPage = page;
      }
    },
    refreshInvoices: function refreshInvoices() {
      this.loadInvoices();
    },
    getStatusBadgeClass: function getStatusBadgeClass(status) {
      switch (status) {
        case 'paid':
          return 'badge bg-success';
        case 'pending':
          return 'badge bg-warning';
        case 'cancelled':
          return 'badge bg-danger';
        default:
          return 'badge bg-secondary';
      }
    },
    getStatusText: function getStatusText(status) {
      switch (status) {
        case 'paid':
          return 'Paid';
        case 'pending':
          return 'Pending';
        case 'cancelled':
          return 'Cancelled';
        default:
          return 'Unknown';
      }
    },
    getDueDateClass: function getDueDateClass(dueDate) {
      var due = new Date(dueDate);
      var today = new Date();
      today.setHours(0, 0, 0, 0);
      if (due < today) {
        return 'text-danger fw-bold';
      } else if (due.getTime() === today.getTime()) {
        return 'text-warning fw-bold';
      } else {
        return 'text-muted';
      }
    },
    formatDate: function formatDate(date) {
      if (!date) return 'N/A';
      return new Date(date).toLocaleDateString();
    },
    viewInvoice: function viewInvoice(invoice) {
      var _this5 = this;
      return _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee3() {
        var _invoice$member3, _invoice$subscription2;
        return _regeneratorRuntime().wrap(function _callee3$(_context3) {
          while (1) switch (_context3.prev = _context3.next) {
            case 0:
              // TODO: Implement invoice view modal
              _this5.$swal({
                title: "Invoice Details",
                html: "\n          <div class=\"text-start\">\n            <p><strong>Invoice Number:</strong> ".concat(invoice.invoice_number, "</p>\n            <p><strong>Member:</strong> ").concat(((_invoice$member3 = invoice.member) === null || _invoice$member3 === void 0 ? void 0 : _invoice$member3.membername) || 'N/A', "</p>\n            <p><strong>Plan:</strong> ").concat(((_invoice$subscription2 = invoice.subscription_plan) === null || _invoice$subscription2 === void 0 ? void 0 : _invoice$subscription2.name) || 'N/A', "</p>\n            <p><strong>Amount:</strong> $").concat(parseFloat(invoice.amount).toFixed(2), "</p>\n            <p><strong>Status:</strong> ").concat(_this5.getStatusText(invoice.status), "</p>\n            <p><strong>Due Date:</strong> ").concat(_this5.formatDate(invoice.due_date), "</p>\n            <p><strong>Description:</strong> ").concat(invoice.description || 'N/A', "</p>\n          </div>\n        "),
                confirmButtonText: 'Close'
              });
            case 1:
            case "end":
              return _context3.stop();
          }
        }, _callee3);
      }))();
    },
    markAsPaid: function markAsPaid(invoice) {
      var _this6 = this;
      return _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee4() {
        var response;
        return _regeneratorRuntime().wrap(function _callee4$(_context4) {
          while (1) switch (_context4.prev = _context4.next) {
            case 0:
              _context4.prev = 0;
              _context4.next = 3;
              return window.axios.put("invoices/".concat(invoice.id, "/mark-as-paid"));
            case 3:
              response = _context4.sent;
              if (!response.data.success) {
                _context4.next = 10;
                break;
              }
              _this6.$swal({
                title: 'Success',
                text: 'Invoice marked as paid successfully',
                icon: 'success',
                confirmButtonText: 'OK'
              });
              _context4.next = 8;
              return _this6.loadInvoices();
            case 8:
              _context4.next = 11;
              break;
            case 10:
              _this6.$swal({
                title: 'Error',
                text: response.data.message || 'Failed to update invoice',
                icon: 'error',
                confirmButtonText: 'OK'
              });
            case 11:
              _context4.next = 17;
              break;
            case 13:
              _context4.prev = 13;
              _context4.t0 = _context4["catch"](0);
              console.error('Error updating invoice:', _context4.t0);
              _this6.$swal({
                title: 'Error',
                text: 'Failed to update invoice. Please try again.',
                icon: 'error',
                confirmButtonText: 'OK'
              });
            case 17:
            case "end":
              return _context4.stop();
          }
        }, _callee4, null, [[0, 13]]);
      }))();
    },
    cancelInvoice: function cancelInvoice(invoice) {
      var _this7 = this;
      return _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee5() {
        var result, response;
        return _regeneratorRuntime().wrap(function _callee5$(_context5) {
          while (1) switch (_context5.prev = _context5.next) {
            case 0:
              _context5.next = 2;
              return _this7.$swal({
                title: 'Confirm Cancellation',
                text: 'Are you sure you want to cancel this invoice?',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Yes, Cancel',
                cancelButtonText: 'No, Keep'
              });
            case 2:
              result = _context5.sent;
              if (!result.isConfirmed) {
                _context5.next = 21;
                break;
              }
              _context5.prev = 4;
              _context5.next = 7;
              return window.axios.put("invoices/".concat(invoice.id, "/cancel"));
            case 7:
              response = _context5.sent;
              if (!response.data.success) {
                _context5.next = 14;
                break;
              }
              _this7.$swal({
                title: 'Success',
                text: 'Invoice cancelled successfully',
                icon: 'success',
                confirmButtonText: 'OK'
              });
              _context5.next = 12;
              return _this7.loadInvoices();
            case 12:
              _context5.next = 15;
              break;
            case 14:
              _this7.$swal({
                title: 'Error',
                text: response.data.message || 'Failed to cancel invoice',
                icon: 'error',
                confirmButtonText: 'OK'
              });
            case 15:
              _context5.next = 21;
              break;
            case 17:
              _context5.prev = 17;
              _context5.t0 = _context5["catch"](4);
              console.error('Error cancelling invoice:', _context5.t0);
              _this7.$swal({
                title: 'Error',
                text: 'Failed to cancel invoice. Please try again.',
                icon: 'error',
                confirmButtonText: 'OK'
              });
            case 21:
            case "end":
              return _context5.stop();
          }
        }, _callee5, null, [[4, 17]]);
      }))();
    },
    downloadInvoice: function downloadInvoice(invoice) {
      var _this8 = this;
      return _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee6() {
        return _regeneratorRuntime().wrap(function _callee6$(_context6) {
          while (1) switch (_context6.prev = _context6.next) {
            case 0:
              // TODO: Implement PDF download
              _this8.$swal({
                title: 'Download Invoice',
                text: 'PDF download functionality will be implemented here.',
                icon: 'info',
                confirmButtonText: 'OK'
              });
            case 1:
            case "end":
              return _context6.stop();
          }
        }, _callee6);
      }))();
    },
    getCurrentDate: function getCurrentDate() {
      var today = new Date();
      var month = String(today.getMonth() + 1).padStart(2, '0');
      var day = String(today.getDate()).padStart(2, '0');
      var year = today.getFullYear();
      return "".concat(month, "/").concat(day, "/").concat(year);
    },
    createInvoice: function createInvoice() {
      this.showCreateInvoiceModal = true;
    },
    closeCreateInvoiceModal: function closeCreateInvoiceModal() {
      this.showCreateInvoiceModal = false;
      this.resetInvoiceForm();
    },
    resetInvoiceForm: function resetInvoiceForm() {
      this.invoiceForm = {
        date: this.getCurrentDate(),
        payment_method: null,
        invoice_text: 'Default invoice text',
        supplementary_text: '',
        bill_to: null,
        sold_by: this.invoiceForm.sold_by || '',
        member_id: null,
        subscription_plan_id: null,
        amount: 0
      };
    },
    loadPlans: function loadPlans() {
      var _this9 = this;
      return _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee7() {
        var response;
        return _regeneratorRuntime().wrap(function _callee7$(_context7) {
          while (1) switch (_context7.prev = _context7.next) {
            case 0:
              _context7.prev = 0;
              _context7.next = 3;
              return window.axios.get('plans', {
                params: {
                  status: 'active'
                }
              });
            case 3:
              response = _context7.sent;
              if (response.data.success) {
                _this9.plans = response.data.data || [];
              }
              _context7.next = 11;
              break;
            case 7:
              _context7.prev = 7;
              _context7.t0 = _context7["catch"](0);
              console.error('Error loading plans:', _context7.t0);
              _this9.$swal({
                title: 'Error',
                text: 'Failed to load plans',
                icon: 'error',
                confirmButtonText: 'OK'
              });
            case 11:
            case "end":
              return _context7.stop();
          }
        }, _callee7, null, [[0, 7]]);
      }))();
    },
    onPlanChange: function onPlanChange() {
      var _this10 = this;
      if (this.invoiceForm.subscription_plan_id) {
        var selectedPlan = this.plans.find(function (p) {
          return p.id === _this10.invoiceForm.subscription_plan_id;
        });
        if (selectedPlan && selectedPlan.price) {
          this.invoiceForm.amount = parseFloat(selectedPlan.price);
        }
      } else {
        this.invoiceForm.amount = 0;
      }
    },
    loadMembers: function loadMembers() {
      var _this11 = this;
      return _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee8() {
        var response;
        return _regeneratorRuntime().wrap(function _callee8$(_context8) {
          while (1) switch (_context8.prev = _context8.next) {
            case 0:
              _context8.prev = 0;
              _context8.next = 3;
              return window.axios.get('get_clients_without_paginate');
            case 3:
              response = _context8.sent;
              if (response.data && Array.isArray(response.data)) {
                _this11.members = response.data;
              } else if (response.data && response.data.data && Array.isArray(response.data.data)) {
                _this11.members = response.data.data;
              }
              _context8.next = 11;
              break;
            case 7:
              _context8.prev = 7;
              _context8.t0 = _context8["catch"](0);
              console.error('Error loading members:', _context8.t0);
              _this11.$swal({
                title: 'Error',
                text: 'Failed to load members',
                icon: 'error',
                confirmButtonText: 'OK'
              });
            case 11:
            case "end":
              return _context8.stop();
          }
        }, _callee8, null, [[0, 7]]);
      }))();
    },
    getMemberName: function getMemberName(member) {
      return member.membername || (member.firstname && member.lastname ? "".concat(member.firstname, " ").concat(member.lastname) : '') || member.name || 'Unknown';
    },
    loadAdminName: function loadAdminName() {
      try {
        // Try to get admin name from various sources
        if (this.$store && this.$store.state.auth && this.$store.state.auth.user) {
          var user = this.$store.state.auth.user;
          this.invoiceForm.sold_by = user.name || user.username || user.email || 'Admin';
          return;
        }

        // Try localStorage
        var userData = localStorage.getItem('user');
        if (userData) {
          try {
            var _user = JSON.parse(userData);
            this.invoiceForm.sold_by = _user.name || _user.username || _user.email || 'Admin';
            return;
          } catch (e) {
            console.error('Error parsing user data:', e);
          }
        }

        // Try sessionStorage
        var sessionUserData = sessionStorage.getItem('user');
        if (sessionUserData) {
          try {
            var _user2 = JSON.parse(sessionUserData);
            this.invoiceForm.sold_by = _user2.name || _user2.username || _user2.email || 'Admin';
            return;
          } catch (e) {
            console.error('Error parsing session user data:', e);
          }
        }

        // Default fallback
        this.invoiceForm.sold_by = 'Admin';
      } catch (error) {
        console.error('Error loading admin name:', error);
        this.invoiceForm.sold_by = 'Admin';
      }
    },
    submitInvoice: function submitInvoice() {
      var _this12 = this;
      return _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee9() {
        var invoiceData, response, _error$response, errorMessage, errors, errorList;
        return _regeneratorRuntime().wrap(function _callee9$(_context9) {
          while (1) switch (_context9.prev = _context9.next) {
            case 0:
              if (_this12.invoiceForm.payment_method) {
                _context9.next = 3;
                break;
              }
              _this12.$swal({
                title: 'Validation Error',
                text: 'Please select a payment method',
                icon: 'warning',
                confirmButtonText: 'OK'
              });
              return _context9.abrupt("return");
            case 3:
              if (_this12.invoiceForm.bill_to) {
                _context9.next = 6;
                break;
              }
              _this12.$swal({
                title: 'Validation Error',
                text: 'Please select a member to bill',
                icon: 'warning',
                confirmButtonText: 'OK'
              });
              return _context9.abrupt("return");
            case 6:
              _this12.isSubmitting = true;
              _context9.prev = 7;
              // Prepare invoice data
              invoiceData = {
                member_id: _this12.invoiceForm.bill_to,
                subscription_plan_id: _this12.invoiceForm.subscription_plan_id || null,
                payment_method: _this12.invoiceForm.payment_method,
                invoice_text: _this12.invoiceForm.invoice_text,
                supplementary_text: _this12.invoiceForm.supplementary_text,
                sold_by: _this12.invoiceForm.sold_by,
                is_guest: false,
                due_date: _this12.formatDateForBackend(_this12.invoiceForm.date),
                amount: _this12.invoiceForm.amount || 0,
                description: _this12.invoiceForm.supplementary_text || 'Invoice created'
              };
              console.log('Submitting invoice data:', invoiceData);
              _context9.next = 12;
              return window.axios.post('invoices', invoiceData);
            case 12:
              response = _context9.sent;
              if (!response.data.success) {
                _context9.next = 20;
                break;
              }
              _this12.$swal({
                title: 'Success',
                text: 'Invoice created successfully',
                icon: 'success',
                confirmButtonText: 'OK'
              });
              _this12.closeCreateInvoiceModal();
              _context9.next = 18;
              return _this12.loadInvoices();
            case 18:
              _context9.next = 21;
              break;
            case 20:
              throw new Error(response.data.message || 'Failed to create invoice');
            case 21:
              _context9.next = 31;
              break;
            case 23:
              _context9.prev = 23;
              _context9.t0 = _context9["catch"](7);
              console.error('Error creating invoice:', _context9.t0);
              console.error('Error response:', _context9.t0.response);
              console.error('Error data:', (_error$response = _context9.t0.response) === null || _error$response === void 0 ? void 0 : _error$response.data);
              errorMessage = 'Failed to create invoice';
              if (_context9.t0.response) {
                // Server responded with error
                if (_context9.t0.response.data) {
                  if (_context9.t0.response.data.message) {
                    errorMessage = _context9.t0.response.data.message;
                  } else if (_context9.t0.response.data.error) {
                    errorMessage = _context9.t0.response.data.error;
                  } else if (_context9.t0.response.data.errors) {
                    // Validation errors
                    errors = _context9.t0.response.data.errors;
                    errorList = Object.keys(errors).map(function (key) {
                      return "".concat(key, ": ").concat(Array.isArray(errors[key]) ? errors[key].join(', ') : errors[key]);
                    }).join('\n');
                    errorMessage = "Validation errors:\n".concat(errorList);
                  }
                }

                // Add status code info for debugging
                if (_context9.t0.response.status === 500) {
                  errorMessage += '\n\nServer error. Please check the server logs for details.';
                }
              } else if (_context9.t0.request) {
                errorMessage = 'No response from server. Please check your connection.';
              } else {
                errorMessage = _context9.t0.message || 'An unexpected error occurred';
              }
              _this12.$swal({
                title: 'Error',
                text: errorMessage,
                icon: 'error',
                confirmButtonText: 'OK'
              });
            case 31:
              _context9.prev = 31;
              _this12.isSubmitting = false;
              return _context9.finish(31);
            case 34:
            case "end":
              return _context9.stop();
          }
        }, _callee9, null, [[7, 23, 31, 34]]);
      }))();
    },
    formatDateForBackend: function formatDateForBackend(dateString) {
      // Convert MM/DD/YYYY to YYYY-MM-DD
      var parts = dateString.split('/');
      if (parts.length === 3) {
        return "".concat(parts[2], "-").concat(parts[0], "-").concat(parts[1]);
      }
      return new Date().toISOString().split('T')[0];
    }
  }
});

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js??clonedRuleSet-12.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12.use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-12.use[3]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/Payments/Invoices.vue?vue&type=style&index=0&id=b294cf0a&lang=scss&scoped=true":
/*!********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??clonedRuleSet-12.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12.use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-12.use[3]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/Payments/Invoices.vue?vue&type=style&index=0&id=b294cf0a&lang=scss&scoped=true ***!
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
___CSS_LOADER_EXPORT___.push([module.id, "@charset \"UTF-8\";\n.filter-btn .btn[data-v-b294cf0a],\n.filter-btn .btn-secondary[data-v-b294cf0a],\n.filter-btn .btn-outline-secondary[data-v-b294cf0a],\n.filter-btn button.btn[data-v-b294cf0a],\n.filter-btn button.btn-secondary[data-v-b294cf0a] {\n  color: #000 !important;\n  background-color: transparent !important;\n  border-color: #6c757d !important;\n}\n.filter-btn .btn[data-v-b294cf0a]:hover,\n.filter-btn .btn-secondary[data-v-b294cf0a]:hover,\n.filter-btn .btn-outline-secondary[data-v-b294cf0a]:hover,\n.filter-btn button.btn[data-v-b294cf0a]:hover,\n.filter-btn button.btn-secondary[data-v-b294cf0a]:hover {\n  color: #dc3545 !important;\n  background-color: transparent !important;\n  border-color: #dc3545 !important;\n  box-shadow: none !important;\n}\n.filter-btn .btn[data-v-b294cf0a]:focus,\n.filter-btn .btn-secondary[data-v-b294cf0a]:focus,\n.filter-btn .btn-outline-secondary[data-v-b294cf0a]:focus,\n.filter-btn button.btn[data-v-b294cf0a]:focus,\n.filter-btn button.btn-secondary[data-v-b294cf0a]:focus {\n  color: #dc3545 !important;\n  background-color: transparent !important;\n  border-color: #dc3545 !important;\n  box-shadow: none !important;\n}\n.filter-btn .btn[data-v-b294cf0a]:active,\n.filter-btn .btn-secondary[data-v-b294cf0a]:active,\n.filter-btn .btn-outline-secondary[data-v-b294cf0a]:active,\n.filter-btn button.btn[data-v-b294cf0a]:active,\n.filter-btn button.btn-secondary[data-v-b294cf0a]:active {\n  color: #dc3545 !important;\n  background-color: transparent !important;\n  border-color: #dc3545 !important;\n}\n.btn-secondary[data-v-b294cf0a]:not(:disabled):not(.disabled):active:focus {\n  box-shadow: none !important;\n}\n\n/* ===========================================\n   COMMON BREADCRUMB NAVIGATION STYLES\n   =========================================== */\n.breadcrumb-nav-row[data-v-b294cf0a] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  margin-bottom: 0.5rem;\n  gap: 0.5rem;\n}\n.breadcrumb-section[data-v-b294cf0a] {\n  flex: 1;\n}\n.breadcrumb-section .breadcrumb-nav .breadcrumb-container[data-v-b294cf0a] {\n  display: flex;\n  align-items: center;\n  gap: 1rem;\n}\n.breadcrumb-section .breadcrumb-nav .breadcrumb-container .back-button[data-v-b294cf0a] {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  width: 40px;\n  height: 40px;\n  background: rgba(255, 255, 255, 0.1);\n  border: 1px solid rgba(255, 255, 255, 0.2);\n  border-radius: 8px;\n  color: #ffffff;\n  cursor: pointer;\n  transition: all 0.3s ease;\n}\n.breadcrumb-section .breadcrumb-nav .breadcrumb-container .back-button[data-v-b294cf0a]:hover {\n  background: rgba(255, 255, 255, 0.15);\n  border-color: rgba(255, 255, 255, 0.3);\n  transform: translateY(-1px);\n  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);\n  color: #dc3545;\n}\n.breadcrumb-section .breadcrumb-nav .breadcrumb-container .back-button i[data-v-b294cf0a] {\n  font-size: 1.1em;\n}\n.breadcrumb-section .breadcrumb-nav .breadcrumb-container .breadcrumb[data-v-b294cf0a] {\n  display: flex;\n  align-items: center;\n  gap: 0.5rem;\n  margin: 0;\n  padding: 0;\n  background: none;\n  border-radius: 0;\n}\n.breadcrumb-section .breadcrumb-nav .breadcrumb-container .breadcrumb .breadcrumb-item[data-v-b294cf0a] {\n  display: flex;\n  align-items: center;\n  gap: 0.5rem;\n  font-size: 0.875rem;\n  color: #ffffff;\n}\n.breadcrumb-section .breadcrumb-nav .breadcrumb-container .breadcrumb .breadcrumb-item.active[data-v-b294cf0a] {\n  color: #252525;\n  font-weight: 600;\n}\n.breadcrumb-section .breadcrumb-nav .breadcrumb-container .breadcrumb .breadcrumb-item.active i[data-v-b294cf0a] {\n  color: #dc3545;\n}\n.breadcrumb-section .breadcrumb-nav .breadcrumb-container .breadcrumb .breadcrumb-item a[data-v-b294cf0a] {\n  display: flex;\n  align-items: center;\n  gap: 0.5rem;\n  color: #6a6a6a;\n  text-decoration: none;\n  transition: color 0.3s ease;\n}\n.breadcrumb-section .breadcrumb-nav .breadcrumb-container .breadcrumb .breadcrumb-item a[data-v-b294cf0a]:hover {\n  color: #dc3545;\n}\n.breadcrumb-section .breadcrumb-nav .breadcrumb-container .breadcrumb .breadcrumb-item a:hover i[data-v-b294cf0a] {\n  color: #dc3545;\n}\n.breadcrumb-section .breadcrumb-nav .breadcrumb-container .breadcrumb .breadcrumb-item a i[data-v-b294cf0a] {\n  font-size: 0.9em;\n  transition: color 0.3s ease;\n}\n.breadcrumb-section .breadcrumb-nav .breadcrumb-container .breadcrumb .breadcrumb-item[data-v-b294cf0a]:not(:last-child)::after {\n  content: \"›\";\n  margin-left: 0.5rem;\n  color: #6a6a6a;\n  font-size: 1.2em;\n}\n.action-section[data-v-b294cf0a] {\n  display: flex;\n  align-items: center;\n}\n.action-section .action-btn[data-v-b294cf0a] {\n  display: flex;\n  align-items: center;\n  gap: 0.5rem;\n  padding: 0.5rem 1rem;\n  border-radius: 8px;\n  font-size: 0.875rem;\n  font-weight: 500;\n  transition: all 0.3s ease;\n}\n.action-section .action-btn[data-v-b294cf0a]:hover:not(:disabled) {\n  transform: translateY(-1px);\n  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);\n}\n.action-section .action-btn[data-v-b294cf0a]:disabled {\n  opacity: 0.6;\n  cursor: not-allowed;\n}\n.action-section .action-btn i[data-v-b294cf0a] {\n  font-size: 0.9em;\n}\n@media (max-width: 768px) {\n.breadcrumb-nav-row[data-v-b294cf0a] {\n    flex-direction: column;\n    align-items: flex-start;\n    gap: 0.5rem;\n}\n.breadcrumb-section[data-v-b294cf0a] {\n    width: 100%;\n}\n.breadcrumb-section .breadcrumb-container[data-v-b294cf0a] {\n    flex-direction: column;\n    align-items: flex-start;\n    gap: 0.5rem;\n}\n.breadcrumb-section .breadcrumb-container .breadcrumb[data-v-b294cf0a] {\n    flex-wrap: wrap;\n}\n.breadcrumb-section .breadcrumb-container .breadcrumb .breadcrumb-item[data-v-b294cf0a] {\n    font-size: 0.8rem;\n}\n.breadcrumb-section .breadcrumb-container .breadcrumb .breadcrumb-item a[data-v-b294cf0a] {\n    font-size: 0.8rem;\n}\n.action-section[data-v-b294cf0a] {\n    width: 100%;\n    justify-content: flex-end;\n}\n.action-section .action-btn[data-v-b294cf0a] {\n    font-size: 0.8rem;\n    padding: 0.4rem 0.8rem;\n}\n}\n/* ===========================================\n   RESPONSIVE UTILITY CLASSES (ALL DEVICES)\n   =========================================== */\n.show-xs-only[data-v-b294cf0a],\n.show-sm-only[data-v-b294cf0a],\n.show-md-only[data-v-b294cf0a],\n.show-lg-only[data-v-b294cf0a],\n.show-xl-only[data-v-b294cf0a] {\n  display: none !important;\n}\n@media (max-width: 575px) {\n.hide-xs[data-v-b294cf0a] {\n    display: none !important;\n}\n.show-xs-only[data-v-b294cf0a] {\n    display: initial !important;\n}\n}\n@media (min-width: 576px) and (max-width: 767px) {\n.hide-sm[data-v-b294cf0a] {\n    display: none !important;\n}\n.show-sm-only[data-v-b294cf0a] {\n    display: initial !important;\n}\n}\n@media (min-width: 768px) and (max-width: 991px) {\n.hide-md[data-v-b294cf0a] {\n    display: none !important;\n}\n.show-md-only[data-v-b294cf0a] {\n    display: initial !important;\n}\n}\n@media (min-width: 992px) and (max-width: 1199px) {\n.hide-lg[data-v-b294cf0a] {\n    display: none !important;\n}\n.show-lg-only[data-v-b294cf0a] {\n    display: initial !important;\n}\n}\n@media (min-width: 1200px) {\n.hide-xl[data-v-b294cf0a] {\n    display: none !important;\n}\n.show-xl-only[data-v-b294cf0a] {\n    display: initial !important;\n}\n}\n@media (max-width: 576px) {\n.hide-sm-down[data-v-b294cf0a] {\n    display: none !important;\n}\n}\n@media (max-width: 768px) {\n.hide-md-down[data-v-b294cf0a] {\n    display: none !important;\n}\n}\n@media (max-width: 992px) {\n.hide-lg-down[data-v-b294cf0a] {\n    display: none !important;\n}\n}\n@media (min-width: 576px) {\n.hide-sm-up[data-v-b294cf0a] {\n    display: none !important;\n}\n}\n@media (min-width: 768px) {\n.hide-md-up[data-v-b294cf0a] {\n    display: none !important;\n}\n}\n@media (min-width: 992px) {\n.hide-lg-up[data-v-b294cf0a] {\n    display: none !important;\n}\n}\n@media (max-width: 575px) {\n.d-xs-none[data-v-b294cf0a] {\n    display: none !important;\n}\n.d-xs-block[data-v-b294cf0a] {\n    display: block !important;\n}\n.d-xs-flex[data-v-b294cf0a] {\n    display: flex !important;\n}\n}\n@media (min-width: 576px) and (max-width: 767px) {\n.d-sm-none[data-v-b294cf0a] {\n    display: none !important;\n}\n.d-sm-block[data-v-b294cf0a] {\n    display: block !important;\n}\n.d-sm-flex[data-v-b294cf0a] {\n    display: flex !important;\n}\n}\n@media (min-width: 768px) and (max-width: 991px) {\n.d-md-none[data-v-b294cf0a] {\n    display: none !important;\n}\n.d-md-block[data-v-b294cf0a] {\n    display: block !important;\n}\n.d-md-flex[data-v-b294cf0a] {\n    display: flex !important;\n}\n}\n@media (min-width: 992px) and (max-width: 1199px) {\n.d-lg-none[data-v-b294cf0a] {\n    display: none !important;\n}\n.d-lg-block[data-v-b294cf0a] {\n    display: block !important;\n}\n.d-lg-flex[data-v-b294cf0a] {\n    display: flex !important;\n}\n}\n@media (min-width: 1200px) {\n.d-xl-none[data-v-b294cf0a] {\n    display: none !important;\n}\n.d-xl-block[data-v-b294cf0a] {\n    display: block !important;\n}\n.d-xl-flex[data-v-b294cf0a] {\n    display: flex !important;\n}\n}\n@media (min-width: 576px) {\n.custom-modal-xl[data-v-b294cf0a] {\n    max-width: 1500px !important;\n}\n}\n.invoices-container[data-v-b294cf0a] {\n  padding: 20px;\n  background: linear-gradient(135deg, #f5f5f3 0%, #e8e8e6 100%);\n  min-height: 100vh;\n}\n.card[data-v-b294cf0a] {\n  border: none;\n  border-radius: 15px;\n  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);\n  background: #ffffff;\n}\n.card-header[data-v-b294cf0a] {\n  background: linear-gradient(to bottom, #23415a, #0f1c29);\n  color: white !important;\n  border-radius: 15px 15px 0 0 !important;\n  padding: 20px;\n  border: none;\n}\n.card-header h4[data-v-b294cf0a] {\n  margin: 0;\n  font-weight: 600;\n}\n.header-actions .btn[data-v-b294cf0a] {\n  border-radius: 8px;\n  font-weight: 500;\n}\n.card-body[data-v-b294cf0a] {\n  padding: 30px;\n}\n.search-filter-section[data-v-b294cf0a] {\n  background: #f8f9fa;\n  border-radius: 10px;\n  padding: 20px;\n  margin-bottom: 30px;\n  border: 1px solid #e9ecef;\n}\n.form-group[data-v-b294cf0a] {\n  margin-bottom: 0;\n}\n.form-group label[data-v-b294cf0a] {\n  font-weight: 600;\n  color: #252525;\n  margin-bottom: 8px;\n  font-size: 0.9rem;\n}\n.form-control[data-v-b294cf0a] {\n  border: 1px solid #ced4da;\n  border-radius: 8px;\n  font-size: 0.9rem;\n  transition: all 0.3s ease;\n}\n.form-control[data-v-b294cf0a]:focus {\n  border-color: #dc3545;\n  box-shadow: 0 0 0 0.2rem rgba(79, 112, 92, 0.25);\n}\n.meals-table[data-v-b294cf0a] {\n  width: 100%;\n  border-collapse: collapse;\n  font-size: 0.875rem;\n  margin-bottom: 0;\n}\n.meals-table th[data-v-b294cf0a] {\n  background: #f8f9fa;\n  color: #252525;\n  font-weight: 600;\n  padding: 1rem 0.75rem;\n  text-align: left;\n  border-bottom: 2px solid #dee2e6;\n  white-space: nowrap;\n}\n.meals-table th.sortable[data-v-b294cf0a] {\n  cursor: pointer;\n  -webkit-user-select: none;\n     -moz-user-select: none;\n          user-select: none;\n  transition: background-color 0.2s ease;\n}\n.meals-table th.sortable[data-v-b294cf0a]:hover {\n  background: #e9ecef;\n}\n.meals-table th.sortable i[data-v-b294cf0a] {\n  margin-left: 0.5rem;\n  opacity: 0.5;\n  transition: opacity 0.2s ease;\n}\n.meals-table th.sortable:hover i[data-v-b294cf0a] {\n  opacity: 0.8;\n}\n.meals-table td[data-v-b294cf0a] {\n  padding: 0.75rem;\n  border-bottom: 1px solid #dee2e6;\n  vertical-align: top;\n}\n.meals-table td.invoice-number[data-v-b294cf0a] {\n  font-weight: 500;\n  color: #252525;\n}\n.meals-table td.member-name[data-v-b294cf0a] {\n  font-weight: 500;\n  color: #252525;\n}\n.meals-table td.plan-name .plan-badge[data-v-b294cf0a] {\n  display: inline-block;\n  padding: 0.25rem 0.5rem;\n  border-radius: 12px;\n  font-size: 0.75rem;\n  color: #000000;\n  font-weight: 500;\n  text-transform: capitalize;\n  background: #e9ecef;\n  color: #495057;\n}\n.meals-table td.amount[data-v-b294cf0a] {\n  text-align: right;\n  font-weight: 500;\n  color: #252525;\n}\n.meals-table td.status .badge[data-v-b294cf0a] {\n  display: inline-block;\n  padding: 0.25rem 0.5rem;\n  border-radius: 12px;\n  font-size: 0.75rem;\n  font-weight: 500;\n  text-transform: capitalize;\n}\n.meals-table td.due-date[data-v-b294cf0a], .meals-table td.created-date[data-v-b294cf0a] {\n  font-size: 0.8rem;\n  color: #6a6a6a;\n}\n.meals-table td.actions[data-v-b294cf0a] {\n  white-space: nowrap;\n}\n.meals-table td.actions .action-btn[data-v-b294cf0a] {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  width: 32px;\n  height: 32px;\n  border: none;\n  border-radius: 6px;\n  cursor: pointer;\n  transition: all 0.2s ease;\n  margin-right: 0.5rem;\n}\n.meals-table td.actions .action-btn.view-btn[data-v-b294cf0a] {\n  background: #e3f2fd;\n  color: #1976d2;\n}\n.meals-table td.actions .action-btn.view-btn[data-v-b294cf0a]:hover {\n  background: #bbdefb;\n}\n.meals-table td.actions .action-btn.edit-btn[data-v-b294cf0a] {\n  background: #fff3e0;\n  color: #f57c00;\n}\n.meals-table td.actions .action-btn.edit-btn[data-v-b294cf0a]:hover {\n  background: #ffe0b2;\n}\n.meals-table td.actions .action-btn.delete-btn[data-v-b294cf0a] {\n  background: #ffebee;\n  color: #d32f2f;\n}\n.meals-table td.actions .action-btn.delete-btn[data-v-b294cf0a]:hover {\n  background: #ffcdd2;\n}\n.meals-table .meal-row[data-v-b294cf0a] {\n  transition: background-color 0.2s ease;\n}\n.meals-table .meal-row[data-v-b294cf0a]:hover {\n  background-color: #f8f9fa;\n}\n.member-info[data-v-b294cf0a] {\n  display: flex;\n  flex-direction: column;\n}\n.member-name-text[data-v-b294cf0a] {\n  font-weight: 600;\n  color: #252525;\n}\n.amount-value[data-v-b294cf0a] {\n  font-weight: 700;\n  color: #dc3545;\n  font-size: 1.1rem;\n}\n.badge[data-v-b294cf0a] {\n  padding: 6px 12px;\n  font-size: 0.8rem;\n  font-weight: 500;\n  border-radius: 20px;\n}\n.action-buttons[data-v-b294cf0a] {\n  display: flex;\n  gap: 5px;\n  flex-wrap: wrap;\n}\n.pagination-section[data-v-b294cf0a] {\n  margin-top: 30px;\n  padding-top: 20px;\n  border-top: 1px solid #e9ecef;\n}\n.pagination-info[data-v-b294cf0a] {\n  color: #252525;\n  font-size: 0.9rem;\n}\n.pagination .page-link[data-v-b294cf0a] {\n  color: #dc3545;\n  border: 1px solid #dee2e6;\n  padding: 8px 12px;\n  margin: 0 2px;\n  border-radius: 6px;\n  transition: all 0.3s ease;\n}\n.pagination .page-link[data-v-b294cf0a]:hover {\n  background: #dc3545;\n  color: white;\n  border-color: #dc3545;\n}\n.pagination .page-item.active .page-link[data-v-b294cf0a] {\n  background: #dc3545;\n  border-color: #dc3545;\n}\n.pagination .page-item.disabled .page-link[data-v-b294cf0a] {\n  color: #6c757d;\n  background: #f8f9fa;\n  border-color: #dee2e6;\n}\n\n/* Responsive Design */\n@media (max-width: 768px) {\n.invoices-container[data-v-b294cf0a] {\n    padding: 10px;\n}\n.card-body[data-v-b294cf0a] {\n    padding: 20px;\n}\n.search-filter-section[data-v-b294cf0a] {\n    padding: 15px;\n}\n.meals-table[data-v-b294cf0a] {\n    font-size: 0.8rem;\n}\n.meals-table th[data-v-b294cf0a],\n  .meals-table td[data-v-b294cf0a] {\n    padding: 0.5rem 0.4rem;\n}\n.action-buttons[data-v-b294cf0a] {\n    flex-direction: column;\n    gap: 3px;\n}\n.action-buttons .action-btn[data-v-b294cf0a] {\n    width: 100%;\n    justify-content: center;\n}\n}\n/* Loading Animation */\n.spinner-border[data-v-b294cf0a] {\n  width: 3rem;\n  height: 3rem;\n}\n\n/* Alert Styling */\n.alert[data-v-b294cf0a] {\n  border-radius: 10px;\n  border: none;\n  padding: 15px 20px;\n}\n\n/* Empty State */\n.text-center.py-5[data-v-b294cf0a] {\n  color: #252525;\n}\n.text-center.py-5 i[data-v-b294cf0a] {\n  opacity: 0.5;\n}\n.action-section[data-v-b294cf0a] {\n  display: flex;\n  gap: 10px;\n  align-items: center;\n}\n.create-invoice-modal .section-title[data-v-b294cf0a] {\n  font-size: 1rem;\n  font-weight: 600;\n  color: #252525;\n  padding-bottom: 0.5rem;\n  border-bottom: 2px solid #dee2e6;\n}\n.create-invoice-modal .form-group label[data-v-b294cf0a] {\n  font-weight: 500;\n  color: #252525;\n  margin-bottom: 0.5rem;\n}\n.create-invoice-modal .form-group .form-control[data-v-b294cf0a] {\n  border-color: #ced4da;\n}\n.create-invoice-modal .form-group .form-control[data-v-b294cf0a]:focus {\n  border-color: #dc3545;\n  box-shadow: 0 0 0 0.2rem rgba(79, 112, 92, 0.25);\n}\n.create-invoice-modal .form-group .form-control[data-v-b294cf0a]:disabled, .create-invoice-modal .form-group .form-control[readonly][data-v-b294cf0a] {\n  background-color: #f8f9fa;\n  cursor: not-allowed;\n}\n.create-invoice-modal .form-group .form-check-input[data-v-b294cf0a] {\n  margin-top: 0.25rem;\n}\n.create-invoice-modal .form-group .form-check-input[data-v-b294cf0a]:checked {\n  background-color: #dc3545;\n  border-color: #dc3545;\n}\n.create-invoice-modal .modal-footer-actions[data-v-b294cf0a] {\n  padding-top: 1rem;\n}", ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-12.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12.use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-12.use[3]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/Payments/Invoices.vue?vue&type=style&index=0&id=b294cf0a&lang=scss&scoped=true":
/*!************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-12.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12.use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-12.use[3]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/Payments/Invoices.vue?vue&type=style&index=0&id=b294cf0a&lang=scss&scoped=true ***!
  \************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../../../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_clonedRuleSet_12_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_12_use_2_node_modules_sass_loader_dist_cjs_js_clonedRuleSet_12_use_3_node_modules_vue_loader_lib_index_js_vue_loader_options_Invoices_vue_vue_type_style_index_0_id_b294cf0a_lang_scss_scoped_true__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !!../../../../../../node_modules/css-loader/dist/cjs.js??clonedRuleSet-12.use[1]!../../../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12.use[2]!../../../../../../node_modules/sass-loader/dist/cjs.js??clonedRuleSet-12.use[3]!../../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Invoices.vue?vue&type=style&index=0&id=b294cf0a&lang=scss&scoped=true */ "./node_modules/css-loader/dist/cjs.js??clonedRuleSet-12.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12.use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-12.use[3]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/Payments/Invoices.vue?vue&type=style&index=0&id=b294cf0a&lang=scss&scoped=true");

            

var options = {};

options.insert = "head";
options.singleton = false;

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_clonedRuleSet_12_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_12_use_2_node_modules_sass_loader_dist_cjs_js_clonedRuleSet_12_use_3_node_modules_vue_loader_lib_index_js_vue_loader_options_Invoices_vue_vue_type_style_index_0_id_b294cf0a_lang_scss_scoped_true__WEBPACK_IMPORTED_MODULE_1__["default"], options);



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_clonedRuleSet_12_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_12_use_2_node_modules_sass_loader_dist_cjs_js_clonedRuleSet_12_use_3_node_modules_vue_loader_lib_index_js_vue_loader_options_Invoices_vue_vue_type_style_index_0_id_b294cf0a_lang_scss_scoped_true__WEBPACK_IMPORTED_MODULE_1__["default"].locals || {});

/***/ }),

/***/ "./resources/src/views/app/pages/Payments/Invoices.vue":
/*!*************************************************************!*\
  !*** ./resources/src/views/app/pages/Payments/Invoices.vue ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Invoices_vue_vue_type_template_id_b294cf0a_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Invoices.vue?vue&type=template&id=b294cf0a&scoped=true */ "./resources/src/views/app/pages/Payments/Invoices.vue?vue&type=template&id=b294cf0a&scoped=true");
/* harmony import */ var _Invoices_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Invoices.vue?vue&type=script&lang=js */ "./resources/src/views/app/pages/Payments/Invoices.vue?vue&type=script&lang=js");
/* harmony import */ var _Invoices_vue_vue_type_style_index_0_id_b294cf0a_lang_scss_scoped_true__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Invoices.vue?vue&type=style&index=0&id=b294cf0a&lang=scss&scoped=true */ "./resources/src/views/app/pages/Payments/Invoices.vue?vue&type=style&index=0&id=b294cf0a&lang=scss&scoped=true");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");



;


/* normalize component */

var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _Invoices_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__["default"],
  _Invoices_vue_vue_type_template_id_b294cf0a_scoped_true__WEBPACK_IMPORTED_MODULE_0__.render,
  _Invoices_vue_vue_type_template_id_b294cf0a_scoped_true__WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  "b294cf0a",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/src/views/app/pages/Payments/Invoices.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./resources/src/views/app/pages/Payments/Invoices.vue?vue&type=script&lang=js":
/*!*************************************************************************************!*\
  !*** ./resources/src/views/app/pages/Payments/Invoices.vue?vue&type=script&lang=js ***!
  \*************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Invoices_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Invoices.vue?vue&type=script&lang=js */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/Payments/Invoices.vue?vue&type=script&lang=js");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Invoices_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/src/views/app/pages/Payments/Invoices.vue?vue&type=style&index=0&id=b294cf0a&lang=scss&scoped=true":
/*!**********************************************************************************************************************!*\
  !*** ./resources/src/views/app/pages/Payments/Invoices.vue?vue&type=style&index=0&id=b294cf0a&lang=scss&scoped=true ***!
  \**********************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_dist_cjs_js_node_modules_css_loader_dist_cjs_js_clonedRuleSet_12_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_12_use_2_node_modules_sass_loader_dist_cjs_js_clonedRuleSet_12_use_3_node_modules_vue_loader_lib_index_js_vue_loader_options_Invoices_vue_vue_type_style_index_0_id_b294cf0a_lang_scss_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/style-loader/dist/cjs.js!../../../../../../node_modules/css-loader/dist/cjs.js??clonedRuleSet-12.use[1]!../../../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12.use[2]!../../../../../../node_modules/sass-loader/dist/cjs.js??clonedRuleSet-12.use[3]!../../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Invoices.vue?vue&type=style&index=0&id=b294cf0a&lang=scss&scoped=true */ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-12.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12.use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-12.use[3]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/Payments/Invoices.vue?vue&type=style&index=0&id=b294cf0a&lang=scss&scoped=true");


/***/ }),

/***/ "./resources/src/views/app/pages/Payments/Invoices.vue?vue&type=template&id=b294cf0a&scoped=true":
/*!*******************************************************************************************************!*\
  !*** ./resources/src/views/app/pages/Payments/Invoices.vue?vue&type=template&id=b294cf0a&scoped=true ***!
  \*******************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Invoices_vue_vue_type_template_id_b294cf0a_scoped_true__WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   staticRenderFns: () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Invoices_vue_vue_type_template_id_b294cf0a_scoped_true__WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Invoices_vue_vue_type_template_id_b294cf0a_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Invoices.vue?vue&type=template&id=b294cf0a&scoped=true */ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/Payments/Invoices.vue?vue&type=template&id=b294cf0a&scoped=true");


/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/Payments/Invoices.vue?vue&type=template&id=b294cf0a&scoped=true":
/*!**********************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/Payments/Invoices.vue?vue&type=template&id=b294cf0a&scoped=true ***!
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
    { staticClass: "members-page-wrapper" },
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
        _c("div", { staticClass: "action-section" }, [
          _c(
            "button",
            {
              staticClass: "btn btn-success action-btn mr-2",
              on: { click: _vm.createInvoice },
            },
            [
              _c("i", { staticClass: "fas fa-plus mr-2" }),
              _vm._v("\n        Create invoice\n      "),
            ]
          ),
          _vm._v(" "),
          _c(
            "button",
            {
              staticClass: "btn btn-primary action-btn",
              on: { click: _vm.refreshInvoices },
            },
            [
              _c("i", { staticClass: "fas fa-sync-alt" }),
              _vm._v("\n        Refresh\n      "),
            ]
          ),
        ]),
      ]),
      _vm._v(" "),
      _c("div", { staticClass: "card" }, [
        _vm._m(1),
        _vm._v(" "),
        _c("div", { staticClass: "card-body" }, [
          _c("div", { staticClass: "search-filter-section" }, [
            _c("div", { staticClass: "row" }, [
              _c("div", { staticClass: "col-md-4" }, [
                _c("div", { staticClass: "form-group" }, [
                  _c("label", [_vm._v("Search")]),
                  _vm._v(" "),
                  _c("input", {
                    directives: [
                      {
                        name: "model",
                        rawName: "v-model",
                        value: _vm.searchQuery,
                        expression: "searchQuery",
                      },
                    ],
                    staticClass: "form-control",
                    attrs: {
                      type: "text",
                      placeholder: "Search by invoice number, member name...",
                    },
                    domProps: { value: _vm.searchQuery },
                    on: {
                      input: [
                        function ($event) {
                          if ($event.target.composing) {
                            return
                          }
                          _vm.searchQuery = $event.target.value
                        },
                        _vm.filterInvoices,
                      ],
                    },
                  }),
                ]),
              ]),
              _vm._v(" "),
              _c("div", { staticClass: "col-md-3" }, [
                _c("div", { staticClass: "form-group" }, [
                  _c("label", [_vm._v("Status")]),
                  _vm._v(" "),
                  _c(
                    "select",
                    {
                      directives: [
                        {
                          name: "model",
                          rawName: "v-model",
                          value: _vm.statusFilter,
                          expression: "statusFilter",
                        },
                      ],
                      staticClass: "form-control",
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
                            _vm.statusFilter = $event.target.multiple
                              ? $$selectedVal
                              : $$selectedVal[0]
                          },
                          _vm.filterInvoices,
                        ],
                      },
                    },
                    [
                      _c("option", { attrs: { value: "" } }, [
                        _vm._v("All Statuses"),
                      ]),
                      _vm._v(" "),
                      _c("option", { attrs: { value: "pending" } }, [
                        _vm._v("Pending"),
                      ]),
                      _vm._v(" "),
                      _c("option", { attrs: { value: "paid" } }, [
                        _vm._v("Paid"),
                      ]),
                      _vm._v(" "),
                      _c("option", { attrs: { value: "cancelled" } }, [
                        _vm._v("Cancelled"),
                      ]),
                    ]
                  ),
                ]),
              ]),
              _vm._v(" "),
              _c("div", { staticClass: "col-md-3" }, [
                _c("div", { staticClass: "form-group" }, [
                  _c("label", [_vm._v("Date Range")]),
                  _vm._v(" "),
                  _c(
                    "select",
                    {
                      directives: [
                        {
                          name: "model",
                          rawName: "v-model",
                          value: _vm.dateFilter,
                          expression: "dateFilter",
                        },
                      ],
                      staticClass: "form-control",
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
                            _vm.dateFilter = $event.target.multiple
                              ? $$selectedVal
                              : $$selectedVal[0]
                          },
                          _vm.filterInvoices,
                        ],
                      },
                    },
                    [
                      _c("option", { attrs: { value: "" } }, [
                        _vm._v("All Dates"),
                      ]),
                      _vm._v(" "),
                      _c("option", { attrs: { value: "today" } }, [
                        _vm._v("Today"),
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
                      _c("option", { attrs: { value: "overdue" } }, [
                        _vm._v("Overdue"),
                      ]),
                    ]
                  ),
                ]),
              ]),
              _vm._v(" "),
              _c("div", { staticClass: "col-md-2" }, [
                _c("div", { staticClass: "form-group" }, [
                  _c("label", [_vm._v("Per Page")]),
                  _vm._v(" "),
                  _c(
                    "select",
                    {
                      directives: [
                        {
                          name: "model",
                          rawName: "v-model",
                          value: _vm.perPage,
                          expression: "perPage",
                        },
                      ],
                      staticClass: "form-control",
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
                            _vm.perPage = $event.target.multiple
                              ? $$selectedVal
                              : $$selectedVal[0]
                          },
                          _vm.filterInvoices,
                        ],
                      },
                    },
                    [
                      _c("option", { attrs: { value: "10" } }, [_vm._v("10")]),
                      _vm._v(" "),
                      _c("option", { attrs: { value: "25" } }, [_vm._v("25")]),
                      _vm._v(" "),
                      _c("option", { attrs: { value: "50" } }, [_vm._v("50")]),
                      _vm._v(" "),
                      _c("option", { attrs: { value: "100" } }, [
                        _vm._v("100"),
                      ]),
                    ]
                  ),
                ]),
              ]),
            ]),
          ]),
          _vm._v(" "),
          _vm.loading
            ? _c("div", { staticClass: "text-center py-5" }, [_vm._m(2)])
            : _vm._e(),
          _vm._v(" "),
          _vm.error
            ? _c(
                "div",
                { staticClass: "alert alert-danger", attrs: { role: "alert" } },
                [_vm._v("\n        " + _vm._s(_vm.error) + "\n      ")]
              )
            : _vm._e(),
          _vm._v(" "),
          !_vm.loading && _vm.filteredInvoices.length > 0
            ? _c("div", { staticClass: "table-responsive" }, [
                _c("table", { staticClass: "meals-table" }, [
                  _c("thead", [
                    _c("tr", [
                      _c(
                        "th",
                        {
                          staticClass: "sortable",
                          on: {
                            click: function ($event) {
                              return _vm.sortBy("invoice_number")
                            },
                          },
                        },
                        [
                          _vm._v(
                            "\n                Invoice #\n                "
                          ),
                          _vm.sortKey === "invoice_number"
                            ? _c("i", {
                                class:
                                  _vm.sortOrders.invoice_number === "asc"
                                    ? "fas fa-sort-up"
                                    : "fas fa-sort-down",
                              })
                            : _c("i", { staticClass: "fas fa-sort" }),
                        ]
                      ),
                      _vm._v(" "),
                      _c(
                        "th",
                        {
                          staticClass: "sortable",
                          on: {
                            click: function ($event) {
                              return _vm.sortBy("member_name")
                            },
                          },
                        },
                        [
                          _vm._v("\n                Member\n                "),
                          _vm.sortKey === "member_name"
                            ? _c("i", {
                                class:
                                  _vm.sortOrders.member_name === "asc"
                                    ? "fas fa-sort-up"
                                    : "fas fa-sort-down",
                              })
                            : _c("i", { staticClass: "fas fa-sort" }),
                        ]
                      ),
                      _vm._v(" "),
                      _c(
                        "th",
                        {
                          staticClass: "sortable",
                          on: {
                            click: function ($event) {
                              return _vm.sortBy("plan_name")
                            },
                          },
                        },
                        [
                          _vm._v("\n                Plan\n                "),
                          _vm.sortKey === "plan_name"
                            ? _c("i", {
                                class:
                                  _vm.sortOrders.plan_name === "asc"
                                    ? "fas fa-sort-up"
                                    : "fas fa-sort-down",
                              })
                            : _c("i", { staticClass: "fas fa-sort" }),
                        ]
                      ),
                      _vm._v(" "),
                      _c(
                        "th",
                        {
                          staticClass: "sortable",
                          on: {
                            click: function ($event) {
                              return _vm.sortBy("amount")
                            },
                          },
                        },
                        [
                          _vm._v("\n                Amount\n                "),
                          _vm.sortKey === "amount"
                            ? _c("i", {
                                class:
                                  _vm.sortOrders.amount === "asc"
                                    ? "fas fa-sort-up"
                                    : "fas fa-sort-down",
                              })
                            : _c("i", { staticClass: "fas fa-sort" }),
                        ]
                      ),
                      _vm._v(" "),
                      _c(
                        "th",
                        {
                          staticClass: "sortable",
                          on: {
                            click: function ($event) {
                              return _vm.sortBy("status")
                            },
                          },
                        },
                        [
                          _vm._v("\n                Status\n                "),
                          _vm.sortKey === "status"
                            ? _c("i", {
                                class:
                                  _vm.sortOrders.status === "asc"
                                    ? "fas fa-sort-up"
                                    : "fas fa-sort-down",
                              })
                            : _c("i", { staticClass: "fas fa-sort" }),
                        ]
                      ),
                      _vm._v(" "),
                      _c(
                        "th",
                        {
                          staticClass: "sortable",
                          on: {
                            click: function ($event) {
                              return _vm.sortBy("due_date")
                            },
                          },
                        },
                        [
                          _vm._v(
                            "\n                Due Date\n                "
                          ),
                          _vm.sortKey === "due_date"
                            ? _c("i", {
                                class:
                                  _vm.sortOrders.due_date === "asc"
                                    ? "fas fa-sort-up"
                                    : "fas fa-sort-down",
                              })
                            : _c("i", { staticClass: "fas fa-sort" }),
                        ]
                      ),
                      _vm._v(" "),
                      _c(
                        "th",
                        {
                          staticClass: "sortable",
                          on: {
                            click: function ($event) {
                              return _vm.sortBy("created_at")
                            },
                          },
                        },
                        [
                          _vm._v("\n                Created\n                "),
                          _vm.sortKey === "created_at"
                            ? _c("i", {
                                class:
                                  _vm.sortOrders.created_at === "asc"
                                    ? "fas fa-sort-up"
                                    : "fas fa-sort-down",
                              })
                            : _c("i", { staticClass: "fas fa-sort" }),
                        ]
                      ),
                      _vm._v(" "),
                      _c("th", [_vm._v("Actions")]),
                    ]),
                  ]),
                  _vm._v(" "),
                  _c(
                    "tbody",
                    _vm._l(_vm.paginatedInvoices, function (invoice) {
                      return _c(
                        "tr",
                        { key: invoice.id, staticClass: "meal-row" },
                        [
                          _c("td", { staticClass: "invoice-number" }, [
                            _c("strong", [
                              _vm._v(_vm._s(invoice.invoice_number)),
                            ]),
                          ]),
                          _vm._v(" "),
                          _c("td", { staticClass: "member-name" }, [
                            _c("div", { staticClass: "member-info" }, [
                              _c("div", { staticClass: "member-name-text" }, [
                                _vm._v(
                                  _vm._s(
                                    invoice.member && invoice.member.membername
                                      ? invoice.member.membername
                                      : "N/A"
                                  )
                                ),
                              ]),
                              _vm._v(" "),
                              _c("small", { staticClass: "text-muted" }, [
                                _vm._v(
                                  _vm._s(
                                    invoice.member && invoice.member.email
                                      ? invoice.member.email
                                      : "N/A"
                                  )
                                ),
                              ]),
                            ]),
                          ]),
                          _vm._v(" "),
                          _c("td", { staticClass: "plan-name" }, [
                            _c("span", { staticClass: "plan-badge" }, [
                              _vm._v(
                                _vm._s(
                                  invoice.subscription_plan &&
                                    invoice.subscription_plan.name
                                    ? invoice.subscription_plan.name
                                    : "N/A"
                                )
                              ),
                            ]),
                          ]),
                          _vm._v(" "),
                          _c("td", { staticClass: "amount" }, [
                            _c("span", { staticClass: "amount-value" }, [
                              _vm._v(
                                "$" +
                                  _vm._s(parseFloat(invoice.amount).toFixed(2))
                              ),
                            ]),
                          ]),
                          _vm._v(" "),
                          _c("td", { staticClass: "status" }, [
                            _c(
                              "span",
                              {
                                class: _vm.getStatusBadgeClass(invoice.status),
                              },
                              [
                                _vm._v(
                                  "\n                  " +
                                    _vm._s(_vm.getStatusText(invoice.status)) +
                                    "\n                "
                                ),
                              ]
                            ),
                          ]),
                          _vm._v(" "),
                          _c("td", { staticClass: "due-date" }, [
                            _c(
                              "span",
                              { class: _vm.getDueDateClass(invoice.due_date) },
                              [
                                _vm._v(
                                  "\n                  " +
                                    _vm._s(_vm.formatDate(invoice.due_date)) +
                                    "\n                "
                                ),
                              ]
                            ),
                          ]),
                          _vm._v(" "),
                          _c("td", { staticClass: "created-date" }, [
                            _vm._v(
                              "\n                " +
                                _vm._s(_vm.formatDate(invoice.created_at)) +
                                "\n              "
                            ),
                          ]),
                          _vm._v(" "),
                          _c("td", { staticClass: "actions" }, [
                            _c("div", { staticClass: "action-buttons" }, [
                              _c(
                                "button",
                                {
                                  staticClass: "action-btn view-btn",
                                  attrs: { title: "View Invoice" },
                                  on: {
                                    click: function ($event) {
                                      return _vm.viewInvoice(invoice)
                                    },
                                  },
                                },
                                [_c("i", { staticClass: "fas fa-eye" })]
                              ),
                              _vm._v(" "),
                              invoice.status === "pending"
                                ? _c(
                                    "button",
                                    {
                                      staticClass: "action-btn edit-btn",
                                      attrs: { title: "Mark as Paid" },
                                      on: {
                                        click: function ($event) {
                                          return _vm.markAsPaid(invoice)
                                        },
                                      },
                                    },
                                    [_c("i", { staticClass: "fas fa-check" })]
                                  )
                                : _vm._e(),
                              _vm._v(" "),
                              invoice.status === "pending"
                                ? _c(
                                    "button",
                                    {
                                      staticClass: "action-btn delete-btn",
                                      attrs: { title: "Cancel Invoice" },
                                      on: {
                                        click: function ($event) {
                                          return _vm.cancelInvoice(invoice)
                                        },
                                      },
                                    },
                                    [_c("i", { staticClass: "fas fa-times" })]
                                  )
                                : _vm._e(),
                              _vm._v(" "),
                              _c(
                                "button",
                                {
                                  staticClass: "action-btn view-btn",
                                  attrs: { title: "Download PDF" },
                                  on: {
                                    click: function ($event) {
                                      return _vm.downloadInvoice(invoice)
                                    },
                                  },
                                },
                                [_c("i", { staticClass: "fas fa-download" })]
                              ),
                            ]),
                          ]),
                        ]
                      )
                    }),
                    0
                  ),
                ]),
              ])
            : _vm._e(),
          _vm._v(" "),
          !_vm.loading && _vm.filteredInvoices.length === 0
            ? _c("div", { staticClass: "text-center py-5" }, [
                _c("i", {
                  staticClass:
                    "fas fa-file-invoice-dollar fa-3x text-muted mb-3",
                }),
                _vm._v(" "),
                _c("h5", { staticClass: "text-muted" }, [
                  _vm._v("No invoices found"),
                ]),
                _vm._v(" "),
                _c("p", { staticClass: "text-muted" }, [
                  _vm._v("No invoices match your current filters."),
                ]),
              ])
            : _vm._e(),
          _vm._v(" "),
          !_vm.loading && _vm.filteredInvoices.length > 0
            ? _c("div", { staticClass: "pagination-section" }, [
                _c(
                  "div",
                  {
                    staticClass:
                      "d-flex justify-content-between align-items-center",
                  },
                  [
                    _c("div", { staticClass: "pagination-info" }, [
                      _vm._v(
                        "\n            Showing " +
                          _vm._s(_vm.paginationStart) +
                          " - " +
                          _vm._s(_vm.paginationEnd) +
                          " of " +
                          _vm._s(_vm.filteredInvoices.length) +
                          " invoices\n          "
                      ),
                    ]),
                    _vm._v(" "),
                    _c("nav", [
                      _c(
                        "ul",
                        { staticClass: "pagination" },
                        [
                          _c(
                            "li",
                            {
                              staticClass: "page-item",
                              class: { disabled: _vm.currentPage === 1 },
                            },
                            [
                              _c(
                                "a",
                                {
                                  staticClass: "page-link",
                                  attrs: { href: "#" },
                                  on: {
                                    click: function ($event) {
                                      $event.preventDefault()
                                      return _vm.changePage(_vm.currentPage - 1)
                                    },
                                  },
                                },
                                [
                                  _vm._v(
                                    "\n                  Previous\n                "
                                  ),
                                ]
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
                                class: { active: page === _vm.currentPage },
                              },
                              [
                                _c(
                                  "a",
                                  {
                                    staticClass: "page-link",
                                    attrs: { href: "#" },
                                    on: {
                                      click: function ($event) {
                                        $event.preventDefault()
                                        return _vm.changePage(page)
                                      },
                                    },
                                  },
                                  [_vm._v(_vm._s(page))]
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
                                disabled: _vm.currentPage === _vm.totalPages,
                              },
                            },
                            [
                              _c(
                                "a",
                                {
                                  staticClass: "page-link",
                                  attrs: { href: "#" },
                                  on: {
                                    click: function ($event) {
                                      $event.preventDefault()
                                      return _vm.changePage(_vm.currentPage + 1)
                                    },
                                  },
                                },
                                [
                                  _vm._v(
                                    "\n                  Next\n                "
                                  ),
                                ]
                              ),
                            ]
                          ),
                        ],
                        2
                      ),
                    ]),
                  ]
                ),
              ])
            : _vm._e(),
        ]),
      ]),
      _vm._v(" "),
      _c(
        "b-modal",
        {
          staticClass: "create-invoice-modal",
          attrs: {
            title: "Create invoice",
            size: "lg",
            centered: "",
            "hide-footer": "",
          },
          on: { hide: _vm.closeCreateInvoiceModal },
          model: {
            value: _vm.showCreateInvoiceModal,
            callback: function ($$v) {
              _vm.showCreateInvoiceModal = $$v
            },
            expression: "showCreateInvoiceModal",
          },
        },
        [
          _c(
            "form",
            {
              on: {
                submit: function ($event) {
                  $event.preventDefault()
                  return _vm.submitInvoice.apply(null, arguments)
                },
              },
            },
            [
              _c("div", { staticClass: "row" }, [
                _c("div", { staticClass: "col-md-6 mb-4" }, [
                  _c("h5", { staticClass: "section-title mb-3" }, [
                    _vm._v("Invoice Details"),
                  ]),
                  _vm._v(" "),
                  _c("div", { staticClass: "form-group mb-3" }, [
                    _c("label", { staticClass: "d-flex align-items-center" }, [
                      _c("span", { staticClass: "me-2" }, [_vm._v("Date")]),
                    ]),
                    _vm._v(" "),
                    _c("input", {
                      directives: [
                        {
                          name: "model",
                          rawName: "v-model",
                          value: _vm.invoiceForm.date,
                          expression: "invoiceForm.date",
                        },
                      ],
                      staticClass: "form-control",
                      attrs: { type: "text", readonly: "" },
                      domProps: { value: _vm.invoiceForm.date },
                      on: {
                        input: function ($event) {
                          if ($event.target.composing) {
                            return
                          }
                          _vm.$set(_vm.invoiceForm, "date", $event.target.value)
                        },
                      },
                    }),
                  ]),
                  _vm._v(" "),
                  _c("div", { staticClass: "form-group mb-3" }, [
                    _c("label", { staticClass: "d-flex align-items-center" }, [
                      _c("span", { staticClass: "me-2" }, [
                        _vm._v("Payment method"),
                      ]),
                    ]),
                    _vm._v(" "),
                    _c(
                      "select",
                      {
                        directives: [
                          {
                            name: "model",
                            rawName: "v-model",
                            value: _vm.invoiceForm.payment_method,
                            expression: "invoiceForm.payment_method",
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
                              _vm.invoiceForm,
                              "payment_method",
                              $event.target.multiple
                                ? $$selectedVal
                                : $$selectedVal[0]
                            )
                          },
                        },
                      },
                      [
                        _c("option", { domProps: { value: null } }, [
                          _vm._v("Select payment method"),
                        ]),
                        _vm._v(" "),
                        _c("option", { attrs: { value: "cash" } }, [
                          _vm._v("Cash"),
                        ]),
                        _vm._v(" "),
                        _c("option", { attrs: { value: "credit_card" } }, [
                          _vm._v("Credit Card"),
                        ]),
                        _vm._v(" "),
                        _c("option", { attrs: { value: "debit_card" } }, [
                          _vm._v("Debit Card"),
                        ]),
                        _vm._v(" "),
                        _c("option", { attrs: { value: "bank_transfer" } }, [
                          _vm._v("Bank Transfer"),
                        ]),
                        _vm._v(" "),
                        _c("option", { attrs: { value: "check" } }, [
                          _vm._v("Check"),
                        ]),
                        _vm._v(" "),
                        _c("option", { attrs: { value: "other" } }, [
                          _vm._v("Other"),
                        ]),
                      ]
                    ),
                  ]),
                  _vm._v(" "),
                  _c("div", { staticClass: "form-group mb-3" }, [
                    _c("label", { staticClass: "d-flex align-items-center" }, [
                      _c("span", { staticClass: "me-2" }, [
                        _vm._v("Invoice text"),
                      ]),
                    ]),
                    _vm._v(" "),
                    _c(
                      "select",
                      {
                        directives: [
                          {
                            name: "model",
                            rawName: "v-model",
                            value: _vm.invoiceForm.invoice_text,
                            expression: "invoiceForm.invoice_text",
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
                              _vm.invoiceForm,
                              "invoice_text",
                              $event.target.multiple
                                ? $$selectedVal
                                : $$selectedVal[0]
                            )
                          },
                        },
                      },
                      [
                        _c(
                          "option",
                          { attrs: { value: "Default invoice text" } },
                          [_vm._v("Default invoice text")]
                        ),
                        _vm._v(" "),
                        _c("option", { attrs: { value: "Custom text 1" } }, [
                          _vm._v("Custom text 1"),
                        ]),
                        _vm._v(" "),
                        _c("option", { attrs: { value: "Custom text 2" } }, [
                          _vm._v("Custom text 2"),
                        ]),
                      ]
                    ),
                  ]),
                  _vm._v(" "),
                  _c("div", { staticClass: "form-group mb-3" }, [
                    _c("label", { staticClass: "d-flex align-items-center" }, [
                      _c("span", { staticClass: "me-2" }, [
                        _vm._v("Supplementary invoice text"),
                      ]),
                      _vm._v(" "),
                      _c("i", {
                        staticClass: "fas fa-info-circle text-muted ms-2",
                        staticStyle: { "font-size": "0.875rem" },
                      }),
                    ]),
                    _vm._v(" "),
                    _c("textarea", {
                      directives: [
                        {
                          name: "model",
                          rawName: "v-model",
                          value: _vm.invoiceForm.supplementary_text,
                          expression: "invoiceForm.supplementary_text",
                        },
                      ],
                      staticClass: "form-control",
                      attrs: {
                        rows: "4",
                        placeholder: "Enter supplementary invoice text",
                      },
                      domProps: { value: _vm.invoiceForm.supplementary_text },
                      on: {
                        input: function ($event) {
                          if ($event.target.composing) {
                            return
                          }
                          _vm.$set(
                            _vm.invoiceForm,
                            "supplementary_text",
                            $event.target.value
                          )
                        },
                      },
                    }),
                  ]),
                ]),
                _vm._v(" "),
                _c("div", { staticClass: "col-md-6 mb-4" }, [
                  _c("h5", { staticClass: "section-title mb-3" }, [
                    _vm._v("Billing Information"),
                  ]),
                  _vm._v(" "),
                  _c("div", { staticClass: "form-group mb-3" }, [
                    _c("label", { staticClass: "d-flex align-items-center" }, [
                      _c("span", { staticClass: "me-2" }, [_vm._v("Bill to")]),
                    ]),
                    _vm._v(" "),
                    _c(
                      "select",
                      {
                        directives: [
                          {
                            name: "model",
                            rawName: "v-model",
                            value: _vm.invoiceForm.bill_to,
                            expression: "invoiceForm.bill_to",
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
                              _vm.invoiceForm,
                              "bill_to",
                              $event.target.multiple
                                ? $$selectedVal
                                : $$selectedVal[0]
                            )
                          },
                        },
                      },
                      [
                        _c("option", { domProps: { value: null } }, [
                          _vm._v("Select member"),
                        ]),
                        _vm._v(" "),
                        _vm._l(_vm.members, function (member) {
                          return _c(
                            "option",
                            { key: member.id, domProps: { value: member.id } },
                            [
                              _vm._v(
                                "\n                " +
                                  _vm._s(_vm.getMemberName(member)) +
                                  _vm._s(
                                    member.email
                                      ? " (" + member.email + ")"
                                      : ""
                                  ) +
                                  "\n              "
                              ),
                            ]
                          )
                        }),
                      ],
                      2
                    ),
                  ]),
                  _vm._v(" "),
                  _c("div", { staticClass: "form-group mb-3" }, [
                    _c("label", { staticClass: "d-flex align-items-center" }, [
                      _c("span", { staticClass: "me-2" }, [_vm._v("Plan")]),
                    ]),
                    _vm._v(" "),
                    _c(
                      "select",
                      {
                        directives: [
                          {
                            name: "model",
                            rawName: "v-model",
                            value: _vm.invoiceForm.subscription_plan_id,
                            expression: "invoiceForm.subscription_plan_id",
                          },
                        ],
                        staticClass: "form-control",
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
                                _vm.invoiceForm,
                                "subscription_plan_id",
                                $event.target.multiple
                                  ? $$selectedVal
                                  : $$selectedVal[0]
                              )
                            },
                            _vm.onPlanChange,
                          ],
                        },
                      },
                      [
                        _c("option", { domProps: { value: null } }, [
                          _vm._v("Select plan (optional)"),
                        ]),
                        _vm._v(" "),
                        _vm._l(_vm.plans, function (plan) {
                          return _c(
                            "option",
                            { key: plan.id, domProps: { value: plan.id } },
                            [
                              _vm._v(
                                "\n                " +
                                  _vm._s(plan.name) +
                                  " - $" +
                                  _vm._s(
                                    parseFloat(plan.price || 0).toFixed(2)
                                  ) +
                                  "\n              "
                              ),
                            ]
                          )
                        }),
                      ],
                      2
                    ),
                  ]),
                  _vm._v(" "),
                  _c("div", { staticClass: "form-group mb-3" }, [
                    _c("label", { staticClass: "d-flex align-items-center" }, [
                      _c("span", { staticClass: "me-2" }, [_vm._v("Sold by")]),
                    ]),
                    _vm._v(" "),
                    _c("input", {
                      directives: [
                        {
                          name: "model",
                          rawName: "v-model",
                          value: _vm.invoiceForm.sold_by,
                          expression: "invoiceForm.sold_by",
                        },
                      ],
                      staticClass: "form-control",
                      attrs: { type: "text", readonly: "" },
                      domProps: { value: _vm.invoiceForm.sold_by },
                      on: {
                        input: function ($event) {
                          if ($event.target.composing) {
                            return
                          }
                          _vm.$set(
                            _vm.invoiceForm,
                            "sold_by",
                            $event.target.value
                          )
                        },
                      },
                    }),
                  ]),
                ]),
              ]),
              _vm._v(" "),
              _c(
                "div",
                {
                  staticClass:
                    "modal-footer-actions d-flex justify-content-between mt-4 pt-3 border-top",
                },
                [
                  _c(
                    "button",
                    {
                      staticClass: "btn btn-secondary",
                      attrs: { type: "button" },
                      on: { click: _vm.closeCreateInvoiceModal },
                    },
                    [_vm._v("\n          Back\n        ")]
                  ),
                  _vm._v(" "),
                  _c(
                    "button",
                    {
                      staticClass: "btn btn-primary",
                      attrs: { type: "submit", disabled: _vm.isSubmitting },
                    },
                    [
                      _vm.isSubmitting
                        ? _c("span", {
                            staticClass:
                              "spinner-border spinner-border-sm mr-2",
                          })
                        : _vm._e(),
                      _vm._v("\n          Create invoice\n        "),
                    ]
                  ),
                ]
              ),
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
        _c("i", { staticClass: "fas fa-file-invoice" }),
        _vm._v("\n              Invoices & Receipts\n            "),
      ]
    )
  },
  function () {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "card-header" }, [
      _c(
        "div",
        { staticClass: "d-flex justify-content-between align-items-center" },
        [
          _c("h4", { staticClass: "text-white" }, [
            _vm._v("Invoices & Receipts"),
          ]),
        ]
      ),
    ])
  },
  function () {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c(
      "div",
      { staticClass: "spinner-border text-primary", attrs: { role: "status" } },
      [_c("span", { staticClass: "visually-hidden" }, [_vm._v("Loading...")])]
    )
  },
]
render._withStripped = true



/***/ })

}]);