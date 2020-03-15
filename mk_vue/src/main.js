import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 注册全局公用变量
import bus from './util/bus.js';
Vue.prototype.bus = bus;

// 引入Bootstrap-vue和Bootstrap
import BootstrapVue from "bootstrap-vue"
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
Vue.use(BootstrapVue);

// 引入axios
// import {
//   axios
// } from "./util/axios";
// Vue.prototype.axios = axios;

// 引入全局变量
import global_config from './util/global';
Vue.prototype.$global = global_config;

// 全局注册qs
// import qs from 'qs';
// Vue.prototype.qs = qs;







Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')