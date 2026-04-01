"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["resources_src_views_app_pages_profile_vue"],{

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/profile.vue?vue&type=script&lang=js":
/*!*******************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/profile.vue?vue&type=script&lang=js ***!
  \*******************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var nprogress__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! nprogress */ "./node_modules/nprogress/nprogress.js");
/* harmony import */ var nprogress__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(nprogress__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var vuex__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! vuex */ "./node_modules/vuex/dist/vuex.esm.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! axios */ "./node_modules/axios/index.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_1__);
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
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
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
  metaInfo: {
    title: "Profile"
  },
  data: function data() {
    return {
      data: new FormData(),
      avatar: "",
      username: "",
      isLoading: true,
      user: {
        id: "",
        firstname: "",
        lastname: "",
        username: "",
        newPassword: null,
        email: "",
        phone: "",
        avatar: ""
      }
    };
  },
  computed: _objectSpread({}, (0,vuex__WEBPACK_IMPORTED_MODULE_2__.mapGetters)(["currentUser"])),
  methods: {
    Submit_Update: function Submit_Update() {
      var _this = this;
      this.$refs.Update_Profile.validate().then(function (success) {
        if (!success) {
          _this.makeToast("danger", _this.Please_fill_the_form_correctly, _this.Failed);
        } else {
          _this.Update_Profile();
        }
      });
    },
    makeToast: function makeToast(variant, msg, title) {
      this.$root.$bvToast.toast(msg, {
        title: title,
        variant: variant,
        solid: true
      });
    },
    Get_Profile_Info: function Get_Profile_Info() {
      var _this2 = this;
      axios__WEBPACK_IMPORTED_MODULE_1___default().get("Get_user_profile").then(function (response) {
        _this2.user = response.data.user;
        _this2.avatar = response.data.user.avatar || "no_avatar.png";
        _this2.username = response.data.user.username;
        _this2.isLoading = false;
      })["catch"](function (error) {
        _this2.isLoading = false;
        console.error("Get profile info error:", error);
      });
    },
    onFileSelected: function onFileSelected(e) {
      var _this3 = this;
      return _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
        var file;
        return _regeneratorRuntime().wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              file = e.target.files[0];
              _this3.user.avatar = file instanceof File ? file : "";
            case 2:
            case "end":
              return _context.stop();
          }
        }, _callee);
      }))();
    },
    Update_Profile: function Update_Profile() {
      var _this4 = this;
      if (!this.user.id) {
        this.makeToast("danger", "Invalid user ID", "Error");
        return;
      }
      nprogress__WEBPACK_IMPORTED_MODULE_0___default().start();
      nprogress__WEBPACK_IMPORTED_MODULE_0___default().set(0.1);
      this.data = new FormData();
      this.data.append("firstname", this.user.firstname);
      this.data.append("lastname", this.user.lastname);
      this.data.append("username", this.user.username);
      this.data.append("email", this.user.email);
      this.data.append("NewPassword", this.user.newPassword);
      this.data.append("phone", this.user.phone);
      if (this.user.avatar instanceof File) {
        this.data.append("avatar", this.user.avatar);
      }
      this.data.append("_method", "put");
      axios__WEBPACK_IMPORTED_MODULE_1___default().put("update_user_profile/" + this.user.id, this.data, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      }).then(function (response) {
        _this4.makeToast("success", _this4.TitleProfile, _this4.Success); // ✅ Fixed key
        nprogress__WEBPACK_IMPORTED_MODULE_0___default().done();
        if (response.data.avatar) {
          _this4.avatar = response.data.avatar;
        }
        setTimeout(function () {
          _this4.Get_Profile_Info();
        }, 500);
      })["catch"](function (error) {
        nprogress__WEBPACK_IMPORTED_MODULE_0___default().done();
        console.error("Update profile error:", error);
        _this4.makeToast("danger", "Failed to update profile", "Error");
      });
    }
  },
  created: function created() {
    this.Get_Profile_Info();
  }
});

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js??clonedRuleSet-12.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12.use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-12.use[3]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/profile.vue?vue&type=style&index=0&id=04411848&lang=scss":
/*!**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??clonedRuleSet-12.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12.use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-12.use[3]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/profile.vue?vue&type=style&index=0&id=04411848&lang=scss ***!
  \**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__);
// Imports

var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default()(function(i){return i[1]});
// Module
___CSS_LOADER_EXPORT___.push([module.id, "@charset \"UTF-8\";\n.filter-btn .btn,\n.filter-btn .btn-secondary,\n.filter-btn .btn-outline-secondary,\n.filter-btn button.btn,\n.filter-btn button.btn-secondary {\n  color: #000 !important;\n  background-color: transparent !important;\n  border-color: #6c757d !important;\n}\n.filter-btn .btn:hover,\n.filter-btn .btn-secondary:hover,\n.filter-btn .btn-outline-secondary:hover,\n.filter-btn button.btn:hover,\n.filter-btn button.btn-secondary:hover {\n  color: #dc3545 !important;\n  background-color: transparent !important;\n  border-color: #dc3545 !important;\n  box-shadow: none !important;\n}\n.filter-btn .btn:focus,\n.filter-btn .btn-secondary:focus,\n.filter-btn .btn-outline-secondary:focus,\n.filter-btn button.btn:focus,\n.filter-btn button.btn-secondary:focus {\n  color: #dc3545 !important;\n  background-color: transparent !important;\n  border-color: #dc3545 !important;\n  box-shadow: none !important;\n}\n.filter-btn .btn:active,\n.filter-btn .btn-secondary:active,\n.filter-btn .btn-outline-secondary:active,\n.filter-btn button.btn:active,\n.filter-btn button.btn-secondary:active {\n  color: #dc3545 !important;\n  background-color: transparent !important;\n  border-color: #dc3545 !important;\n}\n.btn-secondary:not(:disabled):not(.disabled):active:focus {\n  box-shadow: none !important;\n}\n\n/* ===========================================\n   COMMON BREADCRUMB NAVIGATION STYLES\n   =========================================== */\n.breadcrumb-nav-row {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  margin-bottom: 0.5rem;\n  gap: 0.5rem;\n}\n.breadcrumb-section {\n  flex: 1;\n}\n.breadcrumb-section .breadcrumb-nav .breadcrumb-container {\n  display: flex;\n  align-items: center;\n  gap: 1rem;\n}\n.breadcrumb-section .breadcrumb-nav .breadcrumb-container .back-button {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  width: 40px;\n  height: 40px;\n  background: rgba(255, 255, 255, 0.1);\n  border: 1px solid rgba(255, 255, 255, 0.2);\n  border-radius: 8px;\n  color: #ffffff;\n  cursor: pointer;\n  transition: all 0.3s ease;\n}\n.breadcrumb-section .breadcrumb-nav .breadcrumb-container .back-button:hover {\n  background: rgba(255, 255, 255, 0.15);\n  border-color: rgba(255, 255, 255, 0.3);\n  transform: translateY(-1px);\n  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);\n  color: #dc3545;\n}\n.breadcrumb-section .breadcrumb-nav .breadcrumb-container .back-button i {\n  font-size: 1.1em;\n}\n.breadcrumb-section .breadcrumb-nav .breadcrumb-container .breadcrumb {\n  display: flex;\n  align-items: center;\n  gap: 0.5rem;\n  margin: 0;\n  padding: 0;\n  background: none;\n  border-radius: 0;\n}\n.breadcrumb-section .breadcrumb-nav .breadcrumb-container .breadcrumb .breadcrumb-item {\n  display: flex;\n  align-items: center;\n  gap: 0.5rem;\n  font-size: 0.875rem;\n  color: #ffffff;\n}\n.breadcrumb-section .breadcrumb-nav .breadcrumb-container .breadcrumb .breadcrumb-item.active {\n  color: #252525;\n  font-weight: 600;\n}\n.breadcrumb-section .breadcrumb-nav .breadcrumb-container .breadcrumb .breadcrumb-item.active i {\n  color: #dc3545;\n}\n.breadcrumb-section .breadcrumb-nav .breadcrumb-container .breadcrumb .breadcrumb-item a {\n  display: flex;\n  align-items: center;\n  gap: 0.5rem;\n  color: #6a6a6a;\n  text-decoration: none;\n  transition: color 0.3s ease;\n}\n.breadcrumb-section .breadcrumb-nav .breadcrumb-container .breadcrumb .breadcrumb-item a:hover {\n  color: #dc3545;\n}\n.breadcrumb-section .breadcrumb-nav .breadcrumb-container .breadcrumb .breadcrumb-item a:hover i {\n  color: #dc3545;\n}\n.breadcrumb-section .breadcrumb-nav .breadcrumb-container .breadcrumb .breadcrumb-item a i {\n  font-size: 0.9em;\n  transition: color 0.3s ease;\n}\n.breadcrumb-section .breadcrumb-nav .breadcrumb-container .breadcrumb .breadcrumb-item:not(:last-child)::after {\n  content: \"›\";\n  margin-left: 0.5rem;\n  color: #6a6a6a;\n  font-size: 1.2em;\n}\n.action-section {\n  display: flex;\n  align-items: center;\n}\n.action-section .action-btn {\n  display: flex;\n  align-items: center;\n  gap: 0.5rem;\n  padding: 0.5rem 1rem;\n  border-radius: 8px;\n  font-size: 0.875rem;\n  font-weight: 500;\n  transition: all 0.3s ease;\n}\n.action-section .action-btn:hover:not(:disabled) {\n  transform: translateY(-1px);\n  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);\n}\n.action-section .action-btn:disabled {\n  opacity: 0.6;\n  cursor: not-allowed;\n}\n.action-section .action-btn i {\n  font-size: 0.9em;\n}\n@media (max-width: 768px) {\n.breadcrumb-nav-row {\n    flex-direction: column;\n    align-items: flex-start;\n    gap: 0.5rem;\n}\n.breadcrumb-section {\n    width: 100%;\n}\n.breadcrumb-section .breadcrumb-container {\n    flex-direction: column;\n    align-items: flex-start;\n    gap: 0.5rem;\n}\n.breadcrumb-section .breadcrumb-container .breadcrumb {\n    flex-wrap: wrap;\n}\n.breadcrumb-section .breadcrumb-container .breadcrumb .breadcrumb-item {\n    font-size: 0.8rem;\n}\n.breadcrumb-section .breadcrumb-container .breadcrumb .breadcrumb-item a {\n    font-size: 0.8rem;\n}\n.action-section {\n    width: 100%;\n    justify-content: flex-end;\n}\n.action-section .action-btn {\n    font-size: 0.8rem;\n    padding: 0.4rem 0.8rem;\n}\n}\n/* ===========================================\n   RESPONSIVE UTILITY CLASSES (ALL DEVICES)\n   =========================================== */\n.show-xs-only,\n.show-sm-only,\n.show-md-only,\n.show-lg-only,\n.show-xl-only {\n  display: none !important;\n}\n@media (max-width: 575px) {\n.hide-xs {\n    display: none !important;\n}\n.show-xs-only {\n    display: initial !important;\n}\n}\n@media (min-width: 576px) and (max-width: 767px) {\n.hide-sm {\n    display: none !important;\n}\n.show-sm-only {\n    display: initial !important;\n}\n}\n@media (min-width: 768px) and (max-width: 991px) {\n.hide-md {\n    display: none !important;\n}\n.show-md-only {\n    display: initial !important;\n}\n}\n@media (min-width: 992px) and (max-width: 1199px) {\n.hide-lg {\n    display: none !important;\n}\n.show-lg-only {\n    display: initial !important;\n}\n}\n@media (min-width: 1200px) {\n.hide-xl {\n    display: none !important;\n}\n.show-xl-only {\n    display: initial !important;\n}\n}\n@media (max-width: 576px) {\n.hide-sm-down {\n    display: none !important;\n}\n}\n@media (max-width: 768px) {\n.hide-md-down {\n    display: none !important;\n}\n}\n@media (max-width: 992px) {\n.hide-lg-down {\n    display: none !important;\n}\n}\n@media (min-width: 576px) {\n.hide-sm-up {\n    display: none !important;\n}\n}\n@media (min-width: 768px) {\n.hide-md-up {\n    display: none !important;\n}\n}\n@media (min-width: 992px) {\n.hide-lg-up {\n    display: none !important;\n}\n}\n@media (max-width: 575px) {\n.d-xs-none {\n    display: none !important;\n}\n.d-xs-block {\n    display: block !important;\n}\n.d-xs-flex {\n    display: flex !important;\n}\n}\n@media (min-width: 576px) and (max-width: 767px) {\n.d-sm-none {\n    display: none !important;\n}\n.d-sm-block {\n    display: block !important;\n}\n.d-sm-flex {\n    display: flex !important;\n}\n}\n@media (min-width: 768px) and (max-width: 991px) {\n.d-md-none {\n    display: none !important;\n}\n.d-md-block {\n    display: block !important;\n}\n.d-md-flex {\n    display: flex !important;\n}\n}\n@media (min-width: 992px) and (max-width: 1199px) {\n.d-lg-none {\n    display: none !important;\n}\n.d-lg-block {\n    display: block !important;\n}\n.d-lg-flex {\n    display: flex !important;\n}\n}\n@media (min-width: 1200px) {\n.d-xl-none {\n    display: none !important;\n}\n.d-xl-block {\n    display: block !important;\n}\n.d-xl-flex {\n    display: flex !important;\n}\n}\n@media (min-width: 576px) {\n.custom-modal-xl {\n    max-width: 1500px !important;\n}\n}\n.member-form-container {\n  min-height: 100vh;\n  background: linear-gradient(135deg, #f5f5f3 0%, #f5f5f3 100%);\n  padding: 20px 0;\n}\n.form-card {\n  background: #ffffff;\n  border-radius: 20px;\n  box-shadow: 0 20px 60px rgba(79, 112, 92, 0.15);\n  overflow: hidden;\n  max-width: 1000px;\n  margin: 0 auto;\n}\n.form-header {\n  background: linear-gradient(to bottom, #23415a, #0f1c29);\n  color: #ffffff;\n  text-align: center;\n  padding: 30px 0px;\n  position: relative;\n}\n.form-header::before {\n  content: \"\";\n  position: absolute;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  background: url('data:image/svg+xml,<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 100 100\"><defs><pattern id=\"grain\" width=\"100\" height=\"100\" patternUnits=\"userSpaceOnUse\"><circle cx=\"25\" cy=\"25\" r=\"1\" fill=\"white\" opacity=\"0.1\"/><circle cx=\"75\" cy=\"75\" r=\"1\" fill=\"white\" opacity=\"0.1\"/><circle cx=\"50\" cy=\"10\" r=\"0.5\" fill=\"white\" opacity=\"0.1\"/><circle cx=\"10\" cy=\"60\" r=\"0.5\" fill=\"white\" opacity=\"0.1\"/><circle cx=\"90\" cy=\"40\" r=\"0.5\" fill=\"white\" opacity=\"0.1\"/></pattern></defs><rect width=\"100\" height=\"100\" fill=\"url(%23grain)\"/></svg>');\n  opacity: 0.3;\n}\n.header-icon {\n  width: 85px;\n  height: 80px;\n  background: rgba(255, 255, 255, 0.2);\n  border-radius: 50%;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  margin: 0 auto 10px;\n  font-size: 28px;\n}\n.form-title {\n  font-size: 2rem;\n  font-weight: 700;\n}\n.form-subtitle {\n  font-size: 1.1rem;\n  opacity: 0.9;\n  margin: 0;\n}\n.member-form {\n  padding: 30px;\n}\n.form-section {\n  margin-bottom: 40px;\n  background: #ffffff;\n  border-radius: 15px;\n  padding: 25px;\n  border: 1px solid #dcdcdc;\n  transition: all 0.3s ease;\n  animation: fadeInUp 0.6s ease forwards;\n  opacity: 0;\n  transform: translateY(20px);\n}\n.form-section:hover {\n  transform: translateY(-2px);\n  box-shadow: 0 10px 30px rgba(79, 112, 92, 0.1);\n  border-color: #dc3545;\n}\n.form-section:nth-child(1) {\n  animation-delay: 0.1s;\n}\n.form-section:nth-child(2) {\n  animation-delay: 0.2s;\n}\n.form-section:nth-child(3) {\n  animation-delay: 0.3s;\n}\n.section-header {\n  display: flex;\n  align-items: center;\n  margin-bottom: 25px;\n  padding-bottom: 15px;\n  border-bottom: 2px solid #dcdcdc;\n}\n.section-icon {\n  width: 50px;\n  height: 50px;\n  background: #dc3545;\n  border-radius: 12px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  color: white;\n  font-size: 20px;\n  margin-right: 15px;\n  box-shadow: 0 4px 15px rgba(79, 112, 92, 0.3);\n}\n.section-title {\n  font-size: 1.3rem;\n  font-weight: 600;\n  color: #252525;\n  margin: 0;\n}\n.form-group {\n  position: relative;\n  margin-bottom: 20px;\n}\n.form-label {\n  font-weight: 700;\n  color: #252525;\n  margin-bottom: 8px;\n  display: block;\n  font-size: 0.95rem;\n}\n.form-control {\n  width: 100%;\n  border: 1px solid #dcdcdc;\n  border-radius: 8px;\n  font-size: 13px;\n  transition: all 0.3s ease;\n  background: #dededc;\n  color: #252525;\n}\n.form-control:focus {\n  outline: none;\n  border-color: #dc3545;\n  box-shadow: 0 0 0 3px rgba(79, 112, 92, 0.1);\n  transform: translateY(-1px);\n}\n.form-control::-moz-placeholder {\n  color: #6a6a6a;\n}\n.form-control::placeholder {\n  color: #6a6a6a;\n}\n.form-control.is-invalid {\n  border-color: #dc3545;\n}\n.invalid-feedback {\n  display: block;\n  width: 100%;\n  margin-top: 0.25rem;\n  font-size: 0.875rem;\n  color: #dc3545;\n}\n.input-icon {\n  position: absolute;\n  right: 12px;\n  top: 70%;\n  transform: translateY(-50%);\n  color: #252525;\n  font-size: 15px;\n  pointer-events: none;\n}\n.form-control:focus + .input-icon {\n  color: #dc3545;\n}\n.profile-picture-section {\n  padding: 30px;\n  text-align: center;\n  background: #ffffff;\n  border-radius: 15px;\n  margin-bottom: 30px;\n  border: 1px solid #dcdcdc;\n}\n.profile-picture-content {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n}\n.profile-picture-container {\n  text-align: center;\n}\n.current-avatar {\n  position: relative;\n  display: inline-block;\n}\n.avatar-image {\n  width: 120px;\n  height: 120px;\n  border-radius: 50%;\n  -o-object-fit: scale-down;\n     object-fit: scale-down;\n  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);\n}\n.avatar-overlay {\n  position: absolute;\n  bottom: -40px;\n  left: 50%;\n  transform: translateX(-50%);\n  background: #dc3545;\n  padding: 5px 15px;\n  border-radius: 20px;\n  font-weight: 600;\n  white-space: nowrap;\n}\n.file-upload-container {\n  position: relative;\n}\n.update-section {\n  text-align: center;\n  margin-top: 40px;\n  padding-top: 30px;\n  border-top: 2px solid #dcdcdc;\n}\n.update-btn {\n  background: linear-gradient(135deg, #dc3545 0%, rgb(189.2151898734, 32.7848101266, 47.7721518987) 100%);\n  color: #ffffff;\n  border: none;\n  padding: 18px 50px;\n  border-radius: 50px;\n  font-size: 1.1rem;\n  font-weight: 700;\n  cursor: pointer;\n  transition: all 0.3s ease;\n  box-shadow: 0 8px 25px rgba(255, 64, 64, 0.3);\n  display: inline-flex;\n  align-items: center;\n  gap: 12px;\n  text-transform: uppercase;\n  letter-spacing: 0.5px;\n  position: relative;\n  overflow: hidden;\n}\n.update-btn::before {\n  content: \"\";\n  position: absolute;\n  top: 0;\n  left: -100%;\n  width: 100%;\n  height: 100%;\n  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);\n  transition: left 0.5s;\n}\n.update-btn:hover {\n  transform: translateY(-3px);\n  box-shadow: 0 12px 35px rgba(255, 64, 64, 0.4);\n  background: linear-gradient(135deg, rgb(210.9493670886, 36.5506329114, 53.2594936709) 0%, rgb(167.4810126582, 29.0189873418, 42.2848101266) 100%);\n}\n.update-btn:hover::before {\n  left: 100%;\n}\n.update-btn:active {\n  transform: translateY(-1px);\n  box-shadow: 0 6px 20px rgba(255, 64, 64, 0.3);\n}\n.update-btn:focus {\n  outline: none;\n  box-shadow: 0 0 0 3px rgba(255, 64, 64, 0.2), 0 8px 25px rgba(255, 64, 64, 0.3);\n}\n.update-icon {\n  font-size: 1.2rem;\n  animation: pulse 2s infinite;\n}\n.update-text {\n  font-weight: 700;\n  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);\n}\n@keyframes pulse {\n0% {\n    transform: scale(1);\n}\n50% {\n    transform: scale(1.1);\n}\n100% {\n    transform: scale(1);\n}\n}\n@keyframes fadeInUp {\nto {\n    opacity: 1;\n    transform: translateY(0);\n}\n}\n/* Responsive Design */\n@media (max-width: 768px) {\n.member-form {\n    padding: 20px;\n}\n.form-header {\n    padding: 30px 20px;\n}\n.form-title {\n    font-size: 1.8rem;\n}\n.header-icon {\n    width: 60px;\n    height: 60px;\n    font-size: 24px;\n}\n.section-icon {\n    width: 40px;\n    height: 40px;\n    font-size: 16px;\n}\n.form-section {\n    padding: 20px;\n}\n.avatar-image {\n    width: 100px;\n    height: 100px;\n}\n}\n/* Custom scrollbar */\n.member-form-container::-webkit-scrollbar {\n  width: 8px;\n}\n.member-form-container::-webkit-scrollbar-track {\n  background: #f5f5f3;\n}\n.member-form-container::-webkit-scrollbar-thumb {\n  background: #dc3545;\n  border-radius: 4px;\n}\n.member-form-container::-webkit-scrollbar-thumb:hover {\n  background: #dc3545;\n}", ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-12.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12.use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-12.use[3]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/profile.vue?vue&type=style&index=0&id=04411848&lang=scss":
/*!**************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-12.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12.use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-12.use[3]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/profile.vue?vue&type=style&index=0&id=04411848&lang=scss ***!
  \**************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_clonedRuleSet_12_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_12_use_2_node_modules_sass_loader_dist_cjs_js_clonedRuleSet_12_use_3_node_modules_vue_loader_lib_index_js_vue_loader_options_profile_vue_vue_type_style_index_0_id_04411848_lang_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !!../../../../../node_modules/css-loader/dist/cjs.js??clonedRuleSet-12.use[1]!../../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12.use[2]!../../../../../node_modules/sass-loader/dist/cjs.js??clonedRuleSet-12.use[3]!../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./profile.vue?vue&type=style&index=0&id=04411848&lang=scss */ "./node_modules/css-loader/dist/cjs.js??clonedRuleSet-12.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12.use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-12.use[3]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/profile.vue?vue&type=style&index=0&id=04411848&lang=scss");

            

var options = {};

options.insert = "head";
options.singleton = false;

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_clonedRuleSet_12_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_12_use_2_node_modules_sass_loader_dist_cjs_js_clonedRuleSet_12_use_3_node_modules_vue_loader_lib_index_js_vue_loader_options_profile_vue_vue_type_style_index_0_id_04411848_lang_scss__WEBPACK_IMPORTED_MODULE_1__["default"], options);



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_clonedRuleSet_12_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_12_use_2_node_modules_sass_loader_dist_cjs_js_clonedRuleSet_12_use_3_node_modules_vue_loader_lib_index_js_vue_loader_options_profile_vue_vue_type_style_index_0_id_04411848_lang_scss__WEBPACK_IMPORTED_MODULE_1__["default"].locals || {});

/***/ }),

/***/ "./resources/src/views/app/pages/profile.vue":
/*!***************************************************!*\
  !*** ./resources/src/views/app/pages/profile.vue ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _profile_vue_vue_type_template_id_04411848__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./profile.vue?vue&type=template&id=04411848 */ "./resources/src/views/app/pages/profile.vue?vue&type=template&id=04411848");
/* harmony import */ var _profile_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./profile.vue?vue&type=script&lang=js */ "./resources/src/views/app/pages/profile.vue?vue&type=script&lang=js");
/* harmony import */ var _profile_vue_vue_type_style_index_0_id_04411848_lang_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./profile.vue?vue&type=style&index=0&id=04411848&lang=scss */ "./resources/src/views/app/pages/profile.vue?vue&type=style&index=0&id=04411848&lang=scss");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");



;


/* normalize component */

var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _profile_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__["default"],
  _profile_vue_vue_type_template_id_04411848__WEBPACK_IMPORTED_MODULE_0__.render,
  _profile_vue_vue_type_template_id_04411848__WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/src/views/app/pages/profile.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./resources/src/views/app/pages/profile.vue?vue&type=script&lang=js":
/*!***************************************************************************!*\
  !*** ./resources/src/views/app/pages/profile.vue?vue&type=script&lang=js ***!
  \***************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_profile_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./profile.vue?vue&type=script&lang=js */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/profile.vue?vue&type=script&lang=js");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_profile_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/src/views/app/pages/profile.vue?vue&type=style&index=0&id=04411848&lang=scss":
/*!************************************************************************************************!*\
  !*** ./resources/src/views/app/pages/profile.vue?vue&type=style&index=0&id=04411848&lang=scss ***!
  \************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_dist_cjs_js_node_modules_css_loader_dist_cjs_js_clonedRuleSet_12_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_12_use_2_node_modules_sass_loader_dist_cjs_js_clonedRuleSet_12_use_3_node_modules_vue_loader_lib_index_js_vue_loader_options_profile_vue_vue_type_style_index_0_id_04411848_lang_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/style-loader/dist/cjs.js!../../../../../node_modules/css-loader/dist/cjs.js??clonedRuleSet-12.use[1]!../../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12.use[2]!../../../../../node_modules/sass-loader/dist/cjs.js??clonedRuleSet-12.use[3]!../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./profile.vue?vue&type=style&index=0&id=04411848&lang=scss */ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-12.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12.use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-12.use[3]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/profile.vue?vue&type=style&index=0&id=04411848&lang=scss");


/***/ }),

/***/ "./resources/src/views/app/pages/profile.vue?vue&type=template&id=04411848":
/*!*********************************************************************************!*\
  !*** ./resources/src/views/app/pages/profile.vue?vue&type=template&id=04411848 ***!
  \*********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_profile_vue_vue_type_template_id_04411848__WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   staticRenderFns: () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_profile_vue_vue_type_template_id_04411848__WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_profile_vue_vue_type_template_id_04411848__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./profile.vue?vue&type=template&id=04411848 */ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/profile.vue?vue&type=template&id=04411848");


/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/profile.vue?vue&type=template&id=04411848":
/*!************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/profile.vue?vue&type=template&id=04411848 ***!
  \************************************************************************************************************************************************************************************************************************/
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
    _c("div", { staticClass: "container py-5" }, [
      _c("div", { staticClass: "form-card" }, [
        _vm._m(0),
        _vm._v(" "),
        _vm.isLoading
          ? _c("div", {
              staticClass: "loading_page spinner spinner-primary mr-3",
            })
          : _vm._e(),
        _vm._v(" "),
        !_vm.isLoading
          ? _c(
              "div",
              [
                _c("div", { staticClass: "profile-picture-section" }, [
                  _c("div", { staticClass: "profile-picture-content" }, [
                    _c("div", { staticClass: "profile-picture-container" }, [
                      _c("div", { staticClass: "current-avatar" }, [
                        _c("img", {
                          staticClass: "avatar-image",
                          attrs: {
                            src: _vm.avatar
                              ? "/images/avatar/" + _vm.avatar
                              : "/images/avatar/no_avatar.png",
                            alt: "Profile Picture",
                          },
                          on: {
                            error: function ($event) {
                              $event.target.src = "/images/avatar/no_avatar.png"
                            },
                          },
                        }),
                        _vm._v(" "),
                        _c("div", { staticClass: "avatar-overlay" }, [
                          _c("span", { staticClass: "username" }, [
                            _vm._v(_vm._s(_vm.username)),
                          ]),
                        ]),
                      ]),
                    ]),
                  ]),
                ]),
                _vm._v(" "),
                _c("validation-observer", { ref: "Update_Profile" }, [
                  _c(
                    "form",
                    {
                      staticClass: "member-form",
                      on: {
                        submit: function ($event) {
                          $event.preventDefault()
                          return _vm.Submit_Update.apply(null, arguments)
                        },
                      },
                    },
                    [
                      _c("div", { staticClass: "form-section" }, [
                        _c("div", { staticClass: "section-header" }, [
                          _c("div", { staticClass: "section-icon" }, [
                            _c("i", { staticClass: "fas fa-id-card" }),
                          ]),
                          _vm._v(" "),
                          _c("h5", { staticClass: "section-title" }, [
                            _vm._v(
                              "\n                                    Personal Information\n                                "
                            ),
                          ]),
                        ]),
                        _vm._v(" "),
                        _c("div", { staticClass: "section-content" }, [
                          _c("div", { staticClass: "row g-4" }, [
                            _c(
                              "div",
                              { staticClass: "col-md-6" },
                              [
                                _c("validation-provider", {
                                  attrs: {
                                    name: "Firstname",
                                    rules: {
                                      required: true,
                                      min: 4,
                                      max: 20,
                                    },
                                  },
                                  scopedSlots: _vm._u(
                                    [
                                      {
                                        key: "default",
                                        fn: function (validationContext) {
                                          return [
                                            _c(
                                              "div",
                                              { staticClass: "form-group" },
                                              [
                                                _c(
                                                  "label",
                                                  { staticClass: "form-label" },
                                                  [
                                                    _vm._v(
                                                      "Firstname\n                                                    *"
                                                    ),
                                                  ]
                                                ),
                                                _vm._v(" "),
                                                _c("input", {
                                                  directives: [
                                                    {
                                                      name: "model",
                                                      rawName: "v-model",
                                                      value: _vm.user.firstname,
                                                      expression:
                                                        "user.firstname",
                                                    },
                                                  ],
                                                  class: [
                                                    "form-control",
                                                    {
                                                      "is-invalid":
                                                        validationContext.errors
                                                          .length > 0,
                                                    },
                                                  ],
                                                  attrs: {
                                                    type: "text",
                                                    required: "",
                                                  },
                                                  domProps: {
                                                    value: _vm.user.firstname,
                                                  },
                                                  on: {
                                                    input: function ($event) {
                                                      if (
                                                        $event.target.composing
                                                      ) {
                                                        return
                                                      }
                                                      _vm.$set(
                                                        _vm.user,
                                                        "firstname",
                                                        $event.target.value
                                                      )
                                                    },
                                                  },
                                                }),
                                                _vm._v(" "),
                                                _c(
                                                  "div",
                                                  { staticClass: "input-icon" },
                                                  [
                                                    _c("i", {
                                                      staticClass:
                                                        "fas fa-user",
                                                    }),
                                                  ]
                                                ),
                                                _vm._v(" "),
                                                validationContext.errors
                                                  .length > 0
                                                  ? _c(
                                                      "div",
                                                      {
                                                        staticClass:
                                                          "invalid-feedback",
                                                      },
                                                      [
                                                        _vm._v(
                                                          "\n                                                    " +
                                                            _vm._s(
                                                              validationContext
                                                                .errors[0]
                                                            ) +
                                                            "\n                                                "
                                                        ),
                                                      ]
                                                    )
                                                  : _vm._e(),
                                              ]
                                            ),
                                          ]
                                        },
                                      },
                                    ],
                                    null,
                                    false,
                                    826443258
                                  ),
                                }),
                              ],
                              1
                            ),
                            _vm._v(" "),
                            _c(
                              "div",
                              { staticClass: "col-md-6" },
                              [
                                _c("validation-provider", {
                                  attrs: {
                                    name: "lastname",
                                    rules: {
                                      required: true,
                                      min: 4,
                                      max: 20,
                                    },
                                  },
                                  scopedSlots: _vm._u(
                                    [
                                      {
                                        key: "default",
                                        fn: function (validationContext) {
                                          return [
                                            _c(
                                              "div",
                                              { staticClass: "form-group" },
                                              [
                                                _c(
                                                  "label",
                                                  { staticClass: "form-label" },
                                                  [
                                                    _vm._v(
                                                      "lastname\n                                                    *"
                                                    ),
                                                  ]
                                                ),
                                                _vm._v(" "),
                                                _c("input", {
                                                  directives: [
                                                    {
                                                      name: "model",
                                                      rawName: "v-model",
                                                      value: _vm.user.lastname,
                                                      expression:
                                                        "user.lastname",
                                                    },
                                                  ],
                                                  class: [
                                                    "form-control",
                                                    {
                                                      "is-invalid":
                                                        validationContext.errors
                                                          .length > 0,
                                                    },
                                                  ],
                                                  attrs: {
                                                    type: "text",
                                                    required: "",
                                                  },
                                                  domProps: {
                                                    value: _vm.user.lastname,
                                                  },
                                                  on: {
                                                    input: function ($event) {
                                                      if (
                                                        $event.target.composing
                                                      ) {
                                                        return
                                                      }
                                                      _vm.$set(
                                                        _vm.user,
                                                        "lastname",
                                                        $event.target.value
                                                      )
                                                    },
                                                  },
                                                }),
                                                _vm._v(" "),
                                                _c(
                                                  "div",
                                                  { staticClass: "input-icon" },
                                                  [
                                                    _c("i", {
                                                      staticClass:
                                                        "fas fa-user",
                                                    }),
                                                  ]
                                                ),
                                                _vm._v(" "),
                                                validationContext.errors
                                                  .length > 0
                                                  ? _c(
                                                      "div",
                                                      {
                                                        staticClass:
                                                          "invalid-feedback",
                                                      },
                                                      [
                                                        _vm._v(
                                                          "\n                                                    " +
                                                            _vm._s(
                                                              validationContext
                                                                .errors[0]
                                                            ) +
                                                            "\n                                                "
                                                        ),
                                                      ]
                                                    )
                                                  : _vm._e(),
                                              ]
                                            ),
                                          ]
                                        },
                                      },
                                    ],
                                    null,
                                    false,
                                    1740354538
                                  ),
                                }),
                              ],
                              1
                            ),
                          ]),
                          _vm._v(" "),
                          _c("div", { staticClass: "row g-4 mt-2" }, [
                            _c(
                              "div",
                              { staticClass: "col-md-6" },
                              [
                                _c("validation-provider", {
                                  attrs: {
                                    name: "username",
                                    rules: {
                                      required: true,
                                      min: 4,
                                      max: 20,
                                    },
                                  },
                                  scopedSlots: _vm._u(
                                    [
                                      {
                                        key: "default",
                                        fn: function (validationContext) {
                                          return [
                                            _c(
                                              "div",
                                              { staticClass: "form-group" },
                                              [
                                                _c(
                                                  "label",
                                                  { staticClass: "form-label" },
                                                  [
                                                    _vm._v(
                                                      "username\n                                                    *"
                                                    ),
                                                  ]
                                                ),
                                                _vm._v(" "),
                                                _c("input", {
                                                  directives: [
                                                    {
                                                      name: "model",
                                                      rawName: "v-model",
                                                      value: _vm.user.username,
                                                      expression:
                                                        "user.username",
                                                    },
                                                  ],
                                                  class: [
                                                    "form-control",
                                                    {
                                                      "is-invalid":
                                                        validationContext.errors
                                                          .length > 0,
                                                    },
                                                  ],
                                                  attrs: {
                                                    type: "text",
                                                    required: "",
                                                  },
                                                  domProps: {
                                                    value: _vm.user.username,
                                                  },
                                                  on: {
                                                    input: function ($event) {
                                                      if (
                                                        $event.target.composing
                                                      ) {
                                                        return
                                                      }
                                                      _vm.$set(
                                                        _vm.user,
                                                        "username",
                                                        $event.target.value
                                                      )
                                                    },
                                                  },
                                                }),
                                                _vm._v(" "),
                                                _c(
                                                  "div",
                                                  { staticClass: "input-icon" },
                                                  [
                                                    _c("i", {
                                                      staticClass: "fas fa-at",
                                                    }),
                                                  ]
                                                ),
                                                _vm._v(" "),
                                                validationContext.errors
                                                  .length > 0
                                                  ? _c(
                                                      "div",
                                                      {
                                                        staticClass:
                                                          "invalid-feedback",
                                                      },
                                                      [
                                                        _vm._v(
                                                          "\n                                                    " +
                                                            _vm._s(
                                                              validationContext
                                                                .errors[0]
                                                            ) +
                                                            "\n                                                "
                                                        ),
                                                      ]
                                                    )
                                                  : _vm._e(),
                                              ]
                                            ),
                                          ]
                                        },
                                      },
                                    ],
                                    null,
                                    false,
                                    892895285
                                  ),
                                }),
                              ],
                              1
                            ),
                            _vm._v(" "),
                            _c(
                              "div",
                              { staticClass: "col-md-6" },
                              [
                                _c("validation-provider", {
                                  attrs: {
                                    name: "Phone",
                                    rules: { required: true },
                                  },
                                  scopedSlots: _vm._u(
                                    [
                                      {
                                        key: "default",
                                        fn: function (validationContext) {
                                          return [
                                            _c(
                                              "div",
                                              { staticClass: "form-group" },
                                              [
                                                _c(
                                                  "label",
                                                  { staticClass: "form-label" },
                                                  [
                                                    _vm._v(
                                                      "Phone\n                                                    *"
                                                    ),
                                                  ]
                                                ),
                                                _vm._v(" "),
                                                _c("input", {
                                                  directives: [
                                                    {
                                                      name: "model",
                                                      rawName: "v-model",
                                                      value: _vm.user.phone,
                                                      expression: "user.phone",
                                                    },
                                                  ],
                                                  class: [
                                                    "form-control",
                                                    {
                                                      "is-invalid":
                                                        validationContext.errors
                                                          .length > 0,
                                                    },
                                                  ],
                                                  attrs: {
                                                    type: "tel",
                                                    required: "",
                                                  },
                                                  domProps: {
                                                    value: _vm.user.phone,
                                                  },
                                                  on: {
                                                    input: function ($event) {
                                                      if (
                                                        $event.target.composing
                                                      ) {
                                                        return
                                                      }
                                                      _vm.$set(
                                                        _vm.user,
                                                        "phone",
                                                        $event.target.value
                                                      )
                                                    },
                                                  },
                                                }),
                                                _vm._v(" "),
                                                _c(
                                                  "div",
                                                  { staticClass: "input-icon" },
                                                  [
                                                    _c("i", {
                                                      staticClass:
                                                        "fas fa-phone",
                                                    }),
                                                  ]
                                                ),
                                                _vm._v(" "),
                                                validationContext.errors
                                                  .length > 0
                                                  ? _c(
                                                      "div",
                                                      {
                                                        staticClass:
                                                          "invalid-feedback",
                                                      },
                                                      [
                                                        _vm._v(
                                                          "\n                                                    " +
                                                            _vm._s(
                                                              validationContext
                                                                .errors[0]
                                                            ) +
                                                            "\n                                                "
                                                        ),
                                                      ]
                                                    )
                                                  : _vm._e(),
                                              ]
                                            ),
                                          ]
                                        },
                                      },
                                    ],
                                    null,
                                    false,
                                    2011622774
                                  ),
                                }),
                              ],
                              1
                            ),
                          ]),
                          _vm._v(" "),
                          _c(
                            "div",
                            { staticClass: "form-group mt-3" },
                            [
                              _c("validation-provider", {
                                attrs: {
                                  name: "Email",
                                  rules: { required: true },
                                },
                                scopedSlots: _vm._u(
                                  [
                                    {
                                      key: "default",
                                      fn: function (validationContext) {
                                        return [
                                          _c(
                                            "label",
                                            { staticClass: "form-label" },
                                            [_vm._v("Email *")]
                                          ),
                                          _vm._v(" "),
                                          _c("input", {
                                            directives: [
                                              {
                                                name: "model",
                                                rawName: "v-model",
                                                value: _vm.user.email,
                                                expression: "user.email",
                                              },
                                            ],
                                            class: [
                                              "form-control",
                                              {
                                                "is-invalid":
                                                  validationContext.errors
                                                    .length > 0,
                                              },
                                            ],
                                            attrs: {
                                              type: "email",
                                              required: "",
                                            },
                                            domProps: { value: _vm.user.email },
                                            on: {
                                              input: function ($event) {
                                                if ($event.target.composing) {
                                                  return
                                                }
                                                _vm.$set(
                                                  _vm.user,
                                                  "email",
                                                  $event.target.value
                                                )
                                              },
                                            },
                                          }),
                                          _vm._v(" "),
                                          _c(
                                            "div",
                                            { staticClass: "input-icon" },
                                            [
                                              _c("i", {
                                                staticClass: "fas fa-envelope",
                                              }),
                                            ]
                                          ),
                                          _vm._v(" "),
                                          validationContext.errors.length > 0
                                            ? _c(
                                                "div",
                                                {
                                                  staticClass:
                                                    "invalid-feedback",
                                                },
                                                [
                                                  _vm._v(
                                                    "\n                                            " +
                                                      _vm._s(
                                                        validationContext
                                                          .errors[0]
                                                      ) +
                                                      "\n                                        "
                                                  ),
                                                ]
                                              )
                                            : _vm._e(),
                                        ]
                                      },
                                    },
                                  ],
                                  null,
                                  false,
                                  673811891
                                ),
                              }),
                            ],
                            1
                          ),
                        ]),
                      ]),
                      _vm._v(" "),
                      _c("div", { staticClass: "update-section" }, [
                        _c(
                          "button",
                          {
                            staticClass: "update-btn",
                            attrs: { type: "submit" },
                          },
                          [
                            _c("i", {
                              staticClass: "fas fa-check-circle update-icon",
                            }),
                            _vm._v(" "),
                            _c("span", [_vm._v("update Profile")]),
                          ]
                        ),
                      ]),
                    ]
                  ),
                ]),
              ],
              1
            )
          : _vm._e(),
      ]),
    ]),
  ])
}
var staticRenderFns = [
  function () {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "form-header" }, [
      _c("div", { staticClass: "header-icon" }, [
        _c("i", { staticClass: "fas fa-user-edit" }),
      ]),
      _c("h2", { staticClass: "form-title", staticStyle: { color: "#fff" } }, [
        _vm._v("Profile"),
      ]),
      _c("p", { staticClass: "form-subtitle" }, [
        _vm._v("Update Your Profile Information"),
      ]),
    ])
  },
]
render._withStripped = true



/***/ })

}]);