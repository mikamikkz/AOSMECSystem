<template>
  <v-container>
    <v-card class="mx-10 mt-5">
      <v-card-title class="white--text" style="background: #13b150"
        >Check In Details</v-card-title
      >
    </v-card>
    <v-row class="mx-8 mt-5 pa-0">
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
                <v-col class="pa-0">
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
              </v-row>
              <v-row>
                <v-col class="pa-0">
                  <v-text-field
                    v-model="input.noOfDays"
                    label="Number of Days"
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
                  <v-select
                    :items="noOfHeads"
                    v-model="input.noOfHeads"
                    item-text="text"
                    item-value="value"
                    label="No of Head"
                    prepend-icon="mdi-account-multiple"
                    outlined
                    dense
                    color="green"
                  ></v-select>
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
      <v-col lg="7" md="7" sm="12" d-flex>
        <GuestForm></GuestForm>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import GuestForm from "../components/GuestForm"
export default {
  components: { GuestForm },
  name: "CheckIn",
  data() {
    return {
      input: {
        fname: "",
        lname: "",
        checkInDate: new Date().toISOString().substr(0, 10),
        checkOutDate: "",
      },
      reservee: [],
      roomType: [],
      reservationType: [
        { text: "Booking.com", value: "Booking.com" },
        { text: "Agoda", value: "Agoda" },
        { text: "Walk in", value: "Walk in" },
        { text: "AirBnB", value: "AirBnB" },
        { text: "Expedia", value: "Expedia" },
      ],
      noOfHeads: [
        { text: "1", value: "1" },
        { text: "2", value: "2" },
        { text: "3", value: "3" },
        { text: "4", value: "4" },
        { text: "5", value: "5" },
      ],
      checkIn: false,
      checkOut: false,
      date: '',
    };
  },
};
</script>