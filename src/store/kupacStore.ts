import { defineStore } from 'pinia';

export const useKupacStore = defineStore('kupac', {
  state: () => ({
    kupac: JSON.parse(localStorage.getItem('kupac') || '[]') as any[],
  }),
  actions: {
    addKupac(kupac: any) {
      this.kupac.push(kupac);
      this.saveKupac();
    },
    saveKupac() {
      localStorage.setItem('kupac', JSON.stringify(this.kupac));
    },
  },
});
