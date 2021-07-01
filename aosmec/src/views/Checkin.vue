<template>
  <v-container class="px-10">
    <v-alert
      color="red"
      dismissible
      outlined
      text
      icon="mdi-alert-outline"
      transition="scroll-y-transition"
      :value="alert"
    >{{ displayAlert }}</v-alert>
    <v-card class="mt-3">
      <v-card-title class="white--text py-3" style="background: #13b150"
        >Check In Details</v-card-title
      >
    </v-card>
    <v-row class="mt-5 pa-0" justify="center">
      <v-col lg="6" md="6" sm="12" d-flex>
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
                      v-on:click="storeOldRoom(rooms.roomNum)"
                      v-on:change="renameKey(rooms.roomNum, rooms.roomType)"
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
      <v-col lg="6" md="6" sm="12" d-flex>
        <v-card>
          <v-card-title class="mb-0 pb-0 green--text"
            >Payment Summary</v-card-title
          >
          <v-card-text>
            <v-simple-table fixed-header height="305px">
              <template v-slot:default>
                <thead>
                  <tr>
                    <th class="text-left pl-1" style="width: 45%;">Name</th>
                    <th class="text-left" style="width: 15%;">Qty</th>
                    <th class="text-left" style="width: 15%;">Total</th>
                    <th class="text-left" style="width: 25%;">Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="item in guestBillDetails" :key="item.name">
                    <td class="pl-1">{{ item.name }}</td>
                    <td>{{ item.qty }}</td>
                    <td>{{ item.total }}</td>
                    <td class="pa-0 pl-3">
                      <v-chip
                        small
                        outlined
                        color="green"
                        v-if="item.status == 'Paid'"
                      >
                        Paid
                      </v-chip>
                      <v-chip small v-else color="yellow darken-1">
                        Pending
                      </v-chip>
                    </td>
                  </tr>
                </tbody>
              </template>
            </v-simple-table>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>


    <v-dialog v-model="guestDetailDialog" width="600" persistent>
      <GuestForm
        class="pt-3"
        v-bind:guest="guestDetail" 
        v-on:submitBtn="submitBtn($event)"
        v-on:closeBtn="closeBtn()"
      ></GuestForm>
    </v-dialog>


    <ul class="pa-0 mt-2"  v-for="rooms in input.roomDetails" :key="rooms.key">
      <v-row class="pa-0" v-if="input.roomDetails[rooms.key].roomNum">
        <v-col lg="7" md="7" sm="12">
          <v-row class="pa-0">
            <v-col lg="10" md="10" sm="12">
            <v-card width="170">
              <v-card-title class="py-2 green--text">Room {{ rooms.roomNum }}</v-card-title>
            </v-card>
            </v-col>
            <v-col lg="2" md="2" sm="12" class="pt-5"> 
            <v-btn
              v-on:click="removeGuestInRoom(rooms.roomNum)"
              icon
              outlined
              elevation="3"
              color="red"
              class="mr-2 pa-2"
            >
              <v-icon>mdi-minus</v-icon>
            </v-btn>
            <v-btn
              v-on:click="addGuestInRoom(rooms.roomNum)"
              icon
              elevation="3"
              class="mr-0 white--text pa-2 float-end"
              style="background: #13b150"
            >
              <v-icon>mdi-plus</v-icon>
            </v-btn>
            </v-col>
          </v-row>
          <v-data-table
            :headers="guestHeaders"
            :items="checkInRoom[rooms.roomNum].guest"
            class="mt-5 elevation-1"
            :hide-default-footer="true"
            rounded
          >
            <template v-slot:item.controls="guestInfo">
              <v-btn
                color="amber darken-1"
                small
                rounded
                outlined
                class="white--text"
                v-on:click="editGuestBtn(guestInfo, rooms.roomNum)"
                elevation="0"
              >
                <v-icon small>mdi-pencil</v-icon>
              </v-btn>
            </template>
          </v-data-table>
        </v-col>

  
        <v-col lg="5" md="5" sm="12" v-if="input.roomDetails[rooms.key].roomNum">
          <v-card>
            <v-card-title class="mb-0 pb-0 green--text"
              >Payment Details</v-card-title
            >
            <v-card-text class="mt-0 pt-0">
              <v-simple-table fixed-header height="200px">
                <template v-slot:default>
                  <thead>
                    <tr>
                      <th class="ma-0 pa-0"></th>
                      <th class="text-left pl-1" style="width: 45%;">Name</th>
                      <th class="text-left" style="width: 15%;">Rate</th>
                      <th class="text-left" style="width: 10%;">Qty</th>
                      <th class="text-left" style="width: 15%;">Total</th>
                      <th class="text-left" style="width: 15%;">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="service in checkInRoom[rooms.roomNum].service" :key="service.name">
                      <td class="pa-0 ma-0">
                        <v-btn
                          icon
                          small
                          v-if="service.add"
                          class="pt-0 mt-0"
                          v-on:click="removeFromList(service, rooms.roomNum)"
                        >
                          <v-icon small color="red lighten-2"
                            >mdi-minus-circle</v-icon
                          >
                        </v-btn>
                      </td>
                      <td class="pl-1">{{ service.name }}</td>
                      <td>{{ service.rate }}</td>
                      <td>{{ service.quantity }}</td>
                      <td>{{ service.total }}</td>
                      <td>
                        <v-chip
                          small
                          outlined
                          color="green"
                          v-if="service.status == 'Paid'"
                        >
                          Paid
                        </v-chip>
                        <v-chip small v-else color="yellow darken-1">
                          Pending
                        </v-chip>
                      </td>
                    </tr>
                  </tbody>
                </template>
              </v-simple-table>


              <v-row v-if="addServiceForm" class="mt-2">
                <v-col lg="6" md="6" sm="12" class="pr-1">
                  <v-select
                    :items="services"
                    v-model="addToService.id"
                    label="Service Name"
                    item-text="text"
                    item-value="value"
                    dense
                    height="10"
                    outlined
                    color="green"
                    class="ml-2"
                    small
                  ></v-select>
                </v-col>
                <v-col lg="2" md="2" sm="12" class="pl-1 pr-2">
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
                <v-col lg="4" md="4" sm="12" class="ma-0 px-0">
                  <v-btn
                    class="white--text"
                    color="green"
                    dense
                    outlined
                    v-on:click="addToList(addToService, rooms.roomNum)"
                  >
                    Add
                  </v-btn>
                  <v-btn
                    class="ml-1 pa-0"
                    dense
                    outlined
                    v-on:click="addServiceForm = false"
                  >
                    Back
                  </v-btn>
                </v-col>
              </v-row>

              <v-card-actions v-else-if="checkInRoom[rooms.roomNum].status == false" class="d-flex justify-center">
                <v-btn color="success" outlined small v-on:click="addServiceForm = true">Add Service</v-btn>
                <v-btn color="success" outlined small v-on:click="checkInModal(checkInRoom[rooms.roomNum].service, rooms.roomNum)">Check In</v-btn>
              </v-card-actions>
            </v-card-text>
          </v-card>
        </v-col>
        
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
                  v-on:click="checkInGuest(input, guestBill, checkInRoom[checkInRoomNumber], checkInRoomNumber)"
                > Check In </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>

      </v-row>
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
        { text: "Airbnb", value: "Airbnb" },
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
      checkInRoom: {},
      checkIn: false,
      checkOut: false,
      checkInDialog: false,
      guestDetailDialog: false,
      guestDetail: {},
      date: "",
      alert: false,
      displayAlert: "",
      oldRoomKey: "",
      addServiceForm: false,
      checkInRoomNumber: "",
      totalReserve: 0,
      noOfCheckIn: 0,
    };
  },
  methods: {
    showAlert: function(message){
      this.alert = true;
      this.displayAlert = message;
      window.setInterval(() => {
        this.alert = false;
      }, 5000)
    },
    fillReserveeDetails: function (reserveeId) {
      this.guestBillDetails.splice(0, this.guestBillDetails.length);
      axios
        .get("http://localhost:3000/reservee/" + reserveeId)
        .then((res) => {
          var reserveeDetails = res.data.result.reservee[0];
          var rooms = res.data.result.rooms;
          this.input.id = reserveeDetails.id;
          this.input.reservationType = reserveeDetails.type;
          this.input.noOfHeads = reserveeDetails.noOfHead;
          this.input.noOfDays = reserveeDetails.noOfDays;
          this.input.checkOutDate = reserveeDetails.checkOutDate;

          if(this.input.roomDetails.length != 0) {
            this.input.roomDetails.splice(0, this.input.roomDetails.length);
          }
          var k = 0;
          for(var r = 0; r < rooms.length; r++, k++){
            var numRoom = rooms[r].noOfRoom;
            var addRoom = {
              key: k,
              roomType: rooms[r].roomType,
              roomNum: "",
            }
            if(numRoom > 1){
              for(var num = 1; num <= numRoom; num++, k++){
                var addRoom2 = {
                  key: k,
                  roomType: rooms[r].roomType,
                  roomNum: "",
                }
                this.input.roomDetails.push(addRoom2);
              }
              k--;
            } else {
              this.input.roomDetails.push(addRoom);
            }
          }

          this.totalReserve = k;

          var totalRate, totalQty = 0;
          for (var i = totalRate = 0, resType = reserveeDetails.type; i < rooms.length; i++ ) {
            axios
              .get("http://localhost:3000/room-rate/"+rooms[i].roomType +"/"+rooms[i].noOfRoom)
              .then((response) => {
                var roomRate = response.data.rate;
                var qty = response.data.qty;
                var initialTotal = roomRate * qty * reserveeDetails.noOfDays;
                totalRate += initialTotal;
                totalQty += qty;
                var add = [
                  {
                    name: "Room",
                    qty: totalQty,
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
          this.checkInRoom = {};
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
    storeOldRoom: function(old){
      if(old !== undefined){
        this.oldRoomKey = old;
      }
    },
    renameKey: function(newKey, roomType){
      newKey = newKey.toString();
      if(Object.prototype.hasOwnProperty.call(this.checkInRoom, newKey)){
        this.showAlert("Warning! Room is already taken");
      } else {
        if(this.oldRoomKey){
          this.$set(this.checkInRoom, newKey, this.checkInRoom[this.oldRoomKey])
          delete this.checkInRoom[this.oldRoomKey];

          this.oldRoomKey = undefined;
          // var temp1 = this.checkInRoom;
          // this.$set(this.checkInRoom, temp1)
          console.log(this.checkInRoom)
        } else {
          var temp = {
            guest: [],
            service: [],
            status: false,
          };
          this.$set(this.checkInRoom, newKey, temp);
          axios
            .get("http://localhost:3000/room-rate/"+roomType+"/"+1)
            .then((response) => {
              var roomRate = response.data.rate;
              var room = {
                add: false,
                name: "Room Rate",
                rate: roomRate,
                quantity: 1,
                total: roomRate,
                status: "Paid",
              };
              var resType = this.input.reservationType;
              if(resType.localeCompare("Booking.com") == 0 || resType.localeCompare("Walkin") == 0) {
                room.status = "Unpaid";
              }
              this.$set(this.checkInRoom[newKey].service, 0, room);
            });
        }
      }
    },
    addGuestInRoom: function(roomNum) {
      if(roomNum === undefined){
        this.showAlert("Warning! Please assign room before adding guest")
      } else {
        roomNum = roomNum.toString();
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
        this.checkInRoom[roomNum].guest.push(add);
      }
    },
    removeGuestInRoom: function(roomNum) {
      this.checkInRoom[roomNum].guest.pop();
    },
    editGuestBtn: function(data, room) {
      var current = data.item;
      this.guestDetail = {
        index: data.index,
        room: room,
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

      this.$set(this.checkInRoom[data.room].guest, data.index, {
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
    addToList: function (input, key) {
      axios
        .get("http://localhost:3000/service/" + input.id)
        .then((res) => {
          var service = res.data.result[0];
          
          var servId = this.checkInRoom[key].service.findIndex(service => service.id === input.id);
          if(servId > 0){
            this.checkInRoom[key].service[servId].quantity += parseInt(input.qty);
            this.checkInRoom[key].service[servId].total += service.rate * input.qty;
          } else {
            var addData = {
              add: true,
              id: input.id,
              name: service.name,
              rate: service.rate,
              quantity: parseInt(input.qty),
              total: service.rate * input.qty,
              status: "Unpaid",
            };
            this.checkInRoom[key].service.push(addData);
          }
        
          var serviceId = this.guestBillDetails.findIndex(guestBill => guestBill.id === input.id);
          if(serviceId > 0){
            this.guestBillDetails[serviceId].qty += parseInt(input.qty);
            this.guestBillDetails[serviceId].total += service.rate * input.qty;
          } else {
            var addBill = {
              id: input.id,
              name: service.name,
              qty: parseInt(input.qty),
              total: service.rate * input.qty,
              status: "Unpaid",
            };
            this.guestBillDetails.push(addBill);
          }
        })
        .catch((err) => {
          console.log(err.response.data.message);
        });
    },
    removeFromList: function (input, key) {
      var index = this.checkInRoom[key].service.findIndex(index => index.name === input.name);
      var billIndex = this.checkInRoom[key].service.findIndex(index => index.name === input.name);
      this.checkInRoom[key].service.splice(index, 1);

      if(this.guestBillDetails[billIndex].qty == parseInt(input.quantity)){
        this.guestBillDetails.splice(billIndex, 1);
      } else {
        this.guestBillDetails[billIndex].qty -= parseInt(input.quantity);
      }
    },
    checkInModal: function (bill, roomNum) {
      this.checkInDialog = true;
      var totalBill = 0;
      var balance = 0;
      this.guestBill.roomNo = roomNum;
      for (var i = 0; i < bill.length; i++) {
        totalBill += parseInt(bill[i].total);
        if (bill[i].status == "Unpaid") {
          balance += parseInt(bill[i].total);
        }
      }
      this.guestBill.total = totalBill;
      this.guestBill.balance = balance;
      this.checkInRoomNumber = roomNum;
    },
    checkInGuest: function (input, totalBill, checkIn, roomNum) {
      this.checkInDialog = false;
      console.log(input);
      console.log(checkIn);
      console.log(totalBill);
      var services = checkIn.service;

      console.log(roomNum)
      console.log(services);
      for (var i = 0; i < services.length; i++) {
        if (services[i].status == "Unpaid") {
          this.checkInRoom[roomNum].service[i].status = "Paid";
        }
      }
      this.noOfCheckIn++;

      this.checkInRoom[roomNum].status = true;
      if(this.totalReserve == this.noOfCheckIn){
        location.reload();
      }
    },
    addKeyDeposit: function () {
      if (this.guestBill.keyDeposit) {
        this.guestBill.balance = parseInt(this.guestBill.balance) + 200;
      } else {
        this.guestBill.balance = parseInt(this.guestBill.balance) - 200;
      }
    },
  },
  mounted() {
    this.today();
    if(localStorage.status){
      this.$store.state.status = localStorage.status
    }
    console.log(localStorage.status)
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