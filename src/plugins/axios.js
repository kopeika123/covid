// Lib imports
import axios from 'axios'

const instance  = axios.create({
  baseURL: process.env.VUE_APP_COVID+""
})
Vue.prototype.$http = instance
