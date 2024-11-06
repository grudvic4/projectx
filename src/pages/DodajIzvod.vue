<template>
  <b-container class="my-5">
    <b-row>
      <b-col cols="12">
        <b-breadcrumb>
          <b-breadcrumb-item to="/">Home</b-breadcrumb-item>
          <b-breadcrumb-item active>Dodaj novi izvod</b-breadcrumb-item>
        </b-breadcrumb>
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <NoviIzvod class="mb-5" />
      </b-col>
    </b-row>
  </b-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import NoviIzvod from "@/components/form/NoviIzvod.vue";

@Component({
  components: {
    NoviIzvod
  },
})
export default class DodajNoviIzvod extends Vue {}
</script>
