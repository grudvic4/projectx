<template>
  <b-container>
    <b-row>
      <b-col cols="12">
        <b-table
          :items="client.kuf"
          :fields="tableFields"
          responsive="md"
          class="mb-4"
        >
          <template #cell(index)="data">
            {{ data.index + 1 }}
          </template>
          <template #cell(dobavljac)="data">
            {{ data.item.dobavljac }}
          </template>
          <template #cell(brojKuf)="data">
            {{ data.item.brojKuf }}
          </template>
          <template #cell(date)="data">
            {{ data.item.date }}
          </template>
          <template #cell(bruto)="data">
            {{ data.item.bruto }}
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
            <router-link :to="getIzvodLink(data.item.brojKuf)">
              <b-button variant="outline-success" size="sm">Dodaj izvod</b-button>
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
        { key: 'dobavljac', label: 'Naziv dobavljaca' },
        { key: 'brojKuf', label: 'Broj racuna' },
        { key: 'date', label: 'Datum prijema' },
        { key: 'bruto', label: 'Iznos obaveze' },
        { key: 'placeno-datum', label: 'Datum placanja' },
        { key: 'placeno-iznos', label: 'Iznos placanja' },
        { key: 'kprRedniBr', label: 'Red. br. u KPR' },
        { key: 'akcija', label: 'Akcija' }
      ]
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
  },
  methods: {
    getIzvodLink(brojKuf) {
      return {
        name: 'izvod',
        params: { clientKey: this.$route.params.clientKey }, // Pass clientKey as a param
        query: { brojKuf: brojKuf } // Add brojKuf as a query parameter
      };
    }
  }
};
</script>
