import { defineStore } from 'pinia';

import adm from './adm.json';

export const useProvidersStore = defineStore('providers', () => {
  const
    token = useGetStorage('token') ,
    selected = ref(null),
    loading = ref(false),
    providersList = ref([]),
    drawerLeft = ref(true),
    drawerDetails = ref(false),
    drawerFilter = ref(false),
    dialogServiceRequest = ref(false),

    getProviders = async () => {
      const { data, pending } = await useFetch('/users/providers', {
        headers: token ? { 'x-auth-token': 'Bearer ' + token } : {},
        baseURL: useServer() + '/api',
        transform: d => d.providers
      });

      loading.value = pending.value;
      if (data.value && !pending.value) providersList.value = data.value;
    },

    selectedProvider = computed(
      () => providersList.value && providersList.value.length && selected.value
        ? providersList.value.find(provider => provider._id === selected.value)
        : null
    );

  const
    filterMachine = ref([]),
    filterAdm1 = ref(null),
    filterAdm2 = ref(null),
    filterAdm3 = ref(null),

    itemsAdm1 = computed(
      () => adm
        .map(el => el.NAME_1)
        .filter((el, i, arr) => arr.indexOf(el) === i)
    ),
    itemsAdm2 = computed(
      () => !filterAdm1.value ? [] : adm
        .filter(el => el.NAME_1 === filterAdm1.value)
        .map(el => el.NAME_2)
        .filter((el, i, arr) => arr.indexOf(el) === i)
    ),
    itemsAdm3 = computed(
      () => !filterAdm1.value || !filterAdm2.value ? [] : adm
        .filter(el => el.NAME_1 === filterAdm1.value && el.NAME_2 === filterAdm2.value)
        .map(el => el.NAME_3)
        .filter((el, i, arr) => arr.indexOf(el) === i)
    ),
    
    providersListFiltered = computed(
      () => providersList.value
        .filter(provider => {
          if(filterMachine.value.length === 0) {
            return true
          } else {
            const providerMachines = provider.machines.map(machine => machine.name)
            return providerMachines.some(machine => filterMachine.value.indexOf(machine) > -1)
          }
        })
        .filter(provider => {
          if(filterAdm1.value && filterAdm2.value && filterAdm3.value) {
            console.log('adm1 && adm2 && adm3')
            return provider.adm1 === filterAdm1.value && provider.adm2 === filterAdm2.value && provider.adm3 === filterAdm3.value
          } else if(filterAdm1.value && filterAdm2.value) {
            console.log('adm1 && adm2')
            return provider.adm1 === filterAdm1.value && provider.adm2 === filterAdm2.value
          } else if(filterAdm1.value) {
            console.log('adm1')
            return provider.adm1 === filterAdm1.value
          } else {
            return true
          }
        })
    );

  return {
    providersList,
    loading,
    selectedProvider,
    getProviders,
    selected,

    drawerLeft,
    drawerDetails,
    drawerFilter,
    dialogServiceRequest,

    filterAdm1,
    filterAdm2,
    filterAdm3,
    itemsAdm1,
    itemsAdm2,
    itemsAdm3,
    filterMachine,

    providersListFiltered
  }
})
