<template>
  <v-container>
    <div class="my-6">
      <v-text-field
        v-model="search"
        label="Search Name of Reservee"
        class="mx-4"
        prepend-inner-icon="mdi-magnify"
        outlined
        dense
        hide-details
      ></v-text-field>
    </div>
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
          itemsPerPageOptions: [10, 30, 50, -1]
        }"
      >
         <template v-slot:item.controls="props">
            <v-btn
              color="amber darken-2"
              small
              class="white--text"
              v-on:click="editBtn(props.item)"
            >
              <v-icon small>mdi-pencil</v-icon>
            </v-btn>
            <slot name="editDialog"></slot>
            <v-btn
              color="red"
              small
              class="ml-3 white--text"
              v-on:click="deleteBtn(props.item)"
              elevation="0"
            >
              <v-icon small>mdi-delete-outline</v-icon>
            </v-btn>
            <slot name="serviceDialog"></slot>
          </template>
          <template v-slot:expanded-item="{ headers, item }" class="test elevation-0">
            <td :colspan="headers.length">More info about {{ item.name }}</td>
          </template>
      </v-data-table>
    </template>
  </v-container>
</template>
<style scoped>
>>> .v-data-table__expanded.v-data-table__expanded__content {
  box-shadow: none !important;
  background: #f5faf1;
}
>>> .v-data-table thead span{
  font-weight: bolder;
  font-size: 13px;
}
>>> .v-data-table tbody tr:hover:not(.v-data-table__expanded__content) {
  background: none !important;
}
</style>
<script>
export default {
  data() {
    return {
      expanded: [],
      search: "",
      reservationHeaders: [
        { text: "Reserved Date", align: "start", value: "name", class: "teal--text darken-4 title"},
        { text: "Check In Date", value: "carbs", class: "teal--text darken-4 title" },
        { text: "Reservee Name", value: "calories", class: "teal--text darken-4 title" },
        { text: "Reserve Type", value: "fat", class: "teal--text darken-4 title" },
        { text: "No of Days", value: "protein", class: "teal--text darken-4 title" },
        { text: "Confirmation No", value: "iron", class: "teal--text darken-4 title" },
        { text: "Action", value: "controls", sortable: false, align: "end", class: "teal--text darken-4 title" },
        { text: "", value: "data-table-expand", align: "start", class: "teal--text darken-4 title" },
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
  },
};
</script>
