import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import HomeView from "../pages/HomeView.vue";
import NewClient from "@/pages/NewClientPage.vue";
import ClientsList from "@/pages/ClientList.vue";
import DodajUlazniRacun from "@/pages/DodajUlazniRacun.vue";
import DodajIzlazniRacun from "@/pages/DodajIzlazniRacun.vue";
import SingleClient from "@/pages/SingleClient.vue";
import DodajDodavljacaPage from "@/pages/DodajDobavljacaPage.vue";
import DodajKupcaPage from "@/pages/DodajKupcaPage.vue";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/about",
    name: "about",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../pages/AboutView.vue"),
  },
  {
    path: "/new-client",
    name: "new-client",
    component: NewClient,
  },
  {
    path: "/clients",
    name: "clients",
    component: ClientsList,
  },
  {
    path : "/dodaj-ulazni-racun/:clientKey",
    name : "dodaj-ulazni-racun",
    component : DodajUlazniRacun
  },
  {
    path : "/dodaj-izlazni-racun/:clientKey",
    name : "dodaj-izlazni-racun",
    component : DodajIzlazniRacun
  },
  {
    path : "/account?clientKey=:clientKey",
    name : "account",
    component : SingleClient
  },
  {
    path : "/dodaj-dobavljaca",
    name : "dodaj-dobavljaca",
    component : DodajDodavljacaPage
  },
  {
    path : "/dodaj-kupca",
    name : "dodaj-kupca",
    component : DodajKupcaPage
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
