<template>
    <div class="workout-container">
        <router-view />
    </div>
</template>

<script>
export default {
    name: "Workout",
    data() {
        return {};
    },
};
</script>

<style scoped>
.workout-container {
    width: 100%;
    height: 100%;
}
</style>