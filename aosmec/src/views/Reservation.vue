<template>
  <v-container>
    <v-card class="mt-3">
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
        <v-card-title class="green white--text" fixed-header> Add Reservation</v-card-title>
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
                <CountrySelect></CountrySelect>
              </v-col>
            </v-row>
            <v-row>
              <v-col class="pa-0 pr-2">
                <v-text-field
                  label="Email"
                  v-model="addReservationDetails.name"
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
                  v-model="addReservationDetails.name"
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
                    :items="roomType"
                    v-model="addReservationDetails.roomType"
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
                <v-col class="pa-0 pl-3" lg="7" md="7" xs="12" >
                  <v-text-field
                    v-model="addReservationDetails.confirmationNo"
                    type="number"
                    label="Confirmation No"
                    outlined
                    dense
                    color="green"
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
              <v-row  v-for="(room, i) in noOfAddRoomForm" :key="i">
                <v-col class="pa-0" lg="5" md="5" xs="12">
                  <v-select
                    :items="roomType"
                    v-model="addReservationDetails.roomType"
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
                    v-model="addReservationDetails.noOfRooms"
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
                  <v-btn icon small color="success" elevation="0" class="mt-2" v-on:click="addNoOfAddRoomForm()"><v-icon color="green">mdi-plus-circle</v-icon></v-btn>
                  <v-btn icon small color="success" elevation="0" class="mt-2" v-on:click="removeNoOfAddRoomForm()"><v-icon color="red">mdi-minus-circle</v-icon></v-btn>
                </v-col>
              </v-row>
              <v-row  v-for="(service, i) in noOfAddServiceForm" :key="i">
                <v-col class="pa-0" lg="7" md="7" xs="12">
                  <v-select
                    :items="services"
                    v-model="addReservationDetails.service"
                    label="Service"
                    prepend-icon="mdi-hand-heart-outline"
                    item-text="text"
                    item-value="value"
                    outlined
                    dense
                    color="green"
                  ></v-select>
                </v-col>
                <v-col class="pa-0 pl-3" xl="2" md="2" xs="12">
                  <v-btn icon small color="success" elevation="0" class="mt-2" v-on:click="addNoOfAddServiceForm()"><v-icon color="green">mdi-plus-circle</v-icon></v-btn>
                  <v-btn icon small color="success" elevation="0" class="mt-2" v-on:click="removeNoOfAddServiceForm()"><v-icon color="red">mdi-minus-circle</v-icon></v-btn>
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
            v-on:click="addReservationDialog = false"
          >
            Reserve
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-card class="my-6">
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
    <v-card>
      <template>
        <v-data-table
          :headers="reservationHeaders"
          :items="reservations"
          :single-expand="true"
          :expanded.sync="expanded"
          item-key="name"
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
              class="white--text"
              v-on:click="editReservationBtn(props.item)"
            >
              <v-icon small>mdi-pencil</v-icon>
            </v-btn>
            <v-btn
              color="deep-orange lighten-1"
              small
              class="ml-1 white--text"
              v-on:click="cancelReservationBtn(props.item)"
              elevation="0"
            >
              <v-icon small>mdi-cancel</v-icon>
            </v-btn>
            <v-btn
              color="red"
              small
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
                      <v-card flat color="blue-grey lighten-4" class="pa-1 pl-3">Reservation Details</v-card>
                    </v-col>
                  </v-row>
                  <v-row class="pl-3">
                    <v-col cols="4" class="py-2"> Id </v-col>
                    <v-col cols="8" class="py-2">: {{ item.reservationId }} </v-col>
                  </v-row>
                  <v-row class="pl-3">
                    <v-col cols="4" class="py-2"> Type </v-col>
                    <v-col cols="8" class="py-2">: {{ item.reservationType }} </v-col>
                  </v-row>
                  <v-row class="pl-3">
                    <v-col cols="4" class="py-2"> Confirmation Number </v-col>
                    <v-col cols="8" class="py-2">: {{ item.confirmationNo }} </v-col>
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
                      <v-card flat color="blue-grey lighten-4" class="pa-1 pl-3">Room Details</v-card>
                    </v-col>
                  </v-row>
                  <v-row class="pl-3">
                    <v-col cols="4" class="py-2"> No of Head </v-col>
                    <v-col cols="8" class="py-2">: {{ item.noOfHeads }} </v-col>
                  </v-row>
                  <v-row class="pl-3">
                    <v-col cols="4" class="py-2"> Room Type</v-col>
                    <v-col cols="8" class="py-2">: {{ item.roomType }} </v-col>
                  </v-row>
                  <v-row class="pl-3">
                    <v-col cols="4" class="py-2"> No of Room </v-col>
                    <v-col cols="8" class="py-2">: {{ item.noOfRoom }} </v-col>
                  </v-row>
                  <v-row class="pl-3">
                    <v-col cols="4" class="py-2"> Service </v-col>
                    <v-col cols="8" class="py-2">: {{ item.serviceName }} </v-col>
                  </v-row>
                </v-col>
                <v-col cols="4">
                  <v-row>
                    <v-col cols="12">
                      <v-card flat color="blue-grey lighten-4" class="pa-1 pl-3">Reservee Details</v-card>
                    </v-col>
                  </v-row>
                  <v-row class="pl-3">
                    <v-col cols="4" class="py-2"> Id </v-col>
                    <v-col cols="8" class="py-2">: {{ item.reserveeId }} </v-col>
                  </v-row>
                  <v-row class="pl-3">
                    <v-col cols="4" class="py-2"> Name </v-col>
                    <v-col cols="8" class="py-2">: {{ item.reserveeName }} </v-col>
                  </v-row>
                  <v-row class="pl-3">
                    <v-col cols="4" class="py-2"> Gender</v-col>
                    <v-col cols="8" class="py-2">: {{ item.reserveeGender }} </v-col>
                  </v-row>
                  <v-row class="pl-3">
                    <v-col cols="4" class="py-2"> Country </v-col>
                    <v-col cols="8" class="py-2">: {{ item.reserveeCountry }} </v-col>
                  </v-row>
                  <v-row class="pl-3">
                    <v-col cols="4" class="py-2"> Email </v-col>
                    <v-col cols="8" class="py-2">: {{ item.reserveeEmail }} </v-col>
                  </v-row>
                  <v-row class="pl-3">
                    <v-col cols="4" class="py-2"> Phone No </v-col>
                    <v-col cols="8" class="py-2">: {{ item.reserveePhone }} </v-col>
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
        <v-card-title class="green white--text" fixed-header>Edit Reservation</v-card-title>
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
                <CountrySelect></CountrySelect>
              </v-col>
            </v-row>
            <v-row>
              <v-col class="pa-0 pr-2">
                <v-text-field
                  label="Email"
                  v-model="editReservationDetails.name"
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
                  v-model="editReservationDetails.name"
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
                    v-bind:items="roomType"
                    v-model="editReservationDetails.roomType"
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
                <v-col class="pa-0 pl-3" lg="7" md="7" xs="12" >
                  <v-text-field
                    v-model="editReservationDetails.confirmationNo"
                    type="number"
                    label="Confirmation No"
                    outlined
                    dense
                    color="green"
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
              <v-row  v-for="(room, i) in noOfEditRoomForm" :key="i">
                <v-col class="pa-0" lg="5" md="5" xs="12">
                  <v-select
                    :items="roomType"
                    v-model="editReservationDetails.roomType"
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
                    v-model="editReservationDetails.noOfRooms"
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
                  <v-btn icon small color="success" elevation="0" class="mt-2" v-on:click="addNoOfEditRoomForm()"><v-icon color="green">mdi-plus-circle</v-icon></v-btn>
                  <v-btn icon small color="success" elevation="0" class="mt-2" v-on:click="removeNoOfEditRoomForm()"><v-icon color="red">mdi-minus-circle</v-icon></v-btn>
                </v-col>
              </v-row>
              <v-row  v-for="(service, i) in noOfEditServiceForm" :key="i">
                <v-col class="pa-0" lg="7" md="7" xs="12">
                  <v-select
                    :items="services"
                    v-model="addReservationDetails.service"
                    label="Service"
                    prepend-icon="mdi-hand-heart-outline"
                    item-text="text"
                    item-value="value"
                    outlined
                    dense
                    color="green"
                  ></v-select>
                </v-col>
                <v-col class="pa-0 pl-3" xl="2" md="2" xs="12">
                  <v-btn icon small color="success" elevation="0" class="mt-2" v-on:click="addNoOfEditServiceForm()"><v-icon color="green">mdi-plus-circle</v-icon></v-btn>
                  <v-btn icon small color="success" elevation="0" class="mt-2" v-on:click="removeNoOfEditServiceForm()"><v-icon color="red">mdi-minus-circle</v-icon></v-btn>
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
        <v-card-title fixed-header><v-icon large color="red lighten-1" class="mr-4">mdi-alert</v-icon>Delete Reservation</v-card-title>
        <v-card-text>
          Are you sure you want to delete this reservation? This action cannot be undone and you will be unable to recover any data
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
export default {
  components: { CountrySelect },
  data() {
    return {
      expanded: [],
      search: "",
      addReservationDialog: false,
      editReservationDialog: false,
      deleteReservationDialog: false,
      gender: [
        { text: "Male", value: "Male" },
        { text: "Female", value: "Female" },
        { text: "Other", value: "Other" },
      ],
      addReservationDetails: [],
      editReservationDetails: [],
      date: "",
      checkIn: "",
      checkOut: "",
      roomType: [],
      noOfAddRoomForm: 1,
      noOfAddServiceForm: 1,
      noOfEditRoomForm: 1,
      noOfEditServiceForm: 1,
      services: [],
      reservationHeaders: [
        {
          text: "Reserved Date",
          align: "start",
          value: "name",
          class: "green--text darken-4 title",
        },
        {
          text: "Check In Date",
          value: "carbs",
          class: "green--text darken-4 title",
        },
        {
          text: "Reservee Name",
          value: "calories",
          class: "green--text darken-4 title",
        },
        {
          text: "Reserve Type",
          value: "fat",
          class: "green--text darken-4 title",
        },
        {
          text: "No of Days",
          value: "protein",
          class: "green--text darken-4 title",
        },
        {
          text: "Confirmation No",
          value: "iron",
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
        {
          name: "Frozen Yogurt",
          calories: 159,
          fat: 6.0,
          carbs: 24,
          protein: 4.0,
          iron: "1%",
        },
        {
          name: "Ice cream sandwich",
          calories: 237,
          fat: 9.0,
          carbs: 37,
          protein: 4.3,
          iron: "1%",
        },
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
      this.noOfAddRoomForm = parseInt(this.noOfAddRoomForm, 10) + 1;
    },
    removeNoOfAddRoomForm: function () {
      if(this.noOfAddRoomForm > 1){
        this.noOfAddRoomForm = parseInt(this.noOfAddRoomForm, 10) - 1;
      }
    },
    addNoOfEditRoomForm: function () {
      this.noOfEditRoomForm = parseInt(this.noOfEditRoomForm, 10) + 1;
    },
    removeNoOfEditRoomForm: function () {
      if(this.noOfEditRoomForm > 1){
        this.noOfEditRoomForm = parseInt(this.noOfEditRoomForm, 10) - 1;
      }
    },
    addNoOfServiceForm: function () {
      this.noOfServiceForm = parseInt(this.noOfServiceForm, 10) + 1;
    },
    removeNoOfServiceForm: function () {
      if(this.noOfServiceForm > 1){
        this.noOfServiceForm = parseInt(this.noOfServiceForm, 10) - 1;
      }
    },
    editReservationBtn: function(reservation){
      this.editReservationDialog = true;
      console.log(reservation);
    },
    deleteReservationBtn: function(reservation){
      this.deleteReservationDialog = true;
      console.log(reservation);
    }
  },
};
</script>
