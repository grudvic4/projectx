<template>
    <div>
      <b-row class="text-center">
        <b-col cols="12">
          <h1 class="mb-4">Dodaj novi izvod</h1>
        </b-col>
      </b-row>
      <b-row class="justify-content-center">
        <b-col cols="12" lg="8">
          <b-form @submit.prevent="onSubmit">
            <b-row>
              <b-col cols="6">
                <b-form-group label="Datum placanja" label-for="datum-placanja" class="mb-2">
                  <b-form-datepicker
                    id="datum-placanja"
                    v-model="form.datumPlacanja"
                    placeholder="Izaberite datum placanja"
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
    };
  },
  methods: {
    onSubmit() {
      this.hasSubmitted = true;

      const clientStore = useClientStore();
      const clientKey = this.$route.params.clientKey;  // Get clientKey from route params
      const brojKuf = this.$route.query.brojKuf;       // Get brojKuf from query parameters

      // Locate client and update kuf entry
      const client = clientStore.clients.find(client => client.clientKey === clientKey);
      if (client) {
        const kufEntry = client.kuf.find(entry => entry.brojKuf === brojKuf);
        
        if (kufEntry) {
          kufEntry.datumPlacanja = this.form.datumPlacanja;
          kufEntry.iznosUplate = this.form.iznosUplate;
          clientStore.saveClients();
        } else {
          console.error(`kuf entry with brojKuf ${brojKuf} not found`);
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
    const brojKuf = this.$route.query.brojKuf;
    console.log('Client Key:', clientKey);
    console.log('Broj Kuf:', brojKuf);
  }
};

</script>

