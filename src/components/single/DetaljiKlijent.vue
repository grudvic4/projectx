<template>
  <b-container>
    <b-row>
      <b-col cols="12" lg="3">
        <b-card title="Podaci o vlasniku" class="mb-3">
          <p class="mb-0">1. JMB:</p>
          <p v-if="client && client.vlasnikJMBG">{{ client.vlasnikJMBG }}</p>
          <p class="mb-0">2. Ime i prezime:</p>
          <p v-if="client && client.vlasnikImePrezime">{{ client.vlasnikImePrezime }}</p>
          <p class="mb-0">3. Adresa:</p>
          <p v-if="client && client.vlasnikAdresa">{{ client.vlasnikAdresa }}</p>
        </b-card>
      </b-col>
      <b-col cols="12" lg="4">
        <b-card title="Podaci o registrovanoj djelatnosti" class="mb-3">
          <p class="mb-0">4. JIB:</p>
          <p>{{ client.jib }}</p>
          <p class="mb-0">5. Naziv:</p>
          <p>{{ client.name }}</p>
          <p class="mb-0">6. Adresa:</p>
          <p>{{ client.address }}</p>
        </b-card>
      </b-col>
      <b-col cols="12" lg="5">
        <b-card title="Podaci o banci" class="mb-3">
          <p v-if="client && client.bankAccounts && client.bankAccounts.length === 0" class="mb-0">
            Trenutno nema aktivan bankovni račun.
          </p>
          <b-table striped hover :items="client.bankAccounts" :fields="tableFields">
            <template #cell(nazivBanke)="data">
              {{ data.item.nazivBanke }}
            </template>
            <template #cell(ziroRacun)="data">
              <span 
                class="clickable-ziro" 
                @click="goToEditBankAccount(data.item.ziroRacun)"
              >
                {{ data.item.ziroRacun }}
              </span>
            </template>
            <template #cell(stanje)="data">
              <b-button
                :variant="data.item.active ? 'success' : 'outline-primary'"
                size="sm"
                @click="setAktivniRacun(data.item.ziroRacun)"
              >
                {{ data.item.active ? 'Aktivan' : 'Postavi kao aktivni' }}
              </b-button>
            </template>
          </b-table>
          <b-button
            variant="primary"
            size="sm"
            @click="$router.push({ name: 'dodaj-bankovni-racun', params: { clientKey: client.clientKey } })"
          >
            Dodaj novu banku
          </b-button>
        </b-card>
      </b-col>
    </b-row>
    <b-row>
      <b-col cols="12">
        <b-card title="Akcije" class="mb-3">
          <b-button
            variant="primary"
            size="sm"
            class="mr-3"
            @click="$router.push({ name: 'izvod', params: { clientKey: client.clientKey } })"
          >
            Dodaj izvod
          </b-button>
          <b-button
            variant="primary"
            size="sm"
            class="mx-3"
            @click="$router.push({ name: 'dodaj-ulazni-racun', params: { clientKey: client.clientKey } })"
          >
            Dodaj ulazni račun
          </b-button>
          <b-button
            variant="success"
            size="sm"
            class="mr-3"
            @click="$router.push({ name: 'dodaj-izlazni-racun', params: { clientKey: client.clientKey } })"
          >
            Dodaj izlazni račun
          </b-button>
          <div class="my-3 border-top" />
          <b-button
            variant="outline-primary"
            size="sm"
            class="mr-3"
            @click="$router.push({ name: 'blagajna', params: { clientKey: client.clientKey } })"
          >
            Blagajna
          </b-button>
          
          <b-button
            variant="outline-primary"
            size="sm"
            class="mx-3"
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
            Dodaj dobavljača
          </b-button>
          <div class="my-3 border-top" />
        </b-card>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import { useClientStore } from '@/store/clientStore';

export default {
  data() {
    return {
      client: null,
      tableFields: [
        { key: 'nazivBanke', label: 'Naziv banke' },
        { key: 'ziroRacun', label: 'Žiro račun' },
        { key: 'stanje', label: 'Stanje' },
      ],
    };
  },
  methods: {
    goToEditBankAccount(ziroRacun) {
      // Redirect to the edit page, assuming you have a route set up for editing a bank account
      this.$router.push({ name: 'EditBankAccount', params: { ziroRacun } });
    },
    setAktivniRacun(ziroRacun) {
      // Set the active status for the selected bank account
      this.client.bankAccounts = this.client.bankAccounts.map(account => ({
        ...account,
        active: account.ziroRacun === ziroRacun,
      }));

      // Save the updated client data in the store
      const clientStore = useClientStore();
      clientStore.saveClients(this.client);
    },
  },
  created() {
    const clientKey = this.$route.params.clientKey;
    const clientStore = useClientStore();

    const combinedClients = [...clientStore.clients];
    this.client = combinedClients.find(client => client.clientKey === clientKey);

    if (!this.client) {
      console.error('Client not found with clientKey:', clientKey);
    }
  },
};
</script>


<style scoped>
/* Add any component-specific styling here */
</style>
