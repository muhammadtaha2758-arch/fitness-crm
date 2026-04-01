"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["resources_src_views_app_pages_settings_create_membership_vue"],{

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/settings/create_membership.vue?vue&type=script&lang=js":
/*!**************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/settings/create_membership.vue?vue&type=script&lang=js ***!
  \**************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var vee_validate__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! vee-validate */ "./node_modules/vee-validate/dist/vee-validate.esm.js");
/* harmony import */ var nprogress__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! nprogress */ "./node_modules/nprogress/nprogress.js");
/* harmony import */ var nprogress__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(nprogress__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! axios */ "./node_modules/axios/index.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_1__);
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
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
  name: "CreateMembership",
  components: {
    ValidationObserver: vee_validate__WEBPACK_IMPORTED_MODULE_2__.ValidationObserver,
    ValidationProvider: vee_validate__WEBPACK_IMPORTED_MODULE_2__.ValidationProvider
  },
  data: function data() {
    return {
      isEditMode: false,
      membershipId: null,
      formProcessing: false,
      membershipForm: {
        // Basic Info
        name: '',
        description: '',
        webshop_image: '',
        group: '',
        terms_conditions: 'general',
        start_date_type: 'any',
        start_date_from: '',
        start_date_to: '',
        status_type: 'active',
        status_from: '',
        status_to: '',
        // Scope
        access_times: 'no_restriction',
        duration_value: 1,
        duration_unit: 'months',
        auto_renewed: false,
        // Price
        price: 0,
        currency: 'USD',
        sales_tax: 'default',
        interval: 'monthly',
        recurring_billing: 'from_start',
        income_category: '',
        default_payment_method: 'cash',
        invoice_before_value: 1,
        invoice_before_unit: 'weeks',
        one_time_payment: false,
        registration_fee: '',
        // Credits
        credit_distribution: 'from_assign_date',
        // Digital Services
        enable_pro: false,
        early_booking_access: false,
        // Legacy fields
        stripe_price_id: '',
        features: [''],
        is_active: true,
        sort_order: 0
      },
      availableServices: [{
        id: 1,
        name: 'Compensation sleeves',
        enabled: false,
        amount: 0,
        frequency_value: 1,
        frequency_unit: 'months',
        validity_value: 1,
        validity_unit: 'months',
        extra_of_start: false
      }, {
        id: 2,
        name: 'Cryo-therapy',
        enabled: false,
        amount: 0,
        frequency_value: 1,
        frequency_unit: 'months',
        validity_value: 1,
        validity_unit: 'months',
        extra_of_start: false
      }, {
        id: 3,
        name: 'Group Classes',
        enabled: false,
        amount: 0,
        frequency_value: 1,
        frequency_unit: 'months',
        validity_value: 1,
        validity_unit: 'months',
        extra_of_start: false
      }, {
        id: 4,
        name: 'Infrared Sauna',
        enabled: false,
        amount: 0,
        frequency_value: 1,
        frequency_unit: 'months',
        validity_value: 1,
        validity_unit: 'months',
        extra_of_start: false
      }, {
        id: 5,
        name: 'Personal training 1 hour',
        enabled: false,
        amount: 0,
        frequency_value: 1,
        frequency_unit: 'months',
        validity_value: 1,
        validity_unit: 'months',
        extra_of_start: false
      }, {
        id: 6,
        name: 'Personal training 30 mins',
        enabled: false,
        amount: 0,
        frequency_value: 1,
        frequency_unit: 'months',
        validity_value: 1,
        validity_unit: 'months',
        extra_of_start: false
      }],
      membershipGroups: []
    };
  },
  mounted: function mounted() {
    this.fetchMembershipGroups();
    // Check if we're in edit mode
    if (this.$route.query.id) {
      this.isEditMode = true;
      this.membershipId = this.$route.query.id;
      this.fetchMembershipData(this.membershipId);
    }
  },
  methods: {
    // Fetch membership groups from backend
    fetchMembershipGroups: function fetchMembershipGroups() {
      var _this = this;
      return _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
        var response;
        return _regeneratorRuntime().wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              _context.next = 3;
              return axios__WEBPACK_IMPORTED_MODULE_1___default().get('plans/membership-groups/list');
            case 3:
              response = _context.sent;
              if (response.data.success) {
                _this.membershipGroups = response.data.data;
              }
              _context.next = 11;
              break;
            case 7:
              _context.prev = 7;
              _context.t0 = _context["catch"](0);
              console.error('Error fetching membership groups:', _context.t0);
              _this.makeToast("warning", "Failed to load membership groups", "Warning");
            case 11:
            case "end":
              return _context.stop();
          }
        }, _callee, null, [[0, 7]]);
      }))();
    },
    // Fetch membership data for editing
    fetchMembershipData: function fetchMembershipData(id) {
      var _this2 = this;
      return _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee2() {
        var response, plan, priceValue, membershipData;
        return _regeneratorRuntime().wrap(function _callee2$(_context2) {
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
              _context2.prev = 0;
              nprogress__WEBPACK_IMPORTED_MODULE_0___default().start();
              _context2.next = 4;
              return axios__WEBPACK_IMPORTED_MODULE_1___default().get("plans/".concat(id));
            case 4:
              response = _context2.sent;
              if (response.data.success && response.data.data) {
                plan = response.data.data; // Populate basic fields
                _this2.membershipForm.name = plan.name || '';
                // Convert price to number for v-model.number - handle both number and string formats
                if (plan.price !== null && plan.price !== undefined) {
                  priceValue = typeof plan.price === 'number' ? plan.price : parseFloat(plan.price);
                  _this2.membershipForm.price = isNaN(priceValue) ? 0 : priceValue;
                } else {
                  _this2.membershipForm.price = 0;
                }
                _this2.membershipForm.interval = plan.interval || 'monthly';
                _this2.membershipForm.stripe_price_id = plan.stripe_price_id || '';
                _this2.membershipForm.features = plan.features && Array.isArray(plan.features) && plan.features.length > 0 ? _toConsumableArray(plan.features) : [''];
                _this2.membershipForm.is_active = plan.is_active !== undefined ? plan.is_active : true;
                _this2.membershipForm.sort_order = plan.sort_order || 0;

                // Parse membership_data if it exists
                membershipData = {};
                if (plan.membership_data) {
                  try {
                    membershipData = typeof plan.membership_data === 'string' ? JSON.parse(plan.membership_data) : plan.membership_data;
                  } catch (e) {
                    console.error('Error parsing membership_data:', e);
                  }
                }

                // Populate extended fields from membership_data
                if (membershipData) {
                  _this2.membershipForm.description = membershipData.description || '';
                  _this2.membershipForm.webshop_image = membershipData.webshop_image || '';
                  _this2.membershipForm.group = membershipData.group || '';
                  _this2.membershipForm.terms_conditions = membershipData.terms_conditions || 'general';
                  _this2.membershipForm.start_date_type = membershipData.start_date_type || 'any';
                  _this2.membershipForm.start_date_from = membershipData.start_date_from || '';
                  _this2.membershipForm.start_date_to = membershipData.start_date_to || '';
                  _this2.membershipForm.status_type = membershipData.status_type || 'active';
                  _this2.membershipForm.status_from = membershipData.status_from || '';
                  _this2.membershipForm.status_to = membershipData.status_to || '';
                  _this2.membershipForm.access_times = membershipData.access_times || 'no_restriction';
                  _this2.membershipForm.duration_value = membershipData.duration_value || 1;
                  _this2.membershipForm.duration_unit = membershipData.duration_unit || 'months';
                  _this2.membershipForm.auto_renewed = membershipData.auto_renewed || false;
                  _this2.membershipForm.currency = membershipData.currency || 'USD';
                  _this2.membershipForm.sales_tax = membershipData.sales_tax || 'default';
                  _this2.membershipForm.recurring_billing = membershipData.recurring_billing || 'from_start';
                  _this2.membershipForm.income_category = membershipData.income_category || '';
                  _this2.membershipForm.default_payment_method = membershipData.default_payment_method || 'cash';
                  _this2.membershipForm.invoice_before_value = membershipData.invoice_before_value || 1;
                  _this2.membershipForm.invoice_before_unit = membershipData.invoice_before_unit || 'weeks';
                  _this2.membershipForm.one_time_payment = membershipData.one_time_payment || false;
                  _this2.membershipForm.registration_fee = membershipData.registration_fee || '';
                  _this2.membershipForm.credit_distribution = membershipData.credit_distribution || 'from_assign_date';
                  _this2.membershipForm.enable_pro = membershipData.enable_pro || false;
                  _this2.membershipForm.early_booking_access = membershipData.early_booking_access || false;

                  // Populate services if they exist
                  if (membershipData.services && Array.isArray(membershipData.services)) {
                    _this2.availableServices.forEach(function (service) {
                      var serviceData = membershipData.services.find(function (s) {
                        return s.id === service.id || s.name === service.name;
                      });
                      if (serviceData) {
                        service.enabled = true;
                        service.amount = serviceData.amount || 0;
                        service.frequency_value = serviceData.frequency_value || 1;
                        service.frequency_unit = serviceData.frequency_unit || 'months';
                        service.validity_value = serviceData.validity_value || 1;
                        service.validity_unit = serviceData.validity_unit || 'months';
                        service.extra_of_start = serviceData.extra_of_start || false;
                      }
                    });
                  }
                }

                // Reset validation after data is loaded to clear any false errors
                _this2.$nextTick(function () {
                  if (_this2.$refs.membershipForm) {
                    // Reset validation state only (doesn't clear form values)
                    _this2.$refs.membershipForm.reset();
                  }
                });
              } else {
                _this2.makeToast("danger", "Failed to load membership data", "Error");
                _this2.$router.push({
                  path: '/app/Settings/system_settings',
                  query: {
                    tab: 'memberships'
                  }
                });
              }
              nprogress__WEBPACK_IMPORTED_MODULE_0___default().done();
              _context2.next = 15;
              break;
            case 9:
              _context2.prev = 9;
              _context2.t0 = _context2["catch"](0);
              console.error('Error fetching membership data:', _context2.t0);
              _this2.makeToast("danger", "Error loading membership data", "Error");
              nprogress__WEBPACK_IMPORTED_MODULE_0___default().done();
              _this2.$router.push({
                path: '/app/Settings/system_settings',
                query: {
                  tab: 'memberships'
                }
              });
            case 15:
            case "end":
              return _context2.stop();
          }
        }, _callee2, null, [[0, 9]]);
      }))();
    },
    // Handle webshop image upload
    handleWebshopImageUpload: function handleWebshopImageUpload(event) {
      var _this3 = this;
      var file = event.target.files[0];
      if (file) {
        if (file.size > 5 * 1024 * 1024) {
          this.makeToast("warning", "Image size should be less than 5MB", "Warning");
          return;
        }
        var reader = new FileReader();
        reader.onload = function (e) {
          _this3.membershipForm.webshop_image = e.target.result;
        };
        reader.readAsDataURL(file);
      }
    },
    // Handle create/update membership
    handleCreateMembership: function handleCreateMembership() {
      var _this4 = this;
      // Validate that enabled services have credits > 0
      var enabledServicesWithoutCredits = this.availableServices.filter(function (s) {
        return s.enabled && (!s.amount || s.amount <= 0);
      });
      if (enabledServicesWithoutCredits.length > 0) {
        var serviceNames = enabledServicesWithoutCredits.map(function (s) {
          return s.name;
        }).join(', ');
        this.makeToast("warning", "Please set credit amounts greater than 0 for enabled services: ".concat(serviceNames), "Validation Error");
        return;
      }
      this.$refs.membershipForm.validate().then(function (success) {
        if (!success) {
          return;
        }
        _this4.formProcessing = true;
        nprogress__WEBPACK_IMPORTED_MODULE_0___default().start();

        // Prepare form data - include all fields
        var formData = {
          // Basic fields for plans table
          name: _this4.membershipForm.name,
          price: typeof _this4.membershipForm.price === 'number' ? _this4.membershipForm.price : _this4.membershipForm.price && _this4.membershipForm.price !== '' ? parseFloat(_this4.membershipForm.price) : 0,
          interval: _this4.membershipForm.interval,
          stripe_price_id: _this4.membershipForm.stripe_price_id && _this4.membershipForm.stripe_price_id.trim() !== '' ? _this4.membershipForm.stripe_price_id : null,
          features: _this4.membershipForm.features.filter(function (f) {
            return f.trim() !== '';
          }),
          is_active: _this4.membershipForm.is_active,
          sort_order: _this4.membershipForm.sort_order || 0,
          // Extended membership data (store as JSON)
          membership_data: {
            description: _this4.membershipForm.description,
            webshop_image: _this4.membershipForm.webshop_image,
            group: _this4.membershipForm.group,
            terms_conditions: _this4.membershipForm.terms_conditions,
            start_date_type: _this4.membershipForm.start_date_type,
            start_date_from: _this4.membershipForm.start_date_from,
            start_date_to: _this4.membershipForm.start_date_to,
            status_type: _this4.membershipForm.status_type,
            status_from: _this4.membershipForm.status_from,
            status_to: _this4.membershipForm.status_to,
            access_times: _this4.membershipForm.access_times,
            duration_value: _this4.membershipForm.duration_value,
            duration_unit: _this4.membershipForm.duration_unit,
            auto_renewed: _this4.membershipForm.auto_renewed,
            currency: _this4.membershipForm.currency,
            sales_tax: _this4.membershipForm.sales_tax,
            recurring_billing: _this4.membershipForm.recurring_billing,
            income_category: _this4.membershipForm.income_category,
            default_payment_method: _this4.membershipForm.default_payment_method,
            invoice_before_value: _this4.membershipForm.invoice_before_value,
            invoice_before_unit: _this4.membershipForm.invoice_before_unit,
            one_time_payment: _this4.membershipForm.one_time_payment,
            registration_fee: _this4.membershipForm.registration_fee ? parseFloat(_this4.membershipForm.registration_fee) : null,
            credit_distribution: _this4.membershipForm.credit_distribution,
            enable_pro: _this4.membershipForm.enable_pro,
            early_booking_access: _this4.membershipForm.early_booking_access,
            services: _this4.availableServices.filter(function (s) {
              return s.enabled;
            }).map(function (s) {
              return {
                id: s.id,
                name: s.name,
                enabled: true,
                // Explicitly set enabled to true
                amount: s.amount,
                frequency_value: s.frequency_value,
                frequency_unit: s.frequency_unit,
                validity_value: s.validity_value,
                validity_unit: s.validity_unit,
                extra_of_start: s.extra_of_start
              };
            })
          }
        };

        // Use PUT for update, POST for create
        var apiCall = _this4.isEditMode ? axios__WEBPACK_IMPORTED_MODULE_1___default().put("plans/".concat(_this4.membershipId), formData) : axios__WEBPACK_IMPORTED_MODULE_1___default().post('plans', formData);
        apiCall.then(function (response) {
          if (response.data.success) {
            var message = _this4.isEditMode ? "Membership plan updated successfully" : "Membership plan created successfully";
            _this4.makeToast("success", message, "Success");
            _this4.$router.push({
              path: '/app/Settings/system_settings',
              query: {
                tab: 'memberships'
              }
            });
          } else {
            var errorMessage = _this4.isEditMode ? response.data.message || "Failed to update membership plan" : response.data.message || "Failed to create membership plan";
            _this4.makeToast("danger", errorMessage, "Failed");
          }
          nprogress__WEBPACK_IMPORTED_MODULE_0___default().done();
          _this4.formProcessing = false;
        })["catch"](function (error) {
          console.error("Error ".concat(_this4.isEditMode ? 'updating' : 'creating', " membership plan:"), error);
          var errorMessage = _this4.isEditMode ? "Error updating membership plan" : "Error creating membership plan";
          if (error.response && error.response.data) {
            if (error.response.data.errors) {
              var errors = Object.values(error.response.data.errors).flat();
              errorMessage = errors.join(', ');
            } else if (error.response.data.message) {
              errorMessage = error.response.data.message;
            }
          }
          _this4.makeToast("danger", errorMessage, "Failed");
          nprogress__WEBPACK_IMPORTED_MODULE_0___default().done();
          _this4.formProcessing = false;
        });
      });
    },
    makeToast: function makeToast(variant, msg, title) {
      this.$root.$bvToast.toast(msg, {
        title: title,
        variant: variant,
        solid: true
      });
    }
  }
});

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js??clonedRuleSet-12.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12.use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-12.use[3]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/settings/create_membership.vue?vue&type=style&index=0&id=0a10702a&lang=scss":
/*!*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??clonedRuleSet-12.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12.use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-12.use[3]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/settings/create_membership.vue?vue&type=style&index=0&id=0a10702a&lang=scss ***!
  \*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
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
___CSS_LOADER_EXPORT___.push([module.id, "@charset \"UTF-8\";\n.filter-btn .btn,\n.filter-btn .btn-secondary,\n.filter-btn .btn-outline-secondary,\n.filter-btn button.btn,\n.filter-btn button.btn-secondary {\n  color: #000 !important;\n  background-color: transparent !important;\n  border-color: #6c757d !important;\n}\n.filter-btn .btn:hover,\n.filter-btn .btn-secondary:hover,\n.filter-btn .btn-outline-secondary:hover,\n.filter-btn button.btn:hover,\n.filter-btn button.btn-secondary:hover {\n  color: #dc3545 !important;\n  background-color: transparent !important;\n  border-color: #dc3545 !important;\n  box-shadow: none !important;\n}\n.filter-btn .btn:focus,\n.filter-btn .btn-secondary:focus,\n.filter-btn .btn-outline-secondary:focus,\n.filter-btn button.btn:focus,\n.filter-btn button.btn-secondary:focus {\n  color: #dc3545 !important;\n  background-color: transparent !important;\n  border-color: #dc3545 !important;\n  box-shadow: none !important;\n}\n.filter-btn .btn:active,\n.filter-btn .btn-secondary:active,\n.filter-btn .btn-outline-secondary:active,\n.filter-btn button.btn:active,\n.filter-btn button.btn-secondary:active {\n  color: #dc3545 !important;\n  background-color: transparent !important;\n  border-color: #dc3545 !important;\n}\n.btn-secondary:not(:disabled):not(.disabled):active:focus {\n  box-shadow: none !important;\n}\n\n/* ===========================================\n   COMMON BREADCRUMB NAVIGATION STYLES\n   =========================================== */\n.breadcrumb-nav-row {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  margin-bottom: 0.5rem;\n  gap: 0.5rem;\n}\n.breadcrumb-section {\n  flex: 1;\n}\n.breadcrumb-section .breadcrumb-nav .breadcrumb-container {\n  display: flex;\n  align-items: center;\n  gap: 1rem;\n}\n.breadcrumb-section .breadcrumb-nav .breadcrumb-container .back-button {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  width: 40px;\n  height: 40px;\n  background: rgba(255, 255, 255, 0.1);\n  border: 1px solid rgba(255, 255, 255, 0.2);\n  border-radius: 8px;\n  color: #ffffff;\n  cursor: pointer;\n  transition: all 0.3s ease;\n}\n.breadcrumb-section .breadcrumb-nav .breadcrumb-container .back-button:hover {\n  background: rgba(255, 255, 255, 0.15);\n  border-color: rgba(255, 255, 255, 0.3);\n  transform: translateY(-1px);\n  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);\n  color: #dc3545;\n}\n.breadcrumb-section .breadcrumb-nav .breadcrumb-container .back-button i {\n  font-size: 1.1em;\n}\n.breadcrumb-section .breadcrumb-nav .breadcrumb-container .breadcrumb {\n  display: flex;\n  align-items: center;\n  gap: 0.5rem;\n  margin: 0;\n  padding: 0;\n  background: none;\n  border-radius: 0;\n}\n.breadcrumb-section .breadcrumb-nav .breadcrumb-container .breadcrumb .breadcrumb-item {\n  display: flex;\n  align-items: center;\n  gap: 0.5rem;\n  font-size: 0.875rem;\n  color: #ffffff;\n}\n.breadcrumb-section .breadcrumb-nav .breadcrumb-container .breadcrumb .breadcrumb-item.active {\n  color: #252525;\n  font-weight: 600;\n}\n.breadcrumb-section .breadcrumb-nav .breadcrumb-container .breadcrumb .breadcrumb-item.active i {\n  color: #dc3545;\n}\n.breadcrumb-section .breadcrumb-nav .breadcrumb-container .breadcrumb .breadcrumb-item a {\n  display: flex;\n  align-items: center;\n  gap: 0.5rem;\n  color: #6a6a6a;\n  text-decoration: none;\n  transition: color 0.3s ease;\n}\n.breadcrumb-section .breadcrumb-nav .breadcrumb-container .breadcrumb .breadcrumb-item a:hover {\n  color: #dc3545;\n}\n.breadcrumb-section .breadcrumb-nav .breadcrumb-container .breadcrumb .breadcrumb-item a:hover i {\n  color: #dc3545;\n}\n.breadcrumb-section .breadcrumb-nav .breadcrumb-container .breadcrumb .breadcrumb-item a i {\n  font-size: 0.9em;\n  transition: color 0.3s ease;\n}\n.breadcrumb-section .breadcrumb-nav .breadcrumb-container .breadcrumb .breadcrumb-item:not(:last-child)::after {\n  content: \"›\";\n  margin-left: 0.5rem;\n  color: #6a6a6a;\n  font-size: 1.2em;\n}\n.action-section {\n  display: flex;\n  align-items: center;\n}\n.action-section .action-btn {\n  display: flex;\n  align-items: center;\n  gap: 0.5rem;\n  padding: 0.5rem 1rem;\n  border-radius: 8px;\n  font-size: 0.875rem;\n  font-weight: 500;\n  transition: all 0.3s ease;\n}\n.action-section .action-btn:hover:not(:disabled) {\n  transform: translateY(-1px);\n  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);\n}\n.action-section .action-btn:disabled {\n  opacity: 0.6;\n  cursor: not-allowed;\n}\n.action-section .action-btn i {\n  font-size: 0.9em;\n}\n@media (max-width: 768px) {\n.breadcrumb-nav-row {\n    flex-direction: column;\n    align-items: flex-start;\n    gap: 0.5rem;\n}\n.breadcrumb-section {\n    width: 100%;\n}\n.breadcrumb-section .breadcrumb-container {\n    flex-direction: column;\n    align-items: flex-start;\n    gap: 0.5rem;\n}\n.breadcrumb-section .breadcrumb-container .breadcrumb {\n    flex-wrap: wrap;\n}\n.breadcrumb-section .breadcrumb-container .breadcrumb .breadcrumb-item {\n    font-size: 0.8rem;\n}\n.breadcrumb-section .breadcrumb-container .breadcrumb .breadcrumb-item a {\n    font-size: 0.8rem;\n}\n.action-section {\n    width: 100%;\n    justify-content: flex-end;\n}\n.action-section .action-btn {\n    font-size: 0.8rem;\n    padding: 0.4rem 0.8rem;\n}\n}\n/* ===========================================\n   RESPONSIVE UTILITY CLASSES (ALL DEVICES)\n   =========================================== */\n.show-xs-only,\n.show-sm-only,\n.show-md-only,\n.show-lg-only,\n.show-xl-only {\n  display: none !important;\n}\n@media (max-width: 575px) {\n.hide-xs {\n    display: none !important;\n}\n.show-xs-only {\n    display: initial !important;\n}\n}\n@media (min-width: 576px) and (max-width: 767px) {\n.hide-sm {\n    display: none !important;\n}\n.show-sm-only {\n    display: initial !important;\n}\n}\n@media (min-width: 768px) and (max-width: 991px) {\n.hide-md {\n    display: none !important;\n}\n.show-md-only {\n    display: initial !important;\n}\n}\n@media (min-width: 992px) and (max-width: 1199px) {\n.hide-lg {\n    display: none !important;\n}\n.show-lg-only {\n    display: initial !important;\n}\n}\n@media (min-width: 1200px) {\n.hide-xl {\n    display: none !important;\n}\n.show-xl-only {\n    display: initial !important;\n}\n}\n@media (max-width: 576px) {\n.hide-sm-down {\n    display: none !important;\n}\n}\n@media (max-width: 768px) {\n.hide-md-down {\n    display: none !important;\n}\n}\n@media (max-width: 992px) {\n.hide-lg-down {\n    display: none !important;\n}\n}\n@media (min-width: 576px) {\n.hide-sm-up {\n    display: none !important;\n}\n}\n@media (min-width: 768px) {\n.hide-md-up {\n    display: none !important;\n}\n}\n@media (min-width: 992px) {\n.hide-lg-up {\n    display: none !important;\n}\n}\n@media (max-width: 575px) {\n.d-xs-none {\n    display: none !important;\n}\n.d-xs-block {\n    display: block !important;\n}\n.d-xs-flex {\n    display: flex !important;\n}\n}\n@media (min-width: 576px) and (max-width: 767px) {\n.d-sm-none {\n    display: none !important;\n}\n.d-sm-block {\n    display: block !important;\n}\n.d-sm-flex {\n    display: flex !important;\n}\n}\n@media (min-width: 768px) and (max-width: 991px) {\n.d-md-none {\n    display: none !important;\n}\n.d-md-block {\n    display: block !important;\n}\n.d-md-flex {\n    display: flex !important;\n}\n}\n@media (min-width: 992px) and (max-width: 1199px) {\n.d-lg-none {\n    display: none !important;\n}\n.d-lg-block {\n    display: block !important;\n}\n.d-lg-flex {\n    display: flex !important;\n}\n}\n@media (min-width: 1200px) {\n.d-xl-none {\n    display: none !important;\n}\n.d-xl-block {\n    display: block !important;\n}\n.d-xl-flex {\n    display: flex !important;\n}\n}\n@media (min-width: 576px) {\n.custom-modal-xl {\n    max-width: 1500px !important;\n}\n}\n.main-content {\n  padding: 30px;\n  background: #ffffff;\n  min-height: 100vh;\n}\n.page-header {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  margin-bottom: 40px;\n  padding-bottom: 20px;\n  border-bottom: 1px solid #e0e0e0;\n}\n.page-header h1 {\n  font-size: 2rem;\n  font-weight: 700;\n  color: #252525;\n  margin: 0;\n}\n.btn-back {\n  background: #eaeaea;\n  color: #252525;\n  border: 1px solid #e0e0e0;\n  padding: 10px 30px;\n  border-radius: 8px;\n  font-weight: 600;\n  font-size: 0.875rem;\n  cursor: pointer;\n  transition: all 0.2s ease;\n  display: flex;\n  align-items: center;\n  gap: 8px;\n}\n.btn-back:hover {\n  background: #e0e0e0;\n  border-color: #dc3545;\n  color: #dc3545;\n}\n.btn-back i {\n  font-size: 0.75rem;\n}\n.membership-form-page {\n  max-width: 1200px;\n  margin: 0 auto;\n}\n.membership-form-sections {\n  display: flex;\n  flex-direction: column;\n  gap: 40px;\n}\n.form-section-card {\n  background: #ffffff;\n  border-radius: 16px;\n  padding: 40px;\n  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);\n  border: 1px solid #e0e0e0;\n}\n.section-title {\n  font-size: 1.25rem;\n  font-weight: 700;\n  color: #252525;\n  margin-bottom: 30px;\n  padding-bottom: 20px;\n  border-bottom: 1px solid #e0e0e0;\n  display: flex;\n  align-items: center;\n}\n.section-title i {\n  color: #007bff;\n}\n.form-fields {\n  display: flex;\n  flex-direction: column;\n  gap: 20px;\n}\n.form-field {\n  display: flex;\n  flex-direction: column;\n  gap: 8px;\n}\n.field-label {\n  font-weight: 600;\n  font-size: 0.875rem;\n  color: #252525;\n  display: flex;\n  align-items: center;\n  gap: 8px;\n}\n.required {\n  color: #f44336;\n}\n.info-icon {\n  color: #6a6a6a;\n  font-size: 0.75rem;\n  cursor: help;\n}\n.field-input {\n  padding: 10px 20px;\n  border: 1px solid #e0e0e0;\n  border-radius: 8px;\n  font-size: 0.875rem;\n  transition: all 0.2s ease;\n}\n.field-input:focus {\n  outline: none;\n  border-color: #007bff;\n  box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.1);\n}\n.field-input.is-invalid {\n  border-color: #f44336;\n}\n.field-textarea {\n  resize: vertical;\n  min-height: 80px;\n}\n.field-select {\n  cursor: pointer;\n}\n.invalid-feedback {\n  color: #f44336;\n  font-size: 0.75rem;\n  margin-top: 5px;\n}\n.image-upload-wrapper {\n  display: flex;\n  flex-direction: column;\n  gap: 20px;\n}\n.image-preview {\n  position: relative;\n  width: 200px;\n  height: 200px;\n  border: 1px solid #e0e0e0;\n  border-radius: 8px;\n  overflow: hidden;\n}\n.image-preview img {\n  width: 100%;\n  height: 100%;\n  -o-object-fit: cover;\n     object-fit: cover;\n}\n.remove-image-btn {\n  position: absolute;\n  top: 8px;\n  right: 8px;\n  background: rgba(244, 67, 54, 0.9);\n  color: #ffffff;\n  border: none;\n  border-radius: 50%;\n  width: 24px;\n  height: 24px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  cursor: pointer;\n  transition: all 0.2s ease;\n}\n.remove-image-btn:hover {\n  background: #f44336;\n}\n.image-placeholder {\n  width: 200px;\n  height: 200px;\n  border: 2px dashed #e0e0e0;\n  border-radius: 8px;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  gap: 10px;\n  color: #6a6a6a;\n  background: #eaeaea;\n}\n.image-placeholder i {\n  font-size: 2rem;\n}\n.image-placeholder p {\n  margin: 0;\n  font-size: 0.75rem;\n}\n.change-image-btn {\n  align-self: flex-start;\n  background: #007bff;\n  color: #ffffff;\n  border: none;\n  padding: 8px 20px;\n  border-radius: 4px;\n  font-size: 0.75rem;\n  cursor: pointer;\n  transition: all 0.2s ease;\n}\n.change-image-btn:hover {\n  background: rgb(0, 98.4, 204);\n}\n.radio-group {\n  display: flex;\n  flex-direction: column;\n  gap: 10px;\n}\n.radio-label {\n  display: flex;\n  align-items: flex-start;\n  gap: 10px;\n  cursor: pointer;\n}\n.radio-label input[type=radio] {\n  margin-top: 2px;\n}\n.radio-label .radio-text {\n  font-size: 0.875rem;\n  color: #252525;\n}\n.radio-label .radio-hint {\n  display: block;\n  font-size: 0.75rem;\n  color: #6a6a6a;\n  margin-top: 5px;\n}\n.date-range-inputs {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n  margin-top: 10px;\n}\n.date-separator {\n  color: #6a6a6a;\n  font-size: 0.875rem;\n}\n.checkbox-label {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n  cursor: pointer;\n}\n.checkbox-label .checkbox-text {\n  font-size: 0.875rem;\n  color: #252525;\n}\n.duration-input-group,\n.price-input-group,\n.invoice-timing-group {\n  display: flex;\n  gap: 10px;\n  align-items: center;\n}\n.timing-text {\n  color: #6a6a6a;\n  font-size: 0.875rem;\n  white-space: nowrap;\n}\n.one-time-fee-input {\n  margin-top: 10px;\n  max-width: 200px;\n}\n.credits-section {\n  display: flex;\n  flex-direction: column;\n  gap: 30px;\n}\n.credits-table-header {\n  display: grid;\n  grid-template-columns: 40px 1fr 120px 150px 150px 100px;\n  gap: 20px;\n  padding: 20px;\n  background: #eaeaea;\n  border-radius: 8px;\n  font-weight: 600;\n  font-size: 0.875rem;\n  color: #252525;\n  align-items: center;\n}\n.credits-services-list {\n  display: flex;\n  flex-direction: column;\n  gap: 10px;\n}\n.credits-service-row {\n  display: grid;\n  grid-template-columns: 40px 1fr 120px 150px 150px 100px;\n  gap: 20px;\n  padding: 20px;\n  border: 1px solid #e0e0e0;\n  border-radius: 8px;\n  align-items: center;\n  transition: all 0.2s ease;\n}\n.credits-service-row:hover {\n  background: #eaeaea;\n}\n.credits-col-checkbox {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n.credits-col-service {\n  font-size: 0.875rem;\n  color: #252525;\n}\n.credits-col-amount,\n.credits-col-frequency,\n.credits-col-validity {\n  display: flex;\n  gap: 8px;\n  align-items: center;\n}\n.credits-col-amount .field-input,\n.credits-col-frequency .field-input,\n.credits-col-validity .field-input {\n  flex: 1;\n  min-width: 60px;\n}\n.credits-col-amount span,\n.credits-col-frequency span,\n.credits-col-validity span {\n  font-size: 0.75rem;\n  color: #6a6a6a;\n  white-space: nowrap;\n}\n.credits-col-extra {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n.credits-distribution {\n  margin-top: 20px;\n  padding-top: 20px;\n  border-top: 1px solid #e0e0e0;\n}\n.form-actions {\n  display: flex;\n  justify-content: flex-end;\n  gap: 20px;\n  margin-top: 40px;\n  padding-top: 30px;\n  border-top: 1px solid #e0e0e0;\n}\n.btn-cancel {\n  background: #eaeaea;\n  color: #252525;\n  border: 1px solid #e0e0e0;\n  padding: 10px 40px;\n  border-radius: 8px;\n  font-weight: 600;\n  font-size: 0.875rem;\n  cursor: pointer;\n  transition: all 0.2s ease;\n}\n.btn-cancel:hover {\n  background: #e0e0e0;\n  border-color: #dc3545;\n  color: #dc3545;\n}\n.btn-submit {\n  background: #007bff;\n  color: #ffffff;\n  border: none;\n  padding: 10px 40px;\n  border-radius: 8px;\n  font-weight: 600;\n  font-size: 0.875rem;\n  cursor: pointer;\n  transition: all 0.2s ease;\n  display: flex;\n  align-items: center;\n}\n.btn-submit:hover:not(:disabled) {\n  background: rgb(0, 98.4, 204);\n}\n.btn-submit:disabled {\n  opacity: 0.6;\n  cursor: not-allowed;\n}\n@media (max-width: 768px) {\n.credits-table-header,\n  .credits-service-row {\n    grid-template-columns: 40px 1fr;\n    gap: 10px;\n}\n.credits-col-amount,\n  .credits-col-frequency,\n  .credits-col-validity,\n  .credits-col-extra {\n    grid-column: 1/-1;\n    margin-top: 10px;\n}\n}", ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-12.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12.use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-12.use[3]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/settings/create_membership.vue?vue&type=style&index=0&id=0a10702a&lang=scss":
/*!*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-12.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12.use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-12.use[3]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/settings/create_membership.vue?vue&type=style&index=0&id=0a10702a&lang=scss ***!
  \*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../../../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_clonedRuleSet_12_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_12_use_2_node_modules_sass_loader_dist_cjs_js_clonedRuleSet_12_use_3_node_modules_vue_loader_lib_index_js_vue_loader_options_create_membership_vue_vue_type_style_index_0_id_0a10702a_lang_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !!../../../../../../node_modules/css-loader/dist/cjs.js??clonedRuleSet-12.use[1]!../../../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12.use[2]!../../../../../../node_modules/sass-loader/dist/cjs.js??clonedRuleSet-12.use[3]!../../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./create_membership.vue?vue&type=style&index=0&id=0a10702a&lang=scss */ "./node_modules/css-loader/dist/cjs.js??clonedRuleSet-12.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12.use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-12.use[3]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/settings/create_membership.vue?vue&type=style&index=0&id=0a10702a&lang=scss");

            

var options = {};

options.insert = "head";
options.singleton = false;

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_clonedRuleSet_12_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_12_use_2_node_modules_sass_loader_dist_cjs_js_clonedRuleSet_12_use_3_node_modules_vue_loader_lib_index_js_vue_loader_options_create_membership_vue_vue_type_style_index_0_id_0a10702a_lang_scss__WEBPACK_IMPORTED_MODULE_1__["default"], options);



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_clonedRuleSet_12_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_12_use_2_node_modules_sass_loader_dist_cjs_js_clonedRuleSet_12_use_3_node_modules_vue_loader_lib_index_js_vue_loader_options_create_membership_vue_vue_type_style_index_0_id_0a10702a_lang_scss__WEBPACK_IMPORTED_MODULE_1__["default"].locals || {});

/***/ }),

/***/ "./resources/src/views/app/pages/settings/create_membership.vue":
/*!**********************************************************************!*\
  !*** ./resources/src/views/app/pages/settings/create_membership.vue ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _create_membership_vue_vue_type_template_id_0a10702a__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./create_membership.vue?vue&type=template&id=0a10702a */ "./resources/src/views/app/pages/settings/create_membership.vue?vue&type=template&id=0a10702a");
/* harmony import */ var _create_membership_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./create_membership.vue?vue&type=script&lang=js */ "./resources/src/views/app/pages/settings/create_membership.vue?vue&type=script&lang=js");
/* harmony import */ var _create_membership_vue_vue_type_style_index_0_id_0a10702a_lang_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./create_membership.vue?vue&type=style&index=0&id=0a10702a&lang=scss */ "./resources/src/views/app/pages/settings/create_membership.vue?vue&type=style&index=0&id=0a10702a&lang=scss");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");



;


/* normalize component */

var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _create_membership_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__["default"],
  _create_membership_vue_vue_type_template_id_0a10702a__WEBPACK_IMPORTED_MODULE_0__.render,
  _create_membership_vue_vue_type_template_id_0a10702a__WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/src/views/app/pages/settings/create_membership.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./resources/src/views/app/pages/settings/create_membership.vue?vue&type=script&lang=js":
/*!**********************************************************************************************!*\
  !*** ./resources/src/views/app/pages/settings/create_membership.vue?vue&type=script&lang=js ***!
  \**********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_create_membership_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./create_membership.vue?vue&type=script&lang=js */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/settings/create_membership.vue?vue&type=script&lang=js");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_create_membership_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/src/views/app/pages/settings/create_membership.vue?vue&type=style&index=0&id=0a10702a&lang=scss":
/*!*******************************************************************************************************************!*\
  !*** ./resources/src/views/app/pages/settings/create_membership.vue?vue&type=style&index=0&id=0a10702a&lang=scss ***!
  \*******************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_dist_cjs_js_node_modules_css_loader_dist_cjs_js_clonedRuleSet_12_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_12_use_2_node_modules_sass_loader_dist_cjs_js_clonedRuleSet_12_use_3_node_modules_vue_loader_lib_index_js_vue_loader_options_create_membership_vue_vue_type_style_index_0_id_0a10702a_lang_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/style-loader/dist/cjs.js!../../../../../../node_modules/css-loader/dist/cjs.js??clonedRuleSet-12.use[1]!../../../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12.use[2]!../../../../../../node_modules/sass-loader/dist/cjs.js??clonedRuleSet-12.use[3]!../../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./create_membership.vue?vue&type=style&index=0&id=0a10702a&lang=scss */ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-12.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12.use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-12.use[3]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/settings/create_membership.vue?vue&type=style&index=0&id=0a10702a&lang=scss");


/***/ }),

/***/ "./resources/src/views/app/pages/settings/create_membership.vue?vue&type=template&id=0a10702a":
/*!****************************************************************************************************!*\
  !*** ./resources/src/views/app/pages/settings/create_membership.vue?vue&type=template&id=0a10702a ***!
  \****************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_create_membership_vue_vue_type_template_id_0a10702a__WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   staticRenderFns: () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_create_membership_vue_vue_type_template_id_0a10702a__WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_create_membership_vue_vue_type_template_id_0a10702a__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./create_membership.vue?vue&type=template&id=0a10702a */ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/settings/create_membership.vue?vue&type=template&id=0a10702a");


/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/settings/create_membership.vue?vue&type=template&id=0a10702a":
/*!*******************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/settings/create_membership.vue?vue&type=template&id=0a10702a ***!
  \*******************************************************************************************************************************************************************************************************************************************/
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
  return _c("div", { staticClass: "main-content" }, [
    _c("div", { staticClass: "page-header" }, [
      _c("h1", [
        _vm._v(
          _vm._s(
            _vm.isEditMode ? "Edit Membership Plan" : "Create Membership Plan"
          )
        ),
      ]),
      _vm._v(" "),
      _c(
        "button",
        {
          staticClass: "btn-back",
          attrs: { type: "button" },
          on: {
            click: function ($event) {
              return _vm.$router.push("/app/Settings/system_settings")
            },
          },
        },
        [
          _c("i", { staticClass: "fas fa-arrow-left" }),
          _vm._v(" Back to Settings\n    "),
        ]
      ),
    ]),
    _vm._v(" "),
    _c(
      "div",
      { staticClass: "membership-form-page" },
      [
        _c("validation-observer", { ref: "membershipForm" }, [
          _c(
            "form",
            {
              on: {
                submit: function ($event) {
                  $event.preventDefault()
                  return _vm.handleCreateMembership.apply(null, arguments)
                },
              },
            },
            [
              _c("div", { staticClass: "membership-form-sections" }, [
                _c("div", { staticClass: "form-section-card" }, [
                  _c("h3", { staticClass: "section-title" }, [
                    _vm._v(
                      "\n              \n              Membership Information\n            "
                    ),
                  ]),
                  _vm._v(" "),
                  _c("div", { staticClass: "form-fields" }, [
                    _c(
                      "div",
                      { staticClass: "form-field" },
                      [
                        _c("label", { staticClass: "field-label" }, [
                          _vm._v("\n                  Membership Name "),
                          _c("span", { staticClass: "required" }, [
                            _vm._v("*"),
                          ]),
                          _vm._v(" "),
                          _c("i", {
                            staticClass: "fas fa-info-circle info-icon",
                            attrs: {
                              title: "Enter the name of the membership plan",
                            },
                          }),
                        ]),
                        _vm._v(" "),
                        _c("validation-provider", {
                          attrs: { name: "Membership Name", rules: "required" },
                          scopedSlots: _vm._u([
                            {
                              key: "default",
                              fn: function (validationContext) {
                                return [
                                  _c("input", {
                                    directives: [
                                      {
                                        name: "model",
                                        rawName: "v-model",
                                        value: _vm.membershipForm.name,
                                        expression: "membershipForm.name",
                                      },
                                    ],
                                    class: [
                                      "field-input",
                                      {
                                        "is-invalid":
                                          validationContext.errors.length > 0,
                                      },
                                    ],
                                    attrs: {
                                      type: "text",
                                      placeholder:
                                        "e.g., Basic Plan, Premium Plan",
                                      required: "",
                                    },
                                    domProps: {
                                      value: _vm.membershipForm.name,
                                    },
                                    on: {
                                      input: function ($event) {
                                        if ($event.target.composing) {
                                          return
                                        }
                                        _vm.$set(
                                          _vm.membershipForm,
                                          "name",
                                          $event.target.value
                                        )
                                      },
                                    },
                                  }),
                                  _vm._v(" "),
                                  validationContext.errors.length > 0
                                    ? _c(
                                        "div",
                                        { staticClass: "invalid-feedback" },
                                        [
                                          _vm._v(
                                            "\n                    " +
                                              _vm._s(
                                                validationContext.errors[0]
                                              ) +
                                              "\n                  "
                                          ),
                                        ]
                                      )
                                    : _vm._e(),
                                ]
                              },
                            },
                          ]),
                        }),
                      ],
                      1
                    ),
                    _vm._v(" "),
                    _c("div", { staticClass: "form-field" }, [
                      _c("label", { staticClass: "field-label" }, [
                        _vm._v(
                          "\n                  Membership Description\n                  "
                        ),
                        _c("i", {
                          staticClass: "fas fa-info-circle info-icon",
                          attrs: {
                            title: "Describe what this membership includes",
                          },
                        }),
                      ]),
                      _vm._v(" "),
                      _c("textarea", {
                        directives: [
                          {
                            name: "model",
                            rawName: "v-model",
                            value: _vm.membershipForm.description,
                            expression: "membershipForm.description",
                          },
                        ],
                        staticClass: "field-input field-textarea",
                        attrs: {
                          rows: "3",
                          placeholder: "Enter membership description",
                        },
                        domProps: { value: _vm.membershipForm.description },
                        on: {
                          input: function ($event) {
                            if ($event.target.composing) {
                              return
                            }
                            _vm.$set(
                              _vm.membershipForm,
                              "description",
                              $event.target.value
                            )
                          },
                        },
                      }),
                    ]),
                    _vm._v(" "),
                    _c("div", { staticClass: "form-field" }, [
                      _c("label", { staticClass: "field-label" }, [
                        _vm._v(
                          "\n                  Webshop Image (optional)\n                  "
                        ),
                        _c("i", {
                          staticClass: "fas fa-info-circle info-icon",
                          attrs: { title: "Upload an image for the webshop" },
                        }),
                      ]),
                      _vm._v(" "),
                      _c("div", { staticClass: "image-upload-wrapper" }, [
                        _vm.membershipForm.webshop_image
                          ? _c("div", { staticClass: "image-preview" }, [
                              _c("img", {
                                attrs: {
                                  src: _vm.membershipForm.webshop_image,
                                  alt: "Preview",
                                },
                              }),
                              _vm._v(" "),
                              _c(
                                "button",
                                {
                                  staticClass: "remove-image-btn",
                                  attrs: { type: "button" },
                                  on: {
                                    click: function ($event) {
                                      _vm.membershipForm.webshop_image = ""
                                    },
                                  },
                                },
                                [_c("i", { staticClass: "fas fa-times" })]
                              ),
                            ])
                          : _c("div", { staticClass: "image-placeholder" }, [
                              _c("i", { staticClass: "fas fa-image" }),
                              _vm._v(" "),
                              _c("p", [_vm._v("No image selected")]),
                            ]),
                        _vm._v(" "),
                        _c("input", {
                          ref: "webshopImageInput",
                          staticStyle: { display: "none" },
                          attrs: { type: "file", accept: "image/*" },
                          on: { change: _vm.handleWebshopImageUpload },
                        }),
                        _vm._v(" "),
                        _c(
                          "button",
                          {
                            staticClass: "change-image-btn",
                            attrs: { type: "button" },
                            on: {
                              click: function ($event) {
                                return _vm.$refs.webshopImageInput.click()
                              },
                            },
                          },
                          [
                            _vm._v(
                              "\n                    Change\n                  "
                            ),
                          ]
                        ),
                      ]),
                    ]),
                    _vm._v(" "),
                    _c("div", { staticClass: "form-field" }, [
                      _c("label", { staticClass: "field-label" }, [
                        _vm._v("\n                  Group\n                  "),
                        _c("i", {
                          staticClass: "fas fa-info-circle info-icon",
                          attrs: { title: "Select the membership group" },
                        }),
                      ]),
                      _vm._v(" "),
                      _c(
                        "select",
                        {
                          directives: [
                            {
                              name: "model",
                              rawName: "v-model",
                              value: _vm.membershipForm.group,
                              expression: "membershipForm.group",
                            },
                          ],
                          staticClass: "field-input field-select",
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
                                _vm.membershipForm,
                                "group",
                                $event.target.multiple
                                  ? $$selectedVal
                                  : $$selectedVal[0]
                              )
                            },
                          },
                        },
                        [
                          _c("option", { attrs: { value: "" } }, [
                            _vm._v("Select a group"),
                          ]),
                          _vm._v(" "),
                          _vm._l(_vm.membershipGroups, function (group) {
                            return _c(
                              "option",
                              {
                                key: group.id,
                                domProps: { value: group.name },
                              },
                              [
                                _vm._v(
                                  "\n                    " +
                                    _vm._s(group.name) +
                                    "\n                  "
                                ),
                              ]
                            )
                          }),
                        ],
                        2
                      ),
                    ]),
                    _vm._v(" "),
                    _c("div", { staticClass: "form-field" }, [
                      _c("label", { staticClass: "field-label" }, [
                        _vm._v(
                          "\n                  Specific terms & conditions\n                  "
                        ),
                        _c("i", {
                          staticClass: "fas fa-info-circle info-icon",
                          attrs: { title: "Select terms and conditions" },
                        }),
                      ]),
                      _vm._v(" "),
                      _c(
                        "select",
                        {
                          directives: [
                            {
                              name: "model",
                              rawName: "v-model",
                              value: _vm.membershipForm.terms_conditions,
                              expression: "membershipForm.terms_conditions",
                            },
                          ],
                          staticClass: "field-input field-select",
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
                                _vm.membershipForm,
                                "terms_conditions",
                                $event.target.multiple
                                  ? $$selectedVal
                                  : $$selectedVal[0]
                              )
                            },
                          },
                        },
                        [
                          _c("option", { attrs: { value: "general" } }, [
                            _vm._v("Only General Terms"),
                          ]),
                          _vm._v(" "),
                          _c("option", { attrs: { value: "custom" } }, [
                            _vm._v("Custom Terms"),
                          ]),
                        ]
                      ),
                    ]),
                    _vm._v(" "),
                    _c("div", { staticClass: "form-field" }, [
                      _c("label", { staticClass: "field-label" }, [
                        _vm._v(
                          "\n                  Start date\n                  "
                        ),
                        _c("i", {
                          staticClass: "fas fa-info-circle info-icon",
                          attrs: {
                            title: "When can members start this membership",
                          },
                        }),
                      ]),
                      _vm._v(" "),
                      _c("div", { staticClass: "radio-group" }, [
                        _c("label", { staticClass: "radio-label" }, [
                          _c("input", {
                            directives: [
                              {
                                name: "model",
                                rawName: "v-model",
                                value: _vm.membershipForm.start_date_type,
                                expression: "membershipForm.start_date_type",
                              },
                            ],
                            attrs: {
                              type: "radio",
                              name: "start_date_type",
                              value: "any",
                            },
                            domProps: {
                              checked: _vm._q(
                                _vm.membershipForm.start_date_type,
                                "any"
                              ),
                            },
                            on: {
                              change: function ($event) {
                                return _vm.$set(
                                  _vm.membershipForm,
                                  "start_date_type",
                                  "any"
                                )
                              },
                            },
                          }),
                          _vm._v(" "),
                          _c("span", { staticClass: "radio-text" }, [
                            _vm._v("Any start date"),
                          ]),
                        ]),
                        _vm._v(" "),
                        _c("label", { staticClass: "radio-label" }, [
                          _c("input", {
                            directives: [
                              {
                                name: "model",
                                rawName: "v-model",
                                value: _vm.membershipForm.start_date_type,
                                expression: "membershipForm.start_date_type",
                              },
                            ],
                            attrs: {
                              type: "radio",
                              name: "start_date_type",
                              value: "between",
                            },
                            domProps: {
                              checked: _vm._q(
                                _vm.membershipForm.start_date_type,
                                "between"
                              ),
                            },
                            on: {
                              change: function ($event) {
                                return _vm.$set(
                                  _vm.membershipForm,
                                  "start_date_type",
                                  "between"
                                )
                              },
                            },
                          }),
                          _vm._v(" "),
                          _c("span", { staticClass: "radio-text" }, [
                            _vm._v("Start date between"),
                          ]),
                        ]),
                      ]),
                      _vm._v(" "),
                      _vm.membershipForm.start_date_type === "between"
                        ? _c("div", { staticClass: "date-range-inputs" }, [
                            _c("input", {
                              directives: [
                                {
                                  name: "model",
                                  rawName: "v-model",
                                  value: _vm.membershipForm.start_date_from,
                                  expression: "membershipForm.start_date_from",
                                },
                              ],
                              staticClass: "field-input",
                              attrs: { type: "date" },
                              domProps: {
                                value: _vm.membershipForm.start_date_from,
                              },
                              on: {
                                input: function ($event) {
                                  if ($event.target.composing) {
                                    return
                                  }
                                  _vm.$set(
                                    _vm.membershipForm,
                                    "start_date_from",
                                    $event.target.value
                                  )
                                },
                              },
                            }),
                            _vm._v(" "),
                            _c("span", { staticClass: "date-separator" }, [
                              _vm._v("to"),
                            ]),
                            _vm._v(" "),
                            _c("input", {
                              directives: [
                                {
                                  name: "model",
                                  rawName: "v-model",
                                  value: _vm.membershipForm.start_date_to,
                                  expression: "membershipForm.start_date_to",
                                },
                              ],
                              staticClass: "field-input",
                              attrs: { type: "date" },
                              domProps: {
                                value: _vm.membershipForm.start_date_to,
                              },
                              on: {
                                input: function ($event) {
                                  if ($event.target.composing) {
                                    return
                                  }
                                  _vm.$set(
                                    _vm.membershipForm,
                                    "start_date_to",
                                    $event.target.value
                                  )
                                },
                              },
                            }),
                          ])
                        : _vm._e(),
                    ]),
                    _vm._v(" "),
                    _c("div", { staticClass: "form-field" }, [
                      _c("label", { staticClass: "field-label" }, [
                        _vm._v(
                          "\n                  Status\n                  "
                        ),
                        _c("i", {
                          staticClass: "fas fa-info-circle info-icon",
                          attrs: { title: "Membership status" },
                        }),
                      ]),
                      _vm._v(" "),
                      _c("div", { staticClass: "radio-group" }, [
                        _c("label", { staticClass: "radio-label" }, [
                          _c("input", {
                            directives: [
                              {
                                name: "model",
                                rawName: "v-model",
                                value: _vm.membershipForm.status_type,
                                expression: "membershipForm.status_type",
                              },
                            ],
                            attrs: {
                              type: "radio",
                              name: "status_type",
                              value: "active",
                            },
                            domProps: {
                              checked: _vm._q(
                                _vm.membershipForm.status_type,
                                "active"
                              ),
                            },
                            on: {
                              change: function ($event) {
                                return _vm.$set(
                                  _vm.membershipForm,
                                  "status_type",
                                  "active"
                                )
                              },
                            },
                          }),
                          _vm._v(" "),
                          _c("span", { staticClass: "radio-text" }, [
                            _vm._v("Active"),
                          ]),
                        ]),
                        _vm._v(" "),
                        _c("label", { staticClass: "radio-label" }, [
                          _c("input", {
                            directives: [
                              {
                                name: "model",
                                rawName: "v-model",
                                value: _vm.membershipForm.status_type,
                                expression: "membershipForm.status_type",
                              },
                            ],
                            attrs: {
                              type: "radio",
                              name: "status_type",
                              value: "active_between",
                            },
                            domProps: {
                              checked: _vm._q(
                                _vm.membershipForm.status_type,
                                "active_between"
                              ),
                            },
                            on: {
                              change: function ($event) {
                                return _vm.$set(
                                  _vm.membershipForm,
                                  "status_type",
                                  "active_between"
                                )
                              },
                            },
                          }),
                          _vm._v(" "),
                          _c("span", { staticClass: "radio-text" }, [
                            _vm._v("Active between"),
                          ]),
                        ]),
                      ]),
                      _vm._v(" "),
                      _vm.membershipForm.status_type === "active_between"
                        ? _c("div", { staticClass: "date-range-inputs" }, [
                            _c("input", {
                              directives: [
                                {
                                  name: "model",
                                  rawName: "v-model",
                                  value: _vm.membershipForm.status_from,
                                  expression: "membershipForm.status_from",
                                },
                              ],
                              staticClass: "field-input",
                              attrs: { type: "date" },
                              domProps: {
                                value: _vm.membershipForm.status_from,
                              },
                              on: {
                                input: function ($event) {
                                  if ($event.target.composing) {
                                    return
                                  }
                                  _vm.$set(
                                    _vm.membershipForm,
                                    "status_from",
                                    $event.target.value
                                  )
                                },
                              },
                            }),
                            _vm._v(" "),
                            _c("span", { staticClass: "date-separator" }, [
                              _vm._v("to"),
                            ]),
                            _vm._v(" "),
                            _c("input", {
                              directives: [
                                {
                                  name: "model",
                                  rawName: "v-model",
                                  value: _vm.membershipForm.status_to,
                                  expression: "membershipForm.status_to",
                                },
                              ],
                              staticClass: "field-input",
                              attrs: { type: "date" },
                              domProps: { value: _vm.membershipForm.status_to },
                              on: {
                                input: function ($event) {
                                  if ($event.target.composing) {
                                    return
                                  }
                                  _vm.$set(
                                    _vm.membershipForm,
                                    "status_to",
                                    $event.target.value
                                  )
                                },
                              },
                            }),
                          ])
                        : _vm._e(),
                    ]),
                  ]),
                ]),
                _vm._v(" "),
                _c("div", { staticClass: "form-section-card" }, [
                  _c("h3", { staticClass: "section-title" }, [
                    _vm._v(
                      "\n             \n              Membership Scope\n            "
                    ),
                  ]),
                  _vm._v(" "),
                  _c("div", { staticClass: "form-fields" }, [
                    _c("div", { staticClass: "form-field" }, [
                      _c("label", { staticClass: "field-label" }, [
                        _vm._v(
                          "\n                  Access times\n                  "
                        ),
                        _c("i", {
                          staticClass: "fas fa-info-circle info-icon",
                          attrs: {
                            title: "Restrict access times for this membership",
                          },
                        }),
                      ]),
                      _vm._v(" "),
                      _c("div", { staticClass: "radio-group" }, [
                        _c("label", { staticClass: "radio-label" }, [
                          _c("input", {
                            directives: [
                              {
                                name: "model",
                                rawName: "v-model",
                                value: _vm.membershipForm.access_times,
                                expression: "membershipForm.access_times",
                              },
                            ],
                            attrs: {
                              type: "radio",
                              name: "access_times",
                              value: "no_restriction",
                            },
                            domProps: {
                              checked: _vm._q(
                                _vm.membershipForm.access_times,
                                "no_restriction"
                              ),
                            },
                            on: {
                              change: function ($event) {
                                return _vm.$set(
                                  _vm.membershipForm,
                                  "access_times",
                                  "no_restriction"
                                )
                              },
                            },
                          }),
                          _vm._v(" "),
                          _c("span", { staticClass: "radio-text" }, [
                            _vm._v("No restriction"),
                          ]),
                        ]),
                        _vm._v(" "),
                        _c("label", { staticClass: "radio-label" }, [
                          _c("input", {
                            directives: [
                              {
                                name: "model",
                                rawName: "v-model",
                                value: _vm.membershipForm.access_times,
                                expression: "membershipForm.access_times",
                              },
                            ],
                            attrs: {
                              type: "radio",
                              name: "access_times",
                              value: "limited",
                            },
                            domProps: {
                              checked: _vm._q(
                                _vm.membershipForm.access_times,
                                "limited"
                              ),
                            },
                            on: {
                              change: function ($event) {
                                return _vm.$set(
                                  _vm.membershipForm,
                                  "access_times",
                                  "limited"
                                )
                              },
                            },
                          }),
                          _vm._v(" "),
                          _c("span", { staticClass: "radio-text" }, [
                            _vm._v("Limited access"),
                          ]),
                        ]),
                      ]),
                    ]),
                    _vm._v(" "),
                    _c("div", { staticClass: "form-field" }, [
                      _c("label", { staticClass: "field-label" }, [
                        _vm._v(
                          "\n                  Duration\n                  "
                        ),
                        _c("i", {
                          staticClass: "fas fa-info-circle info-icon",
                          attrs: { title: "Membership duration" },
                        }),
                      ]),
                      _vm._v(" "),
                      _c("div", { staticClass: "duration-input-group" }, [
                        _c("input", {
                          directives: [
                            {
                              name: "model",
                              rawName: "v-model.number",
                              value: _vm.membershipForm.duration_value,
                              expression: "membershipForm.duration_value",
                              modifiers: { number: true },
                            },
                          ],
                          staticClass: "field-input",
                          attrs: { type: "number", min: "1", placeholder: "1" },
                          domProps: {
                            value: _vm.membershipForm.duration_value,
                          },
                          on: {
                            input: function ($event) {
                              if ($event.target.composing) {
                                return
                              }
                              _vm.$set(
                                _vm.membershipForm,
                                "duration_value",
                                _vm._n($event.target.value)
                              )
                            },
                            blur: function ($event) {
                              return _vm.$forceUpdate()
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
                                value: _vm.membershipForm.duration_unit,
                                expression: "membershipForm.duration_unit",
                              },
                            ],
                            staticClass: "field-input field-select",
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
                                  _vm.membershipForm,
                                  "duration_unit",
                                  $event.target.multiple
                                    ? $$selectedVal
                                    : $$selectedVal[0]
                                )
                              },
                            },
                          },
                          [
                            _c("option", { attrs: { value: "days" } }, [
                              _vm._v("Days"),
                            ]),
                            _vm._v(" "),
                            _c("option", { attrs: { value: "weeks" } }, [
                              _vm._v("Weeks"),
                            ]),
                            _vm._v(" "),
                            _c(
                              "option",
                              { attrs: { value: "months", selected: "" } },
                              [_vm._v("Months")]
                            ),
                            _vm._v(" "),
                            _c("option", { attrs: { value: "years" } }, [
                              _vm._v("Years"),
                            ]),
                          ]
                        ),
                      ]),
                    ]),
                    _vm._v(" "),
                    _c("div", { staticClass: "form-field" }, [
                      _c("label", { staticClass: "checkbox-label" }, [
                        _c("input", {
                          directives: [
                            {
                              name: "model",
                              rawName: "v-model",
                              value: _vm.membershipForm.auto_renewed,
                              expression: "membershipForm.auto_renewed",
                            },
                          ],
                          staticClass: "checkbox-input",
                          attrs: { type: "checkbox" },
                          domProps: {
                            checked: Array.isArray(
                              _vm.membershipForm.auto_renewed
                            )
                              ? _vm._i(_vm.membershipForm.auto_renewed, null) >
                                -1
                              : _vm.membershipForm.auto_renewed,
                          },
                          on: {
                            change: function ($event) {
                              var $$a = _vm.membershipForm.auto_renewed,
                                $$el = $event.target,
                                $$c = $$el.checked ? true : false
                              if (Array.isArray($$a)) {
                                var $$v = null,
                                  $$i = _vm._i($$a, $$v)
                                if ($$el.checked) {
                                  $$i < 0 &&
                                    _vm.$set(
                                      _vm.membershipForm,
                                      "auto_renewed",
                                      $$a.concat([$$v])
                                    )
                                } else {
                                  $$i > -1 &&
                                    _vm.$set(
                                      _vm.membershipForm,
                                      "auto_renewed",
                                      $$a
                                        .slice(0, $$i)
                                        .concat($$a.slice($$i + 1))
                                    )
                                }
                              } else {
                                _vm.$set(
                                  _vm.membershipForm,
                                  "auto_renewed",
                                  $$c
                                )
                              }
                            },
                          },
                        }),
                        _vm._v(" "),
                        _c("span", { staticClass: "checkbox-text" }, [
                          _vm._v("Auto renewed?"),
                        ]),
                        _vm._v(" "),
                        _c("i", {
                          staticClass: "fas fa-info-circle info-icon",
                          attrs: {
                            title: "Automatically renew this membership",
                          },
                        }),
                      ]),
                    ]),
                  ]),
                ]),
                _vm._v(" "),
                _c("div", { staticClass: "form-section-card" }, [
                  _c("h3", { staticClass: "section-title" }, [
                    _vm._v("\n           \n              Price\n            "),
                  ]),
                  _vm._v(" "),
                  _c("div", { staticClass: "form-fields" }, [
                    _c(
                      "div",
                      { staticClass: "form-field" },
                      [
                        _c("label", { staticClass: "field-label" }, [
                          _vm._v(
                            "\n                  Regular price (inc. VAT/tax) "
                          ),
                          _c("span", { staticClass: "required" }, [
                            _vm._v("*"),
                          ]),
                          _vm._v(" "),
                          _c("i", {
                            staticClass: "fas fa-info-circle info-icon",
                            attrs: { title: "Regular price including tax" },
                          }),
                        ]),
                        _vm._v(" "),
                        _c("validation-provider", {
                          attrs: {
                            name: "Regular Price",
                            rules: "required|numeric|min_value:0",
                          },
                          scopedSlots: _vm._u([
                            {
                              key: "default",
                              fn: function (validationContext) {
                                return [
                                  _c(
                                    "div",
                                    { staticClass: "price-input-group" },
                                    [
                                      _c("input", {
                                        directives: [
                                          {
                                            name: "model",
                                            rawName: "v-model.number",
                                            value: _vm.membershipForm.price,
                                            expression: "membershipForm.price",
                                            modifiers: { number: true },
                                          },
                                        ],
                                        class: [
                                          "field-input",
                                          {
                                            "is-invalid":
                                              validationContext.errors.length >
                                              0,
                                          },
                                        ],
                                        attrs: {
                                          type: "number",
                                          step: "0.01",
                                          min: "0",
                                          placeholder: "0.00",
                                          required: "",
                                        },
                                        domProps: {
                                          value: _vm.membershipForm.price,
                                        },
                                        on: {
                                          input: function ($event) {
                                            if ($event.target.composing) {
                                              return
                                            }
                                            _vm.$set(
                                              _vm.membershipForm,
                                              "price",
                                              _vm._n($event.target.value)
                                            )
                                          },
                                          blur: function ($event) {
                                            return _vm.$forceUpdate()
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
                                              value:
                                                _vm.membershipForm.currency,
                                              expression:
                                                "membershipForm.currency",
                                            },
                                          ],
                                          staticClass:
                                            "field-input field-select",
                                          on: {
                                            change: function ($event) {
                                              var $$selectedVal =
                                                Array.prototype.filter
                                                  .call(
                                                    $event.target.options,
                                                    function (o) {
                                                      return o.selected
                                                    }
                                                  )
                                                  .map(function (o) {
                                                    var val =
                                                      "_value" in o
                                                        ? o._value
                                                        : o.value
                                                    return val
                                                  })
                                              _vm.$set(
                                                _vm.membershipForm,
                                                "currency",
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
                                            { attrs: { value: "USD" } },
                                            [_vm._v("USD")]
                                          ),
                                          _vm._v(" "),
                                          _c(
                                            "option",
                                            { attrs: { value: "EUR" } },
                                            [_vm._v("EUR")]
                                          ),
                                          _vm._v(" "),
                                          _c(
                                            "option",
                                            { attrs: { value: "GBP" } },
                                            [_vm._v("GBP")]
                                          ),
                                        ]
                                      ),
                                    ]
                                  ),
                                  _vm._v(" "),
                                  validationContext.errors.length > 0
                                    ? _c(
                                        "div",
                                        { staticClass: "invalid-feedback" },
                                        [
                                          _vm._v(
                                            "\n                    " +
                                              _vm._s(
                                                validationContext.errors[0]
                                              ) +
                                              "\n                  "
                                          ),
                                        ]
                                      )
                                    : _vm._e(),
                                ]
                              },
                            },
                          ]),
                        }),
                      ],
                      1
                    ),
                    _vm._v(" "),
                    _c("div", { staticClass: "form-field" }, [
                      _c("label", { staticClass: "field-label" }, [
                        _vm._v(
                          "\n                  Sales tax\n                  "
                        ),
                        _c("i", {
                          staticClass: "fas fa-info-circle info-icon",
                          attrs: { title: "Sales tax percentage" },
                        }),
                      ]),
                      _vm._v(" "),
                      _c(
                        "select",
                        {
                          directives: [
                            {
                              name: "model",
                              rawName: "v-model",
                              value: _vm.membershipForm.sales_tax,
                              expression: "membershipForm.sales_tax",
                            },
                          ],
                          staticClass: "field-input field-select",
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
                                _vm.membershipForm,
                                "sales_tax",
                                $event.target.multiple
                                  ? $$selectedVal
                                  : $$selectedVal[0]
                              )
                            },
                          },
                        },
                        [
                          _c("option", { attrs: { value: "default" } }, [
                            _vm._v("Default tax (0.00%)"),
                          ]),
                          _vm._v(" "),
                          _c("option", { attrs: { value: "5" } }, [
                            _vm._v("5%"),
                          ]),
                          _vm._v(" "),
                          _c("option", { attrs: { value: "10" } }, [
                            _vm._v("10%"),
                          ]),
                          _vm._v(" "),
                          _c("option", { attrs: { value: "20" } }, [
                            _vm._v("20%"),
                          ]),
                        ]
                      ),
                    ]),
                    _vm._v(" "),
                    _c(
                      "div",
                      { staticClass: "form-field" },
                      [
                        _c("label", { staticClass: "field-label" }, [
                          _vm._v(
                            "\n                  Billing cycle\n                  "
                          ),
                          _c("i", {
                            staticClass: "fas fa-info-circle info-icon",
                            attrs: { title: "How often to bill" },
                          }),
                        ]),
                        _vm._v(" "),
                        _c("validation-provider", {
                          attrs: { name: "Billing Cycle", rules: "required" },
                          scopedSlots: _vm._u([
                            {
                              key: "default",
                              fn: function (validationContext) {
                                return [
                                  _c(
                                    "select",
                                    {
                                      directives: [
                                        {
                                          name: "model",
                                          rawName: "v-model",
                                          value: _vm.membershipForm.interval,
                                          expression: "membershipForm.interval",
                                        },
                                      ],
                                      class: [
                                        "field-input",
                                        "field-select",
                                        {
                                          "is-invalid":
                                            validationContext.errors.length > 0,
                                        },
                                      ],
                                      attrs: { required: "" },
                                      on: {
                                        change: function ($event) {
                                          var $$selectedVal =
                                            Array.prototype.filter
                                              .call(
                                                $event.target.options,
                                                function (o) {
                                                  return o.selected
                                                }
                                              )
                                              .map(function (o) {
                                                var val =
                                                  "_value" in o
                                                    ? o._value
                                                    : o.value
                                                return val
                                              })
                                          _vm.$set(
                                            _vm.membershipForm,
                                            "interval",
                                            $event.target.multiple
                                              ? $$selectedVal
                                              : $$selectedVal[0]
                                          )
                                        },
                                      },
                                    },
                                    [
                                      _c("option", { attrs: { value: "" } }, [
                                        _vm._v("Select"),
                                      ]),
                                      _vm._v(" "),
                                      _c(
                                        "option",
                                        { attrs: { value: "monthly" } },
                                        [_vm._v("Monthly")]
                                      ),
                                      _vm._v(" "),
                                      _c(
                                        "option",
                                        { attrs: { value: "yearly" } },
                                        [_vm._v("Yearly")]
                                      ),
                                      _vm._v(" "),
                                      _c(
                                        "option",
                                        { attrs: { value: "weekly" } },
                                        [_vm._v("Weekly")]
                                      ),
                                      _vm._v(" "),
                                      _c(
                                        "option",
                                        { attrs: { value: "daily" } },
                                        [_vm._v("Daily")]
                                      ),
                                    ]
                                  ),
                                  _vm._v(" "),
                                  validationContext.errors.length > 0
                                    ? _c(
                                        "div",
                                        { staticClass: "invalid-feedback" },
                                        [
                                          _vm._v(
                                            "\n                    " +
                                              _vm._s(
                                                validationContext.errors[0]
                                              ) +
                                              "\n                  "
                                          ),
                                        ]
                                      )
                                    : _vm._e(),
                                ]
                              },
                            },
                          ]),
                        }),
                      ],
                      1
                    ),
                    _vm._v(" "),
                    _c("div", { staticClass: "form-field" }, [
                      _c("label", { staticClass: "field-label" }, [
                        _vm._v(
                          "\n                  Recurring billing date\n                  "
                        ),
                        _c("i", {
                          staticClass: "fas fa-info-circle info-icon",
                          attrs: { title: "When to generate invoices" },
                        }),
                      ]),
                      _vm._v(" "),
                      _c("div", { staticClass: "radio-group" }, [
                        _c("label", { staticClass: "radio-label" }, [
                          _c("input", {
                            directives: [
                              {
                                name: "model",
                                rawName: "v-model",
                                value: _vm.membershipForm.recurring_billing,
                                expression: "membershipForm.recurring_billing",
                              },
                            ],
                            attrs: {
                              type: "radio",
                              name: "recurring_billing",
                              value: "from_start",
                            },
                            domProps: {
                              checked: _vm._q(
                                _vm.membershipForm.recurring_billing,
                                "from_start"
                              ),
                            },
                            on: {
                              change: function ($event) {
                                return _vm.$set(
                                  _vm.membershipForm,
                                  "recurring_billing",
                                  "from_start"
                                )
                              },
                            },
                          }),
                          _vm._v(" "),
                          _c("div", [
                            _c("span", { staticClass: "radio-text" }, [
                              _vm._v("From membership start date"),
                            ]),
                            _vm._v(" "),
                            _c("small", { staticClass: "radio-hint" }, [
                              _vm._v(
                                "The invoices will generate each month starting from the membership start date"
                              ),
                            ]),
                          ]),
                        ]),
                        _vm._v(" "),
                        _c("label", { staticClass: "radio-label" }, [
                          _c("input", {
                            directives: [
                              {
                                name: "model",
                                rawName: "v-model",
                                value: _vm.membershipForm.recurring_billing,
                                expression: "membershipForm.recurring_billing",
                              },
                            ],
                            attrs: {
                              type: "radio",
                              name: "recurring_billing",
                              value: "first_of_month",
                            },
                            domProps: {
                              checked: _vm._q(
                                _vm.membershipForm.recurring_billing,
                                "first_of_month"
                              ),
                            },
                            on: {
                              change: function ($event) {
                                return _vm.$set(
                                  _vm.membershipForm,
                                  "recurring_billing",
                                  "first_of_month"
                                )
                              },
                            },
                          }),
                          _vm._v(" "),
                          _c("div", [
                            _c("span", { staticClass: "radio-text" }, [
                              _vm._v("From 1st of the month"),
                            ]),
                            _vm._v(" "),
                            _c("small", { staticClass: "radio-hint" }, [
                              _vm._v(
                                "The first invoice will be prorated until the beginning of the next month"
                              ),
                            ]),
                          ]),
                        ]),
                      ]),
                    ]),
                    _vm._v(" "),
                    _c("div", { staticClass: "form-field" }, [
                      _c("label", { staticClass: "field-label" }, [
                        _vm._v(
                          "\n                  Income Category\n                  "
                        ),
                        _c("i", {
                          staticClass: "fas fa-info-circle info-icon",
                          attrs: { title: "Category for income tracking" },
                        }),
                      ]),
                      _vm._v(" "),
                      _c(
                        "select",
                        {
                          directives: [
                            {
                              name: "model",
                              rawName: "v-model",
                              value: _vm.membershipForm.income_category,
                              expression: "membershipForm.income_category",
                            },
                          ],
                          staticClass: "field-input field-select",
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
                                _vm.membershipForm,
                                "income_category",
                                $event.target.multiple
                                  ? $$selectedVal
                                  : $$selectedVal[0]
                              )
                            },
                          },
                        },
                        [
                          _c("option", { attrs: { value: "" } }, [
                            _vm._v("Select"),
                          ]),
                          _vm._v(" "),
                          _c("option", { attrs: { value: "membership" } }, [
                            _vm._v("Membership"),
                          ]),
                          _vm._v(" "),
                          _c("option", { attrs: { value: "training" } }, [
                            _vm._v("Training"),
                          ]),
                          _vm._v(" "),
                          _c("option", { attrs: { value: "other" } }, [
                            _vm._v("Other"),
                          ]),
                        ]
                      ),
                    ]),
                    _vm._v(" "),
                    _c("div", { staticClass: "form-field" }, [
                      _c("label", { staticClass: "field-label" }, [
                        _vm._v(
                          "\n                  Default payment method\n                  "
                        ),
                        _c("i", {
                          staticClass: "fas fa-info-circle info-icon",
                          attrs: { title: "Default payment method" },
                        }),
                      ]),
                      _vm._v(" "),
                      _c(
                        "select",
                        {
                          directives: [
                            {
                              name: "model",
                              rawName: "v-model",
                              value: _vm.membershipForm.default_payment_method,
                              expression:
                                "membershipForm.default_payment_method",
                            },
                          ],
                          staticClass: "field-input field-select",
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
                                _vm.membershipForm,
                                "default_payment_method",
                                $event.target.multiple
                                  ? $$selectedVal
                                  : $$selectedVal[0]
                              )
                            },
                          },
                        },
                        [
                          _c("option", { attrs: { value: "cash" } }, [
                            _vm._v("Cash"),
                          ]),
                          _vm._v(" "),
                          _c("option", { attrs: { value: "card" } }, [
                            _vm._v("Card"),
                          ]),
                          _vm._v(" "),
                          _c("option", { attrs: { value: "bank_transfer" } }, [
                            _vm._v("Bank Transfer"),
                          ]),
                          _vm._v(" "),
                          _c("option", { attrs: { value: "stripe" } }, [
                            _vm._v("Stripe"),
                          ]),
                        ]
                      ),
                    ]),
                    _vm._v(" "),
                    _c("div", { staticClass: "form-field" }, [
                      _c("label", { staticClass: "field-label" }, [
                        _vm._v(
                          "\n                  Next invoice will be created\n                  "
                        ),
                        _c("i", {
                          staticClass: "fas fa-info-circle info-icon",
                          attrs: { title: "When to create the next invoice" },
                        }),
                      ]),
                      _vm._v(" "),
                      _c("div", { staticClass: "invoice-timing-group" }, [
                        _c("input", {
                          directives: [
                            {
                              name: "model",
                              rawName: "v-model.number",
                              value: _vm.membershipForm.invoice_before_value,
                              expression: "membershipForm.invoice_before_value",
                              modifiers: { number: true },
                            },
                          ],
                          staticClass: "field-input",
                          attrs: { type: "number", min: "0", placeholder: "1" },
                          domProps: {
                            value: _vm.membershipForm.invoice_before_value,
                          },
                          on: {
                            input: function ($event) {
                              if ($event.target.composing) {
                                return
                              }
                              _vm.$set(
                                _vm.membershipForm,
                                "invoice_before_value",
                                _vm._n($event.target.value)
                              )
                            },
                            blur: function ($event) {
                              return _vm.$forceUpdate()
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
                                value: _vm.membershipForm.invoice_before_unit,
                                expression:
                                  "membershipForm.invoice_before_unit",
                              },
                            ],
                            staticClass: "field-input field-select",
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
                                  _vm.membershipForm,
                                  "invoice_before_unit",
                                  $event.target.multiple
                                    ? $$selectedVal
                                    : $$selectedVal[0]
                                )
                              },
                            },
                          },
                          [
                            _c("option", { attrs: { value: "days" } }, [
                              _vm._v("Days"),
                            ]),
                            _vm._v(" "),
                            _c(
                              "option",
                              { attrs: { value: "weeks", selected: "" } },
                              [_vm._v("Weeks")]
                            ),
                            _vm._v(" "),
                            _c("option", { attrs: { value: "months" } }, [
                              _vm._v("Months"),
                            ]),
                          ]
                        ),
                        _vm._v(" "),
                        _c("span", { staticClass: "timing-text" }, [
                          _vm._v("before the start of the new billing cycle."),
                        ]),
                      ]),
                    ]),
                    _vm._v(" "),
                    _c("div", { staticClass: "form-field" }, [
                      _c("label", { staticClass: "checkbox-label" }, [
                        _c("input", {
                          directives: [
                            {
                              name: "model",
                              rawName: "v-model",
                              value: _vm.membershipForm.one_time_payment,
                              expression: "membershipForm.one_time_payment",
                            },
                          ],
                          staticClass: "checkbox-input",
                          attrs: { type: "checkbox" },
                          domProps: {
                            checked: Array.isArray(
                              _vm.membershipForm.one_time_payment
                            )
                              ? _vm._i(
                                  _vm.membershipForm.one_time_payment,
                                  null
                                ) > -1
                              : _vm.membershipForm.one_time_payment,
                          },
                          on: {
                            change: function ($event) {
                              var $$a = _vm.membershipForm.one_time_payment,
                                $$el = $event.target,
                                $$c = $$el.checked ? true : false
                              if (Array.isArray($$a)) {
                                var $$v = null,
                                  $$i = _vm._i($$a, $$v)
                                if ($$el.checked) {
                                  $$i < 0 &&
                                    _vm.$set(
                                      _vm.membershipForm,
                                      "one_time_payment",
                                      $$a.concat([$$v])
                                    )
                                } else {
                                  $$i > -1 &&
                                    _vm.$set(
                                      _vm.membershipForm,
                                      "one_time_payment",
                                      $$a
                                        .slice(0, $$i)
                                        .concat($$a.slice($$i + 1))
                                    )
                                }
                              } else {
                                _vm.$set(
                                  _vm.membershipForm,
                                  "one_time_payment",
                                  $$c
                                )
                              }
                            },
                          },
                        }),
                        _vm._v(" "),
                        _c("span", { staticClass: "checkbox-text" }, [
                          _vm._v("One-time payment/registration fee"),
                        ]),
                        _vm._v(" "),
                        _c("i", {
                          staticClass: "fas fa-info-circle info-icon",
                          attrs: { title: "Charge a one-time fee" },
                        }),
                      ]),
                      _vm._v(" "),
                      _vm.membershipForm.one_time_payment
                        ? _c("div", { staticClass: "one-time-fee-input" }, [
                            _c("input", {
                              directives: [
                                {
                                  name: "model",
                                  rawName: "v-model",
                                  value: _vm.membershipForm.registration_fee,
                                  expression: "membershipForm.registration_fee",
                                },
                              ],
                              staticClass: "field-input",
                              attrs: {
                                type: "number",
                                step: "0.01",
                                min: "0",
                                placeholder: "0.00",
                              },
                              domProps: {
                                value: _vm.membershipForm.registration_fee,
                              },
                              on: {
                                input: function ($event) {
                                  if ($event.target.composing) {
                                    return
                                  }
                                  _vm.$set(
                                    _vm.membershipForm,
                                    "registration_fee",
                                    $event.target.value
                                  )
                                },
                              },
                            }),
                          ])
                        : _vm._e(),
                    ]),
                  ]),
                ]),
                _vm._v(" "),
                _c("div", { staticClass: "form-section-card" }, [
                  _c("h3", { staticClass: "section-title" }, [
                    _vm._v("\n          \n              Credits\n            "),
                  ]),
                  _vm._v(" "),
                  _c("div", { staticClass: "credits-section" }, [
                    _c("div", { staticClass: "credits-table-header" }, [
                      _c("div", { staticClass: "credits-col-checkbox" }),
                      _vm._v(" "),
                      _c("div", { staticClass: "credits-col-service" }, [
                        _vm._v("Service"),
                      ]),
                      _vm._v(" "),
                      _c("div", { staticClass: "credits-col-amount" }, [
                        _vm._v(
                          "\n                  Amount\n                  "
                        ),
                        _c("i", {
                          staticClass: "fas fa-info-circle info-icon",
                        }),
                      ]),
                      _vm._v(" "),
                      _c("div", { staticClass: "credits-col-frequency" }, [
                        _vm._v(
                          "\n                  Frequency\n                  "
                        ),
                        _c("i", {
                          staticClass: "fas fa-info-circle info-icon",
                        }),
                      ]),
                      _vm._v(" "),
                      _c("div", { staticClass: "credits-col-validity" }, [
                        _vm._v(
                          "\n                  Validity\n                  "
                        ),
                        _c("i", {
                          staticClass: "fas fa-info-circle info-icon",
                        }),
                      ]),
                      _vm._v(" "),
                      _c("div", { staticClass: "credits-col-extra" }, [
                        _vm._v(
                          "\n                  Extra of start\n                  "
                        ),
                        _c("i", {
                          staticClass: "fas fa-info-circle info-icon",
                        }),
                      ]),
                    ]),
                    _vm._v(" "),
                    _c(
                      "div",
                      { staticClass: "credits-services-list" },
                      _vm._l(_vm.availableServices, function (service) {
                        return _c(
                          "div",
                          {
                            key: service.id,
                            staticClass: "credits-service-row",
                          },
                          [
                            _c("div", { staticClass: "credits-col-checkbox" }, [
                              _c("input", {
                                directives: [
                                  {
                                    name: "model",
                                    rawName: "v-model",
                                    value: service.enabled,
                                    expression: "service.enabled",
                                  },
                                ],
                                attrs: {
                                  type: "checkbox",
                                  id: "service-" + service.id,
                                },
                                domProps: {
                                  checked: Array.isArray(service.enabled)
                                    ? _vm._i(service.enabled, null) > -1
                                    : service.enabled,
                                },
                                on: {
                                  change: function ($event) {
                                    var $$a = service.enabled,
                                      $$el = $event.target,
                                      $$c = $$el.checked ? true : false
                                    if (Array.isArray($$a)) {
                                      var $$v = null,
                                        $$i = _vm._i($$a, $$v)
                                      if ($$el.checked) {
                                        $$i < 0 &&
                                          _vm.$set(
                                            service,
                                            "enabled",
                                            $$a.concat([$$v])
                                          )
                                      } else {
                                        $$i > -1 &&
                                          _vm.$set(
                                            service,
                                            "enabled",
                                            $$a
                                              .slice(0, $$i)
                                              .concat($$a.slice($$i + 1))
                                          )
                                      }
                                    } else {
                                      _vm.$set(service, "enabled", $$c)
                                    }
                                  },
                                },
                              }),
                            ]),
                            _vm._v(" "),
                            _c("div", { staticClass: "credits-col-service" }, [
                              _c(
                                "label",
                                { attrs: { for: "service-" + service.id } },
                                [_vm._v(_vm._s(service.name))]
                              ),
                            ]),
                            _vm._v(" "),
                            service.enabled
                              ? _c(
                                  "div",
                                  { staticClass: "credits-col-amount" },
                                  [
                                    _c("input", {
                                      directives: [
                                        {
                                          name: "model",
                                          rawName: "v-model.number",
                                          value: service.amount,
                                          expression: "service.amount",
                                          modifiers: { number: true },
                                        },
                                      ],
                                      staticClass: "field-input",
                                      class: {
                                        "is-invalid":
                                          service.enabled &&
                                          (!service.amount ||
                                            service.amount <= 0),
                                      },
                                      attrs: {
                                        type: "number",
                                        min: "0.01",
                                        step: "0.01",
                                        placeholder: "Enter credits",
                                        required: "",
                                      },
                                      domProps: { value: service.amount },
                                      on: {
                                        input: function ($event) {
                                          if ($event.target.composing) {
                                            return
                                          }
                                          _vm.$set(
                                            service,
                                            "amount",
                                            _vm._n($event.target.value)
                                          )
                                        },
                                        blur: function ($event) {
                                          return _vm.$forceUpdate()
                                        },
                                      },
                                    }),
                                    _vm._v(" "),
                                    _c("span", [_vm._v("Credits")]),
                                    _vm._v(" "),
                                    service.enabled &&
                                    (!service.amount || service.amount <= 0)
                                      ? _c(
                                          "small",
                                          {
                                            staticClass:
                                              "text-danger d-block mt-1",
                                          },
                                          [
                                            _vm._v(
                                              "\n                      Amount must be greater than 0\n                    "
                                            ),
                                          ]
                                        )
                                      : _vm._e(),
                                  ]
                                )
                              : _vm._e(),
                            _vm._v(" "),
                            service.enabled
                              ? _c(
                                  "div",
                                  { staticClass: "credits-col-frequency" },
                                  [
                                    _c("input", {
                                      directives: [
                                        {
                                          name: "model",
                                          rawName: "v-model.number",
                                          value: service.frequency_value,
                                          expression: "service.frequency_value",
                                          modifiers: { number: true },
                                        },
                                      ],
                                      staticClass: "field-input",
                                      attrs: {
                                        type: "number",
                                        min: "0",
                                        placeholder: "1",
                                      },
                                      domProps: {
                                        value: service.frequency_value,
                                      },
                                      on: {
                                        input: function ($event) {
                                          if ($event.target.composing) {
                                            return
                                          }
                                          _vm.$set(
                                            service,
                                            "frequency_value",
                                            _vm._n($event.target.value)
                                          )
                                        },
                                        blur: function ($event) {
                                          return _vm.$forceUpdate()
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
                                            value: service.frequency_unit,
                                            expression:
                                              "service.frequency_unit",
                                          },
                                        ],
                                        staticClass: "field-input field-select",
                                        on: {
                                          change: function ($event) {
                                            var $$selectedVal =
                                              Array.prototype.filter
                                                .call(
                                                  $event.target.options,
                                                  function (o) {
                                                    return o.selected
                                                  }
                                                )
                                                .map(function (o) {
                                                  var val =
                                                    "_value" in o
                                                      ? o._value
                                                      : o.value
                                                  return val
                                                })
                                            _vm.$set(
                                              service,
                                              "frequency_unit",
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
                                          { attrs: { value: "days" } },
                                          [_vm._v("Days")]
                                        ),
                                        _vm._v(" "),
                                        _c(
                                          "option",
                                          { attrs: { value: "weeks" } },
                                          [_vm._v("Weeks")]
                                        ),
                                        _vm._v(" "),
                                        _c(
                                          "option",
                                          {
                                            attrs: {
                                              value: "months",
                                              selected: "",
                                            },
                                          },
                                          [_vm._v("Months")]
                                        ),
                                      ]
                                    ),
                                  ]
                                )
                              : _vm._e(),
                            _vm._v(" "),
                            service.enabled
                              ? _c(
                                  "div",
                                  { staticClass: "credits-col-validity" },
                                  [
                                    _c("input", {
                                      directives: [
                                        {
                                          name: "model",
                                          rawName: "v-model.number",
                                          value: service.validity_value,
                                          expression: "service.validity_value",
                                          modifiers: { number: true },
                                        },
                                      ],
                                      staticClass: "field-input",
                                      attrs: {
                                        type: "number",
                                        min: "0",
                                        placeholder: "1",
                                      },
                                      domProps: {
                                        value: service.validity_value,
                                      },
                                      on: {
                                        input: function ($event) {
                                          if ($event.target.composing) {
                                            return
                                          }
                                          _vm.$set(
                                            service,
                                            "validity_value",
                                            _vm._n($event.target.value)
                                          )
                                        },
                                        blur: function ($event) {
                                          return _vm.$forceUpdate()
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
                                            value: service.validity_unit,
                                            expression: "service.validity_unit",
                                          },
                                        ],
                                        staticClass: "field-input field-select",
                                        on: {
                                          change: function ($event) {
                                            var $$selectedVal =
                                              Array.prototype.filter
                                                .call(
                                                  $event.target.options,
                                                  function (o) {
                                                    return o.selected
                                                  }
                                                )
                                                .map(function (o) {
                                                  var val =
                                                    "_value" in o
                                                      ? o._value
                                                      : o.value
                                                  return val
                                                })
                                            _vm.$set(
                                              service,
                                              "validity_unit",
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
                                          { attrs: { value: "days" } },
                                          [_vm._v("Days")]
                                        ),
                                        _vm._v(" "),
                                        _c(
                                          "option",
                                          { attrs: { value: "weeks" } },
                                          [_vm._v("Weeks")]
                                        ),
                                        _vm._v(" "),
                                        _c(
                                          "option",
                                          {
                                            attrs: {
                                              value: "months",
                                              selected: "",
                                            },
                                          },
                                          [_vm._v("Months")]
                                        ),
                                      ]
                                    ),
                                  ]
                                )
                              : _vm._e(),
                            _vm._v(" "),
                            service.enabled
                              ? _c(
                                  "div",
                                  { staticClass: "credits-col-extra" },
                                  [
                                    _c("input", {
                                      directives: [
                                        {
                                          name: "model",
                                          rawName: "v-model",
                                          value: service.extra_of_start,
                                          expression: "service.extra_of_start",
                                        },
                                      ],
                                      attrs: { type: "checkbox" },
                                      domProps: {
                                        checked: Array.isArray(
                                          service.extra_of_start
                                        )
                                          ? _vm._i(
                                              service.extra_of_start,
                                              null
                                            ) > -1
                                          : service.extra_of_start,
                                      },
                                      on: {
                                        change: function ($event) {
                                          var $$a = service.extra_of_start,
                                            $$el = $event.target,
                                            $$c = $$el.checked ? true : false
                                          if (Array.isArray($$a)) {
                                            var $$v = null,
                                              $$i = _vm._i($$a, $$v)
                                            if ($$el.checked) {
                                              $$i < 0 &&
                                                _vm.$set(
                                                  service,
                                                  "extra_of_start",
                                                  $$a.concat([$$v])
                                                )
                                            } else {
                                              $$i > -1 &&
                                                _vm.$set(
                                                  service,
                                                  "extra_of_start",
                                                  $$a
                                                    .slice(0, $$i)
                                                    .concat($$a.slice($$i + 1))
                                                )
                                            }
                                          } else {
                                            _vm.$set(
                                              service,
                                              "extra_of_start",
                                              $$c
                                            )
                                          }
                                        },
                                      },
                                    }),
                                  ]
                                )
                              : _vm._e(),
                          ]
                        )
                      }),
                      0
                    ),
                    _vm._v(" "),
                    _c("div", { staticClass: "credits-distribution" }, [
                      _c("label", { staticClass: "field-label" }, [
                        _vm._v("Credit Distribution monthly"),
                      ]),
                      _vm._v(" "),
                      _c("div", { staticClass: "radio-group" }, [
                        _c("label", { staticClass: "radio-label" }, [
                          _c("input", {
                            directives: [
                              {
                                name: "model",
                                rawName: "v-model",
                                value: _vm.membershipForm.credit_distribution,
                                expression:
                                  "membershipForm.credit_distribution",
                              },
                            ],
                            attrs: {
                              type: "radio",
                              name: "credit_distribution",
                              value: "first_of_month",
                            },
                            domProps: {
                              checked: _vm._q(
                                _vm.membershipForm.credit_distribution,
                                "first_of_month"
                              ),
                            },
                            on: {
                              change: function ($event) {
                                return _vm.$set(
                                  _vm.membershipForm,
                                  "credit_distribution",
                                  "first_of_month"
                                )
                              },
                            },
                          }),
                          _vm._v(" "),
                          _c("span", { staticClass: "radio-text" }, [
                            _vm._v("Every 1st of the month"),
                          ]),
                        ]),
                        _vm._v(" "),
                        _c("label", { staticClass: "radio-label" }, [
                          _c("input", {
                            directives: [
                              {
                                name: "model",
                                rawName: "v-model",
                                value: _vm.membershipForm.credit_distribution,
                                expression:
                                  "membershipForm.credit_distribution",
                              },
                            ],
                            attrs: {
                              type: "radio",
                              name: "credit_distribution",
                              value: "from_assign_date",
                            },
                            domProps: {
                              checked: _vm._q(
                                _vm.membershipForm.credit_distribution,
                                "from_assign_date"
                              ),
                            },
                            on: {
                              change: function ($event) {
                                return _vm.$set(
                                  _vm.membershipForm,
                                  "credit_distribution",
                                  "from_assign_date"
                                )
                              },
                            },
                          }),
                          _vm._v(" "),
                          _c("span", { staticClass: "radio-text" }, [
                            _vm._v("Based on membership assign date"),
                          ]),
                        ]),
                      ]),
                    ]),
                  ]),
                ]),
                _vm._v(" "),
                _c("div", { staticClass: "form-section-card" }, [
                  _c("h3", { staticClass: "section-title" }, [
                    _vm._v(
                      "\n            \n              Digital Services\n            "
                    ),
                  ]),
                  _vm._v(" "),
                  _c("div", { staticClass: "form-fields" }, [
                    _c("div", { staticClass: "form-field" }, [
                      _c("label", { staticClass: "checkbox-label" }, [
                        _c("input", {
                          directives: [
                            {
                              name: "model",
                              rawName: "v-model",
                              value: _vm.membershipForm.enable_pro,
                              expression: "membershipForm.enable_pro",
                            },
                          ],
                          staticClass: "checkbox-input",
                          attrs: { type: "checkbox" },
                          domProps: {
                            checked: Array.isArray(
                              _vm.membershipForm.enable_pro
                            )
                              ? _vm._i(_vm.membershipForm.enable_pro, null) > -1
                              : _vm.membershipForm.enable_pro,
                          },
                          on: {
                            change: function ($event) {
                              var $$a = _vm.membershipForm.enable_pro,
                                $$el = $event.target,
                                $$c = $$el.checked ? true : false
                              if (Array.isArray($$a)) {
                                var $$v = null,
                                  $$i = _vm._i($$a, $$v)
                                if ($$el.checked) {
                                  $$i < 0 &&
                                    _vm.$set(
                                      _vm.membershipForm,
                                      "enable_pro",
                                      $$a.concat([$$v])
                                    )
                                } else {
                                  $$i > -1 &&
                                    _vm.$set(
                                      _vm.membershipForm,
                                      "enable_pro",
                                      $$a
                                        .slice(0, $$i)
                                        .concat($$a.slice($$i + 1))
                                    )
                                }
                              } else {
                                _vm.$set(_vm.membershipForm, "enable_pro", $$c)
                              }
                            },
                          },
                        }),
                        _vm._v(" "),
                        _c("span", { staticClass: "checkbox-text" }, [
                          _vm._v("Enable PRO?"),
                        ]),
                        _vm._v(" "),
                        _c("i", {
                          staticClass: "fas fa-info-circle info-icon",
                          attrs: { title: "Enable PRO features" },
                        }),
                      ]),
                    ]),
                    _vm._v(" "),
                    _c("div", { staticClass: "form-field" }, [
                      _c("label", { staticClass: "checkbox-label" }, [
                        _c("input", {
                          directives: [
                            {
                              name: "model",
                              rawName: "v-model",
                              value: _vm.membershipForm.early_booking_access,
                              expression: "membershipForm.early_booking_access",
                            },
                          ],
                          staticClass: "checkbox-input",
                          attrs: { type: "checkbox" },
                          domProps: {
                            checked: Array.isArray(
                              _vm.membershipForm.early_booking_access
                            )
                              ? _vm._i(
                                  _vm.membershipForm.early_booking_access,
                                  null
                                ) > -1
                              : _vm.membershipForm.early_booking_access,
                          },
                          on: {
                            change: function ($event) {
                              var $$a = _vm.membershipForm.early_booking_access,
                                $$el = $event.target,
                                $$c = $$el.checked ? true : false
                              if (Array.isArray($$a)) {
                                var $$v = null,
                                  $$i = _vm._i($$a, $$v)
                                if ($$el.checked) {
                                  $$i < 0 &&
                                    _vm.$set(
                                      _vm.membershipForm,
                                      "early_booking_access",
                                      $$a.concat([$$v])
                                    )
                                } else {
                                  $$i > -1 &&
                                    _vm.$set(
                                      _vm.membershipForm,
                                      "early_booking_access",
                                      $$a
                                        .slice(0, $$i)
                                        .concat($$a.slice($$i + 1))
                                    )
                                }
                              } else {
                                _vm.$set(
                                  _vm.membershipForm,
                                  "early_booking_access",
                                  $$c
                                )
                              }
                            },
                          },
                        }),
                        _vm._v(" "),
                        _c("span", { staticClass: "checkbox-text" }, [
                          _vm._v("Early booking access"),
                        ]),
                        _vm._v(" "),
                        _c("i", {
                          staticClass: "fas fa-info-circle info-icon",
                          attrs: { title: "Allow early booking access" },
                        }),
                      ]),
                    ]),
                  ]),
                ]),
              ]),
              _vm._v(" "),
              _c("div", { staticClass: "form-actions" }, [
                _c(
                  "button",
                  {
                    staticClass: "btn-cancel",
                    attrs: { type: "button" },
                    on: {
                      click: function ($event) {
                        return _vm.$router.push("/app/Settings/system_settings")
                      },
                    },
                  },
                  [_vm._v("\n            Cancel\n          ")]
                ),
                _vm._v(" "),
                _c(
                  "button",
                  {
                    staticClass: "btn-submit",
                    attrs: { type: "submit", disabled: _vm.formProcessing },
                  },
                  [
                    _vm.formProcessing
                      ? _c("span", {
                          staticClass: "spinner-border spinner-border-sm me-2",
                          attrs: { role: "status" },
                        })
                      : _vm._e(),
                    _vm._v(
                      "\n            " +
                        _vm._s(_vm.isEditMode ? "Update" : "Finish") +
                        "\n          "
                    ),
                  ]
                ),
              ]),
            ]
          ),
        ]),
      ],
      1
    ),
  ])
}
var staticRenderFns = []
render._withStripped = true



/***/ })

}]);