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
    <v-row class="mb-5">
      <v-col cols="3">
        <v-card color="#456990">
          <v-row>
            <v-col cols="3">
              <v-icon x-large class="pl-4 pt-3" style="color: #eff3fc">
                mdi-chart-areaspline
              </v-icon>
            </v-col>
            <v-col cols="9">
              <p class="text-subtitle-2 text-left my-0" style="color: #eff3fc">
                Total Renevue
              </p>
              <p class="text-left my-0" style="font-size: 28px; color: #eff3fc">
                {{monthlyRevenue}}
              </p>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
      <v-col cols="3">
        <v-card color="#13b150">
          <v-row>
            <v-col cols="3">
              <v-icon x-large class="pl-4 pt-3" style="color: #f2fcef">
                mdi-account-group
              </v-icon>
            </v-col>
            <v-col cols="9">
              <p class="text-subtitle-2 text-left my-0" style="color: #f2fcef">
                Total Guests
              </p>
              <p class="text-left my-0" style="font-size: 28px; color: #f2fcef">
                {{monthlyGuest}}
              </p>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
    <v-row class="mt-5">
      <v-col>
        <v-card class="px-5 py-2">
          <BarChart
            v-bind:chartData="checkIn"
            v-bind:options="checkInOptions"
            v-bind:label="checkInLabel"
            v-bind:backgroundColor="backgroundColor"
          ></BarChart>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="7">
        <v-card class="pa-3">
          <h3 style="color: #00695C">Booking Commissions</h3>
          <v-data-table
            :headers="resTypeTableHeader"
            :items="resTypeTableBody"
            hide-default-footer
          ></v-data-table>
        </v-card>
      </v-col>
      <v-col cols="5">
        <v-card class="pa-3">
          <h3 style="color: #00695C">Number of Reservations</h3>
          <PieChart
            v-bind:chartData="reservationType"
            v-bind:options="reservationTypeOptions"
            v-bind:backgroundColor="resTypeBgColor"
          ></PieChart>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<style scoped>
.h2 {
  color: #eff3fc;
}
</style>
<script>
import axios from "axios";
import BarChart from "../components/BarChart";
import PieChart from "../components/PieChart";
export default {
  name: "Reports",
  components: { BarChart, PieChart },
  data() {
    return {
      month: "",
      year: "",
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
        { date: "1", totalCheckIn: "2", totalCheckout: "2" },
        { date: "2", totalCheckIn: "1", totalCheckout: "2" },
        { date: "3", totalCheckIn: "3", totalCheckout: "1" },
        { date: "4", totalCheckIn: "2", totalCheckout: "3" },
        { date: "5", totalCheckIn: "5", totalCheckout: "2" },
        { date: "6", totalCheckIn: "3", totalCheckout: "2" },
        { date: "7", totalCheckIn: "2", totalCheckout: "3" },
        { date: "8", totalCheckIn: "5", totalCheckout: "2" },
        { date: "9", totalCheckIn: "2", totalCheckout: "1" },
        { date: "10", totalCheckIn: "2", totalCheckout: "1" },
        { date: "11", totalCheckIn: "2", totalCheckout: "2" },
        { date: "12", totalCheckIn: "1", totalCheckout: "2" },
        { date: "13", totalCheckIn: "3", totalCheckout: "1" },
        { date: "14", totalCheckIn: "2", totalCheckout: "5" },
        { date: "15", totalCheckIn: "5", totalCheckout: "2" },
        { date: "16", totalCheckIn: "3", totalCheckout: "2" },
        { date: "17", totalCheckIn: "2", totalCheckout: "3" },
        { date: "18", totalCheckIn: "5", totalCheckout: "2" },
        { date: "19", totalCheckIn: "2", totalCheckout: "1" },
        { date: "20", totalCheckIn: "2", totalCheckout: "1" },
        { date: "21", totalCheckIn: "2", totalCheckout: "2" },
        { date: "22", totalCheckIn: "1", totalCheckout: "4" },
        { date: "23", totalCheckIn: "3", totalCheckout: "2" },
        { date: "24", totalCheckIn: "2", totalCheckout: "3" },
        { date: "25", totalCheckIn: "5", totalCheckout: "2" },
        { date: "26", totalCheckIn: "3", totalCheckout: "2" },
        { date: "27", totalCheckIn: "2", totalCheckout: "3" },
        { date: "28", totalCheckIn: "5", totalCheckout: "2" },
        { date: "29", totalCheckIn: "2", totalCheckout: "1" },
        { date: "30", totalCheckIn: "2", totalCheckout: "1" },
      ],
      checkInLabel: ["Check In", "CheckOut"],
      backgroundColor: ["#49beaa", "#E57373"],
      resTypeBgColor: [
        "#49beaa",
        "#E57373",
        "#456990",
        "#EEB868",
        "#264653",
        "#f4a261",
      ],
      reservationType: [
        { name: "Booking.com", total: "10" },
        { name: "Agoda", total: "10" },
        { name: "Walkin", total: "20" },
        { name: "Expedia", total: "1" },
      ],
      reservationTypeOptions: {
        responsive: true,
        maintainAspectRatio: false,
        xAxes: [
          {
            gridLines: {
              display: false,
            },
          },
        ],
        yAxes: [
          {
            gridLines: {
              display: false,
            },
          },
        ],
        // legend: {
        //   position: "right",
        // },
        cutoutPercentage: 30,
      },
      resTypeTableHeader: [
        { text: 'Type', value: 'type' },
        { text: 'Revenue', value: 'total' },
        { text: 'Commission to Site(15%)', value: 'commission' },
      ],
      resTypeTableBody: [
        { type: 'Agoda', total: '1000', commission: '150' }
      ],
      monthlyRevenue: 0,
      monthlyGuest: 0,
    };
  },
  methods: {
    reportDateBtn: function (date, input) {
      this.$refs.menu.save(date);
      console.log(input);
    },
  },
  beforeMount() {
    var today = new Date().toISOString().slice(0, 10);
    var dateSplit = today.split('-', 3);
    this.year = dateSplit[0];
    this.month = dateSplit[1];

    axios
      .get('http://localhost:3000/monthly-guest/'+this.month+'/'+this.year+'')
      .then((res) => {
        this.monthlyGuest = res.data.count;
      })
      .catch((err) => {
        console.log(err.response.data.message);
      });
    axios
      .get('http://localhost:3000/monthly-revenue/'+this.month+'/'+this.year+'')
      .then((res) => {
        this.monthlyRevenue = res.data.revenue;
      })
      .catch((err) => {
        console.log(err.response.data.message);
      });
    axios
      .get('http://localhost:3000/monthly-checkin/'+this.month+'/'+this.year+'')
      .then((res) => {
        this.checkIn = res.data.monthly;
        console.log(this.checkIn)
      })
      .catch((err) => {
        console.log(err.response.data.message);
      });
  },
};
</script>