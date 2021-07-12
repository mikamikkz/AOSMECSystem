<template>
  <div class="dashboard">
    <v-container class="mt-10">
      <v-card outlined shaped tile color="green" class="mb-10" width="200px">
        <v-card-text class="pa-3">
          <p class="font-weight-medium mb-0" style="color: white">
            Date: <span>{{ date }}</span>
          </p>
        </v-card-text>
      </v-card>

      <v-row>
        <v-col lg="4" cols="sm" class="pb-2">
          <v-card class="bordered" height="167px">
            <div class="col pa-3 py-4 green--text">
              <h4 class="text-truncate text-uppercase">Total Daily Revenue</h4>
              <h1>{{ totalRevenue }}</h1>
            </div>
          </v-card>
        </v-col>

        <v-col cols="12" md="6" class="pb-2">
          <v-card class="dark bordered" height="167px">
            <div class="col pa-3 py-4 green--text">
              <h4 class="text-truncate text-uppercase">Room Status</h4>
            </div>
            <v-card-text class="green--text pa-0">
              <v-row class="roomStatusRow">
                <v-col class="roomStatusCol">
                  <v-icon left color="success" style="margin-bottom: 12px">mdi-sparkles</v-icon>
                  <span class="roomStatusData">Clean: <span>{{ clean }}</span></span>
                </v-col>
                <v-col class="roomStatusCol">
                  <v-icon left color="success" style="margin-bottom: 12px">mdi-account-multiple-check</v-icon>
                  <span class="roomStatusData">Occupied: <span>{{ occupied }}</span></span>
                </v-col>
              </v-row>
              <v-row class="roomStatusRow">
                <v-col class="roomStatusCol">
                  <v-icon left color="success" style="margin-bottom: 12px">mdi-broom</v-icon>
                  <span class="roomStatusData">Dirty: <span>{{ dirty }}</span></span>
                  
                </v-col>
                <v-col class="roomStatusCol">
                  <v-icon left color="success" style="margin-bottom: 12px">mdi-account-remove</v-icon>
                  <span class="roomStatusData">Vacant: <span>{{ vacant }}</span></span>
                </v-col>
              </v-row>
              <v-row class="roomStatusRow">
                <v-col class="roomStatusCol">
                  <v-icon left color="success" style="margin-bottom: 12px">mdi-tools</v-icon>
                  <span class="roomStatusData">Out-of-Order: <span>{{ outOfOrder }}</span></span>
                </v-col>
                <v-col class="roomStatusCol">
                  <v-icon left color="success" style="margin-bottom: 12px">mdi-bed</v-icon>
                  <span class="roomStatusData">Total Rooms: <span>{{ totalRooms }}</span></span>
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>

      <v-toolbar class="ml-0 mb-0 mt-10" flat color="grey lighten-2">
        <v-toolbar-title>
          <h5 class="font-weight-medium pa-0 ma-0 pt-3" style="color: green">
            <v-icon x-large left color="success" style="margin-bottom: 12px"
              >mdi-account-group</v-icon
            >
            Guests arriving today
          </h5>
        </v-toolbar-title>
        <v-spacer></v-spacer>
      </v-toolbar>

      <v-data-table class="mt-4" dense :headers="headers" :items="arrivingGuests" :items-per-page="5"></v-data-table>

      <v-toolbar class="ml-0 mb-0 mt-10" flat color="grey lighten-2">
        <v-toolbar-title>
          <h5 class="font-weight-medium pa-0 ma-0 pt-3" style="color: green">
            <v-icon x-large left color="success" style="margin-bottom: 12px">mdi-door-open</v-icon>
            Guests scheduled to checkout today
          </h5>
        </v-toolbar-title>
        <v-spacer></v-spacer>
      </v-toolbar>

      <template>
        <v-simple-table>
          <template v-slot:default>
            <thead>
              <tr>
                <th class="text-left">
                  Name
                </th>
                <th class="text-left">
                  Room No
                </th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="item in checkOutGuests"
                :key="item.name"
              >
                <td v-if="item.roomId != null">{{ item.name }}</td>
                <td v-if="item.roomId != null">{{ item.roomNo }}</td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
      </template>

    </v-container>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  name: "Dashboard",
  components: {},
  data() {
    return {
      date: "",
      totalRevenue: 0,
      // room status
      totalRooms: "0", clean: "0", dirty: "0", outOfOrder: "0", occupied: "0", vacant: "0",
      // tables
      headers: [
        {
          text: "Confirmation No.",
          value: "confNo",
          class: "green lighten-1 | px-4 pt-4 pb-3 | text-uppercase",
          sortable: true,
        },
        {
          text: "Guests",
          value: "name",
          class: "green lighten-1 | px-4 pt-4 pb-3 | text-uppercase",
          sortable: true,
        },
        {
          text: "Reservation Type",
          value: "resType",
          class: "green lighten-1 | px-4 pt-4 pb-3 | text-uppercase",
          sortable: false,
        },
        {
          text: "Type of Room",
          value: "roomType",
          class: "green lighten-1 | px-4 pt-4 pb-3 | text-uppercase",
          sortable: false,
        },
        {
          text: "No of Days",
          value: "days",
          class: "green lighten-1 | px-4 pt-4 pb-3 | text-uppercase",
          sortable: false,
        },
      ],
      arrivingGuests: [],
      checkOutGuests: []
    };
  },
  methods: {
    today: function () {
      var today = new Date();
      var dd = String(today.getDate()).padStart(2, "0");
      var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
      var yyyy = today.getFullYear();

      return this.date = mm + "/" + dd + "/" + yyyy;
    },
  },
  mounted() {
    this.today();
    if(localStorage.status){
      this.$store.state.status = localStorage.status
    }
    console.log(localStorage.status)
  },
  beforeMount(){
    //Room Status
    axios
    .get("http://localhost:3000/rooms")
    .then((res) => {
      var requestRooms = res.data.result.length
      this.totalRooms = requestRooms
    }).catch((err) => {
      console.log(err.response.data.message);
    });

    axios
    .get("http://localhost:3000/room/clean")
    .then((res) => {
      var requestCleanRooms = res.data.result.length
      this.clean = requestCleanRooms
    }).catch((err) => {
      console.log(err.response.data.message);
    });

    axios
    .get("http://localhost:3000/room/dirty")
    .then((res) => {
      var requestDirtyRooms = res.data.result.length
      this.dirty = requestDirtyRooms
    }).catch((err) => {
      console.log(err.response.data.message);
    });

    axios
    .get("http://localhost:3000/room/out-of-order")
    .then((res) => {
      var requestOutOfOrderRooms = res.data.result.length
      this.outOfOrder = requestOutOfOrderRooms
    }).catch((err) => {
      console.log(err.response.data.message);
    });

    axios
    .get("http://localhost:3000/room/occupied")
    .then((res) => {
      var requestOccupiedRooms = res.data.result.length
      this.occupied = requestOccupiedRooms
    }).catch((err) => {
      console.log(err.response.data.message);
    });

    axios
    .get("http://localhost:3000/room/vacant")
    .then((res) => {
      var requestVacantRooms = res.data.result.length
      this.vacant = requestVacantRooms
    }).catch((err) => {
      console.log(err.response.data.message);
    });

    //Guests arriving today
    var today = new Date().toISOString().slice(0,10);
    
    const requestReservation = axios.get('http://localhost:3000/reservation/"'+today+'"');
    const requestReservee = axios.get('http://localhost:3000/reservee/checkin/"'+today+'"');
    const requestRoomReserve = axios.get("http://localhost:3000/room-reserve");
    const requestRooms = axios.get("http://localhost:3000/rooms");
    const requestBill = axios.get("http://localhost:3000/bill");
    
    axios
    .all([requestReservation, requestReservee, requestRoomReserve])
    .then(axios.spread((...responses) => {
      const requestReservation = responses[0].data.result
      const requestReservee = responses[1].data.result
      const requestRoomReserve = responses[2].data.result

      for(var i = 0; i < requestReservation.length; i++){
        if(requestReservation[i].status == 1) {
          const addArrivingGuests = {
            id: requestReservation[i].id,
            confNo :  requestReservation[i].confirmationNo,
            resType : requestReservation[i].type,
            days : requestReservation[i].noOfDays,
            status : requestReservation[i].status,
            name: "",
            roomType: "",
          }
          this.arrivingGuests.push(addArrivingGuests)
        }
      }

      for(var k = 0; k < requestReservation.length; k++) {
        for(var l = 0; l < requestReservee.length; l++) {
          if(requestReservation[k].reserveeId == requestReservee[l].id) {
            this.arrivingGuests[l].name = requestReservee[l].name
              for(var m = 0; m < requestRoomReserve.length; m++) {
                if(requestReservation[k].id == requestRoomReserve[m].reservationId) {
                  this.arrivingGuests[l].roomType = requestRoomReserve[m].roomType
                }
              }
          }
        }
      }
    })).catch(err => {
      console.log(err.response.data.message);
    })

    //Guests checking out today
    const requestGuest = axios.get("http://localhost:3000/guest");
    const requestCheckOut = axios.get('http://localhost:3000/checkout/"'+today+'"');

    axios
    .all([requestCheckOut, requestGuest, requestRooms])
    .then(axios.spread((...responses) => {
      const requestCheckOut = responses[0].data.result
      const requestGuest = responses[1].data.result
      const requestRooms = responses[2].data.result

      for(var i = 0; i < requestCheckOut.length; i++){
        for(var j = 0; j < requestGuest.length; j++) {
          if(requestCheckOut[i].id == requestGuest[j].checkInId) {
            for(var k = 0; k < requestRooms.length; k++){
              if(requestCheckOut[i].roomId == requestRooms[k].id) {
                const addCheckOutGuests = {
                  name: requestGuest[j].fname + " " + requestGuest[j].lname,
                  roomNo: requestRooms[k].roomNo,
                  roomId: requestCheckOut[i].roomId
                }
                this.checkOutGuests.push(addCheckOutGuests)
              }
            }
          }
        }
      }
    })).catch(err => {
      console.log(err.response.data.message);
    })

    //Total Daily Revenue
    const requestCheckin = axios.get('http://localhost:3000/checkin/"'+today+'"');

    axios
    .all([requestBill, requestCheckin])
    .then(axios.spread((...responses) => {
      const requestBill = responses[0].data.result
      const requestCheckin = responses[1].data.result

      for(var i = 0; i < requestCheckin.length; i++){
        for(var j = 0; j < requestBill.length; j++) {
          if(requestCheckin[i].roomId == requestBill[j].roomId) {
            this.totalRevenue += requestBill[j].total
          }
        }
      }

    })).catch(err => {
      console.log(err.response.data.message);
    })
  }
};
</script>

<style scoped>
.theme--light .bordered {
  border-left: 8px solid green !important;
}
.roomStatusData {
  font-size: large;
}
.roomStatusRow {
  margin: 0;
}
.roomStatusCol {
  padding-top: 0;
  padding-bottom: 0;
}
</style>
