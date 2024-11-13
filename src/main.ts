import Vue, { markRaw } from "vue";
import App from "./App.vue";
import router from "./router";
import BootstrapVue from "bootstrap-vue";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import { createPinia, PiniaVuePlugin } from "pinia";
import 'bootstrap-icons/font/bootstrap-icons.css';


Vue.use(PiniaVuePlugin);
export const pinia = createPinia();
pinia.use(({ store }) => {
  store.router = markRaw(router);
});

Vue.use(BootstrapVue);
Vue.config.productionTip = false;

 // Create a Pinia instance

 const myApp = new Vue({
  pinia,
  router,
  render: (h) => h(App),
});

myApp.$mount("#app");
