<template>
  <div class="people-layout">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'PeopleLayout',
  data() {
    return {};
  }
};
</script>

<style scoped>
.people-layout {
  width: 100%;
  height: 100%;
}
</style>