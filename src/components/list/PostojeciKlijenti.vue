<template>
  <b-container>
    <h2 class="mb-5">Lista klijenata</h2>
    <b-card 
      v-for="(client, index) in clients" 
      class="mb-3"
      :key="client.pdv"
      @click="toggleCollapse(index)"
    >
      <template #header>
        <span>
          {{ `${index + 1} | ${client.name}` }} - {{ client.pdv }}
        </span>
        <b-button 
          variant="outline-primary"
          size="sm"
          class="mx-3"
          @click="$router.push({ name: 'dodaj-ulazni-racun', params: { clientKey: client.clientKey } })"
        >
          Dodaj ulazni racun
        </b-button>
        <b-button 
          variant="outline-success"
          size="sm"
          class="mx-3"
          @click="$router.push({ name: 'dodaj-izlazni-racun', params: { clientKey: client.clientKey } })"
        >
          Dodaj izlazni racun
        </b-button>
        <b-button 
          variant="success"
          size="sm"
          class="mx-3"
          @click="$router.push({ name: 'account', params: { clientKey: client.clientKey } })"
        >
          Detaljno
        </b-button>
      </template>

      <b-collapse :id="'collapse-' + index" v-model="collapse[index]">
        <b-card-text>
          Oblik: {{ client.type }} <br>
          Adresa: {{ client.address }} <br>
          Grad: {{ client.grad }} <br>
          PDV: {{ client.pdv }} <br>
          JIB: {{ client.jib }} <br>
          <span v-if="client.dobavljac">Dobavljač <br></span> 
          <span v-if="client.kupac">Kupac <br></span>
          <span v-if="client.pdvObveznik">PDV obveznik <br></span>
          Entitet: {{ client.entitet }}
        </b-card-text>
      </b-collapse>
    </b-card>
  </b-container>
</template>

<script>
import { useClientStore } from '@/store/clientStore';// Import your mock data

export default {
  data() {
    return {
      collapse: []  // Array to keep track of collapse states for each card
    };
  },
  computed: {
    clients() {
      const clientStore = useClientStore();
      // Combine the clients from the store and the mock data
      return [...clientStore.clients];
    }
  },
  methods: {
    toggleCollapse(index) {
      this.$set(this.collapse, index, !this.collapse[index]);
    }
  }
};
</script>

<style scoped>
/* Add any component-specific styling here */
</style>
