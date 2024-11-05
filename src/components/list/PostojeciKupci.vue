<template>
  <b-container>
    <b-card 
      v-for="(kupac, index) in kupci" 
      class="mb-3"
      :key="kupac.jib"
      @click="toggleCollapse(index)"
    >
      <template #header>
        <span>
          {{ `${index + 1} | ${kupac.name}` }} - {{ kupac.jib }}
        </span>
      </template>

      <b-collapse :id="'collapse-' + index" v-model="collapse[index]">
        <b-card-text>
          Oblik: {{ kupac.type }} <br>
          Adresa: {{ kupac.address }} <br>
          Grad: {{ kupac.grad }} <br>
          PDV: {{ kupac.pdv }} <br>
          JIB: {{ kupac.jib }} <br>
          Entitet: {{ kupac.entitet }}
        </b-card-text>
      </b-collapse>
    </b-card>
  </b-container>
</template>

<script>
import { useKupacStore } from '@/store/kupacStore'; // Adjust the path if needed
import kupacMock from '@/data/kupacMock'; // Import your mock data if needed

export default {
  data() {
    return {
      collapse: []  // Array to keep track of collapse states for each card
    };
  },
  computed: {
    kupci() {
      const kupacStore = useKupacStore();
      // Combine the dobavljac from the store and any mock data if necessary
      return [...kupacStore.kupac, ...kupacMock];
    }
  },
  methods: {
    toggleCollapse(index) {
      this.$set(this.collapse, index, !this.collapse[index]);
    }
  }
};
</script>

<style scoped>
/* Add any component-specific styling here */
</style>
