import Vue from "vue";
// 注意引入在Vue的下面
// ElementUI组件库
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import App from "./App.vue";
import router from "./router";

import store from './store'

// 使用ElementUI
Vue.use(ElementUI);

// 权限拦截
import './permission'

// 关于生产环境  动态
Vue.config.productionTip = process.env.NODE_ENV === 'production';
console.log(process.env.VUE_APP_SERVICE_URI)  //开发环境development , 生产环境 production  

new Vue({
  router,
  store,  // 注册
  render: h => h(App)
}).$mount("#app");
