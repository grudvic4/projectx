<template>
  <div class="container py-5">
    <b-row class="mb-5">
      <b-col cols="12">
        <detalji-klijent :clients="combinedClients"/>
      </b-col>
    </b-row>
    <b-row>
      <b-col cols="12">
        <b-tabs 
          active-nav-item-class="font-weight-bold text-uppercase text-success"
          content-class="mt-3">
          <b-tab title="KUF" active>
            <KlijentKuf :clients="combinedClients"/>
          </b-tab>
          <b-tab title="KIF">
            <KlijentKif :clients="combinedClients"/>
          </b-tab>
          <b-tab title="Dobavljaci">
            <postojeci-dobavljaci />
          </b-tab>
          <b-tab title="Kupci">
            <postojeci-kupci />
          </b-tab>
          <b-tab title="Knjiga EPO 1044">
            <knjiga-epo :clients="combinedClients"/>
          </b-tab>
          <b-tab title="Knjiga KPR 1041">
            <KnjigaKPR :clients="combinedClients"/>
          </b-tab>
        </b-tabs>
      </b-col>
    </b-row>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import DetaljiKlijent from "@/components/single/DetaljiKlijent.vue";
import KnjigaEpo from "@/components/list/KnjigaEpo.vue";
import PostojeciDobavljaci from '@/components/list/PostojeciDobavljaci.vue'; // Adjust the path if needed
import { useClientStore } from "@/store/clientStore";
import PostojeciKupci from "@/components/list/PostojeciKupci.vue";
import KlijentKuf from "@/components/list/KlijentKuf.vue";
import KlijentKif from "@/components/list/KlijentKif.vue";
import KnjigaKPR from "@/components/list/KnjigaKPR.vue";

@Component({
  components: {
    DetaljiKlijent,
    KlijentKuf,
    KlijentKif,
    KnjigaEpo,
    PostojeciDobavljaci,
    PostojeciKupci,
    KnjigaKPR,
  },
})
export default class NewClient extends Vue {
  get combinedClients() {
    const clientStore = useClientStore();
    return [...clientStore.clients]; // Combine clients from store and mock
  }
}
</script>
