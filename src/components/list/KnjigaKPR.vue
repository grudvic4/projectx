<template>
  <b-container>
    <b-row>
      <b-col cols="12">
        <h2>Knjiga KPR 1041</h2>
        <div >
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
              <tr v-for="(client, index) in client.kif" :key="client.brojRacuna">
                <td>{{ index + 1 }}</td>
                <td>{{ client.kupac }}</td>
                <td>{{ client.brojRacuna }}</td>
                <td>{{ client.date }}</td>
                <td>{{ client.iznosUplate }}</td>
                <td>0</td> <!-- Add your data here -->
                <td>0</td> <!-- Add your data here -->
                <td>0</td> <!-- Add your data here -->
                <td>{{ client.iznosUplate }}</td> <!-- Add your data here -->
                <td></td> <!-- Add your data here -->
                <td></td> <!-- Add your data here -->
                <td></td> <!-- Add your data here -->
                <td>{{ index + 1 }}</td>
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
                <td>{{ client.neto }}</td>
                <td></td> <!-- Add your data here -->
                <td></td> <!-- Add your data here -->
                <td>{{ index + 1 }}</td>
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
