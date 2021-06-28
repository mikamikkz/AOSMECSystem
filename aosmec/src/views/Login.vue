<template>
  <div class="dashboard">
    <v-container class="mt-10 pt-10">
      <v-layout wrap>
        <v-flex sm12 md6 offset-md3>
          <v-card elevation="4" style="border-left: 10px solid green" tag="section">
            <v-card-title>
              <v-layout align-center justify-space-between>
                    <!-- <h3 class="font-weight-medium text-uppercase">Login</h3>
                    <v-spacer></v-spacer>
                    <v-flex>
                      <v-img contain height="100px" width="200px" src="../../public/logo.png" style="float: right;"></v-img>
                    </v-flex> -->
                    <v-img contain height="100px" width="200px" src="../../public/logo.png" style="float: right;"></v-img>
              </v-layout>
            </v-card-title>
            <v-divider></v-divider>
            <v-card-text>
              <p>Sign in with your username and password:</p>
              <v-form>
                <v-text-field outline label="Username" type="text" v-model="username"></v-text-field>
                <v-text-field outline hide-details label="Password" type="password" autocomplete="off" v-model="password"></v-text-field>
              </v-form>
            </v-card-text>
            <v-divider></v-divider>
            <v-card-actions :class="{ 'pa-3': $vuetify.breakpoint.smAndUp }">
              <v-spacer></v-spacer>
              <v-btn @click="login()" color="success" :large="$vuetify.breakpoint.smAndUp">Login</v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "Login",
  components: {},
  data() {
    return {
      username: "",
      password: "",
      passwordRules: [
        v => v.length > 0 || 'This field may not be empty'
      ],
    };
  },
  methods: {
    login: function(){
      let account = { username: this.username, password: this.password}
      axios
      .post("http://localhost:3000/login", account)
      .then((response) =>{
        if(response.status == 200){
          if(this.username == "admin"){
            this.$store.state.status = 1
            localStorage.status = 1
          }else{
            this.$store.state.status = 2
            localStorage.status = 2
          }
          this.$router.push('/dashboard');
        }
        if(response.status == 400){
          this.$router.go(-1);
        }
      })
      // .catch(err => {
      //   console.log(err.response.data.message);
      // });
      console.log(this.username)
      console.log(this.password)
    }
  },
  mounted() {
    if(localStorage.status){
      this.$store.state.status = localStorage.status
    }
    console.log(localStorage.status)
  }
};
</script>

<style scoped>
</style>
