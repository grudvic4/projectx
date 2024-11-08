<template>
  <b-container>
    <b-row>
      <b-col cols="12">
        <h2>Knjiga EPO 1044</h2>
        <div class="table-responsive">
          <table>
            <thead>
              <tr>
                <th>7) Red. br.</th>
                <th>8) Naziv kupca ili dobavljaca</th>
                <th>9) Broj racuna</th>
                <th>10) Datum izdavanja</th>
                <th>11) Iznos u KM</th>
                <th>12) Naplaceno Datum</th>
                <th>13) Naplaceno Iznos</th>
                <th>14) Broj racuna</th>
                <th>15) Datum prijema</th>
                <th>16) Iznos obaveze</th>
                <th>17) Placeno Datum</th>
                <th>18) Placeno Iznos</th>
                <th>19) Red. br. u KPR</th> 
              </tr>
            </thead>
            <tbody>
              <tr v-for="(client, index) in client.kif" :key="client.brojRacuna">
                <td>{{ index + 1 }}</td>
                <td>{{ client.kupac }}</td>
                <td>{{ client.brojRacuna }}</td>
                <td>{{ client.date }}</td>
                <td>{{ client.neto }}</td>
                <td>{{ client.datumPlacanja }}</td> <!-- Add your data here -->
                <td>{{ client.iznosUplate }}</td> <!-- Add your data here -->
                <td></td> <!-- Add your data here -->
                <td></td> <!-- Add your data here -->
                <td></td> <!-- Add your data here -->
                <td></td> <!-- Add your data here -->
                <td></td> <!-- Add your data here -->
                <td></td>
              </tr>
              <tr v-for="(client, index) in client.kuf" :key="client.brojKuf">
                <td>{{ index + 1 }}</td>
                <td>{{ client.dobavljac }}</td>
                <td></td> <!-- Add your data here -->
                <td></td> <!-- Add your data here -->
                <td></td> <!-- Add your data here -->
                <td></td> <!-- Add your data here -->
                <td></td> <!-- Add your data here -->
                <td>{{ client.brojKuf }}</td>
                <td>{{ client.date }}</td>
                <td>{{ client.bruto }}</td>
                <td>{{ client.datumPlacanja }}</td> <!-- Add your data here -->
                <td>{{ client.iznosUplate }}</td> <!-- Add your data here -->
                <td></td>
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
import clientMock from '@/data/clientMock'; // Import your mock data

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
