import { defineStore } from 'pinia';

export const useDobavljacStore = defineStore('dobavljac', {
  state: () => ({
    dobavljac: JSON.parse(localStorage.getItem('dobavljac') || '[]') as any[],
  }),
  actions: {
    addDobavljac(dobavljac: any) {
      this.dobavljac.push(dobavljac);
      this.saveDobavljac();
    },
    saveDobavljac() {
      localStorage.setItem('dobavljac', JSON.stringify(this.dobavljac));
    },
  },
});
