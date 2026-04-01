<template>
  <div class="app-admin-wrap layout-sidebar-large clearfix">
    <top-nav />

    <sidebar />

    <main>
      <div
        :class="{ 'sidenav-open': getSideBarToggleProperties.isSideNavOpen }"
        class="main-content-wrap d-flex flex-column flex-grow-1 container"
      >
        <transition name="page" mode="out-in">
          <router-view />
        </transition>

        <div class="flex-grow-1"></div>
        <appFooter />
      </div>
    </main>
  </div>
</template>

<script>
import Sidebar from "./Sidebar";
import TopNav from "./TopNav";
import appFooter from "../common/footer";
import { mapGetters, mapActions } from "vuex";

export default {
  components: {
    Sidebar,
    TopNav,
    appFooter,
  },
  data() {
    return {};
  },
  computed: {
    ...mapGetters(["getSideBarToggleProperties", "currentUser"]),
  },
  watch: {
    currentUser: {
      handler(user) {
        if (!user || !user.id) return;
        const needsOnboarding = user.password_change_required === true ||
          user.password_change_required === 1 ||
          user.onboarding_required === true ||
          user.onboarding_required === 1;
        if (needsOnboarding && this.$route.path !== "/app/onboarding") {
          this.$router.replace({ path: "/app/onboarding" });
        }
      },
      immediate: true,
    },
  },
  methods: {},
};
</script>
<style>
</style>