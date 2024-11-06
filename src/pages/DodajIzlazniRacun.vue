<template>
  <b-container class="my-5">
    <b-row>
      <b-col cols="12">
        <b-breadcrumb>
          <b-breadcrumb-item to="/">Home</b-breadcrumb-item>
          <b-breadcrumb-item active>Dodaj novi ulazni racun</b-breadcrumb-item>
        </b-breadcrumb>
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <izlazni-racun class="mb-5" />
      </b-col>
    </b-row>
  </b-container>
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
