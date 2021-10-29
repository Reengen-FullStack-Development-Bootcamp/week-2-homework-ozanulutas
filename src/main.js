import Vue from 'vue'
import App from './App.vue'
import router from './router'
import { BootstrapVue } from 'bootstrap-vue'
import Vuelidate from 'vuelidate'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

// Custom Css
import "@/assets/scss/main.scss"

Vue.use(BootstrapVue)
Vue.use(Vuelidate)

Vue.config.productionTip = false


// Filter
// Capitilazes the first chars in words
Vue.filter("capitalize", (val) => {
  if(!val) {
    return "";
  }
  return val.toString().split(" ").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ");
})

// Capitilazes the first chars in words
Vue.filter("prefix", (val) => {
  if(!val) {
    return "";
  }
  return `Mr. ${val}`;
})

// Parse date into local string
Vue.filter("parseDate", (val) => {
  if(!val) {
    return "";
  }
  return val.toLocaleString("en-US", { weekday: 'long', year: 'numeric', month: 'numeric', day: 'numeric' });
})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
