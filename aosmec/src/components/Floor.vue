<template>
  <div class="dashboard">
    <v-container class="mt-10">
      <v-toolbar class="ml-0 mb-4" flat color="grey lighten-2">
        <v-toolbar-title>
          <h5 class="font-weight-medium pa-0 ma-0 pt-3" style="color: green">
            <v-icon x-large left color="success" style="margin-bottom: 12px"
              >mdi-home-floor-3</v-icon
            >
            ROOMS ON FLOOR 3
          </h5>
        </v-toolbar-title>
        <v-spacer></v-spacer>
      </v-toolbar>
      <v-data-table
        dense
        :headers="headers"
        :items="rooms"
        :items-per-page="10"
      >
        <template v-slot:item.name="{ item }"> 
          <div class="text-center">
            <v-dialog
              v-model="dialog"
              width="500"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  color="success"
                  dark
                  v-bind="attrs"
                  v-on="guestDetails"
                >
                  {{ item.name }}
                </v-btn>
              </template>

              <v-card>
                <v-card-title class="headline grey lighten-2">
                  {{ item.name }}
                </v-card-title>

                <v-card-text class="mt-3">
                  Details
                </v-card-text>

                <v-divider></v-divider>

                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn
                    color="success"
                    text
                    @click="dialog = false"
                  >
                    Done
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </div>
        </template>

        <template v-slot:item.status="{ item }">
          <v-row align="center" justify="center" class="ma-2">
          <v-col
            class="d-flex"
            cols="12"
            sm="6"
          >
            <v-select
              :items="item.status"
              label="Status"
              dense
            >
            </v-select>
          </v-col>
          </v-row>
        </template>

        <template v-slot:item.checkout="{ item }">
          <v-btn color="success" @click="checkout(item)" class="ma-3">Check Out</v-btn>
        </template>
      </v-data-table>
    </v-container>
  </div>
</template>

<script>
export default {
  name: "Floor-child",
  components: {},
  data() {
    return {
      dialog: false,
      headers: [
        {
          text: "Room No.",
          value: "roomNo",
          class: "green lighten-1 | px-4 pt-4 pb-3 | text-uppercase",
          sortable: true,
          align: 'center'
        },
        {
          text: "Occupancy",
          value: "name",
          class: "green lighten-1 | px-4 pt-4 pb-3 | text-uppercase",
          sortable: true,
          align: 'center'
        },
        {
          text: "Type of Room",
          value: "roomType",
          class: "green lighten-1 | px-4 pt-4 pb-3 | text-uppercase",
          sortable: false,
          align: 'center'
        },
        {
          text: "Status",
          value: "status",
          class: "green lighten-1 | px-4 pt-4 pb-3 | text-uppercase",
          sortable: false,
          align: 'center'
        },
        {
          text: "Check-out",
          value: "checkout",
          class: "green lighten-1 | px-4 pt-4 pb-3 | text-uppercase",
          sortable: false,
          align: 'center'
        },
      ],
      rooms: [
        {
          roomNo: "307",
          name: "Kim Taehyung",
          roomType: "double",
          status: "xxx",
        },
        {
          roomNo: "302",
          name: "Kim Taehyung",
          roomType: "double",
          status: "xxx",
        },
        {
          roomNo: "303",
          name: "Kim Taehyung",
          roomType: "double",
          status: "xxx",
        },
      ],
    };
  },
};
</script>

<style scoped>
</style>
