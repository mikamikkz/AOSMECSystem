<template>
  <div class="dashboard">
    <v-container class="mt-10">
      <v-toolbar class="ml-0 mb-4" flat color="grey lighten-2">
        <v-toolbar-title>
          <h5 class="font-weight-medium pa-0 ma-0 pt-3" style="color: green">
            <v-icon x-large left color="success" style="margin-bottom: 12px"
              >mdi-home-floor-2</v-icon
            >
            ROOMS ON FLOOR 2
          </h5>
        </v-toolbar-title>
        <v-spacer></v-spacer>
      </v-toolbar>
      <v-data-table dense :headers="headers" :items="rooms" item-key="roomNo">
        <template v-slot:item.name="props">
          <td>
            <v-dialog v-model="dialog[props.item.roomNo]" width="500">
              <template v-slot:activator="{ on, attrs }">
                <v-btn color="success" depressed dark v-bind="attrs" v-on="on">
                  {{ props.item.name }}
                </v-btn>
              </template>

              <v-card>
                <v-card-title class="headline green lighten-2">
                  {{ props.item.name }}
                </v-card-title>

                <v-card-text class="mt-3">
                  {{ props.item.guestDetails }}
                </v-card-text>
              </v-card>
            </v-dialog>
          </td>
        </template>

        <template v-slot:item.status="props">
          <v-row align="center" justify="center" class="ma-2">
            <v-col class="d-flex" cols="12" sm="6">
              <v-select
                v-model="props.item.status"
                :items="status"
                label="Status"
                dense
              >
              </v-select>
            </v-col>
          </v-row>
        </template>

        <template v-slot:item.checkout="props">
          <!-- checkout -->
          <v-btn class="mx-2" color="error" fab depressed small @click="showCheckOutDialog(props.item)">
            <v-icon small dark>mdi-door-open</v-icon>
          </v-btn>
          <!-- payment -->
          <v-btn class="mx-2" color="primary" fab depressed small @click="showPaymentDialog(props.item)">
            <v-icon small dark>mdi-cash-multiple</v-icon>
          </v-btn>
          <!-- add service -->
          <v-btn class="mx-2" color="warning" fab depressed small @click="showAddServiceDialog(props.item)">
            <v-icon small dark>mdi-plus-box-multiple</v-icon>
          </v-btn>
        </template>
      </v-data-table>

      <!-- checkout dialog -->
      <v-dialog v-model="showCheckOut" width="500">
        <v-card>
          <v-card-title class="headline green lighten-2">
            Checking Out Details
          </v-card-title>
          <v-card-text class="mt-3">

            <v-simple-table dense class=" pa-2 mb-3">
              <template v-slot:default>
                <thead>
                  <tr>
                    <th class="text-left pa-0 pl-10">Payment Details</th>
                    <th class="text-left pl-0 pr-0">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td class="pa-0"></td>
                    <td class="pr-1 pl-0">Php </td>
                  </tr>
                </tbody>
              </template>
            </v-simple-table>

            <v-row>
              <v-col cols="5">
                <p>Pending Balance:</p>
              </v-col>
              <v-col cols="7">
                <p>Php</p>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="5">
                <p>Key Deposit:</p>
              </v-col>
              <v-col cols="7">
                <v-checkbox color="success" class="mt-0 mb-0 pa-0" label="Php 200.00"></v-checkbox>
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

      <!-- payment dialog -->
      <v-dialog v-model="showPayment" width="500">
        <v-card>
          <v-card-title class="headline green lighten-2">
            Payment
          </v-card-title>
          <v-card-text class="mt-3">
            
            <v-simple-table dense class=" pa-2 mb-3">
              <template v-slot:default>
                <thead>
                  <tr>
                    <th class="text-left pa-0 pl-10">Payment Details</th>
                    <th class="text-left pl-0 pr-0">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td class="pa-0"></td>
                    <td class="pr-1 pl-0">Php </td>
                  </tr>
                </tbody>
              </template>
            </v-simple-table>

            <v-row>
              <v-col cols="5">
                <p>Pending Balance:</p>
              </v-col>
              <v-col cols="7">
                <p>Php</p>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="5">
                <p>Amount to Pay:</p>
              </v-col>
              <v-col cols="7" class="pa-0">
                <v-text-field class="pt-0 pl-3" value="" prefix="Php" v-model="payment"></v-text-field>
              </v-col>
            </v-row>

          </v-card-text>
          <v-divider></v-divider>
          <v-card-actions class="d-flex justify-center pb-6">
            <v-btn class="px-5" v-on:click="paymentClose()"> Cancel </v-btn>
            <v-btn color="green white--text" class="px-5" v-on:click="paid()">
              Paid
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <!-- add service dialog -->
      <v-dialog v-model="showAddService" width="500">
        <v-card>
          <v-card-title class="headline green lighten-2">
            Services
          </v-card-title>
          <v-card-text class="mt-3">
            
            <v-simple-table fixed-header height="270px">
              <template v-slot:default>
                <thead>
                  <tr>
                    <th class="text-left pl-1">Name</th>
                    <th class="text-left">Rate</th>
                    <th class="text-left">Qty</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="service in services" :key="service.name">
                    <td class="pl-1">{{ service.name }}</td>
                    <td>{{ service.rate }}</td>
                    <td>{{ service.quantity }}</td>
                  </tr>
                </tbody>
              </template>
            </v-simple-table>
            <v-row class="mt-2">
              <v-col lg="1" md="1" sm="12" d-flex class="mr-1">
                <v-btn icon small class="mt-2">
                  <v-icon color="green lighten-2">mdi-plus-circle</v-icon>
                </v-btn>
              </v-col>
              <v-col lg="7" md="" sm="12" d-flex class="pr-1">
                <v-select
                  dense
                  outlined
                ></v-select>
              </v-col>
              <v-col lg="3" md="3" sm="12" d-flex class="pl-1">
                <v-text-field
                  label="Qty"
                  dense
                  outlined
                  type="number"
                ></v-text-field>
              </v-col>
            </v-row>

          </v-card-text>
          <v-divider></v-divider>
          <v-card-actions class="d-flex justify-center pb-6">
            <v-btn class="px-5" v-on:click="addServiceClose()"> Cancel </v-btn>
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
      // dialogs
      showCheckOut: false,
      showPayment: false,
      showAddService: false,
      currentDialogItem: {},
      dialog: {},
      closeDialog: false,
      // 
      payment: "",
      index: -1,
      status: [ "clean", "dirty", "out of order"],
      // main table
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
          roomNo: "200",
          name: "Kim Taehyung",
          guestDetails: "blahblah",
          roomType: "single",
          status: "clean"
        },
        {
          roomNo: "201",
          name: "Kim Taehyung",
          guestDetails: "blahblah",
          roomType: "double",
          status: "clean"
        },
      ],
      // rules
      numberRules: [
        v => v.length > 0 || 'This field may not be empty',
        v => Number.isFloat(v) || 'The value must be an float number',
        v => v > 0 || 'The value must be greater than zero'
      ],
      // services
      services: [
        {
          add: false,
          name: "Extra Bed",
          rate: "50",
          quantity: "1",
          status: true,
        },
        {
          add: true,
          name: "Airport Shuttle",
          rate: "1500",
          quantity: "2",
          status: false,
        },
      ],
    };
  },
  methods: {
    // checkout
    showCheckOutDialog(item) {
      this.showCheckOut = true;
      this.currentDialogItem = item;
    },
    checkOutClose: function () {
      this.showCheckOut = false
    },
    checkOut: function () {
      this.showCheckOut = false;
      let item = this.currentDialogItem;
      this.index = this.rooms.indexOf(item);
      this.currentDialogItem = {};
      this.rooms.splice(this.index, 1);
    },
    // payment
    showPaymentDialog(item) {
      this.showPayment = true
      this.currentDialogItem = item
    },
    paymentClose: function () {
      this.showPayment = false
    },
    paid() {
      let amount = this.payment
      console.log(amount)
      this.showPayment = false
    },
    // add service
    showAddServiceDialog() {
      this.showAddService = true
    },
    addServiceClose() {
      this.showAddService = false
    }
  }
};
</script>

<style scoped>
</style>
