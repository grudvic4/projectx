<template>
  <b-container>
    <b-card 
      v-for="(dobavljac, index) in dobavljaci" 
      class="mb-3"
      :key="dobavljac.jib"
      @click="toggleCollapse(index)"
    >
      <template #header>
        <span>
          {{ `${index + 1} | ${dobavljac.name}` }} - {{ dobavljac.jib }}
        </span>
      </template>

      <b-collapse :id="'collapse-' + index" v-model="collapse[index]">
        <b-card-text>
          Oblik: {{ dobavljac.type }} <br>
          Adresa: {{ dobavljac.address }} <br>
          Grad: {{ dobavljac.grad }} <br>
          PDV: {{ dobavljac.pdv }} <br>
          JIB: {{ dobavljac.jib }} <br>
          Entitet: {{ dobavljac.entitet }}
        </b-card-text>
      </b-collapse>
    </b-card>
  </b-container>
</template>

<script>
import { useDobavljacStore } from '@/store/dobavljacStore'; // Adjust the path if needed
import dobavljacMock from '@/data/dobavljacMock'; // Import your mock data if needed

export default {
  data() {
    return {
      collapse: []  // Array to keep track of collapse states for each card
    };
  },
  computed: {
    dobavljaci() {
      const dobavljacStore = useDobavljacStore();
      // Combine the dobavljac from the store and any mock data if necessary
      return [...dobavljacStore.dobavljac, ...dobavljacMock];
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
