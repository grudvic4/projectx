<template>
  <div>
    <b-row class="text-center">
      <b-col cols="12">
        <h1 class="mb-4">Dodaj novi bankovni racun</h1>
      </b-col>
    </b-row>  
    <b-row class="justify-content-center">
      <b-col cols="12" lg="8">
        <b-form @submit.prevent="onSubmit">
          <b-row>
            <b-col cols="12">
              <h4>Podaci o banci</h4>
            </b-col>
          </b-row>
          <b-row>
            <b-col cols="6">
              <b-form-group label="Naziv banke" label-for="naziv-banke" class="mb-2">
                <b-form-input
                  id="naziv-banke"
                  v-model="form.nazivBanke"
                  required
                  :state="!hasSubmitted || form.nazivBanke.length > 0"
                  placeholder="Upisite naziv banke"
                ></b-form-input>
              </b-form-group>
            </b-col> 
            <b-col cols="6">
              <b-form-group label="Ziro racun" label-for="ziro-racun" class="mb-2">
                <b-form-input
                  id="ziro-racun"
                  v-model="form.ziroRacun"
                  :state="!hasSubmitted || form.ziroRacun.length > 0"
                  placeholder="Upisite ziro racun"
                ></b-form-input>
              </b-form-group>
            </b-col> 
            <b-col cols="6">
              <b-form-group label="Pocetno stanje" label-for="pocetno-stanje" class="mb-2">
                <b-form-input
                  id="pocetno-stanje"
                  v-model="form.pocetnoStanje"
                  type="number"
                  :state="!hasSubmitted || form.pocetnoStanje.length > 0"
                  placeholder="Upisite pocetno stanje racun"
                ></b-form-input>
              </b-form-group>
            </b-col> 
            <b-col cols="6">
              <b-form-group label="Iznos provizije" label-for="provizija" class="mb-2">
                <b-form-input
                  id="provizija"
                  v-model="form.provizija"
                  :state="!hasSubmitted || form.provizija.length > 0"
                  placeholder="Upisite iznos provizija"
                ></b-form-input>
              </b-form-group>
            </b-col> 
            <b-col cols="6">
              <b-form-group label="Iznos odrzavanja racuna" label-for="odrzavanje" class="mb-2">
                <b-form-input
                  id="odrzavanje"
                  v-model="form.odrzavanje"
                  :state="!hasSubmitted || form.odrzavanje.length > 0"
                  placeholder="Upisite iznos odrzavanje racuna"
                ></b-form-input>
              </b-form-group>
            </b-col> 
            <b-col cols="6">
              <b-form-group label="Valuta" label-for="valuta-racuna" class="mb-2">
                <b-form-select
                  id="valuta-racuna"
                  v-model="form.valutaRacuna"
                  :options="valutaOptions"
                  required
                  :state="!hasSubmitted || form.valutaRacuna !== null"
                ></b-form-select>
              </b-form-group>
            </b-col> 
            <b-col cols="6">
              <b-button class="mt-3" type="submit" variant="primary">Submit</b-button>
            </b-col>
          </b-row>
        

        </b-form>
      </b-col>
    </b-row>

    <b-modal 
      id="success-modal" 
      centered 
      title="Klijent uspješno dodan" 
      hide-footer>
      <template v-slot:modal-header="{ close }">
        <h5 class="modal-title">Novi ziro racun uspješno dodan</h5>
        <b-button class="close" @click="close" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </b-button>
      </template>
      <p class="my-4">Uspješno ste dodali novi ziro racun</p>
      <b-button variant="primary" @click="$bvModal.hide('success-modal')">Dodaj novi ziro racun</b-button>
      <b-button class="mx-3" variant="outline-primary" @click="$router.push('/clients')">Povratak na listu klijenta</b-button>
    </b-modal>
  </div>
</template>

<script>
import { useClientStore } from '@/store/clientStore';

export default {
  data() {
    return {
      hasSubmitted: false,
      clientKey: null, // Holds the clientKey from the URL
      form: {
        nazivBanke: '',
        ziroRacun: '',
        valutaRacuna: null,
        provizija: '',
        odrzavanje: '',
        active: false,
        pocetnoStanje: null,
      },
      valutaOptions: [
        { value: null, text: 'Odaberite' },
        { value: 'km', text: 'KM' },
        { value: 'eur', text: 'EUR' },
        { value: 'usd', text: 'USD' },
      ],
    };
  },
  created() {
    // Get the clientKey from the URL
    const urlParams = new URLSearchParams(window.location.search);
    this.clientKey = urlParams.get('clientKey');
  },
  methods: {
  onSubmit() {
    this.hasSubmitted = true;

    // Find the client by clientKey
    const clientStore = useClientStore();
    const client = clientStore.clients.find(client => client.clientKey === this.clientKey);

    if (client) {
      // Ensure bankAccounts is initialized
      if (!client.bankAccounts) {
        client.bankAccounts = [];
      }

      // Check if this is the first bank account for the client
      const isFirstBankAccount = client.bankAccounts.length === 0;

      // Set active to true only for the first bank account
      const bankAccount = { 
        nazivBanke: this.form.nazivBanke,
        ziroRacun: this.form.ziroRacun,
        valutaRacuna: this.form.valutaRacuna,
        provizija: this.form.provizija,
        odrzavanje: this.form.odrzavanje,
        active: isFirstBankAccount,
        pocetnoStanje: this.form.pocetnoStanje, // Set active to true if it is the first bank account
      };

      // Add the bank account to the client
      client.bankAccounts.push(bankAccount);
      clientStore.saveClients();

      // Show success modal
      this.$bvModal.show('success-modal');
      this.resetForm();
    } else {
      console.warn('Client not found with the provided clientKey');
    }
  },
  resetForm() {
    this.form = {
      nazivBanke: '',
      ziroRacun: '',
      valutaRacuna: null,
      provizija: '',
      odrzavanje: '',
      active: false,
      pocetnoStanje: null,
    };
    this.hasSubmitted = false;
  }
}
};
</script>