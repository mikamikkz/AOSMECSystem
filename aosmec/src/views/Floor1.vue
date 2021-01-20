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
      <v-data-table dense :headers="headers" :items="rooms" item-key="roomNo">
        <template v-slot:item.name="props">
          <td>
            <v-dialog v-model="dialog[props.item.roomNo]" width="500">
              <template v-slot:activator="{ on, attrs }">
                <v-btn color="success" dark v-bind="attrs" v-on="on">
                  {{ props.item.name }}
                </v-btn>
              </template>

              <v-card>
                <v-card-title class="headline grey lighten-2">
                  {{ props.item.name }}
                </v-card-title>

                <v-card-text class="mt-3">
                  {{ props.item.guestDetails }}
                </v-card-text>
              </v-card>
            </v-dialog>
          </td>
        </template>

        <template v-slot:item.status="{ item }">
          <v-row align="center" justify="center" class="ma-2">
            <v-col class="d-flex" cols="12" sm="6">
              <v-select :items="item.status" label="Status" dense> </v-select>
            </v-col>
          </v-row>
        </template>

        <template v-slot:item.checkout="props">
          <v-btn class="mx-2" color="success" @click="showDialog(props.item)">
            <v-icon dark>mdi-account-arrow-left-outline</v-icon>
            <span class="ml-1 mr-1"> Check Out </span>
          </v-btn>
        </template>
      </v-data-table>

      <v-dialog v-model="show" width="450">
        <v-card>
          <v-card-title class="headline grey lighten-2">
            Checking Out Details
          </v-card-title>
          <v-card-text class="mt-3">
            <v-row class="mt-2">
              <v-col cols="5">
                <p>Key Deposit:</p>
              </v-col>
              <v-col cols="7" class="ma-0 py-2">
                <v-checkbox
                  color="success"
                  class="mt-1 mb-0 pa-0"
                  label="Php 200.00"
                ></v-checkbox>
              </v-col>
            </v-row>
            <p>Pending Balance: <span class="ml-10 pl-7">Php 00.00</span></p>
            <p>Room Situation:</p>
            <v-row>
              <v-col cols="11">
                <v-text-field v-model="roomSituation" color="green">
                  <template v-slot:label>
                    <div>
                      state the changes in the room
                      <small>(optional)</small>
                    </div>
                  </template>
                </v-text-field>
              </v-col>
              <v-col cols="1" class="pa-0 mt-7">
                <v-btn icon small v-on:click="addToList(addToService)">
                  <v-icon color="green lighten-2">mdi-plus-circle</v-icon>
                </v-btn>
              </v-col>
            </v-row>
          </v-card-text>
          <v-divider></v-divider>
          <v-card-actions class="d-flex justify-center pb-6">
            <v-btn class="px-5" v-on:click="checkOutClose()"> Cancel </v-btn>
            <v-btn color="red white--text" class="px-5" v-on:click="checkOut()">
              Check Out
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-container>
  </div>
</template>

<script>
export default {
  name: "Floor-1",
  components: {},
  data() {
    return {
      show: false,
      currentDialogItem: {},
      dialog: {},
      roomSituation: "",
      index: -1,
      closeDialog: false,
      headers: [
        {
          text: "Room No.",
          value: "roomNo",
          class: "green lighten-1 | px-4 pt-4 pb-3 | text-uppercase",
          sortable: true,
          align: "center",
        },
        {
          text: "Occupancy",
          value: "name",
          class: "green lighten-1 | px-4 pt-4 pb-3 | text-uppercase",
          sortable: true,
          align: "center",
        },
        {
          text: "Type of Room",
          value: "roomType",
          class: "green lighten-1 | px-4 pt-4 pb-3 | text-uppercase",
          sortable: false,
          align: "center",
        },
        {
          text: "Status",
          value: "status",
          class: "green lighten-1 | px-4 pt-4 pb-3 | text-uppercase",
          sortable: false,
          align: "center",
        },
        {
          text: "Check-out",
          value: "checkout",
          class: "green lighten-1 | px-4 pt-4 pb-3 | text-uppercase",
          sortable: false,
          align: "center",
        },
      ],
      rooms: [
        {
          roomNo: "100",
          name: "Kim Taehyung",
          guestDetails: "blahblah",
          roomType: "single",
          status: [
            { text: "clean" },
            { text: "dirty" },
            { text: "out of order" },
          ],
        },
        {
          roomNo: "101",
          name: "Kim Taehyung",
          guestDetails: "blahblah",
          roomType: "double",
          status: [
            { text: "clean" },
            { text: "dirty" },
            { text: "out of order" },
          ],
        },
        {
          roomNo: "102",
          name: "Kim Taehyung",
          guestDetails: "blahblah",
          roomType: "double",
          status: [
            { text: "clean" },
            { text: "dirty" },
            { text: "out of order" },
          ],
        },
        {
          roomNo: "103",
          name: "Kim Taehyung",
          guestDetails: "blahblah",
          roomType: "double",
          status: [
            { text: "clean" },
            { text: "dirty" },
            { text: "out of order" },
          ],
        },
        {
          roomNo: "104",
          name: "Kim Taehyung",
          guestDetails: "blahblah",
          roomType: "double",
          status: [
            { text: "clean" },
            { text: "dirty" },
            { text: "out of order" },
          ],
        },
      ],
    };
  },
  methods: {
    checkOut: function () {
      this.show = false;
      let item = this.currentDialogItem
      this.index = this.rooms.indexOf(item);
      this.currentDialogItem = {};
      this.rooms.splice(this.index, 1);
    },
    checkOutClose: function () {
      this.show = false;
    },
    showDialog(item) {
      this.show = true;
      this.currentDialogItem = item;
    },
  },
};
</script>

<style scoped>
</style>
