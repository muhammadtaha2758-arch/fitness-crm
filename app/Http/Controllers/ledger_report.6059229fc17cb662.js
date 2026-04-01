"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["ledger_report"],{

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/reports/ledger_report.vue?vue&type=script&lang=js":
/*!*********************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/reports/ledger_report.vue?vue&type=script&lang=js ***!
  \*********************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! axios */ "./node_modules/axios/index.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_0__);

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  data: function data() {
    var today = new Date();
    var oneMonthBack = new Date();
    oneMonthBack.setMonth(today.getMonth() - 1);
    return {
      groupedLedgers: {},
      // Store ledger data grouped by account ID
      filters: {
        fromDate: oneMonthBack.toISOString().split('T')[0],
        // From date filter
        toDate: today.toISOString().split('T')[0] // To date filter
      },
      accounts: [],
      childAccounts: [],
      row: {
        account_head_id: '',
        selectedChildId: ''
      }
    };
  },
  methods: {
    fetchAccounts: function fetchAccounts() {
      var _this = this;
      axios__WEBPACK_IMPORTED_MODULE_0___default().get('/report/all_accounts').then(function (response) {
        _this.accounts = response.data;
      });
    },
    fetchChildAccounts: function fetchChildAccounts() {
      var _this2 = this;
      if (!this.row.account_head_id) {
        this.childAccounts = [];
        return;
      }
      axios__WEBPACK_IMPORTED_MODULE_0___default().get('/report/childaccounts', {
        params: {
          parent_id: this.row.account_head_id
        }
      }).then(function (response) {
        _this2.childAccounts = response.data;
      })["catch"](function (error) {
        console.error('Error fetching child accounts:', error);
      });
    },
    fetchLedgerData: function fetchLedgerData() {
      var _this3 = this;
      var params = {
        from_date: this.filters.fromDate,
        to_date: this.filters.toDate,
        controlAccounts: this.row.account_head_id,
        ChildId: this.row.selectedChildId
      };
      axios__WEBPACK_IMPORTED_MODULE_0___default().get('/report/ledger_report', {
        params: params
      }).then(function (response) {
        _this3.groupedLedgers = response.data;
      })["catch"](function (error) {
        console.error('Error fetching ledger data:', error);
      });
    },
    // Format the amount to 2 decimal places
    formatAmount: function formatAmount(amount) {
      return amount ? amount.toFixed(2) : '0.00';
    },
    // Calculate balance considering opening balance and transactions (debits and credits)
    calculateBalance: function calculateBalance(transactions, index) {
      var balance = 0;
      var openingBalance = 0;

      // Calculate opening balance for the first entry
      if (transactions[0].voucher_type === 'OB') {
        openingBalance = transactions[0].balance || 0;
      }
      balance += openingBalance;

      // Calculate balance for subsequent transactions
      for (var i = 1; i <= index; i++) {
        balance += (transactions[i].debit_amount || 0) - (transactions[i].credit_amount || 0);
      }
      return balance.toFixed(2);
    },
    // Calculate total debit or credit for a group of transactions
    calculateGroupTotal: function calculateGroupTotal(transactions, type) {
      return transactions.reduce(function (total, transaction) {
        return total + (transaction[type] || 0);
      }, 0);
    },
    // Calculate the final balance for the entire group of transactions
    calculateFinalBalance: function calculateFinalBalance(transactions) {
      var openingBalance = 0;

      // Check if the first transaction has an opening balance
      if (transactions[0].voucher_type === 'OB') {
        openingBalance = transactions[0].balance || 0;
      }
      var totalDebit = this.calculateGroupTotal(transactions, 'debit_amount');
      var totalCredit = this.calculateGroupTotal(transactions, 'credit_amount');

      // Final balance is opening balance + (total debits - total credits)
      return (openingBalance + totalDebit - totalCredit).toFixed(2);
    }
  },
  mounted: function mounted() {
    this.fetchAccounts();
    this.fetchLedgerData();
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/reports/ledger_report.vue?vue&type=template&id=09c696ed&scoped=true":
/*!********************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/reports/ledger_report.vue?vue&type=template&id=09c696ed&scoped=true ***!
  \********************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* binding */ render),
/* harmony export */   staticRenderFns: () => (/* binding */ staticRenderFns)
/* harmony export */ });
var render = function render() {
  var _vm = this,
    _c = _vm._self._c;
  return _c("div", {
    staticClass: "main-content"
  }, [_c("breadcumb", {
    attrs: {
      page: _vm.$t("Accounts "),
      folder: _vm.$t("Ledger Report")
    }
  }), _vm._v(" "), _c("h3", [_vm._v("General Ledger Report")]), _vm._v(" "), _c("div", {
    staticClass: "card mt-3"
  }, [_c("div", {
    staticClass: "card-body"
  }, [_c("div", {
    staticClass: "date-filter"
  }, [_c("div", {
    staticClass: "row"
  }, [_c("div", {
    staticClass: "mb-2 col-md-6"
  }, [_c("fieldset", {
    staticClass: "form-group"
  }, [_c("legend", {
    staticClass: "bv-no-focus-ring col-form-label pt-0",
    attrs: {
      "for": "fromDate"
    }
  }, [_vm._v("Control Account:")]), _vm._v(" "), _c("select", {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: _vm.row.account_head_id,
      expression: "row.account_head_id"
    }],
    staticClass: "form-control",
    on: {
      change: [function ($event) {
        var $$selectedVal = Array.prototype.filter.call($event.target.options, function (o) {
          return o.selected;
        }).map(function (o) {
          var val = "_value" in o ? o._value : o.value;
          return val;
        });
        _vm.$set(_vm.row, "account_head_id", $event.target.multiple ? $$selectedVal : $$selectedVal[0]);
      }, _vm.fetchChildAccounts]
    }
  }, [_c("option", {
    attrs: {
      value: ""
    }
  }, [_vm._v("ALL")]), _vm._v(" "), _vm._l(_vm.accounts, function (account) {
    return _c("option", {
      key: account.account_number,
      domProps: {
        value: account.account_number
      }
    }, [_vm._v("\n        " + _vm._s(account.account_name) + "\n    ")]);
  })], 2)])]), _vm._v(" "), _c("div", {
    staticClass: "mb-2 col-md-6"
  }, [_c("fieldset", {
    staticClass: "form-group"
  }, [_c("legend", {
    staticClass: "bv-no-focus-ring col-form-label pt-0",
    attrs: {
      "for": "childAccount"
    }
  }, [_vm._v("Child Account:")]), _vm._v(" "), _c("select", {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: _vm.row.selectedChildId,
      expression: "row.selectedChildId"
    }],
    staticClass: "form-control",
    on: {
      change: function change($event) {
        var $$selectedVal = Array.prototype.filter.call($event.target.options, function (o) {
          return o.selected;
        }).map(function (o) {
          var val = "_value" in o ? o._value : o.value;
          return val;
        });
        _vm.$set(_vm.row, "selectedChildId", $event.target.multiple ? $$selectedVal : $$selectedVal[0]);
      }
    }
  }, [_c("option", {
    attrs: {
      value: ""
    }
  }, [_vm._v("ALL")]), _vm._v(" "), _vm._l(_vm.childAccounts, function (child) {
    return _c("option", {
      key: child.account_number,
      domProps: {
        value: child.account_number
      }
    }, [_vm._v("\n                " + _vm._s(child.account_name) + "\n            ")]);
  })], 2)])])]), _vm._v(" "), _c("div", {
    staticClass: "row"
  }, [_c("div", {
    staticClass: "mb-2 col-md-5"
  }, [_c("fieldset", {
    staticClass: "form-group"
  }, [_c("legend", {
    staticClass: "bv-no-focus-ring col-form-label pt-0",
    attrs: {
      "for": "fromDate"
    }
  }, [_vm._v("From:")]), _vm._v(" "), _c("input", {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: _vm.filters.fromDate,
      expression: "filters.fromDate"
    }],
    staticClass: "form-control",
    attrs: {
      type: "date",
      id: "fromDate"
    },
    domProps: {
      value: _vm.filters.fromDate
    },
    on: {
      input: function input($event) {
        if ($event.target.composing) return;
        _vm.$set(_vm.filters, "fromDate", $event.target.value);
      }
    }
  })])]), _vm._v(" "), _c("div", {
    staticClass: "mb-2 col-md-5"
  }, [_c("fieldset", {
    staticClass: "form-group"
  }, [_c("legend", {
    staticClass: "bv-no-focus-ring col-form-label pt-0",
    attrs: {
      "for": "toDate"
    }
  }, [_vm._v("To:")]), _vm._v(" "), _c("input", {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: _vm.filters.toDate,
      expression: "filters.toDate"
    }],
    staticClass: "form-control",
    attrs: {
      type: "date",
      id: "toDate"
    },
    domProps: {
      value: _vm.filters.toDate
    },
    on: {
      input: function input($event) {
        if ($event.target.composing) return;
        _vm.$set(_vm.filters, "toDate", $event.target.value);
      }
    }
  })])]), _vm._v(" "), _c("div", {
    staticClass: "mb-2 col-md-2"
  }, [_c("legend", {
    staticClass: "bv-no-focus-ring col-form-label pt-0",
    attrs: {
      "for": "toDate"
    }
  }, [_vm._v(".")]), _vm._v(" "), _c("button", {
    staticClass: "btn btn-sm btn-light",
    on: {
      click: _vm.fetchLedgerData
    }
  }, [_vm._v("Filter")])])])]), _vm._v(" "), _vm._l(_vm.groupedLedgers, function (transactions, accountId) {
    var _transactions$;
    return _c("div", {
      key: accountId,
      staticClass: "ledger-group ml-4 mr-4"
    }, [_c("h4", {
      staticClass: "mb-2 mt-4 text-grey font-bold"
    }, [_vm._v("Account: " + _vm._s(((_transactions$ = transactions[1]) === null || _transactions$ === void 0 ? void 0 : _transactions$.account_name) || "Unknown Account"))]), _vm._v(" "), _c("div", {
      staticClass: "vgt-responsive"
    }, [_c("table", {
      staticClass: "table-hover tableOne vgt-table",
      staticStyle: {
        "table-layout": "auto",
        width: "100%"
      },
      attrs: {
        id: "vgt-table"
      }
    }, [_vm._m(0, true), _vm._v(" "), _vm._m(1, true), _vm._v(" "), _c("tbody", [_vm._l(transactions, function (transaction, index) {
      return _c("tr", {
        key: transaction.id || "opening-".concat(accountId)
      }, [_c("td", {
        staticClass: "vgt-left-align text-left"
      }, [_c("span", [_vm._v("\n                      " + _vm._s(transaction.entry_date || "-") + "\n                        ")])]), _vm._v(" "), _c("td", {
        staticClass: "vgt-left-align text-left"
      }, [_c("span", [_vm._v("\n                      " + _vm._s(transaction.voucher_number || "-") + "\n                        ")])]), _vm._v(" "), _c("td", {
        staticClass: "vgt-left-align text-left"
      }, [_c("span", [_vm._v("\n                      " + _vm._s(transaction.voucher_type) + "\n                        ")])]), _vm._v(" "), _c("td", {
        staticClass: "vgt-left-align text-left"
      }, [_c("span", [_vm._v("\n                      " + _vm._s(transaction.description) + "\n                        ")])]), _vm._v(" "), _c("td", {
        staticClass: "vgt-left-align text-right"
      }, [_c("span", [_vm._v("\n                      " + _vm._s(_vm.formatAmount(transaction.debit_amount)) + "\n                        ")])]), _vm._v(" "), _c("td", {
        staticClass: "vgt-left-align text-right"
      }, [_c("span", [_vm._v("\n                      " + _vm._s(_vm.formatAmount(transaction.credit_amount)) + "\n                        ")])]), _vm._v(" "), _c("td", {
        staticClass: "vgt-left-align text-right"
      }, [_c("span", [_vm._v("\n                      " + _vm._s(_vm.calculateBalance(transactions, index)) + "\n                        ")])])]);
    }), _vm._v(" "), _c("tr", {
      staticClass: "totals"
    }, [_c("td", {
      staticClass: "vgt-left-align text-left",
      attrs: {
        colspan: "4"
      }
    }, [_c("span", [_c("strong", [_vm._v("Total for Account ID " + _vm._s(accountId))])])]), _vm._v(" "), _c("td", {
      staticClass: "vgt-left-align text-right"
    }, [_c("span", [_c("strong", [_vm._v(_vm._s(_vm.formatAmount(_vm.calculateGroupTotal(transactions, "debit_amount"))))])])]), _vm._v(" "), _c("td", {
      staticClass: "vgt-left-align text-right"
    }, [_c("span", [_c("strong", [_vm._v(_vm._s(_vm.formatAmount(_vm.calculateGroupTotal(transactions, "credit_amount"))))])])]), _vm._v(" "), _c("td", {
      staticClass: "vgt-left-align text-right"
    }, [_c("span", [_c("strong", [_vm._v(_vm._s(_vm.calculateFinalBalance(transactions)))])])])])], 2)])])]);
  })], 2)])], 1);
};
var staticRenderFns = [function () {
  var _vm = this,
    _c = _vm._self._c;
  return _c("colgroup", [_c("col", {
    attrs: {
      id: "col-0"
    }
  }), _vm._v(" "), _c("col", {
    attrs: {
      id: "col-1"
    }
  }), _vm._v(" "), _c("col", {
    attrs: {
      id: "col-2"
    }
  }), _vm._v(" "), _c("col", {
    attrs: {
      id: "col-3"
    }
  }), _vm._v(" "), _c("col", {
    attrs: {
      id: "col-4"
    }
  })]);
}, function () {
  var _vm = this,
    _c = _vm._self._c;
  return _c("thead", [_c("tr", [_c("th", {
    staticClass: "vgt-left-align text-left",
    attrs: {
      scope: "col",
      "aria-sort": "descending",
      "aria-controls": "col-0"
    }
  }, [_c("span", [_vm._v("Entry Date")])]), _vm._v(" "), _c("th", {
    staticClass: "vgt-left-align text-left",
    staticStyle: {
      "max-width": "110px",
      width: "110px"
    },
    attrs: {
      scope: "col",
      "aria-sort": "descending",
      "aria-controls": "col-0"
    }
  }, [_c("span", [_vm._v("Voucher Number")])]), _vm._v(" "), _c("th", {
    staticClass: "vgt-left-align text-left",
    staticStyle: {
      "max-width": "110px",
      width: "110px"
    },
    attrs: {
      scope: "col",
      "aria-sort": "descending",
      "aria-controls": "col-0"
    }
  }, [_c("span", [_vm._v("Voucher Type")])]), _vm._v(" "), _c("th", {
    staticClass: "vgt-left-align text-left",
    attrs: {
      scope: "col",
      "aria-sort": "descending",
      "aria-controls": "col-0"
    }
  }, [_c("span", [_vm._v("Description")])]), _vm._v(" "), _c("th", {
    staticClass: "vgt-right-align text-right",
    attrs: {
      scope: "col",
      "aria-sort": "descending",
      "aria-controls": "col-0"
    }
  }, [_c("span", [_vm._v("Debit Amount")])]), _vm._v(" "), _c("th", {
    staticClass: "vgt-right-align text-right",
    attrs: {
      scope: "col",
      "aria-sort": "descending",
      "aria-controls": "col-0"
    }
  }, [_c("span", [_vm._v("Credit Amount")])]), _vm._v(" "), _c("th", {
    staticClass: "vgt-right-align text-right",
    attrs: {
      scope: "col",
      "aria-sort": "descending",
      "aria-controls": "col-0"
    }
  }, [_c("span", [_vm._v("Balance")])])])]);
}];
render._withStripped = true;


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js??clonedRuleSet-8.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-8.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/reports/ledger_report.vue?vue&type=style&index=0&id=09c696ed&scoped=true&lang=css":
/*!*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??clonedRuleSet-8.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-8.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/reports/ledger_report.vue?vue&type=style&index=0&id=09c696ed&scoped=true&lang=css ***!
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
___CSS_LOADER_EXPORT___.push([module.id, "\n.vgt-table th[data-v-09c696ed], .vgt-table td[data-v-09c696ed] {\n  padding: 5px;\n}\n\n", ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js??clonedRuleSet-8.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-8.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/reports/ledger_report.vue?vue&type=style&index=1&id=09c696ed&scoped=true&lang=css":
/*!*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??clonedRuleSet-8.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-8.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/reports/ledger_report.vue?vue&type=style&index=1&id=09c696ed&scoped=true&lang=css ***!
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
___CSS_LOADER_EXPORT___.push([module.id, "\n.font-bold[data-v-09c696ed] {\n    font-weight: bold;\n}\n.text-grey[data-v-09c696ed]{\n    color: #606266;\n}\n\n\n", ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-8.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-8.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/reports/ledger_report.vue?vue&type=style&index=0&id=09c696ed&scoped=true&lang=css":
/*!*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-8.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-8.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/reports/ledger_report.vue?vue&type=style&index=0&id=09c696ed&scoped=true&lang=css ***!
  \*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../../../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_clonedRuleSet_8_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_8_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_ledger_report_vue_vue_type_style_index_0_id_09c696ed_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !!../../../../../../node_modules/css-loader/dist/cjs.js??clonedRuleSet-8.use[1]!../../../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-8.use[2]!../../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./ledger_report.vue?vue&type=style&index=0&id=09c696ed&scoped=true&lang=css */ "./node_modules/css-loader/dist/cjs.js??clonedRuleSet-8.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-8.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/reports/ledger_report.vue?vue&type=style&index=0&id=09c696ed&scoped=true&lang=css");

            

var options = {};

options.insert = "head";
options.singleton = false;

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_clonedRuleSet_8_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_8_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_ledger_report_vue_vue_type_style_index_0_id_09c696ed_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_1__["default"], options);



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_clonedRuleSet_8_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_8_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_ledger_report_vue_vue_type_style_index_0_id_09c696ed_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_1__["default"].locals || {});

/***/ }),

/***/ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-8.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-8.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/reports/ledger_report.vue?vue&type=style&index=1&id=09c696ed&scoped=true&lang=css":
/*!*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-8.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-8.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/reports/ledger_report.vue?vue&type=style&index=1&id=09c696ed&scoped=true&lang=css ***!
  \*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../../../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_clonedRuleSet_8_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_8_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_ledger_report_vue_vue_type_style_index_1_id_09c696ed_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !!../../../../../../node_modules/css-loader/dist/cjs.js??clonedRuleSet-8.use[1]!../../../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-8.use[2]!../../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./ledger_report.vue?vue&type=style&index=1&id=09c696ed&scoped=true&lang=css */ "./node_modules/css-loader/dist/cjs.js??clonedRuleSet-8.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-8.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/reports/ledger_report.vue?vue&type=style&index=1&id=09c696ed&scoped=true&lang=css");

            

var options = {};

options.insert = "head";
options.singleton = false;

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_clonedRuleSet_8_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_8_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_ledger_report_vue_vue_type_style_index_1_id_09c696ed_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_1__["default"], options);



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_clonedRuleSet_8_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_8_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_ledger_report_vue_vue_type_style_index_1_id_09c696ed_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_1__["default"].locals || {});

/***/ }),

/***/ "./resources/src/views/app/pages/reports/ledger_report.vue":
/*!*****************************************************************!*\
  !*** ./resources/src/views/app/pages/reports/ledger_report.vue ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _ledger_report_vue_vue_type_template_id_09c696ed_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ledger_report.vue?vue&type=template&id=09c696ed&scoped=true */ "./resources/src/views/app/pages/reports/ledger_report.vue?vue&type=template&id=09c696ed&scoped=true");
/* harmony import */ var _ledger_report_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ledger_report.vue?vue&type=script&lang=js */ "./resources/src/views/app/pages/reports/ledger_report.vue?vue&type=script&lang=js");
/* harmony import */ var _ledger_report_vue_vue_type_style_index_0_id_09c696ed_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ledger_report.vue?vue&type=style&index=0&id=09c696ed&scoped=true&lang=css */ "./resources/src/views/app/pages/reports/ledger_report.vue?vue&type=style&index=0&id=09c696ed&scoped=true&lang=css");
/* harmony import */ var _ledger_report_vue_vue_type_style_index_1_id_09c696ed_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./ledger_report.vue?vue&type=style&index=1&id=09c696ed&scoped=true&lang=css */ "./resources/src/views/app/pages/reports/ledger_report.vue?vue&type=style&index=1&id=09c696ed&scoped=true&lang=css");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");



;



/* normalize component */

var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_4__["default"])(
  _ledger_report_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__["default"],
  _ledger_report_vue_vue_type_template_id_09c696ed_scoped_true__WEBPACK_IMPORTED_MODULE_0__.render,
  _ledger_report_vue_vue_type_template_id_09c696ed_scoped_true__WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  "09c696ed",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/src/views/app/pages/reports/ledger_report.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./resources/src/views/app/pages/reports/ledger_report.vue?vue&type=script&lang=js":
/*!*****************************************************************************************!*\
  !*** ./resources/src/views/app/pages/reports/ledger_report.vue?vue&type=script&lang=js ***!
  \*****************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ledger_report_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./ledger_report.vue?vue&type=script&lang=js */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/reports/ledger_report.vue?vue&type=script&lang=js");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ledger_report_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/src/views/app/pages/reports/ledger_report.vue?vue&type=template&id=09c696ed&scoped=true":
/*!***********************************************************************************************************!*\
  !*** ./resources/src/views/app/pages/reports/ledger_report.vue?vue&type=template&id=09c696ed&scoped=true ***!
  \***********************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_lib_index_js_vue_loader_options_ledger_report_vue_vue_type_template_id_09c696ed_scoped_true__WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   staticRenderFns: () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_lib_index_js_vue_loader_options_ledger_report_vue_vue_type_template_id_09c696ed_scoped_true__WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_lib_index_js_vue_loader_options_ledger_report_vue_vue_type_template_id_09c696ed_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!../../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./ledger_report.vue?vue&type=template&id=09c696ed&scoped=true */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/reports/ledger_report.vue?vue&type=template&id=09c696ed&scoped=true");


/***/ }),

/***/ "./resources/src/views/app/pages/reports/ledger_report.vue?vue&type=style&index=0&id=09c696ed&scoped=true&lang=css":
/*!*************************************************************************************************************************!*\
  !*** ./resources/src/views/app/pages/reports/ledger_report.vue?vue&type=style&index=0&id=09c696ed&scoped=true&lang=css ***!
  \*************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_dist_cjs_js_node_modules_css_loader_dist_cjs_js_clonedRuleSet_8_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_8_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_ledger_report_vue_vue_type_style_index_0_id_09c696ed_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/style-loader/dist/cjs.js!../../../../../../node_modules/css-loader/dist/cjs.js??clonedRuleSet-8.use[1]!../../../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-8.use[2]!../../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./ledger_report.vue?vue&type=style&index=0&id=09c696ed&scoped=true&lang=css */ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-8.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-8.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/reports/ledger_report.vue?vue&type=style&index=0&id=09c696ed&scoped=true&lang=css");


/***/ }),

/***/ "./resources/src/views/app/pages/reports/ledger_report.vue?vue&type=style&index=1&id=09c696ed&scoped=true&lang=css":
/*!*************************************************************************************************************************!*\
  !*** ./resources/src/views/app/pages/reports/ledger_report.vue?vue&type=style&index=1&id=09c696ed&scoped=true&lang=css ***!
  \*************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_dist_cjs_js_node_modules_css_loader_dist_cjs_js_clonedRuleSet_8_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_8_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_ledger_report_vue_vue_type_style_index_1_id_09c696ed_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/style-loader/dist/cjs.js!../../../../../../node_modules/css-loader/dist/cjs.js??clonedRuleSet-8.use[1]!../../../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-8.use[2]!../../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./ledger_report.vue?vue&type=style&index=1&id=09c696ed&scoped=true&lang=css */ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-8.use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-8.use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/src/views/app/pages/reports/ledger_report.vue?vue&type=style&index=1&id=09c696ed&scoped=true&lang=css");


/***/ })

}]);