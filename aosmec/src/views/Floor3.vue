<template>
  <div class="dashboard">
    <v-container class="mt-10">
        <h3 class="font-weight-medium mb-5" style="color: blue-grey">
            Rooms on Floor 3
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
  name: "Floor 3",
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
          roomNo: "307",
          name: "Kim Taehyung",
          roomType: "double",
          status: "xxx"
        },
        {
          roomNo: "302",
          name: "Kim Taehyung",
          roomType: "double",
          status: "xxx"
        },
        {
          roomNo: "303",
          name: "Kim Taehyung",
          roomType: "double",
          status: "xxx"
        }
      ],
    };
  },
};
</script>

<style scoped>

</style>
