<template>
  <div class="dashboard">
      <Floor
        v-bind:data="data"
        v-on:guestDetails="guestDetails($event)"
        v-on:checkOut="checkOut($event)"
      ></Floor>
  </div>
</template>

<script>
import Floor from "./components/Floor.vue";

export default {
  name: "Floors-parent",
  components: {
      Floor
  },
  data() {
    return {};
  },
};
</script>

<style scoped>
</style>
