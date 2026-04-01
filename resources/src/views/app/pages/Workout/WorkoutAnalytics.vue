<template>
  <div class="dumbbell-icon-wrapper" @click="handleClick">
    <div class="dumbbell">
      <div class="weight left"></div>
      <div class="bar"></div>
      <div class="weight right"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DumbbellIcon',
  methods: {
    handleClick() {
      // You can emit an event to the parent component (your sidebar)
      // or trigger a Vuex action, or navigate, etc.
      this.$emit('dumbbell-clicked');
      console.log('Dumbbell icon clicked!');
      // Example: If you want to change something in the sidebar
      // this.$parent.openSidebarSection('workouts');
    }
  }
}
</script>

<style scoped>

.dumbbell-icon-wrapper {
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 110px; /* Adjust size as needed */
  height: 85px; /* Adjust size as needed */
  /* Optional: Add some padding or margin if it's in a list */
  padding: 5px;
  box-sizing: border-box;
  background-color: #252525;
  border-radius: 10%; /* Makes it circular */
  transition: background-color 0.3s ease; /* Smooth background color change */
}

.dumbbell {
  display: flex;
  align-items: center;
  position: relative;
  /* Initial state for animation */
  transform: translateY(0);
  transition: transform 0.3s ease-in-out; /* Smooth transition for hover effect */
}

/* Hover animation */
.dumbbell-icon-wrapper:hover .dumbbell {
  animation: dumbbell-bounce 0.6s ease-in-out infinite alternate; /* Or a different animation */
}

.weight {
  width: 18px; /* Adjust size */
  height: 26px; /* Adjust size */
  background-color: #f5f5f3; /* Light grey */
  border-radius: 3px;
  position: relative;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.weight.left {
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
}

.weight.right {
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
}

.bar {
  width: 22px; /* Adjust size */
  height: 6px; /* Adjust size */
  background-color: #999; /* Lighter grey for the bar */
  margin: 0 -2px; /* Overlap slightly with weights */
  position: relative;
  z-index: 1; /* Ensure bar is above weights if needed for complex designs */
}

/* Animation Keyframes */
/* @keyframes dumbbell-bounce {
  0% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-5px); /* Moves up slightly */
  /* } */
  /* 100% { */
    /* transform: translateY(0); */
  /* } */
/* } */

/* Optional: Add a subtle rotate animation on hover */

@keyframes dumbbell-rotate {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(90deg); }
}
.dumbbell-icon-wrapper:hover .dumbbell {
  animation: dumbbell-rotate 0.5s ease-in-out forwards;
}

</style>