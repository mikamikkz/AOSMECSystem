<template>
  <v-container>
    <v-data-table
      :headers="headers"
      :items="service_mgmt"
      class="mt-3 mx-1"
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
          >Manage Services</v-toolbar-title>
          
          <v-divider
            class="mx-4"
            inset
            vertical
          ></v-divider>
          <v-spacer></v-spacer>
          <v-dialog
            v-model="addServiceDialog"
            persistent width="1100"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                color="white"
                dark
                rounded
                class="black--text py-3"
                v-bind="attrs"
                v-on="on"
              >
                Add Service
              </v-btn>
            </template>
            <v-card>
              
              <v-card-title class="green white--text" fixed-header>
                New Service
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
                      Service Details
                    </v-chip>
                    </v-col>
                  </v-row>
                  
                  <v-row>
                   <v-col
                      cols="12"
                      sm="6"
                      md="4"
                    >
                    
                    <v-select
                      v-bind:items="name"
                      v-model="editedItem.name"
                      item-text="text"
                      item-value="value"
                      label="Service"
                      outlined
                      color="green"
                  ></v-select>
                      
                    </v-col>
                    <v-col
                      cols="12"
                      sm="6"
                      md="4"
                    >
                      <v-text-field
                        v-model="editedItem.rate"
                        label="Service Rate"
                        outlined
                        required
                        color="green"
                      ></v-text-field>
                    </v-col>
                    <v-col
                      cols="12"
                      sm="6"
                      md="4"
                    >
                      <v-text-field
                        v-model="editedItem.pricing"
                        label="Pricing"
                        outlined
                        color="green"
                      ></v-text-field>
                    </v-col>
                    <v-col
                      cols="12"
                      sm="6"
                      md="4"
                    >
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  color="green darken-1"
                  text
                  class="px-5"
                  v-on:click="addServiceDialog = false" 
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
          <v-dialog v-model="dialogDelete" max-width="500px">
            <v-card>
              <v-card-title fixed-header><v-icon large color="red lighten-1" class="mr-4">mdi-alert</v-icon>Delete Service</v-card-title>
              <v-card-text>Are you sure you want to delete this service? This action cannot be undone and you will be unable to recover any data.</v-card-text>
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


<script>
  import axios from "axios";
  
  export default {
    data: () => ({
      addServiceDialog: false,
      dialogDelete: false,
      headers: [
        { text: 'Service Name', value: 'name', sortable: false },
        { text: 'Service Rate', value: 'rate' },
        { text: 'Pricing', value: 'pricing' },
        { text: 'Actions', value: 'actions', sortable: false },
        
      ],

      service_mgmt: [
        
      ],

      name: [
        { text: "Airport Shuttle", value: "Airport Shuttle" },
        { text: "Extra Bed", value: "Extra Bed" },
      ],

     
      editedIndex: -1,
      editedItem: {
        name: "",
        rate: "",
        pricing: ""
      },
    }),

    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'New Service' : 'Edit Service'
      },
    },

    watch: {
      addServiceDialog (val) {
        val || this.close()
      },
      dialogDelete (val) {
        val || this.closeDelete()
      },
    },

    methods: {                   

      editItem (item) {
        this.editedIndex = this.service_mgmt.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.addServiceDialog = true
      },

      deleteItem (item) {
        this.editedIndex = this.service_mgmt.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialogDelete = true
      },

      deleteItemConfirm () {
        axios
          .delete("http://localhost:3000/service-mgmt/delete/" + this.service_mgmt[this.editedIndex].id)
          .catch((err) => {
            console.log(err.res.data.message);
          });
        this.service_mgmt.splice(this.editedIndex, 1)
        this.closeDelete()
      },

      close () {
        this.addServiceDialog = false
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

      addAService () {
        var addedService = {
          id: this.editedItem.id,
          name: this.editedItem.name,
          rate: this.editedItem.rate,
          pricing: this.editedItem.pricing
        }
        axios.post("http://localhost:3000/service-mgmt", addedService)
      },

      save () {
        if (this.editedIndex > -1) {
          Object.assign(this.service_mgmt[this.editedIndex], this.editedItem)
          axios.patch("http://localhost:3000/service-mgmt/update/" + this.service_mgmt[this.editedIndex].id, this.editedItem)
        } else {
          this.addAService()
          this.service_mgmt.push(this.editedItem)
        }
        console.log(this.editedItem)
        this.close()
      },

    },

    beforeMount(){  
      axios
        .get("http://localhost:3000/service-mgmt")
        .then((res) => {
          var getService = res.data.result;
          for(var x = 0; x < getService.length; x++){
            var retrievedData = {
              id: getService[x].id,
              name: getService[x].name,
              rate: getService[x].rate,
              pricing: getService[x].pricing
            }
            this.service_mgmt.push(retrievedData);  
          }
          console.log(res.data);
        })
        .catch((err) => {
          console.log(err.res.data.message);
        });
    }
  }
</script>