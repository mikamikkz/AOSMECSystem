<template>
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
            <NationalitySelect></NationalitySelect>
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
          <CountrySelect></CountrySelect>
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
</template>
<script>
import CountrySelect from "../components/CountrySelect";
import NationalitySelect from "../components/NationalitySelect";
export default {
  name: "GuestForm",
  components: { CountrySelect, NationalitySelect },
  data() {
    return {
      input: [],
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
    };
  },
};
</script>