<template>
  <div class="dashboard">
    <v-container class="mt-10">
      <v-toolbar class="ml-0 mb-4" flat color="grey lighten-2">
        <v-toolbar-title>
            <h5 class="font-weight-medium pa-0 ma-0 pt-3" style="color: green">
              <v-icon x-large left color="success" style="margin-bottom: 12px">mdi-home-floor-1</v-icon>
              ROOMS ON FLOOR 1
            </h5>
        </v-toolbar-title>
        <v-spacer></v-spacer>
      </v-toolbar>
      <v-data-table
        dense
        :headers="headers"
        :items="rooms"
        :items-per-page="10"
      ></v-data-table>
    </v-container>
  </div>
</template>

<script>
export default {
  name: "Floor 1",
  components: {},
  data() {
    return {
      headers: [
        {
          text: "Room No.",
          value: "roomNo",
          class: "green lighten-1 | px-4 pt-4 pb-3 | text-uppercase",
          sortable: true,
        },
        {
          text: "Occupancy",
          value: "name",
          class: "green lighten-1 | px-4 pt-4 pb-3 | text-uppercase",
          sortable: true,
        },
        {
          text: "Type of Room",
          value: "roomType",
          class: "green lighten-1 | px-4 pt-4 pb-3 | text-uppercase",
          sortable: false,
        },
        {
          text: "Status",
          value: "status",
          class: "green lighten-1 | px-4 pt-4 pb-3 | text-uppercase",
          sortable: false,
        },
        {
          text: "Check-out",
          value: "checkout",
          class: "green lighten-1 | px-4 pt-4 pb-3 | text-uppercase",
          sortable: false,
        },
      ],
      rooms: [
        {
          roomNo: "107",
          name: "Kim Taehyung",
          roomType: "double",
          status: "xxx",
        },
        {
          roomNo: "102",
          name: "Kim Taehyung",
          roomType: "double",
          status: "xxx",
        },
        {
          roomNo: "112",
          name: "Kim Taehyung",
          roomType: "single",
          status: "xxx",
        },
        {
          roomNo: "114",
          name: "Kim Taehyung",
          roomType: "single",
          status: "xxx",
        },
        {
          roomNo: "105",
          name: "Kim Taehyung",
          roomType: "double",
          status: "xxx",
        },
        {
          roomNo: "106",
          name: "Kim Taehyung",
          roomType: "double",
          status: "xxx",
        },
        {
          roomNo: "109",
          name: "Kim Taehyung",
          roomType: "family room",
          status: "xxx",
        },
      ],
    };
  },
};
</script>

<style scoped>
</style>
