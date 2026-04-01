<template>
  <div>
    <component :is="layoutComponent" />
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  components: {},
  data() {
    return {};
  },
  computed: {
    ...mapGetters(["getThemeMode"]),
    layoutComponent() {
      const path = this.$route && this.$route.path ? this.$route.path.replace(/\/$/, '') : '';
      const isPrivacyPolicy = path === '/app/privacy-policy' || path.endsWith('/app/privacy-policy');
      return isPrivacyPolicy ? 'minimal-layout' : this.getThemeMode.layout;
    }
  },
  methods: {}
};
</script>