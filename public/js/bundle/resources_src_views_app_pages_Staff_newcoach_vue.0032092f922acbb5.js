"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["resources_src_views_app_pages_Staff_newcoach_vue"],{

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/Staff/newcoach.vue?vue&type=script&lang=js":
/*!**************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/Staff/newcoach.vue?vue&type=script&lang=js ***!
  \**************************************************************************************************************************************************************************************************************/
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
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
  name: "CreateCoachForm",
  data: function data() {
    return {
      member: {
        ownEmployeeId: "",
        customExportField: "",
        firstName: "",
        lastName: "",
        mobile_phone: "",
        landline_phone: "",
        email: "",
        password: "",
        dob: "",
        birthdayDay: "",
        birthdayMonth: "",
        birthdayYear: "",
        address: "",
        gender: "",
        coachType: "",
        coachSince: "",
        subscriptionReason: "Unknown",
        language: "English",
        privileges: [],
        country: "United States",
        coachExperience: "",
        coachCertifications: "",
        height: "",
        weight: "",
        chest: "",
        bloodGroup: "",
        medical: "",
        emergencyName: "",
        emergencyPhone: "",
        emergencyRelation: "",
        address1: "",
        address2: "",
        city: "",
        state: "",
        zip: "",
        referredBy: "",
        lockerNumber: "",
        isTrial: false,
        trialStart: "",
        trialEnd: "",
        plan: null,
        paymentMethod: null,
        amount: "",
        payAmount: "",
        paymentStartDate: "",
        bankAccountName: "",
        bankAccountNumber: "",
        routingNumber: "",
        bankAccountType: "Checking",
        bankName: "",
        paymentNotes: "",
        bio: "",
        socialMedia: "",
        notes: "",
        weeklyAvailability: "",
        sessionDuration: "",
        maxClientsPerDay: "",
        specializations: [],
        yearsOfExperience: "",
        status: "",
        sendInvitation: true
      },
      photoUrl: null,
      showWebcam: false,
      showOwnEmployeeIdInfo: false,
      showCustomExportFieldInfo: false,
      isLoading: false,
      // Field validation errors
      fieldErrors: {},
      validationAttempted: false,
      months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
      availableYears: [],
      availablePrivileges: [{
        value: 'club_manager',
        label: 'Club Manager',
        description: 'Full access to manage club operations and settings'
      }, {
        value: 'assistant_manager',
        label: 'Assistant Manager',
        description: 'Assist with club management tasks and operations'
      }, {
        value: 'coach',
        label: 'Coach',
        description: 'Access to coaching features and member training programs'
      },
      // { value: 'marketing_manager', label: 'Marketing Manager', description: 'Manage marketing campaigns and promotional activities' },
      // { value: 'financial', label: 'Financial', description: 'Access to financial reports and payment processing' },
      // { value: 'sales', label: 'Sales', description: 'Access to sales features and member enrollment' },
      // { value: 'standard_employee', label: 'Standard Employee', description: 'Basic employee access with standard permissions' },
      {
        value: 'scheduling',
        label: 'Scheduling',
        description: 'Manage schedules, appointments, and class bookings'
      },
      // { value: 'credit_manager', label: 'Credit Manager', description: 'Manage member credits and credit-related operations' },
      {
        value: 'community_manager',
        label: 'Community Manager',
        description: 'Manage community features and member interactions'
      }
      // { value: 'data_request_permission', label: 'Data request permission', description: 'Permission to request and export member data' },
      // { value: 'pos_employee', label: 'POS Employee', description: 'Access to point of sale system for transactions' },
      // { value: 'default_permissions', label: 'Default permissions', description: 'Standard default permissions for employees' },
      ]
    };
  },
  mounted: function mounted() {
    // Generate available years (last 100 years)
    var currentYear = new Date().getFullYear();
    for (var i = currentYear; i >= currentYear - 100; i--) {
      this.availableYears.push(i);
    }
  },
  computed: {
    // Convert birthday parts to date format for submission
    computedDob: function computedDob() {
      if (this.member.birthdayYear && this.member.birthdayMonth && this.member.birthdayDay) {
        var year = this.member.birthdayYear;
        var month = String(this.member.birthdayMonth).padStart(2, '0');
        var day = String(this.member.birthdayDay).padStart(2, '0');
        return "".concat(year, "-").concat(month, "-").concat(day);
      }
      return this.member.dob || null;
    }
  },
  watch: {
    "member.isTrial": function memberIsTrial(newVal) {
      if (newVal) {
        // Trial mode ON — clear payment info
        this.member.plan = null;
        this.member.paymentMethod = null;
        this.member.amount = "";
        this.member.payAmount = "";
        this.member.paymentStartDate = "";
        this.member.bankAccountName = "";
        this.member.bankAccountNumber = "";
        this.member.paymentNotes = "";
      } else {
        // Trial mode OFF — clear trial info
        this.member.trialStart = "";
        this.member.trialEnd = "";
      }
    }
  },
  methods: {
    previewPhoto: function previewPhoto(event) {
      var file = event.target.files[0];
      if (file) {
        // Check file size (2MB limit)
        var maxSize = 2 * 1024 * 1024; // 2MB in bytes
        if (file.size > maxSize) {
          alert('File size must be less than 2MB. Please select a smaller image.');
          event.target.value = ''; // Clear the file input
          this.photoUrl = null;
          return;
        }

        // Check file type
        var allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'];
        if (!allowedTypes.includes(file.type)) {
          alert('Please select a valid image file (JPG, PNG, or GIF).');
          event.target.value = ''; // Clear the file input
          this.photoUrl = null;
          return;
        }
        this.photoUrl = URL.createObjectURL(file);
      }
    },
    submitForm: function submitForm() {
      // Mark that validation has been attempted
      this.validationAttempted = true;

      // Clear previous errors
      this.fieldErrors = {};

      // Validate all fields
      if (!this.validateForm()) {
        // Scroll to first error field
        this.scrollToFirstError();
        return;
      }

      // All validations passed, proceed with API call
      this.createCoach();
    },
    validateForm: function validateForm() {
      var isValid = true;
      this.fieldErrors = {};

      // Trim all string fields for validation
      var firstName = (this.member.firstName || '').trim();
      var lastName = (this.member.lastName || '').trim();
      var email = (this.member.email || '').trim();
      var mobilePhone = (this.member.mobile_phone || '').trim();
      var address = (this.member.address || '').trim();
      var city = (this.member.city || '').trim();
      var state = (this.member.state || '').trim();
      var zip = (this.member.zip || '').trim();

      // Validate First Name
      if (!firstName) {
        this.fieldErrors.firstName = "First name is required";
        isValid = false;
      } else if (firstName.length < 2) {
        this.fieldErrors.firstName = "First name must be at least 2 characters long";
        isValid = false;
      } else if (firstName.length > 50) {
        this.fieldErrors.firstName = "First name must not exceed 50 characters";
        isValid = false;
      }

      // Validate Last Name
      if (!lastName) {
        this.fieldErrors.lastName = "Last name is required";
        isValid = false;
      } else if (lastName.length < 2) {
        this.fieldErrors.lastName = "Last name must be at least 2 characters long";
        isValid = false;
      } else if (lastName.length > 50) {
        this.fieldErrors.lastName = "Last name must not exceed 50 characters";
        isValid = false;
      }

      // Validate Email
      if (!email) {
        this.fieldErrors.email = "Email address is required";
        isValid = false;
      } else {
        var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
          this.fieldErrors.email = "Please enter a valid email address";
          isValid = false;
        } else if (email.length > 255) {
          this.fieldErrors.email = "Email address must not exceed 255 characters";
          isValid = false;
        }
      }

      // Validate Mobile Phone
      if (!mobilePhone) {
        this.fieldErrors.mobile_phone = "Mobile phone number is required";
        isValid = false;
      } else {
        var cleanPhone = mobilePhone.replace(/[\s\-\(\)\.]/g, '');
        if (cleanPhone.length < 10) {
          this.fieldErrors.mobile_phone = "Mobile phone number must contain at least 10 digits";
          isValid = false;
        } else if (!/^[\d\+\-\(\)\.\s]+$/.test(mobilePhone)) {
          this.fieldErrors.mobile_phone = "Mobile phone number contains invalid characters";
          isValid = false;
        }
      }

      // Validate Gender
      if (!this.member.gender) {
        this.fieldErrors.gender = "Please select a gender";
        isValid = false;
      }

      // Validate Birthday
      if (!this.member.birthdayDay || this.member.birthdayDay === "") {
        this.fieldErrors.birthdayDay = "Birthday day is required";
        isValid = false;
      }
      if (!this.member.birthdayMonth || this.member.birthdayMonth === "") {
        this.fieldErrors.birthdayMonth = "Birthday month is required";
        isValid = false;
      }
      if (!this.member.birthdayYear || this.member.birthdayYear === "") {
        this.fieldErrors.birthdayYear = "Birthday year is required";
        isValid = false;
      }

      // Validate birthday date is valid
      if (this.member.birthdayYear && this.member.birthdayMonth && this.member.birthdayDay) {
        var year = parseInt(this.member.birthdayYear);
        var month = parseInt(this.member.birthdayMonth);
        var day = parseInt(this.member.birthdayDay);
        var date = new Date(year, month - 1, day);
        if (date.getDate() !== day || date.getMonth() !== month - 1 || date.getFullYear() !== year) {
          this.fieldErrors.birthdayDay = "Invalid date. Please check day, month, and year";
          isValid = false;
        } else {
          var today = new Date();
          today.setHours(0, 0, 0, 0);
          if (date > today) {
            this.fieldErrors.birthdayDay = "Birthday cannot be in the future";
            isValid = false;
          }
          var age = today.getFullYear() - year;
          var birthdayThisYear = new Date(today.getFullYear(), month - 1, day);
          if (birthdayThisYear > today) {
            age--;
          }
          if (age > 120) {
            this.fieldErrors.birthdayYear = "Please enter a valid birthday. Age cannot exceed 120 years";
            isValid = false;
          }
        }
      }

      // Validate Address
      if (!address) {
        this.fieldErrors.address = "Address is required";
        isValid = false;
      } else if (address.length < 5) {
        this.fieldErrors.address = "Address must be at least 5 characters long";
        isValid = false;
      } else if (address.length > 255) {
        this.fieldErrors.address = "Address must not exceed 255 characters";
        isValid = false;
      }

      // Validate City
      if (!city) {
        this.fieldErrors.city = "City is required";
        isValid = false;
      } else if (city.length < 2) {
        this.fieldErrors.city = "City name must be at least 2 characters long";
        isValid = false;
      } else if (city.length > 100) {
        this.fieldErrors.city = "City name must not exceed 100 characters";
        isValid = false;
      }

      // Validate State
      if (!state) {
        this.fieldErrors.state = "State is required";
        isValid = false;
      } else if (state.length < 2) {
        this.fieldErrors.state = "State name must be at least 2 characters long";
        isValid = false;
      } else if (state.length > 100) {
        this.fieldErrors.state = "State name must not exceed 100 characters";
        isValid = false;
      }

      // Validate ZIP Code
      if (!zip) {
        this.fieldErrors.zip = "ZIP code is required";
        isValid = false;
      } else if (zip.length < 3) {
        this.fieldErrors.zip = "ZIP code must be at least 3 characters long";
        isValid = false;
      } else if (zip.length > 20) {
        this.fieldErrors.zip = "ZIP code must not exceed 20 characters";
        isValid = false;
      }

      // Validate Landline Phone (if provided)
      if (this.member.landline_phone) {
        var cleanLandline = this.member.landline_phone.replace(/[\s\-\(\)\.]/g, '');
        if (cleanLandline.length < 10) {
          this.fieldErrors.landline_phone = "Landline phone number must contain at least 10 digits";
          isValid = false;
        } else if (!/^[\d\+\-\(\)\.\s]+$/.test(this.member.landline_phone)) {
          this.fieldErrors.landline_phone = "Landline phone number contains invalid characters";
          isValid = false;
        }
      }

      // Validate Coach Since date (if provided)
      if (this.member.coachSince) {
        var _today = new Date();
        var todayStr = _today.getFullYear() + '-' + String(_today.getMonth() + 1).padStart(2, '0') + '-' + String(_today.getDate()).padStart(2, '0');
        if (this.member.coachSince > todayStr) {
          this.fieldErrors.coachSince = "Coach since date cannot be in the future";
          isValid = false;
        }
      }

      // Validate Bank Account Number (if provided)
      if (this.member.bankAccountNumber) {
        var cleanAccountNumber = this.member.bankAccountNumber.replace(/\s/g, '');
        if (cleanAccountNumber.length < 4) {
          this.fieldErrors.bankAccountNumber = "Bank account number must be at least 4 characters long";
          isValid = false;
        } else if (!/^[\d\s\-]+$/.test(this.member.bankAccountNumber)) {
          this.fieldErrors.bankAccountNumber = "Bank account number contains invalid characters";
          isValid = false;
        }
      }

      // Validate Routing Number (if provided)
      if (this.member.routingNumber) {
        // Check invalid characters first
        if (!/^[\d\s\-]+$/.test(this.member.routingNumber)) {
          this.fieldErrors.routingNumber = "Routing number contains invalid characters";
          isValid = false;
        } else {
          // Then check for exactly 9 digits
          var cleanRoutingNumber = this.member.routingNumber.replace(/[\s\-]/g, '');
          if (cleanRoutingNumber.length !== 9) {
            this.fieldErrors.routingNumber = "Routing number must be exactly 9 digits";
            isValid = false;
          }
        }
      }

      // Validate Bank Account Name (if provided)
      if (this.member.bankAccountName) {
        if (this.member.bankAccountName.trim().length < 2) {
          this.fieldErrors.bankAccountName = "Bank account holder name must be at least 2 characters long";
          isValid = false;
        }
      }

      // Validate Bank Name (if provided)
      if (this.member.bankName) {
        if (this.member.bankName.trim().length < 2) {
          this.fieldErrors.bankName = "Bank name must be at least 2 characters long";
          isValid = false;
        }
      }

      // Show error message if validation failed
      if (!isValid) {
        var errorCount = Object.keys(this.fieldErrors).length;
        this.$root.$bvToast.toast("Please correct ".concat(errorCount, " ").concat(errorCount === 1 ? 'error' : 'errors', " in the form before submitting."), {
          title: 'Validation Failed',
          variant: 'warning',
          solid: true,
          autoHideDelay: 5000,
          toaster: 'b-toaster-top-right',
          appendToast: true
        });
      }
      return isValid;
    },
    validateField: function validateField(fieldName) {
      // Clear error for this field
      if (this.fieldErrors[fieldName]) {
        delete this.fieldErrors[fieldName];
      }

      // Validate individual field
      switch (fieldName) {
        case 'firstName':
          var firstName = (this.member.firstName || '').trim();
          if (!firstName) {
            this.fieldErrors.firstName = "First name is required";
            return false;
          } else if (firstName.length < 2) {
            this.fieldErrors.firstName = "First name must be at least 2 characters long";
            return false;
          } else if (firstName.length > 50) {
            this.fieldErrors.firstName = "First name must not exceed 50 characters";
            return false;
          }
          break;
        case 'lastName':
          var lastName = (this.member.lastName || '').trim();
          if (!lastName) {
            this.fieldErrors.lastName = "Last name is required";
            return false;
          } else if (lastName.length < 2) {
            this.fieldErrors.lastName = "Last name must be at least 2 characters long";
            return false;
          } else if (lastName.length > 50) {
            this.fieldErrors.lastName = "Last name must not exceed 50 characters";
            return false;
          }
          break;
        case 'gender':
          if (!this.member.gender) {
            this.fieldErrors.gender = "Please select a gender";
            return false;
          }
          break;
        case 'email':
          var email = (this.member.email || '').trim();
          if (!email) {
            this.fieldErrors.email = "Email address is required";
            return false;
          } else {
            var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
              this.fieldErrors.email = "Please enter a valid email address";
              return false;
            } else if (email.length > 255) {
              this.fieldErrors.email = "Email address must not exceed 255 characters";
              return false;
            }
          }
          break;
        case 'mobile_phone':
          var mobilePhone = (this.member.mobile_phone || '').trim();
          if (!mobilePhone) {
            this.fieldErrors.mobile_phone = "Mobile phone number is required";
            return false;
          } else {
            var cleanPhone = mobilePhone.replace(/[\s\-\(\)\.]/g, '');
            if (cleanPhone.length < 10) {
              this.fieldErrors.mobile_phone = "Mobile phone number must contain at least 10 digits";
              return false;
            } else if (!/^[\d\+\-\(\)\.\s]+$/.test(mobilePhone)) {
              this.fieldErrors.mobile_phone = "Mobile phone number contains invalid characters";
              return false;
            }
          }
          break;
        case 'address':
          var address = (this.member.address || '').trim();
          if (!address) {
            this.fieldErrors.address = "Address is required";
            return false;
          } else if (address.length < 5) {
            this.fieldErrors.address = "Address must be at least 5 characters long";
            return false;
          } else if (address.length > 255) {
            this.fieldErrors.address = "Address must not exceed 255 characters";
            return false;
          }
          break;
        case 'city':
          var city = (this.member.city || '').trim();
          if (!city) {
            this.fieldErrors.city = "City is required";
            return false;
          } else if (city.length < 2) {
            this.fieldErrors.city = "City name must be at least 2 characters long";
            return false;
          } else if (city.length > 100) {
            this.fieldErrors.city = "City name must not exceed 100 characters";
            return false;
          }
          break;
        case 'state':
          var state = (this.member.state || '').trim();
          if (!state) {
            this.fieldErrors.state = "State is required";
            return false;
          } else if (state.length < 2) {
            this.fieldErrors.state = "State name must be at least 2 characters long";
            return false;
          } else if (state.length > 100) {
            this.fieldErrors.state = "State name must not exceed 100 characters";
            return false;
          }
          break;
        case 'zip':
          var zip = (this.member.zip || '').trim();
          if (!zip) {
            this.fieldErrors.zip = "ZIP code is required";
            return false;
          } else if (zip.length < 3) {
            this.fieldErrors.zip = "ZIP code must be at least 3 characters long";
            return false;
          } else if (zip.length > 20) {
            this.fieldErrors.zip = "ZIP code must not exceed 20 characters";
            return false;
          }
          break;
        case 'landline_phone':
          if (this.member.landline_phone) {
            var cleanLandline = this.member.landline_phone.replace(/[\s\-\(\)\.]/g, '');
            if (cleanLandline.length < 10) {
              this.fieldErrors.landline_phone = "Landline phone number must contain at least 10 digits";
              return false;
            } else if (!/^[\d\+\-\(\)\.\s]+$/.test(this.member.landline_phone)) {
              this.fieldErrors.landline_phone = "Landline phone number contains invalid characters";
              return false;
            }
          }
          break;
        case 'birthdayDay':
        case 'birthdayMonth':
        case 'birthdayYear':
          if (!this.member.birthdayDay || this.member.birthdayDay === "") {
            this.fieldErrors.birthdayDay = "Birthday day is required";
            return false;
          }
          if (!this.member.birthdayMonth || this.member.birthdayMonth === "") {
            this.fieldErrors.birthdayMonth = "Birthday month is required";
            return false;
          }
          if (!this.member.birthdayYear || this.member.birthdayYear === "") {
            this.fieldErrors.birthdayYear = "Birthday year is required";
            return false;
          }
          if (this.member.birthdayYear && this.member.birthdayMonth && this.member.birthdayDay) {
            var year = parseInt(this.member.birthdayYear);
            var month = parseInt(this.member.birthdayMonth);
            var day = parseInt(this.member.birthdayDay);
            var date = new Date(year, month - 1, day);
            if (date.getDate() !== day || date.getMonth() !== month - 1 || date.getFullYear() !== year) {
              this.fieldErrors.birthdayDay = "Invalid date. Please check day, month, and year";
              return false;
            }
            var today = new Date();
            today.setHours(0, 0, 0, 0);
            if (date > today) {
              this.fieldErrors.birthdayDay = "Birthday cannot be in the future";
              return false;
            }
            var birthdayThisYear = new Date(today.getFullYear(), month - 1, day);
            var age = today.getFullYear() - year;
            if (birthdayThisYear > today) {
              age--;
            }
            if (age > 120) {
              this.fieldErrors.birthdayYear = "Please enter a valid birthday. Age cannot exceed 120 years";
              return false;
            }
          }
          break;
        case 'routingNumber':
          if (this.member.routingNumber) {
            // Check invalid characters first
            if (!/^[\d\s\-]+$/.test(this.member.routingNumber)) {
              this.fieldErrors.routingNumber = "Routing number contains invalid characters";
              return false;
            } else {
              // Then check for exactly 9 digits
              var cleanRoutingNumber = this.member.routingNumber.replace(/[\s\-]/g, '');
              if (cleanRoutingNumber.length !== 9) {
                this.fieldErrors.routingNumber = "Routing number must be exactly 9 digits";
                return false;
              }
            }
          }
          break;
      }
      return true;
    },
    scrollToFirstError: function scrollToFirstError() {
      this.$nextTick(function () {
        var firstErrorField = document.querySelector('.field-error, .form-control.is-invalid');
        if (firstErrorField) {
          firstErrorField.scrollIntoView({
            behavior: 'smooth',
            block: 'center'
          });
          var input = firstErrorField.querySelector('input, select, textarea') || firstErrorField;
          if (input && input.focus) {
            input.focus();
          }
        }
      });
    },
    createCoach: function createCoach() {
      var _this = this;
      // Show loading indicator
      this.isLoading = true;

      // Clean and prepare the data before sending
      var cleanedData = this.cleanFormData();

      // Map frontend field names to backend field names
      // Only include fields that exist in the database
      var coachData = {
        first_name: cleanedData.firstName,
        last_name: cleanedData.lastName,
        mobile_phone: cleanedData.mobile_phone,
        landline_phone: cleanedData.landline_phone,
        email: cleanedData.email,
        dob: cleanedData.dob || null,
        gender: cleanedData.gender || null,
        address: cleanedData.address,
        city: cleanedData.city,
        state: cleanedData.state,
        zip: cleanedData.zip,
        country: cleanedData.country || 'United States',
        own_employee_id: cleanedData.ownEmployeeId || null,
        custom_export_field: cleanedData.customExportField || null,
        coach_since: cleanedData.coachSince || null,
        subscription_reason: cleanedData.subscriptionReason || 'Unknown',
        language: cleanedData.language || 'English',
        privileges: cleanedData.privileges || [],
        bank_account_name: cleanedData.bankAccountName || null,
        bank_account_number: cleanedData.bankAccountNumber || null,
        routing_number: cleanedData.routingNumber || null,
        bank_account_type: cleanedData.bankAccountType || 'Checking',
        bank_name: cleanedData.bankName || null,
        send_invitation: cleanedData.sendInvitation !== undefined ? cleanedData.sendInvitation : true
      };

      // Debug: Log the data being sent
      console.log('Coach data being sent:', coachData);

      // Handle file upload if profile picture is selected
      var formData = new FormData();

      // Add all the coach data
      Object.keys(coachData).forEach(function (key) {
        var value = coachData[key];

        // Skip null, undefined, and empty string values
        if (value === null || value === undefined || value === '') {
          return;
        }
        if (key === 'specializations' && Array.isArray(value)) {
          // Send each specialization as a separate array item
          value.forEach(function (spec) {
            formData.append('specializations[]', spec);
          });
        } else if (key === 'privileges' && Array.isArray(value)) {
          // Send each privilege as a separate array item (Laravel expects array format)
          value.forEach(function (privilege) {
            formData.append('privileges[]', privilege);
          });
        } else if (key === 'is_trial' || key === 'send_invitation') {
          // Convert boolean to proper format
          formData.append(key, value ? '1' : '0');
        } else if (Array.isArray(value)) {
          formData.append(key, JSON.stringify(value));
        } else {
          formData.append(key, value);
        }
      });

      // Add profile picture if selected
      var fileInput = document.querySelector('input[type="file"]');
      if (fileInput && fileInput.files[0]) {
        // Check file size (assuming max 2MB)
        var maxSize = 2 * 1024 * 1024; // 2MB in bytes
        if (fileInput.files[0].size > maxSize) {
          alert('Profile picture file size must be less than 2MB');
          return;
        }
        formData.append('profile_picture', fileInput.files[0]);
      }

      // Debug: Log the form data
      console.log('Submitting coach data:', coachData);

      // Use relative path since axios baseURL is already set to '/api/'
      axios.post("coaches", formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Accept': 'application/json'
        }
      }).then(function (response) {
        // Hide loading indicator
        _this.isLoading = false;
        console.log('Success response:', response.data);
        _this.$root.$bvToast.toast('Coach created successfully!', {
          title: 'Success',
          variant: 'success',
          solid: true,
          autoHideDelay: 3000
        });

        // Show email status toasts
        if (response.data.email_status) {
          var emailStatus = response.data.email_status;

          // Password setup email status
          if (emailStatus.password_setup_email_sent) {
            _this.$root.$bvToast.toast("Password setup email sent to ".concat(_this.member.email), {
              title: 'Email Sent',
              variant: 'success',
              solid: true,
              autoHideDelay: 4000
            });
          } else if (emailStatus.password_setup_email_error) {
            _this.$root.$bvToast.toast("Failed to send password setup email: ".concat(emailStatus.password_setup_email_error), {
              title: 'Email Error',
              variant: 'warning',
              solid: true,
              autoHideDelay: 5000
            });
          }

          // Confirmation email status
          if (emailStatus.confirmation_email_sent) {
            _this.$root.$bvToast.toast('Confirmation email sent to admin', {
              title: 'Confirmation Sent',
              variant: 'success',
              solid: true,
              autoHideDelay: 4000
            });
          } else if (emailStatus.confirmation_email_error) {
            _this.$root.$bvToast.toast("Failed to send confirmation email: ".concat(emailStatus.confirmation_email_error), {
              title: 'Email Error',
              variant: 'warning',
              solid: true,
              autoHideDelay: 5000
            });
          }
        }
        setTimeout(function () {
          _this.$router.push("/app/Staff/coachlist");
        }, 2000);
      })["catch"](function (error) {
        // Hide loading indicator
        _this.isLoading = false;
        console.error("Error creating coach:", error);
        console.error("Error response:", error.response);
        if (error.response && error.response.data) {
          if (error.response.data.errors) {
            // Handle validation errors
            var errors = error.response.data.errors;
            var errorMessage = 'Please fix the following errors:\n';
            Object.keys(errors).forEach(function (field) {
              errorMessage += "".concat(field, ": ").concat(errors[field][0], "\n");
            });
            _this.$root.$bvToast.toast(errorMessage, {
              title: 'Validation Error',
              variant: 'danger',
              solid: true,
              autoHideDelay: 5000
            });
          } else if (error.response.data.message) {
            _this.$root.$bvToast.toast("Error: ".concat(error.response.data.message), {
              title: 'Error',
              variant: 'danger',
              solid: true,
              autoHideDelay: 5000
            });
          } else {
            _this.$root.$bvToast.toast('An error occurred while creating the coach. Please try again.', {
              title: 'Error',
              variant: 'danger',
              solid: true,
              autoHideDelay: 5000
            });
          }
        } else {
          _this.$root.$bvToast.toast('Network error. Please check your connection and try again.', {
            title: 'Network Error',
            variant: 'danger',
            solid: true,
            autoHideDelay: 5000
          });
        }
      });
    },
    cleanFormData: function cleanFormData() {
      var _this$member$landline, _this$member$coachExp, _this$member$coachCer, _this$member$medical, _this$member$emergenc, _this$member$emergenc2, _this$member$emergenc3, _this$member$referred, _this$member$lockerNu, _this$member$bio, _this$member$socialMe, _this$member$notes, _this$member$weeklyAv, _this$member$sessionD, _this$member$bankAcco, _this$member$bankAcco2, _this$member$paymentN, _this$member$ownEmplo, _this$member$customEx, _this$member$routingN, _this$member$bankName;
      // Clean and validate form data before submission
      var cleaned = {};

      // Required fields - ensure they are not empty
      cleaned.firstName = this.member.firstName.trim();
      cleaned.lastName = this.member.lastName.trim();
      cleaned.mobile_phone = this.member.mobile_phone.trim();
      cleaned.landline_phone = ((_this$member$landline = this.member.landline_phone) === null || _this$member$landline === void 0 ? void 0 : _this$member$landline.trim()) || null;
      cleaned.email = this.member.email.trim().toLowerCase();
      cleaned.address = this.member.address.trim();
      cleaned.city = this.member.city.trim();
      cleaned.state = this.member.state.trim();
      cleaned.zip = this.member.zip.trim();

      // Optional fields - clean if they have values
      // Use computed DOB if birthday fields are filled, otherwise use dob field
      cleaned.dob = this.computedDob || this.member.dob || null;
      cleaned.gender = this.member.gender || null;
      cleaned.yearsOfExperience = this.member.yearsOfExperience || null;
      cleaned.status = this.member.status || null;
      cleaned.coachExperience = ((_this$member$coachExp = this.member.coachExperience) === null || _this$member$coachExp === void 0 ? void 0 : _this$member$coachExp.trim()) || null;
      cleaned.coachCertifications = ((_this$member$coachCer = this.member.coachCertifications) === null || _this$member$coachCer === void 0 ? void 0 : _this$member$coachCer.trim()) || null;
      cleaned.specializations = this.member.specializations || [];
      cleaned.height = this.member.height || null;
      cleaned.weight = this.member.weight || null;
      cleaned.chest = this.member.chest || null;
      cleaned.bloodGroup = this.member.bloodGroup || null;
      cleaned.medical = ((_this$member$medical = this.member.medical) === null || _this$member$medical === void 0 ? void 0 : _this$member$medical.trim()) || null;
      cleaned.emergencyName = ((_this$member$emergenc = this.member.emergencyName) === null || _this$member$emergenc === void 0 ? void 0 : _this$member$emergenc.trim()) || null;
      cleaned.emergencyPhone = ((_this$member$emergenc2 = this.member.emergencyPhone) === null || _this$member$emergenc2 === void 0 ? void 0 : _this$member$emergenc2.trim()) || null;
      cleaned.emergencyRelation = ((_this$member$emergenc3 = this.member.emergencyRelation) === null || _this$member$emergenc3 === void 0 ? void 0 : _this$member$emergenc3.trim()) || null;
      cleaned.referredBy = ((_this$member$referred = this.member.referredBy) === null || _this$member$referred === void 0 ? void 0 : _this$member$referred.trim()) || null;
      cleaned.lockerNumber = ((_this$member$lockerNu = this.member.lockerNumber) === null || _this$member$lockerNu === void 0 ? void 0 : _this$member$lockerNu.trim()) || null;
      cleaned.bio = ((_this$member$bio = this.member.bio) === null || _this$member$bio === void 0 ? void 0 : _this$member$bio.trim()) || null;
      cleaned.socialMedia = ((_this$member$socialMe = this.member.socialMedia) === null || _this$member$socialMe === void 0 ? void 0 : _this$member$socialMe.trim()) || null;
      cleaned.notes = ((_this$member$notes = this.member.notes) === null || _this$member$notes === void 0 ? void 0 : _this$member$notes.trim()) || null;
      cleaned.weeklyAvailability = ((_this$member$weeklyAv = this.member.weeklyAvailability) === null || _this$member$weeklyAv === void 0 ? void 0 : _this$member$weeklyAv.trim()) || null;
      cleaned.sessionDuration = ((_this$member$sessionD = this.member.sessionDuration) === null || _this$member$sessionD === void 0 ? void 0 : _this$member$sessionD.trim()) || null;
      cleaned.maxClientsPerDay = this.member.maxClientsPerDay || null;
      cleaned.isTrial = this.member.isTrial || false;
      cleaned.trialStart = this.member.trialStart || null;
      cleaned.trialEnd = this.member.trialEnd || null;
      cleaned.plan = this.member.plan || null;
      cleaned.paymentMethod = this.member.paymentMethod || null;
      cleaned.amount = this.member.amount || null;
      cleaned.payAmount = this.member.payAmount || null;
      cleaned.paymentStartDate = this.member.paymentStartDate || null;
      cleaned.bankAccountName = ((_this$member$bankAcco = this.member.bankAccountName) === null || _this$member$bankAcco === void 0 ? void 0 : _this$member$bankAcco.trim()) || null;
      cleaned.bankAccountNumber = ((_this$member$bankAcco2 = this.member.bankAccountNumber) === null || _this$member$bankAcco2 === void 0 ? void 0 : _this$member$bankAcco2.trim()) || null;
      cleaned.paymentNotes = ((_this$member$paymentN = this.member.paymentNotes) === null || _this$member$paymentN === void 0 ? void 0 : _this$member$paymentN.trim()) || null;

      // New fields
      cleaned.ownEmployeeId = ((_this$member$ownEmplo = this.member.ownEmployeeId) === null || _this$member$ownEmplo === void 0 ? void 0 : _this$member$ownEmplo.trim()) || null;
      cleaned.customExportField = ((_this$member$customEx = this.member.customExportField) === null || _this$member$customEx === void 0 ? void 0 : _this$member$customEx.trim()) || null;
      cleaned.coachSince = this.member.coachSince || null;
      cleaned.subscriptionReason = this.member.subscriptionReason || 'Unknown';
      cleaned.language = this.member.language || 'English';
      cleaned.privileges = this.member.privileges || [];
      cleaned.country = this.member.country || 'United States';
      cleaned.routingNumber = ((_this$member$routingN = this.member.routingNumber) === null || _this$member$routingN === void 0 ? void 0 : _this$member$routingN.trim()) || null;
      cleaned.bankAccountType = this.member.bankAccountType || 'Checking';
      cleaned.bankName = ((_this$member$bankName = this.member.bankName) === null || _this$member$bankName === void 0 ? void 0 : _this$member$bankName.trim()) || null;
      cleaned.sendInvitation = this.member.sendInvitation !== undefined ? this.member.sendInvitation : true;
      return cleaned;
    },
    goBack: function goBack() {
      // Check if there's a previous page in browser history
      if (window.history.length > 1) {
        this.$router.go(-1);
      } else {
        // Fallback to coaches list if no history
        this.$router.push('/app/Staff/coachlist');
      }
    },
    openWebcam: function openWebcam() {
      var _this2 = this;
      return _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
        var stream;
        return _regeneratorRuntime().wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              _this2.showWebcam = true;
              _context.next = 3;
              return _this2.$nextTick();
            case 3:
              _context.prev = 3;
              _context.next = 6;
              return navigator.mediaDevices.getUserMedia({
                video: true
              });
            case 6:
              stream = _context.sent;
              _this2.$refs.webcamVideo.srcObject = stream;
              _context.next = 15;
              break;
            case 10:
              _context.prev = 10;
              _context.t0 = _context["catch"](3);
              console.error('Error accessing webcam:', _context.t0);
              alert('Could not access webcam. Please check your permissions.');
              _this2.showWebcam = false;
            case 15:
            case "end":
              return _context.stop();
          }
        }, _callee, null, [[3, 10]]);
      }))();
    },
    closeWebcam: function closeWebcam() {
      this.showWebcam = false;
      if (this.$refs.webcamVideo && this.$refs.webcamVideo.srcObject) {
        var tracks = this.$refs.webcamVideo.srcObject.getTracks();
        tracks.forEach(function (track) {
          return track.stop();
        });
      }
    },
    takeSnapshot: function takeSnapshot() {
      var video = this.$refs.webcamVideo;
      var canvas = document.createElement('canvas');
      var ctx = canvas.getContext('2d');
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      ctx.drawImage(video, 0, 0);
      var dataURL = canvas.toDataURL('image/jpeg', 0.7);
      this.photoUrl = dataURL;
      this.closeWebcam();
    },
    getMaxDate: function getMaxDate() {
      // Set maximum date to today (prevent future dates)
      var today = new Date();
      return today.toISOString().split('T')[0];
    }
  }
});

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js??clonedRuleSet-12.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12.use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-12.use[3]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/Staff/newcoach.vue?vue&type=style&index=0&id=048fe306&lang=scss":
/*!*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??clonedRuleSet-12.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12.use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-12.use[3]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/Staff/newcoach.vue?vue&type=style&index=0&id=048fe306&lang=scss ***!
  \*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
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
___CSS_LOADER_EXPORT___.push([module.id, "@charset \"UTF-8\";\n.filter-btn .btn,\n.filter-btn .btn-secondary,\n.filter-btn .btn-outline-secondary,\n.filter-btn button.btn,\n.filter-btn button.btn-secondary {\n  color: #000 !important;\n  background-color: transparent !important;\n  border-color: #6c757d !important;\n}\n.filter-btn .btn:hover,\n.filter-btn .btn-secondary:hover,\n.filter-btn .btn-outline-secondary:hover,\n.filter-btn button.btn:hover,\n.filter-btn button.btn-secondary:hover {\n  color: #dc3545 !important;\n  background-color: transparent !important;\n  border-color: #dc3545 !important;\n  box-shadow: none !important;\n}\n.filter-btn .btn:focus,\n.filter-btn .btn-secondary:focus,\n.filter-btn .btn-outline-secondary:focus,\n.filter-btn button.btn:focus,\n.filter-btn button.btn-secondary:focus {\n  color: #dc3545 !important;\n  background-color: transparent !important;\n  border-color: #dc3545 !important;\n  box-shadow: none !important;\n}\n.filter-btn .btn:active,\n.filter-btn .btn-secondary:active,\n.filter-btn .btn-outline-secondary:active,\n.filter-btn button.btn:active,\n.filter-btn button.btn-secondary:active {\n  color: #dc3545 !important;\n  background-color: transparent !important;\n  border-color: #dc3545 !important;\n}\n.btn-secondary:not(:disabled):not(.disabled):active:focus {\n  box-shadow: none !important;\n}\n\n/* ===========================================\n   COMMON BREADCRUMB NAVIGATION STYLES\n   =========================================== */\n.breadcrumb-nav-row {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  margin-bottom: 0.5rem;\n  gap: 0.5rem;\n}\n.breadcrumb-section {\n  flex: 1;\n}\n.breadcrumb-section .breadcrumb-nav .breadcrumb-container {\n  display: flex;\n  align-items: center;\n  gap: 1rem;\n}\n.breadcrumb-section .breadcrumb-nav .breadcrumb-container .back-button {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  width: 40px;\n  height: 40px;\n  background: rgba(255, 255, 255, 0.1);\n  border: 1px solid rgba(255, 255, 255, 0.2);\n  border-radius: 8px;\n  color: #ffffff;\n  cursor: pointer;\n  transition: all 0.3s ease;\n}\n.breadcrumb-section .breadcrumb-nav .breadcrumb-container .back-button:hover {\n  background: rgba(255, 255, 255, 0.15);\n  border-color: rgba(255, 255, 255, 0.3);\n  transform: translateY(-1px);\n  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);\n  color: #dc3545;\n}\n.breadcrumb-section .breadcrumb-nav .breadcrumb-container .back-button i {\n  font-size: 1.1em;\n}\n.breadcrumb-section .breadcrumb-nav .breadcrumb-container .breadcrumb {\n  display: flex;\n  align-items: center;\n  gap: 0.5rem;\n  margin: 0;\n  padding: 0;\n  background: none;\n  border-radius: 0;\n}\n.breadcrumb-section .breadcrumb-nav .breadcrumb-container .breadcrumb .breadcrumb-item {\n  display: flex;\n  align-items: center;\n  gap: 0.5rem;\n  font-size: 0.875rem;\n  color: #ffffff;\n}\n.breadcrumb-section .breadcrumb-nav .breadcrumb-container .breadcrumb .breadcrumb-item.active {\n  color: #252525;\n  font-weight: 600;\n}\n.breadcrumb-section .breadcrumb-nav .breadcrumb-container .breadcrumb .breadcrumb-item.active i {\n  color: #dc3545;\n}\n.breadcrumb-section .breadcrumb-nav .breadcrumb-container .breadcrumb .breadcrumb-item a {\n  display: flex;\n  align-items: center;\n  gap: 0.5rem;\n  color: #6a6a6a;\n  text-decoration: none;\n  transition: color 0.3s ease;\n}\n.breadcrumb-section .breadcrumb-nav .breadcrumb-container .breadcrumb .breadcrumb-item a:hover {\n  color: #dc3545;\n}\n.breadcrumb-section .breadcrumb-nav .breadcrumb-container .breadcrumb .breadcrumb-item a:hover i {\n  color: #dc3545;\n}\n.breadcrumb-section .breadcrumb-nav .breadcrumb-container .breadcrumb .breadcrumb-item a i {\n  font-size: 0.9em;\n  transition: color 0.3s ease;\n}\n.breadcrumb-section .breadcrumb-nav .breadcrumb-container .breadcrumb .breadcrumb-item:not(:last-child)::after {\n  content: \"›\";\n  margin-left: 0.5rem;\n  color: #6a6a6a;\n  font-size: 1.2em;\n}\n.action-section {\n  display: flex;\n  align-items: center;\n}\n.action-section .action-btn {\n  display: flex;\n  align-items: center;\n  gap: 0.5rem;\n  padding: 0.5rem 1rem;\n  border-radius: 8px;\n  font-size: 0.875rem;\n  font-weight: 500;\n  transition: all 0.3s ease;\n}\n.action-section .action-btn:hover:not(:disabled) {\n  transform: translateY(-1px);\n  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);\n}\n.action-section .action-btn:disabled {\n  opacity: 0.6;\n  cursor: not-allowed;\n}\n.action-section .action-btn i {\n  font-size: 0.9em;\n}\n@media (max-width: 768px) {\n.breadcrumb-nav-row {\n    flex-direction: column;\n    align-items: flex-start;\n    gap: 0.5rem;\n}\n.breadcrumb-section {\n    width: 100%;\n}\n.breadcrumb-section .breadcrumb-container {\n    flex-direction: column;\n    align-items: flex-start;\n    gap: 0.5rem;\n}\n.breadcrumb-section .breadcrumb-container .breadcrumb {\n    flex-wrap: wrap;\n}\n.breadcrumb-section .breadcrumb-container .breadcrumb .breadcrumb-item {\n    font-size: 0.8rem;\n}\n.breadcrumb-section .breadcrumb-container .breadcrumb .breadcrumb-item a {\n    font-size: 0.8rem;\n}\n.action-section {\n    width: 100%;\n    justify-content: flex-end;\n}\n.action-section .action-btn {\n    font-size: 0.8rem;\n    padding: 0.4rem 0.8rem;\n}\n}\n/* ===========================================\n   RESPONSIVE UTILITY CLASSES (ALL DEVICES)\n   =========================================== */\n.show-xs-only,\n.show-sm-only,\n.show-md-only,\n.show-lg-only,\n.show-xl-only {\n  display: none !important;\n}\n@media (max-width: 575px) {\n.hide-xs {\n    display: none !important;\n}\n.show-xs-only {\n    display: initial !important;\n}\n}\n@media (min-width: 576px) and (max-width: 767px) {\n.hide-sm {\n    display: none !important;\n}\n.show-sm-only {\n    display: initial !important;\n}\n}\n@media (min-width: 768px) and (max-width: 991px) {\n.hide-md {\n    display: none !important;\n}\n.show-md-only {\n    display: initial !important;\n}\n}\n@media (min-width: 992px) and (max-width: 1199px) {\n.hide-lg {\n    display: none !important;\n}\n.show-lg-only {\n    display: initial !important;\n}\n}\n@media (min-width: 1200px) {\n.hide-xl {\n    display: none !important;\n}\n.show-xl-only {\n    display: initial !important;\n}\n}\n@media (max-width: 576px) {\n.hide-sm-down {\n    display: none !important;\n}\n}\n@media (max-width: 768px) {\n.hide-md-down {\n    display: none !important;\n}\n}\n@media (max-width: 992px) {\n.hide-lg-down {\n    display: none !important;\n}\n}\n@media (min-width: 576px) {\n.hide-sm-up {\n    display: none !important;\n}\n}\n@media (min-width: 768px) {\n.hide-md-up {\n    display: none !important;\n}\n}\n@media (min-width: 992px) {\n.hide-lg-up {\n    display: none !important;\n}\n}\n@media (max-width: 575px) {\n.d-xs-none {\n    display: none !important;\n}\n.d-xs-block {\n    display: block !important;\n}\n.d-xs-flex {\n    display: flex !important;\n}\n}\n@media (min-width: 576px) and (max-width: 767px) {\n.d-sm-none {\n    display: none !important;\n}\n.d-sm-block {\n    display: block !important;\n}\n.d-sm-flex {\n    display: flex !important;\n}\n}\n@media (min-width: 768px) and (max-width: 991px) {\n.d-md-none {\n    display: none !important;\n}\n.d-md-block {\n    display: block !important;\n}\n.d-md-flex {\n    display: flex !important;\n}\n}\n@media (min-width: 992px) and (max-width: 1199px) {\n.d-lg-none {\n    display: none !important;\n}\n.d-lg-block {\n    display: block !important;\n}\n.d-lg-flex {\n    display: flex !important;\n}\n}\n@media (min-width: 1200px) {\n.d-xl-none {\n    display: none !important;\n}\n.d-xl-block {\n    display: block !important;\n}\n.d-xl-flex {\n    display: flex !important;\n}\n}\n@media (min-width: 576px) {\n.custom-modal-xl {\n    max-width: 1500px !important;\n}\n}\n.back-button {\n  background: none !important;\n  border: none !important;\n  color: #6c757d !important;\n  font-size: 18px !important;\n  cursor: pointer !important;\n  padding: 8px !important;\n  border-radius: 6px !important;\n  transition: all 0.2s ease !important;\n  display: flex !important;\n  align-items: center !important;\n  justify-content: center !important;\n  min-width: 36px !important;\n  min-height: 36px !important;\n  position: relative !important;\n  z-index: 10 !important;\n  pointer-events: auto !important;\n}\n.back-button:hover {\n  color: red !important;\n  transform: translateX(-2px);\n}\n.back-button:active {\n  transform: translateX(-1px);\n}\n.back-button i {\n  font-size: 16px;\n}\n.breadcrumb-nav {\n  margin-bottom: 5px;\n}\n.breadcrumb-container {\n  display: flex;\n  align-items: center;\n  gap: 15px;\n}\n.member-form-container {\n  min-height: 100vh;\n  background: linear-gradient(135deg, #f5f5f3 0%, #e8e8e6 100%);\n}\n.member-form-container .container {\n  width: 100%;\n  max-width: 1200px;\n  margin: 0 auto;\n  padding: 10px 15px;\n}\n.form-card {\n  background: #ffffff;\n  border-radius: 20px;\n  box-shadow: 0 20px 60px rgba(79, 112, 92, 0.15);\n  overflow: hidden;\n  margin: 10px 0;\n}\n.form-header {\n  background: linear-gradient(to bottom, #23415a, #0f1c29);\n  color: white;\n  text-align: center;\n  position: relative;\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 10px;\n  padding: 8px;\n}\n.form-header::before {\n  content: \"\";\n  position: absolute;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  background: url('data:image/svg+xml,<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 100 100\"><defs><pattern id=\"grain\" width=\"100\" height=\"100\" patternUnits=\"userSpaceOnUse\"><circle cx=\"25\" cy=\"25\" r=\"1\" fill=\"white\" opacity=\"0.1\"/><circle cx=\"75\" cy=\"75\" r=\"1\" fill=\"white\" opacity=\"0.1\"/><circle cx=\"50\" cy=\"10\" r=\"0.5\" fill=\"white\" opacity=\"0.1\"/><circle cx=\"10\" cy=\"60\" r=\"0.5\" fill=\"white\" opacity=\"0.1\"/><circle cx=\"90\" cy=\"40\" r=\"0.5\" fill=\"white\" opacity=\"0.1\"/></pattern></defs><rect width=\"100\" height=\"100\" fill=\"url(%23grain)\"/></svg>');\n  opacity: 0.3;\n}\n.header-content {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n  flex: 1;\n  justify-content: center;\n}\n.header-icon {\n  width: 45px;\n  height: 45px;\n  background: rgba(255, 255, 255, 0.2);\n  border-radius: 50%;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-size: 15px;\n  flex-shrink: 0;\n}\n.form-title {\n  font-size: 1.1rem;\n  font-weight: 700;\n  color: #ffffff;\n  margin: 0;\n}\n.form-subtitle {\n  font-size: 0.8rem;\n  opacity: 0.9;\n  margin: 0;\n}\n.member-form {\n  padding: 15px;\n}\n.client-data-layout {\n  display: flex;\n  gap: 35px;\n  align-items: flex-start;\n}\n.profile-section {\n  flex: 0 0 290px;\n  display: flex;\n  justify-content: center;\n  max-width: 100%;\n}\n.profile-picture-container {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: 15px;\n}\n.profile-picture {\n  width: 200px;\n  height: 200px;\n  border-radius: 50%;\n  background: #f5f5f5;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  cursor: pointer;\n  border: 3px solid #e0e0e0;\n  transition: all 0.3s ease;\n  overflow: hidden;\n}\n.profile-picture:hover {\n  border-color: #ff4040;\n  transform: scale(1.02);\n}\n.profile-placeholder {\n  color: #999;\n  font-size: 60px;\n}\n.profile-image {\n  width: 100%;\n  height: 100%;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n.preview-image {\n  width: 100%;\n  height: 100%;\n  -o-object-fit: cover;\n     object-fit: cover;\n  border-radius: 50%;\n}\n.change-button {\n  background: #ff4040;\n  color: white;\n  border: none;\n  padding: 8px 20px;\n  border-radius: 4px;\n  cursor: pointer;\n  font-size: 14px;\n  font-weight: 500;\n  transition: all 0.3s ease;\n}\n.change-button:hover {\n  background: #e63939;\n  transform: translateY(-1px);\n}\n.webcam-button {\n  background: white;\n  color: #333;\n  border: 1px solid #ddd;\n  padding: 8px 20px;\n  border-radius: 4px;\n  cursor: pointer;\n  font-size: 14px;\n  font-weight: 500;\n  transition: all 0.3s ease;\n}\n.webcam-button:hover {\n  background: #f8f9fa;\n  border-color: #ff4040;\n}\n.form-fields-section {\n  flex: 1;\n  background: white;\n  padding: 15px;\n  border-radius: 8px;\n  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);\n  min-width: 0;\n}\n.section-title {\n  font-size: 24px;\n  font-weight: 600;\n  color: #333;\n  border-bottom: 2px solid #f0f0f0;\n  margin-top: 20px;\n  margin-bottom: 15px;\n  padding-bottom: 10px;\n}\nh5.section-title {\n  font-size: 18px;\n  margin-top: 25px;\n  margin-bottom: 15px;\n}\n.form-fields {\n  display: flex;\n  flex-direction: column;\n}\n.form-group {\n  display: flex;\n  flex-direction: column;\n  gap: 8px;\n  min-width: 0;\n}\n.form-label {\n  font-weight: 500;\n  color: #333;\n  font-size: 14px;\n  display: flex;\n  align-items: center;\n  gap: 5px;\n}\n.info-icon {\n  color: #ff4040;\n  font-size: 12px;\n  cursor: pointer;\n}\n.form-control {\n  width: 100%;\n  border: 1px solid #ddd;\n  border-radius: 4px;\n  font-size: 14px;\n  transition: all 0.3s ease;\n  background: #f8f9fa;\n  color: #333;\n  padding: 5px 8px;\n  box-sizing: border-box;\n}\n.form-control:focus {\n  outline: none;\n  border-color: #ff4040;\n  background: white;\n  box-shadow: 0 0 0 2px rgba(255, 64, 64, 0.25);\n}\n.form-control:disabled {\n  background: #e9ecef;\n  color: #6c757d;\n  cursor: not-allowed;\n}\n\n/* Birthday date input styling */\ninput[type=date] {\n  position: relative;\n}\ninput[type=date]::-webkit-calendar-picker-indicator {\n  position: absolute;\n  right: 12px;\n  top: 50%;\n  transform: translateY(-50%);\n  cursor: pointer;\n  color: #6c757d;\n  font-size: 16px;\n}\ninput[type=date]:focus::-webkit-calendar-picker-indicator {\n  color: #ff4040;\n}\n.form-control::-moz-placeholder {\n  color: #6c757d !important;\n  opacity: 1 !important;\n  font-size: 12px;\n}\n.form-control::placeholder {\n  color: #6c757d !important;\n  opacity: 1 !important;\n  font-size: 12px;\n}\n.form-control:focus::-moz-placeholder {\n  color: #6c757d !important;\n  opacity: 0.7 !important;\n}\n.form-control:focus::placeholder {\n  color: #6c757d !important;\n  opacity: 0.7 !important;\n}\n.form-control.has-value::-moz-placeholder {\n  color: #6c757d !important;\n  opacity: 0.7 !important;\n}\n.form-control.has-value::placeholder {\n  color: #6c757d !important;\n  opacity: 0.7 !important;\n}\n\n/* Input icons - add left padding and background icons for all fields */\n.member-form .form-control {\n  padding-left: 36px;\n  background-repeat: no-repeat;\n  background-position: 10px 50%;\n  background-size: 16px 16px;\n}\n\n/* Text-like inputs (default user icon) */\n.member-form input[type=text].form-control {\n  background-image: url('data:image/svg+xml;utf8,<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"16\" height=\"16\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"%236c757d\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2\"/><circle cx=\"12\" cy=\"7\" r=\"4\"/></svg>');\n}\n\n/* Email */\n.member-form input[type=email].form-control {\n  background-image: url('data:image/svg+xml;utf8,<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"16\" height=\"16\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"%236c757d\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M4 4h16v16H4z\"/><path d=\"M22 6l-10 7L2 6\"/></svg>');\n}\n\n/* Telephone */\n.member-form input[type=tel].form-control {\n  background-image: url('data:image/svg+xml;utf8,<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"16\" height=\"16\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"%236c757d\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.09 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.12.81.3 1.6.54 2.36a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.72-1.11a2 2 0 0 1 2.11-.45c.76.24 1.55.42 2.36.54A2 2 0 0 1 22 16.92z\"/></svg>');\n}\n\n/* Number */\n.member-form input[type=number].form-control {\n  background-image: url('data:image/svg+xml;utf8,<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"16\" height=\"16\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"%236c757d\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M5 3v18\"/><path d=\"M19 3v18\"/><path d=\"M5 7h14\"/><path d=\"M5 17h14\"/></svg>');\n}\n\n/* Date */\n.member-form input[type=date].form-control {\n  background-image: url('data:image/svg+xml;utf8,<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"16\" height=\"16\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"%236c757d\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><rect x=\"3\" y=\"4\" width=\"18\" height=\"18\" rx=\"2\" ry=\"2\"/><line x1=\"16\" y1=\"2\" x2=\"16\" y2=\"6\"/><line x1=\"8\" y1=\"2\" x2=\"8\" y2=\"6\"/><line x1=\"3\" y1=\"10\" x2=\"21\" y2=\"10\"/></svg>');\n}\n\n/* Select */\n.member-form select.form-control {\n  background-image: url('data:image/svg+xml;utf8,<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"16\" height=\"16\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"%236c757d\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><polyline points=\"6 9 12 15 18 9\"/></svg>');\n}\n\n/* Multi-select (Specializations) - show tags icon and pin to top-left */\n.member-form select[multiple].form-control {\n  background-image: url('data:image/svg+xml;utf8,<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"16\" height=\"16\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"%236c757d\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M20.59 13.41L11 3H4v7l9.59 9.59a2 2 0 0 0 2.82 0l4.18-4.18a2 2 0 0 0 0-2.82z\"/><path d=\"M7 7h.01\"/></svg>');\n  background-position: 10px 10px;\n  background-attachment: local;\n}\n\n/* Textarea */\n.member-form textarea.form-control {\n  background-image: url('data:image/svg+xml;utf8,<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"16\" height=\"16\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"%236c757d\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z\"/></svg>');\n}\n\n/* Ensure placeholders are visible in all browsers */\n.form-control::-webkit-input-placeholder {\n  color: #6c757d !important;\n  opacity: 1 !important;\n}\n.form-control::-moz-placeholder {\n  color: #6c757d !important;\n  opacity: 1 !important;\n}\n.form-control:-ms-input-placeholder {\n  color: #6c757d !important;\n  opacity: 1 !important;\n}\n.form-control:-moz-placeholder {\n  color: #6c757d !important;\n  opacity: 1 !important;\n}\n\n/* Additional styling to ensure placeholders are visible */\ninput[type=text]::-moz-placeholder, input[type=email]::-moz-placeholder, input[type=tel]::-moz-placeholder, input[type=date]::-moz-placeholder, textarea::-moz-placeholder {\n  color: #6c757d !important;\n  opacity: 1 !important;\n  font-size: 12px !important;\n}\ninput[type=text]::placeholder,\ninput[type=email]::placeholder,\ninput[type=tel]::placeholder,\ninput[type=date]::placeholder,\ntextarea::placeholder {\n  color: #6c757d !important;\n  opacity: 1 !important;\n  font-size: 12px !important;\n}\n\n/* Force placeholder visibility */\n.form-control:not(:focus):not(.has-value)::-moz-placeholder {\n  color: #6c757d !important;\n  opacity: 1 !important;\n  visibility: visible !important;\n}\n.form-control:not(:focus):not(.has-value)::placeholder {\n  color: #6c757d !important;\n  opacity: 1 !important;\n  visibility: visible !important;\n}\n.file-input {\n  display: none;\n}\n.submit-section {\n  text-align: center;\n  margin-top: 10px;\n  padding-top: 10px;\n  border-top: 1px solid #dcdcdc;\n}\n.submit-btn {\n  background: #ff4040;\n  color: white;\n  border: none;\n  padding: 10px 25px;\n  border-radius: 25px;\n  font-size: 1rem;\n  font-weight: 600;\n  cursor: pointer;\n  transition: all 0.3s ease;\n  box-shadow: 0 8px 20px rgba(255, 64, 64, 0.3);\n  display: inline-flex;\n  align-items: center;\n  gap: 8px;\n}\n.submit-btn:hover {\n  transform: translateY(-2px);\n  background: #e63939;\n  box-shadow: 0 15px 40px rgba(255, 64, 64, 0.4);\n}\n.submit-btn:active {\n  transform: translateY(0);\n}\n\n/* Required field asterisk styling */\n.required-asterisk {\n  color: #dc3545;\n  font-weight: bold;\n  margin-left: 2px;\n}\n\n/* Responsive Design */\n@media (max-width: 768px) {\n.member-form {\n    padding: 15px;\n}\n.form-header {\n    padding: 15px;\n    flex-direction: column;\n    gap: 10px;\n}\n.header-content {\n    flex-direction: column;\n    gap: 10px;\n}\n.form-title {\n    font-size: 1.2rem;\n}\n.form-subtitle {\n    font-size: 0.8rem;\n}\n.header-icon {\n    width: 50px;\n    height: 50px;\n    font-size: 18px;\n}\n.client-data-layout {\n    flex-direction: column;\n    gap: 15px;\n    align-items: stretch;\n}\n.profile-section {\n    flex: none;\n    align-items: center;\n    width: 100%;\n}\n.profile-picture {\n    width: 150px;\n    height: 150px;\n}\n.form-fields-section {\n    padding: 10px;\n    width: 100%;\n}\n}\n/* Webcam Modal Styles */\n.webcam-modal-overlay {\n  position: fixed;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  background: rgba(0, 0, 0, 0.8);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  z-index: 1000;\n}\n.webcam-modal {\n  background: white;\n  border-radius: 12px;\n  padding: 20px;\n  max-width: 400px;\n  width: 90%;\n  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);\n}\n.webcam-header {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  margin-bottom: 15px;\n  font-size: 18px;\n  font-weight: 600;\n  color: #333;\n}\n.close-btn {\n  background: none;\n  border: none;\n  font-size: 24px;\n  cursor: pointer;\n  color: #666;\n  padding: 0;\n  width: 30px;\n  height: 30px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  border-radius: 50%;\n  transition: all 0.2s ease;\n}\n.close-btn:hover {\n  background: #f0f0f0;\n  color: #333;\n}\n.webcam-video-container {\n  display: flex;\n  justify-content: center;\n  margin-bottom: 15px;\n}\n.webcam-actions {\n  display: flex;\n  gap: 10px;\n  justify-content: center;\n}\n.btn {\n  padding: 8px 16px;\n  border: none;\n  border-radius: 6px;\n  cursor: pointer;\n  font-size: 14px;\n  font-weight: 500;\n  transition: all 0.3s ease;\n  display: flex;\n  align-items: center;\n  gap: 6px;\n}\n.btn-primary {\n  background: #ff4040;\n  color: white;\n}\n.btn-primary:hover {\n  background: #e63939;\n  transform: translateY(-1px);\n}\n.btn-secondary {\n  background: #6c757d;\n  color: white;\n}\n.btn-secondary:hover {\n  background: #5a6268;\n  transform: translateY(-1px);\n}\n\n/* Multiple select styling */\nselect[multiple] {\n  min-height: 100px;\n  padding: 8px;\n}\nselect[multiple] option {\n  padding: 4px 8px;\n  margin: 2px 0;\n}\nselect[multiple] option:checked {\n  background: #ff4040;\n  color: white;\n}\n\n/* Textarea styling */\ntextarea.form-control {\n  resize: vertical;\n  min-height: 80px;\n}\n\n/* Birthday inputs */\n.birthday-inputs {\n  display: flex;\n  gap: 10px;\n}\n.birthday-inputs .birthday-select {\n  flex: 1;\n}\n\n/* Tooltip styles */\n.tooltip-wrapper {\n  position: relative;\n  display: inline-block;\n  margin-left: 5px;\n  cursor: help;\n}\n.tooltip-wrapper .tooltip-content {\n  position: absolute;\n  bottom: 100%;\n  left: 50%;\n  transform: translateX(-50%);\n  background: #333;\n  color: white;\n  padding: 8px 12px;\n  border-radius: 4px;\n  font-size: 12px;\n  white-space: nowrap;\n  opacity: 0;\n  visibility: hidden;\n  transition: opacity 0.3s, visibility 0.3s;\n  margin-bottom: 5px;\n  z-index: 1000;\n  min-width: 200px;\n  white-space: normal;\n  text-align: left;\n}\n.tooltip-wrapper .tooltip-content.is-visible {\n  opacity: 1;\n  visibility: visible;\n}\n.tooltip-wrapper .tooltip-content::after {\n  content: \"\";\n  position: absolute;\n  top: 100%;\n  left: 50%;\n  transform: translateX(-50%);\n  border: 5px solid transparent;\n  border-top-color: #333;\n}\n.tooltip-wrapper:hover .tooltip-content {\n  opacity: 1;\n  visibility: visible;\n}\n\n/* Privileges checkboxes */\n.privileges-checkboxes {\n  display: flex;\n  flex-direction: column;\n  gap: 10px;\n  padding: 10px;\n  background: #f8f9fa;\n  border-radius: 4px;\n}\n.privileges-checkboxes .custom-checkbox {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  cursor: pointer;\n}\n.privileges-checkboxes .custom-checkbox input[type=checkbox] {\n  width: 18px;\n  height: 18px;\n  cursor: pointer;\n}\n.privileges-checkboxes .custom-checkbox .checkbox-label {\n  flex: 1;\n  font-size: 14px;\n}\n.privileges-checkboxes .custom-checkbox .info-icon-small {\n  color: #6c757d;\n  font-size: 12px;\n  cursor: help;\n}\n\n/* Custom checkbox and radio styles */\n.custom-checkbox {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  cursor: pointer;\n}\n.custom-checkbox input[type=checkbox],\n.custom-checkbox input[type=radio] {\n  width: 18px;\n  height: 18px;\n  cursor: pointer;\n}\n.custom-checkbox .checkmark {\n  display: none;\n}\n.custom-checkbox .checkbox-label {\n  font-size: 14px;\n  display: flex;\n  align-items: center;\n  gap: 5px;\n}\n.invitation-checkbox {\n  margin-bottom: 10px;\n  padding: 8px;\n  border-radius: 4px;\n  transition: background 0.2s;\n}\n.invitation-checkbox:hover {\n  background: #f8f9fa;\n}\n.form-group.compact {\n  margin-bottom: 10px;\n}\n\n/* Loading Overlay Styles */\n.loading-overlay {\n  position: fixed;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  background: rgba(255, 255, 255, 0.9);\n  z-index: 9999;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n.loading-overlay .loading_wrap {\n  position: relative;\n  width: 100%;\n  height: 100%;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  background: transparent;\n}\n.loading-overlay .loader_logo {\n  position: absolute;\n  height: 80px;\n  width: 80px;\n  left: calc(50% - 40px);\n  top: calc(50% - 80px);\n  z-index: 10000;\n}\n.loading-overlay .loader_logo img {\n  height: 100%;\n  width: 100%;\n  -o-object-fit: contain;\n     object-fit: contain;\n}\n.loading-overlay .loading {\n  border: 3px solid rgba(102, 51, 153, 0.45);\n  position: absolute;\n  left: calc(50% - 27.5px);\n  top: calc(50% + 20px);\n  width: 55px;\n  height: 55px;\n  border-radius: 50%;\n  border-top-color: #ff4040;\n  animation: loader 1s ease-in-out infinite;\n  -webkit-animation: loader 1s ease-in-out infinite;\n}\n@keyframes loader {\nto {\n    transform: rotate(360deg);\n}\n}\n/* Disable submit button when loading */\n.submit-btn:disabled {\n  opacity: 0.6;\n  cursor: not-allowed;\n  pointer-events: none;\n}\n\n/* Field Error Styling */\n.field-error {\n  color: #dc3545;\n  font-size: 12px;\n  margin-top: 4px;\n  display: flex;\n  align-items: center;\n  gap: 4px;\n  font-weight: 500;\n  animation: fadeIn 0.3s ease;\n}\n.field-error::before {\n  content: \"⚠\";\n  font-size: 14px;\n  margin-right: 2px;\n}\n@keyframes fadeIn {\nfrom {\n    opacity: 0;\n    transform: translateY(-5px);\n}\nto {\n    opacity: 1;\n    transform: translateY(0);\n}\n}\n/* Invalid Input Styling */\n.form-control.is-invalid {\n  border-color: #dc3545 !important;\n  background-color: #fff5f5 !important;\n  padding-right: 35px;\n}\n.form-control.is-invalid:focus {\n  border-color: #dc3545 !important;\n  box-shadow: 0 0 0 2px rgba(220, 53, 69, 0.25) !important;\n  background-color: #fff !important;\n}\n\n/* Birthday Inputs Wrapper */\n.birthday-inputs-wrapper {\n  display: flex;\n  flex-direction: column;\n  gap: 4px;\n}\n.birthday-inputs {\n  display: flex;\n  gap: 10px;\n}\n.birthday-select.is-invalid {\n  border-color: #dc3545 !important;\n  background-color: #fff5f5 !important;\n}\n\n/* Ensure error messages don't break layout */\n.form-group {\n  display: flex;\n  flex-direction: column;\n  gap: 8px;\n}\n\n/* Error message positioning */\n.form-group .field-error {\n  order: 2;\n}\n\n/* Select error styling */\nselect.form-control.is-invalid {\n  background-image: url(\"data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23dc3545' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6,9 12,15 18,9'%3e%3c/polyline%3e%3c/svg%3e\"), url(\"data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23dc3545' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3ccircle cx='12' cy='12' r='10'/%3e%3cline x1='12' y1='8' x2='12' y2='12'/%3e%3cline x1='12' y1='16' x2='12.01' y2='16'/%3e%3c/svg%3e\");\n  background-position: right 12px center, right 35px center;\n  background-size: 16px, 14px;\n  padding-right: 55px;\n}\n\n/* Responsive error messages */\n@media (max-width: 768px) {\n.field-error {\n    font-size: 11px;\n    margin-top: 3px;\n}\n.birthday-inputs-wrapper {\n    width: 100%;\n}\n.birthday-inputs {\n    width: 100%;\n    gap: 6px;\n}\n}", ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-12.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12.use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-12.use[3]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/Staff/newcoach.vue?vue&type=style&index=0&id=048fe306&lang=scss":
/*!*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-12.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12.use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-12.use[3]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/Staff/newcoach.vue?vue&type=style&index=0&id=048fe306&lang=scss ***!
  \*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../../../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_clonedRuleSet_12_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_12_use_2_node_modules_sass_loader_dist_cjs_js_clonedRuleSet_12_use_3_node_modules_vue_loader_lib_index_js_vue_loader_options_newcoach_vue_vue_type_style_index_0_id_048fe306_lang_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !!../../../../../../node_modules/css-loader/dist/cjs.js??clonedRuleSet-12.use[1]!../../../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12.use[2]!../../../../../../node_modules/sass-loader/dist/cjs.js??clonedRuleSet-12.use[3]!../../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./newcoach.vue?vue&type=style&index=0&id=048fe306&lang=scss */ "./node_modules/css-loader/dist/cjs.js??clonedRuleSet-12.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12.use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-12.use[3]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/Staff/newcoach.vue?vue&type=style&index=0&id=048fe306&lang=scss");

            

var options = {};

options.insert = "head";
options.singleton = false;

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_clonedRuleSet_12_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_12_use_2_node_modules_sass_loader_dist_cjs_js_clonedRuleSet_12_use_3_node_modules_vue_loader_lib_index_js_vue_loader_options_newcoach_vue_vue_type_style_index_0_id_048fe306_lang_scss__WEBPACK_IMPORTED_MODULE_1__["default"], options);



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_clonedRuleSet_12_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_12_use_2_node_modules_sass_loader_dist_cjs_js_clonedRuleSet_12_use_3_node_modules_vue_loader_lib_index_js_vue_loader_options_newcoach_vue_vue_type_style_index_0_id_048fe306_lang_scss__WEBPACK_IMPORTED_MODULE_1__["default"].locals || {});

/***/ }),

/***/ "./resources/src/views/app/pages/Staff/newcoach.vue":
/*!**********************************************************!*\
  !*** ./resources/src/views/app/pages/Staff/newcoach.vue ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _newcoach_vue_vue_type_template_id_048fe306__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./newcoach.vue?vue&type=template&id=048fe306 */ "./resources/src/views/app/pages/Staff/newcoach.vue?vue&type=template&id=048fe306");
/* harmony import */ var _newcoach_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./newcoach.vue?vue&type=script&lang=js */ "./resources/src/views/app/pages/Staff/newcoach.vue?vue&type=script&lang=js");
/* harmony import */ var _newcoach_vue_vue_type_style_index_0_id_048fe306_lang_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./newcoach.vue?vue&type=style&index=0&id=048fe306&lang=scss */ "./resources/src/views/app/pages/Staff/newcoach.vue?vue&type=style&index=0&id=048fe306&lang=scss");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");



;


/* normalize component */

var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _newcoach_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__["default"],
  _newcoach_vue_vue_type_template_id_048fe306__WEBPACK_IMPORTED_MODULE_0__.render,
  _newcoach_vue_vue_type_template_id_048fe306__WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/src/views/app/pages/Staff/newcoach.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./resources/src/views/app/pages/Staff/newcoach.vue?vue&type=script&lang=js":
/*!**********************************************************************************!*\
  !*** ./resources/src/views/app/pages/Staff/newcoach.vue?vue&type=script&lang=js ***!
  \**********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_newcoach_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./newcoach.vue?vue&type=script&lang=js */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/Staff/newcoach.vue?vue&type=script&lang=js");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_newcoach_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/src/views/app/pages/Staff/newcoach.vue?vue&type=style&index=0&id=048fe306&lang=scss":
/*!*******************************************************************************************************!*\
  !*** ./resources/src/views/app/pages/Staff/newcoach.vue?vue&type=style&index=0&id=048fe306&lang=scss ***!
  \*******************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_dist_cjs_js_node_modules_css_loader_dist_cjs_js_clonedRuleSet_12_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_12_use_2_node_modules_sass_loader_dist_cjs_js_clonedRuleSet_12_use_3_node_modules_vue_loader_lib_index_js_vue_loader_options_newcoach_vue_vue_type_style_index_0_id_048fe306_lang_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/style-loader/dist/cjs.js!../../../../../../node_modules/css-loader/dist/cjs.js??clonedRuleSet-12.use[1]!../../../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12.use[2]!../../../../../../node_modules/sass-loader/dist/cjs.js??clonedRuleSet-12.use[3]!../../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./newcoach.vue?vue&type=style&index=0&id=048fe306&lang=scss */ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-12.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12.use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-12.use[3]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/Staff/newcoach.vue?vue&type=style&index=0&id=048fe306&lang=scss");


/***/ }),

/***/ "./resources/src/views/app/pages/Staff/newcoach.vue?vue&type=template&id=048fe306":
/*!****************************************************************************************!*\
  !*** ./resources/src/views/app/pages/Staff/newcoach.vue?vue&type=template&id=048fe306 ***!
  \****************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_newcoach_vue_vue_type_template_id_048fe306__WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   staticRenderFns: () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_newcoach_vue_vue_type_template_id_048fe306__WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_newcoach_vue_vue_type_template_id_048fe306__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./newcoach.vue?vue&type=template&id=048fe306 */ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/Staff/newcoach.vue?vue&type=template&id=048fe306");


/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/Staff/newcoach.vue?vue&type=template&id=048fe306":
/*!*******************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/Staff/newcoach.vue?vue&type=template&id=048fe306 ***!
  \*******************************************************************************************************************************************************************************************************************************/
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
  return _c("div", { staticClass: "member-form-container" }, [
    _c("div", { staticClass: "container" }, [
      _c("div", { staticClass: "form-card" }, [
        _c("div", { staticClass: "form-header" }, [
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
                _c(
                  "ol",
                  {
                    staticClass: "breadcrumb",
                    staticStyle: {
                      background: "transparent",
                      padding: "0",
                      margin: "0",
                    },
                  },
                  [
                    _c(
                      "li",
                      { staticClass: "breadcrumb-item" },
                      [
                        _c(
                          "router-link",
                          { attrs: { to: "/app/Staff/coachlist" } },
                          [_vm._v("Coaches")]
                        ),
                      ],
                      1
                    ),
                    _vm._v(" "),
                    _c(
                      "li",
                      {
                        staticClass: "breadcrumb-item active",
                        attrs: { "aria-current": "page" },
                      },
                      [_vm._v("\n              Add coach\n            ")]
                    ),
                  ]
                ),
              ]),
            ]
          ),
          _vm._v(" "),
          _vm._m(0),
        ]),
        _vm._v(" "),
        _c(
          "form",
          {
            staticClass: "member-form",
            on: {
              submit: function ($event) {
                $event.preventDefault()
                return _vm.submitForm.apply(null, arguments)
              },
            },
          },
          [
            _c("div", { staticClass: "client-data-layout" }, [
              _c("div", { staticClass: "profile-section" }, [
                _c("div", { staticClass: "profile-picture-container" }, [
                  _c(
                    "div",
                    {
                      staticClass: "profile-picture",
                      on: {
                        click: function ($event) {
                          return _vm.$refs.fileInput.click()
                        },
                      },
                    },
                    [
                      !_vm.photoUrl
                        ? _c("div", { staticClass: "profile-placeholder" }, [
                            _c("i", { staticClass: "fas fa-user" }),
                          ])
                        : _c("div", { staticClass: "profile-image" }, [
                            _c("img", {
                              staticClass: "preview-image",
                              attrs: {
                                src: _vm.photoUrl,
                                alt: "Profile Preview",
                              },
                            }),
                          ]),
                    ]
                  ),
                  _vm._v(" "),
                  _c(
                    "button",
                    {
                      staticClass: "change-button",
                      attrs: { type: "button" },
                      on: {
                        click: function ($event) {
                          return _vm.$refs.fileInput.click()
                        },
                      },
                    },
                    [_vm._v("\n              Add Photo\n            ")]
                  ),
                  _vm._v(" "),
                  _c(
                    "button",
                    {
                      staticClass: "webcam-button",
                      attrs: { type: "button" },
                      on: { click: _vm.openWebcam },
                    },
                    [_vm._v("\n              Webcam snapshot\n            ")]
                  ),
                  _vm._v(" "),
                  _c("input", {
                    ref: "fileInput",
                    staticClass: "file-input",
                    attrs: { type: "file", accept: "image/*" },
                    on: { change: _vm.previewPhoto },
                  }),
                ]),
              ]),
              _vm._v(" "),
              _c("div", { staticClass: "form-fields-section" }, [
                _c("h3", { staticClass: "section-title" }, [
                  _vm._v("Coach data"),
                ]),
                _vm._v(" "),
                _c("div", { staticClass: "form-fields" }, [
                  _c("div", { staticClass: "form-group" }, [
                    _c("label", { staticClass: "form-label" }, [
                      _vm._v(
                        "\n                Own coach ID\n                "
                      ),
                      _c(
                        "span",
                        {
                          staticClass: "tooltip-wrapper",
                          on: {
                            click: function ($event) {
                              $event.stopPropagation()
                              _vm.showOwnEmployeeIdInfo =
                                !_vm.showOwnEmployeeIdInfo
                            },
                          },
                        },
                        [
                          _c("i", {
                            staticClass: "fas fa-info-circle info-icon",
                          }),
                          _vm._v(" "),
                          _c(
                            "span",
                            {
                              staticClass: "tooltip-content",
                              class: {
                                "is-visible": _vm.showOwnEmployeeIdInfo,
                              },
                            },
                            [
                              _vm._v(
                                "\n                    Use if you have a custom ID you assign. Appears on exports and labels.\n                  "
                              ),
                            ]
                          ),
                        ]
                      ),
                    ]),
                    _vm._v(" "),
                    _c("input", {
                      directives: [
                        {
                          name: "model",
                          rawName: "v-model",
                          value: _vm.member.ownEmployeeId,
                          expression: "member.ownEmployeeId",
                        },
                      ],
                      staticClass: "form-control",
                      class: { "has-value": _vm.member.ownEmployeeId },
                      attrs: { type: "text", placeholder: "Own coach ID" },
                      domProps: { value: _vm.member.ownEmployeeId },
                      on: {
                        input: function ($event) {
                          if ($event.target.composing) {
                            return
                          }
                          _vm.$set(
                            _vm.member,
                            "ownEmployeeId",
                            $event.target.value
                          )
                        },
                      },
                    }),
                  ]),
                  _vm._v(" "),
                  _c("div", { staticClass: "form-group" }, [
                    _c("label", { staticClass: "form-label" }, [
                      _vm._v(
                        "\n                Custom export field\n                "
                      ),
                      _c(
                        "span",
                        {
                          staticClass: "tooltip-wrapper",
                          on: {
                            click: function ($event) {
                              $event.stopPropagation()
                              _vm.showCustomExportFieldInfo =
                                !_vm.showCustomExportFieldInfo
                            },
                          },
                        },
                        [
                          _c("i", {
                            staticClass: "fas fa-info-circle info-icon",
                          }),
                          _vm._v(" "),
                          _c(
                            "span",
                            {
                              staticClass: "tooltip-content",
                              class: {
                                "is-visible": _vm.showCustomExportFieldInfo,
                              },
                            },
                            [
                              _vm._v(
                                "\n                    This field is for custom export data. Appears on exports and labels.\n                  "
                              ),
                            ]
                          ),
                        ]
                      ),
                    ]),
                    _vm._v(" "),
                    _c("input", {
                      directives: [
                        {
                          name: "model",
                          rawName: "v-model",
                          value: _vm.member.customExportField,
                          expression: "member.customExportField",
                        },
                      ],
                      staticClass: "form-control",
                      class: { "has-value": _vm.member.customExportField },
                      attrs: {
                        type: "text",
                        placeholder: "Custom export field",
                      },
                      domProps: { value: _vm.member.customExportField },
                      on: {
                        input: function ($event) {
                          if ($event.target.composing) {
                            return
                          }
                          _vm.$set(
                            _vm.member,
                            "customExportField",
                            $event.target.value
                          )
                        },
                      },
                    }),
                  ]),
                  _vm._v(" "),
                  _c("div", { staticClass: "form-group" }, [
                    _vm._m(1),
                    _vm._v(" "),
                    _c("input", {
                      directives: [
                        {
                          name: "model",
                          rawName: "v-model",
                          value: _vm.member.firstName,
                          expression: "member.firstName",
                        },
                      ],
                      staticClass: "form-control",
                      class: {
                        "has-value": _vm.member.firstName,
                        "is-invalid": _vm.fieldErrors.firstName,
                      },
                      attrs: {
                        type: "text",
                        placeholder: "Enter first name",
                        required: "",
                      },
                      domProps: { value: _vm.member.firstName },
                      on: {
                        blur: function ($event) {
                          return _vm.validateField("firstName")
                        },
                        input: [
                          function ($event) {
                            if ($event.target.composing) {
                              return
                            }
                            _vm.$set(
                              _vm.member,
                              "firstName",
                              $event.target.value
                            )
                          },
                          function ($event) {
                            _vm.fieldErrors.firstName &&
                              _vm.validateField("firstName")
                          },
                        ],
                      },
                    }),
                    _vm._v(" "),
                    _vm.fieldErrors.firstName
                      ? _c("div", { staticClass: "field-error" }, [
                          _vm._v(
                            "\n                    " +
                              _vm._s(_vm.fieldErrors.firstName) +
                              "\n                "
                          ),
                        ])
                      : _vm._e(),
                  ]),
                  _vm._v(" "),
                  _c("div", { staticClass: "form-group" }, [
                    _vm._m(2),
                    _vm._v(" "),
                    _c("input", {
                      directives: [
                        {
                          name: "model",
                          rawName: "v-model",
                          value: _vm.member.lastName,
                          expression: "member.lastName",
                        },
                      ],
                      staticClass: "form-control",
                      class: {
                        "has-value": _vm.member.lastName,
                        "is-invalid": _vm.fieldErrors.lastName,
                      },
                      attrs: {
                        type: "text",
                        placeholder: "Enter last name",
                        required: "",
                      },
                      domProps: { value: _vm.member.lastName },
                      on: {
                        blur: function ($event) {
                          return _vm.validateField("lastName")
                        },
                        input: [
                          function ($event) {
                            if ($event.target.composing) {
                              return
                            }
                            _vm.$set(
                              _vm.member,
                              "lastName",
                              $event.target.value
                            )
                          },
                          function ($event) {
                            _vm.fieldErrors.lastName &&
                              _vm.validateField("lastName")
                          },
                        ],
                      },
                    }),
                    _vm._v(" "),
                    _vm.fieldErrors.lastName
                      ? _c("div", { staticClass: "field-error" }, [
                          _vm._v(
                            "\n                    " +
                              _vm._s(_vm.fieldErrors.lastName) +
                              "\n                "
                          ),
                        ])
                      : _vm._e(),
                  ]),
                  _vm._v(" "),
                  _c("div", { staticClass: "form-group" }, [
                    _vm._m(3),
                    _vm._v(" "),
                    _c(
                      "select",
                      {
                        directives: [
                          {
                            name: "model",
                            rawName: "v-model",
                            value: _vm.member.gender,
                            expression: "member.gender",
                          },
                        ],
                        staticClass: "form-control",
                        class: { "is-invalid": _vm.fieldErrors.gender },
                        attrs: { required: "" },
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
                                _vm.member,
                                "gender",
                                $event.target.multiple
                                  ? $$selectedVal
                                  : $$selectedVal[0]
                              )
                            },
                            function ($event) {
                              return _vm.validateField("gender")
                            },
                          ],
                          blur: function ($event) {
                            return _vm.validateField("gender")
                          },
                        },
                      },
                      [
                        _c("option", { attrs: { disabled: "", value: "" } }, [
                          _vm._v("Select Sex"),
                        ]),
                        _vm._v(" "),
                        _c("option", [_vm._v("Male")]),
                        _vm._v(" "),
                        _c("option", [_vm._v("Female")]),
                        _vm._v(" "),
                        _c("option", [_vm._v("Other")]),
                      ]
                    ),
                    _vm._v(" "),
                    _vm.fieldErrors.gender
                      ? _c("div", { staticClass: "field-error" }, [
                          _vm._v(
                            "\n                    " +
                              _vm._s(_vm.fieldErrors.gender) +
                              "\n                "
                          ),
                        ])
                      : _vm._e(),
                  ]),
                  _vm._v(" "),
                  _c("div", { staticClass: "form-group" }, [
                    _vm._m(4),
                    _vm._v(" "),
                    _c("div", { staticClass: "birthday-inputs-wrapper" }, [
                      _c("div", { staticClass: "birthday-inputs" }, [
                        _c(
                          "select",
                          {
                            directives: [
                              {
                                name: "model",
                                rawName: "v-model",
                                value: _vm.member.birthdayDay,
                                expression: "member.birthdayDay",
                              },
                            ],
                            staticClass: "form-control birthday-select",
                            class: {
                              "is-invalid":
                                _vm.fieldErrors.birthdayDay ||
                                _vm.fieldErrors.birthdayMonth ||
                                _vm.fieldErrors.birthdayYear,
                            },
                            attrs: { required: "" },
                            on: {
                              change: [
                                function ($event) {
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
                                    _vm.member,
                                    "birthdayDay",
                                    $event.target.multiple
                                      ? $$selectedVal
                                      : $$selectedVal[0]
                                  )
                                },
                                function ($event) {
                                  return _vm.validateField("birthdayDay")
                                },
                              ],
                              blur: function ($event) {
                                return _vm.validateField("birthdayDay")
                              },
                            },
                          },
                          [
                            _c("option", { attrs: { value: "" } }, [
                              _vm._v("Day"),
                            ]),
                            _vm._v(" "),
                            _vm._l(31, function (day) {
                              return _c(
                                "option",
                                { key: day, domProps: { value: day } },
                                [_vm._v(_vm._s(day))]
                              )
                            }),
                          ],
                          2
                        ),
                        _vm._v(" "),
                        _c(
                          "select",
                          {
                            directives: [
                              {
                                name: "model",
                                rawName: "v-model",
                                value: _vm.member.birthdayMonth,
                                expression: "member.birthdayMonth",
                              },
                            ],
                            staticClass: "form-control birthday-select",
                            class: {
                              "is-invalid":
                                _vm.fieldErrors.birthdayDay ||
                                _vm.fieldErrors.birthdayMonth ||
                                _vm.fieldErrors.birthdayYear,
                            },
                            attrs: { required: "" },
                            on: {
                              change: [
                                function ($event) {
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
                                    _vm.member,
                                    "birthdayMonth",
                                    $event.target.multiple
                                      ? $$selectedVal
                                      : $$selectedVal[0]
                                  )
                                },
                                function ($event) {
                                  return _vm.validateField("birthdayMonth")
                                },
                              ],
                              blur: function ($event) {
                                return _vm.validateField("birthdayMonth")
                              },
                            },
                          },
                          [
                            _c("option", { attrs: { value: "" } }, [
                              _vm._v("Month"),
                            ]),
                            _vm._v(" "),
                            _vm._l(_vm.months, function (month, index) {
                              return _c(
                                "option",
                                { key: index, domProps: { value: index + 1 } },
                                [_vm._v(_vm._s(month))]
                              )
                            }),
                          ],
                          2
                        ),
                        _vm._v(" "),
                        _c(
                          "select",
                          {
                            directives: [
                              {
                                name: "model",
                                rawName: "v-model",
                                value: _vm.member.birthdayYear,
                                expression: "member.birthdayYear",
                              },
                            ],
                            staticClass: "form-control birthday-select",
                            class: {
                              "is-invalid":
                                _vm.fieldErrors.birthdayDay ||
                                _vm.fieldErrors.birthdayMonth ||
                                _vm.fieldErrors.birthdayYear,
                            },
                            attrs: { required: "" },
                            on: {
                              change: [
                                function ($event) {
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
                                    _vm.member,
                                    "birthdayYear",
                                    $event.target.multiple
                                      ? $$selectedVal
                                      : $$selectedVal[0]
                                  )
                                },
                                function ($event) {
                                  return _vm.validateField("birthdayYear")
                                },
                              ],
                              blur: function ($event) {
                                return _vm.validateField("birthdayYear")
                              },
                            },
                          },
                          [
                            _c("option", { attrs: { value: "" } }, [
                              _vm._v("Year"),
                            ]),
                            _vm._v(" "),
                            _vm._l(_vm.availableYears, function (year) {
                              return _c(
                                "option",
                                { key: year, domProps: { value: year } },
                                [_vm._v(_vm._s(year))]
                              )
                            }),
                          ],
                          2
                        ),
                      ]),
                      _vm._v(" "),
                      _vm.fieldErrors.birthdayDay ||
                      _vm.fieldErrors.birthdayMonth ||
                      _vm.fieldErrors.birthdayYear
                        ? _c("div", { staticClass: "field-error" }, [
                            _vm._v(
                              "\n                    " +
                                _vm._s(
                                  _vm.fieldErrors.birthdayDay ||
                                    _vm.fieldErrors.birthdayMonth ||
                                    _vm.fieldErrors.birthdayYear
                                ) +
                                "\n                "
                            ),
                          ])
                        : _vm._e(),
                    ]),
                  ]),
                  _vm._v(" "),
                  _c("div", { staticClass: "form-group" }, [
                    _c("label", { staticClass: "form-label" }, [
                      _vm._v("Coach since"),
                    ]),
                    _vm._v(" "),
                    _c("input", {
                      directives: [
                        {
                          name: "model",
                          rawName: "v-model",
                          value: _vm.member.coachSince,
                          expression: "member.coachSince",
                        },
                      ],
                      staticClass: "form-control",
                      class: { "has-value": _vm.member.coachSince },
                      attrs: { type: "date" },
                      domProps: { value: _vm.member.coachSince },
                      on: {
                        input: function ($event) {
                          if ($event.target.composing) {
                            return
                          }
                          _vm.$set(
                            _vm.member,
                            "coachSince",
                            $event.target.value
                          )
                        },
                      },
                    }),
                  ]),
                  _vm._v(" "),
                  _c("div", { staticClass: "form-group" }, [
                    _vm._m(5),
                    _vm._v(" "),
                    _c(
                      "select",
                      {
                        directives: [
                          {
                            name: "model",
                            rawName: "v-model",
                            value: _vm.member.language,
                            expression: "member.language",
                          },
                        ],
                        staticClass: "form-control",
                        class: { "has-value": _vm.member.language },
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
                              _vm.member,
                              "language",
                              $event.target.multiple
                                ? $$selectedVal
                                : $$selectedVal[0]
                            )
                          },
                        },
                      },
                      [
                        _c("option", { attrs: { value: "English" } }, [
                          _vm._v("English"),
                        ]),
                        _vm._v(" "),
                        _c("option", { attrs: { value: "Spanish" } }, [
                          _vm._v("Spanish"),
                        ]),
                        _vm._v(" "),
                        _c("option", { attrs: { value: "French" } }, [
                          _vm._v("French"),
                        ]),
                        _vm._v(" "),
                        _c("option", { attrs: { value: "German" } }, [
                          _vm._v("German"),
                        ]),
                        _vm._v(" "),
                        _c("option", { attrs: { value: "Italian" } }, [
                          _vm._v("Italian"),
                        ]),
                        _vm._v(" "),
                        _c("option", { attrs: { value: "Portuguese" } }, [
                          _vm._v("Portuguese"),
                        ]),
                        _vm._v(" "),
                        _c("option", { attrs: { value: "Chinese" } }, [
                          _vm._v("Chinese"),
                        ]),
                        _vm._v(" "),
                        _c("option", { attrs: { value: "Japanese" } }, [
                          _vm._v("Japanese"),
                        ]),
                        _vm._v(" "),
                        _c("option", { attrs: { value: "Korean" } }, [
                          _vm._v("Korean"),
                        ]),
                        _vm._v(" "),
                        _c("option", { attrs: { value: "Arabic" } }, [
                          _vm._v("Arabic"),
                        ]),
                        _vm._v(" "),
                        _c("option", { attrs: { value: "Hindi" } }, [
                          _vm._v("Hindi"),
                        ]),
                        _vm._v(" "),
                        _c("option", { attrs: { value: "Russian" } }, [
                          _vm._v("Russian"),
                        ]),
                        _vm._v(" "),
                        _c("option", { attrs: { value: "Other" } }, [
                          _vm._v("Other"),
                        ]),
                      ]
                    ),
                  ]),
                  _vm._v(" "),
                  _c("div", { staticClass: "form-group" }, [
                    _c("label", { staticClass: "form-label" }, [
                      _vm._v("Privileges"),
                    ]),
                    _vm._v(" "),
                    _c(
                      "div",
                      { staticClass: "privileges-checkboxes" },
                      _vm._l(_vm.availablePrivileges, function (privilege) {
                        return _c(
                          "label",
                          {
                            key: privilege.value,
                            staticClass: "custom-checkbox",
                          },
                          [
                            _c("input", {
                              directives: [
                                {
                                  name: "model",
                                  rawName: "v-model",
                                  value: _vm.member.privileges,
                                  expression: "member.privileges",
                                },
                              ],
                              attrs: { type: "checkbox" },
                              domProps: {
                                value: privilege.value,
                                checked: Array.isArray(_vm.member.privileges)
                                  ? _vm._i(
                                      _vm.member.privileges,
                                      privilege.value
                                    ) > -1
                                  : _vm.member.privileges,
                              },
                              on: {
                                change: function ($event) {
                                  var $$a = _vm.member.privileges,
                                    $$el = $event.target,
                                    $$c = $$el.checked ? true : false
                                  if (Array.isArray($$a)) {
                                    var $$v = privilege.value,
                                      $$i = _vm._i($$a, $$v)
                                    if ($$el.checked) {
                                      $$i < 0 &&
                                        _vm.$set(
                                          _vm.member,
                                          "privileges",
                                          $$a.concat([$$v])
                                        )
                                    } else {
                                      $$i > -1 &&
                                        _vm.$set(
                                          _vm.member,
                                          "privileges",
                                          $$a
                                            .slice(0, $$i)
                                            .concat($$a.slice($$i + 1))
                                        )
                                    }
                                  } else {
                                    _vm.$set(_vm.member, "privileges", $$c)
                                  }
                                },
                              },
                            }),
                            _vm._v(" "),
                            _c("span", { staticClass: "checkmark" }),
                            _vm._v(" "),
                            _c("span", { staticClass: "checkbox-label" }, [
                              _vm._v(_vm._s(privilege.label)),
                            ]),
                            _vm._v(" "),
                            _c("span", { staticClass: "tooltip-wrapper" }, [
                              _c("i", {
                                staticClass:
                                  "fas fa-info-circle info-icon-small",
                              }),
                              _vm._v(" "),
                              _c("span", { staticClass: "tooltip-content" }, [
                                _vm._v(
                                  _vm._s(
                                    privilege.description ||
                                      "No description available"
                                  )
                                ),
                              ]),
                            ]),
                          ]
                        )
                      }),
                      0
                    ),
                  ]),
                  _vm._v(" "),
                  _c("div", { staticClass: "form-group" }, [
                    _vm._m(6),
                    _vm._v(" "),
                    _c("input", {
                      directives: [
                        {
                          name: "model",
                          rawName: "v-model",
                          value: _vm.member.email,
                          expression: "member.email",
                        },
                      ],
                      staticClass: "form-control",
                      class: {
                        "has-value": _vm.member.email,
                        "is-invalid": _vm.fieldErrors.email,
                      },
                      attrs: {
                        type: "email",
                        placeholder: "Email Address",
                        required: "",
                      },
                      domProps: { value: _vm.member.email },
                      on: {
                        blur: function ($event) {
                          return _vm.validateField("email")
                        },
                        input: [
                          function ($event) {
                            if ($event.target.composing) {
                              return
                            }
                            _vm.$set(_vm.member, "email", $event.target.value)
                          },
                          function ($event) {
                            _vm.fieldErrors.email && _vm.validateField("email")
                          },
                        ],
                      },
                    }),
                    _vm._v(" "),
                    _vm.fieldErrors.email
                      ? _c("div", { staticClass: "field-error" }, [
                          _vm._v(
                            "\n                  " +
                              _vm._s(_vm.fieldErrors.email) +
                              "\n              "
                          ),
                        ])
                      : _vm._e(),
                  ]),
                  _vm._v(" "),
                  _c("div", { staticClass: "form-group" }, [
                    _c("label", { staticClass: "form-label" }, [
                      _vm._v("Landline number"),
                    ]),
                    _vm._v(" "),
                    _c("input", {
                      directives: [
                        {
                          name: "model",
                          rawName: "v-model",
                          value: _vm.member.landline_phone,
                          expression: "member.landline_phone",
                        },
                      ],
                      staticClass: "form-control",
                      class: {
                        "has-value": _vm.member.landline_phone,
                        "is-invalid": _vm.fieldErrors.landline_phone,
                      },
                      attrs: { type: "tel", placeholder: "Landline Number" },
                      domProps: { value: _vm.member.landline_phone },
                      on: {
                        blur: function ($event) {
                          _vm.member.landline_phone &&
                            _vm.validateField("landline_phone")
                        },
                        input: [
                          function ($event) {
                            if ($event.target.composing) {
                              return
                            }
                            _vm.$set(
                              _vm.member,
                              "landline_phone",
                              $event.target.value
                            )
                          },
                          function ($event) {
                            _vm.fieldErrors.landline_phone &&
                              _vm.validateField("landline_phone")
                          },
                        ],
                      },
                    }),
                    _vm._v(" "),
                    _vm.fieldErrors.landline_phone
                      ? _c("div", { staticClass: "field-error" }, [
                          _vm._v(
                            "\n                    " +
                              _vm._s(_vm.fieldErrors.landline_phone) +
                              "\n                "
                          ),
                        ])
                      : _vm._e(),
                  ]),
                  _vm._v(" "),
                  _c("div", { staticClass: "form-group" }, [
                    _vm._m(7),
                    _vm._v(" "),
                    _c("input", {
                      directives: [
                        {
                          name: "model",
                          rawName: "v-model",
                          value: _vm.member.mobile_phone,
                          expression: "member.mobile_phone",
                        },
                      ],
                      staticClass: "form-control",
                      class: {
                        "has-value": _vm.member.mobile_phone,
                        "is-invalid": _vm.fieldErrors.mobile_phone,
                      },
                      attrs: {
                        type: "tel",
                        placeholder: "Mobile Phone Number",
                      },
                      domProps: { value: _vm.member.mobile_phone },
                      on: {
                        blur: function ($event) {
                          return _vm.validateField("mobile_phone")
                        },
                        input: [
                          function ($event) {
                            if ($event.target.composing) {
                              return
                            }
                            _vm.$set(
                              _vm.member,
                              "mobile_phone",
                              $event.target.value
                            )
                          },
                          function ($event) {
                            _vm.fieldErrors.mobile_phone &&
                              _vm.validateField("mobile_phone")
                          },
                        ],
                      },
                    }),
                    _vm._v(" "),
                    _vm.fieldErrors.mobile_phone
                      ? _c("div", { staticClass: "field-error" }, [
                          _vm._v(
                            "\n                  " +
                              _vm._s(_vm.fieldErrors.mobile_phone) +
                              "\n              "
                          ),
                        ])
                      : _vm._e(),
                  ]),
                ]),
                _vm._v(" "),
                _c("h5", { staticClass: "section-title" }, [
                  _vm._v("Address data"),
                ]),
                _vm._v(" "),
                _c("div", { staticClass: "form-fields" }, [
                  _c("div", { staticClass: "form-group" }, [
                    _vm._m(8),
                    _vm._v(" "),
                    _c("input", {
                      directives: [
                        {
                          name: "model",
                          rawName: "v-model",
                          value: _vm.member.address,
                          expression: "member.address",
                        },
                      ],
                      staticClass: "form-control",
                      class: {
                        "has-value": _vm.member.address,
                        "is-invalid": _vm.fieldErrors.address,
                      },
                      attrs: {
                        type: "text",
                        placeholder: "Address",
                        required: "",
                      },
                      domProps: { value: _vm.member.address },
                      on: {
                        blur: function ($event) {
                          return _vm.validateField("address")
                        },
                        input: [
                          function ($event) {
                            if ($event.target.composing) {
                              return
                            }
                            _vm.$set(_vm.member, "address", $event.target.value)
                          },
                          function ($event) {
                            _vm.fieldErrors.address &&
                              _vm.validateField("address")
                          },
                        ],
                      },
                    }),
                    _vm._v(" "),
                    _vm.fieldErrors.address
                      ? _c("div", { staticClass: "field-error" }, [
                          _vm._v(
                            "\n                  " +
                              _vm._s(_vm.fieldErrors.address) +
                              "\n              "
                          ),
                        ])
                      : _vm._e(),
                  ]),
                  _vm._v(" "),
                  _c("div", { staticClass: "form-group" }, [
                    _vm._m(9),
                    _vm._v(" "),
                    _c("input", {
                      directives: [
                        {
                          name: "model",
                          rawName: "v-model",
                          value: _vm.member.city,
                          expression: "member.city",
                        },
                      ],
                      staticClass: "form-control",
                      class: {
                        "has-value": _vm.member.city,
                        "is-invalid": _vm.fieldErrors.city,
                      },
                      attrs: {
                        type: "text",
                        placeholder: "City",
                        required: "",
                      },
                      domProps: { value: _vm.member.city },
                      on: {
                        blur: function ($event) {
                          return _vm.validateField("city")
                        },
                        input: [
                          function ($event) {
                            if ($event.target.composing) {
                              return
                            }
                            _vm.$set(_vm.member, "city", $event.target.value)
                          },
                          function ($event) {
                            _vm.fieldErrors.city && _vm.validateField("city")
                          },
                        ],
                      },
                    }),
                    _vm._v(" "),
                    _vm.fieldErrors.city
                      ? _c("div", { staticClass: "field-error" }, [
                          _vm._v(
                            "\n                  " +
                              _vm._s(_vm.fieldErrors.city) +
                              "\n              "
                          ),
                        ])
                      : _vm._e(),
                  ]),
                  _vm._v(" "),
                  _c("div", { staticClass: "form-group" }, [
                    _vm._m(10),
                    _vm._v(" "),
                    _c("input", {
                      directives: [
                        {
                          name: "model",
                          rawName: "v-model",
                          value: _vm.member.state,
                          expression: "member.state",
                        },
                      ],
                      staticClass: "form-control",
                      class: {
                        "has-value": _vm.member.state,
                        "is-invalid": _vm.fieldErrors.state,
                      },
                      attrs: {
                        type: "text",
                        placeholder: "State",
                        required: "",
                      },
                      domProps: { value: _vm.member.state },
                      on: {
                        blur: function ($event) {
                          return _vm.validateField("state")
                        },
                        input: [
                          function ($event) {
                            if ($event.target.composing) {
                              return
                            }
                            _vm.$set(_vm.member, "state", $event.target.value)
                          },
                          function ($event) {
                            _vm.fieldErrors.state && _vm.validateField("state")
                          },
                        ],
                      },
                    }),
                    _vm._v(" "),
                    _vm.fieldErrors.state
                      ? _c("div", { staticClass: "field-error" }, [
                          _vm._v(
                            "\n                  " +
                              _vm._s(_vm.fieldErrors.state) +
                              "\n              "
                          ),
                        ])
                      : _vm._e(),
                  ]),
                  _vm._v(" "),
                  _c("div", { staticClass: "form-group" }, [
                    _vm._m(11),
                    _vm._v(" "),
                    _c("input", {
                      directives: [
                        {
                          name: "model",
                          rawName: "v-model",
                          value: _vm.member.zip,
                          expression: "member.zip",
                        },
                      ],
                      staticClass: "form-control",
                      class: {
                        "has-value": _vm.member.zip,
                        "is-invalid": _vm.fieldErrors.zip,
                      },
                      attrs: {
                        type: "text",
                        placeholder: "ZIP Code",
                        required: "",
                      },
                      domProps: { value: _vm.member.zip },
                      on: {
                        blur: function ($event) {
                          return _vm.validateField("zip")
                        },
                        input: [
                          function ($event) {
                            if ($event.target.composing) {
                              return
                            }
                            _vm.$set(_vm.member, "zip", $event.target.value)
                          },
                          function ($event) {
                            _vm.fieldErrors.zip && _vm.validateField("zip")
                          },
                        ],
                      },
                    }),
                    _vm._v(" "),
                    _vm.fieldErrors.zip
                      ? _c("div", { staticClass: "field-error" }, [
                          _vm._v(
                            "\n                  " +
                              _vm._s(_vm.fieldErrors.zip) +
                              "\n              "
                          ),
                        ])
                      : _vm._e(),
                  ]),
                  _vm._v(" "),
                  _c("div", { staticClass: "form-group" }, [
                    _c("label", { staticClass: "form-label" }, [
                      _vm._v("Country"),
                    ]),
                    _vm._v(" "),
                    _c(
                      "select",
                      {
                        directives: [
                          {
                            name: "model",
                            rawName: "v-model",
                            value: _vm.member.country,
                            expression: "member.country",
                          },
                        ],
                        staticClass: "form-control",
                        class: { "has-value": _vm.member.country },
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
                              _vm.member,
                              "country",
                              $event.target.multiple
                                ? $$selectedVal
                                : $$selectedVal[0]
                            )
                          },
                        },
                      },
                      [
                        _c("option", { attrs: { value: "" } }, [
                          _vm._v("Select Country"),
                        ]),
                        _vm._v(" "),
                        _c("option", { attrs: { value: "Afghanistan" } }, [
                          _vm._v("Afghanistan"),
                        ]),
                        _vm._v(" "),
                        _c("option", { attrs: { value: "Albania" } }, [
                          _vm._v("Albania"),
                        ]),
                        _vm._v(" "),
                        _c("option", { attrs: { value: "Algeria" } }, [
                          _vm._v("Algeria"),
                        ]),
                        _vm._v(" "),
                        _c("option", { attrs: { value: "Argentina" } }, [
                          _vm._v("Argentina"),
                        ]),
                        _vm._v(" "),
                        _c("option", { attrs: { value: "Australia" } }, [
                          _vm._v("Australia"),
                        ]),
                        _vm._v(" "),
                        _c("option", { attrs: { value: "Austria" } }, [
                          _vm._v("Austria"),
                        ]),
                        _vm._v(" "),
                        _c("option", { attrs: { value: "Bangladesh" } }, [
                          _vm._v("Bangladesh"),
                        ]),
                        _vm._v(" "),
                        _c("option", { attrs: { value: "Belgium" } }, [
                          _vm._v("Belgium"),
                        ]),
                        _vm._v(" "),
                        _c("option", { attrs: { value: "Brazil" } }, [
                          _vm._v("Brazil"),
                        ]),
                        _vm._v(" "),
                        _c("option", { attrs: { value: "Bulgaria" } }, [
                          _vm._v("Bulgaria"),
                        ]),
                        _vm._v(" "),
                        _c("option", { attrs: { value: "Canada" } }, [
                          _vm._v("Canada"),
                        ]),
                        _vm._v(" "),
                        _c("option", { attrs: { value: "Chile" } }, [
                          _vm._v("Chile"),
                        ]),
                        _vm._v(" "),
                        _c("option", { attrs: { value: "China" } }, [
                          _vm._v("China"),
                        ]),
                        _vm._v(" "),
                        _c("option", { attrs: { value: "Colombia" } }, [
                          _vm._v("Colombia"),
                        ]),
                        _vm._v(" "),
                        _c("option", { attrs: { value: "Croatia" } }, [
                          _vm._v("Croatia"),
                        ]),
                        _vm._v(" "),
                        _c("option", { attrs: { value: "Czech Republic" } }, [
                          _vm._v("Czech Republic"),
                        ]),
                        _vm._v(" "),
                        _c("option", { attrs: { value: "Denmark" } }, [
                          _vm._v("Denmark"),
                        ]),
                        _vm._v(" "),
                        _c("option", { attrs: { value: "Egypt" } }, [
                          _vm._v("Egypt"),
                        ]),
                        _vm._v(" "),
                        _c("option", { attrs: { value: "Finland" } }, [
                          _vm._v("Finland"),
                        ]),
                        _vm._v(" "),
                        _c("option", { attrs: { value: "France" } }, [
                          _vm._v("France"),
                        ]),
                        _vm._v(" "),
                        _c("option", { attrs: { value: "Germany" } }, [
                          _vm._v("Germany"),
                        ]),
                        _vm._v(" "),
                        _c("option", { attrs: { value: "Greece" } }, [
                          _vm._v("Greece"),
                        ]),
                        _vm._v(" "),
                        _c("option", { attrs: { value: "Hong Kong" } }, [
                          _vm._v("Hong Kong"),
                        ]),
                        _vm._v(" "),
                        _c("option", { attrs: { value: "Hungary" } }, [
                          _vm._v("Hungary"),
                        ]),
                        _vm._v(" "),
                        _c("option", { attrs: { value: "Iceland" } }, [
                          _vm._v("Iceland"),
                        ]),
                        _vm._v(" "),
                        _c("option", { attrs: { value: "India" } }, [
                          _vm._v("India"),
                        ]),
                        _vm._v(" "),
                        _c("option", { attrs: { value: "Indonesia" } }, [
                          _vm._v("Indonesia"),
                        ]),
                        _vm._v(" "),
                        _c("option", { attrs: { value: "Iran" } }, [
                          _vm._v("Iran"),
                        ]),
                        _vm._v(" "),
                        _c("option", { attrs: { value: "Ireland" } }, [
                          _vm._v("Ireland"),
                        ]),
                        _vm._v(" "),
                        _c("option", { attrs: { value: "Israel" } }, [
                          _vm._v("Israel"),
                        ]),
                        _vm._v(" "),
                        _c("option", { attrs: { value: "Italy" } }, [
                          _vm._v("Italy"),
                        ]),
                        _vm._v(" "),
                        _c("option", { attrs: { value: "Japan" } }, [
                          _vm._v("Japan"),
                        ]),
                        _vm._v(" "),
                        _c("option", { attrs: { value: "Kenya" } }, [
                          _vm._v("Kenya"),
                        ]),
                        _vm._v(" "),
                        _c("option", { attrs: { value: "Malaysia" } }, [
                          _vm._v("Malaysia"),
                        ]),
                        _vm._v(" "),
                        _c("option", { attrs: { value: "Mexico" } }, [
                          _vm._v("Mexico"),
                        ]),
                        _vm._v(" "),
                        _c("option", { attrs: { value: "Netherlands" } }, [
                          _vm._v("Netherlands"),
                        ]),
                        _vm._v(" "),
                        _c("option", { attrs: { value: "New Zealand" } }, [
                          _vm._v("New Zealand"),
                        ]),
                        _vm._v(" "),
                        _c("option", { attrs: { value: "Nigeria" } }, [
                          _vm._v("Nigeria"),
                        ]),
                        _vm._v(" "),
                        _c("option", { attrs: { value: "Norway" } }, [
                          _vm._v("Norway"),
                        ]),
                        _vm._v(" "),
                        _c("option", { attrs: { value: "Pakistan" } }, [
                          _vm._v("Pakistan"),
                        ]),
                        _vm._v(" "),
                        _c("option", { attrs: { value: "Philippines" } }, [
                          _vm._v("Philippines"),
                        ]),
                        _vm._v(" "),
                        _c("option", { attrs: { value: "Poland" } }, [
                          _vm._v("Poland"),
                        ]),
                        _vm._v(" "),
                        _c("option", { attrs: { value: "Portugal" } }, [
                          _vm._v("Portugal"),
                        ]),
                        _vm._v(" "),
                        _c("option", { attrs: { value: "Romania" } }, [
                          _vm._v("Romania"),
                        ]),
                        _vm._v(" "),
                        _c("option", { attrs: { value: "Russia" } }, [
                          _vm._v("Russia"),
                        ]),
                        _vm._v(" "),
                        _c("option", { attrs: { value: "Saudi Arabia" } }, [
                          _vm._v("Saudi Arabia"),
                        ]),
                        _vm._v(" "),
                        _c("option", { attrs: { value: "Singapore" } }, [
                          _vm._v("Singapore"),
                        ]),
                        _vm._v(" "),
                        _c("option", { attrs: { value: "South Africa" } }, [
                          _vm._v("South Africa"),
                        ]),
                        _vm._v(" "),
                        _c("option", { attrs: { value: "South Korea" } }, [
                          _vm._v("South Korea"),
                        ]),
                        _vm._v(" "),
                        _c("option", { attrs: { value: "Spain" } }, [
                          _vm._v("Spain"),
                        ]),
                        _vm._v(" "),
                        _c("option", { attrs: { value: "Sweden" } }, [
                          _vm._v("Sweden"),
                        ]),
                        _vm._v(" "),
                        _c("option", { attrs: { value: "Switzerland" } }, [
                          _vm._v("Switzerland"),
                        ]),
                        _vm._v(" "),
                        _c("option", { attrs: { value: "Taiwan" } }, [
                          _vm._v("Taiwan"),
                        ]),
                        _vm._v(" "),
                        _c("option", { attrs: { value: "Thailand" } }, [
                          _vm._v("Thailand"),
                        ]),
                        _vm._v(" "),
                        _c("option", { attrs: { value: "Turkey" } }, [
                          _vm._v("Turkey"),
                        ]),
                        _vm._v(" "),
                        _c("option", { attrs: { value: "Ukraine" } }, [
                          _vm._v("Ukraine"),
                        ]),
                        _vm._v(" "),
                        _c(
                          "option",
                          { attrs: { value: "United Arab Emirates" } },
                          [_vm._v("United Arab Emirates")]
                        ),
                        _vm._v(" "),
                        _c("option", { attrs: { value: "United Kingdom" } }, [
                          _vm._v("United Kingdom"),
                        ]),
                        _vm._v(" "),
                        _c("option", { attrs: { value: "United States" } }, [
                          _vm._v("United States"),
                        ]),
                        _vm._v(" "),
                        _c("option", { attrs: { value: "Venezuela" } }, [
                          _vm._v("Venezuela"),
                        ]),
                        _vm._v(" "),
                        _c("option", { attrs: { value: "Vietnam" } }, [
                          _vm._v("Vietnam"),
                        ]),
                        _vm._v(" "),
                        _c("option", { attrs: { value: "Other" } }, [
                          _vm._v("Other"),
                        ]),
                      ]
                    ),
                  ]),
                ]),
                _vm._v(" "),
                _c("h5", { staticClass: "section-title" }, [
                  _vm._v("Bank Details"),
                ]),
                _vm._v(" "),
                _c("div", { staticClass: "form-fields" }, [
                  _c("div", { staticClass: "form-group" }, [
                    _vm._m(12),
                    _vm._v(" "),
                    _c("input", {
                      directives: [
                        {
                          name: "model",
                          rawName: "v-model",
                          value: _vm.member.bankAccountNumber,
                          expression: "member.bankAccountNumber",
                        },
                      ],
                      staticClass: "form-control",
                      class: { "has-value": _vm.member.bankAccountNumber },
                      attrs: {
                        type: "text",
                        placeholder: "Bank account number",
                      },
                      domProps: { value: _vm.member.bankAccountNumber },
                      on: {
                        input: function ($event) {
                          if ($event.target.composing) {
                            return
                          }
                          _vm.$set(
                            _vm.member,
                            "bankAccountNumber",
                            $event.target.value
                          )
                        },
                      },
                    }),
                  ]),
                  _vm._v(" "),
                  _c("div", { staticClass: "form-group" }, [
                    _vm._m(13),
                    _vm._v(" "),
                    _c("input", {
                      directives: [
                        {
                          name: "model",
                          rawName: "v-model",
                          value: _vm.member.routingNumber,
                          expression: "member.routingNumber",
                        },
                      ],
                      staticClass: "form-control",
                      class: {
                        "has-value": _vm.member.routingNumber,
                        "is-invalid": _vm.fieldErrors.routingNumber,
                      },
                      attrs: { type: "text", placeholder: "Routing number" },
                      domProps: { value: _vm.member.routingNumber },
                      on: {
                        blur: function ($event) {
                          return _vm.validateField("routingNumber")
                        },
                        input: [
                          function ($event) {
                            if ($event.target.composing) {
                              return
                            }
                            _vm.$set(
                              _vm.member,
                              "routingNumber",
                              $event.target.value
                            )
                          },
                          function ($event) {
                            _vm.fieldErrors.routingNumber &&
                              _vm.validateField("routingNumber")
                          },
                        ],
                      },
                    }),
                    _vm._v(" "),
                    _vm.fieldErrors.routingNumber
                      ? _c("div", { staticClass: "field-error" }, [
                          _vm._v(
                            "\n                  " +
                              _vm._s(_vm.fieldErrors.routingNumber) +
                              "\n              "
                          ),
                        ])
                      : _vm._e(),
                  ]),
                  _vm._v(" "),
                  _c("div", { staticClass: "form-group" }, [
                    _c("label", { staticClass: "form-label" }, [
                      _vm._v("Bank account type"),
                    ]),
                    _vm._v(" "),
                    _c(
                      "select",
                      {
                        directives: [
                          {
                            name: "model",
                            rawName: "v-model",
                            value: _vm.member.bankAccountType,
                            expression: "member.bankAccountType",
                          },
                        ],
                        staticClass: "form-control",
                        class: { "has-value": _vm.member.bankAccountType },
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
                              _vm.member,
                              "bankAccountType",
                              $event.target.multiple
                                ? $$selectedVal
                                : $$selectedVal[0]
                            )
                          },
                        },
                      },
                      [
                        _c("option", { attrs: { value: "" } }, [
                          _vm._v("Select Account Type"),
                        ]),
                        _vm._v(" "),
                        _c("option", { attrs: { value: "Checking" } }, [
                          _vm._v("Checking"),
                        ]),
                        _vm._v(" "),
                        _c("option", { attrs: { value: "Savings" } }, [
                          _vm._v("Savings"),
                        ]),
                        _vm._v(" "),
                        _c("option", { attrs: { value: "Business" } }, [
                          _vm._v("Business"),
                        ]),
                        _vm._v(" "),
                        _c("option", { attrs: { value: "Corporate" } }, [
                          _vm._v("Corporate"),
                        ]),
                        _vm._v(" "),
                        _c("option", { attrs: { value: "Current" } }, [
                          _vm._v("Current"),
                        ]),
                        _vm._v(" "),
                        _c("option", { attrs: { value: "Deposit" } }, [
                          _vm._v("Deposit"),
                        ]),
                        _vm._v(" "),
                        _c("option", { attrs: { value: "Loan" } }, [
                          _vm._v("Loan"),
                        ]),
                        _vm._v(" "),
                        _c("option", { attrs: { value: "Other" } }, [
                          _vm._v("Other"),
                        ]),
                      ]
                    ),
                  ]),
                  _vm._v(" "),
                  _c("div", { staticClass: "form-group" }, [
                    _c("label", { staticClass: "form-label" }, [
                      _vm._v("Bank account holder name"),
                    ]),
                    _vm._v(" "),
                    _c("input", {
                      directives: [
                        {
                          name: "model",
                          rawName: "v-model",
                          value: _vm.member.bankAccountName,
                          expression: "member.bankAccountName",
                        },
                      ],
                      staticClass: "form-control",
                      class: { "has-value": _vm.member.bankAccountName },
                      attrs: {
                        type: "text",
                        placeholder: "Bank account holder name",
                      },
                      domProps: { value: _vm.member.bankAccountName },
                      on: {
                        input: function ($event) {
                          if ($event.target.composing) {
                            return
                          }
                          _vm.$set(
                            _vm.member,
                            "bankAccountName",
                            $event.target.value
                          )
                        },
                      },
                    }),
                  ]),
                  _vm._v(" "),
                  _c("div", { staticClass: "form-group" }, [
                    _c("label", { staticClass: "form-label" }, [
                      _vm._v("Bank name"),
                    ]),
                    _vm._v(" "),
                    _c("input", {
                      directives: [
                        {
                          name: "model",
                          rawName: "v-model",
                          value: _vm.member.bankName,
                          expression: "member.bankName",
                        },
                      ],
                      staticClass: "form-control",
                      class: { "has-value": _vm.member.bankName },
                      attrs: { type: "text", placeholder: "Bank name" },
                      domProps: { value: _vm.member.bankName },
                      on: {
                        input: function ($event) {
                          if ($event.target.composing) {
                            return
                          }
                          _vm.$set(_vm.member, "bankName", $event.target.value)
                        },
                      },
                    }),
                  ]),
                ]),
                _vm._v(" "),
                _c("div", { staticClass: "form-group compact" }, [
                  _c(
                    "label",
                    { staticClass: "custom-checkbox invitation-checkbox" },
                    [
                      _c("input", {
                        directives: [
                          {
                            name: "model",
                            rawName: "v-model",
                            value: _vm.member.sendInvitation,
                            expression: "member.sendInvitation",
                          },
                        ],
                        attrs: { type: "radio" },
                        domProps: {
                          value: true,
                          checked: _vm._q(_vm.member.sendInvitation, true),
                        },
                        on: {
                          change: function ($event) {
                            return _vm.$set(_vm.member, "sendInvitation", true)
                          },
                        },
                      }),
                      _vm._v(" "),
                      _c("span", { staticClass: "checkmark" }),
                      _vm._v(" "),
                      _vm._m(14),
                    ]
                  ),
                  _vm._v(" "),
                  _c(
                    "label",
                    { staticClass: "custom-checkbox invitation-checkbox" },
                    [
                      _c("input", {
                        directives: [
                          {
                            name: "model",
                            rawName: "v-model",
                            value: _vm.member.sendInvitation,
                            expression: "member.sendInvitation",
                          },
                        ],
                        attrs: { type: "radio" },
                        domProps: {
                          value: false,
                          checked: _vm._q(_vm.member.sendInvitation, false),
                        },
                        on: {
                          change: function ($event) {
                            return _vm.$set(_vm.member, "sendInvitation", false)
                          },
                        },
                      }),
                      _vm._v(" "),
                      _c("span", { staticClass: "checkmark" }),
                      _vm._v(" "),
                      _c("span", { staticClass: "checkbox-label" }, [
                        _vm._v("Don't send invitation"),
                      ]),
                    ]
                  ),
                ]),
              ]),
            ]),
            _vm._v(" "),
            _vm.showWebcam
              ? _c("div", { staticClass: "webcam-modal-overlay" }, [
                  _c("div", { staticClass: "webcam-modal" }, [
                    _c("div", { staticClass: "webcam-header" }, [
                      _c("span", [_vm._v("Webcam")]),
                      _vm._v(" "),
                      _c(
                        "button",
                        {
                          staticClass: "close-btn",
                          staticStyle: {
                            background: "none",
                            border: "none",
                            "font-size": "1.5rem",
                          },
                          attrs: { type: "button" },
                          on: { click: _vm.closeWebcam },
                        },
                        [_vm._v("×")]
                      ),
                    ]),
                    _vm._v(" "),
                    _c("div", { staticClass: "webcam-video-container" }, [
                      _c("video", {
                        ref: "webcamVideo",
                        staticStyle: {
                          "border-radius": "8px",
                          background: "#222",
                        },
                        attrs: {
                          autoplay: "",
                          playsinline: "",
                          width: "320",
                          height: "240",
                        },
                      }),
                    ]),
                    _vm._v(" "),
                    _c(
                      "div",
                      {
                        staticClass: "webcam-actions",
                        staticStyle: {
                          "margin-top": "12px",
                          display: "flex",
                          gap: "10px",
                        },
                      },
                      [
                        _c(
                          "button",
                          {
                            staticClass: "btn btn-primary",
                            attrs: { type: "button" },
                            on: { click: _vm.takeSnapshot },
                          },
                          [
                            _c("i", { staticClass: "fas fa-camera" }),
                            _vm._v(" Capture\n                "),
                          ]
                        ),
                        _vm._v(" "),
                        _c(
                          "button",
                          {
                            staticClass: "btn btn-secondary",
                            attrs: { type: "button" },
                            on: { click: _vm.closeWebcam },
                          },
                          [
                            _vm._v(
                              "\n                  Cancel\n                "
                            ),
                          ]
                        ),
                      ]
                    ),
                  ]),
                ])
              : _vm._e(),
            _vm._v(" "),
            _c("div", { staticClass: "submit-section" }, [
              _c(
                "button",
                {
                  staticClass: "submit-btn",
                  attrs: { type: "submit", disabled: _vm.isLoading },
                },
                [
                  _c("i", { staticClass: "fas fa-check-circle" }),
                  _vm._v(" "),
                  _c("span", [
                    _vm._v(_vm._s(_vm.isLoading ? "Adding..." : "Add")),
                  ]),
                ]
              ),
            ]),
          ]
        ),
      ]),
    ]),
    _vm._v(" "),
    _vm.isLoading
      ? _c("div", { staticClass: "loading-overlay" }, [_vm._m(15)])
      : _vm._e(),
  ])
}
var staticRenderFns = [
  function () {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "header-content" }, [
      _c("div", { staticClass: "header-icon" }, [
        _c("i", { staticClass: "fas fa-user-plus" }),
      ]),
      _vm._v(" "),
      _c("h2", { staticClass: "form-title" }, [_vm._v("Add New Coach")]),
      _vm._v(" "),
      _c("p", { staticClass: "form-subtitle" }, [
        _vm._v("Add a new coach to your staff"),
      ]),
    ])
  },
  function () {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("label", { staticClass: "form-label" }, [
      _vm._v("First name "),
      _c("span", { staticClass: "required-asterisk" }, [_vm._v("*")]),
    ])
  },
  function () {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("label", { staticClass: "form-label" }, [
      _vm._v("Last name "),
      _c("span", { staticClass: "required-asterisk" }, [_vm._v("*")]),
    ])
  },
  function () {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("label", { staticClass: "form-label" }, [
      _vm._v("Sex "),
      _c("span", { staticClass: "required-asterisk" }, [_vm._v("*")]),
    ])
  },
  function () {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("label", { staticClass: "form-label" }, [
      _vm._v("Birthday "),
      _c("span", { staticClass: "required-asterisk" }, [_vm._v("*")]),
    ])
  },
  function () {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("label", { staticClass: "form-label" }, [
      _vm._v("\n                Language\n                "),
      _c("span", { staticClass: "tooltip-wrapper" }, [
        _c("i", { staticClass: "fas fa-info-circle info-icon" }),
        _vm._v(" "),
        _c("span", { staticClass: "tooltip-content" }, [
          _vm._v("Preferred language for communication"),
        ]),
      ]),
    ])
  },
  function () {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("label", { staticClass: "form-label" }, [
      _vm._v("\n                Email address "),
      _c("span", { staticClass: "required-asterisk" }, [_vm._v("*")]),
      _vm._v(" "),
      _c("span", { staticClass: "tooltip-wrapper" }, [
        _c("i", { staticClass: "fas fa-info-circle info-icon" }),
        _vm._v(" "),
        _c("span", { staticClass: "tooltip-content" }, [
          _vm._v("Email address for coach login and communication"),
        ]),
      ]),
    ])
  },
  function () {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("label", { staticClass: "form-label" }, [
      _vm._v("Mobile phone "),
      _c("span", { staticClass: "required-asterisk" }, [_vm._v("*")]),
    ])
  },
  function () {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("label", { staticClass: "form-label" }, [
      _vm._v("Address "),
      _c("span", { staticClass: "required-asterisk" }, [_vm._v("*")]),
    ])
  },
  function () {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("label", { staticClass: "form-label" }, [
      _vm._v("City "),
      _c("span", { staticClass: "required-asterisk" }, [_vm._v("*")]),
    ])
  },
  function () {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("label", { staticClass: "form-label" }, [
      _vm._v("State "),
      _c("span", { staticClass: "required-asterisk" }, [_vm._v("*")]),
    ])
  },
  function () {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("label", { staticClass: "form-label" }, [
      _vm._v("ZIP Code "),
      _c("span", { staticClass: "required-asterisk" }, [_vm._v("*")]),
    ])
  },
  function () {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("label", { staticClass: "form-label" }, [
      _vm._v("\n                Bank account number\n                "),
      _c("span", { staticClass: "tooltip-wrapper" }, [
        _c("i", { staticClass: "fas fa-info-circle info-icon" }),
        _vm._v(" "),
        _c("span", { staticClass: "tooltip-content" }, [
          _vm._v("Enter your bank account number"),
        ]),
      ]),
    ])
  },
  function () {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("label", { staticClass: "form-label" }, [
      _vm._v("\n                Routing number\n                "),
      _c("span", { staticClass: "tooltip-wrapper" }, [
        _c("i", { staticClass: "fas fa-info-circle info-icon" }),
        _vm._v(" "),
        _c("span", { staticClass: "tooltip-content" }, [
          _vm._v("Bank's unique code to identify the bank"),
        ]),
      ]),
    ])
  },
  function () {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("span", { staticClass: "checkbox-label" }, [
      _c("span", [_vm._v("Send invitation")]),
      _vm._v(" "),
      _c("span", { staticClass: "tooltip-wrapper" }, [
        _c("i", { staticClass: "fas fa-info-circle info-icon" }),
        _vm._v(" "),
        _c("span", { staticClass: "tooltip-content" }, [
          _vm._v(
            "\n                      Send a welcome email invitation to the new coach\n                    "
          ),
        ]),
      ]),
    ])
  },
  function () {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "loading_wrap" }, [
      _c("div", { staticClass: "loader_logo" }, [
        _c("img", { attrs: { src: "/images/logo.png", alt: "logo" } }),
      ]),
      _vm._v(" "),
      _c("div", { staticClass: "loading" }),
    ])
  },
]
render._withStripped = true



/***/ })

}]);