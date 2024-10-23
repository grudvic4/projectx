<template>
  <b-container>
    <b-form @submit.prevent="onSubmit">
      <b-form-group label="Broj KUF" label-for="broj-kuf" class="mb-2">
        <b-form-input
          id="broj-kuf"
          type="number"
          v-model="form.brojKuf"
          required
          :state="!hasSubmitted || form.type !== null"
        ></b-form-input>
      </b-form-group>

      <b-form-group label="Datum" label-for="datum" class="mb-2">
        <b-form-datepicker 
          id="datum" 
          v-model="form.date" 
          placeholder="Izaberite datum"
          :date-format-options="{ day: 'numeric', month: 'numeric',year: 'numeric' }"
          class="mb-2" />
      </b-form-group>

      <b-form-group label="Dobavljac" label-for="dobavljac" class="mb-2">
        <b-form-select
          id="dobavljac"
          v-model="form.dobavljac"
          :options="dobavljacOptions"
          required
          :state="!hasSubmitted || form.entitet !== null"
        ></b-form-select>
      </b-form-group>

      <b-form-group label="Broj fakture dobavljaca" label-for="broj-fakture-dobavljaca" class="mb-2">
        <b-form-input
          id="broj-fakture-dobavljaca"
          type="number"
          v-model="form.brojFakture"
          required
          :state="!hasSubmitted || form.type !== null"
        ></b-form-input>
      </b-form-group>

      <b-form-group label="Datum fakture dobavljaca" label-for="datum-fakture-dobavljaca" class="mb-2">
        <b-form-datepicker 
          id="datum-fakture-dobavljaca" 
          v-model="form.datumFakture" 
          placeholder="Izaberite datum"
          :date-format-options="{ day: 'numeric', month: 'numeric',year: 'numeric' }"
          class="mb-2" />
      </b-form-group>

      <b-form-group label="Rok placanja" label-for="rok-placanja" class="mb-2">
        <b-form-input
          id="rok-placanja"
          type="number"
          v-model="form.rokPlacanja"
          required
          :state="!hasSubmitted || form.type !== null"
        ></b-form-input>
      </b-form-group>

      <b-form-group label="Datum roka placanja" label-for="datum-roka-placanja" class="mb-2">
        <b-form-datepicker 
          id="datum-roka-placanja" 
          v-model="form.rokDatum" 
          placeholder="Izaberite datum"
          :date-format-options="{ day: 'numeric', month: 'numeric',year: 'numeric' }"
          class="mb-2" />
      </b-form-group>

      <b-form-group label="Za obracun PDV-a" label-for="obracun-pdv" class="mb-2">
        <b-form-select
          id="obracun-pdv"
          v-model="form.obracunPdv"
          :options="obracunPdvOptions"
          required
          :state="!hasSubmitted || form.entitet !== null"
        ></b-form-select>
      </b-form-group>

      <b-form-group label="Vrsta prometa" label-for="vrsta-prometa" class="mb-2">
        <b-form-select
          id="vrsta-prometa"
          v-model="form.vrstaPrometa"
          :options="vrstaPrometaOptions"
          required
          :state="!hasSubmitted || form.entitet !== null"
        ></b-form-select>
      </b-form-group>

      <b-form-group label="Knjiga" label-for="knjiga" class="mb-2">
        <b-form-select
          id="knjiga"
          v-model="form.knjiga"
          :options="knjigaOptions"
          required
          :state="!hasSubmitted || form.entitet !== null"
        ></b-form-select>
      </b-form-group>

      <b-form-group label="Valuta placanja" label-for="valuta-placanja" class="mb-2">
        <b-form-select
          id="valuta-placanja"
          v-model="form.valuta"
          :options="valutaOptions"
          required
          :state="!hasSubmitted || form.entitet !== null"
        ></b-form-select>
      </b-form-group>

      <b-form-group label="Bruto iznos u valuti placanja" label-for="bruto" class="mb-2">
        <b-form-input
          id="bruto"
          type="number"
          v-model="form.bruto"
          required
          :state="!hasSubmitted || form.type !== null"
        ></b-form-input>
      </b-form-group>

      <b-form-group label="Neto iznos u valuti placanja" label-for="neto" class="mb-2">
        <b-form-input
          id="neto"
          type="number"
          v-model="form.neto"
          required
          :state="!hasSubmitted || form.type !== null"
        ></b-form-input>
      </b-form-group>

      <b-form-group label="Bruto iznos sa porezom" label-for="bruto-pdv" class="mb-2">
        <b-form-input
          id="bruto-pdv"
          type="number"
          v-model="form.brutoPDV"
          required
          :state="!hasSubmitted || form.type !== null"
        ></b-form-input>
      </b-form-group>

      <b-form-group label="Neto iznos sa porezom" label-for="neto-pdv" class="mb-2">
        <b-form-input
          id="neto-pdv"
          type="number"
          v-model="form.netoPDV"
          required
          :state="!hasSubmitted || form.type !== null"
        ></b-form-input>
      </b-form-group>

      <b-form-group label="Iznos poreza" label-for="iznos-pdv" class="mb-2">
        <b-form-input
          id="iznos-pdv"
          type="number"
          v-model="form.iznosPdv"
          required
          :state="!hasSubmitted || form.type !== null"
        ></b-form-input>
      </b-form-group>

      <b-form-group label="Rabat dobavljaca" label-for="rabat" class="mb-2">
        <b-form-input
          id="rabat"
          type="number"
          v-model="form.rabat"
          required
          :state="!hasSubmitted || form.type !== null"
        ></b-form-input>
      </b-form-group>

      <b-form-group label="Kasa skonto" label-for="kasa-skonto" class="mb-2">
        <b-form-input
          id="kasa-skonto"
          type="number"
          v-model="form.kasaSkonto"
          required
          :state="!hasSubmitted || form.type !== null"
        ></b-form-input>
      </b-form-group>

      <b-form-group label="Za placanje do" label-for="rok-placanja-skonto" class="mb-2">
        <b-form-datepicker 
          id="rok-placanja-skonto" 
          v-model="form.placanjeDo" 
          placeholder="Izaberite datum"
          :date-format-options="{ day: 'numeric', month: 'numeric',year: 'numeric' }"
          class="mb-2" />
      </b-form-group>

      <b-form-group label="Osnovica ulaznog poreza koji se moze odbiti" label-for="osnovica-ulaznog-pdv" class="mb-2">
        <b-form-input
          id="osnovica-ulaznog-pdv"
          type="number"
          v-model="form.osnovicaUlazniPDVodbit"
          required
          :state="!hasSubmitted || form.type !== null"
        ></b-form-input>
      </b-form-group>

      <b-form-group label="Ulazni porez koji se moze odbiti [17%]" label-for="ulazni-pdv" class="mb-2">
        <b-form-input
          id="ulazni-pdv"
          type="number"
          v-model="form.ulazniPDVodbit"
          required
          :state="!hasSubmitted || form.type !== null"
        ></b-form-input>
      </b-form-group>

      <b-form-group label="Iznos nabavke od poljoprivrednika" label-for="nabavka-poljoprivrednik" class="mb-2">
        <b-form-input
          id="nabavka-poljoprivrednik"
          type="number"
          v-model="form.nabavkaPoljoprivrednika"
          required
          :state="!hasSubmitted || form.type !== null"
        ></b-form-input>
      </b-form-group>

      <b-form-group label="Pausalna naknada za poljoprivrednike [5%]" label-for="pausalna-naknada" class="mb-2">
        <b-form-input
          id="pausalna-naknada"
          type="number"
          v-model="form.pauslaNaknada"
          required
          :state="!hasSubmitted || form.type !== null"
        ></b-form-input>
      </b-form-group>

      <b-form-group label="Ulazni porez koji se ne prikazuje na stranici" label-for="ulazni-pdv-ne-prikazuje" class="mb-2">
        <b-form-input
          id="ulazni-pdv-ne-prikazuje"
          type="number"
          v-model="form.ulazniPDVNePrikazuje"
          required
          :state="!hasSubmitted || form.type !== null"
        ></b-form-input>
      </b-form-group>

      <b-button type="submit" variant="primary">Submit</b-button>
    </b-form>
  </b-container>
</template>

<script>
import { useClientStore } from '@/store/clientStore';
import { useDobavljacStore } from '@/store/dobavljacStore';

export default {
  data() {
    return {
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
      staticDobavljacOptions: [
        { value: null, text: 'Izaberite dobavljaca' },
        { value: 'bht', text: 'BH Telecom' },
        { value: 'sika', text: 'Sika BiH' },
        { value: 'penny', text: 'Penny' }
      ],
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
    dobavljacOptions() {
      const store = useDobavljacStore();
      // Map dobavljac array from the store to { value, text } format
      const dynamicDobavljacOptions = store.dobavljac.map(item => ({
        value: item.name.toLowerCase(),
        text: item.name
      }));
      // Combine static options with dynamic ones
      return [...this.staticDobavljacOptions, ...dynamicDobavljacOptions];
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
  }
};
</script>

<style scoped>
/* Add any component-specific styling here */
</style>
