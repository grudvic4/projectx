<template>
  <div class="container">
    <client-list-component />
    
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import ClientListComponent from "@/components/ClientListComponent.vue" // @ is an alias to /src

@Component({
  components: {
    ClientListComponent,
  },
})
export default class ClientList extends Vue {}
</script>
