import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import HomeView from "../pages/HomeView.vue";
import NewClient from "@/pages/NewClientPage.vue";
import ListaKlijenata from "@/pages/ListaKlijenata.vue";
import DodajUlazniRacun from "@/pages/DodajUlazniRacun.vue";
import DodajIzlazniRacun from "@/pages/DodajIzlazniRacun.vue";
import SingleClient from "@/pages/SingleClient.vue";
import DodajDobavljaca from "@/pages/DodajDobavljaca.vue";
import DodajKupcaPage from "@/pages/DodajKupcaPage.vue";
import ListaDobavljaca from "@/pages/ListaDobavljaca.vue";
import KupacList from "@/pages/KupacList.vue";
import NoviIzvod from "@/components/form/NoviIzvod.vue";
import DodajNoviBankovniRacun from "@/pages/DodajBankovniRacun.vue";
import BlagajnaForm from "@/components/form/BlagajnaForm.vue";
import EditBankovniRacun from "@/components/form/EditBankovniRacun.vue";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/new-client",
    name: "new-client",
    component: NewClient,
  },
  {
    path: "/clients",
    name: "clients",
    component: ListaKlijenata,
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
    component : DodajDobavljaca
  },
  {
    path : "/dodaj-kupca",
    name : "dodaj-kupca",
    component : DodajKupcaPage
  },
  {
    path : "/dobavljaci",
    name : "dobavljaci",
    component : ListaDobavljaca
  },
  {
    path : "/kupci",
    name : "kupci",
    component : KupacList
  },
  {
    path: '/izvod',
    name: 'izvod',
    component: NoviIzvod
  },
  {
    path: '/blagajna?clientKey=:clientKey',
    name: 'blagajna',
    component: BlagajnaForm
  },
  {
    path: "/dodaj-bankovni-racun?clientKey=:clientKey",
    name: 'dodaj-bankovni-racun',
    component: DodajNoviBankovniRacun

  },
  {
    path: '/edit-bank-account/:clientKey/:ziroRacun',
    name: 'EditBankAccount',
    component: EditBankovniRacun,
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
