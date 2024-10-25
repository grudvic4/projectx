<template>
  <div class="container py-5">
    <b-row class="mb-5">
      <b-col cols="12" >
        <b-breadcrumb>
          <b-breadcrumb-item to="/">Home</b-breadcrumb-item>
          <b-breadcrumb-item active>Dodaj novog dobavljaca</b-breadcrumb-item>
        </b-breadcrumb>
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <novi-dobavljac-forma class="mb-5" />
      </b-col>
    </b-row>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import NoviDobavljacForma from "@/components/NoviDobavljacForma.vue";

@Component({
  components: {
    NoviDobavljacForma,
  },
})
export default class noviDobavljac extends Vue {}
</script>
