<template>
  <div class="guests">
    <v-container>

        <v-card class="my-6 mx-1">
        <v-text-field
            v-model="search"
            label="Search Name of Guest"
            prepend-inner-icon="mdi-magnify"
            color="green"
            outlined
            dense
            hide-details
        ></v-text-field>
        </v-card>
        <v-card class="mx-1">
            <v-data-table
                :headers="GuestsHeaders"
                :items="rooms"
                item-key="name"
                :search="search"
                sort-by="roomNo"
                :custom-filter="filter"
                class="elevation-1"
                :footer-props="{
                    itemsPerPageText: 'Guests Per Page',
                    itemsPerPageOptions: [10, 30, 50, -1],
                }"
            >
            </v-data-table>
            </v-card>
    </v-container>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  name: "Guests",
  components: {},
  data() {
    return {
      search: "",
      GuestsHeaders: [
        {
          text: "Room No.",
          align: "start",
          value: "roomNo",
          class: "green--text darken-4 title",
        },
        {
          text: "Occupancy",
          value: "occupancy",
          class: "green--text darken-4 title",
        },
        {
          text: "Room Type",
          value: "roomType",
          class: "green--text darken-4 title",
        },
        {
          text: "Check Out",
          value: "checkOut",
          class: "green--text darken-4 title",
        }
      ],
      rooms: [],
      guests: [],
    };
  },
  methods: {
    filter(value, search) { // value = from the table ; search = input
      return (
        value != null && search != null && typeof value === "string" &&
        value.toString().toLocaleUpperCase().indexOf(search.toLocaleUpperCase()) !== -1
      );
    }
  },
  mounted() {
    if(localStorage.status){
      this.$store.state.status = localStorage.status
    }
    console.log(localStorage.status)
  },
  beforeMount(){
    const requestRoom = axios.get("http://localhost:3000/rooms");
    const requestGuest = axios.get("http://localhost:3000/guest");
    const requestCheckin = axios.get("http://localhost:3000/checkin");

    /***** ROOMS and GUESTS ARRAY *****/
    axios
    .all([requestRoom, requestGuest, requestCheckin])
    .then(axios.spread((...responses) => {
      const requestRoom = responses[0].data.result
      const requestGuest = responses[1].data.result
      const requestCheckin = responses[2].data.result
      console.log(responses)

      for(var a = 0; a < requestRoom.length; a++){
        for(var b = 0; b < requestCheckin.length; b++){
          for(var c = 0; c < requestGuest.length; c++){
            if(requestCheckin[b].roomId == requestRoom[a].id && requestGuest[c].checkInId == requestCheckin[b].id){
              const addRooms = {
                id: requestRoom[a].id,
                roomNo: requestRoom[a].roomNo,
                roomType: requestRoom[a].name,
                roomId: "",
                checkOut: "",
                occupancy: requestGuest[c].fname + " " + requestGuest[c].lname
              }
              this.rooms.push(addRooms)
            }
          }
        }
      }
      for(var x = 0; x < requestCheckin.length; x++){
        for(var y = 0; y < requestGuest.length; y++){
          for(var z = 0; z < requestRoom.length; z++){
            if(requestCheckin[x].roomId == requestRoom[z].id && requestGuest[y].checkInId == requestCheckin[x].id) {
              var name = requestGuest[y].fname + " " + requestGuest[y].lname
              var flag = this.rooms.findIndex(x => x.roomNo == requestRoom[z].roomNo && x.occupancy == name);
              this.rooms[flag].roomId = requestCheckin[x].roomId
              this.rooms[flag].checkOut = requestCheckin[x].checkOutDate
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

</style>
