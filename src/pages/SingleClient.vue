<template>
  <div class="container py-5">
    <b-row class="mb-5">
      <b-col cols="12" lg="6">
        <single-client :clients="combinedClients"/>
      </b-col>
    </b-row>
    <b-row>
      <b-col cols="12">
        <b-tabs 
          active-nav-item-class="font-weight-bold text-uppercase text-success"
          content-class="mt-3">
          <b-tab title="Knjiga EPO 1044" active>
            <knjiga-epo :clients="combinedClients"/>
          </b-tab>
          <b-tab title="Prazan primjer"><p>Ne znam sta se ocekivali, rekao sam fino da je prazno.</p></b-tab>
          <b-tab title="Knjiga EPO 2" disabled><p>I'm a disabled tab!</p></b-tab>
          <b-tab title="Dobavljaci"><dobavljac-list-component /></b-tab>
          <b-tab title="Kupci"><kupci-list-component /></b-tab>
        </b-tabs>
      </b-col>
    </b-row>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import DetaljiKlijnet from "@/components/single/DetaljiKlijnet.vue";
import KnjigaEpo from "@/components/list/KnjigaEpo.vue";
import clientMock from '@/data/clientMock';
import PostojeciDobavljaci from '@/components/list/PostojeciDobavljaci.vue'; // Adjust the path if needed
import { useClientStore } from "@/store/clientStore";
import PostojeciKupci from "@/components/list/PostojeciKupci.vue";

@Component({
  components: {
    DetaljiKlijnet,
    KnjigaEpo,
    PostojeciDobavljaci,
    PostojeciKupci,
  },
})
export default class NewClient extends Vue {
  get combinedClients() {
    const clientStore = useClientStore();
    return [...clientStore.clients, ...clientMock]; // Combine clients from store and mock
  }
}
</script>
