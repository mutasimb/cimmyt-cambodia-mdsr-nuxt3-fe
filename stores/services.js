import { defineStore } from 'pinia';

export const useServicesStore = defineStore('services', {
  state: () => ({
    selected: null,
    servicesList: [],

    loading: false
  }),
  getters: {
    selectedService (state) {
      return !state.selected || !state.servicesList.length
        ? null
        : state.servicesList.find(item => item._id === state.selected)
    }
  },
  actions: {
    create ({ provider, field, machine, service, dateStart }) {
      const api = useAPI();
      this.loading = true;

      return new Promise((resolve, reject) => {
        api.post('/services/new', { provider, field, machine, service, dateStart })
          .then(({ data }) => {
            const { service } = data;
            
            this.loading = false;
            resolve(service);
          })
          .catch(err => {
            this.loading = false;
            reject(err);
          })
      })
    },
    getServices () {
      const api = useAPI();
      this.loading = true;

      return new Promise((resolve, reject) => {
        api.get('/services/user')
          .then(res => {
            const { services } = res.data;
            this.servicesList = services;
            
            this.loading = false;
            resolve(services);
          })
          .catch(err => {
            this.loading = false;
            reject(err);
          });
      })
    }
  }
})
