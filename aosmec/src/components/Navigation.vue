<template>
  <v-app id="navigation">
    <v-navigation-drawer
      color="#56C596"
      floating
      v-model="drawer"
      width="310"
      app
    >
      <v-list dense nav>
        <v-list-group color="white">
          <template v-slot:activator>
            <v-list-item>
              <v-list-item-icon class="ma-0 mt-2 mr-2">
                <v-icon style="color: #edfafd" class="ml-- ">mdi-account-circle-outline</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title class="title" style="color: #205072">
                  AOSMEC
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </template>

          <router-link to="/logout" style="color: #daf5fb">
              <v-list-item>
                <v-list-item-icon class="ml-10 ma-0 mt-2">
                <v-icon small style="color: #edfafd">mdi-logout-variant</v-icon>
              </v-list-item-icon>
                <v-list-item-content
                  style="color: #daf5fb"
                  class="list-item"
                >
                  Logout
                </v-list-item-content>
              </v-list-item>
            </router-link>
        </v-list-group>
      </v-list>

      <v-divider></v-divider>

      <v-list dense nav>
        <v-list-item-group>
          <router-link to="/dashboard" style="color: #c8f0f9">
            <v-list-item>
              <v-list-item-icon class="ml-2 ma-0 mt-2 mr-2">
                <v-icon small style="color: #edfafd">mdi-view-dashboard</v-icon>
              </v-list-item-icon>
              <v-list-item-content style="color: #daf5fb; font-size: 14px">
                Dashboard
              </v-list-item-content>
            </v-list-item>
          </router-link>

          <v-list-group color="white">
            <template v-slot:activator>
              <v-list-item>
                  <v-list-item-icon class="ma-0 mt-2 mr-2">
                    <v-icon small style="color: #edfafd"
                      >mdi-calendar-clock</v-icon
                    >
                  </v-list-item-icon>
                  <v-list-item-content style="color: #daf5fb; font-size: 14px">
                    Bookings
                  </v-list-item-content>
                </v-list-item>
            </template>

            <router-link to="/bookings/reservation" style="color: #daf5fb">
              <v-list-item>
                <v-list-item-icon class="ml-10 ma-0 mt-2">
                <v-icon small style="color: #edfafd">mdi-calendar-check</v-icon>
              </v-list-item-icon>
                <v-list-item-content
                  style="color: #daf5fb"
                  class="list-item"
                >
                  Reservation
                </v-list-item-content>
              </v-list-item>
            </router-link>

            <router-link to="/bookings/check-in" style="color: #daf5fb">
              <v-list-item>
                <v-list-item-icon class="ml-10 ma-0 mt-2">
                <v-icon small style="color: #edfafd">mdi-account-check</v-icon>
              </v-list-item-icon>
                <v-list-item-content
                  style="color: #daf5fb"
                  class="list-item"
                >
                  Check In
                </v-list-item-content>
              </v-list-item>
            </router-link>
          </v-list-group>

          <v-list-group color="white">
            <template v-slot:activator>
                <v-list-item to="/room-mgmt">
                  <v-list-item-icon class="ma-0 mt-2 mr-2">
                    <v-icon small style="color: #edfafd">mdi-bed</v-icon>
                  </v-list-item-icon>
                  <v-list-item-content style="color: #daf5fb; font-size: 14px">
                    Room Management
                  </v-list-item-content>
                </v-list-item>
            </template>

            <router-link to="/room-mgmt/floor-1" style="color: #daf5fb">
              <v-list-item>
                <v-list-item-icon class="ml-10 ma-0 mt-2">
                <v-icon small style="color: #edfafd">mdi-floor-plan</v-icon>
              </v-list-item-icon>
                <v-list-item-content
                  style="color: #daf5fb"
                  class="list-item"
                >
                  Floor 1
                </v-list-item-content>
              </v-list-item>
            </router-link>
            <router-link to="/room-mgmt/floor-2" style="color: #daf5fb">
              <v-list-item>
                <v-list-item-icon class="ml-10 ma-0 mt-2">
                <v-icon small style="color: #edfafd">mdi-floor-plan</v-icon>
              </v-list-item-icon>
                <v-list-item-content
                  style="color: #daf5fb"
                  class="list-item"
                >
                  Floor 2
                </v-list-item-content>
              </v-list-item>
            </router-link>
            <router-link to="/room-mgmt/floor-3" style="color: #daf5fb">
              <v-list-item>
                <v-list-item-icon class="ml-10 ma-0 mt-2">
                <v-icon small style="color: #edfafd">mdi-floor-plan</v-icon>
              </v-list-item-icon>
                <v-list-item-content
                  style="color: #daf5fb"
                  class="list-item"
                >
                  Floor 3
                </v-list-item-content>
              </v-list-item>
            </router-link>
          </v-list-group>

          <router-link to="/service-mgmt" style="color: #c8f0f9">
            <v-list-item>
              <v-list-item-icon class="ml-2 ma-0 mt-2 mr-2">
                <v-icon small style="color: #edfafd">mdi-face-agent</v-icon>
              </v-list-item-icon>
              <v-list-item-content style="color: #daf5fb; font-size: 14px">
                Service Management
              </v-list-item-content>
            </v-list-item>
          </router-link>

          <router-link to="/account-mgmt" style="color: #c8f0f9">
            <v-list-item>
              <v-list-item-icon class="ml-2 ma-0 mt-2 mr-2">
                <v-icon small style="color: #edfafd">mdi-account-multiple</v-icon>
              </v-list-item-icon>
              <v-list-item-content style="color: #daf5fb; font-size: 14px">
                Account Management
              </v-list-item-content>
            </v-list-item>
          </router-link>

          <router-link to="/report" style="color: #c8f0f9">
            <v-list-item>
              <v-list-item-icon class="ml-2 ma-0 mt-2 mr-2">
                <v-icon small style="color: #edfafd">mdi-account-box</v-icon>
              </v-list-item-icon>
              <v-list-item-content style="color: #daf5fb; font-size: 14px">
                Report
              </v-list-item-content>
            </v-list-item>
          </router-link>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>

    <v-main class="ma-5">
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "Navigation",
  data() {
    return {
      drawer: null,
    };
  },
};
</script>

<style scoped>
.list-item {
  font-size: 13px;
}
a {
  text-decoration: none;
}
</style>
