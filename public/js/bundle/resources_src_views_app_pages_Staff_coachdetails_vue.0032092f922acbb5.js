"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["resources_src_views_app_pages_Staff_coachdetails_vue"],{

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/Staff/coachdetails.vue?vue&type=script&lang=js":
/*!******************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/Staff/coachdetails.vue?vue&type=script&lang=js ***!
  \******************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! axios */ "./node_modules/axios/index.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_0__);
var _methods;
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t["return"] || t["return"](); } finally { if (u) throw o; } } }; }
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
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
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
  name: "CoachDetails",
  data: function data() {
    return _defineProperty({
      // UI State Management
      activeTab: "profile",
      // Profile as default tab
      activeAction: null,
      isEditing: false,
      // Profile editing mode
      // Removed activeView - using chat interface instead
      isLoading: true,
      // Main loading state
      isSaving: false,
      // Save operation loading state
      profileImageUrl: "https://via.placeholder.com/120x120/4F92F2/FFFFFF?text=Profile",
      profileImageFile: null,
      // Store the File object for upload
      profileImageFileInput: null,
      // Store reference to file input element
      _profileImageFileRef: null,
      // Non-reactive storage for File object (bypasses Vue reactivity issues)
      // Coach/client data object
      client: {
        id: "",
        coach_id: "",
        first_name: "",
        last_name: "",
        name: "",
        profile_image: "",
        gender: "",
        dob: "",
        email: "",
        mobile_phone: "",
        landline_phone: "",
        years_of_experience: "",
        address: "",
        city: "",
        state: "",
        zip: "",
        bio: "",
        weekly_availability: "",
        session_duration: "",
        max_clients_per_day: "",
        payment_plan: "",
        rate_salary: "",
        commission_percent: "",
        // Additional fields to match backend
        coach_experience: "",
        coach_certifications: "",
        // specializations: "",
        height_cm: "",
        weight_kg: "",
        chest_inch: "",
        blood_group: "",
        medical_conditions: "",
        referred_by: "",
        locker_number: "",
        social_media: "",
        notes: "",
        is_trial: false,
        trial_start: "",
        trial_end: "",
        payment_method: "",
        payment_start_date: "",
        bank_account_name: "",
        bank_account_number: "",
        routing_number: "",
        bank_account_type: "",
        bank_name: "",
        payment_notes: ""
      },
      // Original data for change tracking
      originalClientData: {},
      // Track changes made during editing
      changesMade: {},
      // Track fields that have been touched/interacted with
      touchedFields: {},
      // Track if any changes have been made
      hasUnsavedChanges: false,
      // Notes data
      newNote: {
        text: "",
        category: "General",
        is_shared: false
      },
      selectedCategory: "All",
      notes: [],
      loadingNotes: false,
      editingNoteId: null,
      // UI settings for checkboxes in Settings tab
      settings: {
        profileVisible: false,
        contactVisible: false
      },
      // Tab navigation
      tabs: [{
        key: "profile",
        label: "Profile",
        icon: "fas fa-user"
      }, {
        key: "members",
        label: "Members",
        icon: "fas fa-users"
      },
      // {
      //     key: "invoices",
      //     label: "Invoices",
      //     icon: "fas fa-file-invoice-dollar",
      // },
      {
        key: "latestActivities",
        label: "Latest Activities",
        icon: "fas fa-envelope"
      }, {
        key: "notes",
        label: "Notes",
        icon: "fas fa-sticky-note"
      }],
      // Available actions for coach management
      actions: [
      // {
      //     key: "goToProfile",
      //     label: "Edit Profile",
      //     icon: "fa-user-edit",
      // },
      {
        key: "sendMessage",
        label: "Send Message",
        icon: "fa-envelope"
      }, {
        key: "newTask",
        label: "New Task",
        icon: "fa-tasks"
      }, {
        key: "assignMember",
        label: "Assign Member",
        icon: "fa-user-plus"
      }],
      newMessage: {
        body: ""
      },
      coachUserId: null,
      // Store coach's user ID for messaging
      task: {
        title: "",
        category: "",
        priority: "",
        dueDate: "",
        status: "pending",
        description: ""
      },
      members: [],
      assignedMembers: [],
      isAssigningMember: false,
      isCreatingTask: false,
      memberSearch: "",
      memberStatusFilter: "",
      memberPlanFilter: "",
      noMembershipFilter: false,
      selectAllMembers: false,
      filteredMembers: [],
      filteredAssignedMembers: [],
      // Add loading states for members
      isLoadingMembers: false,
      // View mode for assigned members
      viewMode: "table",
      // Task Management
      coachTasks: [],
      // Array of coach tasks
      isLoadingTasks: false,
      // Task loading state
      editingTaskId: null,
      // ID of task being edited

      // Message Management
      messages: [],
      // Array of messages
      isLoadingMessages: false,
      // Message loading state
      isSendingMessage: false,
      // Message sending state
      selectedMessage: null,
      // Currently selected message for viewing
      showMessageModal: false,
      // Modal visibility for viewing message

      // Member Assignment Management
      isLoadingAssignedMembers: false,
      // Assigned members loading state

      // Activities Management
      activities: [],
      // Array of coach activities
      isLoadingActivities: false,
      // Activities loading state

      // Settings Management
      isSavingSettings: false
    }, "settings", {
      accountStatus: "active",
      accountType: "full-time",
      joinDate: "",
      notifications: {
        email: {
          newTasks: true,
          messages: true,
          memberAssignments: true,
          scheduleUpdates: false
        },
        sms: {
          urgentTasks: true,
          scheduleChanges: false
        }
      },
      privacy: {
        profileVisibility: "public",
        contactVisibility: "members-only",
        scheduleVisibility: "members-only"
      },
      workPreferences: {
        defaultSessionDuration: "60",
        maxClientsPerDay: "8",
        workStartTime: "09:00",
        workEndTime: "17:00",
        breakTime: "10"
      },
      payment: {
        paymentMethod: "bank-transfer",
        paymentFrequency: "monthly",
        taxId: ""
      },
      security: {
        twoFactorAuth: false,
        sessionTimeout: "30"
      }
    });
  },
  computed: {
    filteredNotes: function filteredNotes() {
      var _this = this;
      if (!this.notes || this.notes.length === 0) {
        return [];
      }
      if (this.selectedCategory === "All" || !this.selectedCategory) {
        return this.notes;
      }
      return this.notes.filter(function (note) {
        // Handle case-insensitive matching and null categories
        var noteCategory = (note.category || 'General').trim();
        var selectedCategory = (_this.selectedCategory || '').trim();
        return noteCategory === selectedCategory;
      });
    },
    selectedMembers: function selectedMembers() {
      return this.members.filter(function (member) {
        return member.selected;
      });
    },
    // Ensure filteredMembers is always an array
    safeFilteredMembers: function safeFilteredMembers() {
      return Array.isArray(this.filteredMembers) ? this.filteredMembers : [];
    },
    // Assigned members statistics
    activeAssignedMembersCount: function activeAssignedMembersCount() {
      return this.assignedMembers.filter(function (member) {
        return member.status === "Active";
      }).length;
    },
    premiumMembersCount: function premiumMembersCount() {
      return this.assignedMembers.filter(function (member) {
        return member.plan === "Premium" || member.plan === "VIP";
      }).length;
    },
    thisMonthAssignments: function thisMonthAssignments() {
      var now = new Date();
      var thisMonth = now.getMonth();
      var thisYear = now.getFullYear();
      return this.assignedMembers.filter(function (member) {
        if (member.assigned_date) {
          var assignedDate = new Date(member.assigned_date);
          return assignedDate.getMonth() === thisMonth && assignedDate.getFullYear() === thisYear;
        }
        return false;
      }).length;
    }
  },
  methods: (_methods = {
    goBack: function goBack() {
      this.$router.push({
        name: "CoachList"
      });
    },
    // Notes methods
    loadNotes: function loadNotes() {
      var _this2 = this;
      return _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
        var coachId, params, response, _error$response, errorMessage;
        return _regeneratorRuntime().wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              coachId = _this2.$route.params.id;
              if (coachId) {
                _context.next = 3;
                break;
              }
              return _context.abrupt("return");
            case 3:
              _this2.loadingNotes = true;
              _context.prev = 4;
              // Build params object - only include category if not "All"
              params = {};
              if (_this2.selectedCategory && _this2.selectedCategory !== 'All') {
                params.category = _this2.selectedCategory;
              }
              _context.next = 9;
              return axios__WEBPACK_IMPORTED_MODULE_0___default().get("/notes/coach/".concat(coachId), {
                params: params
              });
            case 9:
              response = _context.sent;
              if (response.data && response.data.success && response.data.data) {
                _this2.notes = response.data.data.map(function (note) {
                  return {
                    id: note.id,
                    text: note.text || note.description,
                    description: note.description,
                    category: note.category || 'General',
                    createdAt: note.createdAt || note.created_at,
                    created_at: note.created_at,
                    member_id: note.member_id,
                    coach_id: note.coach_id,
                    is_shared: note.is_shared,
                    member: note.member,
                    coach: note.coach,
                    created_by_user_id: note.created_by_user_id,
                    created_by_user: note.created_by_user
                  };
                });
                console.log('Notes loaded:', _this2.notes.length, 'Selected category:', _this2.selectedCategory);
              } else {
                console.warn('No notes data in response:', response.data);
                _this2.notes = [];
              }
              _context.next = 20;
              break;
            case 13:
              _context.prev = 13;
              _context.t0 = _context["catch"](4);
              console.error('Error loading notes:', _context.t0);
              console.error('Error response:', _context.t0.response);
              _this2.notes = [];
              errorMessage = ((_error$response = _context.t0.response) === null || _error$response === void 0 || (_error$response = _error$response.data) === null || _error$response === void 0 ? void 0 : _error$response.message) || _context.t0.message || 'Failed to load notes';
              _this2.showError(errorMessage);
            case 20:
              _context.prev = 20;
              _this2.loadingNotes = false;
              return _context.finish(20);
            case 23:
            case "end":
              return _context.stop();
          }
        }, _callee, null, [[4, 13, 20, 23]]);
      }))();
    },
    saveNote: function saveNote() {
      var _this3 = this;
      return _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee2() {
        var coachId, noteData, response, _response$data, _error$response2;
        return _regeneratorRuntime().wrap(function _callee2$(_context2) {
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
              if (_this3.newNote.text.trim()) {
                _context2.next = 3;
                break;
              }
              alert("Please enter a note");
              return _context2.abrupt("return");
            case 3:
              coachId = _this3.$route.params.id;
              if (coachId) {
                _context2.next = 7;
                break;
              }
              _this3.showError("No coach ID found");
              return _context2.abrupt("return");
            case 7:
              _context2.prev = 7;
              // Admin creates notes - send target_coach_id to track which coach the note is for
              // coach_id will be null (admin is not a coach)
              noteData = {
                target_coach_id: coachId,
                // Track which coach this note is for
                description: _this3.newNote.text,
                category: _this3.newNote.category || 'General',
                // Ensure category is always set
                is_shared: _this3.newNote.is_shared || false
              };
              console.log('Saving note with data:', noteData);
              console.log('Category value:', _this3.newNote.category);
              if (!_this3.editingNoteId) {
                _context2.next = 17;
                break;
              }
              _context2.next = 14;
              return axios__WEBPACK_IMPORTED_MODULE_0___default().put("/notes/".concat(_this3.editingNoteId), noteData);
            case 14:
              response = _context2.sent;
              _context2.next = 20;
              break;
            case 17:
              _context2.next = 19;
              return axios__WEBPACK_IMPORTED_MODULE_0___default().post('/notes', noteData);
            case 19:
              response = _context2.sent;
            case 20:
              if (!(response.data && response.data.success)) {
                _context2.next = 30;
                break;
              }
              _this3.showSuccess(response.data.message || 'Note saved successfully');
              _this3.newNote.text = "";
              _this3.newNote.category = "General";
              _this3.newNote.is_shared = false;
              _this3.editingNoteId = null;
              _context2.next = 28;
              return _this3.loadNotes();
            case 28:
              _context2.next = 31;
              break;
            case 30:
              _this3.showError(((_response$data = response.data) === null || _response$data === void 0 ? void 0 : _response$data.message) || 'Failed to save note');
            case 31:
              _context2.next = 37;
              break;
            case 33:
              _context2.prev = 33;
              _context2.t0 = _context2["catch"](7);
              console.error('Error saving note:', _context2.t0);
              _this3.showError(((_error$response2 = _context2.t0.response) === null || _error$response2 === void 0 || (_error$response2 = _error$response2.data) === null || _error$response2 === void 0 ? void 0 : _error$response2.message) || 'Failed to save note');
            case 37:
            case "end":
              return _context2.stop();
          }
        }, _callee2, null, [[7, 33]]);
      }))();
    },
    editNote: function editNote(note) {
      this.newNote.text = note.text || note.description;
      this.newNote.category = note.category;
      this.newNote.is_shared = note.is_shared || false;
      this.editingNoteId = note.id;
      // Scroll to the form
      var formElement = document.querySelector('.add-note-section');
      if (formElement) {
        formElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    },
    deleteNote: function deleteNote(noteId) {
      var _this4 = this;
      return _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee3() {
        var result, response, _response$data2, _error$response3;
        return _regeneratorRuntime().wrap(function _callee3$(_context3) {
          while (1) switch (_context3.prev = _context3.next) {
            case 0:
              _context3.prev = 0;
              _context3.next = 3;
              return _this4.$swal({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#d33',
                cancelButtonColor: '#3085d6',
                confirmButtonText: 'Yes, delete it!',
                cancelButtonText: 'Cancel'
              });
            case 3:
              result = _context3.sent;
              if (result.isConfirmed) {
                _context3.next = 6;
                break;
              }
              return _context3.abrupt("return");
            case 6:
              _context3.next = 8;
              return axios__WEBPACK_IMPORTED_MODULE_0___default()["delete"]("/notes/".concat(noteId), {
                baseURL: '' // Use web routes
              });
            case 8:
              response = _context3.sent;
              if (!(response.data && response.data.success)) {
                _context3.next = 15;
                break;
              }
              _this4.$swal({
                title: 'Deleted!',
                text: response.data.message || 'Note has been deleted.',
                icon: 'success',
                timer: 2000,
                showConfirmButton: false
              });
              _context3.next = 13;
              return _this4.loadNotes();
            case 13:
              _context3.next = 16;
              break;
            case 15:
              _this4.showError(((_response$data2 = response.data) === null || _response$data2 === void 0 ? void 0 : _response$data2.message) || 'Failed to delete note');
            case 16:
              _context3.next = 22;
              break;
            case 18:
              _context3.prev = 18;
              _context3.t0 = _context3["catch"](0);
              console.error('Error deleting note:', _context3.t0);
              _this4.showError(((_error$response3 = _context3.t0.response) === null || _error$response3 === void 0 || (_error$response3 = _error$response3.data) === null || _error$response3 === void 0 ? void 0 : _error$response3.message) || 'Failed to delete note');
            case 22:
            case "end":
              return _context3.stop();
          }
        }, _callee3, null, [[0, 18]]);
      }))();
    },
    formatDate: function formatDate(dateString) {
      var date = new Date(dateString);
      return date.toLocaleDateString();
    },
    copyToClipboard: function copyToClipboard(text, type) {
      var _this5 = this;
      return _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee4() {
        var textArea;
        return _regeneratorRuntime().wrap(function _callee4$(_context4) {
          while (1) switch (_context4.prev = _context4.next) {
            case 0:
              if (!(!text || text === 'N/A')) {
                _context4.next = 3;
                break;
              }
              _this5.showError("No ".concat(type.toLowerCase(), " available to copy"));
              return _context4.abrupt("return");
            case 3:
              _context4.prev = 3;
              _context4.next = 6;
              return navigator.clipboard.writeText(text);
            case 6:
              _this5.showSuccess("".concat(type, " copied to clipboard: ").concat(text));
              _context4.next = 17;
              break;
            case 9:
              _context4.prev = 9;
              _context4.t0 = _context4["catch"](3);
              // Fallback for older browsers
              textArea = document.createElement('textarea');
              textArea.value = text;
              document.body.appendChild(textArea);
              textArea.select();
              try {
                document.execCommand('copy');
                _this5.showSuccess("".concat(type, " copied to clipboard: ").concat(text));
              } catch (fallbackError) {
                _this5.showError("Failed to copy ".concat(type.toLowerCase()));
              }
              document.body.removeChild(textArea);
            case 17:
            case "end":
              return _context4.stop();
          }
        }, _callee4, null, [[3, 9]]);
      }))();
    },
    // Additional notes methods
    clearForm: function clearForm() {
      this.newNote.text = "";
      this.newNote.category = "General";
    },
    confirmDelete: function confirmDelete(noteId) {
      this.deleteNote(noteId);
    },
    // Settings methods
    updateSettings: function updateSettings() {
      var _this6 = this;
      this.isSaving = true;
      // Simulate API call
      setTimeout(function () {
        _this6.isSaving = false;
        alert("Settings saved successfully!");
      }, 1000);
    },
    resetSettings: function resetSettings() {
      if (confirm("Are you sure you want to reset all settings to default?")) {
        // Reset settings to default values
        this.settings = {
          accountStatus: "active",
          accountType: "full-time",
          notifications: {
            email: {
              newTasks: true,
              messages: true,
              memberAssignments: true,
              scheduleUpdates: true
            },
            sms: {
              urgentTasks: true,
              scheduleChanges: false
            }
          }
        };
        alert("Settings reset to defaults!");
      }
    },
    // Navigation methods
    goToProfile: function goToProfile() {
      this.showComingSoon('Go to Profile');
    },
    convertCoachToMember: function convertCoachToMember() {
      var _this7 = this;
      return _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee5() {
        var coachId, result, response, _error$response4, _error$response5, _error$response6, errors, errorMessages;
        return _regeneratorRuntime().wrap(function _callee5$(_context5) {
          while (1) switch (_context5.prev = _context5.next) {
            case 0:
              _context5.prev = 0;
              coachId = _this7.$route.params.id;
              if (coachId) {
                _context5.next = 5;
                break;
              }
              _this7.showError("No coach ID found");
              return _context5.abrupt("return");
            case 5:
              _context5.next = 7;
              return _this7.$swal({
                title: 'Convert Coach to Member',
                text: "Are you sure you want to convert ".concat(_this7.client.first_name, " ").concat(_this7.client.last_name, " from a coach to a member? This action cannot be undone."),
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, convert to member',
                cancelButtonText: 'Cancel'
              });
            case 7:
              result = _context5.sent;
              if (result.isConfirmed) {
                _context5.next = 10;
                break;
              }
              return _context5.abrupt("return");
            case 10:
              // Show loading state
              _this7.$swal({
                title: 'Converting...',
                html: '<div style="text-align: center;"><div style="border: 4px solid #f3f3f3; border-top: 4px solid #dc3545; border-radius: 50%; width: 40px; height: 40px; animation: spin 1s linear infinite; margin: 0 auto 15px;"></div><p>Please wait while we convert the coach to a member...</p></div><style>@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }</style>',
                allowOutsideClick: false,
                allowEscapeKey: false,
                showConfirmButton: false
              });

              // Call the API to convert coach to member
              _context5.next = 13;
              return axios__WEBPACK_IMPORTED_MODULE_0___default().post("coaches/".concat(coachId, "/convert-to-member"));
            case 13:
              response = _context5.sent;
              if (response.data.status === 'success') {
                // Show success message
                _this7.$swal({
                  title: 'Success!',
                  text: 'Coach has been successfully converted to a member.',
                  icon: 'success',
                  confirmButtonText: 'View Members'
                }).then(function () {
                  // Navigate to ViewAllMembers page
                  _this7.$router.push('/app/Members/ViewAllMembers');
                });
              } else {
                _this7.showError(response.data.message || 'Failed to convert coach to member');
              }
              _context5.next = 21;
              break;
            case 17:
              _context5.prev = 17;
              _context5.t0 = _context5["catch"](0);
              console.error('Error converting coach to member:', _context5.t0);
              if (((_error$response4 = _context5.t0.response) === null || _error$response4 === void 0 ? void 0 : _error$response4.status) === 422 && (_error$response5 = _context5.t0.response) !== null && _error$response5 !== void 0 && (_error$response5 = _error$response5.data) !== null && _error$response5 !== void 0 && _error$response5.errors) {
                errors = _context5.t0.response.data.errors;
                errorMessages = Object.keys(errors).map(function (field) {
                  return "".concat(field, ": ").concat(errors[field].join(', '));
                }).join('\n');
                _this7.showError("Validation errors:\n".concat(errorMessages));
              } else if ((_error$response6 = _context5.t0.response) !== null && _error$response6 !== void 0 && (_error$response6 = _error$response6.data) !== null && _error$response6 !== void 0 && _error$response6.message) {
                _this7.showError("Error: ".concat(_context5.t0.response.data.message));
              } else {
                _this7.showError('Error converting coach to member. Please try again.');
              }
            case 21:
            case "end":
              return _context5.stop();
          }
        }, _callee5, null, [[0, 17]]);
      }))();
    },
    unsubscribeCoach: function unsubscribeCoach() {
      var _this8 = this;
      return _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee6() {
        var coachId, result, response, _error$response7, _error$response8, _error$response9, errors, errorMessages;
        return _regeneratorRuntime().wrap(function _callee6$(_context6) {
          while (1) switch (_context6.prev = _context6.next) {
            case 0:
              _context6.prev = 0;
              coachId = _this8.$route.params.id;
              if (coachId) {
                _context6.next = 5;
                break;
              }
              _this8.showError("No coach ID found");
              return _context6.abrupt("return");
            case 5:
              _context6.next = 7;
              return _this8.$swal({
                title: 'Unsubscribe Coach',
                text: "Are you sure you want to unsubscribe ".concat(_this8.client.first_name, " ").concat(_this8.client.last_name, "? This will deactivate their coach account."),
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#d33',
                cancelButtonColor: '#3085d6',
                confirmButtonText: 'Yes, unsubscribe',
                cancelButtonText: 'Cancel'
              });
            case 7:
              result = _context6.sent;
              if (result.isConfirmed) {
                _context6.next = 10;
                break;
              }
              return _context6.abrupt("return");
            case 10:
              // Show loading state
              _this8.$swal({
                title: 'Unsubscribing...',
                html: '<div style="text-align: center;"><div style="border: 4px solid #f3f3f3; border-top: 4px solid #dc3545; border-radius: 50%; width: 40px; height: 40px; animation: spin 1s linear infinite; margin: 0 auto 15px;"></div><p>Please wait while we unsubscribe the coach...</p></div><style>@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }</style>',
                allowOutsideClick: false,
                allowEscapeKey: false,
                showConfirmButton: false
              });

              // Call the API to unsubscribe coach
              _context6.next = 13;
              return axios__WEBPACK_IMPORTED_MODULE_0___default().post("coaches/".concat(coachId, "/unsubscribe"));
            case 13:
              response = _context6.sent;
              if (response.data.status === 'success') {
                // Show success message
                _this8.$swal({
                  title: 'Success!',
                  text: 'Coach has been successfully unsubscribed.',
                  icon: 'success',
                  confirmButtonText: 'OK'
                }).then(function () {
                  // Navigate back to coach list
                  _this8.$router.push('/app/Staff/coachlist');
                });
              } else {
                _this8.showError(response.data.message || 'Failed to unsubscribe coach');
              }
              _context6.next = 21;
              break;
            case 17:
              _context6.prev = 17;
              _context6.t0 = _context6["catch"](0);
              console.error('Error unsubscribing coach:', _context6.t0);
              if (((_error$response7 = _context6.t0.response) === null || _error$response7 === void 0 ? void 0 : _error$response7.status) === 422 && (_error$response8 = _context6.t0.response) !== null && _error$response8 !== void 0 && (_error$response8 = _error$response8.data) !== null && _error$response8 !== void 0 && _error$response8.errors) {
                errors = _context6.t0.response.data.errors;
                errorMessages = Object.keys(errors).map(function (field) {
                  return "".concat(field, ": ").concat(errors[field].join(', '));
                }).join('\n');
                _this8.showError("Validation errors:\n".concat(errorMessages));
              } else if ((_error$response9 = _context6.t0.response) !== null && _error$response9 !== void 0 && (_error$response9 = _error$response9.data) !== null && _error$response9 !== void 0 && _error$response9.message) {
                _this8.showError("Error: ".concat(_context6.t0.response.data.message));
              } else {
                _this8.showError('Error unsubscribing coach. Please try again.');
              }
            case 21:
            case "end":
              return _context6.stop();
          }
        }, _callee6, null, [[0, 17]]);
      }))();
    },
    // Reusable coming soon message method
    showComingSoon: function showComingSoon(featureName) {
      this.$swal({
        title: "Coming Soon!",
        text: "".concat(featureName, " feature is currently under development and will be available soon."),
        icon: "info",
        confirmButtonText: "OK",
        confirmButtonColor: "#4f92f2",
        showCloseButton: true,
        timer: 3000,
        timerProgressBar: true
      });
    },
    goToChat: function goToChat() {
      // Switch to Send Message tab
      this.activeTab = "sendMessage";
    },
    goToCoachList: function goToCoachList() {
      this.$router.push("/app/Staff/coachlist");
    },
    goToSchedule: function goToSchedule() {
      this.activeTab = "schedule";
    },
    goToWorkout: function goToWorkout() {
      this.activeTab = "workout";
    },
    goToProgressTracker: function goToProgressTracker() {
      this.activeTab = "progress";
    },
    goToMealPlan: function goToMealPlan() {
      this.activeTab = "Meal Plan";
    },
    goToChallenge: function goToChallenge() {
      this.activeTab = "Challenge";
    },
    // Open Notes section
    openNotes: function openNotes() {
      this.activeAction = 'notes';
      this.activeTab = 'notes';
    },
    // Get formatted coach ID
    getFormattedCoachId: function getFormattedCoachId() {
      // If coach_id exists and is already formatted, use it
      if (this.client.coach_id && this.client.coach_id.startsWith('C-')) {
        return this.client.coach_id;
      }

      // If we have an ID, format it as C-0000X
      if (this.client.id) {
        return "C-".concat(this.client.id.toString().padStart(5, '0'));
      }

      // Fallback
      return 'C-00000';
    },
    // Helper method to format date for HTML date input (YYYY-MM-DD)
    formatDateForInput: function formatDateForInput(dateString) {
      if (!dateString) return null;

      // If it's already in YYYY-MM-DD format, return as is
      if (typeof dateString === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(dateString)) {
        return dateString;
      }

      // If it's a date object or other format, convert to YYYY-MM-DD
      var date = new Date(dateString);
      if (isNaN(date.getTime())) return null;
      var year = date.getFullYear();
      var month = String(date.getMonth() + 1).padStart(2, '0');
      var day = String(date.getDate()).padStart(2, '0');
      return "".concat(year, "-").concat(month, "-").concat(day);
    },
    // Profile image handling
    getProfileImageUrl: function getProfileImageUrl(profileImage) {
      // Guard against undefined, null, or empty values
      if (!profileImage || profileImage === "undefined" || profileImage === "null" || profileImage === "") {
        // If we have a preview URL from file selection, use it
        if (this.profileImageUrl && this.profileImageUrl.startsWith('blob:')) {
          return this.profileImageUrl;
        }
        return "/images/default-profile.jpg";
      }

      // Check for base64 data URL BEFORE normalization (to preserve the full data URL)
      if (String(profileImage).startsWith("data:image/")) {
        return profileImage;
      }

      // Check for blob URL (preview from file selection)
      if (String(profileImage).startsWith("blob:") || this.profileImageUrl && this.profileImageUrl.startsWith('blob:')) {
        return this.profileImageUrl || profileImage;
      }

      // Normalize the path: trim whitespace, replace escaped slashes, and clean up
      var normalizedPath = String(profileImage).trim().replace(/\\\//g, '/') // Replace escaped slashes
      .replace(/\/+/g, '/') // Replace multiple slashes with single slash
      .replace(/^\/+|\/+$/g, ''); // Remove leading/trailing slashes

      // If normalized path is empty after cleaning, return default
      if (!normalizedPath) {
        // If we have a preview URL from file selection, use it
        if (this.profileImageUrl && this.profileImageUrl.startsWith('blob:')) {
          return this.profileImageUrl;
        }
        return "/images/default-profile.jpg";
      }

      // If it's already a full HTTP/HTTPS URL, return it
      if (normalizedPath.startsWith("http://") || normalizedPath.startsWith("https://")) {
        return normalizedPath;
      }

      // If it starts with storage/ (without leading slash), add leading slash
      if (normalizedPath.startsWith("storage/")) {
        return "/" + normalizedPath;
      }

      // If it starts with /storage/, return it as is (backward compatibility for legacy data)
      if (normalizedPath.startsWith("/storage/")) {
        return normalizedPath.replace(/\/+/g, '/'); // Clean up any double slashes
      }

      // If it starts with just /, it's an absolute path, return it
      if (normalizedPath.startsWith("/")) {
        return normalizedPath.replace(/\/+/g, '/'); // Clean up any double slashes
      }

      // If it's a relative path (e.g., "coaches/filename.jpg"), prepend /storage/
      // This matches Laravel's standard: store "coaches/filename.jpg" in DB, access via "/storage/coaches/filename.jpg"
      var finalPath = "/storage/" + normalizedPath;
      console.log("🖼️ Profile Image URL:", {
        original: profileImage,
        normalized: normalizedPath,
        "final": finalPath
      });
      return finalPath;
    },
    // Get member profile image URL - handles member images stored in /images/avatar/
    getMemberImageUrl: function getMemberImageUrl(profileImage) {
      // Guard against undefined, null, or empty values
      if (!profileImage || profileImage === "undefined" || profileImage === "null" || profileImage === "") {
        return "/images/avatar/no_avatar.png";
      }

      // Check for base64 data URL
      if (String(profileImage).startsWith("data:image/")) {
        return profileImage;
      }

      // Check for blob URL
      if (String(profileImage).startsWith("blob:")) {
        return profileImage;
      }

      // Normalize the path
      var normalizedPath = String(profileImage).trim().replace(/\\\//g, '/').replace(/\/+/g, '/');

      // If it's already a full HTTP/HTTPS URL, return it
      if (normalizedPath.startsWith("http://") || normalizedPath.startsWith("https://")) {
        return normalizedPath;
      }

      // If it's already a full path starting with /images/avatar/, return it
      if (normalizedPath.startsWith("/images/avatar/")) {
        return normalizedPath;
      }

      // If it starts with /storage/, use getProfileImageUrl for coach-style images
      if (normalizedPath.startsWith("/storage/") || normalizedPath.startsWith("storage/")) {
        return this.getProfileImageUrl(profileImage);
      }

      // If it starts with just /, it's an absolute path, return it
      if (normalizedPath.startsWith("/")) {
        return normalizedPath;
      }

      // Otherwise, it's just a filename - prepend /images/avatar/
      // Member images are stored as filenames in /images/avatar/ directory
      return "/images/avatar/" + normalizedPath;
    },
    // Form Control Methods
    addNewCoach: function addNewCoach() {
      this.$router.push("/coaches/add");
    },
    toggleEditMode: function toggleEditMode() {
      var _this9 = this;
      // Check if we're on the Profile tab
      if (this.activeTab !== 'profile') {
        // If not on Profile tab, switch to Profile tab first
        this.activeTab = 'profile';
        // Show a message to inform the user
        this.showSuccess('Switched to Profile tab for editing');
        // Wait a moment for the tab to switch, then enable edit mode
        this.$nextTick(function () {
          _this9.isEditing = true;
        });
        return;
      }

      // If we're already on Profile tab, proceed with normal edit mode toggle
      if (this.isEditing) {
        // If currently editing, save the changes
        this.saveProfile();
      } else {
        // If not editing, enable edit mode
        this.isEditing = true;
        // Don't reset change tracking when entering edit mode
        // Only reset when exiting edit mode or after successful save
      }
    },
    cancelEdit: function cancelEdit() {
      this.isEditing = false;
      // Reset form data to original values
      this.client = JSON.parse(JSON.stringify(this.originalClientData));
      this.changesMade = {};
      this.touchedFields = {};
      this.hasUnsavedChanges = false;
      // Clear any selected profile image file
      this.profileImageFile = null;
      this._profileImageFileRef = null;
      this.profileImageUrl = null;
      if (this.profileImageFileInput && this.profileImageFileInput.parentNode) {
        this.profileImageFileInput.parentNode.removeChild(this.profileImageFileInput);
      }
      this.profileImageFileInput = null;
    },
    // Track changes made to form fields
    trackChange: function trackChange(field, value) {
      if (this.isEditing) {
        // Mark field as touched
        this.$set(this.touchedFields, field, true);
        var originalValue = this.originalClientData[field];
        if (originalValue !== value) {
          this.$set(this.changesMade, field, {
            original: originalValue,
            "new": value
          });
        } else {
          // Remove from changes if value matches original
          this.$delete(this.changesMade, field);
        }

        // Always enable save when any field is interacted with
        this.hasUnsavedChanges = true;
      }
    },
    // Track when a field is touched (focused/blurred)
    trackFieldTouch: function trackFieldTouch(field) {
      if (this.isEditing) {
        this.$set(this.touchedFields, field, true);
        // Always enable save when any field is touched
        this.hasUnsavedChanges = true;
      }
    },
    // Get list of changed fields for display
    getChangedFields: function getChangedFields() {
      var _this10 = this;
      return Object.keys(this.changesMade).map(function (field) {
        return {
          field: field,
          label: _this10.getFieldLabel(field),
          original: _this10.changesMade[field].original,
          "new": _this10.changesMade[field]["new"]
        };
      });
    },
    // Get human-readable field labels
    getFieldLabel: function getFieldLabel(field) {
      var labels = {
        first_name: 'First Name',
        last_name: 'Last Name',
        email: 'Email',
        mobile_phone: 'Mobile Phone',
        landline_phone: 'Landline Phone',
        gender: 'Gender',
        dob: 'Date of Birth',
        address: 'Address',
        city: 'City',
        state: 'State',
        zip: 'ZIP Code',
        bio: 'Bio',
        weekly_availability: 'Weekly Availability',
        session_duration: 'Session Duration',
        max_clients_per_day: 'Max Clients Per Day',
        payment_plan: 'Payment Plan',
        rate_salary: 'Rate/Salary',
        commission_percent: 'Commission Percentage',
        bank_account_name: 'Bank Account Name',
        bank_account_number: 'Bank Account Number',
        routing_number: 'Routing Number',
        bank_account_type: 'Bank Account Type',
        bank_name: 'Bank Name',
        profile_image: 'Profile Image'
      };
      return labels[field] || field.replace(/_/g, ' ').replace(/\b\w/g, function (l) {
        return l.toUpperCase();
      });
    },
    saveProfile: function saveProfile() {
      var _this11 = this;
      return _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee7() {
        var coachId, emailRegex, updateData, hasValue, hasChanged, requiredFields, optionalFields, missingFields, hasChanges, hasTouchedFields, _hasNewImage, response, updatedClient, _error$response10, _error$response11, _error$response12, _error$response14, errors, errorMessages, _error$response13;
        return _regeneratorRuntime().wrap(function _callee7$(_context7) {
          while (1) switch (_context7.prev = _context7.next) {
            case 0:
              _context7.prev = 0;
              _this11.isSaving = true;
              coachId = _this11.$route.params.id;
              if (coachId) {
                _context7.next = 6;
                break;
              }
              _this11.showError("No coach ID found");
              return _context7.abrupt("return");
            case 6:
              if (!(!_this11.client.first_name || !_this11.client.last_name || !_this11.client.email)) {
                _context7.next = 9;
                break;
              }
              _this11.showError("Please fill in all required fields (First Name, Last Name, Email)");
              return _context7.abrupt("return");
            case 9:
              if (_this11.client.mobile_phone) {
                _context7.next = 12;
                break;
              }
              _this11.showError("Mobile phone is required");
              return _context7.abrupt("return");
            case 12:
              if (_this11.client.address) {
                _context7.next = 15;
                break;
              }
              _this11.showError("Address is required");
              return _context7.abrupt("return");
            case 15:
              if (_this11.client.city) {
                _context7.next = 18;
                break;
              }
              _this11.showError("City is required");
              return _context7.abrupt("return");
            case 18:
              if (_this11.client.state) {
                _context7.next = 21;
                break;
              }
              _this11.showError("State is required");
              return _context7.abrupt("return");
            case 21:
              if (_this11.client.zip) {
                _context7.next = 24;
                break;
              }
              _this11.showError("ZIP code is required");
              return _context7.abrupt("return");
            case 24:
              // Validate email format
              emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
              if (emailRegex.test(_this11.client.email)) {
                _context7.next = 28;
                break;
              }
              _this11.showError("Please enter a valid email address");
              return _context7.abrupt("return");
            case 28:
              // Prepare the data for update - only send fields that have been changed
              updateData = {}; // Helper function to check if a field has a meaningful value
              hasValue = function hasValue(value) {
                return value !== null && value !== undefined && value !== '';
              }; // Helper function to check if a field has changed
              hasChanged = function hasChanged(fieldName) {
                var currentValue = _this11.client[fieldName];
                var originalValue = _this11.originalClientData[fieldName];
                return currentValue !== originalValue;
              }; // Define required fields that must always be sent
              requiredFields = ['first_name', 'last_name', 'email', 'mobile_phone', 'address', 'city', 'state', 'zip']; // Define all other fields
              optionalFields = ['landline_phone', 'dob', 'gender', 'bio', 'weekly_availability', 'session_duration', 'payment_plan', 'rate_salary', 'commission_percent', 'max_clients_per_day', 'height_cm', 'weight_kg', 'chest_inch', 'blood_group', 'medical_conditions', 'referred_by', 'locker_number', 'social_media', 'notes', 'is_trial', 'trial_start', 'trial_end', 'payment_method', 'payment_start_date', 'bank_account_name', 'bank_account_number', 'routing_number', 'bank_account_type', 'bank_name', 'payment_notes', 'coach_experience', 'coach_certifications', 'specializations']; // Always include required fields
              requiredFields.forEach(function (field) {
                updateData[field] = _this11.client[field] || '';
              });

              // Include optional fields only if they have changed
              optionalFields.forEach(function (field) {
                // Include fields if they have changed
                if (hasChanged(field)) {
                  if (field === 'max_clients_per_day') {
                    updateData[field] = parseInt(_this11.client[field]) || 0;
                  } else if (field === 'height_cm' || field === 'weight_kg' || field === 'chest_inch' || field === 'rate_salary' || field === 'commission_percent') {
                    updateData[field] = parseFloat(_this11.client[field]) || 0;
                  } else if (field === 'is_trial') {
                    updateData[field] = _this11.client[field] ? 1 : 0;
                  } else {
                    updateData[field] = _this11.client[field] || '';
                  }
                }
              });

              // Check if any required fields are missing or empty
              missingFields = [];
              if (!updateData.first_name || updateData.first_name.trim() === '') missingFields.push('first_name');
              if (!updateData.last_name || updateData.last_name.trim() === '') missingFields.push('last_name');
              if (!updateData.mobile_phone || updateData.mobile_phone.trim() === '') missingFields.push('mobile_phone');
              if (!updateData.email || updateData.email.trim() === '') missingFields.push('email');
              if (!updateData.address || updateData.address.trim() === '') missingFields.push('address');
              if (!updateData.city || updateData.city.trim() === '') missingFields.push('city');
              if (!updateData.state || updateData.state.trim() === '') missingFields.push('state');
              if (!updateData.zip || updateData.zip.trim() === '') missingFields.push('zip');

              // Check if there are actual changes or touched fields
              hasChanges = Object.keys(_this11.changesMade).length > 0;
              hasTouchedFields = Object.keys(_this11.touchedFields).length > 0; // Check if profile_image is a base64 string (new image selected)
              _hasNewImage = _this11.client.profile_image && typeof _this11.client.profile_image === 'string' && _this11.client.profile_image.startsWith('data:image/'); // Add profile_image to updateData if it exists (matching MemberDetails.vue approach)
              if (_this11.client.profile_image) {
                updateData.profile_image = _this11.client.profile_image;
              }

              // Add all other client fields to updateData
              // Coach-specific fields
              if (_this11.client.coach_experience) updateData.coach_experience = _this11.client.coach_experience;
              if (_this11.client.coach_certifications) updateData.coach_certifications = _this11.client.coach_certifications;
              if (_this11.client.specializations) updateData.specializations = _this11.client.specializations;

              // Physical measurements
              if (_this11.client.height_cm !== undefined && _this11.client.height_cm !== null) updateData.height_cm = _this11.client.height_cm;
              if (_this11.client.weight_kg !== undefined && _this11.client.weight_kg !== null) updateData.weight_kg = _this11.client.weight_kg;
              if (_this11.client.chest_inch !== undefined && _this11.client.chest_inch !== null) updateData.chest_inch = _this11.client.chest_inch;
              if (_this11.client.blood_group) updateData.blood_group = _this11.client.blood_group;
              if (_this11.client.medical_conditions) updateData.medical_conditions = _this11.client.medical_conditions;

              // Additional info
              if (_this11.client.referred_by) updateData.referred_by = _this11.client.referred_by;
              if (_this11.client.locker_number) updateData.locker_number = _this11.client.locker_number;
              if (_this11.client.bio) updateData.bio = _this11.client.bio;
              if (_this11.client.social_media) updateData.social_media = _this11.client.social_media;
              if (_this11.client.notes) updateData.notes = _this11.client.notes;

              // Availability/Schedule
              if (_this11.client.weekly_availability) updateData.weekly_availability = _this11.client.weekly_availability;
              if (_this11.client.session_duration) updateData.session_duration = _this11.client.session_duration;
              if (_this11.client.max_clients_per_day !== undefined && _this11.client.max_clients_per_day !== null) {
                updateData.max_clients_per_day = parseInt(_this11.client.max_clients_per_day) || 0;
              }

              // Payment info
              if (_this11.client.is_trial !== undefined) updateData.is_trial = _this11.client.is_trial ? 1 : 0;
              if (_this11.client.trial_start) updateData.trial_start = _this11.client.trial_start;
              if (_this11.client.trial_end) updateData.trial_end = _this11.client.trial_end;
              if (_this11.client.payment_plan) updateData.payment_plan = _this11.client.payment_plan;
              if (_this11.client.payment_method) updateData.payment_method = _this11.client.payment_method;
              if (_this11.client.rate_salary !== undefined && _this11.client.rate_salary !== null) {
                updateData.rate_salary = parseFloat(_this11.client.rate_salary) || 0;
              }
              if (_this11.client.commission_percent !== undefined && _this11.client.commission_percent !== null) {
                updateData.commission_percent = parseFloat(_this11.client.commission_percent) || 0;
              }
              if (_this11.client.payment_start_date) updateData.payment_start_date = _this11.client.payment_start_date;

              // Bank details - always include to allow clearing them
              updateData.bank_account_name = _this11.client.bank_account_name || '';
              updateData.bank_account_number = _this11.client.bank_account_number || '';
              updateData.routing_number = _this11.client.routing_number || '';
              updateData.bank_account_type = _this11.client.bank_account_type || '';
              updateData.bank_name = _this11.client.bank_name || '';
              if (_this11.client.payment_notes) updateData.payment_notes = _this11.client.payment_notes;

              // Send as JSON (matching MemberDetails.vue approach)
              _context7.next = 80;
              return axios__WEBPACK_IMPORTED_MODULE_0___default().put("coaches/".concat(coachId), updateData, {
                headers: {
                  'Content-Type': 'application/json'
                }
              });
            case 80:
              response = _context7.sent;
              if (!(response.data.status === "success")) {
                _context7.next = 104;
                break;
              }
              _this11.isEditing = false;

              // Show success message
              _this11.showSuccess("Profile updated successfully!");

              // Reset change tracking
              _this11.changesMade = {};
              _this11.touchedFields = {};
              _this11.hasUnsavedChanges = false;

              // Update the client data with the response data immediately
              if (!response.data.coach) {
                _context7.next = 100;
                break;
              }
              // Create a clean merge of response data with current client data
              updatedClient = _objectSpread({}, _this11.client); // Update all fields from response to ensure database state is reflected
              Object.keys(response.data.coach).forEach(function (key) {
                var serverValue = response.data.coach[key];
                if (key === 'dob' || key === 'trial_start' || key === 'trial_end' || key === 'payment_start_date') {
                  // Format date fields properly, even if null
                  updatedClient[key] = serverValue ? _this11.formatDateForInput(serverValue) : null;
                } else {
                  // Update all other fields, including null values
                  updatedClient[key] = serverValue;
                }
              });

              // Handle profile image - update from server response (matching MemberDetails.vue approach)
              if (response.data.coach.profile_image !== undefined) {
                // Always use the server response for the image path after upload
                updatedClient.profile_image = response.data.coach.profile_image;
                // Clear the preview URL since we now have the server path
                _this11.profileImageUrl = null;
              }

              // Update the client data
              _this11.client = updatedClient;

              // Update original data for change tracking
              _this11.originalClientData = JSON.parse(JSON.stringify(_this11.client));

              // Clear profile image preview after successful save
              if (_hasNewImage) {
                _this11.profileImageUrl = null;
                if (_this11.profileImageFileInput && _this11.profileImageFileInput.parentNode) {
                  _this11.profileImageFileInput.parentNode.removeChild(_this11.profileImageFileInput);
                }
                _this11.profileImageFileInput = null;
              }

              // Force Vue reactivity update
              _this11.$forceUpdate();

              // Refresh data from server after image upload to ensure consistency
              if (!_hasNewImage) {
                _context7.next = 98;
                break;
              }
              _context7.next = 98;
              return _this11.fetchClientData();
            case 98:
              _context7.next = 102;
              break;
            case 100:
              _context7.next = 102;
              return _this11.fetchClientData();
            case 102:
              _context7.next = 105;
              break;
            case 104:
              _this11.showError("Failed to update profile");
            case 105:
              _context7.next = 112;
              break;
            case 107:
              _context7.prev = 107;
              _context7.t0 = _context7["catch"](0);
              // Enhanced error logging for debugging
              console.error('Error updating coach profile:', _context7.t0);
              if (hasNewImage) {
                console.error('Profile image upload failed. Image is base64:', _this11.client.profile_image ? _this11.client.profile_image.substring(0, 50) + '...' : 'null');
              }

              // Show specific validation errors if available
              if (((_error$response10 = _context7.t0.response) === null || _error$response10 === void 0 ? void 0 : _error$response10.status) === 422 && (_error$response11 = _context7.t0.response) !== null && _error$response11 !== void 0 && (_error$response11 = _error$response11.data) !== null && _error$response11 !== void 0 && _error$response11.errors) {
                errors = _context7.t0.response.data.errors;
                errorMessages = Object.keys(errors).map(function (field) {
                  return "".concat(field, ": ").concat(errors[field].join(', '));
                }).join('\n');
                _this11.showError("Validation errors:\n".concat(errorMessages));
              } else if (((_error$response12 = _context7.t0.response) === null || _error$response12 === void 0 ? void 0 : _error$response12.status) === 500) {
                _this11.showError("Server error: ".concat(((_error$response13 = _context7.t0.response) === null || _error$response13 === void 0 || (_error$response13 = _error$response13.data) === null || _error$response13 === void 0 ? void 0 : _error$response13.message) || 'Internal server error occurred'));
              } else if ((_error$response14 = _context7.t0.response) !== null && _error$response14 !== void 0 && (_error$response14 = _error$response14.data) !== null && _error$response14 !== void 0 && _error$response14.message) {
                _this11.showError("Error: ".concat(_context7.t0.response.data.message));
              } else if (_context7.t0.message) {
                _this11.showError("Network error: ".concat(_context7.t0.message));
              } else {
                _this11.showError("Error updating profile. Please try again.");
              }
            case 112:
              _context7.prev = 112;
              _this11.isSaving = false;
              return _context7.finish(112);
            case 115:
            case "end":
              return _context7.stop();
          }
        }, _callee7, null, [[0, 107, 112, 115]]);
      }))();
    },
    getActionIcon: function getActionIcon(action) {
      var actionMap = {
        goToProfile: "fa-user-edit",
        sendMessage: "fa-envelope",
        newTask: "fa-tasks",
        assignMember: "fa-user-plus"
      };
      return actionMap[action] || "fa-cog";
    },
    getActionTitle: function getActionTitle(action) {
      var titleMap = {
        goToProfile: "Edit Profile",
        sendMessage: "Send Message",
        newTask: "Create New Task",
        assignMember: "Assign Member"
      };
      return titleMap[action] || "Action";
    },
    /**
     * Handle clicking on profile image container in edit mode
     * Creates a new file input programmatically
     */
    handleProfileImageClick: function handleProfileImageClick() {
      var _this12 = this;
      if (this.isEditing) {
        // Create a new file input element programmatically
        var fileInput = document.createElement('input');
        fileInput.type = 'file';
        fileInput.accept = 'image/*';
        fileInput.style.display = 'none';

        // Store reference to file input
        this.profileImageFileInput = fileInput;

        // Add event listener
        fileInput.addEventListener('change', function (event) {
          _this12.handleImageUpload(event);
          // Don't remove immediately - keep reference until save
          // document.body.removeChild(fileInput);
        });

        // Add to DOM temporarily
        document.body.appendChild(fileInput);

        // Trigger the file selection
        fileInput.click();
      }
    },
    /**
     * Handle profile image upload
     * Creates a preview URL for the selected image
     * @param {Event} event - File input change event
     */
    handleImageUpload: function handleImageUpload(event) {
      var _this13 = this;
      var file = event.target.files[0];
      if (file) {
        // Validate file type
        if (!file.type.startsWith('image/')) {
          alert('Please select a valid image file.');
          return;
        }

        // Validate file size (max 5MB)
        if (file.size > 5 * 1024 * 1024) {
          alert('Image size should be less than 5MB.');
          return;
        }

        // Convert file to base64 for storage (matching MemberDetails.vue approach)
        var reader = new FileReader();
        reader.onload = function (e) {
          // Store the base64 data URL directly in client.profile_image
          // This matches the approach used in MemberDetails.vue
          _this13.client.profile_image = e.target.result;
          // Also store for preview
          _this13.profileImageUrl = e.target.result;
          console.log('Profile image converted to base64 and stored');
        };
        reader.readAsDataURL(file);

        // Show success message
        this.showSuccess('Profile image selected. Click Save to upload.');
      } else {
        console.warn('No file selected in handleImageUpload');
      }
    },
    saveTask: function saveTask() {
      var _this14 = this;
      return _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee8() {
        var coachId, taskData, response, action, wasEditing, editingTaskId, errorMessages;
        return _regeneratorRuntime().wrap(function _callee8$(_context8) {
          while (1) switch (_context8.prev = _context8.next) {
            case 0:
              _context8.prev = 0;
              _this14.isCreatingTask = true;
              coachId = _this14.$route.params.id;
              if (coachId) {
                _context8.next = 6;
                break;
              }
              _this14.showError("No coach ID found");
              return _context8.abrupt("return");
            case 6:
              if (!(!_this14.task.title || !_this14.task.category || !_this14.task.priority || !_this14.task.dueDate)) {
                _context8.next = 9;
                break;
              }
              _this14.showError("Please fill in all required fields");
              return _context8.abrupt("return");
            case 9:
              // Prepare task data
              taskData = {
                title: _this14.task.title,
                category: _this14.task.category,
                priority: _this14.task.priority,
                dueDate: _this14.task.dueDate,
                status: _this14.task.status,
                description: _this14.task.description || ""
              };
              if (!_this14.editingTaskId) {
                _context8.next = 16;
                break;
              }
              _context8.next = 13;
              return axios__WEBPACK_IMPORTED_MODULE_0___default().put("coaches/".concat(coachId, "/tasks/").concat(_this14.editingTaskId), taskData);
            case 13:
              response = _context8.sent;
              _context8.next = 19;
              break;
            case 16:
              _context8.next = 18;
              return axios__WEBPACK_IMPORTED_MODULE_0___default().post("coaches/".concat(coachId, "/create-task"), taskData);
            case 18:
              response = _context8.sent;
            case 19:
              if (!(response.data.status === "success")) {
                _context8.next = 31;
                break;
              }
              action = _this14.editingTaskId ? "updated" : "created";
              _this14.showSuccess(response.data.message || "Task ".concat(action, " successfully!"));

              // Store the editing state and task ID before clearing them
              wasEditing = !!_this14.editingTaskId;
              editingTaskId = _this14.editingTaskId; // Reset form and editing state
              _this14.resetTaskForm();
              _this14.editingTaskId = null;

              // Always refresh the task table to ensure consistency
              _context8.next = 28;
              return _this14.fetchCoachTasks();
            case 28:
              // Small delay to show success message, then close the form
              setTimeout(function () {
                _this14.activeAction = null;
              }, 1000);
              _context8.next = 32;
              break;
            case 31:
              _this14.showError("Failed to save task");
            case 32:
              _context8.next = 38;
              break;
            case 34:
              _context8.prev = 34;
              _context8.t0 = _context8["catch"](0);
              console.error("Error saving task:", _context8.t0);
              if (_context8.t0.response && _context8.t0.response.data && _context8.t0.response.data.errors) {
                // Handle validation errors
                errorMessages = Object.values(_context8.t0.response.data.errors).flat();
                _this14.showError(errorMessages.join(", "));
              } else if (_context8.t0.response && _context8.t0.response.data && _context8.t0.response.data.message) {
                // Handle other API errors
                _this14.showError(_context8.t0.response.data.message);
              } else {
                // Handle network or other errors
                _this14.showError("Error saving task. Please try again.");
              }
            case 38:
              _context8.prev = 38;
              _this14.isCreatingTask = false;
              return _context8.finish(38);
            case 41:
            case "end":
              return _context8.stop();
          }
        }, _callee8, null, [[0, 34, 38, 41]]);
      }))();
    },
    showSuccess: function showSuccess(message) {
      try {
        if (this.$root && this.$root.$bvToast) {
          this.$root.$bvToast.toast(message, {
            title: "Success",
            variant: "success",
            solid: true,
            toaster: "b-toaster-top-right",
            autoHideDelay: 1000
          });
        } else {
          // Fallback to console log if toast is not available
          console.log("Success:", message);
          alert("Success: " + message);
        }
      } catch (error) {
        console.log("Success:", message);
      }
    },
    showError: function showError(message) {
      try {
        if (this.$root && this.$root.$bvToast) {
          this.$root.$bvToast.toast(message, {
            title: "Error",
            variant: "danger",
            solid: true,
            toaster: "b-toaster-top-right",
            autoHideDelay: 1000
          });
        } else {
          // Fallback to console log if toast is not available
          console.error("Error:", message);
          alert("Error: " + message);
        }
      } catch (error) {
        console.error("Error:", message);
      }
    },
    fetchClientData: function fetchClientData() {
      var _this15 = this;
      return _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee9() {
        var coachId, response, updatedClient;
        return _regeneratorRuntime().wrap(function _callee9$(_context9) {
          while (1) switch (_context9.prev = _context9.next) {
            case 0:
              _context9.prev = 0;
              coachId = _this15.$route.params.id;
              if (coachId) {
                _context9.next = 5;
                break;
              }
              _this15.isLoading = false;
              return _context9.abrupt("return");
            case 5:
              _context9.next = 7;
              return axios__WEBPACK_IMPORTED_MODULE_0___default().get("coaches/".concat(coachId));
            case 7:
              response = _context9.sent;
              if (response.data) {
                // Create a clean merge of response data with existing client data
                updatedClient = _objectSpread({}, _this15.client); // Update all fields from response to ensure database state is reflected
                Object.keys(response.data).forEach(function (key) {
                  var serverValue = response.data[key];
                  if (key === 'dob' || key === 'trial_start' || key === 'trial_end' || key === 'payment_start_date') {
                    // Format date fields properly, even if null
                    updatedClient[key] = serverValue ? _this15.formatDateForInput(serverValue) : null;
                  } else {
                    // Update all other fields, including null values
                    updatedClient[key] = serverValue;
                  }
                });

                // Ensure required fields have proper defaults
                updatedClient.first_name = updatedClient.first_name || '';
                updatedClient.last_name = updatedClient.last_name || '';
                updatedClient.email = updatedClient.email || '';
                updatedClient.mobile_phone = updatedClient.mobile_phone || '';
                updatedClient.address = updatedClient.address || '';
                updatedClient.city = updatedClient.city || '';
                updatedClient.state = updatedClient.state || '';
                updatedClient.zip = updatedClient.zip || '';

                // Update the client data
                _this15.client = updatedClient;

                // Store original data for change tracking
                _this15.originalClientData = JSON.parse(JSON.stringify(_this15.client));
                _this15.changesMade = {};
                _this15.hasUnsavedChanges = false;

                // Handle profile image - clear preview URL, use server path
                _this15.profileImageUrl = null;
                if (_this15.profileImageFileInput && _this15.profileImageFileInput.parentNode) {
                  _this15.profileImageFileInput.parentNode.removeChild(_this15.profileImageFileInput);
                }
                _this15.profileImageFileInput = null;

                // Force Vue reactivity update
                _this15.$forceUpdate();
              } else {
                _this15.showError("Failed to load coach data");
                _this15.$router.push({
                  name: "ViewAllCoaches"
                });
              }
              _context9.next = 14;
              break;
            case 11:
              _context9.prev = 11;
              _context9.t0 = _context9["catch"](0);
              if (_context9.t0.response && _context9.t0.response.status === 404) {
                _this15.showError("Coach not found");
                _this15.$router.push({
                  name: "ViewAllCoaches"
                });
              } else {
                // If API fails, try to get data from query parameters
                _this15.getClientFromQueryParams();
              }
            case 14:
              _context9.prev = 14;
              _this15.isLoading = false;
              return _context9.finish(14);
            case 17:
            case "end":
              return _context9.stop();
          }
        }, _callee9, null, [[0, 11, 14, 17]]);
      }))();
    },
    // Fallback method to get client data from query parameters
    getClientFromQueryParams: function getClientFromQueryParams() {
      var query = this.$route.query;
      if (query.coachId) {
        this.client.id = query.coachId;
        this.client.name = query.coachName || "";
        this.client.email = query.coachEmail || "";
        this.client.phone = query.coachPhone || "";

        // Split name into first and last name
        if (this.client.name) {
          var nameParts = this.client.name.split(" ");
          this.client.first_name = nameParts[0] || "";
          this.client.last_name = nameParts.slice(1).join(" ") || "";
        }

        // Generate coach ID
        this.client.coach_id = "C-".concat(Math.random().toString(36).substr(2, 6).toUpperCase());
      }
    },
    // Member Assignment Methods
    fetchMembers: function fetchMembers() {
      var _this16 = this;
      return _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee10() {
        var response;
        return _regeneratorRuntime().wrap(function _callee10$(_context10) {
          while (1) switch (_context10.prev = _context10.next) {
            case 0:
              _context10.prev = 0;
              _this16.isLoadingMembers = true;
              console.log("Fetching members...");
              _context10.next = 5;
              return axios__WEBPACK_IMPORTED_MODULE_0___default().get("members");
            case 5:
              response = _context10.sent;
              console.log("Members API response:", response);
              if (response.data && Array.isArray(response.data)) {
                _this16.members = response.data.map(function (member) {
                  return _objectSpread(_objectSpread({}, member), {}, {
                    selected: false,
                    isAssigned: false
                  });
                });
                _this16.filteredMembers = _toConsumableArray(_this16.members);
                console.log("Members loaded successfully:", _this16.members.length);
                _this16.updatePagination();
              } else {
                console.warn("Invalid members data format:", response.data);
                _this16.loadSampleMembers();
              }
              _context10.next = 14;
              break;
            case 10:
              _context10.prev = 10;
              _context10.t0 = _context10["catch"](0);
              console.error("Error fetching members:", _context10.t0);
              // Fallback to sample data
              _this16.loadSampleMembers();
            case 14:
              _context10.prev = 14;
              _this16.isLoadingMembers = false;
              return _context10.finish(14);
            case 17:
            case "end":
              return _context10.stop();
          }
        }, _callee10, null, [[0, 10, 14, 17]]);
      }))();
    },
    filterMembers: function filterMembers() {
      var _this17 = this;
      var filtered = _toConsumableArray(this.members);

      // Search filter
      if (this.memberSearch) {
        var searchTerm = this.memberSearch.toLowerCase();
        filtered = filtered.filter(function (member) {
          return member.name && typeof member.name === "string" && member.name.toLowerCase().includes(searchTerm) || member.membername && typeof member.membername === "string" && member.membername.toLowerCase().includes(searchTerm) || member.email && typeof member.email === "string" && member.email.toLowerCase().includes(searchTerm) || _this17.getMemberId(member) && typeof _this17.getMemberId(member) === "string" && _this17.getMemberId(member).toLowerCase().includes(searchTerm);
        });
      }

      // Status filter
      if (this.memberStatusFilter) {
        filtered = filtered.filter(function (member) {
          return member.status === _this17.memberStatusFilter;
        });
      }

      // Plan filter
      if (this.memberPlanFilter) {
        filtered = filtered.filter(function (member) {
          return member.plan === _this17.memberPlanFilter;
        });
      }
      this.filteredMembers = filtered;
    },
    filterAssignedMembers: function filterAssignedMembers() {
      var _this18 = this;
      var filtered = _toConsumableArray(this.assignedMembers);

      // Search filter
      if (this.memberSearch) {
        var searchTerm = this.memberSearch.toLowerCase();
        filtered = filtered.filter(function (member) {
          return member.name && typeof member.name === "string" && member.name.toLowerCase().includes(searchTerm) || member.membername && typeof member.membername === "string" && member.membername.toLowerCase().includes(searchTerm) || member.email && typeof member.email === "string" && member.email.toLowerCase().includes(searchTerm) || _this18.getMemberId(member) && typeof _this18.getMemberId(member) === "string" && _this18.getMemberId(member).toLowerCase().includes(searchTerm);
        });
      }

      // Status filter
      if (this.memberStatusFilter) {
        filtered = filtered.filter(function (member) {
          return member.status === _this18.memberStatusFilter;
        });
      }

      // Plan filter
      if (this.memberPlanFilter) {
        filtered = filtered.filter(function (member) {
          return member.plan === _this18.memberPlanFilter;
        });
      }
      this.filteredAssignedMembers = filtered;
    },
    handleNoMembershipFilterChange: function handleNoMembershipFilterChange() {
      // Refetch members from API when filter changes since filtering is done on backend
      this.fetchAssignedMembers();
    },
    getMemberId: function getMemberId(member) {
      // Use the formatted Member ID from backend if available, otherwise calculate it
      if (member.formatted_member_id) {
        return member.formatted_member_id;
      }

      // Check if membername is available (from the API)
      if (member.membername) {
        return member.membername;
      }
      if (!member.id) return "M-000000";
      var year = new Date().getFullYear();
      var paddedId = member.id.toString().padStart(5, "0");
      return "M-".concat(year, "-").concat(paddedId);
    },
    getMemberStatusClass: function getMemberStatusClass(member) {
      var status = member.status || member.Statuses || "";
      if (!status) return "";
      // Ensure status is a string before calling toLowerCase()
      if (typeof status !== "string") {
        return "";
      }
      return status.toLowerCase().replace(/\s+/g, "-");
    },
    getMemberStatusText: function getMemberStatusText(member) {
      var status = member.status || member.Statuses || "";
      if (!status) return "";
      return status.charAt(0).toUpperCase() + status.slice(1);
    },
    getPlanClass: function getPlanClass(member) {
      var plan = member.plan || "";

      // Convert numeric plan IDs to plan names
      var planName = plan;
      if (typeof plan === "number") {
        switch (plan) {
          case 1:
            planName = "Basic";
            break;
          case 2:
            planName = "Premium";
            break;
          case 3:
            planName = "VIP";
            break;
          default:
            planName = "N/A";
        }
      } else if (typeof plan === "string") {
        planName = plan;
      } else {
        return "plan-na";
      }

      // Ensure planName is a string before calling toLowerCase()
      if (typeof planName !== "string") {
        return "plan-na";
      }
      switch (planName.toLowerCase()) {
        case "premium":
          return "plan-premium";
        case "vip":
          return "plan-vip";
        case "basic":
          return "plan-basic";
        default:
          return "plan-na";
      }
    },
    getPlanDisplayText: function getPlanDisplayText(member) {
      var plan = member.plan || "";

      // Convert numeric plan IDs to plan names
      if (typeof plan === "number") {
        switch (plan) {
          case 1:
            return "Basic";
          case 2:
            return "Premium";
          case 3:
            return "VIP";
          default:
            return "N/A";
        }
      } else if (typeof plan === "string") {
        return plan;
      } else {
        return "N/A";
      }
    },
    toggleSelectAllMembers: function toggleSelectAllMembers() {
      var _this19 = this;
      this.filteredMembers.forEach(function (member) {
        member.selected = _this19.selectAllMembers;
      });
    },
    // Pagination methods
    updatePagination: function updatePagination() {
      this.totalPages = Math.ceil(this.filteredMembers.length / this.itemsPerPage);
      if (this.currentPage > this.totalPages) {
        this.currentPage = this.totalPages || 1;
      }
    },
    changePage: function changePage(page) {
      if (page >= 1 && page <= this.totalPages) {
        this.currentPage = page;
      }
    },
    // Enhanced member management methods
    refreshMembers: function refreshMembers() {
      this.fetchMembers();
      this.fetchAssignedMembers();
    },
    exportMembers: function exportMembers() {
      var _this20 = this;
      // Create CSV export
      var headers = ["Name", "ID", "Email", "Phone", "Plan", "Status", "Coach Assignment", "Join Date"];
      var csvData = this.filteredMembers.map(function (member) {
        return [member.name || member.membername || "N/A", _this20.getMemberId(member), member.email || "N/A", member.phone || "N/A", member.plan || "N/A", _this20.getMemberStatusText(member), member.isAssigned ? "Assigned" : "Unassigned", _this20.formatDate(member.join_date || member.created_at || member.joining_date || member.date_joined || member.registration_date || member.member_since || member.start_date || member.enrollment_date)];
      });
      var csvContent = [headers].concat(_toConsumableArray(csvData)).map(function (row) {
        return row.map(function (cell) {
          return "\"".concat(cell, "\"");
        }).join(",");
      }).join("\n");
      var blob = new Blob([csvContent], {
        type: "text/csv"
      });
      var url = window.URL.createObjectURL(blob);
      var a = document.createElement("a");
      a.href = url;
      a.download = "members_export_".concat(new Date().toISOString().split("T")[0], ".csv");
      a.click();
      window.URL.revokeObjectURL(url);
      this.showSuccess("Members exported successfully!");
    },
    viewMemberDetails: function viewMemberDetails(member) {
      var memberDetails = "\n                <div style=\"text-align: left; line-height: 1.6;\">\n                    <div style=\"display: flex; align-items: center; margin-bottom: 15px; padding-bottom: 10px; border-bottom: 1px solid #eee;\">\n                        <img src=\"".concat(member.profile_image || '/images/avatar/no_avatar.png', "\" \n                             alt=\"").concat(member.name, "\" \n                             style=\"width: 50px; height: 50px; border-radius: 50%; margin-right: 15px; object-fit: cover;\">\n                        <div>\n                            <h4 style=\"margin: 0; color: #333;\">").concat(member.name || member.membername || "N/A", "</h4>\n                            <p style=\"margin: 0; color: #666; font-size: 0.9rem;\">ID: ").concat(this.getMemberId(member), "</p>\n                        </div>\n                    </div>\n                    \n                    <div style=\"display: grid; grid-template-columns: 1fr 1fr; gap: 15px;\">\n                        <div>\n                            <h5 style=\"margin: 0 0 8px 0; color: #333; font-size: 0.9rem;\">Contact Information</h5>\n                            <p style=\"margin: 4px 0; color: #666;\"><strong>Email:</strong> ").concat(member.email || "N/A", "</p>\n                            <p style=\"margin: 4px 0; color: #666;\"><strong>Phone:</strong> ").concat(member.phone || member.mobile_phone || member.landline_phone || "N/A", "</p>\n                        </div>\n                        \n                        <div>\n                            <h5 style=\"margin: 0 0 8px 0; color: #333; font-size: 0.9rem;\">Membership Details</h5>\n                            <p style=\"margin: 4px 0; color: #666;\"><strong>Plan:</strong> ").concat(this.getPlanDisplayText(member), "</p>\n                            <p style=\"margin: 4px 0; color: #666;\"><strong>Status:</strong> ").concat(this.getMemberStatusText(member), "</p>\n                            <p style=\"margin: 4px 0; color: #666;\"><strong>Gender:</strong> ").concat(member.gender || member.sex || "N/A", "</p>\n                        </div>\n                    </div>\n                    \n                    <div style=\"margin-top: 15px; padding-top: 10px; border-top: 1px solid #eee;\">\n                        <h5 style=\"margin: 0 0 8px 0; color: #333; font-size: 0.9rem;\">Additional Information</h5>\n                        <p style=\"margin: 4px 0; color: #666;\"><strong>Join Date:</strong> ").concat(this.formatDate(member.join_date || member.created_at || member.joining_date || member.date_joined || member.registration_date || member.member_since || member.start_date || member.enrollment_date), "</p>\n                        <p style=\"margin: 4px 0; color: #666;\"><strong>Assigned Coach:</strong> ").concat(this.client.first_name, " ").concat(this.client.last_name, "</p>\n                    </div>\n                </div>\n      ");
      this.$swal({
        title: "Member Details",
        html: memberDetails,
        width: "750px",
        showCloseButton: true,
        showConfirmButton: false,
        customClass: {
          popup: 'member-details-popup'
        }
      });
    },
    editMember: function editMember(member) {
      var _this21 = this;
      // Navigate to member edit page with edit mode enabled
      var memberId = member.id;
      if (!memberId) {
        this.showError("Member ID not found");
        return;
      }

      // Navigate to member details page with edit mode using the correct route
      this.$router.push({
        name: 'MemberDetails',
        params: {
          id: memberId
        },
        query: {
          activeAction: 'goToProfile',
          tab: 'profile',
          editMode: 'true',
          from: 'coach-details',
          coachId: this.$route.params.id
        }
      })["catch"](function (err) {
        console.error('Navigation failed:', err);
        // Fallback: try using direct path
        var targetPath = "/app/Members/MemberDetails/".concat(memberId);
        var queryParams = new URLSearchParams({
          activeAction: 'goToProfile',
          tab: 'profile',
          editMode: 'true',
          from: 'coach-details',
          coachId: _this21.$route.params.id
        });
        window.location.href = "".concat(targetPath, "?").concat(queryParams.toString());
      });
    },
    assignMember: function assignMember(member) {
      var _this22 = this;
      return _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee11() {
        var coachId, assignmentData, response;
        return _regeneratorRuntime().wrap(function _callee11$(_context11) {
          while (1) switch (_context11.prev = _context11.next) {
            case 0:
              _context11.prev = 0;
              _this22.isAssigningMember = true;
              coachId = _this22.$route.params.id;
              if (!(!coachId || !member.id)) {
                _context11.next = 6;
                break;
              }
              _this22.showError("Coach or Member ID missing for assignment.");
              return _context11.abrupt("return");
            case 6:
              // Prepare assignment data
              assignmentData = {
                member_id: member.id,
                assigned_date: new Date().toISOString().split("T")[0],
                start_date: new Date().toISOString().split("T")[0],
                end_date: null,
                session_frequency: "Weekly",
                session_duration: "60 minutes",
                goals: "General fitness improvement",
                special_requirements: "None"
              };
              _context11.next = 9;
              return axios__WEBPACK_IMPORTED_MODULE_0___default().post("coaches/".concat(coachId, "/assign-member"), assignmentData);
            case 9:
              response = _context11.sent;
              if (!(response.data.status === "success")) {
                _context11.next = 16;
                break;
              }
              _this22.showSuccess(response.data.message || "Member ".concat(member.name, " assigned successfully!"));
              // Refresh the assigned members list
              _context11.next = 14;
              return _this22.fetchAssignedMembers();
            case 14:
              _context11.next = 17;
              break;
            case 16:
              _this22.showError(response.data.message || "Failed to assign member.");
            case 17:
              _context11.next = 23;
              break;
            case 19:
              _context11.prev = 19;
              _context11.t0 = _context11["catch"](0);
              console.error("Error assigning member:", _context11.t0);
              if (_context11.t0.response && _context11.t0.response.data && _context11.t0.response.data.message) {
                _this22.showError(_context11.t0.response.data.message);
              } else {
                _this22.showError("Error assigning member. Please try again.");
              }
            case 23:
              _context11.prev = 23;
              _this22.isAssigningMember = false;
              return _context11.finish(23);
            case 26:
            case "end":
              return _context11.stop();
          }
        }, _callee11, null, [[0, 19, 23, 26]]);
      }))();
    },
    unassignMember: function unassignMember(member) {
      var _this23 = this;
      return _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee12() {
        var coachId, memberId, memberName, assignmentId, assignedMember, filteredMember, memberResponse, apiMember, result, response;
        return _regeneratorRuntime().wrap(function _callee12$(_context12) {
          while (1) switch (_context12.prev = _context12.next) {
            case 0:
              _context12.prev = 0;
              coachId = _this23.$route.params.id;
              memberId = member.id;
              memberName = member.name || member.membername || "Unknown Member"; // Use assignment_id for precise unassignment - this is the unique ID of the assignment record
              // If assignment_id is not available, we'll need to fetch it or use member_id as fallback
              assignmentId = member.assignment_id; // Debug: Log the member object to see what data is available
              console.log("Unassigning member - Full member object:", member);
              console.log("Assignment ID from member:", assignmentId);
              console.log("Member ID:", memberId);
              console.log("Coach ID:", coachId);

              // If assignment_id is missing, try to find it from the assigned members list
              if (!(!assignmentId && memberId)) {
                _context12.next = 25;
                break;
              }
              // First try from assignedMembers
              assignedMember = _this23.assignedMembers.find(function (m) {
                return m.id === memberId;
              });
              if (assignedMember && assignedMember.assignment_id) {
                assignmentId = assignedMember.assignment_id;
                console.log("Found assignment_id from assignedMembers list:", assignmentId);
              } else {
                // Try from filteredAssignedMembers
                filteredMember = _this23.filteredAssignedMembers.find(function (m) {
                  return m.id === memberId;
                });
                if (filteredMember && filteredMember.assignment_id) {
                  assignmentId = filteredMember.assignment_id;
                  console.log("Found assignment_id from filteredAssignedMembers list:", assignmentId);
                }
              }

              // If still not found, try to fetch it from the API
              if (!(!assignmentId && coachId && memberId)) {
                _context12.next = 25;
                break;
              }
              console.log("Assignment ID still missing, attempting to fetch from API...");
              _context12.prev = 14;
              _context12.next = 17;
              return axios__WEBPACK_IMPORTED_MODULE_0___default().get("coaches/".concat(coachId, "/assigned-members"));
            case 17:
              memberResponse = _context12.sent;
              console.log("API response for assignment lookup:", memberResponse.data);
              if (memberResponse.data.status === "success" && memberResponse.data.members) {
                apiMember = memberResponse.data.members.find(function (m) {
                  return m.id === memberId;
                });
                console.log("Found member in API response:", apiMember);
                if (apiMember && apiMember.assignment_id) {
                  assignmentId = apiMember.assignment_id;
                  console.log("Found assignment_id from API response:", assignmentId);
                } else {
                  console.error("Member found in API but assignment_id is missing:", apiMember);
                }
              } else {
                console.error("API response format unexpected:", memberResponse.data);
              }
              _context12.next = 25;
              break;
            case 22:
              _context12.prev = 22;
              _context12.t0 = _context12["catch"](14);
              console.error("Error fetching assignment_id from API:", _context12.t0);
            case 25:
              // Final check - if assignment_id is still missing, we can't proceed
              // But we'll pass member_id to backend as fallback
              if (!assignmentId && memberId) {
                console.warn("Assignment ID is missing, will use member_id as fallback. This may cause issues if member has multiple assignments.");
              }
              if (coachId) {
                _context12.next = 30;
                break;
              }
              _this23.showError("Coach ID is missing. Please refresh the page and try again.");
              console.error("Missing coachId:", {
                coachId: coachId,
                member: member
              });
              return _context12.abrupt("return");
            case 30:
              if (!(!assignmentId && !memberId)) {
                _context12.next = 34;
                break;
              }
              _this23.showError("Both Assignment ID and Member ID are missing for member ".concat(memberName, ". Please refresh the page and try again."));
              console.error("Missing both assignmentId and memberId:", {
                coachId: coachId,
                memberId: memberId,
                assignmentId: assignmentId,
                member: member,
                assignedMembers: _this23.assignedMembers,
                filteredAssignedMembers: _this23.filteredAssignedMembers
              });
              return _context12.abrupt("return");
            case 34:
              // Use member_id as assignment_id if assignment_id is missing (backend will handle lookup)
              if (!assignmentId && memberId) {
                console.warn("Using member_id as fallback for assignment lookup");
                assignmentId = memberId; // Backend will interpret this correctly
              }

              // Show confirmation dialog
              _context12.next = 37;
              return _this23.$swal({
                title: "Unassign Member",
                html: "\n                        <div style=\"text-align: center;\">\n                            <i class=\"fas fa-user-minus\" style=\"font-size: 3rem; color: #dc3545; margin-bottom: 15px;\"></i>\n                            <p style=\"font-size: 1.1rem; margin-bottom: 10px;\">Are you sure you want to unassign <strong>".concat(memberName, "</strong> from this coach?</p>\n                            <p style=\"color: #666; font-size: 0.9rem;\">This action will remove the member from the coach's assigned members list.</p>\n                        </div>\n                    "),
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#dc3545",
                cancelButtonColor: "#6c757d",
                confirmButtonText: "Yes, Unassign",
                cancelButtonText: "Cancel",
                reverseButtons: true
              });
            case 37:
              result = _context12.sent;
              if (result.isConfirmed) {
                _context12.next = 40;
                break;
              }
              return _context12.abrupt("return");
            case 40:
              _this23.isAssigningMember = true;

              // Use assignment_id in the URL for precise targeting
              // Also pass member_id as a query parameter for fallback
              _context12.next = 43;
              return axios__WEBPACK_IMPORTED_MODULE_0___default()["delete"]("coaches/".concat(coachId, "/unassign-member/").concat(assignmentId), {
                params: {
                  member_id: memberId
                }
              });
            case 43:
              response = _context12.sent;
              if (!(response.data.status === "success")) {
                _context12.next = 50;
                break;
              }
              _this23.showSuccess("".concat(memberName, " has been unassigned successfully!"));
              // Refresh the assigned members list
              _context12.next = 48;
              return _this23.fetchAssignedMembers();
            case 48:
              _context12.next = 51;
              break;
            case 50:
              _this23.showError(response.data.message || "Failed to unassign member.");
            case 51:
              _context12.next = 57;
              break;
            case 53:
              _context12.prev = 53;
              _context12.t1 = _context12["catch"](0);
              console.error("Error unassigning member:", _context12.t1);
              _this23.showError("Error unassigning member. Please try again.");
            case 57:
              _context12.prev = 57;
              _this23.isAssigningMember = false;
              return _context12.finish(57);
            case 60:
            case "end":
              return _context12.stop();
          }
        }, _callee12, null, [[0, 53, 57, 60], [14, 22]]);
      }))();
    },
    assignSelectedMembers: function assignSelectedMembers() {
      var _this24 = this;
      return _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee13() {
        var selectedMembers, coachId, successCount, errorCount, _iterator, _step, member, assignmentData, response;
        return _regeneratorRuntime().wrap(function _callee13$(_context13) {
          while (1) switch (_context13.prev = _context13.next) {
            case 0:
              _context13.prev = 0;
              _this24.isAssigningMember = true;
              selectedMembers = _this24.selectedMembers;
              if (!(selectedMembers.length === 0)) {
                _context13.next = 6;
                break;
              }
              _this24.showError("Please select at least one member to assign.");
              return _context13.abrupt("return");
            case 6:
              coachId = _this24.$route.params.id;
              if (coachId) {
                _context13.next = 10;
                break;
              }
              _this24.showError("Coach ID missing for assignment.");
              return _context13.abrupt("return");
            case 10:
              successCount = 0;
              errorCount = 0; // Assign each selected member
              _iterator = _createForOfIteratorHelper(selectedMembers);
              _context13.prev = 13;
              _iterator.s();
            case 15:
              if ((_step = _iterator.n()).done) {
                _context13.next = 31;
                break;
              }
              member = _step.value;
              _context13.prev = 17;
              assignmentData = {
                member_id: member.id,
                assigned_date: new Date().toISOString().split("T")[0],
                start_date: new Date().toISOString().split("T")[0],
                end_date: null,
                session_frequency: "Weekly",
                session_duration: "60 minutes",
                goals: "General fitness improvement",
                special_requirements: "None"
              };
              _context13.next = 21;
              return axios__WEBPACK_IMPORTED_MODULE_0___default().post("coaches/".concat(coachId, "/assign-member"), assignmentData);
            case 21:
              response = _context13.sent;
              if (response.data.status === "success") {
                successCount++;
              } else {
                errorCount++;
              }
              _context13.next = 29;
              break;
            case 25:
              _context13.prev = 25;
              _context13.t0 = _context13["catch"](17);
              errorCount++;
              console.error("Error assigning member ".concat(member.name, ":"), _context13.t0);
            case 29:
              _context13.next = 15;
              break;
            case 31:
              _context13.next = 36;
              break;
            case 33:
              _context13.prev = 33;
              _context13.t1 = _context13["catch"](13);
              _iterator.e(_context13.t1);
            case 36:
              _context13.prev = 36;
              _iterator.f();
              return _context13.finish(36);
            case 39:
              // Clear selection
              selectedMembers.forEach(function (member) {
                member.selected = false;
              });
              _this24.selectAllMembers = false;

              // Show results
              if (!(successCount > 0)) {
                _context13.next = 45;
                break;
              }
              _this24.showSuccess("".concat(successCount, " member(s) assigned successfully!"));
              // Refresh the assigned members list
              _context13.next = 45;
              return _this24.fetchAssignedMembers();
            case 45:
              if (errorCount > 0) {
                _this24.showError("".concat(errorCount, " member(s) failed to assign."));
              }
              _context13.next = 52;
              break;
            case 48:
              _context13.prev = 48;
              _context13.t2 = _context13["catch"](0);
              console.error("Error assigning selected members:", _context13.t2);
              _this24.showError("Error assigning members. Please try again.");
            case 52:
              _context13.prev = 52;
              _this24.isAssigningMember = false;
              return _context13.finish(52);
            case 55:
            case "end":
              return _context13.stop();
          }
        }, _callee13, null, [[0, 48, 52, 55], [13, 33, 36, 39], [17, 25]]);
      }))();
    },
    clearSelection: function clearSelection() {
      this.filteredMembers.forEach(function (member) {
        member.selected = false;
      });
      this.selectAllMembers = false;
    },
    // Task Management Methods
    fetchCoachTasks: function fetchCoachTasks() {
      var _this25 = this;
      return _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee14() {
        var coachId, response;
        return _regeneratorRuntime().wrap(function _callee14$(_context14) {
          while (1) switch (_context14.prev = _context14.next) {
            case 0:
              _context14.prev = 0;
              _this25.isLoadingTasks = true;
              coachId = _this25.$route.params.id;
              if (coachId) {
                _context14.next = 5;
                break;
              }
              return _context14.abrupt("return");
            case 5:
              _context14.next = 7;
              return axios__WEBPACK_IMPORTED_MODULE_0___default().get("coaches/".concat(coachId, "/tasks"));
            case 7:
              response = _context14.sent;
              if (response.data.success) {
                // Normalize task data to ensure consistent structure
                _this25.coachTasks = (response.data.tasks || []).map(function (task) {
                  return _this25.normalizeTaskData(task);
                });
              } else {
                _this25.showError("Failed to fetch tasks");
                // Use mock data as fallback
                _this25.coachTasks = _this25.getMockCoachTasks().map(function (task) {
                  return _this25.normalizeTaskData(task);
                });
              }
              _context14.next = 15;
              break;
            case 11:
              _context14.prev = 11;
              _context14.t0 = _context14["catch"](0);
              console.error("Error fetching tasks:", _context14.t0);
              // Use mock data if API fails
              _this25.coachTasks = _this25.getMockCoachTasks().map(function (task) {
                return _this25.normalizeTaskData(task);
              });
            case 15:
              _context14.prev = 15;
              _this25.isLoadingTasks = false;
              return _context14.finish(15);
            case 18:
            case "end":
              return _context14.stop();
          }
        }, _callee14, null, [[0, 11, 15, 18]]);
      }))();
    },
    getMockCoachTasks: function getMockCoachTasks() {
      return [{
        id: 1,
        title: "Client Assessment Session",
        description: "Conduct fitness assessment for new client John Doe",
        category: "Training",
        priority: "High",
        due_date: "2024-01-15",
        status: "completed",
        created_at: "2024-01-10"
      }, {
        id: 2,
        title: "Equipment Maintenance Check",
        description: "Inspect and maintain gym equipment in training area",
        category: "Maintenance",
        priority: "Medium",
        due_date: "2024-01-20",
        status: "in-progress",
        created_at: "2024-01-12"
      }, {
        id: 3,
        title: "Training Program Development",
        description: "Create personalized workout plan for client Sarah Wilson",
        category: "Client Management",
        priority: "High",
        due_date: "2024-01-18",
        status: "pending",
        created_at: "2024-01-14"
      }];
    },
    getTaskRowClass: function getTaskRowClass(task) {
      if (task.status === "completed") {
        return "table-success";
      } else if (task.status === "in-progress") {
        return "table-warning";
      } else if (new Date(task.due_date) < new Date() && task.status !== "completed") {
        return "table-danger";
      }
      return "";
    },
    getCategoryClass: function getCategoryClass(category) {
      var classes = {
        Training: "bg-primary",
        "Client Management": "bg-success",
        Administrative: "bg-info",
        Maintenance: "bg-warning",
        "Professional Development": "bg-secondary",
        Other: "bg-dark"
      };
      return classes[category] || "bg-secondary";
    },
    // Activities Management Methods
    fetchCoachActivities: function fetchCoachActivities() {
      var _this26 = this;
      return _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee15() {
        var coachId, response, errorMessage;
        return _regeneratorRuntime().wrap(function _callee15$(_context15) {
          while (1) switch (_context15.prev = _context15.next) {
            case 0:
              _context15.prev = 0;
              _this26.isLoadingActivities = true;
              coachId = _this26.$route.params.id;
              if (coachId) {
                _context15.next = 6;
                break;
              }
              console.warn('Coach ID is missing');
              return _context15.abrupt("return");
            case 6:
              _context15.next = 8;
              return axios__WEBPACK_IMPORTED_MODULE_0___default().get("coaches/".concat(coachId, "/activities"));
            case 8:
              response = _context15.sent;
              if (response.data.status === 'success' && response.data.data) {
                _this26.activities = response.data.data || [];
              } else {
                console.warn('Failed to fetch activities or no data returned', response.data);
                _this26.activities = [];
                // Show warning if there's a message from the server
                if (response.data.message) {
                  _this26.showError(response.data.message);
                }
              }
              _context15.next = 19;
              break;
            case 12:
              _context15.prev = 12;
              _context15.t0 = _context15["catch"](0);
              console.error('Error fetching coach activities:', _context15.t0);

              // Extract error message from response if available
              errorMessage = 'Failed to load activities. Please try again.';
              if (_context15.t0.response) {
                // Server responded with error status
                if (_context15.t0.response.data && _context15.t0.response.data.message) {
                  errorMessage = _context15.t0.response.data.message;
                } else if (_context15.t0.response.status === 404) {
                  errorMessage = 'Coach not found.';
                } else if (_context15.t0.response.status === 500) {
                  errorMessage = 'Server error occurred while loading activities. Please contact support if this persists.';
                }
              } else if (_context15.t0.request) {
                // Request was made but no response received
                errorMessage = 'Unable to connect to server. Please check your connection.';
              }
              _this26.showError(errorMessage);
              _this26.activities = [];
            case 19:
              _context15.prev = 19;
              _this26.isLoadingActivities = false;
              return _context15.finish(19);
            case 22:
            case "end":
              return _context15.stop();
          }
        }, _callee15, null, [[0, 12, 19, 22]]);
      }))();
    },
    getPriorityClass: function getPriorityClass(priority) {
      var classes = {
        Urgent: "bg-danger",
        High: "bg-warning",
        Medium: "bg-info",
        Low: "bg-success"
      };
      return classes[priority] || "bg-secondary";
    },
    getStatusClass: function getStatusClass(status) {
      var classes = {
        pending: "bg-secondary",
        "in-progress": "bg-warning",
        completed: "bg-success",
        cancelled: "bg-danger"
      };
      return classes[status] || "bg-secondary";
    },
    getDueDateClass: function getDueDateClass(dueDate) {
      var today = new Date();
      var due = new Date(dueDate);
      var diffTime = due - today;
      var diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      if (diffDays < 0) {
        return "text-danger font-weight-bold";
      } else if (diffDays <= 3) {
        return "text-warning font-weight-bold";
      } else if (diffDays <= 7) {
        return "text-info";
      }
      return "";
    }
  }, _defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_methods, "formatDate", function formatDate(dateString) {
    if (!dateString) return "N/A";
    var date = new Date(dateString);
    return date.toLocaleDateString();
  }), "formatCoachSinceDate", function formatCoachSinceDate(dateString) {
    if (!dateString) return '-';
    var date = new Date(dateString);
    if (isNaN(date.getTime())) return '-';

    // Format date as MM/DD/YYYY
    var month = String(date.getMonth() + 1).padStart(2, '0');
    var day = String(date.getDate()).padStart(2, '0');
    var year = date.getFullYear();
    var formattedDate = "".concat(month, "/").concat(day, "/").concat(year);

    // Calculate years and months difference
    var today = new Date();
    var years = today.getFullYear() - date.getFullYear();
    var months = today.getMonth() - date.getMonth();

    // Adjust if current day hasn't reached the start day this month
    if (today.getDate() < date.getDate()) {
      months--;
    }

    // Adjust if months went negative
    if (months < 0) {
      months += 12;
      years--;
    }

    // Build duration string
    var durationParts = [];
    if (years > 0) {
      durationParts.push("".concat(years, " ").concat(years === 1 ? 'year' : 'years'));
    }
    if (months > 0) {
      durationParts.push("".concat(months, " ").concat(months === 1 ? 'month' : 'months'));
    }

    // If less than a month, show 0 months
    if (years === 0 && months === 0) {
      durationParts.push('0 months');
    }
    var duration = durationParts.length > 0 ? " (".concat(durationParts.join(', '), ")") : '';
    return "".concat(formattedDate).concat(duration);
  }), "formatDateForInput", function formatDateForInput(dateString) {
    if (!dateString) return "";
    var date = new Date(dateString);
    if (isNaN(date.getTime())) return "";
    return date.toISOString().split("T")[0];
  }), "formatDateForStorage", function formatDateForStorage(dateString) {
    if (!dateString) return "";
    var date = new Date(dateString);
    if (isNaN(date.getTime())) return "";
    return date.toISOString().split("T")[0];
  }), "normalizeTaskData", function normalizeTaskData(task) {
    var normalized = {
      id: task.id,
      title: task.title || "",
      description: task.description || "",
      category: task.category || "",
      priority: task.priority || "",
      due_date: task.due_date || task.dueDate || "",
      status: task.status || "pending",
      created_at: task.created_at || task.createdAt || new Date().toISOString().split("T")[0]
    };
    return normalized;
  }), "updateTaskInArray", function updateTaskInArray(taskId, updatedData) {
    var taskIndex = this.coachTasks.findIndex(function (task) {
      return task.id === taskId;
    });
    if (taskIndex !== -1) {
      // Format the due date properly for storage
      var formattedDueDate = this.coachTasks[taskIndex].due_date; // Keep existing if no update
      if (updatedData.dueDate) {
        formattedDueDate = this.formatDateForStorage(updatedData.dueDate);
      } else if (updatedData.due_date) {
        formattedDueDate = updatedData.due_date;
      }

      // Merge the updated data with existing task data
      this.coachTasks[taskIndex] = _objectSpread(_objectSpread(_objectSpread({}, this.coachTasks[taskIndex]), updatedData), {}, {
        // Ensure date fields are properly formatted
        due_date: formattedDueDate,
        created_at: this.coachTasks[taskIndex].created_at // Preserve original creation date
      });
    }
  }), "startNewTask", function startNewTask() {
    this.resetTaskForm();
    this.editingTaskId = null;
    this.activeAction = "newTask";
  }), "openNewTask", function openNewTask() {
    // Switch to New Task tab
    this.activeTab = "newTask";
    // Start new task creation
    this.startNewTask();
    // Scroll to task form after a short delay to ensure tab is rendered
    this.$nextTick(function () {
      setTimeout(function () {
        var taskForm = document.querySelector(".task-form");
        if (taskForm) {
          taskForm.scrollIntoView({
            behavior: "smooth",
            block: "start"
          });
        }
      }, 100);
    });
  }), "viewTask", function viewTask(task) {
    // For now, just show task details in an alert
    // In a real implementation, you might want to show a modal or expand the row
    var taskDetails = "\nTask: ".concat(task.title, "\nCategory: ").concat(task.category, "\nPriority: ").concat(task.priority, "\nStatus: ").concat(task.status, "\nDue Date: ").concat(this.formatDate(task.due_date), "\nDescription: ").concat(task.description || "No description provided", "\nCreated: ").concat(this.formatDate(task.created_at), "\n      ");
    this.$swal({
      title: "Task Details",
      text: taskDetails,
      icon: "info",
      confirmButtonText: "Close"
    });
  }), "cancelTaskEdit", function cancelTaskEdit() {
    if (this.editingTaskId) {
      // Reset form and editing state
      this.resetTaskForm();
      this.editingTaskId = null;
      this.activeAction = null;
      this.showSuccess("Task editing cancelled");
    } else {
      this.activeAction = null;
    }
  }), _defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_methods, "resetTaskForm", function resetTaskForm() {
    this.task = {
      title: "",
      category: "",
      priority: "",
      dueDate: "",
      status: "pending",
      description: ""
    };
  }), "editTask", function editTask(task) {
    // Normalize the task data first
    var normalizedTask = this.normalizeTaskData(task);

    // Format the due date properly for the input field
    var formattedDueDate = this.formatDateForInput(normalizedTask.due_date);

    // Populate the form with task data for editing
    this.task = {
      title: normalizedTask.title || "",
      category: normalizedTask.category || "",
      priority: normalizedTask.priority || "",
      dueDate: formattedDueDate || "",
      status: normalizedTask.status || "pending",
      description: normalizedTask.description || ""
    };
    this.editingTaskId = normalizedTask.id;
    this.activeAction = "newTask"; // Show the form
    this.showSuccess("Editing task: ".concat(normalizedTask.title));

    // Scroll to the form
    this.$nextTick(function () {
      var formElement = document.querySelector(".task-form");
      if (formElement) {
        formElement.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });
      }
    });
  }), "deleteTask", function deleteTask(taskId) {
    var _this27 = this;
    return _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee16() {
      var confirmed, coachId, response, isSuccess;
      return _regeneratorRuntime().wrap(function _callee16$(_context16) {
        while (1) switch (_context16.prev = _context16.next) {
          case 0:
            _context16.prev = 0;
            _context16.next = 3;
            return _this27.$swal({
              title: "Are you sure?",
              text: "You won't be able to revert this!",
              icon: "warning",
              showCancelButton: true,
              confirmButtonColor: "#d33",
              cancelButtonColor: "#3085d6",
              confirmButtonText: "Yes, delete it!"
            });
          case 3:
            confirmed = _context16.sent;
            if (!confirmed.isConfirmed) {
              _context16.next = 17;
              break;
            }
            coachId = _this27.$route.params.id;
            _context16.next = 8;
            return axios__WEBPACK_IMPORTED_MODULE_0___default()["delete"]("coaches/".concat(coachId, "/tasks/").concat(taskId));
          case 8:
            response = _context16.sent;
            // Check for success in response (backend returns 'status: success' or 'success: true')
            // Also check HTTP status code as fallback (200-299 means success)
            isSuccess = response.data.status === 'success' || response.data.success === true || response.status >= 200 && response.status < 300;
            if (!isSuccess) {
              _context16.next = 16;
              break;
            }
            _this27.showSuccess("Task deleted successfully!");
            // Refresh the task list from server to ensure consistency
            _context16.next = 14;
            return _this27.fetchCoachTasks();
          case 14:
            _context16.next = 17;
            break;
          case 16:
            _this27.showError("Failed to delete task");
          case 17:
            _context16.next = 23;
            break;
          case 19:
            _context16.prev = 19;
            _context16.t0 = _context16["catch"](0);
            console.error("Error deleting task:", _context16.t0);
            _this27.showError("Error deleting task. Please try again.");
          case 23:
          case "end":
            return _context16.stop();
        }
      }, _callee16, null, [[0, 19]]);
    }))();
  }), "fetchCoachUserId", function fetchCoachUserId() {
    var _this28 = this;
    return _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee17() {
      return _regeneratorRuntime().wrap(function _callee17$(_context17) {
        while (1) switch (_context17.prev = _context17.next) {
          case 0:
            _context17.prev = 0;
            if (!(_this28.client && _this28.client.user_id)) {
              _context17.next = 3;
              break;
            }
            return _context17.abrupt("return", _this28.client.user_id);
          case 3:
            return _context17.abrupt("return", _this28.$route.params.id);
          case 6:
            _context17.prev = 6;
            _context17.t0 = _context17["catch"](0);
            console.warn("Error fetching coach user ID, using coach ID:", _context17.t0);
            // Fallback: use coach ID directly
            return _context17.abrupt("return", _this28.$route.params.id);
          case 10:
          case "end":
            return _context17.stop();
        }
      }, _callee17, null, [[0, 6]]);
    }))();
  }), "fetchMessages", function fetchMessages() {
    var _this29 = this;
    return _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee18() {
      var coachId, response, _error$response15;
      return _regeneratorRuntime().wrap(function _callee18$(_context18) {
        while (1) switch (_context18.prev = _context18.next) {
          case 0:
            _context18.prev = 0;
            _this29.isLoadingMessages = true;
            coachId = _this29.$route.params.id;
            if (coachId) {
              _context18.next = 6;
              break;
            }
            _this29.messages = [];
            return _context18.abrupt("return");
          case 6:
            if (_this29.coachUserId) {
              _context18.next = 10;
              break;
            }
            _context18.next = 9;
            return _this29.fetchCoachUserId();
          case 9:
            _this29.coachUserId = _context18.sent;
          case 10:
            _context18.next = 12;
            return axios__WEBPACK_IMPORTED_MODULE_0___default().get("communication/chat-history/".concat(_this29.coachUserId, "/trainer"));
          case 12:
            response = _context18.sent;
            if (response.data && response.data.success) {
              // Transform messages to chat format
              // Backend already provides is_sent field
              _this29.messages = (response.data.messages || []).map(function (msg) {
                return {
                  id: msg.id,
                  message: msg.message || msg.message_text || '',
                  is_sent: msg.is_sent || false,
                  sender_type: msg.sender_type || (msg.is_sent ? 'Admin' : 'Trainer'),
                  sender_name: msg.sender_name || (msg.is_sent ? 'You' : "".concat(_this29.client.first_name, " ").concat(_this29.client.last_name)),
                  created_at: msg.created_at || msg.sent_date || new Date().toISOString()
                };
              });

              // Scroll to bottom after messages load
              _this29.$nextTick(function () {
                _this29.scrollToBottom();
              });
            } else {
              _this29.messages = [];
            }
            _context18.next = 21;
            break;
          case 16:
            _context18.prev = 16;
            _context18.t0 = _context18["catch"](0);
            console.error("Error fetching messages:", _context18.t0);
            _this29.messages = [];
            // Don't show error for empty conversations
            if (((_error$response15 = _context18.t0.response) === null || _error$response15 === void 0 ? void 0 : _error$response15.status) !== 404) {
              _this29.showError("Error loading messages. Please try again.");
            }
          case 21:
            _context18.prev = 21;
            _this29.isLoadingMessages = false;
            return _context18.finish(21);
          case 24:
          case "end":
            return _context18.stop();
        }
      }, _callee18, null, [[0, 16, 21, 24]]);
    }))();
  }), "scrollToBottom", function scrollToBottom() {
    var container = this.$refs.chatMessagesContainer;
    if (container) {
      container.scrollTop = container.scrollHeight;
    }
  }), "getMockMessages", function getMockMessages() {
    return [{
      id: 1,
      sender: "John Doe",
      subject: "Training Schedule Update",
      body: "Hi, I wanted to discuss the upcoming training schedule for next week. Can we arrange a meeting?",
      created_at: "2024-01-15",
      read: true
    }, {
      id: 2,
      sender: "Jane Smith",
      subject: "Equipment Request",
      body: "We need to order new equipment for the gym. Please review the list and let me know your thoughts.",
      created_at: "2024-01-14",
      read: false
    }, {
      id: 3,
      sender: "Mike Johnson",
      subject: "Client Feedback",
      body: "Great feedback from clients about your training sessions. Keep up the excellent work!",
      created_at: "2024-01-13",
      read: true
    }];
  }), "sendMessage", function sendMessage() {
    var _this30 = this;
    return _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee19() {
      var coachId, response, _response$data3, _error$response16, _error$response17, errorMessage;
      return _regeneratorRuntime().wrap(function _callee19$(_context19) {
        while (1) switch (_context19.prev = _context19.next) {
          case 0:
            _context19.prev = 0;
            _this30.isSendingMessage = true;
            coachId = _this30.$route.params.id;
            if (coachId) {
              _context19.next = 6;
              break;
            }
            _this30.showError("No coach ID found");
            return _context19.abrupt("return");
          case 6:
            if (!(!_this30.newMessage.body || !_this30.newMessage.body.trim())) {
              _context19.next = 9;
              break;
            }
            _this30.showError("Please enter a message");
            return _context19.abrupt("return");
          case 9:
            if (_this30.coachUserId) {
              _context19.next = 13;
              break;
            }
            _context19.next = 12;
            return _this30.fetchCoachUserId();
          case 12:
            _this30.coachUserId = _context19.sent;
          case 13:
            _context19.next = 15;
            return axios__WEBPACK_IMPORTED_MODULE_0___default().post("communication/send-message", {
              recipient_id: _this30.coachUserId,
              recipient_type: 'trainer',
              // Coaches are treated as 'trainer' type
              message: _this30.newMessage.body.trim()
            });
          case 15:
            response = _context19.sent;
            if (!(response.data && response.data.success)) {
              _context19.next = 23;
              break;
            }
            // Clear input
            _this30.newMessage.body = "";

            // Refresh messages to show the new one
            _context19.next = 20;
            return _this30.fetchMessages();
          case 20:
            // Scroll to bottom
            _this30.$nextTick(function () {
              _this30.scrollToBottom();
            });
            _context19.next = 24;
            break;
          case 23:
            _this30.showError(((_response$data3 = response.data) === null || _response$data3 === void 0 ? void 0 : _response$data3.message) || "Failed to send message");
          case 24:
            _context19.next = 31;
            break;
          case 26:
            _context19.prev = 26;
            _context19.t0 = _context19["catch"](0);
            console.error("Error sending message:", _context19.t0);
            errorMessage = ((_error$response16 = _context19.t0.response) === null || _error$response16 === void 0 || (_error$response16 = _error$response16.data) === null || _error$response16 === void 0 ? void 0 : _error$response16.message) || ((_error$response17 = _context19.t0.response) === null || _error$response17 === void 0 || (_error$response17 = _error$response17.data) === null || _error$response17 === void 0 ? void 0 : _error$response17.error) || "Error sending message. Please try again.";
            _this30.showError(errorMessage);
          case 31:
            _context19.prev = 31;
            _this30.isSendingMessage = false;
            return _context19.finish(31);
          case 34:
          case "end":
            return _context19.stop();
        }
      }, _callee19, null, [[0, 26, 31, 34]]);
    }))();
  }), "formatMessageTime", function formatMessageTime(dateString) {
    if (!dateString) return '';
    var date = new Date(dateString);
    var now = new Date();
    var diffMs = now - date;
    var diffMins = Math.floor(diffMs / 60000);
    var diffHours = Math.floor(diffMs / 3600000);
    var diffDays = Math.floor(diffMs / 86400000);

    // Today - show time
    if (diffDays === 0) {
      return date.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit'
      });
    }
    // Yesterday
    if (diffDays === 1) {
      return 'Yesterday ' + date.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit'
      });
    }
    // This week - show day and time
    if (diffDays < 7) {
      return date.toLocaleDateString('en-US', {
        weekday: 'short',
        hour: '2-digit',
        minute: '2-digit'
      });
    }
    // Older - show full date
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: date.getFullYear() !== now.getFullYear() ? 'numeric' : undefined
    });
  }), "newLine", function newLine() {
    // Allow new line with Shift+Enter
    // This is handled by the textarea's @keydown.shift.enter.exact
  }), _defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_methods, "viewMessage", function viewMessage(message) {
    // Set selected message and show modal
    this.selectedMessage = message;
    this.showMessageModal = true;
    // Mark message as read
    message.read = true;
  }), "closeMessageModal", function closeMessageModal() {
    this.showMessageModal = false;
    this.selectedMessage = null;
  }), "deleteMessage", function deleteMessage(messageId) {
    var _this31 = this;
    return _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee20() {
      var confirmed, _confirmed, coachId, response, _error$response18, _error$response19, errorMessage;
      return _regeneratorRuntime().wrap(function _callee20$(_context20) {
        while (1) switch (_context20.prev = _context20.next) {
          case 0:
            _context20.prev = 0;
            if (!(typeof _this31.$swal === "undefined")) {
              _context20.next = 7;
              break;
            }
            // Fallback to browser confirm if SweetAlert is not available
            confirmed = confirm("Are you sure you want to delete this message?");
            if (confirmed) {
              _context20.next = 5;
              break;
            }
            return _context20.abrupt("return");
          case 5:
            _context20.next = 12;
            break;
          case 7:
            _context20.next = 9;
            return _this31.$swal({
              title: "Are you sure?",
              text: "You won't be able to revert this!",
              icon: "warning",
              showCancelButton: true,
              confirmButtonColor: "#d33",
              cancelButtonColor: "#3085d6",
              confirmButtonText: "Yes, delete it!"
            });
          case 9:
            _confirmed = _context20.sent;
            if (_confirmed.isConfirmed) {
              _context20.next = 12;
              break;
            }
            return _context20.abrupt("return");
          case 12:
            coachId = _this31.$route.params.id; // Delete via coach messages endpoint
            _context20.next = 15;
            return axios__WEBPACK_IMPORTED_MODULE_0___default()["delete"]("coaches/".concat(coachId, "/messages/").concat(messageId));
          case 15:
            response = _context20.sent;
            if (response.data.success) {
              _this31.showSuccess("Message deleted successfully!");
              _this31.messages = _this31.messages.filter(function (message) {
                return message.id !== messageId;
              });
              // Close modal if the deleted message was being viewed
              if (_this31.selectedMessage && _this31.selectedMessage.id === messageId) {
                _this31.closeMessageModal();
              }
            } else {
              _this31.showError(response.data.message || "Failed to delete message");
            }
            _context20.next = 24;
            break;
          case 19:
            _context20.prev = 19;
            _context20.t0 = _context20["catch"](0);
            console.error("Error deleting message:", _context20.t0);
            errorMessage = ((_error$response18 = _context20.t0.response) === null || _error$response18 === void 0 || (_error$response18 = _error$response18.data) === null || _error$response18 === void 0 ? void 0 : _error$response18.message) || ((_error$response19 = _context20.t0.response) === null || _error$response19 === void 0 || (_error$response19 = _error$response19.data) === null || _error$response19 === void 0 ? void 0 : _error$response19.error) || "Error deleting message. Please try again.";
            _this31.showError(errorMessage);
          case 24:
          case "end":
            return _context20.stop();
        }
      }, _callee20, null, [[0, 19]]);
    }))();
  }), "fetchAssignedMembers", function fetchAssignedMembers() {
    var _this32 = this;
    return _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee21() {
      var coachId, params, response, firstMember, membersWithoutAssignmentId;
      return _regeneratorRuntime().wrap(function _callee21$(_context21) {
        while (1) switch (_context21.prev = _context21.next) {
          case 0:
            _context21.prev = 0;
            _this32.isLoadingAssignedMembers = true;
            coachId = _this32.$route.params.id;
            console.log("Fetching assigned members for coach ID:", coachId);
            if (coachId) {
              _context21.next = 8;
              break;
            }
            _this32.showError("No coach ID provided");
            _this32.assignedMembers = [];
            return _context21.abrupt("return");
          case 8:
            // Call the actual API endpoint with optional no_membership filter
            params = {};
            if (_this32.noMembershipFilter) {
              params.no_membership = '1';
            }
            _context21.next = 12;
            return axios__WEBPACK_IMPORTED_MODULE_0___default().get("coaches/".concat(coachId, "/assigned-members"), {
              params: params
            });
          case 12:
            response = _context21.sent;
            console.log("API Response:", response.data);
            if (response.data.status === "success") {
              _this32.assignedMembers = response.data.members || [];
              _this32.filteredAssignedMembers = _toConsumableArray(_this32.assignedMembers);
              console.log("Assigned members loaded:", _this32.assignedMembers);

              // Debug: Log first member's data including assignment_id
              if (_this32.assignedMembers.length > 0) {
                firstMember = _this32.assignedMembers[0];
                console.log("First member data:", firstMember);
                console.log("Assignment ID check:", {
                  assignment_id: firstMember.assignment_id,
                  member_id: firstMember.id,
                  has_assignment_id: !!firstMember.assignment_id
                });
                console.log("Available date fields:", {
                  join_date: firstMember.join_date,
                  created_at: firstMember.created_at,
                  joining_date: firstMember.joining_date,
                  date_joined: firstMember.date_joined,
                  registration_date: firstMember.registration_date,
                  member_since: firstMember.member_since,
                  start_date: firstMember.start_date,
                  enrollment_date: firstMember.enrollment_date
                });

                // Validate that assignment_id exists for all members
                membersWithoutAssignmentId = _this32.assignedMembers.filter(function (m) {
                  return !m.assignment_id;
                });
                if (membersWithoutAssignmentId.length > 0) {
                  console.warn("Warning: Some members are missing assignment_id:", membersWithoutAssignmentId);
                }
              }
            } else {
              _this32.showError("Failed to fetch assigned members");
              _this32.assignedMembers = [];
              _this32.filteredAssignedMembers = [];
            }
            _context21.next = 22;
            break;
          case 17:
            _context21.prev = 17;
            _context21.t0 = _context21["catch"](0);
            console.error("Error fetching assigned members:", _context21.t0);
            if (_context21.t0.response && _context21.t0.response.data && _context21.t0.response.data.message) {
              _this32.showError(_context21.t0.response.data.message);
            } else {
              _this32.showError("Error fetching assigned members");
            }
            _this32.assignedMembers = [];
          case 22:
            _context21.prev = 22;
            _this32.isLoadingAssignedMembers = false;
            return _context21.finish(22);
          case 25:
          case "end":
            return _context21.stop();
        }
      }, _callee21, null, [[0, 17, 22, 25]]);
    }))();
  }), "fetchAvailableMembers", function fetchAvailableMembers() {
    var _this33 = this;
    return _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee22() {
      var coachId, response, allMembers, unassignedMembers;
      return _regeneratorRuntime().wrap(function _callee22$(_context22) {
        while (1) switch (_context22.prev = _context22.next) {
          case 0:
            _context22.prev = 0;
            coachId = _this33.$route.params.id;
            console.log("Fetching available members for coach:", coachId);
            if (coachId) {
              _context22.next = 8;
              break;
            }
            console.log("No coach ID, clearing members");
            _this33.members = [];
            _this33.filteredMembers = [];
            return _context22.abrupt("return");
          case 8:
            _context22.prev = 8;
            console.log("Trying to get unassigned members from backend...");
            _context22.next = 12;
            return axios__WEBPACK_IMPORTED_MODULE_0___default().get("get_unassigned_members");
          case 12:
            response = _context22.sent;
            console.log("Unassigned members API response:", response);
            _context22.next = 23;
            break;
          case 16:
            _context22.prev = 16;
            _context22.t0 = _context22["catch"](8);
            console.log("Unassigned members API not available, falling back to all members...");
            // Fallback to get all members and filter on frontend
            _context22.next = 21;
            return axios__WEBPACK_IMPORTED_MODULE_0___default().get("get_members_without_paginate");
          case 21:
            response = _context22.sent;
            console.log("All members API response:", response);
          case 23:
            if (response.data && Array.isArray(response.data)) {
              allMembers = response.data || [];
              console.log("Total members from API (already filtered by gym):", allMembers.length);

              // Debug: Log first few members to see their structure
              if (allMembers.length > 0) {
                console.log("Sample members from API:", allMembers.slice(0, 3));
                console.log("First member structure:", Object.keys(allMembers[0]));
              }

              // Filter out members already assigned to ANY coach (not just this coach)
              // We need to check if member has a coach_id or is assigned to any coach
              unassignedMembers = allMembers.filter(function (member) {
                // Check various possible fields that might indicate assignment
                var isAssigned = member.coach_id || member.coachId || member.assigned_coach_id || member.assigned_coach || member.isAssigned === true || member.assigned === true || member.coach_assignment || member.coach_assignment_id || member.assigned_to_coach || member.coach_assigned || member.has_coach || member.coach_name || member.coach_email;

                // Additional check: if any coach-related field has a value (not null, undefined, or empty string)
                var hasCoachValue = Object.keys(member).some(function (key) {
                  var keyLower = key.toLowerCase();
                  return (keyLower.includes("coach") || keyLower.includes("assigned")) && member[key] !== null && member[key] !== undefined && member[key] !== "" && member[key] !== 0;
                });

                // Debug logging for each member
                if (isAssigned || hasCoachValue) {
                  console.log("Member is assigned:", member.name || member.membername, "Assignment fields:", {
                    coach_id: member.coach_id,
                    coachId: member.coachId,
                    assigned_coach_id: member.assigned_coach_id,
                    assigned_coach: member.assigned_coach,
                    isAssigned: member.isAssigned,
                    assigned: member.assigned,
                    coach_assignment: member.coach_assignment,
                    coach_assignment_id: member.coach_assignment_id,
                    assigned_to_coach: member.assigned_to_coach,
                    coach_assigned: member.coach_assigned,
                    has_coach: member.has_coach,
                    coach_name: member.coach_name,
                    coach_email: member.coach_email,
                    hasCoachValue: hasCoachValue
                  });
                }
                return !isAssigned && !hasCoachValue;
              });
              console.log("Unassigned members:", unassignedMembers.length);
              _this33.members = unassignedMembers;
              _this33.filteredMembers = _toConsumableArray(_this33.members);
              _this33.updatePagination();
            } else {
              console.warn("Invalid available members data format:", response.data);
              _this33.members = [];
              _this33.filteredMembers = [];
              _this33.updatePagination();
            }
            _context22.next = 32;
            break;
          case 26:
            _context22.prev = 26;
            _context22.t1 = _context22["catch"](0);
            console.error("Error fetching available members:", _context22.t1);
            // Fallback to sample data if the API fails
            console.log("Falling back to sample members data...");
            _this33.loadSampleMembers();
            _this33.updatePagination();
          case 32:
          case "end":
            return _context22.stop();
        }
      }, _callee22, null, [[0, 26], [8, 16]]);
    }))();
  }), "loadSampleMembers", function loadSampleMembers() {
    console.log("Loading sample members data...");
    this.members = [{
      id: 1,
      name: "John Doe",
      email: "john.doe@example.com",
      phone: "+1 (555) 123-4567",
      join_date: "2024-01-15",
      status: "active",
      membership_type: "Premium",
      profile_image: "https://via.placeholder.com/60x60/4F92F2/FFFFFF?text=JD"
    }, {
      id: 2,
      name: "Jane Smith",
      email: "jane.smith@example.com",
      phone: "+1 (555) 234-5678",
      join_date: "2024-02-20",
      status: "active",
      membership_type: "Standard",
      profile_image: "https://via.placeholder.com/60x60/E74C3C/FFFFFF?text=JS"
    }, {
      id: 3,
      name: "Mike Johnson",
      email: "mike.johnson@example.com",
      phone: "+1 (555) 345-6789",
      join_date: "2024-03-10",
      status: "active",
      membership_type: "Basic",
      profile_image: "https://via.placeholder.com/60x60/27AE60/FFFFFF?text=MJ"
    }, {
      id: 4,
      name: "Sarah Wilson",
      email: "sarah.wilson@example.com",
      phone: "+1 (555) 456-7890",
      join_date: "2024-01-25",
      status: "active",
      membership_type: "Premium",
      profile_image: "https://via.placeholder.com/60x60/F39C12/FFFFFF?text=SW"
    }, {
      id: 5,
      name: "David Brown",
      email: "david.brown@example.com",
      phone: "+1 (555) 567-8901",
      join_date: "2024-02-05",
      status: "active",
      membership_type: "Standard",
      profile_image: "https://via.placeholder.com/60x60/8E44AD/FFFFFF?text=DB"
    }];
    this.filteredMembers = _toConsumableArray(this.members);
    this.updatePagination();
    console.log("Sample members loaded:", this.members.length);
  }), "fetchSettings", function fetchSettings() {
    var _this34 = this;
    return _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee23() {
      var coachId, response;
      return _regeneratorRuntime().wrap(function _callee23$(_context23) {
        while (1) switch (_context23.prev = _context23.next) {
          case 0:
            _context23.prev = 0;
            coachId = _this34.$route.params.id;
            if (coachId) {
              _context23.next = 4;
              break;
            }
            return _context23.abrupt("return");
          case 4:
            _context23.next = 6;
            return axios__WEBPACK_IMPORTED_MODULE_0___default().get("coaches/".concat(coachId, "/settings"));
          case 6:
            response = _context23.sent;
            if (response.data.status) {
              _this34.settings = response.data.settings;
              console.log("Settings loaded successfully:", _this34.settings);
            } else {
              _this34.showError("Failed to fetch settings");
            }
            _context23.next = 15;
            break;
          case 10:
            _context23.prev = 10;
            _context23.t0 = _context23["catch"](0);
            console.error("Error fetching settings:", _context23.t0);
            _this34.showError("Error loading settings. Using default values.");

            // Fallback to default settings
            _this34.settings = {
              accountStatus: "active",
              accountType: "full-time",
              joinDate: "2024-01-01",
              notifications: {
                email: {
                  newTasks: true,
                  messages: true,
                  memberAssignments: true,
                  scheduleUpdates: false
                },
                sms: {
                  urgentTasks: true,
                  scheduleChanges: false
                }
              },
              privacy: {
                profileVisibility: "public",
                contactVisibility: "members-only",
                scheduleVisibility: "members-only"
              },
              workPreferences: {
                defaultSessionDuration: 60,
                maxClientsPerDay: 8,
                workStartTime: "09:00",
                workEndTime: "17:00",
                breakTime: 10
              },
              payment: {
                paymentMethod: "bank-transfer",
                paymentFrequency: "monthly",
                taxId: ""
              },
              security: {
                twoFactorAuth: false,
                sessionTimeout: 30
              }
            };
          case 15:
          case "end":
            return _context23.stop();
        }
      }, _callee23, null, [[0, 10]]);
    }))();
  }), "updateSettings", function updateSettings() {
    var _this35 = this;
    return _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee24() {
      var coachId, response;
      return _regeneratorRuntime().wrap(function _callee24$(_context24) {
        while (1) switch (_context24.prev = _context24.next) {
          case 0:
            _context24.prev = 0;
            coachId = _this35.$route.params.id;
            if (coachId) {
              _context24.next = 5;
              break;
            }
            _this35.showError("Coach ID not found");
            return _context24.abrupt("return");
          case 5:
            _context24.next = 7;
            return axios__WEBPACK_IMPORTED_MODULE_0___default().put("coaches/".concat(coachId, "/settings"), _this35.settings);
          case 7:
            response = _context24.sent;
            if (response.data.status) {
              _this35.showSuccess("Settings updated successfully!");
              console.log("Settings updated:", response.data.settings);
            } else {
              _this35.showError("Failed to update settings");
            }
            _context24.next = 15;
            break;
          case 11:
            _context24.prev = 11;
            _context24.t0 = _context24["catch"](0);
            console.error("Error updating settings:", _context24.t0);
            if (_context24.t0.response && _context24.t0.response.data && _context24.t0.response.data.message) {
              _this35.showError(_context24.t0.response.data.message);
            } else {
              _this35.showError("Error updating settings");
            }
          case 15:
          case "end":
            return _context24.stop();
        }
      }, _callee24, null, [[0, 11]]);
    }))();
  }), "resetSettings", function resetSettings() {
    var _this36 = this;
    return _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee25() {
      var coachId, response;
      return _regeneratorRuntime().wrap(function _callee25$(_context25) {
        while (1) switch (_context25.prev = _context25.next) {
          case 0:
            _context25.prev = 0;
            coachId = _this36.$route.params.id;
            if (coachId) {
              _context25.next = 5;
              break;
            }
            _this36.showError("Coach ID not found");
            return _context25.abrupt("return");
          case 5:
            _context25.next = 7;
            return axios__WEBPACK_IMPORTED_MODULE_0___default().post("coaches/".concat(coachId, "/settings/reset"));
          case 7:
            response = _context25.sent;
            if (response.data.status) {
              _this36.settings = response.data.settings;
              _this36.showSuccess("Settings reset to defaults successfully!");
              console.log("Settings reset:", _this36.settings);
            } else {
              _this36.showError("Failed to reset settings");
            }
            _context25.next = 15;
            break;
          case 11:
            _context25.prev = 11;
            _context25.t0 = _context25["catch"](0);
            console.error("Error resetting settings:", _context25.t0);
            _this36.showError("Error resetting settings");
          case 15:
          case "end":
            return _context25.stop();
        }
      }, _callee25, null, [[0, 11]]);
    }))();
  }), "saveSettings", function saveSettings() {
    var _this37 = this;
    return _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee26() {
      var coachId;
      return _regeneratorRuntime().wrap(function _callee26$(_context26) {
        while (1) switch (_context26.prev = _context26.next) {
          case 0:
            _context26.prev = 0;
            _this37.isSavingSettings = true;
            coachId = _this37.$route.params.id;
            if (coachId) {
              _context26.next = 6;
              break;
            }
            _this37.showError("No coach ID found");
            return _context26.abrupt("return");
          case 6:
            _context26.next = 8;
            return new Promise(function (resolve) {
              return setTimeout(resolve, 1000);
            });
          case 8:
            // Simulate successful settings save
            _this37.showSuccess("Settings saved successfully!");

            // Uncomment the following when the API endpoint is available:
            /*
            const response = await axios.put(`coaches/${coachId}/settings`, this.settings);
              if (response.data.success) {
            this.showSuccess("Settings saved successfully!");
            } else {
            this.showError("Failed to save settings");
            }
            */
            _context26.next = 15;
            break;
          case 11:
            _context26.prev = 11;
            _context26.t0 = _context26["catch"](0);
            console.error("Error saving settings:", _context26.t0);
            _this37.showError("Error saving settings. Please try again.");
          case 15:
            _context26.prev = 15;
            _this37.isSavingSettings = false;
            return _context26.finish(15);
          case 18:
          case "end":
            return _context26.stop();
        }
      }, _callee26, null, [[0, 11, 15, 18]]);
    }))();
  }), _defineProperty(_methods, "changePassword", function changePassword() {
    var _this38 = this;
    return _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee27() {
      var currentPassword, newPassword, confirmPassword, _yield$_this38$$swal, formValues;
      return _regeneratorRuntime().wrap(function _callee27$(_context27) {
        while (1) switch (_context27.prev = _context27.next) {
          case 0:
            _context27.prev = 0;
            if (!(typeof _this38.$swal === "undefined")) {
              _context27.next = 15;
              break;
            }
            // Fallback to browser prompt if SweetAlert is not available
            currentPassword = prompt("Enter current password:");
            if (currentPassword) {
              _context27.next = 5;
              break;
            }
            return _context27.abrupt("return");
          case 5:
            newPassword = prompt("Enter new password:");
            if (newPassword) {
              _context27.next = 8;
              break;
            }
            return _context27.abrupt("return");
          case 8:
            confirmPassword = prompt("Confirm new password:");
            if (!(newPassword !== confirmPassword)) {
              _context27.next = 12;
              break;
            }
            alert("Passwords do not match!");
            return _context27.abrupt("return");
          case 12:
            // Simulate password change
            _this38.showSuccess("Password changed successfully!");
            _context27.next = 23;
            break;
          case 15:
            _context27.next = 17;
            return _this38.$swal({
              title: "Change Password",
              html: "\n              <input id=\"currentPassword\" class=\"swal2-input\" placeholder=\"Current Password\" type=\"password\">\n              <input id=\"newPassword\" class=\"swal2-input\" placeholder=\"New Password\" type=\"password\">\n              <input id=\"confirmPassword\" class=\"swal2-input\" placeholder=\"Confirm New Password\" type=\"password\">\n            ",
              focusConfirm: false,
              preConfirm: function preConfirm() {
                var currentPassword = document.getElementById("currentPassword").value;
                var newPassword = document.getElementById("newPassword").value;
                var confirmPassword = document.getElementById("confirmPassword").value;
                if (!currentPassword || !newPassword || !confirmPassword) {
                  _this38.$swal.showValidationMessage("Please fill in all fields");
                  return false;
                }
                if (newPassword !== confirmPassword) {
                  _this38.$swal.showValidationMessage("Passwords do not match");
                  return false;
                }
                if (newPassword.length < 8) {
                  _this38.$swal.showValidationMessage("Password must be at least 8 characters");
                  return false;
                }
                return {
                  currentPassword: currentPassword,
                  newPassword: newPassword
                };
              }
            });
          case 17:
            _yield$_this38$$swal = _context27.sent;
            formValues = _yield$_this38$$swal.value;
            if (!formValues) {
              _context27.next = 23;
              break;
            }
            _context27.next = 22;
            return new Promise(function (resolve) {
              return setTimeout(resolve, 1000);
            });
          case 22:
            _this38.showSuccess("Password changed successfully!");
          case 23:
            _context27.next = 29;
            break;
          case 25:
            _context27.prev = 25;
            _context27.t0 = _context27["catch"](0);
            console.error("Error changing password:", _context27.t0);
            _this38.showError("Error changing password. Please try again.");
          case 29:
          case "end":
            return _context27.stop();
        }
      }, _callee27, null, [[0, 25]]);
    }))();
  })),
  created: function created() {
    this.fetchClientData();
    this.fetchMembers();
    this.fetchAssignedMembers();
    this.fetchAvailableMembers();
    // Load notes if notes tab is active
    if (this.activeTab === 'notes') {
      this.loadNotes();
    }
  },
  watch: {
    "$route.params.id": function $routeParamsId(newId) {
      if (newId) {
        this.fetchClientData();
      }
    },
    activeAction: function activeAction(newAction, oldAction) {
      if (newAction === "newTask" && !this.editingTaskId) {
        // Only reset form if we're not editing a task
        this.resetTaskForm();
        this.fetchCoachTasks();
      }
    },
    activeTab: function activeTab(newTab) {
      console.log("Tab changed to:", newTab);
      if (newTab === "newTask") {
        this.fetchCoachTasks();
      } else if (newTab === "sendMessage") {
        this.fetchMessages();
      } else if (newTab === "members") {
        console.log("Members tab activated, fetching data...");
        this.activeAction = null; // Reset to default view
        this.viewMode = "table"; // Default to table view
        this.fetchAssignedMembers();
        this.fetchAvailableMembers();
      } else if (newTab === "latestActivities") {
        this.fetchCoachActivities();
      } else if (newTab === "notes") {
        this.loadNotes();
      } else if (newTab === "settings") {
        this.fetchSettings();
      }
    },
    // Watch for changes in assigned members to update available members
    assignedMembers: {
      handler: function handler() {
        this.fetchAvailableMembers();
      },
      deep: true
    }
  }
});

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js??clonedRuleSet-12.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12.use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-12.use[3]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/Staff/coachdetails.vue?vue&type=style&index=0&id=64bf2f74&lang=scss&scoped=true":
/*!*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??clonedRuleSet-12.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12.use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-12.use[3]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/Staff/coachdetails.vue?vue&type=style&index=0&id=64bf2f74&lang=scss&scoped=true ***!
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
___CSS_LOADER_EXPORT___.push([module.id, "@charset \"UTF-8\";\n.filter-btn .btn[data-v-64bf2f74],\n.filter-btn .btn-secondary[data-v-64bf2f74],\n.filter-btn .btn-outline-secondary[data-v-64bf2f74],\n.filter-btn button.btn[data-v-64bf2f74],\n.filter-btn button.btn-secondary[data-v-64bf2f74] {\n  color: #000 !important;\n  background-color: transparent !important;\n  border-color: #6c757d !important;\n}\n.filter-btn .btn[data-v-64bf2f74]:hover,\n.filter-btn .btn-secondary[data-v-64bf2f74]:hover,\n.filter-btn .btn-outline-secondary[data-v-64bf2f74]:hover,\n.filter-btn button.btn[data-v-64bf2f74]:hover,\n.filter-btn button.btn-secondary[data-v-64bf2f74]:hover {\n  color: #dc3545 !important;\n  background-color: transparent !important;\n  border-color: #dc3545 !important;\n  box-shadow: none !important;\n}\n.filter-btn .btn[data-v-64bf2f74]:focus,\n.filter-btn .btn-secondary[data-v-64bf2f74]:focus,\n.filter-btn .btn-outline-secondary[data-v-64bf2f74]:focus,\n.filter-btn button.btn[data-v-64bf2f74]:focus,\n.filter-btn button.btn-secondary[data-v-64bf2f74]:focus {\n  color: #dc3545 !important;\n  background-color: transparent !important;\n  border-color: #dc3545 !important;\n  box-shadow: none !important;\n}\n.filter-btn .btn[data-v-64bf2f74]:active,\n.filter-btn .btn-secondary[data-v-64bf2f74]:active,\n.filter-btn .btn-outline-secondary[data-v-64bf2f74]:active,\n.filter-btn button.btn[data-v-64bf2f74]:active,\n.filter-btn button.btn-secondary[data-v-64bf2f74]:active {\n  color: #dc3545 !important;\n  background-color: transparent !important;\n  border-color: #dc3545 !important;\n}\n.btn-secondary[data-v-64bf2f74]:not(:disabled):not(.disabled):active:focus {\n  box-shadow: none !important;\n}\n\n/* ===========================================\n   COMMON BREADCRUMB NAVIGATION STYLES\n   =========================================== */\n.breadcrumb-nav-row[data-v-64bf2f74] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  margin-bottom: 0.5rem;\n  gap: 0.5rem;\n}\n.breadcrumb-section[data-v-64bf2f74] {\n  flex: 1;\n}\n.breadcrumb-section .breadcrumb-nav .breadcrumb-container[data-v-64bf2f74] {\n  display: flex;\n  align-items: center;\n  gap: 1rem;\n}\n.breadcrumb-section .breadcrumb-nav .breadcrumb-container .back-button[data-v-64bf2f74] {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  width: 40px;\n  height: 40px;\n  background: rgba(255, 255, 255, 0.1);\n  border: 1px solid rgba(255, 255, 255, 0.2);\n  border-radius: 8px;\n  color: #ffffff;\n  cursor: pointer;\n  transition: all 0.3s ease;\n}\n.breadcrumb-section .breadcrumb-nav .breadcrumb-container .back-button[data-v-64bf2f74]:hover {\n  background: rgba(255, 255, 255, 0.15);\n  border-color: rgba(255, 255, 255, 0.3);\n  transform: translateY(-1px);\n  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);\n  color: #dc3545;\n}\n.breadcrumb-section .breadcrumb-nav .breadcrumb-container .back-button i[data-v-64bf2f74] {\n  font-size: 1.1em;\n}\n.breadcrumb-section .breadcrumb-nav .breadcrumb-container .breadcrumb[data-v-64bf2f74] {\n  display: flex;\n  align-items: center;\n  gap: 0.5rem;\n  margin: 0;\n  padding: 0;\n  background: none;\n  border-radius: 0;\n}\n.breadcrumb-section .breadcrumb-nav .breadcrumb-container .breadcrumb .breadcrumb-item[data-v-64bf2f74] {\n  display: flex;\n  align-items: center;\n  gap: 0.5rem;\n  font-size: 0.875rem;\n  color: #ffffff;\n}\n.breadcrumb-section .breadcrumb-nav .breadcrumb-container .breadcrumb .breadcrumb-item.active[data-v-64bf2f74] {\n  color: #252525;\n  font-weight: 600;\n}\n.breadcrumb-section .breadcrumb-nav .breadcrumb-container .breadcrumb .breadcrumb-item.active i[data-v-64bf2f74] {\n  color: #dc3545;\n}\n.breadcrumb-section .breadcrumb-nav .breadcrumb-container .breadcrumb .breadcrumb-item a[data-v-64bf2f74] {\n  display: flex;\n  align-items: center;\n  gap: 0.5rem;\n  color: #6a6a6a;\n  text-decoration: none;\n  transition: color 0.3s ease;\n}\n.breadcrumb-section .breadcrumb-nav .breadcrumb-container .breadcrumb .breadcrumb-item a[data-v-64bf2f74]:hover {\n  color: #dc3545;\n}\n.breadcrumb-section .breadcrumb-nav .breadcrumb-container .breadcrumb .breadcrumb-item a:hover i[data-v-64bf2f74] {\n  color: #dc3545;\n}\n.breadcrumb-section .breadcrumb-nav .breadcrumb-container .breadcrumb .breadcrumb-item a i[data-v-64bf2f74] {\n  font-size: 0.9em;\n  transition: color 0.3s ease;\n}\n.breadcrumb-section .breadcrumb-nav .breadcrumb-container .breadcrumb .breadcrumb-item[data-v-64bf2f74]:not(:last-child)::after {\n  content: \"›\";\n  margin-left: 0.5rem;\n  color: #6a6a6a;\n  font-size: 1.2em;\n}\n.action-section[data-v-64bf2f74] {\n  display: flex;\n  align-items: center;\n}\n.action-section .action-btn[data-v-64bf2f74] {\n  display: flex;\n  align-items: center;\n  gap: 0.5rem;\n  padding: 0.5rem 1rem;\n  border-radius: 8px;\n  font-size: 0.875rem;\n  font-weight: 500;\n  transition: all 0.3s ease;\n}\n.action-section .action-btn[data-v-64bf2f74]:hover:not(:disabled) {\n  transform: translateY(-1px);\n  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);\n}\n.action-section .action-btn[data-v-64bf2f74]:disabled {\n  opacity: 0.6;\n  cursor: not-allowed;\n}\n.action-section .action-btn i[data-v-64bf2f74] {\n  font-size: 0.9em;\n}\n@media (max-width: 768px) {\n.breadcrumb-nav-row[data-v-64bf2f74] {\n    flex-direction: column;\n    align-items: flex-start;\n    gap: 0.5rem;\n}\n.breadcrumb-section[data-v-64bf2f74] {\n    width: 100%;\n}\n.breadcrumb-section .breadcrumb-container[data-v-64bf2f74] {\n    flex-direction: column;\n    align-items: flex-start;\n    gap: 0.5rem;\n}\n.breadcrumb-section .breadcrumb-container .breadcrumb[data-v-64bf2f74] {\n    flex-wrap: wrap;\n}\n.breadcrumb-section .breadcrumb-container .breadcrumb .breadcrumb-item[data-v-64bf2f74] {\n    font-size: 0.8rem;\n}\n.breadcrumb-section .breadcrumb-container .breadcrumb .breadcrumb-item a[data-v-64bf2f74] {\n    font-size: 0.8rem;\n}\n.action-section[data-v-64bf2f74] {\n    width: 100%;\n    justify-content: flex-end;\n}\n.action-section .action-btn[data-v-64bf2f74] {\n    font-size: 0.8rem;\n    padding: 0.4rem 0.8rem;\n}\n}\n/* ===========================================\n   RESPONSIVE UTILITY CLASSES (ALL DEVICES)\n   =========================================== */\n.show-xs-only[data-v-64bf2f74],\n.show-sm-only[data-v-64bf2f74],\n.show-md-only[data-v-64bf2f74],\n.show-lg-only[data-v-64bf2f74],\n.show-xl-only[data-v-64bf2f74] {\n  display: none !important;\n}\n@media (max-width: 575px) {\n.hide-xs[data-v-64bf2f74] {\n    display: none !important;\n}\n.show-xs-only[data-v-64bf2f74] {\n    display: initial !important;\n}\n}\n@media (min-width: 576px) and (max-width: 767px) {\n.hide-sm[data-v-64bf2f74] {\n    display: none !important;\n}\n.show-sm-only[data-v-64bf2f74] {\n    display: initial !important;\n}\n}\n@media (min-width: 768px) and (max-width: 991px) {\n.hide-md[data-v-64bf2f74] {\n    display: none !important;\n}\n.show-md-only[data-v-64bf2f74] {\n    display: initial !important;\n}\n}\n@media (min-width: 992px) and (max-width: 1199px) {\n.hide-lg[data-v-64bf2f74] {\n    display: none !important;\n}\n.show-lg-only[data-v-64bf2f74] {\n    display: initial !important;\n}\n}\n@media (min-width: 1200px) {\n.hide-xl[data-v-64bf2f74] {\n    display: none !important;\n}\n.show-xl-only[data-v-64bf2f74] {\n    display: initial !important;\n}\n}\n@media (max-width: 576px) {\n.hide-sm-down[data-v-64bf2f74] {\n    display: none !important;\n}\n}\n@media (max-width: 768px) {\n.hide-md-down[data-v-64bf2f74] {\n    display: none !important;\n}\n}\n@media (max-width: 992px) {\n.hide-lg-down[data-v-64bf2f74] {\n    display: none !important;\n}\n}\n@media (min-width: 576px) {\n.hide-sm-up[data-v-64bf2f74] {\n    display: none !important;\n}\n}\n@media (min-width: 768px) {\n.hide-md-up[data-v-64bf2f74] {\n    display: none !important;\n}\n}\n@media (min-width: 992px) {\n.hide-lg-up[data-v-64bf2f74] {\n    display: none !important;\n}\n}\n@media (max-width: 575px) {\n.d-xs-none[data-v-64bf2f74] {\n    display: none !important;\n}\n.d-xs-block[data-v-64bf2f74] {\n    display: block !important;\n}\n.d-xs-flex[data-v-64bf2f74] {\n    display: flex !important;\n}\n}\n@media (min-width: 576px) and (max-width: 767px) {\n.d-sm-none[data-v-64bf2f74] {\n    display: none !important;\n}\n.d-sm-block[data-v-64bf2f74] {\n    display: block !important;\n}\n.d-sm-flex[data-v-64bf2f74] {\n    display: flex !important;\n}\n}\n@media (min-width: 768px) and (max-width: 991px) {\n.d-md-none[data-v-64bf2f74] {\n    display: none !important;\n}\n.d-md-block[data-v-64bf2f74] {\n    display: block !important;\n}\n.d-md-flex[data-v-64bf2f74] {\n    display: flex !important;\n}\n}\n@media (min-width: 992px) and (max-width: 1199px) {\n.d-lg-none[data-v-64bf2f74] {\n    display: none !important;\n}\n.d-lg-block[data-v-64bf2f74] {\n    display: block !important;\n}\n.d-lg-flex[data-v-64bf2f74] {\n    display: flex !important;\n}\n}\n@media (min-width: 1200px) {\n.d-xl-none[data-v-64bf2f74] {\n    display: none !important;\n}\n.d-xl-block[data-v-64bf2f74] {\n    display: block !important;\n}\n.d-xl-flex[data-v-64bf2f74] {\n    display: flex !important;\n}\n}\n@media (min-width: 576px) {\n.custom-modal-xl[data-v-64bf2f74] {\n    max-width: 1500px !important;\n}\n}\n/* ===========================================\n   MEMBER DETAILS COMPONENT STYLES\n   =========================================== */\n.nutrition-form-section[data-v-64bf2f74] {\n  background: #ffffff;\n  border-radius: 15px;\n  padding: 20px;\n  margin-bottom: 20px;\n  border: 1px solid #dcdcdc;\n  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.08);\n}\n.nutrition-form-header[data-v-64bf2f74] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  margin-bottom: 20px;\n  padding-bottom: 15px;\n  border-bottom: 2px solid #dcdcdc;\n}\n.nutrition-form-header .nutrition-form-title[data-v-64bf2f74] {\n  margin: 0;\n  font-size: 1.2rem;\n  font-weight: 600;\n  color: #252525;\n  display: flex;\n  align-items: center;\n  gap: 10px;\n}\n.nutrition-form-header .nutrition-form-title i[data-v-64bf2f74] {\n  color: #dc3545;\n}\n.nutrition-plans-list .loading-nutrition-plans[data-v-64bf2f74] {\n  text-align: center;\n  padding: 40px 20px;\n  color: #6a6a6a;\n}\n.nutrition-plans-list .loading-nutrition-plans .spinner-border[data-v-64bf2f74] {\n  margin-bottom: 15px;\n}\n.nutrition-plans-list .loading-nutrition-plans p[data-v-64bf2f74] {\n  margin: 0;\n  font-size: 1rem;\n}\n.nutrition-plans-list .no-nutrition-plans[data-v-64bf2f74] {\n  text-align: center;\n  padding: 40px 20px;\n  color: #6a6a6a;\n}\n.nutrition-plans-list .no-nutrition-plans i[data-v-64bf2f74] {\n  font-size: 3rem;\n  margin-bottom: 15px;\n  opacity: 0.5;\n}\n.nutrition-plans-list .no-nutrition-plans p[data-v-64bf2f74] {\n  margin: 0;\n  font-size: 1rem;\n}\n.nutrition-plans-list .nutrition-plans-table .table[data-v-64bf2f74] {\n  margin-bottom: 0;\n}\n.nutrition-plans-list .nutrition-plans-table .table th[data-v-64bf2f74] {\n  background: #f8f9fa;\n  border-bottom: 2px solid #dcdcdc;\n  font-weight: 600;\n  color: #252525;\n  padding: 12px 15px;\n}\n.nutrition-plans-list .nutrition-plans-table .table td[data-v-64bf2f74] {\n  padding: 12px 15px;\n  vertical-align: middle;\n  border-bottom: 1px solid #e9ecef;\n}\n.nutrition-plans-list .nutrition-plans-table .table .date-badge[data-v-64bf2f74] {\n  background: #e3f2fd;\n  color: #1976d2;\n  padding: 4px 8px;\n  border-radius: 4px;\n  font-size: 0.85rem;\n  font-weight: 500;\n}\n.nutrition-plans-list .nutrition-plans-table .table .status-badge[data-v-64bf2f74] {\n  padding: 4px 8px;\n  border-radius: 4px;\n  font-size: 0.85rem;\n  font-weight: 500;\n}\n.nutrition-plans-list .nutrition-plans-table .table .status-badge.status-active[data-v-64bf2f74] {\n  background: #d4edda;\n  color: #155724;\n}\n.nutrition-plans-list .nutrition-plans-table .table .status-badge.status-completed[data-v-64bf2f74] {\n  background: #cce5ff;\n  color: #004085;\n}\n.nutrition-plans-list .nutrition-plans-table .table .status-badge.status-cancelled[data-v-64bf2f74] {\n  background: #f8d7da;\n  color: #721c24;\n}\n.nutrition-plans-list .nutrition-plans-table .table .status-badge.status-expired[data-v-64bf2f74] {\n  background: #fff3cd;\n  color: #856404;\n}\n.nutrition-plans-list .nutrition-plans-table .table .status-badge.status-unknown[data-v-64bf2f74] {\n  background: #e2e3e5;\n  color: #383d41;\n}\n.nutrition-plans-list .nutrition-plans-table .table .nutrition-actions-1[data-v-64bf2f74] {\n  display: flex !important;\n}\n.nutrition-plans-list .nutrition-plans-table .table .nutrition-actions[data-v-64bf2f74] {\n  display: flex;\n  gap: 5px;\n  align-items: center;\n}\n.nutrition-plans-list .nutrition-plans-table .table .nutrition-actions .btn[data-v-64bf2f74] {\n  padding: 4px 8px;\n  font-size: 0.8rem;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-width: 32px;\n  height: 32px;\n}\n.nutrition-plans-list .nutrition-plans-table .table .nutrition-actions .btn.btn-outline-primary[data-v-64bf2f74] {\n  color: #dc3545;\n  border-color: #dc3545;\n}\n.nutrition-plans-list .nutrition-plans-table .table .nutrition-actions .btn.btn-outline-primary[data-v-64bf2f74]:hover {\n  background: #dc3545;\n  color: white;\n}\n.nutrition-plans-list .nutrition-plans-table .table .nutrition-actions .btn.btn-outline-danger[data-v-64bf2f74] {\n  color: #dc3545;\n  border-color: #dc3545;\n}\n.nutrition-plans-list .nutrition-plans-table .table .nutrition-actions .btn.btn-outline-danger[data-v-64bf2f74]:hover {\n  background: #dc3545;\n  color: white;\n}\n.nutrition-plans-list .nutrition-plans-table .table .nutrition-actions .btn i[data-v-64bf2f74] {\n  font-size: 0.75rem;\n}\n.loading-container[data-v-64bf2f74] {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  min-height: 400px;\n}\n.loading-container .loading-spinner[data-v-64bf2f74] {\n  text-align: center;\n}\n.loading-container .loading-spinner .spinner-border[data-v-64bf2f74] {\n  width: 3rem;\n  height: 3rem;\n}\n.loading-container .loading-spinner .loading-text[data-v-64bf2f74] {\n  margin-top: 1rem;\n  color: #6a6a6a;\n  font-size: 1rem;\n}\n.coach-form-container[data-v-64bf2f74] {\n  background: linear-gradient(135deg, #f5f5f3 0%, #e8e8e6 100%);\n}\n.form-card[data-v-64bf2f74] {\n  background: #ffffff;\n  border-radius: 10px;\n  box-shadow: 0 20px 60px rgba(79, 112, 92, 0.15);\n  overflow: hidden;\n}\n.coach-header-section[data-v-64bf2f74] {\n  background: linear-gradient(to bottom, #23415a, #0f1c29);\n  position: relative;\n  padding: 12px 16px;\n  display: flex;\n  align-items: center;\n}\n.header-wrapper[data-v-64bf2f74] {\n  width: 100%;\n  min-height: 36px;\n}\n.breadcrumb-section[data-v-64bf2f74] {\n  display: flex;\n  align-items: center;\n  flex: 0 0 auto;\n}\n.breadcrumb-nav[data-v-64bf2f74] {\n  margin-bottom: 0;\n}\n.breadcrumb-container[data-v-64bf2f74] {\n  gap: 15px;\n}\n.header-content[data-v-64bf2f74] {\n  display: flex;\n  align-items: center;\n  justify-content: flex-end;\n  gap: 12px; /* add consistent gaps between items */\n  flex: 0 0 auto;\n  height: 36px;\n}\n.breadcrumb-item[data-v-64bf2f74] {\n  color: white !important;\n}\n.breadcrumb-item.active[data-v-64bf2f74] {\n  color: white !important;\n  font-weight: 500 !important;\n}\n.breadcrumb-item a[data-v-64bf2f74] {\n  color: white !important;\n}\n.breadcrumb-item a[data-v-64bf2f74]:hover {\n  color: #e0e0e0 !important;\n}\n.coach-info[data-v-64bf2f74] {\n  display: flex;\n  align-items: center;\n  gap: 5px;\n  flex-shrink: 0;\n}\n.data-label[data-v-64bf2f74] {\n  font-size: 14px;\n  color: rgba(255, 255, 255, 0.8);\n  font-weight: 400;\n}\n.coach-name[data-v-64bf2f74] {\n  font-size: 16px;\n  font-weight: 500;\n  color: #808080 !important;\n}\n.back-button[data-v-64bf2f74] {\n  background: rgba(255, 255, 255, 0.2);\n  color: white;\n  border: 2px solid rgba(255, 255, 255, 0.4);\n  border-radius: 50%;\n  font-size: 1rem;\n  transition: all 0.3s ease;\n  -webkit-backdrop-filter: blur(10px);\n          backdrop-filter: blur(10px);\n  width: 35px;\n  height: 35px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  cursor: pointer;\n  margin-right: 10px;\n}\n.back-button[data-v-64bf2f74]:hover {\n  background: rgba(255, 255, 255, 0.3);\n  transform: translateY(-2px);\n}\n\n/* Divider Styles */\n.divider[data-v-64bf2f74] {\n  width: 1px;\n  height: 24px;\n  background: rgba(255, 255, 255, 0.3);\n  margin: 0;\n  flex-shrink: 0;\n}\n.tab-section[data-v-64bf2f74] {\n  display: flex;\n  align-items: center;\n  height: 36px;\n}\n.tab-label[data-v-64bf2f74] {\n  color: white;\n  margin: 0;\n  padding: 0;\n  line-height: 1;\n  display: flex;\n  align-items: center;\n}\n.tab-icons[data-v-64bf2f74] {\n  display: flex;\n  align-items: center;\n  gap: 4px;\n  height: 36px;\n}\n.tab-icon-btn[data-v-64bf2f74] {\n  background: transparent;\n  color: rgba(255, 255, 255, 0.7);\n  width: 36px;\n  height: 36px;\n  cursor: pointer;\n  transition: all 0.3s ease;\n  border: none;\n  border-radius: 6px;\n  padding: 0;\n  margin: 0;\n}\n.tab-icon-btn[data-v-64bf2f74]:hover {\n  background: rgba(255, 255, 255, 0.1);\n  color: white;\n  transform: translateY(-1px);\n}\n.tab-icon-btn.active[data-v-64bf2f74] {\n  background: #dc3545;\n  color: white;\n  box-shadow: 0 2px 8px rgba(220, 53, 69, 0.3);\n}\n.back-btn-container[data-v-64bf2f74] {\n  display: flex;\n  align-items: center;\n  margin-left: 16px;\n}\n.back-btn[data-v-64bf2f74] {\n  background: rgba(255, 255, 255, 0.2);\n  color: white;\n  border: 2px solid rgba(255, 255, 255, 0.4);\n  border-radius: 50%;\n  font-size: 1rem;\n  transition: all 0.3s ease;\n  -webkit-backdrop-filter: blur(10px);\n          backdrop-filter: blur(10px);\n  width: 35px;\n  height: 35px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  flex-shrink: 0;\n  cursor: pointer;\n  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);\n}\n.back-btn[data-v-64bf2f74]:hover {\n  background: rgba(255, 255, 255, 0.3);\n  transform: translateY(-2px);\n}\n\n/* Main Layout Styles */\n.main-layout[data-v-64bf2f74] {\n  display: flex;\n  gap: 10px;\n  padding: 10px;\n  min-height: calc(100vh - 215px);\n  max-height: calc(100vh - 150px);\n  overflow: hidden;\n}\n.profile-sidebar[data-v-64bf2f74] {\n  max-height: calc(100vh - 250px);\n  overflow: hidden;\n}\n.action-content[data-v-64bf2f74] {\n  height: 100%;\n}\n.form-section[data-v-64bf2f74] {\n  margin-bottom: 5px;\n  background: #ffffff;\n  border-radius: 15px;\n  padding: 10px;\n  transition: all 0.3s ease;\n}\n.form-section[data-v-64bf2f74]:hover {\n  transform: translateY(-2px);\n  border-color: #dc3545;\n}\n.section-icon[data-v-64bf2f74] {\n  width: 50px;\n  height: 50px;\n  background: #dc3545;\n  border-radius: 12px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  color: white;\n  font-size: 20px;\n  margin-right: 15px;\n  box-shadow: 0 4px 15px rgba(79, 112, 92, 0.3);\n}\n.section-title[data-v-64bf2f74] {\n  font-size: 1.3rem;\n  font-weight: 600;\n  color: #252525;\n  margin: 0;\n}\n.hover-opacity-100[data-v-64bf2f74]:hover {\n  opacity: 1 !important;\n}\n.opacity-0[data-v-64bf2f74] {\n  opacity: 0;\n}\n.transition[data-v-64bf2f74] {\n  transition: opacity 0.3s ease-in-out;\n}\n\n/* Action Items Styles */\n.action-items[data-v-64bf2f74] {\n  margin-top: 10px;\n  display: flex;\n  flex-direction: column;\n  gap: 8px;\n}\n.action-item[data-v-64bf2f74] {\n  display: flex;\n  align-items: center;\n  padding: 5px 5px;\n  transition: all 0.3s ease;\n  width: 100%;\n  box-sizing: border-box;\n  cursor: pointer;\n}\n.action-item[data-v-64bf2f74]:hover {\n  background: #f8f9fa;\n  border-color: #e0e0e0;\n  transform: translateY(-1px);\n  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);\n}\n.action-item.active[data-v-64bf2f74] {\n  background: rgba(220, 53, 69, 0.1);\n  border-color: #dc3545;\n  color: #dc3545;\n}\n.action-icon[data-v-64bf2f74] {\n  width: 24px;\n  height: 24px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  margin-right: 20px;\n  font-size: 1.25rem;\n  color: #dc3545;\n  flex-shrink: 0;\n}\n.action-text[data-v-64bf2f74] {\n  font-size: 14px;\n  font-weight: 500;\n  color: #212529;\n  flex: 1;\n  line-height: 1.4;\n}\n.action-item.active .action-icon[data-v-64bf2f74] {\n  color: #dc3545;\n}\n.action-item.active .action-text[data-v-64bf2f74] {\n  color: #dc3545;\n  font-weight: 600;\n}\n.profile-header[data-v-64bf2f74] {\n  display: flex;\n  align-items: center;\n  gap: 5px;\n  margin-bottom: 5px;\n}\n.profile-icon[data-v-64bf2f74] {\n  width: 40px;\n  height: 40px;\n  background: rgba(220, 53, 69, 0.1);\n  border-radius: 50%;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  color: #dc3545;\n  font-size: 1.2rem;\n}\n.profile-title[data-v-64bf2f74] {\n  margin: 0;\n  font-size: 1.1rem;\n  font-weight: 600;\n  color: #010101;\n}\n.profile-content[data-v-64bf2f74] {\n  text-align: center;\n}\n.profile-details .coach-name[data-v-64bf2f74] {\n  font-size: 1rem;\n  font-weight: 600;\n  color: #010101;\n  margin: 0 0 5px 0;\n}\n.profile-details .coach-id[data-v-64bf2f74] {\n  font-size: 0.85rem;\n  color: #6c757d;\n  margin: 0;\n  font-weight: 500;\n}\n\n/* Profile Sidebar Divider - Horizontal */\n.profile-divider[data-v-64bf2f74] {\n  width: 100%;\n  height: 1px;\n  background: #dcdcdc;\n}\n.content-area[data-v-64bf2f74] {\n  flex: 1;\n  overflow-y: auto;\n}\n.action-content[data-v-64bf2f74] {\n  height: 100%;\n}\n.section-content[data-v-64bf2f74] {\n  height: 100%;\n}\n\n/* Tab Navigation Styles */\n/* Tab Content Styles */\n.tab-content[data-v-64bf2f74] {\n  height: calc(100% - 60px);\n  overflow-y: auto;\n}\n.coach-form-content[data-v-64bf2f74] {\n  padding: 0;\n}\n.form-grid[data-v-64bf2f74] {\n  display: flex;\n  flex-direction: column;\n  margin-bottom: 10px;\n}\n.form-column[data-v-64bf2f74] {\n  display: flex;\n  flex-direction: column;\n}\n\n/* Form Section Styles */\n.form-section[data-v-64bf2f74] {\n  overflow: hidden;\n}\n.form-section.compact[data-v-64bf2f74] {\n  margin-bottom: 0;\n}\n.section-title[data-v-64bf2f74] {\n  margin: 0;\n  font-size: 1rem;\n  font-weight: 600;\n  color: #010101;\n}\n.section-title.compact[data-v-64bf2f74] {\n  font-size: 0.9rem;\n}\n.section-content[data-v-64bf2f74] {\n  padding: 10px;\n}\n.section-content.compact[data-v-64bf2f74] {\n  padding: 10px;\n}\n\n/* Form Group Styles */\n.form-group[data-v-64bf2f74] {\n  margin-bottom: 10px;\n}\n.form-group.compact[data-v-64bf2f74] {\n  margin-bottom: 10px;\n}\n.form-label[data-v-64bf2f74] {\n  display: block;\n  margin-bottom: 8px;\n  font-weight: 600;\n  color: #010101;\n  font-size: 0.8rem;\n}\n.form-label.compact[data-v-64bf2f74] {\n  font-size: 0.75rem;\n  margin-bottom: 6px;\n}\n.form-control[data-v-64bf2f74] {\n  width: 100%;\n  padding: 10px 20px;\n  border: 1px solid #e0e0e0;\n  border-radius: 4px;\n  font-size: 0.875rem;\n  transition: all 0.3s ease;\n  background: #ffffff;\n}\n.form-control[data-v-64bf2f74]:focus {\n  outline: none;\n  border-color: #dc3545;\n  box-shadow: 0 0 0 3px rgba(220, 53, 69, 0.1);\n}\n.form-control.compact[data-v-64bf2f74] {\n  padding: 10px 10px;\n  font-size: 0.875rem;\n}\n.form-control.readonly[data-v-64bf2f74] {\n  background: #f8f9fa;\n  color: #6a6a6a;\n  cursor: not-allowed;\n}\n.input-icon[data-v-64bf2f74] {\n  position: absolute;\n  right: 12px;\n  top: 50%;\n  transform: translateY(-50%);\n  color: #6a6a6a;\n  pointer-events: none;\n}\n\n/* Loading State Styles */\n.loading-container[data-v-64bf2f74] {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  min-height: 400px;\n}\n.loading-container .loading-spinner[data-v-64bf2f74] {\n  text-align: center;\n}\n.loading-container .loading-spinner .spinner-border[data-v-64bf2f74] {\n  width: 3rem;\n  height: 3rem;\n}\n.loading-container .loading-spinner .loading-text[data-v-64bf2f74] {\n  margin-top: 1rem;\n  color: #6a6a6a;\n  font-size: 1rem;\n}\n.form-grid[data-v-64bf2f74] {\n  display: grid;\n  grid-template-columns: 1fr 2fr;\n}\n.search-filter-section.compact[data-v-64bf2f74] {\n  background: linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%);\n  border: 1px solid #e9ecef;\n  border-radius: 6px;\n  padding: 8px;\n  margin-bottom: 8px;\n  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);\n}\n.search-filter-section.compact .filters-row[data-v-64bf2f74] {\n  display: flex;\n  gap: 8px;\n  align-items: center;\n}\n.search-filter-section.compact .filters-row .form-group.compact[data-v-64bf2f74] {\n  flex: 1;\n  min-width: 0;\n  margin-bottom: 0;\n}\n.search-filter-section.compact .filters-row .form-group.compact .form-control.compact[data-v-64bf2f74] {\n  height: 32px;\n  padding: 6px 12px;\n  font-size: 0.85rem;\n  border: 1px solid #ced4da;\n  border-radius: 4px;\n  background: white;\n  transition: all 0.2s ease;\n}\n.search-filter-section.compact .filters-row .form-group.compact .form-control.compact[data-v-64bf2f74]:focus {\n  border-color: #dc3545;\n  box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.1);\n  outline: none;\n}\n.search-filter-section.compact .filters-row .form-group.compact .form-control.compact[data-v-64bf2f74]::-moz-placeholder {\n  color: #6c757d;\n  font-size: 0.8rem;\n}\n.search-filter-section.compact .filters-row .form-group.compact .form-control.compact[data-v-64bf2f74]::placeholder {\n  color: #6c757d;\n  font-size: 0.8rem;\n}\n.search-filter-section.compact .filters-row .form-group.compact select.form-control.compact[data-v-64bf2f74] {\n  cursor: pointer;\n}\n.search-filter-section.compact .filters-row .form-group.compact select.form-control.compact[data-v-64bf2f74]:hover {\n  border-color: #adb5bd;\n}\n.filters-row[data-v-64bf2f74] {\n  display: flex;\n  gap: 20px;\n  align-items: flex-end;\n}\n.filters-row .form-group[data-v-64bf2f74] {\n  flex: 1;\n  min-width: 0;\n}\n.profile-header[data-v-64bf2f74] {\n  display: flex;\n  align-items: center;\n  margin-bottom: 5px;\n}\n.profile-icon[data-v-64bf2f74] {\n  width: 40px;\n  height: 40px;\n  background: #dc3545;\n  border-radius: 50%;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  color: white;\n  font-size: 18px;\n  margin-right: 10px;\n}\n.profile-title[data-v-64bf2f74] {\n  font-size: 1.1rem;\n  font-weight: 600;\n  color: #252525;\n  margin: 0;\n}\n.profile-content[data-v-64bf2f74] {\n  text-align: center;\n}\n.profile-avatar[data-v-64bf2f74] {\n  width: 90px;\n  height: 90px;\n  -o-object-fit: cover;\n     object-fit: cover;\n  border-radius: 50%;\n  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);\n  border: 4px solid #fff;\n  transition: all 0.3s ease;\n}\n.profile-avatar[data-v-64bf2f74]:hover {\n  transform: scale(1.05);\n  box-shadow: 0 12px 35px rgba(0, 0, 0, 0.2);\n}\n.coach-name[data-v-64bf2f74] {\n  font-size: 1.2rem;\n  font-weight: 600;\n  color: #252525;\n  margin: 5px 0 5px 0;\n}\n.coach-id[data-v-64bf2f74] {\n  font-size: 0.85rem;\n  color: #6c757d;\n  margin: 0;\n  font-weight: 500;\n}\n.form-section.compact[data-v-64bf2f74] {\n  transition: all 0.3s ease;\n}\n.section-icon[data-v-64bf2f74] {\n  width: 35px;\n  height: 35px;\n  background: #dc3545;\n  border-radius: 8px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  color: white;\n  font-size: 16px;\n  margin-right: 10px;\n  box-shadow: 0 2px 8px rgba(79, 112, 92, 0.3);\n}\n.section-title.compact[data-v-64bf2f74] {\n  font-size: 1rem;\n  font-weight: 600;\n  color: #252525;\n  margin: 0;\n}\n.section-content.compact[data-v-64bf2f74] {\n  padding: 0;\n}\n.form-column[data-v-64bf2f74] {\n  display: flex;\n  flex-direction: column;\n  gap: 15px;\n}\n.coach-form-content[data-v-64bf2f74] {\n  padding: 20px 0;\n}\n.form-group[data-v-64bf2f74] {\n  margin-bottom: 25px;\n}\n.form-group.compact[data-v-64bf2f74] {\n  margin-bottom: 8px;\n}\n.form-label[data-v-64bf2f74] {\n  font-weight: 600;\n  color: #252525;\n  margin-bottom: 10px;\n  display: block;\n  font-size: 0.9rem;\n}\n.form-label.compact[data-v-64bf2f74] {\n  font-size: 0.8rem;\n  margin-bottom: 3px;\n  font-weight: 500;\n}\n.form-control[data-v-64bf2f74] {\n  border: 1px solid #dee2e6;\n  border-radius: 8px;\n  font-size: 0.9rem;\n  transition: all 0.3s ease;\n  background: white;\n  color: #252525;\n  padding: 5px 5px !important;\n  box-sizing: border-box;\n}\n.form-control.compact[data-v-64bf2f74] {\n  padding: 6px 6px;\n  font-size: 11px;\n}\n.form-control[data-v-64bf2f74]:focus {\n  outline: none;\n  border-color: #dc3545;\n  box-shadow: 0 0 0 3px rgba(79, 112, 92, 0.1);\n  transform: translateY(-1px);\n}\n.form-control.readonly[data-v-64bf2f74] {\n  background: #f8f9fa;\n  color: #6c757d;\n  cursor: not-allowed;\n}\n.form-control textarea[data-v-64bf2f74] {\n  resize: vertical;\n  min-height: 100px;\n}\n\n/* Input Wrapper and Icon Styles */\n.input-wrapper[data-v-64bf2f74] {\n  position: relative;\n  display: flex;\n  align-items: center;\n}\n.input-wrapper .form-control[data-v-64bf2f74] {\n  padding-right: 40px;\n}\n.input-icon[data-v-64bf2f74] {\n  position: absolute;\n  right: 8px;\n  top: 70%;\n  transform: translateY(-50%);\n  color: #252525;\n  font-size: 12px;\n  pointer-events: none;\n}\n.input-wrapper .form-control:focus + .input-icon[data-v-64bf2f74] {\n  color: #dc3545;\n}\n.input-wrapper .form-control.readonly + .input-icon[data-v-64bf2f74] {\n  color: #adb5bd;\n}\n\n/* Form Section Compact Styles */\n.form-section.compact[data-v-64bf2f74] {\n  padding: 6px;\n  margin-bottom: 0;\n}\n.section-icon[data-v-64bf2f74] {\n  width: 40px;\n  height: 40px;\n  background: #dc3545;\n  border-radius: 8px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  color: white;\n  font-size: 16px;\n  margin-right: 12px;\n  box-shadow: 0 2px 8px rgba(79, 112, 92, 0.3);\n}\n.section-title.compact[data-v-64bf2f74] {\n  font-size: 1rem;\n  font-weight: 600;\n}\n\n/* Form Grid and Column Styles */\n.form-grid[data-v-64bf2f74] {\n  display: flex;\n  flex-direction: column;\n  gap: 20px;\n}\n.form-column[data-v-64bf2f74] {\n  display: flex;\n  flex-direction: column;\n  gap: 15px;\n}\n\n/* Member Form Content Styles */\n.member-form-content[data-v-64bf2f74] {\n  padding: 10px;\n}\n\n/* Tab Navigation Styles */\n.tab-navigation[data-v-64bf2f74] {\n  display: flex;\n  background: transparent;\n  margin: 20px 0 20px 20px;\n  gap: 10px;\n}\n.tab-item[data-v-64bf2f74] {\n  padding: 8px 20px;\n  text-align: center;\n  cursor: pointer;\n  transition: all 0.3s ease;\n  border-radius: 16px;\n  font-weight: 500;\n  color: #6c757d;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  gap: 8px;\n  border: none;\n  background: transparent;\n}\n.tab-item[data-v-64bf2f74]:hover {\n  background: #f8f9fa;\n  color: #495057;\n}\n.tab-item.active[data-v-64bf2f74] {\n  background: #dc3545;\n  color: #ffffff;\n  border: none;\n  position: relative;\n  font-weight: 600;\n}\n.tab-content[data-v-64bf2f74] {\n  background: white;\n  border-radius: 0 0 8px 8px;\n  border: 1px solid #dee2e6;\n  border-top: none;\n  min-height: 400px;\n}\n.tab-header[data-v-64bf2f74] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  margin-bottom: 5px;\n  padding-bottom: 5px;\n}\n.tab-title[data-v-64bf2f74] {\n  font-size: 1.2rem;\n  font-weight: 600;\n  color: #333;\n  margin: 0;\n}\n.settings-grid[data-v-64bf2f74] {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));\n  gap: 10px;\n  margin-top: 10px;\n}\n.setting-section[data-v-64bf2f74] {\n  background: #f8f9fa;\n  padding: 10px;\n  border-radius: 8px;\n  border: 1px solid #dee2e6;\n}\n.setting-section h6[data-v-64bf2f74] {\n  margin-bottom: 15px;\n  color: #333;\n  font-weight: 600;\n}\n\n/* Bottom Action Buttons */\n.bottom-actions[data-v-64bf2f74] {\n  position: fixed;\n  bottom: 0;\n  left: 0;\n  right: 0;\n}\n.action-buttons[data-v-64bf2f74] {\n  display: flex;\n  justify-content: center;\n  gap: 15px;\n  max-width: 600px;\n  margin: 0 auto;\n  flex-wrap: wrap;\n}\n.action-buttons .btn[data-v-64bf2f74] {\n  min-width: 120px;\n  padding: 12px 20px;\n  font-size: 0.9rem;\n  font-weight: 600;\n  border-radius: 8px;\n  transition: all 0.3s ease;\n  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);\n}\n.action-buttons .btn[data-v-64bf2f74]:hover {\n  transform: translateY(-2px);\n  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);\n}\n.form-header[data-v-64bf2f74] {\n  background: linear-gradient(to bottom, #23415a, #0f1c29);\n  color: white;\n  text-align: center;\n  position: relative;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  gap: 20px;\n  padding: 12px;\n}\n.form-header[data-v-64bf2f74]::before {\n  content: \"\";\n  position: absolute;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  background: url('data:image/svg+xml,<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 100 100\"><defs><pattern id=\"grain\" width=\"100\" height=\"100\" patternUnits=\"userSpaceOnUse\"><circle cx=\"25\" cy=\"25\" r=\"1\" fill=\"white\" opacity=\"0.1\"/><circle cx=\"75\" cy=\"75\" r=\"1\" fill=\"white\" opacity=\"0.1\"/><circle cx=\"50\" cy=\"10\" r=\"0.5\" fill=\"white\" opacity=\"0.1\"/><circle cx=\"10\" cy=\"60\" r=\"0.5\" fill=\"white\" opacity=\"0.1\"/><circle cx=\"90\" cy=\"40\" r=\"0.5\" fill=\"white\" opacity=\"0.1\"/></pattern></defs><rect width=\"100\" height=\"100\" fill=\"url(%23grain)\"/></svg>');\n  opacity: 0.3;\n}\n.header-icon[data-v-64bf2f74] {\n  width: 60px;\n  height: 60px;\n  background: rgba(255, 255, 255, 0.2);\n  border-radius: 50%;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-size: 20px;\n  flex-shrink: 0;\n}\n.form-title[data-v-64bf2f74] {\n  font-size: 1.2rem;\n  font-weight: 700;\n  color: #fff !important;\n  margin: 0;\n}\n.form-subtitle[data-v-64bf2f74] {\n  font-size: 0.8rem;\n  opacity: 0.9;\n  margin: 0;\n}\n.back-btn[data-v-64bf2f74] {\n  background: rgba(255, 255, 255, 0.2);\n  color: white;\n  border: 1px solid rgba(255, 255, 255, 0.3);\n  padding: 8px;\n  border-radius: 50%;\n  font-size: 1rem;\n  transition: all 0.3s ease;\n  -webkit-backdrop-filter: blur(10px);\n          backdrop-filter: blur(10px);\n  width: 35px;\n  height: 35px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  flex-shrink: 0;\n}\n.back-btn[data-v-64bf2f74]:hover {\n  background: rgba(255, 255, 255, 0.3);\n  transform: translateY(-2px);\n}\n.details-content[data-v-64bf2f74] {\n  padding: 10px;\n}\n.form-section[data-v-64bf2f74]:hover {\n  transform: translateY(-2px);\n}\n.section-icon[data-v-64bf2f74] {\n  width: 50px;\n  height: 50px;\n  background: #dc3545;\n  border-radius: 12px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  color: white;\n  font-size: 20px;\n  margin-right: 15px;\n  box-shadow: 0 4px 15px rgba(79, 112, 92, 0.3);\n}\n.section-title[data-v-64bf2f74] {\n  font-size: 1.3rem;\n  font-weight: 600;\n  color: #252525;\n  margin: 0;\n}\n.hover-opacity-100[data-v-64bf2f74]:hover {\n  opacity: 1 !important;\n}\n.opacity-0[data-v-64bf2f74] {\n  opacity: 0;\n}\n.transition[data-v-64bf2f74] {\n  transition: opacity 0.3s ease-in-out;\n}\n.profile-image-container[data-v-64bf2f74] {\n  text-align: center;\n  position: relative;\n  display: inline-block;\n  margin-bottom: 10px;\n}\n.profile-image[data-v-64bf2f74] {\n  width: 120px;\n  height: 120px;\n  border-radius: 50%;\n  -o-object-fit: cover;\n     object-fit: cover;\n  border: 4px solid white;\n  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);\n}\n.profile-overlay[data-v-64bf2f74] {\n  position: absolute;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  background: rgba(79, 112, 92, 0.8);\n  border-radius: 50%;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  color: white;\n  opacity: 0;\n  transition: opacity 0.3s ease;\n  cursor: pointer;\n}\n.profile-overlay i[data-v-64bf2f74] {\n  font-size: 24px;\n  margin-bottom: 5px;\n}\n.profile-overlay span[data-v-64bf2f74] {\n  font-size: 12px;\n  font-weight: 500;\n}\n\n/* Editable profile image styles */\n.profile-image-container.editable[data-v-64bf2f74] {\n  cursor: pointer;\n}\n.profile-image-container.editable:hover .profile-overlay[data-v-64bf2f74] {\n  opacity: 1;\n}\n.profile-image-input[data-v-64bf2f74] {\n  position: absolute;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n  opacity: 0;\n  cursor: pointer;\n  z-index: 10;\n}\n.info-group[data-v-64bf2f74] {\n  margin-bottom: 20px;\n}\n.info-label[data-v-64bf2f74] {\n  font-weight: 600;\n  color: #252525;\n  margin-bottom: 8px;\n  display: block;\n  font-size: 0.95rem;\n}\n.info-value[data-v-64bf2f74] {\n  background: #dededc;\n  padding: 8px 8px;\n  border-radius: 8px;\n  color: #252525;\n  font-weight: 500;\n  border: 1px solid #dcdcdc;\n}\n.status-badge[data-v-64bf2f74] {\n  display: inline-block;\n  padding: 4px 12px;\n  border-radius: 20px;\n  font-size: 0.8rem;\n  font-weight: 600;\n  text-transform: uppercase;\n}\n.status-badge.active[data-v-64bf2f74] {\n  background: #4caf50;\n  color: white;\n}\n.status-badge.inactive[data-v-64bf2f74] {\n  background: #6a6a6a;\n  color: white;\n}\n.actions-grid[data-v-64bf2f74] {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));\n  gap: 20px;\n}\n.action-card[data-v-64bf2f74] {\n  background: #dededc;\n  border: 2px solid #dcdcdc;\n  border-radius: 12px;\n  padding: 20px;\n  text-align: center;\n  cursor: pointer;\n  transition: all 0.3s ease;\n}\n.action-card[data-v-64bf2f74]:hover {\n  border-color: #dc3545;\n  transform: translateY(-3px);\n  box-shadow: 0 8px 25px rgba(79, 112, 92, 0.15);\n}\n.action-card.active[data-v-64bf2f74] {\n  border-color: #dc3545;\n  background: rgba(79, 112, 92, 0.05);\n}\n.action-icon[data-v-64bf2f74] {\n  width: 32px;\n  height: 32px;\n  border-radius: 6px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  color: #dc3545;\n  transition: all 0.3s ease;\n}\n.action-label[data-v-64bf2f74] {\n  font-weight: 600;\n  font-size: 0.85rem;\n  transition: color 0.3s ease;\n}\n.form-group[data-v-64bf2f74] {\n  margin-bottom: 25px;\n}\n.form-label[data-v-64bf2f74] {\n  font-weight: 600;\n  color: #252525;\n  margin-bottom: 10px;\n  display: block;\n  font-size: 0.9rem;\n}\n.form-control[data-v-64bf2f74] {\n  width: 100%;\n  border: 1px solid #dee2e6;\n  border-radius: 8px;\n  font-size: 0.9rem;\n  transition: all 0.3s ease;\n  background: white;\n  color: #252525;\n  padding: 10px 12px;\n  box-sizing: border-box;\n}\n.form-control[data-v-64bf2f74]:focus {\n  outline: none;\n  border-color: #dc3545;\n  box-shadow: 0 0 0 3px rgba(79, 112, 92, 0.1);\n  transform: translateY(-1px);\n}\n.form-control.readonly[data-v-64bf2f74] {\n  background: #f8f9fa;\n  color: #6c757d;\n  cursor: not-allowed;\n}\n.form-control textarea[data-v-64bf2f74] {\n  resize: vertical;\n  min-height: 100px;\n}\n\n/* Input Wrapper and Icon Styles */\n.input-wrapper[data-v-64bf2f74] {\n  position: relative;\n  display: flex;\n  align-items: center;\n}\n.input-wrapper .form-control[data-v-64bf2f74] {\n  padding-right: 40px;\n}\n.input-icon[data-v-64bf2f74] {\n  position: absolute;\n  right: 12px;\n  top: 70%;\n  transform: translateY(-50%);\n  color: #6c757d;\n  font-size: 14px;\n  pointer-events: none;\n  z-index: 2;\n}\n.input-wrapper .form-control:focus + .input-icon[data-v-64bf2f74] {\n  color: #dc3545;\n}\n.input-wrapper .form-control.readonly + .input-icon[data-v-64bf2f74] {\n  color: #adb5bd;\n}\n.edit-toggle-btn[data-v-64bf2f74] {\n  background: #dc3545;\n  color: white;\n  border: none;\n  padding: 8px 16px;\n  border-radius: 6px;\n  font-size: 0.9rem;\n  transition: all 0.3s ease;\n}\n.edit-toggle-btn[data-v-64bf2f74]:hover {\n  background: rgb(189.2151898734, 32.7848101266, 47.7721518987);\n  transform: translateY(-1px);\n}\n.submit-btn[data-v-64bf2f74] {\n  background: #dc3545;\n  color: #ffffff;\n  border: none;\n  padding: 12px 30px;\n  border-radius: 25px;\n  font-size: 1rem;\n  font-weight: 600;\n  cursor: pointer;\n  transition: all 0.3s ease;\n  box-shadow: 0 4px 15px rgba(79, 112, 92, 0.3);\n  display: inline-flex;\n  align-items: center;\n  gap: 8px;\n}\n.submit-btn[data-v-64bf2f74]:hover {\n  transform: translateY(-2px);\n  box-shadow: 0 6px 20px rgba(79, 112, 92, 0.4);\n}\n.new-message-btn[data-v-64bf2f74] {\n  background: #dc3545;\n  color: white;\n  border: none;\n  padding: 10px 20px;\n  border-radius: 6px;\n  font-size: 0.9rem;\n  transition: all 0.3s ease;\n  display: inline-flex;\n  align-items: center;\n  gap: 8px;\n}\n.new-message-btn[data-v-64bf2f74]:hover {\n  background: rgb(189.2151898734, 32.7848101266, 47.7721518987);\n  transform: translateY(-1px);\n}\n.form-actions[data-v-64bf2f74] {\n  display: flex;\n  gap: 15px;\n  justify-content: flex-end;\n  margin-top: 20px;\n}\n.cancel-btn[data-v-64bf2f74] {\n  background: #6a6a6a;\n  color: white;\n  border: none;\n  padding: 10px 20px;\n  border-radius: 6px;\n  font-size: 0.9rem;\n  transition: all 0.3s ease;\n}\n.cancel-btn[data-v-64bf2f74]:hover {\n  background: rgb(80.5, 80.5, 80.5);\n  transform: translateY(-1px);\n}\n.alert[data-v-64bf2f74] {\n  padding: 15px;\n  border-radius: 8px;\n  margin-bottom: 20px;\n  border: 1px solid transparent;\n}\n.alert-info[data-v-64bf2f74] {\n  background-color: rgba(79, 112, 92, 0.1);\n  border-color: rgba(79, 112, 92, 0.2);\n  color: #2c5a3a;\n}\n.alert-warning[data-v-64bf2f74] {\n  background-color: rgba(255, 193, 7, 0.1);\n  border-color: rgba(255, 193, 7, 0.2);\n  color: #856404;\n}\n.alert i[data-v-64bf2f74] {\n  margin-right: 8px;\n}\n.submit-btn.danger[data-v-64bf2f74] {\n  background: #dc3545;\n  box-shadow: 0 4px 15px rgba(220, 53, 69, 0.3);\n}\n.submit-btn.danger[data-v-64bf2f74]:hover {\n  background: #c82333;\n  box-shadow: 0 6px 20px rgba(220, 53, 69, 0.4);\n}\n\n/* Responsive Design */\n@media (max-width: 768px) {\n.details-content[data-v-64bf2f74] {\n    padding: 20px;\n}\n.coach-header-section[data-v-64bf2f74] {\n    padding: 15px 16px;\n    flex-wrap: wrap;\n    gap: 10px;\n}\n.header-content[data-v-64bf2f74] {\n    flex-wrap: wrap;\n    gap: 10px;\n    justify-content: center;\n}\n.tab-icons[data-v-64bf2f74] {\n    flex-wrap: wrap;\n    gap: 8px;\n}\n.back-btn-container[data-v-64bf2f74] {\n    order: -1;\n}\n.form-header[data-v-64bf2f74] {\n    padding: 30px 20px;\n}\n.form-title[data-v-64bf2f74] {\n    font-size: 1.8rem;\n}\n.header-icon[data-v-64bf2f74] {\n    width: 60px;\n    height: 60px;\n    font-size: 24px;\n}\n.section-icon[data-v-64bf2f74] {\n    width: 40px;\n    height: 40px;\n    font-size: 16px;\n}\n.form-section[data-v-64bf2f74] {\n    padding: 20px;\n}\n.actions-grid[data-v-64bf2f74] {\n    grid-template-columns: 1fr;\n}\n}\n/* Animation for form sections */\n.form-section[data-v-64bf2f74] {\n  animation: fadeInUp-data-v-64bf2f74 0.6s ease forwards;\n  opacity: 0;\n  transform: translateY(20px);\n}\n.form-section[data-v-64bf2f74]:nth-child(1) {\n  animation-delay: 0.1s;\n}\n.form-section[data-v-64bf2f74]:nth-child(2) {\n  animation-delay: 0.2s;\n}\n.form-section[data-v-64bf2f74]:nth-child(3) {\n  animation-delay: 0.3s;\n}\n@keyframes fadeInUp-data-v-64bf2f74 {\nto {\n    opacity: 1;\n    transform: translateY(0);\n}\n}\n.task-actions[data-v-64bf2f74] {\n  display: flex;\n  gap: 8px;\n  justify-content: center;\n}\n.task-actions .btn[data-v-64bf2f74] {\n  padding: 6px 10px;\n  font-size: 0.8rem;\n  border-radius: 6px;\n  transition: all 0.3s ease;\n}\n.task-actions .btn[data-v-64bf2f74]:hover {\n  transform: translateY(-2px);\n  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);\n}\n.task-actions .btn i[data-v-64bf2f74] {\n  font-size: 0.75rem;\n}\n\n/* Member Assignment Styles */\n.members-assignment-table[data-v-64bf2f74] {\n  margin-bottom: 0;\n  width: 100%;\n  border-collapse: separate;\n  border-spacing: 0;\n}\n.members-assignment-table .table-header[data-v-64bf2f74] {\n  background-color: rgba(245, 245, 243, 0.5);\n  color: #252525;\n  font-weight: 600;\n  font-size: 0.875rem;\n  padding: 12px 8px;\n  border-bottom: 2px solid #cccccc;\n  letter-spacing: 0.5px;\n  white-space: nowrap;\n  position: sticky;\n  top: 0;\n  z-index: 10;\n}\n.members-assignment-table .table-header.text-center[data-v-64bf2f74] {\n  text-align: center;\n}\n.members-assignment-table .table-row[data-v-64bf2f74] {\n  transition: all 0.3s ease;\n  border-bottom: 1px solid #e0e0e0;\n}\n.members-assignment-table .table-row[data-v-64bf2f74]:hover {\n  background-color: rgba(245, 245, 243, 0.3);\n  transform: translateY(-1px);\n  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);\n}\n.members-assignment-table .table-row[data-v-64bf2f74]:last-child {\n  border-bottom: none;\n}\n.members-assignment-table .table-cell[data-v-64bf2f74] {\n  padding: 12px 8px;\n  vertical-align: middle;\n  color: #252525;\n  font-size: 0.875rem;\n  border: none;\n}\n.members-assignment-table .table-cell.text-center[data-v-64bf2f74] {\n  text-align: center;\n}\n.coach-avatar[data-v-64bf2f74] {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n.coach-avatar .coach-image[data-v-64bf2f74] {\n  width: 40px;\n  height: 40px;\n  border-radius: 50%;\n  -o-object-fit: cover;\n     object-fit: cover;\n  border: 2px solid #cccccc;\n}\n.coach-id[data-v-64bf2f74] {\n  font-size: 0.85rem;\n  color: #6c757d;\n  margin: 0;\n  font-weight: 500;\n}\n.coach-name[data-v-64bf2f74] {\n  font-weight: 600;\n  color: #252525;\n  font-size: 0.9rem;\n}\n.coach-email[data-v-64bf2f74] {\n  color: #252525;\n  font-size: 0.8rem;\n}\n.coach-phone[data-v-64bf2f74] {\n  color: #252525;\n  font-size: 0.8rem;\n}\n.coach-plan[data-v-64bf2f74] {\n  font-weight: 600;\n  padding: 4px 8px;\n  border-radius: 4px;\n  font-size: 0.8rem;\n  display: inline-block;\n}\n.coach-plan.plan-premium[data-v-64bf2f74] {\n  background-color: rgba(255, 193, 7, 0.2);\n  color: #856404;\n  border: 1px solid rgba(255, 193, 7, 0.3);\n}\n.coach-plan.plan-vip[data-v-64bf2f74] {\n  background-color: rgba(220, 53, 69, 0.2);\n  color: #721c24;\n  border: 1px solid rgba(220, 53, 69, 0.3);\n}\n.coach-plan.plan-basic[data-v-64bf2f74] {\n  background-color: rgba(40, 167, 69, 0.2);\n  color: #155724;\n  border: 1px solid rgba(40, 167, 69, 0.3);\n}\n.coach-plan.plan-na[data-v-64bf2f74] {\n  background-color: rgba(108, 117, 125, 0.2);\n  color: #495057;\n  border: 1px solid rgba(108, 117, 125, 0.3);\n}\n.assign-coach-btn[data-v-64bf2f74] {\n  background: #dc3545;\n  color: white;\n  border: none;\n  padding: 6px 12px;\n  border-radius: 4px;\n  font-size: 0.8rem;\n  transition: all 0.3s ease;\n  display: inline-flex;\n  align-items: center;\n  gap: 4px;\n}\n.assign-coach-btn[data-v-64bf2f74]:hover:not(:disabled) {\n  background: rgb(189.2151898734, 32.7848101266, 47.7721518987);\n  transform: translateY(-1px);\n}\n.assign-coach-btn[data-v-64bf2f74]:disabled {\n  opacity: 0.6;\n  cursor: not-allowed;\n}\n.unassign-coach-btn[data-v-64bf2f74] {\n  background: #dc3545;\n  color: white;\n  border: none;\n  padding: 6px 12px;\n  border-radius: 4px;\n  font-size: 0.8rem;\n  transition: all 0.3s ease;\n  display: inline-flex;\n  align-items: center;\n  gap: 4px;\n}\n.unassign-coach-btn[data-v-64bf2f74]:hover:not(:disabled) {\n  background: #c82333;\n  transform: translateY(-1px);\n}\n.unassign-coach-btn[data-v-64bf2f74]:disabled {\n  opacity: 0.6;\n  cursor: not-allowed;\n}\n.bulk-actions[data-v-64bf2f74] {\n  background: rgba(245, 245, 243, 0.1);\n  border: 1px solid #cccccc;\n  border-radius: 8px;\n  padding: 15px;\n}\n.bulk-actions .selected-count[data-v-64bf2f74] {\n  font-weight: 600;\n  color: #252525;\n}\n.bulk-actions .bulk-buttons[data-v-64bf2f74] {\n  display: flex;\n  gap: 10px;\n}\n.bulk-assign-btn[data-v-64bf2f74] {\n  background: #dc3545;\n  color: white;\n  border: none;\n  padding: 8px 16px;\n  border-radius: 4px;\n  font-size: 0.9rem;\n  transition: all 0.3s ease;\n  display: inline-flex;\n  align-items: center;\n  gap: 6px;\n}\n.bulk-assign-btn[data-v-64bf2f74]:hover:not(:disabled) {\n  background: rgb(189.2151898734, 32.7848101266, 47.7721518987);\n  transform: translateY(-1px);\n}\n.bulk-assign-btn[data-v-64bf2f74]:disabled {\n  opacity: 0.6;\n  cursor: not-allowed;\n}\n.clear-selection-btn[data-v-64bf2f74] {\n  background: #6a6a6a;\n  color: white;\n  border: none;\n  padding: 8px 16px;\n  border-radius: 4px;\n  font-size: 0.9rem;\n  transition: all 0.3s ease;\n  display: inline-flex;\n  align-items: center;\n  gap: 6px;\n}\n.clear-selection-btn[data-v-64bf2f74]:hover {\n  background: rgb(80.5, 80.5, 80.5);\n  transform: translateY(-1px);\n}\n.no-members-message[data-v-64bf2f74] {\n  background: rgba(245, 245, 243, 0.1);\n  border: 1px solid #cccccc;\n  border-radius: 8px;\n  margin: 20px 0;\n}\n.search-filter-section[data-v-64bf2f74] {\n  background: rgba(245, 245, 243, 0.05);\n  border: 1px solid #cccccc;\n  border-radius: 8px;\n  padding: 5px;\n}\n.search-filter-section .form-label[data-v-64bf2f74] {\n  font-weight: 600;\n  color: #252525;\n  margin-bottom: 8px;\n}\n.form-check[data-v-64bf2f74] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n}\n.form-check-input[data-v-64bf2f74] {\n  width: 14px;\n  height: 14px;\n  cursor: pointer;\n}\n.form-check-label[data-v-64bf2f74] {\n  margin: 0;\n  line-height: 1.2;\n}\n\n/* Responsive adjustments for member table */\n@media (max-width: 768px) {\n.members-assignment-table .table-header[data-v-64bf2f74],\n  .members-assignment-table .table-cell[data-v-64bf2f74] {\n    padding: 8px 4px;\n    font-size: 0.8rem;\n}\n.members-assignment-table .coach-image[data-v-64bf2f74] {\n    width: 30px;\n    height: 30px;\n}\n.members-assignment-table .assign-coach-btn[data-v-64bf2f74],\n  .members-assignment-table .unassign-coach-btn[data-v-64bf2f74] {\n    padding: 4px 8px;\n    font-size: 0.7rem;\n}\n.bulk-actions .bulk-buttons[data-v-64bf2f74] {\n    flex-direction: column;\n    gap: 8px;\n}\n}\n/* Task Management Styles */\n.task-form-section[data-v-64bf2f74] {\n  background: #ffffff;\n  border-radius: 15px;\n  padding: 20px;\n  margin-bottom: 20px;\n  border: 1px solid #dcdcdc;\n  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.08);\n  animation: fadeInUp-data-v-64bf2f74 0.6s ease forwards;\n  opacity: 0;\n  transform: translateY(20px);\n}\n.form-header[data-v-64bf2f74] {\n  margin-bottom: 20px;\n  padding-bottom: 15px;\n  border-bottom: 2px solid #dcdcdc;\n}\n.form-header .form-title[data-v-64bf2f74] {\n  margin: 0;\n  color: #252525;\n  font-size: 1.3rem;\n  font-weight: 700;\n  text-transform: uppercase;\n  letter-spacing: 0.5px;\n}\n.task-form-section.show[data-v-64bf2f74] {\n  opacity: 1;\n  transform: translateY(0);\n}\n.task-form .form-grid[data-v-64bf2f74] {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));\n  gap: 20px;\n  margin-bottom: 25px;\n}\n.task-form .form-group[data-v-64bf2f74] {\n  margin-bottom: 0;\n}\n.task-form .form-group .form-label[data-v-64bf2f74] {\n  display: block;\n  margin-bottom: 8px;\n  font-weight: 600;\n  color: #252525;\n  font-size: 0.9rem;\n  text-transform: uppercase;\n  letter-spacing: 0.5px;\n}\n.task-form .form-group .form-control[data-v-64bf2f74] {\n  width: 100%;\n  padding: 12px 15px;\n  border: 2px solid #cccccc;\n  border-radius: 8px;\n  font-size: 0.95rem;\n  transition: all 0.3s ease;\n  background: #ffffff;\n}\n.task-form .form-group .form-control[data-v-64bf2f74]:focus {\n  outline: none;\n  border-color: #dc3545;\n  box-shadow: 0 0 0 3px rgba(79, 112, 92, 0.1);\n  transform: translateY(-1px);\n}\n.task-form .form-group .form-control[data-v-64bf2f74]:hover {\n  border-color: rgb(178.5, 178.5, 178.5);\n}\n.task-form .form-group .form-control[data-v-64bf2f74]::-moz-placeholder {\n  color: #6a6a6a;\n  font-style: italic;\n}\n.task-form .form-group .form-control[data-v-64bf2f74]::placeholder {\n  color: #6a6a6a;\n  font-style: italic;\n}\n.task-form .form-group select.form-control[data-v-64bf2f74] {\n  cursor: pointer;\n  background-image: url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3e%3c/svg%3e\");\n  background-position: right 12px center;\n  background-repeat: no-repeat;\n  background-size: 16px;\n  padding-right: 40px;\n  -webkit-appearance: none;\n     -moz-appearance: none;\n          appearance: none;\n}\n.task-form .form-group textarea.form-control[data-v-64bf2f74] {\n  resize: vertical;\n  min-height: 100px;\n  line-height: 1.5;\n}\n.task-form .form-group.full-width[data-v-64bf2f74] {\n  grid-column: 1/-1;\n}\n.task-form .form-actions[data-v-64bf2f74] {\n  display: flex;\n  gap: 15px;\n  justify-content: flex-end;\n  padding-top: 20px;\n  border-top: 1px solid #dcdcdc;\n}\n.task-form .form-actions .btn[data-v-64bf2f74] {\n  min-width: 120px;\n  padding: 12px 20px;\n  font-size: 0.9rem;\n  font-weight: 600;\n  border-radius: 8px;\n  transition: all 0.3s ease;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  gap: 8px;\n}\n.task-form .form-actions .btn i[data-v-64bf2f74] {\n  font-size: 0.85rem;\n}\n.task-form .form-actions .btn[data-v-64bf2f74]:hover {\n  transform: translateY(-2px);\n  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);\n}\n.task-form .form-actions .btn[data-v-64bf2f74]:active {\n  transform: translateY(0);\n}\n.task-form .form-actions .btn-secondary[data-v-64bf2f74] {\n  background: #6c757d;\n  color: white;\n  border: none;\n}\n.task-form .form-actions .btn-secondary[data-v-64bf2f74]:hover {\n  background: #5a6268;\n}\n.task-form .form-actions .btn-primary[data-v-64bf2f74] {\n  background: #dc3545;\n  color: #ffffff;\n  border: none;\n  border-radius: 8px;\n  padding: 10px 20px;\n  font-weight: 500;\n  transition: all 0.3s ease;\n}\n.task-form .form-actions .btn-primary[data-v-64bf2f74]:hover {\n  background: rgb(189.2151898734, 32.7848101266, 47.7721518987);\n  transform: translateY(-1px);\n  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);\n}\n.task-form .form-actions .btn-primary[data-v-64bf2f74]:disabled {\n  opacity: 0.6;\n  cursor: not-allowed;\n  transform: none;\n  box-shadow: none;\n}\n@keyframes fadeInUp-data-v-64bf2f74 {\nto {\n    opacity: 1;\n    transform: translateY(0);\n}\n}\n/* Message Management Styles */\n.message-form-section[data-v-64bf2f74] {\n  background: #f8f9fa;\n  border-radius: 8px;\n  padding: 20px;\n  margin-bottom: 20px;\n  border: 1px solid #dee2e6;\n}\n.message-form .form-grid[data-v-64bf2f74] {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));\n  gap: 20px;\n  margin-bottom: 20px;\n}\n.message-form .form-group[data-v-64bf2f74] {\n  margin-bottom: 0;\n}\n.message-form .form-group.full-width[data-v-64bf2f74] {\n  grid-column: 1/-1;\n}\n.message-form .form-actions[data-v-64bf2f74] {\n  display: flex;\n  gap: 15px;\n  justify-content: flex-end;\n  padding-top: 20px;\n  border-top: 1px solid #dee2e6;\n}\n.message-form textarea.form-control[data-v-64bf2f74] {\n  resize: vertical;\n  min-height: 120px;\n}\n.messages-inbox .loading-messages[data-v-64bf2f74] {\n  text-align: center;\n  padding: 40px 20px;\n}\n.messages-inbox .loading-messages .spinner-border[data-v-64bf2f74] {\n  margin-bottom: 15px;\n}\n.messages-inbox .loading-messages p[data-v-64bf2f74] {\n  color: #252525;\n  margin: 0;\n}\n.messages-inbox .no-messages[data-v-64bf2f74] {\n  text-align: center;\n  padding: 40px 20px;\n  background: rgba(245, 245, 243, 0.1);\n  border: 1px solid #cccccc;\n  border-radius: 8px;\n}\n.messages-inbox .no-messages i[data-v-64bf2f74] {\n  font-size: 3rem;\n  color: #6a6a6a;\n  margin-bottom: 15px;\n}\n.messages-inbox .no-messages p[data-v-64bf2f74] {\n  color: #252525;\n  margin: 0;\n}\n.messages-list .message-item[data-v-64bf2f74] {\n  background: white;\n  border: 1px solid #cccccc;\n  border-radius: 8px;\n  padding: 20px;\n  margin-bottom: 15px;\n  transition: all 0.3s ease;\n}\n.messages-list .message-item[data-v-64bf2f74]:hover {\n  transform: translateY(-2px);\n  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);\n}\n.messages-list .message-item.unread[data-v-64bf2f74] {\n  border-left: 4px solid #dc3545;\n  background: rgba(220, 53, 69, 0.05);\n}\n.messages-list .message-item .message-header[data-v-64bf2f74] {\n  display: flex;\n  justify-content: space-between;\n  align-items: flex-start;\n  margin-bottom: 10px;\n}\n.messages-list .message-item .message-header .message-sender[data-v-64bf2f74] {\n  display: flex;\n  flex-direction: column;\n  gap: 5px;\n}\n.messages-list .message-item .message-header .message-sender .message-date[data-v-64bf2f74] {\n  font-size: 0.8rem;\n  color: #6a6a6a;\n}\n.messages-list .message-item .message-header .message-subject[data-v-64bf2f74] {\n  font-size: 1.1rem;\n  color: #252525;\n}\n.messages-list .message-item .message-preview[data-v-64bf2f74] {\n  color: #252525;\n  margin-bottom: 15px;\n  line-height: 1.5;\n}\n.messages-list .message-item .message-actions[data-v-64bf2f74] {\n  display: flex;\n  gap: 10px;\n}\n.messages-list .message-item .message-actions .btn[data-v-64bf2f74] {\n  padding: 6px 12px;\n  font-size: 0.8rem;\n}\n\n/* Chat Interface Styles */\n.chat-container[data-v-64bf2f74] {\n  display: flex;\n  flex-direction: column;\n  height: 600px;\n  background: #ffffff;\n  border-radius: 8px;\n  border: 1px solid #cccccc;\n  overflow: hidden;\n}\n.chat-status[data-v-64bf2f74] {\n  display: flex;\n  align-items: center;\n  gap: 4px;\n}\n.chat-messages[data-v-64bf2f74] {\n  flex: 1;\n  overflow-y: auto;\n  padding: 10px;\n  background: #f8f9fa;\n}\n.chat-messages[data-v-64bf2f74]::-webkit-scrollbar {\n  width: 6px;\n}\n.chat-messages[data-v-64bf2f74]::-webkit-scrollbar-track {\n  background: #f1f1f1;\n}\n.chat-messages[data-v-64bf2f74]::-webkit-scrollbar-thumb {\n  background: #888;\n  border-radius: 3px;\n}\n.chat-messages[data-v-64bf2f74]::-webkit-scrollbar-thumb:hover {\n  background: #555;\n}\n.messages-list[data-v-64bf2f74] {\n  display: flex;\n  flex-direction: column;\n  gap: 12px;\n}\n.message-bubble[data-v-64bf2f74] {\n  display: flex;\n  max-width: 75%;\n  animation: fadeIn-data-v-64bf2f74 0.3s ease-in;\n}\n.message-bubble.message-sent[data-v-64bf2f74] {\n  align-self: flex-end;\n}\n.message-bubble.message-sent .message-content[data-v-64bf2f74] {\n  background: #dc3545;\n  color: white;\n  border-radius: 18px 18px 4px 18px;\n}\n.message-bubble.message-sent .message-content .message-time[data-v-64bf2f74] {\n  color: rgba(255, 255, 255, 0.8);\n}\n.message-bubble.message-received[data-v-64bf2f74] {\n  align-self: flex-start;\n}\n.message-bubble.message-received .message-content[data-v-64bf2f74] {\n  background: white;\n  color: #252525;\n  border: 1px solid #cccccc;\n  border-radius: 18px 18px 18px 4px;\n  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);\n}\n.message-bubble.message-received .message-content .message-time[data-v-64bf2f74] {\n  color: #6a6a6a;\n}\n.message-bubble .message-content[data-v-64bf2f74] {\n  padding: 12px 16px;\n  position: relative;\n}\n.message-bubble .message-content .message-text[data-v-64bf2f74] {\n  margin: 0 0 4px 0;\n  word-wrap: break-word;\n  white-space: pre-wrap;\n  line-height: 1.4;\n}\n.message-bubble .message-content .message-time[data-v-64bf2f74] {\n  font-size: 0.7rem;\n  display: block;\n  text-align: right;\n  margin-top: 4px;\n}\n@keyframes fadeIn-data-v-64bf2f74 {\nfrom {\n    opacity: 0;\n    transform: translateY(10px);\n}\nto {\n    opacity: 1;\n    transform: translateY(0);\n}\n}\n.chat-input-container[data-v-64bf2f74] {\n  border-top: 1px solid #cccccc;\n  background: white;\n  padding: 15px;\n}\n.chat-input-form .input-group[data-v-64bf2f74] {\n  display: flex;\n  align-items: flex-end;\n  gap: 10px;\n}\n.chat-input-form .input-group .chat-input[data-v-64bf2f74] {\n  flex: 1;\n  border: 1px solid #cccccc;\n  border-radius: 10px;\n  resize: none;\n  font-size: 0.8rem;\n  line-height: 1.4;\n  max-height: 120px;\n  overflow-y: auto;\n}\n.chat-input-form .input-group .chat-input[data-v-64bf2f74]:focus {\n  border-color: #dc3545;\n  box-shadow: 0 0 0 0.2rem rgba(220, 53, 69, 0.25);\n  outline: none;\n}\n.chat-input-form .input-group .chat-input[data-v-64bf2f74]::-moz-placeholder {\n  color: #6a6a6a;\n}\n.chat-input-form .input-group .chat-input[data-v-64bf2f74]::placeholder {\n  color: #6a6a6a;\n}\n.chat-input-form .input-group .send-button[data-v-64bf2f74] {\n  border-radius: 50%;\n  width: 44px;\n  height: 44px;\n  padding: 0;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  flex-shrink: 0;\n}\n.chat-input-form .input-group .send-button[data-v-64bf2f74]:disabled {\n  opacity: 0.5;\n  cursor: not-allowed;\n}\n.chat-input-form .message-counter[data-v-64bf2f74] {\n  display: block;\n  margin-top: 6px;\n  font-size: 0.75rem;\n  text-align: right;\n}\n.loading-messages[data-v-64bf2f74],\n.no-messages[data-v-64bf2f74] {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  height: 100%;\n  color: #6a6a6a;\n}\n.loading-messages i[data-v-64bf2f74],\n.no-messages i[data-v-64bf2f74] {\n  font-size: 3rem;\n  margin-bottom: 15px;\n  opacity: 0.5;\n}\n.loading-messages p[data-v-64bf2f74],\n.no-messages p[data-v-64bf2f74] {\n  margin: 0;\n}\n\n/* Compact Table Styles */\n.compact-table .assigned-members-table.compact[data-v-64bf2f74] {\n  font-size: 0.8rem;\n  margin-bottom: 0;\n}\n.compact-table .assigned-members-table.compact .table-header.compact th[data-v-64bf2f74] {\n  padding: 6px 8px;\n  font-size: 0.75rem;\n  font-weight: 600;\n  background: #f8f9fa;\n  border-bottom: 2px solid #dee2e6;\n  color: #495057;\n}\n.compact-table .assigned-members-table.compact .table-row.compact td[data-v-64bf2f74] {\n  padding: 4px 8px;\n  vertical-align: middle;\n  border-bottom: 1px solid #f0f0f0;\n}\n.compact-table .assigned-members-table.compact .table-row.compact[data-v-64bf2f74]:hover {\n  background-color: #f8f9fa;\n}\n.compact-table .assigned-members-table.compact .coach-info.compact[data-v-64bf2f74] {\n  display: flex;\n  align-items: center;\n  gap: 6px;\n}\n.compact-table .assigned-members-table.compact .coach-info.compact .coach-avatar.compact[data-v-64bf2f74] {\n  width: 28px;\n  height: 28px;\n  flex-shrink: 0;\n}\n.compact-table .assigned-members-table.compact .coach-info.compact .coach-avatar.compact .coach-image.compact[data-v-64bf2f74] {\n  width: 100%;\n  height: 100%;\n  border-radius: 50%;\n  -o-object-fit: cover;\n     object-fit: cover;\n}\n.compact-table .assigned-members-table.compact .coach-info.compact .coach-details.compact[data-v-64bf2f74] {\n  min-width: 0;\n}\n.compact-table .assigned-members-table.compact .coach-info.compact .coach-details.compact .coach-name.compact[data-v-64bf2f74] {\n  font-weight: 600;\n  font-size: 0.8rem;\n  color: #495057;\n  line-height: 1.2;\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  max-width: 120px;\n}\n.compact-table .assigned-members-table.compact .coach-info.compact .coach-details.compact .coach-gender.compact[data-v-64bf2f74] {\n  font-size: 0.7rem;\n  color: #6c757d;\n  line-height: 1.1;\n}\n.compact-table .assigned-members-table.compact .coach-id.compact[data-v-64bf2f74] {\n  font-size: 0.75rem;\n  font-weight: 500;\n  color: #dc3545;\n  font-family: \"Courier New\", monospace;\n}\n.compact-table .assigned-members-table.compact .contact-info.compact[data-v-64bf2f74] {\n  display: flex;\n  gap: 8px;\n  align-items: center;\n}\n.compact-table .assigned-members-table.compact .contact-info.compact .contact-item[data-v-64bf2f74] {\n  width: 24px;\n  height: 24px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  border-radius: 4px;\n  cursor: pointer;\n  transition: all 0.2s ease;\n  background: #f8f9fa;\n  border: 1px solid #e9ecef;\n}\n.compact-table .assigned-members-table.compact .contact-info.compact .contact-item[data-v-64bf2f74]:hover {\n  background: #dc3545;\n  color: white;\n  transform: scale(1.1);\n  box-shadow: 0 2px 4px rgba(0, 123, 255, 0.3);\n}\n.compact-table .assigned-members-table.compact .contact-info.compact .contact-item i[data-v-64bf2f74] {\n  font-size: 0.7rem;\n  color: #6c757d;\n}\n.compact-table .assigned-members-table.compact .contact-info.compact .contact-item:hover i[data-v-64bf2f74] {\n  color: white;\n}\n.compact-table .assigned-members-table.compact .coach-plan.compact[data-v-64bf2f74] {\n  font-size: 0.75rem;\n  font-weight: 500;\n  padding: 2px 6px;\n  border-radius: 3px;\n  display: inline-block;\n}\n.compact-table .assigned-members-table.compact .coach-status.compact[data-v-64bf2f74] {\n  font-size: 0.75rem;\n  font-weight: 500;\n  padding: 2px 6px;\n  border-radius: 3px;\n  display: inline-block;\n}\n.compact-table .assigned-members-table.compact .join-date.compact[data-v-64bf2f74] {\n  font-size: 0.75rem;\n  color: #6c757d;\n  font-family: \"Courier New\", monospace;\n}\n.compact-table .assigned-members-table.compact .coach-actions.compact[data-v-64bf2f74] {\n  display: flex;\n  gap: 2px;\n}\n.compact-table .assigned-members-table.compact .coach-actions.compact .btn.compact[data-v-64bf2f74] {\n  padding: 2px 6px;\n  font-size: 0.7rem;\n  width: 24px;\n  height: 24px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  border-radius: 3px;\n}\n.compact-table .assigned-members-table.compact .coach-actions.compact .btn.compact i[data-v-64bf2f74] {\n  font-size: 0.7rem;\n}\n\n/* Member Assignment Styles */\n.coach-assignment-section .search-filter-section[data-v-64bf2f74] {\n  background: rgba(245, 245, 243, 0.05);\n  border: 1px solid #cccccc;\n  border-radius: 8px;\n  padding: 20px;\n  margin-bottom: 20px;\n}\n.coach-assignment-section .search-filter-section .form-grid[data-v-64bf2f74] {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));\n  gap: 15px;\n}\n.assigned-members-list .loading-assigned-members[data-v-64bf2f74] {\n  text-align: center;\n  padding: 40px 20px;\n}\n.assigned-members-list .loading-assigned-members .spinner-border[data-v-64bf2f74] {\n  margin-bottom: 15px;\n}\n.assigned-members-list .loading-assigned-members p[data-v-64bf2f74] {\n  color: #252525;\n  margin: 0;\n}\n.assigned-members-list .no-assigned-members[data-v-64bf2f74] {\n  text-align: center;\n  padding: 40px 20px;\n  background: rgba(245, 245, 243, 0.1);\n  border: 1px solid #cccccc;\n  border-radius: 8px;\n}\n.assigned-members-list .no-assigned-members i[data-v-64bf2f74] {\n  font-size: 3rem;\n  color: #6a6a6a;\n  margin-bottom: 15px;\n}\n.assigned-members-list .no-assigned-members p[data-v-64bf2f74] {\n  color: #252525;\n  margin: 0;\n}\n\n/* Compact Card Grid Styles */\n.assigned-members-grid.compact[data-v-64bf2f74] {\n  display: grid;\n  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));\n  gap: 16px;\n  margin-top: 8px;\n}\n.assigned-coach-card.compact[data-v-64bf2f74] {\n  background: white;\n  border: 1px solid #e9ecef;\n  border-radius: 8px;\n  padding: 0;\n  transition: all 0.3s ease;\n  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);\n  overflow: visible;\n  display: flex;\n  flex-direction: column;\n}\n.assigned-coach-card.compact[data-v-64bf2f74]:hover {\n  transform: translateY(-2px);\n  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);\n  border-color: #dc3545;\n}\n.assigned-coach-card.compact .card-header[data-v-64bf2f74] {\n  display: flex;\n  align-items: center;\n  padding: 12px;\n  background: linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%);\n  border-bottom: 1px solid #e9ecef;\n  flex-shrink: 0;\n}\n.assigned-coach-card.compact .card-header .coach-avatar.compact[data-v-64bf2f74] {\n  position: relative;\n  width: 48px;\n  height: 48px;\n  flex-shrink: 0;\n  margin-right: 12px;\n}\n.assigned-coach-card.compact .card-header .coach-avatar.compact .coach-image.compact[data-v-64bf2f74] {\n  width: 100%;\n  height: 100%;\n  border-radius: 50%;\n  -o-object-fit: cover;\n     object-fit: cover;\n  border: 2px solid white;\n  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);\n}\n.assigned-coach-card.compact .card-header .coach-avatar.compact .status-indicator[data-v-64bf2f74] {\n  position: absolute;\n  bottom: 0;\n  right: 0;\n  width: 12px;\n  height: 12px;\n  border-radius: 50%;\n  border: 2px solid white;\n}\n.assigned-coach-card.compact .card-header .coach-avatar.compact .status-indicator.text-success[data-v-64bf2f74] {\n  background: #28a745;\n}\n.assigned-coach-card.compact .card-header .coach-avatar.compact .status-indicator.text-warning[data-v-64bf2f74] {\n  background: #ffc107;\n}\n.assigned-coach-card.compact .card-header .coach-avatar.compact .status-indicator.text-danger[data-v-64bf2f74] {\n  background: #dc3545;\n}\n.assigned-coach-card.compact .card-header .coach-avatar.compact .status-indicator.text-info[data-v-64bf2f74] {\n  background: #17a2b8;\n}\n.assigned-coach-card.compact .card-header .member-info[data-v-64bf2f74] {\n  flex: 1;\n  min-width: 0;\n  overflow: hidden;\n}\n.assigned-coach-card.compact .card-header .member-info .coach-name.compact[data-v-64bf2f74] {\n  font-size: 0.95rem;\n  font-weight: 600;\n  color: #495057;\n  margin: 0 0 4px 0;\n  line-height: 1.3;\n  word-wrap: break-word;\n  word-break: break-word;\n  overflow-wrap: break-word;\n  -webkit-hyphens: auto;\n          hyphens: auto;\n}\n.assigned-coach-card.compact .card-header .member-info .coach-id.compact[data-v-64bf2f74] {\n  font-size: 0.75rem;\n  color: #dc3545;\n  font-family: \"Courier New\", monospace;\n  font-weight: 500;\n  word-break: break-all;\n}\n.assigned-coach-card.compact .card-header .quick-actions[data-v-64bf2f74] {\n  display: flex;\n  gap: 4px;\n  flex-shrink: 0;\n  margin-left: 8px;\n}\n.assigned-coach-card.compact .card-header .quick-actions .btn-icon[data-v-64bf2f74] {\n  width: 28px;\n  height: 28px;\n  padding: 0;\n  border: none;\n  border-radius: 4px;\n  background: transparent;\n  color: #6c757d;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  transition: all 0.2s ease;\n  cursor: pointer;\n}\n.assigned-coach-card.compact .card-header .quick-actions .btn-icon[data-v-64bf2f74]:hover {\n  background: #dc3545;\n  color: white;\n  transform: scale(1.1);\n}\n.assigned-coach-card.compact .card-header .quick-actions .btn-icon i[data-v-64bf2f74] {\n  font-size: 0.8rem;\n}\n.assigned-coach-card.compact .card-body[data-v-64bf2f74] {\n  padding: 12px !important;\n  flex: 1;\n  overflow: visible;\n}\n.assigned-coach-card.compact .card-body .info-grid[data-v-64bf2f74] {\n  display: grid;\n  gap: 8px;\n  margin-bottom: 10px;\n}\n.assigned-coach-card.compact .card-body .info-grid .info-item[data-v-64bf2f74] {\n  display: flex;\n  align-items: flex-start;\n  gap: 8px;\n  font-size: 0.75rem;\n  line-height: 1.4;\n  word-wrap: break-word;\n}\n.assigned-coach-card.compact .card-body .info-grid .info-item i[data-v-64bf2f74] {\n  width: 16px;\n  color: #6c757d;\n  font-size: 0.8rem;\n  flex-shrink: 0;\n  margin-top: 2px;\n}\n.assigned-coach-card.compact .card-body .info-grid .info-item span[data-v-64bf2f74] {\n  flex: 1;\n  min-width: 0;\n  word-wrap: break-word;\n  word-break: break-word;\n  overflow-wrap: break-word;\n}\n.assigned-coach-card.compact .card-body .info-grid .info-item .clickable-text[data-v-64bf2f74] {\n  color: #495057;\n  cursor: pointer;\n  transition: color 0.2s ease;\n}\n.assigned-coach-card.compact .card-body .info-grid .info-item .clickable-text[data-v-64bf2f74]:hover {\n  color: #dc3545;\n  text-decoration: underline;\n}\n.assigned-coach-card.compact .card-body .info-grid .info-item span[data-v-64bf2f74]:not(.clickable-text) {\n  color: #6c757d;\n}\n.assigned-coach-card.compact .card-body .badges-row[data-v-64bf2f74] {\n  display: flex;\n  gap: 6px;\n  flex-wrap: wrap;\n  margin-top: 8px;\n}\n.assigned-coach-card.compact .card-body .badges-row .plan-badge[data-v-64bf2f74], .assigned-coach-card.compact .card-body .badges-row .status-badge[data-v-64bf2f74] {\n  font-size: 0.75rem;\n  font-weight: 500;\n  padding: 4px 8px;\n  border-radius: 4px;\n  display: inline-block;\n  white-space: nowrap;\n}\n.assigned-coach-card.compact .card-body .badges-row .plan-badge[data-v-64bf2f74] {\n  background: #e3f2fd;\n  color: #1976d2;\n  border: 1px solid #bbdefb;\n}\n.assigned-coach-card.compact .card-body .badges-row .status-badge.text-success[data-v-64bf2f74] {\n  background: #d4edda;\n  color: #155724;\n  border: 1px solid #c3e6cb;\n}\n.assigned-coach-card.compact .card-body .badges-row .status-badge.text-warning[data-v-64bf2f74] {\n  background: #fff3cd;\n  color: #856404;\n  border: 1px solid #ffeaa7;\n}\n.assigned-coach-card.compact .card-body .badges-row .status-badge.text-danger[data-v-64bf2f74] {\n  background: #f8d7da;\n  color: #721c24;\n  border: 1px solid #f5c6cb;\n}\n.assigned-coach-card.compact .card-body .badges-row .status-badge.text-info[data-v-64bf2f74] {\n  background: #d1ecf1;\n  color: #0c5460;\n  border: 1px solid #bee5eb;\n}\n.assigned-coach-card.compact .card-footer[data-v-64bf2f74] {\n  padding: 8px 12px;\n  background: #f8f9fa;\n  border-top: 1px solid #e9ecef;\n}\n.assigned-coach-card.compact .card-footer .unassign-btn[data-v-64bf2f74] {\n  width: 100%;\n  font-size: 0.8rem;\n  padding: 6px 12px;\n  border-radius: 4px;\n  font-weight: 500;\n  transition: all 0.2s ease;\n}\n.assigned-coach-card.compact .card-footer .unassign-btn[data-v-64bf2f74]:hover {\n  transform: translateY(-1px);\n  box-shadow: 0 2px 4px rgba(220, 53, 69, 0.3);\n}\n\n/* Member Details Popup Styling */\n.member-details-popup .swal2-popup[data-v-64bf2f74] {\n  border-radius: 12px;\n  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);\n}\n.member-details-popup .swal2-title[data-v-64bf2f74] {\n  color: #333;\n  font-weight: 600;\n  margin-bottom: 20px;\n}\n.member-details-popup .swal2-html-container[data-v-64bf2f74] {\n  margin: 0;\n  padding: 0;\n}\n\n/* Responsive adjustments for compact cards */\n@media (max-width: 768px) {\n.assigned-members-grid.compact[data-v-64bf2f74] {\n    grid-template-columns: 1fr;\n    gap: 12px;\n}\n.assigned-coach-card.compact .card-header[data-v-64bf2f74] {\n    padding: 12px;\n}\n.assigned-coach-card.compact .card-header .coach-avatar.compact[data-v-64bf2f74] {\n    width: 40px;\n    height: 40px;\n}\n.assigned-coach-card.compact .card-header .member-info .coach-name.compact[data-v-64bf2f74] {\n    font-size: 0.9rem;\n}\n.assigned-coach-card.compact .card-body[data-v-64bf2f74] {\n    padding: 12px !important;\n}\n.assigned-coach-card.compact .card-footer[data-v-64bf2f74] {\n    padding: 10px 12px;\n}\n}\n.assigned-coach-card[data-v-64bf2f74] {\n  background: white;\n  border: 1px solid #cccccc;\n  border-radius: 12px;\n  padding: 20px;\n  display: flex;\n  align-items: center;\n  gap: 15px;\n  transition: all 0.3s ease;\n}\n.assigned-coach-card[data-v-64bf2f74]:hover {\n  transform: translateY(-2px);\n  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);\n}\n.assigned-coach-card .coach-avatar[data-v-64bf2f74] {\n  flex-shrink: 0;\n}\n.assigned-coach-card .coach-avatar .coach-image[data-v-64bf2f74] {\n  width: 60px;\n  height: 60px;\n  border-radius: 50%;\n  -o-object-fit: cover;\n     object-fit: cover;\n  border: 3px solid #cccccc;\n}\n.assigned-coach-card .coach-details[data-v-64bf2f74] {\n  flex: 1;\n}\n.assigned-coach-card .coach-details .coach-name[data-v-64bf2f74] {\n  font-size: 1.1rem;\n  font-weight: 600;\n  color: #252525;\n  margin: 0 0 5px 0;\n}\n.assigned-coach-card .coach-details .coach-id[data-v-64bf2f74] {\n  font-size: 0.85rem;\n  color: #6c757d;\n  margin: 0;\n  font-weight: 500;\n}\n.assigned-coach-card .coach-details .coach-email[data-v-64bf2f74] {\n  font-size: 0.9rem;\n  color: #252525;\n  margin: 0 0 10px 0;\n}\n.assigned-coach-card .coach-details .coach-status-info[data-v-64bf2f74] {\n  display: flex;\n  gap: 10px;\n}\n.assigned-coach-card .coach-details .coach-status-info .coach-plan[data-v-64bf2f74],\n.assigned-coach-card .coach-details .coach-status-info .coach-status[data-v-64bf2f74] {\n  padding: 4px 8px;\n  border-radius: 4px;\n  font-size: 0.8rem;\n  font-weight: 600;\n}\n.assigned-coach-card .coach-details .coach-status-info .coach-status.active[data-v-64bf2f74] {\n  background-color: rgba(40, 167, 69, 0.2);\n  color: #155724;\n  border: 1px solid rgba(40, 167, 69, 0.3);\n}\n.assigned-coach-card .coach-details .coach-status-info .coach-status.inactive[data-v-64bf2f74] {\n  background-color: rgba(108, 117, 125, 0.2);\n  color: #495057;\n  border: 1px solid rgba(108, 117, 125, 0.3);\n}\n.assigned-coach-card .coach-details .coach-status-info .coach-status.on-hold[data-v-64bf2f74] {\n  background-color: rgba(255, 193, 7, 0.2);\n  color: #856404;\n  border: 1px solid rgba(255, 193, 7, 0.3);\n}\n.assigned-coach-card .coach-actions[data-v-64bf2f74] {\n  flex-shrink: 0;\n}\n\n/* Responsive adjustments for messages and members */\n@media (max-width: 768px) {\n.message-form .form-grid[data-v-64bf2f74] {\n    grid-template-columns: 1fr;\n    gap: 15px;\n}\n.message-form .form-actions[data-v-64bf2f74] {\n    flex-direction: column;\n    gap: 10px;\n}\n.messages-list .message-item .message-header[data-v-64bf2f74] {\n    flex-direction: column;\n    gap: 10px;\n}\n.messages-list .message-item .message-actions[data-v-64bf2f74] {\n    flex-wrap: wrap;\n}\n.assigned-members-grid[data-v-64bf2f74] {\n    grid-template-columns: 1fr;\n}\n.assigned-coach-card[data-v-64bf2f74] {\n    flex-direction: column;\n    text-align: center;\n}\n.assigned-coach-card .coach-actions[data-v-64bf2f74] {\n    margin-top: 15px;\n}\n}\n/* Settings Styles */\n.settings-grid[data-v-64bf2f74] {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));\n  gap: 25px;\n  margin-top: 20px;\n}\n.settings-section[data-v-64bf2f74] {\n  background: white;\n  border: 1px solid #cccccc;\n  border-radius: 12px;\n  padding: 25px;\n  transition: all 0.3s ease;\n}\n.settings-section[data-v-64bf2f74]:hover {\n  transform: translateY(-2px);\n  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);\n}\n.settings-section .settings-title[data-v-64bf2f74] {\n  font-size: 1.1rem;\n  font-weight: 600;\n  color: #333;\n  margin-bottom: 20px;\n  padding-bottom: 10px;\n  border-bottom: 2px solid #f0f0f0;\n}\n.settings-section .form-group[data-v-64bf2f74] {\n  margin-bottom: 15px;\n}\n.settings-section .form-group label[data-v-64bf2f74] {\n  font-weight: 500;\n  color: #555;\n  margin-bottom: 5px;\n}\n.settings-section .form-group .form-control[data-v-64bf2f74] {\n  border-radius: 6px;\n  border: 1px solid #ddd;\n  padding: 8px 12px;\n  transition: border-color 0.2s ease;\n}\n.settings-section .form-group .form-control[data-v-64bf2f74]:focus {\n  border-color: #dc3545;\n  box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);\n}\n.settings-section .form-group .form-check[data-v-64bf2f74] {\n  margin-bottom: 10px;\n}\n.settings-section .form-group .form-check .form-check-input[data-v-64bf2f74] {\n  margin-top: 0.25rem;\n}\n.settings-section .form-group .form-check .form-check-label[data-v-64bf2f74] {\n  margin: 15px 15px;\n  font-weight: 400;\n}\n.settings-section .section-header[data-v-64bf2f74] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  margin-bottom: 20px;\n  padding-bottom: 10px;\n  border-bottom: 2px solid #dcdcdc;\n}\n.settings-section .section-header h5[data-v-64bf2f74] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  font-size: 1.25rem;\n  font-weight: 600;\n  color: #252525;\n  margin: 0;\n  padding: 0;\n}\n.settings-section .section-header h5 i[data-v-64bf2f74] {\n  font-size: 1.125rem;\n  color: #dc3545;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  flex-shrink: 0;\n}\n.settings-section .section-header h5 span[data-v-64bf2f74] {\n  display: inline-block;\n}\n.settings-section .section-content .form-group[data-v-64bf2f74] {\n  margin-bottom: 20px;\n}\n.settings-section .section-content .form-group[data-v-64bf2f74]:last-child {\n  margin-bottom: 0;\n}\n.checkbox-group[data-v-64bf2f74] {\n  display: flex;\n  flex-direction: column;\n  gap: 12px;\n  margin-top: 8px;\n}\n.checkbox-item[data-v-64bf2f74] {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n  cursor: pointer;\n  padding: 8px;\n  border-radius: 6px;\n  transition: background-color 0.2s ease;\n}\n.checkbox-item[data-v-64bf2f74]:hover {\n  background-color: rgba(220, 53, 69, 0.05);\n}\n.checkbox-item input[type=checkbox][data-v-64bf2f74] {\n  width: 18px;\n  height: 18px;\n  margin: 0;\n  cursor: pointer;\n}\n.checkbox-item span[data-v-64bf2f74] {\n  font-size: 0.9rem;\n  color: #252525;\n  font-weight: 500;\n}\n.time-range[data-v-64bf2f74] {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n}\n.time-range input[type=time][data-v-64bf2f74] {\n  flex: 1;\n}\n.time-range span[data-v-64bf2f74] {\n  font-weight: 600;\n  color: #252525;\n}\n.toggle-switch[data-v-64bf2f74] {\n  position: relative;\n  display: inline-block;\n  width: 60px;\n  height: 30px;\n}\n.toggle-switch input[type=checkbox][data-v-64bf2f74] {\n  opacity: 0;\n  width: 0;\n  height: 0;\n}\n.toggle-switch .toggle-label[data-v-64bf2f74] {\n  position: absolute;\n  cursor: pointer;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  background-color: #ccc;\n  transition: 0.4s;\n  border-radius: 30px;\n}\n.toggle-switch .toggle-label[data-v-64bf2f74]:before {\n  position: absolute;\n  content: \"\";\n  height: 20px;\n  width: 20px;\n  left: 4px;\n  bottom: 4px;\n  background-color: white;\n  transition: 0.4s;\n  border-radius: 50%;\n}\n.toggle-switch input:checked + .toggle-label[data-v-64bf2f74] {\n  background-color: #dc3545;\n}\n.toggle-switch input:checked + .toggle-label[data-v-64bf2f74]:before {\n  transform: translateX(30px);\n}\n\n/* Responsive adjustments for settings */\n@media (max-width: 768px) {\n.settings-grid[data-v-64bf2f74] {\n    grid-template-columns: 1fr;\n    gap: 20px;\n}\n.settings-section[data-v-64bf2f74] {\n    padding: 20px;\n}\n.settings-section .section-header[data-v-64bf2f74] {\n    flex-direction: column;\n    align-items: flex-start;\n    gap: 8px;\n}\n.time-range[data-v-64bf2f74] {\n    flex-direction: column;\n    gap: 8px;\n}\n.time-range span[data-v-64bf2f74] {\n    text-align: center;\n}\n}\n.tasks-table-section[data-v-64bf2f74] {\n  margin-top: 30px;\n}\n.tasks-table-section .section-header[data-v-64bf2f74] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  margin-bottom: 20px;\n}\n.tasks-table-section .section-header .section-title[data-v-64bf2f74] {\n  font-size: 1.1rem;\n  font-weight: 600;\n  color: #252525;\n  margin: 0;\n}\n.tasks-table-section .section-header .section-title i[data-v-64bf2f74] {\n  margin-right: 8px;\n  color: #dc3545;\n}\n.tasks-table-section .section-header .refresh-btn[data-v-64bf2f74] {\n  background: #dc3545;\n  color: white;\n  border: none;\n  padding: 8px 16px;\n  border-radius: 6px;\n  font-size: 0.9rem;\n  transition: all 0.3s ease;\n  display: inline-flex;\n  align-items: center;\n  gap: 6px;\n}\n.tasks-table-section .section-header .refresh-btn[data-v-64bf2f74]:hover:not(:disabled) {\n  background: rgb(189.2151898734, 32.7848101266, 47.7721518987);\n  transform: translateY(-1px);\n}\n.tasks-table-section .section-header .refresh-btn[data-v-64bf2f74]:disabled {\n  opacity: 0.6;\n  cursor: not-allowed;\n}\n.loading-tasks[data-v-64bf2f74] {\n  text-align: center;\n  padding: 40px 20px;\n}\n.loading-tasks .spinner-border[data-v-64bf2f74] {\n  margin-bottom: 15px;\n}\n.loading-tasks p[data-v-64bf2f74] {\n  color: #252525;\n  margin: 0;\n}\n.no-tasks[data-v-64bf2f74] {\n  text-align: center;\n  padding: 40px 20px;\n  background: rgba(245, 245, 243, 0.1);\n}\n\n/* Assigned Members Overview Styles */\n.assigned-members-overview .overview-header[data-v-64bf2f74] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  margin-bottom: 20px;\n  padding: 20px;\n  background: rgba(245, 245, 243, 0.1);\n  border-radius: 10px;\n}\n.assigned-members-overview .overview-header h5[data-v-64bf2f74] {\n  margin: 0;\n  color: #252525;\n  font-weight: 600;\n}\n.assigned-members-overview .overview-header .view-toggle[data-v-64bf2f74] {\n  display: flex;\n  gap: 10px;\n}\n.assigned-members-overview .members-stats[data-v-64bf2f74] {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));\n  gap: 10px;\n  margin-bottom: 5px;\n}\n.assigned-members-overview .members-stats .stat-card[data-v-64bf2f74] {\n  background: white;\n  padding: 5px;\n  border-radius: 5px;\n  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);\n  display: flex;\n  align-items: center;\n  gap: 10px;\n  transition: transform 0.3s ease;\n}\n.assigned-members-overview .members-stats .stat-card[data-v-64bf2f74]:hover {\n  transform: translateY(-2px);\n}\n.assigned-members-overview .members-stats .stat-card .stat-icon[data-v-64bf2f74] {\n  width: 35px;\n  height: 35px;\n  border-radius: 50%;\n  background: linear-gradient(135deg, #dc3545, rgb(235.0632911392, 139.9367088608, 149.0506329114));\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  color: white;\n  font-size: 1.2rem;\n}\n.assigned-members-overview .members-stats .stat-card .stat-content .stat-number[data-v-64bf2f74] {\n  font-size: 1.5rem;\n  font-weight: 700;\n  color: #252525;\n  line-height: 1;\n}\n.assigned-members-overview .members-stats .stat-card .stat-content .stat-label[data-v-64bf2f74] {\n  color: #252525;\n  font-size: 0.9rem;\n  margin-top: 5px;\n}\n.assigned-members-overview .assigned-members-grid[data-v-64bf2f74] {\n  display: grid;\n  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));\n  gap: 20px;\n  margin-bottom: 30px;\n}\n.assigned-members-overview .assigned-members-grid .assigned-coach-card[data-v-64bf2f74] {\n  background: white;\n  border-radius: 15px;\n  padding: 20px;\n  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);\n  transition: all 0.3s ease;\n  position: relative;\n}\n.assigned-members-overview .assigned-members-grid .assigned-coach-card[data-v-64bf2f74]:hover {\n  transform: translateY(-3px);\n  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);\n}\n.assigned-members-overview .assigned-members-grid .assigned-coach-card .coach-avatar[data-v-64bf2f74] {\n  position: relative;\n  text-align: center;\n  margin-bottom: 15px;\n}\n.assigned-members-overview .assigned-members-grid .assigned-coach-card .coach-avatar .coach-image[data-v-64bf2f74] {\n  width: 80px;\n  height: 80px;\n  border-radius: 50%;\n  -o-object-fit: cover;\n     object-fit: cover;\n  border: 3px solid #dc3545;\n}\n.assigned-members-overview .assigned-members-grid .assigned-coach-card .coach-avatar .coach-status-badge[data-v-64bf2f74] {\n  position: absolute;\n  top: 0;\n  right: 50%;\n  transform: translateX(50%);\n  background: #dc3545;\n  color: white;\n  padding: 4px 8px;\n  border-radius: 12px;\n  font-size: 0.7rem;\n  font-weight: 600;\n  text-transform: uppercase;\n}\n.assigned-members-overview .assigned-members-grid .assigned-coach-card .coach-details[data-v-64bf2f74] {\n  margin-bottom: 20px;\n}\n.assigned-members-overview .assigned-members-grid .assigned-coach-card .coach-details .coach-name[data-v-64bf2f74] {\n  font-size: 1.2rem;\n  font-weight: 600;\n  color: #252525;\n  margin-bottom: 8px;\n}\n.assigned-members-overview .assigned-members-grid .assigned-coach-card .coach-details .coach-id[data-v-64bf2f74],\n.assigned-members-overview .assigned-members-grid .assigned-coach-card .coach-details .coach-email[data-v-64bf2f74],\n.assigned-members-overview .assigned-members-grid .assigned-coach-card .coach-details .coach-phone[data-v-64bf2f74] {\n  color: #252525;\n  margin-bottom: 5px;\n  font-size: 0.9rem;\n}\n.assigned-members-overview .assigned-members-grid .assigned-coach-card .coach-details .coach-info-row[data-v-64bf2f74] {\n  display: flex;\n  justify-content: center;\n  gap: 15px;\n  margin: 15px 0;\n}\n.assigned-members-overview .assigned-members-grid .assigned-coach-card .coach-details .coach-info-row .coach-plan[data-v-64bf2f74] {\n  padding: 4px 12px;\n  border-radius: 15px;\n  font-size: 0.8rem;\n  font-weight: 600;\n  text-transform: uppercase;\n}\n.assigned-members-overview .assigned-members-grid .assigned-coach-card .coach-details .coach-info-row .coach-plan.plan-premium[data-v-64bf2f74] {\n  background: linear-gradient(135deg, #ffd700, #ffed4e);\n  color: #8b6914;\n}\n.assigned-members-overview .assigned-members-grid .assigned-coach-card .coach-details .coach-info-row .coach-plan.plan-vip[data-v-64bf2f74] {\n  background: linear-gradient(135deg, #c71585, #ff69b4);\n  color: white;\n}\n.assigned-members-overview .assigned-members-grid .assigned-coach-card .coach-details .coach-info-row .coach-plan.plan-basic[data-v-64bf2f74] {\n  background: linear-gradient(135deg, #87ceeb, #b0e0e6);\n  color: #2f4f4f;\n}\n.assigned-members-overview .assigned-members-grid .assigned-coach-card .coach-details .coach-info-row .coach-plan.plan-na[data-v-64bf2f74] {\n  background: #f0f0f0;\n  color: #666;\n}\n.assigned-members-overview .assigned-members-grid .assigned-coach-card .coach-details .coach-info-row .coach-gender[data-v-64bf2f74] {\n  color: #252525;\n  font-size: 0.8rem;\n}\n.assigned-members-overview .assigned-members-grid .assigned-coach-card .coach-details .coach-join-date[data-v-64bf2f74] {\n  color: #252525;\n  font-size: 0.8rem;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  gap: 5px;\n}\n.assigned-members-overview .assigned-members-grid .assigned-coach-card .coach-actions[data-v-64bf2f74] {\n  display: flex;\n  justify-content: center;\n  gap: 8px;\n}\n.assigned-members-overview .assigned-members-grid .assigned-coach-card .coach-actions .btn[data-v-64bf2f74] {\n  padding: 6px 10px;\n  font-size: 0.8rem;\n  border-radius: 6px;\n  transition: all 0.3s ease;\n}\n.assigned-members-overview .assigned-members-grid .assigned-coach-card .coach-actions .btn[data-v-64bf2f74]:hover {\n  transform: translateY(-1px);\n}\n.assigned-members-overview .assigned-members-table[data-v-64bf2f74] {\n  background: white;\n  border-radius: 10px;\n  overflow: hidden;\n  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);\n}\n.assigned-members-overview .assigned-members-table .table-header[data-v-64bf2f74] {\n  background: linear-gradient(135deg, #f5f5f3, hsl(60, 9.0909090909%, 105.6862745098%));\n}\n.assigned-members-overview .assigned-members-table .table-header th[data-v-64bf2f74] {\n  border: none;\n  padding: 15px;\n  font-weight: 600;\n  color: #252525;\n  text-align: left;\n}\n.assigned-members-overview .assigned-members-table .table-row[data-v-64bf2f74] {\n  transition: background-color 0.3s ease;\n}\n.assigned-members-overview .assigned-members-table .table-row[data-v-64bf2f74]:hover {\n  background-color: rgba(220, 53, 69, 0.05);\n}\n.assigned-members-overview .assigned-members-table .table-row td[data-v-64bf2f74] {\n  padding: 15px;\n  border-bottom: 1px solid rgba(220, 220, 220, 0.3);\n  vertical-align: middle;\n}\n.assigned-members-overview .assigned-members-table .coach-info[data-v-64bf2f74] {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n}\n.assigned-members-overview .assigned-members-table .coach-info .coach-avatar[data-v-64bf2f74] {\n  width: 40px;\n  height: 40px;\n  border-radius: 50%;\n  overflow: hidden;\n  flex-shrink: 0;\n}\n.assigned-members-overview .assigned-members-table .coach-info .coach-avatar .coach-image[data-v-64bf2f74] {\n  width: 100%;\n  height: 100%;\n  -o-object-fit: cover;\n     object-fit: cover;\n}\n.assigned-members-overview .assigned-members-table .coach-info .coach-details .coach-name[data-v-64bf2f74] {\n  font-weight: 600;\n  color: #252525;\n  margin-bottom: 2px;\n}\n.assigned-members-overview .assigned-members-table .coach-info .coach-details .coach-gender[data-v-64bf2f74] {\n  font-size: 0.8rem;\n  color: #252525;\n}\n.assigned-members-overview .assigned-members-table .contact-info .coach-email[data-v-64bf2f74] {\n  font-weight: 500;\n  color: #252525;\n  margin-bottom: 2px;\n}\n.assigned-members-overview .assigned-members-table .contact-info .coach-phone[data-v-64bf2f74] {\n  font-size: 0.8rem;\n  color: #252525;\n}\n.assigned-members-overview .assigned-members-table .coach-actions[data-v-64bf2f74] {\n  display: flex;\n  gap: 5px;\n  flex-wrap: wrap;\n}\n.assigned-members-overview .assigned-members-table .coach-actions .btn[data-v-64bf2f74] {\n  padding: 4px 8px;\n  font-size: 0.8rem;\n}\n\n/* Enhanced Members Table Styles */\n.all-members-section .section-header[data-v-64bf2f74] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  margin-bottom: 20px;\n  padding: 20px;\n  background: rgba(245, 245, 243, 0.1);\n  border-radius: 10px;\n}\n.all-members-section .section-header h5[data-v-64bf2f74] {\n  margin: 0;\n  color: #252525;\n  font-weight: 600;\n}\n.all-members-section .section-header .view-controls[data-v-64bf2f74] {\n  display: flex;\n  gap: 10px;\n}\n.all-members-section .members-stats[data-v-64bf2f74] {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));\n  gap: 20px;\n  margin-bottom: 30px;\n}\n.all-members-section .members-stats .stat-card[data-v-64bf2f74] {\n  background: white;\n  padding: 20px;\n  border-radius: 10px;\n  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);\n  display: flex;\n  align-items: center;\n  gap: 15px;\n  transition: transform 0.3s ease;\n}\n.all-members-section .members-stats .stat-card[data-v-64bf2f74]:hover {\n  transform: translateY(-2px);\n}\n.all-members-section .members-stats .stat-card .stat-icon[data-v-64bf2f74] {\n  width: 50px;\n  height: 50px;\n  border-radius: 50%;\n  background: linear-gradient(135deg, #dc3545, rgb(235.0632911392, 139.9367088608, 149.0506329114));\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  color: white;\n  font-size: 1.2rem;\n}\n.all-members-section .members-stats .stat-card .stat-content .stat-number[data-v-64bf2f74] {\n  font-size: 1.5rem;\n  font-weight: 700;\n  color: #252525;\n  line-height: 1;\n}\n.all-members-section .members-stats .stat-card .stat-content .stat-label[data-v-64bf2f74] {\n  color: #252525;\n  font-size: 0.9rem;\n  margin-top: 5px;\n}\n.all-members-section .members-table[data-v-64bf2f74] {\n  background: white;\n  border-radius: 10px;\n  overflow: hidden;\n  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);\n}\n.all-members-section .members-table .table-header[data-v-64bf2f74] {\n  background: linear-gradient(135deg, #f5f5f3, hsl(60, 9.0909090909%, 105.6862745098%));\n}\n.all-members-section .members-table .table-header th[data-v-64bf2f74] {\n  border: none;\n  padding: 15px;\n  font-weight: 600;\n  color: #252525;\n  text-align: left;\n}\n.all-members-section .members-table .table-header th.text-center[data-v-64bf2f74] {\n  text-align: center;\n}\n.all-members-section .members-table .table-row[data-v-64bf2f74] {\n  transition: background-color 0.3s ease;\n}\n.all-members-section .members-table .table-row[data-v-64bf2f74]:hover {\n  background-color: rgba(220, 53, 69, 0.05);\n}\n.all-members-section .members-table .table-row td[data-v-64bf2f74] {\n  padding: 15px;\n  border-bottom: 1px solid rgba(220, 220, 220, 0.3);\n  vertical-align: middle;\n}\n.all-members-section .members-table .table-row td.text-center[data-v-64bf2f74] {\n  text-align: center;\n}\n.all-members-section .members-table .coach-info[data-v-64bf2f74] {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n}\n.all-members-section .members-table .coach-info .coach-avatar[data-v-64bf2f74] {\n  width: 40px;\n  height: 40px;\n  border-radius: 50%;\n  overflow: hidden;\n  flex-shrink: 0;\n}\n.all-members-section .members-table .coach-info .coach-avatar .coach-image[data-v-64bf2f74] {\n  width: 100%;\n  height: 100%;\n  -o-object-fit: cover;\n     object-fit: cover;\n}\n.all-members-section .members-table .coach-info .coach-details .coach-name[data-v-64bf2f74] {\n  font-weight: 600;\n  color: #252525;\n  margin-bottom: 2px;\n}\n.all-members-section .members-table .coach-info .coach-details .coach-gender[data-v-64bf2f74] {\n  font-size: 0.8rem;\n  color: #252525;\n}\n.all-members-section .members-table .contact-info .coach-email[data-v-64bf2f74] {\n  font-weight: 500;\n  color: #252525;\n  margin-bottom: 2px;\n}\n.all-members-section .members-table .contact-info .coach-phone[data-v-64bf2f74] {\n  font-size: 0.8rem;\n  color: #252525;\n}\n.all-members-section .members-table .coach-actions[data-v-64bf2f74] {\n  display: flex;\n  gap: 5px;\n  flex-wrap: wrap;\n}\n.all-members-section .members-table .coach-actions .btn[data-v-64bf2f74] {\n  padding: 4px 8px;\n  font-size: 0.8rem;\n}\n.all-members-section .pagination-section[data-v-64bf2f74] {\n  margin-top: 30px;\n  text-align: center;\n}\n.all-members-section .pagination-section .pagination .page-item .page-link[data-v-64bf2f74] {\n  color: #dc3545;\n  border: 1px solid rgba(220, 53, 69, 0.2);\n  margin: 0 2px;\n  border-radius: 6px;\n}\n.all-members-section .pagination-section .pagination .page-item .page-link[data-v-64bf2f74]:hover {\n  background-color: rgba(220, 53, 69, 0.1);\n  border-color: #dc3545;\n}\n.all-members-section .pagination-section .pagination .page-item.active .page-link[data-v-64bf2f74] {\n  background-color: #dc3545;\n  border-color: #dc3545;\n  color: white;\n}\n.all-members-section .pagination-section .pagination .page-item.disabled .page-link[data-v-64bf2f74] {\n  color: #252525;\n  border-color: rgba(220, 220, 220, 0.3);\n  cursor: not-allowed;\n}\n.default-members-view[data-v-64bf2f74] {\n  text-align: center;\n  padding: 60px 20px;\n}\n.default-members-view .welcome-section[data-v-64bf2f74] {\n  max-width: 600px;\n  margin: 0 auto;\n}\n.default-members-view .welcome-section .welcome-icon[data-v-64bf2f74] {\n  width: 80px;\n  height: 80px;\n  border-radius: 50%;\n  background: linear-gradient(135deg, #dc3545, rgb(235.0632911392, 139.9367088608, 149.0506329114));\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  margin: 0 auto 20px;\n  color: white;\n  font-size: 2rem;\n}\n.default-members-view .welcome-section h5[data-v-64bf2f74] {\n  color: #252525;\n  font-size: 1.5rem;\n  margin-bottom: 15px;\n}\n.default-members-view .welcome-section p[data-v-64bf2f74] {\n  color: #252525;\n  margin-bottom: 30px;\n  line-height: 1.6;\n}\n.default-members-view .welcome-section .action-buttons[data-v-64bf2f74] {\n  display: flex;\n  gap: 20px;\n  justify-content: center;\n  flex-wrap: wrap;\n}\n.default-members-view .welcome-section .action-buttons .btn[data-v-64bf2f74] {\n  padding: 12px 24px;\n  font-size: 1rem;\n  border-radius: 8px;\n  transition: all 0.3s ease;\n}\n.default-members-view .welcome-section .action-buttons .btn[data-v-64bf2f74]:hover {\n  transform: translateY(-2px);\n  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);\n}\n.header-actions[data-v-64bf2f74] {\n  display: flex;\n  gap: 8px;\n  align-items: center;\n}\n.header-actions .view-toggle-group[data-v-64bf2f74] {\n  display: flex;\n  gap: 2px;\n  background: #f8f9fa;\n  border-radius: 6px;\n  padding: 2px;\n  border: 1px solid #e9ecef;\n}\n.header-actions .view-toggle-group .view-toggle-btn[data-v-64bf2f74] {\n  width: 32px;\n  height: 32px;\n  padding: 0;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  border-radius: 4px;\n  border: none;\n  transition: all 0.2s ease;\n  font-size: 0.9rem;\n}\n.header-actions .view-toggle-group .view-toggle-btn[data-v-64bf2f74]:hover {\n  transform: translateY(-1px);\n  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);\n}\n.header-actions .view-toggle-group .view-toggle-btn.btn-primary[data-v-64bf2f74] {\n  background: #dc3545;\n  color: white;\n  box-shadow: 0 2px 4px rgba(0, 123, 255, 0.3);\n}\n.header-actions .view-toggle-group .view-toggle-btn.btn-outline-secondary[data-v-64bf2f74] {\n  background: transparent;\n  color: #6c757d;\n}\n.header-actions .view-toggle-group .view-toggle-btn.btn-outline-secondary[data-v-64bf2f74]:hover {\n  background: #e9ecef;\n  color: #495057;\n}\n.header-actions .assign-member-btn[data-v-64bf2f74] {\n  background: linear-gradient(135deg, #dc3545 0%, #c82333 100%);\n  border: none;\n  border-radius: 6px;\n  padding: 8px 16px;\n  font-weight: 600;\n  font-size: 0.85rem;\n  color: white;\n  box-shadow: 0 2px 8px rgba(220, 53, 69, 0.3);\n  transition: all 0.3s ease;\n  display: flex;\n  align-items: center;\n  gap: 6px;\n}\n.header-actions .assign-member-btn[data-v-64bf2f74]:hover {\n  transform: translateY(-2px);\n  box-shadow: 0 4px 12px rgba(220, 53, 69, 0.4);\n  background: linear-gradient(135deg, #c82333 0%, #bd2130 100%);\n}\n.header-actions .assign-member-btn[data-v-64bf2f74]:active {\n  transform: translateY(0);\n  box-shadow: 0 2px 4px rgba(220, 53, 69, 0.3);\n}\n.header-actions .assign-member-btn i[data-v-64bf2f74] {\n  font-size: 0.9rem;\n}\n.no-assigned-members[data-v-64bf2f74] {\n  text-align: center;\n  padding: 40px 20px;\n}\n.no-assigned-members i[data-v-64bf2f74] {\n  font-size: 3rem;\n  color: #6a6a6a;\n  margin-bottom: 15px;\n}\n.no-assigned-members p[data-v-64bf2f74] {\n  color: #252525;\n  margin: 0;\n}\n.tasks-table[data-v-64bf2f74] {\n  background: white;\n  border-radius: 8px;\n  overflow: hidden;\n  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);\n}\n.tasks-table thead[data-v-64bf2f74] {\n  background: #dededc;\n}\n.tasks-table thead th[data-v-64bf2f74] {\n  border: none;\n  padding: 15px 12px;\n  font-weight: 600;\n  color: #252525;\n  font-size: 0.9rem;\n  text-transform: uppercase;\n  letter-spacing: 0.5px;\n}\n.tasks-table tbody tr[data-v-64bf2f74] {\n  transition: all 0.3s ease;\n}\n.tasks-table tbody tr[data-v-64bf2f74]:hover {\n  background: rgba(79, 112, 92, 0.05);\n}\n.tasks-table tbody tr td[data-v-64bf2f74] {\n  border: none;\n  padding: 15px 12px;\n  vertical-align: middle;\n  border-bottom: 1px solid #dcdcdc;\n}\n.task-title .task-description[data-v-64bf2f74] {\n  font-size: 0.8rem;\n  color: #6a6a6a;\n  margin-top: 4px;\n  line-height: 1.3;\n}\n.badge[data-v-64bf2f74] {\n  padding: 3px 6px;\n  border-radius: 15px;\n}\n.category-badge[data-v-64bf2f74],\n.priority-badge[data-v-64bf2f74],\n.status-badge[data-v-64bf2f74] {\n  color: white;\n}\n.task-actions[data-v-64bf2f74] {\n  display: flex;\n  gap: 8px;\n}\n.task-actions .btn[data-v-64bf2f74] {\n  padding: 6px 10px;\n  font-size: 0.8rem;\n  border-radius: 6px;\n  transition: all 0.3s ease;\n}\n.task-actions .btn[data-v-64bf2f74]:hover {\n  transform: translateY(-1px);\n}\n\n/* Editing task indicator */\n.editing-task[data-v-64bf2f74] {\n  background-color: rgba(79, 112, 92, 0.15) !important;\n  border-left: 4px solid #dc3545 !important;\n  box-shadow: 0 2px 8px rgba(79, 112, 92, 0.2) !important;\n}\n.editing-task td[data-v-64bf2f74] {\n  font-weight: 600;\n}\n\n/* Button Styles */\n.btn[data-v-64bf2f74] {\n  padding: 8px 16px;\n  border-radius: 6px;\n  font-size: 0.85rem;\n  font-weight: 600;\n  border: none;\n  cursor: pointer;\n  transition: all 0.3s ease;\n  display: flex;\n  align-items: center;\n  gap: 6px;\n}\n.btn-primary[data-v-64bf2f74] {\n  background: #dc3545;\n  color: white;\n}\n.btn-primary[data-v-64bf2f74]:hover {\n  background: rgb(189.2151898734, 32.7848101266, 47.7721518987);\n  transform: translateY(-1px);\n}\n.btn-secondary[data-v-64bf2f74] {\n  background: #6c757d;\n  color: white;\n}\n.btn-secondary[data-v-64bf2f74]:hover {\n  background: #5a6268;\n  transform: translateY(-1px);\n}\n.btn-success[data-v-64bf2f74] {\n  background: #28a745;\n  color: white;\n}\n.btn-success[data-v-64bf2f74]:hover {\n  background: #218838;\n  transform: translateY(-1px);\n}\n.btn-outline-primary[data-v-64bf2f74] {\n  background: transparent;\n  color: #dc3545;\n  border: 1px solid #dc3545;\n  border-radius: 8px;\n  padding: 10px 20px;\n  font-weight: 500;\n  transition: all 0.3s ease;\n}\n.btn-outline-primary[data-v-64bf2f74]:hover {\n  background: #dc3545;\n  color: #ffffff;\n  transform: translateY(-1px);\n  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);\n}\n.btn-outline-warning[data-v-64bf2f74] {\n  background: transparent;\n  color: #ffc107;\n  border: 1px solid #ffc107;\n}\n.btn-outline-warning[data-v-64bf2f74]:hover {\n  background: #ffc107;\n  color: #212529;\n  transform: translateY(-1px);\n}\n.data-cards-container[data-v-64bf2f74] {\n  display: flex;\n  flex-direction: column;\n  gap: 8px;\n  margin-top: 16px;\n}\n.data-card[data-v-64bf2f74] {\n  display: flex;\n  align-items: center;\n  background: #f8f9fa;\n  border: 1px solid #e9ecef;\n  border-radius: 8px;\n  padding: 12px 16px;\n  min-height: 48px;\n  transition: all 0.2s ease;\n  gap: 16px;\n}\n.data-card[data-v-64bf2f74]:hover {\n  background: #e9ecef;\n  border-color: #dee2e6;\n}\n.data-card .data-label[data-v-64bf2f74] {\n  font-weight: 500;\n  color: #000000;\n  font-size: 14px;\n  min-width: 140px;\n  flex-shrink: 0;\n}\n.data-card .data-value[data-v-64bf2f74] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  color: #212529;\n  font-size: 14px;\n  font-weight: 400;\n  flex: 1;\n}\n.data-card .data-value .inline-edit[data-v-64bf2f74] {\n  border: 1px solid #ced4da;\n  border-radius: 4px;\n  padding: 4px 8px;\n  font-size: 14px;\n  background: white;\n  width: 100%;\n  text-align: left;\n}\n.data-card .data-value .inline-edit[data-v-64bf2f74]:focus {\n  outline: none;\n  border-color: #80bdff;\n  box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);\n}\n.data-card .data-value .inline-edit.readonly[data-v-64bf2f74] {\n  background: transparent;\n  border: none;\n  padding: 0;\n}\n.data-card .data-value .status-active[data-v-64bf2f74] {\n  color: #28a745;\n  font-weight: 500;\n}\n.data-card .data-value .info-icon[data-v-64bf2f74] {\n  color: #6c757d;\n  font-size: 12px;\n  cursor: pointer;\n  background: none;\n  border: none;\n  padding: 0;\n  margin-left: 4px;\n  transition: color 0.2s ease;\n}\n.data-card .data-value .info-icon[data-v-64bf2f74]:hover {\n  color: #495057;\n}\n.data-card .data-value .edit-icon[data-v-64bf2f74] {\n  color: #6c757d;\n  font-size: 12px;\n  cursor: pointer;\n  opacity: 0.7;\n  transition: opacity 0.2s ease;\n}\n.data-card .data-value .edit-icon[data-v-64bf2f74]:hover {\n  opacity: 1;\n}\n.notes-content[data-v-64bf2f74] {\n  padding: 20px;\n}\n.add-note-section[data-v-64bf2f74] {\n  margin-bottom: 15px;\n  padding: 15px;\n  background: #dededc;\n  border-radius: 8px;\n  border: 1px solid #e9ecef;\n}\n.add-note-section .section-title[data-v-64bf2f74] {\n  font-size: 18px;\n  font-weight: 600;\n  color: #252525;\n  margin-bottom: 20px;\n}\n.add-note-section .note-form[data-v-64bf2f74] {\n  display: flex;\n  flex-direction: column;\n  gap: 15px;\n}\n.add-note-section .note-form .form-group[data-v-64bf2f74] {\n  display: flex;\n  flex-direction: column;\n  gap: 8px;\n}\n.add-note-section .note-form .form-group .form-label[data-v-64bf2f74] {\n  font-weight: 500;\n  color: #252525;\n  font-size: 14px;\n}\n.add-note-section .note-form .form-group .note-textarea[data-v-64bf2f74] {\n  min-height: 100px;\n  resize: vertical;\n  border: 1px solid #e9ecef;\n  border-radius: 4px;\n  padding: 12px;\n  font-size: 14px;\n}\n.add-note-section .note-form .form-group .note-textarea[data-v-64bf2f74]:focus {\n  outline: none;\n  border-color: #ff4040;\n  box-shadow: 0 0 0 0.2rem rgba(255, 64, 64, 0.25);\n}\n.add-note-section .note-form .form-group .form-control[data-v-64bf2f74] {\n  border: 1px solid #e9ecef;\n  border-radius: 4px;\n  padding: 8px 12px;\n  font-size: 14px;\n}\n.add-note-section .note-form .form-group .form-control[data-v-64bf2f74]:focus {\n  outline: none;\n  border-color: #ff4040;\n  box-shadow: 0 0 0 0.2rem rgba(255, 64, 64, 0.25);\n}\n.add-note-section .note-form .save-note-btn[data-v-64bf2f74] {\n  align-self: flex-start;\n  background: #dc3545;\n  color: white;\n  border: none;\n  padding: 10px 20px;\n  border-radius: 4px;\n  font-size: 14px;\n  font-weight: 500;\n  cursor: pointer;\n  transition: all 0.3s ease;\n}\n.add-note-section .note-form .save-note-btn[data-v-64bf2f74]:hover {\n  background: rgb(189.2151898734, 32.7848101266, 47.7721518987);\n  transform: translateY(-1px);\n  box-shadow: 0 4px 8px rgba(255, 64, 64, 0.3);\n}\n.overview-section .overview-header[data-v-64bf2f74] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  margin-bottom: 20px;\n}\n.overview-section .overview-header .section-title[data-v-64bf2f74] {\n  font-size: 18px;\n  font-weight: 600;\n  color: #333;\n  margin: 0;\n}\n.overview-section .overview-header .category-filter[data-v-64bf2f74] {\n  width: 150px;\n  border: 1px solid #ced4da;\n  border-radius: 4px;\n  padding: 8px 12px;\n  font-size: 14px;\n}\n.overview-section .overview-header .category-filter[data-v-64bf2f74]:focus {\n  outline: none;\n  border-color: #dc3545;\n  box-shadow: 0 0 0 0.2rem rgba(255, 64, 64, 0.25);\n}\n.overview-section .notes-list .no-results[data-v-64bf2f74] {\n  text-align: center;\n  color: #6c757d;\n  font-size: 16px;\n  padding: 40px 20px;\n  background: #f8f9fa;\n  border-radius: 8px;\n  border: 1px solid #e9ecef;\n}\n.overview-section .notes-list .notes-grid[data-v-64bf2f74] {\n  display: grid;\n  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));\n  gap: 20px;\n}\n.overview-section .notes-list .notes-grid .note-card[data-v-64bf2f74] {\n  background: white;\n  border: 1px solid #e9ecef;\n  border-radius: 8px;\n  padding: 16px;\n  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);\n  transition: box-shadow 0.3s ease;\n}\n.overview-section .notes-list .notes-grid .note-card[data-v-64bf2f74]:hover {\n  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);\n}\n.overview-section .notes-list .notes-grid .note-card .note-header[data-v-64bf2f74] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  margin-bottom: 12px;\n  padding-bottom: 8px;\n  border-bottom: 1px solid #f1f3f4;\n}\n.overview-section .notes-list .notes-grid .note-card .note-header .note-category[data-v-64bf2f74] {\n  background: #dc3545;\n  color: white;\n  padding: 4px 8px;\n  border-radius: 4px;\n  font-size: 12px;\n  font-weight: 500;\n}\n.overview-section .notes-list .notes-grid .note-card .note-header .note-date[data-v-64bf2f74] {\n  color: #6c757d;\n  font-size: 12px;\n}\n.overview-section .notes-list .notes-grid .note-card .note-content[data-v-64bf2f74] {\n  color: #252525;\n  font-size: 14px;\n  line-height: 1.5;\n  margin-bottom: 12px;\n}\n.overview-section .notes-list .notes-grid .note-card .note-actions[data-v-64bf2f74] {\n  display: flex;\n  gap: 8px;\n  justify-content: flex-end;\n}\n.overview-section .notes-list .notes-grid .note-card .note-actions .btn[data-v-64bf2f74] {\n  padding: 4px 8px;\n  font-size: 12px;\n  border-radius: 4px;\n  transition: all 0.3s ease;\n}\n.overview-section .notes-list .notes-grid .note-card .note-actions .btn-outline-primary[data-v-64bf2f74] {\n  color: #dc3545;\n  border-color: #ff4040;\n}\n.overview-section .notes-list .notes-grid .note-card .note-actions .btn-outline-primary[data-v-64bf2f74]:hover {\n  background: #dc3545;\n  color: white;\n  transform: translateY(-1px);\n}\n.overview-section .notes-list .notes-grid .note-card .note-actions .btn-outline-danger[data-v-64bf2f74] {\n  color: #dc3545;\n  border-color: #dc3545;\n}\n.overview-section .notes-list .notes-grid .note-card .note-actions .btn-outline-danger[data-v-64bf2f74]:hover {\n  background: #dc3545;\n  color: white;\n  transform: translateY(-1px);\n}\n\n/* Responsive Design */\n@media (max-width: 768px) {\n.coach-header-section[data-v-64bf2f74] {\n    padding: 12px 16px;\n}\n.header-wrapper[data-v-64bf2f74] {\n    gap: 12px;\n}\n.breadcrumb-section[data-v-64bf2f74] {\n    width: 100%;\n}\n.header-content[data-v-64bf2f74] {\n    width: 100%;\n    justify-content: flex-start;\n    flex-wrap: wrap;\n    gap: 6px;\n}\n.tab-icons[data-v-64bf2f74] {\n    flex-wrap: wrap;\n    justify-content: center;\n    gap: 3px;\n}\n.tab-icon-btn[data-v-64bf2f74] {\n    width: 32px;\n    height: 32px;\n    font-size: 12px;\n}\n.form-grid[data-v-64bf2f74] {\n    grid-template-columns: 1fr;\n    gap: 15px;\n}\n.profile-avatar[data-v-64bf2f74] {\n    width: 60px;\n    height: 60px;\n}\n.coach-name[data-v-64bf2f74] {\n    font-size: 1rem;\n}\n.data-card[data-v-64bf2f74] {\n    flex-direction: column;\n    align-items: flex-start;\n    gap: 8px;\n}\n.data-card .data-value[data-v-64bf2f74] {\n    justify-content: flex-start;\n    text-align: left;\n}\n.tab-navigation[data-v-64bf2f74] {\n    flex-wrap: wrap;\n    gap: 8px;\n    margin: 15px 0 15px 15px;\n}\n.tab-item[data-v-64bf2f74] {\n    flex: 1 1 auto;\n    min-width: 120px;\n    padding: 8px 12px;\n    font-size: 0.85rem;\n    border-radius: 16px;\n}\n.tab-content[data-v-64bf2f74] {\n    min-height: 300px;\n}\n.form-section.compact[data-v-64bf2f74] {\n    padding: 12px;\n}\n.section-header.compact[data-v-64bf2f74] {\n    margin-bottom: 12px;\n}\n.form-group.compact[data-v-64bf2f74] {\n    margin-bottom: 10px;\n}\n.form-control.compact[data-v-64bf2f74] {\n    padding: 6px 10px;\n    font-size: 0.85rem;\n}\n.action-buttons[data-v-64bf2f74] {\n    gap: 10px;\n}\n.action-buttons .btn[data-v-64bf2f74] {\n    min-width: 100px;\n    padding: 10px 16px;\n    font-size: 0.85rem;\n}\n.bottom-actions[data-v-64bf2f74] {\n    padding: 10px;\n}\n}\n/* Profile Form Styles */\n.profile-form[data-v-64bf2f74] {\n  padding: 30px 0;\n}\n\n/* Assignment Header Styles */\n.assignment-header[data-v-64bf2f74] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  margin-bottom: 25px;\n  padding: 20px;\n  background: linear-gradient(135deg, #f8f9fa, #e9ecef);\n  border-radius: 12px;\n  border: 1px solid #dee2e6;\n  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);\n}\n.assignment-header .assignment-title[data-v-64bf2f74] {\n  margin: 0;\n  color: #252525;\n  font-size: 1.3rem;\n  font-weight: 600;\n  display: flex;\n  align-items: center;\n  gap: 10px;\n}\n.assignment-header .assignment-title i[data-v-64bf2f74] {\n  color: #dc3545;\n  font-size: 1.1rem;\n}\n.assignment-header .close-btn[data-v-64bf2f74] {\n  padding: 8px 16px;\n  border-radius: 8px;\n  font-weight: 500;\n  transition: all 0.3s ease;\n}\n.assignment-header .close-btn[data-v-64bf2f74]:hover {\n  background-color: #6c757d;\n  border-color: #6c757d;\n  color: white;\n  transform: translateY(-1px);\n}\n.assignment-header .close-btn i[data-v-64bf2f74] {\n  margin-right: 5px;\n}\n\n/* Settings Actions Styles */\n.settings-actions[data-v-64bf2f74] {\n  margin-top: 30px;\n  padding: 25px;\n  background: #f8f9fa;\n  border-radius: 12px;\n  border: 1px solid #dee2e6;\n}\n.settings-actions .action-buttons[data-v-64bf2f74] {\n  display: flex;\n  gap: 15px;\n  justify-content: center;\n}\n.settings-actions .action-buttons .btn[data-v-64bf2f74] {\n  padding: 12px 24px;\n  font-weight: 500;\n  border-radius: 8px;\n  transition: all 0.3s ease;\n}\n.settings-actions .action-buttons .btn[data-v-64bf2f74]:hover {\n  transform: translateY(-2px);\n  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);\n}\n.settings-actions .action-buttons .btn[data-v-64bf2f74]:disabled {\n  opacity: 0.6;\n  cursor: not-allowed;\n  transform: none;\n  box-shadow: none;\n}\n.coach-assignment-content[data-v-64bf2f74] {\n  padding: 20px 0;\n}\n.trainer-assignment-content[data-v-64bf2f74] {\n  padding: 20px 0;\n}\n.existing-assignment[data-v-64bf2f74] {\n  margin-bottom: 30px;\n}\n.existing-assignment .assignment-info[data-v-64bf2f74] {\n  background: #f8f9fa;\n  border: 1px solid #e9ecef;\n  border-radius: 12px;\n  padding: 20px;\n  margin-bottom: 20px;\n}\n.existing-assignment .assignment-info .info-item[data-v-64bf2f74] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  margin-bottom: 15px;\n}\n.existing-assignment .assignment-info .info-item[data-v-64bf2f74]:last-child {\n  margin-bottom: 0;\n}\n.existing-assignment .assignment-info .info-item strong[data-v-64bf2f74] {\n  color: #6c757d;\n  font-weight: 600;\n}\n.existing-assignment .assignment-info .info-item .coach-name[data-v-64bf2f74],\n.existing-assignment .assignment-info .info-item .coach-type[data-v-64bf2f74] {\n  color: #495057;\n  font-weight: 500;\n}\n.existing-assignment .assignment-info .info-item .status-badge[data-v-64bf2f74] {\n  padding: 4px 12px;\n  border-radius: 20px;\n  font-size: 0.8rem;\n  font-weight: 600;\n}\n.existing-assignment .assignment-info .info-item .status-badge.active[data-v-64bf2f74] {\n  background: #d4edda;\n  color: #155724;\n}\n.existing-assignment .assignment-actions[data-v-64bf2f74] {\n  display: flex;\n  gap: 10px;\n  justify-content: flex-end;\n}\n.current-assignment[data-v-64bf2f74] {\n  margin-bottom: 30px;\n}\n.assignment-card[data-v-64bf2f74] {\n  background: #f8f9fa;\n  border: 1px solid #e9ecef;\n  border-radius: 12px;\n  padding: 20px;\n}\n.assignment-header[data-v-64bf2f74] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  margin-bottom: 20px;\n}\n.assignment-header h5[data-v-64bf2f74] {\n  margin: 0;\n  color: #495057;\n}\n.assignment-status[data-v-64bf2f74] {\n  padding: 4px 12px;\n  border-radius: 20px;\n  font-size: 0.8rem;\n  font-weight: 600;\n}\n.assignment-status.active[data-v-64bf2f74] {\n  background: #d4edda;\n  color: #155724;\n}\n.assignment-details .detail-row[data-v-64bf2f74] {\n  display: flex;\n  margin-bottom: 12px;\n}\n.assignment-details .detail-row .label[data-v-64bf2f74] {\n  font-weight: 600;\n  color: #6c757d;\n  min-width: 140px;\n}\n.assignment-details .detail-row .value[data-v-64bf2f74] {\n  color: #495057;\n}\n.coach-assignment-form form .form-actions[data-v-64bf2f74] {\n  display: flex;\n  gap: 15px;\n  margin-top: 30px;\n  padding-top: 20px;\n  border-top: 1px solid #e9ecef;\n}\n.no-assignment .empty-state[data-v-64bf2f74] {\n  text-align: center;\n  padding: 60px 20px;\n  color: #6c757d;\n}\n.no-assignment .empty-state i[data-v-64bf2f74] {\n  font-size: 48px;\n  margin-bottom: 20px;\n  color: #dee2e6;\n}\n.no-assignment .empty-state h5[data-v-64bf2f74] {\n  margin-bottom: 10px;\n  color: #495057;\n}\n.no-assignment .empty-state p[data-v-64bf2f74] {\n  margin: 0;\n  font-size: 0.9rem;\n}\n\n/* Tab Content Body Styles */\n.tab-content-body[data-v-64bf2f74] {\n  padding: 20px;\n}\n.empty-state[data-v-64bf2f74] {\n  text-align: center;\n  padding: 60px 20px;\n  color: #6c757d;\n}\n.empty-state .empty-state-icon[data-v-64bf2f74] {\n  margin-bottom: 20px;\n}\n.empty-state .empty-state-icon i[data-v-64bf2f74] {\n  font-size: 48px;\n  color: #dee2e6;\n}\n.empty-state .empty-state-title[data-v-64bf2f74] {\n  margin-bottom: 10px;\n  color: #495057;\n  font-size: 1.2rem;\n}\n.empty-state .empty-state-text[data-v-64bf2f74] {\n  margin-bottom: 20px;\n  font-size: 0.9rem;\n  line-height: 1.5;\n}\n\n/* Activities List Styles */\n.activities-list .activity-item[data-v-64bf2f74] {\n  display: flex;\n  align-items: flex-start;\n  padding: 15px 0;\n  border-bottom: 1px solid #f0f0f0;\n}\n.activities-list .activity-item[data-v-64bf2f74]:last-child {\n  border-bottom: none;\n}\n.activities-list .activity-item .activity-icon[data-v-64bf2f74] {\n  width: 40px;\n  height: 40px;\n  border-radius: 50%;\n  background: #f8f9fa;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  margin-right: 15px;\n  flex-shrink: 0;\n}\n.activities-list .activity-item .activity-icon i[data-v-64bf2f74] {\n  font-size: 16px;\n}\n.activities-list .activity-item .activity-content[data-v-64bf2f74] {\n  flex: 1;\n}\n.activities-list .activity-item .activity-content .activity-title[data-v-64bf2f74] {\n  font-weight: 600;\n  color: #495057;\n  margin-bottom: 4px;\n  font-size: 0.95rem;\n}\n.activities-list .activity-item .activity-content .activity-description[data-v-64bf2f74] {\n  color: #6c757d;\n  font-size: 0.85rem;\n  margin-bottom: 4px;\n  line-height: 1.4;\n}\n.activities-list .activity-item .activity-content .activity-time[data-v-64bf2f74] {\n  color: #adb5bd;\n  font-size: 0.8rem;\n}\n\n/* Change Tracking Styles */\n.change-indicator[data-v-64bf2f74] {\n  position: absolute;\n  right: 8px;\n  top: 50%;\n  transform: translateY(-50%);\n  color: #28a745;\n  font-size: 0.8rem;\n  z-index: 10;\n  pointer-events: none;\n}\n.data-value[data-v-64bf2f74] {\n  position: relative;\n}\n.inline-edit.has-changes[data-v-64bf2f74] {\n  border-color: #28a745 !important;\n  background-color: rgba(40, 167, 69, 0.05);\n  box-shadow: 0 0 0 2px rgba(40, 167, 69, 0.1);\n}\n.action-item.has-unsaved-changes[data-v-64bf2f74] {\n  background-color: rgba(255, 193, 7, 0.1);\n  border-color: #ffc107;\n  color: #856404;\n}\n.action-item.has-unsaved-changes .action-icon[data-v-64bf2f74] {\n  color: #ffc107;\n}\n.unsaved-indicator[data-v-64bf2f74] {\n  position: absolute;\n  top: 5px;\n  right: 5px;\n  color: #ffc107;\n  font-size: 0.6rem;\n  animation: pulse-data-v-64bf2f74 2s infinite;\n}\n@keyframes pulse-data-v-64bf2f74 {\n0% {\n    opacity: 1;\n}\n50% {\n    opacity: 0.5;\n}\n100% {\n    opacity: 1;\n}\n}\n/* Enhanced form field styling */\n.inline-edit[data-v-64bf2f74] {\n  transition: all 0.3s ease;\n}\n.inline-edit[data-v-64bf2f74]:focus {\n  outline: none;\n  border-color: #dc3545;\n  box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.25);\n}\n.inline-edit.has-changes[data-v-64bf2f74]:focus {\n  border-color: #28a745;\n  box-shadow: 0 0 0 2px rgba(40, 167, 69, 0.25);\n}\n\n/* Action button enhancements */\n.action-item[data-v-64bf2f74] {\n  transition: all 0.3s ease;\n  position: relative;\n}\n.action-item[data-v-64bf2f74]:hover {\n  transform: translateY(-2px);\n  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);\n}\n.action-item.has-unsaved-changes[data-v-64bf2f74]:hover {\n  background-color: rgba(255, 193, 7, 0.2);\n}\n\n/* Enhanced responsiveness across breakpoints */\n@media (max-width: 1200px) {\n.main-layout[data-v-64bf2f74] {\n    gap: 8px;\n}\n.tab-icons[data-v-64bf2f74] {\n    flex-wrap: wrap;\n}\n.form-section.compact[data-v-64bf2f74] {\n    padding: 12px;\n}\n}\n@media (max-width: 992px) {\n.main-layout[data-v-64bf2f74] {\n    flex-direction: column;\n    min-height: auto;\n    max-height: none;\n    overflow: visible;\n}\n.profile-sidebar[data-v-64bf2f74] {\n    max-height: none;\n    overflow: visible;\n    order: 0;\n    width: 100%;\n}\n.content-area[data-v-64bf2f74] {\n    order: 1;\n    overflow: visible;\n}\n.tab-icons[data-v-64bf2f74] {\n    flex-wrap: wrap;\n    justify-content: center;\n    gap: 10px;\n}\n.form-grid[data-v-64bf2f74] {\n    grid-template-columns: 1fr 1fr;\n    gap: 12px;\n}\n.assigned-members-grid.compact[data-v-64bf2f74] {\n    grid-template-columns: 1fr 1fr;\n    gap: 12px;\n}\n.info-grid[data-v-64bf2f74] {\n    grid-template-columns: 1fr 1fr;\n    gap: 8px;\n}\n}\n@media (max-width: 576px) {\n.coach-header-section[data-v-64bf2f74] {\n    padding: 12px;\n}\n.tab-icons[data-v-64bf2f74] {\n    justify-content: center;\n    gap: 8px;\n}\n.tab-icon-btn[data-v-64bf2f74] {\n    width: 36px;\n    height: 36px;\n}\n.form-grid[data-v-64bf2f74],\n  .settings-grid[data-v-64bf2f74],\n  .info-grid[data-v-64bf2f74] {\n    grid-template-columns: 1fr;\n    gap: 10px;\n}\n.assigned-members-grid.compact[data-v-64bf2f74] {\n    grid-template-columns: 1fr;\n    gap: 10px;\n}\n.profile-avatar[data-v-64bf2f74] {\n    width: 56px;\n    height: 56px;\n}\n.action-item[data-v-64bf2f74] {\n    padding: 8px;\n}\n}", ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-12.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12.use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-12.use[3]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/Staff/coachdetails.vue?vue&type=style&index=0&id=64bf2f74&lang=scss&scoped=true":
/*!*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-12.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12.use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-12.use[3]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/Staff/coachdetails.vue?vue&type=style&index=0&id=64bf2f74&lang=scss&scoped=true ***!
  \*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../../../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_clonedRuleSet_12_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_12_use_2_node_modules_sass_loader_dist_cjs_js_clonedRuleSet_12_use_3_node_modules_vue_loader_lib_index_js_vue_loader_options_coachdetails_vue_vue_type_style_index_0_id_64bf2f74_lang_scss_scoped_true__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !!../../../../../../node_modules/css-loader/dist/cjs.js??clonedRuleSet-12.use[1]!../../../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12.use[2]!../../../../../../node_modules/sass-loader/dist/cjs.js??clonedRuleSet-12.use[3]!../../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./coachdetails.vue?vue&type=style&index=0&id=64bf2f74&lang=scss&scoped=true */ "./node_modules/css-loader/dist/cjs.js??clonedRuleSet-12.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12.use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-12.use[3]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/Staff/coachdetails.vue?vue&type=style&index=0&id=64bf2f74&lang=scss&scoped=true");

            

var options = {};

options.insert = "head";
options.singleton = false;

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_clonedRuleSet_12_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_12_use_2_node_modules_sass_loader_dist_cjs_js_clonedRuleSet_12_use_3_node_modules_vue_loader_lib_index_js_vue_loader_options_coachdetails_vue_vue_type_style_index_0_id_64bf2f74_lang_scss_scoped_true__WEBPACK_IMPORTED_MODULE_1__["default"], options);



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_clonedRuleSet_12_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_12_use_2_node_modules_sass_loader_dist_cjs_js_clonedRuleSet_12_use_3_node_modules_vue_loader_lib_index_js_vue_loader_options_coachdetails_vue_vue_type_style_index_0_id_64bf2f74_lang_scss_scoped_true__WEBPACK_IMPORTED_MODULE_1__["default"].locals || {});

/***/ }),

/***/ "./resources/src/views/app/pages/Staff/coachdetails.vue":
/*!**************************************************************!*\
  !*** ./resources/src/views/app/pages/Staff/coachdetails.vue ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _coachdetails_vue_vue_type_template_id_64bf2f74_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./coachdetails.vue?vue&type=template&id=64bf2f74&scoped=true */ "./resources/src/views/app/pages/Staff/coachdetails.vue?vue&type=template&id=64bf2f74&scoped=true");
/* harmony import */ var _coachdetails_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./coachdetails.vue?vue&type=script&lang=js */ "./resources/src/views/app/pages/Staff/coachdetails.vue?vue&type=script&lang=js");
/* harmony import */ var _coachdetails_vue_vue_type_style_index_0_id_64bf2f74_lang_scss_scoped_true__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./coachdetails.vue?vue&type=style&index=0&id=64bf2f74&lang=scss&scoped=true */ "./resources/src/views/app/pages/Staff/coachdetails.vue?vue&type=style&index=0&id=64bf2f74&lang=scss&scoped=true");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");



;


/* normalize component */

var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _coachdetails_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__["default"],
  _coachdetails_vue_vue_type_template_id_64bf2f74_scoped_true__WEBPACK_IMPORTED_MODULE_0__.render,
  _coachdetails_vue_vue_type_template_id_64bf2f74_scoped_true__WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  "64bf2f74",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/src/views/app/pages/Staff/coachdetails.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./resources/src/views/app/pages/Staff/coachdetails.vue?vue&type=script&lang=js":
/*!**************************************************************************************!*\
  !*** ./resources/src/views/app/pages/Staff/coachdetails.vue?vue&type=script&lang=js ***!
  \**************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_coachdetails_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./coachdetails.vue?vue&type=script&lang=js */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/Staff/coachdetails.vue?vue&type=script&lang=js");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_coachdetails_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/src/views/app/pages/Staff/coachdetails.vue?vue&type=style&index=0&id=64bf2f74&lang=scss&scoped=true":
/*!***********************************************************************************************************************!*\
  !*** ./resources/src/views/app/pages/Staff/coachdetails.vue?vue&type=style&index=0&id=64bf2f74&lang=scss&scoped=true ***!
  \***********************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_dist_cjs_js_node_modules_css_loader_dist_cjs_js_clonedRuleSet_12_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_12_use_2_node_modules_sass_loader_dist_cjs_js_clonedRuleSet_12_use_3_node_modules_vue_loader_lib_index_js_vue_loader_options_coachdetails_vue_vue_type_style_index_0_id_64bf2f74_lang_scss_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/style-loader/dist/cjs.js!../../../../../../node_modules/css-loader/dist/cjs.js??clonedRuleSet-12.use[1]!../../../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12.use[2]!../../../../../../node_modules/sass-loader/dist/cjs.js??clonedRuleSet-12.use[3]!../../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./coachdetails.vue?vue&type=style&index=0&id=64bf2f74&lang=scss&scoped=true */ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-12.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12.use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-12.use[3]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/Staff/coachdetails.vue?vue&type=style&index=0&id=64bf2f74&lang=scss&scoped=true");


/***/ }),

/***/ "./resources/src/views/app/pages/Staff/coachdetails.vue?vue&type=template&id=64bf2f74&scoped=true":
/*!********************************************************************************************************!*\
  !*** ./resources/src/views/app/pages/Staff/coachdetails.vue?vue&type=template&id=64bf2f74&scoped=true ***!
  \********************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_coachdetails_vue_vue_type_template_id_64bf2f74_scoped_true__WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   staticRenderFns: () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_coachdetails_vue_vue_type_template_id_64bf2f74_scoped_true__WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_coachdetails_vue_vue_type_template_id_64bf2f74_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./coachdetails.vue?vue&type=template&id=64bf2f74&scoped=true */ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/Staff/coachdetails.vue?vue&type=template&id=64bf2f74&scoped=true");


/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/Staff/coachdetails.vue?vue&type=template&id=64bf2f74&scoped=true":
/*!***********************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/Staff/coachdetails.vue?vue&type=template&id=64bf2f74&scoped=true ***!
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
  return _c("div", { staticClass: "coach-form-container" }, [
    _c("div", { staticClass: "container-xxl px-2 px-sm-3 px-md-4" }, [
      _vm.isLoading
        ? _c("div", { staticClass: "loading-container" }, [_vm._m(0)])
        : _c("div", { staticClass: "form-card" }, [
            _c("div", { staticClass: "coach-header-section" }, [
              _c(
                "div",
                {
                  staticClass:
                    "header-wrapper d-flex flex-column flex-lg-row align-items-start align-items-lg-center justify-content-between gap-3",
                },
                [
                  _c(
                    "div",
                    { staticClass: "breadcrumb-section flex-shrink-0" },
                    [
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
                              staticClass:
                                "breadcrumb-container d-flex align-items-center",
                            },
                            [
                              _c(
                                "button",
                                {
                                  staticClass: "back-button me-2 me-sm-3",
                                  staticStyle: { color: "#dc3545" },
                                  attrs: {
                                    type: "button",
                                    title: "Go back to coaches list",
                                  },
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
                                      { attrs: { to: "/app/dashboard" } },
                                      [
                                        _c("i", { staticClass: "fas fa-home" }),
                                        _vm._v(
                                          "\n                                            Dashboard\n                                        "
                                        ),
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
                                    _c(
                                      "router-link",
                                      { attrs: { to: "/app/staff/coachlist" } },
                                      [
                                        _c("i", {
                                          staticClass: "fas fa-user-tie",
                                        }),
                                        _vm._v(
                                          "\n                                            Coaches\n                                        "
                                        ),
                                      ]
                                    ),
                                  ],
                                  1
                                ),
                                _vm._v(" "),
                                _c(
                                  "li",
                                  {
                                    staticClass: "breadcrumb-item active",
                                    staticStyle: { color: "white !important" },
                                    attrs: { "aria-current": "page" },
                                  },
                                  [
                                    _c("i", { staticClass: "fas fa-user" }),
                                    _vm._v(
                                      "\n                                        " +
                                        _vm._s(
                                          _vm.client.first_name &&
                                            _vm.client.last_name
                                            ? _vm.client.first_name +
                                                " " +
                                                _vm.client.last_name
                                            : "Coach Details"
                                        ) +
                                        "\n                                    "
                                    ),
                                  ]
                                ),
                              ]),
                            ]
                          ),
                        ]
                      ),
                    ]
                  ),
                  _vm._v(" "),
                  _c(
                    "div",
                    {
                      staticClass:
                        "header-content d-flex align-items-center gap-2 gap-lg-3",
                    },
                    [
                      _c("div", { staticClass: "divider d-none d-lg-block" }),
                      _vm._v(" "),
                      _c(
                        "div",
                        {
                          staticClass:
                            "tab-icons d-flex flex-wrap gap-2 justify-content-start",
                        },
                        [
                          _c(
                            "button",
                            {
                              staticClass: "tab-icon-btn",
                              class: { active: _vm.activeTab === "settings" },
                              attrs: { title: "Settings" },
                              on: {
                                click: function ($event) {
                                  _vm.activeTab = "settings"
                                },
                              },
                            },
                            [_c("i", { staticClass: "fas fa-cog" })]
                          ),
                        ]
                      ),
                    ]
                  ),
                ]
              ),
            ]),
            _vm._v(" "),
            _c("div", { staticClass: "coach-form" }, [
              _c("div", { staticClass: "main-layout" }, [
                _c("div", { staticClass: "profile-sidebar" }, [
                  _c(
                    "div",
                    {
                      staticStyle: { cursor: "pointer" },
                      on: {
                        click: function ($event) {
                          _vm.activeTab = "profile"
                        },
                      },
                    },
                    [
                      _vm._m(1),
                      _vm._v(" "),
                      _c("div", { staticClass: "profile-content" }, [
                        _c(
                          "div",
                          {
                            staticClass: "profile-image-container",
                            class: { editable: _vm.isEditing },
                            on: { click: _vm.handleProfileImageClick },
                          },
                          [
                            _c("img", {
                              staticClass: "profile-avatar",
                              attrs: {
                                src: _vm.getProfileImageUrl(
                                  _vm.profileImageUrl ||
                                    _vm.client.profile_image
                                ),
                                alt:
                                  _vm.client.first_name +
                                  " " +
                                  _vm.client.last_name,
                              },
                            }),
                            _vm._v(" "),
                            _vm.isEditing
                              ? _c("div", { staticClass: "profile-overlay" }, [
                                  _c("i", { staticClass: "fas fa-camera" }),
                                  _vm._v(" "),
                                  _c("span", [_vm._v("Change Photo")]),
                                ])
                              : _vm._e(),
                          ]
                        ),
                        _vm._v(" "),
                        _c("div", { staticClass: "profile-details" }, [
                          _c("h4", { staticClass: "coach-name" }, [
                            _vm._v(
                              "\n                                        " +
                                _vm._s(_vm.client.first_name) +
                                "\n                                        " +
                                _vm._s(_vm.client.last_name) +
                                "\n                                    "
                            ),
                          ]),
                          _vm._v(" "),
                          _c(
                            "p",
                            {
                              staticClass: "coach-id",
                              attrs: {
                                title:
                                  "This ID is automatically generated by the system",
                              },
                            },
                            [
                              _vm._v(
                                "\n                                        ID: " +
                                  _vm._s(_vm.getFormattedCoachId()) +
                                  "\n                                    "
                              ),
                            ]
                          ),
                        ]),
                      ]),
                    ]
                  ),
                  _vm._v(" "),
                  _c("div", { staticClass: "divider profile-divider" }),
                  _vm._v(" "),
                  _c("div", { staticClass: "action-items" }, [
                    _c(
                      "div",
                      {
                        staticClass: "action-item",
                        class: {
                          active: _vm.activeTab === "sendMessage",
                        },
                        on: {
                          click: function ($event) {
                            return _vm.goToChat()
                          },
                        },
                      },
                      [
                        _vm._m(2),
                        _vm._v(" "),
                        _c("span", { staticClass: "action-text" }, [
                          _vm._v("Send message"),
                        ]),
                      ]
                    ),
                    _vm._v(" "),
                    _c(
                      "div",
                      {
                        staticClass: "action-item",
                        class: {
                          active: _vm.activeTab === "newTask",
                        },
                        on: { click: _vm.openNewTask },
                      },
                      [
                        _vm._m(3),
                        _vm._v(" "),
                        _c("span", { staticClass: "action-text" }, [
                          _vm._v("New Task"),
                        ]),
                      ]
                    ),
                    _vm._v(" "),
                    _c(
                      "div",
                      {
                        staticClass: "action-item",
                        class: {
                          active: _vm.isEditing,
                          "has-unsaved-changes": _vm.hasUnsavedChanges,
                          "will-switch-tab":
                            _vm.activeTab !== "profile" && !_vm.isEditing,
                        },
                        on: { click: _vm.toggleEditMode },
                      },
                      [
                        _c("div", { staticClass: "action-icon" }, [
                          _c("i", {
                            class: _vm.isEditing
                              ? "fas fa-save"
                              : "fas fa-edit",
                          }),
                        ]),
                        _vm._v(" "),
                        _c("span", { staticClass: "action-text" }, [
                          _vm._v(
                            "\n                                    " +
                              _vm._s(
                                _vm.isEditing ? "Save Profile" : "Edit Details"
                              ) +
                              "\n                                "
                          ),
                        ]),
                        _vm._v(" "),
                        _vm.hasUnsavedChanges
                          ? _c(
                              "span",
                              {
                                staticClass: "unsaved-indicator",
                                attrs: { title: "You have unsaved changes" },
                              },
                              [_c("i", { staticClass: "fas fa-circle" })]
                            )
                          : _vm._e(),
                        _vm._v(" "),
                        _vm.activeTab !== "profile" && !_vm.isEditing
                          ? _c("span", {
                              attrs: { title: "Will switch to Profile tab" },
                            })
                          : _vm._e(),
                      ]
                    ),
                    _vm._v(" "),
                    _c(
                      "div",
                      {
                        staticClass: "action-item",
                        class: {
                          active: _vm.activeAction === "unsubscribe",
                        },
                        on: { click: _vm.unsubscribeCoach },
                      },
                      [
                        _vm._m(4),
                        _vm._v(" "),
                        _c("span", { staticClass: "action-text" }, [
                          _vm._v("Unsubscribe"),
                        ]),
                      ]
                    ),
                    _vm._v(" "),
                    _c(
                      "div",
                      {
                        staticClass: "action-item",
                        class: {
                          active: _vm.activeAction === "changeToStaff",
                        },
                        on: { click: _vm.convertCoachToMember },
                      },
                      [
                        _vm._m(5),
                        _vm._v(" "),
                        _c("span", { staticClass: "action-text" }, [
                          _vm._v("Change to member"),
                        ]),
                      ]
                    ),
                  ]),
                ]),
                _vm._v(" "),
                _c("div", { staticClass: "content-area" }, [
                  _c("div", { staticClass: "form-section compact" }, [
                    _c("div", { staticClass: "action-content" }, [
                      _c("div", { staticClass: "section-content" }, [
                        _c(
                          "div",
                          { staticClass: "tab-navigation" },
                          _vm._l(_vm.tabs, function (tab) {
                            return _c(
                              "div",
                              {
                                key: tab.key,
                                staticClass: "tab-item",
                                class: {
                                  active: _vm.activeTab === tab.key,
                                },
                                on: {
                                  click: function ($event) {
                                    _vm.activeTab = tab.key
                                  },
                                },
                              },
                              [
                                _c("i", { class: tab.icon }),
                                _vm._v(" "),
                                _c("span", [_vm._v(_vm._s(tab.label))]),
                              ]
                            )
                          }),
                          0
                        ),
                        _vm._v(" "),
                        _vm.activeTab === "profile"
                          ? _c("div", [
                              _c(
                                "div",
                                { staticClass: "member-form-content" },
                                [
                                  _c("div", { staticClass: "form-grid" }, [
                                    _c("div", { staticClass: "form-column" }, [
                                      _c(
                                        "div",
                                        { staticClass: "form-section compact" },
                                        [
                                          _vm._m(6),
                                          _vm._v(" "),
                                          _c(
                                            "div",
                                            {
                                              staticClass:
                                                "data-cards-container",
                                            },
                                            [
                                              _c(
                                                "div",
                                                { staticClass: "data-card" },
                                                [
                                                  _c(
                                                    "div",
                                                    {
                                                      staticClass: "data-label",
                                                    },
                                                    [_vm._v("Coach ID")]
                                                  ),
                                                  _vm._v(" "),
                                                  _c(
                                                    "div",
                                                    {
                                                      staticClass: "data-value",
                                                    },
                                                    [
                                                      _vm._v(
                                                        "\n                                                                        " +
                                                          _vm._s(
                                                            _vm.getFormattedCoachId()
                                                          ) +
                                                          "\n                                                                        "
                                                      ),
                                                      _c("i", {
                                                        staticClass:
                                                          "fas fa-info-circle info-icon",
                                                        attrs: {
                                                          title:
                                                            "This ID is automatically generated by the system",
                                                        },
                                                      }),
                                                    ]
                                                  ),
                                                ]
                                              ),
                                              _vm._v(" "),
                                              _c(
                                                "div",
                                                { staticClass: "data-card" },
                                                [
                                                  _c(
                                                    "div",
                                                    {
                                                      staticClass: "data-label",
                                                    },
                                                    [_vm._v("First name")]
                                                  ),
                                                  _vm._v(" "),
                                                  _c(
                                                    "div",
                                                    {
                                                      staticClass: "data-value",
                                                    },
                                                    [
                                                      _c("input", {
                                                        directives: [
                                                          {
                                                            name: "model",
                                                            rawName: "v-model",
                                                            value:
                                                              _vm.client
                                                                .first_name,
                                                            expression:
                                                              "client.first_name",
                                                          },
                                                        ],
                                                        staticClass:
                                                          "inline-edit",
                                                        class: {
                                                          readonly:
                                                            !_vm.isEditing,
                                                          "has-changes":
                                                            _vm.changesMade
                                                              .first_name,
                                                        },
                                                        attrs: {
                                                          type: "text",
                                                          readonly:
                                                            !_vm.isEditing,
                                                        },
                                                        domProps: {
                                                          value:
                                                            _vm.client
                                                              .first_name,
                                                        },
                                                        on: {
                                                          input: [
                                                            function ($event) {
                                                              if (
                                                                $event.target
                                                                  .composing
                                                              ) {
                                                                return
                                                              }
                                                              _vm.$set(
                                                                _vm.client,
                                                                "first_name",
                                                                $event.target
                                                                  .value
                                                              )
                                                            },
                                                            function ($event) {
                                                              return _vm.trackChange(
                                                                "first_name",
                                                                $event.target
                                                                  .value
                                                              )
                                                            },
                                                          ],
                                                          focus: function (
                                                            $event
                                                          ) {
                                                            return _vm.trackFieldTouch(
                                                              "first_name"
                                                            )
                                                          },
                                                          blur: function (
                                                            $event
                                                          ) {
                                                            return _vm.trackFieldTouch(
                                                              "first_name"
                                                            )
                                                          },
                                                        },
                                                      }),
                                                      _vm._v(" "),
                                                      _vm.changesMade.first_name
                                                        ? _c(
                                                            "span",
                                                            {
                                                              staticClass:
                                                                "change-indicator",
                                                              attrs: {
                                                                title:
                                                                  "This field has been modified",
                                                              },
                                                            },
                                                            [
                                                              _c("i", {
                                                                staticClass:
                                                                  "fas fa-edit",
                                                              }),
                                                            ]
                                                          )
                                                        : _vm._e(),
                                                    ]
                                                  ),
                                                ]
                                              ),
                                              _vm._v(" "),
                                              _c(
                                                "div",
                                                { staticClass: "data-card" },
                                                [
                                                  _c(
                                                    "div",
                                                    {
                                                      staticClass: "data-label",
                                                    },
                                                    [_vm._v("Last name")]
                                                  ),
                                                  _vm._v(" "),
                                                  _c(
                                                    "div",
                                                    {
                                                      staticClass: "data-value",
                                                    },
                                                    [
                                                      _c("input", {
                                                        directives: [
                                                          {
                                                            name: "model",
                                                            rawName: "v-model",
                                                            value:
                                                              _vm.client
                                                                .last_name,
                                                            expression:
                                                              "client.last_name",
                                                          },
                                                        ],
                                                        staticClass:
                                                          "inline-edit",
                                                        class: {
                                                          readonly:
                                                            !_vm.isEditing,
                                                          "has-changes":
                                                            _vm.changesMade
                                                              .last_name,
                                                        },
                                                        attrs: {
                                                          type: "text",
                                                          readonly:
                                                            !_vm.isEditing,
                                                        },
                                                        domProps: {
                                                          value:
                                                            _vm.client
                                                              .last_name,
                                                        },
                                                        on: {
                                                          input: [
                                                            function ($event) {
                                                              if (
                                                                $event.target
                                                                  .composing
                                                              ) {
                                                                return
                                                              }
                                                              _vm.$set(
                                                                _vm.client,
                                                                "last_name",
                                                                $event.target
                                                                  .value
                                                              )
                                                            },
                                                            function ($event) {
                                                              return _vm.trackChange(
                                                                "last_name",
                                                                $event.target
                                                                  .value
                                                              )
                                                            },
                                                          ],
                                                          focus: function (
                                                            $event
                                                          ) {
                                                            return _vm.trackFieldTouch(
                                                              "last_name"
                                                            )
                                                          },
                                                          blur: function (
                                                            $event
                                                          ) {
                                                            return _vm.trackFieldTouch(
                                                              "last_name"
                                                            )
                                                          },
                                                        },
                                                      }),
                                                      _vm._v(" "),
                                                      _vm.changesMade.last_name
                                                        ? _c(
                                                            "span",
                                                            {
                                                              staticClass:
                                                                "change-indicator",
                                                              attrs: {
                                                                title:
                                                                  "This field has been modified",
                                                              },
                                                            },
                                                            [
                                                              _c("i", {
                                                                staticClass:
                                                                  "fas fa-edit",
                                                              }),
                                                            ]
                                                          )
                                                        : _vm._e(),
                                                    ]
                                                  ),
                                                ]
                                              ),
                                              _vm._v(" "),
                                              _c(
                                                "div",
                                                { staticClass: "data-card" },
                                                [
                                                  _c(
                                                    "div",
                                                    {
                                                      staticClass: "data-label",
                                                    },
                                                    [_vm._v("Sex")]
                                                  ),
                                                  _vm._v(" "),
                                                  _c(
                                                    "div",
                                                    {
                                                      staticClass: "data-value",
                                                    },
                                                    [
                                                      _c(
                                                        "select",
                                                        {
                                                          directives: [
                                                            {
                                                              name: "model",
                                                              rawName:
                                                                "v-model",
                                                              value:
                                                                _vm.client
                                                                  .gender,
                                                              expression:
                                                                "client.gender",
                                                            },
                                                          ],
                                                          staticClass:
                                                            "inline-edit",
                                                          attrs: {
                                                            disabled:
                                                              !_vm.isEditing,
                                                          },
                                                          on: {
                                                            change: [
                                                              function (
                                                                $event
                                                              ) {
                                                                var $$selectedVal =
                                                                  Array.prototype.filter
                                                                    .call(
                                                                      $event
                                                                        .target
                                                                        .options,
                                                                      function (
                                                                        o
                                                                      ) {
                                                                        return o.selected
                                                                      }
                                                                    )
                                                                    .map(
                                                                      function (
                                                                        o
                                                                      ) {
                                                                        var val =
                                                                          "_value" in
                                                                          o
                                                                            ? o._value
                                                                            : o.value
                                                                        return val
                                                                      }
                                                                    )
                                                                _vm.$set(
                                                                  _vm.client,
                                                                  "gender",
                                                                  $event.target
                                                                    .multiple
                                                                    ? $$selectedVal
                                                                    : $$selectedVal[0]
                                                                )
                                                              },
                                                              function (
                                                                $event
                                                              ) {
                                                                return _vm.trackChange(
                                                                  "gender",
                                                                  $event.target
                                                                    .value
                                                                )
                                                              },
                                                            ],
                                                            focus: function (
                                                              $event
                                                            ) {
                                                              return _vm.trackFieldTouch(
                                                                "gender"
                                                              )
                                                            },
                                                            blur: function (
                                                              $event
                                                            ) {
                                                              return _vm.trackFieldTouch(
                                                                "gender"
                                                              )
                                                            },
                                                          },
                                                        },
                                                        [
                                                          _c(
                                                            "option",
                                                            {
                                                              attrs: {
                                                                value: "",
                                                              },
                                                            },
                                                            [
                                                              _vm._v(
                                                                "Select Gender"
                                                              ),
                                                            ]
                                                          ),
                                                          _vm._v(" "),
                                                          _c(
                                                            "option",
                                                            {
                                                              attrs: {
                                                                value: "Male",
                                                              },
                                                            },
                                                            [_vm._v("Male")]
                                                          ),
                                                          _vm._v(" "),
                                                          _c(
                                                            "option",
                                                            {
                                                              attrs: {
                                                                value: "Female",
                                                              },
                                                            },
                                                            [_vm._v("Female")]
                                                          ),
                                                          _vm._v(" "),
                                                          _c(
                                                            "option",
                                                            {
                                                              attrs: {
                                                                value: "Other",
                                                              },
                                                            },
                                                            [_vm._v("Other")]
                                                          ),
                                                        ]
                                                      ),
                                                    ]
                                                  ),
                                                ]
                                              ),
                                              _vm._v(" "),
                                              _c(
                                                "div",
                                                { staticClass: "data-card" },
                                                [
                                                  _c(
                                                    "div",
                                                    {
                                                      staticClass: "data-label",
                                                    },
                                                    [_vm._v("Birthday")]
                                                  ),
                                                  _vm._v(" "),
                                                  _c(
                                                    "div",
                                                    {
                                                      staticClass: "data-value",
                                                    },
                                                    [
                                                      _c("input", {
                                                        directives: [
                                                          {
                                                            name: "model",
                                                            rawName: "v-model",
                                                            value:
                                                              _vm.client.dob,
                                                            expression:
                                                              "client.dob",
                                                          },
                                                        ],
                                                        staticClass:
                                                          "inline-edit",
                                                        class: {
                                                          readonly:
                                                            !_vm.isEditing,
                                                          "has-changes":
                                                            _vm.changesMade.dob,
                                                        },
                                                        attrs: {
                                                          type: "date",
                                                          readonly:
                                                            !_vm.isEditing,
                                                        },
                                                        domProps: {
                                                          value: _vm.client.dob,
                                                        },
                                                        on: {
                                                          input: [
                                                            function ($event) {
                                                              if (
                                                                $event.target
                                                                  .composing
                                                              ) {
                                                                return
                                                              }
                                                              _vm.$set(
                                                                _vm.client,
                                                                "dob",
                                                                $event.target
                                                                  .value
                                                              )
                                                            },
                                                            function ($event) {
                                                              return _vm.trackChange(
                                                                "dob",
                                                                $event.target
                                                                  .value
                                                              )
                                                            },
                                                          ],
                                                          focus: function (
                                                            $event
                                                          ) {
                                                            return _vm.trackFieldTouch(
                                                              "dob"
                                                            )
                                                          },
                                                          blur: function (
                                                            $event
                                                          ) {
                                                            return _vm.trackFieldTouch(
                                                              "dob"
                                                            )
                                                          },
                                                        },
                                                      }),
                                                    ]
                                                  ),
                                                ]
                                              ),
                                              _vm._v(" "),
                                              _c(
                                                "div",
                                                { staticClass: "data-card" },
                                                [
                                                  _c(
                                                    "div",
                                                    {
                                                      staticClass: "data-label",
                                                    },
                                                    [_vm._v("Email address")]
                                                  ),
                                                  _vm._v(" "),
                                                  _c(
                                                    "div",
                                                    {
                                                      staticClass: "data-value",
                                                    },
                                                    [
                                                      _c("input", {
                                                        directives: [
                                                          {
                                                            name: "model",
                                                            rawName: "v-model",
                                                            value:
                                                              _vm.client.email,
                                                            expression:
                                                              "client.email",
                                                          },
                                                        ],
                                                        staticClass:
                                                          "inline-edit",
                                                        class: {
                                                          readonly:
                                                            !_vm.isEditing,
                                                          "has-changes":
                                                            _vm.changesMade
                                                              .email,
                                                        },
                                                        attrs: {
                                                          type: "email",
                                                          readonly:
                                                            !_vm.isEditing,
                                                        },
                                                        domProps: {
                                                          value:
                                                            _vm.client.email,
                                                        },
                                                        on: {
                                                          input: [
                                                            function ($event) {
                                                              if (
                                                                $event.target
                                                                  .composing
                                                              ) {
                                                                return
                                                              }
                                                              _vm.$set(
                                                                _vm.client,
                                                                "email",
                                                                $event.target
                                                                  .value
                                                              )
                                                            },
                                                            function ($event) {
                                                              return _vm.trackChange(
                                                                "email",
                                                                $event.target
                                                                  .value
                                                              )
                                                            },
                                                          ],
                                                          focus: function (
                                                            $event
                                                          ) {
                                                            return _vm.trackFieldTouch(
                                                              "email"
                                                            )
                                                          },
                                                          blur: function (
                                                            $event
                                                          ) {
                                                            return _vm.trackFieldTouch(
                                                              "email"
                                                            )
                                                          },
                                                        },
                                                      }),
                                                      _vm._v(" "),
                                                      _vm.changesMade.email
                                                        ? _c(
                                                            "span",
                                                            {
                                                              staticClass:
                                                                "change-indicator",
                                                              attrs: {
                                                                title:
                                                                  "This field has been modified",
                                                              },
                                                            },
                                                            [
                                                              _c("i", {
                                                                staticClass:
                                                                  "fas fa-edit",
                                                              }),
                                                            ]
                                                          )
                                                        : _vm._e(),
                                                      _vm._v(" "),
                                                      _c("i", {
                                                        staticClass:
                                                          "fas fa-info-circle info-icon",
                                                        attrs: {
                                                          title:
                                                            "Email address for communication",
                                                        },
                                                      }),
                                                    ]
                                                  ),
                                                ]
                                              ),
                                              _vm._v(" "),
                                              _c(
                                                "div",
                                                { staticClass: "data-card" },
                                                [
                                                  _c(
                                                    "div",
                                                    {
                                                      staticClass: "data-label",
                                                    },
                                                    [_vm._v("Landline number")]
                                                  ),
                                                  _vm._v(" "),
                                                  _c(
                                                    "div",
                                                    {
                                                      staticClass: "data-value",
                                                    },
                                                    [
                                                      _c("input", {
                                                        directives: [
                                                          {
                                                            name: "model",
                                                            rawName: "v-model",
                                                            value:
                                                              _vm.client
                                                                .landline_phone,
                                                            expression:
                                                              "client.landline_phone",
                                                          },
                                                        ],
                                                        staticClass:
                                                          "inline-edit",
                                                        class: {
                                                          readonly:
                                                            !_vm.isEditing,
                                                          "has-changes":
                                                            _vm.changesMade
                                                              .landline_phone,
                                                        },
                                                        attrs: {
                                                          type: "tel",
                                                          readonly:
                                                            !_vm.isEditing,
                                                          placeholder: "-",
                                                        },
                                                        domProps: {
                                                          value:
                                                            _vm.client
                                                              .landline_phone,
                                                        },
                                                        on: {
                                                          input: [
                                                            function ($event) {
                                                              if (
                                                                $event.target
                                                                  .composing
                                                              ) {
                                                                return
                                                              }
                                                              _vm.$set(
                                                                _vm.client,
                                                                "landline_phone",
                                                                $event.target
                                                                  .value
                                                              )
                                                            },
                                                            function ($event) {
                                                              return _vm.trackChange(
                                                                "landline_phone",
                                                                $event.target
                                                                  .value
                                                              )
                                                            },
                                                          ],
                                                          focus: function (
                                                            $event
                                                          ) {
                                                            return _vm.trackFieldTouch(
                                                              "landline_phone"
                                                            )
                                                          },
                                                          blur: function (
                                                            $event
                                                          ) {
                                                            return _vm.trackFieldTouch(
                                                              "landline_phone"
                                                            )
                                                          },
                                                        },
                                                      }),
                                                    ]
                                                  ),
                                                ]
                                              ),
                                              _vm._v(" "),
                                              _c(
                                                "div",
                                                { staticClass: "data-card" },
                                                [
                                                  _c(
                                                    "div",
                                                    {
                                                      staticClass: "data-label",
                                                    },
                                                    [_vm._v("Mobile phone")]
                                                  ),
                                                  _vm._v(" "),
                                                  _c(
                                                    "div",
                                                    {
                                                      staticClass: "data-value",
                                                    },
                                                    [
                                                      _c("input", {
                                                        directives: [
                                                          {
                                                            name: "model",
                                                            rawName: "v-model",
                                                            value:
                                                              _vm.client
                                                                .mobile_phone,
                                                            expression:
                                                              "client.mobile_phone",
                                                          },
                                                        ],
                                                        staticClass:
                                                          "inline-edit",
                                                        class: {
                                                          readonly:
                                                            !_vm.isEditing,
                                                          "has-changes":
                                                            _vm.changesMade
                                                              .mobile_phone,
                                                        },
                                                        attrs: {
                                                          type: "tel",
                                                          readonly:
                                                            !_vm.isEditing,
                                                        },
                                                        domProps: {
                                                          value:
                                                            _vm.client
                                                              .mobile_phone,
                                                        },
                                                        on: {
                                                          input: [
                                                            function ($event) {
                                                              if (
                                                                $event.target
                                                                  .composing
                                                              ) {
                                                                return
                                                              }
                                                              _vm.$set(
                                                                _vm.client,
                                                                "mobile_phone",
                                                                $event.target
                                                                  .value
                                                              )
                                                            },
                                                            function ($event) {
                                                              return _vm.trackChange(
                                                                "mobile_phone",
                                                                $event.target
                                                                  .value
                                                              )
                                                            },
                                                          ],
                                                          focus: function (
                                                            $event
                                                          ) {
                                                            return _vm.trackFieldTouch(
                                                              "mobile_phone"
                                                            )
                                                          },
                                                          blur: function (
                                                            $event
                                                          ) {
                                                            return _vm.trackFieldTouch(
                                                              "mobile_phone"
                                                            )
                                                          },
                                                        },
                                                      }),
                                                    ]
                                                  ),
                                                ]
                                              ),
                                              _vm._v(" "),
                                              _c(
                                                "div",
                                                { staticClass: "data-card" },
                                                [
                                                  _c(
                                                    "div",
                                                    {
                                                      staticClass: "data-label",
                                                    },
                                                    [_vm._v("Coach since")]
                                                  ),
                                                  _vm._v(" "),
                                                  _c(
                                                    "div",
                                                    {
                                                      staticClass: "data-value",
                                                    },
                                                    [
                                                      _vm._v(
                                                        "\n                                                                        " +
                                                          _vm._s(
                                                            _vm.formatCoachSinceDate(
                                                              _vm.client
                                                                .created_at
                                                            )
                                                          ) +
                                                          "\n                                                                "
                                                      ),
                                                    ]
                                                  ),
                                                ]
                                              ),
                                              _vm._v(" "),
                                              _c(
                                                "div",
                                                { staticClass: "data-card" },
                                                [
                                                  _c(
                                                    "div",
                                                    {
                                                      staticClass: "data-label",
                                                    },
                                                    [_vm._v("Coach profile")]
                                                  ),
                                                  _vm._v(" "),
                                                  _c(
                                                    "div",
                                                    {
                                                      staticClass: "data-value",
                                                    },
                                                    [
                                                      _vm._v(
                                                        "\n                                                                        " +
                                                          _vm._s(
                                                            _vm.client
                                                              .first_name
                                                          ) +
                                                          " " +
                                                          _vm._s(
                                                            _vm.client.last_name
                                                          ) +
                                                          " (" +
                                                          _vm._s(
                                                            _vm.client.email
                                                          ) +
                                                          ")\n                                                                        "
                                                      ),
                                                      _c("i", {
                                                        staticClass:
                                                          "fas fa-external-link-alt edit-icon",
                                                      }),
                                                      _vm._v(" "),
                                                      _c("i", {
                                                        staticClass:
                                                          "fas fa-info-circle info-icon",
                                                        attrs: {
                                                          title:
                                                            "User profile information",
                                                        },
                                                      }),
                                                    ]
                                                  ),
                                                ]
                                              ),
                                            ]
                                          ),
                                        ]
                                      ),
                                      _vm._v(" "),
                                      _c(
                                        "div",
                                        { staticClass: "form-section compact" },
                                        [
                                          _vm._m(7),
                                          _vm._v(" "),
                                          _c(
                                            "div",
                                            {
                                              staticClass:
                                                "data-cards-container",
                                            },
                                            [
                                              _c(
                                                "div",
                                                { staticClass: "data-card" },
                                                [
                                                  _c(
                                                    "div",
                                                    {
                                                      staticClass: "data-label",
                                                    },
                                                    [_vm._v("Address")]
                                                  ),
                                                  _vm._v(" "),
                                                  _c(
                                                    "div",
                                                    {
                                                      staticClass: "data-value",
                                                    },
                                                    [
                                                      _c("input", {
                                                        directives: [
                                                          {
                                                            name: "model",
                                                            rawName: "v-model",
                                                            value:
                                                              _vm.client
                                                                .address,
                                                            expression:
                                                              "client.address",
                                                          },
                                                        ],
                                                        staticClass:
                                                          "inline-edit",
                                                        class: {
                                                          readonly:
                                                            !_vm.isEditing,
                                                        },
                                                        attrs: {
                                                          type: "text",
                                                          placeholder:
                                                            "Address",
                                                          readonly:
                                                            !_vm.isEditing,
                                                        },
                                                        domProps: {
                                                          value:
                                                            _vm.client.address,
                                                        },
                                                        on: {
                                                          input: function (
                                                            $event
                                                          ) {
                                                            if (
                                                              $event.target
                                                                .composing
                                                            ) {
                                                              return
                                                            }
                                                            _vm.$set(
                                                              _vm.client,
                                                              "address",
                                                              $event.target
                                                                .value
                                                            )
                                                          },
                                                        },
                                                      }),
                                                    ]
                                                  ),
                                                ]
                                              ),
                                              _vm._v(" "),
                                              _c(
                                                "div",
                                                { staticClass: "data-card" },
                                                [
                                                  _c(
                                                    "div",
                                                    {
                                                      staticClass: "data-label",
                                                    },
                                                    [_vm._v("City")]
                                                  ),
                                                  _vm._v(" "),
                                                  _c(
                                                    "div",
                                                    {
                                                      staticClass: "data-value",
                                                    },
                                                    [
                                                      _c("input", {
                                                        directives: [
                                                          {
                                                            name: "model",
                                                            rawName: "v-model",
                                                            value:
                                                              _vm.client.city,
                                                            expression:
                                                              "client.city",
                                                          },
                                                        ],
                                                        staticClass:
                                                          "inline-edit",
                                                        class: {
                                                          readonly:
                                                            !_vm.isEditing,
                                                        },
                                                        attrs: {
                                                          type: "text",
                                                          placeholder: "City",
                                                          readonly:
                                                            !_vm.isEditing,
                                                        },
                                                        domProps: {
                                                          value:
                                                            _vm.client.city,
                                                        },
                                                        on: {
                                                          input: function (
                                                            $event
                                                          ) {
                                                            if (
                                                              $event.target
                                                                .composing
                                                            ) {
                                                              return
                                                            }
                                                            _vm.$set(
                                                              _vm.client,
                                                              "city",
                                                              $event.target
                                                                .value
                                                            )
                                                          },
                                                        },
                                                      }),
                                                    ]
                                                  ),
                                                ]
                                              ),
                                              _vm._v(" "),
                                              _c(
                                                "div",
                                                { staticClass: "data-card" },
                                                [
                                                  _c(
                                                    "div",
                                                    {
                                                      staticClass: "data-label",
                                                    },
                                                    [_vm._v("State")]
                                                  ),
                                                  _vm._v(" "),
                                                  _c(
                                                    "div",
                                                    {
                                                      staticClass: "data-value",
                                                    },
                                                    [
                                                      _c("input", {
                                                        directives: [
                                                          {
                                                            name: "model",
                                                            rawName: "v-model",
                                                            value:
                                                              _vm.client.state,
                                                            expression:
                                                              "client.state",
                                                          },
                                                        ],
                                                        staticClass:
                                                          "inline-edit",
                                                        class: {
                                                          readonly:
                                                            !_vm.isEditing,
                                                        },
                                                        attrs: {
                                                          type: "text",
                                                          placeholder: "State",
                                                          readonly:
                                                            !_vm.isEditing,
                                                        },
                                                        domProps: {
                                                          value:
                                                            _vm.client.state,
                                                        },
                                                        on: {
                                                          input: function (
                                                            $event
                                                          ) {
                                                            if (
                                                              $event.target
                                                                .composing
                                                            ) {
                                                              return
                                                            }
                                                            _vm.$set(
                                                              _vm.client,
                                                              "state",
                                                              $event.target
                                                                .value
                                                            )
                                                          },
                                                        },
                                                      }),
                                                    ]
                                                  ),
                                                ]
                                              ),
                                              _vm._v(" "),
                                              _c(
                                                "div",
                                                { staticClass: "data-card" },
                                                [
                                                  _c(
                                                    "div",
                                                    {
                                                      staticClass: "data-label",
                                                    },
                                                    [_vm._v("ZIP Code")]
                                                  ),
                                                  _vm._v(" "),
                                                  _c(
                                                    "div",
                                                    {
                                                      staticClass: "data-value",
                                                    },
                                                    [
                                                      _c("input", {
                                                        directives: [
                                                          {
                                                            name: "model",
                                                            rawName: "v-model",
                                                            value:
                                                              _vm.client.zip,
                                                            expression:
                                                              "client.zip",
                                                          },
                                                        ],
                                                        staticClass:
                                                          "inline-edit",
                                                        class: {
                                                          readonly:
                                                            !_vm.isEditing,
                                                        },
                                                        attrs: {
                                                          type: "text",
                                                          placeholder:
                                                            "ZIP Code",
                                                          readonly:
                                                            !_vm.isEditing,
                                                        },
                                                        domProps: {
                                                          value: _vm.client.zip,
                                                        },
                                                        on: {
                                                          input: function (
                                                            $event
                                                          ) {
                                                            if (
                                                              $event.target
                                                                .composing
                                                            ) {
                                                              return
                                                            }
                                                            _vm.$set(
                                                              _vm.client,
                                                              "zip",
                                                              $event.target
                                                                .value
                                                            )
                                                          },
                                                        },
                                                      }),
                                                    ]
                                                  ),
                                                ]
                                              ),
                                            ]
                                          ),
                                        ]
                                      ),
                                      _vm._v(" "),
                                      _vm._m(8),
                                      _vm._v(" "),
                                      _c(
                                        "div",
                                        { staticClass: "form-section compact" },
                                        [
                                          _vm._m(9),
                                          _vm._v(" "),
                                          _c(
                                            "div",
                                            {
                                              staticClass:
                                                "data-cards-container",
                                            },
                                            [
                                              _c(
                                                "div",
                                                { staticClass: "data-card" },
                                                [
                                                  _c(
                                                    "div",
                                                    {
                                                      staticClass: "data-label",
                                                    },
                                                    [
                                                      _vm._v(
                                                        "Bank account number"
                                                      ),
                                                    ]
                                                  ),
                                                  _vm._v(" "),
                                                  _c(
                                                    "div",
                                                    {
                                                      staticClass: "data-value",
                                                    },
                                                    [
                                                      _c("input", {
                                                        directives: [
                                                          {
                                                            name: "model",
                                                            rawName: "v-model",
                                                            value:
                                                              _vm.client
                                                                .bank_account_number,
                                                            expression:
                                                              "client.bank_account_number",
                                                          },
                                                        ],
                                                        staticClass:
                                                          "inline-edit",
                                                        class: {
                                                          readonly:
                                                            !_vm.isEditing,
                                                          "has-changes":
                                                            _vm.changesMade
                                                              .bank_account_number,
                                                        },
                                                        attrs: {
                                                          type: "text",
                                                          placeholder:
                                                            "Bank account number",
                                                          readonly:
                                                            !_vm.isEditing,
                                                        },
                                                        domProps: {
                                                          value:
                                                            _vm.client
                                                              .bank_account_number,
                                                        },
                                                        on: {
                                                          input: [
                                                            function ($event) {
                                                              if (
                                                                $event.target
                                                                  .composing
                                                              ) {
                                                                return
                                                              }
                                                              _vm.$set(
                                                                _vm.client,
                                                                "bank_account_number",
                                                                $event.target
                                                                  .value
                                                              )
                                                            },
                                                            function ($event) {
                                                              return _vm.trackChange(
                                                                "bank_account_number",
                                                                $event.target
                                                                  .value
                                                              )
                                                            },
                                                          ],
                                                          focus: function (
                                                            $event
                                                          ) {
                                                            return _vm.trackFieldTouch(
                                                              "bank_account_number"
                                                            )
                                                          },
                                                          blur: function (
                                                            $event
                                                          ) {
                                                            return _vm.trackFieldTouch(
                                                              "bank_account_number"
                                                            )
                                                          },
                                                        },
                                                      }),
                                                    ]
                                                  ),
                                                ]
                                              ),
                                              _vm._v(" "),
                                              _c(
                                                "div",
                                                { staticClass: "data-card" },
                                                [
                                                  _c(
                                                    "div",
                                                    {
                                                      staticClass: "data-label",
                                                    },
                                                    [_vm._v("Routing number")]
                                                  ),
                                                  _vm._v(" "),
                                                  _c(
                                                    "div",
                                                    {
                                                      staticClass: "data-value",
                                                    },
                                                    [
                                                      _c("input", {
                                                        directives: [
                                                          {
                                                            name: "model",
                                                            rawName: "v-model",
                                                            value:
                                                              _vm.client
                                                                .routing_number,
                                                            expression:
                                                              "client.routing_number",
                                                          },
                                                        ],
                                                        staticClass:
                                                          "inline-edit",
                                                        class: {
                                                          readonly:
                                                            !_vm.isEditing,
                                                          "has-changes":
                                                            _vm.changesMade
                                                              .routing_number,
                                                        },
                                                        attrs: {
                                                          type: "text",
                                                          placeholder:
                                                            "Routing number",
                                                          readonly:
                                                            !_vm.isEditing,
                                                        },
                                                        domProps: {
                                                          value:
                                                            _vm.client
                                                              .routing_number,
                                                        },
                                                        on: {
                                                          input: [
                                                            function ($event) {
                                                              if (
                                                                $event.target
                                                                  .composing
                                                              ) {
                                                                return
                                                              }
                                                              _vm.$set(
                                                                _vm.client,
                                                                "routing_number",
                                                                $event.target
                                                                  .value
                                                              )
                                                            },
                                                            function ($event) {
                                                              return _vm.trackChange(
                                                                "routing_number",
                                                                $event.target
                                                                  .value
                                                              )
                                                            },
                                                          ],
                                                          focus: function (
                                                            $event
                                                          ) {
                                                            return _vm.trackFieldTouch(
                                                              "routing_number"
                                                            )
                                                          },
                                                          blur: function (
                                                            $event
                                                          ) {
                                                            return _vm.trackFieldTouch(
                                                              "routing_number"
                                                            )
                                                          },
                                                        },
                                                      }),
                                                    ]
                                                  ),
                                                ]
                                              ),
                                              _vm._v(" "),
                                              _c(
                                                "div",
                                                { staticClass: "data-card" },
                                                [
                                                  _c(
                                                    "div",
                                                    {
                                                      staticClass: "data-label",
                                                    },
                                                    [
                                                      _vm._v(
                                                        "Bank account type"
                                                      ),
                                                    ]
                                                  ),
                                                  _vm._v(" "),
                                                  _c(
                                                    "div",
                                                    {
                                                      staticClass: "data-value",
                                                    },
                                                    [
                                                      _c(
                                                        "select",
                                                        {
                                                          directives: [
                                                            {
                                                              name: "model",
                                                              rawName:
                                                                "v-model",
                                                              value:
                                                                _vm.client
                                                                  .bank_account_type,
                                                              expression:
                                                                "client.bank_account_type",
                                                            },
                                                          ],
                                                          staticClass:
                                                            "inline-edit",
                                                          class: {
                                                            readonly:
                                                              !_vm.isEditing,
                                                            "has-changes":
                                                              _vm.changesMade
                                                                .bank_account_type,
                                                          },
                                                          attrs: {
                                                            disabled:
                                                              !_vm.isEditing,
                                                          },
                                                          on: {
                                                            change: [
                                                              function (
                                                                $event
                                                              ) {
                                                                var $$selectedVal =
                                                                  Array.prototype.filter
                                                                    .call(
                                                                      $event
                                                                        .target
                                                                        .options,
                                                                      function (
                                                                        o
                                                                      ) {
                                                                        return o.selected
                                                                      }
                                                                    )
                                                                    .map(
                                                                      function (
                                                                        o
                                                                      ) {
                                                                        var val =
                                                                          "_value" in
                                                                          o
                                                                            ? o._value
                                                                            : o.value
                                                                        return val
                                                                      }
                                                                    )
                                                                _vm.$set(
                                                                  _vm.client,
                                                                  "bank_account_type",
                                                                  $event.target
                                                                    .multiple
                                                                    ? $$selectedVal
                                                                    : $$selectedVal[0]
                                                                )
                                                              },
                                                              function (
                                                                $event
                                                              ) {
                                                                return _vm.trackChange(
                                                                  "bank_account_type",
                                                                  $event.target
                                                                    .value
                                                                )
                                                              },
                                                            ],
                                                            focus: function (
                                                              $event
                                                            ) {
                                                              return _vm.trackFieldTouch(
                                                                "bank_account_type"
                                                              )
                                                            },
                                                            blur: function (
                                                              $event
                                                            ) {
                                                              return _vm.trackFieldTouch(
                                                                "bank_account_type"
                                                              )
                                                            },
                                                          },
                                                        },
                                                        [
                                                          _c(
                                                            "option",
                                                            {
                                                              attrs: {
                                                                value: "",
                                                              },
                                                            },
                                                            [
                                                              _vm._v(
                                                                "Select Account Type"
                                                              ),
                                                            ]
                                                          ),
                                                          _vm._v(" "),
                                                          _c(
                                                            "option",
                                                            {
                                                              attrs: {
                                                                value:
                                                                  "Checking",
                                                              },
                                                            },
                                                            [_vm._v("Checking")]
                                                          ),
                                                          _vm._v(" "),
                                                          _c(
                                                            "option",
                                                            {
                                                              attrs: {
                                                                value:
                                                                  "Savings",
                                                              },
                                                            },
                                                            [_vm._v("Savings")]
                                                          ),
                                                          _vm._v(" "),
                                                          _c(
                                                            "option",
                                                            {
                                                              attrs: {
                                                                value:
                                                                  "Business",
                                                              },
                                                            },
                                                            [_vm._v("Business")]
                                                          ),
                                                          _vm._v(" "),
                                                          _c(
                                                            "option",
                                                            {
                                                              attrs: {
                                                                value:
                                                                  "Corporate",
                                                              },
                                                            },
                                                            [
                                                              _vm._v(
                                                                "Corporate"
                                                              ),
                                                            ]
                                                          ),
                                                          _vm._v(" "),
                                                          _c(
                                                            "option",
                                                            {
                                                              attrs: {
                                                                value:
                                                                  "Current",
                                                              },
                                                            },
                                                            [_vm._v("Current")]
                                                          ),
                                                          _vm._v(" "),
                                                          _c(
                                                            "option",
                                                            {
                                                              attrs: {
                                                                value:
                                                                  "Deposit",
                                                              },
                                                            },
                                                            [_vm._v("Deposit")]
                                                          ),
                                                          _vm._v(" "),
                                                          _c(
                                                            "option",
                                                            {
                                                              attrs: {
                                                                value: "Loan",
                                                              },
                                                            },
                                                            [_vm._v("Loan")]
                                                          ),
                                                          _vm._v(" "),
                                                          _c(
                                                            "option",
                                                            {
                                                              attrs: {
                                                                value: "Other",
                                                              },
                                                            },
                                                            [_vm._v("Other")]
                                                          ),
                                                        ]
                                                      ),
                                                    ]
                                                  ),
                                                ]
                                              ),
                                              _vm._v(" "),
                                              _c(
                                                "div",
                                                { staticClass: "data-card" },
                                                [
                                                  _c(
                                                    "div",
                                                    {
                                                      staticClass: "data-label",
                                                    },
                                                    [
                                                      _vm._v(
                                                        "Bank account holder name"
                                                      ),
                                                    ]
                                                  ),
                                                  _vm._v(" "),
                                                  _c(
                                                    "div",
                                                    {
                                                      staticClass: "data-value",
                                                    },
                                                    [
                                                      _c("input", {
                                                        directives: [
                                                          {
                                                            name: "model",
                                                            rawName: "v-model",
                                                            value:
                                                              _vm.client
                                                                .bank_account_name,
                                                            expression:
                                                              "client.bank_account_name",
                                                          },
                                                        ],
                                                        staticClass:
                                                          "inline-edit",
                                                        class: {
                                                          readonly:
                                                            !_vm.isEditing,
                                                          "has-changes":
                                                            _vm.changesMade
                                                              .bank_account_name,
                                                        },
                                                        attrs: {
                                                          type: "text",
                                                          placeholder:
                                                            "Bank account holder name",
                                                          readonly:
                                                            !_vm.isEditing,
                                                        },
                                                        domProps: {
                                                          value:
                                                            _vm.client
                                                              .bank_account_name,
                                                        },
                                                        on: {
                                                          input: [
                                                            function ($event) {
                                                              if (
                                                                $event.target
                                                                  .composing
                                                              ) {
                                                                return
                                                              }
                                                              _vm.$set(
                                                                _vm.client,
                                                                "bank_account_name",
                                                                $event.target
                                                                  .value
                                                              )
                                                            },
                                                            function ($event) {
                                                              return _vm.trackChange(
                                                                "bank_account_name",
                                                                $event.target
                                                                  .value
                                                              )
                                                            },
                                                          ],
                                                          focus: function (
                                                            $event
                                                          ) {
                                                            return _vm.trackFieldTouch(
                                                              "bank_account_name"
                                                            )
                                                          },
                                                          blur: function (
                                                            $event
                                                          ) {
                                                            return _vm.trackFieldTouch(
                                                              "bank_account_name"
                                                            )
                                                          },
                                                        },
                                                      }),
                                                    ]
                                                  ),
                                                ]
                                              ),
                                              _vm._v(" "),
                                              _c(
                                                "div",
                                                { staticClass: "data-card" },
                                                [
                                                  _c(
                                                    "div",
                                                    {
                                                      staticClass: "data-label",
                                                    },
                                                    [_vm._v("Bank name")]
                                                  ),
                                                  _vm._v(" "),
                                                  _c(
                                                    "div",
                                                    {
                                                      staticClass: "data-value",
                                                    },
                                                    [
                                                      _c("input", {
                                                        directives: [
                                                          {
                                                            name: "model",
                                                            rawName: "v-model",
                                                            value:
                                                              _vm.client
                                                                .bank_name,
                                                            expression:
                                                              "client.bank_name",
                                                          },
                                                        ],
                                                        staticClass:
                                                          "inline-edit",
                                                        class: {
                                                          readonly:
                                                            !_vm.isEditing,
                                                          "has-changes":
                                                            _vm.changesMade
                                                              .bank_name,
                                                        },
                                                        attrs: {
                                                          type: "text",
                                                          placeholder:
                                                            "Bank name",
                                                          readonly:
                                                            !_vm.isEditing,
                                                        },
                                                        domProps: {
                                                          value:
                                                            _vm.client
                                                              .bank_name,
                                                        },
                                                        on: {
                                                          input: [
                                                            function ($event) {
                                                              if (
                                                                $event.target
                                                                  .composing
                                                              ) {
                                                                return
                                                              }
                                                              _vm.$set(
                                                                _vm.client,
                                                                "bank_name",
                                                                $event.target
                                                                  .value
                                                              )
                                                            },
                                                            function ($event) {
                                                              return _vm.trackChange(
                                                                "bank_name",
                                                                $event.target
                                                                  .value
                                                              )
                                                            },
                                                          ],
                                                          focus: function (
                                                            $event
                                                          ) {
                                                            return _vm.trackFieldTouch(
                                                              "bank_name"
                                                            )
                                                          },
                                                          blur: function (
                                                            $event
                                                          ) {
                                                            return _vm.trackFieldTouch(
                                                              "bank_name"
                                                            )
                                                          },
                                                        },
                                                      }),
                                                    ]
                                                  ),
                                                ]
                                              ),
                                            ]
                                          ),
                                        ]
                                      ),
                                    ]),
                                  ]),
                                ]
                              ),
                            ])
                          : _vm._e(),
                        _vm._v(" "),
                        _vm.activeTab === "newTask"
                          ? _c("div", [
                              _c("div", { staticClass: "tab-header" }, [
                                _c("h4", { staticClass: "tab-title" }, [
                                  _vm._v(
                                    "\n                                                    New Task\n                                                "
                                  ),
                                ]),
                                _vm._v(" "),
                                _c(
                                  "button",
                                  {
                                    staticClass: "btn btn-primary",
                                    on: { click: _vm.startNewTask },
                                  },
                                  [
                                    _c("i", { staticClass: "fas fa-plus" }),
                                    _vm._v(
                                      "\n                                                    New Task\n                                                "
                                    ),
                                  ]
                                ),
                              ]),
                              _vm._v(" "),
                              _c("div", { staticClass: "tasks-content" }, [
                                _vm.activeAction === "newTask"
                                  ? _c(
                                      "div",
                                      { staticClass: "task-form-section show" },
                                      [
                                        _c(
                                          "div",
                                          { staticClass: "form-header" },
                                          [
                                            _c(
                                              "h5",
                                              { staticClass: "form-title" },
                                              [
                                                _vm._v(
                                                  "\n                                                            " +
                                                    _vm._s(
                                                      _vm.editingTaskId
                                                        ? "Edit Task"
                                                        : "Create New Task"
                                                    ) +
                                                    "\n                                                        "
                                                ),
                                              ]
                                            ),
                                          ]
                                        ),
                                        _vm._v(" "),
                                        _c(
                                          "form",
                                          {
                                            staticClass: "task-form",
                                            on: {
                                              submit: function ($event) {
                                                $event.preventDefault()
                                                return _vm.saveTask.apply(
                                                  null,
                                                  arguments
                                                )
                                              },
                                            },
                                          },
                                          [
                                            _c(
                                              "div",
                                              { staticClass: "form-grid" },
                                              [
                                                _c(
                                                  "div",
                                                  { staticClass: "form-group" },
                                                  [
                                                    _c(
                                                      "label",
                                                      {
                                                        staticClass:
                                                          "form-label",
                                                      },
                                                      [
                                                        _vm._v(
                                                          "Task\n                                                                    Title"
                                                        ),
                                                      ]
                                                    ),
                                                    _vm._v(" "),
                                                    _c("input", {
                                                      directives: [
                                                        {
                                                          name: "model",
                                                          rawName: "v-model",
                                                          value: _vm.task.title,
                                                          expression:
                                                            "task.title\n                                                                    ",
                                                        },
                                                      ],
                                                      staticClass:
                                                        "form-control",
                                                      attrs: {
                                                        type: "text",
                                                        placeholder:
                                                          "Enter task title",
                                                        required: "",
                                                      },
                                                      domProps: {
                                                        value: _vm.task.title,
                                                      },
                                                      on: {
                                                        input: function (
                                                          $event
                                                        ) {
                                                          if (
                                                            $event.target
                                                              .composing
                                                          ) {
                                                            return
                                                          }
                                                          _vm.$set(
                                                            _vm.task,
                                                            "title",
                                                            $event.target.value
                                                          )
                                                        },
                                                      },
                                                    }),
                                                  ]
                                                ),
                                                _vm._v(" "),
                                                _c(
                                                  "div",
                                                  { staticClass: "form-group" },
                                                  [
                                                    _c(
                                                      "label",
                                                      {
                                                        staticClass:
                                                          "form-label",
                                                      },
                                                      [_vm._v("Category")]
                                                    ),
                                                    _vm._v(" "),
                                                    _c(
                                                      "select",
                                                      {
                                                        directives: [
                                                          {
                                                            name: "model",
                                                            rawName: "v-model",
                                                            value:
                                                              _vm.task.category,
                                                            expression:
                                                              "task.category\n                                                                    ",
                                                          },
                                                        ],
                                                        staticClass:
                                                          "form-control",
                                                        attrs: { required: "" },
                                                        on: {
                                                          change: function (
                                                            $event
                                                          ) {
                                                            var $$selectedVal =
                                                              Array.prototype.filter
                                                                .call(
                                                                  $event.target
                                                                    .options,
                                                                  function (o) {
                                                                    return o.selected
                                                                  }
                                                                )
                                                                .map(function (
                                                                  o
                                                                ) {
                                                                  var val =
                                                                    "_value" in
                                                                    o
                                                                      ? o._value
                                                                      : o.value
                                                                  return val
                                                                })
                                                            _vm.$set(
                                                              _vm.task,
                                                              "category",
                                                              $event.target
                                                                .multiple
                                                                ? $$selectedVal
                                                                : $$selectedVal[0]
                                                            )
                                                          },
                                                        },
                                                      },
                                                      [
                                                        _c(
                                                          "option",
                                                          {
                                                            attrs: {
                                                              value: "",
                                                            },
                                                          },
                                                          [
                                                            _vm._v(
                                                              "\n                                                                        Select\n                                                                        Category\n                                                                    "
                                                            ),
                                                          ]
                                                        ),
                                                        _vm._v(" "),
                                                        _c(
                                                          "option",
                                                          {
                                                            attrs: {
                                                              value: "Training",
                                                            },
                                                          },
                                                          [
                                                            _vm._v(
                                                              "\n                                                                        Training\n                                                                    "
                                                            ),
                                                          ]
                                                        ),
                                                        _vm._v(" "),
                                                        _c(
                                                          "option",
                                                          {
                                                            attrs: {
                                                              value:
                                                                "Client Management",
                                                            },
                                                          },
                                                          [
                                                            _vm._v(
                                                              "\n                                                                        Client\n                                                                        Management\n                                                                    "
                                                            ),
                                                          ]
                                                        ),
                                                        _vm._v(" "),
                                                        _c(
                                                          "option",
                                                          {
                                                            attrs: {
                                                              value:
                                                                "Administrative",
                                                            },
                                                          },
                                                          [
                                                            _vm._v(
                                                              "\n                                                                        Administrative\n                                                                    "
                                                            ),
                                                          ]
                                                        ),
                                                        _vm._v(" "),
                                                        _c(
                                                          "option",
                                                          {
                                                            attrs: {
                                                              value:
                                                                "Maintenance",
                                                            },
                                                          },
                                                          [
                                                            _vm._v(
                                                              "\n                                                                        Maintenance\n                                                                    "
                                                            ),
                                                          ]
                                                        ),
                                                        _vm._v(" "),
                                                        _c(
                                                          "option",
                                                          {
                                                            attrs: {
                                                              value:
                                                                "Professional Development",
                                                            },
                                                          },
                                                          [
                                                            _vm._v(
                                                              "\n                                                                        Professional\n                                                                        Development\n                                                                    "
                                                            ),
                                                          ]
                                                        ),
                                                        _vm._v(" "),
                                                        _c(
                                                          "option",
                                                          {
                                                            attrs: {
                                                              value: "Coaching",
                                                            },
                                                          },
                                                          [
                                                            _vm._v(
                                                              "\n                                                                        Coaching\n                                                                    "
                                                            ),
                                                          ]
                                                        ),
                                                        _vm._v(" "),
                                                        _c(
                                                          "option",
                                                          {
                                                            attrs: {
                                                              value:
                                                                "Follow-up",
                                                            },
                                                          },
                                                          [
                                                            _vm._v(
                                                              "\n                                                                        Follow-up\n                                                                    "
                                                            ),
                                                          ]
                                                        ),
                                                        _vm._v(" "),
                                                        _c(
                                                          "option",
                                                          {
                                                            attrs: {
                                                              value:
                                                                "Assessment",
                                                            },
                                                          },
                                                          [
                                                            _vm._v(
                                                              "\n                                                                        Assessment\n                                                                    "
                                                            ),
                                                          ]
                                                        ),
                                                        _vm._v(" "),
                                                        _c(
                                                          "option",
                                                          {
                                                            attrs: {
                                                              value:
                                                                "Nutrition",
                                                            },
                                                          },
                                                          [
                                                            _vm._v(
                                                              "\n                                                                        Nutrition\n                                                                    "
                                                            ),
                                                          ]
                                                        ),
                                                        _vm._v(" "),
                                                        _c(
                                                          "option",
                                                          {
                                                            attrs: {
                                                              value: "Wellness",
                                                            },
                                                          },
                                                          [
                                                            _vm._v(
                                                              "\n                                                                        Wellness\n                                                                    "
                                                            ),
                                                          ]
                                                        ),
                                                        _vm._v(" "),
                                                        _c(
                                                          "option",
                                                          {
                                                            attrs: {
                                                              value: "Billing",
                                                            },
                                                          },
                                                          [
                                                            _vm._v(
                                                              "\n                                                                        Billing\n                                                                    "
                                                            ),
                                                          ]
                                                        ),
                                                        _vm._v(" "),
                                                        _c(
                                                          "option",
                                                          {
                                                            attrs: {
                                                              value:
                                                                "Communication",
                                                            },
                                                          },
                                                          [
                                                            _vm._v(
                                                              "\n                                                                        Communication\n                                                                    "
                                                            ),
                                                          ]
                                                        ),
                                                        _vm._v(" "),
                                                        _c(
                                                          "option",
                                                          {
                                                            attrs: {
                                                              value: "Other",
                                                            },
                                                          },
                                                          [
                                                            _vm._v(
                                                              "\n                                                                        Other\n                                                                    "
                                                            ),
                                                          ]
                                                        ),
                                                      ]
                                                    ),
                                                  ]
                                                ),
                                                _vm._v(" "),
                                                _c(
                                                  "div",
                                                  { staticClass: "form-group" },
                                                  [
                                                    _c(
                                                      "label",
                                                      {
                                                        staticClass:
                                                          "form-label",
                                                      },
                                                      [_vm._v("Priority")]
                                                    ),
                                                    _vm._v(" "),
                                                    _c(
                                                      "select",
                                                      {
                                                        directives: [
                                                          {
                                                            name: "model",
                                                            rawName: "v-model",
                                                            value:
                                                              _vm.task.priority,
                                                            expression:
                                                              "task.priority\n                                                                    ",
                                                          },
                                                        ],
                                                        staticClass:
                                                          "form-control",
                                                        attrs: { required: "" },
                                                        on: {
                                                          change: function (
                                                            $event
                                                          ) {
                                                            var $$selectedVal =
                                                              Array.prototype.filter
                                                                .call(
                                                                  $event.target
                                                                    .options,
                                                                  function (o) {
                                                                    return o.selected
                                                                  }
                                                                )
                                                                .map(function (
                                                                  o
                                                                ) {
                                                                  var val =
                                                                    "_value" in
                                                                    o
                                                                      ? o._value
                                                                      : o.value
                                                                  return val
                                                                })
                                                            _vm.$set(
                                                              _vm.task,
                                                              "priority",
                                                              $event.target
                                                                .multiple
                                                                ? $$selectedVal
                                                                : $$selectedVal[0]
                                                            )
                                                          },
                                                        },
                                                      },
                                                      [
                                                        _c(
                                                          "option",
                                                          {
                                                            attrs: {
                                                              value: "",
                                                            },
                                                          },
                                                          [
                                                            _vm._v(
                                                              "\n                                                                        Select\n                                                                        Priority\n                                                                    "
                                                            ),
                                                          ]
                                                        ),
                                                        _vm._v(" "),
                                                        _c(
                                                          "option",
                                                          {
                                                            attrs: {
                                                              value: "Low",
                                                            },
                                                          },
                                                          [
                                                            _vm._v(
                                                              "\n                                                                        Low\n                                                                    "
                                                            ),
                                                          ]
                                                        ),
                                                        _vm._v(" "),
                                                        _c(
                                                          "option",
                                                          {
                                                            attrs: {
                                                              value: "Medium",
                                                            },
                                                          },
                                                          [
                                                            _vm._v(
                                                              "\n                                                                        Medium\n                                                                    "
                                                            ),
                                                          ]
                                                        ),
                                                        _vm._v(" "),
                                                        _c(
                                                          "option",
                                                          {
                                                            attrs: {
                                                              value: "High",
                                                            },
                                                          },
                                                          [
                                                            _vm._v(
                                                              "\n                                                                        High\n                                                                    "
                                                            ),
                                                          ]
                                                        ),
                                                        _vm._v(" "),
                                                        _c(
                                                          "option",
                                                          {
                                                            attrs: {
                                                              value: "Urgent",
                                                            },
                                                          },
                                                          [
                                                            _vm._v(
                                                              "\n                                                                        Urgent\n                                                                    "
                                                            ),
                                                          ]
                                                        ),
                                                      ]
                                                    ),
                                                  ]
                                                ),
                                                _vm._v(" "),
                                                _c(
                                                  "div",
                                                  { staticClass: "form-group" },
                                                  [
                                                    _c(
                                                      "label",
                                                      {
                                                        staticClass:
                                                          "form-label",
                                                      },
                                                      [
                                                        _vm._v(
                                                          "Due\n                                                                    Date"
                                                        ),
                                                      ]
                                                    ),
                                                    _vm._v(" "),
                                                    _c("input", {
                                                      directives: [
                                                        {
                                                          name: "model",
                                                          rawName: "v-model",
                                                          value:
                                                            _vm.task.dueDate,
                                                          expression:
                                                            "task.dueDate\n                                                                    ",
                                                        },
                                                      ],
                                                      staticClass:
                                                        "form-control",
                                                      attrs: {
                                                        type: "date",
                                                        required: "",
                                                      },
                                                      domProps: {
                                                        value: _vm.task.dueDate,
                                                      },
                                                      on: {
                                                        input: function (
                                                          $event
                                                        ) {
                                                          if (
                                                            $event.target
                                                              .composing
                                                          ) {
                                                            return
                                                          }
                                                          _vm.$set(
                                                            _vm.task,
                                                            "dueDate",
                                                            $event.target.value
                                                          )
                                                        },
                                                      },
                                                    }),
                                                  ]
                                                ),
                                                _vm._v(" "),
                                                _c(
                                                  "div",
                                                  { staticClass: "form-group" },
                                                  [
                                                    _c(
                                                      "label",
                                                      {
                                                        staticClass:
                                                          "form-label",
                                                      },
                                                      [_vm._v("Status")]
                                                    ),
                                                    _vm._v(" "),
                                                    _c(
                                                      "select",
                                                      {
                                                        directives: [
                                                          {
                                                            name: "model",
                                                            rawName: "v-model",
                                                            value:
                                                              _vm.task.status,
                                                            expression:
                                                              "task.status\n                                                                    ",
                                                          },
                                                        ],
                                                        staticClass:
                                                          "form-control",
                                                        attrs: { required: "" },
                                                        on: {
                                                          change: function (
                                                            $event
                                                          ) {
                                                            var $$selectedVal =
                                                              Array.prototype.filter
                                                                .call(
                                                                  $event.target
                                                                    .options,
                                                                  function (o) {
                                                                    return o.selected
                                                                  }
                                                                )
                                                                .map(function (
                                                                  o
                                                                ) {
                                                                  var val =
                                                                    "_value" in
                                                                    o
                                                                      ? o._value
                                                                      : o.value
                                                                  return val
                                                                })
                                                            _vm.$set(
                                                              _vm.task,
                                                              "status",
                                                              $event.target
                                                                .multiple
                                                                ? $$selectedVal
                                                                : $$selectedVal[0]
                                                            )
                                                          },
                                                        },
                                                      },
                                                      [
                                                        _c(
                                                          "option",
                                                          {
                                                            attrs: {
                                                              value: "",
                                                            },
                                                          },
                                                          [
                                                            _vm._v(
                                                              "\n                                                                        Select\n                                                                        Status\n                                                                    "
                                                            ),
                                                          ]
                                                        ),
                                                        _vm._v(" "),
                                                        _c(
                                                          "option",
                                                          {
                                                            attrs: {
                                                              value: "pending",
                                                            },
                                                          },
                                                          [
                                                            _vm._v(
                                                              "\n                                                                        Pending\n                                                                    "
                                                            ),
                                                          ]
                                                        ),
                                                        _vm._v(" "),
                                                        _c(
                                                          "option",
                                                          {
                                                            attrs: {
                                                              value:
                                                                "in-progress",
                                                            },
                                                          },
                                                          [
                                                            _vm._v(
                                                              "\n                                                                        In\n                                                                        Progress\n                                                                    "
                                                            ),
                                                          ]
                                                        ),
                                                        _vm._v(" "),
                                                        _c(
                                                          "option",
                                                          {
                                                            attrs: {
                                                              value:
                                                                "completed",
                                                            },
                                                          },
                                                          [
                                                            _vm._v(
                                                              "\n                                                                        Completed\n                                                                    "
                                                            ),
                                                          ]
                                                        ),
                                                        _vm._v(" "),
                                                        _c(
                                                          "option",
                                                          {
                                                            attrs: {
                                                              value:
                                                                "cancelled",
                                                            },
                                                          },
                                                          [
                                                            _vm._v(
                                                              "\n                                                                        Cancelled\n                                                                    "
                                                            ),
                                                          ]
                                                        ),
                                                      ]
                                                    ),
                                                  ]
                                                ),
                                                _vm._v(" "),
                                                _c(
                                                  "div",
                                                  {
                                                    staticClass:
                                                      "form-group full-width",
                                                  },
                                                  [
                                                    _c(
                                                      "label",
                                                      {
                                                        staticClass:
                                                          "form-label",
                                                      },
                                                      [_vm._v("Description")]
                                                    ),
                                                    _vm._v(" "),
                                                    _c("textarea", {
                                                      directives: [
                                                        {
                                                          name: "model",
                                                          rawName: "v-model",
                                                          value:
                                                            _vm.task
                                                              .description,
                                                          expression:
                                                            "task.description\n                                                                    ",
                                                        },
                                                      ],
                                                      staticClass:
                                                        "form-control",
                                                      attrs: {
                                                        rows: "4",
                                                        placeholder:
                                                          "Enter task description",
                                                        required: "",
                                                      },
                                                      domProps: {
                                                        value:
                                                          _vm.task.description,
                                                      },
                                                      on: {
                                                        input: function (
                                                          $event
                                                        ) {
                                                          if (
                                                            $event.target
                                                              .composing
                                                          ) {
                                                            return
                                                          }
                                                          _vm.$set(
                                                            _vm.task,
                                                            "description",
                                                            $event.target.value
                                                          )
                                                        },
                                                      },
                                                    }),
                                                  ]
                                                ),
                                              ]
                                            ),
                                            _vm._v(" "),
                                            _c(
                                              "div",
                                              { staticClass: "form-actions" },
                                              [
                                                _c(
                                                  "button",
                                                  {
                                                    staticClass:
                                                      "btn btn-secondary",
                                                    attrs: { type: "button" },
                                                    on: {
                                                      click: _vm.cancelTaskEdit,
                                                    },
                                                  },
                                                  [
                                                    _c("i", {
                                                      staticClass:
                                                        "fas fa-times",
                                                    }),
                                                    _vm._v(
                                                      "\n                                                                Cancel\n                                                            "
                                                    ),
                                                  ]
                                                ),
                                                _vm._v(" "),
                                                _c(
                                                  "button",
                                                  {
                                                    staticClass:
                                                      "btn btn-primary",
                                                    attrs: {
                                                      type: "submit",
                                                      disabled:
                                                        _vm.isCreatingTask,
                                                    },
                                                  },
                                                  [
                                                    _c("i", {
                                                      staticClass:
                                                        "fas fa-save",
                                                    }),
                                                    _vm._v(
                                                      "\n                                                                " +
                                                        _vm._s(
                                                          _vm.editingTaskId
                                                            ? "Update Task"
                                                            : "Create Task"
                                                        ) +
                                                        "\n                                                            "
                                                    ),
                                                  ]
                                                ),
                                              ]
                                            ),
                                          ]
                                        ),
                                      ]
                                    )
                                  : _c("div", { staticClass: "tasks-list" }, [
                                      _vm.isLoadingTasks
                                        ? _c(
                                            "div",
                                            { staticClass: "loading-tasks" },
                                            [
                                              _vm._m(10),
                                              _vm._v(" "),
                                              _c("p", [
                                                _vm._v(
                                                  "\n                                                            Loading tasks...\n                                                        "
                                                ),
                                              ]),
                                            ]
                                          )
                                        : _vm.coachTasks.length === 0
                                        ? _c(
                                            "div",
                                            { staticClass: "no-tasks" },
                                            [
                                              _c("i", {
                                                staticClass: "fas fa-inbox",
                                              }),
                                              _vm._v(" "),
                                              _c("p", [
                                                _vm._v(
                                                  "\n                                                            No tasks found\n                                                            for this coach\n                                                        "
                                                ),
                                              ]),
                                            ]
                                          )
                                        : _c(
                                            "div",
                                            { staticClass: "table-responsive" },
                                            [
                                              _c(
                                                "table",
                                                {
                                                  staticClass:
                                                    "table table-hover tasks-table",
                                                },
                                                [
                                                  _vm._m(11),
                                                  _vm._v(" "),
                                                  _c(
                                                    "tbody",
                                                    _vm._l(
                                                      _vm.coachTasks,
                                                      function (task) {
                                                        return _c(
                                                          "tr",
                                                          {
                                                            key: task.id,
                                                            class:
                                                              _vm.getTaskRowClass(
                                                                task
                                                              ),
                                                          },
                                                          [
                                                            _c("td", [
                                                              _c("strong", [
                                                                _vm._v(
                                                                  _vm._s(
                                                                    task.title
                                                                  )
                                                                ),
                                                              ]),
                                                              _vm._v(" "),
                                                              task.description
                                                                ? _c(
                                                                    "div",
                                                                    {
                                                                      staticClass:
                                                                        "task-description",
                                                                    },
                                                                    [
                                                                      _vm._v(
                                                                        "\n                                                                            " +
                                                                          _vm._s(
                                                                            task.description.substring(
                                                                              0,
                                                                              50
                                                                            )
                                                                          ) +
                                                                          _vm._s(
                                                                            task
                                                                              .description
                                                                              .length >
                                                                              50
                                                                              ? "..."
                                                                              : ""
                                                                          ) +
                                                                          "\n                                                                        "
                                                                      ),
                                                                    ]
                                                                  )
                                                                : _vm._e(),
                                                            ]),
                                                            _vm._v(" "),
                                                            _c("td", [
                                                              _c(
                                                                "span",
                                                                {
                                                                  staticClass:
                                                                    "badge category-badge",
                                                                  class:
                                                                    _vm.getCategoryClass(
                                                                      task.category
                                                                    ),
                                                                },
                                                                [
                                                                  _vm._v(
                                                                    "\n                                                                            " +
                                                                      _vm._s(
                                                                        task.category
                                                                      ) +
                                                                      "\n                                                                        "
                                                                  ),
                                                                ]
                                                              ),
                                                            ]),
                                                            _vm._v(" "),
                                                            _c("td", [
                                                              _c(
                                                                "span",
                                                                {
                                                                  staticClass:
                                                                    "badge priority-badge",
                                                                  class:
                                                                    _vm.getPriorityClass(
                                                                      task.priority
                                                                    ),
                                                                },
                                                                [
                                                                  _vm._v(
                                                                    "\n                                                                            " +
                                                                      _vm._s(
                                                                        task.priority
                                                                      ) +
                                                                      "\n                                                                        "
                                                                  ),
                                                                ]
                                                              ),
                                                            ]),
                                                            _vm._v(" "),
                                                            _c("td", [
                                                              _c(
                                                                "span",
                                                                {
                                                                  class:
                                                                    _vm.getDueDateClass(
                                                                      task.due_date
                                                                    ),
                                                                },
                                                                [
                                                                  _vm._v(
                                                                    "\n                                                                            " +
                                                                      _vm._s(
                                                                        _vm.formatDate(
                                                                          task.due_date
                                                                        )
                                                                      ) +
                                                                      "\n                                                                        "
                                                                  ),
                                                                ]
                                                              ),
                                                            ]),
                                                            _vm._v(" "),
                                                            _c("td", [
                                                              _c(
                                                                "span",
                                                                {
                                                                  staticClass:
                                                                    "badge status-badge",
                                                                  class:
                                                                    _vm.getStatusClass(
                                                                      task.status
                                                                    ),
                                                                },
                                                                [
                                                                  _vm._v(
                                                                    "\n                                                                            " +
                                                                      _vm._s(
                                                                        task.status
                                                                      ) +
                                                                      "\n                                                                        "
                                                                  ),
                                                                ]
                                                              ),
                                                            ]),
                                                            _vm._v(" "),
                                                            _c("td", [
                                                              _c(
                                                                "div",
                                                                {
                                                                  staticClass:
                                                                    "task-actions",
                                                                },
                                                                [
                                                                  _c(
                                                                    "button",
                                                                    {
                                                                      staticClass:
                                                                        "btn btn-sm btn-outline-info",
                                                                      attrs: {
                                                                        title:
                                                                          "View Task",
                                                                      },
                                                                      on: {
                                                                        click:
                                                                          function (
                                                                            $event
                                                                          ) {
                                                                            return _vm.viewTask(
                                                                              task
                                                                            )
                                                                          },
                                                                      },
                                                                    },
                                                                    [
                                                                      _c("i", {
                                                                        staticClass:
                                                                          "fas fa-eye",
                                                                      }),
                                                                    ]
                                                                  ),
                                                                  _vm._v(" "),
                                                                  _c(
                                                                    "button",
                                                                    {
                                                                      staticClass:
                                                                        "btn btn-sm btn-outline-primary",
                                                                      attrs: {
                                                                        title:
                                                                          "Edit Task",
                                                                      },
                                                                      on: {
                                                                        click:
                                                                          function (
                                                                            $event
                                                                          ) {
                                                                            return _vm.editTask(
                                                                              task
                                                                            )
                                                                          },
                                                                      },
                                                                    },
                                                                    [
                                                                      _c("i", {
                                                                        staticClass:
                                                                          "fas fa-edit",
                                                                      }),
                                                                    ]
                                                                  ),
                                                                  _vm._v(" "),
                                                                  _c(
                                                                    "button",
                                                                    {
                                                                      staticClass:
                                                                        "btn btn-sm btn-outline-danger",
                                                                      attrs: {
                                                                        title:
                                                                          "Delete Task",
                                                                      },
                                                                      on: {
                                                                        click:
                                                                          function (
                                                                            $event
                                                                          ) {
                                                                            return _vm.deleteTask(
                                                                              task.id
                                                                            )
                                                                          },
                                                                      },
                                                                    },
                                                                    [
                                                                      _c("i", {
                                                                        staticClass:
                                                                          "fas fa-trash",
                                                                      }),
                                                                    ]
                                                                  ),
                                                                ]
                                                              ),
                                                            ]),
                                                          ]
                                                        )
                                                      }
                                                    ),
                                                    0
                                                  ),
                                                ]
                                              ),
                                            ]
                                          ),
                                    ]),
                              ]),
                            ])
                          : _vm._e(),
                        _vm._v(" "),
                        _vm.activeTab === "sendMessage"
                          ? _c("div", [
                              _c("div", { staticClass: "tab-header" }, [
                                _c("h4", { staticClass: "tab-title" }, [
                                  _c("i", { staticClass: "fas fa-comments" }),
                                  _vm._v(
                                    "\n                                                    Chat with " +
                                      _vm._s(_vm.client.first_name) +
                                      " " +
                                      _vm._s(_vm.client.last_name) +
                                      "\n                                                "
                                  ),
                                ]),
                                _vm._v(" "),
                                _vm._m(12),
                              ]),
                              _vm._v(" "),
                              _c("div", { staticClass: "chat-container" }, [
                                _c(
                                  "div",
                                  {
                                    ref: "chatMessagesContainer",
                                    staticClass: "chat-messages",
                                  },
                                  [
                                    _vm.isLoadingMessages
                                      ? _c(
                                          "div",
                                          {
                                            staticClass:
                                              "loading-messages text-center py-5",
                                          },
                                          [
                                            _vm._m(13),
                                            _vm._v(" "),
                                            _c("p", { staticClass: "mt-2" }, [
                                              _vm._v("Loading conversation..."),
                                            ]),
                                          ]
                                        )
                                      : _vm.messages.length === 0
                                      ? _c(
                                          "div",
                                          {
                                            staticClass:
                                              "no-messages text-center py-5",
                                          },
                                          [
                                            _c("i", {
                                              staticClass:
                                                "fas fa-comments fa-3x text-muted mb-3",
                                            }),
                                            _vm._v(" "),
                                            _c(
                                              "p",
                                              { staticClass: "text-muted" },
                                              [
                                                _vm._v(
                                                  "No messages yet. Start the conversation!"
                                                ),
                                              ]
                                            ),
                                          ]
                                        )
                                      : _c(
                                          "div",
                                          { staticClass: "messages-list" },
                                          _vm._l(
                                            _vm.messages,
                                            function (message) {
                                              return _c(
                                                "div",
                                                {
                                                  key: message.id,
                                                  staticClass: "message-bubble",
                                                  class: {
                                                    "message-sent":
                                                      message.is_sent,
                                                    "message-received":
                                                      !message.is_sent,
                                                  },
                                                },
                                                [
                                                  _c(
                                                    "div",
                                                    {
                                                      staticClass:
                                                        "message-content",
                                                    },
                                                    [
                                                      _c(
                                                        "p",
                                                        {
                                                          staticClass:
                                                            "message-text",
                                                        },
                                                        [
                                                          _vm._v(
                                                            _vm._s(
                                                              message.message
                                                            )
                                                          ),
                                                        ]
                                                      ),
                                                      _vm._v(" "),
                                                      _c(
                                                        "span",
                                                        {
                                                          staticClass:
                                                            "message-time",
                                                        },
                                                        [
                                                          _vm._v(
                                                            _vm._s(
                                                              _vm.formatMessageTime(
                                                                message.created_at
                                                              )
                                                            )
                                                          ),
                                                        ]
                                                      ),
                                                    ]
                                                  ),
                                                ]
                                              )
                                            }
                                          ),
                                          0
                                        ),
                                  ]
                                ),
                                _vm._v(" "),
                                _c(
                                  "div",
                                  { staticClass: "chat-input-container" },
                                  [
                                    _c(
                                      "form",
                                      {
                                        staticClass: "chat-input-form",
                                        on: {
                                          submit: function ($event) {
                                            $event.preventDefault()
                                            return _vm.sendMessage.apply(
                                              null,
                                              arguments
                                            )
                                          },
                                        },
                                      },
                                      [
                                        _c(
                                          "div",
                                          { staticClass: "input-group" },
                                          [
                                            _c("textarea", {
                                              directives: [
                                                {
                                                  name: "model",
                                                  rawName: "v-model",
                                                  value: _vm.newMessage.body,
                                                  expression: "newMessage.body",
                                                },
                                              ],
                                              staticClass:
                                                "form-control chat-input",
                                              attrs: {
                                                rows: "2",
                                                placeholder:
                                                  "Type your message...",
                                                disabled: _vm.isSendingMessage,
                                                maxlength: "1000",
                                              },
                                              domProps: {
                                                value: _vm.newMessage.body,
                                              },
                                              on: {
                                                keydown: [
                                                  function ($event) {
                                                    if (
                                                      !$event.type.indexOf(
                                                        "key"
                                                      ) &&
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
                                                    if (
                                                      $event.ctrlKey ||
                                                      $event.shiftKey ||
                                                      $event.altKey ||
                                                      $event.metaKey
                                                    ) {
                                                      return null
                                                    }
                                                    $event.preventDefault()
                                                    return _vm.sendMessage.apply(
                                                      null,
                                                      arguments
                                                    )
                                                  },
                                                  function ($event) {
                                                    if (
                                                      !$event.type.indexOf(
                                                        "key"
                                                      ) &&
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
                                                    if (!$event.shiftKey) {
                                                      return null
                                                    }
                                                    if (
                                                      $event.ctrlKey ||
                                                      $event.altKey ||
                                                      $event.metaKey
                                                    ) {
                                                      return null
                                                    }
                                                    return _vm.newLine.apply(
                                                      null,
                                                      arguments
                                                    )
                                                  },
                                                ],
                                                input: function ($event) {
                                                  if ($event.target.composing) {
                                                    return
                                                  }
                                                  _vm.$set(
                                                    _vm.newMessage,
                                                    "body",
                                                    $event.target.value
                                                  )
                                                },
                                              },
                                            }),
                                            _vm._v(" "),
                                            _c(
                                              "div",
                                              {
                                                staticClass:
                                                  "input-group-append",
                                              },
                                              [
                                                _c(
                                                  "button",
                                                  {
                                                    staticClass:
                                                      "btn btn-primary send-button",
                                                    attrs: {
                                                      type: "submit",
                                                      disabled:
                                                        _vm.isSendingMessage ||
                                                        !_vm.newMessage.body.trim(),
                                                      title:
                                                        "Send message (Enter)",
                                                    },
                                                  },
                                                  [
                                                    !_vm.isSendingMessage
                                                      ? _c("i", {
                                                          staticClass:
                                                            "fas fa-paper-plane",
                                                        })
                                                      : _c("span", {
                                                          staticClass:
                                                            "spinner-border spinner-border-sm",
                                                        }),
                                                  ]
                                                ),
                                              ]
                                            ),
                                          ]
                                        ),
                                        _vm._v(" "),
                                        _c(
                                          "small",
                                          {
                                            staticClass:
                                              "text-muted message-counter",
                                          },
                                          [
                                            _vm._v(
                                              "\n                                                            " +
                                                _vm._s(
                                                  _vm.newMessage.body.length
                                                ) +
                                                "/1000 characters\n                                                        "
                                            ),
                                          ]
                                        ),
                                      ]
                                    ),
                                  ]
                                ),
                              ]),
                            ])
                          : _vm._e(),
                        _vm._v(" "),
                        _vm.showMessageModal && _vm.selectedMessage
                          ? _c(
                              "div",
                              {
                                staticClass: "modal fade show",
                                staticStyle: {
                                  display: "block",
                                  background: "rgba(0,0,0,0.5)",
                                },
                                on: {
                                  click: function ($event) {
                                    if (
                                      $event.target !== $event.currentTarget
                                    ) {
                                      return null
                                    }
                                    return _vm.closeMessageModal.apply(
                                      null,
                                      arguments
                                    )
                                  },
                                },
                              },
                              [
                                _c(
                                  "div",
                                  {
                                    staticClass:
                                      "modal-dialog modal-dialog-centered",
                                  },
                                  [
                                    _c(
                                      "div",
                                      { staticClass: "modal-content" },
                                      [
                                        _c(
                                          "div",
                                          { staticClass: "modal-header" },
                                          [
                                            _c(
                                              "h5",
                                              { staticClass: "modal-title" },
                                              [
                                                _vm._v(
                                                  _vm._s(
                                                    _vm.selectedMessage.subject
                                                  )
                                                ),
                                              ]
                                            ),
                                            _vm._v(" "),
                                            _c(
                                              "button",
                                              {
                                                staticClass: "close",
                                                attrs: { type: "button" },
                                                on: {
                                                  click: _vm.closeMessageModal,
                                                },
                                              },
                                              [_c("span", [_vm._v("×")])]
                                            ),
                                          ]
                                        ),
                                        _vm._v(" "),
                                        _c(
                                          "div",
                                          { staticClass: "modal-body" },
                                          [
                                            _c(
                                              "div",
                                              {
                                                staticClass:
                                                  "message-view-header mb-3",
                                              },
                                              [
                                                _c(
                                                  "div",
                                                  {
                                                    staticClass:
                                                      "d-flex justify-content-between align-items-center",
                                                  },
                                                  [
                                                    _c("div", [
                                                      _c("strong", [
                                                        _vm._v("From:"),
                                                      ]),
                                                      _vm._v(
                                                        " " +
                                                          _vm._s(
                                                            _vm.selectedMessage
                                                              .sender
                                                          ) +
                                                          "\n                                                                "
                                                      ),
                                                    ]),
                                                    _vm._v(" "),
                                                    _c(
                                                      "div",
                                                      {
                                                        staticClass:
                                                          "text-muted",
                                                      },
                                                      [
                                                        _c("small", [
                                                          _vm._v(
                                                            _vm._s(
                                                              _vm.formatDate(
                                                                _vm
                                                                  .selectedMessage
                                                                  .created_at
                                                              )
                                                            )
                                                          ),
                                                        ]),
                                                      ]
                                                    ),
                                                  ]
                                                ),
                                              ]
                                            ),
                                            _vm._v(" "),
                                            _c(
                                              "div",
                                              {
                                                staticClass:
                                                  "message-view-body",
                                              },
                                              [
                                                _c(
                                                  "p",
                                                  {
                                                    staticStyle: {
                                                      "white-space": "pre-wrap",
                                                    },
                                                  },
                                                  [
                                                    _vm._v(
                                                      _vm._s(
                                                        _vm.selectedMessage.body
                                                      )
                                                    ),
                                                  ]
                                                ),
                                              ]
                                            ),
                                          ]
                                        ),
                                        _vm._v(" "),
                                        _c(
                                          "div",
                                          { staticClass: "modal-footer" },
                                          [
                                            _c(
                                              "button",
                                              {
                                                staticClass:
                                                  "btn btn-secondary",
                                                attrs: { type: "button" },
                                                on: {
                                                  click: _vm.closeMessageModal,
                                                },
                                              },
                                              [_vm._v("Close")]
                                            ),
                                          ]
                                        ),
                                      ]
                                    ),
                                  ]
                                ),
                              ]
                            )
                          : _vm._e(),
                        _vm._v(" "),
                        _vm.activeTab === "members"
                          ? _c("div", [
                              _c("div", { staticClass: "tab-header" }, [
                                _c("h4", { staticClass: "tab-title" }, [
                                  _vm._v(
                                    "\n                                                    Assigned Members\n                                                "
                                  ),
                                ]),
                                _vm._v(" "),
                                _c("div", { staticClass: "header-actions" }, [
                                  _c(
                                    "div",
                                    { staticClass: "view-toggle-group" },
                                    [
                                      _c(
                                        "button",
                                        {
                                          staticClass:
                                            "btn btn-sm view-toggle-btn",
                                          class:
                                            _vm.viewMode === "cards"
                                              ? "btn-primary"
                                              : "btn-outline-secondary",
                                          on: {
                                            click: function ($event) {
                                              _vm.viewMode = "cards"
                                            },
                                          },
                                        },
                                        [
                                          _c("i", {
                                            staticClass: "fas fa-th-large",
                                          }),
                                        ]
                                      ),
                                      _vm._v(" "),
                                      _c(
                                        "button",
                                        {
                                          staticClass:
                                            "btn btn-sm view-toggle-btn",
                                          class:
                                            _vm.viewMode === "table"
                                              ? "btn-primary"
                                              : "btn-outline-secondary",
                                          on: {
                                            click: function ($event) {
                                              _vm.viewMode = "table"
                                            },
                                          },
                                        },
                                        [
                                          _c("i", {
                                            staticClass: "fas fa-table",
                                          }),
                                        ]
                                      ),
                                    ]
                                  ),
                                  _vm._v(" "),
                                  _c(
                                    "button",
                                    {
                                      staticClass:
                                        "btn btn-success assign-member-btn",
                                      on: {
                                        click: function ($event) {
                                          _vm.activeAction = "assignMember"
                                        },
                                      },
                                    },
                                    [
                                      _c("i", {
                                        staticClass: "fas fa-user-plus",
                                      }),
                                      _vm._v(
                                        "\n                                                        Assign Member\n                                                    "
                                      ),
                                    ]
                                  ),
                                ]),
                              ]),
                              _vm._v(" "),
                              _c("div", { staticClass: "members-content" }, [
                                !_vm.activeAction
                                  ? _c(
                                      "div",
                                      {
                                        staticClass:
                                          "assigned-members-overview",
                                      },
                                      [
                                        _c(
                                          "div",
                                          { staticClass: "members-stats" },
                                          [
                                            _c(
                                              "div",
                                              { staticClass: "stat-card" },
                                              [
                                                _vm._m(14),
                                                _vm._v(" "),
                                                _c(
                                                  "div",
                                                  {
                                                    staticClass: "stat-content",
                                                  },
                                                  [
                                                    _c(
                                                      "div",
                                                      {
                                                        staticClass:
                                                          "stat-number",
                                                      },
                                                      [
                                                        _vm._v(
                                                          "\n                                                                    " +
                                                            _vm._s(
                                                              _vm
                                                                .assignedMembers
                                                                .length
                                                            ) +
                                                            "\n                                                                "
                                                        ),
                                                      ]
                                                    ),
                                                    _vm._v(" "),
                                                    _c(
                                                      "div",
                                                      {
                                                        staticClass:
                                                          "stat-label",
                                                      },
                                                      [
                                                        _vm._v(
                                                          "\n                                                                    Total\n                                                                    Assigned\n                                                                "
                                                        ),
                                                      ]
                                                    ),
                                                  ]
                                                ),
                                              ]
                                            ),
                                            _vm._v(" "),
                                            _c(
                                              "div",
                                              { staticClass: "stat-card" },
                                              [
                                                _vm._m(15),
                                                _vm._v(" "),
                                                _c(
                                                  "div",
                                                  {
                                                    staticClass: "stat-content",
                                                  },
                                                  [
                                                    _c(
                                                      "div",
                                                      {
                                                        staticClass:
                                                          "stat-number",
                                                      },
                                                      [
                                                        _vm._v(
                                                          "\n                                                                    " +
                                                            _vm._s(
                                                              _vm.activeAssignedMembersCount
                                                            ) +
                                                            "\n                                                                "
                                                        ),
                                                      ]
                                                    ),
                                                    _vm._v(" "),
                                                    _c(
                                                      "div",
                                                      {
                                                        staticClass:
                                                          "stat-label",
                                                      },
                                                      [
                                                        _vm._v(
                                                          "\n                                                                    Active\n                                                                    Members\n                                                                "
                                                        ),
                                                      ]
                                                    ),
                                                  ]
                                                ),
                                              ]
                                            ),
                                            _vm._v(" "),
                                            _c(
                                              "div",
                                              { staticClass: "stat-card" },
                                              [
                                                _vm._m(16),
                                                _vm._v(" "),
                                                _c(
                                                  "div",
                                                  {
                                                    staticClass: "stat-content",
                                                  },
                                                  [
                                                    _c(
                                                      "div",
                                                      {
                                                        staticClass:
                                                          "stat-number",
                                                      },
                                                      [
                                                        _vm._v(
                                                          "\n                                                                    " +
                                                            _vm._s(
                                                              _vm.premiumMembersCount
                                                            ) +
                                                            "\n                                                                "
                                                        ),
                                                      ]
                                                    ),
                                                    _vm._v(" "),
                                                    _c(
                                                      "div",
                                                      {
                                                        staticClass:
                                                          "stat-label",
                                                      },
                                                      [
                                                        _vm._v(
                                                          "\n                                                                    Premium\n                                                                    Members\n                                                                "
                                                        ),
                                                      ]
                                                    ),
                                                  ]
                                                ),
                                              ]
                                            ),
                                            _vm._v(" "),
                                            _c(
                                              "div",
                                              { staticClass: "stat-card" },
                                              [
                                                _vm._m(17),
                                                _vm._v(" "),
                                                _c(
                                                  "div",
                                                  {
                                                    staticClass: "stat-content",
                                                  },
                                                  [
                                                    _c(
                                                      "div",
                                                      {
                                                        staticClass:
                                                          "stat-number",
                                                      },
                                                      [
                                                        _vm._v(
                                                          "\n                                                                    " +
                                                            _vm._s(
                                                              _vm.thisMonthAssignments
                                                            ) +
                                                            "\n                                                                "
                                                        ),
                                                      ]
                                                    ),
                                                    _vm._v(" "),
                                                    _c(
                                                      "div",
                                                      {
                                                        staticClass:
                                                          "stat-label",
                                                      },
                                                      [
                                                        _vm._v(
                                                          "\n                                                                    This\n                                                                    Month\n                                                                "
                                                        ),
                                                      ]
                                                    ),
                                                  ]
                                                ),
                                              ]
                                            ),
                                          ]
                                        ),
                                        _vm._v(" "),
                                        _c(
                                          "div",
                                          {
                                            staticClass:
                                              "search-filter-section compact",
                                          },
                                          [
                                            _c(
                                              "div",
                                              { staticClass: "filters-row" },
                                              [
                                                _c(
                                                  "div",
                                                  {
                                                    staticClass:
                                                      "form-group compact",
                                                  },
                                                  [
                                                    _c("input", {
                                                      directives: [
                                                        {
                                                          name: "model",
                                                          rawName: "v-model",
                                                          value:
                                                            _vm.memberSearch,
                                                          expression:
                                                            "memberSearch",
                                                        },
                                                      ],
                                                      staticClass:
                                                        "form-control compact",
                                                      attrs: {
                                                        type: "text",
                                                        placeholder:
                                                          "Search members...",
                                                      },
                                                      domProps: {
                                                        value: _vm.memberSearch,
                                                      },
                                                      on: {
                                                        input: [
                                                          function ($event) {
                                                            if (
                                                              $event.target
                                                                .composing
                                                            ) {
                                                              return
                                                            }
                                                            _vm.memberSearch =
                                                              $event.target.value
                                                          },
                                                          _vm.filterAssignedMembers,
                                                        ],
                                                      },
                                                    }),
                                                  ]
                                                ),
                                                _vm._v(" "),
                                                _c(
                                                  "div",
                                                  {
                                                    staticClass:
                                                      "form-group compact",
                                                  },
                                                  [
                                                    _c(
                                                      "select",
                                                      {
                                                        directives: [
                                                          {
                                                            name: "model",
                                                            rawName: "v-model",
                                                            value:
                                                              _vm.memberStatusFilter,
                                                            expression:
                                                              "memberStatusFilter",
                                                          },
                                                        ],
                                                        staticClass:
                                                          "form-control compact",
                                                        on: {
                                                          change: [
                                                            function ($event) {
                                                              var $$selectedVal =
                                                                Array.prototype.filter
                                                                  .call(
                                                                    $event
                                                                      .target
                                                                      .options,
                                                                    function (
                                                                      o
                                                                    ) {
                                                                      return o.selected
                                                                    }
                                                                  )
                                                                  .map(
                                                                    function (
                                                                      o
                                                                    ) {
                                                                      var val =
                                                                        "_value" in
                                                                        o
                                                                          ? o._value
                                                                          : o.value
                                                                      return val
                                                                    }
                                                                  )
                                                              _vm.memberStatusFilter =
                                                                $event.target
                                                                  .multiple
                                                                  ? $$selectedVal
                                                                  : $$selectedVal[0]
                                                            },
                                                            _vm.filterAssignedMembers,
                                                          ],
                                                        },
                                                      },
                                                      [
                                                        _c(
                                                          "option",
                                                          {
                                                            attrs: {
                                                              value: "",
                                                            },
                                                          },
                                                          [_vm._v("All Status")]
                                                        ),
                                                        _vm._v(" "),
                                                        _c(
                                                          "option",
                                                          {
                                                            attrs: {
                                                              value: "Active",
                                                            },
                                                          },
                                                          [_vm._v("Active")]
                                                        ),
                                                        _vm._v(" "),
                                                        _c(
                                                          "option",
                                                          {
                                                            attrs: {
                                                              value: "Inactive",
                                                            },
                                                          },
                                                          [_vm._v("Inactive")]
                                                        ),
                                                        _vm._v(" "),
                                                        _c(
                                                          "option",
                                                          {
                                                            attrs: {
                                                              value: "On Hold",
                                                            },
                                                          },
                                                          [_vm._v("On Hold")]
                                                        ),
                                                      ]
                                                    ),
                                                  ]
                                                ),
                                                _vm._v(" "),
                                                _c(
                                                  "div",
                                                  {
                                                    staticClass:
                                                      "form-group compact",
                                                  },
                                                  [
                                                    _c(
                                                      "select",
                                                      {
                                                        directives: [
                                                          {
                                                            name: "model",
                                                            rawName: "v-model",
                                                            value:
                                                              _vm.memberPlanFilter,
                                                            expression:
                                                              "memberPlanFilter",
                                                          },
                                                        ],
                                                        staticClass:
                                                          "form-control compact",
                                                        on: {
                                                          change: [
                                                            function ($event) {
                                                              var $$selectedVal =
                                                                Array.prototype.filter
                                                                  .call(
                                                                    $event
                                                                      .target
                                                                      .options,
                                                                    function (
                                                                      o
                                                                    ) {
                                                                      return o.selected
                                                                    }
                                                                  )
                                                                  .map(
                                                                    function (
                                                                      o
                                                                    ) {
                                                                      var val =
                                                                        "_value" in
                                                                        o
                                                                          ? o._value
                                                                          : o.value
                                                                      return val
                                                                    }
                                                                  )
                                                              _vm.memberPlanFilter =
                                                                $event.target
                                                                  .multiple
                                                                  ? $$selectedVal
                                                                  : $$selectedVal[0]
                                                            },
                                                            _vm.filterAssignedMembers,
                                                          ],
                                                        },
                                                      },
                                                      [
                                                        _c(
                                                          "option",
                                                          {
                                                            attrs: {
                                                              value: "",
                                                            },
                                                          },
                                                          [_vm._v("All Plans")]
                                                        ),
                                                        _vm._v(" "),
                                                        _c(
                                                          "option",
                                                          {
                                                            attrs: {
                                                              value: "Basic",
                                                            },
                                                          },
                                                          [_vm._v("Basic")]
                                                        ),
                                                        _vm._v(" "),
                                                        _c(
                                                          "option",
                                                          {
                                                            attrs: {
                                                              value: "Premium",
                                                            },
                                                          },
                                                          [_vm._v("Premium")]
                                                        ),
                                                        _vm._v(" "),
                                                        _c(
                                                          "option",
                                                          {
                                                            attrs: {
                                                              value: "VIP",
                                                            },
                                                          },
                                                          [_vm._v("VIP")]
                                                        ),
                                                      ]
                                                    ),
                                                  ]
                                                ),
                                                _vm._v(" "),
                                                _c(
                                                  "div",
                                                  {
                                                    staticClass:
                                                      "form-group compact",
                                                  },
                                                  [
                                                    _c(
                                                      "div",
                                                      {
                                                        staticClass:
                                                          "form-check",
                                                      },
                                                      [
                                                        _c("input", {
                                                          directives: [
                                                            {
                                                              name: "model",
                                                              rawName:
                                                                "v-model",
                                                              value:
                                                                _vm.noMembershipFilter,
                                                              expression:
                                                                "noMembershipFilter",
                                                            },
                                                          ],
                                                          staticClass:
                                                            "form-check-input",
                                                          attrs: {
                                                            type: "checkbox",
                                                            id: "noMembershipFilter",
                                                          },
                                                          domProps: {
                                                            checked:
                                                              Array.isArray(
                                                                _vm.noMembershipFilter
                                                              )
                                                                ? _vm._i(
                                                                    _vm.noMembershipFilter,
                                                                    null
                                                                  ) > -1
                                                                : _vm.noMembershipFilter,
                                                          },
                                                          on: {
                                                            change: [
                                                              function (
                                                                $event
                                                              ) {
                                                                var $$a =
                                                                    _vm.noMembershipFilter,
                                                                  $$el =
                                                                    $event.target,
                                                                  $$c =
                                                                    $$el.checked
                                                                      ? true
                                                                      : false
                                                                if (
                                                                  Array.isArray(
                                                                    $$a
                                                                  )
                                                                ) {
                                                                  var $$v =
                                                                      null,
                                                                    $$i =
                                                                      _vm._i(
                                                                        $$a,
                                                                        $$v
                                                                      )
                                                                  if (
                                                                    $$el.checked
                                                                  ) {
                                                                    $$i < 0 &&
                                                                      (_vm.noMembershipFilter =
                                                                        $$a.concat(
                                                                          [$$v]
                                                                        ))
                                                                  } else {
                                                                    $$i > -1 &&
                                                                      (_vm.noMembershipFilter =
                                                                        $$a
                                                                          .slice(
                                                                            0,
                                                                            $$i
                                                                          )
                                                                          .concat(
                                                                            $$a.slice(
                                                                              $$i +
                                                                                1
                                                                            )
                                                                          ))
                                                                  }
                                                                } else {
                                                                  _vm.noMembershipFilter =
                                                                    $$c
                                                                }
                                                              },
                                                              _vm.handleNoMembershipFilterChange,
                                                            ],
                                                          },
                                                        }),
                                                        _vm._v(" "),
                                                        _c(
                                                          "label",
                                                          {
                                                            staticClass:
                                                              "form-check-label",
                                                            attrs: {
                                                              for: "noMembershipFilter",
                                                            },
                                                          },
                                                          [
                                                            _vm._v(
                                                              "\n                                                                        No Membership\n                                                                    "
                                                            ),
                                                          ]
                                                        ),
                                                      ]
                                                    ),
                                                  ]
                                                ),
                                              ]
                                            ),
                                          ]
                                        ),
                                        _vm._v(" "),
                                        _vm.isLoadingAssignedMembers
                                          ? _c(
                                              "div",
                                              {
                                                staticClass:
                                                  "loading-assigned-members",
                                              },
                                              [
                                                _vm._m(18),
                                                _vm._v(" "),
                                                _c("p", [
                                                  _vm._v(
                                                    "\n                                                            Loading assigned\n                                                            members...\n                                                        "
                                                  ),
                                                ]),
                                              ]
                                            )
                                          : _vm.filteredAssignedMembers
                                              .length === 0
                                          ? _c(
                                              "div",
                                              {
                                                staticClass:
                                                  "no-assigned-members",
                                              },
                                              [
                                                _c("i", {
                                                  staticClass: "fas fa-users",
                                                }),
                                                _vm._v(" "),
                                                _c("p", [
                                                  _vm._v(
                                                    "\n                                                            No members\n                                                            assigned to this\n                                                            coach\n                                                        "
                                                  ),
                                                ]),
                                              ]
                                            )
                                          : _vm.viewMode === "cards"
                                          ? _c(
                                              "div",
                                              {
                                                staticClass:
                                                  "assigned-members-grid compact",
                                              },
                                              _vm._l(
                                                _vm.filteredAssignedMembers,
                                                function (member) {
                                                  return _c(
                                                    "div",
                                                    {
                                                      key: member.id,
                                                      staticClass:
                                                        "assigned-coach-card compact",
                                                    },
                                                    [
                                                      _c(
                                                        "div",
                                                        {
                                                          staticClass:
                                                            "card-header",
                                                        },
                                                        [
                                                          _c(
                                                            "div",
                                                            {
                                                              staticClass:
                                                                "coach-avatar compact",
                                                            },
                                                            [
                                                              _c("img", {
                                                                staticClass:
                                                                  "coach-image compact",
                                                                attrs: {
                                                                  src: _vm.getMemberImageUrl(
                                                                    member.profile_image
                                                                  ),
                                                                  alt: member.name,
                                                                },
                                                              }),
                                                              _vm._v(" "),
                                                              _c("div", {
                                                                staticClass:
                                                                  "status-indicator",
                                                                class:
                                                                  _vm.getMemberStatusClass(
                                                                    member
                                                                  ),
                                                              }),
                                                            ]
                                                          ),
                                                          _vm._v(" "),
                                                          _c(
                                                            "div",
                                                            {
                                                              staticClass:
                                                                "member-info",
                                                            },
                                                            [
                                                              _c(
                                                                "h6",
                                                                {
                                                                  staticClass:
                                                                    "coach-name compact",
                                                                },
                                                                [
                                                                  _vm._v(
                                                                    _vm._s(
                                                                      member.name ||
                                                                        member.membername ||
                                                                        "N/A"
                                                                    )
                                                                  ),
                                                                ]
                                                              ),
                                                              _vm._v(" "),
                                                              _c(
                                                                "span",
                                                                {
                                                                  staticClass:
                                                                    "coach-id compact",
                                                                },
                                                                [
                                                                  _vm._v(
                                                                    _vm._s(
                                                                      _vm.getMemberId(
                                                                        member
                                                                      )
                                                                    )
                                                                  ),
                                                                ]
                                                              ),
                                                            ]
                                                          ),
                                                          _vm._v(" "),
                                                          _c(
                                                            "div",
                                                            {
                                                              staticClass:
                                                                "quick-actions",
                                                            },
                                                            [
                                                              _c(
                                                                "button",
                                                                {
                                                                  staticClass:
                                                                    "btn-icon",
                                                                  attrs: {
                                                                    title:
                                                                      "View Details",
                                                                  },
                                                                  on: {
                                                                    click:
                                                                      function (
                                                                        $event
                                                                      ) {
                                                                        return _vm.viewMemberDetails(
                                                                          member
                                                                        )
                                                                      },
                                                                  },
                                                                },
                                                                [
                                                                  _c("i", {
                                                                    staticClass:
                                                                      "fas fa-eye",
                                                                  }),
                                                                ]
                                                              ),
                                                              _vm._v(" "),
                                                              _c(
                                                                "button",
                                                                {
                                                                  staticClass:
                                                                    "btn-icon",
                                                                  attrs: {
                                                                    title:
                                                                      "Edit Member",
                                                                  },
                                                                  on: {
                                                                    click:
                                                                      function (
                                                                        $event
                                                                      ) {
                                                                        return _vm.editMember(
                                                                          member
                                                                        )
                                                                      },
                                                                  },
                                                                },
                                                                [
                                                                  _c("i", {
                                                                    staticClass:
                                                                      "fas fa-edit",
                                                                  }),
                                                                ]
                                                              ),
                                                            ]
                                                          ),
                                                        ]
                                                      ),
                                                      _vm._v(" "),
                                                      _c(
                                                        "div",
                                                        {
                                                          staticClass:
                                                            "card-body",
                                                        },
                                                        [
                                                          _c(
                                                            "div",
                                                            {
                                                              staticClass:
                                                                "info-grid",
                                                            },
                                                            [
                                                              _c(
                                                                "div",
                                                                {
                                                                  staticClass:
                                                                    "info-item",
                                                                },
                                                                [
                                                                  _c("i", {
                                                                    staticClass:
                                                                      "fas fa-envelope",
                                                                  }),
                                                                  _vm._v(" "),
                                                                  _c(
                                                                    "span",
                                                                    {
                                                                      staticClass:
                                                                        "clickable-text",
                                                                      attrs: {
                                                                        title:
                                                                          member.email ||
                                                                          "No email",
                                                                      },
                                                                      on: {
                                                                        click:
                                                                          function (
                                                                            $event
                                                                          ) {
                                                                            return _vm.copyToClipboard(
                                                                              member.email,
                                                                              "Email"
                                                                            )
                                                                          },
                                                                      },
                                                                    },
                                                                    [
                                                                      _vm._v(
                                                                        _vm._s(
                                                                          member.email ||
                                                                            "N/A"
                                                                        )
                                                                      ),
                                                                    ]
                                                                  ),
                                                                ]
                                                              ),
                                                              _vm._v(" "),
                                                              _c(
                                                                "div",
                                                                {
                                                                  staticClass:
                                                                    "info-item",
                                                                },
                                                                [
                                                                  _c("i", {
                                                                    staticClass:
                                                                      "fas fa-phone",
                                                                  }),
                                                                  _vm._v(" "),
                                                                  _c(
                                                                    "span",
                                                                    {
                                                                      staticClass:
                                                                        "clickable-text",
                                                                      attrs: {
                                                                        title:
                                                                          member.phone ||
                                                                          member.mobile_phone ||
                                                                          member.landline_phone ||
                                                                          "No phone",
                                                                      },
                                                                      on: {
                                                                        click:
                                                                          function (
                                                                            $event
                                                                          ) {
                                                                            return _vm.copyToClipboard(
                                                                              member.phone ||
                                                                                member.mobile_phone ||
                                                                                member.landline_phone,
                                                                              "Phone"
                                                                            )
                                                                          },
                                                                      },
                                                                    },
                                                                    [
                                                                      _vm._v(
                                                                        _vm._s(
                                                                          member.phone ||
                                                                            member.mobile_phone ||
                                                                            member.landline_phone ||
                                                                            "N/A"
                                                                        )
                                                                      ),
                                                                    ]
                                                                  ),
                                                                ]
                                                              ),
                                                              _vm._v(" "),
                                                              _c(
                                                                "div",
                                                                {
                                                                  staticClass:
                                                                    "info-item",
                                                                },
                                                                [
                                                                  _c("i", {
                                                                    staticClass:
                                                                      "fas fa-calendar-alt",
                                                                  }),
                                                                  _vm._v(" "),
                                                                  _c("span", [
                                                                    _vm._v(
                                                                      _vm._s(
                                                                        _vm.formatDate(
                                                                          member.join_date ||
                                                                            member.created_at ||
                                                                            member.joining_date ||
                                                                            member.date_joined ||
                                                                            member.registration_date ||
                                                                            member.member_since ||
                                                                            member.start_date ||
                                                                            member.enrollment_date
                                                                        )
                                                                      )
                                                                    ),
                                                                  ]),
                                                                ]
                                                              ),
                                                            ]
                                                          ),
                                                          _vm._v(" "),
                                                          _c(
                                                            "div",
                                                            {
                                                              staticClass:
                                                                "badges-row",
                                                            },
                                                            [
                                                              _c(
                                                                "span",
                                                                {
                                                                  staticClass:
                                                                    "plan-badge",
                                                                  class:
                                                                    _vm.getPlanClass(
                                                                      member
                                                                    ),
                                                                },
                                                                [
                                                                  _vm._v(
                                                                    _vm._s(
                                                                      _vm.getPlanDisplayText(
                                                                        member
                                                                      )
                                                                    )
                                                                  ),
                                                                ]
                                                              ),
                                                              _vm._v(" "),
                                                              _c(
                                                                "span",
                                                                {
                                                                  staticClass:
                                                                    "status-badge",
                                                                  class:
                                                                    _vm.getMemberStatusClass(
                                                                      member
                                                                    ),
                                                                },
                                                                [
                                                                  _vm._v(
                                                                    _vm._s(
                                                                      _vm.getMemberStatusText(
                                                                        member
                                                                      )
                                                                    )
                                                                  ),
                                                                ]
                                                              ),
                                                            ]
                                                          ),
                                                        ]
                                                      ),
                                                      _vm._v(" "),
                                                      _c(
                                                        "div",
                                                        {
                                                          staticClass:
                                                            "card-footer",
                                                        },
                                                        [
                                                          _c(
                                                            "button",
                                                            {
                                                              staticClass:
                                                                "btn btn-sm btn-outline-danger unassign-btn",
                                                              on: {
                                                                click:
                                                                  function (
                                                                    $event
                                                                  ) {
                                                                    return _vm.unassignMember(
                                                                      member
                                                                    )
                                                                  },
                                                              },
                                                            },
                                                            [
                                                              _c("i", {
                                                                staticClass:
                                                                  "fas fa-user-minus",
                                                              }),
                                                              _vm._v(
                                                                "\n                                                                    Unassign\n                                                                "
                                                              ),
                                                            ]
                                                          ),
                                                        ]
                                                      ),
                                                    ]
                                                  )
                                                }
                                              ),
                                              0
                                            )
                                          : _c(
                                              "div",
                                              {
                                                staticClass:
                                                  "table-responsive compact-table",
                                              },
                                              [
                                                _c(
                                                  "table",
                                                  {
                                                    staticClass:
                                                      "table table-hover assigned-members-table compact",
                                                  },
                                                  [
                                                    _vm._m(19),
                                                    _vm._v(" "),
                                                    _c(
                                                      "tbody",
                                                      _vm._l(
                                                        _vm.filteredAssignedMembers,
                                                        function (member) {
                                                          return _c(
                                                            "tr",
                                                            {
                                                              key: member.id,
                                                              staticClass:
                                                                "table-row compact",
                                                            },
                                                            [
                                                              _c("td", [
                                                                _c(
                                                                  "div",
                                                                  {
                                                                    staticClass:
                                                                      "coach-info compact",
                                                                  },
                                                                  [
                                                                    _c(
                                                                      "div",
                                                                      {
                                                                        staticClass:
                                                                          "coach-avatar compact",
                                                                      },
                                                                      [
                                                                        _c(
                                                                          "img",
                                                                          {
                                                                            staticClass:
                                                                              "coach-image compact",
                                                                            attrs:
                                                                              {
                                                                                src: _vm.getMemberImageUrl(
                                                                                  member.profile_image
                                                                                ),
                                                                                alt: member.name,
                                                                              },
                                                                          }
                                                                        ),
                                                                      ]
                                                                    ),
                                                                    _vm._v(" "),
                                                                    _c(
                                                                      "div",
                                                                      {
                                                                        staticClass:
                                                                          "coach-details compact",
                                                                      },
                                                                      [
                                                                        _c(
                                                                          "div",
                                                                          {
                                                                            staticClass:
                                                                              "coach-name compact",
                                                                          },
                                                                          [
                                                                            _vm._v(
                                                                              _vm._s(
                                                                                member.name ||
                                                                                  member.membername ||
                                                                                  "N/A"
                                                                              )
                                                                            ),
                                                                          ]
                                                                        ),
                                                                        _vm._v(
                                                                          " "
                                                                        ),
                                                                        _c(
                                                                          "div",
                                                                          {
                                                                            staticClass:
                                                                              "coach-gender compact",
                                                                          },
                                                                          [
                                                                            _vm._v(
                                                                              _vm._s(
                                                                                member.gender ||
                                                                                  member.sex ||
                                                                                  "N/A"
                                                                              )
                                                                            ),
                                                                          ]
                                                                        ),
                                                                      ]
                                                                    ),
                                                                  ]
                                                                ),
                                                              ]),
                                                              _vm._v(" "),
                                                              _c("td", [
                                                                _c(
                                                                  "span",
                                                                  {
                                                                    staticClass:
                                                                      "coach-id compact",
                                                                  },
                                                                  [
                                                                    _vm._v(
                                                                      _vm._s(
                                                                        _vm.getMemberId(
                                                                          member
                                                                        )
                                                                      )
                                                                    ),
                                                                  ]
                                                                ),
                                                              ]),
                                                              _vm._v(" "),
                                                              _c("td", [
                                                                _c(
                                                                  "div",
                                                                  {
                                                                    staticClass:
                                                                      "contact-info compact",
                                                                  },
                                                                  [
                                                                    _c(
                                                                      "div",
                                                                      {
                                                                        staticClass:
                                                                          "contact-item",
                                                                        attrs: {
                                                                          title:
                                                                            member.email ||
                                                                            "No email",
                                                                        },
                                                                        on: {
                                                                          click:
                                                                            function (
                                                                              $event
                                                                            ) {
                                                                              return _vm.copyToClipboard(
                                                                                member.email,
                                                                                "Email"
                                                                              )
                                                                            },
                                                                        },
                                                                      },
                                                                      [
                                                                        _c(
                                                                          "i",
                                                                          {
                                                                            staticClass:
                                                                              "fas fa-envelope",
                                                                          }
                                                                        ),
                                                                      ]
                                                                    ),
                                                                    _vm._v(" "),
                                                                    _c(
                                                                      "div",
                                                                      {
                                                                        staticClass:
                                                                          "contact-item",
                                                                        attrs: {
                                                                          title:
                                                                            member.phone ||
                                                                            member.mobile_phone ||
                                                                            member.landline_phone ||
                                                                            "No phone",
                                                                        },
                                                                        on: {
                                                                          click:
                                                                            function (
                                                                              $event
                                                                            ) {
                                                                              return _vm.copyToClipboard(
                                                                                member.phone ||
                                                                                  member.mobile_phone ||
                                                                                  member.landline_phone,
                                                                                "Phone"
                                                                              )
                                                                            },
                                                                        },
                                                                      },
                                                                      [
                                                                        _c(
                                                                          "i",
                                                                          {
                                                                            staticClass:
                                                                              "fas fa-phone",
                                                                          }
                                                                        ),
                                                                      ]
                                                                    ),
                                                                  ]
                                                                ),
                                                              ]),
                                                              _vm._v(" "),
                                                              _c("td", [
                                                                _c(
                                                                  "span",
                                                                  {
                                                                    staticClass:
                                                                      "coach-plan compact",
                                                                    class:
                                                                      _vm.getPlanClass(
                                                                        member
                                                                      ),
                                                                  },
                                                                  [
                                                                    _vm._v(
                                                                      _vm._s(
                                                                        _vm.getPlanDisplayText(
                                                                          member
                                                                        )
                                                                      )
                                                                    ),
                                                                  ]
                                                                ),
                                                              ]),
                                                              _vm._v(" "),
                                                              _c("td", [
                                                                _c(
                                                                  "span",
                                                                  {
                                                                    staticClass:
                                                                      "coach-status compact",
                                                                    class:
                                                                      _vm.getMemberStatusClass(
                                                                        member
                                                                      ),
                                                                  },
                                                                  [
                                                                    _vm._v(
                                                                      _vm._s(
                                                                        _vm.getMemberStatusText(
                                                                          member
                                                                        )
                                                                      )
                                                                    ),
                                                                  ]
                                                                ),
                                                              ]),
                                                              _vm._v(" "),
                                                              _c("td", [
                                                                _c(
                                                                  "span",
                                                                  {
                                                                    staticClass:
                                                                      "join-date compact",
                                                                  },
                                                                  [
                                                                    _vm._v(
                                                                      _vm._s(
                                                                        _vm.formatDate(
                                                                          member.join_date ||
                                                                            member.created_at ||
                                                                            member.joining_date ||
                                                                            member.date_joined ||
                                                                            member.registration_date ||
                                                                            member.member_since ||
                                                                            member.start_date ||
                                                                            member.enrollment_date
                                                                        )
                                                                      )
                                                                    ),
                                                                  ]
                                                                ),
                                                              ]),
                                                              _vm._v(" "),
                                                              _c("td", [
                                                                _c(
                                                                  "div",
                                                                  {
                                                                    staticClass:
                                                                      "coach-actions compact",
                                                                  },
                                                                  [
                                                                    _c(
                                                                      "button",
                                                                      {
                                                                        staticClass:
                                                                          "btn btn-sm btn-outline-info compact",
                                                                        attrs: {
                                                                          title:
                                                                            "View Details",
                                                                        },
                                                                        on: {
                                                                          click:
                                                                            function (
                                                                              $event
                                                                            ) {
                                                                              return _vm.viewMemberDetails(
                                                                                member
                                                                              )
                                                                            },
                                                                        },
                                                                      },
                                                                      [
                                                                        _c(
                                                                          "i",
                                                                          {
                                                                            staticClass:
                                                                              "fas fa-eye",
                                                                          }
                                                                        ),
                                                                      ]
                                                                    ),
                                                                    _vm._v(" "),
                                                                    _c(
                                                                      "button",
                                                                      {
                                                                        staticClass:
                                                                          "btn btn-sm btn-outline-primary compact",
                                                                        attrs: {
                                                                          title:
                                                                            "Edit Member",
                                                                        },
                                                                        on: {
                                                                          click:
                                                                            function (
                                                                              $event
                                                                            ) {
                                                                              return _vm.editMember(
                                                                                member
                                                                              )
                                                                            },
                                                                        },
                                                                      },
                                                                      [
                                                                        _c(
                                                                          "i",
                                                                          {
                                                                            staticClass:
                                                                              "fas fa-edit",
                                                                          }
                                                                        ),
                                                                      ]
                                                                    ),
                                                                    _vm._v(" "),
                                                                    _c(
                                                                      "button",
                                                                      {
                                                                        staticClass:
                                                                          "btn btn-sm btn-outline-warning compact",
                                                                        attrs: {
                                                                          title:
                                                                            "Unassign Member",
                                                                        },
                                                                        on: {
                                                                          click:
                                                                            function (
                                                                              $event
                                                                            ) {
                                                                              return _vm.unassignMember(
                                                                                member
                                                                              )
                                                                            },
                                                                        },
                                                                      },
                                                                      [
                                                                        _c(
                                                                          "i",
                                                                          {
                                                                            staticClass:
                                                                              "fas fa-user-minus",
                                                                          }
                                                                        ),
                                                                      ]
                                                                    ),
                                                                  ]
                                                                ),
                                                              ]),
                                                            ]
                                                          )
                                                        }
                                                      ),
                                                      0
                                                    ),
                                                  ]
                                                ),
                                              ]
                                            ),
                                      ]
                                    )
                                  : _vm._e(),
                                _vm._v(" "),
                                _vm.activeAction === "assignMember"
                                  ? _c(
                                      "div",
                                      {
                                        staticClass: "coach-assignment-section",
                                      },
                                      [
                                        _c(
                                          "div",
                                          { staticClass: "assignment-header" },
                                          [
                                            _vm._m(20),
                                            _vm._v(" "),
                                            _c(
                                              "button",
                                              {
                                                staticClass:
                                                  "btn btn-outline-secondary btn-sm close-btn",
                                                attrs: { title: "Close" },
                                                on: {
                                                  click: function ($event) {
                                                    _vm.activeAction = null
                                                  },
                                                },
                                              },
                                              [
                                                _c("i", {
                                                  staticClass: "fas fa-times",
                                                }),
                                                _vm._v(
                                                  "\n                                                            Close\n                                                        "
                                                ),
                                              ]
                                            ),
                                          ]
                                        ),
                                        _vm._v(" "),
                                        _vm.isLoadingMembers
                                          ? _c(
                                              "div",
                                              {
                                                staticClass: "loading-members",
                                              },
                                              [
                                                _vm._m(21),
                                                _vm._v(" "),
                                                _c("p", [
                                                  _vm._v(
                                                    "\n                                                            Loading\n                                                            available\n                                                            members...\n                                                        "
                                                  ),
                                                ]),
                                              ]
                                            )
                                          : _c("div", [
                                              _c(
                                                "div",
                                                {
                                                  staticClass:
                                                    "search-filter-section",
                                                },
                                                [
                                                  _c(
                                                    "div",
                                                    {
                                                      staticClass: "form-grid",
                                                    },
                                                    [
                                                      _c(
                                                        "div",
                                                        {
                                                          staticClass:
                                                            "form-group",
                                                        },
                                                        [
                                                          _c(
                                                            "label",
                                                            {
                                                              staticClass:
                                                                "form-label",
                                                            },
                                                            [
                                                              _vm._v(
                                                                "Search\n                                                                        Members"
                                                              ),
                                                            ]
                                                          ),
                                                          _vm._v(" "),
                                                          _c("input", {
                                                            directives: [
                                                              {
                                                                name: "model",
                                                                rawName:
                                                                  "v-model",
                                                                value:
                                                                  _vm.memberSearch,
                                                                expression:
                                                                  "memberSearch\n                                                                        ",
                                                              },
                                                            ],
                                                            staticClass:
                                                              "form-control",
                                                            attrs: {
                                                              type: "text",
                                                              placeholder:
                                                                "Search by name, email, or ID",
                                                            },
                                                            domProps: {
                                                              value:
                                                                _vm.memberSearch,
                                                            },
                                                            on: {
                                                              input: [
                                                                function (
                                                                  $event
                                                                ) {
                                                                  if (
                                                                    $event
                                                                      .target
                                                                      .composing
                                                                  ) {
                                                                    return
                                                                  }
                                                                  _vm.memberSearch =
                                                                    $event.target.value
                                                                },
                                                                _vm.filterMembers,
                                                              ],
                                                            },
                                                          }),
                                                        ]
                                                      ),
                                                      _vm._v(" "),
                                                      _c(
                                                        "div",
                                                        {
                                                          staticClass:
                                                            "form-group",
                                                        },
                                                        [
                                                          _c(
                                                            "label",
                                                            {
                                                              staticClass:
                                                                "form-label",
                                                            },
                                                            [
                                                              _vm._v(
                                                                "Status\n                                                                        Filter"
                                                              ),
                                                            ]
                                                          ),
                                                          _vm._v(" "),
                                                          _c(
                                                            "select",
                                                            {
                                                              directives: [
                                                                {
                                                                  name: "model",
                                                                  rawName:
                                                                    "v-model",
                                                                  value:
                                                                    _vm.memberStatusFilter,
                                                                  expression:
                                                                    "memberStatusFilter\n                                                                        ",
                                                                },
                                                              ],
                                                              staticClass:
                                                                "form-control",
                                                              on: {
                                                                change: [
                                                                  function (
                                                                    $event
                                                                  ) {
                                                                    var $$selectedVal =
                                                                      Array.prototype.filter
                                                                        .call(
                                                                          $event
                                                                            .target
                                                                            .options,
                                                                          function (
                                                                            o
                                                                          ) {
                                                                            return o.selected
                                                                          }
                                                                        )
                                                                        .map(
                                                                          function (
                                                                            o
                                                                          ) {
                                                                            var val =
                                                                              "_value" in
                                                                              o
                                                                                ? o._value
                                                                                : o.value
                                                                            return val
                                                                          }
                                                                        )
                                                                    _vm.memberStatusFilter =
                                                                      $event
                                                                        .target
                                                                        .multiple
                                                                        ? $$selectedVal
                                                                        : $$selectedVal[0]
                                                                  },
                                                                  _vm.filterMembers,
                                                                ],
                                                              },
                                                            },
                                                            [
                                                              _c(
                                                                "option",
                                                                {
                                                                  attrs: {
                                                                    value: "",
                                                                  },
                                                                },
                                                                [
                                                                  _vm._v(
                                                                    "\n                                                                            All\n                                                                            Status\n                                                                        "
                                                                  ),
                                                                ]
                                                              ),
                                                              _vm._v(" "),
                                                              _c(
                                                                "option",
                                                                {
                                                                  attrs: {
                                                                    value:
                                                                      "Active",
                                                                  },
                                                                },
                                                                [
                                                                  _vm._v(
                                                                    "\n                                                                            Active\n                                                                        "
                                                                  ),
                                                                ]
                                                              ),
                                                              _vm._v(" "),
                                                              _c(
                                                                "option",
                                                                {
                                                                  attrs: {
                                                                    value:
                                                                      "Inactive",
                                                                  },
                                                                },
                                                                [
                                                                  _vm._v(
                                                                    "\n                                                                            Inactive\n                                                                        "
                                                                  ),
                                                                ]
                                                              ),
                                                              _vm._v(" "),
                                                              _c(
                                                                "option",
                                                                {
                                                                  attrs: {
                                                                    value:
                                                                      "On Hold",
                                                                  },
                                                                },
                                                                [
                                                                  _vm._v(
                                                                    "\n                                                                            On\n                                                                            Hold\n                                                                        "
                                                                  ),
                                                                ]
                                                              ),
                                                            ]
                                                          ),
                                                        ]
                                                      ),
                                                      _vm._v(" "),
                                                      _c(
                                                        "div",
                                                        {
                                                          staticClass:
                                                            "form-group",
                                                        },
                                                        [
                                                          _c(
                                                            "label",
                                                            {
                                                              staticClass:
                                                                "form-label",
                                                            },
                                                            [
                                                              _vm._v(
                                                                "Plan\n                                                                        Filter"
                                                              ),
                                                            ]
                                                          ),
                                                          _vm._v(" "),
                                                          _c(
                                                            "select",
                                                            {
                                                              directives: [
                                                                {
                                                                  name: "model",
                                                                  rawName:
                                                                    "v-model",
                                                                  value:
                                                                    _vm.memberPlanFilter,
                                                                  expression:
                                                                    "memberPlanFilter\n                                                                        ",
                                                                },
                                                              ],
                                                              staticClass:
                                                                "form-control",
                                                              on: {
                                                                change: [
                                                                  function (
                                                                    $event
                                                                  ) {
                                                                    var $$selectedVal =
                                                                      Array.prototype.filter
                                                                        .call(
                                                                          $event
                                                                            .target
                                                                            .options,
                                                                          function (
                                                                            o
                                                                          ) {
                                                                            return o.selected
                                                                          }
                                                                        )
                                                                        .map(
                                                                          function (
                                                                            o
                                                                          ) {
                                                                            var val =
                                                                              "_value" in
                                                                              o
                                                                                ? o._value
                                                                                : o.value
                                                                            return val
                                                                          }
                                                                        )
                                                                    _vm.memberPlanFilter =
                                                                      $event
                                                                        .target
                                                                        .multiple
                                                                        ? $$selectedVal
                                                                        : $$selectedVal[0]
                                                                  },
                                                                  _vm.filterMembers,
                                                                ],
                                                              },
                                                            },
                                                            [
                                                              _c(
                                                                "option",
                                                                {
                                                                  attrs: {
                                                                    value: "",
                                                                  },
                                                                },
                                                                [
                                                                  _vm._v(
                                                                    "\n                                                                            All\n                                                                            Plans\n                                                                        "
                                                                  ),
                                                                ]
                                                              ),
                                                              _vm._v(" "),
                                                              _c(
                                                                "option",
                                                                {
                                                                  attrs: {
                                                                    value:
                                                                      "Basic",
                                                                  },
                                                                },
                                                                [
                                                                  _vm._v(
                                                                    "\n                                                                            Basic\n                                                                        "
                                                                  ),
                                                                ]
                                                              ),
                                                              _vm._v(" "),
                                                              _c(
                                                                "option",
                                                                {
                                                                  attrs: {
                                                                    value:
                                                                      "Premium",
                                                                  },
                                                                },
                                                                [
                                                                  _vm._v(
                                                                    "\n                                                                            Premium\n                                                                        "
                                                                  ),
                                                                ]
                                                              ),
                                                              _vm._v(" "),
                                                              _c(
                                                                "option",
                                                                {
                                                                  attrs: {
                                                                    value:
                                                                      "VIP",
                                                                  },
                                                                },
                                                                [
                                                                  _vm._v(
                                                                    "\n                                                                            VIP\n                                                                        "
                                                                  ),
                                                                ]
                                                              ),
                                                            ]
                                                          ),
                                                        ]
                                                      ),
                                                    ]
                                                  ),
                                                ]
                                              ),
                                              _vm._v(" "),
                                              _vm.selectedMembers.length > 0
                                                ? _c(
                                                    "div",
                                                    {
                                                      staticClass:
                                                        "bulk-actions",
                                                    },
                                                    [
                                                      _c(
                                                        "div",
                                                        {
                                                          staticClass:
                                                            "selected-count",
                                                        },
                                                        [
                                                          _vm._v(
                                                            "\n                                                                " +
                                                              _vm._s(
                                                                _vm
                                                                  .selectedMembers
                                                                  .length
                                                              ) +
                                                              "\n                                                                member(s)\n                                                                selected\n                                                            "
                                                          ),
                                                        ]
                                                      ),
                                                      _vm._v(" "),
                                                      _c(
                                                        "div",
                                                        {
                                                          staticClass:
                                                            "bulk-buttons",
                                                        },
                                                        [
                                                          _c(
                                                            "button",
                                                            {
                                                              staticClass:
                                                                "bulk-assign-btn",
                                                              attrs: {
                                                                disabled:
                                                                  _vm.isAssigningMember,
                                                              },
                                                              on: {
                                                                click:
                                                                  _vm.assignSelectedMembers,
                                                              },
                                                            },
                                                            [
                                                              _c("i", {
                                                                staticClass:
                                                                  "fas fa-user-plus",
                                                              }),
                                                              _vm._v(
                                                                "\n                                                                    Assign\n                                                                    Selected\n                                                                "
                                                              ),
                                                            ]
                                                          ),
                                                          _vm._v(" "),
                                                          _c(
                                                            "button",
                                                            {
                                                              staticClass:
                                                                "clear-selection-btn",
                                                              on: {
                                                                click:
                                                                  _vm.clearSelection,
                                                              },
                                                            },
                                                            [
                                                              _c("i", {
                                                                staticClass:
                                                                  "fas fa-times",
                                                              }),
                                                              _vm._v(
                                                                "\n                                                                    Clear\n                                                                    Selection\n                                                                "
                                                              ),
                                                            ]
                                                          ),
                                                        ]
                                                      ),
                                                    ]
                                                  )
                                                : _vm._e(),
                                              _vm._v(" "),
                                              _vm.safeFilteredMembers.length > 0
                                                ? _c(
                                                    "div",
                                                    {
                                                      staticClass:
                                                        "table-responsive",
                                                    },
                                                    [
                                                      _c(
                                                        "table",
                                                        {
                                                          staticClass:
                                                            "members-assignment-table",
                                                        },
                                                        [
                                                          _c("thead", [
                                                            _c("tr", [
                                                              _c(
                                                                "th",
                                                                {
                                                                  staticClass:
                                                                    "text-center",
                                                                },
                                                                [
                                                                  _c("input", {
                                                                    directives:
                                                                      [
                                                                        {
                                                                          name: "model",
                                                                          rawName:
                                                                            "v-model",
                                                                          value:
                                                                            _vm.selectAllMembers,
                                                                          expression:
                                                                            "selectAllMembers\n                                                                                ",
                                                                        },
                                                                      ],
                                                                    attrs: {
                                                                      type: "checkbox",
                                                                    },
                                                                    domProps: {
                                                                      checked:
                                                                        Array.isArray(
                                                                          _vm.selectAllMembers
                                                                        )
                                                                          ? _vm._i(
                                                                              _vm.selectAllMembers,
                                                                              null
                                                                            ) >
                                                                            -1
                                                                          : _vm.selectAllMembers,
                                                                    },
                                                                    on: {
                                                                      change: [
                                                                        function (
                                                                          $event
                                                                        ) {
                                                                          var $$a =
                                                                              _vm.selectAllMembers,
                                                                            $$el =
                                                                              $event.target,
                                                                            $$c =
                                                                              $$el.checked
                                                                                ? true
                                                                                : false
                                                                          if (
                                                                            Array.isArray(
                                                                              $$a
                                                                            )
                                                                          ) {
                                                                            var $$v =
                                                                                null,
                                                                              $$i =
                                                                                _vm._i(
                                                                                  $$a,
                                                                                  $$v
                                                                                )
                                                                            if (
                                                                              $$el.checked
                                                                            ) {
                                                                              $$i <
                                                                                0 &&
                                                                                (_vm.selectAllMembers =
                                                                                  $$a.concat(
                                                                                    [
                                                                                      $$v,
                                                                                    ]
                                                                                  ))
                                                                            } else {
                                                                              $$i >
                                                                                -1 &&
                                                                                (_vm.selectAllMembers =
                                                                                  $$a
                                                                                    .slice(
                                                                                      0,
                                                                                      $$i
                                                                                    )
                                                                                    .concat(
                                                                                      $$a.slice(
                                                                                        $$i +
                                                                                          1
                                                                                      )
                                                                                    ))
                                                                            }
                                                                          } else {
                                                                            _vm.selectAllMembers =
                                                                              $$c
                                                                          }
                                                                        },
                                                                        _vm.toggleSelectAllMembers,
                                                                      ],
                                                                    },
                                                                  }),
                                                                ]
                                                              ),
                                                              _vm._v(" "),
                                                              _c("th", [
                                                                _vm._v(
                                                                  "\n                                                                            Member\n                                                                        "
                                                                ),
                                                              ]),
                                                              _vm._v(" "),
                                                              _c("th", [
                                                                _vm._v(
                                                                  "\n                                                                            ID\n                                                                        "
                                                                ),
                                                              ]),
                                                              _vm._v(" "),
                                                              _c("th", [
                                                                _vm._v(
                                                                  "\n                                                                            Email\n                                                                        "
                                                                ),
                                                              ]),
                                                              _vm._v(" "),
                                                              _c("th", [
                                                                _vm._v(
                                                                  "\n                                                                            Phone\n                                                                        "
                                                                ),
                                                              ]),
                                                              _vm._v(" "),
                                                              _c("th", [
                                                                _vm._v(
                                                                  "\n                                                                            Plan\n                                                                        "
                                                                ),
                                                              ]),
                                                              _vm._v(" "),
                                                              _c("th", [
                                                                _vm._v(
                                                                  "\n                                                                            Status\n                                                                        "
                                                                ),
                                                              ]),
                                                              _vm._v(" "),
                                                              _c("th", [
                                                                _vm._v(
                                                                  "\n                                                                            Actions\n                                                                        "
                                                                ),
                                                              ]),
                                                            ]),
                                                          ]),
                                                          _vm._v(" "),
                                                          _c(
                                                            "tbody",
                                                            _vm._l(
                                                              _vm.safeFilteredMembers,
                                                              function (
                                                                member
                                                              ) {
                                                                return _c(
                                                                  "tr",
                                                                  {
                                                                    key: member.id,
                                                                    staticClass:
                                                                      "table-row",
                                                                  },
                                                                  [
                                                                    _c(
                                                                      "td",
                                                                      {
                                                                        staticClass:
                                                                          "table-cell text-center",
                                                                      },
                                                                      [
                                                                        _c(
                                                                          "input",
                                                                          {
                                                                            directives:
                                                                              [
                                                                                {
                                                                                  name: "model",
                                                                                  rawName:
                                                                                    "v-model",
                                                                                  value:
                                                                                    member.selected,
                                                                                  expression:
                                                                                    "member.selected\n                                                                                ",
                                                                                },
                                                                              ],
                                                                            attrs:
                                                                              {
                                                                                type: "checkbox",
                                                                              },
                                                                            domProps:
                                                                              {
                                                                                checked:
                                                                                  Array.isArray(
                                                                                    member.selected
                                                                                  )
                                                                                    ? _vm._i(
                                                                                        member.selected,
                                                                                        null
                                                                                      ) >
                                                                                      -1
                                                                                    : member.selected,
                                                                              },
                                                                            on: {
                                                                              change:
                                                                                function (
                                                                                  $event
                                                                                ) {
                                                                                  var $$a =
                                                                                      member.selected,
                                                                                    $$el =
                                                                                      $event.target,
                                                                                    $$c =
                                                                                      $$el.checked
                                                                                        ? true
                                                                                        : false
                                                                                  if (
                                                                                    Array.isArray(
                                                                                      $$a
                                                                                    )
                                                                                  ) {
                                                                                    var $$v =
                                                                                        null,
                                                                                      $$i =
                                                                                        _vm._i(
                                                                                          $$a,
                                                                                          $$v
                                                                                        )
                                                                                    if (
                                                                                      $$el.checked
                                                                                    ) {
                                                                                      $$i <
                                                                                        0 &&
                                                                                        _vm.$set(
                                                                                          member,
                                                                                          "selected",
                                                                                          $$a.concat(
                                                                                            [
                                                                                              $$v,
                                                                                            ]
                                                                                          )
                                                                                        )
                                                                                    } else {
                                                                                      $$i >
                                                                                        -1 &&
                                                                                        _vm.$set(
                                                                                          member,
                                                                                          "selected",
                                                                                          $$a
                                                                                            .slice(
                                                                                              0,
                                                                                              $$i
                                                                                            )
                                                                                            .concat(
                                                                                              $$a.slice(
                                                                                                $$i +
                                                                                                  1
                                                                                              )
                                                                                            )
                                                                                        )
                                                                                    }
                                                                                  } else {
                                                                                    _vm.$set(
                                                                                      member,
                                                                                      "selected",
                                                                                      $$c
                                                                                    )
                                                                                  }
                                                                                },
                                                                            },
                                                                          }
                                                                        ),
                                                                      ]
                                                                    ),
                                                                    _vm._v(" "),
                                                                    _c(
                                                                      "td",
                                                                      {
                                                                        staticClass:
                                                                          "table-cell",
                                                                      },
                                                                      [
                                                                        _c(
                                                                          "div",
                                                                          {
                                                                            staticClass:
                                                                              "coach-avatar",
                                                                          },
                                                                          [
                                                                            _c(
                                                                              "img",
                                                                              {
                                                                                staticClass:
                                                                                  "coach-image",
                                                                                attrs:
                                                                                  {
                                                                                    src: _vm.getMemberImageUrl(
                                                                                      member.profile_image
                                                                                    ),
                                                                                    alt: member.name,
                                                                                  },
                                                                              }
                                                                            ),
                                                                            _vm._v(
                                                                              " "
                                                                            ),
                                                                            _c(
                                                                              "div",
                                                                              {
                                                                                staticClass:
                                                                                  "coach-info",
                                                                              },
                                                                              [
                                                                                _c(
                                                                                  "div",
                                                                                  {
                                                                                    staticClass:
                                                                                      "coach-name",
                                                                                  },
                                                                                  [
                                                                                    _vm._v(
                                                                                      "\n                                                                                        " +
                                                                                        _vm._s(
                                                                                          member.name
                                                                                        ) +
                                                                                        "\n                                                                                    "
                                                                                    ),
                                                                                  ]
                                                                                ),
                                                                              ]
                                                                            ),
                                                                          ]
                                                                        ),
                                                                      ]
                                                                    ),
                                                                    _vm._v(" "),
                                                                    _c(
                                                                      "td",
                                                                      {
                                                                        staticClass:
                                                                          "table-cell",
                                                                      },
                                                                      [
                                                                        _c(
                                                                          "span",
                                                                          {
                                                                            staticClass:
                                                                              "coach-id",
                                                                          },
                                                                          [
                                                                            _vm._v(
                                                                              _vm._s(
                                                                                _vm.getMemberId(
                                                                                  member
                                                                                )
                                                                              )
                                                                            ),
                                                                          ]
                                                                        ),
                                                                      ]
                                                                    ),
                                                                    _vm._v(" "),
                                                                    _c(
                                                                      "td",
                                                                      {
                                                                        staticClass:
                                                                          "table-cell",
                                                                      },
                                                                      [
                                                                        _c(
                                                                          "div",
                                                                          {
                                                                            staticClass:
                                                                              "coach-email",
                                                                          },
                                                                          [
                                                                            _vm._v(
                                                                              "\n                                                                                " +
                                                                                _vm._s(
                                                                                  member.email
                                                                                ) +
                                                                                "\n                                                                            "
                                                                            ),
                                                                          ]
                                                                        ),
                                                                      ]
                                                                    ),
                                                                    _vm._v(" "),
                                                                    _c(
                                                                      "td",
                                                                      {
                                                                        staticClass:
                                                                          "table-cell",
                                                                      },
                                                                      [
                                                                        _c(
                                                                          "div",
                                                                          {
                                                                            staticClass:
                                                                              "coach-phone",
                                                                          },
                                                                          [
                                                                            _vm._v(
                                                                              "\n                                                                                " +
                                                                                _vm._s(
                                                                                  member.phone
                                                                                ) +
                                                                                "\n                                                                            "
                                                                            ),
                                                                          ]
                                                                        ),
                                                                      ]
                                                                    ),
                                                                    _vm._v(" "),
                                                                    _c(
                                                                      "td",
                                                                      {
                                                                        staticClass:
                                                                          "table-cell",
                                                                      },
                                                                      [
                                                                        _c(
                                                                          "span",
                                                                          {
                                                                            staticClass:
                                                                              "coach-plan",
                                                                            class:
                                                                              _vm.getPlanClass(
                                                                                member
                                                                              ),
                                                                          },
                                                                          [
                                                                            _vm._v(
                                                                              "\n                                                                                " +
                                                                                _vm._s(
                                                                                  _vm.getPlanDisplayText(
                                                                                    member
                                                                                  )
                                                                                ) +
                                                                                "\n                                                                            "
                                                                            ),
                                                                          ]
                                                                        ),
                                                                      ]
                                                                    ),
                                                                    _vm._v(" "),
                                                                    _c(
                                                                      "td",
                                                                      {
                                                                        staticClass:
                                                                          "table-cell",
                                                                      },
                                                                      [
                                                                        _c(
                                                                          "span",
                                                                          {
                                                                            staticClass:
                                                                              "coach-status",
                                                                            class:
                                                                              _vm.getMemberStatusClass(
                                                                                member
                                                                              ),
                                                                          },
                                                                          [
                                                                            _vm._v(
                                                                              "\n                                                                                " +
                                                                                _vm._s(
                                                                                  _vm.getMemberStatusText(
                                                                                    member
                                                                                  )
                                                                                ) +
                                                                                "\n                                                                            "
                                                                            ),
                                                                          ]
                                                                        ),
                                                                      ]
                                                                    ),
                                                                    _vm._v(" "),
                                                                    _c(
                                                                      "td",
                                                                      {
                                                                        staticClass:
                                                                          "table-cell",
                                                                      },
                                                                      [
                                                                        !member.isAssigned
                                                                          ? _c(
                                                                              "button",
                                                                              {
                                                                                staticClass:
                                                                                  "assign-coach-btn",
                                                                                attrs:
                                                                                  {
                                                                                    disabled:
                                                                                      _vm.isAssigningMember,
                                                                                  },
                                                                                on: {
                                                                                  click:
                                                                                    function (
                                                                                      $event
                                                                                    ) {
                                                                                      return _vm.assignMember(
                                                                                        member
                                                                                      )
                                                                                    },
                                                                                },
                                                                              },
                                                                              [
                                                                                _c(
                                                                                  "i",
                                                                                  {
                                                                                    staticClass:
                                                                                      "fas fa-user-plus",
                                                                                  }
                                                                                ),
                                                                                _vm._v(
                                                                                  "\n                                                                                Assign\n                                                                            "
                                                                                ),
                                                                              ]
                                                                            )
                                                                          : _c(
                                                                              "button",
                                                                              {
                                                                                staticClass:
                                                                                  "unassign-coach-btn",
                                                                                attrs:
                                                                                  {
                                                                                    disabled:
                                                                                      _vm.isAssigningMember,
                                                                                  },
                                                                                on: {
                                                                                  click:
                                                                                    function (
                                                                                      $event
                                                                                    ) {
                                                                                      return _vm.unassignMember(
                                                                                        member
                                                                                      )
                                                                                    },
                                                                                },
                                                                              },
                                                                              [
                                                                                _c(
                                                                                  "i",
                                                                                  {
                                                                                    staticClass:
                                                                                      "fas fa-user-minus",
                                                                                  }
                                                                                ),
                                                                                _vm._v(
                                                                                  "\n                                                                                Unassign\n                                                                            "
                                                                                ),
                                                                              ]
                                                                            ),
                                                                      ]
                                                                    ),
                                                                  ]
                                                                )
                                                              }
                                                            ),
                                                            0
                                                          ),
                                                        ]
                                                      ),
                                                    ]
                                                  )
                                                : _vm._e(),
                                              _vm._v(" "),
                                              _vm.filteredMembers.length === 0
                                                ? _c(
                                                    "div",
                                                    {
                                                      staticClass:
                                                        "no-members-message",
                                                    },
                                                    [
                                                      _c("i", {
                                                        staticClass:
                                                          "fas fa-users",
                                                      }),
                                                      _vm._v(" "),
                                                      _c("p", [
                                                        _vm._v(
                                                          "\n                                                                No members\n                                                                found\n                                                                matching\n                                                                your\n                                                                criteria\n                                                            "
                                                        ),
                                                      ]),
                                                    ]
                                                  )
                                                : _vm._e(),
                                            ]),
                                      ]
                                    )
                                  : _vm._e(),
                              ]),
                            ])
                          : _vm._e(),
                        _vm._v(" "),
                        _vm.activeTab === "latestActivities"
                          ? _c("div", [
                              _c("div", { staticClass: "tab-header" }, [
                                _c("h4", { staticClass: "tab-title" }, [
                                  _vm._v(
                                    "\n                                                    Latest Activities\n                                                "
                                  ),
                                ]),
                                _vm._v(" "),
                                _c("div", { staticClass: "header-actions" }, [
                                  _c(
                                    "button",
                                    {
                                      staticClass:
                                        "btn btn-outline-primary btn-sm",
                                      attrs: {
                                        disabled: _vm.isLoadingActivities,
                                      },
                                      on: { click: _vm.fetchCoachActivities },
                                    },
                                    [
                                      _c("i", {
                                        staticClass: "fas fa-sync",
                                        class: {
                                          "fa-spin": _vm.isLoadingActivities,
                                        },
                                      }),
                                      _vm._v(
                                        "\n                                                        Refresh\n                                                    "
                                      ),
                                    ]
                                  ),
                                ]),
                              ]),
                              _vm._v(" "),
                              _c("div", { staticClass: "tab-content-body" }, [
                                _vm.isLoadingActivities
                                  ? _c(
                                      "div",
                                      { staticClass: "text-center py-4" },
                                      [
                                        _vm._m(22),
                                        _vm._v(" "),
                                        _c(
                                          "p",
                                          { staticClass: "mt-2 text-muted" },
                                          [_vm._v("Loading activities...")]
                                        ),
                                      ]
                                    )
                                  : _vm.activities.length > 0
                                  ? _c(
                                      "div",
                                      { staticClass: "activities-list" },
                                      _vm._l(
                                        _vm.activities,
                                        function (activity, index) {
                                          return _c(
                                            "div",
                                            {
                                              key: index,
                                              staticClass: "activity-item",
                                            },
                                            [
                                              _c(
                                                "div",
                                                {
                                                  staticClass: "activity-icon",
                                                },
                                                [
                                                  _c("i", {
                                                    class:
                                                      "fas fa-" +
                                                      activity.icon +
                                                      " text-" +
                                                      activity.icon_color,
                                                  }),
                                                ]
                                              ),
                                              _vm._v(" "),
                                              _c(
                                                "div",
                                                {
                                                  staticClass:
                                                    "activity-content",
                                                },
                                                [
                                                  _c(
                                                    "div",
                                                    {
                                                      staticClass:
                                                        "activity-title",
                                                    },
                                                    [
                                                      _vm._v(
                                                        _vm._s(activity.title)
                                                      ),
                                                    ]
                                                  ),
                                                  _vm._v(" "),
                                                  _c(
                                                    "div",
                                                    {
                                                      staticClass:
                                                        "activity-description",
                                                    },
                                                    [
                                                      _vm._v(
                                                        _vm._s(
                                                          activity.description
                                                        )
                                                      ),
                                                    ]
                                                  ),
                                                  _vm._v(" "),
                                                  _c(
                                                    "div",
                                                    {
                                                      staticClass:
                                                        "activity-time",
                                                    },
                                                    [
                                                      _vm._v(
                                                        _vm._s(
                                                          activity.time_ago
                                                        )
                                                      ),
                                                    ]
                                                  ),
                                                ]
                                              ),
                                            ]
                                          )
                                        }
                                      ),
                                      0
                                    )
                                  : _c("div", { staticClass: "empty-state" }, [
                                      _vm._m(23),
                                      _vm._v(" "),
                                      _c(
                                        "h5",
                                        { staticClass: "empty-state-title" },
                                        [_vm._v("No Activities Found")]
                                      ),
                                      _vm._v(" "),
                                      _c(
                                        "p",
                                        { staticClass: "empty-state-text" },
                                        [
                                          _vm._v(
                                            "There are no recent activities for this coach."
                                          ),
                                        ]
                                      ),
                                    ]),
                              ]),
                            ])
                          : _vm._e(),
                        _vm._v(" "),
                        _vm.activeTab === "schedule"
                          ? _c("div", [_vm._m(24), _vm._v(" "), _vm._m(25)])
                          : _vm._e(),
                        _vm._v(" "),
                        _vm.activeTab === "workout"
                          ? _c("div", [_vm._m(26), _vm._v(" "), _vm._m(27)])
                          : _vm._e(),
                        _vm._v(" "),
                        _vm.activeTab === "nutrition"
                          ? _c("div", [_vm._m(28), _vm._v(" "), _vm._m(29)])
                          : _vm._e(),
                        _vm._v(" "),
                        _vm.activeTab === "Meal Plan"
                          ? _c("div", [_vm._m(30), _vm._v(" "), _vm._m(31)])
                          : _vm._e(),
                        _vm._v(" "),
                        _vm.activeTab === "Challenge"
                          ? _c("div", [_vm._m(32), _vm._v(" "), _vm._m(33)])
                          : _vm._e(),
                        _vm._v(" "),
                        _vm.activeTab === "settings"
                          ? _c("div", [
                              _vm._m(34),
                              _vm._v(" "),
                              _c("div", { staticClass: "tab-content-body" }, [
                                _c("div", { staticClass: "settings-grid" }, [
                                  _vm._m(35),
                                  _vm._v(" "),
                                  _c(
                                    "div",
                                    { staticClass: "settings-section" },
                                    [
                                      _c(
                                        "h5",
                                        { staticClass: "settings-title" },
                                        [_vm._v("Privacy Settings")]
                                      ),
                                      _vm._v(" "),
                                      _c("div", { staticClass: "form-group" }, [
                                        _c(
                                          "div",
                                          { staticClass: "form-check" },
                                          [
                                            _c("input", {
                                              directives: [
                                                {
                                                  name: "model",
                                                  rawName: "v-model",
                                                  value:
                                                    _vm.settings.profileVisible,
                                                  expression:
                                                    "settings.profileVisible",
                                                },
                                              ],
                                              staticClass: "form-check-input",
                                              attrs: {
                                                type: "checkbox",
                                                id: "coach-profile-visible",
                                              },
                                              domProps: {
                                                checked: Array.isArray(
                                                  _vm.settings.profileVisible
                                                )
                                                  ? _vm._i(
                                                      _vm.settings
                                                        .profileVisible,
                                                      null
                                                    ) > -1
                                                  : _vm.settings.profileVisible,
                                              },
                                              on: {
                                                change: function ($event) {
                                                  var $$a =
                                                      _vm.settings
                                                        .profileVisible,
                                                    $$el = $event.target,
                                                    $$c = $$el.checked
                                                      ? true
                                                      : false
                                                  if (Array.isArray($$a)) {
                                                    var $$v = null,
                                                      $$i = _vm._i($$a, $$v)
                                                    if ($$el.checked) {
                                                      $$i < 0 &&
                                                        _vm.$set(
                                                          _vm.settings,
                                                          "profileVisible",
                                                          $$a.concat([$$v])
                                                        )
                                                    } else {
                                                      $$i > -1 &&
                                                        _vm.$set(
                                                          _vm.settings,
                                                          "profileVisible",
                                                          $$a
                                                            .slice(0, $$i)
                                                            .concat(
                                                              $$a.slice($$i + 1)
                                                            )
                                                        )
                                                    }
                                                  } else {
                                                    _vm.$set(
                                                      _vm.settings,
                                                      "profileVisible",
                                                      $$c
                                                    )
                                                  }
                                                },
                                              },
                                            }),
                                            _vm._v(" "),
                                            _c(
                                              "label",
                                              {
                                                staticClass: "form-check-label",
                                                attrs: {
                                                  for: "coach-profile-visible",
                                                },
                                              },
                                              [
                                                _vm._v(
                                                  "\n                                                                    Make profile visible to members\n                                                                "
                                                ),
                                              ]
                                            ),
                                          ]
                                        ),
                                      ]),
                                      _vm._v(" "),
                                      _c("div", { staticClass: "form-group" }, [
                                        _c(
                                          "div",
                                          { staticClass: "form-check" },
                                          [
                                            _c("input", {
                                              directives: [
                                                {
                                                  name: "model",
                                                  rawName: "v-model",
                                                  value:
                                                    _vm.settings.contactVisible,
                                                  expression:
                                                    "settings.contactVisible",
                                                },
                                              ],
                                              staticClass: "form-check-input",
                                              attrs: {
                                                type: "checkbox",
                                                id: "coach-contact-visible",
                                              },
                                              domProps: {
                                                checked: Array.isArray(
                                                  _vm.settings.contactVisible
                                                )
                                                  ? _vm._i(
                                                      _vm.settings
                                                        .contactVisible,
                                                      null
                                                    ) > -1
                                                  : _vm.settings.contactVisible,
                                              },
                                              on: {
                                                change: function ($event) {
                                                  var $$a =
                                                      _vm.settings
                                                        .contactVisible,
                                                    $$el = $event.target,
                                                    $$c = $$el.checked
                                                      ? true
                                                      : false
                                                  if (Array.isArray($$a)) {
                                                    var $$v = null,
                                                      $$i = _vm._i($$a, $$v)
                                                    if ($$el.checked) {
                                                      $$i < 0 &&
                                                        _vm.$set(
                                                          _vm.settings,
                                                          "contactVisible",
                                                          $$a.concat([$$v])
                                                        )
                                                    } else {
                                                      $$i > -1 &&
                                                        _vm.$set(
                                                          _vm.settings,
                                                          "contactVisible",
                                                          $$a
                                                            .slice(0, $$i)
                                                            .concat(
                                                              $$a.slice($$i + 1)
                                                            )
                                                        )
                                                    }
                                                  } else {
                                                    _vm.$set(
                                                      _vm.settings,
                                                      "contactVisible",
                                                      $$c
                                                    )
                                                  }
                                                },
                                              },
                                            }),
                                            _vm._v(" "),
                                            _c(
                                              "label",
                                              {
                                                staticClass: "form-check-label",
                                                attrs: {
                                                  for: "coach-contact-visible",
                                                },
                                              },
                                              [
                                                _vm._v(
                                                  "\n                                                                    Show contact information\n                                                                "
                                                ),
                                              ]
                                            ),
                                          ]
                                        ),
                                      ]),
                                    ]
                                  ),
                                ]),
                              ]),
                            ])
                          : _vm._e(),
                        _vm._v(" "),
                        _vm.activeTab === "notes"
                          ? _c("div", [
                              _c("div", { staticClass: "notes-content" }, [
                                _c("div", { staticClass: "add-note-section" }, [
                                  _c("h5", { staticClass: "section-title" }, [
                                    _vm._v("Add new note"),
                                  ]),
                                  _vm._v(" "),
                                  _c("div", { staticClass: "note-form" }, [
                                    _c("div", { staticClass: "form-group" }, [
                                      _c(
                                        "label",
                                        { staticClass: "form-label" },
                                        [_vm._v("Note")]
                                      ),
                                      _vm._v(" "),
                                      _c("textarea", {
                                        directives: [
                                          {
                                            name: "model",
                                            rawName: "v-model",
                                            value: _vm.newNote.text,
                                            expression: "newNote.text",
                                          },
                                        ],
                                        staticClass:
                                          "form-control note-textarea",
                                        attrs: {
                                          placeholder:
                                            "Enter your note here...",
                                          rows: "4",
                                        },
                                        domProps: { value: _vm.newNote.text },
                                        on: {
                                          input: function ($event) {
                                            if ($event.target.composing) {
                                              return
                                            }
                                            _vm.$set(
                                              _vm.newNote,
                                              "text",
                                              $event.target.value
                                            )
                                          },
                                        },
                                      }),
                                    ]),
                                    _vm._v(" "),
                                    _c("div", { staticClass: "form-group" }, [
                                      _c(
                                        "label",
                                        { staticClass: "form-label" },
                                        [_vm._v("Category")]
                                      ),
                                      _vm._v(" "),
                                      _c(
                                        "select",
                                        {
                                          directives: [
                                            {
                                              name: "model",
                                              rawName: "v-model",
                                              value: _vm.newNote.category,
                                              expression: "newNote.category",
                                            },
                                          ],
                                          staticClass: "form-control",
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
                                                _vm.newNote,
                                                "category",
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
                                            { attrs: { value: "General" } },
                                            [_vm._v("General")]
                                          ),
                                          _vm._v(" "),
                                          _c(
                                            "option",
                                            { attrs: { value: "Check_in" } },
                                            [_vm._v("Check In")]
                                          ),
                                          _vm._v(" "),
                                          _c(
                                            "option",
                                            { attrs: { value: "Coaching" } },
                                            [_vm._v("Coaching")]
                                          ),
                                          _vm._v(" "),
                                          _c(
                                            "option",
                                            { attrs: { value: "Invoices" } },
                                            [_vm._v("Invoices")]
                                          ),
                                          _vm._v(" "),
                                          _c(
                                            "option",
                                            { attrs: { value: "Files" } },
                                            [_vm._v("Files")]
                                          ),
                                          _vm._v(" "),
                                          _c(
                                            "option",
                                            { attrs: { value: "Nutrition" } },
                                            [_vm._v("Nutrition")]
                                          ),
                                          _vm._v(" "),
                                          _c(
                                            "option",
                                            { attrs: { value: "Workout" } },
                                            [_vm._v("Workout")]
                                          ),
                                          _vm._v(" "),
                                          _c(
                                            "option",
                                            {
                                              attrs: {
                                                value: "member check-up",
                                              },
                                            },
                                            [_vm._v("Member Check-up")]
                                          ),
                                          _vm._v(" "),
                                          _c(
                                            "option",
                                            { attrs: { value: "other" } },
                                            [_vm._v("Other")]
                                          ),
                                        ]
                                      ),
                                    ]),
                                    _vm._v(" "),
                                    _c("div", { staticClass: "form-group" }, [
                                      _c("div", { staticClass: "form-check" }, [
                                        _c("input", {
                                          directives: [
                                            {
                                              name: "model",
                                              rawName: "v-model",
                                              value: _vm.newNote.is_shared,
                                              expression: "newNote.is_shared",
                                            },
                                          ],
                                          staticClass: "form-check-input",
                                          attrs: {
                                            type: "checkbox",
                                            id: "noteIsShared",
                                          },
                                          domProps: {
                                            checked: Array.isArray(
                                              _vm.newNote.is_shared
                                            )
                                              ? _vm._i(
                                                  _vm.newNote.is_shared,
                                                  null
                                                ) > -1
                                              : _vm.newNote.is_shared,
                                          },
                                          on: {
                                            change: function ($event) {
                                              var $$a = _vm.newNote.is_shared,
                                                $$el = $event.target,
                                                $$c = $$el.checked
                                                  ? true
                                                  : false
                                              if (Array.isArray($$a)) {
                                                var $$v = null,
                                                  $$i = _vm._i($$a, $$v)
                                                if ($$el.checked) {
                                                  $$i < 0 &&
                                                    _vm.$set(
                                                      _vm.newNote,
                                                      "is_shared",
                                                      $$a.concat([$$v])
                                                    )
                                                } else {
                                                  $$i > -1 &&
                                                    _vm.$set(
                                                      _vm.newNote,
                                                      "is_shared",
                                                      $$a
                                                        .slice(0, $$i)
                                                        .concat(
                                                          $$a.slice($$i + 1)
                                                        )
                                                    )
                                                }
                                              } else {
                                                _vm.$set(
                                                  _vm.newNote,
                                                  "is_shared",
                                                  $$c
                                                )
                                              }
                                            },
                                          },
                                        }),
                                        _vm._v(" "),
                                        _c(
                                          "label",
                                          {
                                            staticClass: "form-check-label",
                                            attrs: { for: "noteIsShared" },
                                          },
                                          [
                                            _vm._v(
                                              "\n                                                                    Share with coach\n                                                                "
                                            ),
                                          ]
                                        ),
                                        _vm._v(" "),
                                        _c(
                                          "small",
                                          {
                                            staticClass:
                                              "form-text text-muted d-block mt-1",
                                          },
                                          [
                                            _vm._v(
                                              "\n                                                                    If checked, this note will be visible to the coach\n                                                                "
                                            ),
                                          ]
                                        ),
                                      ]),
                                    ]),
                                    _vm._v(" "),
                                    _c(
                                      "button",
                                      {
                                        staticClass:
                                          "btn btn-primary save-note-btn",
                                        attrs: { disabled: _vm.loadingNotes },
                                        on: { click: _vm.saveNote },
                                      },
                                      [
                                        _vm.loadingNotes
                                          ? _c("span", [
                                              _c("i", {
                                                staticClass:
                                                  "fas fa-spinner fa-spin",
                                              }),
                                              _vm._v(
                                                " Saving...\n                                                            "
                                              ),
                                            ])
                                          : _c("span", [
                                              _vm._v(
                                                "\n                                                                " +
                                                  _vm._s(
                                                    _vm.editingNoteId
                                                      ? "Update note"
                                                      : "Save note"
                                                  ) +
                                                  "\n                                                            "
                                              ),
                                            ]),
                                      ]
                                    ),
                                    _vm._v(" "),
                                    _vm.editingNoteId
                                      ? _c(
                                          "button",
                                          {
                                            staticClass:
                                              "btn btn-secondary ml-2",
                                            on: {
                                              click: function ($event) {
                                                _vm.editingNoteId = null
                                                _vm.newNote.text = ""
                                                _vm.newNote.category = "General"
                                                _vm.newNote.is_shared = false
                                              },
                                            },
                                          },
                                          [
                                            _vm._v(
                                              "\n                                                            Cancel\n                                                        "
                                            ),
                                          ]
                                        )
                                      : _vm._e(),
                                  ]),
                                ]),
                                _vm._v(" "),
                                _c("div", { staticClass: "overview-section" }, [
                                  _c(
                                    "div",
                                    { staticClass: "overview-header" },
                                    [
                                      _c(
                                        "h5",
                                        { staticClass: "section-title" },
                                        [_vm._v("Overview")]
                                      ),
                                      _vm._v(" "),
                                      _c(
                                        "select",
                                        {
                                          directives: [
                                            {
                                              name: "model",
                                              rawName: "v-model",
                                              value: _vm.selectedCategory,
                                              expression: "selectedCategory",
                                            },
                                          ],
                                          staticClass:
                                            "form-control category-filter",
                                          on: {
                                            change: [
                                              function ($event) {
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
                                                _vm.selectedCategory = $event
                                                  .target.multiple
                                                  ? $$selectedVal
                                                  : $$selectedVal[0]
                                              },
                                              _vm.loadNotes,
                                            ],
                                          },
                                        },
                                        [
                                          _c(
                                            "option",
                                            { attrs: { value: "All" } },
                                            [_vm._v("All")]
                                          ),
                                          _vm._v(" "),
                                          _c(
                                            "option",
                                            { attrs: { value: "General" } },
                                            [_vm._v("General")]
                                          ),
                                          _vm._v(" "),
                                          _c(
                                            "option",
                                            { attrs: { value: "Check_in" } },
                                            [_vm._v("Check In")]
                                          ),
                                          _vm._v(" "),
                                          _c(
                                            "option",
                                            { attrs: { value: "Coaching" } },
                                            [_vm._v("Coaching")]
                                          ),
                                          _vm._v(" "),
                                          _c(
                                            "option",
                                            { attrs: { value: "Invoices" } },
                                            [_vm._v("Invoices")]
                                          ),
                                          _vm._v(" "),
                                          _c(
                                            "option",
                                            { attrs: { value: "Files" } },
                                            [_vm._v("Files")]
                                          ),
                                          _vm._v(" "),
                                          _c(
                                            "option",
                                            { attrs: { value: "Nutrition" } },
                                            [_vm._v("Nutrition")]
                                          ),
                                          _vm._v(" "),
                                          _c(
                                            "option",
                                            { attrs: { value: "Workout" } },
                                            [_vm._v("Workout")]
                                          ),
                                          _vm._v(" "),
                                          _c(
                                            "option",
                                            {
                                              attrs: {
                                                value: "member check-up",
                                              },
                                            },
                                            [_vm._v("Member Check-up")]
                                          ),
                                          _vm._v(" "),
                                          _c(
                                            "option",
                                            { attrs: { value: "other" } },
                                            [_vm._v("Other")]
                                          ),
                                        ]
                                      ),
                                    ]
                                  ),
                                  _vm._v(" "),
                                  _c("div", { staticClass: "notes-list" }, [
                                    _vm.loadingNotes
                                      ? _c(
                                          "div",
                                          { staticClass: "text-center py-4" },
                                          [
                                            _c("i", {
                                              staticClass:
                                                "fas fa-spinner fa-spin",
                                            }),
                                            _vm._v(
                                              " Loading notes...\n                                                        "
                                            ),
                                          ]
                                        )
                                      : _vm.filteredNotes.length === 0
                                      ? _c(
                                          "div",
                                          { staticClass: "no-results" },
                                          [
                                            _vm._v(
                                              "\n                                                            No notes found.\n                                                        "
                                            ),
                                          ]
                                        )
                                      : _c(
                                          "div",
                                          { staticClass: "notes-grid" },
                                          _vm._l(
                                            _vm.filteredNotes,
                                            function (note) {
                                              return _c(
                                                "div",
                                                {
                                                  key: note.id,
                                                  staticClass: "note-card",
                                                },
                                                [
                                                  _c(
                                                    "div",
                                                    {
                                                      staticClass:
                                                        "note-header",
                                                    },
                                                    [
                                                      _c(
                                                        "span",
                                                        {
                                                          staticClass:
                                                            "note-category",
                                                        },
                                                        [
                                                          _vm._v(
                                                            _vm._s(
                                                              note.category
                                                            )
                                                          ),
                                                        ]
                                                      ),
                                                      _vm._v(" "),
                                                      _c(
                                                        "span",
                                                        {
                                                          staticClass:
                                                            "note-date",
                                                        },
                                                        [
                                                          _vm._v(
                                                            _vm._s(
                                                              _vm.formatDate(
                                                                note.createdAt
                                                              )
                                                            )
                                                          ),
                                                        ]
                                                      ),
                                                    ]
                                                  ),
                                                  _vm._v(" "),
                                                  _c(
                                                    "div",
                                                    {
                                                      staticClass:
                                                        "note-content",
                                                    },
                                                    [
                                                      _vm._v(
                                                        "\n                                                                    " +
                                                          _vm._s(note.text) +
                                                          "\n                                                                "
                                                      ),
                                                    ]
                                                  ),
                                                  _vm._v(" "),
                                                  _c(
                                                    "div",
                                                    {
                                                      staticClass:
                                                        "note-actions",
                                                    },
                                                    [
                                                      _c(
                                                        "button",
                                                        {
                                                          staticClass:
                                                            "btn btn-sm btn-outline-primary",
                                                          on: {
                                                            click: function (
                                                              $event
                                                            ) {
                                                              return _vm.editNote(
                                                                note
                                                              )
                                                            },
                                                          },
                                                        },
                                                        [
                                                          _c("i", {
                                                            staticClass:
                                                              "fas fa-edit",
                                                          }),
                                                        ]
                                                      ),
                                                      _vm._v(" "),
                                                      _c(
                                                        "button",
                                                        {
                                                          staticClass:
                                                            "btn btn-sm btn-outline-danger",
                                                          on: {
                                                            click: function (
                                                              $event
                                                            ) {
                                                              return _vm.confirmDelete(
                                                                note.id
                                                              )
                                                            },
                                                          },
                                                        },
                                                        [
                                                          _c("i", {
                                                            staticClass:
                                                              "fas fa-trash",
                                                          }),
                                                        ]
                                                      ),
                                                    ]
                                                  ),
                                                ]
                                              )
                                            }
                                          ),
                                          0
                                        ),
                                  ]),
                                ]),
                              ]),
                            ])
                          : _vm._e(),
                      ]),
                    ]),
                  ]),
                ]),
              ]),
            ]),
            _vm._v(" "),
            _c("div", { staticClass: "bottom-actions" }, [
              _c("div", { staticClass: "action-buttons" }, [
                _vm.isEditing
                  ? _c(
                      "button",
                      {
                        staticClass: "btn btn-success",
                        attrs: { type: "button" },
                        on: { click: _vm.saveProfile },
                      },
                      [
                        _c("i", { staticClass: "fas fa-save" }),
                        _vm._v(
                          "\n                            Save\n                        "
                        ),
                      ]
                    )
                  : _vm._e(),
                _vm._v(" "),
                _vm.isEditing
                  ? _c(
                      "button",
                      {
                        staticClass: "btn btn-secondary",
                        attrs: { type: "button" },
                        on: { click: _vm.cancelEdit },
                      },
                      [
                        _c("i", { staticClass: "fas fa-times" }),
                        _vm._v(
                          "\n                            Cancel\n                        "
                        ),
                      ]
                    )
                  : _vm._e(),
              ]),
            ]),
          ]),
    ]),
  ])
}
var staticRenderFns = [
  function () {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "loading-spinner" }, [
      _c(
        "div",
        {
          staticClass: "spinner-border text-primary",
          attrs: { role: "status" },
        },
        [_c("span", { staticClass: "sr-only" }, [_vm._v("Loading...")])]
      ),
      _vm._v(" "),
      _c("p", { staticClass: "loading-text" }, [
        _vm._v("Loading coach details..."),
      ]),
    ])
  },
  function () {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "profile-header" }, [
      _c("div", { staticClass: "profile-icon" }, [
        _c("i", { staticClass: "fas fa-dumbbell" }),
      ]),
      _vm._v(" "),
      _c("h5", { staticClass: "profile-title" }, [_vm._v("Coach Data")]),
    ])
  },
  function () {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "action-icon" }, [
      _c("i", { staticClass: "fas fa-envelope" }),
    ])
  },
  function () {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "action-icon" }, [
      _c("i", { staticClass: "fas fa-tasks" }),
    ])
  },
  function () {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "action-icon" }, [
      _c("i", { staticClass: "fas fa-user-slash" }),
    ])
  },
  function () {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "action-icon" }, [
      _c("i", { staticClass: "fas fa-user-tie" }),
    ])
  },
  function () {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "section-header compact" }, [
      _c("h5", { staticClass: "section-title compact" }, [
        _c("i", { staticClass: "fas fa-id-card" }),
        _vm._v(" "),
        _c("span", [_vm._v("Coach Overview")]),
      ]),
    ])
  },
  function () {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "section-header compact" }, [
      _c("h5", { staticClass: "section-title compact" }, [
        _c("i", { staticClass: "fas fa-map-marker-alt" }),
        _vm._v(" "),
        _c("span", [_vm._v("Address")]),
      ]),
    ])
  },
  function () {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "form-section compact" }, [
      _c("div", { staticClass: "section-header compact" }, [
        _c("h5", { staticClass: "section-title compact" }, [
          _vm._v(
            "\n                                                                Coach Info\n                                                            "
          ),
        ]),
      ]),
      _vm._v(" "),
      _c("div", { staticClass: "data-cards-container" }),
    ])
  },
  function () {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "section-header compact" }, [
      _c("h5", { staticClass: "section-title compact" }, [
        _c("i", { staticClass: "fas fa-university" }),
        _vm._v(" "),
        _c("span", [_vm._v("Bank Details")]),
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
      [
        _c("span", { staticClass: "sr-only" }, [
          _vm._v(
            "Loading\n                                                                tasks..."
          ),
        ]),
      ]
    )
  },
  function () {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("thead", [
      _c("tr", [
        _c("th", [
          _vm._v(
            "\n                                                                        Title\n                                                                    "
          ),
        ]),
        _vm._v(" "),
        _c("th", [
          _vm._v(
            "\n                                                                        Category\n                                                                    "
          ),
        ]),
        _vm._v(" "),
        _c("th", [
          _vm._v(
            "\n                                                                        Priority\n                                                                    "
          ),
        ]),
        _vm._v(" "),
        _c("th", [
          _vm._v(
            "\n                                                                        Due\n                                                                        Date\n                                                                    "
          ),
        ]),
        _vm._v(" "),
        _c("th", [
          _vm._v(
            "\n                                                                        Status\n                                                                    "
          ),
        ]),
        _vm._v(" "),
        _c("th", [
          _vm._v(
            "\n                                                                        Actions\n                                                                    "
          ),
        ]),
      ]),
    ])
  },
  function () {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "chat-status" }, [
      _c("span", { staticClass: "badge badge-success" }, [_vm._v("Online")]),
    ])
  },
  function () {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c(
      "div",
      { staticClass: "spinner-border text-primary", attrs: { role: "status" } },
      [_c("span", { staticClass: "sr-only" }, [_vm._v("Loading messages...")])]
    )
  },
  function () {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "stat-icon" }, [
      _c("i", { staticClass: "fas fa-users" }),
    ])
  },
  function () {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "stat-icon" }, [
      _c("i", { staticClass: "fas fa-user-check" }),
    ])
  },
  function () {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "stat-icon" }, [
      _c("i", { staticClass: "fas fa-user-clock" }),
    ])
  },
  function () {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "stat-icon" }, [
      _c("i", { staticClass: "fas fa-calendar-check" }),
    ])
  },
  function () {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c(
      "div",
      { staticClass: "spinner-border text-primary", attrs: { role: "status" } },
      [
        _c("span", { staticClass: "sr-only" }, [
          _vm._v(
            "Loading\n                                                                assigned\n                                                                members..."
          ),
        ]),
      ]
    )
  },
  function () {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("thead", { staticClass: "table-header compact" }, [
      _c("tr", [
        _c("th", [_vm._v("Member")]),
        _vm._v(" "),
        _c("th", [_vm._v("ID")]),
        _vm._v(" "),
        _c("th", [_vm._v("Contact")]),
        _vm._v(" "),
        _c("th", [_vm._v("Plan")]),
        _vm._v(" "),
        _c("th", [_vm._v("Status")]),
        _vm._v(" "),
        _c("th", [_vm._v("Join Date")]),
        _vm._v(" "),
        _c("th", [_vm._v("Actions")]),
      ]),
    ])
  },
  function () {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("h4", { staticClass: "assignment-title" }, [
      _c("i", { staticClass: "fas fa-user-plus" }),
      _vm._v(
        "\n                                                            Assign New\n                                                            Member\n                                                        "
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
      [
        _c("span", { staticClass: "sr-only" }, [
          _vm._v(
            "Loading\n                                                                members..."
          ),
        ]),
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
      [_c("span", { staticClass: "sr-only" }, [_vm._v("Loading...")])]
    )
  },
  function () {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "empty-state-icon" }, [
      _c("i", { staticClass: "fas fa-history" }),
    ])
  },
  function () {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "tab-header" }, [
      _c("h4", { staticClass: "tab-title" }, [
        _c("i", { staticClass: "fas fa-calendar-check" }),
        _vm._v(
          "\n                                                    Schedule Management\n                                                "
        ),
      ]),
    ])
  },
  function () {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "tab-content-body" }, [
      _c("div", { staticClass: "empty-state" }, [
        _c("div", { staticClass: "empty-state-icon" }, [
          _c("i", { staticClass: "fas fa-calendar-check" }),
        ]),
        _vm._v(" "),
        _c("h5", { staticClass: "empty-state-title" }, [
          _vm._v("Schedule Management"),
        ]),
        _vm._v(" "),
        _c("p", { staticClass: "empty-state-text" }, [
          _vm._v("Manage coach schedules, appointments, and availability."),
        ]),
      ]),
    ])
  },
  function () {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "tab-header" }, [
      _c("h4", { staticClass: "tab-title" }, [
        _c("i", { staticClass: "fas fa-dumbbell" }),
        _vm._v(
          "\n                                                    Workout Plans\n                                                "
        ),
      ]),
    ])
  },
  function () {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "tab-content-body" }, [
      _c("div", { staticClass: "empty-state" }, [
        _c("div", { staticClass: "empty-state-icon" }, [
          _c("i", { staticClass: "fas fa-dumbbell" }),
        ]),
        _vm._v(" "),
        _c("h5", { staticClass: "empty-state-title" }, [
          _vm._v("Workout Plans"),
        ]),
        _vm._v(" "),
        _c("p", { staticClass: "empty-state-text" }, [
          _vm._v("Create and manage workout plans for members."),
        ]),
      ]),
    ])
  },
  function () {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "tab-header" }, [
      _c("h4", { staticClass: "tab-title" }, [
        _c("i", { staticClass: "fas fa-apple-alt" }),
        _vm._v(
          "\n                                                    Nutrition Guidance\n                                                "
        ),
      ]),
    ])
  },
  function () {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "tab-content-body" }, [
      _c("div", { staticClass: "empty-state" }, [
        _c("div", { staticClass: "empty-state-icon" }, [
          _c("i", { staticClass: "fas fa-apple-alt" }),
        ]),
        _vm._v(" "),
        _c("h5", { staticClass: "empty-state-title" }, [
          _vm._v("Nutrition Guidance"),
        ]),
        _vm._v(" "),
        _c("p", { staticClass: "empty-state-text" }, [
          _vm._v("Provide nutrition advice and dietary recommendations."),
        ]),
      ]),
    ])
  },
  function () {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "tab-header" }, [
      _c("h4", { staticClass: "tab-title" }, [
        _c("i", { staticClass: "fas fa-utensils" }),
        _vm._v(
          "\n                                                    Meal Planning\n                                                "
        ),
      ]),
    ])
  },
  function () {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "tab-content-body" }, [
      _c("div", { staticClass: "empty-state" }, [
        _c("div", { staticClass: "empty-state-icon" }, [
          _c("i", { staticClass: "fas fa-utensils" }),
        ]),
        _vm._v(" "),
        _c("h5", { staticClass: "empty-state-title" }, [
          _vm._v("Meal Planning"),
        ]),
        _vm._v(" "),
        _c("p", { staticClass: "empty-state-text" }, [
          _vm._v("Create customized meal plans for members."),
        ]),
      ]),
    ])
  },
  function () {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "tab-header" }, [
      _c("h4", { staticClass: "tab-title" }, [
        _c("i", { staticClass: "fas fa-trophy" }),
        _vm._v(
          "\n                                                    Fitness Challenges\n                                                "
        ),
      ]),
    ])
  },
  function () {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "tab-content-body" }, [
      _c("div", { staticClass: "empty-state" }, [
        _c("div", { staticClass: "empty-state-icon" }, [
          _c("i", { staticClass: "fas fa-trophy" }),
        ]),
        _vm._v(" "),
        _c("h5", { staticClass: "empty-state-title" }, [
          _vm._v("Fitness Challenges"),
        ]),
        _vm._v(" "),
        _c("p", { staticClass: "empty-state-text" }, [
          _vm._v("Create and manage fitness challenges for members."),
        ]),
      ]),
    ])
  },
  function () {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "tab-header" }, [
      _c("h4", { staticClass: "tab-title" }, [
        _c("i", { staticClass: "fas fa-cog" }),
        _vm._v(
          "\n                                                    Coach Settings\n                                                "
        ),
      ]),
      _vm._v(" "),
      _c("div", { staticClass: "tab-actions" }, [
        _c("button", { staticClass: "btn btn-primary btn-sm" }, [
          _c("i", { staticClass: "fas fa-save" }),
          _vm._v(
            "\n                                                        Save Settings\n                                                    "
          ),
        ]),
      ]),
    ])
  },
  function () {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "settings-section" }, [
      _c("h5", { staticClass: "settings-title" }, [_vm._v("General Settings")]),
      _vm._v(" "),
      _c("div", { staticClass: "form-group" }, [
        _c("label", [_vm._v("Notification Preferences")]),
        _vm._v(" "),
        _c("select", { staticClass: "form-control" }, [
          _c("option", [_vm._v("All Notifications")]),
          _vm._v(" "),
          _c("option", [_vm._v("Important Only")]),
          _vm._v(" "),
          _c("option", [_vm._v("Disabled")]),
        ]),
      ]),
      _vm._v(" "),
      _c("div", { staticClass: "form-group" }, [
        _c("label", [_vm._v("Default View")]),
        _vm._v(" "),
        _c("select", { staticClass: "form-control" }, [
          _c("option", [_vm._v("Table View")]),
          _vm._v(" "),
          _c("option", [_vm._v("Card View")]),
        ]),
      ]),
    ])
  },
]
render._withStripped = true



/***/ })

}]);