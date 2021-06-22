<template>
  <v-container>
    <v-data-table
      :headers="headers"
      :items="room_mgmt"
      class="mt-3"
      rounded
    >
      <template v-slot:top>
        <v-toolbar 
          style="background: #13b150"
          flat
          rounded
          elevation="2"
          color="font-weight-bold"
        >
          <v-toolbar-title 
            class="white--text py-3"
            color="light-green white--text font-weight-bold"
            style="font-size: 16px"
          >Manage Rooms</v-toolbar-title>
          
          <v-divider
            class="mx-4"
            inset
            vertical
          ></v-divider>
          <v-spacer></v-spacer>
          <v-dialog 
            v-model="addRoomDialog"
            max-width="500px"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                color="white"
                rounded
                class="black--text py-3"
                v-bind="attrs"
                v-on="on"
              >
                Add Room
              </v-btn>
            </template>
            <v-card>
              <v-card-title class="green white--text" fixed-header>
                New Room
              </v-card-title>

              <v-card-text>
                <v-container>

                  <v-row>
                    <v-col
                      cols="12"
                      sm="6"
                      md="10"
                    >

                    <v-chip
                      color="light-green white--text font-weight-bold"
                      style="font-size: 16px"
                      >
                      Room Details
                    </v-chip>
                    </v-col>
                  </v-row>

                  <v-row>
                    <v-col
                      cols="12"
                      sm="6"
                      md="6"
                    >
                      <v-text-field 
                      v-model="editedItem.name"
                      item-text="text"
                      item-value="value"
                      label="Room Type"
                      outlined                      
                      color="green"
                  ></v-text-field>
                    </v-col>
                    <v-col
                      cols="12"
                      sm="6"
                      md="6"
                    >
                      <v-text-field
                        v-model="editedItem.rate"
                        label="Rate"
                        outlined
                        color="green"
                      ></v-text-field>
                    </v-col>
                    <v-col
                      cols="12"
                      sm="6"
                      md="6"
                    >
                      <v-text-field
                        v-model="editedItem.totalNoOfRoom"
                        label="Total Number of Rooms"
                        outlined
                        color="green"
                      ></v-text-field>
                    </v-col>
                    
                  </v-row>
                </v-container>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  color="green darken-1"
                  text
                  v-on:click="addRoomDialog=false"
                >
                  Cancel
                </v-btn>
                <v-btn
                  color="green darken-1"
                  text
                  v-on:click="save"
                >
                  Save
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <v-dialog v-model="dialogDelete" persistent width="1100px">
            <v-card>
              <v-card-title fixed-header><v-icon large color="red lighten-1" class="mr-4">mdi-alert</v-icon>Delete Room</v-card-title>
              <v-card-text>Are you sure you want to delete this room? This action cannot be undone and you will be unable to recover any data.</v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="green darken-1" text @click="closeDelete">Cancel</v-btn>
                <v-btn color="green darken-1" text @click="deleteItemConfirm">OK</v-btn>
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>
      <template v-slot:[`item.actions`]="{ item }">
        <v-btn
          color="amber darken-2"
          small
          rounded
          class="white--text"
          v-on:click="editItem(item)"
          elevation="0"
        >
          <v-icon small>mdi-pencil</v-icon>
        </v-btn>
        
        <v-btn
              color="red"
              small
              rounded
              class="ml-1 white--text"
              v-on:click="deleteItem(item)"
              elevation="0"
            >
              <v-icon small>mdi-delete-outline</v-icon>
            </v-btn>
      </template>
    </v-data-table>
  </v-container>
</template>

<style>

.v-data-table__expanded.v-data-table__expanded__content {
  box-shadow: none !important;
  background: #f8f8f8;
}

.v-data-table thead span {
  font-weight: bolder;
  font-size: 13px;
}

</style>

<script>

  import axios from "axios";
  export default {
    data: () => ({
      
      addRoomDialog: false,
      dialogDelete: false,
      headers: [
        { text: 'Room Name', value: 'name' ,align: 'start', sortable: false },
        { text: 'Rate', value: 'rate', sortable: false},
        { text: 'Total Number of Rooms', value: 'totalNoOfRoom', sortable: false},
        { text: 'Actions', value: 'actions', sortable: false },
      ],
      room_mgmt: [

      ],

      editedIndex: -1,
      editedItem: {
        name: null,
        rate: null,
        totalNoOfRoom: null,
      },
    }),

    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'New Room' : 'Edit Room Information'
      },
    },

    watch: {
      addRoomDialog (val) {
        val || this.close()
      },
      dialogDelete (val) {
        val || this.closeDelete()
      },
    },

    methods: {                   

      editItem (item) {
        this.editedIndex = this.room_mgmt.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.addRoomDialog = true
      },

      deleteItem (item) {
        this.editedIndex = this.room_mgmt.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialogDelete = true
      },

      deleteItemConfirm () {
        axios
        .delete("http://localhost:3000/room-mgmt/all/delete/" + this.room_mgmt[this.editedIndex].id)
        .catch((err) => {
          console.log(err.res.data.message);
        }),
        this.room_mgmt.splice(this.editedIndex, 1)
        this.closeDelete()
      },

      close () {
        this.addRoomDialog = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },

      closeDelete () {
        this.dialogDelete = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },

      addARoom () {
        var addedRoom = {
          id: this.editedItem.id,
          name: this.editedItem.name,
          rate: this.editedItem.rate,
          totalNoOfRoom: this.editedItem.totalNoOfRoom
        }
        axios.post("http://localhost:3000/room-mgmt/all", addedRoom)
      },

      save () {
        if (this.editedIndex > -1) {
          Object.assign(this.room_mgmt[this.editedIndex], this.editedItem)
          axios.patch("http://localhost:3000/room-mgmt/all/update/" + this.room_mgmt[this.editedIndex].id, this.editedItem)
        } else if (this.editedItem.name != null && this.editedItem.rate != null && this.editedItem.totalNoOfRoom != null) {
          this.addARoom()
          this.room_mgmt.push(this.editedItem)
          this.close()
        } else if (this.editedItem.name == null || this.editedItem.rate == null || this.editedItem.totalNoOfRoom == null) {
          alert("Please fill all of the fields before saving.")
        }    
      },
    },

    beforeMount(){
      axios
        .get("http://localhost:3000/room-mgmt/all")
        .then((res) => {
          var room = res.data.result;
          for(var x = 0; x < room.length; x++){
            var addData = {
              id: room[x].id,
              name: room[x].name,
              rate: room[x].rate,
              totalNoOfRoom: room[x].totalNoOfRoom
            }
            this.room_mgmt.push(addData);
          }
          console.log(res.data);
        })
    }
  }
</script>