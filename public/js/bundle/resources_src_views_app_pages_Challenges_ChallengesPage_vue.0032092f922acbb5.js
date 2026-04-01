"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["resources_src_views_app_pages_Challenges_ChallengesPage_vue"],{

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/Challenges/ChallengesPage.vue?vue&type=script&lang=js":
/*!*************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/Challenges/ChallengesPage.vue?vue&type=script&lang=js ***!
  \*************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
var _methods;
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
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
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
      activeTab: 0,
      showCreateModal: false,
      showEditModal: false,
      showAddMemberModal: false,
      selectedChallenge: null,
      currentStep: 1,
      currentEditStep: 1,
      loading: false,
      addingMember: false,
      loadingMembers: false,
      // Challenge data - will be loaded from API
      challenges: [],
      challengeFields: [{
        key: "name",
        label: "Challenge Name",
        sortable: true
      }, {
        key: "duration",
        label: "Duration",
        sortable: true
      }, {
        key: "participants",
        label: "Participants",
        sortable: true
      }, {
        key: "reward",
        label: "Reward",
        sortable: true
      }, {
        key: "remainingDays",
        label: "Remaining Days",
        sortable: true
      },
      // <-- new field
      {
        key: "status",
        label: "Status",
        sortable: true
      }, {
        key: "actions",
        label: "Actions"
      }],
      participants: [],
      // Will be loaded from API
      participantFields: [{
        key: "name",
        label: "Participant Name",
        sortable: true
      }, {
        key: "email",
        label: "Email",
        sortable: true
      }, {
        key: "progress",
        label: "Progress",
        sortable: true
      }, {
        key: "status",
        label: "Status",
        sortable: true
      }, {
        key: "lastActivity",
        label: "Last Activity",
        sortable: true
      }],
      selectedChallengeFilter: null,
      leaderboard: [],
      // Will be calculated from participants data
      leaderboardFields: [{
        key: "rank",
        label: "Rank",
        sortable: true
      }, {
        key: "name",
        label: "Participant",
        sortable: true
      }, {
        key: "points",
        label: "Points",
        sortable: true
      }, {
        key: "achievements",
        label: "Achievements"
      }, {
        key: "level",
        label: "Level",
        sortable: true
      }, {
        key: "actions",
        label: "Actions"
      }],
      selectedLeaderboardChallenge: null,
      // Reports data - will be calculated from API data
      recentActivities: [],
      // Will be generated from participants/challenges data

      // Rewards data - will be loaded from API
      rewards: [],
      rewardFields: [{
        key: "name",
        label: "Reward Name",
        sortable: true
      }, {
        key: "description",
        label: "Description"
      }, {
        key: "points",
        label: "Points Required",
        sortable: true
      }, {
        key: "category",
        label: "Category",
        sortable: true
      }, {
        key: "status",
        label: "Status",
        sortable: true
      }, {
        key: "actions",
        label: "Actions"
      }],
      // New challenge form
      newChallenge: {
        name: "",
        // duration: "",
        goal: "",
        reward: "",
        description: "",
        startDate: "",
        endDate: "",
        participationFee: "",
        rules: "",
        allowEnrollment: true,
        maxParticipants: "",
        status: "Active"
      },
      // Edit challenge form
      editingChallenge: {
        id: null,
        name: "",
        // duration: "",
        goal: "",
        reward: "",
        description: "",
        startDate: "",
        endDate: "",
        participationFee: "",
        rules: "",
        allowEnrollment: true,
        maxParticipants: "",
        status: "Active"
      },
      // Edit validation state
      editValidation: {
        name: null,
        // duration: null,
        goal: null,
        reward: null,
        description: null,
        startDate: null,
        endDate: null,
        participationFee: null,
        rules: null,
        maxParticipants: null
      },
      // Validation state
      validation: {
        name: null,
        // duration: null,
        goal: null,
        reward: null,
        description: null,
        startDate: null,
        endDate: null,
        participationFee: null,
        rules: null,
        maxParticipants: null
      },
      // Reward modal
      showRewardModal: false,
      showEditRewardModal: false,
      newReward: {
        name: "",
        description: "",
        points: "",
        category: "",
        active: true
      },
      // Edit reward form
      editingReward: {
        id: null,
        name: "",
        description: "",
        points: "",
        category: "",
        active: true
      },
      // Reward validation state
      rewardValidation: {
        name: null,
        description: null,
        points: null,
        category: null
      },
      // Edit reward validation state
      editRewardValidation: {
        name: null,
        description: null,
        points: null,
        category: null
      },
      // Add Member form data
      addMemberForm: {
        challengeId: null,
        memberId: null,
        progress: 0,
        status: 'Active'
      },
      // Add Member validation state
      addMemberValidation: {
        challengeId: null,
        memberId: null
      },
      // Available members for selection
      availableMembers: [],
      // Status options for member assignment
      statusOptions: [{
        value: 'Active',
        text: 'Active'
      }, {
        value: 'Inactive',
        text: 'Inactive'
      }, {
        value: 'Completed',
        text: 'Completed'
      }, {
        value: 'Dropped',
        text: 'Dropped'
      }]

      // API base URL - using axios which is already configured in main.js
    };
  },
  methods: (_methods = {
    goBack: function goBack() {
      // Check if there's a previous page in history
      if (window.history.length > 1) {
        this.$router.go(-1);
      } else {
        // Default fallback to members page
        this.$router.push({
          name: 'ViewAllMembers'
        });
      }
    },
    // API Methods
    fetchRewards: function fetchRewards() {
      var _this = this;
      return _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
        var response, _response$data;
        return _regeneratorRuntime().wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              _this.loading = true;
              _context.next = 4;
              return axios.get('rewards');
            case 4:
              response = _context.sent;
              if (!(response && response.data && response.data.success === true)) {
                _context.next = 9;
                break;
              }
              _this.rewards = response.data.data || [];
              _context.next = 10;
              break;
            case 9:
              throw new Error((response === null || response === void 0 || (_response$data = response.data) === null || _response$data === void 0 ? void 0 : _response$data.message) || 'Failed to load rewards');
            case 10:
              _context.next = 16;
              break;
            case 12:
              _context.prev = 12;
              _context.t0 = _context["catch"](0);
              console.error('Error fetching rewards:', _context.t0);
              _this.$bvToast.toast("Failed to load rewards", {
                title: "Error",
                variant: "danger",
                solid: true
              });
            case 16:
              _context.prev = 16;
              _this.loading = false;
              return _context.finish(16);
            case 19:
            case "end":
              return _context.stop();
          }
        }, _callee, null, [[0, 12, 16, 19]]);
      }))();
    },
    createRewardAPI: function createRewardAPI(rewardData) {
      var _this2 = this;
      return _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee2() {
        var response, reward, _response$data2, validationErrors, _error$response, _error$response2, errorMessage;
        return _regeneratorRuntime().wrap(function _callee2$(_context2) {
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
              _context2.prev = 0;
              _context2.next = 3;
              return axios.post('rewards', {
                name: rewardData.name,
                description: rewardData.description,
                points: parseInt(rewardData.points),
                category: rewardData.category,
                status: rewardData.active ? 'Active' : 'Inactive'
              });
            case 3:
              response = _context2.sent;
              if (!(response && response.status === 201 && response.data)) {
                _context2.next = 10;
                break;
              }
              // If response has success property, use data property, otherwise use response.data directly
              reward = response.data.success === true ? response.data.data : response.data;
              _this2.rewards.push(reward);
              return _context2.abrupt("return", true);
            case 10:
              throw new Error((response === null || response === void 0 || (_response$data2 = response.data) === null || _response$data2 === void 0 ? void 0 : _response$data2.message) || 'Failed to create reward');
            case 11:
              _context2.next = 18;
              break;
            case 13:
              _context2.prev = 13;
              _context2.t0 = _context2["catch"](0);
              console.error('Error creating reward:', _context2.t0);

              // Handle validation errors
              if (_context2.t0.response && _context2.t0.response.status === 422 && _context2.t0.response.data.errors) {
                validationErrors = Object.values(_context2.t0.response.data.errors).flat();
                _this2.$bvToast.toast(validationErrors.join(', '), {
                  title: "Validation Error",
                  variant: "danger",
                  solid: true,
                  autoHideDelay: 5000
                });
              } else {
                // Handle other errors
                errorMessage = ((_error$response = _context2.t0.response) === null || _error$response === void 0 || (_error$response = _error$response.data) === null || _error$response === void 0 ? void 0 : _error$response.message) || ((_error$response2 = _context2.t0.response) === null || _error$response2 === void 0 || (_error$response2 = _error$response2.data) === null || _error$response2 === void 0 ? void 0 : _error$response2.error) || _context2.t0.message || "Failed to create reward";
                _this2.$bvToast.toast(errorMessage, {
                  title: "Error",
                  variant: "danger",
                  solid: true,
                  autoHideDelay: 5000
                });
              }
              return _context2.abrupt("return", false);
            case 18:
            case "end":
              return _context2.stop();
          }
        }, _callee2, null, [[0, 13]]);
      }))();
    },
    updateRewardAPI: function updateRewardAPI(rewardId, rewardData) {
      var _this3 = this;
      return _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee3() {
        var response, index, _response$data3, validationErrors, _error$response3, _error$response4, errorMessage;
        return _regeneratorRuntime().wrap(function _callee3$(_context3) {
          while (1) switch (_context3.prev = _context3.next) {
            case 0:
              _context3.prev = 0;
              _context3.next = 3;
              return axios.put("rewards/".concat(rewardId), {
                name: rewardData.name,
                description: rewardData.description,
                points: parseInt(rewardData.points),
                category: rewardData.category,
                status: rewardData.status
              });
            case 3:
              response = _context3.sent;
              if (!(response && response.data && response.data.success === true)) {
                _context3.next = 10;
                break;
              }
              index = _this3.rewards.findIndex(function (r) {
                return r.id === rewardId;
              });
              if (index !== -1) {
                _this3.rewards[index] = response.data.data;
              }
              return _context3.abrupt("return", true);
            case 10:
              throw new Error((response === null || response === void 0 || (_response$data3 = response.data) === null || _response$data3 === void 0 ? void 0 : _response$data3.message) || 'Failed to update reward');
            case 11:
              _context3.next = 18;
              break;
            case 13:
              _context3.prev = 13;
              _context3.t0 = _context3["catch"](0);
              console.error('Error updating reward:', _context3.t0);

              // Handle validation errors
              if (_context3.t0.response && _context3.t0.response.status === 422 && _context3.t0.response.data.errors) {
                validationErrors = Object.values(_context3.t0.response.data.errors).flat();
                _this3.$bvToast.toast(validationErrors.join(', '), {
                  title: "Validation Error",
                  variant: "danger",
                  solid: true,
                  autoHideDelay: 5000
                });
              } else {
                // Handle other errors
                errorMessage = ((_error$response3 = _context3.t0.response) === null || _error$response3 === void 0 || (_error$response3 = _error$response3.data) === null || _error$response3 === void 0 ? void 0 : _error$response3.message) || ((_error$response4 = _context3.t0.response) === null || _error$response4 === void 0 || (_error$response4 = _error$response4.data) === null || _error$response4 === void 0 ? void 0 : _error$response4.error) || _context3.t0.message || "Failed to update reward";
                _this3.$bvToast.toast(errorMessage, {
                  title: "Error",
                  variant: "danger",
                  solid: true,
                  autoHideDelay: 5000
                });
              }
              return _context3.abrupt("return", false);
            case 18:
            case "end":
              return _context3.stop();
          }
        }, _callee3, null, [[0, 13]]);
      }))();
    },
    deleteRewardAPI: function deleteRewardAPI(rewardId) {
      var _this4 = this;
      return _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee4() {
        var response, index, _response$data4, _error$response5, _error$response6, errorMessage;
        return _regeneratorRuntime().wrap(function _callee4$(_context4) {
          while (1) switch (_context4.prev = _context4.next) {
            case 0:
              _context4.prev = 0;
              _context4.next = 3;
              return axios["delete"]("rewards/".concat(rewardId));
            case 3:
              response = _context4.sent;
              if (!(response && response.data && response.data.success === true)) {
                _context4.next = 9;
                break;
              }
              index = _this4.rewards.findIndex(function (r) {
                return r.id === rewardId;
              });
              if (index !== -1) {
                _this4.rewards.splice(index, 1);
              }
              _context4.next = 10;
              break;
            case 9:
              throw new Error((response === null || response === void 0 || (_response$data4 = response.data) === null || _response$data4 === void 0 ? void 0 : _response$data4.message) || 'Failed to delete reward');
            case 10:
              return _context4.abrupt("return", true);
            case 13:
              _context4.prev = 13;
              _context4.t0 = _context4["catch"](0);
              console.error('Error deleting reward:', _context4.t0);

              // Handle different error types
              errorMessage = ((_error$response5 = _context4.t0.response) === null || _error$response5 === void 0 || (_error$response5 = _error$response5.data) === null || _error$response5 === void 0 ? void 0 : _error$response5.message) || ((_error$response6 = _context4.t0.response) === null || _error$response6 === void 0 || (_error$response6 = _error$response6.data) === null || _error$response6 === void 0 ? void 0 : _error$response6.error) || _context4.t0.message || "Failed to delete reward";
              _this4.$bvToast.toast(errorMessage, {
                title: "Error",
                variant: "danger",
                solid: true,
                autoHideDelay: 5000
              });
              return _context4.abrupt("return", false);
            case 19:
            case "end":
              return _context4.stop();
          }
        }, _callee4, null, [[0, 13]]);
      }))();
    },
    // Challenge API Methods
    fetchChallenges: function fetchChallenges() {
      var _this5 = this;
      return _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee5() {
        var response;
        return _regeneratorRuntime().wrap(function _callee5$(_context5) {
          while (1) switch (_context5.prev = _context5.next) {
            case 0:
              _context5.prev = 0;
              _this5.loading = true;
              _context5.next = 4;
              return axios.get('challenges');
            case 4:
              response = _context5.sent;
              _this5.challenges = response.data.map(function (challenge) {
                return _objectSpread(_objectSpread({}, challenge), {}, {
                  duration: "".concat(challenge.duration, " days"),
                  startDate: challenge.start_date,
                  endDate: challenge.end_date,
                  participationFee: challenge.participation_fee,
                  maxParticipants: challenge.max_participants,
                  allowEnrollment: challenge.allow_enrollment,
                  reward: challenge.reward ? challenge.reward.name : 'No Reward',
                  rewardId: challenge.reward_id,
                  participants: challenge.participants_count || 0,
                  // Use actual count from API
                  participants_count: challenge.participants_count || 0
                });
              });
              _context5.next = 12;
              break;
            case 8:
              _context5.prev = 8;
              _context5.t0 = _context5["catch"](0);
              console.error('Error fetching challenges:', _context5.t0);
              _this5.$bvToast.toast("Failed to load challenges", {
                title: "Error",
                variant: "danger",
                solid: true
              });
            case 12:
              _context5.prev = 12;
              _this5.loading = false;
              return _context5.finish(12);
            case 15:
            case "end":
              return _context5.stop();
          }
        }, _callee5, null, [[0, 8, 12, 15]]);
      }))();
    },
    createChallengeAPI: function createChallengeAPI(challengeData) {
      var _this6 = this;
      return _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee6() {
        var response, newChallenge, _error$response7, errorMessage;
        return _regeneratorRuntime().wrap(function _callee6$(_context6) {
          while (1) switch (_context6.prev = _context6.next) {
            case 0:
              _context6.prev = 0;
              _context6.next = 3;
              return axios.post('challenges', {
                name: challengeData.name,
                // duration: parseInt(challengeData.duration),
                goal: challengeData.goal,
                reward_id: parseInt(challengeData.reward),
                description: challengeData.description,
                start_date: challengeData.startDate,
                end_date: challengeData.endDate,
                participation_fee: parseFloat(challengeData.participationFee) || 0,
                rules: challengeData.rules,
                allow_enrollment: challengeData.allowEnrollment,
                max_participants: challengeData.allowEnrollment ? parseInt(challengeData.maxParticipants) || null : null,
                status: challengeData.status
              });
            case 3:
              response = _context6.sent;
              newChallenge = _objectSpread(_objectSpread({}, response.data), {}, {
                duration: "".concat(response.data.duration, " days"),
                startDate: response.data.start_date,
                endDate: response.data.end_date,
                participationFee: response.data.participation_fee,
                maxParticipants: response.data.max_participants,
                allowEnrollment: response.data.allow_enrollment,
                reward: response.data.reward ? response.data.reward.name : 'No Reward',
                rewardId: response.data.reward_id,
                participants: 0,
                progress: 0
              });
              _this6.challenges.push(newChallenge);
              return _context6.abrupt("return", true);
            case 9:
              _context6.prev = 9;
              _context6.t0 = _context6["catch"](0);
              console.error('Error creating challenge:', _context6.t0);
              errorMessage = ((_error$response7 = _context6.t0.response) === null || _error$response7 === void 0 || (_error$response7 = _error$response7.data) === null || _error$response7 === void 0 ? void 0 : _error$response7.message) || "Failed to create challenge";
              _this6.$bvToast.toast(errorMessage, {
                title: "Error",
                variant: "danger",
                solid: true
              });
              return _context6.abrupt("return", false);
            case 15:
            case "end":
              return _context6.stop();
          }
        }, _callee6, null, [[0, 9]]);
      }))();
    },
    updateChallengeAPI: function updateChallengeAPI(challengeId, challengeData) {
      var _this7 = this;
      return _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee7() {
        var response, updatedChallenge, index, _error$response8, errorMessage;
        return _regeneratorRuntime().wrap(function _callee7$(_context7) {
          while (1) switch (_context7.prev = _context7.next) {
            case 0:
              _context7.prev = 0;
              _context7.next = 3;
              return axios.put("challenges/".concat(challengeId), {
                name: challengeData.name,
                // duration: parseInt(challengeData.duration),
                goal: challengeData.goal,
                reward_id: parseInt(challengeData.reward),
                description: challengeData.description,
                start_date: challengeData.startDate,
                end_date: challengeData.endDate,
                participation_fee: parseFloat(challengeData.participationFee) || 0,
                rules: challengeData.rules,
                allow_enrollment: challengeData.allowEnrollment,
                max_participants: challengeData.allowEnrollment ? parseInt(challengeData.maxParticipants) || null : null,
                status: challengeData.status
              });
            case 3:
              response = _context7.sent;
              updatedChallenge = _objectSpread(_objectSpread({}, response.data), {}, {
                duration: "".concat(response.data.duration, " days"),
                startDate: response.data.start_date,
                endDate: response.data.end_date,
                participationFee: response.data.participation_fee,
                maxParticipants: response.data.max_participants,
                allowEnrollment: response.data.allow_enrollment,
                reward: response.data.reward ? response.data.reward.name : 'No Reward',
                rewardId: response.data.reward_id,
                participants: 0,
                progress: 0
              });
              index = _this7.challenges.findIndex(function (c) {
                return c.id === challengeId;
              });
              if (index !== -1) {
                _this7.challenges[index] = updatedChallenge;
              }
              return _context7.abrupt("return", true);
            case 10:
              _context7.prev = 10;
              _context7.t0 = _context7["catch"](0);
              console.error('Error updating challenge:', _context7.t0);
              errorMessage = ((_error$response8 = _context7.t0.response) === null || _error$response8 === void 0 || (_error$response8 = _error$response8.data) === null || _error$response8 === void 0 ? void 0 : _error$response8.message) || "Failed to update challenge";
              _this7.$bvToast.toast(errorMessage, {
                title: "Error",
                variant: "danger",
                solid: true
              });
              return _context7.abrupt("return", false);
            case 16:
            case "end":
              return _context7.stop();
          }
        }, _callee7, null, [[0, 10]]);
      }))();
    },
    deleteChallengeAPI: function deleteChallengeAPI(challengeId) {
      var _this8 = this;
      return _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee8() {
        var response, _response$data5, _error$response9, errorMessage;
        return _regeneratorRuntime().wrap(function _callee8$(_context8) {
          while (1) switch (_context8.prev = _context8.next) {
            case 0:
              _context8.prev = 0;
              _context8.next = 3;
              return axios["delete"]("challenges/".concat(challengeId));
            case 3:
              response = _context8.sent;
              if (!(response && response.data && response.data.success === true)) {
                _context8.next = 12;
                break;
              }
              _context8.next = 7;
              return _this8.fetchChallenges();
            case 7:
              _context8.next = 9;
              return _this8.fetchChallengeParticipants();
            case 9:
              return _context8.abrupt("return", true);
            case 12:
              throw new Error((response === null || response === void 0 || (_response$data5 = response.data) === null || _response$data5 === void 0 ? void 0 : _response$data5.message) || 'Failed to delete challenge');
            case 13:
              _context8.next = 21;
              break;
            case 15:
              _context8.prev = 15;
              _context8.t0 = _context8["catch"](0);
              console.error('Error deleting challenge:', _context8.t0);
              errorMessage = ((_error$response9 = _context8.t0.response) === null || _error$response9 === void 0 || (_error$response9 = _error$response9.data) === null || _error$response9 === void 0 ? void 0 : _error$response9.message) || "Failed to delete challenge";
              _this8.$bvToast.toast(errorMessage, {
                title: "Error",
                variant: "danger",
                solid: true
              });
              return _context8.abrupt("return", false);
            case 21:
            case "end":
              return _context8.stop();
          }
        }, _callee8, null, [[0, 15]]);
      }))();
    },
    viewChallenge: function viewChallenge(challenge) {
      this.selectedChallenge = challenge;
      this.activeTab = 1; // Switch to Participants tab
    },
    createChallenge: function createChallenge() {
      var _this9 = this;
      return _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee9() {
        var success;
        return _regeneratorRuntime().wrap(function _callee9$(_context9) {
          while (1) switch (_context9.prev = _context9.next) {
            case 0:
              // Validate all fields first
              _this9.validateAllFields();
              if (_this9.isFormValid) {
                _context9.next = 4;
                break;
              }
              // Show error notification
              _this9.$bvToast.toast("Please fill all required fields correctly!", {
                title: "Validation Error",
                variant: "danger",
                solid: true,
                autoHideDelay: 5000
              });
              return _context9.abrupt("return", false);
            case 4:
              _context9.next = 6;
              return _this9.createChallengeAPI(_this9.newChallenge);
            case 6:
              success = _context9.sent;
              if (!success) {
                _context9.next = 15;
                break;
              }
              // Reset form and validation
              _this9.resetForm();

              // Refresh challenges list
              _context9.next = 11;
              return _this9.fetchChallenges();
            case 11:
              _context9.next = 13;
              return _this9.fetchChallengeParticipants();
            case 13:
              // Show success notification
              _this9.$bvToast.toast("Challenge created successfully!", {
                title: "Success",
                variant: "success",
                solid: true,
                autoHideDelay: 3000
              });
              return _context9.abrupt("return", true);
            case 15:
              return _context9.abrupt("return", false);
            case 16:
            case "end":
              return _context9.stop();
          }
        }, _callee9);
      }))();
    },
    validateField: function validateField(fieldName) {
      var value = this.newChallenge[fieldName];
      switch (fieldName) {
        case 'name':
          this.validation.name = value && value.trim().length > 0;
          break;
        case 'goal':
          this.validation.goal = value && value.trim().length > 0;
          break;
        case 'reward':
          this.validation.reward = value && value !== "";
          break;
        case 'description':
          this.validation.description = value && value.trim().length > 0;
          break;
        case 'startDate':
          this.validation.startDate = value && value.trim().length > 0;
          break;
        case 'endDate':
          this.validation.endDate = value && value.trim().length > 0;
          if (this.newChallenge.startDate && value) {
            this.validation.endDate = new Date(value) > new Date(this.newChallenge.startDate);
          }
          break;
        case 'participationFee':
          this.validation.participationFee = value && !isNaN(value) && parseFloat(value) >= 0;
          break;
        case 'rules':
          this.validation.rules = value && value.trim().length > 0;
          break;
        case 'maxParticipants':
          if (this.newChallenge.allowEnrollment) {
            this.validation.maxParticipants = value && !isNaN(value) && parseInt(value) > 0;
          } else {
            this.validation.maxParticipants = true; // Not required if enrollment is disabled
          }
          break;
      }
    },
    validateAllFields: function validateAllFields() {
      this.validateField('name');
      this.validateField('goal');
      this.validateField('reward');
      this.validateField('description');
      this.validateField('startDate');
      this.validateField('endDate');
      this.validateField('participationFee');
      this.validateField('rules');
      this.validateField('maxParticipants');
    },
    resetForm: function resetForm() {
      this.newChallenge = {
        name: "",
        goal: "",
        reward: "",
        description: "",
        startDate: "",
        endDate: "",
        participationFee: "",
        rules: "",
        allowEnrollment: true,
        maxParticipants: "",
        status: "Active"
      };

      // Reset validation state
      this.validation = {
        name: null,
        goal: null,
        reward: null,
        description: null,
        startDate: null,
        endDate: null,
        participationFee: null,
        rules: null,
        maxParticipants: null
      };
    },
    setActiveTabFromRoute: function setActiveTabFromRoute() {
      // Since this is now a direct route, we'll default to the first tab
      this.activeTab = 0;
    },
    createReward: function createReward() {
      var _this10 = this;
      return _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee10() {
        var success;
        return _regeneratorRuntime().wrap(function _callee10$(_context10) {
          while (1) switch (_context10.prev = _context10.next) {
            case 0:
              // Validate all reward fields first
              _this10.validateAllRewardFields();
              if (_this10.isRewardFormValid) {
                _context10.next = 4;
                break;
              }
              // Show error notification
              _this10.$bvToast.toast("Please fill all required fields correctly!", {
                title: "Validation Error",
                variant: "danger",
                solid: true,
                autoHideDelay: 5000
              });
              return _context10.abrupt("return", false);
            case 4:
              _context10.next = 6;
              return _this10.createRewardAPI(_this10.newReward);
            case 6:
              success = _context10.sent;
              if (!success) {
                _context10.next = 13;
                break;
              }
              // Reset form and validation
              _this10.resetRewardForm();

              // Refresh the rewards list
              _context10.next = 11;
              return _this10.fetchRewards();
            case 11:
              // Show success notification
              _this10.$bvToast.toast("Reward created successfully!", {
                title: "Success",
                variant: "success",
                solid: true,
                autoHideDelay: 3000
              });
              return _context10.abrupt("return", true);
            case 13:
              return _context10.abrupt("return", false);
            case 14:
            case "end":
              return _context10.stop();
          }
        }, _callee10);
      }))();
    },
    validateRewardField: function validateRewardField(fieldName) {
      var value = this.newReward[fieldName];
      switch (fieldName) {
        case 'name':
          this.rewardValidation.name = value && value.trim().length > 0;
          break;
        case 'description':
          this.rewardValidation.description = value && value.trim().length > 0;
          break;
        case 'points':
          this.rewardValidation.points = value && !isNaN(value) && parseInt(value) > 0;
          break;
        case 'category':
          this.rewardValidation.category = value && value.trim().length > 0;
          break;
      }
    },
    validateAllRewardFields: function validateAllRewardFields() {
      this.validateRewardField('name');
      this.validateRewardField('description');
      this.validateRewardField('points');
      this.validateRewardField('category');
    },
    resetRewardForm: function resetRewardForm() {
      this.newReward = {
        name: "",
        description: "",
        points: "",
        category: "",
        active: true
      };

      // Reset validation state
      this.rewardValidation = {
        name: null,
        description: null,
        points: null,
        category: null
      };
    },
    onEnrollmentToggle: function onEnrollmentToggle() {
      // When enrollment is toggled, validate maxParticipants field
      if (this.newChallenge.allowEnrollment) {
        this.validateField('maxParticipants');
      } else {
        this.validation.maxParticipants = true; // Not required when disabled
      }
    },
    // Edit validation state
    onEditEnrollmentToggle: function onEditEnrollmentToggle() {
      // When enrollment is toggled, validate maxParticipants field for edit form
      if (this.editingChallenge.allowEnrollment) {
        this.validateEditField('maxParticipants');
      } else {
        this.editValidation.maxParticipants = true; // Not required when disabled
      }
    },
    nextEditStep: function nextEditStep() {
      if (this.isCurrentEditStepValid && this.currentEditStep < 3) {
        this.currentEditStep++;
      }
    },
    previousEditStep: function previousEditStep() {
      if (this.currentEditStep > 1) {
        this.currentEditStep--;
      }
    },
    nextStep: function nextStep() {
      if (this.isCurrentStepValid && this.currentStep < 3) {
        this.currentStep++;
      }
    },
    previousStep: function previousStep() {
      if (this.currentStep > 1) {
        this.currentStep--;
      }
    }
  }, _defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_methods, "resetForm", function resetForm() {
    this.newChallenge = {
      name: "",
      // duration: "",
      goal: "",
      reward: "",
      description: "",
      startDate: "",
      endDate: "",
      participationFee: "",
      rules: "",
      allowEnrollment: true,
      maxParticipants: "",
      status: "Active"
    };

    // Reset validation state
    this.validation = {
      name: null,
      // duration: null,
      goal: null,
      reward: null,
      description: null,
      startDate: null,
      endDate: null,
      participationFee: null,
      rules: null,
      maxParticipants: null
    };

    // Reset step
    this.currentStep = 1;
  }), "updateChallenge", function updateChallenge() {
    var _this11 = this;
    return _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee11() {
      var success;
      return _regeneratorRuntime().wrap(function _callee11$(_context11) {
        while (1) switch (_context11.prev = _context11.next) {
          case 0:
            // Validate all fields first
            _this11.validateAllEditFields();
            if (_this11.isEditFormValid) {
              _context11.next = 4;
              break;
            }
            // Show error notification
            _this11.$bvToast.toast("Please fill all required fields correctly!", {
              title: "Validation Error",
              variant: "danger",
              solid: true,
              autoHideDelay: 5000
            });
            return _context11.abrupt("return", false);
          case 4:
            _context11.next = 6;
            return _this11.updateChallengeAPI(_this11.editingChallenge.id, _this11.editingChallenge);
          case 6:
            success = _context11.sent;
            if (!success) {
              _context11.next = 15;
              break;
            }
            // Reset form and validation
            _this11.resetEditForm();

            // Refresh challenges list
            _context11.next = 11;
            return _this11.fetchChallenges();
          case 11:
            _context11.next = 13;
            return _this11.fetchChallengeParticipants();
          case 13:
            // Show success notification
            _this11.$bvToast.toast("Challenge updated successfully!", {
              title: "Success",
              variant: "success",
              solid: true,
              autoHideDelay: 3000
            });
            return _context11.abrupt("return", true);
          case 15:
            return _context11.abrupt("return", false);
          case 16:
          case "end":
            return _context11.stop();
        }
      }, _callee11);
    }))();
  }), "validateEditField", function validateEditField(fieldName) {
    var value = this.editingChallenge[fieldName];
    switch (fieldName) {
      case 'name':
        this.editValidation.name = value && value.trim().length > 0;
        break;
      case 'goal':
        this.editValidation.goal = value && value.trim().length > 0;
        break;
      case 'reward':
        this.editValidation.reward = value && value !== "";
        break;
      case 'description':
        this.editValidation.description = value && value.trim().length > 0;
        break;
      case 'startDate':
        this.editValidation.startDate = value && value.trim().length > 0;
        break;
      case 'endDate':
        this.editValidation.endDate = value && value.trim().length > 0;
        if (this.editingChallenge.startDate && value) {
          this.editValidation.endDate = new Date(value) > new Date(this.editingChallenge.startDate);
        }
        break;
      case 'participationFee':
        this.editValidation.participationFee = value && !isNaN(value) && parseFloat(value) >= 0;
        break;
      case 'rules':
        this.editValidation.rules = value && value.trim().length > 0;
        break;
      case 'maxParticipants':
        if (this.editingChallenge.allowEnrollment) {
          this.editValidation.maxParticipants = value && !isNaN(value) && parseInt(value) > 0;
        } else {
          this.editValidation.maxParticipants = true; // Not required if enrollment is disabled
        }
        break;
    }
  }), "validateAllEditFields", function validateAllEditFields() {
    this.validateEditField('name');
    this.validateEditField('goal');
    this.validateEditField('reward');
    this.validateEditField('description');
    this.validateEditField('startDate');
    this.validateEditField('endDate');
    this.validateEditField('participationFee');
    this.validateEditField('rules');
    this.validateEditField('maxParticipants');
  }), "resetEditValidation", function resetEditValidation() {
    this.editValidation = {
      name: null,
      goal: null,
      reward: null,
      description: null,
      startDate: null,
      endDate: null,
      participationFee: null,
      rules: null,
      maxParticipants: null
    };
  }), "resetEditForm", function resetEditForm() {
    this.editingChallenge = {
      id: null,
      name: "",
      goal: "",
      reward: "",
      description: "",
      startDate: "",
      endDate: "",
      participationFee: "",
      rules: "",
      allowEnrollment: true,
      maxParticipants: "",
      status: "Active"
    };

    // Reset validation state
    this.resetEditValidation();

    // Reset step
    this.currentEditStep = 1;
  }), "editReward", function editReward(reward) {
    var _this12 = this;
    return _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee12() {
      return _regeneratorRuntime().wrap(function _callee12$(_context12) {
        while (1) switch (_context12.prev = _context12.next) {
          case 0:
            // Populate the editing form with reward data
            _this12.editingReward = {
              id: reward.id,
              name: reward.name,
              description: reward.description,
              points: reward.points.toString(),
              category: reward.category,
              active: reward.status === 'Active'
            };

            // Reset validation state
            _this12.resetEditRewardValidation();

            // Validate all fields to set initial validation state
            _this12.validateAllEditRewardFields();

            // Show the edit modal
            _this12.showEditRewardModal = true;
          case 4:
          case "end":
            return _context12.stop();
        }
      }, _callee12);
    }))();
  }), "updateReward", function updateReward() {
    var _this13 = this;
    return _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee13() {
      var success;
      return _regeneratorRuntime().wrap(function _callee13$(_context13) {
        while (1) switch (_context13.prev = _context13.next) {
          case 0:
            // Validate all reward fields first
            _this13.validateAllEditRewardFields();
            if (_this13.isEditRewardFormValid) {
              _context13.next = 4;
              break;
            }
            // Show error notification
            _this13.$bvToast.toast("Please fill all required fields correctly!", {
              title: "Validation Error",
              variant: "danger",
              solid: true,
              autoHideDelay: 5000
            });
            return _context13.abrupt("return", false);
          case 4:
            _context13.next = 6;
            return _this13.updateRewardAPI(_this13.editingReward.id, {
              name: _this13.editingReward.name,
              description: _this13.editingReward.description,
              points: parseInt(_this13.editingReward.points),
              category: _this13.editingReward.category,
              status: _this13.editingReward.active ? 'Active' : 'Inactive'
            });
          case 6:
            success = _context13.sent;
            if (!success) {
              _context13.next = 13;
              break;
            }
            // Reset form and validation
            _this13.resetEditRewardForm();

            // Refresh the rewards list
            _context13.next = 11;
            return _this13.fetchRewards();
          case 11:
            // Show success notification
            _this13.$bvToast.toast("Reward updated successfully!", {
              title: "Success",
              variant: "success",
              solid: true,
              autoHideDelay: 3000
            });
            return _context13.abrupt("return", true);
          case 13:
            return _context13.abrupt("return", false);
          case 14:
          case "end":
            return _context13.stop();
        }
      }, _callee13);
    }))();
  }), "validateEditRewardField", function validateEditRewardField(fieldName) {
    var value = this.editingReward[fieldName];
    switch (fieldName) {
      case 'name':
        this.editRewardValidation.name = value && value.trim().length > 0;
        break;
      case 'description':
        this.editRewardValidation.description = value && value.trim().length > 0;
        break;
      case 'points':
        this.editRewardValidation.points = value && !isNaN(value) && parseInt(value) > 0;
        break;
      case 'category':
        this.editRewardValidation.category = value && value.trim().length > 0;
        break;
    }
  }), "validateAllEditRewardFields", function validateAllEditRewardFields() {
    this.validateEditRewardField('name');
    this.validateEditRewardField('description');
    this.validateEditRewardField('points');
    this.validateEditRewardField('category');
  }), _defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_methods, "resetEditRewardValidation", function resetEditRewardValidation() {
    this.editRewardValidation = {
      name: null,
      description: null,
      points: null,
      category: null
    };
  }), "resetEditRewardForm", function resetEditRewardForm() {
    this.editingReward = {
      id: null,
      name: "",
      description: "",
      points: "",
      category: "",
      active: true
    };

    // Reset validation state
    this.resetEditRewardValidation();
  }), "deleteReward", function deleteReward(reward) {
    var _this14 = this;
    return _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee14() {
      var confirmed, success;
      return _regeneratorRuntime().wrap(function _callee14$(_context14) {
        while (1) switch (_context14.prev = _context14.next) {
          case 0:
            _context14.next = 2;
            return _this14.$bvModal.msgBoxConfirm("Are you sure you want to delete the reward \"".concat(reward.name, "\"?"), {
              title: 'Confirm Delete',
              size: 'sm',
              buttonSize: 'sm',
              okVariant: 'danger',
              okTitle: 'Delete',
              cancelTitle: 'Cancel',
              footerClass: 'p-2',
              hideHeaderClose: false,
              centered: true
            });
          case 2:
            confirmed = _context14.sent;
            if (!confirmed) {
              _context14.next = 11;
              break;
            }
            _context14.next = 6;
            return _this14.deleteRewardAPI(reward.id);
          case 6:
            success = _context14.sent;
            if (!success) {
              _context14.next = 11;
              break;
            }
            _context14.next = 10;
            return _this14.fetchRewards();
          case 10:
            _this14.$bvToast.toast("Reward deleted successfully!", {
              title: "Success",
              variant: "success",
              solid: true,
              autoHideDelay: 3000
            });
          case 11:
          case "end":
            return _context14.stop();
        }
      }, _callee14);
    }))();
  }), "editChallenge", function editChallenge(challenge) {
    // Populate the editing form with challenge data
    this.editingChallenge = {
      id: challenge.id,
      name: challenge.name,
      // duration: challenge.duration ? challenge.duration.replace(' days', '') : '',
      goal: challenge.goal || '',
      reward: challenge.rewardId || '',
      description: challenge.description || '',
      startDate: challenge.startDate || '',
      endDate: challenge.endDate || '',
      participationFee: challenge.participationFee || '',
      rules: challenge.rules || '',
      allowEnrollment: challenge.allowEnrollment !== undefined ? challenge.allowEnrollment : true,
      maxParticipants: challenge.maxParticipants || '',
      status: challenge.status || 'Active'
    };

    // Reset validation state
    this.resetEditValidation();

    // Validate all fields to set initial validation state
    this.validateAllEditFields();

    // Reset step to 1
    this.currentEditStep = 1;

    // Show the edit modal
    this.showEditModal = true;
  }), "deleteChallenge", function deleteChallenge(challenge) {
    var _this15 = this;
    return _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee15() {
      var confirmed, success;
      return _regeneratorRuntime().wrap(function _callee15$(_context15) {
        while (1) switch (_context15.prev = _context15.next) {
          case 0:
            _context15.next = 2;
            return _this15.$bvModal.msgBoxConfirm("Are you sure you want to delete the challenge \"".concat(challenge.name, "\"?"), {
              title: 'Confirm Delete',
              size: 'sm',
              buttonSize: 'sm',
              okVariant: 'danger',
              okTitle: 'Delete',
              cancelTitle: 'Cancel',
              footerClass: 'p-2',
              hideHeaderClose: false,
              centered: true
            });
          case 2:
            confirmed = _context15.sent;
            if (!confirmed) {
              _context15.next = 8;
              break;
            }
            _context15.next = 6;
            return _this15.deleteChallengeAPI(challenge.id);
          case 6:
            success = _context15.sent;
            if (success) {
              _this15.$bvToast.toast("Challenge deleted successfully!", {
                title: "Success",
                variant: "success",
                solid: true,
                autoHideDelay: 3000
              });
            }
          case 8:
          case "end":
            return _context15.stop();
        }
      }, _callee15);
    }))();
  }), "viewParticipant", function viewParticipant(participant) {
    console.log("View participant:", participant);
    // Implementation for viewing participant details
  }), "sendMessage", function sendMessage(participant) {
    console.log("Send message to:", participant);
    // Implementation for sending message
  }), "viewLeaderboardProfile", function viewLeaderboardProfile(participant) {
    console.log("View leaderboard profile:", participant);
    // Implementation for viewing profile
  }), "getStatusClass", function getStatusClass(status) {
    switch (status) {
      case "Active":
        return "badge-active";
      case "Completed":
        return "badge-completed";
      case "Inactive":
        return "badge-inactive";
      default:
        return "badge-info";
    }
  }), "fetchChallengeParticipants", function fetchChallengeParticipants() {
    var _arguments = arguments,
      _this16 = this;
    return _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee16() {
      var challengeId, response, _response$data6;
      return _regeneratorRuntime().wrap(function _callee16$(_context16) {
        while (1) switch (_context16.prev = _context16.next) {
          case 0:
            challengeId = _arguments.length > 0 && _arguments[0] !== undefined ? _arguments[0] : null;
            _context16.prev = 1;
            _this16.loading = true;
            _context16.next = 5;
            return axios.get('challenge_participants');
          case 5:
            response = _context16.sent;
            if (!(response && response.data && response.data.success === true)) {
              _context16.next = 10;
              break;
            }
            // The backend returns { success: true, data: [...] }
            // Transform the data to include name and email from member relationship
            _this16.participants = response.data.data.map(function (participant) {
              return _objectSpread(_objectSpread({}, participant), {}, {
                id: participant.id,
                name: participant.member ? participant.member.membername || participant.member.name || "".concat(participant.member.firstname || '', " ").concat(participant.member.lastname || '').trim() || 'Unknown' : 'Unknown',
                email: participant.member ? participant.member.email : 'No email',
                challengeId: participant.challenge_id,
                challenge_id: participant.challenge_id,
                progress: participant.progress || 0,
                status: participant.status || 'Active',
                joinDate: participant.created_at ? new Date(participant.created_at).toLocaleDateString() : 'N/A',
                lastActivity: participant.last_activity ? new Date(participant.last_activity).toLocaleString() : 'N/A',
                memberId: participant.member_id
              });
            });
            _context16.next = 11;
            break;
          case 10:
            throw new Error((response === null || response === void 0 || (_response$data6 = response.data) === null || _response$data6 === void 0 ? void 0 : _response$data6.message) || 'Failed to fetch participants');
          case 11:
            _context16.next = 17;
            break;
          case 13:
            _context16.prev = 13;
            _context16.t0 = _context16["catch"](1);
            console.error('Error fetching participants:', _context16.t0);
            _this16.$bvToast.toast("Failed to load participants", {
              title: "Error",
              variant: "danger",
              solid: true
            });
          case 17:
            _context16.prev = 17;
            _this16.loading = false;
            return _context16.finish(17);
          case 20:
          case "end":
            return _context16.stop();
        }
      }, _callee16, null, [[1, 13, 17, 20]]);
    }))();
  }), _defineProperty(_defineProperty(_defineProperty(_defineProperty(_methods, "fetchAvailableMembers", function fetchAvailableMembers() {
    var _this17 = this;
    return _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee17() {
      var response, membersData;
      return _regeneratorRuntime().wrap(function _callee17$(_context17) {
        while (1) switch (_context17.prev = _context17.next) {
          case 0:
            _this17.loadingMembers = true;
            _context17.prev = 1;
            _context17.next = 4;
            return axios.get('members?limit=all');
          case 4:
            response = _context17.sent;
            membersData = null;
            if (response.data && response.data.clients && Array.isArray(response.data.clients)) {
              membersData = response.data.clients;
            } else if (response.data && response.data.data && Array.isArray(response.data.data)) {
              membersData = response.data.data;
            } else if (response.data && Array.isArray(response.data)) {
              membersData = response.data;
            }
            if (membersData && membersData.length > 0) {
              _this17.availableMembers = membersData.map(function (member) {
                return {
                  value: member.id,
                  text: "".concat(member.membername || member.name || member.firstname + ' ' + member.lastname || 'Unknown', " (").concat(member.email || 'No email', ")")
                };
              });
            } else {
              _this17.availableMembers = [];
              _this17.$bvToast.toast('No members found', {
                title: 'Warning',
                variant: 'warning',
                solid: true
              });
            }
            _context17.next = 14;
            break;
          case 10:
            _context17.prev = 10;
            _context17.t0 = _context17["catch"](1);
            _this17.availableMembers = [];
            _this17.$bvToast.toast('Error loading members', {
              title: 'Error',
              variant: 'danger',
              solid: true
            });
          case 14:
            _this17.loadingMembers = false;
          case 15:
          case "end":
            return _context17.stop();
        }
      }, _callee17, null, [[1, 10]]);
    }))();
  }), "openAddMemberModal", function openAddMemberModal() {
    var _this18 = this;
    return _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee18() {
      return _regeneratorRuntime().wrap(function _callee18$(_context18) {
        while (1) switch (_context18.prev = _context18.next) {
          case 0:
            _context18.next = 2;
            return _this18.fetchAvailableMembers();
          case 2:
            if (_this18.selectedChallengeFilter) {
              _this18.addMemberForm.challengeId = _this18.selectedChallengeFilter;
            }
            _this18.$nextTick(function () {
              if (_this18.$refs.addMemberModal) {
                _this18.$refs.addMemberModal.show();
              }
            });
          case 4:
          case "end":
            return _context18.stop();
        }
      }, _callee18);
    }))();
  }), "addMemberToChallenge", function addMemberToChallenge() {
    var _this19 = this;
    return _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee19() {
      var payload, response, isSuccess, successMessage, errors, errorMsg, _errors;
      return _regeneratorRuntime().wrap(function _callee19$(_context19) {
        while (1) switch (_context19.prev = _context19.next) {
          case 0:
            _this19.addingMember = true;
            _context19.prev = 1;
            if (!(!_this19.addMemberForm.challengeId || !_this19.addMemberForm.memberId)) {
              _context19.next = 6;
              break;
            }
            _this19.$bvToast.toast('Please select both challenge and member', {
              title: 'Error',
              variant: 'danger',
              solid: true
            });
            _this19.addingMember = false;
            return _context19.abrupt("return");
          case 6:
            payload = {
              challenge_id: parseInt(_this19.addMemberForm.challengeId),
              member_id: parseInt(_this19.addMemberForm.memberId),
              progress: parseInt(_this19.addMemberForm.progress) || 0,
              status: _this19.addMemberForm.status,
              last_activity: new Date().toISOString().split('T')[0]
            };
            _context19.next = 9;
            return axios.post('challenge_participants', payload);
          case 9:
            response = _context19.sent;
            // Bulletproof response handling - check everything step by step
            isSuccess = false;
            successMessage = 'Member added to challenge successfully!'; // Check response exists
            if (!response) {
              _context19.next = 33;
              break;
            }
            // Check HTTP status codes
            if (response.status === 200 || response.status === 201) {
              isSuccess = true;
            }

            // Check response data structure
            if (!(response.data && _typeof(response.data) === 'object')) {
              _context19.next = 33;
              break;
            }
            if (!(response.data.success === true)) {
              _context19.next = 20;
              break;
            }
            isSuccess = true;
            if (response.data.message) {
              successMessage = response.data.message;
              _this19.addingMember = false;
            }
            _context19.next = 33;
            break;
          case 20:
            if (!(response.data.success === false)) {
              _context19.next = 28;
              break;
            }
            isSuccess = false;
            if (!response.data.message) {
              _context19.next = 26;
              break;
            }
            _this19.$bvToast.toast(response.data.message, {
              title: 'Error',
              variant: 'danger',
              solid: true
            });
            _this19.addingMember = false;
            return _context19.abrupt("return");
          case 26:
            _context19.next = 33;
            break;
          case 28:
            if (!(response.data.errors && _typeof(response.data.errors) === 'object')) {
              _context19.next = 33;
              break;
            }
            errors = Object.values(response.data.errors).flat();
            _this19.$bvToast.toast(errors.join(', '), {
              title: 'Error',
              variant: 'danger',
              solid: true
            });
            _this19.addingMember = false;
            return _context19.abrupt("return");
          case 33:
            // Handle success
            if (isSuccess) {
              // this.$toast.success(successMessage);
              _this19.$bvToast.toast(successMessage, {
                title: 'Success',
                variant: 'success',
                solid: true
              });
              _this19.$refs.addMemberModal.hide();
              _this19.resetAddMemberForm();
              _this19.fetchChallengeParticipants();
            } else {
              _this19.$bvToast.toast('Failed to add member to challenge', {
                title: 'Error',
                variant: 'danger',
                solid: true
              });
            }
            _context19.next = 42;
            break;
          case 36:
            _context19.prev = 36;
            _context19.t0 = _context19["catch"](1);
            console.error('Error adding member to challenge:', _context19.t0);
            errorMsg = 'Failed to add member to challenge'; // Bulletproof error handling
            if (_context19.t0 && _typeof(_context19.t0) === 'object') {
              // Check for response object
              if (_context19.t0.response && _typeof(_context19.t0.response) === 'object') {
                // Handle HTTP status codes
                if (_context19.t0.response.status === 422) {
                  errorMsg = 'Validation failed. Please check your input.';
                } else if (_context19.t0.response.status === 404) {
                  errorMsg = 'Challenge or member not found.';
                } else if (_context19.t0.response.status === 409) {
                  errorMsg = 'Member is already participating in this challenge.';
                } else if (_context19.t0.response.status === 500) {
                  errorMsg = 'Server error. Please try again later.';
                } else if (_context19.t0.response.status === 401) {
                  errorMsg = 'Unauthorized. Please login again.';
                } else if (_context19.t0.response.status === 403) {
                  errorMsg = 'Access denied.';
                }

                // Safely access response data
                if (_context19.t0.response.data && _typeof(_context19.t0.response.data) === 'object') {
                  if (_context19.t0.response.data.message && typeof _context19.t0.response.data.message === 'string') {
                    errorMsg = _context19.t0.response.data.message;
                  } else if (_context19.t0.response.data.error && typeof _context19.t0.response.data.error === 'string') {
                    errorMsg = _context19.t0.response.data.error;
                  } else if (_context19.t0.response.data.errors && _typeof(_context19.t0.response.data.errors) === 'object') {
                    _errors = Object.values(_context19.t0.response.data.errors).flat();
                    errorMsg = _errors.join(', ');
                  }
                } else if (_context19.t0.response.statusText && typeof _context19.t0.response.statusText === 'string') {
                  errorMsg = _context19.t0.response.statusText;
                }
              }
              // Check for request object (network error)
              else if (_context19.t0.request) {
                errorMsg = 'Network error. Please check your connection.';
              }
              // Check for message property
              else if (_context19.t0.message && typeof _context19.t0.message === 'string') {
                errorMsg = _context19.t0.message;
              }
            }
            _this19.$bvToast.toast(errorMsg, {
              title: 'Error',
              variant: 'danger',
              solid: true
            });
          case 42:
            _this19.addingMember = false;
          case 43:
          case "end":
            return _context19.stop();
        }
      }, _callee19, null, [[1, 36]]);
    }))();
  }), "resetAddMemberForm", function resetAddMemberForm() {
    this.addMemberForm = {
      challengeId: null,
      memberId: null,
      progress: 0,
      status: 'Active'
    };
    this.addMemberValidation = {
      challengeId: null,
      memberId: null
    };
  })),
  computed: {
    challengeOptions: function challengeOptions() {
      return [{
        value: null,
        text: "All Challenges"
      }].concat(_toConsumableArray(this.challenges.map(function (c) {
        return {
          value: c.id,
          text: c.name
        };
      })));
    },
    filteredParticipants: function filteredParticipants() {
      var _this20 = this;
      if (!this.selectedChallengeFilter) {
        return this.participants;
      }
      return this.participants.filter(function (p) {
        return p.challenge_id === _this20.selectedChallengeFilter;
      });
    },
    filteredLeaderboard: function filteredLeaderboard() {
      // Use calculated leaderboard instead of static data
      return this.calculatedLeaderboard;
    },
    totalParticipants: function totalParticipants() {
      return this.participants.length;
    },
    isAddMemberFormValid: function isAddMemberFormValid() {
      return this.addMemberForm.challengeId && this.addMemberForm.memberId && this.addMemberForm.status;
    },
    averageCompletionRate: function averageCompletionRate() {
      if (this.participants.length === 0) return 0;
      var completed = this.participants.filter(function (p) {
        return p.status === "Completed" || p.progress >= 100;
      }).length;
      return Math.round(completed / this.participants.length * 100) || 0;
    },
    isFormValid: function isFormValid() {
      var baseValidation = this.validation.name === true && this.validation.goal === true && this.validation.reward === true && this.validation.description === true && this.validation.startDate === true && this.validation.endDate === true && this.validation.participationFee === true && this.validation.rules === true;

      // If enrollment is allowed, maxParticipants is required
      if (this.newChallenge.allowEnrollment) {
        return baseValidation && this.validation.maxParticipants === true;
      }
      return baseValidation;
    },
    isRewardFormValid: function isRewardFormValid() {
      return this.rewardValidation.name === true && this.rewardValidation.description === true && this.rewardValidation.points === true && this.rewardValidation.category === true;
    },
    isEditRewardFormValid: function isEditRewardFormValid() {
      return this.editRewardValidation.name === true && this.editRewardValidation.description === true && this.editRewardValidation.points === true && this.editRewardValidation.category === true;
    },
    isCurrentStepValid: function isCurrentStepValid() {
      switch (this.currentStep) {
        case 1:
          return this.validation.name === true && this.validation.goal === true && this.validation.reward === true;
        case 2:
          return this.validation.description === true && this.validation.startDate === true && this.validation.endDate === true && this.validation.participationFee === true;
        case 3:
          var baseValidation = this.validation.rules === true;
          if (this.newChallenge.allowEnrollment) {
            return baseValidation && this.validation.maxParticipants === true;
          }
          return baseValidation;
        default:
          return false;
      }
    },
    isEditFormValid: function isEditFormValid() {
      var baseValidation = this.editValidation.name === true && this.editValidation.goal === true && this.editValidation.reward === true && this.editValidation.description === true && this.editValidation.startDate === true && this.editValidation.endDate === true && this.editValidation.participationFee === true && this.editValidation.rules === true;

      // If enrollment is allowed, maxParticipants is required
      if (this.editingChallenge.allowEnrollment) {
        return baseValidation && this.editValidation.maxParticipants === true;
      }
      return baseValidation;
    },
    isCurrentEditStepValid: function isCurrentEditStepValid() {
      switch (this.currentEditStep) {
        case 1:
          return this.editValidation.name === true &&
          // this.editValidation.duration === true &&
          this.editValidation.goal === true && this.editValidation.reward === true;
        case 2:
          return this.editValidation.description === true && this.editValidation.startDate === true && this.editValidation.endDate === true && this.editValidation.participationFee === true;
        case 3:
          var baseValidation = this.editValidation.rules === true;
          if (this.editingChallenge.allowEnrollment) {
            return baseValidation && this.editValidation.maxParticipants === true;
          }
          return baseValidation;
        default:
          return false;
      }
    },
    rewardOptions: function rewardOptions() {
      return this.rewards.filter(function (reward) {
        return reward.status === 'Active';
      }).map(function (reward) {
        return {
          value: reward.id,
          text: "".concat(reward.name, " (").concat(reward.points, " pts)")
        };
      });
    },
    challengesWithRemainingDays: function challengesWithRemainingDays() {
      return this.challenges.map(function (challenge) {
        var remaining = 0;
        if (challenge.endDate && challenge.startDate) {
          var end = new Date(challenge.endDate);
          var start = new Date(challenge.startDate);
          remaining = Math.max(0, Math.ceil((end - new Date()) / (1000 * 60 * 60 * 24)));
        }
        return _objectSpread(_objectSpread({}, challenge), {}, {
          remainingDays: remaining,
          participants: challenge.participants_count || 0
        });
      });
    },
    // Calculate leaderboard from participants data
    calculatedLeaderboard: function calculatedLeaderboard() {
      var _this21 = this;
      if (!this.selectedLeaderboardChallenge) {
        // All challenges leaderboard - aggregate by member
        var memberStats = {};
        this.participants.forEach(function (participant) {
          var memberId = participant.memberId || participant.member_id;
          if (!memberStats[memberId]) {
            memberStats[memberId] = {
              id: memberId,
              name: participant.name,
              points: 0,
              progress: 0,
              challenges: [],
              achievements: []
            };
          }
          // Use progress as points (or you can calculate based on your business logic)
          memberStats[memberId].points += participant.progress || 0;
          memberStats[memberId].challenges.push(participant.challengeId);

          // Add achievements based on progress
          if (participant.progress >= 100) {
            memberStats[memberId].achievements.push('Completed');
          }
          if (participant.progress >= 90) {
            memberStats[memberId].achievements.push('Almost There');
          }
          if (participant.progress >= 75) {
            memberStats[memberId].achievements.push('Consistent');
          }
        });

        // Convert to array and sort by points
        return Object.values(memberStats).sort(function (a, b) {
          return b.points - a.points;
        }).map(function (member, index) {
          // Calculate level inline
          var level = 'Bronze';
          if (member.points >= 1000) level = 'Gold';else if (member.points >= 500) level = 'Silver';
          return _objectSpread(_objectSpread({}, member), {}, {
            rank: index + 1,
            level: level,
            challengeId: member.challenges[0] // Use first challenge for display
          });
        });
      } else {
        // Filter by selected challenge
        var challengeParticipants = this.participants.filter(function (p) {
          return p.challengeId === _this21.selectedLeaderboardChallenge || p.challenge_id === _this21.selectedLeaderboardChallenge;
        }).sort(function (a, b) {
          return (b.progress || 0) - (a.progress || 0);
        }).map(function (participant, index) {
          var achievements = [];
          if (participant.progress >= 100) achievements.push('Completed');
          if (participant.progress >= 90) achievements.push('Almost There');
          if (participant.progress >= 75) achievements.push('Consistent');

          // Calculate level inline
          var points = participant.progress || 0;
          var level = 'Bronze';
          if (points >= 1000) level = 'Gold';else if (points >= 500) level = 'Silver';
          return {
            id: participant.id,
            rank: index + 1,
            name: participant.name,
            points: points,
            challengeId: participant.challengeId || participant.challenge_id,
            achievements: achievements.length > 0 ? achievements : ['Participant'],
            level: level
          };
        });
        return challengeParticipants;
      }
    },
    // Get top challenges by participant count
    topChallenges: function topChallenges() {
      return this.challenges.filter(function (c) {
        return c.participants_count > 0;
      }).sort(function (a, b) {
        return (b.participants_count || 0) - (a.participants_count || 0);
      }).slice(0, 5).map(function (challenge) {
        return {
          id: challenge.id,
          name: challenge.name,
          participants: challenge.participants_count || 0
        };
      });
    },
    // Calculate completed challenges
    completedChallenges: function completedChallenges() {
      var now = new Date();
      return this.challenges.filter(function (challenge) {
        // Challenge is completed if status is Completed or end date has passed
        return challenge.status === 'Completed' || challenge.endDate && new Date(challenge.endDate) < now;
      }).length;
    },
    // Generate recent activities from participants and challenges
    generatedRecentActivities: function generatedRecentActivities() {
      var _this22 = this;
      var activities = [];
      var now = new Date();

      // Get recent participant activities
      var recentParticipants = _toConsumableArray(this.participants).sort(function (a, b) {
        var dateA = a.lastActivity && a.lastActivity !== 'N/A' ? new Date(a.lastActivity) : new Date(0);
        var dateB = b.lastActivity && b.lastActivity !== 'N/A' ? new Date(b.lastActivity) : new Date(0);
        return dateB - dateA;
      }).slice(0, 10);
      recentParticipants.forEach(function (participant) {
        if (participant.lastActivity && participant.lastActivity !== 'N/A') {
          var activityDate = new Date(participant.lastActivity);
          var timeDiff = now - activityDate;
          var hoursAgo = Math.floor(timeDiff / (1000 * 60 * 60));
          var daysAgo = Math.floor(hoursAgo / 24);
          var timeText = '';
          if (hoursAgo < 1) {
            timeText = 'Just now';
          } else if (hoursAgo < 24) {
            timeText = "".concat(hoursAgo, " ").concat(hoursAgo === 1 ? 'hour' : 'hours', " ago");
          } else {
            timeText = "".concat(daysAgo, " ").concat(daysAgo === 1 ? 'day' : 'days', " ago");
          }
          var challenge = _this22.challenges.find(function (c) {
            return c.id === (participant.challengeId || participant.challenge_id);
          });
          var challengeName = challenge ? challenge.name : 'Challenge';
          if (participant.progress >= 100) {
            activities.push({
              id: "completed-".concat(participant.id),
              time: timeText,
              message: "".concat(participant.name, " completed ").concat(challengeName)
            });
          } else if (participant.progress >= 90) {
            activities.push({
              id: "progress-".concat(participant.id),
              time: timeText,
              message: "".concat(participant.name, " achieved ").concat(participant.progress, "% progress in ").concat(challengeName)
            });
          }
        }
      });

      // Get recent challenge creations
      var recentChallenges = _toConsumableArray(this.challenges).sort(function (a, b) {
        var dateA = a.created_at ? new Date(a.created_at) : new Date(0);
        var dateB = b.created_at ? new Date(b.created_at) : new Date(0);
        return dateB - dateA;
      }).slice(0, 3);
      recentChallenges.forEach(function (challenge) {
        if (challenge.created_at) {
          var activityDate = new Date(challenge.created_at);
          var timeDiff = now - activityDate;
          var hoursAgo = Math.floor(timeDiff / (1000 * 60 * 60));
          var daysAgo = Math.floor(hoursAgo / 24);
          var timeText = '';
          if (hoursAgo < 24) {
            timeText = "".concat(hoursAgo, " ").concat(hoursAgo === 1 ? 'hour' : 'hours', " ago");
          } else {
            timeText = "".concat(daysAgo, " ").concat(daysAgo === 1 ? 'day' : 'days', " ago");
          }
          activities.push({
            id: "challenge-".concat(challenge.id),
            time: timeText,
            message: "New challenge \"".concat(challenge.name, "\" created with ").concat(challenge.participants_count || 0, " participants")
          });
        }
      });

      // Sort all activities by time and return top 10
      return activities.sort(function (a, b) {
        // Simple sort by time text (could be improved)
        return a.time.localeCompare(b.time);
      }).slice(0, 10);
    },
    onModalShow: function onModalShow() {
      // Reset validation states when modal opens
      this.addMemberValidation = {
        challengeId: null,
        memberId: null
      };
    },
    // Helper method to get level from points
    getLevelFromPoints: function getLevelFromPoints(points) {
      if (points >= 1000) return 'Gold';
      if (points >= 500) return 'Silver';
      return 'Bronze';
    },
    // Validation methods
    validateChallengeSelection: function validateChallengeSelection() {
      this.addMemberValidation.challengeId = this.addMemberForm.challengeId ? true : false;
    },
    validateMemberSelection: function validateMemberSelection() {
      this.addMemberValidation.memberId = this.addMemberForm.memberId ? true : false;
    }
  },
  created: function created() {
    // Ensure modal is closed when component is created
    this.showAddMemberModal = false;
  },
  mounted: function mounted() {
    this.setActiveTabFromRoute();
    this.fetchRewards(); // Load rewards from API when component mounts
    this.fetchChallenges(); // Load challenges from API when component mounts
    this.fetchChallengeParticipants(); // Load participants from API when component mounts
  }
});

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js??clonedRuleSet-12.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12.use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-12.use[3]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/Challenges/ChallengesPage.vue?vue&type=style&index=0&id=0218d4de&lang=scss&scoped=true":
/*!****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??clonedRuleSet-12.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12.use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-12.use[3]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/Challenges/ChallengesPage.vue?vue&type=style&index=0&id=0218d4de&lang=scss&scoped=true ***!
  \****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
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
___CSS_LOADER_EXPORT___.push([module.id, "@charset \"UTF-8\";\n.filter-btn .btn[data-v-0218d4de],\n.filter-btn .btn-secondary[data-v-0218d4de],\n.filter-btn .btn-outline-secondary[data-v-0218d4de],\n.filter-btn button.btn[data-v-0218d4de],\n.filter-btn button.btn-secondary[data-v-0218d4de] {\n  color: #000 !important;\n  background-color: transparent !important;\n  border-color: #6c757d !important;\n}\n.filter-btn .btn[data-v-0218d4de]:hover,\n.filter-btn .btn-secondary[data-v-0218d4de]:hover,\n.filter-btn .btn-outline-secondary[data-v-0218d4de]:hover,\n.filter-btn button.btn[data-v-0218d4de]:hover,\n.filter-btn button.btn-secondary[data-v-0218d4de]:hover {\n  color: #dc3545 !important;\n  background-color: transparent !important;\n  border-color: #dc3545 !important;\n  box-shadow: none !important;\n}\n.filter-btn .btn[data-v-0218d4de]:focus,\n.filter-btn .btn-secondary[data-v-0218d4de]:focus,\n.filter-btn .btn-outline-secondary[data-v-0218d4de]:focus,\n.filter-btn button.btn[data-v-0218d4de]:focus,\n.filter-btn button.btn-secondary[data-v-0218d4de]:focus {\n  color: #dc3545 !important;\n  background-color: transparent !important;\n  border-color: #dc3545 !important;\n  box-shadow: none !important;\n}\n.filter-btn .btn[data-v-0218d4de]:active,\n.filter-btn .btn-secondary[data-v-0218d4de]:active,\n.filter-btn .btn-outline-secondary[data-v-0218d4de]:active,\n.filter-btn button.btn[data-v-0218d4de]:active,\n.filter-btn button.btn-secondary[data-v-0218d4de]:active {\n  color: #dc3545 !important;\n  background-color: transparent !important;\n  border-color: #dc3545 !important;\n}\n.btn-secondary[data-v-0218d4de]:not(:disabled):not(.disabled):active:focus {\n  box-shadow: none !important;\n}\n\n/* ===========================================\n   COMMON BREADCRUMB NAVIGATION STYLES\n   =========================================== */\n.breadcrumb-nav-row[data-v-0218d4de] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  margin-bottom: 0.5rem;\n  gap: 0.5rem;\n}\n.breadcrumb-section[data-v-0218d4de] {\n  flex: 1;\n}\n.breadcrumb-section .breadcrumb-nav .breadcrumb-container[data-v-0218d4de] {\n  display: flex;\n  align-items: center;\n  gap: 1rem;\n}\n.breadcrumb-section .breadcrumb-nav .breadcrumb-container .back-button[data-v-0218d4de] {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  width: 40px;\n  height: 40px;\n  background: rgba(255, 255, 255, 0.1);\n  border: 1px solid rgba(255, 255, 255, 0.2);\n  border-radius: 8px;\n  color: #ffffff;\n  cursor: pointer;\n  transition: all 0.3s ease;\n}\n.breadcrumb-section .breadcrumb-nav .breadcrumb-container .back-button[data-v-0218d4de]:hover {\n  background: rgba(255, 255, 255, 0.15);\n  border-color: rgba(255, 255, 255, 0.3);\n  transform: translateY(-1px);\n  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);\n  color: #dc3545;\n}\n.breadcrumb-section .breadcrumb-nav .breadcrumb-container .back-button i[data-v-0218d4de] {\n  font-size: 1.1em;\n}\n.breadcrumb-section .breadcrumb-nav .breadcrumb-container .breadcrumb[data-v-0218d4de] {\n  display: flex;\n  align-items: center;\n  gap: 0.5rem;\n  margin: 0;\n  padding: 0;\n  background: none;\n  border-radius: 0;\n}\n.breadcrumb-section .breadcrumb-nav .breadcrumb-container .breadcrumb .breadcrumb-item[data-v-0218d4de] {\n  display: flex;\n  align-items: center;\n  gap: 0.5rem;\n  font-size: 0.875rem;\n  color: #ffffff;\n}\n.breadcrumb-section .breadcrumb-nav .breadcrumb-container .breadcrumb .breadcrumb-item.active[data-v-0218d4de] {\n  color: #252525;\n  font-weight: 600;\n}\n.breadcrumb-section .breadcrumb-nav .breadcrumb-container .breadcrumb .breadcrumb-item.active i[data-v-0218d4de] {\n  color: #dc3545;\n}\n.breadcrumb-section .breadcrumb-nav .breadcrumb-container .breadcrumb .breadcrumb-item a[data-v-0218d4de] {\n  display: flex;\n  align-items: center;\n  gap: 0.5rem;\n  color: #6a6a6a;\n  text-decoration: none;\n  transition: color 0.3s ease;\n}\n.breadcrumb-section .breadcrumb-nav .breadcrumb-container .breadcrumb .breadcrumb-item a[data-v-0218d4de]:hover {\n  color: #dc3545;\n}\n.breadcrumb-section .breadcrumb-nav .breadcrumb-container .breadcrumb .breadcrumb-item a:hover i[data-v-0218d4de] {\n  color: #dc3545;\n}\n.breadcrumb-section .breadcrumb-nav .breadcrumb-container .breadcrumb .breadcrumb-item a i[data-v-0218d4de] {\n  font-size: 0.9em;\n  transition: color 0.3s ease;\n}\n.breadcrumb-section .breadcrumb-nav .breadcrumb-container .breadcrumb .breadcrumb-item[data-v-0218d4de]:not(:last-child)::after {\n  content: \"›\";\n  margin-left: 0.5rem;\n  color: #6a6a6a;\n  font-size: 1.2em;\n}\n.action-section[data-v-0218d4de] {\n  display: flex;\n  align-items: center;\n}\n.action-section .action-btn[data-v-0218d4de] {\n  display: flex;\n  align-items: center;\n  gap: 0.5rem;\n  padding: 0.5rem 1rem;\n  border-radius: 8px;\n  font-size: 0.875rem;\n  font-weight: 500;\n  transition: all 0.3s ease;\n}\n.action-section .action-btn[data-v-0218d4de]:hover:not(:disabled) {\n  transform: translateY(-1px);\n  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);\n}\n.action-section .action-btn[data-v-0218d4de]:disabled {\n  opacity: 0.6;\n  cursor: not-allowed;\n}\n.action-section .action-btn i[data-v-0218d4de] {\n  font-size: 0.9em;\n}\n@media (max-width: 768px) {\n.breadcrumb-nav-row[data-v-0218d4de] {\n    flex-direction: column;\n    align-items: flex-start;\n    gap: 0.5rem;\n}\n.breadcrumb-section[data-v-0218d4de] {\n    width: 100%;\n}\n.breadcrumb-section .breadcrumb-container[data-v-0218d4de] {\n    flex-direction: column;\n    align-items: flex-start;\n    gap: 0.5rem;\n}\n.breadcrumb-section .breadcrumb-container .breadcrumb[data-v-0218d4de] {\n    flex-wrap: wrap;\n}\n.breadcrumb-section .breadcrumb-container .breadcrumb .breadcrumb-item[data-v-0218d4de] {\n    font-size: 0.8rem;\n}\n.breadcrumb-section .breadcrumb-container .breadcrumb .breadcrumb-item a[data-v-0218d4de] {\n    font-size: 0.8rem;\n}\n.action-section[data-v-0218d4de] {\n    width: 100%;\n    justify-content: flex-end;\n}\n.action-section .action-btn[data-v-0218d4de] {\n    font-size: 0.8rem;\n    padding: 0.4rem 0.8rem;\n}\n}\n/* ===========================================\n   RESPONSIVE UTILITY CLASSES (ALL DEVICES)\n   =========================================== */\n.show-xs-only[data-v-0218d4de],\n.show-sm-only[data-v-0218d4de],\n.show-md-only[data-v-0218d4de],\n.show-lg-only[data-v-0218d4de],\n.show-xl-only[data-v-0218d4de] {\n  display: none !important;\n}\n@media (max-width: 575px) {\n.hide-xs[data-v-0218d4de] {\n    display: none !important;\n}\n.show-xs-only[data-v-0218d4de] {\n    display: initial !important;\n}\n}\n@media (min-width: 576px) and (max-width: 767px) {\n.hide-sm[data-v-0218d4de] {\n    display: none !important;\n}\n.show-sm-only[data-v-0218d4de] {\n    display: initial !important;\n}\n}\n@media (min-width: 768px) and (max-width: 991px) {\n.hide-md[data-v-0218d4de] {\n    display: none !important;\n}\n.show-md-only[data-v-0218d4de] {\n    display: initial !important;\n}\n}\n@media (min-width: 992px) and (max-width: 1199px) {\n.hide-lg[data-v-0218d4de] {\n    display: none !important;\n}\n.show-lg-only[data-v-0218d4de] {\n    display: initial !important;\n}\n}\n@media (min-width: 1200px) {\n.hide-xl[data-v-0218d4de] {\n    display: none !important;\n}\n.show-xl-only[data-v-0218d4de] {\n    display: initial !important;\n}\n}\n@media (max-width: 576px) {\n.hide-sm-down[data-v-0218d4de] {\n    display: none !important;\n}\n}\n@media (max-width: 768px) {\n.hide-md-down[data-v-0218d4de] {\n    display: none !important;\n}\n}\n@media (max-width: 992px) {\n.hide-lg-down[data-v-0218d4de] {\n    display: none !important;\n}\n}\n@media (min-width: 576px) {\n.hide-sm-up[data-v-0218d4de] {\n    display: none !important;\n}\n}\n@media (min-width: 768px) {\n.hide-md-up[data-v-0218d4de] {\n    display: none !important;\n}\n}\n@media (min-width: 992px) {\n.hide-lg-up[data-v-0218d4de] {\n    display: none !important;\n}\n}\n@media (max-width: 575px) {\n.d-xs-none[data-v-0218d4de] {\n    display: none !important;\n}\n.d-xs-block[data-v-0218d4de] {\n    display: block !important;\n}\n.d-xs-flex[data-v-0218d4de] {\n    display: flex !important;\n}\n}\n@media (min-width: 576px) and (max-width: 767px) {\n.d-sm-none[data-v-0218d4de] {\n    display: none !important;\n}\n.d-sm-block[data-v-0218d4de] {\n    display: block !important;\n}\n.d-sm-flex[data-v-0218d4de] {\n    display: flex !important;\n}\n}\n@media (min-width: 768px) and (max-width: 991px) {\n.d-md-none[data-v-0218d4de] {\n    display: none !important;\n}\n.d-md-block[data-v-0218d4de] {\n    display: block !important;\n}\n.d-md-flex[data-v-0218d4de] {\n    display: flex !important;\n}\n}\n@media (min-width: 992px) and (max-width: 1199px) {\n.d-lg-none[data-v-0218d4de] {\n    display: none !important;\n}\n.d-lg-block[data-v-0218d4de] {\n    display: block !important;\n}\n.d-lg-flex[data-v-0218d4de] {\n    display: flex !important;\n}\n}\n@media (min-width: 1200px) {\n.d-xl-none[data-v-0218d4de] {\n    display: none !important;\n}\n.d-xl-block[data-v-0218d4de] {\n    display: block !important;\n}\n.d-xl-flex[data-v-0218d4de] {\n    display: flex !important;\n}\n}\n@media (min-width: 576px) {\n.custom-modal-xl[data-v-0218d4de] {\n    max-width: 1500px !important;\n}\n}\n.challenges-page[data-v-0218d4de] {\n  background-color: #f5f5f3;\n  min-height: 100vh;\n  padding: 2rem 0;\n}\n.challenges-page .page-header[data-v-0218d4de] {\n  background: linear-gradient(to bottom, #23415a, #0f1c29);\n  border-radius: 15px;\n  padding: 1rem;\n  margin-bottom: 1rem;\n  box-shadow: 0 10px 15px rgba(0, 0, 0, 0.2);\n  color: #ffffff;\n  position: relative;\n  overflow: hidden;\n}\n.challenges-page .page-header[data-v-0218d4de]::before {\n  content: \"\";\n  position: absolute;\n  top: -50%;\n  right: -50%;\n  width: 200%;\n  height: 200%;\n  background: radial-gradient(circle, rgba(255, 255, 255, 0.1) 0%, transparent 70%);\n  animation: float-data-v-0218d4de 6s ease-in-out infinite;\n}\n.challenges-page .page-header .page-title[data-v-0218d4de] {\n  font-family: \"Inter\", \"Segoe UI\", \"Roboto\", \"Helvetica Neue\", Arial, sans-serif;\n  font-weight: 700;\n  font-size: 2rem;\n  margin-bottom: 0.5rem;\n  position: relative;\n  z-index: 2;\n  color: #ffffff;\n}\n.challenges-page .page-header .page-subtitle[data-v-0218d4de] {\n  font-size: 1.125rem;\n  opacity: 0.9;\n  margin-bottom: 1rem;\n  position: relative;\n  z-index: 2;\n  color: #ffffff;\n}\n.challenges-page .page-header .create-btn[data-v-0218d4de] {\n  background: rgba(255, 255, 255, 0.2);\n  border: 2px solid rgba(255, 255, 255, 0.3);\n  -webkit-backdrop-filter: blur(10px);\n          backdrop-filter: blur(10px);\n  transition: all 0.3s ease;\n  position: relative;\n  z-index: 2;\n}\n.challenges-page .page-header .create-btn[data-v-0218d4de]:hover {\n  background: rgba(255, 255, 255, 0.3);\n  border-color: rgba(255, 255, 255, 0.5);\n  transform: translateY(-2px);\n  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2);\n}\n.challenges-page .tab-navigation[data-v-0218d4de] {\n  display: flex;\n}\n.challenges-page .tab-navigation .tab-container[data-v-0218d4de] {\n  display: flex;\n  padding: 2px;\n  background: linear-gradient(to bottom, #23415a, #0f1c29);\n  border-radius: 10px;\n}\n.challenges-page .tab-navigation .tab-button[data-v-0218d4de] {\n  background: none;\n  border: none;\n  padding: 0.5rem 1rem;\n  border-radius: 10px;\n  font-weight: 600;\n  color: #ffffff;\n  transition: all 0.3s ease;\n  display: flex;\n  align-items: center;\n  gap: 0.5rem;\n  cursor: pointer;\n  white-space: nowrap;\n}\n.challenges-page .tab-navigation .tab-button[data-v-0218d4de]:hover {\n  color: #ffffff;\n  transform: translateY(-2px);\n  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);\n}\n.challenges-page .tab-navigation .tab-button.active[data-v-0218d4de] {\n  background: linear-gradient(to bottom, #23415a, #0f1c29);\n  color: #ffffff;\n  box-shadow: 0 10px 15px rgba(0, 0, 0, 0.2);\n}\n.challenges-page .tab-navigation .tab-button i[data-v-0218d4de] {\n  font-size: 0.875rem;\n}\n.challenges-page .tab-content-container[data-v-0218d4de] {\n  position: relative;\n  overflow: hidden;\n}\n.challenges-page .tab-content[data-v-0218d4de] {\n  animation: slideIn-data-v-0218d4de 0.5s ease-out;\n  position: relative;\n  z-index: 2;\n}\n.challenges-page .tab-content h4[data-v-0218d4de] {\n  font-family: \"Inter\", \"Segoe UI\", \"Roboto\", \"Helvetica Neue\", Arial, sans-serif;\n  font-weight: 700;\n  font-size: 1.5rem;\n  color: #252525;\n  margin-bottom: 1.5rem;\n  position: relative;\n  padding-bottom: 0.5rem;\n}\n.challenges-page .tab-content h4[data-v-0218d4de]::after {\n  content: \"\";\n  position: absolute;\n  bottom: 0;\n  left: 0;\n  width: 60px;\n  height: 3px;\n  background: linear-gradient(90deg, #dc3545 0%, rgb(235.0632911392, 139.9367088608, 149.0506329114) 100%);\n  border-radius: 2px;\n}\n.challenges-page .tab-content .card[data-v-0218d4de] {\n  border: none;\n  border-radius: 15px;\n  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);\n  transition: all 0.3s ease;\n  overflow: hidden;\n  position: relative;\n}\n.challenges-page .tab-content .card[data-v-0218d4de]::before {\n  content: \"\";\n  position: absolute;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 4px;\n}\n.challenges-page .tab-content .card[data-v-0218d4de]:hover {\n  transform: translateY(-5px);\n  box-shadow: 0 10px 15px rgba(0, 0, 0, 0.2);\n}\n.challenges-page .tab-content .card h3[data-v-0218d4de] {\n  font-size: 2rem;\n  font-weight: 800;\n  margin-bottom: 0.5rem;\n  color: #fff;\n}\n.challenges-page .tab-content .card p[data-v-0218d4de] {\n  font-weight: 600;\n  text-transform: uppercase;\n  letter-spacing: 0.5px;\n  font-size: 0.75rem;\n  opacity: 0.9;\n}\n.challenges-page .tab-content .table-responsive[data-v-0218d4de] {\n  border-radius: 8px;\n  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);\n  border: 1px solid #e0e0e0;\n}\n.challenges-page .tab-content .form-control[data-v-0218d4de],\n.challenges-page .tab-content .custom-select[data-v-0218d4de] {\n  border-radius: 8px;\n  border: 2px solid #e0e0e0;\n  transition: all 0.3s ease;\n  background: #dededc !important;\n}\n.challenges-page .tab-content .form-control[data-v-0218d4de]:focus,\n.challenges-page .tab-content .custom-select[data-v-0218d4de]:focus {\n  border-color: #dc3545;\n  box-shadow: 0 0 0 0.2rem rgba(220, 53, 69, 0.25);\n  background: hsl(0, 0%, 101%);\n}\n.challenges-page .tab-content .custom-badge[data-v-0218d4de] {\n  display: inline-block;\n  padding: 8px;\n  border-radius: 20px;\n  font-weight: 600;\n  font-size: 0.75rem;\n  letter-spacing: 0.5px;\n  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);\n  border: none;\n  transition: all 0.3s ease;\n  color: #ffffff;\n  text-decoration: none;\n}\n.challenges-page .tab-content .custom-badge[data-v-0218d4de]:hover {\n  transform: translateY(-2px);\n  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);\n}\n.challenges-page .tab-content .custom-badge.badge-active[data-v-0218d4de] {\n  background: linear-gradient(135deg, #28a745 0%, #20c997 100%);\n  color: #ffffff;\n}\n.challenges-page .tab-content .custom-badge.badge-completed[data-v-0218d4de] {\n  background: linear-gradient(135deg, #007bff 0%, #0056b3 100%);\n  color: #ffffff;\n}\n.challenges-page .tab-content .custom-badge.badge-inactive[data-v-0218d4de] {\n  background: linear-gradient(135deg, #6c757d 0%, #495057 100%);\n  color: #ffffff;\n}\n.challenges-page .tab-content .custom-badge.badge-info[data-v-0218d4de] {\n  background: linear-gradient(135deg, #17a2b8 0%, #138496 100%);\n  color: #ffffff;\n}\n.challenges-page .tab-content .custom-badge.badge-warning[data-v-0218d4de] {\n  background: linear-gradient(135deg, #ffc107 0%, #e0a800 100%);\n  color: #212529;\n}\n.challenges-page .tab-content .custom-badge.badge-primary[data-v-0218d4de] {\n  background: linear-gradient(135deg, #007bff 0%, #0056b3 100%);\n  color: #ffffff;\n}\n.challenges-page .tab-content .custom-badge.badge-secondary[data-v-0218d4de] {\n  background: linear-gradient(135deg, #6c757d 0%, #495057 100%);\n  color: #ffffff;\n}\n.challenges-page .tab-content .custom-badge.badge-points[data-v-0218d4de] {\n  background: linear-gradient(135deg, #fd7e14 0%, #e55a00 100%);\n  color: #ffffff;\n}\n.challenges-page .tab-content .custom-badge.badge-achievement[data-v-0218d4de] {\n  background: linear-gradient(135deg, #28a745 0%, #20c997 100%);\n  color: #ffffff;\n  font-size: 0.7rem;\n  padding: 0.25rem 0.5rem;\n}\n.challenges-page .tab-content .custom-badge.badge-reward[data-v-0218d4de] {\n  background: linear-gradient(135deg, #e83e8c 0%, #d63384 100%);\n  color: #ffffff;\n  font-size: 0.75rem;\n  padding: 0.4rem 0.8rem;\n}\n.challenges-page .tab-content .custom-badge.badge-participants[data-v-0218d4de] {\n  background: linear-gradient(135deg, #17a2b8 0%, #138496 100%);\n  color: #ffffff;\n  font-size: 0.75rem;\n  padding: 0.4rem 0.8rem;\n}\n.challenges-page .tab-content .progress[data-v-0218d4de] {\n  height: 30px;\n  border-radius: 15px;\n  background: rgb(236.75, 236.75, 236.75);\n  overflow: hidden;\n  box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.1);\n}\n.challenges-page .tab-content .progress .progress-bar[data-v-0218d4de] {\n  border-radius: 15px;\n  background: linear-gradient(90deg, #4caf50 0%, rgb(127.7589641434, 199.7410358566, 130.6673306773) 100%);\n  transition: width 0.8s ease;\n  position: relative;\n}\n.challenges-page .tab-content .progress .progress-bar[data-v-0218d4de]::after {\n  content: \"\";\n  position: absolute;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  background: linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.3) 50%, transparent 100%);\n  animation: shimmer-data-v-0218d4de 2s infinite;\n}\n.challenges-page .tab-content .list-group[data-v-0218d4de] {\n  border-radius: 12px;\n  overflow: hidden;\n  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);\n}\n.challenges-page .tab-content .list-group .list-group-item[data-v-0218d4de] {\n  border: none;\n  border-bottom: 1px solid #e0e0e0;\n  padding: 1rem 1.5rem;\n  background: #ffffff;\n  transition: all 0.3s ease;\n}\n.challenges-page .tab-content .list-group .list-group-item[data-v-0218d4de]:last-child {\n  border-bottom: none;\n}\n.challenges-page .tab-content .list-group .list-group-item[data-v-0218d4de]:hover {\n  background: rgb(249.6363636364, 249.6363636364, 248.5636363636);\n  transform: translateX(5px);\n}\n.challenges-page .tab-content .border-bottom[data-v-0218d4de] {\n  border-color: #e0e0e0 !important;\n  padding: 1rem 0;\n}\n.challenges-page .tab-content .border-bottom small[data-v-0218d4de] {\n  color: #6a6a6a;\n  font-weight: 600;\n  text-transform: uppercase;\n  letter-spacing: 0.5px;\n  font-size: 0.75rem;\n}\n.challenges-page .tab-content .border-bottom div[data-v-0218d4de] {\n  color: #252525;\n  font-weight: 500;\n  margin-top: 0.25rem;\n}\n.challenges-page .stats-card[data-v-0218d4de] {\n  background: linear-gradient(135deg, #ffffff 0%, hsl(0, 0%, 102%) 100%);\n  border: none;\n  border-radius: 15px;\n  padding: 1.5rem;\n  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);\n  transition: all 0.3s ease;\n  position: relative;\n  overflow: hidden;\n}\n.challenges-page .stats-card[data-v-0218d4de]::before {\n  content: \"\";\n  position: absolute;\n  top: 0;\n  left: 0;\n  width: 4px;\n  height: 100%;\n  background: #dc3545;\n}\n.challenges-page .stats-card[data-v-0218d4de]:hover {\n  transform: translateY(-5px);\n  box-shadow: 0 10px 15px rgba(0, 0, 0, 0.2);\n}\n.challenges-page .stats-card h3[data-v-0218d4de] {\n  font-size: 1.5rem;\n  font-weight: 700;\n  color: #dc3545;\n  margin-bottom: 0.5rem;\n}\n.challenges-page .stats-card p[data-v-0218d4de] {\n  color: #6a6a6a;\n  margin: 0;\n  font-size: 0.875rem;\n}\n.challenges-page[data-v-0218d4de]  .table {\n  color: #252525 !important;\n}\n.challenges-page[data-v-0218d4de]  .table th {\n  color: #252525 !important;\n}\n.challenges-page[data-v-0218d4de]  .table td {\n  color: #252525 !important;\n}\n.challenges-page[data-v-0218d4de]  .table tbody tr {\n  color: #252525 !important;\n}\n.challenges-page[data-v-0218d4de]  .b-table {\n  color: #252525 !important;\n}\n.challenges-page[data-v-0218d4de]  .b-table .table {\n  color: #252525 !important;\n}\n.challenges-page[data-v-0218d4de]  .b-table .table th {\n  color: #252525 !important;\n}\n.challenges-page[data-v-0218d4de]  .b-table .table td {\n  color: #252525 !important;\n  padding: 1rem;\n}\n.challenges-page[data-v-0218d4de]  .b-table .table tbody tr {\n  color: #252525 !important;\n}\n.challenges-page .table-container[data-v-0218d4de] {\n  background: #ffffff;\n  border-radius: 8px;\n  overflow: hidden;\n  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);\n  border: 1px solid #e0e0e0;\n  color: #252525 !important;\n}\n.challenges-page .table-container .table[data-v-0218d4de] {\n  margin: 0;\n  color: #252525 !important;\n}\n.challenges-page .table-container .table th[data-v-0218d4de] {\n  background: linear-gradient(135deg, #dc3545 0%, rgb(210.9493670886, 36.5506329114, 53.2594936709) 100%);\n  color: #252525 !important;\n  border: none;\n  padding: 1rem;\n  font-weight: 600;\n  text-transform: uppercase;\n  font-size: 0.75rem;\n  letter-spacing: 0.5px;\n  text-align: center;\n}\n.challenges-page .table-container .table th[data-v-0218d4de]:last-child {\n  text-align: center !important;\n  padding: 1rem;\n}\n.challenges-page .table-container .table td[data-v-0218d4de] {\n  padding: 1rem;\n  border-color: #e0e0e0;\n  vertical-align: middle;\n}\n.challenges-page .table-container .table td[data-v-0218d4de]:last-child {\n  text-align: center !important;\n  vertical-align: middle;\n  padding: 0.5rem 1rem;\n  white-space: nowrap;\n}\n.challenges-page .table-container .table tbody tr[data-v-0218d4de] {\n  transition: all 0.3s ease;\n  color: #252525 !important;\n}\n.challenges-page .table-container .table tbody tr[data-v-0218d4de]:hover {\n  background: rgb(249.6363636364, 249.6363636364, 248.5636363636);\n  transform: scale(1.01);\n}\n.challenges-page .progress-custom[data-v-0218d4de] {\n  height: 8px;\n  border-radius: 10px;\n  background: #e0e0e0;\n}\n.challenges-page .progress-custom .progress-bar[data-v-0218d4de] {\n  border-radius: 10px;\n  background: linear-gradient(90deg, #4caf50 0%, rgb(109.9800796813, 192.0199203187, 113.2948207171) 100%);\n  transition: width 0.6s ease;\n}\n.challenges-page .badge-custom[data-v-0218d4de] {\n  padding: 0.5rem 1rem;\n  border-radius: 20px;\n  font-weight: 600;\n  font-size: 0.75rem;\n  text-transform: uppercase;\n  letter-spacing: 0.5px;\n}\n.challenges-page .btn-custom[data-v-0218d4de] {\n  border-radius: 8px;\n  padding: 0.5rem 1rem;\n  font-weight: 600;\n  font-size: 0.875rem;\n  transition: all 0.3s ease;\n  border: 2px solid transparent;\n}\n.challenges-page .btn-custom[data-v-0218d4de]:hover {\n  transform: translateY(-2px);\n  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);\n}\n.challenges-page .btn-custom.btn-outline-info[data-v-0218d4de] {\n  color: #2196f3;\n  border-color: #2196f3;\n}\n.challenges-page .btn-custom.btn-outline-info[data-v-0218d4de]:hover {\n  background: #2196f3;\n  color: #ffffff;\n}\n.challenges-page .btn-custom.btn-outline-warning[data-v-0218d4de] {\n  color: #ff9800;\n  border-color: #ff9800;\n}\n.challenges-page .btn-custom.btn-outline-warning[data-v-0218d4de]:hover {\n  background: #ff9800;\n  color: #ffffff;\n}\n.challenges-page .btn-custom.btn-outline-danger[data-v-0218d4de] {\n  color: #f44336;\n  border-color: #f44336;\n}\n.challenges-page .btn-custom.btn-outline-danger[data-v-0218d4de]:hover {\n  background: #f44336;\n  color: #ffffff;\n}\n.challenges-page .btn-custom.btn-outline-success[data-v-0218d4de] {\n  color: #4caf50;\n  border-color: #4caf50;\n}\n.challenges-page .btn-custom.btn-outline-success[data-v-0218d4de]:hover {\n  background: #4caf50;\n  color: #ffffff;\n}\n.challenges-page .action-buttons[data-v-0218d4de] {\n  display: flex;\n  gap: 0.5rem;\n  justify-content: center;\n  align-items: center;\n  width: 100%;\n  margin: 0 auto;\n}\n.challenges-page .action-section[data-v-0218d4de] {\n  display: flex;\n  align-items: center;\n  justify-content: flex-end;\n}\n.challenges-page .action-section .action-btn[data-v-0218d4de] {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  padding: 0.5rem 1rem;\n  border-radius: 8px;\n  font-weight: 600;\n  font-size: 0.875rem;\n  transition: all 0.3s ease;\n  border: none;\n  cursor: pointer;\n  gap: 0.5rem;\n}\n.challenges-page .action-section .action-btn i[data-v-0218d4de] {\n  font-size: 0.875rem;\n}\n.challenges-page .action-section .action-btn[data-v-0218d4de]:hover {\n  transform: translateY(-1px);\n  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);\n}\n.challenges-page .action-buttons .action-btn[data-v-0218d4de] {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  width: 32px;\n  height: 32px;\n  border: none;\n  border-radius: 6px;\n  cursor: pointer;\n  transition: all 0.2s ease;\n  font-size: 0.875rem;\n  flex-shrink: 0;\n  margin: 0;\n}\n.challenges-page .action-buttons .action-btn.view-btn[data-v-0218d4de] {\n  background: #e3f2fd;\n  color: #1976d2;\n}\n.challenges-page .action-buttons .action-btn.view-btn[data-v-0218d4de]:hover {\n  background: #bbdefb;\n  transform: scale(1.05);\n}\n.challenges-page .action-buttons .action-btn.edit-btn[data-v-0218d4de] {\n  background: #fff3e0;\n  color: #f57c00;\n}\n.challenges-page .action-buttons .action-btn.edit-btn[data-v-0218d4de]:hover {\n  background: #ffe0b2;\n  transform: scale(1.05);\n}\n.challenges-page .action-buttons .action-btn.delete-btn[data-v-0218d4de] {\n  background: #ffebee;\n  color: #d32f2f;\n}\n.challenges-page .action-buttons .action-btn.delete-btn[data-v-0218d4de]:hover {\n  background: #ffcdd2;\n  transform: scale(1.05);\n}\n.challenges-page .action-buttons .action-btn.message-btn[data-v-0218d4de] {\n  background: #e8f5e8;\n  color: #2e7d32;\n}\n.challenges-page .action-buttons .action-btn.message-btn[data-v-0218d4de]:hover {\n  background: #c8e6c9;\n  transform: scale(1.05);\n}\n.challenges-page .action-buttons .action-btn.profile-btn[data-v-0218d4de] {\n  background: #f3e5f5;\n  color: #7b1fa2;\n}\n.challenges-page .action-buttons .action-btn.profile-btn[data-v-0218d4de]:hover {\n  background: #e1bee7;\n  transform: scale(1.05);\n}\n.challenges-page .action-buttons .action-btn[data-v-0218d4de]:focus {\n  outline: none;\n  box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.25);\n}\n.challenges-page .challenge-name-link[data-v-0218d4de] {\n  color: #dc3545;\n  cursor: pointer;\n  font-weight: 500;\n  transition: all 0.3s ease;\n  text-decoration: none;\n  display: inline-block;\n  padding: 0.25rem 0.5rem;\n  border-radius: 4px;\n  margin: -0.25rem -0.5rem;\n}\n.challenges-page .challenge-name-link[data-v-0218d4de]:hover {\n  color: rgb(167.4810126582, 29.0189873418, 42.2848101266);\n  background-color: rgba(220, 53, 69, 0.1);\n  text-decoration: none;\n  transform: translateY(-1px);\n}\n.challenges-page .challenge-name-link[data-v-0218d4de]:active {\n  transform: translateY(0);\n}\n.challenges-page[data-v-0218d4de]  .b-table .table th:last-child,\n.challenges-page[data-v-0218d4de]  .b-table .table td:last-child {\n  text-align: center !important;\n}\n.challenges-page[data-v-0218d4de]  .modal-content {\n  border-radius: 15px;\n  border: none;\n  box-shadow: 0 10px 15px rgba(0, 0, 0, 0.2);\n}\n.challenges-page[data-v-0218d4de]  .modal-content .modal-header {\n  background: linear-gradient(135deg, #dc3545 0%, rgb(189.2151898734, 32.7848101266, 47.7721518987) 100%);\n  color: #ffffff;\n  border-radius: 15px 15px 0 0;\n  border: none;\n}\n.challenges-page[data-v-0218d4de]  .modal-content .modal-header .modal-title {\n  font-weight: 600;\n}\n.challenges-page[data-v-0218d4de]  .modal-content .modal-body {\n  padding: 2rem;\n  color: #252525 !important;\n}\n.challenges-page[data-v-0218d4de]  .modal-content .modal-body .form-group label {\n  color: #252525 !important;\n  font-weight: 600;\n}\n.challenges-page[data-v-0218d4de]  .modal-content .modal-body .form-control {\n  color: #252525 !important;\n  border-radius: 8px;\n  border: 2px solid #e0e0e0;\n  padding: 0.5rem 1rem;\n  transition: all 0.3s ease;\n}\n.challenges-page[data-v-0218d4de]  .modal-content .modal-body .form-control:focus {\n  border-color: #dc3545;\n  box-shadow: 0 0 0 0.2rem rgba(220, 53, 69, 0.25);\n}\n.challenges-page[data-v-0218d4de]  .modal-content .modal-body .form-control::-moz-placeholder {\n  color: #6c757d;\n}\n.challenges-page[data-v-0218d4de]  .modal-content .modal-body .form-control::placeholder {\n  color: #6c757d;\n}\n.challenges-page[data-v-0218d4de]  .modal-content .modal-body .form-textarea {\n  color: #252525 !important;\n}\n.challenges-page[data-v-0218d4de]  .modal-content .modal-body .b-form-group label {\n  color: #252525 !important;\n  font-weight: 600;\n}\n.challenges-page[data-v-0218d4de]  .modal-content .modal-body .b-form-input {\n  color: #252525 !important;\n}\n.challenges-page[data-v-0218d4de]  .modal-content .modal-body .b-form-textarea {\n  color: #252525 !important;\n}\n.challenges-page .activity-item[data-v-0218d4de] {\n  padding: 1rem;\n  border-left: 3px solid #dc3545;\n  margin-bottom: 1rem;\n  background: rgb(247.3181818182, 247.3181818182, 245.7818181818);\n  border-radius: 0 8px 8px 0;\n  transition: all 0.3s ease;\n}\n.challenges-page .activity-item[data-v-0218d4de]:hover {\n  background: rgb(251.9545454545, 251.9545454545, 251.3454545455);\n  transform: translateX(5px);\n}\n.challenges-page .activity-item .activity-time[data-v-0218d4de] {\n  color: #6a6a6a;\n  font-size: 0.75rem;\n  font-weight: 600;\n}\n.challenges-page .activity-item .activity-message[data-v-0218d4de] {\n  color: #252525;\n  font-weight: 500;\n  margin-top: 0.25rem;\n}\n.challenges-page .challenge-card[data-v-0218d4de] {\n  background: #ffffff;\n  border-radius: 12px;\n  padding: 1.5rem;\n  margin-bottom: 1rem;\n  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);\n  border: 1px solid #e0e0e0;\n  transition: all 0.3s ease;\n}\n.challenges-page .challenge-card[data-v-0218d4de]:hover {\n  transform: translateY(-3px);\n  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);\n}\n@keyframes float-data-v-0218d4de {\n0%, 100% {\n    transform: translateY(0px) rotate(0deg);\n}\n50% {\n    transform: translateY(-20px) rotate(180deg);\n}\n}\n@keyframes slideIn-data-v-0218d4de {\nfrom {\n    opacity: 0;\n    transform: translateY(20px);\n}\nto {\n    opacity: 1;\n    transform: translateY(0);\n}\n}\n@keyframes shimmer-data-v-0218d4de {\n0% {\n    transform: translateX(-100%);\n}\n100% {\n    transform: translateX(100%);\n}\n}\n@media (max-width: 768px) {\n.challenges-page[data-v-0218d4de] {\n    padding: 1rem 0;\n}\n.challenges-page .page-header[data-v-0218d4de] {\n    padding: 1rem;\n    margin-bottom: 1rem;\n}\n.challenges-page .tab-navigation[data-v-0218d4de] {\n    padding: 0.5rem;\n}\n.challenges-page .tab-navigation .tab-container[data-v-0218d4de] {\n    gap: 0.5rem;\n    padding: 0.25rem;\n}\n.challenges-page .tab-navigation .tab-button[data-v-0218d4de] {\n    padding: 0.5rem 1rem;\n    font-size: 0.875rem;\n}\n.challenges-page .tab-navigation .tab-button i[data-v-0218d4de] {\n    font-size: 0.75rem;\n}\n.challenges-page .tab-content-container[data-v-0218d4de] {\n    padding: 1rem;\n}\n}\nb-modal .modal-text[data-v-0218d4de],\nb-form .modal-text[data-v-0218d4de],\nb-form-group .modal-text[data-v-0218d4de],\nb-form-input .modal-text[data-v-0218d4de],\nb-form-textarea .modal-text[data-v-0218d4de] {\n  color: #252525 !important;\n}\n[data-v-0218d4de] .challenge-create-modal .modal-dialog,[data-v-0218d4de] .challenge-edit-modal .modal-dialog {\n  max-width: 90% !important;\n  width: 90% !important;\n  margin: 1.75rem auto;\n}\n[data-v-0218d4de] .challenge-create-modal .modal-content,[data-v-0218d4de] .challenge-edit-modal .modal-content {\n  min-width: 800px;\n  max-width: 1200px;\n  margin: 0 auto;\n}\n[data-v-0218d4de] .challenge-create-modal .modal-body,[data-v-0218d4de] .challenge-edit-modal .modal-body {\n  max-height: 70vh;\n  overflow-y: auto;\n}\n[data-v-0218d4de] .modal-xl .modal-dialog {\n  max-width: 90% !important;\n  width: 90% !important;\n}\n[data-v-0218d4de] .modal-xl .modal-content {\n  min-width: 800px;\n  max-width: 1200px;\n}\n.form-progress .progress-steps[data-v-0218d4de] {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  margin-bottom: 2rem;\n}\n.form-progress .progress-steps .step[data-v-0218d4de] {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  position: relative;\n}\n.form-progress .progress-steps .step .step-number[data-v-0218d4de] {\n  width: 40px;\n  height: 40px;\n  border-radius: 50%;\n  background: #e9ecef;\n  color: #6c757d;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-weight: 600;\n  font-size: 16px;\n  transition: all 0.3s ease;\n  border: 3px solid #e9ecef;\n}\n.form-progress .progress-steps .step .step-label[data-v-0218d4de] {\n  margin-top: 0.5rem;\n  font-size: 12px;\n  font-weight: 600;\n  color: #6c757d;\n  text-align: center;\n  transition: all 0.3s ease;\n}\n.form-progress .progress-steps .step.active .step-number[data-v-0218d4de] {\n  background: #dc3545;\n  color: white;\n  border-color: #dc3545;\n  box-shadow: 0 0 0 3px rgba(220, 53, 69, 0.2);\n}\n.form-progress .progress-steps .step.active .step-label[data-v-0218d4de] {\n  color: #dc3545;\n}\n.form-progress .progress-steps .step.completed .step-number[data-v-0218d4de] {\n  background: #28a745;\n  color: white;\n  border-color: #28a745;\n}\n.form-progress .progress-steps .step.completed .step-label[data-v-0218d4de] {\n  color: #28a745;\n}\n.form-progress .progress-steps .step-line[data-v-0218d4de] {\n  width: 60px;\n  height: 2px;\n  background: #e9ecef;\n  margin: 0 1rem;\n  transition: all 0.3s ease;\n}\n.form-progress .progress-steps .step-line.completed[data-v-0218d4de] {\n  background: #28a745;\n}\n.form-step[data-v-0218d4de] {\n  animation: fadeIn-data-v-0218d4de 0.3s ease-in-out;\n}\n.form-step .step-header[data-v-0218d4de] {\n  margin-bottom: 2rem;\n  padding-bottom: 1rem;\n  border-bottom: 2px solid #f8f9fa;\n}\n.form-step .step-header h5[data-v-0218d4de] {\n  color: #252525;\n  font-weight: 700;\n  margin-bottom: 0.5rem;\n}\n.form-step .step-header h5 i[data-v-0218d4de] {\n  margin-right: 0.5rem;\n}\n.form-step .step-header p[data-v-0218d4de] {\n  margin-bottom: 0;\n  font-size: 14px;\n}\n.form-navigation[data-v-0218d4de] {\n  padding-top: 2rem;\n  border-top: 2px solid #f8f9fa;\n}\n.form-navigation .nav-btn[data-v-0218d4de] {\n  padding: 0.5rem 1rem;\n  font-weight: 600;\n  border-radius: 8px;\n  transition: all 0.3s ease;\n}\n.form-navigation .nav-btn[data-v-0218d4de]:hover {\n  transform: translateY(-2px);\n  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);\n}\n.form-navigation .nav-btn[data-v-0218d4de]:disabled {\n  opacity: 0.6;\n  cursor: not-allowed;\n}\n.form-navigation .step-indicator[data-v-0218d4de] {\n  background: linear-gradient(135deg, #dc3545 0%, rgb(227.5316455696, 96.4683544304, 109.0253164557) 100%);\n  color: white;\n  padding: 0.5rem 1rem;\n  border-radius: 20px;\n  font-weight: 600;\n  font-size: 14px;\n  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);\n}\n.enrollment-section[data-v-0218d4de] {\n  background: #f8f9fa;\n  padding: 1.5rem;\n  border-radius: 12px;\n  margin: 1.5rem 0;\n  border-left: 4px solid #dc3545;\n}\n.enrollment-section h6[data-v-0218d4de] {\n  color: #252525;\n  font-weight: 700;\n  margin-bottom: 1rem;\n}\n.enrollment-section h6 i[data-v-0218d4de] {\n  margin-right: 0.5rem;\n  color: #dc3545;\n}\n@keyframes fadeIn-data-v-0218d4de {\nfrom {\n    opacity: 0;\n    transform: translateY(10px);\n}\nto {\n    opacity: 1;\n    transform: translateY(0);\n}\n}", ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-12.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12.use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-12.use[3]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/Challenges/ChallengesPage.vue?vue&type=style&index=0&id=0218d4de&lang=scss&scoped=true":
/*!********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-12.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12.use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-12.use[3]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/Challenges/ChallengesPage.vue?vue&type=style&index=0&id=0218d4de&lang=scss&scoped=true ***!
  \********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../../../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_clonedRuleSet_12_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_12_use_2_node_modules_sass_loader_dist_cjs_js_clonedRuleSet_12_use_3_node_modules_vue_loader_lib_index_js_vue_loader_options_ChallengesPage_vue_vue_type_style_index_0_id_0218d4de_lang_scss_scoped_true__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !!../../../../../../node_modules/css-loader/dist/cjs.js??clonedRuleSet-12.use[1]!../../../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12.use[2]!../../../../../../node_modules/sass-loader/dist/cjs.js??clonedRuleSet-12.use[3]!../../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./ChallengesPage.vue?vue&type=style&index=0&id=0218d4de&lang=scss&scoped=true */ "./node_modules/css-loader/dist/cjs.js??clonedRuleSet-12.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12.use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-12.use[3]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/Challenges/ChallengesPage.vue?vue&type=style&index=0&id=0218d4de&lang=scss&scoped=true");

            

var options = {};

options.insert = "head";
options.singleton = false;

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_clonedRuleSet_12_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_12_use_2_node_modules_sass_loader_dist_cjs_js_clonedRuleSet_12_use_3_node_modules_vue_loader_lib_index_js_vue_loader_options_ChallengesPage_vue_vue_type_style_index_0_id_0218d4de_lang_scss_scoped_true__WEBPACK_IMPORTED_MODULE_1__["default"], options);



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_clonedRuleSet_12_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_12_use_2_node_modules_sass_loader_dist_cjs_js_clonedRuleSet_12_use_3_node_modules_vue_loader_lib_index_js_vue_loader_options_ChallengesPage_vue_vue_type_style_index_0_id_0218d4de_lang_scss_scoped_true__WEBPACK_IMPORTED_MODULE_1__["default"].locals || {});

/***/ }),

/***/ "./resources/src/views/app/pages/Challenges/ChallengesPage.vue":
/*!*********************************************************************!*\
  !*** ./resources/src/views/app/pages/Challenges/ChallengesPage.vue ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _ChallengesPage_vue_vue_type_template_id_0218d4de_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ChallengesPage.vue?vue&type=template&id=0218d4de&scoped=true */ "./resources/src/views/app/pages/Challenges/ChallengesPage.vue?vue&type=template&id=0218d4de&scoped=true");
/* harmony import */ var _ChallengesPage_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ChallengesPage.vue?vue&type=script&lang=js */ "./resources/src/views/app/pages/Challenges/ChallengesPage.vue?vue&type=script&lang=js");
/* harmony import */ var _ChallengesPage_vue_vue_type_style_index_0_id_0218d4de_lang_scss_scoped_true__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ChallengesPage.vue?vue&type=style&index=0&id=0218d4de&lang=scss&scoped=true */ "./resources/src/views/app/pages/Challenges/ChallengesPage.vue?vue&type=style&index=0&id=0218d4de&lang=scss&scoped=true");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");



;


/* normalize component */

var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _ChallengesPage_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__["default"],
  _ChallengesPage_vue_vue_type_template_id_0218d4de_scoped_true__WEBPACK_IMPORTED_MODULE_0__.render,
  _ChallengesPage_vue_vue_type_template_id_0218d4de_scoped_true__WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  "0218d4de",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/src/views/app/pages/Challenges/ChallengesPage.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./resources/src/views/app/pages/Challenges/ChallengesPage.vue?vue&type=script&lang=js":
/*!*********************************************************************************************!*\
  !*** ./resources/src/views/app/pages/Challenges/ChallengesPage.vue?vue&type=script&lang=js ***!
  \*********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ChallengesPage_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./ChallengesPage.vue?vue&type=script&lang=js */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/Challenges/ChallengesPage.vue?vue&type=script&lang=js");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ChallengesPage_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/src/views/app/pages/Challenges/ChallengesPage.vue?vue&type=style&index=0&id=0218d4de&lang=scss&scoped=true":
/*!******************************************************************************************************************************!*\
  !*** ./resources/src/views/app/pages/Challenges/ChallengesPage.vue?vue&type=style&index=0&id=0218d4de&lang=scss&scoped=true ***!
  \******************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_dist_cjs_js_node_modules_css_loader_dist_cjs_js_clonedRuleSet_12_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_12_use_2_node_modules_sass_loader_dist_cjs_js_clonedRuleSet_12_use_3_node_modules_vue_loader_lib_index_js_vue_loader_options_ChallengesPage_vue_vue_type_style_index_0_id_0218d4de_lang_scss_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/style-loader/dist/cjs.js!../../../../../../node_modules/css-loader/dist/cjs.js??clonedRuleSet-12.use[1]!../../../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12.use[2]!../../../../../../node_modules/sass-loader/dist/cjs.js??clonedRuleSet-12.use[3]!../../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./ChallengesPage.vue?vue&type=style&index=0&id=0218d4de&lang=scss&scoped=true */ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-12.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12.use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-12.use[3]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/Challenges/ChallengesPage.vue?vue&type=style&index=0&id=0218d4de&lang=scss&scoped=true");


/***/ }),

/***/ "./resources/src/views/app/pages/Challenges/ChallengesPage.vue?vue&type=template&id=0218d4de&scoped=true":
/*!***************************************************************************************************************!*\
  !*** ./resources/src/views/app/pages/Challenges/ChallengesPage.vue?vue&type=template&id=0218d4de&scoped=true ***!
  \***************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_ChallengesPage_vue_vue_type_template_id_0218d4de_scoped_true__WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   staticRenderFns: () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_ChallengesPage_vue_vue_type_template_id_0218d4de_scoped_true__WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_ChallengesPage_vue_vue_type_template_id_0218d4de_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./ChallengesPage.vue?vue&type=template&id=0218d4de&scoped=true */ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/Challenges/ChallengesPage.vue?vue&type=template&id=0218d4de&scoped=true");


/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/Challenges/ChallengesPage.vue?vue&type=template&id=0218d4de&scoped=true":
/*!******************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/Challenges/ChallengesPage.vue?vue&type=template&id=0218d4de&scoped=true ***!
  \******************************************************************************************************************************************************************************************************************************************************/
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
    _c(
      "div",
      { staticClass: "challenges-page container py-4" },
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
                    staticClass:
                      "breadcrumb-container d-flex align-items-center",
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
                            { attrs: { to: "/app/dashboard" } },
                            [
                              _c("i", { staticClass: "fas fa-home" }),
                              _vm._v(
                                "\n                                    Dashboard\n                                "
                              ),
                            ]
                          ),
                        ],
                        1
                      ),
                      _vm._v(" "),
                      _vm._m(0),
                    ]),
                    _vm._v(" "),
                    _c("div", { staticClass: "tab-navigation" }, [
                      _c("div", { staticClass: "tab-container" }, [
                        _c(
                          "button",
                          {
                            staticClass: "tab-button",
                            class: { active: _vm.activeTab === 0 },
                            on: {
                              click: function ($event) {
                                _vm.activeTab = 0
                              },
                            },
                          },
                          [
                            _c("i", { staticClass: "fas fa-trophy" }),
                            _vm._v(
                              "\n                    All Challenges\n                "
                            ),
                          ]
                        ),
                        _vm._v(" "),
                        _c(
                          "button",
                          {
                            staticClass: "tab-button",
                            class: { active: _vm.activeTab === 1 },
                            on: {
                              click: function ($event) {
                                _vm.activeTab = 1
                              },
                            },
                          },
                          [
                            _c("i", { staticClass: "fas fa-users" }),
                            _vm._v(
                              "\n                    Participants\n                "
                            ),
                          ]
                        ),
                        _vm._v(" "),
                        _c(
                          "button",
                          {
                            staticClass: "tab-button",
                            class: { active: _vm.activeTab === 2 },
                            on: {
                              click: function ($event) {
                                _vm.activeTab = 2
                              },
                            },
                          },
                          [
                            _c("i", { staticClass: "fas fa-medal" }),
                            _vm._v(
                              "\n                    Leaderboard\n                "
                            ),
                          ]
                        ),
                        _vm._v(" "),
                        _c(
                          "button",
                          {
                            staticClass: "tab-button",
                            class: { active: _vm.activeTab === 4 },
                            on: {
                              click: function ($event) {
                                _vm.activeTab = 4
                              },
                            },
                          },
                          [
                            _c("i", { staticClass: "fas fa-gift" }),
                            _vm._v(
                              "\n                    Rewards\n                "
                            ),
                          ]
                        ),
                      ]),
                    ]),
                  ]
                ),
              ]
            ),
          ]),
        ]),
        _vm._v(" "),
        _vm._m(1),
        _vm._v(" "),
        _c("div", { staticClass: "tab-content-container" }, [
          _c(
            "div",
            {
              directives: [
                {
                  name: "show",
                  rawName: "v-show",
                  value: _vm.activeTab === 0,
                  expression: "activeTab === 0",
                },
              ],
              staticClass: "tab-content",
            },
            [
              _c(
                "div",
                { staticClass: "mt-3" },
                [
                  _c(
                    "div",
                    {
                      staticClass:
                        "d-flex justify-content-between align-items-center mb-3",
                    },
                    [
                      _c("h4", [_vm._v("Current Challenges")]),
                      _vm._v(" "),
                      _c(
                        "div",
                        { staticClass: "action-section" },
                        [
                          _c(
                            "b-button",
                            {
                              staticClass: "action-btn",
                              attrs: { variant: "primary" },
                              on: {
                                click: function ($event) {
                                  _vm.showCreateModal = true
                                },
                              },
                            },
                            [
                              _c("i", { staticClass: "fas fa-plus" }),
                              _vm._v(" Create New Challenge\n                "),
                            ]
                          ),
                        ],
                        1
                      ),
                    ]
                  ),
                  _vm._v(" "),
                  _vm.loading
                    ? _c(
                        "div",
                        { staticClass: "text-center py-4" },
                        [
                          _c("b-spinner", {
                            attrs: { variant: "primary", label: "Loading..." },
                          }),
                          _vm._v(" "),
                          _c("p", { staticClass: "mt-2" }, [
                            _vm._v("Loading challenges..."),
                          ]),
                        ],
                        1
                      )
                    : _vm.challenges.length === 0
                    ? _c(
                        "div",
                        { staticClass: "text-center py-5" },
                        [
                          _c("i", {
                            staticClass: "fas fa-trophy fa-3x text-muted mb-3",
                          }),
                          _vm._v(" "),
                          _c("h5", { staticClass: "text-muted" }, [
                            _vm._v("No Challenges Found"),
                          ]),
                          _vm._v(" "),
                          _c("p", { staticClass: "text-muted" }, [
                            _vm._v(
                              "Create your first challenge to get started!"
                            ),
                          ]),
                          _vm._v(" "),
                          _c(
                            "b-button",
                            {
                              attrs: { variant: "primary" },
                              on: {
                                click: function ($event) {
                                  _vm.showCreateModal = true
                                },
                              },
                            },
                            [
                              _c("i", { staticClass: "fas fa-plus" }),
                              _vm._v(
                                " Create First Challenge\n                        "
                              ),
                            ]
                          ),
                        ],
                        1
                      )
                    : _c("b-table", {
                        attrs: {
                          striped: "",
                          hover: "",
                          items: _vm.challengesWithRemainingDays,
                          fields: _vm.challengeFields,
                          responsive: "",
                        },
                        scopedSlots: _vm._u([
                          {
                            key: "cell(name)",
                            fn: function (data) {
                              return [
                                _c(
                                  "span",
                                  {
                                    staticClass: "challenge-name-link",
                                    attrs: {
                                      title:
                                        "Click to view participants for " +
                                        data.item.name,
                                    },
                                    on: {
                                      click: function ($event) {
                                        return _vm.viewChallenge(data.item)
                                      },
                                    },
                                  },
                                  [
                                    _vm._v(
                                      "\n                                " +
                                        _vm._s(data.item.name) +
                                        "\n                            "
                                    ),
                                  ]
                                ),
                              ]
                            },
                          },
                          {
                            key: "cell(reward)",
                            fn: function (data) {
                              return [
                                _c(
                                  "span",
                                  { staticClass: "custom-badge badge-reward" },
                                  [
                                    _vm._v(
                                      "\n                                " +
                                        _vm._s(data.item.reward) +
                                        "\n                            "
                                    ),
                                  ]
                                ),
                              ]
                            },
                          },
                          {
                            key: "cell(participants)",
                            fn: function (data) {
                              return [
                                _c(
                                  "span",
                                  {
                                    staticClass:
                                      "custom-badge badge-participants",
                                  },
                                  [
                                    _c("i", {
                                      staticClass: "fas fa-users mr-1",
                                    }),
                                    _vm._v(
                                      "\n                                " +
                                        _vm._s(data.item.participants) +
                                        "\n                            "
                                    ),
                                  ]
                                ),
                              ]
                            },
                          },
                          {
                            key: "cell(status)",
                            fn: function (data) {
                              return [
                                _c(
                                  "span",
                                  {
                                    staticClass: "custom-badge",
                                    class:
                                      data.item.status === "Active"
                                        ? "badge-active"
                                        : "badge-completed",
                                  },
                                  [
                                    _vm._v(
                                      "\n                                " +
                                        _vm._s(data.item.status) +
                                        "\n                            "
                                    ),
                                  ]
                                ),
                              ]
                            },
                          },
                          {
                            key: "cell(actions)",
                            fn: function (data) {
                              return [
                                _c("div", { staticClass: "action-buttons" }, [
                                  _c(
                                    "button",
                                    {
                                      staticClass: "action-btn edit-btn",
                                      attrs: { title: "Edit Challenge" },
                                      on: {
                                        click: function ($event) {
                                          return _vm.editChallenge(data.item)
                                        },
                                      },
                                    },
                                    [_c("i", { staticClass: "fas fa-edit" })]
                                  ),
                                  _vm._v(" "),
                                  _c(
                                    "button",
                                    {
                                      staticClass: "action-btn delete-btn",
                                      attrs: { title: "Delete Challenge" },
                                      on: {
                                        click: function ($event) {
                                          return _vm.deleteChallenge(data.item)
                                        },
                                      },
                                    },
                                    [_c("i", { staticClass: "fas fa-trash" })]
                                  ),
                                ]),
                              ]
                            },
                          },
                        ]),
                      }),
                ],
                1
              ),
            ]
          ),
          _vm._v(" "),
          _c(
            "div",
            {
              directives: [
                {
                  name: "show",
                  rawName: "v-show",
                  value: _vm.activeTab === 1,
                  expression: "activeTab === 1",
                },
              ],
              staticClass: "tab-content",
            },
            [
              _c(
                "div",
                { staticClass: "mt-3" },
                [
                  _c(
                    "div",
                    {
                      staticClass:
                        "d-flex justify-content-between align-items-center mb-3",
                    },
                    [
                      _c("h4", [_vm._v("Challenge Participants")]),
                      _vm._v(" "),
                      _c(
                        "div",
                        [
                          _c("b-form-select", {
                            staticClass: "d-inline-block w-auto mr-2",
                            attrs: { options: _vm.challengeOptions },
                            model: {
                              value: _vm.selectedChallengeFilter,
                              callback: function ($$v) {
                                _vm.selectedChallengeFilter = $$v
                              },
                              expression: "selectedChallengeFilter",
                            },
                          }),
                          _vm._v(" "),
                          _c(
                            "span",
                            { staticClass: "custom-badge badge-info" },
                            [
                              _vm._v(
                                _vm._s(_vm.filteredParticipants.length) +
                                  "\n                                Participants"
                              ),
                            ]
                          ),
                          _vm._v(" "),
                          _c(
                            "b-button",
                            {
                              staticClass: "ml-2",
                              attrs: { variant: "primary", size: "sm" },
                              on: { click: _vm.openAddMemberModal },
                            },
                            [
                              _c("i", { staticClass: "fas fa-plus" }),
                              _vm._v(
                                " Add Member\n                            "
                              ),
                            ]
                          ),
                        ],
                        1
                      ),
                    ]
                  ),
                  _vm._v(" "),
                  _c("b-table", {
                    attrs: {
                      striped: "",
                      hover: "",
                      items: _vm.filteredParticipants,
                      fields: _vm.participantFields,
                      responsive: "",
                    },
                    scopedSlots: _vm._u([
                      {
                        key: "cell(progress)",
                        fn: function (data) {
                          return [
                            _c("b-progress", {
                              attrs: {
                                value: data.item.progress,
                                max: 100,
                                "show-value": "",
                              },
                            }),
                          ]
                        },
                      },
                      {
                        key: "cell(status)",
                        fn: function (data) {
                          return [
                            _c(
                              "span",
                              {
                                staticClass: "custom-badge",
                                class: _vm.getStatusClass(data.item.status),
                              },
                              [
                                _vm._v(
                                  "\n                                " +
                                    _vm._s(data.item.status) +
                                    "\n                            "
                                ),
                              ]
                            ),
                          ]
                        },
                      },
                    ]),
                  }),
                ],
                1
              ),
            ]
          ),
          _vm._v(" "),
          _c(
            "div",
            {
              directives: [
                {
                  name: "show",
                  rawName: "v-show",
                  value: _vm.activeTab === 2,
                  expression: "activeTab === 2",
                },
              ],
              staticClass: "tab-content",
            },
            [
              _c(
                "div",
                { staticClass: "mt-3" },
                [
                  _c(
                    "div",
                    {
                      staticClass:
                        "d-flex justify-content-between align-items-center mb-3",
                    },
                    [
                      _c("h4", [_vm._v("Challenge Leaderboard")]),
                      _vm._v(" "),
                      _c(
                        "div",
                        [
                          _c("b-form-select", {
                            staticClass: "d-inline-block w-auto mr-2",
                            attrs: { options: _vm.challengeOptions },
                            model: {
                              value: _vm.selectedLeaderboardChallenge,
                              callback: function ($$v) {
                                _vm.selectedLeaderboardChallenge = $$v
                              },
                              expression: "selectedLeaderboardChallenge",
                            },
                          }),
                          _vm._v(" "),
                          _c(
                            "span",
                            { staticClass: "custom-badge badge-warning" },
                            [_vm._v("Top Performers")]
                          ),
                        ],
                        1
                      ),
                    ]
                  ),
                  _vm._v(" "),
                  _c("b-table", {
                    attrs: {
                      striped: "",
                      hover: "",
                      items: _vm.filteredLeaderboard,
                      fields: _vm.leaderboardFields,
                      responsive: "",
                    },
                    scopedSlots: _vm._u([
                      {
                        key: "cell(rank)",
                        fn: function (data) {
                          return [
                            _c(
                              "div",
                              { staticClass: "d-flex align-items-center" },
                              [
                                data.item.rank === 1
                                  ? _c("span", { staticClass: "mr-2" }, [
                                      _vm._v("🥇"),
                                    ])
                                  : data.item.rank === 2
                                  ? _c("span", { staticClass: "mr-2" }, [
                                      _vm._v("🥈"),
                                    ])
                                  : data.item.rank === 3
                                  ? _c("span", { staticClass: "mr-2" }, [
                                      _vm._v("🥉"),
                                    ])
                                  : _c("span", { staticClass: "mr-2" }, [
                                      _vm._v("#" + _vm._s(data.item.rank)),
                                    ]),
                              ]
                            ),
                          ]
                        },
                      },
                      {
                        key: "cell(points)",
                        fn: function (data) {
                          return [
                            _c(
                              "span",
                              { staticClass: "custom-badge badge-points" },
                              [_vm._v(_vm._s(data.item.points) + " pts")]
                            ),
                          ]
                        },
                      },
                      {
                        key: "cell(achievements)",
                        fn: function (data) {
                          return [
                            _c(
                              "div",
                              _vm._l(
                                data.item.achievements,
                                function (achievement) {
                                  return _c(
                                    "span",
                                    {
                                      key: achievement,
                                      staticClass:
                                        "custom-badge badge-achievement mr-1",
                                    },
                                    [
                                      _vm._v(
                                        "\n                                    " +
                                          _vm._s(achievement) +
                                          "\n                                "
                                      ),
                                    ]
                                  )
                                }
                              ),
                              0
                            ),
                          ]
                        },
                      },
                      {
                        key: "cell(actions)",
                        fn: function (data) {
                          return [
                            _c("div", { staticClass: "action-buttons" }, [
                              _c(
                                "button",
                                {
                                  staticClass: "action-btn profile-btn",
                                  attrs: { title: "View Profile" },
                                  on: {
                                    click: function ($event) {
                                      return _vm.viewLeaderboardProfile(
                                        data.item
                                      )
                                    },
                                  },
                                },
                                [_c("i", { staticClass: "fas fa-user" })]
                              ),
                            ]),
                          ]
                        },
                      },
                    ]),
                  }),
                ],
                1
              ),
            ]
          ),
          _vm._v(" "),
          _c(
            "div",
            {
              directives: [
                {
                  name: "show",
                  rawName: "v-show",
                  value: _vm.activeTab === 3,
                  expression: "activeTab === 3",
                },
              ],
              staticClass: "tab-content",
            },
            [
              _c(
                "div",
                { staticClass: "mt-3" },
                [
                  _c("h4", [_vm._v("Challenge Reports & Analytics")]),
                  _vm._v(" "),
                  _c("div", { staticClass: "row mb-4" }, [
                    _c(
                      "div",
                      { staticClass: "col-md-3" },
                      [
                        _c(
                          "b-card",
                          {
                            staticClass: "text-center",
                            attrs: {
                              "bg-variant": "primary",
                              "text-variant": "white",
                            },
                          },
                          [
                            _c("h3", [_vm._v(_vm._s(_vm.challenges.length))]),
                            _vm._v(" "),
                            _c("p", [_vm._v("Active Challenges")]),
                          ]
                        ),
                      ],
                      1
                    ),
                    _vm._v(" "),
                    _c(
                      "div",
                      { staticClass: "col-md-3" },
                      [
                        _c(
                          "b-card",
                          {
                            staticClass: "text-center",
                            attrs: {
                              "bg-variant": "success",
                              "text-variant": "white",
                            },
                          },
                          [
                            _c("h3", [_vm._v(_vm._s(_vm.totalParticipants))]),
                            _vm._v(" "),
                            _c("p", [_vm._v("Total Participants")]),
                          ]
                        ),
                      ],
                      1
                    ),
                    _vm._v(" "),
                    _c(
                      "div",
                      { staticClass: "col-md-3" },
                      [
                        _c(
                          "b-card",
                          {
                            staticClass: "text-center",
                            attrs: {
                              "bg-variant": "warning",
                              "text-variant": "white",
                            },
                          },
                          [
                            _c("h3", [_vm._v(_vm._s(_vm.completedChallenges))]),
                            _vm._v(" "),
                            _c("p", [_vm._v("Completed")]),
                          ]
                        ),
                      ],
                      1
                    ),
                    _vm._v(" "),
                    _c(
                      "div",
                      { staticClass: "col-md-3" },
                      [
                        _c(
                          "b-card",
                          {
                            staticClass: "text-center",
                            attrs: {
                              "bg-variant": "info",
                              "text-variant": "white",
                            },
                          },
                          [
                            _c("h3", [
                              _vm._v(_vm._s(_vm.averageCompletionRate) + "%"),
                            ]),
                            _vm._v(" "),
                            _c("p", [_vm._v("Success Rate")]),
                          ]
                        ),
                      ],
                      1
                    ),
                  ]),
                  _vm._v(" "),
                  _c(
                    "b-card",
                    {
                      staticClass: "mb-4",
                      attrs: { title: "Challenge Performance" },
                    },
                    [
                      _c("div", { staticClass: "row" }, [
                        _c("div", { staticClass: "col-md-6" }, [
                          _c("h6", [_vm._v("Most Popular Challenges")]),
                          _vm._v(" "),
                          _vm.topChallenges.length > 0
                            ? _c(
                                "ul",
                                { staticClass: "list-group" },
                                _vm._l(_vm.topChallenges, function (challenge) {
                                  return _c(
                                    "li",
                                    {
                                      key: challenge.id,
                                      staticClass:
                                        "list-group-item d-flex justify-content-between align-items-center",
                                    },
                                    [
                                      _vm._v(
                                        "\n                                        " +
                                          _vm._s(challenge.name) +
                                          "\n                                        "
                                      ),
                                      _c(
                                        "span",
                                        {
                                          staticClass:
                                            "custom-badge badge-primary",
                                        },
                                        [
                                          _vm._v(
                                            _vm._s(challenge.participants) +
                                              "\n                                            participants"
                                          ),
                                        ]
                                      ),
                                    ]
                                  )
                                }),
                                0
                              )
                            : _c("p", { staticClass: "text-muted" }, [
                                _vm._v("No challenges with participants yet."),
                              ]),
                        ]),
                        _vm._v(" "),
                        _c("div", { staticClass: "col-md-6" }, [
                          _c("h6", [_vm._v("Recent Activity")]),
                          _vm._v(" "),
                          _vm.generatedRecentActivities.length > 0
                            ? _c(
                                "div",
                                _vm._l(
                                  _vm.generatedRecentActivities,
                                  function (activity) {
                                    return _c(
                                      "div",
                                      {
                                        key: activity.id,
                                        staticClass: "border-bottom pb-2 mb-2",
                                      },
                                      [
                                        _c(
                                          "small",
                                          { staticClass: "text-muted" },
                                          [_vm._v(_vm._s(activity.time))]
                                        ),
                                        _vm._v(" "),
                                        _c("div", [
                                          _vm._v(_vm._s(activity.message)),
                                        ]),
                                      ]
                                    )
                                  }
                                ),
                                0
                              )
                            : _c("p", { staticClass: "text-muted" }, [
                                _vm._v("No recent activity."),
                              ]),
                        ]),
                      ]),
                    ]
                  ),
                ],
                1
              ),
            ]
          ),
          _vm._v(" "),
          _c(
            "div",
            {
              directives: [
                {
                  name: "show",
                  rawName: "v-show",
                  value: _vm.activeTab === 4,
                  expression: "activeTab === 4",
                },
              ],
              staticClass: "tab-content",
            },
            [
              _c(
                "div",
                { staticClass: "mt-3" },
                [
                  _c(
                    "div",
                    {
                      staticClass:
                        "d-flex justify-content-between align-items-center mb-3",
                    },
                    [
                      _c("h4", [_vm._v("Rewards & Prizes Setup")]),
                      _vm._v(" "),
                      _c(
                        "div",
                        [
                          _c(
                            "b-button",
                            {
                              staticClass: "mr-2",
                              attrs: {
                                variant: "outline-primary",
                                disabled: _vm.loading,
                              },
                              on: { click: _vm.fetchRewards },
                            },
                            [
                              _c("i", {
                                staticClass: "fas fa-sync-alt",
                                class: { "fa-spin": _vm.loading },
                              }),
                              _vm._v(" Refresh\n                            "),
                            ]
                          ),
                          _vm._v(" "),
                          _c(
                            "b-button",
                            {
                              attrs: { variant: "success" },
                              on: {
                                click: function ($event) {
                                  _vm.showRewardModal = true
                                },
                              },
                            },
                            [
                              _c("i", { staticClass: "fas fa-plus" }),
                              _vm._v(
                                " Add New Reward\n                            "
                              ),
                            ]
                          ),
                        ],
                        1
                      ),
                    ]
                  ),
                  _vm._v(" "),
                  _vm.loading
                    ? _c(
                        "div",
                        { staticClass: "text-center py-4" },
                        [
                          _c("b-spinner", {
                            attrs: { variant: "primary", label: "Loading..." },
                          }),
                          _vm._v(" "),
                          _c("p", { staticClass: "mt-2" }, [
                            _vm._v("Loading rewards..."),
                          ]),
                        ],
                        1
                      )
                    : _vm.rewards.length === 0
                    ? _c(
                        "div",
                        { staticClass: "text-center py-5" },
                        [
                          _c("i", {
                            staticClass: "fas fa-gift fa-3x text-muted mb-3",
                          }),
                          _vm._v(" "),
                          _c("h5", { staticClass: "text-muted" }, [
                            _vm._v("No Rewards Found"),
                          ]),
                          _vm._v(" "),
                          _c("p", { staticClass: "text-muted" }, [
                            _vm._v("Create your first reward to get started!"),
                          ]),
                          _vm._v(" "),
                          _c(
                            "b-button",
                            {
                              attrs: { variant: "primary" },
                              on: {
                                click: function ($event) {
                                  _vm.showRewardModal = true
                                },
                              },
                            },
                            [
                              _c("i", { staticClass: "fas fa-plus" }),
                              _vm._v(
                                " Create First Reward\n                        "
                              ),
                            ]
                          ),
                        ],
                        1
                      )
                    : _c("b-table", {
                        staticClass: "mt-3",
                        attrs: {
                          striped: "",
                          hover: "",
                          items: _vm.rewards,
                          fields: _vm.rewardFields,
                          responsive: "",
                        },
                        scopedSlots: _vm._u([
                          {
                            key: "cell(status)",
                            fn: function (data) {
                              return [
                                _c(
                                  "span",
                                  {
                                    staticClass: "custom-badge",
                                    class:
                                      data.item.status === "Active"
                                        ? "badge-active"
                                        : "badge-secondary",
                                  },
                                  [
                                    _vm._v(
                                      "\n                                " +
                                        _vm._s(data.item.status) +
                                        "\n                            "
                                    ),
                                  ]
                                ),
                              ]
                            },
                          },
                          {
                            key: "cell(points)",
                            fn: function (data) {
                              return [
                                _c(
                                  "span",
                                  { staticClass: "custom-badge badge-points" },
                                  [_vm._v(_vm._s(data.item.points) + " pts")]
                                ),
                              ]
                            },
                          },
                          {
                            key: "cell(actions)",
                            fn: function (data) {
                              return [
                                _c("div", { staticClass: "action-buttons" }, [
                                  _c(
                                    "button",
                                    {
                                      staticClass: "action-btn edit-btn",
                                      attrs: { title: "Edit Reward" },
                                      on: {
                                        click: function ($event) {
                                          return _vm.editReward(data.item)
                                        },
                                      },
                                    },
                                    [_c("i", { staticClass: "fas fa-edit" })]
                                  ),
                                  _vm._v(" "),
                                  _c(
                                    "button",
                                    {
                                      staticClass: "action-btn delete-btn",
                                      attrs: { title: "Delete Reward" },
                                      on: {
                                        click: function ($event) {
                                          return _vm.deleteReward(data.item)
                                        },
                                      },
                                    },
                                    [_c("i", { staticClass: "fas fa-trash" })]
                                  ),
                                ]),
                              ]
                            },
                          },
                        ]),
                      }),
                ],
                1
              ),
            ]
          ),
        ]),
        _vm._v(" "),
        _c(
          "b-modal",
          {
            staticClass: "modal-text challenge-create-modal",
            attrs: {
              title: "🏆 Create New Challenge",
              "ok-disabled": !_vm.isFormValid,
              size: "xl",
              centered: true,
              scrollable: true,
              "ok-title": "Create Challenge",
              "cancel-title": "Cancel",
            },
            on: { ok: _vm.createChallenge, cancel: _vm.resetForm },
            model: {
              value: _vm.showCreateModal,
              callback: function ($$v) {
                _vm.showCreateModal = $$v
              },
              expression: "showCreateModal",
            },
          },
          [
            _c("div", { staticClass: "form-progress mb-4" }, [
              _c("div", { staticClass: "progress-steps" }, [
                _c(
                  "div",
                  {
                    staticClass: "step",
                    class: {
                      active: _vm.currentStep >= 1,
                      completed: _vm.currentStep > 1,
                    },
                  },
                  [
                    _c("div", { staticClass: "step-number" }, [_vm._v("1")]),
                    _vm._v(" "),
                    _c("div", { staticClass: "step-label" }, [
                      _vm._v("Basic Info"),
                    ]),
                  ]
                ),
                _vm._v(" "),
                _c("div", { staticClass: "step-line" }),
                _vm._v(" "),
                _c(
                  "div",
                  {
                    staticClass: "step",
                    class: {
                      active: _vm.currentStep >= 2,
                      completed: _vm.currentStep > 2,
                    },
                  },
                  [
                    _c("div", { staticClass: "step-number" }, [_vm._v("2")]),
                    _vm._v(" "),
                    _c("div", { staticClass: "step-label" }, [
                      _vm._v("Details"),
                    ]),
                  ]
                ),
                _vm._v(" "),
                _c("div", { staticClass: "step-line" }),
                _vm._v(" "),
                _c(
                  "div",
                  {
                    staticClass: "step",
                    class: {
                      active: _vm.currentStep >= 3,
                      completed: _vm.currentStep > 3,
                    },
                  },
                  [
                    _c("div", { staticClass: "step-number" }, [_vm._v("3")]),
                    _vm._v(" "),
                    _c("div", { staticClass: "step-label" }, [
                      _vm._v("Settings"),
                    ]),
                  ]
                ),
              ]),
            ]),
            _vm._v(" "),
            _c(
              "b-form",
              {
                on: {
                  submit: function ($event) {
                    $event.stopPropagation()
                    $event.preventDefault()
                    return _vm.createChallenge.apply(null, arguments)
                  },
                },
              },
              [
                _c(
                  "div",
                  {
                    directives: [
                      {
                        name: "show",
                        rawName: "v-show",
                        value: _vm.currentStep === 1,
                        expression: "currentStep === 1",
                      },
                    ],
                    staticClass: "form-step",
                  },
                  [
                    _c("div", { staticClass: "step-header" }, [
                      _c("h5", [
                        _c("i", {
                          staticClass: "fas fa-info-circle text-primary",
                        }),
                        _vm._v(" Basic Information"),
                      ]),
                      _vm._v(" "),
                      _c("p", { staticClass: "text-muted" }, [
                        _vm._v(
                          "Let's start with the essential details of your challenge"
                        ),
                      ]),
                    ]),
                    _vm._v(" "),
                    _c("div", { staticClass: "row" }, [
                      _c(
                        "div",
                        { staticClass: "col-md-8" },
                        [
                          _c(
                            "b-form-group",
                            {
                              attrs: {
                                label: "Challenge Name *",
                                state: _vm.validation.name,
                                "invalid-feedback":
                                  "Challenge name is required",
                              },
                            },
                            [
                              _c("b-form-input", {
                                staticClass: "modal-text",
                                attrs: {
                                  placeholder:
                                    "e.g., 30-Day Weight Loss Challenge",
                                  state: _vm.validation.name,
                                  required: "",
                                },
                                on: {
                                  input: function ($event) {
                                    return _vm.validateField("name")
                                  },
                                },
                                model: {
                                  value: _vm.newChallenge.name,
                                  callback: function ($$v) {
                                    _vm.$set(_vm.newChallenge, "name", $$v)
                                  },
                                  expression: "newChallenge.name",
                                },
                              }),
                            ],
                            1
                          ),
                        ],
                        1
                      ),
                    ]),
                    _vm._v(" "),
                    _c(
                      "b-form-group",
                      {
                        attrs: {
                          label: "Challenge Goal *",
                          state: _vm.validation.goal,
                          "invalid-feedback": "Challenge goal is required",
                        },
                      },
                      [
                        _c("b-form-textarea", {
                          staticClass: "modal-text",
                          attrs: {
                            placeholder:
                              "What do you want participants to achieve? (e.g., Lose 10 pounds, Run a marathon, Build muscle mass)",
                            state: _vm.validation.goal,
                            rows: "3",
                            required: "",
                          },
                          on: {
                            input: function ($event) {
                              return _vm.validateField("goal")
                            },
                          },
                          model: {
                            value: _vm.newChallenge.goal,
                            callback: function ($$v) {
                              _vm.$set(_vm.newChallenge, "goal", $$v)
                            },
                            expression: "newChallenge.goal",
                          },
                        }),
                      ],
                      1
                    ),
                    _vm._v(" "),
                    _c(
                      "b-form-group",
                      {
                        attrs: {
                          label: "Reward *",
                          state: _vm.validation.reward,
                          "invalid-feedback": "Please select a reward",
                        },
                      },
                      [
                        _c("b-form-select", {
                          staticClass: "modal-text",
                          attrs: {
                            options: _vm.rewardOptions,
                            placeholder: "Select a reward",
                            state: _vm.validation.reward,
                            required: "",
                          },
                          on: {
                            change: function ($event) {
                              return _vm.validateField("reward")
                            },
                          },
                          scopedSlots: _vm._u([
                            {
                              key: "first",
                              fn: function () {
                                return [
                                  _c(
                                    "b-form-select-option",
                                    { attrs: { value: "", disabled: "" } },
                                    [
                                      _vm._v(
                                        "🎁 Select a reward for participants"
                                      ),
                                    ]
                                  ),
                                ]
                              },
                              proxy: true,
                            },
                          ]),
                          model: {
                            value: _vm.newChallenge.reward,
                            callback: function ($$v) {
                              _vm.$set(_vm.newChallenge, "reward", $$v)
                            },
                            expression: "newChallenge.reward",
                          },
                        }),
                      ],
                      1
                    ),
                  ],
                  1
                ),
                _vm._v(" "),
                _c(
                  "div",
                  {
                    directives: [
                      {
                        name: "show",
                        rawName: "v-show",
                        value: _vm.currentStep === 2,
                        expression: "currentStep === 2",
                      },
                    ],
                    staticClass: "form-step",
                  },
                  [
                    _c("div", { staticClass: "step-header" }, [
                      _c("h5", [
                        _c("i", {
                          staticClass: "fas fa-file-alt text-success",
                        }),
                        _vm._v(" Detailed Information"),
                      ]),
                      _vm._v(" "),
                      _c("p", { staticClass: "text-muted" }, [
                        _vm._v("Provide more details about your challenge"),
                      ]),
                    ]),
                    _vm._v(" "),
                    _c(
                      "b-form-group",
                      {
                        attrs: {
                          label: "Challenge Description *",
                          state: _vm.validation.description,
                          "invalid-feedback": "Description is required",
                        },
                      },
                      [
                        _c("b-form-textarea", {
                          staticClass: "modal-text",
                          attrs: {
                            placeholder:
                              "Describe what this challenge is about, what participants will do, and what they can expect...",
                            state: _vm.validation.description,
                            rows: "4",
                            required: "",
                          },
                          on: {
                            input: function ($event) {
                              return _vm.validateField("description")
                            },
                          },
                          model: {
                            value: _vm.newChallenge.description,
                            callback: function ($$v) {
                              _vm.$set(_vm.newChallenge, "description", $$v)
                            },
                            expression: "newChallenge.description",
                          },
                        }),
                      ],
                      1
                    ),
                    _vm._v(" "),
                    _c("div", { staticClass: "row" }, [
                      _c(
                        "div",
                        { staticClass: "col-md-6" },
                        [
                          _c(
                            "b-form-group",
                            {
                              attrs: {
                                label: "Start Date *",
                                state: _vm.validation.startDate,
                                "invalid-feedback": "Start date is required",
                              },
                            },
                            [
                              _c("b-form-input", {
                                staticClass: "modal-text",
                                attrs: {
                                  type: "date",
                                  state: _vm.validation.startDate,
                                  required: "",
                                },
                                on: {
                                  input: function ($event) {
                                    return _vm.validateField("startDate")
                                  },
                                },
                                model: {
                                  value: _vm.newChallenge.startDate,
                                  callback: function ($$v) {
                                    _vm.$set(_vm.newChallenge, "startDate", $$v)
                                  },
                                  expression: "newChallenge.startDate",
                                },
                              }),
                            ],
                            1
                          ),
                        ],
                        1
                      ),
                      _vm._v(" "),
                      _c(
                        "div",
                        { staticClass: "col-md-6" },
                        [
                          _c(
                            "b-form-group",
                            {
                              attrs: {
                                label: "End Date *",
                                state: _vm.validation.endDate,
                                "invalid-feedback":
                                  "End date is required and must be after start date",
                              },
                            },
                            [
                              _c("b-form-input", {
                                staticClass: "modal-text",
                                attrs: {
                                  type: "date",
                                  state: _vm.validation.endDate,
                                  required: "",
                                },
                                on: {
                                  input: function ($event) {
                                    return _vm.validateField("endDate")
                                  },
                                },
                                model: {
                                  value: _vm.newChallenge.endDate,
                                  callback: function ($$v) {
                                    _vm.$set(_vm.newChallenge, "endDate", $$v)
                                  },
                                  expression: "newChallenge.endDate",
                                },
                              }),
                            ],
                            1
                          ),
                        ],
                        1
                      ),
                    ]),
                    _vm._v(" "),
                    _c(
                      "b-form-group",
                      {
                        attrs: {
                          label: "Participation Fee *",
                          state: _vm.validation.participationFee,
                          "invalid-feedback":
                            "Participation fee is required and must be a valid amount",
                        },
                      },
                      [
                        _c(
                          "b-input-group",
                          [
                            _c(
                              "b-input-group-prepend",
                              [_c("b-input-group-text", [_vm._v("$")])],
                              1
                            ),
                            _vm._v(" "),
                            _c("b-form-input", {
                              staticClass: "modal-text",
                              attrs: {
                                type: "number",
                                placeholder: "0.00",
                                min: "0",
                                step: "0.01",
                                state: _vm.validation.participationFee,
                                required: "",
                              },
                              on: {
                                input: function ($event) {
                                  return _vm.validateField("participationFee")
                                },
                              },
                              model: {
                                value: _vm.newChallenge.participationFee,
                                callback: function ($$v) {
                                  _vm.$set(
                                    _vm.newChallenge,
                                    "participationFee",
                                    $$v
                                  )
                                },
                                expression: "newChallenge.participationFee",
                              },
                            }),
                          ],
                          1
                        ),
                        _vm._v(" "),
                        _c("small", { staticClass: "form-text text-muted" }, [
                          _vm._v("Set to $0.00 for free challenges"),
                        ]),
                      ],
                      1
                    ),
                  ],
                  1
                ),
                _vm._v(" "),
                _c(
                  "div",
                  {
                    directives: [
                      {
                        name: "show",
                        rawName: "v-show",
                        value: _vm.currentStep === 3,
                        expression: "currentStep === 3",
                      },
                    ],
                    staticClass: "form-step",
                  },
                  [
                    _c("div", { staticClass: "step-header" }, [
                      _c("h5", [
                        _c("i", { staticClass: "fas fa-cog text-warning" }),
                        _vm._v(" Rules and Settings"),
                      ]),
                      _vm._v(" "),
                      _c("p", { staticClass: "text-muted" }, [
                        _vm._v(
                          "Define the rules and configure participation settings"
                        ),
                      ]),
                    ]),
                    _vm._v(" "),
                    _c(
                      "b-form-group",
                      {
                        attrs: {
                          label: "Challenge Rules *",
                          state: _vm.validation.rules,
                          "invalid-feedback": "Challenge rules are required",
                        },
                      },
                      [
                        _c("b-form-textarea", {
                          staticClass: "modal-text",
                          attrs: {
                            placeholder:
                              "Define clear rules and guidelines for participants. For example:&#10;• Complete daily workouts&#10;• Track nutrition daily&#10;• Attend weekly check-ins&#10;• No cheating or false reporting&#10;• Submit progress photos weekly",
                            state: _vm.validation.rules,
                            rows: "6",
                            required: "",
                          },
                          on: {
                            input: function ($event) {
                              return _vm.validateField("rules")
                            },
                          },
                          model: {
                            value: _vm.newChallenge.rules,
                            callback: function ($$v) {
                              _vm.$set(_vm.newChallenge, "rules", $$v)
                            },
                            expression: "newChallenge.rules",
                          },
                        }),
                      ],
                      1
                    ),
                    _vm._v(" "),
                    _c(
                      "div",
                      { staticClass: "enrollment-section" },
                      [
                        _c("h6", [
                          _c("i", { staticClass: "fas fa-users" }),
                          _vm._v(" Member Enrollment Settings"),
                        ]),
                        _vm._v(" "),
                        _c(
                          "b-form-group",
                          [
                            _c(
                              "b-form-checkbox",
                              {
                                attrs: { switch: "" },
                                on: { change: _vm.onEnrollmentToggle },
                                model: {
                                  value: _vm.newChallenge.allowEnrollment,
                                  callback: function ($$v) {
                                    _vm.$set(
                                      _vm.newChallenge,
                                      "allowEnrollment",
                                      $$v
                                    )
                                  },
                                  expression: "newChallenge.allowEnrollment",
                                },
                              },
                              [
                                _c("strong", [
                                  _vm._v(
                                    "Allow members to sign up for this challenge"
                                  ),
                                ]),
                              ]
                            ),
                            _vm._v(" "),
                            _c(
                              "small",
                              { staticClass: "form-text text-muted" },
                              [
                                _vm._v(
                                  "Enable this to allow members to join your challenge"
                                ),
                              ]
                            ),
                          ],
                          1
                        ),
                        _vm._v(" "),
                        _vm.newChallenge.allowEnrollment
                          ? _c(
                              "b-form-group",
                              {
                                attrs: {
                                  label: "Maximum Participants",
                                  state: _vm.validation.maxParticipants,
                                  "invalid-feedback":
                                    "Maximum participants must be a positive number",
                                },
                              },
                              [
                                _c("b-form-input", {
                                  staticClass: "modal-text",
                                  attrs: {
                                    type: "number",
                                    placeholder: "50",
                                    min: "1",
                                    state: _vm.validation.maxParticipants,
                                  },
                                  on: {
                                    input: function ($event) {
                                      return _vm.validateField(
                                        "maxParticipants"
                                      )
                                    },
                                  },
                                  model: {
                                    value: _vm.newChallenge.maxParticipants,
                                    callback: function ($$v) {
                                      _vm.$set(
                                        _vm.newChallenge,
                                        "maxParticipants",
                                        $$v
                                      )
                                    },
                                    expression: "newChallenge.maxParticipants",
                                  },
                                }),
                                _vm._v(" "),
                                _c(
                                  "small",
                                  { staticClass: "form-text text-muted" },
                                  [
                                    _vm._v(
                                      "Leave empty for unlimited participants"
                                    ),
                                  ]
                                ),
                              ],
                              1
                            )
                          : _vm._e(),
                      ],
                      1
                    ),
                    _vm._v(" "),
                    _c(
                      "b-form-group",
                      { attrs: { label: "Challenge Status" } },
                      [
                        _c(
                          "b-form-select",
                          {
                            staticClass: "modal-text",
                            model: {
                              value: _vm.newChallenge.status,
                              callback: function ($$v) {
                                _vm.$set(_vm.newChallenge, "status", $$v)
                              },
                              expression: "newChallenge.status",
                            },
                          },
                          [
                            _c(
                              "b-form-select-option",
                              { attrs: { value: "Active" } },
                              [
                                _vm._v(
                                  "✅ Active - Challenge is live and accepting participants"
                                ),
                              ]
                            ),
                            _vm._v(" "),
                            _c(
                              "b-form-select-option",
                              { attrs: { value: "Inactive" } },
                              [_vm._v("⏸️ Inactive - Challenge is paused")]
                            ),
                          ],
                          1
                        ),
                      ],
                      1
                    ),
                  ],
                  1
                ),
                _vm._v(" "),
                _c("div", { staticClass: "form-navigation mt-4" }, [
                  _c(
                    "div",
                    {
                      staticClass:
                        "d-flex justify-content-between align-items-center",
                    },
                    [
                      _vm.currentStep > 1
                        ? _c(
                            "b-button",
                            {
                              staticClass: "nav-btn",
                              attrs: { variant: "outline-secondary" },
                              on: { click: _vm.previousStep },
                            },
                            [
                              _c("i", { staticClass: "fas fa-arrow-left" }),
                              _vm._v(" Previous\n                        "),
                            ]
                          )
                        : _c("div"),
                      _vm._v(" "),
                      _c("div", { staticClass: "step-indicator" }, [
                        _vm._v(
                          "\n                            Step " +
                            _vm._s(_vm.currentStep) +
                            " of 3\n                        "
                        ),
                      ]),
                      _vm._v(" "),
                      _vm.currentStep < 3
                        ? _c(
                            "b-button",
                            {
                              staticClass: "nav-btn",
                              attrs: {
                                variant: "primary",
                                disabled: !_vm.isCurrentStepValid,
                              },
                              on: { click: _vm.nextStep },
                            },
                            [
                              _vm._v("\n                            Next "),
                              _c("i", { staticClass: "fas fa-arrow-right" }),
                            ]
                          )
                        : _c("div"),
                    ],
                    1
                  ),
                ]),
              ]
            ),
          ],
          1
        ),
        _vm._v(" "),
        _c(
          "b-modal",
          {
            staticClass: "modal-text challenge-edit-modal",
            attrs: {
              title: "✏️ Edit Challenge",
              "ok-disabled": !_vm.isEditFormValid,
              size: "xl",
              centered: true,
              scrollable: true,
              "ok-title": "Update Challenge",
              "cancel-title": "Cancel",
            },
            on: { ok: _vm.updateChallenge, cancel: _vm.resetEditForm },
            model: {
              value: _vm.showEditModal,
              callback: function ($$v) {
                _vm.showEditModal = $$v
              },
              expression: "showEditModal",
            },
          },
          [
            _c("div", { staticClass: "form-progress mb-4" }, [
              _c("div", { staticClass: "progress-steps" }, [
                _c(
                  "div",
                  {
                    staticClass: "step",
                    class: {
                      active: _vm.currentEditStep >= 1,
                      completed: _vm.currentEditStep > 1,
                    },
                  },
                  [
                    _c("div", { staticClass: "step-number" }, [_vm._v("1")]),
                    _vm._v(" "),
                    _c("div", { staticClass: "step-label" }, [
                      _vm._v("Basic Info"),
                    ]),
                  ]
                ),
                _vm._v(" "),
                _c("div", { staticClass: "step-line" }),
                _vm._v(" "),
                _c(
                  "div",
                  {
                    staticClass: "step",
                    class: {
                      active: _vm.currentEditStep >= 2,
                      completed: _vm.currentEditStep > 2,
                    },
                  },
                  [
                    _c("div", { staticClass: "step-number" }, [_vm._v("2")]),
                    _vm._v(" "),
                    _c("div", { staticClass: "step-label" }, [
                      _vm._v("Details"),
                    ]),
                  ]
                ),
                _vm._v(" "),
                _c("div", { staticClass: "step-line" }),
                _vm._v(" "),
                _c(
                  "div",
                  {
                    staticClass: "step",
                    class: {
                      active: _vm.currentEditStep >= 3,
                      completed: _vm.currentEditStep > 3,
                    },
                  },
                  [
                    _c("div", { staticClass: "step-number" }, [_vm._v("3")]),
                    _vm._v(" "),
                    _c("div", { staticClass: "step-label" }, [
                      _vm._v("Settings"),
                    ]),
                  ]
                ),
              ]),
            ]),
            _vm._v(" "),
            _c(
              "b-form",
              {
                on: {
                  submit: function ($event) {
                    $event.stopPropagation()
                    $event.preventDefault()
                    return _vm.updateChallenge.apply(null, arguments)
                  },
                },
              },
              [
                _c(
                  "div",
                  {
                    directives: [
                      {
                        name: "show",
                        rawName: "v-show",
                        value: _vm.currentEditStep === 1,
                        expression: "currentEditStep === 1",
                      },
                    ],
                    staticClass: "form-step",
                  },
                  [
                    _c("div", { staticClass: "step-header" }, [
                      _c("h5", [
                        _c("i", {
                          staticClass: "fas fa-info-circle text-primary",
                        }),
                        _vm._v(" Basic Information"),
                      ]),
                      _vm._v(" "),
                      _c("p", { staticClass: "text-muted" }, [
                        _vm._v(
                          "Update the essential details of your challenge"
                        ),
                      ]),
                    ]),
                    _vm._v(" "),
                    _c("div", { staticClass: "row" }, [
                      _c(
                        "div",
                        { staticClass: "col-md-8" },
                        [
                          _c(
                            "b-form-group",
                            {
                              attrs: {
                                label: "Challenge Name *",
                                state: _vm.editValidation.name,
                                "invalid-feedback":
                                  "Challenge name is required",
                              },
                            },
                            [
                              _c("b-form-input", {
                                staticClass: "modal-text",
                                attrs: {
                                  placeholder:
                                    "e.g., 30-Day Weight Loss Challenge",
                                  state: _vm.editValidation.name,
                                  required: "",
                                },
                                on: {
                                  input: function ($event) {
                                    return _vm.validateEditField("name")
                                  },
                                },
                                model: {
                                  value: _vm.editingChallenge.name,
                                  callback: function ($$v) {
                                    _vm.$set(_vm.editingChallenge, "name", $$v)
                                  },
                                  expression: "editingChallenge.name",
                                },
                              }),
                            ],
                            1
                          ),
                        ],
                        1
                      ),
                    ]),
                    _vm._v(" "),
                    _c(
                      "b-form-group",
                      {
                        attrs: {
                          label: "Challenge Goal *",
                          state: _vm.editValidation.goal,
                          "invalid-feedback": "Challenge goal is required",
                        },
                      },
                      [
                        _c("b-form-textarea", {
                          staticClass: "modal-text",
                          attrs: {
                            placeholder:
                              "What do you want participants to achieve? (e.g., Lose 10 pounds, Run a marathon, Build muscle mass)",
                            state: _vm.editValidation.goal,
                            rows: "3",
                            required: "",
                          },
                          on: {
                            input: function ($event) {
                              return _vm.validateEditField("goal")
                            },
                          },
                          model: {
                            value: _vm.editingChallenge.goal,
                            callback: function ($$v) {
                              _vm.$set(_vm.editingChallenge, "goal", $$v)
                            },
                            expression: "editingChallenge.goal",
                          },
                        }),
                      ],
                      1
                    ),
                    _vm._v(" "),
                    _c(
                      "b-form-group",
                      {
                        attrs: {
                          label: "Reward *",
                          state: _vm.editValidation.reward,
                          "invalid-feedback": "Please select a reward",
                        },
                      },
                      [
                        _c("b-form-select", {
                          staticClass: "modal-text",
                          attrs: {
                            options: _vm.rewardOptions,
                            placeholder: "Select a reward",
                            state: _vm.editValidation.reward,
                            required: "",
                          },
                          on: {
                            change: function ($event) {
                              return _vm.validateEditField("reward")
                            },
                          },
                          scopedSlots: _vm._u([
                            {
                              key: "first",
                              fn: function () {
                                return [
                                  _c(
                                    "b-form-select-option",
                                    { attrs: { value: "", disabled: "" } },
                                    [
                                      _vm._v(
                                        "🎁 Select a reward for participants"
                                      ),
                                    ]
                                  ),
                                ]
                              },
                              proxy: true,
                            },
                          ]),
                          model: {
                            value: _vm.editingChallenge.reward,
                            callback: function ($$v) {
                              _vm.$set(_vm.editingChallenge, "reward", $$v)
                            },
                            expression: "editingChallenge.reward",
                          },
                        }),
                      ],
                      1
                    ),
                  ],
                  1
                ),
                _vm._v(" "),
                _c(
                  "div",
                  {
                    directives: [
                      {
                        name: "show",
                        rawName: "v-show",
                        value: _vm.currentEditStep === 2,
                        expression: "currentEditStep === 2",
                      },
                    ],
                    staticClass: "form-step",
                  },
                  [
                    _c("div", { staticClass: "step-header" }, [
                      _c("h5", [
                        _c("i", {
                          staticClass: "fas fa-file-alt text-success",
                        }),
                        _vm._v(" Detailed Information"),
                      ]),
                      _vm._v(" "),
                      _c("p", { staticClass: "text-muted" }, [
                        _vm._v(
                          "Update the detailed information about your challenge"
                        ),
                      ]),
                    ]),
                    _vm._v(" "),
                    _c(
                      "b-form-group",
                      {
                        attrs: {
                          label: "Challenge Description *",
                          state: _vm.editValidation.description,
                          "invalid-feedback": "Description is required",
                        },
                      },
                      [
                        _c("b-form-textarea", {
                          staticClass: "modal-text",
                          attrs: {
                            placeholder:
                              "Describe what this challenge is about, what participants will do, and what they can expect...",
                            state: _vm.editValidation.description,
                            rows: "4",
                            required: "",
                          },
                          on: {
                            input: function ($event) {
                              return _vm.validateEditField("description")
                            },
                          },
                          model: {
                            value: _vm.editingChallenge.description,
                            callback: function ($$v) {
                              _vm.$set(_vm.editingChallenge, "description", $$v)
                            },
                            expression: "editingChallenge.description",
                          },
                        }),
                      ],
                      1
                    ),
                    _vm._v(" "),
                    _c("div", { staticClass: "row" }, [
                      _c(
                        "div",
                        { staticClass: "col-md-6" },
                        [
                          _c(
                            "b-form-group",
                            {
                              attrs: {
                                label: "Start Date *",
                                state: _vm.editValidation.startDate,
                                "invalid-feedback": "Start date is required",
                              },
                            },
                            [
                              _c("b-form-input", {
                                staticClass: "modal-text",
                                attrs: {
                                  type: "date",
                                  state: _vm.editValidation.startDate,
                                  required: "",
                                },
                                on: {
                                  input: function ($event) {
                                    return _vm.validateEditField("startDate")
                                  },
                                },
                                model: {
                                  value: _vm.editingChallenge.startDate,
                                  callback: function ($$v) {
                                    _vm.$set(
                                      _vm.editingChallenge,
                                      "startDate",
                                      $$v
                                    )
                                  },
                                  expression: "editingChallenge.startDate",
                                },
                              }),
                            ],
                            1
                          ),
                        ],
                        1
                      ),
                      _vm._v(" "),
                      _c(
                        "div",
                        { staticClass: "col-md-6" },
                        [
                          _c(
                            "b-form-group",
                            {
                              attrs: {
                                label: "End Date *",
                                state: _vm.editValidation.endDate,
                                "invalid-feedback":
                                  "End date is required and must be after start date",
                              },
                            },
                            [
                              _c("b-form-input", {
                                staticClass: "modal-text",
                                attrs: {
                                  type: "date",
                                  state: _vm.editValidation.endDate,
                                  required: "",
                                },
                                on: {
                                  input: function ($event) {
                                    return _vm.validateEditField("endDate")
                                  },
                                },
                                model: {
                                  value: _vm.editingChallenge.endDate,
                                  callback: function ($$v) {
                                    _vm.$set(
                                      _vm.editingChallenge,
                                      "endDate",
                                      $$v
                                    )
                                  },
                                  expression: "editingChallenge.endDate",
                                },
                              }),
                            ],
                            1
                          ),
                        ],
                        1
                      ),
                    ]),
                    _vm._v(" "),
                    _c(
                      "b-form-group",
                      {
                        attrs: {
                          label: "Participation Fee *",
                          state: _vm.editValidation.participationFee,
                          "invalid-feedback":
                            "Participation fee is required and must be a valid amount",
                        },
                      },
                      [
                        _c(
                          "b-input-group",
                          [
                            _c(
                              "b-input-group-prepend",
                              [_c("b-input-group-text", [_vm._v("$")])],
                              1
                            ),
                            _vm._v(" "),
                            _c("b-form-input", {
                              staticClass: "modal-text",
                              attrs: {
                                type: "number",
                                placeholder: "0.00",
                                min: "0",
                                step: "0.01",
                                state: _vm.editValidation.participationFee,
                                required: "",
                              },
                              on: {
                                input: function ($event) {
                                  return _vm.validateEditField(
                                    "participationFee"
                                  )
                                },
                              },
                              model: {
                                value: _vm.editingChallenge.participationFee,
                                callback: function ($$v) {
                                  _vm.$set(
                                    _vm.editingChallenge,
                                    "participationFee",
                                    $$v
                                  )
                                },
                                expression: "editingChallenge.participationFee",
                              },
                            }),
                          ],
                          1
                        ),
                        _vm._v(" "),
                        _c("small", { staticClass: "form-text text-muted" }, [
                          _vm._v("Set to $0.00 for free challenges"),
                        ]),
                      ],
                      1
                    ),
                  ],
                  1
                ),
                _vm._v(" "),
                _c(
                  "div",
                  {
                    directives: [
                      {
                        name: "show",
                        rawName: "v-show",
                        value: _vm.currentEditStep === 3,
                        expression: "currentEditStep === 3",
                      },
                    ],
                    staticClass: "form-step",
                  },
                  [
                    _c("div", { staticClass: "step-header" }, [
                      _c("h5", [
                        _c("i", { staticClass: "fas fa-cog text-warning" }),
                        _vm._v(" Rules and Settings"),
                      ]),
                      _vm._v(" "),
                      _c("p", { staticClass: "text-muted" }, [
                        _vm._v(
                          "Update the rules and configure participation settings"
                        ),
                      ]),
                    ]),
                    _vm._v(" "),
                    _c(
                      "b-form-group",
                      {
                        attrs: {
                          label: "Challenge Rules *",
                          state: _vm.editValidation.rules,
                          "invalid-feedback": "Challenge rules are required",
                        },
                      },
                      [
                        _c("b-form-textarea", {
                          staticClass: "modal-text",
                          attrs: {
                            placeholder:
                              "Define clear rules and guidelines for participants. For example:&#10;• Complete daily workouts&#10;• Track nutrition daily&#10;• Attend weekly check-ins&#10;• No cheating or false reporting&#10;• Submit progress photos weekly",
                            state: _vm.editValidation.rules,
                            rows: "6",
                            required: "",
                          },
                          on: {
                            input: function ($event) {
                              return _vm.validateEditField("rules")
                            },
                          },
                          model: {
                            value: _vm.editingChallenge.rules,
                            callback: function ($$v) {
                              _vm.$set(_vm.editingChallenge, "rules", $$v)
                            },
                            expression: "editingChallenge.rules",
                          },
                        }),
                      ],
                      1
                    ),
                    _vm._v(" "),
                    _c(
                      "div",
                      { staticClass: "enrollment-section" },
                      [
                        _c("h6", [
                          _c("i", { staticClass: "fas fa-users" }),
                          _vm._v(" Member Enrollment Settings"),
                        ]),
                        _vm._v(" "),
                        _c(
                          "b-form-group",
                          [
                            _c(
                              "b-form-checkbox",
                              {
                                attrs: { switch: "" },
                                on: { change: _vm.onEditEnrollmentToggle },
                                model: {
                                  value: _vm.editingChallenge.allowEnrollment,
                                  callback: function ($$v) {
                                    _vm.$set(
                                      _vm.editingChallenge,
                                      "allowEnrollment",
                                      $$v
                                    )
                                  },
                                  expression:
                                    "editingChallenge.allowEnrollment",
                                },
                              },
                              [
                                _c("strong", [
                                  _vm._v(
                                    "Allow members to sign up for this challenge"
                                  ),
                                ]),
                              ]
                            ),
                            _vm._v(" "),
                            _c(
                              "small",
                              { staticClass: "form-text text-muted" },
                              [
                                _vm._v(
                                  "Enable this to allow members to join your challenge"
                                ),
                              ]
                            ),
                          ],
                          1
                        ),
                        _vm._v(" "),
                        _vm.editingChallenge.allowEnrollment
                          ? _c(
                              "b-form-group",
                              {
                                attrs: {
                                  label: "Maximum Participants",
                                  state: _vm.editValidation.maxParticipants,
                                  "invalid-feedback":
                                    "Maximum participants must be a positive number",
                                },
                              },
                              [
                                _c("b-form-input", {
                                  staticClass: "modal-text",
                                  attrs: {
                                    type: "number",
                                    placeholder: "50",
                                    min: "1",
                                    state: _vm.editValidation.maxParticipants,
                                  },
                                  on: {
                                    input: function ($event) {
                                      return _vm.validateEditField(
                                        "maxParticipants"
                                      )
                                    },
                                  },
                                  model: {
                                    value: _vm.editingChallenge.maxParticipants,
                                    callback: function ($$v) {
                                      _vm.$set(
                                        _vm.editingChallenge,
                                        "maxParticipants",
                                        $$v
                                      )
                                    },
                                    expression:
                                      "editingChallenge.maxParticipants",
                                  },
                                }),
                                _vm._v(" "),
                                _c(
                                  "small",
                                  { staticClass: "form-text text-muted" },
                                  [
                                    _vm._v(
                                      "Leave empty for unlimited participants"
                                    ),
                                  ]
                                ),
                              ],
                              1
                            )
                          : _vm._e(),
                      ],
                      1
                    ),
                    _vm._v(" "),
                    _c(
                      "b-form-group",
                      { attrs: { label: "Challenge Status" } },
                      [
                        _c(
                          "b-form-select",
                          {
                            staticClass: "modal-text",
                            model: {
                              value: _vm.editingChallenge.status,
                              callback: function ($$v) {
                                _vm.$set(_vm.editingChallenge, "status", $$v)
                              },
                              expression: "editingChallenge.status",
                            },
                          },
                          [
                            _c(
                              "b-form-select-option",
                              { attrs: { value: "Active" } },
                              [
                                _vm._v(
                                  "✅ Active - Challenge is live and accepting participants"
                                ),
                              ]
                            ),
                            _vm._v(" "),
                            _c(
                              "b-form-select-option",
                              { attrs: { value: "Inactive" } },
                              [_vm._v("⏸️ Inactive - Challenge is paused")]
                            ),
                          ],
                          1
                        ),
                      ],
                      1
                    ),
                  ],
                  1
                ),
                _vm._v(" "),
                _c("div", { staticClass: "form-navigation mt-4" }, [
                  _c(
                    "div",
                    {
                      staticClass:
                        "d-flex justify-content-between align-items-center",
                    },
                    [
                      _vm.currentEditStep > 1
                        ? _c(
                            "b-button",
                            {
                              staticClass: "nav-btn",
                              attrs: { variant: "outline-secondary" },
                              on: { click: _vm.previousEditStep },
                            },
                            [
                              _c("i", { staticClass: "fas fa-arrow-left" }),
                              _vm._v(" Previous\n                        "),
                            ]
                          )
                        : _c("div"),
                      _vm._v(" "),
                      _c("div", { staticClass: "step-indicator" }, [
                        _vm._v(
                          "\n                            Step " +
                            _vm._s(_vm.currentEditStep) +
                            " of 3\n                        "
                        ),
                      ]),
                      _vm._v(" "),
                      _vm.currentEditStep < 3
                        ? _c(
                            "b-button",
                            {
                              staticClass: "nav-btn",
                              attrs: {
                                variant: "primary",
                                disabled: !_vm.isCurrentEditStepValid,
                              },
                              on: { click: _vm.nextEditStep },
                            },
                            [
                              _vm._v("\n                            Next "),
                              _c("i", { staticClass: "fas fa-arrow-right" }),
                            ]
                          )
                        : _c("div"),
                    ],
                    1
                  ),
                ]),
              ]
            ),
          ],
          1
        ),
        _vm._v(" "),
        _c(
          "b-modal",
          {
            attrs: {
              title: "Add New Reward",
              "ok-title": "Save Reward",
              "cancel-title": "Cancel",
              size: "lg",
              "ok-disabled": !_vm.isRewardFormValid,
            },
            on: { ok: _vm.createReward, cancel: _vm.resetRewardForm },
            model: {
              value: _vm.showRewardModal,
              callback: function ($$v) {
                _vm.showRewardModal = $$v
              },
              expression: "showRewardModal",
            },
          },
          [
            _c(
              "b-form",
              {
                on: {
                  submit: function ($event) {
                    $event.stopPropagation()
                    $event.preventDefault()
                    return _vm.createReward.apply(null, arguments)
                  },
                },
              },
              [
                _c(
                  "b-form-group",
                  {
                    attrs: {
                      label: "Reward Name *",
                      state: _vm.rewardValidation.name,
                      "invalid-feedback": "Reward name is required",
                    },
                  },
                  [
                    _c("b-form-input", {
                      attrs: {
                        placeholder: "e.g. Free 1-Month Membership",
                        state: _vm.rewardValidation.name,
                        required: "",
                      },
                      on: {
                        input: function ($event) {
                          return _vm.validateRewardField("name")
                        },
                      },
                      model: {
                        value: _vm.newReward.name,
                        callback: function ($$v) {
                          _vm.$set(_vm.newReward, "name", $$v)
                        },
                        expression: "newReward.name",
                      },
                    }),
                  ],
                  1
                ),
                _vm._v(" "),
                _c(
                  "b-form-group",
                  {
                    attrs: {
                      label: "Description *",
                      state: _vm.rewardValidation.description,
                      "invalid-feedback": "Description is required",
                    },
                  },
                  [
                    _c("b-form-textarea", {
                      attrs: {
                        placeholder: "Describe what the reward offers",
                        rows: "3",
                        state: _vm.rewardValidation.description,
                        required: "",
                      },
                      on: {
                        input: function ($event) {
                          return _vm.validateRewardField("description")
                        },
                      },
                      model: {
                        value: _vm.newReward.description,
                        callback: function ($$v) {
                          _vm.$set(_vm.newReward, "description", $$v)
                        },
                        expression: "newReward.description",
                      },
                    }),
                  ],
                  1
                ),
                _vm._v(" "),
                _c(
                  "b-form-group",
                  {
                    attrs: {
                      label: "Points Required *",
                      state: _vm.rewardValidation.points,
                      "invalid-feedback":
                        "Points are required and must be a positive number",
                    },
                  },
                  [
                    _c("b-form-input", {
                      attrs: {
                        type: "number",
                        min: "1",
                        placeholder: "e.g. 500",
                        state: _vm.rewardValidation.points,
                        required: "",
                      },
                      on: {
                        input: function ($event) {
                          return _vm.validateRewardField("points")
                        },
                      },
                      model: {
                        value: _vm.newReward.points,
                        callback: function ($$v) {
                          _vm.$set(_vm.newReward, "points", $$v)
                        },
                        expression: "newReward.points",
                      },
                    }),
                  ],
                  1
                ),
                _vm._v(" "),
                _c(
                  "b-form-group",
                  {
                    attrs: {
                      label: "Category *",
                      state: _vm.rewardValidation.category,
                      "invalid-feedback": "Category is required",
                    },
                  },
                  [
                    _c(
                      "b-form-select",
                      {
                        staticClass: "modal-text",
                        attrs: {
                          state: _vm.rewardValidation.category,
                          required: "",
                        },
                        on: {
                          change: function ($event) {
                            return _vm.validateRewardField("category")
                          },
                        },
                        model: {
                          value: _vm.newReward.category,
                          callback: function ($$v) {
                            _vm.$set(_vm.newReward, "category", $$v)
                          },
                          expression: "newReward.category",
                        },
                      },
                      [
                        _c("b-form-select-option", { attrs: { value: "" } }, [
                          _vm._v("Select Category"),
                        ]),
                        _vm._v(" "),
                        _c(
                          "b-form-select-option",
                          { attrs: { value: "Trophy" } },
                          [_vm._v("Trophy")]
                        ),
                        _vm._v(" "),
                        _c(
                          "b-form-select-option",
                          { attrs: { value: "Medal" } },
                          [_vm._v("Medal")]
                        ),
                        _vm._v(" "),
                        _c(
                          "b-form-select-option",
                          { attrs: { value: "Achievement" } },
                          [_vm._v("Achievement")]
                        ),
                        _vm._v(" "),
                        _c(
                          "b-form-select-option",
                          { attrs: { value: "Badge" } },
                          [_vm._v("Badge")]
                        ),
                        _vm._v(" "),
                        _c(
                          "b-form-select-option",
                          { attrs: { value: "Certificate" } },
                          [_vm._v("Certificate")]
                        ),
                        _vm._v(" "),
                        _c(
                          "b-form-select-option",
                          { attrs: { value: "Other" } },
                          [_vm._v("Other")]
                        ),
                      ],
                      1
                    ),
                  ],
                  1
                ),
                _vm._v(" "),
                _c(
                  "b-form-group",
                  [
                    _c(
                      "b-form-checkbox",
                      {
                        attrs: { switch: "" },
                        model: {
                          value: _vm.newReward.active,
                          callback: function ($$v) {
                            _vm.$set(_vm.newReward, "active", $$v)
                          },
                          expression: "newReward.active",
                        },
                      },
                      [
                        _vm._v(
                          "\n                        Reward is Active\n                    "
                        ),
                      ]
                    ),
                  ],
                  1
                ),
              ],
              1
            ),
          ],
          1
        ),
        _vm._v(" "),
        _c(
          "b-modal",
          {
            attrs: {
              title: "✏️ Edit Reward",
              "ok-title": "Update Reward",
              "cancel-title": "Cancel",
              size: "lg",
              "ok-disabled": !_vm.isEditRewardFormValid,
            },
            on: { ok: _vm.updateReward, cancel: _vm.resetEditRewardForm },
            model: {
              value: _vm.showEditRewardModal,
              callback: function ($$v) {
                _vm.showEditRewardModal = $$v
              },
              expression: "showEditRewardModal",
            },
          },
          [
            _c(
              "b-form",
              {
                on: {
                  submit: function ($event) {
                    $event.stopPropagation()
                    $event.preventDefault()
                    return _vm.updateReward.apply(null, arguments)
                  },
                },
              },
              [
                _c(
                  "b-form-group",
                  {
                    attrs: {
                      label: "Reward Name *",
                      state: _vm.editRewardValidation.name,
                      "invalid-feedback": "Reward name is required",
                    },
                  },
                  [
                    _c("b-form-input", {
                      attrs: {
                        placeholder: "e.g. Free 1-Month Membership",
                        state: _vm.editRewardValidation.name,
                        required: "",
                      },
                      on: {
                        input: function ($event) {
                          return _vm.validateEditRewardField("name")
                        },
                      },
                      model: {
                        value: _vm.editingReward.name,
                        callback: function ($$v) {
                          _vm.$set(_vm.editingReward, "name", $$v)
                        },
                        expression: "editingReward.name",
                      },
                    }),
                  ],
                  1
                ),
                _vm._v(" "),
                _c(
                  "b-form-group",
                  {
                    attrs: {
                      label: "Description *",
                      state: _vm.editRewardValidation.description,
                      "invalid-feedback": "Description is required",
                    },
                  },
                  [
                    _c("b-form-textarea", {
                      attrs: {
                        placeholder: "Describe what the reward offers",
                        rows: "3",
                        state: _vm.editRewardValidation.description,
                        required: "",
                      },
                      on: {
                        input: function ($event) {
                          return _vm.validateEditRewardField("description")
                        },
                      },
                      model: {
                        value: _vm.editingReward.description,
                        callback: function ($$v) {
                          _vm.$set(_vm.editingReward, "description", $$v)
                        },
                        expression: "editingReward.description",
                      },
                    }),
                  ],
                  1
                ),
                _vm._v(" "),
                _c(
                  "b-form-group",
                  {
                    attrs: {
                      label: "Points Required *",
                      state: _vm.editRewardValidation.points,
                      "invalid-feedback":
                        "Points are required and must be a positive number",
                    },
                  },
                  [
                    _c("b-form-input", {
                      attrs: {
                        type: "number",
                        min: "1",
                        placeholder: "e.g. 500",
                        state: _vm.editRewardValidation.points,
                        required: "",
                      },
                      on: {
                        input: function ($event) {
                          return _vm.validateEditRewardField("points")
                        },
                      },
                      model: {
                        value: _vm.editingReward.points,
                        callback: function ($$v) {
                          _vm.$set(_vm.editingReward, "points", $$v)
                        },
                        expression: "editingReward.points",
                      },
                    }),
                  ],
                  1
                ),
                _vm._v(" "),
                _c(
                  "b-form-group",
                  {
                    attrs: {
                      label: "Category *",
                      state: _vm.editRewardValidation.category,
                      "invalid-feedback": "Category is required",
                    },
                  },
                  [
                    _c(
                      "b-form-select",
                      {
                        staticClass: "modal-text",
                        attrs: {
                          state: _vm.editRewardValidation.category,
                          required: "",
                        },
                        on: {
                          change: function ($event) {
                            return _vm.validateEditRewardField("category")
                          },
                        },
                        model: {
                          value: _vm.editingReward.category,
                          callback: function ($$v) {
                            _vm.$set(_vm.editingReward, "category", $$v)
                          },
                          expression: "editingReward.category",
                        },
                      },
                      [
                        _c("b-form-select-option", { attrs: { value: "" } }, [
                          _vm._v("Select Category"),
                        ]),
                        _vm._v(" "),
                        _c(
                          "b-form-select-option",
                          { attrs: { value: "Trophy" } },
                          [_vm._v("Trophy")]
                        ),
                        _vm._v(" "),
                        _c(
                          "b-form-select-option",
                          { attrs: { value: "Medal" } },
                          [_vm._v("Medal")]
                        ),
                        _vm._v(" "),
                        _c(
                          "b-form-select-option",
                          { attrs: { value: "Achievement" } },
                          [_vm._v("Achievement")]
                        ),
                        _vm._v(" "),
                        _c(
                          "b-form-select-option",
                          { attrs: { value: "Badge" } },
                          [_vm._v("Badge")]
                        ),
                        _vm._v(" "),
                        _c(
                          "b-form-select-option",
                          { attrs: { value: "Certificate" } },
                          [_vm._v("Certificate")]
                        ),
                        _vm._v(" "),
                        _c(
                          "b-form-select-option",
                          { attrs: { value: "Other" } },
                          [_vm._v("Other")]
                        ),
                      ],
                      1
                    ),
                  ],
                  1
                ),
                _vm._v(" "),
                _c(
                  "b-form-group",
                  [
                    _c(
                      "b-form-checkbox",
                      {
                        attrs: { switch: "" },
                        model: {
                          value: _vm.editingReward.active,
                          callback: function ($$v) {
                            _vm.$set(_vm.editingReward, "active", $$v)
                          },
                          expression: "editingReward.active",
                        },
                      },
                      [
                        _vm._v(
                          "\n                        Reward is Active\n                    "
                        ),
                      ]
                    ),
                  ],
                  1
                ),
              ],
              1
            ),
          ],
          1
        ),
        _vm._v(" "),
        _c(
          "b-modal",
          {
            ref: "addMemberModal",
            attrs: { title: "Add Member to Challenge", size: "md" },
            on: { hidden: _vm.resetAddMemberForm, show: _vm.onModalShow },
            scopedSlots: _vm._u([
              {
                key: "modal-footer",
                fn: function () {
                  return [
                    _c(
                      "b-button",
                      {
                        attrs: { variant: "secondary" },
                        on: {
                          click: function ($event) {
                            return _vm.$refs.addMemberModal.hide()
                          },
                        },
                      },
                      [_vm._v("\n                    Cancel\n                ")]
                    ),
                    _vm._v(" "),
                    _c(
                      "b-button",
                      {
                        attrs: {
                          variant: "primary",
                          type: "submit",
                          form: "addMemberForm",
                          disabled:
                            !_vm.isAddMemberFormValid || _vm.addingMember,
                        },
                      },
                      [
                        _vm.addingMember
                          ? _c("span", [
                              _c("i", {
                                staticClass: "fas fa-spinner fa-spin",
                              }),
                              _vm._v(" Adding...\n                    "),
                            ])
                          : _c("span", [
                              _c("i", { staticClass: "fas fa-plus" }),
                              _vm._v(" Add Member\n                    "),
                            ]),
                      ]
                    ),
                  ]
                },
                proxy: true,
              },
            ]),
          },
          [
            _c(
              "b-form",
              {
                attrs: { id: "addMemberForm" },
                on: {
                  submit: function ($event) {
                    $event.preventDefault()
                    return _vm.addMemberToChallenge.apply(null, arguments)
                  },
                },
              },
              [
                _c(
                  "b-form-group",
                  {
                    attrs: {
                      label: "Select Challenge",
                      "label-for": "challenge-select",
                    },
                  },
                  [
                    _c("b-form-select", {
                      attrs: {
                        id: "challenge-select",
                        options: _vm.challengeOptions,
                        required: "",
                        state: _vm.addMemberValidation.challengeId,
                      },
                      on: { change: _vm.validateChallengeSelection },
                      scopedSlots: _vm._u([
                        {
                          key: "first",
                          fn: function () {
                            return [
                              _c(
                                "b-form-select-option",
                                { attrs: { value: null, disabled: "" } },
                                [
                                  _vm._v(
                                    "\n                                Choose a challenge...\n                            "
                                  ),
                                ]
                              ),
                            ]
                          },
                          proxy: true,
                        },
                      ]),
                      model: {
                        value: _vm.addMemberForm.challengeId,
                        callback: function ($$v) {
                          _vm.$set(_vm.addMemberForm, "challengeId", $$v)
                        },
                        expression: "addMemberForm.challengeId",
                      },
                    }),
                    _vm._v(" "),
                    _c("b-form-invalid-feedback", [
                      _vm._v(
                        "\n                        Please select a challenge\n                    "
                      ),
                    ]),
                  ],
                  1
                ),
                _vm._v(" "),
                _c(
                  "b-form-group",
                  {
                    attrs: {
                      label: "Select Member",
                      "label-for": "member-select",
                    },
                  },
                  [
                    _c("b-form-select", {
                      attrs: {
                        id: "member-select",
                        options: _vm.availableMembers,
                        required: "",
                        state: _vm.addMemberValidation.memberId,
                        disabled: _vm.loadingMembers,
                      },
                      on: { change: _vm.validateMemberSelection },
                      scopedSlots: _vm._u([
                        {
                          key: "first",
                          fn: function () {
                            return [
                              _c(
                                "b-form-select-option",
                                { attrs: { value: null, disabled: "" } },
                                [
                                  _vm._v(
                                    "\n                                " +
                                      _vm._s(
                                        _vm.loadingMembers
                                          ? "Loading members..."
                                          : "Choose a member..."
                                      ) +
                                      "\n                            "
                                  ),
                                ]
                              ),
                            ]
                          },
                          proxy: true,
                        },
                      ]),
                      model: {
                        value: _vm.addMemberForm.memberId,
                        callback: function ($$v) {
                          _vm.$set(_vm.addMemberForm, "memberId", $$v)
                        },
                        expression: "addMemberForm.memberId",
                      },
                    }),
                    _vm._v(" "),
                    _c("b-form-invalid-feedback", [
                      _vm._v(
                        "\n                        Please select a member\n                    "
                      ),
                    ]),
                    _vm._v(" "),
                    _vm.availableMembers.length === 0 && !_vm.loadingMembers
                      ? _c("b-form-text", { staticClass: "text-warning" }, [
                          _c("i", {
                            staticClass: "fas fa-exclamation-triangle",
                          }),
                          _vm._v(
                            " No members available. Please add members first.\n                    "
                          ),
                        ])
                      : _vm._e(),
                  ],
                  1
                ),
                _vm._v(" "),
                _c(
                  "b-form-group",
                  {
                    attrs: {
                      label: "Initial Progress (%)",
                      "label-for": "progress-input",
                    },
                  },
                  [
                    _c("b-form-input", {
                      attrs: {
                        id: "progress-input",
                        type: "number",
                        min: "0",
                        max: "100",
                        placeholder: "0",
                      },
                      model: {
                        value: _vm.addMemberForm.progress,
                        callback: function ($$v) {
                          _vm.$set(_vm.addMemberForm, "progress", $$v)
                        },
                        expression: "addMemberForm.progress",
                      },
                    }),
                    _vm._v(" "),
                    _c("small", { staticClass: "form-text text-muted" }, [
                      _vm._v(
                        "\n                        Optional: Set initial progress percentage (0-100)\n                    "
                      ),
                    ]),
                  ],
                  1
                ),
                _vm._v(" "),
                _c(
                  "b-form-group",
                  { attrs: { label: "Status", "label-for": "status-select" } },
                  [
                    _c("b-form-select", {
                      attrs: {
                        id: "status-select",
                        options: _vm.statusOptions,
                        required: "",
                      },
                      model: {
                        value: _vm.addMemberForm.status,
                        callback: function ($$v) {
                          _vm.$set(_vm.addMemberForm, "status", $$v)
                        },
                        expression: "addMemberForm.status",
                      },
                    }),
                  ],
                  1
                ),
                _vm._v(" "),
                _c("div", { staticClass: "alert alert-info" }, [
                  _c("i", { staticClass: "fas fa-info-circle" }),
                  _vm._v(" "),
                  _c("strong", [_vm._v("Note:")]),
                  _vm._v(
                    " Select a challenge and member to add them to the challenge. The member will be able to start participating immediately.\n                "
                  ),
                ]),
              ],
              1
            ),
          ],
          1
        ),
      ],
      1
    ),
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
        _c("i", { staticClass: "fas fa-trophy" }),
        _vm._v(
          "\n                                Challenges\n                            "
        ),
      ]
    )
  },
  function () {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "page-header" }, [
      _c("div", [
        _c("h2", { staticClass: "page-title" }, [_vm._v("🏆 Challenges")]),
        _vm._v(" "),
        _c("p", { staticClass: "page-subtitle" }, [
          _vm._v("Manage and view all challenges"),
        ]),
      ]),
    ])
  },
]
render._withStripped = true



/***/ })

}]);