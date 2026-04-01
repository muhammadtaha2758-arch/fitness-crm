"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["resources_src_views_app_pages_Nutrition_MemberManagement_vue"],{

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/Nutrition/MemberManagement.vue?vue&type=script&lang=js":
/*!**************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/Nutrition/MemberManagement.vue?vue&type=script&lang=js ***!
  \**************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! axios */ "./node_modules/axios/index.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var nprogress__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! nprogress */ "./node_modules/nprogress/nprogress.js");
/* harmony import */ var nprogress__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(nprogress__WEBPACK_IMPORTED_MODULE_1__);
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



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  name: 'MemberManagement',
  metaInfo: {
    title: 'Member Management - Nutrition Hub'
  },
  data: function data() {
    return {
      loading: false,
      error: null,
      members: [],
      searchQuery: '',
      genderFilter: '',
      activeStatusFilter: '',
      currentPage: 1,
      perPage: 25,
      totalRows: 0,
      // Mail modal related
      mailForm: {
        to: "",
        recipientName: "",
        subject: "",
        message: "",
        template: null,
        sending: false,
        memberId: null
      },
      emailTemplates: [{
        value: 'welcome',
        text: 'Welcome Message'
      }, {
        value: 'membership_reminder',
        text: 'Membership Reminder'
      }, {
        value: 'payment_reminder',
        text: 'Payment Reminder'
      }, {
        value: 'workout_reminder',
        text: 'Workout Reminder'
      }, {
        value: 'custom',
        text: 'Custom Message'
      }]
    };
  },
  computed: {
    totalPages: function totalPages() {
      return Math.ceil(this.totalRows / this.perPage);
    }
  },
  mounted: function mounted() {
    this.fetchMembers();
  },
  methods: {
    goBack: function goBack() {
      this.$router.push('/app/nutrition');
    },
    fetchMembers: function fetchMembers() {
      var _this = this;
      return _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
        var params, response, _error$response;
        return _regeneratorRuntime().wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              _this.loading = true;
              _this.error = null;
              nprogress__WEBPACK_IMPORTED_MODULE_1___default().start();
              _context.prev = 3;
              params = {
                page: _this.currentPage,
                limit: _this.perPage,
                name: _this.searchQuery || '',
                gender: _this.genderFilter || '',
                status: _this.activeStatusFilter || ''
              };
              _context.next = 7;
              return axios__WEBPACK_IMPORTED_MODULE_0___default().get('members', {
                params: params
              });
            case 7:
              response = _context.sent;
              if (response.data && response.data.clients) {
                _this.members = response.data.clients;
                _this.totalRows = response.data.totalRows || response.data.total || response.data.count || _this.members.length;
              } else {
                _this.members = [];
                _this.totalRows = 0;
              }
              _context.next = 17;
              break;
            case 11:
              _context.prev = 11;
              _context.t0 = _context["catch"](3);
              console.error('Error fetching members:', _context.t0);
              _this.error = ((_error$response = _context.t0.response) === null || _error$response === void 0 || (_error$response = _error$response.data) === null || _error$response === void 0 ? void 0 : _error$response.message) || 'Failed to load members. Please try again.';
              _this.members = [];
              _this.totalRows = 0;
            case 17:
              _context.prev = 17;
              _this.loading = false;
              nprogress__WEBPACK_IMPORTED_MODULE_1___default().done();
              return _context.finish(17);
            case 21:
            case "end":
              return _context.stop();
          }
        }, _callee, null, [[3, 11, 17, 21]]);
      }))();
    },
    handleSearch: function handleSearch() {
      var _this2 = this;
      // Debounce search
      clearTimeout(this.searchTimeout);
      this.searchTimeout = setTimeout(function () {
        _this2.currentPage = 1;
        _this2.fetchMembers();
      }, 500);
    },
    clearSearch: function clearSearch() {
      this.searchQuery = '';
      this.currentPage = 1;
      this.fetchMembers();
    },
    setGenderFilter: function setGenderFilter(value) {
      this.genderFilter = value;
      this.currentPage = 1;
      this.fetchMembers();
    },
    setActiveStatusFilter: function setActiveStatusFilter(value) {
      this.activeStatusFilter = value;
      this.currentPage = 1;
      this.fetchMembers();
    },
    getGenderDisplay: function getGenderDisplay() {
      if (!this.genderFilter) return 'All Genders';
      return this.genderFilter.charAt(0).toUpperCase() + this.genderFilter.slice(1);
    },
    getActiveStatusDisplay: function getActiveStatusDisplay() {
      if (!this.activeStatusFilter) return 'All';
      return this.activeStatusFilter.charAt(0).toUpperCase() + this.activeStatusFilter.slice(1);
    },
    formatMemberName: function formatMemberName(member) {
      if (member.membername) return member.membername;
      if (member.first_name || member.last_name) {
        return "".concat(member.last_name || '', ", ").concat(member.first_name || '').trim();
      }
      return member.name || 'Unknown';
    },
    formatDate: function formatDate(date) {
      if (!date) return '-';
      var d = new Date(date);
      return "".concat(d.getMonth() + 1, "/").concat(d.getDate(), "/").concat(d.getFullYear());
    },
    goToPage: function goToPage(page) {
      if (page >= 1 && page <= this.totalPages) {
        this.currentPage = page;
        this.fetchMembers();
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      }
    },
    emailMember: function emailMember(member) {
      // Set form data from member
      this.mailForm.to = member.email || "";
      this.mailForm.recipientName = this.formatMemberName(member);
      this.mailForm.subject = "";
      this.mailForm.message = "";
      this.mailForm.template = null;
      this.mailForm.sending = false;
      this.mailForm.memberId = member.id || null;

      // Show modal
      this.$bvModal.show('mailModal');
    },
    resetMailForm: function resetMailForm() {
      this.mailForm = {
        to: "",
        recipientName: "",
        subject: "",
        message: "",
        template: null,
        sending: false,
        memberId: null
      };
    },
    applyTemplate: function applyTemplate() {
      if (!this.mailForm.template) return;
      var templates = {
        welcome: {
          subject: "Welcome to Our Fitness Center!",
          message: "Dear ".concat(this.mailForm.recipientName, ",\n\nWelcome to our fitness center! We're excited to have you as a member of our community.\n\nYour membership is now active and you can start enjoying all our facilities and services.\n\nIf you have any questions or need assistance, please don't hesitate to contact us.\n\nBest regards,\nThe Fitness Team")
        },
        membership_reminder: {
          subject: "Membership Reminder",
          message: "Dear ".concat(this.mailForm.recipientName, ",\n\nThis is a friendly reminder about your membership status.\n\nPlease ensure your membership is up to date to continue enjoying our services.\n\nIf you have any questions about your membership, please contact us.\n\nBest regards,\nThe Fitness Team")
        },
        payment_reminder: {
          subject: "Payment Reminder",
          message: "Dear ".concat(this.mailForm.recipientName, ",\n\nThis is a reminder that your membership payment is due.\n\nPlease ensure your payment is processed to avoid any interruption in your services.\n\nIf you have already made the payment, please disregard this message.\n\nBest regards,\nThe Fitness Team")
        },
        workout_reminder: {
          subject: "Workout Reminder",
          message: "Dear ".concat(this.mailForm.recipientName, ",\n\nDon't forget about your scheduled workout today!\n\nWe look forward to seeing you at the gym and helping you achieve your fitness goals.\n\nIf you need to reschedule, please let us know in advance.\n\nBest regards,\nThe Fitness Team")
        },
        custom: {
          subject: "",
          message: ""
        }
      };
      var template = templates[this.mailForm.template];
      if (template) {
        this.mailForm.subject = template.subject;
        this.mailForm.message = template.message;
      }
    },
    sendEmail: function sendEmail() {
      var _this3 = this;
      return _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee2() {
        var response, errorMessage;
        return _regeneratorRuntime().wrap(function _callee2$(_context2) {
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
              if (!(!_this3.mailForm.to || !_this3.mailForm.subject || !_this3.mailForm.message)) {
                _context2.next = 3;
                break;
              }
              _this3.makeToast("warning", "Please fill in all required fields", "Warning");
              return _context2.abrupt("return");
            case 3:
              if (_this3.mailForm.memberId) {
                _context2.next = 6;
                break;
              }
              _this3.makeToast("danger", "Member ID not found. Please try again.", "Error");
              return _context2.abrupt("return");
            case 6:
              _this3.mailForm.sending = true;
              _context2.prev = 7;
              _context2.next = 10;
              return axios__WEBPACK_IMPORTED_MODULE_0___default().post("members/".concat(_this3.mailForm.memberId, "/send-message"), {
                recipients: _this3.mailForm.to,
                subject: _this3.mailForm.subject,
                body: _this3.mailForm.message
              });
            case 10:
              response = _context2.sent;
              if (response.data && response.data.success) {
                _this3.makeToast("success", response.data.message || "Email sent successfully!", "Success");
                _this3.$bvModal.hide('mailModal');
                _this3.resetMailForm();
              } else {
                _this3.makeToast("danger", response.data.message || "Failed to send email.", "Error");
              }
              _context2.next = 19;
              break;
            case 14:
              _context2.prev = 14;
              _context2.t0 = _context2["catch"](7);
              console.error('Error sending email:', _context2.t0);
              errorMessage = _context2.t0.response && _context2.t0.response.data && _context2.t0.response.data.message || _context2.t0.message || "Failed to send email. Please try again.";
              _this3.makeToast("danger", errorMessage, "Error");
            case 19:
              _context2.prev = 19;
              _this3.mailForm.sending = false;
              return _context2.finish(19);
            case 22:
            case "end":
              return _context2.stop();
          }
        }, _callee2, null, [[7, 14, 19, 22]]);
      }))();
    },
    makeToast: function makeToast(variant, msg, title) {
      this.$root.$bvToast.toast(msg, {
        title: title || (variant === "success" ? "Success" : variant === "error" ? "Error" : "Info"),
        variant: variant === "error" ? "danger" : variant,
        solid: true,
        toaster: "b-toaster-top-right",
        autoHideDelay: 3000
      });
    }
  }
});

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js??clonedRuleSet-12.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12.use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-12.use[3]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/Nutrition/MemberManagement.vue?vue&type=style&index=0&id=1c5f00f1&lang=scss&scoped=true":
/*!*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??clonedRuleSet-12.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12.use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-12.use[3]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/Nutrition/MemberManagement.vue?vue&type=style&index=0&id=1c5f00f1&lang=scss&scoped=true ***!
  \*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
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
___CSS_LOADER_EXPORT___.push([module.id, "@charset \"UTF-8\";\n.filter-btn .btn[data-v-1c5f00f1],\n.filter-btn .btn-secondary[data-v-1c5f00f1],\n.filter-btn .btn-outline-secondary[data-v-1c5f00f1],\n.filter-btn button.btn[data-v-1c5f00f1],\n.filter-btn button.btn-secondary[data-v-1c5f00f1] {\n  color: #000 !important;\n  background-color: transparent !important;\n  border-color: #6c757d !important;\n}\n.filter-btn .btn[data-v-1c5f00f1]:hover,\n.filter-btn .btn-secondary[data-v-1c5f00f1]:hover,\n.filter-btn .btn-outline-secondary[data-v-1c5f00f1]:hover,\n.filter-btn button.btn[data-v-1c5f00f1]:hover,\n.filter-btn button.btn-secondary[data-v-1c5f00f1]:hover {\n  color: #dc3545 !important;\n  background-color: transparent !important;\n  border-color: #dc3545 !important;\n  box-shadow: none !important;\n}\n.filter-btn .btn[data-v-1c5f00f1]:focus,\n.filter-btn .btn-secondary[data-v-1c5f00f1]:focus,\n.filter-btn .btn-outline-secondary[data-v-1c5f00f1]:focus,\n.filter-btn button.btn[data-v-1c5f00f1]:focus,\n.filter-btn button.btn-secondary[data-v-1c5f00f1]:focus {\n  color: #dc3545 !important;\n  background-color: transparent !important;\n  border-color: #dc3545 !important;\n  box-shadow: none !important;\n}\n.filter-btn .btn[data-v-1c5f00f1]:active,\n.filter-btn .btn-secondary[data-v-1c5f00f1]:active,\n.filter-btn .btn-outline-secondary[data-v-1c5f00f1]:active,\n.filter-btn button.btn[data-v-1c5f00f1]:active,\n.filter-btn button.btn-secondary[data-v-1c5f00f1]:active {\n  color: #dc3545 !important;\n  background-color: transparent !important;\n  border-color: #dc3545 !important;\n}\n.btn-secondary[data-v-1c5f00f1]:not(:disabled):not(.disabled):active:focus {\n  box-shadow: none !important;\n}\n\n/* ===========================================\n   COMMON BREADCRUMB NAVIGATION STYLES\n   =========================================== */\n.breadcrumb-nav-row[data-v-1c5f00f1] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  margin-bottom: 0.5rem;\n  gap: 0.5rem;\n}\n.breadcrumb-section[data-v-1c5f00f1] {\n  flex: 1;\n}\n.breadcrumb-section .breadcrumb-nav .breadcrumb-container[data-v-1c5f00f1] {\n  display: flex;\n  align-items: center;\n  gap: 1rem;\n}\n.breadcrumb-section .breadcrumb-nav .breadcrumb-container .back-button[data-v-1c5f00f1] {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  width: 40px;\n  height: 40px;\n  background: rgba(255, 255, 255, 0.1);\n  border: 1px solid rgba(255, 255, 255, 0.2);\n  border-radius: 8px;\n  color: #ffffff;\n  cursor: pointer;\n  transition: all 0.3s ease;\n}\n.breadcrumb-section .breadcrumb-nav .breadcrumb-container .back-button[data-v-1c5f00f1]:hover {\n  background: rgba(255, 255, 255, 0.15);\n  border-color: rgba(255, 255, 255, 0.3);\n  transform: translateY(-1px);\n  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);\n  color: #dc3545;\n}\n.breadcrumb-section .breadcrumb-nav .breadcrumb-container .back-button i[data-v-1c5f00f1] {\n  font-size: 1.1em;\n}\n.breadcrumb-section .breadcrumb-nav .breadcrumb-container .breadcrumb[data-v-1c5f00f1] {\n  display: flex;\n  align-items: center;\n  gap: 0.5rem;\n  margin: 0;\n  padding: 0;\n  background: none;\n  border-radius: 0;\n}\n.breadcrumb-section .breadcrumb-nav .breadcrumb-container .breadcrumb .breadcrumb-item[data-v-1c5f00f1] {\n  display: flex;\n  align-items: center;\n  gap: 0.5rem;\n  font-size: 0.875rem;\n  color: #ffffff;\n}\n.breadcrumb-section .breadcrumb-nav .breadcrumb-container .breadcrumb .breadcrumb-item.active[data-v-1c5f00f1] {\n  color: #252525;\n  font-weight: 600;\n}\n.breadcrumb-section .breadcrumb-nav .breadcrumb-container .breadcrumb .breadcrumb-item.active i[data-v-1c5f00f1] {\n  color: #dc3545;\n}\n.breadcrumb-section .breadcrumb-nav .breadcrumb-container .breadcrumb .breadcrumb-item a[data-v-1c5f00f1] {\n  display: flex;\n  align-items: center;\n  gap: 0.5rem;\n  color: #6a6a6a;\n  text-decoration: none;\n  transition: color 0.3s ease;\n}\n.breadcrumb-section .breadcrumb-nav .breadcrumb-container .breadcrumb .breadcrumb-item a[data-v-1c5f00f1]:hover {\n  color: #dc3545;\n}\n.breadcrumb-section .breadcrumb-nav .breadcrumb-container .breadcrumb .breadcrumb-item a:hover i[data-v-1c5f00f1] {\n  color: #dc3545;\n}\n.breadcrumb-section .breadcrumb-nav .breadcrumb-container .breadcrumb .breadcrumb-item a i[data-v-1c5f00f1] {\n  font-size: 0.9em;\n  transition: color 0.3s ease;\n}\n.breadcrumb-section .breadcrumb-nav .breadcrumb-container .breadcrumb .breadcrumb-item[data-v-1c5f00f1]:not(:last-child)::after {\n  content: \"›\";\n  margin-left: 0.5rem;\n  color: #6a6a6a;\n  font-size: 1.2em;\n}\n.action-section[data-v-1c5f00f1] {\n  display: flex;\n  align-items: center;\n}\n.action-section .action-btn[data-v-1c5f00f1] {\n  display: flex;\n  align-items: center;\n  gap: 0.5rem;\n  padding: 0.5rem 1rem;\n  border-radius: 8px;\n  font-size: 0.875rem;\n  font-weight: 500;\n  transition: all 0.3s ease;\n}\n.action-section .action-btn[data-v-1c5f00f1]:hover:not(:disabled) {\n  transform: translateY(-1px);\n  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);\n}\n.action-section .action-btn[data-v-1c5f00f1]:disabled {\n  opacity: 0.6;\n  cursor: not-allowed;\n}\n.action-section .action-btn i[data-v-1c5f00f1] {\n  font-size: 0.9em;\n}\n@media (max-width: 768px) {\n.breadcrumb-nav-row[data-v-1c5f00f1] {\n    flex-direction: column;\n    align-items: flex-start;\n    gap: 0.5rem;\n}\n.breadcrumb-section[data-v-1c5f00f1] {\n    width: 100%;\n}\n.breadcrumb-section .breadcrumb-container[data-v-1c5f00f1] {\n    flex-direction: column;\n    align-items: flex-start;\n    gap: 0.5rem;\n}\n.breadcrumb-section .breadcrumb-container .breadcrumb[data-v-1c5f00f1] {\n    flex-wrap: wrap;\n}\n.breadcrumb-section .breadcrumb-container .breadcrumb .breadcrumb-item[data-v-1c5f00f1] {\n    font-size: 0.8rem;\n}\n.breadcrumb-section .breadcrumb-container .breadcrumb .breadcrumb-item a[data-v-1c5f00f1] {\n    font-size: 0.8rem;\n}\n.action-section[data-v-1c5f00f1] {\n    width: 100%;\n    justify-content: flex-end;\n}\n.action-section .action-btn[data-v-1c5f00f1] {\n    font-size: 0.8rem;\n    padding: 0.4rem 0.8rem;\n}\n}\n/* ===========================================\n   RESPONSIVE UTILITY CLASSES (ALL DEVICES)\n   =========================================== */\n.show-xs-only[data-v-1c5f00f1],\n.show-sm-only[data-v-1c5f00f1],\n.show-md-only[data-v-1c5f00f1],\n.show-lg-only[data-v-1c5f00f1],\n.show-xl-only[data-v-1c5f00f1] {\n  display: none !important;\n}\n@media (max-width: 575px) {\n.hide-xs[data-v-1c5f00f1] {\n    display: none !important;\n}\n.show-xs-only[data-v-1c5f00f1] {\n    display: initial !important;\n}\n}\n@media (min-width: 576px) and (max-width: 767px) {\n.hide-sm[data-v-1c5f00f1] {\n    display: none !important;\n}\n.show-sm-only[data-v-1c5f00f1] {\n    display: initial !important;\n}\n}\n@media (min-width: 768px) and (max-width: 991px) {\n.hide-md[data-v-1c5f00f1] {\n    display: none !important;\n}\n.show-md-only[data-v-1c5f00f1] {\n    display: initial !important;\n}\n}\n@media (min-width: 992px) and (max-width: 1199px) {\n.hide-lg[data-v-1c5f00f1] {\n    display: none !important;\n}\n.show-lg-only[data-v-1c5f00f1] {\n    display: initial !important;\n}\n}\n@media (min-width: 1200px) {\n.hide-xl[data-v-1c5f00f1] {\n    display: none !important;\n}\n.show-xl-only[data-v-1c5f00f1] {\n    display: initial !important;\n}\n}\n@media (max-width: 576px) {\n.hide-sm-down[data-v-1c5f00f1] {\n    display: none !important;\n}\n}\n@media (max-width: 768px) {\n.hide-md-down[data-v-1c5f00f1] {\n    display: none !important;\n}\n}\n@media (max-width: 992px) {\n.hide-lg-down[data-v-1c5f00f1] {\n    display: none !important;\n}\n}\n@media (min-width: 576px) {\n.hide-sm-up[data-v-1c5f00f1] {\n    display: none !important;\n}\n}\n@media (min-width: 768px) {\n.hide-md-up[data-v-1c5f00f1] {\n    display: none !important;\n}\n}\n@media (min-width: 992px) {\n.hide-lg-up[data-v-1c5f00f1] {\n    display: none !important;\n}\n}\n@media (max-width: 575px) {\n.d-xs-none[data-v-1c5f00f1] {\n    display: none !important;\n}\n.d-xs-block[data-v-1c5f00f1] {\n    display: block !important;\n}\n.d-xs-flex[data-v-1c5f00f1] {\n    display: flex !important;\n}\n}\n@media (min-width: 576px) and (max-width: 767px) {\n.d-sm-none[data-v-1c5f00f1] {\n    display: none !important;\n}\n.d-sm-block[data-v-1c5f00f1] {\n    display: block !important;\n}\n.d-sm-flex[data-v-1c5f00f1] {\n    display: flex !important;\n}\n}\n@media (min-width: 768px) and (max-width: 991px) {\n.d-md-none[data-v-1c5f00f1] {\n    display: none !important;\n}\n.d-md-block[data-v-1c5f00f1] {\n    display: block !important;\n}\n.d-md-flex[data-v-1c5f00f1] {\n    display: flex !important;\n}\n}\n@media (min-width: 992px) and (max-width: 1199px) {\n.d-lg-none[data-v-1c5f00f1] {\n    display: none !important;\n}\n.d-lg-block[data-v-1c5f00f1] {\n    display: block !important;\n}\n.d-lg-flex[data-v-1c5f00f1] {\n    display: flex !important;\n}\n}\n@media (min-width: 1200px) {\n.d-xl-none[data-v-1c5f00f1] {\n    display: none !important;\n}\n.d-xl-block[data-v-1c5f00f1] {\n    display: block !important;\n}\n.d-xl-flex[data-v-1c5f00f1] {\n    display: flex !important;\n}\n}\n@media (min-width: 576px) {\n.custom-modal-xl[data-v-1c5f00f1] {\n    max-width: 1500px !important;\n}\n}\n.member-management-wrapper[data-v-1c5f00f1] {\n  padding: 1rem;\n}\n.member-management-wrapper .breadcrumb-nav-row[data-v-1c5f00f1] {\n  margin-bottom: 1.5rem;\n}\n.member-management-wrapper .breadcrumb-nav-row .breadcrumb-section .breadcrumb-container .back-button[data-v-1c5f00f1] {\n  background: none;\n  border: none;\n  font-size: 1.2rem;\n  margin-right: 0.5rem;\n  cursor: pointer;\n  padding: 0.25rem 0.5rem;\n}\n.member-management-wrapper .breadcrumb-nav-row .breadcrumb-section .breadcrumb-container .back-button[data-v-1c5f00f1]:hover {\n  opacity: 0.7;\n}\n.member-management-wrapper .breadcrumb-nav-row .breadcrumb-section .breadcrumb-container .breadcrumb[data-v-1c5f00f1] {\n  margin-bottom: 0;\n}\n.member-management-wrapper .breadcrumb-nav-row .breadcrumb-section .breadcrumb-container .breadcrumb .breadcrumb-item a[data-v-1c5f00f1] {\n  color: #dc3545;\n  text-decoration: none;\n}\n.member-management-wrapper .breadcrumb-nav-row .breadcrumb-section .breadcrumb-container .breadcrumb .breadcrumb-item a[data-v-1c5f00f1]:hover {\n  text-decoration: underline;\n}\n.member-management-wrapper .breadcrumb-nav-row .breadcrumb-section .breadcrumb-container .breadcrumb .breadcrumb-item.active[data-v-1c5f00f1] {\n  color: #686868;\n}\n.member-management-wrapper .main-content .page-header[data-v-1c5f00f1] {\n  margin-bottom: 2rem;\n}\n.member-management-wrapper .main-content .page-header .page-title[data-v-1c5f00f1] {\n  font-size: 2rem;\n  font-weight: 600;\n  margin-bottom: 1.5rem;\n  color: #343a40;\n}\n.member-management-wrapper .main-content .page-header .instructions-section[data-v-1c5f00f1] {\n  background-color: #f8f9fa;\n  padding: 1.5rem;\n  border-radius: 0.5rem;\n  border-left: 4px solid #dc3545;\n}\n.member-management-wrapper .main-content .page-header .instructions-section .instructions-title[data-v-1c5f00f1] {\n  font-size: 1.25rem;\n  font-weight: 600;\n  margin-bottom: 1rem;\n  color: #343a40;\n}\n.member-management-wrapper .main-content .page-header .instructions-section .instructions-text[data-v-1c5f00f1] {\n  color: #686868;\n  line-height: 1.6;\n  margin-bottom: 0;\n}\n.member-management-wrapper .main-content .page-header .search-section .search-field-container[data-v-1c5f00f1] {\n  max-width: 400px;\n}\n.member-management-wrapper .main-content .page-header .search-section .search-field-container .search-field[data-v-1c5f00f1] {\n  position: relative;\n}\n.member-management-wrapper .main-content .page-header .search-section .search-field-container .search-field .search-icon[data-v-1c5f00f1],\n.member-management-wrapper .main-content .page-header .search-section .search-field-container .search-field .search-clear[data-v-1c5f00f1] {\n  position: absolute;\n  left: 1rem;\n  top: 50%;\n  transform: translateY(-50%);\n  color: #686868;\n  z-index: 1;\n}\n.member-management-wrapper .main-content .page-header .search-section .search-field-container .search-field .search-clear[data-v-1c5f00f1] {\n  cursor: pointer;\n  left: auto;\n  right: 1rem;\n}\n.member-management-wrapper .main-content .page-header .search-section .search-field-container .search-field .search-clear[data-v-1c5f00f1]:hover {\n  color: #f44336;\n}\n.member-management-wrapper .main-content .page-header .search-section .search-field-container .search-field .search-input[data-v-1c5f00f1] {\n  width: 100%;\n  padding: 0.75rem 1rem 0.75rem 2.5rem;\n  border: 1px solid #dee2e6;\n  border-radius: 0.25rem;\n  font-size: 1rem;\n  color: #343a40;\n  background-color: #fff;\n}\n.member-management-wrapper .main-content .page-header .search-section .search-field-container .search-field .search-input[data-v-1c5f00f1]::-moz-placeholder {\n  color: #686868;\n  opacity: 1;\n}\n.member-management-wrapper .main-content .page-header .search-section .search-field-container .search-field .search-input[data-v-1c5f00f1]::placeholder {\n  color: #686868;\n  opacity: 1;\n}\n.member-management-wrapper .main-content .page-header .search-section .search-field-container .search-field .search-input[data-v-1c5f00f1]:focus {\n  outline: none;\n  border-color: #dc3545;\n  box-shadow: 0 0 0 0.2rem rgba(220, 53, 69, 0.25);\n}\n.member-management-wrapper .main-content .page-header .filters-actions-row[data-v-1c5f00f1] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  flex-wrap: wrap;\n  gap: 1rem;\n}\n.member-management-wrapper .main-content .page-header .filters-actions-row .filters-container[data-v-1c5f00f1] {\n  flex: 1;\n  min-width: 300px;\n}\n.member-management-wrapper .main-content .page-header .filters-actions-row .filters-container .filter-dropdown[data-v-1c5f00f1] {\n  min-width: 150px;\n}\n.member-management-wrapper .main-content .page-header .filters-actions-row .actions-container[data-v-1c5f00f1] {\n  flex-shrink: 0;\n}\n.member-management-wrapper .main-content .loading-state[data-v-1c5f00f1],\n.member-management-wrapper .main-content .error-state[data-v-1c5f00f1] {\n  padding: 3rem 1rem;\n}\n.member-management-wrapper .main-content .members-table-card[data-v-1c5f00f1] {\n  background: white;\n  border-radius: 0.5rem;\n  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);\n}\n.member-management-wrapper .main-content .members-table-card .members-table[data-v-1c5f00f1] {\n  margin-bottom: 0;\n}\n.member-management-wrapper .main-content .members-table-card .members-table .table-header[data-v-1c5f00f1] {\n  font-weight: 600;\n  color: #343a40;\n  background-color: #f8f9fa;\n  padding: 1rem;\n  border-bottom: 2px solid #dee2e6;\n  white-space: nowrap;\n}\n.member-management-wrapper .main-content .members-table-card .members-table .table-row[data-v-1c5f00f1] {\n  transition: background-color 0.15s ease;\n}\n.member-management-wrapper .main-content .members-table-card .members-table .table-row[data-v-1c5f00f1]:hover {\n  background-color: #f8f9fa;\n}\n.member-management-wrapper .main-content .members-table-card .members-table .table-row .table-cell[data-v-1c5f00f1] {\n  padding: 1rem;\n  vertical-align: middle;\n  border-bottom: 1px solid #e9ecef;\n}\n.member-management-wrapper .main-content .members-table-card .members-table .table-row .table-cell .member-link[data-v-1c5f00f1],\n.member-management-wrapper .main-content .members-table-card .members-table .table-row .table-cell .coach-link[data-v-1c5f00f1] {\n  color: #dc3545;\n  text-decoration: none;\n  font-weight: 500;\n}\n.member-management-wrapper .main-content .members-table-card .members-table .table-row .table-cell .member-link[data-v-1c5f00f1]:hover,\n.member-management-wrapper .main-content .members-table-card .members-table .table-row .table-cell .coach-link[data-v-1c5f00f1]:hover {\n  text-decoration: underline;\n}\n.member-management-wrapper .main-content .members-table-card .members-table .table-row .table-cell .action-icons[data-v-1c5f00f1] {\n  gap: 1rem;\n}\n.member-management-wrapper .main-content .members-table-card .members-table .table-row .table-cell .action-icons .action-icon[data-v-1c5f00f1] {\n  color: #686868;\n  font-size: 1.1rem;\n  text-decoration: none;\n  transition: color 0.2s ease;\n  margin: 0 0.25rem;\n}\n.member-management-wrapper .main-content .members-table-card .members-table .table-row .table-cell .action-icons .action-icon[data-v-1c5f00f1]:hover {\n  color: #dc3545;\n}\n.member-management-wrapper .main-content .members-table-card .members-table .table-row .table-cell .action-icons .action-icon.edit-icon[data-v-1c5f00f1]:hover {\n  color: #00bcd4;\n}\n.member-management-wrapper .main-content .members-table-card .members-table .table-row .table-cell .action-icons .action-icon.email-icon[data-v-1c5f00f1]:hover {\n  color: #4caf50;\n}\n.member-management-wrapper .main-content .members-table-card .pagination-container[data-v-1c5f00f1] {\n  padding: 1rem;\n  border-top: 1px solid #e9ecef;\n}\n.member-management-wrapper .main-content .members-table-card .pagination-container .pagination-controls .pagination-info .pagination-text[data-v-1c5f00f1] {\n  color: #686868;\n  font-size: 0.9rem;\n}\n@media (max-width: 768px) {\n.member-management-wrapper .main-content .page-header .filters-actions-row[data-v-1c5f00f1] {\n    flex-direction: column;\n    align-items: stretch;\n}\n.member-management-wrapper .main-content .page-header .filters-actions-row .filters-container[data-v-1c5f00f1] {\n    flex-direction: column;\n    align-items: stretch;\n}\n.member-management-wrapper .main-content .page-header .filters-actions-row .actions-container[data-v-1c5f00f1] {\n    width: 100%;\n    flex-direction: column;\n}\n.member-management-wrapper .main-content .page-header .filters-actions-row .actions-container .btn[data-v-1c5f00f1] {\n    width: 100%;\n}\n.member-management-wrapper .main-content .members-table-card .table-responsive[data-v-1c5f00f1] {\n    overflow-x: auto;\n}\n}\n.mail-content .mail-form .form-group[data-v-1c5f00f1] {\n  margin-bottom: 1.5rem;\n}\n.mail-content .mail-form .form-group .form-label[data-v-1c5f00f1] {\n  display: flex;\n  align-items: center;\n  font-weight: 600;\n  color: #343a40;\n  margin-bottom: 0.5rem;\n  font-size: 0.9rem;\n}\n.mail-content .mail-form .form-group .form-label i[data-v-1c5f00f1] {\n  color: #dc3545;\n  margin-right: 0.5rem;\n}\n.mail-content .mail-form .form-group .form-input[data-v-1c5f00f1],\n.mail-content .mail-form .form-group .form-textarea[data-v-1c5f00f1],\n.mail-content .mail-form .form-group .form-select[data-v-1c5f00f1] {\n  width: 100%;\n  border: 1px solid #dee2e6;\n  border-radius: 0.25rem;\n  font-size: 0.9rem;\n  transition: all 0.3s ease;\n}\n.mail-content .mail-form .form-group .form-input[data-v-1c5f00f1]:focus,\n.mail-content .mail-form .form-group .form-textarea[data-v-1c5f00f1]:focus,\n.mail-content .mail-form .form-group .form-select[data-v-1c5f00f1]:focus {\n  outline: none;\n  border-color: #dc3545;\n  box-shadow: 0 0 0 0.2rem rgba(220, 53, 69, 0.25);\n}\n.mail-content .mail-form .form-group .form-input[readonly][data-v-1c5f00f1],\n.mail-content .mail-form .form-group .form-textarea[readonly][data-v-1c5f00f1],\n.mail-content .mail-form .form-group .form-select[readonly][data-v-1c5f00f1] {\n  background-color: #f8f9fa;\n  color: #686868;\n  cursor: not-allowed;\n}\n.mail-content .mail-form .form-group .form-textarea[data-v-1c5f00f1] {\n  resize: vertical;\n  min-height: 120px;\n  font-family: inherit;\n  line-height: 1.5;\n}\n.mail-content .mail-form .form-group .form-select[data-v-1c5f00f1] {\n  cursor: pointer;\n}\n.mail-content .mail-form .form-group .form-select[data-v-1c5f00f1]:focus {\n  outline: none;\n  border-color: #dc3545;\n  box-shadow: 0 0 0 0.2rem rgba(220, 53, 69, 0.25);\n}\n.modal-footer-actions[data-v-1c5f00f1] {\n  display: flex;\n  justify-content: flex-end;\n  gap: 0.75rem;\n}\n.modal-footer-actions .btn-cancel-mail[data-v-1c5f00f1] {\n  padding: 0.5rem 1.5rem;\n  font-weight: 500;\n  border-radius: 0.25rem;\n  transition: all 0.3s ease;\n}\n.modal-footer-actions .btn-send-mail[data-v-1c5f00f1] {\n  padding: 0.5rem 1.5rem;\n  font-weight: 500;\n  border-radius: 0.25rem;\n  background-color: #dc3545;\n  border-color: #dc3545;\n  transition: all 0.3s ease;\n}\n.modal-footer-actions .btn-send-mail[data-v-1c5f00f1]:hover:not(:disabled) {\n  background-color: rgb(189.2151898734, 32.7848101266, 47.7721518987);\n  border-color: rgb(189.2151898734, 32.7848101266, 47.7721518987);\n}\n.modal-footer-actions .btn-send-mail[data-v-1c5f00f1]:disabled {\n  opacity: 0.6;\n  cursor: not-allowed;\n}\n.modal-footer-actions .btn-send-mail .spinner[data-v-1c5f00f1] {\n  display: inline-block;\n  width: 16px;\n  height: 16px;\n}", ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-12.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12.use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-12.use[3]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/Nutrition/MemberManagement.vue?vue&type=style&index=0&id=1c5f00f1&lang=scss&scoped=true":
/*!*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-12.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12.use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-12.use[3]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/Nutrition/MemberManagement.vue?vue&type=style&index=0&id=1c5f00f1&lang=scss&scoped=true ***!
  \*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../../../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_clonedRuleSet_12_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_12_use_2_node_modules_sass_loader_dist_cjs_js_clonedRuleSet_12_use_3_node_modules_vue_loader_lib_index_js_vue_loader_options_MemberManagement_vue_vue_type_style_index_0_id_1c5f00f1_lang_scss_scoped_true__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !!../../../../../../node_modules/css-loader/dist/cjs.js??clonedRuleSet-12.use[1]!../../../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12.use[2]!../../../../../../node_modules/sass-loader/dist/cjs.js??clonedRuleSet-12.use[3]!../../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./MemberManagement.vue?vue&type=style&index=0&id=1c5f00f1&lang=scss&scoped=true */ "./node_modules/css-loader/dist/cjs.js??clonedRuleSet-12.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12.use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-12.use[3]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/Nutrition/MemberManagement.vue?vue&type=style&index=0&id=1c5f00f1&lang=scss&scoped=true");

            

var options = {};

options.insert = "head";
options.singleton = false;

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_clonedRuleSet_12_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_12_use_2_node_modules_sass_loader_dist_cjs_js_clonedRuleSet_12_use_3_node_modules_vue_loader_lib_index_js_vue_loader_options_MemberManagement_vue_vue_type_style_index_0_id_1c5f00f1_lang_scss_scoped_true__WEBPACK_IMPORTED_MODULE_1__["default"], options);



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_clonedRuleSet_12_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_12_use_2_node_modules_sass_loader_dist_cjs_js_clonedRuleSet_12_use_3_node_modules_vue_loader_lib_index_js_vue_loader_options_MemberManagement_vue_vue_type_style_index_0_id_1c5f00f1_lang_scss_scoped_true__WEBPACK_IMPORTED_MODULE_1__["default"].locals || {});

/***/ }),

/***/ "./resources/src/views/app/pages/Nutrition/MemberManagement.vue":
/*!**********************************************************************!*\
  !*** ./resources/src/views/app/pages/Nutrition/MemberManagement.vue ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _MemberManagement_vue_vue_type_template_id_1c5f00f1_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./MemberManagement.vue?vue&type=template&id=1c5f00f1&scoped=true */ "./resources/src/views/app/pages/Nutrition/MemberManagement.vue?vue&type=template&id=1c5f00f1&scoped=true");
/* harmony import */ var _MemberManagement_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./MemberManagement.vue?vue&type=script&lang=js */ "./resources/src/views/app/pages/Nutrition/MemberManagement.vue?vue&type=script&lang=js");
/* harmony import */ var _MemberManagement_vue_vue_type_style_index_0_id_1c5f00f1_lang_scss_scoped_true__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./MemberManagement.vue?vue&type=style&index=0&id=1c5f00f1&lang=scss&scoped=true */ "./resources/src/views/app/pages/Nutrition/MemberManagement.vue?vue&type=style&index=0&id=1c5f00f1&lang=scss&scoped=true");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");



;


/* normalize component */

var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _MemberManagement_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__["default"],
  _MemberManagement_vue_vue_type_template_id_1c5f00f1_scoped_true__WEBPACK_IMPORTED_MODULE_0__.render,
  _MemberManagement_vue_vue_type_template_id_1c5f00f1_scoped_true__WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  "1c5f00f1",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/src/views/app/pages/Nutrition/MemberManagement.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./resources/src/views/app/pages/Nutrition/MemberManagement.vue?vue&type=script&lang=js":
/*!**********************************************************************************************!*\
  !*** ./resources/src/views/app/pages/Nutrition/MemberManagement.vue?vue&type=script&lang=js ***!
  \**********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_MemberManagement_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./MemberManagement.vue?vue&type=script&lang=js */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/Nutrition/MemberManagement.vue?vue&type=script&lang=js");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_MemberManagement_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/src/views/app/pages/Nutrition/MemberManagement.vue?vue&type=style&index=0&id=1c5f00f1&lang=scss&scoped=true":
/*!*******************************************************************************************************************************!*\
  !*** ./resources/src/views/app/pages/Nutrition/MemberManagement.vue?vue&type=style&index=0&id=1c5f00f1&lang=scss&scoped=true ***!
  \*******************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_dist_cjs_js_node_modules_css_loader_dist_cjs_js_clonedRuleSet_12_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_12_use_2_node_modules_sass_loader_dist_cjs_js_clonedRuleSet_12_use_3_node_modules_vue_loader_lib_index_js_vue_loader_options_MemberManagement_vue_vue_type_style_index_0_id_1c5f00f1_lang_scss_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/style-loader/dist/cjs.js!../../../../../../node_modules/css-loader/dist/cjs.js??clonedRuleSet-12.use[1]!../../../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12.use[2]!../../../../../../node_modules/sass-loader/dist/cjs.js??clonedRuleSet-12.use[3]!../../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./MemberManagement.vue?vue&type=style&index=0&id=1c5f00f1&lang=scss&scoped=true */ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-12.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12.use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-12.use[3]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/Nutrition/MemberManagement.vue?vue&type=style&index=0&id=1c5f00f1&lang=scss&scoped=true");


/***/ }),

/***/ "./resources/src/views/app/pages/Nutrition/MemberManagement.vue?vue&type=template&id=1c5f00f1&scoped=true":
/*!****************************************************************************************************************!*\
  !*** ./resources/src/views/app/pages/Nutrition/MemberManagement.vue?vue&type=template&id=1c5f00f1&scoped=true ***!
  \****************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_MemberManagement_vue_vue_type_template_id_1c5f00f1_scoped_true__WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   staticRenderFns: () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_MemberManagement_vue_vue_type_template_id_1c5f00f1_scoped_true__WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_MemberManagement_vue_vue_type_template_id_1c5f00f1_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./MemberManagement.vue?vue&type=template&id=1c5f00f1&scoped=true */ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/Nutrition/MemberManagement.vue?vue&type=template&id=1c5f00f1&scoped=true");


/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/Nutrition/MemberManagement.vue?vue&type=template&id=1c5f00f1&scoped=true":
/*!*******************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/Nutrition/MemberManagement.vue?vue&type=template&id=1c5f00f1&scoped=true ***!
  \*******************************************************************************************************************************************************************************************************************************************************/
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
    { staticClass: "member-management-wrapper" },
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
                          _c("i", { staticClass: "fas fa-utensils" }),
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
      _c("div", { staticClass: "main-content" }, [
        _c("div", { staticClass: "page-header" }, [
          _c("h1", { staticClass: "page-title" }, [
            _vm._v("Member Management"),
          ]),
          _vm._v(" "),
          _vm._m(1),
          _vm._v(" "),
          _c("div", { staticClass: "search-section mb-3" }, [
            _c("div", { staticClass: "search-field-container" }, [
              _c("div", { staticClass: "search-field" }, [
                !_vm.searchQuery
                  ? _c("i", { staticClass: "fas fa-search search-icon" })
                  : _c("i", {
                      staticClass: "fas fa-times search-clear",
                      attrs: { title: "Clear search" },
                      on: { click: _vm.clearSearch },
                    }),
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
                  staticClass: "search-input",
                  attrs: { type: "text", placeholder: "Search..." },
                  domProps: { value: _vm.searchQuery },
                  on: {
                    input: [
                      function ($event) {
                        if ($event.target.composing) {
                          return
                        }
                        _vm.searchQuery = $event.target.value
                      },
                      _vm.handleSearch,
                    ],
                  },
                }),
              ]),
            ]),
          ]),
          _vm._v(" "),
          _c("div", { staticClass: "filters-actions-row mb-3" }, [
            _c(
              "div",
              {
                staticClass:
                  "filters-container d-flex flex-wrap gap-2 align-items-center",
              },
              [
                _c(
                  "b-dropdown",
                  {
                    staticClass: "filter-dropdown",
                    attrs: {
                      right: "",
                      "no-caret": "",
                      text: _vm.getGenderDisplay(),
                    },
                  },
                  [
                    _c(
                      "b-dropdown-item",
                      {
                        on: {
                          click: function ($event) {
                            return _vm.setGenderFilter("")
                          },
                        },
                      },
                      [_vm._v("All Genders")]
                    ),
                    _vm._v(" "),
                    _c(
                      "b-dropdown-item",
                      {
                        on: {
                          click: function ($event) {
                            return _vm.setGenderFilter("male")
                          },
                        },
                      },
                      [_vm._v("Male")]
                    ),
                    _vm._v(" "),
                    _c(
                      "b-dropdown-item",
                      {
                        on: {
                          click: function ($event) {
                            return _vm.setGenderFilter("female")
                          },
                        },
                      },
                      [_vm._v("Female")]
                    ),
                  ],
                  1
                ),
                _vm._v(" "),
                _c(
                  "b-dropdown",
                  {
                    staticClass: "filter-dropdown",
                    attrs: {
                      right: "",
                      "no-caret": "",
                      text: _vm.getActiveStatusDisplay(),
                    },
                  },
                  [
                    _c(
                      "b-dropdown-item",
                      {
                        on: {
                          click: function ($event) {
                            return _vm.setActiveStatusFilter("")
                          },
                        },
                      },
                      [_vm._v("All")]
                    ),
                    _vm._v(" "),
                    _c(
                      "b-dropdown-item",
                      {
                        on: {
                          click: function ($event) {
                            return _vm.setActiveStatusFilter("active")
                          },
                        },
                      },
                      [_vm._v("Active")]
                    ),
                    _vm._v(" "),
                    _c(
                      "b-dropdown-item",
                      {
                        on: {
                          click: function ($event) {
                            return _vm.setActiveStatusFilter("inactive")
                          },
                        },
                      },
                      [_vm._v("Inactive")]
                    ),
                  ],
                  1
                ),
              ],
              1
            ),
          ]),
        ]),
        _vm._v(" "),
        _vm.loading
          ? _c("div", { staticClass: "loading-state text-center py-5" }, [
              _c("div", { staticClass: "spinner spinner-primary" }),
              _vm._v(" "),
              _c("p", { staticClass: "mt-2" }, [_vm._v("Loading members...")]),
            ])
          : _vm.error
          ? _c("div", { staticClass: "error-state text-center py-5" }, [
              _c("i", {
                staticClass: "fas fa-exclamation-triangle text-danger",
                staticStyle: { "font-size": "48px" },
              }),
              _vm._v(" "),
              _c("h4", { staticClass: "mt-3" }, [
                _vm._v("Error loading members"),
              ]),
              _vm._v(" "),
              _c("p", { staticClass: "text-muted" }, [
                _vm._v(_vm._s(_vm.error)),
              ]),
              _vm._v(" "),
              _c(
                "button",
                {
                  staticClass: "btn btn-primary mt-3",
                  on: { click: _vm.fetchMembers },
                },
                [_vm._v("Retry")]
              ),
            ])
          : _c("div", { staticClass: "members-table-card" }, [
              _c("div", { staticClass: "card-body p-0 p-sm-3" }, [
                _vm.members.length === 0
                  ? _c("div", { staticClass: "text-center py-5" }, [
                      _c("i", {
                        staticClass: "fas fa-users",
                        staticStyle: { "font-size": "48px", color: "#ccc" },
                      }),
                      _vm._v(" "),
                      _c("h4", { staticClass: "mt-3" }, [
                        _vm._v("No members found"),
                      ]),
                      _vm._v(" "),
                      _c("p", { staticClass: "text-muted" }, [
                        _vm.searchQuery
                          ? _c("span", [
                              _vm._v(
                                'No members match your search for "' +
                                  _vm._s(_vm.searchQuery) +
                                  '".'
                              ),
                            ])
                          : _c("span", [_vm._v("Try adjusting your filters.")]),
                      ]),
                    ])
                  : _c("div", { staticClass: "table-responsive" }, [
                      _c(
                        "table",
                        { staticClass: "table table-hover members-table" },
                        [
                          _vm._m(2),
                          _vm._v(" "),
                          _c(
                            "tbody",
                            _vm._l(_vm.members, function (member) {
                              return _c(
                                "tr",
                                { key: member.id, staticClass: "table-row" },
                                [
                                  _c(
                                    "td",
                                    { staticClass: "table-cell text-left" },
                                    [
                                      _c(
                                        "router-link",
                                        {
                                          staticClass: "member-link",
                                          attrs: {
                                            to:
                                              "/app/nutrition/members/" +
                                              member.id,
                                          },
                                        },
                                        [
                                          _vm._v(
                                            "\n                                        " +
                                              _vm._s(
                                                _vm.formatMemberName(member)
                                              ) +
                                              "\n                                    "
                                          ),
                                        ]
                                      ),
                                    ],
                                    1
                                  ),
                                  _vm._v(" "),
                                  _c(
                                    "td",
                                    { staticClass: "table-cell text-left" },
                                    [
                                      _vm._v(
                                        "\n                                    " +
                                          _vm._s(member.coach || "-") +
                                          "\n                                "
                                      ),
                                    ]
                                  ),
                                  _vm._v(" "),
                                  _c(
                                    "td",
                                    { staticClass: "table-cell text-left" },
                                    [
                                      _vm._v(
                                        "\n                                    " +
                                          _vm._s(
                                            member.mobile_phone ||
                                              member.phone ||
                                              "-"
                                          ) +
                                          "\n                                "
                                      ),
                                    ]
                                  ),
                                  _vm._v(" "),
                                  _c(
                                    "td",
                                    { staticClass: "table-cell text-left" },
                                    [
                                      _vm._v(
                                        "\n                                    " +
                                          _vm._s(member.start_weight || "-") +
                                          "\n                                "
                                      ),
                                    ]
                                  ),
                                  _vm._v(" "),
                                  _c(
                                    "td",
                                    { staticClass: "table-cell text-left" },
                                    [
                                      _vm._v(
                                        "\n                                    " +
                                          _vm._s(
                                            member.gender
                                              ? member.gender
                                                  .charAt(0)
                                                  .toUpperCase() +
                                                  member.gender.slice(1)
                                              : "-"
                                          ) +
                                          "\n                                "
                                      ),
                                    ]
                                  ),
                                  _vm._v(" "),
                                  _c(
                                    "td",
                                    { staticClass: "table-cell text-center" },
                                    [
                                      member.status === "active" ||
                                      member.Statuses === "active"
                                        ? _c("i", {
                                            staticClass:
                                              "fas fa-check text-success",
                                          })
                                        : _c("i", {
                                            staticClass:
                                              "fas fa-times text-danger",
                                          }),
                                    ]
                                  ),
                                  _vm._v(" "),
                                  _c(
                                    "td",
                                    { staticClass: "table-cell text-left" },
                                    [
                                      _vm._v(
                                        "\n                                    " +
                                          _vm._s(
                                            _vm.formatDate(member.created_at)
                                          ) +
                                          "\n                                "
                                      ),
                                    ]
                                  ),
                                  _vm._v(" "),
                                  _c(
                                    "td",
                                    {
                                      staticClass: "table-cell text-center",
                                      on: {
                                        click: function ($event) {
                                          $event.stopPropagation()
                                        },
                                      },
                                    },
                                    [
                                      _c(
                                        "div",
                                        {
                                          staticClass:
                                            "action-icons d-flex justify-content-center gap-3",
                                        },
                                        [
                                          _c(
                                            "router-link",
                                            {
                                              staticClass:
                                                "action-icon edit-icon",
                                              attrs: {
                                                to:
                                                  "/app/nutrition/members/" +
                                                  member.id,
                                                title: "Edit",
                                              },
                                            },
                                            [
                                              _c("i", {
                                                staticClass: "fas fa-edit",
                                              }),
                                            ]
                                          ),
                                          _vm._v(" "),
                                          _c(
                                            "a",
                                            {
                                              staticClass:
                                                "action-icon email-icon",
                                              attrs: {
                                                href: "#",
                                                title: "Email",
                                              },
                                              on: {
                                                click: function ($event) {
                                                  $event.preventDefault()
                                                  return _vm.emailMember(member)
                                                },
                                              },
                                            },
                                            [
                                              _c("i", {
                                                staticClass: "fas fa-envelope",
                                              }),
                                            ]
                                          ),
                                        ],
                                        1
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
                _vm._v(" "),
                _vm.members.length > 0 && _vm.totalPages > 1
                  ? _c("div", { staticClass: "pagination-container mt-3" }, [
                      _c(
                        "div",
                        {
                          staticClass:
                            "pagination-controls d-flex justify-content-between align-items-center",
                        },
                        [
                          _c("div", { staticClass: "pagination-info" }, [
                            _c("span", { staticClass: "pagination-text" }, [
                              _vm._v(
                                "\n                                Page " +
                                  _vm._s(_vm.currentPage) +
                                  " of " +
                                  _vm._s(_vm.totalPages) +
                                  "\n                            "
                              ),
                            ]),
                          ]),
                          _vm._v(" "),
                          _c(
                            "div",
                            { staticClass: "pagination-buttons d-flex gap-2" },
                            [
                              _c(
                                "button",
                                {
                                  staticClass:
                                    "btn btn-sm btn-outline-secondary",
                                  attrs: { disabled: _vm.currentPage === 1 },
                                  on: {
                                    click: function ($event) {
                                      return _vm.goToPage(_vm.currentPage - 1)
                                    },
                                  },
                                },
                                [
                                  _c("i", {
                                    staticClass: "fas fa-chevron-left",
                                  }),
                                  _vm._v(
                                    "\n                                Previous\n                            "
                                  ),
                                ]
                              ),
                              _vm._v(" "),
                              _c(
                                "button",
                                {
                                  staticClass:
                                    "btn btn-sm btn-outline-secondary",
                                  attrs: {
                                    disabled: _vm.currentPage >= _vm.totalPages,
                                  },
                                  on: {
                                    click: function ($event) {
                                      return _vm.goToPage(_vm.currentPage + 1)
                                    },
                                  },
                                },
                                [
                                  _vm._v(
                                    "\n                                Next\n                                "
                                  ),
                                  _c("i", {
                                    staticClass: "fas fa-chevron-right",
                                  }),
                                ]
                              ),
                            ]
                          ),
                        ]
                      ),
                    ])
                  : _vm._e(),
              ]),
            ]),
      ]),
      _vm._v(" "),
      _c(
        "b-modal",
        {
          attrs: {
            id: "mailModal",
            title: "Send Email",
            size: "lg",
            centered: "",
            scrollable: "",
          },
          on: { hidden: _vm.resetMailForm },
          scopedSlots: _vm._u([
            {
              key: "modal-footer",
              fn: function () {
                return [
                  _c(
                    "div",
                    { staticClass: "modal-footer-actions" },
                    [
                      _c(
                        "b-button",
                        {
                          staticClass: "btn-cancel-mail",
                          attrs: { variant: "secondary" },
                          on: {
                            click: function ($event) {
                              return _vm.$bvModal.hide("mailModal")
                            },
                          },
                        },
                        [
                          _vm._v(
                            "\n                    Cancel\n                "
                          ),
                        ]
                      ),
                      _vm._v(" "),
                      _c(
                        "b-button",
                        {
                          staticClass: "btn-send-mail",
                          attrs: {
                            variant: "primary",
                            disabled: _vm.mailForm.sending,
                          },
                          on: { click: _vm.sendEmail },
                        },
                        [
                          !_vm.mailForm.sending
                            ? _c("i", { staticClass: "fas fa-envelope mr-2" })
                            : _vm._e(),
                          _vm._v(" "),
                          _vm.mailForm.sending
                            ? _c("div", {
                                staticClass: "spinner spinner-sm mr-2",
                              })
                            : _vm._e(),
                          _vm._v(
                            "\n                    " +
                              _vm._s(
                                _vm.mailForm.sending
                                  ? "Sending..."
                                  : "Send Email"
                              ) +
                              "\n                "
                          ),
                        ]
                      ),
                    ],
                    1
                  ),
                ]
              },
              proxy: true,
            },
          ]),
        },
        [
          _c("div", { staticClass: "mail-content" }, [
            _c("div", { staticClass: "mail-form" }, [
              _c(
                "div",
                { staticClass: "form-group" },
                [
                  _c("label", { staticClass: "form-label" }, [
                    _c("i", { staticClass: "fas fa-envelope mr-1" }),
                    _vm._v(
                      "\n                        To\n                    "
                    ),
                  ]),
                  _vm._v(" "),
                  _c("b-form-input", {
                    staticClass: "form-input",
                    attrs: {
                      type: "email",
                      placeholder: "Enter recipient email",
                      readonly: "",
                    },
                    model: {
                      value: _vm.mailForm.to,
                      callback: function ($$v) {
                        _vm.$set(_vm.mailForm, "to", $$v)
                      },
                      expression: "mailForm.to",
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
                    _c("i", { staticClass: "fas fa-user mr-1" }),
                    _vm._v(
                      "\n                        Recipient Name\n                    "
                    ),
                  ]),
                  _vm._v(" "),
                  _c("b-form-input", {
                    staticClass: "form-input",
                    attrs: {
                      type: "text",
                      placeholder: "Recipient name",
                      readonly: "",
                    },
                    model: {
                      value: _vm.mailForm.recipientName,
                      callback: function ($$v) {
                        _vm.$set(_vm.mailForm, "recipientName", $$v)
                      },
                      expression: "mailForm.recipientName",
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
                    _c("i", { staticClass: "fas fa-heading mr-1" }),
                    _vm._v(
                      "\n                        Subject\n                    "
                    ),
                  ]),
                  _vm._v(" "),
                  _c("b-form-input", {
                    staticClass: "form-input",
                    attrs: { type: "text", placeholder: "Enter email subject" },
                    model: {
                      value: _vm.mailForm.subject,
                      callback: function ($$v) {
                        _vm.$set(_vm.mailForm, "subject", $$v)
                      },
                      expression: "mailForm.subject",
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
                    _c("i", { staticClass: "fas fa-file-alt mr-1" }),
                    _vm._v(
                      "\n                        Message\n                    "
                    ),
                  ]),
                  _vm._v(" "),
                  _c("b-form-textarea", {
                    staticClass: "form-textarea",
                    attrs: {
                      placeholder: "Enter your message here...",
                      rows: "8",
                    },
                    model: {
                      value: _vm.mailForm.message,
                      callback: function ($$v) {
                        _vm.$set(_vm.mailForm, "message", $$v)
                      },
                      expression: "mailForm.message",
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
                    _c("i", { staticClass: "fas fa-file-alt mr-1" }),
                    _vm._v(
                      "\n                        Template\n                    "
                    ),
                  ]),
                  _vm._v(" "),
                  _c("b-form-select", {
                    staticClass: "form-select",
                    attrs: { options: _vm.emailTemplates },
                    on: { change: _vm.applyTemplate },
                    scopedSlots: _vm._u([
                      {
                        key: "first",
                        fn: function () {
                          return [
                            _c(
                              "b-form-select-option",
                              { attrs: { value: null } },
                              [_vm._v("Select a template (optional)")]
                            ),
                          ]
                        },
                        proxy: true,
                      },
                    ]),
                    model: {
                      value: _vm.mailForm.template,
                      callback: function ($$v) {
                        _vm.$set(_vm.mailForm, "template", $$v)
                      },
                      expression: "mailForm.template",
                    },
                  }),
                ],
                1
              ),
            ]),
          ]),
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
        _c("i", { staticClass: "fas fa-users" }),
        _vm._v(
          "\n                            Members\n                        "
        ),
      ]
    )
  },
  function () {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "instructions-section mb-4" }, [
      _c("h3", { staticClass: "instructions-title" }, [
        _vm._v("Member Management Instructions"),
      ]),
      _vm._v(" "),
      _c("p", { staticClass: "instructions-text" }, [
        _vm._v(
          "\n                    View and manage all members here. Use filters or email members as needed.\n                "
        ),
      ]),
    ])
  },
  function () {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("thead", [
      _c("tr", [
        _c("th", { staticClass: "table-header text-left" }, [_vm._v("Member")]),
        _vm._v(" "),
        _c("th", { staticClass: "table-header text-left" }, [_vm._v("Coach")]),
        _vm._v(" "),
        _c("th", { staticClass: "table-header text-left" }, [
          _vm._v("Cellphone"),
        ]),
        _vm._v(" "),
        _c("th", { staticClass: "table-header text-left" }, [
          _vm._v("Start Weight"),
        ]),
        _vm._v(" "),
        _c("th", { staticClass: "table-header text-left" }, [_vm._v("Gender")]),
        _vm._v(" "),
        _c("th", { staticClass: "table-header text-center" }, [
          _vm._v("Active"),
        ]),
        _vm._v(" "),
        _c("th", { staticClass: "table-header text-left" }, [
          _vm._v("Member Since"),
        ]),
        _vm._v(" "),
        _c("th", { staticClass: "table-header text-center" }, [
          _vm._v("Actions"),
        ]),
      ]),
    ])
  },
]
render._withStripped = true



/***/ })

}]);