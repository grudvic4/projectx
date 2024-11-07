<template>
  <div>
    <b-row class="text-center">
      <b-col cols="12">
        <h1 class="mb-4">Edit bankovi racun</h1>
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
              <b-form-group label="Ime i prezime vlasnika" label-for="vlasnik-racuna" class="mb-2">
                <b-form-input
                  id="vlasnik-racuna"
                  v-model="form.vlasnikRacuna"
                  required
                  :state="!hasSubmitted || form.vlasnikRacuna.length > 0"
                  placeholder="Upisite Ime i prezime vlasnika"
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
      clientKey: null,
      ziroRacun: null,
      form: {
        nazivBanke: '',
        ziroRacun: '',
        vlasnikRacuna: '',
        provizija: '',
        odrzavanje: '',
        active: false
      },
    };
  },
  created() {
    // Get the clientKey and ziroRacun from the route parameters
    this.clientKey = this.$route.params.clientKey;
    this.ziroRacun = this.$route.params.ziroRacun;

    // Fetch client and bank account data
    this.prefillForm();
  },
  methods: {
    prefillForm() {
      const clientStore = useClientStore();
      const client = clientStore.clients.find(client => client.clientKey === this.clientKey);
      
      if (client) {
        // Find the specific bank account by ziroRacun
        const bankAccount = client.bankAccounts.find(account => account.ziroRacun === this.ziroRacun);
        
        if (bankAccount) {
          // Pre-fill form fields with bank account data
          this.form = {
            nazivBanke: bankAccount.nazivBanke,
            ziroRacun: bankAccount.ziroRacun,
            vlasnikRacuna: bankAccount.vlasnikRacuna,
            provizija: bankAccount.provizija || '',
            odrzavanje: bankAccount.odrzavanje || '',
            active: bankAccount.active
          };
        } else {
          console.warn('Bank account not found with the provided ziroRacun');
        }
      } else {
        console.warn('Client not found with the provided clientKey');
      }
    },
    onSubmit() {
      this.hasSubmitted = true;

      const clientStore = useClientStore();
      const client = clientStore.clients.find(client => client.clientKey === this.clientKey);

      if (client) {
        // Find the specific bank account and update it
        const bankAccount = client.bankAccounts.find(account => account.ziroRacun === this.ziroRacun);
        
        if (bankAccount) {
          // Update bank account data
          bankAccount.nazivBanke = this.form.nazivBanke;
          bankAccount.ziroRacun = this.form.ziroRacun;
          bankAccount.vlasnikRacuna = this.form.vlasnikRacuna;
          bankAccount.provizija = this.form.provizija;
          bankAccount.odrzavanje = this.form.odrzavanje;
          bankAccount.active = this.form.active;

          // Save the updated clients data
          clientStore.saveClients();

          // Show success modal
          this.$bvModal.show('success-modal');
          this.resetForm();
        } else {
          console.warn('Bank account not found with the provided ziroRacun');
        }
      } else {
        console.warn('Client not found with the provided clientKey');
      }
    },
    resetForm() {
      this.form = {
        nazivBanke: '',
        ziroRacun: '',
        vlasnikRacuna: '',
        provizija: '',
        odrzavanje: '',
        active: false
      };
      this.hasSubmitted = false;
    }
  }
};
</script>