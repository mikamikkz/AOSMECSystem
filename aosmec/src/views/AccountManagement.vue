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
          rounded
          elevation="2"
          color="font-weight-bold"
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
                rounded
                class="black--text py-3"
                v-bind="attrs"
                v-on="on"
              >
                Add Account
              </v-btn>
            </template>
            <v-card>
              <v-card-title class="green white--text" fixed-header>
                New Account
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
                      New Account Details
                    </v-chip>
                    </v-col>
                  </v-row>

                  <v-row>
                    
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

                      <v-menu
                        ref="menu"
                        v-model="editedItem.menu"
                        :close-on-content-click="false"
                        :return-value.sync="date"
                        transition="scale-transition"
                        offset-y
                        min-width="auto"
                      >
                        <template v-slot:activator="{ on, attrs }">
                          <v-text-field
                            v-model="editedItem.birthdate"
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
                          color="green"
                          v-model="editedItem.birthdate"
                          :max="DATE.toISOString().substr(0,10)"
                          min="1980-01-01"
                          v-on:click="close"
                        ></v-date-picker>
                      </v-menu>

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
                        required
                        color="green"
                      ></v-text-field>
                    </v-col>
                    <v-col
                      cols="12"
                      sm="6"
                      md="4"
                    >
                    <div v-if="editedItem.password!=null">
                      <v-text-field
                        v-model="editedItem.password"
                        label="Password"
                        outlined
                        readonly
                        color="green"
                      ></v-text-field>
                    </div>
                    <div v-else>
                      <v-text-field
                        v-model="temp.password"
                        label="Password"
                        outlined
                        color="green"
                      ></v-text-field>
                    </div>
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
          color="amber darken-2"
          small
          rounded
          class="ml-1 white--text"
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
  background:#f8f8f8;
}

.v-data-table thead span {
  font-weight: bolder;
  font-size: 13px;
}

</style>

<script>

  import axios from "axios";
  var DATE = new Date();
  DATE.setFullYear( DATE.getFullYear() - 18 );
  
  export default {
    data: () => ({
      DATE: DATE,
      date: null,
      menu: false,
      addAccountDialog: false,
      dialogDelete: false,
      headers: [
        { text: 'Username', value: 'username', sortable: false },
        { text: 'Password', value: 'password', sortable: false },
        { text: 'First Name', value: 'fname', sortable: false },
        { text: 'Last Name', value: 'lname', sortable: false },
        { text: 'Birthday', value: 'birthdate', sortable: false },
        { text: 'Gender', value: 'gender', sortable: false },
        { text: 'Actions', value: 'actions', sortable: false},
      ],
      acc_mgmt: [

      ],

      gender: [
        { text: "Male", value: "Male" },
        { text: "Female", value: "Female" },
      ],

      editedIndex: -1,
      editedItem: {
        username: null,
        password: null,
        fname: null,
        mname: null,
        lname: null,
        birthdate: null,
        gender: null
      },

      temp: {
        password: null
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

    methods: {                   

      editItem (item) {
        this.editedIndex = this.acc_mgmt.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.addAccountDialog = true
      },

      deleteItem (item) {
        this.editedIndex = this.acc_mgmt.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialogDelete = true
      },

      deleteItemConfirm () {
        axios.delete("http://localhost:3000/account-mgmt/delete/" + this.acc_mgmt[this.editedIndex].id)
        this.acc_mgmt.splice(this.editedIndex, 1)
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

      addAnAccount () {
        
        var addedAccount = {
          id: this.editedItem.id,
          username: this.editedItem.username,
          password: this.editedItem.password,
          fname: this.editedItem.fname,
          lname: this.editedItem.lname,
          birthdate: this.editedItem.birthdate,
          gender: this.editedItem.gender
        }
        axios.post("http://localhost:3000/account-mgmt", addedAccount)
      },

      checkIfUsernameIsValid () {
        let isTaken = false;
        for(var x = 0; x < this.acc_mgmt.length; x++){
          if((this.editedItem.username == this.acc_mgmt[x].username) || (this.editedItem.fname == this.acc_mgmt[x].fname && this.editedItem.lname == this.acc_mgmt[x].lname)){
            isTaken = true;
            break;
          } else {
            isTaken = false;
          }
        }
        return isTaken;
      },

      save (date) {
        if(this.editedItem.password == null){
          this.editedItem.password = this.temp.password;
          this.temp.password = null;
        }
        if (this.editedIndex > -1) {
          Object.assign(this.acc_mgmt[this.editedIndex], this.editedItem)
          axios.patch("http://localhost:3000/account-mgmt/update/" + this.acc_mgmt[this.editedIndex].id, this.editedItem)
          this.close()
        } else if (this.editedItem.username != null && this.editedItem.password != null && this.editedItem.fname != null && this.editedItem.lname != null && this.editedItem.birthdate != null && this.editedItem.gender != null) {
          if(this.checkIfUsernameIsValid() == true){
            alert("An account with the same names and/or password already exists. Please input a different one.");
          } else {
            this.addAnAccount();
            this.acc_mgmt.push(this.editedItem);
            this.$refs.menu.save(date);
            this.close();
          }
        } else if (this.editedItem.username == null || this.editedItem.password == null || this.editedItem.fname == null || this.editedItem.lname == null || this.editedItem.birthdate == null || this.editedItem.gender == null) {
          alert("Please fill all of the fields before saving.")
        }     
      },
    },

    beforeMount(){
      axios
      .get("http://localhost:3000/account-mgmt")
      .then((res) => {
        var account = res.data.result;
        for(var x = 0; x < account.length; x++){
          var addData = {
            id: account[x].id,
            username: account[x].username,
            password: account[x].password,
            fname: account[x].fname,
            lname: account[x].lname,
            birthdate: account[x].birthdate,
            gender: account[x].gender
          }
          this.acc_mgmt.push(addData);
        }
      })
      .catch((err) => {
          console.log(err.res);
      });
    }
  }
</script>