<template>
  <div>
    <b-row class="text-center my-5" v-if="!hasActiveZiroRacun">
      <b-col cols="12">
        <h4 class="mb-5 text-danger">Trenutno nemate dodanu banku, <br>  da bi dodali blagajnu morate imati 1 aktivan Žiro račun</h4>
        <b-button
          variant="primary"
          size="sm"
          @click="$router.push({ name: 'dodaj-bankovni-racun', params: { clientKey: client.clientKey } })"
        >
          Dodaj novu banku
        </b-button>
      </b-col>
    </b-row>
    <div v-else>
      <b-row class="text-center">
        <b-col cols="12">
          <h1 class="mb-4">Dodaj novu blagajnu</h1>
          <h4>Aktivan žiro račun: {{ activeZiroRacun || 'Nema aktivnog računa' }}</h4>
        </b-col>
      </b-row>
      <b-row class="justify-content-center">
        <b-col cols="12" lg="8">
          <b-form @submit.prevent="onSubmit">
            <b-row>
              <b-col cols="6">
                <b-form-group label="Datum plaćanja" label-for="datum-placanja" class="mb-2">
                  <b-form-datepicker
                    id="datum-placanja"
                    v-model="form.datumPlacanja"
                    placeholder="Izaberite datum plaćanja"
                    :date-format-options="{ day: 'numeric', month: 'numeric', year: 'numeric' }"
                    class="mb-2"
                  />
                </b-form-group>
              </b-col>
              <b-col cols="6">
                <b-form-group label="Iznos uplate" label-for="iznos-uplate" class="mb-2">
                  <b-form-input
                    id="iznos-uplate"
                    type="number"
                    v-model="form.iznosUplate"
                    required
                    :state="!hasSubmitted || form.iznosUplate !== null"
                  ></b-form-input>
                </b-form-group>
              </b-col>
              <b-col cols="6">
                <b-button class="mt-3" type="submit" variant="primary">Submit</b-button>
              </b-col>
            </b-row>
          </b-form>
        </b-col>
      </b-row>
    </div>
  </div>
</template>

<script>
import { useClientStore } from '@/store/clientStore';

export default {
  data() {
    return {
      hasSubmitted: false,
      form: {
        datumPlacanja: null,
        iznosUplate: null,
      },
      client: null, // Define client in data
    };
  },
  computed: {
    // Check if there's an active ZiroRacun
    hasActiveZiroRacun() {
      if (this.client && this.client.bankAccounts) {
        // Check if there is any bank account with active set to true
        return this.client.bankAccounts.some(account => account.active === true);
      }
      return false; // Return false if no active bank account found
    },
    // Return the active ZiroRacun or a message if not found
    activeZiroRacun() {
      if (this.client && this.client.bankAccounts) {
        const activeAccount = this.client.bankAccounts.find(account => account.active === true);
        return activeAccount ? activeAccount.ziroRacun : 'Nema aktivnog računa'; // Default message if no active account
      }
      return 'Nema aktivnog računa'; // Default message if client or bankAccounts is not available
    },
  },
  methods: {
    onSubmit() {
      this.hasSubmitted = true;

      const clientStore = useClientStore();
      const clientKey = this.$route.params.clientKey; // Get clientKey from route params
      const brojRacuna = this.$route.query.brojRacuna;      // Get brojKuf from query parameters

      // Locate client and update kuf entry
      const client = clientStore.clients.find(client => client.clientKey === clientKey);
      if (client) {
        const kifEntry = client.kif.find(entry => entry.brojRacuna === brojRacuna);
        
        if (kifEntry) {
          kifEntry.datumPlacanja = this.form.datumPlacanja;
          kifEntry.iznosUplate = this.form.iznosUplate;
          clientStore.saveClients();
        } else {
          console.error(`kuf entry with brojKuf ${brojRacuna} not found`);
        }
      } else {
        console.error('Client not found');
      }

      // Reset form after submission
      this.form = {
        datumPlacanja: null,
        iznosUplate: null,
      };
      this.hasSubmitted = false;
    },
  },
  mounted() {
    const clientKey = this.$route.params.clientKey;
    const clientStore = useClientStore();
    this.client = clientStore.clients.find(client => client.clientKey === clientKey);

    // Log client data for debugging purposes
    console.log('Client:', this.client);
  },
};
</script>
