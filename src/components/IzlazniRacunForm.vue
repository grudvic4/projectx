<template>
  <b-container>
    <b-form @submit.prevent="onSubmit">
      <b-form-group label="Broj racuna" label-for="broj-racuna" class="mb-2">
        <b-form-input
          id="racun-kuf"
          type="number"
          v-model="form.brojRacuna"
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

      <b-form-group label="Kupac" label-for="kupac" class="mb-2">
        <b-form-select
          id="kupac"
          v-model="form.kupac"
          :options="kupacOptions"
          required
          :state="!hasSubmitted || form.entitet !== null"
        ></b-form-select>
      </b-form-group>

      <b-form-group label="Narudzbenica" label-for="narudzbenica" class="mb-2">
        <b-form-input
          id="narudzbenica"
          type="number"
          v-model="form.narudzbenica"
          required
          :state="!hasSubmitted || form.type !== null"
        ></b-form-input>
      </b-form-group>

      <b-form-group label="Napomena" label-for="napomena" class="mb-2">
        <b-form-input
          id="napomena"
          type="text"
          v-model="form.napomena"
          required
          :state="!hasSubmitted || form.type !== null"
        ></b-form-input>
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

      <b-form-group label="Vrsta fakture" label-for="vrsta-fakture" class="mb-2">
        <b-form-select
          id="vrsta-fakture"
          v-model="form.vrstaFakture"
          :options="vrstaFaktureOptions"
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

      <b-form-group label="Neto iznos u valuti placanja sa porezom" label-for="neto" class="mb-2">
        <b-form-input
          id="neto"
          type="number"
          v-model="form.neto"
          required
          :state="!hasSubmitted || form.type !== null"
        ></b-form-input>
      </b-form-group>

      <b-form-group label="Ino usluge" label-for="ino-usluge" class="mb-2">
        <b-form-select
          id="ino-usluge"
          v-model="form.inoUsluge"
          :options="inoUslugeOptions"
          required
          :state="!hasSubmitted || form.entitet !== null"
        ></b-form-select>
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

      <b-form-group label="Rabat kupcu" label-for="rabat" class="mb-2">
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

      <b-form-group label="Statisticka vrijednost izvoza" label-for="statisticka-vrijednost" class="mb-2">
        <b-form-input
          id="statisticka-vrijednost"
          type="number"
          v-model="form.statistickaVrijednost"
          required
          :state="!hasSubmitted || form.type !== null"
        ></b-form-input>
      </b-form-group>

      <b-form-group label="Osnovica poreza" label-for="osnovica-pdv" class="mb-2">
        <b-form-input
          id="osnovica-pdv"
          type="number"
          v-model="form.osnovicaPDV"
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
      
      <b-form-group label="Neoporeziva osnovica" label-for="neoporeziva-osnovica" class="mb-2">
        <b-form-input
          id="neoporeziva-osnovica"
          type="number"
          v-model="form.neoporezivaOsnovica"
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

export default {
  data() {
    return {
      hasSubmitted: false,
      form: {
        brojRacuna: null,
        date: null,
        kupac: null,
        narudzbenica: null,
        napomena: null,
        rokPlacanja: null,
        rokDatum: null,
        obracunPdv: null,
        vrstaFakture: null,
        vrstaPrometa: null,
        knjiga: null,
        valuta: null,
        neto: null,
        inoUsluge: null,
        brutoPDV: null,
        netoPDV: null,
        rabat: null,
        kasaSkonto: null,
        placanjeDo: null,
        statistickaVrijednost: null,
        osnovicaPDV: null,
        iznosPdv: null,
        neoporezivaOsnovica: null
      },
      kupacOptions: [
        { value: null, text: 'Izaberite kupca' },
        { value: 'bht', text: 'BH Telecom' },
        { value: 'sika', text: 'Sika BiH' },
        { value: 'penny', text: 'Penny' }
      ],
      vrstaFaktureOptions: [
        { value: null, text: 'Odaberite' },
        { value: 'faktura', text: 'Faktura' },
        { value: 'avans', text: 'Avans' },
        { value: 'gotovinski', text: 'Gotovinski' }
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
      inoUslugeOptions: [
        { value: null, text: 'Odaberite' },
        { value: 'da', text: 'Da' },
        { value: 'ne', text: 'Ne' },
      ],
    };
  },
  methods: {
    onSubmit() {
      this.hasSubmitted = true;  // Mark the form as submitted

      const clientStore = useClientStore();

      const clientKey = this.$route.params.clientKey;

      const client = clientStore.clients.find(client => client.clientKey === clientKey);

      if (client) {
      // If client exists, update the client's data by adding form data
      client.kif = client.kif || []; // Ensure `entries` array exists
      client.kif.push({ ...this.form }); // Add form data as a new entry

      // Save the updated clients array back to localStorage
      clientStore.saveClients();
    } else {
      console.error('Client not found');
    }

    
      
      // Reset form after submission
      this.form = {
        brojRacuna: null,
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
