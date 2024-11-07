<template>
  <b-container>
    <b-row>
      <b-col cols="12">
        <b-table
          :items="client.kif"
          :fields="tableFields"
          responsive="md"
          class="mb-4"
        >
          <template #cell(index)="data">
            {{ data.index + 1 }}
          </template>
          <template #cell(kupac)="data">
            {{ data.item.kupac }}
          </template>
          <template #cell(brojRacuna)="data">
            {{ data.item.brojRacuna }}
          </template>
          <template #cell(date)="data">
            {{ data.item.date }}
          </template>
          <template #cell(neto)="data">
            {{ data.item.neto }}
          </template>
          <template #cell(placeno-datum)="data">
            {{ data.item.datumPlacanja }}
          </template>
          <template #cell(placeno-iznos)="data">
            {{ data.item.iznosUplate }}
          </template>
          <template #cell(kprRedniBr)="data">
            {{ data.index + 1 }}
          </template>
          <template #cell(akcija)="data">
            <router-link :to="getBlagajnaLink(data.item.brojRacuna)">
              <b-button variant="outline-success" size="sm">Dodaj blagajnu</b-button>
            </router-link>
          </template>
        </b-table>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import { useClientStore } from '@/store/clientStore';
import clientMock from '@/data/clientMock';

export default {
  props: {
    clients: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      client: null, // Holds the found client data
      tableFields: [
        { key: 'index', label: 'Red. br.' },
        { key: 'kupac', label: 'Naziv kupca' },
        { key: 'brojRacuna', label: 'Broj racuna' },
        { key: 'date', label: 'Datum prijema' },
        { key: 'neto', label: 'Iznos obaveze' },
        { key: 'placeno-datum', label: 'Datum placanja' },
        { key: 'placeno-iznos', label: 'Iznos placanja' },
        { key: 'kprRedniBr', label: 'Red. br. u KPR' },
        { key: 'akcija', label: 'Akcija' }
      ]
    };
  },
  methods: {
    getBlagajnaLink(brojRacuna) {
      return {
        name: 'blagajna',
        params: { clientKey: this.$route.params.clientKey }, // Pass clientKey as a param
        query: { brojRacuna: brojRacuna } // Add brojKuf as a query parameter
      };
    }
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
