"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["resources_src_views_app_pages_Members_AddNewMember_vue"],{

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/Members/AddNewMember.vue?vue&type=script&lang=js":
/*!********************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/Members/AddNewMember.vue?vue&type=script&lang=js ***!
  \********************************************************************************************************************************************************************************************************************/
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
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
  data: function data() {
    return {
      member: {
        memberId: "",
        own_member_id: "",
        custom_export_field: "",
        firstName: "",
        lastName: "",
        dob: "",
        birthdayDay: "",
        birthdayMonth: "",
        birthdayYear: "",
        gender: "",
        mobile_phone: "",
        landline: "",
        language: "English",
        email: "",
        address: "",
        extra_address: "",
        city: "",
        zip: "",
        country: "United States",
        height: "",
        weight: "",
        medical: "",
        emergencyName: "",
        emergencyPhone: "",
        profile_image: "",
        send_invitation: true,
        webcam_image: "",
        member_since: "",
        client_since: "",
        subscription_reason: "Unknown",
        source: "Unknown",
        hasBusiness: "No",
        businessType: "",
        // Bank Details
        bank_account_number: "",
        routing_number: "",
        bank_account_type: "Checking",
        bank_account_holder_name: "",
        bank_name: "",
        mandate_id: "",
        exclude_from_online_payments: false,
        showOwnMemberIdInfo: false,
        showCustomExportFieldInfo: false,
        tags: []
      },
      loadingSwal: null,
      photoUrl: "",
      // Set default profile image
      showWebcam: false,
      showOwnMemberIdInfo: false,
      tagSearch: "",
      showTagOptions: false,
      availableTags: [],
      // All unique tags from database
      filteredTagSuggestions: [],
      // Filtered tags based on search
      showTagSuggestions: false,
      highlightedIndex: -1,
      // Index of highlighted suggestion for keyboard navigation
      months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
      availableYears: [],
      emailExists: false,
      emailChecking: false,
      emailAvailable: false,
      emailCheckTimeout: null,
      // Field validation errors
      fieldErrors: {},
      validationAttempted: false,
      // Track if all birthday fields have been selected
      birthdayFieldsTouched: {
        day: false,
        month: false,
        year: false
      }
    };
  },
  methods: {
    previewPhoto: function previewPhoto(event) {
      var _this = this;
      var file = event.target.files[0];
      if (file) {
        this.photoUrl = URL.createObjectURL(file);

        // Check file size first
        if (file.size > 500000) {
          // 500KB limit
          this.$root.$bvToast.toast("Please select an image smaller than 500KB. The image will be compressed automatically.", {
            title: 'File Too Large',
            variant: 'warning',
            solid: true,
            autoHideDelay: 5000,
            toaster: 'b-toaster-top-right',
            appendToast: true
          });
          return;
        }

        // Compress image before converting to base64
        this.compressImage(file).then(function (compressedDataUrl) {
          _this.member.profile_image = compressedDataUrl;
        })["catch"](function (error) {
          console.error("Error compressing image:", error);
          // Fallback to original file if compression fails
          var reader = new FileReader();
          reader.onload = function (e) {
            _this.member.profile_image = e.target.result;
          };
          reader.readAsDataURL(file);
        });
      }
    },
    compressImage: function compressImage(file) {
      return new Promise(function (resolve, reject) {
        var canvas = document.createElement("canvas");
        var ctx = canvas.getContext("2d");
        var img = new Image();
        img.onload = function () {
          // Calculate new dimensions (max 300x300)
          var maxSize = 300;
          var width = img.width,
            height = img.height;
          if (width > height) {
            if (width > maxSize) {
              height = height * maxSize / width;
              width = maxSize;
            }
          } else {
            if (height > maxSize) {
              width = width * maxSize / height;
              height = maxSize;
            }
          }
          canvas.width = width;
          canvas.height = height;

          // Draw and compress
          ctx.drawImage(img, 0, 0, width, height);

          // Convert to base64 with reduced quality
          var compressedDataUrl = canvas.toDataURL("image/jpeg", 0.7);
          resolve(compressedDataUrl);
        };
        img.onerror = reject;
        img.src = URL.createObjectURL(file);
      });
    },
    submitForm: function submitForm() {
      // Mark that validation has been attempted
      this.validationAttempted = true;

      // Mark all birthday fields as touched when submitting
      this.birthdayFieldsTouched.day = true;
      this.birthdayFieldsTouched.month = true;
      this.birthdayFieldsTouched.year = true;

      // Clear previous errors
      this.fieldErrors = {};

      // Validate all fields
      if (!this.validateForm()) {
        // Scroll to first error field
        this.scrollToFirstError();
        return;
      }

      // Check if email already exists
      if (this.emailExists) {
        this.$root.$bvToast.toast('This email is already registered. Please use a different email address.', {
          title: 'Email Already Exists',
          variant: 'danger',
          solid: true,
          autoHideDelay: 6000,
          toaster: 'b-toaster-top-right',
          appendToast: true
        });
        return;
      }

      // All validations passed, proceed with API call
      this.createMember();
    },
    validateForm: function validateForm() {
      var isValid = true;
      this.fieldErrors = {};

      // Validate First Name
      if (!this.member.firstName || typeof this.member.firstName !== "string" || this.member.firstName.trim() === "") {
        this.fieldErrors.firstName = "First name is required";
        isValid = false;
      } else if (this.member.firstName.trim().length < 2) {
        this.fieldErrors.firstName = "First name must be at least 2 characters";
        isValid = false;
      }

      // Validate Last Name
      if (!this.member.lastName || typeof this.member.lastName !== "string" || this.member.lastName.trim() === "") {
        this.fieldErrors.lastName = "Last name is required";
        isValid = false;
      } else if (this.member.lastName.trim().length < 2) {
        this.fieldErrors.lastName = "Last name must be at least 2 characters";
        isValid = false;
      }

      // Validate Gender
      if (!this.member.gender || this.member.gender === "") {
        this.fieldErrors.gender = "Please select a gender";
        isValid = false;
      }

      // Validate Birthday - use the dedicated method
      if (!this.validateBirthdayFields()) {
        isValid = false;
      }

      // Validate Email
      if (!this.member.email || typeof this.member.email !== "string" || this.member.email.trim() === "") {
        this.fieldErrors.email = "Email address is required";
        isValid = false;
      } else {
        var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(this.member.email.trim())) {
          this.fieldErrors.email = "Please enter a valid email address";
          isValid = false;
        } else if (this.emailExists) {
          this.fieldErrors.email = "This email is already registered";
          isValid = false;
        }
      }

      // Validate Mobile Phone (optional, but validate format if provided)
      if (this.member.mobile_phone && typeof this.member.mobile_phone === "string" && this.member.mobile_phone.trim() !== "") {
        // Basic phone validation (at least 10 digits)
        var phoneDigits = this.member.mobile_phone.replace(/\D/g, '');
        if (phoneDigits.length < 10) {
          this.fieldErrors.mobile_phone = "Please enter a valid mobile phone number (at least 10 digits)";
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
          if (!this.member.firstName || this.member.firstName.trim() === "") {
            this.fieldErrors.firstName = "First name is required";
            return false;
          } else if (this.member.firstName.trim().length < 2) {
            this.fieldErrors.firstName = "First name must be at least 2 characters";
            return false;
          }
          break;
        case 'lastName':
          if (!this.member.lastName || this.member.lastName.trim() === "") {
            this.fieldErrors.lastName = "Last name is required";
            return false;
          } else if (this.member.lastName.trim().length < 2) {
            this.fieldErrors.lastName = "Last name must be at least 2 characters";
            return false;
          }
          break;
        case 'gender':
          if (!this.member.gender || this.member.gender === "") {
            this.fieldErrors.gender = "Please select a gender";
            return false;
          }
          break;
        case 'email':
          if (!this.member.email || this.member.email.trim() === "") {
            this.fieldErrors.email = "Email address is required";
            return false;
          } else {
            var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(this.member.email.trim())) {
              this.fieldErrors.email = "Please enter a valid email address";
              return false;
            }
          }
          break;
        case 'mobile_phone':
          // Optional field, but validate format if provided
          if (this.member.mobile_phone && this.member.mobile_phone.trim() !== "") {
            var phoneDigits = this.member.mobile_phone.replace(/\D/g, '');
            if (phoneDigits.length < 10) {
              this.fieldErrors.mobile_phone = "Please enter a valid mobile phone number (at least 10 digits)";
              return false;
            }
          }
          break;
        case 'birthdayDay':
        case 'birthdayMonth':
        case 'birthdayYear':
          // Only validate if all three fields have been touched
          return this.validateBirthdayFields();
          break;
      }
      return true;
    },
    // New method to handle birthday field changes
    onBirthdayFieldChange: function onBirthdayFieldChange(field) {
      // Mark this field as touched
      if (field === 'day') {
        this.birthdayFieldsTouched.day = true;
      } else if (field === 'month') {
        this.birthdayFieldsTouched.month = true;
      } else if (field === 'year') {
        this.birthdayFieldsTouched.year = true;
      }

      // Only validate if all three fields have been selected
      if (this.member.birthdayDay && this.member.birthdayMonth && this.member.birthdayYear) {
        this.validateBirthdayFields();
      } else {
        // Clear errors if not all fields are selected yet
        delete this.fieldErrors.birthdayDay;
        delete this.fieldErrors.birthdayMonth;
        delete this.fieldErrors.birthdayYear;
      }
    },
    // New method to handle birthday field blur
    onBirthdayFieldBlur: function onBirthdayFieldBlur(field) {
      // Mark this field as touched
      if (field === 'day') {
        this.birthdayFieldsTouched.day = true;
      } else if (field === 'month') {
        this.birthdayFieldsTouched.month = true;
      } else if (field === 'year') {
        this.birthdayFieldsTouched.year = true;
      }

      // Only validate if all three fields have been selected
      if (this.member.birthdayDay && this.member.birthdayMonth && this.member.birthdayYear) {
        this.validateBirthdayFields();
      }
    },
    // Check if all birthday fields have been selected
    allBirthdayFieldsSelected: function allBirthdayFieldsSelected() {
      return !!(this.member.birthdayDay && this.member.birthdayMonth && this.member.birthdayYear);
    },
    // Check if we should show birthday errors
    shouldShowBirthdayErrors: function shouldShowBirthdayErrors() {
      // Show errors only if all three fields have been selected
      return this.allBirthdayFieldsSelected();
    },
    // Get the appropriate birthday error message
    getBirthdayErrorMessage: function getBirthdayErrorMessage() {
      if (this.fieldErrors.birthdayDay) {
        return this.fieldErrors.birthdayDay;
      }
      if (this.fieldErrors.birthdayMonth) {
        return this.fieldErrors.birthdayMonth;
      }
      if (this.fieldErrors.birthdayYear) {
        return this.fieldErrors.birthdayYear;
      }
      return '';
    },
    // Validate all birthday fields
    validateBirthdayFields: function validateBirthdayFields() {
      // Clear previous errors
      delete this.fieldErrors.birthdayDay;
      delete this.fieldErrors.birthdayMonth;
      delete this.fieldErrors.birthdayYear;

      // Check if all fields are filled
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

      // Validate date if all components are present
      if (this.member.birthdayDay && this.member.birthdayMonth && this.member.birthdayYear) {
        var day = parseInt(this.member.birthdayDay);
        var month = parseInt(this.member.birthdayMonth);
        var year = parseInt(this.member.birthdayYear);
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
        // Check if age is reasonable (not more than 150 years)
        var age = today.getFullYear() - year;
        if (age > 150) {
          this.fieldErrors.birthdayYear = "Please enter a valid birth year";
          return false;
        }
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
          // Focus the input if it's an input element
          var input = firstErrorField.querySelector('input, select, textarea') || firstErrorField;
          if (input && input.focus) {
            input.focus();
          }
        }
      });
    },
    createMember: function createMember() {
      var _this2 = this;
      // Prepare the data according to backend expectations
      var memberData = {
        membername: "".concat(this.member.firstName, " ").concat(this.member.lastName),
        firstname: this.member.firstName,
        lastname: this.member.lastName,
        date_of_birth: this.member.dob,
        gender: this.member.gender,
        mobile_phone: this.member.mobile_phone && typeof this.member.mobile_phone === "string" && this.member.mobile_phone.trim() ? this.member.mobile_phone : "",
        landline_phone: this.member.landline && typeof this.member.landline === "string" && this.member.landline.trim() ? this.member.landline : "",
        language: this.member.language && typeof this.member.language === "string" && this.member.language.trim() ? this.member.language : "",
        address: this.member.address && typeof this.member.address === "string" && this.member.address.trim() ? this.member.address : "",
        extra_address: this.member.extra_address && typeof this.member.extra_address === "string" && this.member.extra_address.trim() ? this.member.extra_address : null,
        city: this.member.city && typeof this.member.city === "string" && this.member.city.trim() ? this.member.city : "",
        zipcode: this.member.zip && typeof this.member.zip === "string" && this.member.zip.trim() ? this.member.zip : "",
        country: this.member.country && typeof this.member.country === "string" && this.member.country.trim() ? this.member.country : null,
        email: this.member.email && typeof this.member.email === "string" && this.member.email.trim() ? this.member.email : null,
        Statuses: "active",
        height: this.member.height && typeof this.member.height === "string" && this.member.height.trim() ? this.member.height : "",
        weight: this.member.weight && typeof this.member.weight === "string" && this.member.weight.trim() ? this.member.weight : "",
        medical_condition: this.member.medical && typeof this.member.medical === "string" && this.member.medical.trim() ? this.member.medical : "",
        contact_name: this.member.emergencyName && typeof this.member.emergencyName === "string" && this.member.emergencyName.trim() ? this.member.emergencyName : "",
        contact_phone: this.member.emergencyPhone && typeof this.member.emergencyPhone === "string" && this.member.emergencyPhone.trim() ? this.member.emergencyPhone : "",
        profile_image: this.member.profile_image || "/images/default-profile.jpg",
        send_invitation: this.member.send_invitation || false,
        webcam_image: this.member.webcam_image || "",
        member_since: this.member.client_since && typeof this.member.client_since === "string" && this.member.client_since.trim() ? this.member.client_since : "",
        // Bank Details
        bank_account_number: this.member.bank_account_number && typeof this.member.bank_account_number === "string" && this.member.bank_account_number.trim() ? this.member.bank_account_number : "",
        routing_number: this.member.routing_number && typeof this.member.routing_number === "string" && this.member.routing_number.trim() ? this.member.routing_number : "",
        bank_account_type: this.member.bank_account_type && typeof this.member.bank_account_type === "string" && this.member.bank_account_type.trim() ? this.member.bank_account_type : "",
        bank_account_holder_name: this.member.bank_account_holder_name && typeof this.member.bank_account_holder_name === "string" && this.member.bank_account_holder_name.trim() ? this.member.bank_account_holder_name : "",
        bank_name: this.member.bank_name && typeof this.member.bank_name === "string" && this.member.bank_name.trim() ? this.member.bank_name : "",
        mandate_id: this.member.mandate_id && typeof this.member.mandate_id === "string" && this.member.mandate_id.trim() ? this.member.mandate_id : "",
        exclude_from_online_payments: this.member.exclude_from_online_payments || false,
        // Business fields
        is_business: this.member.hasBusiness || "No",
        hasBusiness: this.member.hasBusiness || "No",
        business_type: this.member.businessType || null,
        // Additional fields
        subscription_reason: this.member.subscription_reason || null,
        source: this.member.source || null,
        own_member_id: this.member.own_member_id && typeof this.member.own_member_id === "string" && this.member.own_member_id.trim() ? this.member.own_member_id : null,
        custom_export_field: this.member.custom_export_field && typeof this.member.custom_export_field === "string" && this.member.custom_export_field.trim() ? this.member.custom_export_field : null,
        // Tags
        tags: this.member.tags || []
      };

      // Debug: Log the data being sent
      console.log("Sending member data:", memberData);
      console.log("Member form data:", this.member);

      // Show loading state
      this.loadingSwal = this.$swal({
        title: "Creating Member...",
        html: '<div style="text-align: center;"><div style="border: 4px solid #f3f3f3; border-top: 4px solid #dc3545; border-radius: 50%; width: 40px; height: 40px; animation: spin 1s linear infinite; margin: 0 auto 15px;"></div><p>Please wait while we create the member...</p></div><style>@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }</style>',
        allowOutsideClick: false,
        allowEscapeKey: false,
        showConfirmButton: false
      });
      axios.post("members", memberData).then(function (response) {
        console.log("Member created successfully:", response.data);

        // Close loading swal
        if (_this2.loadingSwal && typeof _this2.loadingSwal.close === 'function') {
          _this2.loadingSwal.close();
        }

        // Show success message
        _this2.$swal({
          title: "Success!",
          text: "Member created successfully!",
          icon: "success",
          confirmButtonText: "OK"
        });

        // Show email status toast
        // Check email_sent first (explicit boolean check)
        if (response.data.email_sent === true) {
          _this2.$root.$bvToast.toast("Invitation email sent to ".concat(_this2.member.email), {
            title: 'Email Sent',
            variant: 'success',
            solid: true,
            autoHideDelay: 4000,
            toaster: 'b-toaster-top-right',
            appendToast: true
          });
        }
        // Only show error if email_sent is false and there's an error message
        else if (response.data.email_sent === false && response.data.email_error && response.data.email_error.trim() !== '') {
          // Show user-friendly error message
          var errorMsg = response.data.email_error.includes('mail settings') || response.data.email_error.includes('connection') || response.data.email_error.includes('SMTP') ? 'Email could not be sent. Please check your mail server settings in Settings → Mail Settings.' : "Failed to send invitation email: ".concat(response.data.email_error);
          _this2.$root.$bvToast.toast(errorMsg, {
            title: 'Email Warning',
            variant: 'warning',
            solid: true,
            autoHideDelay: 6000,
            toaster: 'b-toaster-top-right',
            appendToast: true
          });
        }

        // Redirect to member details page after showing toasts
        setTimeout(function () {
          if (response.data && response.data.member_id) {
            _this2.$router.push({
              name: 'MemberDetails',
              params: {
                id: response.data.member_id
              }
            });
          } else {
            // Fallback to members list if member ID not available
            _this2.$router.push("/app/members/viewallmembers");
          }
        }, 2000);
      })["catch"](function (error) {
        var _error$response$data;
        // Close the loading swal first
        if (_this2.loadingSwal && typeof _this2.loadingSwal.close === 'function') {
          _this2.loadingSwal.close();
        } else if (_this2.$swal && typeof _this2.$swal.close === 'function') {
          _this2.$swal.close();
        } else if (window.Swal && typeof window.Swal.close === 'function') {
          window.Swal.close();
        }

        // Parse error and get user-friendly message
        var errorInfo = _this2.parseError(error);

        // Check if it's an email duplicate error
        var isEmailError = errorInfo.focusField === 'email' || error.response && error.response.status === 422 && ((_error$response$data = error.response.data) === null || _error$response$data === void 0 || (_error$response$data = _error$response$data.errors) === null || _error$response$data === void 0 ? void 0 : _error$response$data.email);

        // Show toast notification in top right corner
        _this2.$root.$bvToast.toast(errorInfo.message, {
          title: errorInfo.title,
          variant: errorInfo.variant || 'danger',
          solid: true,
          autoHideDelay: errorInfo.delay || 6000,
          toaster: 'b-toaster-top-right',
          appendToast: true
        });

        // If email error, focus on email field and scroll to it
        if (isEmailError) {
          _this2.$nextTick(function () {
            var _error$response;
            // Set email error in fieldErrors
            if ((_error$response = error.response) !== null && _error$response !== void 0 && (_error$response = _error$response.data) !== null && _error$response !== void 0 && (_error$response = _error$response.errors) !== null && _error$response !== void 0 && _error$response.email) {
              var emailErrors = error.response.data.errors.email;
              if (Array.isArray(emailErrors)) {
                _this2.fieldErrors.email = emailErrors[0];
              } else {
                _this2.fieldErrors.email = "This email address is already registered. Please use a different email.";
              }
            } else {
              _this2.fieldErrors.email = "This email address is already registered. Please use a different email.";
            }

            // Find and focus email input
            var emailInputEl = _this2.$refs.emailInput || document.querySelector('#member-email-input') || document.querySelector('input[type="email"]');
            if (emailInputEl) {
              // Use Vue's $nextTick to ensure DOM is updated
              _this2.$nextTick(function () {
                emailInputEl.focus();
                emailInputEl.scrollIntoView({
                  behavior: 'smooth',
                  block: 'center'
                });
                // Highlight the field
                emailInputEl.classList.add('is-invalid');
                // Select the text if there's any
                if (emailInputEl.value) {
                  emailInputEl.select();
                }
              });
            }

            // Also update email status
            _this2.emailExists = true;
            _this2.emailAvailable = false;
          });
        }
      });
    },
    // Method to ensure placeholders are visible
    ensurePlaceholdersVisible: function ensurePlaceholdersVisible() {
      // Force a re-render of input elements to ensure placeholders are visible
      this.$nextTick(function () {
        var inputs = document.querySelectorAll(".form-control[placeholder]");
        inputs.forEach(function (input) {
          if (!input.value) {
            input.setAttribute("placeholder", input.getAttribute("placeholder"));
          }
        });
      });
    },
    getFieldLabel: function getFieldLabel(field) {
      var fieldLabels = {
        firstName: "First Name",
        lastName: "Last Name",
        dob: "Birthday",
        gender: "Gender",
        email: "Email",
        mobile_phone: "Mobile Phone",
        landline: "Landline",
        language: "Language",
        address: "Address",
        extra_address: "Extra Address Row",
        city: "City",
        zip: "ZIP Code",
        country: "Country",
        height: "Height",
        weight: "Weight",
        medical: "Medical Conditions",
        emergencyName: "Emergency Contact Name",
        emergencyPhone: "Emergency Contact Phone",
        hasBusiness: "Business",
        businessType: "Business Type"
      };
      return fieldLabels[field] || field;
    },
    goBack: function goBack() {
      // Check if there's a previous page in browser history
      if (window.history.length > 1) {
        this.$router.go(-1);
      } else {
        // Fallback to members list if no history
        this.$router.push("/app/members/viewallmembers");
      }
    },
    goToMembersList: function goToMembersList() {
      this.$router.push("/app/members/viewallmembers");
    },
    parseError: function parseError(error) {
      var _this3 = this,
        _response$data2;
      // Default error response
      var errorInfo = {
        title: 'Error',
        message: 'An unexpected error occurred. Please try again.',
        variant: 'danger',
        delay: 6000,
        focusField: null // Field to focus on after showing error
      };

      // Handle network errors
      if (!error.response) {
        if (error.message && error.message.includes('Network Error')) {
          errorInfo.title = 'Connection Error';
          errorInfo.message = 'Unable to connect to the server. Please check your internet connection and try again.';
          errorInfo.delay = 8000;
        } else if (error.code === 'ECONNABORTED') {
          errorInfo.title = 'Request Timeout';
          errorInfo.message = 'The request took too long. Please try again.';
        }
        return errorInfo;
      }
      var response = error.response;
      var status = response.status;

      // Handle HTTP status codes
      if (status === 422) {
        // Validation errors
        if (response.data.errors) {
          var errors = response.data.errors;
          var requiredFields = [];
          var validationErrors = [];
          var emailErrorFound = false;
          Object.keys(errors).forEach(function (field) {
            var fieldLabel = _this3.getFieldLabel(field) || field;
            errors[field].forEach(function (err) {
              // Handle email-specific errors
              if (field === 'email') {
                emailErrorFound = true;
                if (err.includes('unique') || err.includes('taken') || err.includes('already')) {
                  validationErrors.push("This email address is already registered. Please use a different email address.");
                } else if (err.includes('valid') || err.includes('format')) {
                  validationErrors.push("Please enter a valid email address.");
                } else {
                  validationErrors.push("Email: ".concat(err));
                }
              } else if (err === 'validation.required') {
                if (!requiredFields.includes(fieldLabel)) {
                  requiredFields.push(fieldLabel);
                }
              } else if (err === 'validation.email') {
                validationErrors.push("".concat(fieldLabel, " must be a valid email address"));
              } else if (err === 'validation.unique') {
                validationErrors.push("".concat(fieldLabel, " already exists. Please use a different value."));
              } else if (err === 'validation.numeric') {
                validationErrors.push("".concat(fieldLabel, " must be a number"));
              } else if (err === 'validation.min') {
                validationErrors.push("".concat(fieldLabel, " is too short"));
              } else if (err === 'validation.max') {
                validationErrors.push("".concat(fieldLabel, " is too long"));
              } else {
                validationErrors.push("".concat(fieldLabel, ": ").concat(err));
              }
            });
          });

          // Set focus field if email error
          if (emailErrorFound) {
            errorInfo.focusField = 'email';
          }
          if (requiredFields.length > 0) {
            errorInfo.title = 'Required Fields Missing';
            errorInfo.message = "Please fill in: ".concat(requiredFields.join(', '));
          } else if (validationErrors.length > 0) {
            errorInfo.title = 'Validation Error';
            errorInfo.message = validationErrors.length === 1 ? validationErrors[0] : validationErrors.slice(0, 3).join('. ') + (validationErrors.length > 3 ? '...' : '');
            errorInfo.delay = 8000;
          }
        } else if (response.data.message) {
          errorInfo.title = 'Validation Error';
          errorInfo.message = response.data.message;
        }
      } else if (status === 500) {
        var _response$data;
        // Server errors
        var message = ((_response$data = response.data) === null || _response$data === void 0 ? void 0 : _response$data.message) || error.message || '';

        // Check for duplicate key error
        if (message.includes("Duplicate entry") && message.includes("for key 'PRIMARY'")) {
          errorInfo.title = 'Duplicate Member ID';
          errorInfo.message = 'A member with this ID already exists. The system will generate a new ID. Please try again.';
          errorInfo.variant = 'warning';
        } else if (message.includes("cannot be null")) {
          // Extract field name from error
          var columnMatch = message.match(/Column '([^']+)' cannot be null/);
          if (columnMatch && columnMatch[1]) {
            var columnName = columnMatch[1];
            // Skip optional fields
            if (columnName === 'landline_phone') {
              errorInfo.title = 'Server Error';
              errorInfo.message = 'An error occurred while saving. Please try again.';
            } else {
              var columnToFieldMap = {
                'mobile_phone': 'Mobile Phone',
                'firstname': 'First Name',
                'lastname': 'Last Name',
                'date_of_birth': 'Birthday',
                'email': 'Email',
                'gender': 'Gender'
              };
              var fieldLabel = columnToFieldMap[columnName] || columnName.replace(/_/g, ' ').replace(/\b\w/g, function (l) {
                return l.toUpperCase();
              });
              errorInfo.title = 'Required Field Missing';
              errorInfo.message = "".concat(fieldLabel, " is required. Please fill in this field.");
            }
          } else {
            errorInfo.title = 'Server Error';
            errorInfo.message = 'A required field is missing. Please check the form and try again.';
          }
        } else if (message.includes("SQLSTATE[23000]") || message.includes("Integrity constraint violation")) {
          // Check if it's a duplicate entry error
          if (message.includes("Duplicate entry") || message.includes("UNIQUE constraint")) {
            // Try to extract field name
            if (message.includes("email") || message.toLowerCase().includes("email")) {
              errorInfo.title = 'Email Already Exists';
              errorInfo.message = 'This email address is already registered in the system. Please use a different email address.';
              errorInfo.focusField = 'email';
            } else {
              errorInfo.title = 'Duplicate Entry';
              errorInfo.message = 'This information already exists in the system. Please check your input and try again.';
            }
          } else {
            errorInfo.title = 'Database Error';
            errorInfo.message = 'There was a problem saving the data. Please check your input and try again.';
          }
        } else {
          errorInfo.title = 'Server Error';
          errorInfo.message = 'An error occurred on the server. Please try again later or contact support if the problem persists.';
          errorInfo.delay = 8000;
        }
      } else if (status === 404) {
        errorInfo.title = 'Not Found';
        errorInfo.message = 'The requested resource was not found. Please refresh the page and try again.';
      } else if (status === 403) {
        errorInfo.title = 'Access Denied';
        errorInfo.message = 'You do not have permission to perform this action.';
      } else if (status === 401) {
        errorInfo.title = 'Authentication Required';
        errorInfo.message = 'Your session has expired. Please log in again.';
        errorInfo.variant = 'warning';
      } else if ((_response$data2 = response.data) !== null && _response$data2 !== void 0 && _response$data2.message) {
        errorInfo.title = 'Error';
        errorInfo.message = response.data.message;
      }
      return errorInfo;
    },
    openWebcam: function openWebcam() {
      var _this4 = this;
      return _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
        var stream;
        return _regeneratorRuntime().wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              _this4.showWebcam = true;
              _context.next = 3;
              return _this4.$nextTick();
            case 3:
              _context.prev = 3;
              _context.next = 6;
              return navigator.mediaDevices.getUserMedia({
                video: true
              });
            case 6:
              stream = _context.sent;
              _this4.$refs.webcamVideo.srcObject = stream;
              _context.next = 15;
              break;
            case 10:
              _context.prev = 10;
              _context.t0 = _context["catch"](3);
              console.error("Error accessing webcam:", _context.t0);
              _this4.$root.$bvToast.toast("Could not access webcam. Please check your permissions and try again.", {
                title: 'Webcam Error',
                variant: 'warning',
                solid: true,
                autoHideDelay: 5000,
                toaster: 'b-toaster-top-right',
                appendToast: true
              });
              _this4.showWebcam = false;
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
      var canvas = document.createElement("canvas");
      var ctx = canvas.getContext("2d");
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      ctx.drawImage(video, 0, 0);
      var dataURL = canvas.toDataURL("image/jpeg", 0.7);
      this.photoUrl = dataURL;
      this.member.webcam_image = dataURL;
      this.closeWebcam();
    },
    getMaxDate: function getMaxDate() {
      // Set maximum date to today (prevent future dates)
      var today = new Date();
      return today.toISOString().split("T")[0];
    },
    generateAvailableYears: function generateAvailableYears() {
      var currentYear = new Date().getFullYear();
      var years = [];
      for (var year = currentYear; year >= currentYear - 100; year--) {
        years.push(year);
      }
      this.availableYears = years;
    },
    setCurrentDate: function setCurrentDate() {
      var today = new Date();
      var month = String(today.getMonth() + 1).padStart(2, '0');
      var day = String(today.getDate()).padStart(2, '0');
      var year = today.getFullYear();
      this.member.client_since = "".concat(month, "/").concat(day, "/").concat(year);
    },
    updateDobField: function updateDobField() {
      // Combine birthday components into dob field
      if (this.member.birthdayDay && this.member.birthdayMonth && this.member.birthdayYear) {
        // Create date in YYYY-MM-DD format for backend
        var year = this.member.birthdayYear;
        var month = String(this.member.birthdayMonth).padStart(2, '0');
        var day = String(this.member.birthdayDay).padStart(2, '0');
        this.member.dob = "".concat(year, "-").concat(month, "-").concat(day);
      } else {
        // Clear dob if any component is missing
        this.member.dob = "";
      }
    },
    // Tag management methods with hybrid autocomplete
    fetchAvailableTags: function fetchAvailableTags() {
      var _this5 = this;
      return _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee2() {
        var response;
        return _regeneratorRuntime().wrap(function _callee2$(_context2) {
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
              _context2.prev = 0;
              _context2.next = 3;
              return axios.get('members/tags/available');
            case 3:
              response = _context2.sent;
              if (response.data && response.data.success && response.data.tags) {
                // Extract tag names from the response
                _this5.availableTags = response.data.tags.map(function (t) {
                  return t.name || t.value || t;
                });
                // Sort alphabetically
                _this5.availableTags.sort();
              } else {
                _this5.availableTags = [];
              }
              _context2.next = 11;
              break;
            case 7:
              _context2.prev = 7;
              _context2.t0 = _context2["catch"](0);
              // Silently fail - tags are optional, don't show error to user
              // Only log in development mode
              if (true) {
                console.warn('Could not fetch tags (optional feature):', _context2.t0);
              }
              _this5.availableTags = [];
            case 11:
            case "end":
              return _context2.stop();
          }
        }, _callee2, null, [[0, 7]]);
      }))();
    },
    filterTagSuggestions: function filterTagSuggestions() {
      var search = this.tagSearch.toLowerCase().trim();
      if (!search) {
        // Show first 10 existing tags when input is empty
        this.filteredTagSuggestions = this.availableTags.slice(0, 10);
      } else {
        // Filter tags that match the search
        this.filteredTagSuggestions = this.availableTags.filter(function (tag) {
          return tag.toLowerCase().includes(search);
        }).slice(0, 10);
      }
      this.showTagSuggestions = true;
      this.highlightedIndex = -1;
    },
    onTagInputFocus: function onTagInputFocus() {
      this.filterTagSuggestions();
      this.showTagSuggestions = true;
    },
    hideTagSuggestions: function hideTagSuggestions() {
      var _this6 = this;
      // Delay hiding to allow click events on suggestions
      setTimeout(function () {
        _this6.showTagSuggestions = false;
        _this6.highlightedIndex = -1;
      }, 200);
    },
    navigateSuggestions: function navigateSuggestions(direction) {
      var totalSuggestions = this.filteredTagSuggestions.length + (this.tagSearch.trim() && !this.filteredTagSuggestions.includes(this.tagSearch.trim()) && !this.member.tags.includes(this.tagSearch.trim()) ? 1 : 0);
      if (totalSuggestions === 0) return;
      if (direction === 'down') {
        this.highlightedIndex = (this.highlightedIndex + 1) % totalSuggestions;
      } else if (direction === 'up') {
        this.highlightedIndex = this.highlightedIndex <= 0 ? totalSuggestions - 1 : this.highlightedIndex - 1;
      }

      // Scroll highlighted item into view
      this.$nextTick(function () {
        var highlighted = document.querySelector('.tag-suggestion.highlighted');
        if (highlighted) {
          highlighted.scrollIntoView({
            block: 'nearest',
            behavior: 'smooth'
          });
        }
      });
    },
    handleTagEnter: function handleTagEnter() {
      // If a suggestion is highlighted, add that tag
      if (this.highlightedIndex >= 0 && this.highlightedIndex < this.filteredTagSuggestions.length) {
        this.addTag(this.filteredTagSuggestions[this.highlightedIndex]);
      } else if (this.highlightedIndex === this.filteredTagSuggestions.length) {
        // If "Create new" option is highlighted
        this.addTag();
      } else {
        // Otherwise, add the typed text
        this.addTag();
      }
    },
    addTag: function addTag() {
      var tagName = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
      var tagToAdd = tagName || this.tagSearch.trim();
      if (tagToAdd && !this.member.tags.includes(tagToAdd)) {
        this.member.tags.push(tagToAdd);
        this.tagSearch = "";
        this.showTagSuggestions = false;
        this.highlightedIndex = -1;

        // If it's a new tag not in availableTags, add it for future suggestions
        if (!this.availableTags.includes(tagToAdd)) {
          this.availableTags.push(tagToAdd);
          this.availableTags.sort();
        }
      }
    },
    removeTag: function removeTag(tag) {
      var index = this.member.tags.indexOf(tag);
      if (index > -1) {
        this.member.tags.splice(index, 1);
      }
    },
    // Email validation methods
    onEmailInput: function onEmailInput() {
      var _this7 = this;
      // Reset states when user starts typing
      this.emailExists = false;
      this.emailAvailable = false;

      // Clear field error if user is typing
      if (this.fieldErrors.email && !this.fieldErrors.email.includes('already registered')) {
        delete this.fieldErrors.email;
      }

      // Clear existing timeout
      if (this.emailCheckTimeout) {
        clearTimeout(this.emailCheckTimeout);
      }

      // Debounce email checking - wait 800ms after user stops typing
      this.emailCheckTimeout = setTimeout(function () {
        _this7.checkEmailAvailability();
      }, 800);
    },
    checkEmailAvailability: function checkEmailAvailability() {
      var _this8 = this;
      return _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee3() {
        var emailRegex, response, status, emailErrors, _error$response$data2;
        return _regeneratorRuntime().wrap(function _callee3$(_context3) {
          while (1) switch (_context3.prev = _context3.next) {
            case 0:
              // Clear timeout if still pending
              if (_this8.emailCheckTimeout) {
                clearTimeout(_this8.emailCheckTimeout);
                _this8.emailCheckTimeout = null;
              }

              // Basic email format validation
              emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
              if (!(!_this8.member.email || !emailRegex.test(_this8.member.email))) {
                _context3.next = 7;
                break;
              }
              _this8.emailExists = false;
              _this8.emailAvailable = false;
              _this8.emailChecking = false;
              return _context3.abrupt("return");
            case 7:
              if (!(_this8.member.email.length < 5)) {
                _context3.next = 9;
                break;
              }
              return _context3.abrupt("return");
            case 9:
              _this8.emailChecking = true;
              _this8.emailExists = false;
              _this8.emailAvailable = false;
              _context3.prev = 12;
              _context3.next = 15;
              return axios.get('members/check-email', {
                params: {
                  email: _this8.member.email
                }
              });
            case 15:
              response = _context3.sent;
              if (response.data && response.data.exists) {
                _this8.emailExists = true;
                _this8.emailAvailable = false;
                _this8.fieldErrors.email = 'This email is already registered. Please use a different email address.';

                // Show toast notification
                _this8.$root.$bvToast.toast('This email is already registered. Please use a different email address.', {
                  title: 'Email Already Exists',
                  variant: 'warning',
                  solid: true,
                  autoHideDelay: 5000,
                  toaster: 'b-toaster-top-right',
                  appendToast: true
                });
              } else {
                _this8.emailExists = false;
                _this8.emailAvailable = true;
                // Clear email error if it was about existing email
                if (_this8.fieldErrors.email && _this8.fieldErrors.email.includes('already registered')) {
                  delete _this8.fieldErrors.email;
                }
              }
              _context3.next = 22;
              break;
            case 19:
              _context3.prev = 19;
              _context3.t0 = _context3["catch"](12);
              // Handle email check errors gracefully
              if (_context3.t0.response) {
                status = _context3.t0.response.status;
                if (status === 422) {
                  // Validation error - email format is invalid
                  if (_context3.t0.response.data.errors && _context3.t0.response.data.errors.email) {
                    emailErrors = _context3.t0.response.data.errors.email;
                    if (emailErrors.some(function (e) {
                      return e.includes('valid') || e.includes('format');
                    })) {
                      _this8.fieldErrors.email = "Please enter a valid email address";
                      _this8.emailExists = false;
                      _this8.emailAvailable = false;
                    } else if (emailErrors.some(function (e) {
                      return e.includes('unique') || e.includes('taken') || e.includes('already');
                    })) {
                      _this8.fieldErrors.email = "This email address is already registered. Please use a different email.";
                      _this8.emailExists = true;
                      _this8.emailAvailable = false;
                    }
                  }
                } else if (status === 500) {
                  // Server error - don't block user, just mark as unknown
                  _this8.emailExists = false;
                  _this8.emailAvailable = false;
                  // Only show error in development
                  if (true) {
                    console.warn('Email check server error:', ((_error$response$data2 = _context3.t0.response.data) === null || _error$response$data2 === void 0 ? void 0 : _error$response$data2.message) || 'Unknown error');
                  }
                }
              } else {
                // Network error - don't block user
                _this8.emailExists = false;
                _this8.emailAvailable = false;
                // Only log in development
                if (true) {
                  console.warn('Email check network error:', _context3.t0.message);
                }
              }
            case 22:
              _context3.prev = 22;
              _this8.emailChecking = false;
              return _context3.finish(22);
            case 25:
            case "end":
              return _context3.stop();
          }
        }, _callee3, null, [[12, 19, 22, 25]]);
      }))();
    }
  },
  watch: {
    // Watch for changes in birthday components and update dob field
    'member.birthdayDay': {
      handler: function handler() {
        this.updateDobField();
      }
    },
    'member.birthdayMonth': {
      handler: function handler() {
        this.updateDobField();
      }
    },
    'member.birthdayYear': {
      handler: function handler() {
        this.updateDobField();
      }
    }
  },
  mounted: function mounted() {
    var _this9 = this;
    return _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee4() {
      return _regeneratorRuntime().wrap(function _callee4$(_context4) {
        while (1) switch (_context4.prev = _context4.next) {
          case 0:
            // Ensure placeholders are visible when component mounts
            _this9.ensurePlaceholdersVisible();
            // Generate available years for birthday dropdown
            _this9.generateAvailableYears();
            // Set current date for member since field
            _this9.setCurrentDate();
            // Fetch available tags for autocomplete
            _context4.next = 5;
            return _this9.fetchAvailableTags();
          case 5:
          case "end":
            return _context4.stop();
        }
      }, _callee4);
    }))();
  }
});

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js??clonedRuleSet-12.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12.use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-12.use[3]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/Members/AddNewMember.vue?vue&type=style&index=0&id=5bc7ede8&lang=scss":
/*!***********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??clonedRuleSet-12.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12.use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-12.use[3]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/Members/AddNewMember.vue?vue&type=style&index=0&id=5bc7ede8&lang=scss ***!
  \***********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
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
___CSS_LOADER_EXPORT___.push([module.id, "@charset \"UTF-8\";\n.filter-btn .btn,\n.filter-btn .btn-secondary,\n.filter-btn .btn-outline-secondary,\n.filter-btn button.btn,\n.filter-btn button.btn-secondary {\n  color: #000 !important;\n  background-color: transparent !important;\n  border-color: #6c757d !important;\n}\n.filter-btn .btn:hover,\n.filter-btn .btn-secondary:hover,\n.filter-btn .btn-outline-secondary:hover,\n.filter-btn button.btn:hover,\n.filter-btn button.btn-secondary:hover {\n  color: #dc3545 !important;\n  background-color: transparent !important;\n  border-color: #dc3545 !important;\n  box-shadow: none !important;\n}\n.filter-btn .btn:focus,\n.filter-btn .btn-secondary:focus,\n.filter-btn .btn-outline-secondary:focus,\n.filter-btn button.btn:focus,\n.filter-btn button.btn-secondary:focus {\n  color: #dc3545 !important;\n  background-color: transparent !important;\n  border-color: #dc3545 !important;\n  box-shadow: none !important;\n}\n.filter-btn .btn:active,\n.filter-btn .btn-secondary:active,\n.filter-btn .btn-outline-secondary:active,\n.filter-btn button.btn:active,\n.filter-btn button.btn-secondary:active {\n  color: #dc3545 !important;\n  background-color: transparent !important;\n  border-color: #dc3545 !important;\n}\n.btn-secondary:not(:disabled):not(.disabled):active:focus {\n  box-shadow: none !important;\n}\n\n/* ===========================================\n   COMMON BREADCRUMB NAVIGATION STYLES\n   =========================================== */\n.breadcrumb-nav-row {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  margin-bottom: 0.5rem;\n  gap: 0.5rem;\n}\n.breadcrumb-section {\n  flex: 1;\n}\n.breadcrumb-section .breadcrumb-nav .breadcrumb-container {\n  display: flex;\n  align-items: center;\n  gap: 1rem;\n}\n.breadcrumb-section .breadcrumb-nav .breadcrumb-container .back-button {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  width: 40px;\n  height: 40px;\n  background: rgba(255, 255, 255, 0.1);\n  border: 1px solid rgba(255, 255, 255, 0.2);\n  border-radius: 8px;\n  color: #ffffff;\n  cursor: pointer;\n  transition: all 0.3s ease;\n}\n.breadcrumb-section .breadcrumb-nav .breadcrumb-container .back-button:hover {\n  background: rgba(255, 255, 255, 0.15);\n  border-color: rgba(255, 255, 255, 0.3);\n  transform: translateY(-1px);\n  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);\n  color: #dc3545;\n}\n.breadcrumb-section .breadcrumb-nav .breadcrumb-container .back-button i {\n  font-size: 1.1em;\n}\n.breadcrumb-section .breadcrumb-nav .breadcrumb-container .breadcrumb {\n  display: flex;\n  align-items: center;\n  gap: 0.5rem;\n  margin: 0;\n  padding: 0;\n  background: none;\n  border-radius: 0;\n}\n.breadcrumb-section .breadcrumb-nav .breadcrumb-container .breadcrumb .breadcrumb-item {\n  display: flex;\n  align-items: center;\n  gap: 0.5rem;\n  font-size: 0.875rem;\n  color: #ffffff;\n}\n.breadcrumb-section .breadcrumb-nav .breadcrumb-container .breadcrumb .breadcrumb-item.active {\n  color: #252525;\n  font-weight: 600;\n}\n.breadcrumb-section .breadcrumb-nav .breadcrumb-container .breadcrumb .breadcrumb-item.active i {\n  color: #dc3545;\n}\n.breadcrumb-section .breadcrumb-nav .breadcrumb-container .breadcrumb .breadcrumb-item a {\n  display: flex;\n  align-items: center;\n  gap: 0.5rem;\n  color: #6a6a6a;\n  text-decoration: none;\n  transition: color 0.3s ease;\n}\n.breadcrumb-section .breadcrumb-nav .breadcrumb-container .breadcrumb .breadcrumb-item a:hover {\n  color: #dc3545;\n}\n.breadcrumb-section .breadcrumb-nav .breadcrumb-container .breadcrumb .breadcrumb-item a:hover i {\n  color: #dc3545;\n}\n.breadcrumb-section .breadcrumb-nav .breadcrumb-container .breadcrumb .breadcrumb-item a i {\n  font-size: 0.9em;\n  transition: color 0.3s ease;\n}\n.breadcrumb-section .breadcrumb-nav .breadcrumb-container .breadcrumb .breadcrumb-item:not(:last-child)::after {\n  content: \"›\";\n  margin-left: 0.5rem;\n  color: #6a6a6a;\n  font-size: 1.2em;\n}\n.action-section {\n  display: flex;\n  align-items: center;\n}\n.action-section .action-btn {\n  display: flex;\n  align-items: center;\n  gap: 0.5rem;\n  padding: 0.5rem 1rem;\n  border-radius: 8px;\n  font-size: 0.875rem;\n  font-weight: 500;\n  transition: all 0.3s ease;\n}\n.action-section .action-btn:hover:not(:disabled) {\n  transform: translateY(-1px);\n  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);\n}\n.action-section .action-btn:disabled {\n  opacity: 0.6;\n  cursor: not-allowed;\n}\n.action-section .action-btn i {\n  font-size: 0.9em;\n}\n@media (max-width: 768px) {\n.breadcrumb-nav-row {\n    flex-direction: column;\n    align-items: flex-start;\n    gap: 0.5rem;\n}\n.breadcrumb-section {\n    width: 100%;\n}\n.breadcrumb-section .breadcrumb-container {\n    flex-direction: column;\n    align-items: flex-start;\n    gap: 0.5rem;\n}\n.breadcrumb-section .breadcrumb-container .breadcrumb {\n    flex-wrap: wrap;\n}\n.breadcrumb-section .breadcrumb-container .breadcrumb .breadcrumb-item {\n    font-size: 0.8rem;\n}\n.breadcrumb-section .breadcrumb-container .breadcrumb .breadcrumb-item a {\n    font-size: 0.8rem;\n}\n.action-section {\n    width: 100%;\n    justify-content: flex-end;\n}\n.action-section .action-btn {\n    font-size: 0.8rem;\n    padding: 0.4rem 0.8rem;\n}\n}\n/* ===========================================\n   RESPONSIVE UTILITY CLASSES (ALL DEVICES)\n   =========================================== */\n.show-xs-only,\n.show-sm-only,\n.show-md-only,\n.show-lg-only,\n.show-xl-only {\n  display: none !important;\n}\n@media (max-width: 575px) {\n.hide-xs {\n    display: none !important;\n}\n.show-xs-only {\n    display: initial !important;\n}\n}\n@media (min-width: 576px) and (max-width: 767px) {\n.hide-sm {\n    display: none !important;\n}\n.show-sm-only {\n    display: initial !important;\n}\n}\n@media (min-width: 768px) and (max-width: 991px) {\n.hide-md {\n    display: none !important;\n}\n.show-md-only {\n    display: initial !important;\n}\n}\n@media (min-width: 992px) and (max-width: 1199px) {\n.hide-lg {\n    display: none !important;\n}\n.show-lg-only {\n    display: initial !important;\n}\n}\n@media (min-width: 1200px) {\n.hide-xl {\n    display: none !important;\n}\n.show-xl-only {\n    display: initial !important;\n}\n}\n@media (max-width: 576px) {\n.hide-sm-down {\n    display: none !important;\n}\n}\n@media (max-width: 768px) {\n.hide-md-down {\n    display: none !important;\n}\n}\n@media (max-width: 992px) {\n.hide-lg-down {\n    display: none !important;\n}\n}\n@media (min-width: 576px) {\n.hide-sm-up {\n    display: none !important;\n}\n}\n@media (min-width: 768px) {\n.hide-md-up {\n    display: none !important;\n}\n}\n@media (min-width: 992px) {\n.hide-lg-up {\n    display: none !important;\n}\n}\n@media (max-width: 575px) {\n.d-xs-none {\n    display: none !important;\n}\n.d-xs-block {\n    display: block !important;\n}\n.d-xs-flex {\n    display: flex !important;\n}\n}\n@media (min-width: 576px) and (max-width: 767px) {\n.d-sm-none {\n    display: none !important;\n}\n.d-sm-block {\n    display: block !important;\n}\n.d-sm-flex {\n    display: flex !important;\n}\n}\n@media (min-width: 768px) and (max-width: 991px) {\n.d-md-none {\n    display: none !important;\n}\n.d-md-block {\n    display: block !important;\n}\n.d-md-flex {\n    display: flex !important;\n}\n}\n@media (min-width: 992px) and (max-width: 1199px) {\n.d-lg-none {\n    display: none !important;\n}\n.d-lg-block {\n    display: block !important;\n}\n.d-lg-flex {\n    display: flex !important;\n}\n}\n@media (min-width: 1200px) {\n.d-xl-none {\n    display: none !important;\n}\n.d-xl-block {\n    display: block !important;\n}\n.d-xl-flex {\n    display: flex !important;\n}\n}\n@media (min-width: 576px) {\n.custom-modal-xl {\n    max-width: 1500px !important;\n}\n}\n.back-button {\n  background: none !important;\n  border: none !important;\n  color: #6c757d !important;\n  font-size: 18px !important;\n  cursor: pointer !important;\n  padding: 8px !important;\n  border-radius: 6px !important;\n  transition: all 0.2s ease !important;\n  display: flex !important;\n  align-items: center !important;\n  justify-content: center !important;\n  min-width: 36px !important;\n  min-height: 36px !important;\n  position: relative !important;\n  z-index: 10 !important;\n  pointer-events: auto !important;\n}\n.back-button:hover {\n  color: red !important;\n  transform: translateX(-2px);\n}\n.back-button:active {\n  transform: translateX(-1px);\n}\n.back-button i {\n  font-size: 16px;\n}\n\n/* Very Small Devices (≤480px) */\n@media (max-width: 480px) {\n.member-form-container {\n    padding: 0 4px;\n}\n.profile-picture {\n    width: 120px;\n    height: 120px;\n}\n.header-icon {\n    width: 36px;\n    height: 36px;\n    font-size: 12px;\n}\n.form-title {\n    font-size: 0.95rem;\n}\n.form-subtitle {\n    font-size: 0.7rem;\n}\n.section-title {\n    font-size: 15px;\n    margin-bottom: 12px;\n}\n.form-fields {\n    gap: 4px;\n}\n.form-label {\n    font-size: 11px !important;\n}\n.form-control {\n    font-size: 10.5px;\n    padding: 6px 8px;\n}\n.input-icon,\n  .input-icon-lower {\n    right: 8px;\n    font-size: 12px;\n}\n.change-button,\n  .webcam-button {\n    padding: 5px 10px;\n    font-size: 12px;\n}\n.submit-btn,\n  .cancel-btn {\n    max-width: 240px;\n    padding: 9px 16px;\n}\n}\n/* Ultra Small Devices (≤360px) */\n@media (max-width: 360px) {\n.profile-picture {\n    width: 100px;\n    height: 100px;\n}\n.form-fields-section {\n    padding: 10px 6px;\n}\n.form-label {\n    font-size: 10px !important;\n}\n.form-control {\n    font-size: 10px;\n    padding: 5px 7px;\n}\n.submit-btn,\n  .cancel-btn {\n    max-width: 220px;\n    font-size: 0.8rem;\n    padding: 8px 14px;\n}\n}\n.breadcrumb-nav {\n  margin-bottom: 5px;\n}\n.breadcrumb-container {\n  display: flex;\n  align-items: center;\n  gap: 15px;\n}\n.member-form-container {\n  min-height: 100vh;\n  background: linear-gradient(135deg, #f5f5f3 0%, #e8e8e6 100%);\n  padding: 15px;\n  box-sizing: border-box;\n}\n.form-card {\n  background: #ffffff;\n  border-radius: 20px;\n  box-shadow: 0 20px 60px rgba(79, 112, 92, 0.15);\n  overflow: hidden;\n  width: 100%;\n  max-width: 100%;\n  box-sizing: border-box;\n}\n.form-header {\n  background: linear-gradient(to bottom, #23415a, #0f1c29);\n  color: white;\n  text-align: center;\n  position: relative;\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 10px;\n  padding: 8px;\n}\n.form-header::before {\n  content: \"\";\n  position: absolute;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  background: url('data:image/svg+xml,<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 100 100\"><defs><pattern id=\"grain\" width=\"100\" height=\"100\" patternUnits=\"userSpaceOnUse\"><circle cx=\"25\" cy=\"25\" r=\"1\" fill=\"white\" opacity=\"0.1\"/><circle cx=\"75\" cy=\"75\" r=\"1\" fill=\"white\" opacity=\"0.1\"/><circle cx=\"50\" cy=\"10\" r=\"0.5\" fill=\"white\" opacity=\"0.1\"/><circle cx=\"10\" cy=\"60\" r=\"0.5\" fill=\"white\" opacity=\"0.1\"/><circle cx=\"90\" cy=\"40\" r=\"0.5\" fill=\"white\" opacity=\"0.1\"/></pattern></defs><rect width=\"100\" height=\"100\" fill=\"url(%23grain)\"/></svg>');\n  opacity: 0.3;\n}\n.header-content {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n  flex: 1;\n  justify-content: center;\n}\n.header-icon {\n  width: 45px;\n  height: 45px;\n  background: rgba(255, 255, 255, 0.2);\n  border-radius: 50%;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-size: 15px;\n  flex-shrink: 0;\n}\n.form-title {\n  font-size: 1.1rem;\n  font-weight: 700;\n  color: #ffffff;\n  margin: 0;\n}\n.form-subtitle {\n  font-size: 0.8rem;\n  opacity: 0.9;\n  margin: 0;\n}\n.member-form {\n  padding: 10px;\n}\n.member-data-layout {\n  display: flex;\n  gap: 35px;\n  align-items: flex-start;\n  flex-wrap: wrap;\n}\n.profile-section {\n  flex: 0 0 290px;\n  display: flex;\n  justify-content: center;\n  min-width: 250px;\n}\n.profile-picture-container {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: 15px;\n}\n.profile-picture {\n  width: 200px;\n  height: 200px;\n  border-radius: 50%;\n  background: #f5f5f5;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  cursor: pointer;\n  border: 3px solid #e0e0e0;\n  transition: all 0.3s ease;\n  overflow: hidden;\n}\n.profile-picture:hover {\n  border-color: #dc3545;\n  transform: scale(1.02);\n}\n.profile-placeholder {\n  color: #999;\n  font-size: 60px;\n}\n.profile-image {\n  width: 100%;\n  height: 100%;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n.preview-image {\n  width: 100%;\n  height: 100%;\n  -o-object-fit: cover;\n     object-fit: cover;\n  border-radius: 50%;\n}\n.change-button {\n  background: #dc3545;\n  color: white;\n  border: none;\n  padding: 8px 20px;\n  border-radius: 4px;\n  cursor: pointer;\n  font-size: 14px;\n  font-weight: 500;\n  transition: all 0.3s ease;\n}\n.change-button:hover {\n  background: #e63939;\n  transform: translateY(-1px);\n}\n.webcam-button {\n  background: white;\n  color: #333;\n  border: 1px solid #ddd;\n  padding: 8px 20px;\n  border-radius: 4px;\n  cursor: pointer;\n  font-size: 14px;\n  font-weight: 500;\n  transition: all 0.3s ease;\n}\n.webcam-button:hover {\n  background: #f8f9fa;\n  border-color: #dc3545;\n}\n.form-fields-section {\n  flex: 1;\n  background: white;\n  padding: 30px;\n  border-radius: 8px;\n  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);\n  min-width: 300px;\n  box-sizing: border-box;\n}\n.section-title {\n  font-size: 24px;\n  font-weight: 600;\n  color: #333;\n  margin-bottom: 30px;\n  padding-bottom: 10px;\n  border-bottom: 2px solid #f0f0f0;\n}\n.form-fields {\n  display: flex;\n  flex-direction: column;\n  gap: 5px;\n}\n.photo-upload-container.compact {\n  text-align: center;\n}\n.upload-area.compact {\n  border: 2px dashed #252525;\n  border-radius: 8px;\n  padding: 15px;\n  cursor: pointer;\n  transition: all 0.3s ease;\n  background: #dededc;\n  position: relative;\n  overflow: hidden;\n  max-width: 150px;\n  margin: 0 auto;\n}\n.upload-area.compact:hover {\n  border-color: #dc3545;\n  background: #dededc;\n  transform: translateY(-2px);\n}\n.upload-placeholder.compact {\n  color: #252525;\n  text-align: center;\n}\n.upload-placeholder.compact i {\n  font-size: 20px;\n  margin-bottom: 5px;\n  color: #252525;\n}\n.upload-placeholder.compact p {\n  font-size: 0.8rem;\n  font-weight: 600;\n  margin-bottom: 0;\n}\n.photo-preview.compact {\n  position: relative;\n  display: inline-block;\n}\n.preview-image.compact {\n  width: 70px;\n  height: 70px;\n  border-radius: 15%;\n  -o-object-fit: cover;\n     object-fit: cover;\n  border: 2px solid white;\n  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.2);\n}\n.preview-overlay.compact {\n  position: absolute;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  background: rgba(79, 112, 92, 0.8);\n  border-radius: 50%;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  color: white;\n  opacity: 0;\n  transition: opacity 0.3s ease;\n}\n.photo-preview.compact:hover .preview-overlay.compact {\n  opacity: 1;\n}\n.preview-overlay.compact i {\n  font-size: 14px;\n}\n.form-section:hover {\n  transform: translateY(-2px);\n  box-shadow: 0 10px 30px rgba(79, 112, 92, 0.1);\n  border-color: #dc3545;\n}\n.section-header {\n  display: flex;\n  align-items: center;\n  margin-bottom: 15px;\n  padding-bottom: 10px;\n  border-bottom: 2px solid #dcdcdc;\n}\n.section-header.compact {\n  padding-bottom: 3px;\n  /* Further reduced padding for compact headers */\n  border-bottom: 1px solid #dcdcdc;\n  /* Thinner border for compact */\n  margin-bottom: 8px;\n}\n.section-content.compact {\n  padding: 0;\n}\n.section-icon {\n  width: 40px;\n  height: 40px;\n  background: #dc3545;\n  border-radius: 8px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  color: white;\n  font-size: 16px;\n  margin-right: 12px;\n  box-shadow: 0 2px 8px rgba(79, 112, 92, 0.3);\n}\n.section-title {\n  font-size: 1.3rem;\n  font-weight: 600;\n  color: #252525;\n  margin: 0;\n}\n.form-group {\n  display: flex;\n  flex-direction: column;\n  gap: 8px;\n}\n.form-row {\n  display: flex;\n  align-items: center;\n  gap: 20px;\n  margin-bottom: 12px;\n  padding: 6px 0;\n  border-bottom: 1px solid #f0f0f0;\n}\n.form-row:last-child {\n  border-bottom: none;\n}\n.form-row .form-label {\n  flex: 0 0 180px;\n  margin-bottom: 0;\n  font-weight: 500;\n  color: #333;\n  font-size: 14px;\n  display: flex;\n  align-items: center;\n  gap: 5px;\n  text-align: left;\n}\n.form-row .input-wrapper,\n.form-row select {\n  flex: 1;\n  min-width: 0;\n}\n.birthday-inputs {\n  display: flex;\n  gap: 10px;\n  flex: 1;\n}\n.birthday-select {\n  flex: 1;\n  min-width: 0;\n}\n\n/* Ensure form controls in horizontal layout have consistent styling */\n.form-row .form-control {\n  font-size: 14px;\n  border: 1px solid #ddd;\n  border-radius: 4px;\n  background: #f8f9fa;\n  transition: all 0.3s ease;\n}\n.form-row .form-control:focus {\n  outline: none;\n  border-color: #dc3545;\n  background: white;\n  box-shadow: 0 0 0 2px rgba(220, 53, 69, 0.25);\n}\n\n/* Business Selection Styling */\n.business-selection {\n  flex: 1;\n}\n.radio-group {\n  display: flex;\n  gap: 20px;\n  align-items: center;\n  flex-wrap: wrap;\n}\n.radio-option {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  cursor: pointer;\n  font-size: 14px;\n  color: #333;\n  transition: color 0.3s ease;\n}\n.radio-option:hover {\n  color: #dc3545;\n}\n.radio-option input[type=radio] {\n  width: 16px;\n  height: 16px;\n  margin: 0;\n  cursor: pointer;\n  accent-color: #dc3545;\n}\n.radio-label {\n  font-weight: 500;\n  -webkit-user-select: none;\n     -moz-user-select: none;\n          user-select: none;\n}\n.inline-dropdown {\n  margin-left: 10px;\n  min-width: 200px;\n  flex: 1;\n}\n.inline-dropdown .form-control {\n  width: 100%;\n  font-size: 14px;\n  border: 1px solid #ddd;\n  border-radius: 4px;\n  background: #f8f9fa;\n  transition: all 0.3s ease;\n}\n.inline-dropdown .form-control:focus {\n  outline: none;\n  border-color: #dc3545;\n  background: white;\n  box-shadow: 0 0 0 2px rgba(220, 53, 69, 0.25);\n}\n\n/* Checkbox wrapper for horizontal layout */\n.checkbox-wrapper {\n  flex: 1;\n  display: flex;\n  align-items: center;\n}\n.checkbox-wrapper .custom-checkbox {\n  margin-bottom: 0;\n}\n.form-label {\n  font-weight: bold !important;\n  font-weight: 500;\n  color: #333;\n  font-size: 13px !important;\n  display: flex;\n  align-items: center;\n  gap: 3px;\n  flex-wrap: wrap;\n}\n.info-icon {\n  color: #6c757d;\n  font-size: 11px;\n  cursor: pointer;\n  opacity: 0.7;\n  transition: opacity 0.2s ease, color 0.2s ease;\n  margin-left: 4px;\n}\n.info-icon:hover {\n  opacity: 1;\n  color: #495057;\n}\n\n/* Tooltip */\n.tooltip-wrapper {\n  position: relative;\n  display: inline-flex;\n  align-items: center;\n  margin-left: 2px;\n}\n.tooltip-wrapper:hover .tooltip-content {\n  opacity: 1;\n  visibility: visible;\n  transform: translateY(-50%) translateY(0);\n}\n.tooltip-content {\n  position: absolute;\n  left: 100%;\n  top: 50%;\n  transform: translateY(-50%) translateY(4px);\n  margin-left: 6px;\n  background: #212529;\n  color: #fff;\n  padding: 4px 6px;\n  border-radius: 3px;\n  font-size: 11px;\n  line-height: 1.3;\n  white-space: nowrap;\n  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);\n  opacity: 0;\n  visibility: hidden;\n  transition: opacity 0.2s ease, transform 0.2s ease, visibility 0.2s ease;\n  z-index: 10;\n  max-width: 200px;\n  white-space: normal;\n}\n.tooltip-content::after {\n  content: \"\";\n  position: absolute;\n  left: -4px;\n  top: 50%;\n  transform: translateY(-50%);\n  width: 0;\n  height: 0;\n  border-top: 4px solid transparent;\n  border-bottom: 4px solid transparent;\n  border-right: 4px solid #212529;\n}\n.tooltip-content.is-visible {\n  opacity: 1;\n  visibility: visible;\n  transform: translateY(-50%);\n}\n.form-control {\n  width: 100%;\n  border: 1px solid #ddd;\n  border-radius: 4px;\n  font-size: 14px;\n  transition: all 0.3s ease;\n  background: #f8f9fa;\n  color: #333;\n  box-sizing: border-box;\n}\n\n/* Unified input icon styling (match coach page) */\n.member-form .form-control {\n  padding-left: 36px;\n  background-repeat: no-repeat;\n  background-position: 10px 50%;\n  background-size: 16px 16px;\n}\n\n/* Text default (user) */\n.member-form input[type=text].form-control {\n  background-image: url('data:image/svg+xml;utf8,<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"16\" height=\"16\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"%236c757d\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2\"/><circle cx=\"12\" cy=\"7\" r=\"4\"/></svg>');\n  background-repeat: no-repeat !important;\n  background-size: 16px 16px !important;\n}\n\n/* Email */\n.member-form input[type=email].form-control {\n  background-image: url('data:image/svg+xml;utf8,<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"16\" height=\"16\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"%236c757d\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M4 4h16v16H4z\"/><path d=\"M22 6l-10 7L2 6\"/></svg>');\n  background-repeat: no-repeat !important;\n  background-size: 16px 16px !important;\n  background-position: 10px 50% !important;\n}\n\n/* Telephone */\n.member-form input[type=tel].form-control {\n  background-image: url('data:image/svg+xml;utf8,<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"16\" height=\"16\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"%236c757d\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.09 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.12.81.3 1.6.54 2.36a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.72-1.11a2 2 0 0 1 2.11-.45c.76.24 1.55.42 2.36.54A2 2 0 0 1 22 16.92z\"/></svg>');\n  background-repeat: no-repeat !important;\n  background-size: 16px 16px !important;\n  background-position: 10px 50% !important;\n}\n\n/* Number */\n.member-form input[type=number].form-control {\n  background-image: url('data:image/svg+xml;utf8,<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"16\" height=\"16\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"%236c757d\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M5 3v18\"/><path d=\"M19 3v18\"/><path d=\"M5 7h14\"/><path d=\"M5 17h14\"/></svg>');\n  background-repeat: no-repeat !important;\n  background-size: 16px 16px !important;\n  background-position: 10px 50% !important;\n}\n\n/* Date */\n.member-form input[type=date].form-control {\n  background-image: url('data:image/svg+xml;utf8,<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"16\" height=\"16\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"%236c757d\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><rect x=\"3\" y=\"4\" width=\"18\" height=\"18\" rx=\"2\" ry=\"2\"/><line x1=\"16\" y1=\"2\" x2=\"16\" y2=\"6\"/><line x1=\"8\" y1=\"2\" x2=\"8\" y2=\"6\"/><line x1=\"3\" y1=\"10\" x2=\"21\" y2=\"10\"/></svg>');\n  background-repeat: no-repeat !important;\n  background-size: 16px 16px !important;\n  background-position: 10px 50% !important;\n}\n\n/* Select (single) */\n.member-form select.form-control {\n  background-image: url('data:image/svg+xml;utf8,<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"16\" height=\"16\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"%236c757d\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><polyline points=\"6 9 12 15 18 9\"/></svg>');\n  background-repeat: no-repeat !important;\n  background-size: 16px 16px !important;\n  background-position: 10px 50% !important;\n}\n\n/* Textarea */\n.member-form textarea.form-control {\n  background-image: url('data:image/svg+xml;utf8,<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"16\" height=\"16\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"%236c757d\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z\"/></svg>');\n  background-repeat: no-repeat !important;\n  background-size: 16px 16px !important;\n  background-position: 10px 50% !important;\n}\n\n/* Disabled inputs: remove icons to avoid browser background resets */\n.member-form input.form-control:disabled,\n.member-form select.form-control:disabled,\n.member-form textarea.form-control:disabled {\n  background-image: none !important;\n  padding-left: 10px !important;\n}\n\n/* Hide old inline icon wrappers to match new look */\n.input-icon,\n.input-icon-lower,\n.input-icon-lower.textarea-icon {\n  display: none !important;\n}\n.form-control:focus {\n  outline: none;\n  border-color: #dc3545;\n  background: white;\n  box-shadow: 0 0 0 2px rgba(255, 64, 64, 0.25);\n}\n.form-control:disabled {\n  background: #e9ecef;\n  color: #6c757d;\n  cursor: not-allowed;\n}\n\n/* Birthday date input styling */\ninput[type=date] {\n  position: relative;\n}\ninput[type=date]::-webkit-calendar-picker-indicator {\n  position: absolute;\n  right: 12px;\n  top: 50%;\n  transform: translateY(-50%);\n  cursor: pointer;\n  color: #6c757d;\n  font-size: 16px;\n}\ninput[type=date]:focus::-webkit-calendar-picker-indicator {\n  color: #dc3545;\n}\n.form-control::-moz-placeholder {\n  color: #6c757d !important;\n  opacity: 1 !important;\n  font-size: 12px;\n}\n.form-control::placeholder {\n  color: #6c757d !important;\n  opacity: 1 !important;\n  font-size: 12px;\n}\n.form-control:focus::-moz-placeholder {\n  color: #6c757d !important;\n  opacity: 0.7 !important;\n}\n.form-control:focus::placeholder {\n  color: #6c757d !important;\n  opacity: 0.7 !important;\n}\n.form-control.has-value::-moz-placeholder {\n  color: #6c757d !important;\n  opacity: 0.7 !important;\n}\n.form-control.has-value::placeholder {\n  color: #6c757d !important;\n  opacity: 0.7 !important;\n}\n\n/* Ensure placeholders are visible in all browsers */\n.form-control::-webkit-input-placeholder {\n  color: #6c757d !important;\n  opacity: 1 !important;\n}\n.form-control::-moz-placeholder {\n  color: #6c757d !important;\n  opacity: 1 !important;\n}\n.form-control:-ms-input-placeholder {\n  color: #6c757d !important;\n  opacity: 1 !important;\n}\n.form-control:-moz-placeholder {\n  color: #6c757d !important;\n  opacity: 1 !important;\n}\n\n/* Additional styling to ensure placeholders are visible */\ninput[type=text]::-moz-placeholder, input[type=email]::-moz-placeholder, input[type=tel]::-moz-placeholder, input[type=date]::-moz-placeholder, textarea::-moz-placeholder {\n  color: #6c757d !important;\n  opacity: 1 !important;\n  font-size: 12px !important;\n}\ninput[type=text]::placeholder,\ninput[type=email]::placeholder,\ninput[type=tel]::placeholder,\ninput[type=date]::placeholder,\ntextarea::placeholder {\n  color: #6c757d !important;\n  opacity: 1 !important;\n  font-size: 12px !important;\n}\n\n/* Force placeholder visibility */\n.form-control:not(:focus):not(.has-value)::-moz-placeholder {\n  color: #6c757d !important;\n  opacity: 1 !important;\n  visibility: visible !important;\n}\n.form-control:not(:focus):not(.has-value)::placeholder {\n  color: #6c757d !important;\n  opacity: 1 !important;\n  visibility: visible !important;\n}\n.input-wrapper {\n  position: relative;\n  width: 100%;\n}\n.input-icon {\n  position: absolute;\n  right: 16px;\n  top: 55%;\n  transform: translateY(-50%);\n  color: #252525;\n  font-size: 14px;\n  pointer-events: none;\n}\n.input-icon-lower {\n  position: absolute;\n  right: 16px;\n  top: 75%;\n  transform: translateY(-50%);\n  color: #252525;\n  font-size: 14px;\n  pointer-events: none;\n}\n.textarea-icon {\n  top: 30px;\n  transform: none;\n}\n.form-control:focus + .input-icon {\n  color: #dc3545;\n}\n.photo-upload-container {\n  text-align: center;\n}\n.upload-area {\n  border: 2px dashed #252525;\n  border-radius: 15px;\n  padding: 15px;\n  cursor: pointer;\n  transition: all 0.3s ease;\n  background: #dededc;\n  position: relative;\n  overflow: hidden;\n}\n.upload-area:hover {\n  border-color: #dc3545;\n  background: #dededc;\n  transform: translateY(-2px);\n}\n.upload-placeholder {\n  color: #252525;\n}\n.upload-placeholder i {\n  font-size: 40px;\n  margin-bottom: 10px;\n  color: #252525;\n}\n.upload-placeholder p {\n  font-size: 1rem;\n  font-weight: 600;\n  margin-bottom: 0px;\n}\n.upload-hint {\n  font-size: 0.8rem;\n  opacity: 0.7;\n}\n.photo-preview {\n  position: relative;\n  display: inline-block;\n}\n.preview-image {\n  width: 190px;\n  height: 190px;\n  border-radius: 50%;\n  -o-object-fit: contain;\n     object-fit: contain;\n  border: 4px solid white;\n}\n.preview-overlay {\n  position: absolute;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  background: rgba(79, 112, 92, 0.8);\n  border-radius: 50%;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  color: white;\n  opacity: 0;\n  transition: opacity 0.3s ease;\n}\n.photo-preview:hover .preview-overlay {\n  opacity: 1;\n}\n.preview-overlay i {\n  font-size: 24px;\n  margin-bottom: 5px;\n}\n.file-input {\n  display: none;\n}\n.submit-section {\n  text-align: center;\n  margin-top: 10px;\n  padding-top: 10px;\n  border-top: 1px solid #dcdcdc;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  gap: 15px;\n  flex-wrap: wrap;\n}\n.submit-btn {\n  background: #dc3545;\n  color: white;\n  border: none;\n  padding: 10px 25px;\n  border-radius: 25px;\n  font-size: 1rem;\n  font-weight: 600;\n  cursor: pointer;\n  transition: all 0.3s ease;\n  box-shadow: 0 8px 20px rgba(255, 64, 64, 0.3);\n  display: inline-flex;\n  align-items: center;\n  gap: 8px;\n}\n.submit-btn:hover {\n  transform: translateY(-2px);\n  background: #e63939;\n  box-shadow: 0 15px 40px rgba(255, 64, 64, 0.4);\n}\n.submit-btn:active {\n  transform: translateY(0);\n}\n.cancel-btn {\n  background: #6c757d;\n  color: white;\n  border: none;\n  padding: 10px 25px;\n  border-radius: 25px;\n  font-size: 1rem;\n  font-weight: 600;\n  cursor: pointer;\n  transition: all 0.3s ease;\n  box-shadow: 0 4px 10px rgba(108, 117, 125, 0.3);\n  display: inline-flex;\n  align-items: center;\n  gap: 8px;\n}\n.cancel-btn:hover {\n  transform: translateY(-2px);\n  background: #5a6268;\n  box-shadow: 0 8px 20px rgba(108, 117, 125, 0.4);\n}\n.cancel-btn:active {\n  transform: translateY(0);\n}\n\n/* Responsive Design - Comprehensive Mobile-First Approach */\n/* Extra Large Devices (1200px and up) */\n@media (min-width: 1200px) {\n.member-form-container {\n    padding: 20px;\n}\n.form-card {\n    max-width: 1200px;\n    margin: 0 auto;\n}\n.member-data-layout {\n    gap: 50px;\n}\n.profile-picture {\n    width: 220px;\n    height: 220px;\n}\n}\n/* Large Devices (992px to 1199px) */\n@media (max-width: 1199px) and (min-width: 992px) {\n.member-form-container {\n    padding: 15px;\n}\n.member-data-layout {\n    gap: 40px;\n}\n.profile-picture {\n    width: 200px;\n    height: 200px;\n}\n}\n/* Medium Devices (768px to 991px) */\n@media (max-width: 991px) and (min-width: 768px) {\n.member-form-container {\n    padding: 10px;\n}\n.member-data-layout {\n    gap: 30px;\n}\n.profile-picture {\n    width: 180px;\n    height: 180px;\n}\n.form-fields-section {\n    padding: 25px;\n}\n.section-title {\n    font-size: 20px;\n}\n}\n/* Small Devices (576px to 767px) */\n@media (max-width: 767px) {\n.member-form-container {\n    padding: 5px;\n    min-height: 100vh;\n}\n.form-card {\n    border-radius: 15px;\n    margin: 5px;\n}\n.form-header {\n    padding: 10px;\n    flex-direction: column;\n    gap: 10px;\n    text-align: center;\n}\n.header-content {\n    flex-direction: column;\n    gap: 8px;\n}\n.form-title {\n    font-size: 1.1rem;\n}\n.form-subtitle {\n    font-size: 0.8rem;\n}\n.header-icon {\n    width: 45px;\n    height: 45px;\n    font-size: 16px;\n}\n.member-data-layout {\n    flex-direction: column;\n    gap: 25px;\n}\n.profile-section {\n    flex: none;\n    align-items: center;\n    padding: 20px 0;\n}\n.profile-picture {\n    width: 160px;\n    height: 160px;\n}\n.profile-picture-container {\n    gap: 12px;\n}\n.change-button, .webcam-button {\n    padding: 6px 16px;\n    font-size: 13px;\n}\n.form-fields-section {\n    padding: 16px 12px;\n}\n.section-title {\n    font-size: 18px;\n    margin-bottom: 20px;\n}\n.form-row {\n    flex-direction: column;\n    align-items: flex-start;\n    gap: 8px;\n    margin-bottom: 12px;\n}\n.form-row .form-label {\n    flex: none;\n    width: 100%;\n    font-size: 13px;\n    margin-bottom: 5px;\n}\n.form-row .input-wrapper,\n  .form-row select {\n    width: 100%;\n}\n.birthday-inputs {\n    width: 100%;\n    gap: 6px;\n}\n.birthday-select {\n    flex: 1;\n}\n.business-selection {\n    width: 100%;\n}\n.radio-group {\n    gap: 15px;\n    flex-direction: column;\n    align-items: flex-start;\n}\n.radio-option {\n    font-size: 13px;\n}\n.inline-dropdown {\n    margin-left: 0;\n    margin-top: 8px;\n    width: 100%;\n    min-width: auto;\n}\n.checkbox-wrapper {\n    width: 100%;\n    margin-top: 8px;\n}\n.form-group {\n    margin-bottom: 12px;\n}\n.form-label {\n    font-size: 13px;\n    margin-bottom: 5px;\n}\n.form-control {\n    font-size: 12px;\n    padding: 8px 10px;\n}\n.input-icon {\n    right: 12px;\n    top: 55%;\n    font-size: 13px;\n}\n.input-icon-lower {\n    right: 12px;\n    top: 75%;\n    font-size: 13px;\n}\n.submit-btn,\n  .cancel-btn {\n    padding: 10px 22px;\n    font-size: 0.9rem;\n    width: 100%;\n    max-width: 280px;\n}\n.tooltip-content {\n    font-size: 10px;\n    padding: 3px 5px;\n    max-width: 150px;\n}\n.info-icon {\n    font-size: 10px;\n}\n}\n/* Extra Small Devices (up to 575px) */\n@media (max-width: 575px) {\n.member-form-container {\n    padding: 2px;\n}\n.form-card {\n    border-radius: 10px;\n    margin: 2px;\n}\n.form-header {\n    padding: 8px;\n}\n.form-title {\n    font-size: 1rem;\n}\n.form-subtitle {\n    font-size: 0.75rem;\n}\n.header-icon {\n    width: 40px;\n    height: 40px;\n    font-size: 14px;\n}\n.profile-picture {\n    width: 140px;\n    height: 140px;\n}\n.profile-picture-container {\n    gap: 10px;\n}\n.change-button, .webcam-button {\n    padding: 5px 12px;\n    font-size: 12px;\n}\n.form-fields-section {\n    padding: 12px 8px;\n}\n.section-title {\n    font-size: 16px;\n    margin-bottom: 15px;\n}\n.form-group {\n    margin-bottom: 10px;\n}\n.form-label {\n    font-size: 12px;\n    margin-bottom: 4px;\n}\n.form-control {\n    font-size: 11px;\n    padding: 7px 9px;\n}\n.input-icon {\n    right: 10px;\n    top: 55%;\n    font-size: 12px;\n}\n.input-icon-lower {\n    right: 10px;\n    top: 75%;\n    font-size: 12px;\n}\n.submit-btn,\n  .cancel-btn {\n    padding: 9px 18px;\n    font-size: 0.85rem;\n}\n.custom-checkbox {\n    padding: 6px 10px;\n}\n.checkbox-label {\n    font-size: 0.8rem;\n}\n.checkmark {\n    height: 16px;\n    width: 16px;\n}\n.tooltip-content {\n    font-size: 9px;\n    padding: 2px 4px;\n    max-width: 120px;\n}\n.info-icon {\n    font-size: 9px;\n}\n.breadcrumb-container {\n    gap: 10px;\n}\n.back-button {\n    min-width: 32px;\n    min-height: 32px;\n    font-size: 14px;\n}\n}\n/* Landscape Mobile Devices */\n@media (max-width: 767px) and (orientation: landscape) {\n.member-data-layout {\n    flex-direction: row;\n    gap: 20px;\n}\n.profile-section {\n    flex: 0 0 200px;\n}\n.profile-picture {\n    width: 120px;\n    height: 120px;\n}\n.form-fields-section {\n    padding: 15px;\n}\n}\n/* Touch Device Optimizations */\n@media (hover: none) and (pointer: coarse) {\n.form-control {\n    font-size: 13px; /* Prevents zoom on iOS */\n}\n.submit-btn,\n  .cancel-btn {\n    padding: 14px 30px;\n    font-size: 1rem;\n}\n.change-button, .webcam-button {\n    padding: 10px 20px;\n    font-size: 14px;\n}\n.custom-checkbox {\n    padding: 10px 12px;\n}\n.back-button {\n    min-width: 44px;\n    min-height: 44px;\n}\n}\n/* High DPI Displays */\n@media (-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi) {\n.form-control {\n    border-width: 0.5px;\n}\n.form-card {\n    box-shadow: 0 10px 30px rgba(79, 112, 92, 0.1);\n}\n}\n/* Print Styles */\n@media print {\n.member-form-container {\n    background: white;\n    padding: 0;\n}\n.form-card {\n    box-shadow: none;\n    border: 1px solid #ddd;\n}\n.form-header {\n    background: #f8f9fa;\n    color: #333;\n}\n.submit-section {\n    display: none;\n}\n.profile-picture-container {\n    display: none;\n}\n}\n/* Animation for form sections */\n.form-section {\n  animation: fadeInUp 0.6s ease forwards;\n  opacity: 0;\n  transform: translateY(20px);\n}\n.form-section:nth-child(1) {\n  animation-delay: 0.1s;\n}\n.form-section:nth-child(2) {\n  animation-delay: 0.2s;\n}\n.form-section:nth-child(3) {\n  animation-delay: 0.3s;\n}\n.form-section:nth-child(4) {\n  animation-delay: 0.4s;\n}\n.form-section:nth-child(5) {\n  animation-delay: 0.5s;\n}\n.form-section:nth-child(6) {\n  animation-delay: 0.6s;\n}\n@keyframes fadeInUp {\nto {\n    opacity: 1;\n    transform: translateY(0);\n}\n}\n/* Custom scrollbar */\n.member-form-container::-webkit-scrollbar {\n  width: 8px;\n}\n.member-form-container::-webkit-scrollbar-track {\n  background: #f5f5f3;\n}\n.member-form-container::-webkit-scrollbar-thumb {\n  background: #dc3545;\n  border-radius: 4px;\n}\n.member-form-container::-webkit-scrollbar-thumb:hover {\n  background: #dc3545;\n}\n\n/* Invoice Checkbox Styling */\n.invoice-checkbox {\n  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);\n  border: 1px solid #dee2e6;\n  border-radius: 8px;\n  padding: 8px 12px;\n  transition: all 0.3s ease;\n}\n.invoice-checkbox:hover {\n  border-color: #dc3545;\n  background: linear-gradient(135deg, #e8f5e8 0%, #d4edda 100%);\n  transform: translateY(-1px);\n}\n.invoice-checkbox input:checked + .features-list {\n  color: #dc3545;\n  font-weight: 600;\n}\n.invoice-checkbox .features-list i {\n  color: #dc3545;\n}\n\n/* Custom Checkbox Styling */\n.custom-checkbox {\n  position: relative;\n  display: flex;\n  align-items: center;\n  cursor: pointer;\n  background: #dededc;\n  border: 1px solid #dcdcdc;\n  border-radius: 8px;\n  padding: 8px 12px;\n  transition: all 0.3s ease;\n  margin-bottom: 5px;\n}\n.custom-checkbox:hover {\n  border-color: #dc3545;\n  background: rgba(79, 112, 92, 0.05);\n  transform: translateY(-1px);\n  box-shadow: 0 2px 8px rgba(79, 112, 92, 0.1);\n}\n.custom-checkbox input[type=checkbox] {\n  position: absolute;\n  opacity: 0;\n  cursor: pointer;\n  height: 0;\n  width: 0;\n}\n.checkmark {\n  position: relative;\n  height: 18px;\n  width: 18px;\n  background-color: #ffffff;\n  border: 2px solid #dcdcdc;\n  border-radius: 4px;\n  margin-right: 10px;\n  transition: all 0.3s ease;\n  flex-shrink: 0;\n}\n.custom-checkbox:hover .checkmark {\n  border-color: #dc3545;\n}\n.custom-checkbox input:checked ~ .checkmark {\n  background-color: #dc3545;\n  border-color: #dc3545;\n}\n.checkmark:after {\n  content: \"\";\n  position: absolute;\n  display: none;\n  left: 5px;\n  top: 2px;\n  width: 4px;\n  height: 8px;\n  border: solid white;\n  border-width: 0 2px 2px 0;\n  transform: rotate(45deg);\n}\n.custom-checkbox input:checked ~ .checkmark:after {\n  display: block;\n}\n.checkbox-label {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  font-size: 0.85rem;\n  font-weight: 500;\n  color: #252525;\n  transition: color 0.3s ease;\n}\n.custom-checkbox:hover .checkbox-label {\n  color: #dc3545;\n}\n.custom-checkbox input:checked ~ .checkbox-label {\n  color: #dc3545;\n  font-weight: 600;\n}\n.checkbox-label i {\n  font-size: 14px;\n  color: #252525;\n  transition: color 0.3s ease;\n}\n.custom-checkbox:hover .checkbox-label i {\n  color: #dc3545;\n}\n.custom-checkbox input:checked ~ .checkbox-label i {\n  color: #dc3545;\n}\n\n/* Invitation Checkbox Styling */\n.invitation-checkbox .checkbox-label {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n}\n.invitation-checkbox .checkbox-label .info-icon {\n  color: #6c757d;\n  font-size: 12px;\n  cursor: pointer;\n  background: none;\n  border: none;\n  padding: 0;\n  transition: color 0.2s ease;\n}\n.invitation-checkbox .checkbox-label .info-icon:hover {\n  color: #495057;\n}\n\n/* Required field asterisk styling */\n.required-asterisk {\n  color: #dc3545;\n  font-weight: bold;\n  margin-left: 2px;\n}\n\n/* Dropdown styling with down arrow indicators */\nselect.form-control {\n  appearance: none;\n  -webkit-appearance: none;\n  -moz-appearance: none;\n  background-image: url(\"data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6,9 12,15 18,9'%3e%3c/polyline%3e%3c/svg%3e\");\n  background-repeat: no-repeat;\n  background-position: right 12px center;\n  background-size: 16px;\n  padding-right: 40px;\n  cursor: pointer;\n}\n\n/* Fallback for older browsers */\nselect.form-control::-ms-expand {\n  display: none;\n}\n\n/* Loading state for subscription plans */\n.form-control:disabled {\n  background-color: #f8f9fa;\n  color: #6c757d;\n  cursor: not-allowed;\n}\n\n/* Tags Input Styling */\n.tags-input-container {\n  width: 100%;\n}\n.tags-search {\n  position: relative;\n  width: 100%;\n}\n.tags-input {\n  width: 100%;\n  padding-left: 35px;\n}\n.search-icon {\n  position: absolute;\n  left: 12px;\n  top: 50%;\n  transform: translateY(-50%);\n  color: #6c757d;\n  font-size: 14px;\n  pointer-events: none;\n  z-index: 1;\n}\n.tag-options-dropdown {\n  position: absolute;\n  top: 100%;\n  left: 0;\n  right: 0;\n  background: white;\n  border: 1px solid #ddd;\n  border-radius: 4px;\n  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);\n  z-index: 1000;\n  margin-top: 4px;\n}\n.tag-option {\n  padding: 8px 12px;\n  cursor: pointer;\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  transition: background 0.2s ease;\n}\n.tag-option:hover {\n  background: #f8f9fa;\n}\n.tag-option i {\n  color: #dc3545;\n  font-size: 12px;\n}\n\n/* Tag Suggestions Dropdown (Autocomplete) */\n.tag-suggestions-dropdown {\n  position: absolute;\n  top: 100%;\n  left: 0;\n  right: 0;\n  background: white;\n  border: 1px solid #ddd;\n  border-radius: 4px;\n  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);\n  z-index: 1000;\n  margin-top: 4px;\n  max-height: 250px;\n  overflow-y: auto;\n  overflow-x: hidden;\n}\n.tag-suggestion {\n  padding: 10px 12px;\n  cursor: pointer;\n  display: flex;\n  align-items: center;\n  gap: 10px;\n  transition: all 0.2s ease;\n  border-bottom: 1px solid #f0f0f0;\n}\n.tag-suggestion:last-child {\n  border-bottom: none;\n}\n.tag-suggestion:hover,\n.tag-suggestion.highlighted {\n  background: #f8f9fa;\n  border-left: 3px solid #dc3545;\n  padding-left: 9px;\n}\n.tag-suggestion i {\n  color: #dc3545;\n  font-size: 12px;\n  width: 16px;\n  text-align: center;\n}\n.tag-suggestion.create-new {\n  background: #fff3cd;\n  border-left: 3px solid #ffc107;\n}\n.tag-suggestion.create-new:hover,\n.tag-suggestion.create-new.highlighted {\n  background: #ffe69c;\n  border-left: 3px solid #ffc107;\n}\n.tag-suggestion.create-new i {\n  color: #856404;\n}\n.tag-suggestion.no-tags {\n  cursor: default;\n  color: #6c757d;\n  font-style: italic;\n  padding: 12px;\n  text-align: center;\n}\n.tag-suggestion.no-tags:hover {\n  background: transparent;\n  border-left: none;\n  padding-left: 12px;\n}\n.tags-list {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 8px;\n  margin-top: 10px;\n}\n.tag-item {\n  background: #dc3545;\n  color: white;\n  padding: 4px 10px;\n  border-radius: 15px;\n  font-size: 12px;\n  display: inline-flex;\n  align-items: center;\n  gap: 6px;\n}\n.remove-tag {\n  cursor: pointer;\n  font-size: 10px;\n  opacity: 0.8;\n}\n.remove-tag:hover {\n  opacity: 1;\n}\n\n/* Email Validation Styles */\n.email-status-icon {\n  position: absolute;\n  right: 12px;\n  top: 50%;\n  transform: translateY(-50%);\n  font-size: 16px;\n  pointer-events: none;\n  z-index: 2;\n  transition: color 0.3s ease;\n}\n.email-status-icon.checking {\n  color: #6c757d;\n  animation: pulse 1.5s ease-in-out infinite;\n}\n.email-status-icon.exists {\n  color: #dc3545;\n}\n.email-status-icon.available {\n  color: #28a745;\n}\n@keyframes pulse {\n0%, 100% {\n    opacity: 1;\n}\n50% {\n    opacity: 0.5;\n}\n}\n.member-form input[type=email].form-control.email-exists {\n  border-color: #dc3545;\n  background-color: #fff5f5;\n  padding-right: 40px;\n}\n.member-form input[type=email].form-control.email-exists:focus {\n  border-color: #dc3545;\n  box-shadow: 0 0 0 2px rgba(220, 53, 69, 0.25);\n  background-color: #fff;\n}\n.member-form input[type=email].form-control.email-checking {\n  border-color: #6c757d;\n  padding-right: 40px;\n}\n.member-form input[type=email].form-control.email-available {\n  border-color: #28a745;\n  background-color: #f0fff4;\n  padding-right: 40px;\n}\n.member-form input[type=email].form-control.email-available:focus {\n  border-color: #28a745;\n  box-shadow: 0 0 0 2px rgba(40, 167, 69, 0.25);\n  background-color: #fff;\n}\n\n/* Field Error Styling */\n.field-error {\n  color: #dc3545;\n  font-size: 12px;\n  margin-top: 4px;\n  display: flex;\n  align-items: center;\n  gap: 4px;\n  font-weight: 500;\n  animation: fadeIn 0.3s ease;\n}\n.field-error::before {\n  content: \"⚠\";\n  font-size: 14px;\n  margin-right: 2px;\n}\n@keyframes fadeIn {\nfrom {\n    opacity: 0;\n    transform: translateY(-5px);\n}\nto {\n    opacity: 1;\n    transform: translateY(0);\n}\n}\n/* Invalid Input Styling */\n.form-control.is-invalid {\n  border-color: #dc3545 !important;\n  background-color: #fff5f5 !important;\n  padding-right: 35px;\n}\n.form-control.is-invalid:focus {\n  border-color: #dc3545 !important;\n  box-shadow: 0 0 0 2px rgba(220, 53, 69, 0.25) !important;\n  background-color: #fff !important;\n}\n\n/* Birthday Inputs Wrapper */\n.birthday-inputs-wrapper {\n  flex: 1;\n  display: flex;\n  flex-direction: column;\n  gap: 4px;\n}\n.birthday-inputs {\n  display: flex;\n  gap: 10px;\n  flex: 1;\n}\n.birthday-select.is-invalid {\n  border-color: #dc3545 !important;\n  background-color: #fff5f5 !important;\n}\n\n/* Ensure error messages don't break layout */\n.form-row .input-wrapper {\n  display: flex;\n  flex-direction: column;\n  flex: 1;\n  min-width: 0;\n}\n\n/* Error message positioning */\n.input-wrapper .field-error {\n  order: 2;\n}\n\n/* Select error styling */\nselect.form-control.is-invalid {\n  background-image: url(\"data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23dc3545' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6,9 12,15 18,9'%3e%3c/polyline%3e%3c/svg%3e\"), url(\"data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23dc3545' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3ccircle cx='12' cy='12' r='10'/%3e%3cline x1='12' y1='8' x2='12' y2='12'/%3e%3cline x1='12' y1='16' x2='12.01' y2='16'/%3e%3c/svg%3e\");\n  background-position: right 12px center, right 35px center;\n  background-size: 16px, 14px;\n  padding-right: 55px;\n}\n\n/* Responsive error messages */\n@media (max-width: 767px) {\n.field-error {\n    font-size: 11px;\n    margin-top: 3px;\n}\n.birthday-inputs-wrapper {\n    width: 100%;\n}\n.birthday-inputs {\n    width: 100%;\n    gap: 6px;\n}\n}", ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-12.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12.use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-12.use[3]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/Members/AddNewMember.vue?vue&type=style&index=0&id=5bc7ede8&lang=scss":
/*!***************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-12.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12.use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-12.use[3]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/Members/AddNewMember.vue?vue&type=style&index=0&id=5bc7ede8&lang=scss ***!
  \***************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../../../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_clonedRuleSet_12_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_12_use_2_node_modules_sass_loader_dist_cjs_js_clonedRuleSet_12_use_3_node_modules_vue_loader_lib_index_js_vue_loader_options_AddNewMember_vue_vue_type_style_index_0_id_5bc7ede8_lang_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !!../../../../../../node_modules/css-loader/dist/cjs.js??clonedRuleSet-12.use[1]!../../../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12.use[2]!../../../../../../node_modules/sass-loader/dist/cjs.js??clonedRuleSet-12.use[3]!../../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./AddNewMember.vue?vue&type=style&index=0&id=5bc7ede8&lang=scss */ "./node_modules/css-loader/dist/cjs.js??clonedRuleSet-12.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12.use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-12.use[3]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/Members/AddNewMember.vue?vue&type=style&index=0&id=5bc7ede8&lang=scss");

            

var options = {};

options.insert = "head";
options.singleton = false;

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_clonedRuleSet_12_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_12_use_2_node_modules_sass_loader_dist_cjs_js_clonedRuleSet_12_use_3_node_modules_vue_loader_lib_index_js_vue_loader_options_AddNewMember_vue_vue_type_style_index_0_id_5bc7ede8_lang_scss__WEBPACK_IMPORTED_MODULE_1__["default"], options);



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_clonedRuleSet_12_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_12_use_2_node_modules_sass_loader_dist_cjs_js_clonedRuleSet_12_use_3_node_modules_vue_loader_lib_index_js_vue_loader_options_AddNewMember_vue_vue_type_style_index_0_id_5bc7ede8_lang_scss__WEBPACK_IMPORTED_MODULE_1__["default"].locals || {});

/***/ }),

/***/ "./resources/src/views/app/pages/Members/AddNewMember.vue":
/*!****************************************************************!*\
  !*** ./resources/src/views/app/pages/Members/AddNewMember.vue ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _AddNewMember_vue_vue_type_template_id_5bc7ede8__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./AddNewMember.vue?vue&type=template&id=5bc7ede8 */ "./resources/src/views/app/pages/Members/AddNewMember.vue?vue&type=template&id=5bc7ede8");
/* harmony import */ var _AddNewMember_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./AddNewMember.vue?vue&type=script&lang=js */ "./resources/src/views/app/pages/Members/AddNewMember.vue?vue&type=script&lang=js");
/* harmony import */ var _AddNewMember_vue_vue_type_style_index_0_id_5bc7ede8_lang_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./AddNewMember.vue?vue&type=style&index=0&id=5bc7ede8&lang=scss */ "./resources/src/views/app/pages/Members/AddNewMember.vue?vue&type=style&index=0&id=5bc7ede8&lang=scss");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");



;


/* normalize component */

var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _AddNewMember_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__["default"],
  _AddNewMember_vue_vue_type_template_id_5bc7ede8__WEBPACK_IMPORTED_MODULE_0__.render,
  _AddNewMember_vue_vue_type_template_id_5bc7ede8__WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/src/views/app/pages/Members/AddNewMember.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./resources/src/views/app/pages/Members/AddNewMember.vue?vue&type=script&lang=js":
/*!****************************************************************************************!*\
  !*** ./resources/src/views/app/pages/Members/AddNewMember.vue?vue&type=script&lang=js ***!
  \****************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_AddNewMember_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./AddNewMember.vue?vue&type=script&lang=js */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/Members/AddNewMember.vue?vue&type=script&lang=js");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_AddNewMember_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/src/views/app/pages/Members/AddNewMember.vue?vue&type=style&index=0&id=5bc7ede8&lang=scss":
/*!*************************************************************************************************************!*\
  !*** ./resources/src/views/app/pages/Members/AddNewMember.vue?vue&type=style&index=0&id=5bc7ede8&lang=scss ***!
  \*************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_dist_cjs_js_node_modules_css_loader_dist_cjs_js_clonedRuleSet_12_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_12_use_2_node_modules_sass_loader_dist_cjs_js_clonedRuleSet_12_use_3_node_modules_vue_loader_lib_index_js_vue_loader_options_AddNewMember_vue_vue_type_style_index_0_id_5bc7ede8_lang_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/style-loader/dist/cjs.js!../../../../../../node_modules/css-loader/dist/cjs.js??clonedRuleSet-12.use[1]!../../../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12.use[2]!../../../../../../node_modules/sass-loader/dist/cjs.js??clonedRuleSet-12.use[3]!../../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./AddNewMember.vue?vue&type=style&index=0&id=5bc7ede8&lang=scss */ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-12.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12.use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-12.use[3]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/Members/AddNewMember.vue?vue&type=style&index=0&id=5bc7ede8&lang=scss");


/***/ }),

/***/ "./resources/src/views/app/pages/Members/AddNewMember.vue?vue&type=template&id=5bc7ede8":
/*!**********************************************************************************************!*\
  !*** ./resources/src/views/app/pages/Members/AddNewMember.vue?vue&type=template&id=5bc7ede8 ***!
  \**********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_AddNewMember_vue_vue_type_template_id_5bc7ede8__WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   staticRenderFns: () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_AddNewMember_vue_vue_type_template_id_5bc7ede8__WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_AddNewMember_vue_vue_type_template_id_5bc7ede8__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./AddNewMember.vue?vue&type=template&id=5bc7ede8 */ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/Members/AddNewMember.vue?vue&type=template&id=5bc7ede8");


/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/Members/AddNewMember.vue?vue&type=template&id=5bc7ede8":
/*!*************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/Members/AddNewMember.vue?vue&type=template&id=5bc7ede8 ***!
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
                        _c(
                          "router-link",
                          { attrs: { to: "/app/members/ViewAllMembers" } },
                          [_vm._v("Members")]
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
                      [
                        _vm._v(
                          "\n                                Add member\n                            "
                        ),
                      ]
                    ),
                  ]),
                ]
              ),
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
            _c("div", { staticClass: "member-data-layout" }, [
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
                    [
                      _vm._v(
                        "\n                                " +
                          _vm._s(_vm.photoUrl ? "Change Photo" : "Add Photo") +
                          "\n                            "
                      ),
                    ]
                  ),
                  _vm._v(" "),
                  _c(
                    "button",
                    {
                      staticClass: "webcam-button",
                      attrs: { type: "button" },
                      on: { click: _vm.openWebcam },
                    },
                    [
                      _vm._v(
                        "\n                                Webcam snapshot\n                            "
                      ),
                    ]
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
                  _vm._v("Member Data"),
                ]),
                _vm._v(" "),
                _c("div", { staticClass: "form-fields" }, [
                  _c("div", { staticClass: "form-row" }, [
                    _vm._m(1),
                    _vm._v(" "),
                    _c("div", { staticClass: "input-wrapper" }, [
                      _c("input", {
                        directives: [
                          {
                            name: "model",
                            rawName: "v-model",
                            value: _vm.member.memberId,
                            expression: "member.memberId",
                          },
                        ],
                        staticClass: "form-control",
                        class: {
                          "has-value": _vm.member.memberId,
                        },
                        attrs: {
                          type: "text",
                          placeholder: "Member ID (Automatically generated)",
                          required: "",
                          disabled: "",
                        },
                        domProps: { value: _vm.member.memberId },
                        on: {
                          input: function ($event) {
                            if ($event.target.composing) {
                              return
                            }
                            _vm.$set(
                              _vm.member,
                              "memberId",
                              $event.target.value
                            )
                          },
                        },
                      }),
                    ]),
                  ]),
                  _vm._v(" "),
                  _c("div", { staticClass: "form-row" }, [
                    _c("label", { staticClass: "form-label" }, [
                      _vm._v(
                        "\n                                    Own member ID\n                                    "
                      ),
                      _c(
                        "span",
                        {
                          staticClass: "tooltip-wrapper",
                          on: {
                            click: function ($event) {
                              $event.stopPropagation()
                              _vm.showOwnMemberIdInfo = !_vm.showOwnMemberIdInfo
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
                                "is-visible": _vm.showOwnMemberIdInfo,
                              },
                            },
                            [
                              _vm._v(
                                "Use if you have a custom ID you\n                                            assign. Appears on exports and\n                                            labels."
                              ),
                            ]
                          ),
                        ]
                      ),
                    ]),
                    _vm._v(" "),
                    _c("div", { staticClass: "input-wrapper" }, [
                      _c("input", {
                        directives: [
                          {
                            name: "model",
                            rawName: "v-model",
                            value: _vm.member.own_member_id,
                            expression: "member.own_member_id",
                          },
                        ],
                        staticClass: "form-control",
                        class: { "has-value": _vm.member.own_member_id },
                        attrs: { type: "text", placeholder: "Own member ID" },
                        domProps: { value: _vm.member.own_member_id },
                        on: {
                          input: function ($event) {
                            if ($event.target.composing) {
                              return
                            }
                            _vm.$set(
                              _vm.member,
                              "own_member_id",
                              $event.target.value
                            )
                          },
                        },
                      }),
                    ]),
                  ]),
                  _vm._v(" "),
                  _c("div", { staticClass: "form-row" }, [
                    _c("label", { staticClass: "form-label" }, [
                      _vm._v(
                        "\n                                    Custom export field \n                                    "
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
                                "This field is for custom export data. Appears on exports and\n                                            labels."
                              ),
                            ]
                          ),
                        ]
                      ),
                    ]),
                    _vm._v(" "),
                    _c("div", { staticClass: "input-wrapper" }, [
                      _c("input", {
                        directives: [
                          {
                            name: "model",
                            rawName: "v-model",
                            value: _vm.member.custom_export_field,
                            expression: "member.custom_export_field",
                          },
                        ],
                        staticClass: "form-control",
                        class: { "has-value": _vm.member.custom_export_field },
                        attrs: {
                          type: "text",
                          placeholder: "Custom export field",
                        },
                        domProps: { value: _vm.member.custom_export_field },
                        on: {
                          input: function ($event) {
                            if ($event.target.composing) {
                              return
                            }
                            _vm.$set(
                              _vm.member,
                              "custom_export_field",
                              $event.target.value
                            )
                          },
                        },
                      }),
                    ]),
                  ]),
                  _vm._v(" "),
                  _c("div", { staticClass: "form-row" }, [
                    _vm._m(2),
                    _vm._v(" "),
                    _c("div", { staticClass: "input-wrapper" }, [
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
                              "\n                                        " +
                                _vm._s(_vm.fieldErrors.firstName) +
                                "\n                                    "
                            ),
                          ])
                        : _vm._e(),
                    ]),
                  ]),
                  _vm._v(" "),
                  _c("div", { staticClass: "form-row" }, [
                    _vm._m(3),
                    _vm._v(" "),
                    _c("div", { staticClass: "input-wrapper" }, [
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
                              "\n                                        " +
                                _vm._s(_vm.fieldErrors.lastName) +
                                "\n                                    "
                            ),
                          ])
                        : _vm._e(),
                    ]),
                  ]),
                  _vm._v(" "),
                  _c("div", { staticClass: "form-row" }, [
                    _vm._m(4),
                    _vm._v(" "),
                    _c("div", { staticClass: "input-wrapper" }, [
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
                          class: {
                            "is-invalid": _vm.fieldErrors.gender,
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
                            _vm._v(
                              "\n                                            Select Sex\n                                        "
                            ),
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
                              "\n                                        " +
                                _vm._s(_vm.fieldErrors.gender) +
                                "\n                                    "
                            ),
                          ])
                        : _vm._e(),
                    ]),
                  ]),
                  _vm._v(" "),
                  _c("div", { staticClass: "form-row" }, [
                    _vm._m(5),
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
                                _vm.shouldShowBirthdayErrors() &&
                                (_vm.fieldErrors.birthdayDay ||
                                  _vm.fieldErrors.birthdayMonth ||
                                  _vm.fieldErrors.birthdayYear),
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
                                  return _vm.onBirthdayFieldChange("day")
                                },
                              ],
                              blur: function ($event) {
                                return _vm.onBirthdayFieldBlur("day")
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
                                _vm.shouldShowBirthdayErrors() &&
                                (_vm.fieldErrors.birthdayDay ||
                                  _vm.fieldErrors.birthdayMonth ||
                                  _vm.fieldErrors.birthdayYear),
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
                                  return _vm.onBirthdayFieldChange("month")
                                },
                              ],
                              blur: function ($event) {
                                return _vm.onBirthdayFieldBlur("month")
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
                                _vm.shouldShowBirthdayErrors() &&
                                (_vm.fieldErrors.birthdayDay ||
                                  _vm.fieldErrors.birthdayMonth ||
                                  _vm.fieldErrors.birthdayYear),
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
                                  return _vm.onBirthdayFieldChange("year")
                                },
                              ],
                              blur: function ($event) {
                                return _vm.onBirthdayFieldBlur("year")
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
                      _vm.shouldShowBirthdayErrors() &&
                      (_vm.fieldErrors.birthdayDay ||
                        _vm.fieldErrors.birthdayMonth ||
                        _vm.fieldErrors.birthdayYear)
                        ? _c("div", { staticClass: "field-error" }, [
                            _vm._v(
                              "\n                                        " +
                                _vm._s(_vm.getBirthdayErrorMessage()) +
                                "\n                                    "
                            ),
                          ])
                        : _vm._e(),
                    ]),
                  ]),
                  _vm._v(" "),
                  _c("div", { staticClass: "form-row" }, [
                    _vm._m(6),
                    _vm._v(" "),
                    _c("div", { staticClass: "input-wrapper" }, [
                      _c("input", {
                        directives: [
                          {
                            name: "model",
                            rawName: "v-model",
                            value: _vm.member.email,
                            expression: "member.email",
                          },
                        ],
                        ref: "emailInput",
                        staticClass: "form-control",
                        class: {
                          "has-value": _vm.member.email,
                          "email-exists": _vm.emailExists,
                          "email-checking": _vm.emailChecking,
                          "email-available":
                            _vm.emailAvailable &&
                            _vm.member.email &&
                            !_vm.emailExists,
                          "is-invalid":
                            _vm.fieldErrors.email || _vm.emailExists,
                        },
                        attrs: {
                          type: "email",
                          id: "member-email-input",
                          placeholder: "Email Address",
                          required: "",
                        },
                        domProps: { value: _vm.member.email },
                        on: {
                          input: [
                            function ($event) {
                              if ($event.target.composing) {
                                return
                              }
                              _vm.$set(_vm.member, "email", $event.target.value)
                            },
                            _vm.onEmailInput,
                          ],
                          blur: function ($event) {
                            _vm.validateField("email")
                            _vm.checkEmailAvailability()
                          },
                        },
                      }),
                      _vm._v(" "),
                      _vm.emailChecking
                        ? _c(
                            "span",
                            { staticClass: "email-status-icon checking" },
                            [_c("i", { staticClass: "fas fa-spinner fa-spin" })]
                          )
                        : _vm.emailExists
                        ? _c(
                            "span",
                            { staticClass: "email-status-icon exists" },
                            [_c("i", { staticClass: "fas fa-times-circle" })]
                          )
                        : _vm.emailAvailable &&
                          _vm.member.email &&
                          !_vm.fieldErrors.email
                        ? _c(
                            "span",
                            { staticClass: "email-status-icon available" },
                            [_c("i", { staticClass: "fas fa-check-circle" })]
                          )
                        : _vm._e(),
                      _vm._v(" "),
                      _vm.fieldErrors.email
                        ? _c("div", { staticClass: "field-error" }, [
                            _vm._v(
                              "\n                                        " +
                                _vm._s(_vm.fieldErrors.email) +
                                "\n                                    "
                            ),
                          ])
                        : _vm._e(),
                    ]),
                  ]),
                  _vm._v(" "),
                  _c("div", { staticClass: "form-row" }, [
                    _c("label", { staticClass: "form-label" }, [
                      _vm._v("Mobile phone"),
                    ]),
                    _vm._v(" "),
                    _c("div", { staticClass: "input-wrapper" }, [
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
                              "\n                                        " +
                                _vm._s(_vm.fieldErrors.mobile_phone) +
                                "\n                                    "
                            ),
                          ])
                        : _vm._e(),
                    ]),
                  ]),
                  _vm._v(" "),
                  _c("div", { staticClass: "form-row" }, [
                    _c("label", { staticClass: "form-label" }, [
                      _vm._v("Landline number"),
                    ]),
                    _vm._v(" "),
                    _c("div", { staticClass: "input-wrapper" }, [
                      _c("input", {
                        directives: [
                          {
                            name: "model",
                            rawName: "v-model",
                            value: _vm.member.landline,
                            expression: "member.landline",
                          },
                        ],
                        staticClass: "form-control",
                        class: {
                          "has-value": _vm.member.landline,
                        },
                        attrs: { type: "tel", placeholder: "Landline Number" },
                        domProps: { value: _vm.member.landline },
                        on: {
                          input: function ($event) {
                            if ($event.target.composing) {
                              return
                            }
                            _vm.$set(
                              _vm.member,
                              "landline",
                              $event.target.value
                            )
                          },
                        },
                      }),
                    ]),
                  ]),
                  _vm._v(" "),
                  _c("div", { staticClass: "form-row" }, [
                    _c("label", { staticClass: "form-label" }, [
                      _vm._v("Member since"),
                    ]),
                    _vm._v(" "),
                    _c("div", { staticClass: "input-wrapper" }, [
                      _c("input", {
                        directives: [
                          {
                            name: "model",
                            rawName: "v-model",
                            value: _vm.member.client_since,
                            expression: "member.client_since",
                          },
                        ],
                        staticClass: "form-control",
                        class: { "has-value": _vm.member.client_since },
                        attrs: { type: "text", placeholder: "Member since" },
                        domProps: { value: _vm.member.client_since },
                        on: {
                          input: function ($event) {
                            if ($event.target.composing) {
                              return
                            }
                            _vm.$set(
                              _vm.member,
                              "client_since",
                              $event.target.value
                            )
                          },
                        },
                      }),
                    ]),
                  ]),
                  _vm._v(" "),
                  _c("div", { staticClass: "form-row" }, [
                    _vm._m(7),
                    _vm._v(" "),
                    _c(
                      "select",
                      {
                        directives: [
                          {
                            name: "model",
                            rawName: "v-model",
                            value: _vm.member.subscription_reason,
                            expression: "member.subscription_reason",
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
                              _vm.member,
                              "subscription_reason",
                              $event.target.multiple
                                ? $$selectedVal
                                : $$selectedVal[0]
                            )
                          },
                        },
                      },
                      [
                        _c("option", { attrs: { value: "Unknown" } }, [
                          _vm._v("Unknown"),
                        ]),
                        _vm._v(" "),
                        _c("option", { attrs: { value: "Fitness" } }, [
                          _vm._v("Fitness"),
                        ]),
                        _vm._v(" "),
                        _c("option", { attrs: { value: "Weight Loss" } }, [
                          _vm._v("Weight Loss"),
                        ]),
                        _vm._v(" "),
                        _c("option", { attrs: { value: "Muscle Building" } }, [
                          _vm._v("Muscle Building"),
                        ]),
                        _vm._v(" "),
                        _c(
                          "option",
                          { attrs: { value: "Strength Training" } },
                          [_vm._v("Strength Training")]
                        ),
                        _vm._v(" "),
                        _c("option", { attrs: { value: "General Health" } }, [
                          _vm._v("General Health"),
                        ]),
                        _vm._v(" "),
                        _c(
                          "option",
                          { attrs: { value: "Personal Training" } },
                          [_vm._v("Personal Training")]
                        ),
                        _vm._v(" "),
                        _c(
                          "option",
                          {
                            attrs: { value: "Referral/Friend Recommendation" },
                          },
                          [_vm._v("Referral/Friend Recommendation")]
                        ),
                        _vm._v(" "),
                        _c(
                          "option",
                          { attrs: { value: "Trial/Test Period" } },
                          [_vm._v("Trial/Test Period")]
                        ),
                        _vm._v(" "),
                        _c("option", { attrs: { value: "Other" } }, [
                          _vm._v("Other"),
                        ]),
                      ]
                    ),
                  ]),
                  _vm._v(" "),
                  _c("div", { staticClass: "form-row" }, [
                    _vm._m(8),
                    _vm._v(" "),
                    _c(
                      "select",
                      {
                        directives: [
                          {
                            name: "model",
                            rawName: "v-model",
                            value: _vm.member.source,
                            expression: "member.source",
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
                              _vm.member,
                              "source",
                              $event.target.multiple
                                ? $$selectedVal
                                : $$selectedVal[0]
                            )
                          },
                        },
                      },
                      [
                        _c("option", { attrs: { value: "Unknown" } }, [
                          _vm._v("Unknown"),
                        ]),
                        _vm._v(" "),
                        _c("option", { attrs: { value: "Referral" } }, [
                          _vm._v("Referral"),
                        ]),
                        _vm._v(" "),
                        _c("option", { attrs: { value: "Google Search" } }, [
                          _vm._v("Google Search"),
                        ]),
                        _vm._v(" "),
                        _c("option", { attrs: { value: "Facebook" } }, [
                          _vm._v("Facebook"),
                        ]),
                        _vm._v(" "),
                        _c("option", { attrs: { value: "Instagram" } }, [
                          _vm._v("Instagram"),
                        ]),
                        _vm._v(" "),
                        _c("option", { attrs: { value: "Walk-in" } }, [
                          _vm._v("Walk-in"),
                        ]),
                        _vm._v(" "),
                        _c("option", { attrs: { value: "Website" } }, [
                          _vm._v("Website"),
                        ]),
                        _vm._v(" "),
                        _c("option", { attrs: { value: "Online Review" } }, [
                          _vm._v("Online Review"),
                        ]),
                        _vm._v(" "),
                        _c("option", { attrs: { value: "Social Media" } }, [
                          _vm._v("Social Media"),
                        ]),
                        _vm._v(" "),
                        _c("option", { attrs: { value: "Advertisement" } }, [
                          _vm._v("Advertisement"),
                        ]),
                        _vm._v(" "),
                        _c("option", { attrs: { value: "Other" } }, [
                          _vm._v("Other"),
                        ]),
                      ]
                    ),
                  ]),
                  _vm._v(" "),
                  _c("div", { staticClass: "form-row" }, [
                    _vm._m(9),
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
                        class: {
                          "has-value": _vm.member.language,
                        },
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
                        _c("option", { attrs: { value: "Arabic" } }, [
                          _vm._v("Arabic"),
                        ]),
                        _vm._v(" "),
                        _c("option", { attrs: { value: "Bengali" } }, [
                          _vm._v("Bengali"),
                        ]),
                        _vm._v(" "),
                        _c("option", { attrs: { value: "Bulgarian" } }, [
                          _vm._v("Bulgarian"),
                        ]),
                        _vm._v(" "),
                        _c("option", { attrs: { value: "Chinese" } }, [
                          _vm._v("Chinese"),
                        ]),
                        _vm._v(" "),
                        _c("option", { attrs: { value: "Croatian" } }, [
                          _vm._v("Croatian"),
                        ]),
                        _vm._v(" "),
                        _c("option", { attrs: { value: "Czech" } }, [
                          _vm._v("Czech"),
                        ]),
                        _vm._v(" "),
                        _c("option", { attrs: { value: "Danish" } }, [
                          _vm._v("Danish"),
                        ]),
                        _vm._v(" "),
                        _c("option", { attrs: { value: "Dutch" } }, [
                          _vm._v("Dutch"),
                        ]),
                        _vm._v(" "),
                        _c("option", { attrs: { value: "English" } }, [
                          _vm._v("English"),
                        ]),
                        _vm._v(" "),
                        _c("option", { attrs: { value: "Finnish" } }, [
                          _vm._v("Finnish"),
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
                        _c("option", { attrs: { value: "Greek" } }, [
                          _vm._v("Greek"),
                        ]),
                        _vm._v(" "),
                        _c("option", { attrs: { value: "Gujarati" } }, [
                          _vm._v("Gujarati"),
                        ]),
                        _vm._v(" "),
                        _c("option", { attrs: { value: "Hebrew" } }, [
                          _vm._v("Hebrew"),
                        ]),
                        _vm._v(" "),
                        _c("option", { attrs: { value: "Hindi" } }, [
                          _vm._v("Hindi"),
                        ]),
                        _vm._v(" "),
                        _c("option", { attrs: { value: "Hungarian" } }, [
                          _vm._v("Hungarian"),
                        ]),
                        _vm._v(" "),
                        _c("option", { attrs: { value: "Indonesian" } }, [
                          _vm._v("Indonesian"),
                        ]),
                        _vm._v(" "),
                        _c("option", { attrs: { value: "Italian" } }, [
                          _vm._v("Italian"),
                        ]),
                        _vm._v(" "),
                        _c("option", { attrs: { value: "Japanese" } }, [
                          _vm._v("Japanese"),
                        ]),
                        _vm._v(" "),
                        _c("option", { attrs: { value: "Kannada" } }, [
                          _vm._v("Kannada"),
                        ]),
                        _vm._v(" "),
                        _c("option", { attrs: { value: "Korean" } }, [
                          _vm._v("Korean"),
                        ]),
                        _vm._v(" "),
                        _c("option", { attrs: { value: "Malay" } }, [
                          _vm._v("Malay"),
                        ]),
                        _vm._v(" "),
                        _c("option", { attrs: { value: "Malayalam" } }, [
                          _vm._v("Malayalam"),
                        ]),
                        _vm._v(" "),
                        _c("option", { attrs: { value: "Marathi" } }, [
                          _vm._v("Marathi"),
                        ]),
                        _vm._v(" "),
                        _c("option", { attrs: { value: "Norwegian" } }, [
                          _vm._v("Norwegian"),
                        ]),
                        _vm._v(" "),
                        _c("option", { attrs: { value: "Persian/Farsi" } }, [
                          _vm._v("Persian/Farsi"),
                        ]),
                        _vm._v(" "),
                        _c("option", { attrs: { value: "Polish" } }, [
                          _vm._v("Polish"),
                        ]),
                        _vm._v(" "),
                        _c("option", { attrs: { value: "Portuguese" } }, [
                          _vm._v("Portuguese"),
                        ]),
                        _vm._v(" "),
                        _c("option", { attrs: { value: "Punjabi" } }, [
                          _vm._v("Punjabi"),
                        ]),
                        _vm._v(" "),
                        _c("option", { attrs: { value: "Romanian" } }, [
                          _vm._v("Romanian"),
                        ]),
                        _vm._v(" "),
                        _c("option", { attrs: { value: "Russian" } }, [
                          _vm._v("Russian"),
                        ]),
                        _vm._v(" "),
                        _c("option", { attrs: { value: "Serbian" } }, [
                          _vm._v("Serbian"),
                        ]),
                        _vm._v(" "),
                        _c("option", { attrs: { value: "Spanish" } }, [
                          _vm._v("Spanish"),
                        ]),
                        _vm._v(" "),
                        _c("option", { attrs: { value: "Swahili" } }, [
                          _vm._v("Swahili"),
                        ]),
                        _vm._v(" "),
                        _c("option", { attrs: { value: "Swedish" } }, [
                          _vm._v("Swedish"),
                        ]),
                        _vm._v(" "),
                        _c("option", { attrs: { value: "Tagalog" } }, [
                          _vm._v("Tagalog"),
                        ]),
                        _vm._v(" "),
                        _c("option", { attrs: { value: "Tamil" } }, [
                          _vm._v("Tamil"),
                        ]),
                        _vm._v(" "),
                        _c("option", { attrs: { value: "Telugu" } }, [
                          _vm._v("Telugu"),
                        ]),
                        _vm._v(" "),
                        _c("option", { attrs: { value: "Thai" } }, [
                          _vm._v("Thai"),
                        ]),
                        _vm._v(" "),
                        _c("option", { attrs: { value: "Turkish" } }, [
                          _vm._v("Turkish"),
                        ]),
                        _vm._v(" "),
                        _c("option", { attrs: { value: "Ukrainian" } }, [
                          _vm._v("Ukrainian"),
                        ]),
                        _vm._v(" "),
                        _c("option", { attrs: { value: "Urdu" } }, [
                          _vm._v("Urdu"),
                        ]),
                        _vm._v(" "),
                        _c("option", { attrs: { value: "Vietnamese" } }, [
                          _vm._v("Vietnamese"),
                        ]),
                        _vm._v(" "),
                        _c("option", { attrs: { value: "Other" } }, [
                          _vm._v("Other"),
                        ]),
                      ]
                    ),
                  ]),
                  _vm._v(" "),
                  _c("div", { staticClass: "form-row" }, [
                    _vm._m(10),
                    _vm._v(" "),
                    _c(
                      "div",
                      {
                        staticClass: "tags-input-container",
                        staticStyle: { flex: "1" },
                      },
                      [
                        _c("div", { staticClass: "tags-search" }, [
                          _c("input", {
                            directives: [
                              {
                                name: "model",
                                rawName: "v-model",
                                value: _vm.tagSearch,
                                expression: "tagSearch",
                              },
                            ],
                            staticClass: "tags-input form-control",
                            attrs: {
                              type: "text",
                              placeholder: "Type to search or create a tag",
                            },
                            domProps: { value: _vm.tagSearch },
                            on: {
                              input: [
                                function ($event) {
                                  if ($event.target.composing) {
                                    return
                                  }
                                  _vm.tagSearch = $event.target.value
                                },
                                _vm.filterTagSuggestions,
                              ],
                              focus: _vm.onTagInputFocus,
                              blur: _vm.hideTagSuggestions,
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
                                return _vm.handleTagEnter.apply(null, arguments)
                              },
                              keydown: [
                                function ($event) {
                                  if (
                                    !$event.type.indexOf("key") &&
                                    _vm._k(
                                      $event.keyCode,
                                      "down",
                                      40,
                                      $event.key,
                                      ["Down", "ArrowDown"]
                                    )
                                  ) {
                                    return null
                                  }
                                  $event.preventDefault()
                                  return _vm.navigateSuggestions("down")
                                },
                                function ($event) {
                                  if (
                                    !$event.type.indexOf("key") &&
                                    _vm._k(
                                      $event.keyCode,
                                      "up",
                                      38,
                                      $event.key,
                                      ["Up", "ArrowUp"]
                                    )
                                  ) {
                                    return null
                                  }
                                  $event.preventDefault()
                                  return _vm.navigateSuggestions("up")
                                },
                              ],
                            },
                          }),
                          _vm._v(" "),
                          _vm.showTagSuggestions &&
                          (_vm.filteredTagSuggestions.length > 0 ||
                            _vm.tagSearch.trim())
                            ? _c(
                                "div",
                                { staticClass: "tag-suggestions-dropdown" },
                                [
                                  _vm._l(
                                    _vm.filteredTagSuggestions,
                                    function (tag, index) {
                                      return _c(
                                        "div",
                                        {
                                          key: tag,
                                          class: [
                                            "tag-suggestion",
                                            {
                                              highlighted:
                                                _vm.highlightedIndex === index,
                                            },
                                          ],
                                          on: {
                                            click: function ($event) {
                                              return _vm.addTag(tag)
                                            },
                                            mouseenter: function ($event) {
                                              _vm.highlightedIndex = index
                                            },
                                          },
                                        },
                                        [
                                          _c("i", {
                                            staticClass: "fas fa-tag",
                                          }),
                                          _vm._v(" "),
                                          _c("span", [_vm._v(_vm._s(tag))]),
                                        ]
                                      )
                                    }
                                  ),
                                  _vm._v(" "),
                                  _vm.tagSearch.trim() &&
                                  !_vm.filteredTagSuggestions.includes(
                                    _vm.tagSearch.trim()
                                  ) &&
                                  !_vm.member.tags.includes(
                                    _vm.tagSearch.trim()
                                  )
                                    ? _c(
                                        "div",
                                        {
                                          class: [
                                            "tag-suggestion",
                                            "create-new",
                                            {
                                              highlighted:
                                                _vm.highlightedIndex ===
                                                _vm.filteredTagSuggestions
                                                  .length,
                                            },
                                          ],
                                          on: {
                                            click: function ($event) {
                                              return _vm.addTag()
                                            },
                                            mouseenter: function ($event) {
                                              _vm.highlightedIndex =
                                                _vm.filteredTagSuggestions.length
                                            },
                                          },
                                        },
                                        [
                                          _c("i", {
                                            staticClass: "fas fa-plus",
                                          }),
                                          _vm._v(" "),
                                          _c("span", [
                                            _vm._v(
                                              'Create "' +
                                                _vm._s(_vm.tagSearch.trim()) +
                                                '"'
                                            ),
                                          ]),
                                        ]
                                      )
                                    : _vm._e(),
                                  _vm._v(" "),
                                  !_vm.tagSearch.trim() &&
                                  _vm.filteredTagSuggestions.length === 0 &&
                                  _vm.availableTags.length === 0
                                    ? _c(
                                        "div",
                                        {
                                          staticClass: "tag-suggestion no-tags",
                                        },
                                        [
                                          _c("span", [
                                            _vm._v(
                                              "No tags available. Type to create a new tag."
                                            ),
                                          ]),
                                        ]
                                      )
                                    : _vm._e(),
                                ],
                                2
                              )
                            : _vm._e(),
                        ]),
                        _vm._v(" "),
                        _vm.member.tags && _vm.member.tags.length > 0
                          ? _c(
                              "div",
                              {
                                staticClass: "tags-list",
                                staticStyle: {
                                  "margin-top": "10px",
                                  display: "flex",
                                  "flex-wrap": "wrap",
                                  gap: "8px",
                                },
                              },
                              _vm._l(_vm.member.tags, function (tag) {
                                return _c(
                                  "span",
                                  {
                                    key: tag,
                                    staticClass: "tag-item",
                                    staticStyle: {
                                      background: "#dc3545",
                                      color: "white",
                                      padding: "4px 10px",
                                      "border-radius": "15px",
                                      "font-size": "12px",
                                      display: "inline-flex",
                                      "align-items": "center",
                                      gap: "6px",
                                    },
                                  },
                                  [
                                    _vm._v(
                                      "\n                                            " +
                                        _vm._s(tag) +
                                        "\n                                            "
                                    ),
                                    _c("i", {
                                      staticClass: "fas fa-times remove-tag",
                                      staticStyle: {
                                        cursor: "pointer",
                                        "font-size": "10px",
                                      },
                                      on: {
                                        click: function ($event) {
                                          return _vm.removeTag(tag)
                                        },
                                      },
                                    }),
                                  ]
                                )
                              }),
                              0
                            )
                          : _vm._e(),
                      ]
                    ),
                  ]),
                  _vm._v(" "),
                  _c("div", { staticClass: "form-row" }, [
                    _c("label", { staticClass: "form-label" }, [
                      _vm._v("Business"),
                    ]),
                    _vm._v(" "),
                    _c("div", { staticClass: "business-selection" }, [
                      _c("div", { staticClass: "radio-group" }, [
                        _c("label", { staticClass: "radio-option" }, [
                          _c("input", {
                            directives: [
                              {
                                name: "model",
                                rawName: "v-model",
                                value: _vm.member.hasBusiness,
                                expression: "member.hasBusiness",
                              },
                            ],
                            attrs: { type: "radio", value: "No" },
                            domProps: {
                              checked: _vm._q(_vm.member.hasBusiness, "No"),
                            },
                            on: {
                              change: function ($event) {
                                return _vm.$set(_vm.member, "hasBusiness", "No")
                              },
                            },
                          }),
                          _vm._v(" "),
                          _c("span", { staticClass: "radio-label" }, [
                            _vm._v("No"),
                          ]),
                        ]),
                        _vm._v(" "),
                        _c("label", { staticClass: "radio-option" }, [
                          _c("input", {
                            directives: [
                              {
                                name: "model",
                                rawName: "v-model",
                                value: _vm.member.hasBusiness,
                                expression: "member.hasBusiness",
                              },
                            ],
                            attrs: { type: "radio", value: "Yes" },
                            domProps: {
                              checked: _vm._q(_vm.member.hasBusiness, "Yes"),
                            },
                            on: {
                              change: function ($event) {
                                return _vm.$set(
                                  _vm.member,
                                  "hasBusiness",
                                  "Yes"
                                )
                              },
                            },
                          }),
                          _vm._v(" "),
                          _c("span", { staticClass: "radio-label" }, [
                            _vm._v("Yes"),
                          ]),
                        ]),
                        _vm._v(" "),
                        _vm.member.hasBusiness === "Yes"
                          ? _c("div", { staticClass: "inline-dropdown" }, [
                              _c(
                                "select",
                                {
                                  directives: [
                                    {
                                      name: "model",
                                      rawName: "v-model",
                                      value: _vm.member.businessType,
                                      expression: "member.businessType",
                                    },
                                  ],
                                  staticClass: "form-control",
                                  on: {
                                    change: function ($event) {
                                      var $$selectedVal = Array.prototype.filter
                                        .call(
                                          $event.target.options,
                                          function (o) {
                                            return o.selected
                                          }
                                        )
                                        .map(function (o) {
                                          var val =
                                            "_value" in o ? o._value : o.value
                                          return val
                                        })
                                      _vm.$set(
                                        _vm.member,
                                        "businessType",
                                        $event.target.multiple
                                          ? $$selectedVal
                                          : $$selectedVal[0]
                                      )
                                    },
                                  },
                                },
                                [
                                  _c("option", { attrs: { value: "" } }, [
                                    _vm._v("Select Business"),
                                  ]),
                                  _vm._v(" "),
                                  _c(
                                    "option",
                                    { attrs: { value: "Accounting Firm" } },
                                    [_vm._v("Accounting Firm")]
                                  ),
                                  _vm._v(" "),
                                  _c(
                                    "option",
                                    { attrs: { value: "Advertising Agency" } },
                                    [_vm._v("Advertising Agency")]
                                  ),
                                  _vm._v(" "),
                                  _c(
                                    "option",
                                    { attrs: { value: "Agriculture" } },
                                    [_vm._v("Agriculture")]
                                  ),
                                  _vm._v(" "),
                                  _c(
                                    "option",
                                    { attrs: { value: "Art Gallery" } },
                                    [_vm._v("Art Gallery")]
                                  ),
                                  _vm._v(" "),
                                  _c(
                                    "option",
                                    { attrs: { value: "Auto Repair" } },
                                    [_vm._v("Auto Repair")]
                                  ),
                                  _vm._v(" "),
                                  _c(
                                    "option",
                                    { attrs: { value: "Automotive" } },
                                    [_vm._v("Automotive")]
                                  ),
                                  _vm._v(" "),
                                  _c("option", { attrs: { value: "Bakery" } }, [
                                    _vm._v("Bakery"),
                                  ]),
                                  _vm._v(" "),
                                  _c("option", { attrs: { value: "Bank" } }, [
                                    _vm._v("Bank"),
                                  ]),
                                  _vm._v(" "),
                                  _c(
                                    "option",
                                    { attrs: { value: "Bar/Nightclub" } },
                                    [_vm._v("Bar/Nightclub")]
                                  ),
                                  _vm._v(" "),
                                  _c(
                                    "option",
                                    { attrs: { value: "Barbershop" } },
                                    [_vm._v("Barbershop")]
                                  ),
                                  _vm._v(" "),
                                  _c(
                                    "option",
                                    { attrs: { value: "Beauty Salon" } },
                                    [_vm._v("Beauty Salon")]
                                  ),
                                  _vm._v(" "),
                                  _c(
                                    "option",
                                    { attrs: { value: "Bookstore" } },
                                    [_vm._v("Bookstore")]
                                  ),
                                  _vm._v(" "),
                                  _c("option", { attrs: { value: "Cafe" } }, [
                                    _vm._v("Cafe"),
                                  ]),
                                  _vm._v(" "),
                                  _c(
                                    "option",
                                    { attrs: { value: "Car Dealership" } },
                                    [_vm._v("Car Dealership")]
                                  ),
                                  _vm._v(" "),
                                  _c(
                                    "option",
                                    { attrs: { value: "Catering" } },
                                    [_vm._v("Catering")]
                                  ),
                                  _vm._v(" "),
                                  _c(
                                    "option",
                                    { attrs: { value: "Charity" } },
                                    [_vm._v("Charity")]
                                  ),
                                  _vm._v(" "),
                                  _c("option", { attrs: { value: "Cinema" } }, [
                                    _vm._v("Cinema"),
                                  ]),
                                  _vm._v(" "),
                                  _c("option", { attrs: { value: "Clinic" } }, [
                                    _vm._v("Clinic"),
                                  ]),
                                  _vm._v(" "),
                                  _c(
                                    "option",
                                    { attrs: { value: "Clothing Store" } },
                                    [_vm._v("Clothing Store")]
                                  ),
                                  _vm._v(" "),
                                  _c(
                                    "option",
                                    { attrs: { value: "Co-working Space" } },
                                    [_vm._v("Co-working Space")]
                                  ),
                                  _vm._v(" "),
                                  _c(
                                    "option",
                                    { attrs: { value: "Conference Center" } },
                                    [_vm._v("Conference Center")]
                                  ),
                                  _vm._v(" "),
                                  _c(
                                    "option",
                                    { attrs: { value: "Construction" } },
                                    [_vm._v("Construction")]
                                  ),
                                  _vm._v(" "),
                                  _c(
                                    "option",
                                    { attrs: { value: "Consulting" } },
                                    [_vm._v("Consulting")]
                                  ),
                                  _vm._v(" "),
                                  _c(
                                    "option",
                                    { attrs: { value: "Dance Studio" } },
                                    [_vm._v("Dance Studio")]
                                  ),
                                  _vm._v(" "),
                                  _c(
                                    "option",
                                    { attrs: { value: "Dental Practice" } },
                                    [_vm._v("Dental Practice")]
                                  ),
                                  _vm._v(" "),
                                  _c(
                                    "option",
                                    { attrs: { value: "Distribution Center" } },
                                    [_vm._v("Distribution Center")]
                                  ),
                                  _vm._v(" "),
                                  _c(
                                    "option",
                                    { attrs: { value: "Education" } },
                                    [_vm._v("Education")]
                                  ),
                                  _vm._v(" "),
                                  _c(
                                    "option",
                                    { attrs: { value: "Electronics Store" } },
                                    [_vm._v("Electronics Store")]
                                  ),
                                  _vm._v(" "),
                                  _c(
                                    "option",
                                    { attrs: { value: "Entertainment" } },
                                    [_vm._v("Entertainment")]
                                  ),
                                  _vm._v(" "),
                                  _c(
                                    "option",
                                    { attrs: { value: "Event Venue" } },
                                    [_vm._v("Event Venue")]
                                  ),
                                  _vm._v(" "),
                                  _c(
                                    "option",
                                    { attrs: { value: "Farming" } },
                                    [_vm._v("Farming")]
                                  ),
                                  _vm._v(" "),
                                  _c(
                                    "option",
                                    { attrs: { value: "Financial Services" } },
                                    [_vm._v("Financial Services")]
                                  ),
                                  _vm._v(" "),
                                  _c(
                                    "option",
                                    { attrs: { value: "Food Service" } },
                                    [_vm._v("Food Service")]
                                  ),
                                  _vm._v(" "),
                                  _c(
                                    "option",
                                    { attrs: { value: "Food Truck" } },
                                    [_vm._v("Food Truck")]
                                  ),
                                  _vm._v(" "),
                                  _c(
                                    "option",
                                    { attrs: { value: "Furniture Store" } },
                                    [_vm._v("Furniture Store")]
                                  ),
                                  _vm._v(" "),
                                  _c(
                                    "option",
                                    { attrs: { value: "Gas Station" } },
                                    [_vm._v("Gas Station")]
                                  ),
                                  _vm._v(" "),
                                  _c(
                                    "option",
                                    { attrs: { value: "Government" } },
                                    [_vm._v("Government")]
                                  ),
                                  _vm._v(" "),
                                  _c(
                                    "option",
                                    { attrs: { value: "Gym/Fitness" } },
                                    [_vm._v("Gym/Fitness")]
                                  ),
                                  _vm._v(" "),
                                  _c(
                                    "option",
                                    { attrs: { value: "Hardware Store" } },
                                    [_vm._v("Hardware Store")]
                                  ),
                                  _vm._v(" "),
                                  _c(
                                    "option",
                                    { attrs: { value: "Healthcare" } },
                                    [_vm._v("Healthcare")]
                                  ),
                                  _vm._v(" "),
                                  _c(
                                    "option",
                                    { attrs: { value: "Home Improvement" } },
                                    [_vm._v("Home Improvement")]
                                  ),
                                  _vm._v(" "),
                                  _c(
                                    "option",
                                    { attrs: { value: "Hospital" } },
                                    [_vm._v("Hospital")]
                                  ),
                                  _vm._v(" "),
                                  _c("option", { attrs: { value: "Hotel" } }, [
                                    _vm._v("Hotel"),
                                  ]),
                                  _vm._v(" "),
                                  _c(
                                    "option",
                                    { attrs: { value: "Insurance" } },
                                    [_vm._v("Insurance")]
                                  ),
                                  _vm._v(" "),
                                  _c(
                                    "option",
                                    { attrs: { value: "IT Services" } },
                                    [_vm._v("IT Services")]
                                  ),
                                  _vm._v(" "),
                                  _c(
                                    "option",
                                    { attrs: { value: "Jewelry Store" } },
                                    [_vm._v("Jewelry Store")]
                                  ),
                                  _vm._v(" "),
                                  _c(
                                    "option",
                                    { attrs: { value: "Law Firm" } },
                                    [_vm._v("Law Firm")]
                                  ),
                                  _vm._v(" "),
                                  _c(
                                    "option",
                                    { attrs: { value: "Legal Services" } },
                                    [_vm._v("Legal Services")]
                                  ),
                                  _vm._v(" "),
                                  _c(
                                    "option",
                                    { attrs: { value: "Library" } },
                                    [_vm._v("Library")]
                                  ),
                                  _vm._v(" "),
                                  _c(
                                    "option",
                                    { attrs: { value: "Logistics" } },
                                    [_vm._v("Logistics")]
                                  ),
                                  _vm._v(" "),
                                  _c(
                                    "option",
                                    {
                                      attrs: { value: "Maintenance Services" },
                                    },
                                    [_vm._v("Maintenance Services")]
                                  ),
                                  _vm._v(" "),
                                  _c(
                                    "option",
                                    { attrs: { value: "Manufacturing" } },
                                    [_vm._v("Manufacturing")]
                                  ),
                                  _vm._v(" "),
                                  _c(
                                    "option",
                                    { attrs: { value: "Marketing Agency" } },
                                    [_vm._v("Marketing Agency")]
                                  ),
                                  _vm._v(" "),
                                  _c(
                                    "option",
                                    { attrs: { value: "Martial Arts Studio" } },
                                    [_vm._v("Martial Arts Studio")]
                                  ),
                                  _vm._v(" "),
                                  _c(
                                    "option",
                                    { attrs: { value: "Media Company" } },
                                    [_vm._v("Media Company")]
                                  ),
                                  _vm._v(" "),
                                  _c("option", { attrs: { value: "Museum" } }, [
                                    _vm._v("Museum"),
                                  ]),
                                  _vm._v(" "),
                                  _c(
                                    "option",
                                    { attrs: { value: "Music Store" } },
                                    [_vm._v("Music Store")]
                                  ),
                                  _vm._v(" "),
                                  _c(
                                    "option",
                                    {
                                      attrs: {
                                        value: "Non-Profit Organization",
                                      },
                                    },
                                    [_vm._v("Non-Profit Organization")]
                                  ),
                                  _vm._v(" "),
                                  _c(
                                    "option",
                                    {
                                      attrs: { value: "Nursery/Garden Center" },
                                    },
                                    [_vm._v("Nursery/Garden Center")]
                                  ),
                                  _vm._v(" "),
                                  _c("option", { attrs: { value: "Office" } }, [
                                    _vm._v("Office"),
                                  ]),
                                  _vm._v(" "),
                                  _c(
                                    "option",
                                    { attrs: { value: "Pet Store" } },
                                    [_vm._v("Pet Store")]
                                  ),
                                  _vm._v(" "),
                                  _c(
                                    "option",
                                    { attrs: { value: "Pharmacy" } },
                                    [_vm._v("Pharmacy")]
                                  ),
                                  _vm._v(" "),
                                  _c(
                                    "option",
                                    { attrs: { value: "Photography Studio" } },
                                    [_vm._v("Photography Studio")]
                                  ),
                                  _vm._v(" "),
                                  _c(
                                    "option",
                                    { attrs: { value: "Public Service" } },
                                    [_vm._v("Public Service")]
                                  ),
                                  _vm._v(" "),
                                  _c(
                                    "option",
                                    { attrs: { value: "Publishing" } },
                                    [_vm._v("Publishing")]
                                  ),
                                  _vm._v(" "),
                                  _c(
                                    "option",
                                    { attrs: { value: "Real Estate" } },
                                    [_vm._v("Real Estate")]
                                  ),
                                  _vm._v(" "),
                                  _c(
                                    "option",
                                    { attrs: { value: "Recreation Center" } },
                                    [_vm._v("Recreation Center")]
                                  ),
                                  _vm._v(" "),
                                  _c(
                                    "option",
                                    {
                                      attrs: {
                                        value: "Religious Organization",
                                      },
                                    },
                                    [_vm._v("Religious Organization")]
                                  ),
                                  _vm._v(" "),
                                  _c(
                                    "option",
                                    { attrs: { value: "Repair Services" } },
                                    [_vm._v("Repair Services")]
                                  ),
                                  _vm._v(" "),
                                  _c("option", { attrs: { value: "Resort" } }, [
                                    _vm._v("Resort"),
                                  ]),
                                  _vm._v(" "),
                                  _c(
                                    "option",
                                    { attrs: { value: "Restaurant" } },
                                    [_vm._v("Restaurant")]
                                  ),
                                  _vm._v(" "),
                                  _c(
                                    "option",
                                    { attrs: { value: "Retail Store" } },
                                    [_vm._v("Retail Store")]
                                  ),
                                  _vm._v(" "),
                                  _c("option", { attrs: { value: "Salon" } }, [
                                    _vm._v("Salon"),
                                  ]),
                                  _vm._v(" "),
                                  _c("option", { attrs: { value: "School" } }, [
                                    _vm._v("School"),
                                  ]),
                                  _vm._v(" "),
                                  _c(
                                    "option",
                                    { attrs: { value: "Security Services" } },
                                    [_vm._v("Security Services")]
                                  ),
                                  _vm._v(" "),
                                  _c(
                                    "option",
                                    { attrs: { value: "Shipping" } },
                                    [_vm._v("Shipping")]
                                  ),
                                  _vm._v(" "),
                                  _c(
                                    "option",
                                    { attrs: { value: "Software Company" } },
                                    [_vm._v("Software Company")]
                                  ),
                                  _vm._v(" "),
                                  _c("option", { attrs: { value: "Spa" } }, [
                                    _vm._v("Spa"),
                                  ]),
                                  _vm._v(" "),
                                  _c(
                                    "option",
                                    { attrs: { value: "Sports Club" } },
                                    [_vm._v("Sports Club")]
                                  ),
                                  _vm._v(" "),
                                  _c(
                                    "option",
                                    { attrs: { value: "Supermarket/Grocery" } },
                                    [_vm._v("Supermarket/Grocery")]
                                  ),
                                  _vm._v(" "),
                                  _c(
                                    "option",
                                    { attrs: { value: "Technology" } },
                                    [_vm._v("Technology")]
                                  ),
                                  _vm._v(" "),
                                  _c(
                                    "option",
                                    { attrs: { value: "Theater" } },
                                    [_vm._v("Theater")]
                                  ),
                                  _vm._v(" "),
                                  _c(
                                    "option",
                                    { attrs: { value: "Training Center" } },
                                    [_vm._v("Training Center")]
                                  ),
                                  _vm._v(" "),
                                  _c(
                                    "option",
                                    { attrs: { value: "Transportation" } },
                                    [_vm._v("Transportation")]
                                  ),
                                  _vm._v(" "),
                                  _c(
                                    "option",
                                    { attrs: { value: "University" } },
                                    [_vm._v("University")]
                                  ),
                                  _vm._v(" "),
                                  _c(
                                    "option",
                                    { attrs: { value: "Veterinary Clinic" } },
                                    [_vm._v("Veterinary Clinic")]
                                  ),
                                  _vm._v(" "),
                                  _c(
                                    "option",
                                    { attrs: { value: "Warehouse" } },
                                    [_vm._v("Warehouse")]
                                  ),
                                  _vm._v(" "),
                                  _c(
                                    "option",
                                    { attrs: { value: "Wedding Venue" } },
                                    [_vm._v("Wedding Venue")]
                                  ),
                                  _vm._v(" "),
                                  _c(
                                    "option",
                                    { attrs: { value: "Yoga Studio" } },
                                    [_vm._v("Yoga Studio")]
                                  ),
                                  _vm._v(" "),
                                  _c("option", { attrs: { value: "Other" } }, [
                                    _vm._v("Other"),
                                  ]),
                                ]
                              ),
                            ])
                          : _vm._e(),
                      ]),
                    ]),
                  ]),
                ]),
                _vm._v(" "),
                _c("h5", { staticClass: "section-title" }, [
                  _vm._v("Address data"),
                ]),
                _vm._v(" "),
                _c("div", { staticClass: "form-fields" }, [
                  _c("div", { staticClass: "form-row" }, [
                    _c("label", { staticClass: "form-label" }, [
                      _vm._v("Street address"),
                    ]),
                    _vm._v(" "),
                    _c("div", { staticClass: "input-wrapper" }, [
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
                        class: { "has-value": _vm.member.address },
                        attrs: { type: "text", placeholder: "Street address" },
                        domProps: { value: _vm.member.address },
                        on: {
                          input: function ($event) {
                            if ($event.target.composing) {
                              return
                            }
                            _vm.$set(_vm.member, "address", $event.target.value)
                          },
                        },
                      }),
                    ]),
                  ]),
                  _vm._v(" "),
                  _c("div", { staticClass: "form-row" }, [
                    _c("label", { staticClass: "form-label" }, [
                      _vm._v("Extra address row"),
                    ]),
                    _vm._v(" "),
                    _c("div", { staticClass: "input-wrapper" }, [
                      _c("input", {
                        directives: [
                          {
                            name: "model",
                            rawName: "v-model",
                            value: _vm.member.extra_address,
                            expression: "member.extra_address",
                          },
                        ],
                        staticClass: "form-control",
                        class: { "has-value": _vm.member.extra_address },
                        attrs: {
                          type: "text",
                          placeholder: "Extra address row",
                        },
                        domProps: { value: _vm.member.extra_address },
                        on: {
                          input: function ($event) {
                            if ($event.target.composing) {
                              return
                            }
                            _vm.$set(
                              _vm.member,
                              "extra_address",
                              $event.target.value
                            )
                          },
                        },
                      }),
                    ]),
                  ]),
                  _vm._v(" "),
                  _c("div", { staticClass: "form-row" }, [
                    _c("label", { staticClass: "form-label" }, [
                      _vm._v("ZIP code"),
                    ]),
                    _vm._v(" "),
                    _c("div", { staticClass: "input-wrapper" }, [
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
                        class: { "has-value": _vm.member.zip },
                        attrs: { type: "text", placeholder: "ZIP code" },
                        domProps: { value: _vm.member.zip },
                        on: {
                          input: function ($event) {
                            if ($event.target.composing) {
                              return
                            }
                            _vm.$set(_vm.member, "zip", $event.target.value)
                          },
                        },
                      }),
                    ]),
                  ]),
                  _vm._v(" "),
                  _c("div", { staticClass: "form-row" }, [
                    _c("label", { staticClass: "form-label" }, [
                      _vm._v("City"),
                    ]),
                    _vm._v(" "),
                    _c("div", { staticClass: "input-wrapper" }, [
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
                        class: { "has-value": _vm.member.city },
                        attrs: { type: "text", placeholder: "City" },
                        domProps: { value: _vm.member.city },
                        on: {
                          input: function ($event) {
                            if ($event.target.composing) {
                              return
                            }
                            _vm.$set(_vm.member, "city", $event.target.value)
                          },
                        },
                      }),
                    ]),
                  ]),
                  _vm._v(" "),
                  _c("div", { staticClass: "form-row" }, [
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
                        _c("option", { attrs: { value: "Afghanistan" } }, [
                          _vm._v("Afghanistan"),
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
                        _c("option", { attrs: { value: "Bahrain" } }, [
                          _vm._v("Bahrain"),
                        ]),
                        _vm._v(" "),
                        _c("option", { attrs: { value: "Bangladesh" } }, [
                          _vm._v("Bangladesh"),
                        ]),
                        _vm._v(" "),
                        _c("option", { attrs: { value: "Belarus" } }, [
                          _vm._v("Belarus"),
                        ]),
                        _vm._v(" "),
                        _c("option", { attrs: { value: "Belgium" } }, [
                          _vm._v("Belgium"),
                        ]),
                        _vm._v(" "),
                        _c("option", { attrs: { value: "Bhutan" } }, [
                          _vm._v("Bhutan"),
                        ]),
                        _vm._v(" "),
                        _c("option", { attrs: { value: "Bolivia" } }, [
                          _vm._v("Bolivia"),
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
                        _c("option", { attrs: { value: "Cambodia" } }, [
                          _vm._v("Cambodia"),
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
                        _c("option", { attrs: { value: "Costa Rica" } }, [
                          _vm._v("Costa Rica"),
                        ]),
                        _vm._v(" "),
                        _c("option", { attrs: { value: "Croatia" } }, [
                          _vm._v("Croatia"),
                        ]),
                        _vm._v(" "),
                        _c("option", { attrs: { value: "Cuba" } }, [
                          _vm._v("Cuba"),
                        ]),
                        _vm._v(" "),
                        _c("option", { attrs: { value: "Cyprus" } }, [
                          _vm._v("Cyprus"),
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
                        _c(
                          "option",
                          { attrs: { value: "Dominican Republic" } },
                          [_vm._v("Dominican Republic")]
                        ),
                        _vm._v(" "),
                        _c("option", { attrs: { value: "Ecuador" } }, [
                          _vm._v("Ecuador"),
                        ]),
                        _vm._v(" "),
                        _c("option", { attrs: { value: "Egypt" } }, [
                          _vm._v("Egypt"),
                        ]),
                        _vm._v(" "),
                        _c("option", { attrs: { value: "El Salvador" } }, [
                          _vm._v("El Salvador"),
                        ]),
                        _vm._v(" "),
                        _c("option", { attrs: { value: "Estonia" } }, [
                          _vm._v("Estonia"),
                        ]),
                        _vm._v(" "),
                        _c("option", { attrs: { value: "Ethiopia" } }, [
                          _vm._v("Ethiopia"),
                        ]),
                        _vm._v(" "),
                        _c("option", { attrs: { value: "Fiji" } }, [
                          _vm._v("Fiji"),
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
                        _c("option", { attrs: { value: "Ghana" } }, [
                          _vm._v("Ghana"),
                        ]),
                        _vm._v(" "),
                        _c("option", { attrs: { value: "Greece" } }, [
                          _vm._v("Greece"),
                        ]),
                        _vm._v(" "),
                        _c("option", { attrs: { value: "Guatemala" } }, [
                          _vm._v("Guatemala"),
                        ]),
                        _vm._v(" "),
                        _c("option", { attrs: { value: "Honduras" } }, [
                          _vm._v("Honduras"),
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
                        _c("option", { attrs: { value: "Iraq" } }, [
                          _vm._v("Iraq"),
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
                        _c("option", { attrs: { value: "Jamaica" } }, [
                          _vm._v("Jamaica"),
                        ]),
                        _vm._v(" "),
                        _c("option", { attrs: { value: "Japan" } }, [
                          _vm._v("Japan"),
                        ]),
                        _vm._v(" "),
                        _c("option", { attrs: { value: "Jordan" } }, [
                          _vm._v("Jordan"),
                        ]),
                        _vm._v(" "),
                        _c("option", { attrs: { value: "Kazakhstan" } }, [
                          _vm._v("Kazakhstan"),
                        ]),
                        _vm._v(" "),
                        _c("option", { attrs: { value: "Kenya" } }, [
                          _vm._v("Kenya"),
                        ]),
                        _vm._v(" "),
                        _c("option", { attrs: { value: "Kuwait" } }, [
                          _vm._v("Kuwait"),
                        ]),
                        _vm._v(" "),
                        _c("option", { attrs: { value: "Laos" } }, [
                          _vm._v("Laos"),
                        ]),
                        _vm._v(" "),
                        _c("option", { attrs: { value: "Latvia" } }, [
                          _vm._v("Latvia"),
                        ]),
                        _vm._v(" "),
                        _c("option", { attrs: { value: "Lebanon" } }, [
                          _vm._v("Lebanon"),
                        ]),
                        _vm._v(" "),
                        _c("option", { attrs: { value: "Lithuania" } }, [
                          _vm._v("Lithuania"),
                        ]),
                        _vm._v(" "),
                        _c("option", { attrs: { value: "Luxembourg" } }, [
                          _vm._v("Luxembourg"),
                        ]),
                        _vm._v(" "),
                        _c("option", { attrs: { value: "Macau" } }, [
                          _vm._v("Macau"),
                        ]),
                        _vm._v(" "),
                        _c("option", { attrs: { value: "Malaysia" } }, [
                          _vm._v("Malaysia"),
                        ]),
                        _vm._v(" "),
                        _c("option", { attrs: { value: "Malta" } }, [
                          _vm._v("Malta"),
                        ]),
                        _vm._v(" "),
                        _c("option", { attrs: { value: "Mexico" } }, [
                          _vm._v("Mexico"),
                        ]),
                        _vm._v(" "),
                        _c("option", { attrs: { value: "Mongolia" } }, [
                          _vm._v("Mongolia"),
                        ]),
                        _vm._v(" "),
                        _c("option", { attrs: { value: "Morocco" } }, [
                          _vm._v("Morocco"),
                        ]),
                        _vm._v(" "),
                        _c("option", { attrs: { value: "Myanmar" } }, [
                          _vm._v("Myanmar"),
                        ]),
                        _vm._v(" "),
                        _c("option", { attrs: { value: "Nepal" } }, [
                          _vm._v("Nepal"),
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
                        _c("option", { attrs: { value: "Nicaragua" } }, [
                          _vm._v("Nicaragua"),
                        ]),
                        _vm._v(" "),
                        _c("option", { attrs: { value: "Nigeria" } }, [
                          _vm._v("Nigeria"),
                        ]),
                        _vm._v(" "),
                        _c("option", { attrs: { value: "North Korea" } }, [
                          _vm._v("North Korea"),
                        ]),
                        _vm._v(" "),
                        _c("option", { attrs: { value: "Norway" } }, [
                          _vm._v("Norway"),
                        ]),
                        _vm._v(" "),
                        _c("option", { attrs: { value: "Oman" } }, [
                          _vm._v("Oman"),
                        ]),
                        _vm._v(" "),
                        _c("option", { attrs: { value: "Pakistan" } }, [
                          _vm._v("Pakistan"),
                        ]),
                        _vm._v(" "),
                        _c("option", { attrs: { value: "Panama" } }, [
                          _vm._v("Panama"),
                        ]),
                        _vm._v(" "),
                        _c("option", { attrs: { value: "Papua New Guinea" } }, [
                          _vm._v("Papua New Guinea"),
                        ]),
                        _vm._v(" "),
                        _c("option", { attrs: { value: "Paraguay" } }, [
                          _vm._v("Paraguay"),
                        ]),
                        _vm._v(" "),
                        _c("option", { attrs: { value: "Peru" } }, [
                          _vm._v("Peru"),
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
                        _c("option", { attrs: { value: "Qatar" } }, [
                          _vm._v("Qatar"),
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
                        _c("option", { attrs: { value: "Serbia" } }, [
                          _vm._v("Serbia"),
                        ]),
                        _vm._v(" "),
                        _c("option", { attrs: { value: "Singapore" } }, [
                          _vm._v("Singapore"),
                        ]),
                        _vm._v(" "),
                        _c("option", { attrs: { value: "Slovakia" } }, [
                          _vm._v("Slovakia"),
                        ]),
                        _vm._v(" "),
                        _c("option", { attrs: { value: "Slovenia" } }, [
                          _vm._v("Slovenia"),
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
                        _c("option", { attrs: { value: "Sri Lanka" } }, [
                          _vm._v("Sri Lanka"),
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
                        _c("option", { attrs: { value: "Tanzania" } }, [
                          _vm._v("Tanzania"),
                        ]),
                        _vm._v(" "),
                        _c("option", { attrs: { value: "Thailand" } }, [
                          _vm._v("Thailand"),
                        ]),
                        _vm._v(" "),
                        _c(
                          "option",
                          { attrs: { value: "Trinidad and Tobago" } },
                          [_vm._v("Trinidad and Tobago")]
                        ),
                        _vm._v(" "),
                        _c("option", { attrs: { value: "Tunisia" } }, [
                          _vm._v("Tunisia"),
                        ]),
                        _vm._v(" "),
                        _c("option", { attrs: { value: "Turkey" } }, [
                          _vm._v("Turkey"),
                        ]),
                        _vm._v(" "),
                        _c("option", { attrs: { value: "Uganda" } }, [
                          _vm._v("Uganda"),
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
                        _c("option", { attrs: { value: "Uruguay" } }, [
                          _vm._v("Uruguay"),
                        ]),
                        _vm._v(" "),
                        _c("option", { attrs: { value: "Uzbekistan" } }, [
                          _vm._v("Uzbekistan"),
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
                  _c("div", { staticClass: "form-row" }, [
                    _vm._m(11),
                    _vm._v(" "),
                    _c("div", { staticClass: "input-wrapper" }, [
                      _c("input", {
                        directives: [
                          {
                            name: "model",
                            rawName: "v-model",
                            value: _vm.member.bank_account_number,
                            expression: "member.bank_account_number",
                          },
                        ],
                        staticClass: "form-control",
                        attrs: {
                          type: "text",
                          placeholder: "Bank account number",
                        },
                        domProps: { value: _vm.member.bank_account_number },
                        on: {
                          input: function ($event) {
                            if ($event.target.composing) {
                              return
                            }
                            _vm.$set(
                              _vm.member,
                              "bank_account_number",
                              $event.target.value
                            )
                          },
                        },
                      }),
                    ]),
                  ]),
                  _vm._v(" "),
                  _c("div", { staticClass: "form-row" }, [
                    _vm._m(12),
                    _vm._v(" "),
                    _c("div", { staticClass: "input-wrapper" }, [
                      _c("input", {
                        directives: [
                          {
                            name: "model",
                            rawName: "v-model",
                            value: _vm.member.routing_number,
                            expression: "member.routing_number",
                          },
                        ],
                        staticClass: "form-control",
                        attrs: { type: "text", placeholder: "Routing number" },
                        domProps: { value: _vm.member.routing_number },
                        on: {
                          input: function ($event) {
                            if ($event.target.composing) {
                              return
                            }
                            _vm.$set(
                              _vm.member,
                              "routing_number",
                              $event.target.value
                            )
                          },
                        },
                      }),
                    ]),
                  ]),
                  _vm._v(" "),
                  _c("div", { staticClass: "form-row" }, [
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
                            value: _vm.member.bank_account_type,
                            expression: "member.bank_account_type",
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
                              _vm.member,
                              "bank_account_type",
                              $event.target.multiple
                                ? $$selectedVal
                                : $$selectedVal[0]
                            )
                          },
                        },
                      },
                      [
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
                        _c("option", { attrs: { value: "Joint Account" } }, [
                          _vm._v("Joint Account"),
                        ]),
                        _vm._v(" "),
                        _c("option", { attrs: { value: "Other" } }, [
                          _vm._v("Other"),
                        ]),
                      ]
                    ),
                  ]),
                  _vm._v(" "),
                  _c("div", { staticClass: "form-row" }, [
                    _c("label", { staticClass: "form-label" }, [
                      _vm._v("Bank account holder name"),
                    ]),
                    _vm._v(" "),
                    _c("div", { staticClass: "input-wrapper" }, [
                      _c("input", {
                        directives: [
                          {
                            name: "model",
                            rawName: "v-model",
                            value: _vm.member.bank_account_holder_name,
                            expression: "member.bank_account_holder_name",
                          },
                        ],
                        staticClass: "form-control",
                        attrs: {
                          type: "text",
                          placeholder: "Bank account holder name",
                        },
                        domProps: {
                          value: _vm.member.bank_account_holder_name,
                        },
                        on: {
                          input: function ($event) {
                            if ($event.target.composing) {
                              return
                            }
                            _vm.$set(
                              _vm.member,
                              "bank_account_holder_name",
                              $event.target.value
                            )
                          },
                        },
                      }),
                    ]),
                  ]),
                  _vm._v(" "),
                  _c("div", { staticClass: "form-row" }, [
                    _c("label", { staticClass: "form-label" }, [
                      _vm._v("Bank name"),
                    ]),
                    _vm._v(" "),
                    _c("div", { staticClass: "input-wrapper" }, [
                      _c("input", {
                        directives: [
                          {
                            name: "model",
                            rawName: "v-model",
                            value: _vm.member.bank_name,
                            expression: "member.bank_name",
                          },
                        ],
                        staticClass: "form-control",
                        attrs: { type: "text", placeholder: "Bank name" },
                        domProps: { value: _vm.member.bank_name },
                        on: {
                          input: function ($event) {
                            if ($event.target.composing) {
                              return
                            }
                            _vm.$set(
                              _vm.member,
                              "bank_name",
                              $event.target.value
                            )
                          },
                        },
                      }),
                    ]),
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
                            value: _vm.member.send_invitation,
                            expression: "member.send_invitation",
                          },
                        ],
                        attrs: { type: "checkbox" },
                        domProps: {
                          checked: Array.isArray(_vm.member.send_invitation)
                            ? _vm._i(_vm.member.send_invitation, null) > -1
                            : _vm.member.send_invitation,
                        },
                        on: {
                          change: function ($event) {
                            var $$a = _vm.member.send_invitation,
                              $$el = $event.target,
                              $$c = $$el.checked ? true : false
                            if (Array.isArray($$a)) {
                              var $$v = null,
                                $$i = _vm._i($$a, $$v)
                              if ($$el.checked) {
                                $$i < 0 &&
                                  _vm.$set(
                                    _vm.member,
                                    "send_invitation",
                                    $$a.concat([$$v])
                                  )
                              } else {
                                $$i > -1 &&
                                  _vm.$set(
                                    _vm.member,
                                    "send_invitation",
                                    $$a.slice(0, $$i).concat($$a.slice($$i + 1))
                                  )
                              }
                            } else {
                              _vm.$set(_vm.member, "send_invitation", $$c)
                            }
                          },
                        },
                      }),
                      _vm._v(" "),
                      _c("span", { staticClass: "checkmark" }),
                      _vm._v(" "),
                      _vm._m(13),
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
                        [
                          _vm._v(
                            "\n                                ×\n                            "
                          ),
                        ]
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
                            _vm._v(" Capture\n                            "),
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
                              "\n                                Cancel\n                            "
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
                  staticClass: "cancel-btn",
                  attrs: { type: "button" },
                  on: { click: _vm.goToMembersList },
                },
                [
                  _c("i", { staticClass: "fas fa-times" }),
                  _vm._v(" "),
                  _c("span", [_vm._v("Cancel")]),
                ]
              ),
              _vm._v(" "),
              _vm._m(14),
            ]),
          ]
        ),
      ]),
    ]),
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
      _c("h2", { staticClass: "form-title" }, [_vm._v("Create New Member")]),
      _vm._v(" "),
      _c("p", { staticClass: "form-subtitle" }, [
        _vm._v(
          "\n                        Add a new member to your fitness community\n                    "
        ),
      ]),
    ])
  },
  function () {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("label", { staticClass: "form-label" }, [
      _vm._v(
        "\n                                    Member ID\n                                    "
      ),
      _c("i", {
        staticClass: "fas fa-info-circle tooltip-icon",
        attrs: { title: "This ID is automatically generated by the system." },
      }),
    ])
  },
  function () {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("label", { staticClass: "form-label" }, [
      _vm._v("First name\n                                    "),
      _c("span", { staticClass: "required-asterisk" }, [_vm._v("*")]),
    ])
  },
  function () {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("label", { staticClass: "form-label" }, [
      _vm._v("Last name\n                                    "),
      _c("span", { staticClass: "required-asterisk" }, [_vm._v("*")]),
    ])
  },
  function () {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("label", { staticClass: "form-label" }, [
      _vm._v("Sex\n                                    "),
      _c("span", { staticClass: "required-asterisk" }, [_vm._v("*")]),
    ])
  },
  function () {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("label", { staticClass: "form-label" }, [
      _vm._v("Birthday\n                                    "),
      _c("span", { staticClass: "required-asterisk" }, [_vm._v("*")]),
    ])
  },
  function () {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("label", { staticClass: "form-label" }, [
      _vm._v(
        "\n                                    Email address\n                                    "
      ),
      _c("span", { staticClass: "required-asterisk" }, [_vm._v("*")]),
      _vm._v(" "),
      _c("span", { staticClass: "tooltip-wrapper" }, [
        _c("i", { staticClass: "fas fa-info-circle info-icon" }),
        _vm._v(" "),
        _c("span", { staticClass: "tooltip-content" }, [
          _vm._v(
            "\n                                            We'll use this email to send important updates and notifications.\n                                        "
          ),
        ]),
      ]),
    ])
  },
  function () {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("label", { staticClass: "form-label" }, [
      _vm._v(
        "\n                                    Subscription reason\n                                    "
      ),
      _c("span", { staticClass: "tooltip-wrapper" }, [
        _c("i", { staticClass: "fas fa-info-circle info-icon" }),
        _vm._v(" "),
        _c("span", { staticClass: "tooltip-content" }, [
          _vm._v(
            "\n                                            Reason for subscription\n                                        "
          ),
        ]),
      ]),
    ])
  },
  function () {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("label", { staticClass: "form-label" }, [
      _vm._v(
        "\n                                    Source\n                                    "
      ),
      _c("span", { staticClass: "tooltip-wrapper" }, [
        _c("i", { staticClass: "fas fa-info-circle info-icon" }),
        _vm._v(" "),
        _c("span", { staticClass: "tooltip-content" }, [
          _vm._v(
            "\n                                            Where did you hear about us? Select the source of referral for this member.\n                                        "
          ),
        ]),
      ]),
    ])
  },
  function () {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("label", { staticClass: "form-label" }, [
      _vm._v(
        "\n                                    Language\n                                    "
      ),
      _c("span", { staticClass: "tooltip-wrapper" }, [
        _c("i", { staticClass: "fas fa-info-circle info-icon" }),
        _vm._v(" "),
        _c("span", { staticClass: "tooltip-content" }, [
          _vm._v(
            "\n                                            Preferred language for communication\n                                        "
          ),
        ]),
      ]),
    ])
  },
  function () {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("label", { staticClass: "form-label" }, [
      _vm._v(
        "\n                                    Tags\n                                    "
      ),
      _c("span", { staticClass: "tooltip-wrapper" }, [
        _c("i", { staticClass: "fas fa-info-circle info-icon" }),
        _vm._v(" "),
        _c("span", { staticClass: "tooltip-content" }, [
          _vm._v(
            "\n                                            Add tags to categorize this member\n                                        "
          ),
        ]),
      ]),
    ])
  },
  function () {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("label", { staticClass: "form-label" }, [
      _vm._v(
        "\n                                    Bank account number\n                                    "
      ),
      _c("span", { staticClass: "tooltip-wrapper" }, [
        _c("i", { staticClass: "fas fa-info-circle info-icon" }),
        _vm._v(" "),
        _c("span", { staticClass: "tooltip-content" }, [
          _vm._v(
            "\n                                            Enter your bank account number\n                                        "
          ),
        ]),
      ]),
    ])
  },
  function () {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("label", { staticClass: "form-label" }, [
      _vm._v(
        "\n                                    Routing number\n                                    "
      ),
      _c("span", { staticClass: "tooltip-wrapper" }, [
        _c("i", { staticClass: "fas fa-info-circle info-icon" }),
        _vm._v(" "),
        _c("span", { staticClass: "tooltip-content" }, [
          _vm._v(
            "\n                                            Bank's unique code to identify the bank\n                                        "
          ),
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
            "\n                                            Send a welcome email invitation to the new member\n                                        "
          ),
        ]),
      ]),
    ])
  },
  function () {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c(
      "button",
      { staticClass: "submit-btn", attrs: { type: "submit" } },
      [
        _c("i", { staticClass: "fas fa-check-circle" }),
        _vm._v(" "),
        _c("span", [_vm._v("Add")]),
      ]
    )
  },
]
render._withStripped = true



/***/ })

}]);