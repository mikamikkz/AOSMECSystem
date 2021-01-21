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
              <h4 class="text-truncate text-uppercase">Total Revenue</h4>
              <h1>53</h1>
            </div>
          </v-card>
        </v-col>

        <v-col cols="12" md="6" class="pb-2">
          <v-card class="dark bordered" height="167px">
            <div class="col pa-3 py-4 green--text">
              <h4 class="text-truncate text-uppercase">Room Status</h4>
            </div>
            <v-card-text class="green--text pa-0">
              <v-row class="roomStatusRow">
                <v-col class="roomStatusCol">
                  <v-icon left color="success" style="margin-bottom: 12px">mdi-sparkles</v-icon>
                  <span class="roomStatusData">Clean: <span>53</span></span>
                </v-col>
                <v-col class="roomStatusCol">
                  <v-icon left color="success" style="margin-bottom: 12px">mdi-account-multiple-check</v-icon>
                  <span class="roomStatusData">Occupied: <span>53</span></span>
                </v-col>
              </v-row>
              <v-row class="roomStatusRow">
                <v-col class="roomStatusCol">
                  <v-icon left color="success" style="margin-bottom: 12px">mdi-broom</v-icon>
                  <span class="roomStatusData">Dirty: <span>53</span></span>
                  
                </v-col>
                <v-col class="roomStatusCol">
                  <v-icon left color="success" style="margin-bottom: 12px">mdi-account-remove</v-icon>
                  <span class="roomStatusData">Vacant: <span>53</span></span>
                </v-col>
              </v-row>
              <v-row class="roomStatusRow">
                <v-col class="roomStatusCol">
                  <v-icon left color="success" style="margin-bottom: 12px">mdi-tools</v-icon>
                  <span class="roomStatusData">Out-of-Order: <span>53</span></span>
                </v-col>
              </v-row>
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

      <v-data-table class="mt-4" dense :headers="headers" :items="guests" :items-per-page="5"></v-data-table>

      <v-toolbar class="ml-0 mb-0 mt-10" flat color="grey lighten-2">
        <v-toolbar-title>
          <h5 class="font-weight-medium pa-0 ma-0 pt-3" style="color: green">
            <v-icon x-large left color="success" style="margin-bottom: 12px">mdi-account-multiple-minus</v-icon>
            Guests scheduled to checkout today
          </h5>
        </v-toolbar-title>
        <v-spacer></v-spacer>
      </v-toolbar>

      <template>
        <v-simple-table>
          <template v-slot:default>
            <thead>
              <tr>
                <th class="text-left">
                  Name
                </th>
                <th class="text-left">
                  Room No
                </th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="item in guests"
                :key="item.name"
              >
                <td v-if="item.checkOutDate == today()">{{ item.name }}</td>
                <td v-if="item.checkOutDate == today()">{{ item.roomNo }}</td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
      </template>

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
          roomNo: 100,
          checkOutDate: "01/21/2021"
        },
        {
          confNo: "111-000",
          name: "Kim Namjoon",
          resType: "Agoda",
          roomType: "single",
          service: "xxx",
          days: 10,
          roomNo: 200,
          checkOutDate: "02/14/2021"
        },
        {
          confNo: "000-333",
          name: "Jeon Jungkook",
          resType: "Agoda",
          roomType: "family room",
          service: "xxx",
          days: 2,
          roomNo: 101,
          checkOutDate: "01/21/2021"
        },
        {
          confNo: "222-000",
          name: "Park Jimin",
          resType: "Agoda",
          roomType: "single",
          service: "xxx",
          days: 6,
          roomNo: 300,
          checkOutDate: "03/21/2021"
        },
        {
          confNo: "111-111",
          name: "Min Yoongi",
          resType: "Booking.com",
          roomType: "double",
          service: "xxx",
          days: 3,
          roomNo: 112,
          checkOutDate: "10/21/2021"
        },
        {
          confNo: "444-000",
          name: "Kim Seokjin",
          resType: "Booking.com",
          roomType: "double",
          service: "xxx",
          days: 7,
          roomNo: 107,
          checkOutDate: "01/30/2021"
        },
        {
          confNo: "000-111",
          name: "Jung Hoseok",
          resType: "Booking.com",
          roomType: "family room",
          service: "xxx",
          days: 3,
          roomNo: 113,
          checkOutDate: "01/27/2021"
        },
        {
          confNo: "100-001",
          name: "Park Seojoon",
          resType: "Booking.com",
          roomType: "double",
          service: "xxx",
          days: 5,
          roomNo: 105,
          checkOutDate: "01/22/2021"
        },
        {
          confNo: "444-440",
          name: "Kim Jennie",
          resType: "Booking.com",
          roomType: "double",
          service: "xxx",
          days: 4,
          roomNo: 104,
          checkOutDate: "03/21/2021"
        },
        {
          confNo: "500-500",
          name: "Kim Seulgi",
          resType: "Agoda",
          roomType: "single",
          service: "xxx",
          days: 5,
          roomNo: 205,
          checkOutDate: "02/21/2021"
        },
      ],
    };
  },
  methods: {
    today: function () {
      var today = new Date();
      var dd = String(today.getDate()).padStart(2, "0");
      var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
      var yyyy = today.getFullYear();

      return this.date = mm + "/" + dd + "/" + yyyy;
    },
  },
  mounted() {
    this.today();
  },
};
</script>

<style scoped>
.theme--light .bordered {
  border-left: 8px solid green !important;
}
.roomStatusData {
  font-size: large;
}
.roomStatusRow {
  margin: 0;
}
.roomStatusCol {
  padding-top: 0;
  padding-bottom: 0;
}
</style>
