<template>
  <div class="container py-5">
    <b-row class="mb-5">
      <b-col cols="12" >
        <b-breadcrumb>
          <b-breadcrumb-item to="/">Home</b-breadcrumb-item>
          <b-breadcrumb-item active>Dodaj novog kupca</b-breadcrumb-item>
        </b-breadcrumb>
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <novi-kupac-forma class="mb-5" />   
      </b-col>
    </b-row>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import NoviKupacForma from "@/components/NoviKupacForma.vue";

@Component({
  components: {
    NoviKupacForma,
  },
})
export default class noviKupac extends Vue {}
</script>
