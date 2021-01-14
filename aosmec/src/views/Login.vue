<template>
  <div class="dashboard">
    <v-container class="mt-10 pt-10">
      <v-layout wrap>
        <v-flex sm12 md6 offset-md3>
          <v-card elevation="4" light tag="section">
            <v-card-title>
              <v-layout align-center justify-space-between>
                <h3 class="font-weight-medium text-uppercase">Login</h3>
                <v-spacer></v-spacer>
                <h3 class="font-weight-medium text-uppercase">Aosmec</h3>
                <!-- <v-flex>
                  <v-img :alt="platformName" class="ml-3" contain height="48px" position="center right" src=""></v-img>
                </v-flex> -->
              </v-layout>
            </v-card-title>
            <v-divider></v-divider>
            <v-card-text>
              <p>Sign in with your username and password:</p>
              <v-form>
                <v-text-field
                  outline
                  label="Username"
                  type="text"
                  v-model="username"
                ></v-text-field>
                <v-text-field
                  outline
                  hide-details
                  label="Password"
                  type="password"
                  v-model="password"
                ></v-text-field>
              </v-form>
            </v-card-text>
            <v-divider></v-divider>
            <v-card-actions :class="{ 'pa-3': $vuetify.breakpoint.smAndUp }">
              <v-spacer></v-spacer>
              <v-btn
                to="/register"
                color="secondary"
                :large="$vuetify.breakpoint.smAndUp"
              >
                Register
              </v-btn>
              <v-btn to="/dashboard" color="success" :large="$vuetify.breakpoint.smAndUp">
                Login
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
export default {
  name: "Login",
  components: {},
  data() {
    return {};
  },
};
</script>

<style scoped>
</style>
