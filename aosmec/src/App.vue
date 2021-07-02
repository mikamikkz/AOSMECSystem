<template>
  <v-app>
    <!-- <Login></Login> -->
    <Login v-if="this.$store.state.status == 0"></Login>
    <Navigation v-if="this.$store.state.status > 0"></Navigation>
    <!-- <v-main style="background: #f9fcfb" v-if="this.$store.state.status == 1"> -->
    <!-- <Navigation></Navigation> -->
    <v-main style="background: #f9fcfb">
      <router-view v-if="this.$store.state.status > 0"></router-view>
    </v-main>
  </v-app>
</template>

<script>
import Login from "./views/Login.vue";
import Navigation from "./components/Navigation.vue";

export default {
  name: "App",
  components: {
    Login,
    Navigation
  },
  data: () => ({})
};
</script>

<style>
.v-main{
  background: #f9fcfb;
}
</style>


