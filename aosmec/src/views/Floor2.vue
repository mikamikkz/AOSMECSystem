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
      <v-data-table dense :headers="headers" :items="rooms" item-key="id">
        <template v-slot:item.name="props">
          <td>
            <v-dialog v-model="dialog[props.item.roomNo]" width="500">
              <template v-slot:activator="{ on, attrs }">
                <v-btn color="success" depressed dark v-bind="attrs" v-on="on" v-if="props.item.occupied === 1 ">
                  <v-icon small dark>mdi-account-outline</v-icon>
                </v-btn>
              </template>

              <v-card>
                <v-card-title class="headline green lighten-2">
                  Guest(s):
                </v-card-title>

                <v-card-text class="mt-3">
                <!-- Guest Details -->
                <span v-for="guest in guests" :key="guest.name">
                    <span v-if="guest.roomId == props.item.roomId">
                      <v-list-group>
                        <template v-slot:activator>
                          <v-list-item-content>
                            <h3>
                              {{ guest.name }}
                            </h3>
                          </v-list-item-content>
                        </template>
                        <v-list-item color="black">
                          <v-list-item-content>
                            <div class="pl-5 pb-3">
                              <p>Gender: {{ guest.gender }}</p>
                              <p>Country: {{ guest.country }}</p>
                              <p>Nationality: {{ guest.nationality }}</p>
                              <p>Address: {{ guest.address }}</p>
                              <p>Valid ID: {{ guest.validId }}</p>
                              <p>Valid ID Type: {{ guest.validIdType }}</p>
                              <p>Phone Number: {{ guest.phoneNo }}</p>
                            </div>
                          </v-list-item-content>
                        </v-list-item>
                      </v-list-group>
                    </span>
                  </span>
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
            <v-btn v-if="pendingMessage == 'All Paid. Ready to Check-out.'" color="red white--text" class="px-5" v-on:click="checkOut()">
              Check Out 
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <!-- payment dialog -->
      <v-dialog persistent v-model="showPayment" width="500">
        <v-card>
          <v-card-title class="headline green lighten-2">
            Payment Details
          </v-card-title>
          <v-card-text class="mt-3">
            
            <v-simple-table dense class=" pa-0 mb-3">
              <template v-slot:default>
                <span v-for="bill in guestBill" :key="bill.id">
                  <span v-if="bill.id === chosenGuest.id && bill.status == 'unpaid'">
                    <thead>
                      <tr>
                        <th class="text-left pa-0 pl-15 pr-5">Payment Details</th>
                        <th class="text-right pa-0 pr-15 pl-5">Pending Amount to Pay</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="service in guestPayService" :key="service.id">
                        <td class="text-left pa-0 pl-10 pt-2"><li>Service: {{service.name}}</li></td>
                        <td class="text-left pa-0 pl-15 pt-2">Php{{service.pending}}</td>
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
                  <tr v-for="service in specificGuestServices" :key="service.id">
                      <td class="pa-0 ma-0">
                        <v-btn
                          icon
                          small
                          v-if="service.add == 'true'"
                          class="pt-0 mt-0"
                          v-on:click="removeFromList(service)"
                        >
                          <v-icon small color="red lighten-2"
                            >mdi-minus-circle</v-icon
                          >
                        </v-btn>
                      </td>
                      <td class="pl-1">{{ service.name }}</td>
                      <td>{{ service.rate }}</td>
                      <td>{{ service.quantity }}</td>
                      <td>
                        <v-btn icon small v-if="service.status == 'paid'">
                          <v-icon color="green lighten-3"
                            >mdi-checkbox-marked</v-icon
                          >
                        </v-btn>
                      </td>
                    </tr>
                    <tr v-for="service in createNewBD" :key="service.serviceId">
                      <td class="pa-0 ma-0">
                        <v-btn
                          icon
                          small
                          v-if="service.add == 'true'"
                          class="pt-0 mt-0"
                          v-on:click="removeFromList(service)"
                        >
                          <v-icon small color="red lighten-2"
                            >mdi-minus-circle</v-icon
                          >
                        </v-btn>
                      </td>
                      <td class="pl-1">{{ service.name }}</td>
                      <td>{{ service.rate }}</td>
                      <td>{{ service.quantity }}</td>
                      <td>
                        <v-btn icon small v-if="service.status == 'paid'">
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
                  :items="guestService"
                  v-model="addToService.id"
                  label="Service Name"
                  item-text="name"
                  item-value="id"
                  dense
                  outlined
                ></v-select>
              </v-col>
              <v-col lg="3" md="3" sm="12" d-flex class="pl-1">
                <v-text-field
                  v-model.number="addToService.qty"
                  label="Qty"
                  dense
                  outlined
                  type="number"
                  min = 0
                ></v-text-field>
              </v-col>
            </v-row>

          </v-card-text>
          <v-divider></v-divider>
          <v-card-actions class="d-flex justify-center pb-6">
            <v-btn class="px-5" v-on:click="addServiceClose()"> Cancel </v-btn>
            <v-btn class="px-5 success" v-on:click="addService()"> Submit </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

    </v-container>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "Floor-2",
  components: {},
  data() {
    return {
      date: "",

      /***** dialogs *****/
      showCheckOut: false,
      showPayment: false,
      showAddService: false,
      closeDialog: false,

      /***** arrays *****/
      rooms: [],
      guests: [],

      /***** per row *****/
      currentDialogItem: {}, //current row
      chosenGuest: {id: ""}, //current bill
      status: [ "clean", "dirty", "out of order"],

      dialog: {},
      index: -1,

      /***** check out details modal *****/
      guestBillDetails: [],
      guestBill: [], //1 - deposit (minus 200 to pending); 0 - not (give money back to guest)
      pendingMessage: "",
      keyDeposit: "",
      pendingAmount: 0,
      bill: {},
      cancel: { keyDeposit: "", total: ""}, 

      /***** payment modal *****/
      guestService: [], //all available services of the hotel
      guestPayService: [], //unpaid services of a guest; items of the model
      payService: { id: 0, name: ""}, //model for the select
      payment: 0,
      guestNewBill: {}, //when paying a certain service
      guestNewBillDetail: {},

      /***** service modal *****/
      specificGuestServices: [],
      addToService: { id: 0, qty: 0},
      serviceAmount: 0,
      flag: {},
      service: {},
      createNewBD: [],
      updateBD:[],
      foo: 0,
      createServiceAmount: { pending: 0, total: 0},
      updateServiceAmount: { pending: 0, total: 0},

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
    /***** checkout modal + dialog *****/
    addKeyDeposit: function() {
      for(var i = 0; i < this.guestBill.length; i++) {
        if(this.guestBill[i].roomId == this.currentDialogItem.id){
          this.cancel.keyDeposit = this.guestBill[i].keyDeposit
          this.cancel.total = this.guestBill[i].total

          this.guestBill[i].keyDeposit = 0
          this.guestBill[i].total -= 200
          this.guestBill[i].updatedAt = this.date
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
      this.currentDialogItem = item
      this.showCheckOut = true

      let room = "http://localhost:3000/room/2"
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
      this.currentDialogItem.roomId = null
      console.log(this.currentDialogItem)
      axios
      .patch('http://localhost:3000/room/"'+this.currentDialogItem.id+'"', this.currentDialogItem)
      .then((response) => {
        console.log(response.data.message);
      }).catch(err => {
        console.log(err.response.data.message);
      });
    },
    /***** payment modal + dialog *****/
    showPaymentDialog(item) {
      this.showPayment = true
      this.currentDialogItem = item
      console.log(this.guestBill)
      
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
                  name: requestService[i].name,
                  rate: requestService[i].rate,
                  quantity: requestBillDetails[j].quantity,
                  pending: requestBillDetails[j].pending,
                  total: requestBillDetails[j].total
                }
                this.guestPayService.push(addService)
              }
            }
          }
          console.log(this.guestPayService)
      })).catch(err => {
          console.log(err.response.data.message);
      })
    },
    paymentClose: function () {
      this.guestPayService = []
      this.showPayment = false
    },
    paid: function () {
      // console.log(this.payment) //amount to pay
      // console.log(this.payService) // selected service id
      // console.log(this.chosenGuest.id) //bill.id 

      for(var x = 0; x < this.guestBill.length; x++){
        for(var y = 0; y < this.guestBillDetails.length; y++){
          if(this.guestBill[x].id == this.chosenGuest.id && this.guestBillDetails[y].billId == this.chosenGuest.id) {
            if(this.payService == this.guestBillDetails[y].serviceId){
              this.guestNewBill = this.guestBill[x]
              
              this.guestNewBill.updatedAt = this.date
              this.guestNewBill.pending = this.guestBill[x].pending - this.payment
              if(this.guestNewBill.pending == 0) {
                this.guestNewBill.status = "paid"
              }
              
              if(this.payment == this.guestBillDetails[y].pending) {
                this.guestBillDetails[y].status = "paid"
                this.guestNewBillDetail.status = "paid"
              }
              this.guestNewBillDetail = this.guestBillDetails[y]
              this.guestNewBillDetail.pending -= this.payment
              this.guestNewBillDetail.updatedAt = this.date
              
            }
          }
        }
      }
      console.log(this.guestNewBillDetail)
      console.log(this.guestNewBill)
      
      axios
      .patch('http://localhost:3000/bill-details/"'+this.chosenGuest.id+'"/"'+this.payService+'"', this.guestNewBillDetail)
      .then((response) => {
        console.log(response.data.message);
      }).catch(err => {
        console.log(err.response.data.message);
      });

      axios
      .patch('http://localhost:3000/bill/"'+this.chosenGuest.id+'"', this.guestNewBill)
      .then((response) => {
        console.log(response.data.message);
      }).catch(err => {
        console.log(err.response.data.message);
      });
      
      // location.reload();
      this.showPayment = false
    },
    /***** add service modal + dialog *****/
    showAddServiceDialog(item) {
      this.showAddService = true
      this.chosenGuest.id = item.billId
      this.servicesTableContent()
    },
    servicesTableContent: function () {
      for (var i = 0; i < this.guestService.length; i++){
        for(var j = 0; j < this.guestBillDetails.length; j++) {
          if(this.chosenGuest.id == this.guestBillDetails[j].billId && this.guestBillDetails[j].serviceId == this.guestService[i].id) {
            const addService = {
              add: "false",
              billId: this.guestBillDetails[j].billId,
              serviceId: this.guestService[i].id,
              name: this.guestService[i].name,
              rate: this.guestService[i].rate,
              quantity: this.guestBillDetails[j].quantity,
              status: this.guestBillDetails[j].status,
              pending: this.guestBillDetails[j].pending,
              total: this.guestBillDetails[j].total,
              }
              this.specificGuestServices.push(addService)
            }
          }
        }
        console.log(this.specificGuestServices)
    },
    addServiceClose: function () {
      location.reload();
      this.showAddService = false
    },
    addService: function (){
      if(this.createNewBD.length !== 0){
        //create new bill-detail
        for(var i=0; i < this.createNewBD.length; i++){
          axios
          .post("http://localhost:3000/bill-details", this.createNewBD[i])
          .then((response) => {
            console.log(response.data.message);
          })
        }
        for(var f=0; f < this.createNewBD.length; f++){
          this.createServiceAmount.pending += this.createNewBD[f].pending
          this.createServiceAmount.total += this.createNewBD[f].total
        }
        if(i == this.createNewBD.length){
          this.foo = 1
        }
      }
      if(this.updateBD.length !== 0){
        //update bill detail
        for(var k=0; k < this.updateBD.length; k++){
          axios
          .patch('http://localhost:3000/bill-details/"'+this.chosenGuest.id+'"/"'+this.updateBD[k].serviceId+'"', this.updateBD[k])
          .then((response) => {
            console.log(response.data.message);
          }).catch(err => {
            console.log(err.response.data.message);
          });
        }

        for(var l=0; l < this.updateBD.length; l++){
          this.updateServiceAmount.pending += this.updateBD[l].pending
          this.updateServiceAmount.total += this.updateBD[l].total
        }
        if(this.createNewBD.length == 0){
          for(var m = 0; m < this.guestBill.length; m++){
            if(this.guestBill[m].id == this.chosenGuest.id) {
              this.guestNewBill = this.guestBill[m]
              this.guestNewBill.pending = this.updateServiceAmount.pending 
              this.guestNewBill.total = this.updateServiceAmount.total
              this.guestNewBill.status = "unpaid"
              this.guestNewBill.updatedAt = this.date
            }
          }
          console.log("update new bill-detail and no create new bill detail")
          axios
          .patch('http://localhost:3000/bill/"'+this.chosenGuest.id+'"', this.guestNewBill)
          .then((response) => {
            console.log(response.data.message);
          }).catch(err => {
            console.log(err.response.data.message);
          });
        }

      }

      if(this.foo == 1){
        for(var j = 0; j < this.guestBill.length; j++){
          if(this.guestBill[j].id == this.chosenGuest.id) {
            this.guestNewBill = this.guestBill[j]
            if(this.updateBD.length !== 0) {
              this.guestNewBill.pending = this.createServiceAmount.pending 
              this.guestNewBill.total = this.createServiceAmount.total
            }else{
              this.guestNewBill.pending += this.createServiceAmount.pending 
              this.guestNewBill.total += this.createServiceAmount.total
            }
            this.guestNewBill.status = "unpaid"
            this.guestNewBill.updatedAt = this.date
          }
        }
        if(this.updateBD.length !== 0){
          console.log("create new bill-detail and update bill-detail")
          for(var y = 0; y < this.guestBill.length; y++){
            if(this.guestBill[y].id == this.chosenGuest.id) {
              this.guestNewBill = this.guestBill[y]
              this.guestNewBill.pending += this.updateServiceAmount.pending 
              this.guestNewBill.total += this.updateServiceAmount.total
              this.guestNewBill.status = "unpaid"
              this.guestNewBill.updatedAt = this.date
            }
          }
          axios
          .patch('http://localhost:3000/bill/"'+this.chosenGuest.id+'"', this.guestNewBill)
          .then((response) => {
            console.log(response.data.message);
          }).catch(err => {
            console.log(err.response.data.message);
          });
        }else{
          console.log("create new bill-detail and no update bill-detail") 
          console.log(this.guestNewBill)
          axios
          .patch('http://localhost:3000/bill/"'+this.chosenGuest.id+'"', this.guestNewBill)
          .then((response) => {
            console.log(response.data.message);
          }).catch(err => {
            console.log(err.response.data.message);
          });
        }
      }
      // location.reload();
      this.showAddService = false
    },
    addToList(input) {
      console.log("addToList function")
      
      for(var i = 0; i < this.guestService.length; i++){
        if(input.id == this.guestService[i].id){
          this.serviceAmount = this.guestService[i].rate * input.qty
        }
      }
      
      this.flag = this.specificGuestServices.find(x => x.billId == this.chosenGuest.id && x.serviceId == input.id);
      this.service = this.guestService.find(y => y.id == input.id);
      if(this.flag === undefined){
        //create new bill detail
        console.log("create new bill detail")
        const addService = {
          add: "true",
          billId: this.chosenGuest.id, 
          serviceId: input.id,
          name: this.service.name,
          rate: this.service.rate,
          quantity: input.qty, 
          pending: this.serviceAmount, 
          total: this.serviceAmount, 
          status: "unpaid",
          createdAt: this.date
        }
        this.createNewBD.push(addService)
      }
      else{
        //update bill detail
        console.log("update bill detail")
        for(var j = 0; j < this.specificGuestServices.length; j++){
          if(input.id == this.specificGuestServices[j].serviceId){
            this.specificGuestServices[j].status = "unpaid"
            this.specificGuestServices[j].pending += this.serviceAmount
            this.specificGuestServices[j].total += this.serviceAmount
            this.specificGuestServices[j].quantity += input.qty
            
            const updateService = {
              billId: this.chosenGuest.id, 
              serviceId: input.id, 
              quantity: this.specificGuestServices[j].quantity, 
              pending: this.specificGuestServices[j].pending, 
              total: this.specificGuestServices[j].total, 
              status: this.specificGuestServices[j].status,
              updatedAt: this.date
            }
            this.updateBD.push(updateService)
          }
        }
      }
      
    },
    removeFromList(input) {
      console.log("removeFromList function:")
      var index = this.createNewBD.findIndex(x => x.billId === this.chosenGuest.id && x.serviceId === input.serviceId);
      this.createNewBD.splice(index, 1);
    }
  },
  mounted(){
    this.date = new Date().toISOString().slice(0,10);
    if(localStorage.status){
      this.$store.state.status = localStorage.status
    }
    console.log(localStorage.status)
  },
  beforeMount(){
    const requestRoom = axios.get("http://localhost:3000/room/2");
    const requestGuest = axios.get("http://localhost:3000/guest");
    const requestCheckin = axios.get("http://localhost:3000/checkin");

    const requestBill = axios.get("http://localhost:3000/bill");
    const requestBillDetails = axios.get("http://localhost:3000/bill-details");
    
    /***** ROOMS ARRAY *****/
    axios
    .all([requestRoom, requestGuest, requestCheckin, requestBill, requestBillDetails])
    .then(axios.spread((...responses) => {
      const requestRoom = responses[0].data.result
      const requestGuest = responses[1].data.result
      const requestCheckin = responses[2].data.result
      const requestBill = responses[3].data.result
      const requestBillDetails = responses[4].data.result
      console.log(requestCheckin)

      for(var i = 0; i < requestRoom.length; i++){
        const addRooms = {
          id: requestRoom[i].id,
          roomNo: requestRoom[i].roomNo,
          status: requestRoom[i].status,
          occupied: requestRoom[i].occupied,
          roomType: requestRoom[i].name,
          roomTypeId: requestRoom[i].roomTypeId,
          roomId: "",
          billId: "",
          serviceId: []
        }

        this.rooms.push(addRooms)
      }
      for(var x = 0; x < requestCheckin.length; x++){
        for(var y = 0; y < requestGuest.length; y++){
          for(var z = 0; z < requestRoom.length; z++){
            if(requestGuest[y].checkInId == requestCheckin[x].id && requestRoom[z].id == requestCheckin[x].roomId) {
            this.rooms[z].roomId = requestCheckin[x].roomId
            }
          }
        }
      }
         
      for(var j = 0; j < requestRoom.length; j++){
        for(var k = 0; k < requestBill.length; k++){
          if(requestRoom[j].id == requestBill[k].roomId){
            this.rooms[j].billId = requestBill[k].id
            for(var l = 0; l < requestBillDetails.length; l++){
              if(requestBill[k].id == requestBillDetails[l].billId){
                this.rooms[j].serviceId.push(requestBillDetails[l].serviceId)
              }
            }
          }
        }
      }
    })).catch(err => {
      console.log(err.response.data.message);
    })

    /***** GUESTS ARRAY *****/
    axios
    .all([requestGuest, requestCheckin])
    .then(axios.spread((...responses) => {
      const requestGuest = responses[0].data.result
      const requestCheckin = responses[1].data.result

      for(var i = 0; i < requestGuest.length; i++){
        for(var j = 0; j < requestCheckin.length; j++){
          if(requestGuest[i].checkInId == requestCheckin[j].id){
            const addHeads = {
              roomId: requestCheckin[j].roomId,
              name: requestGuest[i].fname + " " + requestGuest[i].lname,
              gender: requestGuest[i].gender,
              country: requestGuest[i].country,
              nationality: requestGuest[i].nationality,
              address: requestGuest[i].address,
              validId: requestGuest[i].validId,
              validIdType: requestGuest[i].validIdType,
              phoneNo: requestGuest[i].phoneNo,
            }
            this.guests.push(addHeads)
          }
        }
      }
      console.log(this.guests)
    })).catch(err => {
      console.log(err.response.data.message);
    })

    /***** BILL AND BILL-DETAILS ARRAYS *****/
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
                pending: requestBill[y].pending,
                total: requestBill[y].total,
                updatedAt: ""
              }
              this.guestBill.push(addGuestBill)
              
              for(var z = 0; z < requestBillDetails.length; z++){  
                if(requestBill[y].id == requestBillDetails[z].billId) {
                  const addGuestBillDetails = {
                    billId: requestBillDetails[z].billId,
                    serviceId: requestBillDetails[z].serviceId,
                    quantity: requestBillDetails[z].quantity,
                    pending: requestBillDetails[z].pending,
                    total: requestBillDetails[z].total,
                    status: requestBillDetails[z].status,
                    updatedAt: ""
                  }
                  this.guestBillDetails.push(addGuestBillDetails)
                }
              }
              
          }
        }
      }
    
    })).catch(err => {
      console.log(err.response.data.message);
    })
    
    /***** SERVICES ARRAY *****/
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
      }
    }).catch((err) => {
      console.log(err.response.data.message);
    });

  }
};
</script>

<style scoped>
</style>
