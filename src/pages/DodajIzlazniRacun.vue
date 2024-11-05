<template>
  <div class="container">
    <izlazni-racun class="mb-5" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import IzlazniRacun from "@/components/form/IzlazniRacun.vue";

@Component({
  components: {
    IzlazniRacun
  },
})
export default class DodajIzlazniRacun extends Vue {}
</script>
