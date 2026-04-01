import store from "./store";
import Vue from "vue";
import router from "./router";
import { ValidationObserver, ValidationProvider, extend, localize } from 'vee-validate';
import * as rules from "vee-validate/dist/rules";
import BootstrapVue from 'bootstrap-vue/dist/bootstrap-vue.esm';
Vue.use(BootstrapVue);
import "./assets/styles/sass/themes/lite-purple.scss";

Vue.component(
  "large-sidebar",
  // The `import` function returns a Promise.
  () => import(/* webpackChunkName: "largeSidebar" */ "./containers/layouts/largeSidebar")
);

Vue.component(
  "customizer",
  // The `import` function returns a Promise.
  () => import(/* webpackChunkName: "customizer" */ "./components/common/customizer.vue")
);
Vue.component("vue-perfect-scrollbar", () =>
  import(/* webpackChunkName: "vue-perfect-scrollbar" */ "vue-perfect-scrollbar")
);
import Meta from "vue-meta";

Vue.use(Meta, {
  keyName: "metaInfo",
  attribute: "data-vue-meta",
  ssrAttribute: "data-vue-meta-server-rendered",
  tagIDKeyName: "vmid",
  refreshOnceOnNavigation: true
});

localize({
  en: {
    messages: {
      required: 'This field is required',
      email: 'Please enter a valid email address',
      required_if: 'This field is required',
      regex: 'This field must be a valid',
      mimes: `This field must have a valid file type.`,
      size: (_, { size }) => `This field size must be less than ${size}.`,
      min: 'This field must have no less than {length} characters',
      max: (_, { length }) => `This field must have no more than ${length} characters`
    }
  },
});
// Install VeeValidate rules and localization
Object.keys(rules).forEach(rule => {
  extend(rule, rules[rule]);
});

// Register it globally
Vue.component("ValidationObserver", ValidationObserver);
Vue.component('ValidationProvider', ValidationProvider);

window.axios = require('axios');
window.axios.defaults.baseURL = '';

window.axios.defaults.withCredentials = true;
window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

// Add API token to all requests (for login page)
import VueCookies from "vue-cookies";
Vue.use(VueCookies);

// Set up axios interceptor to add API token to requests
axios.interceptors.request.use((config) => {
    const apiToken = VueCookies.get("Stocky_token");
    if (apiToken) {
        config.headers.Authorization = `Bearer ${apiToken}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

axios.interceptors.response.use((response) => {

  return response;
}, (error) => {
  if (error.response && error.response.data) {
    if (error.response.status === 401) {
      // Only redirect to login for page requests, not API requests
      const isPageRequest = !error.config.url.startsWith('/api/');
      if (isPageRequest) {
        window.location.href='/login';
      }
      // For API requests, let the component handle the error
    }

    // Only redirect to NotFound for page-level 404s, not API 404s
    // API 404s should be handled by the components themselves
    if (error.response.status === 404) {
      // Check if this is a page request (not an API request)
      const isPageRequest = !error.config.url.startsWith('/api/');
      if (isPageRequest) {
        router.push({ name: 'NotFound' });
      }
      // For API requests, let the component handle the error
    }
    if (error.response.status === 403) {
      // Do not redirect when 403 is from the login request itself (let signIn show the toast)
      const isLoginRequest = (error.config && error.config.url && String(error.config.url).replace(/^\//, '').indexOf('login') !== -1);
      if (!isLoginRequest) {
        router.push({ name: 'not_authorize' });
      }
    }

    return Promise.reject(error);
  }
  return Promise.reject(error);
});

window.Fire = new Vue();

import { i18n } from "./plugins/i18n";

Vue.component('login-component', require('./views/app/sessions/signIn.vue').default);
Vue.component('forgot-component', require('./views/app/sessions/forgot.vue').default);
Vue.component('reset-component', require('./views/app/sessions/reset.vue').default);
Vue.component('password-setup-component', require('./views/app/sessions/passwordSetup.vue').default);
Vue.component('coach-password-setup-component', require('./views/app/sessions/coachPasswordSetup.vue').default);
Vue.component('password-reset-component', require('./views/app/sessions/passwordReset.vue').default);
Vue.component('registration-complete-component', require('./views/app/sessions/registrationComplete.vue').default);

Vue.config.productionTip = true;
Vue.config.silent = true;
Vue.config.devtools = false;

var login = new Vue({

  el: '#login',
  store,
  i18n,
  router:router,
});

var registration = new Vue({

  el: '#registration',
  store,
  i18n,
  router:router,
});