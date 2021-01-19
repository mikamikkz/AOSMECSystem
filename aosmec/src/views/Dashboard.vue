<template>
  <div class="dashboard">
    <v-container class="mt-10">
      <v-card outlined shaped tile color="green" class="mb-10" width="200px">
        <v-card-text class="pa-3">
          <p class="font-weight-medium mb-0" style="color: white">
            Date: <span>{{ date }}</span>
          </p>
        </v-card-text>
      </v-card>

      <v-row>
        <v-col lg="4" cols="sm" class="pb-2">
          <v-card class="bordered" height="167px">
            <div class="col pa-3 py-4 green--text">
              <h4 class="text-truncate text-uppercase">Daily Sales</h4>
              <h1>53</h1>
            </div>
          </v-card>
        </v-col>

        <v-col cols="12" md="6" class="pb-2">
          <v-card class="dark bordered">
            <div class="col pa-3 py-4 green--text">
              <h4 class="text-truncate text-uppercase">Reservation Type</h4>
            </div>
            <v-card-text>
              <v-carousel
                cycle
                height="80"
                interval="2000"
                hide-delimiter-background
                show-arrows-on-hover
              >
                <v-carousel-item>
                  <div class="row no-gutters">
                    <div class="col">
                      <div>
                        <h1 class="text-center green--text">1. Agoda</h1>
                      </div>
                    </div>
                  </div>
                </v-carousel-item>
                <v-carousel-item>
                  <div class="row no-gutters">
                    <div class="col">
                      <div>
                        <h1 class="text-center green--text">2. Booking.com</h1>
                      </div>
                    </div>
                  </div>
                </v-carousel-item>
              </v-carousel>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>

      <v-toolbar class="ml-0 mb-0 mt-10" flat color="grey lighten-2">
        <v-toolbar-title>
          <h5 class="font-weight-medium pa-0 ma-0 pt-3" style="color: green">
            <v-icon x-large left color="success" style="margin-bottom: 12px"
              >mdi-account-group</v-icon
            >
            Guests arriving today
          </h5>
        </v-toolbar-title>
        <v-spacer></v-spacer>
      </v-toolbar>

      <v-data-table
        class="mt-4"
        dense
        :headers="headers"
        :items="guests"
        :items-per-page="5"
      ></v-data-table>
    </v-container>
  </div>
</template>

<script>
export default {
  name: "Dashboard",
  components: {},
  data() {
    return {
      date: "",
      headers: [
        {
          text: "Confirmation No.",
          value: "confNo",
          class: "green lighten-1 | px-4 pt-4 pb-3 | text-uppercase",
          sortable: true,
        },
        {
          text: "Guests",
          value: "name",
          class: "green lighten-1 | px-4 pt-4 pb-3 | text-uppercase",
          sortable: true,
        },
        {
          text: "Reservation Type",
          value: "resType",
          class: "green lighten-1 | px-4 pt-4 pb-3 | text-uppercase",
          sortable: false,
        },
        {
          text: "Type of Room",
          value: "roomType",
          class: "green lighten-1 | px-4 pt-4 pb-3 | text-uppercase",
          sortable: false,
        },
        {
          text: "Additional Service",
          value: "service",
          class: "green lighten-1 | px-4 pt-4 pb-3 | text-uppercase",
          sortable: false,
        },
        {
          text: "No of Days",
          value: "days",
          class: "green lighten-1 | px-4 pt-4 pb-3 | text-uppercase",
          sortable: false,
        },
      ],
      guests: [
        {
          confNo: "000-000",
          name: "Kim Taehyung",
          resType: "Agoda",
          roomType: "single",
          service: "xxx",
          days: 6,
        },
        {
          confNo: "111-000",
          name: "Kim Namjoon",
          resType: "Agoda",
          roomType: "single",
          service: "xxx",
          days: 10,
        },
        {
          confNo: "000-333",
          name: "Jeon Jungkook",
          resType: "Agoda",
          roomType: "family room",
          service: "xxx",
          days: 2,
        },
        {
          confNo: "222-000",
          name: "Park Jimin",
          resType: "Agoda",
          roomType: "single",
          service: "xxx",
          days: 6,
        },
        {
          confNo: "111-111",
          name: "Min Yoongi",
          resType: "Booking.com",
          roomType: "double",
          service: "xxx",
          days: 3,
        },
        {
          confNo: "444-000",
          name: "Kim Seokjin",
          resType: "Booking.com",
          roomType: "double",
          service: "xxx",
          days: 7,
        },
        {
          confNo: "000-111",
          name: "Jung Hoseok",
          resType: "Booking.com",
          roomType: "family room",
          service: "xxx",
          days: 3,
        },
        {
          confNo: "100-001",
          name: "Park Seojoon",
          resType: "Booking.com",
          roomType: "double",
          service: "xxx",
          days: 5,
        },
        {
          confNo: "444-440",
          name: "Kim Jennie",
          resType: "Booking.com",
          roomType: "double",
          service: "xxx",
          days: 4,
        },
        {
          confNo: "500-500",
          name: "Kim Seulgi",
          resType: "Agoda",
          roomType: "single",
          service: "xxx",
          days: 5,
        },
      ],
    };
  },
  methods: {
    date_function: function () {
      var today = new Date();
      var dd = String(today.getDate()).padStart(2, "0");
      var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
      var yyyy = today.getFullYear();

      this.date = mm + "/" + dd + "/" + yyyy;
    },
  },
  mounted() {
    this.date_function();
  },
};
</script>

<style scoped>
.theme--light .bordered {
  border-left: 8px solid green !important;
}
</style>
