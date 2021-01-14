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
                    v-model="checkbox"
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
        <v-card>
          <v-card-title class="green--text">Guest Details</v-card-title>
          <v-card-text class="mt-3">
            <v-form class="px-3">
              <v-row>
                <v-col class="pa-0 pr-2" lg="6" md="6" xs="12">
                  <v-text-field
                    v-model="input.fname"
                    label="First Name"
                    prepend-icon="mdi-account"
                    outlined
                    dense
                    color="green"
                  ></v-text-field>
                </v-col>
                <v-col class="pa-0 pl-1" lg="6" md="6" xs="12">
                  <v-text-field
                    v-model="input.lname"
                    label="Last Name"
                    outlined
                    dense
                    color="green"
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col class="pa-0 pr-2" lg="4" md="4" xs="12">
                  <v-select
                    v-bind:items="gender"
                    v-model="input.gender"
                    item-text="text"
                    item-value="value"
                    label="Gender"
                    prepend-icon="mdi-gender-male-female"
                    outlined
                    dense
                    color="green"
                  ></v-select>
                </v-col>
                <v-col class="pa-0 pl-8" lg="8" md="8" xs="12">
                  <v-select
                    v-bind:items="nationality"
                    v-model="input.nationality"
                    item-text="text"
                    item-value="value"
                    label="Nationality"
                    prepend-icon="mdi-account-child"
                    outlined
                    dense
                    color="green"
                  ></v-select>
                </v-col>
              </v-row>
              <v-row>
                <v-col class="pa-0 pr-2" lg="6" md="6" xs="12">
                  <v-text-field
                    v-model="input.validId"
                    label="Valid ID"
                    prepend-icon="mdi-passport"
                    outlined
                    dense
                    color="green"
                  ></v-text-field>
                </v-col>
                <v-col class="pa-0 pl-1" lg="6" md="6" xs="12">
                  <v-select
                    v-bind:items="validIdType"
                    v-model="input.validIdType"
                    item-text="text"
                    item-value="value"
                    label="Valid Id Type"
                    outlined
                    dense
                    color="green"
                  ></v-select>
                </v-col>
              </v-row>
              <v-row>
                <v-select
                  v-bind:items="country"
                  v-model="input.country"
                  item-text="text"
                  item-value="value"
                  label="Country"
                  prepend-icon="mdi-earth"
                  outlined
                  dense
                  color="green"
                ></v-select>
              </v-row>
              <v-row>
                <v-text-field
                  v-model="input.address"
                  label="Address"
                  prepend-icon="mdi-map-marker"
                  outlined
                  dense
                  color="green"
                ></v-text-field>
              </v-row>
              <v-row>
                <v-text-field
                  v-model="input.phoneNo"
                  label="Contact Number"
                  prepend-icon="mdi-phone"
                  outlined
                  dense
                  color="green"
                ></v-text-field>
              </v-row>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "CheckIn",
  data() {
    return {
      input: {
        fname: "",
        lname: "",
        checkInDate: new Date().toISOString().substr(0, 10),
        checkOutDate: "",
      },
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
        { text: "SSS Unified Multipurpose ID", value: "SSS Unified Multipurpose ID" },
        { text: "Other", value: "Other" },
      ],
      country: [
        { text: "Afghanistan", value: "Afghanistan" },
        { text: "Albania", value: "Albania" },
        { text: "Algeria", value: "Algeria" },
        { text: "American Samoa", value: "American Samoa" },
        { text: "Andorra", value: "Andorra" },
        { text: "Angola", value: "Angola" },
        { text: "Anguilla", value: "Anguilla" },
        { text: "Antarctica", value: "Antarctica" },
        { text: "Antigua And Barbuda", value: "Antigua And Barbuda" },
        { text: "Argentina", value: "Argentina" },
        { text: "Armenia", value: "Armenia" },
        { text: "Aruba", value: "Aruba" },
        { text: "Australia", value: "Australia" },
        { text: "Austria", value: "Austria" },
        { text: "Azerbaijan", value: "Azerbaijan" },
        { text: "Bahamas", value: "Bahamas" },
        { text: "Bahrain", value: "Bahrain" },
        { text: "Bangladesh", value: "Bangladesh" },
        { text: "Barbados", value: "Barbados" },
        { text: "Belarus", value: "Belarus" },
        { text: "Belgium", value: "Belgium" },
        { text: "Belize", value: "Belize" },
        { text: "Benin", value: "Benin" },
        { text: "Bermuda", value: "Bermuda" },
        { text: "Bhutan", value: "Bhutan" },
        { text: "Bolivia", value: "Bolivia" },
        { text: "Bosnia And Herzegovina", value: "Bosnia And Herzegovina" },
        { text: "Botswana", value: "Botswana" },
        { text: "Bouvet Island", value: "Bouvet Island" },
        { text: "Brazil", value: "Brazil" },
        { text: "British Indian Ocean Territory", value: "British Indian Ocean Territory" },
        { text: "Brunei Darussalam", value: "Brunei Darussalam" },
        { text: "Bulgaria", value: "Bulgaria" },
        { text: "Burkina Faso", value: "Burkina Faso" },
        { text: "Burundi", value: "Burundi" },
        { text: "Cambodia", value: "Cambodia" },
        { text: "Cameroon", value: "Cameroon" },
        { text: "Canada", value: "Canada" },
        { text: "Cape Verde", value: "Cape Verde" },
        { text: "Cayman Islands", value: "Cayman Islands" },
        { text: "Central African Republic", value: "Central African Republic" },
        { text: "Chad", value: "Chad" },
        { text: "Chile", value: "Chile" },
        { text: "China", value: "China" },
        { text: "Christmas Island", value: "Christmas Island" },
        { text: "Cocos (keeling) Islands", value: "Cocos (keeling) Islands" },
        { text: "Colombia", value: "Colombia" },
        { text: "Comoros", value: "Comoros" },
        { text: "Congo", value: "Congo" },
        { text: "Congo, The Democratic Republic Of The", value: "Congo, The Democratic Republic Of The" },
        { text: "Cook Islands", value: "Cook Islands" },
        { text: "Costa Rica", value: "Costa Rica" },
        { text: "Cote D'ivoire", value: "Cote D'ivoire" },
        { text: "Croatia", value: "Croatia" },
        { text: "Cuba", value: "Cuba" },
        { text: "Cyprus", value: "Cyprus" },
        { text: "Czech Republic", value: "Czech Republic" },
        { text: "Denmark", value: "Denmark" },
        { text: "Djibouti", value: "Djibouti" },
        { text: "Dominica", value: "Dominica" },
        { text: "Dominican Republic", value: "Dominican Republic" },
        { text: "East Timor", value: "East Timor" },
        { text: "Ecuador", value: "Ecuador" },
        { text: "Egypt", value: "Egypt" },
        { text: "El Salvador", value: "El Salvador" },
        { text: "Equatorial Guinea", value: "Equatorial Guinea" },
        { text: "Eritrea", value: "Eritrea" },
        { text: "Estonia", value: "Estonia" },
        { text: "Ethiopia", value: "Ethiopia" },
        { text: "Falkland Islands (malvinas)", value: "Falkland Islands (malvinas)" },
        { text: "Faroe Islands", value: "Faroe Islands" },
        { text: "Fiji", value: "Fiji" },
        { text: "Finland", value: "Finland" },
        { text: "France", value: "France" },
        { text: "French Guiana", value: "French Guiana" },
        { text: "French Polynesia", value: "French Polynesia" },
        { text: "French Southern Territories", value: "French Southern Territories" },
        { text: "Gabon", value: "Gabon" },
        { text: "Gambia", value: "Gambia" },
        { text: "Georgia", value: "Georgia" },
        { text: "Germany", value: "Germany" },
        { text: "Ghana", value: "Ghana" },
        { text: "Gibraltar", value: "Gibraltar" },
        { text: "Greece", value: "Greece" },
        { text: "Greenland", value: "Greenland" },
        { text: "Grenada", value: "Grenada" },
        { text: "Guadeloupe", value: "Guadeloupe" },
        { text: "Guam", value: "Guam" },
        { text: "Guatemala", value: "Guatemala" },
        { text: "Guinea", value: "Guinea" },
        { text: "Guinea-bissau", value: "Guinea-bissau" },
        { text: "Guyana", value: "Guyana" },
        { text: "Haiti", value: "Haiti" },
        { text: "Heard Island And Mcdonald Islands", value: "Heard Island And Mcdonald Islands" },
        { text: "Holy See (vatican City State)", value: "Holy See (vatican City State)" },
        { text: "Honduras", value: "Honduras" },
        { text: "Hong Kong", value: "Hong Kong" },
        { text: "Hungary", value: "Hungary" },
        { text: "Iceland", value: "Iceland" },
        { text: "India", value: "India" },
        { text: "Indonesia", value: "Indonesia" },
        { text: "Iran, Islamic Republic Of", value: "Iran, Islamic Republic Of" },
        { text: "Iraq", value: "Iraq" },
        { text: "Ireland", value: "Ireland" },
        { text: "Israel", value: "Israel" },
        { text: "Italy", value: "Italy" },
        { text: "Jamaica", value: "Jamaica" },
        { text: "Japan", value: "Japan" },
        { text: "Jordan", value: "Jordan" },
        { text: "Kazakstan", value: "Kazakstan" },
        { text: "Kenya", value: "Kenya" },
        { text: "Kiribati", value: "Kiribati" },
        { text: "Korea, Democratic People's Republic Of", value: "Korea, Democratic People's Republic Of" },
        { text: "Korea, Republic Of", value: "Korea, Republic Of" },
        { text: "Kosovo", value: "Kosovo" },
        { text: "Kuwait", value: "Kuwait" },
        { text: "Kyrgyzstan", value: "Kyrgyzstan" },
        { text: "Lao People's Democratic Republic", value: "Lao People's Democratic Republic" },
        { text: "Latvia", value: "Latvia" },
        { text: "Lebanon", value: "Lebanon" },
        { text: "Lesotho", value: "Lesotho" },
        { text: "Liberia", value: "Liberia" },
        { text: "Libyan Arab Jamahiriya", value: "Libyan Arab Jamahiriya" },
        { text: "Liechtenstein", value: "Liechtenstein" },
        { text: "Lithuania", value: "Lithuania" },
        { text: "Luxembourg", value: "Luxembourg" },
        { text: "Macau", value: "Macau" },
        { text: "Macedonia, The Former Yugoslav Republic Of", value: "Macedonia, The Former Yugoslav Republic Of" },
        { text: "Madagascar", value: "Madagascar" },
        { text: "Malawi", value: "Malawi" },
        { text: "Malaysia", value: "Malaysia" },
        { text: "Maldives", value: "Maldives" },
        { text: "Mali", value: "Mali" },
        { text: "Malta", value: "Malta" },
        { text: "Marshall Islands", value: "Marshall Islands" },
        { text: "Martinique", value: "Martinique" },
        { text: "Mauritania", value: "Mauritania" },
        { text: "Mauritius", value: "Mauritius" },
        { text: "Mayotte", value: "Mayotte" },
        { text: "Mexico", value: "Mexico" },
        { text: "Micronesia, Federated States Of", value: "Micronesia, Federated States Of" },
        { text: "Moldova, Republic Of", value: "Moldova, Republic Of" },
        { text: "Monaco", value: "Monaco" },
        { text: "Mongolia", value: "Mongolia" },
        { text: "Montserrat", value: "Montserrat" },
        { text: "Montenegro", value: "Montenegro" },
        { text: "Morocco", value: "Morocco" },
        { text: "Mozambique", value: "Mozambique" },
        { text: "Myanmar", value: "Myanmar" },
        { text: "Namibia", value: "Namibia" },
        { text: "Nauru", value: "Nauru" },
        { text: "Nepal", value: "Nepal" },
        { text: "Netherlands", value: "Netherlands" },
        { text: "Netherlands Antilles", value: "Netherlands Antilles" },
        { text: "New Caledonia", value: "New Caledonia" },
        { text: "New Zealand", value: "New Zealand" },
        { text: "Nicaragua", value: "Nicaragua" },
        { text: "Niger", value: "Niger" },
        { text: "Nigeria", value: "Nigeria" },
        { text: "Niue", value: "Niue" },
        { text: "Norfolk Island", value: "orfolk Island" },
        { text: "Northern Mariana Islands", value: "Northern Mariana Islands" },
        { text: "Norway", value: "Norway" },
        { text: "Oman", value: "Oman" },
        { text: "Pakistan", value: "Pakistan" },
        { text: "Palau", value: "Palau" },
        { text: "Palestinian Territory, Occupied", value: "Palestinian Territory, Occupied" },
        { text: "Panama", value: "Panama" },
        { text: "Papua New Guinea", value: "Papua New Guinea" },
        { text: "Paraguay", value: "Paraguay" },
        { text: "Peru", value: "Peru" },
        { text: "Philippines", value: "Philippines" },
        { text: "Pitcairn", value: "Pitcairn" },
        { text: "Poland", value: "Poland" },
        { text: "Portugal", value: "Portugal" },
        { text: "Puerto Rico", value: "Puerto Rico" },
        { text: "Qatar", value: "Qatar" },
        { text: "Reunion", value: "Reunion" },
        { text: "Romania", value: "Romania" },
        { text: "Russian Federation", value: "Russian Federation" },
        { text: "Rwanda", value: "Rwanda" },
        { text: "Saint Helena", value: "Saint Helena" },
        { text: "Saint Kitts And Nevis", value: "Saint Kitts And Nevis" },
        { text: "Saint Lucia", value: "Saint Lucia" },
        { text: "Saint Pierre And Miquelon", value: "Saint Pierre And Miquelon" },
        { text: "Saint Vincent And The Grenadines", value: "Saint Vincent And The Grenadines" },
        { text: "Samoa", value: "Samoa" },
        { text: "San Marino", value: "San Marino" },
        { text: "Sao Tome And Principe", value: "Sao Tome And Principe" },
        { text: "Saudi Arabia", value: "Saudi Arabia" },
        { text: "Senegal", value: "Senegal" },
        { text: "Serbia", value: "Serbia" },
        { text: "Seychelles", value: "Seychelles" },
        { text: "Sierra Leone", value: "Sierra Leone" },
        { text: "Singapore", value: "Singapore" },
        { text: "Slovakia", value: "Slovakia" },
        { text: "Slovenia", value: "Slovenia" },
        { text: "Solomon Islands", value: "Solomon Islands" },
        { text: "Somalia", value: "Somalia" },
        { text: "South Africa", value: "South Africa" },
        { text: "South Georgia And The South Sandwich Islands", value: "South Georgia And The South Sandwich Islands" },
        { text: "Spain", value: "Spain" },
        { text: "Sri Lanka", value: "Sri Lanka" },
        { text: "Sudan", value: "Sudan" },
        { text: "Suriname", value: "Suriname" },
        { text: "Svalbard And Jan Mayen", value: "Svalbard And Jan Mayen" },
        { text: "Swaziland", value: "Swaziland" },
        { text: "Sweden", value: "Sweden" },
        { text: "Switzerland", value: "Switzerland" },
        { text: "Syrian Arab Republic", value: "Syrian Arab Republic" },
        { text: "Taiwan, Province Of China", value: "Taiwan, Province Of China" },
        { text: "Tajikistan", value: "Tajikistan" },
        { text: "Tanzania, United Republic Of", value: "Tanzania, United Republic Of" },
        { text: "Thailand", value: "Thailand" },
        { text: "Togo", value: "Togo" },
        { text: "Tokelau", value: "Tokelau" },
        { text: "Tonga", value: "Tonga" },
        { text: "Trinidad And Tobago", value: "Trinidad And Tobago" },
        { text: "Tunisia", value: "Tunisia" },
        { text: "Turkey", value: "Turkey" },
        { text: "Turkmenistan", value: "Turkmenistan" },
        { text: "Turks And Caicos Islands", value: "Turks And Caicos Islands" },
        { text: "Tuvalu", value: "Tuvalu" },
        { text: "Uganda", value: "Uganda" },
        { text: "Ukraine", value: "Ukraine" },
        { text: "United Arab Emirates", value: "United Arab Emirates" },
        { text: "United Kingdom", value: "United Kingdom" },
        { text: "United States", value: "United States" },
        { text: "United States Minor Outlying Islands", value: "United States Minor Outlying Islands" },
        { text: "Uruguay", value: "Uruguay" },
        { text: "Uzbekistan", value: "Uzbekistan" },
        { text: "Vanuatu", value: "Vanuatu" },
        { text: "Venezuela", value: "Venezuela" },
        { text: "Vietnam", value: "Vietnam" },
        { text: "Virgin Islands, British", value: "Virgin Islands, British" },
        { text: "Virgin Islands, U.s.", value: "Virgin Islands, U.s." },
        { text: "Wallis And Futuna", value: "Wallis And Futuna" },
        { text: "Western Sahara", value: "Western Sahara" },
        { text: "Yemen", value: "Yemen" },
        { text: "Zambia", value: "Zambia" },
        { text: "Zimbab", value: "Zimbab" },
      ],
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
    };
  },
};
</script>