import Vue from "vue";
import VueRouter, {RouteConfig} from "vue-router";
import Main from "@/views/Main.vue";
import Preview from "@/views/Preview.vue";
import NotFound from "@/views/NotFound.vue";
import Links from "@/views/Links.vue";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "NUSH.link",
    component: Main,
  },
  {
    path: "/home",
    name: "Home",
    component: Main,
  },
  {
    path: "/links",
    name: "My Links",
    component: Links,
  },
  {
    path: "/p/:alias",
    name: "Link preview",
    component: Preview
  },
  {
    path: "/404",
    name: "Not found",
    component: NotFound
  }
];

export default new VueRouter({
  routes,
});
