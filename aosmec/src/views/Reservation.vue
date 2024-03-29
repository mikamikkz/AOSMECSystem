<template>
  <v-container class="mb-7">
    <v-overlay :value="loader">
      <v-progress-circular
        indeterminate
        :size="70"
        :width="7"
      ></v-progress-circular>
    </v-overlay>
    <v-card class="mt-3 mx-1">
      <v-card-title class="white--text py-3" style="background: #13b150">
        <v-row>
          <v-col cols="8"> Reservation </v-col>
          <v-spacer></v-spacer>
          <v-col>
            <v-btn rounded v-on:click="addReservationBtn()">
              Add Reservation
            </v-btn>
          </v-col>
        </v-row>
      </v-card-title>
    </v-card>
    
    <v-dialog v-model="reservationDialog" persistent width="1100">
      <v-card>
        <v-card-title class="green white--text" fixed-header>
          {{ reservationModalHeader }} Reservation</v-card-title>
        <v-card-text class="mt-5">
          <v-row>
            <v-col cols="6">
              <v-chip
                color="light-green white--text font-weight-bold"
                style="font-size: 16px"
              >
                Reservee Details
              </v-chip>
              <v-card outlined class="mt-3 px-7 py-3">
                <v-row class="mt-1">
                  <v-col cols="4" class="pa-0 pr-2">
                    <v-text-field
                      label="First Name"
                      v-model="reservationDetails.fname"
                      color="green"
                      dense
                      prepend-icon="mdi-account"
                      outlined
                    ></v-text-field>
                  </v-col>
                  <v-col cols="4" class="pa-0 pr-2">
                    <v-text-field
                      label="Last Name"
                      v-model="reservationDetails.lname"
                      color="green"
                      dense
                      outlined
                    ></v-text-field>
                  </v-col>
                  <v-col cols="4" class="pa-0 pr-2">
                    <v-select
                      v-bind:items="gender"
                      v-model="reservationDetails.gender"
                      item-text="text"
                      item-value="value"
                      label="Gender"
                      prepend-icon="mdi-gender-male-female"
                      outlined
                      dense
                      color="green"
                    ></v-select>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col class="pa-0 pr-2">
                    <CountrySelect
                      v-model="reservationDetails.country"
                    ></CountrySelect>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col class="pa-0 pr-2">
                    <v-text-field
                      label="Email"
                      v-model="reservationDetails.email"
                      color="green"
                      dense
                      prepend-icon="mdi-email"
                      outlined
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col class="pa-0 pr-2">
                    <v-text-field
                      label="Phone Number"
                      v-model="reservationDetails.phone"
                      color="green"
                      dense
                      prepend-icon="mdi-phone"
                      outlined
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-card>
            </v-col>
            <v-col cols="6">
              <v-chip
                color="light-green white--text font-weight-bold"
                style="font-size: 16px"
              >
                Reservation Details
              </v-chip>
              <v-card outlined class="mt-3 px-7 py-3">
                <v-row class="mt-1">
                  <v-col class="pa-0" lg="5" md="5" xs="12">
                    <v-select
                      :items="reservationTypes"
                      v-model="reservationDetails.reservationType"
                      label="Reservation Type"
                      prepend-icon="mdi-room-service-outline"
                      item-text="text"
                      item-value="value"
                      outlined
                      dense
                      color="green"
                    ></v-select>
                  </v-col>
                  <v-spacer></v-spacer>
                  <v-col class="pa-0 pl-3" lg="7" md="7" xs="12">
                    <v-text-field
                      v-model="reservationDetails.reservationFee"
                      type="number"
                      label="Reservation Fee"
                      outlined
                      dense
                      color="green"
                      v-if="reservationDetails.reservationType == 'Walk In'"
                    >
                    </v-text-field>
                    <v-text-field
                      v-model="reservationDetails.confirmationNo"
                      label="Confirmation No"
                      outlined
                      dense
                      color="green"
                      v-else
                    >
                    </v-text-field>
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
                          v-model="reservationDetails.checkInDate"
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
                        v-model="reservationDetails.checkInDate"
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
                          v-model="reservationDetails.checkOutDate"
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
                        v-model="reservationDetails.checkOutDate"
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
                      v-model="reservationDetails.noOfDays"
                      type="number"
                      label="No of Days"
                      outlined
                      dense
                      color="green"
                      min="1"
                      disabled
                      prepend-icon="mdi-calendar-edit"
                    >
                    </v-text-field>
                  </v-col>
                  <v-spacer></v-spacer>
                  <v-col class="pa-0" xl="6" md="6" xs="12">
                    <v-text-field
                      v-model="reservationDetails.noOfHeads"
                      type="number"
                      label="No of Head"
                      outlined
                      dense
                      min="1"
                      color="green"
                      prepend-icon="mdi-account-multiple"
                    >
                    </v-text-field>
                  </v-col>
                </v-row>
                <v-row v-for="(roomDetail, index) in reservationDetails.roomDetails" :key="index">
                  <v-col class="pa-0" lg="5" md="5" xs="12">
                    <v-select
                      :items="roomTypes"
                      v-model="roomDetail.type"
                      label="Room Type"
                      prepend-icon="mdi-bed-outline"
                      item-text="text"
                      item-value="value"
                      outlined
                      dense
                      color="green"
                    ></v-select>
                  </v-col>
                  <v-col class="pa-0 pl-3" xl="5" md="5" xs="12">
                    <v-text-field
                      v-model="roomDetail.number"
                      type="number"
                      label="No of Room"
                      outlined
                      dense
                      color="green"
                      min="1"
                      prepend-icon="mdi-door"
                    >
                    </v-text-field>
                  </v-col>
                  <v-col class="pa-0 pl-3" xl="2" md="2" xs="12">
                    <v-btn
                      icon
                      small
                      color="success"
                      elevation="0"
                      class="mt-2"
                      v-if="index == 0"
                      v-on:click="addNoOfRoomForm(reservationDetails, roomDetail)"
                      ><v-icon color="green">mdi-plus-circle</v-icon></v-btn
                    >
                    <v-btn
                      icon
                      small
                      elevation="0"
                      class="mt-2"
                      v-if="index >= 0"
                      v-on:click="removeNoOfRoomForm(index, reservationDetails)"
                      ><v-icon color="red">mdi-minus-circle</v-icon></v-btn
                    >
                  </v-col>
                </v-row>
              </v-card>
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-actions class="d-flex justify-center pb-6">
          <v-btn class="px-5" v-on:click="reservationDialog = false">
            Cancel
          </v-btn>
          <v-btn
            color="light-green white--text"
            class="px-5"
            v-on:click="saveReservation(reservationDetails)"
          >
            {{ reservationModalButton }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-card class="my-6 mx-1">
      <v-text-field
        v-model="search"
        label="Search Name of Reservee"
        prepend-inner-icon="mdi-magnify"
        color="green"
        outlined
        dense
        hide-details
      ></v-text-field>
    </v-card>
    <v-card class="mx-1">
      <template>
        <v-data-table
          :headers="reservationHeaders"
          :items="reservations"
          :single-expand="true"
          :expanded.sync="expanded"
          item-key="reservationId"
          show-expand
          :search="search"
          sort-by="checkIn"
          :custom-filter="filter"
          class="elevation-1"
          :footer-props="{
            itemsPerPageText: 'Rerservation Per Page',
            itemsPerPageOptions: [10, 30, 50, -1],
          }"
        >
          <template v-slot:item.controls="props">
            <v-btn
              color="amber darken-2"
              small
              rounded
              class="white--text"
              v-on:click="editReservationBtn(props.item)"
              elevation="0"
            >
              <v-icon small>mdi-pencil</v-icon>
            </v-btn>
            <v-btn
              color="deep-orange lighten-1"
              small
              rounded
              v-if="props.item.reservationStatus == true"
              class="ml-1 white--text"
              v-on:click="cancelReservationBtn(props.item)"
              elevation="0"
            >
              <v-icon small>mdi-cancel</v-icon>
            </v-btn>
            <v-btn
              color="light-green"
              small
              rounded
              v-if="props.item.reservationStatus == false"
              class="ml-1 white--text"
              v-on:click="activeReservationBtn(props.item)"
              elevation="0"
            >
              <v-icon small>mdi-power</v-icon>
            </v-btn>
            <v-btn
              color="red"
              small
              rounded
              class="ml-1 white--text"
              v-on:click="deleteReservationBtn(props.item)"
              elevation="0"
            >
              <v-icon small>mdi-delete-outline</v-icon>
            </v-btn>
          </template>
          <template
            v-slot:expanded-item="{ headers, item }"
            class="test elevation-0"
          >
            <td :colspan="headers.length">
              <v-row class="mt-2 mb-3">
                <v-col cols="4">
                  <v-row>
                    <v-col cols="12">
                      <v-card flat color="blue-grey lighten-4" class="pa-1 pl-3"
                        >Reservation Details</v-card
                      >
                    </v-col>
                  </v-row>
                  <v-row class="pl-3">
                    <v-col cols="4" class="py-2"> Id </v-col>
                    <v-col cols="8" class="py-2"
                      >: {{ item.reservationId }}
                    </v-col>
                  </v-row>
                  <v-row class="pl-3">
                    <v-col cols="4" class="py-2"> Type </v-col>
                    <v-col cols="8" class="py-2"
                      >: {{ item.reservationType }}
                    </v-col>
                  </v-row>
                  <v-row class="pl-3" v-if=" item.reservationType == 'Walk In'">
                    <v-col cols="4" class="py-2"> Reservation Fee </v-col>
                    <v-col cols="8" class="py-2"
                      >: Php{{ item.reservationFee }}
                    </v-col>
                  </v-row>
                  <v-row class="pl-3" v-else>
                    <v-col cols="4" class="py-2"> Booking No </v-col>
                    <v-col cols="8" class="py-2"
                      >: {{ item.confirmationNo }}
                    </v-col>
                  </v-row>
                  <v-row class="pl-3">
                    <v-col cols="4" class="py-2"> Reserved Date </v-col>
                    <v-col cols="8" class="py-2"
                      >: {{ item.reservedDate }}
                    </v-col>
                  </v-row>
                  <v-row class="pl-3">
                    <v-col cols="4" class="py-2"> No of Days </v-col>
                    <v-col cols="8" class="py-2">: {{ item.noOfDays }} </v-col>
                  </v-row>
                  <v-row class="pl-3">
                    <v-col cols="4" class="py-2"> Check In Date </v-col>
                    <v-col cols="8" class="py-2">: {{ item.checkIn }} </v-col>
                  </v-row>
                  <v-row class="pl-3">
                    <v-col cols="4" class="py-2"> Check Out Date </v-col>
                    <v-col cols="8" class="py-2">: {{ item.checkOut }} </v-col>
                  </v-row>
                </v-col>
                <v-col cols="4">
                  <v-row>
                    <v-col cols="12">
                      <v-card flat color="blue-grey lighten-4" class="pa-1 pl-3"
                        >Room Details</v-card
                      >
                    </v-col>
                  </v-row>
                  <v-row class="pl-3">
                    <v-col cols="4" class="py-2"> No of Head </v-col>
                    <v-col cols="8" class="py-2">: {{ item.noOfHeads }} </v-col>
                  </v-row>
                  <v-row class="pl-3" v-for="(room, index) in item.roomDetails" :key="room.type">
                    <v-col cols="4" class="py-2"> <span v-if="index == 0">Room</span> </v-col>
                    <v-col cols="8" class="py-2">: {{ room.number }} {{ room.type }}</v-col>
                  </v-row>
                </v-col>
                <v-col cols="4">
                  <v-row>
                    <v-col cols="12">
                      <v-card flat color="blue-grey lighten-4" class="pa-1 pl-3"
                        >Reservee Details</v-card
                      >
                    </v-col>
                  </v-row>
                  <v-row class="pl-3">
                    <v-col cols="4" class="py-2"> Name </v-col>
                    <v-col cols="8" class="py-2"
                      >: {{ item.reserveeFname + " " + item.reserveeLname  }}
                    </v-col>
                  </v-row>
                  <v-row class="pl-3">
                    <v-col cols="4" class="py-2"> Gender</v-col>
                    <v-col cols="8" class="py-2"
                      >: {{ item.reserveeGender }}
                    </v-col>
                  </v-row>
                  <v-row class="pl-3">
                    <v-col cols="4" class="py-2"> Country </v-col>
                    <v-col cols="8" class="py-2"
                      >: {{ item.reserveeCountry }}
                    </v-col>
                  </v-row>
                  <v-row class="pl-3">
                    <v-col cols="4" class="py-2"> Email </v-col>
                    <v-col cols="8" class="py-2"
                      >: {{ item.reserveeEmail }}
                    </v-col>
                  </v-row>
                  <v-row class="pl-3">
                    <v-col cols="4" class="py-2"> Phone No </v-col>
                    <v-col cols="8" class="py-2"
                      >: {{ item.reserveePhone }}
                    </v-col>
                  </v-row>
                </v-col>
              </v-row>
            </td>
          </template>
        </v-data-table>
      </template>
    </v-card>
    <v-dialog v-model="deleteReservationDialog" persistent width="450">
      <v-card>
        <v-card-title fixed-header
          ><v-icon large color="red lighten-1" class="mr-4">mdi-alert</v-icon
          >Delete Reservation</v-card-title
        >
        <v-card-text>
          Are you sure you want to delete this reservation? This action cannot
          be undone.
        </v-card-text>
        <v-card-actions class="d-flex justify-center pb-6">
          <v-btn class="px-5" v-on:click="deleteReservationDialog = false">
            Cancel
          </v-btn>
          <v-btn
            color="red lighten-1 white--text"
            class="px-7"
            v-on:click="deleteReservationDialogBtn(deleteReservationDetails)"
          >
            Delete
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="cancelReservationDialog" persistent width="450">
      <v-card>
        <v-card-title fixed-header
          ><v-icon large color="orange darken-2" class="mr-4">mdi-alert</v-icon
          >Cancel Reservation</v-card-title
        >
        <v-card-text>
          Are you sure you want to cancel this reservation?
        </v-card-text>
        <v-card-actions class="d-flex justify-center pb-6">
          <v-btn class="px-9" v-on:click="cancelReservationDialog = false">
            No
          </v-btn>
          <v-btn
            color="orange darken-2 white--text"
            class="px-9"
            v-on:click="cancelReservationDialogBtn(cancelReservationDetails)"
          >
            Yes
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="activeReservationDialog" persistent width="450">
      <v-card>
        <v-card-title fixed-header
          ><v-icon large color="orange darken-2" class="mr-4">mdi-alert</v-icon
          >Activate Reservation</v-card-title
        >
        <v-card-text>
          Are you sure you want to revoke cancellation this reservation?
        </v-card-text>
        <v-card-actions class="d-flex justify-center pb-6">
          <v-btn class="px-9" v-on:click="activeReservationDialog = false">
            No
          </v-btn>
          <v-btn
            color="orange darken-2 white--text"
            class="px-9"
            v-on:click="activeReservationDialogBtn(activeReservationDetails)"
          >
            Yes
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>
<style scoped>
>>> .v-data-table__expanded.v-data-table__expanded__content {
  box-shadow: none !important;
  background:#f8f8f8;
}
>>> .v-data-table thead span {
  font-weight: bolder;
  font-size: 13px;
}
>>> .v-data-table tbody tr:hover:not(.v-data-table__expanded__content) {
  background: none !important;
}
</style>
<script>
import CountrySelect from "../components/CountrySelect";
import axios from "axios";

export default {
  components: { CountrySelect },
  data() {
    return {
      loader: false,
      today: "",
      expanded: [],
      search: "",
      reservationDialog: false,
      deleteReservationDialog: false,
      cancelReservationDialog: false,
      activeReservationDialog: false,
      reservationModalHeader: "",
      reservationModalButton: "",
      gender: [
        { text: "Male", value: "Male" },
        { text: "Female", value: "Female" },
        { text: "Other", value: "Other" },
      ],
      roomDetails: [
        { type: "", number: "" },
      ],
      reservationDetails: {},
      deleteReservationDetails: "",
      cancelReservationDetails: "",
      date: "",
      checkIn: "",
      checkOut: "",
      checkInEdit: "",
      checkOutEdit: "",
      roomTypes: [],
      reservationTypes: [
        { text: "Booking.com", value: "Booking.com" },
        { text: "Agoda", value: "Agoda" },
        { text: "Walk In", value: "Walk In" },
        { text: "Expedia", value: "Expedia" },
        { text: "Airbnb", value: "Airbnb" },
      ],
      reservationHeaders: [
        {
          text: "Check In Date",
          align: "start",
          value: "checkIn",
          class: "green--text darken-4 title",
        },
        {
          text: "First Name",
          value: "reserveeFname",
          class: "green--text darken-4 title",
        },
        {
          text: "Last Name",
          value: "reserveeLname",
          class: "green--text darken-4 title",
        },
        {
          text: "Reserve Type",
          value: "reservationType",
          class: "green--text darken-4 title",
        },
        {
          text: "No of Days",
          value: "noOfDays",
          class: "green--text darken-4 title",
        },
        {
          text: "",
          value: "controls",
          sortable: false,
          align: "end",
          class: "green--text darken-4 title",
        },
        {
          text: "",
          value: "data-table-expand",
          align: "start",
          class: "green--text darken-4 title",
        },
      ],
      reservations: [],
    };
  },
  methods: {
    filter(value, search) {
      return (
        value != null &&
        search != null &&
        typeof value === "string" &&
        value
          .toString()
          .toLocaleUpperCase()
          .indexOf(search.toLocaleUpperCase()) !== -1
      );
    },
    addNoOfRoomForm: function (input) {
      if(typeof input.index === 'undefined'){
        this.reservationDetails.roomDetails.push({
          type: "",
          number: ""
        });
      } else {
        const add = {
          reservationId: input.id,
          roomType: "",
          noOfRoom: 1
        };
        axios
        .post("http://localhost:3000/room-reserve", add)
        .then((res)=>{
          this.reservationDetails.roomDetails.push({
            id: res.data.id,
            type: "",
            number: ""
          });
        })
        
      }
    },
    removeNoOfRoomForm: function (index, input) {
      if(typeof input.index === 'undefined'){
        if(this.reservationDetails.roomDetails.length > 1){
          this.reservationDetails.roomDetails.splice(index, 1)
        }
      } else {
        axios
        .delete("http://localhost:3000/room-reserve/"+ input.roomDetails[index].id)
        .then(()=>{
          this.reservationDetails.roomDetails.splice(index, 1)
        })
      }
    },
    addReservationBtn: function(){
      this.reservationModalHeader = "Add";
      this.reservationModalButton = "Reserve";
      this.reservationDialog = true;
      this.reservationDetails = {
        name: "",
        gender: "",
        country: "",
        email: "",
        phone: "",
        reservationType: "",
        confirmationNo: "",
        checkInDate: "",
        checkOutDate: "",
        noOfDays: "",
        noOfHeads: "",
        roomDetails: [
          { type: "", number: "" },
        ],
      }
    },
    editReservationBtn: function (input) {
      this.reservationDialog = true;
      this.reservationModalHeader = "Edit";
      this.reservationModalButton = "Save";
      const index = this.reservations.indexOf(input);
      this.reservationDetails = {
        index: index,
        id: input.reservationId,
        fname: input.reserveeFname,
        lname: input.reserveeLname,
        gender: input.reserveeGender,
        country: input.reserveeCountry,
        email: input.reserveeEmail,
        phone: input.reserveePhone,
        reservationType: input.reservationType,
        confirmationNo: input.confirmationNo,
        reservationFee: input.reservationFee,
        checkInDate: input.checkIn,
        checkOutDate: input.checkOut,
        noOfDays: input.noOfDays,
        noOfHeads: input.noOfHeads,
        roomDetails: input.roomDetails,
        status: true
      }
    },
    deleteReservationBtn: function (input) {
      this.deleteReservationDialog = true;
      this.deleteReservationDetails = {
        index: this.reservations.indexOf(input),
        id: input.reservationId,
        reserveeId: input.reserveeId,
        roomDetails: input.roomDetails,
      };
    },
    deleteReservationDialogBtn(input){
      this.loader = true;
      axios
      .patch("http://localhost:3000/reservation/delete/"+input.id)
      .then(() => {
        this.loader = false;
        this.reservations.splice(input.index, 1)
        this.deleteReservationDialog = false;
      })
    },
    cancelReservationBtn: function(input) {
      this.cancelReservationDialog = true;
      this.cancelReservationDetails = {
        index: this.reservations.indexOf(input),
        id: input.reservationId,
        reserveeId: input.reserveeId,
        roomDetails: input.roomDetails,
      };
    },
    cancelReservationDialogBtn(input){
      this.loader = true
      this.cancelReservationDialog = false;
      axios
      .patch("http://localhost:3000/reservation/cancel/"+input.id)
      .then(() => {
        this.loader = false;
        var temp = this.reservations[input.index];
        temp.reservationStatus = false;
        this.$set(this.reservations, input.index, temp);
      })
    },
    activeReservationBtn: function(input) {
      this.activeReservationDialog = true;
      this.activeReservationDetails = {
        index: this.reservations.indexOf(input),
        id: input.reservationId,
        reserveeId: input.reserveeId,
        roomDetails: input.roomDetails,
      };
    },
    activeReservationDialogBtn(input){
      this.loader = true;
      this.activeReservationDialog = false;
      axios
      .patch("http://localhost:3000/reservation/activate/"+input.id)
      .then(() => {
        this.loader = false;
        var temp = this.reservations[input.index];
        temp.reservationStatus = true;
        this.$set(this.reservations, input.index, temp);
      })
    },
    saveReservation: function (input) {
      this.loader = true;
      if(typeof this.reservationDetails.index === 'undefined'){
        input.accountId = parseInt(this.$store.state.status);
        input.status = true;
        if(typeof input.reservationFee === 'undefined') {
          input.reservationFee = null;
        } else if (typeof input.confirmationNo === 'undefined') {
          input.confirmationNo = null;
        }
        axios
        .post("http://localhost:3000/reservation", input)
        .then((res) => {
          const addData = {
            reservationId: res.data.id,
            reserveeFname: input.fname,
            reserveeLname: input.lname,
            reserveeGender: input.gender,
            reserveeCountry: input.country,
            reserveeEmail: input.email,
            reserveePhone: input.phone,
            reservationType: input.reservationType,
            confirmationNo: input.confirmationNo,
            reservationFee: input.reservationFee,
            checkIn: input.checkInDate,
            checkOut: input.checkOutDate,
            noOfDays: input.noOfDays,
            noOfHeads: input.noOfHeads,
            roomDetails: input.roomDetails,
            reservationStatus: true,
            reservedDate: this.today,
          }
          this.reservations.push(addData);
          this.loader = false;
        })
      } else {
        axios
        .patch("http://localhost:3000/reservation/"+input.id, input)
        .then(() => {
          const resDate = this.reservations[input.index].reservedDate;
          this.$set(this.reservations, input.index, {
            reservationId: input.id,
            reserveeFname: input.fname,
            reserveeLname: input.lname,
            reserveeGender: input.gender,
            reserveeCountry: input.country,
            reserveeEmail: input.email,
            reserveePhone: input.phone,
            reservationType: input.reservationType,
            confirmationNo: input.confirmationNo,
            reservationFee: input.reservationFee,
            checkIn: input.checkInDate,
            checkOut: input.checkOutDate,
            noOfDays: input.noOfDays,
            noOfHeads: input.noOfHeads,
            roomDetails: input.roomDetails,
            reservationStatus: true,
            reservedDate: resDate,
          })
          this.loader = false;
        })
      }
      
      this.reservationDialog = false;
    },
  },
  watch:{
    'reservationDetails.checkOutDate': function() {
      if(this.reservationDetails.checkOutDate !== "" && this.reservationDetails.checkInDate !== ""){
        var checkOut = this.reservationDetails.checkOutDate;
        var scheckOut = checkOut.split('-');
        checkOut = scheckOut[0]+scheckOut[1]+scheckOut[2];

        var checkIn = this.reservationDetails.checkInDate;
        var scheckIn = checkIn.split('-');
        checkIn = scheckIn[0]+scheckIn[1]+scheckIn[2];
        this.reservationDetails.noOfDays = checkOut-checkIn;
      }
    }
  },
  mounted() {
    if(localStorage.status){
      this.$store.state.status = localStorage.status
    }
  },
  beforeMount(){
    this.today = new Date().toISOString().slice(0, 10);
    axios
      .get("http://localhost:3000/reservation")
      .then((res) => {
        var reservation = res.data.data;
        for(var i = 0; i < reservation.length; i++){
          var addData = {
              reservedDate: reservation[i].reserve.createdAt,
              reservationId: reservation[i].reserve.id,
              reservationType: reservation[i].reserve.type,
              confirmationNo: reservation[i].reserve.confirmationNo,
              reservationFee: reservation[i].reserve.reservationFee,
              noOfDays: reservation[i].reserve.noOfDays,
              noOfHeads: reservation[i].reserve.noOfHead,
              checkIn: reservation[i].reserve.checkInDate,
              checkOut: reservation[i].reserve.checkOutDate,
              reservationStatus: reservation[i].reserve.status,
              reserveeFname: reservation[i].reserve.fname,
              reserveeLname: reservation[i].reserve.lname,
              reserveeGender: reservation[i].reserve.gender,
              reserveeCountry: reservation[i].reserve.country,
              reserveeEmail: reservation[i].reserve.email,
              reserveePhone: reservation[i].reserve.phoneNo,
              roomDetails: [],
          }
          for(var j = 0; j < reservation[i].roomDetails.length; j++){
            var detail = {
              id: reservation[i].roomDetails[j].id,
              type: reservation[i].roomDetails[j].roomType,
              number: reservation[i].roomDetails[j].noOfRoom
            }
            addData.roomDetails.push(detail)
          }
          this.reservations.push(addData);
        }
      })  
      .catch((err) => {
        console.log(err.response.data.message);
      });
    axios
      .get("http://localhost:3000/room-mgmt/all")
      .then((res) => {
        var rooms = res.data.result;
        for(var x = 0; x < rooms.length; x++){
          this.roomTypes.push(rooms[x].name)
        }
      })  
      .catch((err) => {
        console.log(err.response.data.message);
      });
  }
};
</script>
