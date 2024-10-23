import { defineStore } from 'pinia';

export const useClientStore = defineStore('client', {
  state: () => ({
    clients: JSON.parse(localStorage.getItem('clients') || '[]') as any[],
  }),
  actions: {
    addClient(client: any) {
      this.clients.push(client);
      this.saveClients();
    },
    saveClients() {
      localStorage.setItem('clients', JSON.stringify(this.clients));
    },
  },
});
