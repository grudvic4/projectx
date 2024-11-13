<template>
  <div>
    <b-row class="mb-5">
      <b-col class="text-center">
        <h3>Dobrodošli [UserName]</h3>
        <div>
          <!-- Button to clear clients data from localStorage -->
          <b-button @click="clearClients" variant="danger" class="mb-3">Clear Clients</b-button>
        </div>
      </b-col>
    </b-row>

    <b-row class="justify-content-center">
      <b-col cols="12" lg="3" class="mb-5" order="2" order-lg="1">
        <b-card border-variant="primary">
          <div class="text-center mb-3">
            <i class="bi bi-box-seam-fill text-primary" style="font-size: 3rem;"></i> 
          </div>
          <b-card-title>Dobavljaci</b-card-title>
          <b-card-text>
            Pregled i obrada dobavljaca
          </b-card-text>
          <div class="mb-3">
            <router-link to="/dodaj-dobavljaca">
              <b-button variant="primary">Dodaj novog dobavljaca</b-button>
            </router-link>
          </div>
          <div>
            <router-link to="/dobavljaci">
              <b-button variant="outline-primary">Lista dobavljaca</b-button>
            </router-link>
          </div>
        </b-card>
      </b-col>

      <b-col cols="12" lg="3" class="mb-5" order="1" order-lg="2">
        <b-card border-variant="success">
          <div class="text-center mb-3">
            <i class="bi bi-person-vcard text-success" style="font-size: 3rem;"></i> 
          </div>
          <b-card-title>Klijenti</b-card-title>
          <b-card-text>
            Pregled i obrada klijenata
          </b-card-text>
          <div class="mb-3">
            <router-link to="/new-client">
              <b-button variant="success">Dodaj novog klijenta</b-button>
            </router-link>
          </div>
          <div>
            <router-link to="/clients">
              <b-button variant="outline-success">Lista klijenta</b-button>
            </router-link>  
          </div>
        </b-card>
      </b-col>

      <b-col cols="12" lg="3" order="3">
        <b-card border-variant="danger">
          <div class="text-center mb-3">
            <i class="bi bi-basket2 text-danger" style="font-size: 3rem;"></i> 
          </div>
          <b-card-title>Kupci</b-card-title>
          <b-card-text>
            Pregled i obrada kupaca
          </b-card-text>
          <div class="mb-3">
            <router-link to="/dodaj-kupca">
              <b-button variant="danger">Dodaj novog kupca</b-button>
            </router-link>
          </div>
          <div>
            <router-link to="/kupci">
              <b-button variant="outline-danger">Lista kupaca</b-button>
            </router-link>
          </div>
        </b-card>
      </b-col>
    </b-row>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { BButton } from "bootstrap-vue";

@Component({
  components: {
    BButton,
  },
})
export default class Home extends Vue {
  // Method to clear clients data from localStorage
  clearClients() {
    localStorage.removeItem('clients');
    alert("Clients data has been cleared from localStorage!");
  }
}
</script>

<style scoped>
/* Your custom styles here */
</style>
