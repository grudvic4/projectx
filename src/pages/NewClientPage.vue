<template>
  <div class="container">
    <create-client-form class="mb-5" />
    <b-button 
    class="mb-5"
      variant="outline-primary"
      size="xl"
      @click="$router.push('/clients')"
      >
      Pogledaj sve klijente
    </b-button>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import CreateClientForm from "@/components/CreateClientForm.vue" // @ is an alias to /src
import ClientListComponent from "@/components/ClientListComponent.vue" // @ is an alias to /src

@Component({
  components: {
    CreateClientForm,
    ClientListComponent,
  },
})
export default class newClient extends Vue {}
</script>
