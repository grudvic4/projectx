<template>
  <b-container>
      <div class="row">
        <div class="col-12">
          <h2>Detalji klijenta</h2>
          <div v-if="client">
          <p><strong>Ime:</strong> {{ client.name }}</p>
          <p><strong>Adresa:</strong> {{ client.address }}</p>
          <p><strong>Grad:</strong> {{ client.grad }}</p>
          <p><strong>PDV broj:</strong> {{ client.pdv }}</p>
          <p><strong>JIB:</strong> {{ client.jib }}</p>
          <p><strong>Tip:</strong> {{ client.type }}</p>
          <!-- Add more fields as needed -->
          <h4>Entries:</h4>
          <div class="table-responsive">
            <b-table :items="client.entries" :fields="fields"></b-table>
          </div>
        
        </div>
        <div v-else>
          <p>Klijent nije pronađen.</p>
        </div>
        </div>
      </div>
  </b-container>
</template>

<script>
import { useClientStore } from '@/store/clientStore';

export default {
  data() {
    return {
      client: null // Holds the found client data
    };
  },
  mounted() {
    const clientKey = this.$route.params.clientKey;
    const clientStore = useClientStore();

    // Find the client based on the clientKey from the URL
    this.client = clientStore.clients.find(client => client.clientKey === clientKey);

    if (!this.client) {
      console.error('Client not found with clientKey:', clientKey);
    }
  }
};
</script>

<style scoped>
/* Add any component-specific styling here */
</style>
