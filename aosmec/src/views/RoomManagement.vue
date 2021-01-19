<template>
  <v-data-table
    :headers="headers"
    :items="room_mgmt"
    class="elevation-1"
  >
    <template v-slot:top>
      <v-toolbar 
        style="background: #13b150"
        flat
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
          v-model="dialog"
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
            <v-card-title>
              <span class="headline">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="editedItem.roomname"
                      label="Room Name"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="editedItem.no_of_rooms"
                      label="No. of Rooms"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="editedItem.no_of_adults"
                      label="No. of Adults"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="editedItem.additional_head_rate"
                      label="Additional Head Rate"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="editedItem.unit_price"
                      label="Unit Price"
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
                @click="close"
              >
                Cancel
              </v-btn>
              <v-btn
                color="green darken-1"
                text
                @click="save"
              >
                Save
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card>
            <v-card-title fixed-header><v-icon large color="red lighten-1" class="mr-4">mdi-alert</v-icon>Delete Room</v-card-title>
            <v-card-text>Are you sure you want to delete this room? This action cannot be undone and you will be unable to recover any data</v-card-text>
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
      <v-icon
        small
        class="mr-2"
        color="green"
        @click="editItem(item)"
      >
        mdi-pencil
      </v-icon>
      <v-icon
        small
        color="green"
        @click="deleteItem(item)"
      >
        mdi-delete
      </v-icon>
    </template>
    <template v-slot:no-data>
      <v-btn
        color="primary"
        @click="initialize"
      >
        Reset
      </v-btn>
    </template>
  </v-data-table>
</template>

<script>
  export default {
    data: () => ({
      dialog: false,
      dialogDelete: false,
      headers: [
        {
          text: 'Room Name',
          align: 'start',
          sortable: false,
          value: 'roomname',
        },
        { text: 'No. of Rooms', value: 'no_of_rooms', sortable: false},
        { text: 'No. of Adults', value: 'no_of_adults' },
        { text: 'Additional Head Rate', value: 'additional_head_rate' },
        { text: 'Unit Price', value: 'unit_price' },
        { text: 'Actions', value: 'actions'},
      ],
      room_mgmt: [],
      editedIndex: -1,
      editedItem: {
        roomname: '',
        no_of_rooms: 0,
        no_of_adults: 0,
        additional_head_rate: 0.00,
        unit_price: 0,
      },
      defaultItem: {
        roomname: '',
        no_of_rooms: 0,
        no_of_adults: 0,
        additional_head_rate: 0.00,
        unit_price: 0,
      },
    }),

    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'New Room' : 'Edit Room Information'
      },
    },

    watch: {
      dialog (val) {
        val || this.close()
      },
      dialogDelete (val) {
        val || this.closeDelete()
      },
    },

    created () {
      this.initialize()
    },

    methods: {                   
      initialize () {
        this.room_mgmt = [
          {
            roomname: 'Single',
            no_of_rooms: 2,
            no_of_adults: 2,
            additional_head_rate: 100,
            unit_price: 3500,
          },
        ]
      },

      editItem (item) {
        this.editedIndex = this.room_mgmt.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },

      deleteItem (item) {
        this.editedIndex = this.room_mgmt.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialogDelete = true
      },

      deleteItemConfirm () {
        this.room_mgmt.splice(this.editedIndex, 1)
        this.closeDelete()
      },

      close () {
        this.dialog = false
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

      save () {
        if (this.editedIndex > -1) {
          Object.assign(this.room_mgmt[this.editedIndex], this.editedItem)
        } else {
          this.room_mgmt.push(this.editedItem)
        }
        this.close()
      },
    },
  }
</script>