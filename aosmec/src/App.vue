<template>
  <v-app>
    <Navigation/>
    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
// @ or . is an alias to /src
import Navigation from '@/components/Navigation.vue'

export default {
  name: 'Home',
  components: {
    Navigation
  }
}
</script>

<style>
</style>


