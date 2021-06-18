<template>
  <v-container>
    <v-card class="mt-3">
      <v-card-title class="white--text py-3" style="background: #13b150"
        >Check In Details</v-card-title
      >
    </v-card>
    <v-row class="mt-5 pa-0">
      <v-col lg="5" md="5" sm="12" d-flex>
        <v-card>
          <v-card-title class="green--text">Reservation Details</v-card-title>
          <v-card-text class="mt-3">
            <v-form class="px-3">
              <v-row>
                <v-col class="pa-0">
                  <v-select
                    :items="reservee"
                    v-model="input.reservee"
                    label="Reservee"
                    prepend-icon="mdi-tooltip-account"
                    item-text="reservee"
                    item-value="value"
                    outlined
                    dense
                    color="green"
                    v-on:change="fillReserveeDetails(input.reservee)"
                  ></v-select>
                </v-col>
              </v-row>
              <v-row>
                <v-col class="pa-0">
                  <v-select
                    :items="reservationType"
                    v-model="input.reservationType"
                    label="Reservation Type"
                    prepend-icon="mdi-notebook"
                    item-text="text"
                    item-value="value"
                    outlined
                    dense
                    color="green"
                    disabled
                  ></v-select>
                </v-col>
              </v-row>
                <v-row v-for="rooms in input.roomDetails" :key="rooms.key">
                  <v-col class="pa-0" lg="8" md="8" xs="12">
                    <v-text-field
                      v-model="rooms.roomType"
                      label="Room Type"
                      prepend-icon="mdi-bed"
                      outlined
                      dense
                      color="green"
                      disabled
                    ></v-text-field>
                  </v-col>
                  <v-col class="pa-0 pl-3" lg="4" md="4" xs="12">
                    <v-select
                      :items="roomNo[rooms.roomType]"
                      v-model="rooms.roomNum"
                      label="Room No"
                      item-text="room"
                      item-value="room"
                      outlined
                      dense
                      color="green"
                    ></v-select>
                  </v-col>
                </v-row>
              <v-row>
                <v-col class="pa-0">
                  <v-text-field
                    v-model="input.noOfDays"
                    label="Number of Days"
                    type="number"
                    prepend-icon="mdi-calendar-edit"
                    outlined
                    dense
                    color="green"
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col class="pa-0" lg="6" md="6" xs="12">
                  <v-menu
                    ref="checkIn"
                    v-model="checkIn"
                    :close-on-content-click="false"
                    :return-value.sync="date"
                    transition="scale-transition"
                    offset-y
                    min-width="auto"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field
                        v-model="input.checkInDate"
                        label="Check In Date"
                        prepend-icon="mdi-calendar"
                        readonly
                        outlined
                        dense
                        v-bind="attrs"
                        v-on="on"
                        disabled
                        color="green"
                      ></v-text-field>
                    </template>
                    <v-date-picker
                      v-model="input.checkInDate"
                      no-title
                      scrollable
                      color="green"
                    >
                      <v-spacer></v-spacer>
                      <v-btn
                        text
                        color="green darken-2"
                        v-on:click="checkIn = false"
                      >
                        Cancel
                      </v-btn>
                      <v-btn
                        text
                        color="green darken-2"
                        v-on:click="$refs.checkIn.save(date)"
                      >
                        OK
                      </v-btn>
                    </v-date-picker>
                  </v-menu>
                </v-col>
                <v-col class="pa-0 pl-3" lg="6" md="6" xs="12">
                  <v-menu
                    ref="checkOut"
                    v-model="checkOut"
                    :close-on-content-click="false"
                    :return-value.sync="date"
                    transition="scale-transition"
                    offset-y
                    min-width="auto"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field
                        v-model="input.checkOutDate"
                        label="Check Out Date"
                        readonly
                        outlined
                        dense
                        v-bind="attrs"
                        v-on="on"
                        color="green"
                      ></v-text-field>
                    </template>
                    <v-date-picker
                      v-model="input.checkOutDate"
                      no-title
                      scrollable
                      color="green"
                    >
                      <v-spacer></v-spacer>
                      <v-btn
                        text
                        color="green darken-2"
                        v-on:click="checkOut = false"
                      >
                        Cancel
                      </v-btn>
                      <v-btn
                        text
                        color="green darken-2"
                        v-on:click="$refs.checkOut.save(date)"
                      >
                        OK
                      </v-btn>
                    </v-date-picker>
                  </v-menu>
                </v-col>
              </v-row>
              <v-row>
                <v-col class="pa-0" xl="5" md="5" xs="12">
                  <v-text-field
                    v-model="input.noOfHeads"
                    type="number"
                    label="No of Head"
                    outlined
                    dense
                    color="green"
                    disabled
                    v-on:change="addGuestNumber(input.noOfHeads)"
                    prepend-icon="mdi-account-multiple"
                    min="1"
                  >
                  </v-text-field>
                </v-col>
              </v-row>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col lg="4" md="4" sm="12" d-flex>
        <v-card>
          <v-card-title class="mb-0 pb-0 green--text"
            >Additional Service</v-card-title
          >
          <v-card-text class="mt-0 pt-0">
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
                      <v-btn
                        icon
                        small
                        v-if="service.add"
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
                      <v-btn icon small v-if="service.status">
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
                <v-btn
                  icon
                  small
                  class="mt-2"
                  v-on:click="addToList(addToService)"
                >
                  <v-icon color="green lighten-2">mdi-plus-circle</v-icon>
                </v-btn>
              </v-col>
              <v-col lg="7" md="" sm="12" d-flex class="pr-1">
                <v-select
                  :items="services"
                  v-model="addToService.id"
                  label="Service Name"
                  item-text="text"
                  item-value="value"
                  dense
                  outlined
                  color="green"
                ></v-select>
              </v-col>
              <v-col lg="3" md="3" sm="12" d-flex class="pl-1">
                <v-text-field
                  v-model="addToService.qty"
                  label="Qty"
                  dense
                  outlined
                  type="number"
                  min="1"
                  color="green"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col lg="3" md="3" sm="12" d-flex>
        <v-card>
          <v-card-title class="mb-0 pb-0 green--text"
            >Payment Details</v-card-title
          >
          <v-card-text>
            <v-simple-table fixed-header height="305px">
              <template v-slot:default>
                <thead>
                  <tr>
                    <th class="text-left pl-1">Name</th>
                    <th class="text-left">Total</th>
                    <th class="text-left">Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="item in guestBillDetails" :key="item.name">
                    <td class="pl-1">{{ item.name }}</td>
                    <td>{{ item.total }}</td>
                    <td class="pa-0">
                      <v-chip
                        small
                        outlined
                        color="green"
                        v-if="item.status == 'Paid'"
                      >
                        {{ item.status }}
                      </v-chip>
                      <v-chip small v-else color="yellow darken-1">
                        {{ item.status }}
                      </v-chip>
                    </td>
                  </tr>
                </tbody>
              </template>
            </v-simple-table>
            <v-card-actions class="d-flex justify-center">
              <v-btn color="success" v-on:click="checkInModal(guestBillDetails)"
                >Check In</v-btn
              >
            </v-card-actions>
          </v-card-text>
          <v-dialog v-model="checkInDialog" persistent width="450">
            <v-card>
              <v-card-title> </v-card-title>
              <v-card-text>
                <v-chip
                  color="light-green white--text font-weight-bold"
                  style="font-size: 16px"
                >
                  Total Bill Details
                </v-chip>
                <v-card outlined class="pa-2 mt-3">
                  <v-row class="pl-5">
                    <v-col cols="5">
                      <p class="subtitle-2 ma-0">Room Number:</p>
                    </v-col>
                    <v-col cols="7" class="py-2">
                      {{ guestBill.roomNo }}
                    </v-col>
                  </v-row>
                  <v-row class="pl-5">
                    <v-col cols="5">
                      <p class="subtitle-2 ma-0">Total:</p>
                    </v-col>
                    <v-col cols="7" class="py-2">
                      Php {{ guestBill.total }}.00
                    </v-col>
                  </v-row>
                  <v-row class="pl-5">
                    <v-col cols="5">
                      <p class="subtitle-2 ma-0">Balance:</p>
                    </v-col>
                    <v-col cols="7" class="py-2">
                      Php {{ guestBill.balance }}.00
                    </v-col>
                  </v-row>
                  <v-row class="pl-5">
                    <v-col cols="5">
                      <p class="subtitle-2 ma-0">Key Deposit:</p>
                    </v-col>
                    <v-col cols="7" class="ma-0 py-2">
                      <v-checkbox
                        color="success"
                        class="ma-0 pa-0"
                        label="Php 200.00"
                        v-on:click="addKeyDeposit()"
                        v-model="guestBill.keyDeposit"
                      ></v-checkbox>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col class="px-8 pb-0 mb-0">
                      <v-text-field
                        label="Amount Received"
                        color="green"
                        outlined
                        dense
                        type="number"
                        prefix="Php"
                        v-model="guestBill.received"
                        prepend-icon="mdi-cash"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </v-card>
              </v-card-text>
              <v-card-actions class="d-flex justify-center pb-6">
                <v-btn class="px-5" v-on:click="checkInDialog = false">
                  Cancel
                </v-btn>
                <v-btn
                  color="light-green white--text"
                  class="px-5"
                  v-on:click="checkInGuest(input, guestServices, guestBillDetails, guestInput)"
                > Check In </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-card>
      </v-col>
    </v-row>
    <v-dialog v-model="guestDetailDialog" width="600" persistent>
      <GuestForm
        class="pt-3"
        v-bind:guest="guestDetail" 
        v-bind:roomNo="input.roomDetails"
        v-on:submitBtn="submitBtn($event)"
        v-on:closeBtn="closeBtn()"
      ></GuestForm>
    </v-dialog>
    <ul class="ma-0 pa-0 mt-5" v-for="rooms in input.roomDetails" :key="rooms.key">
      <v-card width="170">
        <v-card-title class="py-2 green--text">Room {{ rooms.roomNum }}</v-card-title>
      </v-card>
      <v-btn
        v-on:click="removeGuestInRoom(rooms.roomNum)"
        icon
        outlined
        elevation="3"
        color="red"
        class="mr-8 pa-2"
        style="float: right;"
      >
        <v-icon>mdi-minus</v-icon>
      </v-btn>
      <v-btn
        v-on:click="addGuestInRoom(rooms.roomNum)"
        icon
        elevation="3"
        class="mr-2 white--text pa-2"
        style="float: right; background: #13b150"
      >
        <v-icon>mdi-plus</v-icon>
      </v-btn>
      <v-data-table
        :headers="guestHeaders"
        :items="guestInput[rooms.roomNum]"
        class="mt-5 elevation-1"
        :items-per-page="5"
        rounded
      >
        <template v-slot:item.controls="guestInfo">
          <v-btn
            color="amber darken-1"
            small
            rounded
            outlined
            class="white--text"
            v-on:click="editGuestBtn(guestInfo)"
            elevation="0"
          >
            <v-icon small>mdi-pencil</v-icon>
          </v-btn>
        </template>
      </v-data-table>
    </ul>
  </v-container>
</template>
<script>
import axios from "axios";
import GuestForm from "../components/GuestForm";
export default {
  components: { GuestForm },
  name: "CheckIn",
  data() {
    return {
      today: "",
      gender: [
        { text: "Male", value: "Male" },
        { text: "Female", value: "Female" },
        { text: "Other", value: "Other" },
      ],
      validIdType: [
        { text: "Passport", value: "Passport" },
        { text: "Drivers License", value: "Drivers License" },
        { text: "School ID", value: "School ID" },
        { text: "Senior Citizen Card", value: "Senior Citizen Card" },
        { text: "Voters Card", value: "Voters Card" },
        { text: "Postal ID", value: "Postal ID" },
        { text: "PWD ID", value: "PWD ID" },
        { text: "PhilHealth ID", value: "PhilHealth ID" },
        {
          text: "SSS Unified Multipurpose ID",
          value: "SSS Unified Multipurpose ID",
        },
        { text: "Other", value: "Other" },
      ],
      input: {
        noOfHeads: "1",
        checkInDate: new Date().toISOString().substr(0, 10),
        checkOutDate: "",
        roomDetails: [],
      },
      reservee: [],
      roomType: [],
      roomNo: [],
      services: [],
      addToService: {
        name: "",
        qty: "",
      },
      guestServices: [],
      guestBillDetails: [],
      guestBill: {
        roomNo: "101",
        total: "1000",
        balance: "900",
        received: "0",
      },
      reservationType: [
        { text: "Booking.com", value: "Booking.com" },
        { text: "Agoda", value: "Agoda" },
        { text: "Walk in", value: "Walk in" },
        { text: "AirBnB", value: "AirBnB" },
        { text: "Expedia", value: "Expedia" },
      ],
      guestHeaders: [
        {
          text: "First Name",
          value: "fname",
          class: "green--text darken-4 title",
        },
        {
          text: "Last Name",
          value: "lname",
          class: "green--text darken-4 title",
        },
        {
          text: "Gender",
          value: "gender",
          class: "green--text darken-4 title",
        },
        {
          text: "Country",
          value: "country",
          class: "green--text darken-4 title",
        },
        {
          text: "Nationality",
          value: "nationality",
          class: "green--text darken-4 title",
        },
        {
          text: "Contact",
          value: "phoneNo",
          class: "green--text darken-4 title",
        },
        {
          text: "",
          value: "controls",
          sortable: false,
          align: 'end',
          class: "green--text darken-4 title",
        },
      ],
      guestInput: {},
      checkIn: false,
      checkOut: false,
      checkInDialog: false,
      guestDetailDialog: false,
      guestDetail: {},
      date: "",
    };
  },
  methods: {
    fillReserveeDetails: function (reserveeId) {
      this.guestServices.splice(0, this.guestServices.length);
      this.guestBillDetails.splice(0, this.guestBillDetails.length);
      axios
        .get("http://localhost:3000/reservee/" + reserveeId)
        .then((res) => {
          var reserveeDetails = res.data.result.reservee[0];
          var rooms = res.data.result.rooms;
          this.input.reservationType = reserveeDetails.type;
          this.input.noOfHeads = reserveeDetails.noOfHead;
          this.input.noOfDays = reserveeDetails.noOfDays;
          this.input.checkOutDate = reserveeDetails.checkOutDate;

          if(this.input.roomDetails.length != 0) {
            this.input.roomDetails.splice(0, this.input.roomDetails.length);
          }
          for(var r = 0, k = 0; r < rooms.length; r++, k++){
            var numRoom = rooms[r].noOfRoom;
            var addRoom = {
              key: k,
              roomType: rooms[r].roomType,
            }
            if(numRoom > 1){
              for(var num = 1; num <= numRoom; num++, k++){
                var addRoom2 = {
                  key: k,
                  roomType: rooms[r].roomType,
                }
                this.input.roomDetails.push(addRoom2);
              }
            } else {
              this.input.roomDetails.push(addRoom);
            }
          }

          var totalRate;
          for (var i = totalRate = 0, resType = reserveeDetails.type; i < rooms.length; i++ ) {
            axios
              .get("http://localhost:3000/room-rate/"+rooms[i].roomType +"/"+rooms[i].noOfRoom)
              .then((response) => {
                var roomRate = response.data.rate;
                var qty = response.data.qty;
                var initialTotal = roomRate * qty * reserveeDetails.noOfDays;
                totalRate += initialTotal;

                var service = {
                  add: false,
                  name: response.data.name + " Room",
                  rate: roomRate,
                  quantity: qty,
                  status: true,
                };

                if(resType.localeCompare("Booking.com") == 0 || resType.localeCompare("Walkin") == 0) {
                  service.status = false;
                }
                this.guestServices.push(service);
                var add = [
                  {
                    name: "Room Rate",
                    total: totalRate,
                    status: "Paid",
                  },
                ];
                if(resType.localeCompare("Booking.com") == 0 || resType.localeCompare("Walkin") == 0) {
                  add[0].status = "Pending";
                }
                this.guestBillDetails = add;
              });
          }

          axios
          .get('http://localhost:3000/vacant-rooms')
          .then((roomsDB) => {
            var roomTypes = roomsDB.data.roomNo;
            this.roomNo = roomTypes;
          })
          .catch((err) => {
            console.log(err.response.data.message);
          });
        })
        .catch((err) => {
          console.log(err.response.data.message);
        });
    },
    addGuestNumber: function(num) {
      if(num > this.guestInput.length){
        var add = {
          fname: "",
          lname: "",
          gender: "",
          country: "",
          nationality: "",
          address: "",
          validId: "",
          validIdType: "",
          phoneNo: "",
        }
        for(var i = this.guestInput.length; i < num; i++){
          this.guestInput.push(add);
        }
      } else {
        for(var j = this.guestInput.length; j > num; j--){
          this.guestInput.pop();
        }
      }
    },
    addGuestInRoom: function(roomNum) {
      if(this.guestInput[roomNum] === undefined){
        this.guestInput[roomNum] = [];
      }
      var add = {
        fname: "",
        lname: "",
        gender: "",
        country: "",
        nationality: "",
        address: "",
        validId: "",
        validIdType: "",
        phoneNo: "",
      }
      this.guestInput[roomNum].push(add);
      console.log(this.guestInput);
    },
    removeGuestInRoom: function(roomNum) {
      this.guestInput[roomNum].pop();
    },
    editGuestBtn: function(data) {
      var current = data.item;
      this.guestDetail = {
        index: data.index,
        fname: current.fname,
        lname: current.lname,
        gender: current.gender,
        country: current.country,
        nationality: current.nationality,
        address: current.address,
        validId: current.validId,
        validIdType: current.validIdType,
        phoneNo: current.phoneNo,
      }
      this.guestDetailDialog = true;
    },
    submitBtn: function (data) {
      this.guestDetailDialog = false;
  
      this.$set(this.guestInput, data.index, {
        fname: data.fname,
        lname: data.lname,
        gender: data.gender,
        country: data.country,
        nationality: data.nationality,
        address: data.address,
        validId: data.validId,
        validIdType: data.validIdType,
        phoneNo: data.phoneNo,
      })
    },
    closeBtn: function () {
      this.guestDetailDialog = false;
    },
    addToList: function (input) {
      axios
        .get("http://localhost:3000/service/" + input.id)
        .then((res) => {
          var service = res.data.result[0];
          var addData = {
            add: true,
            id: input.id,
            name: service.name,
            rate: service.rate,
            quantity: input.qty,
            status: false,
          };
          this.guestServices.push(addData);
          var addBill = {
            id: input.id,
            name: service.name,
            total: service.rate * input.qty,
            status: "Pending",
          };
          this.guestBillDetails.push(addBill);
        })
        .catch((err) => {
          console.log(err.response.data.message);
        });
    },
    removeFromList: function (input) {
      var index = this.guestServices.findIndex(index => index.name === input.name);
      var billIndex = this.guestServices.findIndex(index => index.name === input.name);
      this.guestServices.splice(index, 1);
      this.guestBillDetails.splice(billIndex, 1);
    },
    checkInModal: function (bill) {
      this.checkInDialog = true;
      var totalBill = 0;
      var balance = 0;
      for (var i = 0; i < bill.length; i++) {
        totalBill += parseInt(bill[i].total);
        if (bill[i].status == "Pending") {
          balance += parseInt(bill[i].total);
        }
      }
      this.guestBill.total = totalBill;
      this.guestBill.balance = balance;
    },
    checkInGuest: function (input, guestServices, guestBillDetails, guestInput) {
      this.checkInDialog = false;
      console.log(input);
      console.log(guestServices);
      console.log(guestBillDetails);
      console.log(guestInput);
    },
    addKeyDeposit: function () {
      if (this.guestBill.keyDeposit) {
        this.guestBill.balance = parseInt(this.guestBill.balance) + 200;
      } else {
        this.guestBill.balance = parseInt(this.guestBill.balance) - 200;
      }
    },
  },
  beforeMount() {
    this.today = new Date().toISOString().slice(0, 10);
    axios
      .get('http://localhost:3000/reservee/checkin/"' + this.today + '"')
      .then((res) => {
        var reservees = res.data.result;
        for (var x = 0; x < reservees.length; x++) {
          var add = {
            value: reservees[x].id,
            reservee: reservees[x].name,
          };
          this.reservee.push(add);
        }
      })
      .catch((err) => {
        console.log(err.response.data.message);
      });

    axios
      .get("http://localhost:3000/service-mgmt")
      .then((res) => {
        var service = res.data.result;
        for (var x = 0; x < service.length; x++) {
          var add = {
            value: service[x].id,
            text: service[x].name,
          };
          this.services.push(add);
        }
      })
      .catch((err) => {
        console.log(err.response.data.message);
      });
  },
};
</script>