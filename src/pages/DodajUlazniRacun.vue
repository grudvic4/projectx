<template>
  <div class="container">
    <ulazni-racun-form class="mb-5" />
    <b-button 
    class="mb-5"
      variant="outline-primary"
      size="xl"
      @click="$router.push('/clients')"
      >
      Pogledaj sve klijente
    </b-button>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import UlazniRacunForm from "@/components/UlazniRacunForm.vue";

@Component({
  components: {
    UlazniRacunForm
  },
})
export default class DodajUlazniRacun extends Vue {}
</script>
