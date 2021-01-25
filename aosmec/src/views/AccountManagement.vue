<template>
  <v-container>
    <v-data-table
      :headers="headers"
      :items="acc_mgmt"
      class="mt-3 mx-1"
    >
      <template v-slot:top>
        <v-toolbar style="background: #13b150"
          flat
        >
        <v-toolbar-title
            class="white--text py-3"
            color="light-green white--text font-weight-bold"
            style="font-size: 16px"
          >Manage Accounts</v-toolbar-title>
          <v-divider
            class="mx-4"
            inset
            vertical
          ></v-divider>
          <v-spacer></v-spacer>
          <v-dialog
            v-model="addAccountDialog"
            persistent width = "1100"     
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
                Add Account
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
                        v-model="id_no"
                        v-bind:items="id_no"
                        label="ID Number"    
                        outlined
                        readonly 
                        color="green"
                      ></v-text-field>
                    </v-col>
                    <v-col
                      cols="12"
                      sm="6"
                      md="4"
                    >
                      <v-text-field
                        v-model="editedItem.username"
                        label="Username"
                        outlined
                        color="green"
                      ></v-text-field>
                    </v-col>
                    <v-col
                      cols="12"
                      sm="6"
                      md="4"
                    >
                      <v-text-field
                        v-model="editedItem.password"
                        label="Password"
                        outlined
                        color="green"
                      ></v-text-field>
                    </v-col>
                    <v-col
                      cols="12"
                      sm="6"
                      md="4"
                    >
                    
                    <v-text-field
                        v-model="editedItem.lname"
                        label="Last Name"
                        outlined
                        color="green"
                      ></v-text-field>
                    </v-col>
                    <v-col
                      cols="12"
                      sm="6"
                      md="4"
                    >

                    <v-text-field
                        v-model="editedItem.fname"
                        label="First Name"
                        outlined
                        color="green"
                      ></v-text-field>
                    </v-col>
                    <v-col
                      cols="12"
                      sm="6"
                      md="4"
                    > 

                    <v-text-field
                        v-model="editedItem.mname"
                        label="Middle Name"
                        outlined
                        color="green"
                      ></v-text-field>
                    </v-col>
                    <v-col
                      cols="12"
                      sm="6"
                      md="4"
                    >

                      <v-menu
                        ref="menu"
                        v-model="editedItem.menu"
                        :close-on-content-click="false"
                        transition="scale-transition"
                        offset-y
                        min-width="auto"
                      >
      
                        <template v-slot:activator="{ on, attrs }">
                          <v-text-field
                            v-model="editedItem.date"
                            label="Birthday"
                            readonly
                            outlined
                            v-bind="attrs"
                            v-on="on"
                            color="green"
                          ></v-text-field>
                          </template>
                          <v-date-picker
                            ref="picker"
                            v-model="editedItem.date"
                            :max="new Date().toISOString().substr(0, 10)"
                            min="1950-01-01"
                          ></v-date-picker>
                        </v-menu>
                      </v-col>
                      <v-col
                      cols="12"
                      sm="6"
                      md="4"
                    >
                    
                    <v-select
                      v-bind:items="gender"
                      v-model="editedItem.gender"
                      item-text="text"
                      item-value="value"
                      label="Gender"
                      outlined
                      color="green"
                  ></v-select>
                      
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>

              <v-card-actions class="d-flex justify-center pb-6">
                <v-spacer></v-spacer>
                <v-btn
                  color="green darken-1"
                  text
                  class="px-5"
                  v-on:click="addAccountDialog = false" 
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
              <v-card-title fixed-header><v-icon large color="red lighten-1" class="mr-4">mdi-alert</v-icon>Delete Account</v-card-title>
              <v-card-text>Are you sure you want to delete this account? This action cannot be undone and you will be unable to recover any data.</v-card-text>
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
        small
          class="white--text"
          color="amber darken-2"
          elevation="0"
          @click="editItem(item)"
        >
          <v-icon small>mdi-pencil</v-icon>
        </v-btn>
        
        <v-btn
        small
          class="white--text"
          color="red darken-2"
          elevation="0"
          @click="deleteItem(item)"
        >
        <v-icon small>mdi-delete</v-icon>
        </v-btn>
      </template>
    </v-data-table>
  </v-container>  
</template>

<style>

.v-data-table__expanded.v-data-table__expanded__content {
  box-shadow: none !important;
  background:#f8f8f8;
}

.v-data-table thead span {
  font-weight: bolder;
  font-size: 13px;
  
}

</style>

<script>
  export default {
    data: () => ({
      date: null,
      menu: false,
      id_no: 10000000,
      addAccountDialog: false,
      dialogDelete: false,
      headers: [
        {
          text: 'ID Number',
          align: 'start',
          sortable: false,
          value: 'id_no',
        },
        { text: 'Username', value: 'username', },
        { text: 'Password', value: 'password' },
        { text: 'Last Name', value: 'lname' },
        { text: 'First Name', value: 'fname' },
        { text: 'Middle Name', value: 'mname' },
        { text: 'Birthday', value: 'date' },
        { text: 'Gender', value: 'gender' },
        { text: 'Actions', value: 'actions'},
      ],
      acc_mgmt: [],
      gender: [
        { text: "Male", value: "Male" },
        { text: "Female", value: "Female" },
        { text: "Prefer Not to Say", value: "Prefer Not to Say" },
      ],
      editedIndex: -1,
      editedItem: {
        id_no: '',
        username: '',
        password: '',
        lname: '',
        fname: '',
        mname: '',
        birthday: '',
        gender: '',
      },
      defaultItem: {
        id_no: '',
        username: '',
        password: '',
        lname: '',
        fname: '',
        mname: '',
        birthday: '',
        gender: '',
      },
    }),

    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'New Account' : 'Edit Account'
      },
    },

    watch: {

      menu (val) {
        val && setTimeout(() => (this.$refs.picker.activePicker = 'YEAR'))
      },

      addAccountDialog (val) {
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
        this.acc_mgmt = [
          {
            id_no: this.getID(),
            username: 'messi10',
            password: 'cisco',
            lname: 'Messi',
            fname: 'Lionel',
            mname: 'H',
            birthday: 'date',
            gender: '',
          },
        ]
      },

      getID (){
        return this.id_no;
      },

      incrementID () {
        this.id_no += 1540;
        return this.id_no;
      },

      decrementID () {
        this.id_no -= 203;
      },

      editItem (item) {
        this.editedIndex = this.acc_mgmt.indexOf(item)
        this.editedItem = Object.assign({}, item)
        console.log(this.editedItem)
        this.addAccountdialog = true
      },

      deleteItem (item) {
        this.editedIndex = this.acc_mgmt.indexOf(item)
        this.editedItem = Object.assign({}, item)
        console.log(this.editedItem)
        this.dialogDelete = true
        this.decrementID()
      },

      deleteItemConfirm () {
        this.acc_mgmt.splice(this.editedIndex, 1)
        console.log(this.editedItem)
        console.log(this.editedItem)
        this.closeDelete()
      },

      close () {
        this.addAccountDialog = false
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

      save (date) {
        if (this.editedIndex > -1) {
          Object.assign(this.acc_mgmt[this.editedIndex], this.editedItem)
        } else {
          this.acc_mgmt.push(this.editedItem)
        }
        this.incrementID()
        this.$refs.menu.save(date)
        console.log(this.editedItem)
        this.close()
      },
    }
  }
</script>