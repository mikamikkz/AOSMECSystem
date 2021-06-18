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
                <v-btn color="success" depressed dark v-bind="attrs" v-on="on" v-if="props.item.occupied === 1 ">
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
                outlined
                v-on:change="statusChanged(props.item)"
              >
              </v-select>
            </v-col>
          </v-row>
        </template>

        <template v-slot:item.checkout="props">
          <!-- checkout -->
          <v-btn class="mx-2 mt-2" color="error" fab depressed small @click="showCheckOutDialog(props.item)"  :disabled="props.item.occupied !== 1">
            <v-icon small dark>mdi-door-open</v-icon>
          </v-btn>
          <!-- payment -->
          <v-btn class="mx-2 mt-2" color="primary" fab depressed small @click="showPaymentDialog(props.item)" :disabled="props.item.occupied !== 1 ">
            <v-icon small dark>mdi-cash-multiple</v-icon>
          </v-btn>
          <!-- add service -->
          <v-btn class="mx-2 mt-2" color="warning" fab depressed small @click="showAddServiceDialog(props.item)" :disabled="props.item.occupied !== 1 ">
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
            <v-row>
              <v-col cols="5">
                <p>Pending Balance: </p>
              </v-col>
              <v-col cols="7">
                <p>{{ pendingMessage }}</p>
              </v-col>
            </v-row>
            <v-row v-if="keyDeposit == 1">
              <v-col cols="5">
                <p>Key Deposit:</p>
              </v-col>
              <v-col cols="7">
                <v-checkbox color="success" class="mt-0 mb-0 pa-0" label="Php 200.00" v-on:click="addKeyDeposit()" ></v-checkbox>
              </v-col>
            </v-row>

          </v-card-text>
          <v-divider></v-divider>
          <v-card-actions class="d-flex justify-center pb-6">
            <v-btn class="px-5" v-on:click="checkOutCancel()"> Cancel </v-btn>
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
                <span v-for="bill in guestBill" :key="bill.id">
                  <span v-if="bill.id === chosenGuest.id && bill.status == 'unpaid'">
                    <thead>
                      <tr>
                        <th class="text-left pa-0 pl-10">Payment Details</th>
                        <th class="text-left pl-0 pr-0">Amount to Pay</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr class="pb-10" v-for="billDetails in guestBillDetails" :key="billDetails.id">
                        <span v-if="billDetails.billId === chosenGuest.id">
                          <span v-for="serviceName in guestService" :key="serviceName.id">
                            <span v-if="serviceName.id == billDetails.serviceId && billDetails.status == 'unpaid' ">
                              <td class="pa-0 pt-5"> 
                                <li>Service: {{ serviceName.name }}</li> 
                                <li>Quantity: {{ billDetails.quantity }}</li>
                              </td>
                              <td class="text-right pr-0 pl-15">Php {{ billDetails.total }}</td>
                            </span>
                          </span>
                        </span>
                      </tr>
                    </tbody>
                  </span>
                </span>
              </template>
            </v-simple-table>

            <v-row>
              <v-col cols="5">
                <p>Pending Balance:</p>
              </v-col>
              <v-col cols="7">
                  <span v-for="bill in guestBill" :key="bill.id">
                    <span v-if="bill.id === chosenGuest.id">
                      <span>Php {{bill.pending}}</span>
                    </span>
                  </span>
              </v-col>
            </v-row>
            <span v-for="bill in guestBill" :key="bill.id">
              <span v-if="bill.id === chosenGuest.id && bill.status == 'unpaid'">
                <v-row>
                  <v-col cols="5">
                    <p>Select Service to pay:</p>
                  </v-col>
                  <v-col cols="7">
                    <v-select
                      :items="guestPayService"
                      v-model="payService"
                      label="Service Name"
                      item-text="name"
                      item-value="id"
                      dense
                      outlined
                    ></v-select>
                  </v-col>
                </v-row>
              </span>
            </span>
            <span v-for="bill in guestBill" :key="bill.roomId">
              <span v-if="bill.id === chosenGuest.id && bill.status == 'unpaid'">
                <v-row>
                      <v-col cols="5">
                        <p>Amount to Pay:</p>
                      </v-col>
                      <v-col cols="7" class="pa-0">
                        <v-text-field class="pt-0 pl-3" prefix="Php" v-model.number="payment"></v-text-field>
                      </v-col>
                </v-row>
              </span>
            </span>
 

          </v-card-text>
          <v-divider></v-divider>
          <v-card-actions class="d-flex justify-center pb-6">
            <v-btn class="px-5" v-on:click="paymentClose()"> Cancel </v-btn>
            <span v-for="bill in guestBill" :key="bill.id">
              <span v-if="bill.id === chosenGuest.id && bill.status == 'unpaid'">
                <v-btn color="green white--text" class="px-5" v-on:click="paid()"> Paid </v-btn>
              </span>
            </span>
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
                  <!-- old: in guestServices -->
                  <tr class="pb-10" v-for="billDetails in guestBillDetails" :key="billDetails.id">
                    <span v-if="billDetails.billId === chosenGuest.id">
                      <span v-for="service in guestServices" :key="service.id">
                        <span v-if="service.id == billDetails.serviceId">
                  <!-- <tr v-for="service in guestService" :key="service.name"> -->
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
                        </span>
                      </span>
                    </span>
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
                <!-- old: :items: services -->
                <v-select
                  :items="guestServices"
                  v-model="addToService.name"
                  label="Service Name"
                  item-text="name"
                  item-value="name"
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
      /***** dialogs *****/
      showCheckOut: false,
      showPayment: false,
      showAddService: false,
      closeDialog: false,

      currentDialogItem: {}, //current row
      chosenGuest: {id: ""}, //current bill
      status: [ "clean", "dirty", "out of order"],

      dialog: {},
      index: -1,

      // Check Out Details Modal
      pendingMessage: "",
      keyDeposit: "",
      pendingAmount: 0,
      bill: {},
      cancel: { keyDeposit: "", total: ""}, 

      // Payment Modal
      guestPayService: [], //items of the model
      payService: { id: 0, name: ""}, //model for the select
      payment: 0,
      guestNewBill: {}, //when paying a certain service
      guestNewBillDetail: {},

      /***** main table *****/
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

      /***** array lists *****/
      // rooms
      rooms: [],
      // check out details
      guestBillDetails: [],
      guestPendingBal: [],
      guestBill: [], //1 - deposit (minus 200 to pending); 0 - not (give money back to guest)
      
      // payment details
      guestService: [], 
      // rules
      numberRules: [
        v => v.length > 0 || 'This field may not be empty',
        v => Number.isFloat(v) || 'The value must be an float number',
        v => v > 0 || 'The value must be greater than zero'
      ],
      // services details
      services: [
        // { text: "Sample", value: "Sample" },
      ],  
      addToService: {
        // name: "",
        // qty: "",
      },
      guestServices: [], //old array that i used for FE
    };
  },
  methods: {
    statusChanged(item) {
      console.log(item)
      axios
      .patch('http://localhost:3000/room/"'+item.id+'"', item)
      .then((response) => {
        console.log(response.data.message);
      }).catch(err => {
        console.log(err.response.data.message);
      });

    },
    // checkout
    addKeyDeposit: function() {
      for(var i = 0; i < this.guestBill.length; i++) {
        if(this.guestBill[i].roomId == this.currentDialogItem.id){
          this.cancel.keyDeposit = this.guestBill[i].keyDeposit
          this.cancel.total = this.guestBill[i].total

          this.guestBill[i].keyDeposit = 0
          this.guestBill[i].total -= 200
          this.bill = this.guestBill[i]
        }
      }
      axios
      .patch('http://localhost:3000/bill/"'+this.bill.id+'"', this.bill)
      .then((response) => {
        console.log(response.data.message);
      }).catch(err => {
        console.log(err.response.data.message);
      });
    },
    showCheckOutDialog(item) {
      /* note: item = rooms */
      this.currentDialogItem = item
      this.showCheckOut = true

      let room = "http://localhost:3000/room/1"
      const requestRoom = axios.get(room);
      let bill = "http://localhost:3000/bill"
      const requestBill = axios.get(bill);

      axios
      .all([requestRoom, requestBill])
      .then(axios.spread((...responses) => {
          const requestRoom = responses[0].data.result
          const requestBill = responses[1].data.result
          for(var x = 0; x < requestRoom.length; x++){
            for(var y = 0; y < requestBill.length; y++){
              if(requestBill[y].roomId == requestRoom[x].id && requestRoom[x].id == item.id) {
                var guestBill = {
                  keyDeposit: requestBill[y].keyDeposit,
                  status: requestBill[y].status,
                  total: requestBill[y].total
                }
              }
            }
          }
          if(guestBill.status == "unpaid") {
            this.pendingMessage = 'Not all services were paid. Check "Payment" for pending details'
          }else{
            this.pendingMessage = "All Paid. Ready to Check-out."
          }
          if(guestBill.keyDeposit == 0){
            this.keyDeposit = 0
          }else{
            this.keyDeposit = 1
          }
      })).catch(err => {
          console.log(err.response.data.message);
      })
    },
    checkOutCancel: function () {
      for(var i = 0; i < this.guestBill.length; i++) {
        if(this.guestBill[i].roomId == this.currentDialogItem.id){
          this.guestBill[i].keyDeposit = this.cancel.keyDeposit
          this.guestBill[i].total = this.cancel.total
          this.bill = this.guestBill[i]
        }
      }
      console.log(this.bill)
      axios
      .patch('http://localhost:3000/bill/"'+this.bill.id+'"', this.bill)
      .then((response) => {
        console.log(response.data.message);
      }).catch(err => {
        console.log(err.response.data.message);
      });

      this.showCheckOut = false
    },
    checkOut: function () {
      this.showCheckOut = false;
      this.currentDialogItem.occupied = 0
      this.currentDialogItem.status = "dirty"
      axios
      .patch('http://localhost:3000/room/"'+this.currentDialogItem.id+'"', this.currentDialogItem)
      .then((response) => {
        console.log(response.data.message);
      }).catch(err => {
        console.log(err.response.data.message);
      });
    },
    // payment
    showPaymentDialog(item) {
      this.showPayment = true
      this.currentDialogItem = item
      
      let bill = "http://localhost:3000/bill"
      const requestBill = axios.get(bill);
      let billDetails = "http://localhost:3000/bill-details"
      const requestBillDetails = axios.get(billDetails);

      axios
      .all([requestBill, requestBillDetails])
      .then(axios.spread((...responses) => {
          const requestBill = responses[0].data.result
          const requestBillDetails = responses[1].data.result
          
          for(var x = 0; x < requestBill.length; x++){
            for(var y = 0; y < requestBillDetails.length; y++){
              if(requestBill[x].id == requestBillDetails[y].billId && requestBill[x].roomId == this.currentDialogItem.id) {
                this.chosenGuest.id = requestBill[x].id
              }
            }
          }
          
      })).catch(err => {
          console.log(err.response.data.message);
      })

      let service = "http://localhost:3000/service-mgmt"
      const RequestService = axios.get(service);
      axios
      .all([requestBillDetails, RequestService])
      .then(axios.spread((...responses) => {
          const requestBillDetails = responses[0].data.result
          const requestService = responses[1].data.result
          for (var i = 0; i < requestService.length; i++){
            for(var j = 0; j < requestBillDetails.length; j++) {
              if(this.chosenGuest.id == requestBillDetails[j].billId && requestBillDetails[j].serviceId == requestService[i].id && requestBillDetails[j].status == "unpaid") {
                const addService = {
                  id: requestService[i].id,
                  name: requestService[i].name
                }
                this.guestPayService.push(addService)
              }
            }
          }
      })).catch(err => {
          console.log(err.response.data.message);
      })

    },
    paymentClose: function () {
      this.showPayment = false
    },
    
    paid() {
      // console.log(this.payment) //amount to pay
      // console.log(this.payService) // selected service id
      // console.log(this.chosenGuest.id) //bill.id 

      for(var x = 0; x < this.guestBill.length; x++){
        for(var y = 0; y < this.guestBillDetails.length; y++){
          if(this.guestBill[x].id == this.chosenGuest.id && this.guestBillDetails[y].billId == this.chosenGuest.id) {
            if(this.payService == this.guestBillDetails[y].serviceId){
              this.guestNewBill = this.guestBill[x]
              this.guestNewBill.pending = this.guestBill[x].pending - this.payment
              
              this.guestNewBillDetail = this.guestBillDetails[y]
              this.guestNewBillDetail.pending -= this.payment
              if(this.payment == this.guestBillDetails[y].total) {
                this.guestBillDetails[y].status = "paid"
                this.guestNewBillDetail.status = "paid"
              }
              if(this.guestNewBill.pending == 0) {
                this.guestNewBill.status = "paid"
              }
            }
          }
        }
      }
      
      axios
      .patch('http://localhost:3000/bill/"'+this.chosenGuest.id+'"', this.guestNewBill)
      .then((response) => {
        console.log(response.data.message);
      }).catch(err => {
        console.log(err.response.data.message);
      });

      axios
      .patch('http://localhost:3000/bill-details/"'+this.chosenGuest.id+'"/"'+this.payService+'"', this.guestNewBillDetail)
      .then((response) => {
        console.log(response.data.message);
      }).catch(err => {
        console.log(err.response.data.message);
      });
     
      this.showPayment = false
    },
    // add service
    showAddServiceDialog(item) {
      this.showAddService = true
      this.currentDialogItem = item
      console.log(this.currentDialogItem)

      let bill = "http://localhost:3000/bill"
      const requestBill = axios.get(bill);
      let billDetails = "http://localhost:3000/bill-details"
      const requestBillDetails = axios.get(billDetails);

      axios
      .all([requestBill, requestBillDetails])
      .then(axios.spread((...responses) => {
          const requestBill = responses[0].data.result
          const requestBillDetails = responses[1].data.result
          
          for(var x = 0; x < requestBill.length; x++){
            for(var y = 0; y < requestBillDetails.length; y++){
              if(requestBill[x].id == requestBillDetails[y].billId && requestBill[x].roomId == this.currentDialogItem.id) {
                this.chosenGuest.id = requestBill[x].id
              }
            }
          }
      })).catch(err => {
          console.log(err.response.data.message);
      })
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
    }
  },
  mounted(){
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
      const requestRoom = responses[0].data.result
      const requestGuest = responses[1].data.result
      const requestCheckin = responses[2].data.result
      for(var i = 0; i < requestRoom.length; i++){
        const addRooms = {
          id: requestRoom[i].id,
          roomNo: requestRoom[i].roomNo,
          status: requestRoom[i].status,
          occupied: requestRoom[i].occupied,
          roomType: requestRoom[i].name,

          roomTypeId: requestRoom[i].roomTypeId,

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
      }
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
    })).catch(err => {
      console.log(err.response.data.message);
    })

    let bill = "http://localhost:3000/bill"
    let billDetails = "http://localhost:3000/bill-details"
    const requestBill = axios.get(bill);
    const requestBillDetails = axios.get(billDetails);
    axios
    .all([requestRoom, requestBill, requestBillDetails])
    .then(axios.spread((...responses) => {
      const requestRoom = responses[0].data.result
      const requestBill = responses[1].data.result
      const requestBillDetails = responses[2].data.result

      for(var x = 0; x < requestRoom.length; x++){
        for(var y = 0; y < requestBill.length; y++){
          
          if(requestBill[y].roomId == requestRoom[x].id) {
              const addGuestBill = {
                id: requestBill[y].id,
                roomId: requestBill[y].roomId,
                status: requestBill[y].status,
                keyDeposit: requestBill[y].keyDeposit,
                //added "pending" col from DB
                pending: requestBill[y].pending,
                total: requestBill[y].total
              }
              this.guestBill.push(addGuestBill)
              
              for(var z = 0; z < requestBillDetails.length; z++){  
                if(requestBill[y].id == requestBillDetails[z].billId) {
                  const addGuestBillDetails = {
                    billId: requestBillDetails[z].billId,
                    serviceId: requestBillDetails[z].serviceId,
                    quantity: requestBillDetails[z].quantity,
                    //added "pending" col from DB
                    pending: requestBillDetails[z].pending,
                    total: requestBillDetails[z].total,
                    status: requestBillDetails[z].status
                  }
                  this.guestBillDetails.push(addGuestBillDetails)
                }
              }

          }
        }
      }
      // console.log(this.guestBillDetails)
      // console.log(this.guestBill)
      // console.log(this.guestPendingBal)
    
    })).catch(err => {
      console.log(err.response.data.message);
    })
    

    axios
    .get("http://localhost:3000/service-mgmt")
    .then((res) => {
      var requestService = res.data.result
      for (var i = 0; i < requestService.length; i++){
        const addService = {
          add: "false",
          id: requestService[i].id,
          name: requestService[i].name,
          rate: requestService[i].rate,
          pricing: requestService[i].pricing
        }
        this.guestService.push(addService)
        this.guestServices.push(addService)
      }
    }).catch((err) => {
      console.log(err.response.data.message);
    });
  }
};
</script>

<style scoped>
</style>
