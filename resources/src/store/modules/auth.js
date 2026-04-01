import Vue from 'vue'
import Vuex from 'vuex'
import router from "./../../router";
import store from '../../store/index.js'
import { i18n } from "../../plugins/i18n";


Vue.use(Vuex)


const state = {
    isAuthenticated:false,
    Permissions: null,
    user: {},
    loading: false,
    error: null,
    notifs:0,
    Default_Language:'en',
    adminNotifications: [],
    unreadNotificationCount: 0,
};


const getters = {
    isAuthenticated: state => state.isAuthenticated,
    currentUser: state => state.user,
    currentUserPermissions: state => state.Permissions,
    loading: state => state.loading,
    notifs_alert: state => state.notifs,
    DefaultLanguage: state => state.Default_Language,
    error: state => state.error,
    adminNotifications: state => state.adminNotifications,
    unreadNotificationCount: state => state.unreadNotificationCount,
};

const mutations = {
    setLoading(state, data) {
        state.loading = data;
        state.error = null;
    },
    setError(state, data) {
        state.error = data;
        state.loggedInUser = null;
        state.loading = false;
    },
    clearError(state) {
        state.error = null;
    },
   
    setPermissions(state, Permissions) {
        state.Permissions = Permissions;
    },

   
    setUser(state, user) {
        state.user = user;
    },


    SetDefaultLanguage(state, Language) {
        i18n.locale = Language;
        store.dispatch("language/setLanguage", Language);
        state.Default_Language = Language;
    },

    Notifs_alert(state, notifs) {
        state.notifs = notifs;
    },


    logout(state) {
        state.user = null;
        state.Permissions = null;
        state.loggedInUser = null;
        state.loading = false;
        state.error = null;
        state.adminNotifications = [];
        state.unreadNotificationCount = 0;
    },

    setAdminNotifications(state, notifications) {
        state.adminNotifications = notifications;
    },

    setUnreadNotificationCount(state, count) {
        state.unreadNotificationCount = count;
    },

    addNotification(state, notification) {
        state.adminNotifications.unshift(notification);
        if (!notification.is_read) {
            state.unreadNotificationCount++;
        }
    },

    markNotificationAsRead(state, notificationId) {
        const notification = state.adminNotifications.find(n => n.id === notificationId);
        if (notification && !notification.is_read) {
            notification.is_read = true;
            notification.read_at = new Date().toISOString();
            state.unreadNotificationCount = Math.max(0, state.unreadNotificationCount - 1);
        }
    },
};

const actions = {

    async refreshUserPermissions(context) {

        await (window.axios || require('axios')).get("get_user_auth").then((userAuth) => {
            let Permissions = userAuth.data.permissions
            let user = userAuth.data.user
            let notifs = userAuth.data.notifs
            let default_language = userAuth.data.user.default_language

            context.commit('setPermissions', Permissions)
            context.commit('setUser', user)
            context.commit('Notifs_alert', notifs)

            context.commit('SetDefaultLanguage', default_language)
        }).catch(() => {
            context.commit('setPermissions', null)
            context.commit('setUser', null)
            context.commit('Notifs_alert', null)
            context.commit('SetDefaultLanguage', 'en')
        });
    },

    async logout({ commit }) {
        const axios = window.axios || require('axios');
        const doLogout = () =>
            axios({
                method: 'post',
                url: '/logout',
                baseURL: '',
            });

        const redirectToLogin = () => {
            window.location.href = '/login';
        };

        try {
            // Always get a fresh CSRF token so logout works in one click (no refresh needed)
            const refreshed = typeof window.refreshCSRFToken === 'function' ? await window.refreshCSRFToken() : null;
            // If we couldn't get a fresh token (e.g. route returned HTML), go to login without calling logout to avoid 419
            if (!refreshed) {
                redirectToLogin();
                return;
            }
            await doLogout();
            redirectToLogin();
        } catch (err) {
            const status = err.response && err.response.status;
            const isCsrfError = status === 419 || (err.response && err.response.data && (err.response.data.message || '').toLowerCase().includes('csrf'));
            if (isCsrfError) {
                try {
                    await (typeof window.refreshCSRFToken === 'function' ? window.refreshCSRFToken() : Promise.resolve());
                    await doLogout();
                } catch (retryErr) {
                    // Ignore
                }
            }
            redirectToLogin();
        }
    },

    async fetchAdminNotifications({ commit }) {
        try {
            const response = await (window.axios || require('axios')).get('admin/notifications/recent');
            if (response.data.success) {
                commit('setAdminNotifications', response.data.data);
            }
        } catch (error) {
            // Only log non-500 errors to avoid console spam
            // 500 errors indicate server-side issues that should be handled server-side
            if (error.response && error.response.status !== 500) {
                console.error('Error fetching notifications:', error);
            }
            // Silently handle 500 errors - they're server-side issues
            // Keep existing notifications on error to prevent UI flicker
        }
    },
    
    async fetchUnreadCount({ commit }) {
        try {
            const response = await (window.axios || require('axios')).get('admin/notifications/unread-count');
            if (response.data.success) {
                commit('setUnreadNotificationCount', response.data.count);
            }
        } catch (error) {
            // Don't log 401 errors - they're handled globally by axios interceptor
            // Don't log 500 errors - they're server-side issues
            if (error.response && error.response.status !== 401 && error.response.status !== 500) {
                console.error('Error fetching unread count:', error);
            }
            // Silently handle 401 and 500 errors
            // Don't reset count on error to prevent UI flicker - keep last known value
        }
    },
    
    async markNotificationAsRead({ commit }, notificationId) {
        try {
            await (window.axios || require('axios')).post(`admin/notifications/${notificationId}/mark-read`);
            commit('markNotificationAsRead', notificationId);
        } catch (error) {
            console.error('Error marking notification as read:', error);
            throw error;
        }
    },
    
    async markAllNotificationsAsRead({ commit, state }) {
        try {
            await (window.axios || require('axios')).post('admin/notifications/mark-all-read');
            commit('setUnreadNotificationCount', 0);
            // Update all notifications in state
            commit('setAdminNotifications', 
                state.adminNotifications.map(n => ({ ...n, is_read: true, read_at: new Date().toISOString() }))
            );
        } catch (error) {
            console.error('Error marking all as read:', error);
            throw error;
        }
    },
};

export default {
    state,
    getters,
    actions,
    mutations
};