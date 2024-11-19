<template>
  <b-container>
    <b-row class="text-center">
      <b-col cols="12">
        <h1 class="mb-4">Blagajna</h1>
      </b-col>
    </b-row>  
    <b-row class="justify-content-center">
      <b-col cols="12" lg="8">
        <b-form v-if="isStartingAmount" @submit.prevent="onSubmit">
          <b-row>
            <b-col cols="6">
              <b-form-group label="Stanje blagajne" label-for="stanje-blagajne" class="mb-2">
                <b-form-input
                  id="stanje-blagajne"
                  v-model="form.stanjeBlagajne"
                  type="number"
                  :state="!hasSubmitted || form.stanjeBlagajne.length > 0"
                  placeholder="Upisite pocetno stanje racun"
                ></b-form-input>
              </b-form-group>
            </b-col> 
            <b-col cols="6">
              <b-button class="mt-3" type="submit" variant="primary">Submit</b-button>
            </b-col>
          </b-row>
        </b-form>
        <b-row v-else>
          <b-col>
            <p class="text-center">Stanje blagajne je {{  currentBlagajnaState }}KM</p>
          </b-col>
        </b-row>
      </b-col>
    </b-row>
    <b-row>
      <b-col cols="12" class="mb-3">
        <b-button 
          variant="primary"
          @click="saveDnevnikBlagajne"
          >
          Spasi dnevnik blagajne
        </b-button>
        <b-button
            variant="outline-primary"
            v-b-modal.nalog-naplate-modal
            class="mx-3"
          >
            Dodaj nalog naplate
        </b-button>

        <b-modal 
          id="nalog-naplate-modal" 
          size="xl"
          centered 
          title="Dodaj novi nalog naplate" 
          hide-footer>
          <template v-slot:modal-header="{ close }">
            <h5 class="modal-title">Dodaj novi nalog naplate</h5>
            <b-button class="close" @click="close" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </b-button>
          </template>
          <b-form-select class="mb-3" v-model="tipNaplate" :options="tipNaplateOptions"></b-form-select>
          <b-form-input v-if="tipNaplate" class="mb-3" placeholder="Opis" v-model="opisStavke" />
          <b-form-input v-if="tipNaplate" class="mb-3" placeholder="Iznos" v-model="iznosStavke" />
          <b-form-input v-if="tipNaplate" class="mb-3" placeholder="Broj racuna" v-model="brojRacuna" />
          <b-button v-if="tipNaplate" @click="addStavka(tipNaplate)" variant="primary">Dodaj stavku</b-button>
          <table>
            <thead>
              <tr>
                <th>Redni br.</th>
                <th>Opis</th>
                <th>Iznos</th>
                <th>Racun broj</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(entry, index) in stavke" :key="index">
                <td>{{ index + 1 }}</td>
                <td>{{ entry?.opisStavke || '' }}</td>
                <td>{{ entry?.iznosStavke || '' }}</td>
                <td>{{ entry?.brojRacuna || '' }}</td>
              </tr>

            </tbody>
          </table>
          <b-button variant="primary" @click="addNalog()">Dodaj novi nalog</b-button>
          <b-button class="mx-3" variant="outline-primary" @click="$bvModal.hide('nalog-naplate-modal')">Odustani</b-button>
        </b-modal>
        <b-button
            variant="outline-success"
            class="mx-3"
            
          >
            Dodaj nalog isplate
        </b-button>
      </b-col>
      <b-col cols="6">
        <h4>Dnevnik blagajne broj: {{ indexDnevnikBlagajne }} od {{ todayDate }}</h4> 
        <b-table :items="dodaniNalozi" :fields="tableFields" hover>
          <template #cell(index)="data">
            {{ data.index + 1 }}
          </template>
          <template #cell(brojNalogaNaplate)="data">
            {{ data.item.brojNalogaNaplate }}
          </template>
          <template #cell(brojNalogaIsplate)="data">
            {{ data.item.brojNalogaIsplate }}
          </template>
          <template #cell(opisStavke)="data">
            {{ data.item.opisStavke }}
          </template>
          <template #cell(ulaz)="data">
            {{ data.item.iznosStavke }} KM
          </template>
          <template #cell(izlaz)="data">
            {{ data.item.izlaz }}
          </template>
          <template #cell(brojRacuna)="data">
            {{ data.item.brojRacuna }}
          </template>
        </b-table>

      </b-col>
      <b-col cols="6">
        <h4 class="text-right">List</h4>
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
      <b-button variant="primary" @click="$bvModal.hide('success-modal')">Nastavi rad u blagajni</b-button>
      <b-button class="mx-3" variant="outline-primary" @click="$router.push('/clients')">Povratak na listu klijenta</b-button>
    </b-modal>
  </b-container>
</template>

<script>
import { useClientStore } from '@/store/clientStore';

export default {
  data() {
    return {
      hasSubmitted: false,
      isStartingAmount: false,
      clientKey: null,
      indexDnevnikBlagajne: 1, // Holds the clientKey from the URL
      todayDate: new Date().toLocaleDateString('en-GB').split('T')[0],
      selectedDate: new Date().toLocaleDateString('en-GB').split('T')[0],
      stavke: [],
      iznosUplate: '',
      opis: '',
      dodaniNalozi: [],
      opisStavke: '',
      iznosStavke: '',
      brojRacuna: '',
      tipNaplate: null,
      tipNaplateOptions: [
        { value: null, text: 'Izaberite tip naloga' },
        { value: 'podizanje_sa_racuna', text: 'Podizanje sa racuna' },
        { value: 'gotovinska_uplata', text: 'Gotovinska uplata' },
        { value: 'putna_akontacija', text: 'Naplata putne akontacije' },
      ],
      form: {
        stanjeBlagajne: null,
      },
      tableFields: [
      { key: 'index', label: 'Redni br.' },
      { key: 'brojNalogaNaplate', label: 'Broj naloga naplate' },
      { key: 'brojNalogaIsplate', label: 'Broj naloga isplate' },
      { key: 'opisStavke', label: 'Opis' },
      { key: 'ulaz', label: 'Ulaz' },
      { key: 'izlaz', label: 'Izlaz' },
      { key: 'brojRacuna', label: 'Br. računa' },
    ],
    };
  },
  computed: {
    currentBlagajnaState() {
      const clientStore = useClientStore();
      const client = clientStore.clients.find(client => client.clientKey === this.clientKey);
      return client?.blagajna?.[0]?.stanjeBlagajne || 'N/A'; // Simplified check
    }
  },
  created() {
    // Get the clientKey from the URL
    const urlParams = new URLSearchParams(window.location.search);
    this.clientKey = urlParams.get('clientKey');
    this.loadDataIfExist();
  },
  methods: {
    addStavka() {
      if (!this.tipNaplate || !this.opisStavke || !this.iznosStavke || !this.brojRacuna) {
        this.$bvToast.toast('All fields are required to add a record.', {
          title: 'Validation Error',
          variant: 'danger',
          solid: true,
        });
        return;
      }
      this.stavke.push({
        tipNaplate: this.tipNaplate,
        opisStavke: this.opisStavke,
        iznosStavke: parseFloat(this.iznosStavke),
        brojRacuna: this.brojRacuna,
      });

      // Clear fields
      this.opisStavke = '';
      this.iznosStavke = '';
      this.brojRacuna = '';
      this.tipNaplate = null;

      this.$bvToast.toast('Record added successfully!', {
        title: 'Success',
        variant: 'success',
        solid: true,
      });
    },
    addNalog() {
      // Check if stavke[] is not empty
      if (this.stavke.length === 0) {
        this.$bvToast.toast('Please add at least one item to the list before adding the nalog.', {
          title: 'Validation Error',
          variant: 'danger',
          solid: true,
        });
        return;
      }

      // Get the current number of dodaniNalozi to determine the new nalog number
      const brojNalogaNaplate = this.dodaniNalozi.length + 1;

      // Add stavke with brojNalogaNaplate to dodaniNalozi
      this.stavke.forEach(stavka => {
        this.dodaniNalozi.push({
          ...stavka, // Spread the existing stavka properties
          brojNalogaNaplate, // Add the new nalog number
        });
      });

      // Notify user that the nalog has been added
      this.$bvToast.toast('Nalog successfully added!', {
        title: 'Success',
        variant: 'success',
        solid: true,
      });
    },
    onSubmit() {
      this.hasSubmitted = true;

      // Find the client by clientKey
      const clientStore = useClientStore();
      const client = clientStore.clients.find(client => client.clientKey === this.clientKey);

      if (!client) {
        console.warn('Client not found with the provided clientKey');
        return;
      }

      // Validate input
      if (!this.form.stanjeBlagajne || !this.form.valutaRacuna) {
        alert("Please complete all required fields.");
        return;
      }

      // Ensure `blagajna` is initialized
      if (!client.blagajna) {
        client.blagajna = [];
      }

      // Determine if this is the starting amount
      this.isStartingAmount = client.blagajna.length === 0;

      // Add the new record
      client.blagajna.push({
        stanjeBlagajne: this.form.stanjeBlagajne, // Active if it's the first account
      });

      // Save and show the modal
      clientStore.saveClients();
      this.$bvModal.show('success-modal');
      this.resetForm();
    },
    resetForm() {
      this.form = {
        stanjeBlagajne: '',
      };
      this.hasSubmitted = false;
    },
    saveDnevnikBlagajne() {
  const clientStore = useClientStore();
  const client = clientStore.clients.find(client => client.clientKey === this.clientKey);

  if (!client) {
    console.warn('Client not found with the provided clientKey');
    return;
  }

  if (!client.dnevnikBlagajne) {
    client.dnevnikBlagajne = [];
  }

  // Check if an entry with the same todayDate already exists
  const existingEntry = client.dnevnikBlagajne.find(entry => entry.todayDate === this.todayDate);

  if (existingEntry) {
    // If the entry exists, push only items that are not already in the existing entry
    this.dodaniNalozi.forEach(nalog => {
      // Check if the item is already present in the existing entry
      if (!existingEntry.dodaniNalozi.some(existingNalog => existingNalog === nalog)) {
        existingEntry.dodaniNalozi.push(nalog);  // Add the new item
      }
    });
  } else {
    // If no entry exists with the same todayDate, create a new one
    client.dnevnikBlagajne.push({
      indexDnevnikBlagajne: this.indexDnevnikBlagajne,
      todayDate: this.todayDate,
      dodaniNalozi: this.dodaniNalozi,
    });
  }

  // Save updated clients
  clientStore.saveClients();

  // Show success toast
  this.$bvToast.toast('Dnevnik blagajne successfully saved!', {
    title: 'Success',
    variant: 'success',
    solid: true,
  });
},


    loadDataIfExist() {
      const clientStore = useClientStore();
      
      // Find the client using the clientKey
      const client = clientStore.clients.find(client => client.clientKey === this.clientKey);

      // If client is found
      if (client) {
        // Ensure that blagajna exists for the client and is not empty
        if (client.blagajna && client.blagajna.length > 0) {
          // Set the initial stanjeBlagajne value from the first entry in blagajna
          this.form.stanjeBlagajne = client.blagajna[0].stanjeBlagajne;
          this.isStartingAmount = false;
        } else {
          // If no blagajna entry exists, it's the starting amount
          this.isStartingAmount = true;
        }

        // Load the daily log entries (stavke) from the `dnevnikBlagajne` array
        if (client.dnevnikBlagajne && client.dnevnikBlagajne.length > 0) {
          // Assuming each dnevnikBlagajne object has an array `dodaniNalozi` containing daily log entries
          this.dodaniNalozi = client.dnevnikBlagajne.flatMap(entry => entry.dodaniNalozi);
        }

        // Optionally, handle any other properties you may need
      } else {
        console.warn('Client not found with the provided clientKey');
      }
    }
  },  
};
</script>