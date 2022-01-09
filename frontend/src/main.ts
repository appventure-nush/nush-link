import Vue from "vue";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import router from "./plugins/router";
import store from "@/plugins/vuex";
import VueScrollTo from "vue-scrollto";

Vue.use(VueScrollTo, {
  container: "body",
  duration: 500,
  easing: "ease",
  offset: 0,
  force: true,
  cancelable: true,
  onStart: false,
  onDone: false,
  onCancel: false,
  x: false,
  y: true
});

Vue.config.productionTip = false;

new Vue({
  vuetify,
  router,
  store,
  render(h) { return h(App); },
}).$mount("#app");
