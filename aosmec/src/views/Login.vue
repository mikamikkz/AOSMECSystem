<template>
  <div class="dashboard">
    <v-container class="mt-10 pt-10">
      <v-alert
      color="red"
      dismissible
      outlined
      text
      icon="mdi-alert-outline"
      transition="scroll-y-transition"
      :value="alert"
    >{{ displayAlert }}</v-alert>
      <v-layout wrap>
        <v-flex sm12 md6 offset-md3>
          <v-card elevation="4" style="border-left: 10px solid green" tag="section">
            <v-card-title>
              <v-layout align-center justify-space-between>
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
      alert: false,
      displayAlert: "",
    };
  },
  methods: {
    showAlert: function(message){
      this.alert = true;
      this.displayAlert = message;
      window.setInterval(() => {
        this.alert = false;
      }, 5000)
    },
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
          console.log(response.data.message);
        }
        if(response.status == 404){
          this.showAlert(response.data.message);
        }
        if(response.status == 400){
          this.$router.go(-1);
          this.showAlert(response.data.message);
        }
      })
      .catch(err => {
        console.log(err.response.data.message);
        this.showAlert(err.response.data.message);
      });
      console.log(this.username)
      console.log(this.password)
    }
  },
  mounted() {
    if(localStorage.status){
      this.$store.state.status = localStorage.status
    }
    console.log(this.$store.state.status)
    console.log(localStorage.status)
  }
};
</script>

<style scoped>
</style>
