<template>
  <v-container>
    <v-card class="mx-7 mt-5">
      <v-card-title class="white--text" style="background: #13b150"
        >Check In Details</v-card-title
      >
    </v-card>
    <v-row class="mx-4 mt-5 pa-0">
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
                    item-text="text"
                    item-value="value"
                    outlined
                    dense
                    color="green"
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
                  ></v-select>
                </v-col>
              </v-row>
              <v-row>
                <v-col class="pa-0" lg="8" md="8" xs="12">
                  <v-select
                    :items="roomType"
                    v-model="input.roomType"
                    label="Room Type"
                    prepend-icon="mdi-door"
                    item-text="text"
                    item-value="value"
                    outlined
                    dense
                    color="green"
                  ></v-select>
                </v-col>
                <v-col class="pa-0 pl-3" lg="4" md="4" xs="12">
                  <v-select
                    :items="roomNo"
                    v-model="input.roomNo"
                    label="Room No"
                    item-text="text"
                    item-value="value"
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
                    prepend-icon="mdi-account-multiple"
                    v-on:change="changeNoOfGuestForm(input.noOfHeads)"
                  >
                  </v-text-field>
                </v-col>
                <v-spacer></v-spacer>
                <v-col class="pa-0" xl="2">
                  <v-checkbox
                    class="mt-1"
                    v-model="input.keyDeposit"
                    color="green"
                    label="Key Deposit"
                  ></v-checkbox>
                </v-col>
              </v-row>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col lg="4" md="4" sm="12" d-flex>
        <v-card>
          <v-card-title class="green--text">Additional Service</v-card-title>
          <v-card-text>
            <v-simple-table fixed-header>
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
                      <v-checkbox
                        success
                        v-model="service.status"
                        v-if="service.add"
                        class="pa-0 ml-1"
                      ></v-checkbox>
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
        </v-card>
      </v-col>
      <v-col lg="3" md="3" sm="12" d-flex>
        <v-card>
          <v-card-title class="green--text">Payment Details</v-card-title>
          <v-card-text class="mt-3"> </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-row class="mx-4 mt-5 pa-0">
      <v-col
        lg="6"
        md="6"
        sm="12"
        d-flex
        v-for="guest in noOfGuestForm"
        :key="guest"
      >
        <GuestForm></GuestForm>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import GuestForm from "../components/GuestForm";
export default {
  components: { GuestForm },
  name: "CheckIn",
  data() {
    return {
      input: {
        fname: "",
        lname: "",
        noOfHeads: "1",
        checkInDate: new Date().toISOString().substr(0, 10),
        checkOutDate: "",
      },
      noOfGuestForm: 1,
      reservee: [],
      roomType: [],
      roomNo: [],
      services: [
        { text: "Sample", value: "Sample" },
        { text: "Sample2", value: "Sample2" },
      ],
      addToService: {
        name: "",
        qty: "",
      },
      guestServices: [
        {
          add: false,
          name: "Room Rate",
          rate: "14700",
          quantity: "1",
          status: true,
        },
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
      reservationType: [
        { text: "Booking.com", value: "Booking.com" },
        { text: "Agoda", value: "Agoda" },
        { text: "Walk in", value: "Walk in" },
        { text: "AirBnB", value: "AirBnB" },
        { text: "Expedia", value: "Expedia" },
      ],
      checkIn: false,
      checkOut: false,
      date: "",
    };
  },
  methods: {
    changeNoOfGuestForm: function (noOfHeads) {
      this.noOfGuestForm = parseInt(noOfHeads, 10);
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
};
</script>