<template>
  <b-container>
    <b-row class="text-center my-5" v-if="!hasActiveZiroRacun">
      <b-col cols="12">
        <h4 class="mb-5 text-danger">Trenutno nemate dodanu banku, <br>  da bi dodali izvod morate imati 1 aktivan Žiro račun</h4>
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
          <h1 class="mb-4">Dodaj novi izvod</h1>
          <h4>Aktivan žiro račun: {{ activeZiroRacun || 'Nema aktivnog računa' }}</h4>
        </b-col>
      </b-row>
      <b-row class="justify-content-center mb-5">
        <b-col cols="2">
          <p>Pocetno stanje: {{ activePocetnoStanje }} {{  activeValutaRacuna }}</p>
        </b-col>
        <b-col cols="2">
          <b-form>
            <b-form-group label="Promjeni aktivni racun" label-for="izmjena-aktivni-racun" class="mb-2">
              <b-form-select
                id="izmjena-aktivni-racun"
                v-model="selectedZiroRacun"  
                :options="client.bankAccounts.map(account => ({
                  value: account.ziroRacun,
                  text: account.ziroRacun
                }))"
              ></b-form-select>
            </b-form-group>
            <b-button
              variant="success"
              size="sm"
              @click="setAktivniRacun"
            >
              Promjeni aktivni ziro racun
            </b-button>
          </b-form>
        </b-col>
      </b-row>
      <b-row class="justify-content-center">
        <b-col cols="12">
          <b-form @submit.prevent="onSubmit">
            <b-row class="justify-content-center">
              <b-col cols="3">
                <b-form-group label="Datum plaćanja" label-for="datum-placanja" class="mb-2">
                  <b-form-datepicker
                    id="datum-placanja"
                    v-model="form.datumPlacanja"
                    placeholder="Izaberite datum plaćanja"
                    :date-format-options="{ day: 'numeric', month: 'numeric', year: 'numeric' }"
                    required
                    class="mb-2"
                  />
                </b-form-group>
              </b-col>
              <b-col cols="3">
                <b-form-group label="Broj izvoda" label-for="broj-izvoda" class="mb-2">
                  <b-form-input
                    id="broj-izvoda"
                    v-model="form.brojIzvoda"
                    placeholder="Upisite broj izvoda"
                    type="number"
                    required
                    :state="!hasSubmitted || form.brojIzvoda !== null"
                    class="mb-2"
                  />
                </b-form-group>
              </b-col>
            </b-row>
            <div class="my-5 border-top" />
            <b-row class="justify-content-center"> 
              <b-col cols="3">
                <b-form-group label="Izaberi KUF" label-for="kuf" class="mb-2">
                  <b-form-select
                    id="kuf"
                    :options="kufOptions"
                    v-model="form.brojKuf"
                    :state="!hasSubmitted || form.brojKuf !== null"
                  ></b-form-select>
                </b-form-group>
                <b-button
                  variant="success"
                  size="sm"
                  @click="addEntry('KUF')"
                >
                  Dodaj KUF stavku
                </b-button>
              </b-col>
              <b-col cols="3">
                <b-form-group label="Izaberi KIF" label-for="kif" class="mb-2">
                  <b-form-select
                    id="kif"
                    :options="kifOptions"
                    v-model="form.brojRacuna"
                    :state="!hasSubmitted || form.brojRacuna !== null"
                  ></b-form-select>
                </b-form-group>
                <b-button
                  variant="success"
                  size="sm"
                  @click="addEntry('KIF')"
                >
                  Dodaj KIF stavku
                </b-button>
              </b-col>
              <b-col cols="3">
                <b-form-group label="Dodaj ostalo" label-for="ostalo" class="mb-2">
                  <b-form-select
                    id="ostalo"
                    :options="ostaloOptions"
                    v-model="form.ostaleStavke"
                    :state="!hasSubmitted || form.ostaleStavke !== null"
                  ></b-form-select>
                </b-form-group>
                <b-button
                  variant="success"
                  size="sm"
                  @click="addEntry(form.ostaleStavke)"
                >
                  Dodaj stavku
                </b-button>
              </b-col>
            </b-row>
            <div class="my-5 border-top" /> 
            <b-row>
              <table>
                <thead>
                  <tr>
                    <th>Broj stavke</th>
                    <th>Kupac / dobavljac</th>
                    <th>Datum</th>
                    <th>Opis</th>
                    <th>Iznos za uplatit</th>
                    <th>Uplaceni iznos</th>
                    <th>Provizija</th>
                    <th>Ukupno</th>
                    <th>Akcija</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(entry, index) in selectedEntries" :key="index">
                    <td>{{ entry.brojRacuna || entry.brojKuf }}</td>
                    <td>{{ entry.kupac || entry.dobavljac || 'N/A' }} </td>
                    <td>{{ entry.date || 'No date' }}</td>
                    <td>
                      <b-form-group label="Opis stavke" label-for="opis-stavke" class="mb-2">
                        <b-form-input
                          id="opis-stavke"
                          v-model="entry.opisStavke"
                          placeholder="Upisite Opis stavke"
                          type="text"
                          required
                          :state="!hasSubmitted || entry.opisStavke !== null"
                          class="mb-2"
                        />
                      </b-form-group>
                    </td>
                    <td>{{ entry.neto || entry.bruto  }}{{  activeValutaRacuna }}</td>
                    <td>
                      <b-form-group label="Iznos uplate" label-for="iznos-uplate" class="mb-2">
                        <b-form-input
                          id="iznos-uplate"
                          v-model="entry.iznosUplate"
                          placeholder="Upisite Iznos uplate"
                          type="number"
                          required
                          :state="!hasSubmitted || entry.iznosUplate !== null"
                          class="mb-2"
                        />
                      </b-form-group>
                    </td>
                    <td>
                      <b-form-group label="Iznos provizije" label-for="iznos-provizije" class="mb-2">
                        <b-form-input
                          id="iznos-provizije"
                          v-model="entry.iznosProvizije"
                          placeholder="Upisite Iznos provizije"
                          type="number"
                          required
                          :state="!hasSubmitted || form.entryProvizije !== null"
                          class="mb-2"
                        />
                      </b-form-group>
                    </td>
                    <td>{{ (Number(entry.iznosUplate) || 0) + (Number(entry.iznosProvizije) || 0) }}{{  activeValutaRacuna }}</td>
                    <td>
                      <b-button
                        variant="danger"
                        size="sm"
                        @click="removeStavka(index)"
                      >
                        Ukloni
                      </b-button>
                    </td>
                    </tr> 
                    <tr>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td>
                        Novi saldo: 
                        {{ selectedEntries.reduce((total, entry) => {
                          if (entry.type === 'KUF') {
                            return total - (Number(entry.iznosUplate) || 0) - (Number(entry.iznosProvizije) || 0);
                          } else {
                            return total + (Number(entry.iznosUplate) || 0) - (Number(entry.iznosProvizije) || 0);
                          }
                        }, Number(activePocetnoStanje)) }}
                        {{ activeValutaRacuna }}
                      </td>
                    </tr>
                </tbody>
              </table>
              
              <b-col cols="6">
                <b-button class="mt-3" type="submit" variant="primary">Submit</b-button>
              </b-col>
            </b-row>
          </b-form>
        </b-col>
      </b-row>
    </div>
  </b-container>
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
        brojKuf: null,
        brojKif: null,
        ostaleStavke: null,
      },
      selectedEntries: [],
      client: null, 
      selectedZiroRacun: null,// Define client in data
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
    activePocetnoStanje() {
      if (this.client && this.client.bankAccounts) {
        const activeAccount = this.client.bankAccounts.find(account => account.active === true);
        return activeAccount ? activeAccount.pocetnoStanje : 'Nema aktivnog računa'; // Default message if no active account
      }
      return 'Nema aktivnog računa';
    },
    activeValutaRacuna() {
      if (this.client && this.client.bankAccounts) {
        const activeAccount = this.client.bankAccounts.find(account => account.active === true);
        return activeAccount ? activeAccount.valutaRacuna : 'Nema aktivnog računa'; // Default message if no active account
      }
      return 'Nema aktivnog računa';
    }
  },
  methods: {
    addEntry(type) {
      let selectedEntry = null;
      if (type === 'KUF') {
        selectedEntry = this.client.kuf.find(entry => entry.brojKuf === this.form.brojKuf);
      } else if (type === 'KIF') {
        selectedEntry = this.client.kif.find(entry => entry.brojRacuna === this.form.brojRacuna);
      } else  {
        selectedEntry == this.selectedEntries.push({ type: this.form.ostaleStavke });
        console.log(type);
      }
      if (selectedEntry) {
        const iznosUplate = selectedEntry.neto || selectedEntry.bruto;

        this.selectedEntries.push({ 
          ...selectedEntry, 
          type,
          iznosUplate: iznosUplate,
          iznosProvizije: this.client.bankAccounts.find(account => account.active === true).provizija,
        });
        if(this.form.brojKuf) {
          this.form.brojKuf = null;
        } else {
          this.form.brojRacuna = null;
        }
      
      }
      
    },
    removeStavka(index) {
      this.selectedEntries.splice(index, 1);
    },
    onSubmit() {
      this.hasSubmitted = true;

      const clientStore = useClientStore();
      const clientKey = this.$route.params.clientKey; // Get clientKey from route params     // Get brojKuf from query parameters

      // Locate client from the store
      const client = clientStore.clients.find(client => client.clientKey === clientKey);

      if (client) {
        // Loop through each selected entry
        this.selectedEntries.forEach(entry => {
          // Check if the entry type is KUF
          if (entry.type === 'KUF') {
            // Find the corresponding KUF entry by brojKuf
            const kufEntry = client.kuf.find(kuf => kuf.brojKuf === entry.brojKuf);
            
            if (kufEntry) {
              // Update iznosUplate and datumUplate for KUF entry
              kufEntry.iznosUplate = (Number(entry.iznosUplate) || 0) + (Number(entry.iznosProvizije) || 0);
              kufEntry.datumPlacanja = this.form.datumPlacanja;
              kufEntry.iznosProvizije = entry.iznosProvizije;
              kufEntry.opisStavke = entry.opisStavke;
              kufEntry.brojIzvoda = this.form.brojIzvoda;
            } else {
              console.error(`KUF entry with brojKuf ${entry.brojKuf} not found`);
            }
          }

          // Check if the entry type is KIF
          if (entry.type === 'KIF') {
            // Find the corresponding KIF entry by brojRacuna
            const kifEntry = client.kif.find(kif => kif.brojRacuna === entry.brojRacuna);

            if (kifEntry) {
              // Update iznosUplate and datumUplate for KIF entry
              kifEntry.iznosUplate = (Number(entry.iznosUplate) || 0) + (Number(entry.iznosProvizije) || 0);
              kifEntry.datumPlacanja = this.form.datumPlacanja;
              kifEntry.iznosProvizije = entry.iznosProvizije;
              kifEntry.opisStavke = entry.opisStavke;
              kifEntry.brojIzvoda = this.form.brojIzvoda;
            } else {
              console.error(`KIF entry with brojRacuna ${entry.brojRacuna} not found`);
            }
          }
        });

        // Save the updated client data
        clientStore.saveClients();
      } else {
        console.error('Client not found');
      }

      // Reset form after submission
      this.form = {
        datumPlacanja: null,
        iznosUplate: null,
        brojKuf: null,
        brojRacuna: null,
      };
      this.selectedEntries = [];
      this.form.datumPlacanja = null;
      this.form.brojIzvoda = null;
    },
    setAktivniRacun() {
      // Ensure a valid account is selected
      if (!this.selectedZiroRacun) {
        return;
      }

      // Set the active status for the selected bank account
      this.client.bankAccounts = this.client.bankAccounts.map(account => ({
        ...account,
        active: account.ziroRacun === this.selectedZiroRacun,  // Mark selected account as active
      }));

      // Save the updated client data in the store
      const clientStore = useClientStore();
      clientStore.saveClients(this.client);

    },
  },
  created() {
    const clientKey = this.$route.params.clientKey;
    const clientStore = useClientStore();
    this.client = clientStore.clients.find(client => client.clientKey === clientKey);
     const brojKufQuery = this.$route.query.brojKuf;
     const brojRacunaQuery = this.$route.query.brojRacuna;
    
      if (brojKufQuery) { // Use the correct variable name here
        this.form.brojKuf = brojKufQuery;
        this.addEntry('KUF');
      }

      if (brojRacunaQuery) { // Use the correct variable name here
        this.form.brojRacuna = brojRacunaQuery;
        this.addEntry('KIF');
      }
    if (this.client && this.client.kuf) {
      this.kufOptions = [
        { value: null, text: 'Izaberite kuf' }, // First option for kuf
        ...this.client.kuf.map(entry => ({
          value: entry.brojKuf,
          text: `${entry.brojKuf} - ${entry.dobavljac || 'N/A'} - ${entry.date || 'No date'}`
        }))
      ];
    }

    if (this.client && this.client.kif) {
      this.kifOptions = [
        { value: null, text: 'Izaberite kif' }, // First option for kif
        ...this.client.kif.map(entry => ({
          value: entry.brojRacuna,
          text: `${entry.brojRacuna} - ${entry.kupac || 'N/A'} - ${entry.date || 'No date'}`
        }))
      ];
    }

    this.ostaloOptions = [
      { value: null, text: 'Izaberite ostalo' }, // First option for ostalo
      { value: 'provizija', text: 'Provizija' },
      { value: 'place', text: 'Burto place zaposlenika' },
      { value: 'doprinosi', text: 'Placeni doprinosi poduzetnika' }
    ];

    const today = new Date();
    this.form.datumPlacanja = today.toISOString().split('T')[0];
  },
};
</script>
