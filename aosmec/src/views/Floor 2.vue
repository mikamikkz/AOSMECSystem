<template>
  <div class="dashboard">
    <v-container class="mt-10">
        <h3 class="font-weight-medium mb-5" style="color: blue-grey">
            Rooms on Floor 2
          </h3>
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
  name: "Floor 2",
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
      ],
      rooms: [
        {
          roomNo: "207",
          name: "Kim Taehyung",
          roomType: "double",
          status: "xxx"
        },
        {
          roomNo: "202",
          name: "Kim Taehyung",
          roomType: "double",
          status: "xxx"
        },
        {
          roomNo: "212",
          name: "Kim Taehyung",
          roomType: "single",
          status: "xxx"
        },
        {
          roomNo: "214",
          name: "Kim Taehyung",
          roomType: "family room",
          status: "xxx"
        },
        {
          roomNo: "205",
          name: "Kim Taehyung",
          roomType: "double",
          status: "xxx"
        },
        {
          roomNo: "206",
          name: "Kim Taehyung",
          roomType: "double",
          status: "xxx"
        },
        {
          roomNo: "222",
          name: "Kim Taehyung",
          roomType: "single",
          status: "xxx"
        }
      ],
    };
  },
};
</script>

<style scoped>

</style>
