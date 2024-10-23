<template>
  <div class="container">
    <novi-dobavljac-forma class="mb-5" />
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
