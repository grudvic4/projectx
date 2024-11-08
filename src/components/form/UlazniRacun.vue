<template>
  <div>
    <b-row class="text-center">
      <b-col cols="12">
        <h1 class="mb-4">Dodaj novi ulazni racun</h1>
      </b-col>
    </b-row>  
    <b-row class="justify-content-center">
      <b-col cols="12" lg="8">
        <b-form @submit.prevent="onSubmit">
          <b-row>
            <b-col cols="6">
              <b-form-group label="Broj KUF" label-for="broj-kuf" class="mb-2">
                <b-form-input
                  id="broj-kuf"
                  type="number"
                  v-model="form.brojKuf"
                  required
                  :state="!hasSubmitted || form.type !== null"
                ></b-form-input>
              </b-form-group>
            </b-col>
            <b-col cols="6">
              <b-form-group label="Datum" label-for="datum" class="mb-2">
                <b-form-datepicker 
                  id="datum" 
                  v-model="form.date" 
                  placeholder="Izaberite datum"
                  :date-format-options="{ day: 'numeric', month: 'numeric',year: 'numeric' }"
                  class="mb-2" />
              </b-form-group>
            </b-col>
            <b-col cols="6">
              <b-form-group label="Dobavljac" label-for="dobavljac" class="mb-2">
                <b-form-select
                  id="dobavljac"
                  v-model="form.dobavljac"
                  :options="dobavljacOptions"
                  required
                  :state="!hasSubmitted || form.entitet !== null"
                ></b-form-select>
              </b-form-group>
            </b-col>
            <b-col cols="6">
              <b-form-group label="Broj fakture dobavljaca" label-for="broj-fakture-dobavljaca" class="mb-2">
                <b-form-input
                  id="broj-fakture-dobavljaca"
                  type="number"
                  v-model="form.brojFakture"
                  required
                  :state="!hasSubmitted || form.type !== null"
                ></b-form-input>
              </b-form-group>
            </b-col>
            <b-col cols="6">
              <b-form-group label="Datum fakture dobavljaca" label-for="datum-fakture-dobavljaca" class="mb-2">
                <b-form-datepicker 
                  id="datum-fakture-dobavljaca" 
                  v-model="form.datumFakture" 
                  placeholder="Izaberite datum"
                  :date-format-options="{ day: 'numeric', month: 'numeric',year: 'numeric' }"
                  class="mb-2" />
              </b-form-group>
            </b-col>
            <b-col cols="6">
              <b-form-group label="Rok placanja" label-for="rok-placanja" class="mb-2">
                <b-form-input
                  id="rok-placanja"
                  type="number"
                  v-model="form.rokPlacanja"
                  required
                  :state="!hasSubmitted || form.type !== null"
                ></b-form-input>
              </b-form-group>
            </b-col>
            <b-col cols="6">
              <b-form-group label="Datum roka placanja" label-for="datum-roka-placanja" class="mb-2">
                <b-form-datepicker 
                  id="datum-roka-placanja" 
                  v-model="form.rokDatum" 
                  placeholder="Izaberite datum"
                  :date-format-options="{ day: 'numeric', month: 'numeric',year: 'numeric' }"
                  class="mb-2" />
              </b-form-group>
            </b-col>
            <b-col cols="6" v-if="this.pdvObveznik">
              <b-form-group v-if="this.pdvObveznik" label="Za obracun PDV-a" label-for="obracun-pdv" class="mb-2">
                <b-form-select
                  id="obracun-pdv"
                  v-model="form.obracunPdv"
                  :options="obracunPdvOptions"
                  required
                  :state="!hasSubmitted || form.entitet !== null"
                ></b-form-select>
              </b-form-group>
            </b-col>
            <b-col cols="6" v-if="this.pdvObveznik">
              <b-form-group v-if="this.pdvObveznik" label="Vrsta prometa" label-for="vrsta-prometa" class="mb-2">
                <b-form-select
                  id="vrsta-prometa"
                  v-model="form.vrstaPrometa"
                  :options="vrstaPrometaOptions"
                  required
                  :state="!hasSubmitted || form.entitet !== null"
                ></b-form-select>
              </b-form-group>
            </b-col>
            <b-col cols="6">
              <b-form-group label="Knjiga" label-for="knjiga" class="mb-2">
                <b-form-select
                  id="knjiga"
                  v-model="form.knjiga"
                  :options="knjigaOptions"
                  required
                  :state="!hasSubmitted || form.entitet !== null"
                ></b-form-select>
              </b-form-group>
            </b-col>
            <b-col cols="6">
              <b-form-group label="Valuta placanja" label-for="valuta-placanja" class="mb-2">
                <b-form-select
                  id="valuta-placanja"
                  v-model="form.valuta"
                  :options="valutaOptions"
                  required
                  :state="!hasSubmitted || form.entitet !== null"
                ></b-form-select>
              </b-form-group>
            </b-col>
            <b-col cols="6">
              <b-form-group label="Bruto iznos u valuti placanja" label-for="bruto" class="mb-2">
                <b-form-input
                  id="bruto"
                  type="number"
                  v-model="form.bruto"
                  required
                  :state="!hasSubmitted || form.type !== null"
                ></b-form-input>
              </b-form-group>
            </b-col>
            <b-col cols="6" v-if="this.pdvObveznik">
              <b-form-group v-if="this.pdvObveznik" label="Neto iznos u valuti placanja" label-for="neto" class="mb-2">
                <b-form-input
                  id="neto"
                  type="number"
                  v-model="form.neto"
                  required
                  :state="!hasSubmitted || form.type !== null"
                ></b-form-input>
              </b-form-group>
            </b-col>
            <b-col cols="6" v-if="this.pdvObveznik">
              <b-form-group v-if="this.pdvObveznik" label="Bruto iznos sa porezom" label-for="bruto-pdv" class="mb-2">
                <b-form-input
                  id="bruto-pdv"
                  type="number"
                  v-model="form.brutoPDV"
                  required
                  :state="!hasSubmitted || form.type !== null"
                ></b-form-input>
              </b-form-group>
            </b-col>
            <b-col cols="6" v-if="this.pdvObveznik">
              <b-form-group v-if="this.pdvObveznik" label="Neto iznos sa porezom" label-for="neto-pdv" class="mb-2">
                <b-form-input
                  id="neto-pdv"
                  type="number"
                  v-model="form.netoPDV"
                  required
                  :state="!hasSubmitted || form.type !== null"
                ></b-form-input>
              </b-form-group>
            </b-col>
            <b-col cols="6" v-if="this.pdvObveznik">
              <b-form-group v-if="this.pdvObveznik" label="Iznos poreza" label-for="iznos-pdv" class="mb-2">
                <b-form-input
                  id="iznos-pdv"
                  type="number"
                  v-model="form.iznosPdv"
                  required
                  :state="!hasSubmitted || form.type !== null"
                ></b-form-input>
              </b-form-group>
            </b-col>
            <b-col cols="6" v-if="this.pdvObveznik">
              <b-form-group v-if="this.pdvObveznik" label="Rabat dobavljaca" label-for="rabat" class="mb-2">
                <b-form-input
                  id="rabat"
                  type="number"
                  v-model="form.rabat"
                  required
                  :state="!hasSubmitted || form.type !== null"
                ></b-form-input>
              </b-form-group>
            </b-col>
            <b-col cols="6" v-if="this.pdvObveznik">
              <b-form-group v-if="this.pdvObveznik" label="Kasa skonto" label-for="kasa-skonto" class="mb-2">
                <b-form-input
                  id="kasa-skonto"
                  type="number"
                  v-model="form.kasaSkonto"
                  required
                  :state="!hasSubmitted || form.type !== null"
                ></b-form-input>
              </b-form-group>
            </b-col>
            <b-col cols="6" v-if="this.pdvObveznik">
              <b-form-group v-if="this.pdvObveznik" label="Za placanje do" label-for="rok-placanja-skonto" class="mb-2">
                <b-form-datepicker 
                  id="rok-placanja-skonto" 
                  v-model="form.placanjeDo" 
                  placeholder="Izaberite datum"
                  :date-format-options="{ day: 'numeric', month: 'numeric',year: 'numeric' }"
                  class="mb-2" />
              </b-form-group>
            </b-col>
            <b-col cols="6" v-if="this.pdvObveznik">
              <b-form-group v-if="this.pdvObveznik" label="Osnovica ulaznog poreza koji se moze odbiti" label-for="osnovica-ulaznog-pdv" class="mb-2">
                <b-form-input
                  id="osnovica-ulaznog-pdv"
                  type="number"
                  v-model="form.osnovicaUlazniPDVodbit"
                  required
                  :state="!hasSubmitted || form.type !== null"
                ></b-form-input>
              </b-form-group>
            </b-col>
            <b-col cols="6" v-if="this.pdvObveznik">
              <b-form-group v-if="this.pdvObveznik" label="Ulazni porez koji se moze odbiti [17%]" label-for="ulazni-pdv" class="mb-2">
                <b-form-input
                  id="ulazni-pdv"
                  type="number"
                  v-model="form.ulazniPDVodbit"
                  required
                  :state="!hasSubmitted || form.type !== null"
                ></b-form-input>
              </b-form-group>
            </b-col>
            <b-col cols="6" v-if="this.pdvObveznik">
              <b-form-group v-if="this.pdvObveznik" label="Iznos nabavke od poljoprivrednika" label-for="nabavka-poljoprivrednik" class="mb-2">
                <b-form-input
                  id="nabavka-poljoprivrednik"
                  type="number"
                  v-model="form.nabavkaPoljoprivrednika"
                  required
                  :state="!hasSubmitted || form.type !== null"
                ></b-form-input>
              </b-form-group>
            </b-col>
            <b-col cols="6" v-if="this.pdvObveznik">
              <b-form-group v-if="this.pdvObveznik" label="Pausalna naknada za poljoprivrednike [5%]" label-for="pausalna-naknada" class="mb-2">
                <b-form-input
                  id="pausalna-naknada"
                  type="number"
                  v-model="form.pauslaNaknada"
                  required
                  :state="!hasSubmitted || form.type !== null"
                ></b-form-input>
              </b-form-group>
            </b-col>
            <b-col cols="6" v-if="this.pdvObveznik">
              <b-form-group v-if="this.pdvObveznik" label="Ulazni porez koji se ne prikazuje na stranici" label-for="ulazni-pdv-ne-prikazuje" class="mb-2">
                <b-form-input
                  id="ulazni-pdv-ne-prikazuje"
                  type="number"
                  v-model="form.ulazniPDVNePrikazuje"
                  required
                  :state="!hasSubmitted || form.type !== null"
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
</template>

<script>
import { useClientStore } from '@/store/clientStore';
import { useDobavljacStore } from '@/store/dobavljacStore';
import dobavljacMock from '@/data/dobavljacMock';

export default {
  data() {
    return {
      pdvObveznik: useClientStore().clients.find(client => client.clientKey === this.$route.params.clientKey).pdvObveznik,
      hasSubmitted: false,
      form: {
        brojKuf: null,
        date: null,
        dobavljac: null,
        brojFakture: null,
        datumFakture: null,
        rokPlacanja: null,
        rokDatum: null,
        obracunPdv: null,
        vrstaPrometa: null,
        knjiga: null,
        valuta: null,
        bruto: null,
        neto: null,
        brutoPDV: null,
        netoPDV: null,
        iznosPdv: null,
        rabat: null,
        kasaSkonto: null,
        placanjeDo: null,
        osnovicaUlazniPDVodbit: null,
        ulazniPDVodbit: null,
        nabavkaPoljoprivrednika: null,
        pauslaNaknada: null,
        ulazniPDVNePrikazuje: null
      },
      obracunPdvOptions: [
        { value: null, text: 'Odaberite' },
        { value: 'oporezivo', text: 'Oporeziva nabavka' },
        { value: 'neoporezivo', text: 'Neoporeziva nabavka' },
      ],
      vrstaPrometaOptions: [
        { value: null, text: 'Odaberite' },
        { value: 'zakon', text: 'Zakon 1' },
        { value: 'usluga', text: 'Zakon 2' },
        { value: 'roba', text: 'Zakon 3' },
      ],
      knjigaOptions: [
        { value: null, text: 'Odaberite' },
        { value: 'ulazni', text: 'EPO 1' },
        { value: 'izlazni', text: 'EPO 2' },
      ],
      valutaOptions: [
        { value: null, text: 'Odaberite' },
        { value: 'km', text: 'KM' },
        { value: 'eur', text: 'EUR' },
        { value: 'usd', text: 'USD' },
      ],
    };
  },
  computed: {
    nextKufNumber() {
      const store = useClientStore();
      const nextKufNumber = store.clients.find(client => client.clientKey === this.$route.params.clientKey).kuf.length + 1;
      return nextKufNumber;  // Assuming `clientStore` holds the Kufs and it's an array
    },
    dobavljacOptions() {
      const store = useDobavljacStore();
      // Map dobavljac array from the store to { value, text } format
      const storeDobavljacOptions = store.dobavljac.map(item => ({
        value: item.name.toLowerCase(),
        text: item.name
      }));
      const mockDobavljacOptions = dobavljacMock.map(item => ({
        value: item.name.toLowerCase(),
        text: item.name
      }));

      // Combine dobavljacMock with dynamic ones
      return [
        { value: null, text: 'Izaberite dobavljaca' }, 
        ...storeDobavljacOptions,
        ...mockDobavljacOptions, 
        ];
    }
  },
  methods: {
    onSubmit() {
      this.hasSubmitted = true;  // Mark the form as submitted

      const clientStore = useClientStore();

      const clientKey = this.$route.params.clientKey;

      const client = clientStore.clients.find(client => client.clientKey === clientKey);

      if (client) {
      // If client exists, update the client's data by adding form data
      client.kuf = client.kuf || []; // Ensure `entries` array exists
      client.kuf.push({ ...this.form }); // Add form data as a new entry

      // Save the updated clients array back to localStorage
      clientStore.saveClients();
    } else {
      console.error('Client not found');
    }

      // Reset form after submission
      this.form = {
        brojKuf: null,
        date: null,
        dobavljac: null,
        brojFakture: null,
        datumFakture: null,
        rokPlacanja: null,
        rokDatum: null,
        obracunPdv: null,
        vrstaPrometa: null,
        knjiga: null,
        valuta: null,
        bruto: null,
        neto: null,
        brutoPDV: null,
        netoPDV: null,
        iznosPdv: null,
        rabat: null,
        kasaSkonto: null,
        placanjeDo: null,
        osnovicaUlazniPDVodbit: null,
        ulazniPDVodbit: null,
        nabavkaPoljoprivrednika: null,
        pauslaNaknada: null,
        ulazniPDVNePrikazuje: null
      };
      this.hasSubmitted = false;  // Reset submission flag
    },
  },
  mounted() {
    const clientKey = this.$route.params.clientKey;
    console.log('Client Key:', clientKey); // Now you have the clientKey from the URL
    this.form.brojKuf = this.nextKufNumber;
    console.log('KUF INDEX:', this.nextKufNumber); // Now you have the next KUF number
  }
};
</script>

<style scoped>
/* Add any component-specific styling here */
</style>
