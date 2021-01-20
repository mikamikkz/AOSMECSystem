<template>
  <v-container>
    <v-row>
      <v-col cols="3" class="mt-3">
        <v-menu
          ref="menu"
          v-model="menu"
          :close-on-content-click="false"
          :return-value.sync="date"
          transition="scale-transition"
          offset-y
          min-width="auto"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              v-model="dateReport"
              prepend-icon="mdi-calendar"
              readonly
              color="green"
              v-bind="attrs"
              v-on="on"
              dense
              flat
              solo
              style="font-size: 20px"
            ></v-text-field>
          </template>
          <v-date-picker
            v-model="dateReport"
            type="month"
            color="green"
            no-title
            scrollable
          >
            <v-spacer></v-spacer>
            <v-btn text color="secondary" v-on:click="menu = false">
              Cancel
            </v-btn>
            <v-btn
              text
              color="success"
              v-on:click="reportDateBtn(date, dateReport)"
            >
              OK
            </v-btn>
          </v-date-picker>
        </v-menu>
      </v-col>
    </v-row>
    <BarChart
      v-bind:chartData="checkIn"
      v-bind:options="checkInOptions"
      v-bind:label="checkInLabel"
      v-bind:backgroundColor="backgroundColor"
    ></BarChart>
  </v-container>
</template>
<script>
import BarChart from "../components/BarChart";
export default {
  name: "Reports",
  components: { BarChart },
  data() {
    return {
      menu: false,
      // dateReport: new Date().toISOString().substr(0, 10),
      dateReport: new Date().toISOString().substr(0, 7),
      date: "",
      checkInOptions: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
              },
            },
          ],
        },
      },
      checkIn: [
        { date: "1", total: "2" },
        { date: "2", total: "1" },
        { date: "3", total: "3" },
        { date: "4", total: "2" },
        { date: "5", total: "5" },
        { date: "6", total: "3" },
        { date: "7", total: "2" },
        { date: "8", total: "5" },
        { date: "9", total: "2" },
        { date: "10", total: "5" },
        { date: "11", total: "2" },
        { date: "12", total: "1" },
        { date: "13", total: "3" },
        { date: "14", total: "2" },
        { date: "15", total: "5" },
        { date: "16", total: "3" },
        { date: "17", total: "2" },
        { date: "18", total: "5" },
        { date: "19", total: "2" },
        { date: "20", total: "5" },
        { date: "21", total: "2" },
        { date: "22", total: "1" },
        { date: "23", total: "3" },
        { date: "24", total: "2" },
        { date: "25", total: "5" },
        { date: "26", total: "3" },
        { date: "27", total: "2" },
        { date: "28", total: "5" },
        { date: "29", total: "2" },
        { date: "30", total: "5" },
      ],
      checkInLabel: "No of Check In",
      backgroundColor: "#7CB342",
    };
  },
  methods: {
    reportDateBtn: function (date, input) {
      this.$refs.menu.save(date);
      console.log(input);
    },
  },
};
</script>