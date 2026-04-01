"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["resources_src_views_app_pages_Community_EditGroupInformation_vue"],{

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/Community/EditGroupInformation.vue?vue&type=script&lang=js":
/*!******************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/Community/EditGroupInformation.vue?vue&type=script&lang=js ***!
  \******************************************************************************************************************************************************************************************************************************/
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
//
//
//
//
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
  name: "EditGroupInformation",
  data: function data() {
    return {
      groupName: "",
      groupDescription: "",
      avatarFile: null,
      avatarPreview: null,
      selectedMembers: [],
      memberSearchQuery: "",
      memberSuggestions: [],
      isSaving: false,
      successMessage: "",
      errorMessage: "",
      isEditMode: false,
      groupId: null,
      currentUser: null,
      gymId: null
    };
  },
  mounted: function mounted() {
    // Check if we're editing an existing group
    if (this.$route.params.id) {
      this.isEditMode = true;
      this.groupId = this.$route.params.id;
      this.loadGroupData();
    }
    // Load current user to potentially add as member
    this.loadCurrentUser();
  },
  methods: {
    goBack: function goBack() {
      this.$router.push('/app/community/group');
    },
    loadCurrentUser: function loadCurrentUser() {
      var _this = this;
      return _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
        var response;
        return _regeneratorRuntime().wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              _context.next = 3;
              return axios__WEBPACK_IMPORTED_MODULE_0___default().get('user');
            case 3:
              response = _context.sent;
              if (response.data && response.data.id) {
                _this.currentUser = response.data;
                // Store gym_id from the logged-in user
                _this.gymId = response.data.gym_id || null;
              }
              _context.next = 10;
              break;
            case 7:
              _context.prev = 7;
              _context.t0 = _context["catch"](0);
              console.error('Error loading current user:', _context.t0);
            case 10:
            case "end":
              return _context.stop();
          }
        }, _callee, null, [[0, 7]]);
      }))();
    },
    loadGroupData: function loadGroupData() {
      var _this2 = this;
      return _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee2() {
        var response, group;
        return _regeneratorRuntime().wrap(function _callee2$(_context2) {
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
              _context2.prev = 0;
              _context2.next = 3;
              return axios__WEBPACK_IMPORTED_MODULE_0___default().get("communication/groups/".concat(_this2.groupId));
            case 3:
              response = _context2.sent;
              if (response.data && response.data.success && response.data.group) {
                group = response.data.group;
                _this2.groupName = group.name || "";
                _this2.groupDescription = group.description || "";
                if (group.avatar) {
                  _this2.avatarPreview = group.avatar.startsWith('http') ? group.avatar : "/".concat(group.avatar);
                }
                // Load members if available
                if (group.members) {
                  _this2.selectedMembers = group.members;
                }
              }
              _context2.next = 11;
              break;
            case 7:
              _context2.prev = 7;
              _context2.t0 = _context2["catch"](0);
              console.error('Error loading group data:', _context2.t0);
              _this2.showError('Failed to load group information');
            case 11:
            case "end":
              return _context2.stop();
          }
        }, _callee2, null, [[0, 7]]);
      }))();
    },
    handleAvatarSelect: function handleAvatarSelect(event) {
      var _this3 = this;
      var file = event.target.files[0];
      if (file) {
        // Validate file size (2MB max)
        if (file.size > 2 * 1024 * 1024) {
          this.showError('Image size must be less than 2MB');
          return;
        }

        // Validate file type
        if (!file.type.startsWith('image/')) {
          this.showError('Please select a valid image file');
          return;
        }
        this.avatarFile = file;

        // Create preview
        var reader = new FileReader();
        reader.onload = function (e) {
          _this3.avatarPreview = e.target.result;
        };
        reader.readAsDataURL(file);
      }
    },
    removeAvatar: function removeAvatar() {
      this.avatarFile = null;
      this.avatarPreview = null;
      if (this.$refs.avatarInput) {
        this.$refs.avatarInput.value = '';
      }
    },
    searchMembers: function searchMembers() {
      var _this4 = this;
      return _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee3() {
        var _response$data, _response$data2, response, allMembers, query, _error$response;
        return _regeneratorRuntime().wrap(function _callee3$(_context3) {
          while (1) switch (_context3.prev = _context3.next) {
            case 0:
              if (!(!_this4.memberSearchQuery || _this4.memberSearchQuery.length < 2)) {
                _context3.next = 3;
                break;
              }
              _this4.memberSuggestions = [];
              return _context3.abrupt("return");
            case 3:
              _context3.prev = 3;
              _context3.next = 6;
              return axios__WEBPACK_IMPORTED_MODULE_0___default().get('get_members_without_paginate');
            case 6:
              response = _context3.sent;
              // Handle both array response and wrapped response
              allMembers = Array.isArray(response.data) ? response.data : ((_response$data = response.data) === null || _response$data === void 0 ? void 0 : _response$data.data) || ((_response$data2 = response.data) === null || _response$data2 === void 0 ? void 0 : _response$data2.members) || [];
              if (Array.isArray(allMembers)) {
                _context3.next = 12;
                break;
              }
              console.error('Invalid members data format:', response.data);
              _this4.memberSuggestions = [];
              return _context3.abrupt("return");
            case 12:
              // Filter members based on search query
              query = _this4.memberSearchQuery.toLowerCase();
              _this4.memberSuggestions = allMembers.filter(function (member) {
                // Ensure member has required properties
                if (!member || !member.id) return false;
                var name = _this4.getMemberName(member).toLowerCase();
                var email = (member.email || '').toLowerCase();
                return (name.includes(query) || email.includes(query)) && !_this4.selectedMembers.find(function (m) {
                  return m.id === member.id;
                });
              }).slice(0, 10); // Limit to 10 suggestions
              _context3.next = 21;
              break;
            case 16:
              _context3.prev = 16;
              _context3.t0 = _context3["catch"](3);
              console.error('Error searching members:', _context3.t0);
              _this4.memberSuggestions = [];
              // Show user-friendly error message
              if (((_error$response = _context3.t0.response) === null || _error$response === void 0 ? void 0 : _error$response.status) === 401) {
                _this4.showError('Please log in to search members');
              } else {
                _this4.showError('Failed to load members. Please try again.');
              }
            case 21:
            case "end":
              return _context3.stop();
          }
        }, _callee3, null, [[3, 16]]);
      }))();
    },
    addMember: function addMember(member) {
      if (!this.selectedMembers.find(function (m) {
        return m.id === member.id;
      })) {
        this.selectedMembers.push(member);
        this.memberSearchQuery = '';
        this.memberSuggestions = [];
      }
    },
    removeMember: function removeMember(memberId) {
      this.selectedMembers = this.selectedMembers.filter(function (m) {
        return m.id !== memberId;
      });
    },
    getMemberName: function getMemberName(member) {
      if (member.membername) return member.membername;
      if (member.name) return member.name;
      if (member.firstname && member.lastname) {
        return "".concat(member.firstname, " ").concat(member.lastname);
      }
      return 'Unknown Member';
    },
    saveGroupInfo: function saveGroupInfo() {
      var _this5 = this;
      return _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee4() {
        var formData, memberIds, response, _error$response2, _error$response3, errorMessage;
        return _regeneratorRuntime().wrap(function _callee4$(_context4) {
          while (1) switch (_context4.prev = _context4.next) {
            case 0:
              // Clear previous messages
              _this5.successMessage = "";
              _this5.errorMessage = "";

              // Validate required fields
              if (_this5.groupName.trim()) {
                _context4.next = 5;
                break;
              }
              _this5.showError('Group name is required');
              return _context4.abrupt("return");
            case 5:
              _this5.isSaving = true;
              _context4.prev = 6;
              formData = new FormData();
              formData.append('name', _this5.groupName.trim());
              formData.append('description', _this5.groupDescription.trim() || '');

              // Add gym_id from the logged-in user
              if (_this5.gymId) {
                formData.append('gym_id', _this5.gymId);
              }

              // Add avatar if selected
              if (_this5.avatarFile) {
                formData.append('avatar', _this5.avatarFile);
              }

              // Add member IDs (at least include current user or empty array)
              // The API requires member_ids, so we'll send at least an empty array
              // or we can modify backend to make it optional
              memberIds = _this5.selectedMembers.map(function (m) {
                return m.id;
              }); // If no members selected, send empty array (backend might need at least one)
              // For now, we'll send empty array and let backend handle it
              formData.append('member_ids', JSON.stringify(memberIds.length > 0 ? memberIds : []));
              if (!_this5.isEditMode) {
                _context4.next = 20;
                break;
              }
              _context4.next = 17;
              return axios__WEBPACK_IMPORTED_MODULE_0___default().post("communication/groups/".concat(_this5.groupId), formData, {
                headers: {
                  'Content-Type': 'multipart/form-data'
                }
              });
            case 17:
              response = _context4.sent;
              _context4.next = 23;
              break;
            case 20:
              _context4.next = 22;
              return axios__WEBPACK_IMPORTED_MODULE_0___default().post('communication/groups', formData, {
                headers: {
                  'Content-Type': 'multipart/form-data'
                }
              });
            case 22:
              response = _context4.sent;
            case 23:
              if (response.data && response.data.success) {
                _this5.showSuccess(response.data.message || 'Group saved successfully!');

                // Redirect after 1.5 seconds
                setTimeout(function () {
                  _this5.$router.push('/app/community/group');
                }, 1500);
              } else {
                _this5.showError(response.data.message || 'Failed to save group');
              }
              _context4.next = 31;
              break;
            case 26:
              _context4.prev = 26;
              _context4.t0 = _context4["catch"](6);
              console.error('Error saving group:', _context4.t0);
              errorMessage = ((_error$response2 = _context4.t0.response) === null || _error$response2 === void 0 || (_error$response2 = _error$response2.data) === null || _error$response2 === void 0 ? void 0 : _error$response2.message) || ((_error$response3 = _context4.t0.response) === null || _error$response3 === void 0 || (_error$response3 = _error$response3.data) === null || _error$response3 === void 0 ? void 0 : _error$response3.error) || 'Failed to save group. Please try again.';
              _this5.showError(errorMessage);
            case 31:
              _context4.prev = 31;
              _this5.isSaving = false;
              return _context4.finish(31);
            case 34:
            case "end":
              return _context4.stop();
          }
        }, _callee4, null, [[6, 26, 31, 34]]);
      }))();
    },
    showSuccess: function showSuccess(message) {
      var _this6 = this;
      this.successMessage = message;
      this.errorMessage = "";
      setTimeout(function () {
        _this6.successMessage = "";
      }, 5000);
    },
    showError: function showError(message) {
      var _this7 = this;
      this.errorMessage = message;
      this.successMessage = "";
      setTimeout(function () {
        _this7.errorMessage = "";
      }, 5000);
    }
  }
});

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js??clonedRuleSet-12.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12.use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-12.use[3]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/Community/EditGroupInformation.vue?vue&type=style&index=0&id=1c1a779a&lang=scss&scoped=true":
/*!*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??clonedRuleSet-12.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12.use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-12.use[3]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/Community/EditGroupInformation.vue?vue&type=style&index=0&id=1c1a779a&lang=scss&scoped=true ***!
  \*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
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
___CSS_LOADER_EXPORT___.push([module.id, "@charset \"UTF-8\";\n.filter-btn .btn[data-v-1c1a779a],\n.filter-btn .btn-secondary[data-v-1c1a779a],\n.filter-btn .btn-outline-secondary[data-v-1c1a779a],\n.filter-btn button.btn[data-v-1c1a779a],\n.filter-btn button.btn-secondary[data-v-1c1a779a] {\n  color: #000 !important;\n  background-color: transparent !important;\n  border-color: #6c757d !important;\n}\n.filter-btn .btn[data-v-1c1a779a]:hover,\n.filter-btn .btn-secondary[data-v-1c1a779a]:hover,\n.filter-btn .btn-outline-secondary[data-v-1c1a779a]:hover,\n.filter-btn button.btn[data-v-1c1a779a]:hover,\n.filter-btn button.btn-secondary[data-v-1c1a779a]:hover {\n  color: #dc3545 !important;\n  background-color: transparent !important;\n  border-color: #dc3545 !important;\n  box-shadow: none !important;\n}\n.filter-btn .btn[data-v-1c1a779a]:focus,\n.filter-btn .btn-secondary[data-v-1c1a779a]:focus,\n.filter-btn .btn-outline-secondary[data-v-1c1a779a]:focus,\n.filter-btn button.btn[data-v-1c1a779a]:focus,\n.filter-btn button.btn-secondary[data-v-1c1a779a]:focus {\n  color: #dc3545 !important;\n  background-color: transparent !important;\n  border-color: #dc3545 !important;\n  box-shadow: none !important;\n}\n.filter-btn .btn[data-v-1c1a779a]:active,\n.filter-btn .btn-secondary[data-v-1c1a779a]:active,\n.filter-btn .btn-outline-secondary[data-v-1c1a779a]:active,\n.filter-btn button.btn[data-v-1c1a779a]:active,\n.filter-btn button.btn-secondary[data-v-1c1a779a]:active {\n  color: #dc3545 !important;\n  background-color: transparent !important;\n  border-color: #dc3545 !important;\n}\n.btn-secondary[data-v-1c1a779a]:not(:disabled):not(.disabled):active:focus {\n  box-shadow: none !important;\n}\n\n/* ===========================================\n   COMMON BREADCRUMB NAVIGATION STYLES\n   =========================================== */\n.breadcrumb-nav-row[data-v-1c1a779a] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  margin-bottom: 0.5rem;\n  gap: 0.5rem;\n}\n.breadcrumb-section[data-v-1c1a779a] {\n  flex: 1;\n}\n.breadcrumb-section .breadcrumb-nav .breadcrumb-container[data-v-1c1a779a] {\n  display: flex;\n  align-items: center;\n  gap: 1rem;\n}\n.breadcrumb-section .breadcrumb-nav .breadcrumb-container .back-button[data-v-1c1a779a] {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  width: 40px;\n  height: 40px;\n  background: rgba(255, 255, 255, 0.1);\n  border: 1px solid rgba(255, 255, 255, 0.2);\n  border-radius: 8px;\n  color: #ffffff;\n  cursor: pointer;\n  transition: all 0.3s ease;\n}\n.breadcrumb-section .breadcrumb-nav .breadcrumb-container .back-button[data-v-1c1a779a]:hover {\n  background: rgba(255, 255, 255, 0.15);\n  border-color: rgba(255, 255, 255, 0.3);\n  transform: translateY(-1px);\n  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);\n  color: #dc3545;\n}\n.breadcrumb-section .breadcrumb-nav .breadcrumb-container .back-button i[data-v-1c1a779a] {\n  font-size: 1.1em;\n}\n.breadcrumb-section .breadcrumb-nav .breadcrumb-container .breadcrumb[data-v-1c1a779a] {\n  display: flex;\n  align-items: center;\n  gap: 0.5rem;\n  margin: 0;\n  padding: 0;\n  background: none;\n  border-radius: 0;\n}\n.breadcrumb-section .breadcrumb-nav .breadcrumb-container .breadcrumb .breadcrumb-item[data-v-1c1a779a] {\n  display: flex;\n  align-items: center;\n  gap: 0.5rem;\n  font-size: 0.875rem;\n  color: #ffffff;\n}\n.breadcrumb-section .breadcrumb-nav .breadcrumb-container .breadcrumb .breadcrumb-item.active[data-v-1c1a779a] {\n  color: #252525;\n  font-weight: 600;\n}\n.breadcrumb-section .breadcrumb-nav .breadcrumb-container .breadcrumb .breadcrumb-item.active i[data-v-1c1a779a] {\n  color: #dc3545;\n}\n.breadcrumb-section .breadcrumb-nav .breadcrumb-container .breadcrumb .breadcrumb-item a[data-v-1c1a779a] {\n  display: flex;\n  align-items: center;\n  gap: 0.5rem;\n  color: #6a6a6a;\n  text-decoration: none;\n  transition: color 0.3s ease;\n}\n.breadcrumb-section .breadcrumb-nav .breadcrumb-container .breadcrumb .breadcrumb-item a[data-v-1c1a779a]:hover {\n  color: #dc3545;\n}\n.breadcrumb-section .breadcrumb-nav .breadcrumb-container .breadcrumb .breadcrumb-item a:hover i[data-v-1c1a779a] {\n  color: #dc3545;\n}\n.breadcrumb-section .breadcrumb-nav .breadcrumb-container .breadcrumb .breadcrumb-item a i[data-v-1c1a779a] {\n  font-size: 0.9em;\n  transition: color 0.3s ease;\n}\n.breadcrumb-section .breadcrumb-nav .breadcrumb-container .breadcrumb .breadcrumb-item[data-v-1c1a779a]:not(:last-child)::after {\n  content: \"›\";\n  margin-left: 0.5rem;\n  color: #6a6a6a;\n  font-size: 1.2em;\n}\n.action-section[data-v-1c1a779a] {\n  display: flex;\n  align-items: center;\n}\n.action-section .action-btn[data-v-1c1a779a] {\n  display: flex;\n  align-items: center;\n  gap: 0.5rem;\n  padding: 0.5rem 1rem;\n  border-radius: 8px;\n  font-size: 0.875rem;\n  font-weight: 500;\n  transition: all 0.3s ease;\n}\n.action-section .action-btn[data-v-1c1a779a]:hover:not(:disabled) {\n  transform: translateY(-1px);\n  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);\n}\n.action-section .action-btn[data-v-1c1a779a]:disabled {\n  opacity: 0.6;\n  cursor: not-allowed;\n}\n.action-section .action-btn i[data-v-1c1a779a] {\n  font-size: 0.9em;\n}\n@media (max-width: 768px) {\n.breadcrumb-nav-row[data-v-1c1a779a] {\n    flex-direction: column;\n    align-items: flex-start;\n    gap: 0.5rem;\n}\n.breadcrumb-section[data-v-1c1a779a] {\n    width: 100%;\n}\n.breadcrumb-section .breadcrumb-container[data-v-1c1a779a] {\n    flex-direction: column;\n    align-items: flex-start;\n    gap: 0.5rem;\n}\n.breadcrumb-section .breadcrumb-container .breadcrumb[data-v-1c1a779a] {\n    flex-wrap: wrap;\n}\n.breadcrumb-section .breadcrumb-container .breadcrumb .breadcrumb-item[data-v-1c1a779a] {\n    font-size: 0.8rem;\n}\n.breadcrumb-section .breadcrumb-container .breadcrumb .breadcrumb-item a[data-v-1c1a779a] {\n    font-size: 0.8rem;\n}\n.action-section[data-v-1c1a779a] {\n    width: 100%;\n    justify-content: flex-end;\n}\n.action-section .action-btn[data-v-1c1a779a] {\n    font-size: 0.8rem;\n    padding: 0.4rem 0.8rem;\n}\n}\n/* ===========================================\n   RESPONSIVE UTILITY CLASSES (ALL DEVICES)\n   =========================================== */\n.show-xs-only[data-v-1c1a779a],\n.show-sm-only[data-v-1c1a779a],\n.show-md-only[data-v-1c1a779a],\n.show-lg-only[data-v-1c1a779a],\n.show-xl-only[data-v-1c1a779a] {\n  display: none !important;\n}\n@media (max-width: 575px) {\n.hide-xs[data-v-1c1a779a] {\n    display: none !important;\n}\n.show-xs-only[data-v-1c1a779a] {\n    display: initial !important;\n}\n}\n@media (min-width: 576px) and (max-width: 767px) {\n.hide-sm[data-v-1c1a779a] {\n    display: none !important;\n}\n.show-sm-only[data-v-1c1a779a] {\n    display: initial !important;\n}\n}\n@media (min-width: 768px) and (max-width: 991px) {\n.hide-md[data-v-1c1a779a] {\n    display: none !important;\n}\n.show-md-only[data-v-1c1a779a] {\n    display: initial !important;\n}\n}\n@media (min-width: 992px) and (max-width: 1199px) {\n.hide-lg[data-v-1c1a779a] {\n    display: none !important;\n}\n.show-lg-only[data-v-1c1a779a] {\n    display: initial !important;\n}\n}\n@media (min-width: 1200px) {\n.hide-xl[data-v-1c1a779a] {\n    display: none !important;\n}\n.show-xl-only[data-v-1c1a779a] {\n    display: initial !important;\n}\n}\n@media (max-width: 576px) {\n.hide-sm-down[data-v-1c1a779a] {\n    display: none !important;\n}\n}\n@media (max-width: 768px) {\n.hide-md-down[data-v-1c1a779a] {\n    display: none !important;\n}\n}\n@media (max-width: 992px) {\n.hide-lg-down[data-v-1c1a779a] {\n    display: none !important;\n}\n}\n@media (min-width: 576px) {\n.hide-sm-up[data-v-1c1a779a] {\n    display: none !important;\n}\n}\n@media (min-width: 768px) {\n.hide-md-up[data-v-1c1a779a] {\n    display: none !important;\n}\n}\n@media (min-width: 992px) {\n.hide-lg-up[data-v-1c1a779a] {\n    display: none !important;\n}\n}\n@media (max-width: 575px) {\n.d-xs-none[data-v-1c1a779a] {\n    display: none !important;\n}\n.d-xs-block[data-v-1c1a779a] {\n    display: block !important;\n}\n.d-xs-flex[data-v-1c1a779a] {\n    display: flex !important;\n}\n}\n@media (min-width: 576px) and (max-width: 767px) {\n.d-sm-none[data-v-1c1a779a] {\n    display: none !important;\n}\n.d-sm-block[data-v-1c1a779a] {\n    display: block !important;\n}\n.d-sm-flex[data-v-1c1a779a] {\n    display: flex !important;\n}\n}\n@media (min-width: 768px) and (max-width: 991px) {\n.d-md-none[data-v-1c1a779a] {\n    display: none !important;\n}\n.d-md-block[data-v-1c1a779a] {\n    display: block !important;\n}\n.d-md-flex[data-v-1c1a779a] {\n    display: flex !important;\n}\n}\n@media (min-width: 992px) and (max-width: 1199px) {\n.d-lg-none[data-v-1c1a779a] {\n    display: none !important;\n}\n.d-lg-block[data-v-1c1a779a] {\n    display: block !important;\n}\n.d-lg-flex[data-v-1c1a779a] {\n    display: flex !important;\n}\n}\n@media (min-width: 1200px) {\n.d-xl-none[data-v-1c1a779a] {\n    display: none !important;\n}\n.d-xl-block[data-v-1c1a779a] {\n    display: block !important;\n}\n.d-xl-flex[data-v-1c1a779a] {\n    display: flex !important;\n}\n}\n@media (min-width: 576px) {\n.custom-modal-xl[data-v-1c1a779a] {\n    max-width: 1500px !important;\n}\n}\n.edit-group-info[data-v-1c1a779a] {\n  min-height: 100vh;\n  background: #f5f5f3;\n  padding: 20px;\n}\n.breadcrumb-nav-row[data-v-1c1a779a] {\n  margin-bottom: 20px;\n}\n.breadcrumb-section[data-v-1c1a779a] {\n  max-width: 1200px;\n  margin: 0 auto;\n}\n.breadcrumb-container[data-v-1c1a779a] {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n}\n.back-button[data-v-1c1a779a] {\n  background: none;\n  border: none;\n  color: #dc3545;\n  font-size: 18px;\n  cursor: pointer;\n  padding: 5px 10px;\n  transition: all 0.3s ease;\n}\n.back-button[data-v-1c1a779a]:hover {\n  transform: translateX(-3px);\n}\n.breadcrumb[data-v-1c1a779a] {\n  display: flex;\n  list-style: none;\n  padding: 0;\n  margin: 0;\n  gap: 10px;\n  align-items: center;\n}\n.breadcrumb-item[data-v-1c1a779a] {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n}\n.breadcrumb-item[data-v-1c1a779a]:not(:last-child)::after {\n  content: \"/\";\n  color: #6c757d;\n  margin-left: 10px;\n  font-weight: normal;\n}\n.breadcrumb-item a[data-v-1c1a779a] {\n  color: #6c757d;\n  text-decoration: none;\n  transition: color 0.3s ease;\n}\n.breadcrumb-item a[data-v-1c1a779a]:hover {\n  color: #dc3545;\n}\n.breadcrumb-item.active[data-v-1c1a779a] {\n  color: #252525;\n  font-weight: 500;\n}\n.form-container[data-v-1c1a779a] {\n  max-width: 600px;\n  margin: 40px auto;\n  background: #fff;\n  border-radius: 12px;\n  padding: 30px;\n  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);\n}\nh2[data-v-1c1a779a] {\n  margin-bottom: 30px;\n  font-size: 24px;\n  color: #252525;\n  text-align: center;\n  font-weight: 600;\n}\n.form-group[data-v-1c1a779a] {\n  margin-bottom: 25px;\n}\nlabel[data-v-1c1a779a] {\n  display: block;\n  margin-bottom: 8px;\n  color: #495057;\n  font-weight: 500;\n  font-size: 14px;\n}\n.required[data-v-1c1a779a] {\n  color: #dc3545;\n}\n.form-control[data-v-1c1a779a] {\n  width: 100%;\n  padding: 12px 15px;\n  border: 1px solid #dcdcdc;\n  border-radius: 8px;\n  font-size: 15px;\n  background: #fafbfc;\n  transition: all 0.3s ease;\n  box-sizing: border-box;\n}\n.form-control[data-v-1c1a779a]:focus {\n  border-color: #dc3545;\n  outline: none;\n  background: #fff;\n  box-shadow: 0 0 0 3px rgba(220, 53, 69, 0.1);\n}\ntextarea.form-control[data-v-1c1a779a] {\n  resize: vertical;\n  min-height: 100px;\n  font-family: inherit;\n}\n.form-text[data-v-1c1a779a] {\n  display: block;\n  margin-top: 5px;\n  font-size: 12px;\n  color: #6c757d;\n}\n\n/* Avatar Upload Section */\n.avatar-upload-section[data-v-1c1a779a] {\n  display: flex;\n  flex-direction: column;\n  gap: 15px;\n}\n.avatar-preview[data-v-1c1a779a] {\n  position: relative;\n  width: 200px;\n  height: 200px;\n  border-radius: 12px;\n  overflow: hidden;\n  border: 2px solid #e9ecef;\n  margin: 0 auto;\n}\n.avatar-preview img[data-v-1c1a779a] {\n  width: 100%;\n  height: 100%;\n  -o-object-fit: cover;\n     object-fit: cover;\n}\n.remove-avatar-btn[data-v-1c1a779a] {\n  position: absolute;\n  top: 10px;\n  right: 10px;\n  background: rgba(220, 53, 69, 0.9);\n  color: white;\n  border: none;\n  border-radius: 50%;\n  width: 30px;\n  height: 30px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  cursor: pointer;\n  transition: all 0.3s ease;\n}\n.remove-avatar-btn[data-v-1c1a779a]:hover {\n  background: rgb(220, 53, 69);\n  transform: scale(1.1);\n}\n.avatar-placeholder[data-v-1c1a779a] {\n  width: 200px;\n  height: 200px;\n  border: 2px dashed #dcdcdc;\n  border-radius: 12px;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  color: #6c757d;\n  margin: 0 auto;\n}\n.avatar-placeholder i[data-v-1c1a779a] {\n  font-size: 48px;\n  margin-bottom: 10px;\n}\n.avatar-placeholder p[data-v-1c1a779a] {\n  margin: 0;\n  font-size: 14px;\n}\n.upload-controls[data-v-1c1a779a] {\n  display: flex;\n  justify-content: center;\n}\n.btn-upload[data-v-1c1a779a] {\n  background: #dc3545;\n  color: white;\n  border: none;\n  padding: 10px 20px;\n  border-radius: 8px;\n  font-size: 14px;\n  font-weight: 500;\n  cursor: pointer;\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  transition: all 0.3s ease;\n}\n.btn-upload[data-v-1c1a779a]:hover {\n  background: #c82333;\n  transform: translateY(-2px);\n  box-shadow: 0 4px 12px rgba(220, 53, 69, 0.3);\n}\n\n/* Member Selection */\n.member-selection[data-v-1c1a779a] {\n  display: flex;\n  flex-direction: column;\n  gap: 15px;\n}\n.search-members[data-v-1c1a779a] {\n  position: relative;\n}\n.member-suggestions[data-v-1c1a779a] {\n  position: absolute;\n  top: 100%;\n  left: 0;\n  right: 0;\n  background: white;\n  border: 1px solid #e9ecef;\n  border-radius: 8px;\n  margin-top: 5px;\n  max-height: 200px;\n  overflow-y: auto;\n  z-index: 1000;\n  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);\n}\n.suggestion-item[data-v-1c1a779a] {\n  padding: 12px 15px;\n  cursor: pointer;\n  transition: background 0.2s ease;\n  border-bottom: 1px solid #f8f9fa;\n}\n.suggestion-item[data-v-1c1a779a]:hover {\n  background: #f8f9fa;\n}\n.suggestion-item[data-v-1c1a779a]:last-child {\n  border-bottom: none;\n}\n.member-info[data-v-1c1a779a] {\n  display: flex;\n  flex-direction: column;\n  gap: 4px;\n}\n.member-name[data-v-1c1a779a] {\n  font-weight: 500;\n  color: #252525;\n  font-size: 14px;\n}\n.member-email[data-v-1c1a779a] {\n  font-size: 12px;\n  color: #6c757d;\n}\n.selected-members[data-v-1c1a779a] {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 10px;\n}\n.selected-member-tag[data-v-1c1a779a] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  background: #e9ecef;\n  padding: 6px 12px;\n  border-radius: 20px;\n  font-size: 14px;\n  color: #495057;\n}\n.remove-member-btn[data-v-1c1a779a] {\n  background: none;\n  border: none;\n  color: #6c757d;\n  cursor: pointer;\n  padding: 0;\n  width: 18px;\n  height: 18px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  border-radius: 50%;\n  transition: all 0.2s ease;\n}\n.remove-member-btn[data-v-1c1a779a]:hover {\n  background: #dc3545;\n  color: white;\n}\n\n/* Form Actions */\n.form-actions[data-v-1c1a779a] {\n  display: flex;\n  gap: 15px;\n  justify-content: flex-end;\n  margin-top: 30px;\n  padding-top: 20px;\n  border-top: 1px solid #e9ecef;\n}\n.btn[data-v-1c1a779a] {\n  padding: 12px 24px;\n  border: none;\n  border-radius: 8px;\n  font-size: 15px;\n  font-weight: 500;\n  cursor: pointer;\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  transition: all 0.3s ease;\n}\n.btn[data-v-1c1a779a]:disabled {\n  opacity: 0.6;\n  cursor: not-allowed;\n}\n.btn-secondary[data-v-1c1a779a] {\n  background: #6c757d;\n  color: white;\n}\n.btn-secondary[data-v-1c1a779a]:hover:not(:disabled) {\n  background: #5a6268;\n  transform: translateY(-1px);\n}\n.btn-primary[data-v-1c1a779a] {\n  background: #dc3545;\n  color: white;\n}\n.btn-primary[data-v-1c1a779a]:hover:not(:disabled) {\n  background: #c82333;\n  transform: translateY(-1px);\n  box-shadow: 0 4px 12px rgba(220, 53, 69, 0.3);\n}\n\n/* Alerts */\n.alert[data-v-1c1a779a] {\n  padding: 12px 15px;\n  border-radius: 8px;\n  margin-top: 20px;\n  display: flex;\n  align-items: center;\n  gap: 10px;\n  font-size: 14px;\n}\n.alert-success[data-v-1c1a779a] {\n  background: #d4edda;\n  color: #155724;\n  border: 1px solid #c3e6cb;\n}\n.alert-danger[data-v-1c1a779a] {\n  background: #f8d7da;\n  color: #721c24;\n  border: 1px solid #f5c6cb;\n}\n\n/* Responsive Design */\n@media (max-width: 768px) {\n.form-container[data-v-1c1a779a] {\n    padding: 20px;\n    margin: 20px;\n}\nh2[data-v-1c1a779a] {\n    font-size: 20px;\n}\n.avatar-preview[data-v-1c1a779a],\n  .avatar-placeholder[data-v-1c1a779a] {\n    width: 150px;\n    height: 150px;\n}\n.form-actions[data-v-1c1a779a] {\n    flex-direction: column;\n}\n.form-actions .btn[data-v-1c1a779a] {\n    width: 100%;\n    justify-content: center;\n}\n}", ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-12.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12.use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-12.use[3]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/Community/EditGroupInformation.vue?vue&type=style&index=0&id=1c1a779a&lang=scss&scoped=true":
/*!*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-12.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12.use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-12.use[3]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/Community/EditGroupInformation.vue?vue&type=style&index=0&id=1c1a779a&lang=scss&scoped=true ***!
  \*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../../../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_clonedRuleSet_12_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_12_use_2_node_modules_sass_loader_dist_cjs_js_clonedRuleSet_12_use_3_node_modules_vue_loader_lib_index_js_vue_loader_options_EditGroupInformation_vue_vue_type_style_index_0_id_1c1a779a_lang_scss_scoped_true__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !!../../../../../../node_modules/css-loader/dist/cjs.js??clonedRuleSet-12.use[1]!../../../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12.use[2]!../../../../../../node_modules/sass-loader/dist/cjs.js??clonedRuleSet-12.use[3]!../../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./EditGroupInformation.vue?vue&type=style&index=0&id=1c1a779a&lang=scss&scoped=true */ "./node_modules/css-loader/dist/cjs.js??clonedRuleSet-12.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12.use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-12.use[3]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/Community/EditGroupInformation.vue?vue&type=style&index=0&id=1c1a779a&lang=scss&scoped=true");

            

var options = {};

options.insert = "head";
options.singleton = false;

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_clonedRuleSet_12_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_12_use_2_node_modules_sass_loader_dist_cjs_js_clonedRuleSet_12_use_3_node_modules_vue_loader_lib_index_js_vue_loader_options_EditGroupInformation_vue_vue_type_style_index_0_id_1c1a779a_lang_scss_scoped_true__WEBPACK_IMPORTED_MODULE_1__["default"], options);



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_clonedRuleSet_12_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_12_use_2_node_modules_sass_loader_dist_cjs_js_clonedRuleSet_12_use_3_node_modules_vue_loader_lib_index_js_vue_loader_options_EditGroupInformation_vue_vue_type_style_index_0_id_1c1a779a_lang_scss_scoped_true__WEBPACK_IMPORTED_MODULE_1__["default"].locals || {});

/***/ }),

/***/ "./resources/src/views/app/pages/Community/EditGroupInformation.vue":
/*!**************************************************************************!*\
  !*** ./resources/src/views/app/pages/Community/EditGroupInformation.vue ***!
  \**************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _EditGroupInformation_vue_vue_type_template_id_1c1a779a_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./EditGroupInformation.vue?vue&type=template&id=1c1a779a&scoped=true */ "./resources/src/views/app/pages/Community/EditGroupInformation.vue?vue&type=template&id=1c1a779a&scoped=true");
/* harmony import */ var _EditGroupInformation_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./EditGroupInformation.vue?vue&type=script&lang=js */ "./resources/src/views/app/pages/Community/EditGroupInformation.vue?vue&type=script&lang=js");
/* harmony import */ var _EditGroupInformation_vue_vue_type_style_index_0_id_1c1a779a_lang_scss_scoped_true__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./EditGroupInformation.vue?vue&type=style&index=0&id=1c1a779a&lang=scss&scoped=true */ "./resources/src/views/app/pages/Community/EditGroupInformation.vue?vue&type=style&index=0&id=1c1a779a&lang=scss&scoped=true");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");



;


/* normalize component */

var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _EditGroupInformation_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__["default"],
  _EditGroupInformation_vue_vue_type_template_id_1c1a779a_scoped_true__WEBPACK_IMPORTED_MODULE_0__.render,
  _EditGroupInformation_vue_vue_type_template_id_1c1a779a_scoped_true__WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  "1c1a779a",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/src/views/app/pages/Community/EditGroupInformation.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./resources/src/views/app/pages/Community/EditGroupInformation.vue?vue&type=script&lang=js":
/*!**************************************************************************************************!*\
  !*** ./resources/src/views/app/pages/Community/EditGroupInformation.vue?vue&type=script&lang=js ***!
  \**************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_EditGroupInformation_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./EditGroupInformation.vue?vue&type=script&lang=js */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/Community/EditGroupInformation.vue?vue&type=script&lang=js");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_EditGroupInformation_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/src/views/app/pages/Community/EditGroupInformation.vue?vue&type=style&index=0&id=1c1a779a&lang=scss&scoped=true":
/*!***********************************************************************************************************************************!*\
  !*** ./resources/src/views/app/pages/Community/EditGroupInformation.vue?vue&type=style&index=0&id=1c1a779a&lang=scss&scoped=true ***!
  \***********************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_dist_cjs_js_node_modules_css_loader_dist_cjs_js_clonedRuleSet_12_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_12_use_2_node_modules_sass_loader_dist_cjs_js_clonedRuleSet_12_use_3_node_modules_vue_loader_lib_index_js_vue_loader_options_EditGroupInformation_vue_vue_type_style_index_0_id_1c1a779a_lang_scss_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/style-loader/dist/cjs.js!../../../../../../node_modules/css-loader/dist/cjs.js??clonedRuleSet-12.use[1]!../../../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12.use[2]!../../../../../../node_modules/sass-loader/dist/cjs.js??clonedRuleSet-12.use[3]!../../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./EditGroupInformation.vue?vue&type=style&index=0&id=1c1a779a&lang=scss&scoped=true */ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-12.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12.use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-12.use[3]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/Community/EditGroupInformation.vue?vue&type=style&index=0&id=1c1a779a&lang=scss&scoped=true");


/***/ }),

/***/ "./resources/src/views/app/pages/Community/EditGroupInformation.vue?vue&type=template&id=1c1a779a&scoped=true":
/*!********************************************************************************************************************!*\
  !*** ./resources/src/views/app/pages/Community/EditGroupInformation.vue?vue&type=template&id=1c1a779a&scoped=true ***!
  \********************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_EditGroupInformation_vue_vue_type_template_id_1c1a779a_scoped_true__WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   staticRenderFns: () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_EditGroupInformation_vue_vue_type_template_id_1c1a779a_scoped_true__WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_EditGroupInformation_vue_vue_type_template_id_1c1a779a_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./EditGroupInformation.vue?vue&type=template&id=1c1a779a&scoped=true */ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/Community/EditGroupInformation.vue?vue&type=template&id=1c1a779a&scoped=true");


/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/Community/EditGroupInformation.vue?vue&type=template&id=1c1a779a&scoped=true":
/*!***********************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/Community/EditGroupInformation.vue?vue&type=template&id=1c1a779a&scoped=true ***!
  \***********************************************************************************************************************************************************************************************************************************************************/
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
  return _c("div", { staticClass: "edit-group-info" }, [
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
                        _vm._v("\n                Dashboard\n              "),
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
                        { attrs: { to: "/app/community/group" } },
                        [_vm._v("\n                Groups\n              ")]
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
                        "\n              " +
                          _vm._s(
                            _vm.isEditMode ? "Edit Group" : "Create New Group"
                          ) +
                          "\n            "
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
    _c("div", { staticClass: "form-container" }, [
      _c("h2", [
        _vm._v(
          _vm._s(_vm.isEditMode ? "Edit Group Information" : "Create New Group")
        ),
      ]),
      _vm._v(" "),
      _c(
        "form",
        {
          attrs: { enctype: "multipart/form-data" },
          on: {
            submit: function ($event) {
              $event.preventDefault()
              return _vm.saveGroupInfo.apply(null, arguments)
            },
          },
        },
        [
          _c("div", { staticClass: "form-group" }, [
            _vm._m(0),
            _vm._v(" "),
            _c("input", {
              directives: [
                {
                  name: "model",
                  rawName: "v-model",
                  value: _vm.groupName,
                  expression: "groupName",
                },
              ],
              staticClass: "form-control",
              attrs: {
                id: "groupName",
                type: "text",
                placeholder: "Enter group name",
                required: "",
              },
              domProps: { value: _vm.groupName },
              on: {
                input: function ($event) {
                  if ($event.target.composing) {
                    return
                  }
                  _vm.groupName = $event.target.value
                },
              },
            }),
          ]),
          _vm._v(" "),
          _c("div", { staticClass: "form-group" }, [
            _c("label", { attrs: { for: "groupDescription" } }, [
              _vm._v("Description"),
            ]),
            _vm._v(" "),
            _c("textarea", {
              directives: [
                {
                  name: "model",
                  rawName: "v-model",
                  value: _vm.groupDescription,
                  expression: "groupDescription",
                },
              ],
              staticClass: "form-control",
              attrs: {
                id: "groupDescription",
                placeholder:
                  "Enter group description (e.g., Check this group for daily updates, promotions and deals to stay in the loop!)",
                rows: "4",
              },
              domProps: { value: _vm.groupDescription },
              on: {
                input: function ($event) {
                  if ($event.target.composing) {
                    return
                  }
                  _vm.groupDescription = $event.target.value
                },
              },
            }),
          ]),
          _vm._v(" "),
          _c("div", { staticClass: "form-group" }, [
            _c("label", { attrs: { for: "avatar" } }, [
              _vm._v("Group Avatar/Cover Photo"),
            ]),
            _vm._v(" "),
            _c("div", { staticClass: "avatar-upload-section" }, [
              _vm.avatarPreview
                ? _c("div", { staticClass: "avatar-preview" }, [
                    _c("img", {
                      attrs: { src: _vm.avatarPreview, alt: "Avatar preview" },
                    }),
                    _vm._v(" "),
                    _c(
                      "button",
                      {
                        staticClass: "remove-avatar-btn",
                        attrs: { type: "button" },
                        on: { click: _vm.removeAvatar },
                      },
                      [_c("i", { staticClass: "fas fa-times" })]
                    ),
                  ])
                : _c("div", { staticClass: "avatar-placeholder" }, [
                    _c("i", { staticClass: "fas fa-image" }),
                    _vm._v(" "),
                    _c("p", [_vm._v("No image selected")]),
                  ]),
              _vm._v(" "),
              _c("div", { staticClass: "upload-controls" }, [
                _c("input", {
                  ref: "avatarInput",
                  staticStyle: { display: "none" },
                  attrs: { type: "file", id: "avatar", accept: "image/*" },
                  on: { change: _vm.handleAvatarSelect },
                }),
                _vm._v(" "),
                _c(
                  "button",
                  {
                    staticClass: "btn-upload",
                    attrs: { type: "button" },
                    on: {
                      click: function ($event) {
                        return _vm.$refs.avatarInput.click()
                      },
                    },
                  },
                  [
                    _c("i", { staticClass: "fas fa-upload" }),
                    _vm._v(
                      "\n              " +
                        _vm._s(
                          _vm.avatarPreview ? "Change Image" : "Upload Image"
                        ) +
                        "\n            "
                    ),
                  ]
                ),
              ]),
              _vm._v(" "),
              _c("small", { staticClass: "form-text" }, [
                _vm._v(
                  "Recommended: Square image, max 2MB (JPEG, PNG, JPG, GIF)"
                ),
              ]),
            ]),
          ]),
          _vm._v(" "),
          _c("div", { staticClass: "form-group" }, [
            _c("label", { attrs: { for: "members" } }, [
              _vm._v("Add Members (Optional)"),
            ]),
            _vm._v(" "),
            _c("div", { staticClass: "member-selection" }, [
              _c("div", { staticClass: "search-members" }, [
                _c("input", {
                  directives: [
                    {
                      name: "model",
                      rawName: "v-model",
                      value: _vm.memberSearchQuery,
                      expression: "memberSearchQuery",
                    },
                  ],
                  staticClass: "form-control",
                  attrs: {
                    type: "text",
                    placeholder: "Search members to add...",
                  },
                  domProps: { value: _vm.memberSearchQuery },
                  on: {
                    input: [
                      function ($event) {
                        if ($event.target.composing) {
                          return
                        }
                        _vm.memberSearchQuery = $event.target.value
                      },
                      _vm.searchMembers,
                    ],
                  },
                }),
                _vm._v(" "),
                _vm.memberSuggestions.length > 0 && _vm.memberSearchQuery
                  ? _c(
                      "div",
                      { staticClass: "member-suggestions" },
                      _vm._l(_vm.memberSuggestions, function (member) {
                        return _c(
                          "div",
                          {
                            key: member.id,
                            staticClass: "suggestion-item",
                            on: {
                              click: function ($event) {
                                return _vm.addMember(member)
                              },
                            },
                          },
                          [
                            _c("div", { staticClass: "member-info" }, [
                              _c("span", { staticClass: "member-name" }, [
                                _vm._v(_vm._s(_vm.getMemberName(member))),
                              ]),
                              _vm._v(" "),
                              _c("span", { staticClass: "member-email" }, [
                                _vm._v(_vm._s(member.email || "")),
                              ]),
                            ]),
                          ]
                        )
                      }),
                      0
                    )
                  : _vm._e(),
              ]),
              _vm._v(" "),
              _vm.selectedMembers.length > 0
                ? _c(
                    "div",
                    { staticClass: "selected-members" },
                    _vm._l(_vm.selectedMembers, function (member) {
                      return _c(
                        "div",
                        { key: member.id, staticClass: "selected-member-tag" },
                        [
                          _c("span", [
                            _vm._v(_vm._s(_vm.getMemberName(member))),
                          ]),
                          _vm._v(" "),
                          _c(
                            "button",
                            {
                              staticClass: "remove-member-btn",
                              attrs: { type: "button" },
                              on: {
                                click: function ($event) {
                                  return _vm.removeMember(member.id)
                                },
                              },
                            },
                            [_c("i", { staticClass: "fas fa-times" })]
                          ),
                        ]
                      )
                    }),
                    0
                  )
                : _vm._e(),
            ]),
          ]),
          _vm._v(" "),
          _c("div", { staticClass: "form-actions" }, [
            _c(
              "button",
              {
                staticClass: "btn btn-secondary",
                attrs: { type: "button" },
                on: { click: _vm.goBack },
              },
              [_vm._v("\n          Cancel\n        ")]
            ),
            _vm._v(" "),
            _c(
              "button",
              {
                staticClass: "btn btn-primary",
                attrs: { type: "submit", disabled: _vm.isSaving },
              },
              [
                _vm.isSaving
                  ? _c("i", { staticClass: "fas fa-spinner fa-spin" })
                  : _c("i", { staticClass: "fas fa-save" }),
                _vm._v(
                  "\n          " +
                    _vm._s(
                      _vm.isSaving
                        ? "Saving..."
                        : _vm.isEditMode
                        ? "Update Group"
                        : "Create Group"
                    ) +
                    "\n        "
                ),
              ]
            ),
          ]),
        ]
      ),
      _vm._v(" "),
      _vm.successMessage
        ? _c("div", { staticClass: "alert alert-success" }, [
            _c("i", { staticClass: "fas fa-check-circle" }),
            _vm._v("\n      " + _vm._s(_vm.successMessage) + "\n    "),
          ])
        : _vm._e(),
      _vm._v(" "),
      _vm.errorMessage
        ? _c("div", { staticClass: "alert alert-danger" }, [
            _c("i", { staticClass: "fas fa-exclamation-circle" }),
            _vm._v("\n      " + _vm._s(_vm.errorMessage) + "\n    "),
          ])
        : _vm._e(),
    ]),
  ])
}
var staticRenderFns = [
  function () {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("label", { attrs: { for: "groupName" } }, [
      _vm._v("Group Name "),
      _c("span", { staticClass: "required" }, [_vm._v("*")]),
    ])
  },
]
render._withStripped = true



/***/ })

}]);