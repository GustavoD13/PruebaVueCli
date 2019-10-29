import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './registerServiceWorker'
import axios from 'axios';
import VueAxios from 'vue-axios'
import BootstrapVue from 'bootstrap-vue'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import { library } from '@fortawesome/fontawesome-svg-core'
import { faCoffee, faThList, faTh, faEdit, faFilePdf, faSave } from '@fortawesome/free-solid-svg-icons'
import  {FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faCoffee, faTh, faThList, faEdit, faFilePdf,faSave )

Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.use(BootstrapVue)
Vue.use(VueAxios, axios)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
