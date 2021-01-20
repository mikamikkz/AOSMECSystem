<template>
  <v-container>
    <v-data-table
      :headers="headers"
      :items="acc_mgmt"
      class="mt-3"
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
            v-model="dialog"
            max-width="500px"
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
                        v-model="editedItem.id"
                        label="ID Number"
                        outlined
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
                      dense
                      color="green"
                  ></v-select>
                      
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
      
    </v-data-table>
  </v-container>  
</template>

<script>
  export default {
    data: () => ({
      
      date: null,
      menu: false,

      dialog: false,
      dialogDelete: false,
      headers: [
        {
          text: 'ID Number',
          align: 'start',
          sortable: false,
          value: 'id',
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
        { text: "Other", value: "Other" },
      ],
      editedIndex: -1,
      editedItem: {
        id: '',
        username: '',
        password: '',
        lname: '',
        fname: '',
        mname: '',
        birthday: 'date',
        gender: '',
      },
      defaultItem: {
        id: '',
        username: '',
        password: '',
        lname: '',
        fname: '',
        mname: '',
        birthday: 'date',
        gender: 'gender',
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
        this.acc_mgmt = [
          {
            id: '11111111',
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

      editItem (item) {
        this.editedIndex = this.acc_mgmt.indexOf(item)
        this.editedItem = Object.assign({}, item)
        console.log(this.editedItem)
        this.dialog = true
      },

      deleteItem (item) {
        this.editedIndex = this.acc_mgmt.indexOf(item)
        this.editedItem = Object.assign({}, item)
        console.log(this.editedItem)
        this.dialogDelete = true
      },

      deleteItemConfirm () {
        this.acc_mgmt.splice(this.editedIndex, 1)
        console.log(this.editedItem)
        console.log(this.editedItem)
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

      save (date) {
        if (this.editedIndex > -1) {
          Object.assign(this.acc_mgmt[this.editedIndex], this.editedItem)
        } else {
          this.acc_mgmt.push(this.editedItem)
        }
        this.$refs.menu.save(date)
        console.log(this.editedItem)
        this.close()
      },
    }
  }
</script>