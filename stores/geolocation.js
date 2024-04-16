import { defineStore, storeToRefs } from 'pinia';

import { useFormProfileStore } from '@/stores/form-profile';

export const useGeoStore = defineStore('geo', () => {
  let watchPositionID = null;
  const
    storeFormProfile = useFormProfileStore(),
    { lon, lat } = storeToRefs(storeFormProfile),

    status = ref('Detecting location ...'),

    geolocationLon = ref(null),
    geolocationLat = ref(null),

    getGeo = () => {
      if (!navigator.geolocation) {
        status.value = 'Geolocation service not available';
      } else {
        status.value = 'Detecting location ...';

        watchPositionID = navigator.geolocation.watchPosition(
          position => {
            status.value = '';

            geolocationLon.value = position.coords.longitude;
            geolocationLat.value = position.coords.latitude;
          },
          () => { status.value = 'Geolocation error' },
          { enableHighAccuracy: true, maximumAge: 0 }
        )
      }
    },
    getCommuneCentroid = async ({ adm1, adm2, adm3 }) => {
      const { data } = await useFetch('/areas/commune-geolocation', {
        baseURL: useServer() + '/api',
        query: { adm1, adm2, adm3 }
      });

      if (data.value) {
        const { lon: communeLon, lat: communeLat } = toRaw(data.value);
        lon.value = communeLon;
        lat.value = communeLat;
      }
    },
    stopGeo = () => {
      navigator.geolocation.clearWatch(watchPositionID)
    };

    return {
      geolocationLon,
      geolocationLat,

      getGeo,
      stopGeo,
      getCommuneCentroid
    }
})
