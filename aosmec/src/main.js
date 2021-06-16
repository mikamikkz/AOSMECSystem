import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import Axios from 'axios'
import vuetify from './plugins/vuetify';
import routes from './router/index'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

Vue.use(VueRouter);
Vue.use(Vuex);

Vue.config.productionTip = false

const store = new Vuex.Store({
  plugins: [createPersistedState({
    storage: window.sessionStorage,
  })],
  state:{ 
    //global variables - access: this.$store.state.<id>
    status: 0,
    //0 - not logged in ; 1 - logged in
    user: 0
    //0 - front desk ; 1 - admin
  }
})

//Use sessionStorage.clear(); when user logs out manually.
const router = new VueRouter({
  routes: routes,
  mode:'history'
});

new Vue({
  el: '#app',
  vuetify,
  Axios,
  render: h => h(App),
  router: router,
  store: store,
}).$mount('#app')

export const EventBus = new Vue();