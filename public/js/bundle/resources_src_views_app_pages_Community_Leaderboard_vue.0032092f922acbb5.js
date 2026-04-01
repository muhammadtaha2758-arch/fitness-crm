"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["resources_src_views_app_pages_Community_Leaderboard_vue"],{

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/Community/Leaderboard.vue?vue&type=script&lang=js":
/*!*********************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/Community/Leaderboard.vue?vue&type=script&lang=js ***!
  \*********************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
  name: "Leaderboard",
  data: function data() {
    return {
      activePeriod: 'this-month',
      // Set "This month" as default active
      showOutsideClub: false,
      timePeriods: [{
        id: 'overall',
        label: 'Overall'
      }, {
        id: 'this-month',
        label: 'This month'
      }, {
        id: 'august',
        label: 'August'
      }, {
        id: 'july',
        label: 'July'
      }, {
        id: 'june',
        label: 'June'
      }, {
        id: 'may',
        label: 'May'
      }],
      leaderboard: [{
        id: 1,
        rank: 1,
        username: 'Paul Steffen',
        avatar: null,
        fitnessPoints: 42420,
        kcal: 27796,
        minutes: 6665,
        country: 'US',
        isInClub: true
      }, {
        id: 2,
        rank: 2,
        username: 'Cheryl Chen',
        avatar: null,
        fitnessPoints: 41467,
        kcal: 22511,
        minutes: 3421,
        country: 'US',
        isInClub: true
      }, {
        id: 3,
        rank: 3,
        username: 'Monica Morgan',
        avatar: null,
        fitnessPoints: 38923,
        kcal: 17255,
        minutes: 2413,
        country: 'US',
        isInClub: true
      }, {
        id: 4,
        rank: 4,
        username: 'Sarah Johnson',
        avatar: null,
        fitnessPoints: 35678,
        kcal: 19876,
        minutes: 2890,
        country: 'US',
        isInClub: true
      }, {
        id: 5,
        rank: 5,
        username: 'Mike Wilson',
        avatar: null,
        fitnessPoints: 32145,
        kcal: 16543,
        minutes: 2156,
        country: 'US',
        isInClub: true
      }, {
        id: 6,
        rank: 6,
        username: 'Lisa Davis',
        avatar: null,
        fitnessPoints: 29876,
        kcal: 14234,
        minutes: 1987,
        country: 'US',
        isInClub: true
      }, {
        id: 7,
        rank: 7,
        username: 'John Smith',
        avatar: null,
        fitnessPoints: 27654,
        kcal: 12345,
        minutes: 1765,
        country: 'US',
        isInClub: true
      }, {
        id: 8,
        rank: 8,
        username: 'Emily Brown',
        avatar: null,
        fitnessPoints: 25432,
        kcal: 11234,
        minutes: 1543,
        country: 'US',
        isInClub: true
      }, {
        id: 9,
        rank: 9,
        username: 'David Lee',
        avatar: null,
        fitnessPoints: 23210,
        kcal: 10123,
        minutes: 1321,
        country: 'US',
        isInClub: true
      }, {
        id: 10,
        rank: 10,
        username: 'Amy Taylor',
        avatar: null,
        fitnessPoints: 20988,
        kcal: 9012,
        minutes: 1099,
        country: 'US',
        isInClub: true
      }, {
        id: 11,
        rank: 11,
        username: 'Chris Anderson',
        avatar: null,
        fitnessPoints: 18766,
        kcal: 7901,
        minutes: 877,
        country: 'US',
        isInClub: true
      }]
    };
  },
  computed: {
    filteredLeaderboard: function filteredLeaderboard() {
      if (this.showOutsideClub) {
        return this.leaderboard;
      }
      return this.leaderboard.filter(function (user) {
        return user.isInClub;
      });
    }
  },
  methods: {
    setActivePeriod: function setActivePeriod(periodId) {
      this.activePeriod = periodId;
      // Here you would typically fetch data for the selected period
      console.log('Selected period:', periodId);
    },
    filterLeaderboard: function filterLeaderboard() {
      // Filter logic is handled by computed property
      console.log('Show outside club:', this.showOutsideClub);
    },
    viewProfile: function viewProfile(userId) {
      // Navigate to user profile
      console.log('View profile for user:', userId);
    }
  }
});

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/Community/Leaderboard.vue?vue&type=style&index=0&id=05fce3ec&scoped=true&lang=css":
/*!*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/Community/Leaderboard.vue?vue&type=style&index=0&id=05fce3ec&scoped=true&lang=css ***!
  \*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
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
___CSS_LOADER_EXPORT___.push([module.id, "\n.leaderboard-page[data-v-05fce3ec] {\r\n  min-height: 100vh;\r\n  background: #f5f5f3;\r\n  padding: 20px;\n}\r\n\r\n/* Header Section */\n.leaderboard-header[data-v-05fce3ec] {\r\n  background: white;\r\n  border-radius: 12px;\r\n  padding: 30px;\r\n  margin-bottom: 20px;\r\n  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);\n}\n.header-content[data-v-05fce3ec] {\r\n  display: flex;\r\n  justify-content: space-between;\r\n  align-items: center;\r\n  margin-bottom: 20px;\n}\n.page-title[data-v-05fce3ec] {\r\n  font-size: 32px;\r\n  font-weight: bold;\r\n  color: #252525;\r\n  margin: 0;\n}\r\n\r\n/* Time Period Tabs */\n.time-period-tabs[data-v-05fce3ec] {\r\n  display: flex;\r\n  gap: 8px;\n}\n.time-tab[data-v-05fce3ec] {\r\n  background: transparent;\r\n  border: 1px solid #dcdcdc;\r\n  color: #686868;\r\n  padding: 8px 16px;\r\n  border-radius: 20px;\r\n  cursor: pointer;\r\n  transition: all 0.3s ease;\r\n  font-size: 14px;\r\n  font-weight: 500;\n}\n.time-tab[data-v-05fce3ec]:hover {\r\n  background: #f8f9fa;\r\n  color: #252525;\n}\n.time-tab.active[data-v-05fce3ec] {\r\n  background: #252525;\r\n  color: white;\r\n  border-color: #252525;\r\n  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);\n}\r\n\r\n/* Filter Section */\n.filter-section[data-v-05fce3ec] {\r\n  display: flex;\r\n  align-items: center;\n}\n.filter-checkbox[data-v-05fce3ec] {\r\n  display: flex;\r\n  align-items: center;\r\n  cursor: pointer;\r\n  font-size: 14px;\r\n  color: #686868;\r\n  gap: 8px;\n}\n.filter-checkbox input[type=\"checkbox\"][data-v-05fce3ec] {\r\n  display: none;\n}\n.checkmark[data-v-05fce3ec] {\r\n  width: 18px;\r\n  height: 18px;\r\n  border: 2px solid #dcdcdc;\r\n  border-radius: 4px;\r\n  position: relative;\r\n  transition: all 0.3s ease;\n}\n.filter-checkbox input[type=\"checkbox\"]:checked + .checkmark[data-v-05fce3ec] {\r\n  background: #ff4040;\r\n  border-color: #ff4040;\n}\n.filter-checkbox input[type=\"checkbox\"]:checked + .checkmark[data-v-05fce3ec]::after {\r\n  content: '✓';\r\n  position: absolute;\r\n  top: 50%;\r\n  left: 50%;\r\n  transform: translate(-50%, -50%);\r\n  color: white;\r\n  font-size: 12px;\r\n  font-weight: bold;\n}\r\n\r\n/* Table Container */\n.leaderboard-table-container[data-v-05fce3ec] {\r\n  background: white;\r\n  border-radius: 12px;\r\n  overflow: hidden;\r\n  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);\n}\r\n\r\n/* Table Styles */\n.leaderboard-table[data-v-05fce3ec] {\r\n  width: 100%;\r\n  border-collapse: collapse;\n}\n.leaderboard-table thead[data-v-05fce3ec] {\r\n  background: #f8f9fa;\n}\n.leaderboard-table th[data-v-05fce3ec] {\r\n  padding: 16px 20px;\r\n  text-align: left;\r\n  font-weight: 600;\r\n  color: #252525;\r\n  font-size: 14px;\r\n  border-bottom: 1px solid #e9ecef;\n}\n.leaderboard-table td[data-v-05fce3ec] {\r\n  padding: 16px 20px;\r\n  border-bottom: 1px solid #f8f9fa;\r\n  font-size: 14px;\n}\n.leaderboard-row[data-v-05fce3ec]:hover {\r\n  background: #f8f9fa;\n}\r\n\r\n/* Table Cell Styles */\n.rank-cell[data-v-05fce3ec] {\r\n  font-weight: 600;\r\n  color: #252525;\r\n  width: 80px;\n}\n.username-cell[data-v-05fce3ec] {\r\n  width: 200px;\n}\n.user-info[data-v-05fce3ec] {\r\n  display: flex;\r\n  align-items: center;\r\n  gap: 12px;\n}\n.user-avatar[data-v-05fce3ec] {\r\n  width: 32px;\r\n  height: 32px;\r\n  border-radius: 50%;\r\n  background: #e9ecef;\r\n  display: flex;\r\n  align-items: center;\r\n  justify-content: center;\r\n  color: #6c757d;\r\n  font-size: 14px;\r\n  flex-shrink: 0;\n}\n.user-avatar img[data-v-05fce3ec] {\r\n  width: 100%;\r\n  height: 100%;\r\n  border-radius: 50%;\r\n  -o-object-fit: cover;\r\n     object-fit: cover;\n}\n.username-link[data-v-05fce3ec] {\r\n  color: #ff4040;\r\n  text-decoration: none;\r\n  font-weight: 500;\r\n  transition: color 0.3s ease;\n}\n.username-link[data-v-05fce3ec]:hover {\r\n  color: #e52e2e;\r\n  text-decoration: underline;\n}\n.points-cell[data-v-05fce3ec] {\r\n  font-weight: 600;\r\n  color: #252525;\r\n  text-align: right;\r\n  width: 120px;\n}\n.kcal-cell[data-v-05fce3ec] {\r\n  text-align: right;\r\n  color: #686868;\r\n  width: 100px;\n}\n.minutes-cell[data-v-05fce3ec] {\r\n  text-align: right;\r\n  color: #686868;\r\n  width: 100px;\n}\n.country-cell[data-v-05fce3ec] {\r\n  text-align: center;\r\n  width: 80px;\n}\n.country-flag[data-v-05fce3ec] {\r\n  font-size: 20px;\n}\r\n\r\n/* Responsive Design */\n@media (max-width: 768px) {\n.leaderboard-page[data-v-05fce3ec] {\r\n    padding: 10px;\n}\n.header-content[data-v-05fce3ec] {\r\n    flex-direction: column;\r\n    gap: 20px;\r\n    align-items: flex-start;\n}\n.time-period-tabs[data-v-05fce3ec] {\r\n    flex-wrap: wrap;\n}\n.leaderboard-table-container[data-v-05fce3ec] {\r\n    overflow-x: auto;\n}\n.leaderboard-table[data-v-05fce3ec] {\r\n    min-width: 600px;\n}\n.page-title[data-v-05fce3ec] {\r\n    font-size: 24px;\n}\n}\n@media (max-width: 480px) {\n.leaderboard-header[data-v-05fce3ec] {\r\n    padding: 20px;\n}\n.time-tab[data-v-05fce3ec] {\r\n    padding: 6px 12px;\r\n    font-size: 12px;\n}\n.leaderboard-table th[data-v-05fce3ec],\r\n  .leaderboard-table td[data-v-05fce3ec] {\r\n    padding: 12px 15px;\n}\n}\r\n", ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/Community/Leaderboard.vue?vue&type=style&index=0&id=05fce3ec&scoped=true&lang=css":
/*!*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/Community/Leaderboard.vue?vue&type=style&index=0&id=05fce3ec&scoped=true&lang=css ***!
  \*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../../../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_clonedRuleSet_9_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_9_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Leaderboard_vue_vue_type_style_index_0_id_05fce3ec_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !!../../../../../../node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!../../../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!../../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Leaderboard.vue?vue&type=style&index=0&id=05fce3ec&scoped=true&lang=css */ "./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/Community/Leaderboard.vue?vue&type=style&index=0&id=05fce3ec&scoped=true&lang=css");

            

var options = {};

options.insert = "head";
options.singleton = false;

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_clonedRuleSet_9_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_9_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Leaderboard_vue_vue_type_style_index_0_id_05fce3ec_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_1__["default"], options);



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_clonedRuleSet_9_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_9_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Leaderboard_vue_vue_type_style_index_0_id_05fce3ec_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_1__["default"].locals || {});

/***/ }),

/***/ "./resources/src/views/app/pages/Community/Leaderboard.vue":
/*!*****************************************************************!*\
  !*** ./resources/src/views/app/pages/Community/Leaderboard.vue ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Leaderboard_vue_vue_type_template_id_05fce3ec_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Leaderboard.vue?vue&type=template&id=05fce3ec&scoped=true */ "./resources/src/views/app/pages/Community/Leaderboard.vue?vue&type=template&id=05fce3ec&scoped=true");
/* harmony import */ var _Leaderboard_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Leaderboard.vue?vue&type=script&lang=js */ "./resources/src/views/app/pages/Community/Leaderboard.vue?vue&type=script&lang=js");
/* harmony import */ var _Leaderboard_vue_vue_type_style_index_0_id_05fce3ec_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Leaderboard.vue?vue&type=style&index=0&id=05fce3ec&scoped=true&lang=css */ "./resources/src/views/app/pages/Community/Leaderboard.vue?vue&type=style&index=0&id=05fce3ec&scoped=true&lang=css");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");



;


/* normalize component */

var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _Leaderboard_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__["default"],
  _Leaderboard_vue_vue_type_template_id_05fce3ec_scoped_true__WEBPACK_IMPORTED_MODULE_0__.render,
  _Leaderboard_vue_vue_type_template_id_05fce3ec_scoped_true__WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  "05fce3ec",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/src/views/app/pages/Community/Leaderboard.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./resources/src/views/app/pages/Community/Leaderboard.vue?vue&type=script&lang=js":
/*!*****************************************************************************************!*\
  !*** ./resources/src/views/app/pages/Community/Leaderboard.vue?vue&type=script&lang=js ***!
  \*****************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Leaderboard_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Leaderboard.vue?vue&type=script&lang=js */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/Community/Leaderboard.vue?vue&type=script&lang=js");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Leaderboard_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/src/views/app/pages/Community/Leaderboard.vue?vue&type=style&index=0&id=05fce3ec&scoped=true&lang=css":
/*!*************************************************************************************************************************!*\
  !*** ./resources/src/views/app/pages/Community/Leaderboard.vue?vue&type=style&index=0&id=05fce3ec&scoped=true&lang=css ***!
  \*************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_dist_cjs_js_node_modules_css_loader_dist_cjs_js_clonedRuleSet_9_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_9_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Leaderboard_vue_vue_type_style_index_0_id_05fce3ec_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/style-loader/dist/cjs.js!../../../../../../node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!../../../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!../../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Leaderboard.vue?vue&type=style&index=0&id=05fce3ec&scoped=true&lang=css */ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/Community/Leaderboard.vue?vue&type=style&index=0&id=05fce3ec&scoped=true&lang=css");


/***/ }),

/***/ "./resources/src/views/app/pages/Community/Leaderboard.vue?vue&type=template&id=05fce3ec&scoped=true":
/*!***********************************************************************************************************!*\
  !*** ./resources/src/views/app/pages/Community/Leaderboard.vue?vue&type=template&id=05fce3ec&scoped=true ***!
  \***********************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Leaderboard_vue_vue_type_template_id_05fce3ec_scoped_true__WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   staticRenderFns: () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Leaderboard_vue_vue_type_template_id_05fce3ec_scoped_true__WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Leaderboard_vue_vue_type_template_id_05fce3ec_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Leaderboard.vue?vue&type=template&id=05fce3ec&scoped=true */ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/Community/Leaderboard.vue?vue&type=template&id=05fce3ec&scoped=true");


/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/Community/Leaderboard.vue?vue&type=template&id=05fce3ec&scoped=true":
/*!**************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/Community/Leaderboard.vue?vue&type=template&id=05fce3ec&scoped=true ***!
  \**************************************************************************************************************************************************************************************************************************************************/
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
  return _c("div", { staticClass: "leaderboard-page" }, [
    _c("div", { staticClass: "leaderboard-header" }, [
      _c("div", { staticClass: "header-content" }, [
        _c("h1", { staticClass: "page-title" }, [
          _vm._v("Fitness Points Top 100"),
        ]),
        _vm._v(" "),
        _c(
          "div",
          { staticClass: "time-period-tabs" },
          _vm._l(_vm.timePeriods, function (period) {
            return _c(
              "button",
              {
                key: period.id,
                class: ["time-tab", { active: _vm.activePeriod === period.id }],
                on: {
                  click: function ($event) {
                    return _vm.setActivePeriod(period.id)
                  },
                },
              },
              [_vm._v("\n          " + _vm._s(period.label) + "\n        ")]
            )
          }),
          0
        ),
      ]),
      _vm._v(" "),
      _c("div", { staticClass: "filter-section" }, [
        _c("label", { staticClass: "filter-checkbox" }, [
          _c("input", {
            directives: [
              {
                name: "model",
                rawName: "v-model",
                value: _vm.showOutsideClub,
                expression: "showOutsideClub",
              },
            ],
            attrs: { type: "checkbox" },
            domProps: {
              checked: Array.isArray(_vm.showOutsideClub)
                ? _vm._i(_vm.showOutsideClub, null) > -1
                : _vm.showOutsideClub,
            },
            on: {
              change: [
                function ($event) {
                  var $$a = _vm.showOutsideClub,
                    $$el = $event.target,
                    $$c = $$el.checked ? true : false
                  if (Array.isArray($$a)) {
                    var $$v = null,
                      $$i = _vm._i($$a, $$v)
                    if ($$el.checked) {
                      $$i < 0 && (_vm.showOutsideClub = $$a.concat([$$v]))
                    } else {
                      $$i > -1 &&
                        (_vm.showOutsideClub = $$a
                          .slice(0, $$i)
                          .concat($$a.slice($$i + 1)))
                    }
                  } else {
                    _vm.showOutsideClub = $$c
                  }
                },
                _vm.filterLeaderboard,
              ],
            },
          }),
          _vm._v(" "),
          _c("span", { staticClass: "checkmark" }),
          _vm._v("\n        Also show users outside my club\n      "),
        ]),
      ]),
    ]),
    _vm._v(" "),
    _c("div", { staticClass: "leaderboard-table-container" }, [
      _c("table", { staticClass: "leaderboard-table" }, [
        _vm._m(0),
        _vm._v(" "),
        _c(
          "tbody",
          _vm._l(_vm.filteredLeaderboard, function (user, index) {
            return _c("tr", { key: user.id, staticClass: "leaderboard-row" }, [
              _c("td", { staticClass: "rank-cell" }, [
                _vm._v(_vm._s(user.rank)),
              ]),
              _vm._v(" "),
              _c("td", { staticClass: "username-cell" }, [
                _c("div", { staticClass: "user-info" }, [
                  _c("div", { staticClass: "user-avatar" }, [
                    user.avatar
                      ? _c("img", {
                          attrs: { src: user.avatar, alt: user.username },
                        })
                      : _c("i", { staticClass: "fas fa-user" }),
                  ]),
                  _vm._v(" "),
                  _c(
                    "a",
                    {
                      staticClass: "username-link",
                      attrs: { href: "#" },
                      on: {
                        click: function ($event) {
                          $event.preventDefault()
                          return _vm.viewProfile(user.id)
                        },
                      },
                    },
                    [
                      _vm._v(
                        "\n                " +
                          _vm._s(user.username) +
                          "\n              "
                      ),
                    ]
                  ),
                ]),
              ]),
              _vm._v(" "),
              _c("td", { staticClass: "points-cell" }, [
                _vm._v(_vm._s(user.fitnessPoints.toLocaleString())),
              ]),
              _vm._v(" "),
              _c("td", { staticClass: "kcal-cell" }, [
                _vm._v(_vm._s(user.kcal.toLocaleString())),
              ]),
              _vm._v(" "),
              _c("td", { staticClass: "minutes-cell" }, [
                _vm._v(_vm._s(user.minutes.toLocaleString())),
              ]),
              _vm._v(" "),
              _vm._m(1, true),
            ])
          }),
          0
        ),
      ]),
    ]),
  ])
}
var staticRenderFns = [
  function () {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("thead", [
      _c("tr", [
        _c("th", [_vm._v("Rank")]),
        _vm._v(" "),
        _c("th", [_vm._v("Username")]),
        _vm._v(" "),
        _c("th", [_vm._v("Fitness Points")]),
        _vm._v(" "),
        _c("th", [_vm._v("Kcal")]),
        _vm._v(" "),
        _c("th", [_vm._v("Minutes")]),
        _vm._v(" "),
        _c("th", [_vm._v("Country")]),
      ]),
    ])
  },
  function () {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("td", { staticClass: "country-cell" }, [
      _c("span", { staticClass: "country-flag" }, [_vm._v("🇺🇸")]),
    ])
  },
]
render._withStripped = true



/***/ })

}]);