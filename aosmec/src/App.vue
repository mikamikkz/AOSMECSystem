<template>
  <v-app>
    <Navigation></Navigation>
    <v-main style="background: #f9fcfb">
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
import Navigation from "./components/Navigation.vue";

export default {
  name: "App",
  components: {
    Navigation,
  },
  data: () => ({}),
};
</script>

<style>
.v-main{
  background: #f9fcfb;
}
</style>


