<template>
  <div class="container">
    <single-client />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import SingleClient from "@/components/SingleClient.vue";

@Component({
  components: {
    SingleClient
  },
})
export default class newClient extends Vue {}
</script>
