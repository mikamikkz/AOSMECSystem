<template>
  <v-container>
    <v-card class="mt-3 mx-1">
      <v-card-title class="white--text py-3" style="background: #13b150">
        <v-row>
          <v-col cols="8"> Reservation </v-col>
          <v-spacer></v-spacer>
          <v-col>
            <v-btn rounded v-on:click="addReservationDialog = true">
              Add Reservation
            </v-btn>
          </v-col>
        </v-row>
      </v-card-title>
    </v-card>
    
    <v-dialog v-model="addReservationDialog" persistent width="1100">
      <v-card>
        <v-card-title class="green white--text" fixed-header>
          Add Reservation</v-card-title>
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
                  <v-col cols="8" class="pa-0 pr-2">
                    <v-text-field
                      label="Name"
                      v-model="addReservationDetails.name"
                      color="green"
                      dense
                      prepend-icon="mdi-account"
                      outlined
                    ></v-text-field>
                  </v-col>
                  <v-col cols="4" class="pa-0 pr-2">
                    <v-select
                      v-bind:items="gender"
                      v-model="addReservationDetails.gender"
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
                      v-model="addReservationDetails.country"
                    ></CountrySelect>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col class="pa-0 pr-2">
                    <v-text-field
                      label="Email"
                      v-model="addReservationDetails.email"
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
                      v-model="addReservationDetails.phone"
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
                      v-model="addReservationDetails.reservationType"
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
                      v-model="addReservationDetails.reservationFee"
                      type="number"
                      label="Reservation Fee"
                      outlined
                      dense
                      color="green"
                      v-if="addReservationDetails.reservationType == 'Walk In'"
                    >
                    </v-text-field>
                    <v-text-field
                      v-model="addReservationDetails.confirmationNo"
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
                          v-model="addReservationDetails.checkInDate"
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
                        v-model="addReservationDetails.checkInDate"
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
                          v-model="addReservationDetails.checkOutDate"
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
                        v-model="addReservationDetails.checkOutDate"
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
                      v-model="addReservationDetails.noOfDays"
                      type="number"
                      label="No of Days"
                      outlined
                      dense
                      color="green"
                      prepend-icon="mdi-calendar-edit"
                    >
                    </v-text-field>
                  </v-col>
                  <v-spacer></v-spacer>
                  <v-col class="pa-0" xl="6" md="6" xs="12">
                    <v-text-field
                      v-model="addReservationDetails.noOfHeads"
                      type="number"
                      label="No of Head"
                      outlined
                      dense
                      color="green"
                      prepend-icon="mdi-account-multiple"
                    >
                    </v-text-field>
                  </v-col>
                </v-row>
                <v-row v-for="(roomDetail, index) in addReservationDetails.roomDetails" :key="index">
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
                      v-on:click="addNoOfAddRoomForm()"
                      ><v-icon color="green">mdi-plus-circle</v-icon></v-btn
                    >
                    <v-btn
                      icon
                      small
                      elevation="0"
                      class="mt-2"
                      v-if="index >= 0"
                      v-on:click="removeNoOfAddRoomForm(index)"
                      ><v-icon color="red">mdi-minus-circle</v-icon></v-btn
                    >
                  </v-col>
                </v-row>
              </v-card>
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-actions class="d-flex justify-center pb-6">
          <v-btn class="px-5" v-on:click="addReservationDialog = false">
            Cancel
          </v-btn>
          <v-btn
            color="light-green white--text"
            class="px-5"
            v-on:click="addReservation(addReservationDetails)"
          >
            Reserve
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
                      >: {{ item.reserveeName }}
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
    <v-dialog v-model="editReservationDialog" persistent width="1100">
      <v-card>
        <v-card-title class="green white--text" fixed-header
          >Edit Reservation</v-card-title
        >
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
                  <v-col cols="8" class="pa-0 pr-2">
                    <v-text-field
                      label="Name"
                      v-model="editReservationDetails.name"
                      color="green"
                      dense
                      prepend-icon="mdi-account"
                      outlined
                    ></v-text-field>
                  </v-col>
                  <v-col cols="4" class="pa-0 pr-2">
                    <v-select
                      v-bind:items="gender"
                      v-model="editReservationDetails.gender"
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
                      v-model="editReservationDetails.country"
                    ></CountrySelect>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col class="pa-0 pr-2">
                    <v-text-field
                      label="Email"
                      v-model="editReservationDetails.email"
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
                      v-model="editReservationDetails.phone"
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
                      v-model="editReservationDetails.reservationType"
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
                      v-model="editReservationDetails.reservationFee"
                      type="number"
                      label="Reservation Fee"
                      outlined
                      dense
                      color="green"
                      v-if="editReservationDetails.reservationType == 'Walk In'"
                    >
                    </v-text-field>
                    <v-text-field
                      v-model="editReservationDetails.confirmationNo"
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
                      v-model="checkInEdit"
                      :close-on-content-click="false"
                      :return-value.sync="date"
                      transition="scale-transition"
                      offset-y
                      min-width="auto"
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                          v-model="editReservationDetails.checkInDate"
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
                        v-model="editReservationDetails.checkInDate"
                        no-title
                        scrollable
                        color="green"
                      >
                        <v-spacer></v-spacer>
                        <v-btn
                          text
                          color="green darken-2"
                          v-on:click="checkInEdit = false"
                        >
                          Cancel
                        </v-btn>
                        <v-btn
                          text
                          color="green darken-2"
                          v-on:click="$refs.checkInEdit.save(date)"
                        >
                          OK
                        </v-btn>
                      </v-date-picker>
                    </v-menu>
                  </v-col>
                  <v-col class="pa-0 pl-3" lg="6" md="6" xs="12">
                    <v-menu
                      ref="checkOut"
                      v-model="checkOutEdit"
                      :close-on-content-click="false"
                      :return-value.sync="date"
                      transition="scale-transition"
                      offset-y
                      min-width="auto"
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                          v-model="editReservationDetails.checkOutDate"
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
                        v-model="editReservationDetails.checkOutDate"
                        no-title
                        scrollable
                        color="green"
                      >
                        <v-spacer></v-spacer>
                        <v-btn
                          text
                          color="green darken-2"
                          v-on:click="checkOutEdit = false"
                        >
                          Cancel
                        </v-btn>
                        <v-btn
                          text
                          color="green darken-2"
                          v-on:click="$refs.checkOutEdit.save(date)"
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
                      v-model="editReservationDetails.noOfDays"
                      type="number"
                      label="No of Days"
                      outlined
                      dense
                      color="green"
                      prepend-icon="mdi-calendar-edit"
                    >
                    </v-text-field>
                  </v-col>
                  <v-spacer></v-spacer>
                  <v-col class="pa-0" xl="6" md="6" xs="12">
                    <v-text-field
                      v-model="editReservationDetails.noOfHeads"
                      type="number"
                      label="No of Head"
                      outlined
                      dense
                      color="green"
                      prepend-icon="mdi-account-multiple"
                    >
                    </v-text-field>
                  </v-col>
                </v-row>
                <v-row v-for="(roomDetail, index) in editReservationDetails.roomDetails" :key="index">
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
                      v-on:click="addNoOfEditRoomForm()"
                      ><v-icon color="green">mdi-plus-circle</v-icon></v-btn
                    >
                    <v-btn
                      icon
                      small
                      elevation="0"
                      class="mt-2"
                      v-if="index >= 0"
                      v-on:click="removeNoOfEditRoomForm(index)"
                      ><v-icon color="red">mdi-minus-circle</v-icon></v-btn
                    >
                  </v-col>
                </v-row>
              </v-card>
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-actions class="d-flex justify-center pb-6">
          <v-btn class="px-5" v-on:click="editReservationDialog = false">
            Cancel
          </v-btn>
          <v-btn
            color="light-green white--text"
            class="px-7"
            v-on:click="editReservationDialog = false"
          >
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="deleteReservationDialog" persistent width="450">
      <v-card>
        <v-card-title fixed-header
          ><v-icon large color="red lighten-1" class="mr-4">mdi-alert</v-icon
          >Delete Reservation</v-card-title
        >
        <v-card-text>
          Are you sure you want to delete this reservation? This action cannot
          be undone and you will be unable to recover any data
        </v-card-text>
        <v-card-actions class="d-flex justify-center pb-6">
          <v-btn class="px-5" v-on:click="deleteReservationDialog = false">
            Cancel
          </v-btn>
          <v-btn
            color="red lighten-1 white--text"
            class="px-7"
            v-on:click="deleteReservationDialog = false"
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
            v-on:click="cancelReservationDialog = false"
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
            v-on:click="activeReservationDialog = false"
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
  background: #f8f8f8;
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
      expanded: [],
      search: "",
      addReservationDialog: false,
      editReservationDialog: false,
      deleteReservationDialog: false,
      cancelReservationDialog: false,
      activeReservationDialog: false,
      gender: [
        { text: "Male", value: "Male" },
        { text: "Female", value: "Female" },
        { text: "Other", value: "Other" },
      ],
      roomDetails: [
        { type: "", number: "" },
      ],
      addReservationDetails: { 
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
      },
      editReservationDetails: {},
      deleteReservationDetails: "",
      cancelReservationDetails: "",
      date: "",
      checkIn: "",
      checkOut: "",
      checkInEdit: "",
      checkOutEdit: "",
      roomTypes: [
        "Regular",
        "Family",
        "Budget"
      ],
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
          text: "Reservee Name",
          value: "reserveeName",
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
      reservations: [
      ],
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
    addNoOfAddRoomForm: function () {
      this.addReservationDetails.roomDetails.push({
        type: "",
        number: ""
      })
    },
    removeNoOfAddRoomForm: function (index) {
      if(this.addReservationDetails.roomDetails.length > 1){
        this.addReservationDetails.roomDetails.splice(index, 1)
      }
    },
    addNoOfEditRoomForm: function () {
      this.editReservationDetails.roomDetails.push({
        type: "",
        number: ""
      })
    },
    removeNoOfEditRoomForm: function (index) {
      if(this.editReservationDetails.roomDetails.length > 1){
        this.editReservationDetails.roomDetails.splice(index, 1)
      }
    },
    editReservationBtn: function (input) {
      this.editReservationDialog = true;
      this.editReservationDetails = {
        name: input.reserveeName,
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
      }
    },
    deleteReservationBtn: function (input) {
      this.deleteReservationDialog = true;
      this.deleteReservationDetails = {
        reservationId: input.reservationId,
        reserveeId: input.reserveeId,
        roomDetails: input.roomDetails,
      };
      console.log(this.deleteReservationDetails);
    },
    cancelReservationBtn: function(input) {
      this.cancelReservationDialog = true;
      this.cancelReservationDetails = {
        reservationId: input.reservationId,
        reserveeId: input.reserveeId,
        roomDetails: input.roomDetails,
      };
    },
    activeReservationBtn: function(input) {
      this.activeReservationDialog = true;
      this.activeReservationDetails = {
        reservationId: input.reservationId,
        reserveeId: input.reserveeId,
        roomDetails: input.roomDetails,
      };
    },
    addReservation: function (input) {
      this.addReservationDialog = false;
      input.accountId = 1;
      input.status = true;
      if(typeof input.reservationFee === 'undefined') {
        input.reservationFee = 0;
      } else if (typeof input.confirmationNo === 'undefined') {
        input.confirmationNo = "";
      }
      axios
      .post("http://localhost:3000/reservation", input)
      .then((response) => {
        console.log(response.data.message);
      })
      this.addReservationDetails = {
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
  },
  beforeMount(){
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
              noOfDays: reservation[i].reserve.noOfDays,
              noOfHeads: reservation[i].reserve.noOfHead,
              checkIn: reservation[i].reserve.checkInDate,
              checkOut: reservation[i].reserve.checkOutDate,
              reservationStatus: reservation[i].reserve.status,
              reserveeName: reservation[i].reserve.name,
              reserveeGender: reservation[i].reserve.gender,
              reserveeCountry: reservation[i].reserve.country,
              reserveeEmail: reservation[i].reserve.email,
              reserveePhone: reservation[i].reserve.phoneNo,
              roomDetails: [],
          }
          for(var j = 0; j < reservation[i].roomDetails.length; j++){
            var detail = {
              type: reservation[i].roomDetails[j].roomType,
              number: reservation[i].roomDetails[j].noOfRoom
            }
            addData.roomDetails.push(detail)
          }
          this.reservations.push(addData);
        }
        console.log(res.data.message);
      })  
      .catch((err) => {
        console.log(err.response.data.message);
      });
    axios
      .get("http://localhost:3000/room-mgmt/all")
      .then((res) => {
        var room = res.data;
        console.log(room);
      })  
      .catch((err) => {
        console.log(err.response.data.message);
      });
  }
};
</script>
