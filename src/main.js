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

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
