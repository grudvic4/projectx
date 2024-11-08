<template>
  <b-container>
    <b-row>
      <b-col cols="12">
        <h2>Knjiga KPR 1041</h2>
        <div>
          <table class="table">
            <thead>
              <tr>
                <th>7) Red. br.</th>
                <th>8) Datum prihoda/rashoda</th>
                <th>9) Broj dokumenta</th>
                <th>10) Opis dokumenta</th>
                <th>11) U gotovini</th>
                <th>12) Preko bankovnog racuna</th>
                <th>13) U stvarima i uslugama</th>
                <th>14) PDV u prihodima</th>
                <th>15) Ukupni prihodi</th>
                <th>16) U robi / materijalu</th>
                <th>17) Bruto place zaposlenika</th>
                <th>18) Placeni doprinosi poduzetnika</th>
                <th>19) Ostalo</th>
                <th>20) PDV u rashodima</th>
                <th>21) Ukupni rashodi</th>
              </tr>
            </thead>
            <tbody>
              <tr v-if="filteredKif.length === 0 && filteredKuf.length === 0">
                <td colspan="15">No data available</td>
              </tr>
              <tr v-for="(client, index) in filteredKif" :key="client.brojRacuna">
                <td>{{ index + 1 }}</td>
                <td>{{ client.datumPlacanja }}</td>
                <td>{{ client.brojRacuna }}</td>
                <td></td>
                <td>{{ client.iznosUplate }}</td>
                <td>0</td>
                <td>0</td>
                <td>0</td>
                <td>{{ client.iznosUplate }}</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr v-for="(client, index) in filteredKuf" :key="client.brojKuf">
                <td>{{ index + 1 }}</td>
                <td>{{ client.datumPlacanja }}</td>
                <td>{{ client.brojKuf }}</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td>{{ client.iznosUplate }}</td>
                <td>0</td>
                <td>0</td>
                <td>0</td>
                <td>0</td>
                <td>{{ client.iznosUplate }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import { useClientStore } from '@/store/clientStore';

export default {
  props: {
    clients: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      client: null // Holds the found client data
    };
  },
  computed: {
    filteredKif() {
      return this.client && this.client.kif
        ? this.client.kif.filter(item => item.iznosUplate !== null && item.iznosUplate > 0)
        : [];
    },
    filteredKuf() {
      return this.client && this.client.kuf
        ? this.client.kuf.filter(item => item.iznosUplate !== null && item.iznosUplate > 0)
        : [];
    },
  },
  mounted() {
    const clientKey = this.$route.params.clientKey;
    const clientStore = useClientStore();

    // Combine clients from store and mock data
    const combinedClients = [...clientStore.clients];

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
