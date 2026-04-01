"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["resources_src_views_app_pages_Payments_PaysafeCardPayment_vue"],{

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/Payments/PaysafeCardPayment.vue?vue&type=script&lang=js":
/*!***************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/Payments/PaysafeCardPayment.vue?vue&type=script&lang=js ***!
  \***************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! axios */ "./node_modules/axios/index.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_0__);
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


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  name: 'PaysafeCardPayment',
  metaInfo: {
    title: 'PaysafeCard Payment'
  },
  data: function data() {
    return {
      isLoading: false,
      isSubmitting: false,
      paymentCreated: false,
      customers: [],
      paymentData: {
        customer_id: '',
        amount: '',
        currency: 'EUR',
        description: ''
      },
      errors: {},
      redirectUrl: null
    };
  },
  methods: {
    loadCustomers: function loadCustomers() {
      var _this = this;
      return _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
        var response;
        return _regeneratorRuntime().wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              _context.next = 3;
              return axios__WEBPACK_IMPORTED_MODULE_0___default().get('/clients');
            case 3:
              response = _context.sent;
              if (response.data.success) {
                _this.customers = response.data.data;
              }
              _context.next = 11;
              break;
            case 7:
              _context.prev = 7;
              _context.t0 = _context["catch"](0);
              console.error('Error loading customers:', _context.t0);
              _this.$swal({
                icon: 'error',
                title: 'Error',
                text: 'Failed to load customers'
              });
            case 11:
            case "end":
              return _context.stop();
          }
        }, _callee, null, [[0, 7]]);
      }))();
    },
    createPayment: function createPayment() {
      var _this2 = this;
      return _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee2() {
        var response, _error$response;
        return _regeneratorRuntime().wrap(function _callee2$(_context2) {
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
              _this2.isSubmitting = true;
              _this2.errors = {};
              _context2.prev = 2;
              _context2.next = 5;
              return axios__WEBPACK_IMPORTED_MODULE_0___default().post('/paysafecard/create-payment', _this2.paymentData);
            case 5:
              response = _context2.sent;
              if (response.data.success) {
                _this2.redirectUrl = response.data.redirect_url;
                _this2.paymentCreated = true;
                _this2.$swal({
                  icon: 'success',
                  title: 'Payment Created',
                  text: 'Payment has been created successfully. You will be redirected to PaysafeCard.',
                  timer: 3000,
                  showConfirmButton: false
                });
              } else {
                _this2.$swal({
                  icon: 'error',
                  title: 'Error',
                  text: response.data.message || 'Failed to create payment'
                });
              }
              _context2.next = 14;
              break;
            case 9:
              _context2.prev = 9;
              _context2.t0 = _context2["catch"](2);
              console.error('Error creating payment:', _context2.t0);
              if (_context2.t0.response && _context2.t0.response.data && _context2.t0.response.data.errors) {
                _this2.errors = _context2.t0.response.data.errors;
              }
              _this2.$swal({
                icon: 'error',
                title: 'Error',
                text: ((_error$response = _context2.t0.response) === null || _error$response === void 0 || (_error$response = _error$response.data) === null || _error$response === void 0 ? void 0 : _error$response.message) || 'Failed to create payment'
              });
            case 14:
              _context2.prev = 14;
              _this2.isSubmitting = false;
              return _context2.finish(14);
            case 17:
            case "end":
              return _context2.stop();
          }
        }, _callee2, null, [[2, 9, 14, 17]]);
      }))();
    },
    redirectToPayment: function redirectToPayment() {
      if (this.redirectUrl) {
        window.open(this.redirectUrl, '_blank');
      }
    },
    formatCurrency: function formatCurrency(amount, currency) {
      if (!amount) return '0.00';
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: currency
      }).format(amount);
    }
  },
  mounted: function mounted() {
    this.loadCustomers();
  }
});

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/Payments/PaysafeCardPayment.vue?vue&type=style&index=0&id=58492594&scoped=true&lang=css":
/*!***********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/Payments/PaysafeCardPayment.vue?vue&type=style&index=0&id=58492594&scoped=true&lang=css ***!
  \***********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
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
___CSS_LOADER_EXPORT___.push([module.id, "\n.card[data-v-58492594] {\r\n  border: none;\r\n  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);\n}\n.card-header[data-v-58492594] {\r\n  background: linear-gradient(135deg, #28a745 0%, #20c997 100%);\r\n  color: white;\r\n  border: none;\n}\n.form-control[data-v-58492594]:focus,\r\n.form-select[data-v-58492594]:focus {\r\n  border-color: #28a745;\r\n  box-shadow: 0 0 0 0.2rem rgba(40, 167, 69, 0.25);\n}\n.btn-success[data-v-58492594] {\r\n  background: linear-gradient(135deg, #28a745 0%, #20c997 100%);\r\n  border: none;\r\n  transition: all 0.3s ease;\n}\n.btn-success[data-v-58492594]:hover {\r\n  transform: translateY(-2px);\r\n  box-shadow: 0 4px 8px rgba(40, 167, 69, 0.3);\n}\n.alert-success[data-v-58492594] {\r\n  background: linear-gradient(135deg, #d4edda 0%, #c3e6cb 100%);\r\n  border: 1px solid #c3e6cb;\r\n  color: #155724;\n}\n.spinner-border[data-v-58492594] {\r\n  width: 3rem;\r\n  height: 3rem;\n}\r\n", ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/Payments/PaysafeCardPayment.vue?vue&type=style&index=0&id=58492594&scoped=true&lang=css":
/*!***************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/Payments/PaysafeCardPayment.vue?vue&type=style&index=0&id=58492594&scoped=true&lang=css ***!
  \***************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../../../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_clonedRuleSet_9_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_9_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_PaysafeCardPayment_vue_vue_type_style_index_0_id_58492594_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !!../../../../../../node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!../../../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!../../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./PaysafeCardPayment.vue?vue&type=style&index=0&id=58492594&scoped=true&lang=css */ "./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/Payments/PaysafeCardPayment.vue?vue&type=style&index=0&id=58492594&scoped=true&lang=css");

            

var options = {};

options.insert = "head";
options.singleton = false;

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_clonedRuleSet_9_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_9_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_PaysafeCardPayment_vue_vue_type_style_index_0_id_58492594_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_1__["default"], options);



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_clonedRuleSet_9_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_9_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_PaysafeCardPayment_vue_vue_type_style_index_0_id_58492594_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_1__["default"].locals || {});

/***/ }),

/***/ "./resources/src/views/app/pages/Payments/PaysafeCardPayment.vue":
/*!***********************************************************************!*\
  !*** ./resources/src/views/app/pages/Payments/PaysafeCardPayment.vue ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _PaysafeCardPayment_vue_vue_type_template_id_58492594_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./PaysafeCardPayment.vue?vue&type=template&id=58492594&scoped=true */ "./resources/src/views/app/pages/Payments/PaysafeCardPayment.vue?vue&type=template&id=58492594&scoped=true");
/* harmony import */ var _PaysafeCardPayment_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./PaysafeCardPayment.vue?vue&type=script&lang=js */ "./resources/src/views/app/pages/Payments/PaysafeCardPayment.vue?vue&type=script&lang=js");
/* harmony import */ var _PaysafeCardPayment_vue_vue_type_style_index_0_id_58492594_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./PaysafeCardPayment.vue?vue&type=style&index=0&id=58492594&scoped=true&lang=css */ "./resources/src/views/app/pages/Payments/PaysafeCardPayment.vue?vue&type=style&index=0&id=58492594&scoped=true&lang=css");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");



;


/* normalize component */

var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _PaysafeCardPayment_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__["default"],
  _PaysafeCardPayment_vue_vue_type_template_id_58492594_scoped_true__WEBPACK_IMPORTED_MODULE_0__.render,
  _PaysafeCardPayment_vue_vue_type_template_id_58492594_scoped_true__WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  "58492594",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/src/views/app/pages/Payments/PaysafeCardPayment.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./resources/src/views/app/pages/Payments/PaysafeCardPayment.vue?vue&type=script&lang=js":
/*!***********************************************************************************************!*\
  !*** ./resources/src/views/app/pages/Payments/PaysafeCardPayment.vue?vue&type=script&lang=js ***!
  \***********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_PaysafeCardPayment_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./PaysafeCardPayment.vue?vue&type=script&lang=js */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/Payments/PaysafeCardPayment.vue?vue&type=script&lang=js");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_PaysafeCardPayment_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/src/views/app/pages/Payments/PaysafeCardPayment.vue?vue&type=style&index=0&id=58492594&scoped=true&lang=css":
/*!*******************************************************************************************************************************!*\
  !*** ./resources/src/views/app/pages/Payments/PaysafeCardPayment.vue?vue&type=style&index=0&id=58492594&scoped=true&lang=css ***!
  \*******************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_dist_cjs_js_node_modules_css_loader_dist_cjs_js_clonedRuleSet_9_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_9_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_PaysafeCardPayment_vue_vue_type_style_index_0_id_58492594_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/style-loader/dist/cjs.js!../../../../../../node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!../../../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!../../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./PaysafeCardPayment.vue?vue&type=style&index=0&id=58492594&scoped=true&lang=css */ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/Payments/PaysafeCardPayment.vue?vue&type=style&index=0&id=58492594&scoped=true&lang=css");


/***/ }),

/***/ "./resources/src/views/app/pages/Payments/PaysafeCardPayment.vue?vue&type=template&id=58492594&scoped=true":
/*!*****************************************************************************************************************!*\
  !*** ./resources/src/views/app/pages/Payments/PaysafeCardPayment.vue?vue&type=template&id=58492594&scoped=true ***!
  \*****************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_PaysafeCardPayment_vue_vue_type_template_id_58492594_scoped_true__WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   staticRenderFns: () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_PaysafeCardPayment_vue_vue_type_template_id_58492594_scoped_true__WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_PaysafeCardPayment_vue_vue_type_template_id_58492594_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./PaysafeCardPayment.vue?vue&type=template&id=58492594&scoped=true */ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/Payments/PaysafeCardPayment.vue?vue&type=template&id=58492594&scoped=true");


/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/Payments/PaysafeCardPayment.vue?vue&type=template&id=58492594&scoped=true":
/*!********************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/Payments/PaysafeCardPayment.vue?vue&type=template&id=58492594&scoped=true ***!
  \********************************************************************************************************************************************************************************************************************************************************/
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
    { staticClass: "main-content" },
    [
      _c("breadcumb", {
        attrs: { page: "PaysafeCard Payment", folder: "Payments" },
      }),
      _vm._v(" "),
      _c("div", { staticClass: "row" }, [
        _c("div", { staticClass: "col-lg-8 mx-auto" }, [
          _c("div", { staticClass: "card" }, [
            _vm._m(0),
            _vm._v(" "),
            _c("div", { staticClass: "card-body" }, [
              _vm.isLoading
                ? _c("div", { staticClass: "text-center py-4" }, [
                    _vm._m(1),
                    _vm._v(" "),
                    _c("p", { staticClass: "mt-2" }, [
                      _vm._v("Processing payment..."),
                    ]),
                  ])
                : _vm.paymentCreated
                ? _c("div", { staticClass: "text-center py-4" }, [
                    _c("div", { staticClass: "alert alert-success" }, [
                      _c("i", {
                        staticClass: "fas fa-check-circle fa-2x mb-3",
                      }),
                      _vm._v(" "),
                      _c("h5", [_vm._v("Payment Created Successfully!")]),
                      _vm._v(" "),
                      _c("p", [
                        _vm._v(
                          "You will be redirected to PaysafeCard to complete your payment."
                        ),
                      ]),
                      _vm._v(" "),
                      _c(
                        "button",
                        {
                          staticClass: "btn btn-success btn-lg",
                          on: { click: _vm.redirectToPayment },
                        },
                        [
                          _c("i", {
                            staticClass: "fas fa-external-link-alt me-2",
                          }),
                          _vm._v(
                            "\n                Continue to PaysafeCard\n              "
                          ),
                        ]
                      ),
                    ]),
                  ])
                : _c("div", [
                    _c(
                      "form",
                      {
                        on: {
                          submit: function ($event) {
                            $event.preventDefault()
                            return _vm.createPayment.apply(null, arguments)
                          },
                        },
                      },
                      [
                        _c("div", { staticClass: "row" }, [
                          _c("div", { staticClass: "col-md-6 mb-3" }, [
                            _c("label", { staticClass: "form-label" }, [
                              _vm._v("Customer *"),
                            ]),
                            _vm._v(" "),
                            _c(
                              "select",
                              {
                                directives: [
                                  {
                                    name: "model",
                                    rawName: "v-model",
                                    value: _vm.paymentData.customer_id,
                                    expression: "paymentData.customer_id",
                                  },
                                ],
                                staticClass: "form-control",
                                class: { "is-invalid": _vm.errors.customer_id },
                                attrs: { required: "" },
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
                                      _vm.paymentData,
                                      "customer_id",
                                      $event.target.multiple
                                        ? $$selectedVal
                                        : $$selectedVal[0]
                                    )
                                  },
                                },
                              },
                              [
                                _c("option", { attrs: { value: "" } }, [
                                  _vm._v("Select Customer"),
                                ]),
                                _vm._v(" "),
                                _vm._l(_vm.customers, function (customer) {
                                  return _c(
                                    "option",
                                    {
                                      key: customer.id,
                                      domProps: { value: customer.id },
                                    },
                                    [
                                      _vm._v(
                                        "\n                      " +
                                          _vm._s(customer.firstname) +
                                          " " +
                                          _vm._s(customer.lastname) +
                                          " (" +
                                          _vm._s(customer.email) +
                                          ")\n                    "
                                      ),
                                    ]
                                  )
                                }),
                              ],
                              2
                            ),
                            _vm._v(" "),
                            _vm.errors.customer_id
                              ? _c("div", { staticClass: "invalid-feedback" }, [
                                  _vm._v(
                                    "\n                    " +
                                      _vm._s(_vm.errors.customer_id) +
                                      "\n                  "
                                  ),
                                ])
                              : _vm._e(),
                          ]),
                          _vm._v(" "),
                          _c("div", { staticClass: "col-md-6 mb-3" }, [
                            _c("label", { staticClass: "form-label" }, [
                              _vm._v("Amount *"),
                            ]),
                            _vm._v(" "),
                            _c("div", { staticClass: "input-group" }, [
                              _c("input", {
                                directives: [
                                  {
                                    name: "model",
                                    rawName: "v-model",
                                    value: _vm.paymentData.amount,
                                    expression: "paymentData.amount",
                                  },
                                ],
                                staticClass: "form-control",
                                class: { "is-invalid": _vm.errors.amount },
                                attrs: {
                                  type: "number",
                                  step: "0.01",
                                  min: "0.01",
                                  placeholder: "0.00",
                                  required: "",
                                },
                                domProps: { value: _vm.paymentData.amount },
                                on: {
                                  input: function ($event) {
                                    if ($event.target.composing) {
                                      return
                                    }
                                    _vm.$set(
                                      _vm.paymentData,
                                      "amount",
                                      $event.target.value
                                    )
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
                                      value: _vm.paymentData.currency,
                                      expression: "paymentData.currency",
                                    },
                                  ],
                                  staticClass: "form-select",
                                  class: { "is-invalid": _vm.errors.currency },
                                  staticStyle: { "max-width": "100px" },
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
                                        _vm.paymentData,
                                        "currency",
                                        $event.target.multiple
                                          ? $$selectedVal
                                          : $$selectedVal[0]
                                      )
                                    },
                                  },
                                },
                                [
                                  _c("option", { attrs: { value: "EUR" } }, [
                                    _vm._v("EUR"),
                                  ]),
                                  _vm._v(" "),
                                  _c("option", { attrs: { value: "USD" } }, [
                                    _vm._v("USD"),
                                  ]),
                                  _vm._v(" "),
                                  _c("option", { attrs: { value: "GBP" } }, [
                                    _vm._v("GBP"),
                                  ]),
                                  _vm._v(" "),
                                  _c("option", { attrs: { value: "CHF" } }, [
                                    _vm._v("CHF"),
                                  ]),
                                  _vm._v(" "),
                                  _c("option", { attrs: { value: "PLN" } }, [
                                    _vm._v("PLN"),
                                  ]),
                                  _vm._v(" "),
                                  _c("option", { attrs: { value: "CZK" } }, [
                                    _vm._v("CZK"),
                                  ]),
                                  _vm._v(" "),
                                  _c("option", { attrs: { value: "HUF" } }, [
                                    _vm._v("HUF"),
                                  ]),
                                  _vm._v(" "),
                                  _c("option", { attrs: { value: "RON" } }, [
                                    _vm._v("RON"),
                                  ]),
                                  _vm._v(" "),
                                  _c("option", { attrs: { value: "BGN" } }, [
                                    _vm._v("BGN"),
                                  ]),
                                  _vm._v(" "),
                                  _c("option", { attrs: { value: "HRK" } }, [
                                    _vm._v("HRK"),
                                  ]),
                                ]
                              ),
                            ]),
                            _vm._v(" "),
                            _vm.errors.amount
                              ? _c("div", { staticClass: "invalid-feedback" }, [
                                  _vm._v(
                                    "\n                    " +
                                      _vm._s(_vm.errors.amount) +
                                      "\n                  "
                                  ),
                                ])
                              : _vm._e(),
                          ]),
                          _vm._v(" "),
                          _c("div", { staticClass: "col-12 mb-3" }, [
                            _c("label", { staticClass: "form-label" }, [
                              _vm._v("Description"),
                            ]),
                            _vm._v(" "),
                            _c("textarea", {
                              directives: [
                                {
                                  name: "model",
                                  rawName: "v-model",
                                  value: _vm.paymentData.description,
                                  expression: "paymentData.description",
                                },
                              ],
                              staticClass: "form-control",
                              class: { "is-invalid": _vm.errors.description },
                              attrs: {
                                rows: "3",
                                placeholder: "Payment description (optional)",
                              },
                              domProps: { value: _vm.paymentData.description },
                              on: {
                                input: function ($event) {
                                  if ($event.target.composing) {
                                    return
                                  }
                                  _vm.$set(
                                    _vm.paymentData,
                                    "description",
                                    $event.target.value
                                  )
                                },
                              },
                            }),
                            _vm._v(" "),
                            _vm.errors.description
                              ? _c("div", { staticClass: "invalid-feedback" }, [
                                  _vm._v(
                                    "\n                    " +
                                      _vm._s(_vm.errors.description) +
                                      "\n                  "
                                  ),
                                ])
                              : _vm._e(),
                          ]),
                          _vm._v(" "),
                          _c("div", { staticClass: "col-12 mb-4" }, [
                            _c("div", { staticClass: "card bg-light" }, [
                              _c("div", { staticClass: "card-body" }, [
                                _c("h6", { staticClass: "card-title" }, [
                                  _vm._v("Payment Summary"),
                                ]),
                                _vm._v(" "),
                                _c("div", { staticClass: "row" }, [
                                  _c("div", { staticClass: "col-md-6" }, [
                                    _c("p", [
                                      _c("strong", [_vm._v("Amount:")]),
                                      _vm._v(
                                        " " +
                                          _vm._s(
                                            _vm.formatCurrency(
                                              _vm.paymentData.amount,
                                              _vm.paymentData.currency
                                            )
                                          )
                                      ),
                                    ]),
                                  ]),
                                  _vm._v(" "),
                                  _vm._m(2),
                                ]),
                                _vm._v(" "),
                                _vm.paymentData.description
                                  ? _c("div", { staticClass: "mt-2" }, [
                                      _c("p", [
                                        _c("strong", [_vm._v("Description:")]),
                                        _vm._v(
                                          " " +
                                            _vm._s(_vm.paymentData.description)
                                        ),
                                      ]),
                                    ])
                                  : _vm._e(),
                              ]),
                            ]),
                          ]),
                          _vm._v(" "),
                          _c("div", { staticClass: "col-12 text-center" }, [
                            _c(
                              "button",
                              {
                                staticClass: "btn btn-success btn-lg",
                                attrs: {
                                  type: "submit",
                                  disabled: _vm.isSubmitting,
                                },
                              },
                              [
                                _vm.isSubmitting
                                  ? _c("i", {
                                      staticClass:
                                        "fas fa-spinner fa-spin me-2",
                                    })
                                  : _c("i", {
                                      staticClass: "fas fa-credit-card me-2",
                                    }),
                                _vm._v(
                                  "\n                    " +
                                    _vm._s(
                                      _vm.isSubmitting
                                        ? "Creating Payment..."
                                        : "Create PaysafeCard Payment"
                                    ) +
                                    "\n                  "
                                ),
                              ]
                            ),
                          ]),
                        ]),
                      ]
                    ),
                  ]),
            ]),
          ]),
        ]),
      ]),
    ],
    1
  )
}
var staticRenderFns = [
  function () {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "card-header" }, [
      _c("h4", { staticClass: "card-title" }, [
        _c("i", { staticClass: "fas fa-credit-card text-success me-2" }),
        _vm._v("\n            PaysafeCard Payment\n          "),
      ]),
    ])
  },
  function () {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c(
      "div",
      { staticClass: "spinner-border text-primary", attrs: { role: "status" } },
      [_c("span", { staticClass: "sr-only" }, [_vm._v("Loading...")])]
    )
  },
  function () {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "col-md-6" }, [
      _c("p", [
        _c("strong", [_vm._v("Payment Method:")]),
        _vm._v(" PaysafeCard"),
      ]),
    ])
  },
]
render._withStripped = true



/***/ })

}]);