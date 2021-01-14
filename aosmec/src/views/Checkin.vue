<template>
  <v-container>
    <v-card>
      <v-card-title class="teal white--text">Check In Details</v-card-title>
      <v-card-text class="mt-8">
        <v-form>
          <v-row
          class="px-10">
          <v-col
          class="pa-0 pr-2"
          cols="6"
          sm="6">
            <v-text-field
              v-model="input.fname"
              label="First Name"
              outlined
              dense
            ></v-text-field>
          </v-col>
          <v-col
          class="pa-0 pl-1"
          cols="6"
          sm="6">
            <v-text-field
              v-model="input.lname"
              label="Last Name"
              outlined
              dense
            ></v-text-field>
          </v-col>
          </v-row>
        </v-form>
      </v-card-text>
    </v-card>
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
      }
    }
  }
}
</script>