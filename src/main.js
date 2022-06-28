import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// 引入路由
import VueRouter from 'vue-router'
// 引入组件
import router from './router'

import axios from 'axios'

Vue.use(VueRouter)
Vue.use(ElementUI)

let bus = new Vue();
Vue.prototype.bus = bus;
Vue.prototype.axios = axios;
axios.defaults.timeout=3000;
// axios.defaults.baseURL="http://localhost:8081/";
axios.defaults.baseURL = '/api'


Vue.config.productionTip = false
new Vue({
  render: h => h(App),
  router
}).$mount('#app')
