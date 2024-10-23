<template>
  <div class="container">
    <izlazni-racun-form class="mb-5" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import IzlazniRacunForm from "@/components/IzlazniRacunForm.vue";

@Component({
  components: {
    IzlazniRacunForm
  },
})
export default class DodajIzlazniRacun extends Vue {}
</script>
