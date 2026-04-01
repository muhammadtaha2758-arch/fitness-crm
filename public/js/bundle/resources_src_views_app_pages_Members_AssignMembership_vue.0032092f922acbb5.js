"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["resources_src_views_app_pages_Members_AssignMembership_vue"],{

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/Members/AssignMembership.vue?vue&type=script&lang=js":
/*!************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/Members/AssignMembership.vue?vue&type=script&lang=js ***!
  \************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var vue_cookies__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue-cookies */ "./node_modules/vue-cookies/vue-cookies.js");
/* harmony import */ var vue_cookies__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(vue_cookies__WEBPACK_IMPORTED_MODULE_0__);
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
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


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  name: 'AssignMembership',
  data: function data() {
    return {
      selectedUser: {
        name: 'Kelly Barnes',
        image: null,
        id: null
      },
      form: {
        soldBy: null,
        membershipType: null,
        startDate: new Date().toISOString().split('T')[0],
        paymentMethod: null,
        notes: null
      },
      soldByOptions: [{
        value: null,
        text: 'Select coach',
        disabled: true
      }],
      membershipTypeOptions: [{
        value: null,
        text: 'Select membership',
        disabled: true
      }],
      paymentMethodOptions: [{
        value: null,
        text: 'Select payment method',
        disabled: true
      }, {
        value: 'Cash',
        text: 'Cash'
      }, {
        value: 'Bank Transfer',
        text: 'Bank Transfer'
      }, {
        value: 'Credit Card',
        text: 'Credit Card'
      }, {
        value: 'Card Terminal',
        text: 'Card Terminal'
      }, {
        value: 'Check',
        text: 'Check'
      }, {
        value: 'PayPal',
        text: 'PayPal'
      }],
      plans: [],
      selectedPlan: null,
      calculations: {
        subtotal: 0.00,
        discount: 0.00,
        tax: 0.00,
        total: 0.00
      },
      loading: {
        coaches: false,
        memberships: false,
        assigning: false
      },
      showNoteModal: false,
      tempNote: '',
      showEditModal: false,
      editingField: null,
      tempEditValue: 0,
      taxRate: 0.10 // 10% tax rate - you can make this configurable
    };
  },
  computed: {
    minStartDate: function minStartDate() {
      return new Date().toISOString().split('T')[0];
    },
    isFormValid: function isFormValid() {
      return this.form.membershipType && this.form.soldBy && this.form.startDate && this.form.paymentMethod;
    },
    editingFieldLabel: function editingFieldLabel() {
      if (!this.editingField) return '';
      var labels = {
        subtotal: 'Subtotal',
        discount: 'Discount',
        tax: 'Tax'
      };
      return labels[this.editingField] || this.editingField;
    }
  },
  created: function created() {
    // Get selected member data from route params or query
    this.loadSelectedMember();
    // Check authentication status
    this.checkAuthStatus();
    // Fetch coaches and membership types from backend
    this.fetchCoaches();
    this.fetchMembershipTypes();
  },
  methods: {
    loadSelectedMember: function loadSelectedMember() {
      // Check if member data was passed via route query
      if (this.$route.query.member) {
        try {
          this.selectedUser = JSON.parse(this.$route.query.member);
        } catch (error) {
          console.error('Error parsing member data:', error);
          this.selectedUser = {
            name: 'Unknown Member',
            image: null,
            id: null
          };
        }
      } else if (this.$store.state.selectedMember) {
        // Check if member is stored in Vuex store
        this.selectedUser = _objectSpread({}, this.$store.state.selectedMember);
      }
    },
    goBack: function goBack() {
      this.$router.go(-1);
    },
    // Check authentication status
    checkAuthStatus: function checkAuthStatus() {
      var token = vue_cookies__WEBPACK_IMPORTED_MODULE_0___default().get("Stocky_token");
      console.log('Authentication token:', token ? 'Present' : 'Missing');
      if (!token) {
        console.warn('No authentication token found. User may not be logged in.');
        // Note: User needs to be logged in to access coach data
      }
    },
    onMembershipTypeChange: function onMembershipTypeChange() {
      var _this = this;
      if (this.form.membershipType) {
        this.selectedPlan = this.plans.find(function (p) {
          return p.id === _this.form.membershipType;
        });
        if (this.selectedPlan) {
          this.calculations.subtotal = parseFloat(this.selectedPlan.price);
          this.calculateTotal();
        }
      } else {
        this.selectedPlan = null;
        this.resetCalculations();
      }
    },
    calculateTotal: function calculateTotal() {
      var subtotal = this.calculations.subtotal;
      var discount = this.calculations.discount;
      var afterDiscount = subtotal - discount;
      this.calculations.tax = afterDiscount * this.taxRate;
      this.calculations.total = afterDiscount + this.calculations.tax;
    },
    resetCalculations: function resetCalculations() {
      this.calculations = {
        subtotal: 0.00,
        discount: 0.00,
        tax: 0.00,
        total: 0.00
      };
    },
    editField: function editField(field) {
      this.editingField = field;
      this.tempEditValue = this.calculations[field];
      this.showEditModal = true;
    },
    saveEditedField: function saveEditedField() {
      if (this.editingField === 'subtotal' || this.editingField === 'discount' || this.editingField === 'tax') {
        this.calculations[this.editingField] = parseFloat(this.tempEditValue) || 0;
        this.calculateTotal();
      }
      this.showEditModal = false;
      this.editingField = null;
      this.tempEditValue = 0;
    },
    cancelEdit: function cancelEdit() {
      this.showEditModal = false;
      this.editingField = null;
      this.tempEditValue = 0;
    },
    saveNote: function saveNote() {
      this.form.notes = this.tempNote;
      this.showNoteModal = false;
    },
    cancelNote: function cancelNote() {
      this.tempNote = this.form.notes || '';
      this.showNoteModal = false;
    },
    // Fetch coaches from backend
    fetchCoaches: function fetchCoaches() {
      var _this2 = this;
      return _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
        var allCoaches, success, testResponse, simpleResponse, url1, response1, url2, response2, url3, response3;
        return _regeneratorRuntime().wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              _this2.loading.coaches = true;
              allCoaches = [];
              success = false;
              console.log('Fetching coaches from API...');
              console.log('Current axios base URL:', axios.defaults.baseURL);
              console.log('Current axios headers:', axios.defaults.headers);

              // Test basic API connectivity first
              _context.prev = 6;
              console.log('Testing basic API connectivity...');
              _context.next = 10;
              return axios.get('test-coaches');
            case 10:
              testResponse = _context.sent;
              console.log('Test API response:', testResponse);
              console.log('Test API response data:', testResponse.data);
              console.log('Test API response status:', testResponse.status);

              // Check if there are coaches in the response
              if (testResponse.data && testResponse.data.clients) {
                console.log('Test API found coaches:', testResponse.data.clients.length);
                console.log('Test API coaches:', testResponse.data.clients);
              } else {
                console.log('Test API response structure:', Object.keys(testResponse.data || {}));
              }
              _context.next = 22;
              break;
            case 17:
              _context.prev = 17;
              _context.t0 = _context["catch"](6);
              console.log('Test API failed:', _context.t0.message);
              console.log('Test API error details:', _context.t0.response);
              if (_context.t0.response) {
                console.log('Test API error status:', _context.t0.response.status);
                console.log('Test API error data:', _context.t0.response.data);
              }
            case 22:
              _context.prev = 22;
              console.log('Testing simple coaches call without parameters...');
              _context.next = 26;
              return axios.get('test-coaches');
            case 26:
              simpleResponse = _context.sent;
              console.log('Simple coaches response:', simpleResponse.data);
              if (simpleResponse.data && simpleResponse.data.clients) {
                console.log('Simple call found coaches:', simpleResponse.data.clients.length);
                if (simpleResponse.data.clients.length > 0) {
                  console.log('First coach example:', simpleResponse.data.clients[0]);
                  // Use the coaches from the simple call
                  allCoaches = simpleResponse.data.clients;
                  success = true;
                  console.log('Using coaches from simple call');
                }
              }
              _context.next = 34;
              break;
            case 31:
              _context.prev = 31;
              _context.t1 = _context["catch"](22);
              console.log('Simple coaches call failed:', _context.t1.message);
            case 34:
              if (success) {
                _context.next = 85;
                break;
              }
              _context.prev = 35;
              url1 = "test-coaches?page=1&limit=all&name=&code=&mobile_phone=&email=&specialization=&SortField=id&SortType=desc";
              console.log('Trying Approach 1 with URL:', url1);
              _context.next = 40;
              return axios.get(url1);
            case 40:
              response1 = _context.sent;
              console.log('Approach 1 response:', response1);
              allCoaches = response1.data.clients || [];
              success = true;
              console.log("Approach 1 success - coaches found:", allCoaches.length);
              _context.next = 51;
              break;
            case 47:
              _context.prev = 47;
              _context.t2 = _context["catch"](35);
              console.log("Approach 1 failed:", _context.t2.message);
              console.log("Approach 1 error details:", _context.t2.response);
            case 51:
              if (success) {
                _context.next = 68;
                break;
              }
              _context.prev = 52;
              url2 = "test-coaches?page=1&limit=9999&name=&code=&mobile_phone=&email=&specialization=&SortField=id&SortType=desc";
              console.log('Trying Approach 2 with URL:', url2);
              _context.next = 57;
              return axios.get(url2);
            case 57:
              response2 = _context.sent;
              console.log('Approach 2 response:', response2);
              allCoaches = response2.data.clients || [];
              success = true;
              console.log("Approach 2 success - coaches found:", allCoaches.length);
              _context.next = 68;
              break;
            case 64:
              _context.prev = 64;
              _context.t3 = _context["catch"](52);
              console.log("Approach 2 failed:", _context.t3.message);
              console.log("Approach 2 error details:", _context.t3.response);
            case 68:
              if (success) {
                _context.next = 85;
                break;
              }
              _context.prev = 69;
              url3 = "test-coaches?page=1&name=&code=&mobile_phone=&email=&specialization=&SortField=id&SortType=desc";
              console.log('Trying Approach 3 with URL:', url3);
              _context.next = 74;
              return axios.get(url3);
            case 74:
              response3 = _context.sent;
              console.log('Approach 3 response:', response3);
              allCoaches = response3.data.clients || [];
              success = true;
              console.log("Approach 3 success - coaches found:", allCoaches.length);
              _context.next = 85;
              break;
            case 81:
              _context.prev = 81;
              _context.t4 = _context["catch"](69);
              console.log("Approach 3 failed:", _context.t4.message);
              console.log("Approach 3 error details:", _context.t4.response);
            case 85:
              if (success && allCoaches.length > 0) {
                _this2.soldByOptions = [{
                  value: null,
                  text: 'Select coach',
                  disabled: true
                }].concat(_toConsumableArray(allCoaches.map(function (coach) {
                  return {
                    value: coach.id,
                    text: coach.name
                  };
                })));
                console.log('Updated soldByOptions:', _this2.soldByOptions);
              } else {
                console.log('No coaches found with any approach');
                console.warn('No coaches available. Please add coaches first.');

                // Add test coaches for debugging
                _this2.soldByOptions = [{
                  value: null,
                  text: 'Select coach',
                  disabled: true
                }, {
                  value: 'test-1',
                  text: 'Test Coach 1'
                }, {
                  value: 'test-2',
                  text: 'Test Coach 2'
                }];
                console.log('Using test coaches for debugging:', _this2.soldByOptions);
              }
              _this2.loading.coaches = false;
            case 87:
            case "end":
              return _context.stop();
          }
        }, _callee, null, [[6, 17], [22, 31], [35, 47], [52, 64], [69, 81]]);
      }))();
    },
    // Fetch membership types from backend
    fetchMembershipTypes: function fetchMembershipTypes() {
      var _this3 = this;
      return _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee2() {
        var response;
        return _regeneratorRuntime().wrap(function _callee2$(_context2) {
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
              _this3.loading.memberships = true;
              _context2.prev = 1;
              console.log('Fetching membership types from API...');
              _context2.next = 5;
              return axios.get('plans');
            case 5:
              response = _context2.sent;
              console.log('Plans API response:', response.data);
              if (response.data && response.data.success && response.data.data) {
                _this3.plans = response.data.data.filter(function (plan) {
                  return plan.is_active;
                });
                _this3.membershipTypeOptions = [{
                  value: null,
                  text: 'Select membership',
                  disabled: true
                }].concat(_toConsumableArray(_this3.plans.map(function (plan) {
                  return {
                    value: plan.id,
                    text: "".concat(plan.name, " - $").concat(plan.price, "/").concat(plan.interval)
                  };
                })));
                console.log('Updated membershipTypeOptions:', _this3.membershipTypeOptions);
              } else {
                console.log('No membership types found in response');
                console.warn('No membership types available');
              }
              _context2.next = 14;
              break;
            case 10:
              _context2.prev = 10;
              _context2.t0 = _context2["catch"](1);
              console.error('Error fetching membership types:', _context2.t0);
              _this3.$swal({
                icon: 'error',
                title: 'Error!',
                text: 'Failed to load membership types',
                timer: 3000,
                showConfirmButton: false
              });
            case 14:
              _context2.prev = 14;
              _this3.loading.memberships = false;
              return _context2.finish(14);
            case 17:
            case "end":
              return _context2.stop();
          }
        }, _callee2, null, [[1, 10, 14, 17]]);
      }))();
    },
    assignMembership: function assignMembership() {
      var _this4 = this;
      return _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee3() {
        var assignmentData, response, errorMessage;
        return _regeneratorRuntime().wrap(function _callee3$(_context3) {
          while (1) switch (_context3.prev = _context3.next) {
            case 0:
              if (_this4.isFormValid) {
                _context3.next = 3;
                break;
              }
              _this4.$swal({
                icon: 'warning',
                title: 'Validation Error!',
                text: 'Please fill in all required fields',
                timer: 3000,
                showConfirmButton: false
              });
              return _context3.abrupt("return");
            case 3:
              if (_this4.selectedUser.id) {
                _context3.next = 6;
                break;
              }
              _this4.$swal({
                icon: 'warning',
                title: 'Validation Error!',
                text: 'No member selected',
                timer: 3000,
                showConfirmButton: false
              });
              return _context3.abrupt("return");
            case 6:
              _this4.loading.assigning = true;
              _context3.prev = 7;
              assignmentData = {
                member_id: _this4.selectedUser.id,
                coach_id: _this4.form.soldBy,
                plan_id: _this4.form.membershipType,
                start_date: _this4.form.startDate,
                payment_method: _this4.form.paymentMethod,
                package_name: _this4.selectedPlan.name,
                package_details: JSON.stringify(_this4.selectedPlan.features || []),
                subtotal: _this4.calculations.subtotal,
                discount: _this4.calculations.discount,
                tax: _this4.calculations.tax,
                total: _this4.calculations.total,
                notes: _this4.form.notes
              };
              _context3.next = 11;
              return axios.post("members/".concat(_this4.selectedUser.id, "/assign-membership"), assignmentData);
            case 11:
              response = _context3.sent;
              if (response.data.success) {
                _this4.$swal({
                  icon: 'success',
                  title: 'Success!',
                  text: 'Membership assigned successfully!',
                  timer: 2000,
                  showConfirmButton: false
                });
                setTimeout(function () {
                  _this4.$router.go(-1);
                }, 2000);
              } else {
                _this4.$swal({
                  icon: 'error',
                  title: 'Error!',
                  text: response.data.message || 'Failed to assign membership',
                  timer: 3000,
                  showConfirmButton: false
                });
              }
              _context3.next = 20;
              break;
            case 15:
              _context3.prev = 15;
              _context3.t0 = _context3["catch"](7);
              errorMessage = 'Failed to assign membership. Please try again.';
              if (_context3.t0.response && _context3.t0.response.data && _context3.t0.response.data.message) {
                errorMessage = _context3.t0.response.data.message;
              }
              _this4.$swal({
                icon: 'error',
                title: 'Error!',
                text: errorMessage,
                timer: 3000,
                showConfirmButton: false
              });
            case 20:
              _context3.prev = 20;
              _this4.loading.assigning = false;
              return _context3.finish(20);
            case 23:
            case "end":
              return _context3.stop();
          }
        }, _callee3, null, [[7, 15, 20, 23]]);
      }))();
    }
  }
});

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js??clonedRuleSet-12.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12.use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-12.use[3]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/Members/AssignMembership.vue?vue&type=style&index=0&id=ce6d2210&lang=scss&scoped=true":
/*!***************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??clonedRuleSet-12.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12.use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-12.use[3]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/Members/AssignMembership.vue?vue&type=style&index=0&id=ce6d2210&lang=scss&scoped=true ***!
  \***************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
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
___CSS_LOADER_EXPORT___.push([module.id, ".assign-membership-page[data-v-ce6d2210] {\n  min-height: 100vh;\n  background-color: #f8f9fa;\n  padding: 2rem;\n}\n.page-header[data-v-ce6d2210] {\n  display: flex;\n  align-items: center;\n  margin-bottom: 2rem;\n}\n.page-header .back-button[data-v-ce6d2210] {\n  background: none;\n  border: none;\n  font-size: 1.2rem;\n  color: #6c757d;\n  margin-right: 1rem;\n  padding: 0.5rem;\n  border-radius: 50%;\n  transition: all 0.2s ease;\n}\n.page-header .back-button[data-v-ce6d2210]:hover {\n  background-color: #e9ecef;\n  color: #495057;\n}\n.page-header .page-title[data-v-ce6d2210] {\n  font-size: 1.8rem;\n  font-weight: 700;\n  color: #212529;\n  margin: 0;\n}\n.main-content[data-v-ce6d2210] {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 2rem;\n  max-width: 1200px;\n  margin: 0 auto;\n}\n.card[data-v-ce6d2210] {\n  background: white;\n  border-radius: 15px;\n  border: none;\n  padding: 20px;\n}\n.card .card-body[data-v-ce6d2210] {\n  padding: 20px;\n}\n.card .card-title[data-v-ce6d2210] {\n  font-size: 1.25rem;\n  font-weight: 700;\n  color: #212529;\n  margin-bottom: 1.5rem;\n}\n.assign-card .form-group[data-v-ce6d2210] {\n  margin-bottom: 1.5rem;\n}\n.assign-card .form-group .form-label[data-v-ce6d2210] {\n  font-weight: 600;\n  color: #495057;\n  margin-bottom: 0.75rem;\n  display: block;\n}\n.assign-card .form-group .user-display[data-v-ce6d2210] {\n  display: flex;\n  align-items: center;\n  padding: 0.75rem 1rem;\n  background-color: #f8f9fa;\n  border: 1px solid #dee2e6;\n  border-radius: 8px;\n}\n.assign-card .form-group .user-display .user-avatar[data-v-ce6d2210] {\n  width: 40px;\n  height: 40px;\n  background-color: #6c757d;\n  border-radius: 50%;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  margin-right: 0.75rem;\n  overflow: hidden;\n}\n.assign-card .form-group .user-display .user-avatar i[data-v-ce6d2210] {\n  color: white;\n  font-size: 1.1rem;\n}\n.assign-card .form-group .user-display .user-avatar .avatar-image[data-v-ce6d2210] {\n  width: 100%;\n  height: 100%;\n  -o-object-fit: cover;\n     object-fit: cover;\n  border-radius: 50%;\n}\n.assign-card .form-group .user-display .user-name[data-v-ce6d2210] {\n  font-weight: 500;\n  color: #212529;\n}\n.assign-card .form-group .form-select[data-v-ce6d2210], .assign-card .form-group .form-control[data-v-ce6d2210] {\n  border: 1px solid #ced4da;\n  border-radius: 8px;\n  font-size: 1rem;\n}\n.assign-card .form-group .form-select[data-v-ce6d2210]:focus, .assign-card .form-group .form-control[data-v-ce6d2210]:focus {\n  border-color: #ff4040;\n  box-shadow: 0 0 0 0.2rem rgba(255, 64, 64, 0.25);\n}\n.assign-card .form-group .note-button[data-v-ce6d2210] {\n  width: 100%;\n  text-align: left;\n}\n.assign-card .form-group .note-preview[data-v-ce6d2210] {\n  display: block;\n  margin-top: 0.5rem;\n  font-size: 0.875rem;\n  color: #6c757d;\n  font-style: italic;\n}\n.assign-card .package-details-section[data-v-ce6d2210] {\n  margin-top: 1.5rem;\n  padding: 1rem;\n  background-color: #f8f9fa;\n  border-radius: 8px;\n  border: 1px solid #dee2e6;\n}\n.assign-card .package-details-section .section-title[data-v-ce6d2210] {\n  font-size: 1rem;\n  font-weight: 600;\n  color: #495057;\n  margin-bottom: 1rem;\n}\n.assign-card .package-details-section .package-info .package-item[data-v-ce6d2210] {\n  margin-bottom: 0.75rem;\n}\n.assign-card .package-details-section .package-info .package-item .package-label[data-v-ce6d2210] {\n  font-weight: 600;\n  color: #6c757d;\n  margin-right: 0.5rem;\n}\n.assign-card .package-details-section .package-info .package-item .package-value[data-v-ce6d2210] {\n  color: #212529;\n}\n.assign-card .package-details-section .package-info .package-item .features-list[data-v-ce6d2210] {\n  margin: 0.5rem 0 0 1.5rem;\n  padding: 0;\n}\n.assign-card .package-details-section .package-info .package-item .features-list li[data-v-ce6d2210] {\n  margin-bottom: 0.25rem;\n  color: #495057;\n}\n.invoice-card .invoice-note[data-v-ce6d2210] {\n  font-size: 0.875rem;\n  color: #6c757d;\n  margin-bottom: 1.5rem;\n  line-height: 1.4;\n}\n.invoice-card .calculations-section[data-v-ce6d2210] {\n  margin-bottom: 2rem;\n}\n.invoice-card .calculations-section .calculation-item[data-v-ce6d2210] {\n  padding: 1rem 0;\n  border-bottom: 1px solid #e9ecef;\n}\n.invoice-card .calculations-section .calculation-item.total-item[data-v-ce6d2210] {\n  border-top: 2px solid #dee2e6;\n  border-bottom: none;\n  margin-top: 0.5rem;\n  padding-top: 1rem;\n}\n.invoice-card .calculations-section .calculation-item .calculation-row[data-v-ce6d2210] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n}\n.invoice-card .calculations-section .calculation-item .calculation-row .calculation-label[data-v-ce6d2210] {\n  font-weight: 500;\n  color: #495057;\n}\n.invoice-card .calculations-section .calculation-item .calculation-row .calculation-value-group[data-v-ce6d2210] {\n  display: flex;\n  align-items: center;\n  gap: 0.5rem;\n}\n.invoice-card .calculations-section .calculation-item .calculation-row .calculation-value-group .calculation-amount[data-v-ce6d2210] {\n  font-weight: 600;\n  color: #212529;\n  min-width: 80px;\n  text-align: right;\n}\n.invoice-card .calculations-section .calculation-item .calculation-row .calculation-value-group .edit-icon-btn[data-v-ce6d2210] {\n  background: none;\n  border: none;\n  color: #6c757d;\n  cursor: pointer;\n  padding: 0.25rem 0.5rem;\n  border-radius: 4px;\n  transition: all 0.2s ease;\n}\n.invoice-card .calculations-section .calculation-item .calculation-row .calculation-value-group .edit-icon-btn[data-v-ce6d2210]:hover {\n  background-color: #e9ecef;\n  color: #495057;\n}\n.invoice-card .calculations-section .calculation-item .calculation-row .total-amount[data-v-ce6d2210] {\n  font-weight: 700;\n  font-size: 1.2rem;\n  color: #ff4040;\n}\n.invoice-card .assign-button[data-v-ce6d2210] {\n  width: 100%;\n  padding: 1rem 2rem;\n  background-color: #ff4040;\n  color: white;\n  border: none;\n  border-radius: 8px;\n  font-size: 1rem;\n  font-weight: 600;\n  cursor: pointer;\n  transition: all 0.2s ease;\n}\n.invoice-card .assign-button[data-v-ce6d2210]:hover:not(.disabled) {\n  background-color: #e63939;\n  transform: translateY(-1px);\n}\n.invoice-card .assign-button.disabled[data-v-ce6d2210] {\n  background-color: #e9ecef;\n  color: #6c757d;\n  cursor: not-allowed;\n}\n@media (max-width: 768px) {\n.main-content[data-v-ce6d2210] {\n    grid-template-columns: 1fr;\n    gap: 1.5rem;\n}\n.assign-membership-page[data-v-ce6d2210] {\n    padding: 1rem;\n}\n.card .card-body[data-v-ce6d2210] {\n    padding: 1.5rem;\n}\n}\n@media (max-width: 576px) {\n.page-header .page-title[data-v-ce6d2210] {\n    font-size: 1.5rem;\n}\n.card .card-body[data-v-ce6d2210] {\n    padding: 1rem;\n}\n}", ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-12.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12.use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-12.use[3]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/Members/AssignMembership.vue?vue&type=style&index=0&id=ce6d2210&lang=scss&scoped=true":
/*!*******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-12.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12.use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-12.use[3]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/Members/AssignMembership.vue?vue&type=style&index=0&id=ce6d2210&lang=scss&scoped=true ***!
  \*******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../../../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_clonedRuleSet_12_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_12_use_2_node_modules_sass_loader_dist_cjs_js_clonedRuleSet_12_use_3_node_modules_vue_loader_lib_index_js_vue_loader_options_AssignMembership_vue_vue_type_style_index_0_id_ce6d2210_lang_scss_scoped_true__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !!../../../../../../node_modules/css-loader/dist/cjs.js??clonedRuleSet-12.use[1]!../../../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12.use[2]!../../../../../../node_modules/sass-loader/dist/cjs.js??clonedRuleSet-12.use[3]!../../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./AssignMembership.vue?vue&type=style&index=0&id=ce6d2210&lang=scss&scoped=true */ "./node_modules/css-loader/dist/cjs.js??clonedRuleSet-12.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12.use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-12.use[3]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/Members/AssignMembership.vue?vue&type=style&index=0&id=ce6d2210&lang=scss&scoped=true");

            

var options = {};

options.insert = "head";
options.singleton = false;

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_clonedRuleSet_12_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_12_use_2_node_modules_sass_loader_dist_cjs_js_clonedRuleSet_12_use_3_node_modules_vue_loader_lib_index_js_vue_loader_options_AssignMembership_vue_vue_type_style_index_0_id_ce6d2210_lang_scss_scoped_true__WEBPACK_IMPORTED_MODULE_1__["default"], options);



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_clonedRuleSet_12_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_12_use_2_node_modules_sass_loader_dist_cjs_js_clonedRuleSet_12_use_3_node_modules_vue_loader_lib_index_js_vue_loader_options_AssignMembership_vue_vue_type_style_index_0_id_ce6d2210_lang_scss_scoped_true__WEBPACK_IMPORTED_MODULE_1__["default"].locals || {});

/***/ }),

/***/ "./resources/src/views/app/pages/Members/AssignMembership.vue":
/*!********************************************************************!*\
  !*** ./resources/src/views/app/pages/Members/AssignMembership.vue ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _AssignMembership_vue_vue_type_template_id_ce6d2210_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./AssignMembership.vue?vue&type=template&id=ce6d2210&scoped=true */ "./resources/src/views/app/pages/Members/AssignMembership.vue?vue&type=template&id=ce6d2210&scoped=true");
/* harmony import */ var _AssignMembership_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./AssignMembership.vue?vue&type=script&lang=js */ "./resources/src/views/app/pages/Members/AssignMembership.vue?vue&type=script&lang=js");
/* harmony import */ var _AssignMembership_vue_vue_type_style_index_0_id_ce6d2210_lang_scss_scoped_true__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./AssignMembership.vue?vue&type=style&index=0&id=ce6d2210&lang=scss&scoped=true */ "./resources/src/views/app/pages/Members/AssignMembership.vue?vue&type=style&index=0&id=ce6d2210&lang=scss&scoped=true");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");



;


/* normalize component */

var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _AssignMembership_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__["default"],
  _AssignMembership_vue_vue_type_template_id_ce6d2210_scoped_true__WEBPACK_IMPORTED_MODULE_0__.render,
  _AssignMembership_vue_vue_type_template_id_ce6d2210_scoped_true__WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  "ce6d2210",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/src/views/app/pages/Members/AssignMembership.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./resources/src/views/app/pages/Members/AssignMembership.vue?vue&type=script&lang=js":
/*!********************************************************************************************!*\
  !*** ./resources/src/views/app/pages/Members/AssignMembership.vue?vue&type=script&lang=js ***!
  \********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_AssignMembership_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./AssignMembership.vue?vue&type=script&lang=js */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/Members/AssignMembership.vue?vue&type=script&lang=js");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_AssignMembership_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/src/views/app/pages/Members/AssignMembership.vue?vue&type=style&index=0&id=ce6d2210&lang=scss&scoped=true":
/*!*****************************************************************************************************************************!*\
  !*** ./resources/src/views/app/pages/Members/AssignMembership.vue?vue&type=style&index=0&id=ce6d2210&lang=scss&scoped=true ***!
  \*****************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_dist_cjs_js_node_modules_css_loader_dist_cjs_js_clonedRuleSet_12_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_12_use_2_node_modules_sass_loader_dist_cjs_js_clonedRuleSet_12_use_3_node_modules_vue_loader_lib_index_js_vue_loader_options_AssignMembership_vue_vue_type_style_index_0_id_ce6d2210_lang_scss_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/style-loader/dist/cjs.js!../../../../../../node_modules/css-loader/dist/cjs.js??clonedRuleSet-12.use[1]!../../../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12.use[2]!../../../../../../node_modules/sass-loader/dist/cjs.js??clonedRuleSet-12.use[3]!../../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./AssignMembership.vue?vue&type=style&index=0&id=ce6d2210&lang=scss&scoped=true */ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-12.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12.use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-12.use[3]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/Members/AssignMembership.vue?vue&type=style&index=0&id=ce6d2210&lang=scss&scoped=true");


/***/ }),

/***/ "./resources/src/views/app/pages/Members/AssignMembership.vue?vue&type=template&id=ce6d2210&scoped=true":
/*!**************************************************************************************************************!*\
  !*** ./resources/src/views/app/pages/Members/AssignMembership.vue?vue&type=template&id=ce6d2210&scoped=true ***!
  \**************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_AssignMembership_vue_vue_type_template_id_ce6d2210_scoped_true__WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   staticRenderFns: () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_AssignMembership_vue_vue_type_template_id_ce6d2210_scoped_true__WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_AssignMembership_vue_vue_type_template_id_ce6d2210_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./AssignMembership.vue?vue&type=template&id=ce6d2210&scoped=true */ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/Members/AssignMembership.vue?vue&type=template&id=ce6d2210&scoped=true");


/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/Members/AssignMembership.vue?vue&type=template&id=ce6d2210&scoped=true":
/*!*****************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/Members/AssignMembership.vue?vue&type=template&id=ce6d2210&scoped=true ***!
  \*****************************************************************************************************************************************************************************************************************************************************/
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
    { staticClass: "assign-membership-page" },
    [
      _c("div", { staticClass: "page-header" }, [
        _c(
          "button",
          { staticClass: "back-button", on: { click: _vm.goBack } },
          [_c("i", { staticClass: "fas fa-arrow-left" })]
        ),
        _vm._v(" "),
        _c("h1", { staticClass: "page-title" }, [_vm._v("Assign membership")]),
      ]),
      _vm._v(" "),
      _c("div", { staticClass: "main-content" }, [
        _c("div", { staticClass: "card assign-card" }, [
          _c("div", { staticClass: "card-body" }, [
            _c("h2", { staticClass: "card-title" }, [
              _vm._v("Assign membership"),
            ]),
            _vm._v(" "),
            _c("div", { staticClass: "form-group" }, [
              _c("label", { staticClass: "form-label" }, [_vm._v("Assign to")]),
              _vm._v(" "),
              _c("div", { staticClass: "user-display" }, [
                _c("div", { staticClass: "user-avatar" }, [
                  _vm.selectedUser.image
                    ? _c("img", {
                        staticClass: "avatar-image",
                        attrs: {
                          src: _vm.selectedUser.image,
                          alt: _vm.selectedUser.name,
                        },
                      })
                    : _c("i", { staticClass: "fas fa-user" }),
                ]),
                _vm._v(" "),
                _c("span", { staticClass: "user-name" }, [
                  _vm._v(_vm._s(_vm.selectedUser.name || "Select a member")),
                ]),
              ]),
            ]),
            _vm._v(" "),
            _c(
              "div",
              { staticClass: "form-group" },
              [
                _c("label", { staticClass: "form-label" }, [_vm._v("Sold by")]),
                _vm._v(" "),
                _c("b-form-select", {
                  staticClass: "form-select",
                  attrs: { options: _vm.soldByOptions },
                  model: {
                    value: _vm.form.soldBy,
                    callback: function ($$v) {
                      _vm.$set(_vm.form, "soldBy", $$v)
                    },
                    expression: "form.soldBy",
                  },
                }),
              ],
              1
            ),
            _vm._v(" "),
            _c(
              "div",
              { staticClass: "form-group" },
              [
                _c("label", { staticClass: "form-label" }, [
                  _vm._v("Membership type"),
                ]),
                _vm._v(" "),
                _c("b-form-select", {
                  staticClass: "form-select",
                  attrs: { options: _vm.membershipTypeOptions },
                  on: { change: _vm.onMembershipTypeChange },
                  model: {
                    value: _vm.form.membershipType,
                    callback: function ($$v) {
                      _vm.$set(_vm.form, "membershipType", $$v)
                    },
                    expression: "form.membershipType",
                  },
                }),
              ],
              1
            ),
            _vm._v(" "),
            _vm.selectedPlan
              ? _c("div", { staticClass: "package-details-section" }, [
                  _c("h3", { staticClass: "section-title" }, [
                    _vm._v("Package Details"),
                  ]),
                  _vm._v(" "),
                  _c("div", { staticClass: "package-info" }, [
                    _c("div", { staticClass: "package-item" }, [
                      _c("span", { staticClass: "package-label" }, [
                        _vm._v("Plan Name:"),
                      ]),
                      _vm._v(" "),
                      _c("span", { staticClass: "package-value" }, [
                        _vm._v(_vm._s(_vm.selectedPlan.name)),
                      ]),
                    ]),
                    _vm._v(" "),
                    _c("div", { staticClass: "package-item" }, [
                      _c("span", { staticClass: "package-label" }, [
                        _vm._v("Price:"),
                      ]),
                      _vm._v(" "),
                      _c("span", { staticClass: "package-value" }, [
                        _vm._v(
                          "$" +
                            _vm._s(_vm.selectedPlan.price) +
                            " / " +
                            _vm._s(_vm.selectedPlan.interval)
                        ),
                      ]),
                    ]),
                    _vm._v(" "),
                    _vm.selectedPlan.features &&
                    _vm.selectedPlan.features.length
                      ? _c("div", { staticClass: "package-item" }, [
                          _c("span", { staticClass: "package-label" }, [
                            _vm._v("Features:"),
                          ]),
                          _vm._v(" "),
                          _c(
                            "ul",
                            { staticClass: "features-list" },
                            _vm._l(
                              _vm.selectedPlan.features,
                              function (feature, index) {
                                return _c("li", { key: index }, [
                                  _vm._v(_vm._s(feature)),
                                ])
                              }
                            ),
                            0
                          ),
                        ])
                      : _vm._e(),
                  ]),
                ])
              : _vm._e(),
            _vm._v(" "),
            _vm.form.membershipType
              ? _c(
                  "div",
                  { staticClass: "form-group" },
                  [
                    _c("label", { staticClass: "form-label" }, [
                      _vm._v("Start Date"),
                    ]),
                    _vm._v(" "),
                    _c("b-form-input", {
                      staticClass: "form-control",
                      attrs: { type: "date", min: _vm.minStartDate },
                      model: {
                        value: _vm.form.startDate,
                        callback: function ($$v) {
                          _vm.$set(_vm.form, "startDate", $$v)
                        },
                        expression: "form.startDate",
                      },
                    }),
                  ],
                  1
                )
              : _vm._e(),
            _vm._v(" "),
            _vm.form.membershipType
              ? _c(
                  "div",
                  { staticClass: "form-group" },
                  [
                    _c("label", { staticClass: "form-label" }, [
                      _vm._v("Payment Method"),
                    ]),
                    _vm._v(" "),
                    _c("b-form-select", {
                      staticClass: "form-select",
                      attrs: { options: _vm.paymentMethodOptions },
                      model: {
                        value: _vm.form.paymentMethod,
                        callback: function ($$v) {
                          _vm.$set(_vm.form, "paymentMethod", $$v)
                        },
                        expression: "form.paymentMethod",
                      },
                    }),
                  ],
                  1
                )
              : _vm._e(),
            _vm._v(" "),
            _vm.form.membershipType
              ? _c("div", { staticClass: "form-group" }, [
                  _c(
                    "button",
                    {
                      staticClass:
                        "btn btn-sm btn-outline-secondary note-button",
                      on: {
                        click: function ($event) {
                          _vm.showNoteModal = true
                        },
                      },
                    },
                    [
                      _c("i", { staticClass: "fas fa-sticky-note mr-2" }),
                      _vm._v(
                        "\n                        Add Note\n                    "
                      ),
                    ]
                  ),
                  _vm._v(" "),
                  _vm.form.notes
                    ? _c("span", { staticClass: "note-preview" }, [
                        _vm._v(_vm._s(_vm.form.notes.substring(0, 50)) + "..."),
                      ])
                    : _vm._e(),
                ])
              : _vm._e(),
          ]),
        ]),
        _vm._v(" "),
        _c("div", { staticClass: "card invoice-card" }, [
          _c("div", { staticClass: "card-body" }, [
            _c("h2", { staticClass: "card-title" }, [
              _vm._v("Invoice Details"),
            ]),
            _vm._v(" "),
            _c("p", { staticClass: "invoice-note" }, [
              _vm._v(
                "\n                    All prices are including Sales tax where applicable\n                "
              ),
            ]),
            _vm._v(" "),
            _c("div", { staticClass: "calculations-section" }, [
              _c("div", { staticClass: "calculation-item" }, [
                _c("div", { staticClass: "calculation-row" }, [
                  _c("span", { staticClass: "calculation-label" }, [
                    _vm._v("Subtotal"),
                  ]),
                  _vm._v(" "),
                  _c("div", { staticClass: "calculation-value-group" }, [
                    _c("span", { staticClass: "calculation-amount" }, [
                      _vm._v(
                        "$" + _vm._s(_vm.calculations.subtotal.toFixed(2))
                      ),
                    ]),
                    _vm._v(" "),
                    _c(
                      "button",
                      {
                        staticClass: "edit-icon-btn",
                        attrs: { title: "Edit subtotal" },
                        on: {
                          click: function ($event) {
                            return _vm.editField("subtotal")
                          },
                        },
                      },
                      [_c("i", { staticClass: "fas fa-pencil-alt" })]
                    ),
                  ]),
                ]),
              ]),
              _vm._v(" "),
              _c("div", { staticClass: "calculation-item" }, [
                _c("div", { staticClass: "calculation-row" }, [
                  _c("span", { staticClass: "calculation-label" }, [
                    _vm._v("Discount"),
                  ]),
                  _vm._v(" "),
                  _c("div", { staticClass: "calculation-value-group" }, [
                    _c("span", { staticClass: "calculation-amount" }, [
                      _vm._v(
                        "$" + _vm._s(_vm.calculations.discount.toFixed(2))
                      ),
                    ]),
                    _vm._v(" "),
                    _c(
                      "button",
                      {
                        staticClass: "edit-icon-btn",
                        attrs: { title: "Edit discount" },
                        on: {
                          click: function ($event) {
                            return _vm.editField("discount")
                          },
                        },
                      },
                      [_c("i", { staticClass: "fas fa-pencil-alt" })]
                    ),
                  ]),
                ]),
              ]),
              _vm._v(" "),
              _c("div", { staticClass: "calculation-item" }, [
                _c("div", { staticClass: "calculation-row" }, [
                  _c("span", { staticClass: "calculation-label" }, [
                    _vm._v("Tax"),
                  ]),
                  _vm._v(" "),
                  _c("div", { staticClass: "calculation-value-group" }, [
                    _c("span", { staticClass: "calculation-amount" }, [
                      _vm._v("$" + _vm._s(_vm.calculations.tax.toFixed(2))),
                    ]),
                    _vm._v(" "),
                    _c(
                      "button",
                      {
                        staticClass: "edit-icon-btn",
                        attrs: { title: "Edit tax" },
                        on: {
                          click: function ($event) {
                            return _vm.editField("tax")
                          },
                        },
                      },
                      [_c("i", { staticClass: "fas fa-pencil-alt" })]
                    ),
                  ]),
                ]),
              ]),
              _vm._v(" "),
              _c("div", { staticClass: "calculation-item total-item" }, [
                _c("div", { staticClass: "calculation-row" }, [
                  _c("span", { staticClass: "calculation-label" }, [
                    _vm._v("Total"),
                  ]),
                  _vm._v(" "),
                  _c(
                    "span",
                    { staticClass: "calculation-amount total-amount" },
                    [_vm._v("$" + _vm._s(_vm.calculations.total.toFixed(2)))]
                  ),
                ]),
              ]),
            ]),
            _vm._v(" "),
            _c(
              "button",
              {
                staticClass: "assign-button",
                class: { disabled: !_vm.isFormValid || _vm.loading.assigning },
                attrs: { disabled: !_vm.isFormValid || _vm.loading.assigning },
                on: { click: _vm.assignMembership },
              },
              [
                _vm.loading.assigning
                  ? _c("span", [
                      _c("i", { staticClass: "fas fa-spinner fa-spin mr-2" }),
                      _vm._v(
                        "\n                        Assigning...\n                    "
                      ),
                    ])
                  : _c("span", [
                      _vm._v(
                        "\n                        Assign membership\n                    "
                      ),
                    ]),
              ]
            ),
          ]),
        ]),
      ]),
      _vm._v(" "),
      _c(
        "b-modal",
        {
          attrs: { title: "Add Note" },
          on: { ok: _vm.saveNote, cancel: _vm.cancelNote },
          model: {
            value: _vm.showNoteModal,
            callback: function ($$v) {
              _vm.showNoteModal = $$v
            },
            expression: "showNoteModal",
          },
        },
        [
          _c("b-form-textarea", {
            attrs: { rows: "4", placeholder: "Enter your note here..." },
            model: {
              value: _vm.tempNote,
              callback: function ($$v) {
                _vm.tempNote = $$v
              },
              expression: "tempNote",
            },
          }),
        ],
        1
      ),
      _vm._v(" "),
      _c(
        "b-modal",
        {
          attrs: { title: "Edit " + _vm.editingFieldLabel },
          on: { ok: _vm.saveEditedField, cancel: _vm.cancelEdit },
          model: {
            value: _vm.showEditModal,
            callback: function ($$v) {
              _vm.showEditModal = $$v
            },
            expression: "showEditModal",
          },
        },
        [
          _c(
            "b-form-group",
            { attrs: { label: "Enter " + _vm.editingFieldLabel + ":" } },
            [
              _c("b-form-input", {
                attrs: { type: "number", step: "0.01", min: "0" },
                model: {
                  value: _vm.tempEditValue,
                  callback: function ($$v) {
                    _vm.tempEditValue = $$v
                  },
                  expression: "tempEditValue",
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
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ })

}]);