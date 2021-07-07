<template>
    <v-navigation-drawer
      color="#13b150"
      permanent
      v-model="drawer"
      width="260"
      app
    >
      <v-list-item class="pb-1">
        <v-list-item-content class="mt-2 ml-2">
          <v-list-item-title style="font-size: 20px" class="title white--text">
            AOSMEC Square
          </v-list-item-title>
          <v-list-item-subtitle style="color: #e3fff6">Booking System</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <v-divider></v-divider>

    <v-list dense nav class="px-0 mx-0">
      <v-list-item-group>
        <!-- Admin and Front Desk-->
        <router-link to="/dashboard" style="color: #c8f0f9" v-if="this.$store.state.status >= 1">
          <v-list-item color="black">
            <v-list-item-icon class="ml-4 ma-0 mt-2 mr-2">
              <v-icon small style="color: #e3fff6">mdi-view-dashboard</v-icon>
            </v-list-item-icon>
            <v-list-item-content style="color: #e3fff6">
              Dashboard
            </v-list-item-content>
          </v-list-item>
        </router-link>

          <!-- Admin-->
          <v-list-group color="black" v-if="this.$store.state.status == 1">
            <template v-slot:activator>
                <v-list-item-icon class="ma-0 ml-2 mt-2 mr-2 pl-2 pr-2">
                  <v-icon small style="color: #e3fff6"
                    >mdi-calendar-clock</v-icon
                  >
                </v-list-item-icon>
                <v-list-item-content style="color: #e3fff6">
                  Bookings
                </v-list-item-content>
            </template>

            <router-link to="/reservation" style="color: #daf5fb">
              <v-list-item color="black">
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
              <v-list-item color="black">
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

          <!-- Front Desk -->
          <router-link to="/reservation" style="color: #daf5fb" v-if="this.$store.state.status > 1">
              <v-list-item color="black">
                <v-list-item-icon class="ml-4 ma-0 mt-2 mr-2">
                  <v-icon small style="color: #e3fff6"
                    >mdi-calendar-check</v-icon
                  >
                </v-list-item-icon>
                <v-list-item-content style="color: #e3fff6" class="list-item">
                  Reservation
                </v-list-item-content>
              </v-list-item>
            </router-link>

            <router-link to="/checkin" style="color: #daf5fb" v-if="this.$store.state.status > 1">
              <v-list-item color="black">
                <v-list-item-icon class="ml-4 ma-0 mt-2 mr-2">
                  <v-icon small style="color: #e3fff6"
                    >mdi-account-check</v-icon
                  >
                </v-list-item-icon>
                <v-list-item-content style="color: #e3fff6" class="list-item">
                  Check In
                </v-list-item-content>
              </v-list-item>
            </router-link>

        <!-- Admin and Front Desk-->
        <router-link to="/guests" style="color: #c8f0f9" v-if="this.$store.state.status == 1 || 2">
          <v-list-item color="black">
            <v-list-item-icon class="ml-4 ma-0 mt-2 mr-2">
              <v-icon small style="color: #e3fff6">mdi-account-outline</v-icon>
            </v-list-item-icon>
            <v-list-item-content style="color: #e3fff6">
              Guests
            </v-list-item-content>
          </v-list-item>
        </router-link>

        <!-- Admin -->
        <v-list-group color="black" v-if="this.$store.state.status == 1">
            <template v-slot:activator >
              <v-list-item to="/room-mgmt/all" color="black">
                <v-list-item-icon class="ma-0 ml-2 mt-2 mr-2">
                  <v-icon small style="color: #e3fff6"
                    >mdi-bed</v-icon
                  >
                </v-list-item-icon>
                <v-list-item-content style="color: #e3fff6; font-size: 15px;">
                  Room Management
                </v-list-item-content>
              </v-list-item>
            </template>

            <router-link to="/room-mgmt/floor-1" style="color: #daf5fb">
              <v-list-item color="black">
                <v-list-item-icon class="ml-10 ma-0 mt-2">
                  <v-icon small style="color: #e3fff6"
                    >mdi-floor-plan</v-icon
                  >
                </v-list-item-icon>
                <v-list-item-content style="color: #e3fff6" class="list-item">
                  Floor 1
                </v-list-item-content>
              </v-list-item>
            </router-link>

            <router-link to="/room-mgmt/floor-2" style="color: #daf5fb">
              <v-list-item color="black">
                <v-list-item-icon class="ml-10 ma-0 mt-2">
                  <v-icon small style="color: #e3fff6"
                    >mdi-floor-plan</v-icon
                  >
                </v-list-item-icon>
                <v-list-item-content style="color: #e3fff6" class="list-item">
                  Floor 2
                </v-list-item-content>
              </v-list-item>
            </router-link>
            <router-link to="/room-mgmt/floor-3" style="color: #daf5fb">
              <v-list-item color="black">
                <v-list-item-icon class="ml-10 ma-0 mt-2">
                  <v-icon small style="color: #e3fff6"
                    >mdi-floor-plan</v-icon
                  >
                </v-list-item-icon>
                <v-list-item-content style="color: #e3fff6" class="list-item">
                  Floor 3
                </v-list-item-content>
              </v-list-item>
            </router-link>
          </v-list-group>

        <!-- Front Desk -->
            <router-link to="/room-mgmt/floor-1" style="color: #daf5fb" v-if="this.$store.state.status > 1">
              <v-list-item color="black">
                <v-list-item-icon class="ml-4 ma-0 mt-2 mr-2">
                  <v-icon small style="color: #e3fff6"
                    >mdi-floor-plan</v-icon
                  >
                </v-list-item-icon>
                <v-list-item-content style="color: #e3fff6" class="list-item">
                  Floor 1
                </v-list-item-content>
              </v-list-item>
            </router-link>

            <router-link to="/room-mgmt/floor-2" style="color: #daf5fb" v-if="this.$store.state.status > 1">
              <v-list-item color="black">
                <v-list-item-icon class="ml-4 ma-0 mt-2 mr-2">
                  <v-icon small style="color: #e3fff6"
                    >mdi-floor-plan</v-icon
                  >
                </v-list-item-icon>
                <v-list-item-content style="color: #e3fff6" class="list-item">
                  Floor 2
                </v-list-item-content>
              </v-list-item>
            </router-link>
            <router-link to="/room-mgmt/floor-3" style="color: #daf5fb" v-if="this.$store.state.status > 1">
              <v-list-item color="black">
                <v-list-item-icon class="ml-4 ma-0 mt-2 mr-2">
                  <v-icon small style="color: #e3fff6"
                    >mdi-floor-plan</v-icon
                  >
                </v-list-item-icon>
                <v-list-item-content style="color: #e3fff6" class="list-item">
                  Floor 3
                </v-list-item-content>
              </v-list-item>
            </router-link>


        <router-link to="/service-mgmt" style="color: #c8f0f9" v-if="this.$store.state.status == 1">
          <v-list-item color="black">
            <v-list-item-icon class="ml-4 ma-0 mt-2 mr-2">
              <v-icon small style="color: #e3fff6">mdi-face-agent</v-icon>
            </v-list-item-icon>
            <v-list-item-content style="color: #e3fff6">
              Service Management
            </v-list-item-content>
          </v-list-item>
        </router-link>

        <!-- Admin -->
        <router-link to="/account-mgmt" style="color: #c8f0f9" v-if="this.$store.state.status == 1">
          <v-list-item color="black">
            <v-list-item-icon class="ml-4 ma-0 mt-2 mr-2">
              <v-icon small style="color: #e3fff6">mdi-account-multiple</v-icon>
            </v-list-item-icon>
            <v-list-item-content style="color: #e3fff6">
              Account Management
            </v-list-item-content>
          </v-list-item>
        </router-link>
        
        <!-- Admin -->
        <router-link to="/report" style="color: #c8f0f9" v-if="this.$store.state.status == 1">
          <v-list-item color="black">
            <v-list-item-icon class="ml-4 ma-0 mt-2 mr-2">
              <v-icon small style="color: #e3fff6">mdi-account-box</v-icon>
            </v-list-item-icon>
            <v-list-item-content style="color: #e3fff6">
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
          color="#13b150"
          style="color: white; font-size: 12px"
          @click="logout()"
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
  methods: {
    logout() {
      this.$store.state.status = 0
      localStorage.status = 0
      this.$router.push('/login');
    }
  },
  mounted() {
    if(localStorage.status){
      this.$store.state.status = localStorage.status
    }
    console.log(localStorage.status)
  }
};
</script>

<style scoped>
.list-item {
  font-size: 15px;
}
a {
  text-decoration: none;
}
>>> .v-list-item__icon.v-list-group__header__append-icon {
  margin-left: 0px !important;
}
/* >>>.v-list-item.v-item--active.v-list-item--active.v-list-item--link{
  color: white !important;
  background: #0f2e23 !important; 
  background: #068a41e5 !important; 
  background: #0B632D !important; 
} */
.not-rounded{
  border-radius: 0px !important;
}
</style>
