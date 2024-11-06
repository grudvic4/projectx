<template>
  <b-container>
    <b-row>
      <b-col cols="12" lg="3">
        <b-card
          title="Podaci o vlasniku"
          class="mb-3"
        >
          <p class="mb-0">1. JMB:</p>
          <p>{{ client.vlasnikJMBG }}</p>
          <p class="mb-0">2. Ime i prezime:</p>
          <p>{{ client.vlasnikImePrezime }}</p>
          <p class="mb-0">3. Adresa:</p>
          <p>{{ client.vlasnikAdresa }}</p>    
        </b-card>
      </b-col>
      <b-col cols="12" lg="4">
        <b-card
          title="Podaci o registrovanoj djelatnosti"
          class="mb-3"
        >
          <p class="mb-0">4. JIB:</p>
          <p>{{ client.jib }}</p>
          <p class="mb-0">5. Naziv:</p>
          <p>{{ client.name }}</p>
          <p class="mb-0">6. Adresa:</p>
          <p>{{ client.address }}</p>
        </b-card>
      </b-col>
      <b-col cols="12" lg="5">
        <b-card
          title="Akcije"
          class="mb-3"
        >
          <b-button 
            variant="primary"
            size="sm"
            class="mr-3"
            @click="$router.push({ name: 'dodaj-ulazni-racun', params: { clientKey: client.clientKey } })"
          >
            Dodaj ulazni racun
          </b-button>
          <b-button 
            variant="success"
            size="sm"
            class="mx-3"
            @click="$router.push({ name: 'dodaj-izlazni-racun', params: { clientKey: client.clientKey } })"
          >
            Dodaj izlazni racun
          </b-button>
          <div class="my-3 border-top" />
          <b-button 
              variant="outline-primary"
              size="sm"
              class="mr-3"
              @click="$router.push({ name: 'dodaj-ulazni-racun', params: { clientKey: client.clientKey } })"
            >
              Dodaj kupca
            </b-button>
            <b-button 
              variant="outline-success"
              size="sm"
              class="mx-3"
              @click="$router.push({ name: 'dodaj-izlazni-racun', params: { clientKey: client.clientKey } })"
            >
              Dodaj dobavljaca
            </b-button>
            <div class="my-3 border-top" />
        </b-card>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import { useClientStore } from '@/store/clientStore';
import clientMock from '@/data/clientMock'; // Import your mock data

export default {
  data() {
    return {
      client: null // Holds the found client data
    };
  },
  mounted() {
    const clientKey = this.$route.params.clientKey;
    const clientStore = useClientStore();

    // Combine clients from store and mock data
    const combinedClients = [...clientStore.clients, ...clientMock];

    // Find the client based on the clientKey from the URL
    this.client = combinedClients.find(client => client.clientKey === clientKey);

    if (!this.client) {
      console.error('Client not found with clientKey:', clientKey);
    }
  }
};
</script>

<style scoped>
/* Add any component-specific styling here */
</style>
