<template>
  <div class="minimal-layout">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'MinimalLayout'
};
</script>

<style scoped>
.minimal-layout {
  min-height: 100vh;
}
</style>
