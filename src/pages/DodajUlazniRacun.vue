<template>
  <div class="container">
    <ulazni-racun class="mb-5" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import UlazniRacun from "@/components/form/UlazniRacun.vue";

@Component({
  components: {
    UlazniRacun
  },
})
export default class DodajUlazniRacun extends Vue {}
</script>
