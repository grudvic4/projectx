<template>
  <div>
    <b-row class="mb-5">
      <b-col class="text-center">
        <h3>Dobrodoso [UserName]</h3>
      </b-col>
    </b-row>
    <b-row class="justify-content-center">
  <b-col cols="12" lg="3" class="mb-5" order="2" order-lg="1">
    <b-card 
    border-variant="primary">
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
          <b-button disabled variant="outline-primary disabled" >Lista dobavljaca</b-button>
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
        <b-button disabled variant="outline-danger">Lista kupaca</b-button>
      </div>
      
    </b-card>
  </b-col>
</b-row>

  </div>
  
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class Home extends Vue {
  @Prop() private msg!: string;
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
