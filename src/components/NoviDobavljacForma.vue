<template>
  <b-container>
    <b-form @submit.prevent="onSubmit">
      <b-form-group label="Oblik" label-for="client-type" class="mb-2">
        <b-form-select
          id="client-type"
          v-model="form.type"
          :options="clientTypeOptions"
          required
          :state="!hasSubmitted || form.type !== null"
        ></b-form-select>
      </b-form-group>

      <b-form-group label="Naziv" label-for="client-name" class="mb-2">
        <b-form-input
          id="client-name"
          v-model="form.name"
          required
          :state="!hasSubmitted || form.name.length > 0"
          placeholder="Upisite naziv klijenta"
        ></b-form-input>
      </b-form-group>

      <b-form-group label="Adresa" label-for="client-address" class="mb-2">
        <b-form-input
          id="client-address"
          v-model="form.address"
          :state="!hasSubmitted || form.address.length > 0"
          placeholder="Upisite adresu klijenta"
        ></b-form-input>
      </b-form-group>

      <b-form-group label="Grad" label-for="client-grad" class="mb-2">
        <b-form-input
          id="client-grad"
          v-model="form.grad"
          :state="!hasSubmitted || form.grad.length > 0"
          placeholder="Upisite grad klijenta"
        ></b-form-input>
      </b-form-group>

      <b-form-group
        label="PDV"
        label-for="client-pdv"
        description="Unesite ispravan 12-cifreni PDV broj"
        class="mb-2"
      >
        <b-form-input
          id="client-pdv"
          v-model="form.pdv"
          type="text"
          maxlength="12"
          placeholder="Upisite PDV klijenta"
          :state="!hasSubmitted || pdvValid || pdvTouched"
          required
          @input="hasSubmitted = false"
          @blur="validatePDV"
        ></b-form-input>
        <b-form-invalid-feedback v-if="hasSubmitted && !pdvValid">
          Unesite ispravan 12-cifreni PDV broj.
        </b-form-invalid-feedback>
      </b-form-group>

      <b-form-group
        label="JIB"
        label-for="client-jib"
        description="Unesite ispravan 13-cifreni JIB broj"
        class="mb-2"
      >
        <b-form-input
          id="client-jib"
          v-model="form.jib"
          type="text"
          maxlength="13"
          placeholder="Upisite JIB klijenta"
          :state="!hasSubmitted || jibValid || jibTouched"
          required
          @input="hasSubmitted = false"
          @blur="validateJIB"
        ></b-form-input>
        <b-form-invalid-feedback v-if="hasSubmitted && !jibValid">
          Unesite ispravan 13-cifreni JIB broj.
        </b-form-invalid-feedback>
      </b-form-group>

      <b-form-group class="mb-2">
        <b-form-checkbox v-model="form.dobavljac" id="client-dobavljac" hidden value="true">
          Dobavljač
        </b-form-checkbox>
      </b-form-group>

      <b-form-group label="Entitet" label-for="client-entitet" class="mb-2">
        <b-form-select
          id="client-entitet"
          v-model="form.entitet"
          :options="entitetOptions"
          required
          :state="!hasSubmitted || form.entitet !== null"
        ></b-form-select>
      </b-form-group>

      <b-button type="submit" variant="primary">Submit</b-button>
    </b-form>
  </b-container>
</template>

<script>
import { useDobavljacStore } from '@/store/dobavljacStore';

export default {
  data() {
    return {
      hasSubmitted: false,
      pdvTouched: false, // Track if the PDV field has been interacted with
      jibTouched: false,
      form: {
        type: null,
        address: '',
        name: '',
        grad: '',
        pdv: '',
        jib: '',
        dobavljac: true,
        entitet: null
      },
      clientTypeOptions: [
        { value: null, text: 'Izaberite oblik klijenta' },
        { value: 'doo', text: 'd.o.o.' },
        { value: 'dd', text: 'd.d.' },
        { value: 'od', text: 'O.D.' }
      ],
      entitetOptions: [
        { value: null, text: 'Izaberite entitet' },
        { value: 'fbih', text: 'Federacija' },
        { value: 'rs', text: 'Republika Srpska' },
        { value: 'bd', text: 'Brčko Distrikt' }
      ]
    };
  },
  computed: {
    // Computed property to check if the PDV is valid
    pdvValid() {
      const pdvRegex = /^\d{12}$/;
      return this.form.pdv.length === 12 && pdvRegex.test(this.form.pdv);
    },
    jibValid() {
      const jibRegex = /^\d{13}$/;
      return jibRegex.test(this.form.jib);
    }
  },
  methods: {
    onSubmit() {
      this.hasSubmitted = true;  // Mark the form as submitted

      // Validate that PDV is exactly 12 digits
      if (!this.pdvValid) {
      alert('Unesite ispravan 12-cifreni PDV broj.');
      return;
    }

    if (!this.jibValid) {
      alert('Unesite ispravan 13-cifreni JIB broj.');
      return;
    }

      const dobavljacStore = useDobavljacStore();
      dobavljacStore.addDobavljac({
        type: this.form.type,
        name: this.form.name,
        address: this.form.address,
        grad: this.form.grad,
        pdv: this.form.pdv,
        jib: this.form.jib,
        dobavljac: this.form.dobavljac,
        entitet: this.form.entitet,
      });

      // Reset form after submission
      this.form = {
        type: null,
        name: '',
        address: '',
        grad: '',
        pdv: '',
        jib: '',
        dobavljac: true,
        entitet: null
      };
      this.hasSubmitted = false;  // Reset submission flag
    },
    validatePDV() {
      this.pdvTouched = true; // Mark PDV as touched
      this.hasSubmitted = true; // Show validation on blur
    },
    validateJIB() {
      this.jibTouched = true; // Mark JIB as touched
      this.hasSubmitted = true; // Show validation on blur
    }
  }
};
</script>

<style scoped>
/* Add any component-specific styling here */
</style>
