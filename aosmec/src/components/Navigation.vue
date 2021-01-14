<template>
    <v-navigation-drawer
      color="#13b150"
      permanent
      v-model="drawer"
      width="260"
      app
    >
    <v-card flat class="not-rounded" color="#13b150">
      <v-list-item class="pb-1">
        <v-list-item-content class="mt-2 ml-2">
          <v-list-item-title style="font-size: 20px" class="title white--text">
            AOSMEC Square
          </v-list-item-title>
          <v-list-item-subtitle style="color: #e3fff6">Booking System</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </v-card>
      <v-divider></v-divider>

      <v-list dense nav>
        <v-list-item-group>
          <router-link to="/dashboard" style="color: #c8f0f9">
            <v-list-item>
              <v-list-item-icon class="ml-2 ma-0 mt-2 mr-2">
                <v-icon small style="color: #e3fff6">mdi-view-dashboard</v-icon>
              </v-list-item-icon>
              <v-list-item-content style="color: #e3fff6; font-size: 14px">
                Dashboard
              </v-list-item-content>
            </v-list-item>
          </router-link>

          <v-list-group color="white">
            <template v-slot:activator>
                <v-list-item-icon class="ma-0 mt-2 mr-2 pl-2 pr-2">
                  <v-icon small style="color: #e3fff6"
                    >mdi-calendar-clock</v-icon
                  >
                </v-list-item-icon>
                <v-list-item-content style="color: #e3fff6; font-size: 14px">
                  Bookings
                </v-list-item-content>
            </template>

            <router-link to="/reservation" style="color: #daf5fb">
              <v-list-item>
                <v-list-item-icon class="ml-10 ma-0 mt-2">
                  <v-icon small style="color: #e3fff6"
                    >mdi-calendar-check</v-icon
                  >
                </v-list-item-icon>
                <v-list-item-content style="color: #e3fff6" class="list-item">
                  Reservation
                </v-list-item-content>
              </v-list-item>
            </router-link>

            <router-link to="/checkin" style="color: #daf5fb">
              <v-list-item>
                <v-list-item-icon class="ml-10 ma-0 mt-2">
                  <v-icon small style="color: #e3fff6"
                    >mdi-account-check</v-icon
                  >
                </v-list-item-icon>
                <v-list-item-content style="color: #e3fff6" class="list-item">
                  Check In
                </v-list-item-content>
              </v-list-item>
            </router-link>
          </v-list-group>

          <v-list-group color="white">
            <template v-slot:activator>
              <v-list-item to="/room-mgmt" color="white">
                <v-list-item-icon class="ma-0 mt-2 mr-2 ml-0 pr-2">
                  <v-icon small style="color: #e3fff6">mdi-bed</v-icon>
                </v-list-item-icon>
                <v-list-item-content style="color: #e3fff6; font-size: 14px">
                  Room Management
                </v-list-item-content>
              </v-list-item>
            </template>

            <router-link to="/room-mgmt/floor-1" style="color: #daf5fb">
              <v-list-item>
                <v-list-item-icon class="ml-10 ma-0 mt-2">
                  <v-icon small style="color: #e3fff6">mdi-floor-plan</v-icon>
                </v-list-item-icon>
                <v-list-item-content style="color:#e3fff6C" class="list-item">
                  Floor 1
                </v-list-item-content>
              </v-list-item>
            </router-link>
            <router-link to="/room-mgmt/floor-2" style="color: #daf5fb">
              <v-list-item>
                <v-list-item-icon class="ml-10 ma-0 mt-2">
                  <v-icon small style="color: #e3fff6">mdi-floor-plan</v-icon>
                </v-list-item-icon>
                <v-list-item-content style="color: #e3fff6" class="list-item">
                  Floor 2
                </v-list-item-content>
              </v-list-item>
            </router-link>
            <router-link to="/room-mgmt/floor-3" style="color: #daf5fb">
              <v-list-item>
                <v-list-item-icon class="ml-10 ma-0 mt-2">
                  <v-icon small style="color: #e3fff6">mdi-floor-plan</v-icon>
                </v-list-item-icon>
                <v-list-item-content style="color: #e3fff6" class="list-item">
                  Floor 3
                </v-list-item-content>
              </v-list-item>
            </router-link>
          </v-list-group>

          <router-link to="/service-mgmt" style="color: #c8f0f9">
            <v-list-item>
              <v-list-item-icon class="ml-2 ma-0 mt-2 mr-2">
                <v-icon small style="color: #e3fff6">mdi-face-agent</v-icon>
              </v-list-item-icon>
              <v-list-item-content style="color: #e3fff6; font-size: 14px">
                Service Management
              </v-list-item-content>
            </v-list-item>
          </router-link>

          <router-link to="/account-mgmt" style="color: #c8f0f9">
            <v-list-item>
              <v-list-item-icon class="ml-2 ma-0 mt-2 mr-2">
                <v-icon small style="color: #e3fff6"
                  >mdi-account-multiple</v-icon
                >
              </v-list-item-icon>
              <v-list-item-content style="color: #e3fff6; font-size: 14px">
                Account Management
              </v-list-item-content>
            </v-list-item>
          </router-link>

          <router-link to="/report" style="color: #c8f0f9">
            <v-list-item>
              <v-list-item-icon class="ml-2 ma-0 mt-2 mr-2">
                <v-icon small style="color: #e3fff6">mdi-account-box</v-icon>
              </v-list-item-icon>
              <v-list-item-content style="color: #e3fff6; font-size: 14px">
                Report
              </v-list-item-content>
            </v-list-item>
          </router-link>
        </v-list-item-group>
      </v-list>
      <template v-slot:append>
        <div class="pa-2 ma-2 d-flex flex-row-reverse">
          <v-btn
            depressed
            small
            rounded
            color="blue-grey darken-3"
            style="color: #daf5fb; font-size: 12px"
          >
            Logout
            <v-icon right small> mdi-logout </v-icon>
          </v-btn>
        </div>
      </template>
    </v-navigation-drawer>
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
  color: #e3fff6;
}
a {
  text-decoration: none;
}
>>>.v-list-item__icon.v-list-group__header__append-icon{
  margin-left: 0px !important;
}
.not-rounded{
  border-radius: 0px !important;
}
</style>
