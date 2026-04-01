"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["resources_src_views_app_pages_settings_SubscriptionPlans_vue"],{

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/settings/SubscriptionPlans.vue?vue&type=script&lang=js":
/*!**************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/settings/SubscriptionPlans.vue?vue&type=script&lang=js ***!
  \**************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! axios */ "./node_modules/axios/index.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_0__);
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
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


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  name: "AdminPlanManager",
  data: function data() {
    return {
      loading: false,
      error: null,
      successMessage: null,
      featureList: [],
      plans: []
    };
  },
  mounted: function mounted() {
    var _this = this;
    return _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
      return _regeneratorRuntime().wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return _this.loadData();
          case 2:
          case "end":
            return _context.stop();
        }
      }, _callee);
    }))();
  },
  methods: {
    goBack: function goBack() {
      this.$router.go(-1);
    },
    loadData: function loadData() {
      var _this2 = this;
      return _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee2() {
        var _yield$Promise$all, _yield$Promise$all2, featuresResponse, plansResponse;
        return _regeneratorRuntime().wrap(function _callee2$(_context2) {
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
              _this2.loading = true;
              _this2.error = null;
              _context2.prev = 2;
              _context2.next = 5;
              return Promise.all([axios__WEBPACK_IMPORTED_MODULE_0___default().get('/plans/features/list'), axios__WEBPACK_IMPORTED_MODULE_0___default().get('/plans')]);
            case 5:
              _yield$Promise$all = _context2.sent;
              _yield$Promise$all2 = _slicedToArray(_yield$Promise$all, 2);
              featuresResponse = _yield$Promise$all2[0];
              plansResponse = _yield$Promise$all2[1];
              if (featuresResponse.data.success) {
                _this2.featureList = featuresResponse.data.data;
              }
              if (plansResponse.data.success) {
                _this2.plans = plansResponse.data.data.map(function (plan) {
                  return _objectSpread(_objectSpread({}, plan), {}, {
                    features: plan.features || [],
                    saving: false,
                    deleting: false
                  });
                });
              }
              _context2.next = 17;
              break;
            case 13:
              _context2.prev = 13;
              _context2.t0 = _context2["catch"](2);
              console.error('Error loading data:', _context2.t0);
              _this2.error = 'Failed to load subscription plans. Please try again.';
            case 17:
              _context2.prev = 17;
              _this2.loading = false;
              return _context2.finish(17);
            case 20:
            case "end":
              return _context2.stop();
          }
        }, _callee2, null, [[2, 13, 17, 20]]);
      }))();
    },
    addNewPlan: function addNewPlan() {
      this.plans.unshift({
        id: null,
        name: "New Plan",
        price: 0,
        interval: "monthly",
        stripe_price_id: "",
        features: [],
        is_active: true,
        sort_order: 0,
        saving: false,
        deleting: false
      });
    },
    deletePlan: function deletePlan(plan) {
      var _this3 = this;
      return _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee3() {
        var index, response, _index;
        return _regeneratorRuntime().wrap(function _callee3$(_context3) {
          while (1) switch (_context3.prev = _context3.next) {
            case 0:
              if (confirm("Are you sure you want to delete this plan?")) {
                _context3.next = 2;
                break;
              }
              return _context3.abrupt("return");
            case 2:
              if (plan.id) {
                _context3.next = 6;
                break;
              }
              index = _this3.plans.findIndex(function (p) {
                return p === plan;
              });
              if (index > -1) {
                _this3.plans.splice(index, 1);
              }
              return _context3.abrupt("return");
            case 6:
              plan.deleting = true;
              _context3.prev = 7;
              _context3.next = 10;
              return axios__WEBPACK_IMPORTED_MODULE_0___default()["delete"]("/plans/".concat(plan.id));
            case 10:
              response = _context3.sent;
              if (response.data.success) {
                _index = _this3.plans.findIndex(function (p) {
                  return p.id === plan.id;
                });
                if (_index > -1) {
                  _this3.plans.splice(_index, 1);
                }
                _this3.showSuccess('Plan deleted successfully');
              } else {
                _this3.error = response.data.message || 'Failed to delete plan';
              }
              _context3.next = 18;
              break;
            case 14:
              _context3.prev = 14;
              _context3.t0 = _context3["catch"](7);
              console.error('Error deleting plan:', _context3.t0);
              _this3.error = 'Failed to delete plan. Please try again.';
            case 18:
              _context3.prev = 18;
              plan.deleting = false;
              return _context3.finish(18);
            case 21:
            case "end":
              return _context3.stop();
          }
        }, _callee3, null, [[7, 14, 18, 21]]);
      }))();
    },
    savePlan: function savePlan(plan) {
      var _this4 = this;
      return _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee4() {
        var response, errors, _error$response;
        return _regeneratorRuntime().wrap(function _callee4$(_context4) {
          while (1) switch (_context4.prev = _context4.next) {
            case 0:
              plan.saving = true;
              _this4.error = null;
              _context4.prev = 2;
              if (!plan.id) {
                _context4.next = 9;
                break;
              }
              _context4.next = 6;
              return axios__WEBPACK_IMPORTED_MODULE_0___default().put("/plans/".concat(plan.id), {
                name: plan.name,
                price: plan.price,
                interval: plan.interval,
                stripe_price_id: plan.stripe_price_id || '',
                features: plan.features || [],
                is_active: plan.is_active,
                sort_order: plan.sort_order || 0
              });
            case 6:
              response = _context4.sent;
              _context4.next = 12;
              break;
            case 9:
              _context4.next = 11;
              return axios__WEBPACK_IMPORTED_MODULE_0___default().post('/plans', {
                name: plan.name,
                price: plan.price,
                interval: plan.interval,
                stripe_price_id: plan.stripe_price_id || '',
                features: plan.features || [],
                is_active: plan.is_active,
                sort_order: plan.sort_order || 0
              });
            case 11:
              response = _context4.sent;
            case 12:
              if (response.data.success) {
                // Update the plan with the response data
                Object.assign(plan, _objectSpread(_objectSpread({}, response.data.data), {}, {
                  features: response.data.data.features || [],
                  saving: false,
                  deleting: false
                }));
                _this4.showSuccess(plan.id ? 'Plan updated successfully' : 'Plan created successfully');
              } else {
                _this4.error = response.data.message || 'Failed to save plan';
              }
              _context4.next = 19;
              break;
            case 15:
              _context4.prev = 15;
              _context4.t0 = _context4["catch"](2);
              console.error('Error saving plan:', _context4.t0);
              if (_context4.t0.response && _context4.t0.response.data && _context4.t0.response.data.errors) {
                errors = Object.values(_context4.t0.response.data.errors).flat();
                _this4.error = errors.join(', ');
              } else {
                _this4.error = ((_error$response = _context4.t0.response) === null || _error$response === void 0 || (_error$response = _error$response.data) === null || _error$response === void 0 ? void 0 : _error$response.message) || 'Failed to save plan. Please try again.';
              }
            case 19:
              _context4.prev = 19;
              plan.saving = false;
              return _context4.finish(19);
            case 22:
            case "end":
              return _context4.stop();
          }
        }, _callee4, null, [[2, 15, 19, 22]]);
      }))();
    },
    showSuccess: function showSuccess(message) {
      var _this5 = this;
      this.successMessage = message;
      setTimeout(function () {
        _this5.successMessage = null;
      }, 3000);
    }
  }
});

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/settings/SubscriptionPlans.vue?vue&type=style&index=0&id=9d93ab44&lang=css":
/*!**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/settings/SubscriptionPlans.vue?vue&type=style&index=0&id=9d93ab44&lang=css ***!
  \**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
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
___CSS_LOADER_EXPORT___.push([module.id, "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n \r\n\r\n/* Breadcrumb Navigation Styles */\n.breadcrumb-nav-row {\r\n  margin-bottom: 1.5rem;\n}\n.breadcrumb-section {\r\n  width: 100%;\n}\n.breadcrumb-nav {\r\n  background: transparent;\r\n  padding: 0;\r\n  margin: 0;\n}\n.breadcrumb-container {\r\n  display: flex;\r\n  align-items: center;\r\n  gap: 0.75rem;\n}\n.back-button {\r\n  background: linear-gradient(to bottom, #23415a, #0f1c29);\r\n  border: none;\r\n  color: white;\r\n  width: 40px;\r\n  height: 40px;\r\n  border-radius: 50%;\r\n  display: flex;\r\n  align-items: center;\r\n  justify-content: center;\r\n  cursor: pointer;\r\n  transition: all 0.3s ease;\r\n  box-shadow: 0 2px 8px rgba(35, 65, 90, 0.3);\n}\n.back-button:hover {\r\n  background: linear-gradient(to bottom, #1a2f47, #0a141f);\r\n  transform: translateY(-2px);\r\n  box-shadow: 0 4px 12px rgba(35, 65, 90, 0.4);\n}\n.back-button:active {\r\n  transform: translateY(0);\n}\n.breadcrumb {\r\n  background: transparent;\r\n  padding: 0;\r\n  margin: 0;\r\n  display: flex;\r\n  align-items: center;\r\n  list-style: none;\r\n  flex-wrap: wrap;\n}\n.breadcrumb-item {\r\n  display: flex;\r\n  align-items: center;\r\n  font-size: 0.9rem;\r\n  font-weight: 500;\n}\n.breadcrumb-item:not(:last-child)::after {\r\n  content: '/';\r\n  margin: 0 0.5rem;\r\n  color: #6c757d;\r\n  font-weight: 400;\n}\n.breadcrumb-item a {\r\n  color: #6c757d;\r\n  text-decoration: none;\r\n  display: flex;\r\n  align-items: center;\r\n  gap: 0.5rem;\r\n  transition: color 0.3s ease;\r\n  padding: 0.25rem 0.5rem;\r\n  border-radius: 0.375rem;\n}\n.breadcrumb-item a:hover {\r\n  color: #23415a;\r\n  background-color: rgba(35, 65, 90, 0.1);\n}\n.breadcrumb-item.active {\r\n  color: #23415a;\r\n  font-weight: 600;\r\n  display: flex;\r\n  align-items: center;\r\n  gap: 0.5rem;\r\n  padding: 0.25rem 0.5rem;\r\n  background-color: rgba(35, 65, 90, 0.1);\r\n  border-radius: 0.375rem;\n}\n.breadcrumb-item i {\r\n  font-size: 0.8rem;\r\n  opacity: 0.8;\n}\r\n\r\n/* Card Styling */\n.pricing-card {\r\n  border: none;\r\n  border-radius: 1rem;\r\n  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.08);\r\n  transition: transform 0.25s ease, box-shadow 0.25s ease;\r\n  background-color: #ffffff;\r\n  position: relative;\n}\n.pricing-card:hover {\r\n  transform: translateY(-5px);\r\n  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.12);\n}\r\n\r\n/* Inputs */\ninput.form-control,\r\ninput[type=\"number\"] {\r\n  font-size: 0.9rem;\r\n  padding: 0.5rem 0.75rem;\r\n  border-radius: 0.5rem;\r\n  border: 1px solid #ced4da;\r\n  transition: border-color 0.2s ease-in-out, box-shadow 0.2s ease-in-out;\n}\ninput.form-control:focus {\r\n  border-color: #0d6efd;\r\n  box-shadow: 0 0 0 0.15rem rgba(13, 110, 253, 0.25);\n}\r\n\r\n/* Labels */\n.form-label {\r\n  font-weight: 600;\r\n  margin-bottom: 0.25rem;\r\n  color: #252525;\n}\r\n\r\n/* Checkbox */\n.form-check-input {\r\n  cursor: pointer;\r\n  transition: background-color 0.2s ease-in-out;\n}\n.form-check-label {\r\n  font-size: 0.85rem;\r\n  margin-left: 0.3rem;\r\n  color: #252525;\n}\r\n\r\n/* Feature Checkboxes */\n.form-check {\r\n  margin-bottom: 0.35rem;\n}\r\n\r\n/* Buttons */\n.btn-outline-danger,\r\n.btn-outline-success {\r\n  font-size: 0.85rem;\r\n  padding: 0.4rem 0.8rem;\r\n  border-radius: 0.5rem;\r\n  font-weight: 600;\n}\n.btn-outline-danger{\r\n  background-color: #ff4040;\r\n  color: white;\n}\n.btn-outline-success{\r\n  background-color: #42aa7a;\r\n  color: white;\n}\n.btn-outline-danger:hover {\r\n  border-color: #f5c2c7;\n}\n.btn-outline-success:hover {\r\n  border-color: #badbcc;\r\n  background-color: none !important;\n}\r\n\r\n/* Add New Plan Button */\n.btn-primary {\r\n  padding: 0.55rem 1.25rem;\r\n  border-radius: 0.5rem;\r\n  font-weight: 600;\r\n  font-size: 0.95rem;\n}\r\n\r\n/* Title */\nh2.fw-bold {\r\n  font-size: 1.8rem;\r\n  color: #252525;\n}\n.features-list{\r\n  color: #252525;\n}\n.checkbox{\r\n  margin-top: 10px;\n}\r\n\r\n", ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/settings/SubscriptionPlans.vue?vue&type=style&index=0&id=9d93ab44&lang=css":
/*!**************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/settings/SubscriptionPlans.vue?vue&type=style&index=0&id=9d93ab44&lang=css ***!
  \**************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../../../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_clonedRuleSet_9_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_9_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_SubscriptionPlans_vue_vue_type_style_index_0_id_9d93ab44_lang_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !!../../../../../../node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!../../../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!../../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./SubscriptionPlans.vue?vue&type=style&index=0&id=9d93ab44&lang=css */ "./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/settings/SubscriptionPlans.vue?vue&type=style&index=0&id=9d93ab44&lang=css");

            

var options = {};

options.insert = "head";
options.singleton = false;

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_clonedRuleSet_9_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_9_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_SubscriptionPlans_vue_vue_type_style_index_0_id_9d93ab44_lang_css__WEBPACK_IMPORTED_MODULE_1__["default"], options);



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_clonedRuleSet_9_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_9_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_SubscriptionPlans_vue_vue_type_style_index_0_id_9d93ab44_lang_css__WEBPACK_IMPORTED_MODULE_1__["default"].locals || {});

/***/ }),

/***/ "./resources/src/views/app/pages/settings/SubscriptionPlans.vue":
/*!**********************************************************************!*\
  !*** ./resources/src/views/app/pages/settings/SubscriptionPlans.vue ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _SubscriptionPlans_vue_vue_type_template_id_9d93ab44__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./SubscriptionPlans.vue?vue&type=template&id=9d93ab44 */ "./resources/src/views/app/pages/settings/SubscriptionPlans.vue?vue&type=template&id=9d93ab44");
/* harmony import */ var _SubscriptionPlans_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./SubscriptionPlans.vue?vue&type=script&lang=js */ "./resources/src/views/app/pages/settings/SubscriptionPlans.vue?vue&type=script&lang=js");
/* harmony import */ var _SubscriptionPlans_vue_vue_type_style_index_0_id_9d93ab44_lang_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./SubscriptionPlans.vue?vue&type=style&index=0&id=9d93ab44&lang=css */ "./resources/src/views/app/pages/settings/SubscriptionPlans.vue?vue&type=style&index=0&id=9d93ab44&lang=css");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");



;


/* normalize component */

var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _SubscriptionPlans_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__["default"],
  _SubscriptionPlans_vue_vue_type_template_id_9d93ab44__WEBPACK_IMPORTED_MODULE_0__.render,
  _SubscriptionPlans_vue_vue_type_template_id_9d93ab44__WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/src/views/app/pages/settings/SubscriptionPlans.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./resources/src/views/app/pages/settings/SubscriptionPlans.vue?vue&type=script&lang=js":
/*!**********************************************************************************************!*\
  !*** ./resources/src/views/app/pages/settings/SubscriptionPlans.vue?vue&type=script&lang=js ***!
  \**********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_SubscriptionPlans_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./SubscriptionPlans.vue?vue&type=script&lang=js */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/settings/SubscriptionPlans.vue?vue&type=script&lang=js");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_SubscriptionPlans_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/src/views/app/pages/settings/SubscriptionPlans.vue?vue&type=style&index=0&id=9d93ab44&lang=css":
/*!******************************************************************************************************************!*\
  !*** ./resources/src/views/app/pages/settings/SubscriptionPlans.vue?vue&type=style&index=0&id=9d93ab44&lang=css ***!
  \******************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_dist_cjs_js_node_modules_css_loader_dist_cjs_js_clonedRuleSet_9_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_9_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_SubscriptionPlans_vue_vue_type_style_index_0_id_9d93ab44_lang_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/style-loader/dist/cjs.js!../../../../../../node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!../../../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!../../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./SubscriptionPlans.vue?vue&type=style&index=0&id=9d93ab44&lang=css */ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/settings/SubscriptionPlans.vue?vue&type=style&index=0&id=9d93ab44&lang=css");


/***/ }),

/***/ "./resources/src/views/app/pages/settings/SubscriptionPlans.vue?vue&type=template&id=9d93ab44":
/*!****************************************************************************************************!*\
  !*** ./resources/src/views/app/pages/settings/SubscriptionPlans.vue?vue&type=template&id=9d93ab44 ***!
  \****************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_SubscriptionPlans_vue_vue_type_template_id_9d93ab44__WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   staticRenderFns: () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_SubscriptionPlans_vue_vue_type_template_id_9d93ab44__WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_SubscriptionPlans_vue_vue_type_template_id_9d93ab44__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./SubscriptionPlans.vue?vue&type=template&id=9d93ab44 */ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/settings/SubscriptionPlans.vue?vue&type=template&id=9d93ab44");


/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/settings/SubscriptionPlans.vue?vue&type=template&id=9d93ab44":
/*!*******************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/settings/SubscriptionPlans.vue?vue&type=template&id=9d93ab44 ***!
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
  return _c("div", { staticClass: "container py-5" }, [
    _c("div", { staticClass: "breadcrumb-nav-row" }, [
      _c("div", { staticClass: "breadcrumb-section" }, [
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
                  staticStyle: { color: "#252525" },
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
              _c("ol", { staticClass: "breadcrumb" }, [
                _c(
                  "li",
                  { staticClass: "breadcrumb-item" },
                  [
                    _c(
                      "router-link",
                      { attrs: { to: "/app/Members/ViewAllMembers" } },
                      [
                        _c("i", { staticClass: "fas fa-home" }),
                        _vm._v("\n                Dashboard\n              "),
                      ]
                    ),
                  ],
                  1
                ),
                _vm._v(" "),
                _c(
                  "li",
                  { staticClass: "breadcrumb-item" },
                  [
                    _c("router-link", { attrs: { to: "/app/settings" } }, [
                      _c("i", { staticClass: "fas fa-cogs" }),
                      _vm._v("\n                Settings\n              "),
                    ]),
                  ],
                  1
                ),
                _vm._v(" "),
                _vm._m(0),
              ]),
            ]),
          ]
        ),
      ]),
    ]),
    _vm._v(" "),
    _c(
      "div",
      { staticClass: "d-flex justify-content-between align-items-center mb-4" },
      [
        _c("h2", { staticClass: "fw-bold" }, [
          _vm._v("Manage Subscription Plans"),
        ]),
        _vm._v(" "),
        _c(
          "button",
          {
            staticClass: "btn btn-primary",
            attrs: { disabled: _vm.loading },
            on: { click: _vm.addNewPlan },
          },
          [_vm._v("+ Add New Plan")]
        ),
      ]
    ),
    _vm._v(" "),
    _vm.loading
      ? _c("div", { staticClass: "text-center py-5" }, [_vm._m(1)])
      : _vm._e(),
    _vm._v(" "),
    _vm.error
      ? _c(
          "div",
          { staticClass: "alert alert-danger", attrs: { role: "alert" } },
          [_vm._v("\n    " + _vm._s(_vm.error) + "\n  ")]
        )
      : _vm._e(),
    _vm._v(" "),
    _vm.successMessage
      ? _c(
          "div",
          { staticClass: "alert alert-success", attrs: { role: "alert" } },
          [_vm._v("\n    " + _vm._s(_vm.successMessage) + "\n  ")]
        )
      : _vm._e(),
    _vm._v(" "),
    !_vm.loading
      ? _c(
          "div",
          { staticClass: "row g-4" },
          _vm._l(_vm.plans, function (plan, index) {
            return _c(
              "div",
              { key: plan.id || index, staticClass: "col-md-4 mb-4" },
              [
                _c("div", { staticClass: "card pricing-card p-3 h-100" }, [
                  _c(
                    "div",
                    {
                      staticClass:
                        "d-flex justify-content-between align-items-center mb-2",
                    },
                    [
                      _c("input", {
                        directives: [
                          {
                            name: "model",
                            rawName: "v-model",
                            value: plan.name,
                            expression: "plan.name",
                          },
                        ],
                        staticClass: "form-control form-control-sm w-75",
                        attrs: {
                          disabled: plan.saving,
                          placeholder: "Plan Name",
                        },
                        domProps: { value: plan.name },
                        on: {
                          input: function ($event) {
                            if ($event.target.composing) {
                              return
                            }
                            _vm.$set(plan, "name", $event.target.value)
                          },
                        },
                      }),
                      _vm._v(" "),
                      _c(
                        "label",
                        { staticClass: "checkbox checkbox-outline-primary" },
                        [
                          _c("input", {
                            directives: [
                              {
                                name: "model",
                                rawName: "v-model",
                                value: plan.is_active,
                                expression: "plan.is_active",
                              },
                            ],
                            attrs: { type: "checkbox", disabled: plan.saving },
                            domProps: {
                              checked: Array.isArray(plan.is_active)
                                ? _vm._i(plan.is_active, null) > -1
                                : plan.is_active,
                            },
                            on: {
                              change: function ($event) {
                                var $$a = plan.is_active,
                                  $$el = $event.target,
                                  $$c = $$el.checked ? true : false
                                if (Array.isArray($$a)) {
                                  var $$v = null,
                                    $$i = _vm._i($$a, $$v)
                                  if ($$el.checked) {
                                    $$i < 0 &&
                                      _vm.$set(
                                        plan,
                                        "is_active",
                                        $$a.concat([$$v])
                                      )
                                  } else {
                                    $$i > -1 &&
                                      _vm.$set(
                                        plan,
                                        "is_active",
                                        $$a
                                          .slice(0, $$i)
                                          .concat($$a.slice($$i + 1))
                                      )
                                  }
                                } else {
                                  _vm.$set(plan, "is_active", $$c)
                                }
                              },
                            },
                          }),
                          _vm._v(" "),
                          _c("span", { staticClass: "features-list" }, [
                            _vm._v("Active"),
                          ]),
                          _vm._v(" "),
                          _c("span", { staticClass: "checkmark" }),
                        ]
                      ),
                    ]
                  ),
                  _vm._v(" "),
                  _c("div", { staticClass: "mb-3" }, [
                    _c("label", { staticClass: "form-label fw-semibold" }, [
                      _vm._v("Price"),
                    ]),
                    _vm._v(" "),
                    _c("input", {
                      directives: [
                        {
                          name: "model",
                          rawName: "v-model.number",
                          value: plan.price,
                          expression: "plan.price",
                          modifiers: { number: true },
                        },
                      ],
                      staticClass: "form-control form-control-sm",
                      attrs: {
                        type: "number",
                        disabled: plan.saving,
                        min: "0",
                        step: "0.01",
                      },
                      domProps: { value: plan.price },
                      on: {
                        input: function ($event) {
                          if ($event.target.composing) {
                            return
                          }
                          _vm.$set(plan, "price", _vm._n($event.target.value))
                        },
                        blur: function ($event) {
                          return _vm.$forceUpdate()
                        },
                      },
                    }),
                  ]),
                  _vm._v(" "),
                  _c("div", { staticClass: "mb-3" }, [
                    _c("label", { staticClass: "form-label fw-semibold" }, [
                      _vm._v("Interval"),
                    ]),
                    _vm._v(" "),
                    _c(
                      "select",
                      {
                        directives: [
                          {
                            name: "model",
                            rawName: "v-model",
                            value: plan.interval,
                            expression: "plan.interval",
                          },
                        ],
                        staticClass: "form-control form-control-sm",
                        attrs: { disabled: plan.saving },
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
                              plan,
                              "interval",
                              $event.target.multiple
                                ? $$selectedVal
                                : $$selectedVal[0]
                            )
                          },
                        },
                      },
                      [
                        _c("option", { attrs: { value: "monthly" } }, [
                          _vm._v("Monthly"),
                        ]),
                        _vm._v(" "),
                        _c("option", { attrs: { value: "yearly" } }, [
                          _vm._v("Yearly"),
                        ]),
                      ]
                    ),
                  ]),
                  _vm._v(" "),
                  _c("div", { staticClass: "mb-3" }, [
                    _c("label", { staticClass: "form-label fw-semibold" }, [
                      _vm._v("Stripe Price ID (Optional)"),
                    ]),
                    _vm._v(" "),
                    _c("input", {
                      directives: [
                        {
                          name: "model",
                          rawName: "v-model",
                          value: plan.stripe_price_id,
                          expression: "plan.stripe_price_id",
                        },
                      ],
                      staticClass: "form-control form-control-sm",
                      attrs: {
                        type: "text",
                        disabled: plan.saving,
                        placeholder: "price_xxxxx",
                      },
                      domProps: { value: plan.stripe_price_id },
                      on: {
                        input: function ($event) {
                          if ($event.target.composing) {
                            return
                          }
                          _vm.$set(plan, "stripe_price_id", $event.target.value)
                        },
                      },
                    }),
                  ]),
                  _vm._v(" "),
                  _c("div", { staticClass: "mb-3" }, [
                    _c("label", { staticClass: "form-label fw-semibold" }, [
                      _vm._v("Sort Order"),
                    ]),
                    _vm._v(" "),
                    _c("input", {
                      directives: [
                        {
                          name: "model",
                          rawName: "v-model.number",
                          value: plan.sort_order,
                          expression: "plan.sort_order",
                          modifiers: { number: true },
                        },
                      ],
                      staticClass: "form-control form-control-sm",
                      attrs: {
                        type: "number",
                        disabled: plan.saving,
                        min: "0",
                      },
                      domProps: { value: plan.sort_order },
                      on: {
                        input: function ($event) {
                          if ($event.target.composing) {
                            return
                          }
                          _vm.$set(
                            plan,
                            "sort_order",
                            _vm._n($event.target.value)
                          )
                        },
                        blur: function ($event) {
                          return _vm.$forceUpdate()
                        },
                      },
                    }),
                  ]),
                  _vm._v(" "),
                  _c(
                    "div",
                    { staticClass: "mb-3" },
                    [
                      _c("label", { staticClass: "form-label fw-semibold" }, [
                        _vm._v("Included Features"),
                      ]),
                      _vm._v(" "),
                      _vm._l(_vm.featureList, function (feature, i) {
                        return _c("div", { key: i }, [
                          _c(
                            "label",
                            {
                              staticClass: "checkbox checkbox-outline-primary",
                            },
                            [
                              _c("input", {
                                directives: [
                                  {
                                    name: "model",
                                    rawName: "v-model",
                                    value: plan.features,
                                    expression: "plan.features",
                                  },
                                ],
                                attrs: {
                                  type: "checkbox",
                                  disabled: plan.saving,
                                },
                                domProps: {
                                  value: feature,
                                  checked: Array.isArray(plan.features)
                                    ? _vm._i(plan.features, feature) > -1
                                    : plan.features,
                                },
                                on: {
                                  change: function ($event) {
                                    var $$a = plan.features,
                                      $$el = $event.target,
                                      $$c = $$el.checked ? true : false
                                    if (Array.isArray($$a)) {
                                      var $$v = feature,
                                        $$i = _vm._i($$a, $$v)
                                      if ($$el.checked) {
                                        $$i < 0 &&
                                          _vm.$set(
                                            plan,
                                            "features",
                                            $$a.concat([$$v])
                                          )
                                      } else {
                                        $$i > -1 &&
                                          _vm.$set(
                                            plan,
                                            "features",
                                            $$a
                                              .slice(0, $$i)
                                              .concat($$a.slice($$i + 1))
                                          )
                                      }
                                    } else {
                                      _vm.$set(plan, "features", $$c)
                                    }
                                  },
                                },
                              }),
                              _vm._v(" "),
                              _c("span", { staticClass: "features-list" }, [
                                _vm._v(_vm._s(feature)),
                              ]),
                              _vm._v(" "),
                              _c("span", { staticClass: "checkmark" }),
                            ]
                          ),
                        ])
                      }),
                    ],
                    2
                  ),
                  _vm._v(" "),
                  _c("div", { staticClass: "d-flex justify-content-between" }, [
                    _c(
                      "button",
                      {
                        staticClass: "btn btn-outline-danger btn-sm",
                        attrs: { disabled: plan.saving || plan.deleting },
                        on: {
                          click: function ($event) {
                            return _vm.deletePlan(plan)
                          },
                        },
                      },
                      [
                        plan.deleting
                          ? _c("span", {
                              staticClass:
                                "spinner-border spinner-border-sm me-1",
                            })
                          : _vm._e(),
                        _vm._v(
                          "\n            " +
                            _vm._s(plan.deleting ? "Deleting..." : "Delete") +
                            "\n          "
                        ),
                      ]
                    ),
                    _vm._v(" "),
                    _c(
                      "button",
                      {
                        staticClass: "btn btn-outline-success btn-sm",
                        attrs: { disabled: plan.saving },
                        on: {
                          click: function ($event) {
                            return _vm.savePlan(plan)
                          },
                        },
                      },
                      [
                        plan.saving
                          ? _c("span", {
                              staticClass:
                                "spinner-border spinner-border-sm me-1",
                            })
                          : _vm._e(),
                        _vm._v(
                          "\n            " +
                            _vm._s(plan.saving ? "Saving..." : "Save") +
                            "\n          "
                        ),
                      ]
                    ),
                  ]),
                ]),
              ]
            )
          }),
          0
        )
      : _vm._e(),
  ])
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
        _c("i", { staticClass: "fas fa-credit-card" }),
        _vm._v("\n              Subscription Plans\n            "),
      ]
    )
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