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
              <h4 class="text-truncate text-uppercase">Total Revenue</h4>
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
                <!-- <td v-if="item.checkOutDate == today()">{{ item.name }}</td>
                <td v-if="item.checkOutDate == today()">{{ item.roomNo }}</td> -->
                <td>{{ item.name }}</td>
                <td>{{ item.roomNo }}</td>
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
      totalRevenue: "123456",
      // room status
      clean: "0", dirty: "0", outOfOrder: "0", occupied: "0", vacant: "0",
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
          text: "Additional Service",
          value: "service",
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
  },
  beforeMount(){
    //Room Status
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
    let guest = "http://localhost:3000/guest"
    let rooms = "http://localhost:3000/rooms"
    let bill = "http://localhost:3000/bill"
    let billDetails = "http://localhost:3000/bill-details"
    let service = "http://localhost:3000/service-mgmt"
    
    const requestReservation = axios.get('http://localhost:3000/reservation/"'+today+'"');
    const requestCheckin = axios.get('http://localhost:3000/checkin/"'+today+'"');
    const requestGuest = axios.get(guest);
    const requestRooms = axios.get(rooms);
    const requestBill = axios.get(bill);
    const requestBillDetails = axios.get(billDetails);
    const requestService = axios.get(service);
    
    axios
    .all([requestReservation, requestCheckin, requestGuest, requestRooms, requestBill, requestBillDetails, requestService])
    .then(axios.spread((...responses) => {
      const requestReservation = responses[0].data.result
      const requestCheckin = responses[1].data.result
      const requestGuest = responses[2].data.result
      const requestRooms = responses[3].data.result
      const requestBill = responses[4].data.result
      const requestBillDetails = responses[5].data.result
      const requestService = responses[6].data.result
      // console.log(responses)

      for(var i = 0; i < requestReservation.length; i++){
        for(var j = 0; j < requestCheckin.length; j++) {
          if(requestReservation[i].id == requestCheckin[j].reservationId) {
            const addArrivingGuests = {
              confNo :  requestReservation[i].confirmationNo,
              resType : requestReservation[i].type,
              days : requestReservation[i].noOfDays,
              name: "",
              roomType: "",
              service: []
            }
            this.arrivingGuests.push(addArrivingGuests)
          }
        }
      }

      for(var k = 0; k < requestCheckin.length; k++) {
        for(var l = 0; l < requestGuest.length; l++) {
          if(requestCheckin[k].id == requestGuest[l].checkInId) {
          this.arrivingGuests[k].name = requestGuest[l].fname + " " + requestGuest[l].lname
          }
        }
      }

      for(var m = 0; m < requestGuest.length; m++) {
        for(var n = 0; n < requestRooms.length; n++) {
          this.arrivingGuests[m].roomType = requestRooms[n].name
          this.arrivingGuests[m].roomId = requestRooms[n].id
        }
      }

      for(var s = 0; s < requestCheckin.length; s++) {
        for(var o = 0; o < requestRooms.length; o++) {
          for(var p = 0; p < requestBill.length; p++) {
            if(requestCheckin[s].roomId == requestRooms[o].id && requestBill[p].roomId == requestRooms[o].id) {
              for(var q = 0; q < requestBillDetails.length; q++) {
                if(requestBill[p].id == requestBillDetails[q].billId) {
                  for(var r = 0; r < requestService.length; r++) {
                    if(requestService[r].id == requestBillDetails[q].serviceId) {
                      this.arrivingGuests[o].service.push(requestService[r].name)
                    }
                  }
                }
              }
            }
          }
        }
      }

    })).catch(err => {
      console.log(err.response.data.message);
    })

    //Guests checking out today
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
            const addCheckOutGuests = {
              name: requestGuest[j].fname + " " + requestGuest[j].lname,
              roomNo: ""
            }
            this.checkOutGuests.push(addCheckOutGuests)
            for(var k = 0; k < requestRooms.length; k++){
              if(requestCheckOut[i].roomId == requestRooms[k].id) {
                this.checkOutGuests[i].roomNo = requestRooms[k].roomNo
              }
            }
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
