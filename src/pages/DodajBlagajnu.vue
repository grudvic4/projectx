<template>
  <b-container class="my-5">
    <b-row>
      <b-col cols="12">
        <b-breadcrumb>
          <b-breadcrumb-item to="/">Home</b-breadcrumb-item>
          <b-breadcrumb-item active>Dodaj novu blagajnu</b-breadcrumb-item>
        </b-breadcrumb>
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <NovaBlagajna class="mb-5" />
      </b-col>
    </b-row>
  </b-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import NovaBlagajna from "@/components/form/NovaBlagajna.vue";

@Component({
  components: {
    NovaBlagajna
  },
})
export default class DodajNovaBlagajna extends Vue {}
</script>
