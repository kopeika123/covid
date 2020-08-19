import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import covid from './components/Covid'
import {sync} from "vuex-router-sync"
import 'vue-search-select/dist/VueSearchSelect.css'
import axios from 'axios'

axios.defaults.headers.get['Accept'] = 'application/json'
Vue.component('covid', covid)

sync(store, router)
Vue.config.productionTip = false
new Vue({
  vuetify,
  covid,
  store,
  router,
  render: h => h(App),
}).$mount('#app')
