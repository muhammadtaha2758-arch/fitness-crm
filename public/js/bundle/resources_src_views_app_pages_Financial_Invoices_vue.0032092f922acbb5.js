"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["resources_src_views_app_pages_Financial_Invoices_vue"],{

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/Financial/Invoices.vue?vue&type=script&lang=js":
/*!******************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/Financial/Invoices.vue?vue&type=script&lang=js ***!
  \******************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
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

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  name: "Invoices",
  data: function data() {
    return {
      activeSubTab: 'invoices',
      showCreateInvoiceModal: false,
      isSubmitting: false,
      members: [],
      invoiceForm: {
        date: this.getCurrentDate(),
        payment_method: null,
        invoice_text: 'Default invoice text',
        supplementary_text: '',
        is_guest: false,
        bill_to: null,
        sold_by: '',
        member_id: null
      },
      paymentMethodOptions: [{
        value: null,
        text: 'Select payment method'
      }, {
        value: 'cash',
        text: 'Cash'
      }, {
        value: 'credit_card',
        text: 'Credit Card'
      }, {
        value: 'debit_card',
        text: 'Debit Card'
      }, {
        value: 'bank_transfer',
        text: 'Bank Transfer'
      }, {
        value: 'check',
        text: 'Check'
      }, {
        value: 'other',
        text: 'Other'
      }],
      invoiceTextOptions: [{
        value: 'Default invoice text',
        text: 'Default invoice text'
      }, {
        value: 'Custom text 1',
        text: 'Custom text 1'
      }, {
        value: 'Custom text 2',
        text: 'Custom text 2'
      }],
      invoices: [{
        id: 1,
        number: '(Pro forma)',
        isProForma: true,
        date: '08/21/2025',
        firstName: 'Charles',
        lastName: 'Fox',
        description: 'Unlimited Discounted Small Group Classes (08/1...',
        price: '250.00',
        status: '250.00 Outstanding',
        statusClass: 'outstanding'
      }, {
        id: 2,
        number: '4125',
        isProForma: false,
        date: '08/20/2025',
        firstName: 'Monica',
        lastName: 'Morgan',
        description: 'General Nutrition (08/20/2025 - 09/19/2025)',
        price: '250.00',
        status: 'Paid',
        statusClass: 'paid'
      }, {
        id: 3,
        number: '4124',
        isProForma: false,
        date: '08/20/2025',
        firstName: 'Kristopher',
        lastName: 'Hampton',
        description: 'Unlimited Small Group Training (08/20/2025 - 0...',
        price: '300.00',
        status: 'Paid',
        statusClass: 'paid'
      }, {
        id: 4,
        number: '4123',
        isProForma: false,
        date: '08/19/2025',
        firstName: 'Jason',
        lastName: 'Fischer',
        description: 'Group Training (12) (08/18/2025 - 09/17/2025)',
        price: '250.00',
        status: 'Paid',
        statusClass: 'paid'
      }, {
        id: 5,
        number: '4122',
        isProForma: false,
        date: '08/19/2025',
        firstName: 'Donnie',
        lastName: 'McVicker',
        description: 'Small Group Training (8) (08/19/2025 - 09/18/20...',
        price: '175.00',
        status: 'Paid',
        statusClass: 'paid'
      }, {
        id: 6,
        number: '4121',
        isProForma: false,
        date: '08/17/2025',
        firstName: 'Shundreyous',
        lastName: 'Smith',
        description: '$10 Open Gym Membership (08/23/2025 - 09/2...)',
        price: '10.00',
        status: 'Paid',
        statusClass: 'paid'
      }, {
        id: 7,
        number: '4120',
        isProForma: false,
        date: '08/17/2025',
        firstName: 'Timothy',
        lastName: 'Boykin',
        description: '$25 Open Gym Membership, Custom discount (0...',
        price: '10.00',
        status: 'Paid',
        statusClass: 'paid'
      }, {
        id: 8,
        number: '4119',
        isProForma: false,
        date: '08/16/2025',
        firstName: 'Paul',
        lastName: 'Steffen',
        description: 'Meal Plan (08/13/2025 - 09/12/2025)',
        price: '150.00',
        status: 'Paid',
        statusClass: 'paid'
      }, {
        id: 9,
        number: '4118',
        isProForma: false,
        date: '08/16/2025',
        firstName: 'Sharonda',
        lastName: 'Burton',
        description: 'Unlimited Small Group Training (08/16/2025 - 0...',
        price: '300.00',
        status: 'Paid',
        statusClass: 'paid'
      }]
    };
  },
  computed: {
    billToOptions: function billToOptions() {
      if (this.invoiceForm.is_guest) {
        return [{
          value: 'guest',
          text: 'Guest'
        }];
      }
      var options = [{
        value: null,
        text: 'Select member'
      }];
      this.members.forEach(function (member) {
        var name = member.membername || (member.firstname && member.lastname ? "".concat(member.firstname, " ").concat(member.lastname) : '') || member.name || 'Unknown';
        options.push({
          value: member.id,
          text: "".concat(name).concat(member.email ? " (".concat(member.email, ")") : '')
        });
      });
      return options;
    }
  },
  mounted: function mounted() {
    this.loadMembers();
    this.loadAdminName();
  },
  methods: {
    getCurrentDate: function getCurrentDate() {
      var today = new Date();
      var month = String(today.getMonth() + 1).padStart(2, '0');
      var day = String(today.getDate()).padStart(2, '0');
      var year = today.getFullYear();
      return "".concat(month, "/").concat(day, "/").concat(year);
    },
    setActiveSubTab: function setActiveSubTab(tab) {
      this.activeSubTab = tab;
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
        is_guest: false,
        bill_to: null,
        sold_by: this.invoiceForm.sold_by || '',
        member_id: null
      };
    },
    handleGuestChange: function handleGuestChange() {
      if (this.invoiceForm.is_guest) {
        this.invoiceForm.bill_to = 'guest';
        this.invoiceForm.member_id = null;
      } else {
        this.invoiceForm.bill_to = null;
        this.invoiceForm.member_id = null;
      }
    },
    loadMembers: function loadMembers() {
      var _this = this;
      return _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
        var response;
        return _regeneratorRuntime().wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              _context.next = 3;
              return window.axios.get('get_clients_without_paginate');
            case 3:
              response = _context.sent;
              if (response.data && Array.isArray(response.data)) {
                _this.members = response.data;
              } else if (response.data && response.data.data && Array.isArray(response.data.data)) {
                _this.members = response.data.data;
              }
              _context.next = 11;
              break;
            case 7:
              _context.prev = 7;
              _context.t0 = _context["catch"](0);
              console.error('Error loading members:', _context.t0);
              _this.$bvToast.toast('Failed to load members', {
                title: 'Error',
                variant: 'danger',
                solid: true
              });
            case 11:
            case "end":
              return _context.stop();
          }
        }, _callee, null, [[0, 7]]);
      }))();
    },
    loadAdminName: function loadAdminName() {
      var _this2 = this;
      return _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee2() {
        var user, userData, _user, sessionUserData, _user2;
        return _regeneratorRuntime().wrap(function _callee2$(_context2) {
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
              _context2.prev = 0;
              if (!(_this2.$store && _this2.$store.state.auth && _this2.$store.state.auth.user)) {
                _context2.next = 5;
                break;
              }
              user = _this2.$store.state.auth.user;
              _this2.invoiceForm.sold_by = user.name || user.username || user.email || 'Admin';
              return _context2.abrupt("return");
            case 5:
              // Try localStorage
              userData = localStorage.getItem('user');
              if (!userData) {
                _context2.next = 16;
                break;
              }
              _context2.prev = 7;
              _user = JSON.parse(userData);
              _this2.invoiceForm.sold_by = _user.name || _user.username || _user.email || 'Admin';
              return _context2.abrupt("return");
            case 13:
              _context2.prev = 13;
              _context2.t0 = _context2["catch"](7);
              console.error('Error parsing user data:', _context2.t0);
            case 16:
              // Try sessionStorage
              sessionUserData = sessionStorage.getItem('user');
              if (!sessionUserData) {
                _context2.next = 27;
                break;
              }
              _context2.prev = 18;
              _user2 = JSON.parse(sessionUserData);
              _this2.invoiceForm.sold_by = _user2.name || _user2.username || _user2.email || 'Admin';
              return _context2.abrupt("return");
            case 24:
              _context2.prev = 24;
              _context2.t1 = _context2["catch"](18);
              console.error('Error parsing session user data:', _context2.t1);
            case 27:
              // Default fallback
              _this2.invoiceForm.sold_by = 'Admin';
              _context2.next = 34;
              break;
            case 30:
              _context2.prev = 30;
              _context2.t2 = _context2["catch"](0);
              console.error('Error loading admin name:', _context2.t2);
              _this2.invoiceForm.sold_by = 'Admin';
            case 34:
            case "end":
              return _context2.stop();
          }
        }, _callee2, null, [[0, 30], [7, 13], [18, 24]]);
      }))();
    },
    submitInvoice: function submitInvoice() {
      var _this3 = this;
      return _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee3() {
        var invoiceData, response, _error$response, _error$response2, errorMessage;
        return _regeneratorRuntime().wrap(function _callee3$(_context3) {
          while (1) switch (_context3.prev = _context3.next) {
            case 0:
              if (_this3.invoiceForm.payment_method) {
                _context3.next = 3;
                break;
              }
              _this3.$bvToast.toast('Please select a payment method', {
                title: 'Validation Error',
                variant: 'warning',
                solid: true
              });
              return _context3.abrupt("return");
            case 3:
              if (!(!_this3.invoiceForm.is_guest && (!_this3.invoiceForm.bill_to || _this3.invoiceForm.bill_to === 'guest'))) {
                _context3.next = 6;
                break;
              }
              _this3.$bvToast.toast('Please select a member to bill', {
                title: 'Validation Error',
                variant: 'warning',
                solid: true
              });
              return _context3.abrupt("return");
            case 6:
              _this3.isSubmitting = true;
              _context3.prev = 7;
              // Prepare invoice data
              invoiceData = {
                member_id: _this3.invoiceForm.is_guest ? null : _this3.invoiceForm.bill_to === 'guest' ? null : _this3.invoiceForm.bill_to,
                payment_method: _this3.invoiceForm.payment_method,
                invoice_text: _this3.invoiceForm.invoice_text,
                supplementary_text: _this3.invoiceForm.supplementary_text,
                sold_by: _this3.invoiceForm.sold_by,
                is_guest: _this3.invoiceForm.is_guest ? 1 : 0,
                due_date: _this3.formatDateForBackend(_this3.invoiceForm.date),
                amount: 0,
                // Will be set when products are added
                description: _this3.invoiceForm.supplementary_text || 'Invoice created'
              };
              _context3.next = 11;
              return window.axios.post('invoices', invoiceData);
            case 11:
              response = _context3.sent;
              if (!response.data.success) {
                _context3.next = 17;
                break;
              }
              _this3.$bvToast.toast('Invoice created successfully', {
                title: 'Success',
                variant: 'success',
                solid: true
              });
              _this3.closeCreateInvoiceModal();
              // Reload invoices list if needed
              // this.loadInvoices();
              _context3.next = 18;
              break;
            case 17:
              throw new Error(response.data.message || 'Failed to create invoice');
            case 18:
              _context3.next = 25;
              break;
            case 20:
              _context3.prev = 20;
              _context3.t0 = _context3["catch"](7);
              console.error('Error creating invoice:', _context3.t0);
              errorMessage = ((_error$response = _context3.t0.response) === null || _error$response === void 0 || (_error$response = _error$response.data) === null || _error$response === void 0 ? void 0 : _error$response.message) || ((_error$response2 = _context3.t0.response) === null || _error$response2 === void 0 || (_error$response2 = _error$response2.data) === null || _error$response2 === void 0 ? void 0 : _error$response2.error) || _context3.t0.message || 'Failed to create invoice';
              _this3.$bvToast.toast(errorMessage, {
                title: 'Error',
                variant: 'danger',
                solid: true
              });
            case 25:
              _context3.prev = 25;
              _this3.isSubmitting = false;
              return _context3.finish(25);
            case 28:
            case "end":
              return _context3.stop();
          }
        }, _callee3, null, [[7, 20, 25, 28]]);
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

/***/ "./node_modules/css-loader/dist/cjs.js??clonedRuleSet-12.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12.use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-12.use[3]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/Financial/Invoices.vue?vue&type=style&index=0&id=18546b89&scoped=true&lang=scss":
/*!*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??clonedRuleSet-12.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12.use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-12.use[3]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/Financial/Invoices.vue?vue&type=style&index=0&id=18546b89&scoped=true&lang=scss ***!
  \*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
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
___CSS_LOADER_EXPORT___.push([module.id, "@charset \"UTF-8\";\n.filter-btn .btn[data-v-18546b89],\n.filter-btn .btn-secondary[data-v-18546b89],\n.filter-btn .btn-outline-secondary[data-v-18546b89],\n.filter-btn button.btn[data-v-18546b89],\n.filter-btn button.btn-secondary[data-v-18546b89] {\n  color: #000 !important;\n  background-color: transparent !important;\n  border-color: #6c757d !important;\n}\n.filter-btn .btn[data-v-18546b89]:hover,\n.filter-btn .btn-secondary[data-v-18546b89]:hover,\n.filter-btn .btn-outline-secondary[data-v-18546b89]:hover,\n.filter-btn button.btn[data-v-18546b89]:hover,\n.filter-btn button.btn-secondary[data-v-18546b89]:hover {\n  color: #dc3545 !important;\n  background-color: transparent !important;\n  border-color: #dc3545 !important;\n  box-shadow: none !important;\n}\n.filter-btn .btn[data-v-18546b89]:focus,\n.filter-btn .btn-secondary[data-v-18546b89]:focus,\n.filter-btn .btn-outline-secondary[data-v-18546b89]:focus,\n.filter-btn button.btn[data-v-18546b89]:focus,\n.filter-btn button.btn-secondary[data-v-18546b89]:focus {\n  color: #dc3545 !important;\n  background-color: transparent !important;\n  border-color: #dc3545 !important;\n  box-shadow: none !important;\n}\n.filter-btn .btn[data-v-18546b89]:active,\n.filter-btn .btn-secondary[data-v-18546b89]:active,\n.filter-btn .btn-outline-secondary[data-v-18546b89]:active,\n.filter-btn button.btn[data-v-18546b89]:active,\n.filter-btn button.btn-secondary[data-v-18546b89]:active {\n  color: #dc3545 !important;\n  background-color: transparent !important;\n  border-color: #dc3545 !important;\n}\n.btn-secondary[data-v-18546b89]:not(:disabled):not(.disabled):active:focus {\n  box-shadow: none !important;\n}\n\n/* ===========================================\n   COMMON BREADCRUMB NAVIGATION STYLES\n   =========================================== */\n.breadcrumb-nav-row[data-v-18546b89] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  margin-bottom: 0.5rem;\n  gap: 0.5rem;\n}\n.breadcrumb-section[data-v-18546b89] {\n  flex: 1;\n}\n.breadcrumb-section .breadcrumb-nav .breadcrumb-container[data-v-18546b89] {\n  display: flex;\n  align-items: center;\n  gap: 1rem;\n}\n.breadcrumb-section .breadcrumb-nav .breadcrumb-container .back-button[data-v-18546b89] {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  width: 40px;\n  height: 40px;\n  background: rgba(255, 255, 255, 0.1);\n  border: 1px solid rgba(255, 255, 255, 0.2);\n  border-radius: 8px;\n  color: #ffffff;\n  cursor: pointer;\n  transition: all 0.3s ease;\n}\n.breadcrumb-section .breadcrumb-nav .breadcrumb-container .back-button[data-v-18546b89]:hover {\n  background: rgba(255, 255, 255, 0.15);\n  border-color: rgba(255, 255, 255, 0.3);\n  transform: translateY(-1px);\n  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);\n  color: #dc3545;\n}\n.breadcrumb-section .breadcrumb-nav .breadcrumb-container .back-button i[data-v-18546b89] {\n  font-size: 1.1em;\n}\n.breadcrumb-section .breadcrumb-nav .breadcrumb-container .breadcrumb[data-v-18546b89] {\n  display: flex;\n  align-items: center;\n  gap: 0.5rem;\n  margin: 0;\n  padding: 0;\n  background: none;\n  border-radius: 0;\n}\n.breadcrumb-section .breadcrumb-nav .breadcrumb-container .breadcrumb .breadcrumb-item[data-v-18546b89] {\n  display: flex;\n  align-items: center;\n  gap: 0.5rem;\n  font-size: 0.875rem;\n  color: #ffffff;\n}\n.breadcrumb-section .breadcrumb-nav .breadcrumb-container .breadcrumb .breadcrumb-item.active[data-v-18546b89] {\n  color: #252525;\n  font-weight: 600;\n}\n.breadcrumb-section .breadcrumb-nav .breadcrumb-container .breadcrumb .breadcrumb-item.active i[data-v-18546b89] {\n  color: #dc3545;\n}\n.breadcrumb-section .breadcrumb-nav .breadcrumb-container .breadcrumb .breadcrumb-item a[data-v-18546b89] {\n  display: flex;\n  align-items: center;\n  gap: 0.5rem;\n  color: #6a6a6a;\n  text-decoration: none;\n  transition: color 0.3s ease;\n}\n.breadcrumb-section .breadcrumb-nav .breadcrumb-container .breadcrumb .breadcrumb-item a[data-v-18546b89]:hover {\n  color: #dc3545;\n}\n.breadcrumb-section .breadcrumb-nav .breadcrumb-container .breadcrumb .breadcrumb-item a:hover i[data-v-18546b89] {\n  color: #dc3545;\n}\n.breadcrumb-section .breadcrumb-nav .breadcrumb-container .breadcrumb .breadcrumb-item a i[data-v-18546b89] {\n  font-size: 0.9em;\n  transition: color 0.3s ease;\n}\n.breadcrumb-section .breadcrumb-nav .breadcrumb-container .breadcrumb .breadcrumb-item[data-v-18546b89]:not(:last-child)::after {\n  content: \"›\";\n  margin-left: 0.5rem;\n  color: #6a6a6a;\n  font-size: 1.2em;\n}\n.action-section[data-v-18546b89] {\n  display: flex;\n  align-items: center;\n}\n.action-section .action-btn[data-v-18546b89] {\n  display: flex;\n  align-items: center;\n  gap: 0.5rem;\n  padding: 0.5rem 1rem;\n  border-radius: 8px;\n  font-size: 0.875rem;\n  font-weight: 500;\n  transition: all 0.3s ease;\n}\n.action-section .action-btn[data-v-18546b89]:hover:not(:disabled) {\n  transform: translateY(-1px);\n  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);\n}\n.action-section .action-btn[data-v-18546b89]:disabled {\n  opacity: 0.6;\n  cursor: not-allowed;\n}\n.action-section .action-btn i[data-v-18546b89] {\n  font-size: 0.9em;\n}\n@media (max-width: 768px) {\n.breadcrumb-nav-row[data-v-18546b89] {\n    flex-direction: column;\n    align-items: flex-start;\n    gap: 0.5rem;\n}\n.breadcrumb-section[data-v-18546b89] {\n    width: 100%;\n}\n.breadcrumb-section .breadcrumb-container[data-v-18546b89] {\n    flex-direction: column;\n    align-items: flex-start;\n    gap: 0.5rem;\n}\n.breadcrumb-section .breadcrumb-container .breadcrumb[data-v-18546b89] {\n    flex-wrap: wrap;\n}\n.breadcrumb-section .breadcrumb-container .breadcrumb .breadcrumb-item[data-v-18546b89] {\n    font-size: 0.8rem;\n}\n.breadcrumb-section .breadcrumb-container .breadcrumb .breadcrumb-item a[data-v-18546b89] {\n    font-size: 0.8rem;\n}\n.action-section[data-v-18546b89] {\n    width: 100%;\n    justify-content: flex-end;\n}\n.action-section .action-btn[data-v-18546b89] {\n    font-size: 0.8rem;\n    padding: 0.4rem 0.8rem;\n}\n}\n/* ===========================================\n   RESPONSIVE UTILITY CLASSES (ALL DEVICES)\n   =========================================== */\n.show-xs-only[data-v-18546b89],\n.show-sm-only[data-v-18546b89],\n.show-md-only[data-v-18546b89],\n.show-lg-only[data-v-18546b89],\n.show-xl-only[data-v-18546b89] {\n  display: none !important;\n}\n@media (max-width: 575px) {\n.hide-xs[data-v-18546b89] {\n    display: none !important;\n}\n.show-xs-only[data-v-18546b89] {\n    display: initial !important;\n}\n}\n@media (min-width: 576px) and (max-width: 767px) {\n.hide-sm[data-v-18546b89] {\n    display: none !important;\n}\n.show-sm-only[data-v-18546b89] {\n    display: initial !important;\n}\n}\n@media (min-width: 768px) and (max-width: 991px) {\n.hide-md[data-v-18546b89] {\n    display: none !important;\n}\n.show-md-only[data-v-18546b89] {\n    display: initial !important;\n}\n}\n@media (min-width: 992px) and (max-width: 1199px) {\n.hide-lg[data-v-18546b89] {\n    display: none !important;\n}\n.show-lg-only[data-v-18546b89] {\n    display: initial !important;\n}\n}\n@media (min-width: 1200px) {\n.hide-xl[data-v-18546b89] {\n    display: none !important;\n}\n.show-xl-only[data-v-18546b89] {\n    display: initial !important;\n}\n}\n@media (max-width: 576px) {\n.hide-sm-down[data-v-18546b89] {\n    display: none !important;\n}\n}\n@media (max-width: 768px) {\n.hide-md-down[data-v-18546b89] {\n    display: none !important;\n}\n}\n@media (max-width: 992px) {\n.hide-lg-down[data-v-18546b89] {\n    display: none !important;\n}\n}\n@media (min-width: 576px) {\n.hide-sm-up[data-v-18546b89] {\n    display: none !important;\n}\n}\n@media (min-width: 768px) {\n.hide-md-up[data-v-18546b89] {\n    display: none !important;\n}\n}\n@media (min-width: 992px) {\n.hide-lg-up[data-v-18546b89] {\n    display: none !important;\n}\n}\n@media (max-width: 575px) {\n.d-xs-none[data-v-18546b89] {\n    display: none !important;\n}\n.d-xs-block[data-v-18546b89] {\n    display: block !important;\n}\n.d-xs-flex[data-v-18546b89] {\n    display: flex !important;\n}\n}\n@media (min-width: 576px) and (max-width: 767px) {\n.d-sm-none[data-v-18546b89] {\n    display: none !important;\n}\n.d-sm-block[data-v-18546b89] {\n    display: block !important;\n}\n.d-sm-flex[data-v-18546b89] {\n    display: flex !important;\n}\n}\n@media (min-width: 768px) and (max-width: 991px) {\n.d-md-none[data-v-18546b89] {\n    display: none !important;\n}\n.d-md-block[data-v-18546b89] {\n    display: block !important;\n}\n.d-md-flex[data-v-18546b89] {\n    display: flex !important;\n}\n}\n@media (min-width: 992px) and (max-width: 1199px) {\n.d-lg-none[data-v-18546b89] {\n    display: none !important;\n}\n.d-lg-block[data-v-18546b89] {\n    display: block !important;\n}\n.d-lg-flex[data-v-18546b89] {\n    display: flex !important;\n}\n}\n@media (min-width: 1200px) {\n.d-xl-none[data-v-18546b89] {\n    display: none !important;\n}\n.d-xl-block[data-v-18546b89] {\n    display: block !important;\n}\n.d-xl-flex[data-v-18546b89] {\n    display: flex !important;\n}\n}\n@media (min-width: 576px) {\n.custom-modal-xl[data-v-18546b89] {\n    max-width: 1500px !important;\n}\n}\n.invoices-page[data-v-18546b89] {\n  padding: 30px;\n}\n.page-header .page-title[data-v-18546b89] {\n  font-size: 2rem;\n  font-weight: 700;\n  color: #252525;\n}\n.page-header .btn-primary[data-v-18546b89] {\n  display: inline-flex !important;\n  align-items: center;\n  white-space: nowrap;\n  padding: 0.5rem 1rem;\n  font-weight: 500;\n  background-color: #dc3545 !important;\n  border-color: #dc3545 !important;\n  color: #ffffff !important;\n}\n.page-header .btn-primary[data-v-18546b89]:hover {\n  background-color: rgb(189.2151898734, 32.7848101266, 47.7721518987) !important;\n  border-color: rgb(189.2151898734, 32.7848101266, 47.7721518987) !important;\n}\n.sub-nav-tabs .nav-pills .nav-link[data-v-18546b89] {\n  border-radius: 4px;\n  color: #252525;\n  font-weight: 500;\n  padding: 10px 20px;\n  margin-right: 10px;\n  transition: all 0.3s ease;\n}\n.sub-nav-tabs .nav-pills .nav-link[data-v-18546b89]:hover {\n  color: #dc3545;\n  background-color: rgba(220, 53, 69, 0.1);\n}\n.sub-nav-tabs .nav-pills .nav-link.active[data-v-18546b89] {\n  background-color: #dc3545;\n  color: #ffffff;\n}\n.filters-row .btn-outline-secondary[data-v-18546b89] {\n  border-color: #cccccc;\n  color: #252525;\n}\n.filters-row .btn-outline-secondary[data-v-18546b89]:hover {\n  color: #dc3545;\n  border-color: #dc3545;\n}\n.summary-stats .summary-left[data-v-18546b89] {\n  display: flex;\n  align-items: center;\n}\n.summary-stats .summary-right .stat-item[data-v-18546b89] {\n  text-align: center;\n}\n.summary-stats .summary-right .stat-item .stat-value[data-v-18546b89] {\n  font-size: 1.25rem;\n  font-weight: 700;\n  color: #252525;\n}\n.summary-stats .summary-right .stat-item .stat-status[data-v-18546b89] {\n  font-size: 0.75rem;\n}\n.invoices-table .table th[data-v-18546b89] {\n  border-top: none;\n  border-bottom: 2px solid #e0e0e0;\n  font-weight: 600;\n  color: #252525;\n  padding: 20px;\n}\n.invoices-table .table th.sortable[data-v-18546b89] {\n  cursor: pointer;\n  -webkit-user-select: none;\n     -moz-user-select: none;\n          user-select: none;\n}\n.invoices-table .table th.sortable[data-v-18546b89]:hover {\n  color: #dc3545;\n}\n.invoices-table .table td[data-v-18546b89] {\n  padding: 20px;\n  vertical-align: middle;\n  border-bottom: 1px solid #e0e0e0;\n}\n.invoices-table .table tbody tr[data-v-18546b89]:hover {\n  background-color: rgba(220, 53, 69, 0.05);\n}\n.invoices-table .invoice-number[data-v-18546b89] {\n  color: #dc3545;\n  font-weight: 500;\n}\n.invoices-table .invoice-number.pro-forma[data-v-18546b89] {\n  font-style: italic;\n}\n.invoices-table .status-badge[data-v-18546b89] {\n  padding: 5px 8px;\n  border-radius: 4px;\n  font-size: 0.75rem;\n  font-weight: 500;\n}\n.invoices-table .status-badge.paid[data-v-18546b89] {\n  background-color: #e8f5e9;\n  color: #4caf50;\n}\n.invoices-table .status-badge.outstanding[data-v-18546b89] {\n  background-color: #fff3e0;\n  color: #ff9800;\n}\n.downloads-content[data-v-18546b89] {\n  min-height: 400px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n.create-invoice-modal .section-title[data-v-18546b89] {\n  font-size: 1.125rem;\n  font-weight: 600;\n  color: #252525;\n  padding-bottom: 10px;\n  border-bottom: 2px solid #e0e0e0;\n}\n.create-invoice-modal .form-group label[data-v-18546b89] {\n  font-weight: 500;\n  color: #252525;\n  margin-bottom: 8px;\n}\n.create-invoice-modal .form-group .form-control[data-v-18546b89],\n.create-invoice-modal .form-group .form-select[data-v-18546b89] {\n  border-color: #cccccc;\n}\n.create-invoice-modal .form-group .form-control[data-v-18546b89]:focus,\n.create-invoice-modal .form-group .form-select[data-v-18546b89]:focus {\n  border-color: #dc3545;\n  box-shadow: 0 0 0 0.2rem rgba(220, 53, 69, 0.25);\n}\n.create-invoice-modal .form-group .form-control[data-v-18546b89]:disabled, .create-invoice-modal .form-group .form-control[readonly][data-v-18546b89],\n.create-invoice-modal .form-group .form-select[data-v-18546b89]:disabled,\n.create-invoice-modal .form-group .form-select[readonly][data-v-18546b89] {\n  background-color: #f8f9fa;\n  cursor: not-allowed;\n}\n.create-invoice-modal .form-group .form-check-input[data-v-18546b89] {\n  margin-top: 0.25rem;\n}\n.create-invoice-modal .form-group .form-check-input[data-v-18546b89]:checked {\n  background-color: #dc3545;\n  border-color: #dc3545;\n}\n.create-invoice-modal .modal-footer-actions[data-v-18546b89] {\n  padding-top: 20px;\n}\n@media (max-width: 768px) {\n.summary-stats .summary-right[data-v-18546b89] {\n    flex-direction: column;\n    gap: 10px;\n}\n.summary-stats .summary-right .stat-item[data-v-18546b89] {\n    text-align: left;\n}\n.filters-row .row .col-md-2[data-v-18546b89] {\n    margin-bottom: 10px;\n}\n}", ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-12.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12.use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-12.use[3]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/Financial/Invoices.vue?vue&type=style&index=0&id=18546b89&scoped=true&lang=scss":
/*!*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-12.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12.use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-12.use[3]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/Financial/Invoices.vue?vue&type=style&index=0&id=18546b89&scoped=true&lang=scss ***!
  \*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../../../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_clonedRuleSet_12_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_12_use_2_node_modules_sass_loader_dist_cjs_js_clonedRuleSet_12_use_3_node_modules_vue_loader_lib_index_js_vue_loader_options_Invoices_vue_vue_type_style_index_0_id_18546b89_scoped_true_lang_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !!../../../../../../node_modules/css-loader/dist/cjs.js??clonedRuleSet-12.use[1]!../../../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12.use[2]!../../../../../../node_modules/sass-loader/dist/cjs.js??clonedRuleSet-12.use[3]!../../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Invoices.vue?vue&type=style&index=0&id=18546b89&scoped=true&lang=scss */ "./node_modules/css-loader/dist/cjs.js??clonedRuleSet-12.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12.use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-12.use[3]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/Financial/Invoices.vue?vue&type=style&index=0&id=18546b89&scoped=true&lang=scss");

            

var options = {};

options.insert = "head";
options.singleton = false;

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_clonedRuleSet_12_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_12_use_2_node_modules_sass_loader_dist_cjs_js_clonedRuleSet_12_use_3_node_modules_vue_loader_lib_index_js_vue_loader_options_Invoices_vue_vue_type_style_index_0_id_18546b89_scoped_true_lang_scss__WEBPACK_IMPORTED_MODULE_1__["default"], options);



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_clonedRuleSet_12_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_12_use_2_node_modules_sass_loader_dist_cjs_js_clonedRuleSet_12_use_3_node_modules_vue_loader_lib_index_js_vue_loader_options_Invoices_vue_vue_type_style_index_0_id_18546b89_scoped_true_lang_scss__WEBPACK_IMPORTED_MODULE_1__["default"].locals || {});

/***/ }),

/***/ "./resources/src/views/app/pages/Financial/Invoices.vue":
/*!**************************************************************!*\
  !*** ./resources/src/views/app/pages/Financial/Invoices.vue ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Invoices_vue_vue_type_template_id_18546b89_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Invoices.vue?vue&type=template&id=18546b89&scoped=true */ "./resources/src/views/app/pages/Financial/Invoices.vue?vue&type=template&id=18546b89&scoped=true");
/* harmony import */ var _Invoices_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Invoices.vue?vue&type=script&lang=js */ "./resources/src/views/app/pages/Financial/Invoices.vue?vue&type=script&lang=js");
/* harmony import */ var _Invoices_vue_vue_type_style_index_0_id_18546b89_scoped_true_lang_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Invoices.vue?vue&type=style&index=0&id=18546b89&scoped=true&lang=scss */ "./resources/src/views/app/pages/Financial/Invoices.vue?vue&type=style&index=0&id=18546b89&scoped=true&lang=scss");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");



;


/* normalize component */

var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _Invoices_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__["default"],
  _Invoices_vue_vue_type_template_id_18546b89_scoped_true__WEBPACK_IMPORTED_MODULE_0__.render,
  _Invoices_vue_vue_type_template_id_18546b89_scoped_true__WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  "18546b89",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/src/views/app/pages/Financial/Invoices.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./resources/src/views/app/pages/Financial/Invoices.vue?vue&type=script&lang=js":
/*!**************************************************************************************!*\
  !*** ./resources/src/views/app/pages/Financial/Invoices.vue?vue&type=script&lang=js ***!
  \**************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Invoices_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Invoices.vue?vue&type=script&lang=js */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/Financial/Invoices.vue?vue&type=script&lang=js");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Invoices_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/src/views/app/pages/Financial/Invoices.vue?vue&type=style&index=0&id=18546b89&scoped=true&lang=scss":
/*!***********************************************************************************************************************!*\
  !*** ./resources/src/views/app/pages/Financial/Invoices.vue?vue&type=style&index=0&id=18546b89&scoped=true&lang=scss ***!
  \***********************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_dist_cjs_js_node_modules_css_loader_dist_cjs_js_clonedRuleSet_12_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_12_use_2_node_modules_sass_loader_dist_cjs_js_clonedRuleSet_12_use_3_node_modules_vue_loader_lib_index_js_vue_loader_options_Invoices_vue_vue_type_style_index_0_id_18546b89_scoped_true_lang_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/style-loader/dist/cjs.js!../../../../../../node_modules/css-loader/dist/cjs.js??clonedRuleSet-12.use[1]!../../../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12.use[2]!../../../../../../node_modules/sass-loader/dist/cjs.js??clonedRuleSet-12.use[3]!../../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Invoices.vue?vue&type=style&index=0&id=18546b89&scoped=true&lang=scss */ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-12.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12.use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-12.use[3]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/Financial/Invoices.vue?vue&type=style&index=0&id=18546b89&scoped=true&lang=scss");


/***/ }),

/***/ "./resources/src/views/app/pages/Financial/Invoices.vue?vue&type=template&id=18546b89&scoped=true":
/*!********************************************************************************************************!*\
  !*** ./resources/src/views/app/pages/Financial/Invoices.vue?vue&type=template&id=18546b89&scoped=true ***!
  \********************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Invoices_vue_vue_type_template_id_18546b89_scoped_true__WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   staticRenderFns: () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Invoices_vue_vue_type_template_id_18546b89_scoped_true__WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Invoices_vue_vue_type_template_id_18546b89_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Invoices.vue?vue&type=template&id=18546b89&scoped=true */ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/Financial/Invoices.vue?vue&type=template&id=18546b89&scoped=true");


/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/Financial/Invoices.vue?vue&type=template&id=18546b89&scoped=true":
/*!***********************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/Financial/Invoices.vue?vue&type=template&id=18546b89&scoped=true ***!
  \***********************************************************************************************************************************************************************************************************************************************/
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
    { staticClass: "invoices-page" },
    [
      _c("div", { staticClass: "page-header mb-4" }, [
        _c(
          "div",
          { staticClass: "d-flex justify-content-between align-items-center" },
          [
            _c("h2", { staticClass: "page-title mb-0" }, [_vm._v("Invoices")]),
            _vm._v(" "),
            _c(
              "button",
              {
                staticClass: "btn btn-primary",
                attrs: { type: "button" },
                on: { click: _vm.createInvoice },
              },
              [
                _c("i", { staticClass: "fas fa-plus mr-2" }),
                _vm._v("\n                Create invoice\n            "),
              ]
            ),
          ]
        ),
      ]),
      _vm._v(" "),
      _c("div", { staticClass: "sub-nav-tabs mb-4" }, [
        _c("nav", { staticClass: "nav nav-pills" }, [
          _c(
            "button",
            {
              staticClass: "nav-link",
              class: { active: _vm.activeSubTab === "invoices" },
              on: {
                click: function ($event) {
                  return _vm.setActiveSubTab("invoices")
                },
              },
            },
            [_vm._v("\n                Invoices\n            ")]
          ),
          _vm._v(" "),
          _c(
            "button",
            {
              staticClass: "nav-link",
              class: { active: _vm.activeSubTab === "downloads" },
              on: {
                click: function ($event) {
                  return _vm.setActiveSubTab("downloads")
                },
              },
            },
            [_vm._v("\n                Created downloads\n            ")]
          ),
        ]),
      ]),
      _vm._v(" "),
      _vm._m(0),
      _vm._v(" "),
      _vm._m(1),
      _vm._v(" "),
      _vm.activeSubTab === "invoices"
        ? _c("div", { staticClass: "invoices-table" }, [
            _c("div", { staticClass: "table-responsive" }, [
              _c("table", { staticClass: "table table-hover" }, [
                _vm._m(2),
                _vm._v(" "),
                _c(
                  "tbody",
                  _vm._l(_vm.invoices, function (invoice) {
                    return _c("tr", { key: invoice.id }, [
                      _vm._m(3, true),
                      _vm._v(" "),
                      _c("td", [
                        _c(
                          "span",
                          {
                            staticClass: "invoice-number",
                            class: { "pro-forma": invoice.isProForma },
                          },
                          [
                            _vm._v(
                              "\n                                " +
                                _vm._s(invoice.number) +
                                "\n                            "
                            ),
                          ]
                        ),
                      ]),
                      _vm._v(" "),
                      _c("td", [_vm._v(_vm._s(invoice.date))]),
                      _vm._v(" "),
                      _c("td", [_vm._v(_vm._s(invoice.firstName))]),
                      _vm._v(" "),
                      _c("td", [_vm._v(_vm._s(invoice.lastName))]),
                      _vm._v(" "),
                      _c("td", [_vm._v(_vm._s(invoice.description))]),
                      _vm._v(" "),
                      _c("td", [_vm._v(_vm._s(invoice.price))]),
                      _vm._v(" "),
                      _c("td", [
                        _c(
                          "span",
                          {
                            staticClass: "status-badge",
                            class: invoice.statusClass,
                          },
                          [
                            _vm._v(
                              "\n                                " +
                                _vm._s(invoice.status) +
                                "\n                            "
                            ),
                          ]
                        ),
                      ]),
                    ])
                  }),
                  0
                ),
              ]),
            ]),
          ])
        : _vm._e(),
      _vm._v(" "),
      _vm.activeSubTab === "downloads"
        ? _c("div", { staticClass: "downloads-content" }, [_vm._m(4)])
        : _vm._e(),
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
                  _c(
                    "div",
                    { staticClass: "form-group mb-3" },
                    [
                      _c(
                        "label",
                        { staticClass: "d-flex align-items-center" },
                        [_c("span", { staticClass: "me-2" }, [_vm._v("Date")])]
                      ),
                      _vm._v(" "),
                      _c("b-form-input", {
                        staticClass: "form-control",
                        attrs: { type: "text", readonly: "" },
                        model: {
                          value: _vm.invoiceForm.date,
                          callback: function ($$v) {
                            _vm.$set(_vm.invoiceForm, "date", $$v)
                          },
                          expression: "invoiceForm.date",
                        },
                      }),
                    ],
                    1
                  ),
                  _vm._v(" "),
                  _c(
                    "div",
                    { staticClass: "form-group mb-3" },
                    [
                      _c(
                        "label",
                        { staticClass: "d-flex align-items-center" },
                        [
                          _c("span", { staticClass: "me-2" }, [
                            _vm._v("Payment method"),
                          ]),
                        ]
                      ),
                      _vm._v(" "),
                      _c("b-form-select", {
                        staticClass: "form-control",
                        attrs: {
                          options: _vm.paymentMethodOptions,
                          required: "",
                        },
                        model: {
                          value: _vm.invoiceForm.payment_method,
                          callback: function ($$v) {
                            _vm.$set(_vm.invoiceForm, "payment_method", $$v)
                          },
                          expression: "invoiceForm.payment_method",
                        },
                      }),
                    ],
                    1
                  ),
                  _vm._v(" "),
                  _c(
                    "div",
                    { staticClass: "form-group mb-3" },
                    [
                      _c(
                        "label",
                        { staticClass: "d-flex align-items-center" },
                        [
                          _c("span", { staticClass: "me-2" }, [
                            _vm._v("Invoice text"),
                          ]),
                        ]
                      ),
                      _vm._v(" "),
                      _c("b-form-select", {
                        staticClass: "form-control",
                        attrs: { options: _vm.invoiceTextOptions },
                        model: {
                          value: _vm.invoiceForm.invoice_text,
                          callback: function ($$v) {
                            _vm.$set(_vm.invoiceForm, "invoice_text", $$v)
                          },
                          expression: "invoiceForm.invoice_text",
                        },
                      }),
                    ],
                    1
                  ),
                  _vm._v(" "),
                  _c(
                    "div",
                    { staticClass: "form-group mb-3" },
                    [
                      _c(
                        "label",
                        { staticClass: "d-flex align-items-center" },
                        [
                          _c("span", { staticClass: "me-2" }, [
                            _vm._v("Supplementary invoice text"),
                          ]),
                          _vm._v(" "),
                          _c("i", {
                            staticClass: "fas fa-info-circle text-muted ms-2",
                            staticStyle: { "font-size": "0.875rem" },
                          }),
                        ]
                      ),
                      _vm._v(" "),
                      _c("b-form-textarea", {
                        staticClass: "form-control",
                        attrs: {
                          rows: "4",
                          placeholder: "Enter supplementary invoice text",
                        },
                        model: {
                          value: _vm.invoiceForm.supplementary_text,
                          callback: function ($$v) {
                            _vm.$set(_vm.invoiceForm, "supplementary_text", $$v)
                          },
                          expression: "invoiceForm.supplementary_text",
                        },
                      }),
                    ],
                    1
                  ),
                ]),
                _vm._v(" "),
                _c("div", { staticClass: "col-md-6 mb-4" }, [
                  _c("h5", { staticClass: "section-title mb-3" }, [
                    _vm._v("Billing Information"),
                  ]),
                  _vm._v(" "),
                  _c("div", { staticClass: "form-group mb-3" }, [
                    _c("div", { staticClass: "form-check" }, [
                      _c("input", {
                        directives: [
                          {
                            name: "model",
                            rawName: "v-model",
                            value: _vm.invoiceForm.is_guest,
                            expression: "invoiceForm.is_guest",
                          },
                        ],
                        staticClass: "form-check-input",
                        attrs: { type: "checkbox", id: "guestCheckbox" },
                        domProps: {
                          checked: Array.isArray(_vm.invoiceForm.is_guest)
                            ? _vm._i(_vm.invoiceForm.is_guest, null) > -1
                            : _vm.invoiceForm.is_guest,
                        },
                        on: {
                          change: [
                            function ($event) {
                              var $$a = _vm.invoiceForm.is_guest,
                                $$el = $event.target,
                                $$c = $$el.checked ? true : false
                              if (Array.isArray($$a)) {
                                var $$v = null,
                                  $$i = _vm._i($$a, $$v)
                                if ($$el.checked) {
                                  $$i < 0 &&
                                    _vm.$set(
                                      _vm.invoiceForm,
                                      "is_guest",
                                      $$a.concat([$$v])
                                    )
                                } else {
                                  $$i > -1 &&
                                    _vm.$set(
                                      _vm.invoiceForm,
                                      "is_guest",
                                      $$a
                                        .slice(0, $$i)
                                        .concat($$a.slice($$i + 1))
                                    )
                                }
                              } else {
                                _vm.$set(_vm.invoiceForm, "is_guest", $$c)
                              }
                            },
                            _vm.handleGuestChange,
                          ],
                        },
                      }),
                      _vm._v(" "),
                      _c(
                        "label",
                        {
                          staticClass: "form-check-label",
                          attrs: { for: "guestCheckbox" },
                        },
                        [
                          _vm._v(
                            "\n                                Guest?\n                            "
                          ),
                        ]
                      ),
                    ]),
                  ]),
                  _vm._v(" "),
                  _c(
                    "div",
                    { staticClass: "form-group mb-3" },
                    [
                      _c(
                        "label",
                        { staticClass: "d-flex align-items-center" },
                        [
                          _c("span", { staticClass: "me-2" }, [
                            _vm._v("Bill to"),
                          ]),
                        ]
                      ),
                      _vm._v(" "),
                      _c("b-form-select", {
                        staticClass: "form-control",
                        attrs: {
                          options: _vm.billToOptions,
                          disabled: _vm.invoiceForm.is_guest,
                          required: "",
                        },
                        model: {
                          value: _vm.invoiceForm.bill_to,
                          callback: function ($$v) {
                            _vm.$set(_vm.invoiceForm, "bill_to", $$v)
                          },
                          expression: "invoiceForm.bill_to",
                        },
                      }),
                    ],
                    1
                  ),
                  _vm._v(" "),
                  _c(
                    "div",
                    { staticClass: "form-group mb-3" },
                    [
                      _c(
                        "label",
                        { staticClass: "d-flex align-items-center" },
                        [
                          _c("span", { staticClass: "me-2" }, [
                            _vm._v("Sold by"),
                          ]),
                        ]
                      ),
                      _vm._v(" "),
                      _c("b-form-input", {
                        staticClass: "form-control",
                        attrs: { type: "text", readonly: "" },
                        model: {
                          value: _vm.invoiceForm.sold_by,
                          callback: function ($$v) {
                            _vm.$set(_vm.invoiceForm, "sold_by", $$v)
                          },
                          expression: "invoiceForm.sold_by",
                        },
                      }),
                    ],
                    1
                  ),
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
                    [_vm._v("\n                    Back\n                ")]
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
                      _vm._v(
                        "\n                    Create invoice\n                "
                      ),
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
    return _c("div", { staticClass: "filters-row mb-4" }, [
      _c("div", { staticClass: "row g-3" }, [
        _c("div", { staticClass: "col-md-2" }, [
          _c("div", { staticClass: "dropdown" }, [
            _c(
              "button",
              {
                staticClass: "btn btn-outline-secondary dropdown-toggle w-100",
                attrs: { type: "button", "data-bs-toggle": "dropdown" },
              },
              [
                _vm._v(
                  "\n                        Options\n                    "
                ),
              ]
            ),
          ]),
        ]),
        _vm._v(" "),
        _c("div", { staticClass: "col-md-2" }, [
          _c("input", {
            staticClass: "form-control",
            attrs: { type: "text", placeholder: "Invoice" },
          }),
        ]),
        _vm._v(" "),
        _c("div", { staticClass: "col-md-2" }, [
          _c("div", { staticClass: "dropdown" }, [
            _c(
              "button",
              {
                staticClass: "btn btn-outline-secondary dropdown-toggle w-100",
                attrs: { type: "button", "data-bs-toggle": "dropdown" },
              },
              [
                _vm._v(
                  "\n                        This month (August)\n                    "
                ),
              ]
            ),
          ]),
        ]),
        _vm._v(" "),
        _c("div", { staticClass: "col-md-2" }, [
          _c("div", { staticClass: "dropdown" }, [
            _c(
              "button",
              {
                staticClass: "btn btn-outline-secondary dropdown-toggle w-100",
                attrs: { type: "button", "data-bs-toggle": "dropdown" },
              },
              [_vm._v("\n                        Status\n                    ")]
            ),
          ]),
        ]),
        _vm._v(" "),
        _c("div", { staticClass: "col-md-2" }, [
          _c("div", { staticClass: "dropdown" }, [
            _c(
              "button",
              {
                staticClass: "btn btn-outline-secondary dropdown-toggle w-100",
                attrs: { type: "button", "data-bs-toggle": "dropdown" },
              },
              [
                _vm._v(
                  "\n                        Payment method\n                    "
                ),
              ]
            ),
          ]),
        ]),
        _vm._v(" "),
        _c("div", { staticClass: "col-md-2" }, [
          _c("div", { staticClass: "dropdown" }, [
            _c(
              "button",
              {
                staticClass: "btn btn-outline-secondary dropdown-toggle w-100",
                attrs: { type: "button", "data-bs-toggle": "dropdown" },
              },
              [
                _vm._v(
                  "\n                        All invoices\n                    "
                ),
              ]
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
    return _c("div", { staticClass: "summary-stats mb-4" }, [
      _c("div", { staticClass: "row" }, [
        _c("div", { staticClass: "col-md-6" }, [
          _c("div", { staticClass: "summary-left" }, [
            _c("span", { staticClass: "text-muted" }, [_vm._v("Total: 50")]),
            _vm._v(" "),
            _c("span", { staticClass: "text-muted ms-3" }, [
              _vm._v("Selected: 0 - USD 0.00"),
            ]),
          ]),
        ]),
        _vm._v(" "),
        _c("div", { staticClass: "col-md-6" }, [
          _c(
            "div",
            { staticClass: "summary-right d-flex justify-content-end gap-4" },
            [
              _c("div", { staticClass: "stat-item" }, [
                _c("div", { staticClass: "d-flex align-items-center" }, [
                  _c("span", { staticClass: "text-muted me-2" }, [
                    _vm._v("Final"),
                  ]),
                  _vm._v(" "),
                  _c("i", { staticClass: "fas fa-info-circle text-muted" }),
                ]),
                _vm._v(" "),
                _c("div", { staticClass: "stat-value" }, [_vm._v("9,056.64")]),
                _vm._v(" "),
                _c("div", { staticClass: "stat-status text-muted" }, [
                  _vm._v("0.00 Outstanding"),
                ]),
              ]),
              _vm._v(" "),
              _c("div", { staticClass: "stat-item" }, [
                _c("div", { staticClass: "d-flex align-items-center" }, [
                  _c("span", { staticClass: "text-muted me-2" }, [
                    _vm._v("Pro forma"),
                  ]),
                  _vm._v(" "),
                  _c("i", { staticClass: "fas fa-info-circle text-muted" }),
                ]),
                _vm._v(" "),
                _c("div", { staticClass: "stat-value" }, [_vm._v("250.00")]),
                _vm._v(" "),
                _c("div", { staticClass: "stat-status text-muted" }, [
                  _vm._v("250.00 Outstanding"),
                ]),
              ]),
              _vm._v(" "),
              _c("div", { staticClass: "stat-item" }, [
                _c("div", { staticClass: "d-flex align-items-center" }, [
                  _c("span", { staticClass: "text-muted me-2" }, [
                    _vm._v("Total"),
                  ]),
                  _vm._v(" "),
                  _c("i", { staticClass: "fas fa-info-circle text-muted" }),
                ]),
                _vm._v(" "),
                _c("div", { staticClass: "stat-value" }, [_vm._v("9,306.64")]),
                _vm._v(" "),
                _c("div", { staticClass: "stat-status text-muted" }, [
                  _vm._v("250.00 Outstanding"),
                ]),
              ]),
            ]
          ),
        ]),
      ]),
    ])
  },
  function () {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("thead", [
      _c("tr", [
        _c("th", [
          _c("input", {
            staticClass: "form-check-input",
            attrs: { type: "checkbox" },
          }),
        ]),
        _vm._v(" "),
        _c("th", { staticClass: "sortable" }, [
          _vm._v("\n                            No. "),
          _c("i", { staticClass: "fas fa-sort-down ms-1" }),
        ]),
        _vm._v(" "),
        _c("th", [_vm._v("Date")]),
        _vm._v(" "),
        _c("th", [_vm._v("First name")]),
        _vm._v(" "),
        _c("th", [_vm._v("Last Name")]),
        _vm._v(" "),
        _c("th", [_vm._v("Description")]),
        _vm._v(" "),
        _c("th", [_vm._v("Price")]),
        _vm._v(" "),
        _c("th", [_vm._v("Status")]),
      ]),
    ])
  },
  function () {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("td", [
      _c("input", {
        staticClass: "form-check-input",
        attrs: { type: "checkbox" },
      }),
    ])
  },
  function () {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "text-center py-5" }, [
      _c("i", { staticClass: "fas fa-download fa-3x text-muted mb-3" }),
      _vm._v(" "),
      _c("h5", { staticClass: "text-muted" }, [
        _vm._v("No downloads created yet"),
      ]),
      _vm._v(" "),
      _c("p", { staticClass: "text-muted" }, [
        _vm._v("Created downloads will appear here"),
      ]),
    ])
  },
]
render._withStripped = true



/***/ })

}]);