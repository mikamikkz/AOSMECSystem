<template>
  <div class="dashboard">
    <v-container class="mt-10">
      <v-toolbar class="ml-0 mb-4" flat color="grey lighten-2">
        <v-toolbar-title>
          <h5 class="font-weight-medium pa-0 ma-0 pt-3" style="color: green">
            <v-icon x-large left color="success" style="margin-bottom: 12px"
              >mdi-home-floor-1</v-icon
            >
            ROOMS ON FLOOR 1
          </h5>
        </v-toolbar-title>
        <v-spacer></v-spacer>
      </v-toolbar>
      <v-data-table dense :headers="headers" :items="rooms" item-key="id">
        <template v-slot:item.name="props">
          <td>
            <v-dialog v-model="dialog[props.item.roomNo]" width="500">
              <template v-slot:activator="{ on, attrs }">
                <v-btn color="success" depressed dark v-bind="attrs" v-on="on" v-if="props.item.state === 1 ">
                  {{ props.item.name }}
                </v-btn>
              </template>

              <v-card>
                <v-card-title class="headline green lighten-2">
                  {{ props.item.name }}
                </v-card-title>

                <v-card-text class="mt-3">
                  <!-- Guest Details -->
                  <p>Gender: {{ props.item.gender }}</p>
                  <p>Country: {{ props.item.country }}</p>
                  <p>Nationality: {{ props.item.nationality }}</p>
                  <p>Address: {{ props.item.address }}</p>
                  <p>Valid ID: {{ props.item.validId }}</p>
                  <p>Valid ID Type: {{ props.item.validIdType }}</p>
                  <p>Phone Number: {{ props.item.phoneNo }}</p>
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
                v-on:click="statusChanged(props.item.status)"
              >
              </v-select>
              <!-- <v-select v-model="props.item.status">
                <v-option v-for="option in status" :key="option.id" :value="{ id: option.id, text: option.name }">
                  {{ option.name }}
                </v-option>
              </v-select> -->
            </v-col>
          </v-row>
        </template>

        <template v-slot:item.checkout="props">
          <!-- checkout -->
          <v-btn class="mx-2 mt-2" color="error" fab depressed small @click="showCheckOutDialog(props.item)"  :disabled="props.item.state !== 1 ">
            <v-icon small dark>mdi-door-open</v-icon>
          </v-btn>
          <!-- payment -->
          <v-btn class="mx-2 mt-2" color="primary" fab depressed small @click="showPaymentDialog(props.item)" :disabled="props.item.state !== 1 ">
            <v-icon small dark>mdi-cash-multiple</v-icon>
          </v-btn>
          <!-- add service -->
          <v-btn class="mx-2 mt-2" color="warning" fab depressed small @click="showAddServiceDialog(props.item)" :disabled="props.item.state !== 1 ">
            <v-icon small dark>mdi-plus-box-multiple</v-icon>
          </v-btn>
        </template>
      </v-data-table>

      <!-- checkout dialog -->
      <v-dialog persistent v-model="showCheckOut" width="500">
        <v-card>
          <v-card-title class="headline green lighten-2">
            Checking Out Details
          </v-card-title>
          <v-card-text class="mt-3">

            <v-simple-table dense class=" pa-0 mb-3">
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
                <p>Pending Balance: </p>
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
                <v-checkbox color="success" class="mt-0 mb-0 pa-0" label="Php 200.00" v-on:click="addKeyDeposit()" v-model="guestBill.keyDeposit"></v-checkbox>
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
      <v-dialog persistent v-model="showPayment" width="500">
        <v-card>
          <v-card-title class="headline green lighten-2">
            Payment
          </v-card-title>
          <v-card-text class="mt-3">
            
            <v-simple-table dense class=" pa-0 mb-3">
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
      <v-dialog persistent v-model="showAddService" width="500">
        <v-card>
          <v-card-title class="headline green lighten-2">
            Services
          </v-card-title>
          <v-card-text class="mt-3">
            
            <v-simple-table fixed-header height="270px">
              <template v-slot:default>
                <thead>
                  <tr>
                    <th class="ma-0 pa-0"></th>
                    <th class="text-left pl-1">Name</th>
                    <th class="text-left">Rate</th>
                    <th class="text-left">Qty</th>
                    <th class="text-left">Paid</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="service in guestServices" :key="service.name">
                    <td class="pa-0 ma-0">
                      <v-btn icon small v-if="service.add" class="pt-0 mt-0" v-on:click="removeFromList(service)">
                        <v-icon small color="red lighten-2">mdi-minus-circle</v-icon>
                      </v-btn>
                    </td>
                    <td class="pl-1">{{ service.name }}</td>
                    <td>{{ service.rate }}</td>
                    <td>{{ service.quantity }}</td>
                    <td>
                      <v-btn icon small v-if="!service.add">
                        <v-icon color="green lighten-3"
                          >mdi-checkbox-marked</v-icon
                        >
                      </v-btn>
                    </td>
                  </tr>
                </tbody>
              </template>
            </v-simple-table>
            <v-row class="mt-2">
              <v-col lg="1" md="1" sm="12" d-flex class="mr-1">
                <v-btn icon small class="mt-2" v-on:click="addToList(addToService)">
                  <v-icon color="green lighten-2">mdi-plus-circle</v-icon>
                </v-btn>
              </v-col>
              <v-col lg="7" md="" sm="12" d-flex class="pr-1">
                <v-select
                  :items="services"
                  v-model="addToService.name"
                  label="Service Name"
                  item-text="text"
                  item-value="value"
                  dense
                  outlined
                ></v-select>
              </v-col>
              <v-col lg="3" md="3" sm="12" d-flex class="pl-1">
                <v-text-field
                  v-model="addToService.qty"
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
import axios from "axios";
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
      rooms: [],
      // check out details
      guestBillDetails: [
        // { id: '1', billId: '1', name: "service 1", total: "210", status: "Pending"},
        // { id: '2', billId: '1', name: "service 2", total: "210", status: "Pending"},
        // { id: '2', billId: '2', name: "service 1", total: "210", status: "Pending"},
        // { id: '3', billId: '3', name: "service 1", total: "210", status: "Pending"},
        // { id: '4', billId: '4', name: "service 1", total: "210", status: "Pending"},
      ],
      guestBill: [ //1 - deposit (minus 200 to pending); 0 - not (give money back to guest)
        // { id: '1', roomId: "1", status: "Not Paid", keyDeposit: '0', total: "", balance: "", received: "0"},
        // { id: '2', roomId: "2", status: "Not Paid", keyDeposit: '0', total: "", balance: "", received: "0"},
        // { id: '3', roomId: "3", status: "Not Paid", keyDeposit: '0', total: "", balance: "", received: "0"},
        // { id: '4', roomId: "4", status: "Not Paid", keyDeposit: '0', total: "", balance: "", received: "0"},
      ],
      // rules
      numberRules: [
        v => v.length > 0 || 'This field may not be empty',
        v => Number.isFloat(v) || 'The value must be an float number',
        v => v > 0 || 'The value must be greater than zero'
      ],
      // services details
      services: [
        // { text: "Sample", value: "Sample" },
        // { text: "Sample2", value: "Sample2" },
      ],  
      addToService: {
        // name: "",
        // qty: "",
      },
      guestServices: [
        // {
        //   add: false,
        //   name: "Extra Bed",
        //   rate: "50",
        //   quantity: "1",
        //   status: true,
        // },
        // {
        //   add: true,
        //   name: "Airport Shuttle",
        //   rate: "1500",
        //   quantity: "2",
        //   status: false,
        // },
      ],
    };
  },
  methods: {
    statusChanged(item) {
      console.log(item)
      let chosenGuest = this.rooms.find((item)=> item.roomNo == this.currentDialogItem.roomNo)
      console.log(chosenGuest)
    },
    // checkout
    addKeyDeposit: function() {
      let chosenGuest = this.guestBill.find((item)=> item.roomId == this.currentDialogItem.id)
      chosenGuest.keyDeposit = '1'
      if(chosenGuest.keyDeposit === '1'){
        this.guestBill.balance = parseInt(this.guestBill.balance) - 200;
      }
      console.log(chosenGuest.keyDeposit)
    },
    showCheckOutDialog(item) {
      this.showCheckOut = true
      this.currentDialogItem = item
      let chosenGuest = this.guestBill.find((item)=> item.roomId == this.currentDialogItem.id)
      console.log(chosenGuest)
    },
    checkOutClose: function () {
      this.showCheckOut = false
    },
    checkOut: function () {
      this.showCheckOut = false;
      let chosenGuest = this.rooms.find((item)=> item.roomNo == this.currentDialogItem.roomNo)
      console.log(chosenGuest)
      chosenGuest.status = "dirty"
      chosenGuest.state = "Vacant"
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
    },
    addToList: function(input) {
      console.log(input);
      var addData = {
        add: true,
        name: input.name,
        rate: "",
        quantity: input.qty,
        status: false,
      }
      this.guestServices.push(addData);
    },
    removeFromList: function(input) {
      var index = this.guestServices.indexOf(input.name);
      this.guestServices.splice(index, 1);
    },
  },
  beforeMount(){
    var date = new Date().toISOString().slice(0,10);
    let room = "http://localhost:3000/room/1"
    let guest = "http://localhost:3000/guest"
    const requestRoom = axios.get(room);
    const requestGuest = axios.get(guest);
    const requestCheckin = axios.get('http://localhost:3000/checkin/"'+date+'"');
    
    axios
    .all([requestRoom, requestGuest, requestCheckin])
    .then(axios.spread((...responses) => {
      // console.log(responses)
      const requestRoom = responses[0].data.result
      const requestGuest = responses[1].data.result
      const requestCheckin = responses[2].data.result
      
      for(var i = 0; i < requestRoom.length; i++){
        const addRooms = {
          id: requestRoom[i].id,
          roomNo: requestRoom[i].roomNo,
          status: requestRoom[i].status,
          state: requestRoom[i].occupied,
          roomType: requestRoom[i].name,
         
          name: "",
          gender: "",
          country: "",
          nationality: "",
          address: "",
          validId: "",
          validIdType: "",
          phoneNo: ""
        }

        this.rooms.push(addRooms)
        for(var x = 0; x < requestCheckin.length; x++){
          for(var y = 0; y < requestGuest.length; y++){
            for(var z = 0; z < requestRoom.length; z++){
              if(requestGuest[y].checkInId == requestCheckin[x].id && requestRoom[z].id == requestCheckin[x].roomId) {
                this.rooms[z].name = requestGuest[y].fname + " " + requestGuest[y].lname,
                this.rooms[z].gender = requestGuest[y].gender,
                this.rooms[z].country = requestGuest[y].country,
                this.rooms[z].nationality = requestGuest[y].nationality,
                this.rooms[z].address = requestGuest[y].address,
                this.rooms[z].validId = requestGuest[y].validId,
                this.rooms[z].validIdType = requestGuest[y].validIdType,
                this.rooms[z].phoneNo = requestGuest[y].phoneNo
              }
            }
          }
        }
      }
      
      
    })).catch(err => {
      console.log(err.response.data.message);
    })

      // GET Services
      // axios
      // .get("http://localhost:3000/service-mgmt")
      // .then((res) => {
      //   var service = res.data.result
      //   console.log(service)
      // })  
      //   .catch((err) => {
      //   console.log(err.response.data.message);
      // });
  }
};
</script>

<style scoped>
</style>
