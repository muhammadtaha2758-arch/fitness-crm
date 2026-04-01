<template>
  <div v-if="Loading">
    <router-view></router-view>
    <b-toaster name="b-toaster-top-right" />
  </div>
</template>


<script>
import { mapActions, mapGetters } from "vuex";

export default {
  data() {
    return {
      Loading:false,
      currentVersion: null,
    };
  },
  created() {
  },

  computed: {
    ...mapGetters(["getThemeMode","isAuthenticated"]),
    themeName() {
      return this.getThemeMode.dark ? "dark-theme" : " ";
    },
    rtl() {
      return this.getThemeMode.rtl ? "rtl" : " ";
    }
  },

  metaInfo() {
    return {
      title: "Thor Strength Fitness",
      titleTemplate: "%s | Thor Strength Fitness",
      bodyAttrs: {
        class: [this.themeName, "text-left"]
      },
      htmlAttrs: {
        dir: this.rtl
      },

    };
  },
methods:{
    ...mapActions([
      "refreshUserPermissions",
    ]),
    async checkVersion() {
      try {
        const res = await fetch('/version.json', { cache: 'no-cache' });
        const data = await res.json();

        if (this.currentVersion && this.currentVersion !== data.version) {
          console.log('New version detected. Reloading...');
          location.reload(true);
        }

        this.currentVersion = data.version;
      } catch (e) {
        console.error('Version check failed:', e);
      }
    }
},

//  beforeMount() {
//         this.refreshUserPermissions();
//         setTimeout(() => this.Loading= true, 300);
//   }

beforeMount() {
    // Public pages that don't require auth - skip get_user_auth to avoid 401 redirect
    const path = typeof window !== 'undefined' ? window.location.pathname.replace(/\/$/, '') : '';
    const isPublicPage = path === '/disable-account' || path.endsWith('/disable-account') || path === '/app/privacy-policy' || path.endsWith('/app/privacy-policy');
    if (!isPublicPage) {
      this.refreshUserPermissions();
    }
    setTimeout(() => this.Loading = true, 300);
  }
};
</script>