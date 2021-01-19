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
            <!-- <v-dialog
              width="500"
            > -->
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  color="success"
                  dark
                  v-bind="attrs"
                  v-on="on"
                >
                  {{ item.name }}
                </v-btn>
              </template>

              <v-card>
                <v-card-title class="headline grey lighten-2">
                  {{ item.name }}
                </v-card-title>

                <v-card-text class="mt-3">
                  {{item.guestDetails}}
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

        <template v-slot:item.checkout="{item}">
          <v-btn color="success" v-on:click="checkOutDetails(item)" class="ma-3">Check Out</v-btn>

          <v-dialog v-model="checkOutDialog" persistent width="450">
            <v-card>
              <v-card-title class="headline grey lighten-2">
                 Checking Out Details
              </v-card-title>
              <v-card-text class="mt-3">
                 <p>Key Deposit: </p>
                 <p>Pending Balance: </p>
                 <p>Room Situation: </p>
                 <v-row>
                   <v-col cols="11">
                    <v-text-field
                        v-model="roomSituation"
                        color="green"
                      >
                        <template v-slot:label>
                          <div>
                            state the changes in the room <small>(optional)</small>
                          </div>
                        </template>
                      </v-text-field>
                   </v-col>
                   <v-col cols="1" class="pa-0 mt-7" >
                      <v-btn icon small v-on:click="addToList(addToService)">
                        <v-icon color="green lighten-2">mdi-plus-circle</v-icon>
                      </v-btn>
                    </v-col>
                  </v-row>
              </v-card-text>
              <v-divider></v-divider>
              <v-card-actions class="d-flex justify-center pb-6">
                <v-btn
                  class="px-5"
                  v-on:click="checkOutDialog = false"
                >
                  Cancel
                </v-btn>
                <v-btn
                  color="red white--text"
                  class="px-5"
                  v-on:click="checkOut()"
                >
                  Check Out
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>

        </template>
      </v-data-table>
    </v-container>
  </div>
</template>

<script>
export default {
  name: "Floor-1",
  components: {},
  data() {
    return {
      dialog: false,
      checkOutDialog: false,
      roomSituation: "",
      index: -1,
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
          roomNo: "200",
          name: "Kim Taehyung",
          guestDetails: "blahblah",
          roomType: "double",
          status: [
            {text: "clean"},
            {text: "dirty"},
            {text: "out of order"}
          ]
        },
        {
          roomNo: "201",
          name: "Kim Taehyung",
          guestDetails: "blahblah",
          roomType: "single",
          status: [
            {text: "clean"},
            {text: "dirty"},
            {text: "out of order"}
          ]
        },
        {
          roomNo: "202",
          name: "Kim Taehyung",
          guestDetails: "blahblah",
          roomType: "family room",
          status: [
            {text: "clean"},
            {text: "dirty"},
            {text: "out of order"}
          ]
        }
      ]
    };
  },
  methods: {
    checkOutDetails: function(item) {
      this.checkOutDialog = true;
      this.index = this.rooms.indexOf(item)
    },
    checkOut: function() {
      this.checkOutDialog = false
      this.rooms.splice(this.index, 1)
    }
  }
};
</script>

<style scoped>
</style>
