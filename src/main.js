import Vue from "vue";
import App from "./App.vue";
import ElementUI from "element-ui";
import VueRouter from "vue-router";
import "element-ui/lib/theme-chalk/index.css";
import router from "./router/index";
import "./mock/index.js";
import store from "./store/index.js";
// import "amfe-flexible";

Vue.config.productionTip = false;
Vue.use(VueRouter);
Vue.use(ElementUI);

new Vue({
  store,
  router,
  render: (h) => h(App),
}).$mount("#app");
