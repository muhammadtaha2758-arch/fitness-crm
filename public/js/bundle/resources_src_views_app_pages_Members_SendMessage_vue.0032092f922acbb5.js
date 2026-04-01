"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["resources_src_views_app_pages_Members_SendMessage_vue"],{

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/Members/SendMessage.vue?vue&type=script&lang=js":
/*!*******************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/Members/SendMessage.vue?vue&type=script&lang=js ***!
  \*******************************************************************************************************************************************************************************************************************/
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

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  name: "SendMessage",
  data: function data() {
    return {
      selectedCoach: "coach-kc",
      searchName: "",
      recipients: [],
      recipientData: {},
      // Store recipient details with ID as key
      messageSubject: "",
      messageBody: "",
      isLoadingMember: false,
      // Search dropdown state
      suggestions: [],
      isSearching: false,
      showSuggestions: false,
      searchDebounceTimer: null
    };
  },
  watch: {
    searchName: function searchName(newVal) {
      var _this = this;
      clearTimeout(this.searchDebounceTimer);
      this.searchDebounceTimer = setTimeout(function () {
        _this.fetchSuggestions(newVal.trim());
      }, 300);
    }
  },
  created: function created() {
    var _this2 = this;
    return _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
      return _regeneratorRuntime().wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            if (!_this2.$route.query.memberId) {
              _context.next = 3;
              break;
            }
            _context.next = 3;
            return _this2.loadMemberDetails(_this2.$route.query.memberId);
          case 3:
          case "end":
            return _context.stop();
        }
      }, _callee);
    }))();
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
    // Method to navigate to sent messages tab (can be called from other components)
    goToSentMessages: function goToSentMessages() {
      this.showSentMessagesView();
    },
    // Method to navigate to inbox tab (can be called from other components)
    goToInbox: function goToInbox() {
      this.showInbox();
    },
    // Static method to navigate to SendMessage with specific tab (can be called from other components)
    staticNavigateToSentMessages: function staticNavigateToSentMessages() {
      this.$router.push({
        name: 'SendMessage',
        query: {
          tab: 'sent'
        }
      });
    },
    // Static method to navigate to SendMessage with member and specific tab
    staticNavigateToSendMessage: function staticNavigateToSendMessage(memberId) {
      var tab = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'inbox';
      this.$router.push({
        name: 'SendMessage',
        query: {
          memberId: memberId,
          tab: tab
        }
      });
    },
    loadMemberDetails: function loadMemberDetails(memberId) {
      var _this3 = this;
      return _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee2() {
        var response, member, avatar;
        return _regeneratorRuntime().wrap(function _callee2$(_context2) {
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
              _this3.isLoadingMember = true;
              _context2.prev = 1;
              _context2.next = 4;
              return axios.get("members/".concat(memberId));
            case 4:
              response = _context2.sent;
              member = response.data; // Store member data with ID as key
              // Handle profile image - support both base64 (legacy) and file paths
              avatar = null;
              if (member.profile_image) {
                if (member.profile_image.startsWith('data:image/')) {
                  // Base64 data URI (legacy)
                  avatar = member.profile_image;
                } else if (member.profile_image.startsWith('/') || member.profile_image.startsWith('http')) {
                  // Already a full path
                  avatar = member.profile_image;
                } else {
                  // Just a filename, construct full path
                  avatar = "/images/avatar/".concat(member.profile_image);
                }
              }
              _this3.recipientData[memberId] = {
                id: member.id,
                name: "".concat(member.first_name, " ").concat(member.last_name),
                email: member.email,
                phone: member.mobile_phone || member.phone,
                avatar: avatar
              };

              // Add to recipients list
              _this3.recipients.push(memberId);
              _context2.next = 18;
              break;
            case 12:
              _context2.prev = 12;
              _context2.t0 = _context2["catch"](1);
              console.error('Error loading member details:', _context2.t0);

              // Fallback: Use member ID as name if API fails
              _this3.recipientData[memberId] = {
                id: memberId,
                name: "Member ".concat(memberId),
                email: null,
                phone: null
              };

              // Add to recipients list with fallback name
              _this3.recipients.push(memberId);

              // Show a less intrusive message
              console.warn('Using fallback member data due to API error');
            case 18:
              _context2.prev = 18;
              _this3.isLoadingMember = false;
              return _context2.finish(18);
            case 21:
            case "end":
              return _context2.stop();
          }
        }, _callee2, null, [[1, 12, 18, 21]]);
      }))();
    },
    composeNewMessage: function composeNewMessage() {
      // Reset form for new message
      this.searchName = "";
      this.suggestions = [];
      this.showSuggestions = false;
      this.recipients = [];
      this.recipientData = {};
      this.messageSubject = "";
      this.messageBody = "";
    },
    // --- Search dropdown handlers ---
    onSearchFocus: function onSearchFocus() {
      if (this.searchName && this.suggestions.length) {
        this.showSuggestions = true;
      }
    },
    onSearchBlur: function onSearchBlur() {
      var _this4 = this;
      // Delay hiding to allow click via mousedown on items
      setTimeout(function () {
        _this4.showSuggestions = false;
      }, 120);
    },
    fetchSuggestions: function fetchSuggestions(query) {
      var _this5 = this;
      return _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee3() {
        var resp;
        return _regeneratorRuntime().wrap(function _callee3$(_context3) {
          while (1) switch (_context3.prev = _context3.next) {
            case 0:
              if (!(!query || query.length < 2)) {
                _context3.next = 4;
                break;
              }
              _this5.suggestions = [];
              _this5.isSearching = false;
              return _context3.abrupt("return");
            case 4:
              _this5.isSearching = true;
              _context3.prev = 5;
              _context3.next = 8;
              return axios.get('communication/members', {
                params: {
                  search: query
                }
              });
            case 8:
              resp = _context3.sent;
              if (resp.data && resp.data.success) {
                _this5.suggestions = resp.data.members || [];
              } else if (resp.data && resp.data.data && resp.data.data.members) {
                // Fallback if using index endpoint structure
                _this5.suggestions = resp.data.data.members || [];
              } else {
                _this5.suggestions = [];
              }
              _context3.next = 15;
              break;
            case 12:
              _context3.prev = 12;
              _context3.t0 = _context3["catch"](5);
              // Silent fail to keep UX smooth
              _this5.suggestions = [];
            case 15:
              _context3.prev = 15;
              _this5.isSearching = false;
              _this5.showSuggestions = !!_this5.suggestions.length;
              return _context3.finish(15);
            case 19:
            case "end":
              return _context3.stop();
          }
        }, _callee3, null, [[5, 12, 15, 19]]);
      }))();
    },
    selectSuggestion: function selectSuggestion(s) {
      var recipientId = s.id;
      if (!this.recipients.includes(recipientId)) {
        this.recipients.push(recipientId);
        this.recipientData[recipientId] = {
          id: s.id,
          name: s.name,
          email: s.email,
          avatar: s.avatar || null
        };
      }
      this.searchName = '';
      this.suggestions = [];
      this.showSuggestions = false;
    },
    addRecipient: function addRecipient() {
      var searchTerm = this.searchName.trim();
      if (searchTerm && !this.recipients.includes(searchTerm)) {
        // Check if it's a numeric ID (member ID)
        if (/^\d+$/.test(searchTerm)) {
          // It's a member ID, fetch details
          this.loadMemberDetails(searchTerm);
        } else {
          // It's a name, add directly
          this.recipients.push(searchTerm);
          this.recipientData[searchTerm] = {
            id: null,
            name: searchTerm,
            email: null,
            phone: null
          };
        }
        this.searchName = "";
      }
    },
    removeRecipient: function removeRecipient(recipient) {
      var index = this.recipients.indexOf(recipient);
      if (index > -1) {
        this.recipients.splice(index, 1);
        // Clean up recipient data
        delete this.recipientData[recipient];
      }
    },
    getRecipientName: function getRecipientName(recipient) {
      var _this$recipientData$r;
      // Return the name if we have recipient data, otherwise return the recipient as-is
      return ((_this$recipientData$r = this.recipientData[recipient]) === null || _this$recipientData$r === void 0 ? void 0 : _this$recipientData$r.name) || recipient;
    },
    getRecipientDisplayName: function getRecipientDisplayName(recipient) {
      // Return the name with ID in braces if we have recipient data
      var recipientData = this.recipientData[recipient];
      if (recipientData && recipientData.id) {
        return "".concat(recipientData.name, " (").concat(recipientData.id, ")");
      }
      // Fallback for legacy entries without proper data
      return recipient;
    },
    getRecipientAvatar: function getRecipientAvatar(recipient) {
      var _this$recipientData$r2;
      // Return the avatar URL if we have recipient data
      return ((_this$recipientData$r2 = this.recipientData[recipient]) === null || _this$recipientData$r2 === void 0 ? void 0 : _this$recipientData$r2.avatar) || null;
    },
    showInbox: function showInbox() {
      // This method is no longer needed as we navigate to separate components
    },
    showError: function showError(message) {
      this.$swal({
        title: 'Error',
        text: message,
        icon: 'error',
        confirmButtonText: 'OK',
        confirmButtonColor: '#dc3545'
      });
    },
    sendMessage: function sendMessage() {
      var _this6 = this;
      return _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee4() {
        var memberId, messageData, response;
        return _regeneratorRuntime().wrap(function _callee4$(_context4) {
          while (1) switch (_context4.prev = _context4.next) {
            case 0:
              if (!(_this6.recipients.length === 0)) {
                _context4.next = 3;
                break;
              }
              _this6.$swal({
                title: 'No Recipients',
                text: 'Please add at least one recipient before sending.',
                icon: 'warning',
                confirmButtonText: 'OK',
                confirmButtonColor: '#dc3545'
              });
              return _context4.abrupt("return");
            case 3:
              if (_this6.messageSubject.trim()) {
                _context4.next = 6;
                break;
              }
              _this6.$swal({
                title: 'Missing Subject',
                text: 'Please enter a subject for your message.',
                icon: 'warning',
                confirmButtonText: 'OK',
                confirmButtonColor: '#dc3545'
              });
              return _context4.abrupt("return");
            case 6:
              if (_this6.messageBody.trim()) {
                _context4.next = 9;
                break;
              }
              _this6.$swal({
                title: 'Empty Message',
                text: 'Please enter a message before sending.',
                icon: 'warning',
                confirmButtonText: 'OK',
                confirmButtonColor: '#dc3545'
              });
              return _context4.abrupt("return");
            case 9:
              _context4.prev = 9;
              // Get the member ID from route query or use the first recipient
              memberId = _this6.$route.query.memberId || _this6.recipients[0];
              if (memberId) {
                _context4.next = 14;
                break;
              }
              _this6.showError('No member ID found');
              return _context4.abrupt("return");
            case 14:
              // Prepare message data
              messageData = {
                recipients: _this6.recipients.join(', '),
                subject: _this6.messageSubject,
                body: _this6.messageBody
              }; // Send message via API
              _context4.next = 17;
              return axios.post("members/".concat(memberId, "/send-message"), messageData);
            case 17:
              response = _context4.sent;
              if (response.data.success) {
                _this6.$swal({
                  title: 'Message Sent!',
                  text: response.data.message || 'Your message has been sent successfully.',
                  icon: 'success',
                  confirmButtonText: 'OK',
                  confirmButtonColor: '#dc3545'
                }).then(function () {
                  // Reset form after successful send
                  _this6.composeNewMessage();
                });
              } else {
                _this6.showError(response.data.message || 'Failed to send message');
              }
              _context4.next = 25;
              break;
            case 21:
              _context4.prev = 21;
              _context4.t0 = _context4["catch"](9);
              console.error('Error sending message:', _context4.t0);
              _this6.showError('Error sending message. Please try again.');
            case 25:
            case "end":
              return _context4.stop();
          }
        }, _callee4, null, [[9, 21]]);
      }))();
    }
  }
});

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js??clonedRuleSet-12.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12.use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-12.use[3]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/Members/SendMessage.vue?vue&type=style&index=0&id=26a850dc&lang=scss&scoped=true":
/*!**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??clonedRuleSet-12.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12.use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-12.use[3]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/Members/SendMessage.vue?vue&type=style&index=0&id=26a850dc&lang=scss&scoped=true ***!
  \**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
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
___CSS_LOADER_EXPORT___.push([module.id, "@charset \"UTF-8\";\n.filter-btn .btn[data-v-26a850dc],\n.filter-btn .btn-secondary[data-v-26a850dc],\n.filter-btn .btn-outline-secondary[data-v-26a850dc],\n.filter-btn button.btn[data-v-26a850dc],\n.filter-btn button.btn-secondary[data-v-26a850dc] {\n  color: #000 !important;\n  background-color: transparent !important;\n  border-color: #6c757d !important;\n}\n.filter-btn .btn[data-v-26a850dc]:hover,\n.filter-btn .btn-secondary[data-v-26a850dc]:hover,\n.filter-btn .btn-outline-secondary[data-v-26a850dc]:hover,\n.filter-btn button.btn[data-v-26a850dc]:hover,\n.filter-btn button.btn-secondary[data-v-26a850dc]:hover {\n  color: #dc3545 !important;\n  background-color: transparent !important;\n  border-color: #dc3545 !important;\n  box-shadow: none !important;\n}\n.filter-btn .btn[data-v-26a850dc]:focus,\n.filter-btn .btn-secondary[data-v-26a850dc]:focus,\n.filter-btn .btn-outline-secondary[data-v-26a850dc]:focus,\n.filter-btn button.btn[data-v-26a850dc]:focus,\n.filter-btn button.btn-secondary[data-v-26a850dc]:focus {\n  color: #dc3545 !important;\n  background-color: transparent !important;\n  border-color: #dc3545 !important;\n  box-shadow: none !important;\n}\n.filter-btn .btn[data-v-26a850dc]:active,\n.filter-btn .btn-secondary[data-v-26a850dc]:active,\n.filter-btn .btn-outline-secondary[data-v-26a850dc]:active,\n.filter-btn button.btn[data-v-26a850dc]:active,\n.filter-btn button.btn-secondary[data-v-26a850dc]:active {\n  color: #dc3545 !important;\n  background-color: transparent !important;\n  border-color: #dc3545 !important;\n}\n.btn-secondary[data-v-26a850dc]:not(:disabled):not(.disabled):active:focus {\n  box-shadow: none !important;\n}\n\n/* ===========================================\n   COMMON BREADCRUMB NAVIGATION STYLES\n   =========================================== */\n.breadcrumb-nav-row[data-v-26a850dc] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  margin-bottom: 0.5rem;\n  gap: 0.5rem;\n}\n.breadcrumb-section[data-v-26a850dc] {\n  flex: 1;\n}\n.breadcrumb-section .breadcrumb-nav .breadcrumb-container[data-v-26a850dc] {\n  display: flex;\n  align-items: center;\n  gap: 1rem;\n}\n.breadcrumb-section .breadcrumb-nav .breadcrumb-container .back-button[data-v-26a850dc] {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  width: 40px;\n  height: 40px;\n  background: rgba(255, 255, 255, 0.1);\n  border: 1px solid rgba(255, 255, 255, 0.2);\n  border-radius: 8px;\n  color: #ffffff;\n  cursor: pointer;\n  transition: all 0.3s ease;\n}\n.breadcrumb-section .breadcrumb-nav .breadcrumb-container .back-button[data-v-26a850dc]:hover {\n  background: rgba(255, 255, 255, 0.15);\n  border-color: rgba(255, 255, 255, 0.3);\n  transform: translateY(-1px);\n  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);\n  color: #dc3545;\n}\n.breadcrumb-section .breadcrumb-nav .breadcrumb-container .back-button i[data-v-26a850dc] {\n  font-size: 1.1em;\n}\n.breadcrumb-section .breadcrumb-nav .breadcrumb-container .breadcrumb[data-v-26a850dc] {\n  display: flex;\n  align-items: center;\n  gap: 0.5rem;\n  margin: 0;\n  padding: 0;\n  background: none;\n  border-radius: 0;\n}\n.breadcrumb-section .breadcrumb-nav .breadcrumb-container .breadcrumb .breadcrumb-item[data-v-26a850dc] {\n  display: flex;\n  align-items: center;\n  gap: 0.5rem;\n  font-size: 0.875rem;\n  color: #ffffff;\n}\n.breadcrumb-section .breadcrumb-nav .breadcrumb-container .breadcrumb .breadcrumb-item.active[data-v-26a850dc] {\n  color: #252525;\n  font-weight: 600;\n}\n.breadcrumb-section .breadcrumb-nav .breadcrumb-container .breadcrumb .breadcrumb-item.active i[data-v-26a850dc] {\n  color: #dc3545;\n}\n.breadcrumb-section .breadcrumb-nav .breadcrumb-container .breadcrumb .breadcrumb-item a[data-v-26a850dc] {\n  display: flex;\n  align-items: center;\n  gap: 0.5rem;\n  color: #6a6a6a;\n  text-decoration: none;\n  transition: color 0.3s ease;\n}\n.breadcrumb-section .breadcrumb-nav .breadcrumb-container .breadcrumb .breadcrumb-item a[data-v-26a850dc]:hover {\n  color: #dc3545;\n}\n.breadcrumb-section .breadcrumb-nav .breadcrumb-container .breadcrumb .breadcrumb-item a:hover i[data-v-26a850dc] {\n  color: #dc3545;\n}\n.breadcrumb-section .breadcrumb-nav .breadcrumb-container .breadcrumb .breadcrumb-item a i[data-v-26a850dc] {\n  font-size: 0.9em;\n  transition: color 0.3s ease;\n}\n.breadcrumb-section .breadcrumb-nav .breadcrumb-container .breadcrumb .breadcrumb-item[data-v-26a850dc]:not(:last-child)::after {\n  content: \"›\";\n  margin-left: 0.5rem;\n  color: #6a6a6a;\n  font-size: 1.2em;\n}\n.action-section[data-v-26a850dc] {\n  display: flex;\n  align-items: center;\n}\n.action-section .action-btn[data-v-26a850dc] {\n  display: flex;\n  align-items: center;\n  gap: 0.5rem;\n  padding: 0.5rem 1rem;\n  border-radius: 8px;\n  font-size: 0.875rem;\n  font-weight: 500;\n  transition: all 0.3s ease;\n}\n.action-section .action-btn[data-v-26a850dc]:hover:not(:disabled) {\n  transform: translateY(-1px);\n  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);\n}\n.action-section .action-btn[data-v-26a850dc]:disabled {\n  opacity: 0.6;\n  cursor: not-allowed;\n}\n.action-section .action-btn i[data-v-26a850dc] {\n  font-size: 0.9em;\n}\n@media (max-width: 768px) {\n.breadcrumb-nav-row[data-v-26a850dc] {\n    flex-direction: column;\n    align-items: flex-start;\n    gap: 0.5rem;\n}\n.breadcrumb-section[data-v-26a850dc] {\n    width: 100%;\n}\n.breadcrumb-section .breadcrumb-container[data-v-26a850dc] {\n    flex-direction: column;\n    align-items: flex-start;\n    gap: 0.5rem;\n}\n.breadcrumb-section .breadcrumb-container .breadcrumb[data-v-26a850dc] {\n    flex-wrap: wrap;\n}\n.breadcrumb-section .breadcrumb-container .breadcrumb .breadcrumb-item[data-v-26a850dc] {\n    font-size: 0.8rem;\n}\n.breadcrumb-section .breadcrumb-container .breadcrumb .breadcrumb-item a[data-v-26a850dc] {\n    font-size: 0.8rem;\n}\n.action-section[data-v-26a850dc] {\n    width: 100%;\n    justify-content: flex-end;\n}\n.action-section .action-btn[data-v-26a850dc] {\n    font-size: 0.8rem;\n    padding: 0.4rem 0.8rem;\n}\n}\n/* ===========================================\n   RESPONSIVE UTILITY CLASSES (ALL DEVICES)\n   =========================================== */\n.show-xs-only[data-v-26a850dc],\n.show-sm-only[data-v-26a850dc],\n.show-md-only[data-v-26a850dc],\n.show-lg-only[data-v-26a850dc],\n.show-xl-only[data-v-26a850dc] {\n  display: none !important;\n}\n@media (max-width: 575px) {\n.hide-xs[data-v-26a850dc] {\n    display: none !important;\n}\n.show-xs-only[data-v-26a850dc] {\n    display: initial !important;\n}\n}\n@media (min-width: 576px) and (max-width: 767px) {\n.hide-sm[data-v-26a850dc] {\n    display: none !important;\n}\n.show-sm-only[data-v-26a850dc] {\n    display: initial !important;\n}\n}\n@media (min-width: 768px) and (max-width: 991px) {\n.hide-md[data-v-26a850dc] {\n    display: none !important;\n}\n.show-md-only[data-v-26a850dc] {\n    display: initial !important;\n}\n}\n@media (min-width: 992px) and (max-width: 1199px) {\n.hide-lg[data-v-26a850dc] {\n    display: none !important;\n}\n.show-lg-only[data-v-26a850dc] {\n    display: initial !important;\n}\n}\n@media (min-width: 1200px) {\n.hide-xl[data-v-26a850dc] {\n    display: none !important;\n}\n.show-xl-only[data-v-26a850dc] {\n    display: initial !important;\n}\n}\n@media (max-width: 576px) {\n.hide-sm-down[data-v-26a850dc] {\n    display: none !important;\n}\n}\n@media (max-width: 768px) {\n.hide-md-down[data-v-26a850dc] {\n    display: none !important;\n}\n}\n@media (max-width: 992px) {\n.hide-lg-down[data-v-26a850dc] {\n    display: none !important;\n}\n}\n@media (min-width: 576px) {\n.hide-sm-up[data-v-26a850dc] {\n    display: none !important;\n}\n}\n@media (min-width: 768px) {\n.hide-md-up[data-v-26a850dc] {\n    display: none !important;\n}\n}\n@media (min-width: 992px) {\n.hide-lg-up[data-v-26a850dc] {\n    display: none !important;\n}\n}\n@media (max-width: 575px) {\n.d-xs-none[data-v-26a850dc] {\n    display: none !important;\n}\n.d-xs-block[data-v-26a850dc] {\n    display: block !important;\n}\n.d-xs-flex[data-v-26a850dc] {\n    display: flex !important;\n}\n}\n@media (min-width: 576px) and (max-width: 767px) {\n.d-sm-none[data-v-26a850dc] {\n    display: none !important;\n}\n.d-sm-block[data-v-26a850dc] {\n    display: block !important;\n}\n.d-sm-flex[data-v-26a850dc] {\n    display: flex !important;\n}\n}\n@media (min-width: 768px) and (max-width: 991px) {\n.d-md-none[data-v-26a850dc] {\n    display: none !important;\n}\n.d-md-block[data-v-26a850dc] {\n    display: block !important;\n}\n.d-md-flex[data-v-26a850dc] {\n    display: flex !important;\n}\n}\n@media (min-width: 992px) and (max-width: 1199px) {\n.d-lg-none[data-v-26a850dc] {\n    display: none !important;\n}\n.d-lg-block[data-v-26a850dc] {\n    display: block !important;\n}\n.d-lg-flex[data-v-26a850dc] {\n    display: flex !important;\n}\n}\n@media (min-width: 1200px) {\n.d-xl-none[data-v-26a850dc] {\n    display: none !important;\n}\n.d-xl-block[data-v-26a850dc] {\n    display: block !important;\n}\n.d-xl-flex[data-v-26a850dc] {\n    display: flex !important;\n}\n}\n@media (min-width: 576px) {\n.custom-modal-xl[data-v-26a850dc] {\n    max-width: 1500px !important;\n}\n}\n/* Custom styles for your color scheme */\n.nav-pills .nav-link.active[data-v-26a850dc] {\n  background-color: #dc3545 !important;\n  border-color: #dc3545 !important;\n  color: white !important;\n}\n.nav-pills .nav-link[data-v-26a850dc] {\n  color: #6c757d;\n  border: 1px solid transparent;\n  border-radius: 0.375rem;\n  padding: 0.5rem 1rem;\n}\n.nav-pills .nav-link[data-v-26a850dc]:hover {\n  background-color: rgba(220, 53, 69, 0.1);\n  color: #dc3545;\n  border-color: rgba(220, 53, 69, 0.2);\n}\n.page-link[data-v-26a850dc]:hover {\n  background-color: rgba(220, 53, 69, 0.1);\n  border-color: #dc3545;\n  color: #dc3545;\n}\n.badge-secondary[data-v-26a850dc] {\n  background-color: #6c757d !important;\n}\n\n/* Layout adjustments */\n.send-message-page[data-v-26a850dc] {\n  min-height: 100vh;\n  background-color: #f8f9fa;\n}\n.sent-messages-modal[data-v-26a850dc] {\n  padding: 1rem;\n  background-color: white;\n  border-radius: 0.5rem;\n  box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075);\n}\n.message-compose[data-v-26a850dc] {\n  padding: 0;\n}\n.message-compose .card[data-v-26a850dc] {\n  border: none;\n  border-radius: 0.5rem;\n  padding: 10px;\n}\n.message-compose .form-label[data-v-26a850dc] {\n  margin-bottom: 0.5rem;\n  color: #495057;\n}\n.message-compose .form-control[data-v-26a850dc] {\n  border-radius: 0.375rem;\n  border: 1px solid #ced4da;\n}\n.message-compose .form-control[data-v-26a850dc]:focus {\n  border-color: #dc3545;\n  box-shadow: 0 0 0 0.2rem rgba(220, 53, 69, 0.25);\n}\n.message-compose .btn-primary[data-v-26a850dc] {\n  background-color: #dc3545;\n  border-color: #dc3545;\n  border-radius: 0.375rem;\n  padding: 0.5rem 1.5rem;\n}\n.message-compose .btn-primary[data-v-26a850dc]:hover {\n  background-color: #c82333;\n  border-color: #bd2130;\n}\n.message-compose .btn-primary[data-v-26a850dc]:focus {\n  box-shadow: 0 0 0 0.2rem rgba(220, 53, 69, 0.5);\n}\n\n/* Responsive adjustments */\n@media (max-width: 768px) {\n.sidebar[data-v-26a850dc] {\n    margin-bottom: 1rem;\n}\n.message-compose .col-lg-8[data-v-26a850dc] {\n    padding: 0 1rem;\n}\n}", ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-12.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12.use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-12.use[3]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/Members/SendMessage.vue?vue&type=style&index=0&id=26a850dc&lang=scss&scoped=true":
/*!**************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-12.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12.use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-12.use[3]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/Members/SendMessage.vue?vue&type=style&index=0&id=26a850dc&lang=scss&scoped=true ***!
  \**************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../../../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_clonedRuleSet_12_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_12_use_2_node_modules_sass_loader_dist_cjs_js_clonedRuleSet_12_use_3_node_modules_vue_loader_lib_index_js_vue_loader_options_SendMessage_vue_vue_type_style_index_0_id_26a850dc_lang_scss_scoped_true__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !!../../../../../../node_modules/css-loader/dist/cjs.js??clonedRuleSet-12.use[1]!../../../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12.use[2]!../../../../../../node_modules/sass-loader/dist/cjs.js??clonedRuleSet-12.use[3]!../../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./SendMessage.vue?vue&type=style&index=0&id=26a850dc&lang=scss&scoped=true */ "./node_modules/css-loader/dist/cjs.js??clonedRuleSet-12.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12.use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-12.use[3]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/Members/SendMessage.vue?vue&type=style&index=0&id=26a850dc&lang=scss&scoped=true");

            

var options = {};

options.insert = "head";
options.singleton = false;

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_clonedRuleSet_12_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_12_use_2_node_modules_sass_loader_dist_cjs_js_clonedRuleSet_12_use_3_node_modules_vue_loader_lib_index_js_vue_loader_options_SendMessage_vue_vue_type_style_index_0_id_26a850dc_lang_scss_scoped_true__WEBPACK_IMPORTED_MODULE_1__["default"], options);



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_clonedRuleSet_12_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_12_use_2_node_modules_sass_loader_dist_cjs_js_clonedRuleSet_12_use_3_node_modules_vue_loader_lib_index_js_vue_loader_options_SendMessage_vue_vue_type_style_index_0_id_26a850dc_lang_scss_scoped_true__WEBPACK_IMPORTED_MODULE_1__["default"].locals || {});

/***/ }),

/***/ "./resources/src/views/app/pages/Members/SendMessage.vue":
/*!***************************************************************!*\
  !*** ./resources/src/views/app/pages/Members/SendMessage.vue ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _SendMessage_vue_vue_type_template_id_26a850dc_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./SendMessage.vue?vue&type=template&id=26a850dc&scoped=true */ "./resources/src/views/app/pages/Members/SendMessage.vue?vue&type=template&id=26a850dc&scoped=true");
/* harmony import */ var _SendMessage_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./SendMessage.vue?vue&type=script&lang=js */ "./resources/src/views/app/pages/Members/SendMessage.vue?vue&type=script&lang=js");
/* harmony import */ var _SendMessage_vue_vue_type_style_index_0_id_26a850dc_lang_scss_scoped_true__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./SendMessage.vue?vue&type=style&index=0&id=26a850dc&lang=scss&scoped=true */ "./resources/src/views/app/pages/Members/SendMessage.vue?vue&type=style&index=0&id=26a850dc&lang=scss&scoped=true");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");



;


/* normalize component */

var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _SendMessage_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__["default"],
  _SendMessage_vue_vue_type_template_id_26a850dc_scoped_true__WEBPACK_IMPORTED_MODULE_0__.render,
  _SendMessage_vue_vue_type_template_id_26a850dc_scoped_true__WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  "26a850dc",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/src/views/app/pages/Members/SendMessage.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./resources/src/views/app/pages/Members/SendMessage.vue?vue&type=script&lang=js":
/*!***************************************************************************************!*\
  !*** ./resources/src/views/app/pages/Members/SendMessage.vue?vue&type=script&lang=js ***!
  \***************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_SendMessage_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./SendMessage.vue?vue&type=script&lang=js */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/Members/SendMessage.vue?vue&type=script&lang=js");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_SendMessage_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/src/views/app/pages/Members/SendMessage.vue?vue&type=style&index=0&id=26a850dc&lang=scss&scoped=true":
/*!************************************************************************************************************************!*\
  !*** ./resources/src/views/app/pages/Members/SendMessage.vue?vue&type=style&index=0&id=26a850dc&lang=scss&scoped=true ***!
  \************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_dist_cjs_js_node_modules_css_loader_dist_cjs_js_clonedRuleSet_12_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_12_use_2_node_modules_sass_loader_dist_cjs_js_clonedRuleSet_12_use_3_node_modules_vue_loader_lib_index_js_vue_loader_options_SendMessage_vue_vue_type_style_index_0_id_26a850dc_lang_scss_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/style-loader/dist/cjs.js!../../../../../../node_modules/css-loader/dist/cjs.js??clonedRuleSet-12.use[1]!../../../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12.use[2]!../../../../../../node_modules/sass-loader/dist/cjs.js??clonedRuleSet-12.use[3]!../../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./SendMessage.vue?vue&type=style&index=0&id=26a850dc&lang=scss&scoped=true */ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-12.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12.use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-12.use[3]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/Members/SendMessage.vue?vue&type=style&index=0&id=26a850dc&lang=scss&scoped=true");


/***/ }),

/***/ "./resources/src/views/app/pages/Members/SendMessage.vue?vue&type=template&id=26a850dc&scoped=true":
/*!*********************************************************************************************************!*\
  !*** ./resources/src/views/app/pages/Members/SendMessage.vue?vue&type=template&id=26a850dc&scoped=true ***!
  \*********************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_SendMessage_vue_vue_type_template_id_26a850dc_scoped_true__WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   staticRenderFns: () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_SendMessage_vue_vue_type_template_id_26a850dc_scoped_true__WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_SendMessage_vue_vue_type_template_id_26a850dc_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./SendMessage.vue?vue&type=template&id=26a850dc&scoped=true */ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/Members/SendMessage.vue?vue&type=template&id=26a850dc&scoped=true");


/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/Members/SendMessage.vue?vue&type=template&id=26a850dc&scoped=true":
/*!************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/Members/SendMessage.vue?vue&type=template&id=26a850dc&scoped=true ***!
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
  return _c("div", { staticClass: "send-message-page" }, [
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
                  _c(
                    "li",
                    { staticClass: "breadcrumb-item" },
                    [
                      _c(
                        "router-link",
                        { attrs: { to: "/app/Members/ViewAllMembers" } },
                        [
                          _c("i", { staticClass: "fas fa-users" }),
                          _vm._v(
                            "\n                                Members\n                            "
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
                      attrs: { "aria-current": "page" },
                    },
                    [
                      _c("i", { staticClass: "fas fa-envelope" }),
                      _vm._v(
                        "\n                            " +
                          _vm._s(
                            _vm.showSentMessages ? "Sent Messages" : "Inbox"
                          ) +
                          "\n                        "
                      ),
                    ]
                  ),
                ]),
              ]
            ),
          ]
        ),
      ]),
    ]),
    _vm._v(" "),
    _c("div", { staticClass: "container-fluid" }, [
      _c("div", { staticClass: "row" }, [
        _c("div", { staticClass: "col-md-3 col-lg-2" }, [
          _c("div", { staticClass: "sidebar" }, [
            _c(
              "nav",
              { staticClass: "nav nav-pills flex-column" },
              [
                _c(
                  "a",
                  {
                    staticClass: "nav-link mb-2",
                    class: { active: !_vm.showSentMessages },
                    attrs: { href: "#" },
                    on: { click: _vm.showInbox },
                  },
                  [
                    _vm._v(
                      "\n                            Inbox\n                        "
                    ),
                  ]
                ),
                _vm._v(" "),
                _c(
                  "router-link",
                  {
                    staticClass: "nav-link mb-2",
                    attrs: { to: "/app/Members/sent-messages" },
                  },
                  [
                    _vm._v(
                      "\n                            Sent messages\n                        "
                    ),
                  ]
                ),
              ],
              1
            ),
          ]),
        ]),
        _vm._v(" "),
        _c("div", { staticClass: "col-md-9 col-lg-10" }, [
          _c("div", { staticClass: "main-content" }, [
            _c("div", { staticClass: "message-compose" }, [
              _c("div", { staticClass: "row justify-content-center" }, [
                _c("div", { staticClass: "col-lg-8 col-xl-6" }, [
                  _c("div", { staticClass: "card shadow-sm" }, [
                    _c("div", { staticClass: "card-body p-4" }, [
                      _c("div", { staticClass: "form-group mb-3" }, [
                        _c(
                          "label",
                          { staticClass: "form-label font-weight-bold" },
                          [_vm._v("Recipients:")]
                        ),
                        _vm._v(" "),
                        _c(
                          "div",
                          { staticClass: "recipients-list" },
                          _vm._l(_vm.recipients, function (recipient) {
                            return _c(
                              "span",
                              {
                                key: recipient,
                                staticClass:
                                  "badge badge-secondary mr-2 mb-2 p-2 d-inline-flex align-items-center",
                                staticStyle: { "font-size": "14px" },
                              },
                              [
                                _vm.getRecipientAvatar(recipient)
                                  ? _c("img", {
                                      staticClass: "rounded-circle mr-2",
                                      staticStyle: {
                                        width: "20px",
                                        height: "20px",
                                        "object-fit": "cover",
                                      },
                                      attrs: {
                                        src: _vm.getRecipientAvatar(recipient),
                                        alt: "avatar",
                                      },
                                    })
                                  : _c("i", {
                                      staticClass: "fas fa-user-circle mr-2",
                                      staticStyle: { "font-size": "16px" },
                                    }),
                                _vm._v(
                                  "\n                                                    " +
                                    _vm._s(
                                      _vm.getRecipientDisplayName(recipient)
                                    ) +
                                    "\n                                                    "
                                ),
                                _c("i", {
                                  staticClass: "fas fa-times ml-2",
                                  staticStyle: { cursor: "pointer" },
                                  on: {
                                    click: function ($event) {
                                      return _vm.removeRecipient(recipient)
                                    },
                                  },
                                }),
                              ]
                            )
                          }),
                          0
                        ),
                        _vm._v(" "),
                        _vm.isLoadingMember
                          ? _c("div", { staticClass: "text-center mt-2" }, [
                              _vm._m(0),
                              _vm._v(" "),
                              _c("small", { staticClass: "ml-2 text-muted" }, [
                                _vm._v("Loading member details..."),
                              ]),
                            ])
                          : _vm._e(),
                      ]),
                      _vm._v(" "),
                      _c("div", { staticClass: "form-group mb-3" }, [
                        _c(
                          "label",
                          { staticClass: "form-label font-weight-bold" },
                          [_vm._v("Subject:")]
                        ),
                        _vm._v(" "),
                        _c("input", {
                          directives: [
                            {
                              name: "model",
                              rawName: "v-model",
                              value: _vm.messageSubject,
                              expression: "messageSubject",
                            },
                          ],
                          staticClass: "form-control",
                          attrs: { type: "text", placeholder: "Enter subject" },
                          domProps: { value: _vm.messageSubject },
                          on: {
                            input: function ($event) {
                              if ($event.target.composing) {
                                return
                              }
                              _vm.messageSubject = $event.target.value
                            },
                          },
                        }),
                      ]),
                      _vm._v(" "),
                      _c("div", { staticClass: "form-group mb-4" }, [
                        _c("textarea", {
                          directives: [
                            {
                              name: "model",
                              rawName: "v-model",
                              value: _vm.messageBody,
                              expression: "messageBody",
                            },
                          ],
                          staticClass: "form-control",
                          attrs: {
                            placeholder: "Type your message here...",
                            rows: "8",
                          },
                          domProps: { value: _vm.messageBody },
                          on: {
                            input: function ($event) {
                              if ($event.target.composing) {
                                return
                              }
                              _vm.messageBody = $event.target.value
                            },
                          },
                        }),
                      ]),
                      _vm._v(" "),
                      _c("div", { staticClass: "text-right" }, [
                        _c(
                          "button",
                          {
                            staticClass: "btn btn-primary",
                            on: { click: _vm.sendMessage },
                          },
                          [
                            _vm._v(
                              "\n                                                Send\n                                            "
                            ),
                          ]
                        ),
                      ]),
                    ]),
                  ]),
                ]),
              ]),
            ]),
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
    return _c(
      "div",
      {
        staticClass: "spinner-border spinner-border-sm",
        staticStyle: { color: "#dc3545" },
        attrs: { role: "status" },
      },
      [_c("span", { staticClass: "sr-only" }, [_vm._v("Loading...")])]
    )
  },
]
render._withStripped = true



/***/ })

}]);