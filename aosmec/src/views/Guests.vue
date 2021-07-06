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
                :items="guests"
                item-key="checkInId"
                :search="search"
                sort-by="roomNo"
                :custom-filter="filter"
                class="elevation-1"
                :footer-props="{
                    itemsPerPageText: 'Guests Per Page',
                    itemsPerPageOptions: [10, 30, 50, -1],
                }"
            >
                <template v-slot:item.occupancy="props">
                    <span v-for="guest in props.item.names" :key="guest"> 
                        {{ guest }}
                    </span>
                </template>
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
      guests: [],
    };
  },
  methods: {
    filter(value, search) {
      return (
        value != null && search != null && typeof value === "string" &&
        value.toString().toLocaleUpperCase().indexOf(search.toLocaleUpperCase()) !== -1
      );
    },
    // filter(value, search) {
    //   return this.guests.name.filter(guest => {
    //     value != null && search != null
    //     return guest.name.toLowerCase().includes(this.search.toLowerCase())
    //  })
    // }
    //  filter(items, search, filter) {
    //         search = search.toString().toLowerCase()
    //         return items.filter(row => filter(row["name"], search));
    //     }
    // filter(search) {
    //     // return this.guests.filter(guest => {
    //     //     return guest.names.some(name => guest.name.includes(search));
    //     // });
    //     // var flag = this.guests.find(x => x.names.includes(search) );
        
    //     console.log(search)
    // }
  },
  mounted() {
    if(localStorage.status){
      this.$store.state.status = localStorage.status
    }
    console.log(localStorage.status)
  },
  beforeMount(){
    var date = new Date().toISOString().slice(0,10);
    const requestRoom = axios.get("http://localhost:3000/rooms");
    const requestGuest = axios.get("http://localhost:3000/guest");
    const requestCheckin = axios.get('http://localhost:3000/checkin/"'+date+'"');

    axios
    .all([requestRoom, requestGuest, requestCheckin])
    .then(axios.spread((...responses) => {
        const requestRoom = responses[0].data.result
        const requestGuest = responses[1].data.result
        const requestCheckin = responses[2].data.result
        
        for(var i = 0; i < requestRoom.length; i++){
            for(var j = 0; j < requestCheckin.length; j++){
                if(requestRoom[i].id == requestCheckin[j].roomId) {
                    const addGuest = {
                        checkInId: requestCheckin[j].id,
                        roomNo: requestRoom[i].roomNo,
                        names: [],
                        roomType: requestRoom[i].name
                    }
                    this.guests.push(addGuest)
                }
              }
        }
        for(var x = 0; x < requestGuest.length; x++){
            for(var y = 0; y < requestCheckin.length; y++){
                if(requestGuest[x].checkInId == requestCheckin[y].id){
                    var name = requestGuest[x].fname + " " + requestGuest[x].lname
                    this.guests[y].names.push(name)
                }
            }
        }
        console.log(this.guests)
    })).catch(err => {
      console.log(err.response.data.message);
    })
  }
};
</script>

<style scoped>

</style>
