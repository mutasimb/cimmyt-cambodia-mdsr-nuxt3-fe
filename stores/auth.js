import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: null,
    user: null
  }),
  actions: {
    getToken () {
      this.token = useGetStorage('token');
    },
    setToken (token) {
      useSetStorage('token', token);
    },

    getUser () {
      const api = useAPI();

      return new Promise((resolve, reject) => {
        api.get('/users/data')
          .then(({ data }) => {
            const { user } = data;
            this.user = user;

            resolve(user);
          })
          .catch(err => {
            reject(err);
          });
      })
    }
  }
})
