<template>
  <div class="container py-5">
    <home-component />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import HomeComponent from "@/components/HomeComponent.vue"; // @ is an alias to /src

@Component({
  components: {
    HomeComponent,
  },
})
export default class HomeView extends Vue {}
</script>
