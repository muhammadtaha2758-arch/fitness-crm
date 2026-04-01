"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["resources_src_views_app_pages_Community_Group_vue"],{

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/Community/Group.vue?vue&type=script&lang=js":
/*!***************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/Community/Group.vue?vue&type=script&lang=js ***!
  \***************************************************************************************************************************************************************************************************************/
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

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  name: "Groups",
  data: function data() {
    return {
      searchQuery: '',
      selectedFilter: 'all',
      groups: [],
      isLoading: false
    };
  },
  computed: {
    filteredGroups: function filteredGroups() {
      // Show all groups with search filtering
      var q = this.searchQuery.trim().toLowerCase();
      if (!q) return this.groups;
      return this.groups.filter(function (g) {
        return (g.name || '').toLowerCase().includes(q) || (g.description || '').toLowerCase().includes(q);
      });
    }
  },
  created: function created() {
    this.loadGroups();
  },
  activated: function activated() {
    // Reload groups when component is activated (e.g., after returning from create page)
    this.loadGroups();
  },
  methods: {
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
    addNewGroup: function addNewGroup() {
      var _this = this;
      return _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
        return _regeneratorRuntime().wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              _this.$router.push('/app/community/edit-group');
            case 1:
            case "end":
              return _context.stop();
          }
        }, _callee);
      }))();
    },
    openGroup: function openGroup(group) {
      this.$router.push("/app/community/feed");
    },
    getGroupImage: function getGroupImage(group) {
      // If group has a custom avatar, use it
      if (group.avatar) {
        return group.avatar;
      }

      // Assign different images based on group ID or name
      var groupId = group.id;
      var groupName = (group.name || '').toLowerCase();

      // Alternative approach: Assign images based on group order/index
      var groupIndex = this.groups.findIndex(function (g) {
        return g.id === groupId;
      });
      if (groupIndex === 0) {
        console.log('Using thorstrengthfitness.png for first group:', group.name);
        return '/images/thorstrengthfitness.png';
      } else if (groupIndex === 1) {
        console.log('Using healthyeat.jpg for second group:', group.name);
        return '/images/healthyeat.jpg';
      } else if (groupIndex === 2) {
        console.log('Using Teamworks.png for third group:', group.name);
        return '/images/Teamworks.png';
      }

      // Original logic as fallback
      if (groupId === 1 || groupName.includes('fitness') || groupName.includes('strength')) {
        console.log('Using thorstrengthfitness.png for group:', group.name);
        return '/images/thorstrengthfitness.png';
      } else if (groupId === 2 || groupName.includes('cardio') || groupName.includes('running')) {
        console.log('Using healthyeat.jpg for group:', group.name);
        return '/images/healthyeat.jpg';
      } else if (groupId === 3 || groupName.includes('yoga') || groupName.includes('wellness')) {
        console.log('Using Teamworks.png for group:', group.name);
        return '/images/Teamworks.png';
      }
      return '/images/thorstrengthfitness.png';
    },
    loadGroups: function loadGroups() {
      var _this2 = this;
      return _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee2() {
        var response, data, _e$response, _e$response2;
        return _regeneratorRuntime().wrap(function _callee2$(_context2) {
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
              _context2.prev = 0;
              _this2.isLoading = true;
              _context2.next = 4;
              return window.axios.get('communication/groups');
            case 4:
              response = _context2.sent;
              console.log('API Response:', response);
              console.log('Response Data:', response.data);
              data = response.data; // Check if response has success and groups
              if (data && data.success && Array.isArray(data.groups)) {
                _this2.groups = data.groups;
                console.log('Groups loaded:', _this2.groups.length, _this2.groups);
              } else if (data && Array.isArray(data.groups)) {
                // Handle case where success might not be in response
                _this2.groups = data.groups;
                console.log('Groups loaded (without success flag):', _this2.groups.length, _this2.groups);
              } else if (data && Array.isArray(data)) {
                // Handle case where response is directly an array
                _this2.groups = data;
                console.log('Groups loaded (direct array):', _this2.groups.length, _this2.groups);
              } else {
                _this2.groups = [];
                console.warn('Unexpected response structure:', data);
              }
              _context2.next = 18;
              break;
            case 11:
              _context2.prev = 11;
              _context2.t0 = _context2["catch"](0);
              _this2.groups = [];
              console.error('Error loading groups:', _context2.t0);
              console.error('Error response:', _context2.t0.response);
              console.error('Error data:', (_e$response = _context2.t0.response) === null || _e$response === void 0 ? void 0 : _e$response.data);
              // If it's a 401 error, redirect to login
              if (((_e$response2 = _context2.t0.response) === null || _e$response2 === void 0 ? void 0 : _e$response2.status) === 401) {
                console.error('Authentication failed. Token may be missing or expired. Redirecting to login...');
                // The axios interceptor should handle redirect, but if it doesn't, do it here
                if (!_context2.t0.isHandled && !_context2.t0.isAuthError) {
                  window.location.href = '/login';
                }
              }
            case 18:
              _context2.prev = 18;
              _this2.isLoading = false;
              return _context2.finish(18);
            case 21:
            case "end":
              return _context2.stop();
          }
        }, _callee2, null, [[0, 11, 18, 21]]);
      }))();
    }
  }
});

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js??clonedRuleSet-12.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12.use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-12.use[3]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/Community/Group.vue?vue&type=style&index=0&id=4dc607cc&lang=scss&scoped=true":
/*!******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??clonedRuleSet-12.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12.use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-12.use[3]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/Community/Group.vue?vue&type=style&index=0&id=4dc607cc&lang=scss&scoped=true ***!
  \******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
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
___CSS_LOADER_EXPORT___.push([module.id, "@charset \"UTF-8\";\n.filter-btn .btn[data-v-4dc607cc],\n.filter-btn .btn-secondary[data-v-4dc607cc],\n.filter-btn .btn-outline-secondary[data-v-4dc607cc],\n.filter-btn button.btn[data-v-4dc607cc],\n.filter-btn button.btn-secondary[data-v-4dc607cc] {\n  color: #000 !important;\n  background-color: transparent !important;\n  border-color: #6c757d !important;\n}\n.filter-btn .btn[data-v-4dc607cc]:hover,\n.filter-btn .btn-secondary[data-v-4dc607cc]:hover,\n.filter-btn .btn-outline-secondary[data-v-4dc607cc]:hover,\n.filter-btn button.btn[data-v-4dc607cc]:hover,\n.filter-btn button.btn-secondary[data-v-4dc607cc]:hover {\n  color: #dc3545 !important;\n  background-color: transparent !important;\n  border-color: #dc3545 !important;\n  box-shadow: none !important;\n}\n.filter-btn .btn[data-v-4dc607cc]:focus,\n.filter-btn .btn-secondary[data-v-4dc607cc]:focus,\n.filter-btn .btn-outline-secondary[data-v-4dc607cc]:focus,\n.filter-btn button.btn[data-v-4dc607cc]:focus,\n.filter-btn button.btn-secondary[data-v-4dc607cc]:focus {\n  color: #dc3545 !important;\n  background-color: transparent !important;\n  border-color: #dc3545 !important;\n  box-shadow: none !important;\n}\n.filter-btn .btn[data-v-4dc607cc]:active,\n.filter-btn .btn-secondary[data-v-4dc607cc]:active,\n.filter-btn .btn-outline-secondary[data-v-4dc607cc]:active,\n.filter-btn button.btn[data-v-4dc607cc]:active,\n.filter-btn button.btn-secondary[data-v-4dc607cc]:active {\n  color: #dc3545 !important;\n  background-color: transparent !important;\n  border-color: #dc3545 !important;\n}\n.btn-secondary[data-v-4dc607cc]:not(:disabled):not(.disabled):active:focus {\n  box-shadow: none !important;\n}\n\n/* ===========================================\n   COMMON BREADCRUMB NAVIGATION STYLES\n   =========================================== */\n.breadcrumb-nav-row[data-v-4dc607cc] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  margin-bottom: 0.5rem;\n  gap: 0.5rem;\n}\n.breadcrumb-section[data-v-4dc607cc] {\n  flex: 1;\n}\n.breadcrumb-section .breadcrumb-nav .breadcrumb-container[data-v-4dc607cc] {\n  display: flex;\n  align-items: center;\n  gap: 1rem;\n}\n.breadcrumb-section .breadcrumb-nav .breadcrumb-container .back-button[data-v-4dc607cc] {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  width: 40px;\n  height: 40px;\n  background: rgba(255, 255, 255, 0.1);\n  border: 1px solid rgba(255, 255, 255, 0.2);\n  border-radius: 8px;\n  color: #ffffff;\n  cursor: pointer;\n  transition: all 0.3s ease;\n}\n.breadcrumb-section .breadcrumb-nav .breadcrumb-container .back-button[data-v-4dc607cc]:hover {\n  background: rgba(255, 255, 255, 0.15);\n  border-color: rgba(255, 255, 255, 0.3);\n  transform: translateY(-1px);\n  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);\n  color: #dc3545;\n}\n.breadcrumb-section .breadcrumb-nav .breadcrumb-container .back-button i[data-v-4dc607cc] {\n  font-size: 1.1em;\n}\n.breadcrumb-section .breadcrumb-nav .breadcrumb-container .breadcrumb[data-v-4dc607cc] {\n  display: flex;\n  align-items: center;\n  gap: 0.5rem;\n  margin: 0;\n  padding: 0;\n  background: none;\n  border-radius: 0;\n}\n.breadcrumb-section .breadcrumb-nav .breadcrumb-container .breadcrumb .breadcrumb-item[data-v-4dc607cc] {\n  display: flex;\n  align-items: center;\n  gap: 0.5rem;\n  font-size: 0.875rem;\n  color: #ffffff;\n}\n.breadcrumb-section .breadcrumb-nav .breadcrumb-container .breadcrumb .breadcrumb-item.active[data-v-4dc607cc] {\n  color: #252525;\n  font-weight: 600;\n}\n.breadcrumb-section .breadcrumb-nav .breadcrumb-container .breadcrumb .breadcrumb-item.active i[data-v-4dc607cc] {\n  color: #dc3545;\n}\n.breadcrumb-section .breadcrumb-nav .breadcrumb-container .breadcrumb .breadcrumb-item a[data-v-4dc607cc] {\n  display: flex;\n  align-items: center;\n  gap: 0.5rem;\n  color: #6a6a6a;\n  text-decoration: none;\n  transition: color 0.3s ease;\n}\n.breadcrumb-section .breadcrumb-nav .breadcrumb-container .breadcrumb .breadcrumb-item a[data-v-4dc607cc]:hover {\n  color: #dc3545;\n}\n.breadcrumb-section .breadcrumb-nav .breadcrumb-container .breadcrumb .breadcrumb-item a:hover i[data-v-4dc607cc] {\n  color: #dc3545;\n}\n.breadcrumb-section .breadcrumb-nav .breadcrumb-container .breadcrumb .breadcrumb-item a i[data-v-4dc607cc] {\n  font-size: 0.9em;\n  transition: color 0.3s ease;\n}\n.breadcrumb-section .breadcrumb-nav .breadcrumb-container .breadcrumb .breadcrumb-item[data-v-4dc607cc]:not(:last-child)::after {\n  content: \"›\";\n  margin-left: 0.5rem;\n  color: #6a6a6a;\n  font-size: 1.2em;\n}\n.action-section[data-v-4dc607cc] {\n  display: flex;\n  align-items: center;\n}\n.action-section .action-btn[data-v-4dc607cc] {\n  display: flex;\n  align-items: center;\n  gap: 0.5rem;\n  padding: 0.5rem 1rem;\n  border-radius: 8px;\n  font-size: 0.875rem;\n  font-weight: 500;\n  transition: all 0.3s ease;\n}\n.action-section .action-btn[data-v-4dc607cc]:hover:not(:disabled) {\n  transform: translateY(-1px);\n  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);\n}\n.action-section .action-btn[data-v-4dc607cc]:disabled {\n  opacity: 0.6;\n  cursor: not-allowed;\n}\n.action-section .action-btn i[data-v-4dc607cc] {\n  font-size: 0.9em;\n}\n@media (max-width: 768px) {\n.breadcrumb-nav-row[data-v-4dc607cc] {\n    flex-direction: column;\n    align-items: flex-start;\n    gap: 0.5rem;\n}\n.breadcrumb-section[data-v-4dc607cc] {\n    width: 100%;\n}\n.breadcrumb-section .breadcrumb-container[data-v-4dc607cc] {\n    flex-direction: column;\n    align-items: flex-start;\n    gap: 0.5rem;\n}\n.breadcrumb-section .breadcrumb-container .breadcrumb[data-v-4dc607cc] {\n    flex-wrap: wrap;\n}\n.breadcrumb-section .breadcrumb-container .breadcrumb .breadcrumb-item[data-v-4dc607cc] {\n    font-size: 0.8rem;\n}\n.breadcrumb-section .breadcrumb-container .breadcrumb .breadcrumb-item a[data-v-4dc607cc] {\n    font-size: 0.8rem;\n}\n.action-section[data-v-4dc607cc] {\n    width: 100%;\n    justify-content: flex-end;\n}\n.action-section .action-btn[data-v-4dc607cc] {\n    font-size: 0.8rem;\n    padding: 0.4rem 0.8rem;\n}\n}\n/* ===========================================\n   RESPONSIVE UTILITY CLASSES (ALL DEVICES)\n   =========================================== */\n.show-xs-only[data-v-4dc607cc],\n.show-sm-only[data-v-4dc607cc],\n.show-md-only[data-v-4dc607cc],\n.show-lg-only[data-v-4dc607cc],\n.show-xl-only[data-v-4dc607cc] {\n  display: none !important;\n}\n@media (max-width: 575px) {\n.hide-xs[data-v-4dc607cc] {\n    display: none !important;\n}\n.show-xs-only[data-v-4dc607cc] {\n    display: initial !important;\n}\n}\n@media (min-width: 576px) and (max-width: 767px) {\n.hide-sm[data-v-4dc607cc] {\n    display: none !important;\n}\n.show-sm-only[data-v-4dc607cc] {\n    display: initial !important;\n}\n}\n@media (min-width: 768px) and (max-width: 991px) {\n.hide-md[data-v-4dc607cc] {\n    display: none !important;\n}\n.show-md-only[data-v-4dc607cc] {\n    display: initial !important;\n}\n}\n@media (min-width: 992px) and (max-width: 1199px) {\n.hide-lg[data-v-4dc607cc] {\n    display: none !important;\n}\n.show-lg-only[data-v-4dc607cc] {\n    display: initial !important;\n}\n}\n@media (min-width: 1200px) {\n.hide-xl[data-v-4dc607cc] {\n    display: none !important;\n}\n.show-xl-only[data-v-4dc607cc] {\n    display: initial !important;\n}\n}\n@media (max-width: 576px) {\n.hide-sm-down[data-v-4dc607cc] {\n    display: none !important;\n}\n}\n@media (max-width: 768px) {\n.hide-md-down[data-v-4dc607cc] {\n    display: none !important;\n}\n}\n@media (max-width: 992px) {\n.hide-lg-down[data-v-4dc607cc] {\n    display: none !important;\n}\n}\n@media (min-width: 576px) {\n.hide-sm-up[data-v-4dc607cc] {\n    display: none !important;\n}\n}\n@media (min-width: 768px) {\n.hide-md-up[data-v-4dc607cc] {\n    display: none !important;\n}\n}\n@media (min-width: 992px) {\n.hide-lg-up[data-v-4dc607cc] {\n    display: none !important;\n}\n}\n@media (max-width: 575px) {\n.d-xs-none[data-v-4dc607cc] {\n    display: none !important;\n}\n.d-xs-block[data-v-4dc607cc] {\n    display: block !important;\n}\n.d-xs-flex[data-v-4dc607cc] {\n    display: flex !important;\n}\n}\n@media (min-width: 576px) and (max-width: 767px) {\n.d-sm-none[data-v-4dc607cc] {\n    display: none !important;\n}\n.d-sm-block[data-v-4dc607cc] {\n    display: block !important;\n}\n.d-sm-flex[data-v-4dc607cc] {\n    display: flex !important;\n}\n}\n@media (min-width: 768px) and (max-width: 991px) {\n.d-md-none[data-v-4dc607cc] {\n    display: none !important;\n}\n.d-md-block[data-v-4dc607cc] {\n    display: block !important;\n}\n.d-md-flex[data-v-4dc607cc] {\n    display: flex !important;\n}\n}\n@media (min-width: 992px) and (max-width: 1199px) {\n.d-lg-none[data-v-4dc607cc] {\n    display: none !important;\n}\n.d-lg-block[data-v-4dc607cc] {\n    display: block !important;\n}\n.d-lg-flex[data-v-4dc607cc] {\n    display: flex !important;\n}\n}\n@media (min-width: 1200px) {\n.d-xl-none[data-v-4dc607cc] {\n    display: none !important;\n}\n.d-xl-block[data-v-4dc607cc] {\n    display: block !important;\n}\n.d-xl-flex[data-v-4dc607cc] {\n    display: flex !important;\n}\n}\n@media (min-width: 576px) {\n.custom-modal-xl[data-v-4dc607cc] {\n    max-width: 1500px !important;\n}\n}\n.groups-page[data-v-4dc607cc] {\n  min-height: 100vh;\n  background: #f5f5f3;\n  padding: 20px;\n}\n\n/* Header Section */\n.groups-header[data-v-4dc607cc] {\n  margin-bottom: 30px;\n}\n.header-content[data-v-4dc607cc] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  max-width: 1200px;\n  margin: 0 auto;\n}\n.page-title[data-v-4dc607cc] {\n  font-size: 1.5rem;\n  font-weight: bold;\n  color: #252525;\n  margin: 0;\n}\n.add-group-btn[data-v-4dc607cc] {\n  background: #dc3545;\n  color: white;\n  border: none;\n  padding: 12px 20px;\n  border-radius: 8px;\n  font-size: 16px;\n  font-weight: 500;\n  cursor: pointer;\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  transition: all 0.3s ease;\n}\n.add-group-btn[data-v-4dc607cc]:hover {\n  background: #dc3545;\n  transform: translateY(-2px);\n}\n.add-group-btn i[data-v-4dc607cc] {\n  font-size: 14px;\n}\n\n/* Search and Filter Section */\n.back-button[data-v-4dc607cc] {\n  color: #dc3545 !important;\n}\n.search-filter-section[data-v-4dc607cc] {\n  background: white;\n  border-radius: 12px;\n  padding: 20px;\n  margin-bottom: 30px;\n  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);\n  max-width: 1200px;\n  margin-left: auto;\n  margin-right: auto;\n}\n.search-container[data-v-4dc607cc] {\n  display: flex;\n  align-items: center;\n  gap: 20px;\n  flex-wrap: wrap;\n}\n.search-bar[data-v-4dc607cc] {\n  position: relative;\n  flex: 1;\n  min-width: 200px;\n}\n.search-icon[data-v-4dc607cc] {\n  position: absolute;\n  left: 15px;\n  top: 50%;\n  transform: translateY(-50%);\n  color: #6c757d;\n  font-size: 16px;\n}\n.search-input[data-v-4dc607cc] {\n  width: 100%;\n  padding: 12px 15px 12px 45px;\n  border: 1px solid #e9ecef;\n  border-radius: 25px;\n  font-size: 16px;\n  outline: none;\n  transition: border-color 0.3s ease;\n}\n.search-input[data-v-4dc607cc]:focus {\n  border-color: #dc3545;\n}\n.search-input[data-v-4dc607cc]::-moz-placeholder {\n  color: #6c757d;\n  opacity: 1;\n}\n.search-input[data-v-4dc607cc]::placeholder {\n  color: #6c757d;\n  opacity: 1;\n}\n.filter-options[data-v-4dc607cc] {\n  display: flex;\n  align-items: center;\n  gap: 20px;\n  flex-wrap: wrap;\n}\n.country-flags[data-v-4dc607cc] {\n  display: flex;\n  gap: 8px;\n  flex-wrap: wrap;\n}\n.flag-icon[data-v-4dc607cc] {\n  cursor: pointer;\n  transition: transform 0.2s ease;\n  padding: 4px;\n  border-radius: 4px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n.flag-icon[data-v-4dc607cc]:hover {\n  transform: scale(1.2);\n  background: #f8f9fa;\n}\n.flag-image[data-v-4dc607cc] {\n  width: 24px;\n  height: 18px;\n  -o-object-fit: cover;\n     object-fit: cover;\n  border-radius: 2px;\n  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);\n}\n.filter-dropdown[data-v-4dc607cc] {\n  position: relative;\n  display: flex;\n  align-items: center;\n}\n.filter-select[data-v-4dc607cc] {\n  padding: 12px 40px 12px 15px;\n  border: 1px solid #e9ecef;\n  border-radius: 8px;\n  font-size: 16px;\n  background: white;\n  cursor: pointer;\n  outline: none;\n  -webkit-appearance: none;\n     -moz-appearance: none;\n          appearance: none;\n  min-width: 120px;\n}\n.dropdown-icon[data-v-4dc607cc] {\n  position: absolute;\n  right: 15px;\n  color: #6c757d;\n  pointer-events: none;\n}\n\n/* Groups Grid */\n.groups-grid[data-v-4dc607cc] {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n  gap: 30px;\n  max-width: 1200px;\n  margin: 0 auto;\n}\n.group-card[data-v-4dc607cc] {\n  background: white;\n  border-radius: 12px;\n  overflow: hidden;\n  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);\n  transition: transform 0.3s ease, box-shadow 0.3s ease;\n  cursor: pointer;\n}\n.group-card[data-v-4dc607cc]:hover {\n  transform: translateY(-5px);\n  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);\n}\n.group-image[data-v-4dc607cc] {\n  height: 200px;\n  position: relative;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  overflow: hidden;\n}\n.group-cover-image[data-v-4dc607cc] {\n  width: 100%;\n  height: 100%;\n  -o-object-fit: cover;\n     object-fit: cover;\n  -o-object-position: center;\n     object-position: center;\n}\n.group-info[data-v-4dc607cc] {\n  padding: 20px;\n}\n.group-name[data-v-4dc607cc] {\n  font-size: 18px;\n  font-weight: 600;\n  color: #252525;\n  margin: 0 0 8px 0;\n  text-align: center;\n}\n.group-description[data-v-4dc607cc] {\n  font-size: 14px;\n  color: #6c757d;\n  margin: 0;\n  text-align: center;\n  line-height: 1.4;\n  display: -webkit-box;\n  -webkit-line-clamp: 2;\n  line-clamp: 2;\n  -webkit-box-orient: vertical;\n  overflow: hidden;\n}\n.loading-container[data-v-4dc607cc],\n.no-groups-container[data-v-4dc607cc] {\n  text-align: center;\n  padding: 60px 20px;\n  color: #6c757d;\n  font-size: 16px;\n  max-width: 1200px;\n  margin: 0 auto;\n}\n\n/* Responsive Design */\n@media (max-width: 992px) {\n.groups-grid[data-v-4dc607cc] {\n    grid-template-columns: repeat(2, 1fr);\n    gap: 20px;\n}\n}\n@media (max-width: 768px) {\n.groups-page[data-v-4dc607cc] {\n    padding: 15px;\n}\n.header-content[data-v-4dc607cc] {\n    flex-direction: column;\n    gap: 20px;\n    align-items: stretch;\n}\n.page-title[data-v-4dc607cc] {\n    font-size: 2rem;\n    text-align: center;\n}\n.search-container[data-v-4dc607cc] {\n    flex-direction: column;\n    align-items: stretch;\n}\n.filter-options[data-v-4dc607cc] {\n    justify-content: center;\n}\n.groups-grid[data-v-4dc607cc] {\n    grid-template-columns: 1fr;\n    gap: 20px;\n}\n.country-flags[data-v-4dc607cc] {\n    justify-content: center;\n}\n}\n@media (max-width: 480px) {\n.page-title[data-v-4dc607cc] {\n    font-size: 1.5rem;\n}\n.add-group-btn[data-v-4dc607cc] {\n    padding: 10px 16px;\n    font-size: 14px;\n}\n.search-input[data-v-4dc607cc] {\n    font-size: 14px;\n}\n.group-name[data-v-4dc607cc] {\n    font-size: 16px;\n}\n}", ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-12.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12.use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-12.use[3]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/Community/Group.vue?vue&type=style&index=0&id=4dc607cc&lang=scss&scoped=true":
/*!**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-12.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12.use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-12.use[3]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/Community/Group.vue?vue&type=style&index=0&id=4dc607cc&lang=scss&scoped=true ***!
  \**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../../../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_clonedRuleSet_12_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_12_use_2_node_modules_sass_loader_dist_cjs_js_clonedRuleSet_12_use_3_node_modules_vue_loader_lib_index_js_vue_loader_options_Group_vue_vue_type_style_index_0_id_4dc607cc_lang_scss_scoped_true__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !!../../../../../../node_modules/css-loader/dist/cjs.js??clonedRuleSet-12.use[1]!../../../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12.use[2]!../../../../../../node_modules/sass-loader/dist/cjs.js??clonedRuleSet-12.use[3]!../../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Group.vue?vue&type=style&index=0&id=4dc607cc&lang=scss&scoped=true */ "./node_modules/css-loader/dist/cjs.js??clonedRuleSet-12.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12.use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-12.use[3]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/Community/Group.vue?vue&type=style&index=0&id=4dc607cc&lang=scss&scoped=true");

            

var options = {};

options.insert = "head";
options.singleton = false;

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_clonedRuleSet_12_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_12_use_2_node_modules_sass_loader_dist_cjs_js_clonedRuleSet_12_use_3_node_modules_vue_loader_lib_index_js_vue_loader_options_Group_vue_vue_type_style_index_0_id_4dc607cc_lang_scss_scoped_true__WEBPACK_IMPORTED_MODULE_1__["default"], options);



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_clonedRuleSet_12_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_12_use_2_node_modules_sass_loader_dist_cjs_js_clonedRuleSet_12_use_3_node_modules_vue_loader_lib_index_js_vue_loader_options_Group_vue_vue_type_style_index_0_id_4dc607cc_lang_scss_scoped_true__WEBPACK_IMPORTED_MODULE_1__["default"].locals || {});

/***/ }),

/***/ "./resources/src/views/app/pages/Community/Group.vue":
/*!***********************************************************!*\
  !*** ./resources/src/views/app/pages/Community/Group.vue ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Group_vue_vue_type_template_id_4dc607cc_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Group.vue?vue&type=template&id=4dc607cc&scoped=true */ "./resources/src/views/app/pages/Community/Group.vue?vue&type=template&id=4dc607cc&scoped=true");
/* harmony import */ var _Group_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Group.vue?vue&type=script&lang=js */ "./resources/src/views/app/pages/Community/Group.vue?vue&type=script&lang=js");
/* harmony import */ var _Group_vue_vue_type_style_index_0_id_4dc607cc_lang_scss_scoped_true__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Group.vue?vue&type=style&index=0&id=4dc607cc&lang=scss&scoped=true */ "./resources/src/views/app/pages/Community/Group.vue?vue&type=style&index=0&id=4dc607cc&lang=scss&scoped=true");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");



;


/* normalize component */

var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _Group_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__["default"],
  _Group_vue_vue_type_template_id_4dc607cc_scoped_true__WEBPACK_IMPORTED_MODULE_0__.render,
  _Group_vue_vue_type_template_id_4dc607cc_scoped_true__WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  "4dc607cc",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/src/views/app/pages/Community/Group.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./resources/src/views/app/pages/Community/Group.vue?vue&type=script&lang=js":
/*!***********************************************************************************!*\
  !*** ./resources/src/views/app/pages/Community/Group.vue?vue&type=script&lang=js ***!
  \***********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Group_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Group.vue?vue&type=script&lang=js */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/Community/Group.vue?vue&type=script&lang=js");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Group_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/src/views/app/pages/Community/Group.vue?vue&type=style&index=0&id=4dc607cc&lang=scss&scoped=true":
/*!********************************************************************************************************************!*\
  !*** ./resources/src/views/app/pages/Community/Group.vue?vue&type=style&index=0&id=4dc607cc&lang=scss&scoped=true ***!
  \********************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_dist_cjs_js_node_modules_css_loader_dist_cjs_js_clonedRuleSet_12_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_12_use_2_node_modules_sass_loader_dist_cjs_js_clonedRuleSet_12_use_3_node_modules_vue_loader_lib_index_js_vue_loader_options_Group_vue_vue_type_style_index_0_id_4dc607cc_lang_scss_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/style-loader/dist/cjs.js!../../../../../../node_modules/css-loader/dist/cjs.js??clonedRuleSet-12.use[1]!../../../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12.use[2]!../../../../../../node_modules/sass-loader/dist/cjs.js??clonedRuleSet-12.use[3]!../../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Group.vue?vue&type=style&index=0&id=4dc607cc&lang=scss&scoped=true */ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-12.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12.use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-12.use[3]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/Community/Group.vue?vue&type=style&index=0&id=4dc607cc&lang=scss&scoped=true");


/***/ }),

/***/ "./resources/src/views/app/pages/Community/Group.vue?vue&type=template&id=4dc607cc&scoped=true":
/*!*****************************************************************************************************!*\
  !*** ./resources/src/views/app/pages/Community/Group.vue?vue&type=template&id=4dc607cc&scoped=true ***!
  \*****************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Group_vue_vue_type_template_id_4dc607cc_scoped_true__WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   staticRenderFns: () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Group_vue_vue_type_template_id_4dc607cc_scoped_true__WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Group_vue_vue_type_template_id_4dc607cc_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Group.vue?vue&type=template&id=4dc607cc&scoped=true */ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/Community/Group.vue?vue&type=template&id=4dc607cc&scoped=true");


/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/Community/Group.vue?vue&type=template&id=4dc607cc&scoped=true":
/*!********************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/Community/Group.vue?vue&type=template&id=4dc607cc&scoped=true ***!
  \********************************************************************************************************************************************************************************************************************************************/
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
  return _c("div", { staticClass: "groups-page" }, [
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
              { staticClass: "breadcrumb-container d-flex align-items-center" },
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
                  _vm._m(0),
                ]),
              ]
            ),
          ]
        ),
      ]),
    ]),
    _vm._v(" "),
    _c("div", { staticClass: "groups-header" }, [
      _c("div", { staticClass: "header-content" }, [
        _c("h1", { staticClass: "page-title" }, [_vm._v("Groups")]),
        _vm._v(" "),
        _c(
          "button",
          { staticClass: "add-group-btn", on: { click: _vm.addNewGroup } },
          [
            _c("i", { staticClass: "fas fa-plus" }),
            _vm._v("\n                Create New Group\n            "),
          ]
        ),
      ]),
    ]),
    _vm._v(" "),
    _c("div", { staticClass: "search-filter-section" }, [
      _c("div", { staticClass: "search-container" }, [
        _c("div", { staticClass: "search-bar" }, [
          _c("i", { staticClass: "fas fa-search search-icon" }),
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
            attrs: { type: "text", placeholder: "Search groups..." },
            domProps: { value: _vm.searchQuery },
            on: {
              input: function ($event) {
                if ($event.target.composing) {
                  return
                }
                _vm.searchQuery = $event.target.value
              },
            },
          }),
        ]),
        _vm._v(" "),
        _c("div", { staticClass: "filter-options" }, [
          _vm._m(1),
          _vm._v(" "),
          _c("div", { staticClass: "filter-dropdown" }, [
            _c(
              "select",
              {
                directives: [
                  {
                    name: "model",
                    rawName: "v-model",
                    value: _vm.selectedFilter,
                    expression: "selectedFilter",
                  },
                ],
                staticClass: "filter-select",
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
                    _vm.selectedFilter = $event.target.multiple
                      ? $$selectedVal
                      : $$selectedVal[0]
                  },
                },
              },
              [
                _c("option", { attrs: { value: "all" } }, [_vm._v("All")]),
                _vm._v(" "),
                _c("option", { attrs: { value: "my-groups" } }, [
                  _vm._v("My Groups"),
                ]),
              ]
            ),
            _vm._v(" "),
            _c("i", { staticClass: "fas fa-chevron-down dropdown-icon" }),
          ]),
        ]),
      ]),
    ]),
    _vm._v(" "),
    _vm.isLoading
      ? _c("div", { staticClass: "loading-container" }, [
          _c("p", [_vm._v("Loading groups...")]),
        ])
      : _vm.filteredGroups.length === 0
      ? _c("div", { staticClass: "no-groups-container" }, [
          _vm.searchQuery
            ? _c("p", [_vm._v("No groups found matching your search.")])
            : _c("p", [_vm._v("No groups found. Create your first group!")]),
        ])
      : _c(
          "div",
          { staticClass: "groups-grid" },
          _vm._l(_vm.filteredGroups, function (group) {
            return _c(
              "div",
              {
                key: group.id,
                staticClass: "group-card",
                on: {
                  click: function ($event) {
                    return _vm.openGroup(group)
                  },
                },
              },
              [
                _c("div", { staticClass: "group-image" }, [
                  _c("img", {
                    staticClass: "group-cover-image",
                    attrs: { src: _vm.getGroupImage(group), alt: group.name },
                  }),
                ]),
                _vm._v(" "),
                _c("div", { staticClass: "group-info" }, [
                  _c("h3", { staticClass: "group-name" }, [
                    _vm._v(_vm._s(group.name)),
                  ]),
                  _vm._v(" "),
                  group.description
                    ? _c("p", { staticClass: "group-description" }, [
                        _vm._v(_vm._s(group.description)),
                      ])
                    : _vm._e(),
                ]),
              ]
            )
          }),
          0
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
        _c("i", { staticClass: "fas fa-users" }),
        _vm._v(
          "\n                            Groups\n                        "
        ),
      ]
    )
  },
  function () {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "country-flags" }, [
      _c(
        "div",
        { staticClass: "flag-icon", attrs: { title: "United Kingdom" } },
        [
          _c("img", {
            staticClass: "flag-image",
            attrs: {
              src: "/images/vendor/flag-icon-css/flags/4x3/gb.svg",
              alt: "United Kingdom",
            },
          }),
        ]
      ),
      _vm._v(" "),
      _c("div", { staticClass: "flag-icon", attrs: { title: "Netherlands" } }, [
        _c("img", {
          staticClass: "flag-image",
          attrs: {
            src: "/images/vendor/flag-icon-css/flags/4x3/nl.svg",
            alt: "Netherlands",
          },
        }),
      ]),
      _vm._v(" "),
      _c("div", { staticClass: "flag-icon", attrs: { title: "Germany" } }, [
        _c("img", {
          staticClass: "flag-image",
          attrs: {
            src: "/images/vendor/flag-icon-css/flags/4x3/de.svg",
            alt: "Germany",
          },
        }),
      ]),
      _vm._v(" "),
      _c("div", { staticClass: "flag-icon", attrs: { title: "Spain" } }, [
        _c("img", {
          staticClass: "flag-image",
          attrs: {
            src: "/images/vendor/flag-icon-css/flags/4x3/es.svg",
            alt: "Spain",
          },
        }),
      ]),
      _vm._v(" "),
      _c("div", { staticClass: "flag-icon", attrs: { title: "France" } }, [
        _c("img", {
          staticClass: "flag-image",
          attrs: {
            src: "/images/vendor/flag-icon-css/flags/4x3/fr.svg",
            alt: "France",
          },
        }),
      ]),
      _vm._v(" "),
      _c("div", { staticClass: "flag-icon", attrs: { title: "Italy" } }, [
        _c("img", {
          staticClass: "flag-image",
          attrs: {
            src: "/images/vendor/flag-icon-css/flags/4x3/it.svg",
            alt: "Italy",
          },
        }),
      ]),
      _vm._v(" "),
      _c("div", { staticClass: "flag-icon", attrs: { title: "Portugal" } }, [
        _c("img", {
          staticClass: "flag-image",
          attrs: {
            src: "/images/vendor/flag-icon-css/flags/4x3/pt.svg",
            alt: "Portugal",
          },
        }),
      ]),
      _vm._v(" "),
      _c("div", { staticClass: "flag-icon", attrs: { title: "Turkey" } }, [
        _c("img", {
          staticClass: "flag-image",
          attrs: {
            src: "/images/vendor/flag-icon-css/flags/4x3/tr.svg",
            alt: "Turkey",
          },
        }),
      ]),
      _vm._v(" "),
      _c("div", { staticClass: "flag-icon", attrs: { title: "Greece" } }, [
        _c("img", {
          staticClass: "flag-image",
          attrs: {
            src: "/images/vendor/flag-icon-css/flags/4x3/gr.svg",
            alt: "Greece",
          },
        }),
      ]),
      _vm._v(" "),
      _c("div", { staticClass: "flag-icon", attrs: { title: "Poland" } }, [
        _c("img", {
          staticClass: "flag-image",
          attrs: {
            src: "/images/vendor/flag-icon-css/flags/4x3/pl.svg",
            alt: "Poland",
          },
        }),
      ]),
      _vm._v(" "),
      _c("div", { staticClass: "flag-icon", attrs: { title: "Sweden" } }, [
        _c("img", {
          staticClass: "flag-image",
          attrs: {
            src: "/images/vendor/flag-icon-css/flags/4x3/se.svg",
            alt: "Sweden",
          },
        }),
      ]),
      _vm._v(" "),
      _c("div", { staticClass: "flag-icon", attrs: { title: "Denmark" } }, [
        _c("img", {
          staticClass: "flag-image",
          attrs: {
            src: "/images/vendor/flag-icon-css/flags/4x3/dk.svg",
            alt: "Denmark",
          },
        }),
      ]),
    ])
  },
]
render._withStripped = true



/***/ })

}]);