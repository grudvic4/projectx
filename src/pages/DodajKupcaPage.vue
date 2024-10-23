<template>
  <div class="container">
    <novi-kupac-forma class="mb-5" />
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
