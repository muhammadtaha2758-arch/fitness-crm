import store from "./store";
import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import Auth from './auth/index.js';
window.auth = new Auth();
import { ValidationObserver, ValidationProvider, extend, localize } from 'vee-validate';
import * as rules from "vee-validate/dist/rules";
import { createApp } from 'vue'
import './assets/styles/sass/app.scss';
import 'vue-cal/dist/vuecal.css';
import VueCal from 'vue-cal';
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
// Register vue-cal globally
Vue.component('vue-cal', VueCal);
Vue.use(BootstrapVue)

// Configure toast defaults globally by overriding $bvToast.toast
// This ensures all toasts use top-right position and 1 second duration
Vue.mixin({
  created() {
    // Override $bvToast.toast method for each component instance
    if (this.$bvToast && typeof this.$bvToast.toast === 'function') {
      const originalToast = this.$bvToast.toast.bind(this.$bvToast);
      this.$bvToast.toast = (message, options = {}) => {
        // Always enforce toaster and autoHideDelay, even if explicitly set
        const defaultOptions = {
          ...options,
          toaster: 'b-toaster-top-right',
          autoHideDelay: 1000,
          solid: options.solid !== undefined ? options.solid : true
        };
        return originalToast(message, defaultOptions);
      };
    }
    
    // Also override $root.$bvToast.toast if it exists
    if (this.$root && this.$root.$bvToast && typeof this.$root.$bvToast.toast === 'function') {
      const originalRootToast = this.$root.$bvToast.toast.bind(this.$root.$bvToast);
      this.$root.$bvToast.toast = (message, options = {}) => {
        // Always enforce toaster and autoHideDelay, even if explicitly set
        const defaultOptions = {
          ...options,
          toaster: 'b-toaster-top-right',
          autoHideDelay: 1000,
          solid: options.solid !== undefined ? options.solid : true
        };
        return originalRootToast(message, defaultOptions);
      };
    }
  },
  methods: {
    // Global makeToast helper method with defaults
    makeToast(variant, msg, title) {
      const variantMap = {
        'error': 'danger',
        'success': 'success',
        'warning': 'warning',
        'info': 'info',
        'danger': 'danger'
      };
      
      const toastOptions = {
        title: title || (variant === 'success' ? 'Success' : variant === 'error' ? 'Error' : 'Info'),
        variant: variantMap[variant] || variant,
        solid: true,
        toaster: 'b-toaster-top-right',
        autoHideDelay: 1000
      };
      
      // Use $root.$bvToast if available, otherwise fallback to $bvToast
      const bvToast = this.$root?.$bvToast || this.$bvToast;
      if (bvToast && typeof bvToast.toast === 'function') {
        return bvToast.toast(msg, toastOptions);
      }
    }
  }
})


localize({
  en: {
    messages: {
      required: 'This field is required',
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
Object.keys(rules).forEach(rule => {4
  extend(rule, rules[rule]);
});

// Register it globally
Vue.component("ValidationObserver", ValidationObserver);
Vue.component('ValidationProvider', ValidationProvider);

import StockyKit from "./plugins/stocky.kit";
Vue.use(StockyKit);
import VueCookies from 'vue-cookies'
Vue.use(VueCookies);

var VueCookie = require('vue-cookie');
Vue.use(VueCookie);

import VueExcelXlsx from "vue-excel-xlsx";
Vue.use(VueExcelXlsx);

window.axios = require('axios');
window.axios.defaults.baseURL = '/api/';

window.axios.defaults.withCredentials = true;
window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

// Add CSRF token to all requests (initial load; interceptor refreshes from meta on each request)
const token = document.head.querySelector('meta[name="csrf-token"]');
if (token) {
    window.axios.defaults.headers.common['X-CSRF-TOKEN'] = token.content;
} else {
    console.error('CSRF token not found: https://laravel.com/docs/csrf#csrf-x-csrf-token');
}

// Refresh CSRF token from server (e.g. before logout to avoid stale token). Updates meta + axios defaults.
window.refreshCSRFToken = function () {
    return (window.axios || require('axios'))({
        method: 'get',
        url: '/csrf-token',
        baseURL: '',
    })
        .then((res) => {
            const newToken = res.data && res.data.token;
            if (newToken) {
                window.axios.defaults.headers.common['X-CSRF-TOKEN'] = newToken;
                const meta = document.head.querySelector('meta[name="csrf-token"]');
                if (meta) meta.setAttribute('content', newToken);
            }
            return newToken;
        })
        .catch(() => null);
};

// Add API token to all requests
// Set up axios interceptor to add API token to requests
window.axios.interceptors.request.use((config) => {
    // Use current CSRF token from meta on every request (avoids stale token after long sessions)
    const csrfMeta = document.head.querySelector('meta[name="csrf-token"]');
    if (csrfMeta && csrfMeta.content) {
        config.headers['X-CSRF-TOKEN'] = csrfMeta.content;
    }
    // Helper function to get cookie value from document.cookie
    const getCookieValue = (name) => {
        // Try VueCookies first
        let value = VueCookies.get(name);
        if (value) return value;
        
        // Fallback to document.cookie with better parsing
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            if (cookie.startsWith(name + '=')) {
                value = cookie.substring(name.length + 1);
                // Handle URL-encoded values
                try {
                    value = decodeURIComponent(value);
                } catch (e) {
                    // If decoding fails, use original value
                }
                return value;
            }
        }
        return null;
    };
    
    let apiToken = getCookieValue("Stocky_token");
    
    if (apiToken) {
        // Clean the token (remove any whitespace or quotes)
        apiToken = apiToken.trim().replace(/^["']|["']$/g, '');
        config.headers.Authorization = `Bearer ${apiToken}`;
        
        // Debug log in development
        if (process.env.NODE_ENV === 'development' && config.url && config.url.includes('communication/groups')) {
            console.log('[Axios Interceptor] Token found and added to request:', {
                url: config.url,
                hasToken: !!apiToken,
                tokenLength: apiToken.length,
                tokenPreview: apiToken.substring(0, 20) + '...'
            });
        }
    } else {
        // Only warn if we're not on the login page and not making a public request
        // Public endpoints that don't require authentication
        const publicEndpoints = ['login', 'register', 'password/reset', 'password/email', 'get_user_auth', 'csrf-token'];
        const isPublicEndpoint = publicEndpoints.some(endpoint => config.url && config.url.includes(endpoint));
        const isLoginPage = window.location.pathname === '/login' || window.location.pathname.startsWith('/login');
        
        // Debug: Log when token is missing (only in development and when it's unexpected)
        // Suppress warning for nutrition endpoints as they may work without token in some cases
        const isNutritionEndpoint = config.url && (
            config.url.includes('nutrition/') || 
            config.url.includes('product-serving')
        );
        
        if (process.env.NODE_ENV === 'development' && !isLoginPage && !isPublicEndpoint && !isNutritionEndpoint) {
            console.warn('[Axios Interceptor] No Stocky_token found in cookies', {
                url: config.url,
                allCookies: document.cookie
            });
        }
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

window.axios.interceptors.response.use((response) => {

  return response;
}, (error) => {
  // Helper function to check if a request is an API request
  const isApiRequest = (config) => {
    if (!config) return false;
    
    // Get the full URL (baseURL + url)
    const baseURL = config.baseURL || window.axios.defaults.baseURL || '/api/';
    const relativeUrl = config.url || '';
    const fullUrl = relativeUrl.startsWith('http') 
      ? relativeUrl 
      : (baseURL.replace(/\/$/, '') + '/' + relativeUrl.replace(/^\//, ''));
    
    // Check if it's an API request
    return (
      fullUrl.startsWith('/api/') ||
      relativeUrl.startsWith('/api/') ||
      relativeUrl.startsWith('/workout/') ||
      relativeUrl.startsWith('/get_') ||
      relativeUrl.startsWith('/member/') ||
      relativeUrl.startsWith('/nutrition/') ||
      relativeUrl.startsWith('/appointment/') ||
      (config.headers && (
        (config.headers['Accept'] && config.headers['Accept'].includes('application/json')) ||
        (config.headers['Content-Type'] && config.headers['Content-Type'].includes('application/json'))
      ))
    );
  };

  // Helper function to get cookie value
  const getCookieValue = (name) => {
    let value = VueCookies.get(name);
    if (value) return value;
    
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      if (cookie.startsWith(name + '=')) {
        value = cookie.substring(name.length + 1);
        try {
          value = decodeURIComponent(value);
        } catch (e) {
          // If decoding fails, use original value
        }
        return value;
      }
    }
    return null;
  };

  if (error.response) {
    if (error.response.status === 401) {
      // FIX: More thorough cookie check before redirecting
      const apiToken = getCookieValue("Stocky_token");
      const errorMessage = error.response.data?.message || '';
      const isUnauthenticated = errorMessage.toLowerCase().includes('unauthenticated') ||
                                 errorMessage.toLowerCase().includes('expired') ||
                                 errorMessage.toLowerCase().includes('invalid token');

      // Prevent redirect loops - don't redirect if already on login page
      const path = (window.location.pathname || '').replace(/\/$/, '');
      const isLoginPage = path === '/login' || path.startsWith('/login');
      const isPublicPage = path === '/disable-account' || path.endsWith('/disable-account') || path === '/app/privacy-policy' || path.endsWith('/app/privacy-policy');

      // FIX: Only redirect if token is truly missing AND error indicates unauthenticated
      const apiRequest = isApiRequest(error.config);

      // If token exists but we got 401 (e.g. expired), clear token and redirect once for clean "session expired" experience
      if (apiToken && isUnauthenticated && !isLoginPage && !isPublicPage) {
        VueCookies.remove("Stocky_token");
        error.isHandled = true;
        error.isAuthError = true;
        window.location.href = '/login';
        return Promise.reject(error);
      }

      // Only redirect if token is missing AND error indicates authentication failure
      if (!apiToken && isUnauthenticated && !isLoginPage && !isPublicPage) {
        error.isHandled = true;
        error.isAuthError = true;
        window.location.href = '/login';
        return Promise.reject(error);
      }

      // For page requests (non-API), redirect if token is missing
      if (!apiRequest && !isLoginPage && !isPublicPage) {
        error.isHandled = true;
        error.isAuthError = true;
        window.location.href = '/login';
        return Promise.reject(error);
      }

      // For API requests that are 401, mark as auth error
      if (apiRequest) {
        error.isAuthError = true;
        if (!apiToken && isUnauthenticated && !isLoginPage && !isPublicPage) {
          error.isHandled = true;
          window.location.href = '/login';
          return Promise.reject(error);
        }
      }
    }

    // Only redirect to NotFound for page-level 404s, not API 404s
    if (error.response.status === 404) {
      const apiRequest = isApiRequest(error.config);
      
      if (!apiRequest) {
        router.push({ name: 'NotFound' });
        return Promise.reject(error);
      }
      // For API requests, let the component handle the error
    }
    
    if (error.response.status === 403) {
      const data = error.response.data || {};
      const isSubscriptionRequired = data.code === 'subscription_required' || data.subscribed === false;
      if (isSubscriptionRequired) {
        router.push({ name: 'subscription_required' });
      } else {
        router.push({ name: 'not_authorize' });
      }
      return Promise.reject(error);
    }

    // For API requests, preserve the full error object structure
    // This ensures components can access error.response, error.response.data, etc.
    return Promise.reject(error);
  }
  
  // If no response (network error), don't redirect - let component handle it
  return Promise.reject(error);
});

import vSelect from 'vue-select'
Vue.component('v-select', vSelect)
import 'vue-select/dist/vue-select.css';

import '@trevoreyre/autocomplete-vue/dist/style.css';

window.Fire = new Vue();

import Breadcumb from "./components/breadcumb";
import { i18n } from "./plugins/i18n";

Vue.component("breadcumb", Breadcumb);

Vue.config.productionTip = true;
Vue.config.silent = true;
Vue.config.devtools = false;

// Override toast defaults after Vue instance is created but before mount
// This ensures BootstrapVue is fully initialized
const originalVue = Vue;
const ToastOverridePlugin = {
  install(Vue) {
    // Override prototype methods after BootstrapVue is installed
    Vue.mixin({
      mounted() {
        // Override in mounted hook to ensure $bvToast is available
        if (this.$bvToast && typeof this.$bvToast.toast === 'function' && !this.$bvToast._toastOverridden) {
          const originalToast = this.$bvToast.toast.bind(this.$bvToast);
          this.$bvToast._toastOverridden = true;
          this.$bvToast.toast = (message, options = {}) => {
            const defaultOptions = {
              ...options,
              toaster: 'b-toaster-top-right',
              autoHideDelay: 1000,
              solid: options.solid !== undefined ? options.solid : true
            };
            return originalToast(message, defaultOptions);
          };
        }
        
        if (this.$root && this.$root.$bvToast && typeof this.$root.$bvToast.toast === 'function' && !this.$root.$bvToast._toastOverridden) {
          const originalRootToast = this.$root.$bvToast.toast.bind(this.$root.$bvToast);
          this.$root.$bvToast._toastOverridden = true;
          this.$root.$bvToast.toast = (message, options = {}) => {
            const defaultOptions = {
              ...options,
              toaster: 'b-toaster-top-right',
              autoHideDelay: 1000,
              solid: options.solid !== undefined ? options.solid : true
            };
            return originalRootToast(message, defaultOptions);
          };
        }
      }
    });
  }
};
Vue.use(ToastOverridePlugin);

new Vue({
  store,
  router,
  VueCookie,
  i18n,
  render: h => h(App),
}).$mount("#app");