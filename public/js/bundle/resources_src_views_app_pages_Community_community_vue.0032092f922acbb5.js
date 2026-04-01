"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["resources_src_views_app_pages_Community_community_vue"],{

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/Community/community.vue?vue&type=script&lang=js":
/*!*******************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/Community/community.vue?vue&type=script&lang=js ***!
  \*******************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! axios */ "./node_modules/axios/index.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_0__);
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
var _methods;
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


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  name: "Community",
  data: function data() {
    return {
      activeTab: 'start',
      newPost: '',
      newComments: {},
      commentImages: {},
      // Store comment images per post
      commentImagePreviews: {},
      // Store comment image previews per post
      selectedImage: null,
      imagePreview: null,
      selectedVideo: null,
      videoPreview: null,
      likingComments: new Set(),
      // Track comment likes in progress
      deletingComments: new Set(),
      // Track comment deletions in progress
      showCommentLimitMessage: {},
      // Track which posts are showing limit message
      loading: false,
      currentUser: null,
      posts: [],
      // Cover photo repositioning
      hasCoverPhoto: false,
      currentCoverPhotoUrl: null,
      isRepositioning: false,
      isDragOver: false,
      coverPosition: {
        x: 50,
        // Horizontal position (0-100%)
        y: 50,
        // Vertical position (0-100%)
        scale: 100 // Zoom level (100-200%)
      },
      originalCoverPosition: {
        x: 50,
        y: 50,
        scale: 100
      },
      // Loading states for interactions
      likingPosts: new Set(),
      commentingPosts: new Set(),
      deletingPosts: new Set(),
      // Poll modal
      showPollModal: false,
      pollData: {
        title: '',
        options: ['', '', '', '', '']
      },
      // Polls data
      polls: [],
      // Edit post modal
      showEditModal: false,
      editingPost: null,
      editPostContent: '',
      // Edit poll modal
      showEditPollModal: false,
      editingPoll: null,
      editPollData: {
        title: '',
        options: ['', '', '', '', '']
      },
      // Loading states for polls
      deletingPolls: new Set(),
      // Video Tutorial Modal
      showVideoTutorialModal: false,
      isVideoLoading: false,
      videoError: null,
      videoTutorialUrl: '/tutorial_videos/community.mp4',
      // Validation errors
      validationErrors: {},
      // Loading state for post creation
      creatingPost: false,
      // Community widgets
      widgets: [],
      loadingWidgets: false,
      deletingWidgets: new Set(),
      // Track widget deletions in progress
      // Widget edit modal
      showWidgetModal: false,
      editingWidget: null,
      widgetForm: {
        type: 'advertisement',
        title: '',
        content: '',
        image: null,
        imagePreview: null,
        link_url: '',
        link_text: '',
        is_active: true,
        order: 0,
        metadata: {}
      },
      widgetValidationErrors: {}
    };
  },
  mounted: function mounted() {
    var _this = this;
    return _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
      return _regeneratorRuntime().wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return _this.loadCurrentUser();
          case 2:
            _context.next = 4;
            return _this.loadPosts();
          case 4:
            _context.next = 6;
            return _this.loadPolls();
          case 6:
            _context.next = 8;
            return _this.loadGroupInfo();
          case 8:
            _context.next = 10;
            return _this.loadWidgets();
          case 10:
            // Add global drag event listeners for better compatibility
            document.addEventListener('dragover', _this.handleGlobalDragOver);
            document.addEventListener('drop', _this.handleGlobalDrop);
          case 12:
          case "end":
            return _context.stop();
        }
      }, _callee);
    }))();
  },
  beforeDestroy: function beforeDestroy() {
    // Remove global drag event listeners
    document.removeEventListener('dragover', this.handleGlobalDragOver);
    document.removeEventListener('drop', this.handleGlobalDrop);
  },
  methods: (_methods = {
    setActiveTab: function setActiveTab(tab) {
      this.activeTab = tab;
      // Update active nav tab
      document.querySelectorAll('.nav-tab').forEach(function (button) {
        button.classList.remove('active');
      });
      event.target.classList.add('active');

      // Handle tab content switching
      this.handleTabContent(tab);
    },
    handleTabContent: function handleTabContent(tab) {
      switch (tab) {
        case 'start':
          // Show the main community feed (default)
          break;
        case 'leaderboard':
          // Navigate to leaderboard page
          this.$router.push('/app/community/leaderboard');
          break;
        case 'challenges':
          this.showInfo('Challenges feature coming soon!');
          break;
        case 'groups':
          this.showInfo('Groups feature coming soon!');
          break;
        case 'members':
          this.showInfo('Members feature coming soon!');
          break;
        case 'contact':
          this.showInfo('Contact feature coming soon!');
          break;
        default:
          break;
      }
    },
    createPoll: function createPoll() {
      this.showPollModal = true;
    },
    editGroupInfo: function editGroupInfo() {
      // Navigate to edit group information page
      this.$router.push('/app/community/edit-group');
    },
    editCoverPhoto: function editCoverPhoto() {
      var _this2 = this;
      // Open file selection dialog for cover photo
      var input = document.createElement('input');
      input.type = 'file';
      input.accept = 'image/*';
      input.onchange = /*#__PURE__*/function () {
        var _ref = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee2(event) {
          var file, formData, response, errorMessage, errors, firstError, _error$response$data;
          return _regeneratorRuntime().wrap(function _callee2$(_context2) {
            while (1) switch (_context2.prev = _context2.next) {
              case 0:
                file = event.target.files && event.target.files[0];
                if (file) {
                  _context2.next = 3;
                  break;
                }
                return _context2.abrupt("return");
              case 3:
                if (!(file.size > 5 * 1024 * 1024)) {
                  _context2.next = 6;
                  break;
                }
                _this2.showError('File size must be less than 5MB');
                return _context2.abrupt("return");
              case 6:
                _context2.prev = 6;
                formData = new FormData();
                formData.append('cover_photo', file);
                _context2.next = 11;
                return axios__WEBPACK_IMPORTED_MODULE_0___default().post('community/cover-photo', formData, {
                  headers: {
                    'Content-Type': 'multipart/form-data'
                  }
                });
              case 11:
                response = _context2.sent;
                if (response.data.success) {
                  // Update the cover photo in the UI
                  _this2.updateCoverPhoto(response.data.data.image_url);
                  _this2.showSuccess('Cover photo updated successfully!');
                } else {
                  _this2.showError(response.data.message || 'Failed to update cover photo');
                }
                _context2.next = 20;
                break;
              case 15:
                _context2.prev = 15;
                _context2.t0 = _context2["catch"](6);
                errorMessage = 'Failed to update cover photo';
                if (_context2.t0.response) {
                  // Handle validation errors
                  if (_context2.t0.response.status === 422 && _context2.t0.response.data.errors) {
                    errors = _context2.t0.response.data.errors;
                    firstError = Object.values(errors)[0];
                    errorMessage = Array.isArray(firstError) ? firstError[0] : firstError;
                  } else {
                    errorMessage = ((_error$response$data = _context2.t0.response.data) === null || _error$response$data === void 0 ? void 0 : _error$response$data.message) || errorMessage;
                  }
                }
                _this2.showError(errorMessage);
              case 20:
              case "end":
                return _context2.stop();
            }
          }, _callee2, null, [[6, 15]]);
        }));
        return function (_x) {
          return _ref.apply(this, arguments);
        };
      }();
      input.click();
    },
    updateCoverPhoto: function updateCoverPhoto(imageUrl) {
      var _this3 = this;
      // Clean the URL - remove escaped slashes if present (from JSON)
      var cleanedUrl = imageUrl;
      if (cleanedUrl) {
        cleanedUrl = cleanedUrl.replace(/\\\//g, '/');
        cleanedUrl = cleanedUrl.replace(/['"]/g, '');
      }

      // Update the cover photo display
      this.currentCoverPhotoUrl = cleanedUrl;
      this.hasCoverPhoto = true;
      // Use nextTick to ensure DOM is updated
      this.$nextTick(function () {
        _this3.applyCoverPhotoStyles();
      });
    },
    applyCoverPhotoStyles: function applyCoverPhotoStyles() {
      try {
        var coverPhotoElement = this.$refs.coverPhoto;
        if (coverPhotoElement && this.currentCoverPhotoUrl) {
          // Clean the URL - remove escaped slashes if present (from JSON)
          var imageUrl = this.currentCoverPhotoUrl.replace(/\\\//g, '/');

          // Remove any existing quotes
          imageUrl = imageUrl.replace(/['"]/g, '');

          // Use double quotes in CSS URL to avoid issues with single quotes in URLs
          coverPhotoElement.style.backgroundImage = "url(\"".concat(imageUrl, "\")");
          coverPhotoElement.style.backgroundSize = "".concat(this.coverPosition.scale, "%");
          coverPhotoElement.style.backgroundPosition = "".concat(this.coverPosition.x, "% ").concat(this.coverPosition.y, "%");
          coverPhotoElement.style.backgroundRepeat = 'no-repeat';
          coverPhotoElement.style.color = 'transparent';
        }
      } catch (error) {
        // Error applying cover photo styles
      }
    },
    // Repositioning methods
    startRepositioning: function startRepositioning() {
      this.isRepositioning = true;
      this.originalCoverPosition = _objectSpread({}, this.coverPosition);
    },
    cancelReposition: function cancelReposition() {
      this.isRepositioning = false;
      this.coverPosition = _objectSpread({}, this.originalCoverPosition);
      this.applyCoverPhotoStyles();
    },
    updateCoverPosition: function updateCoverPosition() {
      this.applyCoverPhotoStyles();
    },
    resetCoverPosition: function resetCoverPosition() {
      this.coverPosition = {
        x: 50,
        y: 50,
        scale: 100
      };
      this.applyCoverPhotoStyles();
    },
    saveCoverPosition: function saveCoverPosition() {
      this.isRepositioning = false;
      this.originalCoverPosition = _objectSpread({}, this.coverPosition);

      // Save position to backend
      this.saveCoverPositionToBackend();
      this.showSuccess('Cover photo position saved!');
    },
    saveCoverPositionToBackend: function saveCoverPositionToBackend() {
      var _this4 = this;
      return _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee3() {
        return _regeneratorRuntime().wrap(function _callee3$(_context3) {
          while (1) switch (_context3.prev = _context3.next) {
            case 0:
              _context3.prev = 0;
              _context3.next = 3;
              return axios__WEBPACK_IMPORTED_MODULE_0___default().put('community/cover-position', {
                x: _this4.coverPosition.x,
                y: _this4.coverPosition.y,
                scale: _this4.coverPosition.scale
              });
            case 3:
              _context3.next = 7;
              break;
            case 5:
              _context3.prev = 5;
              _context3.t0 = _context3["catch"](0);
            case 7:
            case "end":
              return _context3.stop();
          }
        }, _callee3, null, [[0, 5]]);
      }))();
    },
    toggleRepositionMode: function toggleRepositionMode() {
      if (this.hasCoverPhoto && !this.isRepositioning) {
        this.startRepositioning();
      }
    },
    // Global drag event handlers
    handleGlobalDragOver: function handleGlobalDragOver(event) {
      event.preventDefault();
    },
    handleGlobalDrop: function handleGlobalDrop(event) {
      event.preventDefault();
    },
    // Drag and Drop methods
    handleDragOver: function handleDragOver(event) {
      event.preventDefault();
      event.stopPropagation();
      event.dataTransfer.dropEffect = 'copy';
    },
    handleDragEnter: function handleDragEnter(event) {
      event.preventDefault();
      event.stopPropagation();
      this.isDragOver = true;
    },
    handleDragLeave: function handleDragLeave(event) {
      event.preventDefault();
      event.stopPropagation();
      // Only hide drag overlay if we're actually leaving the drop zone
      if (!event.currentTarget.contains(event.relatedTarget)) {
        this.isDragOver = false;
      }
    },
    handleCoverPhotoDrop: function handleCoverPhotoDrop(event) {
      event.preventDefault();
      event.stopPropagation();
      this.isDragOver = false;
      var files = event.dataTransfer.files;
      if (files && files.length > 0) {
        var file = files[0];
        if (file.type.startsWith('image/')) {
          this.uploadCoverPhotoFile(file);
        } else {
          this.showError('Please select a valid image file');
        }
      }
    },
    uploadCoverPhotoFile: function uploadCoverPhotoFile(file) {
      var _this5 = this;
      return _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee4() {
        var formData, response, errorMessage, errors, firstError, _error$response$data2;
        return _regeneratorRuntime().wrap(function _callee4$(_context4) {
          while (1) switch (_context4.prev = _context4.next) {
            case 0:
              if (!(file.size > 5 * 1024 * 1024)) {
                _context4.next = 3;
                break;
              }
              _this5.showError('File size must be less than 5MB');
              return _context4.abrupt("return");
            case 3:
              _context4.prev = 3;
              formData = new FormData();
              formData.append('cover_photo', file);
              _context4.next = 8;
              return axios__WEBPACK_IMPORTED_MODULE_0___default().post('community/cover-photo', formData, {
                headers: {
                  'Content-Type': 'multipart/form-data'
                }
              });
            case 8:
              response = _context4.sent;
              if (response.data.success) {
                // Update the cover photo in the UI
                _this5.coverPosition = {
                  x: parseFloat(response.data.data.position_x),
                  y: parseFloat(response.data.data.position_y),
                  scale: parseFloat(response.data.data.scale)
                };
                _this5.originalCoverPosition = _objectSpread({}, _this5.coverPosition);
                _this5.updateCoverPhoto(response.data.data.image_url);
                _this5.showSuccess('Cover photo updated successfully!');
              } else {
                _this5.showError(response.data.message || 'Failed to update cover photo');
              }
              _context4.next = 17;
              break;
            case 12:
              _context4.prev = 12;
              _context4.t0 = _context4["catch"](3);
              errorMessage = 'Failed to update cover photo';
              if (_context4.t0.response) {
                // Handle validation errors
                if (_context4.t0.response.status === 422 && _context4.t0.response.data.errors) {
                  errors = _context4.t0.response.data.errors;
                  firstError = Object.values(errors)[0];
                  errorMessage = Array.isArray(firstError) ? firstError[0] : firstError;
                } else {
                  errorMessage = ((_error$response$data2 = _context4.t0.response.data) === null || _error$response$data2 === void 0 ? void 0 : _error$response$data2.message) || errorMessage;
                }
              }
              _this5.showError(errorMessage);
            case 17:
            case "end":
              return _context4.stop();
          }
        }, _callee4, null, [[3, 12]]);
      }))();
    },
    toggleComments: function toggleComments(postId) {
      var post = this.posts.find(function (p) {
        return p.id === postId;
      });
      if (post) {
        post.showComments = !post.showComments;
      }
    },
    showInfo: function showInfo(message) {
      this.$swal({
        icon: "info",
        title: "Information",
        text: message,
        timer: 3000,
        showConfirmButton: false
      });
    },
    loadCurrentUser: function loadCurrentUser() {
      var _this6 = this;
      return _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee5() {
        var response;
        return _regeneratorRuntime().wrap(function _callee5$(_context5) {
          while (1) switch (_context5.prev = _context5.next) {
            case 0:
              _context5.prev = 0;
              _context5.next = 3;
              return axios__WEBPACK_IMPORTED_MODULE_0___default().get('user');
            case 3:
              response = _context5.sent;
              _this6.currentUser = response.data;
              _context5.next = 9;
              break;
            case 7:
              _context5.prev = 7;
              _context5.t0 = _context5["catch"](0);
            case 9:
            case "end":
              return _context5.stop();
          }
        }, _callee5, null, [[0, 7]]);
      }))();
    },
    loadGroupInfo: function loadGroupInfo() {
      var _this7 = this;
      return _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee6() {
        var response, coverPhoto;
        return _regeneratorRuntime().wrap(function _callee6$(_context6) {
          while (1) switch (_context6.prev = _context6.next) {
            case 0:
              _context6.prev = 0;
              _context6.next = 3;
              return axios__WEBPACK_IMPORTED_MODULE_0___default().get('community/group-info');
            case 3:
              response = _context6.sent;
              if (response.data.success && response.data.data.cover_photo) {
                coverPhoto = response.data.data.cover_photo;
                if (coverPhoto.image_url) {
                  _this7.currentCoverPhotoUrl = coverPhoto.image_url;
                  _this7.hasCoverPhoto = true;
                  _this7.coverPosition = {
                    x: parseFloat(coverPhoto.position_x) || 50,
                    y: parseFloat(coverPhoto.position_y) || 50,
                    scale: parseFloat(coverPhoto.scale) || 100
                  };
                  _this7.originalCoverPosition = _objectSpread({}, _this7.coverPosition);
                  // Use nextTick to ensure DOM is updated
                  _this7.$nextTick(function () {
                    _this7.applyCoverPhotoStyles();
                  });
                }
              }
              _context6.next = 9;
              break;
            case 7:
              _context6.prev = 7;
              _context6.t0 = _context6["catch"](0);
            case 9:
            case "end":
              return _context6.stop();
          }
        }, _callee6, null, [[0, 7]]);
      }))();
    },
    loadPosts: function loadPosts() {
      var _this8 = this;
      return _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee7() {
        var response;
        return _regeneratorRuntime().wrap(function _callee7$(_context7) {
          while (1) switch (_context7.prev = _context7.next) {
            case 0:
              _this8.loading = true;
              _context7.prev = 1;
              _context7.next = 4;
              return axios__WEBPACK_IMPORTED_MODULE_0___default().get('posts');
            case 4:
              response = _context7.sent;
              _this8.posts = response.data.data.data.map(function (post) {
                var _post$user;
                return _objectSpread(_objectSpread({}, post), {}, {
                  user_id: post.user_id || ((_post$user = post.user) === null || _post$user === void 0 ? void 0 : _post$user.id),
                  // Preserve user_id for ownership check
                  author: post.user ? post.user.firstname + ' ' + post.user.lastname : 'Unknown User',
                  isStaff: post.user ? post.user.role_id === 1 : false,
                  // Assuming role_id 1 is staff
                  liked: post.is_liked,
                  likes: post.likes_count,
                  image_url: post.image_url,
                  // Ensure image_url is properly mapped
                  video_url: post.video_url,
                  // Ensure video_url is properly mapped
                  comments: (post.comments || []).map(function (comment) {
                    var _comment$user;
                    return _objectSpread(_objectSpread({}, comment), {}, {
                      user_id: comment.user_id || ((_comment$user = comment.user) === null || _comment$user === void 0 ? void 0 : _comment$user.id),
                      // Preserve user_id for ownership check
                      author: comment.user ? comment.user.firstname + ' ' + comment.user.lastname : 'Unknown User',
                      text: comment.content,
                      timeAgo: comment.time_ago,
                      image_url: comment.image_url,
                      likes_count: comment.likes_count || 0,
                      is_liked: comment.is_liked || false
                    });
                  }),
                  showComments: false
                });
              });
              _context7.next = 11;
              break;
            case 8:
              _context7.prev = 8;
              _context7.t0 = _context7["catch"](1);
              _this8.showError('Failed to load posts');
            case 11:
              _context7.prev = 11;
              _this8.loading = false;
              return _context7.finish(11);
            case 14:
            case "end":
              return _context7.stop();
          }
        }, _callee7, null, [[1, 8, 11, 14]]);
      }))();
    },
    loadPolls: function loadPolls() {
      var _this9 = this;
      return _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee8() {
        var response;
        return _regeneratorRuntime().wrap(function _callee8$(_context8) {
          while (1) switch (_context8.prev = _context8.next) {
            case 0:
              _context8.prev = 0;
              _context8.next = 3;
              return axios__WEBPACK_IMPORTED_MODULE_0___default().get('polls');
            case 3:
              response = _context8.sent;
              _this9.polls = response.data.data.data.map(function (poll) {
                var _poll$user, _poll$user_vote;
                return _objectSpread(_objectSpread({}, poll), {}, {
                  user_id: poll.user_id || ((_poll$user = poll.user) === null || _poll$user === void 0 ? void 0 : _poll$user.id),
                  // Preserve user_id for ownership check
                  author: poll.user ? poll.user.firstname + ' ' + poll.user.lastname : 'Unknown User',
                  isStaff: poll.user ? poll.user.role_id === 1 : false,
                  // Assuming role_id 1 is staff
                  hasVoted: poll.has_voted || false,
                  votedOptionId: poll.voted_option_id || ((_poll$user_vote = poll.user_vote) === null || _poll$user_vote === void 0 ? void 0 : _poll$user_vote.option_id) || null,
                  // Track which option was voted on
                  totalVotes: poll.total_votes || 0,
                  options: poll.options.map(function (option) {
                    return _objectSpread(_objectSpread({}, option), {}, {
                      percentage: option.vote_percentage || 0
                    });
                  })
                });
              });
              _context8.next = 10;
              break;
            case 7:
              _context8.prev = 7;
              _context8.t0 = _context8["catch"](0);
              _this9.showError('Failed to load polls');
            case 10:
            case "end":
              return _context8.stop();
          }
        }, _callee8, null, [[0, 7]]);
      }))();
    },
    voteOnPoll: function voteOnPoll(pollId, optionId) {
      var _this10 = this;
      return _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee9() {
        var response, poll, _error$response, errorMessage;
        return _regeneratorRuntime().wrap(function _callee9$(_context9) {
          while (1) switch (_context9.prev = _context9.next) {
            case 0:
              _context9.prev = 0;
              _context9.next = 3;
              return axios__WEBPACK_IMPORTED_MODULE_0___default().post("polls/".concat(pollId, "/vote"), {
                option_id: optionId
              });
            case 3:
              response = _context9.sent;
              if (!response.data.success) {
                _context9.next = 12;
                break;
              }
              // Update the poll immediately with the voted option ID
              poll = _this10.polls.find(function (p) {
                return p.id === pollId;
              });
              if (poll) {
                poll.hasVoted = true;
                poll.votedOptionId = optionId;
              }
              _this10.showSuccess('Vote recorded successfully!');
              // Reload polls to show updated results
              _context9.next = 10;
              return _this10.loadPolls();
            case 10:
              _context9.next = 13;
              break;
            case 12:
              _this10.showError(response.data.message || 'Failed to record vote');
            case 13:
              _context9.next = 19;
              break;
            case 15:
              _context9.prev = 15;
              _context9.t0 = _context9["catch"](0);
              errorMessage = ((_error$response = _context9.t0.response) === null || _error$response === void 0 || (_error$response = _error$response.data) === null || _error$response === void 0 ? void 0 : _error$response.message) || 'Failed to record vote';
              _this10.showError(errorMessage);
            case 19:
            case "end":
              return _context9.stop();
          }
        }, _callee9, null, [[0, 15]]);
      }))();
    },
    createPost: function createPost() {
      var _this11 = this;
      return _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee10() {
        var maxImageSize, allowedImageTypes, maxVideoSize, allowedVideoTypes, formData, _newPost$user, response, newPost, imageUrl, videoUrl, errorData, errorMessages, _error$response$data3, _error$response2, errorMessage;
        return _regeneratorRuntime().wrap(function _callee10$(_context10) {
          while (1) switch (_context10.prev = _context10.next) {
            case 0:
              // Client-side validation
              _this11.validationErrors = {};

              // Check if at least one field is provided
              if (!(!_this11.newPost.trim() && !_this11.selectedImage && !_this11.selectedVideo)) {
                _context10.next = 5;
                break;
              }
              _this11.validationErrors.content = 'Either content, image, or video must be provided.';
              _this11.showError('Please provide content, an image, or a video.');
              return _context10.abrupt("return");
            case 5:
              if (!(_this11.newPost.trim() && _this11.newPost.length > 5000)) {
                _context10.next = 9;
                break;
              }
              _this11.validationErrors.content = 'Post content cannot exceed 5000 characters.';
              _this11.showError('Post content cannot exceed 5000 characters.');
              return _context10.abrupt("return");
            case 9:
              if (!_this11.selectedImage) {
                _context10.next = 20;
                break;
              }
              maxImageSize = 50 * 1024 * 1024; // 50MB
              allowedImageTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/gif', 'image/webp'];
              if (!(_this11.selectedImage.size > maxImageSize)) {
                _context10.next = 16;
                break;
              }
              _this11.validationErrors.image = 'Image size cannot exceed 50MB.';
              _this11.showError('Image size cannot exceed 50MB. Please choose a smaller image.');
              return _context10.abrupt("return");
            case 16:
              if (allowedImageTypes.includes(_this11.selectedImage.type)) {
                _context10.next = 20;
                break;
              }
              _this11.validationErrors.image = 'Image must be one of the following types: jpeg, png, jpg, gif, or webp.';
              _this11.showError('Invalid image format. Please choose a jpeg, png, jpg, gif, or webp file.');
              return _context10.abrupt("return");
            case 20:
              if (!_this11.selectedVideo) {
                _context10.next = 31;
                break;
              }
              maxVideoSize = 50 * 1024 * 1024; // 50MB
              allowedVideoTypes = ['video/mp4', 'video/quicktime', 'video/x-msvideo', 'video/webm'];
              if (!(_this11.selectedVideo.size > maxVideoSize)) {
                _context10.next = 27;
                break;
              }
              _this11.validationErrors.video = 'Video size cannot exceed 50MB.';
              _this11.showError('Video size cannot exceed 50MB. Please choose a smaller video file.');
              return _context10.abrupt("return");
            case 27:
              if (allowedVideoTypes.includes(_this11.selectedVideo.type)) {
                _context10.next = 31;
                break;
              }
              _this11.validationErrors.video = 'Video must be one of the following types: mp4, mov, avi, or webm.';
              _this11.showError('Invalid video format. Please choose a mp4, mov, avi, or webm file.');
              return _context10.abrupt("return");
            case 31:
              if (!_this11.creatingPost) {
                _context10.next = 33;
                break;
              }
              return _context10.abrupt("return");
            case 33:
              _this11.creatingPost = true;
              _this11.validationErrors = {};
              formData = new FormData(); // Only append content if it's not empty
              if (_this11.newPost.trim()) {
                formData.append('content', _this11.newPost);
              }
              if (_this11.selectedImage) {
                formData.append('image', _this11.selectedImage);
              }
              if (_this11.selectedVideo) {
                formData.append('video', _this11.selectedVideo);
              }
              _context10.prev = 39;
              _context10.next = 42;
              return axios__WEBPACK_IMPORTED_MODULE_0___default().post('posts', formData, {
                headers: {
                  'Content-Type': 'multipart/form-data'
                }
              });
            case 42:
              response = _context10.sent;
              newPost = response.data.data; // Ensure image_url and video_url are properly set
              // If backend doesn't return them, construct from paths
              imageUrl = newPost.image_url || (newPost.image_path ? "".concat(window.location.origin, "/images/community-uploads/posts/").concat(newPost.image_path) : null);
              videoUrl = newPost.video_url || (newPost.video_path ? "".concat(window.location.origin, "/images/community-uploads/posts/").concat(newPost.video_path) : null);
              _this11.posts.unshift(_objectSpread(_objectSpread({}, newPost), {}, {
                user_id: newPost.user_id || ((_newPost$user = newPost.user) === null || _newPost$user === void 0 ? void 0 : _newPost$user.id),
                // Preserve user_id for ownership check
                author: newPost.user ? newPost.user.firstname + ' ' + newPost.user.lastname : 'Unknown User',
                isStaff: newPost.user ? newPost.user.role_id === 1 : false,
                liked: false,
                likes: 0,
                image_url: imageUrl,
                // Use computed URL
                video_url: videoUrl,
                // Use computed URL
                comments: [],
                showComments: false,
                timeAgo: 'Just now'
              }));
              _this11.newPost = '';
              _this11.removeImage();
              _this11.removeVideo();
              _this11.validationErrors = {};
              _this11.showSuccess('Post created successfully!');
              _context10.next = 57;
              break;
            case 54:
              _context10.prev = 54;
              _context10.t0 = _context10["catch"](39);
              // Handle validation errors from backend
              if (_context10.t0.response && _context10.t0.response.status === 422) {
                errorData = _context10.t0.response.data;
                _this11.validationErrors = errorData.error_details || {};

                // Show all validation errors
                errorMessages = errorData.errors || [errorData.message];
                if (errorMessages.length > 0) {
                  _this11.showError(errorMessages.join('\n'));
                } else {
                  _this11.showError(errorData.message || 'Validation failed. Please check your input.');
                }
              } else if (_context10.t0.response && _context10.t0.response.status === 401) {
                _this11.showError('You are not authorized. Please log in again.');
              } else if (_context10.t0.response && _context10.t0.response.status === 500) {
                _this11.showError(((_error$response$data3 = _context10.t0.response.data) === null || _error$response$data3 === void 0 ? void 0 : _error$response$data3.message) || 'Server error. Please try again later.');
              } else if (_context10.t0.message === 'Network Error' || !_context10.t0.response) {
                _this11.showError('Network error. Please check your connection and try again.');
              } else {
                errorMessage = ((_error$response2 = _context10.t0.response) === null || _error$response2 === void 0 || (_error$response2 = _error$response2.data) === null || _error$response2 === void 0 ? void 0 : _error$response2.message) || 'Failed to create post. Please try again.';
                _this11.showError(errorMessage);
              }
            case 57:
              _context10.prev = 57;
              _this11.creatingPost = false;
              return _context10.finish(57);
            case 60:
            case "end":
              return _context10.stop();
          }
        }, _callee10, null, [[39, 54, 57, 60]]);
      }))();
    },
    handleImageSelect: function handleImageSelect(event) {
      var _this12 = this;
      var file = event.target.files[0];
      if (file) {
        // Clear previous validation errors
        this.validationErrors.image = null;

        // Validate file size (50MB max)
        var maxSize = 50 * 1024 * 1024; // 50MB in bytes
        if (file.size > maxSize) {
          this.validationErrors.image = 'Image size cannot exceed 50MB.';
          this.showError('Image size cannot exceed 50MB. Please choose a smaller image.');
          if (this.$refs.imageInput) {
            this.$refs.imageInput.value = '';
          }
          return;
        }

        // Validate file type
        var allowedTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/gif', 'image/webp'];
        if (!allowedTypes.includes(file.type)) {
          this.validationErrors.image = 'Image must be one of the following types: jpeg, png, jpg, gif, or webp.';
          this.showError('Invalid image format. Please choose a jpeg, png, jpg, gif, or webp file.');
          if (this.$refs.imageInput) {
            this.$refs.imageInput.value = '';
          }
          return;
        }
        this.selectedImage = file;
        var reader = new FileReader();
        reader.onload = function (e) {
          _this12.imagePreview = e.target.result;
        };
        reader.readAsDataURL(file);
      }
    },
    removeImage: function removeImage() {
      this.selectedImage = null;
      this.imagePreview = null;
      this.validationErrors.image = null;
      if (this.$refs.imageInput) {
        this.$refs.imageInput.value = '';
      }
    },
    handleVideoSelect: function handleVideoSelect(event) {
      var _this13 = this;
      var file = event.target.files[0];
      if (file) {
        // Clear previous validation errors
        this.validationErrors.video = null;

        // Validate file size (50MB max)
        var maxSize = 50 * 1024 * 1024; // 50MB in bytes
        if (file.size > maxSize) {
          this.validationErrors.video = 'Video size cannot exceed 50MB.';
          this.showError('Video size cannot exceed 50MB. Please choose a smaller video file.');
          if (this.$refs.videoInput) {
            this.$refs.videoInput.value = '';
          }
          return;
        }

        // Validate file type
        var allowedTypes = ['video/mp4', 'video/quicktime', 'video/x-msvideo', 'video/webm'];
        if (!allowedTypes.includes(file.type)) {
          this.validationErrors.video = 'Video must be one of the following types: mp4, mov, avi, or webm.';
          this.showError('Invalid video format. Please choose a mp4, mov, avi, or webm file.');
          if (this.$refs.videoInput) {
            this.$refs.videoInput.value = '';
          }
          return;
        }
        this.selectedVideo = file;
        var reader = new FileReader();
        reader.onload = function (e) {
          _this13.videoPreview = e.target.result;
        };
        reader.readAsDataURL(file);
      }
    },
    removeVideo: function removeVideo() {
      this.selectedVideo = null;
      this.videoPreview = null;
      this.validationErrors.video = null;
      if (this.$refs.videoInput) {
        this.$refs.videoInput.value = '';
      }
    },
    expandTextarea: function expandTextarea() {
      var _this14 = this;
      this.$nextTick(function () {
        var textarea = _this14.$refs.postTextarea;
        if (textarea) {
          textarea.classList.add('expanded');
          _this14.autoResizeTextarea();
        }
      });
    },
    autoResizeTextarea: function autoResizeTextarea() {
      var _this15 = this;
      this.$nextTick(function () {
        var textarea = _this15.$refs.postTextarea;
        if (textarea) {
          // Reset height to auto to get the correct scrollHeight
          textarea.style.height = 'auto';
          // Set height based on content, with min and max constraints
          var newHeight = Math.min(Math.max(textarea.scrollHeight, 60), 300);
          textarea.style.height = newHeight + 'px';
        }
      });
    },
    toggleLike: function toggleLike(postId) {
      var _this16 = this;
      return _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee11() {
        var post, wasLiked, oldLikesCount, response, _error$response3, errorMessage;
        return _regeneratorRuntime().wrap(function _callee11$(_context11) {
          while (1) switch (_context11.prev = _context11.next) {
            case 0:
              post = _this16.posts.find(function (p) {
                return p.id === postId;
              });
              if (!(!post || _this16.likingPosts.has(postId))) {
                _context11.next = 3;
                break;
              }
              return _context11.abrupt("return");
            case 3:
              // Add to loading set
              _this16.likingPosts.add(postId);

              // Optimistic update for better UX
              wasLiked = post.liked;
              oldLikesCount = post.likes;
              post.liked = !post.liked;
              post.likes = post.liked ? post.likes + 1 : post.likes - 1;
              _context11.prev = 8;
              _context11.next = 11;
              return axios__WEBPACK_IMPORTED_MODULE_0___default().post("posts/".concat(postId, "/like"));
            case 11:
              response = _context11.sent;
              // Update with actual server response
              post.liked = response.data.liked;
              post.likes = response.data.likes_count;
              _context11.next = 22;
              break;
            case 16:
              _context11.prev = 16;
              _context11.t0 = _context11["catch"](8);
              // Revert optimistic update on error
              post.liked = wasLiked;
              post.likes = oldLikesCount;
              errorMessage = ((_error$response3 = _context11.t0.response) === null || _error$response3 === void 0 || (_error$response3 = _error$response3.data) === null || _error$response3 === void 0 ? void 0 : _error$response3.message) || 'Failed to update like';
              _this16.showError(errorMessage);
            case 22:
              _context11.prev = 22;
              // Remove from loading set
              _this16.likingPosts["delete"](postId);
              return _context11.finish(22);
            case 25:
            case "end":
              return _context11.stop();
          }
        }, _callee11, null, [[8, 16, 22, 25]]);
      }))();
    }
  }, _defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_methods, "toggleComments", function toggleComments(postId) {
    var post = this.posts.find(function (p) {
      return p.id === postId;
    });
    if (post) {
      post.showComments = !post.showComments;
    }
  }), "addComment", function addComment(postId) {
    var _this17 = this;
    return _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee12() {
      var post, commentText, commentImage, _newComment$user, formData, response, newComment, _error$response4, errorMessage;
      return _regeneratorRuntime().wrap(function _callee12$(_context12) {
        while (1) switch (_context12.prev = _context12.next) {
          case 0:
            post = _this17.posts.find(function (p) {
              return p.id === postId;
            });
            commentText = _this17.newComments[postId] || '';
            commentImage = _this17.commentImages[postId]; // Check if at least content or image is provided
            if (!(!commentText.trim() && !commentImage)) {
              _context12.next = 5;
              break;
            }
            return _context12.abrupt("return");
          case 5:
            if (_this17.canCommentOnPost(postId)) {
              _context12.next = 8;
              break;
            }
            // Show limit message for 3 seconds
            _this17.showCommentLimitMessageForPost(postId);
            return _context12.abrupt("return");
          case 8:
            if (!_this17.commentingPosts.has(postId)) {
              _context12.next = 10;
              break;
            }
            return _context12.abrupt("return");
          case 10:
            _this17.commentingPosts.add(postId);
            _context12.prev = 11;
            formData = new FormData();
            if (commentText.trim()) {
              formData.append('content', commentText);
            }
            if (commentImage) {
              formData.append('image', commentImage);
            }
            _context12.next = 17;
            return axios__WEBPACK_IMPORTED_MODULE_0___default().post("posts/".concat(postId, "/comment"), formData, {
              headers: {
                'Content-Type': 'multipart/form-data'
              }
            });
          case 17:
            response = _context12.sent;
            newComment = response.data.data;
            post.comments.push(_objectSpread(_objectSpread({}, newComment), {}, {
              user_id: newComment.user_id || ((_newComment$user = newComment.user) === null || _newComment$user === void 0 ? void 0 : _newComment$user.id),
              // Preserve user_id for ownership check
              author: newComment.user ? newComment.user.firstname + ' ' + newComment.user.lastname : 'Unknown User',
              text: newComment.content,
              timeAgo: newComment.time_ago,
              image_url: newComment.image_url,
              likes_count: newComment.likes_count || 0,
              is_liked: newComment.is_liked || false
            }));

            // Update comment count
            post.comments_count = post.comments.length;
            _this17.newComments[postId] = '';
            _this17.removeCommentImage(postId);
            _context12.next = 29;
            break;
          case 25:
            _context12.prev = 25;
            _context12.t0 = _context12["catch"](11);
            errorMessage = ((_error$response4 = _context12.t0.response) === null || _error$response4 === void 0 || (_error$response4 = _error$response4.data) === null || _error$response4 === void 0 ? void 0 : _error$response4.message) || 'Failed to add comment';
            _this17.showError(errorMessage);
          case 29:
            _context12.prev = 29;
            _this17.commentingPosts["delete"](postId);
            return _context12.finish(29);
          case 32:
          case "end":
            return _context12.stop();
        }
      }, _callee12, null, [[11, 25, 29, 32]]);
    }))();
  }), "canCommentOnPost", function canCommentOnPost(postId) {
    if (!this.currentUser) return false;
    var post = this.posts.find(function (p) {
      return p.id === postId;
    });
    if (!post) return false;
    var userId = this.currentUser.id;
    var userCommentCount = post.comments.filter(function (c) {
      return String(c.user_id) === String(userId) || c.user && String(c.user.id) === String(userId);
    }).length;
    return userCommentCount < 3;
  }), "showCommentLimitMessageForPost", function showCommentLimitMessageForPost(postId) {
    var _this18 = this;
    // Show the message
    this.$set(this.showCommentLimitMessage, postId, true);

    // Hide after 3 seconds
    setTimeout(function () {
      _this18.$delete(_this18.showCommentLimitMessage, postId);
    }, 3000);
  }), "handleCommentImageSelect", function handleCommentImageSelect(postId, event) {
    var _this19 = this;
    var file = event.target.files[0];
    if (file) {
      // Validate file size (5MB max)
      if (file.size > 5 * 1024 * 1024) {
        this.showError('Image size cannot exceed 5MB');
        return;
      }

      // Validate file type
      var allowedTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/gif', 'image/webp'];
      if (!allowedTypes.includes(file.type)) {
        this.showError('Invalid image format. Please choose a jpeg, png, jpg, gif, or webp file.');
        return;
      }
      this.$set(this.commentImages, postId, file);

      // Create preview
      var reader = new FileReader();
      reader.onload = function (e) {
        _this19.$set(_this19.commentImagePreviews, postId, e.target.result);
      };
      reader.readAsDataURL(file);
    }
  }), "removeCommentImage", function removeCommentImage(postId) {
    this.$delete(this.commentImages, postId);
    this.$delete(this.commentImagePreviews, postId);
    // Reset file input
    var input = this.$refs["commentImageInput_".concat(postId)];
    if (input && input[0]) {
      input[0].value = '';
    }
  }), "toggleCommentLike", function toggleCommentLike(commentId, postId) {
    var _this20 = this;
    return _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee13() {
      var post, comment, wasLiked, oldLikesCount, response, _error$response5, errorMessage;
      return _regeneratorRuntime().wrap(function _callee13$(_context13) {
        while (1) switch (_context13.prev = _context13.next) {
          case 0:
            post = _this20.posts.find(function (p) {
              return p.id === postId;
            });
            if (post) {
              _context13.next = 3;
              break;
            }
            return _context13.abrupt("return");
          case 3:
            comment = post.comments.find(function (c) {
              return c.id === commentId;
            });
            if (!(!comment || _this20.likingComments.has(commentId))) {
              _context13.next = 6;
              break;
            }
            return _context13.abrupt("return");
          case 6:
            // Add to loading set
            _this20.likingComments.add(commentId);

            // Optimistic update
            wasLiked = comment.is_liked;
            oldLikesCount = comment.likes_count || 0;
            comment.is_liked = !comment.is_liked;
            comment.likes_count = comment.is_liked ? oldLikesCount + 1 : oldLikesCount - 1;
            _context13.prev = 11;
            _context13.next = 14;
            return axios__WEBPACK_IMPORTED_MODULE_0___default().post("posts/comments/".concat(commentId, "/like"));
          case 14:
            response = _context13.sent;
            // Update with actual server response
            comment.is_liked = response.data.liked;
            comment.likes_count = response.data.likes_count;
            _context13.next = 25;
            break;
          case 19:
            _context13.prev = 19;
            _context13.t0 = _context13["catch"](11);
            // Revert optimistic update on error
            comment.is_liked = wasLiked;
            comment.likes_count = oldLikesCount;
            errorMessage = ((_error$response5 = _context13.t0.response) === null || _error$response5 === void 0 || (_error$response5 = _error$response5.data) === null || _error$response5 === void 0 ? void 0 : _error$response5.message) || 'Failed to update like';
            _this20.showError(errorMessage);
          case 25:
            _context13.prev = 25;
            // Remove from loading set
            _this20.likingComments["delete"](commentId);
            return _context13.finish(25);
          case 28:
          case "end":
            return _context13.stop();
        }
      }, _callee13, null, [[11, 19, 25, 28]]);
    }))();
  }), "canDeleteComment", function canDeleteComment(comment, post) {
    if (!this.currentUser) return false;
    var userId = this.currentUser.id;
    var isAdmin = this.currentUser.role_id === 1;

    // User can delete if they own the comment or are admin
    var commentUserId = comment.user_id || comment.user && comment.user.id;
    return String(commentUserId) === String(userId) || isAdmin;
  }), "deleteComment", function deleteComment(commentId, postId) {
    var _this21 = this;
    return _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee14() {
      var post, comment, result, response, commentIndex, _response$data, errorMessage, _error$response$data4;
      return _regeneratorRuntime().wrap(function _callee14$(_context14) {
        while (1) switch (_context14.prev = _context14.next) {
          case 0:
            post = _this21.posts.find(function (p) {
              return p.id === postId;
            });
            if (post) {
              _context14.next = 3;
              break;
            }
            return _context14.abrupt("return");
          case 3:
            comment = post.comments.find(function (c) {
              return c.id === commentId;
            });
            if (!(!comment || _this21.deletingComments.has(commentId))) {
              _context14.next = 6;
              break;
            }
            return _context14.abrupt("return");
          case 6:
            _context14.prev = 6;
            _context14.next = 9;
            return _this21.$swal({
              title: 'Are you sure?',
              text: 'You won\'t be able to revert this!',
              icon: 'warning',
              showCancelButton: true,
              confirmButtonColor: '#d33',
              cancelButtonColor: '#3085d6',
              confirmButtonText: 'Yes, delete it!',
              cancelButtonText: 'Cancel'
            });
          case 9:
            result = _context14.sent;
            if (result.isConfirmed) {
              _context14.next = 12;
              break;
            }
            return _context14.abrupt("return");
          case 12:
            // Add to deleting set
            _this21.deletingComments.add(commentId);
            _context14.prev = 13;
            _context14.next = 16;
            return axios__WEBPACK_IMPORTED_MODULE_0___default()["delete"]("posts/comments/".concat(commentId));
          case 16:
            response = _context14.sent;
            if (response.data && response.data.success) {
              // Remove the comment from the list
              commentIndex = post.comments.findIndex(function (c) {
                return c.id === commentId;
              });
              if (commentIndex !== -1) {
                post.comments.splice(commentIndex, 1);
              }

              // Update comment count
              post.comments_count = post.comments.length;
              _this21.showSuccess('Comment deleted successfully!');
            } else {
              _this21.showError(((_response$data = response.data) === null || _response$data === void 0 ? void 0 : _response$data.message) || 'Failed to delete comment');
            }
            _context14.next = 25;
            break;
          case 20:
            _context14.prev = 20;
            _context14.t0 = _context14["catch"](13);
            errorMessage = 'Failed to delete comment';
            if (_context14.t0.response) {
              if (_context14.t0.response.status === 403) {
                errorMessage = 'You are not authorized to delete this comment';
              } else if (_context14.t0.response.status === 404) {
                errorMessage = 'Comment not found';
              } else {
                errorMessage = ((_error$response$data4 = _context14.t0.response.data) === null || _error$response$data4 === void 0 ? void 0 : _error$response$data4.message) || errorMessage;
              }
            }
            _this21.showError(errorMessage);
          case 25:
            _context14.prev = 25;
            // Remove from deleting set
            _this21.deletingComments["delete"](commentId);
            return _context14.finish(25);
          case 28:
            _context14.next = 33;
            break;
          case 30:
            _context14.prev = 30;
            _context14.t1 = _context14["catch"](6);
            // User cancelled the confirmation dialog
            // Make sure to remove from deleting set even if cancelled
            _this21.deletingComments["delete"](commentId);
          case 33:
          case "end":
            return _context14.stop();
        }
      }, _callee14, null, [[6, 30], [13, 20, 25, 28]]);
    }))();
  }), "pinPost", function pinPost(postId) {
    var _this22 = this;
    return _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee15() {
      var response;
      return _regeneratorRuntime().wrap(function _callee15$(_context15) {
        while (1) switch (_context15.prev = _context15.next) {
          case 0:
            _context15.prev = 0;
            _context15.next = 3;
            return axios__WEBPACK_IMPORTED_MODULE_0___default().post("posts/".concat(postId, "/pin"));
          case 3:
            response = _context15.sent;
            _this22.showSuccess(response.data.message);
            _context15.next = 7;
            return _this22.loadPosts();
          case 7:
            _context15.next = 12;
            break;
          case 9:
            _context15.prev = 9;
            _context15.t0 = _context15["catch"](0);
            _this22.showError('Failed to pin post');
          case 12:
          case "end":
            return _context15.stop();
        }
      }, _callee15, null, [[0, 9]]);
    }))();
  }), _defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_methods, "editPost", function editPost(postId) {
    var post = this.posts.find(function (p) {
      return p.id === postId;
    });
    if (post) {
      this.editingPost = post;
      this.editPostContent = post.content;
      this.showEditModal = true;
    }
  }), "saveEditPost", function saveEditPost() {
    var _this23 = this;
    return _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee16() {
      var formData, response, post, errorData, errorMessages, _error$response$data5, _error$response6, errorMessage;
      return _regeneratorRuntime().wrap(function _callee16$(_context16) {
        while (1) switch (_context16.prev = _context16.next) {
          case 0:
            if (_this23.editPostContent.trim()) {
              _context16.next = 3;
              break;
            }
            _this23.showError('Post content cannot be empty');
            return _context16.abrupt("return");
          case 3:
            if (!(_this23.editPostContent.length > 5000)) {
              _context16.next = 6;
              break;
            }
            _this23.showError('Post content cannot exceed 5000 characters.');
            return _context16.abrupt("return");
          case 6:
            if (_this23.editingPost) {
              _context16.next = 8;
              break;
            }
            return _context16.abrupt("return");
          case 8:
            _context16.prev = 8;
            formData = new FormData();
            formData.append('content', _this23.editPostContent);
            _context16.next = 13;
            return axios__WEBPACK_IMPORTED_MODULE_0___default().put("posts/".concat(_this23.editingPost.id), formData, {
              headers: {
                'Content-Type': 'multipart/form-data'
              }
            });
          case 13:
            response = _context16.sent;
            // Update the post in the list
            post = _this23.posts.find(function (p) {
              return p.id === _this23.editingPost.id;
            });
            if (post) {
              post.content = _this23.editPostContent;
            }
            _this23.showSuccess('Post updated successfully!');
            _this23.closeEditModal();
            _context16.next = 23;
            break;
          case 20:
            _context16.prev = 20;
            _context16.t0 = _context16["catch"](8);
            // Handle validation errors from backend
            if (_context16.t0.response && _context16.t0.response.status === 422) {
              errorData = _context16.t0.response.data;
              errorMessages = errorData.errors || [errorData.message];
              if (errorMessages.length > 0) {
                _this23.showError(errorMessages.join('\n'));
              } else {
                _this23.showError(errorData.message || 'Validation failed. Please check your input.');
              }
            } else if (_context16.t0.response && _context16.t0.response.status === 401) {
              _this23.showError('You are not authorized. Please log in again.');
            } else if (_context16.t0.response && _context16.t0.response.status === 403) {
              _this23.showError('You are not authorized to update this post.');
            } else if (_context16.t0.response && _context16.t0.response.status === 404) {
              _this23.showError('Post not found.');
            } else if (_context16.t0.response && _context16.t0.response.status === 500) {
              _this23.showError(((_error$response$data5 = _context16.t0.response.data) === null || _error$response$data5 === void 0 ? void 0 : _error$response$data5.message) || 'Server error. Please try again later.');
            } else if (_context16.t0.message === 'Network Error' || !_context16.t0.response) {
              _this23.showError('Network error. Please check your connection and try again.');
            } else {
              errorMessage = ((_error$response6 = _context16.t0.response) === null || _error$response6 === void 0 || (_error$response6 = _error$response6.data) === null || _error$response6 === void 0 ? void 0 : _error$response6.message) || 'Failed to update post. Please try again.';
              _this23.showError(errorMessage);
            }
          case 23:
          case "end":
            return _context16.stop();
        }
      }, _callee16, null, [[8, 20]]);
    }))();
  }), "closeEditModal", function closeEditModal() {
    this.showEditModal = false;
    this.editingPost = null;
    this.editPostContent = '';
  }), "cancelEditPost", function cancelEditPost() {
    this.closeEditModal();
  }), "deletePost", function deletePost(postId) {
    var _this24 = this;
    return _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee17() {
      var result, numericPostId, response, _response$data2, errorMessage, _error$response$data6, _error$response$data7;
      return _regeneratorRuntime().wrap(function _callee17$(_context17) {
        while (1) switch (_context17.prev = _context17.next) {
          case 0:
            if (!_this24.deletingPosts.has(postId)) {
              _context17.next = 2;
              break;
            }
            return _context17.abrupt("return");
          case 2:
            _context17.prev = 2;
            _context17.next = 5;
            return _this24.$swal({
              title: 'Are you sure?',
              text: 'You won\'t be able to revert this!',
              icon: 'warning',
              showCancelButton: true,
              confirmButtonColor: '#d33',
              cancelButtonColor: '#3085d6',
              confirmButtonText: 'Yes, delete it!',
              cancelButtonText: 'Cancel'
            });
          case 5:
            result = _context17.sent;
            if (!result.isConfirmed) {
              _context17.next = 24;
              break;
            }
            // Add to deleting set
            _this24.deletingPosts.add(postId);
            _context17.prev = 8;
            // Convert postId to number if it's a string to ensure proper comparison
            numericPostId = typeof postId === 'string' ? parseInt(postId, 10) : postId;
            _context17.next = 12;
            return axios__WEBPACK_IMPORTED_MODULE_0___default()["delete"]("posts/".concat(numericPostId));
          case 12:
            response = _context17.sent;
            if (response.data && response.data.success) {
              // Remove the post from the list (handle both string and number IDs)
              _this24.posts = _this24.posts.filter(function (p) {
                var pId = typeof p.id === 'string' ? parseInt(p.id, 10) : p.id;
                return pId !== numericPostId;
              });
              _this24.showSuccess('Post deleted successfully!');
            } else {
              _this24.showError(((_response$data2 = response.data) === null || _response$data2 === void 0 ? void 0 : _response$data2.message) || 'Failed to delete post');
            }
            _context17.next = 21;
            break;
          case 16:
            _context17.prev = 16;
            _context17.t0 = _context17["catch"](8);
            errorMessage = 'Failed to delete post';
            if (_context17.t0.response) {
              if (_context17.t0.response.status === 403) {
                errorMessage = 'You are not authorized to delete this post';
              } else if (_context17.t0.response.status === 404) {
                errorMessage = 'Post not found';
              } else {
                errorMessage = ((_error$response$data6 = _context17.t0.response.data) === null || _error$response$data6 === void 0 ? void 0 : _error$response$data6.message) || ((_error$response$data7 = _context17.t0.response.data) === null || _error$response$data7 === void 0 ? void 0 : _error$response$data7.error) || "Failed to delete post (".concat(_context17.t0.response.status, ")");
              }
            } else if (_context17.t0.message) {
              errorMessage = _context17.t0.message;
            }
            _this24.showError(errorMessage);
          case 21:
            _context17.prev = 21;
            // Remove from deleting set
            _this24.deletingPosts["delete"](postId);
            return _context17.finish(21);
          case 24:
            _context17.next = 29;
            break;
          case 26:
            _context17.prev = 26;
            _context17.t1 = _context17["catch"](2);
            // User cancelled the confirmation dialog or SweetAlert error
            // Make sure to remove from deleting set even if cancelled
            _this24.deletingPosts["delete"](postId);
          case 29:
          case "end":
            return _context17.stop();
        }
      }, _callee17, null, [[2, 26], [8, 16, 21, 24]]);
    }))();
  }), "openImageModal", function openImageModal(imageUrl) {
    // You can implement a modal here or use a library like vue-sweetalert2
    window.open(imageUrl, '_blank');
  }), "showError", function showError(message) {
    this.$swal({
      icon: "error",
      title: "Error",
      text: message,
      timer: 3000,
      showConfirmButton: false
    });
  }), "showSuccess", function showSuccess(message) {
    this.$swal({
      icon: "success",
      title: "Success!",
      text: message,
      timer: 3000,
      showConfirmButton: false
    });
  }), "closePollModal", function closePollModal() {
    this.showPollModal = false;
    this.resetPollData();
  }), "openVideoTutorialModal", function openVideoTutorialModal() {
    this.isVideoLoading = true;
    this.videoError = null;
    this.showVideoTutorialModal = true;
    // Reset video loading state after modal is shown
    this.$nextTick(function () {
      // Video element will trigger load events
    });
  }), _defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_methods, "closeVideoTutorialModal", function closeVideoTutorialModal() {
    this.showVideoTutorialModal = false;
    this.isVideoLoading = false;
    this.videoError = null;
  }), "onVideoLoadStart", function onVideoLoadStart() {
    // Video started loading
    this.isVideoLoading = true;
  }), "onVideoCanPlay", function onVideoCanPlay() {
    // Video can start playing
    this.isVideoLoading = false;
    this.videoError = null;
  }), "onVideoLoaded", function onVideoLoaded() {
    // Video metadata and data loaded
    this.isVideoLoading = false;
    this.videoError = null;
  }), "handleVideoError", function handleVideoError(event) {
    this.isVideoLoading = false;
    this.videoError = 'Failed to load video. Please check if the file exists at: ' + this.videoTutorialUrl;
  }), "resetPollData", function resetPollData() {
    this.pollData = {
      title: '',
      options: ['', '', '', '', '']
    };
  }), "submitPoll", function submitPoll() {
    var _this25 = this;
    return _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee18() {
      var validOptions, pollData, response, _newPoll$user, newPoll, _error$response7, errorMessage;
      return _regeneratorRuntime().wrap(function _callee18$(_context18) {
        while (1) switch (_context18.prev = _context18.next) {
          case 0:
            if (_this25.pollData.title.trim()) {
              _context18.next = 3;
              break;
            }
            _this25.showError('Poll title is required');
            return _context18.abrupt("return");
          case 3:
            validOptions = _this25.pollData.options.filter(function (option) {
              return option.trim() !== '';
            });
            if (!(validOptions.length < 2)) {
              _context18.next = 7;
              break;
            }
            _this25.showError('At least 2 options are required');
            return _context18.abrupt("return");
          case 7:
            _context18.prev = 7;
            pollData = {
              title: _this25.pollData.title.trim(),
              options: validOptions.map(function (option) {
                return option.trim();
              })
            };
            _context18.next = 11;
            return axios__WEBPACK_IMPORTED_MODULE_0___default().post('polls', pollData);
          case 11:
            response = _context18.sent;
            if (response.data.success) {
              // Add the new poll to the list immediately
              newPoll = response.data.data;
              _this25.polls.unshift(_objectSpread(_objectSpread({}, newPoll), {}, {
                user_id: newPoll.user_id || ((_newPoll$user = newPoll.user) === null || _newPoll$user === void 0 ? void 0 : _newPoll$user.id),
                author: newPoll.user ? newPoll.user.firstname + ' ' + newPoll.user.lastname : 'Unknown User',
                isStaff: newPoll.user ? newPoll.user.role_id === 1 : false,
                hasVoted: false,
                votedOptionId: null,
                totalVotes: 0,
                timeAgo: 'just now',
                options: newPoll.options.map(function (option) {
                  return _objectSpread(_objectSpread({}, option), {}, {
                    percentage: 0
                  });
                })
              }));
              _this25.showSuccess('Poll created successfully!');
              _this25.closePollModal();
            } else {
              _this25.showError(response.data.message || 'Failed to create poll');
            }
            _context18.next = 19;
            break;
          case 15:
            _context18.prev = 15;
            _context18.t0 = _context18["catch"](7);
            errorMessage = ((_error$response7 = _context18.t0.response) === null || _error$response7 === void 0 || (_error$response7 = _error$response7.data) === null || _error$response7 === void 0 ? void 0 : _error$response7.message) || 'Failed to create poll';
            _this25.showError(errorMessage);
          case 19:
          case "end":
            return _context18.stop();
        }
      }, _callee18, null, [[7, 15]]);
    }))();
  }), "editPoll", function editPoll(pollId) {
    var poll = this.polls.find(function (p) {
      return p.id === pollId;
    });
    if (poll) {
      this.editingPoll = poll;
      this.editPollData = {
        title: poll.title,
        options: poll.options.map(function (opt) {
          return opt.text;
        }).concat(['', '', '', '']).slice(0, 5)
      };
      this.showEditPollModal = true;
    }
  }), "saveEditPoll", function saveEditPoll() {
    var _this26 = this;
    return _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee19() {
      var validOptions, pollData, response, pollIndex, _updatedPoll$user, _updatedPoll$user_vot, updatedPoll, errorMessage, errors, firstError, _error$response$data8;
      return _regeneratorRuntime().wrap(function _callee19$(_context19) {
        while (1) switch (_context19.prev = _context19.next) {
          case 0:
            if (_this26.editPollData.title.trim()) {
              _context19.next = 3;
              break;
            }
            _this26.showError('Poll title is required');
            return _context19.abrupt("return");
          case 3:
            if (_this26.editingPoll) {
              _context19.next = 5;
              break;
            }
            return _context19.abrupt("return");
          case 5:
            validOptions = _this26.editPollData.options.filter(function (option) {
              return option.trim() !== '';
            });
            if (!(validOptions.length < 2)) {
              _context19.next = 9;
              break;
            }
            _this26.showError('At least 2 options are required');
            return _context19.abrupt("return");
          case 9:
            _context19.prev = 9;
            pollData = {
              title: _this26.editPollData.title.trim(),
              options: validOptions.map(function (option) {
                return option.trim();
              })
            };
            _context19.next = 13;
            return axios__WEBPACK_IMPORTED_MODULE_0___default().put("polls/".concat(_this26.editingPoll.id), pollData);
          case 13:
            response = _context19.sent;
            if (response.data.success) {
              // Update the poll in the list
              pollIndex = _this26.polls.findIndex(function (p) {
                return p.id === _this26.editingPoll.id;
              });
              if (pollIndex !== -1) {
                updatedPoll = response.data.data;
                _this26.polls.splice(pollIndex, 1, _objectSpread(_objectSpread({}, updatedPoll), {}, {
                  user_id: updatedPoll.user_id || ((_updatedPoll$user = updatedPoll.user) === null || _updatedPoll$user === void 0 ? void 0 : _updatedPoll$user.id),
                  author: updatedPoll.user ? updatedPoll.user.firstname + ' ' + updatedPoll.user.lastname : 'Unknown User',
                  isStaff: updatedPoll.user ? updatedPoll.user.role_id === 1 : false,
                  hasVoted: updatedPoll.has_voted || false,
                  votedOptionId: updatedPoll.voted_option_id || ((_updatedPoll$user_vot = updatedPoll.user_vote) === null || _updatedPoll$user_vot === void 0 ? void 0 : _updatedPoll$user_vot.option_id) || null,
                  totalVotes: updatedPoll.total_votes || 0,
                  options: updatedPoll.options.map(function (option) {
                    return _objectSpread(_objectSpread({}, option), {}, {
                      percentage: option.vote_percentage || 0
                    });
                  })
                }));
              }
              _this26.showSuccess('Poll updated successfully!');
              _this26.closeEditPollModal();
            } else {
              _this26.showError(response.data.message || 'Failed to update poll');
            }
            _context19.next = 22;
            break;
          case 17:
            _context19.prev = 17;
            _context19.t0 = _context19["catch"](9);
            errorMessage = 'Failed to update poll';
            if (_context19.t0.response) {
              if (_context19.t0.response.status === 422 && _context19.t0.response.data.errors) {
                errors = _context19.t0.response.data.errors;
                firstError = Object.values(errors)[0];
                errorMessage = Array.isArray(firstError) ? firstError[0] : firstError;
              } else {
                errorMessage = ((_error$response$data8 = _context19.t0.response.data) === null || _error$response$data8 === void 0 ? void 0 : _error$response$data8.message) || errorMessage;
              }
            }
            _this26.showError(errorMessage);
          case 22:
          case "end":
            return _context19.stop();
        }
      }, _callee19, null, [[9, 17]]);
    }))();
  }), "closeEditPollModal", function closeEditPollModal() {
    this.showEditPollModal = false;
    this.editingPoll = null;
    this.resetEditPollData();
  }), _defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_methods, "cancelEditPoll", function cancelEditPoll() {
    this.closeEditPollModal();
  }), "resetEditPollData", function resetEditPollData() {
    this.editPollData = {
      title: '',
      options: ['', '', '', '', '']
    };
  }), "deletePoll", function deletePoll(pollId) {
    var _this27 = this;
    return _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee20() {
      var result, response, _response$data3, errorMessage, _error$response$data9, _error$response$data10;
      return _regeneratorRuntime().wrap(function _callee20$(_context20) {
        while (1) switch (_context20.prev = _context20.next) {
          case 0:
            if (!_this27.deletingPolls.has(pollId)) {
              _context20.next = 2;
              break;
            }
            return _context20.abrupt("return");
          case 2:
            _context20.prev = 2;
            _context20.next = 5;
            return _this27.$swal({
              title: 'Are you sure?',
              text: 'You won\'t be able to revert this!',
              icon: 'warning',
              showCancelButton: true,
              confirmButtonColor: '#d33',
              cancelButtonColor: '#3085d6',
              confirmButtonText: 'Yes, delete it!',
              cancelButtonText: 'Cancel'
            });
          case 5:
            result = _context20.sent;
            if (!result.isConfirmed) {
              _context20.next = 23;
              break;
            }
            // Add to deleting set
            _this27.deletingPolls.add(pollId);
            _context20.prev = 8;
            _context20.next = 11;
            return axios__WEBPACK_IMPORTED_MODULE_0___default()["delete"]("polls/".concat(pollId));
          case 11:
            response = _context20.sent;
            if (response.data && response.data.success) {
              // Remove the poll from the list
              _this27.polls = _this27.polls.filter(function (p) {
                var pId = typeof p.id === 'string' ? parseInt(p.id, 10) : p.id;
                var numericPollId = typeof pollId === 'string' ? parseInt(pollId, 10) : pollId;
                return pId !== numericPollId;
              });
              _this27.showSuccess('Poll deleted successfully!');
            } else {
              _this27.showError(((_response$data3 = response.data) === null || _response$data3 === void 0 ? void 0 : _response$data3.message) || 'Failed to delete poll');
            }
            _context20.next = 20;
            break;
          case 15:
            _context20.prev = 15;
            _context20.t0 = _context20["catch"](8);
            errorMessage = 'Failed to delete poll';
            if (_context20.t0.response) {
              if (_context20.t0.response.status === 403) {
                errorMessage = 'You are not authorized to delete this poll';
              } else if (_context20.t0.response.status === 404) {
                errorMessage = 'Poll not found';
              } else {
                errorMessage = ((_error$response$data9 = _context20.t0.response.data) === null || _error$response$data9 === void 0 ? void 0 : _error$response$data9.message) || ((_error$response$data10 = _context20.t0.response.data) === null || _error$response$data10 === void 0 ? void 0 : _error$response$data10.error) || "Failed to delete poll (".concat(_context20.t0.response.status, ")");
              }
            } else if (_context20.t0.message) {
              errorMessage = _context20.t0.message;
            }
            _this27.showError(errorMessage);
          case 20:
            _context20.prev = 20;
            // Remove from deleting set
            _this27.deletingPolls["delete"](pollId);
            return _context20.finish(20);
          case 23:
            _context20.next = 28;
            break;
          case 25:
            _context20.prev = 25;
            _context20.t1 = _context20["catch"](2);
            // User cancelled the confirmation dialog or SweetAlert error
            // Make sure to remove from deleting set even if cancelled
            _this27.deletingPolls["delete"](pollId);
          case 28:
          case "end":
            return _context20.stop();
        }
      }, _callee20, null, [[2, 25], [8, 15, 20, 23]]);
    }))();
  }), "getWidgetImageUrl", function getWidgetImageUrl(widget) {
    if (!widget) return null;
    if (widget.image_url) {
      return widget.image_url;
    }
    if (widget.image_path) {
      // If image_path starts with 'images/', it's already a full path
      if (widget.image_path.startsWith('images/')) {
        return "".concat(window.location.origin, "/").concat(widget.image_path);
      }
      // Otherwise, construct the path
      return "".concat(window.location.origin, "/images/community-uploads/widgets/").concat(widget.image_path);
    }
    return null;
  }), "getWidgetImageStyle", function getWidgetImageStyle(widget) {
    var imageUrl = this.getWidgetImageUrl(widget);
    if (imageUrl) {
      return {
        backgroundImage: "url(".concat(imageUrl, ")"),
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      };
    }
    return {};
  }), "loadWidgets", function loadWidgets() {
    var _this28 = this;
    return _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee21() {
      var response;
      return _regeneratorRuntime().wrap(function _callee21$(_context21) {
        while (1) switch (_context21.prev = _context21.next) {
          case 0:
            _this28.loadingWidgets = true;
            _context21.prev = 1;
            _context21.next = 4;
            return axios__WEBPACK_IMPORTED_MODULE_0___default().get('community-widgets');
          case 4:
            response = _context21.sent;
            _this28.widgets = (response.data.data || []).map(function (widget) {
              // Ensure image_url is properly set
              var imageUrl = widget.image_url;
              if (!imageUrl && widget.image_path) {
                // If image_path starts with 'images/', it's already a full path
                if (widget.image_path.startsWith('images/')) {
                  imageUrl = "".concat(window.location.origin, "/").concat(widget.image_path);
                } else {
                  // Otherwise, construct the path
                  imageUrl = "".concat(window.location.origin, "/images/community-uploads/widgets/").concat(widget.image_path);
                }
              }
              return _objectSpread(_objectSpread({}, widget), {}, {
                image_url: imageUrl
              });
            });
            _context21.next = 10;
            break;
          case 8:
            _context21.prev = 8;
            _context21.t0 = _context21["catch"](1);
          case 10:
            _context21.prev = 10;
            _this28.loadingWidgets = false;
            return _context21.finish(10);
          case 13:
          case "end":
            return _context21.stop();
        }
      }, _callee21, null, [[1, 8, 10, 13]]);
    }))();
  }), "editWidget", function editWidget(widget) {
    // Only allow editing for admins
    if (!this.currentUser || this.currentUser.role_id !== 1) {
      return;
    }
    this.editingWidget = widget;
    this.widgetForm = {
      type: widget.type,
      title: widget.title || '',
      content: widget.content || '',
      image: null,
      imagePreview: null,
      link_url: widget.link_url || '',
      link_text: widget.link_text || '',
      is_active: widget.is_active !== undefined ? widget.is_active : true,
      order: widget.order || 0,
      metadata: widget.metadata || {}
    };
    this.widgetValidationErrors = {};
    this.showWidgetModal = true;
  }), "createWidget", function createWidget() {
    if (!this.currentUser || this.currentUser.role_id !== 1) {
      this.showError('Only administrators can create widgets');
      return;
    }
    this.editingWidget = null;
    this.widgetForm = {
      type: 'advertisement',
      title: '',
      content: '',
      image: null,
      imagePreview: null,
      link_url: '',
      link_text: '',
      is_active: true,
      order: 0,
      metadata: {}
    };
    this.widgetValidationErrors = {};
    this.showWidgetModal = true;
  }), "closeWidgetModal", function closeWidgetModal() {
    this.showWidgetModal = false;
    this.editingWidget = null;
    this.widgetForm = {
      type: 'advertisement',
      title: '',
      content: '',
      image: null,
      imagePreview: null,
      link_url: '',
      link_text: '',
      is_active: true,
      order: 0,
      metadata: {}
    };
    this.widgetValidationErrors = {};
  }), "handleWidgetImageSelect", function handleWidgetImageSelect(event) {
    var _this29 = this;
    var file = event.target.files[0];
    if (file) {
      // Validate file size (5MB max)
      var maxSize = 5 * 1024 * 1024;
      if (file.size > maxSize) {
        this.showError('Image size cannot exceed 5MB');
        if (this.$refs.widgetImageInput) {
          this.$refs.widgetImageInput.value = '';
        }
        return;
      }

      // Validate file type
      var allowedTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/gif', 'image/webp'];
      if (!allowedTypes.includes(file.type)) {
        this.showError('Invalid image format. Please choose a jpeg, png, jpg, gif, or webp file.');
        if (this.$refs.widgetImageInput) {
          this.$refs.widgetImageInput.value = '';
        }
        return;
      }
      this.widgetForm.image = file;
      var reader = new FileReader();
      reader.onload = function (e) {
        _this29.widgetForm.imagePreview = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }), _defineProperty(_defineProperty(_defineProperty(_methods, "removeWidgetImage", function removeWidgetImage() {
    this.widgetForm.image = null;
    this.widgetForm.imagePreview = null;
    if (this.$refs.widgetImageInput) {
      this.$refs.widgetImageInput.value = '';
    }
  }), "saveWidget", function saveWidget() {
    var _this30 = this;
    return _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee22() {
      var formData, response, errorData, errorMessages, _error$response8, errorMessage;
      return _regeneratorRuntime().wrap(function _callee22$(_context22) {
        while (1) switch (_context22.prev = _context22.next) {
          case 0:
            // Validation
            _this30.widgetValidationErrors = {};
            if (_this30.widgetForm.type) {
              _context22.next = 5;
              break;
            }
            _this30.widgetValidationErrors.type = 'Widget type is required';
            _this30.showError('Widget type is required');
            return _context22.abrupt("return");
          case 5:
            if (!(_this30.widgetForm.type === 'activity' && !_this30.widgetForm.content.trim())) {
              _context22.next = 9;
              break;
            }
            _this30.widgetValidationErrors.content = 'Content is required for activity widgets';
            _this30.showError('Content is required for activity widgets');
            return _context22.abrupt("return");
          case 9:
            formData = new FormData();
            formData.append('type', _this30.widgetForm.type);
            if (_this30.widgetForm.title) {
              formData.append('title', _this30.widgetForm.title);
            }
            if (_this30.widgetForm.content) {
              formData.append('content', _this30.widgetForm.content);
            }
            if (_this30.widgetForm.image) {
              formData.append('image', _this30.widgetForm.image);
            }
            if (_this30.widgetForm.link_url) {
              formData.append('link_url', _this30.widgetForm.link_url);
            }
            if (_this30.widgetForm.link_text) {
              formData.append('link_text', _this30.widgetForm.link_text);
            }
            formData.append('is_active', _this30.widgetForm.is_active ? 1 : 0);
            formData.append('order', _this30.widgetForm.order);
            _context22.prev = 18;
            if (!_this30.editingWidget) {
              _context22.next = 25;
              break;
            }
            _context22.next = 22;
            return axios__WEBPACK_IMPORTED_MODULE_0___default().put("community-widgets/".concat(_this30.editingWidget.id), formData, {
              headers: {
                'Content-Type': 'multipart/form-data'
              }
            });
          case 22:
            response = _context22.sent;
            _context22.next = 28;
            break;
          case 25:
            _context22.next = 27;
            return axios__WEBPACK_IMPORTED_MODULE_0___default().post('community-widgets', formData, {
              headers: {
                'Content-Type': 'multipart/form-data'
              }
            });
          case 27:
            response = _context22.sent;
          case 28:
            if (!response.data.success) {
              _context22.next = 35;
              break;
            }
            _this30.showSuccess(_this30.editingWidget ? 'Widget updated successfully!' : 'Widget created successfully!');
            _context22.next = 32;
            return _this30.loadWidgets();
          case 32:
            _this30.closeWidgetModal();
            _context22.next = 36;
            break;
          case 35:
            _this30.showError(response.data.message || 'Failed to save widget');
          case 36:
            _context22.next = 41;
            break;
          case 38:
            _context22.prev = 38;
            _context22.t0 = _context22["catch"](18);
            if (_context22.t0.response && _context22.t0.response.status === 422) {
              errorData = _context22.t0.response.data;
              _this30.widgetValidationErrors = errorData.error_details || {};
              errorMessages = errorData.errors || [errorData.message];
              if (errorMessages.length > 0) {
                _this30.showError(errorMessages.join('\n'));
              }
            } else {
              errorMessage = ((_error$response8 = _context22.t0.response) === null || _error$response8 === void 0 || (_error$response8 = _error$response8.data) === null || _error$response8 === void 0 ? void 0 : _error$response8.message) || 'Failed to save widget. Please try again.';
              _this30.showError(errorMessage);
            }
          case 41:
          case "end":
            return _context22.stop();
        }
      }, _callee22, null, [[18, 38]]);
    }))();
  }), "deleteWidget", function deleteWidget(widgetId) {
    var _this31 = this;
    return _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee23() {
      var result, response, _response$data4, errorMessage, _error$response$data11, _error$response$data12;
      return _regeneratorRuntime().wrap(function _callee23$(_context23) {
        while (1) switch (_context23.prev = _context23.next) {
          case 0:
            if (!_this31.deletingWidgets.has(widgetId)) {
              _context23.next = 2;
              break;
            }
            return _context23.abrupt("return");
          case 2:
            _context23.prev = 2;
            _context23.next = 5;
            return _this31.$swal({
              title: 'Are you sure?',
              text: 'You won\'t be able to revert this!',
              icon: 'warning',
              showCancelButton: true,
              confirmButtonColor: '#d33',
              cancelButtonColor: '#3085d6',
              confirmButtonText: 'Yes, delete it!',
              cancelButtonText: 'Cancel'
            });
          case 5:
            result = _context23.sent;
            if (!result.isConfirmed) {
              _context23.next = 23;
              break;
            }
            // Add to deleting set
            _this31.deletingWidgets.add(widgetId);
            _context23.prev = 8;
            _context23.next = 11;
            return axios__WEBPACK_IMPORTED_MODULE_0___default()["delete"]("community-widgets/".concat(widgetId));
          case 11:
            response = _context23.sent;
            if (response.data && response.data.success) {
              // Remove the widget from the list
              _this31.widgets = _this31.widgets.filter(function (w) {
                var wId = typeof w.id === 'string' ? parseInt(w.id, 10) : w.id;
                var numericWidgetId = typeof widgetId === 'string' ? parseInt(widgetId, 10) : widgetId;
                return wId !== numericWidgetId;
              });
              _this31.showSuccess('Widget deleted successfully!');
            } else {
              _this31.showError(((_response$data4 = response.data) === null || _response$data4 === void 0 ? void 0 : _response$data4.message) || 'Failed to delete widget');
            }
            _context23.next = 20;
            break;
          case 15:
            _context23.prev = 15;
            _context23.t0 = _context23["catch"](8);
            errorMessage = 'Failed to delete widget';
            if (_context23.t0.response) {
              if (_context23.t0.response.status === 403) {
                errorMessage = 'You are not authorized to delete this widget';
              } else if (_context23.t0.response.status === 404) {
                errorMessage = 'Widget not found';
              } else {
                errorMessage = ((_error$response$data11 = _context23.t0.response.data) === null || _error$response$data11 === void 0 ? void 0 : _error$response$data11.message) || ((_error$response$data12 = _context23.t0.response.data) === null || _error$response$data12 === void 0 ? void 0 : _error$response$data12.error) || "Failed to delete widget (".concat(_context23.t0.response.status, ")");
              }
            } else if (_context23.t0.message) {
              errorMessage = _context23.t0.message;
            }
            _this31.showError(errorMessage);
          case 20:
            _context23.prev = 20;
            // Remove from deleting set
            _this31.deletingWidgets["delete"](widgetId);
            return _context23.finish(20);
          case 23:
            _context23.next = 28;
            break;
          case 25:
            _context23.prev = 25;
            _context23.t1 = _context23["catch"](2);
            // User cancelled the confirmation dialog or SweetAlert error
            // Make sure to remove from deleting set even if cancelled
            _this31.deletingWidgets["delete"](widgetId);
          case 28:
          case "end":
            return _context23.stop();
        }
      }, _callee23, null, [[2, 25], [8, 15, 20, 23]]);
    }))();
  }))
});

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/Community/community.vue?vue&type=style&index=0&id=6d87ac54&scoped=true&lang=css":
/*!***************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/Community/community.vue?vue&type=style&index=0&id=6d87ac54&scoped=true&lang=css ***!
  \***************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
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
___CSS_LOADER_EXPORT___.push([module.id, "\n.community-page[data-v-6d87ac54] {\n    min-height: 100vh;\n}\n\n/* Top Navigation */\n.top-nav[data-v-6d87ac54] {\n    position: sticky;\n}\n.nav-container[data-v-6d87ac54] {\n    max-width: 1200px;\n    margin: 0 auto;\n    padding: 0 20px;\n}\n.nav-tabs[data-v-6d87ac54] {\n    display: flex;\n}\n.nav-tab[data-v-6d87ac54] {\n    background: transparent;\n    border: none;\n    color: #686868;\n    font-weight: 500;\n    padding: 5px;\n    cursor: pointer;\n    transition: all 0.3s ease;\n    display: flex;\n    align-items: center;\n    position: relative;\n    font-size: 12px;\n    min-width: 110px;\n    justify-content: center;\n}\n.nav-tab[data-v-6d87ac54]:hover {\n    color: #dc3545;\n}\n.nav-tab[data-v-6d87ac54]:hover::after {\n    content: '';\n    position: absolute;\n    bottom: 0;\n    left: 0;\n    right: 0;\n    height: 2px;\n    background: #dc3545;\n}\n.nav-tab.active[data-v-6d87ac54] {\n    color: #dc3545;\n}\n.nav-tab.active[data-v-6d87ac54]::after {\n    content: '';\n    position: absolute;\n    bottom: 0;\n    left: 0;\n    right: 0;\n    height: 2px;\n    background: #dc3545;\n}\n.nav-tab i[data-v-6d87ac54] {\n    font-size: 16px;\n}\n.nav-tab span[data-v-6d87ac54] {\n    font-weight: 500;\n}\n\n/* Group Banner */\n.group-banner[data-v-6d87ac54] {\n    position: relative;\n    background: white;\n}\n.cover-photo[data-v-6d87ac54] {\n    height: 200px;\n    background: #e9ecef;\n    position: relative;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    color: #6c757d;\n    font-size: 48px;\n    transition: all 0.3s ease;\n    cursor: pointer;\n}\n.cover-photo.drag-over[data-v-6d87ac54] {\n    background: rgba(220, 53, 69, 0.1);\n    border: 3px dashed #dc3545;\n    transform: scale(1.02);\n}\n.drag-overlay[data-v-6d87ac54] {\n    position: absolute;\n    top: 0;\n    left: 0;\n    right: 0;\n    bottom: 0;\n    background: rgba(220, 53, 69, 0.95);\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    z-index: 10;\n    animation: dragOverlayFadeIn-data-v-6d87ac54 0.2s ease-in-out;\n}\n@keyframes dragOverlayFadeIn-data-v-6d87ac54 {\nfrom {\n        opacity: 0;\n        transform: scale(0.9);\n}\nto {\n        opacity: 1;\n        transform: scale(1);\n}\n}\n.drag-message[data-v-6d87ac54] {\n    text-align: center;\n    color: white;\n    animation: dragMessagePulse-data-v-6d87ac54 1.5s ease-in-out infinite;\n}\n@keyframes dragMessagePulse-data-v-6d87ac54 {\n0%, 100% {\n        transform: scale(1);\n}\n50% {\n        transform: scale(1.05);\n}\n}\n.drag-message i[data-v-6d87ac54] {\n    font-size: 48px;\n    margin-bottom: 15px;\n    display: block;\n    animation: dragIconBounce-data-v-6d87ac54 1s ease-in-out infinite;\n}\n@keyframes dragIconBounce-data-v-6d87ac54 {\n0%, 100% {\n        transform: translateY(0);\n}\n50% {\n        transform: translateY(-10px);\n}\n}\n.no-cover-message[data-v-6d87ac54] {\n    text-align: center;\n    color: #6c757d;\n    pointer-events: none;\n}\n.no-cover-message i[data-v-6d87ac54] {\n    font-size: 48px;\n    margin-bottom: 15px;\n    display: block;\n    opacity: 0.7;\n}\n.no-cover-message p[data-v-6d87ac54] {\n    font-size: 18px;\n    font-weight: 500;\n    margin: 0 0 5px 0;\n}\n.no-cover-message small[data-v-6d87ac54] {\n    font-size: 14px;\n    opacity: 0.8;\n}\n.drag-message p[data-v-6d87ac54] {\n    font-size: 18px;\n    font-weight: 600;\n    margin: 0;\n    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);\n}\n.edit-cover-btn[data-v-6d87ac54] {\n    position: absolute;\n    top: 15px;\n    right: 15px;\n    border: 0px solid #dcdcdc;\n    border-radius: 50%;\n    width: 35px;\n    height: 35px;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    cursor: pointer;\n    transition: all 0.3s ease;\n    color: #6c757d;\n    font-size: 14px;\n}\n.edit-cover-btn[data-v-6d87ac54]:hover {\n\n    transform: scale(1.1);\n}\n.group-info-section[data-v-6d87ac54] {\n    position: relative;\n    padding: 20px;\n    max-width: 1200px;\n    margin: 0 auto;\n}\n.group-info[data-v-6d87ac54] {\n    display: flex;\n    align-items: flex-end;\n    gap: 20px;\n    position: relative;\n}\n.edit-group-btn[data-v-6d87ac54] {\n    position: absolute;\n    top: 20px;\n    right: 20px;\n    background: white;\n    border: 0px solid #dcdcdc;\n    border-radius: 50%;\n    width: 35px;\n    height: 35px;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    cursor: pointer;\n    transition: all 0.3s ease;\n    color: #6c757d;\n    font-size: 14px;\n}\n.edit-group-btn[data-v-6d87ac54]:hover {\n    border-color: #dc3545;\n    transform: scale(1.1);\n}\n.group-logo[data-v-6d87ac54] {\n    flex-shrink: 0;\n    position: relative;\n    z-index: 2;\n}\n.logo-square[data-v-6d87ac54] {\n    width: 80px;\n    height: 80px;\n    background: #dc3545;\n    border-radius: 12px;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    position: relative;\n    box-shadow: 0 4px 12px rgba(255, 64, 64, 0.3);\n    border: 4px solid white;\n    margin-top: -40px;\n}\n.logo-text[data-v-6d87ac54] {\n    color: white;\n    font-size: 24px;\n    font-weight: bold;\n    margin-right: 5px;\n}\n.logo-bolt[data-v-6d87ac54] {\n    color: white;\n    font-size: 16px;\n    position: absolute;\n    top: 8px;\n    right: 8px;\n}\n.group-details[data-v-6d87ac54] {\n    flex: 1;\n}\n.group-actions[data-v-6d87ac54] {\n    display: flex;\n    align-items: center;\n    gap: 10px;\n    margin-top: 10px;\n}\n.group-name[data-v-6d87ac54] {\n    font-size: 32px;\n    font-weight: bold;\n    color: #252525;\n    margin: 0 0 10px 0;\n}\n.group-description[data-v-6d87ac54] {\n    color: #686868;\n    font-size: 16px;\n    margin: 0 0 15px 0;\n    line-height: 1.5;\n}\n.create-poll-btn[data-v-6d87ac54] {\n    background: white;\n    color: #252525;\n    border: 1px solid #dcdcdc;\n    padding: 5px 10px;\n    border-radius: 5px;\n    cursor: pointer;\n    display: flex;\n    align-items: center;\n    gap: 5px;\n    transition: all 0.3s ease;\n}\n.create-poll-btn[data-v-6d87ac54]:hover {\n    transform: scale(1.1);\n}\n\n/* Main Content */\n.main-content[data-v-6d87ac54] {\n    padding: 20px 0;\n}\n.content-container[data-v-6d87ac54] {\n    max-width: 1200px;\n    margin: 0 auto;\n    padding: 0 20px;\n    display: grid;\n    grid-template-columns: 2fr 1fr;\n    gap: 30px;\n}\n\n/* Left Column */\n.left-column[data-v-6d87ac54] {\n    display: flex;\n    flex-direction: column;\n    gap: 20px;\n}\n.post-input-card[data-v-6d87ac54] {\n    background: white;\n    border-radius: 12px;\n    padding: 20px;\n    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);\n}\n.post-input[data-v-6d87ac54] {\n    display: flex;\n    align-items: center;\n    gap: 15px;\n}\n.user-avatar[data-v-6d87ac54] {\n    width: 40px;\n    height: 40px;\n    background: #e9ecef;\n    border-radius: 50%;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    color: #6c757d;\n    flex-shrink: 0;\n}\n.post-input-container[data-v-6d87ac54] {\n    flex: 1;\n    display: flex;\n    flex-direction: column;\n    gap: 10px;\n}\n.post-input-field[data-v-6d87ac54] {\n    width: 100%;\n    border: 1px solid #e9ecef;\n    border-radius: 12px;\n    padding: 12px 20px;\n    font-size: 16px;\n    outline: none;\n    transition: border-color 0.3s ease;\n    resize: vertical;\n    min-height: 60px;\n    font-family: inherit;\n}\n.post-input-field[data-v-6d87ac54]:focus {\n    border-color: #dc3545;\n}\n.post-input-field.expanded[data-v-6d87ac54] {\n    min-height: 100px;\n    transition: min-height 0.3s ease;\n}\n.post-input-field.has-error[data-v-6d87ac54] {\n    border-color: #dc3545;\n    background-color: #fff5f5;\n}\n.validation-error[data-v-6d87ac54] {\n    color: #dc3545;\n    font-size: 12px;\n    margin-top: 5px;\n    padding: 5px 10px;\n    background-color: #fff5f5;\n    border-left: 3px solid #dc3545;\n    border-radius: 4px;\n}\n.validation-error-inline[data-v-6d87ac54] {\n    color: #dc3545;\n    font-size: 12px;\n    margin-top: 5px;\n    padding: 5px 10px;\n    background-color: rgba(220, 53, 69, 0.1);\n    border-radius: 4px;\n    position: absolute;\n    bottom: 10px;\n    left: 10px;\n    right: 10px;\n    z-index: 10;\n}\n.char-count[data-v-6d87ac54] {\n    font-size: 12px;\n    color: #6c757d;\n    text-align: right;\n    margin-top: 5px;\n    padding-right: 5px;\n}\n.post-input-actions[data-v-6d87ac54] {\n    display: flex;\n    justify-content: space-between;\n    align-items: center;\n}\n.post-input-actions .action-btn[data-v-6d87ac54] {\n    background: #dc3545;\n    color: white;\n    border: none;\n    border-radius: 8px;\n    padding: 8px 12px;\n    cursor: pointer;\n    transition: all 0.3s ease;\n    display: flex;\n    align-items: center;\n    gap: 5px;\n}\n.post-input-actions .action-btn[data-v-6d87ac54]:hover:not(:disabled) {\n    background: #c82333;\n    transform: translateY(-1px);\n}\n.post-input-actions .action-btn[data-v-6d87ac54]:disabled {\n    background: #6c757d;\n    cursor: not-allowed;\n    transform: none;\n}\n.selected-image-preview[data-v-6d87ac54] {\n    position: relative;\n    margin-top: 10px;\n}\n.selected-image-preview img[data-v-6d87ac54] {\n    width: 100%;\n    max-width: 100px;\n    max-height: 100px;\n    -o-object-fit: cover;\n       object-fit: cover;\n    border-radius: 8px;\n    border: 1px solid #e9ecef;\n}\n.remove-image-btn[data-v-6d87ac54] {\n    position: absolute;\n    top: 5px;\n    right: 5px;\n    background: rgba(220, 53, 69, 0.8);\n    color: white;\n    border: none;\n    border-radius: 50%;\n    width: 25px;\n    height: 25px;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    cursor: pointer;\n    font-size: 12px;\n}\n.remove-image-btn[data-v-6d87ac54]:hover {\n    background: rgba(220, 53, 69, 1);\n}\n.selected-video-preview[data-v-6d87ac54] {\n    position: relative;\n    margin-top: 10px;\n}\n.selected-video-preview video[data-v-6d87ac54] {\n    width: 100%;\n    max-width: 100px;\n    max-height: 100px;\n    -o-object-fit: cover;\n       object-fit: cover;\n    border-radius: 8px;\n    border: 1px solid #e9ecef;\n}\n.remove-video-btn[data-v-6d87ac54] {\n    position: absolute;\n    top: 5px;\n    right: 5px;\n    background: rgba(220, 53, 69, 0.8);\n    color: white;\n    border: none;\n    border-radius: 50%;\n    width: 25px;\n    height: 25px;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    cursor: pointer;\n    font-size: 12px;\n}\n.remove-video-btn[data-v-6d87ac54]:hover {\n    background: rgba(220, 53, 69, 1);\n}\n.post-video[data-v-6d87ac54] {\n    margin-top: 15px;\n}\n.post-video video[data-v-6d87ac54] {\n    width: 100%;\n    max-width: 500px;\n    max-height: 400px;\n    -o-object-fit: cover;\n       object-fit: cover;\n    border-radius: 8px;\n    cursor: pointer;\n    transition: transform 0.3s ease;\n}\n.post-video video[data-v-6d87ac54]:hover {\n    transform: scale(1.02);\n}\n\n/* Posts Feed */\n.posts-feed[data-v-6d87ac54] {\n    display: flex;\n    flex-direction: column;\n    gap: 20px;\n}\n.post-card[data-v-6d87ac54] {\n    background: white;\n    border-radius: 12px;\n    padding: 20px;\n    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);\n}\n.post-header[data-v-6d87ac54] {\n    display: flex;\n    justify-content: space-between;\n    align-items: flex-start;\n    margin-bottom: 15px;\n}\n.post-user-info[data-v-6d87ac54] {\n    display: flex;\n    align-items: center;\n    gap: 12px;\n}\n.user-details[data-v-6d87ac54] {\n    display: flex;\n    flex-direction: column;\n    gap: 4px;\n}\n.user-name-row[data-v-6d87ac54] {\n    display: flex;\n    flex-direction: row;\n    align-items: center;\n    flex-wrap: wrap;\n    gap: 6px;\n}\n.user-name[data-v-6d87ac54] {\n    font-weight: 600;\n    color: #2c3e50;\n    font-size: 16px;\n}\n.user-badge[data-v-6d87ac54] {\n    background: #dc3545;\n    color: white;\n    font-size: 12px;\n    padding: 2px 8px;\n    border-radius: 12px;\n    font-weight: 500;\n}\n.gym-coach-badge[data-v-6d87ac54] {\n    display: flex;\n    flex-direction: row;\n    align-items: center;\n    background: #1877F2;\n    color: white;\n    font-size: 9px;\n    font-weight: 700;\n    padding: 2px 6px;\n    border-radius: 4px;\n    letter-spacing: 0.5px;\n    gap: 3px;\n}\n.gym-coach-badge i[data-v-6d87ac54] {\n    font-size: 11px;\n}\n.post-time[data-v-6d87ac54] {\n    color: #6c757d;\n    font-size: 14px;\n}\n.post-actions[data-v-6d87ac54] {\n    display: flex;\n    gap: 8px;\n}\n.action-btn[data-v-6d87ac54] {\n    background: none;\n    border: none;\n    color: #6c757d;\n    cursor: pointer;\n    padding: 5px;\n    border-radius: 4px;\n    transition: all 0.3s ease;\n}\n.action-btn[data-v-6d87ac54]:hover:not(:disabled) {\n    background: #f8f9fa;\n    color: #dc3545;\n}\n.action-btn[data-v-6d87ac54]:disabled {\n    opacity: 0.5;\n    cursor: not-allowed;\n    pointer-events: none;\n}\n.post-content[data-v-6d87ac54] {\n    color: #2c3e50;\n    font-size: 16px;\n    line-height: 1.5;\n    margin-bottom: 15px;\n}\n.post-content p[data-v-6d87ac54] {\n    margin: 0 0 10px 0;\n}\n.post-image[data-v-6d87ac54] {\n    margin-top: 15px;\n}\n.post-image img[data-v-6d87ac54] {\n    width: 100%;\n    max-width: 500px;\n    max-height: 400px;\n    -o-object-fit: cover;\n       object-fit: cover;\n    border-radius: 8px;\n    cursor: pointer;\n    transition: transform 0.3s ease;\n}\n.post-image img[data-v-6d87ac54]:hover {\n    transform: scale(1.02);\n}\n.post-interactions[data-v-6d87ac54] {\n    display: flex;\n    gap: 20px;\n    padding-top: 15px;\n    border-top: 1px solid #f8f9fa;\n}\n.interaction-btn[data-v-6d87ac54] {\n    background: none;\n    border: none;\n    color: #6c757d;\n    cursor: pointer;\n    display: flex;\n    align-items: center;\n    gap: 8px;\n    padding: 8px 12px;\n    border-radius: 20px;\n    transition: all 0.3s ease;\n}\n.interaction-btn[data-v-6d87ac54]:hover {\n    background: #f8f9fa;\n    color: #dc3545;\n}\n.interaction-btn .fa-heart.liked[data-v-6d87ac54] {\n    color: #dc3545;\n    animation: heartBeat-data-v-6d87ac54 0.6s ease-in-out;\n}\n@keyframes heartBeat-data-v-6d87ac54 {\n0% { transform: scale(1);\n}\n25% { transform: scale(1.2);\n}\n50% { transform: scale(1);\n}\n75% { transform: scale(1.1);\n}\n100% { transform: scale(1);\n}\n}\n.interaction-btn .fa-comment[data-v-6d87ac54] {\n    transition: all 0.3s ease;\n}\n.interaction-btn:hover .fa-comment[data-v-6d87ac54] {\n    transform: scale(1.1);\n    color: #dc3545;\n}\n.interaction-btn:active .fa-heart[data-v-6d87ac54] {\n    transform: scale(0.9);\n}\n.interaction-btn:active .fa-comment[data-v-6d87ac54] {\n    transform: scale(0.9);\n}\n\n/* Post Comment Input */\n.post-comment-input[data-v-6d87ac54] {\n    margin-top: 15px;\n    padding-top: 15px;\n    border-top: 1px solid #f8f9fa;\n}\n.post-comment-input .comment-input[data-v-6d87ac54] {\n    display: flex;\n    align-items: center;\n    gap: 10px;\n}\n.post-comment-input .comment-input-field[data-v-6d87ac54] {\n    flex: 1;\n    border: 1px solid #e9ecef;\n    border-radius: 20px;\n    padding: 8px 15px;\n    font-size: 14px;\n    outline: none;\n    transition: border-color 0.3s ease;\n    background: #f8f9fa;\n}\n.post-comment-input .comment-input-field[data-v-6d87ac54]:focus {\n    border-color: #dc3545;\n    background: white;\n}\n.post-comment-input .comment-input-field[data-v-6d87ac54]::-moz-placeholder {\n    color: #6c757d;\n}\n.post-comment-input .comment-input-field[data-v-6d87ac54]::placeholder {\n    color: #6c757d;\n}\n.comment-image-btn[data-v-6d87ac54] {\n    background: none;\n    border: none;\n    color: #6c757d;\n    cursor: pointer;\n    padding: 8px;\n    border-radius: 50%;\n    transition: all 0.3s ease;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n}\n.comment-image-btn[data-v-6d87ac54]:hover {\n    background: #f8f9fa;\n    color: #dc3545;\n}\n.comment-post-btn[data-v-6d87ac54] {\n    background: #dc3545;\n    border: none;\n    color: white;\n    cursor: pointer;\n    padding: 8px 12px;\n    border-radius: 50%;\n    transition: all 0.3s ease;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    min-width: 36px;\n    height: 36px;\n}\n.comment-post-btn[data-v-6d87ac54]:hover:not(:disabled) {\n    background: #c82333;\n    transform: translateY(-1px);\n    box-shadow: 0 2px 8px rgba(220, 53, 69, 0.3);\n}\n.comment-post-btn[data-v-6d87ac54]:disabled {\n    background: #6c757d;\n    opacity: 0.5;\n    cursor: not-allowed;\n    transform: none;\n}\n.comment-post-btn i[data-v-6d87ac54] {\n    font-size: 14px;\n}\n.comment-image-preview[data-v-6d87ac54] {\n    margin-top: 10px;\n    position: relative;\n    display: inline-block;\n}\n.comment-image-preview img[data-v-6d87ac54] {\n    max-width: 100px;\n    max-height: 100px;\n    border-radius: 8px;\n    -o-object-fit: cover;\n       object-fit: cover;\n}\n.remove-comment-image-btn[data-v-6d87ac54] {\n    position: absolute;\n    top: -8px;\n    right: -8px;\n    background: #dc3545;\n    color: white;\n    border: none;\n    border-radius: 50%;\n    width: 24px;\n    height: 24px;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    cursor: pointer;\n    font-size: 12px;\n    transition: all 0.3s ease;\n}\n.remove-comment-image-btn[data-v-6d87ac54]:hover {\n    background: #c82333;\n    transform: scale(1.1);\n}\n.comment-limit-message[data-v-6d87ac54] {\n    display: flex;\n    align-items: center;\n    gap: 8px;\n    padding: 10px 15px;\n    background: #fff3cd;\n    border: 1px solid #ffc107;\n    border-radius: 8px;\n    color: #856404;\n    font-size: 14px;\n}\n.comment-limit-message i[data-v-6d87ac54] {\n    color: #ffc107;\n}\n.fade-enter-active[data-v-6d87ac54], .fade-leave-active[data-v-6d87ac54] {\n    transition: opacity 0.3s ease, transform 0.3s ease;\n}\n.fade-enter[data-v-6d87ac54], .fade-leave-to[data-v-6d87ac54] {\n    opacity: 0;\n    transform: translateY(-10px);\n}\n\n/* Comments Section */\n.comments-section[data-v-6d87ac54] {\n    margin-top: 15px;\n    padding-top: 15px;\n    border-top: 1px solid #f8f9fa;\n}\n.comment[data-v-6d87ac54] {\n    display: flex;\n    gap: 12px;\n    margin-bottom: 15px;\n}\n.comment-user-avatar[data-v-6d87ac54] {\n    width: 32px;\n    height: 32px;\n    background: #e9ecef;\n    border-radius: 50%;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    color: #6c757d;\n    font-size: 14px;\n    flex-shrink: 0;\n}\n.comment-content[data-v-6d87ac54] {\n    flex: 1;\n}\n.comment-header[data-v-6d87ac54] {\n    display: flex;\n    justify-content: space-between;\n    align-items: center;\n    margin-bottom: 4px;\n}\n.comment-author[data-v-6d87ac54] {\n    font-weight: 600;\n    color: #2c3e50;\n    font-size: 14px;\n}\n.comment-actions[data-v-6d87ac54] {\n    display: flex;\n    align-items: center;\n    gap: 8px;\n}\n.comment-like-btn[data-v-6d87ac54] {\n    background: none;\n    border: none;\n    color: #6c757d;\n    cursor: pointer;\n    display: flex;\n    align-items: center;\n    gap: 4px;\n    padding: 4px 8px;\n    border-radius: 12px;\n    transition: all 0.3s ease;\n    font-size: 12px;\n}\n.comment-like-btn[data-v-6d87ac54]:hover:not(:disabled) {\n    background: #f8f9fa;\n    color: #dc3545;\n}\n.comment-like-btn.liked[data-v-6d87ac54] {\n    color: #dc3545;\n}\n.comment-like-btn[data-v-6d87ac54]:disabled {\n    opacity: 0.5;\n    cursor: not-allowed;\n}\n.comment-like-btn i[data-v-6d87ac54] {\n    font-size: 12px;\n}\n.comment-delete-btn[data-v-6d87ac54] {\n    background: none;\n    border: none;\n    color: #6c757d;\n    cursor: pointer;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    padding: 4px 8px;\n    border-radius: 12px;\n    transition: all 0.3s ease;\n    font-size: 12px;\n}\n.comment-delete-btn[data-v-6d87ac54]:hover:not(:disabled) {\n    background: #f8f9fa;\n    color: #dc3545;\n}\n.comment-delete-btn[data-v-6d87ac54]:disabled {\n    opacity: 0.5;\n    cursor: not-allowed;\n}\n.comment-delete-btn i[data-v-6d87ac54] {\n    font-size: 12px;\n}\n.comment-text[data-v-6d87ac54] {\n    color: #2c3e50;\n    font-size: 14px;\n    line-height: 1.4;\n    margin-bottom: 4px;\n}\n.comment-image[data-v-6d87ac54] {\n    margin-top: 8px;\n    margin-bottom: 4px;\n}\n.comment-image img[data-v-6d87ac54] {\n    max-width: 100px;\n    max-height: 100px;\n    border-radius: 8px;\n    -o-object-fit: cover;\n       object-fit: cover;\n    cursor: pointer;\n    transition: transform 0.3s ease;\n}\n.comment-image img[data-v-6d87ac54]:hover {\n    transform: scale(1.02);\n}\n.comment-time[data-v-6d87ac54] {\n    color: #6c757d;\n    font-size: 12px;\n}\n.add-comment[data-v-6d87ac54] {\n    margin-top: 10px;\n}\n.comment-input[data-v-6d87ac54] {\n    display: flex;\n    align-items: center;\n    gap: 10px;\n}\n.comment-input-field[data-v-6d87ac54] {\n    flex: 1;\n    border: 1px solid #e9ecef;\n    border-radius: 20px;\n    padding: 8px 15px;\n    font-size: 14px;\n    outline: none;\n    transition: border-color 0.3s ease;\n}\n.comment-input-field[data-v-6d87ac54]:focus {\n    border-color: #dc3545;\n}\n.add-comment .comment-image-preview[data-v-6d87ac54] {\n    margin-top: 10px;\n}\n\n/* Right Column */\n.right-column[data-v-6d87ac54] {\n    display: flex;\n    flex-direction: column;\n    gap: 20px;\n}\n.ad-card[data-v-6d87ac54], .activity-card[data-v-6d87ac54], .stats-card[data-v-6d87ac54] {\n    background: white;\n    border-radius: 12px;\n    padding: 20px;\n    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);\n}\n.ad-image[data-v-6d87ac54] {\n    position: relative;\n    border-radius: 8px;\n    overflow: hidden;\n    height: 200px;\n    background: #f8f9fa;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    min-height: 200px;\n}\n.ad-image[style*=\"background-image\"][data-v-6d87ac54] {\n    background-size: cover !important;\n    background-position: center !important;\n    background-repeat: no-repeat !important;\n}\n.ad-placeholder[data-v-6d87ac54] {\n    color: #6c757d;\n    font-size: 48px;\n    z-index: 1;\n    position: relative;\n    pointer-events: none;\n}\n.ad-overlay[data-v-6d87ac54] {\n    position: absolute;\n    bottom: 0;\n    left: 0;\n    right: 0;\n    background: linear-gradient(transparent, rgba(0, 0, 0, 0.7));\n    color: white;\n    padding: 20px;\n}\n.ad-text[data-v-6d87ac54] {\n    margin: 0;\n    font-weight: 500;\n}\n.card-title[data-v-6d87ac54] {\n    font-size: 18px;\n    font-weight: 600;\n    color: #2c3e50;\n    margin: 0 0 15px 0;\n}\n.activity-item[data-v-6d87ac54] {\n    display: flex;\n    gap: 12px;\n}\n.activity-user-avatar[data-v-6d87ac54] {\n    width: 40px;\n    height: 40px;\n    background: #e9ecef;\n    border-radius: 50%;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    color: #6c757d;\n    flex-shrink: 0;\n}\n.activity-content[data-v-6d87ac54] {\n    flex: 1;\n}\n.activity-text[data-v-6d87ac54] {\n    color: #2c3e50;\n    font-size: 14px;\n    line-height: 1.4;\n    margin-bottom: 8px;\n}\n.activity-image[data-v-6d87ac54] {\n    margin-top: 10px;\n    margin-bottom: 10px;\n}\n.activity-image img[data-v-6d87ac54] {\n    width: 100%;\n    max-width: 100%;\n    max-height: 300px;\n    -o-object-fit: cover;\n       object-fit: cover;\n    border-radius: 8px;\n    cursor: pointer;\n    transition: transform 0.3s ease;\n    border: 1px solid #e9ecef;\n}\n.activity-image img[data-v-6d87ac54]:hover {\n    transform: scale(1.02);\n    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);\n}\n.activity-time[data-v-6d87ac54] {\n    color: #6c757d;\n    font-size: 12px;\n    margin-bottom: 10px;\n}\n.activity-quote[data-v-6d87ac54] {\n    background: #f8f9fa;\n    padding: 10px;\n    border-radius: 8px;\n    border-left: 3px solid #dc3545;\n    color: #2c3e50;\n    font-size: 14px;\n    font-style: italic;\n    margin-bottom: 10px;\n}\n.activity-interactions[data-v-6d87ac54] {\n    display: flex;\n    gap: 15px;\n}\n.activity-interaction-btn[data-v-6d87ac54] {\n    background: none;\n    border: none;\n    color: #6c757d;\n    cursor: pointer;\n    display: flex;\n    align-items: center;\n    gap: 5px;\n    font-size: 12px;\n    transition: color 0.3s ease;\n}\n.activity-interaction-btn[data-v-6d87ac54]:hover {\n    color: #dc3545;\n}\n.stats-card .stat-item[data-v-6d87ac54] {\n    display: flex;\n    align-items: center;\n    gap: 10px;\n    padding: 8px 0;\n    color: #2c3e50;\n    font-size: 14px;\n}\n.stats-card .stat-item i[data-v-6d87ac54] {\n    color: #dc3545;\n    width: 20px;\n}\n\n/* Responsive Design */\n@media (max-width: 768px) {\n.content-container[data-v-6d87ac54] {\n        grid-template-columns: 1fr;\n        gap: 20px;\n}\n.group-info[data-v-6d87ac54] {\n        flex-direction: column;\n        align-items: center;\n        text-align: center;\n}\n.nav-tabs[data-v-6d87ac54] {\n        overflow-x: auto;\n        flex-wrap: nowrap;\n        margin: 5px 0;\n}\n.nav-tab[data-v-6d87ac54] {\n        min-width: 100px;\n        flex-shrink: 0;\n        padding: 10px 15px;\n        font-size: 13px;\n}\n.nav-tab span[data-v-6d87ac54] {\n        display: none;\n}\n.nav-tab i[data-v-6d87ac54] {\n        font-size: 18px;\n}\n}\n@media (max-width: 480px) {\n.nav-tab[data-v-6d87ac54] {\n        min-width: 60px;\n        padding: 8px 10px;\n}\n.group-name[data-v-6d87ac54] {\n        font-size: 24px;\n}\n.group-description[data-v-6d87ac54] {\n        font-size: 14px;\n}\n}\n\n/* Cover Photo Repositioning Styles */\n.reposition-btn[data-v-6d87ac54] {\n    position: absolute;\n    top: 15px;\n    left: 15px;\n    background: rgba(0, 0, 0, 0.7);\n    color: white;\n    border: none;\n    border-radius: 50%;\n    width: 35px;\n    height: 35px;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    cursor: pointer;\n    transition: all 0.3s ease;\n    font-size: 14px;\n}\n.reposition-btn[data-v-6d87ac54]:hover {\n    background: rgba(0, 0, 0, 0.9);\n    transform: scale(1.1);\n}\n.reposition-backdrop[data-v-6d87ac54] {\n    position: fixed;\n    top: 0;\n    left: 0;\n    right: 0;\n    bottom: 0;\n    background: rgba(0, 0, 0, 0.7);\n    z-index: 999;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    -webkit-backdrop-filter: blur(5px);\n            backdrop-filter: blur(5px);\n}\n.reposition-controls[data-v-6d87ac54] {\n    position: relative;\n    background: rgba(0, 0, 0, 0.95);\n    border-radius: 12px;\n    padding: 30px;\n    z-index: 1000;\n    min-width: 400px;\n    max-width: 90vw;\n    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);\n    -webkit-backdrop-filter: blur(10px);\n            backdrop-filter: blur(10px);\n    animation: repositionModalSlideIn-data-v-6d87ac54 0.3s ease-out;\n}\n@keyframes repositionModalSlideIn-data-v-6d87ac54 {\nfrom {\n        opacity: 0;\n        transform: scale(0.9) translateY(-20px);\n}\nto {\n        opacity: 1;\n        transform: scale(1) translateY(0);\n}\n}\n.reposition-header[data-v-6d87ac54] {\n    display: flex;\n    justify-content: space-between;\n    align-items: center;\n    width: 100%;\n    margin-bottom: 25px;\n    padding-bottom: 15px;\n    border-bottom: 1px solid rgba(255, 255, 255, 0.2);\n}\n.reposition-header h4[data-v-6d87ac54] {\n    color: white;\n    margin: 0;\n    font-size: 20px;\n    font-weight: 600;\n}\n.close-reposition[data-v-6d87ac54] {\n    background: rgba(255, 255, 255, 0.1);\n    border: none;\n    color: white;\n    font-size: 18px;\n    cursor: pointer;\n    padding: 8px;\n    border-radius: 50%;\n    transition: all 0.3s ease;\n    width: 36px;\n    height: 36px;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n}\n.close-reposition[data-v-6d87ac54]:hover {\n    background: rgba(255, 255, 255, 0.2);\n    transform: scale(1.1);\n}\n.reposition-sliders[data-v-6d87ac54] {\n    width: 100%;\n    margin-bottom: 25px;\n}\n.slider-group[data-v-6d87ac54] {\n    margin-bottom: 20px;\n}\n.slider-group label[data-v-6d87ac54] {\n    display: block;\n    color: white;\n    font-size: 14px;\n    margin-bottom: 8px;\n    font-weight: 500;\n}\n.position-slider[data-v-6d87ac54] {\n    width: 100%;\n    height: 8px;\n    border-radius: 4px;\n    background: rgba(255, 255, 255, 0.2);\n    outline: none;\n    -webkit-appearance: none;\n    -moz-appearance: none;\n         appearance: none;\n    transition: all 0.3s ease;\n}\n.position-slider[data-v-6d87ac54]:hover {\n    background: rgba(255, 255, 255, 0.3);\n}\n.position-slider[data-v-6d87ac54]::-webkit-slider-thumb {\n    -webkit-appearance: none;\n    appearance: none;\n    width: 24px;\n    height: 24px;\n    border-radius: 50%;\n    background: #dc3545;\n    cursor: pointer;\n    border: 3px solid white;\n    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);\n    -webkit-transition: all 0.3s ease;\n    transition: all 0.3s ease;\n}\n.position-slider[data-v-6d87ac54]::-webkit-slider-thumb:hover {\n    transform: scale(1.1);\n    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.4);\n}\n.position-slider[data-v-6d87ac54]::-moz-range-thumb {\n    width: 24px;\n    height: 24px;\n    border-radius: 50%;\n    background: #dc3545;\n    cursor: pointer;\n    border: 3px solid white;\n    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);\n}\n.position-value[data-v-6d87ac54] {\n    color: white;\n    font-size: 14px;\n    font-weight: 600;\n    margin-left: 12px;\n    background: rgba(255, 255, 255, 0.1);\n    padding: 4px 8px;\n    border-radius: 4px;\n    min-width: 50px;\n    text-align: center;\n}\n.reposition-actions[data-v-6d87ac54] {\n    display: flex;\n    gap: 15px;\n    width: 100%;\n    margin-top: 10px;\n}\n.reposition-actions .btn[data-v-6d87ac54] {\n    flex: 1;\n    padding: 12px 24px;\n    border: none;\n    border-radius: 8px;\n    font-weight: 600;\n    cursor: pointer;\n    transition: all 0.3s ease;\n    font-size: 14px;\n}\n.reposition-actions .btn-secondary[data-v-6d87ac54] {\n    background: rgba(255, 255, 255, 0.1);\n    color: white;\n    border: 1px solid rgba(255, 255, 255, 0.3);\n}\n.reposition-actions .btn-secondary[data-v-6d87ac54]:hover {\n    background: rgba(255, 255, 255, 0.2);\n    transform: translateY(-2px);\n    box-shadow: 0 4px 12px rgba(255, 255, 255, 0.1);\n}\n.reposition-actions .btn-primary[data-v-6d87ac54] {\n    background: #dc3545;\n    color: white;\n}\n.reposition-actions .btn-primary[data-v-6d87ac54]:hover {\n    background: #c82333;\n    transform: translateY(-2px);\n    box-shadow: 0 6px 16px rgba(220, 53, 69, 0.4);\n}\n\n/* Responsive adjustments for repositioning */\n@media (max-width: 768px) {\n.reposition-controls[data-v-6d87ac54] {\n        padding: 20px;\n        min-width: 320px;\n        margin: 20px;\n}\n.reposition-header h4[data-v-6d87ac54] {\n        font-size: 18px;\n}\n.reposition-sliders[data-v-6d87ac54] {\n        margin-bottom: 20px;\n}\n.slider-group[data-v-6d87ac54] {\n        margin-bottom: 18px;\n}\n.reposition-actions[data-v-6d87ac54] {\n        gap: 12px;\n}\n.reposition-actions .btn[data-v-6d87ac54] {\n        padding: 10px 20px;\n        font-size: 13px;\n}\n}\n\n/* Poll Modal Styles */\n.poll-modal-overlay[data-v-6d87ac54] {\n    position: fixed;\n    top: 0;\n    left: 0;\n    width: 100%;\n    height: 100%;\n    background: rgba(0, 0, 0, 0.5);\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    z-index: 1000;\n    -webkit-backdrop-filter: blur(4px);\n            backdrop-filter: blur(4px);\n}\n.poll-modal[data-v-6d87ac54] {\n    background: white;\n    border-radius: 12px;\n    width: 90%;\n    max-width: 500px;\n    max-height: 90vh;\n    overflow-y: auto;\n    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);\n    animation: pollModalSlideIn-data-v-6d87ac54 0.3s ease-out;\n}\n@keyframes pollModalSlideIn-data-v-6d87ac54 {\nfrom {\n        opacity: 0;\n        transform: scale(0.9) translateY(-20px);\n}\nto {\n        opacity: 1;\n        transform: scale(1) translateY(0);\n}\n}\n.poll-modal-header[data-v-6d87ac54] {\n    display: flex;\n    justify-content: space-between;\n    align-items: center;\n    padding: 20px 24px;\n    border-bottom: 1px solid #e9ecef;\n}\n.poll-modal-header h3[data-v-6d87ac54] {\n    margin: 0;\n    font-size: 20px;\n    font-weight: 600;\n    color: #252525;\n}\n.poll-modal-close[data-v-6d87ac54] {\n    background: none;\n    border: none;\n    font-size: 18px;\n    color: #6c757d;\n    cursor: pointer;\n    padding: 8px;\n    border-radius: 50%;\n    transition: all 0.2s ease;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    width: 32px;\n    height: 32px;\n}\n.poll-modal-close[data-v-6d87ac54]:hover {\n    background: #f8f9fa;\n    color: #495057;\n}\n.poll-modal-body[data-v-6d87ac54] {\n    padding: 24px;\n}\n.poll-form-group[data-v-6d87ac54] {\n    margin-bottom: 20px;\n}\n.poll-form-group label[data-v-6d87ac54] {\n    display: block;\n    margin-bottom: 8px;\n    font-weight: 500;\n    color: #495057;\n    font-size: 14px;\n}\n.poll-input[data-v-6d87ac54] {\n    width: 100%;\n    padding: 12px 16px;\n    border: 1px solid #dcdcdc;\n    border-radius: 8px;\n    font-size: 14px;\n    color: #495057;\n    background: #f8f9fa;\n    transition: all 0.2s ease;\n    box-sizing: border-box;\n}\n.poll-input[data-v-6d87ac54]:focus {\n    outline: none;\n    border-color: #dc3545;\n    background: white;\n    box-shadow: 0 0 0 3px rgba(220, 53, 69, 0.1);\n}\n.poll-input[data-v-6d87ac54]::-moz-placeholder {\n    color: #adb5bd;\n}\n.poll-input[data-v-6d87ac54]::placeholder {\n    color: #adb5bd;\n}\n.poll-modal-footer[data-v-6d87ac54] {\n    padding: 20px 24px;\n    border-top: 1px solid #e9ecef;\n    display: flex;\n    justify-content: flex-start;\n}\n.poll-submit-btn[data-v-6d87ac54] {\n    background: #dc3545;\n    color: white;\n    border: none;\n    padding: 12px 24px;\n    border-radius: 8px;\n    font-size: 14px;\n    font-weight: 500;\n    cursor: pointer;\n    transition: all 0.2s ease;\n}\n.poll-submit-btn[data-v-6d87ac54]:hover {\n    background: #c82333;\n    transform: translateY(-1px);\n    box-shadow: 0 4px 12px rgba(220, 53, 69, 0.3);\n}\n.poll-submit-btn[data-v-6d87ac54]:active {\n    transform: translateY(0);\n}\n\n/* Responsive adjustments for poll modal */\n@media (max-width: 768px) {\n.poll-modal[data-v-6d87ac54] {\n        width: 95%;\n        margin: 20px;\n}\n.poll-modal-header[data-v-6d87ac54],\n    .poll-modal-body[data-v-6d87ac54],\n    .poll-modal-footer[data-v-6d87ac54] {\n        padding: 16px 20px;\n}\n.poll-modal-header h3[data-v-6d87ac54] {\n        font-size: 18px;\n}\n.poll-input[data-v-6d87ac54] {\n        padding: 10px 14px;\n        font-size: 16px; /* Prevents zoom on iOS */\n}\n}\n\n/* Polls Feed Styles */\n.polls-feed[data-v-6d87ac54] {\n    display: flex;\n    flex-direction: column;\n    gap: 20px;\n}\n.poll-card[data-v-6d87ac54] {\n    background: white;\n    border-radius: 12px;\n    padding: 20px;\n    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);\n    border: 1px solid #e9ecef;\n    transition: all 0.3s ease;\n}\n.poll-card[data-v-6d87ac54]:hover {\n    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);\n    transform: translateY(-2px);\n}\n.poll-header[data-v-6d87ac54] {\n    display: flex;\n    justify-content: space-between;\n    align-items: center;\n    margin-bottom: 16px;\n}\n.poll-user-info[data-v-6d87ac54] {\n    display: flex;\n    align-items: center;\n    gap: 12px;\n}\n.poll-content[data-v-6d87ac54] {\n    margin-top: 16px;\n}\n.poll-title[data-v-6d87ac54] {\n    font-size: 18px;\n    font-weight: 600;\n    color: #252525;\n    margin: 0 0 20px 0;\n    line-height: 1.4;\n}\n.poll-options[data-v-6d87ac54] {\n    display: flex;\n    flex-direction: column;\n    gap: 12px;\n    margin-bottom: 16px;\n}\n.poll-option[data-v-6d87ac54] {\n    position: relative;\n}\n.poll-option-btn[data-v-6d87ac54] {\n    width: 100%;\n    background: #f8f9fa;\n    border: 2px solid #e9ecef;\n    border-radius: 8px;\n    padding: 16px;\n    text-align: left;\n    cursor: pointer;\n    transition: all 0.3s ease;\n    display: flex;\n    justify-content: space-between;\n    align-items: center;\n    font-size: 16px;\n    color: #495057;\n}\n.poll-option-btn[data-v-6d87ac54]:hover:not(:disabled) {\n    background: #e9ecef;\n    border-color: #dc3545;\n    transform: translateY(-1px);\n}\n.poll-option-btn[data-v-6d87ac54]:disabled {\n    cursor: not-allowed;\n    opacity: 0.7;\n}\n.poll-option-btn.voted[data-v-6d87ac54] {\n    background: #dc3545;\n    color: white;\n    border-color: #dc3545;\n}\n.option-text[data-v-6d87ac54] {\n    font-weight: 500;\n    flex: 1;\n}\n.option-stats[data-v-6d87ac54] {\n    display: flex;\n    align-items: center;\n    gap: 8px;\n    font-size: 14px;\n    opacity: 0.8;\n}\n.vote-count[data-v-6d87ac54] {\n    font-weight: 600;\n}\n.vote-percentage[data-v-6d87ac54] {\n    font-weight: 500;\n}\n.vote-bar[data-v-6d87ac54] {\n    position: absolute;\n    bottom: 0;\n    left: 0;\n    right: 0;\n    height: 4px;\n    background: rgba(255, 255, 255, 0.3);\n    border-radius: 0 0 8px 8px;\n    overflow: hidden;\n}\n.vote-progress[data-v-6d87ac54] {\n    height: 100%;\n    background: rgba(255, 255, 255, 0.8);\n    transition: width 0.5s ease;\n    border-radius: 0 0 8px 8px;\n}\n.poll-footer[data-v-6d87ac54] {\n    display: flex;\n    justify-content: space-between;\n    align-items: center;\n    padding-top: 16px;\n    border-top: 1px solid #e9ecef;\n    font-size: 14px;\n    color: #6c757d;\n}\n.total-votes[data-v-6d87ac54] {\n    font-weight: 500;\n}\n\n/* Responsive adjustments for polls */\n@media (max-width: 768px) {\n.poll-card[data-v-6d87ac54] {\n        padding: 16px;\n}\n.poll-title[data-v-6d87ac54] {\n        font-size: 16px;\n}\n.poll-option-btn[data-v-6d87ac54] {\n        padding: 12px;\n        font-size: 14px;\n}\n.option-stats[data-v-6d87ac54] {\n        font-size: 12px;\n}\n}\n\n/* Poll Actions Styles */\n.poll-actions[data-v-6d87ac54] {\n    display: flex;\n    gap: 8px;\n    align-items: center;\n}\n.poll-actions .action-btn[data-v-6d87ac54] {\n    background: transparent;\n    border: none;\n    color: #6c757d;\n    cursor: pointer;\n    padding: 6px 10px;\n    border-radius: 6px;\n    transition: all 0.2s ease;\n    font-size: 14px;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n}\n.poll-actions .action-btn[data-v-6d87ac54]:hover {\n    background: #f8f9fa;\n    color: #dc3545;\n}\n.poll-actions .action-btn[data-v-6d87ac54]:disabled {\n    opacity: 0.6;\n    cursor: not-allowed;\n}\n.poll-actions .action-btn i[data-v-6d87ac54] {\n    font-size: 14px;\n}\n\n/* Edit Poll Modal Styles */\n.edit-poll-modal-overlay[data-v-6d87ac54] {\n    position: fixed;\n    top: 0;\n    left: 0;\n    width: 100%;\n    height: 100%;\n    background: rgba(0, 0, 0, 0.5);\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    z-index: 1001;\n    -webkit-backdrop-filter: blur(4px);\n            backdrop-filter: blur(4px);\n}\n.edit-poll-modal[data-v-6d87ac54] {\n    background: white;\n    border-radius: 12px;\n    width: 90%;\n    max-width: 500px;\n    max-height: 90vh;\n    overflow-y: auto;\n    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);\n    animation: editPollModalSlideIn-data-v-6d87ac54 0.3s ease-out;\n}\n@keyframes editPollModalSlideIn-data-v-6d87ac54 {\nfrom {\n        opacity: 0;\n        transform: scale(0.9) translateY(-20px);\n}\nto {\n        opacity: 1;\n        transform: scale(1) translateY(0);\n}\n}\n.edit-poll-modal-header[data-v-6d87ac54] {\n    display: flex;\n    justify-content: space-between;\n    align-items: center;\n    padding: 20px 24px;\n    border-bottom: 1px solid #e9ecef;\n}\n.edit-poll-modal-header h3[data-v-6d87ac54] {\n    margin: 0;\n    font-size: 20px;\n    font-weight: 600;\n    color: #252525;\n}\n.edit-poll-modal-close[data-v-6d87ac54] {\n    background: none;\n    border: none;\n    font-size: 20px;\n    color: #6c757d;\n    cursor: pointer;\n    padding: 4px 8px;\n    border-radius: 4px;\n    transition: all 0.2s ease;\n}\n.edit-poll-modal-close[data-v-6d87ac54]:hover {\n    background: #f8f9fa;\n    color: #dc3545;\n}\n.edit-poll-modal-body[data-v-6d87ac54] {\n    padding: 24px;\n}\n.edit-poll-form-group[data-v-6d87ac54] {\n    margin-bottom: 20px;\n}\n.edit-poll-form-group label[data-v-6d87ac54] {\n    display: block;\n    margin-bottom: 8px;\n    font-size: 14px;\n    font-weight: 500;\n    color: #495057;\n}\n.edit-poll-input[data-v-6d87ac54] {\n    width: 100%;\n    padding: 12px 16px;\n    border: 2px solid #e9ecef;\n    border-radius: 8px;\n    font-size: 14px;\n    color: #252525;\n    background: #f8f9fa;\n    transition: all 0.2s ease;\n    box-sizing: border-box;\n}\n.edit-poll-input[data-v-6d87ac54]:focus {\n    outline: none;\n    border-color: #dc3545;\n    background: white;\n    box-shadow: 0 0 0 3px rgba(220, 53, 69, 0.1);\n}\n.edit-poll-input[data-v-6d87ac54]::-moz-placeholder {\n    color: #adb5bd;\n}\n.edit-poll-input[data-v-6d87ac54]::placeholder {\n    color: #adb5bd;\n}\n.edit-poll-modal-footer[data-v-6d87ac54] {\n    padding: 20px 24px;\n    border-top: 1px solid #e9ecef;\n    display: flex;\n    justify-content: flex-end;\n    gap: 12px;\n}\n.edit-poll-cancel-btn[data-v-6d87ac54] {\n    background: #f8f9fa;\n    color: #6c757d;\n    border: 2px solid #e9ecef;\n    padding: 12px 24px;\n    border-radius: 8px;\n    font-size: 14px;\n    font-weight: 500;\n    cursor: pointer;\n    transition: all 0.2s ease;\n}\n.edit-poll-cancel-btn[data-v-6d87ac54]:hover {\n    background: #e9ecef;\n    color: #495057;\n}\n.edit-poll-save-btn[data-v-6d87ac54] {\n    background: #dc3545;\n    color: white;\n    border: none;\n    padding: 12px 24px;\n    border-radius: 8px;\n    font-size: 14px;\n    font-weight: 500;\n    cursor: pointer;\n    transition: all 0.2s ease;\n}\n.edit-poll-save-btn[data-v-6d87ac54]:hover {\n    background: #c82333;\n    transform: translateY(-1px);\n    box-shadow: 0 4px 8px rgba(220, 53, 69, 0.3);\n}\n.edit-poll-save-btn[data-v-6d87ac54]:active {\n    transform: translateY(0);\n}\n\n/* Widget Styles */\n.widget-container[data-v-6d87ac54] {\n    margin-bottom: 20px;\n}\n.widget-header[data-v-6d87ac54] {\n    display: flex;\n    justify-content: space-between;\n    align-items: center;\n    margin-bottom: 15px;\n}\n.widget-edit-btn[data-v-6d87ac54] {\n    background: none;\n    border: none;\n    color: #6c757d;\n    cursor: pointer;\n    padding: 5px;\n    border-radius: 4px;\n    transition: all 0.3s ease;\n}\n.widget-edit-btn[data-v-6d87ac54]:hover {\n    background: #f8f9fa;\n    color: #dc3545;\n}\n.widget-actions-overlay[data-v-6d87ac54] {\n    position: absolute;\n    top: 10px;\n    right: 10px;\n    display: flex;\n    gap: 8px;\n    opacity: 0;\n    transition: opacity 0.3s ease;\n    z-index: 10;\n}\n.ad-card:hover .widget-actions-overlay[data-v-6d87ac54] {\n    opacity: 1;\n}\n.widget-action-btn[data-v-6d87ac54] {\n    background: rgba(0, 0, 0, 0.7);\n    color: white;\n    border: none;\n    padding: 8px;\n    border-radius: 4px;\n    cursor: pointer;\n    transition: all 0.3s ease;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    width: 32px;\n    height: 32px;\n    font-size: 14px;\n}\n.widget-action-btn[data-v-6d87ac54]:hover:not(:disabled) {\n    background: rgba(0, 0, 0, 0.9);\n    transform: scale(1.1);\n}\n.widget-action-btn[data-v-6d87ac54]:disabled {\n    opacity: 0.6;\n    cursor: not-allowed;\n}\n.widget-delete-btn[data-v-6d87ac54]:hover:not(:disabled) {\n    background: rgba(220, 53, 69, 0.9);\n}\n.widget-header-actions[data-v-6d87ac54] {\n    display: flex;\n    gap: 8px;\n    align-items: center;\n}\n.widget-delete-btn-header[data-v-6d87ac54] {\n    background: none;\n    border: none;\n    color: #6c757d;\n    cursor: pointer;\n    padding: 5px;\n    border-radius: 4px;\n    transition: all 0.3s ease;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    width: 28px;\n    height: 28px;\n}\n.widget-delete-btn-header[data-v-6d87ac54]:hover:not(:disabled) {\n    background: #fff5f5;\n    color: #dc3545;\n}\n.widget-delete-btn-header[data-v-6d87ac54]:disabled {\n    opacity: 0.5;\n    cursor: not-allowed;\n}\n.add-widget-section[data-v-6d87ac54] {\n    margin-bottom: 20px;\n}\n.add-widget-btn[data-v-6d87ac54] {\n    width: 100%;\n    background: #dc3545;\n    color: white;\n    border: none;\n    padding: 12px;\n    border-radius: 8px;\n    cursor: pointer;\n    font-size: 14px;\n    font-weight: 500;\n    transition: all 0.3s ease;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    gap: 8px;\n}\n.add-widget-btn[data-v-6d87ac54]:hover {\n    background: #c82333;\n    transform: translateY(-1px);\n    box-shadow: 0 4px 12px rgba(220, 53, 69, 0.3);\n}\n\n/* Widget Modal Styles */\n.widget-modal-overlay[data-v-6d87ac54] {\n    position: fixed;\n    top: 0;\n    left: 0;\n    width: 100%;\n    height: 100%;\n    background: rgba(0, 0, 0, 0.5);\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    z-index: 1002;\n    -webkit-backdrop-filter: blur(4px);\n            backdrop-filter: blur(4px);\n}\n.widget-modal[data-v-6d87ac54] {\n    background: white;\n    border-radius: 12px;\n    width: 90%;\n    max-width: 600px;\n    max-height: 90vh;\n    overflow-y: auto;\n    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);\n    animation: widgetModalSlideIn-data-v-6d87ac54 0.3s ease-out;\n}\n@keyframes widgetModalSlideIn-data-v-6d87ac54 {\nfrom {\n        opacity: 0;\n        transform: scale(0.9) translateY(-20px);\n}\nto {\n        opacity: 1;\n        transform: scale(1) translateY(0);\n}\n}\n.widget-modal-header[data-v-6d87ac54] {\n    display: flex;\n    justify-content: space-between;\n    align-items: center;\n    padding: 20px 24px;\n    border-bottom: 1px solid #e9ecef;\n}\n.widget-modal-header h3[data-v-6d87ac54] {\n    margin: 0;\n    font-size: 20px;\n    font-weight: 600;\n    color: #252525;\n}\n.widget-modal-close[data-v-6d87ac54] {\n    background: none;\n    border: none;\n    font-size: 18px;\n    color: #6c757d;\n    cursor: pointer;\n    padding: 8px;\n    border-radius: 50%;\n    transition: all 0.2s ease;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    width: 32px;\n    height: 32px;\n}\n.widget-modal-close[data-v-6d87ac54]:hover {\n    background: #f8f9fa;\n    color: #495057;\n}\n.widget-modal-body[data-v-6d87ac54] {\n    padding: 24px;\n}\n.widget-form-group[data-v-6d87ac54] {\n    margin-bottom: 20px;\n}\n.widget-form-group label[data-v-6d87ac54] {\n    display: block;\n    margin-bottom: 8px;\n    font-weight: 500;\n    color: #495057;\n    font-size: 14px;\n}\n.widget-input[data-v-6d87ac54],\n.widget-textarea[data-v-6d87ac54] {\n    width: 100%;\n    padding: 12px 16px;\n    border: 1px solid #dcdcdc;\n    border-radius: 8px;\n    font-size: 14px;\n    color: #495057;\n    background: #f8f9fa;\n    transition: all 0.2s ease;\n    box-sizing: border-box;\n    font-family: inherit;\n}\n.widget-textarea[data-v-6d87ac54] {\n    resize: vertical;\n    min-height: 100px;\n}\n.widget-input[data-v-6d87ac54]:focus,\n.widget-textarea[data-v-6d87ac54]:focus {\n    outline: none;\n    border-color: #dc3545;\n    background: white;\n    box-shadow: 0 0 0 3px rgba(220, 53, 69, 0.1);\n}\n.widget-input[data-v-6d87ac54]::-moz-placeholder, .widget-textarea[data-v-6d87ac54]::-moz-placeholder {\n    color: #adb5bd;\n}\n.widget-input[data-v-6d87ac54]::placeholder,\n.widget-textarea[data-v-6d87ac54]::placeholder {\n    color: #adb5bd;\n}\n.widget-checkbox-label[data-v-6d87ac54] {\n    display: flex;\n    align-items: center;\n    gap: 8px;\n    cursor: pointer;\n}\n.widget-checkbox-label input[type=\"checkbox\"][data-v-6d87ac54] {\n    width: 18px;\n    height: 18px;\n    cursor: pointer;\n}\n.widget-image-preview[data-v-6d87ac54] {\n    position: relative;\n    margin-top: 10px;\n    display: inline-block;\n}\n.widget-image-preview img[data-v-6d87ac54] {\n    max-width: 200px;\n    max-height: 200px;\n    border-radius: 8px;\n    border: 1px solid #e9ecef;\n}\n.widget-modal-footer[data-v-6d87ac54] {\n    padding: 20px 24px;\n    border-top: 1px solid #e9ecef;\n    display: flex;\n    justify-content: flex-end;\n    gap: 12px;\n}\n.widget-cancel-btn[data-v-6d87ac54] {\n    background: #f8f9fa;\n    color: #6c757d;\n    border: 2px solid #e9ecef;\n    padding: 12px 24px;\n    border-radius: 8px;\n    font-size: 14px;\n    font-weight: 500;\n    cursor: pointer;\n    transition: all 0.2s ease;\n}\n.widget-cancel-btn[data-v-6d87ac54]:hover {\n    background: #e9ecef;\n    color: #495057;\n}\n.widget-save-btn[data-v-6d87ac54] {\n    background: #dc3545;\n    color: white;\n    border: none;\n    padding: 12px 24px;\n    border-radius: 8px;\n    font-size: 14px;\n    font-weight: 500;\n    cursor: pointer;\n    transition: all 0.2s ease;\n}\n.widget-save-btn[data-v-6d87ac54]:hover {\n    background: #c82333;\n    transform: translateY(-1px);\n    box-shadow: 0 4px 12px rgba(220, 53, 69, 0.3);\n}\n.widget-save-btn[data-v-6d87ac54]:active {\n    transform: translateY(0);\n}\n\n/* Make widgets clickable */\n.ad-card[data-v-6d87ac54] {\n    cursor: pointer;\n    transition: transform 0.2s ease;\n}\n.ad-card[data-v-6d87ac54]:hover {\n    transform: translateY(-2px);\n}\n.activity-card[data-v-6d87ac54] {\n    cursor: pointer;\n    transition: transform 0.2s ease;\n}\n.activity-card[data-v-6d87ac54]:hover {\n    transform: translateY(-2px);\n}\n\n/* Video Tutorial Modal Styles */\n.video-tutorial-modal[data-v-6d87ac54] {\n.modal-content {\n        border: none;\n        border-radius: 16px;\n        box-shadow: 0 10px 15px rgba(0, 0, 0, 0.2);\n}\n.modal-header {\n        background: #f5f5f3;\n        color: #252525;\n        border-bottom: none;\n        padding: 1.5rem 2rem;\n.modal-title {\n            font-family: \"Inter\", Arial, sans-serif;\n            font-size: 1.5rem;\n            font-weight: 600;\n            margin: 0;\n}\n}\n.modal-body {\n        padding: 2rem;\n        background: #f5f5f3;\n        color: #252525;\n}\n.video-container {\n        position: relative;\n.video-loading-overlay {\n            position: absolute;\n            top: 0;\n            left: 0;\n            right: 0;\n            bottom: 0;\n            background: rgba(245, 245, 243, 0.9);\n            display: flex;\n            align-items: center;\n            justify-content: center;\n            z-index: 10;\n            border-radius: 8px;\n}\nvideo {\n            border-radius: 8px;\n            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);\n            background: #000;\n            display: block;\n}\n}\n}\n.help-btn[data-v-6d87ac54] {\n    background: white;\n    color: #252525;\n    border: 1px solid #dcdcdc;\n    padding: 5px 10px;\n    border-radius: 5px;\n    cursor: pointer;\n    display: flex;\n    align-items: center;\n    gap: 5px;\n    transition: all 0.3s ease;\n    font-size: 14px;\n}\n.help-btn[data-v-6d87ac54]:hover {\n    transform: scale(1.1);\n    background: #f8f9fa;\n}\n", ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/Community/community.vue?vue&type=style&index=0&id=6d87ac54&scoped=true&lang=css":
/*!*******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/Community/community.vue?vue&type=style&index=0&id=6d87ac54&scoped=true&lang=css ***!
  \*******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../../../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_clonedRuleSet_9_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_9_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_community_vue_vue_type_style_index_0_id_6d87ac54_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !!../../../../../../node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!../../../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!../../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./community.vue?vue&type=style&index=0&id=6d87ac54&scoped=true&lang=css */ "./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/Community/community.vue?vue&type=style&index=0&id=6d87ac54&scoped=true&lang=css");

            

var options = {};

options.insert = "head";
options.singleton = false;

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_clonedRuleSet_9_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_9_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_community_vue_vue_type_style_index_0_id_6d87ac54_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_1__["default"], options);



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_clonedRuleSet_9_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_9_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_community_vue_vue_type_style_index_0_id_6d87ac54_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_1__["default"].locals || {});

/***/ }),

/***/ "./resources/src/views/app/pages/Community/community.vue":
/*!***************************************************************!*\
  !*** ./resources/src/views/app/pages/Community/community.vue ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _community_vue_vue_type_template_id_6d87ac54_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./community.vue?vue&type=template&id=6d87ac54&scoped=true */ "./resources/src/views/app/pages/Community/community.vue?vue&type=template&id=6d87ac54&scoped=true");
/* harmony import */ var _community_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./community.vue?vue&type=script&lang=js */ "./resources/src/views/app/pages/Community/community.vue?vue&type=script&lang=js");
/* harmony import */ var _community_vue_vue_type_style_index_0_id_6d87ac54_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./community.vue?vue&type=style&index=0&id=6d87ac54&scoped=true&lang=css */ "./resources/src/views/app/pages/Community/community.vue?vue&type=style&index=0&id=6d87ac54&scoped=true&lang=css");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");



;


/* normalize component */

var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _community_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__["default"],
  _community_vue_vue_type_template_id_6d87ac54_scoped_true__WEBPACK_IMPORTED_MODULE_0__.render,
  _community_vue_vue_type_template_id_6d87ac54_scoped_true__WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  "6d87ac54",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/src/views/app/pages/Community/community.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./resources/src/views/app/pages/Community/community.vue?vue&type=script&lang=js":
/*!***************************************************************************************!*\
  !*** ./resources/src/views/app/pages/Community/community.vue?vue&type=script&lang=js ***!
  \***************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_community_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./community.vue?vue&type=script&lang=js */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/Community/community.vue?vue&type=script&lang=js");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_community_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/src/views/app/pages/Community/community.vue?vue&type=style&index=0&id=6d87ac54&scoped=true&lang=css":
/*!***********************************************************************************************************************!*\
  !*** ./resources/src/views/app/pages/Community/community.vue?vue&type=style&index=0&id=6d87ac54&scoped=true&lang=css ***!
  \***********************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_dist_cjs_js_node_modules_css_loader_dist_cjs_js_clonedRuleSet_9_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_9_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_community_vue_vue_type_style_index_0_id_6d87ac54_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/style-loader/dist/cjs.js!../../../../../../node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!../../../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!../../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./community.vue?vue&type=style&index=0&id=6d87ac54&scoped=true&lang=css */ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/Community/community.vue?vue&type=style&index=0&id=6d87ac54&scoped=true&lang=css");


/***/ }),

/***/ "./resources/src/views/app/pages/Community/community.vue?vue&type=template&id=6d87ac54&scoped=true":
/*!*********************************************************************************************************!*\
  !*** ./resources/src/views/app/pages/Community/community.vue?vue&type=template&id=6d87ac54&scoped=true ***!
  \*********************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_community_vue_vue_type_template_id_6d87ac54_scoped_true__WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   staticRenderFns: () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_community_vue_vue_type_template_id_6d87ac54_scoped_true__WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_community_vue_vue_type_template_id_6d87ac54_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./community.vue?vue&type=template&id=6d87ac54&scoped=true */ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/Community/community.vue?vue&type=template&id=6d87ac54&scoped=true");


/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/Community/community.vue?vue&type=template&id=6d87ac54&scoped=true":
/*!************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/Community/community.vue?vue&type=template&id=6d87ac54&scoped=true ***!
  \************************************************************************************************************************************************************************************************************************************************/
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
    { staticClass: "community-page" },
    [
      _c("div", { staticClass: "group-banner" }, [
        _c(
          "div",
          {
            ref: "coverPhoto",
            staticClass: "cover-photo",
            class: { "drag-over": _vm.isDragOver },
            on: {
              click: _vm.toggleRepositionMode,
              dragover: function ($event) {
                $event.preventDefault()
                return _vm.handleDragOver.apply(null, arguments)
              },
              dragenter: function ($event) {
                $event.preventDefault()
                return _vm.handleDragEnter.apply(null, arguments)
              },
              dragleave: function ($event) {
                $event.preventDefault()
                return _vm.handleDragLeave.apply(null, arguments)
              },
              drop: function ($event) {
                $event.preventDefault()
                return _vm.handleCoverPhotoDrop.apply(null, arguments)
              },
            },
          },
          [
            _c(
              "button",
              {
                staticClass: "edit-cover-btn",
                attrs: { title: "Edit cover photo" },
                on: {
                  click: function ($event) {
                    $event.stopPropagation()
                    return _vm.editCoverPhoto.apply(null, arguments)
                  },
                },
              },
              [_c("i", { staticClass: "fas fa-pencil-alt" })]
            ),
            _vm._v(" "),
            _vm.isDragOver
              ? _c("div", { staticClass: "drag-overlay" }, [_vm._m(0)])
              : _vm._e(),
            _vm._v(" "),
            !_vm.hasCoverPhoto && !_vm.isDragOver
              ? _c("div", { staticClass: "no-cover-message" }, [
                  _c("i", { staticClass: "fas fa-image" }),
                  _vm._v(" "),
                  _c("p", [_vm._v("Drag & drop a cover photo here")]),
                  _vm._v(" "),
                  _c("small", [_vm._v("or click to upload")]),
                ])
              : _vm._e(),
            _vm._v(" "),
            _vm.isRepositioning
              ? _c(
                  "div",
                  {
                    staticClass: "reposition-backdrop",
                    on: { click: _vm.cancelReposition },
                  },
                  [
                    _c(
                      "div",
                      {
                        staticClass: "reposition-controls",
                        on: {
                          click: function ($event) {
                            $event.stopPropagation()
                          },
                        },
                      },
                      [
                        _c("div", { staticClass: "reposition-header" }, [
                          _c("h4", [_vm._v("Reposition Cover Photo")]),
                          _vm._v(" "),
                          _c(
                            "button",
                            {
                              staticClass: "close-reposition",
                              on: { click: _vm.cancelReposition },
                            },
                            [_c("i", { staticClass: "fas fa-times" })]
                          ),
                        ]),
                        _vm._v(" "),
                        _c("div", { staticClass: "reposition-sliders" }, [
                          _c("div", { staticClass: "slider-group" }, [
                            _c("label", [_vm._v("Vertical Position")]),
                            _vm._v(" "),
                            _c("input", {
                              directives: [
                                {
                                  name: "model",
                                  rawName: "v-model",
                                  value: _vm.coverPosition.y,
                                  expression: "coverPosition.y",
                                },
                              ],
                              staticClass: "position-slider",
                              attrs: { type: "range", min: "0", max: "100" },
                              domProps: { value: _vm.coverPosition.y },
                              on: {
                                input: _vm.updateCoverPosition,
                                __r: function ($event) {
                                  return _vm.$set(
                                    _vm.coverPosition,
                                    "y",
                                    $event.target.value
                                  )
                                },
                              },
                            }),
                            _vm._v(" "),
                            _c("span", { staticClass: "position-value" }, [
                              _vm._v(_vm._s(_vm.coverPosition.y) + "%"),
                            ]),
                          ]),
                          _vm._v(" "),
                          _c("div", { staticClass: "slider-group" }, [
                            _c("label", [_vm._v("Horizontal Position")]),
                            _vm._v(" "),
                            _c("input", {
                              directives: [
                                {
                                  name: "model",
                                  rawName: "v-model",
                                  value: _vm.coverPosition.x,
                                  expression: "coverPosition.x",
                                },
                              ],
                              staticClass: "position-slider",
                              attrs: { type: "range", min: "0", max: "100" },
                              domProps: { value: _vm.coverPosition.x },
                              on: {
                                input: _vm.updateCoverPosition,
                                __r: function ($event) {
                                  return _vm.$set(
                                    _vm.coverPosition,
                                    "x",
                                    $event.target.value
                                  )
                                },
                              },
                            }),
                            _vm._v(" "),
                            _c("span", { staticClass: "position-value" }, [
                              _vm._v(_vm._s(_vm.coverPosition.x) + "%"),
                            ]),
                          ]),
                          _vm._v(" "),
                          _c("div", { staticClass: "slider-group" }, [
                            _c("label", [_vm._v("Zoom Level")]),
                            _vm._v(" "),
                            _c("input", {
                              directives: [
                                {
                                  name: "model",
                                  rawName: "v-model",
                                  value: _vm.coverPosition.scale,
                                  expression: "coverPosition.scale",
                                },
                              ],
                              staticClass: "position-slider",
                              attrs: { type: "range", min: "100", max: "200" },
                              domProps: { value: _vm.coverPosition.scale },
                              on: {
                                input: _vm.updateCoverPosition,
                                __r: function ($event) {
                                  return _vm.$set(
                                    _vm.coverPosition,
                                    "scale",
                                    $event.target.value
                                  )
                                },
                              },
                            }),
                            _vm._v(" "),
                            _c("span", { staticClass: "position-value" }, [
                              _vm._v(_vm._s(_vm.coverPosition.scale) + "%"),
                            ]),
                          ]),
                        ]),
                        _vm._v(" "),
                        _c("div", { staticClass: "reposition-actions" }, [
                          _c(
                            "button",
                            {
                              staticClass: "btn btn-secondary",
                              on: { click: _vm.resetCoverPosition },
                            },
                            [_vm._v("Reset")]
                          ),
                          _vm._v(" "),
                          _c(
                            "button",
                            {
                              staticClass: "btn btn-primary",
                              on: { click: _vm.saveCoverPosition },
                            },
                            [_vm._v("Save Position")]
                          ),
                        ]),
                      ]
                    ),
                  ]
                )
              : _vm._e(),
            _vm._v(" "),
            _vm.hasCoverPhoto && !_vm.isRepositioning
              ? _c(
                  "button",
                  {
                    staticClass: "reposition-btn",
                    attrs: { title: "Reposition cover photo" },
                    on: {
                      click: function ($event) {
                        $event.stopPropagation()
                        return _vm.startRepositioning.apply(null, arguments)
                      },
                    },
                  },
                  [_c("i", { staticClass: "fas fa-arrows-alt" })]
                )
              : _vm._e(),
          ]
        ),
        _vm._v(" "),
        _c("div", { staticClass: "group-info-section" }, [
          _c("div", { staticClass: "group-info" }, [
            _vm._m(1),
            _vm._v(" "),
            _c("div", { staticClass: "group-details" }, [
              _c("h1", { staticClass: "group-name" }, [
                _vm._v("Thorstrengthfitness"),
              ]),
              _vm._v(" "),
              _c("p", { staticClass: "group-description" }, [
                _vm._v(
                  "\n                        Check this group for daily updates, promotions and deals to stay in the loop with Thorstrength Fitness!\n                    "
                ),
              ]),
              _vm._v(" "),
              _c("div", { staticClass: "group-actions" }, [
                _c(
                  "button",
                  {
                    staticClass: "create-poll-btn",
                    on: { click: _vm.createPoll },
                  },
                  [
                    _c("i", { staticClass: "fas fa-list" }),
                    _vm._v(
                      "\n                            Create poll\n                        "
                    ),
                  ]
                ),
                _vm._v(" "),
                _c(
                  "button",
                  {
                    staticClass: "help-btn",
                    attrs: { title: "Help" },
                    on: { click: _vm.openVideoTutorialModal },
                  },
                  [
                    _c("i", { staticClass: "fas fa-video" }),
                    _vm._v(" "),
                    _c("span", [_vm._v("Help")]),
                  ]
                ),
              ]),
            ]),
          ]),
        ]),
      ]),
      _vm._v(" "),
      _c("div", { staticClass: "main-content" }, [
        _c("div", { staticClass: "content-container" }, [
          _c("div", { staticClass: "left-column" }, [
            _c("div", { staticClass: "post-input-card" }, [
              _c("div", { staticClass: "post-input" }, [
                _vm._m(2),
                _vm._v(" "),
                _c("div", { staticClass: "post-input-container" }, [
                  _c("textarea", {
                    directives: [
                      {
                        name: "model",
                        rawName: "v-model",
                        value: _vm.newPost,
                        expression: "newPost",
                      },
                    ],
                    ref: "postTextarea",
                    staticClass: "post-input-field",
                    class: { "has-error": _vm.validationErrors.content },
                    attrs: {
                      placeholder: "Post a new message",
                      rows: "3",
                      maxlength: "5000",
                    },
                    domProps: { value: _vm.newPost },
                    on: {
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
                        if (!$event.ctrlKey) {
                          return null
                        }
                        return _vm.createPost.apply(null, arguments)
                      },
                      focus: _vm.expandTextarea,
                      input: [
                        function ($event) {
                          if ($event.target.composing) {
                            return
                          }
                          _vm.newPost = $event.target.value
                        },
                        _vm.autoResizeTextarea,
                      ],
                    },
                  }),
                  _vm._v(" "),
                  _vm.validationErrors.content
                    ? _c("div", { staticClass: "validation-error" }, [
                        _vm._v(
                          "\n                                " +
                            _vm._s(_vm.validationErrors.content) +
                            "\n                            "
                        ),
                      ])
                    : _vm._e(),
                  _vm._v(" "),
                  _vm.newPost
                    ? _c("div", { staticClass: "char-count" }, [
                        _vm._v(
                          "\n                                " +
                            _vm._s(_vm.newPost.length) +
                            "/5000 characters\n                            "
                        ),
                      ])
                    : _vm._e(),
                  _vm._v(" "),
                  _c("div", { staticClass: "post-input-actions" }, [
                    _c("input", {
                      ref: "imageInput",
                      staticStyle: { display: "none" },
                      attrs: { type: "file", accept: "image/*" },
                      on: { change: _vm.handleImageSelect },
                    }),
                    _vm._v(" "),
                    _c("input", {
                      ref: "videoInput",
                      staticStyle: { display: "none" },
                      attrs: { type: "file", accept: "video/*" },
                      on: { change: _vm.handleVideoSelect },
                    }),
                    _vm._v(" "),
                    _c(
                      "button",
                      {
                        staticClass: "action-btn",
                        attrs: { title: "Add Image" },
                        on: {
                          click: function ($event) {
                            return _vm.$refs.imageInput.click()
                          },
                        },
                      },
                      [_c("i", { staticClass: "fas fa-image" })]
                    ),
                    _vm._v(" "),
                    _c(
                      "button",
                      {
                        staticClass: "action-btn",
                        attrs: { title: "Add Video" },
                        on: {
                          click: function ($event) {
                            return _vm.$refs.videoInput.click()
                          },
                        },
                      },
                      [_c("i", { staticClass: "fas fa-video" })]
                    ),
                    _vm._v(" "),
                    _c(
                      "button",
                      {
                        staticClass: "action-btn",
                        attrs: {
                          disabled:
                            (!_vm.newPost.trim() &&
                              !_vm.selectedImage &&
                              !_vm.selectedVideo) ||
                            _vm.creatingPost,
                          title: _vm.creatingPost ? "Creating post..." : "Post",
                        },
                        on: { click: _vm.createPost },
                      },
                      [
                        _vm.creatingPost
                          ? _c("i", { staticClass: "fas fa-spinner fa-spin" })
                          : _c("i", { staticClass: "fas fa-paper-plane" }),
                      ]
                    ),
                  ]),
                  _vm._v(" "),
                  _vm.selectedImage
                    ? _c("div", { staticClass: "selected-image-preview" }, [
                        _c("img", {
                          attrs: { src: _vm.imagePreview, alt: "Preview" },
                        }),
                        _vm._v(" "),
                        _c(
                          "button",
                          {
                            staticClass: "remove-image-btn",
                            on: { click: _vm.removeImage },
                          },
                          [_c("i", { staticClass: "fas fa-times" })]
                        ),
                        _vm._v(" "),
                        _vm.validationErrors.image
                          ? _c(
                              "div",
                              { staticClass: "validation-error-inline" },
                              [
                                _vm._v(
                                  "\n                                    " +
                                    _vm._s(_vm.validationErrors.image) +
                                    "\n                                "
                                ),
                              ]
                            )
                          : _vm._e(),
                      ])
                    : _vm._e(),
                  _vm._v(" "),
                  _vm.selectedVideo
                    ? _c("div", { staticClass: "selected-video-preview" }, [
                        _c("video", {
                          staticStyle: {
                            "max-width": "100%",
                            "max-height": "200px",
                          },
                          attrs: { src: _vm.videoPreview, controls: "" },
                        }),
                        _vm._v(" "),
                        _c(
                          "button",
                          {
                            staticClass: "remove-video-btn",
                            on: { click: _vm.removeVideo },
                          },
                          [_c("i", { staticClass: "fas fa-times" })]
                        ),
                        _vm._v(" "),
                        _vm.validationErrors.video
                          ? _c(
                              "div",
                              { staticClass: "validation-error-inline" },
                              [
                                _vm._v(
                                  "\n                                    " +
                                    _vm._s(_vm.validationErrors.video) +
                                    "\n                                "
                                ),
                              ]
                            )
                          : _vm._e(),
                      ])
                    : _vm._e(),
                ]),
              ]),
            ]),
            _vm._v(" "),
            _c(
              "div",
              { staticClass: "posts-feed" },
              _vm._l(_vm.posts, function (post) {
                return _c(
                  "div",
                  { key: post.id, staticClass: "post-card" },
                  [
                    _c("div", { staticClass: "post-header" }, [
                      _c("div", { staticClass: "post-user-info" }, [
                        _vm._m(3, true),
                        _vm._v(" "),
                        _c("div", { staticClass: "user-details" }, [
                          _c("div", { staticClass: "user-name-row" }, [
                            _c("div", { staticClass: "user-name" }, [
                              _vm._v(_vm._s(post.author)),
                            ]),
                            _vm._v(" "),
                            post.isStaff
                              ? _c("div", { staticClass: "gym-coach-badge" }, [
                                  _c("i", { staticClass: "fas fa-shield-alt" }),
                                  _vm._v(" "),
                                  _c("span", [_vm._v("GYM COACH")]),
                                ])
                              : _vm._e(),
                          ]),
                          _vm._v(" "),
                          _c("div", { staticClass: "post-time" }, [
                            _vm._v(_vm._s(post.timeAgo)),
                          ]),
                        ]),
                      ]),
                      _vm._v(" "),
                      _vm.currentUser &&
                      (String(post.user_id) === String(_vm.currentUser.id) ||
                        (post.user &&
                          String(post.user.id) === String(_vm.currentUser.id)))
                        ? _c("div", { staticClass: "post-actions" }, [
                            _c(
                              "button",
                              {
                                staticClass: "action-btn",
                                attrs: { title: "Pin" },
                                on: {
                                  click: function ($event) {
                                    return _vm.pinPost(post.id)
                                  },
                                },
                              },
                              [_c("i", { staticClass: "fas fa-thumbtack" })]
                            ),
                            _vm._v(" "),
                            _c(
                              "button",
                              {
                                staticClass: "action-btn",
                                attrs: { title: "Edit" },
                                on: {
                                  click: function ($event) {
                                    return _vm.editPost(post.id)
                                  },
                                },
                              },
                              [_c("i", { staticClass: "fas fa-edit" })]
                            ),
                            _vm._v(" "),
                            _c(
                              "button",
                              {
                                staticClass: "action-btn",
                                attrs: {
                                  disabled: _vm.deletingPosts.has(post.id),
                                  title: _vm.deletingPosts.has(post.id)
                                    ? "Deleting..."
                                    : "Delete",
                                },
                                on: {
                                  click: function ($event) {
                                    return _vm.deletePost(post.id)
                                  },
                                },
                              },
                              [
                                _vm.deletingPosts.has(post.id)
                                  ? _c("i", {
                                      staticClass: "fas fa-spinner fa-spin",
                                    })
                                  : _c("i", { staticClass: "fas fa-trash" }),
                              ]
                            ),
                          ])
                        : _vm._e(),
                    ]),
                    _vm._v(" "),
                    _c("div", { staticClass: "post-content" }, [
                      _c("p", [_vm._v(_vm._s(post.content))]),
                      _vm._v(" "),
                      post.image_url
                        ? _c("div", { staticClass: "post-image" }, [
                            _c("img", {
                              attrs: { src: post.image_url, alt: "Post image" },
                              on: {
                                click: function ($event) {
                                  return _vm.openImageModal(post.image_url)
                                },
                              },
                            }),
                          ])
                        : _vm._e(),
                      _vm._v(" "),
                      post.video_url
                        ? _c("div", { staticClass: "post-video" }, [
                            _c("video", {
                              staticStyle: {
                                width: "100%",
                                "max-width": "500px",
                                "max-height": "400px",
                                "border-radius": "8px",
                              },
                              attrs: { src: post.video_url, controls: "" },
                            }),
                          ])
                        : _vm._e(),
                    ]),
                    _vm._v(" "),
                    _c("div", { staticClass: "post-interactions" }, [
                      _c(
                        "button",
                        {
                          staticClass: "interaction-btn",
                          on: {
                            click: function ($event) {
                              return _vm.toggleLike(post.id)
                            },
                          },
                        },
                        [
                          _c("i", {
                            staticClass: "fas fa-heart",
                            class: { liked: post.liked },
                          }),
                          _vm._v(" "),
                          _c("span", [_vm._v(_vm._s(post.likes))]),
                        ]
                      ),
                      _vm._v(" "),
                      _c(
                        "button",
                        {
                          staticClass: "interaction-btn",
                          on: {
                            click: function ($event) {
                              return _vm.toggleComments(post.id)
                            },
                          },
                        },
                        [
                          _c("i", { staticClass: "fas fa-comment" }),
                          _vm._v(" "),
                          _c("span", [
                            _vm._v(
                              _vm._s(
                                post.comments_count || post.comments.length
                              )
                            ),
                          ]),
                        ]
                      ),
                    ]),
                    _vm._v(" "),
                    _vm.canCommentOnPost(post.id)
                      ? _c("div", { staticClass: "post-comment-input" }, [
                          _c("div", { staticClass: "comment-input" }, [
                            _vm._m(4, true),
                            _vm._v(" "),
                            _c("input", {
                              directives: [
                                {
                                  name: "model",
                                  rawName: "v-model",
                                  value: _vm.newComments[post.id],
                                  expression: "newComments[post.id]",
                                },
                              ],
                              staticClass: "comment-input-field",
                              attrs: {
                                type: "text",
                                placeholder:
                                  "Write a comment or add an image...",
                              },
                              domProps: { value: _vm.newComments[post.id] },
                              on: {
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
                                  return _vm.addComment(post.id)
                                },
                                input: function ($event) {
                                  if ($event.target.composing) {
                                    return
                                  }
                                  _vm.$set(
                                    _vm.newComments,
                                    post.id,
                                    $event.target.value
                                  )
                                },
                              },
                            }),
                            _vm._v(" "),
                            _c("input", {
                              ref: "commentImageInput_" + post.id,
                              refInFor: true,
                              staticStyle: { display: "none" },
                              attrs: { type: "file", accept: "image/*" },
                              on: {
                                change: function ($event) {
                                  return _vm.handleCommentImageSelect(
                                    post.id,
                                    $event
                                  )
                                },
                              },
                            }),
                            _vm._v(" "),
                            _c(
                              "button",
                              {
                                staticClass: "comment-image-btn",
                                attrs: { title: "Add Image" },
                                on: {
                                  click: function ($event) {
                                    _vm.$refs[
                                      "commentImageInput_" + post.id
                                    ][0].click()
                                  },
                                },
                              },
                              [_c("i", { staticClass: "fas fa-image" })]
                            ),
                            _vm._v(" "),
                            _c(
                              "button",
                              {
                                staticClass: "comment-post-btn",
                                attrs: {
                                  disabled:
                                    (!_vm.newComments[post.id] ||
                                      !_vm.newComments[post.id].trim()) &&
                                    !_vm.commentImages[post.id],
                                  title:
                                    (!_vm.newComments[post.id] ||
                                      !_vm.newComments[post.id].trim()) &&
                                    !_vm.commentImages[post.id]
                                      ? "Add text or image to post"
                                      : "Post comment",
                                },
                                on: {
                                  click: function ($event) {
                                    return _vm.addComment(post.id)
                                  },
                                },
                              },
                              [_c("i", { staticClass: "fas fa-paper-plane" })]
                            ),
                          ]),
                          _vm._v(" "),
                          _vm.commentImagePreviews[post.id]
                            ? _c(
                                "div",
                                { staticClass: "comment-image-preview" },
                                [
                                  _c("img", {
                                    attrs: {
                                      src: _vm.commentImagePreviews[post.id],
                                      alt: "Preview",
                                    },
                                  }),
                                  _vm._v(" "),
                                  _c(
                                    "button",
                                    {
                                      staticClass: "remove-comment-image-btn",
                                      on: {
                                        click: function ($event) {
                                          return _vm.removeCommentImage(post.id)
                                        },
                                      },
                                    },
                                    [_c("i", { staticClass: "fas fa-times" })]
                                  ),
                                ]
                              )
                            : _vm._e(),
                        ])
                      : _vm._e(),
                    _vm._v(" "),
                    _c("transition", { attrs: { name: "fade" } }, [
                      _vm.showCommentLimitMessage[post.id]
                        ? _c("div", { staticClass: "post-comment-input" }, [
                            _c(
                              "div",
                              { staticClass: "comment-limit-message" },
                              [
                                _c("i", { staticClass: "fas fa-info-circle" }),
                                _vm._v(" "),
                                _c("span", [
                                  _vm._v(
                                    "You have reached the maximum limit of 3 comments per post"
                                  ),
                                ]),
                              ]
                            ),
                          ])
                        : _vm._e(),
                    ]),
                    _vm._v(" "),
                    post.showComments
                      ? _c(
                          "div",
                          { staticClass: "comments-section" },
                          _vm._l(post.comments, function (comment) {
                            return _c(
                              "div",
                              { key: comment.id, staticClass: "comment" },
                              [
                                _vm._m(5, true),
                                _vm._v(" "),
                                _c("div", { staticClass: "comment-content" }, [
                                  _c("div", { staticClass: "comment-header" }, [
                                    _c(
                                      "div",
                                      { staticClass: "comment-author" },
                                      [_vm._v(_vm._s(comment.author))]
                                    ),
                                    _vm._v(" "),
                                    _c(
                                      "div",
                                      { staticClass: "comment-actions" },
                                      [
                                        _c(
                                          "button",
                                          {
                                            staticClass: "comment-like-btn",
                                            class: { liked: comment.is_liked },
                                            attrs: {
                                              disabled: _vm.likingComments.has(
                                                comment.id
                                              ),
                                              title: "Like comment",
                                            },
                                            on: {
                                              click: function ($event) {
                                                return _vm.toggleCommentLike(
                                                  comment.id,
                                                  post.id
                                                )
                                              },
                                            },
                                          },
                                          [
                                            _c("i", {
                                              staticClass: "fas fa-heart",
                                            }),
                                            _vm._v(" "),
                                            _c("span", [
                                              _vm._v(
                                                _vm._s(comment.likes_count || 0)
                                              ),
                                            ]),
                                          ]
                                        ),
                                        _vm._v(" "),
                                        _vm.canDeleteComment(comment, post)
                                          ? _c(
                                              "button",
                                              {
                                                staticClass:
                                                  "comment-delete-btn",
                                                attrs: {
                                                  disabled:
                                                    _vm.deletingComments.has(
                                                      comment.id
                                                    ),
                                                  title: "Delete comment",
                                                },
                                                on: {
                                                  click: function ($event) {
                                                    return _vm.deleteComment(
                                                      comment.id,
                                                      post.id
                                                    )
                                                  },
                                                },
                                              },
                                              [
                                                _vm.deletingComments.has(
                                                  comment.id
                                                )
                                                  ? _c("i", {
                                                      staticClass:
                                                        "fas fa-spinner fa-spin",
                                                    })
                                                  : _c("i", {
                                                      staticClass:
                                                        "fas fa-trash",
                                                    }),
                                              ]
                                            )
                                          : _vm._e(),
                                      ]
                                    ),
                                  ]),
                                  _vm._v(" "),
                                  _c("div", { staticClass: "comment-text" }, [
                                    _vm._v(_vm._s(comment.text)),
                                  ]),
                                  _vm._v(" "),
                                  comment.image_url
                                    ? _c(
                                        "div",
                                        { staticClass: "comment-image" },
                                        [
                                          _c("img", {
                                            attrs: {
                                              src: comment.image_url,
                                              alt: "Comment image",
                                            },
                                            on: {
                                              click: function ($event) {
                                                return _vm.openImageModal(
                                                  comment.image_url
                                                )
                                              },
                                            },
                                          }),
                                        ]
                                      )
                                    : _vm._e(),
                                  _vm._v(" "),
                                  _c("div", { staticClass: "comment-time" }, [
                                    _vm._v(_vm._s(comment.timeAgo)),
                                  ]),
                                ]),
                              ]
                            )
                          }),
                          0
                        )
                      : _vm._e(),
                  ],
                  1
                )
              }),
              0
            ),
          ]),
          _vm._v(" "),
          _c(
            "div",
            { staticClass: "right-column" },
            [
              _vm.currentUser && _vm.currentUser.role_id === 1
                ? _c("div", { staticClass: "add-widget-section" }, [
                    _c(
                      "button",
                      {
                        staticClass: "add-widget-btn",
                        attrs: { title: "Add Widget" },
                        on: { click: _vm.createWidget },
                      },
                      [
                        _c("i", { staticClass: "fas fa-plus" }),
                        _vm._v(" Add Widget\n                    "),
                      ]
                    ),
                  ])
                : _vm._e(),
              _vm._v(" "),
              _vm._l(_vm.widgets, function (widget) {
                return _c(
                  "div",
                  { key: widget.id, staticClass: "widget-container" },
                  [
                    widget.type === "advertisement"
                      ? _c(
                          "div",
                          {
                            staticClass: "ad-card",
                            on: {
                              click: function ($event) {
                                return _vm.editWidget(widget)
                              },
                            },
                          },
                          [
                            _c(
                              "div",
                              {
                                staticClass: "ad-image",
                                style: _vm.getWidgetImageStyle(widget),
                              },
                              [
                                !_vm.getWidgetImageUrl(widget)
                                  ? _c(
                                      "div",
                                      { staticClass: "ad-placeholder" },
                                      [_c("i", { staticClass: "fas fa-image" })]
                                    )
                                  : _vm._e(),
                                _vm._v(" "),
                                _c("div", { staticClass: "ad-overlay" }, [
                                  _c("p", { staticClass: "ad-text" }, [
                                    _vm._v(
                                      _vm._s(
                                        widget.link_text ||
                                          widget.title ||
                                          "Click here to order yours today!"
                                      )
                                    ),
                                  ]),
                                ]),
                                _vm._v(" "),
                                _vm.currentUser && _vm.currentUser.role_id === 1
                                  ? _c(
                                      "div",
                                      { staticClass: "widget-actions-overlay" },
                                      [
                                        _c(
                                          "button",
                                          {
                                            staticClass: "widget-action-btn",
                                            attrs: { title: "Edit" },
                                            on: {
                                              click: function ($event) {
                                                $event.stopPropagation()
                                                return _vm.editWidget(widget)
                                              },
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
                                          "button",
                                          {
                                            staticClass:
                                              "widget-action-btn widget-delete-btn",
                                            attrs: {
                                              disabled: _vm.deletingWidgets.has(
                                                widget.id
                                              ),
                                              title: _vm.deletingWidgets.has(
                                                widget.id
                                              )
                                                ? "Deleting..."
                                                : "Delete",
                                            },
                                            on: {
                                              click: function ($event) {
                                                $event.stopPropagation()
                                                return _vm.deleteWidget(
                                                  widget.id
                                                )
                                              },
                                            },
                                          },
                                          [
                                            _vm.deletingWidgets.has(widget.id)
                                              ? _c("i", {
                                                  staticClass:
                                                    "fas fa-spinner fa-spin",
                                                })
                                              : _c("i", {
                                                  staticClass: "fas fa-trash",
                                                }),
                                          ]
                                        ),
                                      ]
                                    )
                                  : _vm._e(),
                              ]
                            ),
                          ]
                        )
                      : _vm._e(),
                    _vm._v(" "),
                    widget.type === "activity"
                      ? _c(
                          "div",
                          {
                            staticClass: "activity-card",
                            on: {
                              click: function ($event) {
                                return _vm.editWidget(widget)
                              },
                            },
                          },
                          [
                            _c("div", { staticClass: "widget-header" }, [
                              _c("h3", { staticClass: "card-title" }, [
                                _vm._v(
                                  _vm._s(widget.title || "Recent Activity")
                                ),
                              ]),
                              _vm._v(" "),
                              _vm.currentUser && _vm.currentUser.role_id === 1
                                ? _c(
                                    "div",
                                    { staticClass: "widget-header-actions" },
                                    [
                                      _c(
                                        "button",
                                        {
                                          staticClass: "widget-edit-btn",
                                          attrs: { title: "Edit" },
                                          on: {
                                            click: function ($event) {
                                              $event.stopPropagation()
                                              return _vm.editWidget(widget)
                                            },
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
                                        "button",
                                        {
                                          staticClass:
                                            "widget-delete-btn-header",
                                          attrs: {
                                            disabled: _vm.deletingWidgets.has(
                                              widget.id
                                            ),
                                            title: _vm.deletingWidgets.has(
                                              widget.id
                                            )
                                              ? "Deleting..."
                                              : "Delete",
                                          },
                                          on: {
                                            click: function ($event) {
                                              $event.stopPropagation()
                                              return _vm.deleteWidget(widget.id)
                                            },
                                          },
                                        },
                                        [
                                          _vm.deletingWidgets.has(widget.id)
                                            ? _c("i", {
                                                staticClass:
                                                  "fas fa-spinner fa-spin",
                                              })
                                            : _c("i", {
                                                staticClass: "fas fa-trash",
                                              }),
                                        ]
                                      ),
                                    ]
                                  )
                                : _vm._e(),
                            ]),
                            _vm._v(" "),
                            _c("div", { staticClass: "activity-item" }, [
                              _vm._m(6, true),
                              _vm._v(" "),
                              _c("div", { staticClass: "activity-content" }, [
                                _c("div", {
                                  staticClass: "activity-text",
                                  domProps: {
                                    innerHTML: _vm._s(
                                      widget.content || "No activity yet"
                                    ),
                                  },
                                }),
                                _vm._v(" "),
                                _vm.getWidgetImageUrl(widget)
                                  ? _c(
                                      "div",
                                      { staticClass: "activity-image" },
                                      [
                                        _c("img", {
                                          attrs: {
                                            src: _vm.getWidgetImageUrl(widget),
                                            alt:
                                              widget.title || "Activity image",
                                          },
                                          on: {
                                            click: function ($event) {
                                              $event.stopPropagation()
                                              _vm.openImageModal(
                                                _vm.getWidgetImageUrl(widget)
                                              )
                                            },
                                          },
                                        }),
                                      ]
                                    )
                                  : _vm._e(),
                                _vm._v(" "),
                                widget.metadata && widget.metadata.time
                                  ? _c(
                                      "div",
                                      { staticClass: "activity-time" },
                                      [_vm._v(_vm._s(widget.metadata.time))]
                                    )
                                  : _vm._e(),
                                _vm._v(" "),
                                widget.metadata && widget.metadata.quote
                                  ? _c(
                                      "div",
                                      { staticClass: "activity-quote" },
                                      [
                                        _vm._v(
                                          '\n                                    "' +
                                            _vm._s(widget.metadata.quote) +
                                            '"\n                                '
                                        ),
                                      ]
                                    )
                                  : _vm._e(),
                                _vm._v(" "),
                                widget.metadata && widget.metadata.interactions
                                  ? _c(
                                      "div",
                                      { staticClass: "activity-interactions" },
                                      [
                                        _c(
                                          "button",
                                          {
                                            staticClass:
                                              "activity-interaction-btn",
                                          },
                                          [
                                            _c("i", {
                                              staticClass: "fas fa-heart",
                                            }),
                                            _vm._v(" "),
                                            _c("span", [
                                              _vm._v(
                                                _vm._s(
                                                  widget.metadata.interactions
                                                    .likes || 0
                                                )
                                              ),
                                            ]),
                                          ]
                                        ),
                                        _vm._v(" "),
                                        _c(
                                          "button",
                                          {
                                            staticClass:
                                              "activity-interaction-btn",
                                          },
                                          [
                                            _c("i", {
                                              staticClass: "fas fa-comment",
                                            }),
                                            _vm._v(" "),
                                            _c("span", [
                                              _vm._v(
                                                _vm._s(
                                                  widget.metadata.interactions
                                                    .comments || 0
                                                )
                                              ),
                                            ]),
                                          ]
                                        ),
                                      ]
                                    )
                                  : _vm._e(),
                              ]),
                            ]),
                          ]
                        )
                      : _vm._e(),
                  ]
                )
              }),
              _vm._v(" "),
              _c(
                "div",
                { staticClass: "polls-feed" },
                _vm._l(_vm.polls, function (poll) {
                  return _c("div", { key: poll.id, staticClass: "poll-card" }, [
                    _c("div", { staticClass: "poll-header" }, [
                      _c("div", { staticClass: "poll-user-info" }, [
                        _vm._m(7, true),
                        _vm._v(" "),
                        _c("div", { staticClass: "user-details" }, [
                          _c("div", { staticClass: "user-name-row" }, [
                            _c("div", { staticClass: "user-name" }, [
                              _vm._v(_vm._s(poll.author)),
                            ]),
                            _vm._v(" "),
                            poll.isStaff
                              ? _c("div", { staticClass: "gym-coach-badge" }, [
                                  _c("i", { staticClass: "fas fa-shield-alt" }),
                                  _vm._v(" "),
                                  _c("span", [_vm._v("GYM COACH")]),
                                ])
                              : _vm._e(),
                          ]),
                          _vm._v(" "),
                          _c("div", { staticClass: "poll-time" }, [
                            _vm._v(_vm._s(poll.timeAgo)),
                          ]),
                        ]),
                      ]),
                      _vm._v(" "),
                      _vm.currentUser &&
                      (String(poll.user_id) === String(_vm.currentUser.id) ||
                        (poll.user &&
                          String(poll.user.id) === String(_vm.currentUser.id)))
                        ? _c("div", { staticClass: "poll-actions" }, [
                            _c(
                              "button",
                              {
                                staticClass: "action-btn",
                                attrs: { title: "Edit" },
                                on: {
                                  click: function ($event) {
                                    return _vm.editPoll(poll.id)
                                  },
                                },
                              },
                              [_c("i", { staticClass: "fas fa-edit" })]
                            ),
                            _vm._v(" "),
                            _c(
                              "button",
                              {
                                staticClass: "action-btn",
                                attrs: {
                                  disabled: _vm.deletingPolls.has(poll.id),
                                  title: _vm.deletingPolls.has(poll.id)
                                    ? "Deleting..."
                                    : "Delete",
                                },
                                on: {
                                  click: function ($event) {
                                    return _vm.deletePoll(poll.id)
                                  },
                                },
                              },
                              [
                                _vm.deletingPolls.has(poll.id)
                                  ? _c("i", {
                                      staticClass: "fas fa-spinner fa-spin",
                                    })
                                  : _c("i", { staticClass: "fas fa-trash" }),
                              ]
                            ),
                          ])
                        : _vm._e(),
                    ]),
                    _vm._v(" "),
                    _c("div", { staticClass: "poll-content" }, [
                      _c("h3", { staticClass: "poll-title" }, [
                        _vm._v(_vm._s(poll.title)),
                      ]),
                      _vm._v(" "),
                      _c(
                        "div",
                        { staticClass: "poll-options" },
                        _vm._l(poll.options, function (option) {
                          return _c(
                            "div",
                            { key: option.id, staticClass: "poll-option" },
                            [
                              _c(
                                "button",
                                {
                                  staticClass: "poll-option-btn",
                                  class: {
                                    voted:
                                      poll.hasVoted &&
                                      poll.votedOptionId === option.id,
                                  },
                                  attrs: { disabled: poll.hasVoted },
                                  on: {
                                    click: function ($event) {
                                      return _vm.voteOnPoll(poll.id, option.id)
                                    },
                                  },
                                },
                                [
                                  _c("span", { staticClass: "option-text" }, [
                                    _vm._v(_vm._s(option.text)),
                                  ]),
                                  _vm._v(" "),
                                  _c("span", { staticClass: "option-stats" }, [
                                    _c("span", { staticClass: "vote-count" }, [
                                      _vm._v(_vm._s(option.votes_count)),
                                    ]),
                                    _vm._v(" "),
                                    _c(
                                      "span",
                                      { staticClass: "vote-percentage" },
                                      [
                                        _vm._v(
                                          "(" + _vm._s(option.percentage) + "%)"
                                        ),
                                      ]
                                    ),
                                  ]),
                                ]
                              ),
                              _vm._v(" "),
                              poll.hasVoted
                                ? _c("div", { staticClass: "vote-bar" }, [
                                    _c("div", {
                                      staticClass: "vote-progress",
                                      style: { width: option.percentage + "%" },
                                    }),
                                  ])
                                : _vm._e(),
                            ]
                          )
                        }),
                        0
                      ),
                      _vm._v(" "),
                      _c("div", { staticClass: "poll-footer" }, [
                        _c("span", { staticClass: "total-votes" }, [
                          _vm._v(_vm._s(poll.totalVotes) + " votes"),
                        ]),
                      ]),
                    ]),
                  ])
                }),
                0
              ),
            ],
            2
          ),
        ]),
      ]),
      _vm._v(" "),
      _vm.showPollModal
        ? _c(
            "div",
            {
              staticClass: "poll-modal-overlay",
              on: { click: _vm.closePollModal },
            },
            [
              _c(
                "div",
                {
                  staticClass: "poll-modal",
                  on: {
                    click: function ($event) {
                      $event.stopPropagation()
                    },
                  },
                },
                [
                  _c("div", { staticClass: "poll-modal-header" }, [
                    _c("h3", [_vm._v("Create Poll")]),
                    _vm._v(" "),
                    _c(
                      "button",
                      {
                        staticClass: "poll-modal-close",
                        on: { click: _vm.closePollModal },
                      },
                      [_c("i", { staticClass: "fas fa-times" })]
                    ),
                  ]),
                  _vm._v(" "),
                  _c("div", { staticClass: "poll-modal-body" }, [
                    _c("div", { staticClass: "poll-form-group" }, [
                      _c("label", { attrs: { for: "poll-title" } }, [
                        _vm._v("Poll title"),
                      ]),
                      _vm._v(" "),
                      _c("input", {
                        directives: [
                          {
                            name: "model",
                            rawName: "v-model",
                            value: _vm.pollData.title,
                            expression: "pollData.title",
                          },
                        ],
                        staticClass: "poll-input",
                        attrs: {
                          type: "text",
                          id: "poll-title",
                          placeholder: "Enter poll title...",
                        },
                        domProps: { value: _vm.pollData.title },
                        on: {
                          input: function ($event) {
                            if ($event.target.composing) {
                              return
                            }
                            _vm.$set(_vm.pollData, "title", $event.target.value)
                          },
                        },
                      }),
                    ]),
                    _vm._v(" "),
                    _c("div", { staticClass: "poll-form-group" }, [
                      _c("label", { attrs: { for: "poll-option-1" } }, [
                        _vm._v("Option 1 (*)"),
                      ]),
                      _vm._v(" "),
                      _c("input", {
                        directives: [
                          {
                            name: "model",
                            rawName: "v-model",
                            value: _vm.pollData.options[0],
                            expression: "pollData.options[0]",
                          },
                        ],
                        staticClass: "poll-input",
                        attrs: {
                          type: "text",
                          id: "poll-option-1",
                          placeholder: "Enter option 1...",
                        },
                        domProps: { value: _vm.pollData.options[0] },
                        on: {
                          input: function ($event) {
                            if ($event.target.composing) {
                              return
                            }
                            _vm.$set(
                              _vm.pollData.options,
                              0,
                              $event.target.value
                            )
                          },
                        },
                      }),
                    ]),
                    _vm._v(" "),
                    _c("div", { staticClass: "poll-form-group" }, [
                      _c("label", { attrs: { for: "poll-option-2" } }, [
                        _vm._v("Option 2 (*)"),
                      ]),
                      _vm._v(" "),
                      _c("input", {
                        directives: [
                          {
                            name: "model",
                            rawName: "v-model",
                            value: _vm.pollData.options[1],
                            expression: "pollData.options[1]",
                          },
                        ],
                        staticClass: "poll-input",
                        attrs: {
                          type: "text",
                          id: "poll-option-2",
                          placeholder: "Enter option 2...",
                        },
                        domProps: { value: _vm.pollData.options[1] },
                        on: {
                          input: function ($event) {
                            if ($event.target.composing) {
                              return
                            }
                            _vm.$set(
                              _vm.pollData.options,
                              1,
                              $event.target.value
                            )
                          },
                        },
                      }),
                    ]),
                    _vm._v(" "),
                    _c("div", { staticClass: "poll-form-group" }, [
                      _c("label", { attrs: { for: "poll-option-3" } }, [
                        _vm._v("Option 3 (optional)"),
                      ]),
                      _vm._v(" "),
                      _c("input", {
                        directives: [
                          {
                            name: "model",
                            rawName: "v-model",
                            value: _vm.pollData.options[2],
                            expression: "pollData.options[2]",
                          },
                        ],
                        staticClass: "poll-input",
                        attrs: {
                          type: "text",
                          id: "poll-option-3",
                          placeholder: "Enter option 3...",
                        },
                        domProps: { value: _vm.pollData.options[2] },
                        on: {
                          input: function ($event) {
                            if ($event.target.composing) {
                              return
                            }
                            _vm.$set(
                              _vm.pollData.options,
                              2,
                              $event.target.value
                            )
                          },
                        },
                      }),
                    ]),
                    _vm._v(" "),
                    _c("div", { staticClass: "poll-form-group" }, [
                      _c("label", { attrs: { for: "poll-option-4" } }, [
                        _vm._v("Option 4 (optional)"),
                      ]),
                      _vm._v(" "),
                      _c("input", {
                        directives: [
                          {
                            name: "model",
                            rawName: "v-model",
                            value: _vm.pollData.options[3],
                            expression: "pollData.options[3]",
                          },
                        ],
                        staticClass: "poll-input",
                        attrs: {
                          type: "text",
                          id: "poll-option-4",
                          placeholder: "Enter option 4...",
                        },
                        domProps: { value: _vm.pollData.options[3] },
                        on: {
                          input: function ($event) {
                            if ($event.target.composing) {
                              return
                            }
                            _vm.$set(
                              _vm.pollData.options,
                              3,
                              $event.target.value
                            )
                          },
                        },
                      }),
                    ]),
                    _vm._v(" "),
                    _c("div", { staticClass: "poll-form-group" }, [
                      _c("label", { attrs: { for: "poll-option-5" } }, [
                        _vm._v("Option 5 (optional)"),
                      ]),
                      _vm._v(" "),
                      _c("input", {
                        directives: [
                          {
                            name: "model",
                            rawName: "v-model",
                            value: _vm.pollData.options[4],
                            expression: "pollData.options[4]",
                          },
                        ],
                        staticClass: "poll-input",
                        attrs: {
                          type: "text",
                          id: "poll-option-5",
                          placeholder: "Enter option 5...",
                        },
                        domProps: { value: _vm.pollData.options[4] },
                        on: {
                          input: function ($event) {
                            if ($event.target.composing) {
                              return
                            }
                            _vm.$set(
                              _vm.pollData.options,
                              4,
                              $event.target.value
                            )
                          },
                        },
                      }),
                    ]),
                  ]),
                  _vm._v(" "),
                  _c("div", { staticClass: "poll-modal-footer" }, [
                    _c(
                      "button",
                      {
                        staticClass: "poll-submit-btn",
                        on: { click: _vm.submitPoll },
                      },
                      [_vm._v("\n                    Submit\n                ")]
                    ),
                  ]),
                ]
              ),
            ]
          )
        : _vm._e(),
      _vm._v(" "),
      _vm.showEditModal
        ? _c(
            "div",
            {
              staticClass: "edit-post-modal-overlay",
              on: { click: _vm.cancelEditPost },
            },
            [
              _c(
                "div",
                {
                  staticClass: "edit-post-modal",
                  on: {
                    click: function ($event) {
                      $event.stopPropagation()
                    },
                  },
                },
                [
                  _c("div", { staticClass: "edit-post-modal-header" }, [
                    _c("h3", [_vm._v("Edit Post")]),
                    _vm._v(" "),
                    _c(
                      "button",
                      {
                        staticClass: "edit-post-modal-close",
                        on: { click: _vm.cancelEditPost },
                      },
                      [_c("i", { staticClass: "fas fa-times" })]
                    ),
                  ]),
                  _vm._v(" "),
                  _c("div", { staticClass: "edit-post-modal-body" }, [
                    _c("div", { staticClass: "edit-post-form-group" }, [
                      _c("label", { attrs: { for: "edit-post-content" } }, [
                        _vm._v("Post Content"),
                      ]),
                      _vm._v(" "),
                      _c("textarea", {
                        directives: [
                          {
                            name: "model",
                            rawName: "v-model",
                            value: _vm.editPostContent,
                            expression: "editPostContent",
                          },
                        ],
                        staticClass: "edit-post-textarea",
                        attrs: {
                          id: "edit-post-content",
                          placeholder: "Enter post content...",
                          rows: "6",
                          maxlength: "5000",
                        },
                        domProps: { value: _vm.editPostContent },
                        on: {
                          input: function ($event) {
                            if ($event.target.composing) {
                              return
                            }
                            _vm.editPostContent = $event.target.value
                          },
                        },
                      }),
                      _vm._v(" "),
                      _vm.editPostContent
                        ? _c("div", { staticClass: "char-count" }, [
                            _vm._v(
                              "\n                        " +
                                _vm._s(_vm.editPostContent.length) +
                                "/5000 characters\n                    "
                            ),
                          ])
                        : _vm._e(),
                    ]),
                  ]),
                  _vm._v(" "),
                  _c("div", { staticClass: "edit-post-modal-footer" }, [
                    _c(
                      "button",
                      {
                        staticClass: "edit-post-cancel-btn",
                        on: { click: _vm.cancelEditPost },
                      },
                      [_vm._v("\n                    Cancel\n                ")]
                    ),
                    _vm._v(" "),
                    _c(
                      "button",
                      {
                        staticClass: "edit-post-save-btn",
                        on: { click: _vm.saveEditPost },
                      },
                      [
                        _vm._v(
                          "\n                    Save Changes\n                "
                        ),
                      ]
                    ),
                  ]),
                ]
              ),
            ]
          )
        : _vm._e(),
      _vm._v(" "),
      _vm.showEditPollModal
        ? _c(
            "div",
            {
              staticClass: "edit-poll-modal-overlay",
              on: { click: _vm.cancelEditPoll },
            },
            [
              _c(
                "div",
                {
                  staticClass: "edit-poll-modal",
                  on: {
                    click: function ($event) {
                      $event.stopPropagation()
                    },
                  },
                },
                [
                  _c("div", { staticClass: "edit-poll-modal-header" }, [
                    _c("h3", [_vm._v("Edit Poll")]),
                    _vm._v(" "),
                    _c(
                      "button",
                      {
                        staticClass: "edit-poll-modal-close",
                        on: { click: _vm.cancelEditPoll },
                      },
                      [_c("i", { staticClass: "fas fa-times" })]
                    ),
                  ]),
                  _vm._v(" "),
                  _c("div", { staticClass: "edit-poll-modal-body" }, [
                    _c("div", { staticClass: "edit-poll-form-group" }, [
                      _c("label", { attrs: { for: "edit-poll-title" } }, [
                        _vm._v("Poll title"),
                      ]),
                      _vm._v(" "),
                      _c("input", {
                        directives: [
                          {
                            name: "model",
                            rawName: "v-model",
                            value: _vm.editPollData.title,
                            expression: "editPollData.title",
                          },
                        ],
                        staticClass: "edit-poll-input",
                        attrs: {
                          type: "text",
                          id: "edit-poll-title",
                          placeholder: "Enter poll title...",
                        },
                        domProps: { value: _vm.editPollData.title },
                        on: {
                          input: function ($event) {
                            if ($event.target.composing) {
                              return
                            }
                            _vm.$set(
                              _vm.editPollData,
                              "title",
                              $event.target.value
                            )
                          },
                        },
                      }),
                    ]),
                    _vm._v(" "),
                    _c("div", { staticClass: "edit-poll-form-group" }, [
                      _c("label", { attrs: { for: "edit-poll-option-1" } }, [
                        _vm._v("Option 1 (*)"),
                      ]),
                      _vm._v(" "),
                      _c("input", {
                        directives: [
                          {
                            name: "model",
                            rawName: "v-model",
                            value: _vm.editPollData.options[0],
                            expression: "editPollData.options[0]",
                          },
                        ],
                        staticClass: "edit-poll-input",
                        attrs: {
                          type: "text",
                          id: "edit-poll-option-1",
                          placeholder: "Enter option 1...",
                        },
                        domProps: { value: _vm.editPollData.options[0] },
                        on: {
                          input: function ($event) {
                            if ($event.target.composing) {
                              return
                            }
                            _vm.$set(
                              _vm.editPollData.options,
                              0,
                              $event.target.value
                            )
                          },
                        },
                      }),
                    ]),
                    _vm._v(" "),
                    _c("div", { staticClass: "edit-poll-form-group" }, [
                      _c("label", { attrs: { for: "edit-poll-option-2" } }, [
                        _vm._v("Option 2 (*)"),
                      ]),
                      _vm._v(" "),
                      _c("input", {
                        directives: [
                          {
                            name: "model",
                            rawName: "v-model",
                            value: _vm.editPollData.options[1],
                            expression: "editPollData.options[1]",
                          },
                        ],
                        staticClass: "edit-poll-input",
                        attrs: {
                          type: "text",
                          id: "edit-poll-option-2",
                          placeholder: "Enter option 2...",
                        },
                        domProps: { value: _vm.editPollData.options[1] },
                        on: {
                          input: function ($event) {
                            if ($event.target.composing) {
                              return
                            }
                            _vm.$set(
                              _vm.editPollData.options,
                              1,
                              $event.target.value
                            )
                          },
                        },
                      }),
                    ]),
                    _vm._v(" "),
                    _c("div", { staticClass: "edit-poll-form-group" }, [
                      _c("label", { attrs: { for: "edit-poll-option-3" } }, [
                        _vm._v("Option 3 (optional)"),
                      ]),
                      _vm._v(" "),
                      _c("input", {
                        directives: [
                          {
                            name: "model",
                            rawName: "v-model",
                            value: _vm.editPollData.options[2],
                            expression: "editPollData.options[2]",
                          },
                        ],
                        staticClass: "edit-poll-input",
                        attrs: {
                          type: "text",
                          id: "edit-poll-option-3",
                          placeholder: "Enter option 3...",
                        },
                        domProps: { value: _vm.editPollData.options[2] },
                        on: {
                          input: function ($event) {
                            if ($event.target.composing) {
                              return
                            }
                            _vm.$set(
                              _vm.editPollData.options,
                              2,
                              $event.target.value
                            )
                          },
                        },
                      }),
                    ]),
                    _vm._v(" "),
                    _c("div", { staticClass: "edit-poll-form-group" }, [
                      _c("label", { attrs: { for: "edit-poll-option-4" } }, [
                        _vm._v("Option 4 (optional)"),
                      ]),
                      _vm._v(" "),
                      _c("input", {
                        directives: [
                          {
                            name: "model",
                            rawName: "v-model",
                            value: _vm.editPollData.options[3],
                            expression: "editPollData.options[3]",
                          },
                        ],
                        staticClass: "edit-poll-input",
                        attrs: {
                          type: "text",
                          id: "edit-poll-option-4",
                          placeholder: "Enter option 4...",
                        },
                        domProps: { value: _vm.editPollData.options[3] },
                        on: {
                          input: function ($event) {
                            if ($event.target.composing) {
                              return
                            }
                            _vm.$set(
                              _vm.editPollData.options,
                              3,
                              $event.target.value
                            )
                          },
                        },
                      }),
                    ]),
                    _vm._v(" "),
                    _c("div", { staticClass: "edit-poll-form-group" }, [
                      _c("label", { attrs: { for: "edit-poll-option-5" } }, [
                        _vm._v("Option 5 (optional)"),
                      ]),
                      _vm._v(" "),
                      _c("input", {
                        directives: [
                          {
                            name: "model",
                            rawName: "v-model",
                            value: _vm.editPollData.options[4],
                            expression: "editPollData.options[4]",
                          },
                        ],
                        staticClass: "edit-poll-input",
                        attrs: {
                          type: "text",
                          id: "edit-poll-option-5",
                          placeholder: "Enter option 5...",
                        },
                        domProps: { value: _vm.editPollData.options[4] },
                        on: {
                          input: function ($event) {
                            if ($event.target.composing) {
                              return
                            }
                            _vm.$set(
                              _vm.editPollData.options,
                              4,
                              $event.target.value
                            )
                          },
                        },
                      }),
                    ]),
                  ]),
                  _vm._v(" "),
                  _c("div", { staticClass: "edit-poll-modal-footer" }, [
                    _c(
                      "button",
                      {
                        staticClass: "edit-poll-cancel-btn",
                        on: { click: _vm.cancelEditPoll },
                      },
                      [_vm._v("\n                    Cancel\n                ")]
                    ),
                    _vm._v(" "),
                    _c(
                      "button",
                      {
                        staticClass: "edit-poll-save-btn",
                        on: { click: _vm.saveEditPoll },
                      },
                      [
                        _vm._v(
                          "\n                    Save Changes\n                "
                        ),
                      ]
                    ),
                  ]),
                ]
              ),
            ]
          )
        : _vm._e(),
      _vm._v(" "),
      _vm.showWidgetModal
        ? _c(
            "div",
            {
              staticClass: "widget-modal-overlay",
              on: { click: _vm.closeWidgetModal },
            },
            [
              _c(
                "div",
                {
                  staticClass: "widget-modal",
                  on: {
                    click: function ($event) {
                      $event.stopPropagation()
                    },
                  },
                },
                [
                  _c("div", { staticClass: "widget-modal-header" }, [
                    _c("h3", [
                      _vm._v(
                        _vm._s(
                          _vm.editingWidget ? "Edit Widget" : "Create Widget"
                        )
                      ),
                    ]),
                    _vm._v(" "),
                    _c(
                      "button",
                      {
                        staticClass: "widget-modal-close",
                        on: { click: _vm.closeWidgetModal },
                      },
                      [_c("i", { staticClass: "fas fa-times" })]
                    ),
                  ]),
                  _vm._v(" "),
                  _c("div", { staticClass: "widget-modal-body" }, [
                    _c("div", { staticClass: "widget-form-group" }, [
                      _c("label", { attrs: { for: "widget-type" } }, [
                        _vm._v("Widget Type *"),
                      ]),
                      _vm._v(" "),
                      _c(
                        "select",
                        {
                          directives: [
                            {
                              name: "model",
                              rawName: "v-model",
                              value: _vm.widgetForm.type,
                              expression: "widgetForm.type",
                            },
                          ],
                          staticClass: "widget-input",
                          attrs: {
                            id: "widget-type",
                            disabled: !!_vm.editingWidget,
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
                                _vm.widgetForm,
                                "type",
                                $event.target.multiple
                                  ? $$selectedVal
                                  : $$selectedVal[0]
                              )
                            },
                          },
                        },
                        [
                          _c("option", { attrs: { value: "advertisement" } }, [
                            _vm._v("Advertisement"),
                          ]),
                          _vm._v(" "),
                          _c("option", { attrs: { value: "activity" } }, [
                            _vm._v("Activity"),
                          ]),
                        ]
                      ),
                      _vm._v(" "),
                      _vm.widgetValidationErrors.type
                        ? _c("div", { staticClass: "validation-error" }, [
                            _vm._v(
                              "\n                        " +
                                _vm._s(_vm.widgetValidationErrors.type) +
                                "\n                    "
                            ),
                          ])
                        : _vm._e(),
                    ]),
                    _vm._v(" "),
                    _c("div", { staticClass: "widget-form-group" }, [
                      _c("label", { attrs: { for: "widget-title" } }, [
                        _vm._v("Title"),
                      ]),
                      _vm._v(" "),
                      _c("input", {
                        directives: [
                          {
                            name: "model",
                            rawName: "v-model",
                            value: _vm.widgetForm.title,
                            expression: "widgetForm.title",
                          },
                        ],
                        staticClass: "widget-input",
                        attrs: {
                          type: "text",
                          id: "widget-title",
                          placeholder: "Enter widget title...",
                        },
                        domProps: { value: _vm.widgetForm.title },
                        on: {
                          input: function ($event) {
                            if ($event.target.composing) {
                              return
                            }
                            _vm.$set(
                              _vm.widgetForm,
                              "title",
                              $event.target.value
                            )
                          },
                        },
                      }),
                    ]),
                    _vm._v(" "),
                    _vm.widgetForm.type === "activity"
                      ? _c("div", { staticClass: "widget-form-group" }, [
                          _c("label", { attrs: { for: "widget-content" } }, [
                            _vm._v("Content *"),
                          ]),
                          _vm._v(" "),
                          _c("textarea", {
                            directives: [
                              {
                                name: "model",
                                rawName: "v-model",
                                value: _vm.widgetForm.content,
                                expression: "widgetForm.content",
                              },
                            ],
                            staticClass: "widget-textarea",
                            attrs: {
                              id: "widget-content",
                              placeholder:
                                "Enter activity content (HTML supported)...",
                              rows: "4",
                            },
                            domProps: { value: _vm.widgetForm.content },
                            on: {
                              input: function ($event) {
                                if ($event.target.composing) {
                                  return
                                }
                                _vm.$set(
                                  _vm.widgetForm,
                                  "content",
                                  $event.target.value
                                )
                              },
                            },
                          }),
                          _vm._v(" "),
                          _vm.widgetValidationErrors.content
                            ? _c("div", { staticClass: "validation-error" }, [
                                _vm._v(
                                  "\n                        " +
                                    _vm._s(_vm.widgetValidationErrors.content) +
                                    "\n                    "
                                ),
                              ])
                            : _vm._e(),
                        ])
                      : _vm._e(),
                    _vm._v(" "),
                    _c("div", { staticClass: "widget-form-group" }, [
                      _c("label", { attrs: { for: "widget-image" } }, [
                        _vm._v("Image"),
                      ]),
                      _vm._v(" "),
                      _c("input", {
                        ref: "widgetImageInput",
                        staticClass: "widget-input",
                        attrs: {
                          type: "file",
                          id: "widget-image",
                          accept: "image/*",
                        },
                        on: { change: _vm.handleWidgetImageSelect },
                      }),
                      _vm._v(" "),
                      _vm.widgetForm.imagePreview
                        ? _c("div", { staticClass: "widget-image-preview" }, [
                            _c("img", {
                              attrs: {
                                src: _vm.widgetForm.imagePreview,
                                alt: "Preview",
                              },
                            }),
                            _vm._v(" "),
                            _c(
                              "button",
                              {
                                staticClass: "remove-image-btn",
                                on: { click: _vm.removeWidgetImage },
                              },
                              [_c("i", { staticClass: "fas fa-times" })]
                            ),
                          ])
                        : _vm._e(),
                      _vm._v(" "),
                      _vm.editingWidget &&
                      _vm.getWidgetImageUrl(_vm.editingWidget) &&
                      !_vm.widgetForm.imagePreview
                        ? _c("div", { staticClass: "widget-image-preview" }, [
                            _c("img", {
                              attrs: {
                                src: _vm.getWidgetImageUrl(_vm.editingWidget),
                                alt: "Current",
                              },
                            }),
                          ])
                        : _vm._e(),
                    ]),
                    _vm._v(" "),
                    _vm.widgetForm.type === "advertisement"
                      ? _c("div", { staticClass: "widget-form-group" }, [
                          _c("label", { attrs: { for: "widget-link-url" } }, [
                            _vm._v("Link URL"),
                          ]),
                          _vm._v(" "),
                          _c("input", {
                            directives: [
                              {
                                name: "model",
                                rawName: "v-model",
                                value: _vm.widgetForm.link_url,
                                expression: "widgetForm.link_url",
                              },
                            ],
                            staticClass: "widget-input",
                            attrs: {
                              type: "url",
                              id: "widget-link-url",
                              placeholder: "https://example.com",
                            },
                            domProps: { value: _vm.widgetForm.link_url },
                            on: {
                              input: function ($event) {
                                if ($event.target.composing) {
                                  return
                                }
                                _vm.$set(
                                  _vm.widgetForm,
                                  "link_url",
                                  $event.target.value
                                )
                              },
                            },
                          }),
                        ])
                      : _vm._e(),
                    _vm._v(" "),
                    _vm.widgetForm.type === "advertisement"
                      ? _c("div", { staticClass: "widget-form-group" }, [
                          _c("label", { attrs: { for: "widget-link-text" } }, [
                            _vm._v("Link Text"),
                          ]),
                          _vm._v(" "),
                          _c("input", {
                            directives: [
                              {
                                name: "model",
                                rawName: "v-model",
                                value: _vm.widgetForm.link_text,
                                expression: "widgetForm.link_text",
                              },
                            ],
                            staticClass: "widget-input",
                            attrs: {
                              type: "text",
                              id: "widget-link-text",
                              placeholder: "Click here to order yours today!",
                            },
                            domProps: { value: _vm.widgetForm.link_text },
                            on: {
                              input: function ($event) {
                                if ($event.target.composing) {
                                  return
                                }
                                _vm.$set(
                                  _vm.widgetForm,
                                  "link_text",
                                  $event.target.value
                                )
                              },
                            },
                          }),
                        ])
                      : _vm._e(),
                    _vm._v(" "),
                    _c("div", { staticClass: "widget-form-group" }, [
                      _c("label", { attrs: { for: "widget-order" } }, [
                        _vm._v("Display Order"),
                      ]),
                      _vm._v(" "),
                      _c("input", {
                        directives: [
                          {
                            name: "model",
                            rawName: "v-model.number",
                            value: _vm.widgetForm.order,
                            expression: "widgetForm.order",
                            modifiers: { number: true },
                          },
                        ],
                        staticClass: "widget-input",
                        attrs: { type: "number", id: "widget-order", min: "0" },
                        domProps: { value: _vm.widgetForm.order },
                        on: {
                          input: function ($event) {
                            if ($event.target.composing) {
                              return
                            }
                            _vm.$set(
                              _vm.widgetForm,
                              "order",
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
                    _c("div", { staticClass: "widget-form-group" }, [
                      _c("label", { staticClass: "widget-checkbox-label" }, [
                        _c("input", {
                          directives: [
                            {
                              name: "model",
                              rawName: "v-model",
                              value: _vm.widgetForm.is_active,
                              expression: "widgetForm.is_active",
                            },
                          ],
                          attrs: { type: "checkbox" },
                          domProps: {
                            checked: Array.isArray(_vm.widgetForm.is_active)
                              ? _vm._i(_vm.widgetForm.is_active, null) > -1
                              : _vm.widgetForm.is_active,
                          },
                          on: {
                            change: function ($event) {
                              var $$a = _vm.widgetForm.is_active,
                                $$el = $event.target,
                                $$c = $$el.checked ? true : false
                              if (Array.isArray($$a)) {
                                var $$v = null,
                                  $$i = _vm._i($$a, $$v)
                                if ($$el.checked) {
                                  $$i < 0 &&
                                    _vm.$set(
                                      _vm.widgetForm,
                                      "is_active",
                                      $$a.concat([$$v])
                                    )
                                } else {
                                  $$i > -1 &&
                                    _vm.$set(
                                      _vm.widgetForm,
                                      "is_active",
                                      $$a
                                        .slice(0, $$i)
                                        .concat($$a.slice($$i + 1))
                                    )
                                }
                              } else {
                                _vm.$set(_vm.widgetForm, "is_active", $$c)
                              }
                            },
                          },
                        }),
                        _vm._v(" "),
                        _c("span", [_vm._v("Active (visible on page)")]),
                      ]),
                    ]),
                  ]),
                  _vm._v(" "),
                  _c("div", { staticClass: "widget-modal-footer" }, [
                    _c(
                      "button",
                      {
                        staticClass: "widget-cancel-btn",
                        on: { click: _vm.closeWidgetModal },
                      },
                      [_vm._v("\n                    Cancel\n                ")]
                    ),
                    _vm._v(" "),
                    _c(
                      "button",
                      {
                        staticClass: "widget-save-btn",
                        on: { click: _vm.saveWidget },
                      },
                      [
                        _vm._v(
                          "\n                    " +
                            _vm._s(_vm.editingWidget ? "Update" : "Create") +
                            "\n                "
                        ),
                      ]
                    ),
                  ]),
                ]
              ),
            ]
          )
        : _vm._e(),
      _vm._v(" "),
      _c(
        "b-modal",
        {
          staticClass: "video-tutorial-modal",
          attrs: {
            title: "Community Tutorial",
            size: "lg",
            centered: "",
            "hide-footer": "",
          },
          on: { hide: _vm.closeVideoTutorialModal },
          model: {
            value: _vm.showVideoTutorialModal,
            callback: function ($$v) {
              _vm.showVideoTutorialModal = $$v
            },
            expression: "showVideoTutorialModal",
          },
        },
        [
          _c("div", { staticClass: "video-container" }, [
            _vm.videoError
              ? _c("div", { staticClass: "text-center py-4" }, [
                  _c("i", {
                    staticClass: "fas fa-exclamation-triangle text-warning",
                    staticStyle: { "font-size": "2rem" },
                  }),
                  _vm._v(" "),
                  _c("p", { staticClass: "mt-2" }, [
                    _vm._v(_vm._s(_vm.videoError)),
                  ]),
                ])
              : _c("div", { staticClass: "position-relative" }, [
                  _vm.isVideoLoading
                    ? _c("div", { staticClass: "video-loading-overlay" }, [
                        _c("div", { staticClass: "text-center py-4" }, [
                          _c(
                            "div",
                            {
                              staticClass: "spinner-border text-primary",
                              attrs: { role: "status" },
                            },
                            [
                              _c("span", { staticClass: "sr-only" }, [
                                _vm._v("Loading..."),
                              ]),
                            ]
                          ),
                          _vm._v(" "),
                          _c("p", { staticClass: "mt-2" }, [
                            _vm._v("Loading video..."),
                          ]),
                        ]),
                      ])
                    : _vm._e(),
                  _vm._v(" "),
                  _c(
                    "video",
                    {
                      staticClass: "w-100 rounded",
                      staticStyle: { "max-height": "500px" },
                      attrs: { src: _vm.videoTutorialUrl, controls: "" },
                      on: {
                        loadstart: _vm.onVideoLoadStart,
                        canplay: _vm.onVideoCanPlay,
                        error: _vm.handleVideoError,
                        loadeddata: _vm.onVideoLoaded,
                        loadedmetadata: _vm.onVideoLoaded,
                      },
                    },
                    [
                      _vm._v(
                        "\n                    Your browser does not support the video tag.\n                "
                      ),
                    ]
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
    return _c("div", { staticClass: "drag-message" }, [
      _c("i", { staticClass: "fas fa-cloud-upload-alt" }),
      _vm._v(" "),
      _c("p", [_vm._v("Drop your cover photo here")]),
    ])
  },
  function () {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "group-logo" }, [
      _c("div", { staticClass: "logo-square" }, [
        _c("span", { staticClass: "logo-text" }, [_vm._v("TF")]),
        _vm._v(" "),
        _c("i", { staticClass: "fas fa-bolt logo-bolt" }),
      ]),
    ])
  },
  function () {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "user-avatar" }, [
      _c("i", { staticClass: "fas fa-user" }),
    ])
  },
  function () {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "user-avatar" }, [
      _c("i", { staticClass: "fas fa-user" }),
    ])
  },
  function () {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "user-avatar" }, [
      _c("i", { staticClass: "fas fa-user" }),
    ])
  },
  function () {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "comment-user-avatar" }, [
      _c("i", { staticClass: "fas fa-user" }),
    ])
  },
  function () {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "activity-user-avatar" }, [
      _c("i", { staticClass: "fas fa-user" }),
    ])
  },
  function () {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "user-avatar" }, [
      _c("i", { staticClass: "fas fa-user" }),
    ])
  },
]
render._withStripped = true



/***/ })

}]);