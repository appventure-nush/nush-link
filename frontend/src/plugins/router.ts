import Vue from "vue";
import VueRouter, {RouteConfig} from "vue-router";
import Main from "@/views/Main.vue";
import About from "@/views/About.vue";
import Profile from "@/views/Profile.vue";
import Calendar from "@/views/Calendar.vue";
import Login from "@/views/Login.vue";
import Preview from "@/views/Preview.vue";
import NotFound from "@/views/NotFound.vue";

Vue.use(VueRouter);

const routes: Array<RouteConfig | any> = [
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
    path: "/about",
    name: "About",
    component: About,
  },
  {
    path: "/profile",
    name: "Your Profile",
    component: Profile,
  },
  {
    path: "/calendar",
    name: "Calendar",
    component: Calendar,
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
