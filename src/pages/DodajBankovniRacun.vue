<template>
  <b-container class="my-5">
    <b-row>
      <b-col cols="12">
        <b-breadcrumb>
          <b-breadcrumb-item to="/">Home</b-breadcrumb-item>
          <b-breadcrumb-item active>Dodaj novi bankovni racun</b-breadcrumb-item>
        </b-breadcrumb>
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <novi-bankovni-racun class="mb-5" />
      </b-col>
    </b-row>
  </b-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import NoviBankovniRacun from "@/components/form/NoviBankovniRacun.vue";

@Component({
  components: {
    NoviBankovniRacun
  },
})
export default class DodajNoviBankovniRacun extends Vue {}
</script>
