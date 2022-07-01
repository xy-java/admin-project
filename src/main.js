import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// 引入路由
import VueRouter from 'vue-router'
// 引入组件
import router from './router'
import axios from 'axios'
import echarts from 'echarts'


let bus = new Vue();
Vue.prototype.bus = bus;
Vue.prototype.axios = axios;
Vue.prototype.echarts = echarts;
axios.defaults.timeout=3000;
// axios.defaults.baseURL="http://localhost:8081/";
axios.defaults.baseURL = '/api'

Vue.use(VueRouter)
Vue.use(ElementUI)
Vue.config.productionTip = false
new Vue({
  render: h => h(App),
  router
}).$mount('#app')
