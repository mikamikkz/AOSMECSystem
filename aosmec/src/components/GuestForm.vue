<template>
  <v-card>
    <v-btn icon v-on:click="closeBtn()" class="mr-3 mt-3" style="float: right">
      <v-icon>mdi-close</v-icon>
    </v-btn>
    <v-card-title class="green--text">Guest Details</v-card-title>
    <v-card-text class="mt-3">
      <v-form class="px-3">
        <v-row>
          <v-col class="pa-0 pr-2" lg="6" md="6" xs="12">
            <v-text-field
              v-model="guest.fname"
              label="First Name"
              prepend-icon="mdi-account"
              outlined
              dense
              color="green"
            ></v-text-field>
          </v-col>
          <v-col class="pa-0 pl-1" lg="6" md="6" xs="12">
            <v-text-field
              v-model="guest.lname"
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
              v-model="guest.gender"
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
            <NationalitySelect v-model="guest.nationality"></NationalitySelect>
          </v-col>
        </v-row>
        <v-row>
          <v-col class="pa-0 pr-2" lg="6" md="6" xs="12">
            <v-text-field
              v-model="guest.validId"
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
              v-model="guest.validIdType"
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
          <CountrySelect v-model="guest.country"></CountrySelect>
        </v-row>
        <v-row>
          <v-text-field
            v-model="guest.address"
            label="Address"
            prepend-icon="mdi-map-marker"
            outlined
            dense
            color="green"
          ></v-text-field>
        </v-row>
        <v-row>
          <v-text-field
            v-model="guest.phoneNo"
            label="Contact Number"
            prepend-icon="mdi-phone"
            outlined
            dense
            color="green"
          ></v-text-field>
        </v-row>
      </v-form>
      <v-card-actions class="d-flex justify-center pb-6">
        <v-btn
          color="success"
          class="px-8"
          v-on:click="submitBtn(guest)"
        >
          Submit
        </v-btn>
      </v-card-actions>
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
    };
  },
  props: {
    guest: {
      type: Object,
    }
  },
  methods: {
    submitBtn: function (data) {
      this.$emit("submitBtn", data);
    },
    closeBtn: function () {
      this.$emit("closeBtn");
    },
  }
};
</script>